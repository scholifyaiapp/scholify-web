/*
 * FA Areas A, B and C — the context and purpose of financial reporting, the
 * qualitative characteristics, and the use of double entry.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * FA sets 35 objective tests at 2 marks and 2 multi-task questions at 15 marks,
 * and its Section B is accounts preparation and consolidation — so the 15-mark
 * format appears only in Areas G and H. Everything here is a 2-mark OT.
 *
 * FA's distractors have a signature of their own: the DOUBLE ENTRY REVERSED. For
 * almost every transaction question, one option is the correct entry with debit
 * and credit the wrong way round, which is why these plans work out the effect on
 * the accounting equation before touching the option list.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FA_PLANS_ABC: ExamPlanMap = {
  /* ── FA-01 · Business entities and the purpose of reporting ──── */

  "FA-01::what-reporting-is": {
    title: "What the financial statements are for",
    format: "ot",
    marks: 2,
    requirement:
      "The primary purpose of general purpose financial statements is to:\n\nA  Calculate the entity's tax liability\nB  Provide information useful to existing and potential investors, lenders and other creditors in making decisions\nC  Show that the directors have complied with the law\nD  Value the entity for sale",
    plan: [
      {
        step: "Recall the objective as the Framework states it",
        detail:
          "To provide financial information about the reporting entity that is useful to existing and potential investors, lenders and other creditors in making decisions about providing resources to it. Decision-usefulness is the whole objective.",
      },
      {
        step: "Note who the objective names and who it does not",
        detail:
          "Investors, lenders and other creditors are the primary users. Tax authorities, employees and the public may use the statements, but the objective is not written for them.",
      },
      {
        step: "Reject the three by-products",
        detail:
          "Tax is computed by adjusting accounting profit under separate tax rules. Compliance is a legal consequence rather than the purpose. And the statements do not value the entity — market value differs from carrying amount for many reasons.",
      },
      {
        step: "Be ready for the valuation follow-on",
        detail:
          "Why the statements do not value the entity is examined directly: assets are largely at historical cost, internally generated goodwill and brands are unrecognised, and staff and reputation appear nowhere.",
      },
    ],
    answer:
      "**B — provide information useful to existing and potential investors, lenders and other creditors in making decisions.**\n\nThat is the objective in the Framework's own terms, and **decision-usefulness** is the whole of it. Those three groups are the **primary users** because they provide resources and cannot demand information directly.\n\nTax is computed by adjusting accounting profit under separate rules. Compliance is a consequence, not a purpose.\n\nD is the most instructive wrong answer: the statements do **not** value the entity. Most assets are carried at historical cost, internally generated goodwill and brands are not recognised at all, and the workforce and customer relationships appear nowhere — which is why a listed company's market capitalisation rarely resembles its net assets.",
    earns: ["Naming the three primary users, and being able to say why they are primary"],
    loses: ["Choosing valuation, which is the misconception the syllabus opens by correcting"],
  },

  "FA-01::entity-types": {
    title: "What separate legal personality changes about the accounts",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following applies to a **company** but not to a sole trader?\n\nA  The business entity concept applies to its accounting records\nB  Its owners have limited liability for the entity's debts\nC  It must record transactions using double entry\nD  It prepares a statement of profit or loss",
    plan: [
      {
        step: "Separate the accounting rules from the legal form",
        detail:
          "Double entry, the business entity concept and the primary statements apply to every entity that keeps accounts. Legal form changes the owners' exposure and the reporting obligations, not the bookkeeping.",
      },
      {
        step: "Test each option for universality",
        detail:
          "A, C and D are true of a sole trader as well. The business entity concept in particular is most important for a sole trader, because that is where personal and business transactions actually mix.",
      },
      {
        step: "Confirm the survivor follows from separate legal personality",
        detail:
          "A company is its own legal person, so its debts are its own; the members' exposure is capped at the amount unpaid on their shares. A sole trader is personally liable without limit.",
      },
      {
        step: "Note the reporting consequence, since it is the follow-on",
        detail:
          "Because outsiders bear the risk of limited liability, companies face regulation sole traders do not: statutory formats, filing, audit above a size threshold, and accounting standards.",
      },
    ],
    answer:
      "**B — its owners have limited liability for the entity's debts.**\n\nA company has **separate legal personality**: it owns its assets, owes its own debts, and can sue and be sued in its own name. Its members' exposure is capped at the amount unpaid on their shares. A sole trader is personally liable without limit.\n\nOptions A, C and D are true of both. The **business entity concept** — that the business is accounted for separately from its owner — is arguably most important for a sole trader, since that is where personal and business transactions genuinely mix, and it is what makes drawings a reduction in capital rather than an expense.\n\nThe reporting consequence follows: because outsiders bear the risk of limited liability, companies face statutory formats, filing, audit above a threshold and accounting standards.",
    earns: ["Separating what accounting requires from what legal form determines"],
    loses: ["Assuming the business entity concept applies only where a separate legal entity exists"],
  },

  "FA-01::users": {
    title: "Matching a user to the information they need",
    format: "ot",
    marks: 2,
    requirement:
      "A bank is considering a five-year loan to a company. Which is the bank's **primary** interest in the financial statements?\n\nA  The dividend per share\nB  The entity's ability to meet interest and repayments, and the assets available as security\nC  The directors' remuneration\nD  The rate of corporation tax paid",
    plan: [
      {
        step: "Write each user's question in one line",
        detail:
          "Shareholders: what return will I get? Lenders: will I be repaid, and what security is there? Suppliers: will I be paid on time? Employees: is my job secure? Government: how much tax is due?",
      },
      {
        step: "Read the stem for the user's position",
        detail:
          "A bank lending over five years is a long-term lender. Its exposure is the loan, so its question is repayment capacity and security — not return on equity.",
      },
      {
        step: "Name the specific figures the lender reads",
        detail:
          "Interest cover, gearing, cash generated from operations and the non-current assets available to secure the debt. Being able to name them is what separates a full answer from a vague one.",
      },
      {
        step: "Reject the options belonging to other users",
        detail:
          "Dividend per share is the shareholder's figure. Directors' remuneration interests shareholders and the public. The tax rate concerns the tax authority.",
      },
    ],
    answer:
      "**B — the entity's ability to meet interest and repayments, and the assets available as security.**\n\nA long-term lender's exposure is the loan, so its question is capacity to service and repay it. The figures it reads are **interest cover**, **gearing**, **cash generated from operations** and the non-current assets available as security.\n\nDividend per share is the shareholder's figure — and a lender may actively prefer dividends to be *lower*, since cash retained in the business improves its own security. That opposition of interest is worth noticing: it is why a single set of statements has to serve users who want different things.\n\nDirectors' remuneration and the tax rate belong to other users entirely.",
    earns: [
      "Naming the specific ratios the lender would look at",
      "Noticing that the lender's interest can oppose the shareholder's",
    ],
    loses: ["Answering with a shareholder's figure for a lender's question"],
  },

  /* ── FA-02 · The elements and the principal statements ───────── */

  "FA-02::the-elements": {
    title: "Applying the definition of an asset",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following meets the definition of an **asset**?\n\nA  A skilled and loyal workforce\nB  A machine held under a lease that the entity controls and uses in production\nC  An order received from a customer for delivery next month\nD  An intention to purchase new equipment next year",
    plan: [
      {
        step: "State the definition in its three parts",
        detail:
          "A present economic resource controlled by the entity as a result of past events, where the resource is a right with the potential to produce economic benefits. Present, controlled, and arising from a past event.",
      },
      {
        step: "Apply the CONTROL test, which is what the question turns on",
        detail:
          "Control, not legal ownership, is the test. A leased machine the entity directs the use of is an asset even though the entity does not own it — and that is the point being examined.",
      },
      {
        step: "Reject the two that fail on control or on a past event",
        detail:
          "A workforce cannot be controlled — staff can leave. An intention is a future event with no past transaction, so nothing has yet happened to recognise.",
      },
      {
        step: "Reject the order carefully",
        detail:
          "A customer order is a future benefit but no past event has occurred — nothing has been delivered and no right yet exists. It is the option candidates most often accept.",
      },
    ],
    answer:
      "**B — a machine held under a lease that the entity controls and uses in production.**\n\nAn asset is a present economic resource **controlled** by the entity as a result of **past events**. Control rather than legal ownership is the test, which is why a leased asset the entity directs the use of qualifies.\n\nA **workforce** fails on control — however valuable, staff can resign, and this is the classic illustration of why the most valuable thing about a business may not be on its statement of financial position. An **intention** fails on the past event. A **customer order** also fails on the past event: nothing has been delivered and no right yet exists.\n\nThe five elements are asset, liability, equity, income and expense, with equity being the residual — assets less liabilities.",
    earns: [
      "Applying control rather than ownership",
      "Rejecting the customer order on the past-event limb rather than on the benefit limb",
    ],
    loses: ["Accepting an intention or an order because both promise future benefit"],
  },

  "FA-02::the-statements": {
    title: "Which statement answers which question",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement shows the entity's financial performance over a period, rather than its position at a point in time?\n\nA  The statement of financial position\nB  The statement of profit or loss\nC  The notes to the financial statements\nD  The asset register",
    plan: [
      {
        step: "Sort the statements by period or point",
        detail:
          "POSITION at a point: the statement of financial position. PERFORMANCE over a period: the statement of profit or loss and other comprehensive income, the statement of cash flows, and the statement of changes in equity.",
      },
      {
        step: "Read the stem for which of the two it asks about",
        detail:
          "Performance over a period, so the answer must be one of the three period statements. The statement of financial position is ruled out by its own nature.",
      },
      {
        step: "Rule out the option that is not a statement",
        detail:
          "The asset register is an internal record, not part of the financial statements. The notes are part of them but explain the others rather than reporting performance themselves.",
      },
      {
        step: "Be able to say what each period statement adds",
        detail:
          "Profit or loss reports performance on the accruals basis; cash flows reports the same period in cash; changes in equity reconciles opening to closing equity. Three views of one period.",
      },
    ],
    answer:
      "**B — the statement of profit or loss.**\n\nThe split is between **position at a point** and **performance over a period**. The statement of financial position is a snapshot at the reporting date. The statement of profit or loss and other comprehensive income, the statement of cash flows and the statement of changes in equity all cover a period.\n\nEach period statement offers a different view of the same period: profit or loss reports performance on the **accruals** basis, cash flows reports it in **cash**, and changes in equity reconciles opening equity to closing equity including transactions with owners.\n\nThe **notes** are part of the financial statements and explain the primary statements. The **asset register** is an internal record and not part of them at all.",
    earns: ["Sorting on period versus point of time before reading the options"],
    loses: ["Treating the asset register as one of the financial statements"],
  },

  "FA-02::how-they-link": {
    title: "How profit reaches the statement of financial position",
    format: "ot",
    marks: 2,
    requirement:
      "A company makes a profit of $80,000 and pays dividends of $30,000 during the year. Ignoring other transactions, equity will:\n\nA  Increase by $80,000\nB  Increase by $50,000\nC  Increase by $110,000\nD  Be unchanged",
    plan: [
      {
        step: "Trace the route profit takes",
        detail:
          "Profit for the year increases retained earnings, which is a component of equity. Dividends are a distribution to owners and reduce retained earnings. Both move through equity.",
      },
      {
        step: "Net the two movements",
        detail:
          "$80,000 profit − $30,000 dividends = **$50,000 increase**. This is precisely the reconciliation the statement of changes in equity performs.",
      },
      {
        step: "Confirm dividends are not an expense",
        detail:
          "A dividend is a distribution of profit, not a cost of earning it, so it never appears in the statement of profit or loss. Option A is the answer of anyone who treated it as one and then forgot to deduct it.",
      },
      {
        step: "Check option C for its error",
        detail:
          "$110,000 adds the dividend instead of deducting it. A distribution to owners can only reduce what belongs to them, so the direction check disposes of it.",
      },
    ],
    answer:
      "**B — increase by $50,000.**\n\nProfit increases **retained earnings**, a component of equity; dividends reduce it. Net movement = $80,000 − $30,000 = **$50,000**.\n\nThis is exactly what the **statement of changes in equity** reports: opening equity, plus total comprehensive income, less distributions to owners, giving closing equity.\n\nA dividend is a **distribution** of profit and not an expense of earning it, so it never appears in the statement of profit or loss — option A is the answer of anyone who put it there and so left it out of equity. Option C adds it, which a distribution to owners cannot do.",
    earns: ["Knowing dividends bypass profit or loss and go straight to equity"],
    loses: ["Treating a dividend as an expense, or adding it to equity"],
  },

  /* ── FA-03 · The regulatory framework and governance ─────────── */

  "FA-03::why-regulate": {
    title: "The case for regulating financial reporting",
    format: "ot",
    marks: 2,
    requirement:
      "The principal argument for regulating financial reporting is that:\n\nA  It reduces the cost of preparing financial statements\nB  Users cannot verify the statements themselves, and preparers have an interest in how they appear\nC  It guarantees the statements contain no errors\nD  It prevents entities from making losses",
    plan: [
      {
        step: "Identify the information asymmetry",
        detail:
          "Preparers know the entity and users do not. Users cannot verify what they are given, and the people who prepared it have an interest in how it looks. Regulation exists to close that gap.",
      },
      {
        step: "Name what regulation delivers",
        detail:
          "Comparability between entities and across years, and a minimum standard of reliability. Without them, statements could not support the decisions they are prepared for.",
      },
      {
        step: "Reject the two absolutes",
        detail:
          "Regulation cannot guarantee freedom from error — judgement and estimation are unavoidable — and no rule can prevent a loss, only require it to be reported properly.",
      },
      {
        step: "Note that regulation raises cost",
        detail:
          "Option A inverts the trade-off. Compliance is expensive, which is the standard argument against regulation and why differential reporting exists for smaller entities.",
      },
    ],
    answer:
      "**B — users cannot verify the statements themselves, and preparers have an interest in how they appear.**\n\nThat information asymmetry is the whole case. Regulation makes reliance reasonable by requiring like transactions to be treated alike, which delivers **comparability** between entities and across years, and a minimum standard of **reliability**.\n\nOption A inverts the trade-off: compliance is expensive, which is the main argument against regulation and the reason differential reporting exists for smaller entities.\n\nC and D are absolutes. Judgement and estimation are unavoidable, so error cannot be eliminated; and no reporting rule prevents a loss — only its concealment.",
    earns: ["Naming the asymmetry rather than describing regulation's outputs"],
    loses: ["Choosing an option promising certainty, which no framework can deliver"],
  },

  "FA-03::who-sets-the-rules": {
    title: "Which body plays which role in standard-setting",
    format: "ot",
    marks: 2,
    requirement:
      "Which body has responsibility for issuing International Financial Reporting Standards?\n\nA  The IFRS Foundation\nB  The International Accounting Standards Board\nC  The IFRS Interpretations Committee\nD  The IFRS Advisory Council",
    plan: [
      {
        step: "Set out the structure with one role each",
        detail:
          "IFRS Foundation: oversight and governance, appoints and funds. IASB: develops and issues standards. IFRS Interpretations Committee: issues interpretations on application. IFRS Advisory Council: advises on agenda and priorities.",
      },
      {
        step: "Read the stem for the specific verb",
        detail:
          "\"Issuing standards\" is the IASB's function and no one else's. Every other body in the list has a real role, and none of them writes standards.",
      },
      {
        step: "Guard the Foundation/Board boundary",
        detail:
          "The Foundation is the most attractive distractor because its name contains \"IFRS\". It oversees; the Board writes. That single distinction is what the question is testing.",
      },
      {
        step: "Note what the Interpretations Committee actually produces",
        detail:
          "Interpretations addressing how an existing standard applies to a specific situation. It does not create new standards, and its output supplements rather than replaces them.",
      },
    ],
    answer:
      "**B — the International Accounting Standards Board.**\n\nThe **IASB** develops and issues IFRS. The **IFRS Foundation** is its oversight body — it appoints Board members, governs the process and secures funding, but writes nothing. The **IFRS Interpretations Committee** issues interpretations on how an existing standard applies to a particular situation. The **IFRS Advisory Council** advises on the agenda and on priorities.\n\nThe Foundation is the strongest distractor because its name carries \"IFRS\", and separating oversight from standard-setting is the whole question.\n\nNational regulators and company law then **adopt** IFRS and decide which entities must apply them — adoption is not issue.",
    earns: ["Keeping oversight, standard-setting, interpretation and advice as four distinct roles"],
    loses: ["Choosing the Foundation because its name contains the standards' name"],
  },

  "FA-03::governance": {
    title: "Whose responsibility the financial statements are",
    format: "ot",
    marks: 2,
    requirement:
      "Responsibility for the preparation of a company's financial statements rests with:\n\nA  The external auditor\nB  The directors\nC  The shareholders\nD  The accounting standard-setter",
    plan: [
      {
        step: "Distinguish preparing from reporting on",
        detail:
          "Directors PREPARE the statements. The auditor REPORTS an opinion on them. Confusing the two is the most common misconception in this part of the syllabus.",
      },
      {
        step: "Name what the directors' responsibility includes",
        detail:
          "Keeping proper accounting records, selecting suitable accounting policies, making reasonable judgements and estimates, preparing on a going concern basis where appropriate, and safeguarding assets.",
      },
      {
        step: "Place the shareholders correctly",
        detail:
          "They appoint the directors and the auditor and receive the statements. They do not prepare them — that is the separation of ownership from control operating exactly as intended.",
      },
      {
        step: "See why the answer matters",
        detail:
          "If the auditor prepared the statements they could not independently report on them. Preparation and audit must sit with different parties for the opinion to mean anything.",
      },
    ],
    answer:
      "**B — the directors.**\n\nDirectors **prepare** the financial statements; the auditor **reports an opinion** on them. That separation is not administrative — if the auditor prepared the statements they could not independently report on them, and the opinion would be worthless.\n\nThe directors' responsibility covers keeping proper accounting records, selecting suitable accounting policies, making reasonable judgements and estimates, preparing on a going concern basis where appropriate, and safeguarding the entity's assets.\n\nShareholders appoint the directors and the auditor and receive the statements; the standard-setter writes the rules the directors apply.\n\nThe same principle governs fraud: prevention and detection is the directors' responsibility, not the auditor's.",
    earns: ["Separating preparation from audit, and saying why the separation is necessary"],
    loses: ["Naming the auditor, which is the most widespread public misconception on this topic"],
  },

  "FA-03::how-a-standard-is-made": {
    title: "The stages of the standard-setting process",
    format: "ot",
    marks: 2,
    requirement:
      "In the IASB's standard-setting process, the document issued to seek public comment on the Board's proposals for a new standard is:\n\nA  A discussion paper\nB  An exposure draft\nC  An interpretation\nD  The Conceptual Framework",
    plan: [
      {
        step: "Set the stages in order",
        detail:
          "Agenda consultation → research, often a discussion paper → **exposure draft** → consideration of comments → issue of the standard → post-implementation review.",
      },
      {
        step: "Split the two consultation documents",
        detail:
          "A discussion paper comes earlier and canvasses the issue broadly, before proposals are settled. An exposure draft sets out the Board's actual proposed wording for comment.",
      },
      {
        step: "Match the stem's description",
        detail:
          "\"The Board's proposals for a new standard\" means proposals exist, which places it at the exposure draft stage rather than at exploratory discussion.",
      },
      {
        step: "Rule out the two that are not consultation documents",
        detail:
          "An interpretation addresses application of an existing standard. The Conceptual Framework underpins standard-setting generally and is not a consultation on any particular standard.",
      },
    ],
    answer:
      "**B — an exposure draft.**\n\nThe process runs: agenda consultation → research, often producing a **discussion paper** → **exposure draft** → consideration of the comments received → issue of the standard → post-implementation review.\n\nThe two consultation documents differ in stage. A discussion paper canvasses the issue broadly before proposals are settled; an exposure draft sets out the Board's **actual proposed wording** for comment. The stem's phrase \"the Board's proposals\" places it at the second.\n\nAn **interpretation** addresses how an existing standard applies to a particular situation. The **Conceptual Framework** underpins standard-setting as a whole rather than consulting on any one standard.\n\nThe openness of the process — due process and public consultation — is what gives the standards their legitimacy.",
    earns: ["Splitting discussion paper from exposure draft on whether proposals exist yet"],
    loses: ["Treating any consultation document as an exposure draft"],
  },

  /* ── FA-04 · Accounting principles and concepts ──────────────── */

  "FA-04::going-concern-accruals": {
    title: "What the going concern assumption changes",
    format: "ot",
    marks: 2,
    requirement:
      "If an entity is no longer a going concern, the most likely effect on its financial statements is that:\n\nA  No financial statements need be prepared\nB  Assets are measured at their expected realisable amounts rather than on a going concern basis\nC  Only the statement of cash flows is prepared\nD  Depreciation is charged at a higher rate but nothing else changes",
    plan: [
      {
        step: "State what the assumption assumes",
        detail:
          "That the entity will continue in operation for the foreseeable future. Every measurement in the statements rests on it — assets are carried at amounts recoverable through continued use rather than through forced sale.",
      },
      {
        step: "Work out what breaking it does",
        detail:
          "If the entity will not continue, assets must be measured at what they would actually realise, which is generally much less, and liabilities may fall due immediately. The whole basis of preparation changes.",
      },
      {
        step: "Reject the two that abandon reporting",
        detail:
          "Statements are still required — arguably more urgently, since users need to know. A and C both assume the obligation disappears, which it does not.",
      },
      {
        step: "Reject the option that understates the change",
        detail:
          "D treats it as a depreciation adjustment. It is a change in the entire basis of preparation, which must also be disclosed prominently.",
      },
    ],
    answer:
      "**B — assets are measured at their expected realisable amounts rather than on a going concern basis.**\n\nGoing concern assumes the entity will continue in operation for the foreseeable future, and every measurement rests on it: assets are carried at amounts recoverable through continued **use**. If the entity will not continue, they must be measured at what they would actually **realise**, which is generally far less — specialised plant may be worth little more than scrap — and liabilities may fall due at once.\n\nStatements are still required, arguably more urgently, so A and C are wrong. D understates the change: this is a change in the entire **basis of preparation** and must be disclosed prominently.\n\nGoing concern and **accruals** are the two assumptions the Framework names, and accruals is why profit differs from cash.",
    earns: ["Describing it as a change in the basis of preparation, not one adjustment"],
    loses: ["Assuming the reporting obligation falls away when the entity is failing"],
  },

  "FA-04::the-eight": {
    title: "Naming the concept a treatment depends on",
    format: "ot",
    marks: 2,
    requirement:
      "A sole trader takes goods from inventory for personal use, and the transaction is recorded as drawings. The concept applied is:\n\nA  Accruals\nB  The business entity concept\nC  Prudence\nD  Materiality",
    plan: [
      {
        step: "Identify what the treatment achieves",
        detail:
          "It keeps the owner's personal consumption out of the business's expenses, recording it instead as a withdrawal of the owner's own capital.",
      },
      {
        step: "Match to the concept that requires that separation",
        detail:
          "The business entity concept: the business is accounted for as an entity separate from its owner, whatever the legal position. That is why the goods become drawings rather than cost of sales.",
      },
      {
        step: "Test the alternatives against the facts",
        detail:
          "Accruals concerns when income and expense are recognised. Prudence concerns caution in judgement. Materiality concerns whether an item is significant enough to affect a decision. None describes owner separation.",
      },
      {
        step: "Note why the treatment matters commercially",
        detail:
          "Charging the goods as an expense would understate profit and overstate cost of sales, making the business look less profitable than it is — and misleading anyone assessing its performance.",
      },
    ],
    answer:
      "**B — the business entity concept.**\n\nThe business is accounted for as an entity separate from its owner, regardless of the legal position. So the owner's personal consumption is not a business expense — it is a withdrawal of the owner's own capital, recorded as **drawings**.\n\nThe entries are debit drawings, credit inventory or purchases: equity falls, assets fall, and profit is unaffected.\n\nCharging the goods to cost of sales instead would understate profit and overstate cost of sales, making the business look less profitable than it is — which matters to anyone assessing its performance or lending to it.\n\nAccruals concerns timing of recognition, prudence concerns caution in judgement, and materiality concerns significance.",
    earns: [
      "Naming the concept and stating the entries it produces",
      "Saying what the wrong treatment would do to reported profit",
    ],
    loses: ["Reaching for prudence, which is the default answer for any concept question"],
  },

  "FA-04::principles-in-conflict": {
    title: "Resolving two principles that point different ways",
    format: "ot",
    marks: 2,
    requirement:
      "An item of expenditure is too small to affect any user's decision, but strict application of the accruals concept would require it to be apportioned between two years. It is charged in full to the current year. This is justified by:\n\nA  Prudence\nB  Materiality\nC  Consistency\nD  The going concern assumption",
    plan: [
      {
        step: "Identify the two principles in tension",
        detail:
          "Accruals would require apportionment. Something is overriding it, so the answer is whichever concept permits a departure where the effect is too small to matter.",
      },
      {
        step: "Recall what materiality does",
        detail:
          "Information is material if omitting or misstating it could influence a user's decision. Immaterial items need not be treated with full technical precision, because the effort buys nothing.",
      },
      {
        step: "Confirm the stem supplies the materiality test",
        detail:
          "\"Too small to affect any user's decision\" is the materiality definition restated. The stem has given the justification in its own words.",
      },
      {
        step: "Reject the three that do not license a departure",
        detail:
          "Prudence is caution, not simplification. Consistency requires like treatment across periods and would not permit this on its own. Going concern is about the basis of preparation.",
      },
    ],
    answer:
      "**B — materiality.**\n\nInformation is material if omitting or misstating it could influence a user's decision. An immaterial item need not be treated with full technical precision, because the cost of doing so buys nothing — and the stem states the test in its own words with \"too small to affect any user's decision\".\n\nMateriality is the concept that resolves this class of conflict, which is why it appears alongside the **cost constraint** in the Framework: financial reporting is subject to a cost-benefit judgement rather than being an exercise in absolute precision.\n\nPrudence is caution in the face of uncertainty, not licence to simplify. Consistency requires like treatment across periods. Going concern governs the basis of preparation.\n\nThe caution is that materiality is a judgement, and one that is easy to stretch to justify a treatment already preferred.",
    earns: [
      "Recognising materiality as the concept that resolves this conflict, and linking it to the cost constraint",
      "Noting that materiality is a judgement capable of being abused",
    ],
    loses: ["Choosing prudence, which counsels caution rather than permitting simplification"],
  },

  /* ── FA-05 · Qualitative characteristics ─────────────────────── */

  "FA-05::fundamental": {
    title: "The two fundamental characteristics, and what each requires",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following are the two **fundamental** qualitative characteristics of useful financial information?\n\nA  Relevance and comparability\nB  Relevance and faithful representation\nC  Reliability and prudence\nD  Understandability and timeliness",
    plan: [
      {
        step: "Recall the two-tier structure",
        detail:
          "FUNDAMENTAL: relevance and faithful representation — without both, information is not useful at all. ENHANCING: comparability, verifiability, timeliness and understandability — these improve useful information.",
      },
      {
        step: "Test each option for tier mixing",
        detail:
          "A pairs a fundamental with an enhancing characteristic. D offers two enhancing ones. Only B has both fundamentals, and reading the tier is the whole question.",
      },
      {
        step: "Note the term the Framework no longer uses",
        detail:
          "Option C offers reliability, which was replaced by faithful representation. It is offered because older material used it, and prudence is not a listed characteristic at all.",
      },
      {
        step: "Say what each fundamental requires",
        detail:
          "Relevance: capable of making a difference to a decision, through predictive or confirmatory value. Faithful representation: complete, neutral and free from error.",
      },
    ],
    answer:
      "**B — relevance and faithful representation.**\n\nThe structure is two-tier. **Fundamental**: relevance and faithful representation — information lacking either is not useful at all. **Enhancing**: comparability, verifiability, timeliness and understandability — these make useful information more useful, and cannot rescue information that fails a fundamental test.\n\n**Relevance** means capable of making a difference to a decision, through predictive value, confirmatory value or both. **Faithful representation** means complete, neutral and free from error.\n\nOption C offers **reliability**, the term the Framework replaced with faithful representation, which is why older material still uses it. Prudence is not one of the listed characteristics — it survives as caution in the exercise of judgement supporting neutrality.",
    earns: [
      "Reading the tier as well as the characteristic",
      "Knowing reliability was superseded by faithful representation",
    ],
    loses: ["Pairing a fundamental with an enhancing characteristic"],
  },

  "FA-05::enhancing": {
    title: "Identifying the enhancing characteristic at stake",
    format: "ot",
    marks: 2,
    requirement:
      "An entity changes its inventory valuation method from FIFO to AVCO without restating the prior year. The enhancing characteristic most clearly impaired is:\n\nA  Timeliness\nB  Comparability\nC  Verifiability\nD  Understandability",
    plan: [
      {
        step: "Name the four enhancing characteristics with their tests",
        detail:
          "Comparability: can this be compared with other periods and other entities? Verifiability: could an independent observer reach the same conclusion? Timeliness: is it available in time to be useful? Understandability: is it clear to a reasonably informed user?",
      },
      {
        step: "Read the stem for what the change destroys",
        detail:
          "Two years are now measured on different bases with no restatement. The trend between them is meaningless, and the entity cannot be compared with those that did not change.",
      },
      {
        step: "Test the closest alternative",
        detail:
          "Verifiability is unaffected — both figures are verifiable, and each is a faithful representation on its own basis. The problem is that they cannot be set against each other.",
      },
      {
        step: "Note that consistency serves comparability",
        detail:
          "Consistency is not itself a characteristic; it is the means by which comparability is achieved. Where a change is genuinely justified, restating the comparative preserves comparability.",
      },
    ],
    answer:
      "**B — comparability.**\n\nComparability lets users identify similarities and differences between periods and between entities. Two years measured on different bases with no restatement destroys the trend between them and breaks comparison with entities that did not change.\n\n**Verifiability** is the closest distractor and is unaffected: both figures are verifiable and each is a faithful representation on its own basis. The defect is that they cannot be set against each other.\n\n**Consistency** is not itself a characteristic — it is the means by which comparability is achieved. That is why a change of accounting policy requires the comparative to be **restated**: the change may be justified, but the comparison must survive it.",
    earns: [
      "Separating comparability from verifiability, since both concern reliance",
      "Knowing consistency serves comparability rather than being a characteristic itself",
    ],
    loses: ["Choosing understandability, which the change does not affect"],
  },

  "FA-05::trade-offs-and-cost": {
    title: "Trading one characteristic against another",
    format: "ot",
    marks: 2,
    requirement:
      "An entity could publish its results one week after the year end using estimates, or three months later with fully verified figures. The trade-off it faces is between:\n\nA  Relevance and faithful representation\nB  Timeliness and verifiability\nC  Comparability and understandability\nState\nD  Materiality and prudence",
    plan: [
      {
        step: "Name what each option in the scenario delivers",
        detail:
          "Publishing in a week delivers timeliness at the cost of precision. Publishing in three months delivers verified figures at the cost of currency. Each choice sacrifices something specific.",
      },
      {
        step: "Match those two sacrifices to their characteristics",
        detail:
          "Speed is timeliness. Fully verified figures is verifiability. Both are ENHANCING characteristics, and the trade-off is between them.",
      },
      {
        step: "Check whether a fundamental is engaged",
        detail:
          "Option A is tempting because estimates feel less faithful. But a reasonable estimate properly disclosed is a faithful representation — faithful does not mean exact, it means complete, neutral and free from error.",
      },
      {
        step: "Note how the conflict is normally resolved",
        detail:
          "In favour of timeliness. Information that arrives too late has lost its relevance entirely, whereas an estimate that is disclosed as such remains useful.",
      },
    ],
    answer:
      "**B — timeliness and verifiability.**\n\nPublishing in a week buys **timeliness** and sacrifices precision; waiting three months buys **verifiability** and sacrifices currency. Both are enhancing characteristics, and they genuinely pull against each other.\n\nOption A is the thoughtful wrong answer. Estimates feel less faithful, but **faithful representation does not mean exact** — it means complete, neutral and free from error, and a reasonable estimate properly disclosed as an estimate satisfies it.\n\nIn practice the conflict is resolved in favour of timeliness, because information arriving too late has lost its relevance completely, while an estimate flagged as one remains useful.\n\nOver all of this sits the **cost constraint**: the benefit of information must justify the cost of producing it, which is the pervasive limit on financial reporting.",
    earns: [
      "Knowing faithful representation does not require exactness",
      "Naming the cost constraint as the pervasive limit",
    ],
    loses: ["Escalating an enhancing trade-off into a fundamental one"],
  },

  /* ── FA-06 · Business documentation and the accounting system ── */

  "FA-06::the-documents": {
    title: "Which document evidences which stage of a trade",
    format: "ot",
    marks: 2,
    requirement:
      "A customer returns faulty goods and the seller agrees to reduce the amount owed. The seller issues:\n\nA  An invoice\nB  A credit note\nC  A debit note\nD  A remittance advice",
    plan: [
      {
        step: "Put the documents in the order a trade happens",
        detail:
          "Quotation → purchase order → delivery note → invoice → credit note if something is returned → statement of account → remittance advice with payment → receipt.",
      },
      {
        step: "Identify who issues what",
        detail:
          "The SELLER issues invoices, credit notes and statements. The BUYER issues purchase orders, debit notes and remittance advices. Half these questions are settled by identifying the party.",
      },
      {
        step: "Match the described effect",
        detail:
          "Reducing the amount owed is what a credit note does — it is a negative invoice, reversing part or all of the original charge.",
      },
      {
        step: "Handle the debit note distractor",
        detail:
          "A debit note is issued by the BUYER to request a reduction. The credit note is the seller's response granting it, and the stem specifies the seller issuing.",
      },
    ],
    answer:
      "**B — a credit note.**\n\nA credit note is issued by the **seller** and reduces the amount owed — effectively a negative invoice reversing part or all of the original charge. It is the document that supports the sales returns entry.\n\nA **debit note** is the mirror image issued by the **buyer**, requesting a reduction; the credit note is the seller's response granting it. The stem specifies the seller, which decides between them.\n\nIdentifying the issuing party settles most of these questions. The seller issues invoices, credit notes and statements of account; the buyer issues purchase orders, debit notes and remittance advices.",
    earns: ["Identifying the issuing party before matching the document"],
    loses: ["Confusing the buyer's debit note with the seller's credit note"],
  },

  "FA-06::the-system": {
    title: "What an accounting system has to achieve",
    format: "ot",
    marks: 2,
    requirement:
      "The primary requirement of an accounting system is that it should:\n\nA  Minimise the entity's tax liability\nB  Record all transactions completely and accurately, so reliable statements can be prepared\nC  Be operated entirely by computer\nD  Produce a profit figure that satisfies the shareholders",
    plan: [
      {
        step: "Name the two core objectives",
        detail:
          "Completeness — every transaction is captured — and accuracy — each is recorded correctly. Everything the system delivers downstream depends on both.",
      },
      {
        step: "Trace what depends on them",
        detail:
          "The trial balance, the financial statements, the tax computation and management information all rest on the records. An incomplete record cannot be corrected by anything further down the chain.",
      },
      {
        step: "Reject the two that describe outcomes to be engineered",
        detail:
          "Minimising tax and producing a satisfying profit figure both describe manipulating the output. The system records what happened; it does not choose the result.",
      },
      {
        step: "Reject the option about means rather than ends",
        detail:
          "Computerisation is a means. A manual system that is complete and accurate meets the requirement; a computerised one that is not, does not.",
      },
    ],
    answer:
      "**B — record all transactions completely and accurately, so reliable statements can be prepared.**\n\n**Completeness** and **accuracy** are the two core objectives, and everything downstream depends on them: the trial balance, the financial statements, the tax computation and management information. A transaction never recorded cannot be recovered by any later process.\n\nA and D describe engineering the output rather than recording what happened — the system records events, it does not choose results.\n\nC confuses means with ends: a manual system that is complete and accurate satisfies the requirement, and a computerised one that is not, does not. What computerisation adds is speed, automatic posting, built-in validation and instant reporting — along with the risk that a systematic error is replicated across every transaction rather than occurring once.",
    earns: ["Naming completeness and accuracy, and what depends on each"],
    loses: ["Choosing an option that treats the accounts as a result to be engineered"],
  },

  /* ── FA-07 · The accounting equation and double entry ────────── */

  "FA-07::the-equation": {
    title: "Working out the effect of a transaction on the equation",
    format: "ot",
    marks: 2,
    requirement:
      "A business buys inventory for $5,000 on credit. The effect on the accounting equation is that:\n\nA  Assets increase $5,000 and capital increases $5,000\nB  Assets increase $5,000 and liabilities increase $5,000\nC  Assets decrease $5,000 and liabilities decrease $5,000\nD  Assets are unchanged and liabilities increase $5,000",
    plan: [
      {
        step: "Write the equation before touching the transaction",
        detail:
          "Assets = Liabilities + Capital. Every transaction has two effects, and they must leave the equation balanced — which is why double entry cannot fail if it is applied correctly.",
      },
      {
        step: "Take each side of the transaction separately",
        detail:
          "Inventory is received, so assets rise $5,000. It is on credit, so a payable arises and liabilities rise $5,000. Two effects, one on each side.",
      },
      {
        step: "Check the equation still balances",
        detail:
          "Assets +5,000 = Liabilities +5,000 + Capital unchanged. It balances, which confirms the pair of effects is complete.",
      },
      {
        step: "See why capital is untouched",
        detail:
          "Buying inventory is not an expense — the cost becomes an expense when the goods are SOLD. No profit has arisen, so capital does not move, which is what option A gets wrong.",
      },
    ],
    answer:
      "**B — assets increase $5,000 and liabilities increase $5,000.**\n\nAssets = Liabilities + Capital. Inventory received raises assets by $5,000; buying on credit creates a payable, raising liabilities by $5,000. The equation balances, which confirms both effects have been identified.\n\nOption A is the instructive error. Buying inventory is **not an expense** — the cost becomes cost of sales when the goods are **sold**, under the accruals concept. Until then the business has simply exchanged one asset position for an asset plus an obligation, and capital is untouched.\n\nWorking the effect on the equation before choosing is what makes these questions mechanical, and it is the same discipline that generates the debit and credit entries.",
    earns: [
      "Identifying both effects and checking the equation balances",
      "Knowing purchasing inventory is not yet an expense",
    ],
    loses: ["Treating a purchase as an expense, which moves capital when it should not"],
  },

  "FA-07::deriving-debits": {
    title: "Deriving the debit and credit rather than recalling them",
    format: "ot",
    marks: 2,
    requirement:
      "A business pays $900 for electricity by bank transfer. The correct entries are:\n\nA  Debit bank $900, credit electricity expense $900\nB  Debit electricity expense $900, credit bank $900\nC  Debit electricity expense $900, credit payables $900\nD  Debit payables $900, credit bank $900",
    plan: [
      {
        step: "Fix the rule from the equation, not from memory",
        detail:
          "DEBIT increases assets and expenses and decreases liabilities and capital. CREDIT does the reverse. Deriving it from Assets = Liabilities + Capital means it cannot be recalled backwards.",
      },
      {
        step: "Identify the two accounts affected",
        detail:
          "An expense has been incurred — electricity — and an asset has decreased — the bank. Two accounts, and the direction of each is now determined.",
      },
      {
        step: "Apply the rule to each",
        detail:
          "Expense increasing → debit electricity. Asset decreasing → credit bank. So debit electricity $900, credit bank $900.",
      },
      {
        step: "Spot the reversed option, which is always offered",
        detail:
          "Option A is the same entry with debit and credit transposed. On FA transaction questions there is almost always a reversed option, and it is the single most common wrong answer in the paper.",
      },
    ],
    answer:
      "**B — debit electricity expense $900, credit bank $900.**\n\nDerive it rather than recall it: **debit** increases assets and expenses and decreases liabilities and capital; **credit** does the reverse. An expense has increased and an asset has fallen, so debit the expense and credit the bank.\n\nOption A is that entry reversed, and a reversed option appears on almost every FA transaction question — it is the paper's most common wrong answer.\n\nOption C would be correct if the bill had been received and not yet paid, creating a payable. Option D would be correct if a previously recorded payable were being settled. Both are right answers to different transactions, so reading whether payment has happened, and whether a liability was already recorded, is what separates the three.",
    earns: [
      "Deriving debit and credit from the equation rather than recalling a mnemonic",
      "Noticing that C and D are correct entries for different transactions",
    ],
    loses: ["Selecting the reversed entry, which is offered on virtually every question of this type"],
  },

  "FA-07::profit-and-capital": {
    title: "How profit and drawings move capital",
    format: "ot",
    marks: 2,
    requirement:
      "A sole trader's opening capital was $40,000. During the year profit was $25,000, the owner introduced $10,000 of new capital and withdrew $18,000. Closing capital is:\n\nA  $47,000\nB  $57,000\nC  $75,000\nD  $93,000",
    plan: [
      {
        step: "Write the capital reconciliation as a column",
        detail:
          "Opening capital + capital introduced + profit − drawings = closing capital. Setting it out vertically means no item is omitted and each sign is visible.",
      },
      {
        step: "Enter each item with its sign",
        detail:
          "$40,000 + $10,000 + $25,000 − $18,000 = **$57,000**. Drawings is the only deduction, and omitting it is the standard slip.",
      },
      {
        step: "Confirm drawings reduces capital rather than profit",
        detail:
          "Drawings is a withdrawal of the owner's own capital, not an expense of the business. So it never touches profit and always reduces capital.",
      },
      {
        step: "Read the distractors",
        detail:
          "$75,000 omits drawings entirely. $47,000 omits the capital introduced. $93,000 adds drawings instead of subtracting. Each is one item mishandled.",
      },
    ],
    answer:
      "**B — $57,000.**\n\nOpening capital $40,000\nCapital introduced $10,000\nProfit for the year $25,000\nDrawings ($18,000)\n**Closing capital $57,000**\n\nEach distractor is one item mishandled: **$75,000** omits drawings, **$47,000** omits the capital introduced, **$93,000** adds drawings rather than deducting them.\n\nThe conceptual point is that **drawings is not an expense**. It is a withdrawal of the owner's own capital, so it never appears in the statement of profit or loss and always reduces capital. Treating it as an expense would understate profit and overstate the return the owner is actually earning from the business.\n\nThe same reconciliation, rearranged, is how **incomplete records** questions derive a missing profit figure.",
    earns: [
      "Setting the reconciliation out vertically so no item is dropped",
      "Knowing drawings bypasses profit entirely",
    ],
    loses: ["Omitting drawings, or treating it as an expense of the business"],
  },

  /* ── FA-08 · Books of prime entry, ledgers and journals ──────── */

  "FA-08::the-layers": {
    title: "Which book a transaction is first recorded in",
    format: "ot",
    marks: 2,
    requirement:
      "A credit sale is first recorded in the:\n\nA  General ledger\nB  Sales day book\nC  Sales ledger control account\nD  Statement of profit or loss",
    plan: [
      {
        step: "Set out the two layers and the order between them",
        detail:
          "Books of PRIME ENTRY come first: sales day book, purchases day book, returns day books, cash book, petty cash book and journal. Their totals are then posted to the GENERAL LEDGER.",
      },
      {
        step: "Read the word \"first\"",
        detail:
          "The question is about sequence, not about where the transaction ends up. Every option except the last is somewhere the transaction genuinely appears, just not first.",
      },
      {
        step: "Match the transaction to its day book",
        detail:
          "A credit sale goes to the sales day book. Cash sales would go to the cash book, which is where candidates misroute this question.",
      },
      {
        step: "Note why prime entry books exist at all",
        detail:
          "They group like transactions so that periodic TOTALS can be posted, rather than posting hundreds of individual entries to the ledger. That is their entire purpose.",
      },
    ],
    answer:
      "**B — the sales day book.**\n\nBooks of **prime entry** come first: sales and purchases day books, returns day books, the cash book, the petty cash book and the journal. Their totals are then posted to the **general ledger**, and the statement of profit or loss is prepared from that.\n\nThe question is about sequence, and every option except the last is somewhere the transaction genuinely appears.\n\nPrime entry books exist to group like transactions so periodic **totals** can be posted rather than hundreds of individual entries. A credit sale goes to the sales day book; a **cash** sale goes to the cash book, and misrouting on that distinction is the usual error.\n\nThe sales ledger holds individual customer accounts, and its total is checked against the receivables control account in the general ledger.",
    earns: ["Reading \"first\" as a question about sequence"],
    loses: ["Routing a credit sale to the cash book"],
  },

  "FA-08::ledger-accounts": {
    title: "Balancing off a ledger account",
    format: "ot",
    marks: 2,
    requirement:
      "A receivables account has debit entries totalling $47,000 and credit entries totalling $39,000. The balance carried down is:\n\nA  $8,000 credit\nB  $8,000 debit\nC  $86,000 debit\nD  $8,000, but the side cannot be determined",
    plan: [
      {
        step: "Net the two sides and take the difference",
        detail:
          "$47,000 − $39,000 = $8,000. The balance is always the difference between the sides, never their total — option C adds them.",
      },
      {
        step: "Put the balance on the side with the larger total",
        detail:
          "Debits exceed credits, so the balance is a DEBIT balance. Mechanically the balance carried down is entered on the smaller side to make the account balance, and brought down on the larger.",
      },
      {
        step: "Sanity-check against what the account represents",
        detail:
          "Receivables is an asset, and assets carry debit balances. A credit balance on receivables would mean customers were owed money — possible, but not what these figures show.",
      },
      {
        step: "Reject the indeterminacy option",
        detail:
          "D claims the side cannot be determined, which is never true once both totals are known. Options offering indeterminacy on a computable question are almost always wrong.",
      },
    ],
    answer:
      "**B — $8,000 debit.**\n\nThe balance is the **difference** between the sides: $47,000 − $39,000 = $8,000, and it sits on the side with the larger total, so a **debit** balance. Option C adds the two sides instead.\n\nThe sanity check is that receivables is an asset, and assets carry debit balances. A credit balance on receivables would mean customers were in credit — possible in practice, but not what these totals show.\n\nMechanically, the balance carried down is entered on the smaller side so the account totals agree, and brought down on the larger side at the start of the next period.\n\nOption D offers indeterminacy on a question that is fully computable, which is reliably a wrong answer.",
    earns: [
      "Taking the difference rather than the total, and checking the side against the account type",
      "Rejecting an indeterminacy option on a computable question",
    ],
    loses: ["Adding the two sides, or placing the balance on the wrong side"],
  },

  "FA-08::journals": {
    title: "Writing a journal entry that a marker can follow",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is normally recorded in the journal rather than in another book of prime entry?\n\nA  A credit sale to a customer\nB  The correction of an error found after the trial balance was extracted\nC  A cash payment to a supplier\nD  A purchase of goods on credit",
    plan: [
      {
        step: "Name what the journal is for",
        detail:
          "Transactions and adjustments that do not fit any other book of prime entry: error corrections, year-end adjustments, opening balances, and non-routine transfers such as goods taken as drawings.",
      },
      {
        step: "Route each option to its own book",
        detail:
          "A credit sale goes to the sales day book, a cash payment to the cash book, a credit purchase to the purchases day book. Each has a dedicated home, so none needs the journal.",
      },
      {
        step: "Confirm the survivor has nowhere else to go",
        detail:
          "An error correction is not a transaction with a customer, a supplier or the bank. No day book covers it, which is exactly why the journal exists.",
      },
      {
        step: "Note what a journal entry must contain",
        detail:
          "The accounts debited and credited, the amounts, and a NARRATIVE explaining the entry. The narrative is what makes the entry auditable rather than merely arithmetically balanced.",
      },
    ],
    answer:
      "**B — the correction of an error found after the trial balance was extracted.**\n\nThe journal takes what no other book of prime entry covers: error corrections, year-end adjustments such as accruals and prepayments, opening balances, and non-routine transfers like goods taken by the owner as drawings.\n\nEvery other option has a dedicated book — sales day book, cash book, purchases day book — so none of them needs the journal.\n\nWhat a journal entry must contain is examinable in its own right: the accounts **debited** and **credited**, the **amounts**, and a **narrative** explaining the entry. The narrative is what makes it auditable; an entry that balances arithmetically but explains nothing cannot be followed by anyone reviewing it later, which is precisely when a journal is looked at.",
    earns: [
      "Routing each option to its own book to show the journal is the residual",
      "Naming the narrative as a required part of the entry",
    ],
    loses: ["Sending a routine transaction to the journal when a day book exists for it"],
  },
}
