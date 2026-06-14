import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { format, subDays } from "date-fns"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useAuth } from "@/lib/auth"
import {
  fetchLeaderboard,
  leaderboardName,
  setLeaderboardName,
  type LeaderboardResult,
} from "@/lib/leaderboard"
import { readDeck, getDeckStats, readVocabProgress, type VocabDeck } from "@/lib/vocab"
import { languageFlag } from "@/lib/vocab-content"
import {
  FLUENCY_WORDS,
  wordsLearned,
  fluencyPercent,
  dayNumber,
  growthMultiple,
  projectedFluencyDate,
  compoundCurvePoints,
} from "@/lib/fluency"
import {
  wordsPerDay,
  recallAccuracy,
  intervalBuckets,
  hardestWords,
  getRecommendations,
} from "@/lib/vocab-analytics"

/* /learn/progress — motivation: streak, activity heatmap, mastery, totals. */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const HEATMAP_DAYS = 35

const MASTERY = [
  { key: "newCount", label: "New", color: "#818CF8" },
  { key: "learning", label: "Learning", color: "#FBBF24" },
  { key: "review", label: "Reviewing", color: "#38BDF8" },
  { key: "mastered", label: "Mastered", color: "#34D399" },
] as const

export default function LearnProgress() {
  const deck = useMemo(() => readDeck(), [])
  const progress = useMemo(() => readVocabProgress(), [])
  const stats = useMemo(() => (deck ? getDeckStats(deck) : null), [deck])

  const heatmap = useMemo(() => {
    const done = new Set(progress.history)
    const cells: { date: string; active: boolean }[] = []
    for (let i = HEATMAP_DAYS - 1; i >= 0; i--) {
      const d = format(subDays(new Date(), i), "yyyy-MM-dd")
      cells.push({ date: d, active: done.has(d) })
    }
    return cells
  }, [progress.history])

  const totalHours = ((progress.wordsReviewed * 0.5) / 60).toFixed(1) // ~30s/word estimate

  if (!deck || !stats) {
    return (
      <DashboardLayout>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 52 }}>📊</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginTop: 12 }}>No progress yet</h1>
          <p style={{ fontSize: 14, color: DIM, marginTop: 8 }}>
            Start learning a language to see your progress come to life.
          </p>
          <Link to="/learn" style={{ ...linkBtn, display: "inline-block", marginTop: 20 }}>
            Go to Learn →
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 760, margin: "0 auto" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/learn" aria-label="Back" style={backBtn}>
            ←
          </Link>
          <span style={{ fontSize: 30 }}>{languageFlag(deck.targetLanguage)}</span>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: "-0.4px" }}>
              {deck.targetLanguageLabel} progress
            </h1>
            <div style={{ fontSize: 13, color: MUTED }}>Every day compounds.</div>
          </div>
        </div>

        {/* The 1% compound curve — the brand promise, made visible */}
        <CompoundCard deck={deck} />

        {/* Streak row */}
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
          <BigStat icon="🔥" value={`${progress.streak}`} label="Day streak" />
          <BigStat icon="⚡" value={`${progress.totalXp}`} label="XP earned" />
          <BigStat icon="🏆" value={`${progress.longestStreak}`} label="Longest streak" />
          <BigStat icon="✅" value={`${progress.sessionsCompleted}`} label="Sessions" />
          <BigStat icon="⏱" value={`${totalHours}h`} label="Time invested" />
        </div>

        {/* Heatmap */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={sectionTitle}>Last 5 weeks</h2>
            <span style={{ fontSize: 13, color: MUTED }}>
              {progress.history.length} active day{progress.history.length === 1 ? "" : "s"}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 7, marginTop: 16 }}>
            {heatmap.map((c, i) => (
              <motion.div
                key={c.date}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.008, duration: 0.2 }}
                title={c.date}
                style={{
                  aspectRatio: "1",
                  borderRadius: 7,
                  background: c.active ? IRIDESCENT : "var(--sch-card-2)",
                  border: c.active ? "1px solid transparent" : "1px solid var(--sch-border)",
                  boxShadow: c.active ? "0 2px 8px rgba(139,92,246,0.3)" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mastery breakdown */}
        <div style={card}>
          <h2 style={sectionTitle}>Word mastery</h2>
          <div
            style={{
              display: "flex",
              height: 14,
              borderRadius: 7,
              overflow: "hidden",
              marginTop: 16,
              background: "var(--sch-hairline)",
            }}
          >
            {MASTERY.map((m) => {
              const v = stats[m.key]
              const pct = stats.total > 0 ? (v / stats.total) * 100 : 0
              if (pct <= 0) return null
              return (
                <motion.div
                  key={m.key}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: m.color }}
                  title={`${m.label}: ${v}`}
                />
              )
            })}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
            {MASTERY.map((m) => (
              <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 11, height: 11, borderRadius: 3, background: m.color }} />
                <span style={{ fontSize: 12.5, color: MUTED }}>
                  {m.label} · <strong style={{ color: TEXT }}>{stats[m.key]}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lara recommendations */}
        <Recommendations deck={deck} progress={progress} dueToday={stats.dueToday} />

        {/* Weekly leaderboard */}
        <Leaderboard />

        {/* Words learned per day */}
        <WordsPerDayChart deck={deck} />

        {/* Recall + retention */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginTop: 20 }}>
          <RecallCard deck={deck} />
          <RetentionCard deck={deck} />
        </div>

        {/* Hardest words */}
        <HardestWords deck={deck} />

        {/* CTA */}
        <Link to="/learn" style={{ ...linkBtn, display: "block", textAlign: "center", marginTop: 24 }}>
          Back to today's session →
        </Link>
      </motion.div>
    </DashboardLayout>
  )
}

/* ── Analytics sections ──────────────────────────────────────── */

function Recommendations({
  deck,
  progress,
  dueToday,
}: {
  deck: VocabDeck
  progress: ReturnType<typeof readVocabProgress>
  dueToday: number
}) {
  const recs = useMemo(() => getRecommendations(deck, progress, dueToday, 3), [deck, progress, dueToday])
  if (recs.length === 0) return null
  return (
    <div style={{ ...card, border: "1px solid rgba(139,92,246,0.25)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "radial-gradient(circle at 32% 28%,#fff,#C084FC 40%,#7C3AED 92%)",
            boxShadow: "0 3px 12px rgba(124,58,237,0.35)",
            flexShrink: 0,
          }}
        />
        <h2 style={sectionTitle}>Lara recommends</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {recs.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--sch-card-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                flexShrink: 0,
              }}
            >
              {r.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2, lineHeight: 1.5 }}>{r.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function WordsPerDayChart({ deck }: { deck: VocabDeck }) {
  const data = useMemo(() => wordsPerDay(deck, 14), [deck])
  const max = Math.max(1, ...data.map((d) => d.count))
  const total = data.reduce((s, d) => s + d.count, 0)
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 style={sectionTitle}>Words learned</h2>
        <span style={{ fontSize: 13, color: MUTED }}>{total} in 14 days</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginTop: 18 }}>
        {data.map((d) => (
          <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.count / max) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                title={`${d.count} on ${d.date}`}
                style={{
                  width: "100%",
                  minHeight: d.count > 0 ? 4 : 0,
                  borderRadius: 6,
                  background: d.count > 0 ? IRIDESCENT : "transparent",
                }}
              />
            </div>
            <span style={{ fontSize: 9.5, color: DIM, fontWeight: 600 }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecallCard({ deck }: { deck: VocabDeck }) {
  const acc = useMemo(() => recallAccuracy(deck), [deck])
  return (
    <div style={card}>
      <h2 style={sectionTitle}>Recall accuracy</h2>
      {acc.totalRecalls > 0 ? (
        <>
          <div style={{ fontSize: 44, fontWeight: 900, ...iriText, marginTop: 10, lineHeight: 1 }}>{acc.pct}%</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>
            {acc.reps} remembered · {acc.lapses} forgotten across {acc.totalRecalls} reviews
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "var(--sch-hairline)", overflow: "hidden", marginTop: 14 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${acc.pct}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", background: IRIDESCENT }}
            />
          </div>
        </>
      ) : (
        <p style={{ fontSize: 13.5, color: DIM, marginTop: 10 }}>Review some words to see your recall rate.</p>
      )}
    </div>
  )
}

function RetentionCard({ deck }: { deck: VocabDeck }) {
  const buckets = useMemo(() => intervalBuckets(deck), [deck])
  const max = Math.max(1, ...buckets.map((b) => b.count))
  return (
    <div style={card}>
      <h2 style={sectionTitle}>Memory strength</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
        {buckets.map((b) => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 78, fontSize: 12, color: MUTED, fontWeight: 600, flexShrink: 0 }}>{b.label}</span>
            <div style={{ flex: 1, height: 10, borderRadius: 999, background: "var(--sch-hairline)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(b.count / max) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "100%", background: b.color, minWidth: b.count > 0 ? 6 : 0 }}
              />
            </div>
            <span style={{ width: 28, textAlign: "right", fontSize: 12.5, fontWeight: 700, color: TEXT }}>{b.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Leaderboard() {
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.first_name as string) || ""
  const [result, setResult] = useState<LeaderboardResult | null>(null)
  const [joined, setJoined] = useState(() => Boolean(leaderboardName()))
  const [name, setName] = useState(firstName || "")
  const [busy, setBusy] = useState(false)

  const load = () => {
    fetchLeaderboard().then(setResult)
  }
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined])

  const join = async () => {
    const n = (name.trim() || firstName || "Learner").slice(0, 24)
    setBusy(true)
    setLeaderboardName(n)
    setJoined(true)
    setBusy(false)
  }

  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h2 style={sectionTitle}>🏆 This week's leaderboard</h2>
        {result && !result.disabled && <span style={{ fontSize: 12.5, color: MUTED }}>resets Monday</span>}
      </div>

      {/* Not joined → opt-in */}
      {!joined ? (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.5, marginBottom: 12 }}>
            Compete on weekly XP with other learners. Pick a display name — you can change or leave anytime.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
              maxLength={24}
              style={{
                flex: 1,
                minWidth: 160,
                height: 46,
                padding: "0 14px",
                borderRadius: 12,
                fontSize: 16,
                color: "var(--sch-text)",
                background: "var(--sch-card-2)",
                border: "1px solid var(--sch-border)",
                outline: "none",
              }}
            />
            <button type="button" onClick={join} disabled={busy} style={{ ...linkBtn, border: "none", cursor: "pointer", opacity: busy ? 0.7 : 1 }}>
              Join →
            </button>
          </div>
        </div>
      ) : !result ? (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 44, borderRadius: 12, background: "var(--sch-card-2)" }} />
          ))}
        </div>
      ) : result.disabled ? (
        <p style={{ fontSize: 13.5, color: DIM, marginTop: 14, lineHeight: 1.5 }}>
          The leaderboard is warming up — finish a session to put yourself on the board, then check back here.
        </p>
      ) : result.entries.length === 0 ? (
        <p style={{ fontSize: 13.5, color: DIM, marginTop: 14 }}>Be the first — earn XP this week and claim the top spot.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 16 }}>
          {result.entries.map((e) => {
            const me = e.userId === result.meId
            const medal = e.rank === 1 ? "🥇" : e.rank === 2 ? "🥈" : e.rank === 3 ? "🥉" : null
            return (
              <div
                key={e.userId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: me ? "rgba(139,92,246,0.1)" : "var(--sch-card-2)",
                  border: me ? "1px solid rgba(139,92,246,0.4)" : "1px solid transparent",
                }}
              >
                <span style={{ width: 26, textAlign: "center", fontSize: medal ? 16 : 13, fontWeight: 800, color: MUTED, flexShrink: 0 }}>
                  {medal || e.rank}
                </span>
                <span style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 700, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {e.name} {me && <span style={{ fontSize: 11, color: "#7C3AED", fontWeight: 700 }}>· you</span>}
                </span>
                {e.streak > 0 && <span style={{ fontSize: 12, color: DIM, fontWeight: 600, flexShrink: 0 }}>🔥 {e.streak}</span>}
                <span style={{ fontSize: 14, fontWeight: 800, ...iriText, flexShrink: 0 }}>{e.weeklyXp} XP</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function HardestWords({ deck }: { deck: VocabDeck }) {
  const hard = useMemo(() => hardestWords(deck, 6), [deck])
  if (hard.length === 0) return null
  return (
    <div style={card}>
      <h2 style={sectionTitle}>Words to watch</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        {hard.map((w) => (
          <div
            key={w.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 12,
              background: "var(--sch-card-2)",
            }}
          >
            <span style={{ fontSize: 14.5, fontWeight: 700, color: TEXT, flex: 1, minWidth: 0 }}>{w.term}</span>
            <span style={{ fontSize: 13, color: MUTED }}>{w.translation}</span>
            {w.lapses > 0 && (
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FF6B5E", background: "rgba(255,107,94,0.12)", padding: "3px 9px", borderRadius: 999, flexShrink: 0 }}>
                forgotten ×{w.lapses}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function CompoundCard({ deck }: { deck: NonNullable<ReturnType<typeof readDeck>> }) {
  const day = dayNumber(deck)
  const mult = growthMultiple(day)
  const learned = wordsLearned(deck)
  const pct = fluencyPercent(deck)
  const eta = projectedFluencyDate(deck)

  // Curve geometry: 300×130 box, 10px side padding, baseline y=112, 96px of rise.
  const pts = useMemo(() => compoundCurvePoints(), [])
  const px = (p: { x: number; y: number }) => `${10 + p.x * 280},${112 - p.y * 96}`
  const path = `M ${pts.map(px).join(" L ")}`
  const youX = Math.min(day, 365) / 365
  const you = { x: youX, y: (growthMultiple(Math.min(day, 365)) - 1) / (growthMultiple(365) - 1) }
  const [youCx, youCy] = px(you).split(",").map(Number)

  return (
    <div style={{ ...card, marginTop: 22, border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 0 50px rgba(139,92,246,0.08)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h2 style={sectionTitle}>1% better, every day</h2>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#C084FC" }}>Day {day}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, ...iriText, marginTop: 8 }}>
        ×{mult < 10 ? mult.toFixed(2) : mult.toFixed(1)}
        <span style={{ fontSize: 14, fontWeight: 600, color: MUTED, marginLeft: 8 }}>the day-one you</span>
      </div>

      <svg viewBox="0 0 300 130" style={{ width: "100%", height: "auto", marginTop: 10, display: "block" }} aria-hidden>
        <line x1="10" y1="112" x2="290" y2="112" stroke="var(--sch-hairline)" strokeWidth="1" />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#sch-compound)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="sch-compound" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="60%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <motion.circle
          cx={youCx}
          cy={youCy}
          r="5"
          fill="#C084FC"
          stroke="var(--sch-card)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 15 }}
        />
        <text x="10" y="126" fontSize="9" fill="var(--sch-tx-3)">day 1</text>
        <text x="290" y="126" fontSize="9" fill="var(--sch-tx-3)" textAnchor="end">day 365</text>
        <text x="290" y="14" fontSize="9" fontWeight="700" fill="var(--sch-tx-3)" textAnchor="end">×37.8</text>
      </svg>

      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--sch-hairline)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: MUTED, marginBottom: 8 }}>
          <span>
            <strong style={{ color: TEXT }}>{learned}</strong> / {FLUENCY_WORDS.toLocaleString()} words to conversational fluency
          </span>
          <span style={{ fontWeight: 800, color: TEXT }}>{pct}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "var(--sch-hairline)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(pct, 1)}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "100%", background: IRIDESCENT }}
          />
        </div>
        {eta && (
          <div style={{ fontSize: 12.5, color: DIM, marginTop: 10 }}>
            At {deck.dailyNewWords} words/day, you're on pace for fluency by{" "}
            <strong style={{ color: "#C084FC" }}>{format(eta, "MMMM yyyy")}</strong>.
          </div>
        )}
      </div>
    </div>
  )
}

function BigStat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div style={{ padding: "18px 20px", borderRadius: 18, background: "var(--sch-card)", border: "1px solid var(--sch-border)" }}>
      <div style={{ fontSize: 18 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 900, ...iriText, marginTop: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{label}</div>
    </div>
  )
}

const card: CSSProperties = {
  marginTop: 20,
  padding: 24,
  borderRadius: 22,
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
}
const sectionTitle: CSSProperties = { fontSize: 16, fontWeight: 700, color: TEXT }
const backBtn: CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  border: "1px solid var(--sch-border)",
  background: "var(--sch-card)",
  color: MUTED,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  textDecoration: "none",
  flexShrink: 0,
}
const linkBtn: CSSProperties = {
  padding: "12px 24px",
  borderRadius: 12,
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
}
