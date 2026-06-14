import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "@vercel/node"

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
 * Requires a `vocab_reminders` table + RESEND_API_KEY (+ optional CRON_SECRET,
 * REMINDER_FROM). Missing any → graceful no-op ({ disabled: true }), so the
 * in-app toggle and the cron never error before setup is complete.
 */

const TABLE = "vocab_reminders"

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
  return handleSync(req, res)
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
    const email = String(body.email || userData.user.email || "").trim().slice(0, 200)
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

async function handleSend(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Protect the cron endpoint if a secret is configured.
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    res.status(401).json({ error: "Unauthorized." })
    return
  }

  const db = admin()
  const resendKey = process.env.RESEND_API_KEY
  if (!db || !resendKey) {
    res.status(200).json({ sent: 0, disabled: true })
    return
  }

  const today = todayUTC()
  const from = process.env.REMINDER_FROM || "Lara at Scholify <onboarding@resend.dev>"

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
      const ok = await sendEmail(resendKey, from, r.email as string)
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

async function sendEmail(apiKey: string, from: string, to: string): Promise<boolean> {
  const html = `
  <div style="font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:28px;color:#3B2F45;">
    <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;">Your words are waiting 👋</div>
    <p style="font-size:15px;line-height:1.6;color:#5b4d68;">
      A few minutes today keeps your streak — and the 1% — compounding. Your daily session is ready.
    </p>
    <a href="https://scholifyapp.com/learn"
       style="display:inline-block;margin-top:14px;background:linear-gradient(135deg,#8B5CF6,#818CF8 48%,#38BDF8);color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 26px;border-radius:12px;">
      Start today's session →
    </a>
    <p style="font-size:12px;color:#9a8fa3;margin-top:22px;">
      — Lara · You can turn these off anytime in Settings.
    </p>
  </div>`
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject: "Your daily words are ready 📚", html }),
    })
    return r.ok
  } catch {
    return false
  }
}
