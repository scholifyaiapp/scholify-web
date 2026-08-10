import { useEffect, useState, type ReactNode } from "react"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { canAccessApp } from "@/lib/entitlement"
import { decideAppAccess } from "@/lib/app-access"
import PaywallModal from "@/components/PaywallModal"
import { LogoSpinner } from "@/components/brand"
import { isLaunchAdmin, PRELAUNCH_MODE, LAUNCH_DATE_LABEL, signInPath } from "@/lib/launch"
import { isAccaOnboarded } from "@/lib/acca-profile"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import { trackEvent } from "@/lib/analytics"

/* ── After checkout: swap the stale token before judging entitlement ──
 *
 * THE BUG THIS FIXES, exactly as a customer hit it: they paid for Beginner,
 * Stripe redirected them back, and the paywall appeared again.
 *
 * Stripe's webhook writes `plan` into app_metadata SERVER-side, but the
 * browser is still holding the JWT it was issued before paying — so
 * canAccessApp() below reads a stale "free" and walls a customer who has
 * genuinely paid. The refresh that fixes it did exist... inside AccaStudy,
 * which is behind this very gate. So the wall rendered, the page never
 * mounted, its effect never ran, and the customer stayed locked out of the
 * thing they had just bought, with no way through but a manual re-login.
 *
 * It runs HERE now — ahead of the decision, on whatever route checkout
 * returns to — and the screen says "payment received" while it works.
 */
function usePostCheckoutSync(): boolean {
  const location = useLocation()
  const justPaid = new URLSearchParams(location.search).get("upgraded") === "true"
  const [syncing, setSyncing] = useState(justPaid)

  useEffect(() => {
    if (!justPaid) return
    trackEvent("subscription_activated")
    // Drop the flag from the URL so a later reload or a shared link does not
    // replay the celebration and the refresh loop.
    window.history.replaceState({}, "", window.location.pathname)
    if (!isSupabaseConfigured) {
      setSyncing(false)
      return
    }
    let cancelled = false
    const attempt = async (retriesLeft: number) => {
      try {
        const { data } = await supabase.auth.refreshSession()
        const meta = data.session?.user?.app_metadata ?? {}
        const plan = typeof meta.plan === "string" ? meta.plan : "free"
        const status = meta.plan_status
        if (plan !== "free" || status === "active" || status === "trialing") {
          if (!cancelled) setSyncing(false)
          return
        }
      } catch {
        /* transient — the retry below covers it */
      }
      if (cancelled) return
      // Give up rather than spin forever: the entitlement gate then makes the
      // normal decision, and a customer whose webhook is genuinely late sees
      // the paywall with a working "Update card / Manage" route rather than an
      // endless spinner.
      if (retriesLeft <= 0) {
        setSyncing(false)
        return
      }
      window.setTimeout(() => void attempt(retriesLeft - 1), 2500)
    }
    void attempt(6)
    return () => {
      cancelled = true
    }
  }, [justPaid])

  return syncing
}

/** Shown for the few seconds between Stripe's redirect and the new token. */
function UnlockingScreen() {
  return (
    <div
      style={{ background: "var(--sch-bg)", color: "var(--sch-text)", fontFamily: "var(--sch-font)" }}
      className="min-h-[100dvh] w-full flex items-center justify-center px-6"
    >
      <div style={{ textAlign: "center", maxWidth: 380 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <LogoSpinner size={52} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: "#1E9E5A", marginBottom: 10 }}>
          PAYMENT RECEIVED
        </div>
        <h1 style={{ fontSize: "clamp(22px, 5.5vw, 28px)", fontWeight: 850, letterSpacing: "-0.6px", margin: 0, lineHeight: 1.25 }}>
          You're in. Unlocking your plan…
        </h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--sch-tx-1)", marginTop: 12 }}>
          Thank you — your subscription is active. This takes a moment while we confirm it with our payment provider.
        </p>
      </div>
    </div>
  )
}

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

function TrialExpiredBlock() {
  return <div style={{ minHeight: "100dvh", background: "var(--sch-bg)" }}><PaywallModal open type="expired" onClose={() => {}} /></div>
}

/**
 * Full-screen, non-dismissible purchase wall. Shown by the entitlement gate when
 * an onboarded learner has no paid subscription or card-backed trial — the PaywallModal is a
 * fixed inset-0 overlay, so the app behind it is unreachable until they upgrade
 * (or use the Settings / sign-out links in the modal footer).
 */
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
 * With `gate`, ALSO enforces entitlement: an onboarded unpaid learner is
 * hard-blocked behind the purchase wall. Settings and
 * the public /pricing page are intentionally left ungated so they can still pay
 * or manage their account.
 */
export function ProtectedRoute({ children, gate = false }: { children: ReactNode; gate?: boolean }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const syncingPayment = usePostCheckoutSync()
  const [, setEntitlementClock] = useState(0)
  useEffect(() => {
    if (!gate || !user) return
    const end = Date.parse(String(user.app_metadata?.trial_ends_at ?? ""))
    if (!Number.isFinite(end) || end <= Date.now()) return
    const timer = window.setTimeout(() => setEntitlementClock((n) => n + 1), Math.min(end - Date.now() + 250, 2_147_483_647))
    return () => window.clearTimeout(timer)
  }, [gate, user])

  /*
   * The decision itself lives in src/lib/app-access.ts as a pure function, so
   * it can be proven by `npm test` rather than by paying for a subscription
   * and watching what happens. This component only renders the answer.
   */
  const decision = decideAppAccess({
    loading,
    signedIn: Boolean(user),
    launchAdmin: Boolean(user) && isLaunchAdmin(user),
    prelaunch: PRELAUNCH_MODE,
    gate,
    syncingPayment,
    // What is free, exhaustively: sign-up, onboarding (/welcome, ungated) and
    // the diagnosis with the plan it generates.
    freeValueRoute: location.pathname === "/study/diagnostic",
    onboarded: isAccaOnboarded(),
    entitled: canAccessApp(user),
  })

  if (decision === "loading") return <AuthLoading />
  if (decision === "sign-in") {
    /*
     * signInPath(), not a bare "/sign-in": TeamSignIn redirects the auth routes
     * to "/" unless ?team=1 is present while PRELAUNCH_MODE is on. So this
     * "you need to sign in" redirect was itself landing on the waitlist — a
     * signed-out learner opening any app link was bounced to the marketing page
     * and never shown a sign-in form at all.
     */
    return <Navigate to={signInPath(location.pathname)} replace state={{ from: location.pathname }} />
  }
  if (decision === "prelaunch") {
    /*
     * SAY SO, rather than redirecting in silence. This used to be a bare
     * <Navigate to="/" />: the sign-in had genuinely SUCCEEDED, and the learner
     * was dropped back on the waitlist with no message — indistinguishable from
     * a rejected password, so the rational conclusion was that sign-in was broken.
     */
    return <PrelaunchBlock email={user?.email ?? null} />
  }
  if (decision === "unlocking") return <UnlockingScreen />
  if (decision === "onboarding") return <Navigate to="/welcome" replace />
  if (decision === "paywall") return <TrialExpiredBlock />
  return <>{children}</>
}

/** Wraps guest-only routes (sign-in / sign-up). Sends logged-in users to /dashboard. */
export function GuestRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <AuthLoading />
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
