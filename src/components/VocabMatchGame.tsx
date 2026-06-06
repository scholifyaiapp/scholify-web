import { useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { speak, canSpeak } from "@/lib/tts"
import type { VocabDeck } from "@/lib/vocab"

/*
 * Match game — fast recognition practice. Tap a word, then its meaning.
 * Pure practice (does not change SRS state), timed, with a celebratory finish.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function VocabMatchGame({ deck, onClose }: { deck: VocabDeck; onClose: () => void }) {
  const pairs = useMemo(() => {
    const pool = deck.words.length <= 6 ? deck.words : shuffle(deck.words).slice(0, 6)
    return pool.map((w) => ({ id: w.id, term: w.term, translation: w.translation }))
  }, [deck])
  const translations = useMemo(
    () => shuffle(pairs.map((p) => ({ wordId: p.id, text: p.translation }))),
    [pairs],
  )

  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)
  const [moves, setMoves] = useState(0)
  const startRef = useRef<number>(Date.now())
  const [elapsed, setElapsed] = useState<number | null>(null)

  const done = pairs.length > 0 && matched.size === pairs.length

  const finish = () => {
    setElapsed(Math.round((Date.now() - startRef.current) / 1000))
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

  const tapTerm = (id: string) => {
    if (matched.has(id)) return
    setSelected((s) => (s === id ? null : id))
  }

  const tapTranslation = (wordId: string) => {
    if (matched.has(wordId) || !selected) return
    setMoves((m) => m + 1)
    if (wordId === selected) {
      const next = new Set(matched)
      next.add(selected)
      setMatched(next)
      setSelected(null)
      if (next.size === pairs.length) window.setTimeout(finish, 200)
    } else {
      setWrong(wordId)
      window.setTimeout(() => setWrong(null), 450)
      setSelected(null)
    }
  }

  return (
    <div style={shell}>
      <div style={topBar}>
        <button type="button" onClick={onClose} aria-label="Close" style={iconBtn}>
          ✕
        </button>
        <div style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>
          ⚡ Match · {matched.size}/{pairs.length}
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={stage}>
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: "100%", maxWidth: 520 }}
            >
              <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginBottom: 18 }}>
                Tap a word, then its meaning.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {/* Terms */}
                <div style={{ display: "grid", gap: 10 }}>
                  {pairs.map((p) => {
                    const isMatched = matched.has(p.id)
                    const isSel = selected === p.id
                    return (
                      <motion.button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          tapTerm(p.id)
                          if (canSpeak()) speak(p.term, deck.targetLanguage)
                        }}
                        animate={{ opacity: isMatched ? 0.35 : 1 }}
                        whileTap={isMatched ? undefined : { scale: 0.97 }}
                        style={tile(
                          isMatched ? "#34D399" : isSel ? "#C084FC" : "var(--sch-border)",
                          isMatched ? "rgba(52,211,153,0.12)" : isSel ? "rgba(192,132,252,0.14)" : "var(--sch-card)",
                          isMatched,
                        )}
                      >
                        {p.term}
                      </motion.button>
                    )
                  })}
                </div>
                {/* Translations */}
                <div style={{ display: "grid", gap: 10 }}>
                  {translations.map((t) => {
                    const isMatched = matched.has(t.wordId)
                    const isWrong = wrong === t.wordId
                    return (
                      <motion.button
                        key={t.wordId}
                        type="button"
                        onClick={() => tapTranslation(t.wordId)}
                        animate={isWrong ? { x: [0, -6, 6, -4, 0] } : { opacity: isMatched ? 0.35 : 1 }}
                        transition={{ duration: 0.35 }}
                        whileTap={isMatched ? undefined : { scale: 0.97 }}
                        style={tile(
                          isMatched ? "#34D399" : isWrong ? "#FF6B5E" : "var(--sch-border)",
                          isMatched ? "rgba(52,211,153,0.12)" : isWrong ? "rgba(255,107,94,0.14)" : "var(--sch-card)",
                          isMatched,
                        )}
                      >
                        {t.text}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
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
              <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>Matched them all! ⚡</h2>
              <p style={{ fontSize: 15, color: MUTED, marginTop: 10 }}>
                {pairs.length} pairs in {elapsed ?? 0}s · {moves} taps
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

function tile(borderColor: string, bg: string, matched: boolean): CSSProperties {
  return {
    minHeight: 52,
    padding: "10px 12px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 600,
    color: TEXT,
    background: bg,
    border: `1px solid ${borderColor}`,
    cursor: matched ? "default" : "pointer",
    textAlign: "center",
  }
}

const shell: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  background: "var(--sch-bg)",
  display: "flex",
  flexDirection: "column",
}
const topBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
}
const iconBtn: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: MUTED,
  fontSize: 14,
  cursor: "pointer",
}
const stage: CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 24px 60px",
}
const primaryBtn: CSSProperties = {
  width: "100%",
  height: 52,
  marginTop: 24,
  borderRadius: 14,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(139,92,246,0.3)",
}
