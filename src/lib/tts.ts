/*
 * Pronunciation (text-to-speech).
 *
 * Uses the browser's built-in speechSynthesis — free, offline, supports dozens
 * of languages. Abstracted behind speak()/canSpeak() so a premium voice
 * (ElevenLabs) can be swapped in later for Pro users without touching callers.
 */

let voicesCache: SpeechSynthesisVoice[] = []

function loadVoices(): SpeechSynthesisVoice[] {
  try {
    if (voicesCache.length === 0) voicesCache = window.speechSynthesis.getVoices()
  } catch {
    /* ignore */
  }
  return voicesCache
}

// Voices load async in some browsers.
try {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      voicesCache = window.speechSynthesis.getVoices()
    }
  }
} catch {
  /* ignore */
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = loadVoices()
  const code = lang.toLowerCase()
  // Prefer an exact-ish language match (e.g. "it" matches "it-IT").
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith(code)) ||
    voices.find((v) => v.lang.toLowerCase().split("-")[0] === code)
  )
}

/**
 * Speak `text` in `lang` (ISO code like "it", "en", "es"). Cancels any
 * in-flight utterance first. No-op when unsupported.
 */
export function speak(text: string, lang: string, rate = 0.92): void {
  if (!canSpeak() || !text) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = rate
    const v = pickVoice(lang)
    if (v) u.voice = v
    window.speechSynthesis.speak(u)
  } catch {
    /* ignore */
  }
}

export function stopSpeaking(): void {
  try {
    window.speechSynthesis.cancel()
  } catch {
    /* ignore */
  }
}
