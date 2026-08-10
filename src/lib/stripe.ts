import { supabase } from "@/lib/supabase"
import { getCapturedAffiliate } from "@/lib/affiliate"
import { signUpPath } from "@/lib/launch"

/*
 * Stripe Billing — client side (the international/card rail).
 *
 * No Stripe.js is loaded: the server creates a hosted Checkout Session and we
 * redirect to its URL. The only client-side signal is the publishable key, which
 * is safe to ship and doubles as the "is billing live?" flag. The three plans
 * are referenced by name — the server owns the price ids.
 */

/** True once Stripe billing is configured (publishable key present). */
/*
 * ⚠ NOT a measure of whether Scholify can take money. Checkout is created
 * entirely SERVER-SIDE (api/stripe.ts, on STRIPE_SECRET_KEY); the browser never
 * touches Stripe.js, so this publishable key is decoration here. Using it as
 * the "are payments open?" flag meant a blank client env var — which cannot
 * break anything visible, because nothing else reads it — silently disabled
 * both the purchase buttons AND (until the previous commit) the entire paywall.
 * That is exactly what happened in production on launch night: the variable is
 * present in Vercel with an EMPTY value, so every buy button read "Payments
 * open soon" while the app itself was free to anyone signed in.
 *
 * The server is now the only authority on whether billing works: ask it, and
 * report what it says. Kept exported for the one honest use — telling a
 * developer their local .env is incomplete.
 */
export function isStripeConfigured(): boolean {
  return Boolean(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
}

export type StripePlan = "beginner" | "annual_beginner" | "pro" | "annual_pro"

const PENDING_PLAN_KEY = "scholify-pending-checkout-plan"

export function rememberCheckoutPlan(plan: StripePlan): void {
  try { window.sessionStorage.setItem(PENDING_PLAN_KEY, plan) } catch { /* storage is optional */ }
}

/**
 * Start a Stripe subscription checkout for the signed-in user. Redirects the
 * browser to Stripe's hosted checkout on success. Returns false (so the caller
 * can show a notice) if billing isn't configured, the user isn't signed in, or
 * the session couldn't be created.
 */
export async function startStripeCheckout(plan: StripePlan): Promise<boolean> {
  // No client-side pre-check: the server owns STRIPE_SECRET_KEY and the price
  // ids, so it is the only thing that knows whether a session can be created.
  // It answers {ok:false, reason:"not_configured"} when it cannot, and the
  // caller shows that — instead of a blank browser env var vetoing a checkout
  // the backend was perfectly able to complete.
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) {
      rememberCheckoutPlan(plan)
      window.location.href = signUpPath(`/pricing?checkout=${plan}`)
      return true
    }
    const affiliateCode = getCapturedAffiliate() || undefined
    const res = await fetch("/api/stripe?action=checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ plan, affiliateCode }),
    })
    const body = (await res.json().catch(() => ({}))) as { url?: string }
    if (body.url) {
      try { window.sessionStorage.removeItem(PENDING_PLAN_KEY) } catch { /* storage is optional */ }
      window.location.href = body.url
      return true
    }
    return false
  } catch {
    return false
  }
}

/** Open Stripe's hosted billing portal for plan changes and payment management. */
export async function openStripeBillingPortal(): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return false
    const res = await fetch("/api/stripe?action=portal", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = (await res.json().catch(() => ({}))) as { url?: string }
    if (!body.url) return false
    window.location.href = body.url
    return true
  } catch {
    return false
  }
}

/** Cancel the signed-in user's subscription at period end. */
export async function cancelStripeSubscription(): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return false
    const res = await fetch("/api/stripe?action=cancel", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean }
    return Boolean(body.ok)
  } catch {
    return false
  }
}
