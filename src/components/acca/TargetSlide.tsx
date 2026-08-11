import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { Icon } from "@/components/acca/ui"
import {
  TARGET_MAX,
  TARGET_MIN,
  TARGET_PRESETS,
  clampTarget,
  targetBand,
  targetConsequence,
} from "@/lib/acca-target"

/* ──────────────────────────────────────────────────────────────
 *  "How high are you aiming?" — the onboarding target step.
 *
 *  The number on this slide is the line every readiness meter in
 *  the app is measured against, it moves the recommended exam
 *  date, and it scales how much practice each day contains. It
 *  was never asked for: the control lived on a slide that
 *  onboardingSteps filtered out, so every learner got the silent
 *  75% fallback and the plan claimed a target they never set.
 *
 *  The dial is the point of the screen. A target is an abstract
 *  promise about a day months away, and three text buttons make
 *  it feel like a form field. An arc that fills to where you are
 *  aiming makes the distance legible — and because the same arc
 *  reappears on the plan reveal and the dashboard, the learner
 *  meets a shape they have already set with their own hand.
 * ────────────────────────────────────────────────────────────── */

const RED = "#C80000"
const INK = "#14141A"
const BODY = "#5F584F"
const MUTE = "#8B837C"
const FAINT = "#A79E96"
const BORDER = "#ECE4DE"
const TRACK = "#EAE2DB"
const SANS = "'Plus Jakarta Sans', sans-serif"

/* The arc is read at a glance, so the bands differ in LIGHTNESS as well as hue —
   the three stay distinguishable in greyscale and to a red-blind reader, who
   would otherwise see one flat colour across every choice. */
const BAND_COLOR: Record<string, string> = {
  steady: "#B45309",      // amber 700 — 4.6:1 on the page
  confident: RED,         // the brand red, and the recommended band
  bulletproof: "#0E9F6E", // green 600
}

const SPRING = { type: "spring", stiffness: 220, damping: 26, mass: 0.9 } as const

export default function TargetSlide({
  target,
  setTarget,
  minutesPerDay,
}: {
  target: number | null
  setTarget: (n: number) => void
  /**
   * From the previous step. The slide quotes the learner's REAL day rather
   * than a percentage: ambition raises a ceiling, so at 40 or 60 minutes a
   * day — the two commonest answers — the target changes nothing at all, and
   * a "35% more practice" line would be false for most people reading it.
   */
  minutesPerDay: number
}) {
  const reduced = useReducedMotion()
  const sliderId = useId()
  const value = target ?? null
  const shown = value ?? 75
  const band = targetBand(shown)
  const accent = BAND_COLOR[band.key] ?? RED

  // Custom mode opens itself for a restored draft holding a non-preset value,
  // so returning to this step never hides the number the learner actually set.
  const isPreset = value !== null && TARGET_PRESETS.some((p) => p.value === value)
  const [custom, setCustom] = useState(value !== null && !isPreset)

  /* One motion value drives the arc AND the digits, so the two cannot disagree —
     the tell of a dial that is decorative rather than showing anything. */
  const progress = useMotionValue(value === null ? 0 : shown)
  const percent = useTransform(progress, (v) => Math.round(v))
  const pathLength = useTransform(progress, (v) => v / 100)

  // A ref keeps the effect off `progress` (a stable object, but the linter
  // cannot know that) without disabling the dependency rule wholesale.
  const first = useRef(true)
  useEffect(() => {
    if (value === null) return
    if (reduced || first.current) {
      progress.set(value)
      first.current = false
      return
    }
    const controls = animate(progress, value, { type: "spring", stiffness: 90, damping: 18, mass: 0.8 })
    return () => controls.stop()
  }, [value, reduced, progress])

  const choose = (next: number) => setTarget(clampTarget(next))

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 520 }}>
      {/* ── THE DIAL ─────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "clamp(150px, 40vw, 188px)", aspectRatio: "1" }}>
          <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
            <circle cx="60" cy="60" r="52" fill="none" stroke={TRACK} strokeWidth="8" />
            {/* The 50% pass mark, so the target is read against the thing that
                actually matters rather than against an empty ring. */}
            <circle
              cx="60" cy="60" r="52" fill="none" stroke={FAINT} strokeWidth="8"
              strokeDasharray="1.5 325" strokeDashoffset={-163.4} opacity={0.9}
            />
            <motion.circle
              cx="60" cy="60" r="52" fill="none"
              stroke={accent}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ pathLength }}
              animate={{ stroke: accent }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            />
          </svg>

          <div
            style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", pointerEvents: "none",
            }}
          >
            {value === null ? (
              <div style={{ font: `700 13px/1.4 ${SANS}`, color: FAINT, textAlign: "center", padding: "0 18px" }}>
                Pick your target
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "baseline", color: INK }}>
                  <motion.span
                    style={{
                      font: `850 clamp(34px, 9vw, 44px)/1 ${SANS}`,
                      letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {percent}
                  </motion.span>
                  <span style={{ font: `800 16px/1 ${SANS}`, marginLeft: 2, opacity: 0.5 }}>%</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={band.key}
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      font: `750 10px/1 ${SANS}`, letterSpacing: "0.14em", textTransform: "uppercase",
                      color: accent, marginTop: 8,
                    }}
                  >
                    {band.label}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Live region: the dial is visual, so the same fact is spoken. */}
      <p aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {value === null ? "No target chosen yet" : `Target ${shown} percent, ${band.label}. ${targetConsequence(shown, minutesPerDay)}`}
      </p>

      {/* ── THE THREE ────────────────────────────────────────── */}
      <div role="radiogroup" aria-label="Target readiness score" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {TARGET_PRESETS.map((preset) => {
          const selected = !custom && value === preset.value
          const color = BAND_COLOR[targetBand(preset.value).key] ?? RED
          return (
            <motion.button
              key={preset.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => { setCustom(false); choose(preset.value) }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              animate={{ y: selected ? -3 : 0 }}
              transition={SPRING}
              style={{
                // 44px floor, and the padding keeps it comfortably past that.
                minHeight: 76, padding: "12px 8px", borderRadius: 14, cursor: "pointer",
                textAlign: "center", background: selected ? "#fff" : "#FFFFFFAA",
                border: `1.5px solid ${selected ? color : BORDER}`,
                boxShadow: selected ? `0 8px 20px -10px ${color}` : "none",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
              }}
            >
              <span style={{ font: `850 19px/1 ${SANS}`, color: selected ? color : INK, fontVariantNumeric: "tabular-nums" }}>
                {preset.value}%
              </span>
              <span style={{ font: `700 11.5px/1.25 ${SANS}`, color: selected ? color : MUTE }}>
                {preset.label}
              </span>
              {/* Not colour alone — the recommended one says so. */}
              {preset.value === 75 && (
                <span style={{ font: `700 9px/1 ${SANS}`, letterSpacing: "0.08em", textTransform: "uppercase", color: FAINT }}>
                  Recommended
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* The blurb for whatever is selected — one line, not three stacked. */}
      <AnimatePresence mode="wait">
        {value !== null && (
          <motion.p
            key={`${band.key}-${custom}`}
            initial={reduced ? false : { opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ margin: 0, font: `500 12.5px/1.5 ${SANS}`, color: BODY }}
          >
            {TARGET_PRESETS.find((p) => p.value === shown)?.blurb ?? `A ${shown}% target.`}{" "}
            <span style={{ color: MUTE }}>{targetConsequence(shown, minutesPerDay)}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── CUSTOM ───────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
        <button
          type="button"
          onClick={() => {
            const next = !custom
            setCustom(next)
            if (next && value === null) choose(75)
          }}
          aria-expanded={custom}
          style={{
            display: "flex", alignItems: "center", gap: 8, minHeight: 44, padding: 0,
            background: "none", border: "none", cursor: "pointer",
            font: `750 13px/1 ${SANS}`, color: custom ? INK : MUTE,
          }}
        >
          <Icon name="settings" size={15} color={custom ? RED : FAINT} />
          Set my own number
          {/* The icon is a RIGHT chevron, so 90° points it down when open —
              180° would point it back at the label. */}
          <motion.span animate={{ rotate: custom ? 90 : 0 }} transition={{ duration: 0.2 }} style={{ display: "inline-flex" }}>
            <Icon name="chevron" size={13} color={FAINT} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {custom && (
            <motion.div
              key="custom"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: 12 }}>
                <label htmlFor={sliderId} style={{ display: "block", font: `600 12px/1.4 ${SANS}`, color: MUTE, marginBottom: 8 }}>
                  Anywhere from {TARGET_MIN}% to {TARGET_MAX}%
                </label>
                <input
                  id={sliderId}
                  type="range"
                  min={TARGET_MIN}
                  max={TARGET_MAX}
                  step={1}
                  value={shown}
                  onChange={(e) => choose(Number(e.currentTarget.value))}
                  aria-valuetext={`${shown} percent, ${band.label}`}
                  style={{ width: "100%", accentColor: accent, height: 28, cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", font: `600 11px/1 ${SANS}`, color: FAINT, marginTop: 2 }}>
                  {/* Naming the pass mark is the whole reason the floor is 50. */}
                  <span>{TARGET_MIN}% — the ACCA pass mark</span>
                  <span>{TARGET_MAX}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
