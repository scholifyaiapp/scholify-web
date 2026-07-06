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
  type DiagnosticResult,
  type AnsweredDiagnostic,
  type DiagnosticAreaResult,
} from "@/lib/acca-diagnostic"
import { persistDiagnostic, fetchLatestDiagnostic } from "@/lib/acca-cloud"

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

/** A small count-up for the headline number, so the reveal feels earned. */
function useCountUp(target: number, run: boolean, ms = 1100): number {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - t, 3)
      setV(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, ms])
  return v
}

/* ── Circular pass-probability gauge ──────────────────────────── */

function Gauge({ prob, color, run }: { prob: number; color: string; run: boolean }) {
  const size = 200
  const stroke = 14
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const shown = useCountUp(prob, run)
  const offset = circ * (1 - prob / 100)

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={CARD2} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: run ? offset : circ }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 800, color: TEXT, lineHeight: 1 }}>
          {shown}
          <span style={{ fontSize: 24, fontWeight: 700, color: MUTED }}>%</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color, marginTop: 6, letterSpacing: 0.3 }}>
          chance to pass
        </div>
      </div>
    </div>
  )
}

/* ── Per-area competence bar ──────────────────────────────────── */

function AreaBar({ area, delay }: { area: DiagnosticAreaResult; delay: number }) {
  const pct = Math.round(area.score * 100)
  const color = area.band === "strong" ? GREEN : area.band === "moderate" ? AMBER : RED
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0" }}>
      <span
        style={{
          width: 24,
          height: 24,
          flexShrink: 0,
          borderRadius: 7,
          background: CARD2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 12,
          color: TEXT,
        }}
      >
        {area.code}
      </span>
      <span style={{ flex: 1, fontSize: 13, color: TEXT, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {area.label}
      </span>
      <div style={{ width: 84, height: 6, background: CARD2, borderRadius: 999, overflow: "hidden", flexShrink: 0 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 999 }}
        />
      </div>
      <span style={{ width: 34, textAlign: "right", fontSize: 12, fontWeight: 700, color, flexShrink: 0 }}>{pct}%</span>
    </div>
  )
}

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

      <button
        onClick={submit}
        disabled={!canSubmit}
        style={{
          marginTop: 22,
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "none",
          background: canSubmit ? IRIDESCENT : CARD2,
          color: canSubmit ? "#fff" : DIM,
          fontSize: 15,
          fontWeight: 700,
          cursor: canSubmit ? "pointer" : "default",
        }}
      >
        Next →
      </button>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function AccaDiagnostic() {
  const navigate = useNavigate()
  const papers = useMemo(() => getPapers().filter((p) => hasCuratedContent(p.id)), [])
  const defaultPaper = getCurrentPaper() && hasCuratedContent(getCurrentPaper()!) ? getCurrentPaper()! : papers[0]?.id ?? "FA"

  const [phase, setPhase] = useState<Phase>("intro")
  const [paperId, setPaperId] = useState(defaultPaper)
  const [questions, setQuestions] = useState<AccaQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const answersRef = useRef<AnsweredDiagnostic[]>([])
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [prior, setPrior] = useState<DiagnosticResult | null>(() => getLatestDiagnostic(defaultPaper))

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
              <button onClick={() => navigate("/study")} style={backLink}>← Study</button>

              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#C80000", marginTop: 18 }}>
                PASS-PROBABILITY DIAGNOSTIC
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: TEXT, margin: "8px 0 12px", lineHeight: 1.15 }}>
                Know your real <span style={iriText}>chance to pass</span>.
              </h1>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.55, margin: "0 0 24px" }}>
                A short, syllabus-spanning check — around {Math.min(20, questions.length || 16)} questions. No streaks, no
                hints. At the end you get a pass probability, an estimated exam score, your weakest areas, and the exact
                lift that gets you over the line.
              </p>

              <div style={{ ...cardStyle, marginBottom: 16 }}>
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
              </div>

              <button onClick={start} style={primaryBtn}>
                Start the diagnostic →
              </button>
              <p style={{ fontSize: 12, color: DIM, textAlign: "center", marginTop: 12 }}>
                Your results are saved to your account.
              </p>
            </motion.div>
          )}

          {phase === "assessing" && questions[idx] && (
            <motion.div key="assessing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>
                  Question {idx + 1} / {questions.length}
                </span>
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
            <ResultsView key="results" result={result} paperName={paper?.name ?? paperId} paperCode={paper?.code ?? paperId} onRetake={retake} onContinue={() => navigate("/study")} onProgress={() => navigate("/study/progress")} />
          )}
        </AnimatePresence>
      </div>
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div style={{ textAlign: "center", marginBottom: 6, fontSize: 12, fontWeight: 700, color: DIM, letterSpacing: 0.4 }}>
        {paperCode} · {paperName}
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 26px" }}>
        <Gauge prob={result.passProbability} color={band.color} run />
        <div style={{ marginTop: 14, fontSize: 17, fontWeight: 700, color: band.color }}>{band.label}</div>
        <div style={{ marginTop: 4, fontSize: 13.5, color: MUTED }}>
          Estimated exam score <strong style={{ color: TEXT }}>{result.estimatedScore}%</strong> · pass mark 50%
        </div>
      </div>

      {/* The promise */}
      {lift > 0 && result.target.focusAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            ...cardStyle,
            background: "linear-gradient(135deg, rgba(200,0,0,0.06), rgba(200,0,0,0.02))",
            border: "1px solid rgba(200,0,0,0.18)",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "#C80000", letterSpacing: 0.4, marginBottom: 8 }}>YOUR FASTEST PATH</div>
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
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: RED, letterSpacing: 0.4, marginBottom: 6 }}>WEAKEST AREAS</div>
          {result.weakest.map((a, i) => (
            <AreaBar key={a.code} area={a} delay={0.5 + i * 0.12} />
          ))}
        </div>
      )}

      {/* Strong areas */}
      {result.strongest.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: GREEN, letterSpacing: 0.4, marginBottom: 6 }}>STRONGEST AREAS</div>
          {result.strongest.map((a, i) => (
            <AreaBar key={a.code} area={a} delay={0.7 + i * 0.12} />
          ))}
        </div>
      )}

      {confidencePct < 100 && (
        <p style={{ fontSize: 12, color: DIM, textAlign: "center", margin: "0 0 20px", lineHeight: 1.5 }}>
          Based on {result.questionsAnswered} questions covering {confidencePct}% of the syllabus areas. Practise more and
          retake for a sharper estimate.
        </p>
      )}

      {/* CTAs */}
      <button onClick={onContinue} style={primaryBtn}>Start closing the gap →</button>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={onProgress} style={secondaryBtn}>See full progress</button>
        <button onClick={onRetake} style={secondaryBtn}>Retake</button>
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

const primaryBtn = {
  width: "100%",
  padding: "15px",
  borderRadius: 13,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 15.5,
  fontWeight: 700,
  cursor: "pointer",
} as const

const secondaryBtn = {
  flex: 1,
  padding: "13px",
  borderRadius: 12,
  border: `1px solid ${BORDER}`,
  background: CARD,
  color: TEXT,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
} as const

const backLink = {
  background: "none",
  border: "none",
  color: MUTED,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  padding: 0,
} as const
