/*
 * THE EXAM-PLAN LAYER — every section taught by the question it is examined by.
 *
 * ── What this adds ──────────────────────────────────────────────
 * The chapter tree teaches the topic. It does not teach the QUESTION. A learner
 * finishes a section understanding materiality, and still cannot answer "Explain
 * the concept of materiality and describe how the auditor determines it. (6
 * marks)", because nobody ever showed them the move from a requirement to a
 * structured six-mark answer. That move is a teachable skill and it was the one
 * thing the library never taught.
 *
 * So every section gets an `examQuestion` block: the requirement, the PLAN for
 * answering it, the model answer, and where the marks are won and thrown away.
 *
 * ── Why the plans are not written into the tree files ───────────
 * They could have been appended to each section's `blocks` array in place. The
 * tree files are 90–160 KB each and there are ~50 of them across F1–F9; editing
 * 772 sections inside them means rewriting roughly six megabytes of source to add
 * content that is conceptually a separate layer. Worse, it makes the work
 * invisible — a half-finished paper looks exactly like a finished one, because a
 * section with no plan renders no differently from a section with one.
 *
 * Keeping the layer separate buys three things:
 *   · the tree files are never touched, so this work cannot collide with content
 *     edits happening in the same chapters;
 *   · coverage is countable (`npm run census:plans`) and gateable;
 *   · a key that matches no section is an ERROR rather than silence, which is the
 *     failure mode that would otherwise eat a whole area's plans on one typo.
 *
 * ── The key ─────────────────────────────────────────────────────
 * `"<chapterKey>::<sectionId>"`, e.g. `"BT-01::what-is-an-organisation"`.
 * Section ids are slugs and are only unique WITHIN a chapter, so the chapter key
 * has to be part of it. Both halves are stable ids that learner progress already
 * depends on, so neither moves under a retitle.
 */

import type { StudyChapter, ExamQuestionBlock } from "@/lib/acca-study-content"

/**
 * The same rule as `chapterKey` in acca-study-content, deliberately duplicated.
 *
 * That module imports acca-content-boot for its synchronous getters, and the boot
 * imports the loader, which imports this file — so importing the function rather
 * than the types closes a cycle and the loader dies on a
 * "Cannot access QUESTION_MODULES before initialization" at startup. Three lines
 * of duplication is the cheaper side of that trade; the shape is fixed by learner
 * progress records and cannot drift.
 */
function keyOf(chapter: StudyChapter): string {
  return chapter.id ?? `${chapter.paper}-${chapter.area}`
}

/** A paper's plans, keyed by `"<chapterKey>::<sectionId>"`. */
export type ExamPlanMap = Record<string, ExamQuestionBlock>

type Loader = () => Promise<{ default?: ExamPlanMap } & Record<string, unknown>>

/**
 * Where each paper's plans live. One module per syllabus area keeps the files to
 * a readable size and matches how the trees themselves are split.
 */
const PLAN_MODULES: Record<string, Loader[]> = {
  BT: [
    () => import("@/lib/acca-plans-bt-a"),
    () => import("@/lib/acca-plans-bt-b"),
    () => import("@/lib/acca-plans-bt-c"),
    () => import("@/lib/acca-plans-bt-d"),
    () => import("@/lib/acca-plans-bt-ef"),
  ],
  MA: [
    () => import("@/lib/acca-plans-ma-a"),
    () => import("@/lib/acca-plans-ma-b"),
    () => import("@/lib/acca-plans-ma-c"),
    () => import("@/lib/acca-plans-ma-d"),
    () => import("@/lib/acca-plans-ma-e"),
    () => import("@/lib/acca-plans-ma-f"),
  ],
  FA: [
    () => import("@/lib/acca-plans-fa-abc"),
    () => import("@/lib/acca-plans-fa-d1"),
    () => import("@/lib/acca-plans-fa-d2"),
    () => import("@/lib/acca-plans-fa-ef"),
    () => import("@/lib/acca-plans-fa-g"),
    () => import("@/lib/acca-plans-fa-hi"),
  ],
  /*
   * LW carries BOTH variants' plans. Only one tree is ever loaded, so the other
   * variant's keys are legitimately unmatched — see the note in applyExamPlans.
   * LWG-nn keys belong to LW-Global, LWE-nn to LW-ENG.
   */
  LW: [
    () => import("@/lib/acca-plans-lwg-a"),
    () => import("@/lib/acca-plans-lwg-b"),
    () => import("@/lib/acca-plans-lwg-cd"),
    () => import("@/lib/acca-plans-lwg-efgh"),
    () => import("@/lib/acca-plans-lwe-a"),
    () => import("@/lib/acca-plans-lwe-b1"),
    () => import("@/lib/acca-plans-lwe-b2"),
    () => import("@/lib/acca-plans-lwe-c"),
    () => import("@/lib/acca-plans-lwe-d"),
    () => import("@/lib/acca-plans-lwe-efgh"),
  ],
  PM: [
    () => import("@/lib/acca-plans-pm-ab"),
    () => import("@/lib/acca-plans-pm-c"),
    () => import("@/lib/acca-plans-pm-d"),
    () => import("@/lib/acca-plans-pm-ef"),
  ],
  /*
   * TX carries plans for the UK variant only, and deliberately.
   *
   * TX-Global is a GENERATED foundation track — seven chapters of one section each,
   * built by AREAS.map in acca-study-tx-global.ts — and its own content states that
   * it "is not an official ACCA jurisdiction exam variant", telling the learner to
   * select the jurisdiction on their exam entry. Attaching exam-question plans to it
   * would contradict that disclaimer and imply it prepares someone for an exam it
   * does not. Its chapters key as TX-A..TX-G against TX-UK's TX-01..TX-29, so
   * nothing here collides with it either way.
   */
  TX: [
    () => import("@/lib/acca-plans-tx-ab"),
    () => import("@/lib/acca-plans-tx-cd"),
    () => import("@/lib/acca-plans-tx-efg"),
  ],
  FR: [
    () => import("@/lib/acca-plans-fr-a"),
    () => import("@/lib/acca-plans-fr-b1"),
    () => import("@/lib/acca-plans-fr-b2"),
    () => import("@/lib/acca-plans-fr-b3"),
    () => import("@/lib/acca-plans-fr-d"),
    () => import("@/lib/acca-plans-fr-ce"),
  ],
  /*
   * AA is the one Applied paper with NO objective-test section of single
   * questions and no Section C: Section A is three OT cases and Section B is
   * seventy marks of constructed response. So its plans are almost entirely
   * `written`, at AA's own allocations of 4, 5, 6, 8, 10 and 20 marks, and
   * the legal-format tables in census-exam-plans.ts and acca-exam-plans.test.ts
   * permit no plain `ot` for this paper at all.
   */
  AA: [
    () => import("@/lib/acca-plans-aa-a"),
    () => import("@/lib/acca-plans-aa-b"),
    () => import("@/lib/acca-plans-aa-c"),
    () => import("@/lib/acca-plans-aa-d"),
    () => import("@/lib/acca-plans-aa-ef"),
  ],
  /*
   * FM supplies its formulae sheet plus present value and annuity tables on
   * screen. Its plans therefore teach candidates to select and apply the
   * provided factor, while preserving the unprovided judgement: which cash
   * flow, timing, tax lag, price base or risk belongs in the calculation.
   * Section C is two 20-mark responses, so the appraisal, working-capital and
   * finance plans use labelled spreadsheet workings that retain method marks.
   */
  FM: [
    () => import("@/lib/acca-plans-fm-ab"),
    () => import("@/lib/acca-plans-fm-c"),
    () => import("@/lib/acca-plans-fm-d"),
  ],
}

/** Papers whose exam-plan layer has been authored. Read by the census and tests. */
export const PLANNED_PAPERS = Object.keys(PLAN_MODULES)

/** Merge every plan module registered for a paper into one map. */
export async function loadExamPlans(paperId: string): Promise<ExamPlanMap> {
  const loaders = PLAN_MODULES[paperId]
  if (!loaders?.length) return {}
  const mods = await Promise.all(loaders.map((l) => l()))
  const merged: ExamPlanMap = {}
  for (const mod of mods) {
    for (const value of Object.values(mod)) {
      if (!value || typeof value !== "object") continue
      for (const [key, plan] of Object.entries(value as ExamPlanMap)) {
        if (!isPlan(plan)) continue
        if (merged[key]) throw new Error(`Duplicate exam plan for ${key} in ${paperId}`)
        merged[key] = plan
      }
    }
  }
  return merged
}

/** A structural guard, so a stray export in a plan module is skipped, not merged. */
function isPlan(value: unknown): value is ExamQuestionBlock {
  const p = value as ExamQuestionBlock
  return Boolean(p) && typeof p === "object"
    && typeof p.title === "string"
    && typeof p.marks === "number"
    && typeof p.requirement === "string"
    && Array.isArray(p.plan)
    && typeof p.answer === "string"
}

/**
 * Append each section's plan to its blocks.
 *
 * The plan goes LAST in the section, after the teaching and before the section's
 * `check` (which the reader draws separately). That order is the pedagogy: learn
 * the topic, then meet the question it is examined by, then be tested on it.
 *
 * Returns new objects — the chapter modules are shared, cached, module-level
 * constants, so mutating them would leak one paper's plans into another render
 * and double them on a reload.
 *
 * `unused` reports keys that matched no section: the silent-failure case this
 * whole layer is designed to make loud.
 */
export function applyExamPlans(
  chapters: StudyChapter[],
  plans: ExamPlanMap,
): { chapters: StudyChapter[]; applied: number; unused: string[] } {
  if (Object.keys(plans).length === 0) return { chapters, applied: 0, unused: [] }

  const seen = new Set<string>()
  let applied = 0

  const next = chapters.map((chapter) => {
    const ck = keyOf(chapter)
    let touched = false
    const sections = chapter.sections.map((section) => {
      const key = `${ck}::${section.id}`
      const plan = plans[key]
      if (!plan) return section
      seen.add(key)
      applied++
      touched = true
      return { ...section, blocks: [...section.blocks, { kind: "examQuestion" as const, ...plan }] }
    })
    return touched ? { ...chapter, sections } : chapter
  })

  /*
   * A key is UNUSED only if its chapter was loaded and the section was not.
   *
   * LW and TX ship as two whole papers under one paper id — LW-Global's chapters
   * are LWG-nn and LW-ENG's are LWE-nn — and only the selected variant's tree is
   * ever loaded. So the other variant's keys are absent by design, not by mistake,
   * and reporting them would make the check cry wolf on every render and force it
   * to be switched off. Filtering on the chapter prefix keeps the check sharp for
   * the failure it exists to catch: a section id that was renamed or mistyped
   * WITHIN a chapter that is loaded, which is the case that silently renders
   * nothing.
   */
  const loadedChapters = new Set(chapters.map(keyOf))
  const unused = Object.keys(plans).filter(
    (k) => !seen.has(k) && loadedChapters.has(k.split("::")[0]),
  )
  return { chapters: next, applied, unused }
}
