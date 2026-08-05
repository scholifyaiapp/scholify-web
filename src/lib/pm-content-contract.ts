/*
 * PM's content contract, rewritten for the rebuilt paper.
 *
 * ── What the old contract asserted, and why every figure was wrong ──
 * The previous version read:
 *
 *   sectionA: 350, sectionBQuestions: 350, sectionBCases: 70, sectionC: 50,
 *   flashcards: 150, mixedBanks: 5, mixedBankSize: 30, mockForms: 3
 *
 * Only the last of those described the paper. PM's real exam is 15 Section A objective
 * tests at 2 marks, THREE Section B OT cases of five 2-mark tasks, and TWO Section C
 * constructed responses at 20 marks. So:
 *
 *   · 350 Section A items was an inventory target, not an exam fact, and 106 of them were
 *     machine-derived recall drills presented alongside authored questions.
 *   · 350 "Section B questions" and 70 cases described a generated Section B — 70 cases is
 *     23 sittings' worth of a paper that examines three, and they were composed by
 *     completePmSectionB rather than authored.
 *   · sectionC: 50 counted questions of 9 and 10 marks. PM's Section C is 20 marks a
 *     question and there is no 10-mark constructed response anywhere in the paper.
 *   · The study side was worse than any of these: FOUR area-chapters for a FIVE-area
 *     syllabus, so Area E — performance measurement and control, and 40 of the 100 marks
 *     through Section C — had no chapter at all.
 *
 * ── What this contract polices instead ──────────────────────────
 * The real exam's composition, and the authored content needed to compose three DISJOINT
 * sittings of it. Every figure below is either a fact about the ACCA exam or a floor
 * derived from one, and the test file asserts each against what the loader actually serves.
 */

export const PM_CONTENT_TARGET = {
  /* ── The real exam ──────────────────────────────────────────── */

  /** Section A: 15 objective tests × 2 marks. */
  sectionAQuestions: 15,
  sectionAMarks: 30,
  /** Section B: 3 OT cases × 5 questions × 2 marks. */
  sectionBCases: 3,
  sectionBQuestionsPerCase: 5,
  sectionBMarks: 30,
  /** Section C: 2 constructed responses × 20 marks. */
  sectionCQuestions: 2,
  sectionCMarks: 40,
  /** PM is a three-hour paper. */
  durationMin: 180,
  /** Every objective question in PM is worth 2 marks — Section A and Section B alike. */
  marksPerQuestion: 2,

  mockForms: 3,

  /* ── The authored content that composes it ──────────────────── */

  /**
   * Authored, exam-standard Section A questions. Derived DRILLS do not count, and there
   * are none. The figure is the whole authored bank as the loader serves it: 396 from the
   * per-chapter kits, plus the chapters' own inline `check` questions promoted into the
   * bank — which are authored too, one per section, not machine-permuted.
   */
  authoredBank: 466,
  /** The per-chapter kits alone, excluding the promoted chapter checks. */
  kitQuestions: 396,
  /**
   * The inventory the loader sizes the bank to. Set to the authored total, so
   * completeSectionAFromStudy has nothing left to fill and PaperContent.drills is empty.
   * It is deliberately NOT the old 350: a target below the authored bank would be
   * meaningless, and one above it would reintroduce derived filler.
   */
  bankInventoryTarget: 466,
  /** Study chapters in the reading tree, one per syllabus sub-topic group. */
  chapters: 33,
  /**
   * Examinable CONTENT areas the chapters must cover between them: A to E.
   *
   * Distinct from `paperAreas` below. PM's study guide declares a sixth area, F —
   * employability and technology skills — which is about operating the CBE's spreadsheet
   * and word processor rather than about management accounting. It has no reading chapter
   * because there is no technique to teach in one, and inventing chapters for it would
   * misrepresent the syllabus.
   */
  syllabusAreas: 5,
  /** Areas declared on the paper itself, including F, which the diagnostic still spans. */
  paperAreas: 6,
  /**
   * Authored Section B OT cases. Three mocks × three cases = 9, so this is exactly
   * enough for three DISJOINT sittings at the real unit size.
   */
  otCases: 9,
  /** Marks per OT case: 5 linked questions × 2 marks. */
  otCaseMarks: 10,
  /**
   * Authored Section C questions: three mocks × two questions = 6, again exactly three
   * disjoint sittings.
   */
  writtenQuestions: 6,
  writtenMarks: 20,
  flashcards: 150,
  mixedBanks: 5,
  mixedBankSize: 30,

  /* ── Floors that make the paper genuinely examinable ────────── */

  /**
   * Every chapter must carry at least this many authored questions. The bank could
   * satisfy `authoredBank` while leaving whole chapters unexamined, which is exactly the
   * failure mode a per-chapter kit exists to prevent.
   */
  minQuestionsPerChapter: 5,
  /**
   * PM is the most COMPUTATIONAL of the Applied Skills objective-test papers, so a
   * meaningful proportion of the bank must be numeric ENTRY rather than multiple choice.
   * A calculation tested as a four-option MCQ is materially easier than the same
   * calculation tested as a free-entry number — the candidate can work backwards from the
   * options or eliminate two on magnitude alone. This floor is the opposite of LW's
   * contract, which asserts numericQuestions === 0 because nothing in a law paper is
   * computed.
   */
  minNumericQuestions: 80,
  /**
   * Numeric entry must reach the three computational areas, not cluster in one. Area A is
   * excluded by nature: there is no calculation in information systems and inventing one
   * would misrepresent the paper.
   */
  numericAreas: ["B", "C", "D", "E"] as const,
  /**
   * Section C must examine Areas C, D and E, which is where its marks come from in every
   * real sitting. A Section C question on Area A or B alone would not be a PM Section C.
   */
  writtenAreas: ["C", "D", "E"] as const,
} as const
