import type { User } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

const DAY_MS = 86_400_000

async function updateProfile(userId: string, fields: Record<string, unknown>): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    await supabase.from("profiles").upsert({ id: userId, ...fields }, { onConflict: "id" })
  } catch {
    // Retention telemetry is best-effort and must never block study.
  }
}

/** Mark durable return milestones from the account creation timestamp. */
export async function markAppRetention(user: User): Promise<void> {
  const created = Date.parse(user.created_at)
  if (!Number.isFinite(created)) return
  const age = Date.now() - created
  const fields: Record<string, unknown> = {}
  if (age >= 2 * DAY_MS) fields.day3_retained = true
  if (age >= 6 * DAY_MS) fields.day7_retained = true
  if (Object.keys(fields).length) await updateProfile(user.id, fields)
}

/** The first completed diagnostic/session is the activation milestone. */
export async function markFirstTaskCompleted(): Promise<void> {
  if (!isSupabaseConfigured) return
  try {
    const { data } = await supabase.auth.getUser()
    if (data.user) await updateProfile(data.user.id, { first_task_completed_at: new Date().toISOString() })
  } catch {
    // Best-effort telemetry.
  }
}
