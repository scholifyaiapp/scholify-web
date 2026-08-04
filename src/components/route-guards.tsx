import type { ReactNode } from "react"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { entitlementOf } from "@/lib/entitlement"
import { isAccaOnboarded } from "@/lib/acca-profile"
import { isStripeConfigured } from "@/lib/stripe"
import PaywallModal from "@/components/PaywallModal"
import { LogoSpinner } from "@/components/brand"
import { isLaunchAdmin, PRELAUNCH_MODE, LAUNCH_DATE_LABEL, signInPath } from "@/lib/launch"

/** Full-screen loader shown while the auth session is being resolved. */
function AuthLoading() {
  return (
    <div
      style={{ background: "var(--sch-bg)" }}
      className="min-h-[100dvh] w-full flex items-center justify-center"
    >
      <LogoSpinner size={52} />
    </div>
  )
}

/**
 * Full-screen, non-dismissible upgrade wall. Shown by the entitlement gate once
 * a learner's 3-day trial has ended without a paid plan — the PaywallModal is a
 * fixed inset-0 overlay, so the app behind it is unreachable until they upgrade
 * (or use the Settings / sign-out links in the modal footer).
 */
function TrialExpiredBlock() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}>
      <PaywallModal open type="expired" onClose={() => {}} />
    </div>
  )
}

/**
 * Shown when a real, signed-in account reaches the app before launch.
 *
 * Confirms the sign-in worked, names the account it worked for, and gives the
 * two things they might actually want: the waitlist, or a way out to try a
 * different account. Nothing here is a dead end.
 */
function PrelaunchBlock({ email }: { email: string | null }) {
  const { signOut } = useAuth()
  return (
    <div
      style={{ background: "var(--sch-bg)", color: "var(--sch-text)", fontFamily: "var(--sch-font)" }}
      className="min-h-[100dvh] w-full flex items-center justify-center px-6 py-12"
    >
      <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: "#C80000", marginBottom: 12 }}>
          NOT OPEN YET
        </div>
        <h1 style={{ fontSize: "clamp(24px, 6vw, 30px)", fontWeight: 850, letterSpacing: "-0.7px", margin: 0, lineHeight: 1.2 }}>
          You're signed in — Scholify just isn't open.
        </h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--sch-tx-1)", marginTop: 12 }}>
          Your account{email ? <> (<b style={{ color: "var(--sch-text)" }}>{email}</b>)</> : null} works and your
          password was correct. Scholify opens to everyone on {LAUNCH_DATE_LABEL} — until then the app is limited to
          the launch team, so there is nothing wrong with your details.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%",
            minHeight: 48, marginTop: 24, borderRadius: 12, textDecoration: "none",
            background: "linear-gradient(135deg,#C80000 0%,#E50068 55%,#F4A405 100%)",
            color: "#fff", fontSize: 15, fontWeight: 800,
          }}
        >
          Join the waitlist
        </Link>
        <button
          type="button"
          onClick={() => { void signOut() }}
          style={{
            width: "100%", minHeight: 44, marginTop: 10, borderRadius: 12, cursor: "pointer",
            background: "transparent", border: "1px solid var(--sch-border-2)",
            color: "var(--sch-tx-1)", fontSize: 13.5, fontWeight: 700, fontFamily: "inherit",
          }}
        >
          Sign out and use a different account
        </button>
      </div>
    </div>
  )
}

/**
 * Wraps routes that require authentication. Redirects guests to /sign-in.
 * With `gate`, ALSO enforces entitlement: an onboarded learner whose trial has
 * expired without paying is hard-blocked behind the upgrade wall. Settings and
 * the public /pricing page are intentionally left ungated so they can still pay
 * or manage their account.
 */
export function ProtectedRoute({ children, gate = false }: { children: ReactNode; gate?: boolean }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <AuthLoading />
  if (!user) {
    /*
     * signInPath(), not a bare "/sign-in": TeamSignIn redirects the auth routes
     * to "/" unless ?team=1 is present while PRELAUNCH_MODE is on. So this
     * "you need to sign in" redirect was itself landing on the waitlist — a
     * signed-out learner opening any app link was bounced to the marketing page
     * and never shown a sign-in form at all.
     */
    return <Navigate to={signInPath(location.pathname)} replace state={{ from: location.pathname }} />
  }
  if (PRELAUNCH_MODE && !isLaunchAdmin(user)) {
    /*
     * SAY SO, rather than redirecting in silence.
     *
     * This used to be <Navigate to="/" replace />. The learner's sign-in had
     * genuinely SUCCEEDED — session created, password correct — and they were
     * then dropped back on the waitlist with no message at all. Every attempt
     * looked like a broken button or a rejected password, and the same thing
     * happened after "Start for free": account created, confirmation email sent,
     * straight back to the waitlist. There was no way to tell that from a
     * failure, so the only rational conclusion was that sign-in was broken.
     */
    return <PrelaunchBlock email={user.email ?? null} />
  }
  if (gate) {
    // The launch admin must always be able to exercise the complete learner
    // journey before launch. An old/expired trial on the test account should
    // not turn every app CTA into a paywall while the product is being audited.
    if (isLaunchAdmin(user)) return <>{children}</>
    const e = entitlementOf(user)
    // Only block AFTER a trial has been used and expired — never a brand-new or
    // not-yet-onboarded account (they haven't started their 3 days yet).
    // CRITICAL: only when payments are actually open. If checkout can't run yet,
    // a hard block would trap the user with no way to pay — so we let them
    // through and rely on the (dismissible) trial reminder instead.
    if (isStripeConfigured() && isAccaOnboarded() && e.hadTrial && !e.isPro) {
      return <TrialExpiredBlock />
    }
  }
  return <>{children}</>
}

/** Wraps guest-only routes (sign-in / sign-up). Sends logged-in users to /dashboard. */
export function GuestRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
