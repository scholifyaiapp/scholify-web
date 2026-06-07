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

/** Fetch readable text from a URL via the server (avoids browser CORS). */
export async function fetchUrlText(url: string): Promise<{ text: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=fetch-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    if (res.ok) {
      const data = (await res.json()) as { text?: string; error?: string }
      return { text: String(data.text || ""), error: data.error }
    }
    return { text: "", error: "request_failed" }
  } catch {
    return { text: "", error: "network_error" }
  }
}

/* ── Bring Your Own Content — extract vocabulary from pasted text ─────── */

export interface ExtractParams {
  text: string
  target: string
  targetLabel: string
  native: string
  nativeLabel?: string
  knownLevel: string
}

function normalizeWords(raw: RawWord[] | undefined): NewWordInput[] {
  return (Array.isArray(raw) ? raw : [])
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
}

/**
 * Extract the words a learner needs from text they paste. Tries the AI endpoint
 * and falls back to a local heuristic so the feature never hard-crashes.
 */
export async function extractFromText(
  params: ExtractParams,
): Promise<{ words: NewWordInput[]; isMock: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/api/lara?action=extract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: params.text.slice(0, 4000),
        target: params.target,
        targetLanguage: params.target,
        targetLabel: params.targetLabel,
        native: params.native,
        nativeLanguage: params.native,
        nativeLabel: params.nativeLabel,
        knownLevel: params.knownLevel,
      }),
    })
    if (res.ok) {
      const data = (await res.json()) as { words?: RawWord[]; isMock?: boolean }
      const words = normalizeWords(data.words)
      if (words.length > 0) return { words, isMock: Boolean(data.isMock) }
    }
  } catch {
    /* fall through to the local heuristic */
  }
  return { words: localMockExtract(params.text, params.target), isMock: true }
}

const LOCAL_STOP: Record<string, string[]> = {
  en: ["the","a","an","and","or","but","is","are","was","were","to","of","in","on","at","for","with","as","by","it","this","that","you","i","we","they","not","have","has","will","would","can","what","when","where","from","about","there","their"],
  ru: ["и","в","во","не","на","что","он","с","как","а","то","все","она","так","его","но","да","ты","к","у","же","вы","за","бы","по","ее","было","от","меня","нет","из","или","быть","был"],
}

/** Client-side fallback extraction — distinctive tokens with placeholder meanings. */
function localMockExtract(text: string, lang: string): NewWordInput[] {
  const stop = new Set(LOCAL_STOP[lang] || [])
  const minLen = LOCAL_STOP[lang] ? 4 : 6
  const sentences = text
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const seen = new Set<string>()
  const tokens: string[] = []
  const matches = text.toLowerCase().match(/[\p{L}'-]{2,}/gu) || []
  for (const tok of matches) {
    if (stop.has(tok) || tok.length < minLen || seen.has(tok)) continue
    seen.add(tok)
    tokens.push(tok)
  }
  return tokens
    .sort((a, b) => b.length - a.length)
    .slice(0, 10)
    .map((tok) => ({
      term: tok,
      translation: "(translation)",
      example: sentences.find((s) => s.toLowerCase().includes(tok)) || undefined,
      theme: "Your text",
    }))
}
