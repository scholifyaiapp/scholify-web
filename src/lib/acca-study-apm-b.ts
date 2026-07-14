import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area B — Performance management systems & design.
 * Strategic-depth chapter: control philosophy, the IT/information layer, the
 * cost-accounting toolkit for performance, throughput accounting & the TPAR,
 * transfer pricing, and the behavioural edge. Original, syllabus-aligned;
 * no ACCA/Kaplan/BPP text. Every calculation re-solved digit-by-digit.
 */

export const APM_B: StudyChapter = {
  paper: "APM",
  area: "B",
  title: "Performance management systems & design",
  minutes: 17,
  intro: "A performance measure is a lever on human behaviour. Design the system badly and you get exactly what you asked for — and nothing you actually wanted. This is where measurement meets strategy.",
  outcomes: [
    "Contrast feedback and feedforward control and design the loop that fits a decision",
    "Assess how IT — big data, analytics, dashboards, ERP/BI — reshapes management information, and judge its quality",
    "Apply the cost-accounting toolkit for performance: ABC/ABM, target and lifecycle costing, and the four costs of quality",
    "Build a throughput-accounting ratio (TPAR) from bottleneck data and interpret it",
    "Set a defensible transfer-price range from marginal cost, opportunity cost and market price",
    "Anticipate the behavioural distortions a measure creates and design them out",
  ],
  sections: [
    {
      id: "systems-design",
      heading: "Designing the control loop — feedback vs feedforward",
      blocks: [
        { kind: "text", md: "A performance management system is not a report; it is a **control loop**. Managers set a target, the business acts, results are measured, and the gap between plan and reality drives the next action. The design question is **when** you close that loop — after the fact, or before it." },
        { kind: "text", md: "**Feedback control** compares **actual** results with the plan **after** the period, and uses the variance to correct the next period. It is the thermostat model: the room gets cold, then the heating responds. **Feedforward control** compares a **forecast** of where you are heading with the plan **before** the period ends, and acts on the predicted gap **now** — steering the car by looking through the windscreen, not the mirror." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two philosophies of control",
          caption: "Both are needed; the mix depends on how costly it is to be wrong after the event.",
          data: {
            leftTitle: "Feedback control",
            rightTitle: "Feedforward control",
            rows: [
              { aspect: "Compares", left: "Actual vs plan", right: "Forecast vs plan" },
              { aspect: "Timing", left: "After the event", right: "Before / during the event" },
              { aspect: "Analogy", left: "Rear-view mirror", right: "Windscreen" },
              { aspect: "Strength", left: "Uses real, certain data", right: "Corrects before damage is done" },
              { aspect: "Weakness", left: "Too late for this period", right: "Only as good as the forecast" },
            ],
          },
        } },
        { kind: "text", md: "Neither is enough alone. A **cash-flow crisis** cannot wait for a year-end variance — it demands feedforward: forecast the shortfall and arrange finance before the account runs dry. But feedforward relies on a **forecast**, and a poor forecast steers you confidently in the wrong direction. Mature systems run both: feedforward to steer, feedback to learn and to recalibrate the forecasting model itself." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The performance management loop",
          caption: "Feedforward tests the forecast against the plan early; feedback closes the loop at the end.",
          data: {
            steps: [
              { label: "Set objectives", sub: "Strategy → targets" },
              { label: "Plan & budget", sub: "Resource the target" },
              { label: "Forecast outcome", sub: "Feedforward test" },
              { label: "Act & operate", sub: "Run the business" },
              { label: "Measure actual", sub: "Capture results" },
              { label: "Compare & correct", sub: "Feedback variance" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "**Feedback** learns from the past; **feedforward** acts on the predicted future. A performance system that only looks in the mirror is always one period too late." },
      ],
    },
    {
      id: "it-information",
      heading: "The IT layer and the quality of information",
      blocks: [
        { kind: "text", md: "The measures are only as good as the data feeding them, and IT has transformed both the volume and the speed of that data. An **ERP** system runs the whole business off one shared database, so a sale, the stock movement and the ledger entry are all the **same** record. A **BI** layer sits on top, turning that raw transaction store into **dashboards** — real-time, drill-down views of the KPIs a manager actually steers by." },
        { kind: "text", md: "**Big data** pushes further: high **volume**, **velocity** and **variety** of data (including unstructured sources — clickstreams, sensors, social sentiment) that traditional systems could not hold. **Data analytics** then mines it, moving from **descriptive** (what happened) through **diagnostic** (why) to **predictive** and **prescriptive** (what will happen, and what to do). Predictive analytics is, in effect, industrial-strength feedforward." },
        { kind: "table", caption: "What each layer of the IT stack contributes", head: ["Layer", "What it does", "Performance-management payoff"], rows: [
          ["ERP", "One integrated database for all functions", "A single version of the truth; no reconciliation gaps"],
          ["BI / dashboards", "Visualises and drills into KPIs live", "Faster feedforward; exceptions surface immediately"],
          ["Big data", "Captures volume, velocity, variety", "Non-financial and external signals enter the model"],
          ["Analytics / AI", "Predictive and prescriptive modelling", "Forecasts sharpen; decisions get recommendations"],
        ] },
        { kind: "text", md: "But more data is not better information. Information is only useful if it meets the quality tests captured by **ACCURATE**: **A**ccurate, **C**omplete, **C**ost-effective (worth more than it costs to produce), **U**nderstandable, **R**elevant, **A**uthoritative, **T**imely, and **E**asy to use. A dashboard refreshed every second is worthless if the underlying figures are wrong, or if the manager cannot tell the signal from the noise." },
        { kind: "callout", tone: "warn", title: "Data is not information", md: "Big data raises the risk of **information overload** and **spurious correlation** — patterns that are real in the data but meaningless in the business. The cost of collecting and cleaning data can also exceed its value: **cost-effectiveness** is a quality test, not an afterthought." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The ACCURATE test for good management information",
          data: {
            items: [
              { title: "Accurate", sub: "Right to the needed precision" },
              { title: "Complete", sub: "Nothing decision-critical missing" },
              { title: "Cost-effective", sub: "Value exceeds cost to produce" },
              { title: "Understandable", sub: "The user can act on it" },
              { title: "Relevant", sub: "Fits the decision at hand" },
              { title: "Authoritative & Timely", sub: "Trusted source, in time to matter" },
            ],
          },
        } },
      ],
      check: {
        q: "A manager receives a beautifully designed dashboard that refreshes in real time, but two of its four KPIs are fed by a spreadsheet that is manually updated once a week. Which quality dimension is MOST clearly failing?",
        options: [
          "Understandable",
          "Timely",
          "Cost-effective",
          "Authoritative",
        ],
        correct: 1,
        explain: "The dashboard LOOKS real-time, but two KPIs are only as fresh as a weekly manual update — the information reaching the decision is out of date, so **timeliness** fails. It may look understandable and authoritative, and cost is not the issue described. The trap is letting slick presentation disguise stale underlying data.",
      },
    },
    {
      id: "cost-toolkit",
      heading: "The cost-accounting toolkit for performance",
      blocks: [
        { kind: "text", md: "Traditional absorption costing spreads overheads on a blunt volume base (labour hours), which distorts product costs when overheads are driven by **complexity**, not volume. The modern toolkit fixes this from several angles." },
        { kind: "table", caption: "Four costing lenses and what each is for", head: ["Technique", "Core idea", "Best used when"], rows: [
          ["ABC / ABM", "Trace overhead to activities via cost drivers; ABM then manages those activities", "Overheads are large and driven by complexity, not volume"],
          ["Target costing", "Work back from market price − required margin to a target cost the product must hit", "Competitive markets set the price; cost must be engineered down"],
          ["Lifecycle costing", "Total all costs from R&D to decommissioning across the whole life", "Most costs are locked in at the design stage"],
          ["Throughput accounting", "Only material is variable; maximise throughput per bottleneck hour", "A single bottleneck constrains the whole factory"],
        ] },
        { kind: "text", md: "**Target costing** flips the usual logic. Instead of cost-plus, the market fixes the price and the shareholders fix the margin, so the **target cost = selling price − required profit**. Any gap between that target and the current expected cost is the **cost gap** the engineers must close before launch. **Lifecycle costing** widens the lens in time: because roughly 80% of a product's costs are **committed** at the design phase, judging performance on production-phase costs alone misses where the money was really spent." },
        { kind: "text", md: "Running through all of them is **quality**. The **cost of quality** splits into four categories — two you spend on purpose (**conformance**), two the failures inflict on you (**non-conformance**):" },
        { kind: "table", caption: "The four quality-cost categories", head: ["Category", "Group", "Examples"], rows: [
          ["Prevention", "Conformance", "Design reviews, training, supplier vetting"],
          ["Appraisal", "Conformance", "Inspection, testing, quality audits"],
          ["Internal failure", "Non-conformance", "Scrap, rework, re-inspection before dispatch"],
          ["External failure", "Non-conformance", "Warranty claims, recalls, lost goodwill"],
        ] },
        { kind: "example", title: "Worked example — the cost of quality", scenario: "Dovi Ltd reports the following annual quality costs: staff training and design reviews $40,000; inspection and testing $25,000; scrap and rework before dispatch $60,000; warranty claims and recalls $95,000. Split the total into conformance and non-conformance, and comment.", steps: [
          { label: "Classify each cost", detail: "Training + design reviews = **prevention** $40,000. Inspection + testing = **appraisal** $25,000. Scrap + rework = **internal failure** $60,000. Warranty + recalls = **external failure** $95,000." },
          { label: "Cost of conformance", detail: "Prevention + appraisal = $40,000 + $25,000 = **$65,000**." },
          { label: "Cost of non-conformance", detail: "Internal + external failure = $60,000 + $95,000 = **$155,000**." },
          { label: "Total cost of quality", detail: "$65,000 + $155,000 = **$220,000**." },
          { label: "Interpret the mix", detail: "Non-conformance is $155,000 / $220,000 = 0.7045..., i.e. **70.5%** of the total spend. Failures — especially external — dominate, and external failure alone ($95,000) is larger than all conformance spend combined ($65,000)." },
        ], result: "Total cost of quality is $220,000, of which 70.5% is failure cost. The classic quality argument follows: shifting spend toward prevention (the cheapest category to increase) should cut the far larger failure costs, lowering the total. Spending more on quality, deliberately, can reduce the cost of quality." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Building the total cost of quality ($000)",
          caption: "Two conformance categories you choose, two failure categories the defects impose — bridging to the $220k total.",
          data: {
            unit: "$000",
            items: [
              { label: "Prevention", value: 40, kind: "start" },
              { label: "+ Appraisal", value: 25, kind: "delta" },
              { label: "+ Internal failure", value: 60, kind: "delta" },
              { label: "+ External failure", value: 95, kind: "delta" },
              { label: "Total cost of quality", value: 220, kind: "total" },
            ],
          },
        } },
      ],
      check: {
        q: "A warranty repair on a product already sold to a customer is an example of which cost of quality?",
        options: [
          "Prevention cost",
          "Appraisal cost",
          "Internal failure cost",
          "External failure cost",
        ],
        correct: 3,
        explain: "The defect reached the **customer**, so putting it right is an **external failure** cost — the most damaging category because it also erodes goodwill. Internal failure (scrap, rework) is caught **before** dispatch; prevention and appraisal are conformance costs spent to stop defects arising or to detect them in-house.",
      },
    },
    {
      id: "throughput-tpar",
      heading: "Throughput accounting and the TPAR",
      blocks: [
        { kind: "text", md: "Throughput accounting takes a radical view born of the Theory of Constraints: in the short run **only material cost is truly variable**. Labour and overheads are treated as fixed **factory (operating) costs**. What matters is how fast the whole factory turns material into sold output — and that speed is set by its slowest resource, the **bottleneck**. So you rank products not by contribution per unit, but by **throughput per bottleneck hour**." },
        { kind: "formula", name: "Throughput per unit", expr: "Throughput = Selling price − Material cost", note: "Every other cost is treated as a fixed factory cost." },
        { kind: "formula", name: "Return per factory (bottleneck) hour", expr: "Return per hour = Throughput per unit ÷ Bottleneck hours per unit" },
        { kind: "formula", name: "Cost per factory (bottleneck) hour", expr: "Cost per hour = Total factory costs ÷ Total bottleneck hours available" },
        { kind: "formula", name: "Throughput accounting ratio (TPAR)", expr: "TPAR = Return per factory hour ÷ Cost per factory hour", note: "TPAR > 1 → the product earns throughput faster than it consumes cost → worth making." },
        { kind: "example", title: "Worked example — a full TPAR", scenario: "Product Zeta sells for $90 and uses $34 of material. It needs 2 hours on the bottleneck machine per unit. The factory incurs $320,000 of fixed operating costs per period, and the bottleneck machine is available for 16,000 hours per period. Calculate Zeta's TPAR and interpret it.", steps: [
          { label: "Throughput per unit", detail: "Selling price − material = $90 − $34 = **$56** per unit." },
          { label: "Return per factory hour", detail: "Throughput ÷ bottleneck hours per unit = $56 ÷ 2 = **$28 per bottleneck hour**." },
          { label: "Cost per factory hour", detail: "Total factory cost ÷ total bottleneck hours = $320,000 ÷ 16,000 = **$20 per bottleneck hour**." },
          { label: "TPAR", detail: "Return per hour ÷ cost per hour = $28 ÷ $20 = **1.4**." },
          { label: "Interpret", detail: "TPAR = 1.4 is **greater than 1**: each bottleneck hour generates $28 of throughput while costing $20, so Zeta earns 1.4× its cost rate on the constraint. The product is worth making, and the priority is to keep the bottleneck busy on it." },
        ], result: "Zeta's TPAR is 1.4 (> 1), so it is viable. If it were below 1, the product would consume factory cost faster than it earns throughput — you would push price up, cut material cost, speed it through the bottleneck, or drop it." },
        { kind: "callout", tone: "rule", title: "Reading the TPAR", md: "**TPAR > 1** — throughput per hour beats cost per hour → make and prioritise. **TPAR < 1** — the product loses money at the constraint → improve throughput, cut the bottleneck time, or stop making it. To lift a TPAR you can only do four things: **raise price, cut material cost, cut the bottleneck time per unit, or cut total factory cost.**" },
      ],
      check: {
        q: "Product Omega has a return per bottleneck hour of $18, while the factory's cost per bottleneck hour is $24. What is Omega's TPAR, and what does it tell you?",
        options: [
          "0.75 — Omega earns throughput slower than it consumes cost, so it is not viable as it stands",
          "0.75 — Omega is viable because any positive throughput adds value",
          "1.33 — Omega is comfortably viable",
          "6.00 — the difference of $6 is the ratio",
        ],
        correct: 0,
        explain: "TPAR = return per hour ÷ cost per hour = $18 ÷ $24 = **0.75**, which is **below 1**. On the constraint, Omega generates only $18 of throughput for every $24 of factory cost it absorbs, so it destroys value as currently configured. The fix is to raise price, cut material cost, reduce its bottleneck time, or drop it — not to keep making it just because throughput is positive.",
      },
    },
    {
      id: "transfer-pricing",
      heading: "Transfer pricing across divisions",
      blocks: [
        { kind: "text", md: "**Divisionalisation** gives managers autonomy and profit responsibility, which sharpens motivation — but it creates a new problem: when Division A sells a component to Division B **inside the same group**, what price should change hands? Set it wrong and a manager, acting in the best interest of **their** division, makes a decision that is bad for the **group**. That is **dysfunctional** behaviour, and the transfer price is the lever that prevents it." },
        { kind: "text", md: "A group-optimal price sits inside a **range** bounded by two rules. The selling division will not accept less than its **minimum**; the buying division will not pay more than its **maximum**. If the range exists (minimum ≤ maximum), any price within it keeps both managers willing **and** aligns them with the group." },
        { kind: "formula", name: "Minimum transfer price (selling division)", expr: "Minimum = Marginal cost + Opportunity cost of the transfer", note: "Opportunity cost = the contribution the selling division gives up by transferring instead of selling externally. Zero if there is spare capacity." },
        { kind: "formula", name: "Maximum transfer price (buying division)", expr: "Maximum = Lower of the external market price and the buying division's net marginal revenue" },
        { kind: "example", title: "Worked example — the transfer-price range", scenario: "Division A makes a component with a marginal cost of $12 per unit. It can sell the component externally for $20 per unit. Division B needs the component and could buy an identical one on the open market for $20. Find the transfer-price range (a) when Division A has spare capacity, and (b) when Division A is at full capacity.", steps: [
          { label: "(a) Spare capacity — opportunity cost", detail: "With spare capacity, transferring internally costs Division A **no** lost external sale, so the opportunity cost is $0." },
          { label: "(a) Minimum", detail: "Marginal cost + opportunity cost = $12 + $0 = **$12**." },
          { label: "(a) Maximum", detail: "Buying division will not pay above the external market price = **$20**." },
          { label: "(a) Range", detail: "$12 to $20. Minimum ($12) ≤ maximum ($20), so a deal benefits the group anywhere in the **$12–$20** band — the split of the $8 spread is a negotiation between the two managers." },
          { label: "(b) Full capacity — opportunity cost", detail: "Now every internal unit displaces an external sale. Contribution lost = external price − marginal cost = $20 − $12 = **$8** per unit." },
          { label: "(b) Minimum", detail: "Marginal cost + opportunity cost = $12 + $8 = **$20**." },
          { label: "(b) Range", detail: "Minimum = $20 and maximum = $20, so the range **collapses to a single price of $20** — the external market price. At full capacity, market price is the transfer price that keeps the group's decision correct." },
        ], result: "With spare capacity the negotiable range is $12–$20; at full capacity it narrows to exactly $20 (market price). The general result: when a perfect external market exists, the market price is the group-optimal transfer price, because it makes the internal decision identical to the external one." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "How capacity moves the transfer-price range",
          caption: "Opportunity cost is the whole story: it is zero with spare capacity and equal to lost contribution at full capacity.",
          data: {
            leftTitle: "Spare capacity",
            rightTitle: "Full capacity",
            rows: [
              { aspect: "Opportunity cost", left: "$0 (no sale lost)", right: "$8 (contribution lost)" },
              { aspect: "Minimum price", left: "$12 (marginal cost)", right: "$20 (marginal + opp. cost)" },
              { aspect: "Maximum price", left: "$20 (market price)", right: "$20 (market price)" },
              { aspect: "Negotiable range", left: "$12 – $20", right: "$20 only" },
              { aspect: "Group-optimal", left: "Any price in band works", right: "Market price = $20" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Reach for the range formulas whenever a question asks for a transfer price: the **minimum** is always **marginal cost plus opportunity cost** (so it jumps the moment capacity is scarce), and the **maximum** is capped by what the buyer could pay outside. If minimum exceeds maximum, no internal transfer benefits the group." },
      ],
    },
    {
      id: "behavioural",
      heading: "The behavioural edge — what you measure is what you get",
      blocks: [
        { kind: "text", md: "Every performance measure changes behaviour, and rarely only in the intended way. This is the deepest idea in APM: a measure is an incentive, and people optimise the number in front of them — even at the group's expense. Anticipating the distortion is part of designing the measure." },
        { kind: "table", caption: "Classic behavioural distortions and their antidotes", head: ["Distortion", "What happens", "Design antidote"], rows: [
          ["Short-termism", "Managers cut R&D or maintenance to lift this year's profit", "Balance with long-term and non-financial measures"],
          ["Gaming / manipulation", "Targets are met by manipulating the measure, not performance", "Use several measures; audit the data"],
          ["Tunnel vision", "Only what is measured gets attention; the rest is neglected", "A balanced scorecard across perspectives"],
          ["Sub-optimisation", "A division wins while the group loses (e.g. transfer pricing)", "Align divisional and group goals"],
          ["Measure fixation", "Hitting the metric replaces the underlying objective", "Measure outcomes, not just proxies"],
        ] },
        { kind: "text", md: "The link between a measure and a person's effort is captured by **goal congruence**: a well-designed system makes the manager, pursuing their **own** targets, automatically pursue the **organisation's** goals. Divisionalised structures make this hard — a ROI target, for instance, can push a divisional manager to **reject** a project that earns above the group's cost of capital simply because it would dilute their division's average return. **Residual income** was invented precisely to remove that particular distortion." },
        { kind: "callout", tone: "warn", title: "The measurement paradox", md: "You get what you measure — not what you want. Before adopting any measure, ask: **what behaviour will this reward, and what will a rational, self-interested manager do to maximise it?** If the honest answer includes anything harmful, redesign the measure before it is ever published." },
      ],
    },
  ],
  examTraps: [
    { trap: "Describing feedforward control as simply 'comparing actual with budget'.", fix: "That is feedback. Feedforward compares a FORECAST of the outcome with the plan and acts BEFORE the period ends." },
    { trap: "In a TPAR, dividing throughput by cost per hour, or forgetting to convert to a per-bottleneck-hour basis.", fix: "TPAR = return per factory hour ÷ cost per factory hour. Both numerator and denominator must be per BOTTLENECK hour first." },
    { trap: "Setting the minimum transfer price at marginal cost even when the selling division is at full capacity.", fix: "Minimum = marginal cost + opportunity cost. With no spare capacity, add the lost contribution, so it rises to market price." },
    { trap: "Treating labour as a variable cost in throughput accounting.", fix: "Throughput accounting treats ONLY material as variable; labour and overheads are fixed factory costs." },
    { trap: "Classifying inspection and testing as prevention costs.", fix: "Inspection/testing is APPRAISAL (detecting defects). Prevention is stopping them arising — training, design reviews, supplier vetting." },
  ],
  keyTerms: [
    { term: "Feedforward control", def: "Comparing a forecast of the outcome with the plan and acting on the predicted gap before the period ends." },
    { term: "TPAR", def: "Throughput accounting ratio = return per factory (bottleneck) hour ÷ cost per factory hour; greater than 1 means the product is worth making." },
    { term: "Throughput", def: "Selling price minus material cost — the only cost treated as variable under throughput accounting." },
    { term: "Minimum transfer price", def: "The floor the selling division will accept: marginal cost plus the opportunity cost of transferring internally." },
    { term: "Cost of conformance", def: "Prevention plus appraisal costs — money spent deliberately to prevent or detect defects." },
    { term: "Goal congruence", def: "The state where a manager pursuing their own divisional targets automatically advances the organisation's overall goals." },
  ],
  summary: [
    "Control loops come in two forms: feedback learns from actual results after the event; feedforward acts on a forecast before it. Mature systems run both.",
    "IT (ERP, BI dashboards, big data, analytics) multiplies data, but information is only useful if it is ACCURATE — accurate, complete, cost-effective, understandable, relevant, authoritative, timely and easy to use.",
    "The costing toolkit — ABC/ABM, target costing, lifecycle costing, throughput accounting and the four costs of quality (prevention, appraisal, internal & external failure) — targets the distortions of blunt absorption costing.",
    "TPAR = return per bottleneck hour ÷ cost per bottleneck hour; above 1 the product earns throughput faster than cost (Zeta: $28 ÷ $20 = 1.4).",
    "The transfer-price range runs from minimum (marginal cost + opportunity cost) to maximum (market price); at full capacity it collapses to market price, and every measure must be designed for goal congruence to avoid dysfunctional behaviour.",
  ],
}
