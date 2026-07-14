import { describe, it, expect } from "vitest"
import {
  gradeQuestion,
  recordAnswer,
  getPaperStats,
  restoreProgress,
  snapshotProgress,
  getQuestions,
  getPapers,
} from "@/lib/acca"
import type { AccaQuestion } from "@/lib/acca-content"

/*
 * Grading and progress — the highest-stakes logic in the product.
 *
 * A wrong grade doesn't just annoy a student; it teaches them the wrong thing
 * and corrupts the pass probability we sell. Two real bugs found in the
 * 2026-07-14 audit are pinned here so they can never return:
 *   · an unanswered question with a missing key graded as CORRECT
 *   · a corrupt stored row made every stats read throw, forever, with no heal
 */

const mcq = (over: Partial<AccaQuestion> = {}): AccaQuestion =>
  ({
    id: "T-1",
    paper: "FA",
    area: "A",
    type: "mcq",
    stem: "?",
    options: ["a", "b", "c", "d"],
    correct: 2,
    explanation: "because",
    marks: 2,
    difficulty: "medium",
    ...over,
  }) as AccaQuestion

describe("gradeQuestion — mcq", () => {
  it("grades the keyed option correct and every other option wrong", () => {
    const q = mcq({ correct: 2 })
    expect(gradeQuestion(q, 2).correct).toBe(true)
    for (const wrong of [0, 1, 3]) expect(gradeQuestion(q, wrong).correct).toBe(false)
  })

  it("returns the text of the correct option, so the UI never has to re-derive it", () => {
    expect(gradeQuestion(mcq({ correct: 1 }), 0).correctText).toBe("b")
  })

  // THE AUDIT BUG: response -1 is the "skipped / timed out" sentinel. With a
  // malformed question (no `correct`), the expected value read as -1 too — so a
  // blank answer matched, and skipping a question scored a point.
  it("never grades a skipped answer (-1) as correct, even on a malformed question", () => {
    expect(gradeQuestion(mcq({ correct: undefined }), -1).correct).toBe(false)
    expect(gradeQuestion(mcq({ correct: 2 }), -1).correct).toBe(false)
  })

  it("rejects an out-of-range or non-integer selection", () => {
    const q = mcq({ correct: 2 })
    expect(gradeQuestion(q, 2.5).correct).toBe(false)
    expect(gradeQuestion(q, NaN).correct).toBe(false)
  })
})

describe("gradeQuestion — multi", () => {
  const multi = (over: Partial<AccaQuestion> = {}) =>
    mcq({ type: "multi", correct: [0, 2], ...over })

  it("requires the exact set, in any order", () => {
    expect(gradeQuestion(multi(), [0, 2]).correct).toBe(true)
    expect(gradeQuestion(multi(), [2, 0]).correct).toBe(true)
    expect(gradeQuestion(multi(), [0]).correct).toBe(false)
    expect(gradeQuestion(multi(), [0, 1, 2]).correct).toBe(false)
    expect(gradeQuestion(multi(), []).correct).toBe(false)
  })

  // A content typo (`correct: 2` instead of `[2]`) used to make an EMPTY
  // selection grade correct — the worst possible direction to fail in.
  it("treats a scalar key on a multi question as ungradeable, never as correct", () => {
    const typo = multi({ correct: 2 as unknown as number[] })
    expect(gradeQuestion(typo, []).correct).toBe(false)
    expect(gradeQuestion(typo, [2]).correct).toBe(false)
  })

  it("treats a scalar response to a multi question as wrong, not as an empty set", () => {
    expect(gradeQuestion(multi(), 0 as unknown as number[]).correct).toBe(false)
  })
})

describe("gradeQuestion — numeric", () => {
  const num = (over: Partial<AccaQuestion> = {}) =>
    mcq({ type: "number", options: undefined, correct: undefined, numericAnswer: 1200, ...over })

  it("accepts an exact answer and rejects a clearly wrong one", () => {
    expect(gradeQuestion(num(), 1200).correct).toBe(true)
    expect(gradeQuestion(num(), 1300).correct).toBe(false)
  })

  it("honours the stated tolerance", () => {
    const q = num({ numericAnswer: 100, tolerance: 1 })
    expect(gradeQuestion(q, 100.5).correct).toBe(true)
    expect(gradeQuestion(q, 102).correct).toBe(false)
  })

  it("never grades a non-numeric response as correct", () => {
    expect(gradeQuestion(num(), NaN).correct).toBe(false)
    expect(gradeQuestion(num(), [1200] as unknown as number).correct).toBe(false)
  })
})

describe("progress storage", () => {
  it("records an answer and reflects it in the paper's stats", () => {
    const q = mcq({ paper: "FA", area: "A" })
    recordAnswer("FA", q, true)
    const stats = getPaperStats("FA")
    expect(stats.answered).toBe(1)
    expect(stats.correct).toBe(1)
    expect(stats.areas.find((a) => a.code === "A")?.correct).toBe(1)
  })

  // THE AUDIT BUG: `acca_progress.data` is a user-writable cloud row. A single
  // wrong-typed field (areas: null) made getPaperStats AND recordAnswer throw on
  // every call — and because the null was re-read from localStorage each time, it
  // never self-healed. The study area was bricked until the user cleared site data.
  it("survives a corrupt cloud row instead of bricking the app forever", () => {
    expect(() => restoreProgress({ areas: null, answered: "lots", mocks: 3 })).not.toThrow()
    expect(() => getPaperStats("FA")).not.toThrow()
    expect(() => recordAnswer("FA", mcq(), true)).not.toThrow()
    // …and having healed, it still works.
    expect(getPaperStats("FA").answered).toBe(1)
  })

  it("survives outright garbage from the server", () => {
    for (const junk of [null, undefined, 42, "nope", []]) {
      expect(() => restoreProgress(junk)).not.toThrow()
      expect(() => getPaperStats("FA")).not.toThrow()
    }
  })

  it("round-trips a snapshot without losing answers", () => {
    recordAnswer("FA", mcq(), true)
    recordAnswer("FA", mcq({ id: "T-2" }), false)
    const snap = snapshotProgress()
    restoreProgress(snap)
    const stats = getPaperStats("FA")
    expect(stats.answered).toBe(2)
    expect(stats.correct).toBe(1)
  })
})

describe("the content itself", () => {
  // The audit script covers this in depth; this is the smoke test that fails the
  // build if a paper's bank ever disappears from the barrel.
  it("every paper has a bank, and every question belongs to its own paper", () => {
    const papers = getPapers()
    expect(papers.length).toBe(15)
    for (const p of papers) {
      const qs = getQuestions(p.id)
      expect(qs.length).toBeGreaterThanOrEqual(150)
      expect(qs.every((q) => q.paper === p.id)).toBe(true)
    }
  })
})
