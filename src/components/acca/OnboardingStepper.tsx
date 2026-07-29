import { motion, useReducedMotion } from "motion/react"
import { Icon } from "@/components/acca/ui"

/*
 * OnboardingStepper — where you are, what you have answered, and a way back.
 *
 * WHAT IT REPLACED. A mono "5 / 8" and a plain progress bar. That tells you how
 * much is left but nothing about WHAT is left, and it offered no way back except
 * pressing Back repeatedly — so a learner who wanted to change their paper after
 * seeing the exam-date step had to guess how many taps that was.
 *
 * Answered steps are tappable; the current one is marked; steps ahead are inert
 * rather than hidden, so the shape of the remaining work is visible from the
 * start. That "known length" is what stops a multi-step form feeling open-ended,
 * which is the main reason people abandon them.
 *
 * The full labelled rail needs horizontal room, so below the `compact` threshold
 * it degrades to the counter plus the bar — the same information, without
 * cramming eight labels into 320px. The bar is scaleX, never width: animating
 * width re-lays-out the header on every frame of every step change.
 */

const RED = "#C80000"
const INK = "#14141A"
const MUTE = "#8B837C"
const FAINT = "#A79E96"
const TRACK = "#EDE5DF"
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

export function OnboardingStepper({
  labels,
  index,
  total,
  onJump,
  compact,
}: {
  /** Short label per VISIBLE step, in order. */
  labels: string[]
  /** Zero-based position within the visible steps. */
  index: number
  total: number
  /** Jump to a visible-step position. Only called for already-answered steps. */
  onJump: (visibleIndex: number) => void
  compact?: boolean
}) {
  const reduced = useReducedMotion()
  const pct = total > 0 ? (index + 1) / total : 0

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ font: `600 12px/1 ${MONO}`, color: MUTE, letterSpacing: "0.05em", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          aria-label={`Step ${index + 1} of ${total}${labels[index] ? `: ${labels[index]}` : ""}`}
          style={{ flex: 1, maxWidth: 340, height: 5, borderRadius: 99, background: TRACK, overflow: "hidden" }}
        >
          <motion.div
            initial={reduced ? { scaleX: pct } : { scaleX: 0 }}
            animate={{ scaleX: pct }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 26 }}
            style={{ height: "100%", width: "100%", transformOrigin: "left center", background: RED, borderRadius: 99 }}
          />
        </div>
        {/* The step's own name, so the counter means something even when the
            labelled rail below is hidden. */}
        {labels[index] && (
          <span style={{ font: `700 11.5px/1 ${SANS}`, color: INK, flexShrink: 0, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {labels[index]}
          </span>
        )}
      </div>

      {!compact && (
        <nav aria-label="Onboarding steps" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {labels.map((label, i) => {
            const done = i < index
            const current = i === index
            // Only completed steps are reachable. Jumping FORWARD would skip the
            // answer the next step needs, and canAdvance exists precisely to stop
            // that — a stepper that could bypass it would be a second, silent
            // route past every validation in the deck.
            const reachable = done
            return (
              <motion.button
                key={label}
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onJump(i)}
                aria-current={current ? "step" : undefined}
                whileTap={reachable && !reduced ? { scale: 0.97 } : undefined}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  minHeight: 30, padding: "6px 10px", borderRadius: 999,
                  font: `${current ? 800 : 600} 11px/1 ${SANS}`,
                  cursor: reachable ? "pointer" : "default",
                  color: current ? "#fff" : done ? INK : FAINT,
                  background: current ? RED : done ? "rgba(200,0,0,.07)" : "transparent",
                  border: `1px solid ${current ? RED : done ? "rgba(200,0,0,.2)" : TRACK}`,
                  // Opacity only on the inert ones — never a transform, so the
                  // rail cannot shift as the learner moves through it.
                  opacity: reachable || current ? 1 : 0.65,
                  fontFamily: SANS,
                }}
                title={done ? `Go back to: ${label}` : label}
              >
                {done && <Icon name="done" size={11} color={RED} strokeWidth={2.6} />}
                {label}
              </motion.button>
            )
          })}
        </nav>
      )}
    </div>
  )
}
