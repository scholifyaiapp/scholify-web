import { supabase } from "@/lib/supabase"
import { getCapturedAffiliate } from "@/lib/affiliate"

/*
 * Stripe Billing — client side (the international/card rail).
 *
 * No Stripe.js is loaded: the server creates a hosted Checkout Session and we
 * redirect to its URL. The only client-side signal is the publishable key, which
 * is safe to ship and doubles as the "is billing live?" flag. The three plans
 * are referenced by name — the server owns the price ids.
 */

/** True once Stripe billing is configured (publishable key present). */
export function isStripeConfigured(): boolean {
  return Boolean(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
}

export type StripePlan = "beginner" | "pro" | "annual_pro"

/**
 * Start a Stripe subscription checkout for the signed-in user. Redirects the
 * browser to Stripe's hosted checkout on success. Returns false (so the caller
 * can show a notice) if billing isn't configured, the user isn't signed in, or
 * the session couldn't be created.
 */
export async function startStripeCheckout(plan: StripePlan): Promise<boolean> {
  if (!isStripeConfigured()) return false
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return false
    const affiliateCode = getCapturedAffiliate() || undefined
    const res = await fetch("/api/stripe?action=checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ plan, affiliateCode }),
    })
    const body = (await res.json().catch(() => ({}))) as { url?: string }
    if (body.url) {
      window.location.href = body.url
      return true
    }
    return false
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
