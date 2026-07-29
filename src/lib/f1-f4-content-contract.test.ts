import { describe, expect, it } from "vitest"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { F1_F4_CONTENT_TARGET, F1_F4_PAPERS } from "@/lib/f1-f4-content-contract"
import { MIXED_BANK_SIZES } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getPaper } from "@/lib/acca"
import { getQuestions, getPracticeInventory } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { buildCbeMock } from "@/lib/acca-cbe-mock"

/*
 * BT has outgrown this shared contract and has its own — see
 * bt-content-contract.ts and its test. It holds 454 authored questions with no
 * derived drills, and 18 Section B MTQs at the real 4-mark unit size rather than
 * 350 generated 1-mark linked questions. The inventory assertions below therefore
 * cover the three papers still sized against the shared target.
 */
const SHARED_INVENTORY_PAPERS = F1_F4_PAPERS.filter((paper) => paper !== "BT")

describe("F1–F4 product structure", () => {
  it("has Section A and B only, never Section C", () => {
    for (const paper of F1_F4_PAPERS) {
      expect(examBlueprint(paper)?.sections.map((section) => section.id)).toEqual(["A", "B"])
    }
    expect(F1_F4_CONTENT_TARGET.sectionC).toBe(0)
  })

  it("offers the approved mixed banks and at least three distinct mock forms", () => {
    expect(MIXED_BANK_SIZES).toEqual([10, 20, 30])
    expect(MOCK_FORMS).toBeGreaterThanOrEqual(F1_F4_CONTENT_TARGET.mockForms)
  })

  it("serves exactly 120 traceable, unique flashcards for every F1–F4 paper", () => {
    for (const paperId of F1_F4_PAPERS) {
      const cards = getFlashcards(paperId)
      const areas = new Set(getPaper(paperId)?.areas.map((area) => area.code))
      expect(cards, paperId).toHaveLength(F1_F4_CONTENT_TARGET.flashcards)
      expect(new Set(cards.map((card) => card.id)).size, `${paperId} IDs`).toBe(cards.length)
      expect(cards.every((card) => card.paper === paperId && areas.has(card.area)), `${paperId} ownership`).toBe(true)
      expect(cards.every((card) => card.front.trim() && card.back.trim()), `${paperId} content`).toBe(true)
    }
  })

  /*
   * Sized on the paper's whole inventory — authored questions plus derived recall
   * drills — with a separate, stricter assertion that the GRADED bank is
   * drill-free. Before the two were separated this test read 350 for every paper
   * and could not tell the difference between 350 authored questions and 174
   * authored questions padded with 176 permuted glossary prompts.
   */
  it("serves exactly 350 unique, answerable practice items for every F1–F4 paper still on the shared target", () => {
    for (const paperId of SHARED_INVENTORY_PAPERS) {
      const questions = getPracticeInventory(paperId)
      expect(questions, paperId).toHaveLength(F1_F4_CONTENT_TARGET.sectionA)
      expect(getQuestions(paperId).some((question) => question.recall), `${paperId} drill leak`).toBe(false)
      expect(new Set(questions.map((question) => question.id)).size, `${paperId} IDs`).toBe(questions.length)
      expect(new Set(questions.map((question) => question.stem.trim().toLowerCase())).size, `${paperId} stems`).toBe(questions.length)
      expect(questions.every((question) => question.explanation.trim().length > 0), `${paperId} explanations`).toBe(true)
      expect(questions.every((question) => {
        if (question.type === "number") return Number.isFinite(question.numericAnswer)
        if (!question.options || question.options.length < 2) return false
        if (typeof question.correct === "number") return question.correct >= 0 && question.correct < question.options.length
        return Array.isArray(question.correct) && question.correct.every((answer) => answer >= 0 && answer < question.options!.length)
      }), `${paperId} answers`).toBe(true)
    }
  })

  it("serves genuine, correctly sized Section B MTQ units for every F1–F4 paper", () => {
    const unitMarks = { MA: 10, FA: 15, LW: 6 } as const
    for (const paperId of SHARED_INVENTORY_PAPERS) {
      const cases = getOtCases(paperId)
      expect(cases.length, `${paperId} authored cases`).toBeGreaterThan(0)
      const linkedQuestions = cases.flatMap((item) => item.questions)
      expect(linkedQuestions.length, `${paperId} linked question inventory`).toBe(F1_F4_CONTENT_TARGET.sectionB)
      expect(new Set(linkedQuestions.map((question) => question.id)).size, `${paperId} linked IDs`).toBe(linkedQuestions.length)
      expect(new Set(linkedQuestions.map((question) => question.stem.trim().toLowerCase())).size, `${paperId} linked stems`).toBe(linkedQuestions.length)
      for (const item of cases) {
        expect(otCaseMarks(item), item.id).toBe(unitMarks[paperId])
        expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(80)
        expect(item.questions.every((q) => q.paper === paperId && q.area === item.area), `${item.id} ownership`).toBe(true)
        expect(new Set(item.questions.map((q) => q.id)).size, `${item.id} unique questions`).toBe(item.questions.length)
      }
      const sectionB = buildCbeMock(paperId, 1).sections.find((section) => section.id === "B")
      expect(sectionB, `${paperId} Section B`).toBeDefined()
      expect(sectionB!.items.some((item) => item.kind === "caseq"), `${paperId} linked scenario items`).toBe(true)
    }
  })
})
