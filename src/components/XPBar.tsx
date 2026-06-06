import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  levelFor,
  readXPState,
  subscribeChallenges,
  type LevelDef,
  type XPState,
} from "@/lib/challenges-storage"

/*
 * XPBar — sidebar widget. Shows the user's current level + a horizontal
 * progress bar toward the next level. Flashes when XP increases.
 *
 * The widget keeps its own state derived from `readXPState()` and
 * listens to the cross-tab change event so it stays fresh after the
 * Dashboard hands out XP for a task completion.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

interface XPBarProps {
  variant?: "sidebar" | "compact"
}

export default function XPBar({ variant = "sidebar" }: XPBarProps) {
  const [state, setState] = useState<XPState>(() => readXPState())
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const sub = subscribeChallenges(() => {
      setState((prev) => {
        const next = readXPState()
        if (next.totalXp > prev.totalXp) {
          setFlash(true)
          window.setTimeout(() => setFlash(false), 700)
        }
        return next
      })
    })
    return sub
  }, [])

  const level = useMemo(() => levelFor(state.totalXp), [state.totalXp])
  const pct = Math.min(100, Math.round((state.xpInLevel / Math.max(1, state.xpForNext)) * 100))

  return (
    <div style={variant === "sidebar" ? wrapSidebar : wrapCompact}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            animation: "scholify-iri-shimmer 6s ease-in-out infinite",
          }}
        >
          {level.name} ✦ Lv{level.level}
        </span>
        <span style={{ fontSize: 10, color: TEXT_DIM, fontVariantNumeric: "tabular-nums" }}>
          {state.totalXp} XP
        </span>
      </div>
      <motion.div
        animate={flash ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 6,
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            boxShadow: flash ? "0 0 16px rgba(167,139,250,0.6)" : "none",
          }}
        />
        {flash && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
            }}
            aria-hidden
          />
        )}
      </motion.div>
      <p style={{ marginTop: 6, fontSize: 10, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
        {state.xpInLevel} / {state.xpForNext} XP
      </p>

      <style>{`
        @keyframes scholify-iri-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

const wrapSidebar: CSSProperties = {
  marginTop: 14,
  padding: "12px 14px",
  borderRadius: 14,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

const wrapCompact: CSSProperties = {
  padding: "10px 14px",
  borderRadius: 12,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

/* ── Level-up overlay ────────────────────────────────────────────────── */

const TEXT_OVERLAY_PRIMARY = "var(--sch-text)"

export function LevelUpOverlay({
  newLevel,
  onClose,
}: {
  newLevel: LevelDef
  onClose: () => void
}) {
  const confetti = useMemo(() => {
    const colors = ["#A78BFA", "#F472B6", "#22D3EE", "#FCD34D", "#34D399"]
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.6 + Math.random() * 1.4,
      rotate: Math.random() * 720 - 360,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
    }))
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 200,
          display: "grid",
          placeItems: "center",
          padding: 16,
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {/* Confetti */}
        {confetti.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: p.rotate }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
            style={{
              position: "absolute",
              top: 0,
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.4,
              background: p.color,
              borderRadius: 2,
              boxShadow: `0 0 12px ${p.color}66`,
              pointerEvents: "none",
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: [0, 1.2, 1], rotate: [-10, 4, 0] }}
          transition={{ duration: 0.8, type: "spring", stiffness: 180 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            zIndex: 1,
            padding: "32px 36px",
            borderRadius: 22,
            background: "rgba(10,10,20,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            textAlign: "center",
          }}
        >
          {/* Iridescent rotating ring */}
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto" }}>
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `conic-gradient(from 0deg, #A78BFA, #F472B6, #22D3EE, #A78BFA)`,
                filter: "blur(2px)",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: "50%",
                background: "#0A0A14",
                display: "grid",
                placeItems: "center",
                boxShadow: "inset 0 0 32px rgba(167,139,250,0.35)",
              }}
            >
              <span style={{ fontSize: 36, fontWeight: 900, color: "var(--sch-text)" }}>{newLevel.level}</span>
            </div>
          </div>

          <p
            style={{
              marginTop: 18,
              fontSize: 32,
              fontWeight: 800,
              background: IRIDESCENT,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              animation: "scholify-iri-shimmer 5s ease-in-out infinite",
            }}
          >
            {newLevel.name}
          </p>
          <p style={{ marginTop: 4, fontSize: 20, color: "var(--sch-tx-1)" }}>
            Level {newLevel.level} reached! 🎉
          </p>
          <button
            onClick={onClose}
            style={{
              marginTop: 22,
              padding: "12px 28px",
              borderRadius: 999,
              background: IRIDESCENT,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 12px 32px rgba(167,139,250,0.45)",
            }}
          >
            Continue →
          </button>
          {/* Silence unused-var warning when overlay imports include TEXT_OVERLAY_PRIMARY but don't reference it */}
          <span style={{ display: "none" }}>{TEXT_OVERLAY_PRIMARY}</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
