import { describe, expect, it } from "vitest"
import { AA_CONTENT_TARGET } from "@/lib/aa-content-contract"
import { getQuestions, getPracticeInventory } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getFlashcards } from "@/lib/acca-flashcards"
import { bankRunTarget, BANK_RUN_SIZE } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { examBlueprint } from "@/lib/acca-exam-structure"

describe("AA/F8 complete content contract", () => {
  it("preserves AA's real two-section exam structure", () => {
    expect(examBlueprint("AA")?.sections.map((section) => section.id)).toEqual(["A", "B"])
  })
  it("serves 350 unique objective questions", () => {
  /*
   * The inventory contract is sized on everything the paper CONTAINS — authored
   * questions plus derived recall drills. The second assertion is the honest one:
   * the graded bank must hold no drills at all, so a mock or a readiness score can
   * never be padded with permuted glossary prompts.
   */
    const questions = getPracticeInventory("AA")
    expect(questions).toHaveLength(AA_CONTENT_TARGET.objectiveBank)
    expect(getQuestions("AA").some((q) => q.recall)).toBe(false)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    expect(new Set(questions.map((q) => q.stem.trim().toLowerCase())).size).toBe(questions.length)
  })
  it("serves 70 Section A cases containing 350 linked questions", () => {
    const cases = getOtCases("AA")
    const questions = cases.flatMap((item) => item.questions)
    expect(cases).toHaveLength(AA_CONTENT_TARGET.sectionACases)
    expect(questions).toHaveLength(AA_CONTENT_TARGET.sectionAQuestions)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    expect(new Set(questions.map((q) => q.stem.trim().toLowerCase())).size).toBe(questions.length)
    expect(cases.every((item) => item.questions.length === 5 && otCaseMarks(item) === 10)).toBe(true)
  })
  it("serves 50 Section B constructed cases and 150 flashcards", () => {
    expect(getWrittenQuestions("AA")).toHaveLength(AA_CONTENT_TARGET.sectionBConstructed)
    expect(getFlashcards("AA")).toHaveLength(AA_CONTENT_TARGET.flashcards)
  })
  it("requires five 30-question mixed banks and three mocks", () => {
    expect(BANK_RUN_SIZE).toBe(AA_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("AA")).toBe(AA_CONTENT_TARGET.mixedBanks)
    expect(MOCK_FORMS).toBe(AA_CONTENT_TARGET.mockForms)
  })
})
