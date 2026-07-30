import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for FA's per-chapter question kit.
 *
 * These set only fixed boilerplate (paper, type, marks) and positional arguments —
 * they do NOT generate content. Every stem, option, answer and explanation is
 * authored individually; anything machine-permuted belongs in PaperContent.drills.
 *
 * MARKS ARE FIXED AT 2, deliberately and without a parameter. FA's real Section A is
 * thirty-five objective-test questions of exactly two marks each, so a 1-mark or
 * 3-mark item in this bank could not appear in the real exam and would stop the mock
 * composer reaching exactly 70 marks. BT's kit needs a marks argument because BT
 * genuinely mixes 1 and 2; FA does not, so the builder refuses the choice.
 *
 * `num` exists for the same reason MA's does: FA is heavily computational from Area D
 * onward, and a calculation offered as four options can be reverse-engineered from
 * the options or recognised as a familiar figure. Numeric entry removes both, which
 * is what the real CBE's number-entry questions do.
 */

/** A single-answer multiple-choice item. */
export function q(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return { id, paper: "FA", area, chapter, type: "mcq", stem, options, correct, explanation, marks: 2, difficulty }
}

/** A multiple-response item — the CBE's "select TWO" style. */
export function multi(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number[],
  explanation: string,
): AccaQuestion {
  return { id, paper: "FA", area, chapter, type: "multi", stem, options, correct, explanation, marks: 2, difficulty }
}

/**
 * A numeric-entry item.
 *
 * `tolerance` accommodates legitimate rounding — set it to the precision the
 * question implies (0.1 for a ratio or a days figure, 1 for a money answer rounded
 * to the nearest dollar). It is NOT there to forgive a wrong method: too wide a
 * tolerance marks a different calculation correct, which on a paper this
 * computational would hide exactly the errors the question was written to catch.
 */
export function num(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id,
    paper: "FA",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks: 2,
    difficulty,
  }
}
