import { useMemo, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { format, subDays } from "date-fns"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { readDeck, getDeckStats, readVocabProgress } from "@/lib/vocab"
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

        {/* CTA */}
        <Link to="/learn" style={{ ...linkBtn, display: "block", textAlign: "center", marginTop: 24 }}>
          Back to today's session →
        </Link>
      </motion.div>
    </DashboardLayout>
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
