/*
 * Scholify ACCA — shared design foundation.
 *
 * One source of truth for the app's look so every screen reads as one system:
 * a spacing/radius/shadow/type scale, motion presets, a Lucide icon layer
 * (no more emoji-as-icons), and a small set of primitives (Card, SectionLabel,
 * Stat, Button, Badge). Colours come from the CSS tokens in index.css
 * (`--sch-*`), so light/dark themes keep working untouched.
 */

import { forwardRef, type CSSProperties, type ReactNode } from "react"
import { motion, type HTMLMotionProps } from "motion/react"
import {
  GraduationCap, TrendingUp, Settings, Target, Timer, Brain, BookOpen,
  FlaskConical, Sparkles, Flame, Trophy, RotateCw, Lock, CheckCircle2,
  ClipboardCheck, CalendarDays, ShieldCheck, PenLine, Layers, Landmark,
  Stethoscope, HeartHandshake, PartyPopper, ArrowRight, ChevronRight,
  Pencil, Dumbbell, Map, Zap, BarChart3, Rocket, Gem, Clock, X, Camera,
  type LucideIcon,
} from "lucide-react"

/* ── Colour tokens (semantic, on top of --sch-* CSS vars) ─────── */

export const C = {
  text: "var(--sch-text)",
  muted: "var(--sch-tx-1)",
  soft: "var(--sch-tx-2)",
  faint: "var(--sch-tx-3)",
  card: "var(--sch-card)",
  card2: "var(--sch-card-2)",
  bg: "var(--sch-bg)",
  border: "var(--sch-border)",
  hairline: "var(--sch-hairline)",
  brand: "#C80000",
  brandSoft: "rgba(200,0,0,0.08)",
  brandLine: "rgba(200,0,0,0.22)",
  green: "#0E9F6E",
  greenSoft: "rgba(14,159,110,0.10)",
  amber: "#C2740B",
  amberSoft: "rgba(194,116,11,0.10)",
  red: "#DC2626",
  redSoft: "rgba(220,38,38,0.08)",
} as const

/** The ACCA accent gradient (kept in sync with auth-ui IRIDESCENT). */
export const GRAD = "linear-gradient(135deg,#C80000 0%,#E50068 48%,#F4A405 100%)"

/* ── Scale: 4px spacing grid, radii, shadows, type ────────────── */

export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, "2xl": 24, "3xl": 32, "4xl": 40 } as const
export const R = { sm: 10, md: 12, lg: 14, xl: 16, "2xl": 20, pill: 999 } as const

/** Soft, warm-tinted elevation — one system, three steps. */
export const SHADOW = {
  sm: "0 1px 2px rgba(51,43,40,0.04), 0 1px 3px rgba(51,43,40,0.06)",
  md: "0 2px 6px rgba(51,43,40,0.05), 0 8px 24px rgba(51,43,40,0.06)",
  lg: "0 8px 20px rgba(51,43,40,0.08), 0 20px 48px rgba(51,43,40,0.10)",
  brand: "0 8px 24px rgba(200,0,0,0.22)",
} as const

export const TYPE = {
  h1: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 },
  h2: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.25 },
  h3: { fontSize: 16, fontWeight: 750, lineHeight: 1.3 },
  body: { fontSize: 14, fontWeight: 450, lineHeight: 1.55 },
  small: { fontSize: 12.5, fontWeight: 500, lineHeight: 1.5 },
  label: { fontSize: 11.5, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" as const },
} satisfies Record<string, CSSProperties>

/* ── Motion presets — calm, consistent, reduced-motion-safe ───── */

export const MOTION = {
  /** Page/section enter. */
  rise: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
  /** Staggered list item — pass a custom index. */
  item: (i: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
  /** Hover that never shifts layout (opacity/shadow, not scale). */
  press: { whileTap: { scale: 0.99 } },
} as const

/* ── Icons — semantic names → Lucide (replaces emoji everywhere) ── */

const ICONS = {
  study: GraduationCap, progress: TrendingUp, settings: Settings,
  diagnostic: Target, mock: Timer, flashcards: Brain, learn: BookOpen,
  generate: FlaskConical, tutor: Sparkles, streak: Flame, trophy: Trophy,
  loop: RotateCw, lock: Lock, done: CheckCircle2, check: ClipboardCheck,
  calendar: CalendarDays, shield: ShieldCheck, examiner: PenLine,
  topics: Layers, exam: Landmark, reflect: Stethoscope, support: HeartHandshake,
  celebrate: PartyPopper, arrow: ArrowRight, chevron: ChevronRight,
  practice: Pencil, weak: Dumbbell, roadmap: Map, mission: Zap,
  stats: BarChart3, rocket: Rocket, gem: Gem, time: Clock, close: X,
  camera: Camera,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS

export function Icon({
  name, size = 18, color = "currentColor", strokeWidth = 2, style,
}: { name: IconName; size?: number; color?: string; strokeWidth?: number; style?: CSSProperties }) {
  const Cmp = ICONS[name]
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} style={{ flexShrink: 0, ...style }} aria-hidden />
}

/** A tinted square badge holding an icon — the app's tile/marker motif. */
export function IconBadge({
  name, tone = "brand", size = 40,
}: { name: IconName; tone?: "brand" | "green" | "amber" | "neutral"; size?: number }) {
  const bg =
    tone === "brand" ? C.brandSoft : tone === "green" ? C.greenSoft : tone === "amber" ? C.amberSoft : C.card2
  const fg = tone === "brand" ? C.brand : tone === "green" ? C.green : tone === "amber" ? C.amber : C.soft
  return (
    <span
      style={{
        width: size, height: size, borderRadius: R.md, background: bg, color: fg,
        display: "grid", placeItems: "center", flexShrink: 0,
      }}
    >
      <Icon name={name} size={size * 0.5} color={fg} />
    </span>
  )
}

/* ── Primitives ───────────────────────────────────────────────── */

export function Card({
  children, style, interactive, ...rest
}: HTMLMotionProps<"div"> & { interactive?: boolean }) {
  return (
    <motion.div
      {...(interactive ? { whileHover: { y: -2, boxShadow: SHADOW.md }, ...MOTION.press } : {})}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: R["2xl"],
        padding: SP.xl,
        boxShadow: SHADOW.sm,
        ...(interactive ? { cursor: "pointer" } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ ...TYPE.label, color: C.faint, marginBottom: SP.md, ...style }}>{children}</div>
}

/** An uppercase section header with a leading icon — replaces emoji-in-heading. */
export function SectionHead({
  icon, children, right, style,
}: { icon?: IconName; children: ReactNode; right?: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: SP.md, ...style }}>
      {icon && <Icon name={icon} size={14} color={C.brand} strokeWidth={2.4} />}
      <span style={{ ...TYPE.label, color: C.faint }}>{children}</span>
      {right != null && <span style={{ marginLeft: "auto" }}>{right}</span>}
    </div>
  )
}

export function Badge({
  children, tone = "neutral",
}: { children: ReactNode; tone?: "brand" | "green" | "amber" | "neutral" }) {
  const map = {
    brand: { bg: C.brandSoft, fg: C.brand },
    green: { bg: C.greenSoft, fg: C.green },
    amber: { bg: C.amberSoft, fg: C.amber },
    neutral: { bg: C.card2, fg: C.soft },
  }[tone]
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 9px",
        borderRadius: R.pill, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.03em",
        background: map.bg, color: map.fg, whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  )
}

type BtnProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost"
  size?: "md" | "lg"
  full?: boolean
}

/** The one button. Stable hover (no layout shift), real focus ring, 44px+ tall. */
export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { variant = "primary", size = "md", full, style, children, disabled, ...rest }, ref,
) {
  const pad = size === "lg" ? "15px 22px" : "11px 18px"
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: SP.sm,
    padding: pad, minHeight: 44, borderRadius: R.lg, fontWeight: 700,
    fontSize: size === "lg" ? 15.5 : 14, cursor: disabled ? "not-allowed" : "pointer",
    width: full ? "100%" : undefined, border: "1px solid transparent",
    transition: "background .18s ease, border-color .18s ease, color .18s ease, opacity .18s ease",
    opacity: disabled ? 0.55 : 1,
  }
  const variants: Record<string, CSSProperties> = {
    primary: { background: disabled ? C.card2 : GRAD, color: disabled ? C.faint : "#fff", boxShadow: disabled ? "none" : SHADOW.brand },
    secondary: { background: C.card, color: C.text, borderColor: C.border, boxShadow: SHADOW.sm },
    ghost: { background: "transparent", color: C.muted },
  }
  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

/** Compact metric block used across overview/progress. */
export function Stat({ label, value, accent }: { label: string; value: ReactNode; accent?: boolean }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: SP.lg, textAlign: "center", boxShadow: SHADOW.sm }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: accent ? C.brand : C.text }}>{value}</div>
      <div style={{ ...TYPE.small, color: C.faint, marginTop: 2 }}>{label}</div>
    </div>
  )
}
