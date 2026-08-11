import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { C, R } from "@/components/acca/ui"
import { TABLE_RATES, TABLE_YEARS, annuityFactor, discountFactor } from "@/lib/acca-kit"

/*
 * THE DISCOUNT AND ANNUITY TABLES — the ones ACCA prints in the exam.
 *
 * A candidate practising NPV needs the same numbers they will be handed on the
 * day, and until now had to open a PDF in another tab to get them. Working from
 * a full-precision calculator instead of the three-decimal table is its own
 * trap: the marking scheme is built on the printed factors, so an answer
 * derived from 0.9090909 can legitimately differ from the model answer.
 *
 * The values are COMPUTED (see acca-kit) rather than transcribed — 300
 * hand-typed three-decimal numbers is a guaranteed source of a silent wrong
 * digit — and the tests check them against figures read off the real sheet.
 *
 * Hovering or tapping a cell highlights its row and column, because the actual
 * failure mode with a printed table is reading off the wrong line.
 */

const SANS = "'Plus Jakarta Sans', sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, monospace"

type Which = "pv" | "annuity"

export default function KitTables() {
  const reduced = useReducedMotion()
  const [which, setWhich] = useState<Which>("pv")
  const [cell, setCell] = useState<{ r: number; y: number } | null>(null)

  const factor = which === "pv" ? discountFactor : annuityFactor

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {([["pv", "Present value of 1"], ["annuity", "Annuity — 1 per year"]] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => { setWhich(id); setCell(null) }}
            aria-pressed={which === id}
            style={{
              minHeight: 42, padding: "0 16px", borderRadius: 999, cursor: "pointer",
              border: `1px solid ${which === id ? C.brand : C.border}`,
              background: which === id ? C.brandSoft : C.card,
              color: which === id ? C.brand : C.soft,
              font: `750 13px/1 ${SANS}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <p style={{ font: `500 12.5px/1.65 ${SANS}`, color: C.soft, margin: "0 0 14px", maxWidth: 620 }}>
        {which === "pv"
          ? "The present value of 1 received in n years' time. Read down to your year, across to your discount rate."
          : "The present value of 1 received at the end of each year for n years. Use this instead of adding the individual factors."}{" "}
        <span style={{ color: C.faint }}>
          These are the three-decimal factors the exam gives you — work from these, not full calculator precision, or your answer can drift from the marking scheme.
        </span>
      </p>

      {/* A readout, so a chosen cell is legible without hunting for it again. */}
      <div
        aria-live="polite"
        style={{
          minHeight: 52, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
          borderRadius: R.lg, border: `1px solid ${cell ? C.brandLine : C.border}`,
          background: cell ? C.brandSoft : C.card2, marginBottom: 12,
        }}
      >
        {cell ? (
          <>
            <span style={{ font: `750 12.5px/1 ${SANS}`, color: C.brand }}>
              {cell.y} {cell.y === 1 ? "year" : "years"} at {cell.r}%
            </span>
            <span style={{ font: `800 18px/1 ${MONO}`, color: C.text, marginLeft: "auto" }}>
              {factor(cell.r, cell.y).toFixed(3)}
            </span>
          </>
        ) : (
          <span style={{ font: `500 12.5px/1 ${SANS}`, color: C.faint }}>Tap any cell to read it clearly.</span>
        )}
      </div>

      {/* The table scrolls in its own box — the page itself must never scroll sideways. */}
      <div style={{ overflowX: "auto", borderRadius: R.lg, border: `1px solid ${C.border}`, background: C.card }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 640 }}>
          <caption style={{ captionSide: "top", textAlign: "left", padding: "12px 14px 0", font: `800 12px/1 ${SANS}`, color: C.text }}>
            {which === "pv" ? "Present value table" : "Annuity table"}
            <span style={{ font: `500 11.5px/1 ${SANS}`, color: C.faint, marginLeft: 8 }}>rate % across · years down</span>
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ ...th, position: "sticky", left: 0, background: C.card2, zIndex: 1 }}>n</th>
              {TABLE_RATES.map((r) => (
                <th
                  key={r}
                  scope="col"
                  style={{ ...th, color: cell?.r === r ? C.brand : C.faint, background: cell?.r === r ? C.brandSoft : C.card2 }}
                >
                  {r}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_YEARS.map((y) => (
              <tr key={y}>
                <th
                  scope="row"
                  style={{ ...th, textAlign: "left", position: "sticky", left: 0, background: cell?.y === y ? C.brandSoft : C.card2, color: cell?.y === y ? C.brand : C.faint, zIndex: 1 }}
                >
                  {y}
                </th>
                {TABLE_RATES.map((r) => {
                  const hot = cell?.r === r && cell?.y === y
                  const lit = cell?.r === r || cell?.y === y
                  return (
                    <td key={r} style={{ padding: 0 }}>
                      <motion.button
                        type="button"
                        onClick={() => setCell(hot ? null : { r, y })}
                        onMouseEnter={() => setCell({ r, y })}
                        whileTap={reduced ? undefined : { scale: 0.9 }}
                        aria-label={`${y} years at ${r} percent: ${factor(r, y).toFixed(3)}`}
                        style={{
                          width: "100%", minWidth: 52, minHeight: 34, border: "none", cursor: "pointer",
                          background: hot ? C.brand : lit ? C.brandSoft : "transparent",
                          color: hot ? "#fff" : C.text,
                          font: `${hot ? 800 : 600} 12.5px/1 ${MONO}`,
                          transition: "background .12s",
                        }}
                      >
                        {factor(r, y).toFixed(3)}
                      </motion.button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const th: React.CSSProperties = {
  padding: "8px 6px",
  font: `800 11px/1 ${SANS}`,
  textAlign: "center",
  color: C.faint,
  borderBottom: `1px solid ${C.border}`,
  whiteSpace: "nowrap",
}
