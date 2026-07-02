import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { useToast } from "@/components/Toast"
import { useAuth } from "@/lib/auth"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { api } from "@/lib/api"

/* ──────────────────────────────────────────────────────────────
 *  SpeakingPractice — Pro modal for spoken-explanation drills.
 *
 *  Flow: prompt → recording → processing → results.
 *  Audio is captured with MediaRecorder + visualized with an
 *  AnalyserNode; uploaded to /api/score-speech as base64 + the
 *  task context. Results show clarity / accuracy / fluency and a
 *  short coach note from Lara.
 * ────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MAX_DURATION_SEC = 180
const TEXT2 = "var(--sch-tx-2)"

type Phase = "prompt" | "recording" | "processing" | "results" | "error"

interface SpeakingPracticeProps {
  open: boolean
  onClose: () => void
  taskTitle: string
  goal: string
  dayNumber: number
  planId?: string | null
}

interface ScoreResult {
  clarity: number
  accuracy: number
  fluency: number
  overall: number
  feedback: string
  transcript: string
  isFallback?: boolean
}

/* ── Helpers ─────────────────────────────────────────────────── */

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : "")
    reader.onerror = () => reject(new Error("Couldn't read audio"))
    reader.readAsDataURL(blob)
  })
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, "0")}`
}

const LAST_SCORE_KEY = "scholify-last-speaking-score"

interface LastScore {
  overall: number
  at: string
}

function readLastScore(): LastScore | null {
  try {
    const raw = window.localStorage.getItem(LAST_SCORE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LastScore
  } catch {
    return null
  }
}

function writeLastScore(score: LastScore): void {
  try {
    window.localStorage.setItem(LAST_SCORE_KEY, JSON.stringify(score))
  } catch {
    /* ignore */
  }
}

/* ── Waveform ────────────────────────────────────────────────── */

function Waveform({ analyser, active }: { analyser: AnalyserNode | null; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!analyser || !active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const buffer = new Uint8Array(analyser.frequencyBinCount)
    let raf = 0
    let alive = true

    function draw() {
      if (!alive || !analyser || !ctx) return
      analyser.getByteFrequencyData(buffer)
      const w = canvas!.width
      const h = canvas!.height
      ctx.clearRect(0, 0, w, h)

      const bars = 36
      const step = Math.floor(buffer.length / bars)
      const barW = w / bars - 2
      for (let i = 0; i < bars; i++) {
        const v = buffer[i * step] / 255
        const bh = Math.max(2, v * h * 0.95)
        const x = i * (barW + 2)
        const y = (h - bh) / 2
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, "#C80000")
        grad.addColorStop(0.35, "#E50068")
        grad.addColorStop(0.7, "#F0ABFC")
        grad.addColorStop(1, "#FBBF24")
        ctx.fillStyle = grad
        ctx.fillRect(x, y, barW, bh)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [analyser, active])

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={64}
      style={{ width: "100%", height: 64, display: "block" }}
    />
  )
}

/* ── Score card ──────────────────────────────────────────────── */

function ScoreCard({
  label,
  value,
  delay = 0,
}: {
  label: string
  value: number
  delay?: number
}) {
  const size = 56
  const stroke = 4
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - Math.max(0, Math.min(10, value)) / 10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay }}
      style={{
        flex: 1,
        padding: 16,
        borderRadius: 14,
        background: "var(--sch-card-2)",
        border: "1px solid var(--sch-border)",
        textAlign: "center",
        position: "relative",
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: TEXT2,
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          margin: "10px auto 0",
        }}
      >
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#score-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeDasharray={`${circ} ${circ}`}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 + delay }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 800,
            ...iriText,
          }}
        >
          {value.toFixed(1)}
        </div>
      </div>
      <div style={{ fontSize: 11, color: "var(--sch-tx-3)", marginTop: 4 }}>/ 10</div>
    </motion.div>
  )
}

/* ── Processing orb ──────────────────────────────────────────── */

function ProcessingOrb() {
  return (
    <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto" }}>
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "linear",
            delay: d,
          }}
          style={{
            position: "absolute",
            inset: i * 8,
            borderRadius: "50%",
            border: `1px solid rgba(200,0,0,${0.2 - i * 0.05})`,
            borderTopColor: "rgba(200,0,0,0.9)",
          }}
        />
      ))}
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 28,
          borderRadius: "50%",
          background: IRIDESCENT,
          boxShadow: "0 0 50px rgba(200,0,0,0.55)",
        }}
      />
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────── */

export default function SpeakingPractice({
  open,
  onClose,
  taskTitle,
  goal,
  dayNumber,
  planId,
}: SpeakingPracticeProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [phase, setPhase] = useState<Phase>("prompt")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [seconds, setSeconds] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)
  const [score, setScore] = useState<ScoreResult | null>(null)
  const [trend, setTrend] = useState<{ delta: number } | null>(null)

  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const tickRef = useRef<number | null>(null)

  /* ── Reset on close ── */
  useEffect(() => {
    if (open) return
    // Cleanup hardware when the modal closes.
    tearDown()
    setPhase("prompt")
    setSeconds(0)
    setScore(null)
    setShowTranscript(false)
    setErrorMsg("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function tearDown() {
    if (tickRef.current) {
      window.clearInterval(tickRef.current)
      tickRef.current = null
    }
    try {
      recorderRef.current?.stop()
    } catch {
      /* ignore */
    }
    recorderRef.current = null
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    try {
      analyserRef.current?.disconnect()
    } catch {
      /* ignore */
    }
    analyserRef.current = null
    try {
      audioCtxRef.current?.close()
    } catch {
      /* ignore */
    }
    audioCtxRef.current = null
  }

  /* ── Start recording ── */
  const startRecording = useCallback(async () => {
    setErrorMsg("")
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("This browser doesn't support microphone capture.")
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AC()
      audioCtxRef.current = ctx
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 128
      const source = ctx.createMediaStreamSource(stream)
      source.connect(analyser)
      analyserRef.current = analyser

      const mime = (() => {
        const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]
        for (const c of candidates) {
          if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(c)) {
            return c
          }
        }
        return ""
      })()

      const recorder = mime
        ? new MediaRecorder(stream, { mimeType: mime })
        : new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = handleRecordingStopped
      recorder.start()

      setPhase("recording")
      setSeconds(0)
      tickRef.current = window.setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_DURATION_SEC) {
            stopRecording()
            return MAX_DURATION_SEC
          }
          return s + 1
        })
      }, 1000)
    } catch (err) {
      console.error("mic error:", err)
      setErrorMsg(
        err instanceof Error && /not allowed|denied|Permission/.test(err.message)
          ? "Microphone access was blocked. Enable it in your browser settings and try again."
          : err instanceof Error
            ? err.message
            : "Couldn't access the microphone.",
      )
      setPhase("error")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Stop recording ── */
  const stopRecording = useCallback(() => {
    if (tickRef.current) {
      window.clearInterval(tickRef.current)
      tickRef.current = null
    }
    try {
      recorderRef.current?.stop()
    } catch {
      /* ignore */
    }
  }, [])

  /* ── Recording finished — upload + score ── */
  const handleRecordingStopped = useCallback(async () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null

    const chunks = chunksRef.current
    chunksRef.current = []
    const mime = recorderRef.current?.mimeType || "audio/webm"
    const blob = new Blob(chunks, { type: mime })

    setPhase("processing")

    let audioBase64 = ""
    try {
      audioBase64 = await blobToBase64(blob)
    } catch {
      /* ignore — will fall back without audio */
    }

    try {
      const res = await api.scoreSpeech({
        audioBase64,
        taskTitle,
        goal,
        userId: user?.id,
        durationSec: seconds,
      })
      setScore(res)

      // Trend vs last session.
      const previous = readLastScore()
      if (previous) {
        const delta = Math.round((res.overall - previous.overall) * 10) / 10
        if (Math.abs(delta) >= 0.1) setTrend({ delta })
      }
      writeLastScore({ overall: res.overall, at: new Date().toISOString() })

      // Persist to Supabase progress row (best-effort).
      if (isSupabaseConfigured && user?.id) {
        try {
          await supabase
            .from("progress")
            .upsert(
              {
                user_id: user.id,
                day_number: dayNumber,
                plan_id: planId ?? null,
                speaking_clarity: res.clarity,
                speaking_accuracy: res.accuracy,
                speaking_fluency: res.fluency,
                speaking_overall: res.overall,
                speaking_transcript: res.transcript,
                completed_at: new Date().toISOString(),
              },
              { onConflict: "user_id,day_number" },
            )
            .then(
              () => {},
              () => {},
            )
        } catch {
          /* ignore */
        }
      }
      setPhase("results")
    } catch (err) {
      console.error("score error:", err)
      setErrorMsg("Couldn't score that one — try again in a moment.")
      setPhase("error")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskTitle, goal, seconds, user, dayNumber, planId])

  const handleClose = () => {
    tearDown()
    onClose()
  }

  const handleRetry = () => {
    setScore(null)
    setShowTranscript(false)
    setSeconds(0)
    setTrend(null)
    setPhase("prompt")
  }

  const handleDone = () => {
    if (score) {
      toast.success(`Speaking score saved · ${score.overall.toFixed(1)}/10`)
    }
    handleClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.78)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              width: "100%",
              maxWidth: 480,
              padding: 32,
              borderRadius: 24,
              background: "var(--sch-bg-2)",
              border: "1px solid var(--sch-border-2)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Hidden gradient definition for the score rings. */}
            <svg width={0} height={0} style={{ position: "absolute" }}>
              <defs>
                <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C80000" />
                  <stop offset="35%" stopColor="#E50068" />
                  <stop offset="70%" stopColor="#F0ABFC" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 10,
                border: "1px solid var(--sch-border)",
                background: "var(--sch-card)",
                color: "var(--sch-tx-2)",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <AnimatePresence mode="wait">
              {phase === "prompt" && (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--sch-text)",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    Speaking Practice 🎤
                  </h2>
                  <p style={{ fontSize: 14, color: TEXT2, marginTop: 6, lineHeight: 1.55 }}>
                    Explain what you learned today as if teaching a friend.
                  </p>

                  <div
                    style={{
                      marginTop: 18,
                      padding: "16px 18px",
                      borderRadius: 16,
                      background: "rgba(200,0,0,0.08)",
                      border: "1px solid rgba(200,0,0,0.22)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: TEXT2, marginBottom: 8 }}>
                      Speak for 1–2 minutes about:
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--sch-text)",
                        lineHeight: 1.4,
                      }}
                    >
                      {taskTitle}
                    </div>
                    <ul
                      style={{
                        marginTop: 12,
                        paddingLeft: 0,
                        listStyle: "none",
                        fontSize: 12,
                        color: "var(--sch-tx-3)",
                        lineHeight: 1.6,
                      }}
                    >
                      <li>• Explain it in your own words</li>
                      <li>• Give an example if you can</li>
                      <li>• It's okay to hesitate</li>
                    </ul>
                  </div>

                  <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
                    <motion.button
                      type="button"
                      onClick={startRecording}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Start recording"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: "none",
                        background: IRIDESCENT,
                        color: "#fff",
                        fontSize: 32,
                        cursor: "pointer",
                        boxShadow: "0 0 60px rgba(200,0,0,0.4)",
                      }}
                    >
                      🎤
                    </motion.button>
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      textAlign: "center",
                      fontSize: 12,
                      color: "var(--sch-tx-3)",
                    }}
                  >
                    Tap to start — up to 3 min
                  </div>
                </motion.div>
              )}

              {phase === "recording" && (
                <motion.div
                  key="recording"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--sch-text)",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    Listening…
                  </h2>
                  <p style={{ fontSize: 14, color: TEXT2, marginTop: 6 }}>
                    {taskTitle}
                  </p>

                  <div
                    style={{
                      marginTop: 20,
                      padding: "16px 18px",
                      borderRadius: 16,
                      background: "rgba(255,69,58,0.06)",
                      border: "1px solid rgba(255,69,58,0.18)",
                    }}
                  >
                    <Waveform analyser={analyserRef.current} active={phase === "recording"} />
                  </div>

                  <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
                    <motion.button
                      type="button"
                      onClick={startRecording}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Recording"
                      disabled
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: "none",
                        background:
                          "linear-gradient(135deg, rgba(255,69,58,0.85), rgba(255,100,50,0.85))",
                        color: "#fff",
                        fontSize: 28,
                        cursor: "default",
                        position: "relative",
                      }}
                    >
                      <motion.span
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(255,69,58,0.4)",
                            "0 0 40px rgba(255,69,58,0.4)",
                            "0 0 0px rgba(255,69,58,0.4)",
                          ],
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          pointerEvents: "none",
                        }}
                      />
                      ●
                    </motion.button>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: 14,
                      fontSize: 12,
                      color: "var(--sch-tx-3)",
                    }}
                  >
                    {formatTime(seconds)} / {formatTime(MAX_DURATION_SEC)} max
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                    <motion.button
                      type="button"
                      onClick={stopRecording}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,69,58,0.3)",
                        background: "rgba(255,69,58,0.08)",
                        color: "#FF6B5E",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Stop recording ■
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {phase === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ textAlign: "center", padding: "12px 0" }}
                >
                  <ProcessingOrb />
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--sch-text)",
                    }}
                  >
                    Lara is listening…
                  </div>
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ marginTop: 6, fontSize: 13, color: TEXT2 }}
                  >
                    Transcribing your speech…
                  </motion.div>
                  <div style={{ marginTop: 2, fontSize: 12, color: "var(--sch-tx-3)" }}>
                    Then analysing your explanation.
                  </div>
                </motion.div>
              )}

              {phase === "results" && score && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--sch-text)",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    Your scores
                  </h2>

                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <ScoreCard label="Clarity" value={score.clarity} delay={0} />
                    <ScoreCard label="Accuracy" value={score.accuracy} delay={0.1} />
                    <ScoreCard label="Fluency" value={score.fluency} delay={0.2} />
                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--sch-text)",
                    }}
                  >
                    Overall:{" "}
                    <span style={iriText as CSSProperties}>{score.overall.toFixed(1)}</span>
                    <span style={{ color: TEXT2, fontWeight: 600, fontSize: 14 }}> / 10</span>
                  </div>
                  {trend && (
                    <div
                      style={{
                        marginTop: 6,
                        textAlign: "center",
                        fontSize: 13,
                        color: trend.delta >= 0 ? "#34D399" : "#FF6B5E",
                      }}
                    >
                      {trend.delta >= 0 ? "↑ +" : "↓ "}
                      {Math.abs(trend.delta).toFixed(1)} from last session
                    </div>
                  )}

                  {/* Lara feedback */}
                  <div
                    style={{
                      marginTop: 18,
                      padding: 16,
                      borderRadius: 14,
                      background: "rgba(200,0,0,0.08)",
                      border: "1px solid rgba(200,0,0,0.18)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(200,0,0,0.85)",
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Lara's feedback
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "var(--sch-tx-1)",
                        lineHeight: 1.65,
                        fontStyle: "italic",
                      }}
                    >
                      {score.feedback}
                    </div>
                  </div>

                  {/* Transcript */}
                  <button
                    type="button"
                    onClick={() => setShowTranscript((v) => !v)}
                    style={{
                      marginTop: 14,
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      color: TEXT2,
                      textAlign: "left",
                      padding: 0,
                    }}
                  >
                    Your transcript {showTranscript ? "▴" : "▾"}
                  </button>
                  <AnimatePresence initial={false}>
                    {showTranscript && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            marginTop: 8,
                            padding: 14,
                            borderRadius: 12,
                            background: "var(--sch-card)",
                            border: "1px solid var(--sch-border)",
                            fontSize: 13,
                            color: "var(--sch-tx-2)",
                            lineHeight: 1.7,
                            maxHeight: 150,
                            overflowY: "auto",
                          }}
                        >
                          {score.transcript ||
                            "(no transcript — add OPENAI_API_KEY to enable Whisper transcription)"}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div
                    style={{
                      marginTop: 22,
                      display: "flex",
                      gap: 10,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button type="button" onClick={handleRetry} style={ghostBtn}>
                      Try again
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleDone}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={primaryBtn}
                    >
                      Done ✓
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {phase === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--sch-text)",
                    }}
                  >
                    Something went wrong
                  </h2>
                  <p style={{ fontSize: 14, color: TEXT2, marginTop: 8, lineHeight: 1.6 }}>
                    {errorMsg || "Try again in a moment."}
                  </p>
                  <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                    <button type="button" onClick={handleClose} style={ghostBtn}>
                      Close
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleRetry}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={primaryBtn}
                    >
                      Try again
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const primaryBtn: CSSProperties = {
  padding: "10px 20px",
  borderRadius: 12,
  border: "none",
  background: IRIDESCENT,
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 20px rgba(200,0,0,0.3)",
}

const ghostBtn: CSSProperties = {
  padding: "10px 18px",
  borderRadius: 12,
  border: "1px solid var(--sch-border)",
  background: "transparent",
  color: "var(--sch-tx-1)",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
}
