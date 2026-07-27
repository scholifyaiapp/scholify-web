import { describe, expect, it } from "vitest"
import { getQuestions } from "@/lib/acca"
import { getFlashcards } from "@/lib/acca-flashcards"
import { getWrittenQuestions } from "@/lib/acca-written"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { SBL_CONTENT_TARGET } from "@/lib/sbl-content-contract"

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
    expect(getQuestions("SBL")).toHaveLength(SBL_CONTENT_TARGET.learningDrills)
    expect(getFlashcards("SBL")).toHaveLength(SBL_CONTENT_TARGET.flashcards)
    expect(getWrittenQuestions("SBL")).toHaveLength(SBL_CONTENT_TARGET.writtenCases)
    expect(new Set(getWrittenQuestions("SBL").map((item) => item.area))).toEqual(new Set(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]))
  })
})
