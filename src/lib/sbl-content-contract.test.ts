import { describe, expect, it } from "vitest"
import { getQuestions, getPracticeInventory } from "@/lib/acca"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { chaptersForPaper } from "@/lib/acca-study-content"
import { SBL_AREA_CHAPTERS, SBL_CONTENT_TARGET } from "@/lib/sbl-content-contract"

describe("SBL complete learning inventory and real exam structure", () => {
  it("keeps the current integrated-case format", () => {
    const blueprint = examBlueprint("SBL")
    expect(blueprint?.durationMin).toBe(195)
    expect(blueprint?.sections).toHaveLength(1)
    expect(blueprint?.sections[0].marks).toBe(100)
    expect(blueprint?.sections[0].makeup).toContain("3 compulsory tasks")
    expect(blueprint?.providedInExam).toContain("two weeks")
  })

  it("serves the complete study inventory without calling objective drills exam sections", () => {
    // SBL's objective items are LEARNING material — its real exam has none. The
    // inventory is sized on authored questions plus derived drills together; the
    // graded bank itself must stay drill-free.
    expect(getPracticeInventory("SBL")).toHaveLength(SBL_CONTENT_TARGET.learningDrills)
    expect(getQuestions("SBL").some((item) => item.recall)).toBe(false)
    expect(getFlashcards("SBL")).toHaveLength(SBL_CONTENT_TARGET.flashcards)
    expect(getWrittenQuestions("SBL")).toHaveLength(SBL_CONTENT_TARGET.writtenCases)
    expect(new Set(getWrittenQuestions("SBL").map((item) => item.area))).toEqual(new Set(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]))
  })

  it("holds the rebuilt tree's depth", () => {
    /*
     * SBL carried ~9,900 words across the entire syllabus before August 2026 —
     * one chapter per area, seven of the ten being relabelled slices of five
     * legacy chapters. These floors stop that regressing, and they are minimums
     * rather than goals.
     */
    const chapters = chaptersForPaper("SBL")
    const sections = chapters.reduce((n, c) => n + c.sections.length, 0)
    const words = JSON.stringify(chapters.map((c) => c.sections)).split(/\s+/).length

    expect(chapters.length, "chapters").toBeGreaterThanOrEqual(SBL_CONTENT_TARGET.chapters)
    expect(sections, "sections").toBeGreaterThanOrEqual(SBL_CONTENT_TARGET.sections)
    expect(words, "words of section prose").toBeGreaterThanOrEqual(SBL_CONTENT_TARGET.words)
  })

  it("gives every syllabus area the chapters its outcomes need", () => {
    // Per-area, not just in total: a paper can hit a chapter count while leaving
    // one area on a single chapter, which is the defect the rebuild removed.
    for (const [area, expected] of Object.entries(SBL_AREA_CHAPTERS)) {
      const count = chaptersForPaper("SBL").filter((c) => c.area === area).length
      expect(count, `area ${area} chapters`).toBeGreaterThanOrEqual(expected)
    }
  })

  it("records that SBL's real exam sets no objective tests", () => {
    /*
     * The one fact that most changes how SBL content should be judged, and the
     * reason its objective items are labelled learning material rather than exam
     * practice. Held in the contract so it cannot quietly stop being true — the
     * mirror of acca-written.ts recording that BT, MA, FA and LW carry no written
     * questions by design.
     */
    expect(SBL_CONTENT_TARGET.objectiveTestsInRealExam).toBe(0)
    expect(SBL_CONTENT_TARGET.technicalMarks + SBL_CONTENT_TARGET.professionalSkillsMarks).toBe(100)
    expect(examBlueprint("SBL")?.sections[0].makeup).toContain(`${SBL_CONTENT_TARGET.tasks} compulsory tasks`)
  })
})
