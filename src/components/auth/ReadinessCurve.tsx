import { useId } from "react"
import { motion, useReducedMotion } from "motion/react"

/* ──────────────────────────────────────────────────────────────
 *  The sentence above this says "know your chance of passing —
 *  and how to raise it". This draws the second half of it.
 *
 *  It shows the readiness score climbing toward a target as
 *  practice accumulates: the actual mechanic of the product, not
 *  a marketing claim. That distinction is deliberate and the
 *  caption states it — a chart implying "our students pass 87%"
 *  would be an outcome we have no data for, on the first screen
 *  a stranger sees, and the one thing they would remember if it
 *  turned out to be untrue.
 *
 *  So: no invented statistics. The curve is labelled illustrative,
 *  and everything it claims is true by construction — readiness
 *  rises as you answer, and the target is the one the learner
 *  themselves picks at onboarding.
 * ────────────────────────────────────────────────────────────── */

/** Weekly readiness on a steady daily habit — rising, then flattening as the
 *  easy gains run out. Shaped like real spaced practice, not a straight line. */
const SERIES = [18, 24, 31, 39, 46, 53, 59, 65, 69, 73, 76, 79]
const TARGET = 75

const W = 300
const H = 116
const PAD_X = 8
const PAD_TOP = 12
const PAD_BOTTOM = 20

const BRAND = "#C80000"

function pointAt(index: number, value: number): [number, number] {
  const x = PAD_X + (index / (SERIES.length - 1)) * (W - PAD_X * 2)
  const y = PAD_TOP + (1 - value / 100) * (H - PAD_TOP - PAD_BOTTOM)
  return [x, y]
}

/** Catmull-Rom-ish smoothing — a study curve is not a set of straight segments. */
function linePath(values: number[]): string {
  const pts = values.map((v, i) => pointAt(i, v))
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[i + 1]
    const cx = (x0 + x1) / 2
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`
  }
  return d
}

export default function ReadinessCurve() {
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, "")
  const line = linePath(SERIES)
  const [lastX, lastY] = pointAt(SERIES.length - 1, SERIES[SERIES.length - 1])
  const targetY = PAD_TOP + (1 - TARGET / 100) * (H - PAD_TOP - PAD_BOTTOM)
  const area = `${line} L ${lastX} ${H - PAD_BOTTOM} L ${PAD_X} ${H - PAD_BOTTOM} Z`

  return (
    <figure style={{ margin: "18px 0 0", maxWidth: 340 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Illustration: an exam readiness score rising week by week with daily practice, crossing a 75 percent target around week ten."
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND} stopOpacity="0.20" />
            <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Baseline and target: recessive, so the data is the loudest thing here. */}
        <line x1={PAD_X} y1={H - PAD_BOTTOM} x2={W - PAD_X} y2={H - PAD_BOTTOM} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
        <line x1={PAD_X} y1={targetY} x2={W - PAD_X} y2={targetY} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4" />
        <text x={W - PAD_X} y={targetY - 5} textAnchor="end" fontSize="8.5" fill="currentColor" fillOpacity="0.5" fontWeight="700" letterSpacing="0.06em">
          YOUR TARGET
        </text>

        {/* Area first, so the stroke sits on top of its own fill. */}
        <motion.path
          d={area}
          fill={`url(#fill-${uid})`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
        />

        {/* The curve draws itself — the one animation that IS the message:
            the line is built over time, exactly like the score it represents. */}
        <motion.path
          d={line}
          fill="none"
          stroke={BRAND}
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={reduced ? { pathLength: 1 } : undefined}
        />

        {/* Where they end up — arrives only once the line has got there. */}
        <motion.circle
          cx={lastX}
          cy={lastY}
          r="4"
          fill={BRAND}
          stroke="var(--sch-bg, #fff)"
          strokeWidth="2"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: reduced ? 0 : 1.45, type: "spring", stiffness: 380, damping: 18 }}
          style={{ transformOrigin: `${lastX}px ${lastY}px` }}
        />

        <text x={PAD_X} y={H - 6} fontSize="8.5" fill="currentColor" fillOpacity="0.45" fontWeight="600" letterSpacing="0.06em">
          WEEK 1
        </text>
        <text x={W - PAD_X} y={H - 6} textAnchor="end" fontSize="8.5" fill="currentColor" fillOpacity="0.45" fontWeight="600" letterSpacing="0.06em">
          WEEK 12
        </text>
      </svg>

      <figcaption style={{ fontSize: 11.5, lineHeight: 1.5, color: "var(--sch-tx-2)", marginTop: 8, opacity: 0.85 }}>
        Your Exam Readiness Score, rebuilt from every answer you give — and the daily plan that moves it.
        <span style={{ display: "block", opacity: 0.75, marginTop: 2 }}>Illustrative. Your own score comes from your own practice.</span>
      </figcaption>
    </figure>
  )
}
