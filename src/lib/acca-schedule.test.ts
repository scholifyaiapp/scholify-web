import { describe, it, expect } from "vitest"
import { focusArea } from "@/lib/acca-schedule"
import { scoreDiagnostic, saveDiagnosticLocal, type AnsweredDiagnostic } from "@/lib/acca-diagnostic"
import { getPaper, getQuestions, recordAnswer } from "@/lib/acca"

/*
 * The core of Doc 12: the DIAGNOSTIC must drive the daily plan.
 *
 * Before this, the plan targeted live practice-accuracy weakness only — so a
 * freshly-diagnosed learner whose diagnostic screamed "area D" got a generic
 * plan until they happened to practise D. focusArea() fixes the precedence:
 * diagnostic pain points first, then live practice, then syllabus order.
 */

/** Build + store a diagnostic where `weakArea` is answered wrong and the rest right. */
function seedDiagnostic(paperId: string, weakArea: string) {
  const paper = getPaper(paperId)!
  const answers: AnsweredDiagnostic[] = []
  for (const area of paper.areas) {
    for (const q of getQuestions(paperId).filter((x) => x.area === area.code).slice(0, 2)) {
      answers.push({ q, correct: area.code !== weakArea })
    }
  }
  const result = scoreDiagnostic(paperId, answers)
  saveDiagnosticLocal(result)
  return result
}

describe("focusArea", () => {
  it("targets the diagnostic's weakest area the moment a diagnostic exists", () => {
    seedDiagnostic("FA", "D")
    const f = focusArea("FA")
    expect(f).not.toBeNull()
    expect(f!.source).toBe("diagnostic")
    expect(f!.code).toBe("D")
  })

  it("falls back to live practice weakness when there is no diagnostic", () => {
    // No diagnostic. Make area B the practice-weakest: seen but mostly wrong.
    const bqs = getQuestions("FA").filter((q) => q.area === "B").slice(0, 4)
    const cqs = getQuestions("FA").filter((q) => q.area === "C").slice(0, 4)
    for (const q of bqs) recordAnswer("FA", q, false) // 0% in B
    for (const q of cqs) recordAnswer("FA", q, true) // 100% in C
    const f = focusArea("FA")
    expect(f).not.toBeNull()
    expect(f!.source).toBe("practice")
    expect(f!.code).toBe("B")
  })

  it("lets live practice OVERRIDE the diagnostic once the area is well drilled", () => {
    seedDiagnostic("FA", "D")
    expect(focusArea("FA")!.code).toBe("D") // diagnostic leads at first
    // Drill D past the override threshold (8 questions).
    for (const q of getQuestions("FA").filter((x) => x.area === "D").slice(0, 8)) {
      recordAnswer("FA", q, true)
    }
    // D is no longer surfaced via the diagnostic (it's been drilled), so the
    // focus has moved on — the plan follows the learner's real progress.
    expect(focusArea("FA")!.code).not.toBe("D")
  })

  it("returns nothing when there is neither a diagnostic nor practice history", () => {
    expect(focusArea("FA")).toBeNull()
  })
})
