import { useEffect, useMemo, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  STAGES,
  svgDataUrl,
  treeForMilestone,
  type TreeStage,
} from "@/lib/streak-tree-storage"

/*
 * Full-screen milestone reveal overlay.
 *
 *  • Background darkens.
 *  • Tree slides up from the bottom + scales 0.5 → 1.1 → 1.0.
 *  • Three sequenced glow pulses on the tree.
 *  • Stage name in iridescent.
 *  • Continue → close. Share → Web Share API / clipboard fallback.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"

interface TreeGrowthOverlayProps {
  milestone: number
  onClose: () => void
}

export default function TreeGrowthOverlay({ milestone, onClose }: TreeGrowthOverlayProps) {
  const stage: TreeStage = useMemo(
    () => STAGES.find((s) => s.milestone === milestone) ?? STAGES[0],
    [milestone],
  )
  const navigate = useNavigate()

  // Esc to dismiss.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const tree = treeForMilestone(milestone)
  const imageSrc = tree?.url || svgDataUrl(stage.key)

  const onShare = async () => {
    const text = `My Scholify streak tree just evolved — Day ${milestone}, ${stage.name} 🌳`
    const url = typeof window !== "undefined" ? `${window.location.origin}/tree` : "/tree"
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Scholify tree evolved", text, url })
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`)
      }
    } catch {
      /* user dismissed — no-op */
    }
  }

  const onContinue = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={backdropStyle}
      >
        {/* Confetti dust */}
        <Confetti />

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={panelStyle}
        >
          {/* Tree pedestal */}
          <div
            style={{
              position: "relative",
              perspective: 1200,
              width: "min(260px, 65vw)",
              aspectRatio: "1 / 1",
            }}
          >
            {/* 3 sequenced glow rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                aria-hidden
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.6, 1.6], opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 1.6,
                  delay: 0.4 + i * 0.55,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  inset: -10,
                  borderRadius: "50%",
                  background: `radial-gradient(closest-side, ${stage.hue.glow}, transparent 70%)`,
                  filter: "blur(8px)",
                  pointerEvents: "none",
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.5, rotate: -6 }}
              animate={{ scale: [0.5, 1.1, 1], rotate: [-6, 4, 0] }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: 28,
                overflow: "hidden",
                background: "#0B0B14",
                border: `1px solid ${stage.hue.ring}66`,
                boxShadow: `
                  0 0 80px ${stage.hue.glow},
                  0 30px 60px rgba(0,0,0,0.5)
                `,
              }}
            >
              {/* Floating 3D-ish tree image */}
              <motion.img
                src={imageSrc}
                alt={stage.name}
                animate={{ y: [0, -8, 0], rotateY: [-4, 4, -4] }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transformStyle: "preserve-3d",
                }}
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            style={{
              marginTop: 28,
              fontSize: 14,
              color: TEXT_MUTED,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            🌳 Your tree evolved
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.45 }}
            style={{
              marginTop: 6,
              fontSize: 30,
              fontWeight: 800,
              background: IRIDESCENT,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.01em",
            }}
          >
            {stage.name}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.45 }}
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "var(--sch-tx-2)",
              lineHeight: 1.65,
              maxWidth: 360,
            }}
          >
            {stage.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.45 }}
            style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onShare}
              style={shareBtnStyle}
              type="button"
            >
              📤 Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose()
                navigate("/tree")
              }}
              style={viewBtnStyle}
              type="button"
            >
              View full tree
            </motion.button>
            <button onClick={onContinue} style={continueBtnStyle} type="button">
              Continue
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Confetti dust ───────────────────────────────────────────────────── */

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ["#A78BFA", "#F472B6", "#22D3EE", "#FCD34D", "#34D399"]
    return Array.from({ length: 38 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 2 + Math.random() * 1.4,
      rotate: Math.random() * 720 - 360,
      color: colors[i % colors.length],
      size: 5 + Math.random() * 5,
    }))
  }, [])
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
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
            boxShadow: `0 0 10px ${p.color}66`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const backdropStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 220,
  background: "rgba(5,5,8,0.86)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  display: "grid",
  placeItems: "center",
  padding: 16,
  overflow: "hidden",
}

const panelStyle: CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "32px 28px",
  borderRadius: 28,
  background: "rgba(10,10,20,0.88)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
  maxWidth: 480,
  width: "100%",
}

const shareBtnStyle: CSSProperties = {
  padding: "11px 20px",
  borderRadius: 14,
  background: IRIDESCENT,
  color: "#fff",
  fontWeight: 700,
  fontSize: 13.5,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 12px 32px rgba(167,139,250,0.45)",
}

const viewBtnStyle: CSSProperties = {
  padding: "11px 18px",
  borderRadius: 14,
  background: "rgba(255,255,255,0.04)",
  color: TEXT_PRIMARY,
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: 13.5,
  cursor: "pointer",
}

const continueBtnStyle: CSSProperties = {
  padding: "11px 14px",
  borderRadius: 14,
  background: "transparent",
  color: TEXT_MUTED,
  border: "1px solid rgba(255,255,255,0.05)",
  fontSize: 13,
  cursor: "pointer",
}
