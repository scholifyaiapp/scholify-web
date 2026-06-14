import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { addDays } from "date-fns"
import { motion, AnimatePresence } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import LaraOrb from "@/components/LaraOrb"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/i18n/LanguageProvider"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import VocabSession from "@/components/VocabSession"
import VocabMatchGame from "@/components/VocabMatchGame"
import VocabTypeGame from "@/components/VocabTypeGame"
import VocabSpeakGame from "@/components/VocabSpeakGame"
import VocabReels from "@/components/VocabReels"
import VocabGuessGame from "@/components/VocabGuessGame"
import BringYourOwnContent from "@/components/BringYourOwnContent"
import VocabOnboarding from "@/components/VocabOnboarding"
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
  introducedToday,
  setDailyGoal,
  type VocabDeck,
  type NewWordInput,
  type VocabWord,
} from "@/lib/vocab"
import { languageLabel, languageFlag } from "@/lib/vocab-content"
import { generateVocab } from "@/lib/vocab-api"
import { FLUENCY_WORDS, wordsLearned, fluencyPercent, dayNumber } from "@/lib/fluency"
import { maybeSyncReminder } from "@/lib/reminders"

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

const DAILY_OPTIONS = [5, 10, 15]

export default function Learn() {
  const { toast } = useToast()
  const { user } = useAuth()
  const { lang } = useLanguage()
  const firstName = (user?.user_metadata?.first_name as string) || ""
  const [deck, setDeck] = useState<VocabDeck | null>(() => readDeck())
  const [inSession, setInSession] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [inTypeGame, setInTypeGame] = useState(false)
  const [inSpeakGame, setInSpeakGame] = useState(false)
  const [inReels, setInReels] = useState(false)
  const [inGuess, setInGuess] = useState(false)
  const [inByo, setInByo] = useState(false)
  const [drillWords, setDrillWords] = useState<VocabWord[] | null>(null)
  const [tick, setTick] = useState(0) // refresh stats after a session
  const isPro = Boolean(user?.user_metadata?.plan && user.user_metadata.plan !== "free")
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()

  const refresh = useCallback(() => {
    setDeck(readDeck())
    setTick((t) => t + 1)
    // Keep the reminder service's "last studied" date fresh (no-op if opted out).
    maybeSyncReminder()
  }, [])

  /*
   * Start today's session, topping up the new-word stock first so the chosen
   * daily pace (5/10/15/custom) is always deliverable — the deck never stalls
   * at "0 new words" while the user still has quota left today.
   */
  const [preparing, setPreparing] = useState(false)
  const preparingRef = useRef(false)
  const startSession = useCallback(async () => {
    if (preparingRef.current) return
    preparingRef.current = true
    try {
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
            // Re-read: the deck may have changed while the API call was in flight.
            const latest = readDeck()
            addWordsToDeck(latest ?? current, more)
            setDeck(readDeck())
          }
        } catch {
          /* offline / API down — start with whatever stock we have */
        }
        setPreparing(false)
        // Be honest: if the top-up failed and there's quota but no stock, say so.
        const after = readDeck()
        if (
          after &&
          remainingNewQuota(after) > 0 &&
          after.words.filter((w) => w.status === "new").length === 0
        ) {
          toast.info("Couldn't fetch new words — reviews only this session.")
        }
      }
      setInSession(true)
    } finally {
      preparingRef.current = false
    }
  }, [toast])

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

  if (inReels && deck) {
    return (
      <VocabReels
        deck={deck}
        onClose={() => {
          setInReels(false)
          refresh()
        }}
      />
    )
  }

  if (inGuess && deck) {
    return (
      <VocabGuessGame
        deck={deck}
        onClose={() => {
          setInGuess(false)
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
          if (remainingNewQuota(readDeck()!) > 0) {
            toast.success(`${words.length} words added! They're in today's session.`)
          } else {
            toast.success(`${words.length} words added — they'll start tomorrow (today's goal is done).`)
          }
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
      <div style={{ maxWidth: deck ? 1080 : 600, margin: "0 auto" }}>
        {deck ? (
          <DeckHome
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
            onPlayReels={() => setInReels(true)}
            onPlayGuess={() => setInGuess(true)}
            onExtract={() => setInByo(true)}
            onDrill={(words) => {
              markWeeklyReportSeen()
              setDrillWords(words)
              setInSession(true)
            }}
            onAddWords={async () => {
              try {
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
              } catch {
                toast.error("Couldn't fetch new words. Try again.")
              }
            }}
            onReset={() => {
              clearDeck()
              refresh()
            }}
          />
        ) : (
          <VocabOnboarding
            appLang={lang}
            onComplete={(d) => {
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
  onPlayReels,
  onPlayGuess,
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
  onPlayReels: () => void
  onPlayGuess: () => void
  onExtract: () => void
  onDrill: (words: VocabWord[]) => void
  onAddWords: () => Promise<void>
  onReset: () => void
}) {
  const { t } = useLanguage()
  const stats = useMemo(() => getDeckStats(deck), [deck])
  const session = useMemo(() => getTodaySession(deck), [deck])
  // Re-read whenever the deck object changes (refresh() produces a new one).
  const progress = useMemo(() => readVocabProgress(), [deck])
  const coaching = useMemo(() => coachOnHome(name, deck), [name, deck])
  const daysLeft = daysUntilDeadline(deck)
  const [reportOpen, setReportOpen] = useState(() => isWeeklyReportDue(progress))
  const report = useMemo(() => getWeeklyReport(name, deck, progress), [name, deck, progress])
  const [adding, setAdding] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const resetTimerRef = useRef<number | null>(null)
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
      style={{ display: "flex", gap: 22, alignItems: "flex-start", flexWrap: "wrap" }}
    >
      {/* Main column */}
      <div style={{ flex: "999 1 440px", minWidth: 0 }}>
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
          <LaraOrb size={64} />
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
                try {
                  await onAddWords()
                } finally {
                  setAdding(false)
                }
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

      {/* Swipe to learn — reels-style browsing of your words */}
      {deck.words.length >= 1 && (
        <motion.button
          type="button"
          onClick={onPlayReels}
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
            background: "var(--sch-card)",
            border: "1px solid var(--sch-border)",
            boxShadow: "0 1px 2px rgba(59,47,68,0.04)",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "linear-gradient(135deg,#EDE4FB,#E4F2FB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            ▶️
          </div>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: TEXT }}>Swipe to learn</span>
            <span style={{ display: "block", fontSize: 12.5, color: MUTED, marginTop: 2 }}>
              Flick through your words like reels — meaning, example, audio.
            </span>
          </span>
          <span style={{ fontSize: 18, color: "#7C3AED" }}>→</span>
        </motion.button>
      )}

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
            <GameCard icon="🧠" title="Guess" subtitle="Beat the clock" onClick={onPlayGuess} />
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
        <button
          type="button"
          onClick={() => {
            if (confirmReset) {
              if (resetTimerRef.current != null) window.clearTimeout(resetTimerRef.current)
              onReset()
            } else {
              setConfirmReset(true)
              // Auto-reset the armed state — a stray tap shouldn't stay loaded.
              resetTimerRef.current = window.setTimeout(() => setConfirmReset(false), 3000)
            }
          }}
          style={{
            ...ghostBtn,
            color: confirmReset ? "#FF6B5E" : "rgba(255,107,94,0.8)",
            border: confirmReset ? "1px solid rgba(255,107,94,0.5)" : ghostBtn.border,
            fontWeight: confirmReset ? 700 : 600,
          }}
        >
          {confirmReset ? "Delete deck & progress? Tap to confirm" : "Change language"}
        </button>
      </div>
      </div>

      {/* Right rail — progress rings + this week */}
      <RightRail deck={deck} streak={progress.streak} fluencyPct={fluencyPct} learned={learned} />
    </motion.div>
  )
}

/* ── Right rail (rings + this week) ──────────────────────────── */

function Ring({ pct, from, to, label, sub }: { pct: number; from: string; to: string; label: string; sub: string }) {
  const id = `ring-${label.replace(/\s/g, "")}`
  const r = 27
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.max(0, Math.min(100, pct)) / 100)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0 }}>
        <svg width={68} height={68} viewBox="0 0 68 68">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={from} />
              <stop offset="1" stopColor={to} />
            </linearGradient>
          </defs>
          <circle cx="34" cy="34" r={r} fill="none" stroke="var(--sch-hairline)" strokeWidth="7" />
          <motion.circle
            cx="34"
            cy="34"
            r={r}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            transform="rotate(-90 34 34)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            color: TEXT,
          }}
        >
          {Math.round(pct)}%
        </div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{label}</div>
        <div style={{ fontSize: 12, color: MUTED, fontWeight: 600, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  )
}

function RightRail({
  deck,
  streak,
  fluencyPct,
  learned,
}: {
  deck: VocabDeck
  streak: number
  fluencyPct: number
  learned: number
}) {
  const introduced = introducedToday(deck)
  const goalPct = deck.dailyNewWords > 0 ? Math.min(100, Math.round((introduced / deck.dailyNewWords) * 100)) : 0

  // Recall accuracy ≈ successful reps over all graded recalls (reps + lapses).
  let reps = 0
  let lapses = 0
  for (const w of deck.words) {
    reps += w.reps
    lapses += w.lapses
  }
  const recallPct = reps + lapses > 0 ? Math.round((reps / (reps + lapses)) * 100) : 0

  const newQueued = deck.words.filter((w) => w.status === "new").length
  const nextMilestone = [7, 14, 21, 30, 60, 100, 180, 365].find((m) => m > streak) ?? streak + 30
  const toGo = nextMilestone - streak

  const divider = <div style={{ height: 1, background: "var(--sch-hairline)" }} />

  return (
    <div style={{ flex: "1 1 280px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          borderRadius: 20,
          padding: "18px 20px",
          boxShadow: "0 1px 2px rgba(59,47,68,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <Ring
          pct={goalPct}
          from="#F472B6"
          to="#8B5CF6"
          label="Daily goal"
          sub={`${introduced} of ${deck.dailyNewWords} words today`}
        />
        {divider}
        <Ring
          pct={recallPct}
          from="#8B5CF6"
          to="#38BDF8"
          label="Recall accuracy"
          sub={reps + lapses > 0 ? "all reviews so far" : "no reviews yet"}
        />
        {divider}
        <Ring
          pct={fluencyPct}
          from="#FBBF24"
          to="#FB923C"
          label="Fluency"
          sub={`${learned.toLocaleString()} / ${FLUENCY_WORDS.toLocaleString()} words`}
        />
        <Link
          to="/learn/progress"
          style={{
            marginTop: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            width: "100%",
            background: "var(--sch-card-2)",
            border: "1px solid var(--sch-border)",
            borderRadius: 12,
            padding: 11,
            fontSize: 13.5,
            fontWeight: 700,
            color: "var(--sch-tx-1)",
            textDecoration: "none",
          }}
        >
          See full progress <span style={{ color: "#7C3AED" }}>→</span>
        </Link>
      </div>

      <div
        style={{
          background: "var(--sch-card)",
          border: "1px solid var(--sch-border)",
          borderRadius: 20,
          padding: "18px 20px",
          boxShadow: "0 1px 2px rgba(59,47,68,0.04)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: DIM,
            marginBottom: 12,
          }}
        >
          This week
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <RailItem icon="🎯" tint="rgba(139,92,246,0.1)" title={`Hit a ${nextMilestone}-day streak`} sub={`${toGo} day${toGo === 1 ? "" : "s"} to go`} />
          <RailItem icon="📚" tint="rgba(56,189,248,0.12)" title="Words queued" sub={`${newQueued} ready to learn`} />
        </div>
      </div>
    </div>
  )
}

function RailItem({ icon, tint, title, sub }: { icon: string; tint: string; title: string; sub: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: tint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT }}>{title}</div>
        <div style={{ fontSize: 11.5, color: MUTED, fontWeight: 600 }}>{sub}</div>
      </div>
    </div>
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
  fontSize: 16, // ≥16px prevents iOS Safari from zooming the page on focus
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
