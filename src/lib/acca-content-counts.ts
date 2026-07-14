/*
 * Scholify — how many curated questions each paper's bank holds.
 *
 * This is METADATA, not content: it is a handful of integers, it is always eager,
 * and it exists so the app can answer "how much of this paper have I covered?"
 * for a paper whose 150–225 questions have NOT been downloaded. The paper picker
 * shows a readiness % for every paper the student has ever touched; coverage is
 * `distinct questions attempted / bank size`, so without this map every unloaded
 * paper's readiness would silently collapse toward the accuracy-only term.
 *
 * `npm run audit:content` asserts these numbers against the real banks, so they
 * cannot drift out of sync with the content.
 */
export const QUESTION_COUNTS: Record<string, number> = {
  BT: 150,
  MA: 150,
  FA: 150,
  LW: 150,
  PM: 168,
  TX: 225,
  FR: 225,
  AA: 150,
  FM: 150,
  SBL: 150,
  SBR: 150,
  AFM: 150,
  APM: 150,
  ATX: 150,
  AAA: 150,
}

/** Bank size for a paper — 0 for a paper with no curated bank. */
export function questionCount(paperId: string): number {
  return QUESTION_COUNTS[paperId] ?? 0
}
