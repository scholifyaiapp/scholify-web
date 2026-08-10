/*
 * Scholify ACCA — shared design foundation.
 *
 * One source of truth for the app's look so every screen reads as one system:
 * a spacing/radius/shadow/type scale, motion presets, a Lucide icon layer
 * (no more emoji-as-icons), and a small set of primitives (Card, SectionLabel,
 * Stat, Button, Badge). Colours come from the CSS tokens in index.css
 * (`--sch-*`), so light/dark themes keep working untouched.
 */

import { forwardRef, useState, type CSSProperties, type ReactNode } from "react"
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"
import {
  GraduationCap, TrendingUp, Settings, Target, Timer, Brain, BookOpen,
  FlaskConical, Sparkles, Flame, Trophy, RotateCw, Lock, CheckCircle2,
  ClipboardCheck, CalendarDays, ShieldCheck, PenLine, Layers, Landmark,
  Stethoscope, HeartHandshake, PartyPopper, ArrowRight, ChevronRight,
  Pencil, Dumbbell, Map, Zap, BarChart3, Rocket, Gem, Clock, X, Camera,
  Calculator, Table2, Sigma, NotebookPen, Pin, Trash2, AlertTriangle, FileUp,
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
  camera: Camera, calc: Calculator, sheet: Table2, formula: Sigma,
  notes: NotebookPen, pin: Pin, trash: Trash2, alert: AlertTriangle, upload: FileUp,
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

/* ── THE BUTTON ────────────────────────────────────────────────────
 *
 * One primitive, refreshed. The old one had three variants, two sizes, a tap
 * scale and nothing else — so every surface that needed a loading state, a
 * destructive action, an icon-only control or a full-width CTA hand-rolled its
 * own `<motion.button style={{…}}>`, and the app ended up with dozens of
 * near-identical buttons that agreed on nothing: different heights, different
 * radii, different disabled treatments, no focus ring on most of them.
 *
 * What this adds, and why each one is here rather than in a caller:
 *
 *   · LOADING — an async button that stays clickable submits twice. `loading`
 *     disables, swaps in a spinner, and preserves the label's width so the button
 *     does not resize mid-submit (which moves everything below it).
 *   · DESTRUCTIVE and SUBTLE variants — both existed in the wild as one-offs.
 *   · ICON size — a 40×40 square control with a real 44px touch target via
 *     padding, because icon buttons were the worst offenders for tap size.
 *   · A VISIBLE FOCUS RING that follows the variant. Keyboard and screen-reader
 *     users cannot use a button they cannot see focus on, and `:focus-visible`
 *     cannot be expressed in an inline style — hence the local state.
 *   · PRESS PHYSICS that read as physical: a spring on release rather than a
 *     linear scale, and a hover LIFT on pointer devices only. Both are dropped
 *     entirely under prefers-reduced-motion.
 *
 * Every value comes from the tokens above (SP / R / SHADOW / C), so a button here
 * cannot drift from the cards it sits inside.
 */

type BtnVariant = "primary" | "secondary" | "ghost" | "subtle" | "destructive"
type BtnSize = "sm" | "md" | "lg" | "icon"

type BtnProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: BtnVariant
  size?: BtnSize
  full?: boolean
  /** Disables, shows a spinner, and holds the label's width. */
  loading?: boolean
  /** Leading icon — sized and coloured to match the variant automatically. */
  icon?: IconName
  /** Trailing icon, e.g. an arrow on a CTA. */
  trailingIcon?: IconName
  children?: ReactNode
}

const BTN_PAD: Record<BtnSize, string> = {
  sm: "8px 13px",
  md: "11px 18px",
  lg: "15px 24px",
  icon: "10px",
}
const BTN_FONT: Record<BtnSize, number> = { sm: 13, md: 14, lg: 15.5, icon: 14 }
const BTN_ICON: Record<BtnSize, number> = { sm: 14, md: 16, lg: 18, icon: 18 }

/** A one-element spinner — no dependency, respects the button's own colour. */
function BtnSpinner({ size, color }: { size: number; color: string }) {
  return (
    <motion.span
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        borderTopColor: "transparent",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  )
}

/** The one button. Stable hover (no layout shift), real focus ring, 44px+ tall. */
export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { variant = "primary", size = "md", full, loading, icon, trailingIcon, style, children, disabled, ...rest }, ref,
) {
  const [focusRing, setFocusRing] = useState(false)
  const reduced = useReducedMotion()
  const off = Boolean(disabled) || Boolean(loading)

  const palette: Record<BtnVariant, { bg: string; fg: string; border: string; shadow: string; ring: string }> = {
    primary: { bg: GRAD, fg: "#fff", border: "transparent", shadow: SHADOW.brand, ring: "rgba(200,0,0,0.35)" },
    secondary: { bg: C.card, fg: C.text, border: C.border, shadow: SHADOW.sm, ring: "rgba(200,0,0,0.3)" },
    subtle: { bg: C.card2, fg: C.muted, border: "transparent", shadow: "none", ring: "rgba(200,0,0,0.25)" },
    ghost: { bg: "transparent", fg: C.muted, border: "transparent", shadow: "none", ring: "rgba(200,0,0,0.25)" },
    destructive: { bg: C.redSoft, fg: C.red, border: "rgba(220,38,38,0.28)", shadow: "none", ring: "rgba(220,38,38,0.35)" },
  }
  const v = palette[variant]

  const base: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: size === "sm" ? 6 : SP.sm,
    padding: BTN_PAD[size],
    minHeight: 44,
    minWidth: size === "icon" ? 44 : undefined,
    borderRadius: size === "icon" ? R.md : R.lg,
    fontWeight: 750,
    fontSize: BTN_FONT[size],
    letterSpacing: size === "lg" ? "-0.01em" : undefined,
    lineHeight: 1.2,
    cursor: off ? "not-allowed" : "pointer",
    width: full ? "100%" : undefined,
    border: `1px solid ${off ? C.border : v.border}`,
    background: off && variant === "primary" ? C.card2 : v.bg,
    color: off && variant === "primary" ? C.faint : v.fg,
    boxShadow: off ? "none" : focusRing ? `${v.shadow === "none" ? "" : `${v.shadow}, `}0 0 0 3px ${v.ring}` : v.shadow,
    opacity: disabled && !loading ? 0.55 : 1,
    // Colour/shadow only — never width or padding, so a hover cannot shift layout.
    transition: "background .18s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease, opacity .18s ease",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
  }

  const iconColor = off && variant === "primary" ? C.faint : v.fg

  return (
    <motion.button
      ref={ref}
      disabled={off}
      aria-busy={loading || undefined}
      onFocus={(e) => {
        // Keyboard focus only: a ring drawn on every mouse click reads as a bug.
        if (e.currentTarget.matches(":focus-visible")) setFocusRing(true)
        rest.onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocusRing(false)
        rest.onBlur?.(e)
      }}
      whileHover={off || reduced ? undefined : { y: -1 }}
      whileTap={off || reduced ? undefined : { scale: 0.975, y: 0 }}
      transition={{ type: "spring", stiffness: 480, damping: 30, mass: 0.6 }}
      style={{ ...base, ...style }}
      {...rest}
    >
      {loading ? (
        <>
          <BtnSpinner size={BTN_ICON[size]} color={iconColor} />
          {/* The label stays in the flow, invisible, so the width never jumps. */}
          {children ? <span style={{ visibility: "hidden" }}>{children}</span> : null}
        </>
      ) : (
        <>
          {icon && <Icon name={icon} size={BTN_ICON[size]} color={iconColor} />}
          {children}
          {trailingIcon && <Icon name={trailingIcon} size={BTN_ICON[size]} color={iconColor} />}
        </>
      )}
    </motion.button>
  )
})

/* ── Tab strip ─────────────────────────────────────────────────────
 *
 * The most-tapped control in the app (Learning's Today/Plan/Practice/Progress, and
 * Plan's three altitudes) was hand-rolled in each place: a flex row of buttons that
 * swapped `background` on the active one. Two copies, slightly different paddings,
 * and no motion at all — the selection just teleported, which is the one place a
 * transition genuinely helps because it shows WHICH tab you came from.
 *
 * One component now, with a shared `layoutId` pill that slides between tabs. The
 * pill is a sibling behind the labels rather than the button's own background, so
 * the text never re-renders mid-animation and the slide stays at 60fps.
 *
 * Accessibility is the other reason to centralise: this exposes the tablist/tab
 * roles and `aria-selected`, which neither hand-rolled copy did, so the tabs were
 * announced as a row of unrelated buttons.
 */
export interface TabItem<K extends string> {
  key: K
  label: string
  icon?: IconName
}

export function TabStrip<K extends string>({
  tabs,
  active,
  onChange,
  ariaLabel,
  style,
}: {
  tabs: readonly TabItem<K>[]
  active: K
  onChange: (key: K) => void
  ariaLabel: string
  style?: CSSProperties
}) {
  const reduced = useReducedMotion()
  // Scoped so two strips on one screen cannot capture each other's pill.
  const [layoutId] = useState(() => `tabstrip-${Math.random().toString(36).slice(2, 9)}`)
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{ display: "flex", gap: 4, padding: 4, background: C.card2, borderRadius: R.lg, ...style }}
    >
      {tabs.map((tab) => {
        const on = tab.key === active
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(tab.key)}
            style={{
              position: "relative",
              flex: 1,
              minWidth: 0,
              minHeight: 40,
              padding: "9px 6px",
              borderRadius: R.md,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: on ? C.brand : C.soft,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: on ? 800 : 700,
              transition: "color .18s ease",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {on && (
              <motion.span
                layoutId={reduced ? undefined : layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: R.md,
                  background: C.card,
                  boxShadow: SHADOW.sm,
                  zIndex: 0,
                }}
              />
            )}
            {tab.icon && (
              <span style={{ position: "relative", zIndex: 1, display: "grid" }}>
                <Icon name={tab.icon} size={15} color={on ? C.brand : C.faint} />
              </span>
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * The back control. Was a bare `<button>` with `background: none` repeated in a
 * dozen files at three different font sizes — and at 14px with no padding it was a
 * ~20px tap target, well under the 44px minimum, on the control learners reach for
 * most when they are lost.
 */
export function BackButton({ children = "Back", onClick, style }: { children?: ReactNode; onClick: () => void; style?: CSSProperties }) {
  const reduced = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduced ? undefined : { x: -2 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        minHeight: 40,
        padding: "8px 12px 8px 8px",
        marginBottom: SP.md,
        marginLeft: -8,
        borderRadius: R.md,
        border: "none",
        background: "transparent",
        color: C.soft,
        fontSize: 13.5,
        fontWeight: 700,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        // Merged, not replaced — a caller passing `marginBottom` must not silently
        // drop the padding that makes this a 40px tap target.
        ...style,
      }}
    >
      <Icon name="chevron" size={15} color={C.soft} style={{ transform: "rotate(180deg)" }} />
      {children}
    </motion.button>
  )
}

/** Compact metric block used across overview/progress. */
export function Stat({ label, value, accent }: { label: string; value: ReactNode; accent?: boolean }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: SP.lg, textAlign: "center", boxShadow: SHADOW.sm }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: accent ? C.brand : C.text }}>{value}</div>
      <div style={{ ...TYPE.small, color: C.faint, marginTop: 2 }}>{label}</div>
    </div>
  )
}
