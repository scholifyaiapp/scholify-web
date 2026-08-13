import { describe, it, expect } from "vitest"
import { loadPaperContent } from "@/lib/acca-paper-content"
import { paperContent } from "@/lib/acca-content-registry"
import { loadExamPlans, applyExamPlans, PLANNED_PAPERS } from "@/lib/acca-exam-plans"
import { chapterKey } from "@/lib/acca-study-content"
import type { StudyBlock, StudyChapter } from "@/lib/acca-study-content"

/*
 * The exam-plan layer's contract.
 *
 * The failure this suite exists to catch is SILENT: a plan keyed to a section id
 * that no longer exists — a retitled slug, a typo, a chapter split in two —
 * renders as nothing at all, and a section with a missing plan is visually
 * identical to one that was never planned. Nobody would notice until a learner
 * did. So an unmatched key is a test failure, not a console warning.
 *
 * The rest of the suite enforces that a plan is a PLAN: a route of three to six
 * steps, sized to a question the paper actually sets.
 */

/** Formats and mark values each paper's real exam uses — see acca-exam-structure.ts. */
const LEGAL: Record<string, Partial<Record<"ot" | "mtq" | "written", number[]>>> = {
  BT: { ot: [1, 2], mtq: [4] },
  MA: { ot: [2], mtq: [10] },
  FA: { ot: [2], mtq: [15] },
  LW: { ot: [1, 2], mtq: [6] },
  PM: { ot: [2], mtq: [10], written: [10, 15, 20] },
  TX: { ot: [2], mtq: [10], written: [10, 15, 20] },
  FR: { ot: [2], mtq: [10], written: [10, 15, 20] },
  AA: { mtq: [10], written: [4, 5, 6, 8, 10, 20] },
  FM: { ot: [2], mtq: [10], written: [10, 15, 20] },
}

const isPlan = (b: StudyBlock): b is Extract<StudyBlock, { kind: "examQuestion" }> =>
  b.kind === "examQuestion"

/**
 * Sections already carrying a plan, per paper. Raise as each syllabus area lands.
 * Equal to the paper's section count = that paper is finished and gated.
 */
const COVERAGE_FLOOR: Record<string, number> = {
  BT: 119, // complete — equals the paper's section count, so this is now the gate
  MA: 106, // complete
  FA: 92, // complete
  LW: 80, // LW-Global, the variant the registry loads by default
  PM: 70, // complete
  TX: 56, // TX-UK complete; TX-Global is a generated foundation track and is deliberately unplanned
  FR: 99, // complete
  AA: 42, // Areas A, B and C of 72 — in progress
}

/**
 * Variant trees the registry never loads at its default setting, with their own
 * floors. Without this, LW-ENG's 87 sections would have no regression protection
 * at all: `paperContent("LW")` returns LW-Global, so the suite above cannot see
 * them, and a rename inside an LWE chapter would silently drop a plan.
 */
const VARIANT_FLOOR: { label: string; paper: string; floor: number; load: () => Promise<StudyChapter[]> }[] = [
  {
    label: "LW-ENG",
    paper: "LW",
    floor: 87, // complete
    load: async () => (await import("@/lib/acca-study-lw-eng")).LW_ENG_CHAPTERS,
  },
]

describe.each(VARIANT_FLOOR)("$label exam plans", ({ label, paper, floor, load }) => {
  it("never loses coverage it has already gained", async () => {
    const plans = await loadExamPlans(paper)
    const result = applyExamPlans(await load(), plans)
    const sections = result.chapters.reduce((n, c) => n + c.sections.length, 0)
    const covered = result.chapters.reduce(
      (n, c) => n + c.sections.filter((s) => s.blocks.some(isPlan)).length,
      0,
    )
    expect(result.unused, `plan keys matching no section in ${label}`).toEqual([])
    expect(floor, `${label} floor exceeds its own section count`).toBeLessThanOrEqual(sections)
    expect(covered, `${label} sections carrying an exam plan`).toBeGreaterThanOrEqual(floor)
  })

  it("only sets questions this paper actually asks", async () => {
    const plans = await loadExamPlans(paper)
    const result = applyExamPlans(await load(), plans)
    for (const ch of result.chapters) {
      for (const s of ch.sections) {
        for (const p of s.blocks.filter(isPlan)) {
          const allowed = LEGAL[paper]?.[p.format]
          expect(allowed, `${label} ${chapterKey(ch)}::${s.id} uses ${p.format}`).toBeTruthy()
          expect(allowed, `${label} ${chapterKey(ch)}::${s.id} is ${p.marks} marks`).toContain(p.marks)
        }
      }
    }
  })
})

describe.each(PLANNED_PAPERS)("%s exam plans", (paperId) => {
  it("every plan key matches a real section", async () => {
    await loadPaperContent(paperId)
    const plans = await loadExamPlans(paperId)
    // Apply to the ORIGINAL chapters. paperContent() already carries the merged
    // layer, so re-applying there would double every block and hide nothing.
    const chapters = paperContent(paperId).chapters.map((c) => ({
      ...c,
      sections: c.sections.map((s) => ({ ...s, blocks: s.blocks.filter((b) => !isPlan(b)) })),
    }))
    const result = applyExamPlans(chapters, plans)
    expect(result.unused, `plan keys matching no section in ${paperId}`).toEqual([])
    /*
     * Applied may be FEWER than the plans authored, on a paper that ships as two
     * variants under one id: LW loads either the LWG or the LWE tree, never both,
     * so the inactive variant's plans are legitimately not applied. What must hold
     * is that every plan whose chapter IS loaded was applied — which `unused`
     * above already asserts.
     */
    expect(result.applied).toBeGreaterThan(0)
    expect(result.applied).toBeLessThanOrEqual(Object.keys(plans).length)
  })

  /*
   * A RATCHET, not a finish line.
   *
   * Asserting "every section has a plan" the moment a paper's first area lands
   * would put the suite red for as long as the paper takes to author, and a
   * permanently red suite is one nobody reads — it would be skipped within the
   * day and the real gate lost. So the floor records how far the paper has got
   * and only forbids going backwards. Raise it as each area lands; when it equals
   * the paper's section count it has become the completeness gate, and the
   * `expect(floor).toBeLessThanOrEqual(sections)` below is what stops a floor
   * being raised past what was actually written.
   */
  it("never loses coverage it has already gained", async () => {
    await loadPaperContent(paperId)
    const chapters = paperContent(paperId).chapters
    const sections = chapters.reduce((a, ch) => a + ch.sections.length, 0)
    const covered = chapters.reduce(
      (a, ch) => a + ch.sections.filter((s) => s.blocks.some(isPlan)).length,
      0,
    )
    const floor = COVERAGE_FLOOR[paperId] ?? 0
    expect(floor, `${paperId} floor exceeds its own section count`).toBeLessThanOrEqual(sections)
    expect(covered, `${paperId} sections carrying an exam plan`).toBeGreaterThanOrEqual(floor)
  })

  it("teaches a route, not a label", async () => {
    await loadPaperContent(paperId)
    for (const ch of paperContent(paperId).chapters) {
      for (const s of ch.sections) {
        for (const p of s.blocks.filter(isPlan)) {
          const where = `${chapterKey(ch)}::${s.id}`
          // Three steps is the floor: fewer is a restatement of the requirement.
          // Six is the ceiling: a plan nobody can hold in their head under time
          // pressure is not a plan they will use.
          expect(p.plan.length, `${where} plan steps`).toBeGreaterThanOrEqual(3)
          expect(p.plan.length, `${where} plan steps`).toBeLessThanOrEqual(6)
          expect(p.requirement.length, `${where} requirement`).toBeGreaterThan(20)
          expect(p.answer.length, `${where} answer`).toBeGreaterThan(80)
          expect(p.title.length, `${where} title`).toBeGreaterThan(8)
          for (const step of p.plan) {
            expect(step.step.length, `${where} step label`).toBeGreaterThan(3)
            expect(step.detail.length, `${where} step detail`).toBeGreaterThan(25)
          }
        }
      }
    }
  })

  it("only sets questions this paper actually asks", async () => {
    await loadPaperContent(paperId)
    const legal = LEGAL[paperId]
    expect(legal, `no legal formats recorded for ${paperId}`).toBeTruthy()
    for (const ch of paperContent(paperId).chapters) {
      for (const s of ch.sections) {
        for (const p of s.blocks.filter(isPlan)) {
          const allowed = legal![p.format]
          expect(allowed, `${chapterKey(ch)}::${s.id} uses ${p.format}, which ${paperId} does not set`).toBeTruthy()
          expect(allowed, `${chapterKey(ch)}::${s.id} is ${p.marks} marks`).toContain(p.marks)
        }
      }
    }
  })
})
