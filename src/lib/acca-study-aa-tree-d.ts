import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area D — audit evidence.
 *
 * The largest area in the paper and the one Section B draws on most. It was
 * ONE chapter for D1 to D7: assertions, procedures, sampling, the audit of
 * every specific balance, CAATs, using the work of others AND not-for-profit
 * audits.
 *
 *   AA-15  Assertions and sufficient appropriate evidence
 *   AA-16  Audit procedures, sampling and CAATs
 *   AA-17  Auditing receivables and inventory
 *   AA-18  Auditing payables, bank and non-current assets
 *   AA-19  Using the work of others, and not-for-profit audits
 *
 * Written against the official ACCA AA syllabus and the ISAs it references.
 */

const AA_TREE_15: StudyChapter = {
  paper: "AA",
  id: "AA-15",
  number: 15,
  area: "D",
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)"],
  title: "Assertions and sufficient appropriate evidence",
  minutes: 16,
  intro:
    "Every audit procedure exists to test an assertion. Name the assertion and the procedure writes itself; miss it and the procedure tests nothing in particular.",
  outcomes: [
    "State the financial statement assertions for transactions and for balances",
    "Explain what makes evidence sufficient and appropriate",
    "Rank sources of evidence by reliability",
    "Link a procedure to the assertion it tests",
  ],
  sections: [
    {
      id: "assertions",
      heading: "The assertions",
      blocks: [
        {
          kind: "table",
          caption: "Classes of transactions and events",
          head: ["Assertion", "The question it asks"],
          rows: [
            ["Occurrence", "Did the transactions recorded actually happen, and do they relate to this entity?"],
            ["Completeness", "Have all transactions that should have been recorded been recorded?"],
            ["Accuracy", "Were the amounts recorded correctly?"],
            ["Cut-off", "Were they recorded in the correct period?"],
            ["Classification", "Were they posted to the right accounts?"],
            ["Presentation", "Are they appropriately aggregated and described?"],
          ],
        },
        {
          kind: "table",
          caption: "Account balances at the period end",
          head: ["Assertion", "The question it asks"],
          rows: [
            ["Existence", "Do the assets and liabilities actually exist?"],
            ["Rights and obligations", "Does the entity own the assets and owe the liabilities?"],
            ["Completeness", "Have all balances that should be recorded been recorded?"],
            ["Accuracy, valuation and allocation", "Are they included at appropriate amounts, with valuation adjustments properly recorded?"],
            ["Classification", "Are they recorded in the proper accounts?"],
            ["Presentation", "Are they properly described and disclosed?"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two assertions dominate the exam",
          md: "**Existence** matters most for assets, because the risk is overstatement — recording things you do not have. **Completeness** matters most for liabilities, because the risk is understatement — leaving things out. Get that pairing right and half of Area D follows.",
        },
      ],
      check: {
        q: "Which assertion is of most concern when auditing trade payables?",
        options: ["Existence", "Completeness", "Rights and obligations", "Classification"],
        correct: 1,
        explain:
          "The risk with liabilities is that they are UNDERSTATED — omitted altogether — so completeness is the priority. Existence is the priority for assets, where the risk runs the other way.",
      },
    },
    {
      id: "sufficient-appropriate",
      heading: "Sufficient and appropriate",
      blocks: [
        {
          kind: "definition",
          term: "Sufficiency and appropriateness",
          md: "**Sufficiency** is the QUANTITY of evidence. **Appropriateness** is its QUALITY — its **relevance** to the assertion being tested and its **reliability**. The two interact: better-quality evidence means less of it is needed.",
        },
        {
          kind: "table",
          caption: "Reliability, most reliable first",
          head: ["More reliable", "Less reliable"],
          rows: [
            ["Obtained directly by the auditor", "Obtained indirectly or by inference"],
            ["From an independent external source", "Generated internally by the entity"],
            ["Internal evidence where controls are effective", "Internal evidence where controls are weak"],
            ["Documentary — original documents", "Oral representations; photocopies and scans"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Enquiry alone is never enough",
          md: "Asking management is a valid procedure and a weak form of evidence. It must be **corroborated** — with a document, a recalculation, an external confirmation or an observation. An answer whose procedures are all \"discuss with management\" scores very little.",
        },
        {
          kind: "illustration",
          title: "Relevance is not the same as reliability",
          md: "A bank confirmation received directly from the bank is highly **reliable** evidence. It is also completely **irrelevant** to whether inventory is obsolete.\n\nStrong evidence about the wrong assertion is worth nothing. That is why the assertion comes first: decide what you are trying to prove, and only then choose the procedure that proves it.",
        },
      ],
      check: {
        q: "Which is the most reliable evidence that a receivable exists?",
        options: [
          "The sales invoice held by the client",
          "A confirmation received directly from the customer",
          "Management's assurance that the customer is good for it",
          "The aged receivables listing from the client's system",
        ],
        correct: 1,
        explain:
          "External, independent and received directly by the auditor — the strongest combination. The invoice and the listing are internally generated; management's assurance is oral and unsupported.",
      },
    },
  ],
  examTraps: [
    { trap: "Testing existence for liabilities.", fix: "Liabilities risk understatement — test completeness." },
    { trap: "Procedures that all begin \"discuss with management\".", fix: "Enquiry must be corroborated by document, recalculation, confirmation or observation." },
    { trap: "Confusing sufficiency with appropriateness.", fix: "Sufficiency is quantity; appropriateness is relevance plus reliability." },
  ],
  keyTerms: [
    { term: "Assertion", def: "A representation by management, explicit or otherwise, embodied in the financial statements." },
    { term: "Sufficient", def: "Enough evidence — a measure of quantity." },
    { term: "Appropriate", def: "Evidence that is relevant to the assertion and reliable in source — a measure of quality." },
  ],
  summary: [
    "Transactions: occurrence, completeness, accuracy, cut-off, classification, presentation.",
    "Balances: existence, rights and obligations, completeness, valuation, classification, presentation.",
    "Assets risk overstatement (existence); liabilities risk understatement (completeness).",
    "Sufficiency is quantity; appropriateness is relevance and reliability.",
    "External, auditor-obtained, documentary evidence is the most reliable; enquiry alone is never enough.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the assertions relevant to account balances.", a: "Existence, rights and obligations, completeness, accuracy/valuation and allocation, classification and presentation." },
    { q: "Which assertion is most important for assets, and which for liabilities?", a: "Existence for assets, because the risk is overstatement; completeness for liabilities, because the risk is understatement." },
    { q: "What makes evidence appropriate?", a: "Relevance to the assertion being tested, and reliability of its source." },
  ],
  furtherStudy: ["AA-16 covers the procedures that gather this evidence, and how much of it to gather."],
}

const AA_TREE_16: StudyChapter = {
  paper: "AA",
  id: "AA-16",
  number: 16,
  area: "D",
  syllabusRefs: ["D2(a)", "D3(a)", "D3(b)", "D5(a)"],
  title: "Audit procedures, sampling and CAATs",
  minutes: 17,
  intro:
    "Seven procedures, a set of sampling methods, and the software that lets you test the whole population instead of a slice of it.",
  outcomes: [
    "Describe the types of audit procedure",
    "Distinguish sampling risk from non-sampling risk",
    "Describe methods of sample selection",
    "Explain the use, advantages and limitations of computer-assisted audit techniques",
  ],
  sections: [
    {
      id: "procedures",
      heading: "The seven procedures",
      blocks: [
        {
          kind: "table",
          caption: "What each one is",
          head: ["Procedure", "What it involves", "Strong evidence for"],
          rows: [
            ["Inspection of records", "Examining documents, internal or external", "Occurrence, accuracy, rights"],
            ["Inspection of tangible assets", "Physically examining an asset", "Existence — but NOT ownership or value"],
            ["Observation", "Watching a process being performed", "How a control operates, at that moment only"],
            ["External confirmation", "A direct written response from a third party", "Existence, rights, accuracy — the most reliable form"],
            ["Recalculation", "Checking the arithmetic of a document or record", "Accuracy"],
            ["Reperformance", "Independently executing a procedure or control", "Whether a control operated"],
            ["Analytical procedures", "Evaluating plausible relationships in the data", "Completeness, accuracy, and identifying the unusual"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two limits candidates forget",
          md: "**Physical inspection proves existence, not ownership or value.** Seeing a machine tells you nothing about whether it is leased, pledged or worth what the books say. And **observation only proves what happened while you watched** — staff behave differently when the auditor is in the room.",
        },
      ],
      check: {
        q: "The auditor physically inspects a machine listed in the non-current asset register. Which assertion does this test?",
        options: ["Valuation", "Rights and obligations", "Existence", "Completeness"],
        correct: 2,
        explain:
          "Existence only. Ownership needs the invoice or title documents, and valuation needs the cost and depreciation working. Physical inspection is strong evidence for one assertion and none of the others.",
      },
    },
    {
      id: "sampling",
      heading: "Sampling",
      blocks: [
        {
          kind: "table",
          caption: "Two risks, and only one is about the sample",
          head: ["Risk", "Meaning", "How to reduce it"],
          rows: [
            ["Sampling risk", "The sample is not representative, so the conclusion differs from testing the whole population", "Increase the sample size; select more appropriately"],
            ["Non-sampling risk", "The auditor reaches a wrong conclusion for any other reason — wrong procedure, misinterpreted result, inexperience", "Better planning, training, direction, supervision and review"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Methods of selection",
          items: [
            "**Random selection** — every item has an equal chance; use random number software.",
            "**Systematic selection** — every nth item after a random start. Beware a pattern in the population that matches the interval.",
            "**Monetary unit sampling** — selection weighted by value, so large items are more likely to be chosen. Good where overstatement is the risk.",
            "**Haphazard selection** — chosen without a structured technique. Not random, and prone to unconscious bias.",
            "**Block selection** — a contiguous run of items. Rarely appropriate: a block is unlikely to represent the whole period.",
          ],
        },
        {
          kind: "definition",
          term: "Anomaly",
          md: "A misstatement that is **demonstrably not representative** of the population. The auditor must obtain a high degree of certainty before treating one as such — and errors found in a sample are otherwise **projected** across the population.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Errors get projected",
          md: "Finding £2,000 of error in a sample covering 5% of a balance does not mean the misstatement is £2,000. It implies roughly £40,000 across the population — which may be material even though the sample error was not.",
        },
      ],
      check: {
        q: "An auditor selects every 50th invoice, starting from a random point. Which method is this, and what is the main risk?",
        options: [
          "Random selection; no particular risk",
          "Systematic selection; a pattern in the population may coincide with the interval",
          "Monetary unit sampling; large items are over-represented",
          "Block selection; the sample is not spread across the period",
        ],
        correct: 1,
        explain:
          "Systematic selection. If the population has structure — say every 50th invoice is from the same branch or falls on the same weekday — the sample systematically misses everything else.",
      },
    },
    {
      id: "caats",
      heading: "Computer-assisted audit techniques",
      blocks: [
        {
          kind: "table",
          caption: "The two families",
          head: ["Technique", "What it does", "Example"],
          rows: [
            ["Test data", "Processing data with known results through the client's system to see whether controls work", "Submitting an order that exceeds a credit limit and checking it is rejected"],
            ["Audit software", "Interrogating the client's data files directly", "Recalculating depreciation on every asset; casting the receivables ledger; identifying items over a value; finding gaps or duplicates in a sequence"],
          ],
        },
        {
          kind: "table",
          caption: "The trade-off",
          head: ["Advantages", "Limitations"],
          rows: [
            ["Tests the ENTIRE population, not a sample", "Set-up cost and time, especially in year one"],
            ["Fast and accurate on large volumes", "Requires staff with the necessary skills"],
            ["Reduces sampling risk to nothing for that test", "Needs access to systems and cooperation from the client's IT staff"],
            ["Independent of the client's own reporting", "Risk of corrupting live data if test data is run on live systems"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Test data on a live system",
          md: "If test transactions are run through the client's live system, they must be **reversed or removed**, or the client's records now contain the auditor's fictitious entries. Naming that risk and its control is a reliable mark.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Saying physical inspection proves ownership.", fix: "It proves existence only; ownership needs documentary evidence." },
    { trap: "Treating an error found in a sample as the total misstatement.", fix: "Project it across the population unless it is a genuine anomaly." },
    { trap: "Listing CAAT benefits without the set-up cost and skills required.", fix: "Give both sides; the cost is why smaller audits still sample." },
  ],
  keyTerms: [
    { term: "Sampling risk", def: "The risk that a sample is not representative of the population." },
    { term: "Non-sampling risk", def: "The risk of a wrong conclusion for reasons unrelated to the sample." },
    { term: "Monetary unit sampling", def: "Selection weighted by value, so higher-value items are more likely to be selected." },
    { term: "Test data", def: "Data with known results processed through the client's system to test whether controls operate." },
  ],
  summary: [
    "Seven procedures: inspection of records and of assets, observation, external confirmation, recalculation, reperformance, analytical procedures.",
    "Physical inspection proves existence only; observation proves only what was watched.",
    "Sampling risk is about the sample; non-sampling risk is about everything else.",
    "Errors found in a sample are projected across the population unless genuinely anomalous.",
    "CAATs test whole populations at the cost of set-up time and skills.",
  ],
  knowledgeDiagnostic: [
    { q: "Name five audit procedures.", a: "Inspection, observation, external confirmation, recalculation, reperformance, analytical procedures and enquiry — any five." },
    { q: "Distinguish sampling risk from non-sampling risk.", a: "Sampling risk is that the sample is unrepresentative; non-sampling risk is a wrong conclusion for any other reason, such as an inappropriate procedure or misinterpreted result." },
    { q: "Give one advantage and one limitation of audit software.", a: "It can test an entire population rather than a sample; but it requires set-up time, skills and access to the client's systems." },
  ],
  furtherStudy: ["AA-17 and AA-18 apply all of this to the specific balances the exam asks about."],
}

const AA_TREE_17: StudyChapter = {
  paper: "AA",
  id: "AA-17",
  number: 17,
  area: "D",
  syllabusRefs: ["D4(a)", "D4(b)"],
  title: "Auditing receivables and inventory",
  minutes: 18,
  intro:
    "The two balances examined most often, and the two where a well-drilled list of procedures is worth the most marks per minute.",
  outcomes: [
    "Describe substantive procedures for trade receivables, including circularisation",
    "Explain the auditor's approach to the allowance for irrecoverable receivables",
    "Describe the auditor's duties before, during and after an inventory count",
    "Describe substantive procedures for inventory valuation and cut-off",
  ],
  sections: [
    {
      id: "receivables",
      heading: "Trade receivables",
      blocks: [
        {
          kind: "table",
          caption: "External confirmation — the two forms",
          head: ["", "Positive confirmation", "Negative confirmation"],
          rows: [
            ["Customer replies", "Always — agreeing or disagreeing", "Only if they DISAGREE"],
            ["Evidence quality", "Stronger — silence is not treated as agreement", "Weaker — silence may mean agreement, or that the letter was never opened"],
            ["When used", "The normal choice", "Only where risk is low, many small balances, and a low expected exception rate"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Running a circularisation",
          items: [
            "Obtain **management's permission** — it is the client's customer relationship.",
            "Select the sample, including **large balances**, **old balances**, **credit balances** and **nil balances** (which test completeness).",
            "Send letters **on the client's letterhead**, but with replies going **directly to the auditor**.",
            "**Follow up non-replies** with a second and, if necessary, a third request.",
            "For persistent non-replies, use **alternative procedures**: after-date cash received, or agree the balance to despatch notes and invoices.",
            "**Investigate every difference** — timing differences such as cash or goods in transit, or genuine disputes.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "After-date cash is the strongest single procedure",
          md: "Cash received from the customer after the year end proves both **existence** and **recoverability** in one step, and needs no cooperation from anyone. When a question asks for the best alternative to a non-reply, this is it.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The allowance for irrecoverable receivables",
          items: [
            "Review the **aged receivables listing** for old balances and compare ageing with the prior year.",
            "Review **cash received after the year end** against the balances outstanding.",
            "Review **correspondence** for disputes, and board minutes for known problems.",
            "Discuss specific balances with the credit controller and **corroborate** the explanation.",
            "**Recalculate** the allowance and assess whether the basis is reasonable and consistently applied.",
          ],
        },
      ],
      check: {
        q: "A customer does not reply to a positive confirmation after two requests. What is the best alternative procedure?",
        options: [
          "Treat silence as agreement to the balance",
          "Review cash received from that customer after the year end",
          "Ask the credit controller whether the balance is correct",
          "Send a negative confirmation instead",
        ],
        correct: 1,
        explain:
          "After-date cash is independent evidence of both existence and recoverability. Silence proves nothing under a positive circularisation, an internal enquiry is weak, and switching to negative confirmation would reduce the evidence rather than replace it.",
      },
    },
    {
      id: "inventory",
      heading: "Inventory",
      blocks: [
        {
          kind: "table",
          caption: "The count — three stages",
          head: ["Before", "During", "After"],
          rows: [
            ["Review prior year's count and issues", "Observe whether count instructions are followed", "Agree the final valued listing to the count sheets"],
            ["Obtain and review the count instructions", "Perform TWO-WAY test counts", "Follow up all queries and exceptions raised"],
            ["Assess whether the timing and locations are appropriate", "Note damaged, obsolete and slow-moving items", "Confirm cut-off using the last GRN and GDN numbers"],
            ["Book staff and plan coverage of locations", "Record the last goods received and despatch note numbers", "Check the client's adjustments for count differences"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Test counts go BOTH ways",
          md: "**Sheets to floor** tests **existence** — is the recorded inventory actually there? **Floor to sheets** tests **completeness** — is everything present recorded? Doing only one direction answers only half the question, and questions award the two separately.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Valuation — lower of cost and net realisable value",
          items: [
            "Agree **cost** to a sample of purchase invoices, and for manufactured items to the costing records including an appropriate share of overheads.",
            "Compare cost with **NRV** — post year-end selling prices less costs to sell — for a sample, especially slow-moving lines.",
            "Investigate items noted as **damaged or obsolete** at the count and confirm they were written down.",
            "Review inventory ageing and compare **inventory days** with the prior year for evidence of slow movement.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Cut-off is where inventory and revenue meet",
          md: "The last GRN and GDN numbers recorded at the count are the auditor's cut-off evidence. Goods despatched before the year end must be OUT of inventory and IN revenue; goods received must be IN inventory and IN payables. A cut-off error misstates two balances at once.",
        },
      ],
      check: {
        q: "During a count, the auditor selects items from the shelves and traces them to the count sheets. Which assertion is tested?",
        options: ["Existence", "Completeness", "Valuation", "Rights and obligations"],
        correct: 1,
        explain:
          "Floor to sheets tests completeness — whether everything physically present has been recorded. Tracing the other way, from sheets to floor, tests existence. The exam awards these separately, so the direction must be stated.",
      },
    },
  ],
  examTraps: [
    { trap: "Sending confirmation replies to the client.", fix: "Replies must come directly to the auditor, or the evidence is worthless." },
    { trap: "Only performing test counts in one direction.", fix: "Sheets to floor for existence, floor to sheets for completeness." },
    { trap: "Treating non-replies to a positive confirmation as agreement.", fix: "Follow up, then use alternative procedures — after-date cash first." },
    { trap: "Omitting nil and credit balances from a circularisation sample.", fix: "They test completeness and are where errors hide." },
  ],
  keyTerms: [
    { term: "Positive confirmation", def: "A request asking the customer to reply whether or not they agree the balance." },
    { term: "After-date cash", def: "Cash received after the year end, evidencing both existence and recoverability of a receivable." },
    { term: "Net realisable value", def: "Estimated selling price less the estimated costs of completion and sale." },
    { term: "Cut-off", def: "Recording transactions in the correct accounting period." },
  ],
  summary: [
    "Positive confirmations are the norm; negatives only where risk is low.",
    "Replies go directly to the auditor, and non-replies are followed up then replaced by after-date cash.",
    "The allowance is tested by ageing, after-date cash, correspondence and recalculation.",
    "Count work has three stages, and test counts run in both directions.",
    "Inventory is the lower of cost and NRV; cut-off ties inventory to revenue and payables.",
  ],
  knowledgeDiagnostic: [
    { q: "Why must confirmation replies be sent directly to the auditor?", a: "Because evidence routed through the client could be intercepted or altered, destroying its independence and therefore its reliability." },
    { q: "What does a test count from the shelves to the count sheets prove?", a: "Completeness — that inventory physically present has been recorded." },
    { q: "Name three procedures over the allowance for irrecoverable receivables.", a: "Review the aged listing for old balances; review cash received after the year end; review correspondence and board minutes for disputes. (Also recalculate the allowance.)" },
    { q: "How does the auditor obtain evidence of inventory cut-off?", a: "By recording the last goods received and goods despatched note numbers at the count and agreeing transactions either side of them to the correct period." },
  ],
  furtherStudy: ["AA-18 covers the balances where understatement, not overstatement, is the risk."],
}

const AA_TREE_18: StudyChapter = {
  paper: "AA",
  id: "AA-18",
  number: 18,
  area: "D",
  syllabusRefs: ["D4(c)", "D4(d)", "D4(e)"],
  title: "Auditing payables, bank and non-current assets",
  minutes: 17,
  intro:
    "Liabilities are audited the other way round from assets — you are hunting for what is missing, not checking what is there.",
  outcomes: [
    "Describe substantive procedures for trade payables and accruals",
    "Explain the search for unrecorded liabilities",
    "Describe procedures for bank and cash balances",
    "Describe procedures for tangible non-current assets",
  ],
  sections: [
    {
      id: "payables",
      heading: "Payables and accruals",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "The direction of risk reverses",
          md: "For assets the risk is **overstatement**, so the auditor tests **existence**. For liabilities the risk is **understatement** — a company under pressure omits invoices — so the auditor tests **completeness**. Every procedure below is designed to find something that is not in the ledger.",
        },
        {
          kind: "list",
          style: "number",
          title: "The search for unrecorded liabilities",
          items: [
            "Review **payments made after the year end** and check whether the related liability existed at the year end.",
            "Inspect **unmatched goods received notes** — goods received but not yet invoiced are still liabilities.",
            "Review **invoices received after the year end** and check they are recorded in the right period.",
            "**Reconcile supplier statements** to the ledger balances, investigating every reconciling item.",
            "Enquire about **disputed invoices** and review correspondence with suppliers.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Supplier statements beat a payables circularisation",
          md: "A supplier statement is **external evidence** the client already holds, and it shows what the supplier says is owed — including invoices the client has not recorded. That is exactly the completeness risk. A payables circularisation is used far less often, because the statement usually does the job without needing anyone's cooperation.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Accruals",
          items: [
            "**Recalculate** a sample and agree the basis to supporting evidence such as the last invoice or the payroll.",
            "Compare with the **prior year** and investigate significant movements or missing categories.",
            "Review **after-date payments** for expenses relating to the period under audit.",
          ],
        },
      ],
      check: {
        q: "Why is reviewing payments made after the year end a key procedure for payables?",
        options: [
          "It confirms the payables recorded actually exist",
          "It may reveal liabilities that existed at the year end but were not recorded",
          "It tests the valuation of payables",
          "It confirms the client's bank balance",
        ],
        correct: 1,
        explain:
          "A payment after the year end for goods or services received before it is evidence of a liability that should have been recorded. The whole procedure is aimed at COMPLETENESS — finding what is missing rather than checking what is there.",
      },
    },
    {
      id: "bank",
      heading: "Bank and cash",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The core procedures",
          items: [
            "Obtain a **bank confirmation letter** directly from the bank, covering all accounts, balances, security given and any other relationships such as loans and guarantees.",
            "Obtain the client's **bank reconciliation** and cast it.",
            "Agree the **balance per the bank statement** to the confirmation, and the **balance per the cash book** to the ledger.",
            "Trace **outstanding lodgements** and **unpresented cheques** to the after-date bank statement, investigating any that clear late.",
            "Review the cash book and bank statements for **unusual items** around the year end.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Old unpresented cheques are a warning",
          md: "A cheque written before the year end that has still not cleared months later may never have been sent — which would mean the payable was wrongly removed and cash understated. Window dressing of this kind is a classic scenario, and spotting it earns the mark.",
        },
      ],
    },
    {
      id: "nca",
      heading: "Tangible non-current assets",
      blocks: [
        {
          kind: "table",
          caption: "Procedure by assertion",
          head: ["Assertion", "Procedure"],
          rows: [
            ["Existence", "Select from the asset register and physically inspect the asset"],
            ["Completeness", "Select assets physically present and trace to the register"],
            ["Rights and obligations", "Inspect purchase invoices, title deeds and registration documents"],
            ["Valuation — additions", "Agree a sample of additions to invoices; confirm they are capital rather than revenue in nature"],
            ["Valuation — depreciation", "Recalculate the charge; assess whether the rate and method remain appropriate for the assets' use"],
            ["Disposals", "Agree proceeds to the bank and recalculate the profit or loss on disposal"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Capital or revenue is the recurring trap",
          md: "Repairs charged as additions overstate assets and profit; capital items charged to expenses do the reverse. When a scenario mentions a large amount of \"maintenance\" or \"refurbishment\", it is asking you to test that distinction against the invoices.",
        },
      ],
      check: {
        q: "The auditor selects assets from the non-current asset register and physically inspects them. Which assertion is being tested?",
        options: ["Completeness", "Existence", "Rights and obligations", "Valuation"],
        correct: 1,
        explain:
          "Register to asset tests EXISTENCE — that what is recorded is really there. Going the other way, from assets on the floor to the register, tests completeness. Same pairing as the inventory count.",
      },
    },
  ],
  examTraps: [
    { trap: "Testing existence for payables.", fix: "Liabilities risk understatement — hunt for what is missing." },
    { trap: "Preferring a payables circularisation to supplier statements.", fix: "Statements are external, already held, and reveal unrecorded invoices." },
    { trap: "Ignoring long-outstanding unpresented cheques.", fix: "They may indicate window dressing — the payable removed but the cheque never sent." },
    { trap: "Accepting additions without testing capital versus revenue.", fix: "Agree to invoices and assess the nature of the spend." },
  ],
  keyTerms: [
    { term: "Search for unrecorded liabilities", def: "Procedures directed at finding liabilities omitted from the ledger at the year end." },
    { term: "Bank confirmation letter", def: "A direct written response from the bank confirming balances, security and other relationships." },
    { term: "Unpresented cheque", def: "A cheque written and recorded but not yet cleared by the bank." },
  ],
  summary: [
    "Liabilities risk understatement, so completeness drives every procedure.",
    "Search for unrecorded liabilities: after-date payments, unmatched GRNs, after-date invoices, supplier statements.",
    "Supplier statements are external evidence already in the client's hands.",
    "Bank work rests on a direct confirmation plus testing the reconciliation.",
    "Non-current assets: register to asset for existence, asset to register for completeness, and test capital versus revenue.",
  ],
  knowledgeDiagnostic: [
    { q: "Which assertion drives the audit of payables, and why?", a: "Completeness — the risk is that liabilities are understated or omitted, especially by an entity under financial pressure." },
    { q: "Name three procedures in the search for unrecorded liabilities.", a: "Review payments made after the year end; inspect unmatched goods received notes; review invoices received after the year end. (Also reconcile supplier statements.)" },
    { q: "Why is a long-outstanding unpresented cheque suspicious?", a: "It may never have been sent, meaning the payable was removed and cash understated — window dressing." },
    { q: "How does the auditor test completeness of non-current assets?", a: "By selecting assets physically present and tracing them to the asset register." },
  ],
  furtherStudy: ["AA-19 covers the situations where the auditor relies on work performed by someone else."],
}

const AA_TREE_19: StudyChapter = {
  paper: "AA",
  id: "AA-19",
  number: 19,
  area: "D",
  syllabusRefs: ["D6(a)", "D6(b)", "D7(a)"],
  title: "Using the work of others, and not-for-profit audits",
  minutes: 15,
  intro:
    "The auditor may use other people's work but never shares the responsibility for the opinion. That single sentence answers most of this chapter.",
  outcomes: [
    "Explain the conditions for using the work of internal audit",
    "Explain the auditor's approach to using an auditor's expert",
    "Describe the audit considerations for a service organisation",
    "Describe the particular risks in auditing a not-for-profit entity",
  ],
  sections: [
    {
      id: "internal-audit-expert",
      heading: "Internal audit and experts",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Before relying on internal audit (ISA 610)",
          items: [
            "**Objectivity** — where does it report, and what threatens its independence?",
            "**Competence** — are the staff qualified, trained and experienced?",
            "**A systematic and disciplined approach** — is there proper planning, documentation and quality control?",
            "Then **evaluate and test some of the specific work** the external auditor intends to use.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Responsibility is never shared",
          md: "The external auditor's opinion is **theirs alone**, however much internal audit work is used. And internal audit may **assist** under direction and supervision only where local ethical rules allow — it can never be relied on for judgements about significant risks.",
        },
        {
          kind: "table",
          caption: "Using an auditor's expert (ISA 620)",
          head: ["Step", "What it involves"],
          rows: [
            ["Assess competence and objectivity", "Qualifications, membership of a professional body, experience, and any relationship with the client"],
            ["Agree the scope", "The nature, objectives and intended use of the work, in writing"],
            ["Evaluate the findings", "Are the assumptions, methods and source data reasonable and consistent with the auditor's understanding?"],
            ["Conclude", "The expert's work is evidence, not a conclusion; the auditor still forms the judgement"],
          ],
        },
      ],
      check: {
        q: "An external auditor plans to rely on internal audit's work on inventory counts. What must be evaluated first?",
        options: [
          "Whether internal audit costs less than the external team",
          "Internal audit's objectivity, competence and systematic approach",
          "Whether the audit committee approves",
          "Whether internal audit has attended counts before",
        ],
        correct: 1,
        explain:
          "ISA 610 requires objectivity, competence and a systematic and disciplined approach to be evaluated before any reliance, and then the specific work itself must be evaluated and some of it re-tested. Cost is irrelevant to whether the evidence is adequate.",
      },
    },
    {
      id: "service-orgs",
      heading: "Service organisations",
      blocks: [
        {
          kind: "text",
          md: "Where a client **outsources** part of its processing — payroll, or the whole accounting function — the records are held by a third party. The auditor still needs evidence about those transactions.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The options (ISA 402)",
          items: [
            "Obtain a **type 1 or type 2 report** from the service organisation's own auditor — type 2 also reports on the operating effectiveness of controls, not merely their design.",
            "**Visit the service organisation** and perform procedures there, with the client's agreement.",
            "Perform **substantive procedures at the client** on the outputs — reconciling what was sent to what came back.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Outsourcing does not outsource the risk",
          md: "The client remains responsible for its own financial statements, and the auditor remains responsible for the opinion. \"The payroll bureau handles it\" is not an audit conclusion.",
        },
      ],
    },
    {
      id: "nfp",
      heading: "Not-for-profit organisations",
      blocks: [
        {
          kind: "table",
          caption: "Where the risks differ",
          head: ["Area", "Why it is harder"],
          rows: [
            ["Completeness of income", "Cash donations, collections and street fundraising have no reliable independent record — the classic high-risk area"],
            ["Volunteers", "Untrained staff, high turnover, and weak segregation of duties"],
            ["Restricted funds", "Income given for a specific purpose must be spent on it and accounted for separately"],
            ["Objectives", "Success is service delivery, not profit, so analytical review has fewer reliable benchmarks"],
            ["Regulation", "Charity-specific rules and reporting requirements may apply alongside the accounting framework"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Completeness of cash income is the exam's focus",
          md: "There is no invoice, no order and no customer to confirm with. The auditor falls back on controls — two people counting collections, sealed and numbered tins, immediate banking intact — and on analytical comparison with prior years and similar events. Where controls are absent, the auditor may be unable to obtain sufficient evidence, which is a **reporting** problem, not just a risk.",
        },
      ],
      check: {
        q: "Why is completeness of income the principal risk in a charity audit?",
        options: [
          "Charities are more likely to commit fraud",
          "Cash donations have no independent record, so unrecorded income cannot be traced",
          "Charities do not keep accounting records",
          "Income is always immaterial in a charity",
        ],
        correct: 1,
        explain:
          "There is no invoice, order or customer to confirm against, so the auditor cannot trace what was never recorded. That is why the evidence depends on controls over cash collection, and why absent controls can become a limitation on scope.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying reliance on internal audit reduces the auditor's responsibility.", fix: "The opinion is the external auditor's alone, whatever work is used." },
    { trap: "Treating an expert's report as the conclusion.", fix: "It is evidence; the auditor evaluates the assumptions, methods and data." },
    { trap: "Concluding that outsourced processing is outside the audit scope.", fix: "Obtain a service auditor's report, visit, or test the outputs at the client." },
  ],
  keyTerms: [
    { term: "Auditor's expert", def: "An individual or organisation with expertise in a field other than accounting or auditing, whose work is used as audit evidence." },
    { term: "Type 2 report", def: "A service auditor's report covering both the design AND the operating effectiveness of controls over a period." },
    { term: "Restricted funds", def: "Income given for a specified purpose, which must be spent on it and accounted for separately." },
  ],
  summary: [
    "Internal audit may be relied on after assessing objectivity, competence and approach — and testing some of its work.",
    "The opinion and the responsibility remain the external auditor's alone.",
    "An expert's work is evidence; the auditor evaluates assumptions, methods and source data.",
    "For outsourced processing: a service auditor's report, a visit, or substantive testing of the outputs.",
    "In a not-for-profit, completeness of cash income is the principal risk and depends on controls.",
  ],
  knowledgeDiagnostic: [
    { q: "What three matters must be evaluated before relying on internal audit?", a: "Its objectivity, its competence, and whether it applies a systematic and disciplined approach — after which the specific work used must also be evaluated and partly re-tested." },
    { q: "What is the difference between a type 1 and a type 2 service auditor's report?", a: "A type 1 reports on the design and implementation of controls; a type 2 also reports on their operating effectiveness over a period." },
    { q: "Why is completeness of income the key risk in a charity?", a: "Cash donations and collections leave no independent record, so income never recorded cannot be traced; evidence depends on controls over collection and banking." },
  ],
  furtherStudy: ["Area E takes this evidence and turns it into the opinion."],
}

export const AA_TREE_AREA_D: StudyChapter[] = [AA_TREE_15, AA_TREE_16, AA_TREE_17, AA_TREE_18, AA_TREE_19]
