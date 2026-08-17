import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area B — The financial reporting framework.
 *
 * The shim relabelled five sections of the legacy conceptual-framework chapter
 * as the whole of Area B. The area's single study-guide subsection (B1) carries
 * five dense learning outcomes spanning standard-setting, the objective and
 * qualitative characteristics, recognition, derecognition, measurement,
 * materiality and the reporting of items in profit or loss versus OCI — a
 * five-chapter tree, not five borrowed sections.
 *
 *   SBR-04  The Framework and how standards get made          (B1a)
 *   SBR-05  Useful information: objective and characteristics (B1b, B1c)
 *   SBR-06  Elements, recognition and derecognition           (B1e definitions side)
 *   SBR-07  Measurement, uncertainty and materiality          (B1d)
 *   SBR-08  Profit or loss, OCI and recycling                 (B1e reporting side)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text —
 * authored from the public syllabus and the IASB's Conceptual Framework
 * structure. In SBR the Framework is examined as a REASONING TOOL: the exam
 * gives a transaction no standard cleanly covers, or a treatment that follows
 * a standard's letter against its purpose, and pays for Framework-based
 * argument. Every chapter here teaches the argument, not the recitation.
 */

const SBR_TREE_04: StudyChapter = {
  paper: "SBR",
  id: "SBR-04",
  number: 4,
  area: "B",
  syllabusRefs: ["B1(a)"],
  title: "The Framework and how standards get made",
  minutes: 15,
  intro:
    "The Conceptual Framework is not a standard and overrides nothing — yet SBR examines it constantly. Its power is as the reasoning that underpins every standard, fills every gap, and arms you to critique treatments that follow rules while defeating their purpose.",
  outcomes: [
    "Explain what the Conceptual Framework is for and what it deliberately is not",
    "Use IAS 8's hierarchy to develop a policy where no IFRS standard specifically applies",
    "Describe how a standard moves from research to issue, and why due process matters to its authority",
    "Argue both sides of principles-based versus rules-based standard setting with scenario evidence",
    "Critique a proposed treatment from the Framework when the standards leave room",
  ],
  sections: [
    {
      id: "what-the-framework-is-for",
      heading: "What the Framework does — and deliberately does not do",
      blocks: [
        {
          kind: "text",
          md: "The Conceptual Framework is the IASB's own statement of the concepts that underlie its standards: whom reporting serves, what makes information useful, what the elements are, when they are recognised, and how they can be measured. Three jobs follow. It gives the **Board** a consistent intellectual base so each new standard is reasoned from the same premises rather than negotiated from scratch. It gives **preparers** a source of policy when no standard specifically applies. And it gives **everyone** — including SBR candidates — the vocabulary for evaluating whether a standard, or a treatment under one, actually produces useful information.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The status point the examiner rewards",
          md: "The Framework is **not a standard and never overrides one**. Where a standard conflicts with the Framework — and a few deliberately do — the standard wins. Getting this the right way round matters: an answer that 'corrects' IFRS using the Framework has the hierarchy backwards, while an answer that uses the Framework to *criticise* the outcome, or to build policy where standards are silent, is doing exactly what SBR wants.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "IAS 8's hierarchy when no standard specifically applies",
            data: {
              steps: [
                { label: "A specific IFRS?", sub: "Apply it — the search ends" },
                { label: "Analogy", sub: "Standards on similar and related issues" },
                { label: "The Framework", sub: "Definitions, recognition and measurement concepts" },
                { label: "Other sources", sub: "Other standard-setters with a similar framework, if not in conflict" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "That hierarchy is a genuinely examinable skill because contemporary scenarios keep producing transactions the standards never anticipated — cryptocurrency holdings, carbon credits and emissions schemes, novel financing structures. The rewarded answer walks the ladder in order: no specific standard, the closest analogies and why they fit or fail, then a policy reasoned from the Framework's definitions and recognition criteria. The walk itself earns the marks; the destination is often arguable either way.",
        },
      ],
      check: {
        q: "An entity holds cryptocurrency for long-term investment. No IFRS mentions cryptocurrency by name. What is the correct first move in developing an accounting policy?",
        options: [
          "Apply the Conceptual Framework directly, as the highest authority",
          "Ask whether any existing standard's scope actually covers the asset — intangibles or inventories — before reaching for analogy or the Framework",
          "Copy the treatment used by a US-listed competitor",
          "Measure at fair value through profit or loss, since that is most relevant",
        ],
        correct: 1,
        explain:
          "The IAS 8 ladder starts with scope, not with the Framework: an asset with no physical substance held for investment falls within IAS 38's definition of an intangible, however awkward the measurement outcome. The Framework enters only when standards and analogy run out — and 'most relevant' (option 3) is a conclusion, not a source of authority.",
      },
    },
    {
      id: "due-process",
      heading: "Due process, and why it is the standard's authority",
      blocks: [
        {
          kind: "text",
          md: "An IFRS standard binds thousands of entities that never voted for it. Its legitimacy rests on **due process**: research and discussion papers first, a public exposure draft with comment period, redeliberation in open meetings, a considered basis for conclusions, and post-implementation review once the standard has been lived with. The process is slow by design — it is where preparers, auditors, users and regulators contest the requirements before they harden.",
        },
        {
          kind: "text",
          md: "SBR expects a grown-up view of the politics. Standard-setting attracts **lobbying**, and the exam's classic evidence is financial instruments: banks have fought measurement and impairment requirements for as long as they have existed, and the delayed, compromised history of those standards shows both due process working (real problems surfaced in comment letters were fixed) and its cost (concessions to pressure rather than principle). An evaluation answer can cite the mechanism without needing any particular episode's dates.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Evaluating the regulatory framework — the arguments that score",
          items: [
            "**Enforcement gap** — the IASB writes standards but cannot enforce them; adoption and policing are national, so identical words produce different practice across jurisdictions",
            "**Endorsement politics** — jurisdictions can carve out or delay requirements, weakening comparability the standards exist to provide",
            "**Consistency payoff** — a single global language of reporting lowers the cost of capital and makes cross-border comparison possible at all",
            "**Speed** — due process takes years, while transactions innovate in months; the gap is where creative structures live",
            "**Complexity drift** — each anti-abuse patch makes the standard longer and more rules-like, eroding the principles-based ideal",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Principles versus rules is an argument, not a fact",
          md: "Principles-based standards demand judgement, travel across jurisdictions and are harder to engineer around — but produce divergence in practice and give bias room to operate. Rules give certainty and auditability — and invite structures built to the bright line. SBR pays for deploying **both** sides against the scenario, then committing: usually, that principles plus disclosure of judgement beats rules plus engineered compliance.",
        },
      ],
      check: {
        q: "A director argues that because IFRS standards go through public consultation, a treatment that complies with their words cannot be criticised. Which response best reflects the SBR view?",
        options: [
          "Agreed — due process makes the words definitive",
          "Due process legitimises the standard, not every use of it: a treatment can satisfy the words while defeating the objective, and faithful representation is judged against substance",
          "Standards have no authority because the IASB cannot enforce them",
          "Only national regulators can decide whether a treatment is acceptable",
        ],
        correct: 1,
        explain:
          "Two different things are being conflated: the authority of the standard (which due process supports) and the honesty of a particular application (which it cannot guarantee). The exam's recurring pattern is letter-versus-purpose, and the Framework's qualitative characteristics are the critique tool. Options 2 and 3 each overstate a real point — the enforcement gap — into a false conclusion.",
      },
    },
    {
      id: "framework-as-critique",
      heading: "Using the Framework as a critique tool",
      blocks: [
        {
          kind: "text",
          md: "The highest-value Framework skill in SBR is critique: taking a treatment the standards arguably permit and testing it against the concepts. Does the resulting information faithfully represent the substance? Does it help users assess future cash flows and management's stewardship? Would recognising, or not recognising, this item make the statements more or less complete? These questions convert a technical dispute into an argument you can win marks with either way — provided the reasoning shows.",
        },
        {
          kind: "illustration",
          title: "Letter versus purpose, in one structure",
          md: "An entity sells a building to a bank and simultaneously agrees to repurchase it in two years at a price fixed today at cost plus a lender's return. Read as two transactions, there is a sale and a separate future purchase — revenue now, asset gone. Read as one arrangement, the entity has borrowed against the building: the 'sale price' is principal, the repurchase premium is interest, and the building never left the entity's control in substance. The Framework's insistence that faithful representation means representing **economic phenomena in substance** rather than legal form — and IFRS 15's control test, which reaches the same answer — is what makes the second reading the reportable one.",
        },
        {
          kind: "examQuestion",
          title: "Develop and justify an accounting policy where no standard applies",
          format: "written",
          marks: 8,
          requirement: "Discuss how the entity should determine its accounting policy for the new class of asset, and recommend a treatment.",
          plan: [
            { step: "Establish the gap honestly", detail: "Show that no standard's scope covers the item — checking the near-misses explicitly, since a scope answer beats an analogy answer whenever one exists." },
            { step: "Walk IAS 8's ladder in order", detail: "Analogous standards first, with reasons they fit or fail; the Framework's definitions and recognition criteria next." },
            { step: "Apply the definitions to the facts", detail: "Is there a present economic resource controlled from a past event? Does recognition give relevant, faithfully representative information?" },
            { step: "Choose a measurement basis and defend it", detail: "Historical cost versus a current value, argued from what users of this entity's statements need, and from how the asset produces benefits." },
            { step: "Recommend, and require disclosure", detail: "Commit to one treatment; note that the judgement itself is disclosable under IAS 1's significant-judgement requirements." },
          ],
          answer:
            "No IFRS standard specifically addresses the entity's holdings of verified carbon credits acquired for future surrender. IAS 8 therefore requires management to develop a policy producing relevant and reliable information, looking first to standards on similar issues and then to the Conceptual Framework.\n\nTwo analogies are available. IAS 38 covers identifiable non-monetary assets without physical substance, which the credits are; IAS 2 covers assets held for consumption in operations, which reflects their purpose. Treating the credits as intangibles measured at cost with impairment review fits their nature but reports nothing of price movement; an inventory reading fits their use but sits oddly with their financial character.\n\nUnder the Framework the credits qualify as assets: a right with the potential to produce economic benefits, controlled through registry title, arising from the purchase. Recognition at cost is verifiable; the question is whether cost-based measurement is the most relevant to users. Given the credits will be surrendered against emissions obligations rather than traded, cost with impairment — the IAS 38 analogy — represents their role in the business faithfully, with the compliance obligation accounted for separately as it accrues.\n\nThe entity should adopt the intangible-asset analogy, apply it consistently to the class, and disclose the policy choice and its basis as a significant judgement, since a different reasonable entity could have concluded otherwise.",
          earns: [
            "The scope search shown, not assumed",
            "Both analogies argued before either is chosen",
            "Framework definitions applied to the item's facts",
            "A committed recommendation with the judgement disclosed",
          ],
          loses: [
            "Jumping to the Framework while a plausible standard's scope was never tested",
            "Listing sources of guidance without applying any of them",
            "Refusing to recommend — 'it depends' scores the setup marks and forfeits the conclusion",
            "Omitting the disclosure of the judgement",
          ],
        },
      ],
      check: {
        q: "In the sale-and-repurchase structure above, which Framework concept does the two-transaction reading offend most directly?",
        options: [
          "Timeliness, because the repurchase is two years away",
          "Faithful representation, because the legal form of two contracts is being reported instead of the single financing arrangement they constitute in substance",
          "Comparability, because other entities do not use such structures",
          "Verifiability, because the repurchase price is an estimate",
        ],
        correct: 1,
        explain:
          "The repurchase price fixed at cost-plus-return means the risks and rewards of the building never left the seller — the pair of contracts is one borrowing. Reporting form over substance is precisely what faithful representation exists to prevent. The other characteristics are not engaged: the price is contractual (not an estimate), and comparability is about like-for-like reporting, not about how common a structure is.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using the Framework to overrule a standard that specifically applies.",
      fix: "The hierarchy runs the other way: standard first, Framework for gaps and for critique of outcomes.",
    },
    {
      trap: "Answering a policy-gap question with a treatment and no route.",
      fix: "The marks are in the walk — scope, analogy, Framework — taken in order and shown on the page.",
    },
    {
      trap: "Presenting principles-based standards as simply superior.",
      fix: "Argue both sides with scenario evidence, then commit; one-sided advocacy reads as recall, not evaluation.",
    },
    {
      trap: "Treating the IASB as a regulator.",
      fix: "It writes standards; adoption and enforcement are jurisdictional — the enforcement gap is an evaluation point in itself.",
    },
  ],
  keyTerms: [
    { term: "Conceptual Framework", def: "The IASB's statement of the concepts underlying IFRS — the objective of reporting, useful information, the elements, recognition, derecognition and measurement. Not a standard; overrides nothing." },
    { term: "Due process", def: "The public consultation route a standard travels — discussion paper, exposure draft, redeliberation, post-implementation review — which is the source of its legitimacy." },
    { term: "IAS 8 hierarchy", def: "Where no IFRS specifically applies: analogous standards first, then the Framework's definitions and concepts, then other standard-setters' pronouncements if consistent." },
    { term: "Principles-based standards", def: "Standards built on stated objectives and definitions requiring judgement in application — as against rules that specify bright-line treatments." },
    { term: "Endorsement", def: "A jurisdiction's formal adoption of an IFRS standard into local law, which can lag, amend or carve out requirements." },
  ],
  summary: [
    "The Framework underpins standards, fills gaps via IAS 8, and supplies the critique vocabulary — but never overrides a standard.",
    "A policy-gap answer walks scope, analogy, Framework in order, then commits and discloses the judgement.",
    "Due process legitimises standards while exposing them to lobbying; both halves are evaluation material.",
    "The enforcement gap, endorsement politics and the speed of transaction innovation are the standing weaknesses of the regime.",
    "The exam's recurring Framework question is letter versus purpose — and faithful representation of substance is the tool.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the Framework's three practical jobs?", a: "A consistent base for the IASB's standard-setting, a source of policy for preparers where standards are silent, and the concepts for evaluating whether reporting is useful." },
    { q: "Order the IAS 8 sources for a policy gap.", a: "Standards on similar or related issues by analogy; then the Framework's definitions and recognition and measurement concepts; then other standard-setters with compatible frameworks, if nothing conflicts." },
    { q: "Give two strengths and two weaknesses of the current standard-setting regime.", a: "Strengths: a global reporting language lowering capital costs, and due process that surfaces problems before standards harden. Weaknesses: no enforcement power of its own, and years-long due process that transactions outrun." },
    { q: "Why does SBR keep pairing the Framework with anti-abuse scenarios?", a: "Because structures engineered to a standard's words are tested against substance — and faithful representation of economic phenomena in substance is a Framework concept every answer can reach for." },
  ],
  furtherStudy: [
    "SBR-05 develops the objective and qualitative characteristics this chapter's critique tool draws on",
    "SBR-06 and SBR-07 supply the element definitions and measurement concepts the IAS 8 walk lands on",
    "SBR-01 uses the same letter-versus-purpose analysis for its ethics anchor",
    "Area F applies this chapter's reasoning to standards still in motion — new pronouncements and contemporary issues",
  ],
}

const SBR_TREE_05: StudyChapter = {
  paper: "SBR",
  id: "SBR-05",
  number: 5,
  area: "B",
  syllabusRefs: ["B1(b)", "B1(c)"],
  title: "Useful information: the objective and the characteristics",
  minutes: 16,
  intro:
    "Everything in the Framework flows from one decision: reporting exists to serve investors, lenders and creditors deciding whether to provide resources. The qualitative characteristics are how you argue about whether it is succeeding — and SBR expects you to argue, not list.",
  outcomes: [
    "State the objective of general purpose financial reporting and who the primary users are — and are not",
    "Explain the limitations of general purpose reports that scenarios routinely test",
    "Apply the fundamental characteristics as a two-part test any figure must pass",
    "Deploy the enhancing characteristics as trade-offs, naming the conflict a scenario creates",
    "Evaluate presentation and disclosure choices as communication decisions, not compliance chores",
  ],
  sections: [
    {
      id: "objective-and-users",
      heading: "The objective, the users, and the limits",
      blocks: [
        {
          kind: "text",
          md: "General purpose financial reporting exists to give **existing and potential investors, lenders and other creditors** information useful for deciding whether to buy, sell or hold, and whether to lend and on what terms. They are the primary users because they cannot compel the entity to produce bespoke information — a regulator or tax authority can demand what it wants; a minority shareholder cannot. Their decisions need two assessments the reports must serve: the entity's **prospects for future net cash inflows**, and **management's stewardship** of the resources entrusted to it.",
        },
        {
          kind: "text",
          md: "The limitations are just as examinable as the objective, because scenarios lean on them. General purpose reports **do not show entity value** — they provide raw material for estimating it. They rest on **estimates and judgement**, not exactness. They serve users **in common**, so no single user's needs dominate. And they are **historical at the reporting date** while decisions face forwards. When a scenario has a shareholder complaining that the accounts 'do not tell them what the company is worth', that is the objective and its limits being tested verbatim.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Stewardship is not a leftover",
          md: "The 2018 revision restored stewardship to prominence: users assess not only how much cash the entity will generate but how well management has acquired, protected and deployed its resources. This matters in answers — a treatment can leave value unchanged and still degrade the report's account of stewardship, which is an argument SBR pays for, especially around related parties and management compensation.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "One report, decisions in common",
            data: {
              centre: "General purpose financial report",
              nodes: [
                { label: "Equity investors", sub: "Buy, hold, sell; vote on management" },
                { label: "Lenders", sub: "Advance, price and monitor credit" },
                { label: "Other creditors", sub: "Extend trade terms" },
                { label: "Others (not primary)", sub: "Regulators, tax authorities, public — served incidentally" },
              ],
            },
          },
        },
      ],
      check: {
        q: "A national tax authority complains that IFRS statements do not give it the detail it needs to compute taxable profit. Why is this not a failure of the Framework's objective?",
        options: [
          "Because tax authorities never use financial statements",
          "Because the authority can compel the information it needs, so it is not a primary user, and general purpose reports are aimed at those who cannot",
          "Because taxable profit and accounting profit are always identical",
          "Because the Framework requires entities to prepare separate tax accounts",
        ],
        correct: 1,
        explain:
          "The primary-user boundary is drawn precisely on the power to compel: investors, lenders and creditors must rely on general purpose reports, so the reports are designed for them. Serving a regulator or tax authority is incidental, and their unmet needs are met through their own powers — not a defect in the reporting objective.",
      },
    },
    {
      id: "fundamental-characteristics",
      heading: "Relevance and faithful representation — the two-part test",
      blocks: [
        {
          kind: "text",
          md: "Information is useful only if it is **relevant** — capable of making a difference to decisions, through predictive value, confirmatory value or both — and **faithfully represents** what it purports to represent: complete, neutral and free from error. These are not a menu; both must be present. A precisely accurate figure for something users do not care about fails the first test. A highly decision-relevant figure that misdescribes the substance fails the second. The exam's judgement scenarios almost always stage a fight between the two.",
        },
        {
          kind: "definition",
          term: "Materiality",
          md: "Information is material if omitting, misstating or **obscuring** it could reasonably be expected to influence primary users' decisions. It is an entity-specific aspect of relevance — there is no universal threshold, and burying a critical disclosure in clutter can be as material as omitting it.",
        },
        {
          kind: "text",
          md: "Two refinements carry marks. **Neutrality is supported by prudence**, defined as caution under uncertainty — meaning assets and income are not overstated *and* liabilities and expenses are not understated. Prudence is not a licence for deliberate pessimism, which is how big-bath accounting tries to dress itself. And **substance over form** is folded inside faithful representation: representing a transaction's legal shell while its economics run elsewhere is not a faithful representation at all, however accurate the numbers attached to the shell.",
        },
        {
          kind: "illustration",
          title: "Relevance and faithful representation pulling apart",
          md: "An entity holds an unquoted equity stake. A fair value would be highly relevant — it is the number an investor wants — but with no market, every input is a management assumption: measurement uncertainty is severe. Cost is verifiable to the penny and tells a user almost nothing current. Neither extreme wins outright: the Framework's answer is that high measurement uncertainty does not forbid a relevant measure, but may mean the most useful information pairs the estimate with disclosure of the uncertainty — or, at the limit, that a different measurement basis becomes the more faithful choice. Writing that *trade-off*, in the scenario's terms, is the SBR skill.",
        },
      ],
      check: {
        q: "A finance director proposes to omit disclosure of a material lawsuit because 'the outcome is too uncertain to measure reliably'. Which analysis is correct?",
        options: [
          "Omission is right — unreliable information cannot be faithfully represented",
          "Uncertainty affects measurement, not existence: the claim's existence, nature and exposure are relevant and representable, so disclosure is required even where recognition is not",
          "The lawsuit is not relevant until it is decided",
          "Materiality cannot apply to unrecognised items",
        ],
        correct: 1,
        explain:
          "The director's argument slides from 'hard to measure' to 'safe to hide'. Existence uncertainty and measurement uncertainty are different problems: a contingent liability that fails recognition still generates a disclosure obligation, because knowing the exposure exists changes a user's decisions. Options 2 and 3 invert relevance and materiality — both apply to information, not only to recognised amounts.",
      },
    },
    {
      id: "enhancing-and-communication",
      heading: "The enhancing characteristics, and disclosure as communication",
      blocks: [
        {
          kind: "text",
          md: "Comparability, verifiability, timeliness and understandability enhance information that already passes the fundamental test. They cannot rescue an irrelevant or unfaithful figure, and they trade off against each other and against the fundamentals: faster reporting is less verified; a more relevant new policy breaks the trend data; simplifying a complex instrument's presentation can misdescribe it. SBR rewards **naming the specific trade-off the scenario has created** — generic recitals of all four earn nothing.",
        },
        {
          kind: "table",
          caption: "Trade-offs as they appear in scenarios",
          head: ["Conflict", "How the scenario stages it", "The argued answer"],
          rows: [
            ["Timeliness v verifiability", "Publish preliminary results early, or wait for the valuation report?", "Earlier information serves decisions now; state the basis and the pending confirmation"],
            ["Relevance v comparability", "A voluntary policy change to a more informative measure mid-trend", "Change if it better serves users — with restated comparatives repairing the trend"],
            ["Understandability v completeness", "Directors want the derivative note 'simplified' for readers", "Complex phenomena may need complex reporting; excluding it because it is difficult misleads"],
            ["Neutrality v management's story", "An MPM or adjusted profit presented more prominently than IFRS results", "Additional measures may inform, but prominence, labelling and reconciliation discipline keep them honest"],
          ],
        },
        {
          kind: "text",
          md: "The same logic now governs **presentation and disclosure as communication**. The Framework and IFRS 18 push in one direction: information is classified and aggregated so that similar items sit together and dissimilar items do not obscure each other, entity-specific description beats boilerplate, and disclosure objectives beat checklist compliance. The recurring exam observation: a note can comply with every itemised requirement and still fail its objective, because the material judgement is buried in standardised text — obscuring is a materiality failure.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Argue with the characteristics, do not recite them",
          md: "Every characteristic you invoke should be attached to a scenario fact and doing work in the sentence. 'This reduces comparability' scores when you say **with what** — prior periods, or peers — and **why a user cares**. As a self-test: if a sentence would survive unchanged in any other entity's answer, it is a recital, not analysis.",
        },
      ],
      check: {
        q: "An entity adopts a more relevant measurement policy, breaking comparability with its own five-year trend. Which response best reflects the Framework's structure?",
        options: [
          "Reject the change — comparability is a fundamental characteristic and cannot be sacrificed",
          "Adopt the change — enhancing characteristics like comparability yield to an improvement in the fundamentals, and restated comparatives repair most of the damage",
          "Adopt the change only if competitors adopt it simultaneously",
          "Reject the change — policies may never change once selected",
        ],
        correct: 1,
        explain:
          "The hierarchy resolves this: comparability is enhancing, relevance is fundamental, and IAS 8's retrospective application exists precisely to mend the trend a justified change breaks. Option 0 misgrades the characteristic; option 2 confuses comparability with uniformity — the Framework wants like things reported alike, not all entities frozen together.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Reciting all the characteristics in every judgement answer.",
      fix: "Pick the two in tension in this scenario, attach each to a fact, and resolve the trade-off with a reason.",
    },
    {
      trap: "Using prudence to justify deliberate understatement.",
      fix: "Prudence is caution under uncertainty supporting neutrality — asymmetric 'caution' is bias wearing its clothes.",
    },
    {
      trap: "Treating 'too uncertain to measure' as a reason to omit information.",
      fix: "Separate existence from measurement: unrecognised exposures still carry disclosure obligations.",
    },
    {
      trap: "Reading materiality as a numeric threshold.",
      fix: "It is user-decision-based and entity-specific, and obscuring buried in clutter counts as much as omitting.",
    },
  ],
  keyTerms: [
    { term: "Relevance", def: "The capacity of information to make a difference to primary users' decisions, through predictive value, confirmatory value or both." },
    { term: "Faithful representation", def: "Depicting the substance of an economic phenomenon completely, neutrally and free from error." },
    { term: "Prudence", def: "The exercise of caution under uncertainty, supporting neutrality — neither overstating assets and income nor understating liabilities and expenses." },
    { term: "Enhancing characteristics", def: "Comparability, verifiability, timeliness and understandability — qualities that improve useful information but cannot substitute for the fundamentals." },
    { term: "Obscuring", def: "Communicating material information in a way that buries it — vague language, scattering, or drowning it in immaterial detail — with the same effect as omission." },
  ],
  summary: [
    "Reporting serves investors, lenders and creditors who cannot compel information, for cash-flow prospects and stewardship.",
    "The reports' limits — not entity value, estimate-laden, common-purpose, historical — are answer material, not caveats.",
    "Every figure faces the two-part test: relevant, and a faithful representation of substance — complete, neutral, free from error.",
    "Enhancing characteristics are trade-off currency; name the conflict the scenario stages and resolve it with reasons.",
    "Disclosure is communication: a compliant note that buries the judgement fails materiality by obscuring.",
  ],
  knowledgeDiagnostic: [
    { q: "Who are the primary users and why them?", a: "Existing and potential investors, lenders and other creditors — because they cannot require the entity to supply information directly and so depend on general purpose reports." },
    { q: "What two assessments must the reports support?", a: "The entity's prospects for future net cash inflows, and management's stewardship of the entity's resources." },
    { q: "How does prudence relate to neutrality?", a: "It supports it: caution under uncertainty prevents overstatement of assets and income and understatement of liabilities and expenses — deliberate understatement is a breach of neutrality, not prudence." },
    { q: "When can an enhancing characteristic be sacrificed?", a: "When doing so improves the fundamentals — a more relevant policy justifies breaking comparability, with retrospective restatement repairing the trend." },
  ],
  furtherStudy: [
    "SBR-06 turns these concepts into element definitions and recognition tests",
    "SBR-07 develops measurement uncertainty and materiality in depth",
    "Area C's presentation and disclosure chapter applies the communication principles through IFRS 18",
    "Area E uses the characteristics as the analyst's toolkit for judging information quality",
  ],
}

const SBR_TREE_06: StudyChapter = {
  paper: "SBR",
  id: "SBR-06",
  number: 6,
  area: "B",
  syllabusRefs: ["B1(e)"],
  title: "Elements, recognition and derecognition",
  minutes: 16,
  intro:
    "Asset, liability, equity, income, expense — five definitions that decide what gets onto the statements at all. SBR examines them at the margins: the disputed receivable, the economic-compulsion 'equity', the transferred asset that never really left.",
  outcomes: [
    "Apply the 2018 element definitions to borderline items, using rights, obligations and control as the levers",
    "Explain what changed from the older definitions and why scenarios exploit the difference",
    "Apply the recognition criteria — useful information, at a cost that does not exceed the benefit",
    "Analyse derecognition through the control and risks-and-rewards lenses and say when each dominates",
    "Distinguish liabilities from equity by the presence of an obligation, and spot economic-compulsion traps",
  ],
  sections: [
    {
      id: "the-definitions",
      heading: "The five definitions, and the work each word does",
      blocks: [
        {
          kind: "text",
          md: "An **asset** is a present economic resource controlled by the entity as a result of past events — a resource being a right with the potential to produce economic benefits. A **liability** is a present obligation to transfer an economic resource as a result of past events. **Equity** is the residual; **income** and **expenses** are changes in assets and liabilities other than from transactions with owners. The definitions are deliberately spare, and every word earns its place in exam analysis.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The levers the exam pulls",
          items: [
            "**Right, not thing** — the asset is the right, not the object: a leased aircraft yields a right-of-use asset without ownership; one building can host several parties' rights",
            "**Potential, not certainty** — benefits need not be probable to meet the definition; low probability moves the argument to recognition and measurement, not existence",
            "**Control** — the ability to direct use and obtain the benefits, which is why sold-but-repurchasable 'disposals' fail",
            "**Present obligation from past events** — the entity has already obtained benefits or taken action, and has no practical ability to avoid the transfer",
            "**No practical ability to avoid** — captures constructive obligations: a published restructuring plan can bind as firmly as a contract",
          ],
        },
        {
          kind: "text",
          md: "The 2018 revision removed 'expected flow' language from the definitions: existence questions and probability questions were disentangled. Under the older wording an improbable inflow arguably failed the asset definition itself; now a right with even low probability of benefit **is** an economic resource, and the low probability is dealt with in whether recognition is useful and how measurement reflects it. Scenarios exploit this: a disputed claim, a long-shot option, a contingent right — the modern analysis says *exists as an asset; recognition and measurement are the real questions*.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Liability versus equity is an obligation question",
          md: "An instrument is a liability if the entity has an obligation to transfer economic resources it cannot avoid — redeemable 'shares' with a mandatory redemption are debt in substance, whatever their name. Conversely, pressure without obligation is not a liability: an entity that would suffer commercially by not paying discretionary dividends is still not *obliged* to pay them. Economic compulsion tempts; the definition holds the line at obligation.",
        },
      ],
      check: {
        q: "An entity is suing a supplier for $3m; its lawyers assess the chance of winning at 30%. Under the 2018 definitions, which statement is correct?",
        options: [
          "There is no asset, because winning is not probable",
          "The claim is an economic resource — a right with the potential to produce benefits — and the 30% probability bears on recognition and measurement, not on existence",
          "There is an asset that must be recognised at $3m",
          "The claim is equity, as it is a residual interest",
        ],
        correct: 1,
        explain:
          "This is precisely the disentangling the revision performed: potential, not probability, governs existence. Recognition then asks whether putting the claim on the statement gives useful information — at 30%, typically not, with disclosure as a contingent asset instead — and measurement would have to reflect the uncertainty. Options 0 and 2 are the two old-style errors: importing probability into the definition, and leaping from existence to full recognition.",
      },
    },
    {
      id: "recognition",
      heading: "Recognition — usefulness, not a probability gate",
      blocks: [
        {
          kind: "text",
          md: "An element is recognised when recognition provides **relevant information** and a **faithful representation** of the item, at a cost that does not exceed the benefit of providing it. The old probability-and-reliable-measurement gate is gone from the Framework — replaced by asking when recognition would *fail* to be useful: where it is uncertain whether the element exists at all, where the probability of any flow is so low that a recognised amount misleads, or where measurement uncertainty is so severe that no estimate, however caveated, represents the item faithfully.",
        },
        {
          kind: "text",
          md: "Individual standards still carry their own recognition rules — IAS 37's 'probable outflow', IAS 38's development criteria — and where a standard applies, its rule governs. What the Framework's version buys you in the exam is the **critique** and the **gap-filling**: you can explain why IAS 37 sets its gate where it does, argue what recognition would do to usefulness for a novel item, and evaluate a standard whose rule now sits oddly against the concepts it is supposed to serve.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The recognition reasoning",
            data: {
              steps: [
                { label: "Definition met?", sub: "If not, stop — nothing to recognise" },
                { label: "Relevant?", sub: "Existence and probability not too uncertain to inform" },
                { label: "Faithful?", sub: "Measurement uncertainty manageable with disclosure" },
                { label: "Recognise", sub: "Or disclose instead, where recognition would mislead" },
              ],
            },
          },
        },
        {
          kind: "illustration",
          title: "Why unrecognised is not unreported",
          md: "Internally generated brands fail recognition — not because they are not assets (the rights and benefits are real) but because no measurement separates the brand's cost or value from the business it grew inside; any number would carry false precision. The Framework's answer is disclosure of what recognition cannot faithfully carry. The exam mirror-image is management arguing an inconvenient liability is 'too uncertain to recognise': test whether the uncertainty is genuinely about faithful measurement, or just about an unwelcome number.",
        },
      ],
      check: {
        q: "Management declines to recognise a decommissioning obligation, arguing the settlement date (in roughly forty years) and technology costs make any estimate unreliable. What is the strongest counter?",
        options: [
          "All liabilities must be recognised regardless of measurement difficulty",
          "A present obligation exists from past installation; long horizons create measurement uncertainty that estimation techniques and disclosure handle — uncertainty of amount is not uncertainty of existence, and non-recognition misstates the position",
          "The obligation should be recognised only when settlement begins",
          "The argument is correct — recognition requires a contractually fixed amount",
        ],
        correct: 1,
        explain:
          "The definition is satisfied the day the installation creates the restoration duty; IAS 37 then requires the best estimate, discounted, with the estimation basis disclosed. Sliding from 'hard to measure' to 'nothing to recognise' would let every long-dated obligation vanish — the exact outcome the recognition concepts exist to prevent. Options 0 and 3 are both absolutes the Framework does not contain.",
      },
    },
    {
      id: "derecognition",
      heading: "Derecognition — when is an asset really gone?",
      blocks: [
        {
          kind: "text",
          md: "Derecognition should faithfully represent both **what the entity retains** and **the change in position** from the transaction. For assets the control question leads: has the entity lost the ability to direct use and take the benefits? But transfers are engineered to blur exactly this — sales with repurchase agreements, factoring with recourse, transfers to vehicles the entity still steers. Where the entity keeps significant exposure to the asset's risks and rewards, that exposure is strong evidence control never passed.",
        },
        {
          kind: "table",
          caption: "The transfer patterns and their readings",
          head: ["Structure", "What the entity retains", "Reporting answer"],
          rows: [
            ["Sale with repurchase at fixed price", "Price risk and benefit — the return is the buyer's lending margin", "No derecognition: a secured borrowing"],
            ["Factoring with full recourse", "Credit risk in full", "Keep the receivables; recognise the cash as a borrowing"],
            ["Factoring without recourse", "Little or no downside", "Derecognise; the loss on sale is the factor's fee"],
            ["Transfer to a controlled vehicle", "Power plus variable returns via the vehicle", "Consolidation returns the asset to the group statements"],
          ],
        },
        {
          kind: "text",
          md: "For **liabilities**, derecognition happens when the present obligation is discharged, cancelled or expires. The exam's edge cases: paying a third party to assume a debt does not release the original debtor unless the creditor releases it; and a substantial modification of terms is accounted for as extinguishing the old liability and recognising a new one — the gate that stops troubled-debt rewrites being smoothed invisibly.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Say both halves",
          md: "A complete derecognition answer states what left **and what stayed**: 'derecognise the receivables transferred without recourse, but recognise the servicing obligation retained'. Partial transfers are the norm in SBR scenarios, and the marks sit in the retained piece candidates forget.",
        },
      ],
      check: {
        q: "An entity 'sells' $10m of receivables to a bank for $9.4m cash, guaranteeing the bank against all customer defaults. How should this be reported?",
        options: [
          "Derecognise the receivables and record a $0.6m loss on sale",
          "Keep the receivables on the statement of financial position and present the $9.4m as a secured borrowing, since the guarantee retains substantially all the credit risk",
          "Derecognise the receivables and recognise the guarantee at its $10m maximum",
          "Split the receivables 94:6 between derecognised and retained portions",
        ],
        correct: 1,
        explain:
          "The full-recourse guarantee leaves every unit of downside where it started, so in substance the entity has borrowed $9.4m against its book: the 'discount' is interest, not a loss on sale. Options 0 and 2 report the legal form; option 3 misuses proportionate treatment, which fits transfers that genuinely split risk — this one splits none.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Importing probability into the existence question.",
      fix: "Potential, not likelihood, defines an economic resource — probability belongs to recognition and measurement.",
    },
    {
      trap: "Classifying by name: 'shares are equity, loans are liabilities'.",
      fix: "Ask for the unavoidable obligation — mandatory redemption makes 'shares' debt; discretion keeps payments equity.",
    },
    {
      trap: "Accepting economic compulsion as an obligation.",
      fix: "Commercial pressure to pay is not the inability to avoid paying; the definition holds at obligation.",
    },
    {
      trap: "All-or-nothing derecognition answers.",
      fix: "State what transferred and what was retained — recourse, servicing, repurchase exposure — and account for each.",
    },
  ],
  keyTerms: [
    { term: "Economic resource", def: "A right that has the potential to produce economic benefits — the object of the asset definition." },
    { term: "Control (of an asset)", def: "The present ability to direct the use of an economic resource and obtain the benefits that flow from it." },
    { term: "Present obligation", def: "A duty or responsibility, arising from past events, that the entity has no practical ability to avoid." },
    { term: "Constructive obligation", def: "An obligation arising from established practice or published commitments that create valid expectations in others, rather than from contract or law." },
    { term: "Derecognition", def: "Removing all or part of a recognised asset or liability from the statement of financial position, faithfully representing what changed and what remains." },
  ],
  summary: [
    "The definitions turn on rights, control and unavoidable obligations — not on things, names or probabilities.",
    "The 2018 revision split existence from probability: low likelihood is a recognition and measurement issue.",
    "Recognition asks whether the resulting information is relevant and faithful — with disclosure as the honest alternative.",
    "Liability versus equity is decided by obligation; economic compulsion is pressure, not obligation.",
    "Derecognition follows control, reads retained risks as evidence, and always accounts for the piece that stayed.",
  ],
  knowledgeDiagnostic: [
    { q: "Define an asset and mark the load-bearing words.", a: "A present economic resource — a right with the potential to produce economic benefits — controlled by the entity as a result of past events. 'Right', 'potential' and 'controlled' each defeat a classic misreading." },
    { q: "Why did removing probability from the definitions matter?", a: "Existence and likelihood became separate questions: disputed or low-probability rights are assets whose recognition and measurement then get argued on usefulness, instead of being defined away." },
    { q: "When does a transfer of receivables fail derecognition?", a: "When retained exposure — recourse, guarantees, repurchase terms — shows the entity still bears the asset's risks and rewards, so control in substance never passed; the proceeds are then a secured borrowing." },
    { q: "What makes a modification of debt terms an extinguishment?", a: "A substantial change in the liability's terms is accounted for as settling the old obligation and recognising a new one, with the difference in profit or loss — not as a quiet continuation." },
  ],
  furtherStudy: [
    "SBR-07 supplies the measurement half of every recognition argument here",
    "Area C's financial instruments chapters apply derecognition and liability-versus-equity at standard level",
    "Area C's provisions chapter shows IAS 37 operating its own recognition gate",
    "Area D's control analysis is this chapter's control concept applied to whole entities",
  ],
}

const SBR_TREE_07: StudyChapter = {
  paper: "SBR",
  id: "SBR-07",
  number: 7,
  area: "B",
  syllabusRefs: ["B1(d)"],
  title: "Measurement, uncertainty and materiality",
  minutes: 15,
  intro:
    "Choosing what a thing is worth means choosing what question the number answers. Historical cost answers 'what was sacrificed'; current values answer 'what is it worth now — and to whom'. SBR examines the choice, the uncertainty inside it, and the judgement of what matters enough to tell.",
  outcomes: [
    "Describe each measurement basis and the information it actually conveys to a user",
    "Argue a basis selection from relevance and faithful representation, not from habit",
    "Explain how measurement uncertainty is handled — estimation, disclosure, and its limit",
    "Apply materiality as a user-decision judgement across recognition, measurement and disclosure",
    "Critique mixed-measurement statements the way Area E's analysis chapters will exploit",
  ],
  sections: [
    {
      id: "the-bases",
      heading: "The bases, and the question each one answers",
      blocks: [
        {
          kind: "text",
          md: "**Historical cost** carries the value of the transaction that created the item, updated for consumption, impairment or fulfilment. It answers *what did we give, and is it still recoverable?* — verifiable, cheap, and increasingly stale as conditions move. The **current value** bases re-ask the question at each reporting date. **Fair value** — the price in an orderly sale between market participants — answers *what would the market pay?*, deliberately ignoring entity-specific advantages. **Value in use** (and fulfilment value for liabilities) answers *what is it worth to us, used as we intend?* — entity-specific by design. **Current cost** answers *what would replacing it cost today?*",
        },
        {
          kind: "table",
          caption: "What each basis tells a user — and hides",
          head: ["Basis", "Tells the user", "Hides or risks"],
          rows: [
            ["Historical cost", "The actual sacrifice; a floor of verifiability", "Current values, holding gains sitting unreported"],
            ["Fair value", "Market's current pricing of the item alone", "Entity-specific value; volatile; model-driven when markets thin"],
            ["Value in use", "Management's cash-flow case for the asset", "Rests on management's own forecasts — self-graded homework"],
            ["Current cost", "Today's cost of capacity replacement", "Rarely observable for used or specialised assets"],
          ],
        },
        {
          kind: "text",
          md: "Selection is not aesthetic: the Framework directs the choice to whatever produces the most **relevant** information that can be **faithfully represented**, considering the item's characteristics and how it contributes to cash flows. An asset held to be used up in operations justifies cost; one held for exchange justifies a current value; a liability to be settled at an uncertain future amount needs a fulfilment measure that reflects that uncertainty. The exam's favourite framing — *evaluate the directors' proposal to move class X to fair value* — is answered with exactly this contribution-to-cash-flows logic.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Mixed measurement is a policy, not an accident",
          md: "IFRS statements measure inventory at cost, pensions at present value, derivatives at fair value, and PPE at either. The defence: each item gets the basis most useful for it. The cost: the totals add unlike things, and profit mixes realised margins with unrealised remeasurements — which is why analysts decompose earnings, and why SBR asks you to explain what a bottom line made of mixed bases does and does not mean.",
        },
      ],
      check: {
        q: "Directors propose fair value for a fleet of highly specialised machines, custom-built for the entity's process and unsaleable except as scrap. What is the strongest objection?",
        options: [
          "Fair value is never permitted for property, plant and equipment",
          "For assets whose value is realised through use, not sale, an exit price to hypothetical market participants is close to meaningless — the relevant information is recoverable cost against the cash flows the machines generate",
          "Fair value would be too high",
          "Specialised assets must always be measured at value in use",
        ],
        correct: 1,
        explain:
          "The contribution-to-cash-flows test does the work: these machines will never meet a market, so a market-participant exit price (likely near scrap) represents nothing about the entity's economics. Cost, tested for impairment against value in use, matches how the assets earn. Option 2 guesses a direction the analysis does not need, and options 0 and 3 are invented rules.",
      },
    },
    {
      id: "uncertainty",
      heading: "Measurement uncertainty and its limits",
      blocks: [
        {
          kind: "text",
          md: "Almost every current value, and plenty of cost-based figures — depreciation lives, loss allowances, provisions — are **estimates**. The Framework's position: measurement uncertainty does not, by itself, prevent information being useful, because a relevant estimate with disclosed assumptions usually informs better than a precise irrelevance. But uncertainty has a limit: where it is so severe that no faithful representation is possible, a different basis — or disclosure in place of recognition — becomes the answer.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The disclosure machinery uncertainty triggers",
          items: [
            "**Significant judgements** — the policy-level choices that most affect the statements (control conclusions, revenue timing calls)",
            "**Estimation uncertainty sources** — assumptions with significant risk of material adjustment within the next year, with sensitivity where practicable",
            "**Basis and inputs** — how level-3-style values were built: methods, key inputs, and the range considered",
            "**The honest sensitivity** — showing what moves the number: a reader who can see 'one point on the discount rate changes this by $40m' has been informed, not alarmed",
          ],
        },
        {
          kind: "illustration",
          title: "Two disclosures of the same estimate",
          md: "Two entities each carry goodwill supported by value-in-use models. The first discloses: growth 2%, discount rate 9%, and that a reasonably possible one-point rate rise would eliminate all headroom. The second discloses: 'key assumptions include growth and discount rates, determined using management's best estimates'. The numbers on both balance sheets are identical; the first entity has reported an estimate, the second has reported the *existence* of an estimate. SBR scenarios plant the second kind, and expect you to call it what it is — compliance prose that obscures the judgement users need.",
        },
      ],
      check: {
        q: "The Framework says measurement uncertainty can limit the usefulness of a relevant measure. At what point does that limit bite?",
        options: [
          "Whenever a figure requires any estimation at all",
          "When uncertainty is so high that no estimate, even with full disclosure of assumptions, faithfully represents the item — at which point a different basis or disclosure-only becomes more useful",
          "Whenever auditors cannot re-perform the calculation",
          "Never — disclosure always cures any level of uncertainty",
        ],
        correct: 1,
        explain:
          "The position is a spectrum with two ends candidates overshoot: estimates are the normal stuff of reporting (so option 0 proves far too much), but disclosure is not an infinite solvent (option 3) — a number that is effectively conjecture misleads however many caveats surround it. The exam wants the middle stated: estimate, disclose, and know when to stop recognising.",
      },
    },
    {
      id: "materiality-judgement",
      heading: "Materiality — the judgement that filters everything",
      blocks: [
        {
          kind: "text",
          md: "Materiality runs through recognition, measurement, presentation and disclosure: information is material if omitting, misstating or obscuring it could reasonably influence primary users' decisions made on the statements. It is **entity-specific** — there is no universal percentage — and it is **qualitative as well as quantitative**: a small misstatement that flips a covenant test, converts a loss to a profit, or conceals a related-party extraction is material at any size.",
        },
        {
          kind: "list",
          style: "number",
          title: "A materiality judgement, in exam-usable steps",
          items: [
            "**Identify the users and the decisions live in the scenario** — the refinancing lender, the incoming investor",
            "**Size the item quantitatively** — against profit, relevant totals, and the metric under pressure",
            "**Test the qualitative triggers** — covenant proximity, trend reversal, related parties, regulatory thresholds, management bonus lines",
            "**Consider aggregation** — individually small misstatements that share a direction accumulate into a material whole",
            "**Conclude for this entity, this year** — and note that obscuring a material item in clutter fails the test as surely as omission",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The 'immaterial' defence has a direction problem",
          md: "When management pleads immateriality for an adjustment it happens to dislike, apply the bias test from SBR-01: materiality judged only ever in the flattering direction is not a materiality policy, it is earnings management with a vocabulary. The tell in scenarios: the same management books smaller favourable items without hesitation.",
        },
        {
          kind: "text",
          md: "Materiality is also the **anti-clutter principle**: standards' disclosure requirements apply only to material information, and immaterial disclosures that bury material ones degrade the statements. The practical exam takeaway runs both ways — a checklist-complete note can fail users, and a 'streamlined' report can hide the one judgement that mattered. The test in both directions is the user's decision, not the standard's word count.",
        },
      ],
      check: {
        q: "A $400k misstatement (0.3% of revenue, 2% of profit) turns a small reported loss into a small reported profit in the year the entity's bank covenant requires profitability. Management calls it clearly immaterial. What is the correct analysis?",
        options: [
          "Immaterial — both percentages are below any common benchmark",
          "Material — it changes the sign of the result and determines a covenant outcome, both qualitative triggers that override small percentages, and it flatters the metric under pressure",
          "Material only if the auditors say so",
          "Immaterial provided it is disclosed in the notes",
        ],
        correct: 1,
        explain:
          "Loss-to-profit and covenant determination are the textbook qualitative overrides: a lender's decision turns on exactly this figure, which is the definition of materiality doing its work. The direction — favourable, in the pressured year — also raises the SBR-01 bias flag. Auditors opine on materiality; they do not constitute it, and a disclosed misstatement is still a misstatement.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Arguing a measurement basis from doctrine — 'fair value is more relevant'.",
      fix: "Argue from how the item contributes to cash flows: use points to cost-and-impairment, exchange points to current value.",
    },
    {
      trap: "Treating estimates as a flaw to apologise for.",
      fix: "Estimation is the normal machinery; the reportable question is whether assumptions and sensitivity are disclosed.",
    },
    {
      trap: "Applying one numeric materiality threshold to everything.",
      fix: "Test the qualitative triggers — sign changes, covenants, related parties — and the metric actually under pressure.",
    },
    {
      trap: "Forgetting aggregation.",
      fix: "Same-direction small misstatements sum; assess the accumulated effect against the user's decision.",
    },
  ],
  keyTerms: [
    { term: "Historical cost", def: "Measurement from the transaction price at initial recognition, updated for depreciation, impairment or fulfilment — verifiable but not current." },
    { term: "Fair value", def: "The price that would be received to sell an asset, or paid to transfer a liability, in an orderly transaction between market participants at the measurement date." },
    { term: "Value in use", def: "The present value of the cash flows an entity expects from an asset's continued use and disposal — entity-specific by design." },
    { term: "Fulfilment value", def: "The present value of the resources an entity expects to be obliged to transfer to satisfy a liability." },
    { term: "Estimation uncertainty", def: "The uncertainty in a reported amount that arises because it rests on assumptions about the future — managed by estimation technique and disclosure, up to the point where faithful representation fails." },
  ],
  summary: [
    "Each basis answers a different user question; selection follows the item's contribution to cash flows.",
    "Mixed measurement is deliberate — and its cost is totals and profit lines that add unlike things.",
    "Uncertainty is normal: estimate and disclose, and stop recognising only where no estimate can be faithful.",
    "Materiality is entity-specific, qualitative as much as quantitative, and includes obscuring — in both directions.",
    "One-directional materiality and boilerplate sensitivity prose are bias tells, not judgement.",
  ],
  knowledgeDiagnostic: [
    { q: "What question does each measurement basis answer?", a: "Historical cost: what was sacrificed and is it recoverable. Fair value: what would the market pay, ignoring entity specifics. Value in use / fulfilment value: what is it worth to this entity as used or settled. Current cost: what would replacement cost today." },
    { q: "How does the Framework direct the choice of basis?", a: "Towards the most relevant information that can be faithfully represented, judged by the item's characteristics and how it contributes to future cash flows — use points to cost, exchange to current value." },
    { q: "When does measurement uncertainty defeat recognition?", a: "When it is so severe that no estimate, however well disclosed, faithfully represents the item — then a different basis, or disclosure without recognition, provides the more useful information." },
    { q: "Name four qualitative materiality triggers.", a: "Changing the sign of the result, determining a covenant or regulatory outcome, masking a trend reversal, and anything touching related parties or management reward." },
  ],
  furtherStudy: [
    "Area C's fair value chapter turns this chapter's fair value concept into IFRS 13's hierarchy and techniques",
    "Area C's impairment coverage operationalises value in use",
    "SBR-05 supplies the relevance and faithfulness tests every basis argument uses",
    "Area E's information-quality chapter is this chapter read from the analyst's side",
  ],
}

const SBR_TREE_08: StudyChapter = {
  paper: "SBR",
  id: "SBR-08",
  number: 8,
  area: "B",
  syllabusRefs: ["B1(e)"],
  title: "Profit or loss, OCI and recycling",
  minutes: 15,
  intro:
    "Two performance statements, one recurring exam question: what belongs in profit or loss, what goes to other comprehensive income, and why do some OCI items return while others never do? There is a working logic — and admitting where it frays is part of the answer.",
  outcomes: [
    "Explain the default status of profit or loss and what OCI exists to hold",
    "Classify the OCI items into those that recycle and those that do not, with the reasoning",
    "Discuss recycling's case for and against, using specific items as evidence",
    "Analyse the reporting consequences of classification — cover ratios, EPS, covenant metrics",
    "Critique a proposal to route gains or losses through OCI as a presentation-shopping exercise",
  ],
  sections: [
    {
      id: "two-statements-one-performance",
      heading: "Why performance is reported in two places",
      blocks: [
        {
          kind: "text",
          md: "**Profit or loss is the default**: all income and expenses of the period belong there unless a standard directs otherwise. It is the primary performance signal — the number EPS, covenants and bonus plans are built on. **Other comprehensive income** holds the items standards have routed around that signal: mostly remeasurements from moving assets and liabilities to current values where the change does not reflect the period's operating performance — revaluation surpluses, certain instrument remeasurements, pension remeasurements, currency translation of foreign operations.",
        },
        {
          kind: "text",
          md: "The Framework's honest position: there is **no rigorous principle** dividing the two — OCI is a pragmatic parking place, item by item, and total comprehensive income is the arithmetic whole. What can be said: P&L aims to capture the period's transactions and consumed resources, while OCI absorbs remeasurement noise — long-duration valuation swings that would drown the operating story if they ran through profit every period. SBR pays for stating both the logic *and* its raggedness.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The two performance channels",
            data: {
              leftTitle: "Profit or loss",
              rightTitle: "Other comprehensive income",
              rows: [
                { aspect: "Status", left: "Default for all income and expenses", right: "Exceptions, item by item, by standard" },
                { aspect: "Content", left: "Transactions, consumption, realised outcomes", right: "Mainly current-value remeasurements" },
                { aspect: "Feeds", left: "EPS, covenants, bonus metrics", right: "Equity reserves; sometimes later P&L via recycling" },
                { aspect: "User reading", left: "The period's performance signal", right: "Position changes to watch, not performance to reward" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "OCI is where scrutiny goes to sleep",
          md: "Because bonuses, covenants and headlines key off profit, routing a loss through OCI can make it practically invisible — which is exactly why classification questions are ethics-adjacent in SBR. An FVOCI equity election made after prices start falling, or enthusiasm for revaluation surpluses in equity paired with resistance to depreciation's P&L drag, are presentation-shopping patterns to name.",
        },
      ],
      check: {
        q: "A CFO argues a material loss 'has no cash impact and is only fair value movement, so it belongs in OCI where it will not distort profit'. The instrument is a derivative measured at FVTPL. What is the correct response?",
        options: [
          "Agree — fair value movements are OCI items by nature",
          "Refuse — P&L is the default and OCI is available only where a standard specifically directs it, which for a FVTPL derivative it does not; distaste for volatility is not a classification criterion",
          "Agree if the loss is expected to reverse",
          "Route it through OCI but disclose it prominently",
        ],
        correct: 1,
        explain:
          "Classification is standard-directed, not management-elected: no provision sends ordinary FVTPL derivative movements to OCI, and 'it would distort profit' describes the CFO's preference, not a principle. Options 2 and 3 both invent mechanisms — expected reversal and disclosure — that exist nowhere in the classification rules.",
      },
    },
    {
      id: "recycling-map",
      heading: "What recycles, what never does — and the logic",
      blocks: [
        {
          kind: "text",
          md: "**Recycling** (reclassification) moves amounts previously reported in OCI into profit or loss when a defined event — usually disposal or settlement — crystallises them. The idea: OCI held the unrealised swings, and realisation is when the item's full story belongs in the performance number. But the standards apply it selectively, and the selective map must simply be known.",
        },
        {
          kind: "table",
          caption: "The recycling map",
          head: ["OCI item", "Recycles?", "The stated logic"],
          rows: [
            ["Foreign operation translation differences", "Yes, on disposal of the operation", "The accumulated currency effect joins the gain or loss on selling it"],
            ["Cash flow hedge reserve", "Yes, as the hedged flows hit P&L", "Matching: the hedge result meets the transaction it protected"],
            ["Debt instruments at FVOCI", "Yes, on derecognition", "The business model realises value by sale as well as collection"],
            ["PPE revaluation surplus", "No — transfers within equity only", "Realisation is reflected through higher depreciation; no P&L re-run"],
            ["Equity investments designated FVOCI", "No, ever", "The election trades P&L volatility away entirely — including on sale"],
            ["Defined benefit remeasurements", "No", "Long-horizon actuarial swings would distort any single period's result"],
          ],
        },
        {
          kind: "text",
          md: "The evaluation both sides of which SBR expects: **for recycling** — realisation is genuine performance, and without reclassification a crystallised gain or loss never touches the primary performance measure at all (sell an FVOCI equity stake at triple cost, and profit or loss never hears about it). **Against** — recycling reports the same economics twice across periods, invites gains-timing (disposals scheduled to harvest reserves into profit), and the inconsistency of the map itself undermines the claim that any principle is operating. A strong answer deploys a specific item on each side rather than arguing in the air.",
        },
        {
          kind: "examQuestion",
          title: "Discuss the reporting of items in profit or loss versus OCI",
          format: "written",
          marks: 8,
          requirement: "Discuss the principles determining whether items are reported in profit or loss or in OCI, and whether the treatment of the entity's three items is consistent with those principles.",
          plan: [
            { step: "State the default and the exception structure", detail: "P&L unless a standard directs otherwise; OCI as the standard-by-standard parking place for remeasurements." },
            { step: "Give the working rationale and its limit", detail: "Operating performance versus long-duration remeasurement noise — and the Framework's admission that no rigorous dividing principle exists." },
            { step: "Take the scenario's items one by one", detail: "For each: what the standard requires, whether it recycles, and what that does to this entity's reported performance." },
            { step: "Surface the incentive", detail: "Check who benefits from each classification — the OCI-parked loss flattering a covenant metric is the usual plant." },
            { step: "Conclude on the user's reading", detail: "What should a user add back or watch — and where does comprehensive income tell the truer story?" },
          ],
          answer:
            "Profit or loss is the default location for all income and expenses; OCI exists only where a standard specifically directs an item there, generally for remeasurements arising from current-value measurement whose period swings would obscure operating performance. The Framework concedes there is no rigorous principle dividing the two — the map is pragmatic, which is why it must be applied item by item.\n\nThe revaluation surplus on the head office is correctly in OCI and will never be reclassified: realisation is reflected through higher depreciation charges and, on sale, a transfer within equity. The directors' description of it as 'profit to be released on disposal' is wrong and, given the bonus plan referenced to profit, concerning.\n\nThe translation difference on the Northern subsidiary correctly accumulates in OCI, but on the planned disposal the accumulated balance is reclassified into the gain or loss on sale. The directors' forecast of disposal profit excludes this debit balance and therefore overstates the P&L effect of the transaction they are recommending to shareholders.\n\nThe designation of the strategic equity stake at FVOCI is permitted as an irrevocable election, but its consequence must be reported symmetrically: the current losses stay out of profit, and so would any future gains, including the entire result on eventual sale. Selecting the election in the same period the stake began falling in value suggests the motive was presentation rather than business model, and the significant-judgement disclosure should say honestly what the election does.\n\nFor users, comprehensive income is the safer performance total here: each item is individually defensible, but the pattern of classifications consistently flatters the profit figure the bonus and covenant reference.",
          earns: [
            "Default-and-exception structure stated before any item",
            "Each item resolved with its recycling consequence",
            "The incentive pattern named across the items",
            "A user-level conclusion, not just three rulings",
          ],
          loses: [
            "Reciting the whole recycling map instead of the three items asked about",
            "Claiming a principle cleanly separates P&L from OCI",
            "Missing the never-recycles consequence of the FVOCI equity election",
            "No mention of who benefits from the classifications",
          ],
        },
      ],
      check: {
        q: "An entity sells a foreign subsidiary and separately sells an equity investment designated at FVOCI. Which accumulated OCI balances reach profit or loss?",
        options: [
          "Both — disposal recycles all related OCI",
          "Neither — OCI never reaches profit or loss",
          "Only the foreign operation's translation reserve; the FVOCI equity reserve transfers within equity and never touches P&L",
          "Only the equity investment's reserve, as it is the more liquid asset",
        ],
        correct: 2,
        explain:
          "This is the map's sharpest asymmetry and a favourite exam plant: currency translation differences reclassify into the disposal result, while the FVOCI equity election excludes its instrument's gains from profit permanently — sale included. Nothing about liquidity or intuition drives it; the standards simply direct different destinations, which is itself evaluation material.",
      },
    },
    {
      id: "consequences-for-analysis",
      heading: "Why classification moves real decisions",
      blocks: [
        {
          kind: "text",
          md: "Classification is not cosmetic. **EPS** is built on profit attributable to ordinary shareholders — OCI items never enter it, however large. **Covenants and bonus plans** typically reference profit metrics, so an OCI-routed loss can preserve a covenant that a P&L loss would breach. **Trend analysis** breaks silently when the mix shifts: an entity that elected FVOCI for equities part-way through the comparative period is not comparable with its own prior year without adjustment.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The analyst moves this teaches (Area E will use them)",
          items: [
            "Read the OCI statement first — it is short, and it is where the period's uncomfortable remeasurements sit",
            "Recompute headline ratios on comprehensive income when OCI is persistently one-signed — persistent negative OCI is performance, whatever the statement is called",
            "Track reserve balances that will recycle (translation, hedging) as future P&L already in the system",
            "Treat classification elections made mid-deterioration as intent evidence, and check the disclosure of the election's consequences",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The one-signed OCI test",
          md: "OCI items are defended as noise — swings that average out over time. Noise is two-signed. When an entity's OCI runs persistently negative across periods, the 'noise' is a signal being parked: pension experience consistently worse than assumed, or currency exposure consistently losing. Naming that pattern converts a presentation observation into analysis marks.",
        },
      ],
      check: {
        q: "Over four years an entity reports steady profit growth while OCI is negative every year, mainly pension remeasurements and translation losses, cumulatively exceeding total reported profit. What should an analyst conclude?",
        options: [
          "Performance is strong — OCI is definitionally irrelevant to performance",
          "Comprehensive income shows the entity has created little or no value over the period; persistently one-signed OCI is performance information the P&L presentation is filtering out",
          "The financial statements must contain errors",
          "The entity should be criticised for not recycling the pension losses",
        ],
        correct: 1,
        explain:
          "The noise defence fails on persistence: four years of same-direction remeasurements is systematic experience, not fluctuation, and comprehensive income is the total that catches it. Option 3 misfires on the map — pension remeasurements never recycle — and 'errors' (option 2) confuses lawful presentation with faithful overall signal, which is precisely the distinction this area trains.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Presenting OCI as a principled category.",
      fix: "State the default-and-exceptions structure and the Framework's own admission — then apply the map item by item.",
    },
    {
      trap: "Recycling the revaluation surplus or FVOCI equity gains through profit on disposal.",
      fix: "Both stay out of P&L permanently — surplus transfers within equity; the equity election is symmetric and irrevocable.",
    },
    {
      trap: "Treating OCI as irrelevant to performance analysis.",
      fix: "Persistently one-signed OCI is filtered performance; recompute on comprehensive income and say why.",
    },
    {
      trap: "Ignoring reserves that are future P&L.",
      fix: "Translation and hedging reserves recycle on defined events — a planned disposal brings the balance into the forecast result.",
    },
  ],
  keyTerms: [
    { term: "Other comprehensive income", def: "Income and expenses that standards specifically direct outside profit or loss — mainly remeasurements from current-value measurement — accumulated in equity reserves." },
    { term: "Recycling (reclassification)", def: "Transferring amounts previously recognised in OCI into profit or loss when a specified event, typically disposal or settlement, occurs." },
    { term: "Total comprehensive income", def: "The change in equity in the period other than from transactions with owners — profit or loss plus OCI." },
    { term: "FVOCI equity election", def: "The irrevocable choice to present a non-trading equity investment's value changes in OCI — removing them from profit or loss permanently, including on sale." },
    { term: "Revaluation surplus", def: "The OCI-accumulated excess of a revalued asset's carrying amount over its cost basis, transferred within equity as realised — never through profit or loss." },
  ],
  summary: [
    "P&L is the default; OCI is a standard-directed exception list for remeasurement swings — with no rigorous principle, and saying so scores.",
    "Know the recycling map cold: translation and cash-flow hedges return; revaluation surpluses, FVOCI equities and pension remeasurements never do.",
    "Recycling's case is realised performance; its cost is double reporting and harvestable gains — argue with named items.",
    "Classification moves EPS, covenants and bonuses, which is why proposals to re-route losses deserve the incentive test.",
    "Persistently one-signed OCI is performance wearing a different label — recompute on comprehensive income.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the default location for income and expenses, and what displaces it?", a: "Profit or loss for everything, unless an individual standard specifically directs an item to OCI — management preference is not a mechanism." },
    { q: "Which OCI items recycle, and on what events?", a: "Foreign-operation translation differences on disposal, cash flow hedge results as the hedged flows affect profit, and FVOCI debt on derecognition. Revaluation surpluses, FVOCI equity elections and pension remeasurements never reclassify." },
    { q: "Why does the FVOCI equity election attract presentation-shopping?", a: "It removes an instrument's losses from profit permanently — and an election made after prices start falling suggests the motive is the profit figure, not the business model; the symmetric cost is that gains, including the final sale result, never reach P&L either." },
    { q: "What does persistently negative OCI tell an analyst?", a: "That systematically adverse remeasurements — pension experience, currency losses — are being filtered out of the headline result; comprehensive income is the truer performance total and should be said so." },
  ],
  furtherStudy: [
    "Area C's presentation chapter carries these ideas into IFRS 18's statement structure and MPMs",
    "Area C's instruments and employee-benefits chapters generate most of the OCI items mapped here",
    "Area D's foreign-operations chapter shows the translation reserve accumulating and recycling",
    "SBR-02's toolkit includes the classification games this chapter arms you to catch",
  ],
}

export const SBR_TREE_AREA_B: StudyChapter[] = [SBR_TREE_04, SBR_TREE_05, SBR_TREE_06, SBR_TREE_07, SBR_TREE_08]
