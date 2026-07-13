/*
 * Scholify — the distributed study schedule (the "GPS route" of the loop).
 *
 * Two entry personas set at onboarding (acca-profile StartMode):
 *   • "zero"   — brand new to the paper. Learn FIRST. The diagnostic stays
 *                locked until the learner has studied + practised + revised the
 *                first three syllabus sections (A·B·C). Only then does a pass
 *                probability mean anything, so only then do we ask for it.
 *   • "assess" — a returner (failed a sitting, or studied elsewhere). The
 *                diagnostic — or an uploaded mock result — is the honest start.
 *
 * From the target date, the target %, and the daily time budget this module
 * distributes the whole syllabus into concrete daily tasks (study / practice /
 * flashcards / bank runs / mocks) all the way to exam day.
 *
 * Shield scheme: today's plan is always recomputed from what REMAINS over the
 * days that REMAIN, so a missed day (sick, busy, life) simply spreads over what
 * is left — never a wall of overdue work, never a guilt prompt, never a
 * "what's wrong?" interrogation. A weekly allowance of shields keeps the streak
 * intact across missed days. Everything here is deterministic and offline.
 */

import { getPaper, getPaperStats } from "@/lib/acca"
import { getPlan, daysUntilExam, currentPhase, type MethodPhaseKey } from "@/lib/acca-plan"
import { getTopicResult } from "@/lib/acca-topics"
import { flashcardStats, areaReviewed } from "@/lib/acca-flashcards"
import { getStartMode } from "@/lib/acca-profile"
import { getLatestDiagnostic } from "@/lib/acca-diagnostic"

/* ── Task vocabulary ──────────────────────────────────────────── */

export type SchedAction = "study" | "practice" | "weak" | "flashcards" | "bank" | "mock" | "diagnostic"

export interface SchedTask {
  id: string
  icon: string
  title: string
  detail: string
  action: SchedAction
  /** Rough minutes this task costs — used to fill the daily budget. */
  minutes: number
  /** Syllabus area the task targets, when relevant. */
  area?: string
}

/** Minutes-per-unit model — the single source for "~N min" sizing. */
const COST = { study: 7, perQ: 1.1, perCard: 0.6, bank: 40, mock: 45, diagnostic: 15 }

/* ── The A·B·C diagnostic gate (brand-new learners) ───────────── */

/** Sections a zero-start learner must cover before the diagnostic unlocks. */
const GATE_SECTION_COUNT = 3
const GATE_PRACTICE_MIN = 6

export interface SectionGate {
  area: string
  label: string
  studied: boolean
  practised: boolean
  revised: boolean
  done: boolean
}

/** Per-section readiness for the deferred diagnostic (first three areas). */
export function diagnosticGate(paperId: string): {
  sections: SectionGate[]
  done: number
  total: number
  unlocked: boolean
} {
  const paper = getPaper(paperId)
  const stats = getPaperStats(paperId)
  const areas = (paper?.areas ?? []).slice(0, GATE_SECTION_COUNT)
  const sections: SectionGate[] = areas.map((a) => {
    const topic = getTopicResult(paperId, a.code)
    const stat = stats.areas.find((s) => s.code === a.code)
    const studied = topic.attempts > 0 || topic.mastered
    const practised = (stat?.seen ?? 0) >= GATE_PRACTICE_MIN
    const revised = areaReviewed(paperId, a.code)
    return { area: a.code, label: a.label, studied, practised, revised, done: studied && practised && revised }
  })
  const done = sections.filter((s) => s.done).length
  return { sections, done, total: sections.length || GATE_SECTION_COUNT, unlocked: sections.length > 0 && done >= sections.length }
}

/** True once a zero-start learner has covered A·B·C — the diagnostic may show. */
export function diagnosticUnlocked(paperId: string): boolean {
  if (getStartMode() !== "zero") return true
  if (getLatestDiagnostic(paperId)) return true
  return diagnosticGate(paperId).unlocked
}

/* ── Shield scheme (missed days never break the loop) ─────────── */

const SHIELD_KEY = "scholify-acca-shield"
const SHIELDS_PER_WEEK = 3

interface ShieldRec {
  lastActive: string | null // yyyy-mm-dd
  streak: number
  shieldsUsed: number
  weekAnchor: string // yyyy-mm-dd of the current week's Monday
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10)
}
function mondayOf(d: Date): string {
  const x = new Date(d)
  const dow = (x.getDay() + 6) % 7 // 0 = Monday
  x.setDate(x.getDate() - dow)
  return ymd(x)
}
function daysBetween(a: string, b: string): number {
  const t = (new Date(b).getTime() - new Date(a).getTime()) / 86400000
  return Math.round(t)
}

function readShields(): Record<string, ShieldRec> {
  try {
    const raw = window.localStorage.getItem(SHIELD_KEY)
    if (raw) return JSON.parse(raw) as Record<string, ShieldRec>
  } catch { /* ignore */ }
  return {}
}
function writeShields(s: Record<string, ShieldRec>): void {
  try { window.localStorage.setItem(SHIELD_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}

export interface ShieldState {
  streak: number
  shieldsLeft: number
  /** Days missed since the last active day (0 if active today/never). */
  missedDays: number
  /** A shield is currently absorbing a gap — the streak is protected. */
  protectedToday: boolean
}

/**
 * Call when the learner completes any task today. Advances the streak and, when
 * days were missed, silently spends shields to keep the streak alive. Returns
 * the resulting shield state. Never surfaces anything punitive.
 */
export function recordDayActive(paperId: string): ShieldState {
  const store = readShields()
  const now = new Date()
  const today = ymd(now)
  const wk = mondayOf(now)
  let rec = store[paperId] ?? { lastActive: null, streak: 0, shieldsUsed: 0, weekAnchor: wk }
  if (rec.weekAnchor !== wk) rec = { ...rec, weekAnchor: wk, shieldsUsed: 0 } // weekly reset

  if (rec.lastActive === today) {
    store[paperId] = rec
    writeShields(store)
    return shieldStateFrom(rec, today)
  }

  const gap = rec.lastActive ? Math.max(0, daysBetween(rec.lastActive, today) - 1) : 0
  const available = SHIELDS_PER_WEEK - rec.shieldsUsed
  if (rec.lastActive && gap > 0 && gap <= available) {
    // Missed days fully shielded — streak survives.
    rec = { ...rec, streak: rec.streak + 1, shieldsUsed: rec.shieldsUsed + gap, lastActive: today }
  } else if (rec.lastActive && gap > available) {
    // Beyond the shield allowance — streak restarts, but with zero drama.
    rec = { ...rec, streak: 1, shieldsUsed: Math.min(SHIELDS_PER_WEEK, rec.shieldsUsed + available), lastActive: today }
  } else {
    rec = { ...rec, streak: rec.streak + 1, lastActive: today }
  }
  store[paperId] = rec
  writeShields(store)
  return shieldStateFrom(rec, today)
}

function shieldStateFrom(rec: ShieldRec, today: string): ShieldState {
  const missed = rec.lastActive ? Math.max(0, daysBetween(rec.lastActive, today) - (rec.lastActive === today ? 0 : 1)) : 0
  return {
    streak: rec.streak,
    shieldsLeft: Math.max(0, SHIELDS_PER_WEEK - rec.shieldsUsed),
    missedDays: rec.lastActive === today ? 0 : missed,
    protectedToday: missed > 0 && missed <= SHIELDS_PER_WEEK - rec.shieldsUsed,
  }
}

/** Read-only shield state (does not advance the streak). */
export function shieldState(paperId: string): ShieldState {
  const store = readShields()
  const now = new Date()
  const wk = mondayOf(now)
  let rec = store[paperId] ?? { lastActive: null, streak: 0, shieldsUsed: 0, weekAnchor: wk }
  if (rec.weekAnchor !== wk) rec = { ...rec, weekAnchor: wk, shieldsUsed: 0 }
  return shieldStateFrom(rec, ymd(now))
}

/* ── Daily task distribution ──────────────────────────────────── */

/** Scale practice volume by the learner's ambition (65 / 75 / 85). */
function ambitionFactor(targetProb: number): number {
  if (targetProb >= 85) return 1.35
  if (targetProb >= 75) return 1.1
  return 1.0
}

/** How many practice questions fit the remaining daily minutes. */
function practiceCount(remainingMin: number, targetProb: number): number {
  const raw = Math.round((remainingMin / COST.perQ) * ambitionFactor(targetProb))
  return Math.max(5, Math.min(30, raw))
}

/** The next syllabus area a learner should study — first not-yet-solid one. */
function nextLearnArea(paperId: string): { code: string; label: string } | null {
  const paper = getPaper(paperId)
  const stats = getPaperStats(paperId)
  for (const a of paper?.areas ?? []) {
    const topic = getTopicResult(paperId, a.code)
    const stat = stats.areas.find((s) => s.code === a.code)
    if (!topic.mastered || (stat?.seen ?? 0) < 8) return { code: a.code, label: a.label }
  }
  return null
}

/** The weakest seen area — where the marks are being lost. */
function weakestArea(paperId: string): { code: string; label: string; acc: number } | null {
  const stats = getPaperStats(paperId)
  const seen = stats.areas.filter((a) => a.seen >= 2).sort((a, b) => a.accuracy - b.accuracy)
  const w = seen[0]
  return w ? { code: w.code, label: w.label, acc: w.accuracy } : null
}

/**
 * TODAY's ordered task list for a paper — the distributed plan the learner
 * actually sees. Honours the persona, the A·B·C gate, the current method phase,
 * the daily minute budget and the target %.
 */
export function buildDailyTasks(paperId: string): SchedTask[] {
  const plan = getPlan(paperId)
  const stats = getPaperStats(paperId)
  const diag = getLatestDiagnostic(paperId)
  const mode = getStartMode()
  const budget = Math.max(12, plan.dailyMinutes || 25)
  const fc = flashcardStats(paperId)

  // Returner with no baseline yet → assess first (diagnostic or uploaded mock).
  if (mode === "assess" && !diag && stats.answered < 5) {
    return [{
      id: "diagnostic",
      icon: "🎯",
      title: "Set your baseline",
      detail: "~15 min diagnostic to fix your starting pass probability and weak areas — the honest start for a retake or a return to study",
      action: "diagnostic",
      minutes: COST.diagnostic,
    }]
  }

  // Brand-new learner, gate still closed → LEARN the sections, no diagnostic yet.
  if (mode === "zero" && !diag && !diagnosticGate(paperId).unlocked) {
    return learnDay(paperId, budget, plan.targetProb, fc.due, /*gateFocus*/ true)
  }

  // Gate just cleared but no diagnostic taken → the honest "wow" moment.
  if (!diag && diagnosticGate(paperId).unlocked && mode === "zero") {
    const tasks: SchedTask[] = [{
      id: "diagnostic",
      icon: "🎯",
      title: "You've covered A·B·C — see where you stand",
      detail: "~15 min · your first real pass probability across every section, and the plan re-tunes around it",
      action: "diagnostic",
      minutes: COST.diagnostic,
    }]
    return tasks
  }

  // Otherwise → phase-driven distribution.
  return phaseDay(paperId, budget, plan.targetProb, fc.due)
}

/** A learn-phase day: study the current area, practise it, revise its cards. */
function learnDay(paperId: string, budget: number, targetProb: number, due: number, gateFocus: boolean): SchedTask[] {
  const gate = gateFocus ? diagnosticGate(paperId) : null
  const focus = gate?.sections.find((s) => !s.done)
  const area = focus
    ? { code: focus.area, label: focus.label }
    : nextLearnArea(paperId) ?? { code: "", label: "the syllabus" }

  const tasks: SchedTask[] = []
  let left = budget

  // 1. Study the topic brief.
  tasks.push({
    id: "study",
    icon: "📖",
    title: `Study ${area.code ? `${area.code} · ` : ""}${area.label}`,
    detail: "Read the topic brief — concept, formulas, worked example, the classic traps",
    action: "study",
    minutes: COST.study,
    area: area.code || undefined,
  })
  left -= COST.study

  // 2. Practise the area you just studied.
  const n = practiceCount(Math.max(10, left - COST.perCard * Math.min(due, 12)), targetProb)
  tasks.push({
    id: "practice",
    icon: "✏️",
    title: `Practise ${n} questions${area.code ? ` — ${area.code} focus` : ""}`,
    detail: "Instant marking + Ask Lara — turn the brief into recall",
    action: "practice",
    minutes: Math.round(n * COST.perQ),
    area: area.code || undefined,
  })
  left -= n * COST.perQ

  // 3. Revise with flashcards (fills the rest of the budget).
  const cards = Math.max(6, Math.min(due || 12, Math.round(left / COST.perCard)))
  tasks.push({
    id: "flashcards",
    icon: "🧠",
    title: `Revise ${cards} flashcards`,
    detail: due > 0 ? "Cards due for spaced repetition — lock in what you learned" : "Warm up the key facts, formulas and thresholds",
    action: "flashcards",
    minutes: Math.round(cards * COST.perCard),
    area: area.code || undefined,
  })

  return tasks
}

/** A phase-driven day once the learner has a baseline. */
function phaseDay(paperId: string, budget: number, targetProb: number, due: number): SchedTask[] {
  const phase = currentPhase(paperId)
  const key = phase.key as MethodPhaseKey

  if (key === "learn") return learnDay(paperId, budget, targetProb, due, false)

  if (key === "strengthen") {
    const weak = weakestArea(paperId)
    const tasks: SchedTask[] = []
    let left = budget
    if (weak) {
      const n = practiceCount(Math.round(budget * 0.6), targetProb)
      tasks.push({
        id: "weak",
        icon: "💪",
        title: `Drill ${weak.code} · ${weak.label} — at ${Math.round(weak.acc * 100)}%`,
        detail: "Your weakest area. Adaptive set until the floor lifts above 65%",
        action: "weak",
        minutes: Math.round(n * COST.perQ),
        area: weak.code,
      })
      left -= n * COST.perQ
    }
    if (due > 0) {
      const cards = Math.min(due, 15)
      tasks.push({ id: "flashcards", icon: "🧠", title: `Clear ${cards} due flashcards`, detail: "Spaced revision keeps mastery warm", action: "flashcards", minutes: Math.round(cards * COST.perCard) })
      left -= cards * COST.perCard
    }
    if (left > 25) {
      tasks.push({ id: "bank", icon: "📚", title: "Bank run — 50 questions under time", detail: "Whole-paper set against the clock — bridge toward the mock gate", action: "bank", minutes: COST.bank })
    }
    return tasks.slice(0, 3)
  }

  if (key === "revise") {
    const tasks: SchedTask[] = [{
      id: "flashcards", icon: "🧠", title: due > 0 ? `Clear ${Math.min(due, 20)} due flashcards` : "Flashcard sweep", detail: "Active recall to zero-due — this is marks on exam day", action: "flashcards", minutes: Math.round(Math.min(due || 15, 20) * COST.perCard),
    }]
    const weak = weakestArea(paperId)
    if (weak) tasks.push({ id: "weak", icon: "💪", title: `Second pass on ${weak.code} · ${weak.label}`, detail: "Lock the last soft area before rehearsal", action: "weak", minutes: 20, area: weak.code })
    tasks.push({ id: "bank", icon: "📚", title: "Bank run — mixed 50", detail: "Confirm coverage holds across the whole paper", action: "bank", minutes: COST.bank })
    return tasks.slice(0, 3)
  }

  // rehearse
  return [
    { id: "mock", icon: "⏱️", title: "Sit a timed mock", detail: "Exam conditions, no hints — the review of every wrong answer IS the study", action: "mock", minutes: COST.mock },
    { id: "weak", icon: "💪", title: "Review the mock's weakest area", detail: "Straight into the gap the mock exposed", action: "weak", minutes: 20 },
  ]
}

/* ── Forward calendar — every day from today to exam ──────────── */

export interface PlanDayTask { kind: SchedAction; title: string; minutes: number; area?: string }
export interface PlanDay {
  dateISO: string
  dow: string
  dayOfMonth: number
  phase: MethodPhaseKey
  phaseLabel: string
  tasks: PlanDayTask[]
  minutes: number
  isToday: boolean
}

const PHASE_SHARE: Record<MethodPhaseKey, number> = { learn: 0.45, strengthen: 0.25, revise: 0.15, rehearse: 0.15 }
const PHASE_LABEL: Record<MethodPhaseKey, string> = { learn: "Learn", strengthen: "Strengthen", revise: "Revise", rehearse: "Rehearse" }

/**
 * Project the whole plan day-by-day from today to the exam date: which area is
 * studied when, where practice and flashcards fall, when bank runs and mocks
 * happen. This is the "route" the learner can see — the calendar the shield
 * scheme silently re-paves whenever a day is missed. Capped to `maxDays` rows.
 */
export function projectPlan(paperId: string, maxDays = 45): PlanDay[] {
  const days = daysUntilExam(paperId)
  if (days === null || days <= 0) return []
  const plan = getPlan(paperId)
  const budget = Math.max(12, plan.dailyMinutes || 25)
  const paper = getPaper(paperId)
  const areas = paper?.areas ?? []

  // Phase spans (in days), last phase takes the remainder.
  const learn = Math.max(1, Math.round(days * PHASE_SHARE.learn))
  const strengthen = Math.max(1, Math.round(days * PHASE_SHARE.strengthen))
  const revise = Math.max(1, Math.round(days * PHASE_SHARE.revise))
  const rehearse = Math.max(1, days - learn - strengthen - revise)

  const out: PlanDay[] = []
  const start = new Date()
  const perArea = areas.length ? Math.max(1, Math.floor(learn / areas.length)) : 1
  const pcount = practiceCount(Math.round(budget * 0.55), plan.targetProb)

  const push = (i: number, phase: MethodPhaseKey, tasks: PlanDayTask[]) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    out.push({
      dateISO: ymd(d),
      dow: d.toLocaleDateString("en-GB", { weekday: "short" }),
      dayOfMonth: d.getDate(),
      phase,
      phaseLabel: PHASE_LABEL[phase],
      tasks,
      minutes: tasks.reduce((s, t) => s + t.minutes, 0),
      isToday: i === 0,
    })
  }

  let i = 0
  // LEARN — cycle areas in order.
  for (let d = 0; d < learn && i < days; d++, i++) {
    const areaIdx = areas.length ? Math.min(areas.length - 1, Math.floor(d / perArea)) : 0
    const a = areas[areaIdx]
    const label = a ? `${a.code} · ${a.label}` : "the syllabus"
    push(i, "learn", [
      { kind: "study", title: `Study ${label}`, minutes: COST.study, area: a?.code },
      { kind: "weak", title: `Practise ${pcount} in ${a?.code ?? "area"}`, minutes: Math.round(pcount * COST.perQ), area: a?.code },
      { kind: "flashcards", title: `Revise ${a?.code ?? ""} flashcards`, minutes: 8, area: a?.code },
    ])
  }
  // STRENGTHEN — weak drills, a bank run every 3rd day.
  for (let d = 0; d < strengthen && i < days; d++, i++) {
    const tasks: PlanDayTask[] = [
      { kind: "weak", title: `Drill your weakest area (${pcount})`, minutes: Math.round(pcount * COST.perQ) },
      { kind: "flashcards", title: "Clear due flashcards", minutes: 8 },
    ]
    if (d % 3 === 2) tasks.push({ kind: "bank", title: "Bank run — 50 under time", minutes: COST.bank })
    push(i, "strengthen", tasks)
  }
  // REVISE — flashcards + written recall, a bank run mid-phase.
  for (let d = 0; d < revise && i < days; d++, i++) {
    const tasks: PlanDayTask[] = [
      { kind: "flashcards", title: "Flashcards toward zero-due", minutes: 12 },
      { kind: "weak", title: "Second pass on a soft area", minutes: 20 },
    ]
    if (d === Math.floor(revise / 2)) tasks.push({ kind: "bank", title: "Bank run — mixed 50", minutes: COST.bank })
    push(i, "revise", tasks)
  }
  // REHEARSE — mocks every other day, review between.
  for (let d = 0; d < rehearse && i < days; d++, i++) {
    const tasks: PlanDayTask[] = d % 2 === 0
      ? [{ kind: "mock", title: "Timed mock — full paper", minutes: COST.mock }, { kind: "weak", title: "Review the mock's weakest area", minutes: 20 }]
      : [{ kind: "weak", title: "Fix the gaps the last mock exposed", minutes: 25 }, { kind: "flashcards", title: "Keep cards at zero-due", minutes: 8 }]
    push(i, "rehearse", tasks)
  }

  return out.slice(0, maxDays)
}
