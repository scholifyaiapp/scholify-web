import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { getWrittenQuestions } from "@/lib/acca-written"

describe("SBL September 2026–June 2027 official structure", () => {
  const areas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

  /*
   * Chapters per area, as the rebuild lands. SBL is moving from one chapter per
   * syllabus area to a chapter TREE (one chapter per sub-topic group), so the old
   * assertion — every area appears exactly once — asserted the very shape being
   * removed and failed the moment the first real area landed.
   *
   * This is a RATCHET, not a target: raise a floor as each area is authored and
   * it can never silently regress. `1` marks an area still served by the legacy
   * `subset` shim in acca-study-sbl-official.ts.
   */
  const CHAPTER_FLOOR: Record<string, number> = {
    A: 4, // acca-study-sbl-tree-a.ts — A1, A2, A3a-b, A3c-e
    B: 7, // acca-study-sbl-tree-b.ts — B1, B2, B3, B5a-e, B5f-h, B4, B6
    C: 6, // acca-study-sbl-tree-c.ts — C1, C2, C3, C4, C5 split over two
    D: 4, // acca-study-sbl-tree-d.ts — D1 over two, D2 over two
    E: 5, // acca-study-sbl-tree-e.ts — E1, E2, E3, E4, E5
    F: 3, // acca-study-sbl-tree-f.ts — F1, F2, F3
    G: 4, // acca-study-sbl-tree-g.ts — G1, G2 over two, G2f+G3
    H: 1, I: 1, J: 1,
  }

  it("covers all ten official capabilities in questions and chapters", () => {
    expect(new Set(getQuestions("SBL").map((item) => item.area))).toEqual(new Set(areas))
    expect(new Set(chaptersForPaper("SBL").map((item) => item.area))).toEqual(new Set(areas))
  })

  it("keeps the authored chapter tree from regressing", () => {
    for (const area of areas) {
      const count = chaptersForPaper("SBL").filter((item) => item.area === area).length
      expect(count, `SBL area ${area} chapter count`).toBeGreaterThanOrEqual(CHAPTER_FLOOR[area])
    }
  })

  it("gives every authored tree chapter a stable id and syllabus references", () => {
    // The shim-built chapters carry neither, which is how you tell them apart.
    const authored = chaptersForPaper("SBL").filter((item) => item.id?.startsWith("SBL-0") || item.id?.startsWith("SBL-1"))
    expect(authored.length).toBeGreaterThanOrEqual(4)
    for (const chapter of authored) {
      expect(chapter.syllabusRefs?.length, `${chapter.id} syllabusRefs`).toBeGreaterThan(0)
      expect(chapter.sections.length, `${chapter.id} sections`).toBeGreaterThan(0)
      expect(chapter.knowledgeDiagnostic?.length, `${chapter.id} knowledgeDiagnostic`).toBeGreaterThan(0)
    }
  })
  it("includes case-style written work for newly separated control, finance, change and digital areas", () => {
    const represented = new Set(getWrittenQuestions("SBL").map((item) => item.area))
    for (const area of ["F", "G", "H", "J"]) expect(represented.has(area)).toBe(true)
  })
  it("recomputes the strategic investment example", () => {
    expect(2.6 - 2.0).toBeCloseTo(0.6)
  })
  it("files legacy control and audit questions under Area F, not Risk", () => {
    /*
     * Legacy area C covered risk AND control AND audit AND fraud, and the bulk
     * shift in acca-sbl-syllabus-map.ts sent all of it to D. Area F was left with
     * 13 authored questions against Area D's 42, so control-and-audit revision
     * served risk questions. AREA_OVERRIDES corrects 13 of the 30 legacy
     * questions; these are the ones whose subject is unambiguous.
     */
    const areaOf = (id: string) => getQuestions("SBL").find((q) => q.id === id)?.area
    for (const id of ["SBL3-C-13", "SBL3-C-14", "SBL3-C-16", "SBL3-C-17", "SBL3-C-19"]) {
      expect(areaOf(id), `${id} is a control/audit question`).toBe("F")
    }
    for (const id of ["SBL3-C-22", "SBL3-C-25", "SBL3-C-26"]) {
      expect(areaOf(id), `${id} is fraud/whistleblowing — Area A`).toBe("A")
    }
    // And the genuinely risk-related ones must stay put.
    for (const id of ["SBL3-C-01", "SBL3-C-04", "SBL3-C-08"]) {
      expect(areaOf(id), `${id} is a risk question`).toBe("D")
    }
  })

  it("does not scramble questions authored against the official syllabus", () => {
    // The bulk shift maps legacy E to I. An authored area-E question must survive
    // it, or Area E's bank silently empties into Professional skills.
    for (const q of getQuestions("SBL")) {
      if (/SBL-2[2-6]-check/.test(q.id)) expect(q.area, `${q.id} belongs to Area E`).toBe("E")
      if (/SBL-2[7-9]-check/.test(q.id)) expect(q.area, `${q.id} belongs to Area F`).toBe("F")
    }
  })

  it("preserves ACCA's five professional-skill lenses", () => {
    // Read every Area I chapter, not just the first: Area I becomes a five-chapter
    // tree (one per skill) when it is rebuilt, and `find` would then check only
    // the Communication chapter and pass while four skills went missing.
    const professional = chaptersForPaper("SBL").filter((item) => item.area === "I")
    expect(professional.length).toBeGreaterThan(0)
    const text = JSON.stringify(professional).toLowerCase()
    for (const skill of ["communication", "commercial", "analysis", "scepticism", "evaluation"]) expect(text).toContain(skill)
  })
})
