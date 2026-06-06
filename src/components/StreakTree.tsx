import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readProgress } from "@/lib/scholify-data"
import {
  currentTreeImageUrl,
  nextMilestoneFor,
  progressToNext,
  stageForStreak,
  subscribeTrees,
  type TreeStage,
} from "@/lib/streak-tree-storage"

/*
 * Compact streak tree — sidebar / dashboard widget.
 *
 *  • 80px square living tree (Fal-generated image when available,
 *    SVG fallback otherwise).
 *  • Gentle bob + breathing glow.
 *  • Stage label + day count + iridescent micro progress bar to
 *    the next milestone.
 *  • Smooth scale + opacity swap when the stage changes between
 *    renders (catches the milestone-hit moment).
 *  • Wrapped in a Link to /tree — clicking opens the fullscreen view.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

interface StreakTreeProps {
  variant?: "sidebar" | "compact"
  /** When true, render the "Growing your tree…" placeholder over the image. */
  loading?: boolean
}

export default function StreakTree({ variant = "sidebar", loading = false }: StreakTreeProps) {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribeTrees(() => setTick((t) => t + 1)), [])

  // Re-derive everything off local progress so a task-complete update
  // ripples through immediately.
  const progress = useMemo(() => readProgress(), [tick])
  const streak = progress.streak
  const stage: TreeStage = stageForStreak(streak)
  const next = nextMilestoneFor(streak)
  const pct = progressToNext(streak)
  const display = currentTreeImageUrl(streak)

  // Track stage changes to crossfade.
  const [prevStageKey, setPrevStageKey] = useState(stage.key)
  useEffect(() => {
    if (prevStageKey !== stage.key) {
      const t = window.setTimeout(() => setPrevStageKey(stage.key), 800)
      return () => window.clearTimeout(t)
    }
  }, [stage.key, prevStageKey])

  const size = variant === "sidebar" ? 80 : 64

  return (
    <Link
      to="/tree"
      style={variant === "sidebar" ? sidebarWrap : compactWrap}
      aria-label={`Streak tree — ${stage.name}, day ${streak}`}
    >
      {/* Tree image */}
      <div style={{ position: "relative" }}>
        {/* Breathing glow */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 22,
            background: `radial-gradient(closest-side, ${stage.hue.glow}, transparent 70%)`,
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: 16,
            overflow: "hidden",
            background: "#0B0B14",
            border: `1px solid ${stage.hue.ring}55`,
            boxShadow: `0 0 20px ${stage.hue.glow}, 0 6px 18px rgba(0,0,0,0.35)`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={display.url}
              src={display.url}
              alt={`${stage.name} — day ${streak} streak tree`}
              initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </AnimatePresence>

          {/* Loading shimmer */}
          {loading && (
            <motion.div
              aria-hidden
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Stage label + streak */}
      <div style={{ marginTop: 12, textAlign: "center" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: "#FB923C" }} aria-hidden>
            🔥
          </span>
          Day {streak}
        </p>
        <p
          style={{
            marginTop: 2,
            fontSize: 11,
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}
        >
          {stage.name}
        </p>
      </div>

      {/* Micro progress bar */}
      <div style={{ marginTop: 8, width: "100%" }}>
        <div
          style={{
            position: "relative",
            height: 3,
            borderRadius: 2,
            background: "rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "100%",
              background: IRIDESCENT,
              backgroundSize: "200% 200%",
              boxShadow: `0 0 10px ${stage.hue.glow}`,
            }}
          />
        </div>
        <p style={{ marginTop: 6, fontSize: 10, color: TEXT_DIM, textAlign: "center" }}>
          {next
            ? `🌳 ${next.milestone - streak} day${next.milestone - streak === 1 ? "" : "s"} until ${next.name}`
            : "Mythic stage reached"}
        </p>
      </div>
    </Link>
  )
}

const sidebarWrap: CSSProperties = {
  marginTop: 14,
  padding: 14,
  borderRadius: 18,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
}

const compactWrap: CSSProperties = {
  padding: 10,
  borderRadius: 14,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
}

// Silence unused-var: TEXT_MUTED is exported visually only via the
// description text on the fullscreen page. Keep the import so other
// files can copy the palette later.
void TEXT_MUTED
