import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { speak, canSpeak } from "@/lib/tts"
import { awardXp, type VocabDeck, type VocabWord } from "@/lib/vocab"

/*
 * Reels — vertical, swipeable word feed (like watching shorts). One word per
 * full screen: term, pronunciation, meaning, example. Swipe up for the next.
 * Pure browsing/encoding (does not change SRS state); awards a little XP for
 * a full pass. Works with touch (drag), wheel, and keyboard (↑/↓/Space).
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

export default function VocabReels({ deck, onClose }: { deck: VocabDeck; onClose: () => void }) {
  // Lead with words still being learned, then the rest — a useful browse order.
  const words = useMemo<VocabWord[]>(() => {
    const learning = deck.words.filter((w) => w.status === "new" || w.status === "learning")
    const rest = deck.words.filter((w) => w.status === "review" || w.status === "mastered")
    const ordered = [...learning, ...shuffle(rest)]
    return ordered.length > 0 ? ordered : deck.words
  }, [deck])

  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const lockRef = useRef(false)
  const awardedRef = useRef(false)

  const atEnd = idx >= words.length
  const go = (d: number) => {
    if (lockRef.current) return
    const next = idx + d
    if (next < 0 || next > words.length) return
    lockRef.current = true
    setDir(d)
    setIdx(next)
    window.setTimeout(() => {
      lockRef.current = false
    }, 260)
  }

  // Pronounce each word as it comes into view.
  useEffect(() => {
    if (!atEnd && words[idx] && canSpeak()) speak(words[idx].term, deck.targetLanguage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  // Reward a full pass once.
  useEffect(() => {
    if (atEnd && !awardedRef.current) {
      awardedRef.current = true
      awardXp(Math.min(20, words.length))
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ["#D92E10", "#E50068", "#F4A405", "#34D399"] })
      } catch {
        /* ignore */
      }
    }
  }, [atEnd, words.length])

  // Keyboard + wheel navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault()
        go(1)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        go(-1)
      } else if (e.key === "Escape") {
        onClose()
      }
    }
    let wheelLock = 0
    const onWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - wheelLock < 400) return
      if (Math.abs(e.deltaY) < 18) return
      wheelLock = now
      go(e.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("wheel", onWheel, { passive: true })
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("wheel", onWheel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  const pct = Math.round((Math.min(idx, words.length) / words.length) * 100)

  return (
    <div style={shell}>
      {/* Top bar */}
      <div style={topBar}>
        <button type="button" onClick={onClose} aria-label="Close" style={iconBtn}>
          ✕
        </button>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: "var(--sch-hairline)", overflow: "hidden" }}>
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} style={{ height: "100%", background: IRIDESCENT }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: MUTED, width: 52, textAlign: "right" }}>
          {atEnd ? words.length : idx + 1}/{words.length}
        </span>
      </div>

      <div style={stage}>
        <AnimatePresence mode="popLayout" custom={dir}>
          {!atEnd ? (
            <motion.div
              key={idx}
              custom={dir}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={(_e, info) => {
                if (info.offset.y < -70) go(1)
                else if (info.offset.y > 70) go(-1)
              }}
              initial={{ y: dir > 0 ? 120 : -120, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: dir > 0 ? -120 : 120, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", maxWidth: 460, cursor: "grab" }}
            >
              <WordCard word={words[idx]} lang={deck.targetLanguage} />
            </motion.div>
          ) : (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ width: "100%", maxWidth: 420, textAlign: "center" }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <LaraAvatar size={60} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>That's the feed 🎬</h2>
              <p style={{ fontSize: 14.5, color: MUTED, marginTop: 8 }}>
                You browsed {words.length} word{words.length === 1 ? "" : "s"}. Seeing them in context makes them stick.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <button
                  type="button"
                  onClick={() => {
                    awardedRef.current = false
                    setDir(-1)
                    setIdx(0)
                  }}
                  style={{ ...primaryBtn, background: "var(--sch-card)", color: TEXT, border: "1px solid var(--sch-border)", boxShadow: "none" }}
                >
                  ↺ Again
                </button>
                <button type="button" onClick={onClose} style={primaryBtn}>
                  Done →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Swipe hint (first card only) */}
      {idx === 0 && !atEnd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.5], y: [6, 0, 0, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          style={{ textAlign: "center", paddingBottom: "max(20px, env(safe-area-inset-bottom))", fontSize: 13, color: DIM, fontWeight: 600 }}
        >
          ↑ Swipe up for the next word
        </motion.div>
      )}
    </div>
  )
}

function WordCard({ word, lang }: { word: VocabWord; lang: string }) {
  return (
    <div
      style={{
        padding: "34px 28px",
        borderRadius: 26,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        boxShadow: "0 20px 50px -16px rgba(40,28,55,0.22)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: "clamp(30px,9vw,46px)", fontWeight: 800, color: TEXT, letterSpacing: "-1px", lineHeight: 1.05, overflowWrap: "break-word", minWidth: 0 }}>
          {word.term}
        </span>
        {canSpeak() && (
          <button
            type="button"
            aria-label="Pronounce"
            onClick={() => speak(word.term, lang)}
            style={{ width: 46, height: 46, borderRadius: 13, border: "none", background: "rgba(200,0,0,0.07)", color: "#7C3AED", fontSize: 20, cursor: "pointer", flexShrink: 0 }}
          >
            🔊
          </button>
        )}
      </div>
      {word.partOfSpeech && (
        <div style={{ fontSize: 14, color: DIM, fontStyle: "italic", marginTop: 6 }}>{word.partOfSpeech}</div>
      )}

      <div style={{ background: "var(--sch-card-2)", borderRadius: 14, padding: 16, marginTop: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: DIM, marginBottom: 5 }}>
          Meaning
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, color: TEXT }}>{word.translation}</div>
      </div>

      {word.example && (
        <div style={{ border: "1px solid var(--sch-border)", borderRadius: 14, padding: 16, marginTop: 14 }}>
          <div style={{ fontSize: 15.5, fontWeight: 600, color: "var(--sch-tx-1)", lineHeight: 1.5 }}>“{word.example}”</div>
          {word.exampleTranslation && (
            <div style={{ fontSize: 13.5, color: MUTED, marginTop: 6 }}>{word.exampleTranslation}</div>
          )}
        </div>
      )}
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
  padding: "max(14px, env(safe-area-inset-top)) 20px 14px",
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
  padding: "10px 24px",
  overflow: "hidden",
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
