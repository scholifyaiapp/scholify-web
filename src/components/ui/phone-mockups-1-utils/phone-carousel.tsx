import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ImageItem {
  src?: string
  alt: string
  content?: React.ReactNode
}

interface PhoneCarouselProps {
  images: ImageItem[]
  className?: string
}

export function PhoneCarousel({ images, className }: PhoneCarouselProps) {
  const [active, setActive] = React.useState(0)
  const reduceMotion = useReducedMotion()
  const count = images.length

  const select = React.useCallback((index: number) => {
    if (!count) return
    setActive((index + count) % count)
  }, [count])

  React.useEffect(() => {
    if (reduceMotion || count < 2) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % count), 4500)
    return () => window.clearInterval(timer)
  }, [count, reduceMotion])

  if (!count) return null

  return (
    <div className={cn("relative mx-auto flex w-full max-w-[440px] flex-col items-center", className)}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,0,0,.18),rgba(229,0,104,.08)_45%,transparent_72%)] blur-2xl" />
      <motion.div
        className="relative w-[min(72vw,292px)] rounded-[3.25rem] border border-white/15 bg-[#09090d] p-[9px] shadow-[0_42px_90px_-30px_rgba(11,11,15,.7),inset_0_0_0_1px_rgba(255,255,255,.08)]"
        initial={reduceMotion ? false : { opacity: 0, y: 30, rotateY: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
      >
        <div className="absolute left-1/2 top-[17px] z-20 h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[0_1px_0_rgba(255,255,255,.08)]" />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.72rem] bg-[#17171d]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={images[active].src ?? images[active].alt}
              role="img"
              aria-label={images[active].alt}
              className="absolute inset-0 h-full w-full overflow-hidden"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, x: -18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {images[active].content ?? (
                <img src={images[active].src} alt="" className="h-full w-full object-cover" />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
          <div className="absolute bottom-[7px] left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/80" />
        </div>
      </motion.div>

      {count > 1 && (
        <div className="relative mt-6 flex items-center gap-3" aria-label="Mobile app previews">
          <Button variant="outline" size="icon" className="rounded-full border-black/10 bg-white/75 shadow-sm backdrop-blur" onClick={() => select(active - 1)} aria-label="Previous preview">
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex items-center gap-2">
            {images.map((image, index) => (
              <button
                key={image.src ?? image.alt}
                type="button"
                onClick={() => select(index)}
                className={cn("h-2 rounded-full transition-all", index === active ? "w-7 bg-[#c80000]" : "w-2 bg-black/20 hover:bg-black/35")}
                aria-label={`Show preview ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" className="rounded-full border-black/10 bg-white/75 shadow-sm backdrop-blur" onClick={() => select(active + 1)} aria-label="Next preview">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
