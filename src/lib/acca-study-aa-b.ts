import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area B — Planning & risk assessment.
 * Original, syllabus-aligned rich study chapter: objective & benefits of
 * planning; audit strategy vs audit plan; understanding the entity (ISA 315);
 * the audit risk model (AR = IR × CR × DR) and responses; materiality &
 * performance materiality (ISA 320); analytical procedures at planning
 * (ISA 520); fraud & the fraud triangle (ISA 240); professional scepticism;
 * interim vs final audit. No ACCA/Kaplan/BPP text.
 */

export const AA_B: StudyChapter = {
  paper: "AA",
  area: "B",
  title: "Planning & risk assessment",
  minutes: 17,
  intro: "You cannot audit everything, so you audit what matters most. Planning is how the auditor decides where the risk lives — and points scarce time straight at it.",
  outcomes: [
    "Explain the objective of audit planning and why a planned audit is a better audit",
    "Distinguish the audit strategy from the detailed audit plan",
    "Understand the entity and its environment to identify risks of material misstatement (ISA 315)",
    "Apply the audit risk model — audit risk = inherent risk × control risk × detection risk — and design responses",
    "Set materiality and performance materiality using benchmarks (ISA 320) and use analytical procedures at planning (ISA 520)",
    "Explain the auditor's fraud responsibilities, the fraud triangle and professional scepticism (ISA 240)",
  ],
  sections: [
    {
      id: "why-plan",
      heading: "Why auditors plan",
      blocks: [
        { kind: "text", md: "An auditor never checks every transaction — a company may post millions of them, and the audit fee buys only a few weeks of work. So the whole game is **focus**: spend the time where a misstatement is most likely and most damaging, and spend far less where it is not. **Planning** is the process that makes that choice deliberate rather than accidental." },
        { kind: "text", md: "A well-planned audit does four things. It directs **attention to the important, risky areas** so nothing material slips through. It helps the audit get done **efficiently and on time**. It lets the firm assign the right people — a tricky going-concern judgement to a senior, routine testing to a junior. And it coordinates the work of the **team, experts and any component auditors** so effort is not duplicated or dropped." },
        { kind: "callout", tone: "key", title: "The one idea", md: "Planning does not reduce the amount that could go wrong — it points the auditor's limited time at the places where a **material misstatement** is most likely to hide." },
        { kind: "callout", tone: "rule", title: "Planning is continuous", md: "Planning is **not** a one-off task finished before fieldwork begins. It is revisited throughout the engagement: as the auditor learns more, the assessed risks — and the planned response — are **updated**." },
      ],
    },
    {
      id: "strategy-plan",
      heading: "The audit strategy vs the audit plan",
      blocks: [
        { kind: "text", md: "Planning produces two connected documents, and the exam loves to test the difference. The **audit strategy** is the high-level, big-picture document: it sets the **scope, timing and direction** of the engagement and guides the development of the detailed plan. Think of it as choosing the route and booking the trip. The **audit plan** is the detailed, granular document: it sets out the **nature, timing and extent** of the specific audit procedures the team will perform. Think of it as the turn-by-turn directions." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Strategy vs plan — big picture vs the detail",
          data: {
            leftTitle: "Audit strategy",
            rightTitle: "Audit plan",
            rows: [
              { aspect: "Level", left: "High-level, overall", right: "Detailed, procedure-by-procedure" },
              { aspect: "Sets", left: "Scope, timing and direction", right: "Nature, timing and extent of procedures" },
              { aspect: "Contains", left: "Resources, key deadlines, materiality, reporting objectives", right: "Specific risk-assessment, control and substantive procedures" },
              { aspect: "Analogy", left: "The route and the booking", right: "The turn-by-turn directions" },
              { aspect: "Order", left: "Prepared first, guides the plan", right: "Developed from the strategy" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Memory hook: **strategy = S**cope, timing, **direction**; **plan = N**ature, timing, **extent**. Both share timing; the strategy is the map, the plan is the steps." },
      ],
      check: {
        q: "Which document sets out the NATURE, TIMING and EXTENT of the specific audit procedures to be performed?",
        options: [
          "The audit strategy",
          "The engagement letter",
          "The audit plan",
          "The auditor's report",
        ],
        correct: 2,
        explain: "The detailed audit PLAN specifies the nature, timing and extent of procedures. The audit strategy is the higher-level document that sets scope, timing and direction and guides development of the plan. The engagement letter agrees terms before the audit; the auditor's report is the output at the end.",
      },
    },
    {
      id: "understand-entity",
      heading: "Understanding the entity (ISA 315)",
      blocks: [
        { kind: "text", md: "You cannot judge whether a number looks wrong until you know what \"right\" would look like for this business. **ISA 315** requires the auditor to obtain an understanding of the **entity and its environment**, including its **internal control**, in order to identify and assess the **risks of material misstatement** — whether caused by error or fraud. This understanding is the foundation the whole risk assessment is built on." },
        { kind: "text", md: "The auditor looks outward and inward: the **industry, regulatory and economic environment**; the entity's **nature** — what it does, how it is financed, its ownership; its **accounting policies** and why they were chosen; its **objectives, strategies and related business risks**; how management **measures financial performance**; and the **internal control** relevant to the audit. Each of these can flag an area where the statements are more likely to be misstated." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Sources of risk the auditor scans (ISA 315)",
          caption: "Understanding these tells the auditor where misstatements are most likely to arise.",
          data: {
            items: [
              { title: "Industry & external factors", sub: "Regulation, competition, economic conditions" },
              { title: "Nature of the entity", sub: "Operations, ownership, how it is financed" },
              { title: "Accounting policies", sub: "Choice and appropriateness; any changes" },
              { title: "Objectives & strategies", sub: "Related business risks that may cause misstatement" },
              { title: "Performance measures", sub: "Pressure created by targets and KPIs" },
              { title: "Internal control", sub: "The system that should prevent and detect error" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "How the auditor gets this understanding", md: "Risk-assessment procedures under ISA 315 are: **enquiries** of management and others, **analytical procedures**, and **observation and inspection**. These are performed to *find* risk — they are not, by themselves, the tests that gather final audit evidence." },
      ],
      check: {
        q: "Under ISA 315, the auditor obtains an understanding of the entity and its environment primarily in order to:",
        options: [
          "Calculate the audit fee for the engagement",
          "Identify and assess the risks of material misstatement",
          "Write the auditor's report opinion",
          "Replace the need for substantive procedures",
        ],
        correct: 1,
        explain: "ISA 315 is a risk-assessment standard: the understanding exists to identify and assess the risks of material misstatement (from error or fraud) so the auditor can design a response. It does not set the fee, is not the report itself, and never removes the need for substantive procedures.",
      },
    },
    {
      id: "risk-model",
      heading: "The audit risk model",
      blocks: [
        { kind: "text", md: "\"Audit risk\" is the risk that the auditor gives an **inappropriate opinion** — typically a clean opinion when the statements are actually **materially misstated**. The auditor's job is to keep this risk acceptably low. ISA breaks audit risk into three components, and understanding which ones the auditor can and cannot control is the single most important idea in this area." },
        { kind: "formula", name: "The audit risk model", expr: "Audit risk = Inherent risk × Control risk × Detection risk", note: "Inherent risk × control risk together form the risk of material misstatement (RoMM) — the risk in the client's own numbers, before the auditor does anything." },
        { kind: "text", md: "**Inherent risk** is the susceptibility of a balance or transaction to misstatement before considering controls — cash is tempting to steal, estimates are hard to get right, complex or fast-changing areas go wrong more often. **Control risk** is the risk that the client's **internal controls fail** to prevent or detect a misstatement. Crucially, both of these belong to the **client** — the auditor can only *assess* them, not change them." },
        { kind: "callout", tone: "rule", title: "Only detection risk is the auditor's to control", md: "**Detection risk** is the risk that the auditor's own procedures **fail to detect** a material misstatement. It is the only component the auditor controls — by changing the **nature, timing and extent** of testing. If inherent and control risk are assessed as high, the auditor must drive detection risk **down** (more work, more experienced staff, testing at the year-end) to keep overall audit risk acceptable." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "From risk assessment to audit response",
          caption: "High client-side risk forces the auditor to lower detection risk with a stronger response.",
          data: {
            steps: [
              { label: "Assess inherent risk", sub: "How error-prone is this area by nature?" },
              { label: "Assess control risk", sub: "Will the client's controls catch it?" },
              { label: "Risk of material misstatement", sub: "IR × CR — the risk in the numbers" },
              { label: "Set detection risk", sub: "Lower it when RoMM is high" },
              { label: "Design response", sub: "More/experienced staff, year-end testing, larger samples" },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The three components — who owns each?",
          data: {
            leftTitle: "Client's risks (assess only)",
            rightTitle: "Auditor's risk (controllable)",
            rows: [
              { aspect: "Component", left: "Inherent risk & control risk", right: "Detection risk" },
              { aspect: "What it is", left: "Susceptibility to error; controls failing to catch it", right: "Auditor's procedures failing to find it" },
              { aspect: "Who influences it", left: "The client (auditor cannot change it)", right: "The auditor" },
              { aspect: "The lever", left: "None — the auditor can only measure it", right: "Nature, timing and extent of procedures" },
              { aspect: "If the other risks are high", left: "RoMM is high — a red flag", right: "Drive detection risk down to compensate" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The inverse relationship", md: "Detection risk moves **inversely** to the risk of material misstatement. High RoMM → the auditor must **reduce** detection risk (do more work). It is a common exam error to say the auditor should raise detection risk when client risk is high — that is backwards." },
      ],
      check: {
        q: "The auditor assesses both inherent risk and control risk as HIGH for a client. To keep audit risk acceptably low, detection risk should be:",
        options: [
          "Increased, because the other risks are already high",
          "Reduced, by performing more and better-targeted procedures",
          "Ignored, because it is the client's responsibility",
          "Set equal to control risk",
        ],
        correct: 1,
        explain: "Detection risk is the only component the auditor controls and it moves inversely to the risk of material misstatement. If inherent and control risk are high, the auditor must REDUCE detection risk — more experienced staff, larger samples, testing at year-end — so that overall audit risk stays acceptably low.",
      },
    },
    {
      id: "materiality",
      heading: "Materiality & performance materiality (ISA 320)",
      blocks: [
        { kind: "text", md: "Auditors do not chase every last cent — they chase misstatements big enough to **change a user's decision**. A misstatement is **material** if, individually or together with others, it could reasonably be expected to influence the economic decisions users make on the basis of the statements. Materiality has a **size** dimension (how large) and a **nature** dimension (some items — directors' pay, related-party deals, a profit that turns to a loss — matter whatever the amount)." },
        { kind: "text", md: "Materiality is set with judgement, but exams expect familiar **benchmark ranges** applied to an appropriate figure. These are guides, not rules: the auditor picks a benchmark that fits the users' focus (profit for an investor-owned trading company, assets or revenue where profit is volatile or near breakeven)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Common materiality benchmarks (indicative ranges)",
          caption: "Judgemental starting points — the auditor selects the most relevant benchmark for the entity.",
          data: {
            items: [
              { title: "½% – 1% of revenue", sub: "Useful when profit is volatile or the entity is not-for-profit" },
              { title: "1% – 2% of total assets", sub: "Asset-heavy or near-breakeven entities" },
              { title: "5% – 10% of profit before tax", sub: "The classic benchmark for a profit-focused business" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Performance materiality is lower", md: "**Performance materiality** is set **below** overall materiality. Why? To leave a buffer for the many small, undetected misstatements that could **aggregate** into something material. It reduces the chance that the total of uncorrected and undetected misstatements exceeds materiality for the statements as a whole." },
        { kind: "example", title: "Worked example — a planning risk & materiality assessment", scenario: "You are planning the audit of Harbour Traders Co. Draft profit before tax is $2,000,000, revenue $30,000,000 and total assets $18,000,000. During planning you learn: (a) a new IT system was introduced mid-year and several control reconciliations were skipped; (b) directors receive a bonus if profit exceeds $1,900,000; and (c) inventory includes slow-moving lines. Set overall materiality and identify the risk response.", steps: [
          { label: "Choose a benchmark", detail: "Harbour is a profit-making trading company, so profit before tax is the most relevant benchmark for its investors." },
          { label: "Overall materiality", detail: "5% – 10% of PBT = $100,000 to $200,000. Take a prudent $120,000 given the heightened risk this year." },
          { label: "Performance materiality", detail: "Set below overall — say 75% of $120,000 = $90,000 — to buffer against aggregating misstatements." },
          { label: "Inherent risk — bonus", detail: "Profit of $2.0m sits just above the $1.9m bonus threshold. Management has an incentive to overstate profit → higher inherent (and fraud) risk over revenue and cut-off." },
          { label: "Control risk — new IT", detail: "Skipped reconciliations after a mid-year system change raise control risk; controls may not be relied upon this year." },
          { label: "Response", detail: "High RoMM means detection risk must fall: assign experienced staff, extend substantive testing of revenue cut-off and inventory net realisable value, and test at the year-end rather than interim." },
        ], result: "Overall materiality ≈ $120,000, performance materiality ≈ $90,000. The bonus incentive and weakened controls raise the risk of material misstatement, so the audit response is more substantive, year-end testing by experienced staff — reducing detection risk to keep audit risk acceptable." },
      ],
      check: {
        q: "Why is performance materiality set at a level LOWER than overall materiality for the financial statements as a whole?",
        options: [
          "To charge the client a higher audit fee",
          "To buffer against the aggregate of small undetected and uncorrected misstatements exceeding overall materiality",
          "Because performance materiality is required to equal 5% of profit",
          "To make the audit faster by testing fewer items",
        ],
        correct: 1,
        explain: "Performance materiality is deliberately below overall materiality to create a margin. Many individually immaterial misstatements can aggregate to something material; the lower threshold reduces the risk that the total of undetected and uncorrected misstatements exceeds overall materiality.",
      },
    },
    {
      id: "analytical",
      heading: "Analytical procedures at planning (ISA 520)",
      blocks: [
        { kind: "text", md: "**Analytical procedures** evaluate financial information by studying **plausible relationships** among data — comparing this year to last, to budget, to the industry, and checking that ratios and figures move together the way you would expect. **ISA 315/520 make analytical procedures mandatory at the planning stage**: they are one of the risk-assessment procedures used to spot the unusual or unexpected before fieldwork begins." },
        { kind: "text", md: "The auditor looks for the number that does not fit: revenue up but receivables days sharply longer (possible overstated or fictitious sales), gross margin jumping with no operational reason, inventory ballooning while sales fall (possible obsolescence), gearing worsening (going-concern risk). Each unexpected movement flags an area to investigate and shapes the detailed plan." },
        { kind: "table", caption: "Reading the signals at planning", head: ["What you observe", "Possible risk it flags", "Where it points the audit"], rows: [
          ["Revenue up, receivable days much longer", "Overstated/fictitious sales or poor collection", "Revenue cut-off; receivables recoverability"],
          ["Gross margin jumps, no operational cause", "Misstated inventory, cut-off or cost errors", "Inventory valuation; purchases cut-off"],
          ["Inventory rising while sales fall", "Slow-moving/obsolete stock", "Net realisable value of inventory"],
          ["Gearing and interest cover worsening", "Going-concern pressure", "Going-concern review; disclosures"],
        ] },
        { kind: "callout", tone: "warn", title: "A signal, not a conclusion", md: "An unexpected ratio at planning does **not** prove a misstatement exists — it directs **where to look**. The auditor must corroborate the reason with further evidence before drawing any conclusion." },
      ],
    },
    {
      id: "fraud",
      heading: "Fraud & the fraud triangle (ISA 240)",
      blocks: [
        { kind: "text", md: "Two very different things get lumped together as \"fraud\". **Error** is unintentional. **Fraud** is an **intentional** act using deception to gain an unfair or illegal advantage. ISA 240 splits fraud into **fraudulent financial reporting** (deliberately misstating the statements — e.g. inflating revenue to hit a target) and **misappropriation of assets** (theft, often with false records to hide it)." },
        { kind: "callout", tone: "rule", title: "Whose responsibility is fraud?", md: "Preventing and detecting fraud is primarily the responsibility of **those charged with governance and management**. The **auditor's** responsibility is to obtain reasonable assurance that the statements are free from material misstatement **whether caused by fraud or error** — applying professional scepticism throughout. The auditor is not a fraud investigator and does not guarantee that all fraud will be found." },
        { kind: "text", md: "Why does fraud happen? The **fraud triangle** explains that three conditions are typically present together. Understanding them helps the auditor spot where fraud risk is elevated — for example, the profit-linked director bonus in the Harbour example above is a textbook **incentive/pressure**." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The fraud triangle — three conditions of fraud",
          caption: "When incentive, opportunity and rationalisation coincide, fraud risk is at its highest.",
          data: {
            levels: [
              { label: "Incentive / pressure", sub: "A reason to do it — targets, bonuses, debt covenants, personal financial need" },
              { label: "Opportunity", sub: "A way to do it — weak controls, override by management, poor segregation of duties" },
              { label: "Rationalisation / attitude", sub: "A mindset that justifies it — 'everyone does it', 'I'll pay it back'" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Professional scepticism", md: "**Professional scepticism** is an attitude of a **questioning mind**, alert to conditions that may indicate misstatement, and a **critical assessment of evidence**. It means not taking management's explanations or records at face value — assuming neither honesty nor dishonesty, but seeking corroboration. ISA 240 requires it to be maintained throughout the audit, whatever the auditor's past experience of the client's integrity." },
        { kind: "callout", tone: "warn", title: "Management override", md: "Because management can **override controls**, ISA 240 treats management override as a risk present in **every** audit. This is why the auditor always performs procedures such as testing journal entries and reviewing significant estimates for bias — regardless of how strong the controls otherwise appear." },
      ],
      check: {
        q: "According to the fraud triangle, which THREE conditions are typically present when fraud occurs?",
        options: [
          "Incentive/pressure, opportunity, and rationalisation",
          "Materiality, risk and evidence",
          "Inherent, control and detection risk",
          "Scope, timing and direction",
        ],
        correct: 0,
        explain: "The fraud triangle is incentive/pressure (a reason), opportunity (a way — often weak controls or management override), and rationalisation/attitude (a justifying mindset). The other options describe, respectively, materiality concepts, the audit risk model components, and the elements of the audit strategy.",
      },
    },
    {
      id: "interim-final",
      heading: "Interim vs final audit",
      blocks: [
        { kind: "text", md: "A larger audit is rarely done in one visit. The **interim audit** takes place **during** the accounting period, before the year-end. Its focus is on work that does not depend on final balances: documenting and **testing controls**, performing risk-assessment procedures, and testing transactions that have already occurred. The **final audit** takes place **after** the year-end and concentrates on the **year-end balances** and the substantive procedures needed to form the opinion." },
        { kind: "diagram", diagram: {
          type: "timeline",
          title: "How an audit is spread across the year",
          caption: "Interim work reduces the pressure at the year-end and can shape the final response.",
          data: {
            points: [
              { label: "Planning", sub: "Strategy, understanding the entity, risk assessment" },
              { label: "Interim audit", sub: "During the year: test controls, transactions to date" },
              { label: "Year-end", sub: "Reporting date — balances are struck" },
              { label: "Final audit", sub: "After year-end: substantive testing of balances" },
              { label: "Auditor's report", sub: "Opinion signed" },
            ],
          },
        } },
        { kind: "text", md: "Splitting the work has real benefits: it spreads the auditor's effort so the **year-end crunch is lighter**, gives management earlier notice of any control weaknesses, and can allow **earlier reporting**. But the auditor must be careful — evidence from the interim visit covers only **part of the period**, so procedures are needed to cover the **remaining period** up to the year-end, and interim conclusions may need updating if circumstances change." },
      ],
    },
  ],
  examTraps: [
    { trap: "Saying the auditor should raise detection risk when inherent and control risk are high.", fix: "It's the opposite. Detection risk moves inversely to the risk of material misstatement — high RoMM means the auditor must REDUCE detection risk by doing more work." },
    { trap: "Writing audit risk = inherent risk + control risk + detection risk.", fix: "The components MULTIPLY, not add: audit risk = inherent × control × detection. Inherent × control = the risk of material misstatement." },
    { trap: "Confusing the audit strategy with the audit plan.", fix: "Strategy = high-level scope, timing and direction. Plan = detailed nature, timing and extent of specific procedures, developed from the strategy." },
    { trap: "Saying the auditor is primarily responsible for preventing and detecting fraud.", fix: "That responsibility is management's and those charged with governance's. The auditor obtains reasonable assurance the statements are free from material misstatement, whether from fraud or error." },
    { trap: "Treating performance materiality as the same as overall materiality.", fix: "Performance materiality is set BELOW overall materiality to buffer against the aggregation of small undetected and uncorrected misstatements." },
  ],
  keyTerms: [
    { term: "Audit risk", def: "The risk that the auditor expresses an inappropriate opinion when the financial statements are materially misstated; = inherent × control × detection risk." },
    { term: "Detection risk", def: "The risk that the auditor's procedures fail to detect a material misstatement — the only component the auditor controls, via the nature, timing and extent of testing." },
    { term: "Risk of material misstatement", def: "Inherent risk combined with control risk — the risk in the client's own figures before the auditor performs any procedures." },
    { term: "Materiality", def: "The threshold above which a misstatement, by size or nature, could reasonably be expected to influence users' economic decisions." },
    { term: "Performance materiality", def: "An amount set below overall materiality to reduce the risk that the aggregate of undetected and uncorrected misstatements exceeds materiality." },
    { term: "Professional scepticism", def: "An attitude of a questioning mind, alertness to possible misstatement, and critical assessment of audit evidence — not taking management's word at face value." },
  ],
  summary: [
    "Planning directs limited audit time at the areas of highest risk; it is continuous, not a one-off, and produces a high-level strategy (scope, timing, direction) and a detailed plan (nature, timing, extent).",
    "ISA 315 requires understanding the entity and its environment, including internal control, to identify and assess the risks of material misstatement from error or fraud.",
    "Audit risk = inherent risk × control risk × detection risk; only detection risk is controllable by the auditor, and it moves inversely to the risk of material misstatement.",
    "Materiality (ISA 320) is set from benchmarks — e.g. 5–10% of profit before tax, ½–1% of revenue, 1–2% of assets — and performance materiality is set below it; analytical procedures (ISA 520) are mandatory at planning.",
    "Fraud is intentional; the fraud triangle is incentive/pressure, opportunity and rationalisation; management is primarily responsible for prevention, the auditor applies professional scepticism to obtain reasonable assurance over fraud and error.",
  ],
}
