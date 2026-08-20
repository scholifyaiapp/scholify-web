import { useEffect, useState, type ReactNode } from "react"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { canAccessApp } from "@/lib/entitlement"
import { decideAppAccess } from "@/lib/app-access"
import PaywallModal from "@/components/PaywallModal"
import { LogoSpinner } from "@/components/brand"
import { isLaunchAdmin, PRELAUNCH_MODE, LAUNCH_DATE_LABEL, signInPath } from "@/lib/launch"
import { isAccaOnboarded } from "@/lib/acca-profile"
import { getCurrentPaper } from "@/lib/acca-qualification"
import { getLatestDiagnostic } from "@/lib/acca-diagnostic"
import { progressAnsweredCount } from "@/lib/acca"
import { accaProgressLoadSyncSettled, ensureAccaProgressLoadSync } from "@/lib/acca-cloud"
import { isSupabaseConfigured, supabase } from "@/lib/supabase"
import { trackEvent } from "@/lib/analytics"
import { currentAuthSessionIsActive, markSessionReplaced } from "@/lib/account-session"

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

/* ── The watchdog: re-ask the SERVER, while they are inside ──────────
 *
 * The gate decides once, at render. Everything after that runs on a token the
 * browser is already holding, so anything that changes server-side — a trial
 * revoked, a plan cancelled, a subscription that never really existed — is
 * invisible until the next navigation. A learner who found a way in stays in
 * for as long as they avoid one.
 *
 * So every WATCHDOG_MS this checks TWO server facts: that this exact session_id
 * still exists (a newer login may have replaced it), and, on paid routes, who
 * the caller is now. getUser() returns fresh app_metadata; the local session
 * cannot fake it.
 *
 * ── The asymmetry that shapes the whole design ──
 * Ejecting a freeloader fifteen seconds later costs nothing. Ejecting a PAYING
 * customer mid-question costs a refund and a review. So this is deliberately
 * one-directional: it only ever acts on a definitive server answer that says
 * "not entitled". A network failure, a timeout, an aborted request, a missing
 * response — every one of those is ignored entirely. Silence is never treated
 * as guilt.
 */
const WATCHDOG_MS = 15_000

/**
 * Has this learner already had their free diagnosis?
 *
 * Checks the paper they are actually on; falls back to "not yet" when there is
 * no current paper, so a learner mid-onboarding is never locked out of the one
 * thing they were promised for free.
 */
function hasCompletedDiagnostic(): boolean {
  try {
    const paper = getCurrentPaper()
    return Boolean(paper && getLatestDiagnostic(paper))
  } catch {
    return false
  }
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
function AuthLoading({ label }: { label?: string }) {
  return (
    <div
      style={{ background: "var(--sch-bg)" }}
      className="min-h-[100dvh] w-full flex items-center justify-center"
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LogoSpinner size={52} />
        </div>
        {label ? (
          <p style={{ marginTop: 14, fontSize: 13.5, fontWeight: 650, color: "var(--sch-tx-1)", fontFamily: "var(--sch-font)" }}>
            {label}
          </p>
        ) : null}
      </div>
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
  /* Set only by the watchdog below, and only on a definitive server answer. */
  const [serverRevoked, setServerRevoked] = useState(false)
  /* Bumped when the app-load progress reconcile settles, so the hold below lifts. */
  const [, setProgressClock] = useState(0)

  /*
   * Reconcile the learner record with the cloud on app load — not only when
   * /study mounts. Once per user per page load; ensure() reuses the in-flight
   * promise, so StrictMode's double effect and route changes cost nothing.
   */
  useEffect(() => {
    if (!user || !isSupabaseConfigured) return
    if (accaProgressLoadSyncSettled(user.id)) return
    let alive = true
    void ensureAccaProgressLoadSync(user.id).then(() => {
      if (alive) setProgressClock((n) => n + 1)
    })
    return () => {
      alive = false
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    if (!isSupabaseConfigured) return

    let cancelled = false
    const check = async () => {
      try {
        // Supabase access JWTs remain valid until expiry even after their refresh
        // session is revoked. The database function checks auth.sessions itself,
        // closing that window promptly for an old/shared browser.
        const active = await currentAuthSessionIsActive()
        if (cancelled) return
        if (active === false) {
          markSessionReplaced()
          trackEvent("session_replaced")
          await supabase.auth.signOut({ scope: "local" })
          return
        }

        // Session privacy applies to EVERY protected page. Entitlement polling
        // below is needed only for paid gates, and never during payment sync.
        if (!gate || syncingPayment || isLaunchAdmin(user)) return
        const { data, error } = await supabase.auth.getUser()
        if (cancelled || error) return
        const fresh = data.user
        // No user at all is a signed-out session, which the gate above handles
        // on its own — not something for this to act on.
        if (!fresh) return
        // Self-healing, both ways. Without the clear, a learner who was
        // revoked and then PAID would stay walled by a stale flag until they
        // reloaded — punished for buying.
        setServerRevoked(!canAccessApp(fresh))
      } catch {
        /* offline, timeout, aborted — never evidence of anything */
      }
    }
    void check()
    const timer = window.setInterval(() => void check(), WATCHDOG_MS)
    // Coming back to the tab is the moment a lapsed session is most likely,
    // and the cheapest time to notice.
    const onVisible = () => {
      if (document.visibilityState === "visible") void check()
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      cancelled = true
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [gate, user, syncingPayment])
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
    /*
     * THE DIAGNOSIS IS FREE ONCE.
     *
     * Reported: after the diagnostic and the plan results, the paywall shows —
     * and refreshing, or coming back to the diagnostic, let the learner
     * straight back in. Correct: this route was exempt from the gate
     * permanently, so it was a door that never shut. They could retake the
     * diagnostic indefinitely and re-watch the plan reveal, without paying and
     * without the trial they were promised.
     *
     * The free tier is one diagnosis and the plan it produces. Once a result
     * exists, this route is gated like everything else.
     *
     * Reading it from localStorage is safe HERE for the same reason the
     * onboarding check is: it decides what is FREE, not what is ENTITLED.
     * Clearing it buys another free diagnostic — never the workspace.
     */
    freeValueRoute: location.pathname === "/study/diagnostic" && !hasCompletedDiagnostic(),
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
  // The server said no while they were inside. Same wall as any other refusal,
  // so there is one paywall in the product rather than a second "you've been
  // ejected" screen that would need its own copy and its own way out.
  if (decision === "paywall" || serverRevoked) return <TrialExpiredBlock />
  /*
   * Hold the first paint ONLY for the learner it matters to: signed in, and
   * this browser holds no answers at all — the fresh-device / cleared-cache
   * case, where every dashboard figure would render as zero and then jump once
   * the cloud copy landed (or worse, be read as "my progress is gone").
   * Everyone with local work renders instantly; their reconcile runs in the
   * background above, and the timeout inside ensure() caps this wait too.
   */
  if (user && isSupabaseConfigured && !accaProgressLoadSyncSettled(user.id) && progressAnsweredCount() === 0) {
    return <AuthLoading label="Restoring your progress…" />
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
