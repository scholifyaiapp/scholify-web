import { describe, expect, it } from "vitest"
import { LW_GLOBAL_CONTENT_TARGET } from "@/lib/lw-global-content-contract"
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
 * LW-Global is the fourth paper rebuilt, and it was the worst in the library. This test
 * pins the defects it had:
 *
 *   1. The bank was 48 authored questions padded to 350 with permuted glossary prompts,
 *      on the DEFAULT variant of the paper.
 *   2. Section B was 350 generated linked questions where the real exam has FIVE
 *      multi-task questions of SIX marks.
 *   3. The syllabus was taught in 8 generated chapters of ~1,150 words in total, with
 *      the whole CISG covered in a few sentences.
 *   4. Every question was worth 2 marks, so a real-shaped Section A — 25 × 2 plus
 *      20 × 1 — could not be composed at all.
 *   5. Global learners saw the ENG label for syllabus area G.
 *
 * Note on variant: getPaperVariant falls back to the default outside a browser, and the
 * default for LW is GLOBAL. So the content the registry holds under "LW" in tests and
 * scripts IS the Global variant, which is what this file measures.
 */

const AREAS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const

describe("LW-Global content contract", () => {
  it("teaches the Global syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("LW")
    expect(chapters).toHaveLength(LW_GLOBAL_CONTENT_TARGET.chapters)
    expect(hasChapterTree("LW")).toBe(true)
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("LW", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("LW", key), key).toBeDefined()
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: LW_GLOBAL_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
    /*
     * Area B is the CISG and Incoterms and Area C is transport and payment — the two
     * areas LW-ENG does not have. Both were a single thin chapter before, and Area B in
     * particular needs room: scope, formation, trade terms, both parties' obligations
     * and remedies, the common provisions and the passing of risk.
     */
    expect(chaptersForArea("LW", "B").length, "Area B chapters").toBeGreaterThanOrEqual(6)
    expect(chaptersForArea("LW", "C").length, "Area C chapters").toBeGreaterThanOrEqual(3)
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("LW")) {
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
   * A law paper is not computed, so the FA/MA test for formula blocks makes no sense
   * here. The equivalent is that a chapter teaching an applied rule must WORK a
   * scenario — identify the rule, apply its elements to facts, conclude — because that
   * is what the exam rewards. These are the chapters where the reasoning is the marks.
   */
  it("works a scenario in the chapters where applying a rule IS the skill", () => {
    const applied = [
      "LWG-01", "LWG-05", "LWG-06", "LWG-07", "LWG-08", "LWG-09", "LWG-10",
      "LWG-12", "LWG-13", "LWG-16", "LWG-17", "LWG-18", "LWG-19", "LWG-20",
      "LWG-23", "LWG-26", "LWG-29", "LWG-33",
    ]
    for (const id of applied) {
      const chapter = getChapterByKey("LW", id)
      expect(chapter, id).toBeDefined()
      const blocks = chapter!.sections.flatMap((s) => s.blocks)
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
    const authored = getQuestions("LW")
    const drills = getDrills("LW")

    expect(authored).toHaveLength(LW_GLOBAL_CONTENT_TARGET.authoredBank)
    expect(drills, "LW-Global should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

    expect(questionCount("LW")).toBe(authored.length)
    expect(drillCount("LW")).toBe(drills.length)

    expect(new Set(authored.map((q) => q.id)).size, "unique ids").toBe(authored.length)
    expect(new Set(authored.map((q) => q.stem.trim().toLowerCase())).size, "unique stems").toBe(authored.length)

    const areaSet = new Set(getPaper("LW")?.areas.map((a) => a.code))
    for (const question of authored) {
      expect(question.paper, question.id).toBe("LW")
      expect(areaSet.has(question.area), `${question.id} area ${question.area}`).toBe(true)
      expect(question.explanation.trim().length, `${question.id} explanation`).toBeGreaterThan(20)
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
   * The defect unique to LW: its Section A is 25 two-mark plus 20 one-mark questions,
   * and the whole pre-rebuild bank was 2-mark. A bank that cannot supply both values
   * cannot produce a real-shaped sitting whatever its size.
   */
  it("holds both of the real Section A mark values, in enough depth for three forms", () => {
    const authored = getQuestions("LW")
    const oneMark = authored.filter((q) => q.marks === 1)
    const twoMark = authored.filter((q) => q.marks === 2)

    expect(oneMark.length, "one-mark questions").toBeGreaterThanOrEqual(LW_GLOBAL_CONTENT_TARGET.minOneMarkQuestions)
    expect(twoMark.length, "two-mark questions").toBeGreaterThanOrEqual(LW_GLOBAL_CONTENT_TARGET.minTwoMarkQuestions)
    // Nothing outside the two values the real exam uses.
    expect(oneMark.length + twoMark.length).toBe(authored.length)
    // Both values must be spread across the syllabus, not confined to a couple of areas.
    expect(new Set(oneMark.map((q) => q.area)).size, "one-mark areas").toBeGreaterThanOrEqual(6)
    expect(new Set(twoMark.map((q) => q.area)).size, "two-mark areas").toBeGreaterThanOrEqual(6)
    // The floors must genuinely support three sittings of the real composition.
    expect(LW_GLOBAL_CONTENT_TARGET.minOneMarkQuestions)
      .toBe(LW_GLOBAL_CONTENT_TARGET.mockForms * LW_GLOBAL_CONTENT_TARGET.sectionAOneMarkQuestions)
    expect(LW_GLOBAL_CONTENT_TARGET.minTwoMarkQuestions)
      .toBe(LW_GLOBAL_CONTENT_TARGET.mockForms * LW_GLOBAL_CONTENT_TARGET.sectionATwoMarkQuestions)
    // And the composition itself must add up to the section's marks.
    expect(
      LW_GLOBAL_CONTENT_TARGET.sectionATwoMarkQuestions * 2 + LW_GLOBAL_CONTENT_TARGET.sectionAOneMarkQuestions,
    ).toBe(LW_GLOBAL_CONTENT_TARGET.sectionAMarks)
  })

  it("uses no numeric entry, because nothing in a law paper is computed", () => {
    const numeric = getQuestions("LW").filter((question) => question.type === "number")
    expect(numeric).toHaveLength(LW_GLOBAL_CONTENT_TARGET.numericQuestions)
  })

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("LW").map(chapterKey))
    const kit = getQuestions("LW").filter((question) => question.chapter)
    expect(kit.length).toBeGreaterThanOrEqual(300)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("LW", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    for (const chapter of chaptersForPaper("LW")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`).toBeGreaterThanOrEqual(8)
    }
  })

  it("serves Section B as authored MTQs at the real 6-mark unit size", () => {
    const cases = getOtCases("LW")
    expect(cases).toHaveLength(LW_GLOBAL_CONTENT_TARGET.mtqUnits)
    // Three disjoint sittings of five.
    expect(LW_GLOBAL_CONTENT_TARGET.mtqUnits).toBe(
      LW_GLOBAL_CONTENT_TARGET.mockForms * (LW_GLOBAL_CONTENT_TARGET.sectionBMarks / LW_GLOBAL_CONTENT_TARGET.mtqMarks),
    )

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    const areaSet = new Set(getPaper("LW")?.areas.map((a) => a.code))
    for (const item of cases) {
      expect(otCaseMarks(item), `${item.id} marks`).toBe(LW_GLOBAL_CONTENT_TARGET.mtqMarks)
      expect(item.scenario.trim().length, `${item.id} scenario`).toBeGreaterThan(200)
      expect(item.questions.length, `${item.id} task count`).toBeGreaterThanOrEqual(3)
      expect(item.questions.every((q) => q.paper === "LW" && q.area === item.area), `${item.id} ownership`).toBe(true)
      expect(areaSet.has(item.area), `${item.id} area ${item.area}`).toBe(true)
      expect(item.questions.every((q) => !q.recall), `${item.id} no drills`).toBe(true)
      expect(item.questions.every((q) => q.explanation.trim().length > 20), `${item.id} explanations`).toBe(true)
    }

    // Section B must range across the syllabus rather than clustering on a few areas.
    expect(new Set(cases.map((item) => item.area)).size, "MTQ areas").toBeGreaterThanOrEqual(6)
  })

  it("composes three mocks in the real exam's shape, from authored content only", () => {
    const blueprint = examBlueprint("LW")
    expect(blueprint?.durationMin).toBe(120)
    expect(blueprint?.sections.map((s) => s.id)).toEqual(["A", "B"])
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(LW_GLOBAL_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(LW_GLOBAL_CONTENT_TARGET.sectionBMarks)
    expect(MOCK_FORMS).toBe(LW_GLOBAL_CONTENT_TARGET.mockForms)

    const sectionBIds: string[][] = []
    for (let form = 1; form <= LW_GLOBAL_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("LW", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(LW_GLOBAL_CONTENT_TARGET.sectionAMarks)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(LW_GLOBAL_CONTENT_TARGET.sectionBMarks)
      expect(sectionB?.otFallback, `form ${form} Section B fallback`).toBeUndefined()
      expect(sectionB?.items.every((item) => item.kind === "caseq"), `form ${form} Section B items`).toBe(true)
      // Five MTQs of six marks, so fifteen linked tasks at two marks each.
      expect(sectionB?.items.length, `form ${form} Section B tasks`).toBe(15)
      const graded = mock.sections.flatMap((s) => s.items)
      expect(graded.every((item) => item.kind === "task" || !item.q.recall), `form ${form} drill-free`).toBe(true)
      sectionBIds.push(
        [...new Set((sectionB?.items ?? []).map((item) => item.kind === "caseq" ? item.caseRef.id : ""))],
      )
    }

    /*
     * The three forms' Section B must be genuinely DISJOINT. Before the composer was
     * fixed it rotated the case list by one case per form, so the three sittings drew
     * units 1–5, 2–6 and 3–7 — overlapping almost entirely, and leaving units 8–15
     * unreachable. Each form should now draw its own block of five.
     */
    for (const ids of sectionBIds) expect(ids, "five MTQs per form").toHaveLength(5)
    const allIds = sectionBIds.flat()
    expect(new Set(allIds).size, "three disjoint sittings of five").toBe(allIds.length)
    expect(new Set(allIds).size).toBe(LW_GLOBAL_CONTENT_TARGET.mtqUnits)
  })

  it("has no written questions, because LW's exam has no constructed-response section", () => {
    expect(getPaper("LW")?.objectiveOnly).toBe(true)
    expect(getWrittenQuestions("LW")).toHaveLength(LW_GLOBAL_CONTENT_TARGET.writtenQuestions)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("LW", 42)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(LW_GLOBAL_CONTENT_TARGET.syllabusAreas)
    expect(diagnostic.every((q) => q.paper === "LW"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })

  /*
   * The Global variant must describe its OWN syllabus. Three of the eight area labels
   * differ from ENG, and area G had no override until this rebuild — so a Global learner
   * saw "Insolvency law" for an area their exam calls something else entirely.
   */
  it("labels the syllabus areas with the Global variant's own names", () => {
    const areas = new Map((getPaper("LW")?.areas ?? []).map((a) => [a.code, a.label]))
    expect(areas.get("B")).toMatch(/international business transactions/i)
    expect(areas.get("C")).toMatch(/transportation and payment/i)
    expect(areas.get("G")).toMatch(/difficulty or in crisis/i)
    // And the labels must not have reverted to the ENG wording.
    expect(areas.get("B")).not.toMatch(/law of obligations/i)
    expect(areas.get("C")).not.toMatch(/employment/i)
    expect(areas.get("G")).not.toMatch(/^insolvency law$/i)
  })
})
