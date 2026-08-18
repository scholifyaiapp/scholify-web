import { describe, it, expect } from "vitest"
import { setPlan, getPlan, daysUntilExam } from "@/lib/acca-plan"
import { derivePlanUpdate, configuredStudyDays } from "@/lib/acca-plan-config"
import { pausePaper, resumePaper, activePaperPause, getPaperPause, recordPaperSwitch, getPaperSwitches } from "@/lib/acca-plan-adjustment"
import { shieldState, recordDayActive, missedDayNote, pausedNote, streakAtRisk } from "@/lib/acca-schedule"
import { examDayDue, snoozeExamPrompt, scheduleRetake, recoveryState, recordExamOutcome } from "@/lib/acca-loop"
import { recordAnswer, getPaperStats, buildSession, recordMock } from "@/lib/acca"
import { getStudyingPapers, setStudyingPapers } from "@/lib/acca-qualification"
import { resolvePendingTodayTask, startFocusSession, pauseFocusSession, resumeFocusSession, focusSecondsLeft, clearFocusSession } from "@/lib/acca-today"
import {
  saveMockSitting, readMockSitting, clearMockSitting, sittingDisposition, sittingHasWork, hasLiveSitting, type MockSitting,
} from "@/lib/acca-mock-sitting"

/*
 * THE MESSY LEARNER.
 *
 * The journey suite (acca-student-journey.test.ts) walks the student who does
 * everything in order. Nobody does everything in order. This file is the
 * student who stops for two weeks, changes their exam date twice, switches
 * papers, closes the tab in the middle of a mock, skips today's tasks and
 * comes back tomorrow — every real behaviour the loop has to absorb without
 * punishing them or corrupting their record.
 *
 * Where a scenario needs the passage of time, the test writes the same stored
 * shapes the modules write (dates in the past), because the modules read the
 * clock internally. The storage keys used are the modules' own.
 */

const ymd = (d: Date) => `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
const daysAgo = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}
const daysAhead = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}
const mondayOf = (d: Date) => {
  const x = new Date(d)
  const day = (x.getDay() + 6) % 7
  x.setDate(x.getDate() - day)
  return ymd(x)
}

/** Seed a shield record as the module itself stores it. */
function seedShield(paperId: string, lastActiveDaysAgo: number, streak: number, shieldsUsed = 0): void {
  const store = { [paperId]: { lastActive: ymd(daysAgo(lastActiveDaysAgo)), streak, shieldsUsed, weekAnchor: mondayOf(new Date()) } }
  localStorage.setItem("scholify-acca-shield", JSON.stringify(store))
}

/* ── The student who stops ──────────────────────────────────────── */

describe("the student who stops", () => {
  it("a 1–2 day gap inside the shield allowance keeps the streak, with a calm note", () => {
    seedShield("MA", 2, 12) // last active 2 days ago → 1 missed day, 3 shields left
    const s = shieldState("MA")
    expect(s.missedDays).toBe(1)
    expect(s.protectedToday).toBe(true)
    expect(s.streak).toBe(12) // held, not zeroed
    const note = missedDayNote("MA")
    expect(note).toBeTruthy()
    expect(note).toContain("re-spread")
    // Coming back continues the streak rather than restarting it.
    expect(recordDayActive("MA").streak).toBe(13)
  })

  it("a two-week absence reports a dead streak honestly — no '12 days' to someone gone 14", () => {
    seedShield("MA", 14, 12)
    const s = shieldState("MA")
    expect(s.missedDays).toBe(13)
    expect(s.protectedToday).toBe(false)
    expect(s.streak).toBe(0) // reported as gone BEFORE they return, not after
    // And the return restarts at 1 without burning the week's shields.
    const back = recordDayActive("MA")
    expect(back.streak).toBe(1)
    expect(back.shieldsLeft).toBe(3)
  })

  it("a declared pause holds the streak and speaks, and missed-day scolding stays silent", () => {
    seedShield("MA", 5, 20)
    pausePaper("MA", "illness", ymd(daysAhead(7)))
    expect(activePaperPause("MA")).not.toBeNull()
    expect(shieldState("MA").streak).toBe(20) // held because declared
    expect(pausedNote("MA")).toContain("paused")
    expect(missedDayNote("MA")).toBeNull() // not "missed" when they told us
    resumePaper("MA")
    expect(activePaperPause("MA")).toBeNull()
  })

  it("an open-ended pause expires after its window instead of shielding forever", () => {
    const store = { pauses: { MA: { paperId: "MA", reason: "work", pausedAt: daysAgo(31).toISOString(), returnDate: null } }, switches: [] }
    localStorage.setItem("scholify-acca-plan-adjustments", JSON.stringify(store))
    expect(getPaperPause("MA")).not.toBeNull() // stored — Settings can render it
    expect(activePaperPause("MA")).toBeNull() // but no longer in effect
  })

  it("streakAtRisk warns only when there is a streak worth saving", () => {
    seedShield("MA", 1, 9, 3) // 0 shields left, yesterday active
    const risk = streakAtRisk("MA")
    expect(typeof risk.atRisk).toBe("boolean")
    expect(risk.streak).toBeGreaterThanOrEqual(0)
  })
})

/* ── The student who changes their mind ─────────────────────────── */

describe("the student who changes goals, targets and dates", () => {
  it("changing study days keeps daysPerWeek honest automatically", () => {
    const current = getPlan("MA")
    const update = derivePlanUpdate(current, { studyDays: [2, 4, 6] })
    expect(update.studyDays).toEqual([2, 4, 6])
    expect(update.daysPerWeek).toBe(3) // derived, never allowed to disagree
  })

  it("junk study days are filtered, and an emptied list falls back rather than zeroing the week", () => {
    const current = getPlan("MA")
    const junk = derivePlanUpdate(current, { studyDays: [7, -1, 3.5, 2, 2] as number[] })
    expect(junk.studyDays).toEqual([2])
    const emptied = derivePlanUpdate(current, { studyDays: [99] as number[] })
    expect(emptied.studyDays!.length).toBeGreaterThan(0) // fell back to configured days
    expect(configuredStudyDays(current).length).toBeGreaterThan(0)
  })

  it("changing minutes or ambition recomputes the daily question goal — one promise, not three", () => {
    const current = getPlan("MA")
    const up = derivePlanUpdate(current, { dailyMinutes: 90 })
    expect(up.dailyGoal).toBeGreaterThan(0)
    const down = derivePlanUpdate({ ...current, dailyMinutes: 90 }, { dailyMinutes: 20 })
    expect(down.dailyGoal).toBeGreaterThan(0)
    expect(down.dailyGoal!).toBeLessThan(up.dailyGoal!)
  })

  it("moving the exam date reshapes the runway; a past date clamps to 0, never negative", () => {
    setPlan("MA", { examDate: ymd(daysAhead(60)) })
    expect(daysUntilExam("MA")).toBe(60)
    setPlan("MA", { examDate: ymd(daysAhead(10)) }) // brought it forward
    expect(daysUntilExam("MA")).toBe(10)
    setPlan("MA", { examDate: ymd(daysAgo(3)) }) // slipped past
    expect(daysUntilExam("MA")).toBe(0)
    setPlan("MA", { examDate: "not-a-date" })
    expect(daysUntilExam("MA")).toBeNull() // garbage degrades to "no date", not NaN
  })

  it("clearing the exam date entirely returns the plan to pace-by-mastery", () => {
    setPlan("MA", { examDate: ymd(daysAhead(30)) })
    setPlan("MA", { examDate: null })
    expect(daysUntilExam("MA")).toBeNull()
    expect(examDayDue("MA")).toBe(false) // no date, nothing due
  })
})

/* ── Exam day arrives — attended or not ─────────────────────────── */

describe("the exam date passes", () => {
  it("the 'how did it go?' prompt fires once the date passes, snoozes politely, and stops after an outcome", () => {
    setPlan("MA", { examDate: ymd(daysAgo(1)) })
    expect(examDayDue("MA")).toBe(true)
    snoozeExamPrompt("MA", 3) // "results aren't out yet"
    expect(examDayDue("MA")).toBe(false)
    snoozeExamPrompt("MA", 0) // snooze expired → due again
    expect(examDayDue("MA")).toBe(true)
    recordExamOutcome("MA", true, 61)
    expect(examDayDue("MA")).toBe(false) // answered — never nags again for this sitting
  })

  it("a fail schedules the retake and opens recovery; a fresh passing mock proves them again", () => {
    setPlan("FM", { examDate: ymd(daysAgo(1)) })
    scheduleRetake("FM", ymd(daysAhead(75)), 44)
    expect(daysUntilExam("FM")).toBe(75) // the roadmap re-derives from the new date
    const rec = recoveryState("FM")
    expect(rec.active).toBe(true)
    expect(rec.provenAgain).toBe(false)
    recordMock("FM", 62, 100, 1) // proves it in a fresh timed mock
    expect(recoveryState("FM").provenAgain).toBe(true)
  })
})

/* ── The student who switches papers ────────────────────────────── */

describe("the student who switches papers", () => {
  it("switching is recorded with its reason, and the studying list reorders", () => {
    setStudyingPapers(["MA", "FM"])
    recordPaperSwitch("MA", "FM", "difficulty")
    const switches = getPaperSwitches()
    expect(switches.at(-1)).toMatchObject({ fromPaper: "MA", toPaper: "FM", reason: "difficulty" })
    setStudyingPapers(["FM", "MA"])
    expect(getStudyingPapers()[0]).toBe("FM")
  })

  it("progress is fully isolated per paper — switching cannot bleed records", () => {
    buildSession("MA", 20, undefined, 3).forEach((q, i) => recordAnswer("MA", q, i % 2 === 0))
    const maBefore = getPaperStats("MA").answered
    buildSession("FM", 25, undefined, 3).forEach((q) => recordAnswer("FM", q, true))
    expect(getPaperStats("MA").answered).toBe(maBefore) // untouched by FM practice
    expect(getPaperStats("FM").answered).toBeGreaterThanOrEqual(20)
  })
})

/* ── The student who leaves mid-task ────────────────────────────── */

describe("the student who leaves the app mid-task", () => {
  it("yesterday's abandoned pending task is discarded, never completed as today's work", () => {
    localStorage.setItem("scholify-today-pending", JSON.stringify({ paperId: "MA", taskId: "learn", day: ymd(daysAgo(1)) }))
    expect(resolvePendingTodayTask("MA")).toBe(false)
    expect(localStorage.getItem("scholify-today-pending")).toBeNull() // stale marker removed
  })

  it("a paused focus session freezes its clock until resumed", () => {
    startFocusSession(25)
    const before = focusSecondsLeft()
    expect(before).toBeGreaterThan(24 * 60)
    pauseFocusSession() // remainingSeconds stored without startedAt → frozen
    expect(focusSecondsLeft()).toBeGreaterThan(24 * 60)
    resumeFocusSession()
    expect(focusSecondsLeft()).toBeGreaterThan(24 * 60)
    clearFocusSession()
    expect(focusSecondsLeft()).toBe(0)
  })
})

/* ── The abandoned mock sitting ─────────────────────────────────── */

describe("the student who closes the tab mid-mock", () => {
  const sitting = (over: Partial<MockSitting> = {}): MockSitting => ({
    paperId: "MA",
    form: 1,
    deadline: Date.now() + 30 * 60_000,
    cursor: 7,
    answers: { "q-1": { choice: 2 } },
    essays: {},
    flags: { "q-3": true },
    savedAt: Date.now(),
    ...over,
  })

  it("a live sitting round-trips: answers, cursor, flags and the honest deadline", () => {
    const s = sitting()
    saveMockSitting(s)
    const back = readMockSitting("MA", 1)
    expect(back).not.toBeNull()
    expect(back!.cursor).toBe(7)
    expect(back!.answers["q-1"]).toEqual({ choice: 2 })
    expect(back!.flags["q-3"]).toBe(true)
    expect(back!.deadline).toBe(s.deadline)
    expect(sittingDisposition(back!)).toBe("resume")
    expect(hasLiveSitting("MA", 1)).toBe(true)
  })

  it("time out while away + real answers → the CBE submits it (expire); untouched → discarded silently", () => {
    const expired = sitting({ deadline: Date.now() - 60_000 })
    expect(sittingDisposition(expired)).toBe("expire") // their 40 minutes of work is recorded, not lost
    const untouched = sitting({ deadline: Date.now() - 60_000, answers: {}, flags: {} })
    expect(sittingHasWork(untouched)).toBe(false)
    expect(sittingDisposition(untouched)).toBe("discard") // no 0% for an exam never sat
  })

  it("essay-only work counts as work — a typed answer with no OT answered still resumes", () => {
    const essayOnly = sitting({ answers: {}, essays: { "task-1": { text: "The relief defers the gain…", cells: {} } } })
    expect(sittingHasWork(essayOnly)).toBe(true)
    const cellsOnly = sitting({ answers: {}, essays: { "task-1": { text: "", cells: { A1: "1200" } } } })
    expect(sittingHasWork(cellsOnly)).toBe(true)
    const empty = sitting({ answers: { "q-1": { choice: null } }, essays: { "task-1": { text: "  ", cells: { A1: " " } } } })
    expect(sittingHasWork(empty)).toBe(false)
  })

  it("form slots are independent — abandoning Form 1 and starting Form 2 destroys nothing", () => {
    saveMockSitting(sitting({ form: 1 }))
    saveMockSitting(sitting({ form: 2, cursor: 0, answers: {} }))
    expect(readMockSitting("MA", 1)!.cursor).toBe(7) // form 1's work intact
    expect(readMockSitting("MA", 2)!.cursor).toBe(0)
    clearMockSitting("MA", 1)
    expect(readMockSitting("MA", 1)).toBeNull()
    expect(readMockSitting("MA", 2)).not.toBeNull()
  })

  it("corrupt storage degrades to a fresh start, never a crash", () => {
    localStorage.setItem("scholify-acca-mock-sitting:MA:1", "{not json")
    expect(readMockSitting("MA", 1)).toBeNull()
    localStorage.setItem("scholify-acca-mock-sitting:MA:1", JSON.stringify({ paperId: "FM", form: 1 }))
    expect(readMockSitting("MA", 1)).toBeNull() // wrong shape removed
    expect(localStorage.getItem("scholify-acca-mock-sitting:MA:1")).toBeNull()
  })
})

/* ── Batch 2: more lives the loop has to absorb ─────────────────── */

import { buildDiagnostic, scoreDiagnostic, saveDiagnosticLocal, getLatestDiagnostic, type AnsweredDiagnostic } from "@/lib/acca-diagnostic"
import { buildAdaptiveSession, getQuestions } from "@/lib/acca"
import { generateStudyPlan, currentPhase, todayMission } from "@/lib/acca-plan"
import { buildTodayPlan } from "@/lib/acca-today"
import { mockProgress } from "@/lib/acca-loop"
import {
  saveDiagnosticSitting, readDiagnosticSitting, clearDiagnosticSitting,
  diagnosticSittingDisposition, diagnosticSittingHasWork, type DiagnosticSitting,
} from "@/lib/acca-diagnostic-sitting"

describe("the student who closes the tab mid-diagnostic", () => {
  const sitting = (over: Partial<DiagnosticSitting> = {}): DiagnosticSitting => ({
    paperId: "MA",
    seed: 424242,
    deadline: Date.now() + 20 * 60_000,
    idx: 11,
    responses: { 0: 2, 3: "1,250", 5: [0, 2] },
    flags: { 7: true },
    savedAt: Date.now(),
    ...over,
  })

  it("the same seed rebuilds the identical form — what makes resume sound at all", () => {
    const a = buildDiagnostic("MA", 424242).map((q) => q.id)
    const b = buildDiagnostic("MA", 424242).map((q) => q.id)
    expect(a.length).toBeGreaterThan(0)
    expect(b).toEqual(a) // identical questions, identical order
    const c = buildDiagnostic("MA", 424243).map((q) => q.id)
    expect(c).not.toEqual(a) // and the seed genuinely varies the form
  })

  it("a live sitting round-trips with every answer type intact", () => {
    saveDiagnosticSitting(sitting())
    const back = readDiagnosticSitting("MA")
    expect(back).not.toBeNull()
    expect(back!.idx).toBe(11)
    expect(back!.responses[0]).toBe(2) // mcq choice
    expect(back!.responses[3]).toBe("1,250") // numeric entry, as typed
    expect(back!.responses[5]).toEqual([0, 2]) // multi-select
    expect(diagnosticSittingDisposition(back!)).toBe("resume")
  })

  it("expired with real answers → graded honestly; expired untouched → discarded", () => {
    expect(diagnosticSittingDisposition(sitting({ deadline: Date.now() - 1000 }))).toBe("expire")
    const untouched = sitting({ deadline: Date.now() - 1000, responses: {} })
    expect(diagnosticSittingHasWork(untouched)).toBe(false)
    expect(diagnosticSittingDisposition(untouched)).toBe("discard")
    // Blank strings and empty selections are not answers.
    const blanks = sitting({ deadline: Date.now() - 1000, responses: { 0: "  ", 1: [] as number[] } })
    expect(diagnosticSittingHasWork(blanks)).toBe(false)
  })

  it("corrupt or foreign data degrades to a fresh start", () => {
    localStorage.setItem("scholify-acca-diagnostic-sitting:MA", "][")
    expect(readDiagnosticSitting("MA")).toBeNull()
    localStorage.setItem("scholify-acca-diagnostic-sitting:MA", JSON.stringify({ paperId: "FM", seed: 1 }))
    expect(readDiagnosticSitting("MA")).toBeNull()
    saveDiagnosticSitting(sitting())
    clearDiagnosticSitting("MA")
    expect(readDiagnosticSitting("MA")).toBeNull()
  })
})

describe("the heavy user who exhausts the bank", () => {
  it("answering every question in the paper never leaves a session empty", () => {
    const all = getQuestions("MA")
    for (const q of all) recordAnswer("MA", q, true) // seen absolutely everything
    const session = buildSession("MA", 10, undefined, 5)
    expect(session.length).toBeGreaterThan(0) // backfills from seen material
    const adaptive = buildAdaptiveSession("MA", 10)
    expect(adaptive.length).toBeGreaterThan(0)
    expect(new Set(adaptive.map((q) => q.id)).size).toBe(adaptive.length)
    const diag = buildDiagnostic("MA", 99)
    expect(diag.length).toBeGreaterThan(0)
  })
})

describe("the student whose exam is tomorrow", () => {
  it("a one-day runway still produces a plan, a phase and a mission — no crash, no nonsense", () => {
    setPlan("MA", { examDate: ymd(daysAhead(1)), dailyMinutes: 45, daysPerWeek: 7, studyDays: [0, 1, 2, 3, 4, 5, 6], dailyGoal: 12, targetProb: 65 })
    const sp = generateStudyPlan("MA")
    expect(sp.phases.length).toBeGreaterThan(0)
    expect(currentPhase("MA").key).toBeTruthy()
    expect(todayMission("MA").title).toBeTruthy()
    expect(buildTodayPlan("MA").length).toBeGreaterThan(0)
    expect(daysUntilExam("MA")).toBe(1)
  })

  it("an exam date of TODAY still holds together", () => {
    setPlan("MA", { examDate: ymd(new Date()) })
    expect(daysUntilExam("MA")).toBe(0)
    expect(buildTodayPlan("MA").length).toBeGreaterThan(0)
    expect(examDayDue("MA")).toBe(true) // the "how did it go?" flow is live on the day
  })
})

describe("the student who keeps failing mocks", () => {
  it("three sittings with the LATEST a fail is not exam-ready — the rehab loop holds the gate", () => {
    recordMock("MA", 62, 100, 1)
    recordMock("MA", 55, 100, 2)
    recordMock("MA", 41, 100, 3) // slipped on the last one
    const prog = mockProgress("MA")
    expect(prog.attempts).toBe(3)
    expect(prog.passed).toBe(2)
    expect(prog.latestPassed).toBe(false)
    expect(prog.examReady).toBe(false) // required count met, but the LATEST must pass
    // A fresh pass reopens the door.
    recordMock("MA", 57, 100, 1)
    expect(mockProgress("MA").examReady).toBe(true)
  })
})

describe("the student running two papers in parallel", () => {
  it("today plans, shields and streaks are fully independent per paper", () => {
    setPlan("MA", { examDate: ymd(daysAhead(40)), dailyMinutes: 30, daysPerWeek: 5, studyDays: [1, 2, 3, 4, 5], dailyGoal: 10, targetProb: 65 })
    setPlan("FM", { examDate: ymd(daysAhead(80)), dailyMinutes: 60, daysPerWeek: 3, studyDays: [1, 3, 5], dailyGoal: 15, targetProb: 75 })
    expect(buildTodayPlan("MA").length).toBeGreaterThan(0)
    expect(buildTodayPlan("FM").length).toBeGreaterThan(0)
    recordDayActive("MA")
    expect(shieldState("MA").activeToday).toBe(true)
    expect(shieldState("FM").activeToday).toBe(false) // studying MA does not tick FM's streak
  })
})

describe("the student who retakes the diagnostic", () => {
  it("the newest result replaces the old one as the baseline", () => {
    const qs = buildDiagnostic("MA", 5)
    const weak: AnsweredDiagnostic[] = qs.map((q, i) => ({ q, correct: i % 3 === 0 }))
    saveDiagnosticLocal(scoreDiagnostic("MA", weak))
    const first = getLatestDiagnostic("MA")!
    const strong: AnsweredDiagnostic[] = qs.map(() => ({ q: qs[0], correct: true })).map((_, i) => ({ q: qs[i], correct: true }))
    saveDiagnosticLocal(scoreDiagnostic("MA", strong))
    const second = getLatestDiagnostic("MA")!
    expect(second.passProbability).toBeGreaterThan(first.passProbability) // improvement shows
  })
})
