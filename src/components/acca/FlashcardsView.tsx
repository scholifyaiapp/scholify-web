import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { getDueFlashcards, getFlashcards, reviewFlashcard, type Flashcard } from "@/lib/acca-flashcards"

/*
 * Flashcards — Leitner spaced repetition over the paper's key facts. Flip a
 * card, then SWIPE: right = got it, left = review again (buttons work too).
 * With an `area`, reviews that topic's whole deck (the topic-path loop);
 * without, reviews today's due cards across the paper.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const GREEN = "#10B981"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function FlashcardsView({ paperId, area, onBack }: { paperId: string; area?: string; onBack: () => void }) {
  const [queue] = useState<Flashcard[]>(() =>
    area ? getFlashcards(paperId).filter((c) => c.area === area) : getDueFlashcards(paperId),
  )
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [exitX, setExitX] = useState(0)

  const total = useMemo(() => queue.length, [queue])
  const cardItem = queue[idx]

  function grade(known: boolean) {
    if (!cardItem) return
    reviewFlashcard(cardItem.id, known)
    setReviewed((r) => r + 1)
    setExitX(known ? 320 : -320)
    if (idx + 1 >= queue.length) {
      setIdx(queue.length) // done
    } else {
      setIdx((i) => i + 1)
      setFlipped(false)
    }
  }

  const done = !cardItem

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <button onClick={onBack} style={backBtn}>← Back</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, color: TEXT }}>
          <span style={iriText}>{area ? `Topic ${area} cards` : "Flashcards"}</span>
        </h1>
        {!done && <span style={{ color: DIM, fontSize: 13 }}>{idx + 1} / {total}</span>}
      </div>

      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", paddingTop: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🧠</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: TEXT, margin: "0 0 4px" }}>
            {reviewed > 0 ? `${reviewed} cards reviewed` : "All caught up!"}
          </h2>
          <p style={{ color: MUTED, margin: "0 0 24px", fontSize: 15 }}>
            {reviewed > 0 ? "Nice work — come back tomorrow for the next batch." : "No cards are due right now. Check back later."}
          </p>
          <button onClick={onBack} style={{ ...card({ cursor: "pointer" }), fontWeight: 700, color: TEXT, background: IRIDESCENT, border: "none", ...({ color: "#fff" } as CSSProperties), padding: "14px 28px" }}>
            Back to {paperId}
          </button>
        </motion.div>
      ) : (
        <>
          <div style={{ perspective: 1200, overflow: "visible" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={cardItem.id + (flipped ? "-b" : "-f")}
                onClick={() => { if (!flipped) setFlipped(true) }}
                drag={flipped ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 90) grade(true)
                  else if (info.offset.x < -90) grade(false)
                }}
                whileDrag={{ rotate: 3, cursor: "grabbing" }}
                initial={{ rotateY: flipped ? -90 : 0, opacity: flipped ? 0 : 1, x: 0 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: exitX, rotate: exitX > 0 ? 8 : exitX < 0 ? -8 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: "100%",
                  minHeight: 240,
                  boxSizing: "border-box",
                  ...card({ cursor: flipped ? "grab" : "pointer" }),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 12,
                  padding: 28,
                  border: flipped ? `1px solid ${GREEN}` : `1px solid ${BORDER}`,
                  touchAction: "pan-y",
                }}
              >
                <span style={{ fontSize: 11, letterSpacing: 0.5, color: DIM, fontWeight: 700 }}>
                  {flipped ? "← REVIEW AGAIN · SWIPE · GOT IT →" : `AREA ${cardItem.area} · TAP TO FLIP`}
                </span>
                <span style={{ fontSize: flipped ? 16 : 19, fontWeight: flipped ? 500 : 700, lineHeight: 1.5, color: TEXT }}>
                  {flipped ? cardItem.back : cardItem.front}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {flipped ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
              <button onClick={() => grade(false)} style={gradeBtn("#EF4444")}>← Review again</button>
              <button onClick={() => grade(true)} style={gradeBtn(GREEN)}>Got it →</button>
            </div>
          ) : (
            <button onClick={() => setFlipped(true)} style={{ ...gradeBtn("#C80000"), width: "100%", marginTop: 16 }}>
              Show answer
            </button>
          )}
        </>
      )}
    </motion.div>
  )
}

function gradeBtn(color: string): CSSProperties {
  return {
    padding: 15,
    borderRadius: 14,
    border: `1.5px solid ${color}`,
    background: "var(--sch-card)",
    color,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  }
}

const backBtn: CSSProperties = {
  background: "none",
  border: "none",
  color: MUTED,
  cursor: "pointer",
  fontSize: 14,
  padding: 0,
  marginBottom: 14,
}
