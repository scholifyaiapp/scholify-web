import { describe, expect, it } from "vitest"
import { PM_CONTENT_TARGET } from "@/lib/pm-content-contract"
import { getQuestions, getPracticeInventory } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getFlashcards } from "@/lib/acca-flashcards"
import { bankRunTarget, BANK_RUN_SIZE } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { examBlueprint } from "@/lib/acca-exam-structure"

describe("PM/F5 complete content contract", () => {
  it("has the correct A/B/C exam structure", () => {
    expect(examBlueprint("PM")?.sections.map((section) => section.id)).toEqual(["A", "B", "C"])
  })

  it("serves 350 unique and answerable Section A questions", () => {
  /*
   * The inventory contract is sized on everything the paper CONTAINS — authored
   * questions plus derived recall drills. The second assertion is the honest one:
   * the graded bank must hold no drills at all, so a mock or a readiness score can
   * never be padded with permuted glossary prompts.
   */
    const questions = getPracticeInventory("PM")
    expect(questions).toHaveLength(PM_CONTENT_TARGET.sectionA)
    expect(getQuestions("PM").some((q) => q.recall)).toBe(false)
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length)
    expect(new Set(questions.map((question) => question.stem.trim().toLowerCase())).size).toBe(questions.length)
  })

  it("serves 70 complete Section B cases containing 350 linked questions", () => {
    const cases = getOtCases("PM")
    const questions = cases.flatMap((item) => item.questions)
    expect(cases).toHaveLength(PM_CONTENT_TARGET.sectionBCases)
    expect(questions).toHaveLength(PM_CONTENT_TARGET.sectionBQuestions)
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length)
    expect(new Set(questions.map((question) => question.stem.trim().toLowerCase())).size).toBe(questions.length)
    expect(cases.every((item) => otCaseMarks(item) === 10 && item.questions.length === 5)).toBe(true)
  })

  it("serves 50 Section C cases and 150 flashcards", () => {
    const written = getWrittenQuestions("PM")
    const cards = getFlashcards("PM")
    expect(written).toHaveLength(PM_CONTENT_TARGET.sectionC)
    expect(new Set(written.map((item) => item.id)).size).toBe(written.length)
    expect(cards).toHaveLength(PM_CONTENT_TARGET.flashcards)
    expect(new Set(cards.map((item) => item.id)).size).toBe(cards.length)
  })

  it("requires five 30-question mixed banks and keeps three mocks", () => {
    expect(BANK_RUN_SIZE).toBe(PM_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("PM")).toBe(PM_CONTENT_TARGET.mixedBanks)
    expect(MOCK_FORMS).toBe(PM_CONTENT_TARGET.mockForms)
  })
})
