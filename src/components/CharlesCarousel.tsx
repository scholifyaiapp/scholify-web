import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const CHARLES = [
  { src: "/charles/6-transparent.webp", bg: "#E84949", label: "Your study partner" },
  { src: "/charles/8-transparent.webp", bg: "#5B5BF5", label: "Your personal planner" },
  { src: "/charles/11-transparent.webp", bg: "#A855F7", label: "Your AI tutor" },
  { src: "/charles/9-transparent.webp", bg: "#16A47A", label: "Your biggest supporter" },
] as const

const EASE = "650ms cubic-bezier(0.4,0,0.2,1)"
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.08'/%3E%3C/svg%3E")`

type Direction = "next" | "prev"
type Role = "center" | "left" | "right" | "back"

export default function CharlesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 640)
  const unlockTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    CHARLES.forEach(({ src }) => {
      const image = new Image()
      image.src = src
    })

    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      if (unlockTimer.current) clearTimeout(unlockTimer.current)
    }
  }, [])

  const navigate = (direction: Direction) => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((previous) =>
      direction === "next" ? (previous + 1) % CHARLES.length : (previous + 3) % CHARLES.length,
    )
    unlockTimer.current = setTimeout(() => setIsAnimating(false), 650)
  }

  const roles: Record<Role, number> = {
    center: activeIndex,
    left: (activeIndex + 3) % CHARLES.length,
    right: (activeIndex + 1) % CHARLES.length,
    back: (activeIndex + 2) % CHARLES.length,
  }

  const roleFor = (index: number) =>
    (Object.entries(roles).find(([, roleIndex]) => roleIndex === index)?.[0] ?? "back") as Role

  const itemStyle = (role: Role): React.CSSProperties => {
    const side = role === "left" || role === "right"
    return {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      left:
        role === "left" ? (isMobile ? "20%" : "30%")
          : role === "right" ? (isMobile ? "80%" : "70%")
            : "50%",
      height:
        role === "center" ? (isMobile ? "60%" : "92%")
          : side ? (isMobile ? "16%" : "28%")
            : isMobile ? "13%" : "22%",
      bottom: role === "center" ? (isMobile ? "22%" : 0) : isMobile ? "32%" : "12%",
      transform: `translateX(-50%) scale(${role === "center" ? (isMobile ? 1.25 : 1.68) : 1})`,
      filter: role === "center" ? "none" : role === "back" ? "blur(4px)" : "blur(2px)",
      opacity: role === "center" || role === "back" ? 1 : 0.85,
      zIndex: role === "center" ? 20 : side ? 10 : 5,
      transition: `transform ${EASE}, filter ${EASE}, opacity ${EASE}, left ${EASE}`,
      willChange: "transform, filter, opacity",
    }
  }

  return (
    <section
      aria-label="Meet Charles"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: CHARLES[activeIndex].bg,
        transition: `background-color ${EASE}`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 620 }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 50, opacity: 0.4, backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{
            zIndex: 2,
            top: "18%",
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(90px, 28vw, 380px)",
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          CHARLES
        </div>

        <div className="absolute left-4 top-6 text-xs font-semibold uppercase text-white sm:left-8" style={{ zIndex: 60, opacity: 0.9, letterSpacing: "0.18em" }}>
          SCHOLIFY × CHARLES
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {CHARLES.map((character, index) => {
            const role = roleFor(index)
            return (
              <div key={character.src} style={itemStyle(role)} aria-hidden={role !== "center"}>
                <img
                  src={character.src}
                  alt={role === "center" ? `Charles — ${character.label}` : ""}
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center" }}
                />
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24" style={{ zIndex: 60, maxWidth: 320 }}>
          <p className="mb-2 text-base font-bold uppercase tracking-widest text-white sm:mb-3 sm:text-[22px]" style={{ opacity: 0.95, letterSpacing: "0.02em" }}>
            Meet Charles
          </p>
          <p className="mb-4 hidden text-xs text-white sm:mb-5 sm:block sm:text-sm" style={{ opacity: 0.85, lineHeight: 1.6 }}>
            Planner, tutor, coach and supporter. Charles learns where you lose marks, builds your next move and stays with you all the way to exam day.
          </p>
          <p className="mb-4 text-xs font-semibold uppercase text-white sm:hidden" style={{ letterSpacing: "0.12em", opacity: 0.85 }}>
            {CHARLES[activeIndex].label}
          </p>
          <div className="flex gap-3">
            {(["prev", "next"] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => navigate(direction)}
                disabled={isAnimating}
                aria-label={direction === "prev" ? "Previous Charles pose" : "Next Charles pose"}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 disabled:cursor-default sm:h-16 sm:w-16"
              >
                {direction === "prev" ? <ArrowLeft size={26} strokeWidth={2.25} /> : <ArrowRight size={26} strokeWidth={2.25} />}
              </button>
            ))}
          </div>
        </div>

        <a
          href="#how-it-works"
          className="absolute bottom-6 right-4 flex items-center gap-2 uppercase text-white no-underline transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10"
          style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: "clamp(20px, 4vw, 56px)", fontWeight: 400, opacity: 0.95, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          Meet him <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </section>
  )
}
