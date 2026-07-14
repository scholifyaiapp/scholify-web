import { useEffect, useRef, useState } from "react"
import { IRIDESCENT } from "./auth-ui"

/* ──────────────────────────────────────────────────────────────
 *  The 4 little "Scholify stones" — purple, dark, orange, yellow.
 *  Their eyes follow the cursor, they blink at random, glance at
 *  each other while you type your email, and politely look away
 *  (with the odd cheeky peek) while you type your password.
 *
 *  Adapted from the original animated login page for the new
 *  dark Scholify auth design.
 * ────────────────────────────────────────────────────────────── */

/* ── Pupil — a bare dot that tracks the cursor ───────────────── */

interface PupilProps {
  size?: number
  maxDistance?: number
  pupilColor?: string
  forceLookX?: number
  forceLookY?: number
}

function Pupil({
  size = 12,
  maxDistance = 5,
  pupilColor = "#2D2D2D",
  forceLookX,
  forceLookY,
}: PupilProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const pos = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined)
      return { x: forceLookX, y: forceLookY }
    if (!ref.current) return { x: 0, y: 0 }
    const r = ref.current.getBoundingClientRect()
    const dx = mouse.x - (r.left + r.width / 2)
    const dy = mouse.y - (r.top + r.height / 2)
    const dist = Math.min(Math.hypot(dx, dy), maxDistance)
    const a = Math.atan2(dy, dx)
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist }
  })()

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  )
}

/* ── EyeBall — white eye with a tracking pupil, can blink ────── */

interface EyeBallProps {
  size?: number
  pupilSize?: number
  maxDistance?: number
  eyeColor?: string
  pupilColor?: string
  isBlinking?: boolean
  forceLookX?: number
  forceLookY?: number
}

function EyeBall({
  size = 18,
  pupilSize = 7,
  maxDistance = 5,
  eyeColor = "#fff",
  pupilColor = "#2D2D2D",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const pos = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined)
      return { x: forceLookX, y: forceLookY }
    if (!ref.current) return { x: 0, y: 0 }
    const r = ref.current.getBoundingClientRect()
    const dx = mouse.x - (r.left + r.width / 2)
    const dy = mouse.y - (r.top + r.height / 2)
    const dist = Math.min(Math.hypot(dx, dy), maxDistance)
    const a = Math.atan2(dy, dx)
    return { x: Math.cos(a) * dist, y: Math.sin(a) * dist }
  })()

  return (
    <div
      ref={ref}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  )
}

/* ── The scene ───────────────────────────────────────────────── */

interface AuthCharactersProps {
  /** Email field focused — characters glance at each other. */
  isTyping: boolean
  /** Current password value — non-empty makes them react. */
  password: string
  /** Password revealed — characters look away (and peek). */
  showPassword: boolean
}

export function AuthCharacters({ isTyping, password, showPassword }: AuthCharactersProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [purpleBlink, setPurpleBlink] = useState(false)
  const [darkBlink, setDarkBlink] = useState(false)
  const [lookAtEachOther, setLookAtEachOther] = useState(false)
  const [purplePeek, setPurplePeek] = useState(false)

  const purpleRef = useRef<HTMLDivElement>(null)
  const darkRef = useRef<HTMLDivElement>(null)
  const yellowRef = useRef<HTMLDivElement>(null)
  const orangeRef = useRef<HTMLDivElement>(null)

  const hidingPw = password.length > 0 && !showPassword
  const peekingPw = password.length > 0 && showPassword

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // Random blinking — purple and dark on independent schedules.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      timer = setTimeout(() => {
        setPurpleBlink(true)
        setTimeout(() => {
          setPurpleBlink(false)
          schedule()
        }, 150)
      }, Math.random() * 4000 + 3000)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      timer = setTimeout(() => {
        setDarkBlink(true)
        setTimeout(() => {
          setDarkBlink(false)
          schedule()
        }, 150)
      }, Math.random() * 4000 + 3000)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [])

  // Glance at each other briefly when the email field gains focus.
  useEffect(() => {
    if (!isTyping) {
      setLookAtEachOther(false)
      return
    }
    setLookAtEachOther(true)
    const t = setTimeout(() => setLookAtEachOther(false), 800)
    return () => clearTimeout(t)
  }, [isTyping])

  // Cheeky peek while the password is visible.
  useEffect(() => {
    if (!peekingPw) {
      setPurplePeek(false)
      return
    }
    const t = setTimeout(() => {
      setPurplePeek(true)
      setTimeout(() => setPurplePeek(false), 800)
    }, Math.random() * 3000 + 2000)
    return () => clearTimeout(t)
  }, [password, showPassword, peekingPw, purplePeek])

  const facePos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 }
    const r = ref.current.getBoundingClientRect()
    const dx = mouse.x - (r.left + r.width / 2)
    const dy = mouse.y - (r.top + r.height / 3)
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    }
  }

  const purple = facePos(purpleRef)
  const dark = facePos(darkRef)
  const yellow = facePos(yellowRef)
  const orange = facePos(orangeRef)

  return (
    <div
      className="ac-scene"
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        .ac-stage { --ac-scale: 0.5; }
        @media (min-width:1160px){ .ac-scene .ac-stage{ --ac-scale:0.6; } }
        @media (min-width:1360px){ .ac-scene .ac-stage{ --ac-scale:0.74; } }
        @media (min-width:1600px){ .ac-scene .ac-stage{ --ac-scale:0.88; } }
      `}</style>

      {/* Ambient glow + floor light */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 45% at 50% 100%, rgba(200,0,0,0.22), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--sch-tx-4), transparent)",
        }}
      />

      {/* 550×400 stage, scaled responsively from the bottom-centre */}
      <div
        className="ac-stage"
        style={{
          width: 550,
          height: 400,
          position: "relative",
          transform: "scale(var(--ac-scale))",
          transformOrigin: "bottom center",
        }}
      >
        {/* Purple — tall, leans in while you type */}
        <div
          ref={purpleRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: 70,
            width: 180,
            height: isTyping || hidingPw ? 440 : 400,
            backgroundColor: "#7C4DFF",
            borderRadius: "10px 10px 0 0",
            zIndex: 1,
            boxShadow: "0 0 50px rgba(124,77,255,0.35)",
            transform: peekingPw
              ? "skewX(0deg)"
              : isTyping || hidingPw
                ? `skewX(${(purple.bodySkew || 0) - 12}deg) translateX(40px)`
                : `skewX(${purple.bodySkew || 0}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-700 ease-in-out"
            style={{
              left: peekingPw ? 20 : lookAtEachOther ? 55 : 45 + purple.faceX,
              top: peekingPw ? 35 : lookAtEachOther ? 65 : 40 + purple.faceY,
            }}
          >
            <EyeBall
              size={18}
              pupilSize={7}
              isBlinking={purpleBlink}
              forceLookX={peekingPw ? (purplePeek ? 4 : -4) : lookAtEachOther ? 3 : undefined}
              forceLookY={peekingPw ? (purplePeek ? 5 : -4) : lookAtEachOther ? 4 : undefined}
            />
            <EyeBall
              size={18}
              pupilSize={7}
              isBlinking={purpleBlink}
              forceLookX={peekingPw ? (purplePeek ? 4 : -4) : lookAtEachOther ? 3 : undefined}
              forceLookY={peekingPw ? (purplePeek ? 5 : -4) : lookAtEachOther ? 4 : undefined}
            />
          </div>
        </div>

        {/* Dark — slim one in the middle */}
        <div
          ref={darkRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: 240,
            width: 120,
            height: 310,
            backgroundColor: "#3A3A52",
            borderRadius: "8px 8px 0 0",
            zIndex: 2,
            boxShadow: "0 0 45px rgba(120,120,160,0.25)",
            transform: peekingPw
              ? "skewX(0deg)"
              : lookAtEachOther
                ? `skewX(${(dark.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                : isTyping || hidingPw
                  ? `skewX(${(dark.bodySkew || 0) * 1.5}deg)`
                  : `skewX(${dark.bodySkew || 0}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-700 ease-in-out"
            style={{
              left: peekingPw ? 10 : lookAtEachOther ? 32 : 26 + dark.faceX,
              top: peekingPw ? 28 : lookAtEachOther ? 12 : 32 + dark.faceY,
            }}
          >
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              isBlinking={darkBlink}
              forceLookX={peekingPw ? -4 : lookAtEachOther ? 0 : undefined}
              forceLookY={peekingPw ? -4 : lookAtEachOther ? -4 : undefined}
            />
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              isBlinking={darkBlink}
              forceLookX={peekingPw ? -4 : lookAtEachOther ? 0 : undefined}
              forceLookY={peekingPw ? -4 : lookAtEachOther ? -4 : undefined}
            />
          </div>
        </div>

        {/* Orange — round-topped one at the front-left */}
        <div
          ref={orangeRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: 0,
            width: 240,
            height: 200,
            zIndex: 3,
            backgroundColor: "#FF9B6B",
            borderRadius: "120px 120px 0 0",
            boxShadow: "0 0 50px rgba(255,155,107,0.3)",
            transform: peekingPw ? "skewX(0deg)" : `skewX(${orange.bodySkew || 0}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-200 ease-out"
            style={{
              left: peekingPw ? 50 : 82 + (orange.faceX || 0),
              top: peekingPw ? 85 : 90 + (orange.faceY || 0),
            }}
          >
            <Pupil size={12} forceLookX={peekingPw ? -5 : undefined} forceLookY={peekingPw ? -4 : undefined} />
            <Pupil size={12} forceLookX={peekingPw ? -5 : undefined} forceLookY={peekingPw ? -4 : undefined} />
          </div>
        </div>

        {/* Yellow — round-topped one at the front-right, with a mouth */}
        <div
          ref={yellowRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: 310,
            width: 140,
            height: 230,
            backgroundColor: "#E8D754",
            borderRadius: "70px 70px 0 0",
            zIndex: 4,
            boxShadow: "0 0 50px rgba(232,215,84,0.3)",
            transform: peekingPw ? "skewX(0deg)" : `skewX(${yellow.bodySkew || 0}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-200 ease-out"
            style={{
              left: peekingPw ? 20 : 52 + (yellow.faceX || 0),
              top: peekingPw ? 35 : 40 + (yellow.faceY || 0),
            }}
          >
            <Pupil size={12} forceLookX={peekingPw ? -5 : undefined} forceLookY={peekingPw ? -4 : undefined} />
            <Pupil size={12} forceLookX={peekingPw ? -5 : undefined} forceLookY={peekingPw ? -4 : undefined} />
          </div>
          <div
            className="absolute w-20 h-[4px] rounded-full transition-all duration-200 ease-out"
            style={{
              backgroundColor: "#2D2D2D",
              left: peekingPw ? 10 : 40 + (yellow.faceX || 0),
              top: peekingPw ? 88 : 88 + (yellow.faceY || 0),
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Left panel that hosts the brand mark + the characters ───── */

export function CharacterLeftPanel(props: AuthCharactersProps) {
  return (
    <div className="flex flex-col w-full" style={{ height: "100%" }}>
      {/* Brand header */}
      <div style={{ padding: "44px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 30,
              lineHeight: 1,
              background: IRIDESCENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            ✦
          </span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "var(--sch-text)" }}>Scholify</span>
        </div>
        <p style={{ fontSize: 14, color: "var(--sch-tx-2)", marginTop: 12 }}>
          Know your chance of passing ACCA — and how to raise it.
        </p>
      </div>

      {/* Animated characters */}
      <AuthCharacters {...props} />
    </div>
  )
}
