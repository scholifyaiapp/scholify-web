import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { trackEvent, identifyUser } from "@/lib/analytics"
import type { User } from "@supabase/supabase-js"

/*
 * The three retention metrics that decide whether Scholify lives or dies:
 * first-task completion, Day-3 retained, Day-7 retained.
 *
 * Primary store is PostHog (events + identify properties). We also best-effort
 * write to the `profiles` row so an in-app/SQL view can read them once Supabase
 * is wired (see migration 0011). A localStorage guard ensures each milestone
 * fires exactly once per device.
 */

const FLAGS_KEY = "scholify-retention-flags"

function readFlags(): Record<string, boolean> {
  try {
    return JSON.parse(window.localStorage.getItem(FLAGS_KEY) || "{}") as Record<string, boolean>
  } catch {
    return {}
  }
}

function writeFlag(key: string): void {
  try {
    const flags = readFlags()
    flags[key] = true
    window.localStorage.setItem(FLAGS_KEY, JSON.stringify(flags))
  } catch {
    /* ignore */
  }
}

export function markRetentionMilestone(opts: {
  user: User | null
  streak: number
  isFirstTask: boolean
}): void {
  const flags = readFlags()
  const updates: Record<string, unknown> = {}

  if (opts.isFirstTask && !flags.first_task) {
    writeFlag("first_task")
    trackEvent("first_task_completed")
    updates.first_task_completed_at = new Date().toISOString()
  }
  if (opts.streak >= 3 && !flags.day3) {
    writeFlag("day3")
    trackEvent("day3_retained")
    updates.day3_retained = true
  }
  if (opts.streak >= 7 && !flags.day7) {
    writeFlag("day7")
    trackEvent("day7_retained")
    updates.day7_retained = true
  }

  if (Object.keys(updates).length === 0) return

  if (opts.user?.id) identifyUser(opts.user.id, updates)

  // Best-effort durable copy — no-op until the profiles columns exist (0011).
  if (isSupabaseConfigured && opts.user?.id) {
    supabase
      .from("profiles")
      .upsert({ id: opts.user.id, ...updates }, { onConflict: "id" })
      .then(
        () => {},
        () => {},
      )
  }
}
