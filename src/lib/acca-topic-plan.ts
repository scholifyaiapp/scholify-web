/*
 * Scholify — the TOPIC PLAN: the whole paper, spread across real days.
 *
 * ── Why this module exists ────────────────────────────────────────
 * Everything downstream of onboarding used to plan in SYLLABUS AREAS. An area is
 * not a study session: BT area A is nine chapters and about three hours of
 * reading, so "Study A · Business organisation" is a task no learner can finish,
 * cannot be ticked honestly, and repeats verbatim the next day. The learner sees
 * the same row for a week and concludes the plan is decorative.
 *
 * A CHAPTER is a session. The content layer already holds chapters with authored
 * read times, section counts, worked examples and traps (acca-study-content), and
 * the question bank already tags items with `chapter`. So this module plans at
 * chapter granularity and everything else follows:
 *
 *   · today's study block names an EXACT chapter ("BT-04 · Organisational
 *     culture"), never an area;
 *   · its minutes come from that chapter's authored time scaled by measured
 *     HARDNESS (content density) and the learner's own reading pace;
 *   · the exam date is RECOMMENDED from the real size of the paper's content —
 *     total adjusted chapter time, the bank, the four method phases and the
 *     learner's weekly commitment — instead of being an empty date field;
 *   · the whole plan is projectable: chapter → day → date, which is what the
 *     Plan tab's operational week and the readiness projection both read.
 *
 * Deterministic and offline. No AI in this path: given the same content and the
 * same onboarding answers it always produces the same plan, which is what makes
 * it debuggable and what makes the learner's plan stable from day to day.
 */

import { getPaper, getPaperStats } from "@/lib/acca"
import { getPlan, type MethodPhaseKey } from "@/lib/acca-plan"
import { getLearnerBaseline } from "@/lib/acca-learner-baseline"
import { getLatestDiagnostic } from "@/lib/acca-diagnostic"
import { getTopicResult } from "@/lib/acca-topics"
import { chapterKey, chaptersForPaper, type StudyChapter } from "@/lib/acca-study-content"
import { paperContent } from "@/lib/acca-content-registry"

/* ── Local dates ──────────────────────────────────────────────────
 * LOCAL calendar dates throughout, never toISOString(): a learner west of
 * Greenwich studying in their evening would otherwise be stamped with tomorrow
 * and desync from every other date store in the app. Matches acca.ts's todayStr.
 */

function ymd(d: Date): string {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function addDays(from: Date, days: number): Date {
  const d = new Date(from)
  d.setDate(d.getDate() + days)
  return d
}

function todayLocal(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

/* ── Chapter hardness ─────────────────────────────────────────────
 *
 * "Average student time based on topic hardness" needs a hardness number, and
 * the honest source for one is the chapter itself. Every signal below is
 * measured from authored content, so it cannot drift from what the learner
 * actually reads:
 *
 *   · LENGTH   — sections and blocks. A twelve-block chapter is a longer sit
 *                than a five-block one whatever its subject.
 *   · LOAD     — formulas and worked examples. Computational material is slower
 *                per word than prose by a wide margin: you stop and work it.
 *   · DEPTH    — exam traps and key terms. Traps are the examiner's known
 *                failure modes; a chapter with six of them demands re-reading.
 *   · BREADTH  — how many official study-guide references it delivers.
 *
 * The result is a 0–1 score, three named bands, and a minute multiplier. The
 * multiplier is deliberately narrow (0.9–1.35): the authored `minutes` is
 * already a realistic read time, so hardness ADJUSTS it rather than inventing it.
 */

export type HardnessLevel = 1 | 2 | 3

export interface ChapterHardness {
  level: HardnessLevel
  /** "Core" | "Demanding" | "Tough" — what the learner is shown. */
  label: string
  /** 0–1 raw score. */
  score: number
  /** Multiplier applied to the chapter's authored minutes. */
  factor: number
  /** The one-line reason, so the number is never unexplained. */
  why: string
}

const HARDNESS_LABEL: Record<HardnessLevel, string> = { 1: "Core", 2: "Demanding", 3: "Tough" }

export function chapterHardness(chapter: StudyChapter): ChapterHardness {
  const blocks = chapter.sections.reduce((n, s) => n + s.blocks.length, 0)
  const computational = chapter.sections.reduce(
    (n, s) => n + s.blocks.filter((b) => b.kind === "formula" || b.kind === "example").length,
    0,
  )
  const traps = chapter.examTraps.length
  const terms = chapter.keyTerms.length
  const refs = chapter.syllabusRefs?.length ?? 1

  // Each term is normalised to 0–1 against a generous ceiling, then weighted.
  const length = Math.min(1, blocks / 26)
  const load = Math.min(1, computational / 9)
  const depth = Math.min(1, (traps + terms / 2) / 10)
  const breadth = Math.min(1, refs / 8)
  const score = Math.min(1, length * 0.3 + load * 0.34 + depth * 0.24 + breadth * 0.12)

  const level: HardnessLevel = score >= 0.62 ? 3 : score >= 0.36 ? 2 : 1
  const factor = 0.9 + score * 0.45
  const why =
    level === 3
      ? computational >= 4
        ? `${computational} formulas/worked examples and ${traps} traps — work it with a pen`
        : `${blocks} blocks and ${traps} examiner traps — this one needs two passes`
      : level === 2
        ? computational >= 3
          ? `${computational} computations to work through`
          : `${blocks} blocks across ${chapter.sections.length} sections`
        : "Short, mostly narrative — one clean pass is enough"

  return { level, label: HARDNESS_LABEL[level], score: Math.round(score * 100) / 100, factor, why }
}

/* ── Reading pace ─────────────────────────────────────────────────
 *
 * The authored minutes are an AVERAGE student's time. A learner who consistently
 * finishes chapters faster (or slower) than that should see their own number, or
 * the plan is lying to them by exactly the amount they differ. Pace is measured
 * from completed chapter reads and clamped hard — one interrupted session must
 * not rewrite every future estimate.
 */

const PACE_KEY = "scholify-chapter-pace"
const PACE_MIN = 0.7
const PACE_MAX = 1.6

interface PaceRec {
  /** Authored minutes summed over the chapters measured. */
  expected: number
  /** Real minutes the learner spent on those chapters. */
  actual: number
  samples: number
}

function readPace(): Record<string, PaceRec> {
  try {
    const raw = window.localStorage.getItem(PACE_KEY)
    if (raw) return JSON.parse(raw) as Record<string, PaceRec>
  } catch {
    /* ignore */
  }
  return {}
}

/** Record a finished chapter read so future estimates use this learner's pace. */
export function recordChapterPace(paperId: string, authoredMinutes: number, actualMinutes: number): void {
  if (!(authoredMinutes > 0) || !(actualMinutes > 0)) return
  // A read that ran past three times the authored time was interrupted, not slow.
  const capped = Math.min(actualMinutes, authoredMinutes * 3)
  try {
    const store = readPace()
    const rec = store[paperId] ?? { expected: 0, actual: 0, samples: 0 }
    store[paperId] = {
      expected: rec.expected + authoredMinutes,
      actual: rec.actual + capped,
      samples: rec.samples + 1,
    }
    window.localStorage.setItem(PACE_KEY, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

/** This learner's pace multiplier on a paper — 1.0 until three chapters are measured. */
export function readingPace(paperId: string): number {
  const rec = readPace()[paperId]
  if (!rec || rec.samples < 3 || rec.expected <= 0) return 1
  return Math.min(PACE_MAX, Math.max(PACE_MIN, rec.actual / rec.expected))
}

/** The minutes THIS learner should budget for THIS chapter. */
export function chapterMinutes(paperId: string, chapter: StudyChapter): number {
  const hard = chapterHardness(chapter)
  return Math.max(4, Math.round(chapter.minutes * hard.factor * readingPace(paperId)))
}

/* ── Which chapters are done ──────────────────────────────────────
 *
 * Chapter-level progress did not exist before this: the app knew which AREAS had
 * been practised and which had passed a topic test, but not which chapter had
 * been read. Without it "today's chapter" cannot advance, which is precisely why
 * the study row repeated.
 */

const READ_KEY = "scholify-chapters-read"

type ReadStore = Record<string, Record<string, string>> // paperId → chapterKey → dateISO

function readRead(): ReadStore {
  try {
    const raw = window.localStorage.getItem(READ_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as ReadStore
  } catch {
    /* ignore */
  }
  return {}
}

/** Mark a chapter as read (idempotent — the first completion date is kept). */
export function markChapterRead(paperId: string, key: string): void {
  try {
    const store = readRead()
    const paper = store[paperId] ?? {}
    if (!paper[key]) paper[key] = ymd(new Date())
    store[paperId] = paper
    window.localStorage.setItem(READ_KEY, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}

export function isChapterRead(paperId: string, key: string): boolean {
  return Boolean(readRead()[paperId]?.[key])
}

/** Every chapter key read on this paper, with the date it was finished. */
export function chaptersRead(paperId: string): Record<string, string> {
  return readRead()[paperId] ?? {}
}

export interface ChapterCoverage {
  read: number
  total: number
  percent: number
  /** Authored minutes still ahead of the learner, hardness-adjusted. */
  minutesLeft: number
}

export function chapterCoverage(paperId: string): ChapterCoverage {
  const chapters = chaptersForPaper(paperId)
  const done = chaptersRead(paperId)
  const read = chapters.filter((c) => done[chapterKey(c)]).length
  const minutesLeft = chapters
    .filter((c) => !done[chapterKey(c)])
    .reduce((n, c) => n + chapterMinutes(paperId, c), 0)
  return {
    read,
    total: chapters.length,
    percent: chapters.length ? Math.round((read / chapters.length) * 100) : 0,
    minutesLeft,
  }
}

/* ── Today's chapter ──────────────────────────────────────────────
 *
 * Selection order matters and mirrors the rest of the engine (see
 * acca-schedule's nextLearnArea): a learner starting from zero reads in the
 * paper's own order, because each chapter builds on the last. A RETURNER —
 * someone who arrived having already covered ground and whose diagnostic ranked
 * every area — reads in order of NEED, weakest area first, because marching them
 * from chapter 1 spends the little time they have on material they know.
 */

/** The chapter today's study block should open, or null when the paper is read out. */
export function nextChapter(paperId: string, exclude: string[] = []): StudyChapter | null {
  const chapters = chaptersForPaper(paperId)
  if (!chapters.length) return null
  const done = chaptersRead(paperId)
  const outstanding = chapters.filter((c) => {
    const key = chapterKey(c)
    return !done[key] && !exclude.includes(key)
  })
  if (!outstanding.length) return null

  const route = getLearnerBaseline()?.route ?? null
  const diagnostic = getLatestDiagnostic(paperId)
  if (route && route !== "new" && diagnostic) {
    const scoreOf = (area: string): number =>
      diagnostic.areas.find((a) => a.code === area && a.seen > 0)?.score ?? 1
    // Weakest area first, then that area's own reading order — a returner still
    // reads an area's chapters in sequence, they just reach the weak area first.
    return [...outstanding].sort(
      (a, b) => scoreOf(a.area) - scoreOf(b.area) || (a.number ?? 0) - (b.number ?? 0),
    )[0]
  }
  return [...outstanding].sort((a, b) => (a.number ?? 0) - (b.number ?? 0))[0]
}

/** The chapter to REVISE — read, but its area is still below the topic pass line. */
export function reviseChapter(paperId: string): StudyChapter | null {
  const chapters = chaptersForPaper(paperId)
  const done = chaptersRead(paperId)
  const stats = getPaperStats(paperId)
  const candidates = chapters
    .filter((c) => done[chapterKey(c)])
    .map((c) => {
      const stat = stats.areas.find((a) => a.code === c.area)
      const topic = getTopicResult(paperId, c.area)
      return { chapter: c, acc: stat && stat.seen >= 2 ? stat.accuracy : topic.best, readOn: done[chapterKey(c)] }
    })
    .filter((row) => row.acc < 0.65)
    .sort((a, b) => a.acc - b.acc)
  return candidates[0]?.chapter ?? null
}

/* ── Recommended exam date ────────────────────────────────────────
 *
 * The onboarding date field used to be blank and optional, so most learners had
 * no exam date, and with no date there is no countdown, no phase calendar and no
 * urgency — the three things that make a plan a plan.
 *
 * The recommendation is arithmetic on the paper's real content:
 *
 *   LEARN minutes   = Σ hardness-adjusted minutes of the chapters not yet read
 *                     + 5 quizzes and a practice block per chapter
 *   TOTAL minutes   = LEARN / 0.45, because Learn is 45% of the method
 *                     (METHOD_PHASES) and Strengthen/Revise/Rehearse are the
 *                     rest — you cannot pass having only read the book
 *   STUDY DAYS      = TOTAL / the learner's daily minutes
 *   CALENDAR DAYS   = STUDY DAYS × 7 / daysPerWeek, so a 4-day-a-week promise
 *                     honestly stretches the calendar instead of silently
 *                     assuming seven days
 *   AMBITION        = a 85% target buys more repetitions than a 65% one
 *
 * Then the ready date is mapped onto how the paper is actually SAT: BT/MA/FA/LW
 * are on-demand (any working day), everything else runs in ACCA's four quarterly
 * sessions, so the recommendation is the first session on or after the ready
 * date. We name the session and its month, and say plainly that the exact day
 * is fixed when booking opens — inventing a precise date for a session paper
 * would be a confident claim about ACCA's timetable we have no right to make.
 */

/** Papers sat on demand at a centre, any working day. */
const ON_DEMAND = new Set(["BT", "MA", "FA", "LW"])

/** ACCA's four exam sessions, by month index (0-based). */
const SESSION_MONTHS = [2, 5, 8, 11] // March, June, September, December
const SESSION_NAME = ["March", "June", "September", "December"]

/** Minutes of guided questions and practice a chapter earns in the Learn phase. */
const PER_CHAPTER_QUESTION_MINUTES = 5 * 1.1 + 12 * 1.1 // 5 quizzes + ~12 practice

function ambitionStretch(targetProb: number): number {
  if (targetProb >= 85) return 1.25
  if (targetProb >= 75) return 1.1
  return 1
}

/**
 * Total guided hours this paper asks for, measured from the CONTENT rather than a
 * lookup table: every chapter's hardness-adjusted reading time, plus its quizzes
 * and practice, divided by Learn's 45% share to cover strengthen/revise/rehearse.
 *
 * The onboarding guide used a hand-maintained PAPER_LOAD table for this, which
 * cannot track the content programme: a paper rebuilt from 6 chapters to 26 kept
 * quoting its old hour count, so the plan the learner was shown at onboarding was
 * measurably not the plan the app then served. Returns null when the paper's
 * content is not loaded, so the caller keeps its table as the fallback.
 */
export function paperWorkHours(paperId: string): number | null {
  const chapters = chaptersForPaper(paperId)
  if (chapters.length < 3) return null
  const minutes =
    chapters.reduce((n, c) => n + chapterMinutes(paperId, c), 0) + chapters.length * PER_CHAPTER_QUESTION_MINUTES
  return Math.round(minutes / 0.45 / 60)
}

export interface ExamDateRecommendation {
  /** yyyy-MM-dd — the date to put in the plan. */
  dateISO: string
  /** Calendar days from today. */
  days: number
  /** Whole weeks, for copy. */
  weeks: number
  /** "on-demand" — an exact bookable day; "session" — an ACCA sitting window. */
  kind: "on-demand" | "session"
  /** "September 2026 session" or "Tue 3 Nov 2026". */
  label: string
  /** Charles's one-paragraph reason, quoting the real numbers. */
  rationale: string
  /** Total study hours the plan asks for between now and then. */
  totalHours: number
  /** Chapters still to read. */
  chaptersLeft: number
}

export function recommendExamDate(paperId: string, override?: Partial<{ dailyMinutes: number; daysPerWeek: number; targetProb: number }>): ExamDateRecommendation | null {
  const paper = getPaper(paperId)
  const chapters = chaptersForPaper(paperId)
  if (!paper || !chapters.length) return null

  const plan = getPlan(paperId)
  const dailyMinutes = Math.max(10, override?.dailyMinutes ?? plan.dailyMinutes ?? 25)
  const daysPerWeek = Math.min(7, Math.max(1, override?.daysPerWeek ?? plan.daysPerWeek ?? 6))
  const targetProb = override?.targetProb ?? plan.targetProb ?? 75

  const done = chaptersRead(paperId)
  const outstanding = chapters.filter((c) => !done[chapterKey(c)])
  const chaptersLeft = outstanding.length || chapters.length

  const learnMinutes =
    (outstanding.length ? outstanding : chapters).reduce((n, c) => n + chapterMinutes(paperId, c), 0) +
    chaptersLeft * PER_CHAPTER_QUESTION_MINUTES

  const totalMinutes = Math.round((learnMinutes / 0.45) * ambitionStretch(targetProb))
  const studyDays = Math.ceil(totalMinutes / dailyMinutes)
  // A 4-day-a-week learner needs 7/4 as much calendar as study days.
  const calendarDays = Math.ceil(studyDays * (7 / daysPerWeek))

  const today = todayLocal()
  const readyDate = addDays(today, calendarDays)
  const totalHours = Math.round(totalMinutes / 60)

  if (ON_DEMAND.has(paperId)) {
    // On-demand: sit it the working day after the plan completes. Nudge a
    // weekend landing to the following Monday — centres are thin on Sundays and
    // a learner who books a Sunday is usually booking a re-sit they can't take.
    const dow = readyDate.getDay()
    const sit = dow === 0 ? addDays(readyDate, 1) : dow === 6 ? addDays(readyDate, 2) : readyDate
    const days = Math.round((sit.getTime() - today.getTime()) / 86400000)
    return {
      dateISO: ymd(sit),
      days,
      weeks: Math.round(days / 7),
      kind: "on-demand",
      label: sit.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
      totalHours,
      chaptersLeft,
      rationale: `${paperId} is on demand, so you sit it when you're ready rather than waiting for a session. ${chaptersLeft} chapters left is about ${totalHours} hours of real work across learn, strengthen, revise and rehearse — at ${dailyMinutes} min/day, ${daysPerWeek} days a week, that lands ${Math.round(days / 7)} weeks out. Book it now: a booked date is the single strongest predictor of finishing.`,
    }
  }

  // Session paper — the first sitting on or after the ready date. ACCA sits in
  // the first full week of the session month; we anchor on the Monday of it.
  let year = readyDate.getFullYear()
  let idx = SESSION_MONTHS.findIndex((m) => m > readyDate.getMonth() || (m === readyDate.getMonth() && readyDate.getDate() <= 8))
  if (idx === -1) {
    idx = 0
    year += 1
  }
  const first = new Date(year, SESSION_MONTHS[idx], 1)
  // Monday of the first full week: if the 1st is a Monday use it, else next Monday.
  const shift = (8 - first.getDay()) % 7
  const sitting = new Date(year, SESSION_MONTHS[idx], 1 + (first.getDay() === 1 ? 0 : shift))
  const days = Math.max(1, Math.round((sitting.getTime() - today.getTime()) / 86400000))
  const slackWeeks = Math.round((days - calendarDays) / 7)

  return {
    dateISO: ymd(sitting),
    days,
    weeks: Math.round(days / 7),
    kind: "session",
    label: `${SESSION_NAME[idx]} ${year} session`,
    totalHours,
    chaptersLeft,
    rationale: `${chaptersLeft} chapters of ${paperId} is about ${totalHours} hours across all four phases — at ${dailyMinutes} min/day, ${daysPerWeek} days a week, you're exam-ready in ${Math.round(calendarDays / 7)} weeks. The next ACCA sitting after that is ${SESSION_NAME[idx]} ${year}${slackWeeks > 1 ? `, which gives you ${slackWeeks} spare weeks for mocks and a second pass on your weak areas` : ` — tight, so the plan runs at full pace from today`}. ACCA sets the exact day when booking opens; I've pencilled in the Monday of the session week.`,
  }
}

/* ── The projected schedule: chapter → day → date ────────────────
 *
 * The Plan tab's operational week and the "am I on track" read both need to know
 * WHICH chapter falls on WHICH date. This projects it forward from today using
 * the same allocator the live day uses, honouring days-per-week (rest days are
 * real rows, marked, so the learner sees the promise being kept).
 */

export interface PlannedDay {
  dateISO: string
  /** Day 1, 2, 3… of the plan. */
  index: number
  dow: string
  dayOfMonth: number
  month: string
  isToday: boolean
  isRest: boolean
  phase: MethodPhaseKey
  phaseLabel: string
  /** The chapter this day reads, when the phase is Learn. */
  chapter?: { key: string; number?: number; title: string; area: string; minutes: number; hardness: ChapterHardness }
  /** Every block of the day, already sized. */
  blocks: { kind: "study" | "quiz" | "practice" | "flashcards" | "article" | "mock" | "revise" | "bank"; label: string; minutes: number }[]
  minutes: number
}

const PHASE_LABEL: Record<MethodPhaseKey, string> = {
  learn: "Learn",
  strengthen: "Strengthen",
  revise: "Revise",
  rehearse: "Rehearse",
}

/**
 * Which weekdays the learner studies, derived from daysPerWeek. Rest days are
 * placed at the END of the week (Sat/Sun first) because that is what people
 * mean by "5 days a week", and because a rest day the learner did not choose is
 * the fastest way to make a plan feel arbitrary.
 */
function restDays(daysPerWeek: number): Set<number> {
  const rest = new Set<number>()
  const order = [0, 6, 5, 4, 3, 2, 1] // Sun, Sat, Fri, …
  for (let i = 0; i < 7 - daysPerWeek; i++) rest.add(order[i])
  return rest
}

export function projectTopicPlan(paperId: string, maxDays = 42): PlannedDay[] {
  const plan = getPlan(paperId)
  const chapters = chaptersForPaper(paperId)
  if (!chapters.length) return []

  const dailyMinutes = Math.max(10, plan.dailyMinutes || 25)
  const daysPerWeek = Math.min(7, Math.max(1, plan.daysPerWeek || 6))
  const rest = restDays(daysPerWeek)
  const done = chaptersRead(paperId)
  const queue = chapters
    .filter((c) => !done[chapterKey(c)])
    .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))

  // Phase boundaries in STUDY days, from the recommendation's arithmetic.
  const rec = recommendExamDate(paperId)
  const horizon = rec ? Math.min(maxDays, rec.days) : maxDays
  const learnEnd = Math.max(1, Math.round(horizon * 0.45))
  const strengthenEnd = learnEnd + Math.max(1, Math.round(horizon * 0.25))
  const reviseEnd = strengthenEnd + Math.max(1, Math.round(horizon * 0.15))

  const out: PlannedDay[] = []
  const start = todayLocal()
  let cursor = 0

  for (let i = 0; i < horizon && out.length < maxDays; i++) {
    const date = addDays(start, i)
    const isRest = rest.has(date.getDay())
    const phase: MethodPhaseKey = i < learnEnd ? "learn" : i < strengthenEnd ? "strengthen" : i < reviseEnd ? "revise" : "rehearse"

    const row: PlannedDay = {
      dateISO: ymd(date),
      index: i + 1,
      dow: date.toLocaleDateString("en-GB", { weekday: "short" }),
      dayOfMonth: date.getDate(),
      month: date.toLocaleDateString("en-GB", { month: "short" }),
      isToday: i === 0,
      isRest,
      phase,
      phaseLabel: PHASE_LABEL[phase],
      blocks: [],
      minutes: 0,
    }

    if (isRest) {
      out.push(row)
      continue
    }

    if (phase === "learn" || phase === "strengthen") {
      const chapter = queue[cursor]
      if (chapter) {
        const hardness = chapterHardness(chapter)
        const studyMin = chapterMinutes(paperId, chapter)
        row.chapter = {
          key: chapterKey(chapter),
          number: chapter.number,
          title: chapter.title,
          area: chapter.area,
          minutes: studyMin,
          hardness,
        }
        row.blocks.push({ kind: "study", label: `${chapter.title}`, minutes: studyMin })
        cursor += 1
      }
      row.blocks.push({ kind: "quiz", label: "5 quizzes on the chapter", minutes: 6 })
      const spent = row.blocks.reduce((n, b) => n + b.minutes, 0)
      const practiceMin = Math.max(11, Math.min(17, dailyMinutes - spent - 6))
      row.blocks.push({ kind: "practice", label: `${Math.round(practiceMin / 1.1)} practice questions`, minutes: practiceMin })
      row.blocks.push({ kind: "flashcards", label: "Flashcards", minutes: 5 })
      if (dailyMinutes >= 75) row.blocks.push({ kind: "article", label: "Technical article", minutes: 8 })
    } else if (phase === "revise") {
      row.blocks.push({ kind: "revise", label: "Second pass on your weakest area", minutes: Math.round(dailyMinutes * 0.4) })
      row.blocks.push({ kind: "flashcards", label: "Flashcards to zero-due", minutes: Math.round(dailyMinutes * 0.3) })
      row.blocks.push({ kind: "bank", label: "Mixed bank run", minutes: Math.round(dailyMinutes * 0.3) })
    } else {
      row.blocks.push({ kind: "mock", label: "Timed mock", minutes: Math.max(45, Math.round(dailyMinutes * 0.6)) })
      row.blocks.push({ kind: "revise", label: "Debrief every wrong answer", minutes: Math.round(dailyMinutes * 0.4) })
    }

    row.minutes = row.blocks.reduce((n, b) => n + b.minutes, 0)
    out.push(row)
  }

  return out
}

/* ── Exam readiness projection ────────────────────────────────────
 *
 * "Calculate their exam readiness score based on daily practising from whole
 * paper knowledge, capacity and hardness." The live score is measured
 * (acca-loop's passProbability); what was missing is the PROJECTION — where the
 * current rate of work puts the learner on exam day, which is the number that
 * tells them whether the plan is working.
 *
 * Modelled as: readiness rises with COVERAGE of the paper (chapters read,
 * questions answered across areas) weighted by the hardness of what is left, and
 * with ACCURACY on what has been covered. Both are already measured, so the
 * projection is an extrapolation of the learner's own numbers, not a guess.
 */

export interface ReadinessProjection {
  /** Measured now, 0–100 — null while the evidence is too thin to quote. */
  now: number | null
  /** Where today's rate of work lands by the exam date. */
  projected: number
  /** The learner's own target. */
  target: number
  /** True when the projection reaches the target. */
  onTrack: boolean
  /** Extra minutes/day needed to reach target, 0 when already on track. */
  extraMinutesPerDay: number
  /** One honest sentence. */
  verdict: string
}

export function projectReadiness(paperId: string): ReadinessProjection | null {
  const paper = getPaper(paperId)
  if (!paper) return null
  const plan = getPlan(paperId)
  const target = plan.targetProb ?? 75
  const stats = getPaperStats(paperId)
  const coverage = chapterCoverage(paperId)
  const rec = recommendExamDate(paperId)
  const bank = paperContent(paperId).questions.length

  // Days available: the learner's own exam date if set, else the recommendation.
  let days: number | null = null
  if (plan.examDate) {
    const exam = new Date(`${plan.examDate}T00:00:00`)
    if (!Number.isNaN(exam.getTime())) days = Math.max(0, Math.round((exam.getTime() - todayLocal().getTime()) / 86400000))
  }
  if (days === null) days = rec?.days ?? null
  if (days === null) return null

  const dailyMinutes = Math.max(10, plan.dailyMinutes || 25)
  const daysPerWeek = Math.min(7, Math.max(1, plan.daysPerWeek || 6))
  const minutesAvailable = days * (daysPerWeek / 7) * dailyMinutes

  // What the remaining work COSTS: unread chapters (hardness-adjusted) plus a
  // sensible number of practice questions per unread chapter, plus the
  // strengthen/revise/rehearse tail.
  const minutesNeeded = (coverage.minutesLeft + coverage.total * PER_CHAPTER_QUESTION_MINUTES) / 0.45
  const capacity = minutesNeeded > 0 ? Math.min(1.35, minutesAvailable / minutesNeeded) : 1.35

  // Accuracy on what has been covered — the quality half of the score.
  const accuracy = stats.answered >= 12 ? stats.accuracy : 0.5
  const seenShare = bank > 0 ? Math.min(1, stats.answered / Math.max(30, bank * 0.35)) : 0

  // Projection: where coverage × accuracy lands if the current rate holds.
  const projectedCoverage = Math.min(1, (coverage.read + capacity * (coverage.total - coverage.read)) / Math.max(1, coverage.total))
  const projectedAccuracy = Math.min(0.95, accuracy + (1 - accuracy) * 0.45 * Math.min(1, capacity))
  const projected = Math.round(Math.min(96, 100 * (0.42 * projectedCoverage + 0.44 * projectedAccuracy + 0.14 * Math.max(seenShare, Math.min(1, capacity)))))

  const now = stats.answered >= 12 ? Math.round(stats.readiness) : null
  const onTrack = projected >= target
  const shortfall = Math.max(0, target - projected)
  const extraMinutesPerDay = onTrack
    ? 0
    : Math.ceil(((minutesNeeded * (1 + shortfall / 100) - minutesAvailable) / Math.max(1, days * (daysPerWeek / 7))) / 5) * 5

  const verdict = onTrack
    ? `At ${dailyMinutes} min/day, ${daysPerWeek} days a week, you land around ${projected}% — above your ${target}% target with ${days} days to work with.`
    : extraMinutesPerDay > 0
      ? `Today's pace projects to ${projected}% against a ${target}% target. About ${extraMinutesPerDay} more minutes a day closes it — or move the exam date back one session and the same pace gets you there.`
      : `Today's pace projects to ${projected}% against a ${target}% target. The gap is accuracy, not time: the strengthen phase is where it closes.`

  return { now, projected, target, onTrack, extraMinutesPerDay, verdict }
}
