import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  getPapers,
  getPaper,
  gradeQuestion,
  recordAnswer,
  hasCuratedContent,
  type AccaQuestion,
} from "@/lib/acca"
import { getCurrentPaper } from "@/lib/acca-qualification"
import {
  buildDiagnostic,
  scoreDiagnostic,
  passBand,
  getLatestDiagnostic,
  diagnosticSeconds,
  type DiagnosticResult,
  type AnsweredDiagnostic,
} from "@/lib/acca-diagnostic"
import { getPlan, generateStudyPlan } from "@/lib/acca-plan"
import { qualificationProgress } from "@/lib/acca-qualification"
import { persistDiagnostic, fetchLatestDiagnostic, queueAccaProgressPush } from "@/lib/acca-cloud"
import { MOCK_PASS } from "@/lib/acca-loop"
import { Icon, IconBadge, Button, Card, C, SP, SHADOW } from "@/components/acca/ui"
import { RingGauge, BreakdownList } from "@/components/acca/charts"
import PaywallModal from "@/components/PaywallModal"

/* ──────────────────────────────────────────────────────────────
 *  /study/diagnostic — the pass-probability diagnostic.
 *
 *  A short, syllabus-spanning assessment that answers the one question a
 *  student actually cares about: "am I going to pass?" — with a real number,
 *  the weak areas dragging it down, and the concrete lift that gets them over
 *  the line. Results persist server-side (acca-cloud) as the learning-data spine.
 * ────────────────────────────────────────────────────────────── */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const CARD2 = "var(--sch-card-2)"
const BORDER = "var(--sch-border)"
const BG = "var(--sch-bg)"
const GREEN = "#10B981"
const RED = "#EF4444"
const AMBER = "#F59E0B"

type Phase = "intro" | "assessing" | "analyzing" | "results"

/* ── Question card (in-assessment) ────────────────────────────── */

function QuestionCard({
  q,
  onAnswer,
}: {
  q: AccaQuestion
  onAnswer: (response: number | number[]) => void
}) {
  const [single, setSingle] = useState<number | null>(null)
  const [multi, setMulti] = useState<number[]>([])
  const [num, setNum] = useState("")

  const canSubmit =
    q.type === "mcq" ? single !== null : q.type === "multi" ? multi.length > 0 : num.trim() !== ""

  function submit() {
    if (q.type === "mcq" && single !== null) onAnswer(single)
    else if (q.type === "multi") onAnswer([...multi].sort((a, b) => a - b))
    else if (q.type === "number") onAnswer(parseFloat(num))
  }

  return (
    <div>
      {q.type === "multi" && (
        <div style={{ fontSize: 11, fontWeight: 700, color: DIM, marginBottom: 8, letterSpacing: 0.4 }}>
          SELECT ALL THAT APPLY
        </div>
      )}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: TEXT, lineHeight: 1.45, margin: "0 0 20px" }}>{q.stem}</h2>

      {q.type === "number" ? (
        <input
          type="number"
          inputMode="decimal"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder={q.unit ? `Enter amount (${q.unit})` : "Enter your answer"}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && canSubmit) submit()
          }}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            fontSize: 16,
            borderRadius: 12,
            border: `1.5px solid ${BORDER}`,
            background: BG,
            color: TEXT,
            outline: "none",
          }}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(q.options ?? []).map((opt, i) => {
            const picked = q.type === "mcq" ? single === i : multi.includes(i)
            return (
              <button
                key={i}
                onClick={() => {
                  if (q.type === "mcq") setSingle(i)
                  else setMulti((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]))
                }}
                style={{
                  textAlign: "left",
                  padding: "13px 15px",
                  borderRadius: 12,
                  border: `1.5px solid ${picked ? "#C80000" : BORDER}`,
                  background: picked ? "rgba(200,0,0,0.06)" : CARD,
                  color: TEXT,
                  fontSize: 14.5,
                  cursor: "pointer",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  transition: "border-color .15s, background .15s",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    flexShrink: 0,
                    borderRadius: q.type === "multi" ? 6 : 999,
                    border: `1.5px solid ${picked ? "#C80000" : BORDER}`,
                    background: picked ? "#C80000" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {picked ? "✓" : ""}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      )}

      <Button onClick={submit} disabled={!canSubmit} size="lg" full style={{ marginTop: 22 }}>
        Next <Icon name="arrow" size={17} color="#fff" />
      </Button>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function AccaDiagnostic() {
  const navigate = useNavigate()
  const papers = useMemo(() => getPapers().filter((p) => hasCuratedContent(p.id)), [])
  const defaultPaper = getCurrentPaper() && hasCuratedContent(getCurrentPaper()!) ? getCurrentPaper()! : papers[0]?.id ?? "FA"

  // /welcome funnel: ?next=paywall → after the results, show the trial
  // paywall once, then land on the dashboard.
  const fromWelcome = useMemo(
    () => new URLSearchParams(window.location.search).get("next") === "paywall",
    [],
  )
  const [showTrialPaywall, setShowTrialPaywall] = useState(false)

  const [phase, setPhase] = useState<Phase>("intro")
  const [paperId, setPaperId] = useState(defaultPaper)
  const [questions, setQuestions] = useState<AccaQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const answersRef = useRef<AnsweredDiagnostic[]>([])
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [prior, setPrior] = useState<DiagnosticResult | null>(() => getLatestDiagnostic(defaultPaper))
  // Exam-style countdown: 100s per question (24 questions → 40:00). At 0 the
  // form auto-submits — what's answered is scored, honestly.
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (phase !== "assessing") return
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t)
          setPhase("analyzing")
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [phase])

  const paper = getPaper(paperId)

  // Pull any cloud-synced prior result when the paper changes on the intro.
  useEffect(() => {
    if (phase !== "intro") return
    setPrior(getLatestDiagnostic(paperId))
    let alive = true
    fetchLatestDiagnostic(paperId).then((r) => {
      if (alive && r) setPrior(r)
    })
    return () => {
      alive = false
    }
  }, [paperId, phase])

  function start() {
    const qs = buildDiagnostic(paperId)
    if (qs.length === 0) return
    answersRef.current = []
    setQuestions(qs)
    setIdx(0)
    setTimeLeft(diagnosticSeconds(qs.length))
    setPhase("assessing")
  }

  function answer(response: number | number[]) {
    const q = questions[idx]
    const graded = gradeQuestion(q, response)
    answersRef.current.push({ q, correct: graded.correct })
    // The diagnostic is real practice — feed the mastery/streak store too.
    recordAnswer(paperId, q, graded.correct)

    if (idx + 1 < questions.length) {
      setIdx(idx + 1)
    } else {
      setPhase("analyzing")
    }
  }

  // Analyzing → score, persist, reveal.
  useEffect(() => {
    if (phase !== "analyzing") return
    const scored = scoreDiagnostic(paperId, answersRef.current)
    const timer = setTimeout(() => {
      setResult(scored)
      setPhase("results")
      void persistDiagnostic(scored)
      queueAccaProgressPush() // the diagnostic answered real questions — sync mastery too
    }, 1600)
    return () => clearTimeout(timer)
  }, [phase, paperId])

  function retake() {
    setResult(null)
    setPhase("intro")
    setPrior(getLatestDiagnostic(paperId))
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "8px 4px 60px" }}>
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <button onClick={() => navigate("/study")} style={backLink}>
                <Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Study
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: SP.md, marginTop: 18 }}>
                <IconBadge name="diagnostic" tone="brand" />
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: C.brand }}>
                  PASS-PROBABILITY DIAGNOSTIC
                </div>
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: TEXT, margin: "12px 0 12px", lineHeight: 1.15 }}>
                Know your real <span style={iriText}>chance to pass</span>.
              </h1>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.55, margin: "0 0 24px" }}>
                A full syllabus sweep — one easy, one medium and one hard question from <em>every</em> area, up to 25
                questions, <strong style={{ color: TEXT }}>timed like the real exam</strong> (100 seconds each, ~40 minutes).
                No hints. At the end: your pass probability, estimated score, weakest areas, and Lara's plan to your target.
              </p>

              <Card style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: DIM, letterSpacing: 0.3 }}>WHICH PAPER?</label>
                <select
                  value={paperId}
                  onChange={(e) => setPaperId(e.target.value)}
                  style={{
                    marginTop: 8,
                    width: "100%",
                    padding: "11px 12px",
                    borderRadius: 10,
                    border: `1px solid ${BORDER}`,
                    background: BG,
                    color: TEXT,
                    fontSize: 14,
                    colorScheme: "dark light",
                  }}
                >
                  {papers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} — {p.name}
                    </option>
                  ))}
                </select>

                {prior && (
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: MUTED }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: passBand(prior.passProbability).color }} />
                    Last diagnostic: <strong style={{ color: TEXT }}>{prior.passProbability}%</strong> — {passBand(prior.passProbability).label.toLowerCase()}. Retake to update.
                  </div>
                )}
              </Card>

              <Button onClick={start} size="lg" full>
                Start the diagnostic <Icon name="arrow" size={18} color="#fff" />
              </Button>
              <p style={{ fontSize: 12, color: DIM, textAlign: "center", marginTop: 12 }}>
                Your results are saved to your account.
              </p>
            </motion.div>
          )}

          {phase === "assessing" && questions[idx] && (
            <motion.div key="assessing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>
                  Question {idx + 1} / {questions.length}
                </span>
                <DiagnosticTimer secondsLeft={timeLeft} total={diagnosticSeconds(questions.length)} />
                <span style={{ fontSize: 11, fontWeight: 700, color: DIM, background: CARD2, padding: "3px 9px", borderRadius: 999 }}>
                  {paper?.code} · Area {questions[idx].area}
                </span>
              </div>
              <div style={{ height: 6, background: CARD2, borderRadius: 999, marginBottom: 26, overflow: "hidden" }}>
                <motion.div
                  animate={{ width: `${((idx + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  style={{ height: "100%", background: IRIDESCENT, borderRadius: 999 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  <QuestionCard q={questions[idx]} onAnswer={answer} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "80px 0" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                style={{
                  width: 56,
                  height: 56,
                  margin: "0 auto 24px",
                  borderRadius: 999,
                  border: `4px solid ${CARD2}`,
                  borderTopColor: "#C80000",
                }}
              />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: TEXT, margin: "0 0 6px" }}>Reading your answers…</h2>
              <p style={{ fontSize: 14, color: MUTED }}>Weighting by difficulty, mapping your syllabus areas, computing your pass probability.</p>
            </motion.div>
          )}

          {phase === "results" && result && (
            <ResultsView
              key="results"
              result={result}
              paperName={paper?.name ?? paperId}
              paperCode={paper?.code ?? paperId}
              onRetake={retake}
              onContinue={() => (fromWelcome ? setShowTrialPaywall(true) : navigate("/study"))}
              onProgress={() => navigate("/study/analytics")}
            />
          )}
        </AnimatePresence>
      </div>

      {/* /welcome funnel: results → the trial paywall → the dashboard. */}
      <PaywallModal
        open={showTrialPaywall}
        type="general"
        onClose={() => {
          setShowTrialPaywall(false)
          navigate("/dashboard")
        }}
      />
    </DashboardLayout>
  )
}

/* ── Results ──────────────────────────────────────────────────── */

function ResultsView({
  result,
  paperName,
  paperCode,
  onRetake,
  onContinue,
  onProgress,
}: {
  result: DiagnosticResult
  paperName: string
  paperCode: string
  onRetake: () => void
  onContinue: () => void
  onProgress: () => void
}) {
  const band = passBand(result.passProbability)
  const lift = result.target.projectedPassProbability - result.passProbability
  const confidencePct = Math.round(result.confidence * 100)
  const plan = getPlan(result.paperId)
  const gap = Math.max(0, plan.targetProb - result.passProbability)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div style={{ textAlign: "center", marginBottom: 6, fontSize: 12, fontWeight: 700, color: DIM, letterSpacing: 0.4 }}>
        {paperCode} · {paperName}
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 18px" }}>
        <RingGauge value={result.passProbability} size={200} stroke={14} color={band.color} label="chance to pass" target={MOCK_PASS} />
        <div style={{ marginTop: 14, fontSize: 17, fontWeight: 700, color: band.color }}>{band.label}</div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: MUTED }}>
          Estimated exam score <strong style={{ color: TEXT }}>{result.estimatedScore}%</strong> · pass mark {MOCK_PASS}%
        </div>
      </div>

      {/* The target gap — the number the whole plan chases */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color: band.color, fontVariantNumeric: "tabular-nums" }}>{result.passProbability}%</span>
        <span style={{ flex: "none", width: 60, height: 2, background: `linear-gradient(90deg, ${band.color}, ${GREEN})`, borderRadius: 999, position: "relative" }}>
          <Icon name="arrow" size={14} color={GREEN} style={{ position: "absolute", right: -7, top: -6 }} />
        </span>
        <span style={{ fontSize: 22, fontWeight: 800, color: GREEN, fontVariantNumeric: "tabular-nums" }}>{plan.targetProb}%</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: MUTED, background: CARD2, padding: "5px 12px", borderRadius: 999 }}>
          your target · {gap > 0 ? `${gap} points to build` : "already there — let's prove it"}
        </span>
      </motion.div>

      <LaraPlan result={result} targetProb={plan.targetProb} />

      {/* The promise */}
      {lift > 0 && result.target.focusAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            ...cardStyle,
            background: "linear-gradient(135deg, rgba(200,0,0,0.06), rgba(200,0,0,0.02))",
            border: `1px solid ${C.brandLine}`,
            boxShadow: SHADOW.sm,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, color: C.brand, letterSpacing: 0.4, marginBottom: 8 }}>
            <Icon name="rocket" size={15} color={C.brand} /> YOUR FASTEST PATH
          </div>
          <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.55, margin: 0 }}>
            Get{" "}
            {result.target.focusAreas.map((label, i) => (
              <span key={label}>
                {i > 0 && (i === result.target.focusAreas.length - 1 ? " and " : ", ")}
                <strong>{label}</strong>
              </span>
            ))}{" "}
            up to {Math.round(result.target.targetScore * 100)}% and your pass chance rises from{" "}
            <strong>{result.passProbability}%</strong> to{" "}
            <strong style={{ color: GREEN }}>{result.target.projectedPassProbability}%</strong>.
          </p>
        </motion.div>
      )}

      {/* Weak areas */}
      {result.weakest.length > 0 && (
        <div style={{ ...cardStyle, boxShadow: SHADOW.sm, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, color: RED, letterSpacing: 0.4, marginBottom: 6 }}>
            <Icon name="weak" size={15} color={RED} /> WEAKEST AREAS
          </div>
          <BreakdownList
            items={result.weakest.map((a) => ({
              code: a.code,
              label: a.label,
              pct: Math.round(a.score * 100),
              valueText: `${a.correct}/${a.seen}`,
            }))}
          />
        </div>
      )}

      {/* Strong areas */}
      {result.strongest.length > 0 && (
        <div style={{ ...cardStyle, boxShadow: SHADOW.sm, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, color: GREEN, letterSpacing: 0.4, marginBottom: 6 }}>
            <Icon name="trophy" size={15} color={GREEN} /> STRONGEST AREAS
          </div>
          <BreakdownList
            items={result.strongest.map((a) => ({
              code: a.code,
              label: a.label,
              pct: Math.round(a.score * 100),
              valueText: `${a.correct}/${a.seen}`,
            }))}
          />
        </div>
      )}

      {confidencePct < 100 && (
        <p style={{ fontSize: 12, color: DIM, textAlign: "center", margin: "0 0 20px", lineHeight: 1.5 }}>
          Based on {result.questionsAnswered} questions covering {confidencePct}% of the syllabus areas. Practise more and
          retake for a sharper estimate.
        </p>
      )}

      {/* CTAs */}
      <Button onClick={onContinue} size="lg" full>
        Start closing the gap <Icon name="arrow" size={18} color="#fff" />
      </Button>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <Button onClick={onProgress} variant="secondary" full>See full progress</Button>
        <Button onClick={onRetake} variant="secondary" full>
          <Icon name="loop" size={16} /> Retake
        </Button>
      </div>
    </motion.div>
  )
}

/* ── Shared styles ────────────────────────────────────────────── */

const cardStyle = {
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  padding: "16px 18px",
} as const

const backLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "none",
  border: "none",
  color: MUTED,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  padding: 0,
} as const

/* ── Exam-style countdown (100s/question) ─────────────────────── */

function DiagnosticTimer({ secondsLeft, total }: { secondsLeft: number; total: number }) {
  const mm = Math.floor(secondsLeft / 60)
  const ss = `${secondsLeft % 60}`.padStart(2, "0")
  const frac = total > 0 ? secondsLeft / total : 0
  const low = secondsLeft <= 300 // final five minutes
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 11px", borderRadius: 999, background: low ? "rgba(239,68,68,0.09)" : CARD2, border: `1px solid ${low ? "rgba(239,68,68,0.35)" : "transparent"}` }}>
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
        <circle cx="10" cy="10" r="8" fill="none" stroke="var(--sch-border)" strokeWidth="2.5" />
        <circle
          cx="10" cy="10" r="8" fill="none"
          stroke={low ? RED : C.brand}
          strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 8}
          strokeDashoffset={2 * Math.PI * 8 * (1 - frac)}
          transform="rotate(-90 10 10)"
          style={{ transition: "stroke-dashoffset 1s linear, stroke .3s" }}
        />
      </svg>
      <span style={{ fontSize: 12.5, fontWeight: 800, color: low ? RED : TEXT, fontVariantNumeric: "tabular-nums" }}>
        {mm}:{ss}
      </span>
    </span>
  )
}

/* ── Lara's plan — operational · tactical · strategic ─────────── */

function LaraPlan({ result, targetProb }: { result: DiagnosticResult; targetProb: number }) {
  const plan = getPlan(result.paperId)
  const study = generateStudyPlan(result.paperId)
  const qual = qualificationProgress()

  // Strategic pace: months per paper scales with the daily commitment.
  const monthsPerPaper = plan.dailyMinutes >= 60 ? 2.5 : plan.dailyMinutes >= 40 ? 3 : plan.dailyMinutes >= 25 ? 3.5 : 4.5
  const remaining = Math.max(0, qual.totalExams - qual.passedCount - 1)
  const done = new Date()
  done.setMonth(done.getMonth() + Math.round((remaining + 1) * monthsPerPaper))
  const doneLabel = done.toLocaleDateString("en-GB", { month: "long", year: "numeric" })

  const firstPhases = study.phases.slice(0, 2)
  const focus = result.weakest[0]?.label ?? "your weakest areas"

  const tiers: { icon: Parameters<typeof Icon>[0]["name"]; k: string; title: string; body: string }[] = [
    {
      icon: "mission",
      k: "OPERATIONAL · EVERY DAY",
      title: `${plan.dailyGoal} questions · ${plan.dailyMinutes} min${plan.studyTime ? ` at ${plan.studyTime}` : ""}`,
      body: `Daily missions start on ${focus} — the fastest points first. Every answer moves your probability.`,
    },
    {
      icon: "calendar",
      k: "TACTICAL · THIS MONTH",
      title: firstPhases.length
        ? firstPhases.map((p) => `${p.label} ${p.range}`).join(" → ")
        : "Learn phase — cover every syllabus area, topic by topic",
      body: firstPhases.length
        ? `Phase by phase to exam week: ${study.phases.map((p) => p.label).join(" → ")}.`
        : "Set your exam date in Settings and this becomes a dated, week-by-week schedule.",
    },
    {
      icon: "roadmap",
      k: "STRATEGIC · THE QUALIFICATION",
      title: `${result.paperId} now · ${remaining} paper${remaining === 1 ? "" : "s"} after it`,
      body: `At your pace (~${monthsPerPaper} months a paper), membership lands around ${doneLabel}. Every pass re-dates the road.`,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{ ...cardStyle, boxShadow: SHADOW.sm, marginBottom: 16 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, color: C.brand, letterSpacing: 0.4, marginBottom: 12 }}>
        <Icon name="tutor" size={15} color={C.brand} /> LARA'S PLAN TO {targetProb}%
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {tiers.map((t, i) => (
          <motion.div
            key={t.k}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12 }}
            style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
          >
            <span style={{ flex: "none", width: 34, height: 34, borderRadius: 10, background: C.brandSoft, display: "grid", placeItems: "center" }}>
              <Icon name={t.icon} size={16} color={C.brand} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: DIM, marginBottom: 2 }}>{t.k}</div>
              <div style={{ fontSize: 14, fontWeight: 750, color: TEXT, lineHeight: 1.35 }}>{t.title}</div>
              <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5, marginTop: 2 }}>{t.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
