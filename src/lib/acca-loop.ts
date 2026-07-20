/*
 * Scholify — the student journey loop (ACCA-L5).
 *
 * The product's spine, as one closed loop per paper:
 *
 *   Sign up → AI onboarding → diagnostic → roadmap → today's mission →
 *   learn/practise/flashcards/revise → progress check (pass probability) →
 *   ── < 60%: the plan keeps steering at weak areas ──
 *   ── ≥ 60%: the mock exam room UNLOCKS ──
 *   mock pass/fail (fail → AI post-mortem → adaptive practice → retry) →
 *   real ACCA exam →
 *   PASS: celebrate, unlock the next paper → the loop restarts
 *   FAIL: reflection session, new exam date, new roadmap → back to missions
 *
 * This module owns the connective tissue: the 60% gate, real-exam outcomes,
 * the paper-to-paper transition, and the derived "where am I in the loop"
 * stages that JourneyMap renders. localStorage-first like the rest of the
 * ACCA engine.
 */

import { getPaperStats, getMockHistory, getDailyActivity } from "@/lib/acca"
import {
  getLatestDiagnostic,
  estimateFromPractice,
  diagnosticRange,
  PRACTICE_MIN_ANSWERED,
  type ProbabilityRange,
} from "@/lib/acca-diagnostic"
import { getPlan, setPlan } from "@/lib/acca-plan"
import {
  getPassedPapers,
  setPassedPapers,
  getStudyingPapers,
  setStudyingPapers,
} from "@/lib/acca-qualification"

/** Pass probability that unlocks the mock exam room (the sketch's ≥60% fork). */
export const MOCK_GATE = 60
/** The ACCA pass line applied to mocks. */
export const MOCK_PASS = 50
/** Mocks to sit before the real exam — Mock 1 → Mock 2 → Mock 3. */
export const MOCKS_REQUIRED = 3

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

/* ── Progress check: the single pass-probability read ─────────── */

/**
 * The learner's current pass probability on a paper: the live practice
 * estimate when they've practised ENOUGH, else their latest formal diagnostic —
 * recalibrated by a failed real sitting when one is on record (below).
 *
 * "Enough" is the point: a provisional estimate (a handful of answers, most of
 * the syllabus untouched) sits near the 50% prior by construction, which is most
 * of the way to the 60% mock gate. Publishing it would unlock the mock room — and
 * headline "you're at 61% to pass FA" — after two correct answers. So thin
 * evidence yields NULL, not a confident number: callers already treat null as
 * "no read yet", and readinessState() below gives the UI the "still measuring"
 * detail. The gate is still reachable the intended way (diagnostic, or ≥20
 * answers spanning ≥half the syllabus).
 *
 * A real exam result is the strongest evidence the model ever gets. After a
 * fail, the estimate anchors toward the real mark, and every question
 * answered since progressively hands the read back to the live practice
 * model — recovery work literally earns the number back.
 */
export function passProbability(paperId: string): number | null {
  const live = estimateFromPractice(paperId)
  const diag = getLatestDiagnostic(paperId)
  const measured = live && !live.provisional ? live : null
  const base = measured ? measured.passProbability : diag ? diag.passProbability : null

  const rec = recoveryState(paperId)
  if (!rec.active || !rec.outcome) return base

  // Map the real mark to a next-sitting probability (50 is the pass line);
  // an unshared mark reads as a near-miss.
  const score = rec.outcome.score
  const examProb = score != null ? Math.max(5, Math.min(90, 50 + (score - 50) * 2)) : 35
  if (base === null) return Math.round(examProb)
  // Exam evidence starts at 65% weight and washes out over ~260 answers.
  const w = Math.max(0, 0.65 - rec.answeredSince / 400)
  return Math.round(w * examProb + (1 - w) * base)
}

/** What the UI needs to render the pass number honestly — including "we don't have one yet". */
export interface ReadinessState {
  /** Pass probability 0–100, or null when the evidence doesn't support one. */
  prob: number | null
  /** True when we're still gathering evidence — show "still measuring", not a number. */
  measuring: boolean
  /** Answers on record for this paper, and the minimum a practice-only read needs. */
  answered: number
  answersNeeded: number
  /** Syllabus areas touched, out of the paper's total. */
  areasSeen: number
  areasTotal: number
  /** The clamped [lo, hi] interval around `prob` — null while measuring. */
  range: ProbabilityRange | null
}

/**
 * The single honest read of "where am I on this paper", for headlines and gauges.
 * When `measuring` is true there is no defensible number yet: say so, and show
 * answered/answersNeeded as the path out of it.
 */
export function readinessState(paperId: string): ReadinessState {
  const stats = getPaperStats(paperId)
  const prob = passProbability(paperId)
  const areasSeen = stats.areas.filter((a) => a.seen > 0).length
  const areasTotal = stats.areas.length
  const live = estimateFromPractice(paperId)
  const diag = getLatestDiagnostic(paperId)
  const source = live && !live.provisional ? live : diag
  return {
    prob,
    measuring: prob === null,
    answered: stats.answered,
    answersNeeded: PRACTICE_MIN_ANSWERED,
    areasSeen,
    areasTotal,
    range:
      prob === null || !source
        ? null
        : diagnosticRange(prob, source.questionsAnswered, source.confidence),
  }
}

/* ── The 60% gate (MOCK_GATE) on the mock exam room ───────────────────────── */

export interface MockGate {
  unlocked: boolean
  /** Current pass probability (0 when no evidence yet). */
  prob: number
  /** The threshold (MOCK_GATE), for display. */
  needed: number
}

/** Has the learner ever passed a timed mock on this paper? */
export function hasPassedMock(paperId: string): boolean {
  return getMockHistory(paperId).some((m) => m.percent >= MOCK_PASS)
}

export interface MockProgress {
  /** Mocks sat so far. */
  attempts: number
  /** MOCKS_REQUIRED, for display. */
  required: number
  /** Mocks passed (≥ MOCK_PASS). */
  passed: number
  /** Did the most recent mock pass? Fail here = the rehabilitation loop. */
  latestPassed: boolean
  /** Sat all required mocks AND the latest one passed → ready for the real exam. */
  examReady: boolean
}

/**
 * Progress through the Mock 1 → Mock 2 → Mock 3 sequence. A fail anywhere
 * routes through rehabilitation (post-mortem → drills → retry), so exam-ready
 * means the required count is in AND the latest sitting was a pass.
 */
export function mockProgress(paperId: string): MockProgress {
  const history = getMockHistory(paperId) // most recent first
  const attempts = history.length
  const passed = history.filter((m) => m.percent >= MOCK_PASS).length
  const latestPassed = history.length > 0 && history[0].percent >= MOCK_PASS
  return {
    attempts,
    required: MOCKS_REQUIRED,
    passed,
    latestPassed,
    examReady: attempts >= MOCKS_REQUIRED && latestPassed,
  }
}

/**
 * The readiness gate: mocks unlock at MOCK_GATE% pass probability. Once the
 * room has been unlocked and used it never re-locks — probability dips while
 * drilling new weak areas, and the fail → post-mortem → RETRY path must
 * always be able to reach "retry".
 */
export function mockGate(paperId: string): MockGate {
  const prob = passProbability(paperId) ?? 0
  return { unlocked: prob >= MOCK_GATE || getMockHistory(paperId).length > 0, prob, needed: MOCK_GATE }
}

/* ── Real-exam outcomes ───────────────────────────────────────── */

const KEY_EXAMS = "scholify-acca-exams"
const KEY_SNOOZE = "scholify-acca-exam-snooze"

export interface ExamOutcome {
  paperId: string
  /** The sitting this outcome belongs to (yyyy-MM-dd). */
  examDate: string
  passed: boolean
  /** Official mark 0–100 when the learner shared it. */
  score: number | null
  recordedAt: string
}

type ExamStore = Record<string, ExamOutcome[]>

function readExams(): ExamStore {
  try {
    const raw = window.localStorage.getItem(KEY_EXAMS)
    if (raw) return JSON.parse(raw) as ExamStore
  } catch {
    /* ignore */
  }
  return {}
}

export function recordExamOutcome(paperId: string, passed: boolean, score?: number | null): ExamOutcome {
  const outcome: ExamOutcome = {
    paperId,
    examDate: getPlan(paperId).examDate ?? todayStr(),
    passed,
    score: typeof score === "number" && Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null,
    recordedAt: new Date().toISOString(),
  }
  const store = readExams()
  store[paperId] = [...(store[paperId] ?? []), outcome].slice(-10)
  try {
    window.localStorage.setItem(KEY_EXAMS, JSON.stringify(store))
  } catch {
    /* ignore */
  }
  return outcome
}

/** Real-exam attempts for a paper, most recent first. */
export function getExamOutcomes(paperId: string): ExamOutcome[] {
  return [...(readExams()[paperId] ?? [])].reverse()
}

export function latestExamOutcome(paperId: string): ExamOutcome | null {
  return getExamOutcomes(paperId)[0] ?? null
}

/* ── The recovery run: a failed sitting is part of the journey ── */

export interface RecoveryState {
  /** True while the latest real sitting on this paper was a fail. */
  active: boolean
  outcome: ExamOutcome | null
  /** Questions answered since the failed sitting was recorded. */
  answeredSince: number
  /** Fresh timed mocks sat since the failed sitting. */
  mocksSince: number
  /** Passed a fresh mock since the fail — proven again, retake-ready. */
  provenAgain: boolean
}

const NO_RECOVERY: RecoveryState = { active: false, outcome: null, answeredSince: 0, mocksSince: 0, provenAgain: false }

/**
 * Where the learner is in the recovery run after a failed real sitting.
 * Active from the moment the fail is recorded until the next real outcome
 * (the retake) replaces it.
 */
export function recoveryState(paperId: string): RecoveryState {
  const outcome = latestExamOutcome(paperId)
  if (!outcome || outcome.passed) return NO_RECOVERY
  const failDate = outcome.recordedAt.slice(0, 10)
  const answeredSince = getDailyActivity(120)
    .filter((d) => d.date > failDate)
    .reduce((s, d) => s + d.count, 0)
  const freshMocks = getMockHistory(paperId).filter((m) => m.date > failDate)
  return {
    active: true,
    outcome,
    answeredSince,
    mocksSince: freshMocks.length,
    provenAgain: freshMocks.some((m) => m.percent >= MOCK_PASS),
  }
}

/* ── The exam-day prompt ("how did it go?") ───────────────────── */

function readSnooze(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(KEY_SNOOZE)
    if (raw) return JSON.parse(raw) as Record<string, string>
  } catch {
    /* ignore */
  }
  return {}
}

/** Hide the exam-day prompt for a few days (results not out yet). */
export function snoozeExamPrompt(paperId: string, days = 3): void {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const until = `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
  const store = readSnooze()
  store[paperId] = until
  try {
    window.localStorage.setItem(KEY_SNOOZE, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

/**
 * Should the "exam day — how did it go?" flow show for this paper?
 * True once the exam date has arrived, until an outcome is recorded for that
 * sitting (or the prompt is snoozed while results are pending).
 */
export function examDayDue(paperId: string): boolean {
  const examDate = getPlan(paperId).examDate
  if (!examDate || examDate > todayStr()) return false
  const recorded = (readExams()[paperId] ?? []).some((o) => o.examDate === examDate)
  if (recorded) return false
  const snoozedUntil = readSnooze()[paperId]
  if (snoozedUntil && snoozedUntil > todayStr()) return false
  return true
}

/* ── Loop transitions ─────────────────────────────────────────── */

/**
 * Real exam PASSED: record it, add to the qualification record, and retire
 * the paper from the studying list. The celebration UI then offers the next
 * paper (suggestedNextPapers) to restart the loop.
 */
export function completePaper(paperId: string, score?: number | null): void {
  recordExamOutcome(paperId, true, score)
  setPassedPapers([...getPassedPapers(), paperId])
  setStudyingPapers(getStudyingPapers().filter((p) => p !== paperId))
}

/** Start the loop on a new paper (from the celebration screen). */
export function startNextPaper(nextId: string): void {
  const others = getStudyingPapers().filter((p) => p !== nextId)
  setStudyingPapers([nextId, ...others])
  setPlan(nextId, { examDate: null })
}

/**
 * Real exam FAILED: record it, set the new sitting date — the roadmap,
 * phases and daily missions all re-derive from the new date automatically.
 */
export function scheduleRetake(paperId: string, newExamDate: string | null, score?: number | null): void {
  recordExamOutcome(paperId, false, score)
  setPlan(paperId, { examDate: newExamDate })
}

/* ── The journey map: where the learner is in the loop ────────── */

export type StageStatus = "done" | "current" | "todo" | "locked"

export interface JourneyStage {
  key: string
  emoji: string
  label: string
  detail: string
  status: StageStatus
}

/**
 * Derive the loop stages for a paper from real evidence. Exactly one stage
 * is "current"; stages behind it are "done", gated ones ahead are "locked".
 */
export function getJourneyStages(paperId: string): JourneyStage[] {
  const stats = getPaperStats(paperId)
  const diag = getLatestDiagnostic(paperId)
  const prob = passProbability(paperId)
  const gate = mockGate(paperId)
  const mocks = mockProgress(paperId)
  const outcome = latestExamOutcome(paperId)
  const plan = getPlan(paperId)
  const rec = recoveryState(paperId)

  const diagnosed = Boolean(diag) || stats.answered >= 5
  const hasRoadmap = Boolean(plan.examDate) || diagnosed
  const examPassed = Boolean(outcome?.passed)

  const stages: JourneyStage[] = [
    {
      key: "onboarding",
      emoji: "🎓",
      label: "AI onboarding",
      detail: "Exam, date and experience captured — Lara knows your starting point.",
      status: "done",
    },
    {
      key: "diagnostic",
      emoji: "🎯",
      label: "Initial diagnostic",
      detail: diagnosed
        ? "Baseline set — your Exam Readiness Score and weak areas are mapped."
        : "~15 min to find your Exam Readiness Score and weak areas.",
      status: diagnosed ? "done" : "current",
    },
    {
      key: "roadmap",
      emoji: "🗺️",
      label: "Personalised roadmap",
      detail: plan.examDate
        ? "Four phases, dated back from your exam day."
        : "Paced by mastery — add your exam date for a day-by-day plan.",
      status: hasRoadmap ? "done" : diagnosed ? "current" : "todo",
    },
    {
      key: "missions",
      emoji: "⚡",
      label: "Today's mission",
      detail: "Learn · AI tutor · practice · flashcards · revision — one plan a day, no choosing.",
      status: !diagnosed ? "todo" : gate.unlocked ? "done" : "current",
    },
    {
      key: "progress",
      emoji: "📈",
      label: "Progress check — Exam Readiness Score",
      detail:
        prob === null
          ? "Every answer moves this number."
          : gate.unlocked
            ? `You're at ${prob}% — mock room unlocked.`
            : `You're at ${prob}% — reach ${MOCK_GATE}% and the mock room unlocks. Until then it's revision: I keep adjusting your plan at your weak topics.`,
      status: !diagnosed ? "todo" : gate.unlocked ? "done" : "current",
    },
    {
      key: "mock",
      emoji: "⏱️",
      label: "Mock 1 → Mock 2 → Mock 3",
      detail: mocks.examReady
        ? `All ${mocks.required} mocks sat and the latest passed — proven under exam conditions.`
        : gate.unlocked
          ? `${mocks.attempts} of ${mocks.required} sat${mocks.attempts > 0 && !mocks.latestPassed ? " — last one didn't pass, so it's rehabilitation: post-mortem, drills, retry" : ""}. Timed, no hints.`
          : `Locked until a ${MOCK_GATE}% Exam Readiness Score.`,
      status: mocks.examReady ? "done" : gate.unlocked ? "current" : "locked",
    },
    {
      key: "exam",
      emoji: "🏛️",
      label: rec.active ? "Real ACCA exam — first sitting" : "Real ACCA exam",
      detail: examPassed
        ? "Passed — this paper is behind you."
        : rec.active
          ? "Not this time — recorded, reflected on, and feeding the plan. The retake run is live."
          : mocks.examReady
            ? plan.examDate
              ? "You're rehearsed and ready. Keep mocks warm until the day."
              : "You're mock-ready — book your sitting and set the date."
            : `Unlocks after ${MOCKS_REQUIRED} mocks with the latest one passed.`,
      status: examPassed ? "done" : rec.active ? "done" : mocks.examReady ? "current" : "locked",
    },
    ...(rec.active
      ? [
          {
            key: "recovery",
            emoji: "🩺",
            label: "Recovery run — the retake",
            detail: rec.provenAgain
              ? `Fresh mock passed since the sitting — you're proven again. Keep it warm until retake day${plan.examDate ? ` (${plan.examDate})` : " — set your new date"}.`
              : rec.answeredSince > 0
                ? `${rec.answeredSince} questions into the comeback. You know exactly where the marks were lost — close those gaps, then prove it with a fresh mock.`
                : "You now know exactly where the marks were lost. Let's recover them: targeted drills → a fresh mock → the retake.",
            status: "current" as StageStatus,
          },
        ]
      : []),
    {
      key: "next",
      emoji: "🔁",
      label: examPassed ? "Celebrate — next paper unlocked" : "The loop continues",
      detail: examPassed
        ? "Progress updated. Pick your next paper and the loop restarts."
        : "Pass: celebrate and unlock the next paper. Not this time: reflect, recalibrate, rebuild — and back into the loop until you're through.",
      status: examPassed ? "current" : "locked",
    },
  ]

  // Exactly one "current": during a recovery run the recovery stage owns it
  // (mock rehabilitation is part of that run, not a separate place).
  if (rec.active) {
    for (const s of stages) {
      if (s.key !== "recovery" && s.status === "current") s.status = "done"
    }
  }

  return stages
}

/** The stage the learner is on right now (for compact displays). */
export function currentStage(paperId: string): JourneyStage {
  const stages = getJourneyStages(paperId)
  return stages.find((s) => s.status === "current") ?? stages[stages.length - 1]
}
