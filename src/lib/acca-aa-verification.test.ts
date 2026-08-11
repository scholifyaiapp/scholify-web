import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"

describe("AA official Areas B and D independently recomputed examples", () => {
  it("recomputes planning materiality benchmarks", () => {
    expect(2_000_000 * 0.05).toBe(100_000)
    expect(30_000_000 * 0.01).toBe(300_000)
    expect(100_000 * 0.75).toBe(75_000)
  })

  it("recomputes sampling interval and projected misstatement", () => {
    expect(1_200_000 / 60).toBe(20_000)
    const projected = (4_000 / 80_000) * 1_000_000
    expect(projected).toBe(50_000)
  })

  it("recomputes a digital exception rate without treating it as error rate", () => {
    expect(240 / 60_000).toBeCloseTo(0.004)
  })

  it("keeps all six official AA areas represented", () => {
    /*
     * COVERAGE, not one-chapter-per-area — the same correction FM needed.
     *
     * Asserting an exact list quietly encoded the thing that made AA thin: six
     * chapters for six areas, so Area A carried A1 through A6 including ethics,
     * which is examined in Section B almost every sitting. AA is being rebuilt
     * as a tree, so an area legitimately holds several chapters and this must
     * check every area is COVERED rather than that none is covered twice.
     */
    const areas = ["A", "B", "C", "D", "E", "F"]
    expect(new Set(getQuestions("AA").map((item) => item.area))).toEqual(new Set(areas))
    expect(new Set(chaptersForPaper("AA").map((chapter) => chapter.area))).toEqual(new Set(areas))
  })
})
