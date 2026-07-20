import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"

describe("TX-UK Finance Act 2025 independently recomputed examples", () => {
  it("recomputes employer Class 1 and Class 1A NIC at 15%", () => {
    expect((60_000 - 5_000) * 0.15).toBe(8_250)
    expect(12_000 * 0.15).toBe(1_800)
  })

  it("recomputes the beneficial-loan benefit using the 3.75% official rate", () => {
    const averageLoan = (40_000 + 20_000) / 2
    expect(averageLoan * 0.0375).toBe(1_125)
  })

  it("recomputes the FA2025 BADR example at 14%", () => {
    expect((180_000 - 3_000) * 0.14).toBeCloseTo(24_780)
  })

  it("recomputes representative IHT, corporation-tax and VAT workings", () => {
    expect((500_000 - 325_000) * 0.4).toBe(70_000)
    expect(100_000 + 20_000 + 5_000 - 15_000).toBe(110_000)
    expect(3_600 * (20 / 120)).toBe(600)
  })

  it("keeps every official TX area represented and rejects stale learner content", () => {
    const questions = getQuestions("TX")
    expect(new Set(questions.map((item) => item.area))).toEqual(new Set(["A", "B", "C", "D", "E", "F", "G"]))
    const items = [
      ...questions.map((item) => JSON.stringify(item)),
      ...chaptersForPaper("TX").flatMap((chapter) => chapter.sections.map((section) => JSON.stringify(section))),
    ]
    const stale = /FA2024|official rate of interest of 2\.25%|(?:employer|secondary|Class 1A)[^\n]{0,80}13\.8%|domicil/i
    expect(items.some((item) => stale.test(item))).toBe(false)
  })
})
