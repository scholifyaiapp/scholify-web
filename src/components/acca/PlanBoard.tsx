import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { C, R, SP, SHADOW, GRAD, Icon, IconBadge, TabStrip, type IconName } from "@/components/acca/ui"
import { MeterBar } from "@/components/acca/charts"
import { getPlan, setPlan, daysUntilExam, currentPhase, METHOD_PHASES, type MethodPhaseKey } from "@/lib/acca-plan"
import { recommendExamDate, projectTopicPlan, projectReadiness, chapterCoverage, type PlannedDay } from "@/lib/acca-topic-plan"
import { strategicRoute, qualificationRoute, unlockedBy, type StrategicStep } from "@/lib/acca-strategy"
import { getPaperStats } from "@/lib/acca"

/*
 * ── PLAN: three altitudes ─────────────────────────────────────────
 *
 * WHAT WAS HERE. A phase strip, a journey-loop button, a bare `<input type=date>`
 * labelled "Exam date", the four method phases as static date ranges, and a
 * "Coach's notes" list. Two problems, both structural:
 *
 *   · The exam date was an EMPTY OPTIONAL FIELD. With no date there is no
 *     countdown, no phase calendar and no urgency — and most learners never set
 *     one, so most learners had no plan at all, only a list of modes.
 *   · Everything shown was at ONE altitude: inside the current paper, in the
 *     medium term. Nothing said which paper comes next (the question every ACCA
 *     student is actually anxious about), and nothing said what happens on
 *     Thursday.
 *
 * WHAT THIS IS. The three altitudes a coach actually works at:
 *
 *   STRATEGIC    which papers, in which order, with the knowledge reason —
 *                F2 finished means F5 and F9 next, and here is why.
 *   TACTICAL     inside this paper: Learn → Strengthen → Revise → Rehearse,
 *                on real dates, with where the learner is now.
 *   OPERATIONAL  the next seven days, exact tasks, exact chapters.
 *
 * And the exam date is RECOMMENDED, computed from the size of the paper's own
 * content against the learner's weekly hours (see recommendExamDate), so the
 * field arrives with a defensible answer already in it.
 */

type Altitude = "strategic" | "tactical" | "operational"

const ALTITUDES: { key: Altitude; label: string; icon: IconName; blurb: string }[] = [
  { key: "strategic", label: "Strategic", icon: "roadmap", blurb: "Which papers, in which order" },
  { key: "tactical", label: "Tactical", icon: "loop", blurb: "The four phases of this paper" },
  { key: "operational", label: "Operational", icon: "calendar", blurb: "The next 7 days, exact tasks" },
]

const PHASE_ICON: Record<MethodPhaseKey, IconName> = {
  learn: "learn",
  strengthen: "weak",
  revise: "flashcards",
  rehearse: "mock",
}

const TASK_ICON: Record<PlannedDay["blocks"][number]["kind"], IconName> = {
  study: "learn",
  quiz: "mission",
  practice: "practice",
  flashcards: "flashcards",
  article: "notes",
  mock: "mock",
  revise: "weak",
  bank: "check",
}

export function PlanBoard({
  paperId,
  paperName,
  onRefresh,
  onJourney,
  onSwitchPaper,
}: {
  paperId: string
  paperName: string
  onRefresh: () => void
  onJourney: () => void
  onSwitchPaper: (id: string) => void
}) {
  const reduced = useReducedMotion()
  const [altitude, setAltitude] = useState<Altitude>("tactical")
  const [plan, setPlanState] = useState(() => getPlan(paperId))
  const days = daysUntilExam(paperId)
  const rec = useMemo(() => recommendExamDate(paperId), [paperId, plan.dailyMinutes, plan.daysPerWeek, plan.targetProb])

  const applyRecommendation = () => {
    if (!rec) return
    setPlanState(setPlan(paperId, { examDate: rec.dateISO }))
    onRefresh()
  }
  const setDate = (value: string) => {
    setPlanState(setPlan(paperId, { examDate: value || null }))
    onRefresh()
  }

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* ── Exam date: recommended, not requested ── */}
      <ExamDateCard
        paperId={paperId}
        examDate={plan.examDate}
        days={days}
        rec={rec}
        onApply={applyRecommendation}
        onChange={setDate}
        reduced={Boolean(reduced)}
      />

      {/* ── Altitude switcher ── */}
      <TabStrip
        tabs={ALTITUDES}
        active={altitude}
        onChange={setAltitude}
        ariaLabel="Plan altitude"
        style={{ marginBottom: SP.lg }}
      />
      <div style={{ fontSize: 12, color: C.faint, marginTop: -SP.sm, marginBottom: SP.lg, lineHeight: 1.5 }}>
        {ALTITUDES.find((a) => a.key === altitude)?.blurb}
      </div>

      {altitude === "strategic" && <StrategicView paperId={paperId} onSwitchPaper={onSwitchPaper} reduced={Boolean(reduced)} />}
      {altitude === "tactical" && <TacticalView paperId={paperId} paperName={paperName} onJourney={onJourney} reduced={Boolean(reduced)} />}
      {altitude === "operational" && <OperationalView paperId={paperId} reduced={Boolean(reduced)} />}
    </motion.div>
  )
}

/* ── Exam date ────────────────────────────────────────────────────*/

function ExamDateCard({
  paperId,
  examDate,
  days,
  rec,
  onApply,
  onChange,
  reduced,
}: {
  paperId: string
  examDate: string | null
  days: number | null
  rec: ReturnType<typeof recommendExamDate>
  onApply: () => void
  onChange: (value: string) => void
  reduced: boolean
}) {
  const matchesRec = Boolean(rec && examDate === rec.dateISO)
  return (
    <div
      style={{
        borderRadius: R["2xl"],
        border: `1px solid ${examDate ? C.border : C.brandLine}`,
        background: examDate ? C.card : `linear-gradient(135deg, rgba(200,0,0,0.05), ${C.card} 60%)`,
        padding: SP.lg,
        marginBottom: SP.lg,
        boxShadow: SHADOW.sm,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: SP.md, flexWrap: "wrap" }}>
        <IconBadge name="calendar" tone={examDate ? "neutral" : "brand"} size={42} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>
            {examDate ? `${days === 0 ? "That's today" : `${days} days to your ${paperId} sitting`}` : `When should you sit ${paperId}?`}
          </div>
          <div style={{ fontSize: 12.5, color: C.soft, marginTop: 3, lineHeight: 1.5 }}>
            {examDate
              ? matchesRec
                ? "This is Charles's recommended date — the plan below is built around it."
                : "Your own date. The plan below is built around it, whatever Charles would have picked."
              : "Charles works it out from the size of this paper against the hours you committed to — you don't have to guess."}
          </div>
        </div>
        <input
          type="date"
          value={examDate ?? ""}
          onChange={(e) => onChange(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: R.md,
            border: `1px solid ${C.border}`,
            background: C.bg,
            color: C.text,
            fontSize: 13.5,
            colorScheme: "dark light",
          }}
        />
      </div>

      {rec && (
        <div
          style={{
            marginTop: SP.md,
            padding: `${SP.md}px ${SP.md}px`,
            borderRadius: R.lg,
            background: C.card2,
            border: `1px solid ${C.hairline}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: SP.sm, flexWrap: "wrap", marginBottom: 7 }}>
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em", color: C.brand }}>CHARLES RECOMMENDS</span>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: C.text }}>{rec.label}</span>
            <span style={{ fontSize: 11.5, fontWeight: 750, color: C.faint }}>
              {rec.weeks} weeks · {rec.totalHours}h of work · {rec.chaptersLeft} chapters left
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.6 }}>{rec.rationale}</div>
          {!matchesRec && (
            <motion.button
              type="button"
              onClick={onApply}
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.99 }}
              style={{
                marginTop: SP.md,
                padding: "10px 16px",
                borderRadius: R.md,
                border: "none",
                background: GRAD,
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Icon name="done" size={15} color="#fff" /> Use this date
            </motion.button>
          )}
        </div>
      )}
    </div>
  )
}

/* ── STRATEGIC ────────────────────────────────────────────────────*/

const STEP_TONE: Record<StrategicStep["kind"], { label: string; fg: string; bg: string }> = {
  successor: { label: "Knowledge is warm", fg: C.brand, bg: C.brandSoft },
  companion: { label: "Sit alongside", fg: C.green, bg: C.greenSoft },
  "level-up": { label: "Next at this level", fg: C.amber, bg: C.amberSoft },
  essential: { label: "Essentials", fg: C.brand, bg: C.brandSoft },
  option: { label: "Options paper", fg: C.amber, bg: C.amberSoft },
}

function StrategicView({ paperId, onSwitchPaper, reduced }: { paperId: string; onSwitchPaper: (id: string) => void; reduced: boolean }) {
  const route = useMemo(() => strategicRoute(paperId), [paperId])
  const stages = useMemo(() => qualificationRoute(paperId), [paperId])
  const unlocks = useMemo(() => unlockedBy(paperId), [paperId])

  return (
    <div>
      <SubHead icon="roadmap">After {paperId} — Charles's route</SubHead>
      <p style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.6, margin: `0 0 ${SP.md}px` }}>
        ACCA lets you sit the Skills papers in any order, which is exactly why students choose badly — by reputation
        rather than by what the material builds on. These three are ordered by KNOWLEDGE FLOW, and each reason is one you
        can check against your own experience of {paperId}.
      </p>

      <div style={{ display: "grid", gap: SP.sm, marginBottom: SP.xl }}>
        {route.map((step, i) => {
          const tone = STEP_TONE[step.kind]
          return (
            <motion.div
              key={step.paper.id}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              style={{
                borderRadius: R.xl,
                border: `1px solid ${i === 0 ? C.brandLine : C.border}`,
                background: C.card,
                padding: SP.lg,
                boxShadow: SHADOW.sm,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: SP.md, flexWrap: "wrap" }}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: R.md,
                    background: i === 0 ? GRAD : C.card2,
                    color: i === 0 ? "#fff" : C.text,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 14,
                    fontWeight: 850,
                    flexShrink: 0,
                    boxShadow: i === 0 ? SHADOW.brand : undefined,
                  }}
                >
                  {step.paper.id}
                </span>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.text, lineHeight: 1.25 }}>{step.paper.name}</div>
                  <div style={{ fontSize: 11.5, color: C.faint, marginTop: 2 }}>
                    {step.paper.code} · {step.paper.level}
                  </div>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.pill, background: tone.bg, color: tone.fg, fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                  {tone.label}
                </span>
              </div>

              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginTop: SP.md }}>{step.why}</div>

              <div style={{ display: "flex", alignItems: "center", gap: SP.md, marginTop: SP.md, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11.5, fontWeight: 750, color: C.soft }}>
                  Sit it: <b style={{ color: C.text }}>{step.when}</b>
                </span>
                {step.missing.length > 0 && (
                  <span style={{ fontSize: 11.5, fontWeight: 750, color: C.amber }}>
                    Needs {step.missing.join(" + ")} first
                  </span>
                )}
                <button
                  onClick={() => onSwitchPaper(step.paper.id)}
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontSize: 12.5,
                    fontWeight: 750,
                    color: C.brand,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Open {step.paper.id} <Icon name="arrow" size={13} color={C.brand} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {unlocks.length > 0 && (
        <div style={{ display: "flex", gap: SP.sm, padding: `${SP.md}px ${SP.lg}px`, borderRadius: R.lg, background: C.card2, marginBottom: SP.xl }}>
          <Icon name="tutor" size={16} color={C.brand} style={{ marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.6 }}>
            Today's work on {paperId} is not only for {paperId}: it is the assumed knowledge in{" "}
            <b style={{ color: C.text }}>{unlocks.map((p) => p.id).join(" and ")}</b>. Every hour here is an hour you do
            not spend relearning it later.
          </span>
        </div>
      )}

      <SubHead icon="trophy">The whole qualification</SubHead>
      <div style={{ display: "grid", gap: SP.md }}>
        {stages.map((stage) => (
          <div key={stage.key}>
            <div style={{ display: "flex", alignItems: "baseline", gap: SP.sm, marginBottom: 7 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em", color: C.soft, textTransform: "uppercase" }}>{stage.label}</span>
              {stage.note && <span style={{ fontSize: 11, color: C.faint }}>{stage.note}</span>}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {stage.papers.map(({ paper, state, blockedBy }) => {
                const bg =
                  state === "passed" ? C.greenSoft : state === "current" ? GRAD : state === "next" ? C.brandSoft : C.card2
                const fg = state === "passed" ? C.green : state === "current" ? "#fff" : state === "next" ? C.brand : C.faint
                return (
                  <span
                    key={paper.id}
                    title={blockedBy.length ? `Needs ${blockedBy.join(", ")}` : paper.name}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "7px 12px",
                      borderRadius: R.md,
                      background: bg,
                      color: fg,
                      fontSize: 12.5,
                      fontWeight: 800,
                      border: `1px solid ${state === "current" ? "transparent" : C.hairline}`,
                    }}
                  >
                    {state === "passed" && <Icon name="done" size={12} color={C.green} />}
                    {paper.id}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── TACTICAL ─────────────────────────────────────────────────────*/

function TacticalView({ paperId, paperName, onJourney, reduced }: { paperId: string; paperName: string; onJourney: () => void; reduced: boolean }) {
  const phase = currentPhase(paperId)
  const days = daysUntilExam(paperId)
  const coverage = useMemo(() => chapterCoverage(paperId), [paperId])
  const projection = useMemo(() => projectReadiness(paperId), [paperId])
  const stats = getPaperStats(paperId)
  const plan = getPlan(paperId)

  /*
   * Phase dates come from the exam date and the method's 45/25/15/15 shares. With
   * no date set, the phases still list — with their goals and no dates — rather
   * than the section vanishing, because the SEQUENCE is useful on its own and the
   * card above is already asking for a date.
   */
  const spans = useMemo(() => {
    if (days === null || days <= 0) return null
    const out: { key: MethodPhaseKey; from: Date; to: Date; days: number }[] = []
    let cursor = new Date()
    let remaining = days
    METHOD_PHASES.forEach((m, i) => {
      const span = i === METHOD_PHASES.length - 1 ? Math.max(1, remaining) : Math.max(1, Math.round(days * m.share))
      const to = new Date(cursor)
      to.setDate(cursor.getDate() + span)
      out.push({ key: m.key, from: new Date(cursor), to, days: span })
      cursor = to
      remaining -= span
    })
    return out
  }, [days])

  const fmt = (d: Date) => `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}`
  const activeIdx = METHOD_PHASES.findIndex((m) => m.key === phase.key)

  return (
    <div>
      <SubHead icon="loop">Where you are in {paperName}</SubHead>

      {/* Coverage + readiness projection, the two honest numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: SP.md, marginBottom: SP.lg }}>
        <div style={{ borderRadius: R.xl, border: `1px solid ${C.border}`, background: C.card, padding: SP.lg }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: C.faint }}>SYLLABUS COVERED</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 850, color: C.text, fontVariantNumeric: "tabular-nums" }}>{coverage.read}</span>
            <span style={{ fontSize: 14, fontWeight: 750, color: C.faint }}>/ {coverage.total} chapters</span>
          </div>
          <MeterBar value={coverage.percent} color={C.brand} height={6} style={{ marginTop: 9 }} />
          <div style={{ fontSize: 11.5, color: C.soft, marginTop: 8, lineHeight: 1.5 }}>
            {coverage.minutesLeft > 0
              ? `${Math.round(coverage.minutesLeft / 60)}h of reading still ahead, adjusted for how hard each chapter is.`
              : "Every chapter read. From here it's strengthening and rehearsal."}
          </div>
        </div>
        <div style={{ borderRadius: R.xl, border: `1px solid ${C.border}`, background: C.card, padding: SP.lg }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: C.faint }}>PROJECTED ON EXAM DAY</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 850, color: projection?.onTrack ? C.green : C.amber, fontVariantNumeric: "tabular-nums" }}>
              {projection ? `${projection.projected}%` : "—"}
            </span>
            <span style={{ fontSize: 14, fontWeight: 750, color: C.faint }}>vs {plan.targetProb}% target</span>
          </div>
          <MeterBar value={projection?.projected ?? 0} color={projection?.onTrack ? C.green : C.amber} target={plan.targetProb} height={6} style={{ marginTop: 9 }} />
          <div style={{ fontSize: 11.5, color: C.soft, marginTop: 8, lineHeight: 1.5 }}>
            {projection ? projection.verdict : "Set an exam date and the projection appears."}
          </div>
        </div>
      </div>

      {/* The four phases */}
      <div style={{ display: "grid", gap: SP.sm, marginBottom: SP.lg }}>
        {METHOD_PHASES.map((m, i) => {
          const span = spans?.[i]
          const state = i < activeIdx ? "done" : i === activeIdx ? "active" : "todo"
          return (
            <motion.div
              key={m.key}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.32 }}
              style={{
                display: "flex",
                gap: SP.md,
                padding: SP.lg,
                borderRadius: R.xl,
                border: `1px solid ${state === "active" ? C.brandLine : C.border}`,
                background: state === "active" ? `linear-gradient(135deg, rgba(200,0,0,0.05), ${C.card} 60%)` : C.card,
                opacity: state === "todo" ? 0.72 : 1,
                boxShadow: state === "active" ? SHADOW.md : SHADOW.sm,
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: R.md,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  background: state === "done" ? C.greenSoft : state === "active" ? GRAD : C.card2,
                }}
              >
                <Icon
                  name={state === "done" ? "done" : PHASE_ICON[m.key]}
                  size={19}
                  color={state === "done" ? C.green : state === "active" ? "#fff" : C.faint}
                />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: SP.sm, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>
                    {i + 1} · {m.label}
                    {state === "active" && <span style={{ fontSize: 11, fontWeight: 800, color: C.brand, marginLeft: 8 }}>YOU ARE HERE</span>}
                  </span>
                  {span && (
                    <span style={{ fontSize: 11.5, fontWeight: 750, color: C.brand, whiteSpace: "nowrap" }}>
                      {fmt(span.from)} – {fmt(span.to)} · {span.days}d
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: C.soft, marginTop: 4, lineHeight: 1.6 }}>{m.goal}</div>
                {state === "active" && (
                  <div style={{ fontSize: 12, color: C.muted, marginTop: SP.sm, padding: "9px 11px", borderRadius: R.md, background: C.card2, lineHeight: 1.55 }}>
                    {m.key === "learn" && `Today's chapter and its five quizzes are this phase. ${coverage.total - coverage.read} chapters to go.`}
                    {m.key === "strengthen" &&
                      (() => {
                        const weak = [...stats.areas].filter((a) => a.seen >= 2).sort((a, b) => a.accuracy - b.accuracy)[0]
                        return weak
                          ? `Your floor is area ${weak.code} at ${Math.round(weak.accuracy * 100)}%. This phase lifts it above 65%.`
                          : "Practice volume decides this phase — the daily drill is aimed at whatever your answers expose."
                      })()}
                    {m.key === "revise" && "Flashcards to zero-due and a second pass on the two weakest areas. Retrieval, not re-reading."}
                    {m.key === "rehearse" && "Timed mocks under exam conditions. The review of every wrong answer is the study."}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <button
        onClick={onJourney}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: SP.md,
          padding: `${SP.md}px ${SP.lg}px`,
          borderRadius: R.xl,
          border: `1px solid ${C.border}`,
          background: C.card,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <IconBadge name="loop" tone="brand" size={36} />
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 13.5, fontWeight: 750, color: C.text }}>The journey loop</span>
          <span style={{ display: "block", fontSize: 12, color: C.soft, marginTop: 1 }}>
            The whole arc of this paper — onboarding to result, and what happens after
          </span>
        </span>
        <Icon name="chevron" size={16} color={C.faint} />
      </button>
    </div>
  )
}

/* ── OPERATIONAL ──────────────────────────────────────────────────*/

function OperationalView({ paperId, reduced }: { paperId: string; reduced: boolean }) {
  const week = useMemo(() => projectTopicPlan(paperId, 7), [paperId])
  const plan = getPlan(paperId)

  if (!week.length) {
    return (
      <div style={{ padding: SP.lg, borderRadius: R.xl, background: C.card, border: `1px solid ${C.border}`, fontSize: 13, color: C.soft, lineHeight: 1.6 }}>
        Set your exam date above and the next seven days appear here with the exact chapter, quiz, practice count and
        flashcard load for each one.
      </div>
    )
  }

  const totalMinutes = week.reduce((n, d) => n + d.minutes, 0)
  const workDays = week.filter((d) => !d.isRest).length

  return (
    <div>
      <SubHead icon="calendar">The next 7 days</SubHead>
      <p style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.6, margin: `0 0 ${SP.md}px` }}>
        {workDays} study days, {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m in total — {plan.daysPerWeek} days a
        week as you committed, with the rest days shown so you can see the promise being kept. Chapters are in reading
        order; the plan re-spreads itself automatically if you miss a day.
      </p>

      <div style={{ display: "grid", gap: SP.sm }}>
        {week.map((day, i) => (
          <motion.div
            key={day.dateISO}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            style={{
              display: "flex",
              gap: SP.md,
              padding: SP.md,
              borderRadius: R.xl,
              border: `1px solid ${day.isToday ? C.brandLine : C.border}`,
              background: day.isRest ? C.card2 : day.isToday ? `linear-gradient(135deg, rgba(200,0,0,0.05), ${C.card} 60%)` : C.card,
              opacity: day.isRest ? 0.8 : 1,
            }}
          >
            {/* Date column */}
            <div style={{ width: 46, flexShrink: 0, textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", color: day.isToday ? C.brand : C.faint }}>
                {day.dow.toUpperCase()}
              </div>
              <div style={{ fontSize: 19, fontWeight: 850, color: day.isToday ? C.brand : C.text, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
                {day.dayOfMonth}
              </div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: C.faint }}>{day.month.toUpperCase()}</div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: SP.sm, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: C.faint }}>
                  {day.isRest ? "REST DAY" : `${day.phaseLabel.toUpperCase()} · ${day.minutes} MIN`}
                </span>
                {day.isToday && <span style={{ fontSize: 10, fontWeight: 800, color: C.brand }}>TODAY</span>}
              </div>

              {day.isRest ? (
                <div style={{ fontSize: 13, color: C.soft, marginTop: 4, lineHeight: 1.5 }}>
                  Nothing scheduled. Rest is in the plan on purpose — it's what makes the other days repeatable.
                </div>
              ) : (
                <>
                  {day.chapter && (
                    <div style={{ fontSize: 14.5, fontWeight: 750, color: C.text, marginTop: 3, lineHeight: 1.3 }}>
                      {day.chapter.number ? <span style={{ color: C.brand, marginRight: 6 }}>{day.chapter.number}</span> : null}
                      {day.chapter.title}
                      <span style={{ fontSize: 11, fontWeight: 750, color: C.faint, marginLeft: 8 }}>{day.chapter.hardness.label}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                    {day.blocks.map((b, j) => (
                      <span
                        key={`${b.kind}-${j}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "5px 9px",
                          borderRadius: R.sm,
                          background: C.card2,
                          fontSize: 11,
                          fontWeight: 700,
                          color: C.soft,
                        }}
                      >
                        <Icon name={TASK_ICON[b.kind]} size={11} color={C.faint} />
                        {b.label} · {b.minutes}m
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Shared ───────────────────────────────────────────────────────*/

function SubHead({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, margin: `0 0 ${SP.sm}px` }}>
      <Icon name={icon} size={15} color={C.brand} />
      <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.soft }}>{children}</span>
    </div>
  )
}
