import { useMemo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { C, R, SP, SHADOW, Icon, type IconName } from "@/components/acca/ui"
import { MeterBar, RingGauge, TrendBars, BreakdownList, bandColor } from "@/components/acca/charts"
import { getPaperStats, getMockHistory, getDailyActivity, getQuestions } from "@/lib/acca"
import { getPlan } from "@/lib/acca-plan"
import { passProbability, MOCK_PASS, readinessState } from "@/lib/acca-loop"
import { passBand } from "@/lib/acca-diagnostic"
import {
  paceBySection,
  getPace,
  getMistakes,
  getCalibration,
  masteryScore,
  learningVelocity,
  forgettingRisk,
  probabilityMomentum,
  studyMinutesToday,
  QUESTION_BUDGET_SEC,
  type SectionPaceRead,
} from "@/lib/acca-analytics"
import { chapterCoverage, projectReadiness } from "@/lib/acca-topic-plan"
import { poolHealth } from "@/lib/acca-no-repeat"
import { shieldState } from "@/lib/acca-schedule"
import { flashcardStats } from "@/lib/acca-flashcards"
import { examBlueprint } from "@/lib/acca-exam-structure"

/*
 * ── PROGRESS: every metric that changes a decision ────────────────
 *
 * WHAT WAS HERE. Three stat cards (readiness / accuracy / answered), a button to
 * the diagnostic, and a mock-history list. Everything else the engine already
 * measured — pace, calibration, mistake causes, mastery, forgetting risk,
 * momentum — was computed and shown nowhere, or was buried in /study/analytics
 * which most learners never opened.
 *
 * THE RULE APPLIED HERE. A metric earns a place only if a learner could change
 * what they do tomorrow because of it. Each block therefore states the number AND
 * the action:
 *
 *   READINESS + PROJECTION  am I going to pass, and where does today's pace land?
 *   PACE BY SECTION         the one the founder asked for, and the right one: a
 *                           single seconds-per-question average across a paper
 *                           whose Section A is 2-mark objective tests and whose
 *                           Section C is a 20-mark written answer describes no
 *                           question that exists. Measured per section against
 *                           ACCA's own 1.8 minutes-per-mark budget.
 *   ACCURACY BY AREA        where the floor is, because marks live in the floor.
 *   COVERAGE                chapters read and bank worked through — the honest
 *                           denominator behind every percentage above.
 *   MISTAKE MIX             knowledge vs misread vs time vs slip: four different
 *                           problems with four different fixes.
 *   CALIBRATION             do you know what you know? Overconfidence is the
 *                           failure mode nobody self-diagnoses.
 *   RETENTION               what is going cold, and the streak keeping it warm.
 */

export function ProgressBoard({ paperId, onDiagnostic, onFullAnalytics, onWeak }: {
  paperId: string
  onDiagnostic: () => void
  onFullAnalytics: () => void
  onWeak: () => void
}) {
  const reduced = useReducedMotion()
  const stats = getPaperStats(paperId)
  const plan = getPlan(paperId)
  const prob = passProbability(paperId)
  const readiness = readinessState(paperId)
  const projection = useMemo(() => projectReadiness(paperId), [paperId])
  const coverage = useMemo(() => chapterCoverage(paperId), [paperId])
  const bank = poolHealth(paperId, "practice", getQuestions(paperId).length)
  const sections = useMemo(() => paceBySection(paperId), [paperId])
  const pace = getPace(paperId)
  const mistakes = getMistakes(paperId)
  const calibration = getCalibration(paperId)
  const mastery = masteryScore(paperId)
  const velocity = learningVelocity(paperId)
  const cooling = forgettingRisk(paperId)
  const momentum = probabilityMomentum(paperId)
  const streak = shieldState(paperId)
  const cards = flashcardStats(paperId)
  const mocks = getMockHistory(paperId)
  const activity = useMemo(() => getDailyActivity(28), [paperId])
  const blueprint = examBlueprint(paperId)
  const minutesToday = studyMinutesToday(paperId)

  const band = prob !== null ? passBand(prob) : null
  const activeDays = activity.filter((d) => d.count > 0).length

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* ── 1 · Readiness now, and where the pace lands ── */}
      <Block icon="stats" title="Exam readiness" action={{ label: "Full analytics", onClick: onFullAnalytics }}>
        <div style={{ display: "flex", gap: SP.lg, alignItems: "center", flexWrap: "wrap" }}>
          <RingGauge
            value={prob ?? 0}
            size={110}
            stroke={11}
            color={prob !== null ? bandColor(prob, plan.targetProb) : C.faint}
            label="READINESS"
            sublabel={prob !== null ? band?.label ?? "" : "measuring"}
          />
          <div style={{ flex: 1, minWidth: 190 }}>
            {readiness.measuring ? (
              <div style={{ fontSize: 13, color: C.soft, lineHeight: 1.6 }}>
                Still measuring you — {readiness.answered} of {readiness.answersNeeded} answers,{" "}
                {readiness.areasSeen}/{readiness.areasTotal} syllabus areas touched. A number quoted before that would sit
                near the 50% prior by construction, which would be a confident claim we haven't earned.
              </div>
            ) : (
              <>
                <StatLine label="Target" value={`${plan.targetProb}%`} />
                <StatLine
                  label="Projected on exam day"
                  value={projection ? `${projection.projected}%` : "—"}
                  tone={projection?.onTrack ? C.green : C.amber}
                />
                {momentum?.deltaPts !== null && momentum !== null && (
                  <StatLine
                    label="Last 14 days"
                    value={`${momentum.deltaPts! >= 0 ? "+" : ""}${momentum.deltaPts} pts`}
                    tone={momentum.deltaPts! >= 0 ? C.green : C.red}
                  />
                )}
                <StatLine label="Accuracy" value={`${Math.round(stats.accuracy * 100)}%`} />
                <StatLine label="Answered" value={`${stats.answered}`} />
              </>
            )}
          </div>
        </div>
        {projection && <Note>{projection.verdict}</Note>}
        {readiness.measuring && (
          <ActionRow label="Take the diagnostic — 25 questions, every area, one honest number" onClick={onDiagnostic} icon="diagnostic" />
        )}
      </Block>

      {/* ── 2 · Pace, per exam section — the metric that decides papers ── */}
      <Block
        icon="time"
        title="Time per question, by exam section"
        action={blueprint ? { label: `${blueprint.durationMin} min exam`, onClick: onFullAnalytics } : undefined}
      >
        {sections.length === 0 ? (
          <div style={{ fontSize: 13, color: C.soft, lineHeight: 1.6 }}>
            Nothing timed yet. Sit a section practice or a full mock and your seconds-per-mark appears here, section by
            section, against ACCA's own allowance of 1.8 minutes per mark.
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gap: SP.sm }}>
              {sections.map((s) => (
                <SectionPaceRow key={s.section} read={s} />
              ))}
            </div>
            <Note>
              {(() => {
                const slow = sections.filter((s) => s.deltaPerMark > 12)
                const fast = sections.filter((s) => s.deltaPerMark < -30)
                if (slow.length)
                  return `Section ${slow.map((s) => s.section).join(" and ")} is running ${Math.max(...slow.map((s) => s.deltaPerMark))}s per mark over the exam's allowance. That is the shape of a paper you don't finish — the fix is practising to the clock, not knowing more.`
                if (fast.length)
                  return `You're well inside the budget on Section ${fast.map((s) => s.section).join(" and ")}. Fast is only good if it's also right — check the accuracy row below before spending the saved minutes elsewhere.`
                return "Every section is inside ACCA's allowance. Hold this pace under mock conditions and the clock stops being a factor."
              })()}
            </Note>
          </>
        )}
        {pace && (
          <div style={{ display: "flex", gap: SP.md, marginTop: SP.md, flexWrap: "wrap" }}>
            <Chip label="Rushed" value={pace.rushed} tone={C.amber} hint={`under 30s`} />
            <Chip label="On pace" value={pace.onpace} tone={C.green} hint={`under ${QUESTION_BUDGET_SEC}s`} />
            <Chip label="Overtime" value={pace.overtime} tone={C.red} hint={`over ${QUESTION_BUDGET_SEC}s`} />
            {minutesToday > 0 && <Chip label="Today" value={`${minutesToday}m`} tone={C.brand} hint="measured from answers" />}
          </div>
        )}
      </Block>

      {/* ── 3 · Where the floor is ── */}
      {stats.answered >= 5 && (
        <Block icon="weak" title="Accuracy by syllabus area" action={{ label: "Drill the floor", onClick: onWeak }}>
          <BreakdownList
            items={[...stats.areas]
              .filter((a) => a.seen > 0)
              .sort((a, b) => a.accuracy - b.accuracy)
              .map((a) => ({
                code: a.code,
                label: a.label,
                pct: Math.round(a.accuracy * 100),
                valueText: `${a.correct}/${a.seen}`,
              }))}
            passLine={65}
          />
          <Note>
            Marks live in your weakest area, not your strongest — lifting a 45% area to 65% is worth more than pushing an
            80% area to 90%, and it takes less time.
          </Note>
        </Block>
      )}

      {/* ── 4 · Coverage — the denominator behind every percentage ── */}
      <Block icon="topics" title="Coverage">
        <div style={{ display: "grid", gap: SP.md }}>
          <CoverageRow
            label="Study text read"
            value={`${coverage.read}/${coverage.total} chapters`}
            percent={coverage.percent}
            foot={coverage.minutesLeft > 0 ? `${Math.round(coverage.minutesLeft / 60)}h of reading ahead` : "Whole syllabus read"}
          />
          <CoverageRow
            label="Question bank worked through"
            value={`${bank.served}/${bank.total}`}
            percent={bank.percent}
            foot={bank.cycle > 0 ? `A full pass done — you're on cycle ${bank.cycle + 1}` : `${bank.fresh} questions you have never seen`}
          />
          <CoverageRow
            label="Flashcards mastered"
            value={cards.total ? `${cards.mastered}/${cards.total}` : "—"}
            percent={cards.total ? Math.round((cards.mastered / cards.total) * 100) : 0}
            foot={cards.due > 0 ? `${cards.due} due now` : "Nothing due"}
          />
          {mastery && (
            <CoverageRow
              label="Topic mastery"
              value={`${mastery.strong}/${mastery.total} strong`}
              percent={mastery.score}
              foot={`Average mastery ${mastery.score}% — a topic counts as strong at 80%+`}
            />
          )}
        </div>
      </Block>

      {/* ── 5 · Why marks were lost ── */}
      {mistakes.length > 0 && (
        <Block icon="alert" title="Why marks were lost">
          <BreakdownList items={mistakes.map((m) => ({ code: m.label.slice(0, 2).toUpperCase(), label: m.label, pct: m.share, valueText: `${m.count}×` }))} passLine={101} />
          <Note>
            Four different problems with four different fixes: knowledge means re-read, misread means slow down on the
            stem, time means practise to the clock, and slip means check the units before submitting.
          </Note>
        </Block>
      )}

      {/* ── 6 · Do you know what you know? ── */}
      {calibration && (
        <Block icon="tutor" title="Confidence calibration">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: SP.md }}>
            <Tile label="Felt sure" value={`${calibration.claimed}%`} tone={C.soft} />
            <Tile label="Right when sure" value={`${calibration.deliveredWhenSure}%`} tone={C.green} />
            <Tile
              label="Overconfidence gap"
              value={`${calibration.gapPts > 0 ? "+" : ""}${calibration.gapPts} pts`}
              tone={calibration.gapPts > 15 ? C.red : C.soft}
            />
          </div>
          <Note>
            {calibration.gapPts > 15
              ? "You are more confident than you are correct. In an exam that shows up as not re-reading the questions you were sure about — which is exactly where the avoidable marks go."
              : "Your confidence tracks your accuracy closely. That is worth more than it sounds: it means you can trust your own flag-for-review decisions under time."}
          </Note>
        </Block>
      )}

      {/* ── 7 · Retention ── */}
      <Block icon="streak" title="Consistency and retention">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: SP.md }}>
          <Tile label="Current streak" value={`${streak.streak} days`} tone={streak.streak > 0 ? C.brand : C.faint} />
          <Tile label="Active in 28 days" value={`${activeDays}/28`} tone={C.soft} />
          <Tile label="Shields left" value={`${streak.shieldsLeft}`} tone={C.green} />
          {velocity.totalMastered > 0 && (
            <Tile
              label="Mastered this week"
              value={`${velocity.thisWeek}`}
              tone={velocity.thisWeek >= velocity.lastWeek ? C.green : C.amber}
            />
          )}
        </div>
        {cooling.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", color: C.faint, textTransform: "uppercase", margin: `${SP.md}px 0 ${SP.sm}px` }}>
              Going cold
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {cooling.slice(0, 4).map((t) => (
                <div key={t.code} style={{ display: "flex", alignItems: "center", gap: SP.sm, fontSize: 12.5, color: C.muted }}>
                  <Icon name="time" size={13} color={C.amber} />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    {t.code} · {t.label}
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 750, color: C.amber }}>{t.daysSince}d ago</span>
                </div>
              ))}
            </div>
            <Note>
              Mastery decays. These areas have not been touched in over a week — the flashcard step in today's plan pulls
              from them first, which is the cheapest way to keep them.
            </Note>
          </>
        )}
      </Block>

      {/* ── 8 · Mocks ── */}
      {mocks.length > 0 && (
        <Block icon="mock" title="Mock history" action={{ label: `best ${Math.max(...mocks.map((m) => m.percent))}%`, onClick: onFullAnalytics }}>
          {mocks.length >= 2 && (
            <TrendBars points={[...mocks].reverse().map((m) => ({ date: m.date, percent: m.percent }))} passLine={MOCK_PASS} unit="mock score" />
          )}
          <div style={{ display: "grid", gap: 7, marginTop: mocks.length >= 2 ? SP.md : 0 }}>
            {mocks.slice(0, 5).map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: SP.md, fontSize: 13, color: C.muted }}>
                <Icon name={m.percent >= MOCK_PASS ? "done" : "stats"} size={15} color={m.percent >= MOCK_PASS ? C.green : C.amber} />
                <span style={{ flex: 1, minWidth: 0 }}>{m.date}</span>
                <span style={{ fontSize: 12, color: C.soft }}>{m.correct}/{m.total}</span>
                <MeterBar value={m.percent} color={bandColor(m.percent, MOCK_PASS)} target={MOCK_PASS} height={5} style={{ width: 54, flexShrink: 0 }} />
                <span style={{ fontWeight: 800, width: 42, textAlign: "right", fontVariantNumeric: "tabular-nums", color: C.text }}>{m.percent}%</span>
              </div>
            ))}
          </div>
        </Block>
      )}
    </motion.div>
  )
}

/* ── Parts ────────────────────────────────────────────────────────*/

function SectionPaceRow({ read }: { read: SectionPaceRead }) {
  const over = read.deltaPerMark > 0
  const share = Math.round(read.inBudgetShare * 100)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: SP.md, padding: `${SP.sm}px ${SP.md}px`, borderRadius: R.md, background: C.bg, border: `1px solid ${C.hairline}` }}>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          background: over ? C.redSoft : C.greenSoft,
          color: over ? C.red : C.green,
          fontSize: 13,
          fontWeight: 850,
        }}
      >
        {read.section}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 13.5, fontWeight: 750, color: C.text }}>
          {read.avgSec}s per question
        </span>
        <span style={{ display: "block", fontSize: 11.5, color: C.soft, marginTop: 2 }}>
          {read.secPerMark}s per mark vs {read.budgetPerMark}s allowed · {read.count} timed · {share}% inside budget
        </span>
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: over ? C.red : C.green,
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {over ? "+" : ""}
        {read.deltaPerMark}s
      </span>
    </div>
  )
}

function Block({
  icon,
  title,
  action,
  children,
}: {
  icon: IconName
  title: string
  action?: { label: string; onClick: () => void }
  children: React.ReactNode
}) {
  return (
    <div style={{ borderRadius: R["2xl"], border: `1px solid ${C.border}`, background: C.card, padding: SP.lg, marginBottom: SP.md, boxShadow: SHADOW.sm }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: SP.md }}>
        <Icon name={icon} size={15} color={C.brand} />
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: C.soft }}>{title}</span>
        {action && (
          <button
            onClick={action.onClick}
            style={{ marginLeft: "auto", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 11.5, fontWeight: 750, color: C.brand, display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            {action.label} <Icon name="arrow" size={12} color={C.brand} />
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function StatLine({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: SP.sm, padding: "5px 0", borderBottom: `1px solid ${C.hairline}` }}>
      <span style={{ fontSize: 12.5, color: C.soft }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 800, color: tone ?? C.text, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  )
}

function CoverageRow({ label, value, percent, foot }: { label: string; value: string; percent: number; foot: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: SP.sm }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{value}</span>
      </div>
      <MeterBar value={percent} color={C.brand} height={5} style={{ marginTop: 7 }} />
      <div style={{ fontSize: 11.5, color: C.soft, marginTop: 5 }}>{foot}</div>
    </div>
  )
}

function Tile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ padding: SP.md, borderRadius: R.md, background: C.bg, border: `1px solid ${C.hairline}` }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.07em", color: C.faint, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 850, color: tone, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  )
}

function Chip({ label, value, tone, hint }: { label: string; value: string | number; tone: string; hint: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6, padding: "6px 11px", borderRadius: R.pill, background: C.card2, fontSize: 12 }}>
      <b style={{ color: tone, fontWeight: 850, fontVariantNumeric: "tabular-nums" }}>{value}</b>
      <span style={{ color: C.soft, fontWeight: 700 }}>{label}</span>
      <span style={{ color: C.faint, fontSize: 10.5 }}>{hint}</span>
    </span>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: SP.sm, marginTop: SP.md, padding: `10px 12px`, borderRadius: R.md, background: C.card2 }}>
      <Icon name="tutor" size={14} color={C.brand} style={{ marginTop: 1 }} />
      <span style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.55 }}>{children}</span>
    </div>
  )
}

function ActionRow({ label, onClick, icon }: { label: string; onClick: () => void; icon: IconName }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      style={{
        width: "100%",
        marginTop: SP.md,
        display: "flex",
        alignItems: "center",
        gap: SP.sm,
        padding: "12px 14px",
        borderRadius: R.md,
        border: `1px solid ${C.brandLine}`,
        background: C.brandSoft,
        cursor: "pointer",
        textAlign: "left",
        fontSize: 13,
        fontWeight: 750,
        color: C.brand,
      }}
    >
      <Icon name={icon} size={15} color={C.brand} />
      <span style={{ flex: 1, minWidth: 0 }}>{label}</span>
      <Icon name="arrow" size={14} color={C.brand} />
    </motion.button>
  )
}
