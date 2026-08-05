import { describe, expect, it } from "vitest"
import { TX_CONTENT_TARGET } from "@/lib/tx-content-contract"
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
 * TX-UK is the seventh paper rebuilt, and it had the most extreme version of the defect:
 * SEVEN chapters for a SEVEN-area syllabus. Area B alone — income tax and NIC — is eleven
 * chapters of any approved-provider text, and it had one.
 *
 * This test pins what was wrong:
 *
 *   1. Seven area-chapters, machine-thin, against a syllabus needing 29.
 *   2. A bank of 277 authored questions carrying no `chapter`, topped up with 73
 *      machine-derived recall drills to reach a 350 "Section A" target. TX's real Section A
 *      is 15 questions.
 *   3. Section B was 70 GENERATED cases — 23 sittings' worth of a paper that examines three.
 *   4. Section C was 50 questions ALL AT 20 MARKS. There is no 20-mark constructed response
 *      anywhere in TX: the units are 10, 15 and 15.
 *   5. The variant switch was nearly cosmetic: TX-UK read the shared chapters with a
 *      "United Kingdom variant" section prepended to chapter 1.
 *
 * ── Note on the syllabus mapper ──────────────────────────────────
 * TX's legacy mapper shifts areas, bumps years and WITHHOLDS questions mentioning
 * superseded rates. The authored kit carries a `chapter` and must bypass all three — the
 * assertions below on area coverage and bank size are what catch it if that guard regresses,
 * because without it twenty authored questions were silently filtered out for deliberately
 * naming the old 10% business asset disposal relief rate.
 *
 * TX has variants, but TX-UK is the DEFAULT, so the Node bootstrap loads it without any
 * setPaperVariant dance.
 */

const AREAS = ["A", "B", "C", "D", "E", "F", "G"] as const

describe("TX-UK content contract", () => {
  it("teaches the syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("TX")
    expect(chapters).toHaveLength(TX_CONTENT_TARGET.chapters)
    expect(hasChapterTree("TX")).toBe(true)
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("TX", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("TX", key), key).toBeDefined()
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: TX_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
    /*
     * Area B is the whole point. It is income tax and national insurance — the computation,
     * property income, employment income and benefits, pensions, trading profits, capital
     * allowances, partnerships, losses and NIC — and it had ONE chapter.
     */
    expect(chaptersForArea("TX", "B").length, "Area B chapters").toBeGreaterThanOrEqual(11)
    expect(chaptersForArea("TX", "C").length, "Area C chapters").toBeGreaterThanOrEqual(4)
    expect(chaptersForArea("TX", "E").length, "Area E chapters").toBeGreaterThanOrEqual(5)
    // And the ids must be the TX series, so learner progress cannot collide.
    expect(chapters.every((c) => c.id?.startsWith("TX-")), "TX chapter ids").toBe(true)
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("TX")) {
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
   * TX is computational, so every chapter must WORK a scenario — identify the rule, apply it
   * to the figures, state the answer and the date. A chapter that states a rule without
   * demonstrating it does not prepare a candidate for Section C, which is 40 of 100 marks.
   */
  it("works a scenario in every chapter, since the skill is applying a rule to figures", () => {
    for (const chapter of chaptersForPaper("TX")) {
      const id = chapterKey(chapter)
      const blocks = chapter.sections.flatMap((s) => s.blocks)
      expect(blocks.filter((b) => b.kind === "example").length, `${id} worked examples`).toBeGreaterThanOrEqual(1)
      for (const block of blocks) {
        if (block.kind !== "example") continue
        expect(block.steps.length, `${id} example "${block.title}" steps`).toBeGreaterThanOrEqual(3)
        expect(block.result.trim().length, `${id} example "${block.title}" result`).toBeGreaterThan(40)
      }
    }
  })

  it("serves an authored bank with no derived filler at all", () => {
    const authored = getQuestions("TX")
    const drills = getDrills("TX")

    expect(authored).toHaveLength(TX_CONTENT_TARGET.authoredBank)
    expect(drills, "TX-UK should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

    expect(new Set(authored.map((q) => q.id)).size, "unique ids").toBe(authored.length)
    expect(new Set(authored.map((q) => q.stem.trim().toLowerCase())).size, "unique stems").toBe(authored.length)

    const areaSet = new Set(getPaper("TX")?.areas.map((a) => a.code))
    for (const question of authored) {
      expect(question.paper, question.id).toBe("TX")
      expect(areaSet.has(question.area), `${question.id} area ${question.area}`).toBe(true)
      expect(question.explanation.trim().length, `${question.id} explanation`).toBeGreaterThan(20)
      // Every objective question in TX is worth 2 marks, in Section A and Section B alike.
      expect(question.marks, `${question.id} marks`).toBe(TX_CONTENT_TARGET.marksPerQuestion)
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
   * TX is the most computational Applied Skills paper after FA, so a bank of four-option MCQs
   * would be materially easier than the exam — a candidate can work backwards from the options.
   */
  it("uses numeric entry across every computational area", () => {
    const numeric = getQuestions("TX").filter((question) => question.type === "number")
    expect(numeric.length, "numeric-entry questions").toBeGreaterThanOrEqual(TX_CONTENT_TARGET.minNumericQuestions)

    const numericAreas = new Set(numeric.map((q) => q.area))
    for (const area of TX_CONTENT_TARGET.numericAreas) {
      expect(numericAreas.has(area), `numeric entry in area ${area}`).toBe(true)
    }
    /*
     * Area A specifically. The legacy mapper shifts A→B, so if the kit's `chapter` guard ever
     * regresses this is the assertion that fails first — the administration questions vanish
     * from Area A and reappear under income tax.
     */
    expect(numeric.some((q) => q.area === "A"), "Area A numeric entry survives the mapper").toBe(true)
  })

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("TX").map(chapterKey))
    const kit = getQuestions("TX").filter((question) => question.chapter)
    expect(kit.length).toBeGreaterThanOrEqual(TX_CONTENT_TARGET.kitQuestions)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("TX", question.chapter!)
      // This also proves the mapper did not shift the kit's areas.
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    for (const chapter of chaptersForPaper("TX")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`)
        .toBeGreaterThanOrEqual(TX_CONTENT_TARGET.minQuestionsPerChapter)
    }
  })

  it("serves Section B as authored OT cases at the real 10-mark unit size", () => {
    const cases = getOtCases("TX")
    expect(cases).toHaveLength(TX_CONTENT_TARGET.otCases)
    expect(TX_CONTENT_TARGET.otCases).toBe(TX_CONTENT_TARGET.mockForms * TX_CONTENT_TARGET.sectionBCases)
    expect(TX_CONTENT_TARGET.sectionBCases * TX_CONTENT_TARGET.otCaseMarks).toBe(TX_CONTENT_TARGET.sectionBMarks)
    expect(
      TX_CONTENT_TARGET.sectionBQuestionsPerCase * TX_CONTENT_TARGET.marksPerQuestion,
    ).toBe(TX_CONTENT_TARGET.otCaseMarks)

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    const areaSet = new Set(getPaper("TX")?.areas.map((a) => a.code))
    for (const item of cases) {
      expect(otCaseMarks(item), `${item.id} marks`).toBe(TX_CONTENT_TARGET.otCaseMarks)
      expect(item.questions.length, `${item.id} task count`).toBe(TX_CONTENT_TARGET.sectionBQuestionsPerCase)
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(400)
      expect(item.questions.every((q) => q.paper === "TX" && q.area === item.area), `${item.id} ownership`).toBe(true)
      expect(areaSet.has(item.area), `${item.id} area ${item.area}`).toBe(true)
      expect(item.questions.every((q) => !q.recall), `${item.id} no drills`).toBe(true)
      expect(item.questions.every((q) => q.explanation.trim().length > 20), `${item.id} explanations`).toBe(true)
      expect(item.questions.every((q) => q.chapter), `${item.id} chapter index`).toBe(true)
      // A TX case is computational: at least two of five tasks must require a figure.
      expect(item.questions.filter((q) => q.type === "number").length, `${item.id} numeric tasks`)
        .toBeGreaterThanOrEqual(2)
    }

    expect(new Set(cases.map((item) => item.area)).size, "OT case areas").toBeGreaterThanOrEqual(4)
  })

  it("serves Section C at the real 10 + 15 + 15 unit sizes", () => {
    const written = getWrittenQuestions("TX")
    expect(written).toHaveLength(TX_CONTENT_TARGET.writtenQuestions)
    // Three disjoint sittings of three.
    expect(TX_CONTENT_TARGET.writtenQuestions).toBe(TX_CONTENT_TARGET.mockForms * TX_CONTENT_TARGET.sectionCQuestions)
    // The unit marks must add up to the section's marks.
    expect(TX_CONTENT_TARGET.sectionCUnitMarks.reduce((a, b) => a + b, 0)).toBe(TX_CONTENT_TARGET.sectionCMarks)
    expect(new Set(written.map((item) => item.id)).size, "unique ids").toBe(written.length)

    /*
     * The defect this pins: the old bank was 50 questions ALL at 20 marks, which is not a TX
     * unit size. The bank must hold three 10-markers and six 15-markers and nothing else.
     */
    expect(written.filter((w) => w.maxMarks === 10).length, "10-markers").toBe(TX_CONTENT_TARGET.writtenTenMarkers)
    expect(written.filter((w) => w.maxMarks === 15).length, "15-markers").toBe(TX_CONTENT_TARGET.writtenFifteenMarkers)
    expect(written.every((w) => w.maxMarks === 10 || w.maxMarks === 15), "no other mark values").toBe(true)

    const chapterKeys = new Set(chaptersForPaper("TX").map(chapterKey))
    for (const question of written) {
      expect(question.paper, question.id).toBe("TX")
      expect(question.stem.trim().length, `${question.id} stem`).toBeGreaterThan(600)
      // Enough marking points to award the marks against.
      expect(question.rubric.length, `${question.id} rubric points`).toBeGreaterThanOrEqual(9)
      expect(question.rubric.every((point) => point.trim().length > 20), `${question.id} rubric detail`).toBe(true)
      expect(question.chapter, `${question.id} chapter`).toBeDefined()
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("TX", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
      expect(question.stem, `${question.id} requirement parts`).toContain("(a)")
      expect(question.stem, `${question.id} mark allocation`).toMatch(/\(\d+ marks?\)/)
    }

    /*
     * Section C must reach every content area. Area A's presence also proves the written
     * mapper's `chapter` guard is working — without it the administration and ethics question
     * was relabelled from A to B.
     */
    const writtenAreas = new Set(written.map((q) => q.area))
    for (const area of TX_CONTENT_TARGET.writtenAreas) {
      expect(writtenAreas.has(area), `Section C covers area ${area}`).toBe(true)
    }
  })

  it("composes three mocks in the real exam's shape, from authored content only", () => {
    const blueprint = examBlueprint("TX")
    expect(blueprint?.durationMin).toBe(TX_CONTENT_TARGET.durationMin)
    expect(blueprint?.sections.map((s) => s.id)).toEqual(["A", "B", "C"])
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(TX_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(TX_CONTENT_TARGET.sectionBMarks)
    expect(blueprint?.sections.find((s) => s.id === "C")?.marks).toBe(TX_CONTENT_TARGET.sectionCMarks)
    expect(MOCK_FORMS).toBe(TX_CONTENT_TARGET.mockForms)

    const sectionBIds: string[][] = []
    for (let form = 1; form <= TX_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("TX", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      const sectionC = mock.sections.find((s) => s.id === "C")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(TX_CONTENT_TARGET.sectionAMarks)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(TX_CONTENT_TARGET.sectionBMarks)
      expect(sectionC?.marks, `form ${form} Section C`).toBe(TX_CONTENT_TARGET.sectionCMarks)
      expect(sectionA?.items.length, `form ${form} Section A items`).toBe(TX_CONTENT_TARGET.sectionAQuestions)
      // Section B must be real cases, never a fallback assembled from loose questions.
      expect(sectionB?.otFallback, `form ${form} Section B fallback`).toBeUndefined()
      expect(sectionB?.items.every((item) => item.kind === "caseq"), `form ${form} Section B items`).toBe(true)
      expect(sectionB?.items.length, `form ${form} Section B tasks`).toBe(
        TX_CONTENT_TARGET.sectionBCases * TX_CONTENT_TARGET.sectionBQuestionsPerCase,
      )
      const graded = mock.sections.flatMap((s) => s.items)
      expect(graded.every((item) => item.kind === "task" || !item.q.recall), `form ${form} drill-free`).toBe(true)
      sectionBIds.push(
        [...new Set((sectionB?.items ?? []).map((item) => item.kind === "caseq" ? item.caseRef.id : ""))],
      )
    }

    // The three forms' Section B must be genuinely DISJOINT — a block of three each.
    for (const ids of sectionBIds) expect(ids, "three cases per form").toHaveLength(TX_CONTENT_TARGET.sectionBCases)
    const allIds = sectionBIds.flat()
    expect(new Set(allIds).size, "three disjoint sittings of three").toBe(allIds.length)
    expect(new Set(allIds).size).toBe(TX_CONTENT_TARGET.otCases)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("TX", 42)
    expect(getPaper("TX")?.areas.length, "declared paper areas").toBe(TX_CONTENT_TARGET.syllabusAreas)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(TX_CONTENT_TARGET.syllabusAreas)
    for (const area of AREAS) {
      expect(diagnostic.some((q) => q.area === area), `diagnostic covers area ${area}`).toBe(true)
    }
    expect(diagnostic.every((q) => q.paper === "TX"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })

  it("keeps the flashcard and mixed-bank targets", () => {
    expect(getFlashcards("TX")).toHaveLength(TX_CONTENT_TARGET.flashcards)
    expect(BANK_RUN_SIZE).toBe(TX_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("TX")).toBe(TX_CONTENT_TARGET.mixedBanks)
  })
})
