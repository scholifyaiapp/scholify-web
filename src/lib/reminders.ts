import { supabase } from "@/lib/supabase"
import { readVocabProgress } from "@/lib/vocab"

/*
 * Daily email reminders — client. Pushes the learner's opt-in + last activity
 * to /api/reminders so the daily cron can email those who haven't studied.
 * Every call is best-effort and silent on failure (signed out, backend not
 * configured yet, etc.) — the in-app toggle still updates regardless.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""
const SETTINGS_KEY = "scholify-settings"

/** Push the current opt-in state, reminder time, and last session date. */
export async function syncReminder(optIn: boolean, reminderTime = "08:00"): Promise<void> {
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
        reminderTime,
        lastSessionDate: readVocabProgress().lastSessionDate,
      }),
    })
  } catch {
    /* best-effort */
  }
}

/**
 * Re-sync only if the learner has reminders on (reads the saved settings).
 * Call after a completed session so the cron sees fresh activity.
 */
export function maybeSyncReminder(): void {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (!raw) return
    const s = JSON.parse(raw) as { notifyDaily?: boolean; reminderTime?: string }
    if (s?.notifyDaily) void syncReminder(true, s.reminderTime || "08:00")
  } catch {
    /* ignore */
  }
}
