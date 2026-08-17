import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

describe("SBR-INT September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G"]
  /*
   * Per-area chapter floors for the tree rebuild, mirroring SBL's. This is a
   * RATCHET, not a target: raise a floor as each area is authored and it can
   * never silently regress. `1` marks an area still served by the legacy
   * `select` shim in acca-study-sbr-official.ts.
   */
  const CHAPTER_FLOOR: Record<string, number> = {
    A: 3, // acca-study-sbr-tree-a.ts — A1(a) ethics duty, A1(a) pressure, A1(b) consequences
    B: 1,
    C: 1,
    D: 1,
    E: 1,
    F: 1,
    G: 1,
  }
  it("covers all seven official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("SBR").map((item) => item.area))).toEqual(new Set(areas))
    expect([...new Set(chaptersForPaper("SBR").map((item) => item.area))].sort()).toEqual(areas)
  })
  it("keeps the authored chapter tree from regressing", () => {
    for (const area of areas) {
      const count = chaptersForPaper("SBR").filter((item) => item.area === area).length
      expect(count, `SBR area ${area} chapter count`).toBeGreaterThanOrEqual(CHAPTER_FLOOR[area])
    }
  })
  it("gives every authored tree chapter a stable id, number and syllabus references", () => {
    // The shim-built chapters carry none of these, which is how you tell them apart.
    const authored = chaptersForPaper("SBR").filter((item) => item.id?.startsWith("SBR-"))
    expect(authored.length).toBeGreaterThanOrEqual(3)
    for (const chapter of authored) {
      expect(typeof chapter.number, `${chapter.id} number`).toBe("number")
      expect(chapter.syllabusRefs?.length ?? 0, `${chapter.id} syllabusRefs`).toBeGreaterThan(0)
    }
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
