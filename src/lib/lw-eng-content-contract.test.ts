import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import { LW_ENG_CONTENT_TARGET } from "@/lib/lw-eng-content-contract"
import { getQuestions, getDrills, getPaper } from "@/lib/acca"
import { getOtCases, otCaseMarks } from "@/lib/acca-cases"
import { getWrittenQuestions } from "@/lib/acca-written"
import { chaptersForPaper, chaptersForArea, chapterKey, getChapterByKey, hasChapterTree } from "@/lib/acca-study-content"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import { buildDiagnostic } from "@/lib/acca-diagnostic"
import { MOCK_FORMS } from "@/lib/acca-mockforms"
import { setPaperVariant } from "@/lib/acca-profile"
import { reloadPaperContent } from "@/lib/acca-paper-content"

/*
 * LW-ENG is the fifth paper rebuilt, and it was the last one on the shared F1–F4
 * contract. This test pins the defects it had:
 *
 *   1. The syllabus was taught in FOUR area-chapters covering EIGHT syllabus areas, and
 *      the migrated sections carried no examples, tables, traps or checks.
 *   2. Section B was padded to 350 generated linked questions where the real exam has
 *      FIVE multi-task questions of SIX marks.
 *   3. Every question in the legacy bank came through a keyword syllabus mapper that
 *      re-derived area codes, so a per-chapter kit could not be indexed reliably.
 *   4. Worst of all, the variant switch was very nearly COSMETIC on the study side: a
 *      learner selecting United Kingdom read the GLOBAL tree with one UK-flavoured
 *      overlay section prepended to chapter 1. So they studied the CISG and international
 *      transport, which are not on their exam, and missed the law of obligations and
 *      employment law, which are.
 *
 * ── Note on variant, and why this file differs from LW-Global's ──
 * getPaperVariant falls back to the DEFAULT outside a browser, and the default for LW is
 * GLOBAL. So unlike the Global contract test, this file must select the UK variant
 * explicitly before the content loads, and re-select it in a beforeEach because the
 * shared setup clears localStorage between tests and the paper's AREA LABELS are read
 * per variant at call time.
 */

const AREAS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const

beforeAll(async () => {
  setPaperVariant("LW", "UK")
  /*
   * reload, not load: acca-content-boot.ts has already pre-filled the registry for
   * every paper at its DEFAULT variant, which for LW is GLOBAL.
   */
  await reloadPaperContent("LW")
})

describe("LW-ENG content contract", () => {
  // Runs after the shared setup's localStorage clear, so the variant is UK in every test.
  beforeEach(() => setPaperVariant("LW", "UK"))

  it("teaches the ENG syllabus as a chapter tree, not one chapter per area", () => {
    const chapters = chaptersForPaper("LW")
    expect(chapters).toHaveLength(LW_ENG_CONTENT_TARGET.chapters)
    expect(hasChapterTree("LW")).toBe(true)
    expect([...new Set(chapters.map((c) => c.area))].sort()).toEqual([...AREAS])
    for (const area of AREAS) {
      expect(chaptersForArea("LW", area).length, `area ${area}`).toBeGreaterThan(0)
    }
    const keys = chapters.map(chapterKey)
    expect(new Set(keys).size, "unique chapter keys").toBe(keys.length)
    for (const key of keys) expect(getChapterByKey("LW", key), key).toBeDefined()
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: LW_ENG_CONTENT_TARGET.chapters }, (_, i) => i + 1),
    )
    /*
     * The two areas with no Global counterpart at all, and the reason ENG needs more
     * chapters than Global despite being the same paper. Area B is the whole English law
     * of obligations — contract from formation to remedies, then tort and professional
     * negligence — and Area C is employment law, where Global's Area C is transport and
     * payment.
     */
    expect(chaptersForArea("LW", "B").length, "Area B chapters").toBeGreaterThanOrEqual(14)
    expect(chaptersForArea("LW", "C").length, "Area C chapters").toBeGreaterThanOrEqual(5)
    // And the ids must be the ENG series, so learner progress cannot collide with Global.
    expect(chapters.every((c) => c.id?.startsWith("LWE-")), "ENG chapter ids").toBe(true)
  })

  it("gives every chapter the full teaching apparatus", () => {
    for (const chapter of chaptersForPaper("LW")) {
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
   * A law paper is not computed, so the FA/MA test for formula blocks makes no sense
   * here. The equivalent is that a chapter teaching an applied rule must WORK a
   * scenario — identify the rule, apply its elements to the facts, conclude — because
   * that is what the exam rewards. Every ENG chapter carries at least one.
   */
  it("works a scenario in every chapter, applying a rule being the skill", () => {
    for (const chapter of chaptersForPaper("LW")) {
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
    const authored = getQuestions("LW")
    const drills = getDrills("LW")

    expect(authored).toHaveLength(LW_ENG_CONTENT_TARGET.authoredBank)
    expect(drills, "LW-ENG should need no derived drills").toHaveLength(0)
    expect(authored.some((question) => question.recall), "no drill may reach the graded bank").toBe(false)

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
   * LW's Section A is 25 two-mark plus 20 one-mark questions. A bank that cannot supply
   * both values cannot produce a real-shaped sitting whatever its size — which is why the
   * kit builders take marks as an argument rather than fixing them as FA's do.
   */
  it("holds both of the real Section A mark values, in enough depth for three forms", () => {
    const authored = getQuestions("LW")
    const oneMark = authored.filter((q) => q.marks === 1)
    const twoMark = authored.filter((q) => q.marks === 2)

    expect(oneMark.length, "one-mark questions").toBeGreaterThanOrEqual(LW_ENG_CONTENT_TARGET.minOneMarkQuestions)
    expect(twoMark.length, "two-mark questions").toBeGreaterThanOrEqual(LW_ENG_CONTENT_TARGET.minTwoMarkQuestions)
    // Nothing outside the two values the real exam uses.
    expect(oneMark.length + twoMark.length).toBe(authored.length)
    // Both values must be spread across the syllabus, not confined to a couple of areas.
    expect(new Set(oneMark.map((q) => q.area)).size, "one-mark areas").toBeGreaterThanOrEqual(6)
    expect(new Set(twoMark.map((q) => q.area)).size, "two-mark areas").toBeGreaterThanOrEqual(6)
    // The floors must genuinely support three sittings of the real composition.
    expect(LW_ENG_CONTENT_TARGET.minOneMarkQuestions)
      .toBe(LW_ENG_CONTENT_TARGET.mockForms * LW_ENG_CONTENT_TARGET.sectionAOneMarkQuestions)
    expect(LW_ENG_CONTENT_TARGET.minTwoMarkQuestions)
      .toBe(LW_ENG_CONTENT_TARGET.mockForms * LW_ENG_CONTENT_TARGET.sectionATwoMarkQuestions)
    // And the composition itself must add up to the section's marks.
    expect(
      LW_ENG_CONTENT_TARGET.sectionATwoMarkQuestions * 2 + LW_ENG_CONTENT_TARGET.sectionAOneMarkQuestions,
    ).toBe(LW_ENG_CONTENT_TARGET.sectionAMarks)
  })

  it("uses no numeric entry, because nothing in a law paper is computed", () => {
    const numeric = getQuestions("LW").filter((question) => question.type === "number")
    expect(numeric).toHaveLength(LW_ENG_CONTENT_TARGET.numericQuestions)
  })

  it("indexes the question kit to the chapters it examines", () => {
    const chapterKeys = new Set(chaptersForPaper("LW").map(chapterKey))
    const kit = getQuestions("LW").filter((question) => question.chapter)
    expect(kit.length).toBeGreaterThanOrEqual(LW_ENG_CONTENT_TARGET.kitQuestions)
    for (const question of kit) {
      expect(chapterKeys.has(question.chapter!), `${question.id} → ${question.chapter}`).toBe(true)
      const chapter = getChapterByKey("LW", question.chapter!)
      expect(chapter?.area, `${question.id} area vs chapter`).toBe(question.area)
    }
    /*
     * Every chapter must be examined. A bank can satisfy its headline total while
     * leaving whole chapters untested, which is the failure mode a per-chapter kit
     * exists to prevent.
     */
    for (const chapter of chaptersForPaper("LW")) {
      const forChapter = kit.filter((question) => question.chapter === chapterKey(chapter))
      expect(forChapter.length, `${chapterKey(chapter)} kit size`)
        .toBeGreaterThanOrEqual(LW_ENG_CONTENT_TARGET.minQuestionsPerChapter)
    }
  })

  it("serves Section B as authored MTQs at the real 6-mark unit size", () => {
    const cases = getOtCases("LW")
    expect(cases).toHaveLength(LW_ENG_CONTENT_TARGET.mtqUnits)
    // Three disjoint sittings of five.
    expect(LW_ENG_CONTENT_TARGET.mtqUnits).toBe(
      LW_ENG_CONTENT_TARGET.mockForms * (LW_ENG_CONTENT_TARGET.sectionBMarks / LW_ENG_CONTENT_TARGET.mtqMarks),
    )

    const linked = cases.flatMap((item) => item.questions)
    expect(new Set(linked.map((q) => q.id)).size, "unique linked ids").toBe(linked.length)
    expect(new Set(linked.map((q) => q.stem.trim().toLowerCase())).size, "unique linked stems").toBe(linked.length)

    const areaSet = new Set(getPaper("LW")?.areas.map((a) => a.code))
    for (const item of cases) {
      expect(otCaseMarks(item), `${item.id} marks`).toBe(LW_ENG_CONTENT_TARGET.mtqMarks)
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
    expect(blueprint?.sections.find((s) => s.id === "A")?.marks).toBe(LW_ENG_CONTENT_TARGET.sectionAMarks)
    expect(blueprint?.sections.find((s) => s.id === "B")?.marks).toBe(LW_ENG_CONTENT_TARGET.sectionBMarks)
    expect(MOCK_FORMS).toBe(LW_ENG_CONTENT_TARGET.mockForms)

    const sectionBIds: string[][] = []
    for (let form = 1; form <= LW_ENG_CONTENT_TARGET.mockForms; form++) {
      const mock = buildCbeMock("LW", form)
      expect(mock.totalMarks, `form ${form} marks`).toBe(100)
      const sectionA = mock.sections.find((s) => s.id === "A")
      const sectionB = mock.sections.find((s) => s.id === "B")
      expect(sectionA?.marks, `form ${form} Section A`).toBe(LW_ENG_CONTENT_TARGET.sectionAMarks)
      expect(sectionB?.marks, `form ${form} Section B`).toBe(LW_ENG_CONTENT_TARGET.sectionBMarks)
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

    // The three forms' Section B must be genuinely DISJOINT — a block of five each.
    for (const ids of sectionBIds) expect(ids, "five MTQs per form").toHaveLength(5)
    const allIds = sectionBIds.flat()
    expect(new Set(allIds).size, "three disjoint sittings of five").toBe(allIds.length)
    expect(new Set(allIds).size).toBe(LW_ENG_CONTENT_TARGET.mtqUnits)
  })

  it("has no written questions, because LW's exam has no constructed-response section", () => {
    expect(getPaper("LW")?.objectiveOnly).toBe(true)
    expect(getWrittenQuestions("LW")).toHaveLength(LW_ENG_CONTENT_TARGET.writtenQuestions)
  })

  it("builds a diagnostic that spans every syllabus area from authored questions", () => {
    const diagnostic = buildDiagnostic("LW", 42)
    expect(new Set(diagnostic.map((q) => q.area)).size).toBe(LW_ENG_CONTENT_TARGET.syllabusAreas)
    expect(diagnostic.every((q) => q.paper === "LW"), "own paper only").toBe(true)
    expect(diagnostic.some((q) => q.recall), "diagnostic must be drill-free").toBe(false)
  })

  /*
   * The ENG variant must describe its OWN syllabus. Three of the eight area labels differ
   * from Global, and this is the mirror of the assertion in the Global contract test.
   */
  it("labels the syllabus areas with the ENG variant's own names", () => {
    const areas = new Map((getPaper("LW")?.areas ?? []).map((a) => [a.code, a.label]))
    expect(areas.get("B")).toMatch(/law of obligations/i)
    expect(areas.get("C")).toMatch(/employment/i)
    expect(areas.get("G")).toMatch(/insolvency/i)
    // And they must not have picked up the Global wording.
    expect(areas.get("B")).not.toMatch(/international business transactions/i)
    expect(areas.get("C")).not.toMatch(/transportation and payment/i)
    expect(areas.get("G")).not.toMatch(/difficulty or in crisis/i)
  })

  /*
   * The defect that made the old UK variant nearly cosmetic. A learner selecting United
   * Kingdom must now get English law throughout and none of Global's material — no CISG,
   * no Incoterms, no bills of lading — and must get the UK statutes their exam examines.
   */
  it("serves English law only, with none of the Global variant's subject matter", () => {
    const source = JSON.stringify({
      chapters: chaptersForPaper("LW"),
      questions: getQuestions("LW"),
      cases: getOtCases("LW"),
    })
    for (const globalOnly of ["CISG", "Incoterms", "bill of lading", "letter of credit"]) {
      expect(source.toLowerCase(), `must not teach ${globalOnly}`).not.toContain(globalOnly.toLowerCase())
    }
    for (const engOnly of ["Companies Act 2006", "Partnership Act 1890", "Insolvency Act 1986"]) {
      expect(source, `must teach ${engOnly}`).toContain(engOnly)
    }
  })
})
