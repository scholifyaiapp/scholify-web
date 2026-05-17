import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react"

interface ImageSwiperProps {
  images: string
  cardWidth?: number
  cardHeight?: number
  className?: string
}

export function ImageSwiper({
  images,
  cardWidth = 256,
  cardHeight = 352,
  className = "",
}: ImageSwiperProps) {
  const cardStackRef = useRef<HTMLDivElement>(null)
  const isSwiping = useRef(false)
  const startX = useRef(0)
  const currentX = useRef(0)
  const animationFrameId = useRef<number | null>(null)

  const imageList = images
    .split(",")
    .map((img) => img.trim())
    .filter((img) => img)
  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: imageList.length }, (_, i) => i)
  )

  const getDurationFromCSS = useCallback(
    (variableName: string, element?: HTMLElement | null): number => {
      const target = element || document.documentElement
      const value = getComputedStyle(target)?.getPropertyValue(variableName)?.trim()
      if (!value) return 0
      if (value.endsWith("ms")) return parseFloat(value)
      if (value.endsWith("s")) return parseFloat(value) * 1000
      return parseFloat(value) || 0
    },
    []
  )

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return []
    return [...cardStackRef.current.querySelectorAll(".image-card")] as HTMLElement[]
  }, [])

  const getActiveCard = useCallback((): HTMLElement | null => {
    const cards = getCards()
    return cards[0] || null
  }, [getCards])

  const updatePositions = useCallback(() => {
    const cards = getCards()
    cards.forEach((card, i) => {
      card.style.setProperty("--i", (i + 1).toString())
      card.style.setProperty("--swipe-x", "0px")
      card.style.setProperty("--swipe-rotate", "0deg")
      card.style.opacity = "1"
    })
  }, [getCards])

  const applySwipeStyles = useCallback(
    (deltaX: number) => {
      const card = getActiveCard()
      if (!card) return
      card.style.setProperty("--swipe-x", `${deltaX}px`)
      card.style.setProperty("--swipe-rotate", `${deltaX * 0.2}deg`)
      card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75).toString()
    },
    [getActiveCard]
  )

  const handleStart = useCallback(
    (clientX: number) => {
      if (isSwiping.current) return
      isSwiping.current = true
      startX.current = clientX
      currentX.current = clientX
      const card = getActiveCard()
      if (card) card.style.transition = "none"
    },
    [getActiveCard]
  )

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }

    const deltaX = currentX.current - startX.current
    const threshold = 50
    const duration = getDurationFromCSS("--card-swap-duration", cardStackRef.current)
    const card = getActiveCard()

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`
      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX)
        card.style.setProperty("--swipe-x", `${direction * 400}px`)
        card.style.setProperty("--swipe-rotate", `${direction * 20}deg`)
        setTimeout(() => {
          if (getActiveCard() === card) {
            card.style.setProperty("--swipe-rotate", `${-direction * 20}deg`)
          }
        }, duration * 0.5)
        setTimeout(() => {
          setCardOrder((prev) => {
            if (prev.length === 0) return []
            return [...prev.slice(1), prev[0]]
          })
        }, duration)
      } else {
        applySwipeStyles(0)
      }
    }

    isSwiping.current = false
    startX.current = 0
    currentX.current = 0
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles])

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isSwiping.current) return
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = requestAnimationFrame(() => {
        currentX.current = clientX
        const deltaX = currentX.current - startX.current
        applySwipeStyles(deltaX)
        if (Math.abs(deltaX) > 50) handleEnd()
      })
    },
    [applySwipeStyles, handleEnd]
  )

  useEffect(() => {
    const el = cardStackRef.current
    if (!el) return
    const onDown = (e: PointerEvent) => handleStart(e.clientX)
    const onMove = (e: PointerEvent) => handleMove(e.clientX)
    const onUp = () => handleEnd()
    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    el.addEventListener("pointerleave", onUp)
    return () => {
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      el.removeEventListener("pointerleave", onUp)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [handleStart, handleMove, handleEnd])

  useEffect(() => {
    updatePositions()
  }, [cardOrder, updatePositions])

  return (
    <section
      className={`relative grid place-content-center select-none ${className}`}
      ref={cardStackRef}
      style={
        {
          width: cardWidth + 48,
          height: cardHeight + 48,
          touchAction: "none",
          transformStyle: "preserve-3d",
          "--card-perspective": "700px",
          "--card-z-offset": "12px",
          "--card-y-offset": "7px",
          "--card-max-z-index": imageList.length.toString(),
          "--card-swap-duration": "0.35s",
        } as CSSProperties
      }
    >
      {cardOrder.map((originalIndex, displayIndex) => (
        <article
          key={`${imageList[originalIndex]}-${originalIndex}`}
          className="image-card absolute cursor-grab active:cursor-grabbing place-self-center rounded-2xl overflow-hidden will-change-transform"
          style={
            {
              "--i": (displayIndex + 1).toString(),
              zIndex: imageList.length - displayIndex,
              width: cardWidth,
              height: cardHeight,
              boxShadow:
                "0 10px 30px -8px rgba(20,20,26,0.18), 0 4px 8px -4px rgba(20,20,26,0.08)",
              border: "1px solid rgba(20,20,26,0.06)",
              background: "white",
              transform: `perspective(var(--card-perspective))
                          translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                          translateY(calc(var(--card-y-offset) * var(--i)))
                          translateX(var(--swipe-x, 0px))
                          rotateY(var(--swipe-rotate, 0deg))`,
            } as CSSProperties
          }
        >
          <img
            src={imageList[originalIndex]}
            alt={`Card ${originalIndex + 1}`}
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </article>
      ))}
    </section>
  )
}
