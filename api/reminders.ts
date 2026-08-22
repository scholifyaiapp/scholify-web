import { createClient } from "@supabase/supabase-js"
import type { VercelRequest, VercelResponse } from "./vercel-types.js"
import { createHmac, timingSafeEqual } from "node:crypto"
import { deliverEmail, esc, renderBrandEmail, renderTextEmail, verifiedSender } from "./email-theme.js"

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
 * TOLERANCE. A slot fires when the learner's local clock is between its target
 * and target + its own window (see SLOTS). The windows are far wider than any
 * tick interval on purpose: no scheduler we can reach is reliable to the
 * minute, and a skipped tick must not silently drop someone's reminder.
 * Exactly-once is guaranteed by the per-slot sent_*_date columns instead,
 * never by the window.
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
/*
 * ── EACH SLOT CARRIES ITS OWN TOLERANCE ─────────────────────────
 *
 * There used to be one WINDOW of 20 minutes for all three, on the assumption
 * that the sender is called every ~5 minutes. It is not. GitHub's scheduled
 * workflows are best-effort and heavily throttled on free runners — the first
 * two real runs came 54 minutes apart, not 5 — and Vercel's Hobby cron is once
 * a DAY. A 20-minute tolerance against an hourly tick misses most learners,
 * silently, which is exactly the failure this whole feature had before.
 *
 * Rather than depend on a scheduler nobody controls, each slot now declares how
 * late it can be delivered and still MEAN what it says:
 *
 *   lead    100 min — fires anywhere from −120 to −20. Always comfortably
 *                     before the session, so lateness costs nothing. Stops
 *                     short of `soon` so the two never arrive together.
 *   soon     20 min — stays tight on purpose. "Your session starts in ten
 *                     minutes" is false forty minutes later, and a reminder
 *                     that lies is worse than one that is missed. If a tick
 *                     skips it, `catchup` covers the learner anyway.
 *   catchup 180 min — the "you haven't studied today" nudge. Its meaning does
 *                     not decay, so it tolerates the longest delay.
 *
 * Exactly-once is still guaranteed by the per-slot sent_*_date columns, never
 * by the window — so widening these cannot double-send.
 */
/*
 * The sender address, with no silent fallback and no sandbox — see
 * verifiedSender() in api/email-theme.ts. Both failure modes have happened in
 * production: REMINDER_FROM present-but-empty (fallback silently used the
 * sandbox, learners got nothing), and REMINDER_FROM set TO the sandbox
 * address, which routed every learner email into the admin inbox instead.
 */
function senderAddress(): string | null {
  return verifiedSender()
}

const SLOTS = [
  { key: "lead", offset: -120, window: 100, onCol: "lead_on", dateCol: "sent_lead_date" },
  { key: "soon", offset: -10, window: 20, onCol: "soon_on", dateCol: "sent_soon_date" },
  { key: "catchup", offset: 120, window: 180, onCol: "catchup_on", dateCol: "sent_catchup_date" },
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

/*
 * The single WINDOW constant was here. Tolerance is per-slot now — see SLOTS —
 * because how late a reminder may be depends entirely on what it says.
 */

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
    if (local.minutes >= target && local.minutes < target + slot.window) return slot.key
  }
  return null
}

/* ── The lapse back-off ────────────────────────────────────────────
 *
 * Before migration 0032, a learner who stopped studying kept receiving the
 * soon + catchup pair EVERY day, forever — two emails a day to someone who has
 * already stopped listening. That is the classic way a sender domain earns a
 * spam reputation, and it was also a large silent send volume nobody watched.
 *
 * From day 3 of a lapse the daily cadence stops entirely and is replaced by
 * exactly two messages: one on day 3, one on day 7, then silence until the
 * learner returns. "Returned" means last_session_date moved, which re-arms
 * both — the guard is `sent_lapse*_date >= anchor`, a comparison, not a flag.
 *
 * Both fire in a wide window anchored just before the learner's practice time,
 * because that is the hour they once chose as "when I study" — the one moment
 * of the day the message lands on a decision instead of interrupting one.
 */
export type LapseKey = "lapse3" | "lapse7"

const LAPSE_WINDOW = 180

/** Whole local days between two ISO dates; null when either is unparseable. */
export function daysBetween(fromDate: string, toDate: string): number | null {
  const from = Date.parse(fromDate)
  const to = Date.parse(toDate)
  if (!Number.isFinite(from) || !Number.isFinite(to)) return null
  return Math.round((to - from) / 86_400_000)
}

/**
 * Which lapse email (if any) is due right now. `anchor` is the learner's last
 * session date — the reference the whole episode is measured from.
 */
export function dueLapse(
  row: {
    practice_time: string
    last_session_date?: string | null
    sent_lapse3_date?: string | null
    sent_lapse7_date?: string | null
  },
  local: { date: string; minutes: number },
): LapseKey | null {
  const anchor = row.last_session_date ?? null
  if (!anchor) return null
  const gap = daysBetween(anchor, local.date)
  if (gap === null || gap < 3) return null

  const practice = parseHHMM(row.practice_time)
  if (practice === null) return null
  const target = practice - 10
  if (target < 0 || target >= MINUTES_IN_DAY) return null
  if (local.minutes < target || local.minutes >= target + LAPSE_WINDOW) return null

  const sentThisEpisode = (sent?: string | null) => Boolean(sent && sent >= anchor)
  // Day 7 first: a learner whose lapse was only discovered late gets ONE
  // message, the truthful one, never a day-3 email four days stale.
  if (gap >= 7) return sentThisEpisode(row.sent_lapse7_date) ? null : "lapse7"
  return sentThisEpisode(row.sent_lapse3_date) ? null : "lapse3"
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
    // No sandbox fallback: without a real sender this mail would be accepted by
    // Resend and delivered to nobody, so say so rather than pretend it went.
    const senderFrom = senderAddress()
    if (!senderFrom) {
      res.status(200).json({ ok: true, emailed: false, reason: "REMINDER_FROM not configured" })
      return
    }
    const ok = await sendCompletionEmail(senderFrom, to, unsubUrl, {
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

async function sendCompletionEmail(from: string, to: string, unsubUrl: string, facts: CompletionFacts): Promise<boolean> {
  const s = streakLine(facts.streak)
  const paper = facts.paperId || "your paper"
  const subject = facts.streak >= 2 ? `${paper} done — ${s.badge}` : `${paper} done for today`

  const tomorrow = facts.nextTime
    ? `Tomorrow opens at <b>${esc(facts.nextTime)}</b>${facts.nextTopic ? ` with <b>${esc(facts.nextTopic)}</b>` : ""}. It is locked until then on purpose — working ahead tonight is how a daily plan turns into a backlog, and the plan protects you from that the same way it protects you from falling behind.`
    : `Tomorrow's plan is already built and waiting${facts.nextTopic ? `: <b>${esc(facts.nextTopic)}</b>` : ""}.`

  const stats: Array<{ value: string; label: string }> = [
    { value: s.badge, label: "Streak" },
    ...(facts.minutes > 0 ? [{ value: String(facts.minutes), label: "Minutes" }] : []),
    ...(facts.questions > 0 ? [{ value: String(facts.questions), label: "Questions" }] : []),
  ]

  const html = renderBrandEmail({
    preheader: `${paper} is done for today. ${facts.nextTime ? `Tomorrow opens at ${facts.nextTime}.` : "Tomorrow is already built."}`,
    eyebrow: `Charles · ${esc(paper)} · ${esc(s.badge)}`,
    title: "Today's mission is complete",
    blocks: [
      { type: "p", lead: true, html: esc(s.line) },
      { type: "stats", items: stats },
      { type: "p", html: tomorrow },
      { type: "note", html: `Now stop. Rest is part of the plan, not a reward for finishing it — consolidation happens away from the desk, and tomorrow's session is better for it.` },
    ],
    cta: { label: "See tomorrow's plan", href: `${SITE}/study?tab=tomorrow` },
    reason: `You are receiving this because you completed a day of your ${paper} plan.`,
    unsubUrl,
  })

  const text = renderTextEmail([
    "Today's mission is complete",
    "",
    s.line,
    facts.minutes > 0 || facts.questions > 0
      ? `Today: ${[facts.minutes > 0 ? `${facts.minutes} minutes` : null, facts.questions > 0 ? `${facts.questions} questions` : null].filter(Boolean).join(" · ")}`
      : null,
    "",
    facts.nextTime ? `Tomorrow opens at ${facts.nextTime}${facts.nextTopic ? ` with ${facts.nextTopic}` : ""}.` : "Tomorrow's plan is already built.",
    "Now stop. Rest is part of the plan.",
    "",
    `See tomorrow's plan: ${SITE}/study?tab=tomorrow`,
    "",
    "— Charles · Your Scholify race engineer",
    `Unsubscribe: ${unsubUrl}`,
  ])

  return Boolean(await deliverEmail({ from, to, subject, html, text, unsubUrl }))
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

  const from = senderAddress()
  if (!from) {
    res.status(500).json({ error: "REMINDER_FROM is not configured." })
    return
  }
  const now = new Date()

  try {
    const { data, error } = await db
      .from(TABLE)
      .select(
        "user_id, email, timezone, practice_time, last_session_date, lead_on, soon_on, catchup_on, sent_lead_date, sent_soon_date, sent_catchup_date, sent_lapse3_date, sent_lapse7_date",
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

      /*
       * THE BACK-OFF (migration 0032). Three or more days since the last
       * session and this learner leaves the daily cadence entirely: one email
       * on day 3, one on day 7, then silence until they return. Without this,
       * a dormant opted-in learner received soon + catchup every day forever —
       * unread mail at best, a spam report at worst, and in the sandbox-sender
       * incident it was the bulk of the 90-a-day admin-inbox flood.
       */
      const gap = r.last_session_date ? daysBetween(String(r.last_session_date), local.date) : null
      if (gap !== null && gap >= 3) {
        const lapse = dueLapse(r as Parameters<typeof dueLapse>[0], local)
        if (!lapse) continue
        considered += 1
        const lapseCol = lapse === "lapse7" ? "sent_lapse7_date" : "sent_lapse3_date"
        const anchor = String(r.last_session_date)
        const { data: lapseClaimed, error: lapseClaimErr } = await db
          .from(TABLE)
          .update({ [lapseCol]: local.date })
          .eq("user_id", r.user_id)
          .or(`${lapseCol}.is.null,${lapseCol}.lt.${anchor}`)
          .select("user_id")
        if (lapseClaimErr || !lapseClaimed || lapseClaimed.length === 0) continue
        const lapseUnsub = `${SITE}/api/reminders?action=unsubscribe&u=${encodeURIComponent(
          r.user_id as string,
        )}&t=${unsubToken(r.user_id as string, secret as string)}`
        const lapseOk = await sendLapseEmail(from, r.email as string, lapseUnsub, lapse, gap)
        if (lapseOk) sent += 1
        else await db.from(TABLE).update({ [lapseCol]: null }).eq("user_id", r.user_id)
        continue
      }

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
  void apiKey // delivery reads RESEND_API_KEY itself; parameter kept for the call-site contract
  const copy =
    slot === "10h"
      ? {
          subject: "Your Scholify plan is ready for tonight",
          kicker: "Pro trial · Day 1 of 3",
          heading: "Your first study block is ready.",
          preheader: "Your diagnostic became a plan. Tonight's session is already on the desk.",
          lead: `While you were away, I turned your diagnostic into an actual plan — sequenced against your exam date, your available hours and the topics where your marks are cheapest to win. Tonight's session is already selected and waiting.`,
          body: `These three days unlock everything: all 15 ACCA papers, full CBE-style mocks, the AI Examiner that marks written answers, analytics, and custom practice built on demand. The best way to judge Scholify is not to browse it — it is to do one real session and watch tomorrow's plan change shape because of it.`,
          facts: [
            { label: "Tonight", value: "One block — it's already chosen" },
            { label: "Tomorrow", value: "The plan re-sequences on your answers" },
            { label: "Day 3", value: "Your readiness score turns real" },
          ],
          cta: { label: "Open tonight's block", href: `${SITE}/dashboard` },
        }
      : slot === "day2"
        ? {
            subject: "Day 2 — your plan is learning from you",
            kicker: "Pro trial · Day 2 of 3",
            heading: "The plan is no longer a guess.",
            preheader: "Every answer you gave yesterday moved something. Come and see what.",
            lead: `Every answer you have given so far updated three things: your accuracy per syllabus area, your weak-topic map, and your readiness trend. Today's session was built from that evidence — not from a generic revision list that looks the same for everyone.`,
            body: `After today's block, open Analytics and look at the readiness panel. You will see exactly which areas are strengthening and which still need deliberate practice — the same view you will use in the final week before the exam, when knowing where NOT to spend hours is what protects your pass.`,
            facts: [
              { label: "Today", value: "The recommended session, then Analytics" },
              { label: "Worth knowing", value: "Streaks compound — day 2 is the hinge" },
            ],
            cta: { label: "Start day 2", href: `${SITE}/dashboard` },
          }
        : {
            subject: "Your trial ends today — here is exactly what happens",
            kicker: "Pro trial · Final day",
            heading: "Your final free day is running.",
            preheader: "No action needed to continue. The honest cancel path is inside, with its deadline.",
            lead: `Everything you have built — your plan, your answers, your analytics — is saved to your account either way. When the trial ends, your selected Pro subscription starts on the payment method you added at checkout. To continue, you do nothing at all.`,
            body: `If you do not want the subscription to start, open Settings and cancel before the exact deadline shown there — cancelling before that moment prevents the first charge entirely, no questions asked. That is the whole policy; there is no small print to find later. And if you stay: tonight's block is already on the desk.`,
            facts: [
              { label: "To continue", value: "No action needed" },
              { label: "To cancel", value: "Settings, before the deadline shown there" },
              { label: "Your data", value: "Saved to your account either way" },
            ],
            cta: { label: "Review my subscription", href: `${SITE}/settings` },
          }

  const html = renderBrandEmail({
    preheader: copy.preheader,
    eyebrow: `Charles · ${copy.kicker}`,
    title: copy.heading,
    blocks: [
      { type: "p", lead: true, html: copy.lead },
      { type: "p", html: copy.body },
      { type: "facts", rows: copy.facts },
    ],
    cta: copy.cta,
    secondary: { label: "Questions? Just reply — a person reads it.", href: `mailto:info@scholifyapp.com` },
    reason: "You are receiving this because you started a Scholify Pro trial.",
  })

  const text = renderTextEmail([
    copy.heading,
    "",
    copy.lead,
    "",
    copy.body,
    "",
    ...copy.facts.map((fact) => `  ${fact.label} — ${fact.value}`),
    "",
    `${copy.cta.label}: ${copy.cta.href}`,
    "",
    "— Charles · Your Scholify race engineer",
    `Manage subscription: ${SITE}/settings`,
  ])

  return Boolean(
    await deliverEmail({ from, to, subject: copy.subject, html, text, replyTo: "info@scholifyapp.com" }),
  )
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
function copyFor(slot: SlotKey, at: string): {
  subject: string
  kicker: string
  heading: string
  preheader: string
  lead: string
  body: string
  note: string
  cta: string
} {
  const time = /^\d{1,2}:\d{2}$/.test(at) ? at : null
  if (slot === "lead") {
    return {
      subject: time ? `Your ACCA session is at ${time}` : "Your ACCA session is scheduled for today",
      kicker: "Today's schedule",
      heading: time ? `Your session is at ${time}` : "Your session is scheduled for today",
      preheader: "Advance notice, two hours ahead, so the time is easy to protect.",
      lead: `This is your advance notice, two hours ahead — enough time to move what needs moving so ${time ? `<b>${time}</b>` : "your session"} stays yours.`,
      body: `Everything is already on the desk: today's chapter, the five quizzes, your practice set, the flashcards due for review and the technical article. There is nothing to set up and nothing to decide — the plan chose today's work from your own numbers. Your only job is to arrive.`,
      note: `A protected half hour beats a hopeful evening. Put it in the calendar like a meeting with someone you respect — because it is.`,
      cta: "Review today's plan",
    }
  }
  if (slot === "soon") {
    return {
      subject: time ? `You start at ${time} — ten minutes` : "Your session starts in 10 minutes",
      kicker: "Starting in 10 minutes",
      heading: time ? `Ten minutes until ${time}` : "Ten minutes until your session",
      preheader: "Everything is selected and waiting. Opening the session is the whole task.",
      lead: `Time to finish what you are on and get to the desk. Ten minutes is exactly enough to close the tabs, refill the glass and sit down.`,
      body: `Today's chapter, five quizzes, your practice set, flashcards and the technical article are already selected. Opening the session is the whole task — I take it from there, one block at a time, and the session ends when the plan says it ends, not when guilt does.`,
      note: `The hardest rep of any session is the first ten seconds. Everything after the click is easier than the click.`,
      cta: "Open today's session",
    }
  }
  return {
    subject: "Today's session is still open",
    kicker: "Still open",
    heading: "Two hours on, and today is still open",
    preheader: "A shortened session still counts. The chapter alone keeps everything on schedule.",
    lead: `Your start time passed two hours ago and today's plan has not been opened. That is all this email is — a fact, not a verdict.`,
    body: `A shortened version still counts, and counts fully: the chapter alone keeps your plan on its schedule and your streak intact, and tomorrow absorbs the difference automatically. Nothing is piling up behind you — the plan re-balances every night precisely so that one irregular day never becomes a debt.`,
    note: `Twenty minutes tonight is worth more than a perfect plan for tomorrow. The evening is still usable — that is why this email arrives now and not at midnight.`,
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
  void apiKey // delivery reads RESEND_API_KEY itself; parameter kept for the call-site contract
  const c = copyFor(slot, practiceTime)
  const html = renderBrandEmail({
    preheader: c.preheader,
    eyebrow: `Charles · ${c.kicker}`,
    title: c.heading,
    blocks: [
      { type: "p", lead: true, html: c.lead },
      { type: "p", html: c.body },
      { type: "note", html: c.note },
    ],
    cta: { label: c.cta, href: `${SITE}/study` },
    reason: "You are receiving this because you set a daily practice time in Scholify.",
    unsubUrl,
  })
  // Plain-text alternative — lowers spam score and covers text-only clients.
  const text = renderTextEmail([
    c.heading,
    "",
    c.lead.replace(/<[^>]+>/g, ""),
    "",
    c.body.replace(/<[^>]+>/g, ""),
    "",
    `${c.cta}: ${SITE}/study`,
    "",
    "— Charles · Your Scholify race engineer",
    "You are receiving this because you set a daily practice time in Scholify.",
    `Change the times: ${SITE}/settings`,
    `Unsubscribe: ${unsubUrl}`,
  ])
  return Boolean(await deliverEmail({ from, to, subject: c.subject, html, text, unsubUrl }))
}

/*
 * THE LAPSE EMAILS. Two messages, an honest bargain stated out loud: we notice
 * you have stepped away, we stop the daily cadence, and we say so — "this is
 * the only email you'll get this week" is itself the most premium sentence a
 * reminder system can send. Day 3 is practical (what actually happens to
 * recall and how cheaply it is repaired); day 7 is warm and final (everything
 * is saved, one session restarts the engine, and we go quiet until then).
 */
async function sendLapseEmail(from: string, to: string, unsubUrl: string, slot: LapseKey, gapDays: number): Promise<boolean> {
  const days = Math.max(gapDays, slot === "lapse7" ? 7 : 3)
  const copy =
    slot === "lapse3"
      ? {
          subject: "Three days out — your plan has already adjusted",
          kicker: "Charles · Day 3 away",
          heading: "The plan bent. It didn't break.",
          preheader: "The daily reminders have stopped. Here is what three days actually costs, and how cheaply it is repaired.",
          lead: `It has been ${days} days since your last session, so I have stopped the daily reminders — you will not hear from me again this week unless you come back. This email is the exception, and it exists because day 3 is the cheapest day to return.`,
          body: `Here is what three days actually does: recall on your most recent topics starts to soften, so your next session begins with a short, targeted review the plan has already built. Nothing else moved. Your streak trees, your XP, your readiness history — all exactly where you left them. One ordinary session tonight and the plan re-sequences around your exam date as if nothing happened.`,
          note: `Missing days is not failing the plan. Staying away because missing days feels like failing — that is the only mistake worth avoiding.`,
          cta: "Pick it back up tonight",
        }
      : {
          subject: "A week away — everything is exactly where you left it",
          kicker: "Charles · Day 7 away",
          heading: "This is my last email until you return.",
          preheader: "No streak guilt, no countdown. Your work is saved, and one session restarts everything.",
          lead: `A week is long enough that another reminder would be noise, so this is the last one — after today I go quiet, and the next move is entirely yours. Before I do, three things worth knowing.`,
          body: `First: nothing has been lost. Every answer, every streak tree, every hour of progress is saved to your account, permanently. Second: a restart is one session long — not a re-diagnosis, not starting over. The plan re-sequences itself around your exam date the moment you finish one block. Third: exam dates do not move. Whatever pushed studying aside this week, the mathematics of your paper is the same tonight as it was last Monday — and it is still entirely winnable from here.`,
          note: `Whenever you are ready, the desk is set. That is the whole message.`,
          cta: "Restart with one session",
        }

  const html = renderBrandEmail({
    preheader: copy.preheader,
    eyebrow: copy.kicker,
    title: copy.heading,
    blocks: [
      { type: "p", lead: true, html: copy.lead },
      { type: "p", html: copy.body },
      { type: "note", html: copy.note },
    ],
    cta: { label: copy.cta, href: `${SITE}/study` },
    reason: "You are receiving this because your Scholify study plan has been inactive, and the daily reminders have been paused for you.",
    unsubUrl,
  })

  const text = renderTextEmail([
    copy.heading,
    "",
    copy.lead.replace(/<[^>]+>/g, ""),
    "",
    copy.body.replace(/<[^>]+>/g, ""),
    "",
    `${copy.cta}: ${SITE}/study`,
    "",
    "— Charles · Your Scholify race engineer",
    `Unsubscribe: ${unsubUrl}`,
  ])

  return Boolean(await deliverEmail({ from, to, subject: copy.subject, html, text, unsubUrl }))
}
