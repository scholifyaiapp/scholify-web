import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Icon, IconBadge, Button, C } from "@/components/acca/ui"
import { ScholifyMark } from "@/components/brand"
import { getDueFlashcards, getFlashcards, reviewFlashcard, type Flashcard } from "@/lib/acca-flashcards"

/*
 * Flashcards — the reels experience. Full-screen, one card at a time:
 * tap to flip, then SWIPE UP = got it, SWIPE DOWN = review again
 * (buttons work too, and ← exits anytime).
 *
 * Deck sizing is knowledge-based: with an `area` it's that topic's whole
 * deck (the topic-path loop); without, it's today's SRS-due cards — the
 * spaced-repetition engine decides how many you need, not a fixed number.
 */

const INK = "#14141A"
const SANS = "'Plus Jakarta Sans', sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

export default function FlashcardsView({ paperId, area, onBack }: { paperId: string; area?: string; onBack: () => void }) {
  const reduced = useReducedMotion()
  const [queue, setQueue] = useState<Flashcard[]>(() =>
    area ? getFlashcards(paperId).filter((c) => c.area === area) : getDueFlashcards(paperId),
  )
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [gotIt, setGotIt] = useState(0)
  const [exitY, setExitY] = useState(0)

  // The cards originally dealt — the progress denominator. A card sent back for
  // relearning must not inflate it, or the counter reads "3 of 12" on a 10-card deck.
  const [total] = useState(() => queue.length)
  const cardItem = queue[idx]
  const done = !cardItem

  function grade(known: boolean) {
    if (!cardItem) return
    const review = reviewFlashcard(cardItem.id, known)
    setReviewed((r) => r + 1)
    if (known) setGotIt((g) => g + 1)
    // A card you didn't know comes back before the session ends — that's the
    // relearning loop. Without it, "Don't know" just deferred the card a day.
    if (review.relearn) setQueue((q) => [...q, cardItem])
    setExitY(known ? -420 : 420)
    setIdx((i) => i + 1)
    setFlipped(false)
  }

  // Keyboard: space/enter flips, ↑ got it, ↓ review again, Esc exits.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack()
      if (done) return
      if ((e.key === " " || e.key === "Enter") && !flipped) { e.preventDefault(); setFlipped(true) }
      if (flipped && e.key === "ArrowUp") grade(true)
      if (flipped && e.key === "ArrowDown") grade(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: `radial-gradient(120% 90% at 80% 10%, rgba(200,0,0,0.16), transparent 55%), radial-gradient(90% 80% at 10% 95%, rgba(244,164,5,0.10), transparent 55%), ${INK}`,
        display: "flex",
        flexDirection: "column",
        fontFamily: SANS,
      }}
    >
      {/* top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px 0" }}>
        <button onClick={onBack} aria-label="Exit" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 14px", font: `700 12.5px/1 ${SANS}`, cursor: "pointer" }}>
          <Icon name="arrow" size={14} color="#fff" style={{ transform: "rotate(180deg)" }} /> Exit
        </button>
        <div style={{ flex: 1, display: "flex", gap: 4 }}>
          {Array.from({ length: Math.min(total, 40) }, (_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i < idx ? "#C80000" : "rgba(255,255,255,0.18)", transition: "background .2s" }} />
          ))}
        </div>
        <span style={{ font: `600 12px/1 ${MONO}`, color: "rgba(255,255,255,0.55)", fontVariantNumeric: "tabular-nums" }}>
          {done ? total : idx + 1}/{total}
        </span>
      </div>

      {/* the deck */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 20px calc(20px + env(safe-area-inset-bottom))", minHeight: 0 }}>
        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", color: "#fff", maxWidth: 380 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <ScholifyMark size={54} variant="white" />
            </div>
            <h2 style={{ font: `800 26px/1.2 ${SANS}`, margin: "0 0 8px" }}>
              {reviewed > 0 ? `${reviewed} cards down.` : total === 0 ? "All caught up." : "Deck done."}
            </h2>
            <p style={{ font: `400 14.5px/1.6 ${SANS}`, color: "rgba(255,255,255,0.65)", margin: "0 0 22px" }}>
              {reviewed > 0
                ? `${gotIt} known · ${reviewed - gotIt} coming back sooner. Spaced repetition decides when you see each one again.`
                : "No cards are due right now — the schedule will call you back when memory starts to fade."}
            </p>
            <Button onClick={onBack} size="lg">Back to {area ? `topic ${area}` : paperId}</Button>
          </motion.div>
        ) : (
          <div style={{ width: "100%", maxWidth: 460, height: "100%", maxHeight: 620, position: "relative" }}>
            {/* next-card peek */}
            {queue[idx + 1] && (
              <div aria-hidden style={{ position: "absolute", inset: "14px 10px -6px", borderRadius: 26, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", transform: "scale(0.96) translateY(14px)" }} />
            )}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={cardItem.id}
                onClick={() => { if (!flipped) setFlipped(true) }}
                drag={reduced ? false : "y"}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  if (!flipped) {
                    if (Math.abs(info.offset.y) > 70) setFlipped(true)
                    return
                  }
                  if (info.offset.y < -80) grade(true)
                  else if (info.offset.y > 80) grade(false)
                }}
                whileDrag={{ scale: 0.98, cursor: "grabbing" }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 120, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: exitY, rotate: exitY < 0 ? -3 : 3 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 26,
                  background: "#FAFAF7",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 40px 90px -30px rgba(0,0,0,0.7)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "22px 24px",
                  cursor: flipped ? "grab" : "pointer",
                  touchAction: "none",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ font: `700 10.5px/1 ${MONO}`, letterSpacing: "0.12em", color: "#C80000" }}>
                    {cardItem.paper} · AREA {cardItem.area}
                  </span>
                  <span style={{ font: `600 10.5px/1 ${MONO}`, letterSpacing: "0.1em", color: "#A79E96" }}>
                    {flipped ? "ANSWER" : "TAP TO FLIP"}
                  </span>
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 14, minHeight: 0 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={flipped ? "back" : "front"}
                      initial={{ opacity: 0, rotateX: reduced ? 0 : -70 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0, rotateX: reduced ? 0 : 70 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        font: flipped ? `500 16.5px/1.6 ${SANS}` : `800 21px/1.4 ${SANS}`,
                        color: "#14141A",
                        overflowY: "auto",
                        maxHeight: "100%",
                        letterSpacing: flipped ? 0 : "-0.3px",
                      }}
                    >
                      {flipped ? cardItem.back : cardItem.front}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* bottom hint / actions */}
                {flipped ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button onClick={(e) => { e.stopPropagation(); grade(false) }} style={{ padding: "13px 8px", borderRadius: 13, border: "1.5px solid #ECE4DE", background: "#fff", color: "#C80000", font: `750 13px/1 ${SANS}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Icon name="arrow" size={14} color="#C80000" style={{ transform: "rotate(90deg)" }} /> Again soon
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); grade(true) }} style={{ padding: "13px 8px", borderRadius: 13, border: "none", background: "#0E9F6E", color: "#fff", font: `750 13px/1 ${SANS}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 10px 22px -10px rgba(14,159,110,0.6)" }}>
                      Got it <Icon name="arrow" size={14} color="#fff" style={{ transform: "rotate(-90deg)" }} />
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", font: `600 10.5px/1 ${MONO}`, letterSpacing: "0.16em", color: "#C3BAB2", textTransform: "uppercase" }}>
                    tap or swipe to reveal
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* swipe legend */}
      {!done && flipped && (
        <div style={{ position: "absolute", bottom: "calc(10px + env(safe-area-inset-bottom))", left: 0, right: 0, textAlign: "center", font: `600 10px/1 ${MONO}`, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", pointerEvents: "none" }}>
          swipe up · got it&nbsp;&nbsp;·&nbsp;&nbsp;swipe down · again
        </div>
      )}
    </motion.div>
  )
}
