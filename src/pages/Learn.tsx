import { useCallback, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { addDays } from "date-fns"
import { motion, AnimatePresence } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/i18n/LanguageProvider"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import VocabSession from "@/components/VocabSession"
import VocabMatchGame from "@/components/VocabMatchGame"
import VocabTypeGame from "@/components/VocabTypeGame"
import VocabSpeakGame from "@/components/VocabSpeakGame"
import BringYourOwnContent from "@/components/BringYourOwnContent"
import { coachOnHome, getWeeklyReport } from "@/lib/lara-vocab"
import {
  createDeck,
  readDeck,
  writeDeck,
  clearDeck,
  addWordsToDeck,
  getDeckStats,
  getTodaySession,
  readVocabProgress,
  daysUntilDeadline,
  isWeeklyReportDue,
  markWeeklyReportSeen,
  remainingNewQuota,
  setDailyGoal,
  type VocabDeck,
  type NewWordInput,
  type VocabWord,
} from "@/lib/vocab"
import { TARGET_LANGUAGES, languageLabel, languageFlag } from "@/lib/vocab-content"
import { generateVocab } from "@/lib/vocab-api"
import { FLUENCY_WORDS, wordsLearned, fluencyPercent, dayNumber } from "@/lib/fluency"

/* ──────────────────────────────────────────────────────────────
 *  /learn — the home of Scholify (AI vocabulary coach).
 *
 *  First run is one tap: pick a language → Lara builds a starter deck →
 *  you're learning within seconds. Everything else (level, goal, deadline)
 *  has a smart default and lives behind an optional "fine-tune".
 *  The wedge — "learn from your own text" — is one clear secondary path.
 * ────────────────────────────────────────────────────────────── */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"

const GOALS = [
  { id: "career", label: "Career / Work", icon: "💼" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "conversation", label: "Conversation", icon: "💬" },
  { id: "exam", label: "Exam prep", icon: "🎓" },
]
const DAILY_OPTIONS = [5, 10, 15]
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]
const DEADLINE_OPTIONS = [
  { label: "No deadline", days: 0 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
  { label: "6 months", days: 180 },
]

export default function Learn() {
  const { toast } = useToast()
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.first_name as string) || ""
  const [deck, setDeck] = useState<VocabDeck | null>(() => readDeck())
  const [inSession, setInSession] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [inTypeGame, setInTypeGame] = useState(false)
  const [inSpeakGame, setInSpeakGame] = useState(false)
  const [inByo, setInByo] = useState(false)
  const [drillWords, setDrillWords] = useState<VocabWord[] | null>(null)
  const [tick, setTick] = useState(0) // refresh stats after a session
  const isPro = Boolean(user?.user_metadata?.plan && user.user_metadata.plan !== "free")
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()

  const refresh = useCallback(() => {
    setDeck(readDeck())
    setTick((t) => t + 1)
  }, [])

  /*
   * Start today's session, topping up the new-word stock first so the chosen
   * daily pace (5/10/15/custom) is always deliverable — the deck never stalls
   * at "0 new words" while the user still has quota left today.
   */
  const [preparing, setPreparing] = useState(false)
  const startSession = useCallback(async () => {
    const current = readDeck()
    if (!current) return
    const quota = remainingNewQuota(current)
    const stock = current.words.filter((w) => w.status === "new").length
    if (quota > 0 && stock < quota) {
      setPreparing(true)
      try {
        const more = await generateVocab({
          target: current.targetLanguage,
          targetLabel: current.targetLanguageLabel,
          native: current.nativeLanguage,
          nativeLabel: languageLabel(current.nativeLanguage),
          goal: current.goal,
          level: current.level,
          count: Math.max(12, quota - stock),
          exclude: current.words.map((w) => w.term),
        })
        if (more.length > 0) {
          addWordsToDeck(current, more)
          setDeck(readDeck())
        }
      } catch {
        /* offline / API down — start with whatever stock we have */
      }
      setPreparing(false)
    }
    setInSession(true)
  }, [])

  if (inSession && deck) {
    return (
      <VocabSession
        deck={deck}
        userName={firstName}
        drillWords={drillWords ?? undefined}
        onPlayGame={() => {
          setInSession(false)
          setDrillWords(null)
          setInGame(true)
        }}
        onClose={() => {
          setInSession(false)
          setDrillWords(null)
          refresh()
        }}
        onFinished={() => {
          setInSession(false)
          setDrillWords(null)
          refresh()
        }}
      />
    )
  }

  if (inGame && deck) {
    return (
      <VocabMatchGame
        deck={deck}
        onClose={() => {
          setInGame(false)
          refresh()
        }}
      />
    )
  }

  if (inTypeGame && deck) {
    return (
      <VocabTypeGame
        deck={deck}
        onClose={() => {
          setInTypeGame(false)
          refresh()
        }}
      />
    )
  }

  if (inSpeakGame && deck) {
    return (
      <VocabSpeakGame
        deck={deck}
        onClose={() => {
          setInSpeakGame(false)
          refresh()
        }}
      />
    )
  }

  if (inByo && deck) {
    return (
      <BringYourOwnContent
        targetLanguage={deck.targetLanguage}
        targetLabel={deck.targetLanguageLabel}
        nativeLanguage={deck.nativeLanguage}
        existingTerms={deck.words.map((w) => w.term)}
        onAdded={(words: NewWordInput[]) => {
          addWordsToDeck(deck, words)
          toast.success(`${words.length} words added! They're in today's session.`)
        }}
        onClose={() => {
          setInByo(false)
          refresh()
        }}
      />
    )
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {deck ? (
          <DeckHome
            key={tick}
            deck={deck}
            name={firstName}
            isPro={isPro}
            preparing={preparing}
            onStart={() => void startSession()}
            onSetDaily={(n) => {
              setDailyGoal(deck, n)
              refresh()
            }}
            onPlayGame={() => setInGame(true)}
            onPlayType={() => (isPro ? setInTypeGame(true) : triggerFeaturePaywall())}
            onPlaySpeak={() => (isPro ? setInSpeakGame(true) : triggerFeaturePaywall())}
            onExtract={() => setInByo(true)}
            onDrill={(words) => {
              markWeeklyReportSeen()
              setDrillWords(words)
              setInSession(true)
            }}
            onAddWords={async () => {
              const more = await generateVocab({
                target: deck.targetLanguage,
                targetLabel: deck.targetLanguageLabel,
                native: deck.nativeLanguage,
                nativeLabel: languageLabel(deck.nativeLanguage),
                goal: deck.goal,
                count: 12,
                exclude: deck.words.map((w) => w.term),
              })
              if (more.length === 0) {
                toast.info("No new words to add right now.")
                return
              }
              addWordsToDeck(deck, more)
              refresh()
              toast.success(`Added ${more.length} new words ✨`)
            }}
            onReset={() => {
              clearDeck()
              refresh()
            }}
          />
        ) : (
          <Setup
            onStart={(d) => {
              writeDeck(d)
              setDeck(d)
              setInSession(true) // straight into the first session — the payoff
            }}
          />
        )}
      </div>

      <PaywallModal open={showPaywall} type={paywallType} onClose={closePaywall} />
    </DashboardLayout>
  )
}

/* ── Deck home ───────────────────────────────────────────────── */

function DeckHome({
  deck,
  name,
  isPro,
  preparing,
  onStart,
  onSetDaily,
  onPlayGame,
  onPlayType,
  onPlaySpeak,
  onExtract,
  onDrill,
  onAddWords,
  onReset,
}: {
  deck: VocabDeck
  name: string
  isPro: boolean
  preparing: boolean
  onStart: () => void
  onSetDaily: (n: number) => void
  onPlayGame: () => void
  onPlayType: () => void
  onPlaySpeak: () => void
  onExtract: () => void
  onDrill: (words: VocabWord[]) => void
  onAddWords: () => Promise<void>
  onReset: () => void
}) {
  const { t } = useLanguage()
  const stats = useMemo(() => getDeckStats(deck), [deck])
  const session = useMemo(() => getTodaySession(deck), [deck])
  const progress = useMemo(() => readVocabProgress(), [])
  const coaching = useMemo(() => coachOnHome(name, deck), [name, deck])
  const daysLeft = daysUntilDeadline(deck)
  const [reportOpen, setReportOpen] = useState(() => isWeeklyReportDue(progress))
  const report = useMemo(() => getWeeklyReport(name, deck, progress), [name, deck, progress])
  const [adding, setAdding] = useState(false)
  const [editGoal, setEditGoal] = useState(false)
  const [customDaily, setCustomDaily] = useState(`${deck.dailyNewWords}`)

  // Today = what's left of the daily new-word quota (auto-topped-up on start) + due reviews.
  const quotaLeft = remainingNewQuota(deck)
  const todayCount = quotaLeft + session.dueWords.length
  const learned = wordsLearned(deck)
  const fluencyPct = fluencyPercent(deck)
  const day = dayNumber(deck)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header — language + streak, nothing else competing */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 40 }}>{languageFlag(deck.targetLanguage)}</span>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: TEXT, letterSpacing: "-0.5px" }}>
            {deck.targetLanguageLabel}
          </h1>
          <button
            type="button"
            onClick={() => setEditGoal((v) => !v)}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              marginTop: 2,
              fontSize: 13,
              color: MUTED,
              cursor: "pointer",
              textDecoration: "underline dotted",
              textUnderlineOffset: 3,
            }}
          >
            {deck.dailyNewWords} new words/day ✎
            {daysLeft != null ? ` · ${daysLeft} day${daysLeft === 1 ? "" : "s"} left` : ""}
          </button>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 900, ...iriText }}>🔥 {progress.streak}</div>
          <div style={{ fontSize: 11, color: DIM }}>day streak</div>
        </div>
      </div>

      {/* Daily goal editor — the pace drives the whole fluency projection */}
      <AnimatePresence initial={false}>
        {editGoal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 14,
                padding: 16,
                borderRadius: 16,
                background: "var(--sch-card)",
                border: "1px solid rgba(139,92,246,0.3)",
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>New words per day:</span>
              {DAILY_OPTIONS.map((n) => (
                <Choice
                  key={n}
                  active={deck.dailyNewWords === n}
                  onClick={() => {
                    setCustomDaily(`${n}`)
                    onSetDaily(n)
                    setEditGoal(false)
                  }}
                  compact
                >
                  {n}
                </Choice>
              ))}
              <input
                type="number"
                min={1}
                max={50}
                value={customDaily}
                onChange={(e) => setCustomDaily(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSetDaily(Number(customDaily) || deck.dailyNewWords)
                    setEditGoal(false)
                  }
                }}
                aria-label="Custom words per day"
                style={{ ...langInput, width: 80, marginTop: 0, textAlign: "center" }}
              />
              <button
                type="button"
                onClick={() => {
                  onSetDaily(Number(customDaily) || deck.dailyNewWords)
                  setEditGoal(false)
                }}
                style={primaryBtnSmall}
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weekly report (once a week, conditional) */}
      {reportOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 20,
            padding: 18,
            borderRadius: 18,
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LaraAvatar size={32} />
            <div style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>Your week with Lara</div>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--sch-tx-1)", lineHeight: 1.6, marginTop: 10 }}>
            {report.message}
          </p>
          {report.hardWords.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
              {report.hardWords.slice(0, 6).map((w) => (
                <span
                  key={w.id}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    color: MUTED,
                    background: "var(--sch-card)",
                    border: "1px solid var(--sch-border)",
                  }}
                >
                  {w.term}
                </span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {report.hardWords.length > 0 && (
              <motion.button
                type="button"
                onClick={() => onDrill(report.hardWords)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={primaryBtnSmall}
              >
                Drill hard words →
              </motion.button>
            )}
            <button
              type="button"
              onClick={() => {
                markWeeklyReportSeen()
                setReportOpen(false)
              }}
              style={ghostBtn}
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}

      {/* Lara coaching — one warm line, sets the "coach" tone */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          padding: 16,
          borderRadius: 18,
          background: "rgba(139,92,246,0.06)",
          border: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <LaraAvatar size={34} />
        <p style={{ fontSize: 14, color: "var(--sch-tx-1)", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
          {coaching}
        </p>
      </div>

      {/* THE hero — today's session. The one thing to do. */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{
          marginTop: 24,
          padding: 30,
          borderRadius: 24,
          background: "var(--sch-card)",
          border: "1px solid rgba(139,92,246,0.25)",
          boxShadow: "0 0 60px rgba(139,92,246,0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <LaraAvatar size={48} />
        </div>
        {todayCount > 0 ? (
          <>
            <div style={{ fontSize: 20, fontWeight: 800, color: TEXT, letterSpacing: "-0.3px" }}>
              {todayCount} word{todayCount === 1 ? "" : "s"} ready for today
            </div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>
              {quotaLeft} new · {session.dueWords.length} to review
            </div>
            <motion.button
              type="button"
              disabled={preparing}
              onClick={onStart}
              whileHover={preparing ? undefined : { scale: 1.02 }}
              whileTap={preparing ? undefined : { scale: 0.98 }}
              style={{ ...primaryBtn, opacity: preparing ? 0.75 : 1 }}
            >
              {preparing ? "Picking your words…" : "Start today's session →"}
            </motion.button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>All caught up 🎉</div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>
              No words due right now. Add more to keep the momentum going.
            </div>
            <motion.button
              type="button"
              disabled={adding}
              onClick={async () => {
                setAdding(true)
                await onAddWords()
                setAdding(false)
              }}
              whileHover={adding ? undefined : { scale: 1.02 }}
              whileTap={adding ? undefined : { scale: 0.98 }}
              style={{ ...primaryBtn, opacity: adding ? 0.7 : 1 }}
            >
              {adding ? "Adding…" : "+ Add new words"}
            </motion.button>
          </>
        )}
      </motion.div>

      {/* The wedge — learn from your own text. Scholify's real differentiator. */}
      <motion.button
        type="button"
        onClick={onExtract}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%",
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 14,
          textAlign: "left",
          padding: 18,
          borderRadius: 18,
          cursor: "pointer",
          background: "rgba(139,92,246,0.07)",
          border: "1px solid rgba(139,92,246,0.4)",
          boxShadow: "0 0 24px rgba(139,92,246,0.1)",
        }}
      >
        <span style={{ fontSize: 26 }}>📄</span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: TEXT }}>
            {t("Learn from your own text")}
          </span>
          <span style={{ display: "block", fontSize: 12.5, color: MUTED, marginTop: 2, lineHeight: 1.5 }}>
            {t("A job post, an email, lyrics — I'll pull out the exact words you need.")}
          </span>
        </span>
        <span style={{ fontSize: 18, color: "#C084FC" }}>→</span>
      </motion.button>

      {/* Slim stats strip */}
      <div
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
        }}
      >
        <Stat label="Due today" value={`${stats.dueToday}`} />
        <Stat label="Learning" value={`${stats.learning + stats.newCount}`} />
        <Stat label="Mastered" value={`${stats.mastered}`} />
      </div>

      {/* Path to fluency — the 1%-a-day promise, in one line */}
      <Link to="/learn/progress" style={{ textDecoration: "none", display: "block" }}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: 12,
            padding: 18,
            borderRadius: 16,
            background: "var(--sch-card)",
            border: "1px solid var(--sch-border)",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: MUTED, marginBottom: 8, gap: 10, flexWrap: "wrap" }}>
            <span>
              <strong style={{ color: "#C084FC" }}>Day {day}</strong>
              {" · "}
              <strong style={{ color: TEXT }}>{learned}</strong> / {FLUENCY_WORDS.toLocaleString()} words to fluency
            </span>
            <span style={{ fontWeight: 800, color: TEXT }}>{fluencyPct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "var(--sch-hairline)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(fluencyPct, 1)}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", background: IRIDESCENT }}
            />
          </div>
        </motion.div>
      </Link>

      {/* Practice — secondary */}
      {deck.words.length >= 4 && (
        <>
          <div
            style={{
              marginTop: 28,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: DIM,
            }}
          >
            Practice
          </div>
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: 12,
            }}
          >
            <GameCard icon="⚡" title="Match" subtitle="Pair words & meanings" onClick={onPlayGame} />
            <GameCard icon="🎧" title="Listen & Type" subtitle="Hear it, spell it" pro={!isPro} onClick={onPlayType} />
            <GameCard icon="🎙️" title="Speak" subtitle="Say it out loud" pro={!isPro} onClick={onPlaySpeak} />
          </div>
        </>
      )}

      {/* Footer — quiet utilities */}
      <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/learn/progress" style={{ ...ghostBtn, textDecoration: "none" }}>
          📊 View progress
        </Link>
        <button type="button" onClick={onReset} style={{ ...ghostBtn, color: "rgba(255,107,94,0.8)" }}>
          Change language
        </button>
      </div>
    </motion.div>
  )
}

function GameCard({
  icon,
  title,
  subtitle,
  onClick,
  pro,
}: {
  icon: string
  title: string
  subtitle: string
  onClick: () => void
  pro?: boolean
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        padding: 18,
        borderRadius: 18,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      {pro && <span style={proChip}>PRO</span>}
      <div style={{ fontSize: 26 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginTop: 8 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>{subtitle}</div>
    </motion.button>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "16px 18px", borderRadius: 16, background: "var(--sch-card)", border: "1px solid var(--sch-border)" }}>
      <div style={{ fontSize: 22, fontWeight: 800, ...iriText }}>{value}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>{label}</div>
    </div>
  )
}

/* ── Setup — one tap to your first word ──────────────────────── */

function Setup({ onStart }: { onStart: (deck: VocabDeck) => void }) {
  const { toast } = useToast()
  const { t, lang } = useLanguage()
  const [building, setBuilding] = useState<string | null>(null) // label being built
  const [byoTarget, setByoTarget] = useState<{ code: string; label: string; native: string } | null>(null)
  const [byoMode, setByoMode] = useState(false)
  const [customTarget, setCustomTarget] = useState("")

  // Optional fine-tune (smart defaults so the common path is a single tap).
  const [showTune, setShowTune] = useState(false)
  const [goal, setGoal] = useState<string>("career")
  const [daily, setDaily] = useState<number>(10)
  const [level, setLevel] = useState<string>("A2")
  const [deadlineDays, setDeadlineDays] = useState<number>(0)

  /** Native language for explanations — auto from the app locale. */
  const nativeFor = useCallback(
    (target: string): string => {
      let n = lang === "ru" ? "ru" : "en"
      if (target === n) n = n === "en" ? "ru" : "en"
      return n
    },
    [lang],
  )

  const buildAndStart = useCallback(
    async (code: string, label: string) => {
      const native = nativeFor(code)
      const goalLabel = showTune ? GOALS.find((g) => g.id === goal)?.label : undefined
      const deadline = deadlineDays > 0 ? addDays(new Date(), deadlineDays).toISOString() : null
      setBuilding(label)
      try {
        const words = await generateVocab({
          target: code,
          targetLabel: label,
          native,
          nativeLabel: languageLabel(native),
          goal: goalLabel,
          level,
          count: 24,
        })
        const deck = createDeck({
          targetLanguage: code,
          targetLanguageLabel: label,
          nativeLanguage: native,
          goal: goalLabel,
          deadline,
          level,
          dailyNewWords: daily,
          words,
        })
        onStart(deck)
      } catch {
        toast.error("Couldn't build your plan. Try again.")
        setBuilding(null)
      }
    },
    [nativeFor, showTune, goal, deadlineDays, level, daily, onStart, toast],
  )

  /** Tapping a language: either build instantly, or open BYO for that language. */
  const pickLanguage = useCallback(
    (code: string, label: string) => {
      if (byoMode) {
        setByoTarget({ code, label, native: nativeFor(code) })
      } else {
        void buildAndStart(code, label)
      }
    },
    [byoMode, nativeFor, buildAndStart],
  )

  const customCode = customTarget.trim().toLowerCase().slice(0, 24)
  const customLabel = customTarget.trim().slice(0, 24)

  /* ── Building state — the anticipation moment ── */
  if (building) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: "center", paddingTop: 80 }}
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          <LaraAvatar size={72} />
        </motion.div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginTop: 24, letterSpacing: "-0.4px" }}>
          Building your {building} plan…
        </h2>
        <p style={{ fontSize: 14, color: MUTED, marginTop: 8 }}>
          Picking the words that matter most for you.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
              style={{ width: 9, height: 9, borderRadius: 999, background: "#A78BFA" }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  /* ── BYO from text (chosen language) ── */
  if (byoTarget) {
    const deadline = deadlineDays > 0 ? addDays(new Date(), deadlineDays).toISOString() : null
    return (
      <BringYourOwnContent
        targetLanguage={byoTarget.code}
        targetLabel={byoTarget.label}
        nativeLanguage={byoTarget.native}
        defaultLevel={level}
        onAdded={(words) => {
          const goalLabel = showTune ? GOALS.find((g) => g.id === goal)?.label : undefined
          const deck = createDeck({
            targetLanguage: byoTarget.code,
            targetLanguageLabel: byoTarget.label,
            nativeLanguage: byoTarget.native,
            goal: goalLabel,
            deadline,
            level,
            dailyNewWords: daily,
            words,
          })
          onStart(deck)
        }}
        onClose={() => setByoTarget(null)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <LaraAvatar size={60} />
        </motion.div>
      </div>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: TEXT,
          textAlign: "center",
          marginTop: 18,
          letterSpacing: "-0.6px",
          lineHeight: 1.2,
        }}
      >
        {t("Learn the words you'll actually use")}
      </h1>
      <p style={{ fontSize: 14.5, color: MUTED, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
        {byoMode
          ? t("Pick the language of your text — then paste it in.")
          : t("Pick a language and I'll have you learning in seconds.")}
      </p>

      {/* Language tiles — the single primary action */}
      <div
        style={{
          marginTop: 26,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
          gap: 12,
        }}
      >
        {TARGET_LANGUAGES.map((l, i) => (
          <motion.button
            key={l.code}
            type="button"
            onClick={() => pickLanguage(l.code, l.label)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 * i, duration: 0.35 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 16px",
              borderRadius: 18,
              cursor: "pointer",
              background: "var(--sch-card)",
              border: "1px solid var(--sch-border)",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 30 }}>{l.flag}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{l.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Custom language */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <input
          value={customTarget}
          onChange={(e) => setCustomTarget(e.target.value)}
          placeholder={t("Or type another language…")}
          onKeyDown={(e) => {
            if (e.key === "Enter" && customCode) pickLanguage(customCode, customLabel)
          }}
          style={{ ...langInput, marginTop: 0, flex: 1 }}
        />
        {customCode && (
          <motion.button
            type="button"
            onClick={() => pickLanguage(customCode, customLabel)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ ...primaryBtnSmall, height: 44, padding: "0 18px" }}
          >
            {byoMode ? t("Use this") : t("Start")} →
          </motion.button>
        )}
      </div>

      {/* The wedge toggle — learn from your own text */}
      <button
        type="button"
        onClick={() => setByoMode((v) => !v)}
        style={{
          width: "100%",
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
          padding: 16,
          borderRadius: 16,
          cursor: "pointer",
          background: byoMode ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0.05)",
          border: `1px solid ${byoMode ? "rgba(139,92,246,0.55)" : "rgba(139,92,246,0.3)"}`,
        }}
      >
        <span style={{ fontSize: 22 }}>📄</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: TEXT }}>
            {t("Learn from your own text")}
          </span>
          <span style={{ display: "block", fontSize: 12, color: MUTED, marginTop: 2 }}>
            {byoMode ? t("On — now pick the language above.") : t("A job post, an email, lyrics — your words.")}
          </span>
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: byoMode ? "#C084FC" : MUTED }}>
          {byoMode ? "✓" : t("Switch")}
        </span>
      </button>

      {/* Fine-tune — optional, collapsed by default */}
      <button
        type="button"
        onClick={() => setShowTune((v) => !v)}
        style={{
          marginTop: 18,
          background: "transparent",
          border: "none",
          color: DIM,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginInline: "auto",
        }}
      >
        ⚙ {t("Fine-tune level & goal")} {showTune ? "▲" : "▼"}
      </button>

      <AnimatePresence initial={false}>
        {showTune && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <SectionLabel>{t("My level")}</SectionLabel>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {LEVELS.map((lv) => (
                <Choice key={lv} active={level === lv} onClick={() => setLevel(lv)} compact>
                  {lv}
                </Choice>
              ))}
            </div>

            <SectionLabel>{t("My focus")}</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
              {GOALS.map((g) => (
                <Choice key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)}>
                  <span style={{ fontSize: 18 }}>{g.icon}</span> {g.label}
                </Choice>
              ))}
            </div>

            <SectionLabel>{t("New words per day")}</SectionLabel>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {DAILY_OPTIONS.map((n) => (
                <Choice key={n} active={daily === n} onClick={() => setDaily(n)} compact>
                  {n}
                </Choice>
              ))}
              <input
                type="number"
                min={1}
                max={50}
                value={daily}
                onChange={(e) => setDaily(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                aria-label="Custom words per day"
                style={{ ...langInput, width: 90, marginTop: 0, textAlign: "center" }}
              />
            </div>

            <SectionLabel>{t("My deadline")}</SectionLabel>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {DEADLINE_OPTIONS.map((d) => (
                <Choice key={d.days} active={deadlineDays === d.days} onClick={() => setDeadlineDays(d.days)} compact>
                  {d.label}
                </Choice>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: DIM,
        margin: "26px 0 12px",
      }}
    >
      {children}
    </div>
  )
}

function Choice({
  active,
  onClick,
  children,
  compact,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: compact ? "12px 22px" : "14px 16px",
        borderRadius: 14,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        color: active ? TEXT : MUTED,
        background: active ? "rgba(139,92,246,0.12)" : "var(--sch-card)",
        border: `1px solid ${active ? "rgba(139,92,246,0.5)" : "var(--sch-border)"}`,
        boxShadow: active ? "0 0 20px rgba(139,92,246,0.15)" : "none",
      }}
    >
      {children}
    </motion.button>
  )
}

/* ── Shared styles ───────────────────────────────────────────── */

const primaryBtn: CSSProperties = {
  width: "100%",
  height: 54,
  marginTop: 22,
  borderRadius: 14,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(139,92,246,0.3)",
}
const ghostBtn: CSSProperties = {
  padding: "10px 18px",
  borderRadius: 12,
  border: "1px solid var(--sch-border)",
  background: "transparent",
  color: MUTED,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
}
const primaryBtnSmall: CSSProperties = {
  padding: "9px 16px",
  borderRadius: 12,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  flexShrink: 0,
}
const langInput: CSSProperties = {
  width: "100%",
  height: 44,
  marginTop: 10,
  padding: "0 14px",
  borderRadius: 12,
  fontSize: 14,
  color: "var(--sch-text)",
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  outline: "none",
}
const proChip: CSSProperties = {
  position: "absolute",
  top: 12,
  right: 12,
  fontSize: 10,
  fontWeight: 800,
  padding: "2px 8px",
  borderRadius: 8,
  background: "rgba(139,92,246,0.18)",
  color: "#C084FC",
  letterSpacing: "0.04em",
}
