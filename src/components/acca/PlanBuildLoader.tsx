import { useEffect, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { Icon, type IconName } from "@/components/acca/ui"

/* ──────────────────────────────────────────────────────────────
 *  The plan being built — 0 to 100, on a ring.
 *
 *  WHY IT IS SLOW ON PURPOSE.
 *  The old choreography ran four phases at 950ms and was gone in
 *  under four seconds. A plan that appears instantly reads as a
 *  template with the learner's name typed into it — and this one
 *  is not: it weights the syllabus, sizes the day from the minutes
 *  they promised, and counts back from their sitting. Ten seconds
 *  is long enough for that work to be seen happening, and it is
 *  not dead time: the paper's content chunk is genuinely
 *  downloading behind this, which is what the old nine-second
 *  ceiling existed to cover.
 *
 *  Every line of copy names something the app actually does, in
 *  their own numbers. Nothing here is a fake progress bar over an
 *  empty wait.
 * ────────────────────────────────────────────────────────────── */

export interface BuildPhase {
  icon: IconName
  label: string
  /** Optional so this accepts the existing RevealPhase shape unchanged. */
  sub?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function PlanBuildLoader({
  phases,
  accent = "#C80000",
  totalMs = 10_000,
  onComplete,
}: {
  phases: BuildPhase[]
  accent?: string
  /** Whole sweep, 0 → 100. Ten seconds by default. */
  totalMs?: number
  onComplete: () => void
}) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  // One motion value drives the ring, the number and the phase — so the
  // percentage can never disagree with the arc, which is the tell that a
  // progress display is decorative.
  const progress = useMotionValue(0)
  const percent = useTransform(progress, (v) => Math.round(v))
  const dash = useTransform(progress, (v) => v / 100)

  useEffect(() => {
    if (reduced) {
      progress.set(100)
      setIndex(phases.length - 1)
      onComplete()
      return
    }
    const controls = animate(progress, 100, {
      duration: totalMs / 1000,
      // Slight ease so it starts confidently and settles at the end rather
      // than stopping dead — a linear bar looks machine-timed, which is
      // exactly what we do not want it to look like.
      ease: [0.32, 0, 0.24, 1],
      onUpdate: (v) => {
        const next = Math.min(phases.length - 1, Math.floor((v / 100) * phases.length))
        setIndex((current) => (next > current ? next : current))
      },
      onComplete,
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const phase = phases[index]

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "8px 0" }}>
      <div style={{ position: "relative", width: "clamp(176px, 46vw, 232px)", aspectRatio: "1" }}>
        <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeOpacity="0.10" strokeWidth="7" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            style={{ pathLength: dash }}
          />
        </svg>

        <div
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Building your personalised plan"
        >
          <div style={{ display: "flex", alignItems: "baseline", color: "var(--sch-text)" }}>
            <motion.span
              style={{
                fontSize: "clamp(38px, 11vw, 52px)", fontWeight: 850, letterSpacing: "-0.04em",
                fontVariantNumeric: "tabular-nums", lineHeight: 1,
              }}
            >
              {percent}
            </motion.span>
            <span style={{ fontSize: "clamp(15px, 4vw, 19px)", fontWeight: 800, marginLeft: 2, opacity: 0.55 }}>%</span>
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, 'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sch-tx-2)", marginTop: 7,
            }}
          >
            Building
          </div>
        </div>
      </div>

      {/* The step. Crossfades rather than cutting, and the icon springs so the
          change is felt at a glance without having to read it. */}
      <div style={{ minHeight: 96, marginTop: 22, width: "100%", maxWidth: 420 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.label}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <motion.span
                initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 340, damping: 18 }}
                style={{
                  display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9,
                  background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent,
                }}
              >
                <Icon name={phase.icon} size={16} />
              </motion.span>
              <span style={{ fontSize: "clamp(15px, 4.2vw, 17px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--sch-text)" }}>
                {phase.label}
              </span>
            </div>
            <p style={{ fontSize: "clamp(13px, 3.6vw, 14px)", lineHeight: 1.55, color: "var(--sch-tx-2)", margin: "8px auto 0", maxWidth: 380 }}>
              {phase.sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step ticks — position in a four-step process, without a second number
          competing with the one in the ring. */}
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        {phases.map((p, i) => (
          <motion.span
            key={p.label}
            animate={{
              width: i === index ? 22 : 6,
              backgroundColor: i <= index ? accent : "color-mix(in srgb, currentColor 18%, transparent)",
            }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ height: 5, borderRadius: 99, display: "block", color: "var(--sch-tx-2)" }}
          />
        ))}
      </div>
    </div>
  )
}
