import { useMemo } from "react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { Icon, Card, C, SP, R, TYPE, type IconName } from "@/components/acca/ui"
import { projectPlan, shieldState, type SchedAction } from "@/lib/acca-schedule"
import { getPlan, daysUntilExam } from "@/lib/acca-plan"

/*
 * The learner's route to exam day: the distributed daily plan (study / practise
 * / flashcards / bank runs / mocks) laid out day by day from today to the
 * target date, sized to the daily time budget, plus the shield status that
 * keeps the streak alive across missed days. Read-only — it mirrors the engine
 * in acca-schedule, which re-paves the route whenever a day is missed.
 */

const KIND_ICON: Record<SchedAction, IconName> = {
  study: "study", essentials: "mission", practice: "practice", weak: "weak" as IconName, flashcards: "flashcards" as IconName,
  bank: "practice", mock: "mock" as IconName, diagnostic: "diagnostic",
}
const KIND_LABEL: Record<SchedAction, string> = {
  study: "Study", essentials: "Essentials", practice: "Practise", weak: "Drill", flashcards: "Cards", bank: "Bank 50", mock: "Mock", diagnostic: "Diagnostic",
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: SP.md, marginBottom: SP.md, flexWrap: "wrap" }}>
        <div>
          <span style={{ ...TYPE.label, color: C.faint }}>Your route to exam day</span>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: C.text, marginTop: 3 }}>
            {days} days · ~{plan.dailyMinutes} min/day · target {plan.targetProb}%
          </div>
        </div>
        {/* Streak only. The "N shields left" claim that used to sit here was not
            true where the student actually looks: acca-schedule.ts keeps its own
            shield-protected streak, while the headline streak in acca.ts resets
            on a missed day regardless. Until the two stores are unified, we
            promise nothing we don't honour. */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", borderRadius: R.pill, background: C.greenSoft, border: `1px solid ${C.green}`, whiteSpace: "nowrap" }}>
          <Icon name="streak" size={14} color={C.green} />
          <span style={{ fontSize: 12.5, fontWeight: 800, color: C.green }}>{shield.streak}-day streak</span>
        </span>
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
