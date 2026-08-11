import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"

describe("FM official Areas C–G independently recomputed examples", () => {
  it("recomputes working-capital controls", () => {
    expect(Math.sqrt((2 * 10_000 * 40) / 2)).toBeCloseTo(632.4555, 4)
    expect((2_000_000 / 365) * 45).toBeCloseTo(246_575.34, 2)
  })
  it("recomputes an investment NPV", () => {
    const npv = -100_000 + 45_000 * 0.909 + 45_000 * 0.826 + 45_000 * 0.751
    expect(npv).toBeCloseTo(11_870)
  })
  it("recomputes WACC and valuation", () => {
    expect(0.6 * 0.12 + 0.4 * 0.06 * (1 - 0.25)).toBeCloseTo(0.09)
    expect((0.15 * 1.04) / (0.1 - 0.04)).toBeCloseTo(2.6)
  })
  it("recomputes currency and interest hedges", () => {
    expect(500_000 * 1.1).toBe(550_000)
    expect(10_000_000 * 0.05 * (6 / 12)).toBe(250_000)
  })
  it("keeps all eight official FM areas represented", () => {
    /*
     * COVERAGE, not one-chapter-per-area.
     *
     * This asserted an exact list, which quietly encoded the thing that made FM
     * a thin paper: eight chapters for eight areas, so A1 through A4 shared a
     * single sitting. FM is being rebuilt as a tree — one chapter per syllabus
     * sub-topic group, the same shape BT has — so an area legitimately holds
     * several chapters and this must check that every area is COVERED rather
     * than that none is covered twice.
     */
    const areas = ["A", "B", "C", "D", "E", "F", "G", "H"]
    expect(new Set(getQuestions("FM").map((item) => item.area))).toEqual(new Set(areas))
    expect(new Set(chaptersForPaper("FM").map((chapter) => chapter.area))).toEqual(new Set(areas))
  })

  it("gives every chapter a unique id once a tree area exists", () => {
    // Learner progress keys off `id`, so two chapters sharing one would record
    // the second against the first — silently, and only for tree papers.
    const withIds = chaptersForPaper("FM").filter((c) => c.id)
    expect(new Set(withIds.map((c) => c.id)).size).toBe(withIds.length)
  })
})
