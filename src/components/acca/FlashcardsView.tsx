import { useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { Icon, IconBadge, Button, C, SP, R, SHADOW } from "@/components/acca/ui"
import { getDueFlashcards, getFlashcards, reviewFlashcard, type Flashcard } from "@/lib/acca-flashcards"

/*
 * Flashcards — Leitner spaced repetition over the paper's key facts. Flip a
 * card, then SWIPE: right = got it, left = review again (buttons work too).
 * With an `area`, reviews that topic's whole deck (the topic-path loop);
 * without, reviews today's due cards across the paper.
 */

function cardStyle(extra?: CSSProperties): CSSProperties {
  return {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: R["2xl"],
    padding: SP.xl,
    boxShadow: SHADOW.sm,
    ...extra,
  }
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
      <Button variant="ghost" onClick={onBack} style={{ minHeight: 40, padding: "6px 0", marginBottom: SP.md }}>
        <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> Back
      </Button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: SP.lg }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, color: C.text }}>
          <span style={iriText}>{area ? `Topic ${area} cards` : "Flashcards"}</span>
        </h1>
        {!done && <span style={{ color: C.faint, fontSize: 13 }}>{idx + 1} / {total}</span>}
      </div>

      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", paddingTop: SP["2xl"] }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: SP.md }}>
            <IconBadge name="flashcards" tone="brand" size={64} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>
            {reviewed > 0 ? `${reviewed} cards reviewed` : "All caught up!"}
          </h2>
          <p style={{ color: C.soft, margin: "0 0 24px", fontSize: 15 }}>
            {reviewed > 0 ? "Nice work — come back tomorrow for the next batch." : "No cards are due right now. Check back later."}
          </p>
          <Button onClick={onBack} size="lg">Back to {paperId}</Button>
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
                  ...cardStyle({ cursor: flipped ? "grab" : "pointer" }),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: SP.md,
                  padding: SP["3xl"] - 4,
                  border: flipped ? `1px solid ${C.green}` : `1px solid ${C.border}`,
                  touchAction: "pan-y",
                }}
              >
                <span style={{ fontSize: 11, letterSpacing: 0.5, color: C.faint, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {flipped ? (
                    <>
                      <Icon name="arrow" size={13} color={C.red} style={{ transform: "rotate(180deg)" }} />
                      REVIEW · SWIPE · GOT IT
                      <Icon name="arrow" size={13} color={C.green} />
                    </>
                  ) : (
                    `AREA ${cardItem.area} · TAP TO FLIP`
                  )}
                </span>
                <span style={{ fontSize: flipped ? 16 : 19, fontWeight: flipped ? 500 : 700, lineHeight: 1.5, color: C.text }}>
                  {flipped ? cardItem.back : cardItem.front}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {flipped ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: SP.sm, marginTop: SP.lg }}>
              <Button variant="secondary" full onClick={() => grade(false)} style={{ color: C.red, borderColor: C.red }}>
                <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> Review again
              </Button>
              <Button variant="secondary" full onClick={() => grade(true)} style={{ color: C.green, borderColor: C.green }}>
                Got it <Icon name="arrow" size={16} />
              </Button>
            </div>
          ) : (
            <Button full onClick={() => setFlipped(true)} style={{ marginTop: SP.lg }}>Show answer</Button>
          )}
        </>
      )}
    </motion.div>
  )
}
