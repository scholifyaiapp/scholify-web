import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { addMonths, format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { api } from "@/lib/api"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  Scholify — Conversational onboarding with Lara.
 *
 *  Short flow (post sign-in): greet → name (if missing) → skill
 *  → level → daily-time → build. Deadline & notification time
 *  use sensible defaults the user can change in Settings later.
 *
 *  Long wizard still available at /onboarding/classic via "Skip setup".
 * ────────────────────────────────────────────────────────────── */

const BG = "#050508"
const TEXT = "#F0EEFF"
const TEXT_MUTED = "rgba(240,238,255,0.55)"
const BUBBLE_BG = "rgba(139,92,246,0.08)"
const BUBBLE_BORDER = "rgba(139,92,246,0.15)"
const USER_BG = "rgba(139,92,246,0.25)"
const USER_BORDER = "rgba(139,92,246,0.3)"
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Stage =
  | "greeting"
  | "name"
  | "skill_discovery"
  | "skill_level"
  | "daily_time"
  | "summary"
  | "submitting"

interface ChatMessage {
  id: string
  role: "lara" | "user"
  text: string
  typewriter?: boolean
  quickReplies?: QuickReply[]
  /** When true, the reply buttons under this message are consumed. */
  repliesUsed?: boolean
}

interface QuickReply {
  label: string
  value: string
}

interface Collected {
  name: string
  primaryGoal: string
  currentLevel: string
  dailyMinutes: number
  /** Fixed default — 3 months from sign-up. User can change in Settings. */
  deadline: string | null
  deadlineLabel: string
  /** Fixed default — 08:00. User can change in Settings. */
  notificationTime: string
}

const DEFAULT_NOTIF_TIME = "08:00"

function buildInitial(): Collected {
  const d = addMonths(new Date(), 3)
  return {
    name: "",
    primaryGoal: "",
    currentLevel: "",
    dailyMinutes: 20,
    deadline: d.toISOString(),
    deadlineLabel: format(d, "MMM d, yyyy"),
    notificationTime: DEFAULT_NOTIF_TIME,
  }
}

/* ── Typewriter hook ─────────────────────────────────────────── */

function useTypewriter(text: string, speed = 22, enabled = true): {
  visible: string
  done: boolean
} {
  const [visible, setVisible] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setVisible(text)
      setDone(true)
      return
    }
    setVisible("")
    setDone(false)
    if (!text) {
      setDone(true)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setVisible(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(id)
        setDone(true)
      }
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed, enabled])

  return { visible, done }
}

/* ── Avatar (ElevenLabs-style: photo + iridescent ring + pulse) ── */

function LaraAvatar({ size = 32, speaking = false }: { size?: number; speaking?: boolean }) {
  const ringWidth = Math.max(2, Math.round(size * 0.06))
  return (
    <motion.div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
      animate={
        speaking
          ? { scale: [1, 1.04, 1] }
          : { scale: 1 }
      }
      transition={
        speaking
          ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
    >
      {/* outer iridescent glow ring */}
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
      {/* solid gradient ring */}
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
      {/* speaking ripple */}
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

/* ── Lara bubble (typewriter) ────────────────────────────────── */

function LaraBubble({
  text,
  speed = 22,
  onDone,
}: {
  text: string
  speed?: number
  onDone?: () => void
}) {
  const { visible, done } = useTypewriter(text, speed)
  const calledRef = useRef(false)
  useEffect(() => {
    if (done && !calledRef.current) {
      calledRef.current = true
      onDone?.()
    }
  }, [done, onDone])

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
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
      {visible}
      {!done && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            verticalAlign: "text-bottom",
            background: "rgba(167,139,250,0.9)",
            marginLeft: 2,
          }}
        />
      )}
    </motion.div>
  )
}

/* ── Quick replies ───────────────────────────────────────────── */

function QuickReplies({
  replies,
  disabled,
  onPick,
}: {
  replies: QuickReply[]
  disabled?: boolean
  onPick: (r: QuickReply) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
        marginLeft: 42,
      }}
    >
      {replies.map((r, i) => (
        <motion.button
          key={`${r.value}-${i}`}
          type="button"
          disabled={disabled}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.25 }}
          whileHover={
            disabled
              ? undefined
              : {
                  scale: 1.03,
                  borderColor: "rgba(139,92,246,0.4)",
                  color: TEXT,
                }
          }
          whileTap={disabled ? undefined : { scale: 0.97 }}
          onClick={() => !disabled && onPick(r)}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            fontSize: 13,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: TEXT_MUTED,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {r.label}
        </motion.button>
      ))}
    </motion.div>
  )
}

/* ── Typing indicator (when Lara is "thinking") ──────────────── */

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
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

/* ── Quick-reply catalogue ───────────────────────────────────── */

const FALLBACK_SKILLS: string[] = [
  "Coding / Programming",
  "Design (Figma / UX)",
  "Languages",
  "Public speaking",
]

const LEVEL_REPLIES: QuickReply[] = [
  { label: "Beginner — starting from zero", value: "beginner" },
  { label: "Some basics — I've tried before", value: "basics" },
  { label: "Intermediate — want to go deeper", value: "intermediate" },
  { label: "Advanced — want to master it", value: "advanced" },
]

const TIME_REPLIES: QuickReply[] = [
  { label: "10 minutes", value: "10" },
  { label: "20 minutes", value: "20" },
  { label: "30 minutes", value: "30" },
  { label: "60 minutes", value: "60" },
]

const READY_REPLIES: QuickReply[] = [
  { label: "Let's go 🚀", value: "ready" },
]

const FINAL_REPLIES: QuickReply[] = [
  { label: "Build my plan ⚡", value: "build" },
]

/* ── Helpers ─────────────────────────────────────────────────── */

function levelLabel(value: string): string {
  const m = LEVEL_REPLIES.find((r) => r.value === value)
  return m?.label.split(" — ")[0] ?? value
}

let _idSeq = 0
const nextId = () => `m-${++_idSeq}-${Date.now()}`

/* ── Page ────────────────────────────────────────────────────── */

export default function OnboardingChat() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const initialName = useMemo(() => {
    const meta = (user?.user_metadata?.first_name as string) || ""
    return meta.trim()
  }, [user])

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [stage, setStage] = useState<Stage>("greeting")
  const [collected, setCollected] = useState<Collected>(buildInitial)
  const [input, setInput] = useState("")
  const [laraTyping, setLaraTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  /* Scroll to bottom on every message / state change. */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, laraTyping])

  /* Push a Lara message with a typing-indicator delay. */
  const sayLara = useCallback(
    async (text: string, opts?: Partial<ChatMessage> & { delay?: number }) => {
      setLaraTyping(true)
      await new Promise((r) => setTimeout(r, opts?.delay ?? 600))
      setLaraTyping(false)
      const msg: ChatMessage = {
        id: nextId(),
        role: "lara",
        text,
        typewriter: true,
        ...opts,
      }
      setMessages((prev) => [...prev, msg])
    },
    [],
  )

  const sayUser = useCallback((text: string) => {
    const msg: ChatMessage = { id: nextId(), role: "user", text }
    setMessages((prev) => [...prev, msg])
  }, [])

  const consumeReplies = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, quickReplies: undefined, repliesUsed: true } : m,
      ),
    )
  }, [])

  /* ── Stage 1 — greeting (auto on mount) ── */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      await new Promise((r) => setTimeout(r, 700))
      if (!mounted) return
      const opener = initialName
        ? `Hi ${initialName}! I'm Lara, your AI learning coach. ✦\n\nQuick setup — two questions and I'll build your plan. Ready?`
        : "Welcome to Scholify. ✦ I'm Lara, your AI learning coach.\n\nQuick setup — three questions and I'll build your plan. Ready?"
      await sayLara(opener, { quickReplies: READY_REPLIES })
    })()
    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Stage transitions. */
  const askName = useCallback(async () => {
    setStage("name")
    await sayLara("First — what's your name?")
  }, [sayLara])

  const askSkill = useCallback(
    async (name: string) => {
      setStage("skill_discovery")
      await sayLara(
        `Nice to meet you, ${name}. What skill do you want to build right now?`,
      )

      // Fetch dynamic skill suggestions from Claude Haiku in the background.
      const fallback: QuickReply[] = FALLBACK_SKILLS.map((label) => ({
        label,
        value: label,
      }))
      const customReply: QuickReply = {
        label: "I'll type my own",
        value: "__custom__",
      }

      const attachReplies = (replies: QuickReply[]) => {
        setMessages((prev) => {
          const idx = [...prev].reverse().findIndex((m) => m.role === "lara")
          if (idx === -1) return prev
          const realIdx = prev.length - 1 - idx
          const updated = [...prev]
          updated[realIdx] = { ...updated[realIdx], quickReplies: replies }
          return updated
        })
      }

      try {
        const res = await api.getSkillSuggestions({ futureVision: name })
        const fresh = (res.suggestions || []).slice(0, 4).filter(Boolean)
        attachReplies(
          fresh.length > 0
            ? [...fresh.map((label) => ({ label, value: label })), customReply]
            : [...fallback, customReply],
        )
      } catch {
        attachReplies([...fallback, customReply])
      }
    },
    [sayLara],
  )

  const askLevel = useCallback(
    async (skill: string) => {
      setStage("skill_level")
      await sayLara(
        `Great choice. On "${skill}", where are you right now?`,
        { quickReplies: LEVEL_REPLIES },
      )
    },
    [sayLara],
  )

  const askDailyTime = useCallback(async () => {
    setStage("daily_time")
    await sayLara(
      "Last one — how many minutes a day can you realistically give to this?",
      { quickReplies: TIME_REPLIES },
    )
  }, [sayLara])

  const showSummary = useCallback(
    async (next: Collected) => {
      setStage("summary")
      const summary =
        `Perfect. Here's what I'll plan around:\n\n` +
        `🎯 ${next.primaryGoal}\n` +
        `📊 ${levelLabel(next.currentLevel)}\n` +
        `⏱ ${next.dailyMinutes} min/day\n\n` +
        "Ready to build your personalised plan?"
      await sayLara(summary, { quickReplies: FINAL_REPLIES })
    },
    [sayLara],
  )

  /* ── Build & navigate ── */
  const buildPlan = useCallback(
    async (final: Collected) => {
      setStage("submitting")
      try {
        if (isSupabaseConfigured && user) {
          await supabase.auth.updateUser({
            data: {
              first_name: final.name || user?.user_metadata?.first_name,
              current_level: final.currentLevel,
              notification_time: final.notificationTime,
              goal: final.primaryGoal,
              deadline: final.deadline,
              daily_minutes: final.dailyMinutes,
              onboarded: true,
            },
          })
          await supabase
            .from("profiles")
            .upsert(
              {
                id: user.id,
                first_name: final.name,
                current_level: final.currentLevel,
                notification_time: final.notificationTime,
              },
              { onConflict: "id" },
            )
            .then(
              () => {},
              () => {},
            )
        }
      } catch {
        /* non-blocking */
      }

      try {
        const payload = {
          goal: final.primaryGoal,
          deadline: final.deadline,
          daily_minutes: final.dailyMinutes,
        }
        window.localStorage.setItem("scholify-onboarding", JSON.stringify(payload))
        window.localStorage.setItem("scholify-onboarded", "true")

        const settingsRaw = window.localStorage.getItem("scholify-settings")
        const settings = settingsRaw ? JSON.parse(settingsRaw) : {}
        window.localStorage.setItem(
          "scholify-settings",
          JSON.stringify({
            ...settings,
            reminderTime: final.notificationTime,
            notifyDaily: true,
          }),
        )
      } catch {
        /* ignore */
      }

      navigate("/loading", {
        state: {
          goal: final.primaryGoal,
          deadline: final.deadline,
          dailyMinutes: final.dailyMinutes,
        },
      })
    },
    [navigate, user],
  )

  /* ── Quick-reply dispatch ── */
  const handleQuickReply = useCallback(
    async (messageId: string, reply: QuickReply) => {
      switch (stage) {
        case "greeting": {
          consumeReplies(messageId)
          sayUser(reply.label)
          if (initialName) {
            setCollected((c) => ({ ...c, name: initialName }))
            await askSkill(initialName)
          } else {
            await askName()
          }
          return
        }
        case "skill_discovery": {
          consumeReplies(messageId)
          if (reply.value === "__custom__") return
          sayUser(reply.label)
          setCollected((c) => ({ ...c, primaryGoal: reply.value }))
          await askLevel(reply.value)
          return
        }
        case "skill_level": {
          consumeReplies(messageId)
          sayUser(reply.label)
          setCollected((c) => ({ ...c, currentLevel: reply.value }))
          await askDailyTime()
          return
        }
        case "daily_time": {
          consumeReplies(messageId)
          sayUser(reply.label)
          const minutes = Number(reply.value) || 20
          setCollected((c) => {
            const next: Collected = { ...c, dailyMinutes: minutes }
            setTimeout(() => showSummary(next), 50)
            return next
          })
          return
        }
        case "summary": {
          consumeReplies(messageId)
          sayUser(reply.label)
          await new Promise((r) => setTimeout(r, 400))
          await buildPlan(collected)
          return
        }
        default:
          return
      }
    },
    [
      stage,
      collected,
      sayUser,
      consumeReplies,
      askName,
      askSkill,
      askLevel,
      askDailyTime,
      showSummary,
      buildPlan,
      initialName,
    ],
  )

  /* ── Free-text submit ── */
  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text) return
    setInput("")

    if (stage === "greeting") {
      sayUser(text)
      if (initialName) {
        setCollected((c) => ({ ...c, name: initialName }))
        await askSkill(initialName)
      } else {
        await askName()
      }
      return
    }

    if (stage === "name") {
      sayUser(text)
      const name = text.slice(0, 40)
      setCollected((c) => ({ ...c, name }))
      await askSkill(name)
      return
    }

    if (stage === "skill_discovery") {
      sayUser(text)
      setCollected((c) => ({ ...c, primaryGoal: text }))
      await askLevel(text)
      return
    }

    sayUser(text)
  }, [
    input,
    stage,
    sayUser,
    askName,
    askSkill,
    askLevel,
    initialName,
  ])

  /* ── Keyboard ── */
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /* ── Render ── */

  const sendDisabled = input.trim().length === 0 || stage === "submitting"

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: BG,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
          position: "relative",
        }}
      >
        {/* ── Top bar ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            height: 64,
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10,10,16,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LaraAvatar size={40} speaking={laraTyping} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>
                Lara
              </div>
              <div style={{ fontSize: 12, color: TEXT_MUTED }}>
                {laraTyping ? "typing…" : "AI Learning Coach"}
              </div>
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ color: TEXT }}
            onClick={() => navigate("/onboarding/classic", { replace: true })}
            style={{
              background: "transparent",
              border: "none",
              color: TEXT_MUTED,
              fontSize: 13,
              cursor: "pointer",
              padding: "8px 4px",
            }}
          >
            Skip setup →
          </motion.button>
        </header>

        {/* ── Messages ── */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            paddingBottom: 110,
            scrollBehavior: "smooth",
          }}
        >
          <AnimatePresence initial={false}>
            {messages.map((m) => {
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <LaraBubble text={m.text} />
                      <AnimatePresence>
                        {m.quickReplies && (
                          <QuickReplies
                            replies={m.quickReplies}
                            onPick={(r) => handleQuickReply(m.id, r)}
                          />
                        )}
                      </AnimatePresence>
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
                    {m.text}
                  </div>
                </motion.div>
              )
            })}
            {laraTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>
        </div>

        {/* ── Input bar ── */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 30,
            padding: "12px 16px",
            paddingBottom: "max(12px, env(safe-area-inset-bottom))",
            background: "rgba(10,10,16,0.75)",
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
            placeholder="Type your message..."
            disabled={stage === "submitting"}
            style={inputStyle}
          />
          <motion.button
            type="button"
            onClick={handleSend}
            disabled={sendDisabled}
            whileHover={sendDisabled ? undefined : { scale: 1.08 }}
            whileTap={sendDisabled ? undefined : { scale: 0.93 }}
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
              cursor: sendDisabled ? "not-allowed" : "pointer",
              opacity: sendDisabled ? 0.4 : 1,
              boxShadow: sendDisabled ? "none" : "0 0 20px rgba(139,92,246,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            →
          </motion.button>
        </div>
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
