import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for LW-Global's per-chapter question kit.
 *
 * These set only fixed boilerplate (paper, type) and positional arguments — they do
 * NOT generate content. Every stem, option, answer and explanation is authored
 * individually; anything machine-permuted belongs in PaperContent.drills.
 *
 * ── Why marks are an argument here, unlike FA's builders ────────
 * LW's real Section A is 25 questions of 2 marks PLUS 20 of 1 mark — 45 questions for
 * 70 marks. So unlike FA, where every Section A item is worth exactly 2 and the builder
 * fixes it, LW genuinely needs both values, and a bank of only 2-mark questions could
 * never compose a real-shaped sitting. Three disjoint forms need roughly 60 one-mark
 * and 75 two-mark authored questions, which is what this kit is sized to supply.
 *
 * Use the mark value to reflect what the question actually demands:
 *  · `q1` / `multi1` — ONE mark. A single point: identify the instrument, name the
 *    party, state which of two regimes applies. Quick to read and quick to answer,
 *    which is what the real 1-mark questions are like.
 *  · `q2` / `multi2` — TWO marks. Applied: a short scenario, a rule to select, and a
 *    conclusion to reach. This is where the paper is actually tested.
 *
 * There is no numeric-entry builder. LW is a law paper — nothing in it is computed, so
 * a `type: "number"` question would be measuring the wrong thing.
 */

function make(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  marks: 1 | 2,
  stem: string,
  options: string[],
  correct: number | number[],
  explanation: string,
): AccaQuestion {
  return {
    id,
    paper: "LW",
    area,
    chapter,
    type: Array.isArray(correct) ? "multi" : "mcq",
    stem,
    options,
    correct,
    explanation,
    marks,
    difficulty,
  }
}

/** A one-mark single-answer item: one point, quickly settled. */
export function q1(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return make(id, chapter, area, difficulty, 1, stem, options, correct, explanation)
}

/** A two-mark single-answer item: a scenario, a rule, a conclusion. */
export function q2(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return make(id, chapter, area, difficulty, 2, stem, options, correct, explanation)
}

/** A one-mark multiple-response item. */
export function multi1(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number[],
  explanation: string,
): AccaQuestion {
  return make(id, chapter, area, difficulty, 1, stem, options, correct, explanation)
}

/** A two-mark multiple-response item — the CBE's "select TWO" style. */
export function multi2(
  id: string,
  chapter: string,
  area: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number[],
  explanation: string,
): AccaQuestion {
  return make(id, chapter, area, difficulty, 2, stem, options, correct, explanation)
}
