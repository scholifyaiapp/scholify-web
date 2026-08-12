/*
 * BT Area C — Accounting and reporting systems, technology, controls and
 * security. The exam-plan layer: what each section is examined by, and how.
 *
 * Area C carries more of BT's marks than any other and is where the paper stops
 * being about organisations and starts being about the accountant's own work.
 * Its distractors are mostly CATEGORY errors — a detective control offered as
 * preventive, a source of regulation offered as a source of law, internal audit
 * offered as external — so nearly every plan here begins by fixing the category
 * before the option list is allowed to influence anything.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const BT_PLANS_C: ExamPlanMap = {
  /* ── BT-12 · The accounting and finance function ─────────────── */

  "BT-12::sub-functions": {
    title: "Placing a task in the right part of the finance function",
    format: "ot",
    marks: 2,
    requirement:
      "Deciding whether to raise a new long-term loan to fund an expansion is the responsibility of:\n\nA  Financial accounting\nB  Management accounting\nC  The treasury function\nD  Internal audit",
    plan: [
      {
        step: "Give each sub-function its own question",
        detail:
          "Financial accounting: what happened, reported outward. Management accounting: what should we do, reported inward. Treasury: where does the money come from and go. Internal audit: are the controls working.",
      },
      {
        step: "Read the task for which question it answers",
        detail:
          "Raising a loan is about sourcing funds — a treasury question. Treasury covers funding, cash and liquidity management, working capital and financial risk such as interest rates and currency.",
      },
      {
        step: "Separate treasury from management accounting deliberately",
        detail:
          "Management accounting would appraise whether the EXPANSION is worth doing. Treasury decides how it is FUNDED. Both concern the future and money, which is why the two are confused.",
      },
      {
        step: "Rule out the backward-looking and the assurance options",
        detail:
          "Financial accounting reports what has already happened. Internal audit examines whether controls operate, and does not make funding decisions — it would compromise its own independence if it did.",
      },
    ],
    answer:
      "**C — the treasury function.**\n\nTreasury handles the sourcing and management of funds: raising finance, managing cash and liquidity, working capital, and financial risks such as interest rate and currency exposure.\n\nManagement accounting is the strongest distractor because it also looks forward — but it would appraise whether the expansion is worth making, while treasury decides how it is paid for. Financial accounting reports what has happened, and internal audit examines controls rather than making financial decisions.",
    earns: ["Splitting the appraisal decision from the funding decision"],
    loses: ["Treating management accounting as the answer to any forward-looking finance question"],
  },

  "BT-12::relationships": {
    title: "How finance serves the other business functions",
    format: "ot",
    marks: 2,
    requirement:
      "The sales department wants to offer a major customer 90 days' credit instead of 30. Finance's most relevant contribution to this decision is to:\n\nA  Prepare the sales invoices accurately\nB  Assess the effect on cash flow and the customer's credit risk\nC  Record the eventual receipts in the ledger\nD  Report the sale in the annual financial statements",
    plan: [
      {
        step: "Ask what the decision needs, not what finance does",
        detail:
          "A decision is being taken now about extending credit. What it needs is an assessment of consequence and risk, so the answer must be an input to the decision rather than a downstream process.",
      },
      {
        step: "Sort the options into decision inputs and record-keeping",
        detail:
          "Invoicing, ledger recording and statutory reporting all happen AFTER the decision, whichever way it goes. Only B changes what the decision should be.",
      },
      {
        step: "Name the two consequences the assessment covers",
        detail:
          "Extending credit delays cash inflow, so working capital and any financing cost are affected; and it increases exposure if the customer fails. Both belong in the assessment.",
      },
      {
        step: "Frame the answer as advice, since that is the role being tested",
        detail:
          "The syllabus point is that finance is a business partner to the other functions rather than a scorekeeper for them. The correct option is the one where finance shapes the decision.",
      },
    ],
    answer:
      "**B — assess the effect on cash flow and the customer's credit risk.**\n\nExtending credit from 30 to 90 days delays cash inflow, which raises the working capital requirement and any associated financing cost, and it increases the exposure if the customer defaults. Both are things only finance is positioned to quantify.\n\nA, C and D are all real finance activities, but each happens after the decision and none of them changes what the decision should be. The syllabus point being tested is that finance advises the business rather than merely recording its results.",
    earns: ["Distinguishing an input to the decision from processing that follows it"],
    loses: ["Choosing a genuine finance task that has no bearing on the decision described"],
  },

  "BT-12::structure-of-finance": {
    title: "Why segregation shapes the finance function's own structure",
    format: "ot",
    marks: 2,
    requirement:
      "In a well-organised finance function, the person who authorises a supplier payment should **not** also:\n\nA  Prepare the monthly management accounts\nB  Record the payment in the purchase ledger\nC  Prepare the annual budget\nD  Reconcile the bank statement",
    plan: [
      {
        step: "Recognise this as segregation of duties in disguise",
        detail:
          "The stem is about how the finance function is organised, but the principle being tested is segregation: authorisation, custody, recording and reconciliation should not sit with one person.",
      },
      {
        step: "Classify the option in the stem",
        detail:
          "Authorising a payment is AUTHORISATION. So the incompatible duty is whichever option is custody, recording, or the check over them.",
      },
      {
        step: "Classify each option in turn",
        detail:
          "Preparing management accounts and budgets is reporting and planning — neither touches this transaction. Recording the payment is RECORDING. Reconciling the bank is the independent check.",
      },
      {
        step: "Pick the pairing that would let a fraud run undetected",
        detail:
          "Someone who both authorises a payment and records it can approve a payment to themselves and describe it as anything they like in the ledger. That is the combination the principle exists to prevent.",
      },
    ],
    answer:
      "**B — record the payment in the purchase ledger.**\n\nSegregation of duties separates **authorisation**, **custody**, **recording** and **reconciliation**. A person holding both authorisation and recording can approve a payment and then describe it in the ledger as whatever conceals it, so the fraud leaves no trail in the records.\n\nD is a reasonable second choice — reconciliation is also incompatible with recording — but the stem names authorisation, and recording is its most dangerous partner. Preparing management accounts or budgets does not touch the individual transaction at all.",
    earns: ["Naming which of the four duties the stem describes before testing the options"],
    loses: ["Choosing any control-sounding task without checking it conflicts with authorisation specifically"],
  },

  "BT-12::users-of-information": {
    title: "Matching a user of financial information to what they need",
    format: "ot",
    marks: 2,
    requirement:
      "Which user of financial information is primarily interested in the entity's ability to pay amounts due on time?\n\nA  Shareholders\nB  Trade payables\nC  Employees\nD  The tax authority",
    plan: [
      {
        step: "Write each user's primary question in one line",
        detail:
          "Shareholders: what return will I get? Lenders and payables: will I be paid? Employees: is my job secure and can they afford to pay me? Tax authority: how much is due? Customers: will they still exist to supply me?",
      },
      {
        step: "Read the stem for the question, not the user",
        detail:
          "\"Ability to pay amounts due on time\" is a liquidity question, and liquidity is the concern of whoever is owed money. That identifies the user without weighing the options.",
      },
      {
        step: "Note that several users care about liquidity secondarily",
        detail:
          "Employees care because insolvency costs them their jobs, and shareholders care because it threatens the dividend. The stem says PRIMARILY, so the answer is the user for whom it is the first question.",
      },
      {
        step: "Check the near-miss on timing",
        detail:
          "The tax authority is also owed money, but its primary interest is the amount assessable rather than whether payment arrives on time. The word \"primarily\" is doing real work in this question.",
      },
    ],
    answer:
      "**B — trade payables.**\n\nSuppliers who have extended credit are owed money and their first question is whether it will be paid when due, which is why they focus on liquidity and short-term solvency.\n\nShareholders are primarily interested in return and the value of their investment; employees in job security and pay; and the tax authority in the amount assessable. Several of these care about liquidity as a secondary matter, which is why the stem specifies \"primarily\".",
    earns: ["Reading the information need first and inferring the user from it"],
    loses: ["Ignoring \"primarily\" and choosing a user with a genuine but secondary interest"],
  },

  /* ── BT-13 · Law, regulation and financial information ───────── */

  "BT-13::why-regulate": {
    title: "The reason financial reporting is regulated at all",
    format: "ot",
    marks: 2,
    requirement:
      "The principal reason for regulating financial reporting is to:\n\nA  Ensure companies pay the correct amount of tax\nB  Make the financial statements of different entities comparable and reliable for users\nC  Reduce the cost of preparing accounts\nD  Prevent companies from making losses",
    plan: [
      {
        step: "Return to who the accounts are FOR",
        detail:
          "External users rely on statements they did not prepare and cannot verify, and who prepared them has an interest in how they look. Regulation exists to make that reliance reasonable.",
      },
      {
        step: "Name the two properties regulation delivers",
        detail:
          "Comparability — the same transaction treated the same way across entities and years — and reliability. Any option missing both of those is describing a side effect at best.",
      },
      {
        step: "Test the plausible distractor",
        detail:
          "Tax is computed from the accounts, so regulation helps there, but tax law has its own rules and adjusts the accounting profit. Assisting tax collection is a consequence, not the purpose.",
      },
      {
        step: "Discard the two that regulation does not do",
        detail:
          "Regulation increases the cost of preparation rather than reducing it, and no reporting rule can stop a company making a loss — it only requires the loss to be reported properly.",
      },
    ],
    answer:
      "**B — make the financial statements of different entities comparable and reliable for users.**\n\nExternal users depend on statements prepared by people with an interest in how they look, and cannot verify them independently. Regulation makes that reliance reasonable by requiring like transactions to be treated alike, so statements can be compared between entities and across years.\n\nTax collection benefits from regulated accounts but tax law adjusts accounting profit under its own rules. Regulation raises preparation costs rather than lowering them, and no rule prevents a loss — only its concealment.",
    earns: ["Answering from who relies on the accounts and why they cannot verify them"],
    loses: ["Selecting tax, which regulation assists but was not created to serve"],
  },

  "BT-13::sources-of-regulation": {
    title: "Which body produces which kind of requirement",
    format: "ot",
    marks: 2,
    requirement:
      "International Financial Reporting Standards are issued by:\n\nA  The International Accounting Standards Board\nB  The IFRS Foundation\nC  The International Federation of Accountants\nD  The national government of each adopting country",
    plan: [
      {
        step: "Separate the standard-setter from its oversight body",
        detail:
          "The IASB writes and issues the standards. The IFRS Foundation is the oversight and governance body that appoints the Board and funds it. Both are correct-sounding, and only one issues standards.",
      },
      {
        step: "Rule out the body from the other discipline",
        detail:
          "IFAC is the global body for the accountancy profession, associated with professional and ethical standards and with auditing standards through its boards — not with financial reporting standards.",
      },
      {
        step: "Handle the adoption distractor precisely",
        detail:
          "Governments and regulators ADOPT IFRS into national law and decide who must apply them. Adopting a standard is not issuing it, and the distinction is what option D is built to test.",
      },
      {
        step: "Keep the trio straight for later questions",
        detail:
          "Foundation oversees, Board issues, national regulators adopt and enforce. The same three-way split recurs whenever the syllabus asks where a reporting requirement came from.",
      },
    ],
    answer:
      "**A — the International Accounting Standards Board.**\n\nThe IASB develops and issues IFRS. The **IFRS Foundation** is its oversight body: it appoints Board members, governs the process and secures funding, but it does not write standards.\n\nIFAC is the global organisation for the accountancy profession and is associated with professional, ethical and auditing standards rather than financial reporting ones. National governments and regulators adopt IFRS into law and decide which entities must apply them — adoption is not issue.",
    earns: ["Keeping the oversight body, the standard-setter and the adopting regulator apart"],
    loses: ["Choosing the IFRS Foundation because its name contains the standards' name"],
  },

  "BT-13::external-audit": {
    title: "What the external auditor's opinion actually says",
    format: "ot",
    marks: 2,
    requirement:
      "The external auditor's report on a company's financial statements provides:\n\nA  A guarantee that the financial statements contain no errors\nB  Reasonable assurance that the financial statements give a true and fair view\nC  Absolute assurance that no fraud has occurred\nD  A recommendation on whether to invest in the company",
    plan: [
      {
        step: "Fix the level of assurance in the right words",
        detail:
          "Reasonable assurance, not absolute. Audit works by sampling, judgement and evidence that is persuasive rather than conclusive, so certainty is not available at any price.",
      },
      {
        step: "Strike every option promising certainty",
        detail:
          "\"Guarantee\" and \"absolute assurance\" both fail on the same point. On this topic an absolute word is reliably the mark of a wrong option.",
      },
      {
        step: "Fix what the opinion is ABOUT",
        detail:
          "Whether the statements give a true and fair view — a view on the statements as a whole, not on individual transactions, not on the quality of management, and not on the merits of investing.",
      },
      {
        step: "Address the fraud misconception directly",
        detail:
          "Preventing and detecting fraud is management's responsibility. The auditor must consider fraud risk and remain alert to it, but detecting all fraud is not the audit's objective — this is the expectation gap the syllabus names.",
      },
    ],
    answer:
      "**B — reasonable assurance that the financial statements give a true and fair view.**\n\nAn audit gives **reasonable**, not absolute, assurance: it uses sampling and judgement, and its evidence is persuasive rather than conclusive. The opinion covers the statements as a whole rather than every transaction in them.\n\nPreventing and detecting fraud is management's responsibility; the auditor considers fraud risk but does not undertake to find all fraud. And the auditor never advises on whether to invest — the difference between what an audit gives and what users assume it gives is the **expectation gap**.",
    earns: [
      "Rejecting any option that promises certainty",
      "Naming the expectation gap when explaining why fraud detection is not the objective",
    ],
    loses: ["Choosing the fraud option because auditors are widely assumed to be looking for it"],
  },

  "BT-13::sources-of-information": {
    title: "Classifying a source as internal or external, primary or secondary",
    format: "ot",
    marks: 2,
    requirement:
      "A company commissions a survey of its own customers to test reaction to a new product. This information is:\n\nA  Internal and secondary\nB  Internal and primary\nC  External and secondary\nD  External and primary",
    plan: [
      {
        step: "Handle the two classifications one at a time",
        detail:
          "Internal versus external asks where the information came FROM. Primary versus secondary asks whether it was gathered for THIS purpose or already existed. Answering both at once is what causes errors.",
      },
      {
        step: "Settle internal versus external on the source of the data",
        detail:
          "The data comes from customers, who are outside the organisation. The company commissioned the survey, but commissioning is not the same as being the source — the responses originate externally.",
      },
      {
        step: "Settle primary versus secondary on why it was gathered",
        detail:
          "The survey was commissioned specifically to answer this question, so it is primary. Secondary would be data that already existed for some other purpose and is being reused.",
      },
      {
        step: "Combine, and check the trap you nearly fell into",
        detail:
          "External and primary. The trap is answering \"internal\" because the company organised it — the classification follows the origin of the data, not the identity of whoever paid for it.",
      },
    ],
    answer:
      "**D — external and primary.**\n\nThe two classifications are independent. **Internal or external** is about where the data originates: these are customers' responses, and customers are outside the organisation. **Primary or secondary** is about whether it was gathered for this specific purpose: the survey was commissioned to answer this question, so it is primary.\n\nThe common error is answering \"internal\" because the company commissioned the work. Its own sales records would be internal; what its customers say is external however it was collected.",
    earns: ["Resolving the two axes separately rather than choosing a combined label by feel"],
    loses: ["Classifying by who paid for the research instead of where the data came from"],
  },

  /* ── BT-14 · Financial systems, procedures and IT ────────────── */

  "BT-14::why-systems": {
    title: "What a financial system is there to deliver",
    format: "ot",
    marks: 1,
    requirement:
      "The primary purpose of a financial accounting system is to:\n\nA  Reduce the number of staff the organisation employs\nB  Record transactions completely and accurately so that reliable information can be produced\nC  Prevent all fraud\nD  Satisfy the external auditor",
    plan: [
      {
        step: "Take the purpose from the output the system exists to produce",
        detail:
          "A financial system exists so that transactions are captured completely and accurately, and reliable information can be drawn from them for reporting and decisions.",
      },
      {
        step: "Reject the absolute option on sight",
        detail:
          "\"Prevent all fraud\" is impossible — no system can eliminate fraud, particularly where management override or collusion is involved. Absolute claims are almost always wrong options.",
      },
      {
        step: "Reject the two that are by-products",
        detail:
          "Automation may reduce headcount and a good system does make the audit easier, but neither is the purpose. A one-mark question rewards naming the purpose and moving on.",
      },
    ],
    answer:
      "**B — record transactions completely and accurately so that reliable information can be produced.**\n\nCompleteness and accuracy are the system's core objectives; everything else follows from them. Reliable records support the financial statements, management decisions and the organisation's control over its own resources.\n\nStaff savings and a smoother audit are by-products. Preventing all fraud is beyond any system, because controls can be overridden by management or defeated by collusion.",
    earns: ["Rejecting absolute claims immediately on a control topic"],
    loses: ["Choosing the audit, which the system serves but was not built for"],
  },

  "BT-14::the-cycles": {
    title: "Placing a document in the right transaction cycle",
    format: "ot",
    marks: 2,
    requirement:
      "A goods received note is a document within which transaction cycle?\n\nA  The sales cycle\nB  The purchases cycle\nC  The payroll cycle\nD  The cash cycle",
    plan: [
      {
        step: "List the cycles and the documents each generates",
        detail:
          "Sales: order, despatch note, invoice, receipt. Purchases: requisition, purchase order, goods received note, supplier invoice, payment. Payroll: timesheet, payslip. Cash: paying-in slip, remittance advice, bank statement.",
      },
      {
        step: "Ask which direction the goods are moving",
        detail:
          "Received means goods coming IN, which is the purchases cycle. Goods going out generate a despatch note or delivery note in the sales cycle. Direction settles it in one step.",
      },
      {
        step: "Recall what the document is used FOR",
        detail:
          "The GRN evidences that goods arrived and in what condition, so the supplier's invoice can be matched against the purchase order and the GRN before payment is authorised.",
      },
      {
        step: "Fix the three-way match, which is the follow-on question",
        detail:
          "Purchase order, goods received note and supplier invoice must agree before payment. That control is examined as often as the classification itself.",
      },
    ],
    answer:
      "**B — the purchases cycle.**\n\nA goods received note records that goods arrived and in what condition. It is the middle document of the three-way match — **purchase order, goods received note and supplier invoice** must agree before payment is authorised, which is the control that stops an organisation paying for goods it never ordered or never received.\n\nThe sales cycle's equivalent for outgoing goods is the despatch or delivery note.",
    earns: [
      "Using the direction of the goods to place the document",
      "Knowing the three-way match, which is where the follow-on marks are",
    ],
    loses: ["Confusing the goods received note with the despatch note"],
  },

  "BT-14::ledgers-and-reconciliation": {
    title: "What a control account reconciliation proves",
    format: "ot",
    marks: 2,
    requirement:
      "The receivables control account balance does not agree with the total of the individual customer accounts in the sales ledger. This indicates that:\n\nA  The financial statements must contain a material misstatement\nB  An error exists in the control account, in the individual accounts, or in both\nC  A customer has failed to pay\nD  The bank reconciliation has not been performed",
    plan: [
      {
        step: "State what the reconciliation compares",
        detail:
          "The control account is built from the totals of the day books; the sales ledger holds the individual customer accounts. Two independent routes to the same figure, which is exactly why disagreement is informative.",
      },
      {
        step: "Say precisely what a disagreement proves",
        detail:
          "That at least one of the two is wrong. It does not say which, does not say by how much, and does not say the error is material — only that an error exists somewhere.",
      },
      {
        step: "Reject the options that claim more than the evidence supports",
        detail:
          "A asserts materiality, which is not established. C describes non-payment, which would not cause a difference at all — an unpaid invoice sits in both records identically.",
      },
      {
        step: "Reject the unrelated option",
        detail:
          "The bank reconciliation compares the cash book with the bank statement, a different reconciliation over different records, and has no bearing on receivables.",
      },
    ],
    answer:
      "**B — an error exists in the control account, in the individual accounts, or in both.**\n\nThe control account is built from day book totals while the sales ledger holds individual customer accounts. Because they are two independent routes to the same figure, disagreement proves an error exists — but not where it is, how large it is, or whether it matters.\n\nNon-payment causes no difference: an unpaid invoice appears identically in both records. The bank reconciliation compares different records entirely.",
    earns: ["Stating exactly what the evidence proves and refusing to extend it"],
    loses: ["Choosing non-payment, which is a receivables problem but not a reconciliation difference"],
  },

  "BT-14::it-applications": {
    title: "Which system does which job",
    format: "ot",
    marks: 2,
    requirement:
      "A system that shares a single database across finance, purchasing, inventory and human resources so that a transaction entered once updates every affected module is:\n\nA  A spreadsheet model\nB  An enterprise resource planning system\nC  A decision support system\nD  A database management system",
    plan: [
      {
        step: "Take the discriminator from the stem's own description",
        detail:
          "One shared database, many functional modules, entered once and reflected everywhere. That integration across functions is the defining property, not merely a feature.",
      },
      {
        step: "Match it to the system built for exactly that",
        detail:
          "Enterprise resource planning is defined by integrating the organisation's functions on a single database, which removes the duplicate entry and reconciliation that separate systems require.",
      },
      {
        step: "Reject the option that is a component rather than a system",
        detail:
          "A database management system manages the data store. An ERP uses one, but the stem describes functional modules across the business, which a DBMS does not itself provide.",
      },
      {
        step: "Reject the two that solve a different problem",
        detail:
          "A spreadsheet model is a single-user analysis tool. A decision support system helps analyse a specific decision. Neither runs the organisation's transaction processing.",
      },
    ],
    answer:
      "**B — an enterprise resource planning system.**\n\nERP integrates the organisation's functions on a single shared database, so a transaction entered once updates every affected module. That eliminates duplicate entry and the reconciliation that separate systems make necessary, and it is what distinguishes ERP from a collection of good individual systems.\n\nA database management system is the software that manages the data store — ERP uses one, but the stem describes the functional modules that sit on top. Spreadsheets and decision support systems support analysis, not transaction processing.",
    earns: ["Matching on integration across functions rather than on the presence of a database"],
    loses: ["Choosing the database management system because the stem mentions a single database"],
  },

  /* ── BT-15 · Internal control, security and compliance ───────── */

  "BT-15::purpose": {
    title: "What internal control is for, in the syllabus's own terms",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** an objective of an internal control system?\n\nA  Safeguarding the organisation's assets\nB  Ensuring the reliability of financial reporting\nC  Guaranteeing the organisation achieves its profit target\nD  Ensuring compliance with laws and regulations",
    plan: [
      {
        step: "Recall the three objectives as a set",
        detail:
          "Effective and efficient operations (including safeguarding assets), reliable financial reporting, and compliance with applicable laws and regulations. Three objectives, and three of the options are drawn from them.",
      },
      {
        step: "Register the NOT and look for the overreach",
        detail:
          "On this topic the false option is almost always the one promising certainty about an outcome. Scan for \"guarantee\", \"ensure all\", \"prevent all\" before analysing anything.",
      },
      {
        step: "Explain why the overreach fails",
        detail:
          "Controls give reasonable assurance, and they operate over processes rather than results. Profit depends on market conditions, competition and strategy, none of which a control system reaches.",
      },
      {
        step: "Confirm the other three map onto the objectives",
        detail:
          "Safeguarding assets sits under operations, reliable reporting is the second objective, compliance is the third. Each maps cleanly, which confirms C as the outsider.",
      },
    ],
    answer:
      "**C — guaranteeing the organisation achieves its profit target.**\n\nInternal control has three objectives: **effective and efficient operations** (which includes safeguarding assets), **reliable financial reporting**, and **compliance with laws and regulations**.\n\nControls provide reasonable assurance over processes, not certainty over outcomes. Profit depends on market conditions, competitors and strategic choices, none of which a control system governs. Any option guaranteeing a result is the wrong one on this topic.",
    earns: ["Scanning for the absolute word before evaluating the options in detail"],
    loses: ["Reading control objectives as business objectives"],
  },

  "BT-15::types-of-control": {
    title: "Classifying a control by when it acts",
    format: "mtq",
    marks: 4,
    requirement:
      "Classify each control as preventive, detective or corrective.\n\n(i) A password is required before the payments system can be opened\n(ii) The bank reconciliation is performed monthly\n(iii) A duplicate payment identified in the reconciliation is recovered from the supplier\n(iv) The purchase ledger will not accept an invoice without a matching purchase order",
    plan: [
      {
        step: "Classify strictly by timing relative to the error",
        detail:
          "Preventive acts BEFORE, stopping it happening. Detective acts AFTER, finding what happened. Corrective acts after detection, putting it right. Timing decides it, and nothing else does.",
      },
      {
        step: "Refuse to classify by how good the control feels",
        detail:
          "Candidates label anything strong as preventive. A reconciliation is a strong control and is purely detective, because by the time it runs the error has already occurred.",
      },
      {
        step: "Watch the pair that arises from one event",
        detail:
          "(ii) and (iii) are the same incident in two stages: the reconciliation finds the duplicate payment, the recovery puts it right. Detective then corrective — that pairing is exactly what the task is testing.",
      },
      {
        step: "Read the system controls for what they block",
        detail:
          "A password blocks unauthorised access before anything is entered. A matching rule blocks the invoice before it is posted. Both stop the error occurring, so both are preventive.",
      },
    ],
    answer:
      "**(i) Preventive.** Access control stops an unauthorised person entering the system at all, so the error never occurs.\n\n**(ii) Detective.** The reconciliation runs after the transactions and finds discrepancies that already exist.\n\n**(iii) Corrective.** Recovery follows detection and puts right what the reconciliation found.\n\n**(iv) Preventive.** The system refuses the invoice before it is posted, so no incorrect entry is created.",
    earns: [
      "Classifying purely on timing rather than on the control's strength",
      "Seeing (ii) and (iii) as detection then correction of one event",
    ],
    loses: ["Calling the bank reconciliation preventive because it is a strong control"],
  },

  "BT-15::segregation": {
    title: "Spotting the incompatible combination of duties",
    format: "ot",
    marks: 2,
    requirement:
      "Which combination of duties held by one employee represents the most serious weakness in segregation?\n\nA  Preparing the payroll and preparing the sales invoices\nB  Receiving cash from customers and updating the receivables ledger\nC  Preparing purchase orders and filing supplier correspondence\nD  Preparing the budget and preparing the management accounts",
    plan: [
      {
        step: "Name the four duties that must be separated",
        detail:
          "Authorisation, custody of assets, recording, and reconciliation or review. A weakness exists when one person holds two of these over the SAME asset or transaction.",
      },
      {
        step: "Classify both halves of every option",
        detail:
          "This is the whole method. B is custody of cash plus recording of the amounts owed. A is recording plus recording. C is initiation plus filing. D is planning plus reporting.",
      },
      {
        step: "Check the two duties touch the same thing",
        detail:
          "A combines two duties over different cycles entirely, so neither conceals the other. The danger only arises when both duties bear on one asset or transaction.",
      },
      {
        step: "Describe the fraud the winning combination permits",
        detail:
          "Someone who receives cash and updates the ledger can take a receipt and write the customer's account off or credit it against a later payment. That is teeming and lading, and being able to name it confirms the answer.",
      },
    ],
    answer:
      "**B — receiving cash from customers and updating the receivables ledger.**\n\nThis is **custody** of an asset combined with **recording** of the same asset. The holder can take a receipt and conceal it in the ledger — crediting the customer against a later payment, or writing the balance off. The classic version is **teeming and lading**, where each customer's receipt covers the previous one's stolen payment.\n\nA combines two recording duties across unrelated cycles, so neither conceals the other. C pairs initiation with filing. D pairs planning with reporting — poor practice for objectivity, but no asset is exposed.",
    earns: [
      "Classifying both halves of each option against the four duties",
      "Naming the fraud the combination enables",
    ],
    loses: ["Choosing an option because both duties sound important, without checking they touch one asset"],
  },

  "BT-15::it-security": {
    title: "Matching an IT risk to the control that addresses it",
    format: "ot",
    marks: 2,
    requirement:
      "Which control most directly addresses the risk that data is lost when a server fails?\n\nA  A firewall\nB  Regular backups held at a separate location\nC  User access passwords\nD  Anti-virus software",
    plan: [
      {
        step: "Name the risk exactly before looking at controls",
        detail:
          "The risk is LOSS of data through hardware failure — not theft, not unauthorised access, not corruption by malware. Controls are only correct against the risk actually stated.",
      },
      {
        step: "Say what each control protects against",
        detail:
          "Firewall: unauthorised access from outside the network. Passwords: unauthorised access by people. Anti-virus: malicious software. Backups: loss or destruction of data, from any cause.",
      },
      {
        step: "Match on the risk, not on general security value",
        detail:
          "Three options are genuine and important security controls that would do nothing whatever when a disk fails. Being a good control is not the same as being the right control.",
      },
      {
        step: "Note the detail the option includes",
        detail:
          "\"Held at a separate location\" matters: a backup on the failed server, or in the same building as a fire, is not a backup. The offsite element is often what earns the mark.",
      },
    ],
    answer:
      "**B — regular backups held at a separate location.**\n\nBackups are the control against data loss whatever its cause — hardware failure, fire, theft or ransomware. The **separate location** is essential: a copy stored on the same server or in the same building shares the event that destroyed the original.\n\nFirewalls, passwords and anti-virus software all protect against unauthorised access or malicious code. Each is a genuine control and none of them recovers a single record when a disk fails.",
    earns: [
      "Naming the risk precisely before matching a control to it",
      "Recognising that offsite storage is part of what makes a backup a control",
    ],
    loses: ["Choosing a well-known security control that does not address the stated risk"],
  },

  "BT-15::limitations": {
    title: "Why a good control system can still fail",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an **inherent** limitation of any internal control system?\n\nA  Controls are expensive to design\nB  Controls can be overridden by management\nC  Staff need training to operate controls\nD  Controls must be documented",
    plan: [
      {
        step: "Understand what \"inherent\" excludes",
        detail:
          "An inherent limitation cannot be designed away — it is built into the nature of controls. Anything that better resourcing or better design would fix is a practical difficulty, not an inherent limitation.",
      },
      {
        step: "Recall the recognised list",
        detail:
          "Management override, collusion between staff, human error, controls addressing routine rather than unusual transactions, and the cost of a control exceeding its benefit.",
      },
      {
        step: "Test each option with the design-away question",
        detail:
          "Design cost, training and documentation are all practical matters that money and effort resolve. Management override cannot be resolved that way, because whoever designs the controls sits above them.",
      },
      {
        step: "Be able to state why override is unfixable",
        detail:
          "Controls are imposed by management, so management can always set them aside. That is why governance places responsibility above management — a board, an audit committee, non-executive directors.",
      },
    ],
    answer:
      "**B — controls can be overridden by management.**\n\nThe recognised inherent limitations are **management override**, **collusion**, **human error**, controls being designed for routine rather than unusual transactions, and the **cost of a control exceeding its benefit**. Each is built into how controls work and none can be designed away.\n\nManagement override is unfixable from inside the system: controls are imposed by management, so management can set them aside. That is precisely why governance places an audit committee and non-executive directors above management. Cost, training and documentation are practical difficulties that resources resolve.",
    earns: ["Applying \"could better design or more money fix this?\" as the inherent test"],
    loses: ["Choosing cost or training, which are real difficulties but not inherent limitations"],
  },

  /* ── BT-16 · Fraud and its prevention ────────────────────────── */

  "BT-16::fraud-vs-error": {
    title: "The one fact that separates fraud from error",
    format: "ot",
    marks: 2,
    requirement:
      "A bookkeeper posts a supplier invoice to the wrong expense account. On discovering it, the financial controller must first establish whether the misposting was:\n\nA  Material\nB  Intentional\nC  Recurring\nD  Detected by a control",
    plan: [
      {
        step: "State the single distinguishing factor",
        detail:
          "Intent. A misstatement is fraud if it was deliberate and error if it was not. The bookkeeping consequence may be identical; the classification and the response are completely different.",
      },
      {
        step: "Read the stem for what the classification turns on",
        detail:
          "It asks what must be established FIRST. Everything else — materiality, frequency, how it was found — matters afterwards, but none of it decides whether this was fraud.",
      },
      {
        step: "Explain why the order matters",
        detail:
          "If the misposting was deliberate it is fraud, which raises questions about the individual, about what else they have posted, and about reporting. If accidental it is a training or control matter.",
      },
      {
        step: "Reject materiality as the classifier",
        detail:
          "Materiality determines how much the misstatement matters to the financial statements. A small deliberate misstatement is still fraud, and an enormous accidental one is still error.",
      },
    ],
    answer:
      "**B — intentional.**\n\n**Intent** is the only thing that separates fraud from error. The accounting effect can be identical; what differs is whether the misstatement was deliberate.\n\nThe distinction drives everything that follows. A deliberate misposting is fraud, raising questions about the individual, about what else they have processed, and about reporting obligations. An accidental one is a training and control matter. Materiality tells you how much a misstatement affects the statements — a small deliberate misstatement is still fraud.",
    earns: ["Naming intent as the single classifier and keeping it separate from materiality"],
    loses: ["Answering materiality, which measures significance rather than establishing fraud"],
  },

  "BT-16::fraud-triangle": {
    title: "Naming which leg of the fraud triangle a fact supplies",
    format: "ot",
    marks: 2,
    requirement:
      "An employee has substantial personal debts. In terms of the fraud triangle this represents:\n\nA  Opportunity\nB  Motivation (pressure)\nC  Rationalisation\nD  Collusion",
    plan: [
      {
        step: "Fix the three legs and what each supplies",
        detail:
          "Motivation or pressure: a reason to want the money. Opportunity: a way to take it without being caught. Rationalisation: a story that makes it acceptable to the person doing it.",
      },
      {
        step: "Ask which of the three the fact provides",
        detail:
          "Personal debt creates a need for money. It supplies no access and no justification, so it is motivation and nothing else.",
      },
      {
        step: "Be ready to identify the other two in the same scenario",
        detail:
          "Weak segregation would supply opportunity; \"I am underpaid and will put it back\" would supply rationalisation. BT often asks for the other legs of the same scenario in a following task.",
      },
      {
        step: "Strike the option that is not part of the model",
        detail:
          "Collusion is a limitation of internal control, not a leg of the fraud triangle. Options imported from an adjacent topic are frequent here.",
      },
    ],
    answer:
      "**B — motivation (pressure).**\n\nThe fraud triangle requires all three: **motivation** (a reason to want the money), **opportunity** (a way to take it undetected) and **rationalisation** (a story that makes it acceptable). Personal debt supplies the first.\n\nOpportunity would come from something like weak segregation of duties or unsupervised access. Rationalisation is the internal justification — \"I am underpaid\", \"the company will not miss it\", \"I will put it back\". Collusion is a limitation of internal control rather than part of this model.\n\nThe practical point is that management can rarely reduce motivation or rationalisation, so controls attack **opportunity** — which is the leg the organisation actually governs.",
    earns: [
      "Naming the leg precisely and being able to supply examples of the other two",
      "Knowing that controls target opportunity because it is the only leg management controls",
    ],
    loses: ["Choosing collusion, which belongs to the limitations of internal control"],
  },

  "BT-16::types-of-fraud": {
    title: "Distinguishing removal of funds from misstatement of the accounts",
    format: "ot",
    marks: 2,
    requirement:
      "Directors deliberately delay recognising expenses so that reported profit meets the level expected by the market. This is best classified as:\n\nA  Theft of assets\nB  Teeming and lading\nC  Window dressing (fraudulent financial reporting)\nD  Money laundering",
    plan: [
      {
        step: "Split fraud into its two families first",
        detail:
          "Removal of resources — theft, false invoices, payroll fraud, teeming and lading — and misstatement of the accounts, where nothing is taken but the reported position is manipulated.",
      },
      {
        step: "Ask whether anything left the organisation",
        detail:
          "Nothing was taken here. Expenses were simply recognised in the wrong period, which moves the reported result. That places it in the misstatement family immediately.",
      },
      {
        step: "Identify the motive, since it confirms the classification",
        detail:
          "Meeting market expectations is the standard motive for fraudulent reporting, alongside bonus targets and loan covenants. Personal enrichment through removal is a different motive entirely.",
      },
      {
        step: "Check the distractors against the removal test",
        detail:
          "Theft and teeming and lading both involve assets leaving. Money laundering is concealing the origin of criminal proceeds, which requires criminal proceeds — none are described here.",
      },
    ],
    answer:
      "**C — window dressing (fraudulent financial reporting).**\n\nFraud divides into **removal of resources** and **misstatement of the accounts**. Nothing has been taken here: expenses have been recognised in the wrong period so that the reported profit meets expectations, which manipulates the picture rather than the assets.\n\nThe motives for fraudulent reporting are market expectations, bonus targets and loan covenants — as here. Theft and teeming and lading both involve assets leaving the organisation, and money laundering conceals the origin of criminal proceeds, which are not present.",
    earns: ["Asking whether anything was removed as the first classifying question"],
    loses: ["Treating any director-level fraud as theft because directors have access to assets"],
  },

  "BT-16::responsibilities": {
    title: "Who is responsible for preventing and detecting fraud",
    format: "ot",
    marks: 2,
    requirement:
      "Primary responsibility for the prevention and detection of fraud rests with:\n\nA  The external auditor\nB  Those charged with governance and management\nC  The internal audit function\nD  Each individual employee",
    plan: [
      {
        step: "Answer from who controls the environment",
        detail:
          "Prevention and detection require designing and operating controls and setting the tone. Only management and those charged with governance can do either, so responsibility follows the capability.",
      },
      {
        step: "Place the external auditor correctly",
        detail:
          "The auditor obtains reasonable assurance that the statements are free from material misstatement, whether caused by fraud or error. That is a duty about the statements, not a duty to find fraud.",
      },
      {
        step: "Place internal audit correctly",
        detail:
          "Internal audit reviews whether controls are adequate and operating, and may investigate suspected fraud. It supports the responsibility; it does not hold it, and it reports to those who do.",
      },
      {
        step: "Deal with the employee option",
        detail:
          "Employees must act honestly and report suspicions, and a whistleblowing route matters. But that is a duty of conduct, not primary responsibility for the system that prevents and detects.",
      },
    ],
    answer:
      "**B — those charged with governance and management.**\n\nPrevention and detection require designing and operating internal controls and setting the tone at the top, and only management and those charged with governance can do either. Responsibility sits where the capability sits.\n\nThe external auditor obtains reasonable assurance that the statements are free from **material misstatement**, whether from fraud or error — a duty about the statements rather than a duty to find fraud, and the gap between those two is the expectation gap. Internal audit reviews and may investigate, but it supports the responsibility rather than holding it.",
    earns: ["Deriving responsibility from who is able to design and operate the controls"],
    loses: ["Answering external auditor, which is the most common public misconception on this topic"],
  },

  "BT-16::money-laundering": {
    title: "Identifying the stage of money laundering",
    format: "ot",
    marks: 2,
    requirement:
      "Criminal cash is paid into a series of bank accounts in small amounts to avoid attracting attention. This is which stage of money laundering?\n\nA  Placement\nB  Layering\nC  Integration\nD  Tipping off",
    plan: [
      {
        step: "Fix the three stages in order with the purpose of each",
        detail:
          "Placement: get the cash into the financial system. Layering: move it through transactions to break the audit trail. Integration: bring it back as apparently legitimate wealth.",
      },
      {
        step: "Ask where the money is at the moment described",
        detail:
          "It is cash being put into bank accounts, so it is entering the system for the first time. That is placement, whatever technique is used to do it.",
      },
      {
        step: "Do not let the technique move the stage",
        detail:
          "Splitting into small amounts — structuring or smurfing — is a placement technique. Candidates read \"a series of accounts\" as movement between accounts and answer layering.",
      },
      {
        step: "Strike the option from the offences list",
        detail:
          "Tipping off is an offence — alerting a suspect that a report has been made — not a stage. The offences are laundering itself, failure to report, and tipping off.",
      },
    ],
    answer:
      "**A — placement.**\n\nThe three stages are **placement** (getting criminal cash into the financial system), **layering** (moving it through transactions to break the audit trail) and **integration** (bringing it back as apparently legitimate wealth).\n\nHere the cash is entering the system for the first time, so it is placement. Splitting into small amounts to avoid reporting thresholds is a placement technique known as structuring or smurfing, and the mention of several accounts is what tempts candidates towards layering.\n\nTipping off is an offence rather than a stage — alongside laundering itself and failure to report a suspicion.",
    earns: [
      "Asking where the money currently is rather than what technique is being used",
      "Keeping the three stages separate from the three offences",
    ],
    loses: ["Answering layering because several accounts are mentioned"],
  },

  /* ── BT-17 · Financial technology and the finance function ───── */

  "BT-17::what-is-fintech": {
    title: "What counts as fintech",
    format: "ot",
    marks: 1,
    requirement:
      "Fintech is best described as:\n\nA  The use of technology to deliver financial products and services in new ways\nB  The accounting software used to prepare financial statements\nC  Cryptocurrency\nD  The IT department of a bank",
    plan: [
      {
        step: "Read the options for scope before content",
        detail:
          "Three options name one specific thing and one names a category. Where a stem asks what a broad term means, an option naming a single instance is usually too narrow to be the definition.",
      },
      {
        step: "State the definition plainly",
        detail:
          "Technology applied to the delivery of financial products and services in ways that change how they are provided — payments, lending, insurance, investment and compliance among them.",
      },
      {
        step: "Position the narrow options as examples",
        detail:
          "Cryptocurrency is one application of one underlying technology. Accounting software and a bank's IT department are infrastructure that supports finance rather than a new way of delivering it.",
      },
    ],
    answer:
      "**A — the use of technology to deliver financial products and services in new ways.**\n\nFintech spans payments, lending, insurance, investment management and regulatory compliance. What makes something fintech is that the technology changes how the service is delivered, rather than merely supporting an existing process.\n\nCryptocurrency is one application of one underlying technology. Accounting software and a bank's IT function support financial work without changing how financial services reach the customer.",
    earns: ["Rejecting an option that names one instance when the stem asks for a category"],
    loses: ["Equating fintech with cryptocurrency, which is one example of it"],
  },

  "BT-17::big-data": {
    title: "Recalling the characteristics that make data \"big\"",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is **not** one of the commonly cited characteristics of big data?\n\nA  Volume\nB  Velocity\nC  Variety\nD  Validity",
    plan: [
      {
        step: "Recall the standard set and its usual extension",
        detail:
          "The three Vs are volume, velocity and variety. Veracity is the usual fourth and value the usual fifth. All of them begin with V, which is what the question exploits.",
      },
      {
        step: "Check the fourth option against the set carefully",
        detail:
          "Validity also begins with V and sounds like veracity. Distinguishing the two by meaning rather than by initial letter is the entire question.",
      },
      {
        step: "Define each of the three to be certain",
        detail:
          "Volume: the sheer quantity. Velocity: the speed at which it arrives and must be processed. Variety: the range of forms, structured and unstructured. Each is clearly distinct.",
      },
      {
        step: "Confirm the outsider",
        detail:
          "Veracity — whether the data can be trusted — is the recognised fourth V. Validity is a related idea but is not the term the syllabus uses, so it is the one that does not belong.",
      },
    ],
    answer:
      "**D — validity.**\n\nThe three Vs are **volume** (the quantity), **velocity** (the speed at which it arrives and must be processed) and **variety** (the range of structured and unstructured forms). **Veracity** — whether the data can be trusted — is the usual fourth, and **value** the usual fifth.\n\nValidity sounds close enough to veracity to pass unexamined, and that similarity is the whole point of the question.",
    earns: ["Distinguishing veracity from validity by meaning rather than by the initial letter"],
    loses: ["Accepting any V-word as one of the characteristics"],
  },

  "BT-17::ai-and-rpa": {
    title: "Telling robotic process automation from artificial intelligence",
    format: "ot",
    marks: 2,
    requirement:
      "Software configured to copy invoice data from incoming emails into the purchase ledger, following the same defined steps every time, is an example of:\n\nA  Machine learning\nB  Robotic process automation\nC  Artificial intelligence\nD  Blockchain",
    plan: [
      {
        step: "Split on whether the rules were given or learned",
        detail:
          "RPA follows rules a person defined and does exactly the same thing each time. Machine learning derives its own rules from data and its behaviour changes as it sees more.",
      },
      {
        step: "Find the deciding phrase in the stem",
        detail:
          "\"Following the same defined steps every time\" states that the rules were given and do not change. That is RPA's definition, written into the question.",
      },
      {
        step: "Treat AI as the broad category, not the answer",
        detail:
          "Machine learning is a form of AI, so choosing AI over ML would not be more correct — but neither applies here, because nothing is being learned.",
      },
      {
        step: "Note where each is used, for the follow-on",
        detail:
          "RPA suits high-volume rules-based work: reconciliations, data transfer, routine postings. ML suits pattern recognition: anomaly detection, forecasting, credit scoring. That contrast is examined as often as the definitions.",
      },
    ],
    answer:
      "**B — robotic process automation.**\n\nRPA executes rules a human defined, doing the same thing the same way every time. The stem states exactly that with \"the same defined steps every time\".\n\nMachine learning derives its own rules from data and changes behaviour as it sees more, so it fits pattern-based work such as anomaly detection, forecasting and credit scoring. AI is the broad category that machine learning sits within; neither applies to a fixed rules-based task. Blockchain is a distributed ledger technology and is unrelated.",
    earns: ["Splitting on whether the rules were configured or learned"],
    loses: ["Calling any automation AI because software is doing work a person used to do"],
  },

  "BT-17::cloud-and-blockchain": {
    title: "What a distributed ledger changes about record-keeping",
    format: "ot",
    marks: 2,
    requirement:
      "The feature of a blockchain that most directly supports the reliability of the records it holds is that:\n\nA  It is stored on the internet\nB  Entries are replicated across many nodes and cannot practically be altered once confirmed\nC  It uses cryptocurrency\nD  It is maintained by a single trusted administrator",
    plan: [
      {
        step: "Name the property being asked about",
        detail:
          "Reliability of records means they can be trusted not to have been changed. So the answer must be whatever makes retrospective alteration impractical.",
      },
      {
        step: "Recall the two mechanisms that deliver it",
        detail:
          "Replication across many independent nodes, so there is no single copy to edit; and cryptographic chaining, so altering one entry invalidates everything after it. Together they make change impractical.",
      },
      {
        step: "Strike the option that inverts the model",
        detail:
          "D describes a central administrator, which is the opposite of distributed. A blockchain's point is that no single party controls the ledger, so this option contradicts the technology.",
      },
      {
        step: "Reject the incidental and the irrelevant",
        detail:
          "Being on the internet is true of a great deal that is not reliable. Cryptocurrency is one application built on blockchain, not the source of the ledger's integrity.",
      },
    ],
    answer:
      "**B — entries are replicated across many nodes and cannot practically be altered once confirmed.**\n\nTwo mechanisms produce this. **Replication** means there is no single copy to edit — a change would have to be made across the network simultaneously. **Cryptographic chaining** means each block carries a hash of the one before, so altering an early entry invalidates every block after it.\n\nD contradicts the model outright: the absence of a single controlling administrator is what distributed means. Cryptocurrency is one application built on the technology, not the source of its integrity.",
    earns: ["Naming replication and chaining as the mechanisms behind the property"],
    loses: ["Choosing the single administrator, which describes a conventional database"],
  },

  "BT-17::risks-and-the-role": {
    title: "What automation does to the accountant's job",
    format: "ot",
    marks: 2,
    requirement:
      "As routine processing is automated, the most likely effect on the role of the qualified accountant is that:\n\nA  The role disappears\nB  It shifts towards interpretation, judgement and advising the business\nC  It becomes purely a data entry role\nD  It is unaffected",
    plan: [
      {
        step: "Ask what automation is actually good at",
        detail:
          "High-volume, rules-based, repeatable work — posting, matching, reconciling. It is poor at judgement, at interpreting an ambiguous situation, and at explaining a result to someone who must act on it.",
      },
      {
        step: "Infer what is left rather than guessing at the outcome",
        detail:
          "If the rules-based part is automated, what remains is the judgement-based part: interpretation, advice, business partnering, and oversight of the automated processes themselves.",
      },
      {
        step: "Reject the two extremes",
        detail:
          "Automation removing the routine work does not remove the role, and C says the opposite of what happened — data entry is the first thing to be automated away.",
      },
      {
        step: "Add the oversight point, which is the follow-on mark",
        detail:
          "Someone must control the automated systems: their data quality, their configuration, and their outputs. Automated processing does not remove the need for control, it changes what the controls are over.",
      },
    ],
    answer:
      "**B — it shifts towards interpretation, judgement and advising the business.**\n\nAutomation absorbs high-volume rules-based work: posting, matching, reconciling. What it cannot do is exercise judgement in an ambiguous situation, or explain a result to someone who has to act on it — so that is what the role becomes.\n\nA second element matters as much: someone must oversee the automated systems themselves, their data quality, configuration and output. Automation does not remove the need for control; it changes what the control is over. C describes the work most likely to be automated first.",
    earns: [
      "Reasoning from what automation does well to what is left over",
      "Adding oversight of the automated systems as part of the changed role",
    ],
    loses: ["Choosing an extreme outcome when the syllabus point is a shift in emphasis"],
  },
}
