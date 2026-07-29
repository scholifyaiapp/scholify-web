/*
 * Scholify — how many questions each paper's bank holds.
 *
 * This is METADATA, not content: it is a handful of integers, it is always eager,
 * and it exists so the app can answer "how much of this paper have I covered?"
 * for a paper whose questions have NOT been downloaded. The paper picker shows a
 * readiness % for every paper the student has ever touched; coverage is
 * `distinct questions attempted / bank size`, so without this map every unloaded
 * paper's readiness would silently collapse toward the accuracy-only term.
 *
 * TWO numbers per paper, because the library holds two different things:
 *
 *   AUTHORED  — exam-standard questions someone wrote: a scenario, a computation,
 *               or a judgement between defensible options. This is the coverage
 *               denominator and the only thing any graded surface measures on.
 *   DRILLS    — retrieval prompts permuted out of the study text (a glossary term
 *               or an exam trap turned into four options). Real revision value,
 *               but not exam-standard, so they are counted separately and never
 *               folded into a readiness number. See PaperContent.drills.
 *
 * These used to be one number — 350 for every paper — which quietly told a
 * learner that a paper's bank was roughly twice the size of its authored content.
 *
 * `npm run audit:content` asserts both maps against the real banks, so they
 * cannot drift out of sync with the content.
 */

/** Authored, exam-standard questions per paper — the coverage denominator. */
export const QUESTION_COUNTS: Record<string, number> = {
  BT: 174,
  MA: 177,
  FA: 181,
  LW: 56,
  PM: 188,
  TX: 237,
  FR: 247,
  AA: 174,
  FM: 177,
  SBL: 185,
  SBR: 180,
  AFM: 174,
  APM: 173,
  ATX: 174,
  AAA: 183,
}

/**
 * Derived recall drills per paper — extra revision volume, never graded.
 *
 * A paper is sized to a combined inventory (350 on most), so its drill count is
 * the shortfall its chapters fill. As authored content lands a paper's drill
 * count falls toward zero.
 */
export const DRILL_COUNTS: Record<string, number> = {
  BT: 176,
  MA: 173,
  FA: 169,
  LW: 294,
  PM: 162,
  TX: 113,
  FR: 103,
  AA: 176,
  FM: 173,
  SBL: 165,
  SBR: 170,
  AFM: 176,
  APM: 177,
  ATX: 176,
  AAA: 167,
}

/** Authored bank size for a paper — 0 for a paper with no curated bank. */
export function questionCount(paperId: string): number {
  return QUESTION_COUNTS[paperId] ?? 0
}

/** Derived recall drills available for a paper. */
export function drillCount(paperId: string): number {
  return DRILL_COUNTS[paperId] ?? 0
}

/** Everything a learner can practise on a paper: authored bank plus drills. */
export function practiceCount(paperId: string): number {
  return questionCount(paperId) + drillCount(paperId)
}
