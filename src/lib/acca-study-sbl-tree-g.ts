import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area G — Finance in planning and decision-making.
 *
 * The legacy Area G chapter was one of the three the shim did NOT fake — it was
 * genuinely authored, and it was 2 sections and 183 words. Kaplan's equivalent is
 * the biggest chapter in its text at 76 pages, which is why this area gets four.
 *
 *   SBL-30  Finance transformation and the finance function   (G1)
 *   SBL-31  Investment requirements and sources of finance    (G2a, G2b)
 *   SBL-32  Appraising investments and deciding under risk     (G2c, G2d, G2e)
 *   SBL-33  Performance measurement, KPIs and cost control     (G2f, G3)
 *
 * The syllabus asks for "high level financial techniques from the Applied Skills
 * exams" applied to planning and evaluation. So SBL does NOT re-teach the
 * computations — a candidate arrives having passed FM and MA. What it examines is
 * the advisory layer the earlier papers never test: whether a number can be
 * relied on, what it omits, whether the thing can be funded, and what a board
 * should do about it. Every chapter here is built on that distinction.
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_30: StudyChapter = {
  paper: "SBL",
  id: "SBL-30",
  number: 30,
  area: "G",
  syllabusRefs: ["G1(a)", "G1(b)"],
  title: "Finance transformation and the finance function",
  minutes: 16,
  intro:
    "The finance function is being reshaped by technology, and SBL asks whether a particular reshaping is a good idea. The question is never whether automation is possible — it is what the function is for once the processing has gone.",
  outcomes: [
    "Explain how technology is changing what a finance function does and how it is organised",
    "Weigh the ways a finance function can be organised — embedded partners, a shared centre, a global operating model, or a contracted provider",
    "Advise on a finance restructuring, naming what must be retained in-house and why",
    "Recognise when a transformation programme has automated weak work rather than improved it",
  ],
  sections: [
    {
      id: "what-changes",
      heading: "What technology changes about finance",
      blocks: [
        {
          kind: "text",
          md: "Transaction processing — matching invoices, posting entries, reconciling accounts, chasing approvals — is rule-based, high-volume work, and it is exactly what automation does well. As that work is absorbed, the function's remaining value lies in the things automation cannot do: interpreting what the numbers mean, challenging a business case, designing controls, and advising a decision.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Where finance effort goes",
            data: {
              leftTitle: "Traditional shape",
              rightTitle: "Transformed shape",
              rows: [
                { aspect: "Bulk of effort", left: "Processing and reporting the past", right: "Insight, challenge and decision support" },
                { aspect: "Reporting", left: "Periodic, backward-looking", right: "Continuous, with forward indicators" },
                { aspect: "Skills", left: "Technical accounting and processing", right: "Data, commercial judgement, communication" },
                { aspect: "Structure", left: "Finance teams in each business unit", right: "Shared processing plus embedded partners" },
                { aspect: "Controls", left: "Manual checks and authorisations", right: "Automated, continuous, exception-driven" },
                { aspect: "Risk", left: "Individual error", right: "Systematic error at scale; loss of understanding" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Automating a bad process gives you a faster bad process",
          md: "This is the finding SBL keeps setting up. If a reconciliation is performed badly, automating it produces the same wrong answer more often and with less chance of anyone noticing, because the human who used to see the oddity has gone. So a transformation recommendation must cover **people, process, data and controls together** — and the control redesign is the part programmes routinely omit.",
        },
        {
          kind: "text",
          md: "There is a second, subtler cost worth raising: understanding. When processing is automated or moved away, the incidental knowledge that came from doing it — which customers pay late, which cost codes are misused, which division's accruals are optimistic — disappears with it. That knowledge was never written down and it was often what made the finance team's challenge credible. Recommending how it is preserved, usually through embedded business partners with real access to operations, is what makes a transformation answer complete.",
        },
      ],
      check: {
        q: "A group automates its purchase-to-pay process. Six months later a duplicate-payment error has recurred monthly, undetected. What is the most likely cause?",
        options: [
          "The automation software is defective and should be replaced",
          "Controls were not redesigned for the automated process — the manual checks that would have caught an anomaly were removed with the manual work, so a systematic error now repeats unseen",
          "Staff were insufficiently trained on the new system",
          "The error is immaterial and no action is needed",
        ],
        correct: 1,
        explain:
          "Automation replaces individual errors with systematic ones, and the human who would have noticed something odd has been removed from the process. Redesigning controls for the automated flow — exception reporting, duplicate detection, continuous monitoring — is the step that was skipped.",
      },
    },
    {
      id: "structures",
      heading: "Business partnering, outsourcing and shared services",
      blocks: [
        {
          kind: "table",
          caption: "Four structural options",
          head: ["Structure", "What it is", "Suits", "Costs and risks"],
          rows: [
            ["Business partnering", "Finance people embedded with operating units, advising decisions", "Organisations needing challenge and commercial input close to the business", "Partners can 'go native' and stop challenging; needs strong individuals"],
            ["Shared service centre", "Transactional work consolidated into one internal centre", "Multi-unit groups with repeatable processes", "Distance from the business; rigid service definitions; change is harder"],
            ["Global business services", "Shared services extended across regions and functions, often with a single operating model", "Large international groups seeking standardisation", "Significant change programme; local requirements resist standardisation"],
            ["Outsourcing", "A third party performs the process under contract", "Processes that are standard, measurable and not differentiating", "Loss of knowledge; dependence; exit difficulty; accountability stays"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The retain-or-move test",
          md: "Move work that is **standard, high-volume, rule-based and not differentiating**. Retain work that requires **judgement, business context, or the ability to challenge** — and retain the capability to specify, monitor and if necessary replace whoever does the moved work. An organisation that outsources so completely that it can no longer evaluate its provider has outsourced its own judgement, which is the failure mode to name.",
        },
        {
          kind: "text",
          md: "The most common structure in practice combines them: transactional processing in a shared centre or outsourced, a small technical core for reporting and tax, and business partners embedded with the operating units. Recommending that hybrid, with reasons for each placement, is usually better advised than choosing one model wholesale.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Business partnering fails in a specific, predictable way",
          md: "A partner embedded in an operating unit, attending its meetings and sharing its targets, gradually adopts its perspective and stops being the independent voice they were placed there to be. The safeguards are a reporting line that stays within finance, rotation, and appraisal that explicitly rewards challenge — the same structural logic as internal audit's line in SBL-28.",
        },
      ],
      check: {
        q: "Which finance activity is LEAST suitable for outsourcing?",
        options: [
          "Processing supplier invoices against purchase orders",
          "Preparing statutory financial statements to a defined timetable",
          "Challenging the assumptions in an operating unit's investment business case",
          "Payroll calculation and payment",
          ],
        correct: 2,
        explain:
          "Challenge requires business context, judgement and independence from the unit being challenged — none of which a contracted provider working to a service definition can supply. The other three are standard, measurable and rule-based, which is precisely the retain-or-move test.",
      },
    },
  ],
  examTraps: [
    { trap: "Calling automation 'finance transformation'.", fix: "Transformation covers people, process, data and controls together; automation alone often just accelerates weak work." },
    { trap: "Omitting control redesign from an automation recommendation.", fix: "Individual errors become systematic ones, and the human who would have noticed has been removed." },
    { trap: "Recommending one structure wholesale.", fix: "Apply the retain-or-move test activity by activity; the answer is usually a hybrid." },
    { trap: "Treating business partnering as risk-free.", fix: "Partners drift into the unit's perspective — keep the reporting line in finance and reward challenge." },
  ],
  keyTerms: [
    { term: "Finance transformation", def: "Coordinated redesign of finance people, processes, data, technology and controls to shift effort from processing towards decision support." },
    { term: "Business partnering", def: "Embedding finance staff with operating units to advise and challenge decisions as they are made." },
    { term: "Shared service centre", def: "Transactional processing consolidated into a single internal unit serving the whole organisation." },
    { term: "Global business services", def: "Shared services extended across regions and functions under a common operating model." },
    { term: "Retain-or-move test", def: "Move standard, rule-based, non-differentiating work; retain judgement, business context and the ability to challenge and to evaluate providers." },
  ],
  summary: [
    "Automation absorbs processing, leaving insight, challenge, control design and advice as the function's value.",
    "Automating a weak process produces a faster weak process — redesign the controls.",
    "Moved work takes undocumented knowledge with it; embedded partners are how it is preserved.",
    "Move standard rule-based work; retain judgement and the capability to evaluate providers.",
    "Business partnering fails by capture — protect the reporting line and reward challenge.",
  ],
  knowledgeDiagnostic: [
    { q: "What does finance transformation cover beyond technology?", a: "People and skills, process design, data governance and — most often omitted — redesigned controls." },
    { q: "Why does automation change the control problem?", a: "It removes individual errors and introduces systematic ones repeated at scale, while removing the person who would have noticed an anomaly." },
    { q: "State the retain-or-move test.", a: "Move standard, high-volume, rule-based, non-differentiating work; retain judgement, business context, challenge, and the capability to specify and evaluate providers." },
    { q: "How does business partnering characteristically fail?", a: "The partner adopts the operating unit's perspective and stops challenging — mitigated by a finance reporting line, rotation and appraisal that rewards challenge." },
  ],
  furtherStudy: [
    "SBL-31 covers funding the investment such programmes need",
    "SBL-33 covers the performance information a transformed function should produce",
    "SBL-24 covers governance of the automation itself",
    "SBL-34 covers organisational structure and shared services more widely",
  ],
}

const SBL_TREE_31: StudyChapter = {
  paper: "SBL",
  id: "SBL-31",
  number: 31,
  area: "G",
  syllabusRefs: ["G2(a)", "G2(b)"],
  title: "Investment requirements and sources of finance",
  minutes: 18,
  intro:
    "Before appraising a project, work out what it actually needs and whether the organisation can raise it. Cases are frequently built so the strategically right investment is the one the balance sheet cannot currently carry — and that is the advice, not an obstacle.",
  outcomes: [
    "Determine what an organisation's investment programme requires in total, including the parts business cases omit",
    "Assess short- and long-term funding sources against the organisation's position",
    "Advise on a funding mix, using gearing, covenants and cash generation as the constraint",
    "Recognise when a funding decision would breach an obligation or constrain future choices",
  ],
  sections: [
    {
      id: "what-it-really-needs",
      heading: "Determining the total requirement",
      blocks: [
        {
          kind: "text",
          md: "G2(a) asks you to determine the organisation's overall investment requirement, and the value you add is catching what a business case leaves out. A capital request states the purchase price; the organisation's actual cash need is larger, and the omissions are consistent enough to check for.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What business cases routinely omit",
          items: [
            "**Working capital** — extra inventory and receivables to support higher volume, needed before the cash comes back",
            "**Implementation cost** — training, data migration, parallel running, temporary staff, consultants",
            "**Disruption** — reduced output while a change is implemented",
            "**Consequential capital** — the second system the first one requires, the depot the new fleet needs",
            "**Continuing cost** — licences, maintenance, support and the refresh cycle, not just year one",
            "**Contingency** — a realistic allowance, given that comparable projects overran",
            "**Exit or decommissioning** — removing what is replaced, and any obligation attached to it",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Working capital is the omission that causes real damage",
          md: "A growth investment increases inventory and receivables before it increases cash receipts, so a profitable expansion can exhaust liquidity — the classic overtrading failure. If a case gives you a growth plan and a working-capital cycle, calculate roughly what the growth absorbs and compare it with available headroom. That single point is often worth more than the rest of the appraisal.",
        },
        {
          kind: "text",
          md: "Then set the requirement against the organisation's own capacity to generate cash. Operating cash flow, existing committed capital spending, debt repayments falling due and distributions all compete for the same money, and the sum of separately approved projects frequently exceeds what the organisation can fund. Naming that aggregate constraint — and therefore the need to prioritise or phase — is a board-level observation.",
        },
      ],
      check: {
        q: "A retailer's business case for opening 12 stores covers fit-out, equipment and lease premiums. Which omission is most likely to cause a liquidity problem?",
        options: [
          "Depreciation of the new fit-out",
          "Working capital — stock for 12 stores plus higher receivables must be funded before the sales generate cash",
          "The allocation of head office overhead to the new stores",
          "The accounting treatment of the lease premiums",
          ],
        correct: 1,
        explain:
          "Stock has to be bought and shelved before anything sells, so cash goes out ahead of coming in. Depreciation and overhead allocation are non-cash or reallocation items that do not change the funding requirement at all.",
      },
    },
    {
      id: "sources",
      heading: "Sources of finance, and choosing between them",
      blocks: [
        {
          kind: "table",
          caption: "Short-term sources",
          head: ["Source", "Suits", "Caution"],
          rows: [
            ["Overdraft", "Fluctuating working-capital need", "Repayable on demand; expensive if permanently drawn"],
            ["Revolving credit facility", "Predictable seasonal swings", "Commitment fees; covenants apply"],
            ["Trade credit", "Ordinary purchasing", "Not free if discounts are lost; strains supplier relationships"],
            ["Invoice discounting or factoring", "Receivables-heavy businesses needing cash sooner", "Cost; customer relationship effects with factoring"],
            ["Asset finance or leasing", "Specific equipment and vehicles", "Total cost can exceed purchase; contractual commitment"],
          ],
        },
        {
          kind: "table",
          caption: "Long-term sources",
          head: ["Source", "Suits", "Caution"],
          rows: [
            ["Retained earnings", "Incremental investment; no issue cost or dilution", "Limited by profitability; reduces distributions"],
            ["Bank term loan", "Defined asset-backed projects", "Covenants; security; fixed repayment regardless of trading"],
            ["Bond or loan note issue", "Large, long-dated requirements at scale", "Issue cost; disclosure; rating scrutiny"],
            ["Rights issue", "Existing shareholders funding growth without dilution of control", "Cost; signals; requires shareholder appetite"],
            ["New equity or private investor", "Growth beyond existing owners' capacity", "Dilution of control — often decisive in a family firm"],
            ["Venture or development capital", "Higher-risk growth without immediate cash servicing", "Loss of control; investor exit expectations"],
            ["Grants and public funding", "Activity meeting a policy objective", "Conditions, clawback, reporting obligations"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Match the funding term to the asset's life",
          md: "Long-lived assets funded by short-term facilities create refinancing risk: the facility must be renewed repeatedly, and it will be reviewed at the worst possible moment — when trading is poor. Conversely, funding a short-term working-capital swing with long-term debt leaves the organisation paying for money it does not need. A maturity mismatch in a case is a finding you can make immediately and defend easily.",
        },
        {
          kind: "text",
          md: "Beyond term-matching, three tests decide the mix. **Gearing and covenant headroom** — what does existing debt permit, and what would this take the ratios to? **Cash servicing** — can the organisation meet interest and repayment from operating cash in a downside case, not just the base case? **Control** — does equity funding dilute a shareholding that the owners regard as non-negotiable? For an unlisted or family business the third frequently decides the answer regardless of the arithmetic, which is exactly the kind of stakeholder constraint SBL-06 asks you to weigh.",
        },
        {
          kind: "example",
          title: "Advising a funding mix",
          scenario:
            "A family-owned manufacturer needs $18m: $12m for plant with a 15-year life, $4m of additional working capital, and $2m of implementation cost. Gearing is 45% against a covenant limit of 55%; operating cash flow is $6m; the family will not accept dilution below 75% ownership.",
          steps: [
            { label: "Split by term", detail: "The $12m plant is long-lived and suits long-term debt or a lease; the $4m working capital is fluctuating and suits a revolving facility; the $2m implementation cost is one-off and should not be funded long-term." },
            { label: "Test the covenant", detail: "Additional long-term debt must leave headroom under the 55% limit in a downside case, not merely at the base case — otherwise a poor year triggers a breach." },
            { label: "Respect the control constraint", detail: "New external equity is largely closed off; retained earnings and debt therefore have to carry most of it, which may mean phasing." },
            { label: "Recommend", detail: "Asset finance or a term loan for the plant, matched to its life; a revolving facility sized to the working-capital swing; implementation funded from retained cash; and phase the programme if downside covenant headroom is insufficient." },
          ],
          result:
            "The recommendation is driven by asset life, covenant headroom under stress and the family's control constraint — with phasing offered rather than either abandoning the investment or breaching the covenant.",
        },
      ],
      check: {
        q: "A company proposes funding a 20-year infrastructure asset using a two-year revolving credit facility because the interest rate is currently lower. What is the principal objection?",
        options: [
          "Revolving facilities cannot be used for capital expenditure",
          "Maturity mismatch — the facility must be refinanced repeatedly over the asset's life, and it will be reviewed precisely when trading is weakest",
          "The interest rate will certainly rise",
          "Interest on short-term facilities is not deductible",
          ],
        correct: 1,
        explain:
          "The current rate advantage is real and temporary; the refinancing obligation lasts twenty years and recurs on the lender's timetable, not the company's. That is the structural risk, and it crystallises in a downturn when renewal is hardest.",
      },
    },
  ],
  examTraps: [
    { trap: "Accepting a business case's stated cost as the funding requirement.", fix: "Add working capital, implementation, disruption, continuing cost, contingency and decommissioning." },
    { trap: "Appraising projects individually and ignoring the aggregate.", fix: "Separately approved projects often exceed total funding capacity — prioritise or phase." },
    { trap: "Funding long-lived assets with short-term facilities.", fix: "Match funding term to asset life; refinancing gets reviewed when trading is worst." },
    { trap: "Testing covenants against the base case only.", fix: "Test headroom in a downside case — that is when a breach actually happens." },
    { trap: "Recommending equity where control is a stated constraint.", fix: "In family and unlisted businesses dilution may be non-negotiable; phase or use debt and retained cash." },
  ],
  keyTerms: [
    { term: "Overtrading", def: "Growing faster than working capital can be funded, so a profitable expansion exhausts liquidity." },
    { term: "Maturity matching", def: "Aligning the term of funding with the life of the asset it finances, to avoid refinancing risk." },
    { term: "Covenant headroom", def: "The margin between current financial ratios and the limits a lender has imposed." },
    { term: "Rights issue", def: "An offer of new shares to existing shareholders, allowing them to fund growth without diluting their proportionate holding." },
    { term: "Refinancing risk", def: "The risk that funding cannot be renewed, or only on worse terms, when it matures." },
  ],
  summary: [
    "The real requirement exceeds the business case: working capital, implementation, contingency and continuing cost.",
    "Working capital is the omission that causes liquidity failure in profitable growth.",
    "Aggregate the programme against cash generation — the sum often exceeds capacity.",
    "Match funding term to asset life, and test covenants in a downside case.",
    "Control constraints can decide a funding answer regardless of the arithmetic.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a capital business case most commonly omit?", a: "Working capital, implementation and disruption cost, consequential capital, continuing running cost, contingency and decommissioning." },
    { q: "Why can a profitable expansion cause a liquidity crisis?", a: "Inventory and receivables must be funded before the additional sales generate cash — overtrading." },
    { q: "State the maturity-matching principle and the risk it avoids.", a: "Fund an asset over a term matching its life; otherwise refinancing must be obtained repeatedly and will be reviewed when trading is weakest." },
    { q: "Which three tests decide a funding mix?", a: "Gearing and covenant headroom under a downside case, ability to service from operating cash, and the effect on control." },
  ],
  furtherStudy: [
    "SBL-32 covers appraising the investment this funds",
    "SBL-33 covers monitoring whether the benefits arrived",
    "SBL-17 covers acquisition as an alternative use of the same funding",
    "SBL-06 covers the stakeholder constraints funding decisions run into",
  ],
}

const SBL_TREE_32: StudyChapter = {
  paper: "SBL",
  id: "SBL-32",
  number: 32,
  area: "G",
  syllabusRefs: ["G2(c)", "G2(d)", "G2(e)"],
  title: "Appraising investments and deciding under risk",
  minutes: 19,
  intro:
    "SBL does not ask you to compute an NPV from scratch — it gives you one and asks whether the board should believe it. That is a different skill, and it is where most of this area's marks are.",
  outcomes: [
    "Review and justify a decision to proceed with or abandon a competing investment",
    "Challenge the assumptions inside an appraisal, and identify which one the decision hangs on",
    "Justify strategic and operational decisions where risk and uncertainty are material",
    "Say what an investment or strategic choice will do to the reported numbers and to the tax position, in outline",
  ],
  sections: [
    {
      id: "techniques-at-advisory-level",
      heading: "The techniques, and what each conceals",
      blocks: [
        {
          kind: "text",
          md: "You will have met these in FM. What SBL adds is what each measure hides, because a board choosing between projects on a single number is choosing on the basis of whichever distortion that measure carries.",
        },
        {
          kind: "table",
          caption: "Appraisal measures at advisory level",
          head: ["Measure", "What it tells you", "What it conceals"],
          rows: [
            ["Net present value", "Value added in today's money at the chosen discount rate", "Complete dependence on assumed cash flows and the discount rate; says nothing about liquidity or timing risk"],
            ["Internal rate of return", "The return at which the project breaks even", "Scale — a high return on a tiny project; unreliable with irregular cash flows"],
            ["Payback period", "How long capital is exposed", "Everything after payback, including the whole return"],
            ["Accounting rate of return", "Effect on reported profit and return measures", "Timing and the time value of money; uses profit rather than cash"],
            ["Discounted payback", "Exposure period allowing for the cost of capital", "Still ignores value beyond the payback point"],
          ],
        },
        {
          kind: "formula",
          name: "Net present value",
          expr: "NPV = Σ [ CFt ÷ (1 + r)^t ] − initial investment",
          note: "CFt is the cash flow in year t and r the discount rate. In SBL the figures are given; the marks are for questioning them.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "A positive NPV is where the advice starts, not where it ends",
          md: "Before recommending, ask four things. **Are the assumptions credible** — volume, price, cost inflation, timing? **Can it be funded** without breaching a covenant or exhausting liquidity? **Can it be delivered** with the capability the organisation has? **What else changes** — for stakeholders, for reporting, for tax, for risk? A recommendation resting on the NPV alone has skipped everything SBL is examining.",
        },
        {
          kind: "text",
          md: "Where measures conflict — one project has the higher NPV, another the shorter payback — say which should govern and why, rather than presenting both and stopping. NPV is normally the better guide to value creation; payback deserves weight where liquidity is tight, where technological change makes distant cash flows genuinely doubtful, or where political or regulatory uncertainty shortens the reliable horizon.",
        },
      ],
      check: {
        q: "Project A has an NPV of $3.1m and a payback of six years; Project B an NPV of $1.9m and a payback of two years. The company has limited covenant headroom and one major refinancing due in three years. Which is better advised?",
        options: [
          "Project A, because NPV is the theoretically superior measure",
          "Project B — with tight headroom and a refinancing in three years, exposure period and earlier cash generation matter more than the larger but later value",
          "Both, since together they diversify risk",
          "Neither, until the discount rate is recalculated",
          ],
        correct: 1,
        explain:
          "NPV is the better measure of value in the abstract, and abstraction is what the case removes: a refinancing in three years makes cash generation before then decisive, because failing to refinance forecloses every future project including A's remaining value.",
      },
    },
    {
      id: "risk-and-uncertainty",
      heading: "Deciding under risk and uncertainty",
      blocks: [
        {
          kind: "text",
          md: "G2(d) requires decisions that take risk and uncertainty into account. Keep the two apart: **risk** describes outcomes whose likelihood can be estimated, **uncertainty** outcomes where it cannot. Techniques that assign probabilities work for the first and mislead if applied to the second.",
        },
        {
          kind: "table",
          caption: "Techniques, and what each is for",
          head: ["Technique", "What it does", "Use it when"],
          rows: [
            ["Sensitivity analysis", "Varies one assumption to find the point where the decision reverses", "Identifying which single assumption the decision depends on"],
            ["Scenario analysis", "Varies several assumptions together into coherent futures", "Assumptions are linked — a recession moves volume and bad debts together"],
            ["Simulation", "Samples many combinations to produce a distribution of outcomes", "Many interacting variables with estimable ranges"],
            ["Expected values", "Weights outcomes by probability", "Repeatable decisions of survivable size, and probabilities are meaningful"],
            ["Risk-adjusted discount rate", "Raises the rate for a riskier project", "Comparing projects of clearly different risk"],
            ["Real options thinking", "Values the ability to delay, expand or abandon", "The decision can be staged rather than taken once"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Sensitivity analysis is the most useful single tool in SBL",
          md: "It converts a debate about optimism into a specific, checkable statement: *the project breaks even if volume falls 8%*. The board can then judge whether an 8% shortfall is plausible — a question managers can actually answer from experience, unlike whether a twelve-year forecast is realistic. Where a case gives you enough numbers, doing one sensitivity calculation is worth more than commentary on prudence.",
        },
        {
          kind: "text",
          md: "**Real options** deserve a mention because they change recommendations rather than just describing risk. If a project can be piloted, staged with gates, or built with capacity to expand later, its value includes the right to stop or to grow — and an appraisal treating it as an all-or-nothing commitment understates it. In practice the strongest SBL recommendation is often \"approve the first stage, with defined criteria for the second\", which captures the upside while limiting the exposure to the assumptions that are least reliable.",
        },
      ],
      check: {
        q: "A twelve-year project's appraisal assumes 4% annual volume growth throughout. What is the most useful analysis to advise?",
        options: [
          "Recalculate the NPV using a higher discount rate to reflect uncertainty",
          "A sensitivity analysis establishing the growth rate at which the project ceases to add value, so the board can judge whether that shortfall is plausible",
          "Assign probabilities to each possible growth rate and compute an expected NPV",
          "Reject the project, since twelve-year forecasts are unreliable",
          ],
        correct: 1,
        explain:
          "Sensitivity turns an unanswerable question — is 4% for twelve years realistic — into an answerable one: could growth fall below the break-even rate. Raising the discount rate conflates risk with time, and assigning probabilities to a twelve-year growth path invents precision the situation does not support.",
      },
    },
    {
      id: "reporting-and-tax",
      heading: "Reporting and tax consequences",
      blocks: [
        {
          kind: "text",
          md: "G2(e) asks for the broad financial reporting and tax implications of a strategic or investment decision. \"Broad\" is the operative word: SBL wants the consequences a board should be told about, not a technical computation.",
        },
        {
          kind: "table",
          caption: "Consequences worth raising",
          head: ["Decision", "Reporting consequence", "Tax consequence"],
          rows: [
            ["Buying an asset outright", "Asset and depreciation; capital commitment disclosure", "Capital allowances or equivalent relief on the expenditure"],
            ["Leasing rather than buying", "Right-of-use asset and lease liability — gearing rises", "Timing of deductions differs from ownership"],
            ["Debt-funded investment", "Higher gearing; interest reduces profit; covenant ratios move", "Interest generally deductible, subject to restriction rules"],
            ["Acquiring a business", "Goodwill recognised and tested for impairment; consolidation", "Structure affects the tax cost; losses may not transfer"],
            ["Operating in a new country", "Translation exposure; possible segment disclosure", "Local taxes, withholding, transfer pricing, double-tax relief"],
            ["Restructuring or closure", "Provisions once a constructive obligation exists; impairment", "Relief for costs; possible clawback of earlier allowances"],
            ["Capitalising development spending", "Asset rather than expense, improving reported profit", "Deductibility may not follow the accounting treatment"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Watch for the covenant that reporting treatment triggers",
          md: "Accounting consequences can have cash consequences. Bringing leases onto the balance sheet raises gearing, and a gearing covenant measured on reported figures can be breached by a decision that changed no cash flow at all. Checking whether a proposed structure moves a covenanted ratio is a genuinely commercial observation and an easy one to miss.",
        },
        {
          kind: "text",
          md: "On tax, apply the same discipline the exam applies in TX: state the *type* of consequence and its direction rather than computing amounts, since rates and rules vary and change. \"The expenditure should attract capital allowances, reducing the cash cost, though relief is spread over several years rather than matching the outlay\" is the right level. And note the ethical boundary from SBL-03 — a structure may be lawful and still carry reputational and public-interest consequences a board must weigh.",
        },
      ],
      check: {
        q: "A company plans to lease rather than buy equipment, on the basis that this avoids adding debt. What should be raised?",
        options: [
          "Nothing — leasing keeps the commitment off the balance sheet",
          "A lease is generally recognised as a right-of-use asset and a liability, so reported gearing rises; if a gearing covenant is measured on reported figures the decision could breach it despite improving nothing in cash terms",
          "Leasing is always more expensive than purchasing",
          "The company should seek a covenant waiver before deciding",
          ],
        correct: 1,
        explain:
          "The premise is out of date, and the consequence is commercial rather than presentational: the covenant is measured on the reported numbers, so a financing choice made to protect gearing can be the thing that breaches it.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending on the basis of a positive NPV alone.", fix: "Test assumptions, funding, deliverability and wider consequences before advising." },
    { trap: "Presenting conflicting measures without resolving them.", fix: "Say which should govern here and why — liquidity and horizon reliability can justify payback." },
    { trap: "Assigning probabilities to genuine uncertainty.", fix: "Probability techniques suit estimable risk; use sensitivity and scenarios for uncertainty." },
    { trap: "Treating a project as an all-or-nothing commitment.", fix: "Value the option to pilot, stage or abandon — staged approval with gates is often the best advice." },
    { trap: "Computing tax rather than identifying its direction.", fix: "State the type and direction of the consequence; rates change and are not the point." },
  ],
  keyTerms: [
    { term: "Sensitivity analysis", def: "Varying one assumption to find the value at which the decision reverses." },
    { term: "Risk", def: "Outcomes whose likelihood can be estimated." },
    { term: "Uncertainty", def: "Outcomes whose likelihood cannot meaningfully be estimated." },
    { term: "Real option", def: "The value in being able to delay, stage, expand or abandon an investment rather than committing once." },
    { term: "Risk-adjusted discount rate", def: "A higher rate applied to reflect a project's greater risk." },
    { term: "Constructive obligation", def: "An obligation arising from an entity's actions or announcements rather than a contract, which can trigger a provision." },
  ],
  summary: [
    "SBL gives you the numbers and asks whether to believe them — that is the examined skill.",
    "Each measure conceals something: NPV its assumptions, IRR scale, payback everything after it.",
    "Sensitivity analysis is the most useful tool, because it makes optimism checkable.",
    "Stage decisions where possible; the option to stop or expand has real value.",
    "Reporting treatment can breach a covenant without changing any cash flow.",
  ],
  knowledgeDiagnostic: [
    { q: "What four questions follow a positive NPV before you recommend?", a: "Are the assumptions credible, can it be funded, can it be delivered, and what else changes for stakeholders, reporting, tax and risk." },
    { q: "What does payback conceal, and when does it still deserve weight?", a: "Everything after the payback point, including most of the return — but it matters where liquidity is tight, a refinancing looms, or distant cash flows are genuinely doubtful." },
    { q: "Why is sensitivity analysis so useful in SBL?", a: "It converts an unanswerable question about long-range optimism into a checkable one: how far an assumption can fall before the decision reverses." },
    { q: "Give an example of a reporting consequence with a cash effect.", a: "Recognising a lease raises reported gearing, which can breach a gearing covenant measured on reported figures even though no cash flow changed." },
  ],
  furtherStudy: [
    "SBL-31 covers funding whatever is approved here",
    "SBL-33 covers measuring whether the benefits materialised",
    "SBL-19 covers assessing the risks this appraisal reflects",
    "SBL-39 covers the project governance that delivers an approved investment",
  ],
}

const SBL_TREE_33: StudyChapter = {
  paper: "SBL",
  id: "SBL-33",
  number: 33,
  area: "G",
  syllabusRefs: ["G2(f)", "G3(a)", "G3(b)"],
  title: "Performance measurement, KPIs and cost control",
  minutes: 18,
  intro:
    "Boards act on the measures they are shown, so a badly chosen measure is a strategic problem rather than a reporting one. This chapter is about assessing performance from a case's own figures, and about designing measures that will not be gamed.",
  outcomes: [
    "Assess an organisation's performance and position using appropriate techniques, ratios and indicators",
    "Design key performance indicators that will survive being used, and spot ones that will be gamed",
    "Argue why cost management and control still matter strategically",
    "Weigh forecasting, budgeting, standard costing and variance analysis as aids to strategic planning",
  ],
  sections: [
    {
      id: "assessing-performance",
      heading: "Assessing performance from the case's figures",
      blocks: [
        {
          kind: "text",
          md: "SBL supplies financial information in exhibits and expects analysis that reaches a conclusion a board can use. The technique matters less than the discipline: compare, explain, and connect the numbers to the strategy under discussion.",
        },
        {
          kind: "table",
          caption: "What to look at, and the question each answers",
          head: ["Area", "Indicators", "Question answered"],
          rows: [
            ["Profitability", "Gross and operating margin, return on capital employed", "Is the business model working, and is it improving?"],
            ["Liquidity", "Current ratio, quick ratio, operating cash flow", "Can it meet obligations as they fall due?"],
            ["Working capital", "Inventory, receivable and payable days; the cycle", "Is cash trapped, and is growth affordable?"],
            ["Gearing and cover", "Debt to equity, interest cover, covenant ratios", "Can it carry its debt in a downside case?"],
            ["Efficiency", "Asset turnover, revenue per employee, capacity use", "Is capital and capacity being used?"],
            ["Non-financial", "Retention, complaints, quality, safety, emissions, staff turnover", "Will today's results survive into next year?"],
          ],
        },
        {
          kind: "formula",
          name: "Return on capital employed",
          expr: "ROCE = operating profit ÷ (total assets − current liabilities)",
          note: "Rises if profit improves — or if the capital base shrinks, which is why a rising ROCE with falling investment needs explaining rather than celebrating.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three moves that turn ratios into marks",
          md: "**Compare** — against last year, against budget, against a competitor or sector figure the case gives you. A ratio with nothing to compare it to means nothing. **Explain the cause** using other information in the exhibits, not a generic list of possibilities. **Connect it to the decision** — say what the analysis implies for the strategy being considered. Calculating ten ratios and describing their movement is the commonest way to score poorly on a well-answered calculation.",
        },
        {
          kind: "text",
          md: "Two specific traps. A margin can improve because prices rose, costs fell, mix changed, or because something was capitalised that used to be expensed — so check for an accounting change before concluding the business improved. And separate **cash** from **profit**: a company can report growing profit while operating cash flow falls, which normally means working capital is absorbing the difference, and that is the more urgent finding.",
        },
      ],
      check: {
        q: "A company reports operating profit up 14% while operating cash flow has fallen 20%. Receivable days have risen from 42 to 71. What is the most likely explanation and the priority?",
        options: [
          "Performance has improved; the cash movement is a timing difference requiring no action",
          "Growth is being funded by extending credit — profit is being recognised on sales not yet collected, so the priority is collection and credit control before liquidity is exhausted",
          "The company should capitalise more costs to align profit and cash",
          "Operating cash flow is not a meaningful measure of performance",
          ],
        correct: 1,
        explain:
          "Receivable days rising by 29 explains the divergence directly: sales are being made and not collected, so reported profit is real and the cash behind it is not there yet. Left alone this is how a profitable company runs out of money.",
      },
    },
    {
      id: "kpis",
      heading: "Designing KPIs that survive being used",
      blocks: [
        {
          kind: "text",
          md: "A key performance indicator translates an objective into something measurable, so that progress can be seen and someone can be held to it. That is also why measures distort behaviour: whatever is measured and rewarded is what people will produce, including at the expense of the objective the measure was standing in for.",
        },
        {
          kind: "list",
          style: "number",
          title: "What every KPI needs",
          items: [
            "**A link to a specific objective** — if you cannot name it, delete the measure",
            "**A precise definition**, so two divisions cannot compute it differently",
            "**An owner** who can actually influence it",
            "**A target and a timeframe**, with the basis for the target stated",
            "**A data source** and a stated frequency",
            "**A decision response** — what happens when it moves adversely",
            "**A counter-measure** guarding the behaviour it might distort",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The counter-measure is the item candidates never mention, and it is the best point available",
          md: "Any single measure can be met in a damaging way. Average call handling time is met by ending calls before the problem is solved; on-time delivery is met by quoting longer lead times; cost per unit is met by deferring maintenance. So pair each measure with one that would deteriorate if it were being gamed — handling time **with** first-contact resolution, delivery speed **with** quoted lead time, unit cost **with** downtime. Recommending a pair rather than a measure is what makes a KPI recommendation professional.",
        },
        {
          kind: "table",
          caption: "Common measures and the gaming they invite",
          head: ["Measure", "How it gets gamed", "Pair it with"],
          rows: [
            ["Average handling time", "Calls ended before resolution", "First-contact resolution; repeat contact rate"],
            ["On-time delivery", "Lead times quoted longer", "Quoted lead time; order-to-receipt time"],
            ["Cost per unit", "Maintenance and training deferred", "Downtime; defect rate; training hours"],
            ["Sales volume", "Discounting; selling to poor credit risks", "Margin; bad debts; returns"],
            ["Utilisation", "Work made to fill capacity", "Inventory days; on-time delivery"],
            ["Period-end revenue", "Sales pulled forward into the period", "Returns after period end; receivable days"],
          ],
        },
        {
          kind: "text",
          md: "Balance matters as well as pairing. A dashboard of financial outcomes alone reports the past; adding customer, process and people measures gives leading indicators of whether those outcomes will continue. That is the argument for a balanced set of measures, and it is also the argument SBL-10's six capitals makes in reporting terms.",
        },
      ],
      check: {
        q: "A distribution business intends to reward depot managers on cost per delivery. What counter-measure should accompany it?",
        options: [
          "A second cost measure, such as cost per kilometre, to confirm the first",
          "Service and asset-condition measures such as on-time delivery, damage rate and vehicle downtime — cost per delivery is met by deferring maintenance and cutting service",
          "A target set slightly above the current level to make it achievable",
          "No counter-measure; cost per delivery is objectively measurable",
          ],
        correct: 1,
        explain:
          "A second cost measure moves the same way as the first and confirms nothing. The counter-measure must be something that deteriorates when the measure is gamed — which is what deferring maintenance and trimming service would show up in.",
      },
    },
    {
      id: "cost-and-budgeting",
      heading: "Cost management, budgeting and variances",
      blocks: [
        {
          kind: "text",
          md: "G3 asks why cost management and control still matter strategically, and how forecasting, budgeting, standard costing and variance analysis support strategic planning. The strategic answer is that cost position determines which strategies are available: a company without a cost advantage cannot pursue price-based competition (SBL-16), and one whose costs it does not understand cannot tell which products, customers or channels create value.",
        },
        {
          kind: "table",
          caption: "The techniques, at strategic level",
          head: ["Technique", "Strategic contribution", "Limitation to state"],
          rows: [
            ["Forecasting", "Sets the planning envelope for capacity, funding and capability", "Extrapolates the past; poor at discontinuity"],
            ["Budgeting", "Allocates resource to strategic priorities and creates accountability", "Can entrench last year's pattern; invites gaming and padding"],
            ["Standard costing", "Provides a benchmark and exposes deviation quickly", "Assumes stable, repetitive processes; less apt for bespoke or fast-changing work"],
            ["Variance analysis", "Directs attention to where actual diverged from plan", "Explains the past; can encourage short-term cost cutting"],
            ["Rolling forecasts", "Keeps the horizon constant as the year progresses", "Continuous effort; needs discipline to stay honest"],
            ["Activity-based costing", "Shows what products, customers and channels really cost to serve", "Data-hungry; needs maintenance"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The budget as a behaviour problem, not an arithmetic one",
          md: "Budgets are negotiated by people whose performance is judged against them, so they attract padding, spending in the final quarter to protect next year's allocation, and defence of last year's allocation regardless of strategic priority. If a case describes an annual process where every department receives roughly last year plus a percentage, the finding is that resource is not following strategy at all — and a zero-based or priority-based approach for a defined part of the cost base is the remedy worth recommending.",
        },
        {
          kind: "text",
          md: "On variances, the SBL-level point is to distinguish a **planning** problem from an **operational** one. A large adverse material price variance may mean poor buying, or it may mean the standard was set before a commodity moved and every subsequent variance is measuring the obsolete standard rather than performance. Asking which of the two a case shows is the difference between advising on procurement and advising that the standards be reset — and getting it wrong sends the recommendation to the wrong place, exactly as with strategic and operational risk in SBL-18.",
        },
        {
          kind: "text",
          md: "Finally, keep cost *management* distinct from cost *cutting*. Managing cost means understanding what drives it and removing the driver; cutting means reducing spend and accepting whatever follows. The second is available to any organisation in a bad quarter and frequently damages the capabilities the strategy depends on — which is the three-Es tension from SBL-11 appearing in a commercial setting.",
        },
      ],
      check: {
        q: "A manufacturer reports large adverse material price variances every month for a year. Commodity prices rose sharply 13 months ago and the standards were last set 18 months ago. What is the correct diagnosis?",
        options: [
          "Procurement is underperforming and should be restructured",
          "The standard is obsolete, so the variance measures the out-of-date benchmark rather than buying performance — reset the standards, then assess procurement against the new one",
          "Material price variances should be excluded from reporting",
          "The company should switch to a cheaper material immediately",
          ],
        correct: 1,
        explain:
          "A variance that is large, adverse and unchanging every month is characteristic of a wrong standard rather than of performance, which would fluctuate. Until the benchmark is current, no conclusion about procurement can be drawn from it — and restructuring on that evidence would be acting on a measurement artefact.",
      },
    },
  ],
  examTraps: [
    { trap: "Calculating ratios and describing their movement.", fix: "Compare, explain the cause from the exhibits, then connect it to the decision." },
    { trap: "Reading a margin improvement as operational improvement.", fix: "Check for mix changes and accounting changes such as capitalisation first." },
    { trap: "Ignoring the gap between profit and operating cash flow.", fix: "Working capital usually explains it, and the cash finding is the more urgent one." },
    { trap: "Recommending a KPI with no counter-measure.", fix: "Pair each measure with one that would deteriorate if it were being gamed." },
    { trap: "Reading a persistent variance as poor performance.", fix: "A large, unchanging variance usually indicates an obsolete standard — a planning problem, not an operational one." },
  ],
  keyTerms: [
    { term: "Return on capital employed", def: "Operating profit as a proportion of capital employed — which can rise because profit grew or because the capital base shrank." },
    { term: "Key performance indicator", def: "A measure translating an objective into something observable, with a definition, owner, target, source and decision response." },
    { term: "Counter-measure", def: "A paired indicator that deteriorates if the primary measure is being achieved in a damaging way." },
    { term: "Zero-based budgeting", def: "Building a budget from justified activity rather than from last year's allocation." },
    { term: "Planning variance", def: "A variance caused by an out-of-date or wrong standard rather than by operating performance." },
    { term: "Activity-based costing", def: "Attributing cost by the activities that drive it, revealing the true cost to serve products, customers and channels." },
  ],
  summary: [
    "Ratios earn marks through comparison, cause and connection to the decision.",
    "Separate profit from cash — working capital usually explains a divergence, and it is the urgent finding.",
    "Every KPI needs a definition, owner, target, source, decision response and a counter-measure.",
    "Budgets are negotiated by the people judged against them, so resource stops following strategy.",
    "Distinguish planning from operational variances, and cost management from cost cutting.",
  ],
  knowledgeDiagnostic: [
    { q: "What three moves turn a ratio calculation into marks?", a: "Compare it with a benchmark the case supplies, explain the cause from other exhibit information, and connect it to the decision being advised." },
    { q: "Why can rising ROCE be misleading?", a: "It rises if the capital base shrinks as well as if profit grows, so falling investment can produce an apparently improving return." },
    { q: "What is a counter-measure, and why does every KPI need one?", a: "A paired indicator that worsens if the primary measure is gamed — because any single measure can be met in a way that damages the objective behind it." },
    { q: "How do you tell a planning variance from an operational one?", a: "A large variance that is stable month after month usually indicates an obsolete standard; genuine performance variation fluctuates." },
    { q: "Distinguish cost management from cost cutting.", a: "Management understands and removes the driver of a cost; cutting reduces spend and accepts the consequences, often damaging the capabilities the strategy needs." },
  ],
  furtherStudy: [
    "SBL-32 covers appraising the investments these measures monitor",
    "SBL-37 covers performance excellence and critical success factors",
    "SBL-10 covers reporting performance beyond financial measures",
    "SBL-11 covers the three Es, the public sector form of this material",
  ],
}

export const SBL_TREE_AREA_G: StudyChapter[] = [SBL_TREE_30, SBL_TREE_31, SBL_TREE_32, SBL_TREE_33]
