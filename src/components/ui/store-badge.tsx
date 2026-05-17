import { useEffect, useId, useRef, useState, type MouseEvent } from "react"

type StoreType = "app-store" | "google-play"

interface StoreBadgeProps {
  store: StoreType
  award?: string
  caption?: string
  link?: string
}

const identityMatrix = "1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1"
const maxRotate = 0.25
const minRotate = -0.25
const maxScale = 1
const minScale = 0.97

const STORE_META: Record<StoreType, { topLine: string; bottomLine: string; href: string; gradient: [string, string] }> = {
  "app-store": {
    topLine: "AWARDED ON",
    bottomLine: "App Store",
    href: "https://www.apple.com/app-store/",
    gradient: ["#1a1a1f", "#0b0b0f"],
  },
  "google-play": {
    topLine: "AWARDED ON",
    bottomLine: "Google Play",
    href: "https://play.google.com",
    gradient: ["#1a1a1f", "#0b0b0f"],
  },
}

export const StoreBadge = ({ store, award = "Editors' Choice", caption, link }: StoreBadgeProps) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const uid = useId().replace(/:/g, "")
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0)
  const [matrix, setMatrix] = useState(identityMatrix)
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix)
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true)
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false)
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false)
  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null)

  const meta = STORE_META[store]
  const href = link ?? meta.href

  const getDimensions = () => {
    const r = ref.current?.getBoundingClientRect()
    return { left: r?.left ?? 0, right: r?.right ?? 0, top: r?.top ?? 0, bottom: r?.bottom ?? 0 }
  }

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    const scale = [
      maxScale - ((maxScale - minScale) * Math.abs(xCenter - clientX)) / (xCenter - left),
      maxScale - ((maxScale - minScale) * Math.abs(yCenter - clientY)) / (yCenter - top),
      maxScale - ((maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY))) / (xCenter - left + yCenter - top),
    ]
    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - ((maxRotate - minRotate) * (top - clientY)) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left)),
      z1: 0.2 - ((0.2 + 0.6) * (top - clientY)) / (top - bottom),
      z3: 0,
    }
    return (
      `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`
    )
  }

  const getOppositeMatrix = (_matrix: string, clientY: number, onEnter?: boolean) => {
    const { top, bottom } = getDimensions()
    const oppositeY = bottom - clientY + top
    const weakening = onEnter ? 0.7 : 4
    const multiplier = onEnter ? -1 : 1
    return _matrix
      .split(", ")
      .map((item, index) => {
        if (index === 2 || index === 4 || index === 8) return (-parseFloat(item) * multiplier) / weakening
        if (index === 0 || index === 5 || index === 10) return "1"
        if (index === 6) return (multiplier * (maxRotate - ((maxRotate - minRotate) * (top - oppositeY)) / (top - bottom))) / weakening
        if (index === 9) return (maxRotate - ((maxRotate - minRotate) * (top - oppositeY)) / (top - bottom)) / weakening
        return item
      })
      .join(", ")
  }

  const onMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current)
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current)
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current)
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

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const { left, right, top, bottom } = getDimensions()
    const xCenter = (left + right) / 2
    const yCenter = (top + bottom) / 2
    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150)
    if (isTimeoutFinished) setCurrentMatrix(getMatrix(e.clientX, e.clientY))
  }

  const onMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
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

  const animPrefix = `sba${uid}`
  const overlayAnimations = [...Array(10).keys()]
    .map(
      (e) =>
        `@keyframes ${animPrefix}_${e + 1} { 0% { transform: rotate(${e * 10}deg); } 50% { transform: rotate(${(e + 1) * 10}deg); } 100% { transform: rotate(${e * 10}deg); } }`,
    )
    .join(" ")

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="block w-[200px] sm:w-[280px] h-auto cursor-pointer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      aria-label={`${meta.bottomLine} — ${award}`}
    >
      <style>{overlayAnimations}</style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 200ms ease-out",
          filter: "drop-shadow(0 12px 24px rgba(20,20,26,0.18))",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 72" className="w-full h-auto">
          <defs>
            <filter id={`blur-${uid}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id={`mask-${uid}`}>
              <rect width="260" height="72" fill="white" rx="12" />
            </mask>
            <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={meta.gradient[0]} />
              <stop offset="100%" stopColor={meta.gradient[1]} />
            </linearGradient>
            <linearGradient id={`gp-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00C2FF" />
              <stop offset="100%" stopColor="#00FFA3" />
            </linearGradient>
            <linearGradient id={`gp2-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC700" />
              <stop offset="100%" stopColor="#FF5C00" />
            </linearGradient>
          </defs>

          <rect width="260" height="72" rx="12" fill={`url(#bg-${uid})`} />
          <rect x="4" y="4" width="252" height="64" rx="10" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Icon */}
          <g transform="translate(18, 20)">
            {store === "app-store" ? (
              <path
                fill="#FAFAF7"
                transform="scale(1.4)"
                d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
              />
            ) : (
              <g transform="scale(1.4)">
                <path
                  d="M3.2 1.7c-.3.3-.4.7-.4 1.2v18.2c0 .5.1.9.4 1.2l.1.1L13.5 12.1v-.2L3.3 1.6z"
                  fill={`url(#gp-${uid})`}
                />
                <path
                  d="M16.9 15.5l-3.4-3.4v-.2l3.4-3.4.1.1 4 2.3c1.1.6 1.1 1.7 0 2.3l-4 2.3z"
                  fill={`url(#gp2-${uid})`}
                />
                <path
                  d="M17 15.4l-3.5-3.5L3.2 22.3c.4.4 1 .4 1.7.1l12.1-7"
                  fill="#FF3D55"
                />
                <path
                  d="M17 8.4L4.9 1.5c-.7-.4-1.3-.3-1.7.1l10.3 10.3z"
                  fill="#00B57F"
                />
              </g>
            )}
          </g>

          {/* Top label */}
          <text
            fontFamily="Geist Mono, ui-monospace, monospace"
            fontSize="9"
            fontWeight="500"
            letterSpacing="0.18em"
            fill="rgba(250,250,247,0.55)"
            x="64"
            y="24"
          >
            {meta.topLine}
          </text>

          {/* Store name */}
          <text
            fontFamily="Geist, Inter, sans-serif"
            fontSize="20"
            fontWeight="700"
            fill="#FAFAF7"
            x="64"
            y="47"
            letterSpacing="-0.5"
          >
            {meta.bottomLine}
          </text>

          {/* Award subline */}
          <text
            fontFamily="Geist, Inter, sans-serif"
            fontSize="11"
            fontWeight="500"
            fill="#FFD27A"
            x="64"
            y="63"
          >
            ★ {award}
            {caption ? ` · ${caption}` : ""}
          </text>

          {/* Iridescent sparkle overlay */}
          <g style={{ mixBlendMode: "overlay" }} mask={`url(#mask-${uid})`}>
            {[
              { hue: "hsl(358, 100%, 62%)", anim: 1, rot: 0 },
              { hue: "hsl(30, 100%, 50%)", anim: 2, rot: 10 },
              { hue: "hsl(60, 100%, 50%)", anim: 3, rot: 20 },
              { hue: "hsl(96, 100%, 50%)", anim: 4, rot: 30 },
              { hue: "hsl(233, 85%, 55%)", anim: 5, rot: 40 },
              { hue: "hsl(271, 85%, 55%)", anim: 6, rot: 50 },
              { hue: "hsl(300, 30%, 45%)", anim: 7, rot: 60 },
              { hue: "transparent", anim: 8, rot: 70 },
              { hue: "transparent", anim: 9, rot: 80 },
              { hue: "white", anim: 10, rot: 90 },
            ].map((layer) => (
              <g
                key={layer.anim}
                style={{
                  transform: `rotate(${firstOverlayPosition + layer.rot}deg)`,
                  transformOrigin: "center center",
                  transition: !disableInOutOverlayAnimation ? "transform 200ms ease-out" : "none",
                  animation: disableOverlayAnimation ? "none" : `${animPrefix}_${layer.anim} 5s infinite`,
                  willChange: "transform",
                }}
              >
                <polygon points="0,0 260,72 260,0 0,72" fill={layer.hue} filter={`url(#blur-${uid})`} opacity="0.6" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </a>
  )
}
