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

/** Which of the three daily reminders this learner wants. */
export interface ReminderSlots {
  /** Three hours ahead — "your session is at 19:00". */
  lead: boolean
  /** Ten minutes ahead — the one that actually starts sessions. */
  soon: boolean
  /** Late catch-up, only sent if the day was skipped. */
  catchup: boolean
}

export const DEFAULT_SLOTS: ReminderSlots = { lead: true, soon: true, catchup: true }

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

/**
 * Push the schedule after onboarding, where the learner has just named their
 * practice time but Settings has not been opened yet — without this the row is
 * never created and none of the three reminders can fire for a brand-new
 * learner. Called fire-and-forget from Welcome's persist().
 */
export function registerPracticeTime(practiceTime: string): void {
  const s = readSaved()
  // Respect an explicit opt-out; default on for a learner who has never chosen.
  if (s && s.notifyDaily === false) return
  void syncReminder(true, practiceTime, { ...DEFAULT_SLOTS, ...(s?.reminderSlots || {}) })
}
