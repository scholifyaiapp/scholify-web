import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { motion } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import {
  CATEGORY_ICON,
  CATEGORY_LABEL,
  computeLocalLeaderboard,
  displayNameFromAuth,
  GOAL_CATEGORIES,
  hueFor,
  type GoalCategory,
  type LeaderboardRow,
} from "@/lib/community-storage"

/*
 * Top-10 by category, this week. Pulls from /api/leaderboard when
 * Supabase is configured server-side; otherwise falls back to a
 * client-side derivation off the local community_posts cache so the UI
 * always has something to render in demo mode.
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const cardBase: CSSProperties = {
  borderRadius: 18,
  padding: 20,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

const RANK_GLYPHS = ["🥇", "🥈", "🥉"]

export default function CategoryLeaderboard({
  defaultCategory = "languages",
}: {
  defaultCategory?: GoalCategory
}) {
  const { user } = useAuth()
  const me = user?.id || "demo-user"
  const myName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
    return displayNameFromAuth({ firstName: meta.first_name, lastName: meta.last_name, email: user?.email || undefined })
  }, [user])

  const [category, setCategory] = useState<GoalCategory>(defaultCategory)
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [yourRank, setYourRank] = useState<{ rank: number; sessions: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    ;(async () => {
      try {
        const response = await api.getLeaderboard({ category, userId: me })
        if (cancelled) return
        if (response.isFallback || response.top10.length === 0) {
          const local = computeLocalLeaderboard(category, me)
          setRows(local)
          const idx = local.findIndex((r) => r.userId === me)
          setYourRank(idx === -1 ? null : { rank: idx + 1, sessions: local[idx].sessions })
        } else {
          const mapped = response.top10.map((r) => ({
            userId: r.user_id,
            name: r.display_name || "Learner",
            authorAvatarHue: hueFor(r.user_id),
            sessions: r.sessions,
            streak: r.streak,
            isYou: r.user_id === me,
          }))
          setRows(mapped)
          setYourRank(response.yourRank)
        }
      } catch {
        if (!cancelled) {
          const local = computeLocalLeaderboard(category, me)
          setRows(local)
          const idx = local.findIndex((r) => r.userId === me)
          setYourRank(idx === -1 ? null : { rank: idx + 1, sessions: local[idx].sessions })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [category, me])

  const top10 = rows.slice(0, 10)
  const youInTop10 = top10.some((r) => r.isYou)

  return (
    <div style={cardBase}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>This week's top learners 🏆</h2>
      </div>
      <p style={{ marginTop: 4, fontSize: 12, color: TEXT_MUTED }}>
        Resets every Monday · Opt-in only
      </p>

      {/* Category pills */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingBottom: 6,
        }}
        className="dash-scroll"
      >
        {GOAL_CATEGORIES.map((c) => {
          const active = c === category
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                flexShrink: 0,
                padding: "6px 12px",
                borderRadius: 999,
                background: active ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: active ? "#C084FC" : TEXT_MUTED,
                fontSize: 11.5,
                fontWeight: active ? 600 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {CATEGORY_ICON[c]} {CATEGORY_LABEL[c]}
            </button>
          )
        })}
      </div>

      {/* Rows */}
      <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {loading && (
          <li style={{ fontSize: 13, color: TEXT_MUTED, padding: "8px 4px" }}>Loading top 10…</li>
        )}
        {!loading && top10.length === 0 && (
          <li style={{ fontSize: 13, color: TEXT_MUTED, padding: "8px 4px" }}>
            No one in {CATEGORY_LABEL[category]} has logged a session this week — be the first.
          </li>
        )}
        {top10.map((row, i) => (
          <Row key={row.userId} row={row} rank={i + 1} />
        ))}
      </ul>

      {/* Your rank below top 10 */}
      {!loading && !youInTop10 && yourRank && (
        <>
          <div
            style={{
              marginTop: 12,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />
          <ul style={{ marginTop: 10, padding: 0, listStyle: "none" }}>
            <Row
              row={{
                userId: me,
                name: myName,
                authorAvatarHue: hueFor(me),
                sessions: yourRank.sessions,
                streak: 0,
                isYou: true,
              }}
              rank={yourRank.rank}
            />
          </ul>
        </>
      )}
    </div>
  )
}

/* ── Row ─────────────────────────────────────────────────────────────── */

function Row({ row, rank }: { row: LeaderboardRow; rank: number }) {
  const isTop3 = rank <= 3
  const medal = isTop3 ? RANK_GLYPHS[rank - 1] : null

  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: Math.min(0.3, rank * 0.03) }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px 8px 14px",
        borderRadius: 12,
        background: row.isYou ? "rgba(139,92,246,0.08)" : "transparent",
        border: `1px solid ${row.isYou ? "rgba(139,92,246,0.18)" : "transparent"}`,
      }}
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
          width: 26,
          textAlign: "center",
          fontSize: 13,
          fontWeight: 700,
          color: isTop3 ? "#FFD24A" : TEXT_DIM,
        }}
      >
        {medal || `#${rank}`}
      </span>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: `linear-gradient(135deg, hsl(${row.authorAvatarHue},80%,60%), hsl(${(row.authorAvatarHue + 60) % 360},75%,50%))`,
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 11,
          flexShrink: 0,
        }}
      >
        {(row.name?.trim()?.[0] || "?").toUpperCase()}
      </div>
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
        {row.isYou && (
          <span
            style={{
              marginLeft: 6,
              padding: "1px 6px",
              borderRadius: 999,
              background: "rgba(139,92,246,0.18)",
              color: "#C084FC",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            you
          </span>
        )}
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: TEXT_PRIMARY, fontVariantNumeric: "tabular-nums" }}>
        {row.sessions} sessions
      </span>
      {row.streak > 0 && (
        <span style={{ fontSize: 11, color: "#FB923C", fontWeight: 600, marginLeft: 8 }}>
          🔥 {row.streak}
        </span>
      )}
    </motion.li>
  )
}
