import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { format } from "date-fns"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useAuth } from "@/lib/auth"
import {
  readMessages,
  sendMessage,
  subscribeRoomMessages,
  type RoomMessage,
} from "@/lib/rooms-storage"

/*
 * RoomChat — three message styles:
 *  • regular: avatar + bubble (your own messages tinted indigo)
 *  • completion: centered pill, no bubble
 *  • announcement: full-width iridescent border, glass, "Pinned" badge
 *
 * Realtime: subscribeRoomMessages handles Supabase + cross-tab.
 */

const TEXT_PRIMARY = "var(--sch-text, #F0EEFF)"
const TEXT_MUTED = "var(--sch-tx-2, rgba(240,238,255,0.6))"
const TEXT_DIM = "var(--sch-tx-3, rgba(240,238,255,0.45))"

const QUICK_REACTIONS = ["💪", "🔥", "✓ Done today!", "Almost there!"]

function initialOf(name: string): string {
  return (name?.trim()?.[0] || "?").toUpperCase()
}

function hueFor(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xff
  return h
}

function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, hsl(${hueFor(name)},80%,60%), hsl(${(hueFor(name) + 60) % 360},75%,50%))`,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.42,
        flexShrink: 0,
      }}
    >
      {initialOf(name)}
    </div>
  )
}

export default function RoomChat({
  roomId,
  memberCount,
  roomName,
}: {
  roomId: string
  memberCount: number
  roomName: string
}) {
  const { user } = useAuth()
  const meId = user?.id || "demo-user"
  const meName = useMemo(() => {
    const meta = (user?.user_metadata || {}) as { first_name?: string }
    return (meta.first_name || "").trim() || user?.email?.split("@")[0] || "You"
  }, [user])

  const [messages, setMessages] = useState<RoomMessage[]>(() => readMessages(roomId))
  const [draft, setDraft] = useState("")
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Realtime subscription.
  useEffect(() => {
    setMessages(readMessages(roomId))
    const handle = subscribeRoomMessages(roomId, () => {
      setMessages(readMessages(roomId))
    })
    return () => handle.unsubscribe()
  }, [roomId])

  // Scroll to bottom when messages change.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages.length])

  const send = useCallback(
    (text: string) => {
      const content = text.trim()
      if (!content) return
      sendMessage(roomId, { id: meId, name: meName }, content, "message")
      setDraft("")
      setMessages(readMessages(roomId))
    },
    [roomId, meId, meName],
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      {/* Header */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>{roomName}</p>
          <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: 2 }}>{memberCount} member{memberCount === 1 ? "" : "s"}</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
        className="dash-scroll"
      >
        {messages.length === 0 && (
          <div style={{ margin: "auto", textAlign: "center", color: TEXT_DIM, fontSize: 13 }}>
            <p>It's quiet in here.</p>
            <p style={{ marginTop: 4 }}>Be the first to say hello 👋</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageRow key={m.id} message={m} meId={meId} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 14px 16px",
          borderTop: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {QUICK_REACTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.18)",
                color: TEXT_PRIMARY,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {q}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send(draft)
              }
            }}
            placeholder="Say something to the room…"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "11px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: TEXT_PRIMARY,
              fontSize: 14,
              outline: "none",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => send(draft)}
            style={{
              padding: "11px 18px",
              borderRadius: 12,
              background: IRIDESCENT,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(167,139,250,0.35)",
            }}
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  )
}

/* ── Message rows ────────────────────────────────────────────────────── */

function MessageRow({ message, meId }: { message: RoomMessage; meId: string }) {
  if (message.messageType === "completion") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <span
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(52,211,153,0.06)",
            border: "1px solid rgba(52,211,153,0.18)",
            color: "#34D399",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {message.content}
        </span>
      </motion.div>
    )
  }

  if (message.messageType === "announcement") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "relative" }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            padding: 1,
            background: IRIDESCENT,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            borderRadius: 16,
            padding: "12px 16px",
            background: "rgba(139,92,246,0.05)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <p style={{ fontSize: 13, color: TEXT_PRIMARY, fontWeight: 700 }}>
              📢 {message.content}
            </p>
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                background: "rgba(139,92,246,0.12)",
                color: "#C084FC",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Pinned
            </span>
          </div>
          <p style={{ marginTop: 4, fontSize: 11, color: TEXT_DIM }}>
            {message.authorName} · {format(new Date(message.createdAt), "MMM d, HH:mm")}
          </p>
        </div>
      </motion.div>
    )
  }

  const fromMe = message.userId === meId
  const bubbleStyle: CSSProperties = {
    background: fromMe ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.04)",
    border: fromMe ? "1px solid rgba(139,92,246,0.22)" : "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "9px 13px",
    fontSize: 13.5,
    color: TEXT_PRIMARY,
    lineHeight: 1.45,
    maxWidth: "78%",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        flexDirection: fromMe ? "row-reverse" : "row",
      }}
    >
      <Avatar name={message.authorName} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: fromMe ? "flex-end" : "flex-start", gap: 4, maxWidth: "82%" }}>
        <p style={{ fontSize: 11, color: TEXT_MUTED }}>
          {fromMe ? "You" : message.authorName} · {format(new Date(message.createdAt), "HH:mm")}
        </p>
        <div style={bubbleStyle}>{message.content}</div>
      </div>
    </motion.div>
  )
}
