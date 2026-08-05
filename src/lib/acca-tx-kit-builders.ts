import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for TX's per-chapter question kit.
 *
 * These set only fixed boilerplate (paper, type, marks) and positional arguments — they do
 * NOT generate content. Every stem, option, answer and explanation is authored individually;
 * anything machine-permuted belongs in PaperContent.drills.
 *
 * ── Marks are FIXED at 2 ─────────────────────────────────────────
 * TX's Section A is 15 objective tests at 2 marks and Section B is 3 OT cases of 5 questions
 * at 2 marks. There is no 1-mark question in the paper, so accepting marks as an argument
 * would only create a way to get it wrong.
 *
 * ── Why `num` carries most of the kit ────────────────────────────
 * TX is the most computational paper in Applied Skills after FA, and almost every skill it
 * examines produces a FIGURE: a liability, an allowance, a benefit, a gain, a penalty, a
 * VAT balance. A calculation tested as a four-option MCQ is materially easier than the same
 * calculation as free entry — the candidate can work backwards from the options, recognise a
 * familiar figure, or eliminate two on magnitude. So the rule for this kit is that where the
 * skill is a calculation, use `num`.
 *
 * MCQ is reserved for three things TX genuinely tests that way: selecting a TREATMENT
 * (allowable or not, exempt or not, which relief applies), stating a DATE or a rule, and the
 * cases where the learning point IS a specific wrong figure — margin confused with mark-up,
 * n used instead of (n − 1) in a lease premium, the chattels 5/3 rule ignored, taper relief
 * applied to the transfer rather than the tax. There an MCQ whose distractors ARE those
 * figures teaches more, because the explanation can name each error.
 *
 * ── The FA2025 basis ─────────────────────────────────────────────
 * Every figure in every question is on the FA2025 (2025/26) basis, transcribed from the
 * exam's own rate sheet. Nothing in the kit applies an excluded topic — no £1,000 property
 * or trading allowance, no Class 2 NIC, no termination payment rule, no business or
 * agricultural property relief.
 */

/** A single-answer multiple-choice item at TX's uniform 2 marks. */
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
  return { id, paper: "TX", area, chapter, type: "mcq", stem, options, correct, explanation, marks: 2, difficulty }
}

/** A multiple-response item — the CBE's "select TWO" / "select ALL that apply" style. */
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
  return { id, paper: "TX", area, chapter, type: "multi", stem, options, correct, explanation, marks: 2, difficulty }
}

/**
 * A numeric-entry item.
 *
 * `tolerance` accommodates legitimate rounding — set it to the precision the question
 * implies. TX's own instructions permit working to the nearest £, so 1 is the usual value
 * for a money answer and 0.01 where a rate or a per-unit figure is asked for. It is NOT
 * there to forgive a wrong method: a tolerance wide enough to admit a different calculation
 * marks the wrong answer correct.
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
    paper: "TX",
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
