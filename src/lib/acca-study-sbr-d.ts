import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area D — Financial instruments & employee benefits.
 * Strategic-level depth: IFRS 9 classification/measurement/ECL/hedging,
 * IAS 32 liability-vs-equity and compound instruments, IAS 19 defined benefit.
 * Original content, syllabus-aligned; no ACCA/Kaplan/BPP text. All numbers re-solved.
 */

export const SBR_D: StudyChapter = {
  paper: "SBR",
  area: "D",
  title: "Financial instruments & employee benefits",
  minutes: 18,
  intro: "Two of the most technical corners of the syllabus meet here: instruments that must be classified before they can be measured, and promises to employees that must be valued long before they fall due. Both reward a candidate who can reason from principle, not memory.",
  outcomes: [
    "Classify a financial asset using the business model and SPPI tests, and measure it at amortised cost, FVOCI or FVTPL",
    "Build an amortised-cost schedule using the effective interest method",
    "Apply the three-stage expected credit loss impairment model",
    "Explain derecognition and the three types of hedge relationship",
    "Split a compound instrument into its liability and equity components under IAS 32",
    "Reconcile a defined benefit plan and route service cost, net interest and remeasurements correctly under IAS 19",
  ],
  sections: [
    {
      id: "classification",
      heading: "IFRS 9 — classifying a financial asset",
      blocks: [
        { kind: "text", md: "Under IFRS 9 you cannot decide how to **measure** a financial asset until you have **classified** it, and classification turns on two questions asked in a fixed order. First, the **business model** the entity uses to manage the asset. Second, the **contractual cash flow characteristics** — the so-called **SPPI test**. Get both answers and the category falls out mechanically." },
        { kind: "text", md: "The **SPPI test** asks whether the contractual cash flows are **solely payments of principal and interest** on the principal outstanding — where interest is basic lending compensation (time value of money, credit risk, a profit margin). A plain loan or bond passes. An investment whose returns are linked to a share price, a commodity, or the borrower's profits **fails** SPPI, because those are not lending returns." },
        { kind: "formula", name: "SPPI — what \"interest\" may contain", expr: "Interest = time value of money + credit risk + other basic lending risks + a profit margin", note: "Anything beyond this (equity-linked, leverage, profit participation) fails SPPI and forces FVTPL." },
        { kind: "text", md: "The **business model** is judged at a portfolio level, not instrument by instrument. There are three: **hold to collect** the contractual cash flows; **hold to collect and sell**; and everything else (a trading or **other** model). Combine the two tests and only debt instruments can ever reach amortised cost or FVOCI — every **equity** investment is measured at fair value." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The IFRS 9 classification decision for a debt instrument",
          caption: "Both gates must be passed for amortised cost; failing SPPI sends the asset straight to FVTPL.",
          data: {
            steps: [
              { label: "Debt asset acquired", sub: "loan, bond or receivable" },
              { label: "SPPI test", sub: "cash flows solely principal & interest?" },
              { label: "Business model test", sub: "hold to collect / collect & sell / other" },
              { label: "Classify & measure", sub: "amortised cost, FVOCI or FVTPL" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The two gates", md: "**Amortised cost** = SPPI passed **and** hold-to-collect. **FVOCI** = SPPI passed **and** hold-to-collect-and-sell. Anything else — SPPI failed, or a trading model — is **FVTPL**." },
        { kind: "text", md: "Two elections sit alongside the default rules. An **equity** investment that is not held for trading may, on an **irrevocable** basis and instrument by instrument, be designated at **FVOCI** — but its gains and losses are **never recycled** to profit or loss, even on sale (only dividends hit P/L). Separately, any asset may be designated at **FVTPL** on initial recognition if doing so removes an **accounting mismatch**." },
      ],
      check: {
        q: "An entity holds a corporate bond in a portfolio managed both to collect the coupons and to sell when prices are favourable. The bond pays a fixed coupon and repays par. How is it classified?",
        options: [
          "Amortised cost",
          "Fair value through other comprehensive income (FVOCI)",
          "Fair value through profit or loss (FVTPL)",
          "It cannot be a financial asset",
        ],
        correct: 1,
        explain: "The fixed coupon plus par repayment passes SPPI. The business model is hold-to-collect-AND-sell, not pure hold-to-collect, so the asset is measured at FVOCI: interest and impairment go to P/L on an amortised-cost basis, while the remaining fair value movements sit in OCI and are recycled on disposal.",
      },
    },
    {
      id: "measurement",
      heading: "Measuring the three categories & the effective interest method",
      blocks: [
        { kind: "text", md: "Each category has its own measurement rhythm. **Amortised cost** carries the asset using the **effective interest method** — impairment and interest hit profit or loss, and there is no fair value on the balance sheet. **FVOCI** (debt) shows fair value on the face of the statement but still runs interest and expected credit losses through P/L, parking the balance of the fair value change in OCI to be **recycled** on disposal. **FVTPL** is the simplest: remeasure to fair value every period with the whole movement in profit or loss." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Debt instruments — amortised cost vs FVOCI vs FVTPL",
          data: {
            leftTitle: "Amortised cost",
            rightTitle: "FVOCI (debt)",
            rows: [
              { aspect: "Balance sheet", left: "Amortised cost", right: "Fair value" },
              { aspect: "Interest to P/L", left: "Yes — effective interest", right: "Yes — effective interest" },
              { aspect: "Expected credit loss", left: "Yes — in P/L", right: "Yes — in P/L" },
              { aspect: "Fair value movement", left: "Not recognised", right: "In OCI, recycled on sale" },
              { aspect: "Business model", left: "Hold to collect", right: "Hold to collect and sell" },
            ],
          },
        } },
        { kind: "text", md: "The engine under amortised cost is the **effective interest rate (EIR)** — the rate that discounts the estimated future cash receipts or payments to the **net carrying amount** at initial recognition. Each period the carrying amount is grossed up by the EIR (that is the finance income or cost in P/L) and reduced by the cash coupon actually paid. Transaction costs are folded into the opening carrying amount, which is exactly why the EIR usually differs from the coupon rate." },
        { kind: "formula", name: "Effective interest method (each period)", expr: "Closing carrying amount = Opening carrying amount + (Opening × EIR) − Coupon cash flow", note: "The term (Opening × EIR) is the finance cost/income recognised in profit or loss." },
        { kind: "example", title: "Worked example — a financial liability at amortised cost", scenario: "On 1 January 20X1 an entity issues a bond, receiving net proceeds of $9,500 after issue costs. The bond has a nominal value of $10,000, pays a coupon of 5% ($500) annually in arrears, and is redeemable at a premium on 31 December 20X3. The effective interest rate is 10%. Build the amortised-cost schedule.", steps: [
          { label: "Year 1 finance cost", detail: "Opening $9,500 × 10% = $950. Less coupon $500 → closing carrying amount $9,500 + $950 − $500 = $9,950." },
          { label: "Year 2 finance cost", detail: "Opening $9,950 × 10% = $995. Less coupon $500 → closing $9,950 + $995 − $500 = $10,445." },
          { label: "Year 3 finance cost", detail: "Opening $10,445 × 10% = $1,044.50. Less coupon $500 → closing $10,445 + $1,044.50 − $500 = $10,989.50." },
          { label: "Redemption", detail: "The $10,989.50 closing carrying amount is the cash repaid on 31 Dec 20X3 — par $10,000 plus the accumulated premium of $989.50." },
        ], result: "Finance cost in P/L: $950, then $995, then $1,044.50. The liability is carried at $9,950, $10,445 and finally $10,989.50 — the coupon of 5% never appears as the expense; the 10% effective charge does." },
        { kind: "table", caption: "Amortised-cost schedule (financial liability)", head: ["Year", "Opening", "Finance cost (10%)", "Coupon paid", "Closing"], rows: [
          ["20X1", "9,500.00", "950.00", "(500.00)", "9,950.00"],
          ["20X2", "9,950.00", "995.00", "(500.00)", "10,445.00"],
          ["20X3", "10,445.00", "1,044.50", "(500.00)", "10,989.50"],
        ] },
      ],
    },
    {
      id: "ecl",
      heading: "Expected credit losses — the three-stage model",
      blocks: [
        { kind: "text", md: "IFRS 9 replaced the old **incurred-loss** model, which waited for a trigger before recognising a loss, with a forward-looking **expected credit loss (ECL)** model: a loss allowance is booked from **day one**, before any default has occurred. The allowance is a probability-weighted estimate of cash shortfalls, discounted at the effective interest rate." },
        { kind: "formula", name: "Expected credit loss", expr: "ECL = Probability of default (PD) × Loss given default (LGD) × Exposure at default (EAD)", note: "A probability-weighted present value of the cash shortfalls, not a worst-case number." },
        { kind: "text", md: "The general model moves an asset through **three stages** according to how its credit risk has changed since initial recognition. The stage sets **two** things: how much loss to provide, and what balance interest is calculated on." },
        { kind: "table", caption: "The three stages of the general ECL model", head: ["Stage", "Trigger", "Loss allowance", "Interest calculated on"], rows: [
          ["1 — performing", "No significant increase in credit risk", "12-month ECL", "Gross carrying amount"],
          ["2 — under-performing", "Significant increase in credit risk (SICR)", "Lifetime ECL", "Gross carrying amount"],
          ["3 — credit-impaired", "Objective evidence of impairment", "Lifetime ECL", "Net (amortised cost) carrying amount"],
        ] },
        { kind: "callout", tone: "rule", title: "The Stage 3 switch", md: "Only when an asset becomes **credit-impaired** (Stage 3) does interest move from the **gross** carrying amount to the **net** amount (gross less the loss allowance). Stages 1 and 2 both accrue interest on the gross amount — the difference between them is only the size of the allowance." },
        { kind: "text", md: "Some assets skip the staging altogether. For **trade receivables**, contract assets and lease receivables, IFRS 9 permits (or requires) a **simplified approach**: recognise **lifetime** ECL from the outset, typically via a **provision matrix** that applies historical loss rates by ageing band, adjusted for forward-looking economic expectations. No staging assessment is needed." },
      ],
      check: {
        q: "A loan asset has moved into Stage 2 because the borrower's credit risk has increased significantly, though no default has yet occurred. Which statement is correct?",
        options: [
          "Interest is now calculated on the net carrying amount",
          "A 12-month ECL allowance is held and interest is on the gross amount",
          "A lifetime ECL allowance is held and interest is on the gross amount",
          "No allowance is required until an actual default occurs",
        ],
        correct: 2,
        explain: "A significant increase in credit risk moves the asset to Stage 2: the allowance steps up from 12-month to LIFETIME expected credit losses. Interest, however, is still calculated on the GROSS carrying amount — the switch to interest on the net amount happens only at Stage 3 (credit-impaired).",
      },
    },
    {
      id: "derecognition-hedging",
      heading: "Derecognition & hedge accounting",
      blocks: [
        { kind: "text", md: "A financial **asset** is derecognised when the contractual rights to its cash flows **expire**, or when it is transferred and the entity passes on **substantially all the risks and rewards** of ownership. If it keeps substantially all risks and rewards — a sale with a total recourse guarantee, say — the asset stays on the balance sheet even though legal title has moved. A financial **liability** is derecognised only when it is **extinguished** — discharged, cancelled or expired." },
        { kind: "text", md: "**Hedge accounting** is optional. Its purpose is to override the normal timing rules so that the gain or loss on a **hedging instrument** (usually a derivative) is recognised in the **same period** as the offsetting loss or gain on the **hedged item** — matching the two and removing volatility that is economically meaningless. To use it the entity needs formal designation and documentation, and an **economic relationship** between item and instrument. IFRS 9 recognises three types." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Fair value hedge vs cash flow hedge",
          data: {
            leftTitle: "Fair value hedge",
            rightTitle: "Cash flow hedge",
            rows: [
              { aspect: "Risk hedged", left: "Change in fair value of an asset/liability", right: "Variability in future cash flows" },
              { aspect: "Example", left: "Fixed-rate debt, gold inventory", right: "Forecast sale, floating-rate loan" },
              { aspect: "Instrument gain/loss", left: "Profit or loss", right: "OCI (effective portion)" },
              { aspect: "Hedged item", left: "Remeasured for the hedged risk, to P/L", right: "Not remeasured (may be forecast)" },
              { aspect: "Recycling", left: "Not applicable", right: "OCI reclassified when item hits P/L" },
            ],
          },
        } },
        { kind: "text", md: "The third type, a **net investment hedge** — hedging the foreign-exchange exposure on a net investment in a foreign operation — is accounted for like a cash flow hedge: the effective portion of the instrument's gain or loss goes to **OCI** (the translation reserve) and is **recycled** to profit or loss only on **disposal** of the foreign operation. Any **ineffective** portion of any hedge always goes straight to profit or loss." },
        { kind: "callout", tone: "tip", md: "A quick read: hedging the **value** of something you already hold → fair value hedge, all through **P/L**. Hedging **future cash flows** that have not yet happened → cash flow hedge, effective portion parked in **OCI** until the cash flows land." },
      ],
    },
    {
      id: "ias32-compound",
      heading: "IAS 32 — liability vs equity & compound instruments",
      blocks: [
        { kind: "text", md: "IAS 32 decides, from the **substance** of the contract, whether an instrument is a financial **liability** or **equity** — not from its legal form or its name. The test is a single question: is there a **contractual obligation** to deliver cash or another financial asset (or to exchange on potentially unfavourable terms)? If yes, it is a **liability**. If the issuer can avoid delivering cash — a discretionary dividend, settlement in its own shares in a fixed-for-fixed exchange — it is **equity**." },
        { kind: "callout", tone: "warn", title: "Names deceive", md: "**Redeemable** preference shares that pay a mandatory dividend are a financial **liability**, and their dividend is an **expense** in P/L — despite being called shares. **Irredeemable** shares with discretionary dividends are equity. Always follow the obligation, not the label." },
        { kind: "text", md: "A **compound instrument** — classically a **convertible bond** — contains **both** elements: an obligation to pay coupons and repay cash (a liability) **and** the holder's option to convert into a fixed number of shares (equity). IAS 32 requires the two to be **split** at issue. The method is prescribed and one-directional: value the **liability first** as the present value of the contractual cash flows discounted at the market rate for **similar debt without** the conversion option; the **equity** component is simply the **residual**." },
        { kind: "formula", name: "Compound instrument split (at issue)", expr: "Liability = PV of contractual cash flows at the market rate for similar non-convertible debt;  Equity = Proceeds − Liability", note: "The equity component is never measured directly — it is always the balancing figure." },
        { kind: "example", title: "Worked example — splitting a convertible bond", scenario: "On 1 January 20X1 an entity issues convertible bonds at par, raising $5,000,000. The bonds carry a coupon of 4% ($200,000) paid annually and are redeemable at par on 31 December 20X3, or convertible into ordinary shares at that date. The market rate for similar debt without the conversion option is 9%. Split the proceeds. (Use 9% discount factors: Yr1 0.917, Yr2 0.842, Yr3 0.772.)", steps: [
          { label: "Identify the cash flows", detail: "Coupons of $200,000 in 20X1 and 20X2; in 20X3 the final coupon $200,000 plus par redemption $5,000,000 = $5,200,000." },
          { label: "Discount Year 1", detail: "$200,000 × 0.917 = $183,400." },
          { label: "Discount Year 2", detail: "$200,000 × 0.842 = $168,400." },
          { label: "Discount Year 3", detail: "$5,200,000 × 0.772 = $4,014,400." },
          { label: "Liability component", detail: "$183,400 + $168,400 + $4,014,400 = $4,366,200." },
          { label: "Equity component (residual)", detail: "Proceeds $5,000,000 − liability $4,366,200 = $633,800." },
        ], result: "The liability is recognised at $4,366,200 (then carried at amortised cost using the 9% effective rate) and $633,800 is credited to equity, where it stays permanently — it is not remeasured whether or not conversion ever happens." },
        { kind: "diagram", diagram: {
          type: "tAccount",
          title: "Initial recognition of the convertible bond (1 Jan 20X1)",
          caption: "Cash received is split: the liability at present value, the equity component as the residual.",
          data: {
            name: "Convertible bond — day one",
            debits: [
              { label: "Cash", amount: 5000000 },
            ],
            credits: [
              { label: "Financial liability (PV at 9%)", amount: 4366200 },
              { label: "Equity — conversion option (residual)", amount: 633800 },
            ],
          },
        } },
      ],
    },
    {
      id: "ias19-db",
      heading: "IAS 19 — defined benefit plans in depth",
      blocks: [
        { kind: "text", md: "IAS 19 distinguishes two pension worlds. In a **defined contribution** plan the employer pays a fixed contribution and carries **no further risk** — the expense is simply the contribution due, and there is nothing to value. In a **defined benefit** plan the employer promises a **defined outcome** (say, a pension based on final salary) and therefore bears the actuarial and investment risk. That promise must be measured, and it sits on the balance sheet as a **net** figure." },
        { kind: "formula", name: "Net defined benefit liability (asset)", expr: "Net DB liability = Present value of the defined benefit obligation − Fair value of plan assets", note: "A surplus (net asset) is capped by the asset ceiling — see below." },
        { kind: "text", md: "Each period the net figure moves for three economically distinct reasons, and IAS 19 sends each to a **different place**. **Service cost** — both **current service cost** (this year's extra promise) and any **past service cost** (from a plan amendment) — goes to **profit or loss**. **Net interest** goes to **profit or loss**. Everything left over — the actuarial gains and losses and the return on assets beyond interest — is a **remeasurement** and goes to **OCI**, where it is **never recycled**." },
        { kind: "formula", name: "Net interest on the net DB liability", expr: "Net interest = Opening net DB liability (or asset) × Discount rate", note: "One rate — the discount rate on high-quality corporate bonds — applied to the opening NET balance." },
        { kind: "text", md: "That single-rate approach is elegant: applying one discount rate to the net balance is arithmetically the same as charging interest on the obligation and crediting interest income on the assets **at the same rate**. It removes the old argument about an \"expected return\" on assets — any return above the discount rate is a remeasurement, not income." },
        { kind: "example", title: "Worked example — reconciling a defined benefit plan", scenario: "A plan opens 20X1 with a defined benefit obligation of $2,000,000 and plan assets of $1,700,000. The discount rate is 6%. In the year: current service cost $350,000; a plan amendment adds past service cost $90,000; the entity contributes $250,000 into the plan; benefits of $150,000 are paid out. At the year end the actuary values the obligation at $2,600,000 and the plan assets at $1,850,000. Find the amounts in P/L, in OCI, and the closing net liability.", steps: [
          { label: "Opening net liability", detail: "Obligation $2,000,000 − assets $1,700,000 = $300,000 net liability." },
          { label: "Net interest (P/L)", detail: "Opening net liability $300,000 × 6% = $18,000. (Equivalently: interest on obligation $2,000,000 × 6% = $120,000 less interest income on assets $1,700,000 × 6% = $102,000 = $18,000.)" },
          { label: "Service cost (P/L)", detail: "Current $350,000 + past $90,000 = $440,000. Total P/L charge = $440,000 + $18,000 net interest = $458,000." },
          { label: "Remeasurement on the obligation (OCI)", detail: "Expected close = $2,000,000 + 350,000 + 90,000 + interest 120,000 − benefits 150,000 = $2,410,000. Actual $2,600,000 → actuarial LOSS $190,000." },
          { label: "Remeasurement on the assets (OCI)", detail: "Expected close = $1,700,000 + interest 102,000 + contributions 250,000 − benefits 150,000 = $1,902,000. Actual $1,850,000 → LOSS $52,000." },
          { label: "Total remeasurement (OCI)", detail: "Loss $190,000 + loss $52,000 = $242,000 loss recognised in OCI." },
          { label: "Closing net liability", detail: "Obligation $2,600,000 − assets $1,850,000 = $750,000. Proof: $300,000 + 458,000 (P/L) + 242,000 (OCI) − 250,000 (contributions) = $750,000." },
        ], result: "P/L bears $458,000 (service cost $440,000 + net interest $18,000); OCI bears a $242,000 remeasurement loss; contributions of $250,000 reduce the liability without touching P/L. The net liability rolls from $300,000 to $750,000." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Reconciling the defined benefit obligation",
          caption: "The actuarial loss is the balancing figure that bridges the expected close to the actuary's valuation.",
          data: {
            unit: "$000",
            items: [
              { label: "Opening obligation", value: 2000, kind: "start" },
              { label: "Current service cost", value: 350, kind: "delta" },
              { label: "Past service cost", value: 90, kind: "delta" },
              { label: "Interest cost (6%)", value: 120, kind: "delta" },
              { label: "Benefits paid", value: -150, kind: "delta" },
              { label: "Actuarial loss (OCI)", value: 190, kind: "delta" },
              { label: "Closing obligation", value: 2600, kind: "total" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The asset ceiling", md: "When a plan is in **surplus**, the net asset recognised is capped at the **asset ceiling** — the present value of economic benefits available as **refunds or reductions in future contributions**. A surplus the entity can never access is not an asset, so the excess is written off through **OCI**." },
      ],
      check: {
        q: "A defined benefit plan opens the year with a net liability of $300,000 and the discount rate is 6%. What is the net interest recognised in profit or loss?",
        options: [
          "$18,000",
          "$120,000",
          "$102,000",
          "Nil — interest on pensions goes to OCI",
        ],
        correct: 0,
        explain: "Net interest = opening NET defined benefit liability × discount rate = $300,000 × 6% = $18,000, and it is recognised in profit or loss. It equals the interest cost on the obligation ($120,000) less the interest income on the plan assets ($102,000). Only remeasurements — actuarial gains/losses and asset returns above the discount rate — go to OCI.",
      },
    },
  ],
  examTraps: [
    { trap: "Classifying by business model alone and forgetting SPPI.", fix: "Both gates must pass. An instrument in a hold-to-collect model still goes to FVTPL if its cash flows fail SPPI (e.g. profit-linked or equity-linked returns)." },
    { trap: "Recycling FVOCI gains on an equity investment when it is sold.", fix: "Debt FVOCI recycles on disposal; the equity FVOCI election never recycles — the cumulative gain moves within equity, and only dividends reach P/L." },
    { trap: "Keeping interest on the gross amount at Stage 3.", fix: "At Stage 3 (credit-impaired) interest switches to the NET carrying amount. Stages 1 and 2 both use the gross amount; only the allowance size differs (12-month vs lifetime)." },
    { trap: "Measuring the equity component of a convertible bond directly.", fix: "Always value the liability first as the PV of cash flows at the market rate for similar non-convertible debt; equity is the residual (proceeds − liability)." },
    { trap: "Charging pension contributions or remeasurements to profit or loss.", fix: "Only current/past service cost and net interest hit P/L. Contributions reduce the liability directly; remeasurements go to OCI and are never recycled." },
  ],
  keyTerms: [
    { term: "SPPI test", def: "Whether contractual cash flows are solely payments of principal and interest; failing it forces a debt asset to FVTPL." },
    { term: "Effective interest rate", def: "The rate that discounts estimated future cash flows to the net carrying amount at initial recognition; drives amortised cost." },
    { term: "Expected credit loss (ECL)", def: "A probability-weighted, discounted estimate of cash shortfalls, recognised from day one under IFRS 9's forward-looking model." },
    { term: "Compound instrument", def: "A single contract with both a liability and an equity component (e.g. a convertible bond), split at issue under IAS 32." },
    { term: "Net interest (IAS 19)", def: "Opening net defined benefit liability or asset multiplied by the discount rate, recognised in profit or loss." },
    { term: "Remeasurement", def: "Actuarial gains/losses and asset returns beyond net interest; recognised in OCI and never recycled to profit or loss." },
  ],
  summary: [
    "IFRS 9 classifies a debt asset by two gates — SPPI and business model: amortised cost (collect), FVOCI (collect & sell), else FVTPL; equities are always fair value.",
    "Amortised cost runs on the effective interest method — gross up the opening balance by the EIR, deduct the coupon; the ECL model provides for losses in three stages from day one.",
    "Hedge accounting matches timing: fair value hedges run through P/L; cash flow and net investment hedges park the effective portion in OCI until the item lands.",
    "IAS 32 follows substance: a contractual obligation to deliver cash is a liability; compound instruments are split with the liability at PV and equity as the residual.",
    "IAS 19 defined benefit: service cost and net interest (opening net liability × discount rate) go to P/L; remeasurements go to OCI; a surplus is capped by the asset ceiling.",
  ],
}
