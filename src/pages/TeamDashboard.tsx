import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  dismissAnnouncement,
  isAdminOf,
  isAnnouncementDismissed,
  isLeaderboardOptIn,
  readAnnouncements,
  readMembers,
  readTeam,
  setLeaderboardOptIn,
  subscribeTeamsLocal,
  type Team,
  type TeamAnnouncement,
} from "@/lib/teams-storage"

/* ──────────────────────────────────────────────────────────────────────
 *  /teams/:id — Member view of a workspace.
 *  Team-branded header, opt-in leaderboard, announcement banners.
 *  Hides other members' goals and exact streaks.
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const card: CSSProperties = {
  borderRadius: 20,
  padding: 22,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

export default function TeamDashboard() {
  const { id = "" } = useParams<{ id: string }>()
  const { user } = useAuth()

  const [tick, setTick] = useState(0)
  useEffect(() => subscribeTeamsLocal(() => setTick((t) => t + 1)), [])

  const team: Team | null = useMemo(() => readTeam(id), [id, tick])
  const members = useMemo(() => readMembers(id), [id, tick])
  const meMember = useMemo(
    () => members.find((m) => m.userId === (user?.id || "demo-user")) || null,
    [members, user],
  )
  const isAdmin = useMemo(() => (user ? isAdminOf(id, user.id) : false), [id, user, tick])
  const announcements = useMemo(() => readAnnouncements(id), [id, tick])

  if (!team) {
    return (
      <DashboardLayout>
        <div style={{ padding: 32, color: TEXT_MUTED }}>
          This workspace doesn't exist.{" "}
          <Link to="/teams" style={{ color: "#C084FC" }}>
            Back to Teams
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  if (isAdmin) return <Navigate to={`/teams/${team.id}/admin`} replace />

  const visibleAnns = announcements.filter((a) => !isAnnouncementDismissed(a.id)).slice(-3).reverse()

  return (
    <DashboardLayout>
      <div style={{ padding: "24px clamp(16px, 4vw, 40px) 80px", maxWidth: 1080, margin: "0 auto" }}>
        <BrandedHeader team={team} />

        {/* Announcements */}
        <AnimatePresence>
          {visibleAnns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: 20, display: "grid", gap: 10 }}
            >
              {visibleAnns.map((a) => (
                <AnnouncementBanner key={a.id} ann={a} color={team.primaryColor} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Three cards: assigned goal, leaderboard opt-in, info */}
        <div
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <div style={card}>
            <p style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Your assignment
            </p>
            <p style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.45 }}>
              {meMember?.assignedGoal || team.defaultGoal || "Set your own learning goal in onboarding."}
            </p>
            {meMember?.assignedDeadline && (
              <p style={{ marginTop: 6, fontSize: 12.5, color: TEXT_MUTED }}>
                Deadline: {format(new Date(meMember.assignedDeadline), "MMM d, yyyy")}
              </p>
            )}
            <p style={{ marginTop: 12, fontSize: 12, color: TEXT_DIM }}>
              {team.allowFreeGoals
                ? "Your team admin allows free goals."
                : "Your team admin has assigned this goal — it can't be changed."}
            </p>
            <Link
              to="/dashboard"
              style={{
                display: "inline-block",
                marginTop: 14,
                padding: "9px 14px",
                borderRadius: 12,
                background: team.primaryColor,
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              Open my daily plan →
            </Link>
          </div>

          <LeaderboardCard team={team} members={members} userId={user?.id || "demo-user"} />

          <div style={card}>
            <p style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Your workspace
            </p>
            <p style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>{team.name}</p>
            <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED }}>
              {members.length} member{members.length === 1 ? "" : "s"}
            </p>
            <p style={{ marginTop: 14, fontSize: 12, color: TEXT_DIM, lineHeight: 1.6 }}>
              Team admins can see your progress, your goal, and your streak. They cannot see notes you
              write or anything outside this workspace.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

/* ── Branded header ──────────────────────────────────────────────────── */

function BrandedHeader({ team }: { team: Team }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 16,
        borderRadius: 16,
        background: `linear-gradient(135deg, ${team.primaryColor}33, transparent)`,
        border: `1px solid ${team.primaryColor}55`,
      }}
    >
      {team.logoDataUrl ? (
        <img
          src={team.logoDataUrl}
          alt={team.name}
          style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: team.primaryColor,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 18,
          }}
        >
          {(team.name?.trim()?.[0] || "?").toUpperCase()}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 11.5, color: TEXT_DIM, letterSpacing: "0.14em", textTransform: "uppercase" }}>Workspace</p>
        <h1 style={{ marginTop: 2, fontSize: 22, fontWeight: 800, color: TEXT_PRIMARY }}>{team.name}</h1>
        {team.description && (
          <p style={{ marginTop: 2, fontSize: 13, color: TEXT_MUTED }}>{team.description}</p>
        )}
      </div>
    </div>
  )
}

/* ── Announcement banner ─────────────────────────────────────────────── */

function AnnouncementBanner({ ann, color }: { ann: TeamAnnouncement; color: string }) {
  const { toast } = useToast()
  return (
    <div
      style={{
        position: "relative",
        padding: "14px 16px",
        borderRadius: 14,
        background: `${color}1A`,
        border: `1px solid ${color}55`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>
            📢 {ann.title}
          </p>
          <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
            {ann.message}
          </p>
          <p style={{ marginTop: 6, fontSize: 11, color: TEXT_DIM }}>{format(new Date(ann.createdAt), "MMM d, HH:mm")}</p>
        </div>
        <button
          onClick={() => {
            dismissAnnouncement(ann.id)
            toast.info("Dismissed.")
          }}
          aria-label="Dismiss"
          style={{
            background: "transparent",
            border: "none",
            color: TEXT_MUTED,
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
            padding: 0,
            marginLeft: 4,
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

/* ── Leaderboard card (opt-in) ───────────────────────────────────────── */

function LeaderboardCard({
  team,
  members,
  userId,
}: {
  team: Team
  members: ReturnType<typeof readMembers>
  userId: string
}) {
  const [optIn, setOptIn] = useState<boolean>(() => isLeaderboardOptIn(team.id, userId))

  const onToggle = () => {
    const next = !optIn
    setLeaderboardOptIn(team.id, userId, next)
    setOptIn(next)
  }

  if (!optIn) {
    return (
      <div style={card}>
        <p style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Team leaderboard
        </p>
        <p style={{ marginTop: 8, fontSize: 13.5, color: TEXT_MUTED, lineHeight: 1.55 }}>
          Show me how I rank against my teammates. Only first names + completion % are shared — never
          your exact streak or goal.
        </p>
        <button
          onClick={onToggle}
          style={{
            marginTop: 14,
            padding: "9px 14px",
            borderRadius: 12,
            background: team.primaryColor,
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
          }}
        >
          Opt in →
        </button>
      </div>
    )
  }

  // Compute completion % from member.weekSessions/weekTotal
  const ranked = [...members]
    .map((m) => ({
      userId: m.userId,
      firstName: m.name.split(" ")[0],
      pct: m.weekTotal > 0 ? Math.round((m.weekSessions / m.weekTotal) * 100) : 0,
    }))
    .sort((a, b) => b.pct - a.pct)
  const meRank = ranked.findIndex((r) => r.userId === userId) + 1

  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <p style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Team leaderboard
        </p>
        <button
          onClick={onToggle}
          style={{ background: "transparent", border: "none", color: TEXT_MUTED, fontSize: 11, cursor: "pointer" }}
        >
          Opt out
        </button>
      </div>
      <p style={{ marginTop: 6, fontSize: 12, color: TEXT_DIM }}>You're #{meRank} of {ranked.length} this week.</p>
      <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 5 }}>
        {ranked.slice(0, 5).map((r, i) => (
          <li
            key={r.userId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 10px",
              borderRadius: 10,
              background: r.userId === userId ? `${team.primaryColor}1A` : "transparent",
              border: `1px solid ${r.userId === userId ? `${team.primaryColor}44` : "transparent"}`,
            }}
          >
            <span style={{ fontSize: 12, color: TEXT_DIM, width: 24 }}>#{i + 1}</span>
            <span style={{ flex: 1, fontSize: 13, color: TEXT_PRIMARY, fontWeight: r.userId === userId ? 700 : 500 }}>
              {r.userId === userId ? "You" : r.firstName}
            </span>
            <span style={{ fontSize: 12, color: TEXT_MUTED, fontVariantNumeric: "tabular-nums" }}>{r.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
