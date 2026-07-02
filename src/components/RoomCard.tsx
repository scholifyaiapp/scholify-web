import { useMemo, type CSSProperties } from "react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { differenceInCalendarDays } from "date-fns"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  computeGroupStreak,
  isMemberLocal,
  readMembers,
  type RoomCategory,
  type StudyRoom,
} from "@/lib/rooms-storage"

/*
 * Room card — used in both "Your rooms" carousel and "Discover" grid.
 */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

const CATEGORY_META: Record<RoomCategory, { icon: string; label: string }> = {
  general: { icon: "📚", label: "General" },
  ielts: { icon: "🎓", label: "IELTS" },
  coding: { icon: "💻", label: "Coding" },
  languages: { icon: "🌍", label: "Languages" },
  design: { icon: "🎨", label: "Design" },
  certifications: { icon: "📜", label: "Certifications" },
}

function initialOf(name: string): string {
  return (name?.trim()?.[0] || "?").toUpperCase()
}

function hueFor(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xff
  return h
}

function StackedAvatars({ names }: { names: string[] }) {
  const visible = names.slice(0, 3)
  const more = Math.max(0, names.length - visible.length)
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {visible.map((n, i) => (
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `linear-gradient(135deg, hsl(${hueFor(n)},80%,60%), hsl(${(hueFor(n) + 60) % 360},75%,50%))`,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 11,
            border: "2px solid var(--sch-bg, #0A0A14)",
            marginLeft: i === 0 ? 0 : -8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}
        >
          {initialOf(n)}
        </div>
      ))}
      {more > 0 && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "2px solid var(--sch-bg, #0A0A14)",
            color: TEXT_MUTED,
            fontSize: 10,
            fontWeight: 700,
            display: "grid",
            placeItems: "center",
            marginLeft: -8,
          }}
        >
          +{more}
        </div>
      )}
    </div>
  )
}

function Pill({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11.5,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

const cardBase: CSSProperties = {
  borderRadius: 20,
  padding: 20,
  background: "var(--sch-card, rgba(255,255,255,0.03))",
  border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
  cursor: "pointer",
  position: "relative",
  display: "block",
  textDecoration: "none",
  color: "inherit",
}

export default function RoomCard({
  room,
  onJoin,
}: {
  room: StudyRoom
  onJoin?: (room: StudyRoom) => void
}) {
  const members = useMemo(() => readMembers(room.id), [room.id])
  const isMember = useMemo(() => isMemberLocal(room.id), [room.id])
  const groupStreak = useMemo(() => computeGroupStreak(room.id), [room.id, members.length])
  const examDays = useMemo(() => {
    if (!room.examDate) return null
    const days = differenceInCalendarDays(new Date(room.examDate), new Date())
    return days >= 0 ? days : null
  }, [room.examDate])
  const cat = CATEGORY_META[room.category] || CATEGORY_META.general
  const activeToday = members.filter((m) => m.doneToday).length

  const lastMsgAgo = useMemo(() => {
    const recent = [...members].sort((a, b) => +new Date(b.lastActiveAt) - +new Date(a.lastActiveAt))[0]
    if (!recent) return null
    const min = Math.round((Date.now() - new Date(recent.lastActiveAt).getTime()) / 60000)
    if (min < 5) return "just now"
    if (min < 60) return `${min}m ago`
    const h = Math.round(min / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.round(h / 24)}d ago`
  }, [members])

  const inner = (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }} aria-hidden>
              {cat.icon}
            </span>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: TEXT_PRIMARY,
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {room.name}
            </h3>
            {room.isPrivate && (
              <span
                title="Private"
                style={{ fontSize: 11, color: TEXT_DIM }}
                aria-hidden
              >
                🔒
              </span>
            )}
          </div>
          <p
            style={{
              marginTop: 6,
              fontSize: 13,
              color: TEXT_MUTED,
              lineHeight: 1.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {room.goal}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <StackedAvatars names={members.map((m) => m.name)} />
          <p style={{ marginTop: 6, fontSize: 11, color: TEXT_DIM }}>
            {members.length}/{room.maxMembers}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Pill style={{
          background: "rgba(200,0,0,0.08)",
          border: "1px solid rgba(200,0,0,0.2)",
          color: "#D92E10",
        }}>
          🎯 {cat.label}
        </Pill>
        {examDays !== null && (
          <Pill style={{
            background: "rgba(251,146,60,0.1)",
            border: "1px solid rgba(251,146,60,0.25)",
            color: "#FB923C",
            fontWeight: 600,
          }}>
            📅 Exam in {examDays} day{examDays === 1 ? "" : "s"}
          </Pill>
        )}
        {groupStreak > 0 && (
          <Pill style={{
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.18)",
            color: "#34D399",
            fontWeight: 600,
          }}>
            🔥 Group streak: {groupStreak} day{groupStreak === 1 ? "" : "s"}
          </Pill>
        )}
      </div>

      <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        {isMember ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: TEXT_MUTED }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: activeToday > 0 ? "#34D399" : "rgba(255,255,255,0.18)",
                  boxShadow: activeToday > 0 ? "0 0 8px rgba(52,211,153,0.7)" : "none",
                }}
              />
              {activeToday} active today
            </span>
            {lastMsgAgo && (
              <span style={{ fontSize: 11, color: TEXT_DIM }}>Last activity: {lastMsgAgo}</span>
            )}
          </div>
        ) : (
          <span style={{ fontSize: 12, color: TEXT_MUTED }}>{lastMsgAgo ? `Active ${lastMsgAgo}` : "New room"}</span>
        )}

        {!isMember && onJoin && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onJoin(room)
            }}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              background: IRIDESCENT,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(200,0,0,0.35)",
            }}
          >
            Join room →
          </button>
        )}
      </div>
    </>
  )

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={cardBase}
    >
      <Link
        to={`/rooms/${room.id}`}
        style={{ position: "absolute", inset: 0, borderRadius: 20, zIndex: 1 }}
        aria-label={`Open ${room.name}`}
      />
      <div style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
        {/* Buttons inside need their own pointer events */}
        <div style={{ pointerEvents: "auto" }}>{inner}</div>
      </div>
    </motion.div>
  )
}
