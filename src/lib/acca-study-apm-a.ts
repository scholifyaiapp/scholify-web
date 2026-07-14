import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area A — Strategic planning & control.
 * Rich, exam-depth chapter: mission → objectives → CSFs/KPIs, strategic
 * budgeting and its behavioural effects, forecasting & planning models,
 * benchmarking, performance-management frameworks (Ferreira & Otley,
 * McKinsey 7S) and environmental/sustainability management accounting.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const APM_A: StudyChapter = {
  paper: "APM",
  area: "A",
  title: "Strategic planning & control",
  minutes: 17,
  intro: "A performance system is only as good as the strategy it serves. Before you measure anything, you have to know what the organisation is trying to become — and design planning, budgeting and control so they pull in that direction.",
  outcomes: [
    "Trace the planning hierarchy from mission through objectives to critical success factors and KPIs",
    "Select an appropriate strategic budgeting approach and explain its behavioural effects",
    "Evaluate the role — and the limits — of forecasting and planning models",
    "Apply benchmarking as a driver of performance improvement",
    "Use the Ferreira & Otley and McKinsey 7S frameworks to critique a performance-management system",
    "Explain how environmental and sustainability management accounting extends the control problem",
  ],
  sections: [
    {
      id: "planning-hierarchy",
      heading: "From mission to KPI — the planning hierarchy",
      blocks: [
        { kind: "text", md: "Strategic performance management starts with a chain of intent. At the top sits the **mission** — an enduring statement of why the organisation exists and what makes it distinctive. It is not measurable, and it is not meant to be; its job is to give everything below it a direction. Beneath the mission sit **strategic objectives** (the medium-term, often quantified targets that turn purpose into ambition), then the **critical success factors** — the handful of things the organisation absolutely must get right to achieve those objectives — and finally the **key performance indicators**, the specific measures that tell you whether each CSF is being delivered." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The line of sight from purpose to measure",
          caption: "Each layer narrows the one above it into something more concrete and, eventually, measurable.",
          data: {
            steps: [
              { label: "Mission", sub: "why we exist — not measured" },
              { label: "Objectives", sub: "medium-term quantified goals" },
              { label: "CSFs", sub: "what we must get right" },
              { label: "KPIs", sub: "how we know we did" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "A **CSF** is an *area* of activity that must go well; a **KPI** is the *measure* that reports on it. Confusing the two is the fastest way to build a dashboard that measures plenty but tells you nothing about strategy." },
        { kind: "text", md: "The environment shapes every layer. Mendelow's stakeholder mapping (power vs interest) tells you whose objectives must be satisfied; PESTEL and Porter's five forces frame the external pressures the strategy must answer. A performance system that ignores the environment measures internal efficiency while the ground shifts underneath it — the classic reason a business hits every internal target and still fails." },
        { kind: "example", title: "Worked example — turning a CSF into KPIs", scenario: "A subscription streaming firm's objective is to grow recurring revenue 20% a year. Management identifies 'retain existing subscribers' as a critical success factor. Design KPIs that report on it.", steps: [
          { label: "Name the CSF", detail: "Retain existing subscribers — an area of activity, not yet a number." },
          { label: "Find measurable symptoms", detail: "Monthly churn rate, average subscription lifetime, and net revenue retention all move when retention moves." },
          { label: "Set targets", detail: "Churn below 3% per month; net revenue retention above 100% (upsell outweighs cancellations)." },
          { label: "Check the link", detail: "If churn falls to 2% but revenue still stalls, the CSF chosen was incomplete — acquisition may be the real constraint." },
        ], result: "The CSF 'retain subscribers' becomes three concrete KPIs (churn, lifetime, net revenue retention). The KPIs are only valid while they genuinely drive the 20% objective — which is why the chain must be reviewed, not set once." },
      ],
      check: {
        q: "In the planning hierarchy, which statement best distinguishes a critical success factor from a KPI?",
        options: [
          "A CSF is always financial; a KPI is always non-financial",
          "A CSF is an area that must go well; a KPI is the measure that reports on it",
          "A CSF is set by managers; a KPI is set by shareholders",
          "A CSF is short-term; a KPI is long-term",
        ],
        correct: 1,
        explain: "A CSF names an area of performance the organisation must get right to meet its objectives (e.g. 'retain customers'); a KPI is the specific quantified measure that tells you whether that CSF is being delivered (e.g. 'monthly churn rate'). CSFs and KPIs can each be financial or non-financial, and both are management tools — so the other options mis-state the distinction.",
      },
    },
    {
      id: "strategic-budgeting",
      heading: "Budgeting approaches at the strategic level",
      blocks: [
        { kind: "text", md: "Budgeting is where strategy meets cash. At the strategic level the choice of *approach* matters as much as the numbers, because each approach embeds a different assumption about how resources should be justified and how the future is planned." },
        { kind: "table", caption: "Five strategic budgeting approaches", head: ["Approach", "Core idea", "Best when", "Main drawback"], rows: [
          ["Incremental", "Last year's budget + an adjustment", "Environment is stable; low-value cost base", "Perpetuates old inefficiency; budgetary slack builds up"],
          ["Zero-based (ZBB)", "Every activity justified from a zero base each cycle", "Discretionary costs; need to challenge spend", "Time-consuming; can feel threatening to managers"],
          ["Activity-based (ABB)", "Budget cost of activities that drive cost", "Complex overheads; many products", "Needs reliable activity/driver data"],
          ["Rolling", "Continuously extended so a full period always ahead", "Fast-changing environment; unreliable annual forecasts", "Costly to re-prepare; can encourage short-termism"],
          ["Beyond budgeting", "Replace the fixed annual budget with relative, adaptive targets", "Volatile markets; empowered, devolved teams", "Cultural shift is hard; weak cost benchmarks for some"],
        ] },
        { kind: "text", md: "**Zero-based budgeting** deserves attention because it inverts the default. Instead of asking \"how much more than last year?\" it asks \"if this activity did not exist, would we start it — and at what level?\" Each activity is described in a **decision package** setting out its cost, benefit and alternatives; packages are then ranked and funded down the priority list until the money runs out. That is powerful for discretionary spend (marketing, R&D, training) but exhausting to apply to everything every year, which is why many firms run ZBB on a rolling cycle across departments." },
        { kind: "text", md: "**Beyond budgeting** goes further and questions the annual budget itself. Its critics argue that a fixed annual target is negotiated once, then defended all year: it fixes managers to stale assumptions, rewards hitting the number rather than serving the customer, and encourages the year-end \"spend it or lose it\" scramble. Beyond budgeting replaces the fixed target with **relative** targets (beat the market, beat a peer group, improve on a rolling average) and devolves decisions to front-line teams, using rolling forecasts for coordination rather than control." },
        { kind: "callout", tone: "warn", title: "Behavioural effects — the exam's favourite angle", md: "Budgets change behaviour, not just cash. **Incremental** budgeting breeds **slack** (padding the budget to make targets easy). **ZBB** can feel like an annual threat, encouraging managers to overstate the value of their own packages. **Rolling** budgets keep forecasts fresh but can push managers toward **short-termism**. A budget set with **participation** can improve motivation and acceptance — but the same participation is what lets slack creep in. Always weigh motivation against control." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Incremental vs zero-based — two philosophies of spend",
          data: {
            leftTitle: "Incremental",
            rightTitle: "Zero-based",
            rows: [
              { aspect: "Starting point", left: "Last year's figure", right: "Zero — nothing is assumed" },
              { aspect: "Question asked", left: "How much more?", right: "Should this exist, and at what level?" },
              { aspect: "Effort", left: "Low", right: "High" },
              { aspect: "Effect on slack", left: "Slack accumulates unchallenged", right: "Slack is exposed and cut" },
              { aspect: "Best suited to", left: "Stable, committed costs", right: "Discretionary, reviewable costs" },
            ],
          },
        } },
      ],
      check: {
        q: "A division's marketing and training spend has drifted upward for years with no one questioning the base. Which budgeting approach most directly attacks this, and why?",
        options: [
          "Incremental — it smooths spending changes over time",
          "Zero-based — every activity must be re-justified from a zero base",
          "Rolling — it extends the budget period continuously",
          "Activity-based — it allocates overheads to cost drivers",
        ],
        correct: 1,
        explain: "The problem is unchallenged, discretionary spend carried forward year after year — exactly the accumulated slack that zero-based budgeting is designed to expose. ZBB forces each activity to be justified from zero via decision packages, so drifting marketing and training costs must earn their funding. Incremental budgeting would perpetuate the drift; rolling and activity-based budgeting change the timing and allocation of costs but do not, by themselves, challenge the base.",
      },
    },
    {
      id: "forecasting-models",
      heading: "Forecasting and planning models",
      blocks: [
        { kind: "text", md: "Every budget rests on a forecast, and every forecast rests on a model — an explicit or implicit set of assumptions about how the future behaves. Strategic planning models range from simple trend extrapolation and regression, through **what-if / sensitivity** analysis, to full simulation and scenario planning. Their value is not in producing a single \"right\" number but in making assumptions visible and testing how fragile the plan is." },
        { kind: "text", md: "A **planning model** built in a spreadsheet or dedicated tool lets management flex the drivers — price, volume, cost inflation, exchange rate — and watch the effect on profit and cash. This turns budgeting from a one-shot guess into an experiment: *what if volume falls 10%? what if a key input price doubles?* The danger is false precision: a model outputs figures to the nearest dollar from inputs that are, at best, informed guesses. **GIGO** — garbage in, garbage out — is the governing law." },
        { kind: "callout", tone: "rule", title: "Limits of models", md: "A model is a simplification, so it inherits three risks: **spurious accuracy** (precise outputs from vague inputs), **omitted variables** (the model can only reason about factors it contains), and **behavioural gaming** (once people know the model's drivers, they manage the drivers rather than the business). Use models to *challenge* judgement, never to replace it." },
        { kind: "example", title: "Worked example — sensitivity of the plan", scenario: "A plan projects contribution of $50 per unit on 100,000 units, giving $5,000,000 contribution against $3,500,000 fixed costs — a budgeted profit of $1,500,000. Management wants to know how sensitive profit is to the selling price, which drives contribution.", steps: [
          { label: "Budgeted profit", detail: "$5,000,000 contribution − $3,500,000 fixed = $1,500,000." },
          { label: "Margin of safety on contribution", detail: "Profit is wiped out when contribution falls by $1,500,000, i.e. from $5,000,000 to $3,500,000." },
          { label: "As a % of contribution", detail: "$1,500,000 ÷ $5,000,000 = 30%. Contribution can fall 30% before the plan breaks even." },
          { label: "Translate to price", detail: "With volume held at 100,000 units, a 30% fall in total contribution means contribution per unit falls from $50 to $35 — a $15 (30%) cut. If price is the only variable that moves, a $15 fall in selling price wipes out that contribution and reaches break-even (a 30% cut in contribution, not necessarily a 30% cut in price, since variable cost per unit is unchanged)." },
        ], result: "Profit tolerates a 30% adverse swing in contribution before break-even — a genuinely useful sensitivity statistic. It is only as reliable as the assumption that fixed costs and the cost structure stay put, which the model must state openly." },
      ],
    },
    {
      id: "benchmarking",
      heading: "Benchmarking",
      blocks: [
        { kind: "text", md: "Targets set in isolation drift. **Benchmarking** anchors them to an external or internal reference point: comparing the organisation's processes and performance against a standard to find, and close, the gap. Done well it is a continuous improvement engine; done badly it is number-copying that ignores *why* the leader is ahead." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Four kinds of benchmarking",
          caption: "Each widens the comparison — and the difficulty of getting the data.",
          data: {
            items: [
              { title: "Internal", sub: "Best-performing unit within the same group" },
              { title: "Competitive", sub: "Direct rivals in the same market" },
              { title: "Functional / operational", sub: "Same function in a different industry" },
              { title: "Strategic", sub: "Best-in-class practice, wherever it is found" },
            ],
          },
        } },
        { kind: "text", md: "The benefits are real: benchmarking imports proven practice, sets *credible* stretch targets, and challenges the \"we've always done it this way\" reflex. But the limits matter for a strategic paper. Benchmarks can be hard to obtain (rivals rarely share), can encourage **imitation over innovation** (you can only ever catch up to where the leader already was), and can mislead if the comparator's context differs — a low-cost airline's turnaround times are not a fair standard for a long-haul carrier. Benchmarking tells you *what* the gap is; it rarely tells you *how* to close it or whether you should." },
        { kind: "callout", tone: "tip", md: "In the exam, treat benchmarking as a *diagnostic*, not a strategy. Strong answers use a benchmark to raise a question (\"why is our cost-per-order double the sector median?\") and then reason about causes and fixes — not just report that a gap exists." },
      ],
      check: {
        q: "A retailer compares its warehouse picking accuracy against a leading online supermarket in a different sector. What type of benchmarking is this, and what is its main risk?",
        options: [
          "Internal benchmarking; the risk is that data is easy but unambitious",
          "Functional benchmarking; the risk is that different operating contexts make the comparison misleading",
          "Competitive benchmarking; the risk is that rivals will refuse to share data",
          "Strategic benchmarking; the risk is that it only ever produces imitation",
        ],
        correct: 1,
        explain: "Comparing the same function (warehouse picking) against an organisation in a different industry is functional (operational) benchmarking. Its characteristic risk is that operating contexts differ — the online supermarket's volumes, product mix and technology may make its accuracy figures an unfair or unattainable standard, so the gap must be interpreted with care rather than copied. It is not internal (different organisation), not competitive (different sector, not a direct rival) and not strategic (this is process-level, not best-in-class practice adoption).",
      },
    },
    {
      id: "frameworks",
      heading: "Performance-management frameworks",
      blocks: [
        { kind: "text", md: "Frameworks give you a structured way to *critique* a performance-management system rather than commenting on it piecemeal. APM leans on two in particular: the **Ferreira & Otley performance management systems framework** and **McKinsey's 7S model**." },
        { kind: "text", md: "The **Ferreira & Otley framework** (2009) extends earlier control-system thinking into twelve interrogating questions, spanning vision and mission, key success factors, organisation structure, strategies and plans, key performance measures, target-setting, performance evaluation, rewards, information flows, the use of the system, and how the whole thing changes and coheres. Its power is that it forces you to examine the *whole* system — not just the measures — and to ask whether the parts are internally consistent. A firm can have excellent KPIs that fail because rewards pull the other way, or because information never reaches the people who act on it." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Ferreira & Otley — the dimensions it interrogates",
          caption: "Twelve linked questions; a weakness in any one can undermine the rest.",
          data: {
            items: [
              { title: "Vision & mission", sub: "Is purpose clear and communicated?" },
              { title: "Key success factors", sub: "What must go right?" },
              { title: "Structure", sub: "Does structure support the strategy?" },
              { title: "Strategies & plans", sub: "How are they set and adapted?" },
              { title: "Key performance measures", sub: "Do they flow from KSFs and strategy?" },
              { title: "Target setting", sub: "How demanding, how fair?" },
              { title: "Performance evaluation", sub: "How is performance judged?" },
              { title: "Rewards", sub: "Do incentives reinforce the measures?" },
              { title: "Information flows", sub: "Do feedback loops reach decision-makers?" },
              { title: "Use, change & strength", sub: "How is the system used and evolved?" },
            ],
          },
        } },
        { kind: "text", md: "**McKinsey's 7S** takes a different cut: it argues that effective performance depends on the alignment of seven interdependent elements — three \"hard\" (**Strategy, Structure, Systems**) and four \"soft\" (**Shared values, Style, Staff, Skills**), with shared values at the centre. Its message for performance management is that you cannot change one element in isolation: bolt a demanding new measurement system (a hard S) onto a culture and leadership style (soft Ss) that reward something else, and the soft elements win. Change fails when the hard and soft Ss are pulled out of alignment." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two lenses on a performance system",
          data: {
            leftTitle: "Ferreira & Otley",
            rightTitle: "McKinsey 7S",
            rows: [
              { aspect: "Focus", left: "The control/measurement system itself", right: "Organisational alignment as a whole" },
              { aspect: "Structure", left: "12 interrogating questions", right: "7 interdependent elements" },
              { aspect: "Central idea", left: "Internal consistency of the PM system", right: "Hard and soft elements must align" },
              { aspect: "Best used to", left: "Diagnose a specific PM system", right: "Diagnose why change efforts fail" },
              { aspect: "Watch element", left: "Rewards vs measures conflict", right: "Shared values overriding new systems" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "How the exam uses them", md: "You will rarely be asked to *recite* a framework. You will be asked to *apply* it: use Ferreira & Otley to show that a company's rewards contradict its measures, or 7S to explain why a new balanced scorecard failed because leadership **style** and **shared values** never changed. Marks come from the linkage, not the list." },
      ],
      check: {
        q: "A company installs a sophisticated new KPI dashboard, but managers keep chasing the old volume bonus and ignore the new quality measures. Using McKinsey 7S, what is the most precise diagnosis?",
        options: [
          "Strategy is wrong, so the KPIs are irrelevant",
          "A hard element (systems) was changed without aligning the soft elements — style, staff and shared values still reward volume",
          "The structure is too centralised for KPIs to work",
          "The skills are missing, so managers cannot read the dashboard",
        ],
        correct: 1,
        explain: "7S says the seven elements must align. A new dashboard changes 'systems' (a hard S), but managers' behaviour is still driven by the soft elements — style, staff and shared values — which continue to reward volume through the old bonus. The mis-alignment between the new hard system and the unchanged soft elements is why the change fails. Nothing in the scenario says the strategy is wrong, the structure is at fault, or that managers lack the skills to read the dashboard — the issue is behavioural alignment.",
      },
    },
    {
      id: "environmental",
      heading: "Environmental & sustainability management accounting",
      blocks: [
        { kind: "text", md: "Strategic control now extends beyond the financial. **Environmental management accounting (EMA)** identifies, measures and manages the environmental costs a conventional system buries inside general overheads — energy, water, waste disposal, emissions permits, regulatory compliance and the cost of clean-up. Because these costs are hidden, they are rarely controlled; EMA drags them into the light so they can be reduced." },
        { kind: "text", md: "A common EMA taxonomy splits environmental costs into four types: **conventional** costs (energy, materials, water — often material but pooled into overhead), **contingent** costs (future clean-up, remediation and fines that may crystallise), **reputation / relationship** costs (the value of the firm's environmental standing with customers, regulators and communities), and costs that are **hidden** in general overhead until EMA techniques separate them out. Techniques such as **input–output analysis** (matching what comes in to what leaves as product versus waste), **flow cost accounting**, **life-cycle costing** and **activity-based costing** applied to environmental drivers all help attach these costs to the products and processes that cause them." },
        { kind: "callout", tone: "rule", title: "Why it is a control issue, not a PR issue", md: "If environmental cost sits in a general overhead pool, no manager owns it and no product carries it — so it is never managed down. EMA's core contribution is **traceability**: attach the cost to the activity that causes it, and the normal machinery of budgeting, variance analysis and responsibility accounting starts to work on it." },
        { kind: "text", md: "**Sustainability management accounting** widens the frame again to the \"triple bottom line\" — economic, environmental and social performance — and to reporting frameworks that make non-financial performance visible to stakeholders. The strategic-control problem is that these dimensions resist a single common unit: you cannot simply add tonnes of CO₂ to dollars of profit and hours of community volunteering. Integrated thinking, multiple KPIs and frameworks such as the balanced scorecard (with a sustainability perspective) are the practical response — accepting that some of the most important measures will never be financial." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Four categories of environmental cost (EMA)",
          data: {
            items: [
              { title: "Conventional", sub: "Energy, water, materials — often pooled in overhead" },
              { title: "Contingent", sub: "Future clean-up, remediation, fines" },
              { title: "Reputation / relationship", sub: "Value of environmental standing" },
              { title: "Hidden", sub: "Buried in general overhead until traced out" },
            ],
          },
        } },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating CSFs and KPIs as the same thing.", fix: "A CSF is an area that must go well; a KPI is the measure that reports on it. Name the CSF first, then attach measures." },
    { trap: "Recommending zero-based budgeting for everything, every year.", fix: "ZBB is powerful for discretionary spend but exhausting for committed costs. Often applied on a rolling cycle across departments — say so." },
    { trap: "Trusting a planning model's precise output as if the inputs were precise.", fix: "GIGO. Use models for sensitivity and challenge; state the assumptions and flag spurious accuracy." },
    { trap: "Reporting a benchmarking gap and stopping there.", fix: "A benchmark is a diagnostic. Marks come from reasoning about the causes of the gap and whether/how to close it, given context." },
    { trap: "Listing a framework instead of applying it.", fix: "Use Ferreira & Otley or 7S to explain a specific failure (rewards vs measures; soft Ss overriding a new system) — linkage earns the marks, not recall." },
  ],
  keyTerms: [
    { term: "Critical success factor", def: "An area of activity the organisation must get right to achieve its objectives; reported on by KPIs." },
    { term: "Zero-based budgeting", def: "Building each budget from a zero base, justifying every activity through ranked decision packages rather than incrementing last year." },
    { term: "Beyond budgeting", def: "Replacing the fixed annual budget with relative, adaptive targets and devolved decision-making supported by rolling forecasts." },
    { term: "Benchmarking", def: "Comparing processes and performance against an internal or external reference point to identify and close performance gaps." },
    { term: "Ferreira & Otley framework", def: "A performance-management systems framework of twelve interrogating questions used to assess the design and internal consistency of a control system." },
    { term: "Environmental management accounting", def: "Identifying, measuring and managing environmental costs (conventional, contingent, reputation and hidden) so they can be controlled rather than buried in overhead." },
  ],
  summary: [
    "Strategy flows mission → objectives → CSFs → KPIs; the environment shapes every layer, and a CSF is an area while a KPI is a measure.",
    "Strategic budgeting choices (incremental, ZBB, ABB, rolling, beyond budgeting) each embed a philosophy and a behavioural effect — weigh motivation against control.",
    "Forecasting and planning models add value through sensitivity and challenge, not single answers; beware GIGO and spurious accuracy.",
    "Benchmarking anchors targets externally but is a diagnostic — reason about the causes of a gap rather than copying the number.",
    "Ferreira & Otley (internal consistency) and McKinsey 7S (hard/soft alignment) critique whole systems; EMA and sustainability accounting extend control to non-financial and environmental costs.",
  ],
}
