/*
 * Scholify ACCA — shared metrics layer.
 *
 * One family of chart primitives so every number in the app is measured the
 * same way and looks like one professional system:
 *
 *   StatCard      — KPI tile: label · big value · signed delta chip vs last
 *                   week · optional 14-day sparkbars
 *   RingGauge     — animated donut with count-up centre number and an
 *                   optional target tick (pass line)
 *   MeterBar      — thin labeled progress bar with an optional target tick;
 *                   the track is a lighter step of the same ramp
 *   BreakdownList — per-category rows: code chip · label · thin bar · value
 *   Sparkbars     — mini daily bar chart with pointer tooltip
 *
 * Design rules baked in (dataviz spec): thin marks with rounded data-ends,
 * 2px surface gaps between bars, values always visible as text (color is
 * never the only channel), text wears text tokens — the colored mark beside
 * it carries state. Status colors (green/amber/red) are used only where the
 * number MEANS good/at-risk/behind vs a pass line.
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { motion } from "motion/react"
import { C, SP, R, SHADOW, TYPE, Icon, type IconName } from "@/components/acca/ui"

/* ── Shared helpers ───────────────────────────────────────────── */

/** Count-up for headline numbers, so the reveal feels earned. */
export function useCountUp(target: number, run = true, ms = 1100): number {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - t, 3)
      setV(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, ms])
  return run ? v : target
}

/**
 * Status color for a score measured against a pass line: at/above the line
 * is good, within 15 points below is at-risk, further below is behind.
 */
export function bandColor(pct: number, passLine = 60): string {
  if (pct >= passLine) return C.green
  if (pct >= passLine - 15) return C.amber
  return C.red
}

export function bandSoft(pct: number, passLine = 60): string {
  if (pct >= passLine) return C.greenSoft
  if (pct >= passLine - 15) return C.amberSoft
  return C.redSoft
}

const dayName = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })

/* ── DeltaChip — signed change vs a named period ──────────────── */

export function DeltaChip({
  delta,
  suffix = "%",
  vs = "last week",
  upIsGood = true,
}: {
  delta: number
  suffix?: string
  vs?: string
  upIsGood?: boolean
}) {
  const flat = delta === 0
  const good = flat ? null : delta > 0 === upIsGood
  const color = flat ? C.soft : good ? C.green : C.red
  const bg = flat ? C.card2 : good ? C.greenSoft : C.redSoft
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "2px 7px",
        borderRadius: R.pill,
        background: bg,
        fontSize: 11,
        fontWeight: 750,
        color,
        whiteSpace: "nowrap",
      }}
    >
      {!flat && (
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden style={{ flexShrink: 0 }}>
          <path
            d={delta > 0 ? "M4 1 L7 6 L1 6 Z" : "M4 7 L1 2 L7 2 Z"}
            fill={color}
          />
        </svg>
      )}
      {delta > 0 ? "+" : ""}
      {delta}
      {suffix}
      <span style={{ fontWeight: 550, color: C.faint }}>{vs}</span>
    </span>
  )
}

/* ── Sparkbars — mini daily bar chart ─────────────────────────── */

export interface SparkPoint {
  date: string
  count: number
}

export function Sparkbars({
  data,
  height = 38,
  color = C.brand,
  restColor = "rgba(200,0,0,0.18)",
  unit = "answered",
}: {
  data: SparkPoint[]
  height?: number
  color?: string
  restColor?: string
  unit?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const max = Math.max(1, ...data.map((d) => d.count))

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={`${unit} per day, last ${data.length} days`}
      style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 2, height, cursor: "default" }}
      onPointerMove={(e) => {
        const rect = wrapRef.current?.getBoundingClientRect()
        if (!rect) return
        const i = Math.min(data.length - 1, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * data.length)))
        setHover(i)
      }}
      onPointerLeave={() => setHover(null)}
    >
      {data.map((d, i) => {
        const last = i === data.length - 1
        const h = d.count === 0 ? 3 : Math.max(4, Math.round((d.count / max) * height))
        return (
          <motion.div
            key={d.date}
            initial={{ height: 3 }}
            animate={{ height: h }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
            style={{
              flex: 1,
              minWidth: 3,
              maxWidth: 10,
              borderRadius: "3px 3px 0 0",
              background: hover === i ? color : last ? color : d.count === 0 ? C.card2 : restColor,
            }}
          />
        )
      })}
      {hover != null && data[hover] && (
        <div
          style={{
            position: "absolute",
            bottom: height + 6,
            left: `${((hover + 0.5) / data.length) * 100}%`,
            transform: "translateX(-50%)",
            background: C.text,
            color: "var(--sch-card)",
            borderRadius: R.sm,
            padding: "5px 9px",
            fontSize: 11,
            fontWeight: 650,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: SHADOW.md,
            zIndex: 5,
          }}
        >
          <span style={{ fontWeight: 800 }}>{data[hover].count}</span> {unit}
          <span style={{ opacity: 0.7 }}> · {dayName(data[hover].date)}</span>
        </div>
      )}
    </div>
  )
}

/* ── StatCard — the KPI tile ──────────────────────────────────── */

export function StatCard({
  label,
  value,
  suffix,
  icon,
  delta,
  deltaSuffix,
  deltaVs,
  upIsGood = true,
  spark,
  sparkUnit,
  footnote,
  index = 0,
}: {
  label: string
  value: ReactNode
  suffix?: string
  icon?: IconName
  delta?: number | null
  deltaSuffix?: string
  deltaVs?: string
  upIsGood?: boolean
  spark?: SparkPoint[]
  sparkUnit?: string
  footnote?: string
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: R.xl,
        boxShadow: SHADOW.sm,
        padding: SP.lg,
        display: "flex",
        flexDirection: "column",
        gap: SP.sm,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon && <Icon name={icon} size={13} color={C.brand} strokeWidth={2.4} />}
        <span style={{ ...TYPE.label, color: C.faint, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 27, fontWeight: 800, color: C.text, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {value}
          {suffix && <span style={{ fontSize: 15, fontWeight: 700, color: C.soft, marginLeft: 1 }}>{suffix}</span>}
        </span>
        {delta != null && <DeltaChip delta={delta} suffix={deltaSuffix} vs={deltaVs} upIsGood={upIsGood} />}
      </div>
      {spark && spark.length > 0 && <Sparkbars data={spark} unit={sparkUnit} />}
      {footnote && <span style={{ ...TYPE.small, color: C.faint }}>{footnote}</span>}
    </motion.div>
  )
}

/* ── RingGauge — animated donut with centre number ────────────── */

export function RingGauge({
  value,
  size = 180,
  stroke = 13,
  color,
  label,
  sublabel,
  run = true,
  target,
  suffix = "%",
}: {
  /** 0–100. */
  value: number
  size?: number
  stroke?: number
  color?: string
  /** Small colored line under the number (e.g. "chance to pass"). */
  label?: string
  /** Muted line under the label. */
  sublabel?: string
  run?: boolean
  /** Optional 0–100 target tick (e.g. the pass line). */
  target?: number
  suffix?: string
}) {
  const pct = Math.max(0, Math.min(100, value))
  const fill = color ?? bandColor(pct, target ?? 60)
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const shown = useCountUp(pct, run)
  const offset = circ * (1 - pct / 100)
  const targetAngle = target != null ? (target / 100) * 360 - 90 : null

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.card2} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: run ? offset : circ }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      {targetAngle != null && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: stroke + 8,
            height: 2,
            background: C.text,
            opacity: 0.55,
            borderRadius: 2,
            transformOrigin: "0 50%",
            transform: `rotate(${targetAngle}deg) translateX(${r - stroke / 2 - 4}px)`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: stroke + 10,
        }}
      >
        <div style={{ fontSize: size * 0.26, fontWeight: 800, color: C.text, lineHeight: 1 }}>
          {shown}
          <span style={{ fontSize: size * 0.13, fontWeight: 700, color: C.soft }}>{suffix}</span>
        </div>
        {label && (
          <div style={{ fontSize: 12, fontWeight: 750, color: fill, marginTop: 5, letterSpacing: 0.3 }}>{label}</div>
        )}
        {sublabel && <div style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>{sublabel}</div>}
      </div>
    </div>
  )
}

/* ── MeterBar — thin labeled progress bar with target tick ────── */

export function MeterBar({
  value,
  max = 100,
  color = C.brand,
  track,
  height = 8,
  target,
  delay = 0,
  style,
}: {
  value: number
  max?: number
  color?: string
  /** Track defaults to a light step of the surface; pass e.g. C.brandSoft for same-ramp. */
  track?: string
  height?: number
  /** Optional target as a fraction of max (e.g. pass line). */
  target?: number
  delay?: number
  style?: CSSProperties
}) {
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0))
  const targetPct = target != null && max > 0 ? Math.max(0, Math.min(100, (target / max) * 100)) : null
  return (
    <div
      style={{
        position: "relative",
        height,
        background: track ?? C.card2,
        borderRadius: R.pill,
        overflow: "hidden",
        ...style,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        style={{ position: "absolute", inset: "0 auto 0 0", background: color, borderRadius: R.pill }}
      />
      {targetPct != null && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: `${targetPct}%`,
            top: -1,
            bottom: -1,
            width: 2,
            background: C.text,
            opacity: 0.4,
            borderRadius: 2,
          }}
        />
      )}
    </div>
  )
}

/* ── BreakdownList — per-category thin-bar rows ───────────────── */

export interface BreakdownItem {
  code: string
  label: string
  /** 0–100. */
  pct: number
  /** Right-hand value text, e.g. "7/10" — defaults to `pct%`. */
  valueText?: string
}

export function BreakdownRow({
  item,
  passLine = 60,
  delay = 0,
  barWidth = 84,
}: {
  item: BreakdownItem
  passLine?: number
  delay?: number
  barWidth?: number
}) {
  const color = bandColor(item.pct, passLine)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: SP.md, padding: "7px 0", minWidth: 0 }}>
      <span
        style={{
          width: 26,
          height: 26,
          flexShrink: 0,
          borderRadius: 8,
          background: C.card2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 750,
          fontSize: 12,
          color: C.text,
        }}
      >
        {item.code}
      </span>
      <span
        style={{
          flex: 1,
          fontSize: 13,
          color: C.text,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.label}
      </span>
      <MeterBar value={item.pct} color={color} target={passLine} delay={delay} style={{ width: barWidth, flexShrink: 0 }} height={6} />
      <span
        style={{
          width: 44,
          textAlign: "right",
          fontSize: 12,
          fontWeight: 750,
          color: C.muted,
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {item.valueText ?? `${item.pct}%`}
      </span>
    </div>
  )
}

export function BreakdownList({
  items,
  passLine = 60,
  barWidth,
}: {
  items: BreakdownItem[]
  passLine?: number
  barWidth?: number
}) {
  return (
    <div>
      {items.map((it, i) => (
        <BreakdownRow key={it.code + it.label} item={it} passLine={passLine} delay={0.08 + i * 0.06} barWidth={barWidth} />
      ))}
    </div>
  )
}

/* ── TrendBars — dated attempt history (e.g. mocks) vs pass line ── */

export function TrendBars({
  points,
  passLine = 60,
  height = 72,
  unit = "score",
}: {
  points: { date: string; percent: number }[]
  passLine?: number
  height?: number
  unit?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", height, display: "flex", alignItems: "flex-end", gap: 6 }}>
        {/* pass line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: (passLine / 100) * height,
            height: 1,
            background: C.text,
            opacity: 0.25,
          }}
        />
        {points.map((p, i) => {
          const color = bandColor(p.percent, passLine)
          return (
            <div
              key={`${p.date}-${i}`}
              style={{ flex: 1, maxWidth: 34, height: "100%", display: "flex", alignItems: "flex-end", cursor: "default" }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              <motion.div
                initial={{ height: 3 }}
                animate={{ height: `${Math.max(4, p.percent)}%` }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
                style={{
                  width: "100%",
                  borderRadius: "4px 4px 0 0",
                  background: color,
                  opacity: hover == null || hover === i ? 1 : 0.45,
                }}
              />
            </div>
          )
        })}
        {hover != null && points[hover] && (
          <div
            style={{
              position: "absolute",
              bottom: height + 6,
              left: `${((hover + 0.5) / points.length) * 100}%`,
              transform: "translateX(-50%)",
              background: C.text,
              color: "var(--sch-card)",
              borderRadius: R.sm,
              padding: "5px 9px",
              fontSize: 11,
              fontWeight: 650,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: SHADOW.md,
              zIndex: 5,
            }}
          >
            <span style={{ fontWeight: 800 }}>{points[hover].percent}%</span> {unit}
            <span style={{ opacity: 0.7 }}> · {dayName(points[hover].date)}</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ ...TYPE.small, color: C.faint }}>{points.length > 0 ? dayName(points[0].date) : ""}</span>
        <span style={{ ...TYPE.small, color: C.faint }}>pass line {passLine}%</span>
      </div>
    </div>
  )
}
