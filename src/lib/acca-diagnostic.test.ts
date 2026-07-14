import { describe, it, expect } from "vitest"
import {
  buildDiagnostic,
  scoreDiagnostic,
  estimateFromPractice,
  diagnosticRange,
  passBand,
  type AnsweredDiagnostic,
} from "@/lib/acca-diagnostic"
import { getPapers, getPaper, recordAnswer, getQuestions } from "@/lib/acca"
import { passProbability, mockGate, MOCK_GATE } from "@/lib/acca-loop"

/*
 * The pass probability IS the product. "You have a 68% chance of passing FM" is
 * the promise on the landing page, the number in the gauge, and the thing a
 * student screenshots and shows their friends.
 *
 * So these tests defend three properties, in order of how badly a breach hurts:
 *   1. It is never absurd (no NaN, no 104%, no negative).
 *   2. It never claims confidence it hasn't earned — the audit found the mock
 *      gate opening after TWO correct answers, on 1 of 8 syllabus areas.
 *   3. It is STABLE: the diagnostic screen and the dashboard must not disagree
 *      about the same student (the audit measured 75% vs 77%).
 */

describe("buildDiagnostic", () => {
  it("draws only from the student's OWN paper, covering every syllabus area", () => {
    // This is the "FA trap" regression: an SBL student must never be silently
    // handed an FA diagnostic.
    for (const paper of getPapers()) {
      const form = buildDiagnostic(paper.id, 42)
      expect(form.length).toBeGreaterThan(0)
      expect(form.every((q) => q.paper === paper.id)).toBe(true)

      const areasHit = new Set(form.map((q) => q.area))
      const areasReal = new Set(paper.areas.map((a) => a.code))
      expect(areasHit.size).toBe(areasReal.size)
      for (const a of areasHit) expect(areasReal.has(a)).toBe(true)
    }
  })

  it("is deterministic for a seed, so a reload doesn't reshuffle the exam", () => {
    const a = buildDiagnostic("FA", 7).map((q) => q.id)
    const b = buildDiagnostic("FA", 7).map((q) => q.id)
    expect(a).toEqual(b)
  })

  it("returns nothing for a paper that doesn't exist, rather than throwing", () => {
    expect(buildDiagnostic("NOPE", 1)).toEqual([])
  })
})

/** Answer a whole diagnostic form with a fixed outcome. */
function answerAll(paperId: string, correct: boolean): AnsweredDiagnostic[] {
  return buildDiagnostic(paperId, 42).map((q) => ({ q, correct }))
}

describe("scoreDiagnostic — the number stays sane", () => {
  it("keeps the probability inside 0–100 at both extremes", () => {
    const perfect = scoreDiagnostic("FA", answerAll("FA", true))
    const zero = scoreDiagnostic("FA", answerAll("FA", false))

    for (const r of [perfect, zero]) {
      expect(Number.isFinite(r.passProbability)).toBe(true)
      expect(r.passProbability).toBeGreaterThanOrEqual(0)
      expect(r.passProbability).toBeLessThanOrEqual(100)
    }
    expect(perfect.passProbability).toBeGreaterThan(zero.passProbability)
  })

  it("never claims certainty — a perfect score is not 100%", () => {
    // Bayesian shrinkage: we are estimating, and we say so.
    expect(scoreDiagnostic("FA", answerAll("FA", true)).passProbability).toBeLessThan(100)
  })

  it("returns the neutral prior when there is no evidence at all", () => {
    const r = scoreDiagnostic("FA", [])
    expect(r.passProbability).toBe(50)
    expect(r.confidence).toBe(0)
  })

  it("promises a target that is never worse than where the student already is", () => {
    const r = scoreDiagnostic("FA", answerAll("FA", false))
    expect(r.target.projectedPassProbability).toBeGreaterThanOrEqual(r.passProbability)
  })
})

describe("diagnosticRange — the honest interval", () => {
  // The audit: "98% ±7" was rendered, implying a 105% chance of passing.
  it("never implies a probability above 100 or below 0", () => {
    for (const prob of [0, 2, 50, 98, 100]) {
      for (const n of [1, 12, 24]) {
        const r = diagnosticRange(prob, n, 1)
        expect(r.lo).toBeGreaterThanOrEqual(0)
        expect(r.hi).toBeLessThanOrEqual(100)
        expect(r.lo).toBeLessThanOrEqual(r.hi)
      }
    }
  })

  it("tightens as the student answers more", () => {
    const few = diagnosticRange(50, 6, 1)
    const many = diagnosticRange(50, 24, 1)
    expect(many.margin).toBeLessThan(few.margin)
  })

  it("widens when the diagnostic only covered half the syllabus", () => {
    expect(diagnosticRange(50, 24, 0.5).margin).toBeGreaterThan(diagnosticRange(50, 24, 1).margin)
  })
})

describe("the two models agree", () => {
  // THE AUDIT BUG: the results screen (difficulty-weighted) and the dashboard
  // (unweighted counts) scored the SAME answers differently — 75% vs 77% — while
  // the comments claimed they spoke the same model. A number that changes when
  // you navigate is a number nobody trusts.
  it("the diagnostic screen and the live estimate report the same probability", () => {
    const form = buildDiagnostic("FA", 42)
    const answers: AnsweredDiagnostic[] = form.map((q, i) => ({ q, correct: i % 3 !== 0 }))

    const shown = scoreDiagnostic("FA", answers)
    // The app records every diagnostic answer into practice stats, which is what
    // the dashboard's live estimate reads back.
    for (const a of answers) recordAnswer("FA", a.q, a.correct)
    const live = estimateFromPractice("FA")

    expect(live).not.toBeNull()
    expect(live!.passProbability).toBe(shown.passProbability)
  })
})

describe("estimateFromPractice / the mock gate", () => {
  it("reports nothing at all before the student has answered anything", () => {
    expect(estimateFromPractice("FA")).toBeNull()
    expect(passProbability("FA")).toBeNull()
  })

  // THE AUDIT BUG, and the worst of them: two correct answers in ONE area of an
  // eight-area paper produced "61% chance to pass" — and 61% cleared the 60% gate,
  // unlocking the mocks. The model was reporting a coin-flip prior as knowledge.
  it("does NOT unlock the mock gate on two lucky answers", () => {
    const fa = getQuestions("FA").filter((q) => q.area === "A").slice(0, 2)
    expect(fa.length).toBe(2)
    for (const q of fa) recordAnswer("FA", q, true)

    // Still measuring — not a confident number, and certainly not a gate key.
    expect(passProbability("FA")).toBeNull()
    expect(mockGate("FA").unlocked).toBe(false)
  })

  it("does report a number once the evidence is real, and the gate can be earned", () => {
    // A strong performance across the whole syllabus — the legitimate route.
    const areas = getPaper("FA")!.areas.map((a) => a.code)
    for (const area of areas) {
      for (const q of getQuestions("FA").filter((x) => x.area === area).slice(0, 4)) {
        recordAnswer("FA", q, true)
      }
    }
    const prob = passProbability("FA")
    expect(prob).not.toBeNull()
    expect(prob!).toBeGreaterThanOrEqual(MOCK_GATE)
    expect(mockGate("FA").unlocked).toBe(true)
  })
})

describe("passBand", () => {
  it("labels every probability without gaps", () => {
    for (const p of [0, 1, 44, 45, 69, 70, 100]) {
      const band = passBand(p)
      expect(band.label.length).toBeGreaterThan(0)
      expect(band.color).toMatch(/^#/)
    }
  })
})
