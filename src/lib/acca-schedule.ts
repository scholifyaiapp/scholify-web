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

export type SchedAction = "study" | "essentials" | "practice" | "weak" | "flashcards" | "bank" | "mock" | "diagnostic"

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

// Local calendar date, matching acca.ts's todayStr()/acca-flashcards.ts's
// todayStr() — toISOString() would read the UTC date instead, so a student
// west of Greenwich studying in their own evening gets stamped with
// tomorrow's date and desyncs from every other streak/date store in the app.
function ymd(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, "0")
  const day = `${d.getDate()}`.padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
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
    // No shields protected anything here, so none are spent — otherwise a
    // broken streak would also burn the week's remaining shields for zero
    // benefit, breaking the *next* streak too on the very first missed day.
    rec = { ...rec, streak: 1, lastActive: today }
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

/**
 * The missed-day message — Lara telling the learner, calmly, that a gap was
 * absorbed and the plan re-spread (Doc 12, Phase 3). The re-spreading already
 * happens (buildDailyTasks recomputes from what remains); this gives it a voice,
 * because the reassurance is the point. Returns null when no days were missed.
 */
export function missedDayNote(paperId: string): string | null {
  const s = shieldState(paperId)
  if (s.missedDays <= 0) return null
  const gap = s.missedDays === 1 ? "a day" : `${s.missedDays} days`
  const plan = getPlan(paperId)
  const days = daysUntilExam(paperId)
  const tail = days && days > 0 ? ` — still on track for ${plan.targetProb}% by exam day` : ""
  return `You missed ${gap}, so I've re-spread today's plan across the time that's left${tail}. No backlog to catch up on.`
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

/** The guided questions that follow every studied topic — the founder's
 *  "after studying, 5 questions on the most essential things". */
export const ESSENTIALS_SIZE = 5

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

/**
 * Once an area has this many practised questions, the learner's LIVE accuracy is
 * a truer signal than the one-off diagnostic, and takes over as the weakness read.
 */
const DIAG_OVERRIDE_MIN = 8

export interface FocusArea {
  code: string
  label: string
  /** 0–1 — diagnostic competence, or live practice accuracy. */
  acc: number
  source: "diagnostic" | "practice"
}

/**
 * The area today's plan should attack — the heart of "the diagnostic drives the
 * plan." Precedence, matching Doc 12's vision:
 *   1. the DIAGNOSTIC's pain points — the day after a diagnostic, the plan
 *      targets exactly what it flagged, and keeps doing so until the learner has
 *      drilled that area enough (>= DIAG_OVERRIDE_MIN) for live accuracy to lead;
 *   2. live PRACTICE weakness — the seen area actually being got wrong;
 *   3. null — the caller falls back to syllabus order.
 */
export function focusArea(paperId: string): FocusArea | null {
  const stats = getPaperStats(paperId)
  const diag = getLatestDiagnostic(paperId)

  if (diag) {
    for (const w of diag.weakest) {
      const stat = stats.areas.find((s) => s.code === w.code)
      if ((stat?.seen ?? 0) < DIAG_OVERRIDE_MIN) {
        return { code: w.code, label: w.label, acc: w.score, source: "diagnostic" }
      }
    }
  }

  const practised = stats.areas.filter((a) => a.seen >= 2).sort((a, b) => a.accuracy - b.accuracy)
  const w = practised[0]
  return w ? { code: w.code, label: w.label, acc: w.accuracy, source: "practice" } : null
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
      detail: "~15 min diagnostic to set your starting Exam Readiness Score and weak areas — the honest start for a retake or a return to study",
      action: "diagnostic",
      minutes: COST.diagnostic,
    }]
  }

  // Brand-new learner, gate still closed → LEARN the sections, no diagnostic yet.
  if (mode === "zero" && !diag && !diagnosticGate(paperId).unlocked) {
    return categoryDay(paperId, budget, plan.targetProb, fc.due, /*gateFocus*/ true)
  }

  // Gate just cleared but no diagnostic taken → the honest "wow" moment.
  if (!diag && diagnosticGate(paperId).unlocked && mode === "zero") {
    const tasks: SchedTask[] = [{
      id: "diagnostic",
      icon: "🎯",
      title: "You've covered A·B·C — see where you stand",
      detail: "~15 min · your first Exam Readiness Score across every section, and the plan re-tunes around it",
      action: "diagnostic",
      minutes: COST.diagnostic,
    }]
    return tasks
  }

  // Otherwise → phase-driven distribution.
  return phaseDay(paperId, budget, plan.targetProb, fc.due)
}

/**
 * The categorised study day — the founder's four daily categories, in order,
 * PROPORTIONED to the onboarding answers (dailyMinutes sets the budget,
 * targetProb scales practice volume):
 *
 *   1 · TOPIC LEARNING  — study the next area's chapter/brief (progression:
 *       "another topic during learning is also essential")
 *   2 · ESSENTIALS ×5   — five guided questions on the most essential points
 *       of what was just studied
 *   3 · DAILY PRACTICE  — the biggest block, aimed at the PAIN POINT first
 *       (diagnostic → live practice precedence via focusArea); falls back to
 *       the studied area while no weakness is measurable yet
 *   4 · FLASHCARDS      — due spaced-repetition cards fill the remainder
 *
 * `gateFocus` (zero-start, A·B·C gate still closed) pins study AND practice to
 * the next gate section — coverage before weakness-hunting.
 */
function categoryDay(paperId: string, budget: number, targetProb: number, due: number, gateFocus: boolean): SchedTask[] {
  const gate = gateFocus ? diagnosticGate(paperId) : null
  const focus = gate?.sections.find((s) => !s.done)
  const area = focus
    ? { code: focus.area, label: focus.label }
    : nextLearnArea(paperId) ?? { code: "", label: "the syllabus" }

  const tasks: SchedTask[] = []

  // 1 · Topic learning — the main content.
  tasks.push({
    id: "study",
    icon: "📖",
    title: `Study ${area.code ? `${area.code} · ` : ""}${area.label}`,
    detail: "Read the topic chapter — concept, formulas, worked example, the classic traps",
    action: "study",
    minutes: COST.study,
    area: area.code || undefined,
  })

  // 2 · Essentials — 5 guided questions on what was just studied.
  const essentialsMin = Math.round(ESSENTIALS_SIZE * COST.perQ)
  tasks.push({
    id: "essentials",
    icon: "🎯",
    title: `Essentials ×${ESSENTIALS_SIZE}${area.code ? ` — ${area.code}` : ""}`,
    detail: "The five most essential questions on what you just studied — read the brief, then prove it",
    action: "essentials",
    minutes: essentialsMin,
    area: area.code || undefined,
  })

  // 3 · Daily practice — the pain point leads whenever one is measurable.
  const weak = gateFocus ? null : focusArea(paperId)
  const cardsReserve = COST.perCard * Math.max(6, Math.min(due || 8, 12))
  const left = Math.max(8, budget - COST.study - essentialsMin - cardsReserve)
  const n = practiceCount(left, targetProb)
  if (weak && weak.code !== area.code) {
    tasks.push({
      id: "weak",
      icon: "💪",
      title: `Drill ${weak.code} · ${weak.label} — at ${Math.round(weak.acc * 100)}%`,
      detail:
        weak.source === "diagnostic"
          ? `${n} adaptive questions on your diagnostic's pain point — until the floor lifts above 65%`
          : `${n} adaptive questions on your weakest practised area — until the floor lifts above 65%`,
      action: "weak",
      minutes: Math.round(n * COST.perQ),
      area: weak.code,
    })
  } else {
    tasks.push({
      id: "practice",
      icon: "✏️",
      title: `Practise ${n} questions${area.code ? ` — ${area.code} focus` : ""}`,
      detail: "Instant marking + Ask Lara — turn the chapter into recall",
      action: "practice",
      minutes: Math.round(n * COST.perQ),
      area: area.code || undefined,
    })
  }

  // 4 · Flashcards — spaced revision closes the day.
  const cards = Math.max(6, Math.min(due || 12, 15))
  tasks.push({
    id: "flashcards",
    icon: "🧠",
    title: due > 0 ? `Clear ${cards} due flashcards` : `Revise ${cards} flashcards`,
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

  // Learn AND strengthen run the same four-category day — what changes between
  // them is where practice lands (categoryDay aims it at the pain point the
  // moment one is measurable). Strengthen adds a bank run on big-budget days.
  if (key === "learn") return categoryDay(paperId, budget, targetProb, due, false)

  if (key === "strengthen") {
    const tasks = categoryDay(paperId, budget, targetProb, due, false)
    const spent = tasks.reduce((a, t) => a + t.minutes, 0)
    if (budget - spent > 25) {
      tasks.push({ id: "bank", icon: "📚", title: "Bank run — 50 questions under time", detail: "Whole-paper set against the clock — bridge toward the mock gate", action: "bank", minutes: COST.bank })
    }
    return tasks
  }

  if (key === "revise") {
    const tasks: SchedTask[] = [{
      id: "flashcards", icon: "🧠", title: due > 0 ? `Clear ${Math.min(due, 20)} due flashcards` : "Flashcard sweep", detail: "Active recall to zero-due — this is marks on exam day", action: "flashcards", minutes: Math.round(Math.min(due || 15, 20) * COST.perCard),
    }]
    const weak = focusArea(paperId)
    if (weak) tasks.push({ id: "weak", icon: "💪", title: `Second pass on ${weak.code} · ${weak.label}`, detail: weak.source === "diagnostic" ? "The diagnostic's weakest area — lock it before rehearsal" : "Lock the last soft area before rehearsal", action: "weak", minutes: 20, area: weak.code })
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
