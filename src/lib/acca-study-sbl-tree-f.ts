import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area F — Organisational control and audit.
 *
 * Area F was the OTHER half of legacy chapter SBL_C: the shim filtered it to
 * three section ids and took `outcomes.slice(3)`, while Area D took
 * `outcomes.slice(0, 3)` of the same chapter. Kaplan gives this material two
 * chapters and 74 pages (internal control and reporting 38pp, audit and
 * compliance 36pp).
 *
 *   SBL-27  Management and internal control systems      (F1)
 *   SBL-28  Internal audit, independence and compliance  (F2)
 *   SBL-29  Internal control and management reporting    (F3)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_27: StudyChapter = {
  paper: "SBL",
  id: "SBL-27",
  number: 27,
  area: "F",
  syllabusRefs: ["F1(a)", "F1(b)", "F1(c)", "F1(d)", "F1(e)"],
  title: "Management and internal control systems",
  minutes: 18,
  intro:
    "Control is how a board's intentions survive contact with thousands of daily decisions it will never see. SBL examines whether a described system would actually work — which is a different question from whether it exists.",
  outcomes: [
    "Judge the features that make an internal control system effective, using a recognised framework such as COSO",
    "Decide whether the information reaching management is good enough to control risk with",
    "Work out where a described control system would fail, and why",
    "Advise on what poor control and non-compliance cost an organisation",
    "Recommend controls that would prevent fraud, error, waste or environmental harm in a given situation",
  ],
  sections: [
    {
      id: "what-control-is-for",
      heading: "What an internal control system is for",
      blocks: [
        {
          kind: "text",
          md: "**Internal control** is the whole set of processes, behaviours and information by which an organisation gives itself reasonable assurance that it will achieve its objectives: that operations are effective, reporting is reliable, assets are safeguarded, and law and policy are complied with. Two words in that carry weight — *reasonable*, because absolute assurance is unobtainable at any price, and *objectives*, because control exists to serve them rather than to exist.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Control is not a synonym for restriction",
          md: "A good system enables activity: it tells staff what they may decide alone, which speeds decisions rather than slowing them. Where a case shows people routinely working around a control, the usual cause is that the control was designed without reference to how the work is actually done — and the recommendation is to redesign it, not to enforce it harder.",
        },
        {
          kind: "text",
          md: "The **COSO framework** is the recognised reference the syllabus names, and it is useful in SBL because its five components give you an ordered way to diagnose a described system. Each component answers a different question, and a system usually fails in one specific place rather than everywhere.",
        },
        {
          kind: "table",
          caption: "The five components, as a diagnostic",
          head: ["Component", "Question it answers", "Typical failure in a case"],
          rows: [
            ["Control environment", "Does the tone, structure and competence support control?", "Senior override; unclear authority; nobody trained"],
            ["Risk assessment", "Have the risks to objectives been identified and rated?", "Register that missed the risk that materialised"],
            ["Control activities", "Are there specific controls addressing those risks?", "Controls exist for old risks, none for the current ones"],
            ["Information and communication", "Does the right information reach the right people in time?", "Board sees summaries too late to act; warnings do not travel up"],
            ["Monitoring", "Is anyone checking that controls still work?", "Controls signed off annually; no testing; failures unnoticed"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The control environment is the component to check first",
          md: "It conditions all the others. Excellent control activities inside a culture where executives bypass them produce no assurance at all — which is why the same finding recurs across SBL: the controls were adequate and the environment defeated them. Name the environment defect before listing missing procedures.",
        },
      ],
      check: {
        q: "A company has documented authorisation limits, segregated duties and monthly reconciliations, yet three significant losses occurred through directors approving transactions outside their limits without record. Which COSO component has failed?",
        options: [
          "Control activities — the controls themselves were insufficient",
          "The control environment — the activities were adequate but tone and accountability allowed them to be bypassed unrecorded",
          "Risk assessment — the losses were not anticipated",
          "Information and communication — the losses were reported late",
        ],
        correct: 1,
        explain:
          "The activities named are exactly the right ones, so adding more would simply create more things to bypass. The failure is that senior people could override them without record or challenge — an environment defect, and the reason it must be diagnosed first.",
      },
    },
    {
      id: "information-flows",
      heading: "Are the information flows adequate?",
      blocks: [
        {
          kind: "text",
          md: "F1(b) asks specifically whether the information reaching management is adequate for managing control and risk. It is a sharper requirement than it looks, because organisations that report a great deal often report the wrong things.",
        },
        {
          kind: "table",
          caption: "Testing management information",
          head: ["Test", "Question", "Common defect"],
          rows: [
            ["Relevance", "Does it bear on a decision someone can make?", "Volume of data with no decision attached"],
            ["Timeliness", "Does it arrive while the decision is still open?", "Monthly reporting on a weekly problem"],
            ["Accuracy and consistency", "Is it right, and does it agree with other sources?", "Two systems giving different figures for one measure"],
            ["Completeness", "Does it include the uncomfortable parts?", "Exceptions and near misses omitted"],
            ["Level of aggregation", "Can a problem still be seen at this level?", "Averages concealing a failing region or segment"],
            ["Forward view", "Does anything indicate what is coming?", "All lagging measures; no leading indicators"],
            ["Escalation", "Does bad news travel upward reliably?", "Warnings filtered by the manager they concern"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Aggregation is the defect candidates miss",
          md: "A group-level figure that meets target can contain a division in serious difficulty, and averaging is how genuine problems become invisible to a board. Where a case gives you both a consolidated number and a segmental breakdown, the difference between them is often the whole finding — and it is exactly what the public sector 'equity' point in SBL-11 warns about too.",
        },
        {
          kind: "text",
          md: "Escalation deserves the same attention. If the route for reporting a problem runs through the person responsible for it, the information will not arrive, and no amount of reporting discipline changes that. The structural fix is a route that bypasses them — which is why internal audit reports to the audit committee and why whistleblowing lines must not report to the operational management they concern.",
        },
      ],
      check: {
        q: "A board receives consolidated monthly results that meet target. Segmental data, not routinely provided, shows one of four divisions has been loss-making for six months. What is the primary information failure?",
        options: [
          "Reporting is too frequent and should be quarterly",
          "The level of aggregation conceals a division in difficulty, so the board cannot see or act on a problem the data already contains",
          "The divisions should be merged for reporting purposes",
          "There is no failure, as group performance is on target",
        ],
        correct: 1,
        explain:
          "The information exists inside the organisation and never reaches the people who could act, because consolidation averages it away. That is an information and communication failure in COSO terms, and it is why segmental visibility is a board-level requirement rather than a management convenience.",
      },
    },
    {
      id: "weaknesses-and-consequences",
      heading: "Weaknesses, compliance and what poor control costs",
      blocks: [
        {
          kind: "text",
          md: "F1(c) and F1(d) ask you to evaluate weaknesses and to advise on the consequences of poor control and non-compliance. The consequences are worth having ready, because a recommendation lands harder when the cost of inaction is stated.",
        },
        {
          kind: "table",
          caption: "What poor control and non-compliance actually cost",
          head: ["Consequence", "How it arises"],
          rows: [
            ["Direct loss", "Fraud, error, waste, theft, duplicate or incorrect payment"],
            ["Regulatory penalty", "Fines, undertakings, licence conditions, mandated remediation"],
            ["Personal liability", "Directors' liability, disqualification, in some cases prosecution"],
            ["Unreliable reporting", "Decisions and disclosures based on figures that are wrong"],
            ["Loss of trust", "Customers, lenders and investors reprice their relationship"],
            ["Higher cost of capital", "Lenders and investors demand more for perceived control risk"],
            ["Management distraction", "Senior time consumed by investigation and remediation"],
            ["Insurance and contracts", "Cover refused or priced up; counterparties impose terms"],
            ["Environmental harm", "Remediation cost, prosecution, and damage that cannot be undone"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Compliance is not the same as control, and neither implies the other",
          md: "An organisation can be fully compliant and badly controlled — meeting every external requirement while losing money through waste nobody measures. It can also be well controlled and non-compliant, if it has simply not noticed an obligation. Say which of the two a case has, because the remedy differs: one needs controls designed round the objectives, the other needs an obligations register and someone accountable for keeping it current.",
        },
        {
          kind: "text",
          md: "When recommending new or changed controls under F1(e), keep three tests in mind. The control must address the **specific mechanism** of the failure — a weakness in supplier onboarding is not fixed by more invoice approvals. It must be **proportionate**, because control costs money and attention and an over-controlled process gets circumvented. And someone must be **accountable** for operating it, with the failure visible if they do not.",
        },
        {
          kind: "example",
          title: "Designing controls against a described failure",
          scenario:
            "A council discovers £340,000 paid over two years to a supplier that does not exist. One officer created the supplier record, raised the purchase orders, approved the invoices and confirmed receipt. Invoices were just below the £5,000 threshold requiring a second signature.",
          steps: [
            { label: "Name the mechanism", detail: "One person controlled the entire cycle — creation, ordering, approval and confirmation — so no independent step existed at any point." },
            { label: "Segregate", detail: "Supplier master-data creation must be performed by a team that cannot raise or approve payments, with independent verification of the entity's existence." },
            { label: "Defeat threshold splitting", detail: "Monitor cumulative spend per supplier, not per invoice, and report invoices clustered just below an authorisation limit — that pattern is itself the alarm." },
            { label: "Add detection", detail: "Periodic review of new suppliers, matching bank details against duplicates and employee records." },
            { label: "Fix the environment", detail: "Ask why the single-officer arrangement persisted — usually resourcing or an unchallenged long-serving individual — because otherwise it reappears elsewhere." },
          ],
          result:
            "Each control attacks a named step in the mechanism, and the threshold-clustering monitor addresses the specific technique used rather than payments in general.",
        },
      ],
      check: {
        q: "Invoices from one supplier are consistently valued just below the threshold requiring second approval. What does this pattern most likely indicate, and what control answers it?",
        options: [
          "Normal commercial behaviour; no control change is needed",
          "Deliberate splitting to stay under the authorisation limit — monitor cumulative supplier spend and report clustering below thresholds",
          "The threshold is set too high and should be raised",
          "The supplier should be asked to consolidate its invoicing",
        ],
        correct: 1,
        explain:
          "Clustering just below a limit is a signature of deliberate avoidance, and per-invoice controls cannot see it by design. The control has to operate on cumulative spend and on the pattern itself — raising the threshold, as option 2 suggests, would remove even the existing check.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing missing control procedures before checking the control environment.", fix: "Tone, authority and override defeat good activities; diagnose the environment first." },
    { trap: "Treating volume of management reporting as adequacy.", fix: "Test relevance, timeliness, accuracy, completeness, aggregation, forward view and escalation." },
    { trap: "Missing aggregation defects.", fix: "Compare consolidated figures with segmental data — averages conceal failing divisions." },
    { trap: "Equating compliance with good control.", fix: "Either can exist without the other, and each needs a different remedy." },
    { trap: "Recommending generic extra approvals.", fix: "Attack the specific mechanism of the failure, proportionately, with a named accountable owner." },
  ],
  keyTerms: [
    { term: "Internal control", def: "The processes, behaviours and information giving reasonable assurance that objectives on operations, reporting, assets and compliance will be met." },
    { term: "Control environment", def: "The tone, structure, authority and competence conditioning whether every other control can work." },
    { term: "Control activities", def: "The specific procedures — authorisation, segregation, reconciliation, verification — addressing identified risks." },
    { term: "Monitoring", def: "Ongoing and periodic checking that controls remain present and effective." },
    { term: "Threshold splitting", def: "Breaking a transaction into amounts below an authorisation limit, which per-transaction controls cannot detect." },
    { term: "Reasonable assurance", def: "The realistic aim of internal control — absolute assurance is unattainable at any acceptable cost." },
  ],
  summary: [
    "Control serves objectives and gives reasonable, never absolute, assurance.",
    "Use COSO's five components as an ordered diagnostic, starting with the control environment.",
    "Test management information on relevance, timeliness, completeness, aggregation and escalation.",
    "Compliance and control are different; name which one the case lacks.",
    "Recommend controls that attack the specific mechanism, proportionately, with an accountable owner.",
  ],
  knowledgeDiagnostic: [
    { q: "Name COSO's five components.", a: "Control environment, risk assessment, control activities, information and communication, and monitoring." },
    { q: "Why check the control environment first?", a: "It conditions all the others — strong activities inside a culture of unrecorded override produce no assurance." },
    { q: "How does aggregation defeat a board?", a: "A consolidated figure on target can conceal a division in serious difficulty, so the information exists and never reaches anyone who can act." },
    { q: "Can an organisation be compliant and badly controlled?", a: "Yes — it can meet every external requirement while losing money to waste nobody measures; and it can be well controlled yet non-compliant through an unnoticed obligation." },
    { q: "What are the three tests for a recommended control?", a: "It addresses the specific mechanism of the failure, it is proportionate, and someone is accountable for operating it visibly." },
  ],
  furtherStudy: [
    "SBL-28 covers internal audit's assurance over these controls",
    "SBL-29 covers reporting on internal control to stakeholders",
    "SBL-21 covers assurance mapping across the four lines of defence",
    "SBL-04 covers fraud, bribery and the override problem",
  ],
}

const SBL_TREE_28: StudyChapter = {
  paper: "SBL",
  id: "SBL-28",
  number: 28,
  area: "F",
  syllabusRefs: ["F2(a)", "F2(b)", "F2(c)", "F2(d)"],
  title: "Internal audit, independence and compliance",
  minutes: 17,
  intro:
    "Internal audit is the board's own source of assurance about whether anything it has been told is true. Everything about the function follows from that — above all who it reports to, because an internal audit function reporting to the people it examines is worse than none.",
  outcomes: [
    "Examine whether an organisation needs an internal audit function, given its regulatory position and its own circumstances",
    "Justify why auditor independence matters in every client–auditor situation, internal audit included, and explain internal audit's part in compliance",
    "Justify why an effective audit committee overseeing internal audit is essential",
    "Assess whether management's response to auditors' recommendations is adequate",
  ],
  sections: [
    {
      id: "need-for-ia",
      heading: "Does the organisation need internal audit?",
      blocks: [
        {
          kind: "text",
          md: "Internal audit provides independent, objective assurance on whether risk management, control and governance are working, and advice on improving them. It reports to those charged with governance rather than to the managers whose work it examines — that reporting line is the function's defining characteristic, not an administrative detail.",
        },
        {
          kind: "text",
          md: "F2(a) asks you to examine the need for it in light of regulatory and organisational requirements. For some organisations it is required — by regulation, by a listing regime, or by a funder. Where it is not, the board must decide, and the syllabus expects a reasoned recommendation rather than a presumption.",
        },
        {
          kind: "table",
          caption: "Factors pointing towards a function, and against",
          head: ["Points towards", "Points against or towards an alternative"],
          rows: [
            ["Scale and complexity beyond direct board oversight", "Small organisation where directors see operations directly"],
            ["Regulated activity, or public funding with regularity requirements", "No external requirement, and low inherent risk"],
            ["Geographically dispersed or multi-entity operations", "Single site, few processes"],
            ["Rapid growth, acquisition or major systems change", "Stable, well-understood operations"],
            ["A history of control failures, fraud or restatement", "Strong record and a well-informed board"],
            ["Reliance on non-financial data now being reported externally", "Cost of a function disproportionate to the exposure"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Where a full function is not justified, recommend the substance",
          md: "The alternatives are real and worth naming: outsourcing internal audit to a firm, a co-sourced arrangement providing specialist skills the organisation lacks, periodic thematic reviews rather than a standing function, or extending external assurance. What must not be recommended is management assuring itself — the first line reporting on its own controls is not internal audit, and calling it so is the mistake the assurance map in SBL-21 exposes.",
        },
        {
          kind: "text",
          md: "Outsourcing brings genuine advantages — access to specialists, no fixed establishment cost, independence from internal relationships — and genuine drawbacks: less business knowledge, potential conflict where the same firm provides other services, cost per day, and confidentiality considerations. Where a case involves specialist risk such as cyber, a co-sourced model is often the best-advised answer because the internal team supplies context and the firm supplies capability.",
        },
      ],
      check: {
        q: "A rapidly growing, multi-site group without internal audit asks whether it needs one. Its finance director proposes that departmental managers complete annual control self-assessments instead. How should this be assessed?",
        options: [
          "Acceptable — self-assessment engages managers in control and is cheaper",
          "Self-assessment is not assurance: the first line would be reporting on its own controls, so the board gains no independent evidence. Recommend an internal audit function, or an outsourced or co-sourced alternative",
          "Assurance is unnecessary while the group is growing",
          "The external auditor should perform the work instead",
        ],
        correct: 1,
        explain:
          "Self-assessment has value as a management tool and provides no independent evidence, because the people operating the controls are reporting on them. Option 3 fails too: external audit's scope is directed at the financial statements, not at the group's control framework generally.",
      },
    },
    {
      id: "independence",
      heading: "Independence, and how it is lost",
      blocks: [
        {
          kind: "text",
          md: "Independence matters because assurance has no value beyond the credibility of the person giving it. An opinion from someone who could not have reported a problem freely tells the board nothing — and worse than nothing, because it creates false comfort that displaces the scrutiny the board would otherwise have applied.",
        },
        {
          kind: "table",
          caption: "How internal audit independence is compromised",
          head: ["Situation", "Why it destroys the assurance", "Remedy"],
          rows: [
            ["Reports to the finance director", "Cannot report freely on the finance function or on that person", "Functional reporting line to the audit committee"],
            ["Audits systems it helped design or implement", "Self-review — reviewing its own judgements", "Advisory and assurance roles separated, or external review of that area"],
            ["Head of internal audit's pay set by executives", "Financial dependence on those examined", "Remuneration set by the audit committee"],
            ["Audit plan determined by management", "The riskiest areas can simply be excluded", "Plan approved by the audit committee, risk-based"],
            ["Staff rotate into audit from, and back to, the areas audited", "Familiarity; reluctance to criticise future colleagues", "Manage rotation; disclose; avoid auditing recent own areas"],
            ["Findings edited by management before the committee sees them", "The committee receives a negotiated version", "Direct, unedited reporting with management response appended separately"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The two-line arrangement, and why it exists",
          md: "In practice the head of internal audit usually reports **functionally** to the audit committee — which sets the plan, approves the budget, appoints and removes the post-holder and receives findings directly — and **administratively** to a senior executive for day-to-day matters. If a case shows only the administrative line, the functional one is missing and independence is absent, whatever the charter says.",
        },
        {
          kind: "text",
          md: "On compliance, internal audit's role is to give assurance that the organisation's compliance arrangements work — not to own compliance itself. That distinction is the second-line/third-line point from SBL-21: if internal audit runs the compliance programme, nobody independent can assure it, and the organisation has quietly traded assurance for administration.",
        },
      ],
      check: {
        q: "A head of internal audit reports to the finance director, who approves the annual audit plan and reviews all reports before they reach the audit committee. What is the fundamental defect?",
        options: [
          "The audit plan should be approved annually rather than each quarter",
          "Independence is absent — the function cannot freely examine or report on the finance function or the person controlling its plan, budget and findings",
          "The head of internal audit is insufficiently senior",
          "Reports should be circulated to all directors, not just the committee",
        ],
        correct: 1,
        explain:
          "Every lever that makes the function independent — plan, reporting line, access to the committee — sits with an executive whose own area is within scope. Any assurance produced is unreliable, and its existence is worse than its absence because it displaces board scepticism.",
      },
    },
    {
      id: "committee-and-responses",
      heading: "The audit committee, and responding to recommendations",
      blocks: [
        {
          kind: "text",
          md: "F2(c) asks you to justify why an effective audit committee overseeing internal audit is important. The answer is that the committee is the mechanism that makes independence real: it is where the reporting line terminates, and without it internal audit has nowhere to report that is not management.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What the committee must actually do for internal audit",
          items: [
            "**Approve a risk-based plan**, so coverage follows exposure rather than convenience",
            "**Appoint, remunerate and if necessary remove** the head of internal audit",
            "**Receive findings directly and unedited**, with management's response shown separately",
            "**Meet the head of internal audit without executives present**, at least periodically",
            "**Assess the function's effectiveness**, including whether it has the resource and skills for the plan",
            "**Track management's implementation** of agreed actions to completion",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The private meeting is the item most often missing",
          md: "A committee that only ever meets internal audit with the executive team in the room has removed the one occasion on which uncomfortable matters can be raised. When an exhibit lists committee activities and this is absent, say so — it is a small, specific, easily-remedied finding of exactly the kind SBL rewards.",
        },
        {
          kind: "text",
          md: "F2(d) — assessing responses to auditors' recommendations — is the outcome that determines whether any of this mattered. An audit finding that is accepted and not actioned has cost the organisation the audit fee and left the exposure in place, with the added disadvantage that the board now knows about it.",
        },
        {
          kind: "table",
          caption: "Assessing a management response",
          head: ["Response", "Assessment", "What the committee should do"],
          rows: [
            ["Accepted, actioned, verified by re-audit", "Adequate", "Close it, and note the timescale achieved"],
            ["Accepted with owner and date", "Adequate if tracked", "Track to completion; do not close on acceptance alone"],
            ["Accepted repeatedly across periods, never implemented", "Inadequate — acceptance is being used to close discussion", "Escalate; require the executive to explain in person"],
            ["Rejected with a reasoned case on cost or proportionality", "Legitimate — this is a valid answer", "Record the risk as consciously accepted, by whom, with a review date"],
            ["Rejected without reasons, or the finding disputed generally", "Inadequate", "Require a substantive response; consider independent review"],
            ["Actioned differently from the recommendation", "Assess on substance", "Test whether the alternative addresses the mechanism"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "'Accepted' is not an outcome, and repeat findings are the strongest evidence available",
          md: "The same recommendation appearing in three consecutive years tells you two things at once: the exposure is still live, and the organisation's process for acting on assurance does not work. The second is the more serious finding, and it belongs in the answer explicitly — otherwise the recommendation is simply that they should do it this time.",
        },
        {
          kind: "text",
          md: "Note also that management is entitled to decline a recommendation. Internal audit advises; the board and management decide, and a reasoned rejection on cost or proportionality is a legitimate application of ALARP from SBL-20. What is required is that the decision is explicit, that the residual risk is recorded as consciously accepted, that it is attributed to a named person, and that it comes back for review.",
        },
      ],
      check: {
        q: "The same internal audit recommendation has been accepted by management in each of the last three years and never implemented. What is the most significant finding?",
        options: [
          "The recommendation is probably impractical and should be withdrawn",
          "Beyond the live exposure, the organisation's process for acting on assurance is ineffective — acceptance is being used to close discussion without action",
          "Internal audit should stop reporting the matter",
          "The audit committee should implement the recommendation itself",
        ],
        correct: 1,
        explain:
          "Two findings sit here and the systemic one matters more: if agreed actions are not delivered, no assurance activity can improve anything, so every other audit is also being wasted. The committee's remedy is to track to completion and require personal explanation, not to act operationally itself.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating management control self-assessment as assurance.", fix: "The first line reporting on its own controls gives the board no independent evidence." },
    { trap: "Assuming external audit covers the control framework.", fix: "Its scope is directed at the financial statements, not at governance and control generally." },
    { trap: "Accepting an internal audit function as independent because a charter says so.", fix: "Check the functional reporting line, who sets the plan and budget, and whether findings arrive unedited." },
    { trap: "Reading 'recommendation accepted' as resolved.", fix: "Acceptance is not an outcome; track implementation, and treat repeat findings as a systemic failure." },
    { trap: "Treating a rejected recommendation as automatically wrong.", fix: "Management may decline on reasoned cost grounds — require the residual risk to be recorded, owned and reviewed." },
  ],
  keyTerms: [
    { term: "Internal audit", def: "Independent, objective assurance and advice on risk management, control and governance, reporting to those charged with governance." },
    { term: "Functional reporting line", def: "Internal audit's line to the audit committee, which sets its plan and budget and receives findings directly — the source of its independence." },
    { term: "Co-sourcing", def: "Combining an in-house team with external specialists, so internal knowledge and specialist capability are both available." },
    { term: "Risk-based audit plan", def: "A plan allocating audit effort according to exposure rather than convenience or cycle." },
    { term: "Repeat finding", def: "A recommendation reappearing across periods, evidencing both a live exposure and a failed process for acting on assurance." },
  ],
  summary: [
    "Internal audit's defining feature is who it reports to, not what it examines.",
    "Where a full function is unjustified, recommend outsourcing, co-sourcing or thematic review — never self-assessment.",
    "Independence dies through reporting lines, self-review, management-set plans and edited findings.",
    "The audit committee makes independence real; the private meeting without executives is often missing.",
    "Acceptance is not implementation, and repeat findings are a systemic failure worth naming.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes internal audit independent in practice?", a: "A functional reporting line to the audit committee, which approves the risk-based plan and budget, appoints and removes the post-holder, and receives findings unedited." },
    { q: "Why is management self-assessment not assurance?", a: "The first line is reporting on its own controls, so the board receives no independent evidence." },
    { q: "What must an audit committee do beyond receiving reports?", a: "Approve a risk-based plan, control appointment and pay, meet internal audit privately, assess the function's effectiveness, and track agreed actions to completion." },
    { q: "How should a reasoned rejection of a recommendation be handled?", a: "Accept it as legitimate, and record the residual risk as consciously accepted by a named person with a review date." },
    { q: "Why is a repeat finding especially serious?", a: "It shows both that the exposure is live and that the organisation's process for acting on assurance does not work, which wastes every other audit too." },
  ],
  furtherStudy: [
    "SBL-27 covers the control systems internal audit examines",
    "SBL-29 covers reporting on internal control externally",
    "SBL-09 covers the audit committee's wider responsibilities",
    "SBL-21 covers where internal audit sits in the four lines of defence",
  ],
}

const SBL_TREE_29: StudyChapter = {
  paper: "SBL",
  id: "SBL-29",
  number: 29,
  area: "F",
  syllabusRefs: ["F3(a)", "F3(b)", "F3(c)"],
  title: "Internal control and management reporting",
  minutes: 16,
  intro:
    "The point where control meets disclosure. A board that reports on its controls is making a statement it can be held to — and the same controls determine whether anything else it reports, financial or sustainability, can be relied on.",
  outcomes: [
    "Justify why shareholders should receive a report on internal control",
    "Describe what such a report should contain, including environmental and sustainability audit",
    "Assess how internal control underpins reliable financial and sustainability reporting",
    "Recognise where a control report is written to reassure rather than to inform",
  ],
  sections: [
    {
      id: "why-report",
      heading: "Why report on internal control at all",
      blocks: [
        {
          kind: "text",
          md: "Shareholders bear the consequences of control failure and cannot observe the control system themselves — the information asymmetry from SBL-05, applied to control. A report is the mechanism by which the board accounts for a responsibility that is unambiguously its own, and it has effects beyond disclosure.",
        },
        {
          kind: "table",
          caption: "What a control report achieves",
          head: ["Effect", "Mechanism"],
          rows: [
            ["Accountability", "The board states publicly that it has reviewed effectiveness, and can be judged on it"],
            ["Discipline", "Having to report drives the review actually happening"],
            ["Informed investment", "Owners can price control risk instead of assuming"],
            ["Lower cost of capital", "Credible disclosure reduces the risk premium demanded"],
            ["Early correction", "Weaknesses surfaced for disclosure tend to get fixed first"],
            ["Comparability", "Owners can compare governance quality across investments"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The discipline effect is the argument boards find persuasive",
          md: "The requirement to report forces an annual review that would otherwise slip, and the prospect of disclosing a weakness is a powerful incentive to remedy it beforehand. So the reporting requirement improves control itself — not merely the information about it — which is a stronger case than transparency alone.",
        },
      ],
      check: {
        q: "Which argument best justifies requiring a board to report publicly on internal control effectiveness?",
        options: [
          "It transfers responsibility for control failures to shareholders",
          "It compels an annual review that might otherwise not happen, and the prospect of disclosing a weakness creates pressure to remedy it — so control itself improves, not just the disclosure",
          "It allows the external auditor to reduce audit work",
          "It guarantees that control failures will not occur",
        ],
        correct: 1,
        explain:
          "The discipline effect operates on the organisation's behaviour rather than only on what owners know. Option 0 has it backwards — reporting confirms the board's responsibility rather than shifting it — and no disclosure regime can guarantee outcomes.",
      },
    },
    {
      id: "contents",
      heading: "What the report should contain",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The elements of a useful control report",
          items: [
            "**Acknowledgement** that the board is responsible for the system and for reviewing its effectiveness",
            "**Description of the system** — its framework, and how risk assessment and control activities operate",
            "**Confirmation that a review has taken place**, saying what period and what scope it covered",
            "**The basis of the review** — internal audit work, management assurances, external input, committee oversight",
            "**Significant weaknesses identified**, and what is being done about them, with owners and timescales",
            "**A statement about the framework's limits** — reasonable, not absolute, assurance",
            "**Coverage of non-financial control**, including environmental and sustainability matters where material",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "How to tell a real report from a reassuring one",
          md: "A report that describes the system at length, states that the board has reviewed it, and discloses no weakness at all is the pattern to be sceptical about — every real control system has weaknesses, and a system with none identified usually means none were looked for. A report naming two significant weaknesses with owners and dates is *better* evidence of a functioning system than one asserting perfection.",
        },
        {
          kind: "text",
          md: "**Environmental and sustainability audit** belongs here, as F3(b) makes explicit. It means examining whether the organisation's environmental policies are being complied with, whether its environmental data are accurate, and whether the management system supporting them — the ISO 14000 or EMAS arrangements from SBL-10 — actually operates. This is increasingly important because sustainability figures are now published, sometimes assured, and often used by investors, while the controls behind them are frequently far weaker than those over financial data.",
        },
      ],
      check: {
        q: "A board's control report describes its framework in detail, confirms a review took place, and identifies no weaknesses. How should this be read?",
        options: [
          "As strong evidence of an effective control system",
          "With scepticism — all real systems have weaknesses, so identifying none suggests the review did not look; a report naming weaknesses with owners and dates is better evidence",
          "As non-compliant with disclosure requirements",
          "As adequate provided the external auditor has not objected",
        ],
        correct: 1,
        explain:
          "Absence of findings is more likely to be evidence about the review than about the system. This is the same instinct as reading a board's unanimous approval record in SBL-08 — the reassuring surface is what should prompt the question.",
      },
    },
    {
      id: "underpinning-reporting",
      heading: "How control underpins reliable reporting",
      blocks: [
        {
          kind: "text",
          md: "F3(c) makes the connection explicit: reported information is only as reliable as the controls that produced it. Every figure in a set of financial statements or a sustainability report is the output of a process, and if that process is uncontrolled the figure is an estimate of unknown quality however carefully it is presented.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "From transaction to disclosure",
            data: {
              steps: [
                { label: "Event occurs", sub: "A sale, a shipment, an emission" },
                { label: "Captured", sub: "Completely and once only" },
                { label: "Recorded", sub: "Correct amount, period and classification" },
                { label: "Processed", sub: "Aggregated without loss or duplication" },
                { label: "Reviewed", sub: "Reconciled; exceptions investigated" },
                { label: "Reported", sub: "Presented on a stated, consistent basis" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Sustainability data usually has the weaker control environment — and that is the finding",
          md: "Financial data has decades of control practice, segregation, reconciliation and audit behind it. Emissions, water, waste and social metrics are frequently compiled in spreadsheets by one person from supplier estimates, with no segregation, no reconciliation and no independent testing — yet they are now published and relied upon. When a case reports both, the control asymmetry between them is very often the strongest single observation available.",
        },
        {
          kind: "text",
          md: "Two consequences follow for a recommendation. First, controls over non-financial data should be built to the standard applied to financial data before external assurance is sought — assuring a poorly controlled process produces a heavily qualified opinion at high cost. Second, definitions matter more here than in financial reporting, because there is less standardisation: the organisation must state the basis, apply it consistently, and disclose any change, or a genuine improvement becomes indistinguishable from a redefinition.",
        },
        {
          kind: "example",
          title: "Control asymmetry in one company",
          scenario:
            "A group's revenue recognition is supported by system controls, segregation and reconciliation, and is audited annually. Its published emissions figure is compiled each January by a sustainability officer from supplier estimates in a spreadsheet, is not reconciled to anything, and has never been tested internally. Investors cite the emissions figure in engagement meetings.",
          steps: [
            { label: "State the asymmetry", detail: "Two published figures with entirely different control pedigrees, presented in the same report with equal apparent authority." },
            { label: "Assess the exposure", detail: "An error or restatement in the emissions figure carries reputational and potentially regulatory consequences, and investors are relying on it now." },
            { label: "Build the controls", detail: "Define each measure, identify data owners, segregate compilation from review, reconcile to operational records, and bring it into internal audit's plan." },
            { label: "Then assure", detail: "Seek external assurance once the process can withstand it, and disclose the scope and level obtained." },
            { label: "Report honestly meanwhile", detail: "Disclose the basis of preparation and its current limitations rather than presenting the figure as equivalent to the audited ones." },
          ],
          result:
            "The advice sequences control before assurance, which is both cheaper and the only order that produces a usable opinion.",
        },
      ],
      check: {
        q: "A company plans to obtain external assurance over an emissions figure compiled in a spreadsheet by one person from supplier estimates, with no reconciliation or internal testing. What should be advised?",
        options: [
          "Proceed — external assurance will identify and correct any weaknesses",
          "Build the control environment first — define the measure, assign owners, segregate compilation from review and reconcile to operational records — because assuring an uncontrolled process yields a qualified opinion at high cost",
          "Abandon the disclosure, as the data cannot be made reliable",
          "Obtain assurance over the financial statements instead",
        ],
        correct: 1,
        explain:
          "Assurance tests a process; it does not substitute for one. Engaging an assurance provider over an uncontrolled compilation produces either a heavily qualified conclusion or a very expensive engagement rebuilding the data — which is why control comes first in the sequence.",
      },
    },
  ],
  examTraps: [
    { trap: "Justifying control reporting on transparency alone.", fix: "Use the discipline effect — the requirement forces the review and drives remediation, improving control itself." },
    { trap: "Reading a report with no disclosed weaknesses as reassuring.", fix: "All real systems have weaknesses; naming them with owners and dates is better evidence than asserting perfection." },
    { trap: "Treating sustainability figures as equivalent in reliability to audited financial ones.", fix: "Compare their control environments — the asymmetry is usually the strongest observation available." },
    { trap: "Recommending external assurance over a poorly controlled process.", fix: "Build definitions, ownership, segregation and reconciliation first; assurance tests a process rather than replacing it." },
  ],
  keyTerms: [
    { term: "Internal control report", def: "A board statement acknowledging responsibility for the control system, confirming a review, and disclosing significant weaknesses and remediation." },
    { term: "Environmental audit", def: "Examination of compliance with environmental policy, the accuracy of environmental data, and whether the supporting management system operates." },
    { term: "Basis of preparation", def: "The stated definitions and methods behind a reported measure, essential where no standard framework exists." },
    { term: "Control asymmetry", def: "The gap between well-controlled financial data and weakly controlled non-financial data published alongside it." },
  ],
  summary: [
    "Control reporting exists because owners bear the consequences and cannot observe the system.",
    "Its strongest justification is the discipline effect: reporting forces review and remediation.",
    "A useful report acknowledges responsibility, describes the review's basis, and names weaknesses with owners.",
    "Reported figures are only as reliable as the processes producing them.",
    "Sustainability data usually has far weaker controls than financial data — control it before assuring it.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the strongest justification for reporting on internal control?", a: "The discipline effect — the requirement forces an annual review and creates pressure to remedy weaknesses before disclosure, so control itself improves." },
    { q: "What should a control report contain?", a: "Board responsibility, a description of the system, confirmation and scope of the review, its basis, significant weaknesses with owners and dates, the reasonable-assurance limit, and material non-financial control." },
    { q: "Why is a report disclosing no weaknesses suspicious?", a: "Every real system has weaknesses, so identifying none is more likely evidence about the review than about the system." },
    { q: "Why is sustainability data typically less reliable than financial data?", a: "It is often compiled by one person from estimates without segregation, reconciliation or internal testing, while financial data has decades of control practice and audit behind it." },
    { q: "In what order should control and assurance be addressed?", a: "Control first — definitions, ownership, segregation, reconciliation — then assurance, since assurance tests a process rather than creating one." },
  ],
  furtherStudy: [
    "SBL-27 covers the control systems being reported on",
    "SBL-28 covers internal audit, a principal basis for the board's review",
    "SBL-10 covers integrated reporting and the assurance of sustainability information",
    "SBL-23 covers the data quality this depends on",
  ],
}

export const SBL_TREE_AREA_F: StudyChapter[] = [SBL_TREE_27, SBL_TREE_28, SBL_TREE_29]
