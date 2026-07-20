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
    expect(new Set(getQuestions("AA").map((item) => item.area))).toEqual(new Set(["A", "B", "C", "D", "E", "F"]))
    expect(chaptersForPaper("AA").map((chapter) => chapter.area).sort()).toEqual(["A", "B", "C", "D", "E", "F"])
  })
})
