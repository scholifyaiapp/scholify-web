import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createHmac, timingSafeEqual } from "node:crypto"

/*
 * Daily email reminders.
 *
 *   POST /api/reminders?action=sync   (Authorization: Bearer <supabase token>)
 *        body: { optIn, email, reminderTime, lastSessionDate }
 *        → upsert the learner's reminder preference + last activity.
 *
 *   GET  /api/reminders?action=send   (Vercel cron; Authorization: Bearer CRON_SECRET)
 *        → email everyone who opted in and hasn't studied today.
 *
 * Requires the `study_reminders` table (migration 0015) + RESEND_API_KEY (+
 * optional CRON_SECRET, REMINDER_FROM). Missing any → graceful no-op
 * ({ disabled: true }), so the in-app toggle and the cron never error before
 * setup is complete.
 */

const TABLE = "study_reminders"

// Canonical origin — the root redirects here (307), so link straight to www.
const SITE = "https://www.scholifyapp.com"

function admin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10)
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const action = String(req.query.action || "").toLowerCase()
  if (action === "send") return handleSend(req, res)
  if (action === "unsubscribe") return handleUnsubscribe(req, res)
  return handleSync(req, res)
}

/**
 * Per-user unsubscribe token — HMAC(user_id) keyed by CRON_SECRET. Lets the
 * emailed one-click link (and the List-Unsubscribe header) turn a learner's
 * reminders off without a login, while being unforgeable: only the server,
 * which holds CRON_SECRET, can mint a valid token for a given user_id.
 */
function unsubToken(userId: string, secret: string): string {
  return createHmac("sha256", secret).update(userId).digest("hex")
}

async function handleUnsubscribe(req: VercelRequest, res: VercelResponse): Promise<void> {
  const secret = process.env.CRON_SECRET
  const userId = String(req.query.u || "")
  const token = String(req.query.t || "")
  const valid =
    Boolean(secret) && Boolean(userId) && safeEqual(token, unsubToken(userId, secret as string))

  const db = admin()
  if (valid && db) {
    await db.from(TABLE).update({ opt_in: false }).eq("user_id", userId)
  }

  // Gmail/Yahoo one-click POST (RFC 8058): reply 200, no body needed.
  if (req.method === "POST") {
    res.status(200).json({ ok: valid })
    return
  }
  // Browser click (GET): a tiny confirmation page.
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.status(200).send(
    `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<div style="font-family:system-ui,sans-serif;max-width:420px;margin:12vh auto;padding:0 24px;text-align:center;color:#2A2320">` +
      `<div style="font-size:20px;font-weight:800">${valid ? "You're unsubscribed 👋" : "Link expired"}</div>` +
      `<p style="color:#6B5F58;line-height:1.6">${
        valid
          ? "You won't get study reminders anymore. You can turn them back on anytime in Settings."
          : "This unsubscribe link isn't valid. You can manage reminders in Settings."
      }</p>` +
      `<a href="${SITE}/settings" style="color:#C80000;font-weight:700">Open Settings →</a></div>`,
  )
}

async function handleSync(req: VercelRequest, res: VercelResponse): Promise<void> {
  const db = admin()
  if (!db) {
    res.status(200).json({ ok: true, disabled: true })
    return
  }
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) {
    res.status(401).json({ error: "Not signed in." })
    return
  }
  try {
    const { data: userData, error } = await db.auth.getUser(token)
    if (error || !userData.user) {
      res.status(401).json({ error: "Invalid session." })
      return
    }
    const body = (req.body || {}) as Record<string, unknown>
    // The address comes from the VERIFIED token, never the body: a body-supplied
    // email lets any signed-in user sign a stranger up for daily mail from our
    // domain — spam we'd be sending, with our sending reputation behind it.
    const email = String(userData.user.email || "").trim().slice(0, 200)
    if (!email) {
      res.status(400).json({ ok: false, reason: "no_verified_email" })
      return
    }
    const row = {
      user_id: userData.user.id,
      email,
      opt_in: Boolean(body.optIn),
      reminder_time: String(body.reminderTime || "08:00").slice(0, 5),
      last_session_date: body.lastSessionDate ? String(body.lastSessionDate).slice(0, 10) : null,
      updated_at: new Date().toISOString(),
    }
    const { error: upErr } = await db.from(TABLE).upsert(row, { onConflict: "user_id" })
    res.status(200).json({ ok: !upErr, disabled: Boolean(upErr) })
  } catch (err) {
    console.error("reminders sync:", err)
    res.status(200).json({ ok: false, disabled: true })
  }
}

/** Constant-time compare — a plain === on a bearer token leaks timing signal. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

async function handleSend(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Fail closed: the send path (emails = cost + spam surface) unlocks ONLY with
  // a valid CRON_SECRET. If the secret is unset, the endpoint refuses rather
  // than running unauthenticated. Configure CRON_SECRET on the Vercel cron.
  const secret = process.env.CRON_SECRET
  const authed = Boolean(secret) && safeEqual(String(req.headers.authorization || ""), `Bearer ${secret}`)
  if (!authed) {
    res.status(secret ? 401 : 403).json({
      error: secret ? "Unauthorized." : "CRON_SECRET not configured.",
    })
    return
  }

  const db = admin()
  const resendKey = process.env.RESEND_API_KEY
  if (!db || !resendKey) {
    res.status(200).json({ sent: 0, disabled: true })
    return
  }

  const today = todayUTC()
  const from = process.env.REMINDER_FROM || "Charles at Scholify <onboarding@resend.dev>"

  try {
    const { data, error } = await db
      .from(TABLE)
      .select("user_id, email, last_session_date, last_reminded")
      .eq("opt_in", true)
      .limit(200)
    if (error) {
      res.status(200).json({ sent: 0, disabled: true })
      return
    }

    // Due = hasn't studied today and wasn't already reminded today.
    const due = (data || []).filter(
      (r) => r.email && r.last_session_date !== today && r.last_reminded !== today,
    )

    let sent = 0
    for (const r of due) {
      const unsubUrl = `${SITE}/api/reminders?action=unsubscribe&u=${encodeURIComponent(
        r.user_id as string,
      )}&t=${unsubToken(r.user_id as string, secret as string)}`
      const ok = await sendEmail(resendKey, from, r.email as string, unsubUrl)
      if (ok) {
        sent += 1
        await db.from(TABLE).update({ last_reminded: today }).eq("user_id", r.user_id)
      }
    }
    res.status(200).json({ sent })
  } catch (err) {
    console.error("reminders send:", err)
    res.status(200).json({ sent: 0, disabled: true })
  }
}

async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  unsubUrl: string,
): Promise<boolean> {
  // Email-safe PNG (Outlook/Apple Mail don't render the app's .webp avatars).
  const avatar = `${SITE}/charles/email-avatar.png`
  // ACCA brand palette on warm paper — the same accents the app uses.
  const html = `
  <div style="font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:28px;color:#2A2320;">
    <img src="${avatar}" width="56" height="56" alt="Charles"
         style="display:block;width:56px;height:56px;border-radius:50%;margin-bottom:16px;" />
    <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;">Today's session is ready 👋</div>
    <p style="font-size:15px;line-height:1.6;color:#6B5F58;">
      Twenty minutes today moves your Exam Readiness Score more than three hours the night before.
      Your next questions are picked and waiting.
    </p>
    <a href="${SITE}/study"
       style="display:inline-block;margin-top:14px;background:#C80000;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 26px;border-radius:12px;">
      Start today's session →
    </a>
    <p style="font-size:12px;color:#9C8F87;margin-top:22px;">
      — Charles · Your Scholify race engineer.<br/>
      <a href="${unsubUrl}" style="color:#9C8F87;">Unsubscribe</a> · or manage reminders in Settings.
    </p>
  </div>`
  // Plain-text alternative — lowers spam score and covers text-only clients.
  const text = [
    "Today's session is ready.",
    "",
    "Twenty minutes today moves your Exam Readiness Score more than three hours the night before. Your next questions are picked and waiting.",
    "",
    `Start today's session: ${SITE}/study`,
    "",
    "— Charles · Your Scholify race engineer",
    `Unsubscribe: ${unsubUrl}`,
  ].join("\n")
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: "Your ACCA session is ready 📘",
        html,
        text,
        // One-click unsubscribe (RFC 8058) — required by Gmail/Yahoo bulk-sender
        // rules and a strong signal against the spam folder.
        headers: {
          "List-Unsubscribe": `<${unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    })
    return r.ok
  } catch {
    return false
  }
}
