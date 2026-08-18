import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

describe("AFM September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G"]

  /*
   * The authored-tree ratchet. AFM's rebuild replaces one area at a time, so
   * this records what has landed and forbids regression — raise an area's floor
   * in the commit that authors it. Areas still on 1 are the legacy
   * one-chapter-per-area content that acca-study-afm-official.ts relabels.
   */
  const CHAPTER_FLOOR: Record<string, number> = {
    A: 9, // trees a + a2 — AFM-01..09, one chapter per syllabus subsection group (A1, A2×3, A3×2, A4, A5, A6)
    B: 7, // trees b1 + b2 — B1 as AFM-10..13, B2 as AFM-14..15, plus the legacy chapter still spliced in last
    C: 1, // legacy — acquisitions and mergers
    D: 1, // legacy — corporate reconstruction and reorganisation
    E: 1, // legacy — treasury and advanced risk management
    F: 1, // authored — professional skills
    G: 1, // authored — employability and technology skills
  }

  it("covers all seven official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("AFM").map((item) => item.area))).toEqual(new Set(areas))
    expect([...new Set(chaptersForPaper("AFM").map((item) => item.area))].sort()).toEqual(areas)
  })

  it("keeps the authored chapter tree from regressing", () => {
    for (const area of areas) {
      const count = chaptersForPaper("AFM").filter((item) => item.area === area).length
      expect(count, `AFM area ${area} chapter count`).toBeGreaterThanOrEqual(CHAPTER_FLOOR[area])
    }
  })

  it("gives every authored tree chapter a stable id, number and syllabus references", () => {
    // The shim-served legacy chapters carry none of these, which is how you tell
    // an authored area from one still awaiting its rebuild.
    const authored = chaptersForPaper("AFM").filter((item) => item.id?.startsWith("AFM-"))
    expect(authored.length).toBeGreaterThanOrEqual(9)
    const numbers = new Set<number>()
    for (const chapter of authored) {
      expect(typeof chapter.number, `${chapter.id} number`).toBe("number")
      expect(chapter.syllabusRefs?.length ?? 0, `${chapter.id} syllabusRefs`).toBeGreaterThan(0)
      expect(numbers.has(chapter.number as number), `${chapter.id} duplicate number`).toBe(false)
      numbers.add(chapter.number as number)
    }
  })

  it("teaches Area A's international and distribution subsections, which the shim buried", () => {
    // A4, A5 and A6 carry real technical marks and were served by one legacy
    // chapter written mainly about the adviser's role and ethics.
    const areaA = JSON.stringify(chaptersForPaper("AFM").filter((item) => item.area === "A")).toLowerCase()
    for (const term of ["dividend capacity", "transfer pric", "withholding tax", "exchange control", "trade diversion", "behavioural"]) {
      expect(areaA, `Area A should teach ${term}`).toContain(term)
    }
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
