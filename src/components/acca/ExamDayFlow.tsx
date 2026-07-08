import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { getPaper, getMockHistory, getPaperStats } from "@/lib/acca"
import { getPlan, setPlan } from "@/lib/acca-plan"
import { qualificationProgress, suggestedNextPapers } from "@/lib/acca-qualification"
import { completePaper, recordExamOutcome, snoozeExamPrompt, startNextPaper, passProbability, MOCK_PASS } from "@/lib/acca-loop"
import PostMortemPanel from "@/components/acca/PostMortemPanel"
import type { PostMortemAction } from "@/lib/acca-ai"
import { Button, Icon, IconBadge, C } from "@/components/acca/ui"
import { RingGauge } from "@/components/acca/charts"

/*
 * Exam day — the loop's decision point. Shows once the exam date arrives:
 *
 *   "How did it go?"
 *     PASS  → confetti celebration, qualification progress updates, the next
 *             paper unlocks and the loop restarts.
 *     FAIL  → reflection session: emotional support, comparison with mocks,
 *             Lara's examiner analysis, a new exam date → new roadmap.
 *     WAIT  → snooze while results are pending.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"
const RED = "#C80000"
const GREEN = "#10B981"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

function datePlusMonths(months: number): string {
  const d = new Date()
  d.setMonth(d.getMonth() + months)
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${`${d.getDate()}`.padStart(2, "0")}`
}

type Stage = "ask" | "import" | "celebrate" | "reflect"

export default function ExamDayFlow({
  paperId,
  onDone,
  onStartPaper,
  onAction,
}: {
  paperId: string
  /** The flow finished (snoozed, replanned, or "choose paper later"). */
  onDone: () => void
  /** The learner picked their next paper from the celebration screen. */
  onStartPaper: (pid: string) => void
  /** Jump straight into a practice mode from the reflection plan. */
  onAction: (a: PostMortemAction) => void
}) {
  const paper = getPaper(paperId)
  const [stage, setStage] = useState<Stage>("ask")
  const [examScore, setExamScore] = useState<number | null>(null)

  if (!paper) return null

  function onPassed() {
    completePaper(paperId)
    setStage("celebrate")
  }

  function onFailed() {
    // Capture the mark first — it sharpens the whole recovery run.
    setStage("import")
  }

  function onImported(score: number | null) {
    recordExamOutcome(paperId, false, score)
    setExamScore(score)
    setStage("reflect")
  }

  function onWaiting() {
    snoozeExamPrompt(paperId, 3)
    onDone()
  }

  return (
    <AnimatePresence mode="wait">
      {stage === "ask" && (
        <motion.div
          key="ask"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ ...card({ padding: 20, marginBottom: 16 }), borderLeft: `3px solid ${RED}`, background: "linear-gradient(135deg, rgba(200,0,0,0.06), var(--sch-card))" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.span
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
              style={{ display: "inline-flex", transformOrigin: "bottom center" }}
            >
              <IconBadge name="exam" tone="brand" size={44} />
            </motion.span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: TEXT }}>Your {paper.id} exam day has arrived</div>
              <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>The whole loop led here. How did it go?</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
            <Button variant="primary" full onClick={onPassed}>
              I passed
              <Icon name="celebrate" size={16} color="#fff" />
            </Button>
            <Button variant="secondary" full onClick={onFailed}>
              Not this time
            </Button>
          </div>
          <Button variant="ghost" onClick={onWaiting} style={{ display: "flex", margin: "8px auto 0", fontSize: 12.5, fontWeight: 600, color: DIM }}>
            Results aren't out yet — ask me in a few days
          </Button>
        </motion.div>
      )}

      {stage === "import" && <ResultImport key="import" paperId={paperId} onImported={onImported} />}

      {stage === "celebrate" && (
        <Celebration key="celebrate" paperId={paperId} onStartPaper={onStartPaper} onLater={onDone} />
      )}

      {stage === "reflect" && (
        <Reflection key="reflect" paperId={paperId} score={examScore} onReplanned={onDone} onAction={onAction} />
      )}
    </AnimatePresence>
  )
}

/* ── FAIL step 1: import the result (self-reported) ───────────── */

function ResultImport({ paperId, onImported }: { paperId: string; onImported: (score: number | null) => void }) {
  const paper = getPaper(paperId)
  const [raw, setRaw] = useState("")
  const parsed = raw.trim() === "" ? null : Math.max(0, Math.min(100, Math.round(Number(raw))))
  const valid = parsed !== null && Number.isFinite(parsed)

  return (
    <motion.div
      key="import"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{ ...card({ padding: 22, marginBottom: 16 }) }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <IconBadge name="stats" tone="brand" size={44} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: TEXT }}>Log your {paper?.id} mark</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>
            Your mark shows exactly how far the pass line was — it sharpens every step of the recovery plan.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={100}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="e.g. 43"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && valid) onImported(parsed)
          }}
          style={{
            flex: 1,
            boxSizing: "border-box",
            padding: "13px 16px",
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 12,
            border: `1.5px solid ${BORDER}`,
            background: "var(--sch-bg)",
            color: TEXT,
            outline: "none",
          }}
        />
        <span style={{ fontSize: 15, fontWeight: 700, color: MUTED }}>/ 100 · pass mark {MOCK_PASS}</span>
      </div>
      <Button variant="primary" size="lg" full disabled={!valid} onClick={() => valid && onImported(parsed)}>
        Save my mark — show me the way back
      </Button>
      <Button
        variant="ghost"
        onClick={() => onImported(null)}
        style={{ display: "flex", margin: "8px auto 0", fontSize: 12.5, fontWeight: 600, color: DIM }}
      >
        I don't have my mark — continue without it
      </Button>
    </motion.div>
  )
}

/* ── PASS: celebrate → unlock the next paper ──────────────────── */

function Celebration({
  paperId,
  onStartPaper,
  onLater,
}: {
  paperId: string
  onStartPaper: (pid: string) => void
  onLater: () => void
}) {
  const paper = getPaper(paperId)
  const qual = qualificationProgress()
  const next = useMemo(() => suggestedNextPapers().slice(0, 4), [])

  useEffect(() => {
    const fire = (x: number, angle: number) =>
      confetti({ particleCount: 90, spread: 70, angle, origin: { x, y: 0.7 }, colors: ["#C80000", "#E50068", "#F4A405", "#10B981"] })
    fire(0.5, 90)
    const t1 = setTimeout(() => fire(0.15, 60), 250)
    const t2 = setTimeout(() => fire(0.85, 120), 450)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      style={{ ...card({ padding: 26, marginBottom: 16 }), textAlign: "center", borderColor: "rgba(16,185,129,0.4)" }}
    >
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15, stiffness: 200 }} style={{ display: "inline-flex", marginBottom: 10 }}>
        <IconBadge name="celebrate" tone="green" size={64} />
      </motion.div>
      <h2 style={{ fontSize: 25, fontWeight: 800, color: TEXT, margin: "0 0 6px" }}>
        {paper?.id} — <span style={iriText}>PASSED</span>
      </h2>
      <p style={{ color: MUTED, fontSize: 14.5, lineHeight: 1.55, margin: "0 0 18px" }}>
        Every mission, every mock, every flashcard — it all just paid off. That exam is behind you forever.
      </p>

      {/* qualification progress, freshly updated */}
      <div style={{ maxWidth: 380, margin: "0 auto 20px", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, marginBottom: 6 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, color: TEXT }}>
            <Icon name="trophy" size={14} color={C.amber} />
            Journey to membership
          </span>
          <span style={{ color: MUTED }}>
            <b style={{ color: GREEN }}>{qual.passedCount}</b> of {qual.totalExams} · {qual.percent}%
          </span>
        </div>
        <div style={{ height: 9, borderRadius: 999, background: "var(--sch-card-2)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(3, qual.percent)}%` }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            style={{ height: "100%", borderRadius: 999, background: IRIDESCENT }}
          />
        </div>
      </div>

      {next.length > 0 ? (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: RED, margin: "0 0 10px" }}>
            <Icon name="loop" size={13} color={RED} strokeWidth={2.4} />
            NEXT PAPER UNLOCKED — RESTART THE LOOP
          </div>
          <div style={{ display: "grid", gap: 8, textAlign: "left" }}>
            {next.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  startNextPaper(p.id)
                  onStartPaper(p.id)
                }}
                style={{ ...card({ padding: 13, cursor: "pointer" }), display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 13, flexShrink: 0 }}>
                  {p.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: TEXT }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: DIM }}>{p.code} · {p.level}</div>
                </div>
                <Icon name="arrow" size={17} color={RED} style={{ flexShrink: 0 }} />
              </motion.button>
            ))}
          </div>
          <Button variant="ghost" onClick={onLater} style={{ display: "flex", margin: "10px auto 0", fontSize: 13, fontWeight: 600, color: DIM }}>
            I'll choose my next paper later
          </Button>
        </>
      ) : (
        <Button variant="primary" size="lg" onClick={onLater}>
          That was the last one — you're through every exam
          <Icon name="trophy" size={17} color="#fff" />
        </Button>
      )}
    </motion.div>
  )
}

/* ── FAIL: reflection session → new date → new roadmap ────────── */

function Reflection({
  paperId,
  score,
  onReplanned,
  onAction,
}: {
  paperId: string
  /** Self-reported real exam mark (0–100) when shared. */
  score: number | null
  onReplanned: () => void
  onAction: (a: PostMortemAction) => void
}) {
  const paper = getPaper(paperId)
  const mocks = getMockHistory(paperId)
  const stats = getPaperStats(paperId)
  const [newDate, setNewDate] = useState("")
  const [preset, setPreset] = useState<3 | 6 | null>(null)
  const mockAvg = mocks.length ? Math.round(mocks.reduce((s, m) => s + m.percent, 0) / mocks.length) : null
  // The outcome is already recorded, so this read is exam-recalibrated: the
  // learner model has absorbed the real result.
  const recalibrated = passProbability(paperId)

  const pmInput = useMemo(
    () => ({
      kind: "exam" as const,
      paperId,
      percent: score,
      areas: stats.areas.filter((a) => a.seen > 0).map((a) => ({ code: a.code, label: a.label, correct: a.correct, seen: a.seen })),
      mockHistory: mocks.map((m) => ({ date: m.date, percent: m.percent })),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paperId, score],
  )

  function pickPreset(months: 3 | 6) {
    setPreset(months)
    setNewDate(datePlusMonths(months))
  }

  function rebuild() {
    setPlan(paperId, { examDate: newDate || null })
    onReplanned()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginBottom: 16 }}>
      {/* emotional support first — before any analysis */}
      <div style={{ ...card({ padding: 22, marginBottom: 12 }), textAlign: "center" }}>
        <div style={{ display: "inline-flex", marginBottom: 10 }}>
          <IconBadge name="support" tone="brand" size={52} />
        </div>
        <h2 style={{ fontSize: 21, fontWeight: 800, color: TEXT, margin: "0 0 8px" }}>This one stung. Let it.</h2>
        <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.65, margin: 0, maxWidth: 420, marginInline: "auto" }}>
          A failed sitting is an event, not a verdict — a huge share of ACCA members failed at least one paper on
          the way to membership. Take today off if you need it. When you're ready, the plan below is how we come
          back — and {paper?.id} won't get a second win against you.
        </p>
        {mockAvg !== null && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, padding: "8px 14px", borderRadius: 999, background: "var(--sch-card-2)", fontSize: 12.5, color: MUTED }}>
            <Icon name="stats" size={14} color={MUTED} />
            Your mocks averaged <b style={{ color: TEXT }}>{mockAvg}%</b>
            {mockAvg >= 50 ? " — the knowledge is there; exam day is what we'll rehearse harder." : " — we'll lift the base before the retake."}
          </div>
        )}
      </div>

      {/* the recalibrated learner model — the result already fed the engine */}
      {recalibrated !== null && (
        <div style={{ ...card({ padding: 20, marginBottom: 12 }), display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <RingGauge value={recalibrated} size={104} stroke={9} target={MOCK_PASS} suffix="%" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: RED, marginBottom: 5 }}>
              RECALIBRATED PASS PROBABILITY
            </div>
            <div style={{ fontWeight: 750, fontSize: 15, color: TEXT, lineHeight: 1.4 }}>
              You now know exactly where the marks were lost. Let's recover them.
            </div>
            <div style={{ fontSize: 12.5, color: MUTED, marginTop: 4, lineHeight: 1.5 }}>
              {score !== null
                ? `Your real mark (${score}%) is now the strongest evidence in your learner model — every question you answer from here earns this number back up.`
                : "The result is in your learner model — every question you answer from here earns this number back up."}
            </div>
          </div>
        </div>
      )}

      {/* Lara's examiner analysis + comeback plan */}
      <PostMortemPanel input={pmInput} onAction={onAction} />

      {/* new exam date → new roadmap */}
      <div style={card({ padding: 20 })}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: 15, color: TEXT, marginBottom: 4 }}>
          <Icon name="calendar" size={17} color={RED} />
          Pick the retake sitting
        </div>
        <p style={{ fontSize: 13, color: MUTED, margin: "0 0 12px", lineHeight: 1.5 }}>
          The moment you set it, I rebuild your roadmap and daily missions around the new date.
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {([3, 6] as const).map((m) => (
            <Button
              key={m}
              variant="secondary"
              onClick={() => pickPreset(m)}
              style={{
                flex: 1,
                fontSize: 13.5,
                ...(preset === m ? { borderColor: C.brand, background: C.brandSoft, color: C.brand } : {}),
              }}
            >
              In ~{m} months
            </Button>
          ))}
        </div>
        <input
          type="date"
          value={newDate}
          onChange={(e) => { setNewDate(e.target.value); setPreset(null) }}
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 15px", borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, fontSize: 14.5, colorScheme: "dark light", marginBottom: 14 }}
        />
        <Button variant="primary" size="lg" full onClick={rebuild}>
          {newDate ? "Rebuild my roadmap — back into the loop" : "Continue without a date — pace me by mastery"}
        </Button>
      </div>
    </motion.div>
  )
}
