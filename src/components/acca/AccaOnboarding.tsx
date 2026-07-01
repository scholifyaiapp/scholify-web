import { useState, type CSSProperties } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IRIDESCENT } from "@/components/auth/auth-ui"
import { iriText } from "@/components/dashboard-layout"
import { getPapers } from "@/lib/acca"

/*
 * First-run welcome for /study. Three quick steps — value → pick a paper →
 * set an exam date — then straight into the paper. Shown once (the parent
 * tracks the localStorage flag).
 */

const TEXT = "var(--sch-text)"
const MUTED = "var(--sch-tx-2)"
const DIM = "var(--sch-tx-3)"
const CARD = "var(--sch-card)"
const BORDER = "var(--sch-border)"

function card(extra?: CSSProperties): CSSProperties {
  return { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 20, ...extra }
}

export default function AccaOnboarding({
  onDone,
}: {
  onDone: (paperId: string, examDate: string | null) => void
}) {
  const papers = getPapers()
  const [step, setStep] = useState(0)
  const [paperId, setPaperId] = useState<string | null>(null)
  const [examDate, setExamDate] = useState("")

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 12 }}>
      {/* progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 28 }}>
        {[0, 1, 2].map((s) => (
          <div key={s} style={{ width: s === step ? 22 : 7, height: 7, borderRadius: 999, background: s <= step ? "transparent" : "var(--sch-card-2)", backgroundImage: s <= step ? IRIDESCENT : undefined, transition: "width .2s" }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🎓</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT, margin: "0 0 10px" }}>
              Pass ACCA with an <span style={iriText}>AI coach</span>
            </h1>
            <p style={{ color: MUTED, fontSize: 15.5, lineHeight: 1.6, margin: "0 0 28px" }}>
              Practise real exam-style questions with instant marking, get any answer explained by Lara,
              sit timed mocks, and have your written answers marked against the examiner's rubric — all in one place.
            </p>
            <PrimaryBtn onClick={() => setStep(1)}>Get started</PrimaryBtn>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <h2 style={{ fontSize: 23, fontWeight: 800, color: TEXT, margin: "0 0 4px", textAlign: "center" }}>Which paper are you studying?</h2>
            <p style={{ color: MUTED, fontSize: 14, textAlign: "center", margin: "0 0 22px" }}>You can switch or add papers any time.</p>
            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {papers.map((p) => {
                const selected = paperId === p.id
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setPaperId(p.id)}
                    style={{ ...card({ cursor: "pointer", textAlign: "left", border: `1.5px solid ${selected ? "#A78BFA" : BORDER}` }), display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: IRIDESCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", flexShrink: 0 }}>{p.id}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 750, fontSize: 15.5, color: TEXT }}>{p.name}</div>
                      <div style={{ color: DIM, fontSize: 12.5 }}>{p.code} · {p.level}</div>
                    </div>
                    {selected && <span style={{ color: "#A78BFA", fontWeight: 800 }}>✓</span>}
                  </motion.button>
                )
              })}
            </div>
            <PrimaryBtn disabled={!paperId} onClick={() => setStep(2)}>Continue</PrimaryBtn>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>📅</div>
            <h2 style={{ fontSize: 23, fontWeight: 800, color: TEXT, margin: "0 0 6px" }}>When's your exam?</h2>
            <p style={{ color: MUTED, fontSize: 14.5, lineHeight: 1.55, margin: "0 0 22px" }}>
              We'll count down the days and pace your study plan. Optional — you can set it later.
            </p>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              style={{ padding: "13px 16px", borderRadius: 12, border: `1px solid ${BORDER}`, background: "var(--sch-bg)", color: TEXT, fontSize: 15, marginBottom: 24, colorScheme: "dark light" }}
            />
            <PrimaryBtn onClick={() => paperId && onDone(paperId, examDate || null)}>
              Start studying →
            </PrimaryBtn>
            <button onClick={() => paperId && onDone(paperId, null)} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", color: DIM, fontSize: 14, cursor: "pointer" }}>
              Skip for now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PrimaryBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      disabled={disabled}
      onClick={onClick}
      style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", background: disabled ? "var(--sch-card-2)" : IRIDESCENT, color: disabled ? DIM : "#fff", fontWeight: 750, fontSize: 16, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {children}
    </motion.button>
  )
}
