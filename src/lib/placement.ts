/*
 * Placement test — a ~90-second CEFR level check.
 *
 * Asks the AI (/api/lara?action=placement) for a 12-item, level-graded
 * recognition test (2 words per CEFR band). The learner picks the meaning or
 * taps "I don't know"; estimateLevel walks the bands and reports the highest
 * one the learner reliably knows. With no API key the request returns [] and
 * the onboarding falls back to manual level selection.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const
export type CefrLevel = (typeof CEFR_LEVELS)[number]

export interface PlacementItem {
  term: string
  translation: string
  level: CefrLevel
  /** Correct answer + 3 distractors, pre-shuffled. */
  options: string[]
}

interface RawItem {
  term?: unknown
  translation?: unknown
  level?: unknown
  distractors?: unknown
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function normLevel(v: unknown): CefrLevel | null {
  const s = String(v || "").toUpperCase().trim()
  return (CEFR_LEVELS as readonly string[]).includes(s) ? (s as CefrLevel) : null
}

/**
 * Fetch a graded placement test. Returns [] when the AI is unavailable so the
 * caller can fall back to manual level selection.
 */
export async function buildPlacementTest(params: {
  target: string
  targetLabel: string
  native: string
  nativeLabel: string
}): Promise<PlacementItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=placement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    if (!res.ok) return []
    const data = (await res.json()) as { items?: RawItem[] }
    const raw = Array.isArray(data.items) ? data.items : []
    const items: PlacementItem[] = []
    for (const r of raw) {
      const level = normLevel(r.level)
      const term = String(r.term || "").trim()
      const translation = String(r.translation || "").trim()
      const distractors = Array.isArray(r.distractors)
        ? (r.distractors as unknown[]).map(String).filter(Boolean).slice(0, 3)
        : []
      if (!level || !term || !translation || distractors.length < 2) continue
      items.push({ term, translation, level, options: shuffle([translation, ...distractors]) })
    }
    // Order easiest → hardest so the test ramps up.
    items.sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level))
    return items
  } catch {
    return []
  }
}

/**
 * Estimate CEFR level from answers. Walks the bands from A1 up and keeps
 * promoting while the learner gets ≥50% of that band right; stops at the first
 * band they fail. Defaults to A1 when nothing is known.
 */
export function estimateLevel(answers: { level: CefrLevel; correct: boolean }[]): CefrLevel {
  const byLevel = new Map<CefrLevel, { correct: number; total: number }>()
  for (const a of answers) {
    const e = byLevel.get(a.level) ?? { correct: 0, total: 0 }
    e.total += 1
    if (a.correct) e.correct += 1
    byLevel.set(a.level, e)
  }
  let estimated: CefrLevel = "A1"
  for (const level of CEFR_LEVELS) {
    const e = byLevel.get(level)
    if (!e || e.total === 0) continue
    if (e.correct / e.total >= 0.5) estimated = level
    else break
  }
  return estimated
}
