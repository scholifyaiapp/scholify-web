import { useMemo, useState, useEffect, type ReactNode } from "react"
import { Link, Navigate } from "react-router-dom"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import NumberFlow from "@number-flow/react"
import {
  Activity,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  DollarSign,
  MessageSquare,
  RefreshCw,
  Table2,
  TrendingUp,
  UserRoundCheck,
  Users,
  Zap,
} from "lucide-react"
import { ScholifyLockup } from "@/components/brand"
import CharlesMascot from "@/components/CharlesMascot"
import { useAuth } from "@/lib/auth"
import { isLaunchAdmin } from "@/lib/launch"
import { supabase } from "@/lib/supabase"
import { markAffiliateDuePaid, setAffiliateStatus } from "@/lib/affiliate"

type DayPoint = { day: string; value: number }

type Data = {
  generatedAt: string
  summary: {
    users: number
    active7d: number
    active30d?: number
    waitlist: number
    partners: number
    activePartners: number
    partnerClicks: number
    partnerInvitedUsers: number
    partnerPaidInvitedUsers: number
    partnerSales: number
    revenue: number
    partnerCommission?: number
    partnerDueCommission?: number
    feedback: number
    newFeedback: number
  }
  users: Array<{ id: string; email?: string; name: string; createdAt: string; lastSignInAt?: string; provider: string; plan: string; firstTaskAt?: string; day3: boolean; day7: boolean; converted: boolean }>
  waitlist: Array<{ id: string; email: string; name: string; source?: string; created_at: string }>
  partners: Array<{ id: string; name: string; email: string; code: string; status: string; clicks: number; invitedUsers: number; paidInvitedUsers: number; conversionRate: number; sales: number; revenue: number; commission: number; dueCommission: number; approvedCommission: number; created_at: string }>
  feedback: Array<{ id: string; name?: string; email: string; category: string; rating?: number; message: string; source: string; page_url?: string; status: string; created_at: string }>
  posthog: { connected: boolean; events: unknown[][]; funnel: unknown[]; error?: string }
  billing?: {
    connected: boolean
    currency: string
    mrrCents: number
    activePaid: number
    trialing: number
    byPlan: Array<{ plan: string; count: number; mrrCents: number }>
    gross90dCents: number
    refunded90dCents: number
    charges90d: number
    refunds90d: number
    daily: Array<{ day: string; grossCents: number; charges: number }>
    error?: string
  }
  subscriptionsSummary?: { rows: number; paying: number; trialing: number; canceled: number; byPlan: Record<string, number> }
  ai?: {
    totalCalls: number
    tokensIn: number
    tokensOut: number
    users: number
    activeUsers7d: number
    byAction: Array<{ action: string; calls: number; tokensIn: number; tokensOut: number }>
    daily: Array<{ day: string; calls: number; tokensIn: number; tokensOut: number }>
  }
  study?: { learners: number; totalAnswered: number; medianAnswered: number; active7d: number; active30d?: number; totalXp: number; avgLevel: number; streakTrees: number; reminders: number }
}

/*
 * Design tokens — dark command-centre surface with the validated chart palette
 * (categorical trio + blue ordinal ramp pass the dataviz colour gates on this
 * surface). Brand red/gold stay chrome + status only, never a data series.
 */
const T = {
  page: "#0E0E12",
  surface: "#17171D",
  raised: "#1D1D25",
  line: "rgba(255,255,255,.08)",
  lineSoft: "rgba(255,255,255,.05)",
  ink: "#F5F5F2",
  sub: "#B9B9C3",
  muted: "#8A8A96",
  grid: "#26262E",
  blue: "#3987E5",
  orange: "#D95926",
  aqua: "#199E70",
  red: "#E8595F",
  gold: "#F4A405",
  good: "#0CA30C",
  warning: "#FAB219",
  critical: "#D03B3B",
  sans: '"Geist", "Inter", ui-sans-serif, system-ui, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
}
const FUNNEL_RAMP = ["#184F95", "#256ABF", "#3987E5", "#6DA7EC", "#9EC5F4", "#CDE2FB"]
const DAY_MS = 86_400_000

const card = { background: T.surface, border: `1px solid ${T.line}`, borderRadius: 16 }
const money = (cents: number) => new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(cents / 100)
const fmt = (value: number) => value.toLocaleString("en")
const compact = (value: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value)
const pct = (numerator: number, denominator: number) => (denominator > 0 ? (numerator / denominator) * 100 : 0)
const pctLabel = (value: number) => `${value >= 10 ? Math.round(value) : Math.round(value * 10) / 10}%`
const date = (value?: string) => (value ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Never")
const shortDay = (iso: string) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(`${iso}T12:00:00Z`))

/** Count-per-UTC-day series over the trailing `days`, gaps filled with zero. */
function dailySeries(timestamps: number[], days: number, weights?: number[]): DayPoint[] {
  const totals = new Map<string, number>()
  timestamps.forEach((time, index) => {
    const day = new Date(time).toISOString().slice(0, 10)
    totals.set(day, (totals.get(day) || 0) + (weights ? weights[index] : 1))
  })
  const series: DayPoint[] = []
  const today = Date.now()
  for (let back = days - 1; back >= 0; back--) {
    const day = new Date(today - back * DAY_MS).toISOString().slice(0, 10)
    series.push({ day, value: totals.get(day) || 0 })
  }
  return series
}

function windowTotal(timestamps: number[], from: number, to: number, weights?: number[]): number {
  let total = 0
  timestamps.forEach((time, index) => {
    if (time >= from && time < to) total += weights ? weights[index] : 1
  })
  return total
}

type Delta = { pct: number; up: boolean } | null
function deltaOf(current: number, previous: number): Delta {
  if (previous <= 0) return current > 0 ? { pct: 100, up: true } : null
  const change = ((current - previous) / previous) * 100
  return { pct: Math.abs(Math.round(change * 10) / 10), up: change >= 0 }
}

/* ---------------------------------------------------------------- metrics */

function buildMetrics(data: Data, range: number) {
  const now = Date.now()
  const summary = data.summary
  const billing = data.billing
  const ai = data.ai

  const signupTimes = data.users.map((user) => new Date(user.createdAt).getTime())
  const signupSeries = dailySeries(signupTimes, range)
  const signupsCurrent = windowTotal(signupTimes, now - range * DAY_MS, now)
  const signupsPrev = windowTotal(signupTimes, now - 2 * range * DAY_MS, now - range * DAY_MS)

  const waitlistTimes = data.waitlist.map((row) => new Date(row.created_at).getTime())
  const waitlistCurrent = windowTotal(waitlistTimes, now - range * DAY_MS, now)
  const waitlistPrev = windowTotal(waitlistTimes, now - 2 * range * DAY_MS, now - range * DAY_MS)

  const chargeTimes = (billing?.daily || []).map((row) => new Date(`${row.day}T12:00:00Z`).getTime())
  const chargeAmounts = (billing?.daily || []).map((row) => row.grossCents)
  const revenueSeries = dailySeries(chargeTimes, Math.min(range, 90), chargeAmounts)
  const revenueCurrent = windowTotal(chargeTimes, now - range * DAY_MS, now, chargeAmounts)
  const revenuePrev = range <= 45 ? windowTotal(chargeTimes, now - 2 * range * DAY_MS, now - range * DAY_MS, chargeAmounts) : 0
  const revenueDelta = range <= 45 ? deltaOf(revenueCurrent, revenuePrev) : null

  const aiDays = Math.min(range, 30)
  const aiTimes = (ai?.daily || []).map((row) => new Date(`${row.day}T12:00:00Z`).getTime())
  const aiCallWeights = (ai?.daily || []).map((row) => row.calls)
  const aiTokenWeights = (ai?.daily || []).map((row) => row.tokensIn + row.tokensOut)
  const aiCallSeries = dailySeries(aiTimes, aiDays, aiCallWeights)
  const aiTokenSeries = dailySeries(aiTimes, aiDays, aiTokenWeights)
  const aiCallsCurrent = windowTotal(aiTimes, now - aiDays * DAY_MS, now, aiCallWeights)

  const activated = data.users.filter((user) => user.firstTaskAt).length
  const day3 = data.users.filter((user) => user.day3).length
  const day7 = data.users.filter((user) => user.day7).length
  const converted = data.users.filter((user) => user.converted).length
  const active30d = summary.active30d ?? data.users.filter((user) => user.lastSignInAt && now - new Date(user.lastSignInAt).getTime() <= 30 * DAY_MS).length

  const funnelRaw = data.posthog?.funnel || []
  const posthogFunnel = ["Signed up", "Onboarded", "Diagnostic", "Study session", "Upgrade intent", "Subscribed"].map((label, index) => ({ label, value: Number(funnelRaw[index] || 0) }))
  const journeyFunnel = [
    { label: "Registered", value: summary.users },
    { label: "First task done", value: activated },
    { label: "Day-3 retained", value: day3 },
    { label: "Day-7 retained", value: day7 },
    { label: "Converted to paid", value: converted },
  ]

  const ratings = data.feedback.filter((row) => typeof row.rating === "number" && (row.rating || 0) > 0)
  const avgRating = ratings.length ? ratings.reduce((sum, row) => sum + Number(row.rating), 0) / ratings.length : 0

  // Estimated at GPT-4o list rates ($2.50/M in, $10/M out) — an upper bound,
  // since the companion tier runs on the cheaper mini model.
  const aiCostCents = ai ? Math.round((ai.tokensIn * 250) / 1_000_000 + (ai.tokensOut * 1000) / 1_000_000) : 0

  const mrr = billing?.connected ? billing.mrrCents : 0
  const paying = billing?.connected ? billing.activePaid : (data.subscriptionsSummary?.paying ?? converted)

  return {
    signupSeries,
    signupsCurrent,
    signupsDelta: deltaOf(signupsCurrent, signupsPrev),
    waitlistCurrent,
    waitlistDelta: deltaOf(waitlistCurrent, waitlistPrev),
    revenueSeries,
    revenueCurrent,
    revenueDelta,
    aiCallSeries,
    aiTokenSeries,
    aiCallsCurrent,
    aiDays,
    aiCostCents,
    activated,
    day3,
    day7,
    converted,
    active30d,
    posthogFunnel,
    journeyFunnel,
    avgRating,
    ratingsCount: ratings.length,
    mrr,
    paying,
  }
}

type Metrics = ReturnType<typeof buildMetrics>

/* ------------------------------------------------------------ primitives */

function DeltaChip({ delta, goodWhenUp = true, note }: { delta: Delta; goodWhenUp?: boolean; note: string }) {
  if (!delta) return <span style={{ fontSize: 11, color: T.muted }}>no prior-period data</span>
  const good = delta.up === goodWhenUp
  const Arrow = delta.up ? ArrowUpRight : ArrowDownRight
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: good ? T.good : T.critical }}>
      <Arrow size={13} aria-hidden />
      {pctLabel(delta.pct)}
      <span style={{ color: T.muted, fontWeight: 500 }}>{note}</span>
    </span>
  )
}

function Sparkline({ points, color = T.blue }: { points: number[]; color?: string }) {
  const width = 96
  const height = 30
  if (points.length < 2) return null
  const max = Math.max(...points, 1)
  const step = width / (points.length - 1)
  const y = (value: number) => height - 3 - (value / max) * (height - 6)
  const path = points.map((value, index) => `${index ? "L" : "M"}${(index * step).toFixed(1)},${y(value).toFixed(1)}`).join(" ")
  const lastX = (points.length - 1) * step
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden style={{ display: "block", overflow: "visible" }}>
      <path d={path} fill="none" stroke={T.muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={y(points[points.length - 1])} r={3} fill={color} stroke={T.surface} strokeWidth={2} />
    </svg>
  )
}

function StatTile({ icon: Icon, label, value, isMoney = false, delta, goodWhenUp = true, deltaNote, spark, index = 0 }: { icon: typeof Users; label: string; value: number; isMoney?: boolean; delta?: Delta; goodWhenUp?: boolean; deltaNote?: string; spark?: number[]; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
      style={{ ...card, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 9, background: "rgba(57,135,229,.12)" }}>
          <Icon size={15} color={T.blue} aria-hidden />
        </span>
        {spark && spark.some((point) => point > 0) && <Sparkline points={spark} />}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.02em", color: T.ink }}>
          {isMoney ? <NumberFlow value={value / 100} format={{ style: "currency", currency: "USD" }} /> : <NumberFlow value={value} />}
        </div>
        <div style={{ fontSize: 11, color: T.sub, marginTop: 3 }}>{label}</div>
      </div>
      {deltaNote !== undefined && <DeltaChip delta={delta ?? null} goodWhenUp={goodWhenUp} note={deltaNote} />}
    </motion.div>
  )
}

function ChartCard({ title, subtitle, chart, columns, rows }: { title: string; subtitle?: string; chart: ReactNode; columns: string[]; rows: Array<Array<string | number>> }) {
  const [view, setView] = useState<"chart" | "table">("chart")
  return (
    <section style={{ ...card, padding: 20, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.ink }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "inline-flex", gap: 2, background: T.raised, borderRadius: 9, padding: 2 }} role="group" aria-label={`${title}: switch between chart and table view`}>
          {([["chart", BarChart3], ["table", Table2]] as const).map(([mode, Icon]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              aria-pressed={view === mode}
              aria-label={`${mode} view`}
              style={{ border: 0, borderRadius: 7, width: 28, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: view === mode ? "rgba(57,135,229,.18)" : "transparent", color: view === mode ? T.blue : T.muted }}
            >
              <Icon size={14} aria-hidden />
            </button>
          ))}
        </div>
      </div>
      {view === "chart" ? (
        chart
      ) : (
        <div style={{ overflowX: "auto", maxHeight: 260, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{columns.map((column) => <th key={column} style={{ position: "sticky", top: 0, background: T.surface, textAlign: "left", padding: "7px 10px", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: T.muted }}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} style={{ padding: "6px 10px", borderTop: `1px solid ${T.lineSoft}`, fontSize: 12, color: cellIndex ? T.sub : T.ink, fontFamily: cellIndex ? T.mono : T.sans, fontVariantNumeric: "tabular-nums" }}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function AreaChart({ points, color = T.blue, isMoney = false, unit = "", label }: { points: DayPoint[]; color?: string; isMoney?: boolean; unit?: string; label: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const width = 640
  const height = 210
  const pad = { top: 16, right: 58, bottom: 26, left: 44 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const max = Math.max(...points.map((point) => point.value), 1)
  const niceMax = (() => {
    const power = 10 ** Math.floor(Math.log10(max))
    for (const mult of [1, 2, 5, 10]) if (mult * power >= max) return mult * power
    return 10 * power
  })()
  const step = points.length > 1 ? plotW / (points.length - 1) : plotW
  const x = (index: number) => pad.left + index * step
  const y = (value: number) => pad.top + plotH - (value / niceMax) * plotH
  const line = points.map((point, index) => `${index ? "L" : "M"}${x(index).toFixed(1)},${y(point.value).toFixed(1)}`).join(" ")
  const area = `${line} L${x(points.length - 1).toFixed(1)},${(pad.top + plotH).toFixed(1)} L${pad.left},${(pad.top + plotH).toFixed(1)} Z`
  const total = points.reduce((sum, point) => sum + point.value, 0)
  const last = points[points.length - 1]
  const format = (value: number) => (isMoney ? money(value) : `${fmt(value)}${unit}`)
  const ticks = [0, 0.5, 1].map((fraction) => niceMax * fraction)
  const empty = total === 0

  const move = (clientX: number, rect: DOMRect) => {
    const relative = ((clientX - rect.left) / rect.width) * width
    const index = Math.round((relative - pad.left) / step)
    setHover(Math.max(0, Math.min(points.length - 1, index)))
  }

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${label}: ${format(total)} in total across ${points.length} days, latest ${format(last?.value || 0)}.`}
        style={{ width: "100%", height: "auto", display: "block", touchAction: "pan-y" }}
        tabIndex={0}
        onPointerMove={(event) => move(event.clientX, event.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setHover(null)}
        onBlur={() => setHover(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault()
            setHover((current) => {
              const base = current ?? points.length - 1
              return Math.max(0, Math.min(points.length - 1, base + (event.key === "ArrowRight" ? 1 : -1)))
            })
          }
        }}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke={T.grid} strokeWidth={1} />
            <text x={pad.left - 8} y={y(tick) + 3.5} textAnchor="end" fontSize={10} fill={T.muted} fontFamily={T.mono}>{isMoney ? `$${compact(tick / 100)}` : compact(tick)}</text>
          </g>
        ))}
        {[0, Math.floor((points.length - 1) / 2), points.length - 1].map((index) => (
          <text key={index} x={x(index)} y={height - 8} textAnchor={index === 0 ? "start" : index === points.length - 1 ? "end" : "middle"} fontSize={10} fill={T.muted} fontFamily={T.mono}>{points[index] ? shortDay(points[index].day) : ""}</text>
        ))}
        {!empty && (
          <>
            <motion.path d={area} fill={color} initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
            <motion.path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
            <circle cx={x(points.length - 1)} cy={y(last.value)} r={4.5} fill={color} stroke={T.surface} strokeWidth={2} />
            <text x={x(points.length - 1) + 9} y={y(last.value) + 4} fontSize={11} fontWeight={700} fill={T.ink} fontFamily={T.mono}>{format(last.value)}</text>
          </>
        )}
        {empty && <text x={width / 2} y={pad.top + plotH / 2} textAnchor="middle" fontSize={12} fill={T.muted}>No activity in this range yet.</text>}
        {hover !== null && points[hover] && !empty && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.top} y2={pad.top + plotH} stroke={T.line} strokeWidth={1} />
            <circle cx={x(hover)} cy={y(points[hover].value)} r={4} fill={color} stroke={T.surface} strokeWidth={2} />
          </g>
        )}
      </svg>
      {hover !== null && points[hover] && !empty && (
        <div style={{ position: "absolute", top: 2, left: `${(x(hover) / width) * 100}%`, transform: `translateX(${hover > points.length * 0.6 ? "-105%" : "8px"})`, background: T.raised, border: `1px solid ${T.line}`, borderRadius: 9, padding: "7px 11px", pointerEvents: "none", whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, fontFamily: T.mono }}>{format(points[hover].value)}</div>
          <div style={{ fontSize: 10, color: T.muted, marginTop: 1 }}>{shortDay(points[hover].day)}</div>
        </div>
      )}
    </div>
  )
}

function Funnel({ steps }: { steps: Array<{ label: string; value: number }> }) {
  const max = Math.max(...steps.map((step) => step.value), 1)
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {steps.map((step, index) => {
        const prev = index > 0 ? steps[index - 1].value : 0
        const ofPrev = index > 0 ? pct(step.value, prev) : null
        const ofFirst = pct(step.value, steps[0].value)
        return (
          <div key={step.label} style={{ display: "grid", gridTemplateColumns: "138px 1fr 132px", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 12, color: T.sub, textAlign: "right" }}>{step.label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
              <div style={{ flex: 1, height: 18, borderRadius: 4, background: T.raised, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max((step.value / max) * 100, step.value > 0 ? 2 : 0)}%` }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                  style={{ height: "100%", background: FUNNEL_RAMP[index] || FUNNEL_RAMP[FUNNEL_RAMP.length - 1], borderRadius: "0 4px 4px 0" }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, fontFamily: T.mono, minWidth: 34 }}>{fmt(step.value)}</span>
            </div>
            <div style={{ fontSize: 11, color: T.muted, fontFamily: T.mono }}>
              {index === 0 ? "100%" : `${pctLabel(ofPrev || 0)} of prior`}
              {index === steps.length - 1 && index > 0 && <span style={{ display: "block", color: T.sub }}>{pctLabel(ofFirst)} end-to-end</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Meter({ label, numerator, denominator, hint, index = 0 }: { label: string; numerator: number; denominator: number; hint: string; index?: number }) {
  const ratio = pct(numerator, denominator)
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 12, color: T.sub }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: T.mono }}>{pctLabel(ratio)} <span style={{ color: T.muted, fontWeight: 500 }}>({fmt(numerator)}/{fmt(denominator)})</span></span>
      </div>
      <div style={{ height: 8, borderRadius: 99, background: "rgba(57,135,229,.14)", overflow: "hidden" }} role="img" aria-label={`${label}: ${pctLabel(ratio)}`}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(ratio, 100)}%` }} transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }} style={{ height: "100%", borderRadius: 99, background: T.blue }} />
      </div>
      <div style={{ fontSize: 10.5, color: T.muted }}>{hint}</div>
    </div>
  )
}

function RatioCard({ label, value, hint, index = 0 }: { label: string; value: string; hint: string; index?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }} style={{ background: T.raised, border: `1px solid ${T.lineSoft}`, borderRadius: 12, padding: "13px 15px" }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: T.ink }}>{value}</div>
      <div style={{ fontSize: 11, color: T.sub, marginTop: 3 }}>{label}</div>
      <div style={{ fontSize: 10, color: T.muted, marginTop: 4, fontFamily: T.mono }}>{hint}</div>
    </motion.div>
  )
}

function HBars({ items, color = T.blue, format }: { items: Array<{ label: string; value: number; display?: string }>; color?: string; format: (value: number) => string }) {
  const max = Math.max(...items.map((item) => item.value), 1)
  if (!items.length) return <div style={{ padding: 24, textAlign: "center", color: T.muted, fontSize: 12 }}>No data yet.</div>
  return (
    <div style={{ display: "grid", gap: 11 }}>
      {items.map((item, index) => (
        <div key={item.label} style={{ display: "grid", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12 }}>
            <span style={{ color: T.sub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
            <span style={{ color: T.ink, fontWeight: 700, fontFamily: T.mono, whiteSpace: "nowrap" }}>{item.display ?? format(item.value)}</span>
          </div>
          <div style={{ height: 12, borderRadius: 4, background: T.raised, overflow: "hidden" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / max) * 100}%` }} transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }} style={{ height: "100%", background: color, borderRadius: "0 4px 4px 0" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusRow({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  const Icon = ok ? CheckCircle2 : Clock3
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
      <Icon size={15} color={ok ? T.good : T.warning} aria-hidden style={{ marginTop: 1, flexShrink: 0 }} />
      <div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{label}</span>
        <span style={{ fontSize: 12.5, color: ok ? T.good : T.warning, fontWeight: 700 }}> · {ok ? "connected" : "not connected"}</span>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{detail}</div>
      </div>
    </div>
  )
}

function Pill({ value }: { value: string }) {
  const good = value === "active" || value === "connected"
  return <span style={{ display: "inline-block", borderRadius: 999, padding: "4px 9px", background: good ? "rgba(12,163,12,.14)" : "rgba(250,178,25,.12)", color: good ? "#4ADE80" : T.warning, fontSize: 10, fontWeight: 800, textTransform: "uppercase", whiteSpace: "nowrap" }}>{value}</span>
}

function Action({ label, disabled, onClick, primary = false }: { label: string; disabled: boolean; onClick: () => void; primary?: boolean }) {
  return <button type="button" disabled={disabled} onClick={onClick} style={{ border: primary ? 0 : `1px solid ${T.line}`, borderRadius: 8, padding: "7px 10px", background: primary ? T.blue : "transparent", color: primary ? "#fff" : T.sub, fontSize: 10, fontWeight: 800, cursor: disabled ? "wait" : "pointer", opacity: disabled ? 0.55 : 1 }}>{label}</button>
}

function DataTable({ title, columns, rows }: { title: string; columns: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <section style={{ ...card, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", fontWeight: 700, fontSize: 14, color: T.ink, borderBottom: `1px solid ${T.line}` }}>{title}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead><tr>{columns.map((column) => <th key={column} style={{ padding: "10px 16px", textAlign: "left", color: T.muted, background: "rgba(255,255,255,.02)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{column}</th>)}</tr></thead>
          <tbody>
            {rows.length
              ? rows.map((row, rowIndex) => <tr key={rowIndex} className="admin-row">{row.map((cell, cellIndex) => <td key={cellIndex} style={{ padding: "12px 16px", borderTop: `1px solid ${T.lineSoft}`, fontSize: 12, color: T.sub, whiteSpace: cellIndex ? "nowrap" : "normal" }}>{cell}</td>)}</tr>)
              : <tr><td colSpan={columns.length} style={{ padding: 30, color: T.muted, textAlign: "center" }}>No data yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Journey({ user }: { user: Data["users"][number] }) {
  const stages = [Boolean(user.createdAt), Boolean(user.firstTaskAt), user.day3, user.day7, user.converted]
  return <span style={{ display: "inline-flex", gap: 3 }}>{stages.map((done, index) => <i key={index} title={["Joined", "First task", "Day 3", "Day 7", "Paid"][index]} style={{ width: 8, height: 8, borderRadius: 99, background: done ? T.blue : T.raised }} />)}</span>
}

/* ------------------------------------------------------------------ tabs */

const TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "engagement", label: "Engagement", icon: Zap },
  { id: "ai", label: "AI usage", icon: Bot },
  { id: "partners", label: "Partners", icon: UserRoundCheck },
  { id: "users", label: "Users", icon: Users },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
] as const
type TabId = (typeof TABS)[number]["id"]

function OverviewTab({ data, metrics, range }: { data: Data; metrics: Metrics; range: number }) {
  const summary = data.summary
  const billing = data.billing
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ ...card, padding: "26px 26px 22px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: T.red }}>{billing?.connected ? "Monthly recurring revenue" : "Registered learners"}</div>
          <div style={{ fontSize: "clamp(40px,6vw,56px)", fontWeight: 800, letterSpacing: "-.03em", color: T.ink, lineHeight: 1.1, marginTop: 6 }}>
            {billing?.connected ? <NumberFlow value={metrics.mrr / 100} format={{ style: "currency", currency: "USD" }} /> : <NumberFlow value={summary.users} />}
          </div>
          <div style={{ fontSize: 12.5, color: T.muted, marginTop: 8 }}>
            {billing?.connected
              ? `${fmt(billing.activePaid)} paying + ${fmt(billing.trialing)} trialing subscriptions · ${money(metrics.mrr * 12)} annualised`
              : "Connect STRIPE_SECRET_KEY in Vercel to lead this view with live MRR."}
          </div>
        </div>
        <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
          {[
            ["Active last 7 days", fmt(summary.active7d)],
            ["Paying users", fmt(metrics.paying)],
            ["Partner-attributed revenue", money(summary.revenue)],
          ].map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 700, color: T.ink }}>{value}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-grid">
        <StatTile icon={Users} label={`New signups · ${range}d`} value={metrics.signupsCurrent} delta={metrics.signupsDelta} deltaNote={`vs prior ${range}d`} spark={metrics.signupSeries.map((point) => point.value)} index={0} />
        <StatTile icon={DollarSign} label={`Gross revenue · ${Math.min(range, 90)}d`} value={metrics.revenueCurrent} isMoney delta={metrics.revenueDelta} deltaNote={range <= 45 ? `vs prior ${range}d` : "prior window exceeds Stripe pull"} index={1} spark={metrics.revenueSeries.map((point) => point.value)} />
        <StatTile icon={Clock3} label={`Waitlist joins · ${range}d`} value={metrics.waitlistCurrent} delta={metrics.waitlistDelta} deltaNote={`vs prior ${range}d`} index={2} />
        <StatTile icon={Bot} label={`AI calls · ${metrics.aiDays}d`} value={metrics.aiCallsCurrent} index={3} spark={metrics.aiCallSeries.map((point) => point.value)} />
      </div>

      <div className="admin-cols">
        <ChartCard
          title="Signups per day"
          subtitle={`Last ${range} days · ${fmt(metrics.signupsCurrent)} new accounts`}
          chart={<AreaChart points={metrics.signupSeries} label="Signups per day" />}
          columns={["Day", "Signups"]}
          rows={metrics.signupSeries.map((point) => [shortDay(point.day), point.value])}
        />
        <ChartCard
          title="Gross revenue per day"
          subtitle={billing?.connected ? `Stripe charges · last ${Math.min(range, 90)} days` : "Connect Stripe to chart real charges"}
          chart={<AreaChart points={metrics.revenueSeries} isMoney label="Gross revenue per day" />}
          columns={["Day", "Gross"]}
          rows={metrics.revenueSeries.map((point) => [shortDay(point.day), money(point.value)])}
        />
      </div>

      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 4 }}>Core ratios</div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>The five numbers that say whether the product works. Full detail lives in the Engagement and Revenue tabs.</div>
        <div style={{ display: "grid", gap: 16 }}>
          <Meter label="Activation" numerator={metrics.activated} denominator={summary.users} hint="Completed a first task ÷ registered users" index={0} />
          <Meter label="Day-3 retention" numerator={metrics.day3} denominator={summary.users} hint="Returned on day 3 ÷ registered users" index={1} />
          <Meter label="Day-7 retention" numerator={metrics.day7} denominator={summary.users} hint="Returned on day 7 ÷ registered users" index={2} />
          <Meter label="Free → paid conversion" numerator={metrics.converted} denominator={summary.users} hint="Converted to paid ÷ registered users" index={3} />
          <Meter label="Weekly stickiness" numerator={summary.active7d} denominator={metrics.active30d} hint="Active last 7 days ÷ active last 30 days" index={4} />
        </div>
      </section>

      <section style={{ ...card, padding: 20, display: "grid", gap: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink }}>Data sources</div>
        <StatusRow ok={Boolean(billing?.connected)} label="Stripe" detail={billing?.connected ? `MRR, plan mix and ${fmt(billing.charges90d)} charges pulled live from the Stripe API.` : `Set STRIPE_SECRET_KEY (non-empty) in Vercel — revenue tiles fall back to partner-attributed sales only.${billing?.error ? ` Last error: ${billing.error}` : ""}`} />
        <StatusRow ok={Boolean(data.posthog?.connected)} label="PostHog" detail={data.posthog?.connected ? "Product journey funnel and event stream are reporting." : "Add POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID in Vercel to light up the journey funnel."} />
        <StatusRow ok label="Supabase" detail="Accounts, subscriptions, study progress, AI usage, partner and feedback records are live." />
      </section>
    </div>
  )
}

function RevenueTab({ data, metrics }: { data: Data; metrics: Metrics }) {
  const billing = data.billing
  const summary = data.summary
  const subs = data.subscriptionsSummary
  const gross = billing?.gross90dCents || 0
  const refunded = billing?.refunded90dCents || 0
  const commission = summary.partnerCommission ?? 0
  const ratios: Array<[string, string, string]> = [
    ["MRR", billing?.connected ? money(metrics.mrr) : "—", "Σ active + trialing subscription items, normalised to monthly"],
    ["ARR (run-rate)", billing?.connected ? money(metrics.mrr * 12) : "—", "MRR × 12"],
    ["ARPPU", billing?.connected && billing.activePaid > 0 ? money(Math.round(metrics.mrr / billing.activePaid)) : "—", "MRR ÷ paying subscribers"],
    ["ARPU", billing?.connected && summary.users > 0 ? money(Math.round(metrics.mrr / summary.users)) : "—", "MRR ÷ all registered users"],
    ["Paying ratio", pctLabel(pct(metrics.paying, summary.users)), "Paying users ÷ registered users"],
    ["Avg successful charge", billing?.connected && billing.charges90d > 0 ? money(Math.round(gross / billing.charges90d)) : "—", "Gross 90d ÷ charge count 90d"],
    ["Refund rate (value)", billing?.connected ? pctLabel(pct(refunded, gross)) : "—", "Refunded cents ÷ gross cents, 90d"],
    ["Refund rate (count)", billing?.connected ? pctLabel(pct(billing.refunds90d, billing.charges90d)) : "—", "Charges with any refund ÷ charges, 90d"],
    ["Net revenue · 90d", billing?.connected ? money(gross - refunded) : "—", "Gross − refunded, 90d"],
    ["Partner-attributed revenue", money(summary.revenue), "Σ commissionable sales, all-time"],
    ["Effective commission rate", pctLabel(pct(commission, summary.revenue)), "Partner commission ÷ partner-attributed revenue"],
    ["Commission owed now", money(summary.partnerDueCommission ?? 0), "Matured, unpaid partner commissions"],
  ]
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={DollarSign} label="Monthly recurring revenue" value={metrics.mrr} isMoney index={0} />
        <StatTile icon={Users} label="Paying subscriptions" value={billing?.activePaid ?? metrics.paying} index={1} />
        <StatTile icon={Clock3} label="Trialing subscriptions" value={billing?.trialing ?? subs?.trialing ?? 0} index={2} />
        <StatTile icon={TrendingUp} label="Gross revenue · 90d" value={gross} isMoney index={3} />
      </div>
      <div className="admin-cols">
        <ChartCard
          title="Gross revenue per day"
          subtitle={billing?.connected ? "Succeeded Stripe charges · last 90 days" : "Not connected — set STRIPE_SECRET_KEY in Vercel"}
          chart={<AreaChart points={metrics.revenueSeries} isMoney label="Gross revenue per day" />}
          columns={["Day", "Gross"]}
          rows={metrics.revenueSeries.map((point) => [shortDay(point.day), money(point.value)])}
        />
        <ChartCard
          title="MRR by plan"
          subtitle="Live subscription items grouped by price"
          chart={<HBars items={(billing?.byPlan || []).map((plan) => ({ label: `${plan.plan} · ${plan.count} sub${plan.count === 1 ? "" : "s"}`, value: plan.mrrCents, display: `${money(plan.mrrCents)}/mo` }))} format={money} />}
          columns={["Plan", "Subs", "MRR"]}
          rows={(billing?.byPlan || []).map((plan) => [plan.plan, plan.count, money(plan.mrrCents)])}
        />
      </div>
      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 14 }}>Every revenue ratio</div>
        <div className="admin-ratio-grid">
          {ratios.map(([label, value, hint], index) => <RatioCard key={label} label={label} value={value} hint={hint} index={index} />)}
        </div>
      </section>
      {subs && (
        <section style={{ ...card, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 4 }}>Database cross-check</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Supabase subscriptions table vs Stripe truth — a drift here means webhooks were dropped (the empty-env failure mode).</div>
          <div className="admin-ratio-grid">
            <RatioCard label="Subscription rows" value={fmt(subs.rows)} hint="public.subscriptions" index={0} />
            <RatioCard label="Paying (DB)" value={fmt(subs.paying)} hint="plan ≠ free ∧ status active/trialing" index={1} />
            <RatioCard label="Trials live (DB)" value={fmt(subs.trialing)} hint="trial_ends_at in the future" index={2} />
            <RatioCard label="Canceled (DB)" value={fmt(subs.canceled)} hint="status = canceled, all-time" index={3} />
          </div>
        </section>
      )}
    </div>
  )
}

function GrowthTab({ data, metrics, range }: { data: Data; metrics: Metrics; range: number }) {
  const summary = data.summary
  const perDay = metrics.signupsCurrent / range
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={Users} label="Registered users · all-time" value={summary.users} index={0} />
        <StatTile icon={TrendingUp} label={`New signups · ${range}d`} value={metrics.signupsCurrent} delta={metrics.signupsDelta} deltaNote={`vs prior ${range}d`} spark={metrics.signupSeries.map((point) => point.value)} index={1} />
        <StatTile icon={Clock3} label="Waitlist · all-time" value={summary.waitlist} index={2} />
        <StatTile icon={Activity} label="Active last 7 days" value={summary.active7d} index={3} />
      </div>
      <ChartCard
        title="Signups per day"
        subtitle={`Last ${range} days · averaging ${perDay >= 10 ? Math.round(perDay) : Math.round(perDay * 10) / 10}/day`}
        chart={<AreaChart points={metrics.signupSeries} label="Signups per day" />}
        columns={["Day", "Signups"]}
        rows={metrics.signupSeries.map((point) => [shortDay(point.day), point.value])}
      />
      <div className="admin-cols">
        <section style={{ ...card, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 4 }}>Product journey funnel</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>{data.posthog?.connected ? "PostHog events since launch baseline, with step-to-step conversion." : "PostHog is not connected — add POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID in Vercel."}</div>
          {data.posthog?.connected ? <Funnel steps={metrics.posthogFunnel} /> : <div style={{ padding: 26, textAlign: "center", color: T.muted, fontSize: 12 }}>No funnel data yet.</div>}
        </section>
        <section style={{ ...card, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 14 }}>Growth ratios</div>
          <div style={{ display: "grid", gap: 10 }}>
            <RatioCard label="Signup growth" value={metrics.signupsDelta ? `${metrics.signupsDelta.up ? "+" : "−"}${pctLabel(metrics.signupsDelta.pct)}` : "—"} hint={`New signups ${range}d vs prior ${range}d`} index={0} />
            <RatioCard label="Waitlist growth" value={metrics.waitlistDelta ? `${metrics.waitlistDelta.up ? "+" : "−"}${pctLabel(metrics.waitlistDelta.pct)}` : "—"} hint={`Waitlist joins ${range}d vs prior ${range}d`} index={1} />
            <RatioCard label="Registered per waitlist signup" value={summary.waitlist > 0 ? (Math.round((summary.users / summary.waitlist) * 100) / 100).toString() : "—"} hint="Users ÷ waitlist (coverage, not a tracked join)" index={2} />
            <RatioCard label="Partner-driven signups" value={pctLabel(pct(summary.partnerInvitedUsers, summary.users))} hint="Partner-invited users ÷ all users" index={3} />
          </div>
        </section>
      </div>
      <DataTable
        title={`Launch waitlist · ${data.waitlist.length}`}
        columns={["Contact", "Source", "Joined"]}
        rows={data.waitlist.map((row) => [<span key={row.id}><b style={{ color: T.ink }}>{row.name}</b><small>{row.email}</small></span>, row.source || "website", date(row.created_at)])}
      />
    </div>
  )
}

function EngagementTab({ data, metrics }: { data: Data; metrics: Metrics }) {
  const summary = data.summary
  const study = data.study
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={Activity} label="Active learners · 7d (sign-in)" value={summary.active7d} index={0} />
        <StatTile icon={Zap} label="Studying · 7d (progress writes)" value={study?.active7d ?? 0} index={1} />
        <StatTile icon={BarChart3} label="Questions answered · all-time" value={study?.totalAnswered ?? 0} index={2} />
        <StatTile icon={CheckCircle2} label="Learners with progress" value={study?.learners ?? 0} index={3} />
      </div>
      <div className="admin-cols">
        <section style={{ ...card, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 4 }}>Lifecycle funnel — live database truth</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>Every registered account, staged by profile flags. This funnel needs no external analytics.</div>
          <Funnel steps={metrics.journeyFunnel} />
        </section>
        <section style={{ ...card, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 16 }}>Retention & habit ratios</div>
          <div style={{ display: "grid", gap: 16 }}>
            <Meter label="Activation" numerator={metrics.activated} denominator={summary.users} hint="First task completed ÷ registered" index={0} />
            <Meter label="Day-3 retention" numerator={metrics.day3} denominator={summary.users} hint="Day-3 flag ÷ registered" index={1} />
            <Meter label="Day-7 retention" numerator={metrics.day7} denominator={summary.users} hint="Day-7 flag ÷ registered" index={2} />
            <Meter label="Day-7 of day-3 cohort" numerator={metrics.day7} denominator={metrics.day3} hint="Day-7 ÷ day-3 — how well the habit holds" index={3} />
            <Meter label="Weekly stickiness" numerator={summary.active7d} denominator={metrics.active30d} hint="Active 7d ÷ active 30d" index={4} />
            <Meter label="Study stickiness" numerator={study?.active7d ?? 0} denominator={study?.active30d ?? study?.learners ?? 0} hint="Progress writes 7d ÷ 30d" index={5} />
          </div>
        </section>
      </div>
      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 14 }}>Study depth</div>
        <div className="admin-ratio-grid">
          <RatioCard label="Median questions per learner" value={fmt(study?.medianAnswered ?? 0)} hint="Median of acca_progress.answered" index={0} />
          <RatioCard label="Mean questions per learner" value={study && study.learners > 0 ? fmt(Math.round(study.totalAnswered / study.learners)) : "—"} hint="Total answered ÷ learners" index={1} />
          <RatioCard label="Total XP awarded" value={compact(study?.totalXp ?? 0)} hint="Σ user_xp.total_xp" index={2} />
          <RatioCard label="Average level" value={(study?.avgLevel ?? 0).toString()} hint="Mean of user_xp.level" index={3} />
          <RatioCard label="Streak trees grown" value={fmt(study?.streakTrees ?? 0)} hint="Milestone trees generated" index={4} />
          <RatioCard label="Reminder subscriptions" value={fmt(study?.reminders ?? 0)} hint="study_reminders rows" index={5} />
        </div>
      </section>
    </div>
  )
}

function AiTab({ data, metrics }: { data: Data; metrics: Metrics }) {
  const ai = data.ai
  const summary = data.summary
  if (!ai) return <div style={{ ...card, padding: 40, textAlign: "center", color: T.muted }}>AI usage data has not loaded.</div>
  const tokensTotal = ai.tokensIn + ai.tokensOut
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={Bot} label="Charles calls · all-time" value={ai.totalCalls} index={0} spark={metrics.aiCallSeries.map((point) => point.value)} />
        <StatTile icon={Zap} label="Tokens processed · all-time" value={tokensTotal} index={1} />
        <StatTile icon={Users} label="Learners who used Charles" value={ai.users} index={2} />
        <StatTile icon={DollarSign} label="Est. model cost · all-time" value={metrics.aiCostCents} isMoney index={3} />
      </div>
      <div className="admin-cols">
        <ChartCard
          title="Tokens per day"
          subtitle={`Input + output · last ${metrics.aiDays} days`}
          chart={<AreaChart points={metrics.aiTokenSeries} color={T.orange} label="AI tokens per day" />}
          columns={["Day", "Tokens"]}
          rows={metrics.aiTokenSeries.map((point) => [shortDay(point.day), fmt(point.value)])}
        />
        <ChartCard
          title="Calls by feature"
          subtitle="Which Charles surfaces learners actually use"
          chart={<HBars items={ai.byAction.slice(0, 8).map((action) => ({ label: action.action, value: action.calls }))} format={fmt} />}
          columns={["Action", "Calls", "Tokens in", "Tokens out"]}
          rows={ai.byAction.map((action) => [action.action, fmt(action.calls), fmt(action.tokensIn), fmt(action.tokensOut)])}
        />
      </div>
      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 4 }}>AI economics</div>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 14 }}>Cost is estimated at GPT-4o list rates ($2.50/M in · $10/M out) — an upper bound, since the companion tier runs on the cheaper mini model.</div>
        <div className="admin-ratio-grid">
          <RatioCard label="Tokens per call" value={ai.totalCalls > 0 ? fmt(Math.round(tokensTotal / ai.totalCalls)) : "—"} hint="Total tokens ÷ calls" index={0} />
          <RatioCard label="Output ÷ input ratio" value={ai.tokensIn > 0 ? (Math.round((ai.tokensOut / ai.tokensIn) * 100) / 100).toString() : "—"} hint="Tokens out ÷ tokens in" index={1} />
          <RatioCard label="Calls per AI user" value={ai.users > 0 ? fmt(Math.round(ai.totalCalls / ai.users)) : "—"} hint="Calls ÷ distinct users" index={2} />
          <RatioCard label="AI reach" value={pctLabel(pct(ai.users, summary.users))} hint="AI users ÷ registered users" index={3} />
          <RatioCard label="AI users active · 7d" value={fmt(ai.activeUsers7d)} hint="Distinct users with calls this week" index={4} />
          <RatioCard label="Est. cost per AI user" value={ai.users > 0 ? money(Math.round(metrics.aiCostCents / ai.users)) : "—"} hint="Est. cost ÷ AI users, all-time" index={5} />
        </div>
      </section>
    </div>
  )
}

function PartnersTab({ data, reviewing, onReview, onMarkPaid }: { data: Data; reviewing: string; onReview: (id: string, status: "active" | "rejected" | "pending") => Promise<void>; onMarkPaid: (id: string) => Promise<void> }) {
  const summary = data.summary
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={UserRoundCheck} label="Active partners" value={summary.activePartners} index={0} />
        <StatTile icon={BarChart3} label="Referral link clicks" value={summary.partnerClicks} index={1} />
        <StatTile icon={Users} label="Invited signups" value={summary.partnerInvitedUsers} index={2} />
        <StatTile icon={DollarSign} label="Partner-attributed revenue" value={summary.revenue} isMoney index={3} />
      </div>
      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 14 }}>Partner funnel & economics</div>
        <div className="admin-ratio-grid">
          <RatioCard label="Application approval rate" value={pctLabel(pct(summary.activePartners, summary.partners))} hint="Active ÷ all applications" index={0} />
          <RatioCard label="Click → signup" value={pctLabel(pct(summary.partnerInvitedUsers, summary.partnerClicks))} hint="Invited users ÷ clicks" index={1} />
          <RatioCard label="Signup → paid" value={pctLabel(pct(summary.partnerPaidInvitedUsers, summary.partnerInvitedUsers))} hint="Paid invitees ÷ invited users" index={2} />
          <RatioCard label="Click → paid" value={pctLabel(pct(summary.partnerPaidInvitedUsers, summary.partnerClicks))} hint="Paid invitees ÷ clicks" index={3} />
          <RatioCard label="Revenue per active partner" value={summary.activePartners > 0 ? money(Math.round(summary.revenue / summary.activePartners)) : "—"} hint="Attributed revenue ÷ active partners" index={4} />
          <RatioCard label="Commission owed now" value={money(summary.partnerDueCommission ?? 0)} hint="Matured, unpaid commissions" index={5} />
        </div>
      </section>
      <PartnerTable partners={data.partners} reviewing={reviewing} onReview={onReview} onMarkPaid={onMarkPaid} />
    </div>
  )
}

function PartnerTable({ partners, reviewing, onReview, onMarkPaid }: { partners: Data["partners"]; reviewing: string; onReview: (id: string, status: "active" | "rejected" | "pending") => Promise<void>; onMarkPaid: (id: string) => Promise<void> }) {
  const columns = ["Partner", "Status", "Clicks", "Invited", "Paid invites", "Conversion", "Sales", "Revenue", "Commission", "Decision / payout"]
  return (
    <section style={{ ...card, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", fontWeight: 700, fontSize: 14, color: T.ink, borderBottom: `1px solid ${T.line}` }}>Partner applications and traction · {partners.length}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1180 }}>
          <thead><tr>{columns.map((column) => <th key={column} style={{ padding: "10px 16px", textAlign: "left", color: T.muted, background: "rgba(255,255,255,.02)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>{column}</th>)}</tr></thead>
          <tbody>
            {partners.length ? partners.map((partner) => (
              <tr key={partner.id} className="admin-row">
                <td style={{ padding: "12px 16px", borderTop: `1px solid ${T.lineSoft}`, fontSize: 12 }}><b style={{ color: T.ink }}>{partner.name} · {partner.code}</b><small>{partner.email}</small></td>
                <td style={{ padding: "12px 16px", borderTop: `1px solid ${T.lineSoft}` }}><Pill value={partner.status} /></td>
                {[fmt(partner.clicks), fmt(partner.invitedUsers), fmt(partner.paidInvitedUsers), `${partner.conversionRate}%`, fmt(partner.sales), money(partner.revenue), money(partner.commission)].map((value, index) => (
                  <td key={index} style={{ padding: "12px 16px", borderTop: `1px solid ${T.lineSoft}`, fontSize: 12, color: T.sub, fontFamily: T.mono, fontVariantNumeric: "tabular-nums" }}>{value}</td>
                ))}
                <td style={{ padding: "10px 16px", borderTop: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {partner.status !== "active" && <Action label="Approve" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "active")} primary />}
                    {partner.status !== "rejected" && <Action label="Reject" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "rejected")} />}
                    {partner.status !== "pending" && <Action label="Pending" disabled={reviewing === partner.id} onClick={() => void onReview(partner.id, "pending")} />}
                    {partner.dueCommission > 0 && <Action label={`Record payout ${money(partner.dueCommission)}`} disabled={reviewing === partner.id} onClick={() => void onMarkPaid(partner.id)} primary />}
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan={columns.length} style={{ padding: 30, color: T.muted, textAlign: "center" }}>No partner applications yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function UsersTab({ data, reviewing, onRefund }: { data: Data; reviewing: string; onRefund: (id: string, email?: string) => Promise<void> }) {
  const providers = data.users.reduce<Record<string, number>>((acc, user) => {
    const provider = user.provider || "email"
    acc[provider] = (acc[provider] || 0) + 1
    return acc
  }, {})
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={Users} label="Registered users" value={data.summary.users} index={0} />
        <StatTile icon={Activity} label="Active last 7 days" value={data.summary.active7d} index={1} />
        <StatTile icon={CheckCircle2} label="Converted to paid" value={data.users.filter((user) => user.converted).length} index={2} />
        <StatTile icon={Clock3} label="Sign-in providers" value={Object.keys(providers).length} index={3} />
      </div>
      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 14 }}>Sign-in provider mix</div>
        <HBars items={Object.entries(providers).sort((a, b) => b[1] - a[1]).map(([provider, count]) => ({ label: provider, value: count, display: `${fmt(count)} · ${pctLabel(pct(count, data.summary.users))}` }))} format={fmt} />
      </section>
      <DataTable
        title="Registered users"
        columns={["User", "Provider", "Plan", "Joined", "Last sign-in", "Journey", "Refund"]}
        rows={data.users.map((user) => [
          <span key={user.id}><b style={{ color: T.ink }}>{user.name || "Unnamed"}</b><small>{user.email}</small></span>,
          user.provider || "email",
          user.plan,
          date(user.createdAt),
          date(user.lastSignInAt),
          <Journey key={`journey-${user.id}`} user={user} />,
          user.converted || user.plan !== "free" ? <Action key={`refund-${user.id}`} label="Full refund" disabled={reviewing === user.id} onClick={() => void onRefund(user.id, user.email)} /> : "—",
        ])}
      />
    </div>
  )
}

function FeedbackTab({ data, metrics, onStatus }: { data: Data; metrics: Metrics; onStatus: (id: string, status: string) => Promise<void> }) {
  const highRatings = data.feedback.filter((row) => (row.rating || 0) >= 4).length
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="admin-grid">
        <StatTile icon={MessageSquare} label="Feedback received" value={data.summary.feedback} index={0} />
        <StatTile icon={Clock3} label="Awaiting review" value={data.summary.newFeedback} index={1} />
        <StatTile icon={CheckCircle2} label="Rated 4★ or higher" value={highRatings} index={2} />
        <StatTile icon={Activity} label="Ratings given" value={metrics.ratingsCount} index={3} />
      </div>
      <section style={{ ...card, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.ink, marginBottom: 14 }}>Sentiment ratios</div>
        <div className="admin-ratio-grid">
          <RatioCard label="Average rating" value={metrics.ratingsCount ? `${Math.round(metrics.avgRating * 10) / 10} / 5` : "—"} hint="Mean of submitted ratings" index={0} />
          <RatioCard label="4★+ share" value={pctLabel(pct(highRatings, metrics.ratingsCount))} hint="Rated ≥4 ÷ rated feedback" index={1} />
          <RatioCard label="Review backlog" value={pctLabel(pct(data.summary.newFeedback, data.summary.feedback))} hint="Status new ÷ all feedback" index={2} />
          <RatioCard label="Feedback per 100 users" value={data.summary.users > 0 ? (Math.round((data.summary.feedback / data.summary.users) * 1000) / 10).toString() : "—"} hint="Feedback ÷ users × 100" index={3} />
        </div>
      </section>
      <FeedbackInbox feedback={data.feedback} onStatus={onStatus} />
    </div>
  )
}

function FeedbackInbox({ feedback, onStatus }: { feedback: Data["feedback"]; onStatus: (id: string, status: string) => Promise<void> }) {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      {feedback.length ? feedback.map((item) => (
        <article key={item.id} style={{ ...card, padding: 20, borderLeft: `3px solid ${item.status === "new" ? T.red : item.status === "planned" ? T.gold : T.line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div><b style={{ color: T.ink }}>{item.name || "Anonymous learner"}</b><small>{item.email} · {item.source} · {date(item.created_at)}</small></div>
            <div style={{ display: "flex", gap: 7, alignItems: "center" }}><Pill value={item.category} /><span style={{ color: T.gold, letterSpacing: 1 }} aria-label={item.rating ? `${item.rating} out of 5` : "no rating"}>{item.rating ? "★".repeat(item.rating) : "—"}</span></div>
          </div>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.65, color: T.sub, fontSize: 14, margin: "15px 0" }}>{item.message}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["reviewed", "planned", "completed", "archived"].map((status) => <Action key={status} label={status} disabled={item.status === status} onClick={() => void onStatus(item.id, status)} primary={status === "planned"} />)}</div>
        </article>
      )) : <div style={{ ...card, padding: 36, textAlign: "center", color: T.muted }}>No feedback yet.</div>}
    </section>
  )
}

/* ------------------------------------------------------------------ page */

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [reviewing, setReviewing] = useState("")
  const [tab, setTab] = useState<TabId>("overview")
  const [range, setRange] = useState<7 | 30 | 90>(30)

  const load = async () => {
    setLoading(true)
    setError("")
    const { data: sessionData } = await supabase.auth.getSession()
    try {
      const response = await fetch("/api/admin-analytics", { headers: { Authorization: `Bearer ${sessionData.session?.access_token || ""}` } })
      if (!response.ok) throw new Error(response.status === 403 ? "Founder access is required." : "Analytics could not be loaded.")
      setData((await response.json()) as Data)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Analytics could not be loaded.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && isLaunchAdmin(user)) void load()
  }, [authLoading, user])

  const metrics = useMemo(() => (data ? buildMetrics(data, range) : null), [data, range])

  const reviewPartner = async (id: string, status: "active" | "rejected" | "pending") => {
    setReviewing(id)
    const ok = await setAffiliateStatus(id, status)
    if (ok) setData((current) => current ? { ...current, partners: current.partners.map((partner) => partner.id === id ? { ...partner, status } : partner) } : current)
    else setError("The partner status could not be updated. Please try again.")
    setReviewing("")
  }

  const markDuePaid = async (id: string) => {
    const reference = window.prompt("Enter the Visa/bank transfer reference. Only continue after the money has actually been sent.")?.trim()
    if (!reference) return
    if (!window.confirm("Confirm the external payout is complete and record these matured commissions as paid?")) return
    setReviewing(id)
    const ok = await markAffiliateDuePaid(id, reference)
    if (ok) await load()
    else setError("Payout was not recorded. Check the reference and matured commission balance.")
    setReviewing("")
  }

  const refundUser = async (id: string, email?: string) => {
    const reason = window.prompt(`Reason for fully refunding ${email || "this customer"}?`)?.trim()
    if (!reason) return
    if (!window.confirm("This will refund the latest paid invoice and immediately cancel access. Continue?")) return
    setReviewing(id)
    setError("")
    const { data: sessionData } = await supabase.auth.getSession()
    const response = await fetch("/api/stripe?action=refund", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData.session?.access_token || ""}` },
      body: JSON.stringify({ userId: id, reason }),
    })
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean; refundId?: string; reason?: string }
    if (result.ok) {
      window.alert(`Refund completed. Stripe reference: ${result.refundId || "available in Stripe"}`)
      await load()
    } else setError(`Refund failed: ${result.reason || "unknown_error"}. No access change was made by this screen.`)
    setReviewing("")
  }

  const updateFeedback = async (id: string, status: string) => {
    const { data: sessionData } = await supabase.auth.getSession()
    // POST, not PATCH: api/affiliate rejects every other method with a bare 405
    // before it even looks at `action`, so on PATCH each status button just
    // surfaced "Feedback status could not be updated." Every sibling call in
    // src/lib/affiliate.ts posts for the same reason.
    const response = await fetch("/api/affiliate?action=feedback-status", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData.session?.access_token || ""}` },
      body: JSON.stringify({ id, status }),
    })
    const result = (await response.json().catch(() => ({}))) as { ok?: boolean }
    if (result.ok) setData((current) => current ? { ...current, feedback: current.feedback.map((item) => item.id === id ? { ...item, status } : item) } : current)
    else setError("Feedback status could not be updated.")
  }

  if (authLoading) return null
  if (!isLaunchAdmin(user)) return <Navigate to="/" replace />

  return (
    <MotionConfig reducedMotion="user">
      <main style={{ minHeight: "100dvh", background: T.page, color: T.ink, fontFamily: T.sans }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(14,14,18,.85)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${T.line}` }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px clamp(18px,4vw,36px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <ScholifyLockup size={26} color={T.ink} weight={850} />
              <span className="admin-live" aria-hidden />
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: T.muted }}>Command centre</span>
            </div>
            <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
              {data && <span className="admin-generated" style={{ fontSize: 11, color: T.muted, fontFamily: T.mono }}>as of {date(data.generatedAt)}</span>}
              <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 10, color: T.sub, textDecoration: "none", fontSize: 12, fontWeight: 700, border: `1px solid ${T.line}` }}><ArrowLeft size={14} aria-hidden /> Landing</Link>
              <button onClick={() => void load()} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 10, border: 0, background: T.blue, color: "#fff", fontSize: 12, fontWeight: 700, cursor: loading ? "wait" : "pointer" }}>
                <RefreshCw size={14} aria-hidden className={loading ? "admin-spin" : undefined} /> Refresh
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px clamp(18px,4vw,36px) 80px" }}>
          <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, marginBottom: 22 }}>
            <div>
              <div style={{ color: T.red, fontSize: 10, fontWeight: 900, letterSpacing: ".15em", textTransform: "uppercase" }}>Founder pit wall · private</div>
              <h1 style={{ fontSize: "clamp(28px,4.5vw,42px)", margin: "8px 0 6px", letterSpacing: "-.04em", color: T.ink }}>Scholify traction.</h1>
              <p style={{ color: T.muted, margin: 0, fontSize: 13.5 }}>Every metric and every ratio — revenue, growth, retention, AI economics and partner performance in one live view.</p>
            </div>
            <div className="admin-charles"><CharlesMascot pose="chart" size={104} /></div>
          </section>

          <nav aria-label="Dashboard sections" style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4, marginBottom: 12 }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} aria-current={tab === id ? "page" : undefined} style={{ position: "relative", border: 0, background: "transparent", borderRadius: 10, padding: "9px 14px", cursor: "pointer", whiteSpace: "nowrap", fontWeight: 700, fontSize: 12.5, color: tab === id ? T.ink : T.muted, display: "inline-flex", alignItems: "center", gap: 7 }}>
                {tab === id && <motion.span layoutId="admin-tab-pill" transition={{ type: "spring", stiffness: 500, damping: 40 }} style={{ position: "absolute", inset: 0, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10 }} />}
                <Icon size={14} aria-hidden style={{ position: "relative" }} />
                <span style={{ position: "relative" }}>{label}{id === "feedback" && data?.summary.newFeedback ? ` · ${data.summary.newFeedback}` : ""}</span>
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }} role="group" aria-label="Time range for charts and deltas">
            <span style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>Range</span>
            {([7, 30, 90] as const).map((preset) => (
              <button key={preset} onClick={() => setRange(preset)} aria-pressed={range === preset} style={{ border: `1px solid ${range === preset ? "rgba(57,135,229,.5)" : T.line}`, background: range === preset ? "rgba(57,135,229,.16)" : "transparent", color: range === preset ? T.blue : T.muted, borderRadius: 999, padding: "6px 13px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>
                {preset} days
              </button>
            ))}
            <span style={{ fontSize: 11, color: T.muted, marginLeft: 4 }}>scopes every chart and delta below</span>
          </div>

          {loading && !data && (
            <div style={{ display: "grid", gap: 14 }}>
              <div className="admin-grid">{[0, 1, 2, 3].map((index) => <div key={index} className="admin-skeleton" style={{ ...card, height: 130 }} />)}</div>
              <div className="admin-skeleton" style={{ ...card, height: 300 }} />
            </div>
          )}
          {error && <div style={{ ...card, padding: 22, color: T.red, marginBottom: 14 }}>{error}</div>}

          {data && metrics && (
            <div style={{ opacity: loading ? 0.55 : 1, transition: "opacity .2s ease" }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: "easeOut" }}>
                  {tab === "overview" && <OverviewTab data={data} metrics={metrics} range={range} />}
                  {tab === "revenue" && <RevenueTab data={data} metrics={metrics} />}
                  {tab === "growth" && <GrowthTab data={data} metrics={metrics} range={range} />}
                  {tab === "engagement" && <EngagementTab data={data} metrics={metrics} />}
                  {tab === "ai" && <AiTab data={data} metrics={metrics} />}
                  {tab === "partners" && <PartnersTab data={data} reviewing={reviewing} onReview={reviewPartner} onMarkPaid={markDuePaid} />}
                  {tab === "users" && <UsersTab data={data} reviewing={reviewing} onRefund={refundUser} />}
                  {tab === "feedback" && <FeedbackTab data={data} metrics={metrics} onStatus={updateFeedback} />}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <style>{`
          small{display:block;color:${T.muted};font-size:11px;margin-top:3px;font-weight:400}
          .admin-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
          .admin-cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
          .admin-ratio-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
          .admin-row:hover td{background:rgba(255,255,255,.015)}
          .admin-live{width:8px;height:8px;border-radius:99px;background:${T.good};box-shadow:0 0 0 0 rgba(12,163,12,.5)}
          .admin-spin{animation:adminspin 1s linear infinite}
          .admin-skeleton{position:relative;overflow:hidden}
          .admin-skeleton::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.045),transparent);transform:translateX(-100%);animation:adminshimmer 1.4s ease infinite}
          @keyframes adminspin{to{transform:rotate(360deg)}}
          @keyframes adminshimmer{to{transform:translateX(100%)}}
          @media (prefers-reduced-motion: no-preference){.admin-live{animation:adminpulse 2.4s ease-out infinite}}
          @keyframes adminpulse{0%{box-shadow:0 0 0 0 rgba(12,163,12,.45)}70%{box-shadow:0 0 0 7px rgba(12,163,12,0)}100%{box-shadow:0 0 0 0 rgba(12,163,12,0)}}
          @media (prefers-reduced-motion: reduce){.admin-spin,.admin-skeleton::after{animation:none}}
          @media(max-width:1020px){.admin-ratio-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
          @media(max-width:900px){.admin-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.admin-cols{grid-template-columns:1fr}.admin-charles{display:none}.admin-generated{display:none}}
          @media(max-width:520px){.admin-grid{grid-template-columns:1fr}.admin-ratio-grid{grid-template-columns:1fr}}
        `}</style>
      </main>
    </MotionConfig>
  )
}
