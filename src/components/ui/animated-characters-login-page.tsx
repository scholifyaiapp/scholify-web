import { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail } from "lucide-react"

interface PupilProps {
  size?: number
  maxDistance?: number
  pupilColor?: string
  forceLookX?: number
  forceLookY?: number
}

const Pupil = ({ size = 12, maxDistance = 5, pupilColor = "black", forceLookX, forceLookY }: PupilProps) => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const pupilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 }
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY }
    const pupil = pupilRef.current.getBoundingClientRect()
    const cx = pupil.left + pupil.width / 2
    const cy = pupil.top + pupil.height / 2
    const dx = mouseX - cx
    const dy = mouseY - cy
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
    const angle = Math.atan2(dy, dx)
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance }
  }

  const pos = calculatePupilPosition()

  return (
    <div
      ref={pupilRef}
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

const EyeBall = ({ size = 48, pupilSize = 16, maxDistance = 10, eyeColor = "white", pupilColor = "black", isBlinking = false, forceLookX, forceLookY }: EyeBallProps) => {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const eyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 }
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY }
    const eye = eyeRef.current.getBoundingClientRect()
    const cx = eye.left + eye.width / 2
    const cy = eye.top + eye.height / 2
    const dx = mouseX - cx
    const dy = mouseY - cy
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance)
    const angle = Math.atan2(dy, dx)
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance }
  }

  const pos = calculatePupilPosition()

  return (
    <div
      ref={eyeRef}
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

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false)
  const [isBlackBlinking, setIsBlackBlinking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)
  const [isPurplePeeking, setIsPurplePeeking] = useState(false)
  const purpleRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const yellowRef = useRef<HTMLDivElement>(null)
  const orangeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true)
        setTimeout(() => {
          setIsPurpleBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())
      return blinkTimeout
    }
    const timeout = scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true)
        setTimeout(() => {
          setIsBlackBlinking(false)
          scheduleBlink()
        }, 150)
      }, getRandomBlinkInterval())
      return blinkTimeout
    }
    const timeout = scheduleBlink()
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true)
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800)
      return () => clearTimeout(timer)
    }
    setIsLookingAtEachOther(false)
  }, [isTyping])

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peek = setTimeout(() => {
          setIsPurplePeeking(true)
          setTimeout(() => setIsPurplePeeking(false), 800)
        }, Math.random() * 3000 + 2000)
        return peek
      }
      const first = schedulePeek()
      return () => clearTimeout(first)
    }
    setIsPurplePeeking(false)
  }, [password, showPassword, isPurplePeeking])

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 }
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 3
    const dx = mouseX - cx
    const dy = mouseY - cy
    const faceX = Math.max(-15, Math.min(15, dx / 20))
    const faceY = Math.max(-10, Math.min(10, dy / 30))
    const bodySkew = Math.max(-6, Math.min(6, -dx / 120))
    return { faceX, faceY, bodySkew }
  }

  const purplePos = calculatePosition(purpleRef)
  const blackPos = calculatePosition(blackRef)
  const yellowPos = calculatePosition(yellowRef)
  const orangePos = calculatePosition(orangeRef)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    // Demo auth — accepts any valid email + password ≥ 4 chars
    if (/\S+@\S+\.\S+/.test(email) && password.length >= 4) {
      navigate("/dashboard")
    } else {
      setError("Please enter a valid email and a password of at least 4 characters.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] grid lg:grid-cols-2">
      <style>{`
        :root { --char-scale: 0.45; }
        @media (min-width: 480px) { :root { --char-scale: 0.55; } }
        @media (min-width: 640px) { :root { --char-scale: 0.7; } }
        @media (min-width: 1024px) { :root { --char-scale: 1; } }
      `}</style>
      {/* Left panel — characters on premium milk-white (visible everywhere; compact on mobile) */}
      <div
        className="relative flex flex-col justify-between p-6 lg:p-12 text-[#14141A] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FBFBF8 100%)",
          borderRight: "1px solid rgba(20,20,26,0.06)",
        }}
      >
        <div className="relative z-20">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-[#14141A]" aria-label="Scholify home">
            <img src="/logo.svg" alt="Scholify" width={32} height={32} decoding="async" style={{ borderRadius: 8, display: "block" }} />
            <span>Scholify</span>
          </Link>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[240px] sm:h-[320px] lg:h-[500px] overflow-hidden">
          <div
            className="relative origin-bottom"
            style={{
              width: 550,
              height: 400,
              transform: "scale(var(--char-scale, 1))",
              transformOrigin: "bottom center",
            }}
          >
            {/* Purple */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 70,
                width: 180,
                height: (isTyping || (password.length > 0 && !showPassword)) ? 440 : 400,
                backgroundColor: "#6C3FF5",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform:
                  password.length > 0 && showPassword
                    ? "skewX(0deg)"
                    : (isTyping || (password.length > 0 && !showPassword))
                      ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                      : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: password.length > 0 && showPassword ? 20 : isLookingAtEachOther ? 55 : 45 + purplePos.faceX,
                  top: password.length > 0 && showPassword ? 35 : isLookingAtEachOther ? 65 : 40 + purplePos.faceY,
                }}
              >
                <EyeBall size={18} pupilSize={7} maxDistance={5} pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
                  forceLookX={password.length > 0 && showPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={password.length > 0 && showPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
                <EyeBall size={18} pupilSize={7} maxDistance={5} pupilColor="#2D2D2D" isBlinking={isPurpleBlinking}
                  forceLookX={password.length > 0 && showPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={password.length > 0 && showPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined} />
              </div>
            </div>

            {/* Black */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 240,
                width: 120,
                height: 310,
                backgroundColor: "#2D2D2D",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform:
                  password.length > 0 && showPassword
                    ? "skewX(0deg)"
                    : isLookingAtEachOther
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                      : (isTyping || (password.length > 0 && !showPassword))
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                        : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: password.length > 0 && showPassword ? 10 : isLookingAtEachOther ? 32 : 26 + blackPos.faceX,
                  top: password.length > 0 && showPassword ? 28 : isLookingAtEachOther ? 12 : 32 + blackPos.faceY,
                }}
              >
                <EyeBall size={16} pupilSize={6} maxDistance={4} pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
                  forceLookX={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? -4 : undefined} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} pupilColor="#2D2D2D" isBlinking={isBlackBlinking}
                  forceLookX={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? -4 : undefined} />
              </div>
            </div>

            {/* Orange (semi-circle) */}
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
                transform: password.length > 0 && showPassword ? "skewX(0deg)" : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: password.length > 0 && showPassword ? 50 : 82 + (orangePos.faceX || 0),
                  top: password.length > 0 && showPassword ? 85 : 90 + (orangePos.faceY || 0),
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={password.length > 0 && showPassword ? -5 : undefined} forceLookY={password.length > 0 && showPassword ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={password.length > 0 && showPassword ? -5 : undefined} forceLookY={password.length > 0 && showPassword ? -4 : undefined} />
              </div>
            </div>

            {/* Yellow */}
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
                transform: password.length > 0 && showPassword ? "skewX(0deg)" : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: password.length > 0 && showPassword ? 20 : 52 + (yellowPos.faceX || 0),
                  top: password.length > 0 && showPassword ? 35 : 40 + (yellowPos.faceY || 0),
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={password.length > 0 && showPassword ? -5 : undefined} forceLookY={password.length > 0 && showPassword ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={password.length > 0 && showPassword ? -5 : undefined} forceLookY={password.length > 0 && showPassword ? -4 : undefined} />
              </div>
              <div
                className="absolute w-20 h-[4px] rounded-full transition-all duration-200 ease-out"
                style={{
                  backgroundColor: "#2D2D2D",
                  left: password.length > 0 && showPassword ? 10 : 40 + (yellowPos.faceX || 0),
                  top: password.length > 0 && showPassword ? 88 : 88 + (yellowPos.faceY || 0),
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 hidden lg:flex items-center gap-8 text-sm text-neutral-500">
          <a href="#" className="hover:text-[#14141A] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#14141A] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#14141A] transition-colors">Contact</a>
        </div>

        <div className="absolute top-1/4 right-1/4 size-64 rounded-full blur-3xl" style={{ background: "rgba(91,91,245,0.06)" }} />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full blur-3xl" style={{ background: "rgba(168,85,247,0.05)" }} />
      </div>

      {/* Right login panel */}
      <div className="flex items-center justify-center p-6 sm:p-8 bg-[#FAFAF7]">
        <div className="w-full max-w-[420px]">

          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-normal tracking-tight mb-2 text-[#14141A]">Welcome back.</h1>
            <p className="text-neutral-500 text-sm">
              New here?{" "}
              <Link to="/sign-up" className="text-[#5B5BF5] font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                className="h-12 bg-white border-neutral-200 focus:border-[#5B5BF5] focus-visible:ring-[#5B5BF5]/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 bg-white border-neutral-200 focus:border-[#5B5BF5] focus-visible:ring-[#5B5BF5]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#14141A] transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember for 30 days
                </Label>
              </div>
              <a href="#" className="text-sm text-[#5B5BF5] hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {error && (
              <div role="alert" className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-12 text-base font-medium bg-[#14141A] text-white hover:bg-[#3F3F46]"
            >
              {isLoading ? "Signing in..." : "Log in"}
            </Button>
          </form>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full h-12 bg-white border-neutral-200 hover:bg-neutral-50"
              type="button"
            >
              <Mail className="mr-2 size-5" />
              Log in with Google
            </Button>
          </div>

          <div className="text-center text-sm text-neutral-500 mt-8">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-[#14141A] font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Component = LoginPage
