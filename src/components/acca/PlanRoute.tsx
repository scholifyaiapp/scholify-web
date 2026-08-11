import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { Icon, Card, C, SP, R, TYPE, type IconName } from "@/components/acca/ui"
import { shieldState } from "@/lib/acca-schedule"
import { projectTopicPlan, type PlannedDay } from "@/lib/acca-topic-plan"
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

/* The blocks a chapter-level day is made of — study the topic, then the work
   that belongs to it. Same vocabulary the Today screen uses. */
const BLOCK_ICON: Record<PlannedDay["blocks"][number]["kind"], IconName> = {
  study: "learn", quiz: "check", practice: "practice", flashcards: "flashcards",
  article: "notes", mock: "mock", revise: "loop", bank: "practice",
}
const BLOCK_LABEL: Record<PlannedDay["blocks"][number]["kind"], string> = {
  study: "Study topic", quiz: "Quizzes", practice: "Practise", flashcards: "Cards",
  article: "Article", mock: "Mock", revise: "Revise", bank: "Bank run",
}
const PHASE_TINT: Record<string, string> = {
  learn: C.brand, strengthen: C.amber, revise: "#7C6BD6", rehearse: C.green,
}

export function PlanRoute({ paperId }: { paperId: string }) {
  const navigate = useNavigate()
  const days = daysUntilExam(paperId)
  const plan = getPlan(paperId)
  /*
   * ── THE ROUTE SHOWS THE DAILY TOPIC, NOT THE WHOLE AREA ──
   *
   * This strip used projectPlan(), which plans at AREA level: every Learn day
   * read "Study D · Financial instruments" — a whole syllabus area, which on a
   * real paper is many chapters and many days of work. Meanwhile the day the
   * learner actually gets is built by composeToday(), which assigns ONE
   * chapter and draws that day's quizzes and technical article from it.
   *
   * So the plan on the dashboard was not the plan they were living. That is the
   * same class of mismatch shapeDay() was introduced to end — a preview sized
   * by different rules from the real day — and it is the more damaging half,
   * because this is the screen that makes the plan feel credible.
   *
   * projectTopicPlan() is the chapter-level planner that already backs the week
   * view in PlanBoard: it queues every unread chapter and spreads them one per
   * day across the days that remain, respecting rest days. Same source, so the
   * route, the week and today can no longer disagree.
   */
  const route = useMemo(() => projectTopicPlan(paperId, 14), [paperId])
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

      {/*
        The four numbers moved OUT of here and into LearningDashboard, where
        they are animated rings rather than flat tiles. Rendering both on the
        same screen would state readiness, the daily block, answered and target
        twice within a few hundred pixels, in two different visual languages.

        This block keeps what only it has: the journey from start date to exam
        day, and the day strip.
      */}

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

            {/* THE DAY'S TOPIC — the one thing this card exists to say. A learner
                scanning the route wants to know what they are studying on
                Thursday, not that Thursday contains "Study". */}
            {d.chapter ? (
              <div style={{ marginBottom: 7 }}>
                <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.06em", color: C.brand }}>
                  {d.chapter.area}
                  {d.chapter.number ? ` · CH ${d.chapter.number}` : ""}
                </div>
                <div
                  style={{
                    fontSize: 11.5, fontWeight: 750, color: C.text, lineHeight: 1.3, marginTop: 2,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}
                  title={d.chapter.title}
                >
                  {d.chapter.title}
                </div>
              </div>
            ) : d.isRest ? (
              <div style={{ fontSize: 11, fontWeight: 700, color: C.faint, marginBottom: 7 }}>Rest day</div>
            ) : null}

            <div style={{ display: "grid", gap: 5 }}>
              {d.blocks.map((b, ti) => (
                <div key={ti} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name={BLOCK_ICON[b.kind]} size={12} color={C.faint} />
                  <span style={{ fontSize: 11, fontWeight: 650, color: C.soft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{BLOCK_LABEL[b.kind]}</span>
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
