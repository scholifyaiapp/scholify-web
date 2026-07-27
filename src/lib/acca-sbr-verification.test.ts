import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

describe("SBR-INT September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G"]
  it("covers all seven official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("SBR").map((item) => item.area))).toEqual(new Set(areas))
    expect(chaptersForPaper("SBR").map((item) => item.area).sort()).toEqual(areas)
  })
  it("includes written practice for ethics, sustainability regulation and digital skills", () => {
    const represented = new Set(getWrittenQuestions("SBR").map((item) => item.area))
    for (const area of ["A", "F", "G"]) expect(represented.has(area)).toBe(true)
  })
  it("includes the current sustainability disclosure architecture", () => {
    const currentIssues = JSON.stringify(chaptersForPaper("SBR").find((item) => item.area === "F")).toLowerCase()
    for (const term of ["ifrs s1", "ifrs s2", "governance", "strategy", "risk management", "metrics", "esrs"]) expect(currentIssues).toContain(term)
  })
  it("keeps financial instruments and employee benefits in official Area C", () => {
    const performance = JSON.stringify(chaptersForPaper("SBR").find((item) => item.area === "C")).toLowerCase()
    expect(performance).toContain("financial instrument")
    expect(performance).toContain("employee benefit")
  })
  it("builds three exact, distinct 100-mark mock forms", () => {
    const ids = new Set<string>()
    for (const form of [1, 2, 3]) {
      const mock = buildCbeMock("SBR", form)
      expect(mock.totalMarks).toBe(100)
      expect(mock.sections.map((section) => section.marks)).toEqual([50, 50])
      const tasks = mock.sections
        .flatMap((section) => section.items)
        .filter((item) => item.kind === "task")
        .map((item) => item.task)
      expect(tasks.map((task) => task.maxMarks)).toEqual([30, 20, 25, 25])
      for (const task of tasks) {
        expect(ids.has(task.id), `${task.id} repeated across forms`).toBe(false)
        ids.add(task.id)
      }
    }
  })
})
