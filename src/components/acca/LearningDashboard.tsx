import { useEffect, useMemo, useRef } from "react"
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { Icon, type IconName } from "@/components/acca/ui"
import { getPaperStats } from "@/lib/acca"
import { getPlan } from "@/lib/acca-plan"
import { shieldState } from "@/lib/acca-schedule"
import { STREAK_CYCLE, STREAK_PRIZES, streakProgress } from "@/lib/acca-streak"
import { strengthEmptyLine, strengthSplit } from "@/lib/acca-strengths"

/* ──────────────────────────────────────────────────────────────
 *  THE LEARNING DASHBOARD — the one block that answers "how am
 *  I doing?" without the learner having to go anywhere.
 *
 *  It replaces the "Start here — learn the basics" card, which
 *  said the same thing to someone on day 40 as on day 1.
 *
 *  Four rings, because these are the four questions people
 *  actually ask, and each is a fraction of something real rather
 *  than a bare number:
 *
 *    Readiness  — where you are against YOUR target
 *    Daily block— today's minutes against the promise you made
 *    Answered   — questions against the plan's own daily goal
 *    Target     — the line itself, on the same scale as readiness
 *
 *  Then the lap: thirty days, the four prizes on it, and the two
 *  sections you are best and worst at. Nothing here is invented —
 *  every figure comes from the same functions the scheduler uses.
 * ────────────────────────────────────────────────────────────── */

const C = {
  text: "var(--sch-text)",
  soft: "var(--sch-tx-1)",
  faint: "var(--sch-tx-2)",
  dim: "var(--sch-tx-4)",
  card: "var(--sch-card, #fff)",
  card2: "var(--sch-card-2)",
  border: "var(--sch-border, #ECE4DE)",
  brand: "#C80000",
  green: "#0E9F6E",
  amber: "#B45309",
  track: "rgba(120,110,100,0.14)",
}
const SANS = "'Plus Jakarta Sans', sans-serif"

/* ── One ring ─────────────────────────────────────────────────
 * The arc and the digits are driven by the SAME motion value, so a
 * number can never disagree with the shape beside it. */
function MetricRing({
  label, value, suffix, foot, fraction, color, icon, delay,
}: {
  label: string
  value: number
  suffix?: string
  foot: string
  /** 0…1 — how far round the arc goes. */
  fraction: number
  color: string
  icon: IconName
  delay: number
}) {
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)
  const shown = useTransform(mv, (v) => Math.round(v))
  const arc = useMotionValue(0)
  const started = useRef(false)

  useEffect(() => {
    const target = Math.max(0, Math.min(1, fraction))
    if (reduced) {
      mv.set(value)
      arc.set(target)
      return
    }
    // First paint counts up from zero; later changes ease from wherever it is,
    // so a value that ticks up mid-session does not restart the whole sweep.
    const from = started.current ? undefined : 0
    started.current = true
    const a = animate(mv, value, { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1], ...(from !== undefined ? { from } : {}) })
    const b = animate(arc, target, { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1], ...(from !== undefined ? { from } : {}) })
    return () => { a.stop(); b.stop() }
  }, [value, fraction, reduced, delay, mv, arc])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 0 }}>
      <div style={{ position: "relative", width: "clamp(84px, 21vw, 104px)", aspectRatio: "1" }}>
        <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" stroke={C.track} strokeWidth="9" />
          <motion.circle
            cx="60" cy="60" r="52" fill="none" stroke={color}
            strokeWidth="9" strokeLinecap="round" style={{ pathLength: arc }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", color: C.text }}>
            <motion.span style={{ font: `850 clamp(18px, 5vw, 23px)/1 ${SANS}`, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
              {shown}
            </motion.span>
            {suffix && <span style={{ font: `800 11px/1 ${SANS}`, opacity: 0.55, marginLeft: 1 }}>{suffix}</span>}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <Icon name={icon} size={11} color={color} />
          <span style={{ font: `750 11.5px/1 ${SANS}`, color: C.text }}>{label}</span>
        </div>
        <div style={{ font: `600 10.5px/1.3 ${SANS}`, color: C.dim, marginTop: 3 }}>{foot}</div>
      </div>
    </div>
  )
}

/* ── The lap ──────────────────────────────────────────────────
 * A bigger ring with the four prizes marked ON it, so the next one
 * is a place you can see rather than a number in a sentence. */
function StreakLap({ streak }: { streak: number }) {
  const reduced = useReducedMotion()
  const p = streakProgress(streak)
  const arc = useMotionValue(0)
  const day = useMotionValue(0)
  const dayShown = useTransform(day, (v) => Math.round(v))

  useEffect(() => {
    if (reduced) { arc.set(p.fraction); day.set(p.cycleDay); return }
    const a = animate(arc, p.fraction, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    const b = animate(day, p.cycleDay, { duration: 1.0, ease: [0.22, 1, 0.36, 1] })
    return () => { a.stop(); b.stop() }
  }, [p.fraction, p.cycleDay, reduced, arc, day])

  const R = 52
  const CIRC = 2 * Math.PI * R

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ position: "relative", width: "clamp(116px, 30vw, 140px)", aspectRatio: "1", flex: "none" }}>
        <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
          <circle cx="60" cy="60" r={R} fill="none" stroke={C.track} strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke={C.brand}
            strokeWidth="10" strokeLinecap="round" style={{ pathLength: arc }}
          />
          {/* Prize markers, drawn as short gaps in a ring above the arc so each
              one reads as a gate on the track rather than a floating dot. */}
          {STREAK_PRIZES.map((prize) => {
            const at = (prize.day / STREAK_CYCLE) * CIRC
            const done = p.cycleDay >= prize.day
            return (
              <circle
                key={prize.day}
                cx="60" cy="60" r={R} fill="none"
                stroke={done ? "#fff" : C.dim}
                strokeWidth="10"
                strokeDasharray={`2 ${CIRC}`}
                strokeDashoffset={-at + 1}
                opacity={done ? 0.95 : 0.5}
              />
            )
          })}
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", color: C.text }}>
            <motion.span style={{ font: `850 clamp(24px, 7vw, 32px)/1 ${SANS}`, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
              {dayShown}
            </motion.span>
            <span style={{ font: `800 13px/1 ${SANS}`, opacity: 0.5 }}>/{STREAK_CYCLE}</span>
          </div>
          <div style={{ font: `750 9px/1 ${SANS}`, letterSpacing: "0.14em", textTransform: "uppercase", color: C.faint, marginTop: 6 }}>
            Day streak
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 190 }}>
        <div style={{ font: `800 13.5px/1.35 ${SANS}`, color: C.text, marginBottom: 3 }}>
          {p.cycleDay === 0
            ? "Start your first lap today."
            : p.next
              ? `${p.daysToNext} ${p.daysToNext === 1 ? "day" : "days"} to ${p.next.name}.`
              : "Lap complete — a new one starts tomorrow."}
        </div>
        <div style={{ font: `500 11.5px/1.45 ${SANS}`, color: C.dim, marginBottom: 10 }}>
          {p.lapsDone > 0 && `${p.lapsDone} full ${p.lapsDone === 1 ? "lap" : "laps"} done · `}
          {p.streak} consecutive {p.streak === 1 ? "day" : "days"}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STREAK_PRIZES.map((prize, i) => {
            const done = p.cycleDay >= prize.day
            return (
              <motion.div
                key={prize.day}
                initial={reduced ? false : { opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: reduced ? 0 : 0.25 + i * 0.06, type: "spring", stiffness: 300, damping: 22 }}
                title={prize.blurb}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "5px 9px", borderRadius: 999,
                  background: done ? "rgba(14,159,110,0.12)" : C.card2,
                  border: `1px solid ${done ? C.green : C.border}`,
                }}
              >
                {/* Not colour alone — earned prizes carry a tick. */}
                <Icon name={done ? "done" : "lock"} size={11} color={done ? C.green : C.dim} />
                <span style={{ font: `750 10.5px/1 ${SANS}`, color: done ? C.green : C.faint }}>
                  {prize.day}d · {prize.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Best and weakest section ─────────────────────────────── */
function StrengthRow({ split }: { split: ReturnType<typeof strengthSplit> }) {
  if (!split.best) {
    return (
      <div style={{ font: `500 12px/1.5 ${SANS}`, color: C.dim }}>
        {strengthEmptyLine(split)}
      </div>
    )
  }
  const rows = [
    { key: "best", tone: C.green, icon: "trophy" as IconName, cap: "Strongest section", area: split.best },
    ...(split.worst ? [{ key: "worst", tone: C.amber, icon: "weak" as IconName, cap: "Needs the most work", area: split.worst }] : []),
  ]
  return (
    <div style={{ display: "grid", gridTemplateColumns: rows.length > 1 ? "repeat(auto-fit, minmax(190px, 1fr))" : "1fr", gap: 10 }}>
      {rows.map((r, i) => (
        <motion.div
          key={r.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
          style={{ display: "flex", gap: 10, alignItems: "center", padding: "11px 13px", borderRadius: 13, background: C.card2, border: `1px solid ${C.border}` }}
        >
          <span style={{ flex: "none", width: 32, height: 32, borderRadius: 10, display: "grid", placeItems: "center", background: C.card }}>
            <Icon name={r.icon} size={15} color={r.tone} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ font: `700 9.5px/1 ${SANS}`, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dim }}>{r.cap}</div>
            <div style={{ font: `800 13px/1.3 ${SANS}`, color: C.text, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.area.code} · {r.area.label}
            </div>
            <div style={{ font: `600 11px/1 ${SANS}`, color: r.tone, marginTop: 3, fontVariantNumeric: "tabular-nums" }}>
              {r.area.accuracy}% <span style={{ color: C.dim, fontWeight: 500 }}>over {r.area.answered} answers</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function LearningDashboard({
  paperId,
  /** Rendered under the rings — lets the Dashboard keep its route-specific CTA. */
  children,
}: {
  paperId: string
  children?: React.ReactNode
}) {
  const plan = getPlan(paperId)
  const stats = useMemo(() => getPaperStats(paperId), [paperId])
  const shield = shieldState(paperId)
  const split = useMemo(() => strengthSplit(stats.areas), [stats.areas])

  const readiness = Math.round(stats.readiness ?? 0)
  const target = plan.targetProb
  const answered = stats.answered ?? 0
  const goal = Math.max(1, plan.dailyGoal)

  const rings = [
    {
      icon: "stats" as IconName, label: "Readiness", value: readiness, suffix: "%",
      // Against their OWN target, not against 100 — the ring fills when they are
      // ready, which is the only definition of ready this product uses.
      fraction: readiness / Math.max(1, target),
      foot: readiness >= target ? "target reached" : `${Math.max(0, target - readiness)} to target`,
      color: readiness >= target ? C.green : C.brand,
    },
    {
      icon: "mission" as IconName, label: "Daily block", value: plan.dailyMinutes, suffix: "m",
      // Against 120, the longest block onboarding offers.
      fraction: plan.dailyMinutes / 120,
      foot: `${goal} questions`, color: C.brand,
    },
    {
      icon: "practice" as IconName, label: "Answered", value: answered, suffix: "",
      fraction: Math.min(1, answered / (goal * STREAK_CYCLE)),
      foot: "questions so far", color: C.brand,
    },
    {
      icon: "trophy" as IconName, label: "Target", value: target, suffix: "%",
      fraction: target / 100, foot: "before exam day", color: C.amber,
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(94px, 1fr))", gap: 12 }}
        role="group"
        aria-label="Your learning at a glance"
      >
        {rings.map((r, i) => <MetricRing key={r.label} {...r} delay={i * 0.08} />)}
      </div>

      {/* Screen readers get the same four facts as one sentence — four rings
          announced as four progressbars is noise, not information. */}
      <p style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        Readiness {readiness}% against a {target}% target. Daily block {plan.dailyMinutes} minutes, {goal} questions.
        {answered} questions answered so far. Day {streakProgress(shield.streak).cycleDay} of {STREAK_CYCLE} on your streak.
      </p>

      <div style={{ height: 1, background: C.border }} />
      <StreakLap streak={shield.streak} />
      <div style={{ height: 1, background: C.border }} />
      <StrengthRow split={split} />

      {children}
    </div>
  )
}

/* Celebration is deliberately NOT here. A prize that fires on every dashboard
   render is wallpaper; it belongs on the day the streak actually ticks over,
   which is recordDayActive's business, not this component's. */
