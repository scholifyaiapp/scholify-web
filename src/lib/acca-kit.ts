/*
 * THE ACCA KIT — the reference a student keeps beside them.
 *
 * Everything here is something an ACCA candidate reaches for mid-question and
 * currently has to leave Scholify to find: the formulae sheet, the discount and
 * annuity tables the exam itself provides, and a calculator.
 *
 * ── WHY THE TABLES ARE COMPUTED, NOT TYPED ──────────────────────
 * ACCA prints these tables in the exam. Transcribing 300 three-decimal numbers
 * by hand into a source file is a guaranteed source of silent errors — one
 * wrong digit in the 8% column is invisible in review and produces a confidently
 * wrong answer for whoever hits it. They are generated from the definitions
 * instead, and the tests check the generated values against figures read off
 * the real ACCA sheet.
 */

/* ── Discount and annuity tables ──────────────────────────────── */

/** Present value of 1 receivable in n years at r% — ACCA "Present Value Table". */
export function discountFactor(ratePercent: number, years: number): number {
  return round3(Math.pow(1 + ratePercent / 100, -years))
}

/**
 * Present value of 1 received annually for n years at r% — ACCA "Annuity Table".
 *
 * The r = 0 case is not in ACCA's table (it starts at 1%) but is reachable from
 * the calculator UI, and the limit of the formula there is simply n.
 */
export function annuityFactor(ratePercent: number, years: number): number {
  if (ratePercent === 0) return round3(years)
  const r = ratePercent / 100
  return round3((1 - Math.pow(1 + r, -years)) / r)
}

/** ACCA prints three decimal places; matching that avoids "my table says 0.926". */
function round3(n: number): number {
  return Math.round(n * 1000) / 1000
}

/** Columns on the printed sheet. */
export const TABLE_RATES = Array.from({ length: 20 }, (_, i) => i + 1)
/** Rows on the printed sheet. */
export const TABLE_YEARS = Array.from({ length: 15 }, (_, i) => i + 1)

/* ── The formulae sheet ───────────────────────────────────────── */

export interface KitFormula {
  id: string
  /** Papers this belongs to, in ACCA's own order. */
  papers: string[]
  group: string
  name: string
  /** Written the way ACCA writes it, in plain text a monospace font can hold. */
  expression: string
  /** What each symbol is — the part a formulae sheet never tells you. */
  where?: string
  /** When to reach for it, which is the actual skill being examined. */
  use: string
}

/*
 * Chosen for the papers where a formula is genuinely examinable and
 * mis-remembered under time pressure. AA and LW carry none on purpose — there
 * is no formulae sheet in those exams and inventing one would be teaching the
 * wrong thing.
 */
export const KIT_FORMULAS: readonly KitFormula[] = [
  // ── MA / PM · costing and variances ──
  {
    id: "eoq", papers: ["MA", "FM"], group: "Inventory",
    name: "Economic order quantity",
    expression: "EOQ = √( 2·Co·D / Ch )",
    where: "Co = cost per order · D = annual demand · Ch = holding cost per unit per year",
    use: "The order size that minimises total ordering + holding cost. Watch for bulk-discount questions, where you test the EOQ against each discount band rather than using it directly.",
  },
  {
    id: "ebq", papers: ["MA"], group: "Inventory",
    name: "Economic batch quantity",
    expression: "EBQ = √( 2·Co·D / (Ch·(1 − D/R)) )",
    where: "R = annual replenishment (production) rate",
    use: "EOQ's cousin for goods you make rather than buy — the (1 − D/R) term is the stock building up while production runs.",
  },
  {
    id: "material-var", papers: ["MA", "PM"], group: "Variances",
    name: "Material price and usage",
    expression: "Price = (SP − AP) × AQ purchased\nUsage = (SQ for actual output − AQ used) × SP",
    where: "S = standard · A = actual · Q = quantity · P = price",
    use: "Price is valued at ACTUAL quantity, usage at STANDARD price — swapping them is the single most common variance error.",
  },
  {
    id: "labour-var", papers: ["MA", "PM"], group: "Variances",
    name: "Labour rate and efficiency",
    expression: "Rate = (SR − AR) × AH paid\nEfficiency = (SH for actual output − AH worked) × SR",
    where: "H = hours · R = rate per hour",
    use: "Where hours paid ≠ hours worked, the difference is idle time and is its own variance — valued at the standard rate.",
  },
  {
    id: "fixed-oh", papers: ["MA", "PM"], group: "Variances",
    name: "Fixed overhead volume",
    expression: "Volume = (Actual output − Budgeted output) × OAR per unit",
    where: "OAR = overhead absorption rate",
    use: "Absorption costing only. Under marginal costing there is no volume variance at all, which is exactly what a question testing the difference is looking for.",
  },
  {
    id: "mix-yield", papers: ["PM"], group: "Variances",
    name: "Mix and yield",
    expression: "Mix = (Actual mix − Standard mix of actual total input) × Standard price\nYield = (Actual input − Standard input for actual output) × Standard cost per unit of input",
    use: "Only meaningful where inputs are substitutable. Mix and yield together reconcile to the usage variance — use that as your check.",
  },

  // ── MA / PM · CVP and decision-making ──
  {
    id: "bep", papers: ["MA", "PM"], group: "CVP",
    name: "Breakeven and margin of safety",
    expression: "BEP (units) = Fixed costs / Contribution per unit\nBEP (revenue) = Fixed costs / C/S ratio\nMargin of safety % = (Budgeted − Breakeven) / Budgeted × 100",
    use: "For a target profit, add it to fixed costs. In a multi-product question, work in C/S ratio and weighted-average contribution.",
  },
  {
    id: "throughput", papers: ["PM"], group: "Throughput",
    name: "Throughput accounting ratio",
    expression: "Return per factory hour = (Sales − Material cost) / Hours on bottleneck\nTPAR = Return per factory hour / Cost per factory hour",
    use: "TPAR above 1 means the product earns more than it costs to run the bottleneck. Rank by return per BOTTLENECK hour, never per unit.",
  },
  {
    id: "learning-curve", papers: ["MA", "PM"], group: "Learning curve",
    name: "Learning curve",
    expression: "y = a·xᵇ        b = log(learning rate) / log 2",
    where: "y = cumulative AVERAGE time per unit · a = time for the first unit · x = cumulative units",
    use: "y is the cumulative average, not the time for unit x — get the total by y × x, then subtract the previous total for an incremental cost.",
  },

  // ── FM · investment appraisal ──
  {
    id: "npv", papers: ["FM", "AFM"], group: "Investment appraisal",
    name: "Net present value",
    expression: "NPV = Σ [ CFt / (1 + r)ᵗ ] − I₀",
    where: "CFt = cash flow in year t · r = discount rate · I₀ = initial investment",
    use: "Cash flows, not profits: add back depreciation, include working capital movements, and recover working capital at the end.",
  },
  {
    id: "irr", papers: ["FM"], group: "Investment appraisal",
    name: "Internal rate of return",
    expression: "IRR ≈ a + [ NPVa / (NPVa − NPVb) ] × (b − a)",
    where: "a, b = the two discount rates tried · NPVa, NPVb = their NPVs",
    use: "Interpolation, so it is an estimate. Keep the two rates close and straddling zero, and quote it to one decimal place at most.",
  },
  {
    id: "fisher", papers: ["FM"], group: "Investment appraisal",
    name: "Fisher effect",
    expression: "(1 + i) = (1 + r) × (1 + h)",
    where: "i = nominal (money) rate · r = real rate · h = inflation",
    use: "Discount money cash flows at the money rate and real cash flows at the real rate. Mixing the two is the classic trap in an inflation question.",
  },

  // ── FM · cost of capital ──
  {
    id: "capm", papers: ["FM", "AFM"], group: "Cost of capital",
    name: "CAPM",
    expression: "Ke = Rf + β(Rm − Rf)",
    where: "Rf = risk-free rate · β = equity beta · (Rm − Rf) = market (equity) risk premium",
    use: "Check whether the question gives the market RETURN or the market PREMIUM — using one as the other is a guaranteed lost mark.",
  },
  {
    id: "ddm", papers: ["FM"], group: "Cost of capital",
    name: "Dividend growth model",
    expression: "P₀ = D₀(1 + g) / (Ke − g)      →      Ke = D₀(1 + g)/P₀ + g",
    where: "P₀ = ex-div share price · D₀ = dividend just paid · g = growth",
    use: "The price must be EX-div: if given cum-div, subtract the imminent dividend first. Estimate g from historic dividends or g = r × b.",
  },
  {
    id: "wacc", papers: ["FM", "AFM"], group: "Cost of capital",
    name: "WACC",
    expression: "WACC = [ Ke · E/(D+E) ] + [ Kd(1 − T) · D/(D+E) ]",
    where: "E, D = MARKET values of equity and debt · T = corporation tax rate",
    use: "Market values, never book. Only valid as a discount rate when the project's business risk and the firm's gearing are both unchanged.",
  },
  {
    id: "asset-beta", papers: ["FM", "AFM"], group: "Cost of capital",
    name: "Asset (ungeared) beta",
    expression: "βa = βe · E/(E + D(1−T))  +  βd · D(1−T)/(E + D(1−T))",
    use: "Ungear a proxy company's beta, then regear to your own capital structure. Debt beta is usually assumed zero, which kills the second term.",
  },

  // ── FM · working capital and treasury ──
  {
    id: "occ", papers: ["FM"], group: "Working capital",
    name: "Cash operating cycle",
    expression: "Inventory days + Receivable days − Payable days",
    where: "Inventory days = Inventory/COS × 365 · Receivable days = Receivables/Credit sales × 365 · Payable days = Payables/Credit purchases × 365",
    use: "The days between paying for goods and being paid for them. Longer means more working capital tied up.",
  },
  {
    id: "discount-cost", papers: ["FM"], group: "Working capital",
    name: "Cost of an early-settlement discount",
    expression: "[ 1 / (1 − d) ] ^ (365 / N) − 1",
    where: "d = discount as a decimal · N = days saved by paying early",
    use: "Compare the annualised cost against the overdraft rate. Offering a discount is only sensible when the saving beats what the money costs.",
  },
  {
    id: "miller-orr", papers: ["FM"], group: "Treasury",
    name: "Miller–Orr model",
    expression: "Spread = 3 × [ (¾ × Ct × σ²) / i ] ^⅓\nUpper = Lower + Spread      Return point = Lower + Spread/3",
    where: "Ct = transaction cost · σ² = variance of daily cash flows · i = daily interest rate",
    use: "For cash flows that vary unpredictably. The return point is one THIRD of the way up, not the midpoint — a frequently missed detail.",
  },
  {
    id: "ppp-irp", papers: ["FM", "AFM"], group: "Foreign exchange",
    name: "Purchasing power and interest rate parity",
    expression: "PPP:  S₁ = S₀ × (1 + hc)/(1 + hb)\nIRP:  F₀ = S₀ × (1 + ic)/(1 + ib)",
    where: "c = counter (variable) currency · b = base currency · h = inflation · i = interest",
    use: "The currency on TOP of the exchange-rate quote takes the top of the fraction. Getting that the wrong way round inverts the answer.",
  },

  // ── FR / FA · analysis ──
  {
    id: "profitability", papers: ["FA", "FR"], group: "Ratios",
    name: "Profitability",
    expression: "Gross margin = Gross profit / Revenue × 100\nOperating margin = PBIT / Revenue × 100\nROCE = PBIT / (Equity + Non-current liabilities) × 100",
    use: "ROCE is the headline for performance questions. Decompose it as margin × asset turnover to say WHY it moved rather than that it moved.",
  },
  {
    id: "liquidity", papers: ["FA", "FR"], group: "Ratios",
    name: "Liquidity and gearing",
    expression: "Current = Current assets / Current liabilities\nQuick = (Current assets − Inventory) / Current liabilities\nGearing = Debt / (Debt + Equity)  or  Debt / Equity\nInterest cover = PBIT / Finance cost",
    use: "State which gearing definition you used — both are accepted, and an unlabelled number cannot be marked.",
  },
  {
    id: "eps", papers: ["FR"], group: "Ratios",
    name: "Earnings per share",
    expression: "Basic EPS = Profit attributable to ordinary shareholders / Weighted average ordinary shares",
    use: "Weight shares by time in issue. A bonus issue is treated as if it had always existed, so restate the comparative too.",
  },

  // ── APM / AFM ──
  {
    id: "eva", papers: ["APM"], group: "Performance",
    name: "Economic value added",
    expression: "EVA = NOPAT − (WACC × Capital employed)",
    where: "NOPAT = operating profit after tax, adjusted for economic distortions",
    use: "Adjust for non-cash items and add back items treated as investment (R&D, marketing) to both NOPAT and capital. Say which adjustments you made.",
  },
  {
    id: "roi-ri", papers: ["APM"], group: "Performance",
    name: "ROI and residual income",
    expression: "ROI = Controllable profit / Controllable capital employed × 100\nRI = Controllable profit − (Imputed interest × Capital employed)",
    use: "ROI can make a manager reject a project that is good for the group; RI does not. That contrast is the mark, not the arithmetic.",
  },
  {
    id: "mm", papers: ["AFM"], group: "Capital structure",
    name: "Modigliani–Miller with tax",
    expression: "Vg = Vu + (D × T)\nKeg = Keu + (Keu − Kd)(1 − T)(D/E)",
    where: "Vg = geared value · Vu = ungeared value · D×T = the tax shield",
    use: "The value added is only the tax shield. Every exam answer should also say why the conclusion breaks down in reality — bankruptcy and agency costs.",
  },
] as const

/** Papers that have any formulae in the kit, in ACCA order. */
export const FORMULA_PAPERS: readonly string[] = ["FA", "MA", "FR", "PM", "FM", "APM", "AFM"] as const

/** Formulae for a paper, or all of them when no paper is given. */
export function formulasFor(paperId?: string | null): KitFormula[] {
  if (!paperId) return [...KIT_FORMULAS]
  return KIT_FORMULAS.filter((f) => f.papers.includes(paperId))
}

/* ── Calculator arithmetic ────────────────────────────────────── */

export type CalcOp = "+" | "−" | "×" | "÷"

/**
 * One binary step, with division by zero returning null rather than Infinity.
 *
 * A calculator that prints "Infinity" into a working looks broken and, worse,
 * can be copied into an answer. The caller shows an error state instead.
 */
export function applyOp(a: number, b: number, op: CalcOp): number | null {
  switch (op) {
    case "+": return a + b
    case "−": return a - b
    case "×": return a * b
    case "÷": return b === 0 ? null : a / b
  }
}

/**
 * Display formatting: full precision up to what a double can be trusted for,
 * with thousands separators, and no exponent for numbers of exam size.
 *
 * ACCA answers are money, so trailing float noise (0.30000000000000004) is both
 * ugly and a real source of "my answer does not match" — 12 significant figures
 * removes it without rounding anything a candidate would actually type.
 */
export function formatCalc(value: number): string {
  if (!Number.isFinite(value)) return "Error"
  const trimmed = Number(value.toPrecision(12))
  if (Math.abs(trimmed) >= 1e12 || (trimmed !== 0 && Math.abs(trimmed) < 1e-6)) {
    return trimmed.toExponential(6)
  }
  return trimmed.toLocaleString("en-GB", { maximumFractionDigits: 10 })
}

/** Free-text search across every field a learner might remember a formula by. */
export function searchFormulas(list: readonly KitFormula[], query: string): KitFormula[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...list]
  return list.filter((f) =>
    [f.name, f.group, f.expression, f.where ?? "", f.use, f.papers.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(q),
  )
}
