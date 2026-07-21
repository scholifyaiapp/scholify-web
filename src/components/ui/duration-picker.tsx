import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * Adapted from a radial clock-time picker (HH:MM, hover reveals +/-15m
 * /30m/1h/2h wedges to nudge a time of day). Repurposed here as a
 * duration picker for "minutes per day" during onboarding -- the
 * adjustment wedges map naturally onto a duration (arguably more
 * naturally than onto a clock time), so the wedge math/labels are kept;
 * only the underlying value changed from a 24h clock string to a plain
 * clamped minute count, and the two SVG-wedge/orbit-circle variants were
 * collapsed into one (orbit circles -- real <button> elements, easier to
 * keep accessible and robust at onboarding's mobile widths than clipped,
 * rotated SVG wedge paths).
 */

export interface DurationPickerProps {
  value: number
  onChange: (minutes: number) => void
  min?: number
  max?: number
  className?: string
}

interface AdjustNode {
  label: string
  delta: number
  angle: number
}

// Same (intentionally uneven) angles as the reference's orbit variant.
const NODES: AdjustNode[] = [
  { label: "+15m", delta: 15, angle: 25 },
  { label: "+30m", delta: 30, angle: 68 },
  { label: "+1h", delta: 60, angle: 112 },
  { label: "+2h", delta: 120, angle: 155 },
  { label: "-2h", delta: -120, angle: 205 },
  { label: "-1h", delta: -60, angle: 248 },
  { label: "-30m", delta: -30, angle: 292 },
  { label: "-15m", delta: -15, angle: 335 },
]

const SIZE = 280
const ORBIT_RADIUS = 96

const polarToCartesian = (radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
  return { x: radius * Math.cos(angleInRadians), y: radius * Math.sin(angleInRadians) }
}

const nodeVariants = {
  hidden: { opacity: 0, x: 0, y: 0, scale: 0.2 },
  visible: (node: AdjustNode) => {
    const pos = polarToCartesian(ORBIT_RADIUS, node.angle)
    return { opacity: 1, x: pos.x, y: pos.y, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 22 } }
  },
  exit: { opacity: 0, x: 0, y: 0, scale: 0.2, transition: { duration: 0.15 } },
}

export function DurationPicker({ value, onChange, min = 5, max = 240, className }: DurationPickerProps) {
  const [text, setText] = useState(String(value))
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isFocused) setText(String(value))
  }, [value, isFocused])

  const commit = (n: number) => {
    const clamped = Math.max(min, Math.min(max, Math.round(n)))
    onChange(clamped)
    setText(String(clamped))
  }

  const handleAdjust = (delta: number) => commit(value + delta)
  const showMenu = isHovered && !isFocused

  return (
    <div
      className={cn("relative flex items-center justify-center transition-all duration-300", showMenu ? "z-50" : "z-10", className)}
      style={{ width: SIZE, height: SIZE }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showMenu &&
            NODES.map((node, i) => {
              const isPos = node.delta > 0
              return (
                <motion.button
                  key={i}
                  type="button"
                  custom={node}
                  variants={nodeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleAdjust(node.delta)}
                  aria-label={`${isPos ? "Add" : "Remove"} ${Math.abs(node.delta)} minutes`}
                  className="absolute w-12 h-12 rounded-full shadow-md border-[1.5px] font-bold text-[11px] leading-none flex items-center justify-center pointer-events-auto"
                  style={{
                    color: isPos ? "#C80000" : "#7A7168",
                    borderColor: isPos ? "rgba(200,0,0,.28)" : "#ECE4DE",
                    background: "#fff",
                  }}
                >
                  {node.label}
                </motion.button>
              )
            })}
        </AnimatePresence>
      </div>

      <div
        className="relative z-30 rounded-full px-5 py-3 shadow-md flex items-baseline gap-1.5 transition-all"
        style={{ background: "#fff", border: "1.5px solid #ECE4DE" }}
      >
        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={(e) => setText(e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
          onFocus={(e) => {
            setIsFocused(true)
            e.target.select()
          }}
          onBlur={() => {
            setIsFocused(false)
            commit(text === "" ? value : Number(text))
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur()
          }}
          aria-label="Minutes per day"
          className="w-14 text-2xl font-extrabold text-center bg-transparent outline-none tabular-nums"
          style={{ color: "#14141A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        />
        <span className="text-sm font-semibold" style={{ color: "#A79E96" }}>
          min
        </span>
      </div>
    </div>
  )
}
