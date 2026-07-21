import { type MouseEvent, useEffect, useRef, useState } from "react"
import { Apple, Smartphone } from "lucide-react"

/*
 * Adapted from a Product-Hunt-award-badge component: same 3D tilt/parallax
 * interaction and holographic sheen, repurposed as a "coming soon" store
 * badge. Deliberately NOT a copy of Apple's or Google Play's actual logo
 * marks, and NOT their "Download on the App Store" / "Get it on Google
 * Play" trademarked badge artwork -- those are meant to be used verbatim
 * from Apple/Google's own asset kits once an app ships, not recreated by
 * hand. There's also no real store listing yet, so this renders as a plain
 * div (no link to a generic store homepage pretending to be a download
 * link), with generic lucide icons standing in for the platform and the
 * launch date carried as plain text -- no fabricated award/editorial claim.
 */

type StoreBadgeType = "app-store" | "google-play"

interface StoreBadgeProps {
  type: StoreBadgeType
  comingSoonLabel: string
  note: string
}

const identityMatrix = "1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1"

const maxRotate = 0.25
const minRotate = -0.25
const maxScale = 1
const minScale = 0.97

const label: Record<StoreBadgeType, string> = {
  "app-store": "App Store",
  "google-play": "Google Play",
}

// Warm, Scholify-hued sheen (red -> amber -> magenta) instead of a full
// rainbow, so the shimmer reads as "us," not a generic holographic sticker.
const overlayHues = [358, 8, 20, 39, 345, 336, 358, "transparent", "transparent", "white"] as const

export function StoreBadge({ type, comingSoonLabel, note }: StoreBadgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [firstOverlayPosition, setFirstOverlayPosition] = useState<number>(0)
  const [matrix, setMatrix] = useState<string>(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState<string>(identityMatrix)
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState<boolean>(true)
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState<boolean>(false)
  const [isTimeoutFinished, setIsTimeoutFinished] = useState<boolean>(false)
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getDimensions = () => {
    const rect = ref.current?.getBoundingClientRect()
    return { left: rect?.left ?? 0, right: rect?.right ?? 0, top: rect?.top ?? 0, bottom: rect?.bottom ?? 0 }
  }

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2

    const scale = [
      maxScale - ((maxScale - minScale) * Math.abs(xCenter - clientX)) / (xCenter - left),
      maxScale - ((maxScale - minScale) * Math.abs(yCenter - clientY)) / (yCenter - top),
      maxScale -
        ((maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY))) /
          (xCenter - left + yCenter - top),
    ]

    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - ((maxRotate - minRotate) * (top - clientY)) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * ((top - clientY) / (top - bottom)),
      z3: 0,
    }
    return (
      `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`
    )
  }

  const getOppositeMatrix = (_matrix: string, clientY: number, onMouseEnter?: boolean) => {
    const { top, bottom } = getDimensions()
    const oppositeY = bottom - clientY + top
    const weakening = onMouseEnter ? 0.7 : 4
    const multiplier = onMouseEnter ? -1 : 1

    return _matrix
      .split(", ")
      .map((item, index) => {
        if (index === 2 || index === 4 || index === 8) {
          return (-parseFloat(item) * multiplier) / weakening
        } else if (index === 0 || index === 5 || index === 10) {
          return "1"
        } else if (index === 6) {
          return (multiplier * (maxRotate - ((maxRotate - minRotate) * (top - oppositeY)) / (top - bottom))) / weakening
        } else if (index === 9) {
          return (maxRotate - ((maxRotate - minRotate) * (top - oppositeY)) / (top - bottom)) / weakening
        }
        return item
      })
      .join(", ")
  }

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    for (const t of [leaveTimeout1, leaveTimeout2, leaveTimeout3]) if (t.current) clearTimeout(t.current)
    setDisableOverlayAnimation(true)

    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2

    setDisableInOutOverlayAnimation(false)
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5)
      })
    })

    const m = getMatrix(e.clientX, e.clientY)
    setMatrix(getOppositeMatrix(m, e.clientY, true))
    setIsTimeoutFinished(false)
    setTimeout(() => setIsTimeoutFinished(true), 200)
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2

    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150)
    if (isTimeoutFinished) setCurrentMatrix(getMatrix(e.clientX, e.clientY))
  }

  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY)
    if (enterTimeout.current) clearTimeout(enterTimeout.current)

    setCurrentMatrix(oppositeMatrix)
    setTimeout(() => setCurrentMatrix(identityMatrix), 200)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false)
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150)
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300)
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false)
          setDisableInOutOverlayAnimation(true)
        }, 500)
      })
    })
  }

  useEffect(() => {
    if (isTimeoutFinished) setMatrix(currentMatrix)
  }, [currentMatrix, isTimeoutFinished])

  const overlayAnimations = [...Array(10).keys()]
    .map(
      (i) => `
    @keyframes storeBadgeOverlay${i + 1} {
      0% { transform: rotate(${i * 10}deg); }
      50% { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }`,
    )
    .join(" ")

  const Icon = type === "app-store" ? Apple : Smartphone

  return (
    <div
      ref={ref}
      className="block w-[220px] sm:w-[260px] h-auto select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      aria-label={`${label[type]} — ${comingSoonLabel}. ${note}`}
    >
      <style>{overlayAnimations}</style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 200ms ease-out",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" className="w-[220px] sm:w-[260px] h-auto">
          <defs>
            <filter id={`blur-${type}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <linearGradient id={`gold-${type}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#C80000" />
              <stop offset="1" stopColor="#F4A405" />
            </linearGradient>
            <mask id={`mask-${type}`}>
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
          </defs>
          <rect width="260" height="54" rx="10" fill="#14141A" />
          <rect x="1" y="1" width="258" height="52" rx="9" fill="none" stroke={`url(#gold-${type})`} strokeWidth="1.5" />

          <foreignObject x="14" y="12" width="30" height="30">
            <Icon size={26} color="#FAFAF7" strokeWidth={1.6} />
          </foreignObject>

          <text fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#F4A405" x="52" y="21">
            {comingSoonLabel.toUpperCase()}
          </text>
          <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" fontWeight="700" fill="#FAFAF7" x="51" y="41">
            {label[type]}
          </text>

          <g style={{ mixBlendMode: "overlay" }} mask={`url(#mask-${type})`}>
            {overlayHues.map((hue, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                  transformOrigin: "center center",
                  transition: !disableInOutOverlayAnimation ? "transform 200ms ease-out" : "none",
                  animation: disableOverlayAnimation ? "none" : `storeBadgeOverlay${i + 1} 6s infinite`,
                  willChange: "transform",
                }}
              >
                <polygon
                  points="0,0 260,54 260,0 0,54"
                  fill={hue === "transparent" ? "transparent" : hue === "white" ? "white" : `hsl(${hue}, 90%, 55%)`}
                  filter={`url(#blur-${type})`}
                  opacity="0.35"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
