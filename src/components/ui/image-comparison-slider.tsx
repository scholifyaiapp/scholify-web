import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
  altBefore?: string
  altAfter?: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
  /** Aspect ratio for the comparison area (e.g. "16/9", "4/3", "3/2"). Defaults to "16/10". */
  aspectRatio?: string
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = "Before",
  altAfter = "After",
  beforeLabel,
  afterLabel,
  className,
  aspectRatio = "16/10",
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const next = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
      setSliderPosition(next)
    },
    [],
  )

  const startDrag = useCallback(() => setIsDragging(true), [])
  const stopDrag = useCallback(() => setIsDragging(false), [])

  // Track pointer globally so dragging continues even if cursor leaves the box
  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => handleMove(e.clientX)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseup", stopDrag)
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", stopDrag)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", stopDrag)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", stopDrag)
    }
  }, [isDragging, handleMove, stopDrag])

  // Keyboard support: arrow keys move the slider
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(0, p - 5))
    if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(100, p + 5))
    if (e.key === "Home") setSliderPosition(0)
    if (e.key === "End") setSliderPosition(100)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full mx-auto select-none rounded-2xl overflow-hidden shadow-2xl bg-neutral-900",
        className,
      )}
      style={{ aspectRatio, touchAction: "pan-y" }}
    >
      {/* Before image (full bleed, bottom layer) */}
      <img
        src={beforeImage}
        alt={altBefore}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* After image (top layer, clipped to slider) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt={altAfter}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Labels */}
      {beforeLabel && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/55 text-white text-xs font-semibold tracking-wide backdrop-blur-sm pointer-events-none">
          {beforeLabel}
        </div>
      )}
      {afterLabel && (
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 text-neutral-900 text-xs font-semibold tracking-wide pointer-events-none">
          {afterLabel}
        </div>
      )}

      {/* Slider line + handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={onKeyDown}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center focus:outline-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div
          className={cn(
            "bg-white rounded-full h-11 w-11 grid place-items-center shadow-lg transition-transform duration-150 ease-out",
            isDragging ? "scale-110" : "scale-100",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-700"
            aria-hidden
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(8 0)" />
          </svg>
        </div>
      </div>
    </div>
  )
}
