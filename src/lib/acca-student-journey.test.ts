import { describe, it, expect } from "vitest"
import { setExperience, setGoal, markAccaOnboarded, isAccaOnboarded, getPaperVariant } from "@/lib/acca-profile"
import { setPlan, getPlan, daysUntilExam, generateStudyPlan, currentPhase, todayMission } from "@/lib/acca-plan"
import { buildTodayPlan, markTodayTaskDone, getTodayDone, setPendingTodayTask, resolvePendingTodayTask, completePendingTodayTask, allocateTaskMinutes } from "@/lib/acca-today"
import { chaptersForPaper } from "@/lib/acca-study-content"
import {
  getQuestions, getPaper, buildAdaptiveSession, buildSession, gradeQuestion, recordAnswer,
  getPaperStats, getOverallProgress, getTodayStats, getDailyActivity, getWeekComparison,
  recordMock, getMockHistory, snapshotProgress, restoreProgress, progressAnsweredCount,
} from "@/lib/acca"
import { buildDiagnostic, scoreDiagnostic, saveDiagnosticLocal, getLatestDiagnostic, type AnsweredDiagnostic } from "@/lib/acca-diagnostic"
import { getFlashcards, getDueFlashcards, reviewFlashcard, flashcardStats } from "@/lib/acca-flashcards"
import { buildCbeMock } from "@/lib/acca-cbe-mock"
import {
  MOCK_PASS, MOCKS_REQUIRED, MOCK_GATE, mockGate, mockProgress, passProbability, readinessState,
  getJourneyStages, recordExamOutcome, latestExamOutcome, recoveryState, completePaper,
} from "@/lib/acca-loop"
import { getWrittenQuestions } from "@/lib/acca-written"

/*
 * THE STUDENT JOURNEY, END TO END.
 *
 * Every other suite checks one module. This one walks the path a real candidate
 * walks — onboard, plan, diagnose, study, practise, revise, unlock the mock room,
 * sit three mocks, reach exam day — in ORDER, against one paper. The point is the
 * SEAMS: recordAnswer feeding passProbability, the mock gate agreeing with the
 * readiness number, journey stages flipping as evidence arrives, a snapshot
 * surviving a restore.
 *
 * MA is the paper, deliberately: 35×2 + 3×10 is the most structured Section B in
 * the Applied Knowledge tier, and its mocks were freshly benchmarked against
 * three real papers (19 Aug 2026).
 *
 * STRUCTURE NOTE — one stage, one `it`. The global setup wipes localStorage
 * before every test (src/test/setup.ts, beforeEach), which is right for unit
 * suites and fatal for a journey spread across many `it`s. So each stage
 * rebuilds the state it needs through the same helpers a real session would
 * have run, and the final stage walks the WHOLE journey in one test to prove
 * the seams hold in sequence.
 */

const PAPER = "MA"

/* ── The journey's building blocks, reused by every stage ───────── */

function onboard(): void {
  setExperience("some")
  setGoal("first-pass")
  markAccaOnboarded()
  const exam = new Date()
  exam.setDate(exam.getDate() + 90)
  setPlan(PAPER, {
    examDate: exam.toISOString().slice(0, 10),
    dailyMinutes: 45,
    daysPerWeek: 5,
    studyDays: [1, 2, 3, 4, 5],
    dailyGoal: 12,
    targetProb: 75,
  })
}

function sitDiagnostic(): void {
  const qs = buildDiagnostic(PAPER, 42)
  const answers: AnsweredDiagnostic[] = qs.map((q, i) => ({ q, correct: i % 3 !== 0 }))
  saveDiagnosticLocal(scoreDiagnostic(PAPER, answers))
}

/** Weeks of practice compressed: n answers at roughly 6-in-7 accuracy. */
function practise(n: number): void {
  const session = buildSession(PAPER, n, undefined, 7)
  session.forEach((q, i) => recordAnswer(PAPER, q, i % 7 !== 0))
}

function sitAllMocks(): void {
  for (const form of [1, 2, 3]) recordMock(PAPER, 58 + (form - 1) * 6, 100, form)
}

/* ── Stage 1 · onboarding ───────────────────────────────────────── */

describe("Stage 1 — onboarding: the student arrives", () => {
  it("captures experience, goal, the onboarded flag and a dated plan", () => {
    expect(isAccaOnboarded()).toBe(false)
    onboard()
    expect(isAccaOnboarded()).toBe(true)
    const plan = getPlan(PAPER)
    expect(plan.examDate).toBeTruthy()
    expect(plan.studyDays).toEqual([1, 2, 3, 4, 5])
    const d = daysUntilExam(PAPER)
    expect(d).not.toBeNull()
    expect(d!).toBeGreaterThanOrEqual(88)
    expect(d!).toBeLessThanOrEqual(91)
  })

  it("variants: MA has none, LW defaults Global, TX defaults UK", () => {
    expect(getPaperVariant(PAPER)).toBeNull()
    expect(getPaperVariant("LW")).toBe("GLOBAL")
    expect(getPaperVariant("TX")).toBe("UK")
  })

  it("generates a phased study plan, a current phase and a daily mission", () => {
    onboard()
    const sp = generateStudyPlan(PAPER)
    expect(sp.phases.length).toBeGreaterThanOrEqual(3)
    expect(currentPhase(PAPER).key).toBeTruthy()
    expect(todayMission(PAPER).title).toBeTruthy()
  })
})

/* ── Stage 2 · the first day ────────────────────────────────────── */

describe("Stage 2 — today's plan and the content behind it", () => {
  it("builds a today plan whose tasks carry real minutes", () => {
    onboard()
    const tasks = buildTodayPlan(PAPER)
    expect(tasks.length).toBeGreaterThan(0)
    const minutes = allocateTaskMinutes(tasks, getPlan(PAPER).dailyMinutes)
    expect(minutes).toHaveLength(tasks.length)
    // The allocation must hand out real time and respect the learner's budget.
    expect(minutes.every((m) => m > 0)).toBe(true)
    expect(minutes.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(getPlan(PAPER).dailyMinutes + 15)
    for (const t of tasks) {
      expect(t.id).toBeTruthy()
      expect(t.title).toBeTruthy()
      expect(t.action).toBeTruthy()
    }
  })

  it("serves the full authored chapter tree", () => {
    const chapters = chaptersForPaper(PAPER)
    expect(chapters.length).toBeGreaterThanOrEqual(27)
    for (const ch of chapters) expect(ch.sections.length, `${ch.title}`).toBeGreaterThan(0)
  })

  it("completes today tasks through the pending-task lifecycle", () => {
    onboard()
    const tasks = buildTodayPlan(PAPER)
    const first = tasks[0]
    setPendingTodayTask(PAPER, first.id)
    expect(resolvePendingTodayTask(PAPER)).toBe(true)
    expect(getTodayDone(PAPER)).toContain(first.id)
    if (tasks[1]) {
      // A task requiring explicit completion must NOT auto-resolve.
      setPendingTodayTask(PAPER, tasks[1].id, true)
      expect(resolvePendingTodayTask(PAPER)).toBe(false)
      expect(completePendingTodayTask(PAPER)).toBe(true)
      expect(getTodayDone(PAPER)).toContain(tasks[1].id)
    }
    if (tasks[2]) {
      markTodayTaskDone(PAPER, tasks[2].id)
      expect(getTodayDone(PAPER)).toContain(tasks[2].id)
    }
  })
})

/* ── Stage 3 · the diagnostic ───────────────────────────────────── */

describe("Stage 3 — the diagnostic finds the starting point", () => {
  it("builds, sits, scores and saves a diagnostic", () => {
    onboard()
    const qs = buildDiagnostic(PAPER, 42)
    expect(qs.length).toBeGreaterThanOrEqual(8)
    const answers: AnsweredDiagnostic[] = qs.map((q, i) => ({ q, correct: i % 3 !== 0 }))
    const result = scoreDiagnostic(PAPER, answers)
    expect(result.passProbability).toBeGreaterThan(0)
    expect(result.passProbability).toBeLessThanOrEqual(100)
    expect(result.areas.length).toBeGreaterThan(0)
    saveDiagnosticLocal(result)
    expect(getLatestDiagnostic(PAPER)).not.toBeNull()
  })

  it("flips the journey stages: onboarding, diagnostic and roadmap done", () => {
    onboard()
    sitDiagnostic()
    const byKey = Object.fromEntries(getJourneyStages(PAPER).map((s) => [s.key, s.status]))
    expect(byKey["onboarding"]).toBe("done")
    expect(byKey["diagnostic"]).toBe("done")
    expect(byKey["roadmap"]).toBe("done")
  })
})

/* ── Stage 4 · practice ─────────────────────────────────────────── */

describe("Stage 4 — practice: weeks of answering, compressed", () => {
  it("grades every question in the bank on its own key, right and wrong", () => {
    const qs = getQuestions(PAPER)
    expect(qs.length).toBeGreaterThanOrEqual(300)
    for (const q of qs) {
      if (q.type === "number") {
        expect(gradeQuestion(q, q.numericAnswer!).correct, `${q.id} accepts its own answer`).toBe(true)
        expect(gradeQuestion(q, q.numericAnswer! + Math.abs(q.numericAnswer! || 1) * 10 + 1e6).correct, `${q.id} rejects a far-off answer`).toBe(false)
      } else if (typeof q.correct === "number" && q.options) {
        expect(gradeQuestion(q, q.correct).correct, `${q.id} accepts its key`).toBe(true)
        expect(gradeQuestion(q, (q.correct + 1) % q.options.length).correct, `${q.id} rejects the next option`).toBe(false)
      } else if (Array.isArray(q.correct)) {
        expect(gradeQuestion(q, q.correct).correct, `${q.id} accepts its multi key`).toBe(true)
        expect(gradeQuestion(q, []).correct, `${q.id} rejects an empty selection`).toBe(false)
      }
    }
  })

  it("a practice record accumulates and stats reflect it", () => {
    onboard()
    practise(120)
    const stats = getPaperStats(PAPER)
    expect(stats.answered).toBeGreaterThanOrEqual(100)
    expect(stats.accuracy).toBeGreaterThan(0.7)
    expect(stats.areas.some((a) => a.seen > 0)).toBe(true)
  })

  it("adaptive sessions build from the record without duplicates", () => {
    onboard()
    practise(60)
    const adaptive = buildAdaptiveSession(PAPER, 10)
    expect(adaptive.length).toBeGreaterThan(0)
    expect(new Set(adaptive.map((q) => q.id)).size).toBe(adaptive.length)
  })

  it("flashcards deal, review and count", () => {
    const cards = getFlashcards(PAPER)
    expect(cards.length).toBeGreaterThanOrEqual(50)
    const due = getDueFlashcards(PAPER)
    expect(due.length).toBeGreaterThan(0)
    for (const c of due.slice(0, 20)) reviewFlashcard(c.id, true)
    const fs = flashcardStats(PAPER)
    expect(fs.total).toBe(cards.length)
    expect(fs.due).toBeLessThanOrEqual(due.length)
  })
})

/* ── Stage 5 · the whole journey, in sequence ───────────────────── */

describe("Stage 5 — the complete journey in one sitting", () => {
  it("onboard → diagnose → practise → readiness → mocks → exam-ready → exam day", () => {
    /* Onboard. */
    onboard()
    expect(isAccaOnboarded()).toBe(true)

    /* Diagnose. */
    sitDiagnostic()
    expect(getLatestDiagnostic(PAPER)).not.toBeNull()

    /* Practise for weeks. */
    practise(120)
    const stats = getPaperStats(PAPER)
    expect(stats.answered).toBeGreaterThanOrEqual(100)

    /* The readiness number is live, and the gate agrees with it. */
    const prob = passProbability(PAPER)
    expect(prob).not.toBeNull()
    const gate = mockGate(PAPER)
    expect(gate.unlocked).toBe((prob ?? 0) >= MOCK_GATE || getMockHistory(PAPER).length > 0)

    /* Sit all three mock forms — each builds, none shares an item. */
    const seen = new Set<string>()
    for (const form of [1, 2, 3]) {
      const mock = buildCbeMock(PAPER, form)
      expect(mock.totalMarks).toBe(100)
      for (const s of mock.sections) {
        for (const item of s.items) {
          const id = item.kind === "task" ? item.task.id : item.q.id
          expect(seen.has(id), `${id} repeats across MA forms`).toBe(false)
          seen.add(id)
        }
      }
    }
    sitAllMocks()
    expect(getMockHistory(PAPER)).toHaveLength(3)

    /* Three passes make the student exam-ready. */
    const prog = mockProgress(PAPER)
    expect(prog.attempts).toBe(MOCKS_REQUIRED)
    expect(prog.passed).toBe(3)
    expect(prog.latestPassed).toBe(true)
    expect(prog.examReady).toBe(true)
    for (const h of getMockHistory(PAPER)) expect(h.percent).toBeGreaterThanOrEqual(MOCK_PASS)
    const ready = readinessState(PAPER)
    expect(ready.measuring).toBe(false)
    expect(ready.prob).not.toBeNull()
    expect(ready.areasSeen).toBeGreaterThan(0)

    /* The journey map shows it. */
    const byKey = Object.fromEntries(getJourneyStages(PAPER).map((s) => [s.key, s.status]))
    expect(byKey["missions"]).toBe("done")
    expect(byKey["progress"]).toBe("done")

    /* Dashboards read the same record coherently. */
    const overall = getOverallProgress()
    expect(overall.totalAnswered).toBeGreaterThanOrEqual(stats.answered)
    expect(getTodayStats().answered).toBeGreaterThan(0)
    expect(progressAnsweredCount()).toBeGreaterThan(0)
    const days = getDailyActivity(35)
    expect(days).toHaveLength(35)
    expect(days[days.length - 1].count).toBeGreaterThan(0)
    expect(getWeekComparison().answered).toBeGreaterThan(0)

    /* The record survives a snapshot/restore round-trip. */
    const before = getPaperStats(PAPER).answered
    const snap = snapshotProgress()
    restoreProgress(snap)
    expect(getPaperStats(PAPER).answered).toBe(before)

    /* Exam day: a pass completes the paper. */
    recordExamOutcome(PAPER, true, 68)
    expect(latestExamOutcome(PAPER)?.passed).toBe(true)
    completePaper(PAPER, 68)
  })

  it("a failed exam produces a recovery state, not a dead end", () => {
    recordMock("FA", 55, 100, 1)
    recordExamOutcome("FA", false, 42)
    expect(latestExamOutcome("FA")?.passed).toBe(false)
    expect(recoveryState("FA")).toBeTruthy()
  })

  it("the written-practice surface copes with an objective-only paper", () => {
    // MA has no constructed section in the real exam; the surface must read an
    // empty (or advisory) list rather than crash.
    const written = getWrittenQuestions(PAPER)
    expect(Array.isArray(written)).toBe(true)
    expect(getPaper(PAPER)).toBeTruthy()
  })
})
