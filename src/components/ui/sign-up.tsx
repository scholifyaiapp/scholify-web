import { cn } from "@/lib/utils"
import LanguageToggle from "@/components/language-toggle"
import { useT } from "@/i18n/LanguageProvider"
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  createContext,
  Children,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, Mail, Gem, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader } from "lucide-react"
import { AnimatePresence, motion, useInView, type Variants, type Transition } from "motion/react"
import { useNavigate } from "react-router-dom"

import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti"
import confetti from "canvas-confetti"

type Api = { fire: (options?: ConfettiOptions) => void }
export type ConfettiRef = Api | null

const Confetti = forwardRef<
  ConfettiRef,
  React.ComponentPropsWithRef<"canvas"> & {
    options?: ConfettiOptions
    globalOptions?: ConfettiGlobalOptions
    manualstart?: boolean
  }
>((props, ref) => {
  const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest } = props
  const instanceRef = useRef<ConfettiInstance | null>(null)
  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        if (instanceRef.current) return
        instanceRef.current = confetti.create(node, { ...globalOptions, resize: true })
      } else if (instanceRef.current) {
        instanceRef.current.reset()
        instanceRef.current = null
      }
    },
    [globalOptions]
  )
  const fire = useCallback(
    (opts: ConfettiOptions = {}) => instanceRef.current?.({ ...options, ...opts }),
    [options]
  )
  const api = useMemo(() => ({ fire }), [fire])
  useImperativeHandle(ref, () => api, [api])
  useEffect(() => {
    if (!manualstart) fire()
  }, [manualstart, fire])
  return <canvas ref={canvasRef} {...rest} />
})
Confetti.displayName = "Confetti"

type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
  stopOnEnd?: boolean
}

function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  stopOnEnd = false,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)
  useEffect(() => {
    const ms = interval * 1000
    const timer = setInterval(() => {
      setCurrentIndex((cur) => {
        if (stopOnEnd && cur === items.length - 1) {
          clearInterval(timer)
          return cur
        }
        const next = (cur + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, ms)
    return () => clearInterval(timer)
  }, [items.length, interval, onIndexChange, stopOnEnd])
  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }
  return (
    <div className={cn("relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  variant?: Variants
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: string
  blur?: string
}

function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = true,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin as `${number}px` })
  const isInView = !inView || inViewResult
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="hidden"
      variants={combinedVariants}
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { size: "default" },
  }
)
const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tighter",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: { size: "default" },
  }
)
export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string
}
const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, onClick, ...props }, ref) => {
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const button = e.currentTarget.querySelector("button")
      if (button && e.target !== button) button.click()
    }
    return (
      <div className={cn("glass-button-wrap cursor-pointer rounded-full relative", className)} onClick={handleWrapperClick}>
        <button className={cn("glass-button relative z-10", glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
          <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
        </button>
        <div className="glass-button-shadow rounded-full pointer-events-none"></div>
      </div>
    )
  }
)
GlassButton.displayName = "GlassButton"

const GradientBackground = () => (
  <>
    <style>
      {`@keyframes float1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } }
        @keyframes float2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } }`}
    </style>
    <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full">
      <defs>
        <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#C80000", stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: "#E50068", stopOpacity: 0.5 }} />
        </linearGradient>
        <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#E50068", stopOpacity: 0.6 }} />
          <stop offset="50%" style={{ stopColor: "#FF6B3D", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "#C80000", stopOpacity: 0.6 }} />
        </linearGradient>
        <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#FF6B3D", stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: "#C80000", stopOpacity: 0.3 }} />
        </radialGradient>
        <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter>
        <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" /></filter>
        <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45" /></filter>
      </defs>
      <g style={{ animation: "float1 20s ease-in-out infinite" }}>
        <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)" />
        <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)" />
      </g>
      <g style={{ animation: "float2 25s ease-in-out infinite" }}>
        <circle cx="650" cy="450" r="150" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7" />
        <ellipse cx="50" cy="150" rx="180" ry="120" fill="#E50068" filter="url(#rev_blur2)" opacity="0.4" />
      </g>
    </svg>
  </>
)

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
    <g fillRule="evenodd" fill="none">
      <g fillRule="nonzero" transform="translate(3, 2)">
        <path fill="#4285F4" d="M57.81,30.15c0-2.43-.2-4.19-.62-6.03H29.5v10.95h16.25c-.33,2.72-2.1,6.82-6.03,9.57l-.06.37,8.76,6.78.61.06c5.57-5.15,8.78-12.72,8.78-21.7"/>
        <path fill="#34A853" d="M29.5,58.99c7.96,0,14.65-2.62,19.53-7.14l-9.31-7.21c-2.49,1.74-5.84,2.95-10.22,2.95-7.8,0-14.42-5.14-16.78-12.26l-.35.03L3.27,42.41l-.12.33C7.99,52.37,17.96,58.99,29.5,58.99"/>
        <path fill="#FBBC05" d="M12.72,35.33c-.62-1.83-.98-3.8-.98-5.83s.36-4,.95-5.83l-.02-.39L3.45,16.11l-.31.14C1.15,20.25,0,24.74,0,29.5s1.15,9.24,3.15,13.24l9.57-7.41"/>
        <path fill="#EB4335" d="M29.5,11.41c5.53,0,9.27,2.39,11.4,4.39l8.33-8.13C44.11,2.92,37.46,0,29.5,0,17.96,0,7.99,6.62,3.15,16.26l9.54,7.4c2.39-7.11,9.01-11.25,16.81-11.25"/>
      </g>
    </g>
  </svg>
)

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-6 h-6">
    <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const modalSteps = [
  { message: "Signing you up...", icon: <Loader className="w-12 h-12 text-[#C80000] animate-spin" /> },
  { message: "Building your plan...", icon: <Loader className="w-12 h-12 text-[#C80000] animate-spin" /> },
  { message: "Finalizing...", icon: <Loader className="w-12 h-12 text-[#C80000] animate-spin" /> },
  { message: "Welcome to Scholify!", icon: <PartyPopper className="w-12 h-12 text-green-500" /> },
]
const TEXT_LOOP_INTERVAL = 1.5

const DefaultLogo = () => (
  <div className="bg-[#C80000] text-white rounded-md p-1.5">
    <Gem className="h-4 w-4" />
  </div>
)

interface AuthComponentProps {
  logo?: React.ReactNode
  brandName?: string
  onSuccess?: () => void
}

export const AuthComponent = ({ logo = <DefaultLogo />, brandName = "Scholify", onSuccess }: AuthComponentProps) => {
  const navigate = useNavigate()
  const t = useT()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authStep, setAuthStep] = useState<"email" | "password" | "confirmPassword">("email")
  const [modalStatus, setModalStatus] = useState<"closed" | "loading" | "error" | "success">("closed")
  const [modalErrorMessage, setModalErrorMessage] = useState("")
  const confettiRef = useRef<ConfettiRef>(null)

  const isEmailValid = /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = password.length >= 6
  const isConfirmPasswordValid = confirmPassword.length >= 6

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire
    if (fire) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }
      const particleCount = 50
      fire({ ...defaults, particleCount, origin: { x: 0, y: 1 }, angle: 60 })
      fire({ ...defaults, particleCount, origin: { x: 1, y: 1 }, angle: 120 })
    }
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (modalStatus !== "closed" || authStep !== "confirmPassword") return

    if (password !== confirmPassword) {
      setModalErrorMessage(t("Passwords do not match!"))
      setModalStatus("error")
    } else {
      setModalStatus("loading")
      const loadingStepsCount = modalSteps.length - 1
      const totalDuration = loadingStepsCount * TEXT_LOOP_INTERVAL * 1000
      setTimeout(() => {
        fireSideCanons()
        setModalStatus("success")
        setTimeout(() => {
          if (onSuccess) onSuccess()
          else navigate("/dashboard")
        }, 1800)
      }, totalDuration)
    }
  }

  const handleProgressStep = () => {
    if (authStep === "email" && isEmailValid) setAuthStep("password")
    else if (authStep === "password" && isPasswordValid) setAuthStep("confirmPassword")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleProgressStep()
    }
  }

  const handleGoBack = () => {
    if (authStep === "confirmPassword") {
      setAuthStep("password")
      setConfirmPassword("")
    } else if (authStep === "password") setAuthStep("email")
  }

  const closeModal = () => {
    setModalStatus("closed")
    setModalErrorMessage("")
  }

  useEffect(() => {
    if (authStep === "password") setTimeout(() => passwordInputRef.current?.focus(), 500)
    else if (authStep === "confirmPassword") setTimeout(() => confirmPasswordInputRef.current?.focus(), 500)
  }, [authStep])

  useEffect(() => {
    if (modalStatus === "success") fireSideCanons()
  }, [modalStatus])

  const Modal = () => (
    <AnimatePresence>
      {modalStatus !== "closed" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white border border-neutral-200 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-2 shadow-xl">
            {(modalStatus === "error" || modalStatus === "success") && (
              <button onClick={closeModal} aria-label={t("Close")} className="absolute top-2 right-2 p-1 text-neutral-500 hover:text-neutral-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
            {modalStatus === "error" && (
              <>
                <AlertCircle className="w-12 h-12 text-red-500" />
                <p className="text-lg font-medium text-neutral-900">{modalErrorMessage}</p>
                <GlassButton onClick={closeModal} size="sm" className="mt-4">{t("Try Again")}</GlassButton>
              </>
            )}
            {modalStatus === "loading" && (
              <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={true}>
                {modalSteps.slice(0, -1).map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    {step.icon}
                    <p className="text-lg font-medium text-neutral-900">{t(step.message)}</p>
                  </div>
                ))}
              </TextLoop>
            )}
            {modalStatus === "success" && (
              <div className="flex flex-col items-center gap-4">
                {modalSteps[modalSteps.length - 1].icon}
                <p className="text-lg font-medium text-neutral-900">{t(modalSteps[modalSteps.length - 1].message)}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="bg-[#FAFAF7] min-h-[100dvh] w-full flex flex-col text-[#14141A]">
      <style>{`
        @property --angle-1 { syntax: "<angle>"; inherits: false; initial-value: -75deg; }
        @property --angle-2 { syntax: "<angle>"; inherits: false; initial-value: -45deg; }
        .glass-button-wrap { --anim-time: 400ms; --anim-ease: cubic-bezier(0.25, 1, 0.5, 1); --border-width: clamp(1px, 0.0625em, 4px); position: relative; z-index: 2; transform-style: preserve-3d; transition: transform var(--anim-time) var(--anim-ease); }
        .glass-button-wrap:has(.glass-button:active) { transform: rotateX(25deg); }
        .glass-button-shadow { --shadow-cutoff-fix: 2em; position: absolute; width: calc(100% + var(--shadow-cutoff-fix)); height: calc(100% + var(--shadow-cutoff-fix)); top: calc(0% - var(--shadow-cutoff-fix) / 2); left: calc(0% - var(--shadow-cutoff-fix) / 2); filter: blur(clamp(2px, 0.125em, 12px)); transition: filter var(--anim-time) var(--anim-ease); pointer-events: none; z-index: 0; }
        .glass-button { -webkit-tap-highlight-color: transparent; backdrop-filter: blur(clamp(1px, 0.125em, 4px)); transition: all var(--anim-time) var(--anim-ease); background: linear-gradient(-75deg, rgba(255,255,255,0.4), rgba(255,255,255,0.7), rgba(255,255,255,0.4)); box-shadow: inset 0 0.125em 0.125em rgba(0,0,0,0.05), inset 0 -0.125em 0.125em rgba(255,255,255,0.5), 0 0.25em 0.125em -0.125em rgba(0,0,0,0.15); border-radius: 9999px; }
        .glass-button:hover { transform: scale(0.975); }
        .glass-button-text { color: #14141A; transition: all var(--anim-time) var(--anim-ease); }
        .glass-input-wrap { position: relative; z-index: 2; border-radius: 9999px; }
        .glass-input { display: flex; position: relative; width: 100%; align-items: center; gap: 0.5rem; border-radius: 9999px; padding: 0.25rem; backdrop-filter: blur(clamp(1px, 0.125em, 4px)); transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1); background: rgba(255,255,255,0.65); box-shadow: inset 0 0.125em 0.125em rgba(0,0,0,0.04), inset 0 -0.125em 0.125em rgba(255,255,255,0.6), 0 0.25em 0.5em -0.25em rgba(20,20,26,0.1); border: 1px solid rgba(20,20,26,0.08); }
        .glass-input-wrap:focus-within .glass-input { border-color: rgba(91,91,245,0.5); box-shadow: inset 0 0.125em 0.125em rgba(0,0,0,0.04), 0 0 0 3px rgba(91,91,245,0.15); }
        .glass-input-text-area { position: absolute; inset: 0; border-radius: 9999px; pointer-events: none; }
      `}</style>

      <Confetti ref={confettiRef} manualstart className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" />
      <Modal />

      <div className={cn("fixed top-4 left-4 z-20 flex items-center gap-2", "md:left-1/2 md:-translate-x-1/2")}>
        {logo}
        <h1 className="text-base font-bold text-[#14141A]">{brandName}</h1>
      </div>

      <div className="fixed top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      <div className={cn("flex w-full flex-1 h-full items-center justify-center", "relative overflow-hidden")}>
        <div className="absolute inset-0 z-0 opacity-50"><GradientBackground /></div>
        <fieldset disabled={modalStatus !== "closed"} className="relative z-10 flex flex-col items-center gap-8 w-[300px] mx-auto p-4">
          <AnimatePresence mode="wait">
            {authStep === "email" && (
              <motion.div key="email-content" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center gap-4">
                <BlurFade delay={0.25} className="w-full">
                  <div className="text-center">
                    <p className="font-display font-normal text-4xl sm:text-5xl tracking-tight text-[#14141A] whitespace-nowrap">{t("Start your streak")}</p>
                  </div>
                </BlurFade>
                <BlurFade delay={0.5}>
                  <p className="text-sm font-medium text-neutral-500">{t("Continue with")}</p>
                </BlurFade>
                <BlurFade delay={0.75}>
                  <div className="flex items-center justify-center gap-4 w-full">
                    <GlassButton contentClassName="flex items-center justify-center gap-2" size="sm">
                      <GoogleIcon />
                      <span className="font-semibold text-[#14141A]">Google</span>
                    </GlassButton>
                    <GlassButton contentClassName="flex items-center justify-center gap-2" size="sm">
                      <GitHubIcon />
                      <span className="font-semibold text-[#14141A]">GitHub</span>
                    </GlassButton>
                  </div>
                </BlurFade>
                <BlurFade delay={1} className="w-full">
                  <div className="flex items-center w-full gap-2 py-2">
                    <hr className="w-full border-neutral-200" />
                    <span className="text-xs font-semibold text-neutral-400">OR</span>
                    <hr className="w-full border-neutral-200" />
                  </div>
                </BlurFade>
              </motion.div>
            )}
            {authStep === "password" && (
              <motion.div key="password-title" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-4">
                <BlurFade delay={0} className="w-full">
                  <p className="font-display font-normal text-4xl sm:text-5xl tracking-tight text-[#14141A] whitespace-nowrap">{t("Create a password")}</p>
                </BlurFade>
                <BlurFade delay={0.25}>
                  <p className="text-sm font-medium text-neutral-500">{t("At least 6 characters.")}</p>
                </BlurFade>
              </motion.div>
            )}
            {authStep === "confirmPassword" && (
              <motion.div key="confirm-title" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-4">
                <BlurFade delay={0} className="w-full">
                  <p className="font-display font-normal text-4xl sm:text-5xl tracking-tight text-[#14141A] whitespace-nowrap">{t("One last step")}</p>
                </BlurFade>
                <BlurFade delay={0.25}>
                  <p className="text-sm font-medium text-neutral-500">{t("Confirm your password to continue.")}</p>
                </BlurFade>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleFinalSubmit} className="w-[300px] space-y-6">
            <AnimatePresence>
              {authStep !== "confirmPassword" && (
                <motion.div key="email-password-fields" exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full space-y-6">
                  <BlurFade delay={authStep === "email" ? 1.25 : 0} inView={true} className="w-full">
                    <div className="relative w-full">
                      <AnimatePresence>
                        {authStep === "password" && (
                          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.4 }} className="absolute -top-6 left-4 z-10">
                            <label className="text-xs text-neutral-500 font-semibold">{t("Email")}</label>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="glass-input-wrap w-full">
                        <div className="glass-input">
                          <span className="glass-input-text-area"></span>
                          <div className={cn("relative z-10 flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out", email.length > 20 && authStep === "email" ? "w-0 px-0" : "w-10 pl-2")}>
                            <Mail className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                          </div>
                          <input
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            autoFocus
                            placeholder={t("Email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={cn("relative z-10 h-full w-0 flex-grow bg-transparent text-[#14141A] placeholder:text-neutral-400 focus:outline-none transition-[padding-right] duration-300 ease-in-out delay-300 text-base py-2", isEmailValid && authStep === "email" ? "pr-2" : "pr-0")}
                          />
                          <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isEmailValid && authStep === "email" ? "w-10 pr-1" : "w-0")}>
                            <GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label={t("Continue with email")}>
                              <ArrowRight className="w-5 h-5" />
                            </GlassButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                  <AnimatePresence>
                    {authStep === "password" && (
                      <BlurFade key="password-field" className="w-full">
                        <div className="relative w-full">
                          <AnimatePresence>
                            {password.length > 0 && (
                              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10">
                                <label className="text-xs text-neutral-500 font-semibold">{t("Password")}</label>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="glass-input-wrap w-full">
                            <div className="glass-input">
                              <span className="glass-input-text-area"></span>
                              <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                                {isPasswordValid ? (
                                  <button type="button" aria-label={t("Toggle password visibility")} onClick={() => setShowPassword(!showPassword)} className="text-neutral-500 hover:text-[#14141A] transition-colors p-2 rounded-full">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                  </button>
                                ) : (
                                  <Lock className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                                )}
                              </div>
                              <input
                                ref={passwordInputRef}
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder={t("Password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="relative z-10 h-full w-0 flex-grow bg-transparent text-[#14141A] placeholder:text-neutral-400 focus:outline-none text-base py-2"
                              />
                              <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isPasswordValid ? "w-10 pr-1" : "w-0")}>
                                <GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label={t("Submit password")}>
                                  <ArrowRight className="w-5 h-5" />
                                </GlassButton>
                              </div>
                            </div>
                          </div>
                        </div>
                        <BlurFade inView delay={0.2}>
                          <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-neutral-500 hover:text-[#14141A] transition-colors">
                            <ArrowLeft className="w-4 h-4" /> {t("Go back")}
                          </button>
                        </BlurFade>
                      </BlurFade>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {authStep === "confirmPassword" && (
                <BlurFade key="confirm-password-field" className="w-full">
                  <div className="relative w-full">
                    <AnimatePresence>
                      {confirmPassword.length > 0 && (
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10">
                          <label className="text-xs text-neutral-500 font-semibold">{t("Confirm password")}</label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="glass-input-wrap w-full">
                      <div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          {isConfirmPasswordValid ? (
                            <button type="button" aria-label={t("Toggle confirm password visibility")} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-neutral-500 hover:text-[#14141A] transition-colors p-2 rounded-full">
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          ) : (
                            <Lock className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                          )}
                        </div>
                        <input
                          ref={confirmPasswordInputRef}
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder={t("Confirm password")}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="relative z-10 h-full w-0 flex-grow bg-transparent text-[#14141A] placeholder:text-neutral-400 focus:outline-none text-base py-2"
                        />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isConfirmPasswordValid ? "w-10 pr-1" : "w-0")}>
                          <GlassButton type="submit" size="icon" aria-label={t("Finish sign-up")}>
                            <ArrowRight className="w-5 h-5" />
                          </GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BlurFade inView delay={0.2}>
                    <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-neutral-500 hover:text-[#14141A] transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Go back
                    </button>
                  </BlurFade>
                </BlurFade>
              )}
            </AnimatePresence>
          </form>
        </fieldset>
      </div>
    </div>
  )
}
