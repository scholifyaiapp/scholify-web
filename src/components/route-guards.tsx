import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { entitlementOf } from "@/lib/entitlement"
import { isAccaOnboarded } from "@/lib/acca-profile"
import { isStripeConfigured } from "@/lib/stripe"
import PaywallModal from "@/components/PaywallModal"
import { LogoSpinner } from "@/components/brand"

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
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }
  if (gate) {
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
