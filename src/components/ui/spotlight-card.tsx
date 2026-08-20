import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "purple" | "green" | "red" | "orange"
  size?: "sm" | "md" | "lg"
  width?: string | number
  height?: string | number
  customSize?: boolean
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
}

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
}

/* ── One pointer listener for every glow card on the page ─────────────
 *
 * Each card used to attach its OWN `document` pointermove listener and write
 * four custom properties from inside the event — so three cards meant three
 * listeners and twelve style writes per pointer event, each invalidating a
 * radial gradient, two pseudo-elements and a blurred child.
 *
 * Now: one shared listener, and the writes are coalesced into a single
 * animation frame. All rects are READ first and all properties written after,
 * so the loop never interleaves reads with writes (which is what turns a
 * cheap update into layout thrash).
 */
const glowCards = new Set<HTMLElement>()
let pointerFrame = 0
let pointerX = 0
let pointerY = 0

function flushGlowCards() {
  pointerFrame = 0
  const measured: Array<{ el: HTMLElement; rect: DOMRect }> = []
  for (const el of glowCards) measured.push({ el, rect: el.getBoundingClientRect() })
  for (const { el, rect } of measured) {
    const x = pointerX - rect.left
    const y = pointerY - rect.top
    el.style.setProperty("--x", x.toFixed(1))
    el.style.setProperty("--y", y.toFixed(1))
    el.style.setProperty("--xp", (rect.width ? x / rect.width : 0).toFixed(3))
    el.style.setProperty("--yp", (rect.height ? y / rect.height : 0).toFixed(3))
  }
}

function onGlowPointerMove(event: PointerEvent) {
  pointerX = event.clientX
  pointerY = event.clientY
  if (!pointerFrame) pointerFrame = requestAnimationFrame(flushGlowCards)
}

function registerGlowCard(el: HTMLElement) {
  glowCards.add(el)
  if (glowCards.size === 1) {
    document.addEventListener("pointermove", onGlowPointerMove, { passive: true })
  }
  return () => {
    glowCards.delete(el)
    if (glowCards.size === 0) {
      document.removeEventListener("pointermove", onGlowPointerMove)
      if (pointerFrame) {
        cancelAnimationFrame(pointerFrame)
        pointerFrame = 0
      }
    }
  }
}

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(hover: none), (pointer: coarse)")
    const update = () => setIsTouch(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const el = cardRef.current
    if (!el) return
    return registerGlowCard(el)
  }, [isTouch])

  const { base, spread } = glowColorMap[glowColor]

  const getSizeClasses = () => (customSize ? "" : sizeMap[size])

  const getInlineStyles = (): CSSProperties => {
    const baseStyles: CSSProperties & Record<string, string | number> = {
      "--base": base,
      "--spread": spread,
      "--radius": "14",
      "--border": "3",
      "--backdrop": "hsl(0 0% 60% / 0.12)",
      "--backup-border": "var(--backdrop)",
      "--size": "200",
      "--outer": "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
      touchAction: "auto",
      /*
       * NOT `background-attachment: fixed`.
       *
       * The spotlight was anchored to the viewport so that page-coordinate
       * pointer values lined up with the gradient. That single declaration is
       * the most reliable way to switch a page off fast-path compositor
       * scrolling: the browser has to repaint the element's background on every
       * scroll frame, whether or not the pointer moved. With three of these
       * cards it taxed the whole page's scroll.
       *
       * The pointer values are card-relative now (see registerGlowCard), so the
       * default `scroll` attachment puts the spotlight in exactly the same
       * place and scrolling stays on the fast path.
       */
      backgroundAttachment: "scroll",
    }
    if (width !== undefined) baseStyles.width = typeof width === "number" ? `${width}px` : width
    if (height !== undefined) baseStyles.height = typeof height === "number" ? `${height}px` : height
    return baseStyles
  }

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow][data-no-glow]::before,
    [data-glow][data-no-glow]::after,
    [data-glow][data-no-glow] > [data-glow] {
      display: none;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      /* No will-change: filter — it pinned a blurred layer in memory for the
         life of the page, per card, for an effect that only moves on hover. */
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        data-no-glow={isTouch ? "true" : undefined}
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-2xl
          relative
          ${isTouch ? "" : "backdrop-blur-[5px]"}
          ${className}
        `}
      >
        <div data-glow />
        {children}
      </div>
    </>
  )
}
