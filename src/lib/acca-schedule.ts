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
import { activePaperPause } from "@/lib/acca-plan-adjustment"
import { getLearnerBaseline } from "@/lib/acca-learner-baseline"
import { chapterForLearningDay, getStudyResource, PROVIDER_LABEL } from "@/lib/acca-study-resources"
import { chaptersForArea, chapterKey } from "@/lib/acca-study-content"
import { isChapterRead } from "@/lib/acca-topic-plan"

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

/* ── The A·B·C diagnostic gate (brand-new learners) ─────────────
 *
 * Onboarding step 2 asks where the learner is starting from, and the answer
 * changes the whole first month:
 *
 *   "practice"/"course" (a RETURNER) → measure first. They have knowledge to
 *      measure, so a diagnostic on day one is the fastest honest read available
 *      and the plan is tuned from it immediately.
 *
 *   "new" (a BEGINNER) → do NOT measure first. A 25-question diagnostic handed to
 *      someone who has never opened the syllabus returns ~random noise, and the
 *      number it produces ("you're at 23%") is both meaningless and demoralising.
 *      Their readiness instead ACCRUES from daily work — coverage of the paper,
 *      accuracy on what they have covered, and the hardness of what is left (see
 *      projectReadiness in acca-topic-plan) — and the diagnostic appears once they
 *      have genuinely covered the essential ground, at which point it measures
 *      something real and lands as a reward rather than a verdict.
 *
 * "Essential ground" is the first three syllabus areas, each of them READ (the
 * chapters, not merely attempted), PRACTISED past a floor, and REVISED once
 * through flashcards. Reading is measured at chapter level now
 * (acca-topic-plan/markChapterRead) — before that "studied" meant "attempted a
 * knowledge check", which a learner could satisfy without opening the chapter.
 */

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
  /** Chapters of this area read / total, so the UI can show real progress. */
  chaptersRead: number
  chaptersTotal: number
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
    const chapters = chaptersForArea(paperId, a.code)
    const read = chapters.filter((c) => isChapterRead(paperId, chapterKey(c))).length
    /*
     * An area counts as STUDIED when its chapters have been read. Papers with no
     * authored chapters for an area fall back to the old signal (a knowledge check
     * attempted) rather than becoming permanently ungateable.
     */
    const studied = chapters.length > 0 ? read >= chapters.length : topic.attempts > 0 || topic.mastered
    const practised = (stat?.seen ?? 0) >= GATE_PRACTICE_MIN
    const revised = areaReviewed(paperId, a.code)
    return {
      area: a.code,
      label: a.label,
      studied,
      practised,
      revised,
      done: studied && practised && revised,
      chaptersRead: read,
      chaptersTotal: chapters.length,
    }
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
  /** A meaningful learning action has already secured today's streak. */
  activeToday: boolean
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

function shieldStateFrom(rec: ShieldRec, today: string, paused = false): ShieldState {
  const missed = rec.lastActive ? Math.max(0, daysBetween(rec.lastActive, today) - (rec.lastActive === today ? 0 : 1)) : 0
  const shieldsLeft = Math.max(0, SHIELDS_PER_WEEK - rec.shieldsUsed)
  const protectedToday = missed > 0 && missed <= shieldsLeft
  return {
    // A streak the shields can no longer cover is ALREADY gone — report 0, don't
    // echo the stored number. `rec.streak` is only rewritten by recordDayActive,
    // i.e. on the learner's NEXT session, so reading it raw means the dashboard
    // tile keeps advertising a dead streak: "12 days" to someone who last
    // studied three weeks ago. It must read the same as what recordDayActive
    // will decide when they do come back (a restart from 1). Gaps still WITHIN
    // the allowance are protected and keep the number, which is the promise.
    //
    // An explicitly PAUSED paper is the exception: the learner has told us they
    // are away, so the streak is held, not lost. Without this the person who
    // used the pause button — the one case where the absence was declared — is
    // the one who watches their streak collapse to zero.
    streak: paused || protectedToday || missed === 0 ? rec.streak : 0,
    shieldsLeft,
    activeToday: rec.lastActive === today,
    missedDays: rec.lastActive === today ? 0 : missed,
    protectedToday,
  }
}

/**
 * The missed-day message — Charles telling the learner, calmly, that a gap was
 * absorbed and the plan re-spread (Doc 12, Phase 3). The re-spreading already
 * happens (buildDailyTasks recomputes from what remains); this gives it a voice,
 * because the reassurance is the point. Returns null when no days were missed.
 */
/**
 * Charles acknowledging an active pause — the other half of the pause feature.
 *
 * Settings could pause a paper and hold the streak, but nothing ever SAID so:
 * the dashboard carried on issuing a normal day, so the learner had no way to
 * tell the pause had taken effect. Returns null unless a pause is in effect, so
 * an expired one quietly stops speaking.
 */
export function pausedNote(paperId: string): string | null {
  const pause = activePaperPause(paperId)
  if (!pause) return null
  const back = pause.returnDate
    ? `You're back on ${pause.returnDate}.`
    : "Come back whenever you're ready."
  return `${paperId} is paused — your streak is held and nothing is piling up. ${back} Today's plan is here if you want it anyway.`
}

export function missedDayNote(paperId: string): string | null {
  // A paused paper has its own note; missed days are not "missed" when the
  // learner told us they would be away.
  if (activePaperPause(paperId)) return null
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
  return shieldStateFrom(rec, ymd(now), activePaperPause(paperId) !== null)
}

/**
 * Is a streak worth protecting on the line right now? True when the learner has
 * a live streak of 2+ days that they have NOT yet secured today — the moment an
 * in-app nudge (the streak-saver tab title) should pull them back before the day
 * rolls over. A paused paper is never "at risk": the absence was declared, so
 * shieldState holds the streak and activeToday stays honest.
 */
export function streakAtRisk(paperId: string): { atRisk: boolean; streak: number } {
  const s = shieldState(paperId)
  return { atRisk: s.streak >= 2 && !s.activeToday, streak: s.streak }
}

/* ── Daily task distribution ──────────────────────────────────── */

/** The guided questions that follow every studied topic — the founder's
 *  "after studying, 5 questions on the most essential things". */
export const ESSENTIALS_SIZE = 5

/**
 * Scale practice volume by the learner's ambition (65 / 75 / 85).
 *
 * Exported because the onboarding target picker states the consequence of the
 * choice out loud ("about a third more practice a day"), and a second copy of
 * these thresholds written for the UI would drift from the ones that actually
 * size the day. The picker's bands are derived from this function, not retyped.
 */
export function ambitionFactor(targetProb: number): number {
  if (targetProb >= 85) return 1.35
  if (targetProb >= 75) return 1.1
  return 1.0
}

const clamp = (n: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, n))

/* ── Daily budget allocation ──────────────────────────────────────
 *
 * ONE function decides what a day of N minutes contains, so the plan preview,
 * the daily missions and the onboarding daily goal cannot disagree.
 *
 * WHY THIS EXISTS. All three used to size a day with their own hardcoded
 * numbers, and every one of them hit the same ceiling:
 *
 *   · practiceCount() clamped to 30 questions (33 min), whatever the budget.
 *   · the study block was a flat COST.study = 7 min unless a third-party
 *     resource was set — and NO learner has one, because the resource step is
 *     deliberately out of the onboarding flow (see Welcome.tsx visibleSteps).
 *     So the budget-aware branch was unreachable in production and every
 *     learner got a 7-minute "read the topic chapter".
 *   · flashcards were pinned to 12–15 cards (~7–9 min).
 *
 * A learner who promised 180 min/day therefore got a 48-minute day:
 *
 *     study 7 + practice 33 + flashcards 8 = 48
 *
 * And so did a learner who promised 45 — the caps bind from roughly 40 minutes
 * upward, so EVERY budget above that produced an identical day. The daily-time
 * question in onboarding had almost no effect on the plan it produced.
 *
 * THE SHAPE. The fix is not one enormous drill: 180 minutes at 1.1 min/question
 * is 160 questions, which is neither sustainable nor how anyone passes. A longer
 * day earns MORE BLOCKS — a second topic, a real spaced-repetition session, a
 * timed bank run, then written recall for the tail. That is also the honest
 * answer to "what am I supposed to do with the rest of my time?".
 *
 * Allocation order is a priority order, and it is deliberate:
 *   1. FLASHCARDS are reserved first. Spaced repetition is the cheapest marks
 *      in the plan, so it must not be the thing a long practice block squeezes
 *      out.
 *   2. TOPIC CYCLES (read → essentials ×5 → targeted practice), at most two a
 *      day. Two topics is the sane maximum; three is thrash.
 *   3. A BANK RUN, only when a whole one still fits.
 *   4. WRITTEN RECALL absorbs the remainder, so the arithmetic closes.
 */

/** Per-block bounds. A day grows by ADDING blocks, never by inflating one. */
const SHAPE = {
  /** Reading a topic: share of the day for the 1st/2nd cycle, and bounds. */
  studyShare: [0.22, 0.15],
  studyMax: [34, 26],
  /** Below ~30 min there is no room for a 10-minute read AND essentials. */
  studyFloorSmall: 5,
  studyFloor: 10,
  /** Spaced repetition: share of the day, bounded in cards. */
  cardsShare: 0.13,
  cardsMin: 6,
  cardsMax: 40,
  /** Questions in ONE practice block. Past this, the day adds another block. */
  practiceQMax: 30,
  /** A second topic cycle is only worth starting with this much left. */
  secondCycleFloor: 34,
  /** Written recall is only offered when it is a real block, not a rounding scrap. */
  recallFloor: 6,
} as const

export interface TopicCycle {
  /** Minutes reading the topic. */
  studyMinutes: number
  /** Guided questions straight after the read (0 when there is no room). */
  essentials: number
  /** Targeted practice questions after the essentials. */
  practiceQ: number
}

export interface DayShape {
  /** One entry per topic studied today (always at least one). */
  cycles: TopicCycle[]
  /** Flashcards to clear/revise. */
  cards: number
  /** A timed 50-question bank run fits today. */
  bankRun: boolean
  /** Written-recall minutes absorbing the tail (0 when there is no tail). */
  recallMinutes: number
  /** What the shape actually adds up to — should track `budget` closely. */
  totalMinutes: number
  /** Every question in the day (essentials + practice) — the day's goal. */
  questionGoal: number
}

/**
 * Fill a daily minute budget with real work.
 *
 * `due` is the learner's outstanding flashcard count: when cards are genuinely
 * due we clear those rather than inventing a bigger session than exists.
 */
export function shapeDay(budget: number, targetProb: number, due = 0): DayShape {
  const amb = ambitionFactor(targetProb)
  const shaped = shapeDayAt(budget, amb, due)
  if (amb <= 1) return shaped

  /*
   * AIMING HIGHER MUST NEVER BUY YOU LESS WORK.
   *
   * Ambition raises the per-block practice CEILING, so a bigger cap makes the
   * first topic cycle eat minutes the second cycle needed. Past a certain
   * budget that starved the day instead of filling it: at 120 minutes an 85%
   * target produced 45 questions where 65% produced 53. The learner asking for
   * more got 15% less, and nothing anywhere said so.
   *
   * This surfaced the moment the target became a question we actually ask —
   * before that every learner silently sat on the 75% fallback, so the
   * inversion existed but was unreachable for most budgets.
   *
   * Reshaping the allocator to spend the extra ceiling without starving later
   * cycles is a bigger change than this needs; the contract the learner cares
   * about is simply that a higher target is never a smaller day. So when
   * ambition would cost them questions, we keep the baseline shape.
   */
  const baseline = shapeDayAt(budget, 1, due)
  return shaped.questionGoal >= baseline.questionGoal ? shaped : baseline
}

function shapeDayAt(budget: number, amb: number, due: number): DayShape {
  const B = Math.max(12, Math.round(budget))
  const essentialsMin = Math.round(ESSENTIALS_SIZE * COST.perQ)

  // 1 · Flashcards, reserved first.
  const cardTarget = clamp(Math.round((B * SHAPE.cardsShare) / COST.perCard), SHAPE.cardsMin, SHAPE.cardsMax)
  const cards = due > 0 ? clamp(Math.min(due, cardTarget), SHAPE.cardsMin, SHAPE.cardsMax) : cardTarget
  let left = B - Math.round(cards * COST.perCard)

  // 2 · Topic cycles.
  const cycles: TopicCycle[] = []
  const studyFloor = B < 30 ? SHAPE.studyFloorSmall : SHAPE.studyFloor
  /** One practice block's ceiling in minutes — ambition tilts it up. */
  const blockCapMin = Math.round(SHAPE.practiceQMax * COST.perQ * amb)

  for (let c = 0; c < SHAPE.studyShare.length; c++) {
    if (c > 0 && left < SHAPE.secondCycleFloor) break
    const want = clamp(Math.round(B * SHAPE.studyShare[c]), studyFloor, SHAPE.studyMax[c])
    const studyMinutes = Math.max(1, Math.min(want, left))
    left -= studyMinutes

    /*
     * Essentials only when there is ALSO room for practice after them. On a
     * 15-minute day, five essentials would consume every remaining minute and
     * leave the practice slot empty — and five questions on the topic you just
     * read is what essentials already is. Practice wins the tie.
     */
    const essentials = left >= essentialsMin + Math.ceil(COST.perQ) ? ESSENTIALS_SIZE : 0
    left -= Math.round(essentials * COST.perQ)

    const practiceMinutes = Math.max(0, Math.min(left, blockCapMin))
    const practiceQ = clamp(Math.floor(practiceMinutes / COST.perQ), 0, Math.round(SHAPE.practiceQMax * amb))
    left -= Math.round(practiceQ * COST.perQ)

    cycles.push({ studyMinutes, essentials, practiceQ })
  }

  // 3 · A bank run, only if a whole one fits.
  const bankRun = left >= COST.bank
  if (bankRun) left -= COST.bank

  // 4 · Written recall absorbs whatever is left.
  const recallMinutes = left >= SHAPE.recallFloor ? left : 0

  const cycleMinutes = cycles.reduce(
    (sum, cy) => sum + cy.studyMinutes + Math.round(cy.essentials * COST.perQ) + Math.round(cy.practiceQ * COST.perQ),
    0,
  )
  return {
    cycles,
    cards,
    bankRun,
    recallMinutes,
    totalMinutes: Math.round(cards * COST.perCard) + cycleMinutes + (bankRun ? COST.bank : 0) + recallMinutes,
    questionGoal: cycles.reduce((sum, cy) => sum + cy.essentials + cy.practiceQ, 0),
  }
}

/** The next syllabus area a learner should study — first not-yet-solid one. */
function nextLearnArea(paperId: string, exclude: string[] = []): { code: string; label: string } | null {
  const paper = getPaper(paperId)
  const stats = getPaperStats(paperId)
  const outstanding = (paper?.areas ?? []).filter((a) => {
    if (exclude.includes(a.code)) return false
    const topic = getTopicResult(paperId, a.code)
    const stat = stats.areas.find((s) => s.code === a.code)
    return !topic.mastered || (stat?.seen ?? 0) < 8
  })
  if (!outstanding.length) return null

  // A learner starting from zero studies in SYLLABUS ORDER — systematic coverage
  // is the point, and each area builds on the last.
  //
  // A RETURNER studies in order of NEED. They arrived having covered ground, so
  // marching them from area A spends the little time they have on material they
  // already know — the specific complaint of someone leaving a course because it
  // cost too much time, energy and money. Their diagnostic already ranked every
  // area, so lead with the weakest of the areas still outstanding.
  const route = getLearnerBaseline()?.route ?? null
  const diagnostic = getLatestDiagnostic(paperId)
  if (route && route !== "new" && diagnostic) {
    const scoreOf = (code: string): number =>
      diagnostic.areas.find((area) => area.code === code && area.seen > 0)?.score ?? 1
    const byNeed = [...outstanding].sort((a, b) => scoreOf(a.code) - scoreOf(b.code))
    return { code: byNeed[0].code, label: byNeed[0].label }
  }
  return { code: outstanding[0].code, label: outstanding[0].label }
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

  /*
   * ── PRACTICE-ONLY ROUTE ────────────────────────────────────────────
   *
   * A learner who chose "Practise for my exam" has covered the syllabus. They
   * do not need to be taught it again, and a day that opens with "read chapter
   * 4" is a day they will skip — which costs the streak, the plan and
   * eventually the subscription.
   *
   * So the reading is dropped from the DAILY PLAN and its minutes are handed to
   * questions, where that learner's marks actually come from. Nothing is taken
   * away: every chapter and technical article stays open on the study screens
   * for the moment they hit something they have genuinely forgotten. Removed
   * from the plan, not from the product.
   */
  const practiceOnly = getLearnerBaseline()?.route === "practice" && !gateFocus

  const shape = shapeDay(budget, targetProb, due)
  const resource = getStudyResource(paperId)
  const provider = resource && !resource.providers.includes("none")
    ? PROVIDER_LABEL[resource.primaryProvider]
    : null
  const nextChapter = resource?.totalChapters
    ? Math.min(resource.totalChapters, resource.completedChapters + 1)
    : null
  // The pain point leads practice whenever one is measurable.
  const weak = gateFocus ? null : focusArea(paperId)

  const tasks: SchedTask[] = []

  shape.cycles.forEach((cycle, c) => {
    /*
     * A second topic only exists on a long day (see shapeDay). It studies the
     * NEXT area rather than repeating the first — two reads of the same chapter
     * is not what three hours should buy. `secondArea` falls back to the first
     * when the syllabus has nothing else outstanding.
     */
    const cycleArea = c === 0 ? area : nextLearnArea(paperId, [area.code]) ?? area
    const suffix = c === 0 ? "" : String(c + 1)

    // 1 · Topic learning — skipped entirely on the practice-only route.
    if (!practiceOnly) tasks.push({
      id: `study${suffix}`,
      icon: "📖",
      title: provider && c === 0
        ? `${provider}${nextChapter ? ` · Chapter ${nextChapter}` : ""}`
        : `Study ${cycleArea.code ? `${cycleArea.code} · ` : ""}${cycleArea.label}`,
      detail: provider && c === 0
        ? `Continue in your ${provider} resource, then ask Charles to test your understanding of ${cycleArea.code ? `${cycleArea.code} · ${cycleArea.label}` : "the topic"}`
        : `Read the topic chapter — concept, formulas, worked example, the classic traps · ~${cycle.studyMinutes} min`,
      action: "study",
      minutes: cycle.studyMinutes,
      area: cycleArea.code || undefined,
    })

    // 2 · Essentials — five guided questions on what was just studied.
    if (cycle.essentials > 0) {
      tasks.push({
        id: `essentials${suffix}`,
        icon: "🎯",
        title: `Quizzes ×${cycle.essentials}${cycleArea.code ? ` — ${cycleArea.code}` : ""}`,
        detail: "Five Quizzes on what you just studied — finish the lesson, then prove it",
        action: "essentials",
        minutes: Math.round(cycle.essentials * COST.perQ),
        area: cycleArea.code || undefined,
      })
    }

    // 3 · Daily practice — the biggest block.
    if (cycle.practiceQ > 0) {
      /*
       * The reading minutes are not saved, they are SPENT. Dropping the chapter
       * and leaving the day short would quietly shrink the commitment a learner
       * made — they promised those minutes, so they get more questions instead,
       * which is the whole point of choosing this route.
       */
      const n = practiceOnly
        ? cycle.practiceQ + Math.max(0, Math.floor(cycle.studyMinutes / COST.perQ))
        : cycle.practiceQ
      const aimWeak = c === 0 && weak && weak.code !== cycleArea.code
      tasks.push(
        aimWeak
          ? {
              // Stable id for the daily drill slot — it must NOT change when the
              // slot flips between weak-first and plain practice mid-day, or
              // today-mission completion would regress and re-lock finished tasks.
              id: "drill",
              icon: "💪",
              title: `Drill ${weak!.code} · ${weak!.label} — at ${Math.round(weak!.acc * 100)}%`,
              detail:
                weak!.source === "diagnostic"
                  ? `${n} adaptive questions on your diagnostic's pain point — until the floor lifts above 65%`
                  : `${n} adaptive questions on your weakest practised area — until the floor lifts above 65%`,
              action: "weak",
              minutes: Math.round(n * COST.perQ),
              area: weak!.code,
            }
          : {
              id: `drill${suffix}`, // stable slot id — see the weak branch above
              icon: "✏️",
              title: `Practise ${n} questions${cycleArea.code ? ` — ${cycleArea.code} focus` : ""}`,
              detail: "Instant marking + Ask Charles — turn the chapter into recall",
              action: "practice",
              minutes: Math.round(n * COST.perQ),
              area: cycleArea.code || undefined,
            },
      )
    }
  })

  // 4 · Flashcards — spaced revision closes the taught material.
  tasks.push({
    id: "flashcards",
    icon: "🧠",
    title: due > 0 ? `Clear ${shape.cards} due flashcards` : `Revise ${shape.cards} flashcards`,
    detail: due > 0 ? "Cards due for spaced repetition — lock in what you learned" : "Warm up the key facts, formulas and thresholds",
    action: "flashcards",
    minutes: Math.round(shape.cards * COST.perCard),
    area: area.code || undefined,
  })

  /*
   * 5 · What a LONG day does with the time one topic cannot fill. Before this,
   * these minutes simply had nothing in them — a learner who promised 180 min
   * was handed 48 and left to invent the rest.
   */
  if (shape.bankRun) {
    tasks.push({
      id: "bank",
      icon: "📚",
      title: "Bank run — 50 questions under time",
      detail: "A whole-paper set against the clock — this is what builds exam pace",
      action: "bank",
      minutes: COST.bank,
    })
  }
  if (shape.recallMinutes > 0) {
    tasks.push({
      id: "recall",
      icon: "✍️",
      title: `Written recall — ${shape.recallMinutes} min`,
      detail: "Close the book and write out today's rules, formulas and traps from memory. Retrieval, not re-reading, is what sticks",
      action: "weak",
      minutes: shape.recallMinutes,
      area: area.code || undefined,
    })
  }

  return tasks
}

/** A phase-driven day once the learner has a baseline. */
function phaseDay(paperId: string, budget: number, targetProb: number, due: number): SchedTask[] {
  const phase = currentPhase(paperId)
  const key = phase.key as MethodPhaseKey

  // Learn AND strengthen run the same four-category day — what changes between
  // them is where practice lands (categoryDay aims it at the pain point the
  // moment one is measurable). categoryDay now schedules its own bank run when
  // the budget affords a whole one, so strengthen no longer bolts on a second.
  if (key === "learn" || key === "strengthen") return categoryDay(paperId, budget, targetProb, due, false)

  if (key === "revise") {
    /*
     * Revise used to be three fixed blocks summing to ~72 min regardless of the
     * budget: over for a 25-minute learner, and a third of the day for someone
     * on 180. Both halves now scale — cards and the second pass take shares of
     * the day, and the bank run only appears when a whole one fits.
     */
    const cardTarget = Math.max(8, Math.round((budget * 0.3) / COST.perCard))
    const cards = due > 0 ? Math.max(8, Math.min(due, cardTarget)) : cardTarget
    const tasks: SchedTask[] = [{
      id: "flashcards", icon: "🧠",
      title: due > 0 ? `Clear ${cards} due flashcards` : `Flashcard sweep — ${cards} cards`,
      detail: "Active recall to zero-due — this is marks on exam day",
      action: "flashcards", minutes: Math.round(cards * COST.perCard),
    }]
    let left = budget - tasks[0].minutes
    const weak = focusArea(paperId)
    if (weak && left >= 10) {
      const mins = Math.min(left, Math.max(15, Math.round(budget * 0.35)))
      tasks.push({
        id: "weak", icon: "💪", title: `Second pass on ${weak.code} · ${weak.label}`,
        detail: weak.source === "diagnostic" ? "The diagnostic's weakest area — lock it before rehearsal" : "Lock the last soft area before rehearsal",
        action: "weak", minutes: mins, area: weak.code,
      })
      left -= mins
    }
    if (left >= COST.bank) {
      tasks.push({ id: "bank", icon: "📚", title: "Bank run — mixed 50", detail: "Confirm coverage holds across the whole paper", action: "bank", minutes: COST.bank })
      left -= COST.bank
    }
    if (left >= 8) {
      tasks.push({
        id: "recall", icon: "✍️", title: `Written recall — ${left} min`,
        detail: "Close the book and write the rules and formulas from memory — retrieval, not re-reading",
        action: "weak", minutes: left,
      })
    }
    return tasks
  }

  /*
   * REHEARSE. A mock is a fixed real duration — you cannot sit two thirds of
   * one — so it is never scaled. What DOES scale is what follows it: reviewing
   * every wrong answer is the actual study, and a long day has room for a
   * proper review plus a flashcard sweep rather than a flat 20 minutes.
   */
  const tasks: SchedTask[] = [
    { id: "mock", icon: "⏱️", title: "Sit a timed mock", detail: "Exam conditions, no hints — the review of every wrong answer IS the study", action: "mock", minutes: COST.mock },
  ]
  let left = budget - COST.mock
  const reviewMin = left >= 12 ? Math.min(left, Math.max(20, Math.round(budget * 0.25))) : Math.max(10, Math.round(COST.mock * 0.4))
  tasks.push({ id: "weak", icon: "💪", title: "Review the mock's weakest area", detail: "Straight into the gap the mock exposed — every wrong answer, understood", action: "weak", minutes: reviewMin })
  left -= reviewMin
  if (left >= 8) {
    const cards = Math.max(8, Math.round(left / COST.perCard))
    tasks.push({
      id: "flashcards", icon: "🧠", title: due > 0 ? `Clear ${Math.min(due, cards)} due flashcards` : `Revise ${cards} flashcards`,
      detail: "Keep the cards at zero-due through rehearsal week", action: "flashcards",
      minutes: Math.round(Math.min(due > 0 ? Math.min(due, cards) : cards, cards) * COST.perCard),
    })
  }
  return tasks
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
  const resource = getStudyResource(paperId)

  // Phase spans (in days), last phase takes the remainder.
  const learn = Math.max(1, Math.round(days * PHASE_SHARE.learn))
  const strengthen = Math.max(1, Math.round(days * PHASE_SHARE.strengthen))
  const revise = Math.max(1, Math.round(days * PHASE_SHARE.revise))
  const rehearse = Math.max(1, days - learn - strengthen - revise)

  const out: PlanDay[] = []
  const start = new Date()
  const perArea = areas.length ? Math.max(1, Math.floor(learn / areas.length)) : 1
  /*
   * The SAME allocator the live daily missions use (see shapeDay). The preview
   * and the real day used to be sized by two different sets of hardcoded
   * numbers, so the plan a learner was shown at onboarding was not the plan they
   * then got — and both were capped at ~48 min whatever they promised.
   */
  const shape = shapeDay(budget, plan.targetProb)

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
    const chapter = chapterForLearningDay(resource, d, learn)
    const provider = resource && !resource.providers.includes("none")
      ? PROVIDER_LABEL[resource.primaryProvider]
      : null
    const tasks: PlanDayTask[] = []
    // Mirrors categoryDay: the practice-only route sees no chapters in its
    // projected route either, or the preview would promise a plan the live day
    // does not deliver — the exact mismatch shapeDay was introduced to end.
    const practiceOnlyRoute = getLearnerBaseline()?.route === "practice"
    shape.cycles.forEach((cycle, c) => {
      // The second cycle studies the NEXT area in syllabus order, not the same
      // one twice — that is what a long day actually buys.
      const ca = c === 0 ? a : areas[Math.min(areas.length - 1, areaIdx + 1)]
      const clabel = ca ? `${ca.code} · ${ca.label}` : "the syllabus"
      if (!practiceOnlyRoute) {
        tasks.push({
          kind: "study",
          title: provider && c === 0 ? `${provider}${chapter ? ` · Chapter ${chapter}` : ""} · ${clabel}` : `Study ${clabel}`,
          minutes: cycle.studyMinutes,
          area: ca?.code,
        })
      }
      if (cycle.essentials > 0) {
        tasks.push({ kind: "essentials", title: `Quizzes ×${cycle.essentials} — ${ca?.code ?? "area"}`, minutes: Math.round(cycle.essentials * COST.perQ), area: ca?.code })
      }
      const practiceQ = practiceOnlyRoute
        ? cycle.practiceQ + Math.max(0, Math.floor(cycle.studyMinutes / COST.perQ))
        : cycle.practiceQ
      if (practiceQ > 0) {
        tasks.push({ kind: "weak", title: `Practise ${practiceQ} in ${ca?.code ?? "area"}`, minutes: Math.round(practiceQ * COST.perQ), area: ca?.code })
      }
    })
    tasks.push({ kind: "flashcards", title: `Revise ${shape.cards} ${a?.code ?? ""} flashcards`.replace("  ", " "), minutes: Math.round(shape.cards * COST.perCard), area: a?.code })
    if (shape.bankRun) tasks.push({ kind: "bank", title: "Bank run — 50 under time", minutes: COST.bank })
    if (shape.recallMinutes > 0) tasks.push({ kind: "weak", title: `Written recall — ${shape.recallMinutes} min`, minutes: shape.recallMinutes, area: a?.code })
    push(i, "learn", tasks)
  }
  // STRENGTHEN — weak drills sized to the budget, a bank run every 3rd day.
  const drillQ = shape.cycles.reduce((s, c) => s + c.practiceQ, 0) || 10
  for (let d = 0; d < strengthen && i < days; d++, i++) {
    const isBankDay = d % 3 === 2
    // The bank run is 40 real minutes; on a bank day the drill gives way to it
    // rather than the day silently running 40 minutes long.
    const room = Math.max(10, budget - Math.round(shape.cards * COST.perCard) - (isBankDay ? COST.bank : 0))
    const q = Math.max(5, Math.min(drillQ, Math.floor(room / COST.perQ)))
    const tasks: PlanDayTask[] = [
      { kind: "weak", title: `Drill your weakest area (${q})`, minutes: Math.round(q * COST.perQ) },
      { kind: "flashcards", title: `Clear ${shape.cards} due flashcards`, minutes: Math.round(shape.cards * COST.perCard) },
    ]
    if (isBankDay) tasks.push({ kind: "bank", title: "Bank run — 50 under time", minutes: COST.bank })
    const spent = tasks.reduce((s, t) => s + t.minutes, 0)
    if (budget - spent >= 8) tasks.push({ kind: "weak", title: `Written recall — ${budget - spent} min`, minutes: budget - spent })
    push(i, "strengthen", tasks)
  }
  // REVISE — flashcards + written recall, a bank run mid-phase.
  for (let d = 0; d < revise && i < days; d++, i++) {
    const isBankDay = d === Math.floor(revise / 2)
    const cards = Math.max(8, Math.round((budget * 0.3) / COST.perCard))
    const tasks: PlanDayTask[] = [
      { kind: "flashcards", title: `Flashcards toward zero-due (${cards})`, minutes: Math.round(cards * COST.perCard) },
    ]
    let room = budget - tasks[0].minutes - (isBankDay ? COST.bank : 0)
    if (room >= 10) {
      const secondPass = Math.min(room, Math.max(15, Math.round(budget * 0.35)))
      tasks.push({ kind: "weak", title: "Second pass on a soft area", minutes: secondPass })
      room -= secondPass
    }
    if (isBankDay) tasks.push({ kind: "bank", title: "Bank run — mixed 50", minutes: COST.bank })
    if (room >= 8) tasks.push({ kind: "weak", title: `Written recall — ${room} min`, minutes: room })
    push(i, "revise", tasks)
  }
  // REHEARSE — mocks every other day, review between. A mock is a fixed real
  // duration and is never scaled; what follows it is.
  for (let d = 0; d < rehearse && i < days; d++, i++) {
    const tasks: PlanDayTask[] = []
    if (d % 2 === 0) {
      tasks.push({ kind: "mock", title: "Timed mock — full paper", minutes: COST.mock })
      const review = Math.max(20, Math.min(Math.max(0, budget - COST.mock), Math.round(budget * 0.3)))
      tasks.push({ kind: "weak", title: "Review the mock's weakest area", minutes: review })
      const room = budget - COST.mock - review
      if (room >= 8) tasks.push({ kind: "flashcards", title: "Keep cards at zero-due", minutes: room })
    } else {
      const fix = Math.max(25, Math.round(budget * 0.55))
      tasks.push({ kind: "weak", title: "Fix the gaps the last mock exposed", minutes: fix })
      const room = Math.max(0, budget - fix)
      tasks.push({ kind: "flashcards", title: `Keep cards at zero-due`, minutes: Math.max(8, room) })
    }
    push(i, "rehearse", tasks)
  }

  return out.slice(0, maxDays)
}
