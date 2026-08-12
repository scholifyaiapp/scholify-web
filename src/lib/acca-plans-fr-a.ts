/*
 * FR Area A — the conceptual and regulatory framework, and the concepts of groups.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * FR sets 15 objective tests at 2 marks, 3 OT cases at 10 marks, and a Section C
 * of two constructed responses worth 20 marks each — typically one preparation or
 * consolidation and one interpretation.
 *
 * Area A is the paper's most under-prepared area relative to its weight, because it
 * looks like theory and is examined as APPLICATION. An objective test rarely asks
 * "what is relevance"; it gives a transaction and asks which characteristic the
 * proposed treatment breaches. So every plan here works from a definition to the
 * treatment it produces, and its distractors are the standard misreadings of the
 * Framework rather than invented alternatives.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FR_PLANS_A: ExamPlanMap = {
  /* ── FR-01 · Why a framework, and who for ──────────────────── */

  "FR-01::why-a-framework": {
    title: "What a conceptual framework is for",
    format: "ot",
    marks: 2,
    requirement:
      "The principal advantage of a conceptual framework over a purely rule-based approach to standard setting is that it:\n\nA  Removes the need for judgement\nB  Gives standards a coherent basis, so new standards are consistent and gaps can be reasoned about\nC  Guarantees every entity reports identical figures\nD  Makes standards shorter",
    plan: [
      {
        step: "State what the alternative looks like",
        detail:
          "Standards written one at a time in response to problems. That produces internal inconsistency — two standards can resolve the same tension differently — and leaves a gap whenever a transaction nobody anticipated arises.",
      },
      {
        step: "Name what the framework supplies",
        detail:
          "A coherent basis: definitions of the elements, recognition criteria, measurement bases and qualitative characteristics. New standards are built on it, so they agree with each other.",
      },
      {
        step: "Reject the option removing judgement",
        detail:
          "A framework does the opposite: it gives judgement a principled structure rather than eliminating it. Principles-based standards require MORE judgement than rules, which is their cost.",
      },
      {
        step: "Reject the uniformity claim",
        detail:
          "Identical figures are not the aim, and are not achievable — different entities in different circumstances should report differently. What the framework seeks is COMPARABILITY, which is not the same as uniformity.",
      },
    ],
    answer:
      "**B — gives standards a coherent basis, so new standards are consistent and gaps can be reasoned about.**\n\nThe alternative is standards written one at a time in response to problems as they arise. That produces **internal inconsistency** — two standards can resolve the same tension in different ways — and leaves a **gap** whenever a transaction nobody anticipated occurs.\n\nThe Framework supplies definitions of the elements, recognition criteria, measurement bases and the qualitative characteristics, so new standards are built on the same foundation and agree with each other. Where no standard covers a transaction, the Framework is what a preparer reasons from.\n\nOption A inverts the position: a framework gives judgement a **principled structure** rather than removing it, and principles-based standards require more judgement than rules, which is their cost as well as their strength.\n\nOption C confuses **comparability** with **uniformity**. Different entities in different circumstances should report differently; what must be comparable is the treatment of like transactions.\n\nThe Framework is **not a standard** and does not override one — where a standard conflicts with it, the standard applies.",
    earns: [
      "Naming what the framework prevents — inconsistency between standards and gaps",
      "Distinguishing comparability from uniformity, and knowing the Framework does not override a standard",
    ],
    loses: ["Claiming a framework removes the need for judgement"],
  },

  "FR-01::the-objective": {
    title: "The objective of general purpose financial reporting",
    format: "ot",
    marks: 2,
    requirement:
      "The objective of general purpose financial reporting is to provide financial information that is useful to:\n\nA  Management, in running the business\nB  Existing and potential investors, lenders and other creditors, in making decisions about providing resources to the entity\nC  Tax authorities, in assessing liabilities\nD  All possible users equally",
    plan: [
      {
        step: "Recall the objective in the Framework's own terms",
        detail:
          "Useful to existing and potential investors, lenders and other creditors in making decisions about providing resources to the entity. Those three groups are the PRIMARY users.",
      },
      {
        step: "Understand why those three and not others",
        detail:
          "They provide resources and cannot require the entity to give them information directly. Management can obtain whatever it needs internally, and tax authorities have statutory powers to demand it.",
      },
      {
        step: "Reject the all-users-equally option",
        detail:
          "The Framework deliberately identifies primary users, because a report serving everyone equally would serve no one well. Other users may find the statements useful; they are not the objective.",
      },
      {
        step: "Note what the decisions are about",
        detail:
          "Buying, selling or holding equity and debt, providing or settling loans, and exercising voting rights — which is why information about future cash flows and about stewardship both matter.",
      },
    ],
    answer:
      "**B — existing and potential investors, lenders and other creditors, in making decisions about providing resources to the entity.**\n\nThose three groups are the **primary users**, and the reason they were chosen is the examinable point: they **provide resources** to the entity and **cannot require it to give them information directly**.\n\nManagement can obtain whatever information it needs internally, and tax authorities have **statutory powers** to demand it — so neither depends on general purpose financial statements. That is why option A and option C are excluded despite both being real users.\n\nOption D is the one to reject with care: the Framework **deliberately** identifies primary users, because a report attempting to serve every user equally would serve none of them well. Other users may find the statements useful, and that is welcome rather than the objective.\n\nThe decisions in question are buying, selling or holding equity and debt instruments, providing or settling loans, and exercising voting rights — which is why the statements must support assessments of **future cash flows** and of management's **stewardship** of the entity's resources.",
    earns: [
      "Explaining why those three users are primary — they provide resources and cannot demand information",
      "Naming both future cash flows and stewardship as what the statements support",
    ],
    loses: ["Choosing all users equally, which the Framework explicitly rejects"],
  },

  "FR-01::stewardship-and-limits": {
    title: "What financial statements cannot do",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement about general purpose financial statements is correct?\n\nA  They show the value of the entity\nB  They do not show the value of the entity, but help users estimate it\nC  They are prepared primarily to meet the needs of management\nD  They report only historical information",
    plan: [
      {
        step: "State the limitation the Framework itself records",
        detail:
          "Financial statements do NOT show the value of the entity. They provide information that helps users ESTIMATE it — which is a different and more modest claim.",
      },
      {
        step: "Name why they cannot",
        detail:
          "Most assets are not at current value, internally generated goodwill and brands are unrecognised, the workforce and customer relationships appear nowhere, and future prospects are largely absent.",
      },
      {
        step: "Reject the historical-only option",
        detail:
          "The statements contain forward-looking elements — estimates, impairment assessments, provisions and the going concern judgement all rest on expectations about the future.",
      },
      {
        step: "Note the other limitations worth naming",
        detail:
          "They are general purpose rather than tailored, they use estimates and judgement, they are not wholly comparable between entities with different policies, and they report largely in monetary terms.",
      },
    ],
    answer:
      "**B — they do not show the value of the entity, but help users estimate it.**\n\nThe Framework records this limitation itself, and the distinction is deliberate: the statements provide **information that helps users estimate** value, which is a far more modest claim than reporting it.\n\nWhy they cannot: most assets are **not carried at current value**, **internally generated goodwill and brands** are not recognised at all, the **workforce** and **customer relationships** appear nowhere, and future prospects are largely absent. That is why a listed company's market capitalisation rarely resembles its net assets.\n\nOption D is wrong in an instructive way: the statements are **not** purely historical. Estimates, impairment assessments, provisions and the **going concern** judgement all rest on expectations about the future — so judgement about the future is embedded throughout.\n\nThe other limitations worth being able to name: they are **general purpose** rather than tailored to any one user, they depend on **estimates and judgement**, they are not fully **comparable** between entities applying different policies, and they report largely in **monetary** terms so non-financial factors are omitted.",
    earns: [
      "Stating the limitation precisely — help estimate value, not report it — and naming why",
      "Knowing the statements contain forward-looking judgements rather than being purely historical",
    ],
    loses: ["Claiming the statements show the entity's value, which the Framework denies"],
  },

  /* ── FR-02 · Qualitative characteristics ───────────────────── */

  "FR-02::the-two-tiers": {
    title: "Why the two tiers of characteristic are separated",
    format: "ot",
    marks: 2,
    requirement:
      "An entity's financial information is comparable, verifiable, timely and understandable, but is not relevant to users' decisions. The information is:\n\nA  Useful, because it satisfies four characteristics\nB  Not useful, because relevance is fundamental and the enhancing characteristics cannot compensate for its absence\nC  Useful only to some users\nD  Useful if disclosed in the notes",
    plan: [
      {
        step: "State the structure of the two tiers",
        detail:
          "FUNDAMENTAL: relevance and faithful representation. Information lacking either is not useful at all. ENHANCING: comparability, verifiability, timeliness and understandability. These improve information that is already useful.",
      },
      {
        step: "Apply the hierarchy",
        detail:
          "Enhancing characteristics cannot rescue information that fails a fundamental one. Four enhancing characteristics applied to irrelevant information produce irrelevant information, presented well.",
      },
      {
        step: "See why the tiers exist at all",
        detail:
          "To stop the characteristics being treated as a checklist to be scored. They are not additive — the fundamentals are gates, and the enhancing ones are improvements beyond the gate.",
      },
      {
        step: "Note the order of application",
        detail:
          "Identify relevant information, then determine whether it can be faithfully represented, then apply the enhancing characteristics — subject throughout to the cost constraint.",
      },
    ],
    answer:
      "**B — not useful, because relevance is fundamental and the enhancing characteristics cannot compensate for its absence.**\n\nThe two tiers are **not additive**, and that is the whole point of separating them. **Relevance** and **faithful representation** are **fundamental** — information lacking either is not useful at all. **Comparability, verifiability, timeliness and understandability** are **enhancing** — they improve information that is already useful.\n\nSo four enhancing characteristics applied to irrelevant information produce irrelevant information presented well. Option A treats the characteristics as a checklist to be scored, which is precisely the error the two-tier structure prevents.\n\nThe order of application follows: **identify relevant** information, determine whether it can be **faithfully represented**, then apply the **enhancing** characteristics to make it as useful as possible — subject throughout to the **cost constraint**, which is pervasive and can override any of them.\n\nSo the fundamentals are **gates** and the enhancing characteristics are improvements beyond the gate.",
    earns: [
      "Treating the fundamentals as gates rather than as items on a checklist",
      "Knowing the order of application and that cost constrains all of it",
    ],
    loses: ["Scoring the characteristics additively, so four enhancing ones outweigh a missing fundamental"],
  },

  "FR-02::relevance": {
    title: "Relevance, and materiality as its entity-specific aspect",
    format: "ot",
    marks: 2,
    requirement:
      "Information is material if:\n\nA  It exceeds a fixed percentage of revenue\nB  Omitting, misstating or obscuring it could reasonably be expected to influence the decisions of primary users\nC  Management considers it important\nD  It is required by a standard",
    plan: [
      {
        step: "State the definition and note what it turns on",
        detail:
          "Omitting, misstating or OBSCURING it could reasonably be expected to influence primary users' decisions. All three verbs matter — burying material information in excessive disclosure is itself a failure.",
      },
      {
        step: "Note that materiality is entity-specific",
        detail:
          "It depends on the nature or magnitude of the item in the context of THAT entity's report. So no universal quantitative threshold exists, which is what option A assumes.",
      },
      {
        step: "Note that it can be qualitative",
        detail:
          "A small amount can be material because of its nature — a director's transaction, or a figure that turns a profit into a loss. Magnitude alone does not settle it.",
      },
      {
        step: "Connect it to relevance",
        detail:
          "Materiality is the ENTITY-SPECIFIC aspect of relevance. Relevance asks whether the type of information could influence decisions; materiality asks whether this item, in this report, could.",
      },
    ],
    answer:
      "**B — omitting, misstating or obscuring it could reasonably be expected to influence the decisions of primary users.**\n\nAll three verbs carry weight, and **obscuring** is the one candidates omit: burying material information inside excessive disclosure is itself a failure of materiality, which is why disclosure overload is a reporting problem rather than a safe default.\n\nMateriality is **entity-specific** — it depends on the nature or magnitude of the item in the context of **that entity's** report — so **no universal quantitative threshold exists**, and option A's fixed percentage does not.\n\nIt can also be **qualitative**: a small amount may be material because of its **nature**, such as a transaction with a director, or because it turns a reported profit into a loss. Magnitude alone never settles it.\n\nThe relationship to relevance is the structural point: **materiality is the entity-specific aspect of relevance**. Relevance asks whether that type of information could influence decisions; materiality asks whether this item, in this report, could.\n\nRelevance itself is supplied by **predictive value**, **confirmatory value**, or both.",
    earns: [
      "Including \"obscuring\", and knowing materiality can be qualitative",
      "Placing materiality as the entity-specific aspect of relevance",
    ],
    loses: ["Applying a fixed percentage threshold, which the definition does not use"],
  },

  "FR-02::faithful-representation": {
    title: "Faithful representation, and where prudence went",
    format: "ot",
    marks: 2,
    requirement:
      "Faithful representation requires a depiction that is:\n\nA  Accurate in every respect\nB  Complete, neutral and free from error\nC  Prudent, so assets and income are understated\nD  Verified by an external auditor",
    plan: [
      {
        step: "State the three components",
        detail:
          "COMPLETE — all information needed to understand the phenomenon. NEUTRAL — without bias in selection or presentation. FREE FROM ERROR — no errors or omissions in the description and the process.",
      },
      {
        step: "Note that free from error is not accuracy",
        detail:
          "An estimate can be a faithful representation if it is described as an estimate and the process used is appropriate. Perfect accuracy is not achievable and is not required.",
      },
      {
        step: "Place prudence correctly",
        detail:
          "Prudence survives as CAUTION when exercising judgement, and it SUPPORTS neutrality. It does not mean understating assets and income — deliberate understatement is bias, and bias breaks neutrality.",
      },
      {
        step: "Reject the audit option",
        detail:
          "Verifiability is an ENHANCING characteristic and is not the same as being audited. Faithful representation is a property of the information itself, whoever looks at it.",
      },
    ],
    answer:
      "**B — complete, neutral and free from error.**\n\n**Complete** means all information needed to understand the phenomenon. **Neutral** means without bias in selection or presentation. **Free from error** means no errors or omissions in the description and no error in the process used to produce it.\n\n**Free from error is not accuracy**, and that distinction is examined: an **estimate** can be a faithful representation provided it is described **as** an estimate and the process used is appropriate. Perfect accuracy is unachievable and is not required.\n\nOption C is the one to get right. **Prudence** survives in the Framework as **caution when exercising judgement**, and it **supports** neutrality — it does **not** mean deliberately understating assets and income. Deliberate understatement is **bias**, and bias breaks neutrality, so an entity that systematically writes assets down is not being prudent but unfaithful.\n\nOption D confuses this with **verifiability**, which is an enhancing characteristic and not the same as being audited. Faithful representation is a property of the information itself.",
    earns: [
      "Knowing free from error is not accuracy, so a described estimate qualifies",
      "Placing prudence as caution supporting neutrality, not as understatement",
    ],
    loses: ["Reading prudence as deliberate understatement, which is bias"],
  },

  "FR-02::enhancing-and-cost": {
    title: "Trading enhancing characteristics against each other",
    format: "ot",
    marks: 2,
    requirement:
      "An entity changes an accounting policy to one that better reflects its transactions. Which enhancing characteristic is impaired, and how is the impairment mitigated?\n\nA  Timeliness, mitigated by earlier publication\nB  Comparability, mitigated by restating the comparative figures and disclosing the change\nC  Understandability, mitigated by simpler language\nD  Verifiability, mitigated by an audit",
    plan: [
      {
        step: "Identify what a policy change breaks",
        detail:
          "Comparability. Two periods measured on different bases cannot be compared, so the trend between them becomes meaningless.",
      },
      {
        step: "State the mitigation the standards require",
        detail:
          "RESTATE the comparatives under the new policy and DISCLOSE the change and its effect. The comparison is then preserved even though the basis changed.",
      },
      {
        step: "Distinguish comparability from consistency",
        detail:
          "Consistency is the MEANS by which comparability is achieved, not a characteristic in its own right. So a justified change is permitted provided comparability is restored by restatement.",
      },
      {
        step: "Note the trade-off that has no clean answer",
        detail:
          "Timeliness against faithful representation: reporting sooner means more estimation. That one is resolved in favour of timeliness, because information arriving too late has lost its relevance entirely.",
      },
    ],
    answer:
      "**B — comparability, mitigated by restating the comparative figures and disclosing the change.**\n\nA policy change breaks **comparability**, because two periods measured on different bases cannot be compared and the trend between them becomes meaningless.\n\nThe mitigation is what the standards require: **restate the comparatives** under the new policy and **disclose** the change and its effect. The comparison survives even though the basis changed — which is why a justified change is permitted rather than forbidden.\n\nThe distinction that carries the marks: **consistency is the means by which comparability is achieved**, not a characteristic in its own right. So consistency is not sacred; comparability is, and restatement is how it is protected.\n\nThe trade-off with no clean answer is worth naming for a discussion question: **timeliness against faithful representation**. Reporting sooner means relying on more estimation. It is resolved in favour of timeliness, because information arriving too late has lost its relevance **entirely**, whereas a well-described estimate remains useful.\n\nOver all of it sits the **cost constraint**: the benefit of information must justify the cost of providing it.",
    earns: [
      "Naming restatement of comparatives as the mitigation, not just the impairment",
      "Knowing consistency serves comparability rather than being a characteristic itself",
    ],
    loses: ["Treating a policy change as impairing understandability or verifiability"],
  },

  /* ── FR-03 · Elements, recognition, derecognition ──────────── */

  "FR-03::assets": {
    title: "Applying the asset definition",
    format: "ot",
    marks: 2,
    requirement:
      "Under the Conceptual Framework, an asset is:\n\nA  A resource owned by the entity from which future benefits are certain\nB  A present economic resource controlled by the entity as a result of past events\nC  Anything of value to the entity\nD  Expenditure incurred that will benefit future periods",
    plan: [
      {
        step: "State the definition and take it apart",
        detail:
          "A PRESENT economic resource CONTROLLED by the entity as a result of PAST events. An economic resource is a right with the POTENTIAL to produce economic benefits.",
      },
      {
        step: "Note the two words the revision changed",
        detail:
          "CONTROL rather than ownership — which is what brings a leased asset onto the statement of financial position. And POTENTIAL rather than probability or certainty, so the threshold sits in recognition rather than in the definition.",
      },
      {
        step: "Reject the ownership and certainty option",
        detail:
          "Option A requires ownership and certainty. Neither is in the definition, and requiring ownership would put every leased asset off balance sheet.",
      },
      {
        step: "Reject the expenditure option",
        detail:
          "Option D defines an asset by the spending that created it. Expenditure is not an asset — a right is, and a right can exist without expenditure and expenditure without any right.",
      },
    ],
    answer:
      "**B — a present economic resource controlled by the entity as a result of past events.**\n\nTake it apart. **Present** — it exists at the reporting date. **Economic resource** — a **right** with the **potential** to produce economic benefits. **Controlled** — the entity has the present ability to direct its use and obtain the benefits. **Past events** — something has already happened.\n\nTwo words do the heavy lifting. **Control**, not ownership, is what brings a **leased** asset onto the statement of financial position. And **potential**, not probability or certainty, means a right qualifies as an asset even where the benefits are unlikely — the probability threshold sits in **recognition**, not in the definition.\n\nOption A requires ownership and certainty; requiring ownership would push every leased asset off balance sheet.\n\nOption D is the more instructive error: it defines an asset by the **expenditure** that created it. Expenditure is not an asset — a **right** is. A right can arise without expenditure, and expenditure can occur producing no right at all, which is exactly why development costs need criteria.",
    earns: [
      "Identifying control and potential as the operative words, and what each enables",
      "Knowing the probability threshold sits in recognition, not the definition",
    ],
    loses: ["Requiring ownership, which would exclude leased assets"],
  },

  "FR-03::liabilities": {
    title: "The obligation that cannot be avoided",
    format: "ot",
    marks: 2,
    requirement:
      "A liability requires a present obligation to transfer an economic resource. The obligation must be one the entity:\n\nA  Intends to settle\nB  Has no practical ability to avoid\nC  Has agreed in writing\nD  Expects to settle within twelve months",
    plan: [
      {
        step: "State the definition's three parts",
        detail:
          "A PRESENT obligation of the entity to transfer an economic resource as a result of PAST events, where the entity has NO PRACTICAL ABILITY TO AVOID it.",
      },
      {
        step: "Note what the no-practical-ability test does",
        detail:
          "It settles cases where the obligation is not contractual. An entity that could in principle avoid a cost by ceasing to trade has no practical ability to avoid it, because ceasing to trade is not a real alternative.",
      },
      {
        step: "Reject intention as the test",
        detail:
          "An intention to spend is not a liability — that is precisely why a planned restructuring or future operating cost cannot be provided for. Intention can be reversed; an obligation cannot.",
      },
      {
        step: "Reject the form and timing options",
        detail:
          "Writing is not required — a constructive obligation can arise from conduct. And timing determines CURRENT versus NON-CURRENT classification, not whether a liability exists.",
      },
    ],
    answer:
      "**B — has no practical ability to avoid.**\n\nThe definition has three parts: a **present** obligation to transfer an economic resource, arising from **past events**, which the entity has **no practical ability to avoid**.\n\nThat last test is what resolves the hard cases, and its subtlety is the examinable point: an entity that could in principle escape a cost by **ceasing to trade** has **no practical ability to avoid** it, because ceasing to trade is not a genuine alternative. So the test is practical rather than theoretical.\n\nOption A is the error with the widest consequences. **An intention to spend is not a liability** — which is precisely why a planned restructuring, future operating costs, or an intention to repair cannot be provided for. An intention can be reversed; an obligation cannot.\n\nWriting is not required, because a **constructive** obligation can arise from an entity's conduct and established practice. And timing determines **current versus non-current classification**, not whether a liability exists at all.",
    earns: [
      "Reading no practical ability to avoid as a practical rather than theoretical test",
      "Knowing an intention is never a liability, and why that governs provisions",
    ],
    loses: ["Making intention the test, which would let any planned cost be provided for"],
  },

  "FR-03::equity-income-expenses": {
    title: "Why equity is a residual",
    format: "ot",
    marks: 2,
    requirement:
      "Equity is defined as:\n\nA  The amount subscribed by shareholders\nB  Assets less liabilities\nC  The market value of the entity's shares\nD  Retained earnings plus share capital",
    plan: [
      {
        step: "State the definition",
        detail:
          "The RESIDUAL interest in the assets of the entity after deducting all its liabilities. Equity is measured as a consequence, not directly.",
      },
      {
        step: "See what follows from it being a residual",
        detail:
          "Equity's carrying amount depends entirely on how assets and liabilities are measured. So a change in an asset's measurement basis changes equity, and equity cannot be measured independently.",
      },
      {
        step: "Reject the market value option",
        detail:
          "Equity is not market capitalisation. The two differ because most assets are not at current value and internally generated intangibles are unrecognised — the same limitation as FR-01.",
      },
      {
        step: "Note how income and expenses are defined",
        detail:
          "Income: increases in assets or decreases in liabilities resulting in an increase in equity, OTHER than contributions from holders of equity claims. Expenses: the reverse, other than distributions.",
      },
    ],
    answer:
      "**B — assets less liabilities.**\n\nEquity is the **residual** interest in the assets after deducting all liabilities, and it is measured as a **consequence** rather than directly.\n\nWhat follows from that is the examinable point: equity's carrying amount depends **entirely** on how assets and liabilities are measured. So a change in an asset's measurement basis changes equity, and equity can never be measured independently of the other two elements — which is why the statement of financial position balances by construction rather than by luck.\n\nOption D describes equity's **components** rather than its definition, and option A describes only one of them.\n\nOption C is the substantive error and repeats FR-01's limitation: equity is **not market capitalisation**. The two differ because most assets are not carried at current value and internally generated intangibles are unrecognised.\n\n**Income** and **expenses** are defined off the back of equity, and the exclusions matter: income is an increase in assets or decrease in liabilities resulting in an increase in equity **other than contributions from holders of equity claims**; expenses are the reverse **other than distributions**. That is why a share issue is not income and a dividend is not an expense.",
    earns: [
      "Explaining what follows from equity being a residual",
      "Knowing the exclusions in the income and expense definitions, and what they rule out",
    ],
    loses: ["Equating equity with market capitalisation"],
  },

  "FR-03::recognition-derecognition": {
    title: "When an item is recognised",
    format: "ot",
    marks: 2,
    requirement:
      "An item meeting the definition of an asset is recognised only if recognition provides users with:\n\nA  Certainty about the future benefits\nB  Relevant information, and a faithful representation, taking the cost constraint into account\nC  A higher reported profit\nD  Information required by tax legislation",
    plan: [
      {
        step: "Separate the definition from the recognition criteria",
        detail:
          "Meeting the definition is necessary but NOT sufficient. Recognition additionally requires that it produces relevant information and a faithful representation, subject to cost.",
      },
      {
        step: "See why an item can be defined and not recognised",
        detail:
          "Where existence is uncertain, or the probability of benefits is low, or no reliable measure exists, recognition may produce information that is not relevant or not faithful. So the item is disclosed instead.",
      },
      {
        step: "Reject certainty as a criterion",
        detail:
          "Certainty is never required. Measurement uncertainty does not preclude recognition — it is one factor in judging whether the resulting information is a faithful representation.",
      },
      {
        step: "State the derecognition rule",
        detail:
          "Derecognition normally occurs when CONTROL of the asset is lost, or when the entity no longer has a present obligation. It follows the definition rather than the cash.",
      },
    ],
    answer:
      "**B — relevant information, and a faithful representation, taking the cost constraint into account.**\n\nMeeting the definition is **necessary but not sufficient**. Recognition additionally requires that recognising the item produces **relevant** information and a **faithful representation**, subject to the **cost constraint** — which is the Framework's qualitative characteristics doing real work rather than sitting as theory.\n\nSo an item can satisfy the definition and still not be recognised. Where the **existence** of the asset is uncertain, the **probability** of benefits is low, or **no reliable measure** exists, recognition may produce information that is neither relevant nor faithful — and the item is **disclosed** instead.\n\nOption A is the error to avoid: **certainty is never required**. Measurement uncertainty does not preclude recognition; it is one factor in judging whether the resulting information faithfully represents the position.\n\n**Derecognition** follows the definition rather than the cash: an asset is derecognised when the entity **loses control** of it, and a liability when the entity **no longer has a present obligation**. That is why a sale with substantial retained risks may not result in derecognition.",
    earns: [
      "Separating the definition from the recognition criteria and knowing an item can pass one and fail the other",
      "Knowing derecognition follows loss of control rather than receipt of cash",
    ],
    loses: ["Requiring certainty, which no recognition criterion demands"],
  },

  /* ── FR-04 · Measurement, capital maintenance, going concern ─ */

  "FR-04::the-bases": {
    title: "Choosing between historical cost and a current value",
    format: "ot",
    marks: 2,
    requirement:
      "Which is **not** a current value measurement basis under the Conceptual Framework?\n\nA  Fair value\nB  Value in use for assets, and fulfilment value for liabilities\nC  Current cost\nD  Historical cost",
    plan: [
      {
        step: "Split the bases into the two families",
        detail:
          "HISTORICAL COST: the value of the transaction that created the item, updated for consumption and impairment. CURRENT VALUE: fair value, value in use and fulfilment value, and current cost.",
      },
      {
        step: "Read the polarity and identify the outsider",
        detail:
          "Three options are current value bases. Historical cost is the other family, so it is the answer.",
      },
      {
        step: "Note what each current value basis reflects",
        detail:
          "Fair value: a market participant's perspective at the measurement date. Value in use and fulfilment value: the ENTITY'S OWN expected cash flows. Current cost: the cost of an equivalent asset today.",
      },
      {
        step: "Note the trade-off that decides the choice",
        detail:
          "Historical cost is verifiable and comparable over time but can become irrelevant. Current values are relevant but less verifiable and more volatile. The choice is a relevance-against-faithfulness judgement.",
      },
    ],
    answer:
      "**D — historical cost.**\n\nThe bases fall into two families. **Historical cost** reflects the value of the transaction that created the item, updated for consumption, impairment and collection. **Current value** comprises **fair value**, **value in use** (for assets) and **fulfilment value** (for liabilities), and **current cost**.\n\nWhat each current value basis reflects differs in an examinable way: **fair value** takes a **market participant's** perspective at the measurement date, while **value in use** and **fulfilment value** take the **entity's own** expected cash flows — so the two can differ materially for the same asset. **Current cost** is the cost of an equivalent asset today.\n\nThe choice is a genuine trade-off between the qualitative characteristics. **Historical cost** is verifiable, understandable and comparable over time, but can become irrelevant as conditions change. **Current values** are more relevant but less verifiable, more volatile, and often more costly to obtain.\n\nSo measurement is where relevance and faithful representation pull hardest against each other, and the Framework does not prescribe one basis for everything.",
    earns: [
      "Splitting fair value's market perspective from value in use's entity-specific one",
      "Framing the choice as a relevance-versus-faithfulness trade-off",
    ],
    loses: ["Treating current cost as historical cost because both reference cost"],
  },

  "FR-04::going-concern": {
    title: "What the going concern assumption changes",
    format: "ot",
    marks: 2,
    requirement:
      "Where an entity is not a going concern, its financial statements must:\n\nA  Not be prepared\nB  Be prepared on a different basis, with that basis and the reason disclosed\nC  Be prepared on the same basis with a note added\nD  Show assets at historical cost",
    plan: [
      {
        step: "State what the assumption underpins",
        detail:
          "Financial statements are normally prepared on the assumption that the entity is a going concern and will continue in operation for the foreseeable future. Every measurement rests on it.",
      },
      {
        step: "Say what changes when it fails",
        detail:
          "The BASIS of preparation changes: assets are measured at amounts recoverable on realisation rather than through use, and liabilities may fall due immediately.",
      },
      {
        step: "State the disclosure requirement",
        detail:
          "The basis used and the reason the entity is not a going concern must both be disclosed. So users are told why the statements look different, rather than left to infer it.",
      },
      {
        step: "Note the middle case, which is examined most",
        detail:
          "Where there is MATERIAL UNCERTAINTY but the going concern basis is still appropriate, the statements are prepared on that basis and the uncertainty is DISCLOSED. That is not the same as abandoning the basis.",
      },
    ],
    answer:
      "**B — be prepared on a different basis, with that basis and the reason disclosed.**\n\nFinancial statements are normally prepared on the assumption that the entity will **continue in operation for the foreseeable future**, and every measurement rests on it — assets are carried at amounts recoverable through **continued use**.\n\nWhen the assumption fails, the **basis of preparation** changes: assets are measured at amounts recoverable on **realisation**, which is generally far less for specialised assets, and liabilities may fall due immediately. Both the **basis used** and the **reason** must be disclosed, so users are told why the statements look different rather than left to infer it.\n\nStatements are still required — arguably more urgently — so option A is wrong.\n\nThe **middle case** is the one examined most and the one option C half-describes: where there is **material uncertainty** about going concern but the basis remains appropriate, the statements **are** prepared on the going concern basis and the **uncertainty is disclosed**. That is a disclosure matter, not a change of basis — and confusing the two is the error, because it either understates a genuine failure or overstates a manageable doubt.",
    earns: [
      "Knowing both the basis and the reason must be disclosed",
      "Separating material uncertainty (disclose) from failure of the assumption (change the basis)",
    ],
    loses: ["Treating material uncertainty as requiring a change in the basis of preparation"],
  },

  "FR-04::capital-maintenance": {
    title: "Two concepts of capital, two definitions of profit",
    format: "ot",
    marks: 2,
    requirement:
      "Under the **physical** capital maintenance concept, profit is earned only if:\n\nA  Net assets in money terms have increased\nB  The entity's physical productive capacity at the end of the period exceeds that at the beginning\nC  Revenue exceeds costs\nD  Cash has increased",
    plan: [
      {
        step: "State the two concepts",
        detail:
          "FINANCIAL capital maintenance: profit is the increase in net assets in MONEY terms (or in constant purchasing power). PHYSICAL: profit arises only if physical productive CAPACITY has increased.",
      },
      {
        step: "See what the physical concept excludes",
        detail:
          "The cost of replacing the assets consumed. So a price rise that leaves the entity able to replace only what it had produces NO profit, however the money figures look.",
      },
      {
        step: "Note where the difference goes",
        detail:
          "Under the physical concept, holding gains from changes in asset prices are treated as CAPITAL MAINTENANCE ADJUSTMENTS in equity rather than as profit. Under the financial concept they can be profit.",
      },
      {
        step: "Note why it matters in inflation",
        detail:
          "In a period of rising prices, financial capital maintenance can report a profit an entity cannot distribute without shrinking. The physical concept protects operating capability.",
      },
    ],
    answer:
      "**B — the entity's physical productive capacity at the end of the period exceeds that at the beginning.**\n\nThe two concepts define profit differently. **Financial** capital maintenance: profit is the increase in **net assets in money terms**, or in constant purchasing power. **Physical**: profit arises only where **physical productive capacity** has increased.\n\nWhat the physical concept effectively deducts is the **cost of replacing the assets consumed**. So a price rise that leaves the entity able to replace only what it had produces **no profit**, however favourable the money figures look.\n\nThat determines where the difference is reported: under the physical concept, **holding gains** from changes in asset prices are **capital maintenance adjustments within equity**, not profit. Under the financial concept they can be profit.\n\nWhy it matters is clearest in **inflation**: financial capital maintenance can report a profit the entity cannot distribute without **shrinking its operating capability**, because replacing its assets now costs more than they originally did. The physical concept exists to prevent that.\n\nOption C describes profit loosely without reference to either concept, which is what the question is testing.",
    earns: [
      "Knowing holding gains go to equity under the physical concept and can be profit under the financial one",
      "Explaining why the distinction matters in inflation",
    ],
    loses: ["Describing profit as revenue less costs, which engages neither concept"],
  },

  /* ── FR-05 · Regulatory framework and the preparer ─────────── */

  "FR-05::the-bodies": {
    title: "Which body does what in standard setting",
    format: "ot",
    marks: 2,
    requirement:
      "Which body issues IFRS Accounting Standards?\n\nA  The IFRS Foundation\nB  The International Accounting Standards Board\nC  The IFRS Interpretations Committee\nD  The IFRS Advisory Council",
    plan: [
      {
        step: "Give each body one role",
        detail:
          "IFRS Foundation: oversight and governance, appoints and funds. IASB: develops and ISSUES standards. IFRS Interpretations Committee: issues interpretations on application. IFRS Advisory Council: advises on the agenda and priorities.",
      },
      {
        step: "Match the verb in the stem",
        detail:
          "\"Issues standards\" is the IASB's function alone. Every other body has a real role and none of them writes standards.",
      },
      {
        step: "Guard the Foundation boundary",
        detail:
          "The Foundation is the most attractive distractor because its name contains \"IFRS\". It oversees and funds; the Board writes. That single split is the question.",
      },
      {
        step: "Note the Monitoring Board and the ISSB",
        detail:
          "The Monitoring Board provides a link to public authorities and oversees the Foundation's trustees. The ISSB sits alongside the IASB issuing sustainability disclosure standards.",
      },
    ],
    answer:
      "**B — the International Accounting Standards Board.**\n\nOne role each: the **IFRS Foundation** oversees, appoints Board members and secures funding but writes nothing. The **IASB** develops and **issues** IFRS Accounting Standards. The **IFRS Interpretations Committee** issues interpretations on how an existing standard applies to a particular situation. The **IFRS Advisory Council** advises on the agenda and priorities.\n\nThe Foundation is the strongest distractor because its name carries \"IFRS\", and separating **oversight** from **standard-setting** is the whole question.\n\nTwo further bodies complete the structure: the **Monitoring Board** provides the link to public authorities and oversees the Foundation's trustees, giving the structure public accountability without political control of the standards themselves. And the **ISSB** sits alongside the IASB issuing **sustainability** disclosure standards.\n\nNational regulators and company law then **adopt** IFRS and decide which entities must apply them — adoption is not issue, and an entity's obligation to comply comes from its own jurisdiction rather than from the IASB.",
    earns: [
      "Separating oversight, standard-setting, interpretation and advice",
      "Knowing the obligation to comply comes from national adoption rather than from the IASB",
    ],
    loses: ["Choosing the Foundation because its name contains the standards' name"],
  },

  "FR-05::due-process": {
    title: "Why the stages of standard setting exist",
    format: "ot",
    marks: 2,
    requirement:
      "The IASB issues an exposure draft before issuing a standard principally in order to:\n\nA  Delay the standard\nB  Obtain public comment on the proposed wording, giving the standard legitimacy and improving it\nC  Satisfy a legal requirement\nD  Test whether preparers can compute the figures",
    plan: [
      {
        step: "Set the stages out in order",
        detail:
          "Agenda consultation → research, often a discussion paper → EXPOSURE DRAFT → consideration of comments received → issue of the standard → post-implementation review.",
      },
      {
        step: "Name what public comment achieves",
        detail:
          "Two things. It improves the standard, because preparers and users identify consequences the Board did not foresee. And it gives the standard LEGITIMACY, because those bound by it were heard.",
      },
      {
        step: "See why legitimacy matters particularly here",
        detail:
          "The IASB has no legal authority of its own — its standards bind only because jurisdictions adopt them. Due process is what makes adoption defensible, so it is not a formality.",
      },
      {
        step: "Split the exposure draft from the discussion paper",
        detail:
          "A discussion paper canvasses the issue before proposals are settled. An exposure draft sets out the Board's ACTUAL PROPOSED WORDING for comment.",
      },
    ],
    answer:
      "**B — obtain public comment on the proposed wording, giving the standard legitimacy and improving it.**\n\nPublic comment achieves two things. It **improves** the standard, because preparers, auditors and users identify consequences the Board did not foresee. And it confers **legitimacy**, because those who will be bound by it were heard first.\n\nLegitimacy matters more here than it might elsewhere: the **IASB has no legal authority of its own**, and its standards bind only because jurisdictions choose to adopt them. Due process is what makes that adoption defensible, so it is a substantive requirement rather than a formality — which is why option C's framing as a legal obligation is the wrong reason for the right activity.\n\nThe stages run: agenda consultation → research, often producing a **discussion paper** → **exposure draft** → consideration of comments → issue → **post-implementation review**.\n\nThe distinction between the two consultation documents is examined: a **discussion paper** canvasses the issue **before** proposals are settled, while an **exposure draft** sets out the Board's **actual proposed wording**.",
    earns: [
      "Naming both improvement and legitimacy, and why legitimacy matters given the IASB's status",
      "Splitting the exposure draft from the discussion paper on whether proposals exist yet",
    ],
    loses: ["Treating due process as a legal formality rather than the basis for adoption"],
  },

  "FR-05::harmonisation": {
    title: "The case for harmonisation, and what obstructs it",
    format: "ot",
    marks: 2,
    requirement:
      "Which is the strongest obstacle to global harmonisation of financial reporting?\n\nA  A shortage of accountants\nB  Differences in legal systems, tax systems, culture and the strength of national standard setters\nC  The cost of printing standards\nD  Disagreement about the alphabet used",
    plan: [
      {
        step: "Name the benefits first, since a discussion answer needs both sides",
        detail:
          "Comparability for investors across borders, a lower cost of capital, easier cross-border listing and consolidation for groups, and cheaper reporting for multinationals than multiple bases.",
      },
      {
        step: "Name the obstacles",
        detail:
          "Different legal systems, tax systems tied to reported profit, cultural attitudes to disclosure and conservatism, national pride and the strength of existing national standard setters, and differing economic environments.",
      },
      {
        step: "Identify the tax link as the hardest",
        detail:
          "Where taxable profit is computed directly from reported profit, changing an accounting standard changes tax revenue. That gives governments a direct fiscal reason to resist, which no argument about comparability answers.",
      },
      {
        step: "Reject the trivial options",
        detail:
          "Printing costs and alphabets are not obstacles. A shortage of accountants is a real constraint on implementation but not on harmonisation itself.",
      },
    ],
    answer:
      "**B — differences in legal systems, tax systems, culture and the strength of national standard setters.**\n\nThe **benefits** need stating too for a discussion answer: **comparability** for investors across borders, a **lower cost of capital** because investors bear less uncertainty, easier **cross-border listing**, simpler **consolidation** for multinational groups, and cheaper reporting than maintaining several bases.\n\nThe **obstacles** are legal systems that embed accounting requirements in company law, **tax systems** tied to reported profit, **cultural** differences in attitudes to disclosure and conservatism, **national pride** and the standing of existing national standard setters, and genuinely different economic environments.\n\nThe **tax link** is the hardest of them and worth identifying as such: where taxable profit is computed directly from reported profit, changing an accounting standard **changes tax revenue** — which gives governments a direct fiscal reason to resist that no argument about comparability can answer.\n\nOptions C and D are trivial. A shortage of accountants is a real constraint on **implementing** IFRS in a jurisdiction, but not an obstacle to harmonisation itself.",
    earns: [
      "Giving both benefits and obstacles, and identifying the tax link as the hardest",
      "Distinguishing an obstacle to harmonisation from a constraint on implementation",
    ],
    loses: ["Listing obstacles without explaining why any of them is difficult to overcome"],
  },

  "FR-05::ethics": {
    title: "Recognising creative accounting and the preparer's duty",
    format: "ot",
    marks: 2,
    requirement:
      "A finance director proposes classifying a routine operating cost as an exceptional item to improve the reported operating margin. The accountant should:\n\nA  Comply, as classification is a matter of judgement\nB  Refuse, because the classification is not a faithful representation and would mislead users\nC  Comply if the amount is immaterial\nD  Comply but disclose the classification in the notes",
    plan: [
      {
        step: "Identify what the proposal does",
        detail:
          "It moves a recurring cost out of the figure users rely on to assess ongoing performance. The total profit is unchanged, which is what makes it feel harmless.",
      },
      {
        step: "Name the characteristic it breaches",
        detail:
          "FAITHFUL REPRESENTATION, through the loss of NEUTRALITY. Presenting a routine cost as exceptional is a biased depiction chosen to produce a particular impression.",
      },
      {
        step: "Reject the disclosure defence",
        detail:
          "Option D is the sophisticated wrong answer. Disclosure does not cure a misleading primary statement — a user reading the operating margin has been misled whether or not a note explains it.",
      },
      {
        step: "Name the professional principles engaged",
        detail:
          "INTEGRITY and OBJECTIVITY, and the accountant should refuse, escalate, document, take advice from their professional body, and be prepared to resign if it cannot be resolved.",
      },
    ],
    answer:
      "**B — refuse, because the classification is not a faithful representation and would mislead users.**\n\nThe proposal moves a **recurring** cost out of the figure users rely on to assess **ongoing** performance. Total profit is unchanged, which is exactly what makes it feel harmless — and why it is a favourite of creative accounting.\n\nThe characteristic breached is **faithful representation**, through the loss of **neutrality**: presenting a routine cost as exceptional is a biased depiction chosen to produce a particular impression.\n\nOption D is the sophisticated wrong answer and worth refuting directly. **Disclosure does not cure a misleading primary statement.** A user who reads the operating margin has been misled whether or not a note elsewhere explains the classification, and \"we disclosed it\" is not a defence to a distorted headline figure.\n\nOption C misuses materiality: the item's materiality is what determines whether the misclassification matters, not whether it is acceptable.\n\nThe principles engaged are **integrity** and **objectivity**. The route is refuse, escalate internally, **document** each step, take confidential advice from the professional body, and be prepared to **resign** if it cannot be resolved.",
    earns: [
      "Naming neutrality as what is breached, and refusing the disclosure defence",
      "Giving the professional steps rather than only the accounting conclusion",
    ],
    loses: ["Accepting the treatment on the basis that it is disclosed in the notes"],
  },

  /* ── FR-06 · Concepts of groups ────────────────────────────── */

  "FR-06::why-consolidate": {
    title: "The single economic entity concept",
    format: "ot",
    marks: 2,
    requirement:
      "Consolidated financial statements are prepared because:\n\nA  Company law requires a separate set for each subsidiary\nB  The parent's own statements show the investment at cost or fair value, which tells users nothing about the assets and liabilities the group controls\nC  Subsidiaries do not prepare their own statements\nD  It reduces the group's tax liability",
    plan: [
      {
        step: "Identify what the parent's own statements show",
        detail:
          "A single line — investment in subsidiary, at cost or fair value. That says nothing about the resources the group controls or the obligations it has taken on.",
      },
      {
        step: "State the concept that justifies consolidation",
        detail:
          "The SINGLE ECONOMIC ENTITY concept: the group is presented as though it were one entity, because that is the economic substance the parent's shareholders have an interest in.",
      },
      {
        step: "See what consolidation therefore does",
        detail:
          "Adds 100% of the subsidiary's assets and liabilities line by line — because the group CONTROLS them all — and recognises a non-controlling interest for the share not owned.",
      },
      {
        step: "Reject the legal and tax options",
        detail:
          "Subsidiaries do prepare their own statements, and consolidation does not affect tax, which is assessed on legal entities. The reason is informational, not legal or fiscal.",
      },
    ],
    answer:
      "**B — the parent's own statements show the investment at cost or fair value, which tells users nothing about the assets and liabilities the group controls.**\n\nIn the parent's individual statements the subsidiary appears as a **single line** — investment in subsidiary. That reveals nothing about the resources the group controls or the obligations it has assumed, which is precisely the information the parent's shareholders need.\n\nThe justification is the **single economic entity concept**: the group is presented as though it were **one entity**, because that is the economic substance in which the parent's shareholders have an interest.\n\nWhat follows is the mechanics: **100%** of the subsidiary's assets and liabilities are added **line by line**, because the group **controls** all of them, and a **non-controlling interest** is recognised for the share not owned. The parent's investment and the subsidiary's equity are **cancelled** against each other, which is what the goodwill calculation does.\n\nSubsidiaries do still prepare their own statements, and consolidation has **no effect on tax**, which is assessed on legal entities — so the reason is informational rather than legal or fiscal.",
    earns: [
      "Explaining what the single line fails to tell users, then naming the concept",
      "Knowing consolidation has no tax effect because tax follows legal entities",
    ],
    loses: ["Attributing consolidation to a legal or tax requirement"],
  },

  "FR-06::control": {
    title: "Applying the definition of control",
    format: "ot",
    marks: 2,
    requirement:
      "P holds 45% of the equity shares of S. The remaining shares are held by thousands of small investors, and P has always been able to direct S's operating policies. P should:\n\nA  Treat S as an associate, because the holding is below 50%\nB  Consolidate S as a subsidiary, because P has control in substance\nC  Measure S at fair value as an investment\nD  Treat S as a joint venture",
    plan: [
      {
        step: "State the three elements of control",
        detail:
          "POWER over the investee, EXPOSURE to variable returns, and the ABILITY to use that power to affect those returns. All three are required, and none of them is a shareholding.",
      },
      {
        step: "Note that a majority holding is evidence, not the test",
        detail:
          "More than 50% usually gives control, but the test is power in substance. A holding below 50% can give de facto control where the remaining shares are widely dispersed.",
      },
      {
        step: "Apply it to the facts",
        detail:
          "Thousands of small holders cannot practically act together, and P has consistently directed operating policies. That is DE FACTO control, so S is a subsidiary and is fully consolidated.",
      },
      {
        step: "Note the other routes to control",
        detail:
          "A contractual right to appoint a majority of the board, an agreement with other shareholders, or potential voting rights that are currently exercisable. Substance over the shareholding throughout.",
      },
    ],
    answer:
      "**B — consolidate S as a subsidiary, because P has control in substance.**\n\nControl requires three elements together: **power** over the investee, **exposure to variable returns**, and the **ability to use that power to affect** those returns. **None of them is a shareholding**, and that is the point.\n\nA holding above 50% is **evidence** of control rather than the test. Here, thousands of small holders **cannot practically act together**, and P has consistently directed S's operating policies — which is **de facto control**. So S is a subsidiary and is **fully consolidated**, with a non-controlling interest of 55%.\n\nOption A applies the percentage as though it were the rule, which is the error the facts are constructed to catch.\n\nThe other routes to control are worth holding: a **contractual right to appoint a majority of the board**, an **agreement with other shareholders**, and **potential voting rights** that are currently exercisable. Substance governs throughout.\n\n**Significant influence** — presumed at 20% to 50% without control — gives an **associate** instead, and the difference in presentation is dramatic: full consolidation against a single equity-accounted line.",
    earns: [
      "Applying the three elements and recognising de facto control from dispersed holdings",
      "Knowing full consolidation follows control regardless of the percentage, with NCI for the rest",
    ],
    loses: ["Treating 50% as the test rather than as evidence"],
  },

  "FR-06::sub-assoc-jv": {
    title: "Which accounting each relationship attracts",
    format: "ot",
    marks: 2,
    requirement:
      "An investment giving the investor **joint control** under a contractual arrangement is accounted for in the consolidated financial statements using:\n\nA  Full consolidation\nB  The equity method\nC  Fair value through profit or loss\nD  Proportionate consolidation",
    plan: [
      {
        step: "Map each relationship to its accounting",
        detail:
          "CONTROL → subsidiary → full consolidation. JOINT CONTROL of a joint venture → equity method. SIGNIFICANT INFLUENCE → associate → equity method. Neither → financial asset under IFRS 9.",
      },
      {
        step: "Note that joint ventures and associates share a method",
        detail:
          "Both use the equity method, so the accounting is the same even though the relationship differs. That surprises candidates who expect three relationships to give three methods.",
      },
      {
        step: "Reject proportionate consolidation",
        detail:
          "It is no longer permitted for joint ventures. Option D is offered because older material used it, and it remains the most plausible wrong answer.",
      },
      {
        step: "Note the joint operation exception",
        detail:
          "A joint OPERATION is different: the party recognises its own share of the assets, liabilities, revenue and expenses directly. So the arrangement's classification has to be settled first.",
      },
    ],
    answer:
      "**B — the equity method.**\n\nMap the relationship to the accounting: **control** gives a **subsidiary** and **full consolidation**; **joint control** of a **joint venture** gives the **equity method**; **significant influence** gives an **associate** and also the **equity method**; and where none applies, the investment is a **financial asset** under IFRS 9.\n\nThe point that surprises candidates is that **joint ventures and associates share a method** — three different relationships do not produce three different methods.\n\nOption D is the strongest distractor because **proportionate consolidation** was previously permitted for joint ventures and is no longer allowed. Anyone working from older material will choose it.\n\nThe exception to check first is a **joint operation** rather than a joint venture: there, each party recognises **its own share of the assets, liabilities, revenue and expenses directly**. So the classification of the arrangement has to be settled before the method is chosen, and \"joint\" alone does not determine the answer.\n\nThe equity method records the investment at **cost plus the group's share of post-acquisition changes in net assets**, as a single line in non-current assets.",
    earns: [
      "Knowing joint ventures and associates share the equity method",
      "Checking for a joint operation before applying the joint venture treatment",
    ],
    loses: ["Choosing proportionate consolidation, which is no longer permitted"],
  },

  "FR-06::nci": {
    title: "What the non-controlling interest is, and where it sits",
    format: "ot",
    marks: 2,
    requirement:
      "In the consolidated statement of financial position, the non-controlling interest is presented:\n\nA  As a liability, because the amount is owed to outside shareholders\nB  Within equity, separately from the equity attributable to the owners of the parent\nC  As a deduction from goodwill\nD  Not at all, since only the group's share is consolidated",
    plan: [
      {
        step: "Ask whether the NCI meets the liability definition",
        detail:
          "No. There is no present obligation to transfer an economic resource to the non-controlling shareholders — they are OWNERS of part of the group, not creditors of it.",
      },
      {
        step: "Derive the presentation",
        detail:
          "It sits WITHIN equity, presented separately from the equity attributable to the parent's owners. Two classes of owner, both in equity, distinguished.",
      },
      {
        step: "Reject the option that omits it",
        detail:
          "Option D describes proportionate consolidation. Under full consolidation 100% of the subsidiary's assets and liabilities are included, so the NCI is what makes the statement balance.",
      },
      {
        step: "Note the same split in profit or loss",
        detail:
          "Profit for the year is presented in total and then ATTRIBUTED between the owners of the parent and the NCI. The attribution is a presentation split, not a deduction from profit.",
      },
    ],
    answer:
      "**B — within equity, separately from the equity attributable to the owners of the parent.**\n\nStart from the definition: the NCI is **not a liability**, because there is **no present obligation to transfer an economic resource** to those shareholders. They are **owners of part of the group**, not creditors of it — so option A fails on the liability definition rather than on convention.\n\nThat gives the presentation: within **equity**, shown **separately** from the equity attributable to the parent's owners. Two classes of owner, both in equity, distinguished so users can see which portion is theirs.\n\nOption D describes **proportionate consolidation**: under **full** consolidation, **100%** of the subsidiary's assets and liabilities are included because the group controls them all — and the NCI is precisely what makes the statement balance once that has been done.\n\nThe same split appears in **profit or loss**: total profit for the year is presented and then **attributed** between the owners of the parent and the NCI. That attribution is a **presentation split, not a deduction** from profit — so group profit is not reduced by the NCI's share, it is divided.\n\nNCI may be measured at **fair value** or at its **proportionate share of net assets**, and the choice affects goodwill.",
    earns: [
      "Rejecting the liability treatment from the liability definition itself",
      "Knowing the profit attribution is a split rather than a deduction",
    ],
    loses: ["Presenting the NCI as a liability, or omitting it as if only the group share were consolidated"],
  },
}
