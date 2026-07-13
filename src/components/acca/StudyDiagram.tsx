import { motion, useReducedMotion } from "motion/react"
import { C, R } from "@/components/acca/ui"
import type { Diagram } from "@/lib/acca-study-content"

/*
 * StudyDiagram — the visual layer of the rich study chapters. Renders each
 * DiagramType with tasteful SVG / CSS-3D depth and motion, on the ACCA light
 * palette. Data shapes are documented on the Diagram interface. Unknown types
 * degrade to the caption so a chapter never breaks.
 */

const PALETTE = [C.brand, C.amber, "#B5179E", C.green, "#3A6EA5", "#7C6BD6"]
const fmt = (n: number) => (Math.abs(n) >= 1000 ? n.toLocaleString("en-GB") : String(n))

export function StudyDiagram({ diagram }: { diagram: Diagram }) {
  const reduce = useReducedMotion()
  const anim = reduce ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.5 } }
  return (
    <motion.figure {...anim} style={{ margin: "22px 0", padding: 0 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: R.xl ?? 18, padding: "18px 18px 16px", boxShadow: "0 1px 2px rgba(20,20,26,0.03)" }}>
        {diagram.title && <div style={{ fontSize: 12.5, fontWeight: 800, color: C.text, marginBottom: 14, letterSpacing: "-0.01em" }}>{diagram.title}</div>}
        <Body diagram={diagram} reduce={!!reduce} />
      </div>
      {diagram.caption && <figcaption style={{ fontSize: 11.5, color: C.faint, marginTop: 8, lineHeight: 1.5 }}>{diagram.caption}</figcaption>}
    </motion.figure>
  )
}

function Body({ diagram, reduce }: { diagram: Diagram; reduce: boolean }) {
  const d = diagram.data as any
  const arr = (k: string) => Array.isArray(d?.[k]) && d[k].length > 0
  const fallback = <div style={{ fontSize: 12.5, color: C.muted }}>{diagram.caption ?? diagram.title ?? "Diagram"}</div>
  try {
    switch (diagram.type) {
      case "scale": return d?.assets != null ? <Scale d={d} /> : fallback
      case "tAccount": return arr("debits") || arr("credits") ? <TAccount d={{ name: d.name ?? "", debits: d.debits ?? [], credits: d.credits ?? [] }} /> : fallback
      case "radial": return arr("nodes") ? <Radial d={d} /> : fallback
      case "compare": return arr("rows") ? <Compare d={d} /> : fallback
      case "cards": return arr("items") ? <Cards d={d} reduce={reduce} /> : fallback
      case "flow": return arr("steps") ? <Flow d={d} /> : fallback
      case "cycle": return arr("steps") ? <Cycle d={d} /> : fallback
      case "waterfall": return arr("items") ? <Waterfall d={d} /> : fallback
      case "bars": return arr("items") ? <Bars d={d} /> : fallback
      case "donut": return arr("items") ? <Donut d={d} /> : fallback
      case "pyramid": return arr("levels") ? <Pyramid d={d} /> : fallback
      case "timeline": return arr("points") ? <Timeline d={d} /> : fallback
      default: return fallback
    }
  } catch {
    return fallback
  }
}

/* ── Accounting equation balance ──────────────────────────────── */
function Scale({ d }: { d: { assets: string; liabilities: string; equity: string } }) {
  const Pan = ({ label, val, tint }: { label: string; val: string; tint: string }) => (
    <div style={{ flex: 1, minWidth: 90, textAlign: "center", padding: "16px 12px", borderRadius: 14, background: `${tint}14`, border: `1.5px solid ${tint}`, transform: "perspective(600px) rotateX(6deg)" }}>
      <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: tint }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginTop: 6, fontVariantNumeric: "tabular-nums" }}>{val}</div>
    </div>
  )
  const Op = ({ s }: { s: string }) => <div style={{ fontSize: 24, fontWeight: 800, color: C.faint, flex: "none", padding: "0 2px" }}>{s}</div>
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <Pan label="Assets" val={d.assets} tint={C.brand} />
      <Op s="=" />
      <Pan label="Liabilities" val={d.liabilities} tint={C.amber} />
      <Op s="+" />
      <Pan label="Equity" val={d.equity} tint={C.green} />
    </div>
  )
}

/* ── T-account ────────────────────────────────────────────────── */
function TAccount({ d }: { d: { name: string; debits: { label: string; amount: number }[]; credits: { label: string; amount: number }[] } }) {
  const sum = (xs: { amount: number }[]) => xs.reduce((s, x) => s + x.amount, 0)
  const Side = ({ title, rows, tint }: { title: string; rows: { label: string; amount: number }[]; tint: string }) => (
    <div style={{ flex: 1, minWidth: 150 }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: tint, borderBottom: `2px solid ${C.border}`, paddingBottom: 6, marginBottom: 6 }}>{title}</div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12.5, color: C.body, padding: "3px 0" }}>
          <span>{r.label}</span><span style={{ fontVariantNumeric: "tabular-nums", color: C.text }}>{fmt(r.amount)}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12.5, fontWeight: 800, color: C.text, borderTop: `1px solid ${C.border}`, marginTop: 6, paddingTop: 5, fontVariantNumeric: "tabular-nums" }}>
        <span>Total</span><span>{fmt(sum(rows))}</span>
      </div>
    </div>
  )
  return (
    <div>
      <div style={{ textAlign: "center", fontSize: 12.5, fontWeight: 800, color: C.text, marginBottom: 10 }}>{d.name}</div>
      <div style={{ display: "flex", gap: 0, background: C.card2, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ flex: 1, padding: 14, borderRight: `2px solid ${C.border}` }}><Side title="Debit" rows={d.debits} tint={C.brand} /></div>
        <div style={{ flex: 1, padding: 14 }}><Side title="Credit" rows={d.credits} tint={C.green} /></div>
      </div>
    </div>
  )
}

/* ── Radial (centre + spokes) ─────────────────────────────────── */
function Radial({ d }: { d: { centre: string; nodes: { label: string; sub?: string }[] } }) {
  const n = d.nodes.length
  const R0 = 128, cx = 175, cy = 150
  return (
    <div style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
      <svg viewBox="0 0 350 300" width="100%" style={{ maxWidth: 420 }}>
        {d.nodes.map((_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * R0} y2={cy + Math.sin(a) * R0} stroke={C.border} strokeWidth={1.5} />
        })}
        <circle cx={cx} cy={cy} r={44} fill={C.brand} />
        <text x={cx} y={cy - 3} textAnchor="middle" fill="#fff" fontSize={10.5} fontWeight={800}>{d.centre.split(" ")[0]}</text>
        <text x={cx} y={cy + 11} textAnchor="middle" fill="#fff" fontSize={10.5} fontWeight={800}>{d.centre.split(" ").slice(1).join(" ")}</text>
        {d.nodes.map((node, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(a) * R0, y = cy + Math.sin(a) * R0
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={26} fill={C.card} stroke={PALETTE[i % PALETTE.length]} strokeWidth={2} />
              <text x={x} y={y + 3.5} textAnchor="middle" fill={C.text} fontSize={9.5} fontWeight={800}>{node.label.length > 9 ? node.label.slice(0, 8) + "…" : node.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Compare (two columns) ────────────────────────────────────── */
function Compare({ d }: { d: { leftTitle: string; rightTitle: string; rows: { aspect: string; left: string; right: string }[] } }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(70px,0.7fr) 1fr 1fr", gap: 1, background: C.border, borderRadius: 12, overflow: "hidden", minWidth: 320 }}>
        <div style={{ background: C.card2 }} />
        <div style={{ background: `${C.brand}12`, padding: "9px 12px", fontSize: 11.5, fontWeight: 800, color: C.brand }}>{d.leftTitle}</div>
        <div style={{ background: `${C.green}12`, padding: "9px 12px", fontSize: 11.5, fontWeight: 800, color: C.green }}>{d.rightTitle}</div>
        {d.rows.map((r, i) => (
          <FragmentRow key={i} aspect={r.aspect} left={r.left} right={r.right} />
        ))}
      </div>
    </div>
  )
}
function FragmentRow({ aspect, left, right }: { aspect: string; left: string; right: string }) {
  return (
    <>
      <div style={{ background: C.card2, padding: "9px 12px", fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>{aspect}</div>
      <div style={{ background: C.card, padding: "9px 12px", fontSize: 12.5, color: C.body, lineHeight: 1.45 }}>{left}</div>
      <div style={{ background: C.card, padding: "9px 12px", fontSize: 12.5, color: C.body, lineHeight: 1.45 }}>{right}</div>
    </>
  )
}

/* ── Cards (grid with 3D tilt) ────────────────────────────────── */
function Cards({ d, reduce }: { d: { items: { title: string; sub?: string }[] }; reduce: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
      {d.items.map((it, i) => (
        <motion.div key={i} whileHover={reduce ? {} : { y: -3, rotateX: 4, rotateY: -3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d", background: C.card2, border: `1px solid ${C.border}`, borderRadius: 13, padding: "13px 14px", borderTop: `3px solid ${PALETTE[i % PALETTE.length]}` }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.3 }}>{it.title}</div>
          {it.sub && <div style={{ fontSize: 11.5, color: C.muted, marginTop: 5, lineHeight: 1.5 }}>{it.sub}</div>}
        </motion.div>
      ))}
    </div>
  )
}

/* ── Flow (steps + arrows) ────────────────────────────────────── */
function Flow({ d }: { d: { steps: { label: string; sub?: string }[] } }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 6, flexWrap: "wrap" }}>
      {d.steps.map((s, i) => (
        <div key={i} style={{ display: "contents" }}>
          <div style={{ flex: "1 1 120px", minWidth: 110, background: C.card2, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.brand}`, borderRadius: 11, padding: "11px 12px" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, color: C.brand, fontFamily: "ui-monospace, monospace" }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: 12.5, fontWeight: 750, color: C.text, marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>
            {s.sub && <div style={{ fontSize: 10.5, color: C.muted, marginTop: 3, lineHeight: 1.4 }}>{s.sub}</div>}
          </div>
          {i < d.steps.length - 1 && <div style={{ alignSelf: "center", color: C.faint, fontSize: 15, flex: "none" }}>→</div>}
        </div>
      ))}
    </div>
  )
}

/* ── Cycle (circular process) ─────────────────────────────────── */
function Cycle({ d }: { d: { steps: { label: string }[] } }) {
  const n = d.steps.length, R0 = 100, cx = 150, cy = 140
  return (
    <div style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
      <svg viewBox="0 0 300 280" width="100%" style={{ maxWidth: 360 }}>
        <circle cx={cx} cy={cy} r={R0} fill="none" stroke={C.border} strokeWidth={1.5} strokeDasharray="4 5" />
        {d.steps.map((s, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(a) * R0, y = cy + Math.sin(a) * R0
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={28} fill={PALETTE[i % PALETTE.length]} />
              <text x={x} y={y - 2} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={800}>{i + 1}</text>
              <text x={x} y={y + 42} textAnchor="middle" fill={C.text} fontSize={9.5} fontWeight={700}>{s.label.length > 14 ? s.label.slice(0, 13) + "…" : s.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Waterfall (bridge) ───────────────────────────────────────── */
function Waterfall({ d }: { d: { unit?: string; items: { label: string; value: number; kind?: "start" | "delta" | "total" }[] } }) {
  let running = 0
  const bars = d.items.map((it) => {
    const isAbs = it.kind === "start" || it.kind === "total"
    const base = isAbs ? 0 : running
    const top = isAbs ? it.value : running + it.value
    if (isAbs) running = it.value; else running += it.value
    return { ...it, base, top }
  })
  // Zero-baseline scale so bars that cross below zero (e.g. an overdraft month
  // in a cash budget) render correctly beneath the axis.
  const vals = bars.flatMap((b) => [b.base, b.top])
  const hiV = Math.max(0, ...vals)
  const loV = Math.min(0, ...vals)
  const range = hiV - loV || 1
  const H = 150
  const yOf = (v: number) => ((hiV - v) / range) * H // px from top of the plot
  const showZero = loV < 0
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 8, minWidth: bars.length * 62 }}>
        {bars.map((b, i) => {
          const yTop = yOf(Math.max(b.base, b.top))
          const barH = Math.max(3, yOf(Math.min(b.base, b.top)) - yTop)
          const tint = b.kind === "start" || b.kind === "total" ? C.brand : b.value >= 0 ? C.green : C.amber
          const above = b.top >= b.base
          return (
            <div key={i} style={{ flex: 1, minWidth: 48, display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* value label sits just above/below the bar */}
              <div style={{ height: yTop, display: "flex", flexDirection: "column", justifyContent: "flex-end", fontSize: 10.5, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums", paddingBottom: 2 }}>
                {above ? `${b.value < 0 ? "−" : ""}${fmt(Math.abs(b.value))}` : ""}
              </div>
              <div style={{ position: "relative", width: "100%", height: barH }}>
                <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{ transformOrigin: above ? "top" : "bottom", height: "100%", background: tint, borderRadius: 5 }} />
              </div>
              <div style={{ height: H - yTop - barH }} />
              <div style={{ fontSize: 10, color: C.muted, marginTop: 6, textAlign: "center", lineHeight: 1.3, fontWeight: 600 }}>{b.label}</div>
            </div>
          )
        })}
      </div>
      {showZero && <div style={{ fontSize: 9.5, color: C.faint, marginTop: 4, textAlign: "right" }}>bars below the line are negative (e.g. an overdraft)</div>}
    </div>
  )
}

/* ── Bars ─────────────────────────────────────────────────────── */
function Bars({ d }: { d: { unit?: string; items: { label: string; value: number }[] } }) {
  // Scale on magnitude so negative values (e.g. a loss region of a P/V profile)
  // render as a proportional bar rather than a broken negative width.
  const scale = Math.max(...d.items.map((i) => Math.abs(i.value)), 1)
  return (
    <div style={{ display: "grid", gap: 9 }}>
      {d.items.map((it, i) => {
        const neg = it.value < 0
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 96, fontSize: 11.5, color: C.muted, fontWeight: 600, textAlign: "right", flex: "none" }}>{it.label}</div>
            <div style={{ flex: 1, height: 22, background: C.card2, borderRadius: 6, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(Math.abs(it.value) / scale) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
                style={{ height: "100%", background: neg ? C.amber : PALETTE[i % PALETTE.length], borderRadius: 6 }} />
            </div>
            <div style={{ width: 54, fontSize: 12, fontWeight: 800, color: neg ? C.amber : C.text, fontVariantNumeric: "tabular-nums", flex: "none" }}>{neg ? "−" : ""}{fmt(Math.abs(it.value))}{d.unit ?? ""}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Donut ────────────────────────────────────────────────────── */
function Donut({ d }: { d: { items: { label: string; value: number }[] } }) {
  const total = d.items.reduce((s, i) => s + i.value, 0) || 1
  let acc = 0
  const r = 54, cx = 70, cy = 70, circ = 2 * Math.PI * r
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      <svg viewBox="0 0 140 140" width={140} height={140} style={{ flex: "none" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.card2} strokeWidth={18} />
        {d.items.map((it, i) => {
          const frac = it.value / total
          const dash = frac * circ
          const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={PALETTE[i % PALETTE.length]} strokeWidth={18}
            strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-acc * circ} transform={`rotate(-90 ${cx} ${cy})`} />
          acc += frac
          return el
        })}
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={C.text}>{total}</text>
      </svg>
      <div style={{ display: "grid", gap: 6 }}>
        {d.items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: PALETTE[i % PALETTE.length], flex: "none" }} />
            <span style={{ color: C.body }}>{it.label}</span>
            <span style={{ color: C.faint, fontWeight: 700 }}>{Math.round((it.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Pyramid ──────────────────────────────────────────────────── */
function Pyramid({ d }: { d: { levels: { label: string; sub?: string }[] } }) {
  const n = d.levels.length
  return (
    <div style={{ display: "grid", gap: 6, placeItems: "center" }}>
      {d.levels.map((lv, i) => {
        const w = 55 + (i / Math.max(1, n - 1)) * 45
        return (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            style={{ width: `${w}%`, minWidth: 160, background: `linear-gradient(135deg, ${PALETTE[i % PALETTE.length]}, ${PALETTE[i % PALETTE.length]}cc)`, color: "#fff", borderRadius: 10, padding: "11px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 12.5, fontWeight: 800 }}>{lv.label}</div>
            {lv.sub && <div style={{ fontSize: 10.5, opacity: 0.9, marginTop: 2 }}>{lv.sub}</div>}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Timeline ─────────────────────────────────────────────────── */
function Timeline({ d }: { d: { points: { label: string; sub?: string }[] } }) {
  return (
    <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingTop: 6 }}>
      {d.points.map((p, i) => (
        <div key={i} style={{ flex: "1 1 110px", minWidth: 104, position: "relative", paddingTop: 22 }}>
          <div style={{ position: "absolute", top: 6, left: 0, right: 0, height: 2, background: C.border }} />
          <div style={{ position: "absolute", top: 1, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, borderRadius: 99, background: PALETTE[i % PALETTE.length], border: `2px solid ${C.card}` }} />
          <div style={{ textAlign: "center", padding: "0 4px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{p.label}</div>
            {p.sub && <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{p.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
