import { useEffect, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  daysUntilWeekEnd,
  getUserState,
  readCurrentSummary,
  subscribeChallenges,
  type Challenge,
  type ChallengeDifficulty,
  type UserChallengeState,
} from "@/lib/challenges-storage"

/*
 * Two exports — both used by the Dashboard + Challenges page:
 *
 *   ChallengeWidget       — compact dashboard tile (3 mini-rows)
 *   WeeklyChallengeCard   — full card used on /challenges
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const DIFFICULTY_STYLE: Record<
  ChallengeDifficulty,
  { bg: string; color: string; label: string }
> = {
  easy: { bg: "rgba(52,211,153,0.1)", color: "#34D399", label: "Easy" },
  medium: { bg: "rgba(251,191,36,0.1)", color: "#FBBF24", label: "Medium" },
  hard: { bg: "rgba(239,68,68,0.1)", color: "#EF4444", label: "Hard" },
}

/* ── Compact dashboard widget ────────────────────────────────────────── */

export function ChallengeWidget() {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribeChallenges(() => setTick((t) => t + 1)), [])
  const summary = readCurrentSummary()
  void tick // re-read on tick

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: "var(--sch-card, rgba(255,255,255,0.03))",
        border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>
          ⚔️ This Week's Challenges
        </h2>
        <Link to="/challenges" style={{ fontSize: 12, color: TEXT_MUTED, textDecoration: "none" }}>
          View all →
        </Link>
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", marginTop: 8 }}>
        {summary.challenges.map((c, i) => {
          const state = summary.states[c.id]
          const progress = Math.min(state?.progress ?? 0, c.targetValue)
          const completed = !!state?.completed
          const last = i === summary.challenges.length - 1
          return (
            <li
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
                borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <MiniCheckbox completed={completed} />
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: 13,
                  color: completed ? TEXT_DIM : "rgba(240,238,255,0.78)",
                  textDecoration: completed ? "line-through" : "none",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={c.description}
              >
                {c.title}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: completed ? "#34D399" : TEXT_MUTED,
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: completed ? 600 : 500,
                }}
              >
                {progress}/{c.targetValue}
                {c.unit !== "days" && c.unit !== "sessions" && c.unit !== "correct" ? ` ${c.unit}` : ""}
              </span>
            </li>
          )
        })}
      </ul>

      <p style={{ marginTop: 10, fontSize: 11, color: TEXT_DIM }}>
        Week ends in {summary.daysLeft} day{summary.daysLeft === 1 ? "" : "s"}
      </p>
    </div>
  )
}

function MiniCheckbox({ completed }: { completed: boolean }) {
  return (
    <motion.span
      animate={completed ? { scale: [0.8, 1.3, 1] } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 360, damping: 18 }}
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        background: completed ? IRIDESCENT : "transparent",
        border: completed ? "none" : "1.5px solid rgba(255,255,255,0.1)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 800,
        boxShadow: completed ? "0 0 14px rgba(167,139,250,0.5)" : "none",
      }}
    >
      {completed ? "✓" : ""}
    </motion.span>
  )
}

/* ── Full card (used on /challenges) ─────────────────────────────────── */

export function WeeklyChallengeCard({ challenge }: { challenge: Challenge }) {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribeChallenges(() => setTick((t) => t + 1)), [])
  const state: UserChallengeState = getUserState(challenge)
  void tick

  const progress = Math.min(state.progress, challenge.targetValue)
  const pct = Math.round((progress / Math.max(1, challenge.targetValue)) * 100)
  const completed = state.completed
  const diff = DIFFICULTY_STYLE[challenge.difficulty]
  const daysLeft = daysUntilWeekEnd()

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        padding: 22,
        borderRadius: 20,
        background: "var(--sch-card, rgba(255,255,255,0.03))",
        border: completed
          ? "1px solid rgba(52,211,153,0.35)"
          : "1px solid var(--sch-border, rgba(255,255,255,0.06))",
        boxShadow: completed ? "0 0 30px rgba(52,211,153,0.12)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 10px",
            borderRadius: 999,
            background: diff.bg,
            color: diff.color,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {diff.label}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          +{challenge.xpReward} XP
        </span>
      </div>

      <h3 style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.3 }}>
        {challenge.title}
      </h3>
      <p
        style={{
          marginTop: 6,
          fontSize: 13,
          color: "rgba(240,238,255,0.55)",
          lineHeight: 1.6,
        }}
      >
        {challenge.description}
      </p>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 16,
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            boxShadow: completed ? "0 0 16px rgba(52,211,153,0.5)" : "none",
            position: "relative",
          }}
        >
          {!completed && pct > 0 && pct < 100 && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
              aria-hidden
            />
          )}
        </motion.div>
      </div>

      {/* Progress text */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, fontVariantNumeric: "tabular-nums" }}>
          {progress} / {challenge.targetValue} {challenge.unit}
        </span>
        <span style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
          {pct}% complete
        </span>
      </div>

      {/* Status */}
      <div style={{ marginTop: 14 }}>
        {completed ? (
          <p style={{ fontSize: 13, color: "#34D399", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
            ✓ Completed! <span style={{ color: TEXT_MUTED, fontWeight: 500 }}>+{state.xpEarned || challenge.xpReward} XP earned</span>
          </p>
        ) : (
          <p style={{ fontSize: 12, color: TEXT_MUTED }}>
            Keep going · {daysLeft} day{daysLeft === 1 ? "" : "s"} left
          </p>
        )}
      </div>
    </motion.div>
  )
}

/* ── Past-week mini summary card ─────────────────────────────────────── */

export function PastWeekCard({
  year,
  week,
  challenges,
  states,
  completed,
  total,
  xpEarned,
}: {
  year: number
  week: number
  challenges: Challenge[]
  states: Record<string, UserChallengeState>
  completed: number
  total: number
  xpEarned: number
}) {
  const accent = completed === total && total > 0 ? "#34D399" : completed > 0 ? "#FBBF24" : "rgba(255,255,255,0.35)"
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        background: "var(--sch-card, rgba(255,255,255,0.03))",
        border: `1px solid ${completed > 0 ? `${accent}44` : "var(--sch-border, rgba(255,255,255,0.06))"}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {year} · Week {week}
        </p>
        <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>
          {completed} / {total}
        </span>
      </div>
      <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {challenges.map((c) => {
          const done = !!states[c.id]?.completed
          return (
            <li key={c.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: done ? "#34D399" : TEXT_DIM, fontSize: 12, width: 14 }}>{done ? "✓" : "·"}</span>
              <span
                style={{
                  fontSize: 12.5,
                  color: done ? TEXT_PRIMARY : TEXT_MUTED,
                  textDecoration: done ? "none" : "none",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {c.title}
              </span>
              <span style={{ fontSize: 11, color: TEXT_DIM }}>+{c.xpReward}</span>
            </li>
          )
        })}
      </ul>
      <p style={{ marginTop: 10, fontSize: 11, color: completed === total && total > 0 ? "#34D399" : TEXT_DIM }}>
        {completed === 0
          ? "Better luck next week"
          : `Earned ${xpEarned} XP`}
      </p>
    </div>
  )
}

// Inline default export so users can import a single component if desired.
const Wrapper: React.FC<{ challenge: Challenge }> = ({ challenge }) => (
  <WeeklyChallengeCard challenge={challenge} />
)
export default Wrapper

/* Tiny shim style util only here to ensure CSSProperties is referenced
 * (some bundlers warn otherwise when the type is import-only). */
const _unused: CSSProperties = { display: "none" }
void _unused
