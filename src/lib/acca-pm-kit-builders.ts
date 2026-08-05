import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for PM's per-chapter question kit.
 *
 * These set only fixed boilerplate (paper, type, marks) and positional arguments — they
 * do NOT generate content. Every stem, option, answer and explanation is authored
 * individually; anything machine-permuted belongs in PaperContent.drills.
 *
 * ── Why marks are FIXED at 2 here, unlike LW's builders ─────────
 * PM's real exam is uniform: Section A is 15 objective tests at 2 marks and Section B is
 * 3 OT cases of 5 questions at 2 marks. There is no 1-mark question in the paper, so
 * accepting marks as an argument would only create a way to get it wrong. LW needed the
 * argument because its Section A genuinely mixes 25 two-mark with 20 one-mark items.
 *
 * ── Why `num` matters more in PM than anywhere else ─────────────
 * PM is the most computational of the Applied Skills objective-test papers, and a
 * calculation tested as a four-option MCQ is materially easier than the same calculation
 * tested as a free-entry number: the candidate can work backwards from the options, or
 * recognise a familiar figure, or eliminate two options on magnitude alone. Numeric entry
 * removes all three. So the rule for this kit is that **where the skill being tested is a
 * calculation, use `num`** — MCQ is for selecting a treatment, interpreting a figure,
 * choosing between techniques, or identifying which variance a cause produces.
 *
 * The one deliberate exception: where the LEARNING POINT is that candidates reliably
 * produce a specific wrong figure — margin confused with mark-up, throughput with labour
 * deducted, a cumulative-average learning curve read as an incremental one — an MCQ whose
 * distractors ARE those wrong figures teaches more than a numeric box, because the
 * explanation can name each error. Those are authored as `q` with the wrong answers
 * chosen, not filled.
 */

/** A single-answer multiple-choice item at PM's uniform 2 marks. */
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
  return { id, paper: "PM", area, chapter, type: "mcq", stem, options, correct, explanation, marks: 2, difficulty }
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
  return { id, paper: "PM", area, chapter, type: "multi", stem, options, correct, explanation, marks: 2, difficulty }
}

/**
 * A numeric-entry item.
 *
 * `tolerance` accommodates legitimate rounding — set it to the precision the question
 * implies (0.01 for money to the penny, 1 for a figure to be given in whole units, 0.5
 * where a candidate rounding an intermediate learning-curve factor could land either
 * side). It is NOT there to forgive a wrong method: a tolerance wide enough to admit a
 * different calculation marks the wrong answer correct.
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
    paper: "PM",
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
