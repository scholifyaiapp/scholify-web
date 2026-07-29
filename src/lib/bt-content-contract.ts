/*
 * BT's own content contract.
 *
 * BT used to share the F1–F4 contract: 350 Section A items and 350 linked
 * Section B questions for every one of BT, MA, FA and LW. Both numbers were
 * fictions for BT in different ways.
 *
 * The 350 Section A items were 174 authored questions padded with 176 prompts
 * permuted out of the study text. The 350 linked Section B questions were 8
 * authored ones plus 342 synthesised by a generator that produced stems reading
 * "In review 7, situation 2 at Grove Co, which syllabus concept should be
 * applied?" — worth 1 mark each, grouped four to a "case".
 *
 * The real BT exam's Section B is SIX multi-task questions worth FOUR marks each.
 * So BT now has its own contract, sized to the real paper: an authored bank with
 * no filler, and enough authored MTQs to compose three disjoint mocks at the real
 * unit size.
 */

export const BT_CONTENT_TARGET = {
  /** Authored, exam-standard Section A questions. No derived drills count here. */
  authoredBank: 454,
  /** Study chapters in the reading tree, one per syllabus sub-topic group. */
  chapters: 26,
  /** Official syllabus areas the chapters must cover between them. */
  syllabusAreas: 6,
  /**
   * Authored Section B multi-task questions. Three mocks × six MTQs = 18, so this
   * is exactly enough for three DISJOINT sittings at the real unit size.
   */
  mtqUnits: 18,
  /** Marks per MTQ in the real BT exam. */
  mtqMarks: 4,
  /** Section A marks in the real exam: 30 × 2 + 16 × 1. */
  sectionAMarks: 76,
  /** Section B marks in the real exam: 6 MTQs × 4. */
  sectionBMarks: 24,
  mockForms: 3,
  /** BT's exam is 100% objective test — there is no constructed-response section. */
  writtenQuestions: 0,
} as const
