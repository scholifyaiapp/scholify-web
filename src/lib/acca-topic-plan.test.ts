import { describe, it, expect, beforeEach } from "vitest"
import {
  chapterHardness,
  chapterMinutes,
  markChapterRead,
  isChapterRead,
  chapterCoverage,
  nextChapter,
  recommendExamDate,
  projectTopicPlan,
  projectReadiness,
  paperWorkHours,
  recordChapterPace,
  readingPace,
} from "@/lib/acca-topic-plan"
import { chaptersForPaper, chapterKey } from "@/lib/acca-study-content"
import { setPlan } from "@/lib/acca-plan"

/*
 * The TOPIC PLAN — the engine that turned an area-shaped plan into a chapter-shaped
 * one.
 *
 * Why these are the tests that matter: before this module, "today's study" named a
 * SYLLABUS AREA. BT area A is nine chapters and about three hours of reading, so the
 * task could not be finished, could not be ticked honestly, and repeated verbatim the
 * next day — the single most-reported complaint about the daily plan. Everything below
 * guards the properties that fix it: a chapter is a session, it advances when read, and
 * the exam date is arithmetic on real content rather than a guess.
 */

beforeEach(() => {
  window.localStorage.clear()
})

describe("chapterHardness — measured from the chapter, not asserted", () => {
  it("bands every authored BT chapter and never leaves the multiplier range", () => {
    const chapters = chaptersForPaper("BT")
    expect(chapters.length).toBeGreaterThan(3)
    for (const c of chapters) {
      const h = chapterHardness(c)
      expect([1, 2, 3]).toContain(h.level)
      expect(h.score).toBeGreaterThanOrEqual(0)
      expect(h.score).toBeLessThanOrEqual(1)
      // The multiplier ADJUSTS an already-realistic authored time; it must never
      // become the estimate itself, or a "Tough" chapter doubles out of nowhere.
      expect(h.factor).toBeGreaterThanOrEqual(0.9)
      expect(h.factor).toBeLessThanOrEqual(1.35)
      expect(h.why.length).toBeGreaterThan(10)
    }
  })

  it("rates a computation-heavy chapter harder than a narrative one of the same length", () => {
    const base = chaptersForPaper("BT")[0]
    const block = { kind: "text" as const, md: "x" }
    const formula = { kind: "formula" as const, name: "n", expr: "a = b" }
    const narrative = { ...base, sections: [{ id: "s", heading: "h", blocks: Array.from({ length: 10 }, () => block) }] }
    const computational = { ...base, sections: [{ id: "s", heading: "h", blocks: Array.from({ length: 10 }, () => formula) }] }
    expect(chapterHardness(computational).score).toBeGreaterThan(chapterHardness(narrative).score)
  })
})

describe("chapterMinutes — the number the learner is promised", () => {
  it("stays a believable session length for every authored chapter", () => {
    for (const c of chaptersForPaper("BT")) {
      const m = chapterMinutes("BT", c)
      expect(m).toBeGreaterThanOrEqual(4)
      // A single sitting. Anything past ~45 min is a chapter that should have
      // been split, and the plan would be promising something nobody finishes.
      expect(m).toBeLessThanOrEqual(60)
    }
  })

  it("follows the learner's measured reading pace once it has evidence", () => {
    const chapter = chaptersForPaper("BT")[0]
    const before = chapterMinutes("BT", chapter)
    // Three chapters read at double the authored time.
    for (let i = 0; i < 3; i++) recordChapterPace("BT", 10, 20)
    expect(readingPace("BT")).toBeGreaterThan(1.4)
    expect(chapterMinutes("BT", chapter)).toBeGreaterThan(before)
  })

  it("ignores a single interrupted read rather than rewriting every estimate", () => {
    // One sample is not a pace, and a read left open in a tab overnight is the
    // most common "sample" of all.
    recordChapterPace("BT", 10, 600)
    expect(readingPace("BT")).toBe(1)
  })

  it("caps a wildly long read so it cannot distort the average", () => {
    for (let i = 0; i < 3; i++) recordChapterPace("BT", 10, 10_000)
    // Capped at 3× authored, and the pace multiplier is itself clamped.
    expect(readingPace("BT")).toBeLessThanOrEqual(1.6)
  })
})

describe("nextChapter — the plan has to advance", () => {
  it("starts at the paper's first chapter for a learner with no history", () => {
    const first = nextChapter("BT")
    expect(first).toBeTruthy()
    const ordered = [...chaptersForPaper("BT")].sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
    expect(chapterKey(first!)).toBe(chapterKey(ordered[0]))
  })

  it("moves on once a chapter is marked read — the repeat bug, guarded", () => {
    const first = nextChapter("BT")!
    markChapterRead("BT", chapterKey(first))
    const second = nextChapter("BT")
    expect(second).toBeTruthy()
    expect(chapterKey(second!)).not.toBe(chapterKey(first))
  })

  it("returns null once the whole paper is read, so callers can offer revision", () => {
    for (const c of chaptersForPaper("BT")) markChapterRead("BT", chapterKey(c))
    expect(nextChapter("BT")).toBeNull()
  })

  it("honours an exclusion list, so a long day can study a second topic", () => {
    const first = nextChapter("BT")!
    const second = nextChapter("BT", [chapterKey(first)])
    expect(chapterKey(second!)).not.toBe(chapterKey(first))
  })
})

describe("chapterCoverage", () => {
  it("counts read chapters and the hardness-adjusted reading still ahead", () => {
    const all = chaptersForPaper("BT")
    const before = chapterCoverage("BT")
    expect(before.read).toBe(0)
    expect(before.total).toBe(all.length)
    expect(before.minutesLeft).toBeGreaterThan(0)

    markChapterRead("BT", chapterKey(all[0]))
    const after = chapterCoverage("BT")
    expect(after.read).toBe(1)
    expect(after.minutesLeft).toBeLessThan(before.minutesLeft)
    expect(after.percent).toBe(Math.round((1 / all.length) * 100))
  })

  it("is idempotent — marking the same chapter twice does not double-count", () => {
    const key = chapterKey(chaptersForPaper("BT")[0])
    markChapterRead("BT", key)
    markChapterRead("BT", key)
    expect(chapterCoverage("BT").read).toBe(1)
    expect(isChapterRead("BT", key)).toBe(true)
  })
})

describe("recommendExamDate — the field is no longer blank", () => {
  it("gives an on-demand paper an exact bookable weekday", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const rec = recommendExamDate("BT")
    expect(rec).toBeTruthy()
    expect(rec!.kind).toBe("on-demand")
    expect(rec!.dateISO).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    // BT is sat on demand at a centre, so never a weekend.
    const dow = new Date(`${rec!.dateISO}T00:00:00`).getDay()
    expect(dow).not.toBe(0)
    expect(dow).not.toBe(6)
    expect(rec!.days).toBeGreaterThan(0)
    expect(rec!.totalHours).toBeGreaterThan(0)
    expect(rec!.rationale).toContain("on demand")
  })

  it("maps a session paper onto an actual ACCA sitting month", () => {
    setPlan("FR", { dailyMinutes: 60, daysPerWeek: 5, targetProb: 75 })
    const rec = recommendExamDate("FR")
    if (!rec) return // FR content not registered in this environment
    expect(rec.kind).toBe("session")
    const month = new Date(`${rec.dateISO}T00:00:00`).getMonth()
    expect([2, 5, 8, 11]).toContain(month)
    expect(rec.label).toMatch(/March|June|September|December/)
    // We must not pretend to know ACCA's exact day.
    expect(rec.rationale).toContain("exact day")
  })

  it("pushes the date out when the learner promises less time", () => {
    setPlan("BT", { dailyMinutes: 120, daysPerWeek: 7, targetProb: 65 })
    const fast = recommendExamDate("BT")!
    setPlan("BT", { dailyMinutes: 30, daysPerWeek: 3, targetProb: 65 })
    const slow = recommendExamDate("BT")!
    // The whole complaint about the old daily-time question was that it changed
    // nothing downstream. It has to move the date.
    expect(slow.days).toBeGreaterThan(fast.days)
  })

  it("asks for more time when the learner aims higher", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 65 })
    const modest = recommendExamDate("BT")!
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 85 })
    const ambitious = recommendExamDate("BT")!
    expect(ambitious.days).toBeGreaterThan(modest.days)
  })

  it("shrinks as the learner actually covers the paper", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const fresh = recommendExamDate("BT")!
    const chapters = chaptersForPaper("BT")
    for (const c of chapters.slice(0, Math.floor(chapters.length / 2))) markChapterRead("BT", chapterKey(c))
    const later = recommendExamDate("BT")!
    expect(later.chaptersLeft).toBeLessThan(fresh.chaptersLeft)
    expect(later.days).toBeLessThanOrEqual(fresh.days)
  })

  it("returns null for a paper with no content rather than inventing a date", () => {
    expect(recommendExamDate("NOT_A_PAPER")).toBeNull()
  })
})

describe("paperWorkHours — what onboarding quotes", () => {
  it("measures a plausible total from the paper's own chapters", () => {
    const hours = paperWorkHours("BT")
    expect(hours).toBeTruthy()
    // An Applied Knowledge paper is tens of hours, not hundreds or single digits.
    expect(hours!).toBeGreaterThan(20)
    expect(hours!).toBeLessThan(500)
  })

  it("returns null for an unknown paper so the caller keeps its fallback table", () => {
    expect(paperWorkHours("NOT_A_PAPER")).toBeNull()
  })
})

describe("projectTopicPlan — the operational week", () => {
  it("lays out real dates with the chapter and blocks for each study day", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75, examDate: null })
    const week = projectTopicPlan("BT", 7)
    expect(week.length).toBeGreaterThan(0)
    expect(week[0].isToday).toBe(true)
    for (const day of week) {
      expect(day.dateISO).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      if (day.isRest) {
        expect(day.blocks).toEqual([])
      } else {
        expect(day.blocks.length).toBeGreaterThan(0)
        expect(day.minutes).toBe(day.blocks.reduce((n, b) => n + b.minutes, 0))
      }
    }
  })

  it("gives a 5-day learner exactly two rest days a week", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 5, targetProb: 75 })
    const week = projectTopicPlan("BT", 7)
    expect(week).toHaveLength(7)
    expect(week.filter((d) => d.isRest)).toHaveLength(2)
  })

  it("never schedules the same chapter on two days", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 7, targetProb: 75 })
    const keys = projectTopicPlan("BT", 10).map((d) => d.chapter?.key).filter(Boolean)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it("keeps practice inside the 10–15 question band it promises", () => {
    setPlan("BT", { dailyMinutes: 240, daysPerWeek: 7, targetProb: 85 })
    const week = projectTopicPlan("BT", 5)
    for (const day of week.filter((d) => !d.isRest)) {
      const practice = day.blocks.find((b) => b.kind === "practice")
      if (!practice) continue
      const n = Number(practice.label.match(/^(\d+)/)?.[1])
      // A long day buys another BLOCK, never a 40-question grind.
      expect(n).toBeGreaterThanOrEqual(10)
      expect(n).toBeLessThanOrEqual(16)
    }
  })
})

describe("projectReadiness", () => {
  it("projects a bounded score and an honest verdict once a date exists", () => {
    setPlan("BT", { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75, examDate: null })
    const p = projectReadiness("BT")
    expect(p).toBeTruthy()
    expect(p!.projected).toBeGreaterThanOrEqual(0)
    expect(p!.projected).toBeLessThanOrEqual(96)
    expect(p!.target).toBe(75)
    expect(p!.verdict.length).toBeGreaterThan(20)
    // No practice yet → no quoted "now" figure. Quoting one would sit at the 50%
    // prior by construction and read as a measurement.
    expect(p!.now).toBeNull()
  })

  /*
   * Against a FIXED date, more protected time must project higher. The fixed date
   * is the whole point of the test: with no date, `days` comes from the
   * recommendation, which itself stretches to accommodate a slower pace — so both
   * learners get the same capacity by construction and the same projection, which
   * is correct behaviour rather than a bug. The interesting question is always
   * "against the sitting I have booked".
   */
  it("projects higher for a learner who protects more time before a fixed date", () => {
    const exam = new Date()
    exam.setDate(exam.getDate() + 90)
    const examDate = `${exam.getFullYear()}-${`${exam.getMonth() + 1}`.padStart(2, "0")}-${`${exam.getDate()}`.padStart(2, "0")}`

    setPlan("BT", { dailyMinutes: 20, daysPerWeek: 2, targetProb: 75, examDate })
    const thin = projectReadiness("BT")!
    setPlan("BT", { dailyMinutes: 150, daysPerWeek: 7, targetProb: 75, examDate })
    const thick = projectReadiness("BT")!
    expect(thick.projected).toBeGreaterThan(thin.projected)
  })

  it("says so when a booked sitting is out of reach at the current pace", () => {
    const exam = new Date()
    exam.setDate(exam.getDate() + 14)
    const examDate = `${exam.getFullYear()}-${`${exam.getMonth() + 1}`.padStart(2, "0")}-${`${exam.getDate()}`.padStart(2, "0")}`
    setPlan("BT", { dailyMinutes: 20, daysPerWeek: 2, targetProb: 85, examDate })
    const p = projectReadiness("BT")!
    // Two weeks at 40 min a week cannot cover a whole paper, and pretending
    // otherwise is the one thing a readiness projection must never do.
    expect(p.onTrack).toBe(false)
    expect(p.projected).toBeLessThan(85)
  })

  it("quantifies the shortfall in minutes a day, not in adjectives", () => {
    setPlan("BT", { dailyMinutes: 15, daysPerWeek: 2, targetProb: 85, examDate: null })
    const p = projectReadiness("BT")!
    if (!p.onTrack) {
      expect(p.extraMinutesPerDay).toBeGreaterThanOrEqual(0)
      expect(p.verdict).toMatch(/\d/)
    }
  })
})
