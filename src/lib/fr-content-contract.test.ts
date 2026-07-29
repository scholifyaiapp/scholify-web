import { describe, expect, it } from "vitest"
import { FR_CONTENT_TARGET } from "@/lib/fr-content-contract"
import { getQuestions, getPracticeInventory } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getFlashcards } from "@/lib/acca-flashcards"
import { bankRunTarget, BANK_RUN_SIZE } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { examBlueprint } from "@/lib/acca-exam-structure"

describe("FR/F7 complete content contract", () => {
  it("has the correct A/B/C exam structure", () => {
    expect(examBlueprint("FR")?.sections.map((section) => section.id)).toEqual(["A", "B", "C"])
  })
  it("serves 350 unique Section A questions", () => {
  /*
   * The inventory contract is sized on everything the paper CONTAINS — authored
   * questions plus derived recall drills. The second assertion is the honest one:
   * the graded bank must hold no drills at all, so a mock or a readiness score can
   * never be padded with permuted glossary prompts.
   */
    const questions = getPracticeInventory("FR")
    expect(questions).toHaveLength(FR_CONTENT_TARGET.sectionA)
    expect(getQuestions("FR").some((q) => q.recall)).toBe(false)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    expect(new Set(questions.map((q) => q.stem.trim().toLowerCase())).size).toBe(questions.length)
  })
  it("serves 70 Section B cases containing 350 linked questions", () => {
    const cases = getOtCases("FR")
    const questions = cases.flatMap((item) => item.questions)
    expect(cases).toHaveLength(FR_CONTENT_TARGET.sectionBCases)
    expect(questions).toHaveLength(FR_CONTENT_TARGET.sectionBQuestions)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    expect(new Set(questions.map((q) => q.stem.trim().toLowerCase())).size).toBe(questions.length)
    expect(cases.every((item) => item.questions.length === 5 && otCaseMarks(item) === 10)).toBe(true)
  })
  it("serves 50 Section C cases and 150 flashcards", () => {
    expect(getWrittenQuestions("FR")).toHaveLength(FR_CONTENT_TARGET.sectionC)
    expect(getFlashcards("FR")).toHaveLength(FR_CONTENT_TARGET.flashcards)
  })
  it("requires five 30-question mixed banks and three mocks", () => {
    expect(BANK_RUN_SIZE).toBe(FR_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("FR")).toBe(FR_CONTENT_TARGET.mixedBanks)
    expect(MOCK_FORMS).toBe(FR_CONTENT_TARGET.mockForms)
  })
})
