import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area C — internal control.
 *
 * Was one chapter for C1 to C4: the components of internal control, how the
 * auditor records and evaluates them, tests of control across every major
 * transaction cycle, AND reporting deficiencies. The cycles alone are a
 * regular 20-mark Section B requirement.
 *
 *   AA-11  Internal control systems and their components
 *   AA-12  Recording and evaluating the system
 *   AA-13  Tests of control over the major cycles
 *   AA-14  Reporting deficiencies to management
 *
 * Written against the official ACCA AA syllabus and the ISAs it references.
 */

const AA_TREE_11: StudyChapter = {
  paper: "AA",
  id: "AA-11",
  number: 11,
  area: "C",
  syllabusRefs: ["C1(a)", "C1(b)", "C1(c)"],
  title: "Internal control systems and their components",
  minutes: 16,
  intro:
    "Five components, one family of control activities, and a list of limitations that explains why an audit can never rely on controls alone.",
  outcomes: [
    "Explain the objectives of an internal control system",
    "Describe the five components of internal control",
    "Identify the main types of control activity",
    "Explain the inherent limitations of internal control",
  ],
  sections: [
    {
      id: "components",
      heading: "The five components",
      blocks: [
        {
          kind: "table",
          caption: "ISA 315's components of internal control",
          head: ["Component", "What it covers"],
          rows: [
            ["Control environment", "Governance and management's attitude — integrity, ethical values, competence, organisational structure, assignment of authority and responsibility"],
            ["The entity's risk assessment process", "How the entity identifies business risks relevant to reporting and decides what to do about them"],
            ["The information system and communication", "The processes and records that initiate, record, process and report transactions, and how roles are communicated"],
            ["Control activities", "The policies and procedures that address risks — the controls themselves"],
            ["Monitoring of controls", "Ongoing evaluation of whether controls are operating as intended, including internal audit"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The control environment sets the ceiling",
          md: "Strong control activities sitting inside a weak environment are worth very little: if management does not care about controls, staff will not apply them and management will override them. Where a scenario describes a domineering chief executive or a culture of hitting targets at any cost, the environment is the deficiency — not the individual procedure.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Types of control activity",
          items: [
            "**Segregation of duties** — no one person controls a transaction from start to finish: authorising, recording and custody are split.",
            "**Authorisation and approval** — transactions approved by someone with appropriate authority, within defined limits.",
            "**Physical controls** — restricted access to assets and records; locked stores, safes, passwords.",
            "**Information processing controls** — sequence checks, matching documents, exception reports, edit checks, reconciliations.",
            "**Performance reviews** — comparing actual against budget, prior period or forecast, and investigating differences.",
            "**Arithmetical and accounting controls** — recalculation, control accounts, trial balances.",
          ],
        },
      ],
      check: {
        q: "A company has detailed authorisation procedures, but the chief executive routinely overrules them and staff are afraid to object. Which component is deficient?",
        options: [
          "Control activities — the authorisation procedures are inadequate",
          "The control environment — management's attitude undermines every control",
          "Monitoring of controls",
          "The information system",
        ],
        correct: 1,
        explain:
          "The procedures themselves are fine; the problem is the environment in which they sit. Management attitude and the tone at the top determine whether any control activity is actually applied, which is why the environment is the first component and the one that caps the value of all the others.",
      },
    },
    {
      id: "limitations",
      heading: "Inherent limitations",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Why no system gives certainty",
          items: [
            "**Human error** — carelessness, fatigue, distraction and misunderstanding.",
            "**Collusion** — two people working together can defeat segregation of duties, which assumes they do not.",
            "**Management override** — those who impose the controls can circumvent them.",
            "**Cost versus benefit** — management will not spend more on a control than the loss it prevents, so some risks are accepted deliberately.",
            "**Controls address routine transactions** — unusual or non-recurring transactions often fall outside them.",
            "**Obsolescence** — a control designed for old conditions may not address a changed process or system.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "This is why controls testing is never enough on its own",
          md: "However effective controls appear, the auditor must always perform **some substantive procedures** on material balances and transactions. Collusion and override cannot be tested away, and an answer proposing a controls-only audit has missed the point of the limitations list.",
        },
      ],
      check: {
        q: "Which limitation most directly defeats segregation of duties?",
        options: ["Human error", "Collusion", "Cost versus benefit", "Obsolescence"],
        correct: 1,
        explain:
          "Segregation works precisely because one person cannot complete a transaction alone. Two people agreeing to cooperate removes the assumption the control rests on — which is why collusion is listed separately from ordinary human error.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing control activities when asked for the components of internal control.", fix: "Control activities are ONE of the five components, not the list." },
    { trap: "Saying good controls make substantive testing unnecessary.", fix: "Some substantive work on material items is always required — collusion and override cannot be controlled away." },
  ],
  keyTerms: [
    { term: "Control environment", def: "Governance and management's attitude, awareness and actions regarding internal control." },
    { term: "Segregation of duties", def: "Splitting authorisation, recording and custody so no one person controls a whole transaction." },
    { term: "Management override", def: "Management circumventing controls that otherwise operate effectively." },
  ],
  summary: [
    "Five components: control environment, risk assessment, information system, control activities, monitoring.",
    "The control environment caps the effectiveness of everything else.",
    "Control activities include segregation, authorisation, physical, processing, review and arithmetical controls.",
    "Limitations: human error, collusion, override, cost/benefit, non-routine transactions, obsolescence.",
    "Because of those limitations, some substantive testing is always required.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five components of internal control.", a: "The control environment, the entity's risk assessment process, the information system and communication, control activities, and monitoring of controls." },
    { q: "Give three inherent limitations of internal control.", a: "Human error, collusion between staff, and management override. (Also cost versus benefit, non-routine transactions, and obsolescence.)" },
    { q: "Why can an auditor never rely on controls alone?", a: "Because collusion and management override can defeat even well-designed controls, so some substantive procedures on material items are always required." },
  ],
  furtherStudy: ["AA-12 covers how the auditor records and evaluates the system just described."],
}

const AA_TREE_12: StudyChapter = {
  paper: "AA",
  id: "AA-12",
  number: 12,
  area: "C",
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)"],
  title: "Recording and evaluating the system",
  minutes: 15,
  intro:
    "Write down how the system is meant to work, confirm it really does, then decide whether to rely on it. That decision changes the shape of the entire audit.",
  outcomes: [
    "Describe the methods of recording an internal control system",
    "Compare the advantages and disadvantages of each method",
    "Explain the purpose of a walk-through test",
    "Explain how the evaluation determines the audit approach",
  ],
  sections: [
    {
      id: "recording",
      heading: "Recording the system",
      blocks: [
        {
          kind: "table",
          caption: "Four methods",
          head: ["Method", "Advantages", "Disadvantages"],
          rows: [
            ["Narrative notes", "Simple to prepare; no training needed; good for small systems", "Cumbersome for complex systems; hard to spot missing controls; time-consuming to amend"],
            ["Flowcharts", "Shows the whole system at a glance; gaps and duplication are visible; concise", "Needs skill to prepare and read; awkward to amend; poor for narrative detail"],
            ["Internal control questionnaires (ICQ)", "Quick; prompts for controls that might be forgotten; comparable year to year", "Client may overstate; standard questions may not fit the business; 'yes' answers can hide the detail"],
            ["Internal control evaluation questionnaires (ICEQ)", "Asks whether OBJECTIVES are met rather than whether a control exists — focuses on what matters", "Requires more judgement and experience to use well"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "ICQ against ICEQ",
          md: "An **ICQ** asks *\"is there a control that…?\"*. An **ICEQ** asks *\"can this go wrong?\"* — for example \"can goods be despatched without being invoiced?\". The second is harder and better, because a system can be full of controls and still leave an objective unmet. Questions distinguishing them want that framing.",
        },
      ],
      check: {
        q: "Which question comes from an internal control EVALUATION questionnaire?",
        options: [
          "Are all sales invoices sequentially numbered?",
          "Can goods be despatched without being invoiced?",
          "Is there a credit control department?",
          "Are bank reconciliations prepared monthly?",
        ],
        correct: 1,
        explain:
          "An ICEQ asks whether an objective can fail — it is framed as a risk. The other three ask whether a specific control exists, which is an ICQ. A system can answer 'yes' to all three and still let goods leave un-invoiced.",
      },
    },
    {
      id: "walkthrough-approach",
      heading: "Walk-through tests and the audit approach",
      blocks: [
        {
          kind: "definition",
          term: "Walk-through test",
          md: "Tracing **one transaction** through the entire system from beginning to end, to confirm the auditor's record of the system is accurate — that the system operates as described.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A walk-through is not a test of control",
          md: "One transaction proves the system **exists as documented**. It proves nothing about whether the control operated **consistently** throughout the period — that requires a test of control over a sample. Confusing the two is a common and expensive error.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How the evaluation decides the audit",
            data: {
              steps: [
                { label: "Record the system", sub: "notes, flowchart, questionnaire" },
                { label: "Walk-through", sub: "confirm it works as documented" },
                { label: "Evaluate design", sub: "would these controls prevent or detect misstatement?" },
                { label: "Decide approach", sub: "rely and test controls, or go wholly substantive" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The consequence of the decision",
          head: ["If controls appear effective", "If controls are weak or absent"],
          rows: [
            ["Test the controls over a sample across the period", "Do not test controls — there is nothing to rely on"],
            ["If they operate effectively, reduce substantive testing", "Adopt a wholly substantive approach"],
            ["If tests reveal failures, revert to substantive", "Increase sample sizes and test more at the year end"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Never test a control you do not intend to rely on",
          md: "Testing controls costs time and only pays for itself by reducing substantive work. If the system is clearly weak, the efficient and correct answer is to go straight to substantive procedures — and saying so explicitly is worth a mark.",
        },
      ],
      check: {
        q: "The auditor performs a walk-through of the purchases system and finds it operates as documented. What has this established?",
        options: [
          "The controls operated effectively throughout the period",
          "That the auditor's record of the system is accurate",
          "That substantive testing can be reduced",
          "That the purchases balance is not materially misstated",
        ],
        correct: 1,
        explain:
          "A walk-through confirms the documentation matches reality. Effectiveness over the period needs a test of control on a sample, and only that can justify reducing substantive work.",
      },
    },
  ],
  examTraps: [
    { trap: "Calling a walk-through a test of control.", fix: "It confirms the system is as recorded; effectiveness over the period needs sample testing." },
    { trap: "Recommending tests of control on a clearly weak system.", fix: "Go wholly substantive — testing controls you cannot rely on wastes time." },
    { trap: "Describing an ICQ question as an ICEQ.", fix: "ICEQ asks whether an objective can FAIL; ICQ asks whether a control exists." },
  ],
  keyTerms: [
    { term: "Walk-through test", def: "Tracing one transaction through the whole system to confirm the auditor's record of it is accurate." },
    { term: "ICQ", def: "Internal control questionnaire — asks whether specific controls exist." },
    { term: "ICEQ", def: "Internal control evaluation questionnaire — asks whether control objectives could fail." },
    { term: "Substantive approach", def: "An audit strategy relying on substantive procedures without placing reliance on controls." },
  ],
  summary: [
    "Systems are recorded by narrative notes, flowcharts, ICQs or ICEQs.",
    "ICQs ask whether a control exists; ICEQs ask whether an objective can fail.",
    "A walk-through confirms the record is accurate, not that controls operated.",
    "Effective controls justify testing them and reducing substantive work.",
    "Weak controls mean a wholly substantive approach — do not test what you cannot rely on.",
  ],
  knowledgeDiagnostic: [
    { q: "Name two methods of recording a control system and one drawback of each.", a: "Narrative notes — cumbersome for complex systems. Flowcharts — require skill to prepare and are awkward to amend. (Also ICQ/ICEQ.)" },
    { q: "What does a walk-through test achieve?", a: "It confirms the auditor's documentation of the system is accurate by tracing one transaction from start to finish." },
    { q: "When should the auditor NOT perform tests of control?", a: "When controls are weak, absent or not intended to be relied on — the audit should be wholly substantive instead." },
  ],
  furtherStudy: ["AA-13 is the tests themselves, cycle by cycle."],
}

const AA_TREE_13: StudyChapter = {
  paper: "AA",
  id: "AA-13",
  number: 13,
  area: "C",
  syllabusRefs: ["C3(a)", "C3(b)"],
  title: "Tests of control over the major cycles",
  minutes: 19,
  intro:
    "A regular 20-mark requirement: describe the controls and the tests for a cycle. There is one distinction that decides every mark, and candidates lose it in the first line.",
  outcomes: [
    "Distinguish a test of control from a substantive procedure",
    "Describe controls and tests of control for sales, purchases and payroll",
    "Describe controls and tests for inventory, cash and non-current assets",
    "Explain the direction of testing and why it matters",
  ],
  sections: [
    {
      id: "the-distinction",
      heading: "Control test or substantive procedure",
      blocks: [
        {
          kind: "table",
          caption: "The distinction that decides the marks",
          head: ["", "Test of control", "Substantive procedure"],
          rows: [
            ["Asks", "Did the CONTROL operate?", "Is the FIGURE right?"],
            ["Evidence sought", "Signature, authorisation, exception report, sequence check", "The amount, existence, ownership or valuation of a balance"],
            ["Example", "Inspect a sample of orders for evidence of a credit check", "Circularise a sample of receivables to confirm the balance"],
            ["If it fails", "Cannot rely on controls; extend substantive work", "There may be a misstatement to quantify"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The verb gives you away",
          md: "A test of control usually starts **inspect / observe / enquire / reperform** and looks for **evidence that someone did something**. If your answer says \"agree the amount to the invoice\", you have written a substantive procedure and it scores nothing in a controls requirement.",
        },
        {
          kind: "definition",
          term: "Direction of testing",
          md: "Selecting from the **source document** and tracing forward tests **completeness** (nothing was lost). Selecting from the **ledger** and tracing back tests **existence or occurrence** (nothing was invented). The two are not interchangeable.",
        },
        {
          kind: "illustration",
          title: "Same documents, opposite conclusions",
          md: "Take a sample of **despatch notes** and trace them to sales invoices: this finds goods that went out but were never invoiced — a **completeness** test of revenue.\n\nTake a sample of **sales invoices** and trace them back to despatch notes: this finds invoices raised for goods never sent — an **occurrence** test.\n\nOne direction cannot answer the other's question, and stating which way you are working is part of the mark.",
        },
      ],
      check: {
        q: "Which is a TEST OF CONTROL over sales?",
        options: [
          "Agree a sample of invoices to the sales day book and the ledger",
          "Inspect a sample of customer orders for evidence of a credit check before acceptance",
          "Circularise a sample of receivables balances",
          "Recalculate the allowance for irrecoverable receivables",
        ],
        correct: 1,
        explain:
          "Inspecting for evidence that the credit check happened tests whether the CONTROL operated. The other three test whether the figures are right — they are substantive procedures.",
      },
    },
    {
      id: "cycles",
      heading: "The cycles",
      blocks: [
        {
          kind: "table",
          caption: "Sales",
          head: ["Control", "Test of control"],
          rows: [
            ["Credit checks before an order is accepted", "Inspect a sample of orders for evidence of the check and the credit limit applied"],
            ["Orders authorised and matched to despatch notes", "Inspect matched sets of order, despatch note and invoice for signature"],
            ["Invoices sequentially numbered, sequence checked", "Review sequence check reports and enquire into gaps"],
            ["Prices taken from an authorised price list", "Inspect a sample of invoices and agree prices to the authorised list"],
            ["Credit limits reviewed and enforced by the system", "Attempt to enter an order exceeding a limit, or inspect exception reports"],
          ],
        },
        {
          kind: "table",
          caption: "Purchases",
          head: ["Control", "Test of control"],
          rows: [
            ["Requisitions authorised before ordering", "Inspect requisitions for the authoriser's signature and authority limit"],
            ["New suppliers approved by someone independent", "Inspect the new-supplier file for evidence of approval"],
            ["Invoices matched to order and goods received note", "Inspect a sample of matched three-way sets"],
            ["Segregation between ordering, receiving and payment", "Observe the process; review system access rights"],
          ],
        },
        {
          kind: "table",
          caption: "Payroll",
          head: ["Control", "Test of control"],
          rows: [
            ["Starters and leavers authorised by HR", "Inspect personnel files for authorisation of a sample of joiners and leavers"],
            ["Timesheets approved by a supervisor", "Inspect timesheets for approval signature"],
            ["Payroll reviewed and approved before payment", "Inspect evidence of review of the payroll summary"],
            ["Segregation between preparing payroll and making payment", "Review system access rights and observe"],
          ],
        },
        {
          kind: "table",
          caption: "Inventory, cash and non-current assets",
          head: ["Control", "Test of control"],
          rows: [
            ["Restricted access to the warehouse", "Observe access arrangements and attempt entry"],
            ["Goods movements documented and authorised", "Inspect goods movement notes for authorisation"],
            ["Regular inventory counts with independent count teams", "Attend a count; inspect count instructions and sheets"],
            ["Bank reconciliations prepared monthly and reviewed", "Inspect a sample for preparer and reviewer signatures and dates"],
            ["Payments authorised by two signatories above a limit", "Inspect payment records for both authorisations"],
            ["Capital expenditure authorised by the board", "Inspect board minutes for approval of a sample of additions"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to write these under time pressure",
          md: "One line per control, one line per test, and make the test **inspectable** — name the document and what you are looking for on it. \"Ensure orders are authorised\" is not a test; \"inspect a sample of purchase orders for the authorising signature and check it is within that person's limit\" is.",
        },
      ],
      check: {
        q: "To test the COMPLETENESS of recorded purchases, which direction should the auditor test?",
        options: [
          "Select from the purchase ledger and trace back to goods received notes",
          "Select from goods received notes and trace forward to the purchase ledger",
          "Select from supplier invoices and agree the amounts",
          "Select from the bank statement and trace to the cash book",
        ],
        correct: 1,
        explain:
          "Completeness asks whether anything is MISSING from the records, so start outside the ledger — with the goods actually received — and trace forward. Starting from the ledger can only tell you that what is recorded is genuine, which is occurrence.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing substantive procedures in a tests-of-control requirement.", fix: "Test whether the control operated, not whether the figure is right." },
    { trap: "Vague tests such as \"check authorisation\".", fix: "Name the document, the sample and the evidence sought." },
    { trap: "Testing completeness from the ledger.", fix: "Completeness starts from the source document and traces forward." },
  ],
  keyTerms: [
    { term: "Test of control", def: "A procedure evaluating whether a control operated effectively during the period." },
    { term: "Direction of testing", def: "Whether a sample is selected from source documents (completeness) or from the ledger (existence/occurrence)." },
    { term: "Three-way match", def: "Agreeing purchase order, goods received note and supplier invoice before payment." },
  ],
  summary: [
    "Tests of control ask whether the control operated; substantive procedures ask whether the figure is right.",
    "Use inspect, observe, enquire and reperform, and name the document.",
    "Completeness tests trace forward from source documents; occurrence tests trace back from the ledger.",
    "Sales: credit checks, matched sets, sequence checks, authorised prices.",
    "Purchases and payroll rest on authorisation and segregation of duties.",
  ],
  knowledgeDiagnostic: [
    { q: "How does a test of control differ from a substantive procedure?", a: "A test of control evaluates whether a control operated effectively; a substantive procedure tests whether a figure in the financial statements is correct." },
    { q: "Describe a test of control over the authorisation of purchases.", a: "Inspect a sample of purchase requisitions or orders for the authorising signature, and confirm the authoriser was acting within their delegated limit." },
    { q: "Which direction of testing tests completeness of revenue?", a: "Select from despatch notes and trace forward to sales invoices and the ledger." },
  ],
  furtherStudy: ["AA-14 covers what the auditor must do with the deficiencies these tests reveal."],
}

const AA_TREE_14: StudyChapter = {
  paper: "AA",
  id: "AA-14",
  number: 14,
  area: "C",
  syllabusRefs: ["C4(a)", "C4(b)"],
  title: "Reporting deficiencies to management",
  minutes: 14,
  intro:
    "Finding a weakness is half the requirement. The other half is a three-part write-up that the marking scheme follows almost literally.",
  outcomes: [
    "Define a deficiency and a significant deficiency in internal control",
    "Explain the auditor's reporting obligations under ISA 265",
    "Write deficiencies, implications and recommendations to the required standard",
    "Explain the contents and limitations of a report to management",
  ],
  sections: [
    {
      id: "definitions",
      heading: "Deficiency and significant deficiency",
      blocks: [
        {
          kind: "definition",
          term: "Deficiency in internal control",
          md: "A control is **designed, implemented or operated in such a way that it cannot prevent, or detect and correct, misstatements** on a timely basis — or a control necessary to do so is **missing**.",
        },
        {
          kind: "definition",
          term: "Significant deficiency",
          md: "A deficiency, or combination of deficiencies, that in the auditor's professional judgement **merits the attention of those charged with governance**.",
        },
        {
          kind: "text",
          md: "Under **ISA 265** the auditor must communicate **significant deficiencies in writing** to those charged with governance **on a timely basis**. Other deficiencies of sufficient importance to merit management's attention are communicated to management, and may be given orally.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The auditor does not look for deficiencies",
          md: "They are identified **as a by-product** of an audit designed to give an opinion on the financial statements. The report to management therefore carries a disclaimer: it covers only matters that came to the auditor's attention, and is not a comprehensive review of internal control.",
        },
      ],
      check: {
        q: "How must significant deficiencies in internal control be communicated?",
        options: [
          "Orally to management at the exit meeting",
          "In writing to those charged with governance, on a timely basis",
          "In the auditor's report to shareholders",
          "Only if management requests a report",
        ],
        correct: 1,
        explain:
          "ISA 265 requires significant deficiencies in writing to those charged with governance, on a timely basis. Lesser deficiencies go to management and may be oral. The auditor's report to shareholders carries the opinion, not internal control findings.",
      },
    },
    {
      id: "writing",
      heading: "Deficiency, implication, recommendation",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Three parts, every time",
          items: [
            "**Deficiency** — what the control failing is, stated factually.",
            "**Implication** — the specific consequence: what misstatement, loss or fraud could result. This is where most marks are lost, because candidates repeat the deficiency in different words.",
            "**Recommendation** — a practical, specific fix that the company could actually implement.",
          ],
        },
        {
          kind: "example",
          title: "The same finding, badly and well",
          scenario: "One clerk sets up new suppliers on the system and also releases payments.",
          steps: [
            { label: "Weak version", detail: "\"There is no segregation of duties. This is a deficiency. Segregation of duties should be introduced.\" — the implication merely restates the deficiency and the recommendation restates it again." },
            { label: "Deficiency", detail: "The same employee can create supplier records and authorise payments to them, with no independent review." },
            { label: "Implication", detail: "Fictitious suppliers could be set up and paid, resulting in misappropriation of cash and overstated purchases and payables, which could continue undetected." },
            { label: "Recommendation", detail: "Restrict supplier creation to a separate individual; require a second authoriser to approve new suppliers before any payment; produce a monthly report of new suppliers for review by the financial controller." },
          ],
          result:
            "The strong version names WHO could do WHAT and WHICH balances would be affected, and the recommendation is something a manager could act on tomorrow. That specificity is the difference between one mark and three.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Recommendations must be proportionate",
          md: "A ten-person company cannot segregate every duty. Where full segregation is impossible, recommend a **compensating control** — independent review of the bank reconciliation by a director, or monthly scrutiny of new suppliers. A recommendation the client cannot implement earns nothing.",
        },
      ],
      check: {
        q: "Which is a properly written IMPLICATION for the deficiency 'bank reconciliations are not reviewed by anyone other than the preparer'?",
        options: [
          "Bank reconciliations should be reviewed by a manager",
          "There is a lack of review of bank reconciliations",
          "Errors or fraudulent transactions in the reconciliation may go undetected, so cash and bank balances could be misstated",
          "This is a significant deficiency in internal control",
        ],
        correct: 2,
        explain:
          "An implication names the CONSEQUENCE — what could go wrong and which balances are affected. The first option is a recommendation, the second restates the deficiency, and the third is a classification rather than a consequence.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing an implication that repeats the deficiency.", fix: "Name the misstatement, loss or fraud that could result, and the balance affected." },
    { trap: "Recommending full segregation of duties in a very small company.", fix: "Recommend a proportionate compensating control such as independent review." },
    { trap: "Saying deficiencies are reported in the auditor's report.", fix: "They go to those charged with governance and management, not to shareholders." },
  ],
  keyTerms: [
    { term: "Deficiency in internal control", def: "A control that cannot prevent or detect and correct misstatements, or a necessary control that is missing." },
    { term: "Significant deficiency", def: "A deficiency meriting the attention of those charged with governance." },
    { term: "Report to management", def: "The written communication of control deficiencies, implications and recommendations." },
  ],
  summary: [
    "A deficiency is a control that cannot prevent or detect misstatement, or one that is missing.",
    "Significant deficiencies go in writing to those charged with governance, on a timely basis.",
    "Deficiencies are a by-product of the audit, not the object of it — hence the disclaimer.",
    "Write deficiency, implication, recommendation — and never let the implication repeat the deficiency.",
    "Recommendations must be proportionate to the size of the entity.",
  ],
  knowledgeDiagnostic: [
    { q: "Define a deficiency in internal control.", a: "A control designed, implemented or operated so that it cannot prevent, or detect and correct, misstatements on a timely basis; or a necessary control that is missing." },
    { q: "To whom, and how, must significant deficiencies be reported?", a: "In writing, to those charged with governance, on a timely basis." },
    { q: "What are the three parts of a written deficiency point?", a: "The deficiency, its implication (the specific consequence and balance affected), and a practical recommendation." },
    { q: "Why does the report to management carry a disclaimer?", a: "Because deficiencies are identified only as a by-product of an audit of the financial statements; it is not a comprehensive review of internal control." },
  ],
  furtherStudy: ["Area D is the substantive evidence the auditor gathers whether or not controls can be relied on."],
}

export const AA_TREE_AREA_C: StudyChapter[] = [AA_TREE_11, AA_TREE_12, AA_TREE_13, AA_TREE_14]
