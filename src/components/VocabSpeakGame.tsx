import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { speak, canSpeak } from "@/lib/tts"
import type { VocabDeck } from "@/lib/vocab"

/*
 * Speaking practice (Pro) — say the word, we check your pronunciation using the
 * browser's SpeechRecognition (free, on-device, no API key). Accent-insensitive.
 * Pure practice (does not change SRS scheduling).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"

/* Minimal typing for the (non-standard) Web Speech API. */
interface SpeechRec {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

function getRecognition(): SpeechRec | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRec
    webkitSpeechRecognition?: new () => SpeechRec
  }
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition
  return Ctor ? new Ctor() : null
}

const BCP47: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  it: "it-IT",
  fr: "fr-FR",
  de: "de-DE",
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function VocabSpeakGame({ deck, onClose }: { deck: VocabDeck; onClose: () => void }) {
  const words = useMemo(() => shuffle(deck.words).slice(0, Math.min(6, deck.words.length)), [deck])
  const [idx, setIdx] = useState(0)
  const [state, setState] = useState<"idle" | "listening" | "right" | "wrong">("idle")
  const [heard, setHeard] = useState("")
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const supported = useMemo(() => getRecognition() !== null, [])
  const recRef = useRef<SpeechRec | null>(null)

  const current = words[idx]

  useEffect(() => {
    if (current && canSpeak()) speak(current.term, deck.targetLanguage)
    return () => {
      try {
        recRef.current?.stop()
      } catch {
        /* ignore */
      }
    }
  }, [idx, current, deck.targetLanguage])

  const listen = () => {
    if (!current || state === "listening") return
    const rec = getRecognition()
    if (!rec) return
    recRef.current = rec
    rec.lang = BCP47[deck.targetLanguage] || deck.targetLanguage
    rec.interimResults = false
    rec.maxAlternatives = 3
    setHeard("")
    setState("listening")
    rec.onresult = (e) => {
      const t = e.results?.[0]?.[0]?.transcript ?? ""
      setHeard(t)
      const target = normalize(current.term)
      const said = normalize(t)
      const ok = said === target || said.includes(target) || target.includes(said)
      setState(ok ? "right" : "wrong")
      if (ok) setCorrect((c) => c + 1)
    }
    rec.onerror = () => setState((s) => (s === "listening" ? "idle" : s))
    rec.onend = () => setState((s) => (s === "listening" ? "idle" : s))
    try {
      rec.start()
    } catch {
      setState("idle")
    }
  }

  const next = () => {
    if (idx + 1 < words.length) {
      setIdx((i) => i + 1)
      setState("idle")
      setHeard("")
    } else {
      setDone(true)
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#C084FC", "#818CF8", "#38BDF8", "#34D399", "#FBBF24"],
        })
      } catch {
        /* ignore */
      }
    }
  }

  const pct = words.length > 0 ? Math.round((idx / words.length) * 100) : 0

  return (
    <div style={shell}>
      <div style={topBar}>
        <button type="button" onClick={onClose} aria-label="Close" style={iconBtn}>
          ✕
        </button>
        <div style={progressTrack}>
          <motion.div animate={{ width: `${done ? 100 : pct}%` }} transition={{ duration: 0.3 }} style={{ height: "100%", background: IRIDESCENT }} />
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={stage}>
        {!supported ? (
          <div style={{ textAlign: "center", maxWidth: 360 }}>
            <div style={{ fontSize: 44 }}>🎙️</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginTop: 12 }}>
              Speaking needs Chrome
            </h2>
            <p style={{ fontSize: 14, color: MUTED, marginTop: 8, lineHeight: 1.6 }}>
              Your browser doesn't support on-device speech recognition. Open Scholify in
              Chrome (or Chrome on Android) to use speaking practice.
            </p>
            <button type="button" onClick={onClose} style={{ ...primaryBtn, marginTop: 22 }}>
              Back
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!done && current ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: "100%", maxWidth: 440, textAlign: "center" }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(192,132,252,0.8)" }}>
                  Say it · {idx + 1}/{words.length}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 18 }}>
                  <span style={{ fontSize: "clamp(22px, 7vw, 34px)", fontWeight: 900, color: TEXT, overflowWrap: "break-word", minWidth: 0 }}>
                    {current.term}
                  </span>
                  <button type="button" aria-label="Hear it" onClick={() => speak(current.term, deck.targetLanguage)} style={speakChip}>
                    🔊
                  </button>
                </div>
                <div style={{ fontSize: 15, color: MUTED, marginTop: 6 }}>{current.translation}</div>

                {/* Mic */}
                <motion.button
                  type="button"
                  onClick={listen}
                  disabled={state === "listening"}
                  whileTap={{ scale: 0.94 }}
                  animate={
                    state === "listening"
                      ? { boxShadow: ["0 0 0 0 rgba(139,92,246,0.5)", "0 0 0 18px rgba(139,92,246,0)"] }
                      : {}
                  }
                  transition={state === "listening" ? { duration: 1.2, repeat: Infinity } : {}}
                  style={{
                    ...micBtn,
                    background: state === "listening" ? "rgba(139,92,246,0.2)" : IRIDESCENT,
                  }}
                >
                  🎙️
                </motion.button>
                <div style={{ fontSize: 13, color: DIM, marginTop: 8 }}>
                  {state === "listening" ? "Listening…" : "Tap and say the word"}
                </div>

                {heard && (
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 12 }}>
                    Heard: <span style={{ color: TEXT }}>“{heard}”</span>
                  </div>
                )}
                {state === "right" && <div style={{ fontSize: 15, color: "#34D399", marginTop: 8, fontWeight: 700 }}>Great pronunciation! ✓</div>}
                {state === "wrong" && <div style={{ fontSize: 14, color: "#FF9F0A", marginTop: 8 }}>Close — tap the mic to try again.</div>}

                {(state === "right" || state === "wrong") && (
                  <motion.button type="button" onClick={next} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={primaryBtn}>
                    {idx + 1 < words.length ? "Next →" : "Finish"}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                style={{ width: "100%", maxWidth: 380, textAlign: "center" }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <LaraAvatar size={60} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>Spoken like a local 🎙️</h2>
                <p style={{ fontSize: 15, color: MUTED, marginTop: 10 }}>
                  {correct}/{words.length} clear. Keep speaking — it's how words stick.
                </p>
                <motion.button type="button" onClick={onClose} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={primaryBtn}>
                  Done
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

/* ── styles ── */

const shell: CSSProperties = { position: "fixed", inset: 0, zIndex: 200, background: "var(--sch-bg)", display: "flex", flexDirection: "column" }
const topBar: CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "max(14px, env(safe-area-inset-top)) 20px 14px" }
const iconBtn: CSSProperties = { width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--sch-border)", background: "var(--sch-card)", color: MUTED, fontSize: 14, cursor: "pointer", flexShrink: 0 }
const progressTrack: CSSProperties = { flex: 1, height: 8, borderRadius: 4, background: "var(--sch-hairline)", overflow: "hidden" }
const stage: CSSProperties = { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px 60px" }
const micBtn: CSSProperties = { width: 96, height: 96, borderRadius: "50%", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", marginTop: 28 }
const speakChip: CSSProperties = { width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--sch-border)", background: "var(--sch-card-2)", fontSize: 15, cursor: "pointer" }
const primaryBtn: CSSProperties = { width: "100%", height: 52, marginTop: 24, borderRadius: 14, border: "none", background: IRIDESCENT, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }
