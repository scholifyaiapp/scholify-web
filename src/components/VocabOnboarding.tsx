import { useCallback, useMemo, useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { addDays, format } from "date-fns"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import LaraAvatar from "@/components/LaraAvatar"
import LaraOrb from "@/components/LaraOrb"
import { useToast } from "@/components/Toast"
import {
  createDeck,
  type VocabDeck,
  type NewWordInput,
} from "@/lib/vocab"
import { TARGET_LANGUAGES, NATIVE_LANGUAGES, languageLabel, languageFlag } from "@/lib/vocab-content"
import { generateVocab } from "@/lib/vocab-api"
import { FLUENCY_WORDS } from "@/lib/fluency"
import {
  buildPlacementTest,
  estimateLevel,
  CEFR_LEVELS,
  type CefrLevel,
  type PlacementItem,
} from "@/lib/placement"
import BringYourOwnContent from "@/components/BringYourOwnContent"

/*
 * Guided onboarding: target language → native language → daily pace →
 * level (a ~90s placement test, or pick manually) → Lara builds the deck →
 * a "waww" plan reveal (your level + a 30-day plan + projected fluency date).
 * Works on web + mobile. Falls back gracefully with no API key.
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"

const DAILY_OPTIONS = [5, 10, 15]
const GOALS = [
  { id: "career", label: "Career", icon: "💼" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "conversation", label: "Conversation", icon: "💬" },
  { id: "exam", label: "Exam prep", icon: "🎓" },
]

type Step = "target" | "native" | "daily" | "level" | "test" | "building" | "plan"

export default function VocabOnboarding({
  appLang,
  onComplete,
}: {
  appLang: "en" | "ru"
  onComplete: (deck: VocabDeck) => void
}) {
  const { toast } = useToast()
  const [step, setStep] = useState<Step>("target")

  const [target, setTarget] = useState<{ code: string; label: string } | null>(null)
  const [native, setNative] = useState<string>(appLang)
  const [daily, setDaily] = useState(10)
  const [customDaily, setCustomDaily] = useState("10")
  const [goal, setGoal] = useState("career")
  const [level, setLevel] = useState<CefrLevel>("A2")

  const [items, setItems] = useState<PlacementItem[]>([])
  const [testIdx, setTestIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [answers, setAnswers] = useState<{ level: CefrLevel; correct: boolean }[]>([])
  const [loadingTest, setLoadingTest] = useState(false)

  const [builtDeck, setBuiltDeck] = useState<VocabDeck | null>(null)
  const [byoOpen, setByoOpen] = useState(false)

  const goalLabel = GOALS.find((g) => g.id === goal)?.label

  /* ── Build the deck (after level is known) ── */
  const build = useCallback(
    async (lvl: CefrLevel) => {
      if (!target) return
      setStep("building")
      try {
        const words = await generateVocab({
          target: target.code,
          targetLabel: target.label,
          native,
          nativeLabel: languageLabel(native),
          goal: goalLabel,
          level: lvl,
          count: 24,
        })
        const deck = createDeck({
          targetLanguage: target.code,
          targetLanguageLabel: target.label,
          nativeLanguage: native,
          goal: goalLabel,
          level: lvl,
          dailyNewWords: daily,
          words,
        })
        setBuiltDeck(deck)
        setStep("plan")
      } catch {
        toast.error("Couldn't build your plan. Try again.")
        setStep("level")
      }
    },
    [target, native, goalLabel, daily, toast],
  )

  /* ── Start the placement test ── */
  const startTest = useCallback(async () => {
    if (!target) return
    setLoadingTest(true)
    const built = await buildPlacementTest({
      target: target.code,
      targetLabel: target.label,
      native,
      nativeLabel: languageLabel(native),
    })
    setLoadingTest(false)
    if (built.length === 0) {
      toast.info("Quick test isn't available right now — pick your level below.")
      return
    }
    setItems(built)
    setTestIdx(0)
    setPicked(null)
    setAnswers([])
    setStep("test")
  }, [target, native, toast])

  const answerTest = (option: string) => {
    if (picked) return
    const item = items[testIdx]
    const correct = option === item.translation
    setPicked(option)
    const nextAnswers = [...answers, { level: item.level, correct }]
    setAnswers(nextAnswers)
    window.setTimeout(() => {
      if (testIdx + 1 < items.length) {
        setTestIdx((i) => i + 1)
        setPicked(null)
      } else {
        const est = estimateLevel(nextAnswers)
        setLevel(est)
        void build(est)
      }
    }, 700)
  }

  const skipTestItem = () => {
    if (picked) return
    answerTest("__idk__") // counts as incorrect
  }

  /* ── BYO branch ── */
  if (byoOpen && target) {
    return (
      <BringYourOwnContent
        targetLanguage={target.code}
        targetLabel={target.label}
        nativeLanguage={native}
        defaultLevel={level}
        onAdded={(words: NewWordInput[]) => {
          const deck = createDeck({
            targetLanguage: target.code,
            targetLanguageLabel: target.label,
            nativeLanguage: native,
            goal: goalLabel,
            level,
            dailyNewWords: daily,
            words,
          })
          onComplete(deck)
        }}
        onClose={() => setByoOpen(false)}
      />
    )
  }

  const stepIndex = ["target", "native", "daily", "level"].indexOf(step)

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 40 }}>
      {/* Progress dots (hidden during test/building/plan) */}
      {stepIndex >= 0 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 6, marginBottom: 8 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: i === stepIndex ? 22 : 7,
                height: 7,
                borderRadius: 999,
                background: i <= stepIndex ? IRIDESCENT : "var(--sch-hairline)",
                transition: "width .3s",
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── STEP: target language ── */}
        {step === "target" && (
          <StepWrap key="target">
            <Lara />
            <Title>Learn the words you'll actually use</Title>
            <Sub>Which language do you want to learn?</Sub>
            <LangGrid
              langs={TARGET_LANGUAGES}
              onPick={(code, label) => {
                setTarget({ code, label })
                // Default native ≠ target.
                setNative(appLang === code ? (appLang === "en" ? "ru" : "en") : appLang)
                setStep("native")
              }}
            />
            <TextLink onClick={() => setByoOpen(true)} hint={!target}>
              Tip: pick a language first, then you can paste your own text too →
            </TextLink>
          </StepWrap>
        )}

        {/* ── STEP: native language ── */}
        {step === "native" && (
          <StepWrap key="native">
            <Lara />
            <Title>Explain new words in…</Title>
            <Sub>Your strongest language — meanings and examples appear in it.</Sub>
            <LangGrid
              langs={NATIVE_LANGUAGES}
              active={native}
              onPick={(code) => {
                setNative(code)
                setStep("daily")
              }}
            />
            <BackLink onClick={() => setStep("target")} />
          </StepWrap>
        )}

        {/* ── STEP: daily pace ── */}
        {step === "daily" && (
          <StepWrap key="daily">
            <Lara />
            <Title>How many new words a day?</Title>
            <Sub>You can change this anytime. Consistency beats volume.</Sub>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 22 }}>
              {DAILY_OPTIONS.map((n) => (
                <PaceCard
                  key={n}
                  n={n}
                  active={daily === n}
                  onClick={() => {
                    setDaily(n)
                    setCustomDaily(String(n))
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, justifyContent: "center" }}>
              <span style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>Custom:</span>
              <input
                type="number"
                min={1}
                max={50}
                value={customDaily}
                onChange={(e) => {
                  setCustomDaily(e.target.value)
                  const v = Math.max(1, Math.min(50, Number(e.target.value) || 1))
                  setDaily(v)
                }}
                aria-label="Custom words per day"
                style={numInput}
              />
              <span style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>words</span>
            </div>
            <PrimaryBtn label="Continue →" onClick={() => setStep("level")} />
            <BackLink onClick={() => setStep("native")} />
          </StepWrap>
        )}

        {/* ── STEP: level (test or manual) ── */}
        {step === "level" && (
          <StepWrap key="level">
            <Lara />
            <Title>What's your level?</Title>
            <Sub>Take a 90-second check so Lara picks the right words — or set it yourself.</Sub>

            <motion.button
              type="button"
              onClick={startTest}
              disabled={loadingTest}
              whileHover={loadingTest ? undefined : { scale: 1.01, y: -2 }}
              whileTap={loadingTest ? undefined : { scale: 0.99 }}
              style={{
                width: "100%",
                marginTop: 22,
                display: "flex",
                alignItems: "center",
                gap: 14,
                textAlign: "left",
                padding: 18,
                borderRadius: 18,
                cursor: "pointer",
                background: "rgba(200,0,0,0.07)",
                border: "1px solid rgba(200,0,0,0.4)",
                boxShadow: "0 0 24px rgba(200,0,0,0.06)",
                opacity: loadingTest ? 0.7 : 1,
              }}
            >
              <span style={{ fontSize: 26 }}>🎯</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 15.5, fontWeight: 800, color: TEXT }}>
                  {loadingTest ? "Preparing your test…" : "Take the 90-second level check"}
                </span>
                <span style={{ display: "block", fontSize: 12.5, color: MUTED, marginTop: 2 }}>
                  12 quick words — tap what you know.
                </span>
              </span>
              <span style={{ fontSize: 18, color: "#7C3AED" }}>→</span>
            </motion.button>

            <div style={{ textAlign: "center", fontSize: 12.5, color: DIM, margin: "18px 0 10px", fontWeight: 600 }}>
              or set it yourself
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {CEFR_LEVELS.map((lv) => (
                <button
                  key={lv}
                  type="button"
                  onClick={() => {
                    setLevel(lv)
                    void build(lv)
                  }}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: level === lv ? "#fff" : MUTED,
                    background: level === lv ? IRIDESCENT : "var(--sch-card)",
                    border: `1px solid ${level === lv ? "transparent" : "var(--sch-border)"}`,
                    padding: "10px 18px",
                    borderRadius: 999,
                    cursor: "pointer",
                  }}
                >
                  {lv}
                </button>
              ))}
            </div>
            <BackLink onClick={() => setStep("daily")} />
          </StepWrap>
        )}

        {/* ── STEP: placement test ── */}
        {step === "test" && items[testIdx] && (
          <StepWrap key="test">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--sch-hairline)", overflow: "hidden" }}>
                <motion.div
                  animate={{ width: `${Math.round(((testIdx + 1) / items.length) * 100)}%` }}
                  transition={{ duration: 0.4 }}
                  style={{ height: "100%", background: IRIDESCENT }}
                />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>
                {testIdx + 1}/{items.length}
              </span>
            </div>

            <div style={{ textAlign: "center", margin: "26px 0 8px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a78bd6" }}>
                What does this mean?
              </div>
              <div style={{ fontSize: "clamp(26px,7vw,36px)", fontWeight: 800, color: TEXT, letterSpacing: "-0.6px", marginTop: 10 }}>
                {items[testIdx].term}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {items[testIdx].options.map((opt) => {
                const isAnswer = opt === items[testIdx].translation
                const isPicked = picked === opt
                const reveal = picked != null
                const bg = reveal && isAnswer ? "rgba(52,211,153,0.16)" : isPicked ? "rgba(255,107,94,0.16)" : "var(--sch-card)"
                const bd = reveal && isAnswer ? "#34D399" : isPicked ? "#FF6B5E" : "var(--sch-border)"
                return (
                  <motion.button
                    key={opt}
                    type="button"
                    onClick={() => answerTest(opt)}
                    whileTap={picked ? undefined : { scale: 0.98 }}
                    style={{
                      width: "100%",
                      minHeight: 52,
                      padding: "14px 18px",
                      borderRadius: 14,
                      textAlign: "left",
                      fontSize: 15,
                      fontWeight: 600,
                      color: TEXT,
                      background: bg,
                      border: `1.5px solid ${bd}`,
                      cursor: picked ? "default" : "pointer",
                    }}
                  >
                    {opt}
                    {reveal && isAnswer && <span style={{ marginLeft: 8 }}>✓</span>}
                  </motion.button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={skipTestItem}
              disabled={picked != null}
              style={{
                marginTop: 14,
                width: "100%",
                background: "transparent",
                border: "none",
                color: DIM,
                fontSize: 13.5,
                fontWeight: 700,
                cursor: picked ? "default" : "pointer",
                padding: 8,
              }}
            >
              I don't know this word
            </button>
          </StepWrap>
        )}

        {/* ── STEP: building ── */}
        {step === "building" && (
          <StepWrap key="building" center>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LaraOrb size={104} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginTop: 24, letterSpacing: "-0.4px" }}>
              Building your {target?.label} plan…
            </h2>
            <p style={{ fontSize: 14, color: MUTED, marginTop: 8 }}>Choosing the words that matter most for you.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 26 }}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.25, 1, 0.25], y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                  style={{ width: 9, height: 9, borderRadius: 999, background: "#C80000" }}
                />
              ))}
            </div>
          </StepWrap>
        )}

        {/* ── STEP: plan reveal (waww) ── */}
        {step === "plan" && builtDeck && (
          <PlanReveal key="plan" deck={builtDeck} level={level} daily={daily} onStart={() => onComplete(builtDeck)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Plan reveal ─────────────────────────────────────────────── */

function PlanReveal({
  deck,
  level,
  daily,
  onStart,
}: {
  deck: VocabDeck
  level: CefrLevel
  daily: number
  onStart: () => void
}) {
  const monthWords = daily * 30
  // Days to fluency at this pace, shown as a target month.
  const fluencyDate = useMemo(() => {
    const remaining = Math.max(0, FLUENCY_WORDS - deck.words.filter((w) => w.status !== "new").length)
    const days = Math.ceil(remaining / Math.max(1, daily))
    return addDays(new Date(), days)
  }, [deck, daily])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center", paddingTop: 8 }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LaraOrb size={72} />
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.15 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          marginTop: 16,
          padding: "10px 22px",
          borderRadius: 999,
          background: "rgba(200,0,0,0.06)",
          border: "1px solid rgba(200,0,0,0.4)",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>Your level</span>
        <span style={{ fontSize: 22, fontWeight: 900, color: "#7C3AED", letterSpacing: "-0.5px" }}>{level}</span>
      </motion.div>

      <h2 style={{ fontSize: 26, fontWeight: 800, color: TEXT, letterSpacing: "-0.6px", marginTop: 20, lineHeight: 1.2 }}>
        Your plan is ready, {deck.targetLanguageLabel} learner
      </h2>
      <p style={{ fontSize: 14, color: MUTED, marginTop: 8 }}>Here's what the next month looks like.</p>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginTop: 22, textAlign: "left" }}>
        <PlanStat big={`${daily}`} unit="words / day" sub="your daily habit" />
        <PlanStat big={`${monthWords}`} unit="words in 30 days" sub="if you show up daily" />
      </div>

      <div
        style={{
          marginTop: 12,
          padding: 20,
          borderRadius: 20,
          background: "var(--sch-card)",
          border: "1px solid rgba(200,0,0,0.25)",
          boxShadow: "0 0 50px rgba(200,0,0,0.06)",
          textAlign: "left",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a78bd6" }}>
          The 1% compound path
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: TEXT, marginTop: 8, lineHeight: 1.4 }}>
          On pace for conversational fluency by{" "}
          <span style={{ color: "#7C3AED" }}>{format(fluencyDate, "MMMM yyyy")}</span>
        </div>
        <MiniCurve />
        <div style={{ fontSize: 12.5, color: MUTED, marginTop: 4 }}>
          {FLUENCY_WORDS.toLocaleString()} words ≈ 90% of everyday speech. Every day compounds.
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          height: 56,
          marginTop: 24,
          borderRadius: 16,
          border: "none",
          background: IRIDESCENT,
          color: "#fff",
          fontSize: 17,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 10px 26px -6px rgba(124,58,237,0.5)",
        }}
      >
        Start learning →
      </motion.button>
    </motion.div>
  )
}

function MiniCurve() {
  return (
    <svg viewBox="0 0 320 80" width="100%" height="64" preserveAspectRatio="none" style={{ display: "block", margin: "12px 0 4px", overflow: "visible" }} aria-hidden>
      <defs>
        <linearGradient id="ob-curve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C80000" />
          <stop offset="1" stopColor="#F4A405" />
        </linearGradient>
        <linearGradient id="ob-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(200,0,0,0.2)" />
          <stop offset="1" stopColor="rgba(200,0,0,0)" />
        </linearGradient>
      </defs>
      <path d="M4,74 C120,72 200,66 250,52 C285,42 305,24 316,6 L316,78 L4,78 Z" fill="url(#ob-fill)" />
      <motion.path
        d="M4,74 C120,72 200,66 250,52 C285,42 305,24 316,6"
        fill="none"
        stroke="url(#ob-curve)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
      <circle cx="20" cy="73" r="4.5" fill="#7C3AED" stroke="var(--sch-card)" strokeWidth="2" />
    </svg>
  )
}

function PlanStat({ big, unit, sub }: { big: string; unit: string; sub: string }) {
  return (
    <div style={{ padding: "16px 18px", borderRadius: 16, background: "var(--sch-card)", border: "1px solid var(--sch-border)" }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#7C3AED", letterSpacing: "-0.5px" }}>{big}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginTop: 2 }}>{unit}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{sub}</div>
    </div>
  )
}

/* ── Shared step bits ────────────────────────────────────────── */

function StepWrap({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: center ? "center" : "left", paddingTop: center ? 70 : 10 }}
    >
      {children}
    </motion.div>
  )
}

function Lara() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <LaraAvatar size={56} />
      </motion.div>
    </div>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ fontSize: 26, fontWeight: 800, color: TEXT, textAlign: "center", letterSpacing: "-0.6px", lineHeight: 1.2, margin: 0 }}>
      {children}
    </h1>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14.5, color: MUTED, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>{children}</p>
  )
}

function LangGrid({
  langs,
  active,
  onPick,
}: {
  langs: { code: string; label: string; flag: string }[]
  active?: string
  onPick: (code: string, label: string) => void
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginTop: 22 }}>
      {langs.map((l, i) => (
        <motion.button
          key={l.code}
          type="button"
          onClick={() => onPick(l.code, l.label)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 * i, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 16px",
            borderRadius: 16,
            cursor: "pointer",
            background: active === l.code ? "rgba(200,0,0,0.06)" : "var(--sch-card)",
            border: `1px solid ${active === l.code ? "rgba(200,0,0,0.5)" : "var(--sch-border)"}`,
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: 28 }}>{languageFlag(l.code)}</span>
          <span style={{ fontSize: 15.5, fontWeight: 700, color: TEXT }}>{l.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

function PaceCard({ n, active, onClick }: { n: number; active: boolean; onClick: () => void }) {
  const label = n === 5 ? "Relaxed" : n === 10 ? "Steady" : "Intense"
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        padding: "18px 12px",
        borderRadius: 16,
        cursor: "pointer",
        background: active ? "rgba(200,0,0,0.06)" : "var(--sch-card)",
        border: `1px solid ${active ? "rgba(200,0,0,0.5)" : "var(--sch-border)"}`,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 900, color: active ? "#7C3AED" : TEXT, letterSpacing: "-0.5px" }}>{n}</div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: MUTED, marginTop: 2 }}>{label}</div>
    </motion.button>
  )
}

function PrimaryBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: "100%",
        height: 54,
        marginTop: 24,
        borderRadius: 14,
        border: "none",
        background: IRIDESCENT,
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 10px 26px -6px rgba(124,58,237,0.5)",
      }}
    >
      {label}
    </motion.button>
  )
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ textAlign: "center", marginTop: 18 }}>
      <button type="button" onClick={onClick} style={{ background: "none", border: "none", color: DIM, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
        ← Back
      </button>
    </div>
  )
}

function TextLink({ onClick, children, hint }: { onClick: () => void; children: React.ReactNode; hint?: boolean }) {
  return (
    <div style={{ textAlign: "center", marginTop: 18 }}>
      <button
        type="button"
        onClick={hint ? undefined : onClick}
        style={{
          background: "none",
          border: "none",
          color: hint ? DIM : "#7C3AED",
          fontSize: 13,
          fontWeight: 600,
          cursor: hint ? "default" : "pointer",
        }}
      >
        {children}
      </button>
    </div>
  )
}

const numInput: CSSProperties = {
  width: 80,
  height: 44,
  textAlign: "center",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 700,
  color: "var(--sch-text)",
  background: "var(--sch-card)",
  border: "1px solid var(--sch-border)",
  outline: "none",
}
