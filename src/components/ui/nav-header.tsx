import { useRef, useState, type ReactNode } from "react"
import { motion } from "motion/react"

interface NavItem {
  label: string
  href?: string
  onClick?: () => void
}

interface NavHeaderProps {
  items: NavItem[]
  className?: string
}

interface CursorPosition {
  left: number
  width: number
  opacity: number
}

export default function NavHeader({ items, className = "" }: NavHeaderProps) {
  const [position, setPosition] = useState<CursorPosition>({ left: 0, width: 0, opacity: 0 })

  return (
    <ul
      className={`relative mx-auto flex w-fit items-center gap-1 rounded-full p-1 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(20, 20, 26, 0.06)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 8px 24px -6px rgba(20,20,26,0.06), 0 1px 3px rgba(20,20,26,0.04)",
        listStyle: "none",
        margin: 0,
        padding: 4,
      }}
      onMouseLeave={() => setPosition((p) => ({ ...p, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab key={item.label} item={item} setPosition={setPosition} />
      ))}
      <Cursor position={position} />
    </ul>
  )
}

function Tab({ item, setPosition }: { item: NavItem; setPosition: (p: CursorPosition) => void }) {
  const ref = useRef<HTMLLIElement | null>(null)
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        })
      }}
      style={{
        position: "relative",
        zIndex: 10,
        listStyle: "none",
      }}
    >
      <a
        href={item.href}
        onClick={(e) => {
          if (item.onClick) {
            e.preventDefault()
            item.onClick()
          }
        }}
        style={{
          display: "inline-block",
          padding: "8px 16px",
          fontSize: 13.5,
          fontWeight: 500,
          letterSpacing: "-0.005em",
          color: "#14141A",
          textDecoration: "none",
          cursor: "pointer",
          transition: "color 0.2s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#5B5BF5")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#14141A")}
      >
        {item.label}
      </a>
    </li>
  )
}

function Cursor({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      animate={{ left: position.left, width: position.width, opacity: position.opacity }}
      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.6 }}
      style={{
        position: "absolute",
        top: 4,
        bottom: 4,
        zIndex: 0,
        background: "rgba(91, 91, 245, 0.10)",
        border: "1px solid rgba(91, 91, 245, 0.18)",
        borderRadius: 999,
        boxShadow: "0 6px 16px -6px rgba(91, 91, 245, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        listStyle: "none",
        pointerEvents: "none",
      }}
    />
  )
}

export function NavHeaderDemo({ children }: { children?: ReactNode }) {
  return (
    <header className="flex h-screen items-center justify-center p-10">
      {children}
    </header>
  )
}
