/*
 * WHICH PAPERS ARE FINISHED, AND WHICH ARE STILL BEING BUILT.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────
 * The engine serves ONE CHAPTER A DAY. So a paper's chapter count is not a
 * content statistic, it is the length of the course:
 *
 *     BT   26 chapters   ~26 study days
 *     FM   10 chapters   ~10 study days
 *     APM   5 chapters   ~5  study days
 *
 * Someone buying a three-month FM plan would exhaust every chapter inside two
 * weeks and drop into revision. That is not a thin feature, it is a promise the
 * product cannot keep — and the moment money is involved it is the kind of thing
 * that earns a refund request and a public review.
 *
 * Seven papers are genuinely finished. The other eight are mid-rebuild (see
 * acca-study-fm-tree-a.ts for the shape that rebuild takes). Until each one is
 * done, a learner choosing it should be TOLD, before they choose — not after
 * they have paid.
 *
 * ── WHY THE LIST IS STATIC BUT NOT TRUSTED ──────────────────────
 * Chapter content is lazy-loaded per paper, so the picker cannot count chapters
 * at render time — it would have to download all fifteen papers to draw one
 * screen. Hence a static list.
 *
 * A static list rots. So the accompanying test recomputes it from the real
 * chapter counts and fails if the two disagree: the day FM crosses the
 * threshold, the suite goes red until FM is removed from this list. The label
 * cannot quietly outlive the problem it describes.
 */

/**
 * Chapters a paper needs before its course is long enough to sell.
 *
 * Set at 20 because the approved-provider texts organise these syllabuses into
 * roughly 20–35 chapters, and because at one chapter a day that is a month of
 * distinct teaching — enough that a learner on a normal exam runway meets new
 * material throughout, rather than running out and revising for two months.
 */
export const FULL_DEPTH_CHAPTERS = 20

/**
 * Papers whose chapter tree is still being rebuilt.
 *
 * Kept in ACCA's own order. Remove a paper the moment its rebuild lands — the
 * test will tell you when that is.
 */
export const DEVELOPING_PAPERS: readonly string[] = [
  // FM and AA were both here. Their rebuilds landed on 11 Aug 2026:
  //   FM  8 chapters  → 25, across all eight syllabus areas
  //   AA  6 chapters  → 26, across all six
  // SBL followed on 17 Aug 2026: 10 chapters → 46, across all ten areas, and
  // ~9,900 words → ~40,400. It was the hardest of the three, because seven of
  // its ten areas were not thin content but a relabelling shim deriving one
  // area's chapters from another's.
  // In each case this file's test is what told us the paper had crossed the
  // line, by going red until the entry was removed.
  // SBR followed on 17 Aug 2026: 7 shim-served areas → 38 authored chapters
  // (SBR-01..38) across all seven official areas, and the five legacy files
  // deleted.
  // AFM followed on 18 Aug 2026: 7 chapters → 42 (AFM-01..42) across all five
  // technical areas, ~12,000 words → ~44,000, and all five legacy files
  // deleted. Its shim was a straight 1:1 relabel rather than a subset() re-cut,
  // so the defect was depth alone.
  // APM followed on 19 Aug 2026: 5 chapters → 40 (APM-01..40) across all SIX
  // official areas, and all four legacy files deleted. Its shim was the worst
  // of them — areas COMPOSED by a take() helper from several legacy chapters
  // at once — and Area F did not exist at all.
  // ATX followed on 19 Aug 2026: 5 chapters → 33 (ATX-01..33), all five legacy
  // files deleted. Its shim was a different species again — content FILTERED at
  // load time by a currentOnly() helper, because Finance Act 2025 had made the
  // FA23 overseas material actively wrong rather than merely thin.
  // AAA followed on 19 Aug 2026: 9 chapters → 30 (AAA-01..30) across all NINE
  // official areas, the largest area count in the library, with all five legacy
  // files deleted.
  //
  // THE LIST IS NOW EMPTY, AND THAT IS THE POINT. Every paper in the
  // qualification — nine Applied Skills and six Strategic Professional — has a
  // full authored chapter tree. The array is kept rather than deleted because
  // the flag will be needed again the moment a syllabus is restructured or a
  // new paper is added, and because its test is what proves the list still
  // matches reality. Add a paper here the day its content falls short.
] as const

/** True when this paper's course is still short of full length. */
export function isDeveloping(paperId: string | null | undefined): boolean {
  return Boolean(paperId) && DEVELOPING_PAPERS.includes(paperId as string)
}

/**
 * The one-line warning shown beside a paper that is still being built.
 *
 * Deliberately concrete about what is thin and what is not: the question bank,
 * flashcards and the whole practice engine are complete for every paper — it is
 * the reading chapters that are short. A vague "coming soon" would undersell
 * what is there and tell the learner nothing useful.
 */
export const DEVELOPING_NOTE =
  "Reading chapters still being written — practice, quizzes and flashcards are complete."
