import { useEffect, useLayoutEffect, useState, type RefObject } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Lightweight first-visit tour. Not a modal — a sequence of spotlighted
 * tooltips that point at the three things a new user needs to understand:
 * today's task, the Mark Complete button, and Lara's daily message.
 *
 * Each step highlights a real element (via ref) with a glow ring and anchors
 * a tooltip next to it. Skippable; persists completion via the caller's onDone.
 */

export interface TourStep {
  ref: RefObject<HTMLElement | null>
  title: string
  body: string
  cta: string
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export default function FirstVisitTour({
  steps,
  onDone,
}: {
  steps: TourStep[]
  onDone: () => void
}) {
  const [index, setIndex] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)
  const step = steps[index]

  // Bring the current target into view, then measure it.
  useLayoutEffect(() => {
    const el = step?.ref.current
    if (!el) {
      setRect(null)
      return
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" })
    const measure = () => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    const t = window.setTimeout(measure, 180)
    window.addEventListener("resize", measure)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener("resize", measure)
    }
  }, [index, step])

  // Esc skips the tour.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDone()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onDone])

  if (!step) return null

  const isLast = index === steps.length - 1
  const advance = () => (isLast ? onDone() : setIndex((i) => i + 1))

  // Anchor the tooltip below the target, or above when the target sits low.
  const pad = 12
  const placeBelow = !rect || rect.top + rect.height < window.innerHeight * 0.62
  const tooltipStyle: React.CSSProperties = rect
    ? {
        position: "fixed",
        left: Math.max(16, Math.min(rect.left, window.innerWidth - 332)),
        width: Math.min(320, window.innerWidth - 32),
        ...(placeBelow
          ? { top: rect.top + rect.height + pad }
          : { bottom: window.innerHeight - rect.top + pad }),
      }
    : {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: Math.min(320, window.innerWidth - 32),
      }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
      {/* Dim backdrop with a spotlight hole around the target. */}
      <div
        onClick={onDone}
        style={{
          position: "fixed",
          inset: 0,
          background: rect ? "transparent" : "rgba(5,5,8,0.6)",
        }}
      />
      {rect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
            borderRadius: 18,
            border: "2px solid rgba(167,139,250,0.9)",
            boxShadow: "0 0 0 9999px rgba(5,5,8,0.6), 0 0 28px rgba(139,92,246,0.6)",
            pointerEvents: "none",
          }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...tooltipStyle,
            padding: "16px 18px",
            borderRadius: 16,
            background: "var(--sch-bg-2, #0D0015)",
            border: "1px solid rgba(139,92,246,0.45)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            zIndex: 301,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sch-text)", lineHeight: 1.4 }}>
            {step.title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--sch-tx-2)",
              lineHeight: 1.55,
              marginTop: 6,
            }}
          >
            {step.body}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <button
              type="button"
              onClick={onDone}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--sch-tx-3)",
                fontSize: 12,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Skip tour
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "var(--sch-tx-3)" }}>
                {index + 1}/{steps.length}
              </span>
              <motion.button
                type="button"
                onClick={advance}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: IRIDESCENT,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {step.cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
