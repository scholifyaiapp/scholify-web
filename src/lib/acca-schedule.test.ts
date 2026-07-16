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

/*
 * The categorised study day (founder spec): topic learning → essentials ×5 →
 * daily practice (pain point first) → flashcards — proportioned to the
 * onboarding answers, progression AND weakness every day.
 */
import { buildDailyTasks, ESSENTIALS_SIZE } from "@/lib/acca-schedule"
import { setPlan } from "@/lib/acca-plan"
import { setStartMode } from "@/lib/acca-profile"

describe("buildDailyTasks — the categorised day", () => {
  it("produces the four categories in order once a baseline exists", () => {
    setStartMode("assess")
    seedDiagnostic("FA", "D")
    setPlan("FA", { dailyMinutes: 25, targetProb: 75 })
    const tasks = buildDailyTasks("FA")
    const ids = tasks.map((t) => t.id)
    expect(ids[0]).toBe("study")
    expect(ids[1]).toBe("essentials")
    expect(["weak", "practice"]).toContain(ids[2])
    expect(ids[3]).toBe("flashcards")
  })

  it("aims daily practice at the diagnostic's pain point while studying a NEW topic", () => {
    setStartMode("assess")
    seedDiagnostic("FA", "D")
    setPlan("FA", { dailyMinutes: 25, targetProb: 75 })
    const tasks = buildDailyTasks("FA")
    const study = tasks.find((t) => t.id === "study")!
    const drill = tasks.find((t) => t.id === "weak")
    expect(drill, "pain-point drill must exist the day after a diagnostic").toBeDefined()
    expect(drill!.area).toBe("D")
    // Progression continues alongside the pain point: study targets an area,
    // and when it happens to differ from the weakness both run the same day.
    expect(study.area).toBeTruthy()
  })

  it("essentials carries the studied area and the ×5 size", () => {
    setStartMode("assess")
    seedDiagnostic("FA", "D")
    const tasks = buildDailyTasks("FA")
    const study = tasks.find((t) => t.id === "study")!
    const ess = tasks.find((t) => t.id === "essentials")!
    expect(ess.area).toBe(study.area)
    expect(ess.title).toContain(`×${ESSENTIALS_SIZE}`)
  })

  it("proportions practice volume to the onboarding minutes and target", () => {
    setStartMode("assess")
    seedDiagnostic("FA", "D")
    setPlan("FA", { dailyMinutes: 15, targetProb: 65 })
    const small = buildDailyTasks("FA").find((t) => t.id === "weak" || t.id === "practice")!
    setPlan("FA", { dailyMinutes: 60, targetProb: 85 })
    const large = buildDailyTasks("FA").find((t) => t.id === "weak" || t.id === "practice")!
    expect(large.minutes).toBeGreaterThan(small.minutes)
  })

  it("zero-start gate days pin study AND practice to the gate section (no weakness-hunting yet)", () => {
    setStartMode("zero")
    setPlan("FA", { dailyMinutes: 25, targetProb: 75 })
    const tasks = buildDailyTasks("FA")
    const ids = tasks.map((t) => t.id)
    expect(ids).toEqual(["study", "essentials", "practice", "flashcards"])
    const study = tasks.find((t) => t.id === "study")!
    expect(["A", "B", "C"]).toContain(study.area!)
    expect(tasks.find((t) => t.id === "practice")!.area).toBe(study.area)
  })
})
