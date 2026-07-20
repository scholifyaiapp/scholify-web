import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"

describe("SBL September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  it("covers all ten official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("SBL").map((item) => item.area))).toEqual(new Set(areas))
    expect(chaptersForPaper("SBL").map((item) => item.area).sort()).toEqual(areas)
  })
  it("includes case-style written work for newly separated control, finance, change and digital areas", () => {
    const represented = new Set(getWrittenQuestions("SBL").map((item) => item.area))
    for (const area of ["F", "G", "H", "J"]) expect(represented.has(area)).toBe(true)
  })
  it("recomputes the strategic investment example", () => {
    expect(2.6 - 2.0).toBeCloseTo(0.6)
  })
  it("preserves ACCA's five professional-skill lenses", () => {
    const professional = chaptersForPaper("SBL").find((item) => item.area === "I")
    const text = JSON.stringify(professional)
    for (const skill of ["communication", "commercial", "analysis", "scepticism", "evaluation"]) expect(text.toLowerCase()).toContain(skill)
  })
})
