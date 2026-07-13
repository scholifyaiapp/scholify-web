import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area C — Internal control.
 * COSO five components, control objectives & activities, tests of controls vs
 * substantive procedures, deficiencies (ISA 265), ITGC vs application controls,
 * and controls over the key cycles. Original, syllabus-aligned; no ACCA/BPP text.
 */

export const AA_C: StudyChapter = {
  paper: "AA",
  area: "C",
  title: "Internal control",
  minutes: 16,
  intro: "A business runs on thousands of small transactions the directors never personally see. Internal control is the machinery that keeps every one of them honest, complete and accurate — and the auditor's job is to decide how much of it can be trusted.",
  outcomes: [
    "Describe the five components of internal control (the COSO framework)",
    "Link control objectives to the main types of control activity, including segregation of duties",
    "Distinguish tests of controls from substantive procedures and explain the role of walkthroughs",
    "Classify a finding as a control deficiency or a significant deficiency and report it correctly under ISA 265",
    "Distinguish IT general controls from application controls and describe controls over the key cycles",
  ],
  sections: [
    {
      id: "what-and-why",
      heading: "What internal control is — and why the auditor cares",
      blocks: [
        { kind: "text", md: "**Internal control** is the process — designed and operated by those charged with governance, management and other staff — that gives reasonable assurance a company will achieve reliable financial reporting, effective operations, and compliance with laws. For the auditor, the middle purpose matters most: controls are what make the accounting records **complete and accurate** in the first place." },
        { kind: "text", md: "Why should an auditor spend time understanding a client's controls rather than just checking the figures? Because controls decide **how much testing** the numbers need. Where controls are strong and operating, the auditor can rely on them and do **less** detailed testing of transactions. Where they are weak or absent, the risk of misstatement rises and the auditor must do **more** substantive work. Understanding the system is not optional — ISA 315 requires it on every audit." },
        { kind: "callout", tone: "key", title: "The one idea", md: "Internal control is a **process for reasonable assurance**, not a guarantee. The auditor studies it to size the **risk of misstatement** and decide how much substantive testing the financial statements really need." },
        { kind: "callout", tone: "warn", title: "Inherent limitations", md: "No system is perfect. Controls can be defeated by **human error**, **management override**, **collusion** between two or more people, and the fact that most controls target **routine** rather than unusual transactions. This is why controls give only **reasonable**, never absolute, assurance — and why the auditor can never rely on controls alone." },
      ],
    },
    {
      id: "coso-five",
      heading: "The five components of internal control (COSO)",
      blocks: [
        { kind: "text", md: "Internal control is examined through five interlocking components — often remembered as the **COSO** framework. A useful memory hook is **CRIME**: **C**ontrol environment, **R**isk assessment, **I**nformation and communication, **M**onitoring, and control activiti**E**s. The auditor obtains an understanding of each." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five components of internal control",
          caption: "Every control the auditor meets belongs to one of these five components.",
          data: {
            items: [
              { title: "Control environment", sub: "The tone at the top — integrity, ethics, governance, competence. The foundation the other four stand on." },
              { title: "Risk assessment", sub: "How the entity identifies and responds to the business risks that threaten its objectives." },
              { title: "Control activities", sub: "The actual day-to-day controls — authorisations, reconciliations, checks — that address specific risks." },
              { title: "Information & communication", sub: "The systems that capture, process and report transactions, and share responsibilities up and down the entity." },
              { title: "Monitoring", sub: "The ongoing and periodic review of whether controls are still present and working — e.g. internal audit." },
            ],
          },
        } },
        { kind: "text", md: "The **control environment** is the foundation: if the directors do not value honesty and competence, even well-designed controls will be ignored. **Control activities** are the layer the exam tests hardest, because they are the concrete, checkable procedures — and the ones the auditor can put to the test." },
      ],
      check: {
        q: "A company's audit committee reviews internal audit reports each quarter and follows up on control weaknesses. Which COSO component does this activity BEST represent?",
        options: [
          "Control activities",
          "Risk assessment",
          "Monitoring",
          "The control environment",
        ],
        correct: 2,
        explain: "Reviewing whether controls remain present and effective over time is monitoring — the component that checks the other four keep working. Control activities are the individual controls themselves; risk assessment is identifying the risks; the control environment is the overall tone and governance culture.",
      },
    },
    {
      id: "objectives-activities",
      heading: "Control objectives and the types of control activity",
      blocks: [
        { kind: "text", md: "Every control exists to meet an **objective** — to make sure transactions are, for example, properly **authorised**, **completely** recorded, **accurately** processed, and that assets are **safeguarded**. Control activities are the tools used to hit those objectives, and they fall into recognisable families." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The main types of control activity",
          caption: "A quick way to classify almost any control you meet in a question.",
          data: {
            items: [
              { title: "Authorisation", sub: "Transactions are approved by someone with the authority — e.g. a manager signs off a purchase order." },
              { title: "Performance reviews", sub: "Comparing actuals to budgets, forecasts or prior periods and investigating differences." },
              { title: "Information processing", sub: "Checks that data is complete and accurate — reconciliations, sequence checks, matching, edit checks." },
              { title: "Physical controls", sub: "Restricting access to assets and records — locks, safes, passwords, stock counts." },
              { title: "Segregation of duties", sub: "Splitting incompatible tasks so no one person controls a transaction end to end." },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Segregation of duties — four incompatible roles", md: "The classic split keeps four functions in different hands: **Authorisation** (approve the transaction), **Recording** (enter it in the books), **Custody** (hold the related asset, e.g. cash or inventory), and **Reconciliation** (independently check the records). When one person holds two or more of these, they can both commit and conceal an error or fraud." },
        { kind: "example", title: "Worked example — a segregation of duties failure", scenario: "At Delta Ltd, the same cashier receives cash from customers, records the receipts in the sales ledger, and prepares the monthly bank reconciliation. Why is this a control deficiency, and what could it allow?", steps: [
          { label: "Identify the roles held", detail: "The cashier has custody (receives cash), recording (posts the ledger) and reconciliation (checks the bank) — three incompatible duties in one person." },
          { label: "The risk this creates", detail: "The cashier could steal a receipt (custody), omit it from the ledger (recording), and hide the gap by falsifying the reconciliation (reconciliation) — a self-concealing fraud." },
          { label: "The control that fixes it", detail: "Split the duties: a different, independent person should prepare the bank reconciliation, and ideally a third should open the post and log receipts before the cashier handles them." },
        ], result: "One person holding custody, recording and reconciliation means an error or theft can be committed and concealed by the same hand — the textbook reason to segregate duties." },
      ],
      check: {
        q: "Which combination of duties should be kept SEPARATE to give the strongest segregation of duties over a cash payment?",
        options: [
          "Two clerks who both record purchase invoices",
          "The person who authorises a payment and the person who records it in the ledger",
          "Two managers who both review the monthly budget",
          "The person who files invoices and the person who photocopies them",
        ],
        correct: 1,
        explain: "Authorisation and recording are two of the four incompatible functions (authorise / record / custody / reconcile), so keeping them in different hands is genuine segregation. Two clerks doing the same recording task, two managers reviewing the same budget, or filing versus photocopying are duplicate or trivial tasks, not incompatible ones.",
      },
    },
    {
      id: "tests-vs-substantive",
      heading: "Tests of controls vs substantive procedures — and walkthroughs",
      blocks: [
        { kind: "text", md: "There are two fundamentally different questions an auditor can ask about a system. **Tests of controls** ask: *is the control operating effectively?* **Substantive procedures** ask: *is the figure in the financial statements actually correct?* They are not interchangeable — a control could operate perfectly and the balance still be wrong, and vice versa." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Tests of controls vs substantive procedures",
          data: {
            leftTitle: "Tests of controls",
            rightTitle: "Substantive procedures",
            rows: [
              { aspect: "Question answered", left: "Is the control operating effectively?", right: "Is the balance / transaction correct?" },
              { aspect: "Focus", left: "The system and process", right: "The monetary figure itself" },
              { aspect: "When used", left: "Only when the auditor plans to rely on controls", right: "On every audit — always required" },
              { aspect: "Example", left: "Reperform a sample of purchase order authorisations", right: "Confirm receivables directly with customers" },
              { aspect: "Effect on other work", left: "Good results reduce substantive testing", right: "Provides direct evidence on the assertion" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "The walkthrough", md: "A **walkthrough test** traces **one** transaction from start to finish through the whole system — from initiation to its entry in the ledger. It is NOT a test of controls: its purpose is to **confirm the auditor understands** how the system actually works and that the documented system exists, before deciding what to test." },
        { kind: "text", md: "Two important consequences. First, substantive procedures can **never** be dropped entirely — ISA 330 requires some substantive work for every material class of transaction or balance, no matter how strong the controls. Second, if tests of controls reveal the control is **not** operating, the auditor cannot rely on it and must **increase** substantive testing to compensate." },
      ],
      check: {
        q: "An auditor selects 30 goods received notes and checks each was matched to an approved purchase order before the invoice was paid. This procedure is BEST described as:",
        options: [
          "A substantive procedure, because it looks at purchases",
          "A test of controls, because it tests whether the matching control operated",
          "A walkthrough test, because it follows a transaction",
          "An analytical procedure, because it uses a sample",
        ],
        correct: 1,
        explain: "The auditor is testing whether a specific control — matching the GRN to an approved order — actually operated across a sample, which is a test of controls. A substantive procedure would test whether the purchases figure itself is correct; a walkthrough follows just one transaction to confirm understanding; analytical procedures compare expectations to recorded amounts.",
      },
    },
    {
      id: "deficiencies-isa265",
      heading: "Deficiencies and reporting them (ISA 265)",
      blocks: [
        { kind: "text", md: "When the auditor finds a control that is missing or not operating, it is a **deficiency**. ISA 265 draws a sharp line between two grades, because they are reported to different people." },
        { kind: "callout", tone: "rule", title: "Two grades of deficiency", md: "A **control deficiency** exists when a control is missing or fails to prevent, or detect and correct, a misstatement on a timely basis. A **significant deficiency** is a deficiency (or combination of them) that, in the auditor's **professional judgement**, is important enough to merit the attention of **those charged with governance (TCWG)**." },
        { kind: "table", caption: "Deficiency vs significant deficiency — how they are reported under ISA 265", head: ["Aspect", "Control deficiency", "Significant deficiency"], rows: [
          ["Severity", "A weakness, but not judged important enough for TCWG", "Important enough to warrant TCWG's attention"],
          ["Reported to whom", "Management, at an appropriate level", "Those charged with governance (TCWG), in writing"],
          ["Form of report", "May be raised orally or in the management letter", "Must be communicated in writing"],
          ["Timing", "In due course", "On a timely basis"],
          ["Judgement factors", "n/a", "Likelihood and potential magnitude of misstatement, susceptibility to fraud, importance of the control"],
        ] },
        { kind: "text", md: "The vehicle for all of this is the **report to management** (often called the **management letter**). For each point it follows a simple, examinable structure: state the **deficiency**, explain the **implication** (what could go wrong), and give a practical **recommendation** to fix it. Two things to remember: the letter is for the client's benefit, so it should not be relied on by third parties; and communicating a significant deficiency does **not** reduce the auditor's own responsibility for the opinion." },
        { kind: "example", title: "Worked example — a management letter point", scenario: "During the audit of Marsh Ltd you find that purchase invoices are paid without anyone checking them back to a goods received note, so the company could pay for goods it never received. Draft the point.", steps: [
          { label: "Deficiency", detail: "Purchase invoices are authorised for payment without being matched to a goods received note." },
          { label: "Implication", detail: "The company may pay for goods that were never received or were short-delivered, overstating purchases and reducing cash and profit." },
          { label: "Recommendation", detail: "Before authorising payment, a clerk should match each invoice to the related GRN and approved purchase order, and evidence the check by initialling the invoice." },
        ], result: "Deficiency → implication → recommendation. If the auditor judges the weakness important enough for TCWG, it is a significant deficiency and must be reported to them in writing." },
      ],
      check: {
        q: "The auditor identifies a deficiency that, in their professional judgement, is important enough to deserve the attention of those charged with governance. Under ISA 265 this must be:",
        options: [
          "Mentioned orally to a junior member of the finance team",
          "Communicated in writing to those charged with governance",
          "Disclosed in the audit report to shareholders",
          "Ignored, because reporting it transfers responsibility to management",
        ],
        correct: 1,
        explain: "A significant deficiency must be communicated in writing to those charged with governance on a timely basis. It is not put in the audit report to shareholders, and reporting it never transfers or reduces the auditor's own responsibility for the opinion. Lesser control deficiencies can be raised with management.",
      },
    },
    {
      id: "it-controls-cycles",
      heading: "IT controls and controls over the key cycles",
      blocks: [
        { kind: "text", md: "Most accounting now runs through IT systems, and controls over them come in two layers. **IT general controls (ITGCs)** are entity-wide controls over the IT environment that everything else depends on — access security, program change control, backups, and controls over IT operations. **Application controls** are built into a specific program to control one type of transaction — input, processing and output checks." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "IT general controls vs application controls",
          data: {
            leftTitle: "IT general controls (ITGC)",
            rightTitle: "Application controls",
            rows: [
              { aspect: "Scope", left: "The whole IT environment", right: "One specific application / process" },
              { aspect: "Purpose", left: "Keep the environment secure and stable", right: "Ensure complete, accurate, valid transactions" },
              { aspect: "Examples", left: "Passwords, change management, backups, access rights", right: "Input edit checks, sequence checks, control totals, exception reports" },
              { aspect: "Relationship", left: "The foundation the application controls rely on", right: "Only trustworthy if the ITGCs are effective" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Why ITGCs come first", md: "Application controls can only be relied on if the ITGCs are sound. If programmers can change code without authorisation, or users share admin passwords, then even a perfect input check could be switched off or bypassed. **Weak ITGCs undermine strong application controls.**" },
        { kind: "text", md: "The syllabus tests controls over the key business **cycles**. The **sales cycle** runs from order to cash; the **purchases cycle** from requisition to payment; **payroll** from timekeeping to net pay; and controls over **inventory and cash** protect the most stealable assets. Learn one cycle end to end and the logic transfers to the others: at each step ask *what could go wrong, and what control prevents it?*" },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The sales cycle — control points from order to cash",
          caption: "At each step a control addresses a specific 'what could go wrong'.",
          data: {
            steps: [
              { label: "Customer order", sub: "Credit check & credit limit before accepting — avoid selling to bad payers" },
              { label: "Dispatch goods", sub: "Goods despatch note raised and sequentially numbered — proves goods left" },
              { label: "Raise invoice", sub: "Invoice matched to GDN and order, prices from the master file — accuracy & completeness" },
              { label: "Record in ledger", sub: "Post to the correct customer; sequence check invoices — completeness" },
              { label: "Receive & bank cash", sub: "Segregate cash handling from ledger posting; bank daily; reconcile — safeguard cash" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — a control over the purchases cycle", scenario: "Verano Ltd wants to prevent paying for goods it did not order or receive. Which control, at which step, addresses this, and what objective does it meet?", steps: [
          { label: "The risk", detail: "Without a check, the company could pay a supplier's invoice for goods never ordered or never delivered." },
          { label: "The control", detail: "Before payment, match the purchase invoice to an approved purchase order (proving it was ordered) and a goods received note (proving it arrived) — the classic 'three-way match'." },
          { label: "The objective met", detail: "Validity and accuracy of purchases and payables: the company only pays for goods it genuinely ordered and received." },
        ], result: "The three-way match — invoice to purchase order to GRN — is the central control of the purchases cycle, meeting the objective that only valid, authorised, received purchases are paid." },
      ],
      check: {
        q: "In a computerised sales system, a check that rejects any invoice line where the quantity field is left blank is an example of:",
        options: [
          "An IT general control, because it concerns the whole system",
          "An application control, because it validates input into one process",
          "A test of controls, because the auditor is checking it",
          "A monitoring control, because it reviews performance",
        ],
        correct: 1,
        explain: "An input validation check built into the sales program to ensure data is complete and accurate is an application control. IT general controls cover the whole environment (access, change management, backups); a test of controls is what the auditor does to check the control works; monitoring reviews whether controls remain effective over time.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing only three or four COSO components, or muddling them.", fix: "There are five: control environment, risk assessment, control activities, information & communication, and monitoring (CRIME). Control activities are the individual controls; monitoring checks the others keep working." },
    { trap: "Treating a walkthrough as a test of controls.", fix: "A walkthrough follows ONE transaction to confirm the auditor understands the system. A test of controls checks a SAMPLE to see whether a control operated effectively." },
    { trap: "Saying strong controls mean no substantive testing is needed.", fix: "ISA 330 requires some substantive procedures for every material balance or class, however strong the controls. Controls can only reduce — never eliminate — substantive work." },
    { trap: "Reporting a significant deficiency to management instead of TCWG.", fix: "Under ISA 265 a significant deficiency must be communicated in WRITING to those charged with governance. Lesser control deficiencies can be raised with management." },
    { trap: "Assuming a strong application control is enough on its own.", fix: "Application controls are only reliable if the IT general controls (access, change management, backups) are effective — weak ITGCs undermine every application control." },
  ],
  keyTerms: [
    { term: "Internal control", def: "A process operated by governance, management and staff to give reasonable assurance over reliable reporting, effective operations and compliance." },
    { term: "Control environment", def: "The foundation COSO component — the overall tone, integrity, ethics, governance and competence on which the other four components rest." },
    { term: "Segregation of duties", def: "Splitting the four incompatible functions — authorisation, recording, custody and reconciliation — so no one person can both commit and conceal an error or fraud." },
    { term: "Test of controls", def: "An audit procedure to evaluate whether a control operated effectively throughout the period; only performed when the auditor intends to rely on the control." },
    { term: "Significant deficiency", def: "A control deficiency, or combination, that in the auditor's professional judgement is important enough to merit the attention of those charged with governance (ISA 265)." },
    { term: "IT general controls", def: "Entity-wide controls over the IT environment — access security, program change control, backups and IT operations — on which application controls depend." },
  ],
  summary: [
    "Internal control gives reasonable (not absolute) assurance; the auditor studies it to size risk and set the level of substantive testing.",
    "The five COSO components are control environment, risk assessment, control activities, information & communication, and monitoring.",
    "Segregation of duties splits four incompatible functions — authorise, record, custody, reconcile — and underpins most control activities.",
    "Tests of controls ask if a control works; substantive procedures ask if the figure is right; a walkthrough confirms understanding of the system.",
    "ISA 265 grades findings as control deficiencies (report to management) or significant deficiencies (report in writing to TCWG); ITGCs must be sound for application controls to be relied on.",
  ],
}
