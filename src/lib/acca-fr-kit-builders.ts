import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for FR's per-chapter question kit.
 *
 * These set only fixed boilerplate (paper, type, marks) and positional arguments — they do
 * NOT generate content. Every stem, option, answer and explanation is authored individually;
 * anything machine-permuted belongs in PaperContent.drills, and FR's is empty.
 *
 * ── Marks are FIXED at 2 ─────────────────────────────────────────
 * FR's Section A is 15 objective tests at 2 marks and Section B is 3 OT cases of 5 questions
 * at 2 marks. There is no 1-mark question anywhere in the paper, so accepting marks as an
 * argument would only create a way to get it wrong.
 *
 * ── The MCQ / numeric split in FR, and why it differs from TX's ──
 * TX's kit is numeric-heavy because almost every skill it examines produces a figure. FR is
 * different: roughly half of what it examines is a TREATMENT DECISION — is this an asset,
 * does this meet the six criteria, is this held for sale, is this a policy or an estimate —
 * and those are genuinely tested as multiple choice, in the exam and here.
 *
 * So the rule for this kit is:
 *
 *   ·  where the skill is a CALCULATION, use `num`. Goodwill, a lease liability, a
 *      deferred tax balance, an impairment allocation, a ratio. Testing those as a
 *      four-option MCQ is materially easier than free entry — a candidate can work
 *      backwards from the options or eliminate two on magnitude.
 *
 *   ·  where the skill is a CLASSIFICATION or a JUSTIFICATION, use `q`, and build the
 *      distractors out of the specific wrong answers the topic produces. An MCQ whose
 *      options are the four plausible treatments teaches more than a numeric entry could,
 *      because the explanation can name why each of the other three fails.
 *
 *   ·  where the learning point IS a particular wrong figure — margin confused with
 *      mark-up, the lower rather than the higher of the two recoverable amounts, a full
 *      year's depreciation on a mid-year acquisition — use `q` with those figures AS the
 *      distractors, so the explanation can name each error.
 *
 * ── `multi` and the CBE ─────────────────────────────────────────
 * The real CBE uses multiple-response items ("select TWO", "which THREE of the following").
 * They are harder than they look because there is no partial credit: all correct options and
 * no incorrect ones. The kit uses them where a topic has a genuine SET as its answer — the
 * three components of faithful representation, the criteria for held for sale, the items
 * excluded from the cost of inventory.
 */

/** A single-answer multiple-choice item at FR's uniform 2 marks. */
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
  return { id, paper: "FR", area, chapter, type: "mcq", stem, options, correct, explanation, marks: 2, difficulty }
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
  return { id, paper: "FR", area, chapter, type: "multi", stem, options, correct, explanation, marks: 2, difficulty }
}

/**
 * A numeric-entry item.
 *
 * `tolerance` accommodates legitimate rounding — set it to the precision the question
 * implies, not to a width that would forgive a different method. FR answers are usually
 * whole dollars, so 1 is the normal value; use 0.01 for a ratio, a percentage or a
 * per-share figure, and a wider value only where the question itself directs rounding (a
 * discount-table factor, for instance, produces a legitimate spread of a few dollars).
 *
 * A tolerance wide enough to admit a wrong method marks the wrong answer correct, which is
 * worse than no question at all.
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
    paper: "FR",
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
