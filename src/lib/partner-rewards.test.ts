import { describe, expect, it } from "vitest"
import {
  classifySaleAmount,
  commissionPaymentsFor,
  commissionOn,
  COMMISSION_RATE,
  COMMISSION_TIERS,
  commissionTierForPaidCustomers,
  commissionTierProgress,
  earningsFor,
  EXAMPLE_EARNINGS,
  EXAMPLE_PROGRESS,
  EXAMPLE_SALES,
  PLAN_PRICE,
  projectedPartnerCommission,
  REWARD_TIERS,
  rewardProgress,
} from "@/lib/partner-rewards"

describe("performance commission tiers", () => {
  it("unlocks 1, 3 and 5 monthly payments at the published paid-customer thresholds", () => {
    expect(commissionTierForPaidCustomers(0).monthlyPayments).toBe(1)
    expect(commissionTierForPaidCustomers(299).monthlyPayments).toBe(1)
    expect(commissionTierForPaidCustomers(300).monthlyPayments).toBe(3)
    expect(commissionTierForPaidCustomers(599).monthlyPayments).toBe(3)
    expect(commissionTierForPaidCustomers(600).monthlyPayments).toBe(5)
    expect(COMMISSION_TIERS.map((tier) => tier.paidCustomers)).toEqual([0, 300, 600])
  })

  it("keeps annual plans to one commission because the year is paid up front", () => {
    expect(commissionPaymentsFor("pro", 600)).toBe(5)
    expect(commissionPaymentsFor("proAnnual", 600)).toBe(1)
  })

  it("reports progress inside the current tier rather than against an ambiguous lifetime scale", () => {
    expect(commissionTierProgress(150)).toMatchObject({ remaining: 150, percent: 50 })
    expect(commissionTierProgress(450)).toMatchObject({ remaining: 150, percent: 50 })
    expect(commissionTierProgress(700)).toMatchObject({ remaining: 0, percent: 100, next: null })
  })

  it("projects thresholds prospectively instead of upgrading earlier customers retroactively", () => {
    const onePayment = commissionOn("pro", 1)
    expect(projectedPartnerCommission("pro", 299)).toBeCloseTo(299 * onePayment, 2)
    expect(projectedPartnerCommission("pro", 300)).toBeCloseTo((299 + 3) * onePayment, 2)
    expect(projectedPartnerCommission("proAnnual", 600)).toBe(600 * 32.4)
  })
})

/*
 * These numbers are printed on a public offer page and on a partner's own
 * dashboard. If they drift apart, or if a total stops equalling the rows shown
 * above it, a partner finds out by feeling short-changed — so the arithmetic is
 * pinned here rather than trusted.
 */

describe("classifySaleAmount", () => {
  it("recovers the plan from the recorded price, monthly and annual", () => {
    expect(classifySaleAmount(PLAN_PRICE.beginner)).toBe("beginner")
    expect(classifySaleAmount(PLAN_PRICE.beginnerAnnual)).toBe("beginner")
    expect(classifySaleAmount(PLAN_PRICE.pro)).toBe("pro")
    expect(classifySaleAmount(PLAN_PRICE.proAnnual)).toBe("pro")
  })

  it("never guesses a tier for an unrecognised amount", () => {
    // Pro-only rewards must not be credited on a price we cannot identify.
    expect(classifySaleAmount(12.5)).toBe("other")
    expect(classifySaleAmount(0)).toBe("other")
  })

  it("is not fooled by float noise on the cent", () => {
    expect(classifySaleAmount(9.99 + Number.EPSILON)).toBe("beginner")
  })
})

describe("earningsFor", () => {
  it("computes the published 780-sale example", () => {
    expect(EXAMPLE_SALES).toBe(780)
    expect(EXAMPLE_EARNINGS.beginnerSales).toBe(390)
    expect(EXAMPLE_EARNINGS.proSales).toBe(390)
    // 390 × 9.99 × 27% and 390 × 14.99 × 27%
    expect(EXAMPLE_EARNINGS.beginnerCommission).toBe(1051.95)
    expect(EXAMPLE_EARNINGS.proCommission).toBe(1578.45)
    expect(EXAMPLE_EARNINGS.totalCommission).toBe(2630.4)
    expect(EXAMPLE_EARNINGS.totalRevenue).toBe(9742.2)
  })

  it("keeps the total equal to the sum of the rows it prints", () => {
    for (const [beginnerSales, proSales] of [[1, 1], [7, 13], [390, 390], [0, 5]]) {
      const e = earningsFor({ beginnerSales, proSales })
      expect(e.totalCommission).toBe(e.beginnerCommission + e.proCommission)
    }
  })

  it("quotes the per-sale commission at the published rate", () => {
    expect(EXAMPLE_EARNINGS.perBeginnerSale).toBe(2.7)
    expect(EXAMPLE_EARNINGS.perProSale).toBe(4.05)
    expect(commissionOn("pro", 1)).toBe(EXAMPLE_EARNINGS.perProSale)
  })

  it("holds the advertised rate at 27%", () => {
    expect(COMMISSION_RATE).toBe(0.27)
  })
})

describe("rewardProgress", () => {
  const [qatar, abuDhabi] = REWARD_TIERS

  it("puts the 780-sale example 220 short of the Grand Prix ticket", () => {
    expect(EXAMPLE_PROGRESS.target).toBe(1000)
    expect(EXAMPLE_PROGRESS.achieved).toBe(780)
    expect(EXAMPLE_PROGRESS.remaining).toBe(220)
    expect(EXAMPLE_PROGRESS.percent).toBe(78)
    expect(EXAMPLE_PROGRESS.reached).toBe(false)
  })

  it("counts only Pro sales toward the Pro-only tier", () => {
    const p = rewardProgress(abuDhabi, { all: 3000, pro: 390 })
    expect(p.achieved).toBe(390)
    expect(p.remaining).toBe(1610)
  })

  it("never reports a negative remainder or over 100%", () => {
    const p = rewardProgress(qatar, { all: 1400, pro: 900 })
    expect(p.remaining).toBe(0)
    expect(p.percent).toBe(100)
    expect(p.reached).toBe(true)
  })

  it("floors the days-left countdown at zero once the deadline passes", () => {
    const after = Date.parse(qatar.deadlineISO) + 10 * 86_400_000
    expect(rewardProgress(qatar, { all: 10, pro: 2 }, after).daysLeft).toBe(0)
    const before = Date.parse(qatar.deadlineISO) - 3 * 86_400_000
    expect(rewardProgress(qatar, { all: 10, pro: 2 }, before).daysLeft).toBe(3)
  })
})
