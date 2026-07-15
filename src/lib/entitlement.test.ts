import { describe, it, expect } from "vitest"
import { entitlementOf, isProUser, canStartTrial, TRIAL_DAYS } from "@/lib/entitlement"

/*
 * Entitlement decides who gets Pro. Every case here is a real gate: a wrong
 * answer either gives away Pro for free or locks a paying customer out.
 */

const NOW = Date.parse("2026-07-15T12:00:00Z")
const inDays = (d: number) => new Date(NOW + d * 86400000).toISOString()
const user = (meta: Record<string, unknown>) => ({ app_metadata: meta })

describe("paid plans", () => {
  it("grants Pro to every paid tier", () => {
    for (const plan of ["beginner", "pro", "annual_pro"]) {
      const e = entitlementOf(user({ plan }), NOW)
      expect(e.isPaid).toBe(true)
      expect(e.isPro).toBe(true)
      expect(e.isTrial).toBe(false)
    }
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
  it("is the 7 the marketing promises", () => {
    expect(TRIAL_DAYS).toBe(7)
  })
})
