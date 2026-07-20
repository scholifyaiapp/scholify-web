import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"

describe("FR official Areas B–D independently recomputed examples", () => {
  it("recomputes transaction measurements", () => {
    const inventoryNrv = 80_000 - 6_000
    expect(Math.min(78_000, inventoryNrv)).toBe(74_000)
    expect(Math.max(120_000 - 15_000, 98_000)).toBe(105_000)
    expect(100_000 * 0.3).toBe(30_000)
  })

  it("recomputes analysis ratios", () => {
    expect(1_200_000 / 10_000_000).toBeCloseTo(0.12)
    expect(1_200_000 / 12_000_000).toBeCloseTo(0.1)
    expect((0.12 - 0.1) * 100).toBeCloseTo(2)
  })

  it("recomputes consolidation controls", () => {
    const goodwill = 800_000 + 200_000 - 900_000
    const groupRetainedEarnings = 500_000 + 0.8 * 150_000
    expect({ goodwill, groupRetainedEarnings }).toEqual({ goodwill: 100_000, groupRetainedEarnings: 620_000 })
  })

  it("keeps the five official syllabus areas complete", () => {
    expect(new Set(getQuestions("FR").map((item) => item.area))).toEqual(new Set(["A", "B", "C", "D", "E"]))
    expect(chaptersForPaper("FR").map((chapter) => chapter.area).sort()).toEqual(["A", "B", "C", "D", "E"])
  })
})
