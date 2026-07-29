import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area C — Accounting and reporting systems, technology and compliance.
 * Chapters 12–17 of the BT reading tree, mapped to syllabus groups C1–C8.
 *
 * This is the area a trainee accountant will live inside, and the one where BT's
 * "and Technology" title earns its place: financial systems, internal control,
 * fraud and fintech are four of its eight sub-topics.
 *
 * Original Scholify teaching text throughout.
 */

/* ── Chapter 12 · C1, C2 ───────────────────────────────────────── */

export const BT_TREE_12: StudyChapter = {
  id: "BT-12",
  number: 12,
  paper: "BT",
  area: "C",
  title: "The accounting and finance function",
  minutes: 17,
  syllabusRefs: ["C1(a)", "C1(b)", "C1(c)", "C2(a)", "C2(b)", "C2(c)", "C2(d)"],
  intro:
    "The finance function is the only part of an organisation that touches every other part. This chapter is what it is made of, what each sub-function does, and how it relates to the rest of the business — including where those relationships go wrong.",
  outcomes: [
    "Describe the roles of the main financial functions: financial accounting, management accounting, treasury and internal audit",
    "Explain how the finance function relates to the other business functions",
    "Distinguish financial accounting from management accounting",
    "Explain the finance function's own structure and its shift from recording to advising",
    "Identify the internal and external users of financial information and what each needs",
  ],
  sections: [
    {
      id: "sub-functions",
      heading: "What the finance function is made of",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The four financial sub-functions",
            caption: "Different users, different time horizons, different rules.",
            data: {
              items: [
                { title: "Financial accounting", sub: "Records transactions and prepares the statutory financial statements for EXTERNAL users, to a regulated format and timetable." },
                { title: "Management accounting", sub: "Produces information for INTERNAL decision-making, planning and control — costing, budgets, variances, forecasts. No prescribed format." },
                { title: "Treasury", sub: "Manages cash, liquidity, borrowing, investment and financial risk — currency, interest rate and credit exposure." },
                { title: "Internal audit", sub: "Provides independent assurance to the board that risk management, internal control and governance are working." },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Financial versus management accounting — the comparison that is examined most",
          head: ["", "Financial accounting", "Management accounting"],
          rows: [
            ["Primary users", "External — shareholders, lenders, tax authorities, suppliers", "Internal — managers at every level"],
            ["Purpose", "Stewardship: accounting for what was done with the resources", "Decision-making, planning and control"],
            ["Time focus", "Historic — what has happened", "Historic AND forward-looking — forecasts, budgets, projections"],
            ["Format", "Prescribed by accounting standards and law", "Whatever is useful; no external rules"],
            ["Frequency", "Annually, with interim reporting for listed companies", "Continuous — daily, weekly, monthly as needed"],
            ["Coverage", "The whole entity", "Any level: a product, a department, a customer, a machine"],
            ["Precision", "Accurate and auditable", "Relevance and timeliness beat precision — an approximate figure today beats an exact one next month"],
            ["Legally required?", "Yes for most entities", "No — it exists because it is useful"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The one-line distinction",
          md: "**Financial accounting looks outward and backward; management accounting looks inward and forward.** Everything else in the table follows from that.",
        },
        {
          kind: "definition",
          term: "Treasury management",
          md: "The management of an organisation's **cash, funding and financial risk**: ensuring there is enough liquidity to meet obligations, investing surpluses, raising borrowing on the best available terms, and managing exposure to currency, interest rate and credit risk.",
        },
        {
          kind: "definition",
          term: "Internal audit",
          md: "An **assurance function inside the organisation**, independent of the operations it examines, whose job is to test how well the organisation manages its risks, operates its internal controls and governs itself — and to recommend improvements. Note the three words that matter: it provides **assurance** rather than doing the work; it sits **inside** the entity; and its value rests entirely on its **independence** from what it examines.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Internal audit's independence is structural, not personal",
          md: "Internal audit reports to the **audit committee**, not to the finance director — because the finance function is one of the things it audits. An internal audit function that reports to the person whose controls it is testing has no independence, however honest its staff. This is exactly why Chapter 11 makes the audit committee's oversight of internal audit a governance requirement.",
        },
      ],
      check: {
        q: "Which of the following is a characteristic of MANAGEMENT accounting rather than financial accounting?",
        options: [
          "It is prepared in a format prescribed by accounting standards",
          "Its primary users are shareholders and lenders",
          "It may cover a single product or department rather than the whole entity",
          "It is legally required for most entities",
        ],
        correct: 2,
        explain:
          "Management accounting can be prepared at ANY level of the organisation — one product, one department, one customer, one machine — because its purpose is internal decision-making, and it follows no external format rules. The other three options all describe financial accounting: prescribed format, external users, and a legal requirement covering the whole entity.",
      },
    },
    {
      id: "relationships",
      heading: "How finance relates to the other functions",
      blocks: [
        {
          kind: "text",
          md: "Finance is a **service** function: it exists to make other functions' decisions better. Every relationship below runs in both directions — finance needs data from the function, and the function needs analysis from finance.",
        },
        {
          kind: "table",
          caption: "Finance's working relationship with each function",
          head: ["Function", "What finance gives it", "What finance needs from it"],
          rows: [
            ["Purchasing", "Supplier payment terms, cash flow constraints, cost analysis, make-or-buy appraisal", "Purchase orders, agreed prices, expected delivery dates, commitments to accrue"],
            ["Production / operations", "Product costings, variance analysis, capital investment appraisal, capacity economics", "Output volumes, scrap and rework rates, inventory movements, machine hours"],
            ["Sales and marketing", "Pricing analysis, margin by product and customer, credit limits, campaign evaluation", "Sales forecasts, order pipeline, pricing decisions, customer credit information"],
            ["Human resources", "Payroll processing, employment cost analysis, pension and benefit costing, headcount budgets", "Starters, leavers, changes to pay and hours, contract terms"],
            ["IT", "The business case for systems investment, and the control requirements over financial data", "Reliable, secure systems and the data they hold"],
            ["Distribution", "Delivery cost analysis, inventory holding cost, route and channel economics", "Despatch records, stock movements, delivery confirmations"],
          ],
        },
        {
          kind: "illustration",
          title: "The same figure, read three ways",
          md: "A product line shows revenue of $2.4m and a gross margin of 11%.\n\n**Sales** sees a product customers want, defending shelf space and volume. **Production** sees a line running near capacity with high changeover time. **Finance** sees a margin below the company average of 26% and asks whether the line covers its share of fixed costs at all.\n\nAll three are looking at the same product. Finance's contribution is not the number — everyone had the number. It is the **comparison** and the **question** that follows, which is precisely why the function's value sits in analysis rather than recording.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The friction to be able to describe",
          md: "Finance is often experienced by other functions as the department that says no — imposing credit limits sales does not want, questioning capital requests operations consider obvious, and demanding data nobody has time to supply. A good answer acknowledges this: finance's effectiveness depends on **being early and being useful**, not on being right after the decision has been taken.",
        },
      ],
    },
    {
      id: "structure-of-finance",
      heading: "How the finance function itself is organised",
      blocks: [
        {
          kind: "list",
          title: "Typical roles within a finance function",
          items: [
            "**Chief financial officer / finance director** — board-level responsibility for the function, for financial strategy and for the integrity of reporting.",
            "**Financial controller** — owns the financial accounting, the ledgers, the statutory accounts and the reporting timetable.",
            "**Management accountant** — costing, budgeting, variance analysis and decision support for operational managers.",
            "**Treasurer** — cash, funding, banking relationships and financial risk.",
            "**Credit controller** — customer credit assessment, limits and collection of receivables.",
            "**Payroll** — paying people accurately, on time, and with the correct statutory deductions.",
            "**Accounts payable and receivable teams** — processing purchase and sales transactions through to settlement.",
            "**Internal audit** — independent assurance, reporting to the audit committee rather than to the CFO.",
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "Where the finance function's value has moved",
            caption: "Automation removed the volume work, so the function's contribution shifted up the chain. See Chapter 6 on the technology effect and Chapter 17 on fintech.",
            data: {
              points: [
                { label: "Recording", sub: "Capturing and posting transactions accurately — now largely automated" },
                { label: "Reporting", sub: "Producing statements and management information — increasingly automated too" },
                { label: "Controlling", sub: "Designing controls, investigating exceptions, protecting the assets" },
                { label: "Advising", sub: "Interpreting, forecasting, challenging assumptions and supporting decisions — where the value now sits" },
              ],
            },
          },
        },
        {
          kind: "activity",
          title: "Activity 13 — who should do this?",
          prompt:
            "Assign each task to the most appropriate finance role, and say why.\n\n(a) Deciding whether a new customer should be granted $80,000 of credit.\n(b) Assessing whether the company should hedge a $3m payment due in euros in six months.\n(c) Testing whether purchase orders above the authorisation limit were properly approved.\n(d) Deciding whether to discontinue a product line with an 11% gross margin.",
          answer:
            "**(a) Credit controller.** Assessing customer creditworthiness and setting limits is their defined role, and separating it from sales is a deliberate control — a salesperson on commission has an incentive to approve the order regardless of the customer's ability to pay.\n\n**(b) Treasurer.** Foreign currency exposure is financial risk management, which is treasury's remit, drawing on its banking relationships and knowledge of hedging instruments.\n\n**(c) Internal audit.** This is a test of whether a control operated as designed, which is assurance work. It must NOT be done by the person who processes the purchase orders, and note that internal audit reports to the audit committee precisely so it can report a failure that implicates the finance function itself.\n\n**(d) The management accountant supports the decision; management takes it.** This is the nuance the examiner is looking for. The management accountant supplies the analysis — contribution rather than gross margin, whether the fixed costs are avoidable, the effect on the rest of the range — but discontinuing a product is an operating decision for management. Finance advises; it does not decide for the business.",
        },
      ],
    },
    {
      id: "users-of-information",
      heading: "Who uses financial information, and for what",
      blocks: [
        {
          kind: "table",
          caption: "Users and their needs",
          head: ["User", "Internal / external", "What they need it for"],
          rows: [
            ["Managers", "Internal", "Planning, decision-making and control at every level"],
            ["Employees and unions", "Internal", "Job security, pay bargaining, the employer's stability"],
            ["Shareholders", "External", "Whether to hold, buy or sell; assessing stewardship and dividend capacity"],
            ["Potential investors", "External", "Whether to invest at all"],
            ["Lenders", "External", "Whether interest and capital will be paid — so liquidity, gearing and covenant compliance"],
            ["Suppliers", "External", "Whether to extend trade credit and on what terms"],
            ["Customers", "External", "Continuity of supply and warranty security, especially for long-term contracts"],
            ["Tax authorities", "External", "Assessing the correct tax liability"],
            ["Regulators", "External", "Compliance with sector and reporting requirements"],
            ["The public and analysts", "External", "Impact on communities, and independent assessment"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The qualities information must have to be useful",
          md: "**Relevant** to the decision, **reliable** enough to be depended on, **timely** enough to still matter, **comparable** across periods and entities, **understandable** to its user, and **complete** enough not to mislead by omission. There is a genuine trade-off between **timeliness and accuracy** — and management accounting deliberately resolves it in favour of timeliness, while financial accounting resolves it in favour of accuracy.",
        },
      ],
      check: {
        q: "A bank is deciding whether to renew a company's five-year loan facility. Which aspect of the financial information will it focus on most?",
        options: [
          "Earnings per share and the dividend yield",
          "Liquidity, gearing and the ability to service interest and repay capital",
          "The level of directors' remuneration",
          "Market share relative to competitors",
        ],
        correct: 1,
        explain:
          "A LENDER's interest is whether it will be paid — interest as it falls due and capital at maturity. It therefore focuses on LIQUIDITY, GEARING and cash-generating ability, plus compliance with any covenants. Earnings per share and dividend yield are shareholder measures, since a lender's return is contractual and does not rise with profit.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying management accounting is legally required.",
      fix: "It is not. It exists because it is useful. Financial accounting is the legally required one, in a prescribed format.",
    },
    {
      trap: "Claiming management accounting must be as precise as financial accounting.",
      fix: "It deliberately trades precision for timeliness and relevance — an approximate figure available today beats an exact one available next month.",
    },
    {
      trap: "Placing internal audit under the finance director.",
      fix: "It reports to the AUDIT COMMITTEE, because the finance function is one of the things it audits. Reporting to the CFO destroys its independence structurally.",
    },
    {
      trap: "Confusing internal audit with external audit.",
      fix: "Internal audit gives assurance to the BOARD on risk, control and governance. External audit gives an opinion to SHAREHOLDERS on the financial statements.",
    },
    {
      trap: "Saying finance should decide whether to discontinue a product.",
      fix: "Finance supplies the analysis; management takes the operating decision. Overstating finance's authority is as wrong as understating its role.",
    },
    {
      trap: "Giving a lender shareholder-style information needs.",
      fix: "Lenders care about liquidity, gearing, cash generation and covenants, because their return is contractual rather than profit-linked.",
    },
  ],
  keyTerms: [
    { term: "Financial accounting", def: "Recording transactions and preparing statutory financial statements for external users to a prescribed format and timetable." },
    { term: "Management accounting", def: "Producing information for internal planning, decision-making and control, in whatever format is useful." },
    { term: "Treasury management", def: "The management of cash, liquidity, funding and financial risk including currency, interest rate and credit exposure." },
    { term: "Internal audit", def: "An independent assurance activity within an organisation evaluating risk management, internal control and governance, reporting to the audit committee." },
    { term: "Financial controller", def: "The role owning financial accounting, the ledgers, statutory accounts and the reporting timetable." },
    { term: "Credit control", def: "Assessing customer creditworthiness, setting credit limits and collecting receivables." },
  ],
  summary: [
    "The finance function comprises financial accounting, management accounting, treasury and internal audit.",
    "Financial accounting looks outward and backward to a prescribed format; management accounting looks inward and forward with no external rules.",
    "Management accounting trades precision for timeliness and can be prepared at any level of the organisation.",
    "Internal audit reports to the audit committee, not the finance director, because the finance function is one of the things it audits.",
    "Finance is a service function whose relationships with purchasing, operations, sales, HR, IT and distribution all run in both directions.",
    "Automation has moved the function's value from recording and reporting toward controlling and advising.",
    "Different users need different information: shareholders want returns and stewardship, lenders want liquidity and gearing, managers want decision support.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four main financial sub-functions?", a: "Financial accounting, management accounting, treasury, and internal audit." },
    { q: "Give three differences between financial and management accounting.", a: "Users (external vs internal), format (prescribed by standards vs whatever is useful), time focus (historic vs historic and forward-looking). Also frequency, coverage, precision, and whether it is legally required." },
    { q: "Why must internal audit not report to the finance director?", a: "Because the finance function is one of the areas it audits. Reporting to the CFO removes its independence structurally, so it reports to the audit committee instead." },
    { q: "What does treasury do?", a: "Manages cash and liquidity, invests surpluses, raises and manages borrowing, and manages financial risk including currency, interest rate and credit exposure." },
    { q: "What qualities make financial information useful?", a: "Relevance, reliability, timeliness, comparability, understandability and completeness — with a real trade-off between timeliness and accuracy that the two branches of accounting resolve in opposite directions." },
  ],
  furtherStudy: [
    "Financial accounting is developed in **FA** and **FR**; management accounting in **MA** and **PM**; treasury in **FM** and **AFM**; internal and external audit in **AA** and **AAA**.",
    "This chapter is effectively the map of the rest of the ACCA qualification.",
  ],
}

/* ── Chapter 13 · C3, C4 ───────────────────────────────────────── */

export const BT_TREE_13: StudyChapter = {
  id: "BT-13",
  number: 13,
  paper: "BT",
  area: "C",
  title: "Law, regulation and financial information",
  minutes: 15,
  syllabusRefs: ["C3(a)", "C3(b)", "C3(c)", "C4(a)", "C4(b)", "C4(c)"],
  intro:
    "Financial statements are not simply management's opinion of how the year went. This chapter is about why they are regulated, who does the regulating, and where the information in them comes from.",
  outcomes: [
    "Explain why accounting and financial reporting are regulated",
    "Identify the main sources of regulation: law, accounting standards and stock exchange rules",
    "Explain the role of the external auditor and the meaning of an audit opinion",
    "Distinguish internal from external sources of financial information",
    "Explain the purpose of management information and the qualities it needs",
  ],
  sections: [
    {
      id: "why-regulate",
      heading: "Why financial reporting is regulated",
      blocks: [
        {
          kind: "text",
          md: "Financial statements are prepared by the very people whose performance they report on. That is the whole problem, and regulation is the answer to it.",
        },
        {
          kind: "list",
          title: "What regulation is for",
          items: [
            "**Protecting users who cannot demand information themselves.** A small shareholder or a prospective supplier has no power to insist on data; regulation gives them a guaranteed minimum.",
            "**Comparability.** Without common rules, two identical businesses could report very different results, and no user could compare them.",
            "**Credibility.** Regulated statements audited by an independent professional can be relied upon, which lowers the cost of capital for everybody.",
            "**Managing the agency problem.** Directors reporting on their own stewardship have an incentive to present it favourably; rules limit how far they can.",
            "**Efficient capital markets.** Investors price risk on reported information, so unreliable reporting misallocates capital across the whole economy.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Regulation limits discretion, it does not remove judgement",
          md: "Accounting standards constrain choices; they do not eliminate them. Useful lives, provisions, impairment and revenue timing all still require **judgement**, which is exactly why an independent audit is needed on top of the rules, and why Chapters 25–26's ethics matter to a preparer.",
        },
      ],
    },
    {
      id: "sources-of-regulation",
      heading: "Where the rules come from",
      blocks: [
        {
          kind: "table",
          caption: "The three sources, and what each contributes",
          head: ["Source", "What it governs", "Example of its reach"],
          rows: [
            ["**National law**", "Who must prepare accounts, what must be filed and by when, directors' duties, audit requirements, penalties", "A company law statute requiring annual accounts to be filed and directors to be liable for them"],
            ["**Accounting standards**", "HOW transactions and balances are recognised, measured, presented and disclosed", "IFRS Accounting Standards, issued by the International Accounting Standards Board and adopted by many jurisdictions"],
            ["**Stock exchange rules**", "Additional obligations for listed companies — interim reporting, prompt disclosure of price-sensitive information, governance reporting", "A listing rule requiring half-yearly results and a governance statement against a code"],
          ],
        },
        {
          kind: "definition",
          term: "Accounting standards",
          md: "Authoritative rules on how particular transactions and balances must be recognised, measured, presented and disclosed. They exist to make financial statements **comparable** between entities and **consistent** over time, and are set by an independent standard-setting body rather than by preparers.",
        },
        {
          kind: "list",
          title: "The bodies whose roles the syllabus expects",
          items: [
            "**The standard-setter** — develops and issues accounting standards through a public due process (the IASB internationally).",
            "**National regulators and enforcement bodies** — review published accounts and can require restatement.",
            "**The auditing standard-setter** — issues the standards auditors must follow (International Standards on Auditing).",
            "**Professional accountancy bodies** such as ACCA — set entry qualifications, issue ethical codes, and discipline members. See Chapter 25.",
            "**Stock exchanges** — impose continuing obligations as a condition of listing.",
          ],
        },
      ],
    },
    {
      id: "external-audit",
      heading: "The external audit",
      blocks: [
        {
          kind: "definition",
          term: "External audit",
          md: "An **independent examination** of a set of financial statements, which ends in a published **opinion**: do these statements, measured against the applicable reporting framework, present a *true and fair view* (in some frameworks, are they *presented fairly*)? The auditor is appointed by the **shareholders** and reports to them — not to the management who prepared the statements.",
        },
        {
          kind: "table",
          caption: "Internal and external audit compared — a guaranteed exam topic",
          head: ["", "Internal audit", "External audit"],
          rows: [
            ["Appointed by", "The organisation, via the audit committee", "The shareholders"],
            ["Reports to", "The audit committee and the board", "The shareholders"],
            ["Objective", "Improve risk management, internal control and governance", "Give an opinion on the financial statements"],
            ["Scope", "Set by the organisation — anything it chooses", "Set by law and auditing standards"],
            ["Legally required", "Generally no, though governance codes may expect it", "Yes for most companies above a size threshold"],
            ["Status", "Usually employees of the organisation", "Independent external firm"],
            ["Coverage", "Ongoing throughout the year", "Periodic, focused on the financial statements"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What an audit is NOT",
          md: "An audit is **not** a guarantee that the statements are free from error, **not** a check of every transaction, **not** an assurance that the business will survive, and **not** a detection service for all fraud. It is a **reasonable assurance** engagement based on sampling and risk assessment. The gap between what an audit provides and what the public believes it provides has a name — the **expectation gap** — and it is examinable.",
        },
        {
          kind: "illustration",
          title: "Why the auditor reports to shareholders and not to the board",
          md: "If management appointed and paid the auditor and received the report privately, an auditor who found a problem would be reporting it to the people who caused it, and could be replaced for doing so.\n\nSo the appointment sits with shareholders at the AGM, the report is addressed to shareholders and published, and the audit committee — independent non-executives — recommends the appointment and reviews the fee. Every part of that arrangement exists to make it structurally possible for an auditor to say something management does not want said.",
        },
      ],
      check: {
        q: "Which statement about external audit is correct?",
        options: [
          "The external auditor is appointed by the board of directors and reports to them",
          "An external audit provides absolute assurance that the financial statements contain no errors",
          "The external auditor reports an opinion to shareholders: do these statements present a true and fair view?",
          "The external auditor's main purpose is to detect fraud",
        ],
        correct: 2,
        explain:
          "The external auditor is appointed by the SHAREHOLDERS and reports to them, answering one question: do these statements present a true and fair view? Note what the answer is — an OPINION carrying REASONABLE rather than absolute assurance, because it rests on sampling and risk assessment. Fraud detection is not its purpose either. The gap between what an audit delivers and what users assume it delivers is the expectation gap.",
      },
    },
    {
      id: "sources-of-information",
      heading: "Internal and external sources of information",
      blocks: [
        {
          kind: "table",
          caption: "Where an organisation's information comes from",
          head: ["Internal sources", "External sources"],
          rows: [
            ["The accounting system — ledgers, invoices, payroll", "Published financial statements of competitors and customers"],
            ["Production and inventory records", "Government statistics on inflation, employment and output"],
            ["Sales orders, customer records, the CRM system", "Trade association and industry data"],
            ["Timesheets and HR records", "Market research and consumer surveys"],
            ["Budgets, forecasts and prior management reports", "Credit reference agency reports"],
            ["Machine and process data, increasingly automated", "Banks, brokers, professional advisers and the press"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Judging a source",
          md: "Ask three questions of any external source: **who produced it and why** (is there an interest in the conclusion?), **when** (is it still current?), and **on what basis** (sample size, definitions, coverage). A trade association's figures on its own industry's prospects are useful and are not disinterested.",
        },
        {
          kind: "definition",
          term: "Management information",
          md: "Information produced to help managers **plan, decide and control**. It differs from raw data in being **selected, summarised, compared and interpreted** for a specific decision — data becomes information only when it can change what someone does.",
        },
        {
          kind: "activity",
          title: "Activity 14 — turning data into information",
          prompt:
            "A regional sales manager receives a monthly report listing every one of the 1,840 invoices raised in her region, in invoice-number order, showing customer name and value.\n\nExplain why this is data rather than management information, and state three changes that would make it useful.",
          answer:
            "**Why it is data.** It is complete, accurate and entirely unusable. It has been **selected** for nothing, **summarised** at no level, **compared** with nothing, and **interpreted** not at all — so it cannot change a single decision the manager might take. Information is data that has been processed to answer a question, and this report does not know what question it is for.\n\n**Three changes.** (1) **Summarise and compare** — total by customer and by product against budget and against the same month last year, so variances are visible instead of having to be constructed. (2) **Apply exception reporting** — show only the customers whose volume moved by more than, say, 15%, or whose balance is overdue, so attention goes where it is needed rather than being spread across 1,840 lines. (3) **Add the decision-relevant dimension the report omits entirely — margin.** Invoice value tells her what was sold, not whether it was worth selling; a low-margin customer with rising volume is a problem this report presents as good news.\n\n**Underlying point:** more data is not more information. Adding the other 900 invoices from a second region would make this report worse, not better.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Saying the external auditor is appointed by and reports to the directors.",
      fix: "Appointed by and reporting to the SHAREHOLDERS. That is what makes it structurally possible to report against management.",
    },
    {
      trap: "Describing an audit as giving absolute assurance or as a full fraud check.",
      fix: "It gives REASONABLE assurance on the financial statements, based on sampling and risk. The difference from public expectation is the expectation gap.",
    },
    {
      trap: "Mixing up internal and external audit.",
      fix: "Internal: appointed by the organisation, reports to the audit committee, scope set internally, covers risk, control and governance. External: appointed by shareholders, reports to them, scope set by law, opines on the financial statements.",
    },
    {
      trap: "Treating accounting standards as removing all judgement.",
      fix: "They constrain choice but leave judgement over useful lives, provisions, impairment and revenue timing — which is why an independent audit is still needed.",
    },
    {
      trap: "Calling a long, complete listing of transactions 'management information'.",
      fix: "Data becomes information only when selected, summarised, compared and interpreted for a decision. Volume is not usefulness.",
    },
  ],
  keyTerms: [
    { term: "Accounting standards", def: "Authoritative rules on how transactions and balances are recognised, measured, presented and disclosed, to make statements comparable and consistent." },
    { term: "External audit", def: "An independent examination of a set of financial statements, ending in a published opinion for shareholders on whether those statements present a true and fair view." },
    { term: "Expectation gap", def: "The difference between what an audit actually provides and what users commonly believe it provides." },
    { term: "Reasonable assurance", def: "The high but not absolute level of assurance an audit provides, reflecting its reliance on sampling and risk assessment." },
    { term: "Management information", def: "Data selected, summarised, compared and interpreted so that it can support a specific management decision." },
    { term: "Exception reporting", def: "Reporting only items falling outside expected limits, so management attention is directed where it is needed." },
  ],
  summary: [
    "Reporting is regulated because it is prepared by the people it reports on, and users need comparability, credibility and protection.",
    "The three sources of regulation are national law, accounting standards and stock exchange rules.",
    "Standards constrain discretion but leave judgement, which is why an independent audit is needed on top of them.",
    "The external auditor is appointed by shareholders and reports to them, offering reasonable assurance that the statements present a true and fair view.",
    "Internal audit serves the board on risk, control and governance; external audit serves shareholders on the financial statements.",
    "Information comes from internal records and external sources, and every external source should be judged on who produced it, when and on what basis.",
    "Data becomes management information only once it is selected, summarised, compared and interpreted for a decision.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is financial reporting regulated?", a: "Because statements are prepared by the people whose performance they report. Regulation protects users who cannot demand information, secures comparability and credibility, manages the agency problem and supports efficient capital markets." },
    { q: "What are the three sources of accounting regulation?", a: "National law (who must report and file), accounting standards (how items are recognised, measured and disclosed) and stock exchange rules (extra obligations for listed companies)." },
    { q: "Who appoints the external auditor and who receives the report?", a: "The shareholders appoint the auditor and the report is addressed to them. This makes it structurally possible to report something management would prefer unsaid." },
    { q: "What is the expectation gap?", a: "The difference between what an audit provides — reasonable assurance on the financial statements based on sampling — and what users often assume, such as absolute accuracy, a survival guarantee or full fraud detection." },
    { q: "When does data become management information?", a: "When it has been selected, summarised, compared and interpreted for a particular decision — that is, when it is capable of changing what someone does." },
  ],
  furtherStudy: [
    "The regulatory framework and the conceptual basis of reporting are examined in **FA** and **FR**, and critically in **SBR**.",
    "The audit opinion, materiality and the expectation gap are core **AA** topics.",
  ],
}

/* ── Chapter 14 · C5 ───────────────────────────────────────────── */

export const BT_TREE_14: StudyChapter = {
  id: "BT-14",
  number: 14,
  paper: "BT",
  area: "C",
  title: "Financial systems, procedures and IT applications",
  minutes: 16,
  syllabusRefs: ["C5(a)", "C5(b)", "C5(c)", "C5(d)", "C5(e)"],
  intro:
    "Every transaction an organisation enters into runs through a system with a defined path: an event, a document, an authorisation, a record, a payment. This chapter walks the main cycles and the IT that now runs them.",
  outcomes: [
    "Explain the purpose of a financial system and identify the main business cycles",
    "Describe the documents and stages of the purchases, sales, payroll and cash cycles",
    "Explain the purpose of ledgers, control accounts and reconciliations",
    "Describe the main types of accounting software and the role of an integrated ERP system",
    "Explain the benefits and risks of automating financial processes",
  ],
  sections: [
    {
      id: "why-systems",
      heading: "What a financial system is for",
      blocks: [
        {
          kind: "definition",
          term: "Financial system",
          md: "The combination of **procedures, documents, records and software** through which an organisation captures, processes, records and reports its transactions — and through which it controls them.",
        },
        {
          kind: "list",
          title: "What the system has to deliver",
          items: [
            "**Completeness** — every transaction that occurred is captured, and none is omitted.",
            "**Accuracy** — each is recorded at the right amount, in the right account, in the right period.",
            "**Validity** — only genuine, authorised transactions are recorded at all.",
            "**Timeliness** — records are current enough to be acted on and reported from.",
            "**An audit trail** — any figure can be traced back to the document and the authorisation behind it.",
            "**Security** — data is protected from unauthorised access and from loss.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the audit trail matters more than it sounds",
          md: "An audit trail is what makes every other assurance possible. Without the ability to trace a balance back to a document and an approval, nobody — internal audit, the external auditor, or a manager investigating a variance — can tell whether a figure is right. It is also the first thing a fraud tries to break (Chapter 16).",
        },
      ],
    },
    {
      id: "the-cycles",
      heading: "The four transaction cycles",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The purchases cycle",
            caption: "Each stage produces a document, and each document is a control point.",
            data: {
              steps: [
                { label: "Requisition", sub: "a need is identified and requested internally" },
                { label: "Purchase order", sub: "authorised order sent to a chosen supplier" },
                { label: "Goods received note", sub: "delivery checked against the order for quantity and condition" },
                { label: "Purchase invoice", sub: "matched to the order and the GRN — the three-way match" },
                { label: "Payment", sub: "authorised, made, and recorded in the payables ledger and cash book" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three-way match",
          md: "A purchase invoice should be paid only when it agrees with the **purchase order** (we agreed to buy this, at this price) and the **goods received note** (we actually received it). Any one of the three alone proves nothing: an invoice with no order may be for goods nobody authorised; an order with no GRN may be for goods never delivered. This single control prevents a large share of both error and supplier fraud.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The sales cycle",
            caption: "Note where the credit check sits — before despatch, not after.",
            data: {
              steps: [
                { label: "Customer order", sub: "received and recorded" },
                { label: "Credit check", sub: "customer's limit and payment history verified BEFORE goods leave" },
                { label: "Despatch note", sub: "goods sent, and the despatch evidenced" },
                { label: "Sales invoice", sub: "raised from the despatch note at authorised prices" },
                { label: "Receipt and collection", sub: "cash banked, receivables ledger updated, overdue balances chased" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The payroll and cash cycles",
          head: ["Cycle", "Key stages", "The control that matters most"],
          rows: [
            ["**Payroll**", "Record hours or salary → calculate gross pay → apply statutory and voluntary deductions → authorise the payroll → pay → account for employer costs and remit deductions", "Starters, leavers and changes to pay must be authorised INDEPENDENTLY of whoever runs the payroll — otherwise a fictitious employee can be created and paid"],
            ["**Cash**", "Receipts recorded and banked promptly and intact → payments authorised → bank reconciliation performed → petty cash held on an imprest system", "Segregation between the person who handles cash and the person who records it, plus an independent bank reconciliation"],
          ],
        },
        {
          kind: "definition",
          term: "Imprest system",
          md: "A petty cash system in which the float is restored to a **fixed amount** each period by reimbursing exactly the total of the vouchers submitted. Because cash plus vouchers must always equal the float, any shortfall is immediately visible.",
        },
      ],
      check: {
        q: "In the purchases cycle, what is the purpose of matching the purchase invoice to both the purchase order and the goods received note?",
        options: [
          "To calculate the correct sales margin on the goods",
          "To confirm the purchase was authorised AND that the goods were actually received",
          "To satisfy the requirements of the payroll system",
          "To determine which supplier offers the lowest price",
        ],
        correct: 1,
        explain:
          "The three-way match confirms two separate things: the purchase ORDER shows the purchase was authorised at an agreed price, and the GOODS RECEIVED NOTE shows the goods actually arrived. An invoice alone proves neither. This is why the control prevents both error and supplier fraud — paying for goods nobody ordered, or for goods that were never delivered.",
      },
    },
    {
      id: "ledgers-and-reconciliation",
      heading: "Ledgers, control accounts and reconciliations",
      blocks: [
        {
          kind: "table",
          caption: "The ledgers a financial system maintains",
          head: ["Ledger", "Contains"],
          rows: [
            ["General (nominal) ledger", "All accounts feeding the financial statements — the master record"],
            ["Receivables (sales) ledger", "A personal account for each credit customer"],
            ["Payables (purchase) ledger", "A personal account for each credit supplier"],
            ["Cash book", "Receipts and payments through the bank"],
            ["Inventory records", "Quantities and values held, by item"],
            ["Fixed asset register", "Each non-current asset, its cost, depreciation and location"],
          ],
        },
        {
          kind: "definition",
          term: "Control account",
          md: "A general ledger account holding the **total** of a set of individual accounts — for example a receivables control account holding the total of every customer's balance. Because the two are built from the same transactions by different routes, agreeing them detects errors in either.",
        },
        {
          kind: "list",
          title: "The reconciliations a well-run system performs",
          items: [
            "**Bank reconciliation** — cash book against the bank statement, explaining every difference. Performed by someone who neither handles nor records the cash.",
            "**Receivables control account reconciliation** — the control account total against the sum of individual customer balances.",
            "**Payables control account reconciliation** — the same for suppliers, and supplier statements agreed to our records.",
            "**Inventory reconciliation** — physical counts against the inventory records, with differences investigated rather than simply adjusted.",
            "**Fixed asset verification** — the register against the assets that physically exist.",
            "**Payroll reconciliation** — the payroll total against the general ledger and against the amounts remitted to the tax authority.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A reconciliation only works if the difference is EXPLAINED",
          md: "Forcing a reconciliation to balance with an unexplained adjustment defeats its entire purpose — it converts a control that detects fraud and error into a procedure that conceals them. Expect a question where an unexplained balancing figure is the correct answer to \"identify the control weakness\".",
        },
      ],
    },
    {
      id: "it-applications",
      heading: "The IT that runs the system",
      blocks: [
        {
          kind: "table",
          caption: "Types of financial software",
          head: ["Type", "What it does", "Suits"],
          rows: [
            ["Spreadsheets", "Flexible modelling and ad hoc analysis", "Analysis and forecasting — NOT a system of record"],
            ["Standalone accounting packages", "Ledgers, invoicing and reporting for one entity", "Small and medium organisations"],
            ["Modular packages", "Separate but linked modules — sales, purchases, payroll, inventory", "Growing organisations able to add functions"],
            ["**Integrated ERP**", "One database serving every function: finance, operations, HR, supply chain, CRM", "Larger organisations needing a single source of truth"],
            ["Cloud-hosted systems", "Any of the above delivered as a service over the internet", "Organisations wanting low up-front cost, remote access and automatic updates"],
          ],
        },
        {
          kind: "definition",
          term: "Enterprise resource planning (ERP)",
          md: "A single integrated system with **one shared database** across all functions, so a transaction entered once updates every affected record. A sales order simultaneously reserves inventory, schedules production, creates the receivable and updates the forecast.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Integrated ERP weighed up",
            caption: "Integration is the benefit and the risk, for the same reason.",
            data: {
              leftTitle: "Benefits",
              rightTitle: "Risks and costs",
              rows: [
                { aspect: "Data", left: "One version of the truth; no reconciliation between systems", right: "One error propagates everywhere immediately" },
                { aspect: "Efficiency", left: "Entered once, used everywhere; no duplicate keying", right: "Very high implementation cost and long timescale" },
                { aspect: "Reporting", left: "Real-time, cross-functional visibility", right: "Reports may need customisation to be useful" },
                { aspect: "Process", left: "Standardised, disciplined processes across the organisation", right: "The business often has to change to fit the software" },
                { aspect: "Continuity", left: "Fewer interfaces to fail", right: "Single point of failure; heavy dependence on one supplier" },
                { aspect: "Control", left: "Access rights, audit trail and validation built in", right: "Access rights become critical — one over-privileged account defeats segregation of duties" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The spreadsheet risk BT expects you to name",
          md: "Spreadsheets are indispensable for analysis and dangerous as records. They typically have **no audit trail**, **no access control**, **no version control** and **no validation**, formulae are easily overwritten, and a single mis-set range can corrupt a total silently. A material figure that exists only in a spreadsheet is a control weakness — and a very common one in real finance functions.",
        },
        {
          kind: "activity",
          title: "Activity 15 — automation and control",
          prompt:
            "A company introduces software that automatically matches purchase invoices to orders and goods received notes and pays those that agree, with no human intervention.\n\nState two controls that become MORE important and one control that becomes less relevant.",
          answer:
            "**More important — 1: control over the master data and the matching rules.** The tolerance the software accepts, the supplier bank details it pays to, and who can change either are now the whole control. Anyone able to amend a supplier's bank account can divert every future payment to that supplier automatically and at speed. Change control over master data becomes the single highest-risk area.\n\n**More important — 2: exception handling and review of what the system passed.** Automation processes the matching cases perfectly and hands a human only the failures, so someone must own those exceptions, and someone independent must periodically test that items which *should* have failed did not slip through. Automated does not mean assured.\n\n**Less relevant: manual clerical checking of every invoice's arithmetic and coding.** The software performs this consistently and does not tire, so re-performing it by hand adds cost without adding assurance.\n\n**The general lesson:** automation does not reduce the need for control, it **relocates** it — from checking transactions to controlling the system, its data and its exceptions.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Thinking a purchase invoice alone justifies payment.",
      fix: "Match it to the purchase order (authorised, agreed price) AND the goods received note (actually received). One document proves nothing.",
    },
    {
      trap: "Placing the customer credit check after despatch.",
      fix: "It must come BEFORE goods leave. Checking creditworthiness after delivery discovers a problem you can no longer avoid.",
    },
    {
      trap: "Treating a reconciliation as complete once it balances.",
      fix: "Differences must be EXPLAINED. An unexplained balancing adjustment turns a detective control into a concealment mechanism.",
    },
    {
      trap: "Letting the person who runs payroll also authorise starters, leavers and pay changes.",
      fix: "Those authorisations must be independent of payroll processing, otherwise a fictitious employee can be created and paid undetected.",
    },
    {
      trap: "Assuming automation removes the need for controls.",
      fix: "It relocates them — onto master data, change control, access rights and exception review. Supplier bank details become the critical control point.",
    },
    {
      trap: "Relying on a spreadsheet as a system of record.",
      fix: "Spreadsheets typically lack an audit trail, access control, version control and validation. Excellent for analysis, unsafe as a record.",
    },
  ],
  keyTerms: [
    { term: "Financial system", def: "The procedures, documents, records and software through which transactions are captured, processed, recorded, reported and controlled." },
    { term: "Audit trail", def: "The ability to trace any recorded figure back to its source document and authorisation." },
    { term: "Three-way match", def: "Agreeing a purchase invoice to both the purchase order and the goods received note before payment." },
    { term: "Goods received note", def: "The document evidencing that a delivery was received and checked against the order." },
    { term: "Control account", def: "A general ledger account holding the total of a set of individual accounts, so the two can be agreed." },
    { term: "Bank reconciliation", def: "Agreeing the cash book to the bank statement and explaining every difference, performed independently of cash handling and recording." },
    { term: "Imprest system", def: "A petty cash system restoring the float to a fixed amount each period, so cash plus vouchers always equals the float." },
    { term: "Enterprise resource planning", def: "An integrated system with one shared database across all functions, so a transaction entered once updates every affected record." },
  ],
  summary: [
    "A financial system must deliver completeness, accuracy, validity, timeliness, an audit trail and security.",
    "The purchases cycle runs requisition → order → goods received note → invoice → payment, with the three-way match as its key control.",
    "The sales cycle runs order → credit check → despatch → invoice → receipt, and the credit check must precede despatch.",
    "Payroll's critical control is authorising starters, leavers and pay changes independently of processing; cash's is segregation plus independent bank reconciliation.",
    "Control accounts and reconciliations detect error and fraud, but only when differences are explained rather than forced.",
    "Integrated ERP gives one version of the truth at the price of high cost, process change and a single point of failure.",
    "Automation relocates control onto master data, change control, access rights and exception review rather than removing it.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the stages of the purchases cycle?", a: "Requisition, purchase order, goods received note, purchase invoice, payment — with the invoice matched to the order and the GRN before it is paid." },
    { q: "What is the three-way match and why does it work?", a: "Agreeing the invoice to the purchase order and the goods received note. The order proves the purchase was authorised at an agreed price; the GRN proves the goods arrived. Neither document alone establishes both." },
    { q: "What is a control account?", a: "A general ledger account holding the total of a set of individual accounts, such as all customer balances. Because the two totals are built by different routes from the same transactions, agreeing them detects errors." },
    { q: "Why must a bank reconciliation be performed independently?", a: "Because someone who both handles and records cash could conceal a misappropriation by adjusting the reconciliation. Independence is what makes it a control rather than a formality." },
    { q: "How does automation change the control requirement?", a: "It relocates it. Transaction-level checking becomes unnecessary, while control over master data (especially supplier bank details), the matching rules, access rights and exception review becomes critical." },
  ],
  furtherStudy: [
    "These cycles and their controls are the foundation of **FA**'s double entry and of **AA**'s tests of control over sales, purchases, payroll, cash and inventory.",
    "Chapter 15 takes the same cycles and asks what controls should operate over them; Chapter 16 asks how they get defeated.",
  ],
}

/* ── Chapter 15 · C6 ───────────────────────────────────────────── */

export const BT_TREE_15: StudyChapter = {
  id: "BT-15",
  number: 15,
  paper: "BT",
  area: "C",
  title: "Internal control, security and compliance",
  minutes: 18,
  syllabusRefs: ["C6(a)", "C6(b)", "C6(c)", "C6(d)", "C6(e)"],
  intro:
    "Internal control is how an organisation makes it likely that things go right and unlikely that they go wrong. It is also the most reliably examined topic in Area C, and the one where a memorised mnemonic earns marks.",
  outcomes: [
    "Explain the purpose of internal control and the components of an internal control system",
    "Explain the control environment and why it determines whether controls work",
    "Classify controls as preventive, detective or corrective",
    "Apply the standard classification of control activities",
    "Explain segregation of duties and authorisation limits",
    "Explain IT and data security controls",
    "Explain the inherent limitations of any internal control system",
  ],
  sections: [
    {
      id: "purpose",
      heading: "What internal control is for",
      blocks: [
        {
          kind: "definition",
          term: "Internal control",
          md: "The **system of processes, policies and behaviours** designed to give reasonable assurance that an organisation will achieve its objectives — specifically that its operations are effective and efficient, its reporting is reliable, its assets are safeguarded, and it complies with laws and regulations.",
        },
        {
          kind: "list",
          title: "The four objectives internal control serves",
          items: [
            "**Effective and efficient operations** — the business runs as intended, without waste.",
            "**Reliable financial reporting** — the numbers can be depended on, internally and externally.",
            "**Safeguarding of assets** — cash, inventory, equipment, data and intellectual property are protected from loss, theft and misuse.",
            "**Compliance** with applicable laws and regulations — the topics of Chapter 3.",
          ],
        },
        {
          kind: "definition",
          term: "Control environment",
          md: "The **overall attitude, awareness and actions** of directors and management regarding internal control — the tone at the top. It is the foundation of the whole system, because it determines whether the individual controls are taken seriously or worked around.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the environment outranks the controls",
          md: "This is the link back to Chapter 9. If senior managers are visibly seen to bypass authorisation limits, approve their own expenses or override the system when it is inconvenient, then **every** control below them is weakened, no matter how well designed. A weak control environment is a more serious finding than a missing individual control, because it invalidates the rest of the system at once.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The components of an internal control system",
            caption: "The environment is the foundation. Remove it and everything above becomes decorative.",
            data: {
              levels: [
                { label: "Monitoring", sub: "Ongoing supervision plus periodic evaluation — internal audit, management review, exception reporting" },
                { label: "Information and communication", sub: "Getting the right information to the right people in time to act, and being able to report bad news upward" },
                { label: "Control activities", sub: "The specific controls: authorisation, segregation, reconciliation, physical controls, IT controls" },
                { label: "Risk assessment", sub: "Identifying and evaluating what could stop objectives being met, so controls are aimed at real risks" },
                { label: "Control environment", sub: "Tone at the top: integrity, ethical values, competence, governance, management's own behaviour" },
              ],
            },
          },
        },
      ],
      check: {
        q: "An organisation has well-documented authorisation limits, but the managing director routinely approves his own expense claims and instructs staff to process payments outside the limits when he considers it urgent. What is the most serious control weakness?",
        options: [
          "The authorisation limits are set at the wrong level",
          "The expense claim form is inadequately designed",
          "The control environment is weak, which undermines every other control",
          "There is no weakness, because the managing director has ultimate authority",
        ],
        correct: 2,
        explain:
          "This is a CONTROL ENVIRONMENT failure. Senior management visibly overriding the system teaches every employee that the controls are optional, which weakens all of them at once — including ones that are perfectly well designed. That is why the control environment is the foundation of the system, and why an auditor treats a management-override culture as a far more serious finding than any single missing control.",
      },
    },
    {
      id: "types-of-control",
      heading: "Classifying controls by when they act",
      blocks: [
        {
          kind: "table",
          caption: "Preventive, detective and corrective",
          head: ["Type", "Acts", "Examples"],
          rows: [
            ["**Preventive**", "BEFORE the event, to stop it happening", "Authorisation limits, segregation of duties, passwords, physical locks, credit checks, staff vetting, input validation"],
            ["**Detective**", "AFTER the event, to find that it happened", "Bank reconciliations, inventory counts, exception reports, variance analysis, internal audit testing, supplier statement agreement"],
            ["**Corrective**", "AFTER detection, to fix it and stop recurrence", "Investigating and correcting an error, recovering a loss, disciplinary action, redesigning the failed control, restoring from backup"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The pattern of the exam question",
          md: "You will be given a control and asked to classify it. Ask a single question: **does it act before the event or after it?** Before = preventive. After, to discover = detective. After, to put right = corrective. A reconciliation is always detective, however diligently it is done — it finds problems, it does not prevent them.",
        },
        {
          kind: "definition",
          term: "The standard classification of control activities",
          md: "A widely taught checklist, memorable as **SPAMSOAP**: **S**egregation of duties, **P**hysical controls, **A**uthorisation and approval, **M**anagement controls, **S**upervision, **O**rganisation, **A**rithmetical and accounting controls, **P**ersonnel controls.",
        },
        {
          kind: "table",
          caption: "SPAMSOAP unpacked",
          head: ["Control", "What it means in practice"],
          rows: [
            ["**Segregation of duties**", "No single person controls a transaction from start to finish"],
            ["**Physical controls**", "Locks, safes, restricted access, CCTV, asset tagging, secure storage"],
            ["**Authorisation and approval**", "Transactions approved by someone with the authority and the information to judge them"],
            ["**Management controls**", "Budgets, variance analysis, internal audit, management review outside the routine processing"],
            ["**Supervision**", "Day-to-day oversight of the work as it is done"],
            ["**Organisation**", "A clear structure with defined responsibilities and reporting lines — Chapter 8's work"],
            ["**Arithmetical and accounting**", "Control accounts, reconciliations, sequence checks, batch totals, trial balance"],
            ["**Personnel controls**", "Recruiting competent people, training, vetting, rotation of duties, mandatory holidays"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why mandatory holidays are a control",
          md: "It looks like a benefit and it is a fraud control. Many concealment schemes need **continuous** attention — a lapping fraud on customer receipts has to be reworked constantly. Forcing the person to take two consecutive weeks away, with someone else doing the job, is one of the cheapest detective controls available. The same logic makes **rotation of duties** a control rather than a training measure.",
        },
      ],
    },
    {
      id: "segregation",
      heading: "Segregation of duties",
      blocks: [
        {
          kind: "definition",
          term: "Segregation of duties",
          md: "Dividing a transaction so that **no one person** performs more than one of these four roles: **authorising** it, **executing** it, **recording** it, and having **custody** of the related asset. Combining any two creates the opportunity both to commit an irregularity and to conceal it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The four roles that must be separated",
            caption: "One person holding two of these can act AND hide it. That combination is what segregation exists to prevent.",
            data: {
              items: [
                { title: "Authorisation", sub: "Approving that the transaction should happen at all" },
                { title: "Execution", sub: "Actually carrying it out — placing the order, making the payment" },
                { title: "Recording", sub: "Entering it in the accounting records" },
                { title: "Custody", sub: "Physical control of the cash, inventory or asset involved" },
              ],
            },
          },
        },
        {
          kind: "example",
          title: "Worked example — find the segregation failures",
          scenario:
            "At Hartwell Ltd, one accounts assistant opens the post containing customer cheques, records the receipts in the receivables ledger, prepares the bank deposit, takes it to the bank, and performs the monthly bank reconciliation. She also sets up new customer accounts on the system.",
          steps: [
            { label: "Identify the roles she performs", detail: "CUSTODY (she physically holds the cheques), RECORDING (she posts the receipts), EXECUTION (she banks them), and she performs the DETECTIVE control that would find a problem (the bank reconciliation). She additionally has AUTHORISATION power over customer master data." },
            { label: "The core failure", detail: "Custody plus recording. Someone who holds the asset and writes the record can misappropriate a receipt and post the entry to conceal it — for example crediting the customer from a later receipt, which is teeming and lading." },
            { label: "Why the reconciliation makes it worse, not better", detail: "The one control that would detect the concealment is performed by the person who created it. A detective control operated by the person it is meant to detect is not a control at all." },
            { label: "The master data risk", detail: "Being able to create customer accounts means she can create a fictitious customer, or alter an existing one, with no independent check." },
          ],
          result:
            "Four segregation failures. Minimum remediation: someone independent opens the post and lists receipts before they reach her; she may record OR bank, not both; the bank reconciliation must be performed and reviewed by someone with no cash-handling or recording role; and creating or amending customer master data must require independent authorisation. Note that none of this implies she is dishonest — segregation is about removing opportunity, not about suspecting individuals, and that framing earns marks.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The small-organisation problem",
          md: "In a business with three staff, full segregation is impossible. The correct answer is never \"segregate anyway\" — it is **compensating controls**: much closer owner involvement (opening bank statements personally, reviewing the reconciliation, approving all payments), plus rotation and mandatory holidays. Say this explicitly when a scenario describes a small entity, because the examiner is testing whether you can apply a principle to a constraint.",
        },
      ],
    },
    {
      id: "it-security",
      heading: "IT and data security controls",
      blocks: [
        {
          kind: "text",
          md: "Once the financial system is software (Chapter 14), most controls become IT controls. These are conventionally split into **general** controls over the IT environment as a whole and **application** controls over a particular system.",
        },
        {
          kind: "table",
          caption: "General and application controls",
          head: ["General IT controls", "Application controls"],
          rows: [
            ["Access control — unique user IDs, strong authentication, access rights by role, prompt removal of leavers", "Input validation — range checks, format checks, existence checks, mandatory fields"],
            ["Change control over programs and master data, with testing and approval before release", "Batch totals and control totals reconciled to expected values"],
            ["Segregation between development, testing and live environments", "Sequence checks on document numbers to detect gaps or duplicates"],
            ["Backup and disaster recovery, tested rather than merely documented", "Exception reports for transactions outside defined parameters"],
            ["Physical and environmental security of servers and network equipment", "Automated matching, such as the three-way purchase match"],
            ["Network security — firewalls, encryption in transit and at rest, patching, monitoring", "Audit trail logging of who entered or changed what, and when"],
          ],
        },
        {
          kind: "list",
          title: "The security threats to be able to name",
          items: [
            "**Unauthorised access** — weak or shared passwords, excessive access rights, dormant accounts of former staff.",
            "**Malware and ransomware** — introduced by attachments, downloads or removable media, encrypting or destroying data.",
            "**Phishing and social engineering** — deceiving a person rather than defeating a system, and the most common successful route in.",
            "**Data loss** — hardware failure, accidental deletion, or theft of a laptop or phone.",
            "**Data interception** — capture of unencrypted data in transit, especially over public networks.",
            "**Insider misuse** — a legitimate user exceeding their authority, which access controls alone cannot prevent.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Access rights are where segregation lives or dies",
          md: "In an integrated system, segregation of duties **is** the access-rights configuration. If one login can raise a purchase order, approve it, amend the supplier's bank details and release the payment, the organisation has no segregation whatever its organisation chart says. This is why user access reviews are a standard audit test and why change control over master data is the highest-risk area in an automated environment (Chapter 14, Activity 15).",
        },
        {
          kind: "activity",
          title: "Activity 16 — classify the controls",
          prompt:
            "Classify each as preventive, detective or corrective, and name the SPAMSOAP category it belongs to.\n\n(a) A payment over $50,000 requires two authorised signatories.\n(b) A monthly report lists all inventory items whose recorded quantity is negative.\n(c) After a ransomware incident, the company restores its systems from the previous night's backup and patches the vulnerability.\n(d) Staff handling cash are required to take two consecutive weeks' leave each year.",
          answer:
            "**(a) Preventive — Authorisation and approval.** It acts before the payment is made, requiring two people to approve it. Note it is also a segregation control, since it prevents one person releasing a large payment alone.\n\n**(b) Detective — Arithmetical and accounting.** A negative recorded quantity is impossible in reality, so the report finds errors or unrecorded movements after they have occurred. It cannot prevent them.\n\n**(c) Corrective.** The restore puts right what happened, and patching the vulnerability addresses recurrence. It sits under Management controls, though it also relies on the general IT control of tested backups. Note the backup itself is preventive of *loss* while the restore is corrective — the examiner accepts the distinction if you state it.\n\n**(d) Detective — Personnel controls.** Mandatory leave does not stop a fraud starting; it exposes a concealment that requires continuous attention, because someone else does the job for two weeks. This is the control candidates most often misclassify as preventive.",
        },
      ],
    },
    {
      id: "limitations",
      heading: "The limitations of any control system",
      blocks: [
        {
          kind: "text",
          md: "No internal control system, however well designed, gives absolute assurance. The syllabus expects the limitations, and they are also the honest answer to \"why did the controls not stop this?\"",
        },
        {
          kind: "list",
          title: "Inherent limitations",
          items: [
            "**Cost versus benefit** — a control costing more than the loss it prevents should not exist. Some risk is deliberately accepted.",
            "**Human error** — controls are operated by people who tire, misunderstand and make mistakes.",
            "**Management override** — those with authority can set controls aside, and controls cannot easily be designed against the people who design them.",
            "**Collusion** — segregation is defeated when two or more people cooperate.",
            "**Non-routine transactions** — controls are built for the routine, and the unusual transaction is where they have nothing to say.",
            "**Changing circumstances** — a control appropriate last year may not address this year's risk.",
            "**Judgement** — control design rests on judgements about likelihood and impact that can simply be wrong.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The sentence to be able to write",
          md: "Internal control provides **reasonable, not absolute, assurance**. That is not an excuse — it is the standard. It is also why detective controls and monitoring exist alongside preventive ones, and why internal audit's role is to keep testing whether the system still works.",
        },
      ],
      check: {
        q: "Which of the following is an inherent limitation of internal control rather than a fault in its design?",
        options: [
          "Authorisation limits have not been documented",
          "Two employees colluding to bypass segregation of duties",
          "The bank reconciliation is performed by the cashier",
          "Leavers' system access is never removed",
        ],
        correct: 1,
        explain:
          "COLLUSION is an inherent limitation: segregation of duties assumes people act independently, and no realistic control system can prevent two or more people cooperating to defeat it. The other three are design or operating FAILURES that could be fixed — documenting limits, giving the reconciliation to someone independent of cash handling, and removing leavers' access are all achievable.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Classifying a bank reconciliation as a preventive control.",
      fix: "It is DETECTIVE. It finds problems after they have happened; it cannot stop them occurring.",
    },
    {
      trap: "Classifying mandatory holidays as a staff benefit rather than a control.",
      fix: "It is a detective personnel control: concealment needing continuous attention is exposed when someone else covers the role.",
    },
    {
      trap: "Answering 'segregate the duties' for a three-person business.",
      fix: "Full segregation is impossible there. Recommend COMPENSATING controls — close owner involvement, personally opened bank statements, approval of all payments, rotation and mandatory leave.",
    },
    {
      trap: "Treating a missing individual control as more serious than a weak control environment.",
      fix: "A management-override culture weakens every control at once. The environment is the foundation and ranks above any single control.",
    },
    {
      trap: "Saying internal control prevents fraud and error.",
      fix: "It gives REASONABLE, not absolute, assurance. Cost-benefit, human error, management override, collusion and non-routine transactions are inherent limitations.",
    },
    {
      trap: "Ignoring access rights when discussing segregation in a computerised system.",
      fix: "In an integrated system, segregation IS the access configuration. One over-privileged login defeats the organisation chart entirely.",
    },
  ],
  keyTerms: [
    { term: "Internal control", def: "The system of processes, policies and behaviours giving reasonable assurance of effective operations, reliable reporting, safeguarded assets and compliance." },
    { term: "Control environment", def: "The overall attitude, awareness and actions of directors and management regarding internal control — the tone at the top." },
    { term: "Preventive control", def: "A control acting before an event to stop it happening, such as an authorisation limit or a password." },
    { term: "Detective control", def: "A control acting after an event to discover that it happened, such as a reconciliation or an inventory count." },
    { term: "Corrective control", def: "A control acting after detection to put matters right and prevent recurrence." },
    { term: "Segregation of duties", def: "Dividing a transaction so no one person authorises, executes, records and has custody of the related asset." },
    { term: "General IT controls", def: "Controls over the IT environment as a whole — access, change control, environment separation, backup and network security." },
    { term: "Application controls", def: "Controls within a particular system — input validation, batch totals, sequence checks, exception reports and audit trail logging." },
    { term: "Compensating control", def: "An alternative control introduced where the ideal control is impracticable, as when a small entity cannot fully segregate duties." },
  ],
  summary: [
    "Internal control gives reasonable assurance over operations, reporting, asset safeguarding and compliance.",
    "The control environment is the foundation: management override weakens every control above it at once.",
    "Controls are preventive (before), detective (after, to find) or corrective (after, to fix). A reconciliation is always detective.",
    "SPAMSOAP lists the control activities: segregation, physical, authorisation, management, supervision, organisation, arithmetical and personnel.",
    "Segregation separates authorisation, execution, recording and custody; combining two creates the ability to act and to conceal.",
    "Where segregation is impossible, compensating controls — owner involvement, rotation, mandatory leave — are the correct answer.",
    "In computerised systems, segregation is delivered by access rights, and master data change control becomes the critical risk.",
    "Cost-benefit, human error, management override, collusion, non-routine transactions and changing circumstances are inherent limitations.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four objectives of internal control?", a: "Effective and efficient operations, reliable financial reporting, safeguarding of assets, and compliance with laws and regulations." },
    { q: "Why is the control environment the most important component?", a: "Because it determines whether every other control is taken seriously. Visible management override teaches staff that controls are optional, weakening all of them at once." },
    { q: "What does SPAMSOAP stand for?", a: "Segregation of duties, Physical, Authorisation and approval, Management, Supervision, Organisation, Arithmetical and accounting, Personnel." },
    { q: "Which four roles must segregation of duties keep apart?", a: "Authorisation, execution, recording, and custody of the related asset. Holding any two allows a person both to commit and to conceal an irregularity." },
    { q: "Name four inherent limitations of internal control.", a: "Cost-benefit constraints, human error, management override, collusion between staff, non-routine transactions, changing circumstances, and errors of judgement in control design." },
  ],
  furtherStudy: [
    "Internal control and tests of control are central to **AA**, where you design procedures rather than classify controls, and to **AAA** at group level.",
    "Chapter 16 shows what happens when these controls are absent or defeated.",
  ],
}

/* ── Chapter 16 · C7 ───────────────────────────────────────────── */

export const BT_TREE_16: StudyChapter = {
  id: "BT-16",
  number: 16,
  paper: "BT",
  area: "C",
  title: "Fraud, fraudulent behaviour and its prevention",
  minutes: 17,
  syllabusRefs: ["C7(a)", "C7(b)", "C7(c)", "C7(d)", "C7(e)"],
  intro:
    "Fraud is not a random misfortune. It requires three specific conditions to be present at once, and every one of them is something an organisation can act on. This chapter is about recognising them and closing them off.",
  outcomes: [
    "Define fraud and distinguish it from error",
    "Explain the three conditions of the fraud triangle",
    "Identify the main types of fraud in a business, including financial statement fraud",
    "Explain the responsibilities of management, employees and auditors regarding fraud",
    "Describe the controls and cultural measures that prevent and detect fraud",
    "Explain money laundering and the accountant's obligations",
  ],
  sections: [
    {
      id: "fraud-vs-error",
      heading: "Fraud and error are not the same thing",
      blocks: [
        {
          kind: "definition",
          term: "Fraud",
          md: "A **deliberate** act, by one person or several, that uses **deception** to secure a gain the actor was **not entitled to** — or to avoid a loss they should have borne. Three elements have to be present together: it was intended, it involved deceiving someone, and it produced an advantage that was not properly due.",
        },
        {
          kind: "definition",
          term: "Error",
          md: "An **unintentional** misstatement or omission. The act may be identical to a fraud in its effect on the accounts; what differs is the **intent** behind it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why the distinction matters practically",
          md: "The **accounting** consequence may be the same, but the **response** is completely different. An error means the control failed and needs fixing. A fraud means someone chose to deceive, which raises questions about who else was involved, what else they touched, whether the concealment is still running, and whether the matter must be reported externally. Never describe a fraud as \"an error\" in an exam answer.",
        },
      ],
    },
    {
      id: "fraud-triangle",
      heading: "The fraud triangle",
      blocks: [
        {
          kind: "text",
          md: "Fraud requires **three** conditions simultaneously. Remove any one and the fraud does not happen — which is why the triangle is a practical prevention tool and not merely a description.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "The three conditions of the fraud triangle",
            caption: "All three must be present together. Prevention means attacking whichever is cheapest to remove.",
            data: {
              centre: "Fraud occurs",
              nodes: [
                { label: "Opportunity", sub: "weak controls, no segregation, no supervision, poor access control — the condition management controls most directly" },
                { label: "Motive / pressure", sub: "personal financial difficulty, addiction, unrealistic targets, fear of losing a job, a bonus within reach" },
                { label: "Rationalisation", sub: "'I am underpaid', 'it is only a loan', 'everyone does it', 'the company can afford it', 'I was told to hit the number'" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What an organisation can do about each condition",
          head: ["Condition", "How the organisation reduces it"],
          rows: [
            ["**Opportunity**", "Internal control — segregation, authorisation, reconciliation, access rights, supervision, rotation, mandatory leave. The most controllable of the three, and where most effort belongs"],
            ["**Motive / pressure**", "Realistic targets, fair pay, sensible incentive design, employee support and financial wellbeing provision, and not building bonus schemes that reward the appearance of results"],
            ["**Rationalisation**", "Culture and tone at the top, a visible code of ethics, consistent consequences, training, and a working whistleblowing route — Chapters 9, 25 and 26"],
          ],
        },
        {
          kind: "illustration",
          title: "How an incentive scheme manufactures its own fraud",
          md: "A sales division pays a bonus only if the annual target is met exactly — nothing at 99%, full bonus at 100%. In late December the division is 2% short.\n\nThe scheme has supplied **pressure** (a cliff-edge bonus), and it has supplied **rationalisation** (\"the orders are coming anyway, I am only recognising them a fortnight early\"). If the division can also raise sales invoices without an independent despatch check, it has supplied **opportunity** too — and all three conditions were created by the company's own design choices, not by dishonest people.\n\nThis is why the examiner treats aggressive targets and cliff-edge incentives as **fraud risk factors** rather than as motivational tools.",
        },
      ],
      check: {
        q: "Which element of the fraud triangle is most directly within management's control through the design of internal controls?",
        options: [
          "Motive, because management sets pay levels",
          "Rationalisation, because management sets the culture",
          "Opportunity, because controls remove the ability to commit and conceal the act",
          "None — the fraud triangle describes causes management cannot influence",
        ],
        correct: 2,
        explain:
          "OPPORTUNITY is the condition internal controls attack directly: segregation of duties, authorisation, reconciliation, access rights and supervision remove the ability both to commit a fraud and to conceal it. Management does influence motive (through targets and pay) and rationalisation (through culture and ethics), but those are slower, less certain levers — which is why control design is the primary defence.",
      },
    },
    {
      id: "types-of-fraud",
      heading: "Types of fraud",
      blocks: [
        {
          kind: "table",
          caption: "Fraud against the organisation — misappropriation of assets",
          head: ["Type", "How it works", "The control that catches it"],
          rows: [
            ["**Theft of cash or inventory**", "Straightforward removal of assets", "Physical controls, segregation, independent counts and reconciliations"],
            ["**Teeming and lading (lapping)**", "A receipt from customer A is taken, and later covered with a receipt from customer B, so a customer's balance is always being covered by a later one", "Independent listing of receipts at the point of opening post; independent bank reconciliation; mandatory leave, which breaks the required continuous attention"],
            ["**Ghost employees**", "A fictitious employee is added to payroll and their pay collected", "Independent authorisation of starters and pay changes; payroll reconciliation; checking bank details for duplicates"],
            ["**False or inflated invoices**", "Invoices from a fictitious supplier, or a real supplier's invoice inflated with a kickback", "Three-way match, approved supplier list, independent control over supplier master data"],
            ["**Expense claim fraud**", "Personal or duplicated expenses claimed", "Independent approval, receipts required, analytical review of patterns by claimant"],
            ["**Payment diversion**", "A genuine supplier's bank details are changed to the fraudster's account", "Change control and independent verification of any bank detail change, by callback to a known number"],
          ],
        },
        {
          kind: "definition",
          term: "Financial statement fraud",
          md: "Deliberate **misstatement of the financial statements** to mislead their users — as distinct from stealing assets. It is usually committed by **management** rather than by employees, is far larger in monetary effect, and is much harder to detect precisely because those committing it can override the controls.",
        },
        {
          kind: "list",
          title: "How financial statement fraud is typically done",
          items: [
            "**Early or fictitious revenue recognition** — recording sales before they are earned, or that never occurred.",
            "**Understating or deferring expenses and liabilities** — capitalising costs that should be expensed, or omitting known obligations.",
            "**Overvaluing assets** — inventory, receivables or goodwill carried above recoverable amount.",
            "**Manipulating provisions** — creating provisions in a good year and releasing them in a bad one to smooth reported profit.",
            "**Concealing related-party transactions** — hiding the connection so that a transaction appears arm's length.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Who commits which",
          md: "**Employees** misappropriate assets; **management** misstates financial statements. That is why financial statement fraud is the harder problem: the perpetrators are the people who design the controls, set the tone, and can instruct staff. It is also why governance (Chapter 11) — independent NEDs, an audit committee, an external auditor appointed by shareholders — is the control layer aimed at it.",
        },
      ],
    },
    {
      id: "responsibilities",
      heading: "Who is responsible for fraud",
      blocks: [
        {
          kind: "table",
          caption: "Responsibilities, precisely stated",
          head: ["Party", "Responsibility"],
          rows: [
            ["**Directors and management**", "PRIMARY responsibility for preventing and detecting fraud, through internal control, risk assessment and setting an ethical culture"],
            ["**Audit committee**", "Oversees the effectiveness of controls and of the whistleblowing arrangements, independently of management"],
            ["**Internal audit**", "Evaluates fraud risk and tests controls; may investigate. Does not carry primary responsibility for prevention"],
            ["**Employees**", "Comply with controls and policies, and report suspicions through the proper channel"],
            ["**External auditor**", "Obtains reasonable assurance the financial statements are free from material misstatement whether caused by fraud OR error — but detecting fraud is NOT the purpose of an audit"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The single most examined sentence on this topic",
          md: "Prevention and detection of fraud is the responsibility of **management**, not of the auditor. The auditor's responsibility is to obtain reasonable assurance about material misstatement, from whatever cause. Assigning the auditor primary responsibility is the expectation gap from Chapter 13, and it is a guaranteed wrong answer.",
        },
        {
          kind: "definition",
          term: "Whistleblowing",
          md: "An employee raising a concern about wrongdoing, through an internal channel or, where necessary, externally. For it to work the route must be **confidential**, must **bypass line management** (who may be implicated), must be **visibly acted on**, and the person raising it must be **protected from retaliation** — which employment law generally provides for (Chapter 3).",
        },
      ],
    },
    {
      id: "money-laundering",
      heading: "Money laundering",
      blocks: [
        {
          kind: "definition",
          term: "Money laundering",
          md: "The process of making the proceeds of crime appear to come from a **legitimate** source. It matters to an accountant because accountancy and audit services can be used, knowingly or not, to give criminal funds a respectable appearance.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The three stages",
            caption: "An accountant is most likely to encounter layering and integration, where the money already looks like ordinary business activity.",
            data: {
              steps: [
                { label: "Placement", sub: "criminal cash first enters the financial system — deposits, cash-intensive businesses" },
                { label: "Layering", sub: "complex transfers, entities and transactions obscure the origin" },
                { label: "Integration", sub: "the funds re-emerge as apparently legitimate income, investments or assets" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "The obligations an accountant typically carries",
          items: [
            "**Customer due diligence** — identify and verify who the client and its beneficial owners actually are, before acting.",
            "**Ongoing monitoring** — remain alert to transactions inconsistent with what is known about the client.",
            "**Record keeping** — retain identification and transaction records for the prescribed period.",
            "**Reporting suspicion** — report a suspicion internally to the nominated officer, or to the authorities as required. The test is **suspicion**, not proof.",
            "**Not tipping off** — do not tell the client that a report has been made or that an investigation may be underway.",
            "**Training** — staff must be trained to recognise and escalate the indicators.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The two points candidates get wrong",
          md: "**Suspicion, not proof.** The obligation to report arises on suspicion. Waiting until you can prove wrongdoing is itself a failure to comply.\n\n**Tipping off is a separate offence.** Warning the client — even with good intentions, even obliquely — is an offence in its own right, distinct from any failure to report. Note the tension with the duty of confidentiality: anti-money-laundering obligations **override** client confidentiality, which is one of the clearest cases where a professional duty is displaced by law (Chapter 26).",
        },
        {
          kind: "activity",
          title: "Activity 17 — a fraud scenario",
          prompt:
            "At Calder Ltd the credit controller has worked in the role for eleven years, has never taken more than three consecutive days' leave, opens the post, records customer receipts, banks them and prepares the receivables reconciliation. Receivables days have crept from 41 to 58 over two years with no change in credit terms. She recently declined a promotion that would have moved her to a different department.\n\nIdentify the fraud you would suspect, the evidence pointing to it, and three immediate actions.",
          answer:
            "**Suspected fraud: teeming and lading (lapping) of customer receipts.** She holds custody of incoming cheques, records them, banks them and performs the very reconciliation that would expose a discrepancy — the complete combination Chapter 15 warns about.\n\n**Evidence pointing to it.** (1) **Rising receivables days with unchanged credit terms** — consistent with receipts being taken and customer balances covered late, which delays every account by a few weeks. (2) **Never taking more than three days' leave in eleven years** — lapping requires continuous attention, because each covered balance must be covered again from a later receipt. (3) **Declining a promotion out of the department** — leaving the role would expose the position immediately, which makes an otherwise attractive move impossible to accept. Each fact is innocent alone; together they are a recognised pattern.\n\n**Three immediate actions.** (1) **Remove the segregation failure at once** — someone independent opens the post and lists receipts before she sees them, and the bank reconciliation is transferred to someone with no cash-handling or recording role. (2) **Investigate discreetly before confronting anyone** — reconcile receipts listed to amounts banked, agree a sample of customer statements directly with the customers, and analyse the ageing for balances repeatedly cleared just after month end. Doing this quietly matters: an early accusation risks both the evidence and, if the suspicion is wrong, a serious injustice to a long-serving employee. (3) **Escalate to the audit committee** and take advice on reporting obligations, including whether money-laundering reporting is engaged.\n\n**Note what is NOT an appropriate first action:** dismissing her. The suspicion is well founded but unproven, and Chapter 3's fair procedure applies regardless of how strong the pattern looks.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Saying the external auditor is responsible for preventing and detecting fraud.",
      fix: "MANAGEMENT carries primary responsibility. The auditor seeks reasonable assurance on material misstatement from fraud or error — detection is not the audit's purpose.",
    },
    {
      trap: "Describing a fraud as an error.",
      fix: "Fraud is intentional deception for advantage; error is unintentional. The accounting effect may match, but the response and reporting obligations differ completely.",
    },
    {
      trap: "Naming only opportunity when asked about fraud risk.",
      fix: "All three triangle conditions are needed: opportunity, motive or pressure, and rationalisation. Aggressive targets and cliff-edge bonuses supply the second and third.",
    },
    {
      trap: "Assuming fraud is always committed by junior employees.",
      fix: "Employees misappropriate assets; MANAGEMENT commits financial statement fraud, which is larger and harder to detect because they can override controls.",
    },
    {
      trap: "Waiting for proof before reporting a money laundering suspicion.",
      fix: "The test is SUSPICION, not proof. Delay pending proof is itself non-compliance.",
    },
    {
      trap: "Warning a client that a suspicion has been reported.",
      fix: "Tipping off is a separate offence. Anti-money-laundering obligations override the duty of client confidentiality.",
    },
  ],
  keyTerms: [
    { term: "Fraud", def: "A deliberate act that uses deception to secure a gain the actor was not entitled to, or to avoid a loss they should have borne." },
    { term: "Error", def: "An unintentional misstatement or omission, distinguished from fraud by the absence of intent." },
    { term: "Fraud triangle", def: "The three conditions required for fraud: opportunity, motive or pressure, and rationalisation." },
    { term: "Teeming and lading", def: "Misappropriating a customer receipt and concealing it with a later receipt from another customer, requiring continuous attention to sustain." },
    { term: "Financial statement fraud", def: "Deliberate misstatement of the financial statements to mislead users, usually committed by management." },
    { term: "Whistleblowing", def: "An employee raising a concern about wrongdoing through a confidential route that bypasses line management and protects them from retaliation." },
    { term: "Money laundering", def: "Making the proceeds of crime appear to derive from a legitimate source, through placement, layering and integration." },
    { term: "Customer due diligence", def: "Identifying and verifying a client and its beneficial owners before acting, as an anti-money-laundering requirement." },
    { term: "Tipping off", def: "Informing a client that a money laundering suspicion has been reported or an investigation may be underway — a separate offence." },
  ],
  summary: [
    "Fraud is intentional deception for advantage; error is unintentional. The response to each differs entirely.",
    "The fraud triangle requires opportunity, motive or pressure, and rationalisation together — removing any one prevents the fraud.",
    "Opportunity is the condition internal control attacks directly, and where most preventive effort belongs.",
    "Employees typically misappropriate assets; management commits financial statement fraud, which is larger and harder to detect.",
    "Management carries primary responsibility for prevention and detection — not the external auditor.",
    "Effective whistleblowing must be confidential, must bypass line management, must be acted on, and must protect the reporter.",
    "Money laundering runs through placement, layering and integration; an accountant must perform due diligence, report on suspicion rather than proof, and must not tip off.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes fraud from error?", a: "Intent. Fraud is an intentional act using deception to obtain an unjust advantage; error is unintentional. The effect on the accounts may be identical." },
    { q: "What are the three conditions of the fraud triangle?", a: "Opportunity (weak controls), motive or pressure (personal need, unrealistic targets), and rationalisation (a story that makes it acceptable). All three must be present." },
    { q: "Who has primary responsibility for preventing and detecting fraud?", a: "Directors and management, through internal control, risk assessment and setting an ethical culture. The external auditor seeks reasonable assurance on material misstatement, which is not the same thing." },
    { q: "What is teeming and lading, and which control exposes it?", a: "Taking a customer receipt and covering it with a later receipt from another customer. Mandatory leave exposes it, because the concealment needs continuous attention — as does independent listing of receipts and an independent bank reconciliation." },
    { q: "What are an accountant's main anti-money-laundering obligations?", a: "Customer due diligence, ongoing monitoring, record keeping, reporting on suspicion rather than proof, not tipping off, and training. These obligations override client confidentiality." },
  ],
  furtherStudy: [
    "Fraud risk assessment and the auditor's responsibilities are examined in depth in **AA** and **AAA**.",
    "The ethical dimension — being pressured to misstate, and what to do about it — is Chapter 26.",
  ],
}

/* ── Chapter 17 · C8 ───────────────────────────────────────────── */

export const BT_TREE_17: StudyChapter = {
  id: "BT-17",
  number: 17,
  paper: "BT",
  area: "C",
  title: "Financial technology and the future finance function",
  minutes: 16,
  syllabusRefs: ["C8(a)", "C8(b)", "C8(c)", "C8(d)"],
  intro:
    "This is the chapter that gives BT the words \"and Technology\" in its title. Fintech is changing what the finance function does, what an accountant is for, and where the risks now sit.",
  outcomes: [
    "Define financial technology and identify its main forms",
    "Explain big data, data analytics and the four types of analytics",
    "Explain artificial intelligence, machine learning and robotic process automation in a finance context",
    "Explain cloud computing, blockchain and distributed ledgers",
    "Explain the risks fintech introduces, including cyber risk and algorithmic bias",
    "Explain how fintech changes the accountant's role and the skills required",
  ],
  sections: [
    {
      id: "what-is-fintech",
      heading: "What fintech means",
      blocks: [
        {
          kind: "definition",
          term: "Financial technology (fintech)",
          md: "The use of **technology to deliver, improve or automate financial services and financial processes** — spanning payments, lending, insurance, investment, and the internal accounting and reporting processes of any organisation.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The main forms BT examines",
            caption: "Each is a distinct technology with distinct risks — do not treat them as one thing called 'digital'.",
            data: {
              items: [
                { title: "Big data & analytics", sub: "Very large, varied, fast-arriving datasets, and the techniques for extracting decisions from them." },
                { title: "Artificial intelligence & machine learning", sub: "Systems that infer patterns from data and improve with experience, rather than following coded rules." },
                { title: "Robotic process automation", sub: "Software 'robots' performing rule-based tasks across existing systems — the digital clerk." },
                { title: "Cloud computing", sub: "Computing delivered as a service over the internet, paid for as used." },
                { title: "Blockchain & distributed ledgers", sub: "Shared, replicated, cryptographically linked records that no single party controls." },
                { title: "Digital payments & open banking", sub: "Mobile and instant payments, and APIs that let authorised third parties access account data." },
              ],
            },
          },
        },
      ],
    },
    {
      id: "big-data",
      heading: "Big data and analytics",
      blocks: [
        {
          kind: "definition",
          term: "Big data — the four Vs",
          md: "**Volume** (far more data than conventional systems handle), **Velocity** (arriving continuously and needing processing in near real time), **Variety** (structured records alongside unstructured text, images, sensor readings and audio), and **Veracity** (uncertain accuracy and reliability, so quality must be actively managed).",
        },
        {
          kind: "table",
          caption: "The four types of analytics, in increasing order of value and difficulty",
          head: ["Type", "Question it answers", "Finance example"],
          rows: [
            ["**Descriptive**", "What happened?", "Last quarter's revenue by product and region"],
            ["**Diagnostic**", "Why did it happen?", "Variance analysis isolating which customers and discounts caused a margin fall"],
            ["**Predictive**", "What is likely to happen?", "Forecasting which receivables will become bad debts"],
            ["**Prescriptive**", "What should we do about it?", "Recommending the credit limit and payment terms that optimise margin against default risk"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Where the accountant's value now sits",
          md: "Descriptive analytics is being fully automated — a dashboard produces it. The professional contribution has moved to **diagnostic** and above: knowing which comparison is meaningful, which correlation is spurious, and which recommendation the business should act on. That is the same conclusion Chapter 12 reached about the function as a whole.",
        },
        {
          kind: "illustration",
          title: "The correlation that would have cost money",
          md: "An analysis finds that customers who call the support line twice in their first month have a 60% higher lifetime value. A proposal follows to encourage more support calls.\n\nThe correlation is real and the inference is wrong. Customers who call twice are those who **engaged with the product** — the calls are a symptom of engagement, not a cause of value. Encouraging calls would raise cost without raising value, and might even signal a product that is harder to use.\n\nNo amount of additional data would have prevented this. It needed someone to ask what the mechanism was — which is precisely the judgement that automation does not supply.",
        },
      ],
      check: {
        q: "A finance team builds a model that identifies which customer balances are most likely to become bad debts next quarter. Which type of analytics is this?",
        options: [
          "Descriptive analytics",
          "Diagnostic analytics",
          "Predictive analytics",
          "Prescriptive analytics",
        ],
        correct: 2,
        explain:
          "Forecasting what is LIKELY TO HAPPEN is PREDICTIVE analytics. Descriptive would report what the bad debts were last quarter; diagnostic would explain why they arose; and prescriptive would go one step further and recommend the specific credit limits and terms to apply in response.",
      },
    },
    {
      id: "ai-and-rpa",
      heading: "AI, machine learning and robotic process automation",
      blocks: [
        {
          kind: "definition",
          term: "Artificial intelligence and machine learning",
          md: "**AI** is the broad field of systems performing tasks that would otherwise need human intelligence. **Machine learning** is the subset in which a system **infers patterns from data** and improves with experience, rather than following rules a programmer wrote. The distinction matters for control: nobody can point to the line of code that made a machine learning decision.",
        },
        {
          kind: "definition",
          term: "Robotic process automation (RPA)",
          md: "Software \"robots\" that perform **rule-based, repetitive** tasks by operating existing applications the way a person would — logging in, reading a field, copying it, clicking. It is fast to deploy because it does not require changing the underlying systems, and it does **not** learn: it follows rules exactly, including when they are wrong.",
        },
        {
          kind: "table",
          caption: "RPA and machine learning compared",
          head: ["", "RPA", "Machine learning"],
          rows: [
            ["Basis", "Explicit rules, written by a person", "Patterns inferred from training data"],
            ["Suits", "High-volume, stable, rule-based tasks: reconciliations, data transfer, report production", "Judgement-like tasks with patterns: anomaly detection, classification, forecasting"],
            ["Explainability", "Fully explainable — you can read the rules", "Often limited; the 'black box' problem"],
            ["Failure mode", "Executes a wrong rule perfectly, at scale, until someone notices", "Learns and reproduces bias present in the training data"],
            ["Control focus", "Change control over the rules; exception handling", "Data quality, bias testing, human oversight of decisions"],
          ],
        },
        {
          kind: "list",
          title: "Where these are actually used in finance",
          items: [
            "**Invoice processing** — reading, matching and posting purchase invoices (Chapter 14).",
            "**Reconciliations** — matching bank, intercompany and control account items and presenting only exceptions.",
            "**Anomaly detection** — flagging journals, expense claims or payments that do not fit normal patterns, which is a genuine fraud control.",
            "**Forecasting** — cash flow and demand projection from historic and external data.",
            "**Audit sampling** — testing 100% of a population instead of a sample, which changes what audit evidence can be.",
            "**Report production** — assembling and distributing routine management reporting without human intervention.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Automation bias, and why human oversight is a control",
          md: "**Automation bias** is the tendency to trust a system's output because it came from a system. It is dangerous precisely because automated output is consistent, confident and fast, so an error is reproduced identically thousands of times before anyone questions it. The control is **meaningful human oversight** — a person who both can and does override the output, with the authority and the time to do so. Oversight that exists on paper but never disagrees with the machine is not a control.",
        },
      ],
    },
    {
      id: "cloud-and-blockchain",
      heading: "Cloud computing and distributed ledgers",
      blocks: [
        {
          kind: "definition",
          term: "Cloud computing",
          md: "Computing resources — storage, processing, applications — delivered as a **service over the internet** and paid for as used, rather than owned and run on the organisation's own premises.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Cloud, weighed up",
            caption: "The trade is capital cost and control for flexibility and resilience.",
            data: {
              leftTitle: "Benefits",
              rightTitle: "Risks",
              rows: [
                { aspect: "Cost", left: "No large up-front capital outlay; pay for what is used", right: "Ongoing cost can exceed ownership over time" },
                { aspect: "Scalability", left: "Capacity added or removed on demand", right: "Cost scales with use, sometimes unpredictably" },
                { aspect: "Access", left: "Available anywhere, supporting remote and hybrid work", right: "Total dependence on internet connectivity" },
                { aspect: "Maintenance", left: "Updates, patching and backup handled by the provider", right: "Loss of control over WHEN changes happen to your system" },
                { aspect: "Resilience", left: "Provider-grade redundancy and disaster recovery", right: "Provider failure or insolvency is a single point of failure" },
                { aspect: "Data", left: "Professional security expertise beyond most organisations", right: "Data held by a third party, possibly in another jurisdiction — a data protection issue (Chapter 3)" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Blockchain / distributed ledger",
          md: "A record **shared and replicated across many participants**, in which entries are grouped into blocks and cryptographically linked to those before them. Because every participant holds a copy and each block depends on the previous one, an entry cannot be altered retrospectively without detection, and **no single party controls the record**.",
        },
        {
          kind: "list",
          title: "What this could mean for accounting",
          items: [
            "**Near-real-time settlement** — payment and record can occur together rather than days apart.",
            "**A shared, agreed record between counterparties** — removing whole classes of reconciliation and dispute.",
            "**Provenance and traceability** — a verifiable history of an asset or a supply chain, valuable for both audit and sustainability claims.",
            "**Smart contracts** — terms that execute automatically when defined conditions are met.",
            "**Audit implications** — assurance shifts from confirming that a transaction happened toward whether it was authorised, correctly classified and commercially genuine.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The honest limitation to state",
          md: "Blockchain makes a record **tamper-evident**; it does not make it **true**. A fraudulent transaction recorded on a blockchain is permanently and immutably recorded — as a fraudulent transaction. Nor does immutability help if the wrong data was entered. Saying \"blockchain prevents fraud\" is a wrong answer; \"blockchain makes retrospective alteration detectable\" is a right one.",
        },
      ],
    },
    {
      id: "risks-and-the-role",
      heading: "The risks, and what the accountant becomes",
      blocks: [
        {
          kind: "table",
          caption: "The risks fintech introduces",
          head: ["Risk", "Why it matters"],
          rows: [
            ["**Cyber risk**", "More systems, more connections and more third parties widen the attack surface. Ransomware can halt operations entirely"],
            ["**Data protection exposure**", "More personal data, processed in more places, sometimes across borders — every principle in Chapter 3 is engaged"],
            ["**Loss of the audit trail**", "Automated and machine-learning processes must still record who or what decided, and why. An unexplainable decision is unauditable"],
            ["**Algorithmic bias**", "A model trained on historic data reproduces the historic bias in it — with the appearance of objectivity"],
            ["**Concentration and dependency**", "Reliance on one cloud or software provider is a single point of failure with weak bargaining power at renewal"],
            ["**Skills gap**", "Staff and management may not understand the systems well enough to challenge their output"],
            ["**Regulatory lag**", "Technology outpaces regulation, so the compliance position may be genuinely unclear"],
          ],
        },
        {
          kind: "definition",
          term: "Algorithmic bias",
          md: "Systematic unfairness in an automated decision arising from **bias in the data it learned from** or in how the problem was framed. It is particularly dangerous because the output looks objective and is applied consistently at scale — the bias is industrialised rather than mitigated.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "How the accountant's role changes",
            caption: "The work moves up the value chain — but only for those who acquire the skills to follow it.",
            data: {
              points: [
                { label: "Fewer processing roles", sub: "Transaction capture, matching and routine reporting automated" },
                { label: "More control and assurance work", sub: "Owning the rules, the data quality, the access rights and the exceptions" },
                { label: "More analysis and advisory", sub: "Diagnostic, predictive and prescriptive interpretation for decision-makers" },
                { label: "New skills required", sub: "Data literacy, systems and control understanding, scepticism about model output, communication of technical findings" },
              ],
            },
          },
        },
        {
          kind: "activity",
          title: "Activity 18 — assessing an AI credit decision",
          prompt:
            "A finance director proposes replacing the credit control team's judgement with a machine learning model that approves or refuses customer credit automatically, trained on ten years of the company's own payment history.\n\nState two genuine benefits and three risks, and recommend one safeguard.",
          answer:
            "**Two benefits.** (1) **Consistency and speed** — every application is assessed on the same basis, immediately, with no queue and no variation between assessors. (2) **Better discrimination between risks** — a model can weigh far more variables than a person and may detect predictive patterns the team never noticed, reducing both bad debts and wrongly refused good customers.\n\n**Three risks.** (1) **Algorithmic bias inherited from the training data.** Ten years of the company's own decisions encode ten years of the company's own biases — if certain sectors or regions were historically under-served, the model learns to under-serve them and now does so consistently, at scale, with the appearance of objectivity. (2) **Explainability.** A refused customer, and possibly a regulator, may be entitled to know why. \"The model said so\" is not an answer, and an unexplainable decision is also unauditable. (3) **Automation bias plus a stale model.** Staff will trust the output because it is systematic, and the model was trained on history — including a period whose economic conditions no longer apply. A model that was accurate in stable conditions can be badly wrong in a downturn, exactly when credit decisions matter most.\n\n**One safeguard: meaningful human oversight with a real override.** A named person reviews all refusals and all approvals above a threshold, has the authority and the time to overturn the model, and their overrides are logged and analysed — both to catch model drift and to prove the oversight is genuine. Note the word *meaningful*: an oversight step that has never disagreed with the model is documentation, not control.\n\n**Also creditable:** periodic bias testing against protected characteristics, regular retraining with monitoring for model drift, and retaining enough human credit expertise that the capability still exists if the model has to be withdrawn.",
        },
      ],
      check: {
        q: "Which statement about blockchain is correct?",
        options: [
          "It prevents fraudulent transactions from being recorded",
          "It makes retrospective alteration of a recorded entry detectable",
          "It guarantees that recorded transactions are commercially genuine",
          "It removes the need for any audit of the entity",
        ],
        correct: 1,
        explain:
          "Blockchain makes a record TAMPER-EVIDENT: because blocks are cryptographically linked and replicated across participants, altering an earlier entry cannot be done without detection. It does NOT validate what was entered — a fraudulent transaction is recorded immutably as a fraudulent transaction. Assurance therefore shifts toward whether transactions were authorised, correctly classified and commercially genuine, rather than disappearing.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying blockchain prevents fraud.",
      fix: "It makes retrospective alteration detectable. It does not make an entry true — a fraudulent transaction is recorded immutably as a fraudulent transaction.",
    },
    {
      trap: "Treating RPA and machine learning as the same thing.",
      fix: "RPA follows explicit rules and is fully explainable; machine learning infers patterns from data and is often a black box. Their failure modes and controls differ completely.",
    },
    {
      trap: "Assuming automated output is objective.",
      fix: "A model reproduces the bias in its training data, with the appearance of objectivity and applied consistently at scale. Automation bias is the tendency to trust it anyway.",
    },
    {
      trap: "Presenting cloud computing as simply cheaper and better.",
      fix: "Give the trade: lower up-front cost, scalability and provider-grade resilience against dependency, loss of control over changes, and data held by a third party possibly in another jurisdiction.",
    },
    {
      trap: "Confusing predictive with prescriptive analytics.",
      fix: "Predictive says what is LIKELY to happen; prescriptive recommends what to DO about it. Descriptive is what happened and diagnostic is why.",
    },
    {
      trap: "Concluding that automation makes accountants unnecessary.",
      fix: "It removes processing work and increases control, assurance and advisory work. The role moves up the value chain, and the required skills change with it.",
    },
  ],
  keyTerms: [
    { term: "Financial technology (fintech)", def: "The use of technology to deliver, improve or automate financial services and financial processes." },
    { term: "Big data", def: "Datasets characterised by volume, velocity, variety and veracity, beyond what conventional systems handle." },
    { term: "Descriptive analytics", def: "Analysis reporting what happened." },
    { term: "Diagnostic analytics", def: "Analysis explaining why something happened." },
    { term: "Predictive analytics", def: "Analysis forecasting what is likely to happen." },
    { term: "Prescriptive analytics", def: "Analysis recommending what action should be taken." },
    { term: "Machine learning", def: "Systems that infer patterns from data and improve with experience rather than following programmed rules." },
    { term: "Robotic process automation", def: "Software robots performing rule-based repetitive tasks through existing applications, without learning." },
    { term: "Cloud computing", def: "Computing resources delivered as a service over the internet and paid for as used." },
    { term: "Blockchain", def: "A shared, replicated record of cryptographically linked blocks that no single party controls and that is tamper-evident." },
    { term: "Automation bias", def: "The tendency to trust an automated output because it came from a system, reproducing any error consistently at scale." },
    { term: "Algorithmic bias", def: "Systematic unfairness in an automated decision arising from bias in its training data or problem framing." },
  ],
  summary: [
    "Fintech spans big data and analytics, AI and machine learning, RPA, cloud computing, blockchain and digital payments.",
    "Big data is characterised by volume, velocity, variety and veracity.",
    "Analytics runs descriptive → diagnostic → predictive → prescriptive, and the professional contribution has moved to diagnostic and above.",
    "RPA follows rules and is explainable; machine learning infers patterns and is often a black box, so their controls differ.",
    "Cloud computing trades capital cost and control for scalability, access and provider-grade resilience.",
    "Blockchain makes records tamper-evident but does not make them true, so assurance shifts toward authorisation and commercial substance.",
    "The risks are cyber, data protection, lost audit trail, algorithmic bias, provider concentration, skills gaps and regulatory lag.",
    "The accountant's role moves from processing toward control, assurance and advisory work, with meaningful human oversight as the key safeguard.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four Vs of big data?", a: "Volume, velocity, variety and veracity — size, speed of arrival, mix of structured and unstructured forms, and uncertain reliability." },
    { q: "What are the four types of analytics?", a: "Descriptive (what happened), diagnostic (why), predictive (what is likely) and prescriptive (what to do). Value and difficulty rise across the sequence." },
    { q: "How does RPA differ from machine learning?", a: "RPA follows explicit rules written by a person and is fully explainable; machine learning infers patterns from training data and is often unexplainable. RPA executes a wrong rule perfectly; ML reproduces bias in its data." },
    { q: "What does blockchain actually guarantee?", a: "That a recorded entry cannot be altered retrospectively without detection, because blocks are cryptographically linked and replicated. It does not guarantee the entry was genuine or correct." },
    { q: "What is the key safeguard over automated financial decisions?", a: "Meaningful human oversight — a person with the authority, information and time to override the output, whose overrides are logged and analysed. Oversight that never disagrees with the machine is documentation, not control." },
  ],
  furtherStudy: [
    "Data analytics in audit is examined in **AA** and **AAA**; technology's effect on performance measurement in **APM**.",
    "The employability and technology skills strand runs through every Applied Skills paper, and starts here.",
  ],
}

/* ── Area C chapter list, in reading order ─────────────────────── */

export const BT_TREE_AREA_C: StudyChapter[] = [
  BT_TREE_12,
  BT_TREE_13,
  BT_TREE_14,
  BT_TREE_15,
  BT_TREE_16,
  BT_TREE_17,
]

