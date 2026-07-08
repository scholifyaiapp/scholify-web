import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Icon, Card, Badge, SectionLabel, C, SP, R, TYPE, type IconName } from "@/components/acca/ui"
import { RingGauge, MeterBar, BreakdownList, TrendBars, DeltaChip, Sparkbars, bandColor } from "@/components/acca/charts"
import { getPaper, getPaperStats, getTodayStats, getDailyActivity, type AccaPaper } from "@/lib/acca"
import { getMockHistory } from "@/lib/acca"
import { getLatestDiagnostic, estimateFromPractice, passBand } from "@/lib/acca-diagnostic"
import { getPlan, daysUntilExam, currentPhase, METHOD_PHASES } from "@/lib/acca-plan"
import { getCurrentPaper, getStudyingPapers } from "@/lib/acca-qualification"
import { passProbability, recoveryState, getExamOutcomes, MOCK_PASS } from "@/lib/acca-loop"
import { buildTodayPlan, type TodayAction } from "@/lib/acca-today"
import { flashcardStats } from "@/lib/acca-flashcards"
import { getStudyPath, pathProgress } from "@/lib/acca-topics"
import {
  probabilityMomentum,
  masteryScore,
  learningVelocity,
  forgettingRisk,
  palestArea,
  getPace,
  studyMinutesToday,
  getMistakes,
  getCalibration,
  QUESTION_BUDGET_SEC,
} from "@/lib/acca-analytics"

/*
 * /study/analytics — the 4-section analytics dashboard, from the approved
 * "Scholify analytics dashboard design part" export:
 *
 *   📈 Progress  — Am I going to pass?      (probability, momentum, mastery, est. score)
 *   🧠 Learning  — What do I actually know? (knowledge map, weak topics, forgetting, velocity, calibration)
 *   📚 Study     — What do I do today?      (mission, streak, study time, revision queue, completion)
 *   🎯 Exam      — Am I exam-ready?         (mock trends, pace, mistakes, countdown, real history)
 *
 * Every number reads against a target. New signals (momentum, pace, mistakes,
 * calibration) start from zero and show honest "measuring" states.
 */

type Section = "progress" | "learning" | "study" | "exam"

const SECTIONS: { key: Section; icon: IconName; label: string; question: string }[] = [
  { key: "progress", icon: "progress", label: "Progress", question: "Am I going to pass?" },
  { key: "learning", icon: "flashcards", label: "Learning", question: "What do I actually know?" },
  { key: "study", icon: "learn", label: "Study", question: "What do I do today?" },
  { key: "exam", icon: "exam", label: "Exam", question: "Am I exam-ready?" },
]

export default function AccaAnalytics() {
  const studying = getStudyingPapers()
  const [paperId, setPaperId] = useState<string>(() => getCurrentPaper() ?? studying[0] ?? "FA")
  const [section, setSection] = useState<Section>("progress")
  const paper = getPaper(paperId)

  const prob = passProbability(paperId)
  const band = prob !== null ? passBand(prob) : null
  const days = daysUntilExam(paperId)
  const active = SECTIONS.find((s) => s.key === section)!

  if (!paper) return null

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "8px 0 48px" }}>
        <SectionLabel style={{ marginBottom: SP.xs }}>
          {active.label} · {active.question}
        </SectionLabel>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: SP.md, flexWrap: "wrap", marginBottom: SP.lg }}>
          <h1 style={{ fontSize: 27, fontWeight: 800, margin: 0, color: C.text, letterSpacing: "-0.02em" }}>
            {headlineFor(section, paperId, band?.label ?? null)}
          </h1>
          {days != null && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 13px", borderRadius: R.pill, background: C.card, border: `1px solid ${C.border}`, fontSize: 12.5, fontWeight: 700, color: C.muted, whiteSpace: "nowrap" }}>
              <Icon name="calendar" size={13} color={C.brand} />
              Exam in {days} days
            </span>
          )}
        </div>

        {/* paper switcher (only when studying more than one) */}
        {studying.length > 1 && (
          <div style={{ display: "flex", gap: SP.sm, marginBottom: SP.md }}>
            {studying.map((pid) => {
              const on = pid === paperId
              return (
                <button
                  key={pid}
                  onClick={() => setPaperId(pid)}
                  style={{ padding: "6px 14px", borderRadius: R.pill, border: `1.5px solid ${on ? C.brand : C.border}`, background: on ? C.brandSoft : C.card, color: on ? C.brand : C.muted, fontWeight: 750, fontSize: 13, cursor: "pointer" }}
                >
                  {pid}
                </button>
              )
            })}
          </div>
        )}

        {/* section tabs */}
        <div style={{ display: "flex", gap: 4, padding: 4, background: C.card, border: `1px solid ${C.border}`, borderRadius: R.lg, marginBottom: SP.xl }}>
          {SECTIONS.map((s) => {
            const on = s.key === section
            return (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, minHeight: 40, borderRadius: R.md, border: "none", background: "transparent", cursor: "pointer", position: "relative", color: on ? "#fff" : C.muted, fontWeight: 750, fontSize: 13 }}
              >
                {on && (
                  <motion.span
                    layoutId="analytics-tab"
                    style={{ position: "absolute", inset: 0, borderRadius: R.md, background: "linear-gradient(135deg,#C80000,#E50068)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 7 }}>
                  <Icon name={s.icon} size={14} color={on ? "#fff" : C.faint} strokeWidth={2.3} />
                  <span className="max-sm:hidden">{s.label}</span>
                </span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={section + paperId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {section === "progress" && <ProgressSection paperId={paperId} paper={paper} />}
            {section === "learning" && <LearningSection paperId={paperId} paper={paper} />}
            {section === "study" && <StudySection paperId={paperId} />}
            {section === "exam" && <ExamSection paperId={paperId} paper={paper} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}

function headlineFor(section: Section, paperId: string, bandLabel: string | null): string {
  const rec = recoveryState(paperId)
  switch (section) {
    case "progress":
      return bandLabel ? `${bandLabel.replace(/\.$/, "")} ${paperId}`.replace("On track to pass", "On track to pass") : `Where you stand on ${paperId}`
    case "learning":
      return "Your knowledge, topic by topic"
    case "study":
      return rec.active ? "Today's plan recovers the marks" : "Today's plan, already decided"
    case "exam":
      return "Every mock reads against the line"
  }
}

/* ── shared bits ──────────────────────────────────────────────── */

function CardTitle({ icon, children, right }: { icon: IconName; children: ReactNode; right?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: SP.md }}>
      <Icon name={icon} size={14} color={C.brand} strokeWidth={2.4} />
      <span style={{ ...TYPE.label, color: C.faint }}>{children}</span>
      {right != null && <span style={{ marginLeft: "auto" }}>{right}</span>}
    </div>
  )
}

function Measuring({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: R.md, background: C.card2, fontSize: 12.5, color: C.soft, lineHeight: 1.5 }}>
      <Icon name="stats" size={14} color={C.faint} />
      <span>{children}</span>
    </div>
  )
}

const grid2: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: SP.md, marginBottom: SP.md }

/* ── 📈 PROGRESS — Am I going to pass? ────────────────────────── */

function ProgressSection({ paperId, paper }: { paperId: string; paper: AccaPaper }) {
  const prob = passProbability(paperId)
  const band = prob !== null ? passBand(prob) : null
  const est = estimateFromPractice(paperId) ?? getLatestDiagnostic(paperId)
  const momentum = probabilityMomentum(paperId)
  const mastery = masteryScore(paperId)
  const rec = recoveryState(paperId)
  const navigate = useNavigate()

  if (prob === null) {
    return (
      <Card style={{ textAlign: "center", padding: SP["3xl"] }}>
        <Icon name="diagnostic" size={34} color={C.brand} />
        <h3 style={{ ...TYPE.h3, color: C.text, margin: "12px 0 6px" }}>No pass probability yet</h3>
        <p style={{ ...TYPE.body, color: C.soft, margin: "0 0 16px" }}>Take the ~15-minute diagnostic and every card on this dashboard comes alive.</p>
        <button onClick={() => navigate("/study/diagnostic")} style={{ padding: "13px 22px", borderRadius: R.lg, border: "none", background: "linear-gradient(135deg,#C80000,#E50068)", color: "#fff", fontWeight: 750, fontSize: 15, cursor: "pointer" }}>
          Take the diagnostic
        </button>
      </Card>
    )
  }

  return (
    <>
      {/* hero — the one number */}
      <Card style={{ display: "flex", alignItems: "center", gap: SP["2xl"], flexWrap: "wrap", marginBottom: SP.md }}>
        <RingGauge value={prob} size={188} stroke={14} color={band?.color} label={band?.label} sublabel="live from your practice" target={50} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <CardTitle icon="diagnostic">Pass probability</CardTitle>
          <p style={{ ...TYPE.body, color: C.muted, margin: 0, lineHeight: 1.6 }}>
            {paper.id} — {paper.name} · pass line 50%.{" "}
            {rec.active
              ? "Recalibrated by your last real sitting — every answer earns it back."
              : prob >= 50
                ? `${prob - 50} points above the line and climbing.`
                : `${50 - prob} points below the line — today's plan is aimed exactly there.`}
          </p>
          {est && (
            <div style={{ marginTop: SP.lg }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ ...TYPE.label, color: C.faint }}>Estimated exam score</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: C.text }}>
                  {est.estimatedScore}
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.soft }}> / 100</span>
                </span>
              </div>
              <MeterBar value={est.estimatedScore} max={100} color={bandColor(est.estimatedScore, 50)} target={50} height={9} />
              <div style={{ ...TYPE.small, color: C.faint, marginTop: 6 }}>
                {est.estimatedScore >= 50 ? `${est.estimatedScore - 50} marks above the pass line` : `${50 - est.estimatedScore} marks below the pass line`} · based on {getPaperStats(paperId).answered} answers across {Math.round(getPaperStats(paperId).coverage * 100)}% of the syllabus
              </div>
            </div>
          )}
        </div>
      </Card>

      <div style={grid2}>
        <Card>
          <CardTitle icon="progress">Pass Momentum™</CardTitle>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: SP.sm }}>
            {momentum?.deltaPts != null ? (
              <>
                <span style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                  {momentum.deltaPts > 0 ? "+" : ""}
                  {momentum.deltaPts}
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> pts</span>
                </span>
                <DeltaChip delta={momentum.deltaPts} suffix=" pts" vs="this week" />
              </>
            ) : (
              <span style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{prob}%</span>
            )}
          </div>
          {momentum && momentum.series.length > 1 ? (
            <>
              <Sparkbars data={momentum.series.map((p) => ({ date: p.date, count: p.prob }))} unit="% probability" height={44} />
              <div style={{ ...TYPE.small, color: C.faint, marginTop: SP.sm }}>
                {momentum.deltaPts != null
                  ? momentum.deltaPts >= 0
                    ? "Climbing — every answer moves this number."
                    : "Dipped — normal while drilling new weak areas."
                  : "Building your trend — check back in a few days."}
              </div>
            </>
          ) : (
            <Measuring>Momentum starts measuring from today — finish sessions and the trend line appears here.</Measuring>
          )}
        </Card>

        <Card>
          <CardTitle icon="topics">Mastery score</CardTitle>
          {mastery ? (
            <>
              <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1, marginBottom: 4 }}>
                {mastery.score}
                <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}>%</span>
              </div>
              <div style={{ ...TYPE.small, color: C.faint, marginBottom: SP.sm }}>avg topic mastery · toward 100%</div>
              <MeterBar value={mastery.score} color={bandColor(mastery.score, 65)} height={9} />
              <div style={{ ...TYPE.small, color: C.faint, marginTop: SP.sm }}>
                <b style={{ color: C.text }}>{mastery.strong}</b> of {mastery.total} topics at 80%+
              </div>
            </>
          ) : (
            <Measuring>Start the study path and mastery builds topic by topic.</Measuring>
          )}
        </Card>
      </div>
    </>
  )
}

/* ── 🧠 LEARNING — What do I actually know? ───────────────────── */

function LearningSection({ paperId, paper }: { paperId: string; paper: AccaPaper }) {
  const stats = getPaperStats(paperId)
  const pale = palestArea(paperId)
  const cooling = forgettingRisk(paperId)
  const velocity = learningVelocity(paperId)
  const calibration = getCalibration(paperId)
  const fc = flashcardStats(paperId)

  const weakItems = stats.areas
    .filter((a) => a.seen > 0)
    .map((a) => ({ code: a.code, label: a.label, pct: Math.round(a.accuracy * 100), valueText: `${a.correct}/${a.seen} · ${Math.round(a.accuracy * 100)}%` }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 5)

  return (
    <>
      {/* knowledge heatmap — one tile per syllabus area, single red ramp */}
      <Card style={{ marginBottom: SP.md }}>
        <CardTitle
          icon="stats"
          right={<span style={{ fontSize: 11, color: C.faint, display: "inline-flex", alignItems: "center", gap: 5 }}>less <HeatLegend /> mastery</span>}
        >
          Knowledge heatmap
        </CardTitle>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(96px, 1fr))`, gap: SP.sm }}>
          {paper.areas.map((area, i) => {
            const s = stats.areas.find((x) => x.code === area.code)
            const m = s && s.seen > 0 ? s.accuracy : null
            return (
              <motion.div
                key={area.code}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                title={`${area.code} · ${area.label}${m != null ? ` — ${Math.round(m * 100)}%` : " — not practised yet"}`}
                style={{
                  borderRadius: R.md,
                  padding: "12px 10px",
                  background: m == null ? C.card2 : `rgba(200,0,0,${(0.12 + 0.78 * m).toFixed(2)})`,
                  border: `1px solid ${C.border}`,
                  minHeight: 62,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 13, color: m != null && m > 0.45 ? "#fff" : C.text }}>{area.code}</span>
                <span style={{ fontSize: 11.5, fontWeight: 750, color: m != null && m > 0.45 ? "rgba(255,255,255,0.9)" : C.muted, fontVariantNumeric: "tabular-nums" }}>
                  {m != null ? `${Math.round(m * 100)}%` : "—"}
                </span>
              </motion.div>
            )
          })}
        </div>
        {pale && (
          <div style={{ ...TYPE.small, color: C.soft, marginTop: SP.md, lineHeight: 1.55 }}>
            <b style={{ color: C.text }}>Area {pale.code} — {pale.label}</b> is your palest band at {pale.pct}%. That's where the marks are hiding.
          </div>
        )}
      </Card>

      <div style={grid2}>
        <Card>
          <CardTitle icon="weak" right={<span style={{ fontSize: 11, color: C.faint, textTransform: "none", letterSpacing: 0 }}>worst first · drill to recover</span>}>
            Weak topics
          </CardTitle>
          {weakItems.length > 0 ? (
            <BreakdownList items={weakItems} passLine={50} />
          ) : (
            <Measuring>Practise a few questions and your weakest topics rank themselves here.</Measuring>
          )}
        </Card>

        <Card>
          <CardTitle icon="loop" right={<Badge tone={cooling.length > 0 ? "amber" : "green"}>{cooling.length > 0 ? "spaced review" : "all warm"}</Badge>}>
            Forgetting risk
          </CardTitle>
          {cooling.length > 0 ? (
            <>
              <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1, marginBottom: 2 }}>
                {cooling.length}
                <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> topic{cooling.length === 1 ? "" : "s"} cooling</span>
              </div>
              <div style={{ marginTop: SP.sm }}>
                {cooling.slice(0, 3).map((t) => (
                  <div key={t.code} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "6px 0", borderBottom: `1px solid ${C.hairline ?? C.border}` }}>
                    <span style={{ fontSize: 13, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.label}</span>
                    <span style={{ fontSize: 12, color: C.amber, fontWeight: 700, whiteSpace: "nowrap" }}>last touched {t.daysSince}d ago</span>
                  </div>
                ))}
              </div>
              <div style={{ ...TYPE.small, color: C.faint, marginTop: SP.sm }}>A 5-minute review resets each one before it slips.{fc.due > 0 ? ` ${fc.due} flashcards due now.` : ""}</div>
            </>
          ) : (
            <Measuring>Mastered topics that go untouched for a week show up here before they fade.</Measuring>
          )}
        </Card>

        <Card>
          <CardTitle icon="rocket">Learning velocity</CardTitle>
          {velocity.totalMastered > 0 ? (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                  {velocity.thisWeek}
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> topics mastered / wk</span>
                </span>
                {velocity.lastWeek > 0 && (
                  <DeltaChip delta={velocity.thisWeek - velocity.lastWeek} suffix="" vs="last week" />
                )}
              </div>
              <div style={{ ...TYPE.small, color: C.faint, marginTop: SP.sm }}>
                {velocity.totalMastered} mastered in total{velocity.thisWeek > 0 ? " — keep this pace and the mock room stays busy." : ""}
              </div>
            </>
          ) : (
            <Measuring>Master your first topic on the study path and velocity starts counting.</Measuring>
          )}
        </Card>

        <Card>
          <CardTitle icon="tutor">Confidence calibration</CardTitle>
          {calibration ? (
            <>
              <div style={{ display: "grid", gap: SP.sm }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                    <span style={{ color: C.soft }}>You feel</span>
                    <b style={{ color: C.text }}>{calibration.claimed}% confident</b>
                  </div>
                  <MeterBar value={calibration.claimed} color={C.brand} track={C.brandSoft} height={7} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                    <span style={{ color: C.soft }}>When sure, you score</span>
                    <b style={{ color: C.text }}>{calibration.deliveredWhenSure}%</b>
                  </div>
                  <MeterBar value={calibration.deliveredWhenSure} color={bandColor(calibration.deliveredWhenSure, 65)} height={7} />
                </div>
              </div>
              <div style={{ ...TYPE.small, color: C.faint, marginTop: SP.md }}>
                {calibration.gapPts > 10
                  ? `${calibration.gapPts}-pt gap — a little overconfident; we'll test those areas harder.`
                  : calibration.gapPts < -10
                    ? "You're better than you think — trust the first instinct."
                    : "Well calibrated — your gut and your marks agree."}{" "}
                ({calibration.tagged} tagged answers)
              </div>
            </>
          ) : (
            <Measuring>Tap "Sure / Not sure" while practising — 10 tagged answers unlock your calibration read.</Measuring>
          )}
        </Card>
      </div>
    </>
  )
}

function HeatLegend() {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[0.15, 0.35, 0.55, 0.8].map((a) => (
        <span key={a} style={{ width: 9, height: 9, borderRadius: 2.5, background: `rgba(200,0,0,${a})` }} />
      ))}
    </span>
  )
}

/* ── 📚 STUDY — What do I do today? ───────────────────────────── */

function StudySection({ paperId }: { paperId: string }) {
  const navigate = useNavigate()
  const today = getTodayStats()
  const week = getDailyActivity(7)
  const plan = getPlan(paperId)
  const minutes = studyMinutesToday(paperId)
  const fc = flashcardStats(paperId)
  const path = getStudyPath(paperId)
  const pp = pathProgress(paperId)
  const mission = useMemo(() => buildTodayPlan(paperId), [paperId])

  const missionIcons: Record<TodayAction, IconName> = {
    diagnostic: "diagnostic", weak: "weak", practice: "practice", flashcards: "flashcards", mock: "mock",
  }

  return (
    <>
      {/* daily mission */}
      <Card style={{ marginBottom: SP.md }}>
        <CardTitle icon="mission" right={<span style={{ fontSize: 11, color: C.faint, textTransform: "none", letterSpacing: 0 }}>tap a step to start it</span>}>
          Daily mission
        </CardTitle>
        <div style={{ display: "grid", gap: SP.sm }}>
          {mission.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate("/study")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                padding: "13px 14px",
                borderRadius: R.md,
                border: `1px solid ${i === 0 ? "rgba(200,0,0,0.35)" : C.border}`,
                background: i === 0 ? "linear-gradient(135deg, rgba(200,0,0,0.06), var(--sch-card))" : C.card,
                cursor: "pointer",
                width: "100%",
              }}
            >
              <span style={{ width: 34, height: 34, borderRadius: 9, background: i === 0 ? "linear-gradient(135deg,#C80000,#E50068)" : C.card2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={missionIcons[t.action]} size={16} color={i === 0 ? "#fff" : C.muted} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontWeight: 750, fontSize: 14, color: C.text }}>{t.title}</span>
                <span style={{ display: "block", fontSize: 12, color: C.soft, marginTop: 1 }}>{t.detail}</span>
              </span>
              <Icon name="chevron" size={16} color={C.faint} style={{ flexShrink: 0 }} />
            </motion.button>
          ))}
        </div>
      </Card>

      <div style={grid2}>
        <Card>
          <CardTitle icon="streak">Streak</CardTitle>
          <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1 }}>
            {today.streak}
            <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> days</span>
          </div>
          <div style={{ display: "flex", gap: 5, margin: `${SP.md}px 0 ${SP.sm}px` }}>
            {week.map((d) => (
              <span key={d.date} title={`${d.date}: ${d.count}`} style={{ width: 22, height: 22, borderRadius: 6, background: d.count > 0 ? C.green : C.card2, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {d.count > 0 && <Icon name="done" size={12} color="#fff" />}
              </span>
            ))}
          </div>
          <div style={{ ...TYPE.small, color: C.faint }}>{week.filter((d) => d.count > 0).length} of last 7 days active</div>
        </Card>

        <Card>
          <CardTitle icon="calendar">Study time</CardTitle>
          <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1, marginBottom: 4 }}>
            {minutes}
            <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> min today · target {plan.dailyMinutes}</span>
          </div>
          <MeterBar value={minutes} max={plan.dailyMinutes} color={minutes >= plan.dailyMinutes ? C.green : C.brand} track={minutes >= plan.dailyMinutes ? C.greenSoft : C.brandSoft} height={9} style={{ marginTop: SP.sm }} />
          <div style={{ ...TYPE.small, color: C.faint, marginTop: SP.sm }}>
            {minutes >= plan.dailyMinutes ? "Target met — anything more is compounding." : `${Math.max(0, plan.dailyMinutes - minutes)} minutes to today's target.`}
          </div>
        </Card>

        <Card>
          <CardTitle icon="flashcards">Revision queue</CardTitle>
          <div style={{ fontSize: 30, fontWeight: 800, color: fc.due > 0 ? C.text : C.green, lineHeight: 1 }}>
            {fc.due}
            <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> cards due</span>
          </div>
          <div style={{ ...TYPE.small, color: C.faint, margin: `${SP.sm}px 0 ${SP.md}px` }}>
            {fc.due > 0 ? "Spaced repetition holds mastery — clear it before it grows." : "Queue clear — mastery is holding."}
          </div>
          {fc.due > 0 && (
            <button onClick={() => navigate("/study")} style={{ padding: "10px 16px", borderRadius: R.md, border: "none", background: "linear-gradient(135deg,#C80000,#E50068)", color: "#fff", fontWeight: 750, fontSize: 13, cursor: "pointer" }}>
              Clear the queue
            </button>
          )}
        </Card>

        <Card>
          <CardTitle icon="topics">Topic completion</CardTitle>
          <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1, marginBottom: SP.md }}>
            {pp.mastered}
            <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> / {pp.total} topics mastered</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {path.map((t) => (
              <span
                key={t.code}
                title={`${t.code} · ${t.label} — ${t.state}`}
                style={{ flex: 1, height: 10, borderRadius: 3, background: t.mastered ? C.green : t.state === "in-progress" ? C.brand : C.card2 }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: SP.md, flexWrap: "wrap" }}>
            {[
              { c: C.green, l: `${pp.mastered} mastered` },
              { c: C.brand, l: `${path.filter((t) => !t.mastered && t.state === "in-progress").length} in progress` },
              { c: C.card2, l: `${path.filter((t) => t.state === "available" || t.state === "upcoming").length} untouched` },
            ].map((x) => (
              <span key={x.l} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.soft }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: x.c, border: `1px solid ${C.border}` }} />
                {x.l}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

/* ── 🎯 EXAM — Am I exam-ready? ───────────────────────────────── */

function ExamSection({ paperId, paper }: { paperId: string; paper: AccaPaper }) {
  const mocks = getMockHistory(paperId)
  const pace = getPace(paperId)
  const mistakes = getMistakes(paperId)
  const days = daysUntilExam(paperId)
  const phase = currentPhase(paperId)
  const outcomes = getExamOutcomes(paperId)
  const rec = recoveryState(paperId)
  const best = mocks.length ? Math.max(...mocks.map((m) => m.percent)) : null

  return (
    <>
      <div style={grid2}>
        <Card>
          <CardTitle icon="mock" right={best != null ? <span style={{ fontSize: 12, color: C.soft, textTransform: "none", letterSpacing: 0 }}>best <b style={{ color: C.green }}>{best}%</b></span> : undefined}>
            Mock trends
          </CardTitle>
          {mocks.length >= 2 ? (
            <TrendBars points={[...mocks].reverse().map((m) => ({ date: m.date, percent: m.percent }))} passLine={MOCK_PASS} unit="mock score" />
          ) : (
            <Measuring>Sit two timed mocks and the trend against the pass line draws itself.</Measuring>
          )}
        </Card>

        {/* dark accent card — the countdown */}
        <div style={{ borderRadius: R["2xl"], padding: SP.xl, background: "linear-gradient(135deg, #1c0f10, #3a0d16 60%, #55102a)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 180 }}>
          <div style={{ ...TYPE.label, color: "rgba(255,255,255,0.55)" }}>Exam countdown</div>
          {days != null ? (
            <>
              <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, margin: "10px 0 4px" }}>
                {days}
                <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.65)" }}> days to your {paper.id} sitting</span>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "5px 12px", borderRadius: R.pill, background: "rgba(244,164,5,0.18)", color: "#F4A405", fontSize: 12, fontWeight: 750, margin: "6px 0 12px" }}>
                <Icon name="mission" size={12} color="#F4A405" />
                Phase · {phase.label}
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                {METHOD_PHASES.map((p) => {
                  const on = p.key === phase.key
                  return (
                    <span key={p.key} style={{ flex: 1, textAlign: "center", fontSize: 10.5, fontWeight: on ? 800 : 600, color: on ? "#fff" : "rgba(255,255,255,0.45)", borderTop: `2px solid ${on ? "#F4A405" : "rgba(255,255,255,0.18)"}`, paddingTop: 6 }}>
                      {p.label}
                    </span>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 20, fontWeight: 800, margin: "10px 0 6px" }}>No sitting booked yet</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>Set your exam date on the {paper.id} overview and the whole roadmap dates itself back from it.</div>
            </>
          )}
        </div>

        <Card>
          <CardTitle icon="weak" right={<span style={{ fontSize: 11, color: C.faint, textTransform: "none", letterSpacing: 0 }}>worst first</span>}>
            Mistake analysis
          </CardTitle>
          {mistakes.length > 0 ? (
            <div style={{ display: "grid", gap: SP.md }}>
              {mistakes.map((m) => (
                <div key={m.tag}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: C.text, fontWeight: 650 }}>{m.label}</span>
                    <span style={{ color: C.soft, fontVariantNumeric: "tabular-nums" }}>{m.count} · {m.share}%</span>
                  </div>
                  <MeterBar value={m.share} color={m.tag === "knowledge" ? C.red : m.tag === "time" ? C.amber : C.brand} height={7} />
                </div>
              ))}
              <div style={{ ...TYPE.small, color: C.faint }}>Tagged from your missed questions — tap "why" after a miss to keep this sharp.</div>
            </div>
          ) : (
            <Measuring>When a question slips, tap why (knowledge · misread · time · slip) — the causes chart themselves here.</Measuring>
          )}
        </Card>

        <Card>
          <CardTitle icon="mock">Time management</CardTitle>
          {pace ? (
            <>
              <div style={{ fontSize: 30, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                {pace.avgSec}s
                <span style={{ fontSize: 14, fontWeight: 700, color: C.soft }}> avg / question · budget {QUESTION_BUDGET_SEC}s</span>
              </div>
              <div style={{ ...TYPE.small, color: pace.avgSec <= QUESTION_BUDGET_SEC ? C.green : C.red, fontWeight: 700, margin: `6px 0 ${SP.md}px` }}>
                {pace.avgSec <= QUESTION_BUDGET_SEC
                  ? `${QUESTION_BUDGET_SEC - pace.avgSec}s of headroom per question`
                  : `${pace.avgSec - QUESTION_BUDGET_SEC}s over budget per question — we'll rehearse pace in mocks`}
              </div>
              <div style={{ ...TYPE.label, color: C.faint, marginBottom: 6 }}>Pace distribution</div>
              <div style={{ display: "flex", gap: 2, height: 12, borderRadius: R.pill, overflow: "hidden" }}>
                <span style={{ flex: Math.max(0.02, pace.rushed), background: C.amber }} title={`Rushed: ${pace.rushed}`} />
                <span style={{ flex: Math.max(0.02, pace.onpace), background: C.green }} title={`On pace: ${pace.onpace}`} />
                <span style={{ flex: Math.max(0.02, pace.overtime), background: C.red }} title={`Overtime: ${pace.overtime}`} />
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: SP.sm, flexWrap: "wrap" }}>
                {[
                  { c: C.amber, l: `Rushed ${Math.round((pace.rushed / pace.count) * 100)}%` },
                  { c: C.green, l: `On pace ${Math.round((pace.onpace / pace.count) * 100)}%` },
                  { c: C.red, l: `Overtime ${Math.round((pace.overtime / pace.count) * 100)}%` },
                ].map((x) => (
                  <span key={x.l} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.soft }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: x.c }} />
                    {x.l}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <Measuring>Pace starts measuring from your next session — every answer is timed against the {QUESTION_BUDGET_SEC}s exam budget.</Measuring>
          )}
        </Card>
      </div>

      {/* real exam history */}
      <Card>
        <CardTitle icon="exam">Real exam history</CardTitle>
        {outcomes.length > 0 ? (
          <>
            <div style={{ display: "flex", gap: SP.sm, flexWrap: "wrap", marginBottom: SP.sm }}>
              {[...outcomes].reverse().map((o, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: R.md,
                    border: `1px solid ${o.passed ? "rgba(14,159,110,0.4)" : "rgba(194,116,11,0.4)"}`,
                    background: o.passed ? C.greenSoft : C.amberSoft,
                    fontSize: 13,
                  }}
                >
                  <Icon name={o.passed ? "celebrate" : "reflect"} size={14} color={o.passed ? C.green : C.amber} />
                  <span style={{ color: C.muted }}>{o.examDate}</span>
                  <b style={{ color: C.text }}>{o.passed ? "Passed" : o.score != null ? `${o.score}` : "Retake run"}</b>
                </span>
              ))}
              {rec.active && getPlan(paperId).examDate && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: R.md, border: `1.5px dashed ${C.brandLine}`, fontSize: 13 }}>
                  <Icon name="rocket" size={14} color={C.brand} />
                  <span style={{ color: C.muted }}>{getPlan(paperId).examDate}</span>
                  <b style={{ color: C.brand }}>This is the one</b>
                </span>
              )}
            </div>
            {rec.active && (
              <div style={{ ...TYPE.small, color: C.soft }}>You know exactly where the marks were lost — recovering them.</div>
            )}
          </>
        ) : (
          <Measuring>Your real sittings land here — pass or not, every one feeds the plan.</Measuring>
        )}
      </Card>
    </>
  )
}
