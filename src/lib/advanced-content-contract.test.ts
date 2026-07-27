import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { MIXED_BANK_SIZES } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { ADVANCED_CONTENT_TARGET, ADVANCED_PAPERS } from "@/lib/advanced-content-contract"

describe("Strategic Professional full study system", () => {
  it("provides complete advanced learning and constructed-response inventories", () => {
    for (const paper of ADVANCED_PAPERS) {
      expect(getQuestions(paper), `${paper} advanced drills`).toHaveLength(ADVANCED_CONTENT_TARGET.learningDrills)
      expect(getFlashcards(paper), `${paper} flashcards`).toHaveLength(ADVANCED_CONTENT_TARGET.flashcards)
      expect(getWrittenQuestions(paper), `${paper} written cases`).toHaveLength(ADVANCED_CONTENT_TARGET.writtenCases)
      expect(new Set(getQuestions(paper).map((item) => item.id)).size, `${paper} drill IDs`).toBe(ADVANCED_CONTENT_TARGET.learningDrills)
      expect(new Set(getWrittenQuestions(paper).map((item) => item.id)).size, `${paper} written IDs`).toBe(ADVANCED_CONTENT_TARGET.writtenCases)
    }
  })

  it("retains constructed-response exam structures and reusable practice banks", () => {
    for (const paper of ADVANCED_PAPERS) {
      expect(examBlueprint(paper)?.sections.every((section) => section.kind === "constructed"), paper).toBe(true)
      expect(examBlueprint(paper)?.sections.reduce((sum, section) => sum + section.marks, 0), paper).toBe(100)
    }
    expect(MIXED_BANK_SIZES).toEqual(ADVANCED_CONTENT_TARGET.mixedBankSizes)
    expect(MOCK_FORMS).toBeGreaterThanOrEqual(ADVANCED_CONTENT_TARGET.mockForms)
  })
})
