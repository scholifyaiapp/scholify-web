import { describe, it, expect } from "vitest"
import { entitlementOf, isProUser, canStartTrial, canAccessPaper, canUsePlanFeature, TRIAL_DAYS } from "@/lib/entitlement"

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

  it("grants Pro features on the chosen paper but not all-paper access", () => {
    const trial = user({ plan: "free", trial_started_at: inDays(-1), trial_ends_at: inDays(2) })
    expect(canUsePlanFeature(trial, "timed_mocks", NOW)).toBe(true)
    expect(canUsePlanFeature(trial, "ai_examiner", NOW)).toBe(true)
    expect(canUsePlanFeature(trial, "custom_practice", NOW)).toBe(true)
    expect(canUsePlanFeature(trial, "all_papers", NOW)).toBe(false)
    expect(canAccessPaper(trial, "AAA", ["FA"], NOW)).toBe(false)
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

describe("TRIAL_DAYS", () => {
  it("is the 3 the marketing promises", () => {
    expect(TRIAL_DAYS).toBe(3)
  })
})

describe("canAccessPaper", () => {
  const TARGET = ["FA"]

  it("limits a trial user to their onboarding target paper", () => {
    const trialUser = user({ plan: "free", trial_started_at: inDays(0), trial_ends_at: inDays(3) })
    expect(canAccessPaper(trialUser, "FA", TARGET, NOW)).toBe(true)
    expect(canAccessPaper(trialUser, "AA", TARGET, NOW)).toBe(false)
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

  it("supports two target papers (the studying cap)", () => {
    const trialUser = user({ trial_ends_at: inDays(3) })
    expect(canAccessPaper(trialUser, "MA", ["FA", "MA"], NOW)).toBe(true)
    expect(canAccessPaper(trialUser, "LW", ["FA", "MA"], NOW)).toBe(false)
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
