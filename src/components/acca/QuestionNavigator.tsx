import { useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { C, Icon } from "@/components/acca/ui"

/*
 * Shared question map / navigator — the styled grid that lets a learner jump
 * to any question and come back, plus a Prev / Flag / Map / Next control bar.
 * Modelled on the CBE mock's navigator (same colour language) so diagnostic,
 * practice and mock all read as one system:
 *   current > flagged > answered > unanswered   (colour precedence)
 */

function cellColors(state: { current: boolean; answered: boolean; flagged: boolean }) {
  const bg = state.current
    ? "rgba(200,0,0,0.9)"
    : state.flagged
      ? "#C2740B"
      : state.answered
        ? "rgba(16,185,129,0.85)"
        : "var(--sch-card-2)"
  const fg = state.current || state.flagged || state.answered ? "#fff" : C.soft
  const border = state.current || state.flagged || state.answered ? "transparent" : C.border
  return { bg, fg, border }
}

function LegendDot({ bg, label, border }: { bg: string; label: string; border?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: bg, border: border ? `1px solid ${C.border}` : "none" }} />
      <span>{label}</span>
    </span>
  )
}

/** The bottom-sheet grid of numbered cells. `total` questions, 1-based labels. */
export function QuestionMapSheet({
  open,
  onClose,
  total,
  cursor,
  isAnswered,
  isFlagged,
  onGo,
}: {
  open: boolean
  onClose: () => void
  total: number
  cursor: number
  isAnswered: (i: number) => boolean
  isFlagged: (i: number) => boolean
  onGo: (i: number) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", maxWidth: 560, maxHeight: "70vh", overflowY: "auto", background: "var(--sch-bg-2)", border: `1px solid ${C.border}`, borderRadius: "22px 22px 0 0", padding: 20, boxShadow: "0 -20px 60px rgba(0,0,0,0.4)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.4, color: C.text }}>QUESTION MAP</span>
              <button onClick={onClose} style={{ background: "transparent", border: "none", color: C.faint, fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Array.from({ length: total }).map((_, i) => {
                const { bg, fg, border } = cellColors({ current: i === cursor, answered: isAnswered(i), flagged: isFlagged(i) })
                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => { onGo(i); onClose() }}
                    style={{ width: 36, height: 36, borderRadius: 9, border: `1px solid ${border}`, background: bg, color: fg, fontSize: 12.5, fontWeight: 750, cursor: "pointer", fontVariantNumeric: "tabular-nums" }}
                  >
                    {i + 1}
                  </motion.button>
                )
              })}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 14, fontSize: 11, color: C.faint, flexWrap: "wrap" }}>
              <LegendDot bg="rgba(200,0,0,0.9)" label="Current" />
              <LegendDot bg="rgba(16,185,129,0.85)" label="Answered" />
              <LegendDot bg="var(--sch-card-2)" label="Unanswered" border />
              <LegendDot bg="#C2740B" label="Flagged" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * The control bar under the question card: Prev · Flag · Map(n/total) · Next,
 * plus a Finish action. Owns the map sheet. Exam-style: nothing grades here.
 */
export function QuestionNavBar({
  cursor,
  total,
  answeredCount,
  isAnswered,
  isFlagged,
  currentFlagged,
  onGo,
  onToggleFlag,
  onFinish,
  finishLabel = "Finish",
}: {
  cursor: number
  total: number
  answeredCount: number
  isAnswered: (i: number) => boolean
  isFlagged: (i: number) => boolean
  currentFlagged: boolean
  onGo: (i: number) => void
  onToggleFlag: () => void
  onFinish: () => void
  finishLabel?: string
}) {
  const [mapOpen, setMapOpen] = useState(false)
  const atFirst = cursor <= 0
  const atLast = cursor >= total - 1
  const btn = (enabled: boolean): CSSProperties => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: "11px 14px", borderRadius: 12, border: `1px solid ${C.border}`,
    background: "var(--sch-card)", color: enabled ? C.text : C.faint,
    fontSize: 13.5, fontWeight: 700, cursor: enabled ? "pointer" : "not-allowed", opacity: enabled ? 1 : 0.5,
  })
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        <button style={btn(!atFirst)} disabled={atFirst} onClick={() => !atFirst && onGo(cursor - 1)}>← Prev</button>
        <button
          onClick={onToggleFlag}
          style={{ ...btn(true), background: currentFlagged ? "rgba(194,116,11,0.12)" : "var(--sch-card)", borderColor: currentFlagged ? "#C2740B" : C.border, color: currentFlagged ? "#C2740B" : C.text }}
        >
          <Icon name="pin" size={14} color={currentFlagged ? "#C2740B" : C.soft} /> {currentFlagged ? "Flagged" : "Flag"}
        </button>
        <button onClick={() => setMapOpen(true)} style={{ ...btn(true), flex: 1, minWidth: 96 }}>
          Map · {cursor + 1}/{total} · {answeredCount} done
        </button>
        <button style={btn(!atLast)} disabled={atLast} onClick={() => !atLast && onGo(cursor + 1)}>Next →</button>
      </div>
      <button
        onClick={onFinish}
        style={{ width: "100%", marginTop: 10, padding: 15, borderRadius: 14, border: "none", background: C.brand, color: "#fff", fontWeight: 750, fontSize: 15, cursor: "pointer" }}
      >
        {finishLabel}
      </button>
      <QuestionMapSheet open={mapOpen} onClose={() => setMapOpen(false)} total={total} cursor={cursor} isAnswered={isAnswered} isFlagged={isFlagged} onGo={onGo} />
    </>
  )
}
