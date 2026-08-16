import { startTransition, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type Props = {
  children: ReactNode
  rootMargin?: string
  style?: CSSProperties
  className?: string
  id?: string
}

export default function LazyOnView({
  children,
  rootMargin = "1200px 0px",
  style,
  className,
  id,
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

  return (
    <div
      ref={ref}
      id={id}
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        scrollMarginTop: 96,
        ...style,
      } as CSSProperties}
      className={className}
    >
      {visible ? children : null}
    </div>
  )
}
