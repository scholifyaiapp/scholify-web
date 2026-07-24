import type { User } from "@supabase/supabase-js"

export const PRELAUNCH_MODE = true
export const LAUNCH_DATE_ISO = "2026-08-10T00:00:00+05:00"
export const LAUNCH_DATE_LABEL = "10 August 2026"
export const PARTNER_PROGRAM_VISIBLE = false
export const LAUNCH_ADMIN_EMAIL = "scholifyaiapp@gmail.com"

export function isLaunchAdmin(user: User | null | undefined): boolean {
  return user?.email?.toLowerCase() === LAUNCH_ADMIN_EMAIL
}
