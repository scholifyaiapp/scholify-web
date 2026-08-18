import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area D — planning and conducting an audit of historical financial
 * information.
 *
 *   AAA-11  Planning, materiality and risk assessment (D1)
 *   AAA-12  Identifying risks from a scenario          (D1 applied)
 *   AAA-13  Evidence and testing considerations        (D2)
 *   AAA-14  Audit procedures for difficult areas       (D3)
 *   AAA-15  Auditing accounting estimates              (D3)
 *   AAA-16  Using the work of others                   (D4)
 *   AAA-17  Group audits                               (D5)
 *
 * SECTION A COMES FROM HERE. The syllabus states that Section A is a 50-mark
 * case study set at the PLANNING stage, drawing predominantly on areas A to D,
 * and that it is likely to include extracts of financial information, strategic
 * and operational information, and audit working papers including the results
 * of analytical procedures.
 *
 * AAA-12 is therefore written as a routine for converting an exhibit into
 * risks with justifications and responses, because that single skill accounts
 * for more marks than any other in the paper.
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_11: StudyChapter = {
  paper: "AAA",
  id: "AAA-11",
  number: 11,
  area: "D",
  syllabusRefs: ["D1"],
  title: "Planning, materiality and risk assessment",
  minutes: 18,
  intro:
    "Planning decides where the audit effort goes, and the risk assessment decides the planning. Almost every deficiency later in an audit traces back to a risk that was never identified.",
  outcomes: [
    "Explain the purpose and content of the overall audit strategy and the plan",
    "Determine materiality and performance materiality, and justify the benchmark",
    "Explain the audit risk model and its components",
    "Identify significant risks and explain what follows from that designation",
    "Explain the effect of analytical procedures at the planning stage",
  ],
  sections: [
    {
      id: "materiality",
      heading: "Materiality, and justifying the benchmark",
      blocks: [
        {
          kind: "text",
          md: "**Materiality** is the threshold above which a misstatement could reasonably be expected to influence users' decisions. It is a matter of judgement, and the judgement has two halves: choosing a **benchmark** appropriate to the entity, and applying a percentage to it.",
        },
        {
          kind: "table",
          caption: "Choosing the benchmark",
          head: ["Entity", "Appropriate benchmark", "Why"],
          rows: [
            ["Profit-oriented, stable earnings", "Profit before tax", "It is what users focus on"],
            ["Loss-making or volatile results", "Revenue or total assets", "A percentage of a small or negative profit produces an unusable figure"],
            ["Asset-intensive or investment entity", "Total assets or net assets", "Users judge it by the asset base"],
            ["Not-for-profit", "Total expenditure or income", "There is no profit measure to use"],
            ["Entity close to a covenant or threshold", "Consider a lower figure for the affected items", "Amounts below normal materiality could still influence decisions"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The benchmark justification is where the mark is",
          md: "Computing 5% of profit is arithmetic. Saying **why profit is the right benchmark for this entity**, and choosing a different one where it is not, is the judgement being examined. A loss-making company is the classic case: applying a percentage to a loss gives a meaningless figure, so revenue or total assets should be used — and stating that reasoning earns more than the calculation.",
        },
        {
          kind: "text",
          md: "**Performance materiality** is set lower than overall materiality, to reduce the risk that uncorrected and undetected misstatements together exceed the overall level. And some items are material **by nature** regardless of size — director's remuneration, related party transactions, and anything that turns a profit into a loss or breaches a covenant. Both points are frequently required and briefly stated.",
        },
      ],
      check: {
        q: "A client made a small loss this year after several profitable years. What should materiality be based on?",
        options: [
          "A percentage of the loss, consistent with prior years' use of profit",
          "A different benchmark such as revenue or total assets — a percentage of a small or negative profit produces an unusably low figure, and the reason for the change should be documented",
          "The prior year's profit figure",
          "Materiality cannot be set for a loss-making entity",
        ],
        correct: 1,
        explain:
          "Benchmark selection is a judgement responding to the entity's circumstances, and a near-breakeven result makes profit unusable. Using the prior year's profit — option 2 — would ignore the current position, which is precisely what users are focused on.",
      },
    },
    {
      id: "risk-model",
      heading: "The audit risk model, and significant risks",
      blocks: [
        {
          kind: "formula",
          name: "Audit risk",
          expr: "Audit risk = risk of material misstatement × detection risk",
          note:
            "The risk of material misstatement is the entity's — inherent risk combined with control risk — and the auditor cannot change it. Detection risk is the auditor's, and it is what the audit plan adjusts: where the risk of material misstatement is high, detection risk must be driven low through more, better or later-timed procedures.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The relationship candidates state backwards",
          md: "The auditor does not reduce the client's risk; they respond to it. **High risk of material misstatement means detection risk must be reduced** — more work, more experienced staff, procedures closer to the year end, larger samples. Saying that the auditor 'reduces inherent risk' is wrong and it is a common error.",
        },
        {
          kind: "table",
          caption: "Significant risks — what the designation means",
          head: ["Question", "Answer"],
          rows: [
            ["What makes a risk significant", "It requires special audit consideration — high inherent risk, complexity, subjectivity, significant judgement, or fraud risk"],
            ["Which are always significant", "Fraud risks the auditor identifies, and management override"],
            ["What follows for controls", "The auditor must obtain an understanding of the entity's controls over that risk"],
            ["What follows for procedures", "Substantive procedures responsive to that specific risk; reliance on analytical procedures alone is not sufficient"],
            ["What follows for evidence", "More persuasive evidence is needed, and the matter is likely to be a key audit matter in the report"],
          ],
        },
        {
          kind: "text",
          md: "**Planning analytical procedures** are required and are frequently the source of the risks in a Section A exhibit. Ratios and trends that move unexpectedly — margin up while volumes fall, receivables days lengthening, inventory rising faster than sales — identify where misstatement may exist. Reading the analytical data in an exhibit and drawing risks from it is exactly what the case study is set up to test.",
        },
      ],
      check: {
        q: "An entity's risk of material misstatement over inventory valuation is assessed as high. What follows for the audit plan?",
        options: [
          "The auditor should work to reduce the entity's inherent risk",
          "Detection risk must be reduced — more experienced staff, larger samples, procedures at or near the year end, and substantive procedures specific to valuation rather than reliance on analytical review alone",
          "Materiality should be increased for inventory",
          "The auditor should disclaim an opinion on inventory",
        ],
        correct: 1,
        explain:
          "The entity's risk is a given; the auditor's response is the variable. Increasing materiality — option 2 — would reduce the work in an area assessed as high risk, which is the opposite of the required response.",
      },
    },
  ],
  examTraps: [
    { trap: "Computing materiality without justifying the benchmark.", fix: "The judgement is which benchmark suits this entity, especially where it is loss-making." },
    { trap: "Saying the auditor reduces inherent or control risk.", fix: "They respond to it by reducing detection risk." },
    { trap: "Ignoring items material by nature.", fix: "Related party transactions and amounts that flip a result are material regardless of size." },
    { trap: "Overlooking the analytical data in an exhibit.", fix: "It is supplied to generate the risks the requirement asks for." },
  ],
  keyTerms: [
    { term: "Performance materiality", def: "An amount set below overall materiality to reduce the probability that uncorrected and undetected misstatements together exceed it." },
    { term: "Significant risk", def: "An identified risk requiring special audit consideration, always including fraud risks and management override." },
    { term: "Detection risk", def: "The risk that the auditor's procedures fail to detect a material misstatement — the only component the auditor controls." },
  ],
  summary: [
    "Justify the benchmark, then compute — a loss-making entity needs a different basis.",
    "Some items are material by nature regardless of amount.",
    "The auditor responds to the entity's risk by adjusting detection risk.",
    "Significant risks require an understanding of controls and specific substantive procedures.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is profit an unsuitable materiality benchmark for a near-breakeven entity?", a: "A percentage of a very small or negative profit produces an unusably low threshold, so revenue or total assets is used instead." },
    { q: "Which component of audit risk does the auditor control?", a: "Detection risk — the risk of material misstatement belongs to the entity and is responded to rather than reduced." },
    { q: "What follows from designating a risk as significant?", a: "The auditor must understand the related controls and perform substantive procedures specific to that risk, rather than relying on analytical procedures alone." },
  ],
  furtherStudy: [
    "AAA-12 turns an exhibit into identified risks with justifications and responses.",
    "AAA-06 covers the fraud risks that are always significant.",
    "AAA-15 covers estimates, which are typically the significant risks in a scenario.",
  ],
}

const AAA_TREE_12: StudyChapter = {
  paper: "AAA",
  id: "AAA-12",
  number: 12,
  area: "D",
  syllabusRefs: ["D1"],
  title: "Turning an exhibit into risks",
  minutes: 19,
  intro:
    "The single highest-value skill in the paper. Section A supplies a scenario and asks for the risks of material misstatement — and there is a routine that gets the marks.",
  outcomes: [
    "Identify risks of material misstatement from a scenario",
    "Justify each risk by reference to the specific facts given",
    "Link each risk to the assertion and the balance affected",
    "Recommend a specific audit response to each risk",
    "Distinguish a risk of material misstatement from a business risk",
  ],
  sections: [
    {
      id: "the-routine",
      heading: "Risk, justification, assertion, response",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Four elements, every time, for each risk separately",
          md: "**What the risk is**, **why it arises from this scenario's facts**, **which balance and assertion it affects**, and **what the auditor should do about it**. The justification is what separates a scoring answer from a list — 'inventory may be overstated' earns nothing, while 'inventory may be overstated because the exhibit shows finished goods rising 40% while revenue fell, indicating slow-moving stock that may not be recoverable at cost' earns the mark and leads to the response.",
        },
        {
          kind: "table",
          caption: "The assertions to reach for",
          head: ["Assertion", "The risk it describes"],
          rows: [
            ["Existence", "The recorded asset does not exist — the classic risk for inventory and receivables"],
            ["Completeness", "Something is missing — the classic risk for liabilities, provisions and expenses"],
            ["Valuation and allocation", "The amount is wrong — estimates, impairment, obsolete inventory, receivable recoverability"],
            ["Rights and obligations", "The entity does not control the asset or owe the liability — consignment stock, leases"],
            ["Cut-off", "Recorded in the wrong period — revenue around the year end, especially where targets are near"],
            ["Presentation and disclosure", "Correctly measured but wrongly presented — related parties, segments, going concern"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Direction matters",
          md: "Say **overstated** or **understated**, not merely 'misstated'. Assets and revenue are usually at risk of overstatement; liabilities, provisions and expenses of understatement — because that is the direction management's incentives push. Naming the direction demonstrates you understand why the risk exists rather than that the balance is difficult.",
        },
      ],
      check: {
        q: "Which is a properly expressed risk of material misstatement?",
        options: [
          "Inventory is a material balance and is difficult to audit",
          "Finished goods have risen 40% while revenue fell 12%, indicating slow-moving inventory, so inventory may be overstated because it is not stated at the lower of cost and net realisable value — affecting the valuation assertion",
          "The company may have going concern problems",
          "Management may be under pressure to meet targets",
        ],
        correct: 1,
        explain:
          "Only option 1 has all the elements: the fact from the exhibit, the inference drawn, the direction of the misstatement, the reason and the assertion. The others are observations that could precede a risk but are not yet risks of material misstatement.",
      },
    },
    {
      id: "business-vs-audit",
      heading: "Business risk, audit risk, and reading the exhibit",
      blocks: [
        {
          kind: "text",
          md: "A **business risk** threatens the entity's objectives; a **risk of material misstatement** threatens the financial statements. They connect — most business risks eventually produce an accounting consequence — but the requirement asks for one or the other, and answering the wrong one loses the marks.",
        },
        {
          kind: "table",
          caption: "The same fact, two ways",
          head: ["Scenario fact", "Business risk", "Risk of material misstatement"],
          rows: [
            ["A major customer has entered administration", "Loss of a significant revenue stream", "Receivables overstated — the balance may be irrecoverable"],
            ["A new competitor has entered the market", "Falling market share and margin", "Inventory overstated if it becomes slow-moving; impairment of goodwill or assets"],
            ["A loan covenant is close to breach", "Facility withdrawn, going concern threatened", "Manipulation to avoid breach; going concern disclosure inadequate; loan misclassified as non-current"],
            ["A new IT system implemented mid-year", "Operational disruption, data loss", "Errors in processing, opening balances, and controls not operating during transition"],
            ["Expansion into a new overseas territory", "Regulatory and currency exposure", "Translation errors, unrecorded liabilities, revenue recognition under unfamiliar terms"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The bridge to use when only one is asked for",
          md: "Where the requirement asks for **risks of material misstatement**, take each business fact and ask **what could go wrong in the accounts because of it**. Where it asks for **business risks**, stop at the commercial consequence. The middle column above is where most candidates stop when the answer needed the right-hand one.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Where the risks hide in a Section A exhibit",
          items: [
            "**Analytical data** — a ratio moving against expectation, or not moving when it should have",
            "**New transactions or arrangements** — an acquisition, a new financing structure, a first-time estimate",
            "**Management incentives** — bonuses, covenants, a planned sale, market expectations",
            "**Changes in the business** — new systems, new markets, new products, restructuring",
            "**Anything involving judgement** — provisions, impairment, fair values, useful lives, revenue over time",
            "**Related parties and unusual transactions**, which are significant risks by their nature",
          ],
        },
      ],
      check: {
        q: "A scenario states that a client is close to breaching a loan covenant based on reported profit. What risk of material misstatement does this create?",
        options: [
          "The business risk that the facility could be withdrawn",
          "Incentive to manipulate reported profit — so revenue may be overstated through early recognition or cut-off, provisions and expenses understated, and estimates biased favourably; the loan may also need reclassification as current if the covenant is breached",
          "That the company will fail",
          "That the auditor's fee may not be paid",
        ],
        correct: 1,
        explain:
          "The covenant creates a specific incentive with identifiable accounting consequences and a direction, plus a presentation risk on the loan's classification. Option 0 is the business risk — correct as far as it goes, but not what a risk of material misstatement requirement asks for.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing balances rather than risks.", fix: "State what could be wrong, in which direction, and why — from the scenario's facts." },
    { trap: "Giving business risks where the requirement asks for misstatement risks.", fix: "Ask what could go wrong in the accounts as a result." },
    { trap: "Omitting the assertion.", fix: "Naming it directs the response and earns the mark." },
    { trap: "Generic responses such as 'audit inventory carefully'.", fix: "Name the procedure that addresses this specific risk." },
  ],
  keyTerms: [
    { term: "Risk of material misstatement", def: "The risk that the financial statements are materially misstated before the audit, comprising inherent and control risk." },
    { term: "Business risk", def: "A risk threatening the entity's objectives, which may or may not produce a financial statement consequence." },
    { term: "Assertion", def: "A representation implicit in the financial statements — existence, completeness, valuation, rights and obligations, cut-off, presentation — that the auditor tests." },
  ],
  summary: [
    "Risk, justification from the facts, assertion, response — for each risk separately.",
    "State the direction: assets and revenue overstated, liabilities and expenses understated.",
    "Business risk threatens the entity; misstatement risk threatens the accounts.",
    "The risks are in the analytics, the changes, the incentives and the judgements.",
  ],
  knowledgeDiagnostic: [
    { q: "What four elements does a scoring risk answer contain?", a: "What could be misstated and in which direction, why from the scenario's facts, which assertion is affected, and the specific audit response." },
    { q: "How do you convert a business risk into a misstatement risk?", a: "Ask what could go wrong in the financial statements as a consequence of that commercial fact." },
    { q: "Why does direction matter?", a: "It shows the risk was reasoned from management's incentives rather than from the balance being large or difficult." },
  ],
  furtherStudy: [
    "AAA-11 covers the materiality and risk framework these risks are assessed within.",
    "AAA-14 covers the procedures that respond to them.",
    "AAA-18 covers going concern, which covenant pressure frequently raises.",
  ],
}

const AAA_TREE_13: StudyChapter = {
  paper: "AAA",
  id: "AAA-13",
  number: 13,
  area: "D",
  syllabusRefs: ["D2"],
  title: "Evidence and testing considerations",
  minutes: 16,
  intro:
    "Sufficient and appropriate are two different tests, and an audit fails on the second far more often than the first.",
  outcomes: [
    "Distinguish the sufficiency and appropriateness of audit evidence",
    "Rank sources of evidence by reliability and explain why",
    "Select procedures appropriate to the assertion being tested",
    "Explain the use of analytical procedures as substantive evidence",
    "Evaluate whether evidence obtained supports a conclusion",
  ],
  sections: [
    {
      id: "sufficient-appropriate",
      heading: "Sufficient, appropriate, and the reliability ranking",
      blocks: [
        {
          kind: "table",
          caption: "The two tests",
          head: ["", "Sufficiency", "Appropriateness"],
          rows: [
            ["Concerns", "Quantity", "Quality — relevance and reliability"],
            ["Driven by", "Assessed risk and the quality of the evidence", "The assertion tested and the source of the evidence"],
            ["Typical failure", "Sample too small for the assessed risk", "Testing the wrong assertion, or relying on evidence from the client"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Relevance is direction-specific",
          md: "Evidence relevant to one assertion may be irrelevant to its opposite. Selecting items **from the accounting records** and tracing them to supporting documents tests **existence**; selecting items **from source documents** and tracing them into the records tests **completeness**. The same population, the opposite direction, a different conclusion. Getting the direction wrong is the most common appropriateness failure and it is invisible unless you state which assertion you are testing.",
        },
        {
          kind: "table",
          caption: "Reliability, most to least",
          head: ["Source", "Why"],
          rows: [
            ["The auditor's own direct observation, inspection or recalculation", "Generated by the auditor, not the client"],
            ["External confirmation received directly by the auditor", "Independent source, and it did not pass through the client's hands"],
            ["Documentary evidence from outside the entity held by the client", "Independent origin, but the client controlled it"],
            ["Documentary evidence generated internally under effective controls", "Internal, but the controls give some assurance"],
            ["Documentary evidence generated internally under weak controls", "Internal and unsupported"],
            ["Oral representations from management", "Least reliable — a starting point rather than evidence"],
          ],
        },
      ],
      check: {
        q: "An auditor wants to test whether all liabilities have been recorded. What is the appropriate direction of testing?",
        options: [
          "Select recorded payables and agree them to supplier invoices",
          "Select from sources outside the ledger — supplier statements, post year-end payments, unmatched goods received notes — and trace into the records, since completeness requires testing for what is missing rather than verifying what is present",
          "Recalculate the total of the payables ledger",
          "Obtain a management representation that liabilities are complete",
        ],
        correct: 1,
        explain:
          "Testing recorded items can never detect an omission, because an unrecorded liability is not in the population being sampled. Completeness must start outside the accounting records, which is the direction-of-testing principle in its most examined form.",
      },
    },
    {
      id: "procedures",
      heading: "Choosing the procedure",
      blocks: [
        {
          kind: "table",
          caption: "Procedures and what each is good for",
          head: ["Procedure", "Best evidence for"],
          rows: [
            ["Inspection of records or documents", "Existence of a transaction; terms and rights"],
            ["Inspection of tangible assets", "Existence — but not ownership, valuation or condition"],
            ["Observation", "Whether a process operates as described, at the time observed"],
            ["External confirmation", "Existence and rights of receivables, bank balances, and terms with third parties"],
            ["Recalculation", "Arithmetical accuracy of a computation"],
            ["Reperformance", "Whether a control operated effectively"],
            ["Analytical procedures", "Relationships and trends; strong for completeness of income where relationships are predictable"],
            ["Enquiry", "Direction toward other evidence — never sufficient alone"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The limits of inspecting an asset",
          md: "Attending an inventory count establishes **existence** and gives information about **condition**. It does not establish that the entity **owns** the goods — they may be held on consignment — nor that they are stated at the **lower of cost and net realisable value**. Candidates routinely offer attendance as the answer to a valuation risk. Say what the procedure actually evidences.",
        },
        {
          kind: "text",
          md: "**Analytical procedures as substantive evidence** require the relationship to be predictable, the data to be reliable, and the expectation to be developed with sufficient precision to identify a material misstatement. Where those hold, they can be powerful and efficient; where they do not, they support other work rather than replacing it. And for a **significant risk**, substantive analytical procedures alone are not sufficient.",
        },
      ],
      check: {
        q: "An audit response to the risk that inventory is overvalued states 'attend the inventory count'. What is the deficiency?",
        options: [
          "Attendance is not a valid audit procedure",
          "Attendance evidences existence and gives information on condition, but not valuation — the response should address net realisable value: reviewing post year-end selling prices, ageing analysis, and the basis of any write-down",
          "The count should be attended by an expert",
          "The procedure should be performed after the year end",
        ],
        correct: 1,
        explain:
          "Matching the procedure to the assertion is the point. A valuation risk needs evidence about what the inventory can be sold for, which the count does not provide — though observations of damaged or slow-moving goods during the count do feed into it.",
      },
    },
  ],
  examTraps: [
    { trap: "Testing completeness from the accounting records.", fix: "An omitted item is not in that population — start outside it." },
    { trap: "Offering attendance at a count as a valuation procedure.", fix: "It evidences existence; valuation needs net realisable value evidence." },
    { trap: "Relying on enquiry as evidence.", fix: "It directs you to evidence; corroboration is the evidence." },
    { trap: "Using analytical procedures alone on a significant risk.", fix: "Not sufficient — other substantive procedures are required." },
  ],
  keyTerms: [
    { term: "Sufficiency", def: "The quantity of audit evidence, affected by the assessed risk and by the quality of the evidence obtained." },
    { term: "Appropriateness", def: "The quality of audit evidence — its relevance to the assertion tested and its reliability given its source." },
    { term: "Direction of testing", def: "Whether items are selected from the records to supporting documents, testing existence, or from source documents into the records, testing completeness." },
  ],
  summary: [
    "Sufficiency is quantity; appropriateness is relevance and reliability.",
    "Direction of testing determines which assertion the work addresses.",
    "Reliability runs from the auditor's own work down to oral representations.",
    "Match the procedure to the assertion — attendance is not a valuation procedure.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can completeness not be tested from the ledger?", a: "An unrecorded item is not in the population being sampled, so testing must begin from sources outside the accounting records." },
    { q: "What does attendance at an inventory count evidence?", a: "Existence, and information about condition — not ownership and not valuation." },
    { q: "When are substantive analytical procedures insufficient alone?", a: "Where the risk is a significant risk, and where the relationship is not predictable or the underlying data is unreliable." },
  ],
  furtherStudy: [
    "AAA-14 covers the procedures for the areas scenarios reliably choose.",
    "AAA-15 covers estimates, where valuation evidence is hardest.",
    "AAA-19 covers evaluating whether sufficient appropriate evidence was obtained overall.",
  ],
}

const AAA_TREE_14: StudyChapter = {
  paper: "AAA",
  id: "AAA-14",
  number: 14,
  area: "D",
  syllabusRefs: ["D3"],
  title: "Audit procedures for the areas scenarios choose",
  minutes: 18,
  intro:
    "Requirements asking for procedures are marked on specificity. 'Review the calculation' earns nothing; naming the document, the comparison and the conclusion earns the mark.",
  outcomes: [
    "Design procedures specific enough to be marked",
    "Apply procedures to revenue recognition, provisions and related parties",
    "Apply procedures to inventory, receivables and non-current assets",
    "Explain the procedures required over journals and unusual transactions",
    "Explain what evidence would resolve a matter raised in a working paper",
  ],
  sections: [
    {
      id: "specificity",
      heading: "What makes a procedure a procedure",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Verb, source, comparison, purpose",
          md: "A markable procedure states **what you do**, **to which document or record**, **against what**, and **what it establishes**. 'Inspect the signed contract with the customer and agree the delivery terms to the date revenue was recognised, to confirm the performance obligation was satisfied before the year end' has all four. 'Check revenue' has none. The difference is worth several marks per requirement across the paper.",
        },
        {
          kind: "table",
          caption: "Weak against markable",
          head: ["Weak", "Markable"],
          rows: [
            ["Review the provision", "Inspect correspondence with the company's legal advisers and obtain direct confirmation of the likely outcome and range of loss, to assess whether an obligation exists at the reporting date"],
            ["Check the impairment", "Obtain the value in use calculation and agree the cash flow forecasts to board-approved budgets, recalculate the discounting, and assess the discount rate against external market data"],
            ["Verify related parties", "Inspect the register of directors' interests and board minutes, review the ledger for transactions with entities sharing directors, and enquire of management about undisclosed relationships"],
            ["Confirm receivables", "Select a sample weighted to older and larger balances and request direct confirmation, following up non-replies with alternative procedures on subsequent cash receipts"],
          ],
        },
      ],
      check: {
        q: "Which is a markable audit procedure?",
        options: [
          "Ensure the warranty provision is reasonable",
          "Obtain the client's warranty claims history for the last three years, recalculate the claim rate as a percentage of sales, compare it to the rate used in the provision, and investigate any significant difference with management",
          "Discuss the warranty provision with the finance director",
          "Consider whether the warranty provision complies with the standard",
        ],
        correct: 1,
        explain:
          "Only option 1 says what to obtain, what to do with it, what to compare it against and what to do with the difference. 'Ensure', 'consider' and an unsupported discussion are all instructions to have an opinion rather than procedures that generate evidence.",
      },
    },
    {
      id: "the-recurring-areas",
      heading: "The areas scenarios reliably choose",
      blocks: [
        {
          kind: "table",
          caption: "Area, risk and the procedures that address it",
          head: ["Area", "Usual risk", "Core procedures"],
          rows: [
            ["Revenue recognition", "Overstatement and cut-off, especially near targets", "Inspect contracts for performance obligations and terms; test cut-off either side of the year end; review credit notes issued after the year end; test journals affecting revenue"],
            ["Provisions and contingencies", "Understated, or recognised when only a contingency exists", "Inspect legal correspondence and obtain direct confirmation from advisers; review board minutes; assess whether a present obligation exists and whether outflow is probable and estimable"],
            ["Related parties", "Undisclosed transactions and non-arm's-length terms", "Inspect the register of interests, board minutes and significant contracts; review the ledger for unusual counterparties; obtain written representations; enquire of those charged with governance"],
            ["Inventory", "Overstated — existence and net realisable value", "Attend the count and test counts both ways; review ageing and post year-end selling prices; test costing including overhead absorption"],
            ["Receivables", "Overstated — existence and recoverability", "Direct confirmation with alternative procedures for non-replies; review cash received after the year end; assess the loss allowance against ageing and known disputes"],
            ["Non-current assets", "Overstated — impairment, capitalisation of revenue expenditure, useful lives", "Inspect additions to invoices and assess whether the capitalisation criteria are met; review depreciation rates against asset condition; test impairment indicators"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The mandatory procedures nobody remembers",
          md: "Because management override is a risk in every audit, the auditor must in every engagement **test journal entries** — particularly those posted at or near the period end, by unusual users, or to unrelated accounts — **review estimates for bias**, and **evaluate the business rationale of significant unusual transactions**. Including these when a requirement asks for the response to fraud risk is a reliable mark.",
        },
        {
          kind: "text",
          md: "**Written representations** deserve a note. They are required, they are evidence, and they are the **weakest** kind — appropriate for matters where other evidence cannot reasonably be expected, such as management's intent. They can never substitute for available evidence, and a scenario in which management offers a representation instead of allowing a procedure is describing a scope limitation rather than an alternative.",
        },
      ],
      check: {
        q: "Management offers a written representation about the recoverability of a large receivable rather than permitting the auditor to confirm it with the customer. How should this be treated?",
        options: [
          "Accept the representation as sufficient evidence",
          "As a limitation on scope — a representation cannot substitute for evidence that could reasonably be obtained, so the auditor should seek the reason for the refusal, perform alternative procedures such as testing subsequent receipts, and consider the effect on the opinion if unresolved",
          "Request a representation from those charged with governance instead",
          "Increase materiality so the balance is not significant",
        ],
        correct: 1,
        explain:
          "Representations supplement evidence rather than replacing it, so a refusal to permit an available procedure is a scope limitation. The refusal itself is also informative — it may indicate the balance is disputed — and it raises a question about management's integrity.",
      },
    },
  ],
  examTraps: [
    { trap: "Writing 'ensure', 'check' or 'consider'.", fix: "Verb, source, comparison, purpose — say what generates the evidence." },
    { trap: "Offering procedures unconnected to the stated risk.", fix: "Each procedure should address the assertion the risk threatens." },
    { trap: "Omitting the mandatory fraud procedures.", fix: "Journals, estimates for bias, and unusual transactions apply in every audit." },
    { trap: "Accepting a representation instead of available evidence.", fix: "That is a scope limitation, not an alternative." },
  ],
  keyTerms: [
    { term: "Written representation", def: "A written statement by management confirming a matter, which is audit evidence but the weakest kind and never a substitute for available evidence." },
    { term: "Cut-off testing", def: "Testing transactions either side of the period end to confirm they are recorded in the correct period." },
    { term: "Alternative procedures", def: "Work performed where a planned procedure cannot be completed, such as testing subsequent cash receipts when a confirmation is not returned." },
  ],
  summary: [
    "A markable procedure names the action, the source, the comparison and the purpose.",
    "Match the procedure to the assertion the identified risk threatens.",
    "Journals, estimate bias and unusual transactions are mandatory in every audit.",
    "A representation offered instead of evidence is a scope limitation.",
  ],
  knowledgeDiagnostic: [
    { q: "What four elements make a procedure markable?", a: "What you do, to which record or document, against what comparison, and what it establishes." },
    { q: "Which procedures are mandatory in every audit because of management override?", a: "Testing journal entries, reviewing estimates for bias, and evaluating the business rationale of significant unusual transactions." },
    { q: "What does a refusal to permit a confirmation indicate?", a: "A scope limitation, and potentially a concern about the balance or about management's integrity." },
  ],
  furtherStudy: [
    "AAA-13 covers the evidence principles these procedures apply.",
    "AAA-15 covers estimates in detail, the hardest of these areas.",
    "AAA-20 covers the opinion consequences of an unresolved scope limitation.",
  ],
}

export const AAA_TREE_AREA_D_PART1: StudyChapter[] = [AAA_TREE_11, AAA_TREE_12, AAA_TREE_13, AAA_TREE_14]
