/*
 * LW-ENG's own content contract, completing the set begun by BT, MA, FA and LW-Global.
 *
 * ── Why the ENG variant needed its own ─────────────────────────
 * LW-ENG was the last paper on the shared F1–F4 contract, which asserted 350 Section A
 * items and 350 linked Section B questions — both fictions for this paper, and it left
 * ENG the weakest variant in the library:
 *
 *   · The syllabus was taught in FOUR area-chapters covering EIGHT syllabus areas, with
 *     the migrated sections carrying no examples, tables, traps or checks.
 *   · Section B was padded to 350 generated linked questions, when the real exam has
 *     FIVE multi-task questions of SIX marks.
 *   · Worst of all, the variant switch was very nearly cosmetic on the study side: a
 *     learner who selected United Kingdom read the GLOBAL reading tree with one
 *     UK-flavoured overlay section prepended to chapter 1, so they studied the CISG and
 *     international transport — neither of which is on their exam — while missing the
 *     law of obligations and employment law, which are.
 *
 * ── The mark mix, and why it is policed here ───────────────────
 * LW's real Section A is 25 questions of 2 marks PLUS 20 of 1 mark — 45 questions for
 * 70 marks. So this contract polices a MARK MIX rather than a single value, exactly as
 * LW-Global's does: a bank of only 2-mark questions can reach 70 marks but never in the
 * real exam's shape.
 *
 * ── Why the numbers differ from LW-Global's ────────────────────
 * ENG carries MORE chapters than Global (46 against 33) because its syllabus is larger
 * where it differs: the law of obligations alone takes sixteen chapters, covering English
 * contract law from formation to remedies and then tort and professional negligence.
 * Global's Area B is the CISG and Incoterms, which is a narrower body of material. The
 * exam shape is identical because it is the same paper.
 */

export const LW_ENG_CONTENT_TARGET = {
  /**
   * Authored, exam-standard Section A questions. Derived DRILLS do not count, and there
   * are none. The figure is the whole authored bank as the loader serves it: 378 from the
   * per-chapter kits, plus the chapters' own inline `check` questions promoted into the
   * bank — which are authored too, one per section, not machine-permuted.
   */
  authoredBank: 432,
  /** The per-chapter kits alone, excluding the promoted chapter checks. */
  kitQuestions: 378,
  /** Study chapters in the reading tree, one per syllabus sub-topic group. */
  chapters: 46,
  /** Official syllabus areas the chapters must cover between them. */
  syllabusAreas: 8,
  /**
   * Authored Section B multi-task questions. Three mocks × five MTQs = 15, so this is
   * exactly enough for three DISJOINT sittings at the real unit size.
   */
  mtqUnits: 15,
  /** Marks per MTQ in the real LW exam. */
  mtqMarks: 6,
  /** Section A marks in the real exam: 25 × 2 plus 20 × 1. */
  sectionAMarks: 70,
  /** Section B marks in the real exam: 5 MTQs × 6. */
  sectionBMarks: 30,
  mockForms: 3,
  /** LW's exam is 100% objective test — there is no constructed-response section. */
  writtenQuestions: 0,
  /**
   * The real Section A's composition. Both values are examinable facts about the paper,
   * and together they are why the bank must hold both mark values.
   */
  sectionATwoMarkQuestions: 25,
  sectionAOneMarkQuestions: 20,
  /**
   * Floors on each mark value, sized for three disjoint forms: 3 × 20 one-mark and
   * 3 × 25 two-mark. Below either floor the paper cannot compose three real-shaped
   * sittings, however large the bank is in total.
   */
  minOneMarkQuestions: 60,
  minTwoMarkQuestions: 75,
  /**
   * LW is a LAW paper. Nothing in it is computed, so a numeric-entry question would be
   * measuring the wrong skill — and the contract test asserts there are none.
   */
  numericQuestions: 0,
  /**
   * Every chapter must carry at least this many authored questions. The bank could
   * satisfy `authoredBank` while leaving whole chapters unexamined, which is exactly the
   * failure mode a per-chapter kit exists to prevent.
   */
  minQuestionsPerChapter: 5,
} as const
