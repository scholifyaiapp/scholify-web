import { describe, expect, it } from "vitest"
import { FA_CONTENT_TARGET } from "@/lib/fa-content-contract"
import { getQuestions, getDrills, getPaper } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { chaptersForPaper, chaptersForArea, chapterKey, getChapterByKey, hasChapterTree } from "@/lib/acca-study-content"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import { buildDiagnostic } from "@/lib/acca-diagnostic"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { questionCount, drillCount } from "@/lib/acca-content-counts"

/*
 * FA is the third paper rebuilt, and this test pins the same defects BT's and MA's
 * do, plus two specific to FA:
 *
 *   1. The bank was 181 authored questions padded to 350 with permuted prompts.
 *   2. Section B was 350 generated linked questions, where the real exam has TWO
 *      multi-task questions of FIFTEEN marks.
 *   3. The syllabus was taught in 9 chapters — Area D alone covering sales tax,
 *      inventory, non-current assets, depreciation, intangibles, the four accruals
 *      adjustments, receivables, provisions and share capital.
 *   4. Those generated Section B cases were all INTERPRETATION, and the exam
 *      blueprint label agreed with them. The real blueprint names consolidations and
 *      accounts preparation, so both the cases and the label were wrong.
 *   5. FA's Section A is uniformly 2 marks a question, so any other mark value in
 *      the bank is unexaminable and breaks the 70-mark section.
 */

const AREAS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const

describe("FA content contract", () => {
  it("teaches the syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("FA")
    expect(chapters).toHaveLength(FA_CONTENT_TARGET.chapters)
    expect(hasChapterTree("FA")).toBe(true)
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("FA", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("FA", key), key).toBeDefined()
    // Contiguous reading order, so the contents page is coherent.
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: FA_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
    // Area D is the largest group in the FA syllabus and the one the old
    // single-chapter treatment served worst.
    expect(chaptersForArea("FA", "D").length, "Area D chapters").toBeGreaterThanOrEqual(10)
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("FA")) {
      const where = chapterKey(chapter)
      expect(chapter.syllabusRefs?.length, `${where} syllabus refs`).toBeGreaterThan(0)
      expect(chapter.outcomes.length, `${where} outcomes`).toBeGreaterThanOrEqual(3)
      expect(chapter.sections.length, `${where} sections`).toBeGreaterThanOrEqual(2)
      expect(chapter.examTraps.length, `${where} traps`).toBeGreaterThanOrEqual(3)
      expect(chapter.keyTerms.length, `${where} key terms`).toBeGreaterThanOrEqual(3)
      expect(chapter.summary.length, `${where} summary`).toBeGreaterThanOrEqual(4)
      expect(chapter.knowledgeDiagnostic?.length, `${where} knowledge diagnostic`).toBeGreaterThanOrEqual(4)
      expect(chapter.examTraps.every((t) => t.trap.trim() && t.fix.trim()), `${where} trap/fix`).toBe(true)
      expect(chapter.keyTerms.every((t) => t.term.trim() && t.def.trim()), `${where} term/def`).toBe(true)
      expect(chapter.sections.some((s) => s.check), `${where} has an inline check`).toBe(true)
      expect(chapter.minutes, `${where} minutes`).toBeGreaterThanOrEqual(10)
      expect(chapter.minutes, `${where} minutes`).toBeLessThanOrEqual(20)
    }
  })

  /*
   * FA is a RECORDING paper: almost every mark from Area C onward is earned by
   * putting a figure in the right place with the right sign. So the computational
   * chapters must actually WORK the computation rather than describe it — a chapter
   * on depreciation or consolidation with no worked example is one a learner cannot
   * sit the exam on.
   */
  it("teaches the computational chapters with formulae and worked examples", () => {
    const computational = [
      "FA-07", "FA-09", "FA-11", "FA-13", "FA-14", "FA-15",
      "FA-16", "FA-17", "FA-19", "FA-20", "FA-24", "FA-26", "FA-27", "FA-28", "FA-30",
    ]
    for (const id of computational) {
      const chapter = getChapterByKey("FA", id)
      expect(chapter, id).toBeDefined()
      const blocks = chapter!.sections.flatMap((s) => s.blocks)
      expect(blocks.some((b) => b.kind === "formula"), `${id} has a formula block`).toBe(true)
      expect(blocks.filter((b) => b.kind === "example").length, `${id} worked examples`).toBeGreaterThanOrEqual(1)
      // A worked example must show its working, not just assert a result.
      for (const block of blocks) {
        if (block.kind !== "example") continue
        expect(block.steps.length, `${id} example "${block.title}" steps`).toBeGreaterThanOrEqual(3)
        expect(block.result.trim().length, `${id} example "${block.title}" result`).toBeGreaterThan(40)
      }
    }
  })

  it("serves an authored bank with no derived filler at all", () => {
    const authored = getQuestions("FA")
    const drills = getDrills("FA")

    expect(authored).toHaveLength(FA_CONTENT_TARGET.authoredBank)
    expect(drills, "FA should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

    expect(questionCount("FA")).toBe(authored.length)
    expect(drillCount("FA")).toBe(drills.length)

    expect(new Set(authored.map((q) => q.id)).size, "unique ids").toBe(authored.length)
    expect(new Set(authored.map((q) => q.stem.trim().toLowerCase())).size, "unique stems").toBe(authored.length)

    const areaSet = new Set(getPaper("FA")?.areas.map((a) => a.code))
    for (const question of authored) {
      expect(question.paper, question.id).toBe("FA")
      expect(areaSet.has(question.area), `${question.id} area ${question.area}`).toBe(true)
      expect(question.explanation.trim().length, `${question.id} explanation`).toBeGreaterThan(20)
      if (question.type === "number") {
        expect(Number.isFinite(question.numericAnswer), `${question.id} numeric answer`).toBe(true)
        const answer = question.numericAnswer ?? 0
        /*
         * A NON-INTEGER answer involves rounding, so it needs an explicit tolerance
         * — grading it on the 0.01 default would fail a candidate whose arithmetic
         * was right but who rounded at a different point.
         */
        if (!Number.isInteger(answer)) {
          expect(question.tolerance, `${question.id} has a non-integer answer and needs a tolerance`).toBeDefined()
        }
        /*
         * And a tolerance wide enough to accept a DIFFERENT calculation is not a
         * tolerance, it is a false positive. The bound is relative OR absolute, so
         * it forgives rounding without forgiving method.
         */
        if (question.tolerance != null && Math.abs(answer) > 0) {
          const relative = question.tolerance / Math.abs(answer)
          const acceptable = relative <= 0.02 || question.tolerance <= 0.01
          expect(
            acceptable,
            `${question.id} tolerance ${question.tolerance} is too wide for an answer of ${answer} (${(relative * 100).toFixed(1)}%)`,
          ).toBe(true)
        }
      } else {
        const options = question.options ?? []
        expect(options.length, question.id).toBeGreaterThanOrEqual(2)
        expect(new Set(options.map((o) => o.trim().toLowerCase())).size, `${question.id} distinct options`).toBe(options.length)
        if (typeof question.correct === "number") {
          expect(question.correct, question.id).toBeGreaterThanOrEqual(0)
          expect(question.correct, question.id).toBeLessThan(options.length)
        } else {
          expect(Array.isArray(question.correct), question.id).toBe(true)
          expect((question.correct as number[]).length, `${question.id} multi answers`).toBeGreaterThan(0)
          for (const index of question.correct as number[]) {
            expect(index, question.id).toBeGreaterThanOrEqual(0)
            expect(index, question.id).toBeLessThan(options.length)
          }
        }
      }
    }
  })

  /*
   * FA's real Section A is thirty-five questions of exactly two marks. A 1-mark or
   * 3-mark standalone item is unexaminable, and it would stop the mock composer
   * reaching exactly 70 marks — which is why the kit builders fix the value.
   */
  it("prices every standalone question at the real Section A unit of two marks", () => {
    for (const question of getQuestions("FA")) {
      expect(question.marks, `${question.id} marks`).toBe(FA_CONTENT_TARGET.sectionAMarksPerQuestion)
    }
  })

  it("tests calculations by numeric entry rather than only by multiple choice", () => {
    const numeric = getQuestions("FA").filter((question) => question.type === "number")
    expect(numeric.length).toBeGreaterThanOrEqual(FA_CONTENT_TARGET.minNumericQuestions)
    // Numeric items must be spread across the computational areas, not clustered.
    const areas = new Set(numeric.map((question) => question.area))
    expect(areas.size, "numeric questions span areas").toBeGreaterThanOrEqual(5)
  })

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("FA").map(chapterKey))
    const kit = getQuestions("FA").filter((question) => question.chapter)
    expect(kit.length).toBeGreaterThanOrEqual(300)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("FA", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    for (const chapter of chaptersForPaper("FA")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`).toBeGreaterThanOrEqual(8)
    }
  })

  it("serves Section B as authored MTQs at the real 15-mark unit size", () => {
    const cases = getOtCases("FA")
    expect(cases).toHaveLength(FA_CONTENT_TARGET.mtqUnits)
    // Three disjoint sittings of two.
    expect(FA_CONTENT_TARGET.mtqUnits).toBe(
      FA_CONTENT_TARGET.mockForms * (FA_CONTENT_TARGET.sectionBMarks / FA_CONTENT_TARGET.mtqMarks),
    )

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    for (const item of cases) {
      expect(otCaseMarks(item), `${item.id} marks`).toBe(FA_CONTENT_TARGET.mtqMarks)
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(200)
      expect(item.questions.length, `${item.id} task count`).toBeGreaterThanOrEqual(3)
      expect(item.questions.every((q) => q.paper === "FA" && q.area === item.area), `${item.id} ownership`).toBe(true)
      expect(item.questions.every((q) => !q.recall), `${item.id} no drills`).toBe(true)
      expect(item.questions.every((q) => q.explanation.trim().length > 20), `${item.id} explanations`).toBe(true)
      // FA's Section B is computational, so most tasks must be numeric entry.
      const numeric = item.questions.filter((q) => q.type === "number").length
      expect(numeric, `${item.id} numeric tasks`).toBeGreaterThanOrEqual(3)
    }

    /*
     * The published blueprint names consolidations and accounts preparation as
     * Section B's areas — NOT interpretation, which the generated cases this bank
     * replaced were entirely made of. So the bank holds three of each.
     */
    for (const area of FA_CONTENT_TARGET.mtqAreas) {
      const forArea = cases.filter((item) => item.area === area)
      expect(forArea.length, `MTQs for area ${area}`).toBe(FA_CONTENT_TARGET.mockForms)
    }
    expect(new Set(cases.map((item) => item.area)).size).toBe(FA_CONTENT_TARGET.mtqAreas.length)

    /*
     * And they must ALTERNATE. The mock composer rotates the case list by
     * (form − 1) and fills the section in order, so three G cases followed by three
     * H cases would give form 1 two accounts-preparation MTQs and no consolidation.
     * Alternating guarantees one of each per sitting — which the mock assertions
     * below verify from the other end.
     */
    for (let i = 1; i < cases.length; i++) {
      expect(cases[i].area, `case ${i} alternates with ${i - 1}`).not.toBe(cases[i - 1].area)
    }
  })

  it("composes three mocks in the real exam's shape, from authored content only", () => {
    const blueprint = examBlueprint("FA")
    expect(blueprint?.durationMin).toBe(120)
    expect(blueprint?.sections.map((s) => s.id)).toEqual(["A", "B"])
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(FA_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(FA_CONTENT_TARGET.sectionBMarks)
    expect(MOCK_FORMS).toBe(FA_CONTENT_TARGET.mockForms)

    for (let form = 1; form <= FA_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("FA", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(FA_CONTENT_TARGET.sectionAMarks)
      // 35 questions of 2 marks — the real Section A, exactly.
      expect(sectionA?.items.length, `form ${form} Section A items`).toBe(35)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(FA_CONTENT_TARGET.sectionBMarks)
      expect(sectionB?.otFallback, `form ${form} Section B fallback`).toBeUndefined()
      expect(sectionB?.items.every((item) => item.kind === "caseq"), `form ${form} Section B items`).toBe(true)
      // Every sitting must examine BOTH blueprint areas, one MTQ each.
      const sectionBAreas = new Set(sectionB?.items.map((item) => item.kind === "caseq" ? item.caseRef.area : ""))
      expect([...sectionBAreas].sort(), `form ${form} Section B areas`).toEqual([...FA_CONTENT_TARGET.mtqAreas])
      const graded = mock.sections.flatMap((s) => s.items)
      expect(graded.every((item) => item.kind === "task" || !item.q.recall), `form ${form} drill-free`).toBe(true)
    }
  })

  it("has no written questions, because FA's exam has no constructed-response section", () => {
    expect(getPaper("FA")?.objectiveOnly).toBe(true)
    expect(getWrittenQuestions("FA")).toHaveLength(FA_CONTENT_TARGET.writtenQuestions)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("FA", 42)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(FA_CONTENT_TARGET.syllabusAreas)
    expect(diagnostic.every((q) => q.paper === "FA"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })
})
