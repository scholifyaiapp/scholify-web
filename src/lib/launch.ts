import type { User } from "@supabase/supabase-js"

export const PRELAUNCH_MODE = true
export const LAUNCH_DATE_ISO = "2026-08-10T00:00:00+05:00"
export const LAUNCH_DATE_LABEL = "10 August 2026"
export const PARTNER_PROGRAM_VISIBLE = false
export const LAUNCH_ADMIN_EMAIL = "scholifyaiapp@gmail.com"

export function isLaunchAdmin(user: User | null | undefined): boolean {
  return user?.email?.toLowerCase() === LAUNCH_ADMIN_EMAIL
}

/*
 * The auth routes are wrapped in TeamSignIn (App.tsx), which — while
 * PRELAUNCH_MODE is on — redirects to "/" unless the URL carries ?team=1. So
 * every internal link to /sign-in or /sign-up has to carry it, and any that
 * forgets is a dead link that silently lands on the waitlist.
 *
 * That had already happened: the "Back to sign in" link on the sign-up
 * confirmation panel pointed at a bare "/sign-in", so a learner who had just
 * created an account and been told to check their inbox could not get back to
 * the sign-in form at all. These two helpers exist so the param cannot be
 * forgotten again, and so it disappears by itself at launch.
 */
export function signInPath(next?: string): string {
  const params = new URLSearchParams()
  if (PRELAUNCH_MODE) params.set("team", "1")
  if (next) params.set("next", next)
  const query = params.toString()
  return query ? `/sign-in?${query}` : "/sign-in"
}

export function signUpPath(next?: string): string {
  const params = new URLSearchParams()
  if (PRELAUNCH_MODE) params.set("team", "1")
  if (next) params.set("next", next)
  const query = params.toString()
  return query ? `/sign-up?${query}` : "/sign-up"
}
