import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { speak, canSpeak } from "@/lib/tts"
import { awardXp, type VocabDeck } from "@/lib/vocab"

/*
 * Listen & Type — the production/spelling drill (a Pro mode).
 * Lara says the word, the learner types it. Accent-insensitive checking so
 * "si" matches "sì". Pure practice (does not change SRS scheduling).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Lenient compare: lowercase, trim, collapse spaces, strip accents. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

export default function VocabTypeGame({ deck, onClose }: { deck: VocabDeck; onClose: () => void }) {
  const words = useMemo(() => shuffle(deck.words).slice(0, Math.min(8, deck.words.length)), [deck])
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState("")
  const [state, setState] = useState<"typing" | "right" | "wrong">("typing")
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const current = words[idx]

  // Auto-play the word's audio when it appears, and focus the input.
  useEffect(() => {
    if (!current || done) return
    if (canSpeak()) speak(current.term, deck.targetLanguage)
    inputRef.current?.focus()
  }, [idx, current, done, deck.targetLanguage])

  const check = () => {
    if (!current || state !== "typing" || !input.trim()) return
    const ok = normalize(input) === normalize(current.term)
    setState(ok ? "right" : "wrong")
    if (ok) setCorrect((c) => c + 1)
  }

  const next = () => {
    if (idx + 1 < words.length) {
      setIdx((i) => i + 1)
      setInput("")
      setState("typing")
    } else {
      awardXp(correct * 6)
      setDone(true)
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#D92E10", "#E50068", "#F4A405", "#34D399", "#FBBF24"],
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
          <motion.div
            animate={{ width: `${done ? 100 : pct}%` }}
            transition={{ duration: 0.3 }}
            style={{ height: "100%", background: IRIDESCENT }}
          />
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={stage}>
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
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,0,0,0.8)" }}>
                Listen & type · {idx + 1}/{words.length}
              </div>

              <motion.button
                type="button"
                onClick={() => speak(current.term, deck.targetLanguage)}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.05 }}
                aria-label="Play word"
                style={playBtn}
              >
                🔊
              </motion.button>
              <div style={{ fontSize: 14, color: DIM, marginTop: 4 }}>Tap to hear it again</div>

              {/* Hint = translation */}
              <div style={{ fontSize: 16, color: MUTED, marginTop: 18 }}>
                Hint: <span style={{ color: TEXT, fontWeight: 600 }}>{current.translation}</span>
              </div>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (state === "typing" ? check() : next())
                }}
                placeholder="Type what you hear…"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                disabled={state !== "typing"}
                style={{
                  ...field,
                  borderColor:
                    state === "right" ? "#34D399" : state === "wrong" ? "#FF6B5E" : "var(--sch-border)",
                  background:
                    state === "right"
                      ? "rgba(52,211,153,0.1)"
                      : state === "wrong"
                        ? "rgba(255,107,94,0.1)"
                        : "var(--sch-card)",
                }}
              />

              {state === "wrong" && (
                <div style={{ fontSize: 14, color: "#FF6B5E", marginTop: 10 }}>
                  Correct: <strong style={{ color: TEXT }}>{current.term}</strong>
                </div>
              )}
              {state === "right" && (
                <div style={{ fontSize: 14, color: "#34D399", marginTop: 10 }}>Correct! ✓</div>
              )}

              <motion.button
                type="button"
                onClick={state === "typing" ? check : next}
                disabled={state === "typing" && !input.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...primaryBtn,
                  opacity: state === "typing" && !input.trim() ? 0.5 : 1,
                }}
              >
                {state === "typing" ? "Check" : idx + 1 < words.length ? "Next →" : "Finish"}
              </motion.button>
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
              <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>Nicely spelled! 🎧</h2>
              <p style={{ fontSize: 15, color: MUTED, marginTop: 10 }}>
                You typed {correct}/{words.length} correctly.
              </p>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={primaryBtn}
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── styles ── */

const shell: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  background: "var(--sch-bg)",
  display: "flex",
  flexDirection: "column",
}
const topBar: CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "max(14px, env(safe-area-inset-top)) 20px 14px" }
const iconBtn: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: MUTED,
  fontSize: 14,
  cursor: "pointer",
  flexShrink: 0,
}
const progressTrack: CSSProperties = {
  flex: 1,
  height: 8,
  borderRadius: 4,
  background: "var(--sch-hairline)",
  overflow: "hidden",
}
const stage: CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 24px 60px",
}
const playBtn: CSSProperties = {
  width: 84,
  height: 84,
  borderRadius: "50%",
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 34,
  cursor: "pointer",
  marginTop: 24,
  boxShadow: "0 0 40px rgba(200,0,0,0.35)",
}
const field: CSSProperties = {
  width: "100%",
  height: 54,
  marginTop: 18,
  padding: "0 18px",
  borderRadius: 14,
  fontSize: 17,
  textAlign: "center",
  color: TEXT,
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  outline: "none",
}
const primaryBtn: CSSProperties = {
  width: "100%",
  height: 52,
  marginTop: 22,
  borderRadius: 14,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(200,0,0,0.3)",
}
