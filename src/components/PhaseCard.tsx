import { type CSSProperties } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * PhaseCard — the header that sits above each phase in the roadmap.
 *
 * Shows the phase glyph + number on the muted top line, the phase
 * name big, and the week range muted. When this is the user's
 * current phase the card wears an iridescent border + a "Current
 * phase" pill.
 */

export type PhaseNumber = 1 | 2 | 3

export interface Phase {
  number: PhaseNumber
  emoji: string
  name: string
  description: string
  weekFrom: number
  weekTo?: number
  tasksTotal: number
  tasksCompleted: number
}

interface PhaseCardProps {
  phase: Phase
  isCurrent?: boolean
  /** Compact mobile variant — slightly tighter padding + no min-width. */
  compact?: boolean
}

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

export default function PhaseCard({ phase, isCurrent = false, compact = false }: PhaseCardProps) {
  const weekLabel =
    phase.weekTo && phase.weekTo !== phase.weekFrom
      ? `Weeks ${phase.weekFrom}–${phase.weekTo}`
      : `Week ${phase.weekFrom}+`

  const pct =
    phase.tasksTotal > 0 ? Math.round((phase.tasksCompleted / phase.tasksTotal) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        padding: compact ? "10px 16px" : "12px 20px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        marginBottom: 20,
        minWidth: compact ? 0 : 200,
        overflow: "hidden",
      }}
    >
      {/* Iridescent border overlay (only when current) */}
      {isCurrent && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            padding: 1,
            borderRadius: 16,
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "rgba(240,238,255,0.5)",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span aria-hidden>{phase.emoji}</span>
          <span>Phase {phase.number}</span>
        </p>
        {isCurrent && (
          <span style={currentPillStyle}>Current phase</span>
        )}
      </div>

      <p
        style={{
          position: "relative",
          marginTop: 4,
          fontSize: 16,
          fontWeight: 700,
          color: TEXT_PRIMARY,
          lineHeight: 1.3,
        }}
      >
        {phase.name}
      </p>

      <p
        style={{
          position: "relative",
          marginTop: 2,
          fontSize: 12,
          color: TEXT_MUTED,
        }}
      >
        {weekLabel}
      </p>

      {/* Tiny progress sliver */}
      <div
        style={{
          position: "relative",
          marginTop: 12,
          height: 4,
          borderRadius: 2,
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
          }}
        />
      </div>
      <p style={{ position: "relative", marginTop: 6, fontSize: 10.5, color: TEXT_DIM }}>
        {phase.tasksCompleted}/{phase.tasksTotal} tasks · {pct}%
      </p>
    </motion.div>
  )
}

const currentPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 9px",
  borderRadius: 999,
  background: "rgba(139,92,246,0.15)",
  border: "1px solid rgba(139,92,246,0.35)",
  color: "#C084FC",
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
}
