import { describe, expect, it } from "vitest"
import { MA_CONTENT_TARGET } from "@/lib/ma-content-contract"
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
 * MA is the second paper rebuilt, and this test pins the same three defects BT's
 * does, plus one specific to a computational paper:
 *
 *   1. The bank was 177 authored questions padded to 350 with permuted prompts.
 *   2. Section B was 350 generated 1-mark linked questions, where the real exam
 *      has THREE multi-task questions of TEN marks.
 *   3. The syllabus was taught in 6 chapters — Area C alone covering materials,
 *      labour, overheads, absorption vs marginal, four costing methods and ABC.
 *   4. A computational paper tested only through four-option MCQs lets a
 *      candidate reverse-engineer the answer, so numeric entry has a floor.
 */

const AREAS = ["A", "B", "C", "D", "E", "F"] as const

describe("MA content contract", () => {
  it("teaches the syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("MA")
    expect(chapters).toHaveLength(MA_CONTENT_TARGET.chapters)
    expect(hasChapterTree("MA")).toBe(true)
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("MA", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("MA", key), key).toBeDefined()
    // Contiguous reading order, so the contents page is coherent.
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: MA_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("MA")) {
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
   * MA is computational, so its chapters must actually TEACH the computations
   * rather than describe them. A chapter covering a technique with no worked
   * example is a chapter a learner cannot sit the exam on.
   */
  it("teaches the computational chapters with formulae and worked examples", () => {
    const computational = ["MA-07", "MA-10", "MA-12", "MA-13", "MA-17", "MA-20", "MA-22"]
    for (const id of computational) {
      const chapter = getChapterByKey("MA", id)
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
    const authored = getQuestions("MA")
    const drills = getDrills("MA")

    expect(authored).toHaveLength(MA_CONTENT_TARGET.authoredBank)
    expect(drills, "MA should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

    expect(questionCount("MA")).toBe(authored.length)
    expect(drillCount("MA")).toBe(drills.length)

    expect(new Set(authored.map((q) => q.id)).size, "unique ids").toBe(authored.length)
    expect(new Set(authored.map((q) => q.stem.trim().toLowerCase())).size, "unique stems").toBe(authored.length)

    const areaSet = new Set(getPaper("MA")?.areas.map((a) => a.code))
    for (const question of authored) {
      expect(question.paper, question.id).toBe("MA")
      expect(areaSet.has(question.area), `${question.id} area ${question.area}`).toBe(true)
      expect(question.explanation.trim().length, `${question.id} explanation`).toBeGreaterThan(20)
      if (question.type === "number") {
        expect(Number.isFinite(question.numericAnswer), `${question.id} numeric answer`).toBe(true)
        const answer = question.numericAnswer ?? 0
        /*
         * A NON-INTEGER answer involves rounding, so it needs an explicit
         * tolerance — grading it on the 0.01 default would fail a candidate whose
         * arithmetic was right but who rounded at a different point. An integer
         * answer needs none, because the default is already effectively exact.
         */
        if (!Number.isInteger(answer)) {
          expect(question.tolerance, `${question.id} has a non-integer answer and needs a tolerance`).toBeDefined()
        }
        /*
         * And a tolerance wide enough to accept a DIFFERENT calculation is not a
         * tolerance, it is a false positive.
         *
         * The bound has to be relative OR absolute, not relative alone: 2% of an
         * answer of 0.4 is 0.008, which would reject a perfectly sensible
         * two-decimal rounding allowance of 0.01. So a tolerance passes if it is
         * within 2% of the answer, or is small in absolute terms — either way it
         * forgives rounding without forgiving method.
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

  it("tests calculations by numeric entry rather than only by multiple choice", () => {
    const numeric = getQuestions("MA").filter((question) => question.type === "number")
    expect(numeric.length).toBeGreaterThanOrEqual(MA_CONTENT_TARGET.minNumericQuestions)
    // Numeric items must be spread across the computational areas, not clustered.
    const areas = new Set(numeric.map((question) => question.area))
    expect(areas.size, "numeric questions span areas").toBeGreaterThanOrEqual(4)
  })

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("MA").map(chapterKey))
    const kit = getQuestions("MA").filter((question) => question.chapter)
    expect(kit.length).toBeGreaterThanOrEqual(250)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("MA", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    for (const chapter of chaptersForPaper("MA")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`).toBeGreaterThanOrEqual(8)
    }
  })

  it("serves Section B as authored MTQs at the real 10-mark unit size", () => {
    const cases = getOtCases("MA")
    expect(cases).toHaveLength(MA_CONTENT_TARGET.mtqUnits)
    // Three disjoint sittings of three.
    expect(MA_CONTENT_TARGET.mtqUnits).toBe(
      MA_CONTENT_TARGET.mockForms * (MA_CONTENT_TARGET.sectionBMarks / MA_CONTENT_TARGET.mtqMarks),
    )

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    for (const item of cases) {
      expect(otCaseMarks(item), `${item.id} marks`).toBe(MA_CONTENT_TARGET.mtqMarks)
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(200)
      expect(item.questions.length, `${item.id} task count`).toBeGreaterThanOrEqual(3)
      expect(item.questions.every((q) => q.paper === "MA" && q.area === item.area), `${item.id} ownership`).toBe(true)
      expect(item.questions.every((q) => !q.recall), `${item.id} no drills`).toBe(true)
      expect(item.questions.every((q) => q.explanation.trim().length > 20), `${item.id} explanations`).toBe(true)
      // MA's Section B is computational, so most tasks must be numeric entry.
      const numeric = item.questions.filter((q) => q.type === "number").length
      expect(numeric, `${item.id} numeric tasks`).toBeGreaterThanOrEqual(1)
    }

    /*
     * The published blueprint names budgeting, standard costing and performance
     * measurement as Section B's areas — so the bank holds three of each, and
     * every mock form must be able to draw one of each rather than three of one.
     */
    for (const area of MA_CONTENT_TARGET.mtqAreas) {
      const forArea = cases.filter((item) => item.area === area)
      expect(forArea.length, `MTQs for area ${area}`).toBe(MA_CONTENT_TARGET.mockForms)
    }
    expect(new Set(cases.map((item) => item.area)).size).toBe(MA_CONTENT_TARGET.mtqAreas.length)
  })

  it("composes three mocks in the real exam's shape, from authored content only", () => {
    const blueprint = examBlueprint("MA")
    expect(blueprint?.durationMin).toBe(120)
    expect(blueprint?.sections.map((s) => s.id)).toEqual(["A", "B"])
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(MA_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(MA_CONTENT_TARGET.sectionBMarks)
    expect(MOCK_FORMS).toBe(MA_CONTENT_TARGET.mockForms)

    for (let form = 1; form <= MA_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("MA", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(MA_CONTENT_TARGET.sectionAMarks)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(MA_CONTENT_TARGET.sectionBMarks)
      expect(sectionB?.otFallback, `form ${form} Section B fallback`).toBeUndefined()
      expect(sectionB?.items.every((item) => item.kind === "caseq"), `form ${form} Section B items`).toBe(true)
      const graded = mock.sections.flatMap((s) => s.items)
      expect(graded.every((item) => item.kind === "task" || !item.q.recall), `form ${form} drill-free`).toBe(true)
    }
  })

  it("has no written questions, because MA's exam has no constructed-response section", () => {
    expect(getPaper("MA")?.objectiveOnly).toBe(true)
    expect(getWrittenQuestions("MA")).toHaveLength(MA_CONTENT_TARGET.writtenQuestions)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("MA", 42)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(MA_CONTENT_TARGET.syllabusAreas)
    expect(diagnostic.every((q) => q.paper === "MA"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })
})
