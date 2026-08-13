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
 *  ── WHY THIS IS ONE HERO METRIC AND NOT FOUR RINGS ──────────
 *
 *  It was four identical rings: Readiness, Daily block, Answered,
 *  Target. Four equal arcs imply four comparable progressions, and
 *  only ONE of them is progress:
 *
 *    Readiness    — genuinely a fraction of a goal
 *    Daily block  — a SETTING the learner chose (75 minutes)
 *    Target       — a SETTING the learner chose (75%)
 *    Answered     — a running count with no natural ceiling
 *
 *  Drawing a setting as a part-filled arc says "you are 62% of the
 *  way to a 120-minute study day", which is not a thing anyone is
 *  trying to achieve. And on day one all four read zero, so the
 *  first thing a new learner ever saw was four empty circles —
 *  the blank-chart anti-pattern, arriving at the least forgiving
 *  possible moment.
 *
 *  So: readiness becomes ONE large arc with the target marked on
 *  it as a gate, because "where am I against my line" is the only
 *  question with a shape. The other three become compact tiles
 *  with a value, a label and a meter ONLY where a fraction is real.
 *  Hierarchy now comes from size and position rather than colour.
 *
 *  ── RESPONSIVE ──────────────────────────────────────────────
 *  Real media queries via an injected <style>, following
 *  dashboard-layout.tsx. clamp() alone cannot reflow a two-column
 *  desktop layout into a stacked mobile one, and the previous
 *  auto-fit grid at minmax(94px) produced a ragged 3+1 wrap at
 *  common phone widths.
 *
 *  Every figure still comes from the same functions the scheduler
 *  uses — nothing here is invented.
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

/* Motion tokens, so every animation in the block shares one rhythm.
 * Micro-interactions sit in the 150–300ms band; the arc is the one
 * deliberately longer move because it is the block's single focal point. */
const EASE = [0.22, 1, 0.36, 1] as const
const T_ARC = 0.95
const T_TILE = 0.28
const STAGGER = 0.045

const CSS = `
.ld-top { display: grid; grid-template-columns: 1fr; gap: 12px; }
.ld-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.ld-lap { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: center; }
.ld-prizes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.ld-strength { display: grid; grid-template-columns: 1fr; gap: 10px; }

/* 560px is where two stat columns stop feeling cramped rather than a
   device width — the block is also rendered inside a narrower card. */
@media (min-width: 560px) {
  .ld-prizes { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .ld-strength { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 760px) {
  .ld-top { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 14px; }
  .ld-tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ld-lap { grid-template-columns: auto minmax(0, 1fr); gap: 20px; }
}
`

/* ── The hero arc ─────────────────────────────────────────────
 * Readiness against the learner's own target, with the target drawn
 * ON the track as a gate. The arc and the digits are driven by the
 * SAME motion value, so the number can never disagree with the shape. */
function ReadinessArc({
  readiness, target, answered,
}: { readiness: number; target: number; answered: number }) {
  /* A three-quarter arc rather than a full ring: the gap gives the
     figure somewhere to sit and makes the target gate legible near
     the end of the track instead of colliding with the start.

     These are declared ABOVE the hooks, and must stay there. useTransform
     runs its transformer synchronously during render to seed the returned
     value, so a transformer closing over a `const` declared further down the
     function body reads it inside the temporal dead zone and throws
     "Cannot access 'SWEEP' before initialization" on EVERY render — which
     took the whole Dashboard to the error boundary, whose only offer is a
     reload that crashes again. TypeScript cannot see it (the read is inside a
     closure) so `npm run typecheck` passed. */
  const R = 54
  const SWEEP = 0.75
  const CIRC = 2 * Math.PI * R

  const reduced = useReducedMotion()
  const pct = useMotionValue(0)
  const shown = useTransform(pct, (v) => Math.round(v))
  const arc = useMotionValue(0)
  const started = useRef(false)

  const hit = readiness >= target
  const tone = hit ? C.green : C.brand
  const fraction = Math.max(0, Math.min(1, readiness / Math.max(1, target)))

  /* Hoisted out of the JSX: a hook inside the returned markup happens to work
     but breaks the moment the element is wrapped in a condition or a map. */
  const drawn = useTransform(arc, (v) => v * SWEEP)

  useEffect(() => {
    if (reduced) { pct.set(readiness); arc.set(fraction); return }
    const from = started.current ? undefined : 0
    started.current = true
    const a = animate(pct, readiness, { duration: T_ARC, ease: EASE, ...(from !== undefined ? { from } : {}) })
    const b = animate(arc, fraction, { duration: T_ARC + 0.15, ease: EASE, ...(from !== undefined ? { from } : {}) })
    return () => { a.stop(); b.stop() }
  }, [readiness, fraction, reduced, pct, arc])

  const gate = Math.min(1, target / 100) // the target's own place on a 0–100 track

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: 14, borderRadius: 16,
        background: C.card2, border: `1px solid ${C.border}`,
      }}
    >
      <div style={{ position: "relative", width: "clamp(96px, 26vw, 116px)", aspectRatio: "1", flex: "none" }}>
        <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block", transform: "rotate(135deg)" }} aria-hidden>
          <circle
            cx="60" cy="60" r={R} fill="none" stroke={C.track} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${CIRC * SWEEP} ${CIRC}`}
          />
          {/* The target gate, on the track and under the fill, so passing it
              reads as covering it rather than as a floating marker. */}
          <circle
            cx="60" cy="60" r={R} fill="none" stroke={C.dim} strokeWidth="10"
            strokeDasharray={`2 ${CIRC}`} strokeDashoffset={-CIRC * SWEEP * gate} opacity={0.55}
          />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke={tone} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${CIRC * SWEEP} ${CIRC}`}
            style={{ pathLength: drawn }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", color: C.text }}>
            <motion.span style={{ font: `850 clamp(26px, 7vw, 34px)/1 ${SANS}`, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
              {shown}
            </motion.span>
            <span style={{ font: `800 14px/1 ${SANS}`, opacity: 0.5 }}>%</span>
          </div>
          <div style={{ font: `750 8.5px/1 ${SANS}`, letterSpacing: "0.14em", textTransform: "uppercase", color: C.faint, marginTop: 5 }}>
            Readiness
          </div>
        </div>
      </div>

      <div style={{ minWidth: 0, flex: 1 }}>
        {/* Not colour alone — the state carries an icon and a word. */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <Icon name={hit ? "done" : "stats"} size={13} color={tone} />
          <span style={{ font: `800 12px/1 ${SANS}`, color: tone }}>
            {hit ? "Target reached" : answered === 0 ? "Not measured yet" : `${Math.max(0, target - readiness)} points to target`}
          </span>
        </div>
        <div style={{ font: `500 11.5px/1.5 ${SANS}`, color: C.dim }}>
          {answered === 0
            /* The empty state says what to DO. A 0% with no explanation is the
               blank-chart anti-pattern, and day one is when it lands hardest. */
            ? "Answer your first questions and this starts tracking against your target."
            : hit
              ? `You are past your ${target}% target. Keep the streak to hold it.`
              : `Your target is ${target}%. The gate on the ring is where that sits.`}
        </div>
      </div>
    </div>
  )
}

/* ── A supporting tile ────────────────────────────────────────
 * A value and a label. The meter appears ONLY when `fraction` is a
 * real proportion of a real goal — a setting gets no meter, because
 * a part-filled bar under a number the learner chose implies they
 * are failing to reach their own preference. */
function StatTile({
  icon, label, value, suffix, foot, fraction, tone, delay,
}: {
  icon: IconName
  label: string
  value: number
  suffix?: string
  foot: string
  fraction?: number
  tone: string
  delay: number
}) {
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)
  const shown = useTransform(mv, (v) => Math.round(v))
  const bar = useMotionValue(0)
  const started = useRef(false)

  useEffect(() => {
    const f = fraction === undefined ? 0 : Math.max(0, Math.min(1, fraction))
    if (reduced) { mv.set(value); bar.set(f); return }
    const from = started.current ? undefined : 0
    started.current = true
    const a = animate(mv, value, { duration: 0.7, delay, ease: EASE, ...(from !== undefined ? { from } : {}) })
    const b = animate(bar, f, { duration: 0.8, delay: delay + 0.05, ease: EASE, ...(from !== undefined ? { from } : {}) })
    return () => { a.stop(); b.stop() }
  }, [value, fraction, reduced, delay, mv, bar])

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: T_TILE, ease: EASE }}
      style={{
        padding: "11px 12px", borderRadius: 14,
        background: C.card2, border: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column", gap: 7, minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
        <Icon name={icon} size={11} color={tone} />
        <span
          style={{
            font: `750 10.5px/1 ${SANS}`, color: C.faint,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", color: C.text }}>
        <motion.span style={{ font: `850 clamp(17px, 4.6vw, 21px)/1 ${SANS}`, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
          {shown}
        </motion.span>
        {suffix && <span style={{ font: `800 10.5px/1 ${SANS}`, opacity: 0.5, marginLeft: 1 }}>{suffix}</span>}
      </div>

      {fraction !== undefined && (
        <div style={{ height: 3, borderRadius: 99, background: C.track, overflow: "hidden" }} aria-hidden>
          {/* scaleX rather than width — transform-only, so the meter cannot
              trigger layout on a device already busy painting the arc. */}
          <motion.div
            style={{ height: "100%", borderRadius: 99, background: tone, transformOrigin: "left", scaleX: bar }}
          />
        </div>
      )}

      <div
        style={{
          font: `500 10px/1.35 ${SANS}`, color: C.dim,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}
      >
        {foot}
      </div>
    </motion.div>
  )
}

/* ── The lap ──────────────────────────────────────────────────
 * Thirty days with the four prizes marked ON the ring, so the next
 * one is a place you can see rather than a number in a sentence. */
function StreakLap({ streak }: { streak: number }) {
  const reduced = useReducedMotion()
  const p = streakProgress(streak)
  const arc = useMotionValue(0)
  const day = useMotionValue(0)
  const dayShown = useTransform(day, (v) => Math.round(v))

  useEffect(() => {
    if (reduced) { arc.set(p.fraction); day.set(p.cycleDay); return }
    const a = animate(arc, p.fraction, { duration: T_ARC + 0.15, ease: EASE })
    const b = animate(day, p.cycleDay, { duration: T_ARC, ease: EASE })
    return () => { a.stop(); b.stop() }
  }, [p.fraction, p.cycleDay, reduced, arc, day])

  const R = 52
  const CIRC = 2 * Math.PI * R

  return (
    <div className="ld-lap">
      <div style={{ position: "relative", width: "clamp(104px, 27vw, 124px)", aspectRatio: "1", flex: "none", justifySelf: "center" }}>
        <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden>
          <circle cx="60" cy="60" r={R} fill="none" stroke={C.track} strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke={C.brand}
            strokeWidth="10" strokeLinecap="round" style={{ pathLength: arc }}
          />
          {/* Prize gates: short gaps in a ring above the arc, so each reads as a
              gate on the track rather than a floating dot. */}
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
            <motion.span style={{ font: `850 clamp(23px, 6.4vw, 30px)/1 ${SANS}`, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
              {dayShown}
            </motion.span>
            <span style={{ font: `800 12.5px/1 ${SANS}`, opacity: 0.5 }}>/{STREAK_CYCLE}</span>
          </div>
          <div style={{ font: `750 8.5px/1 ${SANS}`, letterSpacing: "0.14em", textTransform: "uppercase", color: C.faint, marginTop: 5 }}>
            Day streak
          </div>
        </div>
      </div>

      <div style={{ minWidth: 0 }}>
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

        {/* A fixed 2-up then 4-up grid rather than flex-wrap: wrapping put
            three chips on one line and one orphan below at common widths. */}
        <div className="ld-prizes">
          {STREAK_PRIZES.map((prize, i) => {
            const done = p.cycleDay >= prize.day
            return (
              <motion.div
                key={prize.day}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.2 + i * STAGGER, duration: T_TILE, ease: EASE }}
                title={prize.blurb}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  padding: "6px 8px", borderRadius: 10, minWidth: 0,
                  background: done ? "rgba(14,159,110,0.12)" : C.card2,
                  border: `1px solid ${done ? C.green : C.border}`,
                }}
              >
                {/* Not colour alone — earned prizes carry a tick. */}
                <Icon name={done ? "done" : "lock"} size={10} color={done ? C.green : C.dim} />
                <span
                  style={{
                    font: `750 10px/1 ${SANS}`, color: done ? C.green : C.faint,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}
                >
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
  const reduced = useReducedMotion()
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
    <div className="ld-strength">
      {rows.map((r, i) => (
        <motion.div
          key={r.key}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.1 + i * 0.06, duration: T_TILE, ease: EASE }}
          style={{ display: "flex", gap: 10, alignItems: "center", padding: "11px 13px", borderRadius: 14, background: C.card2, border: `1px solid ${C.border}`, minWidth: 0 }}
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
  /** Rendered under the block — lets the Dashboard keep its route-specific CTA. */
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
  const lap = streakProgress(shield.streak)

  const tiles = [
    {
      icon: "mission" as IconName, label: "Daily block", value: plan.dailyMinutes, suffix: "m",
      // No meter: this is the learner's own committed figure, not progress
      // toward anything. A part-filled bar here would invent a shortfall.
      foot: `${goal} questions a day`, tone: C.brand,
    },
    {
      icon: "practice" as IconName, label: "Answered", value: answered, suffix: "",
      // A real fraction: questions against what a full lap asks for.
      fraction: Math.min(1, answered / (goal * STREAK_CYCLE)),
      foot: `of ${goal * STREAK_CYCLE} this lap`, tone: C.brand,
    },
    {
      icon: "streak" as IconName, label: "Streak", value: lap.cycleDay, suffix: `/${STREAK_CYCLE}`,
      fraction: lap.fraction,
      foot: lap.cycleDay === 0 ? "not started" : `${shield.streak} days running`, tone: C.amber,
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{CSS}</style>

      <div className="ld-top" role="group" aria-label="Your learning at a glance">
        <ReadinessArc readiness={readiness} target={target} answered={answered} />
        <div className="ld-tiles">
          {tiles.map((t, i) => <StatTile key={t.label} {...t} delay={0.12 + i * STAGGER} />)}
        </div>
      </div>

      {/* Screen readers get the same facts as one sentence — a hero arc plus
          three tiles announced as four progressbars is noise, not information. */}
      <p style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        Readiness {readiness}% against a {target}% target
        {answered === 0 ? ", not yet measured" : ""}. Daily block {plan.dailyMinutes} minutes, {goal} questions.
        {answered} questions answered so far. Day {lap.cycleDay} of {STREAK_CYCLE} on your streak.
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
