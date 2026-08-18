import { describe, it, expect, vi, afterEach } from "vitest"
import { composeToday } from "@/lib/acca-today-composer"
import { setPlan } from "@/lib/acca-plan"
import { setStartMode } from "@/lib/acca-profile"
import { markChapterRead } from "@/lib/acca-topic-plan"
import { chapterKey, type StudyChapter } from "@/lib/acca-study-content"
import { getPaper, getQuestions, recordAnswer, recordMock } from "@/lib/acca"
import { recordDayActive } from "@/lib/acca-schedule"
import { passProbability, mockProgress } from "@/lib/acca-loop"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import { scoreDiagnostic, saveDiagnosticLocal, type AnsweredDiagnostic } from "@/lib/acca-diagnostic"
import { saveLearnerBaseline } from "@/lib/acca-learner-baseline"

/*
 * THE 15-DAY STUDENT JOURNEY — an "ACCA student" driven through the real engine.
 *
 * This is the automated equivalent of a QA analyst being a student: it onboards
 * a zero-start learner, then lives 15 consecutive days (system clock advanced),
 * composing each day, reading the chapter, answering questions, and recording
 * activity — exactly what a learner does — and asserts the journey never breaks:
 * every day is a real, non-empty day; the plan advances through chapters instead
 * of getting stuck; readiness is always a sane number; and mocks build and record
 * coherently. A crash or an incoherent day on ANY of the 15 days fails here,
 * where the node/logic suite and typecheck are blind.
 */

afterEach(() => vi.useRealTimers())

function seedPassingDiagnostic(paper: string): void {
  const p = getPaper(paper)
  if (!p) return
  const answers: AnsweredDiagnostic[] = []
  for (const area of p.areas) {
    for (const q of getQuestions(paper).filter((x) => x.area === area.code).slice(0, 2)) {
      answers.push({ q, correct: true })
    }
  }
  if (answers.length) saveDiagnosticLocal(scoreDiagnostic(paper, answers))
}

/** Do a day's work the way a learner would: read the chapter, answer questions. */
function doTheDay(paper: string, chapter: StudyChapter | null): void {
  if (chapter) markChapterRead(paper, chapterKey(chapter))
  const area = chapter?.area
  const scoped = getQuestions(paper).filter((q) => !q.recall && (!area || q.area === area))
  const pool = scoped.length ? scoped : getQuestions(paper).filter((q) => !q.recall)
  // 80% correct — a learner who is genuinely improving.
  pool.slice(0, 15).forEach((q, i) => recordAnswer(paper, q, i % 5 !== 0))
  recordDayActive(paper)
}

function liveFifteenDays(paper: string, days = 15): Set<string> {
  const chaptersSeen = new Set<string>()
  for (let d = 0; d < days; d++) {
    vi.setSystemTime(new Date(2026, 8, 1 + d, 9, 0, 0))
    let comp = composeToday(paper)
    // A zero-start learner hits the diagnostic milestone once the gate is met.
    if (comp.isDiagnosticDay) {
      seedPassingDiagnostic(paper)
      comp = composeToday(paper)
    }
    // Every day must be a real, completable day — never an empty/broken screen.
    expect(comp.blocks.length, `${paper} day ${d + 1} has blocks`).toBeGreaterThan(0)
    expect(comp.isDiagnosticDay || comp.chapter !== null, `${paper} day ${d + 1} is a real day`).toBe(true)
    if (comp.chapter) chaptersSeen.add(chapterKey(comp.chapter))
    doTheDay(paper, comp.chapter)
  }
  return chaptersSeen
}

describe("the 15-day ACCA student journey", () => {
  it("a zero-start BT learner completes 15 coherent days and advances through chapters", () => {
    vi.useFakeTimers()
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 80 })
    setStartMode("zero")

    const chaptersSeen = liveFifteenDays("BT")

    // The plan progressed — a learner who studies daily is not stuck on chapter one.
    expect(chaptersSeen.size, "advanced through several chapters over 15 days").toBeGreaterThan(3)

    // Readiness is always a real, in-range number after real study.
    const prob = passProbability("BT")
    expect(prob).not.toBeNull()
    expect(prob!).toBeGreaterThanOrEqual(0)
    expect(prob!).toBeLessThanOrEqual(100)
  })

  it("the newly authored SBR paper composes coherent days too", () => {
    vi.useFakeTimers()
    setPlan("SBR", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 80 })
    setStartMode("zero")

    const chaptersSeen = liveFifteenDays("SBR", 10)
    expect(chaptersSeen.size, "SBR advanced through chapters").toBeGreaterThan(2)
  })

  it("the PRACTICE route keeps its promise — no chapter to read, quiz-led, topics rotate", () => {
    vi.useFakeTimers()
    setPlan("SBR", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 80 })
    saveLearnerBaseline({ route: "practice", englishLevel: "C1", englishEvidence: "self", updatedAt: new Date().toISOString() })

    const topics = new Set<string>()
    for (let d = 0; d < 12; d++) {
      vi.setSystemTime(new Date(2026, 8, 1 + d, 9, 0, 0))
      const comp = composeToday("SBR")
      // The promise: NO study block. The day leads with the quiz.
      expect(comp.blocks.some((b) => b.kind === "study"), `day ${d + 1} has no study block`).toBe(false)
      expect(comp.blocks[0].kind, `day ${d + 1} leads with the quiz`).toBe("quiz")
      // Still quizzes + practice + flashcards.
      const kinds = new Set(comp.blocks.map((b) => b.kind))
      expect(kinds.has("quiz") && kinds.has("practice") && kinds.has("flashcards")).toBe(true)
      if (comp.chapter) topics.add(chapterKey(comp.chapter))
      recordDayActive("SBR")
    }
    // The topic varies across the fortnight rather than being stuck on one.
    expect(topics.size, "practice topics rotate over the days").toBeGreaterThan(2)
  })

  it("mocks build for all three forms and record into the learner's history", () => {
    vi.useFakeTimers()
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 80 })
    setStartMode("zero")
    // A fortnight of generous practice to push readiness toward the mock gate.
    const pool = getQuestions("BT").filter((q) => !q.recall)
    for (let d = 0; d < 15; d++) {
      vi.setSystemTime(new Date(2026, 8, 1 + d, 9, 0, 0))
      pool.slice(d * 18, d * 18 + 18).forEach((q) => recordAnswer("BT", q, true))
      recordDayActive("BT")
    }

    for (const form of [1, 2, 3]) {
      const mock = buildCbeMock("BT", form)
      expect(mock.totalMarks, `form ${form} has marks`).toBeGreaterThan(0)
      expect(mock.sections.length, `form ${form} has sections`).toBeGreaterThan(0)
    }

    recordMock("BT", 68, 100, 1)
    recordMock("BT", 74, 100, 2)
    const progress = mockProgress("BT")
    expect(progress.attempts).toBe(2)
    expect(progress.passed).toBe(2) // both above the 50% pass line
    expect(progress.latestPassed).toBe(true)
  })
})
