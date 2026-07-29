import { describe, expect, it } from "vitest"
import { BT_CONTENT_TARGET } from "@/lib/bt-content-contract"
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
 * BT is the reference paper for the content rebuild. This test pins the three
 * things that were wrong before it, so none of them can come back:
 *
 *   1. The bank was 174 authored questions padded to 350 with prompts permuted
 *      out of the study text.
 *   2. Section B was 8 authored "cases" plus 342 generated 1-mark items, when the
 *      real exam's Section B is 6 multi-task questions of 4 marks.
 *   3. The whole syllabus was taught in 6 chapters, one per area, so nine Area A
 *      sub-topics shared a single 28-minute sitting.
 */

const AREAS = ["A", "B", "C", "D", "E", "F"] as const

describe("BT content contract", () => {
  it("teaches the syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("BT")
    expect(chapters).toHaveLength(BT_CONTENT_TARGET.chapters)
    expect(hasChapterTree("BT")).toBe(true)
    // Every official area is reached, and every chapter belongs to one of them.
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("BT", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    // Chapter keys must be unique and resolvable — learner progress and the
    // reader's routing both key off them.
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("BT", key), key).toBeDefined()
    // Reading order must be contiguous 1..26 so the contents page is coherent.
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: BT_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("BT")) {
      const where = chapterKey(chapter)
      expect(chapter.syllabusRefs?.length, `${where} syllabus refs`).toBeGreaterThan(0)
      expect(chapter.outcomes.length, `${where} outcomes`).toBeGreaterThanOrEqual(3)
      expect(chapter.sections.length, `${where} sections`).toBeGreaterThanOrEqual(3)
      expect(chapter.examTraps.length, `${where} traps`).toBeGreaterThanOrEqual(3)
      expect(chapter.keyTerms.length, `${where} key terms`).toBeGreaterThanOrEqual(4)
      expect(chapter.summary.length, `${where} summary`).toBeGreaterThanOrEqual(4)
      expect(chapter.knowledgeDiagnostic?.length, `${where} knowledge diagnostic`).toBeGreaterThanOrEqual(4)
      // Every trap must carry its fix, and every term its definition.
      expect(chapter.examTraps.every((t) => t.trap.trim() && t.fix.trim()), `${where} trap/fix`).toBe(true)
      expect(chapter.keyTerms.every((t) => t.term.trim() && t.def.trim()), `${where} term/def`).toBe(true)
      // At least one inline check per chapter, so reading is interrupted by recall.
      expect(chapter.sections.some((s) => s.check), `${where} has an inline check`).toBe(true)
      // Realistic reading time — a chapter nobody can finish in a sitting is a
      // chapter that should have been split.
      expect(chapter.minutes, `${where} minutes`).toBeGreaterThanOrEqual(10)
      expect(chapter.minutes, `${where} minutes`).toBeLessThanOrEqual(20)
    }
  })

  it("serves an authored bank with no derived filler at all", () => {
    const authored = getQuestions("BT")
    const drills = getDrills("BT")

    expect(authored).toHaveLength(BT_CONTENT_TARGET.authoredBank)
    // The point of the rebuild: BT needs no drills, because its authored bank
    // exceeds its inventory target outright.
    expect(drills, "BT should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

    // The eager counts map drives coverage for an unloaded paper; it must agree.
    expect(questionCount("BT")).toBe(authored.length)
    expect(drillCount("BT")).toBe(drills.length)

    // Every question must be answerable, unique and owned by BT.
    expect(new Set(authored.map((q) => q.id)).size, "unique ids").toBe(authored.length)
    expect(new Set(authored.map((q) => q.stem.trim().toLowerCase())).size, "unique stems").toBe(authored.length)
    const areaSet = new Set(getPaper("BT")?.areas.map((a) => a.code))
    for (const question of authored) {
      expect(question.paper, question.id).toBe("BT")
      expect(areaSet.has(question.area), `${question.id} area ${question.area}`).toBe(true)
      expect(question.explanation.trim().length, `${question.id} explanation`).toBeGreaterThan(20)
      if (question.type === "number") {
        expect(Number.isFinite(question.numericAnswer), question.id).toBe(true)
      } else {
        expect(question.options?.length, question.id).toBeGreaterThanOrEqual(2)
        const options = question.options ?? []
        // A rendered MCQ must present distinct options.
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

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("BT").map(chapterKey))
    const kit = getQuestions("BT").filter((question) => question.chapter)
    // The kit is a substantial share of the bank, not a token few.
    expect(kit.length).toBeGreaterThanOrEqual(250)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      // A question's chapter and its area must agree, or the reader's "practise
      // this chapter" CTA would serve questions from another syllabus area.
      const chapter = getChapterByKey("BT", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    // Every chapter must have questions to practise after reading it.
    for (const chapter of chaptersForPaper("BT")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`).toBeGreaterThanOrEqual(8)
    }
  })

  it("serves Section B as authored MTQs at the real 4-mark unit size", () => {
    const cases = getOtCases("BT")
    expect(cases).toHaveLength(BT_CONTENT_TARGET.mtqUnits)
    // Three disjoint sittings of six.
    expect(BT_CONTENT_TARGET.mtqUnits).toBe(
      BT_CONTENT_TARGET.mockForms * (BT_CONTENT_TARGET.sectionBMarks / BT_CONTENT_TARGET.mtqMarks),
    )

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    for (const item of cases) {
      // Exactly four marks — the real exam's MTQ unit.
      expect(otCaseMarks(item), `${item.id} marks`).toBe(BT_CONTENT_TARGET.mtqMarks)
      // A real scenario, not a list of concept definitions stitched together.
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(200)
      expect(item.questions.length, `${item.id} task count`).toBeGreaterThanOrEqual(2)
      expect(item.questions.every((q) => q.paper === "BT" && q.area === item.area), `${item.id} ownership`).toBe(true)
      expect(item.questions.every((q) => !q.recall), `${item.id} no drills`).toBe(true)
      expect(item.questions.every((q) => q.explanation.trim().length > 20), `${item.id} explanations`).toBe(true)
    }
    // The MTQs must span the syllabus, not cluster in one area.
    expect(new Set(cases.map((item) => item.area)).size).toBeGreaterThanOrEqual(5)
  })

  it("composes three mocks in the real exam's shape, from authored content only", () => {
    const blueprint = examBlueprint("BT")
    expect(blueprint?.durationMin).toBe(120)
    expect(blueprint?.sections.map((s) => s.id)).toEqual(["A", "B"])
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(BT_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(BT_CONTENT_TARGET.sectionBMarks)
    expect(MOCK_FORMS).toBe(BT_CONTENT_TARGET.mockForms)

    for (let form = 1; form <= BT_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("BT", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(BT_CONTENT_TARGET.sectionAMarks)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(BT_CONTENT_TARGET.sectionBMarks)
      // Section B must be real linked case questions, never a fallback to OTs.
      expect(sectionB?.otFallback, `form ${form} Section B fallback`).toBeUndefined()
      expect(sectionB?.items.every((item) => item.kind === "caseq"), `form ${form} Section B items`).toBe(true)
      // No graded item anywhere in the sitting may be a derived drill.
      const graded = mock.sections.flatMap((s) => s.items)
      expect(graded.every((item) => item.kind === "task" || !item.q.recall), `form ${form} drill-free`).toBe(true)
    }
  })

  it("has no written questions, because BT's exam has no constructed-response section", () => {
    expect(getPaper("BT")?.objectiveOnly).toBe(true)
    expect(getWrittenQuestions("BT")).toHaveLength(BT_CONTENT_TARGET.writtenQuestions)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("BT", 42)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(BT_CONTENT_TARGET.syllabusAreas)
    expect(diagnostic.every((q) => q.paper === "BT"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })
})
