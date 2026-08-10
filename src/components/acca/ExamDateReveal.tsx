import { useEffect, useState } from "react"
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import CharlesMascot from "@/components/CharlesMascot"
import { Icon } from "@/components/acca/ui"

/* ──────────────────────────────────────────────────────────────
 *  "Your date is set."
 *
 *  buildOnboardingGuide() picks a recommended sitting and a target
 *  readiness from everything the learner just told us — and both
 *  were written straight into the plan without ever being said out
 *  loud. The single most committing fact in the product (there is
 *  a date, it is real, and it is yours) arrived as a field in
 *  localStorage.
 *
 *  This is that fact, given a beat. A date on a wall is what turns
 *  studying from a wish into a deadline, which is the entire
 *  psychology this product runs on.
 * ────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const
const BRAND = "#C80000"

function formatLong(iso: string): { day: string; month: string; year: string } | null {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString("en-GB", { month: "long" }),
    year: String(d.getFullYear()),
  }
}

export default function ExamDateReveal({
  examDate,
  target,
  daysAway,
  paperCode,
  onContinue,
}: {
  /** yyyy-MM-dd */
  examDate: string
  /** Target readiness %, the learner's own ambition. */
  target: number
  daysAway: number | null
  paperCode: string
  onContinue: () => void
}) {
  const reduced = useReducedMotion()
  const parts = formatLong(examDate)
  const [showCta, setShowCta] = useState(reduced)

  // Days counts UP to the real number — a figure that lands rather than one
  // that was simply printed. Same motion-value trick as the build ring, so it
  // animates without re-rendering.
  const dayCount = useMotionValue(0)
  const daysRounded = useTransform(dayCount, (v) => Math.round(v))
  const targetCount = useMotionValue(0)
  const targetRounded = useTransform(targetCount, (v) => Math.round(v))

  useEffect(() => {
    if (reduced) {
      dayCount.set(daysAway ?? 0)
      targetCount.set(target)
      return
    }
    const a = animate(dayCount, daysAway ?? 0, { duration: 1.1, delay: 0.75, ease: EASE })
    const b = animate(targetCount, target, { duration: 0.9, delay: 1.15, ease: EASE })
    const t = window.setTimeout(() => setShowCta(true), 1900)
    return () => {
      a.stop()
      b.stop()
      window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!parts) {
    // No usable date — never show an empty ceremony; hand straight on.
    return null
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        textAlign: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
        >
          <CharlesMascot pose="plan" size="clamp(84px, 26vw, 108px)" />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          style={{
            fontFamily: "ui-monospace, 'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 800,
            letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND,
          }}
        >
          Charles has set your date
        </motion.div>

        {/* The date itself. Scales in from slightly large with the blur coming
            off — it arrives rather than fades, which is the difference between
            a headline and an announcement. */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 1.14, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.75, ease: EASE }}
          style={{ marginTop: 14 }}
        >
          <div
            style={{
              fontSize: "clamp(46px, 15vw, 82px)", fontWeight: 850, letterSpacing: "-0.05em",
              lineHeight: 0.95, color: "var(--sch-text)", fontVariantNumeric: "tabular-nums",
            }}
          >
            {parts.day} {parts.month}
          </div>
          <div
            style={{
              fontSize: "clamp(17px, 5vw, 24px)", fontWeight: 700, letterSpacing: "0.02em",
              color: "var(--sch-tx-2)", marginTop: 4,
            }}
          >
            {parts.year} · {paperCode}
          </div>
        </motion.div>

        {/* Underline sweeps out from the centre, like a line drawn under a
            decision that has just been made. */}
        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 0.6, ease: EASE }}
          style={{
            height: 3, borderRadius: 99, margin: "18px auto 0", maxWidth: 210,
            background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
          }}
        />

        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(14px, 6vw, 34px)", marginTop: 22, flexWrap: "wrap" }}>
          {daysAway !== null && daysAway > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                <motion.span
                  style={{
                    fontSize: "clamp(26px, 8vw, 34px)", fontWeight: 850, letterSpacing: "-0.03em",
                    color: "var(--sch-text)", fontVariantNumeric: "tabular-nums", lineHeight: 1,
                  }}
                >
                  {daysRounded}
                </motion.span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sch-tx-2)" }}>days</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sch-tx-2)", marginTop: 6 }}>
                to prepare
              </div>
            </div>
          )}

          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
              <motion.span
                style={{
                  fontSize: "clamp(26px, 8vw, 34px)", fontWeight: 850, letterSpacing: "-0.03em",
                  color: BRAND, fontVariantNumeric: "tabular-nums", lineHeight: 1,
                }}
              >
                {targetRounded}
              </motion.span>
              <span style={{ fontSize: 15, fontWeight: 800, color: BRAND }}>%</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sch-tx-2)", marginTop: 6 }}>
              your target
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: showCta ? 1 : 0, y: showCta ? 0 : 10 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ marginTop: 30, pointerEvents: showCta ? "auto" : "none" }}
        >
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--sch-tx-2)", margin: "0 0 16px" }}>
            Every day between now and then has a job. Here’s what they are.
          </p>
          <motion.button
            type="button"
            onClick={onContinue}
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.16 }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              minHeight: 50, padding: "0 26px", borderRadius: 14, border: "none", cursor: "pointer",
              background: BRAND, color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "inherit",
            }}
          >
            Show me the plan <Icon name="arrow" size={17} color="#fff" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
