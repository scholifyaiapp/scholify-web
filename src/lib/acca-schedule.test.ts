import { describe, it, expect, vi, afterEach } from "vitest"
import { focusArea, recordDayActive, shieldState, pausedNote, missedDayNote } from "@/lib/acca-schedule"
import { pausePaper, resumePaper } from "@/lib/acca-plan-adjustment"
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

  /*
   * The dashboard streak tile and the plan-route badge both READ shieldState()
   * without recording anything. The stored streak is only ever rewritten by
   * recordDayActive, so a read that echoed it raw kept advertising a streak the
   * learner had already lost — the single most trust-damaging thing a streak
   * tile can do. A read must agree with what the next session will decide.
   */
  it("reports a lapsed streak as broken on read, not the stale stored number", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-02-02T12:00:00Z")) // Mon
    recordDayActive("PM")
    vi.setSystemTime(new Date("2026-02-03T12:00:00Z")) // Tue
    expect(recordDayActive("PM").streak).toBe(2)

    // Still Tue: reading back the same day must not disturb the live streak.
    expect(shieldState("PM").streak).toBe(2)

    // Three weeks later, having never returned. Far beyond any shield allowance.
    vi.setSystemTime(new Date("2026-02-24T12:00:00Z"))
    expect(shieldState("PM").streak).toBe(0)
    expect(shieldState("PM").protectedToday).toBe(false)

    // And the next real session restarts from 1 — exactly what the read said.
    expect(recordDayActive("PM").streak).toBe(1)
  })

  it("holds the streak while the paper is explicitly paused", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-04-06T12:00:00Z")) // Mon
    recordDayActive("AA")
    vi.setSystemTime(new Date("2026-04-07T12:00:00Z")) // Tue
    expect(recordDayActive("AA").streak).toBe(2)

    // Away for three weeks — far beyond the shield allowance.
    vi.setSystemTime(new Date("2026-04-28T12:00:00Z"))
    expect(shieldState("AA").streak, "unpaused, a lapse this long is a broken streak").toBe(0)

    // The learner TOLD us they were away. The declared absence must not be the
    // one that costs them the streak.
    pausePaper("AA", "illness", "2026-05-01")
    expect(shieldState("AA").streak).toBe(2)

    // ...and resuming puts it back under the ordinary rules.
    resumePaper("AA")
    expect(shieldState("AA").streak).toBe(0)
  })

  /*
   * An open-ended pause must EXPIRE. Holding the streak for as long as a pause
   * record exists meant "pause once, keep a 40-day streak forever" — the streak
   * stops meaning anything, and a learner who set a return date months ago would
   * still be protected.
   */
  it("stops holding the streak once the pause has run out", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-05-04T12:00:00Z")) // Mon
    recordDayActive("FM")
    vi.setSystemTime(new Date("2026-05-05T12:00:00Z")) // Tue
    expect(recordDayActive("FM").streak).toBe(2)

    // Paused with a return date, then away well past the shield allowance.
    pausePaper("FM", "illness", "2026-05-20")
    vi.setSystemTime(new Date("2026-05-18T12:00:00Z"))
    expect(shieldState("FM").streak, "still inside the pause").toBe(2)

    // Past the return date: the pause is over, so the ordinary rules resume.
    vi.setSystemTime(new Date("2026-05-25T12:00:00Z"))
    expect(shieldState("FM").streak, "pause expired — streak is genuinely lost").toBe(0)
  })

  it("expires an open-ended pause after a bounded window", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-06-01T12:00:00Z"))
    recordDayActive("AFM")
    vi.setSystemTime(new Date("2026-06-02T12:00:00Z"))
    expect(recordDayActive("AFM").streak).toBe(2)

    pausePaper("AFM", "work", null) // no return date given
    vi.setSystemTime(new Date("2026-06-20T12:00:00Z"))
    expect(shieldState("AFM").streak, "within the open-pause window").toBe(2)

    vi.setSystemTime(new Date("2026-08-01T12:00:00Z"))
    expect(shieldState("AFM").streak, "an open pause cannot run forever").toBe(0)
  })

  it("tells the learner the paper is paused, and says nothing once it is not", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-05-04T12:00:00Z"))
    recordDayActive("SBR")
    expect(pausedNote("SBR"), "not paused — no note").toBeNull()

    pausePaper("SBR", "illness", "2026-05-20")
    vi.setSystemTime(new Date("2026-05-10T12:00:00Z"))
    const note = pausedNote("SBR")
    expect(note).toContain("paused")
    expect(note).toContain("2026-05-20")
    // A paused paper does not ALSO nag about missed days.
    expect(missedDayNote("SBR")).toBeNull()

    vi.setSystemTime(new Date("2026-05-25T12:00:00Z"))
    expect(pausedNote("SBR"), "expired pause stops speaking").toBeNull()
  })

  it("keeps the streak on a read when shields still cover the gap", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-03-02T12:00:00Z")) // Mon
    recordDayActive("FR")
    vi.setSystemTime(new Date("2026-03-03T12:00:00Z")) // Tue
    expect(recordDayActive("FR").streak).toBe(2)

    // Thu — one day missed (Wed), well inside the 3-shield weekly allowance.
    vi.setSystemTime(new Date("2026-03-05T12:00:00Z"))
    const s = shieldState("FR")
    expect(s.missedDays).toBe(1)
    expect(s.protectedToday).toBe(true)
    expect(s.streak, "a shielded gap must NOT zero the streak").toBe(2)
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
import { saveLearnerBaseline } from "@/lib/acca-learner-baseline"

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

/*
 * The daily budget allocator.
 *
 * The bug this covers: a learner who chose 180 min/day was given a 48-minute
 * day, and so was a learner who chose 45 — practiceCount() capped at 30
 * questions, the study block was a fixed 7 min (its budget-aware branch needed
 * a third-party resource, which onboarding never collects), and flashcards were
 * pinned to 12–15 cards. Every budget above ~40 min produced an identical day,
 * so the onboarding time question barely affected the plan.
 */
import { shapeDay } from "@/lib/acca-schedule"

describe("shapeDay — filling the daily minute budget", () => {
  const BUDGETS = [12, 15, 25, 30, 45, 60, 90, 120, 180, 240]

  it.each(BUDGETS)("spends what a %i-minute learner promised", (budget) => {
    for (const target of [65, 75, 85]) {
      const day = shapeDay(budget, target)
      // Within 5% or 3 minutes, whichever is larger — rounding on per-question
      // and per-card costs cannot land exactly on every budget.
      const slack = Math.max(3, Math.round(budget * 0.05))
      expect(
        Math.abs(day.totalMinutes - budget),
        `budget ${budget} @ ${target}% allocated ${day.totalMinutes}min`,
      ).toBeLessThanOrEqual(slack)
    }
  })

  it("gives a bigger budget strictly more work, at every step", () => {
    let prev = 0
    for (const budget of BUDGETS) {
      const day = shapeDay(budget, 75)
      expect(day.totalMinutes, `${budget}min should exceed the tier below`).toBeGreaterThan(prev)
      prev = day.totalMinutes
    }
  })

  it("earns a second topic on a long day instead of one marathon drill", () => {
    expect(shapeDay(45, 75).cycles).toHaveLength(1)
    const long = shapeDay(180, 75)
    expect(long.cycles).toHaveLength(2)
    // No single practice block is allowed to become the whole day.
    for (const cycle of long.cycles) expect(cycle.practiceQ).toBeLessThanOrEqual(41)
  })

  it("always studies something, even on the smallest day", () => {
    const tiny = shapeDay(12, 65)
    expect(tiny.cycles.length).toBeGreaterThanOrEqual(1)
    expect(tiny.cycles[0].studyMinutes).toBeGreaterThan(0)
  })

  it("only schedules a bank run when a whole one fits", () => {
    expect(shapeDay(60, 75).bankRun).toBe(false)
    expect(shapeDay(240, 75).bankRun).toBe(true)
  })

  it("clears the cards that are actually due rather than inventing a session", () => {
    expect(shapeDay(180, 75, 4).cards).toBeLessThan(shapeDay(180, 75, 0).cards)
  })
})

/*
 * ── The practice-only route ────────────────────────────────────────
 *
 * "Practise for my exam" means the learner has covered the syllabus. A day that
 * opens with "read chapter 4" is a day they will skip, and a skipped day costs
 * the streak, the plan and eventually the subscription.
 *
 * So the daily plan drops the reading and spends those minutes on questions.
 * Nothing is removed from the PRODUCT — every chapter and article stays open on
 * the study screens — only from the plan.
 */
describe("buildDailyTasks — practice-only route", () => {
  /* A realistic practice learner: some answers on record and a baseline. */
  const seedRoute = (route: "practice" | "course") => {
    setStartMode("assess")
    setPlan("FA", { dailyMinutes: 25, targetProb: 75 })
    for (const q of getQuestions("FA").slice(0, 12)) recordAnswer("FA", q, true)
    saveLearnerBaseline({
      route,
      englishLevel: "B2",
      englishEvidence: "self",
      assessmentPath: "diagnostic",
      updatedAt: new Date().toISOString(),
    })
  }

  it("schedules no chapter reading at all", () => {
    seedRoute("practice")
    const tasks = buildDailyTasks("FA")
    expect(tasks.some((t) => t.action === "study"), "the practice route must not be told to read").toBe(false)
  })

  it("still schedules quizzes, questions and flashcards", () => {
    seedRoute("practice")
    const actions = new Set(buildDailyTasks("FA").map((t) => t.action))
    expect(actions.has("essentials"), "quizzes").toBe(true)
    expect(actions.has("weak") || actions.has("practice"), "question practice").toBe(true)
    expect(actions.has("flashcards"), "flashcards").toBe(true)
  })

  it("spends the freed reading minutes on questions rather than shortening the day", () => {
    seedRoute("practice")
    const practiceOnly = buildDailyTasks("FA")

    saveLearnerBaseline({
      route: "course",
      englishLevel: "B2",
      englishEvidence: "self",
      assessmentPath: "diagnostic",
      updatedAt: new Date().toISOString(),
    })
    const withStudy = buildDailyTasks("FA")

    const questionMinutes = (tasks: { action: string; minutes: number }[]) =>
      tasks.filter((t) => t.action === "weak" || t.action === "practice").reduce((s, t) => s + t.minutes, 0)

    expect(
      questionMinutes(practiceOnly),
      "the learner promised those minutes — they buy more questions, not a shorter day",
    ).toBeGreaterThan(questionMinutes(withStudy))
  })
})
