/*
 * TX-UK's content contract, rewritten for the rebuilt paper.
 *
 * ── What the old contract asserted, and why every figure was wrong ──
 * The previous version read:
 *
 *   sectionA: 350, sectionBQuestions: 350, sectionBCases: 70, sectionC: 50,
 *   flashcards: 150, mixedBanks: 5, mixedBankSize: 30, mockForms: 3
 *
 * Only the last three described the paper. TX's real exam is 15 Section A objective tests at
 * 2 marks, THREE Section B OT cases of five 2-mark tasks, and THREE Section C constructed
 * responses of 10, 15 and 15 marks. So:
 *
 *   · 350 Section A items was an inventory target, not an exam fact, and 73 of them were
 *     machine-derived recall drills served alongside authored questions.
 *   · 350 "Section B questions" and 70 cases described a GENERATED Section B — 70 cases is
 *     23 sittings' worth of a paper that examines three.
 *   · sectionC: 50 counted questions that were all 20 marks. There is no 20-mark
 *     constructed response anywhere in TX: the units are 10, 15 and 15.
 *   · And the study side was the most extreme case in the library: SEVEN chapters for a
 *     SEVEN-area syllabus. Area B alone — income tax and NIC — is eleven chapters of any
 *     approved-provider text, and it had one.
 *
 * ── The FA2025 basis ─────────────────────────────────────────────
 * Everything is on the FA2025 (2025/26) basis, transcribed from the exam's own rate sheet
 * rather than recalled. Two structural points shaped the rebuild and are recorded here
 * because they would defeat a from-memory attempt:
 *
 *   · From 2024/25 an unincorporated business is taxed on the TAX YEAR basis, with profits
 *     time-apportioned. The current-year basis, opening year rules, overlap profits and
 *     overlap relief are all gone.
 *   · The EXCLUDED topic list is long enough to shape the content. Absent by design: the
 *     £1,000 property and trading allowances, Class 2 NIC, termination payments, business
 *     and agricultural property relief, grossing up on death, the RNRB taper, the capital
 *     goods and second-hand goods schemes, and much else.
 */

export const TX_CONTENT_TARGET = {
  /* ── The real exam ──────────────────────────────────────────── */

  /** Section A: 15 objective tests × 2 marks. */
  sectionAQuestions: 15,
  sectionAMarks: 30,
  /** Section B: 3 OT cases × 5 questions × 2 marks. */
  sectionBCases: 3,
  sectionBQuestionsPerCase: 5,
  sectionBMarks: 30,
  /**
   * Section C: THREE constructed responses of 10, 15 and 15 marks — a structural difference
   * from PM's two at 20, and the reason the written bank has to hold both unit sizes.
   */
  sectionCQuestions: 3,
  sectionCMarks: 40,
  sectionCUnitMarks: [10, 15, 15] as const,
  /** TX is a three-hour paper. */
  durationMin: 180,
  /** Every objective question in TX is worth 2 marks — Section A and Section B alike. */
  marksPerQuestion: 2,

  mockForms: 3,

  /* ── The authored content that composes it ──────────────────── */

  /**
   * Authored, exam-standard Section A questions. Derived DRILLS do not count, and there are
   * none. The figure is the whole authored bank as the loader serves it: 316 from the
   * per-chapter kits, plus the chapters' own inline `check` questions promoted into the
   * bank — which are authored too, one per section, not machine-permuted.
   */
  authoredBank: 359,
  /** The per-chapter kits alone, excluding the promoted chapter checks. */
  kitQuestions: 316,
  /**
   * The inventory the loader sizes the bank to. Set to the authored total, so
   * completeSectionAFromStudy has nothing left to fill and PaperContent.drills is empty.
   */
  bankInventoryTarget: 359,
  /** Study chapters in the TX-UK reading tree, one per syllabus sub-topic group. */
  chapters: 29,
  /** Official syllabus areas the chapters must cover between them: A to G. */
  syllabusAreas: 7,
  /**
   * Authored Section B OT cases. Three mocks × three cases = 9, exactly enough for three
   * DISJOINT sittings at the real unit size.
   */
  otCases: 9,
  /** Marks per OT case: 5 linked questions × 2 marks. */
  otCaseMarks: 10,
  /**
   * Authored Section C questions. Three mocks × three questions = 9, being three 10-markers
   * and six 15-markers — again exactly three disjoint sittings.
   */
  writtenQuestions: 15,
  writtenTenMarkers: 5,
  writtenFifteenMarkers: 10,
  flashcards: 150,
  mixedBanks: 5,
  mixedBankSize: 30,

  /* ── Floors that make the paper genuinely examinable ────────── */

  /**
   * Every chapter must carry at least this many authored questions. The bank could satisfy
   * `authoredBank` while leaving whole chapters unexamined, which is the failure mode a
   * per-chapter kit exists to prevent.
   */
  minQuestionsPerChapter: 6,
  /**
   * TX is the most computational Applied Skills paper after FA — nearly every skill it tests
   * produces a figure — so a meaningful proportion of the bank must be numeric ENTRY. A
   * calculation tested as a four-option MCQ is materially easier than the same calculation
   * free-entry: the candidate can work backwards from the options or eliminate two on
   * magnitude alone.
   */
  minNumericQuestions: 80,
  /**
   * Numeric entry must reach the computational areas rather than clustering in one. Area A
   * carries the date and penalty computations, so it qualifies too — the only areas excluded
   * are G, which is skills, and none other.
   */
  numericAreas: ["A", "B", "C", "D", "E", "F"] as const,
  /**
   * Section C must examine Areas B, C, D, E and F between them — the five the real paper
   * draws it from, plus Area A for the administration and ethics requirement.
   */
  writtenAreas: ["A", "B", "C", "D", "E", "F"] as const,
} as const

/*
 * TX-GLOBAL's own figures.
 *
 * TX-Global is a jurisdiction-neutral FOUNDATION track, not an ACCA exam variant — its own
 * content says so, and the route is labelled "Foundation" in the picker rather than "Global".
 * It therefore has no real exam shape to model, and its generated Section B and Section C
 * exist to give the track some practice material rather than to reproduce a sitting.
 *
 * These figures live here, separately, because acca-tx-global-expansion.ts previously read
 * TX_CONTENT_TARGET.sectionBCases and .sectionC — TX-UK's numbers. That coupling meant
 * correcting TX-UK's contract to the real exam silently changed how much TX-Global content
 * was generated, which is exactly the kind of accidental dependency worth breaking.
 */
export const TX_GLOBAL_CONTENT_TARGET = {
  /** Generated foundation cases. Not an exam shape — there is no TX-Global exam. */
  foundationCases: 12,
  /** Generated foundation constructed responses. */
  foundationWritten: 20,
  /** Chapters in the generated foundation tree, one per declared area. */
  chapters: 7,
} as const
