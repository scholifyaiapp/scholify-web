import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { useAuth } from "@/lib/auth"
import {
  readPartnership,
  readPartnerSnapshot,
  subscribePartnerChanges,
} from "@/lib/partner-storage"
import {
  readMemberships as readRoomMemberships,
  readMessages as readRoomMessages,
  readRoom,
  subscribeRoomsLocal,
} from "@/lib/rooms-storage"
import {
  getISOWeek,
  isQuizCompleted,
  isSunday,
} from "@/lib/quiz-storage"

/*
 * Small horizontal "what's happening" strip mounted on the Dashboard
 * just under the task card. Each card is a one-line status with a clear
 * call-to-action and links into the deeper page.
 *
 * Cards only render when there's something to say:
 *  • Focus — always visible (CTA to start a focus session)
 *  • Partner — only when an active partnership exists
 *  • Rooms — only when the user is in at least one room
 *  • Quiz — only when it's Sunday and the weekly quiz isn't done
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const cardStyle: CSSProperties = {
  flex: "0 0 220px",
  padding: "12px 14px",
  borderRadius: 14,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minHeight: 70,
}

const KEY_FOCUS = "scholify-focus-session-active"

function useFocusActive(): { active: boolean; remainingMin: number } {
  // Read the FocusTimer component's local state via the shared storage key
  // it writes when a session is running. If FocusTimer hasn't been opened
  // this session, this returns inactive — that's fine; the CTA still shows.
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const onChange = () => setTick((t) => t + 1)
    window.addEventListener("storage", onChange)
    window.addEventListener("scholify-focus-change", onChange)
    return () => {
      window.removeEventListener("storage", onChange)
      window.removeEventListener("scholify-focus-change", onChange)
    }
  }, [])
  return useMemo(() => {
    if (typeof window === "undefined") return { active: false, remainingMin: 0 }
    try {
      const raw = window.localStorage.getItem(KEY_FOCUS)
      if (!raw) return { active: false, remainingMin: 0 }
      const parsed = JSON.parse(raw) as { endsAt?: number }
      const left = (parsed?.endsAt || 0) - Date.now()
      if (left <= 0) return { active: false, remainingMin: 0 }
      return { active: true, remainingMin: Math.ceil(left / 60000) }
    } catch {
      return { active: false, remainingMin: 0 }
    }
    // We intentionally re-derive on every tick so the elapsed minutes stay fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])
}

function unreadRoomMessagesAcrossRooms(currentUserId: string): { total: number; topRoom?: string } {
  const memberships = readRoomMemberships()
  let total = 0
  let topName: string | undefined
  let topCount = 0
  for (const roomId of memberships) {
    const room = readRoom(roomId)
    if (!room) continue
    const msgs = readRoomMessages(roomId)
    // Treat all messages from other members in the last 24h as "new" for the
    // strip — the global bell handles fine-grained read receipts.
    const cutoff = Date.now() - 24 * 60 * 60 * 1000
    const fresh = msgs.filter((m) => m.userId !== currentUserId && +new Date(m.createdAt) >= cutoff).length
    total += fresh
    if (fresh > topCount) {
      topCount = fresh
      topName = room.name
    }
  }
  return { total, topRoom: topName }
}

export default function IntegrationStrip() {
  const { user } = useAuth()
  const me = user?.id || "demo-user"

  // Local-state refreshers for the three async-ish sources.
  const [partnerTick, setPartnerTick] = useState(0)
  const [roomsTick, setRoomsTick] = useState(0)
  useEffect(() => subscribePartnerChanges(() => setPartnerTick((t) => t + 1)), [])
  useEffect(() => subscribeRoomsLocal(() => setRoomsTick((t) => t + 1)), [])

  const partnership = useMemo(() => readPartnership(), [partnerTick])
  const partnerSnap = useMemo(() => readPartnerSnapshot(), [partnerTick])
  const focus = useFocusActive()

  const week = useMemo(() => getISOWeek(), [])
  const quizReady = useMemo(() => isSunday() && !isQuizCompleted(week), [week])

  const rooms = useMemo(() => unreadRoomMessagesAcrossRooms(me), [roomsTick, me])
  const hasRooms = readRoomMemberships().length > 0

  // Don't render if nothing useful to say.
  const showPartner = Boolean(partnership && partnership.status === "active" && partnerSnap)
  const visible = focus.active || true /* focus CTA always */ || showPartner || hasRooms || quizReady

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Live status"
      style={{
        display: "flex",
        gap: 10,
        overflowX: "auto",
        paddingBottom: 4,
      }}
      className="dash-scroll"
    >
      {/* Focus — always shown so users can start a session in one tap */}
      <Card
        to="/dashboard"
        title={focus.active ? "Focus session" : "Start focus session"}
        body={focus.active ? `🍅 ${focus.remainingMin} min left` : "🍅 25-minute Pomodoro"}
      />

      {showPartner && partnerSnap && (
        <Card
          to="/partner"
          title={partnerSnap.name}
          body={partnerSnap.doneToday ? "✓ Done today" : "⏳ Not yet"}
          accent={partnerSnap.doneToday ? "#34D399" : "#FB923C"}
        />
      )}

      {hasRooms && rooms.total > 0 && (
        <Card
          to="/rooms"
          title={rooms.topRoom || "Your rooms"}
          body={`💬 ${rooms.total} new ${rooms.total === 1 ? "message" : "messages"}`}
          accent="#C084FC"
        />
      )}

      {quizReady && (
        <Card
          to="/quiz"
          title={`Week ${week} Challenge`}
          body="🏆 Ready · 5 questions"
          accent="#A78BFA"
          glow
        />
      )}
    </div>
  )
}

function Card({
  to,
  title,
  body,
  accent = "#C084FC",
  glow = false,
}: {
  to: string
  title: string
  body: string
  accent?: string
  glow?: boolean
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} style={{ flex: "0 0 auto" }}>
      <Link
        to={to}
        style={{
          ...cardStyle,
          borderColor: glow ? `${accent}66` : "var(--sch-border, rgba(255,255,255,0.06))",
          boxShadow: glow ? `0 8px 24px ${accent}33` : "none",
          background: glow ? `linear-gradient(135deg, ${accent}1A, transparent)` : cardStyle.background,
        }}
      >
        <span style={{ fontSize: 11, color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {title}
        </span>
        <span style={{ fontSize: 13.5, color: TEXT_PRIMARY, fontWeight: 600 }}>{body}</span>
        <span style={{ marginTop: "auto", fontSize: 11, color: glow ? accent : TEXT_MUTED }}>Open →</span>
      </Link>
    </motion.div>
  )
}
