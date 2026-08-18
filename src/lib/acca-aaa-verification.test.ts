import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

describe("AAA-INT September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]

  /*
   * The authored-tree ratchet. Every one of AAA's nine areas is now an authored
   * tree and all five legacy files are deleted. Raise a floor if an area grows;
   * never lower one.
   *
   * The weighting is deliberate rather than incidental: Section A is a 50-mark
   * case study set at the PLANNING stage drawing predominantly on areas A to D,
   * so those four carry seventeen of the thirty chapters.
   */
  const CHAPTER_FLOOR: Record<string, number> = {
    A: 3, // AAA-01..03 — regulatory environment
    B: 4, // AAA-04..07 — professional and ethical considerations
    C: 3, // AAA-08..10 — quality management
    D: 7, // AAA-11..17 — planning and conducting; Section A comes from here
    E: 4, // AAA-18..21 — completion, review and reporting
    F: 6, // AAA-22..27 — other assignments
    G: 1, // AAA-28 — current issues
    H: 1, // AAA-29 — professional skills
    I: 1, // AAA-30 — employability and technology skills
  }

  it("covers all nine official capabilities", () => {
    expect(new Set(getQuestions("AAA").map((x) => x.area))).toEqual(new Set(areas))
    expect([...new Set(chaptersForPaper("AAA").map((x) => x.area))].sort()).toEqual(areas)
  })

  it("keeps the authored chapter tree from regressing", () => {
    for (const area of areas) {
      const count = chaptersForPaper("AAA").filter((x) => x.area === area).length
      expect(count, `AAA area ${area} chapter count`).toBeGreaterThanOrEqual(CHAPTER_FLOOR[area])
    }
  })

  it("gives every authored tree chapter a stable id, number and syllabus references", () => {
    const authored = chaptersForPaper("AAA").filter((x) => x.id?.startsWith("AAA-"))
    expect(authored.length).toBeGreaterThanOrEqual(30)
    const numbers = new Set<number>()
    for (const chapter of authored) {
      expect(typeof chapter.number, `${chapter.id} number`).toBe("number")
      expect(chapter.syllabusRefs?.length ?? 0, `${chapter.id} syllabusRefs`).toBeGreaterThan(0)
      expect(numbers.has(chapter.number as number), `${chapter.id} duplicate number`).toBe(false)
      numbers.add(chapter.number as number)
    }
  })

  it("includes written practice for all newly represented capabilities", () => {
    const represented = new Set(getWrittenQuestions("AAA").map((x) => x.area))
    for (const area of ["F", "G", "H"]) expect(represented.has(area)).toBe(true)
  })

  it("covers sustainability assurance and technology audit quality", () => {
    const text = JSON.stringify(chaptersForPaper("AAA")).toLowerCase()
    for (const term of ["sustainability assurance", "suitable criteria", "automation bias", "human judgement"]) {
      expect(text, `AAA should cover ${term}`).toContain(term)
    }
  })

  it("teaches the planning-stage skills Section A is built on", () => {
    // Section A draws predominantly on areas A to D and is set at planning, so
    // the risk-identification routine and the ethics routine must both be there.
    const planning = JSON.stringify(chaptersForPaper("AAA").filter((x) => ["A", "B", "C", "D"].includes(x.area))).toLowerCase()
    for (const term of ["risk of material misstatement", "professional scepticism", "performance materiality", "significant risk", "management override", "component materiality"]) {
      expect(planning, `Areas A–D should teach ${term}`).toContain(term)
    }
  })

  it("preserves four professional-skill lenses", () => {
    // filter, not find — Area H is a tree, and .find() would examine only its
    // first chapter. The same defect the SBR and APM rebuilds hit.
    const text = JSON.stringify(chaptersForPaper("AAA").filter((x) => x.area === "H")).toLowerCase()
    for (const term of ["communication", "analysis and evaluation", "scepticism", "commercial acumen"]) {
      expect(text).toContain(term)
    }
  })

  it("builds three distinct exact mocks with planning in Section A", () => {
    const seen = new Set<string>()
    for (const form of [1, 2, 3]) {
      const mock = buildCbeMock("AAA", form)
      expect(mock.totalMarks).toBe(100)
      expect(mock.sections.map((section) => section.marks)).toEqual([50, 50])
      const tasks = mock.sections.flatMap((section) => section.items.flatMap((item) => (item.kind === "task" ? [item.task] : [])))
      expect(tasks.map((task) => task.maxMarks)).toEqual([50, 25, 25])
      expect(tasks[0].stem.toLowerCase()).toContain("planning requirement")
      expect(tasks[0].stem.toLowerCase()).toContain("risks of material misstatement")
      for (const task of tasks) {
        expect(seen.has(task.id)).toBe(false)
        seen.add(task.id)
      }
    }
  })
})
