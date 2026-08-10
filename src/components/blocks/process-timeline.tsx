import * as React from "react"
import { MotionValue, useScroll } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * ── Scroll-driven process primitives ──────────────────────────────
 *
 * Adapted from the 21st.dev "Process Timeline" block by @youcefbnm
 * (https://21st.dev/@youcefbnm/components/process-timeline).
 *
 * Three deliberate changes from the original:
 *
 *   1. The original pulls `useMeasure` from `@uidotdev/usehooks`. That is one
 *      hook's worth of dependency, so it is inlined below on a ResizeObserver.
 *   2. The original reads `window.innerWidth` during render, which is both
 *      SSR-hostile and never recomputed on resize. `useViewportWidth` tracks it.
 *   3. The original always animates. Everything on this landing page has to
 *      honour prefers-reduced-motion, so consumers get the raw progress value
 *      and decide — see SystemWalkthrough, which pins to a static list instead.
 *
 * The mechanic itself is the original's and is the reason to use it: a tall
 * outer container owns the scroll, a sticky inner viewport stays put, and
 * `scrollYProgress` (0→1 across the container) drives whatever is inside. That
 * turns vertical scrolling into stage progression without a scroll hijack.
 */

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined)

export function useContainerScroll(): ContainerScrollContextValue {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error("useContainerScroll must be used inside a <ContainerScroll>")
  }
  return context
}

/** Element size via ResizeObserver — replaces the original's usehooks dependency. */
export function useMeasure<T extends HTMLElement>(): [
  React.RefCallback<T>,
  { width: number; height: number },
] {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  const observer = React.useRef<ResizeObserver | null>(null)

  const ref = React.useCallback<React.RefCallback<T>>((node) => {
    observer.current?.disconnect()
    if (!node || typeof ResizeObserver === "undefined") return
    observer.current = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      setSize({ width: box.width, height: box.height })
    })
    observer.current.observe(node)
  }, [])

  React.useEffect(() => () => observer.current?.disconnect(), [])

  return [ref, size]
}

/** Viewport width that actually updates, unlike a bare `window.innerWidth` read. */
export function useViewportWidth(): number {
  const [width, setWidth] = React.useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  )
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return width
}

/**
 * The scroll owner. Give it a tall height (its own scroll distance is what the
 * progress is measured against) and put a <ContainerSticky> inside it.
 */
export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn("relative", className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

/** The pinned viewport that stays put while the container scrolls past it. */
export const ContainerSticky = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("sticky left-0 top-0 w-full overflow-hidden", className)} {...props} />
  ),
)
ContainerSticky.displayName = "ContainerSticky"
