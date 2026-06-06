import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import confetti from "canvas-confetti"
import { format, differenceInCalendarDays } from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import {
  readPlan,
  readProgress,
  writeProgress,
  RESOURCE,
  type PlanTask,
  type Progress,
} from "@/lib/scholify-data"
import { DashboardLayout, iriText, ProgressBar, Pill } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { usePaywall } from "@/hooks/usePaywall"
import PaywallModal from "@/components/PaywallModal"
import { api } from "@/lib/api"
import { trackEvent } from "@/lib/analytics"
import NotificationPrompt, { shouldShowNotificationPrompt } from "@/components/NotificationPrompt"
import { loadCalendarAccount, syncSingleTask } from "@/lib/calendar"
import DeadlineCountdown from "@/components/DeadlineCountdown"
import { recalibratePlan, shouldAutoRecalibrate } from "@/lib/recalibration"
import FocusTimer from "@/components/FocusTimer"
import { WeeklyQuizBanner } from "@/components/WeeklyQuiz"
import PartnerCard from "@/components/PartnerCard"
import { useToast } from "@/components/Toast"
import {
  readPartnership,
  readPartnerSnapshot,
  writePartnerSnapshot,
} from "@/lib/partner-storage"
import { notifyRoomsOnCompletion } from "@/lib/rooms-storage"
import {
  displayNameFromAuth,
  hasShownOptInPrompt,
  maybeAutoPost,
} from "@/lib/community-storage"
import CommunityOptInCard, { shouldShowOptInPrompt } from "@/components/CommunityOptInCard"
import IntegrationStrip from "@/components/IntegrationStrip"
import SmartSuggestions from "@/components/SmartSuggestions"
import { ChallengeWidget } from "@/components/WeeklyChallenge"
import PhotoEvidence from "@/components/PhotoEvidence"
import { LevelUpOverlay } from "@/components/XPBar"
import { applyEvent, recordTaskCompletionTime, type LevelDef } from "@/lib/challenges-storage"
import TreeGrowthOverlay from "@/components/TreeGrowthOverlay"
import {
  ensureTreeForMilestone,
  MILESTONES as TREE_MILESTONES,
  milestoneHit as treeMilestoneHit,
} from "@/lib/streak-tree-storage"
import WelcomeChecklist, { shouldShowWelcomeChecklist } from "@/components/WelcomeChecklist"
import SessionNotes from "@/components/SessionNotes"
import SpeakingPractice from "@/components/SpeakingPractice"
import { addResource, readActivePlanId } from "@/lib/scholify-data"
import type { ResourceType } from "@/lib/scholify-data"
import { useNavigate } from "react-router-dom"

/* ──────────────────────────────────────────────────────────────
 *  Scholify dashboard — the screen users see every day.
 * ────────────────────────────────────────────────────────────── */

function resourceUrl(task: PlanTask): string {
  const q = encodeURIComponent(task.task_title)
  return task.resource_type === "video"
    ? `https://www.youtube.com/results?search_query=${q}`
    : `https://www.google.com/search?q=${q}`
}

function formatTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return h === 0 ? `${m} min` : `${h} hr${h === 1 ? "" : "s"} ${m} min`
}

/* ── Lara typing indicator ───────────────────────────────────── */

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 5, alignItems: "center", height: 22 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--sch-tx-3)",
          }}
        />
      ))}
    </span>
  )
}

/* ── Typewriter hook ─────────────────────────────────────────── */

function useTypewriter(text: string, speed = 30): string {
  const [shown, setShown] = useState("")
  useEffect(() => {
    setShown("")
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return shown
}

/* ── Stat card ───────────────────────────────────────────────── */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      style={{
        padding: "16px 20px",
        borderRadius: 16,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 800, ...iriText }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--sch-tx-2)", marginTop: 4 }}>{label}</div>
    </motion.div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isPaid = Boolean(
    user?.user_metadata?.plan && user.user_metadata.plan !== "free",
  )
  const [speakingOpen, setSpeakingOpen] = useState(false)

  const plan = useMemo(readPlan, [])
  const [progress, setProgress] = useState<Progress>(readProgress)
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  const { showPaywall, paywallType, checkPaywallTrigger, triggerFeaturePaywall, closePaywall } =
    usePaywall()
  const [showNotifPrompt, setShowNotifPrompt] = useState(false)
  const [showCommunityOptIn, setShowCommunityOptIn] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [levelUp, setLevelUp] = useState<LevelDef | null>(null)
  const [treeMilestone, setTreeMilestone] = useState<number | null>(null)

  useEffect(() => {
    if (shouldShowWelcomeChecklist()) setShowWelcome(true)
  }, [])

  // Surface a streak-milestone paywall on load (7 / 14 / 21-day streaks).
  useEffect(() => {
    checkPaywallTrigger(user?.id)
  }, [checkPaywallTrigger, user?.id])

  // Real-time: when our accountability partner marks today complete,
  // pulse their stats and drop a "your turn" toast.
  const { toast } = useToast()
  useEffect(() => {
    const partnership = readPartnership()
    if (!partnership || partnership.status !== "active") return
    const snapshot = readPartnerSnapshot()
    if (!snapshot) return
    const partnerId = partnership.partnerId === user?.id ? partnership.requesterId : partnership.partnerId
    if (!isSupabaseConfigured || !partnerId) return

    const channel = supabase
      .channel(`partner-activity-${partnerId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "progress",
          filter: `user_id=eq.${partnerId}`,
        },
        () => {
          const current = readPartnerSnapshot()
          if (!current) return
          writePartnerSnapshot({
            ...current,
            doneToday: true,
            streak: current.streak + 1,
            lastActiveAt: new Date().toISOString(),
          })
          toast.info(`${current.name} just completed their task! Your turn 🔥`)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id, toast])

  // Auto-recalibrate when the user has missed 3+ days while their streak
  // was still alive — keeps them on track without a manual fix.
  const [recalBanner, setRecalBanner] = useState<{ deadline: string } | null>(null)
  const [recalBannerHidden, setRecalBannerHidden] = useState(false)
  useEffect(() => {
    let cancelled = false
    if (!shouldAutoRecalibrate()) return
    try {
      const flag = window.sessionStorage.getItem("scholify-auto-recal-done")
      if (flag === "1") return
    } catch {
      /* ignore */
    }
    ;(async () => {
      const result = await recalibratePlan({ reason: "missed_days" })
      if (cancelled || !result) return
      try {
        window.sessionStorage.setItem("scholify-auto-recal-done", "1")
      } catch {
        /* ignore */
      }
      setRecalBanner({ deadline: result.plan.deadline ?? "" })
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const firstName = (user?.user_metadata?.first_name as string) || "there"
  const goal = plan.goal?.trim() || "Your learning goal"
  const dailyMinutes = Math.max(5, Number(plan.daily_minutes) || 20)
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []

  const today = useMemo(() => new Date(), [])
  const todayStr = format(today, "yyyy-MM-dd")
  const deadline = plan.deadline ? new Date(plan.deadline) : null
  const daysRemaining =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(0, differenceInCalendarDays(deadline, today))
      : Math.max(0, (tasks.length || 30) - progress.completed.length)

  const doneToday = progress.lastDate === todayStr
  const currentDay = doneToday
    ? Math.max(1, progress.completed.length)
    : progress.completed.length + 1
  const totalDays = Math.max(currentDay, daysRemaining + progress.completed.length, tasks.length, 1)
  const goalPct = Math.round((progress.completed.length / totalDays) * 100)

  useEffect(() => {
    if (doneToday) setStatus("done")
  }, [doneToday])

  // Fire once per visit — powers Day-N retention analysis.
  const viewTrackedRef = useRef(false)
  useEffect(() => {
    if (viewTrackedRef.current) return
    viewTrackedRef.current = true
    trackEvent("dashboard_viewed", { day_number: currentDay })
  }, [currentDay])

  const fallbackTask: PlanTask = {
    day_number: currentDay,
    week_number: Math.floor((currentDay - 1) / 7) + 1,
    task_title: "Start with one focused session",
    task_description:
      "Open your goal, find the very first thing you don't yet know, and give it one full focused block. Momentum is the whole game today.",
    estimated_minutes: dailyMinutes,
    resource_type: "practice",
  }
  const task: PlanTask =
    tasks.length > 0 ? tasks[Math.min(currentDay, tasks.length) - 1] : fallbackTask
  const resType = RESOURCE[task.resource_type] ?? RESOURCE.practice
  const isDone = status === "done"

  const handleComplete = useCallback(async () => {
    if (status !== "idle") return
    setStatus("loading")

    const next: Progress = {
      completed: progress.completed.includes(currentDay)
        ? progress.completed
        : [...progress.completed, currentDay],
      streak: progress.streak + 1,
      shields: progress.shields,
      lastDate: todayStr,
    }

    if (isSupabaseConfigured && user) {
      await supabase
        .from("progress")
        .insert({
          user_id: user.id,
          day_number: currentDay,
          completed_at: new Date().toISOString(),
        })
        .then(
          () => {},
          () => {},
        )
    }

    await new Promise((r) => setTimeout(r, 850))

    writeProgress(next)
    setProgress(next)
    setStatus("done")

    // Decorative — never let a confetti failure surface after the day is
    // already saved.
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#8B5CF6", "#F472B6", "#38BDF8", "#34D399"],
      })
    } catch {
      /* canvas-confetti unsupported in this environment — non-fatal */
    }

    trackEvent("task_completed", { day_number: currentDay, streak: next.streak })

    // Nudge the user to share their streak (capture the moment of pride).
    toast.action(
      `Day ${currentDay} complete! 🔥`,
      "Share your streak →",
      () => navigate("/progress"),
    )

    // A new completion may cross a 7 / 14 / 21-day streak milestone.
    checkPaywallTrigger(user?.id)

    // Broadcast the completion to every Study Room this user is part of,
    // and to the Community feed when the user has opted in.
    {
      const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
      const name = (meta.first_name || "").trim() || user?.email?.split("@")[0] || "Someone"
      notifyRoomsOnCompletion({
        userId: user?.id || "demo-user",
        userName: name,
        dayNumber: currentDay,
        streak: next.streak,
      })

      // Compute whether this completion closes a 7-day week (any "Day N
      // where N % 7 === 0" or the last day of the plan).
      const weekJustCompleted =
        currentDay > 0 && currentDay % 7 === 0 ? Math.ceil(currentDay / 7) : undefined
      maybeAutoPost({
        userId: user?.id || "demo-user",
        authorName: displayNameFromAuth({
          firstName: meta.first_name,
          lastName: meta.last_name,
          email: user?.email || undefined,
        }),
        goal,
        newStreak: next.streak,
        completedDay: currentDay,
        totalDays: totalDays,
        weekJustCompleted,
      })
    }

    // After Day 7+, one-time community opt-in prompt (deferred so the
    // paywall modal — if any — closes first).
    if (shouldShowOptInPrompt(next.streak) && !hasShownOptInPrompt()) {
      window.setTimeout(() => setShowCommunityOptIn(true), 1800)
    }

    // Streak tree milestone — fire-and-forget Fal generation, show
    // the growth overlay regardless (SVG fallback if no key).
    {
      const hit = treeMilestoneHit(progress.streak, next.streak)
      if (hit) {
        const meta = (user?.user_metadata || {}) as { first_name?: string; last_name?: string }
        const name = (meta.first_name || "").trim() || user?.email?.split("@")[0] || "Learner"
        ensureTreeForMilestone({
          milestone: hit,
          userName: name,
          goal,
        }).then(() => {
          window.setTimeout(() => setTreeMilestone(hit), 1600)
        })
        // Light a toast immediately so the user knows something is coming.
        toast.success("Your streak tree grew 🌳")
      }
      void TREE_MILESTONES // reference so import isn't unused
    }

    // XP + challenge progress.
    {
      const completionMeta = recordTaskCompletionTime(new Date())
      const result = applyEvent({
        kind: "task_complete",
        minutes: task.estimated_minutes || dailyMinutes,
        sameTime: completionMeta.sameTime,
        morning: completionMeta.morning,
        newStreak: next.streak,
      })
      if (result.xpGained > 0) {
        toast.success(`+${result.xpGained} XP ⚡`)
      }
      for (const c of result.completedChallenges) {
        toast.success(`Challenge complete! +${c.xpReward} XP ⚡`)
      }
      if (result.leveledUp && result.newLevel) {
        // Defer so the existing celebrations don't fight for the screen.
        window.setTimeout(() => setLevelUp(result.newLevel ?? null), 1200)
      }
    }

    // Invite the user to turn on daily reminders (once, after a completion).
    if (shouldShowNotificationPrompt()) {
      setTimeout(() => setShowNotifPrompt(true), 1300)
    }

    // Auto-sync the next day's task to the user's calendar.
    if (user?.id) {
      const account = await loadCalendarAccount(user.id)
      const nextDay = currentDay + 1
      const nextTask =
        tasks.length > 0 ? tasks[Math.min(nextDay, tasks.length) - 1] : null
      if (
        account?.calendar_sync_enabled &&
        account?.auto_sync &&
        account.google_access_token &&
        nextTask
      ) {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        syncSingleTask(account, nextTask, tomorrow, dailyMinutes).catch(() => {
          /* best-effort */
        })
      }
    }
  }, [
    status,
    progress,
    currentDay,
    todayStr,
    user,
    checkPaywallTrigger,
    tasks,
    today,
    dailyMinutes,
  ])

  // Lara's coaching message — generated by Claude (server-side), cached
  // per day so the dashboard doesn't re-call the API on every mount.
  const laraFallback = isDone
    ? `That's day ${currentDay} done — your streak is now ${progress.streak}. Showing up beats motivation every time. Rest well; tomorrow's task is ready when you are.`
    : `You're on day ${currentDay} of your "${goal}" journey. Today's task builds straight on what you've already done — ${dailyMinutes} focused minutes and you've kept the chain alive. Let's go.`
  const [laraMessage, setLaraMessage] = useState("")
  const [laraLoading, setLaraLoading] = useState(true)
  const [resource, setResource] = useState<{ title: string; url: string } | null>(null)
  const typed = useTypewriter(laraMessage, 30)

  // Fire once when Lara's coaching message becomes visible.
  const laraViewedRef = useRef(false)
  useEffect(() => {
    if (laraViewedRef.current || laraLoading || !laraMessage) return
    laraViewedRef.current = true
    trackEvent("lara_message_viewed")
  }, [laraLoading, laraMessage])

  useEffect(() => {
    let cancelled = false
    const cacheKey = `scholify-lara-${todayStr}-${isDone ? 1 : 0}`
    let cached: string | null = null
    try {
      cached = window.localStorage.getItem(cacheKey)
    } catch {
      cached = null
    }
    if (cached) {
      setLaraMessage(cached)
      setLaraLoading(false)
      return
    }
    setLaraLoading(true)
    const yesterdayNote =
      currentDay > 1 ? progress.notes?.[currentDay - 1] : undefined
    api
      .getLaraMessage({
        userName: firstName,
        streak: progress.streak,
        goal,
        taskTitle: task.task_title,
        estimatedMinutes: task.estimated_minutes || dailyMinutes,
        completedToday: isDone,
        totalSessions: progress.completed.length,
        totalMinutes: progress.completed.length * dailyMinutes,
        longestStreak: progress.streak,
        daysRemaining,
        userId: user?.id,
        yesterdayNote: yesterdayNote?.text,
        yesterdayMood: yesterdayNote?.mood ?? undefined,
      })
      .then((r) => {
        if (cancelled) return
        const msg = r.message || laraFallback
        setLaraMessage(msg)
        try {
          window.localStorage.setItem(cacheKey, msg)
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (!cancelled) setLaraMessage(laraFallback)
      })
      .finally(() => {
        if (!cancelled) setLaraLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone, task.task_title, todayStr])

  // Best resource for today's task — Perplexity (server-side), cached per task.
  useEffect(() => {
    let cancelled = false
    const cacheKey = `scholify-resource-${task.task_title}`
    try {
      const c = window.localStorage.getItem(cacheKey)
      if (c) {
        setResource(JSON.parse(c))
        return
      }
    } catch {
      /* ignore */
    }
    api
      .getBestResource({ taskTitle: task.task_title, goal, dayNumber: currentDay })
      .then((r) => {
        if (cancelled) return
        const res = { title: r.title, url: r.url }
        setResource(res)
        try {
          window.localStorage.setItem(cacheKey, JSON.stringify(res))
        } catch {
          /* ignore */
        }
        // Add to the user's resource library (de-duplicated by URL).
        try {
          addResource({
            plan_id: readActivePlanId(),
            task_title: task.task_title,
            resource_title: r.title,
            resource_url: r.url,
            resource_type: (task.resource_type as ResourceType) ?? "practice",
          })
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* keep the search-link fallback */
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.task_title])

  const hour = today.getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  const cardStyle: CSSProperties = {
    background: "var(--sch-card)",
    border: "1px solid rgba(139,92,246,0.2)",
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--sch-text)" }}>
              {greeting}, {firstName} 👋
            </h1>
            <div style={{ fontSize: 13, color: "var(--sch-tx-2)", marginTop: 2 }}>
              {format(today, "EEEE, MMMM d")}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["🔔", "⚙️"].map((icon, i) => (
              <button
                key={i}
                type="button"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--sch-card)",
                  border: "1px solid var(--sch-border)",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-recalibration banner */}
        <AnimatePresence>
          {recalBanner && !recalBannerHidden && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                <div style={{ fontSize: 13, color: "var(--sch-text)", lineHeight: 1.5 }}>
                  ✨ Lara adjusted your plan to keep you on track
                  {recalBanner.deadline
                    ? ` for ${format(new Date(recalBanner.deadline), "MMM d, yyyy")}`
                    : ""}
                  .
                </div>
                <button
                  type="button"
                  onClick={() => setRecalBannerHidden(true)}
                  aria-label="Dismiss"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--sch-tx-3)",
                    fontSize: 18,
                    cursor: "pointer",
                    lineHeight: 1,
                    padding: 4,
                  }}
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deadline countdown banner */}
        {plan.deadline && (
          <div style={{ marginTop: 16 }}>
            <DeadlineCountdown
              mode="compact"
              deadline={plan.deadline}
              goal={goal}
              percent={goalPct}
            />
          </div>
        )}

        {/* Weekly challenge banner — shows on Sundays when this week's quiz is unfinished */}
        <WeeklyQuizBanner />

        {/* Today's task card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...cardStyle,
            marginTop: 24,
            padding: 32,
            borderRadius: 24,
            boxShadow: "0 0 60px rgba(139,92,246,0.08)",
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <div>
              <Pill>
                {resType.icon} {resType.label}
              </Pill>
              <div style={{ fontSize: 12, color: "var(--sch-tx-2)", marginTop: 6 }}>
                Day {currentDay} of {totalDays}
              </div>
            </div>
            <Pill>⏱ {task.estimated_minutes || dailyMinutes} min</Pill>
          </div>

          {/* Title */}
          <h2
            style={{
              marginTop: 20,
              fontSize: "clamp(20px,2.5vw,26px)",
              fontWeight: 800,
              color: "var(--sch-text)",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            {task.task_title}
          </h2>

          {/* Description */}
          <p
            style={{
              marginTop: 12,
              fontSize: 15,
              color: "var(--sch-tx-2)",
              lineHeight: 1.7,
              maxWidth: 600,
            }}
          >
            {task.task_description}
          </p>

          {!isDone && (
            <FocusTimer
              taskKey={`${todayStr}-${task.task_title}`}
              onMarkComplete={() => {
                void handleComplete()
              }}
            />
          )}

          <div style={{ height: 1, background: "var(--sch-hairline)", margin: "20px 0" }} />

          {/* Progress row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: "var(--sch-tx-2)",
              marginBottom: 10,
            }}
          >
            <span>{goalPct}% complete</span>
            <span>{daysRemaining} days remaining</span>
          </div>
          <ProgressBar pct={goalPct} />

          {/* Best resource */}
          <a
            href={resource?.url ?? resourceUrl(task)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("resource_link_clicked")}
            style={{ textDecoration: "none", display: "block", marginTop: 20 }}
          >
            <div style={{ fontSize: 12, color: "var(--sch-tx-2)", marginBottom: 8 }}>
              📌 Best resource today
            </div>
            <motion.div
              whileHover={{ scale: 1.01, boxShadow: "0 0 24px rgba(139,92,246,0.2)" }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--sch-card)",
                border: "1px solid var(--sch-border)",
                fontSize: 13,
              }}
            >
              <span
                style={{
                  color: "var(--sch-tx-1)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {resType.icon} {resource ? resource.title : `Curated for: ${task.task_title}`}
              </span>
              <span style={{ color: "rgba(139,92,246,0.9)", flexShrink: 0, fontWeight: 600 }}>
                → Open
              </span>
            </motion.div>
          </a>

          {/* Speaking practice — Pro feature */}
          <motion.button
            type="button"
            onClick={() => {
              if (isPaid) setSpeakingOpen(true)
              else triggerFeaturePaywall()
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              marginTop: 16,
              padding: "12px 16px",
              borderRadius: 14,
              border: "1px solid rgba(139,92,246,0.25)",
              background: "rgba(139,92,246,0.06)",
              color: "var(--sch-text)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              🎤 Speaking Practice
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: 8,
                  background: "rgba(139,92,246,0.18)",
                  color: "#C084FC",
                  letterSpacing: "0.04em",
                }}
              >
                PRO
              </span>
            </span>
            <span style={{ fontSize: 13, color: "var(--sch-tx-3)" }}>
              Explain it out loud →
            </span>
          </motion.button>

          {/* Mark complete */}
          <motion.button
            type="button"
            onClick={handleComplete}
            disabled={status !== "idle"}
            whileHover={
              status === "idle"
                ? { scale: 1.02, boxShadow: "0 0 60px rgba(139,92,246,0.4)" }
                : undefined
            }
            whileTap={status === "idle" ? { scale: 0.98 } : undefined}
            style={{
              width: "100%",
              height: 56,
              marginTop: 24,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              cursor: status === "idle" ? "pointer" : "default",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              opacity: status === "loading" ? 0.7 : 1,
              background: isDone
                ? "linear-gradient(135deg,rgba(52,211,153,0.7),rgba(16,185,129,0.7))"
                : "linear-gradient(135deg,rgba(139,92,246,0.7),rgba(99,102,241,0.7))",
              border: `1px solid ${isDone ? "rgba(52,211,153,0.5)" : "rgba(139,92,246,0.5)"}`,
              boxShadow: isDone
                ? "0 0 40px rgba(52,211,153,0.2)"
                : "0 0 40px rgba(139,92,246,0.25)",
            }}
          >
            {status === "loading" && (
              <span
                aria-hidden
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.35)",
                  borderTopColor: "#fff",
                  animation: "dash-spin 0.6s linear infinite",
                }}
              />
            )}
            {status === "idle" && "Mark Today Complete ✓"}
            {status === "loading" && "Saving..."}
            {status === "done" && "✅ Done for today!"}
          </motion.button>
        </motion.div>

          {/* Optional photo evidence — pill below the Mark Complete button */}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
            <PhotoEvidence
              alwaysShow
              dayNumber={currentDay}
              taskTitle={task.task_title}
              goal={goal}
            />
          </div>

        {/* Lara message card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 20,
            padding: 24,
            borderRadius: 20,
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: IRIDESCENT,
                  border: "2px solid rgba(139,92,246,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                L
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(192,132,252,0.7)" }}>
                Lara · Your coach
              </span>
            </div>
            <button
              type="button"
              onClick={triggerFeaturePaywall}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                color: "var(--sch-tx-3)",
              }}
              title="Voice playback — a Pro feature"
            >
              ▶ Hear Lara
            </button>
          </div>
          <p
            style={{
              marginTop: 12,
              fontSize: 15,
              color: "var(--sch-tx-1)",
              lineHeight: 1.7,
              fontStyle: "italic",
              minHeight: 52,
            }}
          >
            {laraLoading ? (
              <TypingDots />
            ) : (
              <>
                {typed}
                <span style={{ opacity: typed.length < laraMessage.length ? 1 : 0 }}>▌</span>
              </>
            )}
          </p>
        </motion.div>

        {/* At-a-glance status across connected features */}
        <div style={{ marginTop: 20 }}>
          <IntegrationStrip />
        </div>

        {/* Smart plan suggestions — only renders after 14 completed sessions */}
        <div style={{ marginTop: 20 }}>
          <SmartSuggestions />
        </div>

        {/* This week's challenges (compact) */}
        <div style={{ marginTop: 20 }}>
          <ChallengeWidget />
        </div>

        {/* Accountability partner — only renders when a partnership is active */}
        <div style={{ marginTop: 20 }}>
          <PartnerCard variant="compact" />
        </div>

        {/* Session notes — only after the user marks today complete */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              key="session-notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: 20 }}
            >
              <SessionNotes
                dayNumber={currentDay}
                planId={readActivePlanId()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats row */}
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 12,
          }}
        >
          <StatCard label="🔥 Current Streak" value={`${progress.streak}`} />
          <StatCard label="✅ Total Sessions" value={`${progress.completed.length}`} />
          <StatCard
            label="⏱ Time Invested"
            value={formatTime(progress.completed.length * dailyMinutes)}
          />
          <StatCard label="🎯 Goal Progress" value={`${goalPct}%`} />
        </div>
      </div>

      <PaywallModal open={showPaywall} type={paywallType} onClose={closePaywall} />

      <AnimatePresence>
        {showNotifPrompt && (
          <NotificationPrompt userId={user?.id} onClose={() => setShowNotifPrompt(false)} />
        )}
      </AnimatePresence>

      {showWelcome && <WelcomeChecklist onDismiss={() => setShowWelcome(false)} />}

      {levelUp && <LevelUpOverlay newLevel={levelUp} onClose={() => setLevelUp(null)} />}

      {treeMilestone !== null && (
        <TreeGrowthOverlay milestone={treeMilestone} onClose={() => setTreeMilestone(null)} />
      )}

      <AnimatePresence>
        {showCommunityOptIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5,5,8,0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              zIndex: 100,
              display: "grid",
              placeItems: "center",
              padding: 16,
            }}
            onClick={() => setShowCommunityOptIn(false)}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 520 }}>
              <CommunityOptInCard onChange={() => setShowCommunityOptIn(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpeakingPractice
        open={speakingOpen}
        onClose={() => setSpeakingOpen(false)}
        taskTitle={task.task_title}
        goal={goal}
        dayNumber={currentDay}
        planId={readActivePlanId()}
      />

      {/* Floating Lara chat button */}
      <motion.button
        type="button"
        aria-label="Ask Lara"
        onClick={() => navigate("/chat")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 4px 20px rgba(139,92,246,0.35)",
            "0 4px 30px rgba(139,92,246,0.55)",
            "0 4px 20px rgba(139,92,246,0.35)",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          right: 20,
          bottom: 90,
          zIndex: 100,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          background: IRIDESCENT,
          color: "#fff",
          fontSize: 20,
          fontWeight: 800,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        L
      </motion.button>
    </DashboardLayout>
  )
}
