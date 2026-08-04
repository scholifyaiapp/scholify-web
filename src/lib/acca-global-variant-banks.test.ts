import { describe, expect, it } from "vitest"
import { studyDerivedQuestions } from "@/lib/acca-f1-f4-section-a"
import { CASES_LW_GLOBAL } from "@/lib/acca-cases-lw-global"
import { CASES_LW_ENG } from "@/lib/acca-cases-lw-eng"
import { LW_ENG_CHAPTERS } from "@/lib/acca-study-lw-eng"
import { otCaseMarks } from "@/lib/acca-content"
import { completeStudyFlashcards } from "@/lib/acca-study-flashcards"
import { LW_GLOBAL_CHAPTERS } from "@/lib/acca-study-lw-global"
import { TX_GLOBAL_BRIEFS, TX_GLOBAL_CHAPTERS } from "@/lib/acca-study-tx-global"
import { completeTxGlobalSectionB, completeTxGlobalSectionC } from "@/lib/acca-tx-global-expansion"
import { LW_GLOBAL_BRIEFS } from "@/lib/acca-briefs-lw-global"

describe("separate LW Global and TX international banks", () => {
  it("builds the complete LW Global inventory from all eight Global syllabus areas", () => {
    const derived = studyDerivedQuestions("LW", [], LW_GLOBAL_CHAPTERS, 350)
    const cases = CASES_LW_GLOBAL
    const cards = completeStudyFlashcards("LW", [], LW_GLOBAL_CHAPTERS, 120)
    /*
     * LW-Global is now authored as a chapter TREE — 33 chapters across the eight
     * Global areas — so this can no longer assert one chapter per area. The invariant
     * that actually matters is that the tree COVERS all eight, in a contiguous reading
     * order, and that it is genuinely a tree rather than one chapter apiece.
     */
    expect([...new Set(LW_GLOBAL_CHAPTERS.map((chapter) => chapter.area))].sort())
      .toEqual(["A", "B", "C", "D", "E", "F", "G", "H"])
    expect(LW_GLOBAL_CHAPTERS.length).toBeGreaterThan(8)
    expect(LW_GLOBAL_CHAPTERS.map((chapter) => chapter.number))
      .toEqual(Array.from({ length: LW_GLOBAL_CHAPTERS.length }, (_, i) => i + 1))
    const questions = [...derived.authored, ...derived.drills]
    expect(questions).toHaveLength(350)
    /*
     * LW-Global Section B is now 15 AUTHORED MTQs at the real 6-mark unit size, so
     * this asserts the real exam shape rather than the 350 generated linked questions
     * it replaced. Five units per sitting, three disjoint sittings, 30 marks a form.
     */
    expect(cases).toHaveLength(15)
    expect([...new Set(cases.map(otCaseMarks))]).toEqual([6])
    expect(cases.flatMap((item) => item.questions)).toHaveLength(45)
    expect(cards).toHaveLength(120)
    expect(LW_GLOBAL_BRIEFS.map((brief) => brief.area)).toEqual(["A", "B", "C", "D", "E", "F", "G", "H"])
    const source = JSON.stringify({ questions, cases, cards })
    expect(source).toContain("CISG")
    expect(source).not.toContain("Companies Act 2006")
  })

  /*
   * The mirror image of the assertion above, and the invariant that actually protects
   * the two LW variants from drifting into each other. Global must not teach UK statute
   * and ENG must not teach the CISG — an ENG learner who met Incoterms, or a Global
   * learner who met the Companies Act, would be studying an area that is not on their
   * exam while missing one that is.
   */
  it("keeps the LW ENG tree and bank free of Global-only material", () => {
    expect([...new Set(LW_ENG_CHAPTERS.map((chapter) => chapter.area))].sort())
      .toEqual(["A", "B", "C", "D", "E", "F", "G", "H"])
    expect(LW_ENG_CHAPTERS.map((chapter) => chapter.number))
      .toEqual(Array.from({ length: LW_ENG_CHAPTERS.length }, (_, i) => i + 1))
    expect(CASES_LW_ENG).toHaveLength(15)
    expect([...new Set(CASES_LW_ENG.map(otCaseMarks))]).toEqual([6])
    expect(CASES_LW_ENG.flatMap((item) => item.questions)).toHaveLength(45)

    const source = JSON.stringify({ chapters: LW_ENG_CHAPTERS, cases: CASES_LW_ENG })
    expect(source).toContain("Companies Act 2006")
    expect(source).not.toContain("CISG")
    expect(source).not.toContain("Incoterms")

    // The two variants' chapter ids must not collide, since ids are progress keys.
    const engIds = new Set(LW_ENG_CHAPTERS.map((chapter) => chapter.id))
    expect(LW_GLOBAL_CHAPTERS.some((chapter) => engIds.has(chapter.id))).toBe(false)
  })

  it("builds a complete jurisdiction-neutral TX foundation inventory", () => {
    const derived = studyDerivedQuestions("TX", [], TX_GLOBAL_CHAPTERS, 350)
    const cases = completeTxGlobalSectionB()
    const written = completeTxGlobalSectionC()
    const cards = completeStudyFlashcards("TX", [], TX_GLOBAL_CHAPTERS, 150)
    const questions = [...derived.authored, ...derived.drills]
    expect(questions).toHaveLength(350)
    expect(cases).toHaveLength(70)
    expect(cases.flatMap((item) => item.questions)).toHaveLength(350)
    expect(written).toHaveLength(50)
    expect(cards).toHaveLength(150)
    expect(TX_GLOBAL_BRIEFS.map((brief) => brief.area)).toEqual(["A", "B", "C", "D", "E", "F", "G"])
    const source = JSON.stringify({ questions, cases, written, cards })
    expect(source).toContain("Jurisdiction Z")
    expect(source).not.toContain("FA2025")
    expect(source).not.toContain("Class 1 NIC")
  })
})
