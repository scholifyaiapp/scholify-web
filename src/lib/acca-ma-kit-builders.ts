import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for MA's per-chapter question kit.
 *
 * These set only fixed boilerplate (paper, type) and positional arguments — they
 * do NOT generate content. Every stem, option, answer and explanation is authored
 * individually; anything machine-permuted belongs in PaperContent.drills.
 *
 * MA needs a third builder BT did not: `num`, for numeric-entry questions. MA's
 * real exam is largely computational, and a calculation tested as a four-option
 * MCQ is easier than the same calculation tested as a free-entry number — the
 * candidate can work backwards from the options, or recognise a familiar figure.
 * Numeric entry removes both, so it measures what the exam measures.
 */

/** A single-answer multiple-choice item. */
export function q(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  marks: 1 | 2,
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return { id, paper: "MA", area, chapter, type: "mcq", stem, options, correct, explanation, marks, difficulty }
}

/** A multiple-response item. */
export function multi(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  marks: 1 | 2,
  stem: string,
  options: string[],
  correct: number[],
  explanation: string,
): AccaQuestion {
  return { id, paper: "MA", area, chapter, type: "multi", stem, options, correct, explanation, marks, difficulty }
}

/**
 * A numeric-entry item.
 *
 * `tolerance` accommodates legitimate rounding — set it to the precision the
 * question implies (0.01 for a money answer to the cent, 0.5 for a figure the
 * candidate is told to round to the nearest whole unit). It is NOT there to
 * forgive a wrong method: too wide a tolerance marks a different calculation
 * correct.
 */
export function num(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  marks: 1 | 2,
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id,
    paper: "MA",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks,
    difficulty,
  }
}
