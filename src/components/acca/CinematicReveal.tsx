import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Icon, type IconName } from "@/components/acca/ui"

/*
 * CinematicReveal — the emotional "wow" loading moment.
 *
 * The two points in onboarding where the learner should FEEL the product's value
 * are (1) the diagnostic reveal and (2) Lara building their plan. This is the
 * shared, premium sequence both use: a layered 3D scene (an orb with orbiting
 * rings and floating depth particles, real CSS 3D — perspective + preserve-3d,
 * so it reads as depth, not a flat spinner) choreographed against staged phases
 * that build anticipation, then hands off to the reveal.
 *
 * Deliberately dependency-free (no three.js): CSS 3D + motion is buttery on a
 * mid-range Android on 4G, which is exactly the beta's device. Fully honours
 * prefers-reduced-motion — the choreography collapses to a calm fade.
 */

export interface RevealPhase {
  icon: IconName
  label: string
  sub?: string
}

interface Ring {
  size: number
  tiltX: number
  tiltY: number
  dur: number
  dir: 1 | -1
  op: number
}

/** Deterministic pseudo-random so particles are stable across renders. */
function seeded(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function CinematicReveal({
  phases,
  accent = "#C80000",
  perPhaseMs = 950,
  onComplete,
}: {
  phases: RevealPhase[]
  accent?: string
  perPhaseMs?: number
  onComplete: () => void
}) {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= phases.length) {
      const t = setTimeout(onComplete, 520)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), reduced ? perPhaseMs * 0.6 : perPhaseMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const current = phases[Math.min(step, phases.length - 1)]
  const progress = Math.min(1, (step + (step >= phases.length ? 1 : 0)) / phases.length)

  const rings: Ring[] = [
    { size: 128, tiltX: 72, tiltY: 8, dur: 6, dir: 1, op: 0.9 },
    { size: 176, tiltX: 60, tiltY: -18, dur: 9, dir: -1, op: 0.55 },
    { size: 232, tiltX: 78, tiltY: 22, dur: 13, dir: 1, op: 0.32 },
  ]
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: (seeded(i + 1) - 0.5) * 300,
        y: (seeded(i + 7) - 0.5) * 220,
        z: (seeded(i + 13) - 0.5) * 240,
        d: 2.4 + seeded(i + 21) * 2.6,
        s: 3 + seeded(i + 29) * 4,
        delay: seeded(i + 33) * 2,
      })),
    [],
  )

  return (
    <div style={{ textAlign: "center", padding: "36px 0 8px", userSelect: "none" }}>
      {/* ── 3D stage ─────────────────────────────────────────────── */}
      <div style={{ perspective: 1000, height: 264, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26 }}>
        <motion.div
          style={{ position: "relative", width: 264, height: 264, transformStyle: "preserve-3d" }}
          animate={reduced ? {} : { rotateY: [-10, 10, -10], rotateX: [4, -4, 4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* depth particles */}
          {!reduced &&
            particles.map((p, i) => (
              <motion.span
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: p.s,
                  height: p.s,
                  borderRadius: 999,
                  background: accent,
                  transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
                  filter: "blur(0.3px)",
                }}
                animate={{ opacity: [0, 0.7, 0], y: [p.y, p.y - 14, p.y] }}
                transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              />
            ))}

          {/* orbiting rings — the tilt is a fixed parent transform (so the 3D
              plane persists) and the spin animates the child inside it. */}
          {rings.map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: r.size,
                height: r.size,
                marginLeft: -r.size / 2,
                marginTop: -r.size / 2,
                transformStyle: "preserve-3d",
                transform: `rotateX(${r.tiltX}deg) rotateY(${r.tiltY}deg)`,
              }}
            >
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: `2px solid ${accent}`,
                  opacity: r.op,
                  boxShadow: `0 0 22px -6px ${accent}`,
                }}
                animate={reduced ? {} : { rotate: r.dir * 360 }}
                transition={reduced ? {} : { duration: r.dur, repeat: Infinity, ease: "linear" }}
              >
                {/* a travelling node riding the ring */}
                {!reduced && (
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      left: "50%",
                      marginLeft: -4,
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "#fff",
                      boxShadow: `0 0 12px 2px ${accent}`,
                    }}
                  />
                )}
              </motion.div>
            </div>
          ))}

          {/* the core — Lara's "mind", pulsing with each phase */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 84,
              height: 84,
              marginLeft: -42,
              marginTop: -42,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 62%, ${accent})`,
              boxShadow: `0 0 44px -2px ${accent}, inset 0 0 18px rgba(255,255,255,0.4)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d",
            }}
            animate={reduced ? {} : { scale: [1, 1.09, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={current.icon}
                initial={{ scale: 0.4, opacity: 0, rotateY: -40 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.4, opacity: 0, rotateY: 40 }}
                transition={{ duration: 0.4 }}
                style={{ display: "flex" }}
              >
                <Icon name={current.icon} size={30} color="#fff" strokeWidth={2.1} />
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* ── phase copy ───────────────────────────────────────────── */}
      <div style={{ minHeight: 62 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{ fontSize: 18.5, fontWeight: 800, color: "var(--sch-text)", letterSpacing: "-0.01em" }}>
              {current.label}
            </div>
            {current.sub && (
              <div style={{ fontSize: 13.5, color: "var(--sch-tx-2)", marginTop: 4, lineHeight: 1.5 }}>{current.sub}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── progress ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 260, margin: "22px auto 0" }}>
        <div style={{ height: 5, borderRadius: 999, background: "var(--sch-border)", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", borderRadius: 999, background: accent, boxShadow: `0 0 12px ${accent}` }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(6, progress * 100)}%` }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {phases.map((_, i) => (
            <motion.span
              key={i}
              animate={{
                scale: i === step ? 1.35 : 1,
                background: i < step ? accent : i === step ? accent : "var(--sch-border)",
              }}
              style={{ width: 6, height: 6, borderRadius: 999, display: "inline-block" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
