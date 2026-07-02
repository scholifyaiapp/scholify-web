import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { awardXp, type VocabDeck, type VocabWord } from "@/lib/vocab"

/*
 * Guess the word — a timed, points-driven game. You see the meaning (and an
 * example with the word blanked out) and pick the right word against the
 * clock. Correct answers score points + a time bonus and build a combo;
 * wrong answers reset the combo. Pure practice (no SRS changes).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"

const ROUND_SECONDS = 60
const BASE_POINTS = 10

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Question {
  word: VocabWord
  options: string[] // term + 3 distractor terms
}

/** Replace the target term inside its example with a blank, if present. */
function blankExample(word: VocabWord): string | null {
  if (!word.example) return null
  const re = new RegExp(word.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
  return re.test(word.example) ? word.example.replace(re, "_____") : word.example
}

export default function VocabGuessGame({ deck, onClose }: { deck: VocabDeck; onClose: () => void }) {
  const questions = useMemo<Question[]>(() => {
    const pool = deck.words.filter((w) => w.term && w.translation)
    const allTerms = Array.from(new Set(pool.map((w) => w.term)))
    return shuffle(pool).map((w) => {
      const distractors = shuffle(allTerms.filter((t) => t !== w.term)).slice(0, 3)
      return { word: w, options: shuffle([w.term, ...distractors]) }
    })
  }, [deck])

  const enoughWords = questions.length >= 4

  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [over, setOver] = useState(!enoughWords)
  const [floatPts, setFloatPts] = useState<number | null>(null)
  const endedRef = useRef(false)

  const q = questions[idx % Math.max(1, questions.length)]

  // Countdown.
  useEffect(() => {
    if (over) return
    if (timeLeft <= 0) {
      finish()
      return
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, over])

  const finish = () => {
    if (endedRef.current) return
    endedRef.current = true
    setOver(true)
    awardXp(Math.round(score / 10))
    try {
      confetti({ particleCount: 90, spread: 65, origin: { y: 0.7 }, colors: ["#D92E10", "#E50068", "#F4A405", "#34D399", "#FBBF24"] })
    } catch {
      /* ignore */
    }
  }

  const pick = (option: string) => {
    if (picked || over) return
    setPicked(option)
    const correct = option === q.word.term
    if (correct) {
      const timeBonus = Math.max(0, Math.ceil(timeLeft / 6))
      const comboBonus = combo * 2
      const gained = BASE_POINTS + timeBonus + comboBonus
      setScore((s) => s + gained)
      setCorrectCount((c) => c + 1)
      setCombo((c) => {
        const n = c + 1
        setBestCombo((b) => Math.max(b, n))
        return n
      })
      setFloatPts(gained)
    } else {
      setCombo(0)
      setFloatPts(null)
    }
    window.setTimeout(() => {
      setPicked(null)
      setFloatPts(null)
      setIdx((i) => i + 1)
    }, correct ? 600 : 1100)
  }

  const timePct = Math.max(0, (timeLeft / ROUND_SECONDS) * 100)
  const timeColor = timeLeft <= 10 ? "#FF6B5E" : timeLeft <= 25 ? "#FF9F0A" : IRIDESCENT
  const blanked = q ? blankExample(q.word) : null

  if (over) {
    return (
      <div style={shell}>
        <div style={stage}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            style={{ width: "100%", maxWidth: 420, textAlign: "center" }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <LaraAvatar size={60} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>
              {enoughWords ? "Time! ⏱" : "Add a few more words"}
            </h2>
            {enoughWords ? (
              <>
                <div style={{ fontSize: 46, fontWeight: 900, color: "#7C3AED", letterSpacing: "-1px", marginTop: 10 }}>{score}</div>
                <div style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>points</div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
                  <span style={pill}>{correctCount} correct</span>
                  <span style={pill}>🔥 best combo {bestCombo}</span>
                  <span style={pill}>+{Math.round(score / 10)} XP ⚡</span>
                </div>
              </>
            ) : (
              <p style={{ fontSize: 14.5, color: MUTED, marginTop: 8 }}>
                Guess needs at least 4 words. Learn a few more, then come back.
              </p>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {enoughWords && (
                <button
                  type="button"
                  onClick={() => {
                    endedRef.current = false
                    setIdx(0)
                    setPicked(null)
                    setScore(0)
                    setCombo(0)
                    setBestCombo(0)
                    setCorrectCount(0)
                    setTimeLeft(ROUND_SECONDS)
                    setOver(false)
                  }}
                  style={{ ...primaryBtn, background: "var(--sch-card)", color: TEXT, border: "1px solid var(--sch-border)", boxShadow: "none" }}
                >
                  ↺ Play again
                </button>
              )}
              <button type="button" onClick={onClose} style={primaryBtn}>
                Done →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div style={shell}>
      {/* Top bar: close · timer · score */}
      <div style={topBar}>
        <button type="button" onClick={onClose} aria-label="Close" style={iconBtn}>
          ✕
        </button>
        <div style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--sch-hairline)", overflow: "hidden" }}>
          <motion.div animate={{ width: `${timePct}%` }} transition={{ duration: 0.9, ease: "linear" }} style={{ height: "100%", background: timeColor }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 800, color: timeLeft <= 10 ? "#FF6B5E" : MUTED, width: 30, textAlign: "right" }}>{timeLeft}</span>
      </div>

      {/* Score + combo */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, padding: "2px 20px 6px" }}>
        <span style={{ fontSize: 20, fontWeight: 900, ...{ color: "#7C3AED" } }}>{score}</span>
        <span style={{ fontSize: 12, color: DIM, fontWeight: 700 }}>pts</span>
        <AnimatePresence>
          {combo >= 2 && (
            <motion.span
              key={combo}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 13, fontWeight: 800, color: "#FB923C", background: "rgba(251,146,60,0.12)", padding: "3px 10px", borderRadius: 999 }}
            >
              🔥 {combo}x combo
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div style={stage}>
        <div style={{ width: "100%", maxWidth: 460, position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a78bd6" }}>
              Which word means…
            </div>
          </div>

          {/* Meaning card */}
          <div style={{ background: "var(--sch-card)", border: "1px solid var(--sch-border)", borderRadius: 20, padding: 22, textAlign: "center", boxShadow: "0 12px 30px -16px rgba(40,28,55,0.2)" }}>
            <div style={{ fontSize: "clamp(20px,5vw,26px)", fontWeight: 800, color: TEXT, letterSpacing: "-0.4px" }}>{q.word.translation}</div>
            {blanked && <div style={{ fontSize: 14, color: MUTED, fontStyle: "italic", marginTop: 10, lineHeight: 1.5 }}>“{blanked}”</div>}
          </div>

          {/* Floating points */}
          <AnimatePresence>
            {floatPts != null && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: 1, y: -30, scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                style={{ position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)", fontSize: 18, fontWeight: 900, color: "#34D399", pointerEvents: "none" }}
              >
                +{floatPts}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginTop: 18 }}>
            {q.options.map((opt) => {
              const isAnswer = opt === q.word.term
              const isPicked = picked === opt
              const reveal = picked != null
              const bg = reveal && isAnswer ? "rgba(52,211,153,0.16)" : isPicked ? "rgba(255,107,94,0.16)" : "var(--sch-card)"
              const bd = reveal && isAnswer ? "#34D399" : isPicked ? "#FF6B5E" : "var(--sch-border)"
              return (
                <motion.button
                  key={opt}
                  type="button"
                  onClick={() => pick(opt)}
                  whileTap={picked ? undefined : { scale: 0.97 }}
                  style={{
                    minHeight: 56,
                    padding: "14px 16px",
                    borderRadius: 14,
                    fontSize: 16,
                    fontWeight: 700,
                    color: TEXT,
                    background: bg,
                    border: `1.5px solid ${bd}`,
                    cursor: picked ? "default" : "pointer",
                  }}
                >
                  {opt}
                  {reveal && isAnswer && <span style={{ marginLeft: 8 }}>✓</span>}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const shell: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 210,
  background: "radial-gradient(120% 80% at 50% -10%, #EFE7FB, var(--sch-bg) 55%)",
  display: "flex",
  flexDirection: "column",
  fontFamily: "var(--sch-font)",
  color: "var(--sch-text)",
}
const topBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "max(14px, env(safe-area-inset-top)) 20px 8px",
}
const iconBtn: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: MUTED,
  fontSize: 15,
  cursor: "pointer",
  flexShrink: 0,
}
const stage: CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 24px 40px",
}
const pill: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: "var(--sch-tx-1)",
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  padding: "7px 14px",
  borderRadius: 999,
}
const primaryBtn: CSSProperties = {
  flex: 1,
  height: 52,
  borderRadius: 14,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 10px 26px -6px rgba(124,58,237,0.5)",
}
