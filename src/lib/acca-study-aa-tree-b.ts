import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area B — planning and risk assessment.
 *
 * Was one chapter for B1 to B6: acceptance, the audit risk model, materiality,
 * understanding the entity, fraud, laws and regulations, planning AND
 * documentation. Audit risk alone is the spine of every Section B question in
 * this paper.
 *
 *   AA-06  Accepting and continuing an engagement   (B1)
 *   AA-07  Audit risk and materiality               (B3)
 *   AA-08  Understanding the entity                 (B2, B4)
 *   AA-09  Fraud, laws and regulations              (B5)
 *   AA-10  Audit strategy, planning and documentation (B6)
 *
 * Written against the official ACCA AA syllabus and the ISAs it references.
 */

const AA_TREE_06: StudyChapter = {
  paper: "AA",
  id: "AA-06",
  number: 6,
  area: "B",
  syllabusRefs: ["B1(a)", "B1(b)", "B1(c)"],
  title: "Accepting and continuing an engagement",
  minutes: 15,
  intro:
    "The audit begins before any testing: deciding whether to take the client at all, and writing down what each side has agreed to do.",
  outcomes: [
    "Explain the preconditions for an audit under ISA 210",
    "Describe the matters considered before accepting a new client",
    "Explain the purpose and process of professional clearance",
    "State the contents of an engagement letter and when it should be revised",
  ],
  sections: [
    {
      id: "preconditions",
      heading: "Preconditions and client screening",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "ISA 210 preconditions — both must hold",
          items: [
            "The financial reporting framework to be applied is **acceptable**.",
            "**Management acknowledges its responsibility** for preparing the financial statements, for internal control, and for giving the auditor access to all information, records and people.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "If management will not acknowledge those responsibilities",
          md: "The auditor **shall not accept** the engagement. It is not a threat to be safeguarded — without that acknowledgement the audit cannot be performed, because the auditor has no assured access to evidence.",
        },
        {
          kind: "table",
          caption: "What the firm assesses before accepting",
          head: ["Consideration", "Question"],
          rows: [
            ["Integrity of management", "Is there a history of aggressive reporting, disputes, or a poor reputation?"],
            ["Independence and ethics", "Any threats from interests, relationships or existing services?"],
            ["Competence and resources", "Do we have the skills, the specialists and the staff available at the right time?"],
            ["Risk", "Is the entity high risk — listed, heavily regulated, financially distressed?"],
            ["Fees", "Is the fee adequate for the work, and would it create undue dependence?"],
          ],
        },
      ],
      check: {
        q: "Prospective management refuses to confirm it will give the auditor unrestricted access to records and staff. What should the firm do?",
        options: [
          "Accept, and apply an independent review as a safeguard",
          "Accept, but qualify the audit opinion",
          "Decline — a precondition for the audit is absent",
          "Accept, and raise the fee to reflect the risk",
        ],
        correct: 2,
        explain:
          "That acknowledgement is a precondition under ISA 210, not a risk factor. Without assured access the auditor cannot obtain sufficient appropriate evidence, so the engagement must not be accepted. Qualifying an opinion is a reporting response to a problem found during an audit already accepted.",
      },
    },
    {
      id: "clearance-letter",
      heading: "Professional clearance and the engagement letter",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "Professional clearance, in order",
          items: [
            "Ask the **prospective client** for permission to contact the outgoing auditor.",
            "If permission is **refused**, decline the engagement — refusal is itself a warning.",
            "With permission, write to the outgoing auditor asking whether there is any reason not to accept.",
            "The outgoing auditor must obtain the client's permission to reply. If they cannot, or do not respond, the incoming firm considers that in its decision.",
          ],
        },
        {
          kind: "table",
          caption: "Engagement letter — the contents ISA 210 requires",
          head: ["Element", "Why it is there"],
          rows: [
            ["Objective and scope of the audit", "Defines what is and is not being done"],
            ["Responsibilities of the auditor", "Reasonable assurance, ISAs, inherent limitations"],
            ["Responsibilities of management", "Preparing the statements, internal control, access"],
            ["The applicable financial reporting framework", "The criteria against which the opinion is given"],
            ["Expected form and content of reports", "Sets expectations about the opinion"],
            ["Fees and billing arrangements", "Avoids later dispute"],
            ["Agreement to provide written representations", "Secures a required piece of evidence in advance"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The letter narrows the expectation gap",
          md: "It is a contract, and it is also the clearest statement a client ever receives of what an audit is not. Questions asking why an engagement letter matters want both purposes.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "When to revise it",
          items: [
            "A change in **senior management or ownership**.",
            "A significant change in the **nature or size** of the business.",
            "A change in **legal or reporting requirements**, or in the framework.",
            "Evidence the client **misunderstands** the objective or scope of the audit.",
          ],
        },
      ],
    },
    {
      id: "acceptance-scenario",
      heading: "An acceptance decision, worked",
      blocks: [
        {
          kind: "example",
          title: "Four facts, four different answers",
          scenario:
            "Your firm is offered the audit of Trenholm Co. (1) The outgoing auditor resigned mid-year. (2) Trenholm refuses permission to contact them, saying the relationship ended badly. (3) Trenholm's finance director is your engagement partner's sister. (4) The proposed fee is 40% below your normal rate for the work.",
          steps: [
            { label: "1 · Mid-year resignation", detail: "A warning sign, not a bar. Obtain the resignation statement, which must set out any circumstances members or creditors should know about — or state there are none." },
            { label: "2 · Permission refused", detail: "DECLINE. Refusal removes the firm's ability to assess why the previous auditor left, and is itself the strongest available signal. This alone ends the decision." },
            { label: "3 · Partner's sister as FD", detail: "A close family relationship creates familiarity and self-interest threats to objectivity. Not a prohibition on the FIRM, but that partner cannot lead the engagement — a different partner and an independent review would be needed." },
            { label: "4 · Fee 40% below rate", detail: "Not unethical in itself, but it must not compromise quality or compliance with standards. If the fee cannot fund a proper audit, the firm cannot accept: professional competence and due care come before winning the work." },
          ],
          result:
            "Only ONE of the four is decisive on its own, and it is the one candidates skip past. The others are threats to be assessed and managed. Sorting decisive from manageable is the skill being examined.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A lowball fee is not automatically an ethical breach",
          md: "Low-balling is permitted; what is not permitted is performing an inadequate audit because the fee is inadequate. The answer is therefore about **competence and due care**, not about the price — a distinction that separates a good answer from a moralising one.",
        },
      ],
      check: {
        q: "A prospective client refuses permission for you to contact the outgoing auditor. What should you do?",
        options: [
          "Contact the outgoing auditor anyway — professional duty overrides",
          "Accept, but perform extra procedures in the first year",
          "Decline the engagement",
          "Accept, and ask the client to explain in writing why",
        ],
        correct: 2,
        explain:
          "Refusal prevents the firm from assessing why the previous auditor left, and is itself a serious warning. Contacting them without permission would breach confidentiality. Extra procedures cannot substitute for information deliberately withheld before you even start.",
      },
    },
  ],
  examTraps: [
    { trap: "Contacting the outgoing auditor before asking the client.", fix: "Client permission first; refusal is a reason to decline." },
    { trap: "Treating missing preconditions as a risk to be managed.", fix: "Without them the engagement must not be accepted." },
    { trap: "Listing the engagement letter as evidence of an opinion.", fix: "It agrees terms and responsibilities; it is not audit evidence about the figures." },
  ],
  keyTerms: [
    { term: "Preconditions for an audit", def: "An acceptable reporting framework and management's acknowledgement of its responsibilities." },
    { term: "Professional clearance", def: "Contacting the outgoing auditor, with the client's permission, for any reason not to accept." },
    { term: "Engagement letter", def: "The written agreement recording the terms, scope and responsibilities of the audit." },
  ],
  summary: [
    "Two preconditions: an acceptable framework and management's acknowledgement of responsibilities.",
    "Screening covers management integrity, ethics, competence, risk and fees.",
    "Ask the client before contacting the outgoing auditor; refusal is a reason to decline.",
    "The engagement letter records objective, scope and both parties' responsibilities.",
    "Revise it on changes of management, ownership, size, framework or evident misunderstanding.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two preconditions for an audit?", a: "An acceptable financial reporting framework, and management's acknowledgement of its responsibility for the statements, internal control and access to information." },
    { q: "What is the first step in professional clearance?", a: "Obtaining the prospective client's permission to contact the outgoing auditor; refusal is a reason to decline." },
    { q: "Name four contents of an engagement letter.", a: "The objective and scope of the audit, the auditor's responsibilities, management's responsibilities, and the applicable financial reporting framework. (Also report form, fees, written representations.)" },
  ],
  furtherStudy: ["AA-07 begins the audit itself, with the risk model that directs everything after it."],
}

const AA_TREE_07: StudyChapter = {
  paper: "AA",
  id: "AA-07",
  number: 7,
  area: "B",
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)", "B3(d)"],
  title: "Audit risk and materiality",
  minutes: 19,
  intro:
    "The spine of the paper. Almost every Section B question asks you to identify risks from a scenario and say what the auditor will do about each — and there is a method that reliably scores.",
  outcomes: [
    "Define audit risk and its components",
    "Distinguish inherent, control and detection risk",
    "Calculate and apply materiality and performance materiality",
    "Identify risks from a scenario and describe the auditor's response",
  ],
  sections: [
    {
      id: "the-model",
      heading: "The audit risk model",
      blocks: [
        {
          kind: "definition",
          term: "Audit risk",
          md: "The risk that the auditor expresses an **inappropriate opinion** when the financial statements are materially misstated.",
        },
        {
          kind: "formula",
          name: "The model",
          expr: "Audit risk = Inherent risk × Control risk × Detection risk\nRisk of material misstatement (ROMM) = Inherent risk × Control risk",
          note: "The auditor ASSESSES inherent and control risk. Only detection risk is within the auditor's control.",
        },
        {
          kind: "table",
          caption: "The three components",
          head: ["Component", "What it is", "Examples in a scenario"],
          rows: [
            ["Inherent risk", "Susceptibility of a balance or assertion to misstatement before considering controls", "Estimates and provisions; related party transactions; a first year of trading; pressure to hit a bank covenant; complex revenue recognition"],
            ["Control risk", "The risk that internal control fails to prevent or detect a misstatement", "No segregation of duties; a new accounting system; a small finance team; management override"],
            ["Detection risk", "The risk the auditor's own procedures fail to detect a misstatement", "Sampling risk and non-sampling risk — inexperienced staff, inadequate time"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The relationship that is examined",
          md: "The auditor **cannot change** inherent or control risk — those belong to the entity. If ROMM is assessed as high, the auditor must **reduce detection risk** to keep audit risk acceptable: more work, more experienced staff, more procedures at the year end rather than at an interim visit.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Risk of fraud\" is not an audit risk",
          md: "A risk must be expressed in terms of a **misstatement in the financial statements**. Write \"inventory may be overstated because obsolete lines are not written down\" — not \"there is a risk the client is dishonest\". Vague risks earn nothing however true they are.",
        },
      ],
      check: {
        q: "The auditor assesses the risk of material misstatement over revenue as high. What is the appropriate response?",
        options: [
          "Reduce inherent risk by improving the client's controls",
          "Accept a higher detection risk to keep the audit efficient",
          "Reduce detection risk — more extensive procedures, more experienced staff, testing at the year end",
          "Increase materiality so fewer items require testing",
        ],
        correct: 2,
        explain:
          "ROMM belongs to the entity and the auditor cannot alter it. The only lever is detection risk, reduced by doing more and better work. Improving the client's controls would compromise independence, and raising materiality would increase audit risk rather than manage it.",
      },
    },
    {
      id: "materiality",
      heading: "Materiality",
      blocks: [
        {
          kind: "definition",
          term: "Material",
          md: "Information is material if omitting or misstating it could reasonably be expected to **influence the economic decisions of users** taken on the basis of the financial statements. It is a matter of both **size and nature**.",
        },
        {
          kind: "table",
          caption: "Common benchmarks",
          head: ["Benchmark", "Typical range"],
          rows: [
            ["Profit before tax", "5% – 10%"],
            ["Revenue", "½% – 1%"],
            ["Total assets", "1% – 2%"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Choose the benchmark that fits the entity",
          md: "Profit is inappropriate for a company close to break-even — a tiny profit gives an absurdly small materiality. Use revenue or assets instead, and **say why you chose it**. That justification is where the mark is, not the arithmetic.",
        },
        {
          kind: "definition",
          term: "Performance materiality",
          md: "An amount **lower** than overall materiality, set to reduce the probability that **uncorrected and undetected misstatements in aggregate** exceed materiality for the statements as a whole.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Material by NATURE, whatever the size",
          items: [
            "**Directors' remuneration** and related party transactions — specifically disclosable.",
            "A misstatement that turns a **profit into a loss**, or that breaches a **loan covenant**.",
            "Transactions that are **illegal** or indicate fraud.",
            "Items that change a key ratio users rely on.",
          ],
        },
      ],
      check: {
        q: "A company with revenue of £20m and profit before tax of £80,000 is being audited. Which benchmark is most appropriate for materiality?",
        options: [
          "Profit before tax, giving materiality of about £4,000–£8,000",
          "Revenue or total assets, because profit is close to break-even",
          "Whichever gives the highest figure",
          "Share capital",
        ],
        correct: 1,
        explain:
          "A profit-based figure here would be a few thousand pounds against £20m of revenue — unworkably low and not what would influence a user's decision. When profit is marginal or volatile, a revenue or asset benchmark is appropriate, and the justification must be stated.",
      },
    },
    {
      id: "method",
      heading: "Answering a risk question",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The structure that scores",
          items: [
            "**Quote the fact** from the scenario — a new system, a bonus scheme, an unusual movement.",
            "**Explain the risk in financial-statement terms** — which balance, which assertion, and whether it is over- or understated.",
            "**Give the auditor's response** — a specific procedure, not \"be sceptical\".",
          ],
        },
        {
          kind: "example",
          title: "One risk, done properly",
          scenario: "The directors' bonus is based on reported profit, and a new revenue recognition policy was adopted in the year.",
          steps: [
            { label: "The fact", detail: "A profit-linked bonus, plus a change of revenue policy in the same year." },
            { label: "The risk", detail: "Management has an incentive to overstate revenue; the new policy may be applied incorrectly or prematurely, so revenue and receivables may be OVERSTATED (occurrence and cut-off)." },
            { label: "The response", detail: "Review the new policy against the applicable standard; test a sample of revenue around the year end to despatch documents and contract terms; perform cut-off testing on the last and first invoices either side of the year end." },
          ],
          result:
            "Fact, misstatement, procedure. The response names a document and a direction of testing — that specificity is the difference between two marks and none.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Describing a business risk instead of an audit risk.", fix: "State the balance, the assertion and whether it is over- or understated." },
    { trap: "Saying the auditor should reduce inherent or control risk.", fix: "Those belong to the entity; only detection risk is the auditor's to change." },
    { trap: "Applying a profit benchmark to a break-even company.", fix: "Use revenue or assets, and justify the choice." },
    { trap: "Responding with \"apply professional scepticism\".", fix: "Name a procedure, a document and a direction of testing." },
  ],
  keyTerms: [
    { term: "Audit risk", def: "The risk of expressing an inappropriate opinion on materially misstated financial statements." },
    { term: "Risk of material misstatement", def: "Inherent risk multiplied by control risk — the entity's risk before the auditor acts." },
    { term: "Detection risk", def: "The risk the auditor's procedures fail to detect a misstatement; the only component the auditor controls." },
    { term: "Performance materiality", def: "An amount below overall materiality, set to reduce the risk that aggregated misstatements exceed it." },
  ],
  summary: [
    "Audit risk = inherent × control × detection; ROMM = inherent × control.",
    "The auditor controls only detection risk; high ROMM means more and better work.",
    "Materiality is size AND nature; choose a benchmark that fits and justify it.",
    "Performance materiality is lower, to guard against aggregation.",
    "Answer risks as fact → misstatement in the statements → specific procedure.",
  ],
  knowledgeDiagnostic: [
    { q: "State the audit risk model.", a: "Audit risk = inherent risk × control risk × detection risk; the first two together are the risk of material misstatement." },
    { q: "Which component can the auditor control, and how?", a: "Detection risk — by performing more extensive procedures, using more experienced staff, and testing at the year end rather than at an interim visit." },
    { q: "Give two items that are material by nature regardless of amount.", a: "Directors' remuneration and related party transactions. (Also anything turning a profit into a loss, or breaching a covenant.)" },
    { q: "What is performance materiality for?", a: "To reduce the probability that uncorrected and undetected misstatements in aggregate exceed materiality for the statements as a whole." },
  ],
  furtherStudy: ["AA-08 is how the auditor gathers the understanding that these risks are identified from."],
}

const AA_TREE_08: StudyChapter = {
  paper: "AA",
  id: "AA-08",
  number: 8,
  area: "B",
  syllabusRefs: ["B2(a)", "B4(a)", "B4(b)"],
  title: "Understanding the entity and analytical procedures",
  minutes: 15,
  intro:
    "Risks are not guessed. They come from understanding what the business does and noticing which numbers do not behave as they should.",
  outcomes: [
    "Explain why the auditor obtains an understanding of the entity",
    "Describe the aspects of the entity that ISA 315 requires to be understood",
    "Explain and apply analytical procedures at the planning stage",
    "Describe the sources of that understanding",
  ],
  sections: [
    {
      id: "understanding",
      heading: "What must be understood",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "ISA 315 — the aspects",
          items: [
            "**Industry, regulatory and other external factors**, including the applicable reporting framework.",
            "**The nature of the entity** — operations, ownership, governance, investments, structure and financing.",
            "**Accounting policies**, including any changes and whether they are appropriate.",
            "**Objectives, strategies and related business risks** that may lead to material misstatement.",
            "**Measurement and review of financial performance** — what management is judged on, and therefore pressured by.",
            "**Internal control** relevant to the audit.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why performance measures matter to an auditor",
          md: "Whatever management is measured on is where the pressure to misstate sits. A bonus on profit, a covenant on gearing, a listing condition on revenue growth — each points the auditor at a specific balance. This is how the understanding turns into a risk.",
        },
        {
          kind: "table",
          caption: "Where the understanding comes from",
          head: ["Source", "Example"],
          rows: [
            ["Enquiry", "Discussion with directors, finance staff, internal audit"],
            ["Analytical procedures", "Ratios and trends on draft figures"],
            ["Observation and inspection", "Touring the premises; reading board minutes and contracts"],
            ["Prior year files", "Last year's issues, misstatements and control deficiencies"],
            ["External information", "Industry data, regulators, press, the entity's website"],
          ],
        },
      ],
    },
    {
      id: "analytical",
      heading: "Analytical procedures",
      blocks: [
        {
          kind: "definition",
          term: "Analytical procedures",
          md: "Evaluations of financial information through analysis of **plausible relationships** among both financial and non-financial data, including investigating any fluctuation or relationship that is **inconsistent** with other information or expectations.",
        },
        {
          kind: "table",
          caption: "Where they are used",
          head: ["Stage", "Purpose", "Mandatory?"],
          rows: [
            ["Planning", "Risk assessment — identify unusual items and areas of higher risk", "Yes"],
            ["Substantive testing", "As substantive analytical procedures, to obtain evidence directly", "No — optional"],
            ["Final review", "An overall conclusion on whether the statements are consistent with the auditor's understanding", "Yes"],
          ],
        },
        {
          kind: "example",
          title: "Reading a movement",
          scenario: "Revenue rose 18% while receivables rose 61% and the gross margin fell from 42% to 33%.",
          steps: [
            { label: "Receivables against revenue", detail: "Receivables growing far faster than sales suggests collection has slowed — or revenue is overstated, perhaps by early recognition or fictitious sales." },
            { label: "Margin fall", detail: "A nine-point drop suggests cost overstatement, inventory misstatement, undisclosed discounting, or a change in mix." },
            { label: "Risk", detail: "Revenue and receivables may be overstated; the receivables allowance may be understated; inventory or cost of sales may be misstated." },
            { label: "Response", detail: "Cut-off testing around the year end; review the aged receivables listing and post year-end cash receipts; discuss the margin movement with management and corroborate the explanation." },
          ],
          result:
            "Two ratios produced three risks and four procedures. Note the last step: management's explanation is a starting point and must be **corroborated**, never accepted as evidence on its own.",
        },
      ],
      check: {
        q: "At the planning stage, what is the primary purpose of analytical procedures?",
        options: [
          "To obtain substantive evidence about account balances",
          "To identify unusual relationships and areas of higher risk",
          "To form the overall conclusion on the financial statements",
          "To test the operating effectiveness of controls",
        ],
        correct: 1,
        explain:
          "At planning they are a risk assessment procedure — directing the audit to where misstatement is more likely. They can provide substantive evidence later, and are mandatory again at the final review, but the planning purpose is risk identification.",
      },
    },
    {
      id: "understanding-to-risk",
      heading: "From understanding to a named risk",
      blocks: [
        {
          kind: "text",
          md: "Understanding the entity is not an end in itself — it exists to produce risks. Each aspect ISA 315 lists points at a **specific balance** that may be misstated, and the bridge between the two is what a Section B answer is actually being marked on.",
        },
        {
          kind: "table",
          caption: "Each aspect, and the risk it produces",
          head: ["What you learn", "The risk it points at"],
          rows: [
            ["The industry is in decline and competitors are discounting", "Inventory may be held above net realisable value; receivables may be less recoverable"],
            ["The entity adopted a new revenue policy this year", "Revenue may be recognised incorrectly or prematurely — occurrence and cut-off"],
            ["Directors are paid a bonus on reported profit", "Management bias towards overstating revenue and understating expenses and provisions"],
            ["A new accounting system went live mid-year", "Transactions may be lost or duplicated in migration — completeness and accuracy"],
            ["The entity is close to breaching a loan covenant", "Pressure to misclassify debt, or to understate liabilities and overstate assets"],
            ["A significant part of production is outsourced", "Existence and valuation of inventory held by a third party; completeness of related liabilities"],
          ],
        },
        {
          kind: "example",
          title: "One sentence of understanding, worked all the way to a procedure",
          scenario:
            "Planning notes record: \"Belvoir Co migrated to a new inventory system in month seven. The old system was switched off immediately and the migration was performed by the IT manager alone.\"",
          steps: [
            { label: "The understanding", detail: "A mid-year system change, with no parallel running and no segregation over the migration itself." },
            { label: "The risk of material misstatement", detail: "Inventory quantities and values may be incomplete or inaccurate — records could have been lost, duplicated or mis-mapped in transfer, with no second person to detect it." },
            { label: "Which assertions", detail: "Completeness and accuracy of inventory; and, because cost of sales moves with inventory, accuracy of profit." },
            { label: "The response", detail: "Obtain the migration reconciliation and agree total quantities and values immediately before and after cut-over; test a sample of items across the cut-over from old records to new; attend a count and reconcile to the new system; consider using audit software to recompute the full inventory valuation." },
          ],
          result:
            "One sentence produced a risk, two assertions and four procedures. That chain — fact, misstatement, assertion, procedure — is the same one AA-07 sets out, and this is where the raw material for it comes from.",
        },
      ],
      check: {
        q: "Planning notes state that the finance director's bonus depends on reported profit. What is the correctly expressed audit risk?",
        options: [
          "The finance director may be dishonest",
          "There is a risk of fraud at the company",
          "Management has an incentive to overstate revenue and understate provisions, so those balances may be misstated",
          "The bonus scheme is a governance deficiency",
        ],
        correct: 2,
        explain:
          "An audit risk names the balances that may be misstated and the direction. The first two are character judgements rather than risks; the fourth is a governance point, which may be true but is a different requirement.",
      },
    },
  ],
  examTraps: [
    { trap: "Accepting management's explanation for an unusual movement.", fix: "Corroborate it with independent evidence." },
    { trap: "Treating analytical procedures as optional at planning.", fix: "They are mandatory at planning and at the final review; only substantive analytical procedures are optional." },
    { trap: "Listing ratios without saying what risk they indicate.", fix: "Every ratio movement must end at a balance that may be over- or understated." },
  ],
  keyTerms: [
    { term: "Analytical procedures", def: "Evaluation of financial information by analysing plausible relationships among financial and non-financial data." },
    { term: "Business risk", def: "A risk arising from the entity's objectives and strategies that may lead to material misstatement." },
  ],
  summary: [
    "ISA 315 requires understanding of the industry, the entity, its policies, strategies, performance measures and controls.",
    "What management is measured on shows where the pressure to misstate lies.",
    "Analytical procedures are mandatory at planning and at final review.",
    "Interpret movements into specific over- or understatements.",
    "Corroborate management explanations; never rely on them alone.",
  ],
  knowledgeDiagnostic: [
    { q: "Name four aspects of an entity ISA 315 requires the auditor to understand.", a: "Industry and external factors; the nature of the entity; its accounting policies; and its objectives, strategies and related business risks. (Also performance measurement and internal control.)" },
    { q: "At which stages are analytical procedures mandatory?", a: "At the planning stage as risk assessment procedures, and at the final review stage." },
    { q: "Receivables days have risen sharply while revenue is flat. What risks does this suggest?", a: "Receivables may be overstated and the allowance for irrecoverable amounts understated; collection may have deteriorated or revenue may be misstated." },
  ],
  furtherStudy: ["AA-09 covers the specific risks of fraud and non-compliance this understanding may reveal."],
}

const AA_TREE_09: StudyChapter = {
  paper: "AA",
  id: "AA-09",
  number: 9,
  area: "B",
  syllabusRefs: ["B5(a)", "B5(b)", "B5(c)"],
  title: "Fraud, laws and regulations",
  minutes: 16,
  intro:
    "Whose job is it to find fraud, what the auditor must actually do about it, and why management override is treated as a risk in every single audit.",
  outcomes: [
    "Distinguish the responsibilities of management and of the auditor for fraud",
    "Distinguish fraudulent financial reporting from misappropriation of assets",
    "Describe the auditor's procedures in response to fraud risk",
    "Explain the auditor's responsibilities regarding laws and regulations under ISA 250",
  ],
  sections: [
    {
      id: "responsibility",
      heading: "Whose responsibility",
      blocks: [
        {
          kind: "table",
          caption: "ISA 240, split clearly",
          head: ["Management and those charged with governance", "The auditor"],
          rows: [
            ["PREVENT and DETECT fraud", "Obtain reasonable assurance that the statements as a whole are free from material misstatement, whether caused by fraud or error"],
            ["Establish a control environment and culture", "Maintain professional scepticism throughout"],
            ["Investigate suspected fraud", "Consider the risk of management override in EVERY audit"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distinction that is worth a mark every time",
          md: "The auditor is **not responsible for detecting fraud**. The responsibility is for reasonable assurance about **material misstatement**, whatever caused it. Fraud below materiality is not the auditor's to find, and this is the heart of the expectation gap.",
        },
        {
          kind: "table",
          caption: "Two kinds of fraud",
          head: ["", "Fraudulent financial reporting", "Misappropriation of assets"],
          rows: [
            ["Who", "Usually management", "Usually employees, though management can too"],
            ["What", "Deliberate misstatement to deceive users", "Theft of assets, concealed by false records"],
            ["Typical method", "Manipulating estimates, revenue cut-off, journal entries", "Fictitious suppliers, payroll ghosts, stolen inventory"],
            ["Audit significance", "More likely to be MATERIAL to the statements", "Often below materiality, though not always"],
          ],
        },
      ],
      check: {
        q: "Which statement about the auditor's responsibility for fraud is correct?",
        options: [
          "The auditor must detect all fraud within the entity",
          "The auditor must obtain reasonable assurance that the statements are free from material misstatement, whether from fraud or error",
          "The auditor is responsible for preventing fraud through recommending controls",
          "The auditor has no responsibility relating to fraud",
        ],
        correct: 1,
        explain:
          "That is ISA 240 precisely. Detection and prevention rest with management and those charged with governance; the auditor's duty is about MATERIAL MISSTATEMENT, whatever caused it — which is neither 'find all fraud' nor 'nothing to do with me'.",
      },
    },
    {
      id: "fraud-risk",
      heading: "The fraud triangle and the auditor's response",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The fraud triangle — all three tend to be present",
            data: {
              steps: [
                { label: "Incentive / pressure", sub: "targets, bonuses, covenants, personal debt" },
                { label: "Opportunity", sub: "weak controls, override ability, complex transactions" },
                { label: "Rationalisation", sub: "\"everyone does it\", \"I'll pay it back\", \"we're owed it\"" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "number",
          title: "Required procedures on management override",
          items: [
            "**Test journal entries** and other adjustments, particularly those made at or near the period end, unusual accounts, or entries by unexpected users.",
            "**Review accounting estimates for bias**, and reconsider prior-year estimates with hindsight.",
            "**Evaluate the business rationale for significant unusual transactions** — especially with related parties.",
            "**Hold a discussion among the engagement team** about where the statements may be susceptible to fraud.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Management override is presumed everywhere",
          md: "ISA 240 requires the auditor to treat it as a risk in **every audit**, however good the controls look — because management is uniquely placed to circumvent controls that operate effectively against everyone else.",
        },
        {
          kind: "text",
          md: "If fraud is **suspected**, the auditor discusses it with the appropriate level of management — **at least one level above** those involved — and with those charged with governance. Where senior management or governance is implicated, the auditor may need legal advice and may have to consider resignation. Suspected **money laundering** must be reported, and tipping off the client is an offence.",
        },
        {
          kind: "example",
          title: "The triangle applied, and the response that follows",
          scenario:
            "At Loxley Co, the warehouse manager approves goods received, updates the inventory system and authorises supplier payments under £10,000. He has worked there eleven years, was recently refused a pay rise, and eight new suppliers were added in the last quarter, all paid amounts just under £10,000.",
          steps: [
            { label: "Incentive / pressure", detail: "A refused pay rise, and a personal sense of grievance after long service." },
            { label: "Opportunity", detail: "One person controls receipt, recording AND payment — segregation of duties is absent, and the £10,000 limit is a boundary he can work beneath." },
            { label: "Rationalisation", detail: "Long service plus a perceived injustice is the classic \"I am owed this\" pattern." },
            { label: "The risk, in financial-statement terms", detail: "Purchases and payables may be overstated by payments for goods never received; cash may be misappropriated. Assertions: occurrence of purchases, existence of the related inventory." },
            { label: "Procedures", detail: "Obtain the new-supplier listing and verify each entity independently — company registry, address, bank details; agree a sample of those payments to goods received notes AND to physical inventory; analyse payments for clustering just below the authorisation limit; inspect system access rights to confirm the segregation failure." },
            { label: "If suspicion firms up", detail: "Report to a level of management ABOVE the warehouse manager and to those charged with governance. Do not confront him. Consider money laundering reporting obligations — and note that tipping off is itself an offence." },
          ],
          result:
            "All three legs of the triangle were visible in four sentences of scenario. Note the payment clustering just under the limit: authorisation thresholds create a pattern, and looking for that pattern is a procedure a marker can award.",
        },
      ],
    },
    {
      id: "laws",
      heading: "Laws and regulations (ISA 250)",
      blocks: [
        {
          kind: "table",
          caption: "Two categories, two levels of responsibility",
          head: ["Category", "Example", "Auditor's responsibility"],
          rows: [
            ["Direct effect on the determination of material amounts and disclosures", "Tax law; pension legislation; the reporting framework itself", "Obtain sufficient appropriate evidence about compliance"],
            ["Other laws, with an indirect effect but fundamental to operations", "Operating licences, environmental and health-and-safety law, data protection", "Perform specified procedures to identify non-compliance that may materially affect the statements — enquiry and inspection of correspondence"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The auditor does not audit legal compliance",
          md: "Only its effect on the financial statements. A breach of health-and-safety law matters to the auditor because of the **provision, contingent liability or disclosure** it may create — not because compliance is being audited.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "On identifying non-compliance",
          items: [
            "**Understand** the nature of the act and the circumstances.",
            "**Evaluate the effect** on the financial statements — provision, disclosure, or going concern.",
            "**Discuss** with management and, if significant, those charged with governance.",
            "**Consider whether to report** to a regulator where law or public interest requires it, and whether to withdraw.",
            "**Document** everything.",
          ],
        },
      ],
      check: {
        q: "During an audit, the team learns the client has been operating without a required environmental licence. What is the auditor's primary concern?",
        options: [
          "Reporting the client to the environmental regulator immediately",
          "Whether the breach requires a provision, a contingent liability disclosure, or affects going concern",
          "Whether the directors should resign",
          "Nothing — environmental law is outside the scope of the audit",
        ],
        correct: 1,
        explain:
          "The auditor's concern is the effect on the FINANCIAL STATEMENTS — fines, remediation costs, disclosure, or a threat to the entity's continued operation. Regulatory reporting may follow, but the primary audit question is the accounting consequence.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying the auditor is responsible for detecting fraud.", fix: "Reasonable assurance about MATERIAL misstatement, whether from fraud or error." },
    { trap: "Omitting management override when listing fraud risks.", fix: "ISA 240 presumes it in every audit; journals and estimates must be tested." },
    { trap: "Treating a legal breach as a compliance issue only.", fix: "The auditor's interest is the provision, disclosure or going-concern effect." },
  ],
  keyTerms: [
    { term: "Fraudulent financial reporting", def: "Deliberate misstatement of the financial statements to deceive users." },
    { term: "Misappropriation of assets", def: "Theft of an entity's assets, usually concealed by falsified records." },
    { term: "Management override", def: "Management circumventing controls that otherwise operate effectively; presumed a risk in every audit." },
    { term: "Professional scepticism", def: "A questioning mind, alert to conditions indicating possible misstatement, and a critical assessment of evidence." },
  ],
  summary: [
    "Management prevents and detects fraud; the auditor obtains reasonable assurance about material misstatement.",
    "Fraudulent financial reporting is usually management; misappropriation is usually employees.",
    "Incentive, opportunity and rationalisation make up the fraud triangle.",
    "Management override is a presumed risk everywhere: test journals and estimates.",
    "Under ISA 250 the auditor's interest in legal breaches is their financial-statement effect.",
  ],
  knowledgeDiagnostic: [
    { q: "State the auditor's responsibility regarding fraud.", a: "To obtain reasonable assurance that the financial statements as a whole are free from material misstatement, whether caused by fraud or error — not to detect all fraud." },
    { q: "Name the three elements of the fraud triangle.", a: "Incentive or pressure, opportunity, and rationalisation." },
    { q: "Name two procedures ISA 240 requires in response to management override.", a: "Testing journal entries and adjustments, especially near the period end; and reviewing accounting estimates for bias, including revisiting prior-year estimates." },
    { q: "How do the auditor's responsibilities differ between the two categories of law under ISA 250?", a: "For laws with a direct effect on material amounts, obtain sufficient appropriate evidence of compliance; for other laws, perform specified procedures — enquiry and inspection of correspondence — to identify non-compliance that may materially affect the statements." },
  ],
  furtherStudy: ["AA-10 turns all of this into a documented plan."],
}

const AA_TREE_10: StudyChapter = {
  paper: "AA",
  id: "AA-10",
  number: 10,
  area: "B",
  syllabusRefs: ["B6(a)", "B6(b)", "B6(c)"],
  title: "Audit strategy, planning and documentation",
  minutes: 15,
  intro:
    "The strategy sets the direction, the plan sets the procedures, and the file has to convince someone who was never there.",
  outcomes: [
    "Distinguish the audit strategy from the audit plan",
    "Explain the benefits of planning an audit",
    "Distinguish interim from final audit work",
    "State the purpose, contents and retention of audit documentation",
  ],
  sections: [
    {
      id: "strategy-plan",
      heading: "Strategy and plan",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two documents, two levels",
            data: {
              leftTitle: "Audit strategy",
              rightTitle: "Audit plan",
              rows: [
                { aspect: "Level", left: "Overall — scope, timing and direction", right: "Detailed — the procedures themselves" },
                { aspect: "Contains", left: "Characteristics of the engagement, reporting objectives, materiality, resources", right: "Nature, timing and extent of risk assessment and further audit procedures" },
                { aspect: "Set by", left: "The engagement partner, early", right: "The team, developed from the strategy" },
                { aspect: "Changes", left: "Rarely, if circumstances change", right: "Continuously, as evidence emerges" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "bullet",
          title: "Why planning matters",
          items: [
            "Directs **attention to the areas of highest risk**, so effort follows exposure.",
            "Ensures the engagement is **staffed and timed** appropriately, with specialists where needed.",
            "Helps **identify problems early**, when there is still time to resolve them.",
            "Enables proper **direction, supervision and review** of the team.",
            "Assists **coordination** with internal audit, component auditors and experts.",
          ],
        },
        {
          kind: "table",
          caption: "Interim and final audit",
          head: ["Interim", "Final"],
          rows: [
            ["Performed during the accounting period", "Performed after the period end"],
            ["Mainly documenting systems and TESTS OF CONTROL", "Mainly SUBSTANTIVE procedures on year-end balances"],
            ["Spreads the workload; problems surface earlier", "Concludes the audit and supports the opinion"],
            ["Some substantive work on transactions to date", "Includes subsequent events, going concern, representations"],
          ],
        },
      ],
      check: {
        q: "Which belongs in the audit STRATEGY rather than the audit plan?",
        options: [
          "The sample size for testing purchases",
          "The overall materiality level and the resources to be deployed",
          "The specific cut-off procedures on revenue",
          "The list of receivables to be circularised",
        ],
        correct: 1,
        explain:
          "The strategy sets scope, timing, direction, materiality and resourcing. Sample sizes, specific procedures and item selections are the detail of the plan, which develops from the strategy.",
      },
    },
    {
      id: "documentation",
      heading: "Documentation (ISA 230)",
      blocks: [
        {
          kind: "definition",
          term: "The sufficiency test",
          md: "Documentation must be sufficient for an **experienced auditor with no previous connection to the audit** to understand the nature, timing and extent of the procedures performed, the results and evidence obtained, and the significant matters and conclusions reached.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What a working paper records",
          items: [
            "The **objective** of the test and the **source** of the data.",
            "The **procedure performed**, the population and how the sample was selected.",
            "The **results**, including exceptions found.",
            "The **conclusion** reached against the objective.",
            "**Preparer and reviewer**, with dates.",
          ],
        },
        {
          kind: "table",
          caption: "Timing and retention",
          head: ["Requirement", "Rule"],
          rows: [
            ["Assembling the final audit file", "Ordinarily no more than 60 days after the date of the auditor's report"],
            ["Retention", "Ordinarily no less than five years from the date of the auditor's report"],
            ["Changes after assembly", "Permitted only with a record of what was changed, by whom, when and why"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Checked — satisfactory\" is not documentation",
          md: "It records neither what was checked, against what, nor what would have counted as unsatisfactory. If a file could not be defended to a regulator or in court, the work is treated as not having been done.",
        },
      ],
      check: {
        q: "What is the ISA 230 standard for the adequacy of audit documentation?",
        options: [
          "The engagement partner can follow it",
          "An experienced auditor with no previous connection to the audit can understand the work, results and conclusions",
          "It complies with the firm's house style",
          "The client can understand what was tested",
        ],
        correct: 1,
        explain:
          "The benchmark is deliberately an outsider — someone with audit experience but no knowledge of this engagement. It is what makes the file reviewable by a regulator, a court or a successor firm.",
      },
    },
    {
      id: "direction-review",
      heading: "Direction, supervision and review",
      blocks: [
        {
          kind: "text",
          md: "A plan is executed by a team, most of it junior. The engagement partner remains responsible for the opinion, so ISAs require the work to be **directed, supervised and reviewed** in proportion to the risk and the experience of whoever performed it.",
        },
        {
          kind: "table",
          caption: "What each one means in practice",
          head: ["", "What it involves"],
          rows: [
            ["Direction", "Briefing the team on the entity, the risks, their specific responsibilities, and where to escalate"],
            ["Supervision", "Tracking progress, being available for questions, and addressing significant matters as they arise rather than at the end"],
            ["Review", "Considering whether the work was performed to standard, whether the evidence supports the conclusions, and whether anything needs further work"],
          ],
        },
        {
          kind: "example",
          title: "The same working paper, before and after review",
          scenario: "A first-year trainee documents the receivables circularisation on Renwick Co.",
          steps: [
            { label: "What was written", detail: "\"Circularised receivables. 12 letters sent, 9 replies received, all agreed. 3 no replies. Balance appears reasonable. Conclusion: receivables are fairly stated.\"" },
            { label: "Review point 1 — the population", detail: "No total receivables balance, no coverage figure. Twelve letters out of how many, covering what proportion by value? Without that the sample means nothing." },
            { label: "Review point 2 — selection", detail: "How were the twelve chosen? Were old, credit and nil balances included, as AA-17 requires? A sample of the twelve largest tests existence and says nothing about completeness." },
            { label: "Review point 3 — the three non-replies", detail: "\"3 no replies\" is not a result, it is an open item. What alternative procedures were performed — after-date cash, agreement to despatch documents? Left as written, £X of the balance is unsupported." },
            { label: "Review point 4 — the conclusion", detail: "\"Appears reasonable\" is not a conclusion against an objective. The objective was existence and valuation of receivables; the conclusion must address those." },
          ],
          result:
            "Four review points on four lines of work. The trainee may well have done the procedures correctly — but the file as written could not be defended, and under ISA 230 work that cannot be evidenced is treated as work not done. That is what review exists to catch, before the file is closed rather than after.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Review is proportionate, not uniform",
          md: "More experienced staff and lower-risk areas need less; a first-year trainee on a significant risk needs the work re-performed in part. For a listed client an **engagement quality review** is required in addition, before the report is signed.",
        },
      ],
      check: {
        q: "A trainee's working paper concludes \"balance appears reasonable\". Why is this inadequate?",
        options: [
          "It is too informal in tone",
          "It does not conclude against the stated objective, so a reviewer cannot tell whether the assertions were satisfied",
          "It should have been signed by the partner",
          "Conclusions must always be positive",
        ],
        correct: 1,
        explain:
          "A conclusion has to answer the objective the paper set out — here existence and valuation of receivables. \"Appears reasonable\" answers nothing, so a reviewer cannot judge whether the evidence supports it, which is exactly the ISA 230 test.",
      },
    },
  ],
  examTraps: [
    { trap: "Confusing the strategy with the plan.", fix: "Strategy is scope, timing, direction and resources; the plan is the procedures." },
    { trap: "Saying interim work is substantive testing of year-end balances.", fix: "Interim is mainly systems documentation and tests of control." },
    { trap: "Documenting a conclusion without the procedure.", fix: "Objective, source, procedure, result, conclusion, preparer and reviewer." },
  ],
  keyTerms: [
    { term: "Audit strategy", def: "The overall scope, timing and direction of the audit, setting materiality and resources." },
    { term: "Audit plan", def: "The detailed nature, timing and extent of the procedures to be performed." },
    { term: "Interim audit", def: "Work performed during the accounting period, mainly on systems and controls." },
    { term: "Audit file assembly", def: "Completing the final file, ordinarily within 60 days of the auditor's report." },
  ],
  summary: [
    "The strategy sets scope, timing, direction, materiality and resources; the plan sets procedures.",
    "Planning directs effort to risk, enables staffing and supervision, and surfaces problems early.",
    "Interim work is mainly controls; final work is mainly substantive.",
    "Documentation must satisfy an experienced auditor with no prior connection.",
    "Assemble the file within about 60 days; retain it for at least five years.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish the audit strategy from the audit plan.", a: "The strategy sets the overall scope, timing, direction, materiality and resources; the plan sets the nature, timing and extent of the actual procedures." },
    { q: "What work is typically performed at an interim audit?", a: "Documenting and evaluating systems, and performing tests of control, plus some substantive testing of transactions to date." },
    { q: "State the ISA 230 sufficiency test for documentation.", a: "It must enable an experienced auditor with no previous connection to the audit to understand the procedures, results, evidence and conclusions." },
    { q: "How long should audit files be retained?", a: "Ordinarily at least five years from the date of the auditor's report, with the final file assembled within about 60 days." },
  ],
  furtherStudy: ["Area C covers the internal control work that the interim audit largely consists of."],
}

export const AA_TREE_AREA_B: StudyChapter[] = [AA_TREE_06, AA_TREE_07, AA_TREE_08, AA_TREE_09, AA_TREE_10]
