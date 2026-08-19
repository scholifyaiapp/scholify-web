import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"
import { iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { Icon, Card, Button, C, SP, R, type IconName } from "@/components/acca/ui"
import { RingGauge, MeterBar, bandColor } from "@/components/acca/charts"
import { buildCbeMock, type CbeMock, type CbeItem, type CbeSection } from "@/lib/acca-cbe-mock"
import { nextMockForm } from "@/lib/acca-mockforms"
import { mockProgress, passProbability, MOCK_PASS } from "@/lib/acca-loop"
import { gradeQuestion, recordAnswer, recordMock, getPaper } from "@/lib/acca"
import { withShuffledOptions } from "@/lib/acca-options"
import { recordMistake, recordAnswerTiming, snapshotProbability } from "@/lib/acca-analytics"
import { recordDayActive } from "@/lib/acca-schedule"
import { queueAccaProgressPush } from "@/lib/acca-cloud"
import { markFirstTaskCompleted } from "@/lib/retention"
import { ProCountdown } from "@/components/acca/ProCountdown"
import { trackEvent } from "@/lib/analytics"
import { markAnswer, type ExaminerResult } from "@/lib/acca-ai"
import { serializeForMarking, type Cells } from "@/lib/spreadsheet"
import SpreadsheetPad from "@/components/acca/SpreadsheetPad"
import CbeToolsDock from "@/components/acca/CbeTools"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { readMockSitting, saveMockSitting, clearMockSitting, sittingDisposition, type MockSitting } from "@/lib/acca-mock-sitting"
import type { AccaQuestion } from "@/lib/acca-content"

/*
 * The sectioned CBE mock — Scholify's full exam rehearsal, in the official
 * shape of the paper's real computer-based exam:
 *
 *   Section A → Section B → Section C, one exam clock across the sitting,
 *   free navigation with the CBE question navigator, flag-for-review,
 *   scenario blocks for OT cases, and the word processor + spreadsheet for
 *   constructed tasks — which Charles marks as part of the mock's score.
 *
 * The flow every real CBE has: intro (exam summary) → the sitting → review
 * screen (unanswered + flagged) → submit → marking → results. Running out of
 * clock submits the exam, exactly like exam day.
 */

type Stage = "intro" | "run" | "review" | "marking" | "results"

interface FlatItem {
  key: string
  section: CbeSection
  item: CbeItem
  /** 1-based number across the whole exam — what the navigator shows. */
  n: number
}

interface ObjAnswer {
  choice?: number | null
  multi?: number[]
  num?: string
}

interface TaskAnswer {
  text: string
  cells: Cells
}

interface TaskOutcome {
  key: string
  title: string
  maxMarks: number
  attempted: boolean
  result: ExaminerResult | null
}

interface Outcome {
  earned: number
  total: number
  percent: number
  perSection: { id: string; kind: string; label: string; earned: number; marks: number }[]
  tasks: TaskOutcome[]
  unanswered: number
  flagged: number
  secondsUsed: number
  expired: boolean
  /** Marks Charles could NOT reach to mark — excluded from the recorded score. */
  unmarkedMarks: number
  /** False when nothing could be marked: the sitting was kept, not booked. */
  recorded: boolean
}

function fmtClock(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
}

function itemKey(it: CbeItem): string {
  return it.kind === "task" ? it.task.id : it.q.id
}

export default function CbeMockRunner({ paperId, onBack, form: chosenForm }: { paperId: string; onBack: () => void; form?: number }) {
  const paper = getPaper(paperId)
  const bp = examBlueprint(paperId)

  /*
   * A saved sitting for THIS form means the learner left mid-exam — closed the
   * tab, crashed, walked away. Read it once, before anything is composed.
   * Resuming is sound because the composition below is fully deterministic
   * (buildCbeMock is pure; withShuffledOptions seeds from each question id),
   * so the restored answer indices land on the identical options.
   */
  const [restored] = useState<{ sitting: MockSitting; mode: "resume" | "expire" } | null>(() => {
    const form = chosenForm ?? nextMockForm(mockProgress(paperId).attempts)
    const saved = readMockSitting(paperId, form)
    if (!saved) return null
    const mode = sittingDisposition(saved)
    if (mode === "discard") {
      // Time ran out on an untouched sitting — throw it away rather than
      // record a 0% the learner never sat.
      clearMockSitting(paperId, form)
      return null
    }
    return { sitting: saved, mode }
  })

  // Compose once per sitting: the form the learner chose in the Mock Centre, or
  // their next form in sequence. Options de-biased the same way every other
  // session is (shuffled options, remapped answer).
  const [mock] = useState<CbeMock>(() => {
    const form = restored?.sitting.form ?? chosenForm ?? nextMockForm(mockProgress(paperId).attempts)
    const raw = buildCbeMock(paperId, form)
    return {
      ...raw,
      sections: raw.sections.map((s) => ({
        ...s,
        items: s.items.map((it) =>
          it.kind === "task" ? it : it.kind === "ot" ? { ...it, q: withShuffledOptions(it.q) } : { ...it, q: withShuffledOptions(it.q) },
        ),
      })),
    }
  })

  const items = useMemo<FlatItem[]>(() => {
    let n = 0
    return mock.sections.flatMap((section) =>
      section.items.map((item) => {
        n += 1
        return { key: itemKey(item), section, item, n }
      }),
    )
  }, [mock])

  /*
   * All exam state initialises from the restored sitting when there is one.
   * A resumed learner lands back INSIDE the exam ("run"), on the question they
   * left, with the same wall-clock deadline — closing the tab never paused the
   * clock, exactly as backgrounding it never did. An EXPIRED sitting also
   * mounts into "run": the deadline timeout below then fires immediately and
   * submits what was answered, which is precisely what the real CBE does when
   * time runs out.
   */
  const [stage, setStage] = useState<Stage>(restored ? "run" : "intro")
  const [cursor, setCursor] = useState(restored ? restored.sitting.cursor : 0)
  const [answers, setAnswers] = useState<Record<string, ObjAnswer>>(restored ? restored.sitting.answers : {})
  const [essays, setEssays] = useState<Record<string, TaskAnswer>>(restored ? restored.sitting.essays : {})
  const [essayTab, setEssayTab] = useState<Record<string, "word" | "sheet">>({})
  const [flags, setFlags] = useState<Record<string, boolean>>(restored ? restored.sitting.flags : {})
  const [navOpen, setNavOpen] = useState(false)
  // The navigator is opt-in during an attempt. Moving into or out of the exam
  // must always close it so the first question starts unobstructed.
  useEffect(() => setNavOpen(false), [stage])
  /*
   * The sitting's wall-clock deadline, fixed ONCE — when the learner presses
   * Start, not when the component mounts. It was set at mount, which meant the
   * clock was already running while the intro screen was still explaining the
   * exam: five minutes reading the summary was five minutes silently gone from
   * the sitting. Zero means "not started yet"; a restored sitting carries its
   * original deadline, because closing the tab never pauses a live exam.
   * ProCountdown ticks itself off this, so the clock never re-renders the runner.
   */
  const [deadline, setDeadline] = useState<number>(() => restored?.sitting.deadline ?? 0)

  /*
   * PERSIST THE SITTING as it progresses — every answer, essay keystroke batch,
   * flag and cursor move while the exam is live. This is what makes a closed
   * tab, a crash or a dead battery cost nothing: the next open of this form
   * resumes exactly here. The slot is cleared the moment the sitting is
   * recorded (in submit) so a finished mock can never resurrect.
   */
  useEffect(() => {
    if ((stage !== "run" && stage !== "review") || deadline === 0) return
    saveMockSitting({ paperId, form: mock.form, deadline, cursor, answers, essays, flags, savedAt: Date.now() })
  }, [stage, paperId, mock.form, deadline, cursor, answers, essays, flags])
  /** Seconds actually used, computed on demand rather than tracked every second. */
  const secondsUsed = (): number => Math.min(mock.seconds, Math.max(0, Math.round((Date.now() - (deadline - mock.seconds * 1000)) / 1000)))
  const [markingNote, setMarkingNote] = useState("")
  const [outcome, setOutcome] = useState<Outcome | null>(null)

  const hasSheet = (bp?.cbeTools ?? []).includes("spreadsheet")
  const current = items[cursor]

  /* ── the one exam clock ── */
  const submittingRef = useRef(false)
  // submit() closes over answers/essays/cursor and is recreated every render;
  // the interval below must always call the latest one, or a stale closure
  // from the render that started the timer submits an exam as if it were
  // still empty. Route every expiry through a ref, not the captured value.
  const submitRef = useRef(submit)
  useEffect(() => {
    submitRef.current = submit
  })
  // ONE timeout at the deadline, not a per-second decrement. A 3h15 mock ticking
  // page state re-rendered this whole runner — every question, the navigator, the
  // spreadsheet pad — 11,700 times over a sitting, purely to repaint the clock.
  // A wall-clock deadline is also honest across a backgrounded tab, where a
  // decrementing interval is throttled and the exam clock effectively pauses.
  useEffect(() => {
    if ((stage !== "run" && stage !== "review") || deadline === 0) return
    const t = window.setTimeout(() => {
      // Time: the CBE submits your exam for you.
      if (!submittingRef.current) void submitRef.current(true)
    }, Math.max(0, deadline - Date.now()))
    return () => window.clearTimeout(t)
  }, [stage, deadline])

  /* ── per-question timing analytics (first leave only) ── */
  const shownAt = useRef(performance.now())
  const timed = useRef(new Set<string>())
  useEffect(() => {
    shownAt.current = performance.now()
  }, [cursor])
  function noteTiming(it: FlatItem | undefined) {
    if (!it || it.item.kind === "task" || timed.current.has(it.key)) return
    timed.current.add(it.key)
    // Marks and the REAL section come from the composed exam, so the per-section
    // pace read (paceBySection) is measured rather than inferred here — this is
    // the one surface that knows the section for certain.
    const q = it.item.kind === "ot" ? it.item.q : it.item.kind === "caseq" ? it.item.q : undefined
    recordAnswerTiming(paperId, (performance.now() - shownAt.current) / 1000, q?.marks ?? 2, it.section.id)
  }

  function answered(f: FlatItem): boolean {
    if (f.item.kind === "task") {
      const e = essays[f.key]
      return !!e && (e.text.trim() !== "" || Object.values(e.cells).some((v) => v.trim() !== ""))
    }
    const a = answers[f.key]
    if (!a) return false
    const q = f.item.q
    if (q.type === "number") return (a.num ?? "").trim() !== "" && !Number.isNaN(parseFloat((a.num ?? "").replace(/,/g, "")))
    if (q.type === "multi") return (a.multi ?? []).length > 0
    return a.choice !== null && a.choice !== undefined
  }

  function goto(i: number) {
    noteTiming(current)
    setCursor(Math.max(0, Math.min(items.length - 1, i)))
    setNavOpen(false)
    if (stage === "review") setStage("run")
  }

  function response(q: AccaQuestion, a: ObjAnswer | undefined): number | number[] {
    if (q.type === "number") return parseFloat((a?.num ?? "").replace(/,/g, ""))
    if (q.type === "multi") return a?.multi ?? []
    return a?.choice ?? -1
  }

  /* ── submit → grade OTs, Charles marks the constructed tasks, record ── */
  async function submit(expired = false) {
    if (submittingRef.current) return
    submittingRef.current = true
    noteTiming(current)
    setStage("marking")

    let earned = 0
    const perSection: Outcome["perSection"] = []
    let unanswered = 0

    for (const section of mock.sections) {
      let sectionEarned = 0
      for (const item of section.items) {
        if (item.kind === "task") continue
        const key = item.q.id
        const isAnswered = answered({ key, section, item, n: 0 })
        if (!isAnswered) unanswered += 1
        const result = gradeQuestion(item.q, response(item.q, answers[key]))
        // Only feed ANSWERED questions into the per-area knowledge model. An
        // unanswered item isn't evidence the learner can't do it — it's a time
        // problem, already attributed to "time" via recordMistake below. Recording
        // it as seen-and-wrong here too would double-count and depress readiness.
        if (isAnswered) recordAnswer(item.q.paper, item.q, result.correct)
        if (result.correct) {
          sectionEarned += item.q.marks
          earned += item.q.marks
        }
      }
      perSection.push({ id: section.id, kind: section.kind, label: section.label, earned: sectionEarned, marks: section.marks })
    }

    // Constructed tasks — marked one at a time so the learner sees progress.
    // A task Charles cannot REACH is not a zero: its marks are excluded from
    // the recorded denominator (see below). The server's own keyword-heuristic
    // fallback is different — rough but real marks — and records normally.
    const tasks: TaskOutcome[] = []
    let unmarkedMarks = 0
    const taskItems = items.filter((f) => f.item.kind === "task")
    for (let i = 0; i < taskItems.length; i++) {
      const f = taskItems[i]
      if (f.item.kind !== "task") continue
      const task = f.item.task
      const e = essays[f.key]
      const attempted = !!e && (e.text.trim() !== "" || Object.values(e.cells).some((v) => v.trim() !== ""))
      if (!attempted) {
        unanswered += 1
        tasks.push({ key: f.key, title: task.topic, maxMarks: task.maxMarks, attempted: false, result: null })
        continue
      }
      setMarkingNote(`Charles is analysing “${task.topic}” — task ${i + 1} of ${taskItems.length}…`)
      try {
        const workings = serializeForMarking(e.cells)
        const submission = workings ? `${e.text.trim()}\n\n${workings}` : e.text
        const r = await markAnswer(task, submission)
        if (r.unmarked) {
          unmarkedMarks += task.maxMarks
          tasks.push({ key: f.key, title: task.topic, maxMarks: task.maxMarks, attempted: true, result: r })
          continue
        }
        earned += r.marks
        const sec = perSection.find((s) => s.id === f.section.id)
        if (sec) sec.earned += r.marks
        tasks.push({ key: f.key, title: task.topic, maxMarks: task.maxMarks, attempted: true, result: r })
      } catch {
        // markAnswer never throws in practice (it returns its unreachable
        // shape), but a defensive throw is the same situation: unmarked.
        unmarkedMarks += task.maxMarks
        tasks.push({ key: f.key, title: task.topic, maxMarks: task.maxMarks, attempted: true, result: null })
      }
    }

    const total = mock.totalMarks
    /*
     * SCORE WHAT WAS ACTUALLY MARKED. The percent is earned over the marks
     * that received real marking — objective sections plus genuinely marked
     * tasks. Marks Charles couldn't reach are excluded from the denominator
     * rather than silently counted as zeros: a marking outage on an
     * all-written SP paper would otherwise book a near-0% sitting from three
     * hours of real answers, flip latestPassed, kill examReady and poison the
     * trend — a false fail recorded by a network blip.
     */
    const markedTotal = total - unmarkedMarks
    const percent = markedTotal > 0 ? Math.round((earned / markedTotal) * 100) : 0
    const recorded = markedTotal > 0

    if (recorded) {
      // The learner record: this WAS a mock — it feeds the gate, the trend and
      // the pass-probability model exactly as before, over the marked total.
      recordMock(paperId, Math.round(earned), markedTotal, mock.form)
      // The sitting is recorded, so its resume slot must die with it — a
      // finished mock that could resurrect on the next open would double-record.
      clearMockSitting(paperId, mock.form)
    }
    /*
     * NOTHING could be marked (a full outage on an all-written paper): record
     * no mock and KEEP the resume slot. The learner's answers are safe in the
     * sitting store; reopening this form resubmits them for marking through
     * the ordinary expired-sitting path. Losing three hours of answers to a
     * blip — or booking them as 0% — are both worse than asking for one more
     * click when the connection returns.
     */
    if (expired && unanswered > 0) recordMistake(paperId, "time", unanswered)
    recordDayActive(paperId)
    snapshotProbability(paperId)
    queueAccaProgressPush()
    trackEvent("session_completed", {
      paper: paperId,
      mode: "cbe_mock",
      questions: items.length,
      correct: Math.round(earned),
      scorePct: percent,
      form: mock.form,
      sections: mock.sections.map((s) => s.id).join(""),
    })
    void markFirstTaskCompleted()

    setOutcome({
      earned: Math.round(earned * 10) / 10,
      total: markedTotal > 0 ? markedTotal : total,
      percent,
      perSection,
      tasks,
      unanswered,
      flagged: Object.values(flags).filter(Boolean).length,
      secondsUsed: expired ? mock.seconds : secondsUsed(),
      expired,
      unmarkedMarks,
      recorded,
    })
    setStage("results")
  }

  if (!paper || !bp || items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <BackBtn label="Back" onClick={onBack} />
        <Card>
          <p style={{ margin: 0, color: C.soft }}>This paper's bank isn't deep enough for a full CBE mock yet.</p>
        </Card>
      </motion.div>
    )
  }

  /* ════ INTRO ════ */
  if (stage === "intro") {
    const mins = Math.round(mock.seconds / 60)
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
        <BackBtn label="Exam room" onClick={onBack} />
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: C.text }}>
          {paperId} CBE mock <span style={iriText}>· Form {mock.form}</span>
        </h1>
        <p style={{ color: C.soft, margin: "0 0 16px", fontSize: 15, lineHeight: 1.55 }}>
          The full sitting, in the official shape of your real exam: {mock.sections.map((s) => `Section ${s.id}`).join(" → ")},
          one clock, free navigation, flag anything for review. {mock.sections.some((s) => s.kind === "constructed") ? "Charles debriefs your constructed answers as part of the score. " : ""}
          Pass line {MOCK_PASS}%.
        </p>

        <Card style={{ marginBottom: SP.md }}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 14 }}>
            <IntroStat icon="time" label="On the clock" value={`${mins} min`} />
            <IntroStat icon="mock" label="Total marks" value={`${mock.totalMarks}`} />
            <IntroStat icon="practice" label="Questions & tasks" value={`${items.length}`} />
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {mock.sections.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: R.md, background: "var(--sch-card-2)" }}
              >
                <span style={{ width: 28, height: 28, borderRadius: 8, background: IRIDESCENT, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                  {s.id}
                </span>
                <span style={{ flex: 1, fontSize: 13.5, color: C.text, fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontSize: 12.5, color: C.faint, fontVariantNumeric: "tabular-nums" }}>{s.marks} marks</span>
              </motion.div>
            ))}
          </div>
          {mock.sections.some((s) => s.otFallback) && (
            <p style={{ margin: "12px 0 0", fontSize: 12, color: C.faint, lineHeight: 1.5 }}>
              This paper's scenario cases are still being authored, so that section runs on standalone questions for now — same marks, same clock.
            </p>
          )}
        </Card>

        <Card style={{ marginBottom: SP.lg }}>
          <div style={{ fontWeight: 750, fontSize: 13, color: C.faint, marginBottom: 8 }}>EXAM RULES — LIKE THE REAL CBE</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: C.soft, fontSize: 13.5, lineHeight: 1.7 }}>
            <li>No feedback until the end — answers are marked after you submit.</li>
            <li>Move freely between questions and sections; flag anything to revisit.</li>
            <li>The calculator{hasSheet ? ", formulae sheet" : ""} and scratch notes are in your toolbelt.</li>
            <li>When the clock hits zero, the exam submits itself.</li>
          </ul>
        </Card>

        <Button full size="lg" onClick={() => { setDeadline(Date.now() + mock.seconds * 1000); setStage("run") }}>
          <Icon name="time" size={18} color="#fff" /> Start the exam — {fmtClock(mock.seconds)}
        </Button>
      </motion.div>
    )
  }

  /* ════ MARKING ════ */
  if (stage === "marking") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "60px 0" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ width: 44, height: 44, margin: "0 auto 18px", borderRadius: "50%", border: `3px solid ${C.border}`, borderTopColor: "#C80000" }}
        />
        <div style={{ fontSize: 17, fontWeight: 750, color: C.text, marginBottom: 6 }}>Marking your exam…</div>
        <div style={{ fontSize: 13.5, color: C.soft }}>{markingNote || "Grading the objective sections…"}</div>
      </motion.div>
    )
  }

  /* ════ RESULTS ════ */
  if (stage === "results" && outcome) {
    const passed = outcome.percent >= MOCK_PASS
    const revealedProbability = passProbability(paperId)
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <BackBtn label="Exam room" onClick={onBack} />
        <Card style={{ textAlign: "center", marginBottom: SP.md }}>
          {outcome.expired && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 8 }}><Icon name="mock" size={13} color={C.amber} /> The clock submitted this exam — just like the real thing.</div>
          )}
          {/* Marking honesty. A partial outage: the score covers what Charles
              could actually mark, and says so. A full outage: nothing was
              booked and the answers are safe — reopening the form resubmits
              them, which the kept resume slot makes true. */}
          {!outcome.recorded ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: C.amber, marginBottom: 8, maxWidth: 380, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
              <Icon name="alert" size={13} color={C.amber} /> Charles couldn't be reached to mark your written answers, so this sitting hasn't been recorded. Your answers are saved — reopen this form to submit them for marking.
            </div>
          ) : outcome.unmarkedMarks > 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 8, maxWidth: 380, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
              <Icon name="alert" size={13} color={C.amber} /> {outcome.unmarkedMarks} marks couldn't be reached for marking and are excluded from this score — it covers what was actually marked.
            </div>
          ) : null}
          <RingGauge value={outcome.percent} size={132} label="mock score" />
          <div style={{ fontSize: 15, fontWeight: 800, color: passed ? C.green : C.red, marginTop: 10 }}>
            {passed ? "Pass standard" : "Below the pass line"} · {outcome.earned}/{outcome.total} marks
          </div>
          <div style={{ fontSize: 12.5, color: C.faint, marginTop: 4 }}>
            Form {mock.form} · {fmtClock(outcome.secondsUsed)} used of {fmtClock(mock.seconds)}
            {outcome.unanswered > 0 ? ` · ${outcome.unanswered} unanswered` : ""}
          </div>
          {revealedProbability !== null && (
            <div style={{ margin: "14px auto 0", padding: "10px 14px", maxWidth: 320, borderRadius: R.md, background: "var(--sch-card-2)", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: C.faint }}>PASS PROBABILITY · UNLOCKED BY MOCK</div>
              <div style={{ marginTop: 3, fontSize: 24, fontWeight: 850, color: passed ? C.green : C.amber }}>{revealedProbability}%</div>
            </div>
          )}
        </Card>

        <Card style={{ marginBottom: SP.md }}>
          <div style={{ fontWeight: 750, fontSize: 13, color: C.faint, marginBottom: 10 }}>BY SECTION</div>
          <div style={{ display: "grid", gap: 12 }}>
            {outcome.perSection.map((s) => {
              const pct = s.marks ? Math.round((s.earned / s.marks) * 100) : 0
              return (
                <div key={s.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: 700, color: C.text }}>Section {s.id} <span style={{ color: C.faint, fontWeight: 500 }}>· {s.label}</span></span>
                    <span style={{ color: C.soft, fontVariantNumeric: "tabular-nums" }}>{Math.round(s.earned * 10) / 10}/{s.marks} · {pct}%</span>
                  </div>
                  <MeterBar value={pct} color={bandColor(pct, MOCK_PASS)} target={MOCK_PASS} height={8} />
                </div>
              )
            })}
          </div>
        </Card>

        {outcome.tasks.length > 0 && (
          <Card style={{ marginBottom: SP.md }}>
            <div style={{ fontWeight: 750, fontSize: 13, color: C.faint, marginBottom: 10 }}>CONSTRUCTED TASKS · CHARLES'S DEBRIEF</div>
            <div style={{ display: "grid", gap: 10 }}>
              {outcome.tasks.map((t) => (
                <div key={t.key} style={{ padding: "12px 14px", borderRadius: R.md, border: `1px solid ${C.border}`, background: "var(--sch-card-2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: t.result?.feedback ? 6 : 0 }}>
                    <span style={{ fontWeight: 700, fontSize: 13.5, color: C.text }}>{t.title}</span>
                    <span style={{ fontWeight: 800, fontSize: 13.5, color: t.attempted ? C.text : C.faint, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                      {t.attempted && t.result ? `${t.result.marks}/${t.maxMarks}` : t.attempted ? `—/${t.maxMarks}` : `0/${t.maxMarks} · not attempted`}
                    </span>
                  </div>
                  {t.result?.feedback && <div style={{ fontSize: 13, lineHeight: 1.55, color: C.soft }}>{t.result.feedback}</div>}
                  {t.result?.isFallback && <div style={{ fontSize: 11, color: C.faint, marginTop: 4 }}>Demo marking (no live AI key connected)</div>}
                </div>
              ))}
            </div>
          </Card>
        )}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button onClick={onBack} style={{ flex: 1, minWidth: 160 }}>
            <Icon name="arrow" size={16} color="#fff" /> Back to the exam room
          </Button>
        </div>
      </motion.div>
    )
  }

  /* ════ REVIEW ════ */
  if (stage === "review") {
    const un = items.filter((f) => !answered(f))
    const fl = items.filter((f) => flags[f.key])
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <TopBar
          deadline={deadline}
          total={mock.seconds}
          right={
            <Button variant="ghost" onClick={() => setStage("run")} style={{ minHeight: 36, padding: "4px 10px" }}>
              ← Keep working
            </Button>
          }
        />
        <h2 style={{ fontSize: 21, fontWeight: 800, margin: "6px 0 4px", color: C.text }}>Review before you submit</h2>
        <p style={{ color: C.soft, fontSize: 14, margin: "0 0 14px", lineHeight: 1.5 }}>
          {un.length === 0 ? "Everything is answered." : `${un.length} unanswered — an unanswered question scores zero.`}
          {fl.length > 0 ? ` ${fl.length} flagged for review.` : ""}
        </p>
        <NavigatorGrid mock={mock} items={items} answered={answered} flags={flags} cursor={-1} onGo={goto} />
        <div style={{ display: "grid", gap: 8, marginTop: SP.lg }}>
          <Button full size="lg" onClick={() => void submit(false)}>
            <Icon name="done" size={18} color="#fff" /> Submit my exam for marking
          </Button>
        </div>
      </motion.div>
    )
  }

  /* ════ RUN ════ */
  const f = current
  const flagged = !!flags[f.key]
  const a = answers[f.key] ?? {}
  const q = f.item.kind !== "task" ? f.item.q : null

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <TopBar
        deadline={deadline}
        total={mock.seconds}
        right={
          <div style={{ display: "flex", gap: 6 }}>
            <IconChip label={`Map · ${f.n}/${items.length}`} onClick={() => setNavOpen(true)} icon="stats" active={navOpen} />
            <IconChip label={flagged ? "Flagged" : "Flag"} icon="pin" active={flagged} onClick={() => setFlags((m) => ({ ...m, [f.key]: !m[f.key] }))} />
          </div>
        }
      />

      {/* section strip */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {mock.sections.map((s) => {
          const active = s.id === f.section.id
          const first = items.find((x) => x.section.id === s.id)
          return (
            <button
              key={s.id}
              onClick={() => first && goto(first.n - 1)}
              style={{
                flex: 1, padding: "8px 6px", borderRadius: 10, fontSize: 12, fontWeight: 750, cursor: "pointer",
                border: `1.5px solid ${active ? "#C80000" : C.border}`,
                background: active ? "rgba(200,0,0,0.06)" : "var(--sch-card, #fff)",
                color: active ? "#C80000" : C.soft,
                transition: "border-color .15s, background .15s, color .15s",
              }}
            >
              Section {s.id} · {s.marks}
            </button>
          )
        })}
      </div>

      {/* Keep the exam map visible while the larger drawer remains available
          from the Map button in the top bar. */}
      <div style={{ marginBottom: 12, padding: 12, borderRadius: 14, border: `1px solid ${C.border}`, background: "var(--sch-card, #fff)" }}>
        <NavigatorGrid mock={mock} items={items} answered={answered} flags={flags} cursor={cursor} onGo={goto} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={f.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.2 }}>
          {/* scenario block for case questions */}
          {f.item.kind === "caseq" && (
            <Card style={{ marginBottom: SP.md, borderLeft: `3px solid #C80000` }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                <span style={{ fontWeight: 750, fontSize: 13, ...iriText }}>{f.item.caseRef.title}</span>
                <span style={{ fontSize: 11.5, color: C.faint, whiteSpace: "nowrap" }}>
                  Case question {f.item.caseQIndex} of {f.item.caseQTotal}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: C.soft }}>{f.item.caseRef.scenario}</p>
            </Card>
          )}

          {q ? (
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: C.faint, fontWeight: 700 }}>Q{f.n} · {q.marks} mark{q.marks === 1 ? "" : "s"}</span>
                {q.type === "multi" && <span style={{ fontSize: 11.5, color: C.faint }}>Select ALL that apply</span>}
              </div>
              <p style={{ fontSize: 16.5, lineHeight: 1.55, color: C.text, fontWeight: 550, margin: "0 0 18px" }}>{q.stem}</p>

              {q.type === "number" ? (
                <input
                  type="text"
                  inputMode="decimal"
                  value={a.num ?? ""}
                  onChange={(e) => setAnswers((m) => ({ ...m, [f.key]: { ...m[f.key], num: e.target.value } }))}
                  placeholder={q.unit ? `Enter amount (${q.unit})` : "Enter your answer"}
                  style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 16, borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.bg, color: C.text, outline: "none" }}
                />
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {q.options?.map((opt, i) => {
                    const on = q.type === "multi" ? (a.multi ?? []).includes(i) : a.choice === i
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          setAnswers((m) => {
                            const prev = m[f.key] ?? {}
                            if (q.type === "multi") {
                              const set = new Set(prev.multi ?? [])
                              if (set.has(i)) set.delete(i)
                              else set.add(i)
                              return { ...m, [f.key]: { ...prev, multi: [...set].sort() } }
                            }
                            return { ...m, [f.key]: { ...prev, choice: prev.choice === i ? null : i } }
                          })
                        }
                        style={{
                          display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "14px 16px", borderRadius: 12,
                          border: `1.5px solid ${on ? "#C80000" : C.border}`, background: on ? "rgba(200,0,0,0.05)" : C.card,
                          color: C.text, fontSize: 15, cursor: "pointer", transition: "border-color .15s, background .15s",
                        }}
                      >
                        <span style={{ width: 26, height: 26, borderRadius: 7, border: `1.5px solid ${on ? "#C80000" : C.border}`, color: on ? "#C80000" : C.soft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span style={{ flex: 1 }}>{opt}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </Card>
          ) : (
            f.item.kind === "task" && (
              <TaskEditor
                key={f.key}
                n={f.n}
                task={f.item.task}
                hasSheet={hasSheet}
                value={essays[f.key] ?? { text: "", cells: {} }}
                tab={essayTab[f.key] ?? "word"}
                onTab={(t) => setEssayTab((m) => ({ ...m, [f.key]: t }))}
                onChange={(v) => setEssays((m) => ({ ...m, [f.key]: v }))}
              />
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* action bar */}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <Button variant="secondary" disabled={cursor === 0} onClick={() => goto(cursor - 1)} style={{ minWidth: 90 }}>
          ← Prev
        </Button>
        {cursor + 1 < items.length ? (
          <Button onClick={() => goto(cursor + 1)} style={{ flex: 1 }}>
            Next →
          </Button>
        ) : (
          <Button onClick={() => { noteTiming(current); setStage("review") }} style={{ flex: 1 }}>
            <Icon name="done" size={16} color="#fff" /> Finish & review
          </Button>
        )}
      </div>
      <button
        onClick={() => { noteTiming(current); setStage("review") }}
        style={{ width: "100%", marginTop: 10, padding: 10, borderRadius: 10, border: "none", background: "transparent", color: C.faint, fontSize: 12.5, fontWeight: 650, cursor: "pointer" }}
      >
        Review & submit
      </button>

      {/* navigator drawer */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(15,15,20,0.35)", zIndex: 60 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              style={{
                position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 16, width: "min(560px, calc(100vw - 24px))",
                zIndex: 61, background: "var(--sch-card, #fff)", border: `1px solid ${C.border}`, borderRadius: 18,
                boxShadow: "0 18px 50px rgba(0,0,0,0.22)", padding: 16, maxHeight: "70vh", overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: C.text }}>Question navigator</span>
                <button onClick={() => setNavOpen(false)} style={{ border: "none", background: "transparent", color: C.faint, fontSize: 13, cursor: "pointer", fontWeight: 700 }}>
                  Close
                </button>
              </div>
              <NavigatorGrid mock={mock} items={items} answered={answered} flags={flags} cursor={cursor} onGo={goto} />
              <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 11, color: C.faint, flexWrap: "wrap" }}>
                <LegendDot bg="rgba(200,0,0,0.9)" label="Current" />
                <LegendDot bg="rgba(16,185,129,0.85)" label="Answered" />
                <LegendDot bg="var(--sch-card-2)" label="Unanswered" border />
                <LegendDot bg="#C2740B" label="Flagged" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* the exam toolbelt */}
      <CbeToolsDock paperId={paperId} area={q?.area ?? (f.item.kind === "task" ? f.item.task.area : null)} context="mock" />
    </motion.div>
  )
}

/* ── pieces ───────────────────────────────────────────────────── */

function BackBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="ghost" onClick={onClick} style={{ minHeight: 40, padding: "6px 0", marginBottom: SP.md }}>
      <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> {label}
    </Button>
  )
}

function IntroStat({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <Icon name={icon} size={17} color="#C80000" />
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{value}</div>
        <div style={{ fontSize: 10.5, color: C.faint, fontWeight: 650, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</div>
      </div>
    </div>
  )
}

// ProCountdown is the exam clock now (it renders position:fixed, top-right).
// The bespoke pill that used to live here showed the SAME countdown inline, so
// adding ProCountdown without removing it put two identical clocks on screen at
// once — the diagnostic deleted its own DiagnosticTimer for exactly this reason
// when it adopted ProCountdown.
function TopBar({ deadline, total, right }: { deadline: number; total: number; right?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
      <ProCountdown deadline={deadline} totalSeconds={total} label="Mock exam" />
      {right}
    </div>
  )
}

function IconChip({ label, icon, onClick, active }: { label: string; icon: IconName; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 750, cursor: "pointer",
        border: `1.5px solid ${active ? "#C2740B" : C.border}`, background: active ? "rgba(194,116,11,0.08)" : "var(--sch-card, #fff)",
        color: active ? "#C2740B" : C.soft, transition: "border-color .15s, background .15s, color .15s",
      }}
    >
      <Icon name={icon} size={14} color={active ? "#C2740B" : C.soft} /> {label}
    </button>
  )
}

function LegendDot({ bg, label, border }: { bg: string; label: string; border?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: bg, border: border ? `1px solid var(--sch-border)` : "none" }} />
      {label}
    </span>
  )
}

function NavigatorGrid({
  mock, items, answered, flags, cursor, onGo,
}: {
  mock: CbeMock
  items: FlatItem[]
  answered: (f: FlatItem) => boolean
  flags: Record<string, boolean>
  cursor: number
  onGo: (i: number) => void
}) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {mock.sections.map((s) => (
        <div key={s.id}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: C.faint, marginBottom: 7 }}>
            SECTION {s.id} · {s.label.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {items
              .filter((f) => f.section.id === s.id)
              .map((f) => {
                const isCurrent = f.n - 1 === cursor
                const isAnswered = answered(f)
                const isFlagged = !!flags[f.key]
                const bg = isCurrent ? "rgba(200,0,0,0.9)" : isFlagged ? "#C2740B" : isAnswered ? "rgba(16,185,129,0.85)" : "var(--sch-card-2)"
                const fg = isCurrent || isFlagged || isAnswered ? "#fff" : C.soft
                return (
                  <motion.button
                    key={f.key}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onGo(f.n - 1)}
                    style={{
                      width: 36, height: 36, borderRadius: 9, border: `1px solid ${isAnswered || isCurrent || isFlagged ? "transparent" : C.border}`,
                      background: bg, color: fg, fontSize: 12.5, fontWeight: 750, cursor: "pointer", fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {f.n}
                  </motion.button>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

function TaskEditor({
  n, task, hasSheet, value, tab, onTab, onChange,
}: {
  n: number
  task: { topic: string; stem: string; maxMarks: number; area: string }
  hasSheet: boolean
  value: TaskAnswer
  tab: "word" | "sheet"
  onTab: (t: "word" | "sheet") => void
  onChange: (v: TaskAnswer) => void
}) {
  const filled = Object.keys(value.cells).filter((k) => value.cells[k].trim() !== "").length
  const tabBtn = (id: "word" | "sheet"): CSSProperties => ({
    display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 750,
    cursor: "pointer", border: `1px solid ${tab === id ? C.brand : C.border}`,
    background: tab === id ? C.brandSoft : "var(--sch-card, #fff)", color: tab === id ? C.brand : C.soft,
  })
  return (
    <>
      <Card style={{ marginBottom: SP.md }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
          <span style={{ fontWeight: 750, fontSize: 14, ...iriText }}>Q{n} · {task.topic}</span>
          <span style={{ fontSize: 12, color: C.faint, whiteSpace: "nowrap" }}>{task.maxMarks} marks</span>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: C.text, margin: 0 }}>{task.stem}</p>
      </Card>

      {hasSheet && (
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button style={tabBtn("word")} onClick={() => onTab("word")}>
            <Icon name="practice" size={15} /> Word processor
          </button>
          <button style={tabBtn("sheet")} onClick={() => onTab("sheet")}>
            <Icon name="sheet" size={15} /> Spreadsheet
            {filled > 0 && (
              <span style={{ fontSize: 10, fontWeight: 800, background: C.brand, color: "#fff", borderRadius: 999, padding: "1px 7px" }}>{filled}</span>
            )}
          </button>
        </div>
      )}

      {tab === "word" || !hasSheet ? (
        <>
          <textarea
            value={value.text}
            onChange={(e) => onChange({ ...value, text: e.target.value })}
            placeholder="Write your answer here — you're marked per valid point, and your spreadsheet workings count."
            rows={9}
            style={{
              width: "100%", boxSizing: "border-box", padding: SP.lg, fontSize: 15, lineHeight: 1.6, borderRadius: R.lg,
              border: `1px solid ${C.border}`, background: C.bg, color: C.text, outline: "none", resize: "vertical", fontFamily: "inherit",
            }}
          />
          <div style={{ fontSize: 12, color: C.faint, marginTop: 5, textAlign: "right" }}>
            {value.text.trim().split(/\s+/).filter(Boolean).length} words
          </div>
        </>
      ) : (
        <SpreadsheetPad cells={value.cells} onChange={(cells) => onChange({ ...value, cells })} height={320} />
      )}
    </>
  )
}
