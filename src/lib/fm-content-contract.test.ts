import { describe, expect, it } from "vitest"
import { FM_CONTENT_TARGET } from "@/lib/fm-content-contract"
import { getQuestions } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getFlashcards } from "@/lib/acca-flashcards"
import { bankRunTarget, BANK_RUN_SIZE } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { examBlueprint } from "@/lib/acca-exam-structure"

describe("FM/F9 complete content contract", () => {
  it("preserves FM's A/B/C exam structure", () => {
    expect(examBlueprint("FM")?.sections.map((section) => section.id)).toEqual(["A", "B", "C"])
  })
  it("serves 350 unique Section A questions", () => {
    const questions = getQuestions("FM")
    expect(questions).toHaveLength(FM_CONTENT_TARGET.sectionA)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    expect(new Set(questions.map((q) => q.stem.trim().toLowerCase())).size).toBe(questions.length)
  })
  it("serves 70 Section B cases containing 350 linked questions", () => {
    const cases = getOtCases("FM")
    const questions = cases.flatMap((item) => item.questions)
    expect(cases).toHaveLength(FM_CONTENT_TARGET.sectionBCases)
    expect(questions).toHaveLength(FM_CONTENT_TARGET.sectionBQuestions)
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    expect(new Set(questions.map((q) => q.stem.trim().toLowerCase())).size).toBe(questions.length)
    expect(cases.every((item) => item.questions.length === 5 && otCaseMarks(item) === 10)).toBe(true)
  })
  it("serves 50 Section C cases and 150 flashcards", () => {
    expect(getWrittenQuestions("FM")).toHaveLength(FM_CONTENT_TARGET.sectionC)
    expect(getFlashcards("FM")).toHaveLength(FM_CONTENT_TARGET.flashcards)
  })
  it("requires five 30-question mixed banks and three mocks", () => {
    expect(BANK_RUN_SIZE).toBe(FM_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("FM")).toBe(FM_CONTENT_TARGET.mixedBanks)
    expect(MOCK_FORMS).toBe(FM_CONTENT_TARGET.mockForms)
  })
})
