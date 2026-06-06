import type { NewWordInput } from "@/lib/vocab"
import { getSeedWords } from "@/lib/vocab-content"

/*
 * Vocabulary word generator.
 *
 * Tries the AI endpoint (/api/lara?action=vocab) and falls back to the offline
 * seed bank when there's no API key, the call fails, or it returns nothing — so
 * the product always has content, even in demo mode.
 */

const API_BASE = import.meta.env.VITE_API_URL || ""

export interface GenerateVocabParams {
  target: string
  targetLabel: string
  native: string
  nativeLabel?: string
  goal?: string
  theme?: string
  level?: string
  count?: number
  /** Terms the learner already has — don't repeat them. */
  exclude?: string[]
}

interface RawWord {
  term?: unknown
  translation?: unknown
  example?: unknown
  exampleTranslation?: unknown
  theme?: unknown
}

export async function generateVocab(params: GenerateVocabParams): Promise<NewWordInput[]> {
  const count = params.count ?? 12
  const exclude = new Set((params.exclude ?? []).map((t) => t.trim().toLowerCase()))

  try {
    const res = await fetch(`${API_BASE}/api/lara?action=vocab`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...params, count }),
    })
    if (res.ok) {
      const data = (await res.json()) as { words?: RawWord[] }
      const cleaned = (Array.isArray(data.words) ? data.words : [])
        .filter((w) => w && w.term && w.translation)
        .map(
          (w): NewWordInput => ({
            term: String(w.term),
            translation: String(w.translation),
            example: w.example ? String(w.example) : undefined,
            exampleTranslation: w.exampleTranslation ? String(w.exampleTranslation) : undefined,
            theme: w.theme ? String(w.theme) : undefined,
          }),
        )
        .filter((w) => !exclude.has(w.term.trim().toLowerCase()))
      if (cleaned.length > 0) return cleaned.slice(0, count)
    }
  } catch {
    /* fall through to the seed bank */
  }

  // Offline / no-key fallback.
  return getSeedWords(params.target, params.native, count + exclude.size)
    .filter((w) => !exclude.has(w.term.trim().toLowerCase()))
    .slice(0, count)
}
