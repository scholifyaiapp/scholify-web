import * as React from "react"
import { cn } from "@/lib/utils"

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)
  const filterId = React.useId().replace(/:/g, "")
  const [active, setActive] = React.useState(true)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => setActive(entries.some((e) => e.isIntersecting)),
      { rootMargin: "0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    if (!active) return
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let rafId = 0

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

        const inv = 1 - fraction
        text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
        text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
      }
    }

    const doCooldown = () => {
      morph = 0
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = ""
        text2Ref.current.style.opacity = "100%"
        text1Ref.current.style.filter = ""
        text1Ref.current.style.opacity = "0%"
      }
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }
      setMorph(fraction)
    }

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime
      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    animate()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [texts, morphTime, cooldownTime, active])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          <filter id={`threshold-${filterId}`}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ filter: `url(#threshold-${filterId})` }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block select-none text-center whitespace-nowrap text-6xl md:text-[60pt] leading-none",
            "text-foreground",
            textClassName,
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-block select-none text-center whitespace-nowrap text-6xl md:text-[60pt] leading-none",
            "text-foreground",
            textClassName,
          )}
        />
      </div>
    </div>
  )
}
