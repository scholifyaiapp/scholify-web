import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/*
 * An animated month calendar for the onboarding "when is your exam?" step.
 * Two modes:
 *   - interactive (onSelect given): tap a day to set the target date; month
 *     navigation enabled; past days disabled.
 *   - read-only (no onSelect): shows a fixed target month, used to preview a
 *     chosen fixed sitting and highlight its exam week.
 * The target day springs in via a shared-layout ring; the month slides on
 * change; a "days to prepare" countdown re-pops when the target moves.
 * All motion is disabled under prefers-reduced-motion.
 */

const INK = "#14141A"
const MUTED = "#7A7168"
const FAINT = "#A79E96"
const RED = "#C80000"
const BORDER = "#ECE4DE"
const CARD = "#FFFFFF"

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const pad = (n: number) => `${n}`.padStart(2, "0")
const toYMD = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const parseYMD = (s: string): { y: number; m: number; d: number } | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "")
  return m ? { y: +m[1], m: +m[2] - 1, d: +m[3] } : null
}
const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate()
// Monday-first weekday index (0 = Monday … 6 = Sunday) of the 1st of the month.
const firstMondayIndex = (y: number, m: number) => (new Date(y, m, 1).getDay() + 6) % 7
const todayMidnight = () => {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}
const dayDiff = (fromYMD: string, target: { y: number; m: number; d: number }) => {
  const from = todayMidnight()
  const to = new Date(target.y, target.m, target.d)
  void fromYMD
  return Math.round((to.getTime() - from.getTime()) / 86400000)
}

export interface ExamCalendarProps {
  /** Selected/target date, "yyyy-mm-dd". Empty in interactive mode = nothing picked yet. */
  value: string
  /** Provide to make days tappable (interactive picker). Omit for read-only preview. */
  onSelect?: (date: string) => void
  /** Highlight the Mon–Fri exam week containing `value` (fixed sittings). */
  highlightWeek?: boolean
}

export function ExamCalendar({ value, onSelect, highlightWeek }: ExamCalendarProps) {
  const reduce = useReducedMotion()
  const interactive = typeof onSelect === "function"
  const today = todayMidnight()

  const target = parseYMD(value)
  const initial = target ?? { y: today.getFullYear(), m: today.getMonth(), d: today.getDate() }
  const [view, setView] = useState({ y: initial.y, m: initial.m })
  const [dir, setDir] = useState(0)

  // Follow the target into view when it changes (e.g. a sitting is picked).
  useEffect(() => {
    if (!target) return
    setView((prev) => {
      if (prev.y === target.y && prev.m === target.m) return prev
      setDir(target.y * 12 + target.m > prev.y * 12 + prev.m ? 1 : -1)
      return { y: target.y, m: target.m }
    })
  }, [target?.y, target?.m]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = (delta: number) => {
    setDir(delta)
    setView((p) => {
      const idx = p.y * 12 + p.m + delta
      return { y: Math.floor(idx / 12), m: ((idx % 12) + 12) % 12 }
    })
  }

  const thisMonthIdx = today.getFullYear() * 12 + today.getMonth()
  const viewIdx = view.y * 12 + view.m
  const canGoBack = interactive && viewIdx > thisMonthIdx

  // Exam-week band (Mon–Fri) day numbers, when previewing a fixed sitting.
  let weekDays: Set<number> | null = null
  if (highlightWeek && target && target.y === view.y && target.m === view.m) {
    const mon = target.d - ((new Date(target.y, target.m, target.d).getDay() + 6) % 7)
    weekDays = new Set([mon, mon + 1, mon + 2, mon + 3, mon + 4].filter((d) => d >= 1 && d <= daysInMonth(view.y, view.m)))
  }

  const lead = firstMondayIndex(view.y, view.m)
  const total = daysInMonth(view.y, view.m)
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  const diff = target ? dayDiff(value, target) : null
  const countdown =
    diff === null ? "" : diff > 1 ? `${diff} days to prepare` : diff === 1 ? "Tomorrow — good luck" : diff === 0 ? "Exam day — you've got this" : "Date has passed"

  return (
    <div style={{ width: "100%", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 16, boxShadow: "0 8px 24px -16px rgba(20,20,26,0.25)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        {interactive ? (
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => canGoBack && go(-1)}
            disabled={!canGoBack}
            style={{ width: 30, height: 30, borderRadius: 9, border: `1px solid ${BORDER}`, background: CARD, display: "grid", placeItems: "center", cursor: canGoBack ? "pointer" : "not-allowed", opacity: canGoBack ? 1 : 0.35 }}
          >
            <ChevronLeft size={16} color={INK} />
          </button>
        ) : (
          <span style={{ width: 30 }} />
        )}

        <div style={{ position: "relative", overflow: "hidden", flex: 1, textAlign: "center", height: 24 }}>
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={`${view.y}-${view.m}`}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: dir >= 0 ? 10 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: dir >= 0 ? -10 : 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0, font: `700 15px/24px "Plus Jakarta Sans", sans-serif`, color: INK }}
            >
              {MONTH_NAMES[view.m]} {view.y}
            </motion.div>
          </AnimatePresence>
        </div>

        {interactive ? (
          <button
            type="button"
            aria-label="Next month"
            onClick={() => go(1)}
            style={{ width: 30, height: 30, borderRadius: 9, border: `1px solid ${BORDER}`, background: CARD, display: "grid", placeItems: "center", cursor: "pointer" }}
          >
            <ChevronRight size={16} color={INK} />
          </button>
        ) : (
          <span style={{ width: 30 }} />
        )}
      </div>

      {/* weekday header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {WEEKDAYS.map((w) => (
          <div key={w} style={{ textAlign: "center", font: `600 10px/1 "JetBrains Mono", monospace`, letterSpacing: "0.06em", color: FAINT, padding: "4px 0" }}>
            {w}
          </div>
        ))}
      </div>

      {/* day grid */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${view.y}-${view.m}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -dir * 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}
          >
            {cells.map((d, i) => {
              if (d === null) return <span key={`b${i}`} style={{ aspectRatio: "1 / 1" }} />
              const isTarget = !!target && target.y === view.y && target.m === view.m && target.d === d
              const inWeek = weekDays?.has(d) ?? false
              const cellDate = new Date(view.y, view.m, d)
              const isPast = cellDate.getTime() < today.getTime()
              const isToday = cellDate.getTime() === today.getTime()
              const disabled = interactive && isPast
              return (
                <button
                  key={d}
                  type="button"
                  disabled={disabled}
                  onClick={() => interactive && !disabled && onSelect?.(toYMD(view.y, view.m, d))}
                  aria-label={`${d} ${MONTH_NAMES[view.m]} ${view.y}${isTarget ? " — selected exam date" : ""}`}
                  aria-pressed={isTarget}
                  style={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    display: "grid",
                    placeItems: "center",
                    border: "none",
                    borderRadius: 10,
                    background: inWeek && !isTarget ? "rgba(200,0,0,0.07)" : "transparent",
                    cursor: interactive && !disabled ? "pointer" : "default",
                    font: `${isTarget ? 700 : 500} 13px/1 "Plus Jakarta Sans", sans-serif`,
                    color: isTarget ? "#fff" : disabled ? "#D5CCC3" : isToday ? RED : INK,
                    zIndex: isTarget ? 2 : 1,
                  }}
                >
                  {isTarget && (
                    <motion.span
                      layoutId="exam-target-ring"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30 }}
                      style={{ position: "absolute", inset: 3, borderRadius: 10, background: RED, boxShadow: "0 6px 16px -6px rgba(200,0,0,0.55)", zIndex: -1 }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{d}</span>
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* countdown */}
      <div style={{ marginTop: 12, minHeight: 22, textAlign: "center" }}>
        <AnimatePresence mode="wait">
          {countdown && (
            <motion.div
              key={value + countdown}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, font: `600 12.5px/1 "Plus Jakarta Sans", sans-serif`, color: diff !== null && diff < 0 ? MUTED : RED }}
            >
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: RED, display: "inline-block" }}
              />
              {countdown}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
