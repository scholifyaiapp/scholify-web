import { it, beforeEach, expect } from "vitest"
import { composeToday, dayProgress } from "@/lib/acca-today-composer"
import { setPlan, getPlan, daysUntilExam, currentPhase } from "@/lib/acca-plan"
import { getPaperStats } from "@/lib/acca"
import { shieldState } from "@/lib/acca-schedule"
import { passProbability } from "@/lib/acca-loop"
import { projectReadiness, projectTopicPlan } from "@/lib/acca-topic-plan"
import { flashcardStats } from "@/lib/acca-flashcards"
import { strengthSplit } from "@/lib/acca-strengths"
import { streakProgress } from "@/lib/acca-streak"

beforeEach(() => window.localStorage.clear())

const PAPERS = ["BT", "MA", "FA", "LW", "PM", "TX", "FR", "AA", "FM", "SBL", "SBR", "AFM", "APM", "AAA", "ATX"]

it("AUDIT: a brand-new learner does not crash any engine entry point", () => {
  const problems: string[] = []
  for (const p of PAPERS) {
    for (const [name, fn] of Object.entries({
      composeToday: () => composeToday(p, true),
      getPaperStats: () => getPaperStats(p),
      shieldState: () => shieldState(p),
      passProbability: () => passProbability(p),
      projectReadiness: () => projectReadiness(p),
      projectTopicPlan: () => projectTopicPlan(p, 14),
      flashcardStats: () => flashcardStats(p),
      daysUntilExam: () => daysUntilExam(p),
      currentPhase: () => currentPhase(p),
      getPlan: () => getPlan(p),
    })) {
      try { fn() } catch (e) { problems.push(`${p}/${name}: ${(e as Error).message}`) }
    }
  }
  if (problems.length) console.log("CRASHES:\n" + problems.join("\n"))
  expect(problems).toEqual([])
})

it("AUDIT: no NaN or negative leaks into anything a learner reads", () => {
  const bad: string[] = []
  for (const p of PAPERS) {
    window.localStorage.clear()
    setPlan(p, { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const day = composeToday(p, true)
    const stats = getPaperStats(p)
    const prog = dayProgress(p, day, [])
    const checks: Record<string, number> = {
      totalMinutes: day.totalMinutes,
      budgetMinutes: day.budgetMinutes,
      readiness: stats.readiness,
      accuracy: stats.accuracy,
      coverage: stats.coverage,
      percent: prog.percent,
      streakFraction: streakProgress(shieldState(p).streak).fraction,
    }
    for (const [k, v] of Object.entries(checks)) {
      if (!Number.isFinite(v)) bad.push(`${p}.${k} = ${v}`)
      else if (v < 0) bad.push(`${p}.${k} negative = ${v}`)
    }
    if (prog.percent > 100) bad.push(`${p}.percent > 100 = ${prog.percent}`)
    if (stats.readiness > 100) bad.push(`${p}.readiness > 100 = ${stats.readiness}`)
    if (day.blocks.some((b) => !Number.isFinite(b.minutes) || b.minutes < 0)) bad.push(`${p} block minutes bad`)
    if (strengthSplit(stats.areas).best !== null) bad.push(`${p} claims a best section with zero answers`)
  }
  if (bad.length) console.log("BAD VALUES:\n" + bad.join("\n"))
  expect(bad).toEqual([])
})

it("AUDIT: every paper composes a day whose every step has real content", () => {
  /*
   * A paper whose bank or deck failed to register composes a day of empty
   * steps. With the sequence now enforced that is not a cosmetic problem: an
   * empty step cannot be completed, so the learner is stuck behind it with
   * nothing on screen explaining why.
   *
   * The article is not required — it is supplementary and is deliberately
   * dropped on a tight budget (see acca-today-composer).
   */
  const thin: string[] = []
  for (const p of PAPERS) {
    window.localStorage.clear()
    setPlan(p, { dailyMinutes: 60, daysPerWeek: 6, targetProb: 75 })
    const d = composeToday(p, true)
    const missing: string[] = []
    if (!d.chapter) missing.push("chapter")
    if (d.quiz.length === 0) missing.push("quiz")
    if (d.practice.length === 0) missing.push("practice")
    if (d.cards.length === 0) missing.push("cards")
    if (missing.length) thin.push(`${p}: no ${missing.join(", ")}`)
  }
  expect(thin).toEqual([])
})
