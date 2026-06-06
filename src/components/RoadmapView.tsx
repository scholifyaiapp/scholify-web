import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  RESOURCE,
  type PlanTask,
  type Progress,
  type ResourceType,
  type StoredPlan,
} from "@/lib/scholify-data"
import PhaseCard, { type Phase, type PhaseNumber } from "@/components/PhaseCard"

/* ──────────────────────────────────────────────────────────────────────
 *  RoadmapView — bird's-eye visual timeline of the entire learning plan.
 *  Horizontal-scroll on desktop, accordion vertical-stack on mobile.
 * ────────────────────────────────────────────────────────────────────── */

const TEXT_PRIMARY = "var(--sch-text)"
const TEXT_MUTED = "var(--sch-tx-2)"
const TEXT_DIM = "var(--sch-tx-3)"

/* ── Types + grouping ────────────────────────────────────────────────── */

type TaskStatus = "completed" | "current" | "upcoming" | "missed"

interface AugmentedTask extends PlanTask {
  status: TaskStatus
  isMilestone: boolean
  milestoneLabel?: string
}

interface PhaseGroup {
  phase: Phase
  weeks: Map<number, AugmentedTask[]>
  isCurrent: boolean
}

const MILESTONE_DAYS: Record<number, string> = {
  7: "🔥 Day 7 — Habit forming!",
  14: "⭐ Day 14 — Two-week streak!",
  30: "💎 Day 30 — Full streak!",
  60: "🏔 Day 60 — Mastery building",
  90: "👑 Day 90 — Compounding now",
}

const PHASE_DEFS: Array<{
  number: PhaseNumber
  emoji: string
  name: string
  description: string
  weekFrom: number
  weekTo: number
}> = [
  { number: 1, emoji: "🌱", name: "Foundation", description: "Building the basics", weekFrom: 1, weekTo: 3 },
  { number: 2, emoji: "⚡", name: "Application", description: "Putting it into practice", weekFrom: 4, weekTo: 8 },
  { number: 3, emoji: "🏆", name: "Mastery", description: "Going deep", weekFrom: 9, weekTo: Infinity },
]

function phaseForWeek(week: number): PhaseNumber {
  if (week <= 3) return 1
  if (week <= 8) return 2
  return 3
}

function computeCurrentDay(progress: Progress, totalTasks: number): number {
  // The "current" day is the next un-completed day. If everything is
  // done, snap to one past the end so nothing renders as "today".
  const completedSet = new Set(progress.completed)
  let day = 1
  while (completedSet.has(day) && day <= totalTasks) day++
  return day
}

function buildPhases(plan: StoredPlan, progress: Progress): PhaseGroup[] {
  const tasks = (Array.isArray(plan.tasks) ? plan.tasks : []).slice().sort((a, b) => a.day_number - b.day_number)
  const completedSet = new Set(progress.completed)
  const currentDay = computeCurrentDay(progress, tasks.length)

  const augmented: AugmentedTask[] = tasks.map((t) => {
    let status: TaskStatus = "upcoming"
    if (completedSet.has(t.day_number)) status = "completed"
    else if (t.day_number === currentDay) status = "current"
    else if (t.day_number < currentDay) status = "missed"
    const milestoneLabel = MILESTONE_DAYS[t.day_number]
    return { ...t, status, isMilestone: !!milestoneLabel, milestoneLabel }
  })

  // Build phase groups → week buckets → augmented tasks.
  const groups: PhaseGroup[] = PHASE_DEFS.map((def) => {
    const phaseTasks = augmented.filter((t) => {
      const week = t.week_number || Math.ceil(t.day_number / 7)
      return week >= def.weekFrom && (def.weekTo === Infinity || week <= def.weekTo)
    })
    const weeks = new Map<number, AugmentedTask[]>()
    for (const t of phaseTasks) {
      const w = t.week_number || Math.ceil(t.day_number / 7)
      const list = weeks.get(w) || []
      list.push(t)
      weeks.set(w, list)
    }
    // Sort week buckets in ascending order.
    const sortedWeeks = new Map([...weeks.entries()].sort((a, b) => a[0] - b[0]))
    const completed = phaseTasks.filter((t) => t.status === "completed").length
    const isCurrent =
      phaseTasks.some((t) => t.status === "current") ||
      (phaseTasks.length > 0 && phaseForWeek(phaseTasks[phaseTasks.length - 1].week_number || 1) === def.number)

    const phase: Phase = {
      number: def.number,
      emoji: def.emoji,
      name: def.name,
      description: def.description,
      weekFrom: def.weekFrom,
      weekTo: def.weekTo === Infinity ? undefined : def.weekTo,
      tasksTotal: phaseTasks.length,
      tasksCompleted: completed,
    }
    return { phase, weeks: sortedWeeks, isCurrent: isCurrent && phaseTasks.length > 0 }
  })

  // Only one phase can be "current" — pick the one containing the current task.
  const currentTaskPhase = augmented.find((t) => t.status === "current")
  if (currentTaskPhase) {
    const target = phaseForWeek(currentTaskPhase.week_number || Math.ceil(currentTaskPhase.day_number / 7))
    for (const g of groups) g.isCurrent = g.phase.number === target
  } else {
    for (const g of groups) g.isCurrent = false
  }

  return groups.filter((g) => g.phase.tasksTotal > 0)
}

/* ── Top-level component ─────────────────────────────────────────────── */

export default function RoadmapView({
  plan,
  progress,
}: {
  plan: StoredPlan
  progress: Progress
}) {
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : []
  const totalTasks = tasks.length
  const completedCount = progress.completed.length
  const currentDay = useMemo(() => computeCurrentDay(progress, totalTasks), [progress, totalTasks])
  const groups = useMemo(() => buildPhases(plan, progress), [plan, progress])

  const isMobile = useIsMobile()
  const scrollerRef = useRef<HTMLDivElement>(null)

  // On mount, scroll the current week into view (desktop only).
  useEffect(() => {
    if (isMobile) return
    const el = scrollerRef.current
    if (!el) return
    const t = window.setTimeout(() => {
      const node = el.querySelector<HTMLElement>('[data-current="true"]')
      if (node) {
        const elRect = el.getBoundingClientRect()
        const nodeRect = node.getBoundingClientRect()
        const offset = nodeRect.left - elRect.left - el.clientWidth / 2 + nodeRect.width / 2
        el.scrollTo({ left: el.scrollLeft + offset, behavior: "smooth" })
      }
    }, 300)
    return () => window.clearTimeout(t)
  }, [isMobile, currentDay])

  // Mini-map click → scroll to nearest week.
  const onMiniMapClick = useCallback(
    (pct: number) => {
      const el = scrollerRef.current
      if (!el) return
      el.scrollTo({ left: el.scrollWidth * pct, behavior: "smooth" })
    },
    [],
  )

  const goalPct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 240px",
          gap: 18,
          alignItems: "flex-start",
        }}
      >
        {/* Timeline column */}
        <div style={{ minWidth: 0 }}>
          {/* Current-position sticky pill (mobile) */}
          {isMobile && currentDay <= totalTasks && (
            <div
              style={{
                position: "sticky",
                top: 8,
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <CurrentPositionPill currentDay={currentDay} totalTasks={totalTasks} groups={groups} />
            </div>
          )}

          {isMobile ? (
            <MobileRoadmap groups={groups} />
          ) : (
            <DesktopRoadmap groups={groups} scrollerRef={scrollerRef} />
          )}

          {/* Mini map */}
          <div style={{ marginTop: 18 }}>
            <MiniMap
              groups={groups}
              totalTasks={totalTasks}
              completedCount={completedCount}
              currentDay={currentDay}
              onClickPct={onMiniMapClick}
            />
          </div>
        </div>

        {/* Progress summary (desktop sticky panel) */}
        {!isMobile && (
          <div style={{ position: "sticky", top: 90 }}>
            <ProgressSummary
              groups={groups}
              tasks={tasks}
              progress={progress}
              goalPct={goalPct}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Desktop horizontal timeline ─────────────────────────────────────── */

function DesktopRoadmap({
  groups,
  scrollerRef,
}: {
  groups: PhaseGroup[]
  scrollerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={scrollerRef as React.RefObject<HTMLDivElement>}
      className="dash-scroll"
      style={{
        overflowX: "auto",
        overflowY: "visible",
        paddingBottom: 20,
        position: "relative",
        scrollBehavior: "smooth",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "30px 8px 30px",
          minWidth: "max-content",
          alignItems: "flex-start",
        }}
      >
        {groups.map((g, i) => (
          <div key={g.phase.number} style={{ display: "flex", alignItems: "flex-start" }}>
            <PhaseSection group={g} />
            {i < groups.length - 1 && <PhaseConnector />}
          </div>
        ))}
      </div>
    </div>
  )
}

function PhaseSection({ group }: { group: PhaseGroup }) {
  const weeks = [...group.weeks.entries()]
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PhaseCard phase={group.phase} isCurrent={group.isCurrent} />
      <div style={{ display: "flex", gap: 12 }}>
        {weeks.map(([weekNum, tasks]) => (
          <WeekColumn key={weekNum} weekNumber={weekNum} tasks={tasks} />
        ))}
      </div>
    </div>
  )
}

function PhaseConnector() {
  return (
    <div
      aria-hidden
      style={{
        marginTop: 92,
        width: 40,
        flexShrink: 0,
        height: 2,
        background:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 12px)",
        borderRadius: 1,
      }}
    />
  )
}

/* ── Week column ─────────────────────────────────────────────────────── */

function WeekColumn({ weekNumber, tasks }: { weekNumber: number; tasks: AugmentedTask[] }) {
  const hasCurrent = tasks.some((t) => t.status === "current")
  return (
    <div
      data-current={hasCurrent ? "true" : undefined}
      style={{ width: 160, flexShrink: 0, position: "relative" }}
    >
      <p
        style={{
          fontSize: 12,
          color: TEXT_MUTED,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Week {weekNumber}
      </p>
      {/* Vertical connecting line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 32,
          bottom: 8,
          left: 5,
          width: 2,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 1,
        }}
      />
      <div style={{ position: "relative" }}>
        {tasks.map((t) => (
          <TaskNode key={t.day_number} task={t} />
        ))}
      </div>
    </div>
  )
}

/* ── Task node ───────────────────────────────────────────────────────── */

function TaskNode({ task }: { task: AugmentedTask }) {
  const [hovered, setHovered] = useState(false)
  const resourceMeta = RESOURCE[task.resource_type]
  const isCurrent = task.status === "current"
  const isCompleted = task.status === "completed"
  const isMissed = task.status === "missed"
  const isMilestone = task.isMilestone

  return (
    <div
      style={{ position: "relative", display: "flex", gap: 10, marginBottom: 12, cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Milestone floating label */}
      {isMilestone && task.milestoneLabel && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: 18,
            marginBottom: 4,
            padding: "2px 8px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 9.5,
            color: "#C084FC",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          {task.milestoneLabel}
        </div>
      )}

      {/* "You are here" floater */}
      {isCurrent && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "100%",
            left: -10,
            marginBottom: 8,
            padding: "3px 9px",
            borderRadius: 999,
            background: "rgba(10,10,20,0.85)",
            border: "1px solid rgba(167,139,250,0.45)",
            color: "var(--sch-text)",
            fontSize: 10.5,
            fontWeight: 700,
            whiteSpace: "nowrap",
            zIndex: 3,
            boxShadow: "0 6px 18px rgba(167,139,250,0.35)",
          }}
        >
          📍 You are here
        </motion.div>
      )}

      {/* Dot column */}
      <div style={{ width: 12, position: "relative", flexShrink: 0, marginTop: 2 }}>
        <Dot status={task.status} milestone={isMilestone} />
      </div>

      {/* Task body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 12,
            color: isCompleted || isCurrent ? TEXT_PRIMARY : isMissed ? "rgba(255,107,107,0.65)" : "var(--sch-tx-3)",
            fontWeight: isCurrent ? 700 : 500,
            lineHeight: 1.35,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {task.task_title}
        </p>
        <p style={{ marginTop: 4, fontSize: 10, color: TEXT_DIM, display: "flex", gap: 6, alignItems: "center" }}>
          <span aria-hidden>{resourceMeta?.icon || "✦"}</span>
          <span>{task.estimated_minutes} min</span>
        </p>
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={tooltipStyle}
          >
            <p style={{ fontSize: 11, color: TEXT_DIM }}>Day {task.day_number}</p>
            <p style={{ marginTop: 4, fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.35 }}>
              {task.task_title}
            </p>
            <p
              style={{
                marginTop: 6,
                fontSize: 12,
                color: TEXT_MUTED,
                lineHeight: 1.5,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {task.task_description}
            </p>
            <p style={{ marginTop: 8, fontSize: 11, fontWeight: 600, color: statusColor(task.status) }}>
              {statusLabel(task.status)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Dot({ status, milestone }: { status: TaskStatus; milestone: boolean }) {
  const size = milestone ? 18 : 12
  if (status === "completed") {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: IRIDESCENT,
          backgroundSize: "200% 200%",
          display: "grid",
          placeItems: "center",
          boxShadow: milestone ? "0 0 14px rgba(167,139,250,0.6)" : "none",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
      </div>
    )
  }
  if (status === "current") {
    return (
      <div style={{ position: "relative", width: size, height: size }}>
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: IRIDESCENT,
          }}
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid transparent",
            background: `${IRIDESCENT} border-box`,
            WebkitMask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: "50%",
            background: "#fff",
          }}
        />
      </div>
    )
  }
  if (status === "missed") {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "rgba(255,69,58,0.3)",
          border: "1px solid rgba(255,69,58,0.5)",
        }}
      />
    )
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "transparent",
        border: "1.5px solid rgba(255,255,255,0.12)",
      }}
    />
  )
}

function statusColor(status: TaskStatus): string {
  if (status === "completed") return "#34D399"
  if (status === "current") return "#C084FC"
  if (status === "missed") return "#FF6B6B"
  return TEXT_MUTED
}

function statusLabel(status: TaskStatus): string {
  if (status === "completed") return "Completed ✓"
  if (status === "current") return "Today!"
  if (status === "missed") return "Missed — pick up when you can"
  return "Upcoming"
}

/* ── Mobile vertical layout ──────────────────────────────────────────── */

function MobileRoadmap({ groups }: { groups: PhaseGroup[] }) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({})
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {groups.map((g) => {
        const isOpen = !collapsed[g.phase.number]
        return (
          <div key={g.phase.number}>
            <button
              onClick={() =>
                setCollapsed((prev) => ({ ...prev, [g.phase.number]: !prev[g.phase.number] }))
              }
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
              type="button"
              aria-expanded={isOpen}
            >
              <PhaseCard phase={g.phase} isCurrent={g.isCurrent} compact />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden", display: "grid", gap: 12 }}
                >
                  {[...g.weeks.entries()].map(([weekNum, tasks]) => (
                    <div key={weekNum}>
                      <p
                        style={{
                          fontSize: 11.5,
                          color: TEXT_MUTED,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        Week {weekNum}
                      </p>
                      <div style={{ position: "relative" }}>
                        <div
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: 6,
                            bottom: 6,
                            left: 5,
                            width: 2,
                            background: "rgba(255,255,255,0.06)",
                          }}
                        />
                        {tasks.map((t) => (
                          <TaskNode key={t.day_number} task={t} />
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ── Current-position sticky pill (mobile) ───────────────────────────── */

function CurrentPositionPill({
  currentDay,
  totalTasks,
  groups,
}: {
  currentDay: number
  totalTasks: number
  groups: PhaseGroup[]
}) {
  // Find the phase that contains the current day.
  let phaseNumber: PhaseNumber | null = null
  let weekNumber = 0
  for (const g of groups) {
    for (const [w, tasks] of g.weeks.entries()) {
      if (tasks.some((t) => t.day_number === currentDay)) {
        phaseNumber = g.phase.number
        weekNumber = w
      }
    }
  }
  if (!phaseNumber) return null
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 14px",
        borderRadius: 999,
        background: "rgba(10,10,20,0.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(167,139,250,0.4)",
        color: TEXT_PRIMARY,
        fontSize: 12,
        fontWeight: 700,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      📍 Day {currentDay} {totalTasks > 0 && `of ${totalTasks}`} · Week {weekNumber} · Phase {phaseNumber}
    </span>
  )
}

/* ── Mini-map ────────────────────────────────────────────────────────── */

function MiniMap({
  groups,
  totalTasks,
  completedCount,
  currentDay,
  onClickPct,
}: {
  groups: PhaseGroup[]
  totalTasks: number
  completedCount: number
  currentDay: number
  onClickPct: (pct: number) => void
}) {
  const completedPct = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0
  const currentPct = totalTasks > 0 ? ((currentDay - 1) / totalTasks) * 100 : 0

  // Phase divider percentages (where each phase ends).
  const dividers: number[] = []
  let runningCount = 0
  for (let i = 0; i < groups.length - 1; i++) {
    runningCount += groups[i].phase.tasksTotal
    if (totalTasks > 0) dividers.push((runningCount / totalTasks) * 100)
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onClickPct(pct)
  }

  return (
    <div>
      <div
        onClick={onClick}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={totalTasks}
        aria-valuenow={completedCount}
        style={{
          position: "relative",
          height: 12,
          borderRadius: 6,
          background: "rgba(255,255,255,0.04)",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Completed fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completedPct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: IRIDESCENT,
            backgroundSize: "200% 200%",
            borderRadius: 6,
          }}
        />
        {/* Phase dividers */}
        {dividers.map((pct, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${pct}%`,
              width: 1,
              background: "rgba(255,255,255,0.2)",
            }}
          />
        ))}
        {/* Current position dot */}
        {currentDay <= totalTasks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              position: "absolute",
              top: -2,
              left: `calc(${currentPct}% - 8px)`,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #A78BFA",
              boxShadow: "0 0 10px rgba(167,139,250,0.65)",
            }}
            aria-label="Current position"
          />
        )}
      </div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 10, color: TEXT_DIM }}>
        <span>Start</span>
        <span>
          Today · Day {currentDay}/{totalTasks}
        </span>
        <span>End</span>
      </div>
    </div>
  )
}

/* ── Right-side progress summary ─────────────────────────────────────── */

function ProgressSummary({
  groups,
  tasks,
  progress,
  goalPct,
}: {
  groups: PhaseGroup[]
  tasks: PlanTask[]
  progress: Progress
  goalPct: number
}) {
  const completedSet = new Set(progress.completed)
  const byType = useMemo(() => {
    const map: Partial<Record<ResourceType, number>> = {}
    for (const t of tasks) {
      if (!completedSet.has(t.day_number)) continue
      map[t.resource_type] = (map[t.resource_type] || 0) + 1
    }
    return Object.entries(map) as [ResourceType, number][]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, progress.completed.join(",")])

  return (
    <div
      style={{
        padding: 18,
        borderRadius: 18,
        background: "var(--sch-card, rgba(255,255,255,0.03))",
        border: "1px solid var(--sch-border, rgba(255,255,255,0.06))",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 700, color: TEXT_PRIMARY }}>Progress summary</p>

      {/* Big percentage */}
      <p
        style={{
          marginTop: 8,
          fontSize: 36,
          fontWeight: 800,
          lineHeight: 1,
          background: IRIDESCENT,
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {goalPct}%
      </p>
      <p style={{ marginTop: 4, fontSize: 12, color: TEXT_MUTED }}>of your plan complete</p>

      {/* Phase rows */}
      <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
        {groups.map((g) => {
          const pct =
            g.phase.tasksTotal > 0 ? Math.round((g.phase.tasksCompleted / g.phase.tasksTotal) * 100) : 0
          return (
            <div key={g.phase.number}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: TEXT_MUTED,
                  marginBottom: 4,
                }}
              >
                <span>
                  <span aria-hidden>{g.phase.emoji}</span> {g.phase.name}
                </span>
                <span style={{ fontVariantNumeric: "tabular-nums", color: TEXT_PRIMARY }}>
                  {g.phase.tasksCompleted}/{g.phase.tasksTotal}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", background: IRIDESCENT }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* By type breakdown */}
      {byType.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p
            style={{
              fontSize: 11,
              color: TEXT_DIM,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Completed by type
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
            {byType.map(([type, count]) => (
              <li
                key={type}
                style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: TEXT_MUTED }}
              >
                <span>
                  <span aria-hidden style={{ marginRight: 6 }}>
                    {RESOURCE[type].icon}
                  </span>
                  {RESOURCE[type].label}
                </span>
                <span style={{ color: TEXT_PRIMARY, fontVariantNumeric: "tabular-nums" }}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ── Styles ──────────────────────────────────────────────────────────── */

const tooltipStyle: CSSProperties = {
  position: "absolute",
  bottom: "calc(100% + 8px)",
  left: 20,
  minWidth: 220,
  maxWidth: 280,
  padding: 12,
  borderRadius: 12,
  background: "rgba(10,10,20,0.95)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  zIndex: 100,
  pointerEvents: "none",
}
