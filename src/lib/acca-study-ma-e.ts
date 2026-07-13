import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * MA · Area E — Performance measurement.
 * Rich study chapter: responsibility centres & controllability, financial
 * performance (ROI/ROCE and residual income) and the divisional conflict,
 * non-financial indicators, the balanced scorecard, value for money (3 Es),
 * benchmarking, and service vs manufacturing measurement.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const MA_E: StudyChapter = {
  paper: "MA",
  area: "E",
  title: "Performance measurement",
  minutes: 15,
  intro: "A number on its own means nothing. Is a $200,000 profit good? It depends what was invested, what was promised, and what the competition managed. This chapter is about turning raw results into a fair judgement of performance.",
  outcomes: [
    "Explain what performance measurement is for and how responsibility centres and controllability shape it",
    "Calculate and interpret ROI/ROCE and residual income (RI), and explain the conflict between them",
    "Explain why non-financial performance indicators (NFPIs) matter and how the balanced scorecard organises them",
    "Apply value for money (the three Es) to public sector and not-for-profit performance",
    "Use benchmarking and adapt measures for service versus manufacturing organisations",
  ],
  sections: [
    {
      id: "basics",
      heading: "What performance measurement is — and who is on the hook",
      blocks: [
        { kind: "text", md: "Every organisation sets targets and then wants to know: **did we hit them?** Performance measurement compares actual results against a yardstick — the budget, the prior year, a rival, or a promise to customers — so managers can plan, control and be held to account. Without it, control is guesswork." },
        { kind: "text", md: "But you can only fairly judge a manager on things they can actually **control**. This is the **controllability principle**: hold each manager responsible only for the costs and revenues they can influence. A branch manager who cannot change head-office rent should not be blamed when that rent rises. To make this work, businesses split themselves into **responsibility centres** — units whose manager is accountable for a defined slice of performance." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The four responsibility centres — widening accountability",
          caption: "As you climb, the manager controls more: costs only, then revenue, then profit, then the capital invested.",
          data: {
            levels: [
              { label: "Investment centre", sub: "Accountable for profit AND the capital invested — judged on ROI or RI" },
              { label: "Profit centre", sub: "Accountable for revenues and costs — judged on profit" },
              { label: "Revenue centre", sub: "Accountable for revenue generated — e.g. a sales team" },
              { label: "Cost centre", sub: "Accountable for costs only — e.g. a maintenance department" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Why the centre type matters", md: "The **type of centre decides the measure**. You judge a cost centre on cost control, a profit centre on profit, and an **investment centre** on the return it earns for the capital tied up in it — which is where **ROI** and **residual income** come in." },
      ],
    },
    {
      id: "roi",
      heading: "Financial performance — ROI and ROCE",
      blocks: [
        { kind: "text", md: "For an investment centre, profit alone is not enough. A division earning $1m profit on $2m of assets is doing far better than one earning $1m on $20m of assets. **Return on investment (ROI)** — the same ratio you meet as **ROCE** at company level — relates the profit earned to the capital used to earn it, so you can compare divisions of different sizes." },
        { kind: "formula", name: "Return on investment (ROI)", expr: "ROI = controllable profit ÷ capital employed × 100%", note: "At company level the identical ratio is ROCE = operating profit ÷ capital employed. Use controllable/divisional profit and the division's own assets when judging a division." },
        { kind: "example", title: "Worked example — reading ROI", scenario: "The Northern division reports controllable operating profit of $90,000 and has capital employed (net assets) of $600,000. The Western division reports profit of $150,000 on capital employed of $1,200,000. Which division performed better this year?", steps: [
          { label: "Northern ROI", detail: "$90,000 ÷ $600,000 × 100% = 15%." },
          { label: "Western ROI", detail: "$150,000 ÷ $1,200,000 × 100% = 12.5%." },
          { label: "Compare like with like", detail: "Western earns more in absolute dollars, but ties up twice the capital. Per dollar invested, Northern works harder." },
        ], result: "Northern is the stronger performer at 15% vs 12.5% — ROI corrects for size, which raw profit cannot." },
        { kind: "callout", tone: "warn", title: "ROI has a dark side", md: "Because ROI is a **percentage**, a manager can raise it by **rejecting good projects** whose return is below the division's current average but still above the company's cost of finance. It can also be flattered by running down old, heavily-depreciated assets. Hold this thought — the next section shows the damage." },
      ],
      check: {
        q: "A division earns controllable profit of $60,000 on capital employed of $400,000. What is its ROI?",
        options: ["6.7%", "12%", "15%", "24%"],
        correct: 2,
        explain: "ROI = controllable profit ÷ capital employed = $60,000 ÷ $400,000 = 0.15 = 15%. The other options come from dividing the wrong way round or misplacing the decimal — always put profit on top and capital on the bottom.",
      },
    },
    {
      id: "ri",
      heading: "Residual income — and the conflict with ROI",
      blocks: [
        { kind: "text", md: "**Residual income (RI)** measures performance in **dollars**, not a percentage. It starts with the division's controllable profit and then charges the division for the capital it uses, at the company's **cost of capital**. Whatever is left over is the residual income — the value created **above** the minimum return the company requires." },
        { kind: "formula", name: "Residual income (RI)", expr: "RI = controllable profit − (capital employed × cost of capital)", note: "The bracketed part is the 'imputed interest' charge for tying up the company's money. A positive RI means the division beat the required return." },
        { kind: "text", md: "Here is the crux. Because ROI is an **average** and RI is an **absolute amount above a hurdle**, the two measures can push a manager in **opposite directions** on the very same decision. RI is goal-congruent — it accepts any project that beats the cost of capital; ROI is not." },
        { kind: "example", title: "Worked example — the ROI vs RI conflict", scenario: "The Southern division currently makes controllable profit of $180,000 on capital employed of $1,000,000. The company's cost of capital is 12%. A new project would need $200,000 of extra capital and add $30,000 of profit a year. The divisional manager's bonus depends on the division's ROI. Should the manager accept the project? Should the company want it accepted?", steps: [
          { label: "Current ROI", detail: "$180,000 ÷ $1,000,000 = 18%." },
          { label: "The project on its own", detail: "Project ROI = $30,000 ÷ $200,000 = 15%. That beats the 12% cost of capital, so it creates value for the company." },
          { label: "ROI after accepting", detail: "New profit $210,000 ÷ new capital $1,200,000 = 17.5%. The division's ROI FALLS from 18% to 17.5%." },
          { label: "Manager's ROI decision", detail: "Judged on ROI, the manager REJECTS — accepting would drag their headline number (and bonus) down from 18% to 17.5%." },
          { label: "Current RI", detail: "$180,000 − ($1,000,000 × 12%) = $180,000 − $120,000 = $60,000." },
          { label: "RI after accepting", detail: "$210,000 − ($1,200,000 × 12%) = $210,000 − $144,000 = $66,000. RI RISES by $6,000." },
          { label: "Manager's RI decision", detail: "Judged on RI, the manager ACCEPTS — RI improves by exactly the project's own RI of $30,000 − ($200,000 × 12%) = $6,000." },
        ], result: "Same project, opposite verdicts. ROI says reject (18% → 17.5%); RI says accept (+$6,000). The project is good for the company, so ROI causes DYSFUNCTIONAL behaviour and RI does not." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "The conflict, in one chart",
          caption: "The project's own return (15%) clears the 12% hurdle, yet accepting it pulls the division's average ROI below its old 18%.",
          data: {
            unit: "%",
            items: [
              { label: "Current ROI", value: 18 },
              { label: "ROI after project", value: 17.5 },
              { label: "Project ROI", value: 15 },
              { label: "Cost of capital", value: 12 },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "ROI vs residual income",
          data: {
            leftTitle: "ROI (%)",
            rightTitle: "Residual income ($)",
            rows: [
              { aspect: "Unit", left: "A percentage", right: "An absolute dollar amount" },
              { aspect: "Cost of capital", left: "Not built into the ratio", right: "Charged explicitly as imputed interest" },
              { aspect: "Comparing divisions of different sizes", left: "Easy — it is size-neutral", right: "Harder — a big division shows a bigger RI" },
              { aspect: "Goal congruence", left: "Can reject good projects (below the average)", right: "Accepts any project beating the cost of capital" },
              { aspect: "Intuitive to managers", left: "Yes — familiar %", right: "Less familiar, but decision-correct" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The exam rule", md: "A project is worthwhile whenever its **own return beats the cost of capital** (positive RI). ROI can wrongly reject such a project because it lowers the division's **average** percentage. That single sentence answers most ROI-vs-RI questions." },
      ],
      check: {
        q: "A division makes controllable profit of $50,000 on capital employed of $250,000. The cost of capital is 10%. What is its residual income?",
        options: ["$25,000", "$50,000", "$5,000", "$20,000"],
        correct: 0,
        explain: "RI = profit − (capital employed × cost of capital) = $50,000 − ($250,000 × 10%) = $50,000 − $25,000 = $25,000. The $20,000 distractor forgets the charge is on capital not profit; $50,000 forgets the imputed interest charge entirely.",
      },
    },
    {
      id: "nfpi",
      heading: "Beyond the numbers — NFPIs and the balanced scorecard",
      blocks: [
        { kind: "text", md: "Financial measures share three weaknesses: they are **backward-looking**, they are easy to **manipulate** in the short term, and they miss things that drive future profit — like whether customers will come back. **Non-financial performance indicators (NFPIs)** fill the gap: on-time delivery %, defect rates, customer satisfaction scores, staff turnover, market share. They are often the **leading** indicators that the financial results will follow." },
        { kind: "text", md: "The risk is measuring a scatter of numbers with no structure. The **balanced scorecard** (Kaplan & Norton) fixes this by forcing managers to set goals and measures across **four linked perspectives** — deliberately balancing financial with non-financial, and short term with long term." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The balanced scorecard — four perspectives",
          caption: "Each perspective answers a different question; success in the lower three drives the financial result.",
          data: {
            items: [
              { title: "Financial", sub: "How do we look to shareholders? e.g. ROCE, profit growth, cash flow" },
              { title: "Customer", sub: "How do customers see us? e.g. satisfaction, on-time delivery, retention" },
              { title: "Internal business process", sub: "What must we excel at? e.g. defect rate, cycle time, capacity use" },
              { title: "Innovation & learning", sub: "Can we keep improving? e.g. new products, staff training, staff turnover" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Remember the four", md: "**Financial, Customer, Internal process, Innovation & learning.** The lower three are the causes; the financial perspective is the effect. Improve the drivers and the money follows." },
      ],
      check: {
        q: "Under the balanced scorecard, in which perspective would 'percentage of orders delivered on time' most naturally sit?",
        options: [
          "Financial perspective",
          "Customer perspective",
          "Innovation and learning perspective",
          "It cannot be used as it is non-financial",
        ],
        correct: 1,
        explain: "On-time delivery is something customers directly experience and value, so it belongs in the customer perspective. NFPIs are exactly what the scorecard is designed to capture, so the last option is wrong — being non-financial is the point, not a disqualification.",
      },
    },
    {
      id: "vfm",
      heading: "Value for money, benchmarking and service organisations",
      blocks: [
        { kind: "text", md: "**Not-for-profit** and **public sector** bodies — a hospital, a charity, a council — have no profit to measure, and their real output (health, safety, education) is hard to price. Instead they are judged on **value for money (VFM)** using the **three Es**: are inputs bought cheaply (**economy**), converted well (**efficiency**), and do the outputs actually meet the objectives (**effectiveness**)?" },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Value for money — the three Es",
          caption: "Economy and efficiency concern doing things right; effectiveness concerns doing the right things.",
          data: {
            centre: "Value for money",
            nodes: [
              { label: "Economy", sub: "Buying inputs at the lowest reasonable cost" },
              { label: "Efficiency", sub: "Maximising output per unit of input" },
              { label: "Effectiveness", sub: "Achieving the organisation's actual objectives" },
            ],
          },
        } },
        { kind: "text", md: "**Benchmarking** is the discipline of comparing performance against a chosen standard to find where you fall short and copy what works. **Internal** benchmarking compares one branch with another; **competitive** benchmarking compares you with a direct rival; **functional** (or best-in-class) benchmarking compares a process — say, warehouse dispatch — with whoever does it best in any industry." },
        { kind: "text", md: "Finally, **service** organisations cannot be measured like factories. A car has a defect count; an hour of consulting does not. Services are **intangible** (no physical product to inspect), **simultaneous** (produced and consumed at once, so you cannot check quality before delivery), **perishable** (an empty airline seat is lost forever) and **variable** (quality depends on the person delivering it). So service measures lean on NFPIs — satisfaction, reliability, responsiveness — rather than units and defect rates." },
        { kind: "table", caption: "Same idea, different measures", head: ["Aspect", "Manufacturing", "Service"], rows: [
          ["Output", "Countable physical units", "Intangible experience"],
          ["Quality check", "Inspect before delivery", "Judged during/after delivery"],
          ["Typical measure", "Defect rate, units per hour", "Satisfaction, on-time %, repeat custom"],
          ["Inventory", "Can hold finished goods", "Perishable — cannot be stored"],
        ] },
        { kind: "callout", tone: "warn", title: "Don't confuse the three Es", md: "**Efficiency** is about the input-to-output conversion (a ratio); **effectiveness** is about whether the goal was met at all. A vaccination programme could be highly efficient (many jabs per nurse-hour) yet ineffective (if it fails to reduce disease). Both matter." },
      ],
      check: {
        q: "A charity measures whether its literacy programme actually raised participants' reading levels to the target standard. Which of the three Es is this?",
        options: ["Economy", "Efficiency", "Effectiveness", "Equity"],
        correct: 2,
        explain: "Measuring outputs against the organisation's objective (the target reading standard) is effectiveness — did it achieve what it set out to do? Economy is about input cost and efficiency is output per input. 'Equity' is not one of the three Es at all.",
      },
    },
  ],
  examTraps: [
    { trap: "Judging a manager on costs or profits they cannot control.", fix: "Apply the controllability principle: assess each responsibility centre only on what its manager can influence." },
    { trap: "Assuming a project that raises company value must raise the division's ROI.", fix: "A project can beat the cost of capital (good for the company) yet still be below the division's average ROI, so ROI wrongly rejects it. Test it with RI." },
    { trap: "Charging the imputed interest in RI on profit instead of on capital employed.", fix: "RI = profit − (capital employed × cost of capital). The interest charge is always on the capital, never on the profit." },
    { trap: "Treating ROI and ROCE as different formulas.", fix: "They are the same ratio — profit ÷ capital employed. ROCE is the company-level name; ROI is the divisional one." },
    { trap: "Mixing up efficiency and effectiveness in a VFM question.", fix: "Efficiency = output per unit of input (a ratio). Effectiveness = whether objectives were actually met." },
  ],
  keyTerms: [
    { term: "Investment centre", def: "A responsibility centre whose manager is accountable for profit and for the capital invested, so it is judged on ROI or RI." },
    { term: "Return on investment (ROI)", def: "Controllable profit as a percentage of capital employed; the divisional version of ROCE. Size-neutral but can reject good projects." },
    { term: "Residual income (RI)", def: "Controllable profit minus an imputed interest charge (capital employed × cost of capital); a dollar measure that is goal-congruent." },
    { term: "Balanced scorecard", def: "A framework setting goals and measures across four perspectives: financial, customer, internal process, and innovation & learning." },
    { term: "Value for money (three Es)", def: "The economy, efficiency and effectiveness test used to judge not-for-profit and public sector performance." },
  ],
  summary: [
    "Judge each responsibility centre on what its manager controls; the centre type (cost, revenue, profit, investment) dictates the measure.",
    "ROI = controllable profit ÷ capital employed; it is the same ratio as ROCE and corrects for size, but is a percentage.",
    "RI = controllable profit − (capital employed × cost of capital); a dollar figure that accepts any project beating the cost of capital.",
    "The ROI/RI conflict: ROI can reject a value-adding project because it lowers the division's average, while RI correctly accepts it.",
    "Non-financial measures, organised by the balanced scorecard's four perspectives, plus VFM's three Es and benchmarking, complete the picture — especially for services and the public sector.",
  ],
}
