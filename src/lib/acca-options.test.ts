import { describe, it, expect } from "vitest"
import { withShuffledOptions } from "@/lib/acca-options"
import { getPapers, getQuestions } from "@/lib/acca"
import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Answer-position bias.
 *
 * The audit found FR keyed 45% of its answers to option "A" (every other paper
 * sits at a healthy ~25%) while the app never shuffled options at render — so
 * roughly 83% of that bank was scoreable WITHOUT READING THE QUESTION. That
 * corrupts practice stats, the mock gate, and the pass probability itself.
 *
 * The fix shuffles options deterministically per question at render. These tests
 * defend the two properties that make that safe:
 *   1. GRADING INTEGRITY — the remapped key must still point at the same answer.
 *      (Get this wrong and we mark correct students wrong. Catastrophic.)
 *   2. NO POSITION BIAS — in any paper, no option position may dominate.
 *
 * Note the trap this suite exists to catch: the first attempt reused the engine's
 * LCG shuffle, whose multiplier is ≡1 (mod 4). On a 4-element array it did not
 * remove the bias — it ROTATED it (45% "A" became 45% "D"). It looked right.
 */

const optionQuestions = (paperId: string) =>
  getQuestions(paperId).filter((q) => q.options?.length && q.correct !== undefined)

/** Where does the correct answer sit, after shuffling? */
function positionHistogram(qs: AccaQuestion[]): number[] {
  const hist = [0, 0, 0, 0]
  for (const q of qs) {
    const s = withShuffledOptions(q)
    const idx = Array.isArray(s.correct) ? s.correct[0] : (s.correct as number)
    if (idx >= 0 && idx < 4) hist[idx]++
  }
  return hist
}

describe("withShuffledOptions — grading integrity", () => {
  it("keeps the correct answer pointing at the same option TEXT, for every question in the app", () => {
    let checked = 0
    for (const paper of getPapers()) {
      for (const q of optionQuestions(paper.id)) {
        const s = withShuffledOptions(q)
        if (Array.isArray(q.correct)) {
          const wantText = q.correct.map((i) => q.options![i]).sort()
          const gotText = (s.correct as number[]).map((i) => s.options![i]).sort()
          expect(gotText).toEqual(wantText)
        } else {
          expect(s.options![s.correct as number]).toBe(q.options![q.correct as number])
        }
        checked++
      }
    }
    // If this ever reads 0, the test is passing vacuously and defending nothing.
    expect(checked).toBeGreaterThan(2000)
  })

  it("preserves the option set — it reorders, it never invents or drops a choice", () => {
    for (const q of optionQuestions("FR").slice(0, 200)) {
      const s = withShuffledOptions(q)
      expect([...s.options!].sort()).toEqual([...q.options!].sort())
    }
  })

  it("is stable for a given question, so options don't jump on re-render", () => {
    const q = optionQuestions("FA")[0]
    const a = withShuffledOptions(q)
    const b = withShuffledOptions(q)
    expect(b.options).toEqual(a.options)
    expect(b.correct).toEqual(a.correct)
  })

  it("leaves numeric-entry questions alone", () => {
    const numeric = getQuestions("TX").find((q) => q.type === "number")
    expect(numeric).toBeDefined()
    const s = withShuffledOptions(numeric!)
    expect(s.numericAnswer).toBe(numeric!.numericAnswer)
  })
})

describe("withShuffledOptions — no position is guessable", () => {
  it("removes FR's 45%-option-A bias", () => {
    const qs = optionQuestions("FR").filter((q) => q.options!.length === 4)
    const hist = positionHistogram(qs)
    const worst = Math.max(...hist) / qs.length
    // Authored, FR sat at 0.45. Anything at or above 0.40 is exploitable.
    expect(worst).toBeLessThan(0.4)
  })

  it("leaves no paper with a dominant answer position", () => {
    for (const paper of getPapers()) {
      const qs = optionQuestions(paper.id).filter((q) => q.options!.length === 4)
      if (qs.length < 50) continue
      const hist = positionHistogram(qs)
      const worst = Math.max(...hist) / qs.length
      // 0.40 leaves room for ordinary sampling noise at n≈100–200 while still
      // catching a real, learnable skew.
      expect(worst, `${paper.id} has a dominant answer position`).toBeLessThan(0.4)
    }
  })
})
