import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { Icon, Card, C, SP, R, TYPE, type IconName } from "@/components/acca/ui"
import { projectPlan, shieldState, type SchedAction } from "@/lib/acca-schedule"
import { getPlan, daysUntilExam, daysSinceStart } from "@/lib/acca-plan"
import { getPaperStats } from "@/lib/acca"

/*
 * The learner's route to exam day: the distributed daily plan (study / practise
 * / flashcards / bank runs / mocks) laid out day by day from today to the
 * target date, sized to the daily time budget, plus the shield status that
 * keeps the streak alive across missed days. Read-only — it mirrors the engine
 * in acca-schedule, which re-paves the route whenever a day is missed.
 */

const EASE = [0.16, 1, 0.3, 1] as const

const KIND_ICON: Record<SchedAction, IconName> = {
  study: "study", essentials: "mission", practice: "practice", weak: "weak" as IconName, flashcards: "flashcards" as IconName,
  bank: "practice", mock: "mock" as IconName, diagnostic: "diagnostic",
}
const KIND_LABEL: Record<SchedAction, string> = {
  study: "Study", essentials: "Quizzes", practice: "Practise", weak: "Drill", flashcards: "Cards", bank: "Bank 50", mock: "Mock", diagnostic: "Diagnostic",
}
const PHASE_TINT: Record<string, string> = {
  learn: C.brand, strengthen: C.amber, revise: "#7C6BD6", rehearse: C.green,
}

export function PlanRoute({ paperId }: { paperId: string }) {
  const navigate = useNavigate()
  const days = daysUntilExam(paperId)
  const plan = getPlan(paperId)
  const route = useMemo(() => projectPlan(paperId, 14), [paperId])
  const shield = shieldState(paperId)
  const reduced = useReducedMotion()
  const stats = getPaperStats(paperId)
  const elapsed = daysSinceStart(paperId)

  const shortDate = (iso: string | null | undefined): string | null => {
    if (!iso) return null
    const d = new Date(`${iso}T00:00:00`)
    return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
  }
  const startLabel = shortDate(plan.startedAt)
  const examLabel = shortDate(plan.examDate) ?? "exam day"
  /* Share of the journey behind them. Clamped off both ends so the bar can
     never read 0% on day one (demoralising and untrue — they started) or
     overrun if a date moves. */
  const travelled =
    elapsed !== null && days !== null
      ? Math.min(0.97, Math.max(0.03, elapsed / Math.max(1, elapsed + days)))
      : 0

  /*
   * FOUR NUMBERS, chosen because each one answers a question a learner
   * actually asks — and each is actionable. Readiness against their own target
   * is the headline the whole product exists to move; the daily block is the
   * promise they made; questions answered is the evidence behind the readiness
   * figure, without which it is just a number.
   */
  const metrics: { icon: IconName; label: string; value: string; foot: string; tone: string }[] = [
    {
      icon: "stats",
      label: "Readiness",
      value: `${stats.readiness}%`,
      foot: stats.readiness >= plan.targetProb ? "target reached" : `${Math.max(0, plan.targetProb - stats.readiness)} to target`,
      tone: stats.readiness >= plan.targetProb ? C.green : C.brand,
    },
    { icon: "mission", label: "Daily block", value: `${plan.dailyMinutes} min`, foot: `${plan.dailyGoal} questions`, tone: C.brand },
    { icon: "practice", label: "Answered", value: String(stats.answered), foot: "questions so far", tone: C.brand },
    { icon: "trophy", label: "Target", value: `${plan.targetProb}%`, foot: "before exam day", tone: C.amber },
  ]

  // No target date yet → nudge to set one (that's what unlocks the route).
  if (!plan.examDate || days === null) {
    return (
      <Card style={{ marginBottom: SP.md, display: "flex", alignItems: "center", gap: SP.md, flexWrap: "wrap" }}>
        <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: C.brandSoft, display: "grid", placeItems: "center" }}>
          <Icon name="calendar" size={22} color={C.brand} />
        </span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>Set your exam date</div>
          <div style={{ fontSize: 12.5, color: C.soft, marginTop: 2 }}>Give Charles your sitting and daily time — he'll map every stage from today to race day.</div>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/settings")} style={{ padding: "11px 20px", borderRadius: R.lg, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontWeight: 750, fontSize: 13.5, cursor: "pointer" }}>
          Set date
        </motion.button>
      </Card>
    )
  }

  return (
    <Card style={{ marginBottom: SP.md }}>
      {/* ── THE JOURNEY: where it began, where you are, where it ends ──
          The old header was one line of three numbers and a streak pill. It
          could only say how far there is left to go — the half of the story
          that discourages. Distance travelled is the half that keeps people,
          and it was nowhere on the screen. */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: SP.md, flexWrap: "wrap" }}>
        <div>
          <span style={{ ...TYPE.label, color: C.faint }}>Your route to exam day</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{ fontSize: 30, fontWeight: 850, letterSpacing: "-0.03em", color: C.text, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
            >
              {days}
            </motion.span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: C.soft }}>
              {days === 1 ? "day to" : "days to"} {examLabel}
            </span>
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", borderRadius: R.pill, background: C.greenSoft, border: `1px solid ${C.green}`, whiteSpace: "nowrap" }}>
          <Icon name="streak" size={14} color={C.green} />
          <span style={{ fontSize: 12.5, fontWeight: 800, color: C.green }}>{shield.streak}-day streak</span>
        </span>
      </div>

      {/* The line of the whole journey. Fills from day one to today, with the
          two dates anchored at its ends — so the bar answers "how far have I
          come" and "how long have I got" in one glance. */}
      {startLabel && elapsed !== null && (
        <div style={{ marginTop: SP.md }}>
          <div style={{ position: "relative", height: 8, borderRadius: 99, background: C.card2, overflow: "hidden" }}>
            <motion.div
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: travelled }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
              style={{
                position: "absolute", inset: 0, transformOrigin: "left", borderRadius: 99,
                background: `linear-gradient(90deg, ${C.brand}, ${C.amber})`,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 7 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.faint }}>
              Started {startLabel} · day {elapsed + 1}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.faint }}>Exam day {examLabel}</span>
          </div>
        </div>
      )}

      {/* ── The four numbers that decide whether they pass ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(118px, 1fr))", gap: SP.sm, marginTop: SP.md, marginBottom: SP.md }}>
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
            style={{ borderRadius: R.lg, border: `1px solid ${C.border}`, background: C.card2, padding: "11px 13px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name={m.icon} size={13} color={m.tone} />
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.faint }}>{m.label}</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 850, color: C.text, marginTop: 6, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              {m.value}
            </div>
            <div style={{ fontSize: 10.5, color: C.faint, marginTop: 2 }}>{m.foot}</div>
          </motion.div>
        ))}
      </div>

      {/* horizontally-scrollable day strip */}
      <div style={{ display: "flex", gap: SP.sm, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
        {route.map((d, i) => (
          <motion.div
            key={d.dateISO}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.3) }}
            style={{
              flex: "none", width: 132, borderRadius: R.lg, padding: "11px 12px",
              background: d.isToday ? C.brandSoft : C.card2,
              border: `1px solid ${d.isToday ? C.brand : C.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: d.isToday ? C.brand : C.muted }}>
                {d.isToday ? "Today" : d.dow} <span style={{ color: C.faint, fontWeight: 600 }}>{d.dayOfMonth}</span>
              </span>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: PHASE_TINT[d.phase] ?? C.brand }} title={d.phaseLabel} />
            </div>
            <div style={{ display: "grid", gap: 5 }}>
              {d.tasks.map((t, ti) => (
                <div key={ti} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name={KIND_ICON[t.kind]} size={12} color={C.faint} />
                  <span style={{ fontSize: 11, fontWeight: 650, color: C.soft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{KIND_LABEL[t.kind]}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, color: C.faint }}>~{d.minutes} min</div>
          </motion.div>
        ))}
      </div>
      <p style={{ margin: "12px 0 0", fontSize: 11.5, color: C.faint, lineHeight: 1.5 }}>
        Miss a day — sick, busy, life? The route re-paves itself over the days that remain and a shield keeps your streak. No catch-up wall, ever.
      </p>
    </Card>
  )
}
