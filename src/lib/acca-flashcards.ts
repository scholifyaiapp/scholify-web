/*
 * Scholify — ACCA flashcards + a lightweight spaced-repetition layer.
 *
 * Key facts, definitions and standards that reward memorisation (exactly what
 * SRS is for). Cards are original and syllabus-aligned. Scheduling is a simple
 * Leitner-style box system persisted in localStorage — separate from the
 * question-practice progress so the two never interfere.
 */

export interface Flashcard {
  id: string
  paper: string
  area: string
  front: string
  back: string
}

import { paperContent } from "@/lib/acca-content-registry"
// Fills the registry eagerly under Node (tsx scripts + vitest); a no-op in the browser.
import "@/lib/acca-content-boot"

/*
 * The cards live in per-paper chunks now (see acca-content-registry.ts) — a
 * student downloads their own paper's deck, not all fifteen. This getter stays
 * synchronous and reads whatever the loader has registered; a paper that has not
 * been loaded has no cards yet, which every flashcard surface waits out via
 * usePaperContent() rather than rendering an empty deck.
 */
export function getFlashcards(paperId: string): Flashcard[] {
  return paperContent(paperId).flashcards
}

/* ── Leitner scheduling (localStorage) ────────────────────────── */

const KEY = "scholify-acca-flashcards"
/**
 * Days until a card in each box is due again. Box 0 is the RELEARNING box — due
 * again the same day, which is what makes a lapse cost something. Boxes 1–5 are
 * the Leitner ladder; box ≥ 4 counts as mastered (flashcardStats).
 */
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35]

interface CardState {
  box: number
  due: string // yyyy-MM-dd
}

type Store = Record<string, CardState>

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function addDaysStr(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      // Type-check field-wise: a wrong-typed row must degrade to "new card",
      // never poison the box arithmetic or throw on a read.
      const out: Store = {}
      for (const [id, st] of Object.entries(parsed as Record<string, unknown>)) {
        if (!st || typeof st !== "object" || Array.isArray(st)) continue
        const { box, due } = st as { box?: unknown; due?: unknown }
        const b = typeof box === "number" && Number.isFinite(box) ? Math.max(0, Math.min(BOX_INTERVAL_DAYS.length - 1, Math.round(box))) : 0
        out[id] = { box: b, due: typeof due === "string" ? due : todayStr() }
      }
      return out
    }
  } catch {
    /* ignore */
  }
  return {}
}

function write(s: Store): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

/** Cards due for review today for a paper (new cards count as due). */
export function getDueFlashcards(paperId: string): Flashcard[] {
  const store = read()
  const today = todayStr()
  return getFlashcards(paperId).filter((c) => {
    const st = store[c.id]
    if (!st) return true
    return st.due <= today
  })
}

/** The state a card landed in after grading — `relearn` means it's due again today. */
export interface CardReview {
  box: number
  due: string
  /** True when the card must come back in THIS session (a lapse). */
  relearn: boolean
}

/**
 * Grade a card: known → advance a box; unknown → the relearning box, due again
 * TODAY. A miss used to send a brand-new card to box 1 / tomorrow — byte-identical
 * to a hit, so "Know" and "Don't know" did the same thing and a lapsed card never
 * came back in the session. Failing must cost the interval and repeat the card.
 */
export function reviewFlashcard(cardId: string, known: boolean): CardReview {
  const store = read()
  const prevBox = store[cardId]?.box ?? 0
  const box = known ? Math.min(BOX_INTERVAL_DAYS.length - 1, prevBox + 1) : 0
  const state: CardState = { box, due: addDaysStr(BOX_INTERVAL_DAYS[box]) }
  store[cardId] = state
  write(store)
  return { ...state, relearn: box === 0 }
}

export function flashcardStats(paperId: string): { total: number; due: number; mastered: number } {
  const store = read()
  const cards = getFlashcards(paperId)
  let mastered = 0
  for (const c of cards) if ((store[c.id]?.box ?? 0) >= 4) mastered += 1
  return { total: cards.length, due: getDueFlashcards(paperId).length, mastered }
}

/** Have any flashcards in this paper's syllabus area been reviewed at least once?
 *  Powers the "studied A·B·C" diagnostic gate for brand-new learners. */
export function areaReviewed(paperId: string, area: string): boolean {
  const store = read()
  return getFlashcards(paperId).some((c) => c.area === area && store[c.id] !== undefined)
}

/** Count of areas in this paper that have at least one reviewed card. */
export function reviewedAreaCount(paperId: string): number {
  const store = read()
  const seen = new Set<string>()
  for (const c of getFlashcards(paperId)) if (store[c.id] !== undefined) seen.add(c.area)
  return seen.size
}
