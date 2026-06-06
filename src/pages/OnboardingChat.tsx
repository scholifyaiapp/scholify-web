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
import { addDays, addMonths, differenceInCalendarDays, format } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { trackEvent, identifyUser } from "@/lib/analytics"
import { detectGoalCategory } from "@/lib/community-storage"
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
  | "name"
  | "goal"
  | "deadline"
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

/* ── Onboarding progress persistence ──────────────────────────────
 *  Saves each answer as the user gives it so a mid-flow browser refresh
 *  doesn't lose progress. Kept in its own key — NOT `scholify-onboarding`
 *  (the committed plan-input contract read by Loading/scholify-data) nor
 *  `scholify-onboarded` (the completed flag) — so a partial answer can
 *  never be mistaken for a finished plan.
 * ──────────────────────────────────────────────────────────────── */

const PROGRESS_KEY = "scholify-onboarding-progress"

function saveOnboardingProgress(patch: Partial<Collected>) {
  try {
    const existing = JSON.parse(
      window.localStorage.getItem(PROGRESS_KEY) || "{}",
    ) as Partial<Collected>
    window.localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ ...existing, ...patch, savedAt: Date.now() }),
    )
  } catch {
    /* storage unavailable — non-fatal */
  }
}

function readOnboardingProgress(): Partial<Collected> {
  try {
    return JSON.parse(
      window.localStorage.getItem(PROGRESS_KEY) || "{}",
    ) as Partial<Collected>
  } catch {
    return {}
  }
}

function clearOnboardingProgress() {
  try {
    window.localStorage.removeItem(PROGRESS_KEY)
  } catch {
    /* ignore */
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

const GOAL_REPLIES: QuickReply[] = [
  { label: "IELTS Band 7+", value: "IELTS Band 7+" },
  { label: "Learn Python", value: "Learn Python" },
  { label: "Master Figma", value: "Master Figma" },
  { label: "Spanish B2", value: "Spanish B2" },
  { label: "AWS Certified", value: "AWS Certified" },
  { label: "I'll describe mine", value: "__custom__" },
]

const DEADLINE_REPLIES: QuickReply[] = [
  { label: "In 1 month", value: "1" },
  { label: "In 3 months", value: "3" },
  { label: "In 6 months", value: "6" },
  { label: "In 1 year", value: "12" },
]

const TIME_REPLIES: QuickReply[] = [
  { label: "10 minutes", value: "10" },
  { label: "20 minutes", value: "20" },
  { label: "30 minutes", value: "30" },
  { label: "60 minutes", value: "60" },
]

const FINAL_REPLIES: QuickReply[] = [
  { label: "Build my plan ⚡", value: "build" },
]

/* ── Helpers ─────────────────────────────────────────────────── */

/** Minimum free-text goal length — enough detail for a real plan. */
const GOAL_MIN_LEN = 10
/** A plan needs at least a week of runway. */
const MIN_DEADLINE_DAYS = 7

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
  const [stage, setStage] = useState<Stage>("name")
  const [collected, setCollected] = useState<Collected>(buildInitial)
  const [input, setInput] = useState("")
  const [laraTyping, setLaraTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  /** Earliest selectable deadline — today + 7 days (yyyy-MM-dd). */
  const minDeadlineStr = useMemo(
    () => format(addDays(new Date(), MIN_DEADLINE_DAYS), "yyyy-MM-dd"),
    [],
  )

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

  /* ── Stage 1 — greeting → name, or resume from saved progress (on mount) ── */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      await new Promise((r) => setTimeout(r, 700))
      if (!mounted) return

      // Resume: if the user answered some questions then refreshed, pick up
      // where they left off instead of restarting the whole conversation.
      const saved = readOnboardingProgress()
      const resumeName = saved.name || initialName
      const hasProgress = Boolean(
        saved.name || saved.primaryGoal || saved.deadline || saved.dailyMinutes,
      )
      if (hasProgress) {
        setCollected((c) => ({ ...c, ...saved, name: resumeName || c.name }))
        await sayLara("Welcome back 👋 Let's pick up right where we left off.")
        if (saved.dailyMinutes) {
          await showSummary({ ...buildInitial(), ...saved, name: resumeName })
        } else if (saved.deadline) {
          await askDailyTime()
        } else if (saved.primaryGoal) {
          await askDeadline()
        } else if (resumeName) {
          await askGoal(resumeName)
        } else {
          await askName()
        }
        return
      }

      // Fresh start. If we already know their name (from sign-up), skip
      // straight to the goal; otherwise ask their name first.
      if (initialName) {
        setCollected((c) => ({ ...c, name: initialName }))
        await sayLara(`Hi ${initialName}! I'm Lara, your AI learning coach. ✦`)
        await askGoal(initialName)
      } else {
        await askName()
      }
    })()
    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Stage transitions. */
  const askName = useCallback(async () => {
    setStage("name")
    await sayLara(
      "Welcome to Scholify — I'm Lara, your AI learning coach. ✦\n\nWhat's your name?",
    )
  }, [sayLara])

  const askGoal = useCallback(
    async (name: string) => {
      setStage("goal")
      await sayLara(
        `Nice to meet you, ${name}! What do you want to learn or achieve?\n\nBe specific — the more detail you give me, the better your plan.`,
        { quickReplies: GOAL_REPLIES },
      )
    },
    [sayLara],
  )

  const askDeadline = useCallback(async () => {
    setStage("deadline")
    await sayLara(
      "When do you need to achieve this by?\n\nPick a timeframe below, or choose your own date.",
      { quickReplies: DEADLINE_REPLIES },
    )
  }, [sayLara])

  const askDailyTime = useCallback(async () => {
    setStage("daily_time")
    await sayLara(
      "How many minutes a day can you realistically give to this?",
      { quickReplies: TIME_REPLIES },
    )
  }, [sayLara])

  const showSummary = useCallback(
    async (next: Collected) => {
      setStage("summary")
      const summary =
        `Perfect. Here's what I'll plan around:\n\n` +
        `🎯 ${next.primaryGoal}\n` +
        `📅 ${next.deadlineLabel}\n` +
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

      // Answers are now committed to the plan-input contract — clear the
      // mid-flow resume cache so a later visit starts fresh.
      clearOnboardingProgress()

      trackEvent("onboarding_completed")
      if (user?.id) {
        const planDays = final.deadline
          ? Math.max(7, differenceInCalendarDays(new Date(final.deadline), new Date()))
          : 30
        identifyUser(user.id, {
          goal_category: detectGoalCategory(final.primaryGoal),
          plan_days: planDays,
          daily_minutes: final.dailyMinutes,
        })
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
        case "goal": {
          // "I'll describe mine" — keep the chips, wait for free text.
          if (reply.value === "__custom__") return
          consumeReplies(messageId)
          sayUser(reply.label)
          setCollected((c) => ({ ...c, primaryGoal: reply.value }))
          saveOnboardingProgress({ primaryGoal: reply.value })
          trackEvent("onboarding_step_completed", { step: 2 })
          trackEvent("onboarding_goal_set", {
            goal_category: detectGoalCategory(reply.value),
          })
          await askDeadline()
          return
        }
        case "deadline": {
          consumeReplies(messageId)
          sayUser(reply.label)
          const months = Number(reply.value) || 3
          const d = addMonths(new Date(), months)
          const iso = d.toISOString()
          const label = format(d, "MMM d, yyyy")
          setCollected((c) => ({ ...c, deadline: iso, deadlineLabel: label }))
          saveOnboardingProgress({ deadline: iso, deadlineLabel: label })
          trackEvent("onboarding_step_completed", { step: 3 })
          await askDailyTime()
          return
        }
        case "daily_time": {
          consumeReplies(messageId)
          sayUser(reply.label)
          const minutes = Number(reply.value) || 20
          saveOnboardingProgress({ dailyMinutes: minutes })
          trackEvent("onboarding_step_completed", { step: 4 })
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
      askDeadline,
      askDailyTime,
      showSummary,
      buildPlan,
    ],
  )

  /* ── Free-text submit ── */
  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text) return

    if (stage === "name") {
      setInput("")
      sayUser(text)
      const name = text.slice(0, 40)
      setCollected((c) => ({ ...c, name }))
      saveOnboardingProgress({ name })
      trackEvent("onboarding_step_completed", { step: 1 })
      await askGoal(name)
      return
    }

    if (stage === "goal") {
      // Need enough detail for Lara to build a real plan.
      if (text.length < GOAL_MIN_LEN) {
        setInput("")
        sayUser(text)
        await sayLara(
          "Can you be a bit more specific? The more detail you give me, the better your plan will be.",
        )
        return
      }
      setInput("")
      sayUser(text)
      setCollected((c) => ({ ...c, primaryGoal: text }))
      saveOnboardingProgress({ primaryGoal: text })
      trackEvent("onboarding_step_completed", { step: 2 })
      trackEvent("onboarding_goal_set", { goal_category: detectGoalCategory(text) })
      await askDeadline()
      return
    }

    if (stage === "deadline") {
      // `input` holds a yyyy-MM-dd value from the date picker.
      const picked = new Date(text)
      if (Number.isNaN(picked.getTime())) return
      if (differenceInCalendarDays(picked, new Date()) < MIN_DEADLINE_DAYS) {
        await sayLara(
          "That's very soon! I need at least 7 days to build a proper plan. Can we set a date at least a week away?",
        )
        return
      }
      setInput("")
      const iso = picked.toISOString()
      const label = format(picked, "MMM d, yyyy")
      sayUser(`By ${label}`)
      setCollected((c) => ({ ...c, deadline: iso, deadlineLabel: label }))
      saveOnboardingProgress({ deadline: iso, deadlineLabel: label })
      trackEvent("onboarding_step_completed", { step: 3 })
      await askDailyTime()
      return
    }
  }, [
    input,
    stage,
    sayUser,
    sayLara,
    askGoal,
    askDeadline,
    askDailyTime,
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
            type={stage === "deadline" ? "date" : "text"}
            value={input}
            min={stage === "deadline" ? minDeadlineStr : undefined}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={stage === "deadline" ? "Pick your own date" : "Type your message..."}
            disabled={stage === "submitting"}
            style={{ ...inputStyle, colorScheme: "dark" }}
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
