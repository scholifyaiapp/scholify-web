import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { priceForPlan, planForPrice } from "./stripe"

/*
 * Stripe plan ↔ price mapping. Every bug here either charges for the wrong plan
 * or grants a plan nobody paid for, so both directions must be exact and must
 * fail CLOSED on anything unknown.
 */

const ENV = {
  STRIPE_PRICE_BEGINNER: "price_beginner_123",
  STRIPE_PRICE_PRO: "price_pro_123",
  STRIPE_PRICE_ANNUAL: "price_annual_123",
}

beforeEach(() => {
  for (const [k, v] of Object.entries(ENV)) vi.stubEnv(k, v)
})
afterEach(() => vi.unstubAllEnvs())

describe("priceForPlan (checkout: plan → price)", () => {
  it("maps each plan to its configured price", () => {
    expect(priceForPlan("beginner")).toBe(ENV.STRIPE_PRICE_BEGINNER)
    expect(priceForPlan("pro")).toBe(ENV.STRIPE_PRICE_PRO)
    expect(priceForPlan("annual_pro")).toBe(ENV.STRIPE_PRICE_ANNUAL)
  })

  it("returns undefined for an unknown plan — checkout refuses rather than guess", () => {
    for (const bad of ["", "free", "enterprise", "PRO"]) {
      expect(priceForPlan(bad)).toBeUndefined()
    }
  })

  it("returns undefined when the price ids aren't configured server-side", () => {
    vi.unstubAllEnvs()
    expect(priceForPlan("pro")).toBeUndefined()
  })
})

describe("planForPrice (webhook: price → plan)", () => {
  it("maps each configured price back to its plan", () => {
    expect(planForPrice(ENV.STRIPE_PRICE_BEGINNER)).toBe("beginner")
    expect(planForPrice(ENV.STRIPE_PRICE_PRO)).toBe("pro")
    expect(planForPrice(ENV.STRIPE_PRICE_ANNUAL)).toBe("annual_pro")
  })

  it("fails closed on an unknown, empty or absent price id", () => {
    for (const bad of ["price_unknown", "", undefined]) {
      expect(planForPrice(bad as string | undefined)).toBeNull()
    }
  })
})
