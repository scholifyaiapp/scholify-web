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
import { addDays, addMonths, format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { api } from "@/lib/api"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import DifficultyAdvisor, { type AdvisorReply } from "@/components/DifficultyAdvisor"
import { analyzeDifficulty, type DifficultyResult } from "@/lib/difficultyAnalysis"

/* ──────────────────────────────────────────────────────────────
 *  Scholify — Conversational onboarding with Lara.
 *
 *  Replaces the legacy 4-step wizard at /onboarding. The wizard
 *  is still reachable at /onboarding/classic via "Skip setup".
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
  | "future_self"
  | "skill_discovery"
  | "skill_level"
  | "deadline"
  | "daily_time"
  | "advisor"
  | "notification_time"
  | "summary"
  | "submitting"

type FutureCategory = "professional" | "exam" | "career_change" | "other"

interface ChatMessage {
  id: string
  role: "lara" | "user"
  text: string
  typewriter?: boolean
  quickReplies?: QuickReply[]
  /** When true, the reply buttons under this message are consumed. */
  repliesUsed?: boolean
  custom?: "date_picker" | "time_picker" | "difficulty_advisor"
}

interface QuickReply {
  label: string
  value: string
  category?: FutureCategory
}

interface Collected {
  name: string
  futureVision: string
  futureCategory: FutureCategory
  primaryGoal: string
  currentLevel: string
  deadline: string | null // ISO yyyy-MM-dd
  deadlineLabel: string
  dailyMinutes: number
  notificationTime: string // HH:mm
  difficulty: DifficultyResult["level"] | null
}

const initialCollected: Collected = {
  name: "",
  futureVision: "",
  futureCategory: "other",
  primaryGoal: "",
  currentLevel: "",
  deadline: null,
  deadlineLabel: "",
  dailyMinutes: 20,
  notificationTime: "08:00",
  difficulty: null,
}

/* ── Typewriter hook ─────────────────────────────────────────── */

function useTypewriter(text: string, speed = 25, enabled = true): {
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

/* ── Avatar ──────────────────────────────────────────────────── */

function LaraAvatar({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: IRIDESCENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.45,
        fontWeight: 800,
        flexShrink: 0,
        boxShadow: "0 0 20px rgba(139,92,246,0.25)",
      }}
    >
      L
    </div>
  )
}

/* ── Lara bubble (typewriter) ────────────────────────────────── */

function LaraBubble({
  text,
  speed = 25,
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

/* ── Inline date picker (for "exact date") ───────────────────── */

function InlineDatePicker({
  onPick,
}: {
  onPick: (iso: string, label: string) => void
}) {
  const today = useMemo(() => new Date(), [])
  const min = format(today, "yyyy-MM-dd")
  const [value, setValue] = useState(format(addMonths(today, 3), "yyyy-MM-dd"))
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        marginLeft: 42,
        marginTop: 8,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <input
        type="date"
        min={min}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          height: 40,
          padding: "0 14px",
          borderRadius: 12,
          fontSize: 14,
          color: TEXT,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          outline: "none",
          colorScheme: "dark",
        }}
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (!value) return
          const d = new Date(value)
          onPick(d.toISOString(), format(d, "MMM d, yyyy"))
        }}
        style={{
          padding: "9px 18px",
          borderRadius: 12,
          border: "none",
          background: IRIDESCENT,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 0 18px rgba(139,92,246,0.3)",
        }}
      >
        Set date
      </motion.button>
    </motion.div>
  )
}

/* ── Inline time picker (for notification time) ──────────────── */

function InlineTimePicker({
  onPick,
}: {
  onPick: (hhmm: string, label: string) => void
}) {
  const [value, setValue] = useState("08:00")
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        marginLeft: 42,
        marginTop: 8,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <input
        type="time"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          height: 40,
          padding: "0 14px",
          borderRadius: 12,
          fontSize: 14,
          color: TEXT,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          outline: "none",
          colorScheme: "dark",
        }}
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (!value) return
          const [h, m] = value.split(":")
          const hour = Number(h)
          const min = m
          const suffix = hour >= 12 ? "PM" : "AM"
          const display = `${((hour + 11) % 12) + 1}:${min} ${suffix}`
          onPick(value, display)
        }}
        style={{
          padding: "9px 18px",
          borderRadius: 12,
          border: "none",
          background: IRIDESCENT,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 0 18px rgba(139,92,246,0.3)",
        }}
      >
        Set time
      </motion.button>
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
      <LaraAvatar />
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

const FUTURE_REPLIES: QuickReply[] = [
  { label: "A skilled professional", value: "A skilled professional", category: "professional" },
  { label: "Someone who passed my exam", value: "Someone who passed my exam", category: "exam" },
  { label: "A career changer", value: "A career changer", category: "career_change" },
  { label: "More confident in my field", value: "More confident in my field", category: "professional" },
  { label: "I'll type my own answer", value: "__custom__" },
]

const SKILL_REPLIES: Record<FutureCategory, string[]> = {
  professional: [
    "Python / Data Science",
    "Figma / Design",
    "Public Speaking",
    "A specific certification",
  ],
  exam: ["IELTS / TOEFL", "Bar exam", "AWS / Cloud", "MBA entrance", "Something else"],
  career_change: [
    "Coding / Programming",
    "UX Design",
    "Digital Marketing",
    "Product Management",
  ],
  other: ["Coding / Programming", "Design", "Languages", "Business skills"],
}

const LEVEL_REPLIES: QuickReply[] = [
  { label: "Complete beginner — starting from zero", value: "beginner" },
  { label: "Some basics — I've tried before", value: "basics" },
  { label: "Intermediate — want to go deeper", value: "intermediate" },
  { label: "Advanced — want to master it", value: "advanced" },
]

const DEADLINE_REPLIES: QuickReply[] = [
  { label: "Yes, I have an exact date", value: "exact" },
  { label: "In about 1 month", value: "1m" },
  { label: "In about 3 months", value: "3m" },
  { label: "In about 6 months", value: "6m" },
  { label: "No deadline — ongoing", value: "none" },
]

const TIME_REPLIES: QuickReply[] = [
  { label: "5-10 minutes — very limited", value: "10" },
  { label: "15-20 minutes — manageable", value: "20" },
  { label: "25-30 minutes — committed", value: "30" },
  { label: "45-60 minutes — serious mode", value: "60" },
]

const NOTIF_REPLIES: QuickReply[] = [
  { label: "7:00 AM", value: "07:00" },
  { label: "8:00 AM", value: "08:00" },
  { label: "9:00 AM", value: "09:00" },
  { label: "After work (6 PM)", value: "18:00" },
  { label: "Pick a time", value: "__custom__" },
]

const READY_REPLIES: QuickReply[] = [
  { label: "Let's go 🚀", value: "ready" },
  { label: "Yes, I'm ready!", value: "ready" },
]

const FINAL_REPLIES: QuickReply[] = [
  { label: "Build my plan ⚡", value: "build" },
  { label: "Looks good!", value: "build" },
]

/* ── Helpers ─────────────────────────────────────────────────── */

function levelLabel(value: string): string {
  const m = LEVEL_REPLIES.find((r) => r.value === value)
  return m?.label.split(" — ")[0] ?? value
}

function formatDeadline(iso: string | null, fallback: string): string {
  if (!iso) return fallback
  try {
    return format(new Date(iso), "MMM d, yyyy")
  } catch {
    return fallback
  }
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":")
  const hour = Number(h)
  const suffix = hour >= 12 ? "PM" : "AM"
  const display = `${((hour + 11) % 12) + 1}:${m} ${suffix}`
  return display
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
  const [collected, setCollected] = useState<Collected>(initialCollected)
  const [input, setInput] = useState("")
  const [laraTyping, setLaraTyping] = useState(false)
  const [skillSuggestions, setSkillSuggestions] = useState<string[] | null>(null)
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
      await new Promise((r) => setTimeout(r, opts?.delay ?? 700))
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
        m.id === id ? { ...m, quickReplies: undefined, custom: undefined, repliesUsed: true } : m,
      ),
    )
  }, [])

  /* ── Stage 1 — greeting (auto on mount, 1s delay) ── */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      await new Promise((r) => setTimeout(r, 1000))
      if (!mounted) return
      await sayLara(
        "Welcome to Scholify. ✦ I'm Lara, your AI learning coach.\n\nI'm going to ask you a few quick questions so I can build your personalised plan. Ready?",
        { quickReplies: READY_REPLIES },
      )
    })()
    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Stage transitions are driven by `runUserResponse`. */
  const askName = useCallback(async () => {
    setStage("name")
    await sayLara("What's your name?")
  }, [sayLara])

  const askFutureSelf = useCallback(
    async (name: string) => {
      setStage("future_self")
      await sayLara(
        `Nice to meet you, ${name}! 👋\n\nI love that you're here. Most people talk about learning — you're actually doing something about it.`,
      )
      await sayLara(
        "Before we get to skills, I want to understand what you're really after.\n\nWho do you want to become? What does the future version of " +
          name +
          " look like in 1–2 years?",
        { quickReplies: FUTURE_REPLIES, delay: 900 },
      )
    },
    [sayLara],
  )

  const askSkill = useCallback(
    async (vision: string, category: FutureCategory) => {
      setStage("skill_discovery")
      await sayLara(
        `I love that. To become "${vision}", what specific skill do you most want to build right now?\n\nDon't overthink it — what's the one thing that would move you closest to that future?`,
      )

      // Fetch dynamic skill suggestions from Claude Haiku in the background.
      const fallback = SKILL_REPLIES[category].map((label) => ({
        label,
        value: label,
      }))
      const customReply: QuickReply = {
        label: "I'll describe my own",
        value: "__custom__",
      }
      // Place placeholders immediately so the UI never blocks.
      setSkillSuggestions(null)

      // Push the message that owns the quick replies once we have them.
      try {
        const res = await api.getSkillSuggestions({ futureVision: vision })
        const fresh = (res.suggestions || []).slice(0, 4).filter(Boolean)
        const replies: QuickReply[] =
          fresh.length > 0
            ? [...fresh.map((label) => ({ label, value: label })), customReply]
            : [...fallback, customReply]
        setSkillSuggestions(fresh.length > 0 ? fresh : null)
        // Attach replies to the last Lara message
        setMessages((prev) => {
          const idx = [...prev].reverse().findIndex((m) => m.role === "lara")
          if (idx === -1) return prev
          const realIdx = prev.length - 1 - idx
          const updated = [...prev]
          updated[realIdx] = { ...updated[realIdx], quickReplies: replies }
          return updated
        })
      } catch {
        const replies: QuickReply[] = [...fallback, customReply]
        setMessages((prev) => {
          const idx = [...prev].reverse().findIndex((m) => m.role === "lara")
          if (idx === -1) return prev
          const realIdx = prev.length - 1 - idx
          const updated = [...prev]
          updated[realIdx] = { ...updated[realIdx], quickReplies: replies }
          return updated
        })
      }
    },
    [sayLara],
  )

  const askLevel = useCallback(
    async (skill: string) => {
      setStage("skill_level")
      await sayLara(
        `Great choice. On "${skill}", where would you say you are right now?`,
        { quickReplies: LEVEL_REPLIES },
      )
    },
    [sayLara],
  )

  const askDeadline = useCallback(async () => {
    setStage("deadline")
    await sayLara(
      "Do you have a specific deadline? An exam date, a job interview, a goal you want to hit by a certain date?",
      { quickReplies: DEADLINE_REPLIES },
    )
  }, [sayLara])

  const askDailyTime = useCallback(async () => {
    setStage("daily_time")
    await sayLara(
      "Honest question: on a normal weekday, how many minutes could you realistically give to this — even when life gets busy?",
      { quickReplies: TIME_REPLIES },
    )
  }, [sayLara])

  const askNotifTime = useCallback(async () => {
    setStage("notification_time")
    await sayLara(
      "Perfect. I'll send you a daily task and a personal message from me.\n\nWhat time works best for your morning reminder?",
      { quickReplies: NOTIF_REPLIES },
    )
  }, [sayLara])

  /* ── Difficulty advisor ── */
  const [advisorResult, setAdvisorResult] = useState<DifficultyResult | null>(null)
  const [advisorLoading, setAdvisorLoading] = useState(false)

  const runAdvisor = useCallback(
    async (next: Collected) => {
      setStage("advisor")
      setAdvisorResult(null)
      setAdvisorLoading(true)
      // Drop a "thinking" Lara bubble so the user sees motion immediately.
      const advisorMsg: ChatMessage = {
        id: nextId(),
        role: "lara",
        text: "",
        custom: "difficulty_advisor",
      }
      setMessages((prev) => [...prev, advisorMsg])
      try {
        const result = await analyzeDifficulty(
          next.primaryGoal,
          next.deadline,
          next.dailyMinutes,
        )
        setAdvisorResult(result)
      } catch {
        // Should never throw — analyzer has internal fallbacks — but
        // be defensive so onboarding can't get stuck.
        setAdvisorResult({
          level: "realistic",
          score: 60,
          message: `${next.dailyMinutes} min/day looks workable for this goal.`,
          suggestion: "Lara will scaffold each week so it builds on the last.",
          confidence: 0.4,
          source: "ai_fallback",
        })
      } finally {
        setAdvisorLoading(false)
      }
    },
    [],
  )

  const handleAdvisorReply = useCallback(
    async (reply: AdvisorReply, result: DifficultyResult | undefined) => {
      if (!result) return
      // Consume the advisor card so it doesn't keep rendering buttons.
      setMessages((prev) =>
        prev.map((m) =>
          m.custom === "difficulty_advisor" ? { ...m, custom: undefined, repliesUsed: true } : m,
        ),
      )

      if (reply === "use_suggested_deadline" && result.suggestedDeadline) {
        const iso = result.suggestedDeadline
        const label = format(new Date(iso), "MMM d, yyyy")
        sayUser(`Use Lara's date — ${label}`)
        setCollected((c) => {
          const next: Collected = {
            ...c,
            deadline: iso,
            deadlineLabel: label,
            difficulty: "realistic",
          }
          return next
        })
        await askNotifTime()
        return
      }

      if (reply === "use_stretch_goal" && result.suggestedGoal) {
        const newGoal = result.suggestedGoal
        sayUser(`Go bigger — ${newGoal}`)
        setCollected((c) => ({ ...c, primaryGoal: newGoal, difficulty: "ambitious" }))
        await askNotifTime()
        return
      }

      if (reply === "show_safer_deadline") {
        sayUser("Show me a safer deadline")
        // Re-ask the deadline step — user picks again.
        await askDeadline()
        return
      }

      if (reply === "edit_goal") {
        sayUser("Let me adjust my goal")
        await sayLara(
          "Totally — give me the new version of the goal and I'll re-check the timeline.",
        )
        setStage("skill_discovery")
        return
      }

      // "proceed" | "keep_original_deadline" | "keep_current_goal"
      sayUser(reply === "keep_original_deadline" ? "Keep my deadline" : "Let's go")
      setCollected((c) => ({ ...c, difficulty: result.level }))
      await askNotifTime()
    },
    [askDeadline, askNotifTime, sayLara, sayUser],
  )

  const showSummary = useCallback(
    async (next: Collected) => {
      setStage("summary")
      const summary =
        `Okay ${next.name}, here's what I know about you:\n\n` +
        `🎯 Goal: ${next.primaryGoal}\n` +
        `📊 Level: ${levelLabel(next.currentLevel)}\n` +
        `📅 Deadline: ${next.deadlineLabel || "Ongoing"}\n` +
        `⏱ Daily time: ${next.dailyMinutes} minutes\n` +
        `🔔 Reminder: ${formatTime(next.notificationTime)}\n\n` +
        "I'm going to build your personalised plan right now. It'll take about 15 seconds. Ready?"
      await sayLara(summary, { quickReplies: FINAL_REPLIES })
    },
    [sayLara],
  )

  /* ── Build & navigate ── */
  const buildPlan = useCallback(
    async (final: Collected) => {
      setStage("submitting")
      // Persist to Supabase user metadata + profile + settings (best-effort).
      try {
        if (isSupabaseConfigured && user) {
          await supabase.auth.updateUser({
            data: {
              first_name: final.name || user?.user_metadata?.first_name,
              future_vision: final.futureVision,
              current_level: final.currentLevel,
              notification_time: final.notificationTime,
              goal: final.primaryGoal,
              deadline: final.deadline,
              daily_minutes: final.dailyMinutes,
              onboarded: true,
            },
          })
          // Best-effort write to profiles — column may not exist yet.
          await supabase
            .from("profiles")
            .upsert(
              {
                id: user.id,
                first_name: final.name,
                future_vision: final.futureVision,
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

        // Merge notification time into shared settings.
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
          difficultyLevel: final.difficulty,
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
            // Skip the name question — we already have it.
            setCollected((c) => ({ ...c, name: initialName }))
            await askFutureSelf(initialName)
          } else {
            await askName()
          }
          return
        }
        case "future_self": {
          consumeReplies(messageId)
          if (reply.value === "__custom__") {
            // Just dismiss — user will type.
            return
          }
          sayUser(reply.label)
          const cat: FutureCategory = reply.category ?? "other"
          setCollected((c) => ({
            ...c,
            futureVision: reply.value,
            futureCategory: cat,
          }))
          await askSkill(reply.value, cat)
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
          await askDeadline()
          return
        }
        case "deadline": {
          consumeReplies(messageId)
          if (reply.value === "exact") {
            sayUser(reply.label)
            // Insert a date-picker message under Lara.
            const pickerMsg: ChatMessage = {
              id: nextId(),
              role: "lara",
              text: "Pick the exact date:",
              typewriter: true,
              custom: "date_picker",
            }
            setLaraTyping(true)
            await new Promise((r) => setTimeout(r, 500))
            setLaraTyping(false)
            setMessages((prev) => [...prev, pickerMsg])
            return
          }
          sayUser(reply.label)
          const today = new Date()
          let deadlineDate: Date | null = null
          let deadlineLabel = reply.label
          if (reply.value === "1m") deadlineDate = addMonths(today, 1)
          else if (reply.value === "3m") deadlineDate = addMonths(today, 3)
          else if (reply.value === "6m") deadlineDate = addMonths(today, 6)
          else if (reply.value === "none") {
            deadlineDate = addDays(today, 90)
            deadlineLabel = "Ongoing"
          }
          setCollected((c) => ({
            ...c,
            deadline: deadlineDate ? deadlineDate.toISOString() : null,
            deadlineLabel:
              reply.value === "none"
                ? "Ongoing"
                : deadlineDate
                  ? format(deadlineDate, "MMM d, yyyy")
                  : "",
          }))
          await askDailyTime()
          return
        }
        case "daily_time": {
          consumeReplies(messageId)
          sayUser(reply.label)
          const minutes = Number(reply.value) || 20
          setCollected((c) => {
            const next: Collected = { ...c, dailyMinutes: minutes }
            // Defer the advisor run so the user message lands first.
            setTimeout(() => runAdvisor(next), 50)
            return next
          })
          return
        }
        case "notification_time": {
          consumeReplies(messageId)
          if (reply.value === "__custom__") {
            const pickerMsg: ChatMessage = {
              id: nextId(),
              role: "lara",
              text: "Pick the time:",
              typewriter: true,
              custom: "time_picker",
            }
            setLaraTyping(true)
            await new Promise((r) => setTimeout(r, 500))
            setLaraTyping(false)
            setMessages((prev) => [...prev, pickerMsg])
            return
          }
          sayUser(reply.label)
          setCollected((c) => {
            const next: Collected = { ...c, notificationTime: reply.value }
            // Show summary on next tick so collected is up-to-date.
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
      askFutureSelf,
      askSkill,
      askLevel,
      askDeadline,
      askDailyTime,
      askNotifTime,
      showSummary,
      buildPlan,
      initialName,
      runAdvisor,
    ],
  )

  /* ── Date picker submit ── */
  const handleDatePicked = useCallback(
    async (iso: string, label: string) => {
      sayUser(label)
      setMessages((prev) =>
        prev.map((m) =>
          m.custom === "date_picker" ? { ...m, custom: undefined, repliesUsed: true } : m,
        ),
      )
      setCollected((c) => ({ ...c, deadline: iso, deadlineLabel: label }))
      await askDailyTime()
    },
    [askDailyTime, sayUser],
  )

  /* ── Time picker submit ── */
  const handleTimePicked = useCallback(
    async (hhmm: string, label: string) => {
      sayUser(label)
      setMessages((prev) =>
        prev.map((m) =>
          m.custom === "time_picker" ? { ...m, custom: undefined, repliesUsed: true } : m,
        ),
      )
      const next: Collected = { ...collected, notificationTime: hhmm }
      setCollected(next)
      setTimeout(() => showSummary(next), 50)
    },
    [collected, sayUser, showSummary],
  )

  /* ── Free-text submit ── */
  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text) return
    setInput("")

    if (stage === "greeting") {
      sayUser(text)
      // Treat any text in greeting as "I'm ready"
      // Trigger the same path as a quick reply.
      if (initialName) {
        setCollected((c) => ({ ...c, name: initialName }))
        await askFutureSelf(initialName)
      } else {
        await askName()
      }
      return
    }

    if (stage === "name") {
      sayUser(text)
      const name = text.slice(0, 40)
      setCollected((c) => ({ ...c, name }))
      await askFutureSelf(name)
      return
    }

    if (stage === "future_self") {
      sayUser(text)
      const cat: FutureCategory = "other"
      setCollected((c) => ({
        ...c,
        futureVision: text,
        futureCategory: cat,
      }))
      await askSkill(text, cat)
      return
    }

    if (stage === "skill_discovery") {
      sayUser(text)
      setCollected((c) => ({ ...c, primaryGoal: text }))
      await askLevel(text)
      return
    }

    // Fallback: treat any other text as a no-op nudge.
    sayUser(text)
  }, [
    input,
    stage,
    sayUser,
    askName,
    askFutureSelf,
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
            height: 60,
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LaraAvatar />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, lineHeight: 1.1 }}>
                Lara
              </div>
              <div style={{ fontSize: 12, color: TEXT_MUTED }}>AI Learning Coach</div>
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
                    {m.custom === "difficulty_advisor" ? (
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <DifficultyAdvisor
                          loading={advisorLoading}
                          result={advisorResult}
                          onReply={handleAdvisorReply}
                          showAvatar
                        />
                      </div>
                    ) : (
                      <>
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
                            {m.custom === "date_picker" && (
                              <InlineDatePicker onPick={handleDatePicked} />
                            )}
                            {m.custom === "time_picker" && (
                              <InlineTimePicker onPick={handleTimePicked} />
                            )}
                          </AnimatePresence>
                        </div>
                      </>
                    )}
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
