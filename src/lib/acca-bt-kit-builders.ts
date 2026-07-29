import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Builders for BT's per-chapter question kit.
 *
 * These exist only to keep 260 authored questions readable: every field they set
 * is fixed boilerplate (paper, type) or a positional argument. They do NOT
 * generate content — each question's stem, options and explanation are authored
 * individually. Anything machine-permuted belongs in PaperContent.drills.
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
  return { id, paper: "BT", area, chapter, type: "mcq", stem, options, correct, explanation, marks, difficulty }
}

/** A multiple-response item — BT Section A uses these alongside single-answer MCQs. */
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
  return { id, paper: "BT", area, chapter, type: "multi", stem, options, correct, explanation, marks, difficulty }
}
