import { useEffect, useMemo, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Icon, C, SHADOW, type IconName } from "@/components/acca/ui"
import { examBlueprint } from "@/lib/acca-exam-structure"
import { addNote, getNotes, onNotesChange, type NoteContext } from "@/lib/acca-notes"

/*
 * The CBE toolbelt — what a candidate has at their elbow in the real
 * computer-based exam, available in every Scholify practice surface:
 *
 *   · Calculator      — the on-screen exam calculator (keyboard-friendly)
 *   · Formulae sheet  — exactly what ACCA provides for THIS paper (MA, PM,
 *                       FM, AFM sheets; TX/ATX rates note) — and an honest
 *                       "this exam gives you nothing" for the papers that
 *                       don't, because expecting a sheet in FR is a mistake
 *                       to fix in practice, not on exam day.
 *   · Notes           — capture a thought without leaving the question; it
 *                       lands in the Notes hub (/notes) tagged with where
 *                       you were.
 */

/* ── shared panel chrome ──────────────────────────────────────── */

function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 720 : false))
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 720)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return narrow
}

function ToolPanel({ title, icon, onClose, children, width = 320 }: { title: string; icon: IconName; onClose: () => void; children: ReactNode; width?: number }) {
  const narrow = useIsNarrow()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      drag={!narrow}
      dragMomentum={false}
      style={{
        position: "fixed",
        right: narrow ? 12 : 20,
        left: narrow ? 12 : undefined,
        bottom: narrow ? 148 : 92,
        width: narrow ? undefined : width,
        maxHeight: "min(62vh, 540px)",
        display: "flex",
        flexDirection: "column",
        background: "var(--sch-card, #fff)",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        boxShadow: "0 24px 60px -18px rgba(20,20,26,0.35)",
        zIndex: 60,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
          borderBottom: `1px solid ${C.border}`, background: "var(--sch-card2, #F4F1EC)",
          cursor: narrow ? "default" : "grab", userSelect: "none",
        }}
      >
        <Icon name={icon} size={15} color={C.brand} />
        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 800, color: C.text, letterSpacing: "0.02em" }}>{title}</span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4, display: "grid", placeItems: "center", color: C.soft }}
        >
          <Icon name="close" size={15} />
        </button>
      </div>
      <div style={{ overflowY: "auto" }}>{children}</div>
    </motion.div>
  )
}

/* ── the calculator ───────────────────────────────────────────── */

type CalcState = { display: string; acc: number | null; op: string | null; fresh: boolean; memory: number }
const CALC_INIT: CalcState = { display: "0", acc: null, op: null, fresh: true, memory: 0 }

function applyOp(a: number, b: number, op: string): number {
  if (op === "+") return a + b
  if (op === "-") return a - b
  if (op === "*") return a * b
  if (op === "/") return b === 0 ? NaN : a / b
  return b
}

function calcReduce(s: CalcState, key: string): CalcState {
  const cur = Number(s.display)
  if (/^[0-9]$/.test(key)) {
    if (s.fresh || s.display === "0") return { ...s, display: key, fresh: false }
    if (s.display.replace(/[-.]/g, "").length >= 12) return s
    return { ...s, display: s.display + key }
  }
  if (key === ".") {
    if (s.fresh) return { ...s, display: "0.", fresh: false }
    if (s.display.includes(".")) return s
    return { ...s, display: s.display + "." }
  }
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    const acc = s.acc !== null && s.op && !s.fresh ? applyOp(s.acc, cur, s.op) : s.acc !== null && s.fresh ? s.acc : cur
    return { ...s, acc, op: key, fresh: true, display: String(acc) }
  }
  if (key === "=") {
    if (s.acc === null || !s.op) return s
    const v = applyOp(s.acc, cur, s.op)
    return { ...s, display: String(Number.isFinite(v) ? roundDisplay(v) : NaN), acc: null, op: null, fresh: true }
  }
  if (key === "%") return { ...s, display: String(roundDisplay(cur / 100)), fresh: true }
  if (key === "sqrt") return { ...s, display: String(cur < 0 ? NaN : roundDisplay(Math.sqrt(cur))), fresh: true }
  if (key === "sq") return { ...s, display: String(roundDisplay(cur * cur)), fresh: true }
  if (key === "inv") return { ...s, display: String(cur === 0 ? NaN : roundDisplay(1 / cur)), fresh: true }
  if (key === "+/-") return { ...s, display: s.display.startsWith("-") ? s.display.slice(1) : s.display === "0" ? "0" : "-" + s.display }
  if (key === "ce") return { ...s, display: "0", fresh: true }
  if (key === "c") return { ...CALC_INIT, memory: s.memory }
  if (key === "m+") return { ...s, memory: s.memory + cur, fresh: true }
  if (key === "m-") return { ...s, memory: s.memory - cur, fresh: true }
  if (key === "mr") return { ...s, display: String(s.memory), fresh: true }
  if (key === "mc") return { ...s, memory: 0 }
  if (key === "back") {
    if (s.fresh) return s
    const next = s.display.length > 1 ? s.display.slice(0, -1) : "0"
    return { ...s, display: next === "-" ? "0" : next }
  }
  return s
}

function roundDisplay(v: number): number {
  return Math.round(v * 1e10) / 1e10
}

function CalculatorPanel({ onClose }: { onClose: () => void }) {
  const [s, setS] = useState<CalcState>(CALC_INIT)
  const press = (k: string) => setS((prev) => calcReduce(prev, k))

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const k = e.key
    if (/^[0-9]$/.test(k) || "+-*/.%".includes(k)) { press(k === "%" ? "%" : k); e.preventDefault() }
    else if (k === "Enter" || k === "=") { press("="); e.preventDefault() }
    else if (k === "Backspace") { press("back"); e.preventDefault() }
    else if (k === "Escape") { press("c"); e.preventDefault() }
  }

  const keyStyle = (accent?: "op" | "eq"): CSSProperties => ({
    padding: "11px 0", borderRadius: 10, fontSize: 14.5, fontWeight: 700, cursor: "pointer",
    border: `1px solid ${accent ? "transparent" : C.border}`,
    background: accent === "eq" ? C.brand : accent === "op" ? C.brandSoft : "var(--sch-card, #fff)",
    color: accent === "eq" ? "#fff" : accent === "op" ? C.brand : C.text,
    transition: "transform .08s ease",
  })

  const shown = Number.isNaN(Number(s.display)) ? "Error" : Number(s.display).toLocaleString("en-GB", { maximumFractionDigits: 10 })

  return (
    <ToolPanel title="Calculator" icon="calc" onClose={onClose} width={272}>
      <div tabIndex={0} onKeyDown={onKey} style={{ padding: 12, outline: "none" }}>
        <div
          style={{
            padding: "12px 14px", borderRadius: 12, background: "#14141A", color: "#fff",
            textAlign: "right", fontSize: 24, fontWeight: 750, fontVariantNumeric: "tabular-nums",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 10, position: "relative",
          }}
        >
          {s.memory !== 0 && <span style={{ position: "absolute", left: 10, top: 8, fontSize: 10, fontWeight: 800, color: "#F4A405" }}>M</span>}
          {s.op && <span style={{ position: "absolute", left: 10, bottom: 8, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{s.op}</span>}
          {shown}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {[
            ["mc", "MC"], ["mr", "MR"], ["m-", "M−"], ["m+", "M+"],
            ["c", "C"], ["ce", "CE"], ["back", "⌫"], ["/", "÷"],
            ["7", "7"], ["8", "8"], ["9", "9"], ["*", "×"],
            ["4", "4"], ["5", "5"], ["6", "6"], ["-", "−"],
            ["1", "1"], ["2", "2"], ["3", "3"], ["+", "+"],
            ["+/-", "±"], ["0", "0"], [".", "."], ["=", "="],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => press(k)}
              style={keyStyle(k === "=" ? "eq" : "+-*/".includes(k) && k.length === 1 ? "op" : undefined)}
              onMouseDown={(e) => e.preventDefault() /* keep keyboard focus on the pad */}
            >
              {label}
            </button>
          ))}
          {[
            ["sqrt", "√x"], ["sq", "x²"], ["inv", "1/x"], ["%", "%"],
          ].map(([k, label]) => (
            <button key={k} onClick={() => press(k)} style={keyStyle()} onMouseDown={(e) => e.preventDefault()}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 10.5, color: C.faint, textAlign: "center" }}>Type on your keyboard — Enter is “=”, Esc clears</div>
      </div>
    </ToolPanel>
  )
}

/* ── the formulae sheet ───────────────────────────────────────── */

const SHEETS: Record<string, { group: string; lines: string[] }[]> = {
  MA: [
    { group: "Economic order quantity", lines: ["EOQ = √( 2·C₀·D / Cₕ )", "EBQ = √( 2·C₀·D / (Cₕ·(1 − D/R)) )"] },
    { group: "Regression", lines: ["b = ( nΣxy − Σx·Σy ) / ( nΣx² − (Σx)² )", "a = ȳ − b·x̄", "y = a + bx"] },
    { group: "Correlation", lines: ["r = ( nΣxy − Σx·Σy ) / √( (nΣx² − (Σx)²)(nΣy² − (Σy)²) )"] },
  ],
  PM: [
    { group: "Demand & pricing", lines: ["P = a − bQ", "b = ΔP / ΔQ", "MR = a − 2bQ", "Profit max where MR = MC"] },
    { group: "Learning curve", lines: ["y = a·xᵇ", "b = log r / log 2", "y = cumulative average time per unit"] },
  ],
  FM: [
    { group: "Investment & returns", lines: ["P₀ = D₀(1+g) / (rₑ − g)   (dividend growth)", "E(rᵢ) = Rf + βᵢ·(E(rm) − Rf)   (CAPM)", "WACC = Σ(weight × cost) across equity and debt"] },
    { group: "Risk & gearing", lines: ["βa = βe · Ve / (Ve + Vd(1−T))  (+ debt beta term when given)", "Fisher: (1+i) = (1+r)(1+h)"] },
    { group: "Parity", lines: ["PPP: S₁ = S₀ × (1+hc)/(1+hb)", "IRP: F₀ = S₀ × (1+ic)/(1+ib)"] },
    { group: "Cash management", lines: ["Miller-Orr spread = 3·( ¾ × cost × variance / rate )^⅓", "Baumol: Q = √( 2·C₀·D / Cₕ )"] },
    { group: "Also provided", lines: ["Present value and annuity tables"] },
  ],
  AFM: [
    { group: "Provided in AFM", lines: ["The FM set plus: Black-Scholes (option pricing), put-call parity, Modigliani-Miller with tax, PV/annuity tables"] },
  ],
}

function FormulaSheetPanel({ paperId, onClose }: { paperId: string; onClose: () => void }) {
  const bp = examBlueprint(paperId)
  const sheet = SHEETS[paperId]
  return (
    <ToolPanel title={`Formulae — ${paperId}`} icon="formula" onClose={onClose} width={340}>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 12, color: bp?.providedInExam ? C.green : C.soft, fontWeight: 650, lineHeight: 1.5, marginBottom: sheet || bp?.providedInExam ? 12 : 0 }}>
          {bp?.providedInExam
            ? `✓ Provided in your real ${paperId} CBE: ${bp.providedInExam.replace(/ — provided on screen.*/, "")}`
            : `The real ${paperId} exam provides NO formulae sheet — formats, definitions and formulas must be memorised. Practising without one here is the honest rehearsal.`}
        </div>
        {sheet?.map((g) => (
          <div key={g.group} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: C.faint, marginBottom: 6 }}>{g.group}</div>
            <div style={{ display: "grid", gap: 5 }}>
              {g.lines.map((l) => (
                <div key={l} style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5, color: C.text, background: "var(--sch-card2, #F4F1EC)", borderRadius: 8, padding: "7px 10px", lineHeight: 1.45 }}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        ))}
        {(paperId === "TX" || paperId === "ATX") && (
          <div style={{ fontSize: 12, color: C.soft, lineHeight: 1.55 }}>
            In the real exam the tax rates and allowances panel is always on screen. Scholify questions state the rates you need inside the question (FA2024 basis), so you practise the METHOD — exactly what the examiner marks.
          </div>
        )}
      </div>
    </ToolPanel>
  )
}

/* ── quick notes ──────────────────────────────────────────────── */

function QuickNotesPanel({ paperId, area, context, onClose }: { paperId: string | null; area: string | null; context: NoteContext; onClose: () => void }) {
  const [body, setBody] = useState("")
  const [tick, setTick] = useState(0)
  useEffect(() => onNotesChange(() => setTick((t) => t + 1)), [])
  const recent = useMemo(() => getNotes().slice(0, 3), [tick])

  function save() {
    if (!body.trim()) return
    addNote({ paper: paperId, area, context, body })
    setBody("")
  }

  return (
    <ToolPanel title="Quick note" icon="notes" onClose={onClose} width={320}>
      <div style={{ padding: 12 }}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) save() }}
          placeholder={`Jot it down — saved to your notebook${paperId ? ` under ${paperId}` : ""}…`}
          rows={4}
          style={{
            width: "100%", boxSizing: "border-box", border: `1px solid ${C.border}`, borderRadius: 10,
            padding: 10, fontSize: 13.5, lineHeight: 1.5, resize: "vertical", fontFamily: "inherit",
            background: "var(--sch-bg, #FAFAF7)", color: C.text, outline: "none",
          }}
        />
        <button
          onClick={save}
          disabled={!body.trim()}
          style={{
            width: "100%", marginTop: 8, padding: "10px 0", borderRadius: 10, border: "none",
            background: body.trim() ? C.brand : "var(--sch-card2, #F4F1EC)", color: body.trim() ? "#fff" : C.faint,
            fontWeight: 800, fontSize: 13, cursor: body.trim() ? "pointer" : "default",
          }}
        >
          Save note
        </button>
        {recent.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em", color: C.faint, marginBottom: 6 }}>RECENT</div>
            <div style={{ display: "grid", gap: 6 }}>
              {recent.map((n) => (
                <div key={n.id} style={{ fontSize: 12, color: C.soft, background: "var(--sch-card2, #F4F1EC)", borderRadius: 8, padding: "7px 9px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <b style={{ color: C.text }}>{n.paper ?? "—"}</b> · {n.body}
                </div>
              ))}
            </div>
          </div>
        )}
        <Link to="/notes" style={{ display: "block", marginTop: 10, fontSize: 12.5, fontWeight: 700, color: C.brand, textDecoration: "none", textAlign: "center" }}>
          Open my notebook →
        </Link>
      </div>
    </ToolPanel>
  )
}

/* ── the dock ─────────────────────────────────────────────────── */

export default function CbeToolsDock({ paperId, area = null, context = "practice" }: { paperId: string | null; area?: string | null; context?: NoteContext }) {
  const [open, setOpen] = useState<"calc" | "formula" | "notes" | null>(null)
  const narrow = useIsNarrow()
  const toggle = (which: "calc" | "formula" | "notes") => setOpen((o) => (o === which ? null : which))

  const dockBtn = (which: "calc" | "formula" | "notes", icon: IconName, label: string) => (
    <motion.button
      key={which}
      onClick={() => toggle(which)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={label}
      title={label}
      style={{
        width: 44, height: 44, borderRadius: 14, cursor: "pointer",
        border: `1px solid ${open === which ? C.brand : C.border}`,
        background: open === which ? C.brand : "var(--sch-card, #fff)",
        color: open === which ? "#fff" : C.soft,
        display: "grid", placeItems: "center",
        boxShadow: SHADOW.sm,
      }}
    >
      <Icon name={icon} size={19} color={open === which ? "#fff" : C.soft} />
    </motion.button>
  )

  return (
    <>
      <AnimatePresence>
        {open === "calc" && <CalculatorPanel key="calc" onClose={() => setOpen(null)} />}
        {open === "formula" && paperId && <FormulaSheetPanel key="formula" paperId={paperId} onClose={() => setOpen(null)} />}
        {open === "notes" && <QuickNotesPanel key="notes" paperId={paperId} area={area} context={context} onClose={() => setOpen(null)} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          right: narrow ? 12 : 20,
          bottom: narrow ? "calc(88px + env(safe-area-inset-bottom))" : 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 55,
        }}
      >
        {dockBtn("calc", "calc", "Calculator")}
        {paperId && dockBtn("formula", "formula", "Formulae sheet")}
        {dockBtn("notes", "notes", "Quick note")}
      </motion.div>
    </>
  )
}

/* ── the official structure card (Exam room) ──────────────────── */

export function CbeBlueprintCard({ paperId }: { paperId: string }) {
  const bp = examBlueprint(paperId)
  if (!bp) return null
  const h = Math.floor(bp.durationMin / 60)
  const m = bp.durationMin % 60
  return (
    <div style={{ background: "var(--sch-card, #fff)", border: `1px solid ${C.border}`, borderRadius: 18, padding: 18, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.08em", color: C.faint }}>
          YOUR REAL {paperId} EXAM — OFFICIAL CBE STRUCTURE
        </span>
        <span style={{ fontSize: 12, fontWeight: 800, color: C.brand, fontVariantNumeric: "tabular-nums" }}>
          {h}h{m ? ` ${m}m` : ""} · 100 marks
        </span>
      </div>
      <div style={{ display: "grid", gap: 7 }}>
        {bp.sections.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "grid", placeItems: "center",
                fontSize: 12, fontWeight: 800,
                background: s.kind === "constructed" ? C.brandSoft : "var(--sch-card2, #F4F1EC)",
                color: s.kind === "constructed" ? C.brand : C.soft,
              }}
            >
              {s.id}
            </span>
            <span style={{ flex: 1, fontSize: 13, color: C.text, lineHeight: 1.4 }}>{s.makeup}</span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: C.soft, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{s.marks}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${C.border}`, display: "grid", gap: 5 }}>
        <div style={{ fontSize: 12, color: bp.providedInExam ? C.green : C.faint, lineHeight: 1.5 }}>
          {bp.providedInExam ? `Provided on screen: ${bp.providedInExam.replace(/ — provided on screen.*/, "")}` : "Nothing is provided on screen — no formulae sheet in this exam."}
        </div>
        <div style={{ fontSize: 12, color: C.soft, lineHeight: 1.55, fontStyle: "italic" }}>{bp.tutorNote}</div>
      </div>
    </div>
  )
}
