import { motion, useReducedMotion } from "motion/react"
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { choiceTabIndex, nextChoiceIndex } from "@/lib/acca-onboarding-choice"

/*
 * Onboarding selection controls.
 *
 * One accessible primitive replacing the fifteen hand-rolled "selected option"
 * buttons that were spread across the eight slide bodies of /welcome.
 *
 * WHAT WAS WRONG
 *  · Nothing announced its state. `aria-pressed`, `aria-checked` and
 *    role="radio" appeared ZERO times in the 1,658-line page, so a screen reader
 *    met a row of identical buttons with no way to tell which was chosen.
 *  · Six groups (minutes, slot, days, target, CEFR, certificate type) signalled
 *    selection with a red border and nothing else — colour as the only channel,
 *    which excludes colour-blind and low-vision users.
 *  · Several controls sat under the 44px touch minimum: the CEFR buttons
 *    rendered at roughly 33px and the certificate-type buttons at roughly 25px.
 *  · `transition: all .18s` on six of them, which animates layout properties as
 *    happily as paint ones.
 *
 * WHAT THIS GIVES INSTEAD
 *  role="radiogroup" with real radio semantics, ONE tab stop per group, arrow
 *  keys moving and selecting within it (nextChoiceIndex / choiceTabIndex, both
 *  unit-tested in lib/acca-onboarding-choice.test.ts), a check mark on every
 *  selected item so state never rests on colour alone, an enforced 44px floor a
 *  slide cannot opt out of, and paint-only transitions.
 *
 * Separate from onboarding-ui.tsx because that file is the motion/presentation
 * kit (GlassButton, AnimatedHeadline, RouteJourney3D) and this one is input.
 * They share the same motion contract but nothing else.
 *
 * Focus rings are deliberately NOT styled here: index.css already applies a 2px
 * `:focus-visible` outline in brand red to every element, and these are native
 * <button>s, so they inherit it. Restyling would only risk weakening it.
 */

/* Brand tokens — Scholify Brand Board (Visual Identity). */
const INK = "#14141A"
const RED = "#C80000"
const MUTE = "#8B837C"
const META = "#7A7168"
const BORDER = "#ECE4DE"
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

/* The selected surface, in one place. This pair was written out by hand fifteen
   times across the slide bodies, which is how six groups ended up signalling
   selection with nothing but a border colour. */
const SEL_BG = "rgba(200,0,0,.05)"
const SEL_RING = "0 0 0 3px rgba(200,0,0,.07)"

/* Paint-only properties, named explicitly. `transition: all` was the previous
   idiom and it animates padding and width just as happily, which is exactly the
   layout-affecting motion the kit's contract forbids. */
const PAINT = "background-color .18s ease, border-color .18s ease, box-shadow .18s ease, color .18s ease"

const PRESS = { scale: 0.985 } as const
const SPRING = { type: "spring", stiffness: 420, damping: 32, mass: 0.5 } as const

type ChoiceContextValue = {
  value: string | null
  values: readonly string[]
  select: (next: string) => void
}

const ChoiceCtx = createContext<ChoiceContextValue | null>(null)

function useChoiceItem(value: string, disabled: boolean, component: string) {
  const ctx = useContext(ChoiceCtx)
  if (!ctx) throw new Error(`<${component} /> must be rendered inside <ChoiceGroup />`)

  const index = ctx.values.indexOf(value)
  const selectedIndex = ctx.value === null ? -1 : ctx.values.indexOf(ctx.value)
  const selected = ctx.value === value

  return {
    selected,
    props: {
      type: "button" as const,
      role: "radio",
      "aria-checked": selected,
      "aria-disabled": disabled,
      // A radiogroup is ONE tab stop and arrow keys move inside it. See
      // choiceTabIndex for why exactly one item may carry 0.
      tabIndex: choiceTabIndex(index, selectedIndex),
      onClick: disabled ? undefined : () => ctx.select(value),
    },
  }
}

/**
 * The radiogroup. Owns the ordered value list, the keyboard behaviour and the
 * layout; its children decide only how an option LOOKS.
 *
 * `values` must list the options in visual order — it is what the arrow keys
 * walk and what decides which single item is tabbable.
 */
export function ChoiceGroup({
  label,
  values,
  value,
  onChange,
  layout = "column",
  columns = 2,
  gap = 10,
  style,
  children,
}: {
  label: string
  values: readonly string[]
  value: string | null
  onChange: (next: string) => void
  layout?: "column" | "row" | "grid"
  columns?: number
  gap?: number
  style?: CSSProperties
  children: ReactNode
}) {
  const hostRef = useRef<HTMLDivElement>(null)

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const host = hostRef.current
    if (!host) return

    // Read the items from the DOM in render order rather than tracking them in
    // state: that keeps the group correct when a slide conditionally renders an
    // option (the LW/TX variant tiles, the passed-paper list) without every
    // caller having to keep a parallel array in step.
    const items = Array.from(host.querySelectorAll<HTMLElement>('[role="radio"]:not([aria-disabled="true"])'))
    if (items.length === 0) return

    const current = items.indexOf(document.activeElement as HTMLElement)
    const next = nextChoiceIndex(event.key, current, items.length)
    if (next === null) return // not a key we own — leave Tab / Enter / Escape alone

    event.preventDefault()
    // Focus AND activate, which is what a native radio group does on arrow.
    // Routing through click() keeps selection on exactly one code path.
    items[next].focus()
    items[next].click()
  }, [])

  const frame: CSSProperties =
    layout === "grid"
      ? { display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap }
      : layout === "row"
        ? { display: "flex", flexWrap: "wrap", gap }
        : { display: "grid", gap }

  return (
    <ChoiceCtx.Provider value={{ value, values, select: onChange }}>
      <div ref={hostRef} role="radiogroup" aria-label={label} onKeyDown={onKeyDown} style={{ ...frame, ...style }}>
        {children}
      </div>
    </ChoiceCtx.Provider>
  )
}

/** The selected mark — the signal that is NOT colour. */
function CheckMark({ on, size = 20 }: { on: boolean; size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        background: on ? RED : "transparent",
        border: on ? "none" : `1.5px solid ${BORDER}`,
        transition: PAINT,
      }}
    >
      {on ? (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1.6 6.4 4.4 9.2 10.4 3" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  )
}

function itemSkin(selected: boolean, disabled: boolean): CSSProperties {
  return {
    position: "relative",
    textAlign: "left",
    borderRadius: 16,
    border: `1.5px solid ${selected ? RED : BORDER}`,
    background: selected ? SEL_BG : "#fff",
    boxShadow: selected ? SEL_RING : "none",
    cursor: disabled ? "default" : "pointer",
    // 0.45 keeps a passed paper legible while reading as inert. Disabled items
    // stay in the group and stay focusable — dropping them from the keyboard
    // would make "you already passed this" undiscoverable rather than merely
    // unavailable.
    opacity: disabled ? 0.45 : 1,
    transition: PAINT,
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
  }
}

/**
 * Full-width option with an icon, a title and a line of detail — the shape for
 * the big decisions (route, goal, sitting, assessment path).
 *
 * `children` render only while selected, carrying the progressive detail the
 * route cards show. They animate on opacity and transform only; the previous
 * version animated `height: 0 → auto`, which lays out the subtree every frame.
 */
export function ChoiceCard({
  value,
  title,
  detail,
  icon,
  disabled = false,
  children,
}: {
  value: string
  title: string
  detail?: string
  icon?: ReactNode
  disabled?: boolean
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  const { selected, props } = useChoiceItem(value, disabled, "ChoiceCard")

  return (
    <motion.button
      {...props}
      whileTap={disabled || reduce ? undefined : PRESS}
      transition={SPRING}
      style={{ ...itemSkin(selected, disabled), minHeight: 64, padding: "15px 16px", width: "100%" }}
    >
      <span style={{ display: "flex", gap: 13, alignItems: "center" }}>
        {icon ? (
          <span
            style={{
              flex: "none",
              width: 40,
              height: 40,
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              background: selected ? RED : "rgba(200,0,0,.08)",
              transition: PAINT,
            }}
          >
            {icon}
          </span>
        ) : null}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", font: `800 15px/1.25 ${SANS}`, color: INK }}>{title}</span>
          {detail ? (
            <span style={{ display: "block", marginTop: 4, font: `500 12.5px/1.4 ${SANS}`, color: MUTE }}>{detail}</span>
          ) : null}
        </span>
        <CheckMark on={selected} />
      </span>
      {selected && children ? (
        <motion.span
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "block", marginTop: 13, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}
        >
          {children}
        </motion.span>
      ) : null}
    </motion.button>
  )
}

/**
 * Compact option for grids — papers, syllabus variants, evidence modes, target
 * scores. `minHeight: 48` is the floor the paper tiles previously missed at
 * roughly 40px.
 */
export function ChoiceTile({
  value,
  label,
  sub,
  icon,
  mono = false,
  disabled = false,
}: {
  value: string
  label: string
  sub?: string
  icon?: ReactNode
  mono?: boolean
  disabled?: boolean
}) {
  const reduce = useReducedMotion()
  const { selected, props } = useChoiceItem(value, disabled, "ChoiceTile")

  return (
    <motion.button
      {...props}
      whileTap={disabled || reduce ? undefined : PRESS}
      transition={SPRING}
      style={{ ...itemSkin(selected, disabled), minHeight: 48, padding: "11px 12px", width: "100%" }}
    >
      {/* Absolutely positioned so the mark cannot change the tile's content box
          when it appears — a grid of tiles would otherwise re-flow on every
          selection, moving the next option out from under the pointer. */}
      <span style={{ position: "absolute", top: 8, right: 8 }}>
        <CheckMark on={selected} size={16} />
      </span>
      {icon ? <span style={{ display: "block", marginBottom: 7 }}>{icon}</span> : null}
      <span
        style={{
          display: "block",
          paddingRight: 20,
          font: mono ? `700 12.5px/1.2 ${MONO}` : `750 13px/1.25 ${SANS}`,
          color: selected ? RED : INK,
          transition: PAINT,
        }}
      >
        {label}
      </span>
      {sub ? (
        <span style={{ display: "block", marginTop: 4, paddingRight: 20, font: `500 11px/1.35 ${SANS}`, color: MUTE }}>
          {sub}
        </span>
      ) : null}
    </motion.button>
  )
}

/**
 * Single-line pill for dense rows — minutes, slots, days per week, CEFR levels.
 *
 * The mark's box is reserved whether or not it is showing, so selecting a pill
 * cannot change its width. These sit in a wrapping flex row where a width change
 * would re-flow the row and move the next option out from under the finger.
 */
export function ChoicePill({
  value,
  label,
  mono = false,
  disabled = false,
}: {
  value: string
  label: string
  mono?: boolean
  disabled?: boolean
}) {
  const reduce = useReducedMotion()
  const { selected, props } = useChoiceItem(value, disabled, "ChoicePill")

  return (
    <motion.button
      {...props}
      whileTap={disabled || reduce ? undefined : PRESS}
      transition={SPRING}
      style={{
        ...itemSkin(selected, disabled),
        minHeight: 44,
        padding: "0 15px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <CheckMark on={selected} size={15} />
      <span
        style={{
          font: mono ? `700 12.5px/1 ${MONO}` : `650 12.5px/1 ${SANS}`,
          color: selected ? RED : INK,
          transition: PAINT,
        }}
      >
        {label}
      </span>
    </motion.button>
  )
}

/**
 * Independent on/off pill — the "papers I have already passed" list, where any
 * number can be on at once.
 *
 * Deliberately NOT part of ChoiceGroup: these are not mutually exclusive, so
 * radio semantics would misdescribe them. `aria-pressed` is the correct
 * announcement for a toggle, and each is its own tab stop because there is no
 * single "current" item for a roving tabindex to track.
 */
export function TogglePill({
  label,
  on,
  onToggle,
  ariaLabel,
}: {
  label: string
  on: boolean
  onToggle: () => void
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.button
      type="button"
      aria-pressed={on}
      aria-label={ariaLabel}
      onClick={onToggle}
      whileTap={reduce ? undefined : PRESS}
      transition={SPRING}
      style={{
        ...itemSkin(on, false),
        minHeight: 44,
        padding: "0 14px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
      }}
    >
      <CheckMark on={on} size={15} />
      <span style={{ font: `700 12.5px/1 ${MONO}`, color: on ? RED : INK, transition: PAINT }}>{label}</span>
    </motion.button>
  )
}

/** Small uppercase section label, so the slides stop re-declaring it inline. */
export function FieldLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        font: `600 10px/1 ${MONO}`,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: META,
        marginBottom: 10,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
