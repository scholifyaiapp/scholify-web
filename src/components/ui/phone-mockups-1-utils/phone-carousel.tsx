import * as React from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { BatteryMedium, ChevronLeft, ChevronRight, Pause, Play, Signal, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ImageItem {
  src?: string
  alt: string
  /**
   * Short human label for the screen — read out under the phone so a visitor
   * knows WHICH part of the app they are looking at. `alt` stays the long
   * description for assistive tech; this is the caption.
   */
  title?: string
  content?: React.ReactNode
}

interface PhoneCarouselProps {
  images: ImageItem[]
  className?: string
}

const AUTOPLAY_MS = 5200
const EASE_OUT = [0.22, 1, 0.36, 1] as const

/*
 * A phone mockup that advances itself, which is the part that needs care:
 * content that moves on its own is only acceptable if the viewer can see WHEN
 * it will move, stop it, and drive it by hand. So the active dot doubles as a
 * dwell-progress bar, the carousel pauses on hover / focus / drag / offscreen /
 * hidden tab, there is an explicit pause control (WCAG 2.2.2), and the screen
 * itself is draggable with the finger. Under prefers-reduced-motion nothing
 * auto-advances at all and the transitions collapse to a plain crossfade.
 */
export function PhoneCarousel({ images, className }: PhoneCarouselProps) {
  const [[active, direction], setSlide] = React.useState<[number, number]>([0, 0])
  // Bumped on every advance, manual selection and resume — it restarts BOTH the
  // dwell timer and the progress bar from the same instant, so the bar never
  // lies about when the next screen arrives.
  const [runId, setRunId] = React.useState(0)
  const [manualPaused, setManualPaused] = React.useState(false)
  const [pointerInside, setPointerInside] = React.useState(false)
  const [focusInside, setFocusInside] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [tabHidden, setTabHidden] = React.useState(false)

  const rootRef = React.useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const count = images.length
  const autoplay = count > 1 && !reduceMotion

  const go = React.useCallback(
    (delta: number) => {
      if (!count) return
      setSlide(([current]) => [(current + delta + count) % count, delta < 0 ? -1 : 1])
      setRunId((n) => n + 1)
    },
    [count],
  )

  const select = React.useCallback(
    (index: number) => {
      if (!count) return
      setSlide(([current]) => [index, index === current ? 0 : index > current ? 1 : -1])
      setRunId((n) => n + 1)
    },
    [count],
  )

  React.useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    onVisibility()
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  const paused = manualPaused || pointerInside || focusInside || dragging || tabHidden || !inView

  // Resuming restarts the dwell from zero rather than picking up a stale
  // remainder, and the bar remounts with it — the two cannot drift apart.
  React.useEffect(() => {
    if (!paused) setRunId((n) => n + 1)
  }, [paused])

  React.useEffect(() => {
    if (!autoplay || paused) return
    const timer = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [active, runId, autoplay, paused, go])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (count < 2) return
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(-1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      go(1)
    }
  }

  if (!count) return null

  const item = images[active]
  const shift = reduceMotion ? 0 : 44
  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? shift : -shift, scale: reduceMotion ? 1 : 1.03 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.44, ease: EASE_OUT } },
    // Exit runs shorter than enter so the swap feels answered, not waited on.
    exit: (dir: number) => ({
      opacity: 0,
      x: dir >= 0 ? -shift : shift,
      scale: reduceMotion ? 1 : 0.985,
      transition: { duration: 0.26, ease: "easeIn" as const },
    }),
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative mx-auto flex w-full max-w-[440px] flex-col items-center", className)}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPointerInside(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPointerInside(false)
      }}
      onFocus={() => setFocusInside(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false)
      }}
      onKeyDown={onKeyDown}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,0,0,.18),rgba(229,0,104,.08)_45%,transparent_72%)] blur-2xl" />

      {/* Perspective lives on the parent — without it the rotateY below renders
          as a flat horizontal squash rather than a tilt. */}
      <div style={{ perspective: 1200 }}>
        <motion.div
          className="relative w-[min(74vw,296px)] rounded-[3.25rem] border border-white/15 bg-[#09090d] p-[9px] shadow-[0_42px_90px_-30px_rgba(11,11,15,.7),inset_0_0_0_1px_rgba(255,255,255,.08)]"
          initial={reduceMotion ? false : { opacity: 0, y: 34, rotateY: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          {/* Hardware detail: volume pair and wake button on the frame edges. */}
          <span aria-hidden className="absolute -left-[2px] top-[104px] h-8 w-[2px] rounded-l-full bg-white/20" />
          <span aria-hidden className="absolute -left-[2px] top-[148px] h-8 w-[2px] rounded-l-full bg-white/20" />
          <span aria-hidden className="absolute -right-[2px] top-[124px] h-12 w-[2px] rounded-r-full bg-white/20" />

          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.72rem] bg-[#17171d]">
            <AnimatePresence mode="sync" initial={false} custom={direction}>
              <motion.div
                key={item.src ?? item.alt}
                custom={direction}
                role="img"
                aria-label={item.alt}
                className="absolute inset-0 h-full w-full touch-pan-y overflow-hidden"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                dragMomentum={false}
                onDragStart={() => setDragging(true)}
                onDragEnd={(_, info) => {
                  setDragging(false)
                  // Distance plus a slice of velocity, so a short flick counts
                  // as much as a slow long drag.
                  const power = info.offset.x + info.velocity.x * 0.18
                  if (power < -60) go(1)
                  else if (power > 60) go(-1)
                }}
              >
                {item.content ?? <img src={item.src} alt="" className="h-full w-full object-cover" />}
              </motion.div>
            </AnimatePresence>

            {/* Notch and status bar sit ABOVE the screens so all four share one
                identical device chrome instead of redrawing it per mockup. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[8px] z-20 h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[0_1px_0_rgba(255,255,255,.08)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[13px] z-20 flex items-center justify-between px-[22px] text-[#201b1a]"
            >
              <span className="text-[10px] font-bold tracking-[-.02em] tabular-nums">9:41</span>
              <span className="flex items-center gap-[3px]">
                <Signal size={10} strokeWidth={2.6} />
                <Wifi size={10} strokeWidth={2.6} />
                <BatteryMedium size={13} strokeWidth={2.2} />
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
            <div aria-hidden className="pointer-events-none absolute bottom-[7px] left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-black/25" />
          </div>
        </motion.div>
      </div>

      {count > 1 && (
        <>
          {/* Names the screen on show. Live so the caption is announced when the
              carousel advances on its own. */}
          <p
            aria-live="polite"
            className="mt-5 min-h-[20px] text-center text-[13px] font-semibold tracking-[-.01em] text-[#6b6b76]"
          >
            {item.title ?? item.alt}
          </p>

          <div className="relative mt-3 flex items-center gap-2" role="group" aria-label="Mobile app previews">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-black/10 bg-white/75 shadow-sm backdrop-blur"
              onClick={() => go(-1)}
              aria-label="Previous preview"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center">
              {images.map((image, index) => {
                const isActive = index === active
                return (
                  <button
                    key={image.src ?? image.alt}
                    type="button"
                    onClick={() => select(index)}
                    // 44px tall target around an 8px dot — the pill stays small,
                    // the thing your thumb has to hit does not.
                    className="group grid h-11 w-7 place-items-center"
                    aria-label={`Show preview ${index + 1} of ${count}: ${image.title ?? image.alt}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={cn(
                        "relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300",
                        isActive ? "w-7 bg-black/[.12]" : "w-2 bg-black/20 group-hover:bg-black/35",
                      )}
                    >
                      {isActive && (
                        <span
                          key={runId}
                          className="absolute inset-0 block origin-left rounded-full bg-[#c80000]"
                          style={
                            autoplay
                              ? {
                                  animation: `phone-carousel-dwell ${AUTOPLAY_MS}ms linear forwards`,
                                  animationPlayState: paused ? "paused" : "running",
                                }
                              : undefined
                          }
                        />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {autoplay && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-black/10 bg-white/75 shadow-sm backdrop-blur"
                onClick={() => setManualPaused((p) => !p)}
                aria-label={manualPaused ? "Play previews" : "Pause previews"}
                aria-pressed={manualPaused}
              >
                {manualPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-black/10 bg-white/75 shadow-sm backdrop-blur"
              onClick={() => go(1)}
              aria-label="Next preview"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
