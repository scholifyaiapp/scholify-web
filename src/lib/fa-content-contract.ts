/*
 * FA's own content contract, following the pattern BT and MA established.
 *
 * FA used to share the F1–F4 contract: 350 Section A items and 350 linked Section B
 * questions. Both were fictions for FA, in different ways.
 *
 * The 350 Section A items were 181 authored questions padded with 169 prompts
 * permuted out of the study text. The 350 linked Section B questions were generated
 * by a routine that produced ratio-analysis cases with stems reading "What is Grove
 * Co's gross profit margin in analysis 12?" — and it produced them against the WRONG
 * AREA entirely.
 *
 * FA's real exam is 35 objective-test questions of 2 marks (70) plus TWO multi-task
 * questions of FIFTEEN marks (30), and the published blueprint names the two areas
 * those MTQs cover: CONSOLIDATIONS and ACCOUNTS PREPARATION, the latter including a
 * statement of cash flows. Interpretation is examined in Section A. The old
 * generated cases were all interpretation, and the exam-structure label said so too
 * — both are corrected by this rebuild.
 */

export const FA_CONTENT_TARGET = {
  /** Authored, exam-standard Section A questions. Derived drills do not count. */
  authoredBank: 534,
  /** Study chapters in the reading tree, one per syllabus sub-topic group. */
  chapters: 31,
  /** Official syllabus areas the chapters must cover between them. */
  syllabusAreas: 9,
  /**
   * Authored Section B multi-task questions. Three mocks × two MTQs = 6, so this is
   * exactly enough for three DISJOINT sittings at the real unit size.
   */
  mtqUnits: 6,
  /** Marks per MTQ in the real FA exam. */
  mtqMarks: 15,
  /** Section A marks in the real exam: 35 × 2. */
  sectionAMarks: 70,
  /** Section B marks in the real exam: 2 MTQs × 15. */
  sectionBMarks: 30,
  mockForms: 3,
  /** FA's exam is 100% objective test — there is no constructed-response section. */
  writtenQuestions: 0,
  /**
   * The two areas the real exam's Section B draws on, per the published blueprint:
   * G (preparing financial statements, including a statement of cash flows) and
   * H (preparing basic consolidated financial statements).
   *
   * The MTQ bank holds three of each rather than six of one, and they are ordered
   * ALTERNATELY in acca-cases-fa.ts so that the mock composer's rotate-by-form
   * always yields one of each per sitting.
   */
  mtqAreas: ["G", "H"] as const,
  /**
   * Every Section A question must be worth exactly this many marks. FA's real
   * Section A is thirty-five 2-mark questions, so a 1-mark or 3-mark item could not
   * appear in the real exam and would stop the mock composer reaching exactly 70.
   * This is why acca-fa-kit-builders.ts fixes marks rather than taking them as an
   * argument.
   */
  sectionAMarksPerQuestion: 2,
  /**
   * FA is computational from Area D onward, so a substantial share of the bank must
   * be numeric ENTRY rather than multiple choice: a calculation offered as four
   * options can be reverse-engineered from the options, which tests something easier
   * than the exam does.
   */
  minNumericQuestions: 70,
} as const
