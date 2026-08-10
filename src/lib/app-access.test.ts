import { describe, expect, it } from "vitest"
import { decideAppAccess, type AccessInput } from "@/lib/app-access"

/*
 * The paywall, proven. Every case below is money or a locked-out customer:
 * a wrong answer either gives the product away or walls someone who paid.
 *
 * All three faults found on launch night are pinned here as regressions, so
 * the next person to touch this ladder finds out from `npm test` rather than
 * from a support email.
 */

const base: AccessInput = {
  loading: false,
  signedIn: true,
  launchAdmin: false,
  prelaunch: false,
  gate: true,
  syncingPayment: false,
  freeValueRoute: false,
  onboarded: true,
  entitled: true,
}
const at = (over: Partial<AccessInput> = {}) => decideAppAccess({ ...base, ...over })

describe("the ladder, in order", () => {
  it("decides nothing while the session is still resolving", () => {
    expect(at({ loading: true, signedIn: false, entitled: false })).toBe("loading")
  })

  it("sends a signed-out visitor to sign-in before anything else", () => {
    expect(at({ signedIn: false })).toBe("sign-in")
  })

  it("holds everyone at prelaunch except the launch admin", () => {
    expect(at({ prelaunch: true })).toBe("prelaunch")
    expect(at({ prelaunch: true, launchAdmin: true })).toBe("allow")
  })
})

describe("nobody unentitled reaches the workspace", () => {
  it("walls an onboarded learner with no plan", () => {
    expect(at({ entitled: false })).toBe("paywall")
  })

  it("is not opened by clearing the onboarding flag", () => {
    // The launch-night hole: isAccaOnboarded() sat INSIDE the entitlement
    // condition, so `localStorage.removeItem(...)` in DevTools removed the
    // paywall entirely. Faking it must now cost you onboarding, not gain
    // you the product.
    expect(at({ entitled: false, onboarded: false })).toBe("onboarding")
    expect(at({ entitled: false, onboarded: false })).not.toBe("allow")
  })

  it("is not opened by a missing billing env var", () => {
    // The other launch-night hole: a blank VITE_STRIPE_PUBLISHABLE_KEY made
    // isStripeConfigured() false, which short-circuited the whole condition
    // and gave the app away. Billing configuration is simply not an input to
    // this decision any more — there is no field here that could do it.
    expect(Object.keys(base)).not.toContain("stripeConfigured")
    expect(at({ entitled: false })).toBe("paywall")
  })
})

describe("nobody entitled is locked out", () => {
  it("lets a paid, onboarded learner straight through", () => {
    expect(at()).toBe("allow")
  })

  it("shows the unlocking screen after checkout instead of the paywall", () => {
    // THE bug a real customer hit: Stripe's webhook lands after the redirect,
    // so the browser still holds a "free" token. Judging entitlement on it
    // walled someone who had just paid, and the code that would have fixed it
    // sat behind that wall.
    expect(at({ syncingPayment: true, entitled: false })).toBe("unlocking")
  })

  it("keeps the launch admin in regardless of entitlement", () => {
    expect(at({ launchAdmin: true, entitled: false, onboarded: false })).toBe("allow")
  })
})

describe("what is free stays free", () => {
  it("never walls an ungated route", () => {
    // /welcome, /settings, /partners — Settings especially, since a walled
    // customer must still be able to reach billing to fix their card.
    expect(at({ gate: false, entitled: false, onboarded: false })).toBe("allow")
  })

  it("never walls the diagnosis, paid or not", () => {
    expect(at({ freeValueRoute: true, entitled: false })).toBe("allow")
  })

  /*
   * THE DIAGNOSIS IS FREE ONCE — reported live.
   *
   * The learner finished the diagnostic, saw the plan results, met the paywall,
   * and then simply went back to the diagnostic route and was let in again. It
   * was exempt from the gate permanently, so it was a door that never shut:
   * retake forever, re-watch the plan reveal, refresh straight back in, without
   * paying and without the trial they were promised.
   *
   * The caller now computes freeValueRoute as "on the diagnostic route AND no
   * result exists yet", so the second visit is walled like anything else.
   */
  it("walls the diagnostic route once the free diagnosis has been used", () => {
    // First visit: no result yet, the caller passes freeValueRoute true.
    expect(at({ freeValueRoute: true, entitled: false })).toBe("allow")
    // Second visit: a result exists, so the caller passes false — and this is
    // the case that used to let an unpaid learner back in indefinitely.
    expect(at({ freeValueRoute: false, entitled: false })).toBe("paywall")
  })

  it("sends a brand-new account to onboarding, not to a price", () => {
    // Sign-in lands on /dashboard, which is gated. Without this, the first
    // screen a new learner saw was a paywall — before onboarding, before a
    // plan, before seeing anything worth paying for.
    expect(at({ onboarded: false, entitled: false })).toBe("onboarding")
  })

  it("still onboards a paid learner who has no plan on this device", () => {
    expect(at({ onboarded: false, entitled: true })).toBe("onboarding")
  })
})

describe("the full launch-night sequence", () => {
  it("runs sign-in → onboarding → plan → paywall → pay → app", () => {
    const newLearner = { onboarded: false, entitled: false }
    expect(at({ ...newLearner, signedIn: false })).toBe("sign-in")
    expect(at(newLearner)).toBe("onboarding")
    expect(at({ ...newLearner, freeValueRoute: true })).toBe("allow") // diagnosis + plan
    expect(at({ onboarded: true, entitled: false })).toBe("paywall")
    expect(at({ onboarded: true, entitled: false, syncingPayment: true })).toBe("unlocking")
    expect(at({ onboarded: true, entitled: true })).toBe("allow")
  })
})
