import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Icon, type IconName } from "@/components/acca/ui"
import type { GuideFix, OnboardingGuide } from "@/lib/acca-onboarding-guide"

/*
 * CapacityPlan — Charles's verdict on whether the learner's answers can reach
 * their sitting, and the exact changes that would fix it.
 *
 * WHAT THIS REPLACED. The final onboarding slide printed three sentences of
 * prose, one of which was "Choose a later sitting or add time only if you can
 * sustain it." That told a learner they had a problem, gave them no numbers to
 * act on, and left them to walk back through the deck and guess. A learner who
 * reads "serious time shortfall" and cannot see how far short, or by how much
 * any change would help, has been warned rather than helped.
 *
 * So this shows the arithmetic and then offers to do it:
 *   · a coverage bar — protected hours against the hours the paper needs, with
 *     the shortfall named in hours rather than implied by a colour
 *   · one tap per fix, each carrying the value that actually closes the gap
 *     (solved in buildOnboardingGuide, not rounded off here)
 *
 * MOTION. transform and opacity only, so nothing here can cause layout shift on
 * the busiest slide in the deck. The bar grows once on mount because the growth
 * IS the information — a bar that stops short of the line reads as a shortfall
 * before any of the words are read. Under prefers-reduced-motion everything
 * renders at its final value immediately.
 */

const RED = "#C80000"
const AMBER = "#C2740B"
const GREEN = "#0E9F6E"
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"
const INK = "#14141A"
const BODY = "#5F5753"
const FAINT = "#A79E96"
const BORDER = "#ECE4DE"

const TONE: Record<OnboardingGuide["status"], { color: string; bg: string; line: string; icon: IconName; word: string }> = {
  comfortable: { color: GREEN, bg: "rgba(14,159,110,.07)", line: "rgba(14,159,110,.25)", icon: "done", word: "On track" },
  focused: { color: AMBER, bg: "rgba(194,116,11,.08)", line: "rgba(194,116,11,.26)", icon: "mission", word: "Tight but workable" },
  risky: { color: RED, bg: "rgba(200,0,0,.06)", line: "rgba(200,0,0,.22)", icon: "alert", word: "Short on time" },
}

const FIX_ICON: Record<GuideFix["kind"], IconName> = {
  minutes: "time",
  days: "calendar",
  sitting: "roadmap",
}

/** Count a number up once, so the shortfall lands as a figure rather than a label. */
function useCountUp(target: number, durationMs = 750): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? target : 0)
  useEffect(() => {
    if (reduced) { setValue(target); return }
    let raf = 0
    let t0 = 0
    const tick = (t: number) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / durationMs)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, reduced])
  return value
}

export function CapacityPlan({
  guide,
  onApplyFix,
  compact,
}: {
  guide: OnboardingGuide
  /** Applies the change and navigates to the step that owns it. */
  onApplyFix: (fix: GuideFix) => void
  compact?: boolean
}) {
  const reduced = useReducedMotion()
  const tone = TONE[guide.status]
  const hasDeadline = guide.availableWeeks !== null

  // Hours the plan actually protects before the exam, and what the paper wants.
  const protectedHours = hasDeadline ? Math.round((guide.availableWeeks as number) * guide.weeklyHours) : 0
  const shownDeficit = useCountUp(guide.deficitHours)
  // The bar is capped at 100% of the requirement; overshoot is not information.
  const pct = Math.max(4, Math.min(100, Math.round(guide.coverage * 100)))

  return (
    <div
      style={{
        marginBottom: 16,
        padding: compact ? "15px 16px" : "18px 20px",
        borderRadius: 17,
        background: tone.bg,
        border: `1px solid ${tone.line}`,
      }}
    >
      {/* Verdict */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
        <motion.span
          initial={reduced ? undefined : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          style={{
            width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: "grid", placeItems: "center",
            background: "#fff", border: `1px solid ${tone.line}`,
          }}
        >
          <Icon name={tone.icon} size={16} color={tone.color} strokeWidth={2.3} />
        </motion.span>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: `700 9.5px/1 ${MONO}`, letterSpacing: "0.13em", color: tone.color, textTransform: "uppercase" }}>
            Charles recommends · {tone.word}
          </div>
          <div style={{ marginTop: 5, font: `800 ${compact ? 14 : 15}px/1.25 ${SANS}`, color: INK }}>{guide.headline}</div>
        </div>
      </div>

      {/* Coverage graphic — only meaningful against a deadline. */}
      {hasDeadline && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, font: `700 10.5px/1 ${MONO}`, letterSpacing: "0.06em", color: FAINT }}>
            <span>YOUR {protectedHours}H PROTECTED</span>
            <span>{guide.recommendedHours}H NEEDED</span>
          </div>
          <div
            role="img"
            aria-label={`Your plan covers about ${pct}% of the ${guide.recommendedHours} hours ${guide.headline.toLowerCase()}`}
            style={{ position: "relative", height: 12, marginTop: 7, borderRadius: 999, background: "rgba(20,20,26,.07)", overflow: "hidden" }}
          >
            {/* scaleX, not width: width animates layout every frame, transform
                does not. transformOrigin left so it grows from the start. */}
            <motion.div
              initial={reduced ? { scaleX: pct / 100 } : { scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={reduced ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                position: "absolute", inset: 0, transformOrigin: "left center", borderRadius: 999,
                background: `linear-gradient(90deg, ${tone.color}, ${guide.status === "risky" ? "#E50068" : tone.color})`,
              }}
            />
          </div>
          {guide.deficitHours > 0 && (
            <div style={{ marginTop: 8, font: `600 12.5px/1.45 ${SANS}`, color: BODY }}>
              About{" "}
              <b style={{ color: tone.color, fontVariantNumeric: "tabular-nums" }}>{shownDeficit} hours</b>{" "}
              of the route has nowhere to go before your sitting.
            </div>
          )}
        </div>
      )}

      {/* Reasoning */}
      <div style={{ marginTop: 12, display: "grid", gap: 7 }}>
        {guide.advice.map((tip, i) => (
          <motion.div
            key={tip}
            initial={reduced ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.07, duration: 0.35 }}
            style={{ display: "flex", gap: 8, font: `500 12.5px/1.45 ${SANS}`, color: BODY }}
          >
            <span style={{ color: tone.color, flexShrink: 0 }}>●</span>
            {tip}
          </motion.div>
        ))}
      </div>

      {/* The fixes — the part that makes this a recommendation and not a warning. */}
      {guide.fixes.length > 0 && (
        <div style={{ marginTop: 15, paddingTop: 14, borderTop: `1px solid ${tone.line}` }}>
          <div style={{ font: `700 9.5px/1 ${MONO}`, letterSpacing: "0.13em", color: FAINT, textTransform: "uppercase" }}>
            Pick one — Charles will rebuild the plan
          </div>
          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {guide.fixes.map((fix, i) => (
              <motion.button
                key={fix.kind}
                type="button"
                onClick={() => onApplyFix(fix)}
                initial={reduced ? undefined : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileTap={reduced ? undefined : { scale: 0.985 }}
                whileHover={reduced ? undefined : { y: -1 }}
                style={{
                  display: "flex", alignItems: "center", gap: 11, width: "100%", textAlign: "left",
                  minHeight: 56, padding: "11px 13px", borderRadius: 14, cursor: "pointer",
                  background: "#fff", border: `1px solid ${BORDER}`, font: "inherit",
                  boxShadow: "0 10px 24px -20px rgba(20,20,26,.5)",
                }}
              >
                <span style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "grid", placeItems: "center", background: tone.bg }}>
                  <Icon name={FIX_ICON[fix.kind]} size={16} color={tone.color} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", font: `800 13.5px/1.25 ${SANS}`, color: INK }}>{fix.label}</span>
                  <span style={{ display: "block", marginTop: 2, font: `500 11.5px/1.4 ${SANS}`, color: FAINT }}>{fix.detail}</span>
                </span>
                <Icon name="chevron" size={15} color={FAINT} />
              </motion.button>
            ))}
          </div>
          {/*
            * Staying put is a legitimate choice and must not be hidden. Charles
            * plans to the exam date either way; what he cannot do is invent time
            * that is not there, and saying so is more useful than a nag.
            */}
          <div style={{ marginTop: 9, font: `500 11.5px/1.5 ${SANS}`, color: FAINT }}>
            Or continue as you are — the plan will still cover the highest-weighted
            areas first, and your diagnostic can remove work you already know.
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * The floor-of-the-picker nudge, shown on the daily-time step itself rather than
 * saved for the end — a learner who is going to change their answer should be
 * told while the control is still in front of them.
 */
export function MinutesNudge({ text }: { text: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      style={{
        marginTop: 11, padding: "13px 15px", borderRadius: 14,
        background: "rgba(194,116,11,.08)", border: "1px solid rgba(194,116,11,.26)",
        display: "flex", gap: 10, alignItems: "flex-start",
      }}
    >
      <Icon name="alert" size={16} color={AMBER} style={{ marginTop: 1 }} />
      <span style={{ font: `600 12.5px/1.5 ${SANS}`, color: "#6B4E12" }}>{text}</span>
    </motion.div>
  )
}
