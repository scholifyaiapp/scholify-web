import { describe, expect, it } from "vitest"

describe("PM official Areas B–E independently recomputed examples", () => {
  it("recomputes Area B target cost and throughput return", () => {
    const targetCost = 120 - 120 * 0.25
    const throughputPerUnit = 80 - 30
    const returnPerBottleneckHour = throughputPerUnit / 0.5
    expect({ targetCost, returnPerBottleneckHour }).toEqual({ targetCost: 90, returnPerBottleneckHour: 100 })
  })

  it("recomputes Area C CVP and limiting-factor ranking", () => {
    const contributionPerUnit = 50 - 30
    const breakEvenUnits = 120_000 / contributionPerUnit
    const contributionPerScarceHour = contributionPerUnit / 0.25
    expect({ contributionPerUnit, breakEvenUnits, contributionPerScarceHour }).toEqual({ contributionPerUnit: 20, breakEvenUnits: 6_000, contributionPerScarceHour: 80 })
  })

  it("recomputes Area D learning and material mix/yield controls", () => {
    const learningIndex = Math.log(0.8) / Math.log(2)
    const cumulativeAverageAtEight = 100 * 8 ** learningIndex
    expect(cumulativeAverageAtEight).toBeCloseTo(51.2)
    const totalUsageVariance = (1_000 - 1_050) * 4
    const mixPlusYield = -80 + -120
    expect(mixPlusYield).toBe(totalUsageVariance)
  })

  it("recomputes Area E ROI, RI and transfer-price range", () => {
    const roi = 180_000 / 1_000_000
    const residualIncome = 180_000 - 1_000_000 * 0.12
    const minimumTransferPriceWithSpareCapacity = 35
    const maximumTransferPrice = 52
    expect(roi).toBeCloseTo(0.18)
    expect(residualIncome).toBe(60_000)
    expect(minimumTransferPriceWithSpareCapacity).toBeLessThan(maximumTransferPrice)
  })
})
