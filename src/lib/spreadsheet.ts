/*
 * Scholify — the CBE spreadsheet engine.
 *
 * A deliberately small spreadsheet, modelled on the answer spreadsheet in
 * ACCA's real CBE (which is itself a cut-down grid, not full Excel): cell
 * values, arithmetic formulas with cell references, and the handful of
 * functions exam workings actually use (SUM, AVERAGE, MIN, MAX, COUNT,
 * ROUND, ABS). Pure functions — the grid UI renders on top, and the
 * evaluated sheet can be serialised into the AI Examiner submission so
 * Lara marks the workings, not just the words.
 *
 * Model: raw cell inputs keyed by ref ("A1" → "=SUM(A2:A9)"). Anything
 * starting with "=" is a formula; a plain number is numeric; anything else
 * is text (labels — most rows of a good exam working ARE labels).
 */

export type Cells = Record<string, string>
export type CellValue = number | string | null
export interface EvalCell {
  value: CellValue
  /** "#CIRC" | "#REF" | "#ERR" | "#DIV/0" when the formula is broken. */
  error?: string
}
export type EvalSheet = Record<string, EvalCell>

export const SHEET_COLS = 10 // A..J — the CBE answer grid is compact by design
export const SHEET_ROWS = 40

/** 0 → "A", 1 → "B"… */
export function colName(i: number): string {
  let s = ""
  let n = i
  do {
    s = String.fromCharCode(65 + (n % 26)) + s
    n = Math.floor(n / 26) - 1
  } while (n >= 0)
  return s
}

/** "B7" → { col: 1, row: 6 } (0-based), or null if not a ref. */
export function parseRef(ref: string): { col: number; row: number } | null {
  const m = /^([A-Z]+)([0-9]+)$/.exec(ref.trim().toUpperCase())
  if (!m) return null
  let col = 0
  for (const ch of m[1]) col = col * 26 + (ch.charCodeAt(0) - 64)
  const row = parseInt(m[2], 10)
  if (row < 1) return null
  return { col: col - 1, row: row - 1 }
}

export function refName(col: number, row: number): string {
  return `${colName(col)}${row + 1}`
}

/** Expand "A1:B3" into every ref inside the rectangle. */
function expandRange(a: string, b: string): string[] | null {
  const p = parseRef(a)
  const q = parseRef(b)
  if (!p || !q) return null
  const refs: string[] = []
  for (let r = Math.min(p.row, q.row); r <= Math.max(p.row, q.row); r++)
    for (let c = Math.min(p.col, q.col); c <= Math.max(p.col, q.col); c++) refs.push(refName(c, r))
  return refs
}

const FUNCTIONS = new Set(["SUM", "AVERAGE", "MIN", "MAX", "COUNT", "ROUND", "ABS"])

/* ── tokenizer ────────────────────────────────────────────────── */

type Token =
  | { t: "num"; v: number }
  | { t: "ref"; v: string }
  | { t: "range"; a: string; b: string }
  | { t: "fn"; v: string }
  | { t: "op"; v: string }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "comma" }

function tokenize(src: string): Token[] | null {
  const out: Token[] = []
  let i = 0
  const s = src.toUpperCase()
  while (i < s.length) {
    const ch = s[i]
    if (ch === " ") {
      i++
    } else if (/[0-9.]/.test(ch)) {
      let j = i
      while (j < s.length && /[0-9.]/.test(s[j])) j++
      const v = Number(s.slice(i, j))
      if (!Number.isFinite(v)) return null
      out.push({ t: "num", v })
      i = j
    } else if (/[A-Z]/.test(ch)) {
      let j = i
      while (j < s.length && /[A-Z0-9]/.test(s[j])) j++
      const word = s.slice(i, j)
      i = j
      if (s[i] === "(" && FUNCTIONS.has(word)) {
        out.push({ t: "fn", v: word })
      } else if (s[i] === ":" && parseRef(word)) {
        // range A1:B3
        let k = i + 1
        let j2 = k
        while (j2 < s.length && /[A-Z0-9]/.test(s[j2])) j2++
        const second = s.slice(k, j2)
        if (!parseRef(second)) return null
        out.push({ t: "range", a: word, b: second })
        i = j2
      } else if (parseRef(word)) {
        out.push({ t: "ref", v: word })
      } else {
        return null
      }
    } else if ("+-*/^%".includes(ch)) {
      out.push({ t: "op", v: ch })
      i++
    } else if (ch === "(") {
      out.push({ t: "lp" })
      i++
    } else if (ch === ")") {
      out.push({ t: "rp" })
      i++
    } else if (ch === ",") {
      out.push({ t: "comma" })
      i++
    } else {
      return null
    }
  }
  return out
}

/* ── recursive-descent parser/evaluator ───────────────────────── */

class EvalError extends Error {}

function evaluateFormula(tokens: Token[], lookup: (ref: string) => number): number {
  let pos = 0
  const peek = () => tokens[pos]
  const take = () => tokens[pos++]

  function rangeValues(a: string, b: string): number[] {
    const refs = expandRange(a, b)
    if (!refs) throw new EvalError("#REF")
    return refs.map(lookup)
  }

  function callFn(name: string): number {
    // consume "(" args ")"
    if (!peek() || peek().t !== "lp") throw new EvalError("#ERR")
    take()
    const args: number[][] = []
    if (peek() && peek().t !== "rp") {
      for (;;) {
        const tok = peek()
        if (tok && tok.t === "range") {
          take()
          args.push(rangeValues(tok.a, tok.b))
        } else {
          args.push([expr()])
        }
        if (peek() && peek().t === "comma") {
          take()
          continue
        }
        break
      }
    }
    if (!peek() || peek().t !== "rp") throw new EvalError("#ERR")
    take()
    const flat = args.flat()
    switch (name) {
      case "SUM":
        return flat.reduce((a, b) => a + b, 0)
      case "AVERAGE":
        if (flat.length === 0) throw new EvalError("#DIV/0")
        return flat.reduce((a, b) => a + b, 0) / flat.length
      case "MIN":
        if (flat.length === 0) throw new EvalError("#ERR")
        return Math.min(...flat)
      case "MAX":
        if (flat.length === 0) throw new EvalError("#ERR")
        return Math.max(...flat)
      case "COUNT":
        return flat.length
      case "ROUND": {
        const [v, dp = 0] = flat
        const f = Math.pow(10, Math.round(dp))
        return Math.round(v * f) / f
      }
      case "ABS":
        return Math.abs(flat[0] ?? 0)
      default:
        throw new EvalError("#ERR")
    }
  }

  function atom(): number {
    const tok = take()
    if (!tok) throw new EvalError("#ERR")
    if (tok.t === "num") return tok.v
    if (tok.t === "ref") return lookup(tok.v)
    if (tok.t === "fn") return callFn(tok.v)
    if (tok.t === "lp") {
      const v = expr()
      if (!peek() || peek().t !== "rp") throw new EvalError("#ERR")
      take()
      return v
    }
    if (tok.t === "op" && tok.v === "-") return -atom()
    if (tok.t === "op" && tok.v === "+") return atom()
    throw new EvalError("#ERR")
  }

  function power(): number {
    let base = atom()
    const tok = peek()
    if (tok && tok.t === "op" && tok.v === "^") {
      take()
      base = Math.pow(base, power()) // right-associative
    }
    return base
  }

  function term(): number {
    let v = power()
    for (;;) {
      const tok = peek()
      if (tok && tok.t === "op" && (tok.v === "*" || tok.v === "/")) {
        take()
        const rhs = power()
        if (tok.v === "/") {
          if (rhs === 0) throw new EvalError("#DIV/0")
          v /= rhs
        } else v *= rhs
      } else break
    }
    return v
  }

  function expr(): number {
    let v = term()
    for (;;) {
      const tok = peek()
      if (tok && tok.t === "op" && (tok.v === "+" || tok.v === "-")) {
        take()
        const rhs = term()
        v = tok.v === "+" ? v + rhs : v - rhs
      } else break
    }
    return v
  }

  const result = expr()
  if (pos !== tokens.length) throw new EvalError("#ERR")
  if (!Number.isFinite(result)) throw new EvalError("#DIV/0")
  return result
}

/* ── whole-sheet evaluation with cycle detection ──────────────── */

export function evalSheet(cells: Cells): EvalSheet {
  const out: EvalSheet = {}
  const visiting = new Set<string>()

  function numericValueOf(ref: string): number {
    const cell = resolve(ref)
    if (cell.error) throw new EvalError(cell.error)
    if (typeof cell.value === "number") return cell.value
    if (cell.value === null || cell.value === "") return 0 // empty counts as 0, like the CBE grid
    // text in an arithmetic context is a broken working — surface it
    throw new EvalError("#ERR")
  }

  function resolve(ref: string): EvalCell {
    const key = ref.toUpperCase()
    if (out[key]) return out[key]
    const raw = (cells[key] ?? "").trim()
    if (raw === "") {
      out[key] = { value: null }
      return out[key]
    }
    if (raw.startsWith("=")) {
      if (visiting.has(key)) {
        out[key] = { value: null, error: "#CIRC" }
        return out[key]
      }
      visiting.add(key)
      try {
        const tokens = tokenize(raw.slice(1))
        if (!tokens || tokens.length === 0) throw new EvalError("#ERR")
        const v = evaluateFormula(tokens, numericValueOf)
        out[key] = { value: v }
      } catch (e) {
        out[key] = { value: null, error: e instanceof EvalError ? e.message : "#ERR" }
      } finally {
        visiting.delete(key)
      }
      return out[key]
    }
    const num = Number(raw.replace(/,/g, ""))
    out[key] = Number.isFinite(num) && /^-?[\d,.]+$/.test(raw) ? { value: num } : { value: raw }
    return out[key]
  }

  for (const key of Object.keys(cells)) resolve(key)
  return out
}

/** Display text for a cell: numbers get thousands separators, errors show. */
export function displayValue(cell: EvalCell | undefined): string {
  if (!cell || cell.value === null) return cell?.error ?? ""
  if (cell.error) return cell.error
  if (typeof cell.value === "number") {
    const rounded = Math.round(cell.value * 100) / 100
    return rounded.toLocaleString("en-GB", { maximumFractionDigits: 2 })
  }
  return cell.value
}

/**
 * Serialise the sheet for the AI Examiner: every non-empty cell, formulas
 * shown WITH their result, reading order — so Lara can award method marks
 * for the workings.
 */
export function serializeForMarking(cells: Cells): string {
  const keys = Object.keys(cells).filter((k) => (cells[k] ?? "").trim() !== "")
  if (keys.length === 0) return ""
  const evald = evalSheet(cells)
  const sorted = keys
    .map((k) => ({ k, ref: parseRef(k) }))
    .filter((x): x is { k: string; ref: { col: number; row: number } } => x.ref !== null)
    .sort((a, b) => a.ref.row - b.ref.row || a.ref.col - b.ref.col)
  const lines = sorted.map(({ k }) => {
    const raw = cells[k].trim()
    const shown = displayValue(evald[k.toUpperCase()])
    return raw.startsWith("=") ? `${k}: ${raw} → ${shown}` : `${k}: ${raw}`
  })
  return `[Spreadsheet workings]\n${lines.join("\n")}`
}
