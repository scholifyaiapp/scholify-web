import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area A, part one — strategic management accounting (A1) and the
 * performance hierarchy (A2).
 *
 *   APM-01  What strategic performance management is for   (A1a, b, c)
 *   APM-02  Stakeholders and their influence on measurement (A1d)
 *   APM-03  Strategic models in performance management     (A1e)
 *   APM-04  The balanced scorecard                          (A1f)
 *   APM-05  Benchmarking                                    (A1g)
 *   APM-06  Risk, uncertainty and risk appetite             (A1h)
 *   APM-07  Structure, culture and strategy                 (A1i, j)
 *   APM-08  Mission cascaded into goals and objectives      (A2a, b)
 *   APM-09  Critical success factors and the pyramid        (A2c, d)
 *   APM-10  The performance planning gap                    (A2e)
 *
 * APM's shim was the worst in the library — worse than SBL's. Areas A and B
 * were not relabelled chapters but COMPOSITES assembled by a local `take()`
 * helper that cherry-picked sections out of three different legacy chapters
 * and concatenated them, and Area D reached inside another chapter's section
 * to lift its blocks. The composition had already produced one silent defect
 * recorded in the old file: APM_A and APM_C both had a section keyed
 * "frameworks", so the composed Area A carried two sections with the same id
 * and the reader's progress tracking, which keys off that id, could not tell
 * them apart.
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027 — the RESTRUCTURED syllabus, whose areas are A strategic
 * management and value creation, B performance optimisation, C performance
 * reporting, D data science and technology, E professional skills and F
 * employability and technology skills.
 *
 * ORIGINALITY CORPUS: the extracted syllabus text only, as for SBR. The
 * founder's Kaplan APM Study Text and Exam Kit (2020-21) were supplied briefly
 * but are SCANNED IMAGES with no text layer — 534 and 522 pages extracting to
 * ~1KB of whitespace apiece — so they cannot be indexed, and no OCR tooling is
 * installed on this machine. Their page counts are still a usable depth
 * benchmark: 534 pages is close to the AFM text's 544, which supported 42
 * chapters. Note too that the books predate this restructure and are organised
 * against the old five-area syllabus, so they would have been a guide to depth
 * and pedagogy only, never to structure.
 *
 * House style for APM. Section A is a 50-mark case study drawn from areas A and
 * B; Section B is two 25-mark questions, one guaranteed from area C and one
 * from area D. Nothing here is taught as a model for its own sake: every
 * framework is introduced by the management problem it exists to solve, and
 * every measure is followed by the behaviour it will produce — because APM's
 * examiner reliably rewards the candidate who says what a measure will make
 * people DO, and penalises the one who merely defines it.
 */

const APM_TREE_01: StudyChapter = {
  paper: "APM",
  id: "APM-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)"],
  title: "What strategic performance management is for",
  minutes: 16,
  intro:
    "Performance management only earns its keep if it changes decisions. This chapter is about the gap between measuring an organisation and actually steering it.",
  outcomes: [
    "Explain what strategic performance management contributes to planning and control",
    "Explain how measurement checks progress toward corporate objectives",
    "Compare planning and control at strategic, tactical and operational levels",
    "Identify conflicts between long-term and short-term decisions, and say where they come from",
    "Recognise when a measurement system is reporting rather than managing",
  ],
  sections: [
    {
      id: "why-measure",
      heading: "Measurement is not management",
      blocks: [
        {
          kind: "text",
          md: "Every organisation measures something. What distinguishes **performance management** from performance measurement is whether anything happens as a result: whether a number reaching a manager changes a decision, triggers an intervention, or alters what someone does tomorrow. A system that produces immaculate monthly packs nobody acts on is a reporting function wearing a management label.",
        },
        {
          kind: "text",
          md: "So the examinable question in almost every APM scenario is not 'is this the right measure?' in the abstract, but **what will this measure make people do?** A measure creates behaviour whether or not anyone intended it to, and the examiner's scenarios are built around measures that are producing exactly the behaviour they logically should — usually to the organisation's detriment.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The management cycle a measure has to complete",
            data: {
              steps: [
                { label: "Objective" },
                { label: "Measure and target" },
                { label: "Report" },
                { label: "Interpret" },
                { label: "Act" },
                { label: "Revise the objective" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Where the cycle usually breaks",
          md: "Between **report** and **interpret**, because nobody owns the number; or between **interpret** and **act**, because the person who can see the problem cannot authorise the response. When a scenario describes a sophisticated measurement system that has not improved anything, look for the break rather than proposing more measures.",
        },
        {
          kind: "definition",
          term: "Strategic performance management",
          md: "The linked set of objectives, measures, targets, reports and interventions through which an organisation directs itself toward its strategic aims — as distinct from measurement, which produces the numbers without necessarily producing a decision.",
        },
      ],
      check: {
        q: "A company has invested heavily in a management information system that produces detailed weekly dashboards, yet performance has not improved. What is the most likely diagnosis?",
        options: [
          "The dashboards need more measures added to give a fuller picture",
          "The management cycle is broken after reporting — the numbers are produced but nobody owns them, interprets them or has authority to act on what they show",
          "The system should report monthly rather than weekly",
          "Performance measurement does not affect performance in any organisation",
        ],
        correct: 1,
        explain:
          "Producing information is the easy half. The value comes from ownership, interpretation and the authority to respond, and that is where systems typically fail. Adding measures — option 0 — usually worsens matters by creating overload, which Area C examines directly; changing the frequency addresses nothing if nobody acts on the report either way.",
      },
    },
    {
      id: "three-levels",
      heading: "Strategic, tactical and operational",
      blocks: [
        {
          kind: "text",
          md: "Planning and control happen at three levels, and confusing them is a common source of the dysfunction APM examines. The classic error is applying an operational control mindset to a strategic question — demanding precise, short-horizon, quantified answers from decisions whose consequences are long-term and partly unmeasurable.",
        },
        {
          kind: "table",
          caption: "The three levels compared",
          head: ["", "Strategic", "Tactical", "Operational"],
          rows: [
            ["Horizon", "Years", "Months to a year", "Days and weeks"],
            ["Who", "Board and senior management", "Divisional and department heads", "Line managers and supervisors"],
            ["Question", "What business should we be in?", "How do we deploy resources this year?", "Is today's output on target?"],
            ["Information", "External, forward-looking, imprecise, largely non-financial", "Mixed internal and external, summarised", "Internal, historic, precise, detailed"],
            ["Measures", "Market position, capability, sustainability, shareholder value", "Budget variances, divisional returns, project milestones", "Output, yield, utilisation, defect rates, response times"],
            ["Control style", "Judgement and review", "Periodic comparison against plan", "Continuous, often automated"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Information quality inverts as you go up",
          md: "Operational information is precise, complete and almost useless for strategy. Strategic information is uncertain, incomplete, largely external — and it is what actually determines whether the organisation survives. A management accountant who supplies only what can be measured precisely has supplied only what matters least at the top.",
        },
      ],
      check: {
        q: "A board asks for the same weekly variance detail its factory managers receive, in order to 'stay close to the business'. What is the objection?",
        options: [
          "There is none — more information is always better for a board",
          "Operational data is precise, internal and historic; a board needs external, forward-looking and largely non-financial information, and the detail will crowd out the strategic signals it should be watching",
          "Weekly reporting is too infrequent for board use",
          "Variance analysis is not examinable at strategic level",
        ],
        correct: 1,
        explain:
          "The mismatch is one of information type, not quantity. Detail that lets a factory manager intervene today tells a board nothing about whether the market is moving away from them, and the volume actively obscures the signals that matter at that level. This is information overload arriving through good intentions.",
      },
    },
    {
      id: "short-vs-long",
      heading: "The short-term / long-term conflict",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks specifically where a decision that looks right this year turns out to be wrong over several, and it is one of the most reliably examined ideas in the paper. The conflict is structural rather than a failing of individuals: nearly every short-horizon financial measure can be improved by an action that damages the long term.",
        },
        {
          kind: "table",
          caption: "How a manager improves this year's numbers",
          head: ["Action", "Short-term effect", "Long-term cost"],
          rows: [
            ["Cut training and development", "Costs fall, profit rises", "Capability erodes; staff leave"],
            ["Defer maintenance and capital expenditure", "Profit and ROI both rise", "Assets deteriorate; failures and replacement costs arrive later"],
            ["Cut research and marketing spend", "Immediate profit improvement", "Pipeline and brand strength decay"],
            ["Sell or lease back assets", "Capital employed falls, ROI rises", "Future rentals and loss of the asset's residual value"],
            ["Squeeze suppliers on price or terms", "Margins and cash improve", "Supply relationships and quality deteriorate"],
            ["Discount heavily at period end", "Revenue target met", "Price expectations reset; margin structurally lower"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "This table IS an APM answer",
          md: "When a scenario shows a divisional manager on an annual bonus tied to ROI or profit, and the exhibits mention falling training spend or deferred capital expenditure, you have been handed the finding. Name the measure, name the behaviour it rewards, quantify what it cost, and recommend the fix — usually a longer horizon, a non-financial counterweight, or deferred reward.",
        },
        {
          kind: "activity",
          title: "Diagnose the incentive",
          prompt:
            "A divisional manager on a one-year ROI-based bonus, two years from retirement, has hit target every year while the division's market share has fallen steadily. What do you investigate, and what would you recommend?",
          answer:
            "I would look for the actions that lift ROI without improving the business, and I would expect to find them in the balance sheet and the discretionary spend lines rather than in trading. Specifically: capital expenditure below depreciation, which shrinks capital employed and raises the ratio while the asset base ages; cuts to training, marketing and development, which fall straight to profit; and possibly a sale and leaseback, which removes assets from the denominator entirely. The falling market share is the symptom that the measure is not capturing what matters, because ROI can rise for years while the competitive position decays. Three recommendations. Measure over a longer horizon, since a rolling three-year assessment removes most of the incentive to shift costs into the future. Add non-financial counterweights that the manager cannot improve by cutting - market share, customer retention, employee turnover - and weight them enough to matter. And defer part of the reward, so that a portion vests after the retirement date and the consequences of this year's decisions are still visible when it does. The retirement horizon is the aggravating factor: it caps how far ahead the manager has any reason to care, and only deferral reaches past it.",
        },
      ],
      check: {
        q: "Why is the short-term versus long-term conflict described as structural rather than as poor management?",
        options: [
          "Because managers are generally dishonest",
          "Because almost every short-horizon financial measure can be improved by actions that harm the future — so a manager responding rationally to the measure will damage the organisation, whatever their intentions",
          "Because long-term performance cannot be measured at all",
          "Because accounting standards require short-term reporting",
        ],
        correct: 1,
        explain:
          "The system produces the behaviour. A manager acting entirely in good faith, doing what the measure rewards, will still defer maintenance and cut development if that is what lifts the number they are judged on. That is why the remedy is to change the measure, the horizon or the reward — not to exhort people to think long term.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending more measures when a system is not working.", fix: "Find where the cycle breaks — ownership, interpretation or authority to act." },
    { trap: "Treating strategic and operational information as differing only in detail.", fix: "They differ in type: external and imprecise versus internal and exact." },
    { trap: "Describing a measure without saying what behaviour it produces.", fix: "Every APM measure answer needs the 'so what will people do?' step." },
    { trap: "Blaming short-termism on individual managers.", fix: "Attribute it to the measure and horizon, then fix those." },
  ],
  keyTerms: [
    { term: "Performance measurement", def: "The production of indicators about how an organisation is performing — necessary for, but not the same as, managing performance." },
    { term: "Strategic planning", def: "Long-horizon direction setting, using largely external and imprecise information about markets, capabilities and the environment." },
    { term: "Operational control", def: "Short-horizon, detailed, largely automated comparison of actual output against standard, using precise internal data." },
    { term: "Short-termism", def: "The bias toward decisions improving near-term reported performance at the expense of longer-term value, produced by the measurement and reward horizon." },
  ],
  summary: [
    "Measurement becomes management only when a number changes a decision.",
    "Strategic, tactical and operational levels need different KINDS of information, not different amounts.",
    "Short-term financial measures can nearly always be improved by damaging the long term.",
    "Fix the measure, the horizon or the reward — not the manager's attitude.",
  ],
  knowledgeDiagnostic: [
    { q: "Where does the management cycle most often break?", a: "Between report and interpret, where nobody owns the number, or between interpret and act, where the person seeing the problem cannot authorise the response." },
    { q: "How does information change as you move up the three levels?", a: "It becomes more external, more forward-looking, less precise and less financial — and more decisive for survival." },
    { q: "Give two actions that improve ROI while harming the business.", a: "Deferring capital expenditure, which shrinks capital employed as assets age, and cutting training or development, which falls straight to profit." },
  ],
  furtherStudy: [
    "APM-08 covers how a mission is cascaded into the objectives measurement is supposed to serve.",
    "Area B covers the reward systems that turn a measurement horizon into a behavioural problem.",
    "APM-11 examines the financial measures whose short-term manipulation is described here.",
  ],
}

const APM_TREE_02: StudyChapter = {
  paper: "APM",
  id: "APM-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A1(d)"],
  title: "Stakeholders and their influence on measurement",
  minutes: 15,
  intro:
    "Measurement systems are not designed in a vacuum. What gets measured reflects who has the power to insist on it — and Mendelow's matrix is the tool for working out who that is.",
  outcomes: [
    "Map stakeholders by power and interest using Mendelow's matrix",
    "Explain the management strategy each quadrant calls for",
    "Assess how stakeholder influence shapes what an organisation measures",
    "Identify conflicts between stakeholder groups' preferred measures",
    "Recognise that a stakeholder's position can change, and what changes it",
  ],
  sections: [
    {
      id: "mendelow",
      heading: "Mendelow's matrix, and what each quadrant demands",
      blocks: [
        {
          kind: "text",
          md: "Mendelow maps stakeholders on two axes: how much **power** they have to affect the organisation, and how much **interest** they take in what it does. The combination determines how much attention each group's expectations should receive — and, for this paper, whose preferred measures end up in the reporting pack.",
        },
        {
          kind: "table",
          caption: "The four quadrants",
          head: ["Position", "Strategy", "Typical group", "Effect on measurement"],
          rows: [
            ["Low power, low interest", "Minimal effort", "Small individual shareholders, the general public", "Little or none"],
            ["Low power, high interest", "Keep informed", "Community groups, campaigners, junior employees", "May generate disclosure, but not core measures"],
            ["High power, low interest", "Keep satisfied", "Large institutional investors, some regulators", "Few measures, but a breach of their minimum triggers intervention"],
            ["High power, high interest", "Key players — manage closely", "Major shareholders, principal lenders, dominant customers, the regulator in a regulated sector", "These groups' priorities become the organisation's headline KPIs"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The connection the syllabus is asking for",
          md: "The key-player quadrant is **where an organisation's KPIs come from**. A group with high gearing measures interest cover and covenant headroom because its lenders are key players. A regulated utility measures service standards because the regulator is. A supermarket with one dominant own-brand customer measures that customer's service levels. When a scenario's KPIs look strange, ask who insisted on them.",
        },
        {
          kind: "text",
          md: "The **keep satisfied** quadrant is the dangerous one. These stakeholders are not paying attention — until something crosses their threshold, at which point their power arrives all at once. An institutional shareholder ignoring a company for years will act decisively on a dividend cut or a governance failure. The management task is to identify what would activate them and stay clear of it.",
        },
      ],
      check: {
        q: "A large institutional shareholder holds 12% of a company and rarely engages with management. Where does it sit on Mendelow's matrix, and what follows?",
        options: [
          "Low power, low interest — minimal effort is required",
          "High power, low interest — keep satisfied. Its influence is latent, so the task is to identify what would activate it, because when it engages it will do so decisively",
          "High power, high interest — it should be consulted on all decisions",
          "Low power, high interest — it should simply be kept informed",
        ],
        correct: 1,
        explain:
          "A 12% holding carries real power whether or not it is currently being used, and the lack of engagement is what places it in the keep-satisfied quadrant rather than among the key players. The management implication is anticipatory: identify the triggers — a dividend cut, a governance failure, sustained underperformance — and avoid crossing them.",
      },
    },
    {
      id: "conflict",
      heading: "When stakeholders want different measures",
      blocks: [
        {
          kind: "text",
          md: "Different groups value different things, so they push for different measures — and because reporting capacity and management attention are finite, those preferences compete.",
        },
        {
          kind: "table",
          caption: "What each group wants measured",
          head: ["Group", "Priority", "Measure they push for", "What it crowds out"],
          rows: [
            ["Shareholders", "Return and growth", "EPS, TSR, ROCE, EVA", "Long-horizon capability measures"],
            ["Lenders", "Certainty of servicing", "Interest cover, gearing, cash generation", "Growth investment, which raises gearing"],
            ["Employees", "Security and conditions", "Job security, safety, pay comparators", "Efficiency and headcount measures"],
            ["Customers", "Price, quality, reliability", "Service levels, defect rates, delivery performance", "Cost reduction targets"],
            ["Regulators", "Compliance and standards", "Statutory service and safety measures", "Discretionary commercial measures"],
            ["Communities", "Environmental and social conduct", "Emissions, local employment, waste", "Short-run cost efficiency"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The measurement set is a political outcome",
          md: "A scorecard is often described as though it were designed from first principles. In practice it records who won. That is worth saying in an answer, because it explains why an organisation's KPIs can be simultaneously well-constructed and badly aligned with its stated strategy — the strategy is what the board says, and the measures are what the key players require.",
        },
        {
          kind: "text",
          md: "Positions also **move**. A community group with no power acquires it by attracting media attention or litigation; a lender moves from keep-satisfied to key player the moment a covenant is approached; a customer becomes a key player as it grows. So the matrix is a snapshot, and a good answer says what would change the map rather than presenting it as fixed.",
        },
      ],
      check: {
        q: "A company's balanced scorecard is technically well constructed but contains no measure of the environmental performance its published strategy emphasises. What does Mendelow's analysis suggest?",
        options: [
          "The scorecard is simply badly designed and should be redrawn",
          "That no stakeholder with the power to insist has been pressing for it — the measurement set reflects who has influence, so environmental groups are probably in a low-power quadrant despite the stated strategy",
          "That environmental performance cannot be measured",
          "That the strategy must be changed to match the scorecard",
        ],
        correct: 1,
        explain:
          "The gap between the stated strategy and the measured reality is usually a power question rather than a design failure. Recognising that is what lets you predict the change: if a regulator legislates or a major investor adopts an environmental mandate, that group moves into the key-player quadrant and the measures appear quickly.",
      },
    },
  ],
  examTraps: [
    { trap: "Drawing Mendelow's matrix without saying what follows.", fix: "Each quadrant carries a management strategy — name it and apply it to the scenario." },
    { trap: "Placing every large stakeholder among the key players.", fix: "Power and interest are separate; a powerful but disengaged holder is keep-satisfied." },
    { trap: "Treating the matrix as fixed.", fix: "Say what would move a group — a covenant approaching, media attention, a growing customer." },
    { trap: "Explaining a missing measure as a design oversight.", fix: "Ask which stakeholder would have insisted on it, and why they lack the power to." },
  ],
  keyTerms: [
    { term: "Mendelow's matrix", def: "A mapping of stakeholders by their power to affect the organisation and their level of interest in it, indicating how each should be managed." },
    { term: "Key player", def: "A stakeholder with both high power and high interest, whose expectations shape the organisation's objectives and headline measures." },
    { term: "Latent power", def: "Influence held by a stakeholder who is not currently engaged, which arrives suddenly once a threshold is crossed." },
  ],
  summary: [
    "Map on power and interest; each quadrant carries its own management strategy.",
    "Key players' priorities become the organisation's headline KPIs.",
    "Keep-satisfied stakeholders are dangerous precisely because their power is latent.",
    "A measurement set records who has influence — positions move, and so do the measures.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is the keep-satisfied quadrant the riskiest?", a: "Those stakeholders hold real power but are not currently watching, so their influence arrives all at once when something crosses their threshold." },
    { q: "What does Mendelow explain about an organisation's KPIs?", a: "That they largely reflect the priorities of whoever has both the power and the interest to insist on them, rather than being designed purely from the strategy." },
    { q: "Give two events that move a stakeholder into the key-player quadrant.", a: "A lender approaching a covenant breach, and a community group acquiring power through media attention or litigation." },
  ],
  furtherStudy: [
    "APM-04 covers the balanced scorecard, whose contents this analysis explains.",
    "APM-14 covers sustainability, where stakeholder pressure most often drives new measures.",
    "APM-08 covers the mission that stakeholder expectations shape.",
  ],
}

const APM_TREE_03: StudyChapter = {
  paper: "APM",
  id: "APM-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A1(e)"],
  title: "Strategic models in performance management",
  minutes: 16,
  intro:
    "SWOT, PEST and Porter's generic strategies are strategy tools. The examinable question is narrower and harder: what does each one tell you about what to MEASURE?",
  outcomes: [
    "Apply SWOT, PEST and Porter's generic strategies to a performance scenario",
    "Derive measures from each model rather than describing the model",
    "Explain why a cost leader and a differentiator need different measurement systems",
    "Identify a stuck-in-the-middle position from the measures an organisation uses",
    "Avoid the generic-model answer the examiner penalises most",
  ],
  sections: [
    {
      id: "models-to-measures",
      heading: "From model to measure",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The requirement is never 'explain SWOT'",
          md: "APM asks how a model **may assist in the performance management process**. So an answer that describes the four boxes has answered a different paper's question. The examinable step is the one after: this weakness implies this measure; this environmental threat means this indicator needs watching. Get to measures inside two sentences.",
        },
        {
          kind: "table",
          caption: "What each model contributes to measurement",
          head: ["Model", "What it identifies", "Measures it implies"],
          rows: [
            ["SWOT", "Internal strengths and weaknesses, external opportunities and threats", "Measures tracking whether strengths are being maintained and weaknesses closed — capability, retention, capacity"],
            ["PEST", "Political, economic, social and technological forces", "Leading external indicators — regulatory change, input prices, demographic shift, technology adoption"],
            ["Porter's generic strategies", "Whether the organisation competes on cost, differentiation or focus", "The measurement set appropriate to the chosen basis of competition"],
          ],
        },
        {
          kind: "text",
          md: "**PEST is the source of leading indicators**, which is why it matters in this paper. Almost everything on a conventional management report is a lagging measure — it tells you what already happened. PEST forces attention onto the external forces that will move performance next, and the measures derived from it are the early-warning half of a balanced set.",
        },
        {
          kind: "illustration",
          title: "A weakness becoming a measure",
          md: "A SWOT identifies dependence on a single supplier as a weakness. That is a description until it becomes a measure: percentage of critical components single-sourced, tracked monthly with a target of reducing it to below half within two years, owned by the procurement director. Now the weakness is being managed rather than merely acknowledged — and that conversion is exactly what the requirement is asking for.",
        },
      ],
      check: {
        q: "A requirement asks how PEST analysis could assist a company's performance management. Which answer earns the marks?",
        options: [
          "Describing the four categories and giving general examples of each",
          "Identifying the specific external forces facing this company and deriving leading indicators from them — so the organisation watches what will move performance next rather than only what already has",
          "Explaining that PEST is superior to SWOT",
          "Listing every political and economic factor affecting the industry",
        ],
        correct: 1,
        explain:
          "The model is a means to measures. PEST's particular contribution is leading indicators, which counterbalance the lagging financial measures that dominate most reporting. Describing the categories, or listing factors without converting them into anything an organisation would track, stops one step short of the requirement.",
      },
    },
    {
      id: "generic-strategies",
      heading: "Porter's generic strategies and the measures each demands",
      blocks: [
        {
          kind: "text",
          md: "Porter's argument is that an organisation must compete either on **cost leadership** or on **differentiation**, and either broadly or in a **focused** niche — and that trying to do both leaves it *stuck in the middle*, with a cost base too high to win on price and a proposition too ordinary to command a premium.",
        },
        {
          kind: "table",
          caption: "Same industry, opposite measurement systems",
          head: ["", "Cost leadership", "Differentiation"],
          rows: [
            ["Competes by", "Being the lowest-cost producer", "Being distinctive enough to command a premium"],
            ["Key measures", "Unit cost, capacity utilisation, yield, labour productivity, purchase price variance", "Price premium achieved, brand awareness, customer satisfaction, innovation rate, new product revenue share"],
            ["Cost control stance", "Relentless — every cost is a target", "Selective — spending that supports distinctiveness is protected"],
            ["Quality means", "Conformance to specification at minimum cost", "Superiority the customer notices and will pay for"],
            ["Danger of the measure", "Cost cutting erodes the product until the differentiation is gone too", "Spending is never challenged because it is all called 'brand investment'"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The measurement system can reveal the strategy — or contradict it",
          md: "A differentiator whose entire scorecard is cost variances and utilisation will drift toward cost leadership whatever the board says, because that is what people are judged on. Finding a **contradiction between the stated strategy and the measures** is one of the highest-value observations available in an APM answer, and the scenarios are frequently built to contain one.",
        },
        {
          kind: "activity",
          title: "Diagnose from the scorecard",
          prompt:
            "A company describes itself as a premium differentiated brand. Its divisional scorecard contains unit cost, purchase price variance, capacity utilisation, labour efficiency and gross margin. Customer satisfaction is measured annually and not reported to the board. What do you conclude and recommend?",
          answer:
            "That the company is managed as a cost leader whatever its marketing says, and that the drift is being caused by its own measurement system. Four of the five reported measures reward reducing input cost and pushing volume through the assets, which are exactly the levers that erode a premium proposition: cheaper components, longer production runs, less time per unit. Customer satisfaction - the one measure that would detect the damage - is collected annually, which is far too slow to intervene, and is not seen by the people setting priorities. So the differentiation is undefended. My recommendations would be to put the differentiation measures on the same footing as the cost ones rather than merely adding them: price premium actually achieved against competitors, customer satisfaction and retention measured at least quarterly and reported to the board, share of revenue from products launched in the last three years, and brand awareness where the market data supports it. I would also change what purchase price variance is used for, since a favourable variance from switching to a cheaper component is a warning in this strategy rather than an achievement, and should trigger a quality review rather than a commendation. The general point for the board is that a premium strategy cannot survive a cost-leader scorecard, because people optimise what they are measured on.",
        },
        {
          kind: "text",
          md: "**Stuck in the middle** is worth recognising from the evidence rather than asserting. The symptoms are a cost base above the discount competitors' and prices below the premium players', margin compression from both directions, and a measurement set that mixes the two vocabularies without prioritising either. The recommendation is a choice, and saying which one — with reasons from the scenario's capabilities — is what earns the commercial acumen marks.",
        },
      ],
      check: {
        q: "Why would a differentiator be damaged by a scorecard dominated by cost and efficiency measures?",
        options: [
          "Cost measures are inherently unreliable",
          "Because people optimise what they are measured on: managers will reduce input cost and push volume, which erodes the distinctiveness the premium price depends on — so the measures drive the company toward cost leadership regardless of the stated strategy",
          "Differentiators should not measure costs at all",
          "Cost measures are only valid in manufacturing",
        ],
        correct: 1,
        explain:
          "The measurement system is a statement of what the organisation actually wants, and it outweighs the strategy document. A differentiator still needs cost control, but it needs it subordinated to the measures that protect the premium — otherwise a favourable purchase price variance from a cheaper component looks like success while the proposition decays.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing SWOT, PEST or Porter's model as the answer.", fix: "Convert each finding into a measure the organisation would track, with an owner." },
    { trap: "Using PEST to produce a list of factors.", fix: "Its contribution is leading indicators — say which ones and why they matter here." },
    { trap: "Asserting that a company is stuck in the middle.", fix: "Evidence it: cost base above discounters, prices below premium players, margin squeezed from both sides." },
    { trap: "Missing a contradiction between stated strategy and measures.", fix: "Check the scorecard against the claimed basis of competition — the mismatch is usually the finding." },
  ],
  keyTerms: [
    { term: "Cost leadership", def: "Competing by being the lowest-cost producer in the market, measured through unit cost, utilisation, yield and productivity." },
    { term: "Differentiation", def: "Competing on distinctiveness the customer will pay a premium for, measured through price premium, satisfaction, brand and innovation." },
    { term: "Stuck in the middle", def: "A position with neither a cost advantage nor a distinctive proposition, so margin is compressed from both directions." },
    { term: "Leading indicator", def: "A measure that moves before the outcome it predicts, giving time to intervene — commonly derived from external PEST factors." },
  ],
  summary: [
    "Every strategic model must be converted into measures; describing it answers the wrong question.",
    "PEST is the main source of leading indicators, balancing the lagging financial measures.",
    "Cost leadership and differentiation demand opposite measurement systems.",
    "A scorecard contradicting the stated strategy is a high-value finding — look for it.",
  ],
  knowledgeDiagnostic: [
    { q: "What is PEST's specific contribution to a measurement system?", a: "Leading indicators drawn from external forces, which counterbalance the lagging internal financial measures that dominate most reports." },
    { q: "Why can a favourable purchase price variance be bad news for a differentiator?", a: "It may mean a cheaper component has been substituted, eroding the distinctiveness the premium price depends on." },
    { q: "How do you evidence a stuck-in-the-middle position?", a: "Costs above the discount competitors', prices below the premium players', margin compressed from both sides, and a measurement set mixing both vocabularies." },
  ],
  furtherStudy: [
    "APM-04 covers the balanced scorecard, which formalises the mix of measures this chapter derives.",
    "APM-09 turns these strategic findings into critical success factors and KPIs.",
    "Area B applies the differentiation question to service businesses specifically.",
  ],
}

const APM_TREE_04: StudyChapter = {
  paper: "APM",
  id: "APM-04",
  number: 4,
  area: "A",
  syllabusRefs: ["A1(f)"],
  title: "The balanced scorecard",
  minutes: 17,
  intro:
    "The most examined framework in the paper, and the most often misapplied. It is not four boxes of measures — it is a causal chain, and the chain is where the marks are.",
  outcomes: [
    "Apply the four perspectives to a specific organisation",
    "Build the causal chain running from learning and growth up to financial results",
    "Explain what the scorecard is designed to correct in traditional reporting",
    "Assess the practical difficulties of implementing and sustaining it",
    "Adapt the perspectives where the organisation is not a commercial company",
  ],
  sections: [
    {
      id: "four-perspectives",
      heading: "Four perspectives, and the chain between them",
      blocks: [
        {
          kind: "text",
          md: "Kaplan and Norton's scorecard answers a specific defect: financial measures are **lagging**, reporting the consequences of decisions taken long before, and they say nothing about whether the organisation is building the capability to perform tomorrow. The scorecard adds three forward-looking perspectives and — crucially — links them.",
        },
        {
          kind: "table",
          caption: "The four perspectives",
          head: ["Perspective", "The question", "Typical measures"],
          rows: [
            ["Financial", "How do we look to shareholders?", "ROCE, EVA, revenue growth, margin, cash generation"],
            ["Customer", "How do customers see us?", "Satisfaction, retention, market share, net promoter score, on-time delivery"],
            ["Internal business process", "What must we excel at?", "Cycle time, defect rate, first-time-right, process cost, capacity"],
            ["Learning and growth", "Can we continue to improve and create value?", "Employee skills and retention, training days, systems capability, new product revenue share"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The causal chain is the whole idea",
          md: "The perspectives are not four independent lists. They form a chain: **trained, motivated people** (learning and growth) run **better processes** (internal), which produce **satisfied customers** (customer), who generate **financial results** (financial). Reading a scorecard means testing whether that chain actually holds in this organisation — and an answer that presents four unconnected boxes has missed the point of the model.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The causal chain",
            data: {
              steps: [
                { label: "Learning and growth", sub: "Skills, systems, culture" },
                { label: "Internal process", sub: "Faster, cheaper, more reliable" },
                { label: "Customer", sub: "Satisfaction, loyalty, share" },
                { label: "Financial", sub: "Revenue, margin, return" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The chain also explains the scorecard's diagnostic power. If customer satisfaction is rising while financial results are not, the link between those two is broken — perhaps the satisfied customers are unprofitable ones, or the satisfaction is being bought with discounts. If process measures improve and customers do not notice, the organisation is excelling at something customers do not value. Each broken link is a finding.",
        },
      ],
      check: {
        q: "A company's scorecard shows improving employee training and process efficiency, static customer satisfaction and declining profit. What does the causal chain suggest?",
        options: [
          "The scorecard is working correctly and results will follow automatically",
          "The chain is broken between internal process and customer — the organisation is becoming more efficient at things its customers do not value, so the improvements are not converting into satisfaction or financial return",
          "Training should be reduced since it is not producing profit",
          "Financial measures should be removed from the scorecard",
        ],
        correct: 1,
        explain:
          "Tracing where the chain stops is the diagnostic use of the model. Improvements that halt before the customer perspective mean effort is going into processes the customer is indifferent to — so the response is to re-examine which processes actually drive the customer's experience, not to abandon the improvement programme or the measure.",
      },
    },
    {
      id: "practical",
      heading: "Why scorecards fail in practice",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The recurring implementation problems",
          items: [
            "**Too many measures.** Twenty per perspective is a report, not a scorecard; attention is finite and everything becomes equally unimportant",
            "**No causal logic.** The four boxes are filled independently, so the model's diagnostic power is lost and it becomes a longer monthly pack",
            "**The financial perspective still dominates**, because it is where the bonus is — the other three become decoration",
            "**Conflicts between perspectives are not resolved.** Cutting training improves financial and damages learning and growth, and the scorecard alone does not say which wins",
            "**Non-financial measures are harder to collect**, arrive late, and are more easily manipulated — a satisfaction survey can be timed or targeted",
            "**No ownership.** Without a named owner per measure, nothing happens when one moves",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The conflict problem deserves naming",
          md: "The scorecard shows that a decision improves one perspective and damages another. It does not tell you which matters more — that is a judgement about strategy. Candidates often present the scorecard as though it resolved trade-offs; it makes them **visible**, which is valuable and different. Saying this earns marks precisely because it is the model's honest limitation.",
        },
        {
          kind: "text",
          md: "**Adapting the perspectives.** For a not-for-profit or public body the financial perspective is a constraint rather than the objective, and the chain is usually re-drawn so that mission achievement sits at the top with financial sustainability supporting it. Say so when the scenario is not a commercial company — applying the commercial ordering unchanged to a charity is a straightforward error, and one the examiner sets deliberately.",
        },
      ],
      check: {
        q: "What does the balanced scorecard do about a conflict between improving short-term profit and investing in employee capability?",
        options: [
          "It resolves the conflict by weighting the perspectives automatically",
          "It makes the trade-off visible by showing the effect on both perspectives, but the decision on which matters more remains a strategic judgement the model cannot make",
          "It prevents the conflict from arising",
          "It requires the financial perspective to take priority",
        ],
        correct: 1,
        explain:
          "Visibility is the contribution and the limit. Before the scorecard, cutting training showed up only as an improvement in profit; afterwards, both effects are on the same page. What to do about it is a decision about strategy and time horizon, and claiming the model resolves it overstates what any measurement framework can do.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting four independent lists of measures.", fix: "Show the causal chain and test whether it holds in this organisation." },
    { trap: "Proposing dozens of measures per perspective.", fix: "A scorecard's value is selectivity — a handful per perspective, each owned." },
    { trap: "Claiming the scorecard resolves conflicts between perspectives.", fix: "It makes them visible; the judgement remains strategic." },
    { trap: "Applying the commercial ordering to a not-for-profit.", fix: "Mission goes at the top; financial becomes a supporting constraint." },
  ],
  keyTerms: [
    { term: "Balanced scorecard", def: "A performance framework linking financial, customer, internal process and learning and growth measures in a causal chain from capability to results." },
    { term: "Lagging measure", def: "An indicator reporting an outcome after the fact, such as profit — necessary but too late to intervene." },
    { term: "Leading measure", def: "An indicator that moves before the outcome it drives, giving time to act." },
    { term: "Causal chain", def: "The scorecard's proposition that capability improves processes, which improve customer outcomes, which produce financial results." },
  ],
  summary: [
    "The scorecard corrects the lagging, backward-looking bias of financial reporting.",
    "The causal chain from learning and growth to financial results is the model, not the four boxes.",
    "A break in the chain is a diagnosis — say where it stops and what that implies.",
    "It makes trade-offs visible without resolving them, and needs adapting for non-commercial bodies.",
  ],
  knowledgeDiagnostic: [
    { q: "State the causal chain in order.", a: "Learning and growth builds capability, which improves internal processes, which improves customer outcomes, which produces financial results." },
    { q: "What does it mean if process measures improve but customer measures do not?", a: "The organisation is improving processes its customers do not value — the chain is broken at that link." },
    { q: "How should the perspectives be reordered for a charity?", a: "Mission achievement moves to the top and the financial perspective becomes a supporting constraint rather than the objective." },
  ],
  furtherStudy: [
    "APM-09 covers critical success factors, the step that decides what belongs on a scorecard.",
    "APM-13 covers the non-financial measures the customer and learning perspectives rely on.",
    "Area B covers not-for-profit performance, where the perspectives are reordered.",
    "Area C covers how a scorecard should be reported so that it is actually used.",
  ],
}

const APM_TREE_05: StudyChapter = {
  paper: "APM",
  id: "APM-05",
  number: 5,
  area: "A",
  syllabusRefs: ["A1(g)"],
  title: "Benchmarking",
  minutes: 15,
  intro:
    "A measure means nothing without a comparator. Benchmarking is the discipline of choosing that comparator well — and of copying the practice rather than the number.",
  outcomes: [
    "Distinguish internal, competitive and functional benchmarking",
    "Assess which type suits a given situation, and what each can realistically obtain",
    "Explain the benchmarking process and where it usually fails",
    "Identify the limitations, including comparability and the ceiling it imposes",
    "Recommend a benchmarking approach with the practical obstacles named",
  ],
  sections: [
    {
      id: "types",
      heading: "The three types the syllabus names",
      blocks: [
        {
          kind: "table",
          caption: "Internal, competitive and functional",
          head: ["Type", "Compared against", "Data access", "Insight available"],
          rows: [
            ["Internal", "Another division, site or team in the same organisation", "Full and reliable", "Limited — the whole group may be mediocre"],
            ["Competitive", "A direct competitor", "Poor; published accounts, industry surveys, intermediaries", "High relevance, but the data is coarse and dated"],
            ["Functional", "Whoever performs the same FUNCTION best, in any industry", "Often good — they are not rivals, so they will talk", "Highest potential; the source of step changes rather than increments"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Functional benchmarking is where the big gains are",
          md: "Comparing your warehouse against a competitor's tells you whether you are typical for your industry. Comparing it against a leading online retailer's tells you what is actually possible. Because the comparator is not a rival, they will often share detail freely — which is why functional benchmarking produces step changes while competitive benchmarking produces increments.",
        },
        {
          kind: "text",
          md: "**Internal benchmarking** is the easiest to run and the most limited in ambition: data is complete and comparable, cooperation is straightforward, but the best-performing site in a mediocre group is still mediocre. Use it to spread known good practice quickly, not to find out what excellent looks like.",
        },
      ],
      check: {
        q: "A distribution company wants a step change in warehouse performance. Which benchmarking type is most likely to deliver it?",
        options: [
          "Internal, comparing its own depots against each other",
          "Functional — comparing against the best warehouse operator in any industry, which reveals what is genuinely achievable and, since they are not competitors, will often share the detail",
          "Competitive, comparing against another distributor's published accounts",
          "None; benchmarking cannot produce step changes",
        ],
        correct: 1,
        explain:
          "Internal comparison is bounded by the group's own current standard, and competitive data is coarse and hard to obtain because rivals will not cooperate. A best-in-class operator from another sector is both more ambitious and more accessible, which is exactly the combination step change requires.",
      },
    },
    {
      id: "process-limits",
      heading: "Running it, and its limits",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The process",
          items: [
            "Decide what to benchmark — a process that matters strategically, not one that is merely easy to measure",
            "Choose the comparator and check the basis is genuinely comparable",
            "Collect data on performance AND on the practices that produce it",
            "Analyse the gap, and separate structural causes from practice differences",
            "Adapt the practice to your context — do not transplant it unchanged",
            "Implement, measure and re-benchmark, because the comparator improves too",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Copy the practice, not the number",
          md: "The commonest failure is importing a target without the practice behind it. Being told that a leading operator picks 220 lines an hour, and setting that as a target, produces pressure and corner-cutting. Finding out **how** they do it — layout, automation, sequencing, training — produces improvement. Step three above is the one organisations skip, and naming it is worth marks.",
        },
        {
          kind: "table",
          caption: "The limitations to state",
          head: ["Limitation", "Why it bites"],
          rows: [
            ["Comparability", "Different scale, product mix, accounting policies and definitions make raw comparison misleading"],
            ["Data availability", "Competitors will not supply it; published data is aggregated and out of date"],
            ["Cost and time", "Meaningful benchmarking is a project, not a ratio calculation"],
            ["A ceiling on ambition", "It targets someone else's current performance, so at best it makes you as good as they are now"],
            ["Context", "A practice that works in one culture, scale or regulatory setting may not transfer"],
            ["Innovation", "It encourages imitation; no organisation ever led its market by copying"],
          ],
        },
        {
          kind: "text",
          md: "That last pair matters for a strategic paper. Benchmarking is a **catch-up** tool: it closes gaps against known performance. It will not produce the distinctive capability that differentiation depends on, and an organisation that benchmarks everything converges on industry average practice. Say this when a scenario proposes benchmarking as the whole of a performance strategy.",
        },
      ],
      check: {
        q: "A company adopts a best-in-class productivity figure as its own target without investigating how that level is achieved. What is the likely outcome?",
        options: [
          "Performance will rise to the benchmark level",
          "Pressure without capability — staff face a target the current process cannot support, so the likely results are corner-cutting, quality problems and demotivation rather than improvement",
          "The benchmark will automatically be adjusted downward",
          "Nothing will change at all",
        ],
        correct: 1,
        explain:
          "A target is not a method. Without the layout, technology, sequencing or training that produces the benchmark performance, the gap can only be closed by working harder or cutting corners — which is why the practice, not the number, is what benchmarking is supposed to transfer.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing the types without recommending one.", fix: "Say which suits this organisation's ambition and data access, and why." },
    { trap: "Ignoring comparability.", fix: "Check scale, mix, definitions and accounting policies before comparing." },
    { trap: "Presenting a benchmark figure as a target.", fix: "Transfer the practice that produces it, adapted to context." },
    { trap: "Proposing benchmarking as a complete performance strategy.", fix: "It is a catch-up tool and converges on average practice; differentiation needs something else." },
  ],
  keyTerms: [
    { term: "Internal benchmarking", def: "Comparison against another unit within the same organisation — easy and reliable, but bounded by the group's own standard." },
    { term: "Competitive benchmarking", def: "Comparison against a direct rival — highly relevant, but the data is hard to obtain, coarse and dated." },
    { term: "Functional benchmarking", def: "Comparison against the best performer of the same function in any industry, offering step-change potential and easier cooperation." },
    { term: "Performance gap", def: "The difference between current performance and the benchmark, which must be attributed to structural causes or to practice before it can be closed." },
  ],
  summary: [
    "Internal is easy and unambitious; competitive is relevant but data-poor; functional offers step changes.",
    "Collect the practices as well as the numbers — a target without a method produces corner-cutting.",
    "Check comparability of scale, mix and definitions before drawing conclusions.",
    "Benchmarking closes gaps; it does not create distinctiveness.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is functional benchmarking often easier to run than competitive?", a: "The comparator is not a rival, so it will usually share operational detail that a competitor never would." },
    { q: "What is the most common benchmarking failure?", a: "Importing the target figure without the practice that produces it, which creates pressure and corner-cutting rather than improvement." },
    { q: "Why is benchmarking insufficient as a whole strategy?", a: "It aims at someone else's current performance, so it closes gaps rather than creating distinctiveness, and universal benchmarking converges on industry-average practice." },
  ],
  furtherStudy: [
    "APM-11 covers the financial measures most often benchmarked, and the comparability traps in them.",
    "APM-03 covers the differentiation strategy that benchmarking alone cannot deliver.",
    "Area B covers activity-based management, which supplies the process detail benchmarking needs.",
  ],
}

const APM_TREE_06: StudyChapter = {
  paper: "APM",
  id: "APM-06",
  number: 6,
  area: "A",
  syllabusRefs: ["A1(h)"],
  title: "Risk, uncertainty and risk appetite in performance",
  minutes: 16,
  intro:
    "Every target is a forecast, and every forecast is uncertain. This chapter is about measuring and reporting performance honestly when the outcome was never going to be a single number.",
  outcomes: [
    "Distinguish risk from uncertainty and match the technique to each",
    "Explain how risk affects planning, decision making and the reporting of performance",
    "Assess the effect of differing stakeholder risk appetites on targets and behaviour",
    "Apply the standard decision rules and say what each assumes about the decision maker",
    "Recommend how uncertainty should be presented in a performance report",
  ],
  sections: [
    {
      id: "risk-in-planning",
      heading: "Risk in planning, deciding and reporting",
      blocks: [
        {
          kind: "text",
          md: "**Risk** describes outcomes whose probabilities can be estimated; **uncertainty** describes those where they cannot. The syllabus asks about the role of both at all levels, and the useful structure is to take the three stages in turn.",
        },
        {
          kind: "table",
          caption: "Where risk enters",
          head: ["Stage", "How risk shows up", "The management response"],
          rows: [
            ["Planning", "Targets are set on forecasts that may not hold", "Scenario plans, ranges rather than points, contingency, rolling revision"],
            ["Decision making", "Options have different spreads as well as different means", "Expected values, sensitivity, decision rules matched to the appetite"],
            ["Reporting", "A single outturn is compared with a single target", "Separate controllable from uncontrollable, and report the range the result fell within"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The reporting point is the one candidates miss",
          md: "Comparing one actual figure against one target implies both were certain. If the target rested on an exchange rate or a commodity price nobody controls, a variance report that does not separate that effect blames a manager for the weather. **Planning and operational variances** exist precisely for this, and APM examines the idea far beyond the arithmetic — see the variance chapter in Area B.",
        },
        {
          kind: "text",
          md: "Uncertainty also has a **behavioural** effect worth naming. A manager judged on a target that depends heavily on factors outside their control will stop treating the target as meaningful, or will build slack into the forecast to protect themselves. Both responses damage the planning system, and both are rational.",
        },
      ],
      check: {
        q: "A division misses its profit target after a raw material price rose 30% following an export ban. How should the performance report handle this?",
        options: [
          "Report the variance in full against the manager, since the target was agreed",
          "Split the variance into a planning element reflecting the price change nobody controlled and an operational element reflecting the manager's own performance against a revised, realistic standard",
          "Remove the division from the reporting cycle until prices stabilise",
          "Restate the target so no variance is reported",
        ],
        correct: 1,
        explain:
          "Holding a manager to a standard that events invalidated destroys the report's credibility and encourages slack in future forecasts. Splitting the variance shows the organisation what the environment did and what the manager did — two different pieces of information, both of which the board needs.",
      },
    },
    {
      id: "appetite-rules",
      heading: "Risk appetite, and the decision rules that express it",
      blocks: [
        {
          kind: "text",
          md: "The syllabus specifically mentions the **different risk appetites of stakeholders**, and this is where APM's treatment goes beyond a calculation. Groups differ systematically, and a performance system that ignores the difference will produce conflict.",
        },
        {
          kind: "table",
          caption: "Who wants how much risk",
          head: ["Group", "Appetite", "Why"],
          rows: [
            ["Diversified shareholders", "Higher", "Company-specific risk is diversified away in their portfolios"],
            ["Lenders", "Low", "Fixed upside, unlimited downside — they gain nothing from a successful gamble"],
            ["Managers", "Low, unless incentivised otherwise", "Undiversified human capital; their job is tied to this one organisation"],
            ["Employees", "Low", "Income and security concentrated in one employer"],
            ["Owner-managers", "Varies, often low", "Personal wealth undiversified and concentrated in the business"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The manager's caution is structural, not timidity",
          md: "A manager whose career depends on one organisation is rationally more risk-averse than a shareholder holding it as one of forty positions. That is why bonus schemes with uncapped upside and no downside are used — they deliberately buy risk appetite. It also explains the opposite failure: an uncapped scheme can purchase far more risk-taking than the shareholders wanted.",
        },
        {
          kind: "table",
          caption: "Decision rules under uncertainty, and what each assumes",
          head: ["Rule", "Chooses", "Assumes the decision maker is"],
          rows: [
            ["Maximax", "The option with the best possible best outcome", "Optimistic, risk-seeking"],
            ["Maximin", "The option with the best worst outcome", "Pessimistic, risk-averse"],
            ["Minimax regret", "The option minimising the largest possible regret", "Averse to being seen to have chosen wrongly"],
            ["Expected value", "The highest probability-weighted mean", "Risk-neutral, and facing a repeated decision"],
          ],
        },
        {
          kind: "text",
          md: "Two things to say whenever these appear. **Expected value needs probabilities and a repeated decision** — for a large one-off choice the organisation experiences one outcome, not the average, so the spread and the survivability of the downside matter more than the mean. And the rule chosen **is** a statement of appetite: presenting a maximin recommendation without saying it embodies a cautious stance leaves the judgement unexamined.",
        },
      ],
      check: {
        q: "Why are divisional managers typically more risk-averse than the shareholders they act for?",
        options: [
          "Because managers are less well informed about the business",
          "Because their human capital and income are concentrated in one organisation, while shareholders hold it as one position in a diversified portfolio — so the same downside is far more costly to the manager",
          "Because accounting rules require caution",
          "Because managers are usually rewarded for avoiding risk",
        ],
        correct: 1,
        explain:
          "The difference is diversification, and it is structural rather than a matter of temperament. Recognising it explains why incentive schemes deliberately buy risk appetite through uncapped upside — and why such schemes can overshoot, purchasing more risk-taking than shareholders actually wanted.",
      },
    },
  ],
  examTraps: [
    { trap: "Reporting a single actual against a single target as though both were certain.", fix: "Separate the uncontrollable environment from the manager's own performance." },
    { trap: "Applying expected values to a large one-off decision.", fix: "The organisation experiences one outcome — report the spread and whether the downside is survivable." },
    { trap: "Presenting a decision rule as objective.", fix: "The rule chosen expresses a risk appetite; say whose." },
    { trap: "Treating managerial caution as a character flaw.", fix: "It follows from undiversified human capital, which is why incentives are used to buy appetite." },
  ],
  keyTerms: [
    { term: "Risk appetite", def: "The amount and type of risk a party is willing to accept, which differs systematically between shareholders, lenders, managers and employees." },
    { term: "Maximin", def: "A decision rule selecting the option whose worst outcome is least bad — a cautious stance." },
    { term: "Minimax regret", def: "A decision rule minimising the largest opportunity loss that could result from having chosen wrongly." },
    { term: "Planning variance", def: "The part of a variance caused by the original standard being invalidated by events, separated from the operational performance of the manager." },
  ],
  summary: [
    "Risk enters planning, decision making and reporting, and each stage needs a different response.",
    "Reporting one actual against one target hides the uncontrollable — split the variance.",
    "Appetites differ structurally: managers are undiversified, shareholders are not.",
    "Every decision rule embodies an appetite; name it rather than presenting it as neutral.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does an uncontrollable target damage a planning system?", a: "The manager either stops treating it as meaningful or builds slack into future forecasts to protect themselves — both rational, both harmful." },
    { q: "When is expected value the wrong criterion?", a: "For a large one-off decision, where the organisation experiences a single outcome rather than the average and the downside may not be survivable." },
    { q: "What does an uncapped bonus scheme actually purchase?", a: "Risk appetite — it compensates for managers' structurally low tolerance, though it can buy more risk-taking than shareholders intended." },
  ],
  furtherStudy: [
    "Area B covers planning and operational variances, the reporting mechanism this chapter relies on.",
    "Area B covers the reward schemes that alter risk appetite deliberately.",
    "APM-02 covers the stakeholder mapping whose groups hold these differing appetites.",
  ],
}

const APM_TREE_07: StudyChapter = {
  paper: "APM",
  id: "APM-07",
  number: 7,
  area: "A",
  syllabusRefs: ["A1(i)", "A1(j)"],
  title: "Structure, culture and strategy",
  minutes: 16,
  intro:
    "Change the shape of an organisation and you change what can be measured, who can be held responsible, and whether anyone believes the numbers.",
  outcomes: [
    "Assess how a change in structure, culture or strategy affects processes, systems and people",
    "Explain how each influences which measurement methods can be adopted",
    "Match responsibility centre types to the structure they belong in",
    "Recognise where a measurement system has outlived the structure it was built for",
    "Advise on the cultural conditions a measurement system requires to work",
  ],
  sections: [
    {
      id: "structure",
      heading: "Structure decides what can be measured",
      blocks: [
        {
          kind: "text",
          md: "Responsibility accounting rests on a principle that sounds obvious and is constantly violated: **a manager should be held accountable only for what they control**. What they control is determined by the structure, so a structural change silently invalidates the measurement system unless someone updates it.",
        },
        {
          kind: "table",
          caption: "Responsibility centres",
          head: ["Centre", "Manager controls", "Appropriate measures"],
          rows: [
            ["Cost centre", "Costs only", "Cost variances, efficiency, unit cost"],
            ["Revenue centre", "Revenue only", "Sales volume and price variances, market share"],
            ["Profit centre", "Costs and revenues", "Profit, margin, contribution"],
            ["Investment centre", "Costs, revenues and the asset base", "ROI, RI, EVA"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The mismatch the examiner sets",
          md: "Judging a **cost centre** manager on profit, or a **profit centre** manager on ROI when they cannot authorise capital expenditure, imports uncontrollable items into their assessment. The result is predictable: the measure loses credibility, and the manager either games the controllable part or disengages. Check the centre type against the measure in every scenario — the mismatch is a reliable finding.",
        },
        {
          kind: "text",
          md: "Structural change also moves the boundaries. **Centralisation** narrows what divisional managers control, so divisional profit measures become less meaningful. **Decentralisation** widens it, which improves motivation and local responsiveness but introduces the classic problems: sub-optimal decisions taken in the division's interest rather than the group's, duplicated functions, and transfer pricing disputes. **Matrix structures** create dual reporting, so accountability for any single measure becomes genuinely ambiguous.",
        },
      ],
      check: {
        q: "A group centralises purchasing, removing divisional managers' authority over input prices, but continues to report divisional profit including purchase price variances. What is wrong?",
        options: [
          "Nothing — divisional profit remains the correct measure",
          "Managers are now being held accountable for prices they no longer control, so the profit measure has stopped reflecting their performance and will lose credibility",
          "Purchasing should never be centralised",
          "The divisions should be converted into cost centres",
        ],
        correct: 1,
        explain:
          "The structural change moved control without the measurement system following it. The fix is to report the divisional result excluding the effect of centrally negotiated prices, or to hold the central function accountable for that variance — not to abandon centralisation, which may well be right for other reasons.",
      },
    },
    {
      id: "culture",
      heading: "Culture decides whether the numbers are believed",
      blocks: [
        {
          kind: "text",
          md: "A measurement system is a set of rules; culture determines what people do with it. The same scorecard produces improvement in one organisation and elaborate gaming in another, and the difference is usually whether the numbers are used to **learn** or to **punish**.",
        },
        {
          kind: "table",
          caption: "Two cultures, same system",
          head: ["", "Learning culture", "Blame culture"],
          rows: [
            ["A bad number means", "Something to investigate", "Someone to punish"],
            ["Forecasts are", "Honest best estimates", "Padded, to guarantee they are beaten"],
            ["Bad news travels", "Fast, so it can be acted on", "Slowly, or not at all"],
            ["Non-financial measures are", "Taken seriously", "Manipulated, since they are subjective and unaudited"],
            ["The system produces", "Improvement", "Impressive reports and unchanged performance"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Budget slack is a cultural symptom",
          md: "When managers systematically forecast conservatively so they can beat their targets, the planning system has stopped producing usable information — the organisation is planning on numbers it knows are wrong. The cause is almost never dishonesty; it is that missing a target is punished more heavily than beating one is rewarded. Diagnose it that way and the remedy follows: change what happens when a target is missed.",
        },
        {
          kind: "text",
          md: "**Strategy** completes the trio. A change of strategy changes what matters, and the measures must follow — a company moving from cost leadership to differentiation, or into a new market, is still steering by the old instruments until someone rebuilds them. The syllabus asks specifically how these changes influence the **adoption** of measurement methods: a devolved, learning-oriented organisation can adopt a balanced scorecard with non-financial measures and expect it to work, while a centralised blame culture will reduce the same scorecard to whichever numbers determine the bonus.",
        },
        {
          kind: "activity",
          title: "Advise on the precondition",
          prompt:
            "A chief executive known for firing managers who miss targets wants to introduce a balanced scorecard with substantial non-financial measures. What do you advise?",
          answer:
            "That the scorecard will not survive contact with the existing culture, and that the sequencing matters more than the design. Non-financial measures are mostly self-reported, subjective and unaudited - satisfaction surveys, training completion, quality assessments - so in an environment where missing a number costs someone their job, those are the measures that will be managed rather than met. The likely outcome is that the non-financial scores improve rapidly and uniformly while nothing underneath them changes, which is worse than not having them, because the board will believe it now has visibility it does not have. So my advice would be to change what happens when a target is missed before adding measures that depend on honest self-reporting. Concretely: establish that a missed target triggers an investigation rather than a dismissal, protect the people who report bad news early, and demonstrate it in a real case before the scorecard launches. I would also recommend that the first non-financial measures be ones with an external or independent source - customer retention from actual transaction data, staff turnover from payroll, defect rates from returns - because those cannot be talked up. The subjective measures can follow once the culture has demonstrably shifted. The honest framing for the chief executive is that the scorecard is not the intervention here; the response to failure is.",
        },
      ],
      check: {
        q: "Managers in a company consistently forecast conservatively so they can beat their budgets. What is the underlying cause and the appropriate response?",
        options: [
          "Dishonesty; the managers should be replaced",
          "Missing a target is punished far more heavily than beating one is rewarded, so slack is a rational protection — the response is to change the consequences of missing rather than to demand better forecasts",
          "The budgeting method is too complex",
          "Forecasts should be prepared centrally instead",
        ],
        correct: 1,
        explain:
          "Slack is a response to asymmetric consequences, so exhorting managers to forecast accurately while leaving those consequences unchanged achieves nothing. Preparing forecasts centrally — option 3 — removes the local knowledge that makes them useful and is a common way of making the problem worse.",
      },
    },
  ],
  examTraps: [
    { trap: "Judging a manager on items the structure does not let them control.", fix: "Match the measure to the responsibility centre type." },
    { trap: "Leaving the measurement system unchanged after a structural change.", fix: "Control boundaries moved; the measures must move with them." },
    { trap: "Proposing non-financial measures into a blame culture.", fix: "They are self-reported and will be managed — fix the response to failure first, or start with externally sourced measures." },
    { trap: "Treating budget slack as dishonesty.", fix: "It is a rational response to asymmetric consequences; change the consequences." },
  ],
  keyTerms: [
    { term: "Responsibility accounting", def: "Holding a manager accountable only for the costs, revenues and assets they actually control." },
    { term: "Investment centre", def: "A unit whose manager controls costs, revenues and the asset base, and can therefore properly be measured on ROI, RI or EVA." },
    { term: "Budget slack", def: "Deliberate conservatism built into a forecast so that the target can be comfortably beaten." },
    { term: "Blame culture", def: "An environment in which a missed target attracts punishment rather than investigation, producing slack, delayed bad news and manipulated measures." },
  ],
  summary: [
    "Structure determines what a manager controls, and therefore what they can fairly be measured on.",
    "A structural change invalidates the measurement system unless the measures move with it.",
    "Culture decides whether measures are used to learn or to punish — and therefore whether they are honest.",
    "Non-financial measures need a culture that can tolerate bad news; otherwise they get managed.",
  ],
  knowledgeDiagnostic: [
    { q: "What determines whether ROI is an appropriate measure for a divisional manager?", a: "Whether the division is genuinely an investment centre — that is, whether the manager controls the asset base as well as costs and revenues." },
    { q: "Why does budget slack appear?", a: "Because missing a target is punished more heavily than beating one is rewarded, making conservative forecasting a rational self-protection." },
    { q: "Which non-financial measures survive a weak culture best?", a: "Those with an external or independent source — retention from transaction data, turnover from payroll, defects from returns — because they cannot be self-reported favourably." },
  ],
  furtherStudy: [
    "APM-12 covers divisional performance measures and the controllability principle in detail.",
    "Area B covers reward and accountability, where the cultural consequences are decided.",
    "Area B covers beyond budgeting, a response to the slack problem described here.",
  ],
}

export const APM_TREE_AREA_A_PART1: StudyChapter[] = [APM_TREE_01, APM_TREE_02, APM_TREE_03, APM_TREE_04, APM_TREE_05, APM_TREE_06, APM_TREE_07]
