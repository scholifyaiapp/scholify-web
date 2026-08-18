import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · the remainder of Area F, plus Areas G, H and I.
 *
 *   AAA-25  Auditing performance information in the public sector (F3)
 *   AAA-26  Reporting on other assignments                        (F4)
 *   AAA-27  Sustainability assurance                              (F5)
 *   AAA-28  Current issues and developments                       (G)
 *   AAA-29  Professional skills                                   (H)
 *   AAA-30  Employability and technology skills                   (I)
 *
 * F5 and G2 both concern sustainability assurance, which is the newest material
 * in the syllabus and is written from the syllabus itself rather than from the
 * provider books.
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_25: StudyChapter = {
  paper: "AAA",
  id: "AAA-25",
  number: 25,
  area: "F",
  syllabusRefs: ["F3"],
  title: "Auditing performance information in the public sector",
  minutes: 14,
  intro:
    "Where there is no profit measure, performance is reported against stated objectives — and the assurance problem becomes whether those measures mean what they claim to.",
  outcomes: [
    "Explain why performance information is audited in the public sector",
    "Apply value for money and the three Es to performance reporting",
    "Identify the difficulties in measuring public sector outputs and outcomes",
    "Design procedures over reported performance indicators",
    "Explain the form of the conclusion on such an engagement",
  ],
  sections: [
    {
      id: "why-and-what",
      heading: "Why it is audited, and against what",
      blocks: [
        {
          kind: "text",
          md: "A public sector body has no profit figure to be judged by, so it reports performance against **pre-determined objectives** — waiting times, attainment, response times, service coverage. Because funding and accountability rest on those figures, they attract the same incentive to manipulate that profit does in a company, and the assurance engagement exists for that reason.",
        },
        {
          kind: "table",
          caption: "The three Es applied to reported performance",
          head: ["E", "What it measures", "The audit question"],
          rows: [
            ["Economy", "Inputs obtained at least cost", "Were resources procured competitively and at a reasonable price?"],
            ["Efficiency", "Output per unit of input", "Is the reported ratio computed on a consistent and defensible basis?"],
            ["Effectiveness", "Whether objectives were achieved", "Does the indicator actually measure the outcome, or only an output?"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The output/outcome distinction is the assurance problem",
          md: "An **output** is countable — patients treated, pupils taught. An **outcome** is the change that resulted — health improved, learning achieved. Reported measures gravitate toward outputs because they can be counted, so an assurance engagement should ask whether the indicator measures what the objective was actually about. Reporting that targets were met on measures that do not capture the objective is the characteristic failure here.",
        },
      ],
      check: {
        q: "A health body reports that it met its target for patients treated within a waiting time standard. What is the principal assurance concern?",
        options: [
          "Whether the arithmetic is correct",
          "Whether the indicator measures the intended outcome and whether its definition has been applied consistently — targets can be met by reclassifying cases, treating easier ones first, or changing when the clock starts, without the underlying service improving",
          "Whether the body spent within budget",
          "Whether the target was ambitious enough",
        ],
        correct: 1,
        explain:
          "Where a target drives funding and reputation, the measure attracts the same manipulation as a financial one — usually through definitions and case selection rather than false numbers. The assurance work must therefore address definition, consistency and whether the measure captures the objective.",
      },
    },
    {
      id: "procedures",
      heading: "Procedures and the conclusion",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Procedures over reported performance indicators",
          items: [
            "Obtain the **definition** of each indicator and confirm it has been applied consistently with prior periods",
            "Agree reported figures to the **underlying records and systems**, testing the completeness of the data captured",
            "Test the **arithmetic** of any ratio and the appropriateness of the denominator",
            "Consider **exclusions** — cases removed from the population and the basis for removing them",
            "Compare with prior periods and comparable bodies, investigating unexpected improvements",
            "Enquire into any **changes in definition or methodology** during the period and their effect"
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Exclusions are where the manipulation usually sits",
          md: "The most common way a performance measure is improved without improving performance is by **removing cases from the population** — reclassifying them, deeming them out of scope, or restarting a clock. Testing the exclusions, and their basis, is therefore the highest-value procedure in this area and one candidates seldom propose.",
        },
        {
          kind: "text",
          md: "The engagement is normally a **limited assurance** engagement, so the conclusion takes the negative form and addresses whether the information is properly prepared in accordance with the stated criteria. As with all assurance work, the criteria must be **suitable** — and in this sector the criteria are the definitions of the indicators themselves, which is why establishing and testing those definitions is so central.",
        },
      ],
      check: {
        q: "Which procedure is most likely to detect manipulation of a public sector performance indicator?",
        options: [
          "Recalculating the reported percentage",
          "Testing the cases excluded from the population and the basis for excluding them — measures are most often improved by removing cases rather than by misstating the arithmetic",
          "Comparing the result with the prior year",
          "Obtaining a representation from management",
        ],
        correct: 1,
        explain:
          "The arithmetic is usually correct; the population is what has been managed. Examining exclusions goes directly to that, whereas recalculation confirms a figure that was never in doubt.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying a financial audit framework unchanged.", fix: "There is no profit measure; performance is assessed against stated objectives and the three Es." },
    { trap: "Accepting an output measure as evidence of effectiveness.", fix: "Ask whether the indicator captures the outcome the objective was about." },
    { trap: "Testing only the arithmetic.", fix: "Definitions, completeness and exclusions are where manipulation occurs." },
    { trap: "Expressing a positive conclusion.", fix: "These are normally limited assurance engagements taking the negative form." },
  ],
  keyTerms: [
    { term: "Pre-determined objectives", def: "The stated targets against which a public sector body reports performance, in the absence of a profit measure." },
    { term: "Output and outcome", def: "What was produced, as against the change that resulted — measures gravitate to the first while objectives concern the second." },
  ],
  summary: [
    "Public sector performance is reported against objectives, using the three Es.",
    "Effectiveness is the hardest to measure and the most often omitted.",
    "Definitions, completeness and exclusions are where the work should focus.",
    "The engagement is normally limited assurance with a negative conclusion.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is performance information audited in the public sector?", a: "There is no profit measure, so funding and accountability rest on reported indicators — which attract the same incentive to manipulate." },
    { q: "How is a performance measure usually manipulated?", a: "By managing the population — excluding or reclassifying cases, or changing when a measurement starts — rather than by misstating figures." },
    { q: "What serves as the criteria in such an engagement?", a: "The definitions of the indicators themselves, which is why establishing and testing them is central." },
  ],
  furtherStudy: [
    "AAA-22 covers the assurance framework and the suitable criteria requirement.",
    "AAA-26 covers the report on this engagement.",
    "AAA-27 covers sustainability assurance, which shares the criteria problem.",
  ],
}

const AAA_TREE_26: StudyChapter = {
  paper: "AAA",
  id: "AAA-26",
  number: 26,
  area: "F",
  syllabusRefs: ["F4"],
  title: "Reporting on other assignments",
  minutes: 14,
  intro:
    "Every engagement produces a report, and the report must not claim more than the work supports. Matching the two is the whole of this subsection.",
  outcomes: [
    "Explain the content of reports on assurance and non-assurance engagements",
    "Match the form of conclusion to the work performed",
    "Explain the use and purpose of restrictions on distribution",
    "Identify where a report risks being misunderstood or misused",
    "Explain the auditor's exposure to third parties relying on such reports",
  ],
  sections: [
    {
      id: "matching",
      heading: "Matching the report to the work",
      blocks: [
        {
          kind: "table",
          caption: "What each report says",
          head: ["Engagement", "The report states"],
          rows: [
            ["Review", "A negative conclusion on whether anything was found suggesting misstatement, with the scope described"],
            ["Agreed-upon procedures", "The procedures performed and the factual findings, with an explicit statement that no assurance is expressed"],
            ["Due diligence", "Findings against the agreed scope, for the addressee's own decision — not an opinion"],
            ["Forensic", "Findings, the basis for them, and limitations — with no conclusion on liability"],
            ["Prospective information", "Limited assurance on preparation and the reasonableness of assumptions, with the mandatory caveat"],
            ["Sustainability assurance", "A conclusion in the form matching the level of assurance, against stated criteria"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The common elements",
          md: "Every such report should identify the **subject matter**, the **criteria** used, the **scope of the work performed**, the **responsibilities** of each party, the **conclusion in the appropriate form**, and any **restriction on use**. Where the report omits the criteria or the scope, a reader cannot tell what has and has not been done — which is how reports come to be relied on for purposes they cannot support.",
        },
      ],
      check: {
        q: "An agreed-upon procedures report is issued. What must it make explicit?",
        options: [
          "The practitioner's conclusion on whether the information is fairly stated",
          "That the procedures performed were those agreed with the parties, that only factual findings are reported, and that no assurance is expressed — so the users draw their own conclusions from the findings",
          "That limited assurance has been obtained",
          "That the work was performed in accordance with auditing standards",
        ],
        correct: 1,
        explain:
          "The engagement gives no assurance, so the report must say so and confine itself to what was found. Expressing any form of conclusion would claim something the agreed procedures cannot support.",
      },
    },
    {
      id: "restriction",
      heading: "Restricting use, and third party exposure",
      blocks: [
        {
          kind: "text",
          md: "Reports on other assignments are usually prepared for a **specific party for a specific purpose**, and their conclusions can be seriously misleading if read by someone else. A **restriction on use** states who the report is for and that it should not be used by others or for other purposes.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the restriction matters practically",
          md: "A due diligence report addressing a buyer's questions may be read by a lender financing the deal, who has different concerns and no knowledge of the scope agreed. The restriction limits the class of person who can claim reliance was foreseeable, which connects directly to the duty of care question in professional liability. It does not make a firm immune — but it is the principal way the class of potential claimants is controlled.",
        },
        {
          kind: "table",
          caption: "The wording that protects",
          head: ["Element", "Effect"],
          rows: [
            ["Named addressee and stated purpose", "Establishes who the report was prepared for and why"],
            ["Statement that no duty is accepted to others", "Rebuts an assumption of assumed responsibility to third parties"],
            ["Description of the agreed scope", "Prevents a reader assuming work was done that was not"],
            ["Statement of the level of assurance, or that none is given", "Prevents the report being read as an audit opinion"],
          ],
        },
        {
          kind: "text",
          md: "Where a third party asks to rely on an existing report, the firm should consider whether to provide a **release letter** setting the terms of any reliance, or to decline. Simply allowing the report to circulate without addressing the point leaves the firm exposed to a party whose expectations it never had a chance to manage.",
        },
      ],
      check: {
        q: "A bank asks to rely on a due diligence report the firm prepared for a buyer. What is the appropriate response?",
        options: [
          "Confirm that the bank may rely on it, since the work has been done",
          "Consider the request explicitly — the report was prepared for a different party's questions under an agreed scope, so the firm should either decline, or agree terms of reliance in a release letter that sets out the scope and limitations",
          "Refuse to discuss the report with the bank at all",
          "Issue a new report addressed to the bank at no charge",
        ],
        correct: 1,
        explain:
          "Reliance by someone the report was not prepared for is exactly what the restriction on use anticipates. Addressing it deliberately — through terms of reliance or a refusal — is what prevents the firm acquiring a duty to a party whose purposes it never considered.",
      },
    },
  ],
  examTraps: [
    { trap: "Expressing a conclusion in an agreed-upon procedures report.", fix: "Factual findings only, with an explicit statement that no assurance is given." },
    { trap: "Omitting the criteria and the scope.", fix: "Without them a reader cannot tell what was done." },
    { trap: "Treating a restriction on use as a formality.", fix: "It controls the class of persons who can claim foreseeable reliance." },
    { trap: "Letting a third party rely without addressing it.", fix: "Agree terms of reliance in a release letter, or decline." },
  ],
  keyTerms: [
    { term: "Restriction on use", def: "A statement identifying the party for whom a report was prepared and the purpose, limiting reliance by others." },
    { term: "Release letter", def: "An agreement setting the terms on which a third party may rely on a report prepared for someone else." },
  ],
  summary: [
    "The form of conclusion must match the work performed.",
    "Every report should state subject matter, criteria, scope, responsibilities, conclusion and restriction.",
    "Restrictions on use control who can claim foreseeable reliance.",
    "Address third party reliance deliberately, through terms or refusal.",
  ],
  knowledgeDiagnostic: [
    { q: "What must an agreed-upon procedures report state explicitly?", a: "That only the agreed procedures were performed, that findings are factual, and that no assurance is expressed." },
    { q: "Why does a restriction on use matter legally?", a: "It limits the class of persons whose reliance was foreseeable, which is the first element of a negligence claim." },
    { q: "How should a request from a third party to rely on a report be handled?", a: "By agreeing terms of reliance in a release letter, or by declining — not by allowing the report to circulate unaddressed." },
  ],
  furtherStudy: [
    "AAA-07 covers the duty of care that restrictions on use are managing.",
    "AAA-22 covers the engagements these reports conclude.",
    "AAA-24 covers the mandatory caveat on prospective information reports.",
  ],
}

const AAA_TREE_27: StudyChapter = {
  paper: "AAA",
  id: "AAA-27",
  number: 27,
  area: "F",
  syllabusRefs: ["F5"],
  title: "Sustainability assurance",
  minutes: 16,
  intro:
    "The newest material in the syllabus, and the fastest-growing assurance market. Its difficulties are the ordinary assurance difficulties, in a setting where almost nothing is settled.",
  outcomes: [
    "Explain the demand for assurance over sustainability information",
    "Identify the criteria available and the difficulty of establishing them",
    "Explain the challenges of obtaining evidence over sustainability data",
    "Distinguish limited from reasonable assurance in this context",
    "Explain greenwashing and the assurance provider's role in relation to it",
  ],
  sections: [
    {
      id: "why-and-criteria",
      heading: "Why it is demanded, and against what criteria",
      blocks: [
        {
          kind: "text",
          md: "Investors allocate capital partly on sustainability information, lenders price it into facilities, regulators increasingly require it, and customers act on it. Once information drives decisions and money, the same question arises as for financial statements: **can it be relied on?** — which is what creates the demand for assurance.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Criteria are the central difficulty",
          md: "Financial statements have an established reporting framework supplying the criteria. Sustainability reporting has **several competing frameworks**, entity-specific metrics, and definitions that vary between companies and between years. Since suitable criteria are one of the five required elements, establishing which framework applies — and whether it produces relevant, complete, reliable, neutral and understandable criteria — is the first question in any such engagement.",
        },
        {
          kind: "table",
          caption: "Why the evidence is harder",
          head: ["Difficulty", "Consequence"],
          rows: [
            ["Data comes from operations, not the finance system", "It has not been through financial controls and may never have been audited"],
            ["Much of it is estimated", "Emissions are frequently calculated using conversion factors rather than measured"],
            ["Scope extends beyond the entity", "Supply chain data is outside the entity's control and often unverifiable"],
            ["Some measures are qualitative", "Narrative claims about strategy and governance resist objective testing"],
            ["Comparability is weak", "Definitions differ between entities and change between periods"],
            ["Expertise required", "Scientific and technical knowledge the audit team may not hold"],
          ],
        },
      ],
      check: {
        q: "What is the first question in accepting a sustainability assurance engagement?",
        options: [
          "Whether the firm has capacity in the reporting timetable",
          "Which criteria the information is prepared against, and whether they are suitable — reporting frameworks compete and definitions vary, and without suitable criteria there is nothing objective to evaluate the information against",
          "Whether the client is an existing audit client",
          "What level of assurance the client wants",
        ],
        correct: 1,
        explain:
          "Suitable criteria are a required element of any assurance engagement, and in this field they are the element most likely to be missing or contested. The level of assurance and the practical matters follow once there is something to give assurance against.",
      },
    },
    {
      id: "level-greenwashing",
      heading: "Level of assurance, and greenwashing",
      blocks: [
        {
          kind: "text",
          md: "Most sustainability assurance is currently **limited**, reflecting the state of the data, the systems producing it and the criteria. The trajectory is toward **reasonable** assurance as reporting matures and regulation requires it — which will demand stronger controls over sustainability data than most entities currently have.",
        },
        {
          kind: "table",
          caption: "What moving to reasonable assurance would require",
          head: ["Requirement", "Why it is not yet in place"],
          rows: [
            ["Controls over sustainability data", "Data is often collected manually from operational sites without review"],
            ["Consistent, documented methodologies", "Conversion factors and boundaries change without formal governance"],
            ["Auditable records", "Source data may be spreadsheets or supplier assertions"],
            ["Defined reporting boundaries", "Which entities and activities are included is often not settled"],
            ["Expertise within the assurance team", "Scientific and technical skills beyond accounting"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Greenwashing, and what assurance actually addresses",
          md: "**Greenwashing** is presenting sustainability performance as better than the evidence supports — through selective disclosure, vague claims, misleading imagery, or targets with no plan behind them. Assurance can address whether **reported metrics** are properly prepared against criteria. It is far weaker against **vague narrative claims**, precisely because they have no criteria to be evaluated against — which is why an assured report is not a guarantee that a company's overall environmental story is fair.",
        },
        {
          kind: "text",
          md: "That limitation is worth stating in an answer. Where a scenario has a client seeking assurance to counter greenwashing allegations, the honest advice is that assurance over specific metrics does not validate general claims — and that the firm should consider whether its involvement would be understood by readers as endorsing more than it does.",
        },
      ],
      check: {
        q: "A client wants an assurance report to rebut allegations of greenwashing about its environmental claims. What should the firm advise?",
        options: [
          "That an assurance report will resolve the allegations",
          "That assurance can address whether specific reported metrics are properly prepared against stated criteria, but not vague narrative claims that have no criteria — so the report would not validate the company's overall environmental story, and the firm should consider whether its involvement would be read as endorsing more than it does",
          "That the firm cannot provide any assurance over sustainability information",
          "That the client should simply withdraw the claims",
        ],
        correct: 1,
        explain:
          "Assurance operates against criteria, so it reaches measurable metrics and not general assertions. Being explicit about that limit protects both the client's understanding and the firm's position, since a report issued into a contested public dispute will be read as broader endorsement than it is.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating sustainability assurance as an audit.", fix: "It is usually limited assurance, with a negative conclusion, against contested criteria." },
    { trap: "Assuming criteria exist.", fix: "Competing frameworks and entity-specific metrics make this the first question." },
    { trap: "Overstating what assurance addresses.", fix: "It reaches reported metrics, not vague narrative claims." },
    { trap: "Ignoring the expertise requirement.", fix: "Technical and scientific knowledge may need an expert." },
  ],
  keyTerms: [
    { term: "Sustainability assurance", def: "An assurance engagement over sustainability information, usually limited assurance, performed against stated reporting criteria." },
    { term: "Greenwashing", def: "Presenting sustainability performance as better than the evidence supports, through selective disclosure, vague claims or unsupported targets." },
    { term: "Reporting boundary", def: "The entities and activities included in reported sustainability data, which is often unsettled and materially affects the figures." },
  ],
  summary: [
    "Demand arises because the information now drives capital, lending and regulation.",
    "Suitable criteria are the central difficulty, given competing frameworks.",
    "Evidence is harder: operational data, estimates, supply chains and qualitative claims.",
    "Assurance reaches reported metrics, not general narrative claims about a company's story.",
  ],
  knowledgeDiagnostic: [
    { q: "Why are criteria the first question in a sustainability engagement?", a: "Suitable criteria are a required element, and competing frameworks with varying definitions mean they are often absent or contested." },
    { q: "Why is most sustainability assurance limited rather than reasonable?", a: "The data comes from operational systems without financial controls, much is estimated, and boundaries and methodologies are not consistently governed." },
    { q: "What can assurance not address about greenwashing?", a: "Vague narrative claims, which have no criteria to be evaluated against — assurance reaches specific reported metrics." },
  ],
  furtherStudy: [
    "AAA-22 covers the assurance framework and the five required elements.",
    "AAA-28 covers developments in sustainability assurance as a current issue.",
    "AAA-16 covers using an expert, which this work frequently requires.",
  ],
}

const AAA_TREE_28: StudyChapter = {
  paper: "AAA",
  id: "AAA-28",
  number: 28,
  area: "G",
  syllabusRefs: ["G1", "G2", "G3"],
  title: "Current issues and developments",
  minutes: 15,
  intro:
    "The area that dates fastest. Its examinable skill is not knowing this year's news but being able to reason about what a development does to audit risk, evidence and the profession's standing.",
  outcomes: [
    "Discuss professional and ethical developments affecting the profession",
    "Discuss developments in sustainability assurance",
    "Discuss the impact of technology on auditing",
    "Reason about an unfamiliar development using a consistent framework",
    "Relate current issues to the audit expectation gap",
  ],
  sections: [
    {
      id: "framework",
      heading: "A framework for any development",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Four questions that work on anything",
          md: "**What does it change about the client's risk?** **What does it change about the evidence available?** **What does it change about the auditor's skills or independence?** **What does it change about what users expect?** Applying those to any development produces an answer, which matters because this area examines things that were not in any textbook when it was written.",
        },
        {
          kind: "table",
          caption: "The framework applied to technology",
          head: ["Development", "Risk", "Evidence", "Skills and independence", "Expectations"],
          rows: [
            ["Data analytics on full populations", "Reduces sampling risk", "Whole population testable rather than a sample", "Requires data skills; more exceptions to investigate", "Users may assume all error is now found"],
            ["Artificial intelligence in the client's systems", "Model bias, opacity, control failures nobody detects", "Harder — decisions may not be explainable", "Auditor may lack expertise to evaluate the model", "Users assume the auditor understands the system"],
            ["Blockchain and distributed records", "Transactions immutable once recorded — but wrong ones stay wrong", "Strong on existence, weak on rights, valuation and whether the transaction was genuine", "New technical understanding required", "Users may assume audit becomes unnecessary"],
            ["Cloud and outsourced processing", "Controls sit at a service organisation", "Requires reports on the service organisation's controls", "Reliance on another auditor's work", "Little change in expectation"],
          ],
        },
        {
          kind: "text",
          md: "The **analytics** row carries a point worth making explicitly: testing a full population does not eliminate audit risk. It removes **sampling** risk, while leaving the risks that the data is incomplete, that the analytic is wrongly designed, or that the exceptions identified are misinterpreted. And testing everything produces far more exceptions to investigate, which is a resourcing consequence rather than a saving.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Automation bias — the risk the technology itself creates",
          md: "**Automation bias** is the tendency to trust an automated output more readily than one's own assessment, and to stop challenging it. An analytic that reports no exceptions feels like assurance; a model that produces a valuation feels authoritative. Both are outputs of assumptions someone chose, and treating them as conclusions is a scepticism failure wearing a technological disguise. The response is that **human judgement remains the auditor's**: the tool identifies, the auditor evaluates, and who may override the output — and on what basis — should be explicit before it is relied on.",
        },
      ],
      check: {
        q: "An audit firm tests 100% of a client's transactions using data analytics. What audit risk remains?",
        options: [
          "None — the whole population has been tested",
          "Sampling risk is removed, but the data may be incomplete or extracted incorrectly, the analytic may be designed on wrong assumptions, and the exceptions identified still require judgement to interpret — so audit risk is reduced, not eliminated",
          "Only detection risk remains",
          "The risk that the client objects to the technique",
        ],
        correct: 1,
        explain:
          "Full population testing addresses one component of risk while leaving the completeness of the data, the design of the routine and the interpretation of results untouched. It also generates a much larger volume of exceptions, which is a real resourcing issue rather than an efficiency gain.",
      },
    },
    {
      id: "professional",
      heading: "Professional and ethical developments",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The themes that recur",
          items: [
            "**Tightening independence rules**, especially the non-audit services a firm may provide to public interest entities",
            "**Audit quality and regulatory inspection**, and the pressure that inspection findings place on firms",
            "**Structural questions** about the profession — audit firm governance, operational separation of audit from advisory work, market concentration",
            "**Scepticism and challenge**, which regulators repeatedly identify as the recurring deficiency",
            "**The expectation gap**, and whether audit should be extended to fraud detection or to going concern in a stronger form",
            "**Sustainability assurance**, both as a new service and as a new competence requirement",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The recurring argument, and both sides of it",
          md: "After a corporate failure the question is always whether audit should do more — detect fraud, guarantee going concern, report on internal controls. **For**: users plainly expect it and the gap damages confidence. **Against**: it would cost substantially more, it may not be achievable at any cost given collusion and management override, and it risks transferring management's responsibility to the auditor. A good answer gives both sides and reaches a position, rather than describing the debate.",
        },
        {
          kind: "text",
          md: "On **sustainability**, the developments to be aware of are the consolidation of reporting frameworks, the movement of assurance requirements from voluntary to mandatory in several jurisdictions, and the expected progression from limited toward reasonable assurance — each of which raises the same question about whether entities' systems and firms' expertise can support it.",
        },
      ],
      check: {
        q: "How should an answer address the argument that auditors should be responsible for detecting all fraud?",
        options: [
          "Agree, since users expect it",
          "Give both sides — the expectation gap and public confidence support extension, while cost, the practical limits imposed by collusion and management override, and the risk of transferring management's responsibility argue against — then reach a reasoned position",
          "Disagree, since the standards do not require it",
          "State that the expectation gap cannot be closed",
        ],
        correct: 1,
        explain:
          "Current issues requirements are discursive and reward balance followed by a conclusion. Simply citing the current standards, as option 2 does, answers what the position is rather than what it should be — which is what the question asked.",
      },
    },
  ],
  examTraps: [
    { trap: "Reciting news without analysis.", fix: "Apply the four questions — risk, evidence, skills and independence, expectations." },
    { trap: "Claiming analytics eliminate audit risk.", fix: "They remove sampling risk and leave data, design and interpretation risk." },
    { trap: "Describing a debate without concluding.", fix: "Give both sides, then reach a reasoned position." },
    { trap: "Assuming new technology reduces audit effort.", fix: "It often shifts effort — more exceptions, new skills, new risks." },
  ],
  keyTerms: [
    { term: "Full population testing", def: "Using analytics to test every transaction rather than a sample, removing sampling risk while leaving data, design and interpretation risk." },
    { term: "Operational separation", def: "Structural separation of a firm's audit practice from its advisory business, proposed to address independence and market concerns." },
  ],
  summary: [
    "Four questions apply to any development: risk, evidence, skills and independence, expectations.",
    "Analytics remove sampling risk only, and generate more exceptions to investigate.",
    "Independence, quality, structure, scepticism and the expectation gap are the recurring themes.",
    "Give both sides of the extension debate, then conclude.",
  ],
  knowledgeDiagnostic: [
    { q: "What four questions frame any current issue?", a: "What it changes about client risk, about available evidence, about the auditor's skills and independence, and about what users expect." },
    { q: "What risk does full population testing not remove?", a: "That the data is incomplete or wrongly extracted, that the analytic is misdesigned, and that exceptions are misinterpreted." },
    { q: "What are the arguments against extending audit to guarantee fraud detection?", a: "Cost, the practical limits created by collusion and management override, and the risk of transferring management's responsibility to the auditor." },
  ],
  furtherStudy: [
    "AAA-27 covers sustainability assurance, the most active current development.",
    "AAA-07 covers the expectation gap this area repeatedly returns to.",
    "AAA-05 covers scepticism, the deficiency regulators most often identify.",
  ],
}

const AAA_TREE_29: StudyChapter = {
  paper: "AAA",
  id: "AAA-29",
  number: 29,
  area: "H",
  syllabusRefs: ["H1", "H2", "H3", "H4"],
  title: "Professional skills",
  minutes: 15,
  intro:
    "Ten marks in Section A, where all four are examined. In AAA the third skill has a longer name for a reason — it is professional scepticism AND judgement.",
  outcomes: [
    "Communicate in the format and to the audience the requirement specifies",
    "Analyse and evaluate the scenario's evidence rather than describing it",
    "Demonstrate professional scepticism and judgement",
    "Demonstrate commercial acumen in an audit context",
    "Recognise how each skill is evidenced in an answer",
  ],
  sections: [
    {
      id: "the-four",
      heading: "The four skills in an audit answer",
      blocks: [
        {
          kind: "table",
          caption: "What each looks like",
          head: ["Skill", "Evidenced by"],
          rows: [
            ["Communication", "The requested format — briefing notes, a memorandum, a section of a report — with headings, structure and a conclusion suited to the reader"],
            ["Analysis and evaluation", "Using the exhibit's figures to quantify materiality and significance, weighing evidence, and concluding rather than listing"],
            ["Professional scepticism and judgement", "Questioning management's explanations, identifying what further evidence is needed, and reaching a defensible judgement where the answer is not clear-cut"],
            ["Commercial acumen", "Practicality of recommendations, the client's circumstances, the firm's risk, and the resource implications of proposed work"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Judgement is examined alongside scepticism",
          md: "AAA names the skill **professional scepticism and judgement**, which is broader than in the other papers. Scepticism is questioning; judgement is reaching a defensible conclusion where the standards do not give one — whether a matter is material, whether a deficiency is significant, whether an uncertainty is fundamental. Requirements are deliberately set on the boundary, and a candidate who refuses to conclude has failed the skill being tested.",
        },
        {
          kind: "text",
          md: "The **quantification** habit is what most reliably demonstrates analysis in this paper. A matter described as 'material' earns little; 'the balance is $2.4m against materiality of $1.8m, so it is material and, representing 15% of total assets, arguably pervasive' earns the analysis marks and drives the conclusion. Where the exhibit gives figures, use them.",
        },
      ],
      check: {
        q: "Which sentence best demonstrates analysis and evaluation in an AAA answer?",
        options: [
          "The inventory balance is material and should be tested carefully",
          "Inventory of $4.2m represents 21% of total assets and exceeds materiality of $1.5m; the 40% increase against falling revenue suggests slow-moving goods, so the risk is overstatement through net realisable value and the balance warrants extended testing",
          "Inventory is a significant risk area for most manufacturing companies",
          "Management should be asked to explain the inventory increase",
        ],
        correct: 1,
        explain:
          "Only option 1 quantifies against materiality, draws an inference from the relationship between two figures in the exhibit, identifies the specific risk and reaches a conclusion about the response. The others are observations that could precede analysis but do not perform it.",
      },
    },
    {
      id: "acumen",
      heading: "Commercial acumen in an audit context",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "What it means here",
          items: [
            "**The firm's own risk** — whether accepting or continuing is wise, and what the engagement exposes the firm to",
            "**Resourcing** — whether the proposed work can be done in the time and with the staff available",
            "**Proportionality** — recommending work commensurate with the risk and the entity's size",
            "**The client relationship** — how a finding should be raised, and with whom, to be acted on rather than resisted",
            "**Deliverability** — recommendations a small entity can actually implement",
            "**Consequences beyond the audit** — what a modified opinion would mean for the client's financing and reputation",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The consequence sentence",
          md: "Where the answer reaches a modified opinion or a resignation, adding what it **means commercially** — the client may breach covenants, lose financing, or face regulatory consequences — demonstrates that the candidate understands the decision rather than the rule. It does not change the conclusion, and saying that explicitly is stronger still: the consequences are serious, and they do not alter what the standards require.",
        },
        {
          kind: "text",
          md: "The one place commercial acumen must **not** go is into the opinion. Pressure from the client's financing position, the firm's fee, or the relationship's value is precisely what the ethical framework exists to resist. So the acumen shows in how the finding is communicated and what work is proposed — never in softening the conclusion.",
        },
      ],
      check: {
        q: "An answer concludes that a modified opinion is required and adds that this will likely cause the client to breach a banking covenant. Is that appropriate?",
        options: [
          "No — commercial consequences are irrelevant to the auditor",
          "Yes, as commercial awareness — provided the answer is explicit that the consequence does not change what the standards require, since allowing it to soften the opinion is precisely the intimidation and self-interest pressure the ethical framework exists to resist",
          "Yes, and the opinion should be reconsidered in light of it",
          "No — the auditor should not know the client's covenant position",
        ],
        correct: 1,
        explain:
          "Understanding the consequence is commercial awareness and is rewarded; letting it influence the conclusion is a failure of objectivity. Stating both halves — the consequence, and that it does not change the requirement — is what demonstrates the skill properly.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing standards rather than applying them.", fix: "Use the exhibit's facts and figures; that is what analysis means here." },
    { trap: "Refusing to conclude where the answer is finely balanced.", fix: "Judgement is the skill being tested — reach a defensible position." },
    { trap: "Ignoring quantification when figures are supplied.", fix: "Compare to materiality and express as a percentage." },
    { trap: "Letting commercial consequences influence the opinion.", fix: "They belong in how the finding is communicated, never in the conclusion." },
  ],
  keyTerms: [
    { term: "Professional scepticism and judgement", def: "The AAA skill combining a questioning approach to evidence with reaching defensible conclusions where the standards do not determine the answer." },
  ],
  summary: [
    "Section A examines all four skills across ten marks.",
    "Quantify against materiality — that is how analysis is evidenced.",
    "Judgement means concluding where the answer is not clear-cut.",
    "Commercial acumen shows in communication and proposed work, never in the opinion.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does AAA name the third skill as scepticism and judgement?", a: "Scepticism is questioning the evidence; judgement is reaching a defensible conclusion where the standards do not settle the matter, and requirements are set on that boundary." },
    { q: "How is analysis most reliably evidenced?", a: "By quantifying against materiality and drawing inferences from the relationships between figures in the exhibit." },
    { q: "Where must commercial considerations never appear?", a: "In the opinion — they belong in how a finding is communicated and what work is proposed." },
  ],
  furtherStudy: [
    "AAA-05 covers professional scepticism in the technical sense.",
    "AAA-12 covers the analysis of an exhibit these skills are demonstrated on.",
    "AAA-30 covers the tools used to present the answer.",
  ],
}

const AAA_TREE_30: StudyChapter = {
  paper: "AAA",
  id: "AAA-30",
  number: 30,
  area: "I",
  syllabusRefs: ["I1", "I2", "I3", "I4"],
  title: "Employability and technology skills",
  minutes: 13,
  intro:
    "A 50-mark case study with many exhibits, and three and a quarter hours. How you work the exam is worth marks in itself.",
  outcomes: [
    "Access and navigate multiple exhibits efficiently",
    "Use the response tools appropriately for calculation and for discussion",
    "Present audit answers so that they can be marked",
    "Produce the format the requirement specifies",
    "Allocate time across a case study and two scenario questions",
  ],
  sections: [
    {
      id: "method",
      heading: "Working the exam",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The approach",
          items: [
            "**Read the requirements first** — the case study is long and reading it without knowing the task means reading it twice",
            "**Note the mark allocation** for each requirement and convert it into minutes before starting",
            "**Map the exhibits** — which holds the financial information, which the working papers, which the ethical matters",
            "**Build headings** from the requirement so each part is visibly answered",
            "**Compute materiality early** if the case study supplies financial information, since almost every judgement refers back to it",
            "**Answer in the requested format** — briefing notes, a memorandum, a section of a report",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "One idea, one paragraph",
          md: "AAA answers are largely discursive and are marked point by point. Writing each risk, deficiency or ethical issue as its **own short paragraph** — rather than a continuous block — lets a marker find and award each one. A long undifferentiated passage containing four good points frequently scores as though it contained one.",
        },
      ],
      check: {
        q: "Why should materiality be computed early in a Section A case study?",
        options: [
          "It is always a separate requirement worth marks",
          "Almost every subsequent judgement — whether a risk is significant, whether a misstatement matters, whether a deficiency should be reported — refers back to it, so computing it once early makes the rest of the answer quantifiable",
          "It determines the audit fee",
          "It must be disclosed in the auditor's report",
        ],
        correct: 1,
        explain:
          "Materiality is the reference point for the quantification that earns the analysis marks throughout the answer. Computing it once at the start means every later judgement can be expressed against it rather than asserted.",
      },
    },
    {
      id: "presenting",
      heading: "Presenting an audit answer",
      blocks: [
        {
          kind: "table",
          caption: "Tool and format",
          head: ["Output", "Tool", "Practice"],
          rows: [
            ["Materiality and ratio calculations", "Spreadsheet", "Live formulae, labelled, so the basis is visible"],
            ["Risks, procedures, ethical issues, deficiencies", "Word processor", "One point per paragraph, with a heading per requirement"],
            ["Deficiency reports", "Word processor table", "Three columns — deficiency, implication, recommendation"],
            ["Briefing notes or memoranda", "Word processor", "Addressee, purpose, headed sections, conclusion"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Habits that protect marks",
          items: [
            "**Answer the verb** — 'evaluate' is not 'describe', and 'design procedures' is not 'identify risks'",
            "**Use the exhibit's numbers**, not general statements about the balance being large",
            "**Keep to the requirement's scope** — writing about ethics where risks were asked for earns nothing",
            "**Label each part** so the marker can find your answer to each requirement",
            "**Stop when the time is spent** — the first marks of the next requirement are the easiest available",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Answering the verb is the highest-value habit",
          md: "AAA requirements are precise about what they want: **identify and explain** risks, **design** procedures, **evaluate** the ethical implications, **assess** whether the audit was performed with scepticism, **recommend** actions. Each verb has a different output, and answering a different one — describing a standard when asked to apply it — is the single largest source of lost marks on this paper.",
        },
      ],
      check: {
        q: "A requirement asks the candidate to 'design audit procedures' for an identified risk. What does an answer that lists the risks again achieve?",
        options: [
          "Partial credit for demonstrating understanding of the risk",
          "Very little — the risks were identified in a previous requirement, and this one asks for procedures, so an answer restating risks has answered a different question",
          "Full credit, since procedures follow from risks",
          "Credit provided the risks are correctly stated",
        ],
        correct: 1,
        explain:
          "Marks follow the verb, and material that answers an earlier requirement is not rewarded twice. Recognising precisely what each verb asks for is the highest-value exam habit in this paper.",
      },
    },
  ],
  examTraps: [
    { trap: "Reading the exhibits before the requirements.", fix: "The case study is long — know the task before reading it." },
    { trap: "Writing continuous prose.", fix: "One point per paragraph so each can be found and awarded." },
    { trap: "Answering a different verb.", fix: "Identify, design, evaluate and recommend all produce different outputs." },
    { trap: "Leaving materiality until it is needed.", fix: "Compute it early; every later judgement refers to it." },
  ],
  keyTerms: [
    { term: "Requirement verb", def: "The instruction word determining what output a requirement wants — identify, explain, design, evaluate, assess or recommend." },
  ],
  summary: [
    "Requirements first, then map the exhibits and convert marks into minutes.",
    "Compute materiality early — it anchors every later judgement.",
    "One point per paragraph, headed by requirement.",
    "Answer the verb; a different one earns nothing however good the content.",
  ],
  knowledgeDiagnostic: [
    { q: "Why compute materiality at the start?", a: "It is the reference point for quantifying every later judgement about significance, misstatement and reporting." },
    { q: "Why write one point per paragraph?", a: "AAA is marked point by point, and a continuous block containing several good points is often credited as one." },
    { q: "What is the largest single source of lost marks?", a: "Answering a different verb from the one set — describing a standard where the requirement asked for it to be applied." },
  ],
  furtherStudy: [
    "AAA-29 covers the professional skills this presentation supports.",
    "AAA-11 covers computing materiality itself.",
    "AAA-21 covers the deficiency report format used here.",
  ],
}

export const AAA_TREE_AREA_F_PART2: StudyChapter[] = [AAA_TREE_25, AAA_TREE_26, AAA_TREE_27]
export const AAA_TREE_AREA_G: StudyChapter[] = [AAA_TREE_28]
export const AAA_TREE_AREA_H: StudyChapter[] = [AAA_TREE_29]
export const AAA_TREE_AREA_I: StudyChapter[] = [AAA_TREE_30]
