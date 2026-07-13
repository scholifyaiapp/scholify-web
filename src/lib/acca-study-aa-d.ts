import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area D — Audit evidence.
 * Rich study chapter: sufficiency & appropriateness, the reliability hierarchy,
 * the financial statement assertions, direction of testing, audit procedures,
 * sampling (ISA 530), evidence for specific balances, and using an expert /
 * internal audit. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const AA_D: StudyChapter = {
  paper: "AA",
  area: "D",
  title: "Audit evidence",
  minutes: 17,
  intro: "An audit opinion is only as strong as the evidence behind it. This chapter is where the auditor stops planning and starts proving — gathering enough of the right evidence to sign, or refuse to sign, the accounts.",
  outcomes: [
    "Explain what makes audit evidence sufficient and appropriate, and rank sources by reliability",
    "State the financial statement assertions and match a procedure to the assertion it tests",
    "Apply the direction of testing — vouch for existence, trace for completeness",
    "Describe the seven procedures for obtaining evidence and when each is used",
    "Outline sampling under ISA 530 and design substantive tests for key balances",
    "Explain the auditor's use of an expert (ISA 620) and of internal audit (ISA 610)",
  ],
  sections: [
    {
      id: "suff-approp",
      heading: "Sufficient, appropriate evidence",
      blocks: [
        { kind: "text", md: "Under **ISA 500 Audit Evidence** the auditor must obtain **sufficient appropriate audit evidence** to reduce audit risk to an acceptably low level and support the opinion. Two words carry the whole idea, and they are not the same thing." },
        { kind: "text", md: "**Sufficiency** is the measure of the **quantity** of evidence — how much. **Appropriateness** is the measure of the **quality** of evidence — how good. Quality has two halves: evidence must be **relevant** (it actually tests the assertion in question) and **reliable** (its source and nature make it trustworthy). More of a weak thing does not fix quality: fifty copies of the same doubtful document are no more persuasive than one." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The two dimensions of evidence",
          caption: "Every test the auditor plans should improve one or both of these.",
          data: {
            leftTitle: "Sufficiency (quantity)",
            rightTitle: "Appropriateness (quality)",
            rows: [
              { aspect: "Question it answers", left: "How much evidence?", right: "How good is the evidence?" },
              { aspect: "Driven by", left: "Risk & materiality of the item", right: "Relevance + reliability of the source" },
              { aspect: "More is needed when", left: "Risk is higher; quality is lower", right: "n/a — quality is about nature, not amount" },
              { aspect: "Fails when", left: "Sample too small for the risk", right: "Evidence tests the wrong assertion, or comes from a weak source" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The link between the two", md: "Sufficiency and appropriateness are **interrelated**. The **higher the risk** of misstatement, the **more** evidence is likely to be needed; the **higher the quality** of that evidence, the **less** of it may be needed. Quantity can never fully compensate for poor quality." },
        { kind: "text", md: "Reliability is not a coin-toss — it follows a **hierarchy**. Broadly, evidence is more reliable when it is from an **independent external** source, generated under **effective internal controls**, obtained **directly by the auditor**, exists in **documentary** form, and consists of **original** documents. Reverse each of those and reliability falls." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The reliability hierarchy",
          caption: "Higher in the pyramid = more reliable. Auditors prefer evidence they generate themselves from independent sources.",
          data: {
            levels: [
              { label: "Auditor-generated", sub: "e.g. the auditor's own recalculation or physical inspection" },
              { label: "External & independent", sub: "e.g. a bank confirmation sent direct to the auditor" },
              { label: "Internal, strong controls", sub: "entity records produced under effective controls" },
              { label: "Internal, weak controls / oral", sub: "management representations, verbal answers — least reliable" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Oral is weakest", md: "**Written** evidence beats **oral**; **original** beats **photocopy**; **external** beats **internal**. A verbal assurance from management is the weakest evidence of all — always seek to corroborate it with something documentary and, ideally, external." },
      ],
      check: {
        q: "Which source of evidence is generally the MOST reliable?",
        options: [
          "A photocopied sales invoice held in the client's files",
          "A verbal explanation from the finance director",
          "A bank confirmation received directly by the auditor from the bank",
          "A schedule prepared by the client's accounts clerk",
        ],
        correct: 2,
        explain: "Reliability rises when evidence is external, independent and obtained directly by the auditor. A bank confirmation sent by an independent third party straight to the auditor scores on all three. The photocopy (not original), the verbal explanation (oral, internal) and the client-prepared schedule (internal) are all weaker.",
      },
    },
    {
      id: "assertions",
      heading: "The financial statement assertions",
      blocks: [
        { kind: "text", md: "Management, by presenting the financial statements, makes a set of implicit claims about every figure — the **assertions**. The auditor's job is to test those claims. Every substantive procedure exists to give comfort over one or more assertions, so knowing the assertions is the key that unlocks procedure-design questions." },
        { kind: "text", md: "There are assertions about **classes of transactions** (the P/L) and about **account balances** (the position statement); the exam treats them as one combined list. The core assertions are below." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The financial statement assertions",
          caption: "Each figure in the accounts is an implicit management claim under these headings.",
          data: {
            items: [
              { title: "Existence", sub: "Recorded assets and liabilities really exist" },
              { title: "Rights & obligations", sub: "The entity owns/controls the asset, or is bound by the liability" },
              { title: "Completeness", sub: "Everything that should be recorded is recorded — nothing omitted" },
              { title: "Accuracy / valuation", sub: "Amounts are recorded at the correct, appropriate value" },
              { title: "Cut-off", sub: "Transactions are recorded in the correct accounting period" },
              { title: "Classification & presentation", sub: "Items are in the right accounts and disclosed properly" },
            ],
          },
        } },
        { kind: "table", caption: "Matching a worry to an assertion", head: ["If you are worried that...", "The assertion at risk", "A test that helps"], rows: [
          ["Recorded receivables may not be real", "Existence", "Circularise a sample of customers"],
          ["Some liabilities are missing from the books", "Completeness", "Search for unrecorded liabilities"],
          ["Inventory is worth less than stated", "Valuation", "Compare cost to net realisable value"],
          ["A sale is in the wrong period", "Cut-off", "Test despatches either side of year end"],
          ["A leased asset isn't really owned", "Rights & obligations", "Inspect title / lease documents"],
          ["A finance cost is shown as revenue", "Classification & presentation", "Review disclosures and account coding"],
        ] },
        { kind: "callout", tone: "tip", title: "Read the verb in the question", md: "Exam requirements almost always name the assertion. \"Confirm receivables **exist**\" → existence → vouch outward. \"Confirm liabilities are **complete**\" → completeness → trace inward. Spot the assertion and the direction of testing follows automatically." },
      ],
      check: {
        q: "An auditor inspects lease agreements to confirm the company controls the vehicles capitalised as non-current assets. Which assertion is being tested?",
        options: [
          "Completeness",
          "Cut-off",
          "Rights and obligations",
          "Existence",
        ],
        correct: 2,
        explain: "Confirming that the entity owns or controls the asset — that it holds the rights to it — is the rights and obligations assertion. Existence would ask whether the vehicles are physically there; completeness would ask whether any assets are missing from the register.",
      },
    },
    {
      id: "direction",
      heading: "The direction of testing",
      blocks: [
        { kind: "text", md: "This is the single most examined idea in Area D, and the one candidates most often get backwards. The **direction** in which you test — where you start and where you finish — determines **which assertion** you prove. Get the direction wrong and your procedure tests nothing." },
        { kind: "text", md: "To test **existence / occurrence**, start from the **accounting records** and work back to the **source evidence** — this is called **vouching**. You are asking: \"this figure is in the books; is there a real transaction behind it?\" If the records are overstated with fictitious entries, vouching outward exposes them because the supporting document will not be found." },
        { kind: "text", md: "To test **completeness**, start from the **source documents** (the real-world population) and work forward into the **accounting records** — this is called **tracing**. You are asking: \"this thing really happened; did it get into the books?\" If the records are understated because items were omitted, tracing inward catches them because the source item has no matching entry." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Direction of testing — the rule to memorise",
          caption: "Start point and end point are mirror images. The direction proves the assertion.",
          data: {
            leftTitle: "Testing EXISTENCE",
            rightTitle: "Testing COMPLETENESS",
            rows: [
              { aspect: "Assertion at risk", left: "Overstatement — recorded items not real", right: "Understatement — real items not recorded" },
              { aspect: "Start from", left: "The accounting records / ledger", right: "The source documents / physical items" },
              { aspect: "Trace to", left: "The supporting source document", right: "The accounting records / ledger" },
              { aspect: "The technique is called", left: "Vouching (records → source)", right: "Tracing (source → records)" },
              { aspect: "Example", left: "Sales ledger balance → despatch note & order", right: "Goods received notes → purchase ledger" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The mantra", md: "**Existence = from the records OUT to the source (vouch). Completeness = from the source IN to the records (trace).** Overstatement is caught by vouching; understatement is caught by tracing." },
        { kind: "callout", tone: "warn", title: "The classic reversal", md: "Selecting items **from the sales ledger** and finding the despatch note tests **existence**, not completeness — every recorded sale can be supported while omitted sales sit invisibly outside the ledger you started from. To test completeness of sales you must start from **despatch notes** and trace into the ledger." },
      ],
      check: {
        q: "To test whether purchases are COMPLETE, from which population should the auditor select items, and where should they trace them?",
        options: [
          "Select from the purchase ledger and trace to goods received notes",
          "Select from goods received notes and trace to the purchase ledger",
          "Select from the bank statement and trace to supplier invoices",
          "Select from supplier statements and recalculate the balance",
        ],
        correct: 1,
        explain: "Completeness guards against omission, so you must start OUTSIDE the records — with evidence that goods were actually received (goods received notes) — and trace INTO the ledger to check each one was recorded. Starting from the ledger would only prove that recorded purchases are real (existence), never that none were left out.",
      },
    },
    {
      id: "procedures",
      heading: "The seven audit procedures",
      blocks: [
        { kind: "text", md: "ISA 500 gives seven methods for obtaining evidence. A strong answer names the **procedure**, the **assertion** it serves and the **evidence** it produces — vague verbs like \"check\" score nothing. The seven are: **inspection, observation, external confirmation, recalculation, reperformance, analytical procedures and inquiry** — learn them individually with an example of what each proves (they are set out below)." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The seven procedures for obtaining evidence",
          caption: "Each generates evidence of different reliability; strong answers combine several.",
          data: {
            items: [
              { title: "Inspection", sub: "Examine records, documents or physical assets" },
              { title: "Observation", sub: "Watch a process being performed (e.g. the inventory count)" },
              { title: "External confirmation", sub: "Direct written reply from a third party (bank, customer)" },
              { title: "Recalculation", sub: "Check the arithmetical accuracy of the client's figures" },
              { title: "Reperformance", sub: "Independently re-execute a control or procedure" },
              { title: "Analytical procedures", sub: "Evaluate figures via relationships, ratios & trends" },
              { title: "Inquiry", sub: "Seek information from knowledgeable people — corroborate it" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Observation and inquiry are limited", md: "**Observation** only proves the process happened **while you watched** — staff may behave differently at other times. **Inquiry** on its own is **never sufficient**: it is oral, internal evidence and must always be corroborated with something more reliable." },
        { kind: "table", caption: "Procedure → what it is best at", head: ["Procedure", "Best evidence of", "Note on reliability"], rows: [
          ["External confirmation", "Existence, rights, valuation of balances", "High — external, direct to auditor"],
          ["Recalculation / reperformance", "Accuracy, valuation, control operation", "High — auditor-generated"],
          ["Inspection of documents", "Existence, rights, occurrence", "Varies — original & external is best"],
          ["Observation", "That a process operates", "Limited to the moment observed"],
          ["Analytical procedures", "Completeness, reasonableness overall", "Depends on data reliability"],
          ["Inquiry", "Context, explanations, pointers", "Weak alone — must corroborate"],
        ] },
      ],
    },
    {
      id: "sampling-balances",
      heading: "Sampling and evidence for specific balances",
      blocks: [
        { kind: "text", md: "Auditors rarely test 100% of a population — it is neither efficient nor necessary. **ISA 530 Audit Sampling** lets the auditor apply procedures to **less than 100%** of items so that **every sampling unit has a chance of selection** and a conclusion can be drawn about the **whole population**. Two sampling risks arise: the sample may not represent the population, so results are projected with care." },
        { kind: "table", caption: "Selecting the sample (ISA 530)", head: ["Approach", "How it works", "Watch-out"], rows: [
          ["Random selection", "Every item an equal chance (random numbers)", "Needs a complete population list"],
          ["Systematic selection", "Every nth item from a random start", "Beware patterns in the population"],
          ["Monetary unit sampling", "Selection weighted to larger values", "Biased toward high-value items"],
          ["Haphazard / block", "No structured method / a run of items", "Block is weak — not representative"],
        ] },
        { kind: "text", md: "Sampling supplies the mechanism; the **assertion and balance** dictate the **substantive procedure**. The following are the workhorse tests every AA candidate must know cold." },
        { kind: "text", md: "**Receivables — circularisation.** With the client's permission the auditor writes to a **sample of customers** asking them to confirm the balance **directly to the auditor**. A **positive** confirmation asks for a reply either way (stronger); a **negative** asks for a reply only if the balance is wrong (weaker). It is strong evidence of **existence** and **rights** — but weaker for **valuation**, since a customer may confirm a debt they cannot actually pay. Non-replies are followed up with reminders and **alternative procedures** (e.g. inspecting after-date cash received)." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Receivables circularisation — the substantive flow",
          caption: "A positive confirmation tests existence and rights of trade receivables.",
          data: {
            steps: [
              { label: "Select sample", sub: "Choose customer balances from the ledger" },
              { label: "Obtain consent", sub: "Client permits the request in writing" },
              { label: "Send requests", sub: "Letters ask reply DIRECT to auditor" },
              { label: "Chase non-replies", sub: "Reminders, then alternative procedures" },
              { label: "Investigate differences", sub: "Reconcile disputes — cash/goods in transit" },
              { label: "Conclude", sub: "Project errors; form view on the balance" },
            ],
          },
        } },
        { kind: "text", md: "**Inventory — count attendance.** For material inventory the auditor **attends the physical count**. They **observe** whether the client's count is properly controlled, perform **test counts in both directions** (floor → sheets for **completeness**; sheets → floor for **existence**), note **cut-off** details (last GRN/despatch numbers), and watch for **damaged or slow-moving** items that threaten **valuation** at the lower of cost and net realisable value." },
        { kind: "text", md: "**Payables and the search for unrecorded liabilities.** The dominant risk for liabilities is **understatement**, so the key test is a **completeness** test: the auditor examines **after-date payments, unmatched GRNs and supplier statements** for invoices that relate to the year but were **not recorded**. Reconciling the ledger to **supplier statements** (an external source) is stronger evidence of completeness than confirming to the client's own list." },
        { kind: "text", md: "**Non-current assets.** Test **existence** by physically inspecting a sample from the register; test **rights** by inspecting **title deeds, registration or purchase invoices**; test **valuation** by checking cost, depreciation recalculation and any revaluation; and test **completeness** by tracing physical assets back to the register." },
        { kind: "text", md: "**Bank.** Obtain a **bank confirmation letter** sent directly by the bank — strong external evidence of balances, overdrafts, security, guarantees and other accounts. Agree it to the year-end **bank reconciliation**, and test reconciling items such as **outstanding lodgements and unpresented cheques**." },
        { kind: "text", md: "**Provisions and accounting estimates (ISA 540).** Estimates are subjective, so the auditor evaluates whether recognition criteria are met (a present obligation, probable outflow, reliable estimate), tests the **assumptions and data** used, recalculates the figure, considers **after-date events** for confirmation, and may develop an **independent estimate** to compare." },
        { kind: "callout", tone: "key", title: "The balance-to-risk logic", md: "Assets are audited chiefly for **overstatement** → the headline tests are **existence and valuation** (vouch outward). Liabilities are audited chiefly for **understatement** → the headline test is **completeness** (trace inward, search for unrecorded items). Fix that split and specific-balance questions become predictable." },
      ],
      check: {
        q: "The search for unrecorded liabilities primarily provides evidence over which assertion for payables?",
        options: [
          "Existence — that recorded payables are real",
          "Completeness — that no liabilities have been omitted",
          "Valuation — that payables are measured correctly",
          "Classification — that payables are shown as current",
        ],
        correct: 1,
        explain: "Liabilities carry the risk of understatement, so the search for unrecorded liabilities — inspecting after-date payments, unmatched GRNs and supplier statements — is a completeness test. It hunts for obligations that exist but were left out of the ledger, which an existence test starting from the ledger could never find.",
      },
    },
    {
      id: "expert-ia",
      heading: "Using an expert and internal audit",
      blocks: [
        { kind: "text", md: "Some balances need knowledge the audit team does not have — a property valuation, an actuarial pension calculation, a legal opinion. **ISA 620 Using the Work of an Auditor's Expert** lets the auditor rely on a specialist, but responsibility for the opinion stays **entirely with the auditor**. Before relying on the work the auditor must assess the expert's **competence, capabilities and objectivity**, understand the **field of expertise**, agree the **scope** of the work, and evaluate whether the expert's **findings, assumptions, methods and source data** are appropriate and consistent with other evidence." },
        { kind: "callout", tone: "rule", title: "Responsibility is not delegated", md: "Using an expert (ISA 620) or relying on internal audit (ISA 610) **never** reduces the external auditor's responsibility for the opinion. The auditor must still evaluate the work — an expert's or internal auditor's conclusion is evidence to assess, not a result to accept on trust." },
        { kind: "text", md: "**ISA 610 Using the Work of Internal Auditors.** A strong internal audit function can make the external audit more efficient, but the external auditor must first evaluate whether internal audit is **objective** (how high it reports, whether policies protect its independence), **competent** (qualifications, resources), and whether it applies a **systematic, disciplined approach** including quality control. Only then can its work be used — and the external auditor performs their **own procedures** to confirm it remains adequate." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Auditor's expert vs internal audit",
          caption: "Different sources of help, one shared rule: the external auditor stays responsible.",
          data: {
            leftTitle: "Auditor's expert (ISA 620)",
            rightTitle: "Internal audit (ISA 610)",
            rows: [
              { aspect: "Purpose", left: "Specialist knowledge outside accounting/audit", right: "Assurance/controls work within the entity" },
              { aspect: "Assess first", left: "Competence, capability, objectivity", right: "Objectivity, competence, systematic approach" },
              { aspect: "Key independence worry", left: "Is the expert linked to the client?", right: "How high does IA report? Who sets its work?" },
              { aspect: "Effect on responsibility", left: "None — auditor still responsible", right: "None — auditor still responsible" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Objectivity is the pivot", md: "For both an expert and internal audit, the exam almost always turns on **objectivity/independence**. If the expert is a relative of a director, or internal audit reports to the finance director it is meant to check, reliability collapses regardless of technical skill." },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating sufficiency and appropriateness as the same thing.", fix: "Sufficiency = quantity (how much); appropriateness = quality (relevant + reliable). Quantity never compensates for poor quality." },
    { trap: "Testing existence and completeness in the same direction.", fix: "Existence = vouch from the records OUT to the source. Completeness = trace from the source IN to the records. The direction proves the assertion." },
    { trap: "Assuming a receivables circularisation proves the debt will be paid.", fix: "It confirms existence and rights, not valuation — a customer can confirm a balance they are unable to pay. Assess recoverability separately." },
    { trap: "Relying on inquiry or observation alone.", fix: "Inquiry is oral, internal evidence — always corroborate it. Observation only proves the process ran while you watched." },
    { trap: "Thinking using an expert or internal audit shifts responsibility.", fix: "ISA 620 and ISA 610 leave the audit opinion wholly with the external auditor, who must still evaluate the work and, for internal audit, do their own procedures." },
  ],
  keyTerms: [
    { term: "Sufficient appropriate evidence", def: "Enough evidence (quantity) of the right quality (relevant and reliable) to reduce audit risk and support the opinion — ISA 500." },
    { term: "Assertions", def: "The implicit management claims about each figure — existence, rights & obligations, completeness, accuracy/valuation, cut-off, classification & presentation." },
    { term: "Vouching", def: "Testing from the accounting records back to the source document to confirm recorded items are real — the direction that tests existence." },
    { term: "Tracing", def: "Testing from source documents forward into the accounting records to confirm nothing was omitted — the direction that tests completeness." },
    { term: "Circularisation", def: "Writing to a sample of customers (with client consent) to confirm balances directly to the auditor; positive requests are stronger than negative." },
    { term: "Search for unrecorded liabilities", def: "A completeness test for payables using after-date payments, unmatched GRNs and supplier statements to find omitted obligations." },
  ],
  summary: [
    "Evidence must be sufficient (quantity, driven by risk) and appropriate (quality = relevant + reliable); reliability rises with external, auditor-obtained, documentary, original sources.",
    "The assertions — existence, rights & obligations, completeness, accuracy/valuation, cut-off, classification & presentation — are the claims every procedure tests.",
    "Direction of testing: existence = vouch records → source (catches overstatement); completeness = trace source → records (catches understatement).",
    "Seven procedures — inspection, observation, external confirmation, recalculation, reperformance, analytical procedures, inquiry; inquiry alone is never sufficient. Sampling (ISA 530) lets a sample speak for the population.",
    "Assets → test existence/valuation; liabilities → test completeness. Circularise receivables, attend the inventory count, search for unrecorded liabilities, confirm bank, scrutinise estimates (ISA 540); using an expert (ISA 620) or internal audit (ISA 610) never transfers responsibility.",
  ],
}
