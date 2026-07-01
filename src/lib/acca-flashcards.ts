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

export const FLASHCARDS: Flashcard[] = [
  /* FA */
  { id: "FA-FC-1", paper: "FA", area: "A", front: "The accounting equation", back: "Assets = Capital + Liabilities. (Rearranged: Capital = Assets − Liabilities.)" },
  { id: "FA-FC-2", paper: "FA", area: "B", front: "The two FUNDAMENTAL qualitative characteristics", back: "Relevance and faithful representation." },
  { id: "FA-FC-3", paper: "FA", area: "B", front: "The four ENHANCING qualitative characteristics", back: "Comparability, verifiability, timeliness, understandability." },
  { id: "FA-FC-4", paper: "FA", area: "C", front: "The golden rule of double entry", back: "Every transaction has an equal debit and credit. Debits: increase assets & expenses. Credits: increase liabilities, capital & income." },
  { id: "FA-FC-5", paper: "FA", area: "D", front: "Straight-line depreciation formula", back: "(Cost − Residual value) ÷ Useful life." },
  { id: "FA-FC-6", paper: "FA", area: "D", front: "IAS 2 inventory measurement", back: "Lower of cost and net realisable value (NRV)." },
  { id: "FA-FC-7", paper: "FA", area: "H", front: "Current ratio", back: "Current assets ÷ Current liabilities. Measures short-term liquidity." },
  { id: "FA-FC-8", paper: "FA", area: "H", front: "Gross profit margin", back: "(Gross profit ÷ Revenue) × 100%." },

  /* FR */
  { id: "FR-FC-1", paper: "FR", area: "A", front: "Who issues IFRS Accounting Standards?", back: "The IASB (International Accounting Standards Board)." },
  { id: "FR-FC-2", paper: "FR", area: "B", front: "IFRS 15 — the five steps", back: "1) Identify the contract 2) Identify performance obligations 3) Determine the transaction price 4) Allocate the price 5) Recognise revenue as obligations are satisfied." },
  { id: "FR-FC-3", paper: "FR", area: "B", front: "IAS 37 — three provision criteria", back: "Present obligation from a past event; probable outflow of resources; a reliable estimate can be made." },
  { id: "FR-FC-4", paper: "FR", area: "B", front: "IAS 16 — the two measurement models", back: "Cost model (cost less accumulated depreciation & impairment) and revaluation model (fair value less subsequent depreciation & impairment)." },
  { id: "FR-FC-5", paper: "FR", area: "E", front: "Goodwill on acquisition formula", back: "Consideration transferred + NCI at acquisition − fair value of identifiable net assets acquired." },
  { id: "FR-FC-6", paper: "FR", area: "B", front: "Net realisable value (NRV)", back: "Estimated selling price − costs to complete − costs to sell." },
]

export function getFlashcards(paperId: string): Flashcard[] {
  return FLASHCARDS.filter((c) => c.paper === paperId)
}

/* ── Leitner scheduling (localStorage) ────────────────────────── */

const KEY = "scholify-acca-flashcards"
/** Days until a card in each box is due again. */
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
    if (raw) return JSON.parse(raw) as Store
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

/** Grade a card: known → advance a box; unknown → back to box 1. Persists. */
export function reviewFlashcard(cardId: string, known: boolean): void {
  const store = read()
  const prev = store[cardId] ?? { box: 0, due: todayStr() }
  const box = known ? Math.min(BOX_INTERVAL_DAYS.length - 1, prev.box + 1) : 1
  store[cardId] = { box, due: addDaysStr(BOX_INTERVAL_DAYS[box]) }
  write(store)
}

export function flashcardStats(paperId: string): { total: number; due: number; mastered: number } {
  const store = read()
  const cards = getFlashcards(paperId)
  let mastered = 0
  for (const c of cards) if ((store[c.id]?.box ?? 0) >= 4) mastered += 1
  return { total: cards.length, due: getDueFlashcards(paperId).length, mastered }
}
