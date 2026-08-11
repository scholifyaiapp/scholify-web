import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area A — the financial management function.
 *
 * ── WHY THIS FILE EXISTS ──────────────────────────────────────
 * FM had five authored chapter bodies stretched across seven official syllabus
 * areas by aliasing: FM_OFFICIAL_D was FM_B relabelled, F and G were one
 * chapter's sections filtered in two. Eight chapters, ~17,000 words, for a
 * paper the approved texts cover in about twenty chapters.
 *
 * The engine serves ONE CHAPTER A DAY. So an FM learner exhausted the entire
 * course in eight days and dropped into revision — on a paper they are usually
 * studying for three months. That is not a content gap, it is a promise the
 * product cannot keep.
 *
 * This is the same rebuild BT had: one chapter per syllabus sub-topic group,
 * every chapter carrying its official `syllabusRefs` so the mapping is
 * checkable rather than asserted.
 *
 * Area A · 3 chapters (A1 … A4) — the function, the objectives, the stakeholders
 *
 * ── PROVENANCE ────────────────────────────────────────────────
 * Written against the official ACCA FM syllabus and study guide. Deliberately
 * NOT derived from any approved-provider text: those are copyrighted, and
 * paraphrasing one into a product sold to learners is a real exposure. The
 * structure follows ACCA's own study guide because that is the examinable
 * document.
 */

const FM_TREE_01: StudyChapter = {
  paper: "FM",
  id: "FM-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)"],
  title: "The financial management function",
  minutes: 16,
  intro:
    "Before any calculation, FM asks one question: what is finance actually FOR? Three decisions answer it, and every later chapter of this paper is one of the three in detail.",
  outcomes: [
    "Define financial management and distinguish it from financial and management accounting",
    "Explain the three key decisions: investment, financing and dividend",
    "Explain how the three decisions interact and why they cannot be taken in isolation",
    "Relate financial strategy to corporate strategy at strategic, tactical and operational level",
  ],
  sections: [
    {
      id: "what-fm-is",
      heading: "What financial management is",
      blocks: [
        {
          kind: "text",
          md: "Financial management is concerned with **raising** the funds a business needs, **investing** them in the right places, and deciding how much to **return** to the owners. Everything in FM — working capital, NPV, WACC, valuations, hedging — sits under one of those three.",
        },
        {
          kind: "definition",
          term: "Financial management",
          md: "The management of an organisation's **finances** so as to achieve its **financial objectives** — for a company, normally the maximisation of shareholder wealth.",
        },
        {
          kind: "text",
          md: "The examiner regularly tests whether you can separate the three finance disciplines, because candidates use the words interchangeably and they are not interchangeable.",
        },
        {
          kind: "table",
          caption: "Three disciplines, three different jobs",
          head: ["", "Financial accounting", "Management accounting", "Financial management"],
          rows: [
            ["Audience", "External — shareholders, lenders, HMRC", "Internal — managers", "Internal — the board"],
            ["Time focus", "Historic", "Historic and forward", "Forward"],
            ["Governed by", "Accounting standards and law", "Nothing external", "Nothing external"],
            ["Question it answers", "What happened?", "How do we plan and control?", "Where do we invest, how do we fund it, what do we pay out?"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distinction that loses marks",
          md: "Financial accounting is **regulated and backward-looking**; financial management is **unregulated and forward-looking**. A question asking you to distinguish them wants that contrast, not a list of things accountants do.",
        },
      ],
      check: {
        q: "Which is a financial management decision rather than a financial accounting task?",
        options: [
          "Preparing a statement of financial position under IFRS",
          "Deciding whether to fund a new factory with debt or equity",
          "Calculating the year's depreciation charge",
          "Disclosing a contingent liability in the notes",
        ],
        correct: 1,
        explain:
          "Funding choice is the financing decision — forward-looking, unregulated and taken by the board. The other three are financial reporting: historic, governed by standards, and aimed at external users.",
      },
    },
    {
      id: "three-decisions",
      heading: "The three key decisions",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The financial management cycle",
            caption: "Money is raised, put to work, and the returns are split between reinvestment and the owners. Each arrow is a syllabus area.",
            data: {
              steps: [
                { label: "Financing", sub: "raise funds — equity, debt, retained earnings" },
                { label: "Investment", sub: "commit them to projects and working capital" },
                { label: "Dividend", sub: "return cash to owners, or retain to reinvest" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "number",
          title: "What each decision actually covers",
          items: [
            "**The investment decision.** Which projects, assets and acquisitions to commit funds to, and how much to hold in working capital. Examined mainly in Areas C and D — NPV, IRR, payback, inventory, receivables and cash.",
            "**The financing decision.** Where the money comes from, in what mix, and at what cost. Examined in Area E — sources of finance, cost of capital, gearing and capital structure.",
            "**The dividend decision.** How much of the returns to pay out now and how much to retain for reinvestment. Retained earnings are the single largest source of finance for most companies, which is why this is a financing decision as much as a reward decision.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "They are one decision, not three",
          md: "The three interlock. Paying a larger dividend leaves less retained profit, so more external finance is needed, which changes gearing, which changes the cost of capital, which changes the NPV of the next investment. A question that says \"discuss\" is usually asking you to trace exactly that chain.",
        },
        {
          kind: "illustration",
          title: "The chain in one paragraph",
          md: "A company wants to build a £20m plant. It could fund it by cutting the dividend (a **dividend** decision), by borrowing (a **financing** decision that raises gearing and financial risk), or by a rights issue (financing, but dilutes control).\n\nEach route changes the cost of capital used to discount the plant's cash flows — so the **investment** appraisal cannot be finished until the funding route is chosen. That interdependence is the whole point of the section.",
        },
      ],
      check: {
        q: "A company reduces its dividend payout in order to fund expansion internally. Which decisions has it taken?",
        options: [
          "The dividend decision only",
          "The investment decision only",
          "The dividend and financing decisions",
          "All three — dividend, financing and investment",
        ],
        correct: 3,
        explain:
          "Cutting the payout is the dividend decision; using the retained cash as the funding source is the financing decision; committing it to expansion is the investment decision. This is the standard illustration of why the three cannot be taken in isolation.",
      },
    },
    {
      id: "strategy-levels",
      heading: "Financial strategy inside corporate strategy",
      blocks: [
        {
          kind: "text",
          md: "Financial objectives do not exist on their own — they serve the corporate strategy. The syllabus uses the conventional three levels, and the examiner expects you to place a given decision at the right one.",
        },
        {
          kind: "table",
          caption: "Where a financial decision sits",
          head: ["Level", "Horizon and scope", "Financial example"],
          rows: [
            ["Strategic", "Long term, whole organisation, set by the board", "Deciding a target gearing ratio or a dividend policy"],
            ["Tactical", "Medium term, department or division", "Choosing between a bank loan and a bond issue for one project"],
            ["Operational", "Short term, day to day", "Chasing an overdue receivable; deciding whether to take a settlement discount"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How this is examined",
          md: "Almost always as a short scenario: \"classify the following decisions\". Sort by **horizon and who takes it**, not by how much money is involved — a large operational payment is still operational.",
        },
        {
          kind: "activity",
          title: "Classify six decisions",
          prompt:
            "Sort each as strategic, tactical or operational, and say which of the three financial management decisions it belongs to: (a) setting a maximum gearing ratio of 40%; (b) paying a £2m supplier invoice; (c) choosing a bank loan over a bond issue for one factory; (d) deciding to retain 60% of earnings each year; (e) chasing a customer 20 days overdue; (f) approving a £15m acquisition.",
          answer:
            "(a) **Strategic · financing** — a board-level policy for the whole company.\n(b) **Operational · investment** (working capital) — a large sum, but a routine day-to-day payment. Size is not the test.\n(c) **Tactical · financing** — medium term, one project, taken below board level.\n(d) **Strategic · dividend** (and therefore financing) — a standing policy on distribution.\n(e) **Operational · investment** (working capital) — day-to-day receivables management.\n(f) **Strategic · investment** — long term, whole organisation, board decision.\n\nThe trap is (b). A £2m payment feels strategic and is not: classification runs on horizon and the level that takes the decision, never on magnitude.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Describing financial management as \"preparing the accounts\".",
      fix: "Accounts report what happened. Financial management decides what to do next — invest, fund, distribute.",
    },
    {
      trap: "Treating the dividend decision as separate from financing.",
      fix: "Retained earnings ARE a source of finance, and usually the largest. Every pound paid out is a pound that must be raised elsewhere.",
    },
    {
      trap: "Classifying a decision as strategic because the sum is large.",
      fix: "Classify by time horizon and the level that takes it, not by magnitude.",
    },
  ],
  keyTerms: [
    { term: "Investment decision", def: "Choosing which projects and assets to commit funds to, including the level of working capital." },
    { term: "Financing decision", def: "Choosing the sources and mix of long- and short-term funds, and the resulting cost of capital." },
    { term: "Dividend decision", def: "Deciding how much of the returns to distribute to shareholders and how much to retain for reinvestment." },
    { term: "Corporate strategy", def: "The long-term direction and scope of the whole organisation, which financial strategy exists to serve." },
  ],
  summary: [
    "Financial management raises funds, invests them and returns value to owners.",
    "It is forward-looking and unregulated; financial accounting is historic and regulated.",
    "Three decisions — investment, financing, dividend — and they interlock.",
    "Retained earnings are a financing source, which is why the dividend decision is also a financing decision.",
    "Decisions are classified strategic, tactical or operational by horizon and level, not size.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three key decisions in financial management?", a: "Investment, financing and dividend." },
    { q: "Give one difference between financial accounting and financial management.", a: "Financial accounting is historic and regulated by standards; financial management is forward-looking and unregulated. (Also: external vs internal audience.)" },
    { q: "Why is the dividend decision also a financing decision?", a: "Profits retained rather than distributed are a source of finance — usually the largest single source — so paying more out means raising more externally." },
    { q: "At which level would a decision to set a target gearing ratio sit?", a: "Strategic — long term, whole organisation, taken by the board." },
  ],
  furtherStudy: [
    "Area D applies the investment decision in full — NPV, IRR, tax and inflation.",
    "Area E is the financing decision: sources of finance, cost of capital and capital structure.",
    "AFM extends all three to acquisitions, complex hedging and international investment.",
  ],
}

const FM_TREE_02: StudyChapter = {
  paper: "FM",
  id: "FM-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)", "A2(d)"],
  title: "Financial objectives and shareholder wealth",
  minutes: 18,
  intro:
    "\"Maximise shareholder wealth\" is the answer to almost every FM discussion question. This chapter is about what that actually means, how it is measured, and why profit is not the same thing.",
  outcomes: [
    "Explain the primary financial objective of maximising shareholder wealth",
    "Explain why profit maximisation is an inadequate objective",
    "Calculate and interpret the main shareholder ratios",
    "Discuss the use of financial objectives and targets in managing a company",
  ],
  sections: [
    {
      id: "wealth-not-profit",
      heading: "Wealth, not profit",
      blocks: [
        {
          kind: "text",
          md: "A shareholder's wealth comes from two things and only two: the **dividends** received, and the **capital growth** in the share price. Maximising shareholder wealth means maximising the total of the two over time.",
        },
        {
          kind: "formula",
          name: "Total shareholder return",
          expr: "TSR = ( D₁ + (P₁ − P₀) ) / P₀ × 100",
          note: "D₁ = dividend in the period · P₀, P₁ = share price at the start and end. Dividend yield plus capital growth, in one figure.",
        },
        {
          kind: "text",
          md: "Accounting **profit** is a poor substitute for wealth, and the examiner wants the reasons rather than the assertion.",
        },
        {
          kind: "list",
          style: "number",
          title: "Why profit maximisation fails as an objective",
          items: [
            "**Profit is subjective.** Depreciation policy, inventory valuation, provisions and revenue-recognition judgements all move it. Two identical businesses can report different profits legitimately.",
            "**Profit ignores timing.** £1m next year and £1m in ten years are the same profit and very different wealth. Only discounting handles that, which is why NPV — not profit — drives the investment decision.",
            "**Profit ignores risk.** A profit earned from a highly geared, volatile venture is worth less than the same profit earned safely. Shareholders price risk; the income statement does not.",
            "**Profit is not cash.** A profitable company that cannot pay its suppliers still fails. Wealth ultimately depends on cash flows.",
            "**Short-termism.** Profit can be raised this year by cutting R&D, training and maintenance — decisions that destroy value. Wealth maximisation is explicitly long term.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The sentence to have ready",
          md: "\"Shareholder wealth is maximised by maximising the present value of expected future cash flows, discounted at a rate reflecting their risk.\" Every element of FM — NPV, WACC, risk adjustment — is a piece of that sentence.",
        },
      ],
      check: {
        q: "Which is the strongest reason profit maximisation is rejected as the primary financial objective?",
        options: [
          "Profit is hard to calculate in large companies",
          "Profit ignores the timing and risk of returns, and is subject to accounting judgement",
          "Profit is not reported to shareholders",
          "Profit cannot be compared between years",
        ],
        correct: 1,
        explain:
          "Timing, risk and subjectivity are the three substantive criticisms — they are why NPV rather than profit drives investment decisions. Profit is of course reported and comparable; difficulty of calculation is not the objection.",
      },
    },
    {
      id: "shareholder-ratios",
      heading: "The ratios a shareholder actually watches",
      blocks: [
        {
          kind: "text",
          md: "These appear in Section A as one-mark calculations and in Section C as the evidence behind a discussion. Learn them as a set — questions often give you three and ask you to derive the fourth.",
        },
        {
          kind: "formula",
          name: "Earnings per share",
          expr: "EPS = Earnings attributable to ordinary shareholders / Weighted average number of ordinary shares",
          note: "Earnings are AFTER tax and AFTER preference dividends — preference shareholders are not ordinary shareholders.",
        },
        {
          kind: "formula",
          name: "Price/earnings ratio",
          expr: "P/E = Market price per share / EPS",
          note: "A market judgement about future growth and risk. A high P/E means the market expects earnings to grow — or that earnings are temporarily depressed.",
        },
        {
          kind: "formula",
          name: "Dividend cover and dividend yield",
          expr: "Dividend cover = EPS / DPS\nDividend yield = DPS / Market price per share × 100",
          note: "Cover shows how safe the dividend is; yield shows the income return to a buyer at today's price.",
        },
        {
          kind: "formula",
          name: "Return on capital employed",
          expr: "ROCE = PBIT / (Equity + Long-term debt) × 100",
          note: "The headline efficiency measure. Decompose it as profit margin × asset turnover to explain WHY it moved.",
        },
        {
          kind: "example",
          title: "Reading four ratios together",
          scenario:
            "Verity Co reports profit after tax of £4.2m and pays a preference dividend of £0.2m. It has 8 million ordinary shares in issue throughout the year, trading at £6.00. The ordinary dividend was £1.6m.",
          steps: [
            { label: "Earnings for ordinary shareholders", detail: "£4.2m − £0.2m preference dividend = £4.0m" },
            { label: "EPS", detail: "£4.0m / 8m shares = £0.50" },
            { label: "DPS", detail: "£1.6m / 8m shares = £0.20" },
            { label: "Dividend cover", detail: "£0.50 / £0.20 = 2.5 times" },
            { label: "Dividend yield", detail: "£0.20 / £6.00 × 100 = 3.3%" },
            { label: "P/E ratio", detail: "£6.00 / £0.50 = 12.0" },
          ],
          result:
            "Cover of 2.5 times is comfortable — earnings could fall substantially before the dividend was threatened. A P/E of 12 with a 3.3% yield suggests the market expects moderate growth and is pricing most of the return as capital gain rather than income.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The preference dividend trap",
          md: "EPS uses earnings attributable to **ordinary** shareholders. Forgetting to deduct the preference dividend inflates EPS, which then corrupts dividend cover and the P/E ratio. It is the single most common slip in this area.",
        },
      ],
      check: {
        q: "A company has profit after tax of £5m, preference dividends of £1m and 10 million ordinary shares. What is EPS?",
        options: ["£0.60", "£0.50", "£0.40", "£0.10"],
        correct: 2,
        explain:
          "Earnings attributable to ordinary shareholders = £5m − £1m = £4m. EPS = £4m / 10m = £0.40. Using the £5m without deducting the preference dividend gives £0.50 — the distractor this question exists to catch.",
      },
    },
    {
      id: "targets",
      heading: "Objectives, targets and their limits",
      blocks: [
        {
          kind: "text",
          md: "Companies translate the wealth objective into measurable targets — a required ROCE, an EPS growth rate, a gearing ceiling, a dividend payout ratio. Targets make performance manageable, and they also distort it.",
        },
        {
          kind: "table",
          caption: "Financial targets: the trade-off",
          head: ["Target", "What it encourages", "How it distorts"],
          rows: [
            ["EPS growth", "Focus on earnings efficiency", "Can be met by buying back shares rather than creating value"],
            ["ROCE hurdle", "Discipline over capital use", "Rejects positive-NPV projects that dilute a high current ROCE"],
            ["Gearing ceiling", "Controls financial risk", "May block cheap debt finance when it is genuinely optimal"],
            ["Dividend payout", "Predictable income for shareholders", "Can force distribution when reinvestment would create more wealth"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What a Section C discussion wants",
          md: "Not \"the target is good\" or \"the target is bad\", but the mechanism: state what behaviour the target rewards, then name the specific value-destroying action it would also reward. That second half is where the marks are.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Using profit after tax as EPS earnings without deducting preference dividends.",
      fix: "EPS is for ORDINARY shareholders. Deduct preference dividends first, every time.",
    },
    {
      trap: "Saying profit maximisation is wrong because \"cash is king\", and stopping there.",
      fix: "Give the three substantive reasons: subjectivity, timing and risk. Cash is a fourth, not the whole answer.",
    },
    {
      trap: "Treating a high P/E as automatically good.",
      fix: "A high P/E reflects expected growth OR temporarily depressed earnings. Say which the scenario supports.",
    },
  ],
  keyTerms: [
    { term: "Shareholder wealth", def: "The total of dividends received and capital growth in the share price." },
    { term: "Total shareholder return", def: "Dividend plus capital gain in a period, as a percentage of the opening share price." },
    { term: "Dividend cover", def: "EPS divided by DPS — how many times the dividend could have been paid out of current earnings." },
    { term: "Price/earnings ratio", def: "Market price per share divided by EPS; a market view of growth prospects and risk." },
  ],
  summary: [
    "Shareholder wealth = dividends + capital growth; that is the primary financial objective.",
    "Profit is rejected as an objective because it is subjective and ignores timing and risk.",
    "EPS uses earnings attributable to ordinary shareholders — deduct preference dividends.",
    "Cover measures dividend safety; yield measures income return; P/E reflects growth expectations.",
    "Targets make performance manageable and can also reward value-destroying behaviour.",
  ],
  knowledgeDiagnostic: [
    { q: "What two components make up shareholder wealth?", a: "Dividends received and capital growth in the share price." },
    { q: "Give three reasons profit maximisation is an inadequate objective.", a: "It is subject to accounting judgement, ignores the timing of returns, and ignores risk. (Also: it is not cash, and it encourages short-termism.)" },
    { q: "How is EPS calculated?", a: "Earnings attributable to ordinary shareholders (profit after tax and after preference dividends) divided by the weighted average number of ordinary shares." },
    { q: "What does a dividend cover of 1.2 times suggest?", a: "The dividend is only just covered by earnings — little cushion, so a fall in profit would put the payout at risk." },
  ],
  furtherStudy: [
    "Area D uses the wealth objective directly: NPV is the amount by which a project increases shareholder wealth.",
    "Area E returns to EPS and gearing when comparing equity and debt finance.",
    "APM revisits targets and their distorting effects through EVA, ROI and residual income.",
  ],
}

const FM_TREE_03: StudyChapter = {
  paper: "FM",
  id: "FM-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A3(a)", "A3(b)", "A3(c)", "A4(a)", "A4(b)"],
  title: "Stakeholders, agency and not-for-profit objectives",
  minutes: 17,
  intro:
    "Shareholders own the company; managers run it. That gap is the agency problem, and it explains reward schemes, governance codes and half the discussion marks in this paper.",
  outcomes: [
    "Identify the main stakeholder groups and the objectives each pursues",
    "Explain the agency problem and how it arises from separated ownership and control",
    "Evaluate managerial reward schemes and regulatory mechanisms for encouraging goal congruence",
    "Explain the objectives of not-for-profit organisations and how value for money is assessed",
  ],
  sections: [
    {
      id: "stakeholders",
      heading: "Who wants what",
      blocks: [
        {
          kind: "text",
          md: "A company serves several groups whose objectives genuinely conflict. Exam scenarios are built on those conflicts, so know the specific want of each group rather than a general list of names.",
        },
        {
          kind: "table",
          caption: "Stakeholders and their objectives",
          head: ["Stakeholder", "Primary objective", "Where it conflicts"],
          rows: [
            ["Shareholders", "Maximise wealth — dividends and share price", "With employees over wages; with lenders over risk-taking"],
            ["Directors / managers", "Salary, security, status, bonus", "May prefer growth or safety over shareholder value"],
            ["Employees", "Pay, job security, conditions", "Cost cutting raises profit and reduces their security"],
            ["Lenders / debt holders", "Interest paid and capital repaid; low risk", "Oppose high gearing and risky projects that shareholders may favour"],
            ["Customers", "Quality, price, continuity of supply", "Lower prices reduce margin"],
            ["Suppliers", "Paid in full, on time", "Extending payables improves the buyer's cash cycle at the supplier's expense"],
            ["Government", "Tax, employment, compliance", "Tax planning reduces the take"],
            ["Community", "Environmental and social responsibility", "Compliance and remediation cost money"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Answering a conflict question",
          md: "Name the two groups, state each one's objective **in the scenario's own terms**, then say which decision favours which. Generic lists of stakeholders score very little.",
        },
      ],
    },
    {
      id: "agency",
      heading: "The agency problem",
      blocks: [
        {
          kind: "definition",
          term: "Agency relationship",
          md: "A relationship in which one party — the **agent** (directors) — is engaged to act on behalf of another, the **principal** (shareholders). The problem arises because the agent has their own objectives and better information.",
        },
        {
          kind: "text",
          md: "Two conditions create it, and both must be present: **separation of ownership from control**, and **asymmetry of information** — managers know more about the business than the owners do.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "How agency shows up in practice",
          items: [
            "**Excessive perquisites** — cars, offices, travel funded by the shareholders.",
            "**Empire building** — pursuing growth or acquisitions that raise managers' status and pay but not shareholder wealth.",
            "**Risk aversion** — rejecting positive-NPV projects because failure threatens the manager's job, while a diversified shareholder would want them accepted.",
            "**Short-termism** — protecting this year's bonus by cutting R&D, training or maintenance.",
          ],
        },
        {
          kind: "definition",
          term: "Agency costs",
          md: "The costs of the relationship: **monitoring** costs (audit, reporting, non-executive oversight), **bonding** costs (incentives that align the agent), and the **residual loss** where behaviour still diverges.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Goal congruence is the aim",
          md: "Every mechanism below — reward schemes, governance codes, regulation — exists to make the agent's self-interest point in the same direction as the principal's. That is goal congruence, and naming it is worth a mark.",
        },
      ],
      check: {
        q: "Which situation best illustrates the agency problem?",
        options: [
          "A company's auditors qualify the financial statements",
          "Directors reject a positive-NPV project because failure would risk their jobs",
          "Shareholders vote against a proposed acquisition at the AGM",
          "A lender imposes a covenant limiting further borrowing",
        ],
        correct: 1,
        explain:
          "Rejecting a value-adding project to protect personal position is the agent pursuing their own objective at the principal's expense. The other three are RESPONSES to agency risk — monitoring, control and covenants — not the problem itself.",
      },
    },
    {
      id: "reward-and-regulation",
      heading: "Reward schemes and regulation",
      blocks: [
        {
          kind: "table",
          caption: "Aligning managers with shareholders",
          head: ["Mechanism", "How it aligns", "Weakness"],
          rows: [
            ["Performance-related pay", "Ties reward to measured results", "Rewards whatever is measured — often short-term accounting profit"],
            ["Share options", "Manager gains only if the price rises", "Encourages risk-taking; a falling market makes options worthless and demotivating"],
            ["Executive share ownership", "Manager becomes a shareholder", "Managers are undiversified, so may still be too cautious"],
            ["Non-executive directors", "Independent monitoring of the board", "Depends on genuine independence and information access"],
          ],
        },
        {
          kind: "text",
          md: "Regulation supplements incentives: **corporate governance codes** (board balance, audit committees, remuneration committees), **stock exchange listing rules**, **accounting standards** that constrain reporting judgement, and **market regulation** such as takeover rules.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not present share options as the fix",
          md: "Options align direction but not magnitude of risk: an option holder gains from volatility and loses nothing below the exercise price, which can encourage exactly the gambling shareholders do not want. Say so — it is the discriminating point.",
        },
        {
          kind: "example",
          title: "A reward scheme that produces the wrong behaviour",
          scenario:
            "Calderstone Co pays its directors a bonus of 20% of salary if reported EPS growth exceeds 8%. Growth came in at 8.4%. During the year the company cut the research budget by 60%, bought back 5% of its shares, and extended supplier payment terms from 30 to 75 days.",
          steps: [
            { label: "Was the target met?", detail: "Yes — 8.4% against 8%. On the scheme's own terms the bonus is payable." },
            { label: "How was it met?", detail: "The buyback reduced the share count, raising EPS with no improvement in earnings at all. Cutting research raised this year's profit by removing next decade's products. Stretching payables improved cash at suppliers' expense." },
            { label: "Was shareholder wealth increased?", detail: "Almost certainly not. Two of the three actions destroy long-term value and the third is cosmetic — EPS rose because the denominator fell." },
            { label: "The agency point", detail: "The scheme created goal INCONGRUENCE: it rewarded a measure rather than the objective. The agent behaved rationally; the principal wrote the wrong contract." },
            { label: "Better design", detail: "A longer performance period; a measure less easily manipulated than EPS, such as total shareholder return or economic value added; a claw-back provision; and share ownership with a holding period rather than options." },
          ],
          result:
            "The directors did nothing dishonest. That is the lesson: agency problems are usually produced by badly designed incentives rather than bad people, which is why the exam answer is about the SCHEME and not the individuals.",
        },
      ],
    },
    {
      id: "not-for-profit",
      heading: "Not-for-profit objectives and value for money",
      blocks: [
        {
          kind: "text",
          md: "A charity, hospital or government department has no shareholder wealth to maximise. Its objective is to deliver a **service** to a defined standard within the resources available — which is harder to measure, not easier.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Why NFP objectives are difficult",
          items: [
            "**Multiple objectives** that conflict, with no single measure to rank them against.",
            "**Outputs are not sold**, so there is no market price and no revenue figure to measure success by.",
            "**Benefits are often non-quantifiable** — a life improved, a park maintained.",
            "**The funder is not the beneficiary**, so satisfying the payer and serving the user can pull apart.",
          ],
        },
        {
          kind: "definition",
          term: "Value for money — the three Es",
          md: "**Economy** — obtaining inputs at the lowest appropriate cost. **Efficiency** — the ratio of outputs to inputs. **Effectiveness** — the extent to which objectives are actually achieved.",
        },
        {
          kind: "illustration",
          title: "The three Es in one example",
          md: "A council runs a school meals service.\n\n**Economy** — buying ingredients 8% cheaper than last year. **Efficiency** — meals served per staff hour. **Effectiveness** — whether child nutrition actually improved.\n\nNote the trap built into that example: cutting ingredient cost improves economy and can damage effectiveness. A good answer names that tension rather than treating the three as a checklist.",
        },
      ],
      check: {
        q: "A hospital reduces the cost per bandage purchased by 15%. Which of the three Es does this measure?",
        options: ["Effectiveness", "Efficiency", "Economy", "Equity"],
        correct: 2,
        explain:
          "Economy is about the cost of INPUTS. Efficiency would compare outputs to inputs (patients treated per nurse), and effectiveness would ask whether patients actually recovered. Watch for the follow-up: cheaper bandages could reduce effectiveness.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing stakeholders without saying what each one wants in the scenario.",
      fix: "Marks are for the conflict, not the list. Name the objective and the specific decision that damages it.",
    },
    {
      trap: "Describing agency costs as only the money spent on audit.",
      fix: "Three components: monitoring, bonding and the residual loss that survives both.",
    },
    {
      trap: "Confusing efficiency with effectiveness.",
      fix: "Efficiency is outputs per input. Effectiveness is whether the objective was achieved at all.",
    },
  ],
  keyTerms: [
    { term: "Agency problem", def: "The conflict arising where managers (agents) run a business on behalf of owners (principals) but pursue their own objectives." },
    { term: "Goal congruence", def: "The state in which managers' personal objectives align with those of the shareholders." },
    { term: "Agency costs", def: "Monitoring costs, bonding costs and the residual loss arising from the agency relationship." },
    { term: "Value for money", def: "The achievement of economy, efficiency and effectiveness in the use of resources." },
  ],
  summary: [
    "Stakeholder groups have genuinely conflicting objectives; scenarios are built on the conflict.",
    "Agency arises from separated ownership and control plus asymmetric information.",
    "Agency costs are monitoring, bonding and residual loss.",
    "Reward schemes and governance exist to create goal congruence; share options align direction but encourage risk.",
    "Not-for-profit performance is assessed as value for money — economy, efficiency, effectiveness.",
  ],
  knowledgeDiagnostic: [
    { q: "What two conditions give rise to the agency problem?", a: "Separation of ownership from control, and asymmetry of information between managers and owners." },
    { q: "Name the three components of agency costs.", a: "Monitoring costs, bonding costs and the residual loss." },
    { q: "Why might share options encourage excessive risk-taking?", a: "The holder gains from upside volatility but loses nothing below the exercise price, so a risky strategy has an asymmetric payoff in their favour." },
    { q: "Distinguish efficiency from effectiveness.", a: "Efficiency is the ratio of outputs to inputs; effectiveness is whether the objective was actually achieved." },
  ],
  furtherStudy: [
    "Area E returns to lender–shareholder conflict through covenants and gearing.",
    "SBL develops governance, board structure and stakeholder analysis in far more depth.",
    "APM revisits performance measurement where the objective is not profit.",
  ],
}

export const FM_TREE_AREA_A: StudyChapter[] = [FM_TREE_01, FM_TREE_02, FM_TREE_03]
