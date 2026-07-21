import { useMemo } from "react"
import { motion } from "motion/react"
import { Icon, C, type IconName } from "@/components/acca/ui"
import { getPaper } from "@/lib/acca"
import { getPlan, daysUntilExam } from "@/lib/acca-plan"
import { projectPlan, focusArea, type PlanDay, type SchedAction } from "@/lib/acca-schedule"

/*
 * PlanDashboard — the second "wow" moment made concrete. Instead of abstract
 * chips, it shows the real day-by-day plan (from projectPlan): each day's
 * phase, minute budget and named tasks (topic + area + minutes), led by the
 * pain point the plan is built to fix and how it fixes it.
 *
 * Works for both entry paths:
 *   - zero start (onboarding only): projectPlan drives it if an exam date was
 *     set; otherwise a 7-day "Learn" preview is synthesised from the syllabus.
 *   - retake / mid-course (onboarding + diagnostic): focusArea resolves to the
 *     diagnostic's weakest area, so the pain-point→fix card is evidence-led.
 */

const KIND_ICON: Record<SchedAction, IconName> = {
  study: "study",
  essentials: "mission",
  practice: "practice",
  weak: "weak",
  flashcards: "flashcards",
  bank: "practice",
  mock: "mock",
  diagnostic: "diagnostic",
}

export function PlanDashboard({ paperId, days = 7 }: { paperId: string; days?: number }) {
  const paper = getPaper(paperId)
  const plan = getPlan(paperId)
  const toExam = daysUntilExam(paperId)
  const focus = focusArea(paperId)

  const planDays = useMemo<PlanDay[]>(() => {
    const real = projectPlan(paperId, days)
    if (real.length) return real.slice(0, days)
    // No exam date yet → synthesise a Learn-phase preview from the syllabus so
    // the learner always sees a concrete week, honestly labelled by day number.
    const areas = paper?.areas ?? []
    const perArea = Math.max(1, Math.floor(days / Math.max(1, areas.length)))
    const drill = Math.max(8, Math.round((plan.dailyMinutes || 25) * 0.5))
    return Array.from({ length: days }, (_, i) => {
      const a = areas[Math.min(Math.max(0, areas.length - 1), Math.floor(i / perArea))]
      const label = a ? `${a.code} · ${a.label}` : "the syllabus"
      const tasks = [
        { kind: "study" as SchedAction, title: `Study ${label}`, minutes: 7, area: a?.code },
        { kind: "weak" as SchedAction, title: `Practise ${a?.code ?? "the area"}`, minutes: drill, area: a?.code },
        { kind: "flashcards" as SchedAction, title: "Revise flashcards", minutes: 8, area: a?.code },
      ]
      return {
        dateISO: "",
        dow: "",
        dayOfMonth: i + 1,
        phase: "learn" as const,
        phaseLabel: "Learn",
        tasks,
        minutes: tasks.reduce((s, t) => s + t.minutes, 0),
        isToday: i === 0,
      }
    })
  }, [paperId, days, paper, plan.dailyMinutes])

  if (!paper || planDays.length === 0) return null

  const focusFix = focus
    ? focus.source === "diagnostic"
      ? "Your diagnostic flagged this — it leads the plan: the chapter first, then targeted drills until it clears."
      : "Your practice shows this slipping — the plan front-loads the chapter, then drills it until it clears."
    : `Brand new to ${paperId}, so the plan teaches first: cover the foundations and your diagnostic unlocks.`

  return (
    <div style={{ marginBottom: 4 }}>
      {/* summary strip */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <Chip icon="calendar" label={toExam !== null && toExam > 0 ? `${toExam} days to exam` : "Paced by mastery"} />
        <Chip icon="mission" label={`${plan.dailyMinutes || 25} min/day`} />
        <Chip icon="diagnostic" label={`Target ${plan.targetProb}%`} />
      </div>

      {/* pain point → fix */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          padding: "13px 15px",
          borderRadius: 14,
          border: `1px solid ${C.brandLine}`,
          background: "linear-gradient(135deg, rgba(200,0,0,0.05), var(--sch-card, #fff))",
          marginBottom: 16,
        }}
      >
        <span style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "grid", placeItems: "center", background: C.brandSoft }}>
          <Icon name="weak" size={17} color={C.brand} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: C.brand, marginBottom: 3 }}>
            {focus ? `WHAT WE FIX FIRST · ${focus.code} · ${focus.label}` : "HOW YOUR PLAN STARTS"}
          </div>
          <div style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.5 }}>{focusFix}</div>
        </div>
      </motion.div>

      {/* the days */}
      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: C.faint, marginBottom: 10 }}>
        YOUR NEXT {planDays.length} DAYS · EVERY ONE ALREADY PLANNED
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {planDays.map((d, i) => {
          const dateLabel = d.dateISO ? `${d.dow} ${d.dayOfMonth}` : `Day ${d.dayOfMonth}`
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 14,
                border: `1px solid ${d.isToday ? C.brandLine : C.border}`,
                background: d.isToday ? "rgba(200,0,0,0.04)" : "var(--sch-card, #fff)",
                minWidth: 0,
              }}
            >
              {/* day marker */}
              <div style={{ flexShrink: 0, width: 46, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4, color: d.isToday ? C.brand : C.faint, textTransform: "uppercase" }}>
                  {d.dateISO ? d.dow : "Day"}
                </div>
                <div style={{ fontSize: 20, fontWeight: 850, color: d.isToday ? C.brand : C.text, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
                  {d.dayOfMonth}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4, padding: "2px 8px", borderRadius: 999, background: C.brandSoft, color: C.brand }}>
                    {d.phaseLabel.toUpperCase()}
                  </span>
                  {d.isToday && (
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.4, color: C.brand }}>START HERE</span>
                  )}
                  <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: C.faint, fontVariantNumeric: "tabular-nums" }}>~{d.minutes} min</span>
                </div>
                <div style={{ display: "grid", gap: 5 }}>
                  {d.tasks.map((t, ti) => (
                    <div key={ti} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <Icon name={KIND_ICON[t.kind] ?? "practice"} size={13} color={C.soft} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12.5, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</span>
                      <span style={{ fontSize: 11, color: C.faint, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{t.minutes}m</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function Chip({ icon, label }: { icon: IconName; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        borderRadius: 999,
        border: `1px solid ${C.border}`,
        background: "var(--sch-card, #fff)",
        fontSize: 12,
        fontWeight: 700,
        color: C.text,
      }}
    >
      <Icon name={icon} size={13} color={C.brand} />
      {label}
    </span>
  )
}
