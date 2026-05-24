import { useMemo, type CSSProperties } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { computeWeeklyLeaderboard, type LeaderboardRow } from "@/lib/rooms-storage"

/*
 * Weekly leaderboard. Gold/silver/bronze for top 3, the current user's row
 * is always highlighted with an iridescent left-bar.
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const MEDALS = ["🥇", "🥈", "🥉"]
const MEDAL_COLORS = ["#FFD24A", "#C9D1DA", "#D89A6B"]

function rankSuffix(rank: number): string {
  const r = rank % 100
  if (r >= 11 && r <= 13) return `${rank}th`
  const last = rank % 10
  if (last === 1) return `${rank}st`
  if (last === 2) return `${rank}nd`
  if (last === 3) return `${rank}rd`
  return `${rank}th`
}

function rowStyle(isYou: boolean): CSSProperties {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px 10px 16px",
    borderRadius: 12,
    background: isYou ? "rgba(139,92,246,0.08)" : "transparent",
    border: `1px solid ${isYou ? "rgba(139,92,246,0.18)" : "transparent"}`,
  }
}

export default function RoomLeaderboard({
  roomId,
  currentUserId,
  compact = false,
}: {
  roomId: string
  currentUserId: string
  compact?: boolean
}) {
  const rows: LeaderboardRow[] = useMemo(
    () => computeWeeklyLeaderboard(roomId, currentUserId),
    [roomId, currentUserId],
  )

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>This Week 🏆</h3>
        <span style={{ fontSize: 11, color: TEXT_DIM }}>Resets Monday</span>
      </div>

      <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {rows.length === 0 && (
          <li style={{ fontSize: 12.5, color: TEXT_MUTED }}>
            No one's started yet — be the first to complete a session.
          </li>
        )}
        {rows.map((row, i) => {
          const rank = i + 1
          const medal = rank <= 3 ? MEDALS[rank - 1] : null
          const color = rank <= 3 ? MEDAL_COLORS[rank - 1] : TEXT_MUTED
          return (
            <motion.li
              key={row.userId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              style={rowStyle(row.isYou)}
            >
              {row.isYou && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 6,
                    bottom: 6,
                    width: 3,
                    borderRadius: 3,
                    background: IRIDESCENT,
                  }}
                />
              )}
              <span
                style={{
                  width: 24,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color,
                }}
              >
                {medal || rankSuffix(rank)}
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: 13,
                  color: TEXT_PRIMARY,
                  fontWeight: row.isYou ? 700 : 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.isYou ? "You" : row.name}
              </span>
              <span style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>
                {row.sessions}/{row.total} sessions
              </span>
            </motion.li>
          )
        })}
      </ul>

      {!compact && (
        <p
          style={{
            marginTop: 12,
            fontSize: 12,
            color: TEXT_DIM,
            fontStyle: "italic",
          }}
        >
          This week's winner gets a badge.
        </p>
      )}
    </div>
  )
}
