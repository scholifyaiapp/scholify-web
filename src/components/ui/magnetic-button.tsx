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

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const halfW = rect.width / 2
          const halfH = rect.height / 2
          const x = e.clientX - rect.left - halfW
          const y = e.clientY - rect.top - halfH
          gsap.to(element, {
            x: x * strength,
            y: y * strength,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          })
        }
        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          })
        }
        element.addEventListener("mousemove", handleMouseMove)
        element.addEventListener("mouseleave", handleMouseLeave)
        return () => {
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
