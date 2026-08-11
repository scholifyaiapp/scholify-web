import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Icon, C, R } from "@/components/acca/ui"
import { applyOp, formatCalc, type CalcOp } from "@/lib/acca-kit"

/*
 * THE CALCULATOR, with a tape.
 *
 * ACCA's CBE gives candidates an on-screen calculator, and every learner
 * working through a variance or an NPV in Scholify currently reaches for their
 * phone — which is the moment the study session ends and the notifications
 * begin. Keeping it in the app is worth more than the arithmetic.
 *
 * ── WHY A TAPE ──────────────────────────────────────────────────
 * The specific pain in ACCA work is not the sum, it is losing the chain: you
 * compute a contribution, then a C/S ratio, then breakeven, and the number from
 * two steps ago is gone. Every completed calculation is kept, and tapping one
 * puts its result back in the display — so a multi-part working survives.
 *
 * Keyboard is fully wired because that is how anyone doing real work uses a
 * calculator, and the buttons carry aria-labels because "×" and "÷" are read
 * as unpronounceable symbols by a screen reader.
 */

const SANS = "'Plus Jakarta Sans', sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

interface TapeRow {
  id: number
  expression: string
  result: number
}

export default function KitCalculator() {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState("0")
  const [stored, setStored] = useState<number | null>(null)
  const [op, setOp] = useState<CalcOp | null>(null)
  /** True while the display still shows the previous result — the next digit replaces it. */
  const [fresh, setFresh] = useState(true)
  const [memory, setMemory] = useState(0)
  const [tape, setTape] = useState<TapeRow[]>([])
  const [error, setError] = useState(false)
  const tapeId = useRef(0)

  const current = () => Number(display.replace(/,/g, "")) || 0

  const reset = useCallback(() => {
    setDisplay("0"); setStored(null); setOp(null); setFresh(true); setError(false)
  }, [])

  const inputDigit = useCallback((d: string) => {
    setError(false)
    setDisplay((prev) => {
      if (fresh) return d === "." ? "0." : d
      if (d === "." && prev.includes(".")) return prev
      if (prev === "0" && d !== ".") return d
      // A hard cap stops the display overflowing its box on a long paste of digits.
      return prev.length >= 16 ? prev : prev + d
    })
    setFresh(false)
  }, [fresh])

  const commit = useCallback(() => {
    if (op === null || stored === null) return
    const b = current()
    const result = applyOp(stored, b, op)
    if (result === null || !Number.isFinite(result)) {
      setError(true); setDisplay("Cannot divide by zero"); setStored(null); setOp(null); setFresh(true)
      return
    }
    const expression = `${formatCalc(stored)} ${op} ${formatCalc(b)}`
    tapeId.current += 1
    setTape((t) => [{ id: tapeId.current, expression, result }, ...t].slice(0, 40))
    setDisplay(formatCalc(result))
    setStored(null); setOp(null); setFresh(true)
  }, [op, stored, display])

  const chooseOp = useCallback((next: CalcOp) => {
    setError(false)
    if (op !== null && stored !== null && !fresh) {
      // Chained: 2 + 3 × → resolve the pending step first, like any calculator.
      const result = applyOp(stored, current(), op)
      if (result === null) { setError(true); setDisplay("Cannot divide by zero"); setStored(null); setOp(null); setFresh(true); return }
      setStored(result); setDisplay(formatCalc(result))
    } else {
      setStored(current())
    }
    setOp(next); setFresh(true)
  }, [op, stored, fresh, display])

  const unary = useCallback((kind: "sqrt" | "square" | "inverse" | "percent" | "negate") => {
    setError(false)
    const v = current()
    let out: number | null = null
    if (kind === "sqrt") out = v < 0 ? null : Math.sqrt(v)
    if (kind === "square") out = v * v
    if (kind === "inverse") out = v === 0 ? null : 1 / v
    // Percent reads against the pending operand — 200 + 10% is 220, as on any
    // calculator, not 200 + 0.1.
    if (kind === "percent") out = stored !== null ? (stored * v) / 100 : v / 100
    if (kind === "negate") out = -v
    if (out === null || !Number.isFinite(out)) { setError(true); setDisplay("Error"); setFresh(true); return }
    setDisplay(formatCalc(out)); setFresh(true)
  }, [display, stored])

  const backspace = useCallback(() => {
    if (fresh || error) return
    setDisplay((p) => (p.length <= 1 ? "0" : p.slice(0, -1)))
  }, [fresh, error])

  /* Keyboard — this is how anyone doing real work uses a calculator. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      // Never hijack typing in the notes tab or a search box.
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      if (/^[0-9]$/.test(e.key)) { inputDigit(e.key); return }
      if (e.key === "." || e.key === ",") { inputDigit("."); return }
      if (e.key === "+") { chooseOp("+"); return }
      if (e.key === "-") { chooseOp("−"); return }
      if (e.key === "*" || e.key === "x") { chooseOp("×"); return }
      if (e.key === "/") { e.preventDefault(); chooseOp("÷"); return }
      if (e.key === "Enter" || e.key === "=") { e.preventDefault(); commit(); return }
      if (e.key === "Backspace") { backspace(); return }
      if (e.key === "Escape") reset()
      if (e.key === "%") unary("percent")
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [inputDigit, chooseOp, commit, backspace, reset, unary])

  const key = (label: string, onPress: () => void, opts: { tone?: "num" | "op" | "fn" | "eq"; wide?: boolean; aria?: string } = {}) => {
    const tone = opts.tone ?? "num"
    const bg = tone === "eq" ? C.brand : tone === "op" ? C.brandSoft : tone === "fn" ? C.card2 : C.card
    const fg = tone === "eq" ? "#fff" : tone === "op" ? C.brand : C.text
    return (
      <motion.button
        key={label}
        type="button"
        onClick={onPress}
        aria-label={opts.aria ?? label}
        whileTap={reduced ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          // 48px floor keeps every key past the touch-target minimum.
          minHeight: 52, gridColumn: opts.wide ? "span 2" : undefined,
          borderRadius: R.lg, border: `1px solid ${tone === "eq" ? "transparent" : C.border}`,
          background: bg, color: fg, cursor: "pointer",
          font: `${tone === "num" ? 650 : 750} 17px/1 ${SANS}`,
        }}
      >
        {label}
      </motion.button>
    )
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, alignItems: "start" }}>
      <div>
        {/* Display */}
        <div
          style={{
            borderRadius: R.xl, border: `1px solid ${error ? C.brand : C.border}`,
            background: C.card2, padding: "18px 16px", marginBottom: 12, textAlign: "right", overflow: "hidden",
          }}
          aria-live="polite"
        >
          <div style={{ font: `600 12px/1 ${MONO}`, color: C.faint, minHeight: 14 }}>
            {stored !== null && op ? `${formatCalc(stored)} ${op}` : memory !== 0 ? `M = ${formatCalc(memory)}` : ""}
          </div>
          <div style={{ font: `800 clamp(24px, 7vw, 34px)/1.15 ${MONO}`, color: error ? C.brand : C.text, marginTop: 8, wordBreak: "break-all" }}>
            {display}
          </div>
        </div>

        {/* Memory + functions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 8 }}>
          {key("MC", () => setMemory(0), { tone: "fn", aria: "Memory clear" })}
          {key("MR", () => { setDisplay(formatCalc(memory)); setFresh(true) }, { tone: "fn", aria: "Memory recall" })}
          {key("M+", () => setMemory((m) => m + current()), { tone: "fn", aria: "Memory add" })}
          {key("M−", () => setMemory((m) => m - current()), { tone: "fn", aria: "Memory subtract" })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 8 }}>
          {key("√", () => unary("sqrt"), { tone: "fn", aria: "Square root" })}
          {key("x²", () => unary("square"), { tone: "fn", aria: "Squared" })}
          {key("1/x", () => unary("inverse"), { tone: "fn", aria: "Reciprocal" })}
          {key("%", () => unary("percent"), { tone: "fn", aria: "Percent" })}
        </div>

        {/* Keypad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {key("AC", reset, { tone: "fn", aria: "All clear" })}
          {key("⌫", backspace, { tone: "fn", aria: "Backspace" })}
          {key("±", () => unary("negate"), { tone: "fn", aria: "Change sign" })}
          {key("÷", () => chooseOp("÷"), { tone: "op", aria: "Divide" })}

          {["7", "8", "9"].map((d) => key(d, () => inputDigit(d)))}
          {key("×", () => chooseOp("×"), { tone: "op", aria: "Multiply" })}

          {["4", "5", "6"].map((d) => key(d, () => inputDigit(d)))}
          {key("−", () => chooseOp("−"), { tone: "op", aria: "Subtract" })}

          {["1", "2", "3"].map((d) => key(d, () => inputDigit(d)))}
          {key("+", () => chooseOp("+"), { tone: "op", aria: "Add" })}

          {key("0", () => inputDigit("0"), { wide: true })}
          {key(".", () => inputDigit("."), { aria: "Decimal point" })}
          {key("=", commit, { tone: "eq", aria: "Equals" })}
        </div>
        <p style={{ font: `500 11.5px/1.5 ${SANS}`, color: C.faint, marginTop: 10 }}>
          Your keyboard works too — digits, + − * /, Enter to equal, Esc to clear.
        </p>
      </div>

      {/* ── The tape ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ font: `800 11px/1 ${SANS}`, letterSpacing: "0.1em", textTransform: "uppercase", color: C.faint }}>
            Tape
          </span>
          {tape.length > 0 && (
            <button
              type="button"
              onClick={() => setTape([])}
              style={{ background: "none", border: "none", font: `700 12px/1 ${SANS}`, color: C.faint, cursor: "pointer", minHeight: 32 }}
            >
              Clear
            </button>
          )}
        </div>

        {tape.length === 0 ? (
          <div style={{ borderRadius: R.lg, border: `1px dashed ${C.border}`, padding: "20px 16px", textAlign: "center" }}>
            <Icon name="notes" size={18} color={C.faint} />
            <p style={{ font: `500 12.5px/1.6 ${SANS}`, color: C.faint, margin: "8px 0 0" }}>
              Every calculation lands here. Tap one to bring its result back into the display —
              built for workings that run over several steps, which is most of them.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 6, maxHeight: 420, overflowY: "auto" }}>
            <AnimatePresence initial={false}>
              {tape.map((row) => (
                <motion.button
                  key={row.id}
                  type="button"
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: 12 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => { setDisplay(formatCalc(row.result)); setFresh(true); setError(false) }}
                  style={{
                    textAlign: "right", padding: "10px 12px", borderRadius: R.md,
                    border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", minHeight: 48,
                  }}
                  aria-label={`Reuse result ${formatCalc(row.result)}`}
                >
                  <div style={{ font: `500 11.5px/1 ${MONO}`, color: C.faint }}>{row.expression}</div>
                  <div style={{ font: `750 15px/1 ${MONO}`, color: C.text, marginTop: 4 }}>= {formatCalc(row.result)}</div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
