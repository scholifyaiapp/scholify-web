/*
 * SBL's content contract.
 *
 * Every other paper's contract is a set of inventory COUNTS, because every other
 * paper's exam is made of countable objective questions, mark-fixed MTQs and
 * constructed responses whose shape a count can describe. SBL is not: it is one
 * integrated case study of three tasks carrying 80 technical and 20 professional
 * skills marks, and it sets no objective test questions at all.
 *
 * So this contract records DEPTH and SHAPE alongside the counts. The stub it
 * replaces asserted three numbers, one of which — `learningDrills: 350` — was the
 * opposite of what the rebuild was for, since it made a target out of the derived
 * material rather than the authored tree.
 */

/** Chapters per official syllabus area, after the rebuild of August 2026. */
export const SBL_AREA_CHAPTERS = {
  A: 4, // A1 · A2 · A3a-b · A3c-e
  B: 7, // B1 · B2 · B3 · B5a-e · B5f-h · B4 · B6
  C: 6, // C1 · C2 · C3 · C4 · C5 over two
  D: 4, // D1 over two · D2 over two
  E: 5, // E1 · E2 · E3 · E4 · E5
  F: 3, // F1 · F2 · F3
  G: 4, // G1 · G2 over two · G2f+G3
  H: 6, // H1 · H2 · H3 · H4 · H5 · H6
  I: 5, // one per professional skill
  J: 2, // J1+J3 · J2+J4
} as const

export const SBL_CONTENT_TARGET = {
  /*
   * The inventory a learner practises against. `learningDrills` is the combined
   * size of the authored bank plus derived drills — it is NOT a target for drills,
   * and the authored share has risen from 185 to 301 over the rebuild while the
   * total stayed fixed, which is the direction that matters.
   */
  learningDrills: 350,
  flashcards: 150,
  writtenCases: 50,

  /*
   * Depth floors, as a ratchet. SBL carried ~9,900 words across the whole
   * syllabus before the rebuild — one chapter per area, seven of the ten
   * relabelled slices of five legacy chapters. These are minimums, not goals.
   */
  chapters: 46,
  sections: 130,
  words: 38_000,

  /*
   * SBL sets NO objective test questions. Its objective items are honestly
   * labelled learning material, so the graded bank must stay free of derived
   * drills and the paper's real practice is the written case work. Kept here
   * because it is the one fact about SBL that most changes how content for it
   * should be judged.
   */
  objectiveTestsInRealExam: 0,
  technicalMarks: 80,
  professionalSkillsMarks: 20,
  tasks: 3,
} as const
