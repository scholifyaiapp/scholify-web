import { describe, expect, it } from "vitest"

describe("FA official Areas C–I independently recomputed examples", () => {
  it("recomputes Area C double-entry equation movements", () => {
    const assets = 50_000 - 12_000 + 12_000 + 8_000
    const equityAndLiabilities = 50_000 + 8_000
    expect(assets).toBe(equityAndLiabilities)
  })

  it("recomputes Area D inventory, depreciation and allowance movements", () => {
    const inventory = Math.min(8_000, 7_500 - 600)
    const annualDepreciation = (50_000 - 5_000) / 5
    const closingAllowance = 2_000 + (80_000 - 2_000) * 0.03
    expect({ inventory, annualDepreciation, closingAllowance }).toEqual({ inventory: 6_900, annualDepreciation: 9_000, closingAllowance: 4_340 })
  })

  it("recomputes Area E corrected bank and reconciliation balances", () => {
    const correctedCashBook = 3_200 - 50 - 180 + 30
    const reconciledStatement = 3_450 - 600 + 150
    expect(correctedCashBook).toBe(3_000)
    expect(reconciledStatement).toBe(correctedCashBook)
  })

  it("recomputes Area F suspense correction", () => {
    const rentOverdebit = 740 - 470
    const salesUndercast = 90
    const openingSuspenseCredit = rentOverdebit + salesUndercast
    expect(openingSuspenseCredit).toBe(360)
    expect(openingSuspenseCredit - rentOverdebit - salesUndercast).toBe(0)
  })

  it("recomputes Area G statement preparation figures", () => {
    const grossProfit = 120_000 - 72_000
    const closingInventory = 15_000 + 160_000 - 200_000 * 0.75
    expect({ grossProfit, closingInventory }).toEqual({ grossProfit: 48_000, closingInventory: 25_000 })
  })

  it("recomputes Area H goodwill and unrealised profit", () => {
    const goodwill = 100_000 + 22_000 - 105_000
    const unrealisedProfit = (10_000 / 1.25) * 0.25 * 0.5
    expect({ goodwill, unrealisedProfit }).toEqual({ goodwill: 17_000, unrealisedProfit: 1_000 })
  })

  it("recomputes Area I profitability and liquidity ratios", () => {
    const grossMargin = (250_000 - 170_000) / 250_000
    const quickRatio = (22_000 + 5_000) / 25_000
    expect(grossMargin).toBeCloseTo(0.32)
    expect(quickRatio).toBeCloseTo(1.08)
  })
})
