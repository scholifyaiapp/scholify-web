import { describe, expect, it } from "vitest"
import { studyDerivedQuestions } from "@/lib/acca-f1-f4-section-a"
import { completeF1F4SectionB } from "@/lib/acca-f1-f4-section-b"
import { completeStudyFlashcards } from "@/lib/acca-study-flashcards"
import { LW_GLOBAL_CHAPTERS } from "@/lib/acca-study-lw-global"
import { TX_GLOBAL_BRIEFS, TX_GLOBAL_CHAPTERS } from "@/lib/acca-study-tx-global"
import { completeTxGlobalSectionB, completeTxGlobalSectionC } from "@/lib/acca-tx-global-expansion"
import { LW_GLOBAL_BRIEFS } from "@/lib/acca-briefs-lw-global"

describe("separate LW Global and TX international banks", () => {
  it("builds the complete LW Global inventory from all eight Global syllabus areas", () => {
    const derived = studyDerivedQuestions("LW", [], LW_GLOBAL_CHAPTERS, 350)
    const cases = completeF1F4SectionB("LW", [], LW_GLOBAL_CHAPTERS)
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
    expect(cases.flatMap((item) => item.questions)).toHaveLength(350)
    expect(cards).toHaveLength(120)
    expect(LW_GLOBAL_BRIEFS.map((brief) => brief.area)).toEqual(["A", "B", "C", "D", "E", "F", "G", "H"])
    const source = JSON.stringify({ questions, cases, cards })
    expect(source).toContain("CISG")
    expect(source).not.toContain("Companies Act 2006")
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
