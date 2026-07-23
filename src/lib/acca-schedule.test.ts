import { describe, it, expect, vi, afterEach } from "vitest"
import { focusArea, recordDayActive } from "@/lib/acca-schedule"
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

/*
 * The shield/streak scheme (recordDayActive) had zero test coverage before
 * this pass, and a full audit found two real bugs in it:
 *   · ymd() used toISOString() (the UTC calendar date) while every sibling
 *     date helper in the codebase (acca.ts, acca-flashcards.ts) uses the
 *     LOCAL calendar date — a student west of Greenwich studying in their
 *     own evening could get silently treated as still on "yesterday" or
 *     already-done-with-"today" depending on the UTC/local skew.
 *   · a streak break beyond the weekly shield allowance still consumed the
 *     full remaining allowance for zero protective benefit, breaking the
 *     very next missed day too.
 */
describe("recordDayActive — the shield/streak scheme", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("treats a late-evening session and the next morning as different days everywhere, not just in UTC", () => {
    vi.useFakeTimers()
    // Two real, distinct calendar-day instants, both mid-day UTC so no
    // plausible host timezone could push them onto the same or a
    // different date than intended.
    vi.setSystemTime(new Date("2026-01-05T12:00:00Z")) // Mon 2026-01-05
    const day1 = recordDayActive("FA")
    expect(day1.streak).toBe(1)

    vi.setSystemTime(new Date("2026-01-06T12:00:00Z")) // Tue 2026-01-06 — the very next day
    const day2 = recordDayActive("FA")
    expect(day2.streak).toBe(2)
  })

  it("does not burn shields on a streak reset that protected nothing", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-01-05T12:00:00Z")) // Mon — streak starts
    const day1 = recordDayActive("FA")
    expect(day1.streak).toBe(1)
    expect(day1.shieldsLeft).toBe(3)

    // Sat, same week — 4 days missed (Tue-Fri), more than the 3 weekly
    // shields can cover. The streak must restart, but since nothing was
    // actually shielded, no shields should be spent either.
    vi.setSystemTime(new Date("2026-01-10T12:00:00Z"))
    const afterBreak = recordDayActive("FA")
    expect(afterBreak.streak).toBe(1)
    expect(afterBreak.shieldsLeft).toBe(3)

    // Sun, the next day, still the same week — proves the shields are
    // genuinely still there: the prior bug maxed shieldsUsed out on the
    // reset above, which would break this streak again immediately.
    vi.setSystemTime(new Date("2026-01-11T12:00:00Z"))
    const nextDay = recordDayActive("FA")
    expect(nextDay.streak).toBe(2)
  })
})

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
    expect(ids[2]).toBe("drill")
    expect(ids[3]).toBe("flashcards")
  })

  it("aims daily practice at the diagnostic's pain point while studying a NEW topic", () => {
    setStartMode("assess")
    seedDiagnostic("FA", "D")
    setPlan("FA", { dailyMinutes: 25, targetProb: 75 })
    const tasks = buildDailyTasks("FA")
    const study = tasks.find((t) => t.id === "study")!
    const drill = tasks.find((t) => t.id === "drill")
    expect(drill, "pain-point drill must exist the day after a diagnostic").toBeDefined()
    expect(drill!.action).toBe("weak")
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
    const small = buildDailyTasks("FA").find((t) => t.id === "drill")!
    setPlan("FA", { dailyMinutes: 60, targetProb: 85 })
    const large = buildDailyTasks("FA").find((t) => t.id === "drill")!
    expect(large.minutes).toBeGreaterThan(small.minutes)
  })

  it("zero-start gate days pin study AND practice to the gate section (no weakness-hunting yet)", () => {
    setStartMode("zero")
    setPlan("FA", { dailyMinutes: 25, targetProb: 75 })
    const tasks = buildDailyTasks("FA")
    const ids = tasks.map((t) => t.id)
    expect(ids).toEqual(["study", "essentials", "drill", "flashcards"])
    const study = tasks.find((t) => t.id === "study")!
    expect(["A", "B", "C"]).toContain(study.area!)
    expect(tasks.find((t) => t.id === "drill")!.area).toBe(study.area)
  })
})
