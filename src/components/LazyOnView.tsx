import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type Props = {
  children: ReactNode
  rootMargin?: string
  style?: CSSProperties
  className?: string
}

export default function LazyOnView({
  children,
  rootMargin = "200px",
  style,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
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
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        ...style,
      } as CSSProperties}
      className={className}
    >
      {visible ? children : null}
    </div>
  )
}
