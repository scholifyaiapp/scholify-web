/*
 * Scholify — vocabulary deck + spaced-repetition (SRS) engine.
 *
 * This is the heart of the language-learning product: every word carries its
 * own memory state and is resurfaced right before the learner would forget it.
 * A daily session = a few NEW words + every REVIEW that's due today.
 *
 * Design notes:
 *  - localStorage-first (matches scholify-data.ts). No backend dependency.
 *  - Language-agnostic: a deck has a target language + a native language, so the
 *    same engine teaches Italian→English or Korean→Russian. Launch positioning
 *    is focused, but the engine is not.
 *  - SRS is a pragmatic SM-2 variant with an Anki-style 4-grade input
 *    (again / hard / good / easy). Dates are compared by calendar day.
 */

import { addDays, differenceInCalendarDays, format } from "date-fns"

/* ── Types ───────────────────────────────────────────────────── */

export type WordStatus = "new" | "learning" | "review" | "mastered"

/** Learner's self-assessed recall on a review. */
export type ReviewGrade = "again" | "hard" | "good" | "easy"

export interface VocabWord {
  id: string
  /** The word/phrase in the target language. */
  term: string
  /** Its meaning in the learner's native language. */
  translation: string
  /** Example sentence in the target language (optional). */
  example?: string
  /** Translation of the example (optional). */
  exampleTranslation?: string
  theme?: string
  partOfSpeech?: string

  /* ── SRS memory state ── */
  status: WordStatus
  /** SM-2 ease factor (min 1.3). Higher = the word is "easy" for this learner. */
  ease: number
  /** Current spacing in days until the next review. */
  intervalDays: number
  /** Consecutive successful reviews. */
  reps: number
  /** Times the word was forgotten (graded "again"). */
  lapses: number
  /** yyyy-MM-dd the word is next due. */
  dueDate: string
  addedAt: string
  lastReviewedAt?: string
  /** yyyy-MM-dd (local) the word was first studied — counts against that day's new-word quota. */
  introducedOn?: string
}

export interface VocabDeck {
  id: string
  /** ISO 639-1 code, e.g. "it". */
  targetLanguage: string
  /** Human label, e.g. "Italian". */
  targetLanguageLabel: string
  /** Native language code for explanations, e.g. "en". */
  nativeLanguage: string
  goal?: string
  deadline?: string | null
  /** CEFR level the learner is studying at (A1–C2). */
  level?: string
  /** How many brand-new words to introduce per day. */
  dailyNewWords: number
  words: VocabWord[]
  createdAt: string
}

export interface DeckStats {
  total: number
  newCount: number
  learning: number
  review: number
  mastered: number
  dueToday: number
}

export interface TodaySession {
  /** Brand-new words to introduce today (capped at dailyNewWords). */
  newWords: VocabWord[]
  /** Previously-seen words whose review is due today or overdue. */
  dueWords: VocabWord[]
}

/* ── Constants ───────────────────────────────────────────────── */

const KEY_DECK = "scholify-vocab-deck"
const DEFAULT_EASE = 2.5
const MIN_EASE = 1.3
/** A word is considered "mastered" once its interval reaches this many days. */
const MASTERED_INTERVAL = 21

/* ── Helpers ─────────────────────────────────────────────────── */

function genId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
  } catch {
    /* ignore */
  }
  return `w-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function todayStr(): string {
  return format(new Date(), "yyyy-MM-dd")
}

/** True when the word is due for review on or before `onDate` (default today). */
export function isDue(word: VocabWord, onDate: string = todayStr()): boolean {
  if (word.status === "new") return false
  // new Date("garbage") yields Invalid Date (no throw) — NaN means "treat as due".
  const d = differenceInCalendarDays(new Date(word.dueDate), new Date(onDate))
  if (Number.isNaN(d)) return true
  return d <= 0
}

/* ── Word creation ───────────────────────────────────────────── */

export interface NewWordInput {
  term: string
  translation: string
  example?: string
  exampleTranslation?: string
  theme?: string
  partOfSpeech?: string
}

/** Build a fresh, unseen word with default SRS state (due today as "new"). */
export function makeWord(input: NewWordInput): VocabWord {
  const now = new Date().toISOString()
  return {
    id: genId(),
    term: input.term.trim(),
    translation: input.translation.trim(),
    example: input.example?.trim() || undefined,
    exampleTranslation: input.exampleTranslation?.trim() || undefined,
    theme: input.theme,
    partOfSpeech: input.partOfSpeech,
    status: "new",
    ease: DEFAULT_EASE,
    intervalDays: 0,
    reps: 0,
    lapses: 0,
    dueDate: format(new Date(), "yyyy-MM-dd"),
    addedAt: now,
  }
}

/* ── SRS scheduling ──────────────────────────────────────────── */

/**
 * Apply a review grade to a word and return the updated copy (pure — does not
 * persist). SM-2 variant:
 *  - "again": forgot it → reset reps, see it again tomorrow, ease drops.
 *  - "hard":  recalled with effort → small interval bump, ease drops a little.
 *  - "good":  recalled → standard SM-2 growth (1d → 3d → interval*ease).
 *  - "easy":  trivial → larger growth + ease bump.
 */
export function reviewWord(word: VocabWord, grade: ReviewGrade): VocabWord {
  const introducedOn = word.status === "new" ? word.introducedOn ?? todayStr() : word.introducedOn
  let { ease, intervalDays, reps, lapses } = word

  if (grade === "again") {
    reps = 0
    lapses += 1
    ease = Math.max(MIN_EASE, ease - 0.2)
    intervalDays = 1
  } else if (grade === "hard") {
    ease = Math.max(MIN_EASE, ease - 0.15)
    intervalDays = reps === 0 ? 1 : Math.max(1, Math.round(intervalDays * 1.2))
    reps += 1
  } else if (grade === "good") {
    if (reps === 0) intervalDays = 1
    else if (reps === 1) intervalDays = 3
    else intervalDays = Math.max(1, Math.round(intervalDays * ease))
    reps += 1
  } else {
    // easy
    ease = ease + 0.15
    if (reps === 0) intervalDays = 2
    else intervalDays = Math.max(1, Math.round(intervalDays * ease * 1.3))
    reps += 1
  }

  const status: WordStatus =
    grade === "again"
      ? "learning"
      : intervalDays >= MASTERED_INTERVAL
        ? "mastered"
        : "review"

  return {
    ...word,
    ease,
    intervalDays,
    reps,
    lapses,
    status,
    introducedOn,
    dueDate: format(addDays(new Date(), intervalDays), "yyyy-MM-dd"),
    lastReviewedAt: new Date().toISOString(),
  }
}

/* ── Session selection ───────────────────────────────────────── */

/** New words first studied today — what's already been used of today's quota. */
export function introducedToday(deck: VocabDeck, onDate: string = todayStr()): number {
  return deck.words.filter((w) => w.introducedOn === onDate).length
}

/** How many new words may still be introduced today (exact daily quota). */
export function remainingNewQuota(deck: VocabDeck): number {
  return Math.max(0, deck.dailyNewWords - introducedToday(deck))
}

/**
 * New words still waiting to be introduced, capped at what's left of TODAY's
 * quota — a second session on the same day never overshoots the daily goal.
 */
export function getNewWords(deck: VocabDeck, limit: number = remainingNewQuota(deck)): VocabWord[] {
  return deck.words.filter((w) => w.status === "new").slice(0, Math.max(0, limit))
}

/** Update the learner's daily new-word goal (5/10/15/custom) and persist. */
export function setDailyGoal(deck: VocabDeck, n: number): VocabDeck {
  const next: VocabDeck = { ...deck, dailyNewWords: Math.max(1, Math.min(50, Math.round(n) || 1)) }
  writeDeck(next)
  return next
}

/** Words whose review is due today (or overdue), soonest first. */
export function getDueWords(deck: VocabDeck, onDate: string = todayStr()): VocabWord[] {
  return deck.words
    .filter((w) => w.status !== "new" && isDue(w, onDate))
    .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""))
}

/** Everything the learner should do today: new words + due reviews. */
export function getTodaySession(deck: VocabDeck): TodaySession {
  return {
    newWords: getNewWords(deck),
    dueWords: getDueWords(deck),
  }
}

/** The words giving the learner the most trouble (lapses / still learning). */
export function getHardWords(deck: VocabDeck, limit = 10): VocabWord[] {
  return deck.words
    .filter((w) => w.status !== "new" && (w.lapses > 0 || w.status === "learning"))
    .sort((a, b) => b.lapses - a.lapses || a.ease - b.ease)
    .slice(0, limit)
}

export function getDeckStats(deck: VocabDeck): DeckStats {
  const today = todayStr()
  let newCount = 0
  let learning = 0
  let review = 0
  let mastered = 0
  let dueToday = 0
  for (const w of deck.words) {
    if (w.status === "new") newCount += 1
    else if (w.status === "learning") learning += 1
    else if (w.status === "mastered") mastered += 1
    else review += 1
    if (w.status !== "new" && isDue(w, today)) dueToday += 1
  }
  return { total: deck.words.length, newCount, learning, review, mastered, dueToday }
}

/* ── Deck construction + persistence (localStorage-first) ─────── */

export interface CreateDeckInput {
  targetLanguage: string
  targetLanguageLabel: string
  nativeLanguage: string
  goal?: string
  deadline?: string | null
  level?: string
  dailyNewWords?: number
  words?: NewWordInput[]
}

export function createDeck(input: CreateDeckInput): VocabDeck {
  return {
    id: genId(),
    targetLanguage: input.targetLanguage,
    targetLanguageLabel: input.targetLanguageLabel,
    nativeLanguage: input.nativeLanguage,
    goal: input.goal,
    deadline: input.deadline ?? null,
    level: input.level,
    dailyNewWords: Math.max(1, input.dailyNewWords ?? 8),
    words: (input.words ?? []).map(makeWord),
    createdAt: new Date().toISOString(),
  }
}

export function readDeck(): VocabDeck | null {
  try {
    const raw = window.localStorage.getItem(KEY_DECK)
    if (!raw) return null
    const parsed = JSON.parse(raw) as VocabDeck
    if (!parsed || !Array.isArray(parsed.words)) return null
    // Normalize: corrupted/legacy data must never break the SRS math.
    const statuses: WordStatus[] = ["new", "learning", "review", "mastered"]
    return {
      ...parsed,
      dailyNewWords: Math.max(1, Math.min(50, Number(parsed.dailyNewWords) || 8)),
      words: parsed.words.map((w) => ({
        ...w,
        dueDate: typeof w.dueDate === "string" && w.dueDate ? w.dueDate : todayStr(),
        status: statuses.includes(w.status) ? w.status : "new",
      })),
    }
  } catch {
    return null
  }
}

export function writeDeck(deck: VocabDeck): void {
  try {
    window.localStorage.setItem(KEY_DECK, JSON.stringify(deck))
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export function clearDeck(): void {
  try {
    window.localStorage.removeItem(KEY_DECK)
  } catch {
    /* ignore */
  }
}

/** Append new words to the active deck (de-duplicated by term) and persist. */
export function addWordsToDeck(deck: VocabDeck, words: NewWordInput[]): VocabDeck {
  const existing = new Set(deck.words.map((w) => w.term.trim().toLowerCase()))
  const fresh = words
    .filter((w) => w.term && !existing.has(w.term.trim().toLowerCase()))
    .map(makeWord)
  const next: VocabDeck = { ...deck, words: [...deck.words, ...fresh] }
  writeDeck(next)
  return next
}

/** Grade a word in the active deck and persist the new SRS state. */
export function gradeWordInDeck(deck: VocabDeck, wordId: string, grade: ReviewGrade): VocabDeck {
  const next: VocabDeck = {
    ...deck,
    words: deck.words.map((w) => (w.id === wordId ? reviewWord(w, grade) : w)),
  }
  writeDeck(next)
  return next
}

/* ── Daily streak / progress ─────────────────────────────────── */

const KEY_PROGRESS = "scholify-vocab-progress"

export interface VocabProgress {
  streak: number
  longestStreak: number
  lastSessionDate: string | null
  sessionsCompleted: number
  wordsReviewed: number
  /** Lifetime XP earned across sessions + games. */
  totalXp: number
  /** XP earned in the current ISO week (for the weekly leaderboard). */
  weeklyXp?: number
  /** yyyy-MM-dd (Monday) the weeklyXp counter belongs to. */
  weekStart?: string
  /** yyyy-MM-dd of each day a session was completed (last ~120, for the heatmap). */
  history: string[]
}

const EMPTY_PROGRESS: VocabProgress = {
  streak: 0,
  longestStreak: 0,
  lastSessionDate: null,
  sessionsCompleted: 0,
  wordsReviewed: 0,
  totalXp: 0,
  weeklyXp: 0,
  weekStart: "",
  history: [],
}

/** yyyy-MM-dd of the current week's Monday (local). */
export function weekStartStr(): string {
  const d = new Date()
  const dow = (d.getDay() + 6) % 7 // Monday = 0
  return format(addDays(d, -dow), "yyyy-MM-dd")
}

/** Roll the weekly XP counter forward, resetting it when a new week starts. */
function rollWeekly(prev: VocabProgress, xp: number): { weeklyXp: number; weekStart: string } {
  const ws = weekStartStr()
  const base = prev.weekStart === ws ? prev.weeklyXp ?? 0 : 0
  return { weeklyXp: base + Math.max(0, xp), weekStart: ws }
}

/** XP earned so far this week (0 once the week rolls over). */
export function currentWeeklyXp(p: VocabProgress = readVocabProgress()): number {
  return p.weekStart === weekStartStr() ? p.weeklyXp ?? 0 : 0
}

export function readVocabProgress(): VocabProgress {
  try {
    const raw = window.localStorage.getItem(KEY_PROGRESS)
    if (raw) return { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as Partial<VocabProgress>) }
  } catch {
    /* ignore */
  }
  return { ...EMPTY_PROGRESS }
}

/** Has today's session already been completed? */
export function isSessionDoneToday(p: VocabProgress = readVocabProgress()): boolean {
  return p.lastSessionDate === todayStr()
}

/**
 * Record a completed session. Extends the streak on consecutive days, resets it
 * after a gap, and is idempotent within the same day (only counts once).
 */
export function recordSession(wordsReviewed: number, xp = 0): VocabProgress {
  const prev = readVocabProgress()
  const today = todayStr()
  const history = prev.history.includes(today)
    ? prev.history
    : [...prev.history, today].slice(-120)

  if (prev.lastSessionDate === today) {
    const same: VocabProgress = {
      ...prev,
      history,
      wordsReviewed: prev.wordsReviewed + wordsReviewed,
      totalXp: prev.totalXp + xp,
      ...rollWeekly(prev, xp),
    }
    persistProgress(same)
    return same
  }

  let streak = 1
  if (prev.lastSessionDate) {
    const gap = differenceInCalendarDays(new Date(today), new Date(prev.lastSessionDate))
    // gap <= 0 = clock change / timezone travel — never punish with a reset.
    streak = gap === 1 ? prev.streak + 1 : gap <= 0 ? prev.streak : 1
  }
  const next: VocabProgress = {
    streak,
    longestStreak: Math.max(streak, prev.longestStreak),
    lastSessionDate: today,
    sessionsCompleted: prev.sessionsCompleted + 1,
    wordsReviewed: prev.wordsReviewed + wordsReviewed,
    totalXp: prev.totalXp + xp,
    ...rollWeekly(prev, xp),
    history,
  }
  persistProgress(next)
  return next
}

/** Award XP outside a full session (e.g. a quick game). */
export function awardXp(xp: number): void {
  const prev = readVocabProgress()
  persistProgress({ ...prev, totalXp: prev.totalXp + Math.max(0, xp), ...rollWeekly(prev, xp) })
}

function persistProgress(p: VocabProgress): void {
  try {
    window.localStorage.setItem(KEY_PROGRESS, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

/* ── Weekly report cadence ───────────────────────────────────── */

const KEY_REPORT = "scholify-vocab-last-report"

/** Show Lara's weekly report once a week, after there's enough to report. */
export function isWeeklyReportDue(p: VocabProgress = readVocabProgress()): boolean {
  if (p.sessionsCompleted < 3) return false
  try {
    const last = window.localStorage.getItem(KEY_REPORT)
    if (!last) return true
    return differenceInCalendarDays(new Date(todayStr()), new Date(last)) >= 7
  } catch {
    return false
  }
}

export function markWeeklyReportSeen(): void {
  try {
    window.localStorage.setItem(KEY_REPORT, todayStr())
  } catch {
    /* ignore */
  }
}

/** Whole days left until the deck deadline (null when none / passed). */
export function daysUntilDeadline(deck: VocabDeck): number | null {
  if (!deck.deadline) return null
  try {
    const d = new Date(deck.deadline)
    if (Number.isNaN(d.getTime())) return null
    return Math.max(0, differenceInCalendarDays(d, new Date()))
  } catch {
    return null
  }
}
