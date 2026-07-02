import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, Share2, Sparkles, X } from "lucide-react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readPlan, readProgress, type PlanTask } from "@/lib/scholify-data"
import { api } from "@/lib/api"
import {
  dismissBanner,
  generateWeeklyQuiz,
  getISOWeek,
  isBannerDismissed,
  isQuizCompleted,
  isSunday,
  loadResult,
  saveResult,
  type QuizAnswer,
  type QuizPayload,
  type QuizResult,
} from "@/lib/quiz-storage"

/* ──────────────────────────────────────────────────────────────────────────
 *  Scholify — Weekly Challenge Quiz
 *
 *  Calls /api/weekly-quiz for a live Claude-generated quiz, with the
 *  deterministic local fallback in quiz-storage.ts if anything fails
 *  (dev without Anthropic key, offline, transient error). State machine:
 *  intro → question (with 30s timer) → reveal (1.5s) → next or results.
 * ────────────────────────────────────────────────────────────────────── */

const IRIDESCENT_SOFT =
  "linear-gradient(135deg, rgba(200,0,0,0.18), rgba(244,114,182,0.18), rgba(34,211,238,0.18))"
const TEXT_PRIMARY = "#F0EEFF"

/* ── Visual primitives ─────────────────────────────────────────────────── */

function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(200,0,0,0.35), transparent 70%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(244,114,182,0.28), transparent 70%)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[440px] w-[440px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.24), transparent 70%)" }}
        animate={{ x: [0, 20, -30, 0], y: [0, -40, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function IridescentText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: IRIDESCENT,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% 200%",
        animation: "wquiz-shimmer 6s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  )
}

function IridescentBorder({
  children,
  className,
  radius = 18,
}: {
  children: React.ReactNode
  className?: string
  radius?: number
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          padding: 1,
          borderRadius: radius,
          background: IRIDESCENT,
          backgroundSize: "200% 200%",
          animation: "wquiz-shimmer 8s ease-in-out infinite",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  )
}

/* ── Confetti ──────────────────────────────────────────────────────────── */

function Confetti({ intensity = "full" }: { intensity?: "full" | "light" }) {
  const count = intensity === "full" ? 80 : 32
  const pieces = useMemo(() => {
    const colors = ["#C80000", "#F472B6", "#22D3EE", "#FCD34D", "#34D399"]
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 1.6,
      rotate: Math.random() * 720 - 360,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
    }))
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -40, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            borderRadius: 2,
            boxShadow: `0 0 12px ${p.color}66`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Countdown ring ────────────────────────────────────────────────────── */

function CountdownRing({ total, remaining }: { total: number; remaining: number }) {
  const size = 60
  const stroke = 4
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, remaining / total))
  const dash = c * pct

  const danger = remaining <= 5
  const warning = !danger && remaining <= 10
  const color = danger ? "#FF453A" : warning ? "#FB923C" : "#C80000"

  return (
    <motion.div
      animate={danger ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.8, repeat: danger ? Infinity : 0 }}
      style={{ position: "relative", width: size, height: size }}
    >
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 18,
          fontWeight: 700,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {Math.ceil(remaining)}
      </div>
    </motion.div>
  )
}

/* ── Banner (Dashboard) ────────────────────────────────────────────────── */

export function WeeklyQuizBanner() {
  const weekNumber = useMemo(() => getISOWeek(), [])
  const goal = useMemo(() => (readPlan().goal || "your weekly goal").trim(), [])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const eligible = isSunday() && !isQuizCompleted(weekNumber) && !isBannerDismissed(weekNumber)
    setVisible(eligible)
  }, [weekNumber])

  const onDismiss = useCallback(() => {
    dismissBanner(weekNumber)
    setVisible(false)
  }, [weekNumber])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          style={{ marginTop: 16 }}
        >
          <style>{`@keyframes wquiz-shimmer {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
          <IridescentBorder radius={20}>
            <div className="flex flex-wrap items-center gap-4 p-4 md:p-5">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl"
                style={{ background: IRIDESCENT_SOFT }}
              >
                <span className="text-2xl" aria-hidden>🏆</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
                  Week {weekNumber} Challenge is ready!
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "rgba(240,238,255,0.6)" }}>
                  Test what you learned about <span className="font-medium">{goal}</span> this week.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg"
                  style={{ background: IRIDESCENT, boxShadow: "0 8px 28px rgba(200,0,0,0.45)" }}
                >
                  Take quiz <ArrowRight className="size-4" />
                </Link>
                <button
                  onClick={onDismiss}
                  aria-label="Dismiss"
                  className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10"
                  style={{ color: "rgba(240,238,255,0.6)" }}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </IridescentBorder>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Main quiz component ───────────────────────────────────────────────── */

type Phase = "loading" | "intro" | "question" | "reveal" | "results"

const QUESTION_SECONDS = 30
const REVEAL_MS = 1500

function buildCompletedTasksForWeek(weekNumber: number): string[] {
  const plan = readPlan()
  const progress = readProgress()
  const tasks: PlanTask[] = Array.isArray(plan.tasks) ? plan.tasks : []
  const completedDays = new Set(progress.completed)
  return tasks
    .filter((t) => t.week_number === weekNumber && completedDays.has(t.day_number))
    .map((t) => `${t.task_title}: ${t.task_description}`)
}

export function WeeklyQuiz({ goal: goalProp }: { goal?: string }) {
  const navigate = useNavigate()
  const weekNumber = useMemo(() => getISOWeek(), [])
  const goal = useMemo(() => {
    const fromProp = goalProp?.trim()
    if (fromProp) return fromProp
    return (readPlan().goal || "your weekly goal").trim()
  }, [goalProp])

  const [phase, setPhase] = useState<Phase>("loading")
  const [quiz, setQuiz] = useState<QuizPayload | null>(null)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(QUESTION_SECONDS)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [reviewOpen, setReviewOpen] = useState(false)
  const [savedResult, setSavedResult] = useState<QuizResult | null>(null)

  const questionStart = useRef<number>(0)
  const tickRef = useRef<number | null>(null)
  const fetchedRef = useRef(false)

  // Initial load: if already completed, jump to results. Otherwise fetch quiz.
  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    const existing = loadResult(weekNumber)
    if (existing) {
      setSavedResult(existing)
      setAnswers(existing.answers)
      // Recreate quiz shape for the review section using the same generator
      // (questions are also embedded in the saved answers; this is just for UI).
      setQuiz(generateWeeklyQuiz(weekNumber, goal))
      setPhase("results")
      return
    }

    ;(async () => {
      const completedTasks = buildCompletedTasksForWeek(weekNumber)
      try {
        const response = await api.getWeeklyQuiz({ goal, weekNumber, completedTasks })
        const qs = Array.isArray(response?.questions) ? response.questions : []
        if (qs.length === 0) throw new Error("no questions")
        setQuiz({ weekNumber, goal, questions: qs.slice(0, 5) })
      } catch {
        setQuiz(generateWeeklyQuiz(weekNumber, goal))
      } finally {
        setPhase("intro")
      }
    })()
  }, [weekNumber, goal])

  const clearTick = () => {
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current)
      tickRef.current = null
    }
  }

  const handleAnswer = useCallback(
    (choice: number | null) => {
      if (!quiz || phase !== "question") return
      clearTick()
      setSelected(choice)
      setPhase("reveal")
      const elapsed = Date.now() - questionStart.current
      setAnswers((prev) => [
        ...prev,
        { selected: choice, correct: quiz.questions[qIndex].correct, timeMs: elapsed },
      ])
    },
    [phase, qIndex, quiz],
  )

  // Timer tick during answering.
  useEffect(() => {
    if (phase !== "question") return
    questionStart.current = Date.now()
    setRemaining(QUESTION_SECONDS)
    clearTick()
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        const next = r - 0.1
        if (next <= 0) {
          clearTick()
          window.setTimeout(() => handleAnswer(null), 0)
          return 0
        }
        return next
      })
    }, 100)
    return clearTick
  }, [phase, qIndex, handleAnswer])

  // Advance after reveal.
  useEffect(() => {
    if (phase !== "reveal" || !quiz) return
    const t = window.setTimeout(() => {
      if (qIndex + 1 >= quiz.questions.length) {
        finishQuiz()
      } else {
        setSelected(null)
        setQIndex((i) => i + 1)
        setPhase("question")
      }
    }, REVEAL_MS + 600)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function finishQuiz() {
    if (!quiz) return
    const finalAnswers = answers
    const score = finalAnswers.reduce((acc, a) => acc + (a.selected === a.correct ? 1 : 0), 0)
    const totalMs = finalAnswers.reduce((acc, a) => acc + a.timeMs, 0)
    const result: QuizResult = {
      weekNumber,
      goal,
      score,
      totalQuestions: quiz.questions.length,
      timeTakenSeconds: Math.round(totalMs / 1000),
      averageAnswerMs: Math.round(totalMs / Math.max(1, finalAnswers.length)),
      answers: finalAnswers,
      badgeEarned: score >= 4,
      createdAt: new Date().toISOString(),
    }
    saveResult(result)
    setSavedResult(result)
    setPhase("results")
  }

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#050508", color: TEXT_PRIMARY, fontFamily: "var(--font-sans)" }}
    >
      <style>{`
        @keyframes wquiz-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes wquiz-pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,0,0,0.55), 0 14px 40px rgba(200,0,0,0.35); }
          50% { box-shadow: 0 0 0 12px rgba(200,0,0,0), 0 18px 50px rgba(244,114,182,0.45); }
        }
      `}</style>
      <AmbientOrbs />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-1.5 text-sm transition hover:text-white"
          style={{ color: "rgba(240,238,255,0.65)" }}
        >
          <ArrowLeft className="size-4" /> Back to dashboard
        </button>
        <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(240,238,255,0.45)" }}>
          Week {weekNumber}
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-24">
        <AnimatePresence mode="wait">
          {phase === "loading" && <LoadingScreen key="loading" />}

          {phase === "intro" && quiz && (
            <IntroScreen
              key="intro"
              weekNumber={weekNumber}
              goal={goal}
              onStart={() => setPhase("question")}
            />
          )}

          {(phase === "question" || phase === "reveal") && quiz && (
            <QuestionScreen
              key={`q-${qIndex}`}
              quiz={quiz}
              qIndex={qIndex}
              selected={selected}
              remaining={remaining}
              phase={phase}
              onSelect={handleAnswer}
            />
          )}

          {phase === "results" && savedResult && quiz && (
            <ResultsScreen
              key="results"
              result={savedResult}
              quiz={quiz}
              reviewOpen={reviewOpen}
              setReviewOpen={setReviewOpen}
              onBack={() => navigate("/dashboard")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Loading screen ────────────────────────────────────────────────────── */

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto mt-24 flex flex-col items-center text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(200,0,0,0.2)",
          borderTopColor: "#C80000",
        }}
      />
      <p className="mt-6 text-sm" style={{ color: "rgba(240,238,255,0.55)" }}>
        Lara is preparing your challenge…
      </p>
    </motion.div>
  )
}

/* ── Intro screen ──────────────────────────────────────────────────────── */

function IntroScreen({
  weekNumber,
  goal,
  onStart,
}: {
  weekNumber: number
  goal: string
  onStart: () => void
}) {
  const truncated = goal.length > 36 ? `${goal.slice(0, 33)}…` : goal

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mx-auto mt-10 flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        style={{ fontSize: 64, lineHeight: 1, filter: "drop-shadow(0 12px 30px rgba(200,0,0,0.5))" }}
      >
        🏆
      </motion.div>

      <h1 className="mt-6 text-[28px] font-extrabold tracking-tight">
        <IridescentText>Week {weekNumber} Challenge</IridescentText>
      </h1>
      <p className="mt-2 text-[15px]" style={{ color: "rgba(240,238,255,0.6)" }}>
        5 questions · 30 seconds each
      </p>

      <div className="mt-5">
        <IridescentBorder radius={999}>
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm" style={{ color: TEXT_PRIMARY }}>
            <span aria-hidden>🎯</span>
            <span>{truncated}</span>
          </span>
        </IridescentBorder>
      </div>

      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-white"
        style={{
          padding: "16px 40px",
          borderRadius: 30,
          background: IRIDESCENT,
          backgroundSize: "200% 200%",
          animation: "wquiz-shimmer 5s ease-in-out infinite, wquiz-pulse-glow 2.6s ease-in-out infinite",
        }}
      >
        Start challenge <ArrowRight className="size-5" />
      </motion.button>

      <p className="mt-6 text-xs" style={{ color: "rgba(240,238,255,0.4)" }}>
        Answer fast — the timer rewards focus, not perfection.
      </p>
    </motion.div>
  )
}

/* ── Question screen ───────────────────────────────────────────────────── */

function QuestionScreen({
  quiz,
  qIndex,
  selected,
  remaining,
  phase,
  onSelect,
}: {
  quiz: QuizPayload
  qIndex: number
  selected: number | null
  remaining: number
  phase: Phase
  onSelect: (choice: number) => void
}) {
  const q = quiz.questions[qIndex]
  const revealing = phase === "reveal"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-4"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(240,238,255,0.5)" }}>
            Question {qIndex + 1} of {quiz.questions.length}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            {quiz.questions.map((_, i) => {
              const done = i < qIndex
              const current = i === qIndex
              return (
                <motion.span
                  key={i}
                  animate={current ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                  transition={{ duration: 1.2, repeat: current ? Infinity : 0 }}
                  className="block h-2 w-2 rounded-full"
                  style={{
                    background: done || current ? IRIDESCENT : "rgba(255,255,255,0.12)",
                    boxShadow: current ? "0 0 12px rgba(200,0,0,0.7)" : "none",
                  }}
                />
              )
            })}
          </div>
        </div>
        <CountdownRing total={QUESTION_SECONDS} remaining={remaining} />
      </div>

      {/* Question card */}
      <motion.div
        key={qIndex}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <IridescentBorder radius={20}>
          <div className="px-7 py-7 text-center">
            <p className="text-[18px] font-bold leading-relaxed" style={{ color: TEXT_PRIMARY }}>
              {q.question}
            </p>
          </div>
        </IridescentBorder>
      </motion.div>

      {/* Options */}
      <div className="mt-6 space-y-2.5">
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === q.correct
          const showCorrect = revealing && isCorrect
          const showWrong = revealing && isSelected && !isCorrect

          let bg = "rgba(255,255,255,0.03)"
          let border = "rgba(255,255,255,0.07)"
          let glow = "none"

          if (showCorrect) {
            bg = "rgba(52,211,153,0.08)"
            border = "rgba(52,211,153,0.6)"
            glow = "0 0 24px rgba(52,211,153,0.25)"
          } else if (showWrong) {
            bg = "rgba(255,69,58,0.06)"
            border = "rgba(255,69,58,0.5)"
            glow = "0 0 24px rgba(255,69,58,0.2)"
          } else if (isSelected) {
            bg = "rgba(200,0,0,0.06)"
            border = "rgba(200,0,0,0.6)"
          }

          const letter = String.fromCharCode(65 + i)
          const optionText = opt.replace(/^[A-D]\)\s*/, "")

          return (
            <motion.button
              key={i}
              disabled={revealing || selected !== null}
              onClick={() => onSelect(i)}
              whileHover={revealing ? undefined : { x: 4 }}
              animate={
                showWrong
                  ? { x: [0, -8, 8, -4, 4, 0] }
                  : showCorrect
                  ? { scale: [1, 1.02, 1] }
                  : { x: 0, scale: 1 }
              }
              transition={{ duration: showWrong ? 0.4 : 0.5 }}
              className="flex w-full items-center gap-4 rounded-[14px] px-5 py-4 text-left transition-colors disabled:cursor-default"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: glow,
              }}
            >
              <span
                className="grid h-6 w-6 flex-none place-items-center text-xs font-semibold"
                style={{ color: "rgba(240,238,255,0.55)" }}
              >
                {letter}
              </span>
              <span className="flex-1 text-[15px]" style={{ color: TEXT_PRIMARY }}>
                {optionText}
              </span>
              {showCorrect && <Check className="size-[18px] flex-none" style={{ color: "#34D399" }} />}
              {showWrong && <X className="size-[18px] flex-none" style={{ color: "#FF453A" }} />}
            </motion.button>
          )
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-5"
            style={{
              borderRadius: 12,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.03)",
              borderLeft: "2px solid #C80000",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <p className="text-[13px]" style={{ color: "rgba(240,238,255,0.6)" }}>
              <span className="mr-1.5" aria-hidden>💡</span>
              {q.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Results screen ────────────────────────────────────────────────────── */

function ResultsScreen({
  result,
  quiz,
  reviewOpen,
  setReviewOpen,
  onBack,
}: {
  result: QuizResult
  quiz: QuizPayload
  reviewOpen: boolean
  setReviewOpen: (v: boolean) => void
  onBack: () => void
}) {
  const { score, totalQuestions, averageAnswerMs, weekNumber, goal, badgeEarned } = result

  const scoreColor =
    score >= 4
      ? IRIDESCENT
      : score === 3
      ? "linear-gradient(135deg,#FB923C,#FCD34D)"
      : "linear-gradient(135deg,#FF6B6B,#FF453A)"

  const label =
    score === 5
      ? "Perfect! 🏆"
      : score === 4
      ? "Excellent! ⭐"
      : score === 3
      ? "Good effort 👍"
      : score === 2
      ? "Keep studying 📚"
      : "More practice needed"

  const onShare = async () => {
    const text = `I scored ${score}/${totalQuestions} on my Week ${weekNumber} ${goal} quiz! 🏆 #Scholify`
    try {
      if (typeof navigator !== "undefined" && (navigator as Navigator).share) {
        await (navigator as Navigator).share({ title: "Scholify Weekly Challenge", text })
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text)
      }
    } catch {
      /* user cancelled — no-op */
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="mx-auto mt-6 flex flex-col items-center text-center"
    >
      {score === 5 && <Confetti intensity="full" />}
      {score === 4 && <Confetti intensity="light" />}

      <motion.h2
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        style={{
          fontSize: "clamp(48px, 8vw, 72px)",
          fontWeight: 900,
          background: scoreColor,
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          animation: "wquiz-shimmer 5s ease-in-out infinite",
          lineHeight: 1,
        }}
      >
        {score} / {totalQuestions}
      </motion.h2>

      <p className="mt-2 text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>
        {label}
      </p>

      <div className="mt-4">
        <IridescentBorder radius={999}>
          <span
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px]"
            style={{ color: "rgba(240,238,255,0.7)" }}
          >
            <Sparkles className="size-3.5" />
            Average answer time: {(averageAnswerMs / 1000).toFixed(1)}s
          </span>
        </IridescentBorder>
      </div>

      {badgeEarned && (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: [0, 1.2, 1], rotate: [-12, 4, 0] }}
          transition={{ duration: 0.8, type: "spring", stiffness: 180 }}
          className="mt-8"
        >
          <ChampionBadge weekNumber={weekNumber} />
          <p className="mt-3 text-xs" style={{ color: "rgba(240,238,255,0.55)" }}>
            Badge added to your collection.
          </p>
        </motion.div>
      )}

      {/* Review toggle */}
      <button
        onClick={() => setReviewOpen(!reviewOpen)}
        className="mt-8 text-sm transition hover:text-white"
        style={{ color: "rgba(240,238,255,0.6)" }}
      >
        Review answers {reviewOpen ? "↑" : "↓"}
      </button>

      <AnimatePresence>
        {reviewOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 w-full space-y-3 overflow-hidden"
          >
            {quiz.questions.map((q, i) => {
              const ans = result.answers[i]
              const correct = ans?.selected === q.correct
              return (
                <div
                  key={i}
                  className="rounded-2xl p-4 text-left"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full text-[11px] font-bold"
                      style={{
                        background: correct ? "rgba(52,211,153,0.16)" : "rgba(255,69,58,0.16)",
                        color: correct ? "#34D399" : "#FF453A",
                      }}
                    >
                      {correct ? "✓" : "✗"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
                        {q.question}
                      </p>
                      <p className="mt-1 text-xs" style={{ color: "rgba(240,238,255,0.55)" }}>
                        Your answer:{" "}
                        {ans?.selected != null ? q.options[ans.selected].replace(/^[A-D]\)\s*/, "") : "—"}
                      </p>
                      {!correct && (
                        <p className="mt-0.5 text-xs" style={{ color: "#34D399" }}>
                          Correct: {q.options[q.correct].replace(/^[A-D]\)\s*/, "")}
                        </p>
                      )}
                      <p className="mt-2 text-[12px]" style={{ color: "rgba(240,238,255,0.5)" }}>
                        💡 {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onShare}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          style={{
            color: TEXT_PRIMARY,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <Share2 className="size-4" /> Share result
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: IRIDESCENT, boxShadow: "0 10px 30px rgba(200,0,0,0.4)" }}
        >
          Back to dashboard <ArrowRight className="size-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function ChampionBadge({ weekNumber }: { weekNumber: number }) {
  return (
    <div style={{ position: "relative", width: 168, height: 168 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `conic-gradient(from 0deg, #C80000, #F472B6, #22D3EE, #C80000)`,
          filter: "blur(2px)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 6,
          borderRadius: "50%",
          background: "#0A0A14",
          display: "grid",
          placeItems: "center",
          boxShadow: "inset 0 0 30px rgba(200,0,0,0.35)",
        }}
      >
        <div className="text-center">
          <div style={{ fontSize: 38, lineHeight: 1 }} aria-hidden>🏆</div>
          <div
            className="mt-1 text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "rgba(240,238,255,0.6)" }}
          >
            Week {weekNumber}
          </div>
          <div className="text-sm font-bold">
            <IridescentText>Champion</IridescentText>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyQuiz
