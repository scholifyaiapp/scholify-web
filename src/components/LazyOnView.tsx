import { startTransition, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type Props = {
  children: ReactNode
  rootMargin?: string
  style?: CSSProperties
  className?: string
  id?: string
  /**
   * Opt out of CSS containment.
   *
   * `contain: paint` makes this div the containing block for any
   * `position: fixed` DESCENDANT — which silently converts a cheap fixed
   * compositor layer into something laid out and painted inside a contained
   * box that `content-visibility` is switching on and off during scroll. The
   * cinematic footer is exactly that case.
   */
  contain?: boolean
}

export default function LazyOnView({
  children,
  /*
   * 1200px was far enough ahead that a whole section's React subtree mounted
   * mid-flick, on the main thread, while the finger was still moving — the
   * single most common cause of the "it stops" feeling. 500px still hides the
   * mount behind the fold on a normal scroll without doing it during one.
   */
  rootMargin = "500px 0px",
  style,
  className,
  id,
  contain = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startTransition(() => setVisible(true))
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, visible])

  /*
   * `content-visibility: auto` skips rendering off-screen, but with no
   * intrinsic size the box collapses to its min-height and then jumps to the
   * real height the moment it renders — moving everything below it under the
   * reader's thumb. `contain-intrinsic-size: auto <height>` tells the browser
   * to REMEMBER the size it last rendered at and reserve exactly that, so the
   * jump happens at most once instead of on every pass.
   */
  const reserved = typeof style?.minHeight === "number" ? `${style.minHeight}px` : style?.minHeight

  return (
    <div
      ref={ref}
      id={id}
      style={{
        ...(contain ? { contain: "layout style paint", contentVisibility: "auto" } : null),
        ...(contain && reserved ? { containIntrinsicSize: `auto ${reserved}` } : null),
        scrollMarginTop: 96,
        ...style,
      } as CSSProperties}
      className={className}
    >
      {visible ? children : null}
    </div>
  )
}
