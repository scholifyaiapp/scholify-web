import { useMemo, useState, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, type Variants } from "motion/react"
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  isBefore,
  differenceInCalendarDays,
} from "date-fns"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { IRIDESCENT } from "@/components/auth/auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  Scholify onboarding — the 4-step wizard after sign-up.
 *  Goal → Deadline → Daily time → Ready.
 * ────────────────────────────────────────────────────────────── */

const STEP_LABELS = ["Goal", "Deadline", "Daily time", "Ready"]

const iriText: CSSProperties = {
  background: IRIDESCENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
}

const OB_CSS = `
  .ob ::placeholder { color: rgba(240,238,255,0.15); }
  .ob-pill { transition: color .2s ease, border-color .2s ease, background .2s ease; }
  .ob-pill:hover { border-color: rgba(139,92,246,0.4) !important; color: rgba(240,238,255,0.9) !important; }
  .ob-cal-day { transition: background .15s ease, border-color .15s ease; }
  .ob-cal-day:hover { background: rgba(139,92,246,0.2) !important; border-color: rgba(139,92,246,0.3) !important; }
  .ob-arrow { transition: background .15s ease; }
  .ob-arrow:not(:disabled):hover { background: rgba(139,92,246,0.18) !important; }
  .ob-range { -webkit-appearance: none; appearance: none; background: transparent; outline: none; }
  .ob-range::-webkit-slider-thumb { -webkit-appearance: none; width: 34px; height: 34px; border-radius: 50%; cursor: grab; }
  .ob-range:active::-webkit-slider-thumb { cursor: grabbing; }
  .ob-range::-moz-range-thumb { width: 34px; height: 34px; border: none; background: transparent; cursor: grab; }
  @keyframes ob-spin { to { transform: rotate(360deg); } }
`

/* ── Progress bar ────────────────────────────────────────────── */

function ProgressBar({ step }: { step: number }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {STEP_LABELS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background:
                i === step
                  ? IRIDESCENT
                  : i < step
                    ? "rgba(139,92,246,0.4)"
                    : "rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              fontSize: 11,
              textAlign: "center",
              color:
                i === step
                  ? "rgba(240,238,255,0.8)"
                  : i < step
                    ? "rgba(240,238,255,0.45)"
                    : "rgba(240,238,255,0.2)",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Step header ─────────────────────────────────────────────── */

function StepHeader({
  step,
  line1,
  line2,
  subtitle,
}: {
  step: number
  line1: string
  line2: string
  subtitle?: string
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "rgba(139,92,246,0.6)",
          fontWeight: 600,
        }}
      >
        STEP {step} OF 4
      </div>
      <h1
        style={{
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "-1.5px",
          color: "#F0EEFF",
          marginTop: 14,
          lineHeight: 1.12,
        }}
      >
        {line1}
        <br />
        <span style={iriText}>{line2}</span>
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: 15,
            color: "rgba(240,238,255,0.4)",
            marginTop: 12,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ── Pill ────────────────────────────────────────────────────── */

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="ob-pill"
      style={{
        padding: "8px 16px",
        borderRadius: 20,
        fontSize: 13,
        background: active ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${active ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.07)"}`,
        color: active ? "rgba(240,238,255,0.95)" : "rgba(240,238,255,0.5)",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  )
}

/* ── Calendar ────────────────────────────────────────────────── */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function Calendar({
  value,
  month,
  minDate,
  onSelect,
  onMonthChange,
}: {
  value: Date | null
  month: Date
  minDate: Date
  onSelect: (d: Date) => void
  onMonthChange: (d: Date) => void
}) {
  const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
  const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
  const days: Date[] = []
  for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) days.push(d)

  const canPrev = isBefore(startOfMonth(minDate), startOfMonth(month))

  const arrowStyle: CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(240,238,255,0.7)",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <div
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: 24,
      }}
    >
      {/* Month header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          className="ob-arrow"
          disabled={!canPrev}
          onClick={() => onMonthChange(subMonths(month, 1))}
          style={{ ...arrowStyle, cursor: canPrev ? "pointer" : "default", opacity: canPrev ? 1 : 0.3 }}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#F0EEFF" }}>
          {format(month, "MMMM yyyy")}
        </span>
        <button
          type="button"
          className="ob-arrow"
          onClick={() => onMonthChange(addMonths(month, 1))}
          style={{ ...arrowStyle, cursor: "pointer" }}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Weekday headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 4,
          marginBottom: 6,
          justifyItems: "center",
        }}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            style={{
              fontSize: 11,
              color: "rgba(240,238,255,0.25)",
              letterSpacing: "0.05em",
            }}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 4,
          justifyItems: "center",
        }}
      >
        {days.map((d, i) => {
          const inMonth = isSameMonth(d, month)
          const past = isBefore(d, minDate)
          const selected = value !== null && isSameDay(d, value)
          const disabled = past || !inMonth
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelect(d)}
              className={disabled || selected ? undefined : "ob-cal-day"}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                fontSize: 13,
                fontWeight: selected ? 700 : 400,
                border: "1px solid transparent",
                background: selected ? IRIDESCENT : "transparent",
                color: selected
                  ? "#fff"
                  : !inMonth
                    ? "rgba(240,238,255,0.08)"
                    : past
                      ? "rgba(240,238,255,0.1)"
                      : "rgba(240,238,255,0.6)",
                boxShadow: selected ? "0 0 20px rgba(139,92,246,0.4)" : "none",
                cursor: disabled ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {format(d, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Minutes slider ──────────────────────────────────────────── */

const COMMITMENTS = [
  { emoji: "🌱", title: "Steady habit", desc: "Perfect for maintaining momentum" },
  { emoji: "⚡", title: "Skill building", desc: "Ideal for real skill building" },
  { emoji: "🔥", title: "Intensive mode", desc: "Serious learner mode activated" },
]

function commitmentIndex(v: number) {
  return v <= 10 ? 0 : v <= 25 ? 1 : 2
}

function MinutesSlider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const pct = ((value - 5) / 55) * 100
  const activeCard = commitmentIndex(value)
  const marks = Array.from({ length: 12 }, (_, i) => 5 + i * 5)

  return (
    <div style={{ marginTop: 32 }}>
      {/* Value display */}
      <div style={{ textAlign: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, ...iriText }}
          >
            {value}
          </motion.div>
        </AnimatePresence>
        <div style={{ fontSize: 16, color: "rgba(240,238,255,0.4)", marginTop: 4 }}>
          minutes per day
        </div>
      </div>

      {/* Slider */}
      <div style={{ position: "relative", height: 28, marginTop: 36 }}>
        {/* Track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 8,
            transform: "translateY(-50%)",
            borderRadius: 4,
            background: "rgba(255,255,255,0.05)",
          }}
        />
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${pct}%`,
            height: 8,
            transform: "translateY(-50%)",
            borderRadius: 4,
            background: IRIDESCENT,
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            width: 28,
            height: 28,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background: "#fff",
            border: "3px solid rgba(139,92,246,0.8)",
            boxShadow: "0 0 20px rgba(139,92,246,0.5)",
            pointerEvents: "none",
          }}
        />
        {/* Interactive (invisible) input */}
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="ob-range"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            opacity: 0,
            cursor: "grab",
          }}
          aria-label="Minutes per day"
        />
      </div>

      {/* Markers */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        {marks.map((m) => (
          <span
            key={m}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(240,238,255,0.2)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 11,
          color: "rgba(240,238,255,0.3)",
        }}
      >
        <span>5 min</span>
        <span>30 min</span>
        <span>60 min</span>
      </div>

      {/* Commitment cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 32 }}>
        {COMMITMENTS.map((c, i) => {
          const active = i === activeCard
          return (
            <motion.div
              key={c.title}
              animate={{
                borderColor: active ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.07)",
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderRadius: 14,
                background: active ? "rgba(139,92,246,0.07)" : "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: active ? "3px solid transparent" : "1px solid rgba(255,255,255,0.07)",
                borderImage: active ? `${IRIDESCENT} 1` : undefined,
              }}
            >
              <span style={{ fontSize: 22 }}>{c.emoji}</span>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: active ? "#F0EEFF" : "rgba(240,238,255,0.55)",
                  }}
                >
                  {c.title}
                </div>
                <div style={{ fontSize: 12.5, color: "rgba(240,238,255,0.35)", marginTop: 2 }}>
                  {c.desc}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step content data ───────────────────────────────────────── */

const GOAL_PILLS = [
  { label: "📚 IELTS Band 7+", goal: "Prepare for IELTS Band 7+" },
  { label: "🐍 Learn Python", goal: "Learn Python for data science" },
  { label: "🎨 Master Figma", goal: "Master Figma for UI/UX design" },
  { label: "🇨🇳 Learn Chinese", goal: "Learn conversational Mandarin Chinese" },
  { label: "☁️ AWS Certified", goal: "Become AWS Certified Cloud Practitioner" },
  { label: "📖 Read 12 books", goal: "Read 12 books this year" },
]

const DEADLINE_PILLS = [
  { label: "1 month", months: 1 },
  { label: "3 months", months: 3 },
  { label: "6 months", months: 6 },
  { label: "1 year", months: 12 },
]

/* ── Step transition variants ────────────────────────────────── */

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

/* ── Page ────────────────────────────────────────────────────── */

export default function Onboarding() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const today = useMemo(() => startOfDay(new Date()), [])
  const minDate = useMemo(() => addDays(today, 7), [today])

  const [[step, dir], setStepState] = useState<[number, number]>([0, 1])
  const [goal, setGoal] = useState("")
  const [goalFocus, setGoalFocus] = useState(false)
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [calMonth, setCalMonth] = useState<Date>(() => startOfMonth(minDate))
  const [dailyMinutes, setDailyMinutes] = useState(25)
  const [building, setBuilding] = useState(false)

  const daysFromToday = deadline ? differenceInCalendarDays(deadline, today) : 0

  const goTo = (next: number) => setStepState([next, next > step ? 1 : -1])

  const canContinue =
    step === 0 ? goal.trim().length >= 3 : step === 1 ? deadline !== null : true

  const pickDeadline = (months: number) => {
    const d = addMonths(today, months)
    setDeadline(d)
    setCalMonth(startOfMonth(d))
  }

  const handleBuild = async () => {
    if (building || !deadline) return
    setBuilding(true)
    const payload = {
      goal: goal.trim(),
      deadline: deadline.toISOString(),
      daily_minutes: dailyMinutes,
    }
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.updateUser({
          data: {
            ...payload,
            onboarded: true,
            name: [user?.user_metadata?.first_name, user?.user_metadata?.last_name]
              .filter(Boolean)
              .join(" "),
          },
        })
      }
      localStorage.setItem("scholify-onboarding", JSON.stringify(payload))
      // Mark onboarding done immediately so the /dashboard guard lets the
      // user through even before the Supabase metadata refresh lands.
      localStorage.setItem("scholify-onboarded", "true")
    } catch {
      /* non-blocking — proceed with the data we already have */
    }
    navigate("/loading", {
      state: { goal: payload.goal, deadline: payload.deadline, dailyMinutes },
    })
  }

  /* ── Step bodies ──────────────────────────────────────────── */

  const step1 = (
    <div>
      <StepHeader
        step={1}
        line1="What do you want"
        line2="to learn?"
        subtitle="Be specific. Lara builds better plans for specific goals."
      />
      {/* Goal textarea */}
      <div style={{ position: "relative", marginTop: 28 }}>
        <textarea
          value={goal}
          maxLength={120}
          onChange={(e) => setGoal(e.target.value)}
          onFocus={() => setGoalFocus(true)}
          onBlur={() => setGoalFocus(false)}
          placeholder="e.g. Prepare for IELTS band 7.0, Learn Python for data science, Master Figma in 60 days..."
          style={{
            width: "100%",
            minHeight: 120,
            padding: 20,
            paddingBottom: 36,
            background: goalFocus ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${goalFocus ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 16,
            color: "#F0EEFF",
            fontSize: 17,
            lineHeight: 1.5,
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
            boxShadow: goalFocus ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
            transition: "all 0.2s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 16,
            bottom: 14,
            fontSize: 12,
            color: "rgba(240,238,255,0.3)",
          }}
        >
          {goal.length} / 120
        </div>
      </div>
      {/* Suggestion pills */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, color: "rgba(240,238,255,0.3)", marginBottom: 10 }}>
          Popular goals
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {GOAL_PILLS.map((p) => (
            <Pill key={p.label} active={goal === p.goal} onClick={() => setGoal(p.goal)}>
              {p.label}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  )

  const step2 = (
    <div>
      <StepHeader step={2} line1="When do you want" line2="to achieve this?" />
      <div style={{ marginTop: 28 }}>
        <Calendar
          value={deadline}
          month={calMonth}
          minDate={minDate}
          onSelect={setDeadline}
          onMonthChange={setCalMonth}
        />
      </div>
      {/* Quick deadline pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
        {DEADLINE_PILLS.map((p) => {
          const target = addMonths(today, p.months)
          return (
            <Pill
              key={p.label}
              active={deadline !== null && isSameDay(deadline, target)}
              onClick={() => pickDeadline(p.months)}
            >
              {p.label}
            </Pill>
          )
        })}
      </div>
      {/* Selected date display */}
      {deadline && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "rgba(240,238,255,0.5)" }}>Your deadline: </span>
          <span style={{ fontSize: 15, fontWeight: 700, ...iriText }}>
            {format(deadline, "MMMM d, yyyy")}
          </span>
          <div style={{ fontSize: 13, color: "rgba(240,238,255,0.35)", marginTop: 4 }}>
            That's {daysFromToday} days from today
          </div>
        </div>
      )}
    </div>
  )

  const step3 = (
    <div>
      <StepHeader step={3} line1="How many minutes" line2="can you commit daily?" />
      <MinutesSlider value={dailyMinutes} onChange={setDailyMinutes} />
    </div>
  )

  const summaryRows = [
    { icon: "🎯", label: "Goal", value: goal.trim() || "—" },
    {
      icon: "📅",
      label: "Deadline",
      value: deadline ? `${format(deadline, "MMMM d, yyyy")} · ${daysFromToday} days` : "—",
    },
    { icon: "⏱", label: "Daily commitment", value: `${dailyMinutes} minutes per day` },
    {
      icon: "📋",
      label: "Your plan",
      value: `${daysFromToday} personalised daily tasks`,
      sub: "Generated by Lara (Claude AI)",
    },
  ]

  const step4 = (
    <div>
      <StepHeader step={4} line1="Lara is ready." line2="Here's your plan." />
      {/* Summary card with iridescent gradient border */}
      <div
        style={{
          marginTop: 28,
          padding: 1.5,
          borderRadius: 20,
          background: IRIDESCENT,
          boxShadow: "0 0 40px rgba(139,92,246,0.25)",
        }}
      >
        <div style={{ background: "#0b0a12", borderRadius: 18.5, padding: 28 }}>
          {summaryRows.map((row, i) => (
            <div key={row.label}>
              {i > 0 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
              )}
              <div style={{ fontSize: 12, color: "rgba(240,238,255,0.4)" }}>
                {row.icon} {row.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#F0EEFF",
                  marginTop: 5,
                  lineHeight: 1.5,
                }}
              >
                {row.value}
              </div>
              {row.sub && (
                <div style={{ fontSize: 12, color: "rgba(240,238,255,0.3)", marginTop: 2 }}>
                  {row.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* CTA */}
      <motion.button
        type="button"
        onClick={handleBuild}
        disabled={building}
        animate={{
          boxShadow: [
            "0 0 30px rgba(139,92,246,0.3)",
            "0 0 60px rgba(139,92,246,0.5)",
            "0 0 30px rgba(139,92,246,0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={building ? undefined : { scale: 1.02 }}
        whileTap={building ? undefined : { scale: 0.98 }}
        style={{
          width: "100%",
          height: 60,
          marginTop: 24,
          borderRadius: 14,
          background: "linear-gradient(135deg,rgba(139,92,246,0.85),rgba(99,102,241,0.85))",
          border: "1px solid rgba(139,92,246,0.5)",
          color: "#fff",
          fontSize: 18,
          fontWeight: 700,
          cursor: building ? "wait" : "pointer",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {building ? "Building…" : "Build my plan ⚡"}
      </motion.button>
    </div>
  )

  const stepBodies = [step1, step2, step3, step4]

  return (
    <div className="ob" style={{ minHeight: "100dvh", background: "#050508" }}>
      <style>{OB_CSS}</style>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>
        <ProgressBar step={step} />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {stepBodies[step]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(240,238,255,0.4)",
                fontSize: 15,
                cursor: "pointer",
                padding: "10px 4px",
              }}
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <motion.button
              type="button"
              onClick={() => canContinue && goTo(step + 1)}
              disabled={!canContinue}
              whileHover={canContinue ? { scale: 1.03 } : undefined}
              whileTap={canContinue ? { scale: 0.97 } : undefined}
              style={{
                padding: "12px 28px",
                borderRadius: 12,
                background: canContinue
                  ? "linear-gradient(135deg,rgba(139,92,246,0.85),rgba(99,102,241,0.85))"
                  : "rgba(255,255,255,0.05)",
                border: `1px solid ${canContinue ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: canContinue ? "#fff" : "rgba(240,238,255,0.3)",
                fontSize: 15,
                fontWeight: 600,
                cursor: canContinue ? "pointer" : "not-allowed",
                boxShadow: canContinue ? "0 0 24px rgba(139,92,246,0.25)" : "none",
              }}
            >
              Continue →
            </motion.button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  )
}
