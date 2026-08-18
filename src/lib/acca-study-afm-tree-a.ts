import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area A — Role of the senior financial adviser in the multinational
 * organisation.
 *
 * Before August 2026 the whole of Area A was ONE legacy chapter, relabelled by
 * acca-study-afm-official.ts. Five sections carried six syllabus sub-topics
 * (A1–A6), so international trade and finance, multinational planning and
 * dividend capacity — three subsections that carry real technical marks —
 * shared a chapter written mainly about the adviser's role and ethics.
 *
 *   AFM-01  What a senior financial adviser is for            (A1)
 *   AFM-02  Financial strategy: performance, mix, distribution (A2a–c)
 *   AFM-03  Risk in financial strategy                         (A2d–g)
 *   AFM-04  Behavioural finance and the limits of pricing      (A2h)
 *   AFM-05  ESG and sustainability in financial decisions      (A3a–b)
 *   AFM-06  Stakeholders, agency conflict, ethical governance  (A3c–h)
 *   AFM-07  International trade, institutions and markets      (A4)
 *   AFM-08  Strategic financial planning for the multinational (A5)
 *   AFM-09  Dividend capacity, remittances, transfer pricing   (A6)
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. The founder's Kaplan AFM Study Text and Exam Kit (2020-21)
 * were used for depth and structure calibration ONLY — every word here is
 * original.
 *
 * House style for AFM. Section A is a single 50-mark case study (40 technical +
 * 10 professional skills); Section B is two 25-mark scenario questions (20 + 5).
 * There are no wholly narrative questions and no purely computational ones, so
 * no model is ever taught for its own sake: each section says what decision the
 * number feeds, how fragile it is, and what the board is actually being asked to
 * approve. Name the distractor every time — AFM's commonest one is a technically
 * correct figure offered as though it were a recommendation.
 */

const AFM_TREE_01: StudyChapter = {
  paper: "AFM",
  id: "AFM-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)"],
  title: "What a senior financial adviser is for",
  minutes: 16,
  intro:
    "AFM is written from one chair: the senior adviser sitting in front of a board that must decide something. Everything else in the syllabus is evidence you bring to that meeting.",
  outcomes: [
    "Describe the remit of a senior finance executive or adviser in terms of the decisions they own rather than the tasks they perform",
    "Show how the investment, financing and distribution decisions constrain one another instead of being handled in sequence",
    "Set financial goals that a board can actually monitor, and say what each one is a proxy for",
    "Frame advice so a board can approve, reject or amend it — the format AFM's Section A always asks for",
    "Explain why shareholder wealth remains the reference objective while other stakeholders shape the constraints",
  ],
  sections: [
    {
      id: "advice-not-arithmetic",
      heading: "The job is advice, and advice is not arithmetic",
      blocks: [
        {
          kind: "text",
          md: "The AFM examiner describes the candidate as a senior financial executive or adviser. That is not window dressing — it fixes what a full-mark answer looks like. A junior analyst is paid to produce a correct number. A senior adviser is paid to say **what the organisation should now do**, and to defend that under challenge from people who did not do the calculation and will not check it.",
        },
        {
          kind: "text",
          md: "So a net present value, a hedge outcome or a valuation is an *input* to the answer, never the answer itself. The examiner's reports return to this every sitting: candidates compute competently and then stop, or append a single sentence — 'therefore the project should be accepted' — that repeats the number instead of interpreting it. The technical marks are the entry ticket; the marks that separate a pass from a fail are for what the figure means, how much weight it can carry, and what should be done about it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Where the adviser adds value",
            data: {
              steps: [
                { label: "Evidence", sub: "Exhibits, forecasts, market data" },
                { label: "Analysis", sub: "The model — NPV, valuation, exposure" },
                { label: "Judgement", sub: "How fragile, how financeable, how strategic" },
                { label: "Recommendation", sub: "A course of action with conditions" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two-column habit",
          md: "For every figure you produce, force yourself to write a second column: **so what?** A cost of capital that rises from 9% to 11% is not a fact, it is a warning that the marginal project the board just approved is no longer viable. Candidates who build this habit stop losing the discussion marks they had already earned the right to.",
        },
        {
          kind: "definition",
          term: "Senior financial adviser",
          md: "The person accountable for recommending, not merely modelling, the organisation's investment, financing, distribution and risk decisions — and for communicating them to the board and to external providers of capital.",
        },
      ],
      check: {
        q: "A candidate produces a correct APV of $42m for a proposed acquisition and concludes: 'The APV is positive at $42m, so the acquisition should proceed.' Why does this lose most of the available judgement marks?",
        options: [
          "The APV method is inappropriate for acquisitions, so the figure itself is wrong",
          "It restates the output as though it were the advice, without saying what drives the $42m, how sensitive it is, or whether the deal can be financed and integrated",
          "A recommendation must always be to reject unless the margin exceeds 20%",
          "APV should have been converted into an equivalent annual benefit before advising",
        ],
        correct: 1,
        explain:
          "The calculation earns its technical marks and then the answer stops. A senior adviser has to say which assumptions the $42m rests on (usually synergy timing and the discount rate), what happens if they are optimistic, whether the funding structure the APV assumed is actually available, and what conditions should attach to approval. Option 0 is wrong — APV is well suited to a deal that changes the financing mix. Option 2 invents a rule the syllabus does not contain, and option 3 confuses a technique used for unequal-life asset replacement with strategic advice.",
      },
    },
    {
      id: "three-decisions",
      heading: "Three decisions that refuse to sit still",
      blocks: [
        {
          kind: "text",
          md: "Financial management is conventionally split into the investment decision, the financing decision and the distribution decision. The split is useful for teaching and misleading in practice, because each one moves the other two. AFM examines the interaction, which is why a case study rarely asks about a project in isolation.",
        },
        {
          kind: "table",
          caption: "How each decision constrains the others",
          head: ["Decision", "What it settles", "What it does to the others"],
          rows: [
            ["Investment", "Which assets and projects to hold", "Sets the business risk, and therefore the asset beta that drives the cost of capital"],
            ["Financing", "The mix of equity, debt and hybrids", "Changes financial risk, the cost of equity, covenant headroom and the tax shield"],
            ["Distribution", "How much is paid out and how", "Consumes the cash that would otherwise fund investment, or forces new issues"],
          ],
        },
        {
          kind: "illustration",
          title: "The circle closing on a real board",
          md: "A group approves a large overseas expansion (investment). Because the project is riskier than the existing business, lenders reprice the facility and the cost of debt rises (financing). To fund the equity portion without a rights issue, the board proposes halving the dividend (distribution) — at which point the institutional shareholders who supported the expansion in principle start objecting to the means. Nothing here was a mistake; the three decisions simply cannot be taken one at a time.",
        },
        {
          kind: "text",
          md: "This is why the syllabus asks for advice on **capital resource allocation, minimising the cost of capital, and distribution and retention policy** as one brief rather than three. When a Section A case gives you a project *and* a proposed funding structure *and* a dividend commitment, the interaction is usually where the professional-skills marks live.",
        },
        {
          kind: "activity",
          title: "Trace the second-order effect",
          prompt:
            "A listed group announces a share buy-back funded entirely by new fixed-rate debt. Name three consequences that reach beyond the buy-back itself, one in each of the investment, financing and risk domains.",
          answer:
            "Financing: gearing rises, so the cost of equity rises with financial risk (and the tax shield rises with it) — the net effect on WACC depends on where the group sits relative to its trade-off optimum. Investment: cash and debt capacity consumed by the buy-back is no longer available for the project pipeline, so marginal projects may be deferred and the group's real option to expand is narrowed. Risk: fixed-rate debt raises the fixed charge that must be met in a downturn, tightening interest cover and probably tripping covenant headroom sooner — and if earnings are in a foreign currency while the debt is domestic, it also creates or worsens an economic exposure.",
        },
      ],
      check: {
        q: "Why does the syllabus treat 'minimising the cost of capital' as something to advise on rather than simply calculate?",
        options: [
          "Because the cost of capital cannot be estimated reliably enough to be useful",
          "Because it is determined by the mix and risk the board chooses, so it is an outcome of decisions the adviser is recommending, not a fixed external input",
          "Because regulators set a minimum cost of capital for listed groups",
          "Because it only matters for projects funded by debt",
        ],
        correct: 1,
        explain:
          "The cost of capital reflects the business risk of the assets held and the financial risk of the structure chosen — both of which the board controls. Advising on it means advising on gearing, on project selection, and on whether a project-specific rate is needed. Option 0 overstates the difficulty (it is estimated routinely, with stated limitations), option 2 is invented, and option 3 forgets that equity carries a cost even though no cash interest is paid.",
      },
    },
    {
      id: "policy-framework",
      heading: "Setting goals the board can actually monitor",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks the adviser to help set financial goals and develop financial policy. A goal is only useful if someone can tell, at the next board meeting, whether it is being met. That means each goal needs a measure, a target, a horizon and an owner — and the adviser should say what the measure is a **proxy** for, because every one of them can be gamed.",
        },
        {
          kind: "table",
          caption: "Common financial goals and what they hide",
          head: ["Goal", "Typical measure", "How it can mislead"],
          rows: [
            ["Grow shareholder value", "Total shareholder return", "Driven by market sentiment the board does not control, over short horizons"],
            ["Improve returns", "ROCE or ROI", "Rises if investment is starved and the asset base shrinks"],
            ["Maintain financial strength", "Gearing, interest cover", "Book gearing ignores off-balance-sheet obligations and market values"],
            ["Grow earnings", "EPS growth", "Rises through buy-backs and low-return acquisitions that destroy value"],
            ["Fund the strategy", "Free cash flow to equity", "Improves temporarily by deferring necessary capital expenditure"],
          ],
        },
        {
          kind: "formula",
          name: "Total shareholder return",
          expr: "TSR = (P₁ − P₀ + D₁) ÷ P₀",
          note: "Capital gain plus dividends received, over the opening share price. Its virtue is that it captures both halves of what a shareholder gets; its weakness is that over one year it measures the market's mood as much as management's performance.",
        },
        {
          kind: "example",
          title: "Reading a goal against its measure",
          scenario:
            "A board sets a three-year target of 12% average TSR. In year one the shares rise from $4.20 to $4.62 and a dividend of $0.18 is paid, but the sector index rose 15% over the same period.",
          steps: [
            { label: "Compute", detail: "TSR = (4.62 − 4.20 + 0.18) ÷ 4.20 = 0.60 ÷ 4.20 = 14.3%." },
            { label: "Compare", detail: "Against the target of 12% the year looks successful; against a sector that rose 15% the company underperformed its peers." },
            { label: "Interpret", detail: "An absolute TSR target rewards a rising market. A relative measure isolates what management contributed." },
            { label: "Advise", detail: "Recommend the target be expressed relative to a peer index, measured over a rolling three years to damp out short-term sentiment." },
          ],
          result: "The same 14.3% supports 'target met' and 'peers beat us' — which is precisely why the adviser, not the measure, has to make the judgement.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Not-for-profit and public sector are examinable",
          md: "The syllabus covers private **and** public sectors. Where there is no share price, the objective becomes value for money, tested through economy, efficiency and effectiveness, and the adviser's job shifts to demonstrating that outputs justify the resources consumed. Do not assume every scenario has shareholders.",
        },
      ],
      check: {
        q: "A group's remuneration committee proposes measuring executive performance on EPS growth alone. What is the strongest objection an adviser should raise?",
        options: [
          "EPS is not disclosed by listed companies, so it cannot be audited",
          "EPS can be increased by buy-backs and by debt-funded acquisitions that earn less than the cost of capital, so it can rise while value is destroyed",
          "EPS ignores the tax charge, which is the largest expense for most groups",
          "EPS growth is only relevant to unlisted companies",
        ],
        correct: 1,
        explain:
          "EPS is an earnings-per-share measure that takes no account of the risk or the capital required to produce the earnings. Repurchasing shares mechanically lifts it, and so does any acquisition financed at a lower after-tax cost than the target's earnings yield — the bootstrap effect — regardless of whether value was created. Option 0 is factually wrong, option 2 misstates the calculation (EPS uses post-tax earnings), and option 3 reverses the position.",
      },
    },
    {
      id: "objective",
      heading: "Whose objective, and how far it stretches",
      blocks: [
        {
          kind: "text",
          md: "AFM keeps shareholder wealth maximisation as the reference objective, and then spends much of Area A explaining why that is not the end of the discussion. The honest position — and the one that earns marks — is that shareholder wealth is the **objective**, while the legitimate claims of other stakeholders are **constraints** on how it may be pursued, some of them legal, some contractual, and some purely reputational but no less binding.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Why the constraint view beats both extremes",
          items: [
            "Pure shareholder primacy invites decisions that are profitable and unfinanceable, unlicensable or unsurvivable in reputational terms",
            "Pure stakeholder balancing gives no way of choosing when claims conflict, so it collapses into whatever management prefers",
            "The constraint framing keeps a single decision rule while forcing the adviser to state, explicitly, which limits bind in this scenario",
            "It also matches how capital markets now price companies — poor environmental or governance conduct shows up as a higher cost of capital, not as a separate non-financial matter",
          ],
        },
        {
          kind: "text",
          md: "It is also why the syllabus attaches a communication duty to the goal-setting outcomes: policy and objectives have to be explained both to the people inside the business who act on them and to the investors and lenders outside it who price them. A financial policy the market does not understand is priced as though it were riskier than it is. Consistency of message — dividend approach, gearing target, investment criteria — is itself a source of value, and a sudden unexplained change is read as distress.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The Section A framing to carry into every answer",
          md: "You are advising a board on a decision. State the recommendation, the evidence for it, the assumptions it depends on, the risks if those assumptions fail, and the conditions or controls that should attach to approval. That structure earns technical marks and professional-skills marks at the same time, which is the only reliable way to reach the pass mark on this paper.",
        },
      ],
      check: {
        q: "In an AFM case study, what is the most defensible way to handle a decision that raises shareholder value but damages a major community stakeholder?",
        options: [
          "Recommend it without qualification, since shareholder wealth is the objective",
          "Reject it, since stakeholder interests override shareholder returns",
          "Quantify the value, then assess whether the stakeholder consequence is a binding constraint — licence, reputation, contract or law — and recommend accordingly, with mitigation or conditions",
          "Refer the decision to the audit committee, since it is an ethical matter rather than a financial one",
        ],
        correct: 2,
        explain:
          "The examinable skill is holding both halves at once: produce the value analysis, then test it against the constraints the scenario actually imposes. Options 0 and 1 each discard half the evidence, and neither is a judgement. Option 3 abdicates — the adviser is being asked for a recommendation, and community consequences are financial in the end, arriving through licences, boycotts, litigation and the cost of capital.",
      },
    },
  ],
  examTraps: [
    { trap: "Ending a requirement with the calculated figure and a one-line 'therefore accept'.", fix: "Follow every number with drivers, sensitivity, financeability and conditions." },
    { trap: "Treating investment, financing and distribution as three separate answers.", fix: "Say explicitly how the proposal in front of the board moves the other two." },
    { trap: "Assuming every scenario is a listed company with shareholders.", fix: "Check the sector — public and not-for-profit bodies are examinable, with value for money as the objective." },
    { trap: "Listing stakeholder groups without saying which claim binds this decision.", fix: "Identify the constraint that actually operates here, and what it costs to breach it." },
  ],
  keyTerms: [
    { term: "Financial strategy", def: "The linked set of investment, financing, distribution and risk decisions through which an organisation pursues its objective." },
    { term: "Total shareholder return", def: "The return to a shareholder over a period, combining the change in share price with dividends received, expressed on the opening price." },
    { term: "Value for money", def: "The public-sector objective, assessed as economy in acquiring resources, efficiency in converting them to outputs, and effectiveness in achieving intended outcomes." },
    { term: "Financial policy", def: "The standing rules — gearing target, dividend approach, investment hurdle, risk appetite — that make individual decisions predictable to the market." },
  ],
  summary: [
    "AFM is written from the adviser's chair: the deliverable is a defensible recommendation, not a correct figure.",
    "Investment, financing and distribution decisions move one another; examine the interaction, not the parts.",
    "Every financial goal needs a measure, and every measure can be gamed — say what it is a proxy for.",
    "Shareholder wealth is the objective; stakeholder claims are the constraints that determine how it may be pursued.",
  ],
  knowledgeDiagnostic: [
    { q: "What turns a technically correct calculation into a senior adviser's answer?", a: "Stating what drives the figure, how sensitive it is to its assumptions, whether the organisation can finance and implement it, and what conditions should attach to approval." },
    { q: "Why can EPS growth be a dangerous performance target?", a: "It can be lifted by buy-backs and by acquisitions financed more cheaply than the target's earnings yield, neither of which requires value to have been created." },
    { q: "How should an adviser treat stakeholder interests in a value-based decision?", a: "As constraints on how shareholder value may be pursued — identifying which ones actually bind in the scenario, and what breaching them would cost." },
  ],
  furtherStudy: [
    "AFM-02 turns these goals into the measures and capital-mix judgements a board is asked to approve.",
    "AFM-06 develops the agency and governance side of the stakeholder discussion introduced here.",
    "Area B applies the investment decision in depth, and Area E the risk management side.",
    "ACCA's Ethics and Professional Skills module covers the same adviser's role from the conduct side.",
  ],
}

const AFM_TREE_02: StudyChapter = {
  paper: "AFM",
  id: "AFM-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)"],
  title: "Financial strategy: performance, capital mix and distribution",
  minutes: 18,
  intro:
    "Three questions a board asks the adviser in every strategic review: how are we doing, how should we be funded, and how much should we pay out. AFM wants each answered from the scenario's own numbers.",
  outcomes: [
    "Assess performance from ratios and trends while stating what the ratios cannot see",
    "Recommend a capital structure for a specific business, rather than reciting a general theory",
    "Use the trade-off and pecking-order views as tools for advising, not as positions to defend",
    "Recommend a distribution and retention policy that the organisation's cash flows can sustain",
    "Explain why the signal a policy sends can matter more than the cash it moves",
  ],
  sections: [
    {
      id: "reading-performance",
      heading: "Reading performance as evidence, not as a score",
      blocks: [
        {
          kind: "text",
          md: "Ratio analysis at AFM level is not a computation exercise — the marks are for what the movement tells you about the decision on the table. A ratio has no meaning alone; it acquires meaning against a trend, a peer, a covenant or a plan. So the first move is always to say **against what** you are comparing.",
        },
        {
          kind: "table",
          caption: "What each family is evidence of, and its blind spot",
          head: ["Family", "Reads on", "Blind spot at AFM level"],
          rows: [
            ["Return — ROCE, ROE, margins", "Whether the assets are earning", "Shrinks the denominator if investment is deferred, so decline looks like improvement"],
            ["Gearing — debt/equity, gearing %", "Capital structure and resilience", "Book values ignore market value, leases, pensions and guarantees"],
            ["Cover — interest, dividend, fixed charge", "Ability to survive a downturn", "Averages hide seasonality and the timing of refinancing"],
            ["Liquidity — current, quick, cash cycle", "Short-term solvency", "A healthy ratio can sit on undrawn facilities that a covenant breach removes"],
            ["Market — P/E, dividend yield, EV/EBITDA", "How the market prices the strategy", "Reflects sentiment and sector rating as much as company performance"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The three-sentence ratio comment",
          md: "State the movement, attribute it to a cause visible in the scenario, then say what it means for the decision. 'Interest cover has fallen from 6.2 to 3.1 times, driven by the debt raised for the acquisition rather than by any fall in operating profit, so the group is close to the 3.0 covenant and has little capacity for further debt-funded investment.' That is three marks' worth; 'interest cover has fallen' is worth nothing.",
        },
        {
          kind: "text",
          md: "Watch for the trap the examiner sets repeatedly: **a ratio that improves for a bad reason**. ROCE rising because capital employed fell, margins rising because a loss-making but strategically necessary division was closed, gearing falling because assets were revalued upward. The adviser who explains the cause rather than the direction is the one demonstrating scepticism, which is a professional skill the mark scheme pays for by name.",
        },
        {
          kind: "activity",
          title: "Diagnose the improvement",
          prompt:
            "A group reports ROCE up from 11.4% to 13.8%, revenue down 6%, and capital expenditure at 40% of the prior year's level. What should the adviser say?",
          answer:
            "The improvement is very unlikely to be operational. Revenue has fallen, so the numerator is probably not the driver; capital expenditure at 40% of prior year means the asset base is depreciating faster than it is being replaced, shrinking capital employed and mechanically raising the ratio. The correct comment is that returns appear to have been bought by under-investment, which flatters the current year at the cost of future capacity and competitiveness — and that the board should be asked whether the capital expenditure cut was a deliberate strategic choice or a symptom of a funding constraint, because the two call for opposite responses.",
        },
      ],
      check: {
        q: "A company's gearing measured on book values is 35%, comfortably inside its 50% policy limit. Why might an adviser still warn the board?",
        options: [
          "Book gearing is not permitted under the syllabus; only market gearing is examinable",
          "Book values can understate the real obligation — leases, pension deficits and guarantees — and understate or overstate equity relative to its market value, so the true position may be far tighter",
          "A gearing limit of 50% is too high for any listed company",
          "Gearing ratios are irrelevant once a company has a credit rating",
        ],
        correct: 1,
        explain:
          "The warning is about what the measure cannot see. Market capitalisation can be far above or below book equity, and obligations that behave like debt do not always sit in the borrowings line. Option 0 invents a rule, option 2 asserts a universal limit that depends entirely on business risk, and option 3 is backwards — the rating agencies themselves adjust reported gearing for exactly these items.",
      },
    },
    {
      id: "capital-mix",
      heading: "Recommending a capital mix for this business",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks for the optimum capital mix **within a specified business context and capital asset structure**. That wording is the whole exam technique: there is no universally right gearing level, so an answer that recites Modigliani–Miller and stops has answered a different question. What the theories give you is a set of forces to weigh against the facts in front of you.",
        },
        {
          kind: "table",
          caption: "The three views, used as advisory tools",
          head: ["View", "What it says", "What it tells you to look for in the scenario"],
          rows: [
            ["Modigliani–Miller with tax", "Debt adds value through the tax shield", "Is the company actually paying tax? A loss-maker or one with unused allowances gains no shield"],
            ["Static trade-off", "The shield is offset by rising financial distress costs", "How volatile are the cash flows, how specific are the assets, how close are the covenants"],
            ["Pecking order", "Firms prefer retentions, then debt, then equity, to avoid signalling", "Is management avoiding a rights issue because of price sensitivity rather than cost"],
          ],
        },
        {
          kind: "text",
          md: "**Agency effects** sit alongside these. Debt disciplines management by committing free cash flow to fixed payments, which is an argument for gearing in a mature business generating more cash than it has projects for. The same discipline becomes a danger in a business whose value lies in growth options, because a debt-service obligation forces the sale or abandonment of exactly those options in a downturn.",
        },
        {
          kind: "list",
          style: "number",
          title: "How to build the recommendation",
          items: [
            "Characterise the business risk first — cash flow volatility, cyclicality, operating gearing, asset tangibility",
            "Check the tax position, because the shield is worth nothing to a company that is not paying tax",
            "Test the proposed structure against covenants, rating thresholds and refinancing dates, not just against a target ratio",
            "Ask what the structure does to flexibility: can this company still fund its pipeline if trading falls 20%?",
            "Say what the market will read into the change, and recommend how it should be communicated",
          ],
        },
        {
          kind: "illustration",
          title: "Two companies, opposite advice",
          md: "A regulated water utility has stable, inflation-linked, largely contracted cash flows and tangible assets a lender can secure against. High gearing is not merely tolerable, it is efficient, and the sector runs at levels that would be reckless elsewhere. A clinical-stage biotechnology company has no revenue, no taxable profits and assets that are worth little in liquidation. For it the tax shield is worthless, distress costs are catastrophic, and equity — however expensive it looks — is the only sane answer. Same theory, opposite recommendation, because the theory was applied to the business.",
        },
      ],
      check: {
        q: "A profitable, cash-generative group with few remaining growth projects asks whether to increase gearing. Which argument most strongly supports doing so?",
        options: [
          "Debt is always cheaper than equity, so any increase in gearing reduces WACC",
          "The interest tax shield has value to a taxpaying company, and the commitment to fixed payments limits the free cash flow available for value-destroying discretionary investment",
          "Higher gearing raises EPS, which increases shareholder wealth",
          "Pecking order theory requires mature companies to use debt before retentions",
        ],
        correct: 1,
        explain:
          "This combines the tax argument with the agency argument, and both fit the facts given — the company pays tax and has surplus cash with nowhere obvious to invest it. Option 0 is the classic error: debt's lower cost is partly offset by the rise it causes in the cost of equity. Option 2 confuses an accounting effect with value. Option 3 reverses the pecking order, which puts retentions first.",
      },
    },
    {
      id: "distribution",
      heading: "Distribution and retention: cash, signal and clientele",
      blocks: [
        {
          kind: "text",
          md: "A distribution policy has to do two jobs at once. It must be affordable from the cash the business actually generates after funding its investment plan, and it must be *readable* — the market interprets dividend decisions as management's private forecast made public. The second job is why cuts are so costly and why boards smooth payments through years when the arithmetic alone would not justify it.",
        },
        {
          kind: "table",
          caption: "The three lenses on a distribution decision",
          head: ["Lens", "The question it asks", "Practical consequence"],
          rows: [
            ["Residual", "What is left after funding all positive-NPV projects?", "Theoretically correct, but produces a volatile dividend the market punishes"],
            ["Signalling", "What will a change tell the market about our forecasts?", "Dividends are smoothed; cuts are made late and are read as distress"],
            ["Clientele", "Who holds our shares and why?", "A sudden change in policy drives out the existing shareholder base and re-rates the shares"],
          ],
        },
        {
          kind: "text",
          md: "Share buy-backs are the alternative route and the syllabus expects you to compare them. A buy-back returns cash without creating an expectation of repetition, which makes it the natural instrument for a **one-off** surplus; it also concentrates ownership and lifts EPS mechanically. Its weaknesses are that it can be used to flatter earnings-based targets, that it is a poor use of cash if the shares are overvalued, and that it removes the balance-sheet capacity the company might need later.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Scrip dividends are not free money",
          md: "A scrip alternative conserves cash and can look attractive under pressure, but it increases the share count and therefore the future cash cost of maintaining the same dividend per share. Recommend it as a bridge across a specific funding gap, with an end date, not as a permanent policy.",
        },
        {
          kind: "example",
          title: "Is the proposed dividend affordable?",
          scenario:
            "A board proposes maintaining a $60m annual dividend. Operating cash flow after tax and interest is $145m, committed capital expenditure is $95m, and $30m of debt matures next year with no agreed refinancing.",
          steps: [
            { label: "Cash available", detail: "145 − 95 = $50m of free cash flow before financing." },
            { label: "Against commitments", detail: "The $30m maturity must be met or refinanced; paying $60m leaves the group $40m short before the maturity is even addressed." },
            { label: "Judge", detail: "The dividend is not affordable from this year's cash flow. It can only be paid by drawing facilities or refinancing — funding a distribution with debt." },
            { label: "Advise", detail: "Secure the refinancing first; if it is agreed on acceptable terms the dividend can stand as a smoothing decision, and if not, recommend a scrip alternative rather than a cut, with the reason explained to the market." },
          ],
          result: "The recommendation turns on the refinancing, not on the dividend — which is how AFM expects distribution questions to be reasoned.",
        },
      ],
      check: {
        q: "A company with a long record of steady dividend growth faces one poor year caused by a one-off event. What does signalling theory suggest about cutting the dividend?",
        options: [
          "Cut it, because the residual theory requires distributions to follow available cash exactly",
          "Cut it, because maintaining a dividend from reserves is not permitted",
          "Maintain it if the shortfall is genuinely temporary and can be funded, because a cut is read as management's judgement that the decline is permanent",
          "Replace it with a buy-back of the same value, which sends no signal at all",
        ],
        correct: 2,
        explain:
          "The information content of a dividend is what makes cuts expensive: the market reads a cut as the board's own forecast that future cash flows will not support the old level. Option 0 applies the residual view mechanically, which is exactly what signalling explains firms avoid. Option 1 is legally wrong — distributable reserves, not the year's profit, set the limit. Option 3 is wrong because switching a regular dividend to a buy-back also signals, and is usually read as reduced confidence in sustaining the payout.",
      },
    },
  ],
  examTraps: [
    { trap: "Calculating ratios without a comparator.", fix: "Compare to trend, peers, covenants or plan — and say which, explicitly." },
    { trap: "Reciting Modigliani–Miller as the answer to a capital-structure requirement.", fix: "Use the theories to interrogate the scenario's cash flows, tax position and covenants." },
    { trap: "Treating a lower-cost source as automatically value-adding.", fix: "Remember that raising gearing raises the cost of equity, so the net WACC effect must be argued." },
    { trap: "Recommending a dividend cut on arithmetic alone.", fix: "Weigh the signal and the clientele, and consider scrip or a bridging facility for a temporary shortfall." },
  ],
  keyTerms: [
    { term: "Static trade-off theory", def: "The view that an optimal gearing level exists where the marginal value of the interest tax shield is offset by the marginal expected cost of financial distress." },
    { term: "Pecking order", def: "The observed financing preference for retained earnings first, then debt, then new equity, driven by the signalling cost of issuing shares." },
    { term: "Dividend clientele", def: "The body of shareholders attracted by a particular distribution policy, whose composition changes if the policy changes." },
    { term: "Residual dividend policy", def: "Paying out only what remains after every project offering a positive net present value has been funded." },
  ],
  summary: [
    "A ratio means nothing without a comparator, and an improvement can have a damaging cause.",
    "There is no universal optimum gearing — characterise the business risk, tax position and covenants first.",
    "Debt's tax shield and agency discipline are real, and so are distress costs and lost flexibility.",
    "Distribution decisions carry information; affordability and signal both have to be argued.",
  ],
  knowledgeDiagnostic: [
    { q: "Give an example of a ratio improving for a bad reason.", a: "ROCE rising because deferred capital expenditure has shrunk capital employed, rather than because operating returns improved." },
    { q: "When is the interest tax shield worth nothing?", a: "When the company is not paying tax — because it is loss-making or already sheltered by unused allowances — so there is no liability for the interest to reduce." },
    { q: "Why is a buy-back better suited than a dividend increase to a one-off cash surplus?", a: "It returns the cash without creating an expectation that the higher payment will be repeated, so it does not commit future cash flow." },
  ],
  furtherStudy: [
    "AFM-03 takes the risk half of financial strategy formulation in detail.",
    "AFM-09 develops distribution into the multinational's dividend capacity computation.",
    "Area B examines the cost of capital, gearing and the adjusted present value technique numerically.",
  ],
}

const AFM_TREE_03: StudyChapter = {
  paper: "AFM",
  id: "AFM-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A2(d)", "A2(e)", "A2(f)", "A2(g)"],
  title: "Risk in financial strategy: exposure, framework and monitoring",
  minutes: 18,
  intro:
    "Shareholders can diversify. That single fact makes 'why hedge at all?' a genuinely hard question — and AFM expects you to answer it before you start hedging anything.",
  outcomes: [
    "Argue the theoretical case against corporate hedging, and the practical reasons boards hedge anyway",
    "Map an organisation's exposures across operational, reputational, political, economic, regulatory and fiscal risk",
    "Distinguish mitigation, hedging and diversification, and say when each is the right instrument",
    "Recommend a risk management framework with an appetite, an owner and a reporting line",
    "Design post-completion monitoring that changes decisions rather than merely recording them",
  ],
  sections: [
    {
      id: "why-hedge",
      heading: "Why hedge, when shareholders can diversify?",
      blocks: [
        {
          kind: "text",
          md: "Start from the objection, because the examiner does. In a well-functioning capital market a shareholder holds a diversified portfolio, so the company-specific risk that hedging removes has already been diversified away in their hands. Hedging costs money — premiums, margin, treasury staff, basis risk. On that argument corporate hedging destroys value.",
        },
        {
          kind: "text",
          md: "The argument is right about the mechanism and wrong about the world, and the practical case is where the marks are. Hedging adds value when it changes something the shareholder's portfolio cannot change:",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The practical rationale",
          items: [
            "**Financial distress costs are real and non-linear** — a diversified shareholder still loses everything invested in a company that breaches a covenant and is forced into a fire sale",
            "**Cash flow stability protects the investment programme** — a firm that must cancel projects in a bad year loses value permanently, not temporarily",
            "**Tax can be convex** — where losses cannot be immediately relieved, smoothing taxable profits raises the expected after-tax cash flow",
            "**Managers are not diversified** — their human capital is in one firm, so they will hedge, and a stated policy is better than an unstated one",
            "**Debt capacity** — a hedged cash flow supports more borrowing on better terms, which is worth more than the hedge costs",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction the mark scheme rewards",
          md: "Hedging **transaction** exposure is largely mechanical and rarely controversial. Hedging **economic** exposure — the effect of long-run currency or rate movements on competitive position — cannot be done with a forward contract, and needs operational answers: where you locate production, where you borrow, which currencies you invoice in. Say which exposure you are treating before you choose an instrument.",
        },
      ],
      check: {
        q: "Which of these is the strongest theoretical objection to a listed company hedging its currency exposures?",
        options: [
          "Hedging instruments are not available in most currencies",
          "Shareholders can diversify company-specific risk themselves at lower cost, so the company pays hedging costs to remove a risk its owners have already neutralised",
          "Hedging is prohibited unless the exposure exceeds 10% of revenue",
          "Hedging always converts a currency risk into an equivalent interest rate risk",
        ],
        correct: 1,
        explain:
          "The theoretical objection is a portfolio argument: the risk being removed is unsystematic in the shareholder's hands. Answering it well means showing what hedging does that a portfolio cannot — protect the investment programme, preserve debt capacity and avoid distress costs. Option 0 is false for major currencies, option 2 is invented, and option 3 confuses hedging with a specific swap structure.",
      },
    },
    {
      id: "exposure-map",
      heading: "Mapping the exposures a multinational actually carries",
      blocks: [
        {
          kind: "text",
          md: "The syllabus names the categories explicitly, and a case study usually contains several at once. The skill is spotting them in the exhibits and saying which are *material* to the decision — a list of every risk type is worth almost nothing.",
        },
        {
          kind: "table",
          caption: "Exposure types and how they show up in a scenario",
          head: ["Exposure", "What it is", "The exhibit clue"],
          rows: [
            ["Business / operational", "Volatility of operating cash flows from the trade itself", "Concentrated customers, single-site production, thin margins, high operating gearing"],
            ["Financial", "Volatility added by the funding structure", "Floating-rate debt, near-term maturities, tight covenants, foreign-currency borrowings"],
            ["Political", "Government action against the investment", "Expropriation history, local ownership rules, unstable transition, sanctions exposure"],
            ["Economic", "Long-run competitiveness shifting with rates and currencies", "Costs in one currency, revenues in another, with competitors based elsewhere"],
            ["Regulatory", "Rules changing the licence to operate or the price", "Price caps, licence renewals, new capital or environmental standards"],
            ["Fiscal", "Tax base, rate or treaty change", "Reliance on a favourable treaty, transfer pricing under review, temporary incentives"],
            ["Reputational", "Loss of trust that reprices access to customers and capital", "Supply-chain labour issues, environmental incident, governance failure in the press"],
          ],
        },
        {
          kind: "illustration",
          title: "One decision, four exposures",
          md: "A group builds a plant in an emerging market to serve exports. The construction contract is fixed-price in dollars while the funding is floating-rate local currency (financial). Output competes with producers in a third country whose currency has depreciated (economic). The plant needs a five-year operating licence renewable at the regulator's discretion (regulatory), and the tax holiday that made the appraisal work expires in year four (fiscal). None of these is the currency transaction exposure the treasury team was asked to hedge.",
        },
        {
          kind: "activity",
          title: "Rank by materiality",
          prompt:
            "In the plant scenario above, which exposure would you put first in a report to the board, and why?",
          answer:
            "The fiscal one, most likely — because it is the exposure that can invalidate the appraisal outright rather than merely reduce its return, and because it has a known date. If the project's net present value depends on a tax holiday that expires in year four, the whole case rests on an assumption about a future government decision, and the board needs that stated before anything else. Economic exposure would come second: it is harder to quantify but structural, and it cannot be hedged with financial instruments. The floating-rate funding is genuinely third — real, but the most easily fixed, with a swap or a cap. Ranking by 'what could make this decision wrong' rather than by size is what demonstrates commercial acumen.",
        },
      ],
      check: {
        q: "A group manufactures in a country whose currency has strengthened sharply, and sells into export markets against competitors based elsewhere. Which exposure is this, and can a forward contract fix it?",
        options: [
          "Transaction exposure; yes, forwards address it directly",
          "Translation exposure; yes, a balance-sheet hedge addresses it",
          "Economic exposure; no — the loss of competitiveness is structural and needs operational responses such as relocating production or shifting the currency of costs",
          "Political exposure; no, only insurance addresses it",
        ],
        correct: 2,
        explain:
          "The damage here is to the competitive position across all future sales, not to a specific contracted cash flow, so it is economic exposure. Forwards hedge known transactions over limited horizons and cannot protect a cost base that is permanently uncompetitive. Translation exposure concerns the consolidation of foreign net assets, which is an accounting effect rather than a cash one, and political exposure describes government action, not currency movement.",
      },
    },
    {
      id: "framework",
      heading: "Mitigation, hedging and diversification are not interchangeable",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks you to compare and contrast three strategies, and the comparison matters because boards routinely reach for the wrong one. Each addresses a different part of the risk profile and each has a different cost.",
        },
        {
          kind: "table",
          caption: "Three responses, three uses",
          head: ["Strategy", "What it does", "Best used when", "Cost"],
          rows: [
            ["Mitigation", "Reduces the likelihood or impact at source", "The risk is operational and controllable — dual sourcing, redundancy, controls", "Capital and operating cost, permanently"],
            ["Hedging", "Transfers a defined financial exposure to a counterparty", "The exposure is measurable, dated and financial", "Premium, spread, margin, basis risk"],
            ["Diversification", "Spreads exposure so no single event dominates", "Risks are genuinely uncorrelated across markets or products", "Loss of focus and scale; correlations converge in a crisis"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The diversification trap",
          md: "Corporate diversification into unrelated businesses to reduce risk is the classic value-destroying answer, because shareholders can diversify more cheaply by holding a portfolio. Diversification is defensible when it does something a portfolio cannot — securing a supply chain, spreading regulatory exposure across jurisdictions, or building an operational hedge that matches costs to revenues in the same currency.",
        },
        {
          kind: "text",
          md: "A framework needs four things the board can hold someone to: a stated **risk appetite** with limits expressed in numbers; an **owner** for each material exposure; a **reporting line** with a frequency; and an **escalation rule** for breaches. Recommending 'a robust risk management framework' without those four is a phrase, not advice.",
        },
        {
          kind: "definition",
          term: "Risk appetite",
          md: "The amount and type of risk an organisation is willing to accept in pursuit of its objectives, expressed in measurable limits — a maximum unhedged exposure, a minimum interest cover, a value-at-risk ceiling — rather than as a sentiment.",
        },
      ],
      check: {
        q: "A conglomerate justifies acquiring an unrelated business on the grounds that it reduces group risk. What is the strongest challenge?",
        options: [
          "Group risk cannot be reduced by acquisition under any circumstances",
          "Shareholders can achieve the same diversification by holding both shares, at lower cost and without paying an acquisition premium — so the benefit accrues to managers, not owners",
          "Diversification increases the group's systematic risk and therefore its cost of capital",
          "Unrelated acquisitions are prohibited by most stock exchange listing rules",
        ],
        correct: 1,
        explain:
          "This is the standard agency challenge: diversification that a shareholder could replicate in a portfolio does not create value, and paying a control premium for it destroys value, while stabilising managers' own undiversified position. Option 0 is too absolute — operational diversification can add value. Option 2 misstates the effect, since combining imperfectly correlated businesses does not raise systematic risk. Option 3 is invented.",
      },
    },
    {
      id: "monitoring",
      heading: "Monitoring that changes decisions",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks the adviser to establish capital investment monitoring and risk management systems. Most organisations already have reports; what they lack is a mechanism that turns a report into a decision. Post-completion audit is the examinable instrument, and its value is almost entirely in what it does to *future* appraisals.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The investment control cycle",
            data: {
              steps: [
                { label: "Appraise" },
                { label: "Authorise with conditions" },
                { label: "Monitor against the case" },
                { label: "Post-completion audit" },
                { label: "Feed back into assumptions" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "bullet",
          title: "What makes a post-completion audit worth doing",
          items: [
            "It compares outturn against the **original** case, not against a revised budget that has absorbed the overruns",
            "It separates forecasting error from execution failure, because the two need different corrective action",
            "It is applied to a sample, not to everything, so the cost stays proportionate",
            "It feeds a documented adjustment to future appraisal assumptions — otherwise the same optimism recurs",
            "It is explicitly not a disciplinary process, or the forecasts submitted for approval will simply become more conservative and equally wrong",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Stage gates beat a single approval",
          md: "For large or uncertain projects, recommend releasing funding in tranches against defined milestones. This preserves the option to abandon, which has real value (Area B prices it), and it converts monitoring from a report into a decision point where money can actually be withheld.",
        },
        {
          kind: "text",
          md: "The same logic applies to the treasury side: a risk system that reports exposures monthly to a committee with no authority to act is documentation. Recommend limits that trigger action automatically, and reporting that reaches whoever can change the position within a timeframe short enough to matter.",
        },
      ],
      check: {
        q: "What is the principal argument for post-completion audits, given that the money has already been spent?",
        options: [
          "They allow the original investment decision to be reversed",
          "They improve the quality of future appraisals by exposing systematic forecasting bias, and they deter optimistic bidding for capital",
          "They are required by international accounting standards",
          "They convert sunk costs into relevant costs for the next decision",
        ],
        correct: 1,
        explain:
          "The spend is sunk, so the value is entirely forward-looking: correcting the assumptions used in future cases and changing the incentives of the people who prepare them. Option 0 is impossible for a completed project, option 2 is untrue, and option 3 misstates a basic principle — sunk costs remain irrelevant however they are audited.",
      },
    },
  ],
  examTraps: [
    { trap: "Hedging without saying which exposure is being hedged.", fix: "Name it — transaction, translation or economic — because only the first is straightforwardly hedgeable with financial instruments." },
    { trap: "Listing every risk category in the syllabus.", fix: "Select the exposures material to this decision and rank them by what could make the decision wrong." },
    { trap: "Recommending 'a robust framework'.", fix: "Specify appetite in numbers, an owner, a reporting frequency and an escalation rule." },
    { trap: "Defending corporate diversification as risk reduction for shareholders.", fix: "Show what it does that a shareholder's own portfolio cannot." },
  ],
  keyTerms: [
    { term: "Economic exposure", def: "The effect of long-run exchange rate or interest rate movements on an organisation's competitive position and the present value of its future cash flows." },
    { term: "Post-completion audit", def: "A structured comparison of a completed project's outturn against its original approved case, used to correct future appraisal assumptions." },
    { term: "Stage gate", def: "A funding release point at which a project must meet defined milestones before further capital is committed, preserving the option to abandon." },
    { term: "Basis risk", def: "The residual risk that a hedging instrument's price does not move exactly in line with the exposure it is hedging." },
  ],
  summary: [
    "Answer 'why hedge at all?' before hedging: the case rests on distress costs, protecting investment and debt capacity.",
    "Map exposures to the scenario and rank by what could invalidate the decision, not by size.",
    "Mitigation, hedging and diversification solve different problems and cost different things.",
    "Monitoring only counts if it can change a decision — stage gates and fed-back post-completion findings.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a forward contract not fix economic exposure?", a: "Economic exposure is a structural loss of competitiveness across all future cash flows, not a dated contracted amount, so it needs operational responses such as relocating costs or changing invoicing currency." },
    { q: "What four elements make a risk framework advisable rather than decorative?", a: "A numerical risk appetite, a named owner per exposure, a reporting line with a frequency, and an escalation rule for breaches." },
    { q: "Why must a post-completion audit compare against the original case?", a: "Comparing against a revised budget hides the forecasting error, which is the very thing the audit exists to feed back into future appraisals." },
  ],
  furtherStudy: [
    "AFM-01 sets the adviser's remit that this risk framework is recommended within.",
    "Area E provides the instruments — forwards, futures, options and swaps — and the treasury function that operates them.",
    "Area B prices the option to abandon that stage-gating preserves.",
  ],
}

const AFM_TREE_04: StudyChapter = {
  paper: "AFM",
  id: "AFM-04",
  number: 4,
  area: "A",
  syllabusRefs: ["A2(h)"],
  title: "Behavioural finance and the limits of rational pricing",
  minutes: 14,
  intro:
    "Every valuation model in this paper assumes prices are rational. This chapter is the syllabus admitting they are not, and asking what an adviser should do about it.",
  outcomes: [
    "State what each form of market efficiency actually claims, and what follows for the adviser if it holds",
    "Identify the biases behavioural finance documents, and connect each to a specific financial decision",
    "Explain why mispricing can persist despite the presence of rational arbitrageurs",
    "Advise a board whose share price appears to diverge from the value its own forecasts support",
    "Use behavioural arguments to challenge management assertions without abandoning the valuation evidence",
  ],
  sections: [
    {
      id: "efficiency",
      heading: "What efficiency claims, and why it matters here",
      blocks: [
        {
          kind: "text",
          md: "Market efficiency is the assumption doing silent work throughout AFM. If the share price impounds all public information, then the price is the best available estimate of value, a rights issue is fairly priced, and there is no point timing an issue or a bid. Each conclusion the board wants to reach about market timing depends on the efficiency claim being false.",
        },
        {
          kind: "table",
          caption: "The three forms and their consequences",
          head: ["Form", "Prices reflect", "If true, then"],
          rows: [
            ["Weak", "All past price and volume information", "Technical analysis cannot generate abnormal returns"],
            ["Semi-strong", "All publicly available information", "Fundamental analysis of published data cannot beat the market; announcements move prices immediately"],
            ["Strong", "All information, public and private", "Even insiders cannot systematically profit — which the existence of insider dealing regulation implicitly denies"],
          ],
        },
        {
          kind: "text",
          md: "The evidence is broadly consistent with semi-strong efficiency most of the time, with well-documented exceptions. That is the position to take in an answer: prices are usually a reasonable guide, they respond fast to news, and they nonetheless display anomalies — momentum, over-reaction to dramatic news, under-reaction to earnings surprises, and periods where whole sectors detach from any defensible fundamental value.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The adviser's honest formulation",
          md: "'The market is efficient enough that we should not assume we can outguess it, and inefficient enough that we should not accept the current price as proof our own analysis is wrong.' Both halves earn marks; committing to either extreme loses the other half.",
        },
      ],
      check: {
        q: "A finance director claims the group's shares are undervalued because the price has not risen despite three years of profit growth that was announced each year. Which form of efficiency does this claim contradict, and is it credible?",
        options: [
          "Weak form; it is credible because past prices should predict future ones",
          "Semi-strong form; it is a weak claim, because the growth was publicly announced and should already be in the price — unless the market disbelieves its sustainability",
          "Strong form; it is credible because only insiders know the true position",
          "No form is contradicted, since profit growth is not price-sensitive information",
        ],
        correct: 1,
        explain:
          "Announced results are public information, so under semi-strong efficiency they are already reflected. The useful response is not to dismiss the director but to reframe: the market may be pricing in doubts about whether the growth is sustainable, or a rising discount rate. Option 0 misassigns the form, option 2 is irrelevant since the information is public, and option 3 is plainly false.",
      },
    },
    {
      id: "biases",
      heading: "The biases, tied to the decisions they distort",
      blocks: [
        {
          kind: "text",
          md: "Behavioural finance is only examinable at AFM as applied evidence. A list of biases scores poorly; a bias named against the specific decision it is distorting in the scenario scores well. These are the ones that recur.",
        },
        {
          kind: "table",
          caption: "Bias, mechanism, and the AFM decision it corrupts",
          head: ["Bias", "What it does", "Where it shows up in this paper"],
          rows: [
            ["Overconfidence", "Overstates the precision of one's own forecasts", "Narrow sensitivity ranges; acquirers convinced of synergies they have not tested"],
            ["Anchoring", "Fixes on an initial number and adjusts insufficiently", "A target's 52-week high becoming the reference point for the offer price"],
            ["Loss aversion", "Losses hurt more than equivalent gains please", "Refusing to abandon a failing project; holding a losing hedge position"],
            ["Herding", "Following the crowd rather than the evidence", "Sector-wide acquisition waves and the valuations that accompany them"],
            ["Confirmation bias", "Seeks evidence supporting the preferred conclusion", "Due diligence that verifies the deal case instead of trying to break it"],
            ["Availability", "Overweights recent or vivid events", "Over-hedging a risk that just caused a loss, while ignoring a larger unhedged one"],
            ["Representativeness", "Reads a pattern into too small a sample", "Extrapolating three good years into a permanent growth rate in a valuation"],
          ],
        },
        {
          kind: "illustration",
          title: "The winner's curse, assembled from biases",
          md: "In a competitive auction for a target, the winning bidder is by construction the one with the most optimistic valuation. Overconfidence supplies the optimism, anchoring on a rumoured price sets the range, herding supplies the urgency once rivals appear, and confirmation bias means the due diligence returns comfortable answers. The result is systematic overpayment — which is exactly why the syllabus asks candidates to discuss the frequent failure of acquisitions to deliver expected value, with overvaluation named as a cause.",
        },
        {
          kind: "text",
          md: "Note the mechanism that lets mispricing survive: **limits to arbitrage**. Even a rational investor who knows an asset is mispriced may be unable to correct it, because shorting is costly and risky, because the mispricing can widen before it narrows, and because a fund manager whose position moves against them may lose their capital before being proved right. Efficiency requires not only that someone knows better, but that they can afford to act on it for long enough.",
        },
      ],
      check: {
        q: "A board refuses to abandon a project that is running badly, arguing that $40m has already been spent and abandoning it now would waste that investment. Which bias is operating, and what is the correct analysis?",
        options: [
          "Herding; the correct analysis is to follow what competitors do with similar projects",
          "Loss aversion driving sunk-cost reasoning; the $40m is irrecoverable and irrelevant — the decision is whether the remaining spend earns a positive net present value from here",
          "Anchoring; the correct analysis is to re-anchor on the original budget",
          "Availability; the correct analysis is to weight recent performance more heavily",
        ],
        correct: 1,
        explain:
          "Framing the choice as protecting a past loss is the sunk-cost fallacy, sustained by loss aversion — abandoning makes the loss definite and felt, whereas continuing keeps it notional. The only relevant comparison is incremental future cash flows against incremental future costs, plus the value of any real option that continuing preserves. The other three biases are real but are not what this reasoning displays.",
      },
    },
    {
      id: "advising",
      heading: "Advising when the price and your analysis disagree",
      blocks: [
        {
          kind: "text",
          md: "This is the practical requirement AFM sets: the board believes the market has the price wrong, and wants to act on that belief — by buying back shares, by paying in shares rather than cash, by delaying an issue. The adviser's job is neither to endorse the belief nor to dismiss it, but to test it and then say what follows.",
        },
        {
          kind: "list",
          style: "number",
          title: "How to test a claim that the market has it wrong",
          items: [
            "Ask what the market knows that the board is discounting — a legal exposure, a customer concentration, a peer's technology",
            "Check whether the divergence is company-specific or sector-wide, because a sector re-rating is a different phenomenon",
            "Reconstruct the price: what growth rate and discount rate would justify it? If they are not absurd, the market is not obviously wrong",
            "Ask whether the board's own forecast has ever been achieved historically, which is the scepticism mark",
            "Only then consider the action, and size it so that being wrong is survivable",
          ],
        },
        {
          kind: "table",
          caption: "What follows if the board's belief is right",
          head: ["Belief", "Consistent action", "Inconsistent action"],
          rows: [
            ["Our shares are undervalued", "Buy back shares; pay for acquisitions in cash", "Issue new equity; pay in shares"],
            ["Our shares are overvalued", "Issue equity; pay for acquisitions in shares", "Buy back shares"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Watch for the inconsistent pair",
          md: "Scenarios often contain a board asserting undervaluation while proposing a share-for-share offer, or asserting confidence while quietly issuing equity. Naming that inconsistency is a high-value scepticism point — the actions reveal the true belief more reliably than the assertion does.",
        },
        {
          kind: "activity",
          title: "Reconstruct the implied expectation",
          prompt:
            "A company's shares trade at $3.20. The board's own model, using a 9% cost of equity and 4% perpetual growth on a current dividend of $0.16, gives a value of $3.33. Management calls the shares undervalued. What should the adviser say?",
          answer:
            "First, check the arithmetic: 0.16 × 1.04 ÷ (0.09 − 0.04) = 0.1664 ÷ 0.05 = $3.33, so the model is right on its own assumptions. Then observe how small the gap is — about 4% — which is well inside the estimation error of any dividend growth model, since a growth rate of 3.8% instead of 4% brings the value to $3.19. The honest advice is that the market price and the board's own valuation agree to within the precision either can claim, so there is no evidence of mispricing and no basis for a buy-back justified on that ground. This is the scepticism point: the board has taken a difference smaller than its own model's tolerance and treated it as a finding.",
        },
      ],
      check: {
        q: "A board asserts its shares are significantly undervalued and simultaneously proposes to acquire a target using a share-for-share exchange. What should the adviser point out?",
        options: [
          "Nothing — the two positions are unrelated",
          "The proposals are inconsistent: paying in shares the board believes are cheap hands the target's shareholders value the acquirer's own shareholders should keep, so cash would be the consistent choice",
          "Share exchanges are always preferable because they conserve cash",
          "The board should issue new shares first to establish a market price",
        ],
        correct: 1,
        explain:
          "If the shares really are undervalued, using them as currency means paying with an asset worth more than the market credits — the acquirer's shareholders transfer that hidden value away. Consistency is the test: the funding choice should follow from the belief, and where it does not, the belief is worth challenging. Option 2 ignores the cost of the dilution, and option 3 would worsen the problem by issuing undervalued equity.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing biases without attaching each to a decision in the scenario.", fix: "Name the bias, the exhibit that evidences it, and the decision it is distorting." },
    { trap: "Concluding that markets are inefficient and valuation models are therefore useless.", fix: "Hold both: models give the reference value, behavioural evidence explains divergence and sets the confidence interval." },
    { trap: "Accepting a claimed mispricing at face value.", fix: "Reconstruct the growth and discount assumptions the price implies, and test them against history." },
    { trap: "Ignoring a contradiction between what the board says and how it proposes to pay.", fix: "Actions reveal beliefs — flag the inconsistency explicitly." },
  ],
  keyTerms: [
    { term: "Semi-strong efficiency", def: "The proposition that share prices already reflect all publicly available information, so analysis of published data cannot systematically earn abnormal returns." },
    { term: "Limits to arbitrage", def: "The practical constraints — cost of shorting, the risk that mispricing widens, and investors withdrawing capital — that prevent rational traders from correcting a known mispricing." },
    { term: "Sunk cost fallacy", def: "Allowing irrecoverable past expenditure to influence a decision that should depend only on incremental future cash flows." },
    { term: "Winner's curse", def: "The tendency for the successful bidder in a competitive auction to be the one who most overestimated the target's value, and therefore to overpay." },
  ],
  summary: [
    "Efficiency is the silent assumption behind every valuation in this paper; state which form you are relying on.",
    "Biases score marks only when tied to the specific decision they distort in the scenario.",
    "Mispricing persists because arbitrage has limits, not because nobody notices.",
    "Test a claimed mispricing by reconstructing the assumptions the price implies — then check the board's actions match its stated belief.",
  ],
  knowledgeDiagnostic: [
    { q: "What does semi-strong efficiency imply about a company's announced results?", a: "That they are already reflected in the share price, so a claim that good published results are 'not yet recognised' needs a different explanation, such as doubt about sustainability." },
    { q: "Why does knowing an asset is mispriced not guarantee the mispricing is corrected?", a: "Arbitrage has limits — shorting is costly and risky, the gap can widen first, and an investor may lose their capital before being proved right." },
    { q: "What inconsistency should you look for when a board claims its shares are undervalued?", a: "A proposal to pay for an acquisition in shares, or to issue equity — actions that only make sense if the shares are fully or over-valued." },
  ],
  furtherStudy: [
    "AFM-02 covers the signalling consequences of distribution decisions this chapter's efficiency discussion underpins.",
    "Area C returns to overvaluation and the winner's curse as causes of acquisition failure.",
    "ACCA's technical articles on behavioural finance develop the anomalies evidence beyond the syllabus minimum.",
  ],
}

export const AFM_TREE_AREA_A_PART1: StudyChapter[] = [AFM_TREE_01, AFM_TREE_02, AFM_TREE_03, AFM_TREE_04]
