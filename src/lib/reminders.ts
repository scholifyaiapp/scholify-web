import { supabase } from "@/lib/supabase"
import { getOverallProgress } from "@/lib/acca"

/*
 * Practice-time reminders — client side.
 *
 * Pushes the learner's opt-in, practice time, per-slot switches and last
 * activity to /api/reminders so the 5-minute sender knows who is due what. Every
 * call is best-effort and silent on failure (signed out, backend not configured
 * yet, migration not applied) — the in-app toggle still updates regardless.
 *
 * The TIMEZONE is sent from here because this is the only place that can know
 * it. Without it the server cannot tell when "19:00" is for this person, which
 * is exactly why the old stored reminder_time was unusable and went unread.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""
const SETTINGS_KEY = "scholify-settings"

/** Which daily reminders this learner wants. */
export interface ReminderSlots {
  /** Three hours ahead — "your session is at 19:00". Opt-in extra. */
  lead: boolean
  /** Thirty minutes ahead — the one that actually starts sessions. */
  soon: boolean
  /** Two hours after the start time, only sent if the day is still open. */
  catchup: boolean
}

/**
 * TWO reminders by default: T−30 and T+2h.
 *
 * `lead` is off because three unrequested emails a day from one sender is how a
 * domain earns a spam reputation, and because the −30 nudge is the one that
 * actually starts sessions. A learner who wants the morning heads-up can switch
 * it on in Settings; the server default matches (migration 0029).
 */
export const DEFAULT_SLOTS: ReminderSlots = { lead: false, soon: true, catchup: true }

/** The browser's IANA zone, e.g. "Asia/Tashkent". */
export function localTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  } catch {
    return "UTC"
  }
}

/** Push the current schedule + last session date. */
export async function syncReminder(
  optIn: boolean,
  practiceTime = "19:00",
  slots: ReminderSlots = DEFAULT_SLOTS,
): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    const email = data.session?.user?.email
    if (!token || !email) return
    await fetch(`${API_BASE}/api/reminders?action=sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        optIn,
        email,
        practiceTime,
        timezone: localTimeZone(),
        slots,
        // The real study signal: the last day an ACCA question was answered.
        // The sender skips every slot on a day this matches, so a learner who
        // has already studied is never reminded to.
        lastSessionDate: getOverallProgress().lastStudied,
      }),
    })
  } catch {
    /* best-effort */
  }
}

interface SavedReminderSettings {
  notifyDaily?: boolean
  practiceTime?: string
  /** Pre-0026 key. Read as a fallback so existing installs keep their hour. */
  reminderTime?: string
  reminderSlots?: Partial<ReminderSlots>
}

function readSaved(): SavedReminderSettings | null {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    return raw ? (JSON.parse(raw) as SavedReminderSettings) : null
  } catch {
    return null
  }
}

/**
 * Re-sync only if the learner has reminders on. Call after a completed session
 * so the sender sees fresh activity and drops the rest of today's reminders.
 */
export function maybeSyncReminder(): void {
  const s = readSaved()
  if (!s?.notifyDaily) return
  void syncReminder(true, s.practiceTime || s.reminderTime || "19:00", {
    ...DEFAULT_SLOTS,
    ...(s.reminderSlots || {}),
  })
}

/* ── The day-complete congratulation ──────────────────────────────
 *
 * Sent by the app the moment the LAST block of the day is finished, because only
 * the client knows the day is complete and knows what tomorrow holds. Carries the
 * streak and tomorrow's start time so the mail can link straight at it.
 *
 * Fire-and-forget and idempotent on the server (sent_done_date, migration 0029),
 * so a double call — two tabs, a reload — sends one email.
 */
export interface DayCompleteFacts {
  paperId: string
  streak: number
  /** "07:00" — when tomorrow's session unlocks. */
  nextStartTime?: string | null
  /** Tomorrow's exact chapter title. */
  nextTopic?: string
  /** Minutes worked today. */
  minutes?: number
  /** Questions answered today. */
  questions?: number
}

export async function notifyDayComplete(facts: DayCompleteFacts): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return false
    const res = await fetch(`${API_BASE}/api/reminders?action=complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...facts, timezone: localTimeZone() }),
    })
    const json = (await res.json()) as { ok?: boolean }
    return Boolean(json.ok)
  } catch {
    return false
  }
}

/**
 * Push the schedule after onboarding, where the learner has just named their
 * practice time but Settings has not been opened yet — without this the row is
 * never created and none of the three reminders can fire for a brand-new
 * learner. Called fire-and-forget from Welcome's persist().
 */
export function registerPracticeTime(practiceTime: string): void {
  const s = readSaved()
  /*
   * Onboarding already stores this clock in the paper plan; persist the same
   * value in reminder settings too. Previously the server received (say) 07:30
   * while Settings continued to display its untouched 19:00 default, so the
   * learner could not tell which schedule was real.
   */
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      ...s,
      practiceTime,
      reminderTime: practiceTime,
      reminderSlots: { ...DEFAULT_SLOTS, ...(s?.reminderSlots || {}) },
      notifyDaily: s?.notifyDaily !== false,
    }))
  } catch {
    /* local persistence is best-effort */
  }
  // Respect an explicit opt-out; default on for a learner who has never chosen.
  if (s && s.notifyDaily === false) return
  void syncReminder(true, practiceTime, { ...DEFAULT_SLOTS, ...(s?.reminderSlots || {}) })
}
