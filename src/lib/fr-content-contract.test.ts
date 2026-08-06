import { describe, expect, it } from "vitest"
import { FR_CONTENT_TARGET } from "@/lib/fr-content-contract"
import { getQuestions, getPracticeInventory } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { getFlashcards } from "@/lib/acca-flashcards"
import { chaptersForPaper, chapterKey, getChapterByKey } from "@/lib/acca-study-content"
import { bankRunTarget, BANK_RUN_SIZE } from "@/lib/acca-bankruns"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { examBlueprint } from "@/lib/acca-exam-structure"

/*
 * FR's content contract, asserted against what the loader actually serves.
 *
 * ── What this file used to assert, and why it was replaced ───────
 * It asserted 350 Section A questions, 70 Section B cases holding 350 linked questions, and
 * 50 Section C questions. Those figures described the GENERATED content, not the exam: FR
 * examines 15 objective tests, 3 OT cases and 2 constructed responses. A test that passes
 * because the generator produced exactly as many items as it was told to produce verifies
 * nothing about the paper.
 *
 * Every assertion below is now traceable to a fact about the ACCA exam, or to a floor derived
 * from one — and the drills assertion is the one that matters most, because it is what stops
 * a mock or a readiness score being padded with permuted glossary prompts.
 */

describe("FR content contract", () => {
  it("matches the published exam structure", () => {
    const blueprint = examBlueprint("FR")
    expect(blueprint?.sections.map((section) => section.id)).toEqual(["A", "B", "C"])
    expect(blueprint?.durationMin).toBe(FR_CONTENT_TARGET.durationMin)
    // The three sections' marks must add to 100.
    expect(
      FR_CONTENT_TARGET.sectionAMarks + FR_CONTENT_TARGET.sectionBMarks + FR_CONTENT_TARGET.sectionCMarks,
    ).toBe(100)
    // And each section's marks must equal its own composition.
    expect(FR_CONTENT_TARGET.sectionAQuestions * FR_CONTENT_TARGET.marksPerQuestion).toBe(FR_CONTENT_TARGET.sectionAMarks)
    expect(FR_CONTENT_TARGET.sectionBCases * FR_CONTENT_TARGET.otCaseMarks).toBe(FR_CONTENT_TARGET.sectionBMarks)
    expect(FR_CONTENT_TARGET.sectionCQuestions * FR_CONTENT_TARGET.writtenMarks).toBe(FR_CONTENT_TARGET.sectionCMarks)
    expect(MOCK_FORMS).toBe(FR_CONTENT_TARGET.mockForms)
  })

  it("serves an entirely AUTHORED objective bank with no derived drills", () => {
    const graded = getQuestions("FR")
    const inventory = getPracticeInventory("FR")

    expect(graded).toHaveLength(FR_CONTENT_TARGET.authoredBank)
    /*
     * The assertion that actually protects the learner. `recall` marks a machine-derived
     * drill, and FR previously served 103 of them alongside its authored questions. The
     * inventory target is now the authored total, so the filler has nothing left to add.
     */
    expect(graded.some((question) => question.recall)).toBe(false)
    expect(inventory).toHaveLength(FR_CONTENT_TARGET.bankInventoryTarget)

    expect(new Set(graded.map((question) => question.id)).size).toBe(graded.length)
    expect(new Set(graded.map((question) => question.stem.trim().toLowerCase())).size).toBe(graded.length)
    // Every objective question in FR is 2 marks — there is no 1-mark question in the paper.
    expect([...new Set(graded.map((question) => question.marks))]).toEqual([FR_CONTENT_TARGET.marksPerQuestion])
  })

  it("indexes the bank to the reading tree, with no chapter left unexamined", () => {
    const chapters = chaptersForPaper("FR")
    expect(chapters).toHaveLength(FR_CONTENT_TARGET.chapters)
    expect([...new Set(chapters.map((chapter) => chapter.area))].sort()).toEqual(["A", "B", "C", "D", "E"])
    expect(new Set(chapters.map((chapter) => chapter.area)).size).toBe(FR_CONTENT_TARGET.syllabusAreas)
    // Reading order must be contiguous from 1: it is the order the learner is taken through.
    expect(chapters.map((chapter) => chapter.number)).toEqual(
      Array.from({ length: chapters.length }, (_, i) => i + 1),
    )

    const kitQuestions = getQuestions("FR").filter((question) => question.chapter)
    const perChapter = new Map<string, number>()
    for (const question of kitQuestions) {
      perChapter.set(question.chapter!, (perChapter.get(question.chapter!) ?? 0) + 1)
      // A question's area must match its chapter's, or the diagnostic routes the learner wrongly.
      const chapter = getChapterByKey("FR", question.chapter!)
      expect(chapter, `${question.id} chapter ${question.chapter}`).toBeDefined()
      expect(chapter!.area, `${question.id} area against chapter ${question.chapter}`).toBe(question.area)
    }
    for (const chapter of chapters) {
      expect(perChapter.get(chapterKey(chapter)) ?? 0, `${chapter.id} question count`)
        .toBeGreaterThanOrEqual(FR_CONTENT_TARGET.minQuestionsPerChapter)
    }
  })

  it("tests calculations by numeric ENTRY rather than by multiple choice", () => {
    const graded = getQuestions("FR")
    const numeric = graded.filter((question) => question.type === "number")
    expect(numeric.length).toBeGreaterThanOrEqual(FR_CONTENT_TARGET.minNumericQuestions)
    // And the numeric questions must reach every computational area, not cluster in one.
    for (const area of FR_CONTENT_TARGET.numericAreas) {
      expect(numeric.some((question) => question.area === area), `numeric questions in area ${area}`).toBe(true)
    }
    for (const question of numeric) {
      expect(typeof question.numericAnswer, question.id).toBe("number")
      expect(question.unit, question.id).toBeTruthy()
      // A tolerance wide enough to admit a different method marks the wrong answer correct.
      expect(question.tolerance ?? 0, `${question.id} tolerance`).toBeLessThanOrEqual(10)
    }
  })

  it("serves 9 authored Section B cases at the real 10-mark unit size", () => {
    const cases = getOtCases("FR")
    expect(cases).toHaveLength(FR_CONTENT_TARGET.otCases)
    // Exactly enough for three DISJOINT sittings of three.
    expect(FR_CONTENT_TARGET.otCases).toBe(FR_CONTENT_TARGET.mockForms * FR_CONTENT_TARGET.sectionBCases)

    for (const item of cases) {
      expect(item.paper, item.id).toBe("FR")
      expect(item.questions, `${item.id} task count`).toHaveLength(FR_CONTENT_TARGET.sectionBQuestionsPerCase)
      expect(otCaseMarks(item), `${item.id} marks`).toBe(FR_CONTENT_TARGET.otCaseMarks)
      // A case is a UNIT: one scenario long enough to support five linked tasks.
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(200)
      expect(item.questions.every((t) => t.chapter), `${item.id} chapter index`).toBe(true)
      expect(item.questions.every((t) => t.explanation.trim().length > 40), `${item.id} explanations`).toBe(true)
      // FR is computational, so every case must require at least one figure.
      expect(item.questions.filter((t) => t.type === "number").length, `${item.id} numeric tasks`)
        .toBeGreaterThanOrEqual(1)
    }

    const taskIds = cases.flatMap((item) => item.questions).map((t) => t.id)
    expect(new Set(taskIds).size).toBe(taskIds.length)
    // Section B must span areas rather than examining one topic nine times.
    expect(new Set(cases.map((item) => item.area)).size).toBeGreaterThanOrEqual(3)
  })

  it("serves 15 authored Section C questions at the real 20-mark unit size", () => {
    const written = getWrittenQuestions("FR")
    expect(written).toHaveLength(FR_CONTENT_TARGET.writtenQuestions)
    /*
     * The bank must cover at least three DISJOINT sittings of two, and does so with room to
     * spare — six was the structural floor, not a practice bank.
     */
    expect(FR_CONTENT_TARGET.writtenQuestions).toBeGreaterThanOrEqual(FR_CONTENT_TARGET.minWrittenForMocks)
    expect(FR_CONTENT_TARGET.minWrittenForMocks).toBe(FR_CONTENT_TARGET.mockForms * FR_CONTENT_TARGET.sectionCQuestions)
    /*
     * The defect this pins: the old bank was 50 generated questions sharing one generic
     * twenty-point rubric. Every question is now 20 marks — FR's real unit size.
     */
    expect([...new Set(written.map((question) => question.maxMarks))]).toEqual([FR_CONTENT_TARGET.writtenMarks])
    expect(new Set(written.map((question) => question.id)).size).toBe(written.length)

    const chapterKeys = new Set(chaptersForPaper("FR").map(chapterKey))
    const rubricPoints = new Set<string>()
    for (const question of written) {
      expect(question.paper, question.id).toBe("FR")
      expect(question.stem.trim().length, `${question.id} stem`).toBeGreaterThan(600)
      expect(question.rubric.length, `${question.id} rubric points`).toBeGreaterThanOrEqual(9)
      expect(question.rubric.every((point) => point.trim().length > 20), `${question.id} rubric detail`).toBe(true)
      expect(question.chapter, `${question.id} chapter`).toBeDefined()
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("FR", question.chapter!)
      expect(chapter?.area, `${question.id} area against chapter`).toBe(question.area)
      // A constructed response must set out a requirement with its marks allocated. Some
      // questions do that in lettered parts and some as a single requirement over numbered
      // matters - both are real exam formats, so the assertion tests for the requirement and
      // the mark allocation rather than for one of the two layouts.
      expect(question.stem, `${question.id} requirement`).toContain("Required:")
      expect(question.stem, `${question.id} mark allocation`).toMatch(/\(\d+ marks?\)/)
      for (const point of question.rubric) rubricPoints.add(point.trim())
    }
    /*
     * The rubrics must be DISTINCT. The generated bank shared one twenty-point rubric across
     * all fifty questions, so this assertion is what makes that impossible to reintroduce.
     */
    const totalPoints = written.reduce((sum, question) => sum + question.rubric.length, 0)
    expect(rubricPoints.size).toBe(totalPoints)

    // Section C must draw on the areas the real paper draws it from.
    const areas = new Set(written.map((question) => question.area))
    for (const area of areas) expect(FR_CONTENT_TARGET.writtenAreas).toContain(area)
    expect(areas.size).toBeGreaterThanOrEqual(3)
  })

  it("serves the flashcard and bank-run inventory the study surfaces expect", () => {
    expect(getFlashcards("FR")).toHaveLength(FR_CONTENT_TARGET.flashcards)
    expect(BANK_RUN_SIZE).toBe(FR_CONTENT_TARGET.mixedBankSize)
    expect(bankRunTarget("FR")).toBe(FR_CONTENT_TARGET.mixedBanks)
  })
})
