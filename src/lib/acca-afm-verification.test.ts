import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"

describe("AFM September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G"]
  it("covers all seven official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("AFM").map((item) => item.area))).toEqual(new Set(areas))
    expect(chaptersForPaper("AFM").map((item) => item.area).sort()).toEqual(areas)
  })
  it("includes constructed practice for professional and technology skills", () => {
    const represented = new Set(getWrittenQuestions("AFM").map((item) => item.area))
    expect(represented.has("F")).toBe(true)
    expect(represented.has("G")).toBe(true)
  })
  it("preserves ACCA's four professional-skill lenses", () => {
    const text = JSON.stringify(chaptersForPaper("AFM").find((item) => item.area === "F")).toLowerCase()
    for (const skill of ["communication", "analysis", "evaluation", "scepticism", "commercial acumen"]) expect(text).toContain(skill)
  })
})
