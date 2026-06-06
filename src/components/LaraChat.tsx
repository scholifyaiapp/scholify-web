import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { motion, AnimatePresence } from "motion/react"
import { format, isSameDay, isYesterday, isToday } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { api } from "@/lib/api"
import { useToast } from "@/components/Toast"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import {
  readActivePlan,
  readProgress,
  type StoredPlan,
} from "@/lib/scholify-data"

/* ──────────────────────────────────────────────────────────────
 *  LaraChat — ongoing conversation with the AI coach.
 *
 *  Bubble UI matches OnboardingChat. Messages persist locally
 *  (and best-effort to a Supabase chat_messages table). Free
 *  users get 5 messages / day; the counter lives in localStorage
 *  per UTC date.
 * ────────────────────────────────────────────────────────────── */

const TEXT = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const BUBBLE_BG = "rgba(139,92,246,0.08)"
const BUBBLE_BORDER = "rgba(139,92,246,0.15)"
const USER_BG = "rgba(139,92,246,0.25)"
const USER_BORDER = "rgba(139,92,246,0.3)"
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FREE_DAILY_LIMIT = 5
const STORAGE_KEY = "scholify-chat-messages"
const COUNTER_KEY_PREFIX = "scholify-chat-counter-"

interface ChatMessage {
  id: string
  role: "user" | "lara"
  content: string
  created_at: string
}

const QUICK_ACTIONS: string[] = [
  "Explain today's task",
  "I'm struggling with...",
  "Give me a tip for...",
  "What should I focus on?",
]

function todayKey(): string {
  return `${COUNTER_KEY_PREFIX}${new Date().toISOString().slice(0, 10)}`
}

function readDailyCount(): number {
  try {
    const raw = window.localStorage.getItem(todayKey())
    return raw ? Number(raw) || 0 : 0
  } catch {
    return 0
  }
}

function incrementDailyCount(): number {
  const next = readDailyCount() + 1
  try {
    window.localStorage.setItem(todayKey(), String(next))
  } catch {
    /* ignore */
  }
  return next
}

function readStoredMessages(): ChatMessage[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed.slice(-200) : []
  } catch {
    return []
  }
}

function writeStoredMessages(list: ChatMessage[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-200)))
  } catch {
    /* ignore */
  }
}

let _idSeq = 0
const nextId = () => `msg-${++_idSeq}-${Date.now()}`

function recentNotesFromProgress(): string[] {
  try {
    const p = readProgress()
    if (!p.notes) return []
    const all = Object.entries(p.notes)
      .map(([day, note]) => ({
        day: Number(day),
        text: note.text,
        updatedAt: note.updatedAt,
      }))
      .filter((n) => n.text.trim().length > 0)
    all.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    return all.slice(0, 7).map((n) => n.text)
  } catch {
    return []
  }
}

/* ── Avatar (ElevenLabs-style: photo + iridescent ring + pulse) ── */

function LaraAvatar({ size = 32, speaking = false }: { size?: number; speaking?: boolean }) {
  const ringWidth = Math.max(2, Math.round(size * 0.06))
  return (
    <motion.div
      style={{ position: "relative", width: size, height: size, flexShrink: 0 }}
      animate={speaking ? { scale: [1, 1.04, 1] } : { scale: 1 }}
      transition={
        speaking
          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -ringWidth,
          borderRadius: "50%",
          background: IRIDESCENT,
          filter: `blur(${size * 0.18}px)`,
          opacity: speaking ? 0.7 : 0.45,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          padding: ringWidth,
          background: IRIDESCENT,
          boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
        }}
      >
        <img
          src="/lara-avatar.png"
          alt="Lara"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            background: "#1a1326",
          }}
        />
      </div>
      {speaking && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 1.45 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(167,139,250,0.55)",
            pointerEvents: "none",
          }}
        />
      )}
    </motion.div>
  )
}

/* ── Typing indicator ────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        marginBottom: 16,
      }}
    >
      <LaraAvatar speaking />
      <div
        style={{
          background: BUBBLE_BG,
          border: `1px solid ${BUBBLE_BORDER}`,
          borderRadius: "18px 18px 18px 4px",
          padding: "12px 16px",
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          height: 36,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(167,139,250,0.85)",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ── Day separator ───────────────────────────────────────────── */

function DaySeparator({ date }: { date: Date }) {
  const label = isToday(date)
    ? "Today"
    : isYesterday(date)
      ? "Yesterday"
      : format(date, "MMM d")
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "18px 0 10px",
      }}
    >
      <span
        style={{
          padding: "3px 12px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "var(--sch-tx-3)",
          fontSize: 11,
          letterSpacing: "0.04em",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── Props ───────────────────────────────────────────────────── */

export interface LaraChatProps {
  isPaid: boolean
  onUpgradeRequest?: () => void
}

/* ── Component ───────────────────────────────────────────────── */

export default function LaraChat({ isPaid, onUpgradeRequest }: LaraChatProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [dailyCount, setDailyCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const seededRef = useRef(false)

  const userName = useMemo(
    () => (user?.user_metadata?.first_name as string)?.trim() || "there",
    [user],
  )
  const plan: StoredPlan | null = useMemo(() => readActivePlan(), [])
  const progress = useMemo(() => readProgress(), [])
  const goal = plan?.goal?.trim() || "your learning goal"
  const taskTitle = useMemo(() => {
    if (!plan) return "today's task"
    const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
    const currentDay = (progress.completed?.length ?? 0) + 1
    const t = tasks[Math.min(currentDay, tasks.length) - 1]
    return t?.task_title?.trim() || "today's task"
  }, [plan, progress])
  const totalWeeks = useMemo(() => {
    const tasks = Array.isArray(plan?.tasks) ? plan!.tasks! : []
    return Math.max(1, Math.ceil(tasks.length / 7))
  }, [plan])
  const weekNumber = useMemo(() => {
    const completed = progress.completed?.length ?? 0
    return Math.max(1, Math.ceil((completed + 1) / 7))
  }, [progress])

  /* ── Hydrate from storage + initial seed ── */
  useEffect(() => {
    const stored = readStoredMessages()
    setDailyCount(readDailyCount())
    if (stored.length > 0) {
      setMessages(stored)
      seededRef.current = true
      return
    }
    if (seededRef.current) return
    seededRef.current = true
    const seed: ChatMessage = {
      id: nextId(),
      role: "lara",
      content: `Hey ${userName}! What's on your mind? Ask me anything about "${goal}" or today's task — I'm here to help.`,
      created_at: new Date().toISOString(),
    }
    setMessages([seed])
    writeStoredMessages([seed])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Auto-scroll ── */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, sending])

  /* ── Send ── */
  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim()
      if (!text || sending) return

      if (!isPaid && dailyCount >= FREE_DAILY_LIMIT) {
        onUpgradeRequest?.()
        return
      }

      const userMsg: ChatMessage = {
        id: nextId(),
        role: "user",
        content: text,
        created_at: new Date().toISOString(),
      }
      const next = [...messages, userMsg]
      setMessages(next)
      writeStoredMessages(next)
      setInput("")
      setSending(true)

      // Best-effort Supabase persist.
      if (isSupabaseConfigured && user?.id) {
        supabase
          .from("chat_messages")
          .insert({
            user_id: user.id,
            role: "user",
            content: text,
          })
          .then(
            () => {},
            () => {},
          )
      }

      const newCount = incrementDailyCount()
      setDailyCount(newCount)

      try {
        const res = await api.laraChat({
          userName,
          goal,
          weekNumber,
          totalWeeks,
          taskTitle,
          streak: progress.streak ?? 0,
          recentNotes: recentNotesFromProgress(),
          history: next.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          message: text,
        })

        const laraMsg: ChatMessage = {
          id: nextId(),
          role: "lara",
          content: res.message,
          created_at: new Date().toISOString(),
        }
        const after = [...next, laraMsg]
        setMessages(after)
        writeStoredMessages(after)

        if (isSupabaseConfigured && user?.id) {
          supabase
            .from("chat_messages")
            .insert({
              user_id: user.id,
              role: "lara",
              content: res.message,
            })
            .then(
              () => {},
              () => {},
            )
        }
      } catch (err) {
        const fail: ChatMessage = {
          id: nextId(),
          role: "lara",
          content:
            "Something glitched on my end — try again in a moment? Your question is still saved here.",
          created_at: new Date().toISOString(),
        }
        const after = [...next, fail]
        setMessages(after)
        writeStoredMessages(after)
        toast.error("Couldn't reach Lara — using local fallback")
        console.error(err)
      } finally {
        setSending(false)
      }
    },
    [
      sending,
      isPaid,
      dailyCount,
      messages,
      user,
      userName,
      goal,
      weekNumber,
      totalWeeks,
      taskTitle,
      progress.streak,
      toast,
      onUpgradeRequest,
    ],
  )

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  /* ── Group messages by day for separators ── */
  const grouped = useMemo(() => {
    const out: Array<{ type: "sep"; date: Date } | { type: "msg"; msg: ChatMessage }> = []
    let lastDate: Date | null = null
    for (const m of messages) {
      const d = new Date(m.created_at)
      if (!lastDate || !isSameDay(lastDate, d)) {
        out.push({ type: "sep", date: d })
        lastDate = d
      }
      out.push({ type: "msg", msg: m })
    }
    return out
  }, [messages])

  const remaining = Math.max(0, FREE_DAILY_LIMIT - dailyCount)
  const atLimit = !isPaid && remaining === 0

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 20,
          paddingBottom: 24,
        }}
      >
        <AnimatePresence initial={false}>
          {grouped.map((item, idx) => {
            if (item.type === "sep") {
              return <DaySeparator key={`sep-${idx}-${item.date.getTime()}`} date={item.date} />
            }
            const m = item.msg
            if (m.role === "lara") {
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <LaraAvatar />
                  <div
                    style={{
                      background: BUBBLE_BG,
                      border: `1px solid ${BUBBLE_BORDER}`,
                      borderRadius: "18px 18px 18px 4px",
                      padding: "12px 16px",
                      maxWidth: "85%",
                      fontSize: 15,
                      color: TEXT,
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.content}
                  </div>
                </motion.div>
              )
            }
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    background: USER_BG,
                    border: `1px solid ${USER_BORDER}`,
                    borderRadius: "18px 18px 4px 18px",
                    padding: "12px 16px",
                    maxWidth: "85%",
                    fontSize: 15,
                    color: TEXT,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {m.content}
                </div>
              </motion.div>
            )
          })}
          {sending && <TypingIndicator key="typing" />}
        </AnimatePresence>
      </div>

      {/* Quick actions + free-tier counter */}
      <div
        style={{
          padding: "8px 16px 0",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {QUICK_ACTIONS.map((q) => (
            <motion.button
              key={q}
              type="button"
              onClick={() => setInput(q + " ")}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(139,92,246,0.4)",
                color: TEXT,
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: TEXT_MUTED,
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {q}
            </motion.button>
          ))}
        </div>
        {!isPaid && (
          <div
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 11,
              color: "var(--sch-tx-3)",
            }}
          >
            <span>
              {dailyCount}/{FREE_DAILY_LIMIT} questions today
            </span>
            {atLimit && onUpgradeRequest && (
              <button
                type="button"
                onClick={onUpgradeRequest}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  fontSize: 11,
                  color: "rgba(167,139,250,0.85)",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Upgrade to Pro for unlimited Lara chat
              </button>
            )}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          background: "rgba(10,10,16,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={atLimit ? "Daily limit reached — upgrade for more" : "Type your message..."}
          disabled={sending || atLimit}
          style={inputStyle}
        />
        <motion.button
          type="button"
          onClick={() => send(input)}
          disabled={sending || atLimit || input.trim().length === 0}
          whileHover={
            sending || atLimit || input.trim().length === 0
              ? undefined
              : { scale: 1.08 }
          }
          whileTap={
            sending || atLimit || input.trim().length === 0
              ? undefined
              : { scale: 0.93 }
          }
          aria-label="Send"
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            background: IRIDESCENT,
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            cursor:
              sending || atLimit || input.trim().length === 0
                ? "not-allowed"
                : "pointer",
            opacity:
              sending || atLimit || input.trim().length === 0 ? 0.4 : 1,
            boxShadow: "0 0 20px rgba(139,92,246,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {sending ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                display: "inline-block",
              }}
            />
          ) : (
            "→"
          )}
        </motion.button>
      </div>
    </div>
  )
}

const inputStyle: CSSProperties = {
  flex: 1,
  height: 48,
  padding: "0 18px",
  borderRadius: 24,
  fontSize: 15,
  color: TEXT,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
}
