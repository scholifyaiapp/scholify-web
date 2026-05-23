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
import { differenceInCalendarDays, format } from "date-fns"
import { DashboardLayout, iriText, ProgressBar } from "@/components/dashboard-layout"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useToast } from "@/components/Toast"
import DeadlineCountdown from "@/components/DeadlineCountdown"
import {
  deletePlan,
  readActivePlanId,
  readPlans,
  readProgressForPlan,
  setActivePlan,
  updatePlan,
  type Progress,
  type StoredPlan,
} from "@/lib/scholify-data"
import { recalibratePlan } from "@/lib/recalibration"

/* ──────────────────────────────────────────────────────────────
 *  Scholify — Goals page.
 *
 *  Lists every plan the user has ever started. The "active" plan
 *  is what the Dashboard shows; switching is a one-click flow with
 *  a confirmation modal so the user understands the streak pause.
 * ────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const TEXT2 = "var(--sch-tx-2)"

interface PlanWithProgress {
  plan: StoredPlan
  progress: Progress
  daysRemaining: number
  totalDays: number
  goalPct: number
  currentDay: number
  isActive: boolean
}

function decoratePlan(plan: StoredPlan, activeId: string | null): PlanWithProgress {
  const progress = plan.id ? readProgressForPlan(plan.id) : ({} as Progress)
  const completed = Array.isArray(progress.completed) ? progress.completed : []
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const today = new Date()
  const deadline = plan.deadline ? new Date(plan.deadline) : null
  const daysRemaining =
    deadline && !Number.isNaN(deadline.getTime())
      ? Math.max(0, differenceInCalendarDays(deadline, today))
      : Math.max(0, (tasks.length || 30) - completed.length)
  const totalDays = Math.max(
    completed.length + daysRemaining,
    tasks.length,
    1,
  )
  const goalPct = Math.round((completed.length / totalDays) * 100)
  const currentDay = completed.length + 1
  return {
    plan,
    progress: progress ?? { completed: [], streak: 0, shields: 0, lastDate: null },
    daysRemaining,
    totalDays,
    goalPct,
    currentDay,
    isActive: !!plan.id && plan.id === activeId,
  }
}

function statusPill(plan: StoredPlan) {
  if (plan.status === "paused") {
    return {
      bg: "rgba(255,255,255,0.06)",
      fg: TEXT2,
      label: "Paused",
      border: "rgba(255,255,255,0.1)",
    }
  }
  if (plan.status === "completed") {
    return {
      bg: "rgba(251,191,36,0.12)",
      fg: "#FBBF24",
      label: "Completed",
      border: "rgba(251,191,36,0.35)",
    }
  }
  return {
    bg: "rgba(52,211,153,0.1)",
    fg: "#34D399",
    label: "Active",
    border: "rgba(52,211,153,0.3)",
  }
}

function pausedAgoLabel(plan: StoredPlan): string {
  if (!plan.paused_at) return ""
  try {
    const days = differenceInCalendarDays(new Date(), new Date(plan.paused_at))
    if (days <= 0) return "Paused today"
    return `Paused ${days} day${days === 1 ? "" : "s"} ago`
  } catch {
    return ""
  }
}

/* ── Cover art ───────────────────────────────────────────────── */

function GoalCover({ plan }: { plan: StoredPlan }) {
  const initial = (plan.goal || "?").trim().charAt(0).toUpperCase()
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: 12,
        background: plan.cover_color ?? IRIDESCENT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        fontWeight: 800,
        color: "#fff",
        flexShrink: 0,
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      }}
    >
      {initial}
    </div>
  )
}

/* ── ⋯ menu ─────────────────────────────────────────────────── */

function PlanMenu({
  plan,
  onAction,
}: {
  plan: StoredPlan
  onAction: (a: "pause" | "resume" | "recalibrate" | "delete") => void
}) {
  const [open, setOpen] = useState(false)
  const isActive = plan.status === "active"
  const isPaused = plan.status === "paused"

  return (
    <div style={{ position: "relative" }}>
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="More"
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          border: "1px solid var(--sch-border)",
          background: "var(--sch-card)",
          color: "var(--sch-tx-2)",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        ⋯
      </motion.button>
      <AnimatePresence>
        {open && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 40 }}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                minWidth: 180,
                padding: 6,
                borderRadius: 12,
                background: "var(--sch-bg-2)",
                border: "1px solid var(--sch-border-2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
                zIndex: 41,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {isActive && (
                <MenuItem
                  label="⏸ Pause"
                  onClick={() => {
                    onAction("pause")
                    setOpen(false)
                  }}
                />
              )}
              {isPaused && (
                <MenuItem
                  label="▶ Resume"
                  onClick={() => {
                    onAction("resume")
                    setOpen(false)
                  }}
                />
              )}
              <MenuItem
                label="✦ Recalibrate plan"
                onClick={() => {
                  onAction("recalibrate")
                  setOpen(false)
                }}
              />
              <MenuItem
                label="🗑 Delete"
                danger
                onClick={() => {
                  onAction("delete")
                  setOpen(false)
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuItem({
  label,
  onClick,
  danger,
}: {
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "9px 12px",
        borderRadius: 8,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 13,
        color: danger ? "rgba(255,69,58,0.85)" : "var(--sch-tx-1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = danger
          ? "rgba(255,69,58,0.08)"
          : "rgba(139,92,246,0.1)"
      }}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </button>
  )
}

/* ── Goal card ───────────────────────────────────────────────── */

function GoalCard({
  pwp,
  onContinue,
  onAction,
}: {
  pwp: PlanWithProgress
  onContinue: () => void
  onAction: (a: "pause" | "resume" | "recalibrate" | "delete") => void
}) {
  const pill = statusPill(pwp.plan)
  const isCompleted = pwp.plan.status === "completed"
  const isPaused = pwp.plan.status === "paused"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: EASE }}
      whileHover={{
        y: -4,
        borderColor: "rgba(139,92,246,0.3)",
        boxShadow: "0 8px 32px rgba(139,92,246,0.1)",
      }}
      style={{
        position: "relative",
        padding: 24,
        borderRadius: 20,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={onContinue}
    >
      {pwp.isActive && (
        <div
          aria-label="Active goal"
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#34D399",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#34D399",
              boxShadow: "0 0 8px rgba(52,211,153,0.7)",
            }}
          />
          Active
        </div>
      )}

      {/* Top row */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 14 }}>
        <GoalCover plan={pwp.plan} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--sch-text)",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {pwp.plan.goal || "Untitled goal"}
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "2px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              background: pill.bg,
              color: pill.fg,
              border: `1px solid ${pill.border}`,
            }}
          >
            {pill.label}
          </span>
        </div>
      </div>

      {/* Mini stats */}
      <div
        style={{
          display: "flex",
          marginTop: 18,
          background: "var(--sch-card-2)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {[
          { value: `Day ${pwp.currentDay}`, label: "current" },
          { value: `${pwp.goalPct}%`, label: "done" },
          {
            value: pwp.daysRemaining > 0 ? `${pwp.daysRemaining}d` : "—",
            label: "left",
          },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: "10px 6px",
              textAlign: "center",
              borderLeft: i === 0 ? "none" : "1px solid var(--sch-border)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, ...iriText }}>{s.value}</div>
            <div style={{ fontSize: 11, color: TEXT2, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 14 }}>
        <ProgressBar pct={pwp.goalPct} height={4} />
      </div>

      {/* Deadline row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          fontSize: 12,
        }}
      >
        <span style={{ color: TEXT2 }}>
          📅{" "}
          {pwp.plan.deadline
            ? format(new Date(pwp.plan.deadline), "MMM d, yyyy")
            : "Open-ended"}
        </span>
        {pwp.progress.streak > 0 && (
          <span style={{ color: "rgba(255,159,67,0.9)" }}>
            🔥 {pwp.progress.streak} day streak
          </span>
        )}
      </div>

      {/* Bottom action row */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {isCompleted ? (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                ...primaryBtn,
                background: "linear-gradient(135deg,#FBBF24,#F472B6)",
              }}
            >
              🏆 View certificate
            </motion.button>
            <button type="button" style={ghostBtn} onClick={onContinue}>
              Start again
            </button>
          </>
        ) : isPaused ? (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAction("resume")}
              style={primaryBtn}
            >
              Resume
            </motion.button>
            <span style={{ fontSize: 12, color: "var(--sch-tx-4)" }}>
              {pausedAgoLabel(pwp.plan)}
            </span>
          </>
        ) : (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              style={primaryBtn}
            >
              Continue →
            </motion.button>
            <PlanMenu plan={pwp.plan} onAction={onAction} />
          </>
        )}
      </div>
    </motion.div>
  )
}

const primaryBtn: CSSProperties = {
  padding: "9px 18px",
  borderRadius: 12,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 18px rgba(139,92,246,0.25)",
}

const ghostBtn: CSSProperties = {
  padding: "9px 16px",
  borderRadius: 12,
  border: "1px solid var(--sch-border)",
  background: "transparent",
  color: "var(--sch-tx-1)",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
}

/* ── Recalibration modal ─────────────────────────────────────── */

function RecalibrateModal({
  open,
  plan,
  onClose,
  onComplete,
}: {
  open: boolean
  plan: StoredPlan | null
  onClose: () => void
  onComplete: () => void
}) {
  const [deadline, setDeadline] = useState<string>(
    plan?.deadline ? plan.deadline.slice(0, 10) : "",
  )
  const [minutes, setMinutes] = useState<number>(plan?.daily_minutes ?? 20)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (open && plan) {
      setDeadline(plan.deadline ? plan.deadline.slice(0, 10) : "")
      setMinutes(plan.daily_minutes ?? 20)
    }
  }, [open, plan])

  const run = async () => {
    if (!plan?.id || busy) return
    setBusy(true)
    try {
      const newDeadlineIso = deadline ? new Date(deadline).toISOString() : null
      await recalibratePlan({
        planId: plan.id,
        newDeadline: newDeadlineIso,
        newDailyMinutes: minutes,
        reason: "manual",
      })
      onComplete()
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: "100%",
              maxWidth: 460,
              padding: 28,
              borderRadius: 24,
              background: "var(--sch-bg-2)",
              border: "1px solid var(--sch-border-2)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#F0EEFF",
              }}
            >
              Recalibrate Your Plan
            </h3>
            <p style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>
              Lara will rebuild your remaining tasks to match your current
              progress and deadline.
            </p>

            <div style={{ marginTop: 18 }}>
              <label style={labelStyle}>New deadline</label>
              <input
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <label style={labelStyle}>Daily minutes</label>
                <span style={{ fontSize: 13, color: "var(--sch-tx-1)" }}>
                  {minutes} min/day
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#A78BFA" }}
              />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button type="button" onClick={onClose} style={ghostBtn}>
                Cancel
              </button>
              <motion.button
                type="button"
                onClick={run}
                disabled={busy}
                whileHover={busy ? undefined : { scale: 1.02 }}
                whileTap={busy ? undefined : { scale: 0.98 }}
                style={{
                  ...primaryBtn,
                  flex: 1,
                  height: 44,
                  opacity: busy ? 0.85 : 1,
                  cursor: busy ? "wait" : "pointer",
                }}
              >
                {busy ? "Recalibrating…" : "Recalibrate ⚡"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const labelStyle: CSSProperties = {
  fontSize: 12,
  color: TEXT2,
  display: "block",
  marginBottom: 6,
}

const inputStyle: CSSProperties = {
  width: "100%",
  height: 44,
  padding: "0 14px",
  borderRadius: 12,
  fontSize: 14,
  color: "var(--sch-text)",
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  outline: "none",
  colorScheme: "dark",
}

/* ── Switch-active modal ─────────────────────────────────────── */

function SwitchModal({
  open,
  target,
  current,
  onCancel,
  onConfirm,
}: {
  open: boolean
  target: StoredPlan | null
  current: StoredPlan | null
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <AnimatePresence>
      {open && target && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 28,
              borderRadius: 22,
              background: "var(--sch-bg-2)",
              border: "1px solid var(--sch-border-2)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F0EEFF" }}>
              Switch to "{(target.goal || "this goal").slice(0, 60)}"?
            </h3>
            <p style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>
              {current
                ? `Your current streak on "${(current.goal || "your current goal").slice(0, 40)}" will be paused.`
                : "We'll make this your active learning plan."}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button type="button" onClick={onCancel} style={ghostBtn}>
                Keep current
              </button>
              <motion.button
                type="button"
                onClick={onConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ ...primaryBtn, flex: 1, height: 44 }}
              >
                Switch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Confirm delete ──────────────────────────────────────────── */

function ConfirmDelete({
  open,
  plan,
  onCancel,
  onConfirm,
}: {
  open: boolean
  plan: StoredPlan | null
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 28,
              borderRadius: 22,
              background: "var(--sch-bg-2)",
              border: "1px solid var(--sch-border-2)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#F0EEFF" }}>
              Delete this goal?
            </h3>
            <p style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>
              "{(plan.goal || "Untitled goal").slice(0, 60)}" and all its progress will be removed. This can't be undone.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button type="button" onClick={onCancel} style={ghostBtn}>
                Cancel
              </button>
              <motion.button
                type="button"
                onClick={onConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...primaryBtn,
                  flex: 1,
                  height: 44,
                  background: "linear-gradient(135deg,#FF6B5E,#FF453A)",
                }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Goals() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [plans, setPlans] = useState<StoredPlan[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [switchTarget, setSwitchTarget] = useState<StoredPlan | null>(null)
  const [recalibrateTarget, setRecalibrateTarget] = useState<StoredPlan | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<StoredPlan | null>(null)
  const focusedRef = useRef<StoredPlan | null>(null)

  const refresh = useCallback(() => {
    setPlans(readPlans())
    setActiveId(readActivePlanId())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const decorated = useMemo<PlanWithProgress[]>(
    () => plans.map((p) => decoratePlan(p, activeId)),
    [plans, activeId],
  )

  const activePlan = decorated.find((d) => d.isActive)?.plan ?? null
  const activeDecorated = decorated.find((d) => d.isActive) ?? null

  /* ── Handlers ── */

  const handleContinue = (plan: StoredPlan) => {
    if (!plan.id) return
    if (plan.id === activeId) {
      navigate("/dashboard")
      return
    }
    setSwitchTarget(plan)
  }

  const confirmSwitch = () => {
    if (!switchTarget?.id) return
    // Pause the current active before switching.
    if (activeId && activeId !== switchTarget.id) {
      updatePlan(activeId, { status: "paused", paused_at: new Date().toISOString() })
    }
    updatePlan(switchTarget.id, {
      status: "active",
      paused_at: null,
    })
    setActivePlan(switchTarget.id)
    setSwitchTarget(null)
    refresh()
    toast.success(`Switched to "${(switchTarget.goal || "").slice(0, 40)}"`)
    navigate("/dashboard")
  }

  const handleAction = (
    plan: StoredPlan,
    action: "pause" | "resume" | "recalibrate" | "delete",
  ) => {
    if (!plan.id) return
    if (action === "pause") {
      updatePlan(plan.id, {
        status: "paused",
        paused_at: new Date().toISOString(),
      })
      refresh()
      toast.info("Goal paused")
      return
    }
    if (action === "resume") {
      // Pause anything else currently active.
      if (activeId && activeId !== plan.id) {
        updatePlan(activeId, {
          status: "paused",
          paused_at: new Date().toISOString(),
        })
      }
      updatePlan(plan.id, { status: "active", paused_at: null })
      setActivePlan(plan.id)
      refresh()
      toast.success("Goal resumed")
      return
    }
    if (action === "recalibrate") {
      focusedRef.current = plan
      setRecalibrateTarget(plan)
      return
    }
    if (action === "delete") {
      setDeleteTarget(plan)
      return
    }
  }

  const onRecalibrateDone = () => {
    setRecalibrateTarget(null)
    refresh()
    toast.success("Plan recalibrated by Lara ✓")
    // If the recalibrated plan is active, return to the dashboard.
    if (focusedRef.current?.id === activeId) {
      navigate("/dashboard")
    }
  }

  const onConfirmDelete = () => {
    if (!deleteTarget?.id) return
    deletePlan(deleteTarget.id)
    setDeleteTarget(null)
    refresh()
    toast.info("Goal deleted")
  }

  const isEmpty = decorated.length === 0

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#F0EEFF",
              letterSpacing: "-0.4px",
            }}
          >
            My Learning Goals
          </h1>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/onboarding")}
            style={{
              padding: "9px 20px",
              borderRadius: 12,
              border: "none",
              background: IRIDESCENT,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 22px rgba(139,92,246,0.3)",
            }}
          >
            + New goal
          </motion.button>
        </div>

        {/* Active deadline countdown */}
        {activeDecorated && activeDecorated.plan.deadline && (
          <div style={{ marginTop: 20 }}>
            <DeadlineCountdown
              mode="full"
              deadline={activeDecorated.plan.deadline}
              goal={activeDecorated.plan.goal}
              percent={activeDecorated.goalPct}
              startedAt={activeDecorated.plan.started_at ?? activeDecorated.plan.created_at}
            />
          </div>
        )}

        {/* Goals grid */}
        {isEmpty ? (
          <EmptyState onCreate={() => navigate("/onboarding")} />
        ) : (
          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 16,
            }}
          >
            {decorated.map((d) => (
              <GoalCard
                key={d.plan.id}
                pwp={d}
                onContinue={() => handleContinue(d.plan)}
                onAction={(a) => handleAction(d.plan, a)}
              />
            ))}
          </div>
        )}
      </motion.div>

      <SwitchModal
        open={!!switchTarget}
        target={switchTarget}
        current={activePlan}
        onCancel={() => setSwitchTarget(null)}
        onConfirm={confirmSwitch}
      />

      <RecalibrateModal
        open={!!recalibrateTarget}
        plan={recalibrateTarget}
        onClose={() => setRecalibrateTarget(null)}
        onComplete={onRecalibrateDone}
      />

      <ConfirmDelete
        open={!!deleteTarget}
        plan={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={onConfirmDelete}
      />
    </DashboardLayout>
  )
}

/* ── Empty state ─────────────────────────────────────────────── */

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        marginTop: 60,
        padding: "48px 24px",
        borderRadius: 24,
        background: "var(--sch-card)",
        border: "1px solid var(--sch-border)",
        textAlign: "center",
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 72, opacity: 0.85 }}
      >
        🎯
      </motion.div>
      <div
        style={{
          marginTop: 8,
          fontSize: 18,
          fontWeight: 700,
          color: "#F0EEFF",
        }}
      >
        No goals yet.
      </div>
      <p
        style={{
          marginTop: 6,
          fontSize: 14,
          color: TEXT2,
          maxWidth: 320,
          marginInline: "auto",
        }}
      >
        Start your first learning goal — Lara will build the path for you.
      </p>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCreate}
        style={{
          ...primaryBtn,
          marginTop: 22,
          padding: "11px 22px",
          fontSize: 14,
        }}
      >
        + Create goal
      </motion.button>
    </motion.div>
  )
}
