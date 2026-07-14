import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area B — Advanced investment appraisal.
 * Strategic, heavily computational: NPV with complex tax & inflation, the APV
 * method, Modigliani–Miller with tax, CAPM with un/re-geared betas (Hamada),
 * real options via Black–Scholes, and international appraisal (PPP/IRP).
 * Original, syllabus-aligned; every calculation re-solved digit-by-digit.
 */

export const AFM_B: StudyChapter = {
  paper: "AFM",
  area: "B",
  title: "Advanced investment appraisal",
  minutes: 19,
  intro: "At AFM level, NPV grows up. The cash flows carry inflation and lagged tax, the discount rate is engineered from a beta you must un-gear and re-gear, the financing is valued separately with APV, and the flexibility to wait or expand is priced as a real option.",
  outcomes: [
    "Build a money-basis NPV with inflation, tax on operating flows and tax-allowable depreciation",
    "Apply the Adjusted Present Value (APV) method: base-case NPV at the ungeared cost of equity, plus financing side-effects",
    "State Modigliani–Miller with tax and value the debt tax shield",
    "Un-gear and re-gear beta with the Hamada (asset-beta) formula and price equity with CAPM",
    "Value the option to delay, expand or abandon a project using the Black–Scholes model",
    "Appraise a foreign-currency project, forecasting rates via purchasing power parity and interest rate parity",
  ],
  sections: [
    {
      id: "npv-tax-inflation",
      heading: "NPV with complex tax and inflation",
      blocks: [
        { kind: "text", md: "A basic NPV discounts a tidy stream of cash. At AFM the stream is realistic: prices **inflate**, profits are **taxed** (often a year in arrears), and the tax bill is softened by **tax-allowable depreciation** (capital allowances). Get these three right and the discount rate almost looks after itself." },
        { kind: "text", md: "Two consistent routes reach the same NPV. The **money (nominal) method** inflates every cash flow to the actual number of dollars that will change hands, then discounts at the **money cost of capital**. The **real method** keeps cash flows in today's prices and discounts at the **real rate**. They must agree — and in the exam the money method is almost always cleaner, because tax and allowances are inherently nominal amounts." },
        { kind: "formula", name: "Fisher effect (links the two rates)", expr: "(1 + i) = (1 + r) × (1 + h)", note: "i = money rate, r = real rate, h = general inflation. So a 6% real rate with 4% inflation gives (1.06)(1.04) − 1 = 10.24% money rate." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two routes, one NPV",
          caption: "Never mix them: real cash flows need the real rate; money cash flows need the money rate.",
          data: {
            leftTitle: "Real method",
            rightTitle: "Money (nominal) method",
            rows: [
              { aspect: "Cash flows", left: "Today's prices", right: "Inflated to actual dollars" },
              { aspect: "Discount rate", left: "Real rate r", right: "Money rate i" },
              { aspect: "Tax & allowances", left: "Awkward — these are nominal", right: "Handled naturally" },
              { aspect: "Fisher link", left: "(1 + r)", right: "(1 + i) = (1 + r)(1 + h)" },
              { aspect: "Exam preference", left: "Rarely used", right: "The standard approach" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — the two methods agree", scenario: "A cash flow is worth $10,000 in today's (real) prices and arrives in one year. Specific inflation is 4%, the real cost of capital is 6%. Discount it both ways.", steps: [
          { label: "Money cash flow", detail: "Inflate: $10,000 × 1.04 = $10,400 (the actual dollars received)." },
          { label: "Money rate (Fisher)", detail: "(1.06)(1.04) − 1 = 1.1024 − 1 = 10.24%." },
          { label: "Money method PV", detail: "$10,400 ÷ 1.1024 = $9,433.96." },
          { label: "Real method PV", detail: "$10,000 ÷ 1.06 = $9,433.96." },
        ], result: "Both give $9,433.96. The methods are identical — provided you never discount a real flow at a money rate (a classic marking-scheme trap)." },
        { kind: "callout", tone: "rule", title: "Tax has three moving parts", md: "**(1)** Tax on operating cash flow (e.g. 25% of the net taxable inflow). **(2)** Tax relief on **tax-allowable depreciation** — the allowance itself is not a cash flow, but the tax it saves is. **(3)** A **one-year lag**: many questions pay/receive tax the year after the profit arises, so the tax column is shifted right by one period before discounting." },
        { kind: "callout", tone: "tip", md: "Layout beats memory. Build a **money-basis pro-forma**: rows for inflated revenue, inflated costs, taxable profit, tax (lagged), tax-depreciation relief (lagged), then net the columns and discount at the money rate. Neat columns earn method marks even when an arithmetic slip costs an answer mark." },
      ],
    },
    {
      id: "apv",
      heading: "Adjusted present value (APV)",
      blocks: [
        { kind: "text", md: "Ordinary NPV bundles the investment decision and the financing decision into one WACC. **APV pulls them apart.** First value the project as if it were **all-equity financed** — the *base-case NPV*, discounted at the **ungeared cost of equity** (Keu). Then add, separately, the present value of every **financing side-effect** that the specific funding brings: mainly the **debt tax shield**, less any **issue costs**." },
        { kind: "text", md: "APV shines exactly when WACC struggles: a project whose **capital structure changes over its life**, or one financed by a special package (subsidised loans, a one-off debt issue). Because WACC assumes a constant gearing ratio, it cannot handle these; APV values each piece on its own merits." },
        { kind: "formula", name: "Adjusted present value", expr: "APV = Base-case NPV  +  PV of debt tax shield  −  Issue costs", note: "Base-case NPV uses Keu (the ungeared / asset cost of equity), NOT the WACC." },
        { kind: "formula", name: "PV of the debt tax shield", expr: "Annual shield = Kd × D × t   →   discount at Kd (the cost of debt)", note: "Kd = pre-tax cost of debt, D = debt principal, t = tax rate. The tax relief on interest is a near-certain saving, so it is discounted at the debt rate." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The APV method, step by step",
          caption: "Value the business, then value the way it is funded — and add.",
          data: {
            steps: [
              { label: "Base-case NPV", sub: "all-equity cash flows discounted at Keu" },
              { label: "+ Debt tax shield", sub: "PV of Kd × D × t" },
              { label: "− Issue costs", sub: "one-off cost of raising the finance" },
              { label: "= APV", sub: "accept if positive" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — a full APV", scenario: "A project costs $10m now and runs 4 years. Pre-tax operating cash flow is $3.5m a year. Tax is 20%, paid in the same year. Tax-allowable depreciation is straight-line: $10m ÷ 4 = $2.5m a year. The ungeared cost of equity (Keu) is 10%. It is part-financed by a new $4m loan at 8%; issue costs are $0.12m. (4-yr annuity factors: 3.170 at 10%, 3.312 at 8%.)", steps: [
          { label: "After-tax operating flow", detail: "$3.5m × (1 − 0.20) = $2.8m a year." },
          { label: "Tax relief on depreciation", detail: "$2.5m × 20% = $0.5m a year saved. Base-case annual flow = $2.8m + $0.5m = $3.3m." },
          { label: "Base-case NPV", detail: "$3.3m × 3.170 − $10m = $10.4610m − $10m = +$0.4610m." },
          { label: "Debt tax shield", detail: "Annual shield = 8% × $4m × 20% = $0.064m. PV = $0.064m × 3.312 = $0.2120m." },
          { label: "Issue costs", detail: "One-off outflow of $0.12m." },
          { label: "APV", detail: "$0.4610m + $0.2120m − $0.12m = +$0.5530m." },
        ], result: "APV ≈ +$0.55m. The project is worth doing on its own merits (+$0.46m), and its financing adds a further net $0.09m ($0.21m shield − $0.12m issue costs)." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "APV bridge — building up from base case to APV",
          caption: "Figures in $000. Financing side-effects are added on top of the all-equity value.",
          data: {
            unit: "$000",
            items: [
              { label: "Base-case NPV (at Keu)", value: 461, kind: "start" },
              { label: "+ PV of debt tax shield", value: 212, kind: "delta" },
              { label: "− Issue costs", value: -120, kind: "delta" },
              { label: "APV", value: 553, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The Keu trap", md: "The base-case NPV must use the **ungeared** cost of equity, not the WACC and not the geared Keg. If the question gives you a geared beta or a WACC, you must **un-gear** it first (see Section 4). Discounting the base case at WACC double-counts the tax shield — once in the low WACC and again as a side-effect." },
      ],
      check: {
        q: "A project has a base-case NPV of −$0.2m. Debt financing brings a tax shield with a PV of $0.5m, and issue costs are $0.1m. What is the APV?",
        options: [
          "−$0.8m — reject",
          "+$0.2m — accept",
          "+$0.4m — accept",
          "+$0.6m — accept",
        ],
        correct: 1,
        explain: "APV = base-case NPV + PV of tax shield − issue costs = −0.2 + 0.5 − 0.1 = +$0.2m. The financing benefit rescues a project the all-equity base case would reject — exactly why APV values the two decisions separately.",
      },
    },
    {
      id: "mm",
      heading: "Modigliani–Miller and the value of gearing",
      blocks: [
        { kind: "text", md: "APV rests on a theory: **Modigliani–Miller (MM)**. Without tax, MM says capital structure is **irrelevant** — a geared firm and an identical ungeared firm are worth the same, because investors can borrow on their own account to replicate any gearing (\"homemade leverage\"). Cheap debt is exactly offset by a rising cost of equity, so **WACC is constant**." },
        { kind: "text", md: "**Introduce corporate tax** and the picture tilts. Interest is tax-deductible, so debt creates a **tax shield** that belongs to the firm's investors. The geared firm is now worth *more* — by the present value of that shield — and WACC **falls** as gearing rises." },
        { kind: "formula", name: "MM Proposition I with tax", expr: "Vg = Vu + (D × t)", note: "Vg = value geared, Vu = value ungeared, D = debt, t = tax rate. (D × t) is the PV of the perpetual debt tax shield." },
        { kind: "formula", name: "MM Proposition II with tax (cost of equity)", expr: "Keg = Keu + (Keu − Kd) × (1 − t) × (Vd / Ve)", note: "Cost of equity rises with gearing to reward financial risk — but the (1 − t) factor means it rises by LESS than the tax saving, so WACC still falls." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "MM without tax vs with tax",
          data: {
            leftTitle: "MM without tax",
            rightTitle: "MM with tax",
            rows: [
              { aspect: "Firm value", left: "Vg = Vu (irrelevant)", right: "Vg = Vu + D×t" },
              { aspect: "WACC", left: "Constant", right: "Falls as gearing rises" },
              { aspect: "Cost of equity", left: "Rises to offset cheap debt", right: "Rises, but by less than the tax saving" },
              { aspect: "Optimal gearing", left: "None — indifferent", right: "100% debt (in theory)" },
              { aspect: "Real-world limit", left: "—", right: "Bankruptcy & agency costs cap gearing" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — value of the tax shield and Keg", scenario: "An ungeared firm is worth Vu = $20m. It issues $8m of debt at 6%; tax is 25%. Its ungeared cost of equity Keu is 12%. Find the geared value, the equity value, and the geared cost of equity.", steps: [
          { label: "Geared value (Prop I)", detail: "Vg = 20 + (8 × 0.25) = $20m + $2m = $22m. The tax shield adds $2m." },
          { label: "Equity value", detail: "Ve = Vg − Vd = 22 − 8 = $14m." },
          { label: "Cost of equity (Prop II)", detail: "Keg = 0.12 + (0.12 − 0.06)(1 − 0.25)(8 / 14) = 0.12 + 0.06 × 0.75 × 0.571429." },
          { label: "Finish Keg", detail: "= 0.12 + 0.045 × 0.571429 = 0.12 + 0.025714 = 0.145714 ≈ 14.57%." },
        ], result: "Gearing lifts firm value by the $2m tax shield and raises the cost of equity to 14.57% — but because the rise is muted by (1 − t), the weighted WACC still falls below the all-equity 12%." },
        { kind: "callout", tone: "key", title: "Why APV needs MM", md: "The APV split — base case at Keu **plus** a separately-valued tax shield — is literally MM Proposition I with tax rearranged into cash-flow terms. Vg = Vu + tax shield becomes: project value if all-equity **+** the value the financing adds." },
      ],
    },
    {
      id: "beta",
      heading: "Risk-adjusted discount rates: un-gearing and re-gearing beta",
      blocks: [
        { kind: "text", md: "A single company WACC only fits projects with the company's own business and financial risk. For a project in a **different industry**, or a firm with **different gearing**, you must build a bespoke discount rate. The route is CAPM — but you cannot use a listed company's **equity beta** directly, because it is contaminated by *that* company's gearing." },
        { kind: "text", md: "So use a three-step **pure-play** technique. **(1)** Take a quoted company (a \"proxy\") in the target business. **(2) Un-gear** its equity beta to strip out its financial risk, leaving the **asset (ungeared) beta** — pure business risk. **(3) Re-gear** that asset beta into *your* capital structure to get the equity beta you actually need, then feed it into CAPM." },
        { kind: "formula", name: "Un-gear — the asset (Hamada) beta", expr: "βa = βe × Ve / (Ve + Vd(1 − t))", note: "Assumes debt beta is zero. βa isolates business risk by removing the proxy's financial risk." },
        { kind: "formula", name: "Re-gear into your structure", expr: "βe = βa × [1 + Vd(1 − t) / Ve]", note: "Adds back financial risk at YOUR gearing. This is the same formula rearranged for βe." },
        { kind: "formula", name: "CAPM — cost of equity", expr: "Ke = Rf + βe × (Rm − Rf)", note: "Rf = risk-free rate, (Rm − Rf) = the equity market risk premium." },
        { kind: "example", title: "Worked example — un-gear then re-gear", scenario: "A proxy firm in the target industry has an equity beta of 1.40 and gearing of Vd:Ve = 1:2. Your company operates at Vd:Ve = 1:4. Tax is 20% for both. The risk-free rate is 4% and the market risk premium is 6%. Find your project cost of equity.", steps: [
          { label: "Un-gear the proxy (Ve = 2, Vd = 1)", detail: "βa = 1.40 × 2 / (2 + 1 × (1 − 0.20)) = 1.40 × 2 / (2 + 0.8) = 1.40 × 2 / 2.8." },
          { label: "Asset beta", detail: "= 1.40 × 0.714286 = 1.00. Pure business risk of the industry." },
          { label: "Re-gear to your firm (Ve = 4, Vd = 1)", detail: "βe = 1.00 × [1 + 1 × (1 − 0.20) / 4] = 1.00 × [1 + 0.8/4] = 1.00 × 1.20 = 1.20." },
          { label: "CAPM", detail: "Ke = 4% + 1.20 × 6% = 4% + 7.2% = 11.2%." },
        ], result: "Your project cost of equity is 11.2%. Notice the asset beta (1.00) is lower than either firm's equity beta — un-gearing always reduces beta, because it removes financial risk." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Beta through the un-gear / re-gear cycle",
          caption: "Un-gearing strips financial risk (1.40 → 1.00); re-gearing adds your own back (1.00 → 1.20).",
          data: {
            items: [
              { label: "Proxy equity β (geared 1:2)", value: 1.40 },
              { label: "Asset β (ungeared)", value: 1.00 },
              { label: "Your equity β (re-geared 1:4)", value: 1.20 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "For an APV base-case rate you stop at the **asset beta**: put βa into CAPM to get **Keu**. For a WACC you go all the way to the re-geared **equity beta**. Knowing which beta feeds which rate is the whole game." },
      ],
      check: {
        q: "A proxy firm has an asset (ungeared) beta of 0.80. Your gearing is Vd:Ve = 1:3 with tax at 20%. What is your re-geared equity beta?",
        options: [
          "0.80 — no re-gearing needed",
          "1.07 — ignoring the tax shield",
          "1.01",
          "0.63",
        ],
        correct: 2,
        explain: "βe = βa × [1 + Vd(1 − t)/Ve] = 0.80 × [1 + (1 × 0.8)/3] = 0.80 × 1.26667 = 1.01. Gearing adds financial risk, so equity beta rises above the asset beta. 1.07 wrongly drops the (1 − t) factor; 0.63 mistakenly un-gears a beta that is already ungeared.",
      },
    },
    {
      id: "real-options",
      heading: "Real options — valuing flexibility with Black–Scholes",
      blocks: [
        { kind: "text", md: "NPV assumes you decide **now** and then stand still. Reality is richer: managers can **delay** a launch until uncertainty clears, **expand** if a pilot succeeds, or **abandon** if it fails. Each of these is a **real option** — the right, but not the obligation, to act — and each has value that a static NPV **ignores**, systematically understating good projects with embedded flexibility." },
        { kind: "text", md: "The key insight: an option to invest later is a **call option** on the project. Its underlying asset price is the PV of the project's future cash flows (Pa); its exercise price is the investment outlay (Pe). So the **Black–Scholes** model prices it." },
        { kind: "formula", name: "Black–Scholes — the two d terms", expr: "d1 = [ ln(Pa / Pe) + (r + 0.5σ²)T ] / (σ√T)      d2 = d1 − σ√T", note: "Pa = PV of the underlying (project) cash flows, Pe = exercise price, r = risk-free rate, σ = volatility, T = time to expiry (years)." },
        { kind: "formula", name: "Black–Scholes — value of the call", expr: "c = Pa × N(d1) − Pe × N(d2) × e^(−rT)", note: "N(d1), N(d2) are cumulative normal probabilities from tables. e^(−rT) discounts the exercise price continuously." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Valuing the option to delay",
          caption: "Five inputs → two d-terms → the call value → the decision.",
          data: {
            steps: [
              { label: "Estimate 5 inputs", sub: "Pa, Pe, T, r, σ" },
              { label: "Compute d1, d2", sub: "then read N(d1), N(d2)" },
              { label: "Value the call", sub: "c = Pa·N(d1) − Pe·N(d2)·e^(−rT)" },
              { label: "Compare with NPV now", sub: "option value vs invest-now NPV" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — the option to delay (Black–Scholes)", scenario: "A firm can invest in a project in up to 2 years' time. The PV of the project's cash flows is Pa = $16m; the investment cost is Pe = $15m. Volatility σ = 30%, the risk-free rate r = 5%, time T = 2 years. Value the option to wait. (N(0.60) = 0.7257, N(0.18) = 0.5714.)", steps: [
          { label: "ln(Pa/Pe)", detail: "ln(16 / 15) = ln(1.06667) = 0.064539." },
          { label: "(r + 0.5σ²)T", detail: "(0.05 + 0.5 × 0.30²) × 2 = (0.05 + 0.045) × 2 = 0.095 × 2 = 0.19." },
          { label: "σ√T", detail: "0.30 × √2 = 0.30 × 1.414214 = 0.424264." },
          { label: "d1", detail: "(0.064539 + 0.19) / 0.424264 = 0.254539 / 0.424264 = 0.5999 ≈ 0.60." },
          { label: "d2", detail: "0.60 − 0.424264 = 0.175736 ≈ 0.18. So N(d1) = 0.7257, N(d2) = 0.5714." },
          { label: "e^(−rT)", detail: "e^(−0.05 × 2) = e^(−0.10) = 0.904837." },
          { label: "Call value", detail: "c = 16 × 0.7257 − 15 × 0.5714 × 0.904837 = 11.6112 − 7.7554 = $3.86m." },
        ], result: "The option to delay is worth $3.86m. Investing now gives an NPV of only Pa − Pe = $16m − $15m = $1m. Because the option ($3.86m) exceeds invest-now NPV ($1m), the firm should WAIT — the flexibility to see how uncertainty resolves is worth far more than committing today." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Composition of the call value",
          caption: "Figures in $m. The call is the gap between the two Black–Scholes terms.",
          data: {
            unit: "$m",
            items: [
              { label: "Pa × N(d1)", value: 11.61 },
              { label: "Pe × N(d2) × e^(−rT)", value: 7.76 },
              { label: "Call value (option)", value: 3.86 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Map the inputs correctly", md: "The commonest error is swapping Pa and Pe. **Pa = PV of the project's cash inflows** (the asset you receive); **Pe = the cost of investing** (the price you pay to get it). Higher **volatility σ** *raises* the option value — more uncertainty means more upside to capture and a floor of zero on the downside." },
      ],
      check: {
        q: "A firm can invest now for a project NPV of +$1m, or hold a two-year option to invest whose Black–Scholes value is $3.86m. What does the option analysis advise?",
        options: [
          "Invest now — $1m is certain",
          "Wait — the option to delay ($3.86m) is worth more than investing now (+$1m)",
          "Reject — the option value is irrelevant to the decision",
          "The two are equal, so it makes no difference",
        ],
        correct: 1,
        explain: "The right to invest later — and to walk away if things sour — is worth $3.86m, far more than the $1m gained by committing today. Flexibility has value; static NPV ignores it and would understate the opportunity.",
      },
    },
    {
      id: "international",
      heading: "International investment appraisal",
      blocks: [
        { kind: "text", md: "A project abroad earns cash in a **foreign currency**, but the parent values everything in its home currency. Two consistent approaches exist. **Approach 1 (home-currency):** forecast each year's exchange rate, convert the foreign cash flows to home currency, then discount at the **home** cost of capital. **Approach 2 (foreign-currency):** discount the foreign cash flows at the **foreign** cost of capital, then convert the single foreign PV at today's spot rate. Approach 1 is the exam norm because tax and remittance restrictions are easier to handle year by year." },
        { kind: "text", md: "The engine of Approach 1 is a **forecast of future exchange rates**. Two parity relationships supply them. **Purchasing power parity (PPP)** forecasts the expected *future spot* from relative **inflation**; **interest rate parity (IRP)** gives the *forward* rate from relative **interest** rates." },
        { kind: "formula", name: "Purchasing power parity (future spot)", expr: "S1 = S0 × (1 + hf) / (1 + hc)", note: "S0 = spot (units of foreign per 1 unit of home), hf = foreign inflation, hc = home (counter) inflation. The higher-inflation currency depreciates." },
        { kind: "formula", name: "Interest rate parity (forward rate)", expr: "F0 = S0 × (1 + if) / (1 + ic)", note: "if = foreign interest rate, ic = home interest rate. Same structure as PPP but driven by interest rates; used for shorter-horizon forward rates." },
        { kind: "example", title: "Worked example — forecasting spot rates with PPP", scenario: "A US parent (home = $) appraises a euro project. Spot is €0.9000 per $1. Eurozone inflation is 3%, US inflation is 5%. Forecast the euro-per-dollar spot for years 1 and 2.", steps: [
          { label: "Annual multiplier", detail: "(1 + hf)/(1 + hc) = 1.03 / 1.05 = 0.980952." },
          { label: "Year 1 spot", detail: "€0.9000 × 0.980952 = €0.882857 per $." },
          { label: "Year 2 spot", detail: "€0.882857 × 0.980952 = €0.866047 per $." },
          { label: "Read the direction", detail: "Fewer euros per dollar each year — the dollar depreciates, because US inflation (5%) exceeds eurozone inflation (3%)." },
        ], result: "Forecast spots: €0.8829 (yr 1) and €0.8660 (yr 2) per $. Each year's euro cash flow is divided by that year's €/$ rate to convert it into the dollars the parent will actually receive, then discounted at the US cost of capital." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "PPP-forecast exchange rate (euros per $)",
          caption: "The dollar weakens against the euro as higher US inflation erodes it.",
          data: {
            unit: "EUR/$",
            items: [
              { label: "Spot (yr 0)", value: 0.9000 },
              { label: "Forecast yr 1", value: 0.8829 },
              { label: "Forecast yr 2", value: 0.8660 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Watch the quote direction", md: "PPP and IRP are quote-sensitive. If the rate is **foreign per home** (as above, €/$), the foreign-inflation term goes on **top**. If you quote **home per foreign** ($/€), flip the ratio. Always sanity-check: the currency of the **higher-inflation** country should end up **weaker**." },
        { kind: "callout", tone: "key", title: "Extra international complications", md: "Beyond the rate forecast, watch for **withholding taxes** on remittances, **blocked funds** (cash that cannot be sent home until later), and **double-tax relief**. These affect the timing and amount of the cash the parent actually receives — model them in the foreign-currency column *before* you convert." },
      ],
    },
  ],
  examTraps: [
    { trap: "Discounting the APV base case at WACC (or at the geared Keg).", fix: "The base case is all-equity: discount at the UNGEARED cost of equity Keu. Using WACC double-counts the debt tax shield." },
    { trap: "Dropping the (1 − t) tax factor when un-gearing or re-gearing beta.", fix: "βa = βe × Ve/(Ve + Vd(1 − t)). The (1 − t) reflects the debt tax shield — omit it and every downstream rate is wrong." },
    { trap: "Swapping Pa and Pe in Black–Scholes.", fix: "Pa = PV of the project's cash inflows (the asset); Pe = the investment cost (exercise price). Higher volatility σ raises the option value, never lowers it." },
    { trap: "Mixing real cash flows with a money discount rate (or vice versa).", fix: "Real flows → real rate; money flows → money rate. Link them with Fisher: (1 + i) = (1 + r)(1 + h)." },
    { trap: "Putting the parity inflation/interest terms the wrong way up.", fix: "With a foreign-per-home quote, the foreign term goes on top. Sanity-check: the higher-inflation currency must depreciate." },
  ],
  keyTerms: [
    { term: "Adjusted present value (APV)", def: "A valuation that separates the investment decision (base-case NPV at Keu) from the financing decision (PV of the debt tax shield less issue costs)." },
    { term: "Ungeared cost of equity (Keu)", def: "The return equity holders require for the project's business risk alone, with no financial (gearing) risk; the discount rate for an APV base case." },
    { term: "Debt tax shield", def: "The tax saved because interest is tax-deductible: Kd × D × t each year, discounted at the cost of debt." },
    { term: "Asset (ungeared) beta", def: "A beta reflecting business risk only, βa = βe × Ve/(Ve + Vd(1 − t)); found by un-gearing a proxy company's equity beta." },
    { term: "Real option", def: "The right but not the obligation to take a future action — delay, expand or abandon — whose value NPV ignores; priced with Black–Scholes." },
    { term: "Purchasing power parity (PPP)", def: "The theory that expected future spot rates move with relative inflation: S1 = S0 × (1 + hf)/(1 + hc)." },
  ],
  summary: [
    "Build NPV on a money basis: inflate cash flows, tax the operating profit (often lagged), and add the tax relief on tax-allowable depreciation; link real and money rates with Fisher.",
    "APV = base-case NPV at Keu + PV of the debt tax shield − issue costs; use it when gearing changes or financing is special.",
    "Modigliani–Miller with tax: Vg = Vu + D×t and WACC falls with gearing — the theory that justifies the APV split.",
    "Un-gear a proxy's equity beta to the asset beta, then re-gear into your own structure (Hamada), and price equity with CAPM.",
    "Real options price managerial flexibility with Black–Scholes: d1, d2, then c = Pa·N(d1) − Pe·N(d2)·e^(−rT); high volatility raises the value.",
    "For foreign projects, forecast rates with PPP/IRP, convert foreign cash flows to home currency each year, then discount at the home cost of capital.",
  ],
}
