import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"
import { C, R } from "@/components/acca/ui"
import {
  evalSheet,
  displayValue,
  refName,
  colName,
  SHEET_COLS,
  SHEET_ROWS,
  type Cells,
} from "@/lib/spreadsheet"

/*
 * The CBE answer spreadsheet — a faithful, deliberately compact take on the
 * grid ACCA gives you for constructed-response workings. Click a cell and
 * type; start with "=" for a formula (SUM, AVERAGE, MIN, MAX, COUNT, ROUND,
 * ABS, + − × ÷ ^, cell refs and ranges). Enter/Tab/arrows move like the real
 * thing. The formula bar shows the RAW content of the selected cell — what
 * you typed, not what it shows — exactly as in the exam.
 */

const CELL_W = 92
const CELL_H = 26
const HEAD_BG = "var(--sch-card2, #F4F1EC)"

export default function SpreadsheetPad({
  cells,
  onChange,
  rows = SHEET_ROWS,
  cols = SHEET_COLS,
  height = 320,
}: {
  cells: Cells
  onChange: (next: Cells) => void
  rows?: number
  cols?: number
  height?: number
}) {
  const [sel, setSel] = useState<{ col: number; row: number }>({ col: 0, row: 0 })
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")
  const gridRef = useRef<HTMLDivElement>(null)

  const evald = useMemo(() => evalSheet(cells), [cells])
  const selRef = refName(sel.col, sel.row)
  const selRaw = cells[selRef] ?? ""

  function commit(move: { dc: number; dr: number } | null) {
    if (editing) {
      const next = { ...cells }
      if (draft.trim() === "") delete next[selRef]
      else next[selRef] = draft
      onChange(next)
      setEditing(false)
    }
    if (move) {
      setSel((s) => ({
        col: Math.max(0, Math.min(cols - 1, s.col + move.dc)),
        row: Math.max(0, Math.min(rows - 1, s.row + move.dr)),
      }))
    }
    gridRef.current?.focus()
  }

  function beginEdit(initial?: string) {
    setDraft(initial !== undefined ? initial : selRaw)
    setEditing(true)
  }

  function onGridKey(e: KeyboardEvent<HTMLDivElement>) {
    if (editing) return
    if (e.key === "ArrowUp") { setSel((s) => ({ ...s, row: Math.max(0, s.row - 1) })); e.preventDefault() }
    else if (e.key === "ArrowDown" || e.key === "Enter") { setSel((s) => ({ ...s, row: Math.min(rows - 1, s.row + 1) })); e.preventDefault() }
    else if (e.key === "ArrowLeft") { setSel((s) => ({ ...s, col: Math.max(0, s.col - 1) })); e.preventDefault() }
    else if (e.key === "ArrowRight" || e.key === "Tab") { setSel((s) => ({ ...s, col: Math.min(cols - 1, s.col + 1) })); e.preventDefault() }
    else if (e.key === "Delete" || e.key === "Backspace") {
      const next = { ...cells }
      delete next[selRef]
      onChange(next)
      e.preventDefault()
    } else if (e.key === "F2") beginEdit()
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      beginEdit(e.key)
      e.preventDefault()
    }
  }

  const cellBase: CSSProperties = {
    width: CELL_W,
    minWidth: CELL_W,
    height: CELL_H,
    boxSizing: "border-box",
    borderRight: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
    padding: "0 6px",
    fontSize: 12.5,
    display: "flex",
    alignItems: "center",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "cell",
    background: "var(--sch-card, #fff)",
  }

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: R.lg, overflow: "hidden", background: "var(--sch-card, #fff)" }}>
      {/* formula bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderBottom: `1px solid ${C.border}`, background: HEAD_BG }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: C.soft, width: 34, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{selRef}</span>
        <input
          value={editing ? draft : selRaw}
          placeholder="Type a value, or =SUM(A1:A5)"
          onFocus={() => !editing && beginEdit()}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { commit({ dc: 0, dr: 1 }); e.preventDefault() }
            if (e.key === "Escape") { setEditing(false); gridRef.current?.focus() }
          }}
          style={{
            flex: 1, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 9px",
            fontSize: 12.5, fontFamily: "ui-monospace, monospace", background: "var(--sch-bg, #FAFAF7)",
            color: C.text, outline: "none",
          }}
        />
      </div>

      {/* grid */}
      <div
        ref={gridRef}
        tabIndex={0}
        onKeyDown={onGridKey}
        style={{ overflow: "auto", height, outline: "none", position: "relative" }}
        aria-label="Answer spreadsheet"
      >
        <div style={{ display: "inline-block", minWidth: "100%" }}>
          {/* column headers */}
          <div style={{ display: "flex", position: "sticky", top: 0, zIndex: 2 }}>
            <div style={{ ...cellBase, width: 40, minWidth: 40, background: HEAD_BG, cursor: "default", position: "sticky", left: 0, zIndex: 3 }} />
            {Array.from({ length: cols }, (_, c) => (
              <div key={c} style={{ ...cellBase, background: HEAD_BG, justifyContent: "center", fontWeight: 800, fontSize: 11, color: C.soft, cursor: "default" }}>
                {colName(c)}
              </div>
            ))}
          </div>
          {Array.from({ length: rows }, (_, r) => (
            <div key={r} style={{ display: "flex" }}>
              <div style={{ ...cellBase, width: 40, minWidth: 40, background: HEAD_BG, justifyContent: "center", fontWeight: 700, fontSize: 10.5, color: C.soft, cursor: "default", position: "sticky", left: 0, zIndex: 1 }}>
                {r + 1}
              </div>
              {Array.from({ length: cols }, (_, c) => {
                const ref = refName(c, r)
                const isSel = sel.col === c && sel.row === r
                const cell = evald[ref]
                const isNum = cell && typeof cell.value === "number" && !cell.error
                if (isSel && editing) {
                  return (
                    <div key={c} style={{ ...cellBase, padding: 0, position: "relative", zIndex: 1 }}>
                      <input
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onBlur={() => commit(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { commit({ dc: 0, dr: 1 }); e.preventDefault() }
                          else if (e.key === "Tab") { commit({ dc: 1, dr: 0 }); e.preventDefault() }
                          else if (e.key === "Escape") { setEditing(false); gridRef.current?.focus() }
                        }}
                        style={{
                          width: "100%", height: "100%", border: `2px solid ${C.brand}`, boxSizing: "border-box",
                          padding: "0 4px", fontSize: 12.5, fontFamily: "ui-monospace, monospace",
                          outline: "none", background: "var(--sch-card, #fff)", color: C.text,
                        }}
                      />
                    </div>
                  )
                }
                return (
                  <div
                    key={c}
                    onClick={() => { if (editing) commit(null); setSel({ col: c, row: r }); gridRef.current?.focus() }}
                    onDoubleClick={() => { setSel({ col: c, row: r }); beginEdit((cells[ref] ?? "")) }}
                    style={{
                      ...cellBase,
                      justifyContent: isNum ? "flex-end" : "flex-start",
                      color: cell?.error ? C.red : C.text,
                      fontWeight: cell?.error ? 700 : 450,
                      boxShadow: isSel ? `inset 0 0 0 2px ${C.brand}` : undefined,
                    }}
                  >
                    {displayValue(cell)}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "6px 10px", borderTop: `1px solid ${C.border}`, fontSize: 10.5, color: C.faint, background: HEAD_BG }}>
        Formulas: =SUM(A1:A5) · =AVERAGE · =MIN · =MAX · =COUNT · =ROUND(x, dp) · =ABS · + − * / ^ · double-click or F2 to edit
      </div>
    </div>
  )
}
