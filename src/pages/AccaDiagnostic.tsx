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
import { usePaperContent } from "@/hooks/usePaperContent"
import { PaperContentSkeleton, PaperContentError } from "@/components/acca/PaperContentGate"
import {
  buildDiagnostic,
  scoreDiagnostic,
  passBand,
  getLatestDiagnostic,
  diagnosticSeconds,
  diagnosticRange,
  type DiagnosticResult,
  type AnsweredDiagnostic,
} from "@/lib/acca-diagnostic"
import { getPlan, generateStudyPlan } from "@/lib/acca-plan"
import { qualificationProgress } from "@/lib/acca-qualification"
import { persistDiagnostic, fetchLatestDiagnostic, queueAccaProgressPush } from "@/lib/acca-cloud"
import { MOCK_PASS } from "@/lib/acca-loop"
import { withShuffledOptions } from "@/lib/acca-options"
import { Icon, IconBadge, Button, Card, C, SP, SHADOW } from "@/components/acca/ui"
import { QuestionNavBar } from "@/components/acca/QuestionNavigator"
import { RingGauge, BreakdownList, MeterBar } from "@/components/acca/charts"
import { CinematicReveal, type RevealPhase } from "@/components/acca/CinematicReveal"
import RevealExperience from "@/components/acca/RevealExperience"
import PaywallModal from "@/components/PaywallModal"
import { PlanDashboard } from "@/components/acca/PlanDashboard"
import { trackEvent } from "@/lib/analytics"

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
// Status colors come from the shared token map (bible §2.2) so the diagnostic
// reads in the same red/green/amber as the rest of the app, in both themes.
const GREEN = C.green
const RED = C.red
const AMBER = C.amber

// The onboarding funnel is two DISTINCT wow moments, each with its own loader,
// split by a button press — never one continuous scroll:
//   assessing → analyzing (WOW 1 loader) → results (the pain-points dashboard)
//   → [press "Start closing the gap"] → generating (WOW 2 loader) → plan
//   (the personalised race plan) → paywall.
type Phase = "intro" | "assessing" | "analyzing" | "results" | "reveal" | "plan"

/* ── Question card (in-assessment) ────────────────────────────── */

/** A stored diagnostic answer: MCQ index, multi indices, or the raw numeric text. */
type DiagResponse = number | number[] | string

function QuestionCard({
  q,
  value,
  onChange,
}: {
  q: AccaQuestion
  value: DiagResponse | undefined
  onChange: (response: DiagResponse) => void
}) {
  // Controlled by the parent's per-index store, so navigating back restores the pick.
  const numStr = typeof value === "string" ? value : ""
  const single = typeof value === "number" ? value : null
  const multi = Array.isArray(value) ? value : []

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
          type="text"
          inputMode="decimal"
          value={numStr}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.unit ? `Enter amount (${q.unit})` : "Enter your answer"}
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
                  if (q.type === "mcq") onChange(i)
                  else onChange(multi.includes(i) ? multi.filter((x) => x !== i) : [...multi, i].sort((a, b) => a - b))
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
  const content = usePaperContent(paperId)
  const [questions, setQuestions] = useState<AccaQuestion[]>([])
  const [idx, setIdx] = useState(0)
  // Exam-style: answers live per index so the learner can jump around and change
  // them; grading happens once, at Finish (or when the clock hits zero).
  const [responses, setResponses] = useState<Record<number, DiagResponse>>({})
  const [flags, setFlags] = useState<Record<number, boolean>>({})
  const answersRef = useRef<AnsweredDiagnostic[]>([])
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [prior, setPrior] = useState<DiagnosticResult | null>(() => getLatestDiagnostic(defaultPaper))
  // Exam-style countdown: 100s per question (24 questions → 40:00). At 0 the
  // form auto-submits — what's answered is scored, honestly.
  const [timeLeft, setTimeLeft] = useState(0)
  // Lets the timer's interval call the latest handler without a stale closure.
  const endAssessingRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (phase !== "assessing") return
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t)
          endAssessingRef.current()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [phase])

  const paper = getPaper(paperId)

  // Each wow moment opens on its own loader at the top of the viewport — the
  // second is reached by a button press from the bottom of the results
  // dashboard, so without this it would start mid-scroll.
  useEffect(() => {
    if (phase === "analyzing" || phase === "plan") window.scrollTo({ top: 0, behavior: "auto" })
  }, [phase])

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
    setResponses({})
    setFlags({})
    // De-biased on the way in: options shuffled, `correct` remapped. The
    // clones are what the learner sees and what gradeQuestion marks against.
    setQuestions(qs.map((q) => withShuffledOptions(q)))
    setIdx(0)
    setTimeLeft(diagnosticSeconds(qs.length))
    trackEvent("diagnostic_started", { paper: paperId, questions: qs.length, fromOnboarding: fromWelcome })
    setPhase("assessing")
  }

  // Has index i been given a usable answer? (drives the map + "N done" count)
  function isAnswered(i: number): boolean {
    const r = responses[i]
    const q = questions[i]
    if (r === undefined || !q) return false
    if (q.type === "number") return typeof r === "string" && r.trim() !== "" && !Number.isNaN(parseFloat(r.replace(/,/g, "")))
    if (q.type === "multi") return Array.isArray(r) && r.length > 0
    return typeof r === "number" && r >= 0
  }
  const answeredCount = questions.reduce((n, _q, i) => n + (isAnswered(i) ? 1 : 0), 0)

  // Grade every answered question once, in order, then hand off to the reveal.
  // Unanswered questions are simply skipped — the score is honest about coverage.
  function finishAssessing() {
    const graded: AnsweredDiagnostic[] = []
    questions.forEach((q, i) => {
      const r = responses[i]
      if (r === undefined) return
      let resp: number | number[]
      if (q.type === "number") {
        if (typeof r !== "string" || r.trim() === "") return
        const n = parseFloat(r.replace(/,/g, ""))
        if (Number.isNaN(n)) return
        resp = n
      } else if (q.type === "multi") {
        if (!Array.isArray(r) || r.length === 0) return
        resp = r
      } else {
        if (typeof r !== "number") return
        resp = r
      }
      const g = gradeQuestion(q, resp)
      graded.push({ q, correct: g.correct })
      // The diagnostic is real practice — feed the mastery/streak store too.
      recordAnswer(paperId, q, g.correct)
    })
    answersRef.current = graded
    endAssessing()
  }

  // Score, persist, track — the one place the result is finalized.
  const finalizeDiagnostic = () => {
    const scored = scoreDiagnostic(paperId, answersRef.current)
    setResult(scored)
    trackEvent("diagnostic_completed", { paper: paperId, passProbability: scored.passProbability, estimatedScore: scored.estimatedScore, answered: scored.questionsAnswered, fromOnboarding: fromWelcome })
    void persistDiagnostic(scored)
    queueAccaProgressPush() // the diagnostic answered real questions — sync mastery too
    return scored
  }
  // WOW 1's loader (the analyzing cinematic) finishes here → the pain-points
  // dashboard. The plan is NOT built yet; that is WOW 2, gated behind the
  // dashboard's "Start closing the gap" button.
  const revealResults = () => {
    finalizeDiagnostic()
    setPhase("results")
  }
  // When the test ends, every path runs the same lean scan → dashboard →
  // (button) → plan → paywall sequence. The legacy `reveal`/RevealExperience
  // path (which merged both wow moments into one takeover) is kept in the file
  // but no longer entered.
  const endAssessing = () => {
    setPhase("analyzing")
  }
  // The clock hitting zero grades whatever's answered, same as tapping Finish.
  endAssessingRef.current = finishAssessing

  const diagnosticPhases: RevealPhase[] = [
    { icon: "check", label: "Reading your answers", sub: "Every response, weighted by difficulty — a hard one right counts for more." },
    { icon: "stats", label: `Mapping your ${paperId} syllabus`, sub: "Scoring you across every syllabus area, A to H." },
    { icon: "weak", label: "Finding where the marks leak", sub: "The areas dragging your score down — your pain points." },
    { icon: "tutor", label: "Computing your Exam Readiness Score", sub: "An honest number, with the margin it deserves." },
  ]

  function retake() {
    setResult(null)
    setPhase("intro")
    setPrior(getLatestDiagnostic(paperId))
  }

  // buildDiagnostic() samples the paper's REAL bank, so the form can only be built
  // once this paper's content chunk has landed. The paper chooser inside the intro
  // needs no content — it runs off paper metadata, which is always eager.
  if (!content.ready) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "8px 4px 60px" }}>
          {content.error ? (
            <PaperContentError paperId={paperId} onRetry={content.retry} />
          ) : (
            <PaperContentSkeleton paperId={paperId} />
          )}
        </div>
      </DashboardLayout>
    )
  }

  // Onboarding: the full premium reveal takes over the screen — both wow moments
  // (diagnostic gauge + Charles building the plan), driven by the real result.
  if (phase === "reveal" && result) {
    const plan = getPlan(paperId)
    const weak = result.weakest.slice(0, 3).map((w) => ({ code: w.code, name: w.label, pct: Math.round(w.score * 100) }))
    const examLabel = plan.examDate
      ? new Date(plan.examDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
      : "your sitting"
    return (
      <>
        <RevealExperience
          paperId={paperId}
          passProbability={result.passProbability}
          weakAreas={weak}
          dailyBlock={{ questions: plan.dailyGoal, minutes: plan.dailyMinutes, focus: weak.length ? `${weak[0].code}→A` : "A→H", time: plan.studyTime || undefined }}
          examLabel={examLabel}
          road={[
            { phase: "Foundations", when: "This week — rebuild the basics", done: true },
            { phase: "Weak-area drills", when: `Weeks 2–4 — ${weak.map((w) => w.code).join(", ") || "your gaps"} first`, done: true },
            { phase: "Full mocks", when: "Weeks 5–6 — timed, marked", done: false },
            { phase: "Exam day", when: `${examLabel} — you're ready`, done: false },
          ]}
          phasesM1={[
            ["Reading your answers", "Every response, weighted by difficulty.", "check"],
            [`Mapping your ${paperId} syllabus`, "Scoring you across every area, A to H.", "chart"],
            ["Finding where the marks leak", "The areas dragging your score down — your pain points.", "drop"],
            ["Computing your Exam Readiness Score", "An honest number, with the margin it deserves.", "spark"],
          ]}
          phasesM2={[
            ["Reading your pain points", weak.length ? `Starting with ${weak[0].code} · ${weak[0].name}.` : "Where the marks come back fastest.", "drop"],
            [`Weighting the ${paperId} syllabus`, "Every area, by exam weight and your result.", "chart"],
            ["Sizing your daily block", `${plan.dailyGoal} questions in ${plan.dailyMinutes} min${plan.studyTime ? ` at ${plan.studyTime}` : ""}.`, "spark"],
            ["Dating the road to your sitting", "Phase by phase, all the way to exam day.", "check"],
          ]}
          showControls={false}
          onContinue={() => setShowTrialPaywall(true)}
        />
        <PaywallModal
          open={showTrialPaywall}
          type="general"
          onClose={() => {
            setShowTrialPaywall(false)
            navigate("/dashboard")
          }}
        />
      </>
    )
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
                Know your real <span style={iriText}>Exam Readiness Score</span>.
              </h1>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.55, margin: "0 0 24px" }}>
                A full syllabus sweep — one easy, one medium and one hard question from <em>every</em> area, up to 25
                questions, <strong style={{ color: TEXT }}>timed like the real exam</strong> (100 seconds each, ~40 minutes).
                No hints. At the end: your Exam Readiness Score, estimated score, weakest sectors, and Charles's race plan to your target.
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
                    Last readiness score: <strong style={{ color: TEXT }}>{prior.passProbability}%</strong> — {passBand(prior.passProbability).label.toLowerCase()}. Retake to update.
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
                  <QuestionCard
                    q={questions[idx]}
                    value={responses[idx]}
                    onChange={(v) => setResponses((m) => ({ ...m, [idx]: v }))}
                  />
                </motion.div>
              </AnimatePresence>

              <QuestionNavBar
                cursor={idx}
                total={questions.length}
                answeredCount={answeredCount}
                isAnswered={isAnswered}
                isFlagged={(i) => !!flags[i]}
                currentFlagged={!!flags[idx]}
                onGo={setIdx}
                onToggleFlag={() => setFlags((m) => ({ ...m, [idx]: !m[idx] }))}
                onFinish={finishAssessing}
                finishLabel="Finish & see results"
              />
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CinematicReveal phases={diagnosticPhases} onComplete={revealResults} />
            </motion.div>
          )}

          {phase === "results" && result && (
            <ResultsView
              key="results"
              result={result}
              paperName={paper?.name ?? paperId}
              paperCode={paper?.code ?? paperId}
              onRetake={retake}
              onCoverGap={() => setPhase("plan")}
              onProgress={() => navigate("/study/analytics")}
            />
          )}

          {phase === "plan" && result && (
            <PlanReveal
              key="plan"
              result={result}
              onDone={() => (fromWelcome ? setShowTrialPaywall(true) : navigate("/study?do=weak"))}
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
  onCoverGap,
  onProgress,
}: {
  result: DiagnosticResult
  paperName: string
  paperCode: string
  onRetake: () => void
  onCoverGap: () => void
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
        <RingGauge value={result.passProbability} size={200} stroke={14} color={band.color} label="exam readiness" target={MOCK_PASS} />
        <div style={{ marginTop: 14, fontSize: 17, fontWeight: 700, color: band.color }}>{band.label}</div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: MUTED }}>
          Estimated exam score <strong style={{ color: TEXT }}>{result.estimatedScore}%</strong> · pass mark {MOCK_PASS}%
        </div>
        {/* The honest interval, clamped to the scale: "98% ±7" implied 105%. */}
        {(() => {
          const r = diagnosticRange(result.passProbability, result.questionsAnswered, result.confidence)
          return (
            <div style={{ marginTop: 6, fontSize: 12, color: DIM, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700, color: MUTED }}>
                {r.lo}–{r.hi}%
              </span>
              · a measurement, not a verdict — it tightens as you answer more
            </div>
          )
        })()}
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

      {/* THE STORY, in the order it must land: (1) the score you just saw,
          (2) the pain points — full, ranked, unmissable — the WHY behind it,
          (3) the fastest path those pain points imply, and only THEN
          (4) Charles building the plan that targets exactly those areas. */}
      <PainPointsPanel result={result} />

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
            up to {Math.round(result.target.targetScore * 100)}% and your readiness score rises from{" "}
            <strong>{result.passProbability}%</strong> to{" "}
            <strong style={{ color: GREEN }}>{result.target.projectedPassProbability}%</strong>.
          </p>
        </motion.div>
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

      {/* WOW 1 ends here. The pain points are named and the gap is on the table;
          the plan is NOT shown yet. Pressing this hands off to WOW 2 — Charles
          builds the plan that targets exactly those areas — as its own moment. */}
      <Button onClick={onCoverGap} size="lg" full>
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

/* ── Pain points — the examiner's full read, front and centre ─────
 *
 * The founder spec: after the score, the pain points must be CLEAR and
 * complete — the learner should be able to say their weak areas out loud
 * before the plan appears. Two layers: the ranked top-3 (severity cards with
 * the marks each one is worth getting back), then the full syllabus map so
 * nothing assessed is hidden. Only then does Charles build the plan below.
 */

const BAND_COLOR: Record<"weak" | "moderate" | "strong", string> = {
  weak: RED,
  moderate: "#C2740B",
  strong: GREEN,
}
const BAND_LABEL: Record<"weak" | "moderate" | "strong", string> = {
  weak: "Weak",
  moderate: "Shaky",
  strong: "Strong",
}

function PainPointsPanel({ result }: { result: DiagnosticResult }) {
  const assessed = result.areas.filter((a) => a.seen > 0)
  if (result.weakest.length === 0) return null
  // Equal-weight read (matching the scoring model): lifting one area to the
  // coached target moves the estimated exam score by its share of the paper.
  const marksBack = (score: number) =>
    Math.max(0, Math.round(((result.target.targetScore - score) * 100) / Math.max(1, assessed.length)))
  const fullMap = [...assessed].sort((a, b) => a.score - b.score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...cardStyle,
        boxShadow: SHADOW.sm,
        marginBottom: 16,
        borderTop: `3px solid ${RED}`,
        background: "linear-gradient(180deg, rgba(220,38,38,0.04), transparent 130px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, color: RED, letterSpacing: 0.4, marginBottom: 4 }}>
        <Icon name="weak" size={15} color={RED} /> YOUR PAIN POINTS
      </div>
      <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5, marginBottom: 14 }}>
        Charles's telemetry read of where your marks are leaking. Know these sectors by name — the comeback strategy is built to recover them.
      </div>

      {/* The ranked top-3 — severity cards. minmax(0,1fr): labels wrap/truncate,
          never widen the track past a phone's viewport. */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 10, marginBottom: assessed.length > result.weakest.length ? 16 : 4 }}>
        {result.weakest.map((a, i) => {
          const pct = Math.round(a.score * 100)
          const back = marksBack(a.score)
          return (
            <motion.div
              key={a.code}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.18, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px",
                borderRadius: 14, border: `1px solid ${i === 0 ? "rgba(220,38,38,0.35)" : "var(--sch-border)"}`,
                background: "var(--sch-card, #fff)",
              }}
            >
              <span style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: "grid", placeItems: "center",
                background: i === 0 ? RED : "rgba(220,38,38,0.10)", color: i === 0 ? "#fff" : RED,
                fontWeight: 850, fontSize: 14,
              }}>
                {i + 1}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 800, fontSize: 14.5, color: TEXT }}>{a.code} · {a.label}</span>
                  <span style={{
                    fontSize: 10.5, fontWeight: 800, letterSpacing: 0.4, padding: "2px 8px", borderRadius: 999,
                    background: `${BAND_COLOR[a.band]}18`, color: BAND_COLOR[a.band],
                  }}>
                    {BAND_LABEL[a.band].toUpperCase()}
                  </span>
                </div>
                <div style={{ margin: "8px 0 6px" }}>
                  <MeterBar value={pct} color={BAND_COLOR[a.band]} height={8} />
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: MUTED, flexWrap: "wrap" }}>
                  <span><b style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}>{pct}%</b> competence</span>
                  <span><b style={{ color: TEXT, fontVariantNumeric: "tabular-nums" }}>{a.correct}/{a.seen}</b> in the diagnostic</span>
                  {back > 0 && (
                    <span style={{ color: RED, fontWeight: 700 }}>≈ {back} exam mark{back === 1 ? "" : "s"} to win back</span>
                  )}
                </div>
                {/* Every pain point paired with what the plan does about it —
                    the bridge from "here's the leak" to "here's the fix". */}
                <div style={{ marginTop: 9, display: "flex", gap: 7, alignItems: "flex-start", fontSize: 12, color: MUTED, lineHeight: 1.45 }}>
                  <Icon name="tutor" size={13} color={RED} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span>
                    <b style={{ color: TEXT }}>Charles's fix:</b> the {a.label} chapter, then adaptive drills until it clears {Math.round(result.target.targetScore * 100)}%.
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* The full map — every assessed area, nothing hidden */}
      {assessed.length > result.weakest.length && (
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5, color: DIM, marginBottom: 8 }}>
            THE FULL MAP · ALL {assessed.length} AREAS ASSESSED
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 7 }}>
            {fullMap.map((a, i) => (
              <motion.div
                key={a.code}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.06 }}
                style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}
              >
                <span style={{ width: 18, fontSize: 11.5, fontWeight: 800, color: BAND_COLOR[a.band], flexShrink: 0 }}>{a.code}</span>
                <span style={{ flex: 1, fontSize: 12, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.label}</span>
                <MeterBar value={Math.round(a.score * 100)} color={BAND_COLOR[a.band]} height={6} style={{ width: 86, flexShrink: 0 }} />
                <span style={{ width: 34, textAlign: "right", fontSize: 11.5, fontWeight: 750, color: TEXT, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                  {Math.round(a.score * 100)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
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

/* ── WOW 2 · the personalised race plan (its own screen) ─────────
 *
 * Reached only by pressing "Start closing the gap" on the results dashboard —
 * never rendered alongside it. Opens on its OWN cinematic loader (Charles
 * building the plan), then reveals the plan that targets the exact pain points
 * the learner just read: operational (daily block), tactical (this month's
 * phases) and strategic (the qualification). Its CTA hands off to the paywall.
 */

function PlanReveal({ result, onDone }: { result: DiagnosticResult; onDone: () => void }) {
  const plan = getPlan(result.paperId)
  const targetProb = plan.targetProb
  const study = generateStudyPlan(result.paperId)
  const qual = qualificationProgress()

  // `ready` flips when the generation cinematic finishes: loader → the plan.
  const [ready, setReady] = useState(false)

  // Strategic pace: months per paper scales with the daily commitment.
  const monthsPerPaper = plan.dailyMinutes >= 60 ? 2.5 : plan.dailyMinutes >= 40 ? 3 : plan.dailyMinutes >= 25 ? 3.5 : 4.5
  const remaining = Math.max(0, qual.totalExams - qual.passedCount - 1)
  const done = new Date()
  done.setMonth(done.getMonth() + Math.round((remaining + 1) * monthsPerPaper))
  const doneLabel = done.toLocaleDateString("en-GB", { month: "long", year: "numeric" })

  const firstPhases = study.phases.slice(0, 2)
  const weakQueue = result.weakest.slice(0, 3)

  const planPhases: RevealPhase[] = [
    { icon: "weak", label: "Reading your pain points", sub: weakQueue.length ? `Starting with ${weakQueue[0].code} · ${weakQueue[0].label}.` : "Where the marks come back fastest." },
    { icon: "roadmap", label: `Weighting the ${result.paperId} syllabus`, sub: "Every area, by exam weight and your result." },
    { icon: "mission", label: "Sizing your daily block", sub: `${plan.dailyGoal} questions in ${plan.dailyMinutes} min${plan.studyTime ? ` at ${plan.studyTime}` : ""}.` },
    { icon: "calendar", label: "Dating the road to your sitting", sub: "Phase by phase, all the way to exam day." },
  ]

  // WOW 2 loader — the generation moment, full-screen; no plan is visible yet.
  if (!ready) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div style={{ textAlign: "center", fontSize: 11, fontWeight: 800, letterSpacing: 1, color: C.brand, marginTop: 8 }}>
          CHARLES · BUILDING YOUR RACE PLAN
        </div>
        <CinematicReveal phases={planPhases} accent={C.brand} perPhaseMs={880} onComplete={() => setReady(true)} />
      </motion.div>
    )
  }

  const tiers: { icon: Parameters<typeof Icon>[0]["name"]; k: string; title: string; body: string }[] = [
    {
      icon: "mission",
      k: "OPERATIONAL · EVERY DAY",
      title: `${plan.dailyGoal} questions · ${plan.dailyMinutes} min${plan.studyTime ? ` at ${plan.studyTime}` : ""}`,
      body: "Same time, same block, every day — consistency is the whole trick.",
    },
    {
      icon: "calendar",
      k: "TACTICAL · THIS MONTH",
      title: firstPhases.length
        ? firstPhases.map((ph) => `${ph.label} ${ph.range}`).join(" → ")
        : "Learn phase — cover every syllabus area, topic by topic",
      body: firstPhases.length
        ? `Phase by phase to exam week: ${study.phases.map((ph) => ph.label).join(" → ")}.`
        : "Set your exam date in Settings and this becomes a dated, week-by-week schedule.",
    },
    {
      icon: "roadmap",
      k: "STRATEGIC · THE QUALIFICATION",
      title: `${result.paperId} now · ${remaining} paper${remaining === 1 ? "" : "s"} after it`,
      body: `At your pace (~${monthsPerPaper} months a paper), membership lands around ${doneLabel}. Every pass re-dates the road.`,
    },
  ]

  // The daily block structure — the founder's method, drawn.
  const dailyBlock: { icon: Parameters<typeof Icon>[0]["name"]; label: string }[] = [
    { icon: "learn", label: "Brief" },
    { icon: "practice", label: "Practice" },
    { icon: "flashcards", label: "Cards" },
    { icon: "check", label: "Bank" },
  ]

  // WOW 2 reveal — the personalised plan, answering the pain points just read.
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 800, color: C.brand, letterSpacing: 0.4, marginBottom: 12 }}>
        <Icon name="tutor" size={15} color={C.brand} /> CHARLES · RACE PLAN TO {targetProb}%
      </div>

      {/* the concrete next 7 days — each with its topic, minutes and tasks */}
      <div style={{ ...cardStyle, boxShadow: SHADOW.sm, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.4, color: C.brand, marginBottom: 12, display: "flex", alignItems: "center", gap: 7 }}>
          <Icon name="loop" size={15} color={C.brand} /> YOUR NEXT 7 DAYS
        </div>
        <PlanDashboard paperId={result.paperId} days={7} />
      </div>

      <div style={{ ...cardStyle, boxShadow: SHADOW.sm, marginBottom: 16, overflow: "hidden" }}>
            {/* your daily block — the structured method */}
            <div style={{ padding: "14px 16px", borderRadius: 14, background: CARD2, marginBottom: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: DIM, marginBottom: 10 }}>
                YOUR DAILY BLOCK{plan.studyTime ? ` · ${plan.studyTime}` : ""} · {plan.dailyMinutes} MIN
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                {dailyBlock.map((b, i) => (
                  <motion.span key={b.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 999, background: CARD, border: `1px solid ${BORDER}`, fontSize: 12, fontWeight: 750, color: TEXT }}>
                      <Icon name={b.icon} size={13} color={C.brand} /> {b.label}
                    </span>
                    {i < dailyBlock.length - 1 && <Icon name="arrow" size={11} color={DIM} />}
                  </motion.span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: MUTED, marginTop: 9, lineHeight: 1.5 }}>
                Concepts & formulas first, then questions, then recall, then the clock — every day, in that order.
              </div>
            </div>

            {/* the weak-area queue — where the marks come back from */}
            {weakQueue.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: DIM, marginBottom: 8 }}>FIRST TARGETS — YOUR FASTEST MARKS</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {weakQueue.map((a, i) => (
                    <motion.div key={a.code} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ flex: "none", width: 22, height: 22, borderRadius: 999, background: i === 0 ? C.brand : CARD2, color: i === 0 ? "#fff" : MUTED, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: TEXT }}>{a.code} · {a.label}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: a.score < 0.4 ? RED : AMBER, fontVariantNumeric: "tabular-nums" }}>{Math.round(a.score * 100)}%</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* the road to the mock gate */}
            <div style={{ padding: "13px 16px", borderRadius: 14, border: `1px solid ${BORDER}`, marginBottom: 16 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.8, color: DIM, marginBottom: 9 }}>YOUR READINESS ROAD FROM {result.passProbability}%</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", fontSize: 11.5, fontWeight: 750, color: MUTED }}>
                <span style={{ color: TEXT }}>Topics</span><Icon name="chevron" size={12} color={DIM} />
                <span style={{ color: TEXT }}>Bank runs</span><Icon name="chevron" size={12} color={DIM} />
                <span style={{ padding: "3px 9px", borderRadius: 999, background: "rgba(200,0,0,0.08)", color: C.brand }}>60% unlocks MOCK</span><Icon name="chevron" size={12} color={DIM} />
                <span style={{ color: TEXT }}>Mock 1·2·3</span><Icon name="chevron" size={12} color={DIM} />
                <span style={{ padding: "3px 9px", borderRadius: 999, background: "rgba(14,159,110,0.1)", color: GREEN }}>{targetProb}% → exam day</span>
              </div>
            </div>

            {/* the three horizons */}
            <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
              {tiers.map((t, i) => (
                <motion.div key={t.k} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.12 }} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
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

            {/* day 1 starts NOW */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDone}
              style={{ width: "100%", padding: "15px 20px", borderRadius: 13, border: `1.5px solid ${C.brand}`, background: "rgba(200,0,0,0.05)", color: C.brand, fontWeight: 800, fontSize: 14.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Icon name="mission" size={16} color={C.brand} /> Start day 1 now — {weakQueue[0] ? `drill ${weakQueue[0].code}` : "first mission"}
            </motion.button>
      </div>
    </motion.div>
  )
}
