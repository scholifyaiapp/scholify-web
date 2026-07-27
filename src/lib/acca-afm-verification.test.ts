import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

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
  it("builds three distinct exact 100-mark compulsory mocks", () => {
    const seen = new Set<string>()
    for (const form of [1, 2, 3]) {
      const mock = buildCbeMock("AFM", form)
      expect(mock.totalMarks).toBe(100)
      expect(mock.sections.map((section) => section.marks)).toEqual([50, 50])
      const tasks = mock.sections.flatMap((section) =>
        section.items.flatMap((item) => item.kind === "task" ? [item.task] : []),
      )
      expect(tasks.map((task) => task.maxMarks)).toEqual([50, 25, 25])
      for (const task of tasks) {
        expect(seen.has(task.id)).toBe(false)
        seen.add(task.id)
      }
    }
  })
})
