import { useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { speak, canSpeak } from "@/lib/tts"
import {
  getTodaySession,
  gradeWordInDeck,
  recordSession,
  readVocabProgress,
  type ReviewGrade,
  type VocabDeck,
  type VocabWord,
} from "@/lib/vocab"
import { coachAfterSession } from "@/lib/lara-vocab"

/*
 * The daily vocabulary session — the core of the product.
 *   Learn (new words) → Flashcards (SM-2 grading) → Quiz → Done.
 * Immersive full-screen, animated, with pronunciation and a streak payoff.
 */

type Phase = "learn" | "review" | "quiz" | "done"

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"

const GRADES: { grade: ReviewGrade; label: string; color: string }[] = [
  { grade: "again", label: "Again", color: "#FF6B5E" },
  { grade: "hard", label: "Hard", color: "#FF9F0A" },
  { grade: "good", label: "Good", color: "#34D399" },
  { grade: "easy", label: "Easy", color: "#38BDF8" },
]

const XP_BY_GRADE: Record<ReviewGrade, number> = { again: 2, hard: 5, good: 10, easy: 12 }
const QUIZ_XP = 8
const FINISH_BONUS = 5

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function VocabSession({
  deck,
  onClose,
  onFinished,
  onPlayGame,
  userName,
  drillWords,
}: {
  deck: VocabDeck
  onClose: () => void
  onFinished: () => void
  /** Optional "lightning round" — chains the finished session into a game. */
  onPlayGame?: () => void
  userName?: string
  /** When provided, run a focused drill over these words instead of today's set. */
  drillWords?: VocabWord[]
}) {
  const isDrill = Boolean(drillWords && drillWords.length > 0)
  // Snapshot today's words once so the session set is stable while we grade.
  const session = useMemo(() => getTodaySession(deck), [deck])
  const newWords = isDrill ? [] : session.newWords
  const reviewQueue = useMemo(
    () => (isDrill ? (drillWords as VocabWord[]) : [...session.newWords, ...session.dueWords]),
    [session, isDrill, drillWords],
  )

  const [workingDeck, setWorkingDeck] = useState(deck)
  const [phase, setPhase] = useState<Phase>(newWords.length > 0 ? "learn" : "review")
  const [learnIdx, setLearnIdx] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizPicked, setQuizPicked] = useState<string | null>(null)
  const [quizCorrect, setQuizCorrect] = useState(0)
  const [results, setResults] = useState<{ term: string; grade: ReviewGrade }[]>([])
  const [earnedXp, setEarnedXp] = useState(0)
  const xpRef = useRef(0)

  const lang = workingDeck.targetLanguage
  const pronounce = (t: string) => speak(t, lang)

  // ── Quiz set: up to 5 of the session words, 4 options each ──
  const quiz = useMemo(() => {
    const pool = reviewQueue.length > 0 ? reviewQueue : workingDeck.words
    const picks = shuffle(pool).slice(0, Math.min(5, pool.length))
    const allTranslations = Array.from(new Set(workingDeck.words.map((w) => w.translation)))
    return picks.map((w) => {
      const distractors = shuffle(allTranslations.filter((t) => t !== w.translation)).slice(0, 3)
      return { word: w, options: shuffle([w.translation, ...distractors]) }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Phase: empty session guard ── */
  const nothingToDo = reviewQueue.length === 0 && newWords.length === 0

  /* ── Handlers ── */
  const grade = (word: VocabWord, g: ReviewGrade) => {
    setWorkingDeck((d) => gradeWordInDeck(d, word.id, g))
    setResults((r) => [...r, { term: word.term, grade: g }])
    xpRef.current += XP_BY_GRADE[g]
    setRevealed(false)
    if (reviewIdx + 1 < reviewQueue.length) {
      setReviewIdx((i) => i + 1)
    } else {
      setPhase(quiz.length > 0 ? "quiz" : "done")
      if (quiz.length === 0) finish(0)
    }
  }

  const advanceLearn = () => {
    if (learnIdx + 1 < newWords.length) setLearnIdx((i) => i + 1)
    else setPhase(reviewQueue.length > 0 ? "review" : "done")
  }

  const pickQuiz = (option: string) => {
    if (quizPicked) return
    setQuizPicked(option)
    const correct = option === quiz[quizIdx].word.translation
    if (correct) {
      setQuizCorrect((c) => c + 1)
      xpRef.current += QUIZ_XP
    }
    window.setTimeout(() => {
      if (quizIdx + 1 < quiz.length) {
        setQuizIdx((i) => i + 1)
        setQuizPicked(null)
      } else {
        finish(correct ? quizCorrect + 1 : quizCorrect)
      }
    }, 850)
  }

  const finish = (finalCorrect: number) => {
    const earned = reviewQueue.length > 0 ? xpRef.current + FINISH_BONUS : 0
    setEarnedXp(earned)
    recordSession(reviewQueue.length, earned)
    setPhase("done")
    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#C084FC", "#818CF8", "#38BDF8", "#34D399", "#FBBF24"],
      })
    } catch {
      /* ignore */
    }
    void finalCorrect
  }

  /* ── Progress for the top bar ── */
  const totalSteps = newWords.length + reviewQueue.length + quiz.length
  const doneSteps =
    (phase === "learn" ? learnIdx : newWords.length) +
    (phase === "review" ? reviewIdx : phase === "learn" ? 0 : reviewQueue.length) +
    (phase === "quiz" ? quizIdx : phase === "done" ? quiz.length : 0)
  const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0

  return (
    <div style={shell}>
      {/* Top bar */}
      <div style={topBar}>
        <button type="button" onClick={onClose} aria-label="Close" style={iconBtn}>
          ✕
        </button>
        <div style={progressTrack}>
          <motion.div
            animate={{ width: `${phase === "done" ? 100 : pct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={progressFill}
          />
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={stage}>
        <AnimatePresence mode="wait">
          {/* ── LEARN ── */}
          {phase === "learn" && newWords[learnIdx] && (
            <motion.div
              key={`learn-${learnIdx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", maxWidth: 440 }}
            >
              <div style={kicker}>New word · {learnIdx + 1}/{newWords.length}</div>
              <WordFace word={newWords[learnIdx]} lang={lang} onSpeak={pronounce} showAll />
              <PrimaryButton label="Got it →" onClick={advanceLearn} />
            </motion.div>
          )}

          {/* ── REVIEW (flashcards) ── */}
          {phase === "review" && reviewQueue[reviewIdx] && (
            <motion.div
              key={`rev-${reviewIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", maxWidth: 440 }}
            >
              <div style={kicker}>Review · {reviewIdx + 1}/{reviewQueue.length}</div>
              <WordFace
                word={reviewQueue[reviewIdx]}
                lang={lang}
                onSpeak={pronounce}
                showAll={revealed}
              />
              {!revealed ? (
                <PrimaryButton label="Show answer" onClick={() => setRevealed(true)} />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                  {GRADES.map((g) => (
                    <motion.button
                      key={g.grade}
                      type="button"
                      onClick={() => grade(reviewQueue[reviewIdx], g.grade)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        ...gradeBtn,
                        color: g.color,
                        border: `1px solid ${g.color}55`,
                        background: `${g.color}14`,
                      }}
                    >
                      {g.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── QUIZ ── */}
          {phase === "quiz" && quiz[quizIdx] && (
            <motion.div
              key={`quiz-${quizIdx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", maxWidth: 440 }}
            >
              <div style={kicker}>Quiz · {quizIdx + 1}/{quiz.length}</div>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <div style={{ fontSize: "clamp(22px, 7vw, 32px)", fontWeight: 900, color: TEXT, overflowWrap: "break-word" }}>
                  {quiz[quizIdx].word.term}
                </div>
                <div style={{ fontSize: 13, color: DIM, marginTop: 6 }}>Choose the meaning</div>
              </div>
              <div style={{ display: "grid", gap: 10, marginTop: 24 }}>
                {quiz[quizIdx].options.map((opt) => {
                  const isAnswer = opt === quiz[quizIdx].word.translation
                  const picked = quizPicked === opt
                  const reveal = quizPicked != null
                  const bg = reveal && isAnswer
                    ? "rgba(52,211,153,0.16)"
                    : picked
                      ? "rgba(255,107,94,0.16)"
                      : "var(--sch-card)"
                  const bd = reveal && isAnswer
                    ? "#34D399"
                    : picked
                      ? "#FF6B5E"
                      : "var(--sch-border)"
                  return (
                    <motion.button
                      key={opt}
                      type="button"
                      onClick={() => pickQuiz(opt)}
                      whileTap={quizPicked ? undefined : { scale: 0.98 }}
                      style={{ ...quizOpt, background: bg, border: `1px solid ${bd}` }}
                    >
                      {opt}
                      {reveal && isAnswer && <span style={{ marginLeft: 8 }}>✓</span>}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── DONE ── */}
          {(phase === "done" || nothingToDo) && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{ width: "100%", maxWidth: 420, textAlign: "center" }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <LaraAvatar size={64} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT }}>
                {nothingToDo ? "All caught up! 🎉" : "Session complete! 🎉"}
              </h2>
              {!nothingToDo && earnedXp > 0 && (
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                  style={{
                    display: "inline-block",
                    marginTop: 12,
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: "rgba(139,92,246,0.14)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#C084FC",
                  }}
                >
                  +{earnedXp} XP ⚡
                </motion.div>
              )}
              <p style={{ fontSize: 15, color: MUTED, marginTop: 12, lineHeight: 1.6, fontStyle: "italic" }}>
                {nothingToDo
                  ? "No words are due right now. Come back later or add new words."
                  : coachAfterSession(userName ?? "", deck.targetLanguageLabel, {
                      reviewed: reviewQueue.length,
                      weakWords: results
                        .filter((r) => r.grade === "again" || r.grade === "hard")
                        .map((r) => r.term),
                      quizCorrect,
                      quizTotal: quiz.length,
                      streak: readVocabProgress().streak,
                    })}
              </p>
              {onPlayGame && !nothingToDo && deck.words.length >= 4 && (
                <PrimaryButton label="⚡ Lightning round" onClick={onPlayGame} />
              )}
              <button
                type="button"
                onClick={onFinished}
                style={{
                  width: "100%",
                  height: 48,
                  marginTop: 10,
                  borderRadius: 14,
                  border: "1px solid var(--sch-border)",
                  background: "transparent",
                  color: MUTED,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Word face (shared by learn + review) ────────────────────── */

function WordFace({
  word,
  lang,
  onSpeak,
  showAll,
}: {
  word: VocabWord
  lang: string
  onSpeak: (t: string) => void
  showAll: boolean
}) {
  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span
          style={{
            fontSize: "clamp(22px, 7vw, 34px)",
            fontWeight: 900,
            color: TEXT,
            letterSpacing: "-0.5px",
            overflowWrap: "break-word",
            minWidth: 0,
          }}
        >
          {word.term}
        </span>
        {canSpeak() && (
          <button
            type="button"
            aria-label="Pronounce"
            onClick={() => onSpeak(word.term)}
            style={speakBtn}
          >
            🔊
          </button>
        )}
      </div>
      {word.partOfSpeech && (
        <div style={{ fontSize: 12, color: DIM, marginTop: 4, fontStyle: "italic" }}>
          {word.partOfSpeech}
        </div>
      )}

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ height: 1, background: "var(--sch-hairline)", margin: "18px 0" }} />
            <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>{word.translation}</div>
            {word.example && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 15, color: "var(--sch-tx-1)", fontStyle: "italic", lineHeight: 1.5 }}>
                  “{word.example}”
                </div>
                {word.exampleTranslation && (
                  <div style={{ fontSize: 13, color: DIM, marginTop: 4 }}>
                    {word.exampleTranslation}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Bits ────────────────────────────────────────────────────── */

function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: "100%",
        height: 52,
        marginTop: 24,
        borderRadius: 14,
        border: "none",
        background: IRIDESCENT,
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 0 30px rgba(139,92,246,0.3)",
      }}
    >
      {label}
    </motion.button>
  )
}

const shell: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  background: "var(--sch-bg)",
  display: "flex",
  flexDirection: "column",
}
const topBar: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "max(14px, env(safe-area-inset-top)) 20px 14px",
}
const iconBtn: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: MUTED,
  fontSize: 14,
  cursor: "pointer",
  flexShrink: 0,
}
const progressTrack: CSSProperties = {
  flex: 1,
  height: 8,
  borderRadius: 4,
  background: "var(--sch-hairline)",
  overflow: "hidden",
}
const progressFill: CSSProperties = { height: "100%", background: IRIDESCENT }
const stage: CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 24px 60px",
}
const card: CSSProperties = {
  padding: "32px 24px",
  borderRadius: 24,
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  textAlign: "center",
  boxShadow: "0 0 60px rgba(139,92,246,0.08)",
}
const kicker: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(192,132,252,0.8)",
  textAlign: "center",
  marginBottom: 12,
}
const gradeBtn: CSSProperties = {
  height: 48,
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
}
const quizOpt: CSSProperties = {
  width: "100%",
  minHeight: 50,
  padding: "12px 16px",
  borderRadius: 12,
  fontSize: 15,
  color: TEXT,
  textAlign: "left",
  cursor: "pointer",
}
const speakBtn: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card-2)",
  fontSize: 15,
  cursor: "pointer",
}
