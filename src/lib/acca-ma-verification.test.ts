import { describe, expect, it } from "vitest"
import { MA_OFFICIAL_QUESTIONS } from "@/lib/acca-content-ma-official"

function correctOption(id: string): string {
  const question = MA_OFFICIAL_QUESTIONS.find((item) => item.id === id)
  if (!question || question.type !== "mcq" || !question.options || typeof question.correct !== "number") {
    throw new Error(`Missing or malformed MCQ ${id}`)
  }
  return question.options[question.correct]
}

describe("MA official Area B independently recomputed examples", () => {
  it("recomputes coefficient of determination", () => {
    const r = -0.8
    expect(r ** 2).toBeCloseTo(0.64)
    expect(correctOption("MA-B-O05")).toBe("64%")
  })

  it("recomputes expected value", () => {
    const expectedValue = 0.25 * 4_000 + 0.75 * 12_000
    expect(expectedValue).toBe(10_000)
    expect(correctOption("MA-B-O07")).toBe("$10,000")
  })

  it("recomputes a simple price index", () => {
    const index = (92 / 80) * 100
    expect(index).toBeCloseTo(115)
    expect(correctOption("MA-B-O08")).toBe("115.0")
  })

  it("recomputes the Study brief high-low example", () => {
    const variableCost = (23_000 - 14_000) / (5_000 - 2_000)
    const fixedCost = 23_000 - 5_000 * variableCost
    const forecast = fixedCost + 4_000 * variableCost
    expect({ variableCost, fixedCost, forecast }).toEqual({ variableCost: 3, fixedCost: 8_000, forecast: 20_000 })
  })

  it("recomputes the EOQ expression used by Area C", () => {
    const annualDemand = 10_000
    const orderCost = 40
    const annualHoldingCost = 2
    expect(Math.sqrt((2 * annualDemand * orderCost) / annualHoldingCost)).toBeCloseTo(632.4555, 4)
  })
})

describe("MA official Areas C–F independently recomputed examples", () => {
  it("recomputes Area C inventory and overhead absorption", () => {
    const fifoIssue = 100 * 5 + 150 * 6
    const overheadRate = 240_000 / 30_000
    const absorbed = overheadRate * 32_000
    expect({ fifoIssue, overheadRate, absorbed, overAbsorbed: absorbed - 250_000 }).toEqual({
      fifoIssue: 1_400,
      overheadRate: 8,
      absorbed: 256_000,
      overAbsorbed: 6_000,
    })
  })

  it("recomputes Area D production and cash budgets", () => {
    expect(20_000 + 3_000 - 2_500).toBe(20_500)
    const janClosing = 10_000 + (0.4 * 80_000 + 0.6 * 70_000) - 50_000 - 15_000 - 8_000
    const febClosing = janClosing + (0.4 * 100_000 + 0.6 * 80_000) - 55_000 - 18_000 - 8_000 - 30_000
    const marClosing = febClosing + (0.4 * 120_000 + 0.6 * 100_000) - 60_000 - 20_000 - 8_000
    expect([janClosing, febClosing, marClosing]).toEqual([11_000, -12_000, 8_000])
  })

  it("recomputes Area E material and fixed-overhead variances", () => {
    const materialPrice = (3 - 12_600 / 4_500) * 4_500
    const materialUsage = (1_100 * 4 - 4_500) * 3
    const fixedOverheadVolume = (1_100 - 1_000) * 10
    expect(materialPrice).toBeCloseTo(900)
    expect(materialUsage).toBe(-300)
    expect(fixedOverheadVolume).toBe(1_000)
  })

  it("recomputes Area F divisional and operating ratios", () => {
    const roi = 90_000 / 600_000
    const residualIncome = 180_000 - 1_000_000 * 0.12
    const capacity = 9_500 / 10_000
    const efficiency = 9_880 / 9_500
    expect(roi).toBeCloseTo(0.15)
    expect(residualIncome).toBe(60_000)
    expect(capacity).toBeCloseTo(0.95)
    expect(efficiency).toBeCloseTo(1.04)
  })
})
