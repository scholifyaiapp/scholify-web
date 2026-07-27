import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType
    strength?: number
  }

/**
 * MagneticButton — GSAP-powered cursor-magnet effect. Wraps a button/anchor that:
 * - Tilts toward the cursor on mousemove (4D-feel via rotationX/Y)
 * - Translates 40% of the cursor offset toward the cursor
 * - Snaps back with an elastic spring on mouseleave
 *
 * `as` lets you render `<a>` instead of `<button>`. `strength` (0–1) scales the magnet pull (default 0.4).
 */
export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", strength = 0.4, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
      if (typeof window === "undefined") return
      const element = localRef.current
      if (!element) return

      // The magnet is a desktop pointer nicety. On touch devices the
      // synthetic mousemove fired on tap shifts the element out from
      // under the finger before the click lands, so the tap misses the
      // link entirely. Skip the effect when there's no fine pointer.
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
      if (!finePointer) return

      const ctx = gsap.context(() => {
        // One reusable tween per property instead of a NEW gsap.to() on every
        // mousemove. The old version spawned a fresh 0.4s tween per event — at
        // pointer rates that is dozens of overlapping tweens on the same element
        // at once, each animating four properties, and GSAP does not overwrite
        // them by default. That is the footer/landing hover stutter.
        const settings = { duration: 0.4, ease: "power2.out" }
        const toX = gsap.quickTo(element, "x", settings)
        const toY = gsap.quickTo(element, "y", settings)
        const toRotX = gsap.quickTo(element, "rotationX", settings)
        const toRotY = gsap.quickTo(element, "rotationY", settings)

        // Cached at enter, not read per move. getBoundingClientRect() INCLUDES
        // transforms, so measuring the element while the magnet is displacing it
        // fed the previous offset back into the next one — a wobble as well as a
        // forced layout on every event. The resting rect is the correct origin.
        let rect: DOMRect | null = null
        let frame = 0
        let pending: { x: number; y: number } | null = null

        const apply = () => {
          frame = 0
          if (!pending || !rect) return
          const x = pending.x - rect.left - rect.width / 2
          const y = pending.y - rect.top - rect.height / 2
          toX(x * strength)
          toY(y * strength)
          toRotX(-y * 0.15)
          toRotY(x * 0.15)
        }

        const handleMouseEnter = () => {
          rect = element.getBoundingClientRect()
          gsap.to(element, { scale: 1.05, ...settings, overwrite: "auto" })
        }
        // Coalesce to one update per frame: a pointer can fire far more often
        // than the display refreshes, and everything past the first per frame is
        // discarded work.
        const handleMouseMove = (e: MouseEvent) => {
          if (!rect) rect = element.getBoundingClientRect()
          pending = { x: e.clientX, y: e.clientY }
          if (!frame) frame = requestAnimationFrame(apply)
        }
        const handleMouseLeave = () => {
          if (frame) cancelAnimationFrame(frame)
          frame = 0
          pending = null
          rect = null
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
            overwrite: "auto",
          })
        }
        element.addEventListener("mouseenter", handleMouseEnter)
        element.addEventListener("mousemove", handleMouseMove)
        element.addEventListener("mouseleave", handleMouseLeave)
        return () => {
          if (frame) cancelAnimationFrame(frame)
          element.removeEventListener("mouseenter", handleMouseEnter)
          element.removeEventListener("mousemove", handleMouseMove)
          element.removeEventListener("mouseleave", handleMouseLeave)
        }
      }, element)

      return () => ctx.revert()
    }, [strength])

    return (
      <Component
        ref={(node: HTMLElement) => {
          localRef.current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }}
        className={cn("cursor-pointer inline-flex items-center justify-center", className)}
        style={{ transformStyle: "preserve-3d", ...(props as React.HTMLAttributes<HTMLElement>).style }}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
MagneticButton.displayName = "MagneticButton"
