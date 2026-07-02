import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import XPBar from "@/components/XPBar"
import { WeeklyChallengeCard, PastWeekCard } from "@/components/WeeklyChallenge"
import {
  daysUntilWeekEnd,
  getCurrentChallenges,
  isoWeek,
  readPastWeeks,
  subscribeChallenges,
  totalCompletedAcrossWeeks,
} from "@/lib/challenges-storage"

/*
 * /challenges — full weekly-challenges surface.
 *  • Header + week indicator (orange when ≤ 2 days left)
 *  • XP / level bar (compact)
 *  • Three current challenge cards
 *  • Past challenges history (last 4 weeks)
 *  • Lifetime completion stat
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const cardStyle: CSSProperties = {
  borderRadius: 18,
  padding: 18,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

export default function Challenges() {
  const [tick, setTick] = useState(0)
  useEffect(() => subscribeChallenges(() => setTick((t) => t + 1)), [])

  const { year, week } = useMemo(isoWeek, [])
  const challenges = useMemo(() => getCurrentChallenges(), [tick])
  const past = useMemo(() => readPastWeeks(4), [tick])
  const lifetime = useMemo(() => totalCompletedAcrossWeeks(), [tick])
  const daysLeft = daysUntilWeekEnd()
  const resetSoon = daysLeft <= 2

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}
        >
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.2 }}>
              <span style={iriText}>⚔️ Weekly Challenges</span>
            </h1>
            <p style={{ marginTop: 4, fontSize: 14, color: TEXT_MUTED }}>
              New challenges every Monday.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 12,
                color: TEXT_PRIMARY,
                fontWeight: 600,
              }}
            >
              Week {week}, {year}
            </span>
            <span
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                background: resetSoon ? "rgba(251,146,60,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${resetSoon ? "rgba(251,146,60,0.25)" : "rgba(255,255,255,0.08)"}`,
                color: resetSoon ? "#FB923C" : TEXT_MUTED,
                fontSize: 12,
                fontWeight: resetSoon ? 700 : 500,
              }}
            >
              {daysLeft === 0
                ? "Resets today"
                : `Resets in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
            </span>
          </div>
        </motion.div>

        {/* XP bar */}
        <div style={{ marginTop: 18, maxWidth: 360 }}>
          <XPBar variant="compact" />
        </div>

        {/* Current challenge grid */}
        <div
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {challenges.map((c) => (
            <WeeklyChallengeCard key={c.id} challenge={c} />
          ))}
        </div>

        {/* Lifetime stat */}
        <div style={{ marginTop: 28 }}>
          <div
            style={{
              ...cardStyle,
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: IRIDESCENT,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 22,
                flexShrink: 0,
              }}
              aria-hidden
            >
              ⚡
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13.5, color: TEXT_MUTED }}>You've completed</p>
              <p style={{ marginTop: 2, fontSize: 20, fontWeight: 800, color: TEXT_PRIMARY }}>
                {lifetime.completed} / {lifetime.total} challenges
              </p>
            </div>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(200,0,0,0.06)",
                color: "#D92E10",
                fontWeight: 700,
                fontSize: 12.5,
              }}
            >
              {lifetime.total > 0 ? Math.round((lifetime.completed / lifetime.total) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Past challenges */}
        <section style={{ marginTop: 30 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>Past challenges</h2>
          <p style={{ marginTop: 2, fontSize: 12.5, color: TEXT_MUTED }}>Last four weeks.</p>
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {past.map((w) => (
              <PastWeekCard
                key={`${w.year}-${w.week}`}
                year={w.year}
                week={w.week}
                challenges={w.challenges}
                states={w.states}
                completed={w.completed}
                total={w.total}
                xpEarned={w.xpEarned}
              />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
