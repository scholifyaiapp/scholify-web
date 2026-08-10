import { describe, it, expect } from "vitest"
import { entitlementOf, isProUser, canStartTrial, canAccessPaper, canAccessApp, canUsePlanFeature, shouldBlockForExpiredTrial, TRIAL_DAYS, GRACE_DAYS } from "@/lib/entitlement"

/*
 * Entitlement decides who gets Pro. Every case here is a real gate: a wrong
 * answer either gives away Pro for free or locks a paying customer out.
 */

const NOW = Date.parse("2026-07-15T12:00:00Z")
const inDays = (d: number) => new Date(NOW + d * 86400000).toISOString()
const user = (meta: Record<string, unknown>) => ({ app_metadata: meta })

describe("paid plans", () => {
  it("grants PRO to the Pro/Annual tiers", () => {
    for (const plan of ["pro", "annual_pro"]) {
      const e = entitlementOf(user({ plan }), NOW)
      expect(e.isPaid).toBe(true)
      expect(e.isPro).toBe(true)
      expect(e.isBeginner).toBe(false)
      expect(e.isTrial).toBe(false)
    }
  })

  it("Beginner is PAID (all papers) but NOT pro (no mocks/examiner/custom)", () => {
    const e = entitlementOf(user({ plan: "beginner" }), NOW)
    expect(e.isPaid).toBe(true)
    expect(e.isBeginner).toBe(true)
    expect(e.isPro).toBe(false) // premium modes stay locked
    expect(e.isTrial).toBe(false)
  })

  it("Beginner still unlocks all papers (canAccessPaper via isPaid)", () => {
    const beginner = user({ plan: "beginner" })
    expect(canAccessPaper(beginner, "AAA", ["FA"], NOW)).toBe(true)
  })

  it("enforces the marketed feature boundary for Beginner and Pro", () => {
    const beginner = user({ plan: "beginner" })
    const pro = user({ plan: "pro" })
    for (const feature of ["timed_mocks", "ai_examiner", "custom_practice", "mock_history"] as const) {
      expect(canUsePlanFeature(beginner, feature, NOW)).toBe(false)
      expect(canUsePlanFeature(pro, feature, NOW)).toBe(true)
    }
    for (const feature of ["all_papers", "question_banks", "flashcards", "diagnostic", "charles_tutor"] as const) {
      expect(canUsePlanFeature(beginner, feature, NOW)).toBe(true)
      expect(canUsePlanFeature(pro, feature, NOW)).toBe(true)
    }
  })

  it("treats an active subscription as paid even if the plan name wasn't mapped", () => {
    const e = entitlementOf(user({ plan: "free", plan_status: "active" }), NOW)
    expect(e.isPaid).toBe(true)
    expect(e.isPro).toBe(true)
  })

  it("does not grant Pro to free or an unknown plan", () => {
    expect(isProUser(user({ plan: "free" }), NOW)).toBe(false)
    expect(isProUser(user({ plan: "nonsense" }), NOW)).toBe(false)
    expect(isProUser(user({}), NOW)).toBe(false)
    expect(isProUser(null, NOW)).toBe(false)
  })
})

describe("trial", () => {
  it("grants Pro while the trial is in the future", () => {
    const e = entitlementOf(user({ plan: "free", trial_started_at: inDays(-2), trial_ends_at: inDays(5) }), NOW)
    expect(e.isTrial).toBe(true)
    expect(e.isPro).toBe(true)
    expect(e.isPaid).toBe(false)
    expect(e.trialDaysLeft).toBe(5)
  })

  it("grants the complete Pro workspace during the trial", () => {
    const trial = user({ plan: "free", trial_started_at: inDays(-1), trial_ends_at: inDays(2) })
    expect(canUsePlanFeature(trial, "timed_mocks", NOW)).toBe(true)
    expect(canUsePlanFeature(trial, "ai_examiner", NOW)).toBe(true)
    expect(canUsePlanFeature(trial, "custom_practice", NOW)).toBe(true)
    expect(canUsePlanFeature(trial, "all_papers", NOW)).toBe(true)
    expect(canAccessPaper(trial, "AAA", ["FA"], NOW)).toBe(true)
  })

  it("recognises a Stripe trialing subscription without treating it as ordinary paid time", () => {
    const e = entitlementOf(user({ plan: "pro", plan_status: "trialing", trial_started_at: inDays(-1), trial_ends_at: inDays(2) }), NOW)
    expect(e.isTrial).toBe(true)
    expect(e.isPaid).toBe(true)
    expect(e.isPro).toBe(true)
    expect(e.trialDaysLeft).toBe(2)
  })

  it("revokes Pro the moment the trial has passed", () => {
    const e = entitlementOf(user({ plan: "free", trial_started_at: inDays(-8), trial_ends_at: inDays(-1) }), NOW)
    expect(e.isTrial).toBe(false)
    expect(e.isPro).toBe(false)
    expect(e.trialDaysLeft).toBe(0)
    expect(e.hadTrial).toBe(true) // …but they can't get another
  })

  it("counts the final partial day as a day left, and reaches zero exactly at expiry", () => {
    expect(entitlementOf(user({ trial_ends_at: new Date(NOW + 3600_000).toISOString() }), NOW).trialDaysLeft).toBe(1)
    expect(entitlementOf(user({ trial_ends_at: new Date(NOW).toISOString() }), NOW).trialDaysLeft).toBe(0)
  })

  it("lets a real subscription outrank and outlive a trial", () => {
    // Paid, with a long-expired trial marker still on the record.
    const e = entitlementOf(user({ plan: "pro", trial_started_at: inDays(-30), trial_ends_at: inDays(-23) }), NOW)
    expect(e.isPaid).toBe(true)
    expect(e.isPro).toBe(true)
    expect(e.isTrial).toBe(false) // trial is irrelevant once paid
  })

  it("ignores a malformed trial_ends_at instead of granting or throwing", () => {
    for (const bad of ["", "soon", "null", 12345]) {
      const e = entitlementOf(user({ trial_ends_at: bad as unknown as string }), NOW)
      expect(e.isTrial).toBe(false)
      expect(e.isPro).toBe(false)
    }
  })
})

describe("canStartTrial", () => {
  it("is true only for a fresh account", () => {
    expect(canStartTrial(user({ plan: "free" }))).toBe(true)
    expect(canStartTrial(user({}))).toBe(true)
  })

  it("is false once a trial has been used, even after it expired", () => {
    expect(canStartTrial(user({ trial_started_at: inDays(-30) }))).toBe(false)
  })

  it("is false for a paying customer", () => {
    expect(canStartTrial(user({ plan: "pro" }))).toBe(false)
  })
})

describe("expired-trial app wall", () => {
  const expiredTrial = { trial_started_at: inDays(-5), trial_ends_at: inDays(-2) }

  it("never blocks a paid Beginner subscriber", () => {
    expect(shouldBlockForExpiredTrial(user({ ...expiredTrial, plan: "beginner" }), NOW)).toBe(false)
  })

  it("blocks only an expired trial with no paid plan", () => {
    expect(shouldBlockForExpiredTrial(user({ ...expiredTrial, plan: "free" }), NOW)).toBe(true)
    expect(shouldBlockForExpiredTrial(user({ ...expiredTrial, plan: "pro" }), NOW)).toBe(false)
    expect(shouldBlockForExpiredTrial(user({ trial_started_at: inDays(-1), trial_ends_at: inDays(2) }), NOW)).toBe(false)
  })
})

describe("TRIAL_DAYS", () => {
  it("is the 3 the marketing promises", () => {
    expect(TRIAL_DAYS).toBe(3)
  })
})

describe("canAccessPaper", () => {
  const TARGET = ["FA"]

  it("gives a Pro trial user every paper", () => {
    const trialUser = user({ plan: "free", trial_started_at: inDays(0), trial_ends_at: inDays(3) })
    expect(canAccessPaper(trialUser, "FA", TARGET, NOW)).toBe(true)
    expect(canAccessPaper(trialUser, "AA", TARGET, NOW)).toBe(true)
  })

  it("gives a paid subscriber every paper", () => {
    const paid = user({ plan: "pro" })
    expect(canAccessPaper(paid, "FA", TARGET, NOW)).toBe(true)
    expect(canAccessPaper(paid, "AAA", TARGET, NOW)).toBe(true)
    expect(canAccessPaper(paid, "AAA", [], NOW)).toBe(true) // paid needs no target
  })

  it("limits a free / expired-trial user to the target too (the app-level gate blocks the rest)", () => {
    const expired = user({ plan: "free", trial_started_at: inDays(-8), trial_ends_at: inDays(-1) })
    expect(canAccessPaper(expired, "FA", TARGET, NOW)).toBe(true)
    expect(canAccessPaper(expired, "AA", TARGET, NOW)).toBe(false)
  })

  it("does not apply the studying cap during a Pro trial", () => {
    const trialUser = user({ trial_ends_at: inDays(3) })
    expect(canAccessPaper(trialUser, "MA", ["FA", "MA"], NOW)).toBe(true)
    expect(canAccessPaper(trialUser, "LW", ["FA", "MA"], NOW)).toBe(true)
  })
})

/*
 * canAccessApp is the inverse of the route-level purchase wall (route-guards.tsx
 * walls when !canAccessApp). The bug it guards against: the wall keyed on `isPaid`
 * alone, which is FALSE during a legacy/promo trial (plan "free", no
 * plan_status:"trialing"), so an active trial got hard-blocked the instant it
 * started. Access = paid OR active trial.
 */
describe("canAccessApp (route-level app gate)", () => {
  it("lets in an active legacy/promo trial (isPaid=false but isTrial=true) — the regression", () => {
    const legacyTrial = user({ plan: "free", trial_started_at: inDays(-1), trial_ends_at: inDays(2) })
    expect(entitlementOf(legacyTrial, NOW).isPaid).toBe(false) // the field the old wall read
    expect(entitlementOf(legacyTrial, NOW).isTrial).toBe(true)
    expect(canAccessApp(legacyTrial, NOW)).toBe(true) // …but the app must stay open
  })

  it("lets in an active Stripe trial and every paid tier (incl. Beginner)", () => {
    expect(canAccessApp(user({ plan: "pro", plan_status: "trialing", trial_ends_at: inDays(2) }), NOW)).toBe(true)
    expect(canAccessApp(user({ plan: "beginner" }), NOW)).toBe(true)
    expect(canAccessApp(user({ plan: "pro" }), NOW)).toBe(true)
    expect(canAccessApp(user({ plan: "annual_pro" }), NOW)).toBe(true)
  })

  it("walls a free learner who never trialed", () => {
    expect(canAccessApp(user({ plan: "free" }), NOW)).toBe(false)
    expect(canAccessApp(null, NOW)).toBe(false)
  })

  it("walls a learner whose trial has expired with no paid plan", () => {
    const expired = user({ plan: "free", trial_started_at: inDays(-8), trial_ends_at: inDays(-1) })
    expect(canAccessApp(expired, NOW)).toBe(false)
    expect(shouldBlockForExpiredTrial(expired, NOW)).toBe(true) // and the expired-wall messaging still fires
  })
})

/*
 * cancel_at_period_end — the state between "they pressed Cancel" and "Stripe says
 * it lapsed". Settings tells the learner "access stays until then" and the confirm
 * dialog says "you'll switch to the free tier at the end of your billing period",
 * so entitlement has to honour that. It had no idea the state existed.
 *
 * The sharp case is a customer whose Stripe price id was never mapped to a known
 * plan name: they have no PAID_PLANS entry, so plan_status was the ONLY thing
 * keeping them entitled — and cancelling flipped it to "canceling", revoking a
 * paid subscription instantly.
 */
describe("a subscription cancelling at period end", () => {
  it("keeps a mapped plan fully entitled until it actually lapses", () => {
    const e = entitlementOf({ app_metadata: { plan: "pro", plan_status: "canceling" } })
    expect(e.isPaid).toBe(true)
    expect(e.isPro).toBe(true)
  })

  it("keeps an UNMAPPED price id entitled — plan_status is all it has", () => {
    const e = entitlementOf({ app_metadata: { plan: "scholify_launch_special", plan_status: "canceling" } })
    expect(e.isPaid, "a paying customer must not be dropped to free on cancel").toBe(true)
    expect(e.isPro).toBe(true)
  })

  it("keeps a beginner on the beginner tier, not promoted to pro", () => {
    const e = entitlementOf({ app_metadata: { plan: "beginner", plan_status: "canceling" } })
    expect(e.isPaid).toBe(true)
    expect(e.isBeginner).toBe(true)
    expect(e.isPro).toBe(false)
  })

  it("DOES drop access once the webhook reports it genuinely cancelled", () => {
    const e = entitlementOf({ app_metadata: { plan: "free", plan_status: "canceled" } })
    expect(e.isPaid).toBe(false)
    expect(e.isPro).toBe(false)
  })
})

/*
 * ── The dunning policy ───────────────────────────────────────────
 *
 * The hole this closes: Stripe leaves `plan: "pro"` on a past_due subscription,
 * and PAID_PLANS.has("pro") alone made both isPaid and isPro true. A 3-day
 * trial started on an empty card therefore bought the FULL Pro tier — timed
 * mocks and AI Examiner marking, at our model cost — for as long as Stripe kept
 * retrying, which is a dashboard setting and can be "forever".
 *
 * The rule now: grace keeps them studying, never keeps them on Pro, and the
 * window belongs to us rather than to Stripe's retry schedule.
 */
describe("a subscription whose payment failed", () => {
  const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString()

  it("drops the expensive Pro modes the moment the card fails", () => {
    const e = entitlementOf({ app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(1) } })
    expect(e.isPro, "an unpaid card must not buy mocks or the AI Examiner").toBe(false)
    expect(canUsePlanFeature({ app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(1) } }, "ai_examiner")).toBe(false)
    expect(canUsePlanFeature({ app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(1) } }, "timed_mocks")).toBe(false)
  })

  it("keeps them studying during grace — papers, chapters and banks stay open", () => {
    const meta = { app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(2) } }
    const e = entitlementOf(meta)
    expect(e.isPaid).toBe(true)
    expect(e.isPastDue).toBe(true)
    expect(canAccessApp(meta)).toBe(true)
    expect(canAccessPaper(meta, "FR", ["AA"])).toBe(true)
    expect(canUsePlanFeature(meta, "question_banks")).toBe(true)
    expect(canUsePlanFeature(meta, "study_chapters")).toBe(true)
  })

  it("counts the grace window down from the FIRST failure", () => {
    expect(entitlementOf({ app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(0) } }).graceDaysLeft).toBe(GRACE_DAYS)
    expect(entitlementOf({ app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(5) } }).graceDaysLeft).toBe(2)
  })

  it("cuts access when OUR window closes, whatever Stripe's retry schedule says", () => {
    const meta = { app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(GRACE_DAYS + 1) } }
    const e = entitlementOf(meta)
    expect(e.isPaid, "a misconfigured dunning schedule must not mean free Pro forever").toBe(false)
    expect(e.isPro).toBe(false)
    expect(e.isPastDue, "the window is closed — this is no longer grace").toBe(false)
    expect(canAccessApp(meta)).toBe(false)
  })

  it("never cuts anyone off over a stamp we never wrote", () => {
    // Rows written before this policy existed carry no past_due_since.
    const e = entitlementOf({ app_metadata: { plan: "pro", plan_status: "past_due" } })
    expect(e.isPaid).toBe(true)
    expect(e.isPastDue).toBe(true)
    expect(e.isPro).toBe(false)
  })

  it("restores Pro in full once the card is fixed", () => {
    const e = entitlementOf({ app_metadata: { plan: "pro", plan_status: "active", past_due_since: null } })
    expect(e.isPro).toBe(true)
    expect(e.isPastDue).toBe(false)
    expect(e.graceDaysLeft).toBe(0)
  })

  it("is not escapable by a stale trial_ends_at on the same account", () => {
    // The documented rule elsewhere in this file is that a real subscription
    // outranks a promo trial, and grace does not weaken it: a past_due account
    // carrying a future trial_ends_at is still held at Beginner. Otherwise the
    // cheapest way to keep Pro on a dead card would be to have once had a trial.
    const future = new Date(Date.now() + 2 * 86_400_000).toISOString()
    const e = entitlementOf({ app_metadata: { plan: "pro", plan_status: "past_due", past_due_since: daysAgo(1), trial_ends_at: future } })
    expect(e.isPro).toBe(false)
    expect(e.isPastDue).toBe(true)
  })

  it("still honours a Stripe-reported trial, which is never past_due", () => {
    const future = new Date(Date.now() + 2 * 86_400_000).toISOString()
    const e = entitlementOf({ app_metadata: { plan: "pro", plan_status: "trialing", trial_ends_at: future } })
    expect(e.isTrial).toBe(true)
    expect(e.isPro).toBe(true)
    expect(e.isPastDue).toBe(false)
  })
})
