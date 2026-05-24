import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import { differenceInCalendarDays, format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/Toast"
import { DashboardLayout, iriText } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  buildJoinURL,
  computeGroupStreak,
  computeTodayCompletion,
  isMemberLocal,
  joinRoom,
  leaveRoom,
  readMembers,
  readMessages,
  readRoom,
  sendMessage,
  subscribeRoomsLocal,
  type RoomCategory,
  type StudyRoom,
} from "@/lib/rooms-storage"
import RoomChat from "@/components/RoomChat"
import RoomLeaderboard from "@/components/RoomLeaderboard"

/* ──────────────────────────────────────────────────────────────────────
 *  /rooms/:id — three-column desktop, tabbed mobile.
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const glassCard: CSSProperties = {
  borderRadius: 18,
  padding: 18,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
}

const sectionLabel: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: TEXT_DIM,
}

const CATEGORY_META: Record<RoomCategory, { icon: string; label: string }> = {
  general: { icon: "📚", label: "General" },
  ielts: { icon: "🎓", label: "IELTS" },
  coding: { icon: "💻", label: "Coding" },
  languages: { icon: "🌍", label: "Languages" },
  design: { icon: "🎨", label: "Design" },
  certifications: { icon: "📜", label: "Certifications" },
}

export default function Room() {
  const { id = "" } = useParams<{ id: string }>()
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const meId = user?.id || "demo-user"
  const meName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string }
    return (meta.first_name || "").trim() || user?.email?.split("@")[0] || "You"
  }, [user])

  const [tick, setTick] = useState(0)
  useEffect(() => subscribeRoomsLocal(() => setTick((t) => t + 1)), [])

  const room: StudyRoom | null = useMemo(() => readRoom(id), [id, tick])
  const members = useMemo(() => readMembers(id), [id, tick])
  const completion = useMemo(() => computeTodayCompletion(id), [id, tick, members.length])
  const groupStreak = useMemo(() => computeGroupStreak(id), [id, tick, members.length])
  const isMember = useMemo(() => isMemberLocal(id), [id, tick])
  const isCreator = room?.creatorId === meId

  const handleJoin = useCallback(() => {
    if (!room) return
    const m = joinRoom(room.id, { id: meId, name: meName })
    if (!m) {
      toast.error("This room is full.")
      return
    }
    toast.success("You're in 🎉")
  }, [room, meId, meName, toast])

  const handleLeave = useCallback(() => {
    if (!room) return
    leaveRoom(room.id, meId)
    toast.info("Left the room.")
    navigate("/rooms")
  }, [room, meId, navigate, toast])

  const [mobileTab, setMobileTab] = useState<"chat" | "task" | "members">("chat")

  if (!room) {
    return (
      <DashboardLayout>
        <div style={{ padding: 32, color: TEXT_MUTED }}>
          <p>This room doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate("/rooms")}
            style={{
              marginTop: 14,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: TEXT_PRIMARY,
              padding: "8px 14px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            ← Back to rooms
          </button>
        </div>
      </DashboardLayout>
    )
  }

  /* ── Sub-panels (reused on mobile tabs) ──────────────────────────── */

  const MembersPanel = (
    <MembersList
      members={members}
      meId={meId}
      roomId={room.id}
      groupStreak={groupStreak}
    />
  )

  const ChatPanel = (
    <div style={{ ...glassCard, padding: 0, height: isMobile ? "70vh" : "calc(100vh - 220px)" }}>
      <RoomChat roomId={room.id} memberCount={members.length} roomName={room.name} />
    </div>
  )

  const TaskPanel = (
    <RightPanel
      room={room}
      members={members}
      completion={completion}
      isCreator={!!isCreator}
      meId={meId}
      meName={meName}
    />
  )

  return (
    <DashboardLayout>
      <div style={{ padding: "20px clamp(16px, 3vw, 32px) 60px", maxWidth: 1280, margin: "0 auto" }}>
        {/* Room header */}
        <RoomHeader
          room={room}
          memberCount={members.length}
          groupStreak={groupStreak}
          isMember={isMember}
          onBack={() => navigate("/rooms")}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />

        {/* Layout */}
        {isMobile ? (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {(["chat", "task", "members"] as const).map((t) => {
                const active = mobileTab === t
                return (
                  <button
                    key={t}
                    onClick={() => setMobileTab(t)}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 10,
                      background: active ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                      color: active ? "#C084FC" : TEXT_MUTED,
                      fontSize: 12.5,
                      fontWeight: 600,
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
            {mobileTab === "chat" && ChatPanel}
            {mobileTab === "task" && TaskPanel}
            {mobileTab === "members" && MembersPanel}
          </div>
        ) : (
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "240px 1fr 300px",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            <div>{MembersPanel}</div>
            <div>{ChatPanel}</div>
            <div>{TaskPanel}</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

/* ── Header ──────────────────────────────────────────────────────────── */

function RoomHeader({
  room,
  memberCount,
  groupStreak,
  isMember,
  onBack,
  onJoin,
  onLeave,
}: {
  room: StudyRoom
  memberCount: number
  groupStreak: number
  isMember: boolean
  onBack: () => void
  onJoin: () => void
  onLeave: () => void
}) {
  const cat = CATEGORY_META[room.category] || CATEGORY_META.general
  const examDays = room.examDate ? differenceInCalendarDays(new Date(room.examDate), new Date()) : null

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "transparent",
          border: "none",
          color: TEXT_MUTED,
          fontSize: 13,
          cursor: "pointer",
          padding: 0,
        }}
      >
        ← All rooms
      </button>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ marginTop: 10, display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 16, justifyContent: "space-between" }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }} aria-hidden>{cat.icon}</span>
            <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1.15 }}>
              <span style={iriText}>{room.name}</span>
            </h1>
          </div>
          <p style={{ marginTop: 4, fontSize: 13, color: TEXT_MUTED, maxWidth: 640 }}>{room.goal}</p>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Pill>
              {cat.label}
            </Pill>
            <Pill>👥 {memberCount}/{room.maxMembers}</Pill>
            {groupStreak > 0 && (
              <Pill style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)", color: "#34D399" }}>
                🔥 Group streak: {groupStreak}
              </Pill>
            )}
            {examDays !== null && examDays >= 0 && (
              <Pill style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.25)", color: "#FB923C" }}>
                📅 Exam in {examDays} day{examDays === 1 ? "" : "s"}
              </Pill>
            )}
            {room.isPrivate && <Pill>🔒 Private</Pill>}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {!isMember ? (
            <button
              onClick={onJoin}
              style={{
                padding: "10px 18px",
                borderRadius: 12,
                background: IRIDESCENT,
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(167,139,250,0.35)",
              }}
            >
              Join room →
            </button>
          ) : (
            <button
              onClick={onLeave}
              style={{
                padding: "9px 14px",
                borderRadius: 12,
                background: "rgba(255,69,58,0.04)",
                border: "1px solid rgba(255,69,58,0.2)",
                color: "#FF6B6B",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              Leave room
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function Pill({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontSize: 12,
        color: TEXT_PRIMARY,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

/* ── Members list panel ──────────────────────────────────────────────── */

function MembersList({
  members,
  meId,
  roomId,
  groupStreak,
}: {
  members: ReturnType<typeof readMembers>
  meId: string
  roomId: string
  groupStreak: number
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={glassCard}>
        <p style={sectionLabel}>Members ({members.length})</p>
        <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
          {members.map((m) => {
            const onlineAgo = Date.now() - new Date(m.lastActiveAt).getTime()
            const online = onlineAgo < 30 * 60 * 1000
            const statusIcon = m.doneToday ? "✓" : "⏳"
            const statusColor = m.doneToday ? "#34D399" : "#FB923C"
            return (
              <li
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: m.userId === meId ? "rgba(139,92,246,0.06)" : "transparent",
                  border: `1px solid ${m.userId === meId ? "rgba(139,92,246,0.16)" : "transparent"}`,
                }}
              >
                <div style={{ position: "relative" }}>
                  <Avatar32 name={m.name} />
                  {online && (
                    <span
                      style={{
                        position: "absolute",
                        right: -1,
                        bottom: -1,
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#34D399",
                        border: "2px solid var(--sch-bg, #0A0A14)",
                      }}
                      title="Online"
                    />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      color: TEXT_PRIMARY,
                      fontWeight: m.userId === meId ? 700 : 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.userId === meId ? "You" : m.name}
                  </p>
                  <p style={{ fontSize: 10.5, color: TEXT_DIM, marginTop: 2 }}>🔥 {m.streak}</p>
                </div>
                <span style={{ color: statusColor, fontSize: 14 }} title={m.doneToday ? "Done today" : "Pending"}>
                  {statusIcon}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div style={glassCard}>
        <RoomLeaderboard roomId={roomId} currentUserId={meId} />
      </div>

      {groupStreak > 0 && (
        <div
          style={{
            ...glassCard,
            background: "rgba(52,211,153,0.05)",
            border: "1px solid rgba(52,211,153,0.18)",
          }}
        >
          <p style={{ fontSize: 12, color: TEXT_MUTED }}>Group streak</p>
          <p style={{ marginTop: 2, fontSize: 22, fontWeight: 800, color: "#34D399" }}>
            🔥 {groupStreak} day{groupStreak === 1 ? "" : "s"}
          </p>
        </div>
      )}
    </div>
  )
}

function Avatar32({ name }: { name: string }) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xff
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        background: `linear-gradient(135deg, hsl(${h},80%,60%), hsl(${(h + 60) % 360},75%,50%))`,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        flexShrink: 0,
      }}
    >
      {(name?.trim()?.[0] || "?").toUpperCase()}
    </div>
  )
}

/* ── Right panel: today's task + announcements + invite ──────────────── */

function RightPanel({
  room,
  members,
  completion,
  isCreator,
  meId,
  meName,
}: {
  room: StudyRoom
  members: ReturnType<typeof readMembers>
  completion: { done: number; total: number; pct: number }
  isCreator: boolean
  meId: string
  meName: string
}) {
  const { toast } = useToast()
  const [announcement, setAnnouncement] = useState("")
  const [showInvite, setShowInvite] = useState(false)
  const inviteUrl = useMemo(() => buildJoinURL(room.inviteCode), [room.inviteCode])

  const recentAnnouncements = useMemo(
    () =>
      readMessages(room.id)
        .filter((m) => m.messageType === "announcement")
        .slice(-5)
        .reverse(),
    [room.id, completion.done, completion.total],
  )

  const postAnnouncement = () => {
    const text = announcement.trim()
    if (!text) {
      toast.warning("Write something first.")
      return
    }
    sendMessage(room.id, { id: meId, name: meName }, text.slice(0, 100), "announcement")
    setAnnouncement("")
    toast.success("Posted to the room.")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Shared task */}
      <div style={glassCard}>
        <p style={sectionLabel}>Today's shared task</p>
        <p style={{ marginTop: 8, fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.4 }}>
          {room.goal}
        </p>
        {room.description && (
          <p style={{ marginTop: 4, fontSize: 12.5, color: TEXT_MUTED, lineHeight: 1.5 }}>{room.description}</p>
        )}

        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TEXT_MUTED }}>
            <span>{completion.done}/{completion.total} members completed today</span>
            <span>{completion.pct}%</span>
          </div>
          <div
            style={{
              marginTop: 6,
              height: 6,
              borderRadius: 3,
              background: "rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion.pct}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", background: IRIDESCENT }}
            />
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {members.map((m) => (
            <div
              key={m.id}
              title={`${m.name} ${m.doneToday ? "✓ done" : "pending"}`}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: m.doneToday
                  ? `linear-gradient(135deg,#A78BFA,#F472B6)`
                  : "transparent",
                border: m.doneToday ? "none" : "1.5px dashed rgba(255,255,255,0.2)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {(m.name?.trim()?.[0] || "?").toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div style={glassCard}>
        <p style={sectionLabel}>📢 Announcements</p>
        {isCreator && (
          <div style={{ marginTop: 10 }}>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value.slice(0, 100))}
              rows={2}
              placeholder="Post an announcement to the room…"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: TEXT_PRIMARY,
                fontSize: 13,
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: TEXT_DIM }}>{announcement.length}/100</span>
              <button
                onClick={postAnnouncement}
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: IRIDESCENT,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Post
              </button>
            </div>
          </div>
        )}

        <ul style={{ marginTop: 12, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
          {recentAnnouncements.length === 0 && (
            <li style={{ fontSize: 12.5, color: TEXT_MUTED }}>No announcements yet.</li>
          )}
          {recentAnnouncements.map((a) => (
            <li
              key={a.id}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                background: "rgba(139,92,246,0.05)",
                border: "1px solid rgba(139,92,246,0.16)",
              }}
            >
              <p style={{ fontSize: 12.5, color: TEXT_PRIMARY, lineHeight: 1.5 }}>{a.content}</p>
              <p style={{ marginTop: 4, fontSize: 10.5, color: TEXT_DIM }}>
                {a.authorName} · {format(new Date(a.createdAt), "MMM d, HH:mm")}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Invite */}
      <div style={glassCard}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={sectionLabel}>Invite code</p>
          <button
            onClick={() => setShowInvite((v) => !v)}
            style={{
              background: "transparent",
              border: "none",
              color: TEXT_MUTED,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {showInvite ? "Hide" : "Show"}
          </button>
        </div>
        {showInvite && (
          <div style={{ marginTop: 10 }}>
            <code
              style={{
                display: "block",
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(0,0,0,0.25)",
                color: "#F0EEFF",
                fontFamily: "var(--font-mono)",
                fontSize: 16,
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              {room.inviteCode}
            </code>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(inviteUrl)
                  toast.success("Invite link copied 📋")
                } catch {
                  toast.error("Couldn't copy.")
                }
              }}
              style={{
                marginTop: 8,
                width: "100%",
                padding: "9px 12px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: TEXT_PRIMARY,
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              Copy invite link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
