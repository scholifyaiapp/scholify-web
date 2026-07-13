import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area D — Performance measurement & control.
 * Original, syllabus-aligned rich chapter: divisional financial measures
 * (ROI/ROCE, RI, EVA), non-financial indicators and frameworks (balanced
 * scorecard, building blocks, performance pyramid), transfer pricing, and
 * performance in the not-for-profit / public sector (value for money).
 * No ACCA/Kaplan/BPP text reused.
 */

export const PM_D: StudyChapter = {
  paper: "PM",
  area: "D",
  title: "Performance measurement & control",
  minutes: 17,
  intro: "A divisional manager will always chase the number you reward them on. Pick the wrong number and a good manager will make a bad decision — and be proud of it. This chapter is about choosing measures that make the right call the rewarded call.",
  outcomes: [
    "Calculate and interpret ROI/ROCE and residual income, and explain why they can disagree",
    "Apply the principle of controllability to judge a divisional manager fairly",
    "Compute economic value added (EVA) from operating profit using the standard NOPAT and capital adjustments",
    "Explain the balanced scorecard, the building-block model and the performance pyramid, and why non-financial indicators matter",
    "Derive the range of acceptable transfer prices from marginal cost, opportunity cost and market price",
    "Measure performance in not-for-profit and public-sector bodies using the three Es of value for money",
  ],
  sections: [
    {
      id: "roi",
      heading: "Divisional profit measures — ROI and controllability",
      blocks: [
        { kind: "text", md: "Once a company splits into **divisions**, head office loses sight of the daily detail and has to judge each division from a distance — exactly the outside-in problem financial reporting solves for the whole entity, now repeated inside the firm. The first instinct is to ask: **how much profit did the division make for the assets it was given?** That ratio is **return on investment (ROI)**, also met at group level as **return on capital employed (ROCE)**." },
        { kind: "formula", name: "Return on investment", expr: "ROI = controllable divisional profit / controllable capital employed × 100%", note: "ROCE is the same idea at entity level: operating profit (PBIT) / capital employed." },
        { kind: "callout", tone: "rule", title: "Controllability", md: "Judge a manager only on what they **control**. A cost the manager cannot influence — an apportioned share of head-office rent, a group-imposed interest charge — is **traceable** to the division but not **controllable** by it. Strip uncontrollable items out before you measure the manager, or you punish them for decisions they never made." },
        { kind: "text", md: "ROI is popular because it is a **percentage**: it lets you compare a small division against a large one and against the company's target rate. But that same percentage form hides a trap we meet in the next section — it can push a manager to **reject good projects** simply because they would dilute an already-high average." },
        { kind: "example", title: "Worked example — reading a division's ROI", scenario: "The Northgate division has controllable operating profit of $400,000 and controllable capital employed of $2,000,000. The group's cost of capital (target return) is 15%. Is Northgate covering its cost of capital?", steps: [
          { label: "Apply the formula", detail: "ROI = 400,000 / 2,000,000 × 100% = **20%**." },
          { label: "Compare to target", detail: "20% ROI vs a 15% cost of capital — the division earns 5 percentage points above the rate the group needs." },
          { label: "Interpret", detail: "Every $1 of capital returns 20c of controllable profit, comfortably above the 15c the group requires. On this measure Northgate is performing well." },
        ], result: "ROI = 20%, above the 15% target — Northgate creates value on the assets it controls. Hold this 20% in mind: the next section shows why it can quietly cause a bad decision." },
      ],
    },
    {
      id: "ri",
      heading: "Residual income and the ROI trap",
      blocks: [
        { kind: "text", md: "The weakness of ROI is that managers are rewarded on an **average**, so they protect the average. A division already earning 20% will turn down a new project earning 16% — even though 16% beats the 15% cost of capital and would make the shareholders richer — because accepting it drags the divisional average below 20%. This is **dysfunctional** behaviour: good for the manager's ratio, bad for the company." },
        { kind: "text", md: "**Residual income (RI)** removes the trap by working in **absolute dollars** instead of a percentage. It charges the division for the capital it uses at the cost of capital, then asks what profit is left over. Any project that earns more than the capital charge **increases RI**, so a manager rewarded on RI accepts exactly the projects the shareholders want." },
        { kind: "formula", name: "Residual income", expr: "RI = controllable profit − (controllable capital employed × cost of capital)", note: "The bracketed term is the imputed interest charge — the cost of tying up the capital." },
        { kind: "example", title: "Worked example — ROI and RI point opposite ways", scenario: "Northgate (profit $400,000, capital $2,000,000, ROI 20%, cost of capital 15%) is offered a new project: invest a further $500,000 to earn extra profit of $80,000 a year. Should the manager accept — and does the answer depend on whether they are judged on ROI or RI?", steps: [
          { label: "Project return", detail: "Project ROI = 80,000 / 500,000 = **16%**. This beats the 15% cost of capital, so it adds shareholder value and should be accepted." },
          { label: "Effect on divisional ROI", detail: "New ROI = (400,000 + 80,000) / (2,000,000 + 500,000) = 480,000 / 2,500,000 = **19.2%**. The average falls from 20% to 19.2%." },
          { label: "ROI-rewarded manager", detail: "Sees ROI drop 20% → 19.2% and **rejects** the project — a dysfunctional decision driven by the measure." },
          { label: "Divisional RI before", detail: "RI = 400,000 − (2,000,000 × 15%) = 400,000 − 300,000 = **$100,000**." },
          { label: "Divisional RI after", detail: "RI = 480,000 − (2,500,000 × 15%) = 480,000 − 375,000 = **$105,000**. RI rises by $5,000." },
          { label: "Cross-check on the project alone", detail: "Project RI = 80,000 − (500,000 × 15%) = 80,000 − 75,000 = **+$5,000** — matching the $5,000 rise. RI and shareholder value agree." },
        ], result: "The same project is rejected under ROI (19.2% < 20%) but accepted under RI (+$5,000). RI is goal-congruent here; ROI is not — the classic ROI-versus-RI conflict." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Why the ROI manager balks",
          caption: "The project (16%) beats the 15% cost of capital, but sits below the division's 20% average — so it dilutes ROI while still adding value.",
          data: {
            unit: "%",
            items: [
              { label: "Division ROI (now)", value: 20 },
              { label: "New project ROI", value: 16 },
              { label: "Cost of capital", value: 15 },
              { label: "Division ROI (after)", value: 19.2 },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "ROI vs residual income",
          data: {
            leftTitle: "ROI",
            rightTitle: "Residual income",
            rows: [
              { aspect: "Form", left: "Percentage (relative)", right: "Absolute money amount" },
              { aspect: "Cost of capital", left: "Not built in", right: "Charged explicitly as imputed interest" },
              { aspect: "New investment", left: "Rejects projects below the average", right: "Accepts any project above cost of capital" },
              { aspect: "Goal congruence", left: "Can be dysfunctional", right: "Aligned with shareholder value" },
              { aspect: "Comparing divisions", left: "Easy — size-neutral", right: "Harder — bigger divisions show bigger RI" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Remember the trade-off: **ROI compares divisions fairly** (it is size-neutral) but **can misdirect investment**; **RI directs investment well** but **flatters large divisions** (more capital, so more residual dollars). Neither is perfect — which is why the exam loves asking you to contrast them." },
      ],
      check: {
        q: "A division earns ROI of 18%. The cost of capital is 12%. A new project would earn a 15% return. Judged on ROI alone, what will the manager most likely do, and is it goal-congruent?",
        options: [
          "Accept — 15% beats the 12% cost of capital, and ROI agrees",
          "Reject — 15% is below the 18% average, so ROI falls; this is NOT goal-congruent",
          "Reject — 15% is below the 12% cost of capital",
          "Accept — the project raises the divisional average",
        ],
        correct: 1,
        explain: "The project's 15% return exceeds the 12% cost of capital, so it adds shareholder value and should be accepted. But 15% is below the division's 18% average, so taking it drags ROI down — a manager rewarded on ROI rejects it. That is the dysfunctional, non-goal-congruent decision RI is designed to prevent (project RI would be positive, since 15% > 12%).",
      },
    },
    {
      id: "eva",
      heading: "Economic value added (EVA)",
      blocks: [
        { kind: "text", md: "**EVA** is residual income's sharper cousin. It keeps the same shape — profit minus a charge for the capital used — but fixes two complaints about accounting numbers: (1) reported profit is distorted by accounting choices, and (2) the balance sheet understates the capital really tied up in the business. EVA therefore replaces accounting profit with **NOPAT** (net operating profit after tax) and replaces book capital with **economic capital**." },
        { kind: "formula", name: "Economic value added", expr: "EVA = NOPAT − (capital employed × WACC)", note: "NOPAT = net operating profit after tax; WACC = weighted average cost of capital. Same skeleton as RI, but on adjusted figures." },
        { kind: "callout", tone: "key", title: "The standard adjustments", md: "To turn accounting profit into **NOPAT**: **add back** non-cash items (e.g. increases in provisions) and spending that builds the future — **advertising, research and staff training** — because these are really **investments**, then deduct **cash tax paid**. Make the **same additions to the capital** base (add cumulative amounts previously written off), because that spending created economic value that the book value ignores. Also add back **goodwill** previously written off." },
        { kind: "example", title: "Worked example — an EVA calculation", scenario: "A division reports operating profit (before interest and tax) of $900,000. During the year it increased a provision by $30,000 (non-cash) and spent $70,000 on a brand-building advertising campaign written off in full. Cash tax paid was $250,000. Book capital employed is $4,000,000, and cumulative advertising previously written off totals $470,000 (including this year's $70,000). WACC is 10%. Find the EVA.", steps: [
          { label: "Start from operating profit", detail: "PBIT = $900,000." },
          { label: "Add back non-cash provision", detail: "+$30,000 — it reduced accounting profit but used no cash. Running total $930,000." },
          { label: "Add back advertising (an investment)", detail: "+$70,000 — brand-building is economic investment, not a period cost. Adjusted operating profit = $1,000,000." },
          { label: "Deduct cash tax", detail: "$1,000,000 − $250,000 = **NOPAT $750,000**." },
          { label: "Adjust the capital base", detail: "Book capital $4,000,000 + cumulative advertising add-back $470,000 + provision $30,000 = **economic capital $4,500,000**." },
          { label: "Capital charge", detail: "$4,500,000 × 10% WACC = $450,000." },
          { label: "EVA", detail: "$750,000 − $450,000 = **+$300,000**." },
        ], result: "EVA = +$300,000. The division earns $300,000 more than the return the providers of capital require — genuine value creation. A positive EVA means shareholder wealth rose; a negative EVA means it was destroyed." },
        { kind: "callout", tone: "warn", md: "EVA looks precise but the adjustments are **judgemental** and there can be dozens of them — do not confuse a tidy final number with objectivity. Like RI, EVA is an **absolute** figure, so it too favours larger divisions when you rank one against another." },
      ],
    },
    {
      id: "nonfin",
      heading: "Beyond the numbers — non-financial indicators & frameworks",
      blocks: [
        { kind: "text", md: "Financial measures share three faults: they are **backward-looking** (they report what already happened), **short-term** (a manager can boost this year's profit by cutting the training and maintenance that protect next year), and **easy to manipulate**. **Non-financial performance indicators (NFPIs)** — on-time delivery, defect rates, customer retention, staff turnover — are harder to fake and act as **leading indicators**: falling quality shows up in the reject rate long before it shows up in lost sales." },
        { kind: "text", md: "Three frameworks force a balanced view. The **balanced scorecard** (Kaplan & Norton) reports across four linked perspectives so a gain in one is not bought by a hidden loss in another." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The balanced scorecard — four perspectives",
          caption: "Each perspective answers a question, and the four are causally linked: learning drives better processes, which delight customers, which produces the financial result.",
          data: {
            items: [
              { title: "Financial", sub: "How do we look to shareholders? (profit, ROCE, cash flow)" },
              { title: "Customer", sub: "How do customers see us? (satisfaction, retention, on-time delivery)" },
              { title: "Internal business process", sub: "What must we excel at? (cycle time, defect rate, yield)" },
              { title: "Innovation & learning", sub: "Can we keep improving? (new products, staff skills, training)" },
            ],
          },
        } },
        { kind: "text", md: "The **building-block model** (Fitzgerald & Moon), designed for **service businesses**, separates six dimensions into two **results** (what the strategy delivered) and four **determinants** (what drove those results — the leading indicators). It is completed by three principles: clear **standards** (owned, fair, achievable) and fair **rewards** (clear, controllable, motivating)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Building blocks (Fitzgerald & Moon) — six dimensions",
          caption: "Two results are lagging outcomes; four determinants are the leading drivers that produce them.",
          data: {
            items: [
              { title: "Competitiveness — result", sub: "Market share, sales growth, win rate" },
              { title: "Financial performance — result", sub: "Profitability, liquidity, capital structure" },
              { title: "Quality — determinant", sub: "Reliability and satisfaction of the service" },
              { title: "Flexibility — determinant", sub: "Speed and ability to cope with variety" },
              { title: "Resource utilisation — determinant", sub: "Productivity of people and assets" },
              { title: "Innovation — determinant", sub: "New services and improved processes" },
            ],
          },
        } },
        { kind: "text", md: "The **performance pyramid** (Lynch & Cross) connects the very top — **corporate vision** — down to day-to-day operations, showing how measures cascade. The **left** side of the pyramid tracks **external, market-facing** effectiveness (customer satisfaction, quality, delivery); the **right** side tracks **internal** efficiency (productivity, cycle time, waste)." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The performance pyramid (Lynch & Cross)",
          caption: "Objectives flow down from the vision; measures flow up from operations — external effectiveness on the left, internal efficiency on the right.",
          data: {
            levels: [
              { label: "Corporate vision", sub: "What the organisation is trying to become" },
              { label: "Market & financial objectives", sub: "Set at the business-unit level" },
              { label: "Customer satisfaction · Flexibility · Productivity", sub: "Business operating systems" },
              { label: "Quality · Delivery · Cycle time · Waste", sub: "Day-to-day departments and work centres" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", md: "Non-financial measures are not a free lunch: you can drown a manager in **too many** indicators, they can **conflict** (push delivery speed and quality falls), and some (staff morale) are hard to quantify. The skill is choosing a **few** measures that link clearly to strategy." },
      ],
      check: {
        q: "In the balanced scorecard, tracking 'percentage of revenue from products launched in the last two years' belongs to which perspective?",
        options: [
          "Financial perspective",
          "Customer perspective",
          "Innovation and learning perspective",
          "Internal business process perspective",
        ],
        correct: 2,
        explain: "Although the measure is expressed in revenue terms, its purpose is to gauge the organisation's capacity to renew itself — a leading indicator of future capability. That is the innovation and learning perspective ('can we continue to improve and create value?'). The financial perspective would use lagging outcomes such as ROCE or overall profit.",
      },
    },
    {
      id: "transfer",
      heading: "Transfer pricing — setting the internal price",
      blocks: [
        { kind: "text", md: "When one division sells to another, the **transfer price** is a cost to the buyer and revenue to the seller — it nets to zero for the group but decides how the group's total profit is **split** between the two divisions. Get it wrong and a division will refuse to trade internally even when the group as a whole would gain. A good transfer price sits in a **range** bounded by the two divisions' walk-away points." },
        { kind: "formula", name: "Minimum transfer price (the seller's floor)", expr: "Minimum = marginal cost + opportunity cost", note: "With spare capacity the opportunity cost is nil, so the floor is just marginal (variable) cost. At full capacity the opportunity cost is the contribution lost on the external sale forgone." },
        { kind: "formula", name: "Maximum transfer price (the buyer's ceiling)", expr: "Maximum = lower of external market price and net marginal revenue", note: "Net marginal revenue = the buyer's final selling price − the buyer's own further costs. The buyer never pays more internally than it would to buy outside." },
        { kind: "example", title: "Worked example — the transfer-price range", scenario: "Division A makes a component at a variable cost of $18 and can sell it externally for $30. Division B takes the component, does further work costing $8 a unit, and sells the finished product for $50. (a) Find the range with A having spare capacity; (b) find it when A is at full capacity.", steps: [
          { label: "Buyer's ceiling — market price", detail: "B could buy the component outside for $30, so it will not pay more than **$30** internally." },
          { label: "Buyer's ceiling — net marginal revenue", detail: "B's final price $50 − B's own cost $8 = $42. The ceiling is the lower of $30 and $42 = **$30**." },
          { label: "(a) Seller's floor with spare capacity", detail: "No external sale is given up, so opportunity cost = 0. Minimum = marginal cost $18 + 0 = **$18**." },
          { label: "(a) The range", detail: "Any price from **$18 to $30** leaves both divisions no worse off; the exact point just shares the $50 − $18 − $8 = $24 group profit between them." },
          { label: "(b) Seller's floor at full capacity", detail: "Transferring means A gives up an external sale earning $30 − $18 = $12 contribution. Opportunity cost = $12. Minimum = $18 + $12 = **$30**." },
          { label: "(b) The range", detail: "Floor $30 meets ceiling $30 — the range collapses to a single price of **$30**, the market price." },
        ], result: "With spare capacity the acceptable range is $18–$30; at full capacity it narrows to exactly $30. The general rule falls out: when a perfect external market exists and the seller is at capacity, market price is the ideal transfer price." },
        { kind: "callout", tone: "rule", title: "Why marginal cost + opportunity cost works", md: "It is simply the seller's true economic sacrifice. Charge less and the group loses money on every internal unit; charge more than the buyer's ceiling and the buyer walks away to the external market. Between the two lies the zone where **internal trade benefits the group** and both managers can still be made better off." },
        { kind: "text", md: "Real-world complications push firms towards **negotiated** or **cost-plus** prices: imperfect external markets, the desire to keep **divisional autonomy**, and — for multinationals — **tax**, since shifting the transfer price shifts where profit is declared and taxed. Tax authorities counter this with **arm's-length** rules." },
      ],
      check: {
        q: "A supplying division has plenty of spare capacity. Its component costs $12 in variable cost and sells externally for $20. What is the minimum transfer price it should accept?",
        options: [
          "$20 — the external market price",
          "$12 — variable cost, since spare capacity means zero opportunity cost",
          "$32 — variable cost plus the market price",
          "$8 — the contribution earned externally",
        ],
        correct: 1,
        explain: "Minimum transfer price = marginal cost + opportunity cost. With spare capacity, no external sale is sacrificed, so opportunity cost is zero and the floor is simply the $12 variable cost. Any internal price at or above $12 leaves the supplying division no worse off; the $20 market price would be the ceiling, not the floor.",
      },
    },
    {
      id: "nfp",
      heading: "Not-for-profit, public sector & the external environment",
      blocks: [
        { kind: "text", md: "A hospital, a charity or a government department has **no profit figure** to measure — success is delivering a service, not a surplus. Objectives are often **multiple, conflicting and hard to quantify** (a charity wants both to help the most people and to keep fundraising costs low). With no bottom line, performance is judged on **value for money (VFM)**, broken into the **three Es**." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Value for money — the three Es",
          caption: "Economy and efficiency concern doing things right; effectiveness concerns doing the right things — meeting the objective.",
          data: {
            centre: "Value for money",
            nodes: [
              { label: "Economy", sub: "Buying inputs of the right quality at the lowest cost" },
              { label: "Efficiency", sub: "Maximising output for a given input (output ÷ input)" },
              { label: "Effectiveness", sub: "Meeting the objectives — the intended outcome" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — the three Es for a vaccination programme", scenario: "A public health body runs a vaccination drive. How would you use each of the three Es to judge it?", steps: [
          { label: "Economy", detail: "Were vaccines and staff obtained at low cost without sacrificing quality? e.g. cost per dose procured." },
          { label: "Efficiency", detail: "How many people were vaccinated per nurse-day or per dollar spent? A high output-to-input ratio means efficient delivery." },
          { label: "Effectiveness", detail: "Did the objective — herd immunity, fewer infections — actually happen? A programme can be economical and efficient yet ineffective if the wrong population was targeted." },
        ], result: "All three must be read together: cheap (economy) and busy (efficiency) are worthless if the disease still spreads (ineffectiveness). Effectiveness anchors the other two to the mission." },
        { kind: "callout", tone: "tip", md: "Sort the three Es by a one-word cue: **Economy = inputs** (cost of resources), **Efficiency = the ratio** (output per input), **Effectiveness = outcomes** (did we hit the objective). Economy and efficiency are about *doing things right*; effectiveness is about *doing the right things*." },
        { kind: "text", md: "Finally, no measure is read in a vacuum — the **external environment** frames it. A 5% sales fall is a triumph in a market that shrank 15% and a disaster in one that grew 10%. Good performance measurement therefore **benchmarks** against competitors and market conditions, and weighs external factors — the economy, regulation, technology, exchange rates — that lie outside the manager's control. Judging a manager on results that were swept away by a recession breaches the same **controllability** principle we started with." },
      ],
    },
  ],
  examTraps: [
    { trap: "Charging a divisional manager for costs they cannot control (apportioned head-office overhead).", fix: "Measure managers on controllable profit and controllable capital only. Traceable is not the same as controllable." },
    { trap: "Assuming ROI always drives the right investment decision.", fix: "ROI can make a manager reject a project that beats the cost of capital just because it dilutes the average. RI (or EVA) fixes this by charging capital in absolute dollars." },
    { trap: "Forgetting the opportunity cost in the minimum transfer price when the seller is at full capacity.", fix: "Minimum = marginal cost + opportunity cost. At full capacity the lost external contribution IS the opportunity cost, so the floor rises to market price." },
    { trap: "Treating EVA's NOPAT as ordinary accounting profit.", fix: "Add back non-cash items and value-building spend (advertising, R&D, training), make the matching additions to capital, and deduct cash tax — then charge WACC on economic capital." },
    { trap: "Muddling efficiency and effectiveness in value-for-money questions.", fix: "Efficiency = output per unit of input (a ratio); effectiveness = whether the objective was actually achieved (the outcome). A body can be efficient yet ineffective." },
  ],
  keyTerms: [
    { term: "Return on investment (ROI)", def: "Controllable divisional profit as a percentage of controllable capital employed; a relative, size-neutral measure." },
    { term: "Residual income (RI)", def: "Controllable profit less an imputed interest charge (capital employed × cost of capital); an absolute measure that promotes goal congruence." },
    { term: "Economic value added (EVA)", def: "NOPAT less a charge for economic capital at WACC; residual income computed on adjusted, economically meaningful figures." },
    { term: "Controllability", def: "The principle that a manager should be assessed only on costs, revenues and assets they can influence." },
    { term: "Transfer price", def: "The internal price charged when one division supplies another; ideally set between the seller's minimum (marginal + opportunity cost) and the buyer's maximum (market price)." },
    { term: "Value for money (VFM)", def: "Performance in not-for-profit bodies assessed through the three Es — economy, efficiency and effectiveness." },
  ],
  summary: [
    "ROI (controllable profit ÷ controllable capital) is size-neutral but can push managers to reject value-adding projects that dilute the average.",
    "RI (profit − capital × cost of capital) and EVA (NOPAT − capital × WACC) charge for capital in absolute dollars, restoring goal congruence — but flatter larger divisions.",
    "Financial measures are backward-looking and short-termist; the balanced scorecard, building-block model and performance pyramid add leading, non-financial indicators.",
    "The transfer-price range runs from the seller's floor (marginal cost + opportunity cost) to the buyer's ceiling (lower of market price and net marginal revenue); with a perfect market at full capacity it collapses to market price.",
    "Not-for-profit and public-sector performance is judged on value for money — economy (inputs), efficiency (output per input) and effectiveness (outcomes) — always benchmarked against the external environment.",
  ],
}
