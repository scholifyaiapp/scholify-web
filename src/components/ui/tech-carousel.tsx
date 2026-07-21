import React, { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

/*
 * Adapted from a logo-carousel component (cycling columns of brand logos,
 * originally styled as a "trusted by" partner wall). Repurposed here as an
 * honest "built on" tech strip -- Scholify has no confirmed partnerships
 * with these providers, only a customer/API relationship, so each item
 * renders as a plain wordmark (text), not the provider's actual logo mark.
 * No logo means no implied endorsement.
 */

export interface TechItem {
  name: string
  id: number
  sub?: string
}

interface TechColumnProps {
  items: TechItem[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeItems = (all: TechItem[], columnCount: number): TechItem[][] => {
  const shuffled = shuffleArray(all)
  const columns: TechItem[][] = Array.from({ length: columnCount }, () => [])
  shuffled.forEach((item, index) => columns[index % columnCount].push(item))
  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
  })
  return columns
}

const TechColumn: React.FC<TechColumnProps> = React.memo(({ items, index, currentTime }) => {
  const cycleInterval = 2200
  const columnDelay = index * 220
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * items.length)
  const currentIndex = Math.floor(adjustedTime / cycleInterval)
  const current = useMemo(() => items[currentIndex], [items, currentIndex])

  return (
    <motion.div
      className="relative h-20 w-40 overflow-hidden md:h-24 md:w-56"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${current.id}-${currentIndex}`}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          initial={{ y: "10%", opacity: 0, filter: "blur(6px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 300, damping: 22, mass: 1, duration: 0.5 },
          }}
          exit={{ y: "-16%", opacity: 0, filter: "blur(5px)", transition: { type: "tween", ease: "easeIn", duration: 0.3 } }}
        >
          <span className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#14141A", letterSpacing: "-0.01em" }}>
            {current.name}
          </span>
          {current.sub && (
            <span className="font-mono-pro" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#8E817B", marginTop: 4 }}>
              {current.sub}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})
TechColumn.displayName = "TechColumn"

export function TechCarousel({ columnCount = 2, items }: { columnCount?: number; items: TechItem[] }) {
  const [itemSets, setItemSets] = useState<TechItem[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const updateTime = useCallback(() => setCurrentTime((t) => t + 100), [])

  useEffect(() => {
    const id = setInterval(updateTime, 100)
    return () => clearInterval(id)
  }, [updateTime])

  useEffect(() => {
    setItemSets(distributeItems(items, columnCount))
  }, [items, columnCount])

  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {itemSets.map((set, index) => (
        <TechColumn key={index} items={set} index={index} currentTime={currentTime} />
      ))}
    </div>
  )
}
