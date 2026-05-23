import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { api } from "@/lib/api"
import { addPlan, type PlanTask } from "@/lib/scholify-data"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/*
 * Plan-generation loading screen. Reached from Onboarding step 4.
 * Calls the /api/generate-plan serverless function while showing an
 * animated "Lara is thinking" screen, then routes to /dashboard.
 */

interface PlanState {
  goal?: string
  deadline?: string | null
  dailyMinutes?: number
}

const MESSAGES = [
  "Analyzing your goal...",
  "Understanding your deadline...",
  "Calculating your daily plan...",
  "Building progressive tasks...",
  "Personalizing for your schedule...",
  "Adding best resources...",
  "Almost ready...",
]

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

/* ── Ambient background orbs ─────────────────────────────────── */

interface Orb {
  size: number
  color: string
  style: CSSProperties
  x: number[]
  y: number[]
  d: number
}

function Orbs() {
  const orbs: Orb[] = [
    { size: 600, color: "rgba(120,80,255,0.08)", style: { top: -160, left: -160 }, x: [0, 80, 0], y: [0, 60, 0], d: 8 },
    { size: 500, color: "rgba(255,80,180,0.06)", style: { top: 80, right: -180 }, x: [0, -60, 0], y: [0, 40, 0], d: 10 },
    { size: 400, color: "rgba(0,200,180,0.05)", style: { bottom: -160, left: "30%" }, x: [0, 40, 0], y: [0, -30, 0], d: 7 },
  ]
  return (
    <>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ x: o.x, y: o.y }}
          transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "fixed",
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: o.color,
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
            ...o.style,
          }}
        />
      ))}
    </>
  )
}

/* ── Concentric rotating orb graphic ─────────────────────────── */

function OrbGraphic() {
  const ringBase = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    borderRadius: "50%",
  }
  return (
    <div style={{ width: 120, height: 120, margin: "0 auto", position: "relative" }}>
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          ...ringBase,
          width: 120,
          height: 120,
          marginTop: -60,
          marginLeft: -60,
          border: "1px solid rgba(139,92,246,0.2)",
          borderTopColor: "rgba(139,92,246,0.7)",
        }}
      />
      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          ...ringBase,
          width: 90,
          height: 90,
          marginTop: -45,
          marginLeft: -45,
          border: "1px solid rgba(99,102,241,0.3)",
          borderTopColor: "rgba(99,102,241,0.9)",
        }}
      />
      {/* Inner pulsing core */}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          ...ringBase,
          width: 60,
          height: 60,
          marginTop: -30,
          marginLeft: -30,
          border: "1px solid rgba(139,92,246,0.5)",
          background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent)",
        }}
      />
      {/* Center dot */}
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          ...ringBase,
          width: 12,
          height: 12,
          marginTop: -6,
          marginLeft: -6,
          background: IRIDESCENT,
        }}
      />
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  // Pull the plan inputs from navigation state, falling back to localStorage
  // (so a refresh on /loading doesn't lose them).
  const stateData = (location.state as PlanState | null) ?? null
  const inputs: PlanState = stateData ?? readStoredOnboarding()

  const [msgIndex, setMsgIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const startedRef = useRef(false)

  const goal = (inputs.goal || "").trim()
  const goalShort = goal.length > 40 ? `${goal.slice(0, 40)}…` : goal

  // Cycle the status messages every 2s.
  useEffect(() => {
    if (error) return
    const id = setInterval(() => {
      setMsgIndex((i) => (i < MESSAGES.length - 1 ? i + 1 : i))
    }, 2000)
    return () => clearInterval(id)
  }, [error, attempt])

  const generate = useCallback(async () => {
    setError(null)
    setMsgIndex(0)

    // No onboarding data at all — send the user back to fill it in.
    if (!goal) {
      navigate("/onboarding", { replace: true })
      return
    }

    try {
      // Real plan generation via Claude (server-side). Hold the screen for
      // at least 4s so it never flashes by.
      const apiCall = api.generatePlan({
        goal,
        deadline: inputs.deadline ?? null,
        dailyMinutes: inputs.dailyMinutes ?? 20,
        userId: user?.id,
        weekNumber: 1,
      })
      const [data] = await Promise.all([apiCall, delay(4000)])
      const tasks = Array.isArray(data.tasks) ? data.tasks : []

      // Persist the plan: localStorage always, Supabase best-effort.
      const record = {
        goal,
        deadline: inputs.deadline ?? null,
        daily_minutes: inputs.dailyMinutes ?? 20,
        tasks,
      }
      try {
        localStorage.setItem("scholify-plan", JSON.stringify(record))
        // Also register in the multi-plan list and set active.
        addPlan({
          goal: record.goal,
          deadline: record.deadline,
          daily_minutes: record.daily_minutes,
          tasks: record.tasks as PlanTask[],
          status: "active",
        })
      } catch {
        /* storage unavailable — non-fatal */
      }
      if (isSupabaseConfigured && user) {
        // Fails silently if the `plans` table doesn't exist yet — see SUPABASE_SETUP.md.
        await supabase
          .from("plans")
          .insert({ user_id: user.id, ...record })
          .then(
            () => {},
            () => {},
          )
      }

      navigate("/dashboard", { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong while building your plan.")
    }
  }, [goal, inputs.deadline, inputs.dailyMinutes, user, navigate])

  // Run once on mount, and again on each retry.
  useEffect(() => {
    if (startedRef.current && attempt === 0) return
    startedRef.current = true
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt])

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--sch-bg)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        overflow: "hidden",
      }}
    >
      <Orbs />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, textAlign: "center" }}>
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                margin: "0 auto",
                borderRadius: "50%",
                background: IRIDESCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              ⚠️
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--sch-text)", marginTop: 20 }}>
              Plan generation failed
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "var(--sch-tx-2)",
                marginTop: 10,
                lineHeight: 1.6,
              }}
            >
              {error}
            </p>
            <motion.button
              type="button"
              onClick={() => setAttempt((a) => a + 1)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 24,
                height: 48,
                padding: "0 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg,rgba(139,92,246,0.85),rgba(99,102,241,0.85))",
                border: "1px solid rgba(139,92,246,0.5)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(139,92,246,0.25)",
              }}
            >
              Try again
            </motion.button>
          </motion.div>
        ) : (
          <>
            <OrbGraphic />

            {/* Cycling status message */}
            <div style={{ marginTop: 40, height: 26 }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: 18, color: "var(--sch-tx-1)" }}
                >
                  {MESSAGES[msgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: 280,
                height: 3,
                margin: "32px auto 0",
                background: "var(--sch-hairline)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                style={{ height: "100%", background: IRIDESCENT, position: "relative" }}
              >
                {/* Shimmer */}
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              </motion.div>
            </div>

            {/* Goal reminder pill */}
            {goalShort && (
              <div
                style={{
                  display: "inline-block",
                  marginTop: 48,
                  padding: "10px 20px",
                  borderRadius: 20,
                  fontSize: 14,
                  color: "var(--sch-tx-2)",
                  border: "1px solid var(--sch-border)",
                  background: "var(--sch-card)",
                }}
              >
                🎯 {goalShort}
              </div>
            )}

            {/* Reassurance */}
            <p style={{ fontSize: 13, color: "var(--sch-tx-4)", marginTop: 20 }}>
              Lara is building your personalised plan.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

/** Recover onboarding inputs saved by the wizard, if navigation state is gone. */
function readStoredOnboarding(): PlanState {
  try {
    const raw = window.localStorage.getItem("scholify-onboarding")
    if (!raw) return {}
    const parsed = JSON.parse(raw) as { goal?: string; deadline?: string; daily_minutes?: number }
    return {
      goal: parsed.goal,
      deadline: parsed.deadline ?? null,
      dailyMinutes: parsed.daily_minutes,
    }
  } catch {
    return {}
  }
}
