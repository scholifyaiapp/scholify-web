import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * APM · Area D — data science and technology for performance and insights.
 *
 *   APM-32  Technology and performance management systems (D1a)
 *   APM-33  Data silos, ERPS, KMS and CRMS               (D1b, D1c)
 *   APM-34  Systems risk, security and lean information  (D1d, D1e)
 *   APM-35  Big data                                     (D2a)
 *   APM-36  The data science process and analytics types (D2b, c, d)
 *   APM-37  Regression and reading data honestly         (D2e)
 *   APM-38  Machine learning, AI and model output        (D2f, g, h, i)
 *
 * Area D is the second guaranteed 25-mark Section B question every sitting —
 * the syllabus states that one Section B question comes from C and one from D.
 * It is also the area the restructure expanded most: D2 has nine outcomes, four
 * of them new, covering data types, regression, machine learning, model output
 * and advising management on it.
 *
 * This module retires the last of the shim: acca-study-apm-official.ts's Area D
 * lifted the blocks out of one section of the legacy APM_B chapter with
 * `take(APM_B,["it-information"])[0].blocks`, which is why that file and the
 * helper survived the Area B rebuild. Both go here.
 *
 * Written against the official ACCA APM syllabus and study guide for September
 * 2026 to June 2027. See acca-study-apm-tree-a.ts for the note on the shim and
 * on why the originality corpus is the syllabus text alone.
 */

const APM_TREE_32: StudyChapter = {
  paper: "APM",
  id: "APM-32",
  number: 32,
  area: "D",
  syllabusRefs: ["D1(a)"],
  title: "Technology and performance management systems",
  minutes: 17,
  intro:
    "Every technology in this outcome changes what can be measured, how quickly, and by whom. That is the examinable consequence — not what the technology is.",
  outcomes: [
    "Advise how IT developments influence performance management systems",
    "Explain what each named technology changes about measurement",
    "Assess the performance consequences rather than describing the technology",
    "Identify where technology creates measurement problems as well as solving them",
    "Recommend technology in terms of the decisions it would improve",
  ],
  sections: [
    {
      id: "what-changes",
      heading: "What each development changes about measurement",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Never describe the technology",
          md: "A requirement asking how IT developments may influence performance management is not asking what a data warehouse is. It is asking what becomes **measurable, faster, cheaper or automatic** as a result, and what new problems that creates. Two sentences of description at most, then the consequence.",
        },
        {
          kind: "table",
          caption: "The technologies the syllabus names",
          head: ["Development", "What it changes about measurement", "The problem it introduces"],
          rows: [
            ["Unified corporate database", "One version of each figure across the organisation; definitions become consistent", "A single point of failure, and a large migration and governance burden"],
            ["Data warehouse", "Historic data from many systems in one place, structured for analysis", "Data is a snapshot; it is only as good as the feeds and definitions behind it"],
            ["Process automation", "Transactions captured as they occur, so reporting becomes near real time", "Automates whatever process exists — including a bad one"],
            ["Artificial intelligence", "Patterns and predictions humans would not find; some decisions taken without a person", "Explainability, bias and accountability for the outcome"],
            ["RFID", "Automatic tracking of physical items, so location and movement become measurable continuously", "Enormous data volume, and privacy issues where people are tracked"],
            ["Cloud", "Capacity on demand, lower entry cost, access from anywhere", "Dependence on a supplier, data location and residency, cost that scales with use"],
            ["Network technology", "Real-time consolidation across sites and countries", "Security exposure grows with connectivity"],
          ],
        },
        {
          kind: "text",
          md: "The genuine shift these produce together is from **periodic** to **continuous** measurement. A monthly management pack existed because collecting the data took a month; when transactions are captured automatically, the constraint disappears. That changes the management model itself — exception alerts rather than a monthly review, and intervention during the period rather than explanation after it.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Real time is not automatically better",
          md: "Faster data can produce **over-reaction to noise**: a manager watching a daily figure intervenes in random variation and destabilises the process. It can also overwhelm attention, which is Area C's problem arriving at higher frequency. The recommendation is usually real-time monitoring with exception thresholds, not real-time reporting of everything to everyone.",
        },
      ],
      check: {
        q: "A company installs process automation that makes daily sales and margin data available to all managers. Within months, performance is more volatile. What is the likely cause?",
        options: [
          "The data must be inaccurate",
          "Managers are reacting to daily fluctuations that are mostly random variation rather than genuine signal, intervening when they should not — the fix is exception thresholds so that only movements outside normal variation prompt action",
          "Automation always reduces performance initially",
          "Daily reporting is prohibited under management accounting standards",
        ],
        correct: 1,
        explain:
          "Responding to noise as though it were signal is a classic consequence of increased reporting frequency, and it makes processes less stable rather than more. Thresholds based on normal variation let the frequency be an advantage — the manager sees a genuine problem sooner without acting on every fluctuation.",
      },
    },
    {
      id: "advising",
      heading: "Advising on technology as a performance decision",
      blocks: [
        {
          kind: "text",
          md: "Technology proposals are usually presented as capability — what the system can do. An APM answer reframes them as **performance decisions**: which decision improves, by how much, and what would have to be true for the benefit to arrive.",
        },
        {
          kind: "list",
          style: "number",
          title: "The questions to put to any proposal",
          items: [
            "Which decision is currently taken badly, and why?",
            "What information would make it better, and is the constraint really the technology or the process behind it?",
            "Who would act differently, and do they have the authority to?",
            "What is the total cost — licences, implementation, data cleansing, training, ongoing support — against the value of the improved decision?",
            "What are the risks: dependence, security, data quality, and the automation of an unfixed process?",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The recurring finding",
          md: "The constraint is very often **not** information. Where a manager already knows what the problem is and cannot act on it — no authority, no budget, conflicting measures — better data changes nothing, and the money would be better spent on the process or the responsibility structure. Identifying that is a high-value observation and one most candidates never make.",
        },
        {
          kind: "text",
          md: "Note also the interaction with **process re-engineering**: automating an existing process encodes it permanently, so the redesign question should be asked before the system is specified. That connection between D1 and B3(e) is exactly the kind of cross-area link the Section A case study is built to reward.",
        },
      ],
      check: {
        q: "A depot manager reports that a proposed analytics system would tell them which routes are unprofitable — information they say they already have from experience. What should the adviser conclude?",
        options: [
          "The manager is resisting change and should be overruled",
          "The constraint may not be information at all — if the manager already knows and has not acted, the question is whether they have the authority, budget or incentive to change the routes, and better data would not address any of those",
          "The system should be purchased anyway to confirm the manager's judgement",
          "Analytics systems are unsuitable for logistics",
        ],
        correct: 1,
        explain:
          "Investing in information solves an information problem. Where the knowledge already exists and the action has not followed, the binding constraint is elsewhere — authority, funding, or a measure that rewards keeping the route — and spending on analytics leaves it untouched.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing what each technology is.", fix: "Say what becomes measurable, faster or automatic, and what problem that creates." },
    { trap: "Presenting real-time data as an unqualified benefit.", fix: "It invites over-reaction to noise; recommend exception thresholds." },
    { trap: "Assuming the constraint is information.", fix: "Check whether the manager already knows and simply cannot act." },
    { trap: "Specifying a system before redesigning the process.", fix: "Automation makes the existing process permanent." },
  ],
  keyTerms: [
    { term: "Data warehouse", def: "A store of historic data drawn from multiple operational systems and structured for analysis rather than transaction processing." },
    { term: "Process automation", def: "Technology performing transaction steps without human intervention, capturing data as events occur and enabling near real-time reporting." },
    { term: "Exception threshold", def: "A limit outside normal variation, beyond which a movement prompts action — the control that makes high-frequency data usable." },
  ],
  summary: [
    "Say what each technology changes about measurement, not what it is.",
    "The collective shift is from periodic to continuous measurement, which changes the management model.",
    "Real-time data invites over-reaction to noise; use exception thresholds.",
    "Ask whether the binding constraint is really information — often it is authority or incentives.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the underlying shift these technologies produce?", a: "From periodic reporting, which existed because data collection took time, to continuous measurement with intervention during the period." },
    { q: "Why can faster reporting make performance worse?", a: "Managers react to random variation as though it were signal, intervening when they should not and destabilising the process." },
    { q: "When does better information fail to improve a decision?", a: "When the decision-maker already knows the answer and lacks the authority, budget or incentive to act on it." },
  ],
  furtherStudy: [
    "APM-33 covers the specific systems — ERPS, KMS and CRMS — and the data silo problem.",
    "APM-24 covers process re-engineering, which should precede system specification.",
    "APM-28 covers the reporting overload that higher frequency intensifies.",
  ],
}

const APM_TREE_33: StudyChapter = {
  paper: "APM",
  id: "APM-33",
  number: 33,
  area: "D",
  syllabusRefs: ["D1(b)", "D1(c)"],
  title: "Data silos, ERPS, KMS and CRMS",
  minutes: 16,
  intro:
    "When every department has its own system, the organisation has several versions of the truth and no way of choosing between them. That is a performance management problem before it is a technology one.",
  outcomes: [
    "Explain data silos and assess the problems they create for the accounting function",
    "Evaluate enterprise resource planning systems for managing performance",
    "Evaluate knowledge management systems and their particular difficulty",
    "Evaluate customer relationship management systems and what they make measurable",
    "Recommend an approach where silos exist, including the non-technical remedies",
  ],
  sections: [
    {
      id: "silos",
      heading: "Data silos and the accounting function",
      blocks: [
        {
          kind: "text",
          md: "A **data silo** is a store of data held within one function and not accessible to, or consistent with, the rest of the organisation. Silos arise naturally: each department buys the system that suits its own work, at different times, with its own definitions.",
        },
        {
          kind: "table",
          caption: "What silos do to the accounting function specifically",
          head: ["Problem", "Consequence for the accountant"],
          rows: [
            ["Inconsistent definitions", "Sales counts an order when signed, operations when shipped, finance when invoiced — three revenue figures, all defensible"],
            ["Manual reconciliation", "Finance spends its time joining data instead of analysing it"],
            ["Delay", "Consolidation takes days, so reporting is slow and the data is stale on arrival"],
            ["Error risk", "Re-keying and spreadsheet joins introduce mistakes no control catches"],
            ["Disputed figures", "Meetings spent arguing about whose number is right rather than what to do"],
            ["Incomplete analysis", "Questions spanning functions — customer profitability, cost to serve — cannot be answered at all"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The worst consequence is not inefficiency",
          md: "It is that **cross-functional questions become unanswerable**. Customer profitability needs sales, service, logistics and finance data joined together; so does cost to serve, so does the value chain analysis from APM-20. A siloed organisation cannot see its own economics, which is why the problem belongs in a performance management syllabus rather than an IT one.",
        },
        {
          kind: "text",
          md: "And the remedy is only partly technical. Integration helps, but if the definitions still differ the integrated system holds inconsistent data faster. The non-technical half — an agreed **KPI dictionary** with one owner per measure, from APM-30 — is what actually resolves the disputed-figure problem, and recommending both is what makes the advice complete.",
        },
      ],
      check: {
        q: "A company's sales, operations and finance systems each report a different revenue figure for the same month. What should be recommended?",
        options: [
          "Adopt the finance figure, since finance owns reporting",
          "Both halves of the remedy: agree a single definition of revenue with a named owner, then integrate the systems — because integrating without agreeing the definition simply produces inconsistent data more quickly",
          "Reconcile the three figures manually each month",
          "Report all three figures so users can choose",
        ],
        correct: 1,
        explain:
          "The technical and definitional problems are separate, and integration alone solves only one of them. Manual reconciliation — option 2 — is the status quo that consumes the accounting function's time, and reporting three figures abandons the idea of a single version of the truth entirely.",
      },
    },
    {
      id: "the-systems",
      heading: "ERPS, KMS and CRMS",
      blocks: [
        {
          kind: "table",
          caption: "The three systems the syllabus names",
          head: ["System", "What it does", "What it makes measurable", "Limitation"],
          rows: [
            ["Enterprise resource planning", "Single integrated system across finance, operations, HR and supply chain, on one database", "Consistent, real-time, cross-functional performance data", "Very expensive and disruptive; forces standard processes that may not suit every unit"],
            ["Knowledge management", "Captures, stores and shares organisational knowledge and expertise", "Reuse of expertise, time to competence, avoidance of repeated mistakes", "Tacit knowledge resists capture; nobody has time to contribute; content decays"],
            ["Customer relationship management", "Consolidates all customer interactions and history", "Customer profitability, retention, service levels, cross-sell, cost to serve", "Only as good as the discipline of the people entering data"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The knowledge management difficulty is worth stating",
          md: "Most valuable organisational knowledge is **tacit** — held in people's judgement and not readily written down. A system can store documents; it cannot store the experience that tells someone which document matters. So knowledge management systems reliably underdeliver against their promise, and the successful ones focus on connecting people to each other rather than on accumulating content.",
        },
        {
          kind: "text",
          md: "**ERPS** is the one most likely to appear in a scenario, and the balanced answer matters. It genuinely solves the silo problem, gives one version of the truth and enables cross-functional analysis. It is also among the most expensive and disruptive projects an organisation can undertake, it imposes standard processes on units whose circumstances differ, and it fails most often for non-technical reasons — inadequate data cleansing, insufficient training, and unwillingness to change working practices to fit the system.",
        },
        {
          kind: "text",
          md: "**CRMS** deserves a specific performance point: it is what makes **customer profitability analysis** possible, and that analysis routinely overturns the assumed ranking of accounts. Linking CRMS to the activity-based costing of APM-21 is the connection an examiner rewards — the system supplies the interaction data, ABC supplies the cost of serving, and together they answer a question the general ledger cannot.",
        },
      ],
      check: {
        q: "Why do knowledge management systems frequently fail to deliver their expected benefit?",
        options: [
          "The software is technically unreliable",
          "The most valuable knowledge is tacit — held in judgement and experience rather than in documents — so it resists capture, while contributed content decays and people lack time to maintain it",
          "They are too expensive for most organisations",
          "Knowledge cannot be shared between departments",
        ],
        correct: 1,
        explain:
          "The system can store what has been written down, but the expertise that matters most is usually the judgement about which of it applies. That is why the more successful implementations concentrate on connecting people who hold the knowledge rather than on accumulating documents.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating silos as purely a technology problem.", fix: "Integration without agreed definitions produces inconsistent data faster." },
    { trap: "Recommending ERPS without its costs.", fix: "It is among the most expensive and disruptive projects available, and usually fails for non-technical reasons." },
    { trap: "Describing what each system is.", fix: "Say what it makes measurable, and what limits that." },
    { trap: "Overstating knowledge management.", fix: "Tacit knowledge resists capture; connecting people beats accumulating content." },
  ],
  keyTerms: [
    { term: "Data silo", def: "Data held within one function and inaccessible to, or inconsistent with, the rest of the organisation." },
    { term: "Enterprise resource planning system", def: "A single integrated system running the organisation's main functions from one database, giving one version of each figure." },
    { term: "Tacit knowledge", def: "Knowledge held in individual judgement and experience, which resists being written down or stored in a system." },
  ],
  summary: [
    "Silos produce several defensible versions of the same figure and consume the accounting function's time.",
    "Their worst effect is that cross-functional questions become unanswerable.",
    "The remedy is definitional as well as technical — a KPI dictionary alongside integration.",
    "ERPS solves silos expensively; KMS underdelivers because knowledge is tacit; CRMS enables customer profitability.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a data silo a performance management problem?", a: "It makes cross-functional analysis — customer profitability, cost to serve — impossible, so the organisation cannot see its own economics." },
    { q: "Why is integration alone insufficient?", a: "If definitions still differ between functions, the integrated system holds inconsistent data more quickly." },
    { q: "What does CRMS enable when combined with activity-based costing?", a: "Customer profitability analysis — interaction data from the system, cost of serving from ABC — which the general ledger cannot produce." },
  ],
  furtherStudy: [
    "APM-34 covers the security and information-value questions these systems raise.",
    "APM-21 covers the activity-based costing that customer data enables.",
    "APM-30 covers the KPI dictionary that resolves the definitional half of the silo problem.",
  ],
}

const APM_TREE_34: StudyChapter = {
  paper: "APM",
  id: "APM-34",
  number: 34,
  area: "D",
  syllabusRefs: ["D1(d)", "D1(e)"],
  title: "Systems risk, security and lean information",
  minutes: 16,
  intro:
    "Two outcomes that pull in opposite directions: protect the information you hold, and stop holding information that earns nothing.",
  outcomes: [
    "Assess the risks to systems and data facing an organisation",
    "Recommend methods and controls to protect technology and information",
    "Evaluate whether management information systems are lean",
    "Assess the value of the information a system provides, using the 5 Ss",
    "Balance security and access against the cost of both",
  ],
  sections: [
    {
      id: "risk-controls",
      heading: "Risks and controls",
      blocks: [
        {
          kind: "table",
          caption: "The risks, and what actually mitigates each",
          head: ["Risk", "Example", "Control"],
          rows: [
            ["External attack", "Ransomware, intrusion, denial of service", "Firewalls, patching, monitoring, segregated backups held offline"],
            ["Internal misuse", "Staff accessing or extracting data beyond their role", "Access rights by role, logging, review of privileged accounts"],
            ["Human error", "Misdirected data, wrong file deleted, weak password reused", "Training, confirmation steps, least-privilege access"],
            ["System failure", "Hardware, software or supplier outage", "Redundancy, tested recovery plans, supplier contractual commitments"],
            ["Data loss", "Corruption or accidental deletion", "Backups tested by restoration, not merely taken"],
            ["Data quality", "Incomplete, duplicated or stale records", "Validation at entry, ownership, cleansing routines"],
            ["Regulatory", "Breach of privacy law, penalties, notification duties", "Data mapping, minimisation, retention policy, breach procedure"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two controls candidates omit",
          md: "**Backups tested by actually restoring them** — an untested backup is a hope, and organisations discover it failed at the worst possible moment. And **least privilege**: most internal incidents involve someone using access they were legitimately granted but did not need for their role. Both are cheap, specific, and rarely mentioned.",
        },
        {
          kind: "text",
          md: "The **performance management** angle matters, since this is not an audit paper. Security failures affect performance through lost operating time, remediation cost, regulatory penalties, and reputational damage that shows up as lost customers — which connects directly to the reputational cost category in APM-14. And there is a genuine trade-off: controls that make data hard to reach also make it hard to use, so an over-secured system produces the shadow spreadsheets that defeat the controls entirely.",
        },
      ],
      check: {
        q: "A company takes daily backups but has never restored one. What is the risk?",
        options: [
          "None, provided the backups complete without error messages",
          "A backup that has never been restored is unverified — corruption, incomplete coverage or an unreadable format is typically discovered only during a real incident, when it is too late",
          "Daily backups are too infrequent",
          "Backups should be stored on the same system for speed",
        ],
        correct: 1,
        explain:
          "Completion is not the same as recoverability, and the failure modes are silent. Periodic test restores are the only way to establish that the backup is usable, which is why they are a standard recommendation — and option 3 describes a serious error, since a backup on the same system is destroyed with it.",
      },
    },
    {
      id: "lean",
      heading: "Lean information and the 5 Ss",
      blocks: [
        {
          kind: "text",
          md: "The second outcome asks whether management information systems are **lean** and what the information they produce is actually worth. Applying lean thinking to information means treating unused reports, duplicated data and unnecessary detail as waste — because they consume storage, attention, maintenance and, most expensively, the time of the people who produce them.",
        },
        {
          kind: "table",
          caption: "The 5 Ss applied to information",
          head: ["S", "In a workplace", "Applied to information"],
          rows: [
            ["Sort", "Remove what is not needed", "Delete reports nobody reads and measures nobody acts on"],
            ["Set in order", "A place for everything", "Consistent structure, naming and location, so data is findable"],
            ["Shine", "Clean and inspect", "Cleanse data, correct duplicates, retire stale records"],
            ["Standardise", "Consistent methods", "One definition per measure, one owner, one reporting format"],
            ["Sustain", "Keep the discipline", "Periodic review, or the accumulated clutter returns within a year"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Sustain is the one that fails",
          md: "Organisations run a report rationalisation, delete a third of their reports, and are back where they started within eighteen months — because new reports are created continuously and nothing removes them. Recommending a **standing review** with an owner is what distinguishes advice from a one-off tidy-up, and it is the same lesson as the control step of DMAIC in APM-23.",
        },
        {
          kind: "text",
          md: "Assessing the **value** of information is a genuine judgement rather than a calculation, but three questions get most of the way there: what decision does it support; what would be decided differently without it; and what does it cost to produce, including the time of the people who prepare and read it. Information failing all three is waste even though it is accurate, timely and beautifully presented.",
        },
      ],
      check: {
        q: "Applying lean principles to management information, what does 'sort' require?",
        options: [
          "Arranging reports alphabetically for easy retrieval",
          "Removing what is not needed — deleting reports nobody reads and measures nobody acts on, since they consume preparation time, attention and maintenance while adding nothing",
          "Sorting data by date before analysis",
          "Classifying information by department",
        ],
        correct: 1,
        explain:
          "Sort is elimination, not organisation — that is the next S. Applied to information it means removing the accumulated reports and measures that survive because nobody has ever been asked to justify them, which is where most of the waste in a reporting system sits.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing security controls generically.", fix: "Match the control to the risk the scenario actually presents." },
    { trap: "Recommending backups without testing.", fix: "An unrestored backup is unverified — recommend periodic test restores." },
    { trap: "Treating security as purely an IT matter.", fix: "Connect it to lost operating time, penalties and reputational cost." },
    { trap: "Recommending a one-off report rationalisation.", fix: "Without a standing review the clutter returns within a year — that is the 'sustain' step." },
  ],
  keyTerms: [
    { term: "Least privilege", def: "Granting each user only the access their role requires, limiting the damage from misuse or a compromised account." },
    { term: "Lean information", def: "Applying lean principles to management information, treating unread reports, duplicated data and unnecessary detail as waste." },
    { term: "The 5 Ss", def: "Sort, set in order, shine, standardise and sustain — a discipline applied here to the information a management system produces." },
  ],
  summary: [
    "Match controls to risks; the omitted ones are tested restores and least privilege.",
    "Security failures reach performance through downtime, penalties and reputational cost.",
    "Over-securing data produces shadow spreadsheets that defeat the controls.",
    "Lean information means deleting what nobody acts on — and sustaining that, or it returns.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is an untested backup a risk rather than a control?", a: "Corruption, incomplete coverage or an unreadable format are silent failures discovered only during a real incident." },
    { q: "How does over-securing information damage performance?", a: "If data is too hard to reach, users build shadow spreadsheets outside the system, which defeats both the controls and the single version of the truth." },
    { q: "Which of the 5 Ss is most often neglected, and why does it matter?", a: "Sustain — without a standing review with an owner, new reports accumulate and the clutter returns within about a year." },
  ],
  furtherStudy: [
    "APM-33 covers the systems whose data this chapter protects and rationalises.",
    "APM-28 covers report overload, the same waste seen from the user's side.",
    "APM-14 covers reputational cost, where a security failure ultimately lands.",
  ],
}

const APM_TREE_35: StudyChapter = {
  paper: "APM",
  id: "APM-35",
  number: 35,
  area: "D",
  syllabusRefs: ["D2(a)"],
  title: "Big data",
  minutes: 15,
  intro:
    "Not simply a lot of data. The definition matters because each of its characteristics creates a distinct management problem — and the risks are examined as heavily as the opportunities.",
  outcomes: [
    "Assess how the growth of big data has changed what an organisation can measure and manage",
    "Explain the characteristics of big data and what each implies",
    "Identify the opportunities big data creates for performance management",
    "Assess the risks and challenges it presents",
    "Recommend the conditions under which a big data initiative is worth pursuing",
  ],
  sections: [
    {
      id: "characteristics",
      heading: "The characteristics, and what each one costs",
      blocks: [
        {
          kind: "table",
          caption: "The Vs",
          head: ["Characteristic", "Meaning", "The management problem it creates"],
          rows: [
            ["Volume", "Quantities far beyond conventional systems", "Storage and processing cost; the useful signal is a small fraction of it"],
            ["Velocity", "Generated and arriving continuously", "Decisions must be automated to keep pace, which removes human judgement from the loop"],
            ["Variety", "Structured and unstructured — text, image, video, voice, sensor", "Conventional analysis tools do not work on most of it"],
            ["Veracity", "Uncertain accuracy and provenance", "Volume creates false confidence; more data is not better data"],
            ["Value", "Whether any of it is worth what it costs", "The test that is applied last and should be applied first"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Veracity is the one that carries the marks",
          md: "Large datasets feel authoritative, and that feeling is unearned. Data scraped from social media, captured by sensors or bought from a broker has unknown accuracy, unknown coverage and unknown bias, and **more of it does not fix any of those**. A large biased sample is more dangerous than a small one, because it produces the same wrong answer with narrower confidence intervals.",
        },
        {
          kind: "text",
          md: "**Variety** is where the restructured syllabus has expanded — D2(d) asks specifically about text, image, video and voice data. What these have in common is that they need converting into something analysable, and every conversion involves judgement: sentiment scoring on text, classification on images, transcription on voice. The judgement embedded in that conversion step is invisible in the output, which is exactly why it should be interrogated.",
        },
      ],
      check: {
        q: "A retailer analyses two million social media posts and concludes its brand sentiment is strongly positive. What is the principal concern?",
        options: [
          "The sample is too small to be reliable",
          "Veracity and bias — the people posting are not a representative sample of customers, sentiment scoring involves judgement invisible in the output, and the volume creates confidence the data's provenance does not justify",
          "Social media data cannot be analysed at all",
          "The analysis should have used a longer time period",
        ],
        correct: 1,
        explain:
          "Two million is ample volume and entirely irrelevant to the question, which is whether those two million represent anyone. Self-selected posters skew toward the delighted and the angry, so the sample is biased regardless of size — and a large biased sample simply delivers the wrong answer with more apparent precision.",
      },
    },
    {
      id: "opportunity-risk",
      heading: "Opportunities and risks",
      blocks: [
        {
          kind: "table",
          caption: "Both sides, as the outcome requires",
          head: ["Opportunity", "Corresponding risk"],
          rows: [
            ["Measure things previously unmeasurable — behaviour, sentiment, real-time operations", "Measuring what is easy to capture rather than what matters"],
            ["Predict rather than only report", "Predictions treated as certainties by people who did not build the model"],
            ["Personalise service and pricing at individual level", "Privacy breaches, regulatory penalties, and customer resentment when it is noticed"],
            ["Detect patterns humans would not find", "Spurious correlation — with enough variables, patterns appear in noise"],
            ["Respond continuously rather than periodically", "Over-reaction to variation, and the loss of human judgement in automated loops"],
            ["Competitive advantage from data others lack", "Very high cost in infrastructure and scarce skills, often with no measured return"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Spurious correlation deserves its own sentence",
          md: "Test enough variable pairs and some will correlate strongly by chance alone. Big data makes this vastly easier, because the number of possible pairs grows far faster than the number of variables. So a discovered correlation is a hypothesis to be tested on fresh data, never a finding — and certainly not a causal claim, which is the professional scepticism point APM-38 examines directly.",
        },
        {
          kind: "text",
          md: "The **ethical and regulatory** dimension is not optional here. Data about individuals attracts privacy law wherever the organisation operates: lawful basis for processing, minimisation, retention limits and breach notification. And beyond the law there is the question of whether customers would object if they understood what was being done — a use that is legal and resented still damages the brand, which makes it a performance question as well as a compliance one.",
        },
      ],
      check: {
        q: "An analytics team reports a strong correlation between two variables discovered by testing many combinations in a large dataset. How should this be treated?",
        options: [
          "As a finding that can be acted on immediately",
          "As a hypothesis requiring testing on fresh data — with enough variable pairs tested, strong correlations arise by chance alone, and the correlation implies nothing about causation in any case",
          "As proof that one variable causes the other",
          "As evidence that the dataset is too large",
        ],
        correct: 1,
        explain:
          "Searching a large space of possible relationships guarantees that some will appear significant purely by chance, which is why the discovery must be validated on data that was not used to find it. Even a genuine correlation establishes association rather than cause, so acting on it directly compounds two separate errors.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating volume as the whole definition.", fix: "Velocity, variety, veracity and value each create a distinct problem." },
    { trap: "Assuming a large sample is a representative one.", fix: "A large biased sample gives the wrong answer with narrower confidence intervals." },
    { trap: "Reporting a discovered correlation as a finding.", fix: "Validate on fresh data, and never infer causation from it." },
    { trap: "Ignoring privacy and customer reaction.", fix: "A use that is lawful but resented still damages the brand." },
  ],
  keyTerms: [
    { term: "Veracity", def: "The uncertain accuracy, provenance and bias of large datasets, which additional volume does not improve." },
    { term: "Unstructured data", def: "Text, image, video and voice data requiring conversion before analysis, where the conversion embeds judgement invisible in the output." },
    { term: "Spurious correlation", def: "An apparently strong relationship arising by chance from testing many variable combinations." },
  ],
  summary: [
    "Volume, velocity, variety, veracity and value — each creates its own management problem.",
    "Veracity carries the marks: a large biased sample is more dangerous than a small one.",
    "Unstructured data must be converted, and the conversion embeds invisible judgement.",
    "Discovered correlations are hypotheses to validate, not findings to act on.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does volume not compensate for bias?", a: "A biased sample produces the same wrong answer regardless of size — with narrower confidence intervals, which makes it more persuasive and more dangerous." },
    { q: "What is the hidden judgement in unstructured data analysis?", a: "The conversion step — sentiment scoring, image classification, transcription — which embeds assumptions that do not appear in the output." },
    { q: "Why does big data make spurious correlation more likely?", a: "The number of testable variable pairs grows far faster than the number of variables, so chance relationships are almost guaranteed." },
  ],
  furtherStudy: [
    "APM-36 covers the data science process that turns this raw material into analysis.",
    "APM-37 covers regression and the correlation-versus-causation problem in detail.",
    "APM-38 covers machine learning, which is where large datasets are usually applied.",
  ],
}

export const APM_TREE_AREA_D_PART1: StudyChapter[] = [APM_TREE_32, APM_TREE_33, APM_TREE_34, APM_TREE_35]
