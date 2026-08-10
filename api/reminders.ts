import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import { createHmac, timingSafeEqual } from "node:crypto"
import { socialRowHtml } from "../src/lib/social-links.js"

/**
 * Appended inside every learner-facing email footer cell. Built once at module
 * load, since the account list is static.
 */
const SOCIAL_FOOTER = `<br><br><span style="display:inline-block;margin-bottom:7px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#B7B2AC;">Follow Scholify</span><br>${socialRowHtml()}`

/*
 * Practice-time reminders — three a day, in the learner's own clock.
 *
 *   POST /api/reminders?action=sync   (Authorization: Bearer <supabase token>)
 *        body: { optIn, practiceTime, timezone, slots, lastSessionDate }
 *        → upsert the learner's schedule + last activity.
 *
 *   GET  /api/reminders?action=send   (Authorization: Bearer CRON_SECRET)
 *        → deliver whichever slot is due for whoever is due it, right now.
 *
 *   GET/POST /api/reminders?action=unsubscribe&u=<id>&t=<hmac>
 *        → one-click opt-out (RFC 8058), no login required.
 *
 * SEND IS A TICK, NOT A DAILY BATCH. It is designed to be called every ~5
 * minutes and to be cheap and idempotent when nothing is due. It previously ran
 * once a day from a Vercel cron at 08:00 UTC and mailed everyone who had not
 * studied — the stored `reminder_time` was read by nothing at all, and there was
 * no timezone column, so 08:00 UTC was 13:00 in Tashkent and 03:00 in New York
 * for every learner alike.
 *
 * The caller is pg_cron inside Supabase, because Vercel Hobby permits 2 cron
 * jobs at once-a-day granularity and a "10 minutes before your session"
 * reminder needs 5-minute granularity. See migration 0026 for the exact setup.
 *
 * Requires `study_reminders` (migrations 0015 + 0026) and RESEND_API_KEY, plus
 * CRON_SECRET to unlock the send path at all. Missing any → graceful no-op
 * ({ disabled: true }), so the in-app toggle and the tick never error before
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

/* ── The reminders, as offsets from the learner's practice time ────────────
 *
 * One clock (practice_time, set at onboarding) drives all of them, so they cannot
 * drift apart or contradict each other:
 *
 *   soon      −30 min   "you start in half an hour"      — THE reminder
 *   catchup  +120 min   "two hours on, still open"       — only if they skipped
 *   lead     −180 min   "your session is at 19:00"       — opt-in extra
 *
 * TWO BY DEFAULT, deliberately. The founder's spec is two reminders a day: one
 * half an hour before the session so there is time to sit down for it, and one
 * two hours after the start time if the day is still not done. Three unrequested
 * emails a day from the same sender is how a domain earns a spam reputation, so
 * `lead` is now off unless a learner asks for it in Settings (see handleSync).
 *
 * −30 rather than −10 because ten minutes is not enough notice to change what you
 * are doing: it arrives, you are mid-something, and the session is already late.
 * Thirty minutes is the smallest window in which someone can actually finish what
 * they are on and be at the desk.
 *
 * WINDOW. The sender is called every ~5 minutes, so it fires a slot when the
 * learner's local clock is between the target and target + WINDOW. The window is
 * deliberately wider than the tick interval: a skipped or slow tick must not
 * silently drop someone's reminder. Exactly-once is guaranteed by the per-slot
 * sent_*_date columns instead, never by the window.
 */
/*
 * Three reminders a day, and the offsets are the founder's call:
 *
 *   −120  two hours ahead — far enough to move something, close enough to
 *         still be today. Three hours was advance notice you forget.
 *    −10  ten minutes — a "put the phone down" nudge, not a planning one.
 *         Thirty minutes is long enough to start something else and lose it.
 *   +120  two hours after — the honest catch-up, only if they never opened it.
 */
const SLOTS = [
  { key: "lead", offset: -120, onCol: "lead_on", dateCol: "sent_lead_date" },
  { key: "soon", offset: -10, onCol: "soon_on", dateCol: "sent_soon_date" },
  { key: "catchup", offset: 120, onCol: "catchup_on", dateCol: "sent_catchup_date" },
] as const

type SlotKey = (typeof SLOTS)[number]["key"]

export type TrialReminderKey = "10h" | "day2" | "day3"
const TRIAL_EMAILS: Array<{ key: TrialReminderKey; afterHours: number }> = [
  { key: "10h", afterHours: 10 },
  { key: "day2", afterHours: 48 },
  { key: "day3", afterHours: 60 },
]

/** Earliest unsent lifecycle email currently due; null outside the 3-day trial. */
export function dueTrialReminder(startedAt: string, sent: Partial<Record<TrialReminderKey, string>>, now = Date.now()): TrialReminderKey | null {
  const start = Date.parse(startedAt)
  if (!Number.isFinite(start)) return null
  const hours = (now - start) / (60 * 60 * 1000)
  if (hours < 0 || hours >= 72) return null
  return TRIAL_EMAILS.find((item) => hours >= item.afterHours && !sent[item.key])?.key ?? null
}

/** How late a tick may be and still deliver a slot, in minutes. */
const WINDOW = 20

const MINUTES_IN_DAY = 24 * 60

/**
 * The learner's own calendar date and minutes-since-midnight.
 *
 * Uses the IANA zone rather than a stored offset so DST is the platform's
 * problem, not ours — a fixed offset is wrong for half the year in most of
 * Europe and North America. `hourCycle: "h23"` because `hour12: false` renders
 * midnight as "24" on some ICU builds, which would put every learner's midnight
 * 24 hours into the future.
 */
function localNow(timeZone: string, now: Date): { date: string; minutes: number } | null {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now)
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
    const y = get("year")
    const mo = get("month")
    const d = get("day")
    const h = Number(get("hour"))
    const mi = Number(get("minute"))
    if (!y || !mo || !d || Number.isNaN(h) || Number.isNaN(mi)) return null
    return { date: `${y}-${mo}-${d}`, minutes: h * 60 + mi }
  } catch {
    // An unknown/garbage zone would otherwise throw per-row and abort the whole
    // tick, taking every other learner's reminder down with it.
    return null
  }
}

/** "19:00" → 1140. Null on anything malformed rather than defaulting silently. */
function parseHHMM(value: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(value || "").trim())
  if (!m) return null
  const h = Number(m[1])
  const mi = Number(m[2])
  if (h > 23 || mi > 59) return null
  return h * 60 + mi
}

/**
 * Which slot (if any) is due for this learner right now.
 *
 * Returns null when nothing is due — the overwhelmingly common case, since each
 * learner is due for at most ~3 of the 288 daily ticks.
 */
export function dueSlot(
  row: {
    practice_time: string
    lead_on?: boolean
    soon_on?: boolean
    catchup_on?: boolean
    sent_lead_date?: string | null
    sent_soon_date?: string | null
    sent_catchup_date?: string | null
  },
  local: { date: string; minutes: number },
): SlotKey | null {
  const practice = parseHHMM(row.practice_time)
  if (practice === null) return null

  for (const slot of SLOTS) {
    if (row[slot.onCol] === false) continue
    if ((row[slot.dateCol] ?? null) === local.date) continue

    const target = practice + slot.offset
    /*
     * Offsets can fall outside the learner's day: a 01:00 session puts `lead` at
     * 22:00 the previous evening, and a 23:00 session puts `catchup` at 01:30 the
     * next morning. Both would need cross-day bookkeeping to dedupe correctly
     * (the sent-date is a local date), and both would mean mailing someone about
     * a session on a different calendar day than the one they're in. Skipping is
     * the honest behaviour; the other two slots still fire.
     */
    if (target < 0 || target >= MINUTES_IN_DAY) continue
    if (local.minutes >= target && local.minutes < target + WINDOW) return slot.key
  }
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const action = String(req.query.action || "").toLowerCase()
  if (action === "send") return handleSend(req, res)
  if (action === "unsubscribe") return handleUnsubscribe(req, res)
  if (action === "complete") return handleComplete(req, res)
  return handleSync(req, res)
}

/* ── The congratulation email ──────────────────────────────────────
 *
 * Fired by the app the moment the learner's LAST block of the day is finished —
 * not by the cron, because only the client knows the day is complete and knows
 * what tomorrow holds. It is the one email in the system that arrives because
 * something went RIGHT, which is why it carries the streak and a link straight to
 * tomorrow's start rather than a generic "open the app".
 *
 * Exactly-once is enforced server-side on `sent_done_date` (migration 0029), not
 * by the client's own localStorage flag: a learner with two tabs open, or one who
 * clears storage, must not be able to trigger a second send.
 */
async function handleComplete(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "post_only" })
    return
  }
  const db = admin()
  const resendKey = process.env.RESEND_API_KEY
  const secret = process.env.CRON_SECRET
  if (!db || !resendKey) {
    res.status(200).json({ ok: true, disabled: true })
    return
  }
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!token) {
    res.status(401).json({ ok: false, reason: "auth_required" })
    return
  }
  try {
    const { data: userData, error } = await db.auth.getUser(token)
    if (error || !userData.user?.email) {
      res.status(401).json({ ok: false, reason: "invalid_session" })
      return
    }
    const user = userData.user
    const to = String(user.email)
    const body = (req.body || {}) as Record<string, unknown>
    const paperId = String(body.paperId || "").slice(0, 8).toUpperCase()
    const streak = Math.max(0, Math.min(3650, Number(body.streak) || 0))
    const timezone = String(body.timezone || "UTC").slice(0, 64)
    const nextTime = /^\d{2}:\d{2}$/.test(String(body.nextStartTime || "")) ? String(body.nextStartTime) : null
    const nextTopic = String(body.nextTopic || "").slice(0, 160)
    const minutes = Math.max(0, Math.min(600, Number(body.minutes) || 0))
    const questions = Math.max(0, Math.min(999, Number(body.questions) || 0))

    const local = localNow(timezone, new Date())
    const localDate = local?.date ?? new Date().toISOString().slice(0, 10)

    /*
     * Claim the day before sending, same discipline as the reminder slots: a
     * conditional update is the concurrency guard, so two tabs finishing the day
     * within the same second cannot both send. A row that does not exist yet
     * (learner never opened Settings) is created opted-out — we are not
     * subscribing anyone to the daily reminders as a side effect of finishing a
     * day, only recording the send.
     */
    const { data: existing } = await db
      .from(TABLE)
      .select("user_id, sent_done_date, opt_in")
      .eq("user_id", user.id)
      .maybeSingle()

    if (!existing) {
      await db.from(TABLE).upsert(
        { user_id: user.id, email: to, opt_in: false, timezone, sent_done_date: localDate, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      )
    } else {
      if (existing.sent_done_date === localDate) {
        res.status(200).json({ ok: true, alreadySent: true })
        return
      }
      const { data: claimed, error: claimErr } = await db
        .from(TABLE)
        .update({ sent_done_date: localDate })
        .eq("user_id", user.id)
        .or(`sent_done_date.is.null,sent_done_date.neq.${localDate}`)
        .select("user_id")
      if (claimErr) {
        // Column missing → migration 0029 not applied. Don't block the learner;
        // just skip the mail rather than risking a duplicate on every reload.
        console.warn("reminders complete:", claimErr.message)
        res.status(200).json({ ok: true, disabled: true })
        return
      }
      if (!claimed || claimed.length === 0) {
        res.status(200).json({ ok: true, alreadySent: true })
        return
      }
    }

    const unsubUrl = secret
      ? `${SITE}/api/reminders?action=unsubscribe&u=${encodeURIComponent(user.id)}&t=${unsubToken(user.id, secret)}`
      : `${SITE}/settings`
    const ok = await sendCompletionEmail(resendKey, process.env.REMINDER_FROM || "Charles at Scholify <onboarding@resend.dev>", to, unsubUrl, {
      paperId,
      streak,
      nextTime,
      nextTopic,
      minutes,
      questions,
    })
    if (!ok) await db.from(TABLE).update({ sent_done_date: null }).eq("user_id", user.id)
    res.status(200).json({ ok })
  } catch (err) {
    console.error("reminders complete:", err)
    res.status(200).json({ ok: false })
  }
}

interface CompletionFacts {
  paperId: string
  streak: number
  nextTime: string | null
  nextTopic: string
  minutes: number
  questions: number
}

/**
 * The streak line. It escalates, because "day 2" and "day 30" are not the same
 * achievement and pretending otherwise is how streak mail becomes wallpaper.
 */
function streakLine(streak: number): { badge: string; line: string } {
  if (streak <= 1) return { badge: "Day 1", line: "Day one is on the board. The second day is the one that decides whether this becomes a habit, and it is already scheduled." }
  if (streak === 2) return { badge: "2-day streak", line: "Two days back to back. This is the point most people never reach — the plan now has enough of your data to start tuning itself around you." }
  if (streak < 7) return { badge: `${streak}-day streak`, line: `${streak} days in a row. Your readiness score is now moving on evidence rather than an estimate.` }
  if (streak === 7) return { badge: "One week", line: "A full week without a gap. A week of consistent daily work is worth more than a weekend of cramming, and the numbers in your plan now reflect that." }
  if (streak < 30) return { badge: `${streak}-day streak`, line: `${streak} consecutive days. At this rate the syllabus finishes ahead of your exam date, which is exactly where you want the slack.` }
  return { badge: `${streak}-day streak`, line: `${streak} days. This is the discipline that passes ACCA papers — nothing about your exam is in doubt except the date.` }
}

async function sendCompletionEmail(apiKey: string, from: string, to: string, unsubUrl: string, facts: CompletionFacts): Promise<boolean> {
  const s = streakLine(facts.streak)
  const paper = facts.paperId || "your paper"
  const avatar = `${SITE}/charles/email-avatar.png`
  const logo = `${SITE}/icon-192.png`
  const subject = facts.streak >= 2 ? `${paper} done — ${s.badge}` : `${paper} done for today`
  const heading = "Today's mission is complete"
  const did = [
    facts.minutes > 0 ? `${facts.minutes} minutes` : null,
    facts.questions > 0 ? `${facts.questions} questions` : null,
  ].filter(Boolean).join(" · ")

  const tomorrow = facts.nextTime
    ? `Tomorrow opens at <strong>${facts.nextTime}</strong>${facts.nextTopic ? ` with ${escapeHtmlLite(facts.nextTopic)}` : ""}. It is locked until then on purpose — working ahead tonight is how a daily plan turns into a backlog.`
    : `Tomorrow's plan is already built and waiting${facts.nextTopic ? `: ${escapeHtmlLite(facts.nextTopic)}` : ""}.`

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F3F1;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 18px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td valign="middle"><img src="${avatar}" width="72" height="72" alt="Charles, Scholify race engineer" style="display:block;width:72px;height:72px;border-radius:18px;border:1px solid #E8E0DC;"></td>
            <td align="right" valign="middle"><img src="${logo}" width="68" height="68" alt="Scholify" style="display:inline-block;width:68px;height:68px;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.8px;color:#0E9F6E;text-transform:uppercase;">Charles &middot; ${escapeHtmlLite(paper)} &middot; ${escapeHtmlLite(s.badge)}</td></tr>
        <tr><td style="padding:8px 32px 0;font-size:28px;line-height:34px;font-weight:800;letter-spacing:-0.8px;color:#14141A;">${heading}</td></tr>
        <tr><td style="padding:14px 32px 4px;font-size:15px;line-height:24px;color:#5F5753;">${escapeHtmlLite(s.line)}</td></tr>
        ${did ? `<tr><td style="padding:10px 32px 4px;"><div style="display:inline-block;background:#F2FBF6;border:1px solid #CFEEDF;border-radius:12px;padding:11px 15px;font-size:13px;font-weight:700;color:#0B7A55;">Today: ${escapeHtmlLite(did)}</div></td></tr>` : ""}
        <tr><td style="padding:14px 32px 16px;font-size:15px;line-height:24px;color:#5F5753;">${tomorrow}</td></tr>
        <tr><td style="padding:0 32px 22px;font-size:14px;line-height:22px;color:#8F8C85;">Now stop. Rest is part of the plan, not a reward for finishing it.</td></tr>
        <tr><td style="padding:0 32px 30px;"><a href="${SITE}/study?tab=tomorrow" style="display:inline-block;background:#C80000;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:800;line-height:20px;padding:13px 22px;border-radius:12px;">See tomorrow's plan &rarr;</a></td></tr>
        <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Charles &middot; Your Scholify race engineer<br>You are receiving this because you completed a day of your ${escapeHtmlLite(paper)} plan.<br><a href="${unsubUrl}" style="color:#8F8C85;">Unsubscribe</a> &middot; or change what you get in <a href="${SITE}/settings" style="color:#8F8C85;">Settings</a>.${SOCIAL_FOOTER}</td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`

  const text = [
    heading,
    "",
    s.line,
    did ? `Today: ${did}` : "",
    "",
    facts.nextTime ? `Tomorrow opens at ${facts.nextTime}${facts.nextTopic ? ` with ${facts.nextTopic}` : ""}.` : "Tomorrow's plan is already built.",
    "Now stop. Rest is part of the plan.",
    "",
    `See tomorrow's plan: ${SITE}/study?tab=tomorrow`,
    "",
    "— Charles · Your Scholify race engineer",
    `Unsubscribe: ${unsubUrl}`,
  ].filter(Boolean).join("\n")

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        text,
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

/** Minimal HTML escape for the few learner-supplied strings in the mail. */
function escapeHtmlLite(value: string): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
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
    /*
     * The timezone is trusted from the client because only the client can know
     * it — there is no server-side source for "which zone is this person in"
     * that is not a guess from an IP. It is validated against the platform's own
     * zone list rather than stored raw, so a malformed value cannot silently
     * break this learner's sender loop later.
     */
    const tzRaw = String(body.timezone || "").slice(0, 64)
    let timezone = "UTC"
    if (tzRaw) {
      try {
        new Intl.DateTimeFormat("en", { timeZone: tzRaw })
        timezone = tzRaw
      } catch {
        /* keep UTC */
      }
    }
    const practice = /^\d{2}:\d{2}$/.test(String(body.practiceTime || "")) ? String(body.practiceTime) : "19:00"
    const slots = (body.slots || {}) as Record<string, unknown>
    const row = {
      user_id: userData.user.id,
      email,
      opt_in: Boolean(body.optIn),
      timezone,
      practice_time: practice,
      // Kept in step so anything still reading the legacy column agrees.
      reminder_time: practice,
      // Two reminders by default (soon + catchup). The 3-hour heads-up is
      // opt-IN — `=== true`, not `!== false` — so a client that omits the slots
      // object gets the two the product promises and not a third.
      lead_on: slots.lead === true,
      soon_on: slots.soon !== false,
      catchup_on: slots.catchup !== false,
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

  const from = process.env.REMINDER_FROM || "Charles at Scholify <onboarding@resend.dev>"
  const now = new Date()

  try {
    const { data, error } = await db
      .from(TABLE)
      .select(
        "user_id, email, timezone, practice_time, last_session_date, lead_on, soon_on, catchup_on, sent_lead_date, sent_soon_date, sent_catchup_date",
      )
      .eq("opt_in", true)
      .limit(2000)
    if (error) {
      // A missing column here means migration 0026 has not been applied yet.
      console.warn("reminders send:", error.message)
      // Trial lifecycle mail is sourced from Auth metadata, so it must keep
      // working even when the optional practice-reminder table is unavailable.
      const trialSent = await sendDueTrialEmails(db, resendKey, from, now)
      res.status(200).json({ sent: 0, trialSent, practiceDisabled: true })
      return
    }

    let sent = 0
    let considered = 0
    for (const r of data || []) {
      if (!r.email) continue
      const local = localNow(String(r.timezone || "UTC"), now)
      if (!local) continue

      /*
       * Already studied today → say nothing. All three reminders exist to get a
       * session started; once one has happened they are just noise, and noise is
       * what gets a sender marked as spam.
       */
      if (r.last_session_date === local.date) continue

      const slot = dueSlot(r as Parameters<typeof dueSlot>[0], local)
      if (!slot) continue
      considered += 1

      const unsubUrl = `${SITE}/api/reminders?action=unsubscribe&u=${encodeURIComponent(
        r.user_id as string,
      )}&t=${unsubToken(r.user_id as string, secret as string)}`

      /*
       * Claim the slot BEFORE sending, not after. If the write happened after a
       * successful send and the function timed out in between, the next tick 5
       * minutes later would see an unclaimed slot and mail the learner a second
       * time. Losing a reminder to a failed send is recoverable (the window is
       * wider than one tick, so the next tick retries); double-mailing someone is
       * not. The conditional filter also makes two overlapping ticks safe — only
       * one of them can claim the row.
       *
       * The condition is "unset OR not today", not just "unset": from day two
       * onward the column holds YESTERDAY's date, so an is-null-only claim would
       * never match again and every learner would get exactly one day of
       * reminders and then silence.
       */
      const dateCol = SLOTS.find((s) => s.key === slot)!.dateCol
      const { data: claimed, error: claimErr } = await db
        .from(TABLE)
        .update({ [dateCol]: local.date })
        .eq("user_id", r.user_id)
        .or(`${dateCol}.is.null,${dateCol}.neq.${local.date}`)
        .select("user_id")
      if (claimErr || !claimed || claimed.length === 0) continue

      const ok = await sendEmail(resendKey, from, r.email as string, unsubUrl, slot, String(r.practice_time || ""))
      if (ok) {
        sent += 1
        // Kept in step for anything still reading the legacy column.
        await db.from(TABLE).update({ last_reminded: local.date }).eq("user_id", r.user_id)
      } else {
        // Release the claim so the next tick inside the window can retry.
        await db.from(TABLE).update({ [dateCol]: null }).eq("user_id", r.user_id)
      }
    }
    const trialSent = await sendDueTrialEmails(db, resendKey, from, now)
    res.status(200).json({ sent, considered, trialSent })
  } catch (err) {
    console.error("reminders send:", err)
    res.status(200).json({ sent: 0, disabled: true })
  }
}

async function sendDueTrialEmails(db: NonNullable<ReturnType<typeof admin>>, apiKey: string, from: string, now: Date): Promise<number> {
  let page = 1
  let sentCount = 0
  while (page <= 10) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 200 })
    if (error || !data?.users?.length) break
    for (const user of data.users) {
      if (!user.email) continue
      const meta = user.app_metadata ?? {}
      const stripeTrial = String(meta.plan_status ?? "") === "trialing"
      const legacyTrial = String(meta.plan ?? "free") === "free"
      if ((!stripeTrial && !legacyTrial) || !meta.trial_started_at) continue
      const sent = (meta.trial_reminders_sent ?? {}) as Partial<Record<TrialReminderKey, string>>
      const due = dueTrialReminder(String(meta.trial_started_at), sent, now.getTime())
      if (!due) continue
      const ok = await sendTrialEmail(apiKey, from, user.email, due)
      if (!ok) continue
      await db.auth.admin.updateUserById(user.id, {
        app_metadata: { ...meta, trial_reminders_sent: { ...sent, [due]: now.toISOString() } },
      })
      sentCount += 1
    }
    if (data.users.length < 200) break
    page += 1
  }
  return sentCount
}

async function sendTrialEmail(apiKey: string, from: string, to: string, slot: TrialReminderKey): Promise<boolean> {
  const copy = slot === "10h"
    ? { subject: "Your Scholify plan is ready for tonight", kicker: "Pro trial · Day 1", heading: "Your first study block is ready.", body: "Charles has turned your diagnosis into a focused session for today. Your 3-day Pro trial currently unlocks all 15 ACCA papers, full mocks, the AI Examiner, analytics and custom AI practice—so this is the best time to test the complete Scholify workspace.", detail: "Open your dashboard, follow the first recommended task, and answer enough questions for Scholify to begin adapting tomorrow’s workload to your real performance.", cta: "Continue today’s plan", href: `${SITE}/dashboard` }
    : slot === "day2"
      ? { subject: "Day 2 of your Scholify trial", kicker: "Pro trial · Day 2", heading: "Your plan is learning from you.", body: "Every answer updates your accuracy, weak-topic map and readiness trend. Charles uses that evidence to move the highest-impact work forward instead of giving you another generic revision list.", detail: "Complete today’s recommended session, then open Analytics to see which syllabus areas are strengthening and which ones still need deliberate practice.", cta: "Start day 2", href: `${SITE}/dashboard` }
      : { subject: "Your Scholify trial ends today", kicker: "Pro trial · Final day", heading: "Your final free day is running.", body: "Your personalized plan, answers and progress remain saved. Your selected Pro subscription begins when the Stripe trial ends, using the payment method added at checkout.", detail: "Want to continue? No action is needed. If you do not want the subscription to start, open Settings and cancel before the exact trial deadline shown there; cancelling before that deadline prevents the first charge.", cta: "Review my subscription", href: `${SITE}/settings` }
  const avatar = `${SITE}/charles/email-avatar.png`
  const logo = `${SITE}/icon-192.png`
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F7F3F1;"><tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
      <tr><td style="height:5px;background:linear-gradient(90deg,#C80000,#E50068,#F4A405);font-size:0;">&nbsp;</td></tr>
      <tr><td style="padding:28px 32px 18px;"><table role="presentation" width="100%"><tr>
        <td><img src="${avatar}" width="72" height="72" alt="Charles, Scholify study coach" style="display:block;border-radius:18px;border:1px solid #E8E0DC;"></td>
        <td align="right"><img src="${logo}" width="68" height="68" alt="Scholify" style="display:inline-block;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
      </tr></table></td></tr>
      <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.7px;color:#C80000;text-transform:uppercase;">Charles &middot; ${copy.kicker}</td></tr>
      <tr><td style="padding:8px 32px 0;font-size:28px;line-height:35px;font-weight:800;color:#14141A;">${copy.heading}</td></tr>
      <tr><td style="padding:14px 32px 8px;font-size:15px;line-height:24px;color:#5F5753;">${copy.body}</td></tr>
      <tr><td style="padding:8px 32px 18px;"><div style="padding:16px 18px;background:#FAFAF7;border:1px solid #EEE7E3;border-radius:14px;font-size:14px;line-height:22px;color:#5F5753;"><strong style="color:#14141A;">Your next move</strong><br>${copy.detail}</div></td></tr>
      <tr><td style="padding:4px 32px 30px;"><a href="${copy.href}" style="display:inline-block;padding:13px 22px;border-radius:12px;background:#C80000;color:#fff;text-decoration:none;font-size:14px;font-weight:800;">${copy.cta} &rarr;</a></td></tr>
      <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Charles &middot; Your Scholify study coach<br>Your learning data remains saved to your account.<br><a href="${SITE}/settings" style="color:#C80000;text-decoration:none;">Manage subscription</a> &middot; <a href="${SITE}/support" style="color:#C80000;text-decoration:none;">Get support</a>${SOCIAL_FOOTER}</td></tr>
    </table>
  </td></tr></table></body></html>`
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: copy.subject,
        reply_to: "scholifyaiapp@gmail.com",
        html,
        text: `${copy.heading}\n\n${copy.body}\n\nYour next move: ${copy.detail}\n\n${copy.cta}: ${copy.href}\n\nManage subscription: ${SITE}/settings\nSupport: ${SITE}/support`,
      }),
    })
    return response.ok
  } catch {
    return false
  }
}

/*
 * COPY. Three genuinely different messages, because three identical ones read
 * as a malfunction. Each states plainly why it has arrived and asks for one
 * thing. No exclamation marks, no emoji in the body, no invented statistics and
 * no guilt — a learner who missed a session already knows, and being told off by
 * software is what makes people unsubscribe.
 *
 * `at` is the learner's own practice time, echoed back so the mail is obviously
 * about a commitment they made rather than a generic broadcast.
 */
function copyFor(slot: SlotKey, at: string): { subject: string; kicker: string; heading: string; body: string; cta: string } {
  const time = /^\d{1,2}:\d{2}$/.test(at) ? at : null
  if (slot === "lead") {
    return {
      subject: time ? `Your ACCA session is at ${time}` : "Your ACCA session is scheduled for today",
      kicker: "Today's schedule",
      heading: time ? `Your session is at ${time}` : "Your session is scheduled for today",
      body:
        "This is your advance notice, two hours ahead, so the time is easy to protect. Your questions are already selected and the session will be waiting when you arrive — nothing to set up.",
      cta: "Review today's plan",
    }
  }
  if (slot === "soon") {
    return {
      subject: time ? `You start at ${time} — ten minutes` : "Your session starts in 10 minutes",
      kicker: "Starting in 10 minutes",
      heading: time ? `Ten minutes until ${time}` : "Ten minutes until your session",
      body:
        "Time to finish what you are on and get to the desk. Today's chapter, five quizzes, your practice set, flashcards and the technical article are already selected — opening the session is the whole task, and Charles takes it from there.",
      cta: "Open today's session",
    }
  }
  return {
    subject: "Today's session is still open",
    heading: "Two hours on, and today is still open",
    kicker: "Still open",
    body:
      "Your start time passed two hours ago and today's plan has not been opened. A shortened version still counts: the chapter alone keeps your plan on its schedule and your streak intact, and tomorrow absorbs the difference. Nothing is piling up.",
    cta: "Start a shorter session",
  }
}

async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  unsubUrl: string,
  slot: SlotKey = "soon",
  practiceTime = "",
): Promise<boolean> {
  const c = copyFor(slot, practiceTime)
  // Email-safe PNG assets (Outlook/Apple Mail don't reliably render SVG/WebP).
  const avatar = `${SITE}/charles/email-avatar.png`
  const logo = `${SITE}/icon-192.png`
  // Premium Scholify frame shared by reminders and transactional notifications.
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F7F3F1;font-family:Arial,Helvetica,sans-serif;color:#332B28;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F3F1;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E8E0DC;border-radius:20px;overflow:hidden;">
        <tr><td style="height:5px;background:linear-gradient(90deg,#C80000 0%,#E50068 52%,#F4A405 100%);font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 18px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td valign="middle"><img src="${avatar}" width="72" height="72" alt="Charles, Scholify race engineer" style="display:block;width:72px;height:72px;border-radius:18px;border:1px solid #E8E0DC;"></td>
            <td align="right" valign="middle"><img src="${logo}" width="68" height="68" alt="Scholify" style="display:inline-block;width:68px;height:68px;border-radius:17px;"><div style="font-size:9px;font-weight:700;letter-spacing:1.8px;color:#8F8C85;margin-top:5px;">LEARN DAILY &middot; GROW STEADILY</div></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 32px 0;font-size:10px;font-weight:800;letter-spacing:1.8px;color:#C80000;text-transform:uppercase;">Charles &middot; ${c.kicker}</td></tr>
        <tr><td style="padding:8px 32px 0;font-size:28px;line-height:34px;font-weight:800;letter-spacing:-0.8px;color:#14141A;">${c.heading}</td></tr>
        <tr><td style="padding:14px 32px 16px;font-size:15px;line-height:24px;color:#5F5753;">${c.body}</td></tr>
        <tr><td style="padding:8px 32px 30px;"><a href="${SITE}/study" style="display:inline-block;background:#C80000;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:800;line-height:20px;padding:13px 22px;border-radius:12px;">${c.cta} &rarr;</a></td></tr>
        <tr><td style="padding:20px 32px;background:#FAFAF7;border-top:1px solid #EEE7E3;font-size:12px;line-height:19px;color:#8F8C85;">Charles &middot; Your Scholify race engineer<br>You are receiving this because you set a daily practice time in Scholify.<br><a href="${unsubUrl}" style="color:#8F8C85;">Unsubscribe</a> &middot; or change the times in <a href="${SITE}/settings" style="color:#8F8C85;">Settings</a>.${SOCIAL_FOOTER}</td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`
  // Plain-text alternative — lowers spam score and covers text-only clients.
  const text = [
    c.heading,
    "",
    c.body,
    "",
    `${c.cta}: ${SITE}/study`,
    "",
    "— Charles · Your Scholify race engineer",
    "You are receiving this because you set a daily practice time in Scholify.",
    `Change the times: ${SITE}/settings`,
    `Unsubscribe: ${unsubUrl}`,
  ].join("\n")
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: c.subject,
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
