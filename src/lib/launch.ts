import type { User } from "@supabase/supabase-js"

export const LAUNCH_DATE_ISO = "2026-08-10T00:00:00+05:00"
export const LAUNCH_DATE_LABEL = "10 August 2026"

/**
 * Keep the public waitlist gate up until the advertised launch instant, then
 * open the product automatically. This is evaluated in each fresh browser
 * session, so the launch does not depend on a last-minute code edit/deploy.
 */
export function isPrelaunchAt(now: number | Date = Date.now()): boolean {
  const timestamp = now instanceof Date ? now.getTime() : now
  return timestamp < Date.parse(LAUNCH_DATE_ISO)
}

export const PRELAUNCH_MODE = isPrelaunchAt()

/*
 * The partner programme opens on its own date — two days before the product.
 *
 * ── Why this is a DATE and not a boolean ────────────────────────
 * It was `export const PARTNER_PROGRAM_VISIBLE = false`, a hardcoded flag. The
 * plan is to announce the programme on 8 August and the product on 10 August, and
 * a hardcoded false does not become true on a date: it would have needed someone
 * to edit this line and ship a deploy on the morning of the 8th, at the same time
 * as posting to every social channel. Miss it, or have the deploy fail, and every
 * announcement points at a waitlist page with no partner link on it.
 *
 * PRELAUNCH_MODE already solved this for the product launch, with the reasoning
 * written above `isPrelaunchAt`: "the launch does not depend on a last-minute code
 * edit/deploy". The partner announcement deserves exactly the same guarantee, so
 * it now works the same way — the link appears by itself at midnight Tashkent on
 * the 8th, whether or not anyone touches the repository that day.
 *
 * Both dates carry +05:00 because that is where the announcements are timed from.
 */
export const PARTNER_LAUNCH_DATE_ISO = "2026-08-08T00:00:00+05:00"
export const PARTNER_LAUNCH_DATE_LABEL = "8 August 2026"

/** True once the partner programme is publicly announced. */
export function isPartnerProgramVisibleAt(now: number | Date = Date.now()): boolean {
  const timestamp = now instanceof Date ? now.getTime() : now
  return timestamp >= Date.parse(PARTNER_LAUNCH_DATE_ISO)
}

export const PARTNER_PROGRAM_VISIBLE = isPartnerProgramVisibleAt()

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
