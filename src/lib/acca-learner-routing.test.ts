import { describe, it, expect, beforeEach } from "vitest"
import { recordAnswer } from "@/lib/acca"
import { currentPhase, setPlan } from "@/lib/acca-plan"
import { buildDailyTasks } from "@/lib/acca-schedule"
import { setStartMode } from "@/lib/acca-profile"
import { saveLearnerBaseline, type LearnerRoute } from "@/lib/acca-learner-baseline"
import { buildDiagnostic, scoreDiagnostic, saveDiagnosticLocal } from "@/lib/acca-diagnostic"

/*
 * Where a learner ENTERS the loop, by the route they declared at onboarding and
 * what their diagnostic then proved.
 *
 * The bug this guards: currentPhase gated Learn on `stats.coverage < 0.85`, and
 * coverage counts questions attempted IN SCHOLIFY. A learner who had finished
 * Kaplan, BPP and the ACCA Study Hub sat at ~7% coverage after a 25-question
 * diagnostic, so they were held in Learn for ~300 questions — told to study area
 * A one month before their exam, when what they asked for was mocks. All three
 * onboarding routes produced an identical day plan.
 *
 * Ordering matters here: evidence outranks self-report. A learner may claim to
 * have finished the syllabus and be wrong, and the diagnostic has to be able to
 * pull them back to Learn.
 */

const PAPER = "FR"

function sitDiagnostic(accuracy: number): void {
  const form = buildDiagnostic(PAPER, 42)
  const answers = form.map((q, index) => ({ q, correct: index / form.length < accuracy }))
  for (const answer of answers) recordAnswer(PAPER, answer.q, answer.correct)
  saveDiagnosticLocal(scoreDiagnostic(PAPER, answers))
}

function onboard(route: LearnerRoute, mode: "zero" | "assess", daysToExam: number | null): void {
  setStartMode(mode)
  saveLearnerBaseline({ route, englishLevel: "B2", englishEvidence: "self", updatedAt: "2026-07-27" })
  const examDate = daysToExam === null ? null : (() => {
    const d = new Date(Date.now() + daysToExam * 86_400_000)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  })()
  setPlan(PAPER, { examDate, dailyMinutes: 90, targetProb: 75 })
}

beforeEach(() => localStorage.clear())

describe("route decides where the learner enters the loop", () => {
  it("a learner who finished the material and proved it goes straight to REHEARSE, and their day is a mock", () => {
    onboard("practice", "assess", 30)
    sitDiagnostic(0.84)
    expect(currentPhase(PAPER).key).toBe("rehearse")
    const today = buildDailyTasks(PAPER).map((t) => t.id)
    expect(today, "a mock is the whole point of this learner's month").toContain("mock")
    expect(today, "never send someone who has finished the syllabus back to chapter A").not.toContain("study")
  })

  it("a learner part-way through a course enters at STRENGTHEN, not Learn", () => {
    onboard("course", "assess", 120)
    sitDiagnostic(0.55)
    expect(currentPhase(PAPER).key).toBe("strengthen")
  })

  it("a learner starting from zero still enters at LEARN, in syllabus order", () => {
    onboard("new", "zero", 240)
    expect(currentPhase(PAPER).key).toBe("learn")
    const study = buildDailyTasks(PAPER).find((t) => t.id === "study")
    expect(study, "a zero-start day leads with studying a topic").toBeDefined()
    // Systematic coverage: the first area, not a weakness-ranked one.
    expect(study!.area).toBe("A")
  })

  it("EVIDENCE outranks the self-report: claiming to have finished but scoring badly returns to LEARN", () => {
    onboard("practice", "assess", 60)
    sitDiagnostic(0.3)
    expect(currentPhase(PAPER).key, "30% contradicts 'I have finished the material'").toBe("learn")
  })

  it("a returner studies in order of NEED; a beginner studies in syllabus order", () => {
    onboard("course", "assess", 120)
    sitDiagnostic(0.55)
    const returnerArea = buildDailyTasks(PAPER).find((t) => t.id === "study")?.area
    expect(returnerArea).toBeDefined()

    localStorage.clear()
    onboard("new", "zero", 240)
    const beginnerArea = buildDailyTasks(PAPER).find((t) => t.id === "study")?.area
    expect(beginnerArea).toBe("A")
    // The returner is not simply walked from the top of the syllabus. Their time
    // is the scarce resource — that is why they left a course in the first place.
    expect(returnerArea).not.toBe(beginnerArea)
  })

  it("still switches everyone to rehearsal inside the last two weeks", () => {
    onboard("course", "assess", 10)
    sitDiagnostic(0.55)
    expect(currentPhase(PAPER).key).toBe("rehearse")
  })

  it("falls back to the evidence-only path when no route was recorded", () => {
    // Pre-migration accounts have no learner baseline. They must keep working.
    setStartMode("assess")
    setPlan(PAPER, { examDate: null, dailyMinutes: 90, targetProb: 75 })
    sitDiagnostic(0.84)
    expect(["learn", "strengthen", "revise", "rehearse"]).toContain(currentPhase(PAPER).key)
  })
})
