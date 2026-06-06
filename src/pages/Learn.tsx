import { useCallback, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import VocabSession from "@/components/VocabSession"
import VocabMatchGame from "@/components/VocabMatchGame"
import VocabTypeGame from "@/components/VocabTypeGame"
import { coachOnHome } from "@/lib/lara-vocab"
import {
  createDeck,
  readDeck,
  writeDeck,
  clearDeck,
  addWordsToDeck,
  getDeckStats,
  getTodaySession,
  readVocabProgress,
  type VocabDeck,
} from "@/lib/vocab"
import {
  TARGET_LANGUAGES,
  NATIVE_LANGUAGES,
  languageLabel,
  languageFlag,
} from "@/lib/vocab-content"
import { generateVocab } from "@/lib/vocab-api"

/* ──────────────────────────────────────────────────────────────
 *  /learn — the home of the new Scholify (AI vocabulary coach).
 *  No deck → setup (pick languages) → generate words → daily session.
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
const DAILY_OPTIONS = [5, 8, 12, 20]

export default function Learn() {
  const { toast } = useToast()
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.first_name as string) || ""
  const [deck, setDeck] = useState<VocabDeck | null>(() => readDeck())
  const [inSession, setInSession] = useState(false)
  const [inGame, setInGame] = useState(false)
  const [inTypeGame, setInTypeGame] = useState(false)
  const [tick, setTick] = useState(0) // refresh stats after a session
  const isPro = Boolean(user?.user_metadata?.plan && user.user_metadata.plan !== "free")
  const { showPaywall, paywallType, triggerFeaturePaywall, closePaywall } = usePaywall()

  const refresh = useCallback(() => {
    setDeck(readDeck())
    setTick((t) => t + 1)
  }, [])

  if (inSession && deck) {
    return (
      <VocabSession
        deck={deck}
        userName={firstName}
        onClose={() => {
          setInSession(false)
          refresh()
        }}
        onFinished={() => {
          setInSession(false)
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

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {deck ? (
          <DeckHome
            key={tick}
            deck={deck}
            name={firstName}
            isPro={isPro}
            onStart={() => setInSession(true)}
            onPlayGame={() => setInGame(true)}
            onPlayType={() => (isPro ? setInTypeGame(true) : triggerFeaturePaywall())}
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
            onDone={(d) => {
              writeDeck(d)
              setDeck(d)
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
  onStart,
  onPlayGame,
  onPlayType,
  onAddWords,
  onReset,
}: {
  deck: VocabDeck
  name: string
  isPro: boolean
  onStart: () => void
  onPlayGame: () => void
  onPlayType: () => void
  onAddWords: () => Promise<void>
  onReset: () => void
}) {
  const stats = useMemo(() => getDeckStats(deck), [deck])
  const session = useMemo(() => getTodaySession(deck), [deck])
  const progress = useMemo(() => readVocabProgress(), [])
  const coaching = useMemo(() => coachOnHome(name, deck), [name, deck])
  const [adding, setAdding] = useState(false)

  const todayCount = session.newWords.length + session.dueWords.length
  const goalPct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 40 }}>{languageFlag(deck.targetLanguage)}</span>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: TEXT, letterSpacing: "-0.5px" }}>
            {deck.targetLanguageLabel}
          </h1>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>
            {deck.goal ? `${deck.goal} · ` : ""}
            {deck.dailyNewWords} new words/day
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 900, ...iriText }}>🔥 {progress.streak}</div>
          <div style={{ fontSize: 11, color: DIM }}>day streak</div>
        </div>
      </div>

      {/* Lara coaching */}
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

      {/* Today card */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{
          marginTop: 24,
          padding: 28,
          borderRadius: 24,
          background: "var(--sch-card)",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow: "0 0 60px rgba(139,92,246,0.08)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <LaraAvatar size={44} />
        </div>
        {todayCount > 0 ? (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>
              {todayCount} word{todayCount === 1 ? "" : "s"} ready for today
            </div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>
              {session.newWords.length} new · {session.dueWords.length} to review
            </div>
            <motion.button
              type="button"
              onClick={onStart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={primaryBtn}
            >
              Start today's session →
            </motion.button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>All caught up 🎉</div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>
              No words due right now. Add more to keep going.
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
              style={{ ...primaryBtn, opacity: adding ? 0.7 : 1 }}
            >
              {adding ? "Adding…" : "+ Add new words"}
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Stats */}
      <div
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
          gap: 12,
        }}
      >
        <Stat label="Due today" value={`${stats.dueToday}`} />
        <Stat label="Learning" value={`${stats.learning + stats.newCount}`} />
        <Stat label="Mastered" value={`${stats.mastered}`} />
        <Stat label="Total words" value={`${stats.total}`} />
      </div>

      {/* Mastery bar */}
      <div style={{ marginTop: 20, padding: 18, borderRadius: 16, background: "var(--sch-card)", border: "1px solid var(--sch-border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: MUTED, marginBottom: 8 }}>
          <span>Mastery</span>
          <span>{goalPct}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "var(--sch-hairline)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goalPct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%", background: IRIDESCENT }}
          />
        </div>
      </div>

      {/* Practice */}
      {deck.words.length >= 4 && (
        <>
          <div style={{ marginTop: 28, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: DIM }}>
            Practice
          </div>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <GameCard icon="⚡" title="Match" subtitle="Pair words & meanings" onClick={onPlayGame} />
            <GameCard icon="🎧" title="Listen & Type" subtitle="Hear it, spell it" pro={!isPro} onClick={onPlayType} />
          </div>
        </>
      )}

      {/* Pro upsell */}
      {!isPro && (
        <div
          style={{
            marginTop: 20,
            padding: 18,
            borderRadius: 18,
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.25)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 26 }}>✦</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>Unlock Scholify Pro</div>
            <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2, lineHeight: 1.5 }}>
              Listen &amp; Type, unlimited words, and premium pronunciation.
            </div>
          </div>
          <button type="button" onClick={onPlayType} style={primaryBtnSmall}>
            Go Pro
          </button>
        </div>
      )}

      {/* Footer actions */}
      <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/learn/progress" style={{ ...ghostBtn, textDecoration: "none" }}>
          📊 View progress
        </Link>
        {todayCount > 0 && (
          <button
            type="button"
            disabled={adding}
            onClick={async () => {
              setAdding(true)
              await onAddWords()
              setAdding(false)
            }}
            style={ghostBtn}
          >
            {adding ? "Adding…" : "+ Add more words"}
          </button>
        )}
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

/* ── Setup ───────────────────────────────────────────────────── */

function Setup({ onDone }: { onDone: (deck: VocabDeck) => void }) {
  const { toast } = useToast()
  const [target, setTarget] = useState<string>("en")
  const [native, setNative] = useState<string>("ru")
  const [goal, setGoal] = useState<string>("career")
  const [daily, setDaily] = useState<number>(8)
  const [building, setBuilding] = useState(false)

  const build = async () => {
    if (target === native) {
      toast.error("Pick two different languages.")
      return
    }
    setBuilding(true)
    try {
      const targetLabel = languageLabel(target)
      const goalLabel = GOALS.find((g) => g.id === goal)?.label
      const words = await generateVocab({
        target,
        targetLabel,
        native,
        nativeLabel: languageLabel(native),
        goal: goalLabel,
        count: 24,
      })
      const deck = createDeck({
        targetLanguage: target,
        targetLanguageLabel: targetLabel,
        nativeLanguage: native,
        goal: goalLabel,
        dailyNewWords: daily,
        words,
      })
      onDone(deck)
    } catch {
      toast.error("Couldn't build your deck. Try again.")
    } finally {
      setBuilding(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <LaraAvatar size={56} />
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: TEXT, textAlign: "center", marginTop: 16, letterSpacing: "-0.5px" }}>
        What do you want to learn?
      </h1>
      <p style={{ fontSize: 14, color: MUTED, textAlign: "center", marginTop: 8 }}>
        Lara builds a daily vocabulary plan and coaches you with spaced repetition.
      </p>

      {/* Target language */}
      <SectionLabel>I want to learn</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10 }}>
        {TARGET_LANGUAGES.map((l) => (
          <Choice key={l.code} active={target === l.code} onClick={() => setTarget(l.code)}>
            <span style={{ fontSize: 22 }}>{l.flag}</span> {l.label}
          </Choice>
        ))}
      </div>

      {/* Native language */}
      <SectionLabel>Explain it to me in</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10 }}>
        {NATIVE_LANGUAGES.map((l) => (
          <Choice key={l.code} active={native === l.code} onClick={() => setNative(l.code)}>
            <span style={{ fontSize: 22 }}>{l.flag}</span> {l.label}
          </Choice>
        ))}
      </div>

      {/* Goal */}
      <SectionLabel>My focus</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
        {GOALS.map((g) => (
          <Choice key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)}>
            <span style={{ fontSize: 18 }}>{g.icon}</span> {g.label}
          </Choice>
        ))}
      </div>

      {/* Daily words */}
      <SectionLabel>New words per day</SectionLabel>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {DAILY_OPTIONS.map((n) => (
          <Choice key={n} active={daily === n} onClick={() => setDaily(n)} compact>
            {n}
          </Choice>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={build}
        disabled={building}
        whileHover={building ? undefined : { scale: 1.02 }}
        whileTap={building ? undefined : { scale: 0.98 }}
        style={{ ...primaryBtn, marginTop: 32, opacity: building ? 0.75 : 1 }}
      >
        {building ? "Building your plan…" : "Build my plan ⚡"}
      </motion.button>
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: DIM, margin: "26px 0 12px" }}>
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
