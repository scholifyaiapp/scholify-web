import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area A, part two — the performance hierarchy (A2), financial (A3) and
 * non-financial (A4) performance measurement, and sustainability (A5).
 *
 *   APM-08  Mission cascaded into goals and objectives   (A2a, A2b)
 *   APM-09  Critical success factors and the pyramid     (A2c, A2d)
 *   APM-10  The performance planning gap                 (A2e)
 *   APM-11  Financial performance measures               (A3a, A3b)
 *   APM-12  Liquidity, gearing and divisional measures   (A3c–f)
 *   APM-13  Non-financial performance measurement        (A4)
 *   APM-14  Sustainability and environmental cost        (A5)
 *
 * Split from acca-study-apm-tree-a.ts (APM-01..07) for file size only; the two
 * modules are one syllabus area and the aggregator concatenates them in order.
 *
 * A5 (sustainability) is a full subsection of the RESTRUCTURED syllabus and had
 * no representation in the shim at all. A3(b) names eight specific financial
 * measures and A4 names the non-financial ones, so APM-11 to APM-13 are the
 * paper's measurement core.
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027. See acca-study-apm-tree-a.ts for the note on the shim and
 * on why the originality corpus is the syllabus text alone.
 */

const APM_TREE_08: StudyChapter = {
  paper: "APM",
  id: "APM-08",
  number: 8,
  area: "A",
  syllabusRefs: ["A2(a)", "A2(b)"],
  title: "Mission cascaded into goals and objectives",
  minutes: 15,
  intro:
    "A mission statement is either the top of a measurement chain or a poster in reception. What decides which is whether anything below it changed as a result.",
  outcomes: [
    "Explain how a mission is cascaded into goals and objectives down an organisation",
    "Assess how the content of a mission influences the approach to measurement",
    "Write objectives that can actually be measured and owned",
    "Identify a broken cascade from the evidence in a scenario",
    "Recognise where a mission's wording implies measures the organisation is not taking",
  ],
  sections: [
    {
      id: "the-cascade",
      heading: "The cascade, level by level",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "From purpose to daily action",
            data: {
              levels: [
                { label: "Mission", sub: "Why the organisation exists" },
                { label: "Strategic aims", sub: "What it intends to achieve, in broad terms" },
                { label: "Goals and objectives", sub: "Specific, measurable, owned, time-bound" },
                { label: "Critical success factors", sub: "What must go right for those objectives" },
                { label: "KPIs and targets", sub: "How each factor is measured and judged" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The cascade only works if each level is genuinely derived from the one above. The examinable failure is a **broken cascade**: a mission emphasising something the objectives never mention, or KPIs that could not be traced back to any stated aim. Both are common, and both are visible in the exhibits if you read the mission and the scorecard against each other.",
        },
        {
          kind: "table",
          caption: "What each level should look like",
          head: ["Level", "Test it must pass"],
          rows: [
            ["Mission", "Says why the organisation exists and for whom — not what it does"],
            ["Strategic aims", "Directional and long-horizon, but recognisably derived from the mission"],
            ["Objectives", "Specific, measurable, achievable, relevant and time-bound, with a named owner"],
            ["Critical success factors", "The few things that must go right; if one fails, the objective fails"],
            ["KPIs", "Measurable, timely, and capable of prompting action when they move"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The wording of a mission is evidence",
          md: "A mission mentioning employees, communities or the environment commits the organisation to measuring those things. If the scorecard contains none of them, you have a finding — either the mission is decorative, or the measurement system has not caught up with it. APM scenarios supply mission statements precisely so that you can test them against the measures.",
        },
      ],
      check: {
        q: "A company's mission emphasises 'being the employer of choice in our sector', but its performance reports contain no people measures. What does this indicate?",
        options: [
          "Nothing — mission statements are aspirational and need not be measured",
          "A broken cascade: the mission commits the organisation to something its measurement system does not track, so the commitment cannot be managed, evidenced or held to account",
          "That the mission should be rewritten to match the reports",
          "That employee measures are inherently unmeasurable",
        ],
        correct: 1,
        explain:
          "The point of the cascade is that each level derives from the one above, so an unmeasured commitment is one nobody can be held to. Turnover, retention, engagement and internal promotion rates are all readily measurable, so option 3 is unfounded — and rewriting the mission to match the reports, option 2, would concede that the measures are driving the strategy rather than the reverse.",
      },
    },
    {
      id: "objectives",
      heading: "Writing objectives that can be managed",
      blocks: [
        {
          kind: "text",
          md: "Most published objectives fail as management instruments because they lack one of four things: a **number**, a **date**, an **owner**, or a **baseline**. Without all four, nobody can say whether the objective has been met.",
        },
        {
          kind: "table",
          caption: "The same intention, twice",
          head: ["As usually written", "As it should be"],
          rows: [
            ["Improve customer satisfaction", "Raise the customer satisfaction index from 74 to 82 by December 2027 — owned by the Customer Director"],
            ["Reduce our environmental impact", "Cut scope 1 and 2 emissions 30% against the 2025 baseline by 2030 — owned by the Operations Director"],
            ["Become more efficient", "Reduce cost per unit from $18.40 to $16.50 within eighteen months — owned by the Head of Manufacturing"],
            ["Grow the business", "Increase revenue from the mid-market segment from 12% to 20% of total by 2028 — owned by the Sales Director"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Beware the objective that is really an activity",
          md: "'Implement a new CRM system' is a task, not an objective — it can be completed without improving anything. The objective is the outcome the system is meant to produce: retention, cross-sell rate, response time. When a scenario's objectives are all projects, the organisation is measuring effort rather than effect.",
        },
        {
          kind: "text",
          md: "One further caution the paper rewards: objectives must be **few enough to prioritise**. An organisation with thirty corporate objectives has none, because when they conflict — and they will — nobody knows which yields. Part of cascading well is deciding what the organisation will not pursue.",
        },
      ],
      check: {
        q: "Which of these is a properly formed objective?",
        options: [
          "Deliver world-class customer service",
          "Implement a new customer relationship management system by June",
          "Increase first-contact resolution from 61% to 75% by 31 December 2027, owned by the Head of Service",
          "Consider ways of improving the customer experience",
        ],
        correct: 2,
        explain:
          "Only option 2 carries a baseline, a target, a date and an owner, so it can be judged. Option 0 is directional with nothing to measure; option 1 is an activity that can be completed without improving service; option 3 commits to no outcome at all.",
      },
    },
  ],
  examTraps: [
    { trap: "Accepting a mission statement without testing it against the measures.", fix: "Read the mission and the scorecard together — the gap is usually the finding." },
    { trap: "Writing objectives with no baseline, date or owner.", fix: "All four elements, or nobody can say whether it was met." },
    { trap: "Presenting activities as objectives.", fix: "State the outcome the activity is meant to produce." },
    { trap: "Producing a long list of corporate objectives.", fix: "Few enough to prioritise, because they will conflict." },
  ],
  keyTerms: [
    { term: "Mission", def: "A statement of why an organisation exists and whom it serves, from which strategic aims and objectives should be derived." },
    { term: "Objective", def: "A specific, measurable, time-bound and owned commitment derived from a strategic aim." },
    { term: "Broken cascade", def: "A gap between the levels of the hierarchy, where measures cannot be traced to objectives or a stated commitment is not measured at all." },
  ],
  summary: [
    "The hierarchy runs mission, aims, objectives, critical success factors, KPIs — each derived from the one above.",
    "A mission's wording commits the organisation to measuring what it mentions.",
    "An objective needs a baseline, a number, a date and an owner.",
    "Activities are not objectives, and too many objectives are the same as none.",
  ],
  knowledgeDiagnostic: [
    { q: "How do you detect a broken cascade?", a: "Read the mission against the measurement set — a commitment that appears in one and not the other cannot be managed or evidenced." },
    { q: "What four elements does a usable objective need?", a: "A baseline, a target number, a date, and a named owner." },
    { q: "Why is 'implement a new system' a poor objective?", a: "It is an activity that can be completed in full without improving any outcome — the objective is the effect the system is meant to produce." },
  ],
  furtherStudy: [
    "APM-09 takes the next level down: critical success factors and the KPIs derived from them.",
    "APM-01 covers the measurement-versus-management distinction this cascade depends on.",
    "APM-14 covers sustainability commitments, which missions increasingly contain and reports often omit.",
  ],
}

const APM_TREE_09: StudyChapter = {
  paper: "APM",
  id: "APM-09",
  number: 9,
  area: "A",
  syllabusRefs: ["A2(c)", "A2(d)"],
  title: "Critical success factors and the performance pyramid",
  minutes: 16,
  intro:
    "The step where strategy becomes measurable. Get the critical success factors wrong and every KPI below them measures the wrong thing precisely.",
  outcomes: [
    "Apply critical success factor analysis to derive KPIs from an objective",
    "Distinguish a critical success factor from an objective and from a KPI",
    "Test whether a proposed KPI would actually change behaviour usefully",
    "Apply Lynch and Cross's performance pyramid to link strategy and operations",
    "Explain how the pyramid connects external effectiveness with internal efficiency",
  ],
  sections: [
    {
      id: "csf-kpi",
      heading: "From objective to critical success factor to KPI",
      blocks: [
        {
          kind: "text",
          md: "A **critical success factor** is something that must go right for an objective to be achieved. A **key performance indicator** is how you measure whether it is going right. The distinction matters because organisations routinely jump from objective straight to KPI, and end up measuring whatever is easiest to count.",
        },
        {
          kind: "example",
          title: "Working the chain through",
          scenario:
            "A specialist food manufacturer's objective is to raise revenue from supermarket own-brand contracts from 15% to 30% of turnover within three years.",
          steps: [
            { label: "Identify the CSFs", detail: "Winning supermarket contracts requires: passing their technical audits; reliable delivery performance; competitive cost per unit at high volume; and enough capacity to bid." },
            { label: "Test each", detail: "If any one fails, the objective fails — so all four are genuinely critical rather than merely desirable." },
            { label: "Derive KPIs", detail: "Audit pass rate first time; on-time in-full delivery percentage; cost per unit against the contract benchmark; percentage of capacity uncommitted." },
            { label: "Set targets and owners", detail: "Each KPI gets a current baseline, a target, a review frequency and a named owner." },
          ],
          result:
            "Four measures traceable to the objective, each of which someone can actually influence — as against the usual outcome, which is that the company measures total revenue monthly and hopes.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two tests for a proposed KPI",
          md: "**Can someone influence it?** If not, it is context rather than a performance measure. **Would a movement change what anyone does?** If the answer is no, it is a statistic. A measure failing either test is contributing to overload without contributing to management — which is Area C's subject, and Area C is guaranteed 25 marks every sitting.",
        },
        {
          kind: "text",
          md: "The other discipline is **selectivity**. Critical means critical: if a list of critical success factors runs past five or six, they are not all critical and the organisation has not decided what matters. Forcing that decision is much of the value of the exercise.",
        },
      ],
      check: {
        q: "Which of the following is a critical success factor rather than an objective or a KPI?",
        options: [
          "Increase market share from 8% to 12% by 2028",
          "Maintaining the technical accreditation that customers require before they will buy",
          "Percentage of orders delivered in full and on time",
          "Achieve a 15% return on capital employed",
        ],
        correct: 1,
        explain:
          "A critical success factor is a condition that must hold for objectives to be achievable — losing the accreditation ends the sales regardless of everything else. Options 0 and 3 are objectives with numbers and dates; option 2 is a KPI, the measure of a factor rather than the factor itself.",
      },
    },
    {
      id: "pyramid",
      heading: "Lynch and Cross's performance pyramid",
      blocks: [
        {
          kind: "text",
          md: "The performance pyramid links strategy to operations by cascading objectives **downward** and aggregating measures **upward**, on two sides: an external, market-facing side and an internal, efficiency-facing side. Its contribution is showing that every operational measure should trace to one or the other.",
        },
        {
          kind: "table",
          caption: "The levels",
          head: ["Level", "Concern", "External side", "Internal side"],
          rows: [
            ["1 — Corporate", "The vision", "—", "—"],
            ["2 — Business units", "Objectives", "Market position", "Financial results"],
            ["3 — Business operating systems", "Cross-functional", "Customer satisfaction", "Productivity, with flexibility spanning both"],
            ["4 — Departments and work centres", "Day to day", "Quality, delivery", "Cycle time, waste"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Flexibility sits in the middle deliberately",
          md: "It is the one dimension serving both sides at once: flexibility improves customer satisfaction (responsiveness to what they want) **and** productivity (ability to switch without losing time). When a scenario asks what links the two halves of a business, flexibility is usually the answer the model is pointing at.",
        },
        {
          kind: "text",
          md: "The pyramid's strengths are that it insists every measure connects to the vision, and that it balances external effectiveness against internal efficiency explicitly. Its weaknesses are the standard ones: it says nothing about how to resolve conflicts between the two sides, it can become elaborate, and — like the balanced scorecard — it identifies what to measure without addressing whether the culture will let those measures be honest.",
        },
      ],
      check: {
        q: "In Lynch and Cross's performance pyramid, why is flexibility placed so that it spans both the external and internal sides?",
        options: [
          "Because it is the least important dimension",
          "Because it serves both at once — flexibility improves responsiveness to customers and also improves productivity by allowing changeover without lost time",
          "Because it cannot be measured",
          "Because it belongs only at the departmental level",
        ],
        correct: 1,
        explain:
          "Flexibility is the hinge between market effectiveness and internal efficiency, which is why the model gives it that position. Recognising the structural point — that one dimension can serve both sides — is what the model contributes beyond a list of measures.",
      },
    },
  ],
  examTraps: [
    { trap: "Jumping from objective straight to KPI.", fix: "Identify the critical success factors first, or you will measure what is easy to count." },
    { trap: "Producing ten or more critical success factors.", fix: "If everything is critical, nothing has been prioritised." },
    { trap: "Proposing KPIs nobody can influence.", fix: "Apply both tests: can it be influenced, and would a movement change anyone's actions?" },
    { trap: "Describing the pyramid's levels without using it.", fix: "Trace the scenario's measures onto the external and internal sides and find what is missing." },
  ],
  keyTerms: [
    { term: "Critical success factor", def: "A condition that must be met for an objective to be achievable — if it fails, the objective fails." },
    { term: "Key performance indicator", def: "A measure of whether a critical success factor is being achieved, capable of being influenced and of prompting action." },
    { term: "Performance pyramid", def: "Lynch and Cross's model cascading objectives down and measures up, balancing external market effectiveness against internal efficiency." },
  ],
  summary: [
    "Objective, then critical success factors, then KPIs — skipping the middle step measures the wrong things.",
    "Critical means critical: five or six at most, or nothing has been prioritised.",
    "A KPI must be influenceable and must change someone's actions when it moves.",
    "The pyramid balances external effectiveness with internal efficiency, joined by flexibility.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between a critical success factor and a KPI?", a: "The factor is the condition that must hold; the KPI is the measure that tells you whether it is holding." },
    { q: "What two tests should a proposed KPI pass?", a: "Someone must be able to influence it, and a movement in it must change what someone does." },
    { q: "Why does flexibility span both sides of the performance pyramid?", a: "It improves customer responsiveness on the external side and productivity on the internal side simultaneously." },
  ],
  furtherStudy: [
    "APM-08 covers the objectives these factors are derived from.",
    "APM-04 covers the balanced scorecard, the alternative framework for the same problem.",
    "Area C covers how many measures a report can carry before it stops being usable.",
  ],
}

const APM_TREE_10: StudyChapter = {
  paper: "APM",
  id: "APM-10",
  number: 10,
  area: "A",
  syllabusRefs: ["A2(e)"],
  title: "The performance planning gap",
  minutes: 14,
  intro:
    "The distance between where current plans will take you and where you said you wanted to be. Naming it is easy; the examinable skill is choosing credibly between the ways of closing it.",
  outcomes: [
    "Explain what the planning gap is and how it is quantified",
    "Distinguish the projection of current activities from the target position",
    "Evaluate the strategies available for closing a gap",
    "Assess each option against the organisation's capability, risk appetite and time available",
    "Recognise when the honest recommendation is to revise the objective",
  ],
  sections: [
    {
      id: "the-gap",
      heading: "Quantifying the gap",
      blocks: [
        {
          kind: "text",
          md: "The gap is the difference between the **forecast** outcome of continuing as now — including the natural decline of existing products and markets — and the **target** set in the objectives. Quantifying it honestly is the first step, and the step organisations most often fudge, because a forecast that shows current plans falling well short is unwelcome.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "bars",
            title: "Revenue in 2030: target against forecast ($m)",
            data: {
              unit: "$m",
              items: [
                { label: "Target", value: 480 },
                { label: "Existing business, forecast", value: 310 },
                { label: "The gap", value: 170 },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The baseline must include decline",
          md: "The projection is not last year's revenue held flat. Products mature, contracts end, competitors enter and prices erode. A baseline that assumes today's performance continues indefinitely **understates the gap**, often substantially — and an organisation that has understated its gap will under-invest in closing it.",
        },
      ],
      check: {
        q: "A company projects its existing business flat at current revenue and calculates a gap of $60m against its target. Why might this be misleading?",
        options: [
          "It is not — flat is the most neutral assumption available",
          "The baseline should reflect the natural decline of existing products and contracts as they mature and competitors enter, so the real gap is likely to be materially larger than $60m",
          "Targets should always be set equal to the current position",
          "Gaps cannot be quantified in revenue terms",
        ],
        correct: 1,
        explain:
          "Flat is not neutral; it is optimistic, because it assumes no product matures, no contract ends and no competitor acts. Understating the gap leads directly to under-investing in closing it, which is why the honest baseline matters more than the arithmetic that follows.",
      },
    },
    {
      id: "closing",
      heading: "Closing the gap",
      blocks: [
        {
          kind: "table",
          caption: "The options, in rising order of risk",
          head: ["Strategy", "What it involves", "Risk", "Speed"],
          rows: [
            ["Efficiency improvement", "Cost reduction and productivity from existing operations", "Lowest", "Fast but limited — the gap is usually larger than efficiency can close"],
            ["Market penetration", "Sell more of existing products to existing markets", "Low", "Moderate; bounded by market size and share"],
            ["Product development", "New products into existing markets", "Moderate", "Slow — development lead times"],
            ["Market development", "Existing products into new markets or segments", "Moderate", "Moderate; needs channel and local knowledge"],
            ["Diversification", "New products into new markets", "Highest", "Slow, and the most common source of value destruction"],
            ["Acquisition", "Buy the revenue or capability", "High, and expensive", "Immediate — which is what the premium buys"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Match the option to the gap's size and the time available",
          md: "A gap of 5% closes through efficiency and penetration. A gap of 50% within three years cannot — the arithmetic does not permit it, and recommending 'improved efficiency and better marketing' for a gap that size is the answer the examiner is waiting to penalise. Large gaps on short timescales imply acquisition or a strategic change, and if neither is feasible then the honest recommendation is that **the objective is not achievable and should be revised**.",
        },
        {
          kind: "activity",
          title: "Recommend, with the arithmetic",
          prompt:
            "A company targets $480m of revenue by 2030. Its existing business is forecast at $310m, declining about 3% a year thereafter. It has moderate cash, no acquisition experience, and its market is growing at 2%. What do you recommend?",
          answer:
            "First, that the gap is bigger than it looks: $170m against a base of $310m is 55% of the current business, and since the base is declining at 3% a year the required growth from new sources is larger still. That immediately rules out the comfortable answers - efficiency and better marketing cannot produce 55% growth in a market growing at 2%, and saying so plainly is the first useful thing the board will hear. The realistic options are therefore product development, market development, or acquisition, and probably a combination. Given the company has cash but no acquisition experience, I would be cautious about recommending acquisition as the primary route: it is the only option fast enough to close a gap this size, but it is also where the value destruction in this paper's scenarios usually comes from, and an inexperienced acquirer paying a premium for a business it cannot integrate will widen the gap rather than close it. So my recommendation would be a staged one: pursue product and market development as the core, since they build on capability the company already has, and quantify how much of the gap they can realistically close - if that is $80m, then the residual $90m is the acquisition question, and it should be taken as a separate decision with proper diligence rather than as a way of hitting a number. If neither route can bridge the remainder, the honest advice is that the 2030 target is not achievable and should be revised, because a target the organisation privately knows it cannot reach corrupts every plan and forecast beneath it.",
        },
      ],
      check: {
        q: "A company faces a planning gap equal to 40% of current revenue over three years, in a market growing at 2%. Which recommendation is defensible?",
        options: [
          "Improved efficiency and a stronger marketing effort",
          "A structural change — significant product or market development, or acquisition — because organic growth in a 2% market cannot arithmetically close a 40% gap in three years, and if none is feasible the target should be revised",
          "Reducing costs to improve margins",
          "Extending the target date indefinitely without changing the plan",
        ],
        correct: 1,
        explain:
          "The arithmetic constrains the answer: incremental measures cannot produce that scale of growth in that market within that time. Recognising when a gap exceeds what organic improvement can deliver — and being willing to say the target needs revising — is the judgement the requirement is testing.",
      },
    },
  ],
  examTraps: [
    { trap: "Projecting the existing business flat.", fix: "Include the natural decline of maturing products and ending contracts, or the gap is understated." },
    { trap: "Recommending efficiency and marketing for a large gap.", fix: "Check the arithmetic against the market growth rate and the time available." },
    { trap: "Treating acquisition as an easy answer.", fix: "It is immediate but expensive and risky, especially for an inexperienced acquirer." },
    { trap: "Never questioning the target.", fix: "If no feasible combination closes the gap, the objective itself should be revised." },
  ],
  keyTerms: [
    { term: "Planning gap", def: "The difference between the forecast outcome of current activities and the target set in the organisation's objectives." },
    { term: "Market penetration", def: "Growth by selling more existing products into existing markets — low risk, but bounded by market size and achievable share." },
    { term: "Diversification", def: "Growth through new products in new markets — the highest-risk gap-closing strategy and the most common source of value destruction." },
  ],
  summary: [
    "The gap is target minus a realistic forecast, and the forecast must include decline.",
    "Options run from efficiency to diversification in rising order of risk.",
    "Match the option to the gap's size and the time available — arithmetic constrains what is possible.",
    "Where nothing feasible closes it, recommend revising the objective.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a flat baseline understate the planning gap?", a: "It assumes no product matures, no contract ends and no competitor acts, so the forecast of the existing business is optimistic." },
    { q: "What should you check before recommending organic growth to close a gap?", a: "Whether the required growth is arithmetically achievable given the market's growth rate and the time available." },
    { q: "When is revising the objective the right recommendation?", a: "When no feasible combination of strategies can close the gap, since a target known to be unreachable corrupts every plan beneath it." },
  ],
  furtherStudy: [
    "APM-08 covers the objectives that set the target the gap is measured against.",
    "Area B covers value chain analysis, one route to the efficiency improvements considered here.",
    "Area B covers alliances and joint ventures, an alternative to outright acquisition.",
  ],
}

const APM_TREE_11: StudyChapter = {
  paper: "APM",
  id: "APM-11",
  number: 11,
  area: "A",
  syllabusRefs: ["A3(a)", "A3(b)"],
  title: "Financial performance measures",
  minutes: 20,
  intro:
    "Eight measures named in one learning outcome. Each one is easy to compute, and each one can be improved by a manager doing something the organisation would rather they did not.",
  outcomes: [
    "Calculate and interpret the financial measures the syllabus names",
    "Explain why shareholder concern is the primary financial objective",
    "Say what behaviour each measure encourages, including the perverse behaviour",
    "Compute EVA with its standard adjustments and explain what it corrects",
    "Choose a measure appropriate to the decision and the manager being judged",
  ],
  sections: [
    {
      id: "profit-return",
      heading: "Profit and return measures",
      blocks: [
        {
          kind: "text",
          md: "The syllabus opens by asking why financial performance should be judged, first of all, by what it delivers to shareholders. The defensible answer is that they are the residual claimants — everyone else is paid before them, so a return reaching shareholders means every prior claim has already been met — and that they bear the risk making the enterprise possible. It is a reference point, and Area A's stakeholder work supplies the constraints on how it may be pursued.",
        },
        {
          kind: "table",
          caption: "The measures, and the behaviour each produces",
          head: ["Measure", "Definition", "Encourages", "Perverse behaviour"],
          rows: [
            ["Gross profit", "Revenue less cost of sales", "Margin discipline on production and buying", "Reclassifying costs below the gross line"],
            ["Operating profit", "Profit before interest and tax", "Control of the whole trading operation", "Cutting discretionary spend — training, marketing, maintenance"],
            ["ROCE", "Operating profit ÷ capital employed", "Efficient use of the asset base", "Deferring capital expenditure; sale and leaseback"],
            ["ROI", "Divisional profit ÷ divisional net assets", "Divisional asset efficiency", "Rejecting good projects that dilute the current percentage"],
            ["EPS", "Profit after tax ÷ shares in issue", "Growth in earnings per share", "Buy-backs and debt-funded acquisitions that add no value"],
            ["TSR", "(Price change + dividend) ÷ opening price", "Total shareholder outcome", "Reflects market sentiment more than management action over short periods"],
            ["EBITDA", "Earnings before interest, tax, depreciation and amortisation", "Comparison of operating cash generation", "Ignores the capital the business consumes — flatters asset-heavy firms"],
            ["RI", "Divisional profit less an imputed capital charge", "Accepting all projects above the cost of capital", "Absolute figure, so it favours large divisions in comparisons"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "EBITDA is the one to challenge",
          md: "It is popular because it strips out financing and accounting policy differences, which makes companies comparable. But depreciation is not a notional charge — it stands for assets the business genuinely consumes and will have to replace. For a capital-intensive business EBITDA can look healthy indefinitely while the asset base decays. Where a scenario leads on EBITDA, ask what capital expenditure it requires to stand still.",
        },
      ],
      check: {
        q: "A divisional manager measured on ROI rejects a project offering a 14% return when the company's cost of capital is 10%. Why, and what does it show?",
        options: [
          "The project must be riskier than the division's existing operations",
          "The division's current ROI must exceed 14%, so accepting the project would dilute the manager's own measure even though it creates value for the company — the classic dysfunctional consequence of ROI",
          "The manager has calculated the return incorrectly",
          "ROI and cost of capital are not comparable measures",
        ],
        correct: 1,
        explain:
          "A manager on, say, 18% ROI who accepts a 14% project sees their average fall, so a rational manager declines a project the company should want. Residual income avoids this by charging for capital in absolute terms — any project earning above the charge increases RI, so the manager's interest and the company's coincide.",
      },
    },
    {
      id: "ri-eva",
      heading: "Residual income and EVA",
      blocks: [
        {
          kind: "formula",
          name: "Residual income",
          expr: "RI = divisional profit − (capital employed × cost of capital)",
          note:
            "The capital charge converts a percentage comparison into an absolute one. Any project returning more than the cost of capital raises RI, so the ROI dysfunction disappears — at the cost that a large division will always show a bigger RI than a small one, so it cannot be used to rank divisions of different sizes.",
        },
        {
          kind: "text",
          md: "**Economic value added** takes residual income further by correcting the accounting figures so they better reflect economic reality. The two standard families of adjustment are the ones to know.",
        },
        {
          kind: "table",
          caption: "EVA's main adjustments",
          head: ["Adjustment", "Treatment", "Why"],
          rows: [
            ["Research, development and marketing", "Capitalise and amortise rather than expensing", "They build future value, so expensing them punishes investment in the year it is made"],
            ["Goodwill written off", "Add back to capital employed", "The capital was genuinely invested, so the division should be charged for it"],
            ["Non-cash provisions", "Add back", "They reduce accounting profit without any economic outflow"],
            ["Operating leases", "Capitalise where not already on balance sheet", "They are a financing decision, not an operating one"],
            ["Interest", "Use NOPAT — profit after tax but before interest", "The cost of finance is captured in the capital charge instead, so counting it twice must be avoided"],
          ],
        },
        {
          kind: "formula",
          name: "Economic value added",
          expr: "EVA = NOPAT − (adjusted capital employed × WACC)",
          note:
            "NOPAT is net operating profit after tax. Two disciplines: adjust the capital base consistently with the profit figure, and use the WACC rather than the cost of equity, because the charge is for all the capital employed.",
        },
        {
          kind: "example",
          title: "Computing EVA",
          scenario:
            "A division reports operating profit of $24m. Interest is $3m, tax is 25% of profit after interest. Capital employed is $120m. Research spend of $6m was expensed this year and should be capitalised over three years; a non-cash provision of $2m was charged. WACC is 9%.",
          steps: [
            { label: "Start from operating profit", detail: "$24m, which is already before interest." },
            { label: "Add back the adjustments", detail: "24 + 6 (research capitalised) + 2 (non-cash provision) = $32m, less this year's research amortisation of 6 ÷ 3 = 2, giving $30m." },
            { label: "Tax", detail: "Tax actually paid is (24 − 3) × 25% = $5.25m. NOPAT = 30 − 5.25 = $24.75m." },
            { label: "Adjusted capital", detail: "120 + 6 (research now an asset) + 2 (provision added back) = $128m." },
            { label: "Capital charge and EVA", detail: "128 × 9% = $11.52m. EVA = 24.75 − 11.52 = $13.23m." },
          ],
          result:
            "Positive EVA means the division earned more than the cost of all the capital it used. Note the research treatment: expensing it would have depressed both profit and the capital base, flattering the return while discouraging the investment.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "What EVA is actually for",
          md: "Its purpose is to stop managers being punished for investing. Under conventional profit measures, research, development, marketing and training all reduce this year's result, so a manager judged annually has every reason to cut them — the short-termism problem from APM-01. Capitalising them removes that incentive, which is why EVA is presented as a **behavioural** fix as much as a measurement one.",
        },
      ],
      check: {
        q: "Why does EVA use net operating profit after tax rather than profit after interest?",
        options: [
          "Because interest is not a real cost",
          "Because the cost of all finance is charged separately through the capital charge — deducting interest as well would count the cost of debt twice",
          "Because tax is not deductible against interest",
          "Because EVA ignores how a division is financed",
        ],
        correct: 1,
        explain:
          "The capital charge applies the WACC to the whole capital base, and the WACC already includes the cost of debt. Deducting interest from the profit figure too would penalise the division twice for the same finance — a common error that makes EVA look worse than it is.",
      },
    },
  ],
  examTraps: [
    { trap: "Computing measures without saying what behaviour they produce.", fix: "Every financial measure in APM needs its perverse-incentive comment." },
    { trap: "Using ROI to judge a manager who cannot control the asset base.", fix: "Check the responsibility centre type first." },
    { trap: "Deducting interest as well as applying the EVA capital charge.", fix: "The WACC already includes the cost of debt — use NOPAT." },
    { trap: "Accepting EBITDA as a measure of performance.", fix: "Ask what capital expenditure the business needs simply to stand still." },
  ],
  keyTerms: [
    { term: "Residual income", def: "Divisional profit less a charge for the capital employed, removing the ROI incentive to reject value-adding projects." },
    { term: "Economic value added", def: "Net operating profit after tax, adjusted toward economic reality, less a charge for adjusted capital employed at the WACC." },
    { term: "NOPAT", def: "Net operating profit after tax — profit before interest but after tax, used so the cost of debt is not counted twice." },
    { term: "EBITDA", def: "Earnings before interest, tax, depreciation and amortisation — comparable across firms but blind to the capital the business consumes." },
  ],
  summary: [
    "Shareholders are the residual claimants, which is why their return is the reference objective.",
    "Every measure produces behaviour; ROI's is to reject good projects that dilute the percentage.",
    "Residual income fixes that with an absolute capital charge, but cannot rank divisions of different sizes.",
    "EVA adjusts toward economic reality mainly to stop investment being punished.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does ROI cause managers to reject value-adding projects?", a: "A project returning more than the cost of capital but less than the division's current ROI reduces the manager's measured performance." },
    { q: "Why does EVA capitalise research and marketing?", a: "So that investing in the future does not reduce the current year's result, removing the incentive to cut it." },
    { q: "What does EBITDA conceal?", a: "The capital the business consumes and must replace — it can look healthy for years while the asset base decays." },
  ],
  furtherStudy: [
    "APM-12 covers liquidity, gearing and the divisional application of these measures.",
    "APM-01 covers the short-termism that EVA's adjustments are designed to counter.",
    "Area B covers the reward schemes these measures usually feed.",
  ],
}

const APM_TREE_12: StudyChapter = {
  paper: "APM",
  id: "APM-12",
  number: 12,
  area: "A",
  syllabusRefs: ["A3(c)", "A3(d)", "A3(e)", "A3(f)"],
  title: "Liquidity, gearing and divisional performance",
  minutes: 17,
  intro:
    "Profitability alone has never yet stopped a company running out of cash. And in a divisionalised group there are two performances to judge, not one — the division's and the manager's.",
  outcomes: [
    "Explain why liquidity and gearing must be read alongside profitability",
    "Distinguish financial from operational gearing and say what each implies",
    "Assess which benchmarks are appropriate for comparing performance",
    "Evaluate the measures suited to a divisionalised structure",
    "Separate managerial performance from divisional performance, and say why it matters",
  ],
  sections: [
    {
      id: "liquidity-gearing",
      heading: "Reading profitability alongside liquidity and gearing",
      blocks: [
        {
          kind: "text",
          md: "A profitable company fails when it cannot pay what falls due. Profit is an accounting measure containing credit sales, accruals and judgements; **cash** is not. So the syllabus insists that indicators of liquidity and gearing are considered in conjunction with profitability, and the classic scenario is a fast-growing, profitable business that has overtraded.",
        },
        {
          kind: "table",
          caption: "Two kinds of gearing",
          head: ["", "Financial gearing", "Operational gearing"],
          rows: [
            ["Arises from", "Debt in the capital structure", "Fixed costs in the cost structure"],
            ["Measured by", "Debt ÷ equity; interest cover", "Contribution ÷ operating profit"],
            ["Amplifies", "Profit changes into bigger changes in earnings for shareholders", "Revenue changes into bigger changes in operating profit"],
            ["Danger", "Fixed interest must be paid in a downturn", "Fixed costs continue when volume falls"],
            ["Combined effect", "The two multiply — high operational and high financial gearing together is the most fragile position there is", ""],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The combination is the finding",
          md: "A company with a high fixed-cost base **and** substantial debt has two amplifiers in series: a modest fall in revenue produces a large fall in operating profit, which produces a very large fall in earnings. Identifying that combination in a scenario, and quantifying what a 10% revenue fall would do, is worth more than any number of individually computed ratios.",
        },
        {
          kind: "text",
          md: "On **benchmarks**, the syllabus asks which are appropriate for comparison. The candidates are prior periods (shows direction, but not whether the level is good), budget (shows control, but the budget may have been undemanding), competitors (relevant, but definitions and mix differ), industry averages (broad context, but averages conceal), and best-in-class (ambitious, but may be unattainable given the organisation's scale or structure). Say which you are using and why — a ratio without a stated comparator is not an analysis.",
        },
      ],
      check: {
        q: "A company has high operational gearing and high financial gearing. Why is this combination particularly dangerous?",
        options: [
          "It is not — the two offset each other",
          "They amplify in series: a fall in revenue produces a proportionately larger fall in operating profit because fixed costs continue, and that fall is magnified again into earnings because interest must still be paid",
          "Only financial gearing matters to lenders",
          "Operational gearing affects only manufacturing companies",
        ],
        correct: 1,
        explain:
          "Each form of gearing multiplies the effect of a change in the level below it, so together they compound. This is why a modest revenue shortfall can move a business from comfortable profitability to a covenant breach in a single period, and why the combination deserves explicit comment rather than two separate ratio calculations.",
      },
    },
    {
      id: "divisional",
      heading: "Divisional performance and managerial performance",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks why a manager and the division they run should be measured **separately**, and it is one of the most useful distinctions in the paper. The two assessments answer different questions.",
        },
        {
          kind: "table",
          caption: "Two questions, two measures",
          head: ["", "Divisional performance", "Managerial performance"],
          rows: [
            ["Question answered", "Should the group keep this division?", "Is this manager doing a good job?"],
            ["Includes", "All revenues, costs and assets of the division", "Only what the manager controls"],
            ["Excludes", "Nothing attributable to the division", "Head office allocations, centrally set prices, uncontrollable market effects"],
            ["Used for", "Investment, divestment and resource allocation", "Appraisal, reward, development"],
            ["Getting it wrong", "Divesting a division that is fine because its manager is weak", "Punishing a good manager running a structurally weak division"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two errors, stated plainly",
          md: "Judge the **manager** on divisional performance and you punish someone for a declining market they did not create. Judge the **division** on managerial performance and you keep a business that should be sold because its manager is impressive. Scenarios routinely present one figure being used for both purposes — say which decision is being taken, and which measure it needs.",
        },
        {
          kind: "text",
          md: "The practical mechanism is the **controllable profit** line: a divisional statement that reports controllable profit first, then deducts uncontrollable allocations to reach total divisional profit. The manager is appraised on the first line and the investment decision is taken on the second, from the same statement — which is why the presentation of divisional reporting is itself an examinable recommendation.",
        },
        {
          kind: "activity",
          title: "Advise on a divisional judgement",
          prompt:
            "A division reports a $2m loss after a $3m head office allocation and a transfer price set centrally that is above market. Its manager has improved market share and cut controllable costs 8%. The board is considering closure. What do you advise?",
          answer:
            "That the board is about to take a divestment decision using the wrong number, and that two separate figures are needed before it decides anything. On managerial performance, the manager is performing well: market share up and controllable costs down 8% are both within their control and both moving the right way, so the reported loss says very little about them. On divisional performance, the $2m loss is not the relevant figure either, because it contains a $3m head office allocation and an above-market transfer price - neither of which represents cash the group would save by closing the division. The allocation is largely fixed central cost that would simply be reapportioned to the remaining divisions, and the inflated transfer price is moving profit to another part of the same group, so at group level it nets to nothing. Restating on a relevant-cash basis, the division is probably contributing rather than consuming, and closure could leave the group worse off while making the surviving divisions look worse as they absorb the reallocated overhead. My recommendation would be to prepare a closure appraisal on incremental group cash flows only - what revenue is genuinely lost, what costs genuinely cease - and separately to correct the transfer price to a market basis so that future reporting is not misleading. The manager's appraisal should be on the controllable profit line, and on that basis it is a good year.",
        },
      ],
      check: {
        q: "A divisional manager's bonus is based on divisional profit after an apportioned head office charge. What is the objection?",
        options: [
          "Head office costs should never be apportioned to divisions",
          "The charge is outside the manager's control, so it distorts the appraisal — the manager should be judged on controllable profit, with the apportionment shown separately for the group's own investment decisions",
          "Bonuses should not be based on profit at all",
          "The apportionment should be increased to reflect true cost",
        ],
        correct: 1,
        explain:
          "The apportionment is legitimate for assessing whether the group as a whole benefits from the division, but it is not something the manager influences, so including it in their appraisal breaches the controllability principle. The fix is presentational: report controllable profit first, then the allocations, and use each line for its own purpose.",
      },
    },
  ],
  examTraps: [
    { trap: "Assessing profitability without liquidity.", fix: "A profitable business can still fail on cash — check working capital and cover." },
    { trap: "Reporting the two gearings separately without combining them.", fix: "They multiply; quantify what a revenue fall does through both." },
    { trap: "Using one figure for both the manager and the division.", fix: "Say which decision is being taken, then choose the measure that fits it." },
    { trap: "Comparing ratios with no stated benchmark.", fix: "Name the comparator — prior period, budget, competitor, industry or best in class — and its weakness." },
  ],
  keyTerms: [
    { term: "Operational gearing", def: "The proportion of fixed costs in the cost structure, which amplifies the effect of revenue changes on operating profit." },
    { term: "Controllable profit", def: "The divisional result after only those items the manager can influence, used for managerial appraisal." },
    { term: "Overtrading", def: "Expanding activity beyond the working capital available to support it, so a profitable business runs out of cash." },
  ],
  summary: [
    "Profit is an accounting figure; liquidity determines survival — read them together.",
    "Financial and operational gearing amplify in series, and the combination is the finding.",
    "Divisional performance and managerial performance answer different questions and need different measures.",
    "Report controllable profit first, then allocations, so one statement serves both purposes.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between operational and financial gearing?", a: "Operational gearing comes from fixed costs and amplifies revenue changes into operating profit; financial gearing comes from debt and amplifies profit changes into shareholder earnings." },
    { q: "Why should a manager not be judged on apportioned head office costs?", a: "They are uncontrollable, so including them measures something other than the manager's performance and undermines the credibility of the appraisal." },
    { q: "What decision does divisional performance inform?", a: "Whether the group should keep, invest in or divest the division — as distinct from how the manager is performing." },
  ],
  furtherStudy: [
    "APM-11 covers the measures themselves and their behavioural consequences.",
    "APM-07 covers responsibility centres and the controllability principle applied here.",
    "APM-05 covers benchmarking, the source of the comparators this chapter requires.",
  ],
}

const APM_TREE_13: StudyChapter = {
  paper: "APM",
  id: "APM-13",
  number: 13,
  area: "A",
  syllabusRefs: ["A4(a)", "A4(b)", "A4(c)", "A4(d)"],
  title: "Non-financial performance measurement",
  minutes: 17,
  intro:
    "The measures that tell you what next year's financial results will look like. They are harder to collect, easier to manipulate, and the reason a balanced scorecard exists at all.",
  outcomes: [
    "Assess how non-financial indicators interact with financial ones",
    "Identify significant non-financial measures for employees and for quality",
    "Assess the difficulties of recording, processing and interpreting qualitative data",
    "Assess the significance of brand awareness and loyalty for performance",
    "Recommend a set of non-financial measures that will not simply be gamed",
  ],
  sections: [
    {
      id: "interaction",
      heading: "How the two kinds of measure interact",
      blocks: [
        {
          kind: "text",
          md: "The relationship is one of **timing**. Non-financial indicators generally lead; financial results follow. Customer satisfaction falls, then retention falls, then revenue falls — often several periods later. So a company watching only financial measures discovers its problems at the point when they have already cost money and become expensive to reverse.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The lag between the two",
            data: {
              steps: [
                { label: "Quality slips", sub: "Detectable now — defect rates, complaints" },
                { label: "Satisfaction falls", sub: "Next quarter — survey and service data" },
                { label: "Retention falls", sub: "Following year — churn, repeat purchase" },
                { label: "Revenue falls", sub: "Finally visible in the financial statements" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The measures the syllabus names",
          head: ["Area", "Measures", "What they warn of"],
          rows: [
            ["Customer", "Satisfaction scores, repeat business rate, customer loyalty, net promoter score", "Revenue decline before it appears"],
            ["Service access", "Availability, response and resolution times, access measures", "Churn among customers who never complain"],
            ["Quality", "Defect rates, returns, warranty claims, first-time-right", "Warranty cost, reputational damage, lost repeat business"],
            ["Employees", "Turnover, absenteeism, engagement, training days, internal promotion rate", "Capability loss, recruitment cost, service decline"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Net promoter score, briefly",
          md: "It asks how likely a customer is to recommend the organisation, on a 0–10 scale, and subtracts the percentage of detractors (0–6) from promoters (9–10). Its virtue is that it measures advocacy rather than mere satisfaction — a customer can be satisfied and indifferent. Its weakness is that a single number conceals which segment moved, and that it is easily gamed by choosing when and whom to ask.",
        },
      ],
      check: {
        q: "A company's financial results are strong but its customer satisfaction and staff turnover measures have both deteriorated for three consecutive quarters. What should be concluded?",
        options: [
          "The financial results show the business is performing well, so the other measures can be discounted",
          "The non-financial measures are leading indicators — they are warning that the financial results will deteriorate, probably with a lag of several periods, and there is still time to intervene",
          "The non-financial measures must be inaccurate",
          "Staff turnover has no relationship to financial performance",
        ],
        correct: 1,
        explain:
          "The whole reason for tracking these measures is that they move first. Strong current financial results describe decisions taken some time ago; deteriorating satisfaction and turnover describe what is being built now. The window for cheap intervention is exactly this period, which closes once the revenue falls.",
      },
    },
    {
      id: "difficulties",
      heading: "The difficulty with qualitative data",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks specifically about the difficulties of **recording, processing and interpreting** qualitative data, and it is worth taking each in turn because the answer differs.",
        },
        {
          kind: "table",
          caption: "Three distinct problems",
          head: ["Stage", "The difficulty", "What can be done"],
          rows: [
            ["Recording", "Opinions must be converted into numbers; scales are arbitrary and respondents interpret them differently", "Consistent instrument, adequate sample, independent collection"],
            ["Processing", "Averaging a satisfaction score destroys information — a 3 from everyone differs entirely from half 1s and half 5s", "Report distribution and segment, not just the mean"],
            ["Interpreting", "No natural benchmark: is 7.4 good? And the score moves for reasons unrelated to performance", "Track the trend, compare externally, and read alongside behavioural data"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Prefer behaviour to opinion where you can get it",
          md: "A satisfaction survey records what customers **say**; retention, repeat purchase and referral record what they **do**. Behavioural data is harder to game, needs no response rate, and is usually already in the transaction system. When recommending non-financial measures, lead with the behavioural ones and use survey data to explain them rather than to replace them.",
        },
        {
          kind: "text",
          md: "The manipulation risk deserves naming because APM examines it directly. Non-financial measures are frequently self-reported and rarely audited, so where a bonus depends on them, expect selective sampling, timing of surveys after a good service event, pressure on customers to score highly, and redefinition of the measure. The counters are independent collection, consistent definitions with an owner, and — most effective — using measures drawn from systems rather than from people.",
        },
      ],
      check: {
        q: "Why is customer retention often a better measure than a customer satisfaction survey?",
        options: [
          "Retention is a financial measure and therefore more reliable",
          "It records what customers actually did rather than what they said, so it needs no response rate, is far harder to manipulate, and is usually already available in the transaction data",
          "Satisfaction surveys are prohibited under data protection rules",
          "Retention is easier to improve",
        ],
        correct: 1,
        explain:
          "Behavioural evidence sidesteps the recording problems entirely — no scale, no sample bias, no response rate — and it is much harder to game than a survey whose timing and audience can be chosen. Retention is not a financial measure, so option 0 misdescribes it.",
      },
    },
    {
      id: "brand",
      heading: "Brand awareness and loyalty",
      blocks: [
        {
          kind: "text",
          md: "A brand is an asset that mostly does not appear on the balance sheet, and its condition is measured almost entirely non-financially. The syllabus asks for the significance of **awareness** and **loyalty** — they are different things, and confusing them produces the wrong marketing recommendation.",
        },
        {
          kind: "table",
          caption: "Awareness against loyalty",
          head: ["", "Brand awareness", "Brand loyalty"],
          rows: [
            ["Question", "Do people know we exist?", "Do those who know us keep choosing us?"],
            ["Measured by", "Prompted and unprompted recall, share of search, reach", "Repeat purchase rate, share of customer wallet, retention, willingness to pay a premium"],
            ["Low value means", "The problem is at the top of the funnel — marketing and distribution", "The problem is the product or experience — awareness spending will make it worse by exposing more people to it"],
            ["Financial consequence", "Constrains the customer base", "Determines margin, price resilience and cost of acquisition"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "High awareness with low loyalty is a warning, not a success",
          md: "It means the organisation is efficient at attracting people who then leave. Spending more on awareness accelerates the leak. The recommendation is to fix the retention problem first and quantify what it is costing — acquisition cost divided by average customer lifetime is a figure that makes the point to a board immediately.",
        },
        {
          kind: "text",
          md: "Loyalty also has a direct financial consequence worth stating: a loyal customer costs nothing to reacquire, buys more over time, is less price-sensitive and recommends others. That is why the syllabus places brand alongside the financial measures rather than treating it as a marketing matter — the effect runs straight through to margin and to the cost of growth.",
        },
      ],
      check: {
        q: "A company has very high brand awareness but low repeat purchase rates. What does this indicate, and what should be recommended?",
        options: [
          "Success — high awareness is the primary marketing objective",
          "That the company is efficiently attracting customers who then do not return, so the problem is the product or experience — spending more on awareness would accelerate the loss, and retention should be addressed first",
          "That awareness should be increased further to compensate for the low retention",
          "That the brand should be relaunched under a new name",
        ],
        correct: 1,
        explain:
          "Awareness gets people to try; loyalty keeps them. High awareness with low repeat purchase means the proposition is failing after trial, and additional awareness spending simply exposes more people to a disappointing experience while acquisition costs mount. Fix the cause, then market.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating non-financial measures as secondary.", fix: "They lead the financial ones — that is the whole reason to track them." },
    { trap: "Reporting a mean satisfaction score.", fix: "Show the distribution and segments; an average conceals polarised experience." },
    { trap: "Recommending survey measures where behavioural data exists.", fix: "Retention and repeat purchase are harder to game and already in the system." },
    { trap: "Reading high awareness as success.", fix: "Check loyalty — high awareness with low retention means the acquisition spend is leaking away." },
  ],
  keyTerms: [
    { term: "Net promoter score", def: "The percentage of promoters less the percentage of detractors on a 0–10 recommendation scale, measuring advocacy rather than satisfaction." },
    { term: "Brand awareness", def: "The extent to which potential customers recognise or recall the brand — a constraint on the size of the customer base." },
    { term: "Brand loyalty", def: "The tendency of existing customers to keep choosing the brand, driving margin, price resilience and the cost of growth." },
    { term: "Behavioural measure", def: "An indicator based on what customers did rather than what they reported, and therefore much harder to manipulate." },
  ],
  summary: [
    "Non-financial measures lead; financial results follow with a lag of several periods.",
    "Recording, processing and interpreting qualitative data are three separate problems.",
    "Prefer behavioural evidence to opinion, especially where a bonus depends on the measure.",
    "Awareness and loyalty are different; high awareness with low loyalty is a leak, not a success.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do non-financial measures give an organisation time to act?", a: "They move before the financial consequences arrive, so a decline is visible while it is still cheap to reverse." },
    { q: "What is wrong with reporting a mean satisfaction score?", a: "It conceals the distribution — uniform mediocrity and a polarised split of delighted and angry customers produce the same average and need opposite responses." },
    { q: "What does high awareness combined with low loyalty tell you?", a: "The organisation attracts customers efficiently and then loses them, so further awareness spending accelerates the loss rather than fixing it." },
  ],
  furtherStudy: [
    "APM-04 covers the balanced scorecard, which exists to give these measures equal standing.",
    "Area B covers service businesses, where non-financial quality measures dominate.",
    "Area B covers why linking reward to self-reported measures invites manipulation.",
  ],
}

const APM_TREE_14: StudyChapter = {
  paper: "APM",
  id: "APM-14",
  number: 14,
  area: "A",
  syllabusRefs: ["A5(a)", "A5(b)", "A5(c)"],
  title: "Sustainability and environmental cost",
  minutes: 17,
  intro:
    "A full subsection of the restructured syllabus, and one the previous content did not cover at all. It is examined as a measurement problem: what do you track, and what is the cost you cannot currently see?",
  outcomes: [
    "Evaluate how sustainability issues influence strategic goals and their translation into objectives",
    "Evaluate how sustainability objectives change targets, measurement and reporting",
    "Explain integrated reporting and the three Ps",
    "Analyse costs within the four environmental cost categories",
    "Recommend action from an environmental cost analysis",
  ],
  sections: [
    {
      id: "goals-to-measures",
      heading: "From sustainability goals to measures",
      blocks: [
        {
          kind: "text",
          md: "Sustainability enters performance management the same way any other strategic priority does — through the cascade. A goal becomes an objective with a number and a date, which becomes a critical success factor, which becomes a KPI with an owner. What makes it distinctive is that the measures are frequently **absent** from existing systems, so the organisation is committed to something it cannot yet report.",
        },
        {
          kind: "table",
          caption: "What changes when sustainability objectives are adopted",
          head: ["Element", "Before", "After"],
          rows: [
            ["Targets", "Financial and operational", "Add emissions, waste, water, resource intensity, social measures"],
            ["Horizon", "Annual budget cycle", "Long — 2030 and 2050 commitments, needing interim milestones"],
            ["Measurement", "Financial systems", "New data collection, often from operations and the supply chain"],
            ["Assurance", "Statutory audit of financial statements", "Independent assurance of sustainability data becomes expected"],
            ["Reporting", "Financial statements", "Integrated report connecting financial and non-financial performance"],
            ["Trade-offs", "Between divisions or periods", "Between profit and environmental or social outcomes, explicitly"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Integrated reporting and the three Ps",
          md: "**Integrated reporting** presents financial and non-financial performance together, showing how the organisation creates value over time across the resources it depends on. The **three Ps** — people, planet, profit, the triple bottom line — is the simpler framing: an organisation is accountable on three dimensions, not one. Both exist to stop environmental and social performance being reported in a separate document nobody reads alongside the accounts.",
        },
        {
          kind: "text",
          md: "The trade-off point is where the examinable judgement lies. A sustainability objective will sometimes conflict with a financial one, and the honest answer says which is being prioritised and at what cost — not that the two happily coincide. Where they genuinely do coincide, say why: energy reduction cuts cost as well as emissions, and waste reduction is often the cheapest quality improvement available.",
        },
      ],
      check: {
        q: "A company adopts a 2035 emissions target but its management reporting cycle is annual and financial. What is the practical problem?",
        options: [
          "None — a long-term target does not require monitoring",
          "A commitment more than a decade out with no interim milestones and no measurement in the reporting cycle cannot be managed: nobody is accountable in any given year, so it will not influence decisions until it is too late to meet",
          "The target should be abandoned as unmeasurable",
          "Emissions cannot be measured at organisational level",
        ],
        correct: 1,
        explain:
          "A distant target with no interim measures is the classic broken cascade from APM-08 — nothing below the commitment changed, so no decision in any current year is influenced by it. The fix is interim milestones, a place in the regular reporting cycle, and a named owner.",
      },
    },
    {
      id: "environmental-costs",
      heading: "The four environmental cost categories",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks for analysis within four named categories, interpretation of the result, and a recommendation. The categories matter because the last three are usually invisible in the accounts — which is precisely why environmental cost is systematically understated.",
        },
        {
          kind: "table",
          caption: "The four categories",
          head: ["Category", "What it covers", "Where it hides"],
          rows: [
            ["Conventional", "Costs already recorded — energy, water, materials, waste disposal fees", "Visible, but often buried in general overhead rather than traced"],
            ["Hidden", "Costs incurred but absorbed into overhead — compliance, monitoring, permits, training, reporting", "Aggregated into administration, so no product or process carries them"],
            ["Contingent", "Costs that may arise — remediation, clean-up, fines, future regulation", "Not recorded at all until they crystallise; probability-weighted at best"],
            ["Reputational", "Costs from stakeholder perception — lost customers, harder recruitment, higher cost of capital, licence difficulty", "Never in the ledger, sometimes the largest of the four"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why the analysis changes decisions",
          md: "A process assessed only on conventional cost looks cheaper than it is, so the organisation keeps choosing it. Tracing hidden costs to the products that cause them — an activity-based approach — routinely reveals that a small number of processes generate most of the environmental cost, and that some apparently profitable products are not. That reallocation is the finding the requirement is looking for.",
        },
        {
          kind: "example",
          title: "Reading an environmental cost analysis",
          scenario:
            "A manufacturer's analysis shows conventional environmental costs of $2.1m, hidden costs of $1.4m absorbed in overhead, contingent remediation estimated at $6m with a 25% probability, and a reputational exposure management cannot quantify. One product line generates 70% of the hazardous waste.",
          steps: [
            { label: "Total the quantifiable", detail: "2.1 + 1.4 + (6 × 0.25) = $5.0m — more than double the $2.1m currently visible." },
            { label: "Trace it", detail: "70% of the hazardous waste comes from one line, so most of that $5.0m belongs to that product rather than to general overhead." },
            { label: "Re-assess the product", detail: "Recompute that line's profitability carrying its own environmental cost; it may no longer be viable." },
            { label: "Recommend", detail: "Process change or substitution for that line; trace hidden costs to products routinely; and put the contingent liability in front of the board with its probability stated." },
          ],
          result:
            "The analysis moves environmental cost from a general overhead nobody owns to a specific product decision somebody can take — which is what makes it management information rather than reporting.",
        },
      ],
      check: {
        q: "Which environmental cost category is most likely to be the largest and least likely to appear in any management report?",
        options: [
          "Conventional costs, since energy prices are volatile",
          "Reputational costs — lost customers, recruitment difficulty, a higher cost of capital and problems obtaining licences — which never enter the ledger and are rarely quantified at all",
          "Hidden costs, since they are absorbed in overhead",
          "Contingent costs, since they are disclosed as provisions",
        ],
        correct: 1,
        explain:
          "Reputational cost is both the hardest to quantify and potentially the most damaging, because it affects revenue, recruitment, financing and the licence to operate simultaneously. Hidden costs are at least recorded somewhere, and contingent costs get some recognition once they become probable — reputational cost typically appears nowhere until it materialises.",
      },
    },
  ],
  examTraps: [
    { trap: "Adopting sustainability goals without interim measures.", fix: "A 2035 target with no milestone in the reporting cycle influences no current decision." },
    { trap: "Claiming sustainability and profit always align.", fix: "Name the trade-off and say which is prioritised; where they do align, say why." },
    { trap: "Counting only conventional environmental costs.", fix: "Hidden, contingent and reputational costs are usually larger and are invisible in the accounts." },
    { trap: "Leaving environmental cost in general overhead.", fix: "Trace it to the products and processes causing it, then reassess their profitability." },
  ],
  keyTerms: [
    { term: "Integrated reporting", def: "Reporting that presents financial and non-financial performance together, showing how value is created over time across the resources the organisation depends on." },
    { term: "Triple bottom line", def: "Accountability on three dimensions — people, planet and profit — rather than financial results alone." },
    { term: "Contingent environmental cost", def: "A cost that may arise in future, such as remediation or fines, recorded at best as a probability-weighted estimate." },
    { term: "Reputational environmental cost", def: "The commercial consequence of stakeholder perception — lost customers, recruitment difficulty, higher cost of capital — which never enters the ledger." },
  ],
  summary: [
    "Sustainability enters through the same cascade as any priority, but the measures usually do not yet exist.",
    "Integrated reporting and the three Ps exist to stop non-financial performance being reported separately and ignored.",
    "Four cost categories: conventional, hidden, contingent and reputational — the last three are invisible.",
    "Trace environmental cost to the products causing it, then reassess whether they are actually profitable.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a long-dated sustainability target often change nothing?", a: "Without interim milestones, a place in the regular reporting cycle and a named owner, no decision in any current year is affected by it." },
    { q: "Name the four environmental cost categories.", a: "Conventional, hidden, contingent and reputational — with only the first reliably visible in the accounts." },
    { q: "What does tracing hidden environmental costs typically reveal?", a: "That a small number of processes or products generate most of the environmental cost, and that some apparently profitable lines are not profitable once they carry it." },
  ],
  furtherStudy: [
    "APM-08 covers the cascade that sustainability goals have to pass through to become manageable.",
    "Area B covers activity-based costing, the mechanism for tracing hidden costs to products.",
    "Area C covers reporting, where integrated reporting is examined as a presentation question.",
  ],
}

export const APM_TREE_AREA_A_PART2: StudyChapter[] = [APM_TREE_08, APM_TREE_09, APM_TREE_10, APM_TREE_11, APM_TREE_12, APM_TREE_13, APM_TREE_14]
