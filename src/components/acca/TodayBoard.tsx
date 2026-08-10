import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { C, R, SP, SHADOW, GRAD, Icon, IconBadge, type IconName } from "@/components/acca/ui"
import { RingGauge } from "@/components/acca/charts"
import CharlesMascot from "@/components/CharlesMascot"
import {
  composeToday,
  dayProgress,
  blockComplete,
  type BlockKind,
  type TodayBlock,
  type TodayComposition,
} from "@/lib/acca-today-composer"
import { tomorrowGate, todayCompletion, type TomorrowGate } from "@/lib/acca-day-gate"
import { projectReadiness } from "@/lib/acca-topic-plan"
import { shieldState } from "@/lib/acca-schedule"
import { getPlan } from "@/lib/acca-plan"
import type { TechArticle } from "@/lib/acca-tech-article"

/*
 * ── TODAY ─────────────────────────────────────────────────────────
 *
 * WHAT WAS HERE BEFORE. A greeting, a progress ring, one sentence about exam
 * timing, and a button labelled "Start 60-min Locked In session". The actual work
 * — which chapter, which questions, how many — existed only inside the full-screen
 * focus overlay, so the Today TAB itself showed the learner nothing they could
 * act on and nothing they could plan around. Opening the app told you that you
 * had work, not what it was.
 *
 * WHAT THIS IS. The day, visible: today's exact chapter with its difficulty and
 * time, then the five steps in the order they unlock, each one showing its real
 * count. One topic, five ways — study it, quiz it, practise it, revise it, read
 * the examiner's view of it. Nothing is hidden behind a mode.
 *
 * SEQUENTIAL UNLOCK. Only the first unfinished step is live. This is not
 * gamification: the sequence is pedagogical (you cannot quiz a chapter you have
 * not read, and practice before the quiz measures reading comprehension rather
 * than application), and locking it is what makes the order mean something.
 *
 * AND THEN IT STOPS. When the last step is done, the board is replaced by
 * tomorrow's plan behind a lock that opens at the learner's own study time. See
 * TomorrowCard below and acca-day-gate for why the lock is the correct design.
 */

const BLOCK_ICON: Record<BlockKind, IconName> = {
  study: "learn",
  quiz: "mission",
  practice: "practice",
  flashcards: "flashcards",
  article: "notes",
  diagnostic: "diagnostic",
}

const BLOCK_LABEL: Record<BlockKind, string> = {
  study: "Study",
  quiz: "Quiz",
  practice: "Practice",
  flashcards: "Flashcards",
  article: "Technical article",
  diagnostic: "Diagnostic",
}

const HARDNESS_TONE: Record<number, { fg: string; bg: string }> = {
  1: { fg: C.green, bg: C.greenSoft },
  2: { fg: C.amber, bg: C.amberSoft },
  3: { fg: C.brand, bg: C.brandSoft },
}

export interface TodayBoardProps {
  paperId: string
  paperName: string
  /** Learner's first name, for the greeting. */
  firstName?: string
  /** Ids of blocks already completed today (the caller owns this ledger). */
  done: string[]
  /** Launch a block. The caller maps kind → surface. */
  onRun: (block: TodayBlock, composition: TodayComposition) => void
  /** Open the technical article reader. */
  onArticle: (article: TechArticle) => void
  /** Called once, the first time the day completes — for confetti + the email. */
  onDayComplete?: (composition: TodayComposition) => void
  /** Pressed on tomorrow's card once its lock opens. */
  onStartTomorrow?: () => void
}

function greetingFor(name?: string): string {
  const h = new Date().getHours()
  const part = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
  return name?.trim() ? `${part}, ${name.trim()}` : part
}

export function TodayBoard({ paperId, paperName, firstName, done, onRun, onArticle, onDayComplete, onStartTomorrow }: TodayBoardProps) {
  const reduced = useReducedMotion()
  /*
   * Composed ONCE per (paper, completion-set). composeToday claims its question
   * ids for the calendar day, so re-composing on every render would keep
   * re-claiming and could drift the set mid-session; the memo also makes the day
   * stable across a reload, which is what the sequential unlock depends on.
   */
  const composition = useMemo(() => composeToday(paperId), [paperId, done.length])
  const progress = dayProgress(paperId, composition, done)
  const plan = getPlan(paperId)
  const streak = shieldState(paperId).streak
  const readiness = useMemo(() => projectReadiness(paperId), [paperId, done.length])

  // Fire the completion hook exactly once per day, from the render that first
  // observes a complete day — the caller handles its own idempotency too.
  const [announced, setAnnounced] = useState(() => Boolean(todayCompletion(paperId)))
  useEffect(() => {
    if (!progress.complete || announced) return
    setAnnounced(true)
    onDayComplete?.(composition)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.complete])

  if (progress.complete) {
    return (
      <TomorrowCard
        paperId={paperId}
        paperName={paperName}
        streak={streak}
        minutes={composition.totalMinutes}
        questions={composition.quiz.length + composition.practice.length}
        onStartTomorrow={onStartTomorrow ?? (() => window.location.reload())}
      />
    )
  }

  const chapter = composition.chapter
  const hard = composition.hardness
  const tone = hard ? HARDNESS_TONE[hard.level] : HARDNESS_TONE[1]

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* ── Header: who, where they stand, what today costs ── */}
      <div
        style={{
          borderRadius: R["2xl"],
          border: `1px solid ${C.border}`,
          background: `linear-gradient(135deg, rgba(200,0,0,0.045), ${C.card} 55%)`,
          padding: SP.xl,
          marginBottom: SP.lg,
          boxShadow: SHADOW.sm,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: SP.lg, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, color: C.text }}>{greetingFor(firstName)}</div>
            <div style={{ fontSize: 13, color: C.soft, marginTop: 3, lineHeight: 1.5 }}>
              {composition.isRevision
                ? `You've read every ${paperId} chapter. Today is a second pass on the one your answers say is weakest.`
                : chapter
                  ? `One topic, five ways — ${composition.totalMinutes} minutes against the ${composition.budgetMinutes} you committed to.`
                  : `Charles is preparing today's ${paperId} plan.`}
            </div>
            {streak > 1 && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "5px 11px", borderRadius: R.pill, background: C.amberSoft, color: C.amber, fontSize: 12, fontWeight: 800 }}>
                <Icon name="streak" size={13} color={C.amber} /> {streak}-day streak
              </div>
            )}
          </div>
          <RingGauge
            value={progress.percent}
            size={104}
            stroke={10}
            color={C.brand}
            label="TODAY"
            sublabel={`${progress.done} of ${progress.total}`}
          />
        </div>

        {/* Charles's read on where the pace lands — the honest projection. */}
        {readiness && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: SP.sm, marginTop: SP.lg, padding: "10px 12px", borderRadius: R.lg, background: C.card2 }}>
            <Icon name="tutor" size={15} color={C.brand} style={{ marginTop: 1 }} />
            <span style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.5 }}>{readiness.verdict}</span>
          </div>
        )}
      </div>

      {/*
        ── The diagnostic milestone ────────────────────────────────
        A zero-start learner has just covered the essential areas. Today is the
        measurement they earned, on its own — see the note in acca-today-composer
        for why it replaces the day rather than joining it.
      */}
      {composition.isDiagnosticDay && (
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: R.xl,
            border: `1px solid ${C.brandLine}`,
            background: `linear-gradient(135deg, rgba(200,0,0,0.07), ${C.card} 60%)`,
            padding: SP.lg,
            marginBottom: SP.lg,
            boxShadow: SHADOW.md,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: SP.sm }}>
            <CharlesMascot pose="present" size="clamp(72px, 22vw, 92px)" />
          </div>
          <div style={{ textAlign: "center", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: C.brand }}>
            MILESTONE UNLOCKED
          </div>
          <div style={{ textAlign: "center", fontSize: 12.5, color: C.soft, marginTop: SP.sm, lineHeight: 1.6 }}>
            You weren't measured on day one on purpose — a diagnostic before you'd read anything would have printed a
            number that meant nothing. You've earned this one.
          </div>
        </motion.div>
      )}

      {/*
        Still working toward it. Showing the gate makes the rule visible instead of
        leaving a beginner wondering why the app never tells them where they stand.
      */}
      {composition.diagnosticGate && composition.diagnosticGate.total > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: SP.md,
            padding: `${SP.md}px ${SP.lg}px`,
            borderRadius: R.lg,
            background: C.card2,
            border: `1px solid ${C.hairline}`,
            marginBottom: SP.lg,
          }}
        >
          <Icon name="lock" size={16} color={C.faint} />
          <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: C.soft, lineHeight: 1.55 }}>
            Your first Exam Readiness Score unlocks once you've studied, practised and revised the first{" "}
            {composition.diagnosticGate.total} areas — <b style={{ color: C.text }}>{composition.diagnosticGate.done} of {composition.diagnosticGate.total} done</b>
            {composition.diagnosticGate.nextLabel ? `. Next up: ${composition.diagnosticGate.nextArea} · ${composition.diagnosticGate.nextLabel}.` : "."}
          </span>
        </div>
      )}

      {/* ── Today's chapter — the exact topic, named ── */}
      {chapter && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          style={{
            borderRadius: R.xl,
            border: `1px solid ${C.brandLine}`,
            background: C.card,
            padding: SP.lg,
            marginBottom: SP.lg,
            boxShadow: SHADOW.sm,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: SP.sm, marginBottom: SP.sm, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.12em", color: C.brand }}>
              {composition.isRevision ? "TODAY'S REVISION" : "TODAY'S TOPIC"}
            </span>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: C.faint }}>
              {paperId} · AREA {chapter.area}
              {chapter.syllabusRefs?.length ? ` · ${chapter.syllabusRefs[0]}` : ""}
            </span>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: C.text, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
            {chapter.number ? <span style={{ color: C.brand, marginRight: 8 }}>{chapter.number}</span> : null}
            {chapter.title}
          </div>
          <div style={{ fontSize: 13, color: C.soft, marginTop: 6, lineHeight: 1.55 }}>{chapter.intro}</div>

          <div style={{ display: "flex", gap: SP.sm, marginTop: SP.md, flexWrap: "wrap" }}>
            {hard && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.pill, background: tone.bg, color: tone.fg, fontSize: 11.5, fontWeight: 800 }}>
                <Icon name="weak" size={12} color={tone.fg} /> {hard.label}
              </span>
            )}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.pill, background: C.card2, color: C.soft, fontSize: 11.5, fontWeight: 750 }}>
              <Icon name="time" size={12} color={C.soft} /> {composition.totalMinutes} min today
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: R.pill, background: C.card2, color: C.soft, fontSize: 11.5, fontWeight: 750 }}>
              <Icon name="topics" size={12} color={C.soft} /> {chapter.sections.length} sections
            </span>
          </div>
          {hard && (
            <div style={{ fontSize: 12, color: C.faint, marginTop: SP.sm, lineHeight: 1.5 }}>
              Timed from this chapter's own content: {hard.why}.
              {plan.dailyMinutes ? ` Your daily commitment is ${plan.dailyMinutes} min.` : ""}
            </div>
          )}
        </motion.div>
      )}

      {/* ── The five steps ── */}
      <div style={{ display: "grid", gap: SP.sm }}>
        {composition.blocks.map((block, i) => {
          const isDone = blockComplete(paperId, block, done)
          const isActive = i === progress.activeIndex
          const locked = !isDone && !isActive
          return (
            <StepRow
              key={block.id}
              block={block}
              index={i}
              total={composition.blocks.length}
              state={isDone ? "done" : isActive ? "active" : "locked"}
              reduced={Boolean(reduced)}
              onRun={() => {
                if (locked) return
                if (block.kind === "article" && composition.article) onArticle(composition.article)
                else onRun(block, composition)
              }}
            />
          )
        })}
      </div>

      {/* Honest note when the bank has been fully cycled — a milestone, not a fault. */}
      {composition.recycled && (
        <div style={{ display: "flex", gap: SP.sm, marginTop: SP.lg, padding: "12px 14px", borderRadius: R.lg, background: C.greenSoft, border: `1px solid rgba(14,159,110,0.22)` }}>
          <Icon name="trophy" size={16} color={C.green} style={{ marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: C.soft, lineHeight: 1.55 }}>
            You have now seen every question in this topic's bank at least once. Today's set is a deliberate second
            pass — spaced repetition on the questions you have already met is worth more than new material you have not
            earned yet.
          </span>
        </div>
      )}
    </motion.div>
  )
}

/* ── One step ─────────────────────────────────────────────────────*/

function StepRow({
  block,
  index,
  total,
  state,
  reduced,
  onRun,
}: {
  block: TodayBlock
  index: number
  total: number
  state: "done" | "active" | "locked"
  reduced: boolean
  onRun: () => void
}) {
  const active = state === "active"
  const done = state === "done"
  return (
    <motion.button
      type="button"
      onClick={onRun}
      disabled={state === "locked"}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 + index * 0.05, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      whileHover={state === "locked" || reduced ? undefined : { y: -2 }}
      whileTap={state === "locked" || reduced ? undefined : { scale: 0.995 }}
      style={{
        width: "100%",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: SP.md,
        padding: active ? "16px 16px" : "14px 16px",
        borderRadius: R.xl,
        cursor: state === "locked" ? "default" : "pointer",
        border: `1px solid ${active ? C.brandLine : C.border}`,
        background: active ? `linear-gradient(135deg, rgba(200,0,0,0.05), ${C.card} 60%)` : C.card,
        boxShadow: active ? SHADOW.md : SHADOW.sm,
        opacity: state === "locked" ? 0.55 : 1,
        transition: "opacity .2s",
      }}
    >
      {/* Step marker */}
      <span
        style={{
          position: "relative",
          width: 42,
          height: 42,
          borderRadius: R.md,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          background: done ? C.greenSoft : active ? GRAD : C.card2,
          color: done ? C.green : active ? "#fff" : C.faint,
          boxShadow: active ? SHADOW.brand : undefined,
        }}
      >
        {done ? (
          <Icon name="done" size={20} color={C.green} />
        ) : state === "locked" ? (
          <Icon name="lock" size={15} color={C.faint} />
        ) : (
          <Icon name={BLOCK_ICON[block.kind]} size={19} color="#fff" />
        )}
      </span>

      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: SP.sm, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: active ? C.brand : C.faint }}>
            STEP {index + 1}/{total} · {BLOCK_LABEL[block.kind].toUpperCase()}
          </span>
          {block.count ? (
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", color: C.faint }}>×{block.count}</span>
          ) : null}
        </span>
        <span
          style={{
            display: "block",
            fontSize: 14.5,
            fontWeight: 750,
            color: C.text,
            marginTop: 3,
            lineHeight: 1.3,
            textDecoration: done ? "line-through" : "none",
            textDecorationColor: C.faint,
          }}
        >
          {block.title}
        </span>
        <span style={{ display: "block", fontSize: 12.5, color: C.soft, marginTop: 3, lineHeight: 1.5 }}>{block.detail}</span>
      </span>

      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: done ? C.green : C.soft, fontVariantNumeric: "tabular-nums" }}>
          {block.minutes} min
        </span>
        {active && <Icon name="arrow" size={17} color={C.brand} />}
      </span>
    </motion.button>
  )
}

/* ── Tomorrow: revealed, and locked ───────────────────────────────
 *
 * The founder's spec, and it is the right one: congratulate, then show tomorrow
 * in full, then lock its Start button until the study time the learner chose —
 * with a note under the lock telling them to rest, because that is the actual
 * instruction. Working ahead tonight is how a daily plan becomes a backlog, and
 * the learners who would do it are the committed ones we can least afford to burn
 * out in week three.
 *
 * Tomorrow's composition is a DRY RUN (composeToday(paperId, true)): it reads the
 * exact chapter and counts without claiming any question ids, so previewing the
 * day cannot consume it.
 */

export function TomorrowCard({
  paperId,
  paperName,
  streak,
  minutes,
  questions,
  onStartTomorrow,
}: {
  paperId: string
  paperName: string
  streak: number
  minutes: number
  questions: number
  /**
   * Pressed once the lock opens. Reloading the route is what re-composes the day —
   * the gate is date-based, so "tomorrow" only becomes "today" after midnight has
   * passed AND the study time has arrived.
   */
  onStartTomorrow: () => void
}) {
  const reduced = useReducedMotion()
  const [gate, setGate] = useState<TomorrowGate>(() => tomorrowGate(paperId))

  // One tick a second while locked — the countdown is the reassurance that the
  // lock is temporary and exactly when it lifts.
  useEffect(() => {
    if (!gate.locked) return
    const id = window.setInterval(() => setGate(tomorrowGate(paperId)), 1000)
    return () => window.clearInterval(id)
  }, [paperId, gate.locked])

  const preview = useMemo(() => composeToday(paperId, /* dryRun */ true), [paperId])

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* ── Congratulation ── */}
      <div
        style={{
          borderRadius: R["2xl"],
          border: `1px solid rgba(14,159,110,0.28)`,
          background: `linear-gradient(135deg, rgba(14,159,110,0.09), ${C.card} 60%)`,
          padding: `${SP.xl}px ${SP.lg}px`,
          textAlign: "center",
          marginBottom: SP.lg,
          boxShadow: SHADOW.sm,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CharlesMascot pose="celebrate" size="clamp(96px, 28vw, 124px)" />
        </div>
        <div style={{ fontSize: "clamp(19px,4.4vw,23px)", fontWeight: 850, color: C.text, letterSpacing: "-0.015em", marginTop: SP.sm }}>
          Today's mission is complete
        </div>
        <div style={{ fontSize: 13.5, color: C.soft, marginTop: 6, lineHeight: 1.55, maxWidth: 420, margin: "6px auto 0" }}>
          {paperName} · every step done. {minutes} minutes and {questions} questions, and your readiness moved on evidence
          rather than an estimate.
        </div>
        {streak > 1 && (
          <motion.div
            initial={reduced ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.15 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              marginTop: SP.md,
              padding: "8px 16px",
              borderRadius: R.pill,
              background: GRAD,
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              boxShadow: SHADOW.brand,
            }}
          >
            <Icon name="streak" size={15} color="#fff" /> {streak}-day streak
          </motion.div>
        )}
      </div>

      {/* ── Tomorrow, in full ── */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: C.faint, marginBottom: SP.sm }}>
        TOMORROW · DAY {gate.tomorrowStreakDay}
      </div>
      <div
        style={{
          borderRadius: R.xl,
          border: `1px solid ${C.border}`,
          background: C.card,
          padding: SP.lg,
          marginBottom: SP.md,
          boxShadow: SHADOW.sm,
        }}
      >
        {preview.chapter ? (
          <>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: C.faint }}>
              {paperId} · AREA {preview.chapter.area}
            </div>
            <div style={{ fontSize: 17.5, fontWeight: 800, color: C.text, marginTop: 4, lineHeight: 1.3 }}>
              {preview.chapter.number ? <span style={{ color: C.brand, marginRight: 8 }}>{preview.chapter.number}</span> : null}
              {preview.chapter.title}
            </div>
          </>
        ) : (
          <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Tomorrow's plan is ready</div>
        )}

        <div style={{ display: "grid", gap: 7, marginTop: SP.md }}>
          {preview.blocks.map((b) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: SP.sm }}>
              <IconBadge name={BLOCK_ICON[b.kind]} tone="neutral" size={28} />
              <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: C.muted, lineHeight: 1.4 }}>{b.title}</span>
              <span style={{ fontSize: 11.5, fontWeight: 750, color: C.faint, fontVariantNumeric: "tabular-nums" }}>{b.minutes}m</span>
            </div>
          ))}
        </div>
      </div>

      {/*
        ── The Start button, and its lock ──────────────────────────
        One button in both states, so the learner sees the SAME control become
        available rather than a message being swapped for a control. Disabled while
        locked, with the countdown on it and the rest note underneath — the note is
        the actual instruction, not consolation for the lock.
      */}
      <div
        style={{
          borderRadius: R.xl,
          border: `1px ${gate.locked ? "dashed" : "solid"} ${gate.locked ? C.border : "rgba(14,159,110,0.3)"}`,
          background: gate.locked ? C.card2 : C.greenSoft,
          padding: SP.lg,
          textAlign: "center",
        }}
      >
        <motion.button
          type="button"
          disabled={gate.locked}
          onClick={gate.locked ? undefined : onStartTomorrow}
          whileHover={gate.locked || reduced ? undefined : { y: -2 }}
          whileTap={gate.locked || reduced ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 460, damping: 28 }}
          style={{
            width: "100%",
            maxWidth: 360,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: SP.sm,
            minHeight: 52,
            padding: "15px 22px",
            borderRadius: R.lg,
            border: "none",
            background: gate.locked ? C.card : GRAD,
            color: gate.locked ? C.faint : "#fff",
            fontSize: 15,
            fontWeight: 800,
            cursor: gate.locked ? "not-allowed" : "pointer",
            boxShadow: gate.locked ? "none" : SHADOW.brand,
            transition: "background .25s ease, color .25s ease, box-shadow .25s ease",
          }}
        >
          {gate.locked ? (
            <>
              <Icon name="lock" size={17} color={C.faint} />
              Starts at {gate.timeLabel.replace(" tomorrow", "")} · {gate.countdownLabel}
            </>
          ) : (
            <>
              <Icon name="mock" size={17} color="#fff" />
              Start day {gate.tomorrowStreakDay}
            </>
          )}
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={gate.locked ? "rest" : "open"}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: 13,
              color: C.soft,
              lineHeight: 1.6,
              marginTop: SP.md,
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {gate.locked ? gate.restNote : gate.openNote}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
