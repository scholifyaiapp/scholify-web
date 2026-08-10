/*
 * WHO GETS INTO THE APP — the whole decision, as one pure function.
 *
 * This lived inside ProtectedRoute as a ladder of six JSX early-returns, which
 * made it the most business-critical logic in the product AND the only piece
 * with no way to test it: the test setup is `environment: "node"` with no
 * component renderer, so every change had to be verified by paying for a
 * subscription and watching what happened. It was rewritten three times in one
 * evening on launch day, each time by hand, each time unproven.
 *
 * Extracting it changes nothing at runtime — ProtectedRoute renders whatever
 * this returns — but it makes the two questions that matter answerable by
 * `npm test` instead of by a card payment:
 *
 *   · can an unentitled visitor reach the workspace?   (must be: never)
 *   · can an entitled customer be locked out of it?    (must be: never)
 *
 * ORDER IS THE BEHAVIOUR. Each rung assumes every rung above it has been
 * cleared, so moving one silently changes who gets in. The tests pin the order,
 * not just the outcomes.
 */

export type AccessDecision =
  /** Auth session still resolving — show the spinner, decide nothing yet. */
  | "loading"
  /** No session: send them to sign-in. */
  | "sign-in"
  /** Signed in, but the product has not opened to the public yet. */
  | "prelaunch"
  /** Just paid: swapping the stale token before any entitlement decision. */
  | "unlocking"
  /** No plan built yet — onboarding is free and comes before any price. */
  | "onboarding"
  /** Onboarded, not entitled: the purchase wall. */
  | "paywall"
  /** Entitled (or on a free route, or the launch admin): let them through. */
  | "allow"

export interface AccessInput {
  /** Auth provider is still resolving the session. */
  loading: boolean
  signedIn: boolean
  /** Founder account — bypasses prelaunch and the paywall. */
  launchAdmin: boolean
  /** PRELAUNCH_MODE at render time. */
  prelaunch: boolean
  /** Whether this route is entitlement-gated at all (`gate` prop). */
  gate: boolean
  /** A checkout redirect is being reconciled (?upgraded=true). */
  syncingPayment: boolean
  /** Free even when gated — the diagnosis and the plan it generates. */
  freeValueRoute: boolean
  /**
   * Has this browser completed onboarding. ROUTING ONLY — it comes from
   * localStorage, which the visitor can edit, so it may never decide
   * entitlement. Clearing it sends you to onboarding, never into the app.
   */
  onboarded: boolean
  /** canAccessApp(): a paid plan, an active trial, or an open grace window. */
  entitled: boolean
}

export function decideAppAccess(input: AccessInput): AccessDecision {
  if (input.loading) return "loading"
  if (!input.signedIn) return "sign-in"
  if (input.prelaunch && !input.launchAdmin) return "prelaunch"

  // Before ANY entitlement check: a customer returning from Stripe is holding
  // a token minted before they paid. Judging them on it walls the very person
  // who just bought the thing.
  if (input.syncingPayment) return "unlocking"

  // Ungated routes (/welcome, /settings, /partners) and the free diagnosis
  // never reach a wall — that is what keeps sign-up → onboarding → plan free.
  if (!input.gate || input.launchAdmin || input.freeValueRoute) return "allow"

  // Onboarding outranks the paywall: nobody is shown a price before they have
  // seen the plan they would be buying.
  if (!input.onboarded) return "onboarding"

  return input.entitled ? "allow" : "paywall"
}
