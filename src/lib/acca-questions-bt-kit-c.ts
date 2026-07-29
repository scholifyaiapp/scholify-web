import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi } from "@/lib/acca-bt-kit-builders"

/*
 * BT · Area C question kit — chapters 12 to 17. Authored, applied, exam-standard.
 * See acca-questions-bt-kit-a.ts for the kit's rationale.
 */

/* ── Chapter 12 · The accounting and finance function ──────────── */

const CH12: AccaQuestion[] = [
  q("BTK-12-01", "BT-12", "C", "easy", 2,
    "Which characteristic belongs to MANAGEMENT accounting rather than financial accounting?",
    [
      "Its format is prescribed by accounting standards",
      "It may be prepared for a single product, department or customer",
      "It is legally required for most entities",
      "Its primary users are shareholders and lenders",
    ],
    1,
    "Management accounting can be prepared at ANY level — one product, one department, one machine — because its purpose is internal decision-making and no external body prescribes its format. The other three options all describe FINANCIAL accounting: prescribed format, legal requirement, external users. The one-line distinction is that financial accounting looks outward and backward while management accounting looks inward and forward."),

  q("BTK-12-02", "BT-12", "C", "hard", 2,
    "A company's internal audit function reports to the finance director. Why is this a weakness?",
    [
      "Internal audit lacks the technical expertise to report at that level",
      "The finance function is one of the areas internal audit examines, so reporting to its head removes its independence structurally",
      "The finance director is too senior to receive internal audit reports",
      "It is not a weakness, provided the reports are also copied to the board",
    ],
    1,
    "Internal audit's entire value rests on INDEPENDENCE from the operations it examines — and the finance function is one of them. Reporting to the CFO means a finding that implicates finance goes to the person responsible for it, who also controls internal audit's budget and staffing. It should report to the AUDIT COMMITTEE. Copying the board does not cure it, because the reporting line still controls what gets escalated."),

  q("BTK-12-03", "BT-12", "C", "medium", 2,
    "A bank is deciding whether to renew a five-year facility. Which aspects of the company's information will it focus on most?",
    [
      "Earnings per share and dividend yield",
      "Liquidity, gearing, cash generation and covenant compliance",
      "Market share against competitors",
      "Directors' remuneration and share options",
    ],
    1,
    "A LENDER's return is CONTRACTUAL — interest as it falls due and capital at maturity — so it focuses on the ability to SERVICE and REPAY: liquidity, gearing, cash generation and covenants. Earnings per share and dividend yield are shareholder measures, because a lender's return does not rise with profit. This is the standard 'match the user to their information need' question."),

  q("BTK-12-04", "BT-12", "C", "medium", 2,
    "Which function is responsible for managing an organisation's exposure to currency and interest rate risk?",
    ["Financial accounting", "Management accounting", "Treasury", "Internal audit"],
    2,
    "TREASURY manages cash and liquidity, invests surpluses, raises and manages borrowing, and manages FINANCIAL RISK including currency, interest rate and credit exposure. Financial accounting records and reports; management accounting supports internal decisions; internal audit provides assurance that risk management is working — an important distinction, since internal audit EVALUATES the management of risk rather than performing it."),

  q("BTK-12-05", "BT-12", "C", "hard", 2,
    "A management accountant analyses a product line and concludes it does not cover its share of fixed costs. Who should decide whether to discontinue it?",
    [
      "The management accountant, as they hold the financial analysis",
      "Management, supported by the accountant's analysis — finance advises rather than decides operating matters",
      "The external auditor, as the decision affects the financial statements",
      "The audit committee, as it concerns cost control",
    ],
    1,
    "Finance SUPPLIES the analysis — contribution rather than gross margin, whether the fixed costs are avoidable, the effect on the rest of the range — but discontinuing a product is an OPERATING decision for management. Overstating finance's authority is as wrong as understating its role. The external auditor and audit committee have no part in operating decisions at all."),

  multi("BTK-12-06", "BT-12", "C", "medium", 2,
    "Which TWO differences between financial and management accounting are correctly stated?",
    [
      "Financial accounting is historic; management accounting is both historic and forward-looking",
      "Financial accounting may be prepared at any level; management accounting covers the whole entity",
      "Management accounting trades precision for timeliness and relevance",
      "Management accounting must follow accounting standards",
    ],
    [0, 2],
    "Financial accounting is HISTORIC while management accounting is historic AND FORWARD-LOOKING, and management accounting deliberately trades PRECISION for TIMELINESS — an approximate figure today beats an exact one next month. Option 2 reverses coverage: financial accounting covers the whole entity while management accounting can cover any level. Option 4 is wrong: management accounting follows no external rules."),

  q("BTK-12-07", "BT-12", "C", "medium", 2,
    "Assessing a new customer's creditworthiness and setting their credit limit is the role of the:",
    ["Financial controller", "Credit controller", "Treasurer", "Sales manager"],
    1,
    "The CREDIT CONTROLLER assesses customer creditworthiness, sets limits and collects receivables. Separating this from SALES is a deliberate control: a salesperson on commission has an incentive to approve the order regardless of the customer's ability to pay. The financial controller owns the ledgers and statutory accounts, and the treasurer manages the organisation's own cash and funding."),

  q("BTK-12-08", "BT-12", "C", "hard", 2,
    "Automation has removed most transaction processing from a finance function. What is the most accurate description of where its value now lies?",
    [
      "Recording and reporting, performed faster",
      "Control and advisory work — designing controls, investigating exceptions, interpreting and forecasting",
      "Purely in supervising the software",
      "It no longer adds value, so it should be outsourced entirely",
    ],
    1,
    "Recording and reporting are the activities automation absorbs, so the function's contribution moves UP to CONTROL (owning the rules, the master data, the exceptions) and ADVISORY work (interpretation, forecasting, challenging assumptions). Option 1 misses that the work itself changes rather than merely speeding up, and options 3 and 4 both understate what remains — which is the higher-skilled part."),

  q("BTK-12-09", "BT-12", "C", "easy", 1,
    "Which of the following pairs a business function with the information it needs FROM finance, correctly?",
    [
      "Purchasing — sales forecasts and order pipeline",
      "Sales and marketing — margin by product and customer, and credit limits",
      "Human resources — machine hours and scrap rates",
      "Production — supplier payment terms only",
    ],
    1,
    "SALES AND MARKETING needs MARGIN ANALYSIS by product and customer, plus credit limits, to know which business is worth winning. Sales forecasts flow FROM sales TO finance, not the reverse; machine hours and scrap rates are production data, not HR's; and production needs costings, variance analysis and investment appraisal rather than only supplier terms."),

  q("BTK-12-10", "BT-12", "C", "medium", 2,
    "Which quality of information is most directly sacrificed when management accounting favours speed?",
    ["Relevance", "Accuracy", "Understandability", "Comparability"],
    1,
    "There is a genuine trade-off between TIMELINESS and ACCURACY, and management accounting deliberately resolves it in favour of timeliness — while financial accounting resolves it the other way. Relevance is precisely what fast management information preserves, and understandability and comparability are not what speed costs. Recognising this trade-off as deliberate rather than sloppy is the examinable point."),
]

/* ── Chapter 13 · Law, regulation and financial information ────── */

const CH13: AccaQuestion[] = [
  q("BTK-13-01", "BT-13", "C", "medium", 2,
    "Which statement about the external audit is correct?",
    [
      "The auditor is appointed by the directors and reports to them",
      "The auditor is appointed by the shareholders and gives them an opinion on the financial statements",
      "The audit provides absolute assurance that the statements contain no error",
      "The audit's primary purpose is the detection of fraud",
    ],
    1,
    "The external auditor is appointed by the SHAREHOLDERS and reports to them, answering one question: do these statements present a true and fair view? That structure is what makes it possible to report something management would prefer unsaid. The answer carries REASONABLE rather than absolute assurance, because it rests on sampling and risk assessment, and fraud detection is not its purpose — the difference from public expectation being the expectation gap."),

  q("BTK-13-02", "BT-13", "C", "hard", 2,
    "Why is an independent audit still necessary when accounting standards already prescribe how items must be treated?",
    [
      "Because standards are voluntary and companies may ignore them",
      "Because standards constrain choice but leave judgement over useful lives, provisions, impairment and revenue timing",
      "Because auditors write the accounting standards",
      "Because standards apply only to listed companies",
    ],
    1,
    "Standards LIMIT DISCRETION; they do not eliminate JUDGEMENT. Useful lives, provisions, impairment and revenue timing all require estimates that management makes and has an interest in, which is exactly what independent examination addresses. Standards are not voluntary where adopted, auditors do not set them, and they apply well beyond listed entities."),

  q("BTK-13-03", "BT-13", "C", "medium", 2,
    "Which of the following is NOT a source of accounting regulation?",
    ["National company law", "Accounting standards", "Stock exchange listing rules", "The company's own internal accounting manual"],
    3,
    "An internal accounting manual is the company's own POLICY — useful and necessary, but not a source of external regulation, and the company can change it. The three sources are NATIONAL LAW (who must report and file), ACCOUNTING STANDARDS (how items are recognised and disclosed) and STOCK EXCHANGE RULES (extra continuing obligations for listed companies)."),

  q("BTK-13-04", "BT-13", "C", "hard", 2,
    "A sales manager receives a monthly report listing all 1,840 invoices raised in her region in invoice-number order, showing customer and value. Why is this data rather than management information?",
    [
      "Because it is produced monthly rather than weekly",
      "Because it has not been selected, summarised, compared or interpreted, so it cannot change any decision",
      "Because it contains too few fields",
      "Because it should have been sent to the finance director instead",
    ],
    1,
    "Data becomes INFORMATION only when SELECTED, SUMMARISED, COMPARED and INTERPRETED for a decision. This report is complete, accurate and unusable: nothing is totalled, nothing is benchmarked against budget or last year, and margin — the dimension that would tell her whether the sales were worth making — is absent entirely. Note that adding more invoices would make it worse, not better."),

  q("BTK-13-05", "BT-13", "C", "medium", 2,
    "Which statement correctly distinguishes internal from external audit?",
    [
      "Internal audit is appointed by shareholders; external audit by the audit committee",
      "Internal audit's scope is set by the organisation; external audit's is set by law and auditing standards",
      "Both are legally required for companies above a size threshold",
      "Internal audit gives an opinion on the financial statements; external audit reviews internal control",
    ],
    1,
    "INTERNAL audit's scope is set BY THE ORGANISATION and can cover anything it chooses; EXTERNAL audit's scope is set by LAW and auditing standards. Option 1 reverses the appointments; option 3 is wrong because internal audit is generally not legally required; and option 4 swaps the two objectives entirely — external audit opines on the statements, internal audit evaluates risk, control and governance."),

  multi("BTK-13-06", "BT-13", "C", "medium", 2,
    "Which TWO reasons explain why financial reporting is regulated?",
    [
      "To ensure every company reports the same profit",
      "To make statements comparable between entities and over time",
      "To protect users who have no power to demand information themselves",
      "To guarantee that a company will not fail",
    ],
    [1, 2],
    "Regulation exists for COMPARABILITY and to PROTECT USERS who cannot demand information — a small shareholder or prospective supplier has no leverage to insist on data. It does not make different businesses report the same profit, which would defeat the purpose, and no reporting framework can guarantee solvency. Credibility, managing the agency problem and supporting efficient capital markets are the other standard reasons."),

  q("BTK-13-07", "BT-13", "C", "easy", 2,
    "Reporting only those items falling outside expected limits, so that management attention goes where it is needed, is called:",
    ["Exception reporting", "Variance analysis", "Integrated reporting", "Segmental reporting"],
    0,
    "EXCEPTION REPORTING presents only items outside defined parameters, which is the standard remedy for information overload. Variance analysis compares actual against budget and explains differences — related, and often the source of the exceptions, but not the same concept. Integrated reporting covers value creation across multiple capitals, and segmental reporting disaggregates results by business segment."),

  q("BTK-13-08", "BT-13", "C", "hard", 2,
    "A trade association publishes a forecast that its own industry will grow 12% next year. How should an analyst treat this source?",
    [
      "As fully reliable, since the association has the best industry data",
      "With care: it has the best data and also an interest in the conclusion, so check the basis, date and coverage",
      "As worthless, since all external sources are unreliable",
      "As an internal source, since members supply the underlying figures",
    ],
    1,
    "Judge any external source on three questions: WHO produced it and why (is there an interest in the conclusion?), WHEN, and ON WHAT BASIS (sample, definitions, coverage). A trade association genuinely has the best data AND is not disinterested — both are true at once. It remains an EXTERNAL source: the association is a separate body, whatever the origin of its inputs."),

  q("BTK-13-09", "BT-13", "C", "medium", 2,
    "What is the 'expectation gap' in relation to external audit?",
    [
      "The difference between budgeted and actual audit fees",
      "The difference between what an audit provides and what users commonly believe it provides",
      "The delay between the year end and the audit report",
      "The difference between internal and external audit scope",
    ],
    1,
    "The EXPECTATION GAP is the difference between what an audit actually delivers — reasonable assurance on the financial statements, based on sampling and risk — and what users often assume, such as absolute accuracy, a guarantee of survival, or full fraud detection. It matters because it is the source of much criticism of auditors for failing to do things an audit was never designed to do."),

  q("BTK-13-10", "BT-13", "C", "easy", 1,
    "Which body develops and issues international financial reporting standards?",
    ["The International Accounting Standards Board", "The World Trade Organisation", "A national tax authority", "The company's audit committee"],
    0,
    "The INTERNATIONAL ACCOUNTING STANDARDS BOARD develops and issues IFRS Accounting Standards through a public due process, and many jurisdictions adopt them. The WTO governs trade rules; a tax authority assesses tax liabilities under tax law, which is separate from financial reporting; and an audit committee oversees a single company's reporting rather than setting standards."),
]

/* ── Chapter 14 · Financial systems and procedures ─────────────── */

const CH14: AccaQuestion[] = [
  q("BTK-14-01", "BT-14", "C", "easy", 2,
    "Why should a purchase invoice be matched to BOTH the purchase order and the goods received note before payment?",
    [
      "To calculate the gross margin on the goods",
      "To confirm the purchase was authorised at an agreed price AND that the goods actually arrived",
      "To satisfy a payroll requirement",
      "To identify the cheapest available supplier",
    ],
    1,
    "The three-way match establishes TWO separate facts: the purchase ORDER shows the purchase was authorised at an agreed price, and the GOODS RECEIVED NOTE shows the goods arrived. An invoice alone proves neither, which is why this single control prevents both error and supplier fraud — paying for goods nobody ordered, or for goods never delivered."),

  q("BTK-14-02", "BT-14", "C", "medium", 2,
    "In the sales cycle, at what point should a customer's credit position be checked?",
    [
      "After the invoice has been raised",
      "Before the goods are despatched",
      "Only when the balance becomes overdue",
      "At the year end, as part of the receivables review",
    ],
    1,
    "The credit check must come BEFORE DESPATCH. Once the goods have left, the exposure exists and the check can only discover a problem that can no longer be avoided. Checking at invoicing is too late, chasing only once overdue is collection rather than control, and a year-end review is far too late to prevent anything."),

  q("BTK-14-03", "BT-14", "C", "hard", 2,
    "A monthly bank reconciliation is completed using a $3,200 'sundry adjustment' with no supporting explanation, so that the two figures agree. What is the control weakness?",
    [
      "None — the reconciliation balances, which is its purpose",
      "The unexplained adjustment turns a detective control into a mechanism that conceals error or fraud",
      "The adjustment should have been posted to suspense instead",
      "The reconciliation should be performed weekly rather than monthly",
    ],
    1,
    "A reconciliation's value lies in EXPLAINING differences, not in reaching agreement. Forcing it to balance with an unexplained figure converts a control that DETECTS error and fraud into one that CONCEALS them — and the concealment now carries the appearance of a completed control. Posting to suspense without investigation has the same defect, and frequency is not the issue here."),

  q("BTK-14-04", "BT-14", "C", "medium", 2,
    "Which control most directly prevents a fictitious employee being added to the payroll and paid?",
    [
      "Recalculating gross pay each month",
      "Authorising starters, leavers and pay changes independently of whoever processes the payroll",
      "Reconciling the payroll total to the general ledger",
      "Paying all employees by bank transfer rather than cash",
    ],
    1,
    "INDEPENDENT AUTHORISATION of starters, leavers and pay changes is what prevents the person who runs the payroll from creating and paying a fictitious employee. Recalculating gross pay checks accuracy, not existence; reconciling to the ledger would agree perfectly since the fictitious pay is genuinely recorded; and bank transfer changes the payment method without addressing who can add a payee."),

  q("BTK-14-05", "BT-14", "C", "medium", 2,
    "A petty cash float is restored to exactly $500 each month by reimbursing the total of the vouchers submitted. What is this system called, and what makes it a control?",
    [
      "A float system; it limits the maximum loss",
      "An imprest system; cash plus vouchers must always equal the float, so any shortfall is immediately visible",
      "A suspense system; unexplained items are held pending investigation",
      "A control account system; the total is agreed to individual balances",
    ],
    1,
    "An IMPREST system restores the float to a FIXED amount, which means cash plus vouchers must always equal that amount — so a shortfall shows up at once without needing a separate investigation. Limiting maximum loss is a real secondary benefit, but the control mechanism is the arithmetic identity. Suspense accounts and control accounts are different devices entirely."),

  multi("BTK-14-06", "BT-14", "C", "hard", 2,
    "A company automates invoice matching and payment with no human intervention on items that match. Which TWO controls become MORE important?",
    [
      "Manual recalculation of every invoice's arithmetic",
      "Change control over supplier master data, especially bank details",
      "Review of the exceptions the system could not match",
      "Filing paper copies of every purchase order",
    ],
    [1, 2],
    "Automation RELOCATES control rather than removing it. CHANGE CONTROL over supplier master data becomes critical, because anyone able to amend a supplier's bank details can divert every future payment automatically and at speed; and EXCEPTION REVIEW becomes critical, because the human now sees only the difficult cases. Manual recalculation and paper filing both add cost without adding assurance, since the software performs the arithmetic consistently."),

  q("BTK-14-07", "BT-14", "C", "medium", 2,
    "Which of the following is a genuine RISK of relying on a spreadsheet as a system of record for a material balance?",
    [
      "Spreadsheets cannot perform arithmetic reliably",
      "There is typically no audit trail, no access control, no version control and no input validation",
      "Spreadsheets cannot be backed up",
      "Spreadsheets are prohibited by accounting standards",
    ],
    1,
    "Spreadsheets typically lack an AUDIT TRAIL, ACCESS CONTROL, VERSION CONTROL and VALIDATION; formulae are easily overwritten and a mis-set range can corrupt a total silently. They are excellent for analysis and unsafe as records. Their arithmetic is reliable, they can be backed up, and no standard prohibits them — the weakness is control, not capability."),

  q("BTK-14-08", "BT-14", "C", "hard", 2,
    "What is the principal risk of an integrated ERP system with a single shared database?",
    [
      "Data has to be entered several times, creating inconsistency",
      "One error propagates immediately across every function, and the system is a single point of failure",
      "Reports cannot be produced across functions",
      "It prevents standardisation of business processes",
    ],
    1,
    "Integration is both the benefit and the risk, for the same reason: a transaction entered once updates every affected record — and so does an ERROR. It also concentrates dependency on one system and one supplier, making it a single point of failure. Options 1, 3 and 4 all describe the opposite of what an ERP does: it removes duplicate entry, enables cross-functional reporting, and enforces standardised processes."),

  q("BTK-14-09", "BT-14", "C", "easy", 1,
    "A general ledger account holding the total of every individual customer balance is known as a:",
    ["Suspense account", "Control account", "Nominal account", "Imprest account"],
    1,
    "A CONTROL ACCOUNT holds the TOTAL of a set of individual accounts — here, all customer balances. Because the total and the individual balances are built from the same transactions by different routes, agreeing them detects errors in either. A suspense account holds unexplained items pending investigation, and an imprest account is a petty cash arrangement."),

  q("BTK-14-10", "BT-14", "C", "medium", 2,
    "What does an 'audit trail' allow a user to do?",
    [
      "Predict future transaction volumes",
      "Trace any recorded figure back to its source document and the authorisation behind it",
      "Calculate the audit fee",
      "Bypass authorisation limits in an emergency",
    ],
    1,
    "An AUDIT TRAIL allows any figure to be traced back to its SOURCE DOCUMENT and its AUTHORISATION. It is what makes every other assurance possible: without it, nobody — internal audit, the external auditor, or a manager investigating a variance — can establish whether a figure is right. It is also the first thing a fraud attempts to break."),
]

/* ── Chapter 15 · Internal control, security and compliance ────── */

const CH15: AccaQuestion[] = [
  q("BTK-15-01", "BT-15", "C", "medium", 2,
    "A monthly bank reconciliation is best classified as which type of control?",
    ["Preventive", "Detective", "Corrective", "Directive"],
    1,
    "A reconciliation is always DETECTIVE: it finds problems AFTER they have occurred and cannot stop them happening. Preventive controls act before the event — authorisation limits, passwords, segregation, credit checks. Corrective controls act after detection to put matters right. Classifying a reconciliation as preventive is one of the most common errors in Area C."),

  q("BTK-15-02", "BT-15", "C", "hard", 2,
    "An accounts assistant opens the post containing customer cheques, records the receipts, prepares and takes the bank deposit, and performs the monthly bank reconciliation. Which combination is the CORE segregation failure?",
    [
      "Preparing and taking the deposit",
      "Custody of the cheques combined with recording the receipts",
      "Opening the post and preparing the deposit",
      "Performing the reconciliation monthly rather than weekly",
    ],
    1,
    "CUSTODY plus RECORDING is the core failure: someone who physically holds the asset and writes the record can misappropriate a receipt and post an entry to conceal it. It is made far worse by her also performing the reconciliation — the one control that would detect the concealment is operated by the person who created it, which is not a control at all. Frequency is irrelevant to the segregation problem."),

  q("BTK-15-03", "BT-15", "C", "medium", 2,
    "A company requires staff who handle cash to take two consecutive weeks' leave each year. What is this?",
    [
      "A staff benefit with no control purpose",
      "A detective personnel control, because concealment needing continuous attention is exposed while someone else covers the role",
      "A preventive control, because it stops fraud occurring",
      "A corrective control, because it puts right any loss",
    ],
    1,
    "Mandatory leave is a DETECTIVE PERSONNEL control. Many concealment schemes — lapping of customer receipts in particular — require CONTINUOUS attention, so forcing a two-week absence with someone else doing the job exposes them. It does not PREVENT a fraud starting, which is why 'preventive' is the tempting wrong answer, and it corrects nothing by itself."),

  q("BTK-15-04", "BT-15", "C", "hard", 2,
    "A three-person business cannot achieve full segregation of duties. What is the appropriate recommendation?",
    [
      "Segregate the duties anyway, by splitting each task in half",
      "Introduce compensating controls: close owner involvement, personally opened bank statements, approval of all payments, rotation and mandatory leave",
      "Accept that no control is possible in a small entity",
      "Employ additional staff purely to permit segregation",
    ],
    1,
    "Where the ideal control is impracticable, the answer is COMPENSATING CONTROLS — much closer owner involvement, bank statements opened personally by the owner, owner approval of all payments, rotation and mandatory leave. Option 1 is not achievable with three people; option 3 abandons the problem; and option 4 would cost more than the risk it addresses, failing the cost-benefit test that is itself part of the framework."),

  multi("BTK-15-05", "BT-15", "C", "medium", 2,
    "Which TWO of the following are GENERAL IT controls rather than application controls?",
    ["Range and format checks on data entry", "Prompt removal of leavers' system access", "Segregation of development, test and live environments", "Sequence checks on document numbers"],
    [1, 2],
    "ACCESS MANAGEMENT (including removing leavers) and ENVIRONMENT SEPARATION are GENERAL controls over the IT environment as a whole. Range and format checks and sequence checks are APPLICATION controls operating within a particular system. The distinction matters because general control weaknesses undermine every application running on the environment."),

  q("BTK-15-06", "BT-15", "C", "hard", 2,
    "A managing director routinely approves his own expense claims and instructs staff to process payments outside documented authorisation limits when he judges it urgent. What is the most serious weakness?",
    [
      "The authorisation limits are set too low",
      "The expense claim form is poorly designed",
      "The control environment is weak, which undermines every other control in the organisation",
      "There is no weakness, as the managing director holds ultimate authority",
    ],
    2,
    "This is a CONTROL ENVIRONMENT failure. Senior management visibly overriding the system teaches every employee that the controls are optional, which weakens ALL of them at once — including those that are perfectly well designed. That is why the environment is the foundation of the system and why an auditor treats a management-override culture as far more serious than any single missing control."),

  q("BTK-15-07", "BT-15", "C", "medium", 2,
    "Which of the following is an INHERENT limitation of internal control rather than a fixable failure?",
    [
      "Leavers' system access is never removed",
      "Two employees colluding to defeat segregation of duties",
      "The bank reconciliation is performed by the cashier",
      "Authorisation limits have never been documented",
    ],
    1,
    "COLLUSION is inherent: segregation assumes people act independently, and no realistic system can prevent two or more people cooperating to defeat it. The other three are all fixable failures — remove leavers' access, reassign the reconciliation to someone independent of cash handling, and document the limits. The other inherent limitations are cost-benefit, human error, management override, non-routine transactions and errors of judgement."),

  q("BTK-15-08", "BT-15", "C", "medium", 2,
    "In the SPAMSOAP classification, which control category covers budgets, variance analysis and management review outside routine processing?",
    ["Supervision", "Management controls", "Organisation", "Arithmetical and accounting controls"],
    1,
    "MANAGEMENT CONTROLS are those exercised outside the routine transaction processing — budgets, variance analysis, internal audit and management review. SUPERVISION is day-to-day oversight of work as it is done, which is a narrower and more immediate activity. Organisation refers to a clear structure with defined responsibilities, and arithmetical and accounting controls are reconciliations, control accounts and sequence checks."),

  q("BTK-15-09", "BT-15", "C", "hard", 2,
    "In an integrated computerised system, one user login can raise a purchase order, approve it, amend supplier bank details and release the payment. What is the position on segregation of duties?",
    [
      "Segregation is intact, provided the organisation chart separates these roles",
      "There is no effective segregation: in a computerised system, segregation IS the access-rights configuration",
      "Segregation is not required in an automated system",
      "Segregation is intact, because the system produces an audit trail",
    ],
    1,
    "In an integrated system, segregation of duties IS delivered by ACCESS RIGHTS. One login able to order, approve, change bank details and pay defeats it completely, whatever the organisation chart says — which is why user access reviews are a standard audit test. An audit trail records what happened; it does not prevent it, and by then the payment has gone."),

  q("BTK-15-10", "BT-15", "C", "easy", 1,
    "What are the four objectives of internal control?",
    [
      "Profit maximisation, growth, market share and reputation",
      "Effective and efficient operations, reliable financial reporting, safeguarding of assets, and compliance with laws and regulations",
      "Preventing all fraud, all error, all loss and all non-compliance",
      "Reducing audit fees, satisfying regulators, reassuring lenders and pleasing shareholders",
    ],
    1,
    "The four objectives are EFFECTIVE AND EFFICIENT OPERATIONS, RELIABLE FINANCIAL REPORTING, SAFEGUARDING OF ASSETS, and COMPLIANCE. Option 3 is the misconception being tested: internal control provides REASONABLE, not absolute, assurance, so promising to prevent everything misstates the standard. Options 1 and 4 confuse business objectives and stakeholder reactions with the purposes of a control system."),
]

/* ── Chapter 16 · Fraud and its prevention ─────────────────────── */

const CH16: AccaQuestion[] = [
  q("BTK-16-01", "BT-16", "C", "medium", 2,
    "Which element of the fraud triangle is most directly addressed by internal control?",
    ["Motive", "Rationalisation", "Opportunity", "Intent"],
    2,
    "OPPORTUNITY is what internal control attacks directly — segregation, authorisation, reconciliation, access rights and supervision remove the ability both to commit a fraud and to conceal it. Management does influence motive (through targets and pay design) and rationalisation (through culture and ethics), but those levers are slower and less certain. 'Intent' is not one of the three conditions."),

  q("BTK-16-02", "BT-16", "C", "hard", 2,
    "A long-serving credit controller opens the post, records customer receipts, banks them and prepares the receivables reconciliation. Receivables days have risen from 41 to 58 with unchanged credit terms, and she has never taken more than three consecutive days' leave. Which fraud does this pattern most suggest?",
    ["Ghost employees on the payroll", "Teeming and lading of customer receipts", "Inflated supplier invoices", "Financial statement fraud by management"],
    1,
    "TEEMING AND LADING (lapping) fits every fact: she has custody, recording and the reconciliation; rising receivables days with unchanged terms is consistent with receipts being taken and balances covered late; and the concealment requires CONTINUOUS attention, which is why more than three days away has never been possible. Each fact is innocent alone — together they form a recognised pattern."),

  q("BTK-16-03", "BT-16", "C", "medium", 2,
    "Who has PRIMARY responsibility for preventing and detecting fraud in an organisation?",
    ["The external auditor", "Directors and management", "Internal audit", "The audit committee"],
    1,
    "DIRECTORS AND MANAGEMENT carry primary responsibility, through internal control, risk assessment and setting an ethical culture. The external auditor seeks REASONABLE ASSURANCE that the financial statements are free from material misstatement whether caused by fraud or error — which is not the same as being responsible for detection. Internal audit evaluates and tests; the audit committee oversees. Attributing primary responsibility to the auditor is the expectation gap, and a guaranteed wrong answer."),

  q("BTK-16-04", "BT-16", "C", "hard", 2,
    "A sales division earns a large bonus only if it hits its annual target exactly — nothing at 99%, full bonus at 100%. In late December it is 2% short. Which fraud triangle conditions has the scheme itself supplied?",
    [
      "Opportunity only",
      "Pressure and rationalisation",
      "Rationalisation only",
      "None — incentive schemes are motivational tools, not fraud risks",
    ],
    1,
    "The cliff-edge bonus supplies PRESSURE, and the natural framing ('the orders are coming anyway, I am only recognising them a fortnight early') supplies RATIONALISATION. If the division can also raise invoices without an independent despatch check, the organisation has supplied OPPORTUNITY too — meaning all three conditions came from its own design choices rather than from dishonest people. This is why aggressive targets are treated as fraud risk factors."),

  q("BTK-16-05", "BT-16", "C", "medium", 2,
    "Which statement about financial statement fraud is correct?",
    [
      "It is usually committed by junior employees misappropriating assets",
      "It is usually committed by management, is larger in effect, and is harder to detect because they can override controls",
      "It is easier to detect than asset misappropriation, because it affects reported figures",
      "It is not fraud, because no assets are stolen",
    ],
    1,
    "EMPLOYEES misappropriate assets; MANAGEMENT misstates financial statements. Management fraud is larger in monetary effect and harder to detect precisely because the perpetrators design the controls, set the tone and can instruct staff. That is why governance — independent NEDs, an audit committee, an auditor appointed by shareholders — is the control layer aimed at it. Deliberate misstatement is unquestionably fraud."),

  multi("BTK-16-06", "BT-16", "C", "medium", 2,
    "Which TWO features are essential for a whistleblowing arrangement to work?",
    [
      "It must bypass line management, who may be implicated",
      "It must require the reporter to identify themselves publicly",
      "The reporter must be protected from retaliation",
      "It must require documentary proof before a report can be made",
    ],
    [0, 2],
    "An effective route must BYPASS LINE MANAGEMENT — who may be the subject of the concern — and must PROTECT THE REPORTER from retaliation, which employment law generally provides for. Requiring public identification and requiring proof before reporting would both deter exactly the reports the arrangement exists to receive; concerns are raised on suspicion, and investigating them is the organisation's job."),

  q("BTK-16-07", "BT-16", "C", "hard", 2,
    "An accountant develops a suspicion, but no proof, that a client's funds derive from criminal activity. What must they do?",
    [
      "Gather evidence until the suspicion can be proven, then report",
      "Report the suspicion as required, and not inform the client",
      "Inform the client so they can explain, then report if the explanation is unsatisfactory",
      "Take no action, as client confidentiality prevents disclosure",
    ],
    1,
    "The test is SUSPICION, not proof, so waiting to gather evidence is itself non-compliance. And TIPPING OFF — telling the client a report has been made or an investigation may follow — is a SEPARATE offence, which rules out option 3. Anti-money-laundering obligations OVERRIDE client confidentiality, so option 4 is wrong: this is one of the clearest cases where a professional duty is displaced by law."),

  q("BTK-16-08", "BT-16", "C", "medium", 2,
    "Which control most directly addresses the risk of a genuine supplier's bank details being changed to divert payments?",
    [
      "Reconciling the payables control account monthly",
      "Independent verification of any bank detail change, by callback to a previously known contact number",
      "Requiring two signatures on cheques",
      "Obtaining supplier statements at the year end",
    ],
    1,
    "Payment diversion works by amending MASTER DATA, so the control must sit on the change itself: INDEPENDENT VERIFICATION by callback to a number already held, not one supplied in the change request. A control account reconciliation would agree, because the payment is genuinely recorded against a genuine supplier; cheque signatures do not apply to electronic payments to an approved payee; and year-end statements find it far too late."),

  q("BTK-16-09", "BT-16", "C", "easy", 2,
    "What are the three stages of money laundering?",
    [
      "Deposit, transfer, withdrawal",
      "Placement, layering, integration",
      "Identification, verification, reporting",
      "Detection, investigation, prosecution",
    ],
    1,
    "The three stages are PLACEMENT (criminal cash first enters the financial system), LAYERING (complex transfers and entities obscure its origin) and INTEGRATION (the funds re-emerge as apparently legitimate income or assets). An accountant is most likely to encounter layering and integration, where the money already resembles ordinary business activity. Option 3 describes due diligence steps rather than the laundering process."),

  q("BTK-16-10", "BT-16", "C", "hard", 2,
    "What distinguishes fraud from error, and why does the distinction matter?",
    [
      "Nothing of substance — both misstate the accounts equally",
      "Intent. The accounting effect may be identical, but fraud raises questions about who else was involved, what else is affected, and whether external reporting is required",
      "Fraud is always material and error never is",
      "Error is committed by staff and fraud only by management",
    ],
    1,
    "The distinguishing element is INTENT: fraud is intentional deception for advantage, error is unintentional. The effect on the accounts may be identical, but the RESPONSE differs completely — an error means a control failed and needs fixing, while a fraud raises questions about complicity, scope, whether the concealment is still running, and external reporting obligations. Materiality and seniority are unrelated to the distinction."),
]

/* ── Chapter 17 · Financial technology ────────────────────────── */

const CH17: AccaQuestion[] = [
  q("BTK-17-01", "BT-17", "C", "medium", 2,
    "A model identifies which customer balances are most likely to become bad debts next quarter. Which type of analytics is this?",
    ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
    2,
    "Forecasting what is LIKELY TO HAPPEN is PREDICTIVE analytics. Descriptive would report last quarter's bad debts; diagnostic would explain why they arose; and PRESCRIPTIVE would go further and recommend the specific credit limits and terms to apply in response. Value and difficulty rise across the sequence, and the professional contribution has moved to diagnostic and above."),

  q("BTK-17-02", "BT-17", "C", "hard", 2,
    "Which statement about blockchain is correct?",
    [
      "It prevents fraudulent transactions from being recorded",
      "It makes retrospective alteration of a recorded entry detectable",
      "It verifies that recorded transactions are commercially genuine",
      "It removes the need for any audit of the entity",
    ],
    1,
    "Blockchain makes a record TAMPER-EVIDENT: blocks are cryptographically linked and replicated across participants, so altering an earlier entry cannot be done without detection. It does NOT validate what was entered — a fraudulent transaction is recorded immutably AS a fraudulent transaction. Assurance therefore shifts toward whether transactions were authorised, correctly classified and commercially genuine, rather than disappearing."),

  q("BTK-17-03", "BT-17", "C", "medium", 2,
    "How does robotic process automation differ from machine learning?",
    [
      "RPA infers patterns from data; machine learning follows explicit rules",
      "RPA follows explicit rules and is fully explainable; machine learning infers patterns from data and is often unexplainable",
      "They are the same technology under different names",
      "RPA can only operate on financial data; machine learning on any data",
    ],
    1,
    "RPA follows EXPLICIT RULES written by a person, is fully explainable, and does not learn — its failure mode is executing a wrong rule perfectly, at scale, until someone notices. MACHINE LEARNING infers patterns from training data, is often a black box, and its failure mode is reproducing bias present in that data. Because the failure modes differ, so do the controls: change control over rules versus data quality and bias testing."),

  q("BTK-17-04", "BT-17", "C", "easy", 2,
    "What are the four Vs commonly used to characterise big data?",
    [
      "Volume, velocity, variety, veracity",
      "Value, volume, variance, verification",
      "Velocity, validity, volatility, volume",
      "Variety, value, vision, verification",
    ],
    0,
    "The four Vs are VOLUME (far more data than conventional systems handle), VELOCITY (arriving continuously, needing near-real-time processing), VARIETY (structured records alongside unstructured text, images and sensor data) and VERACITY (uncertain accuracy, so quality must be actively managed). Veracity is the one candidates most often omit, and it is the one that matters most to an accountant."),

  q("BTK-17-05", "BT-17", "C", "hard", 2,
    "A machine learning model is trained on ten years of a company's own credit decisions and now approves or refuses credit automatically. What is the principal risk?",
    [
      "The model will be slower than human assessors",
      "It inherits and industrialises the bias present in ten years of past decisions, while appearing objective",
      "It cannot process numerical data",
      "It will approve every application to maximise revenue",
    ],
    1,
    "ALGORITHMIC BIAS is the principal risk: ten years of the company's own decisions encode ten years of its own biases, and the model now applies them CONSISTENTLY, AT SCALE, with the appearance of objectivity. Speed and numerical capability are strengths rather than risks. The safeguard is meaningful human oversight with a real override, plus periodic bias testing and monitoring for model drift."),

  multi("BTK-17-06", "BT-17", "C", "medium", 2,
    "Which TWO are genuine RISKS of moving financial systems to the cloud?",
    [
      "Capacity cannot be increased when needed",
      "Total dependence on internet connectivity",
      "Data is held by a third party, possibly in another jurisdiction",
      "Software updates and patching must be performed in-house",
    ],
    [1, 2],
    "CONNECTIVITY DEPENDENCE and THIRD-PARTY DATA CUSTODY — potentially across borders, engaging data protection obligations — are real risks, alongside loss of control over when changes happen and provider concentration. Options 1 and 4 state the OPPOSITE of how cloud works: capacity scales on demand, and the provider handles updates, patching and backup, which is one of its main benefits."),

  q("BTK-17-07", "BT-17", "C", "medium", 2,
    "What is 'automation bias', and why is it dangerous?",
    [
      "The tendency of automated systems to make more errors than humans",
      "The tendency to trust an output because it came from a system, so a single error is reproduced identically at scale before anyone questions it",
      "The preference of management for automating rather than recruiting",
      "The tendency of software to favour recent data over historic data",
    ],
    1,
    "AUTOMATION BIAS is the tendency to TRUST an output because a system produced it. It is dangerous precisely because automated output is consistent, confident and fast, so an error is reproduced identically thousands of times before it is challenged. The control is MEANINGFUL human oversight — someone who both can and does override the output — and oversight that has never disagreed with the machine is documentation, not control."),

  q("BTK-17-08", "BT-17", "C", "hard", 2,
    "An analysis finds that customers who contact the support line twice in their first month have 60% higher lifetime value. A manager proposes encouraging more support calls. What is wrong with this?",
    [
      "The correlation is too weak to be meaningful",
      "The calls are a symptom of engagement, not a cause of value, so encouraging calls would raise cost without raising value",
      "Lifetime value cannot be measured reliably",
      "Nothing — the data supports the proposal",
    ],
    1,
    "The correlation is real and the inference is wrong: contacting support twice is a SYMPTOM of engagement rather than a CAUSE of value, so manufacturing calls would add cost without adding value — and might signal a product that is harder to use. No amount of extra data would have prevented this error; it needed someone to ask what the MECHANISM was, which is exactly the judgement automation does not supply."),

  q("BTK-17-09", "BT-17", "C", "medium", 2,
    "Which analytics type answers the question 'what should we do about it?'",
    ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
    3,
    "PRESCRIPTIVE analytics recommends the action to take — for example the credit limit and terms that optimise margin against default risk. Descriptive reports what happened, diagnostic explains why, and predictive forecasts what is likely. The four form a ladder of increasing value and difficulty, and confusing predictive with prescriptive is the usual error."),

  q("BTK-17-10", "BT-17", "C", "hard", 2,
    "How does fintech change the accountant's role most accurately?",
    [
      "It makes the role unnecessary, as software performs the work",
      "It removes processing work and increases control, assurance and advisory work, changing the skills required",
      "It leaves the role unchanged but reduces headcount",
      "It confines the role to supervising software with no technical content",
    ],
    1,
    "Automation removes TRANSACTION PROCESSING and increases CONTROL and ASSURANCE work (owning the rules, data quality, access rights and exceptions) and ADVISORY work (diagnostic and predictive interpretation) — so the role moves UP the value chain and the skills required change with it: data literacy, systems and control understanding, and scepticism about model output. Options 1, 3 and 4 all understate what remains, which is the higher-skilled part."),
]

export const BT_KIT_AREA_C: AccaQuestion[] = [
  ...CH12, ...CH13, ...CH14, ...CH15, ...CH16, ...CH17,
]
