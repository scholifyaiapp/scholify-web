import { describe, expect, it } from "vitest"
import { PM_CONTENT_TARGET } from "@/lib/pm-content-contract"
import { getQuestions, getDrills, getPaper } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getFlashcards } from "@/lib/acca-flashcards"
import { chaptersForPaper, chaptersForArea, chapterKey, getChapterByKey, hasChapterTree } from "@/lib/acca-study-content"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import { buildDiagnostic } from "@/lib/acca-diagnostic"
import { bankRunTarget, BANK_RUN_SIZE } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"

/*
 * PM is the sixth paper rebuilt, after BT, MA, FA, LW-Global and LW-ENG. This test pins
 * the defects it had — and PM's were the worst of the six on the study side:
 *
 *   1. FOUR area-chapters for a FIVE-area syllabus, so Area E — performance measurement
 *      and control, which supplies all 40 of Section C's marks — had no chapter AT ALL.
 *      Area C alone covers relevant costing, CVP for one product and for many, limiting
 *      factors, linear programming, pricing, make-or-buy and risk; that was one chapter
 *      and is now nine.
 *   2. The bank was 244 authored questions carrying no `chapter`, tagged against the old
 *      four-area structure, topped up with 106 machine-derived recall drills to reach a
 *      350 "Section A" target. PM's real Section A is 15 questions.
 *   3. Section B was 70 GENERATED cases built by completePmSectionB — 23 sittings' worth
 *      of a paper that examines three, from a template with substituted names and numbers.
 *   4. Section C was 50 questions of 9 and 10 marks. PM's Section C is 20 marks a
 *      question, and there is no 10-mark constructed response anywhere in the paper.
 *
 * Unlike LW, PM has no variants, so there is no setPaperVariant/reloadPaperContent dance
 * here — the Node bootstrap fills the registry for PM directly.
 */

const AREAS = ["A", "B", "C", "D", "E"] as const

describe("PM content contract", () => {
  it("teaches the syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("PM")
    expect(chapters).toHaveLength(PM_CONTENT_TARGET.chapters)
    expect(hasChapterTree("PM")).toBe(true)
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("PM", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("PM", key), key).toBeDefined()
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: PM_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
    /*
     * The defect that mattered most. Area E had NO chapter at all, and Areas C and D
     * carry the paper — between them they supply most of Section B and all of Section C.
     */
    expect(chaptersForArea("PM", "E").length, "Area E chapters").toBeGreaterThanOrEqual(5)
    expect(chaptersForArea("PM", "C").length, "Area C chapters").toBeGreaterThanOrEqual(9)
    expect(chaptersForArea("PM", "D").length, "Area D chapters").toBeGreaterThanOrEqual(9)
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("PM")) {
      const where = chapterKey(chapter)
      expect(chapter.syllabusRefs?.length, `${where} syllabus refs`).toBeGreaterThan(0)
      expect(chapter.outcomes.length, `${where} outcomes`).toBeGreaterThanOrEqual(3)
      expect(chapter.sections.length, `${where} sections`).toBeGreaterThanOrEqual(1)
      expect(chapter.examTraps.length, `${where} traps`).toBeGreaterThanOrEqual(3)
      expect(chapter.keyTerms.length, `${where} key terms`).toBeGreaterThanOrEqual(3)
      expect(chapter.summary.length, `${where} summary`).toBeGreaterThanOrEqual(4)
      expect(chapter.knowledgeDiagnostic?.length, `${where} knowledge diagnostic`).toBeGreaterThanOrEqual(4)
      expect(chapter.examTraps.every((t) => t.trap.trim() && t.fix.trim()), `${where} trap/fix`).toBe(true)
      expect(chapter.keyTerms.every((t) => t.term.trim() && t.def.trim()), `${where} term/def`).toBe(true)
      expect(chapter.sections.every((s) => s.check), `${where} every section has a check`).toBe(true)
      expect(chapter.minutes, `${where} minutes`).toBeGreaterThanOrEqual(10)
      expect(chapter.minutes, `${where} minutes`).toBeLessThanOrEqual(20)
    }
  })

  /*
   * PM is a computational paper, so every chapter must WORK a scenario end to end —
   * identify the technique, apply it to the numbers, state what the answer means. A
   * chapter that explains a technique without demonstrating it does not prepare a
   * candidate for Section C, which is 40 of the 100 marks.
   */
  it("works a scenario in every chapter, since the skill is applying a technique", () => {
    for (const chapter of chaptersForPaper("PM")) {
      const id = chapterKey(chapter)
      const blocks = chapter.sections.flatMap((s) => s.blocks)
      const examples = blocks.filter((b) => b.kind === "example")
      expect(examples.length, `${id} worked examples`).toBeGreaterThanOrEqual(1)
      for (const block of blocks) {
        if (block.kind !== "example") continue
        expect(block.steps.length, `${id} example "${block.title}" steps`).toBeGreaterThanOrEqual(3)
        expect(block.result.trim().length, `${id} example "${block.title}" result`).toBeGreaterThan(40)
      }
    }
  })

  it("serves an authored bank with no derived filler at all", () => {
    const authored = getQuestions("PM")
    const drills = getDrills("PM")

    expect(authored).toHaveLength(PM_CONTENT_TARGET.authoredBank)
    expect(drills, "PM should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

    expect(new Set(authored.map((q) => q.id)).size, "unique ids").toBe(authored.length)
    expect(new Set(authored.map((q) => q.stem.trim().toLowerCase())).size, "unique stems").toBe(authored.length)

    const areaSet = new Set(getPaper("PM")?.areas.map((a) => a.code))
    for (const question of authored) {
      expect(question.paper, question.id).toBe("PM")
      expect(areaSet.has(question.area), `${question.id} area ${question.area}`).toBe(true)
      expect(question.explanation.trim().length, `${question.id} explanation`).toBeGreaterThan(20)
      // Every objective question in PM is worth 2 marks, in Section A and Section B alike.
      expect(question.marks, `${question.id} marks`).toBe(PM_CONTENT_TARGET.marksPerQuestion)
      if (question.type === "number") {
        expect(typeof question.numericAnswer, `${question.id} numeric answer`).toBe("number")
        expect(question.tolerance, `${question.id} tolerance`).toBeGreaterThan(0)
        continue
      }
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
  })

  /*
   * The counterpart of LW's "no numeric entry" assertion. PM is the most computational of
   * the Applied Skills objective papers, so a bank of four-option MCQs would be materially
   * easier than the exam — a candidate can work backwards from the options.
   */
  it("uses numeric entry across the computational areas, not just multiple choice", () => {
    const numeric = getQuestions("PM").filter((question) => question.type === "number")
    expect(numeric.length, "numeric-entry questions").toBeGreaterThanOrEqual(PM_CONTENT_TARGET.minNumericQuestions)

    const numericAreas = new Set(numeric.map((q) => q.area))
    for (const area of PM_CONTENT_TARGET.numericAreas) {
      expect(numericAreas.has(area), `numeric entry in area ${area}`).toBe(true)
    }
    // Area A is discursive: a numeric-entry question on information systems would be invented.
    expect(numeric.some((q) => q.area === "A"), "no invented calculation in Area A").toBe(false)
  })

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("PM").map(chapterKey))
    const kit = getQuestions("PM").filter((question) => question.chapter)
    expect(kit.length).toBeGreaterThanOrEqual(PM_CONTENT_TARGET.kitQuestions)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("PM", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    /*
     * Every chapter must be examined. A bank can satisfy its headline total while leaving
     * whole chapters untested, which is the failure mode a per-chapter kit prevents.
     */
    for (const chapter of chaptersForPaper("PM")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`)
        .toBeGreaterThanOrEqual(PM_CONTENT_TARGET.minQuestionsPerChapter)
    }
  })

  it("serves Section B as authored OT cases at the real 10-mark unit size", () => {
    const cases = getOtCases("PM")
    expect(cases).toHaveLength(PM_CONTENT_TARGET.otCases)
    // Three disjoint sittings of three.
    expect(PM_CONTENT_TARGET.otCases).toBe(PM_CONTENT_TARGET.mockForms * PM_CONTENT_TARGET.sectionBCases)
    // And the composition must add up to the section's marks.
    expect(PM_CONTENT_TARGET.sectionBCases * PM_CONTENT_TARGET.otCaseMarks).toBe(PM_CONTENT_TARGET.sectionBMarks)
    expect(
      PM_CONTENT_TARGET.sectionBQuestionsPerCase * PM_CONTENT_TARGET.marksPerQuestion,
    ).toBe(PM_CONTENT_TARGET.otCaseMarks)

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    const areaSet = new Set(getPaper("PM")?.areas.map((a) => a.code))
    for (const item of cases) {
      expect(otCaseMarks(item), `${item.id} marks`).toBe(PM_CONTENT_TARGET.otCaseMarks)
      expect(item.questions.length, `${item.id} task count`).toBe(PM_CONTENT_TARGET.sectionBQuestionsPerCase)
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(400)
      expect(item.questions.every((q) => q.paper === "PM" && q.area === item.area), `${item.id} ownership`).toBe(true)
      expect(areaSet.has(item.area), `${item.id} area ${item.area}`).toBe(true)
      expect(item.questions.every((q) => !q.recall), `${item.id} no drills`).toBe(true)
      expect(item.questions.every((q) => q.explanation.trim().length > 20), `${item.id} explanations`).toBe(true)
      // Every task must be indexed to a chapter, so Section B coverage is auditable.
      expect(item.questions.every((q) => q.chapter), `${item.id} chapter index`).toBe(true)
      /*
       * A PM case is computational: at least two of its five tasks must require a number,
       * or it is a discussion question wearing a case's clothes.
       */
      expect(item.questions.filter((q) => q.type === "number").length, `${item.id} numeric tasks`)
        .toBeGreaterThanOrEqual(2)
    }

    // Section B must range across the computational areas rather than clustering on one.
    expect(new Set(cases.map((item) => item.area)).size, "OT case areas").toBeGreaterThanOrEqual(3)
  })

  it("serves Section C as six authored 20-mark constructed responses", () => {
    const written = getWrittenQuestions("PM")
    expect(written).toHaveLength(PM_CONTENT_TARGET.writtenQuestions)
    // Three disjoint sittings of two.
    expect(PM_CONTENT_TARGET.writtenQuestions).toBe(PM_CONTENT_TARGET.mockForms * PM_CONTENT_TARGET.sectionCQuestions)
    expect(PM_CONTENT_TARGET.sectionCQuestions * PM_CONTENT_TARGET.writtenMarks).toBe(PM_CONTENT_TARGET.sectionCMarks)
    expect(new Set(written.map((item) => item.id)).size, "unique ids").toBe(written.length)

    const chapterKeys = new Set(chaptersForPaper("PM").map(chapterKey))
    for (const question of written) {
      expect(question.paper, question.id).toBe("PM")
      // The defect: the old bank held 9- and 10-mark questions. PM's Section C is 20.
      expect(question.maxMarks, `${question.id} marks`).toBe(PM_CONTENT_TARGET.writtenMarks)
      expect(question.stem.trim().length, `${question.id} stem`).toBeGreaterThan(600)
      // A 20-mark question needs enough marking points to award 20 marks against.
      expect(question.rubric.length, `${question.id} rubric points`).toBeGreaterThanOrEqual(10)
      expect(question.rubric.every((point) => point.trim().length > 20), `${question.id} rubric detail`).toBe(true)
      expect(question.chapter, `${question.id} chapter`).toBeDefined()
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("PM", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
      // A requirement broken into parts, as every real Section C question is.
      expect(question.stem, `${question.id} requirement parts`).toContain("(a)")
      expect(question.stem, `${question.id} mark allocation`).toMatch(/\(\d+ marks?\)/)
    }

    /*
     * Section C draws on Areas C, D and E — that is where its marks come from in every
     * real sitting, and all three must be represented across the six questions.
     */
    const writtenAreas = new Set(written.map((q) => q.area))
    for (const area of PM_CONTENT_TARGET.writtenAreas) {
      expect(writtenAreas.has(area), `Section C covers area ${area}`).toBe(true)
    }
  })

  it("composes three mocks in the real exam's shape, from authored content only", () => {
    const blueprint = examBlueprint("PM")
    expect(blueprint?.durationMin).toBe(PM_CONTENT_TARGET.durationMin)
    expect(blueprint?.sections.map((s) => s.id)).toEqual(["A", "B", "C"])
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(PM_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(PM_CONTENT_TARGET.sectionBMarks)
    expect(blueprint?.sections.find((s) => s.id === "C")?.marks).toBe(PM_CONTENT_TARGET.sectionCMarks)
    expect(MOCK_FORMS).toBe(PM_CONTENT_TARGET.mockForms)

    const sectionBIds: string[][] = []
    for (let form = 1; form <= PM_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("PM", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      const sectionC = mock.sections.find((s) => s.id === "C")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(PM_CONTENT_TARGET.sectionAMarks)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(PM_CONTENT_TARGET.sectionBMarks)
      expect(sectionC?.marks, `form ${form} Section C`).toBe(PM_CONTENT_TARGET.sectionCMarks)
      // Section A is 15 questions of 2 marks.
      expect(sectionA?.items.length, `form ${form} Section A items`).toBe(PM_CONTENT_TARGET.sectionAQuestions)
      // Section B must be real cases, never a fallback assembled from loose questions.
      expect(sectionB?.otFallback, `form ${form} Section B fallback`).toBeUndefined()
      expect(sectionB?.items.every((item) => item.kind === "caseq"), `form ${form} Section B items`).toBe(true)
      // Three cases of five tasks.
      expect(sectionB?.items.length, `form ${form} Section B tasks`).toBe(
        PM_CONTENT_TARGET.sectionBCases * PM_CONTENT_TARGET.sectionBQuestionsPerCase,
      )
      const graded = mock.sections.flatMap((s) => s.items)
      expect(graded.every((item) => item.kind === "task" || !item.q.recall), `form ${form} drill-free`).toBe(true)
      sectionBIds.push(
        [...new Set((sectionB?.items ?? []).map((item) => item.kind === "caseq" ? item.caseRef.id : ""))],
      )
    }

    // The three forms' Section B must be genuinely DISJOINT — a block of three each.
    for (const ids of sectionBIds) expect(ids, "three cases per form").toHaveLength(PM_CONTENT_TARGET.sectionBCases)
    const allIds = sectionBIds.flat()
    expect(new Set(allIds).size, "three disjoint sittings of three").toBe(allIds.length)
    expect(new Set(allIds).size).toBe(PM_CONTENT_TARGET.otCases)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("PM", 42)
    /*
     * Six, not five: the paper declares an Area F — employability and technology skills —
     * alongside the five content areas. It carries no reading chapter, because it is about
     * driving the CBE's spreadsheet rather than about a management accounting technique,
     * so the tree covers A to E while the diagnostic spans all six declared areas.
     */
    expect(getPaper("PM")?.areas.length, "declared paper areas").toBe(PM_CONTENT_TARGET.paperAreas)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(PM_CONTENT_TARGET.paperAreas)
    // Every CONTENT area must be represented, which is what the tree is answerable for.
    for (const area of AREAS) {
      expect(diagnostic.some((q) => q.area === area), `diagnostic covers area ${area}`).toBe(true)
    }
    expect(diagnostic.every((q) => q.paper === "PM"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })

  it("keeps the flashcard and mixed-bank targets", () => {
    expect(getFlashcards("PM")).toHaveLength(PM_CONTENT_TARGET.flashcards)
    expect(BANK_RUN_SIZE).toBe(PM_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("PM")).toBe(PM_CONTENT_TARGET.mixedBanks)
  })
})
