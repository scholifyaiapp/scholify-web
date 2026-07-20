import type { StudyChapter, StudySection } from "@/lib/acca-study-content"
import { BT_A as LEGACY_A } from "@/lib/acca-study-bt-a"
import { BT_B as LEGACY_PEOPLE } from "@/lib/acca-study-bt-b"
import { BT_C as LEGACY_GOVERNANCE_ETHICS } from "@/lib/acca-study-bt-c"
import { BT_D as LEGACY_SYSTEMS } from "@/lib/acca-study-bt-d"

/*
 * Official BT/FBT six-area Study map for the September 2025-August 2026
 * syllabus. Existing original Scholify teaching blocks are composed into the
 * official blueprint here so the migration preserves content quality and learner
 * history while removing the former four-bucket taxonomy.
 */

function sections(chapter: StudyChapter, ids: string[]): StudySection[] {
  return ids.map((id) => {
    const section = chapter.sections.find((candidate) => candidate.id === id)
    if (!section) throw new Error(`BT Study migration: missing section ${chapter.area}/${id}`)
    return section
  })
}

export const BT_OFFICIAL_A: StudyChapter = {
  ...LEGACY_A,
  area: "A",
  title: "The business organisation and its external environment",
  sections: LEGACY_A.sections.filter((section) => section.id !== "area-b-preview"),
  summary: LEGACY_A.summary.filter((item) => !item.startsWith("Internally,")),
}

export const BT_OFFICIAL_B: StudyChapter = {
  paper: "BT",
  area: "B",
  title: "Organisational structure, culture, governance and sustainability",
  minutes: 28,
  intro: "Structure determines where work and authority sit; culture shapes how people behave; governance and sustainability keep power accountable over the long term.",
  outcomes: [
    "Distinguish formal and informal organisation and explain their interaction",
    "Apply functional, divisional, matrix and boundaryless structures to scenarios",
    "Explain spans, scalar chains, centralisation, outsourcing and organisational levels",
    "Explain organisational culture and the factors that shape it",
    "Explain agency, boards, committees, governance and sustainable business practice",
  ],
  sections: [
    ...sections(LEGACY_A, ["area-b-preview"]),
    {
      id: "official-b-coverage",
      heading: "Structures, functions, culture and committees — the full Area B map",
      blocks: [
        { kind: "text", md: "The **formal organisation** is deliberately designed through roles, authority and procedures. The **informal organisation** develops through relationships, shared interests and influence. It can accelerate knowledge and cooperation, but can also spread rumours or resist change; managers should understand and engage with it rather than pretend it does not exist." },
        { kind: "diagram", diagram: { type: "cards", title: "Formal structures and when they fit", caption: "Structure follows the organisation's scale, diversity, geography and coordination needs.", data: { items: [
          { title: "Entrepreneurial", sub: "Direct founder control; fast and flexible, but dependent on one person." },
          { title: "Functional", sub: "Specialists grouped by function; efficient depth, weaker product accountability." },
          { title: "Divisional", sub: "Grouped by product, geography or customer; responsive and accountable, but duplicates resources." },
          { title: "Matrix", sub: "Functional and project authority overlap; flexible coordination, but dual command creates tension." },
          { title: "Boundaryless", sub: "Virtual, hollow or modular networks cross organisational boundaries and depend on partners." },
        ] } } },
        { kind: "text", md: "**Outsourcing** transfers work to an external provider; **offshoring** moves it to another country and may remain inside the group; a **shared-services centre** centralises a support activity inside the organisation. Anthony's hierarchy separates **strategic** long-term direction, **tactical** translation into plans and resources, and **operational** execution and control." },
        { kind: "table", caption: "Main business functions", head: ["Function", "Core contribution"], rows: [
          ["Research and development", "Creates and improves products and processes"],
          ["Purchasing", "Obtains suitable inputs on appropriate cost, quality, timing and risk terms"],
          ["Production / service operations", "Transforms inputs or capacity into customer value"],
          ["Marketing", "Understands needs and coordinates product, price, place and promotion with strategy"],
          ["Administration", "Provides coordination, records and organisational support"],
          ["Finance", "Records, reports, plans, controls, funds and advises"],
        ] },
        { kind: "text", md: "Culture is shaped by history, leadership, ownership, size, technology, workforce, national context and the nature of the work. **Schein** distinguishes visible artefacts, stated values and deep underlying assumptions. **Handy** describes power, role, task and person cultures. **Hofstede** compares national cultures across dimensions such as power distance, individualism, uncertainty avoidance and time orientation; these are tendencies, not stereotypes about every individual." },
        { kind: "callout", tone: "key", title: "Committees distribute attention, not accountability", md: "Committees bring knowledge, representation and collective judgement, but may be slow or encourage compromise and blurred responsibility. The **chair** keeps discussion purposeful and fair; the **secretary** supports notice, agenda, papers, minutes and procedural continuity." },
      ],
      check: {
        q: "A group moves payroll processing for all subsidiaries into one centre that remains owned and operated by the group. What is this?",
        options: ["Outsourcing", "A shared-services approach", "A virtual organisation", "Offshoring necessarily"],
        correct: 1,
        explain: "One internal centre now serves the wider group, so this is shared services. Outsourcing requires an external provider; offshoring concerns location and is not implied.",
      },
    },
    ...sections(LEGACY_GOVERNANCE_ETHICS, ["agency", "board", "structures", "csr-fraud"]),
  ],
  examTraps: [
    { trap: "Assuming an informal organisation is automatically harmful.", fix: "It can spread knowledge and cooperation quickly, although rumours and resistance also need management." },
    { trap: "Claiming non-executive directors run daily operations.", fix: "Executives manage; independent non-executives challenge, monitor and contribute broader judgement." },
    { trap: "Treating sustainability as philanthropy alone.", fix: "Sustainable practice integrates economic resilience, environmental impact and responsibilities to stakeholders." },
  ],
  keyTerms: [
    { term: "Span of control", def: "The number of direct reports supervised by a manager." },
    { term: "Agency relationship", def: "An arrangement in which principals entrust agents to act on their behalf, creating potential conflicts of interest." },
    { term: "Corporate governance", def: "The system by which organisations are directed, controlled and held accountable." },
  ],
  summary: [
    "Formal structure allocates authority; informal relationships influence how work actually happens.",
    "The appropriate structure depends on size, diversity, geography, technology and environmental change.",
    "Governance addresses the separation of ownership and control through boards, oversight, accountability and transparency.",
    "Sustainable practice balances long-term organisational resilience with stakeholder and environmental responsibilities.",
  ],
}

export const BT_OFFICIAL_C: StudyChapter = {
  ...LEGACY_SYSTEMS,
  area: "C",
  title: "Business functions, regulation and technology",
  minutes: 30,
  outcomes: [
    ...LEGACY_SYSTEMS.outcomes,
    "Explain record-keeping, reporting regulation, fraud, client-money and anti-money-laundering responsibilities",
    "Explain the purposes of financial statements, sustainability reports, budgets, cost schedules and variance reports",
    "Identify system requirements and appropriate spreadsheet, database and accounting-package uses",
  ],
  sections: [
    ...LEGACY_SYSTEMS.sections,
    {
      id: "regulation-reporting-systems",
      heading: "Regulation, financial crime, reporting and system choice",
      blocks: [
        { kind: "text", md: "Organisations must retain adequate accounting records, prepare and file required reports, and arrange audit where applicable. Failure can produce unreliable decisions, penalties, loss of finance, reputational damage and personal consequences for responsible officers. Reporting standards improve consistency and comparability; monitoring and enforcement make the framework credible." },
        { kind: "text", md: "Fraud includes asset misappropriation and dishonest reporting. Managers reduce opportunity through controls, respond to warning signs, preserve evidence and follow reporting procedures. **Client money** must be identified, kept separate where required, reconciled and used only as authorised." },
        { kind: "callout", tone: "warn", title: "Money laundering is a process, not just handling cash", md: "Money laundering disguises criminal property so it appears legitimate, commonly described as placement, layering and integration. Controls include customer due diligence, understanding ownership and purpose, monitoring unusual activity, keeping records and reporting suspicion through the authorised route without tipping off the subject." },
        { kind: "table", caption: "What major reports are for", head: ["Report", "Primary purpose"], rows: [
          ["Statement of profit or loss", "Explains income, expenses and performance over a period"],
          ["Statement of financial position", "Shows assets, liabilities and equity at a point in time"],
          ["Statement of cash flows", "Explains cash generation and use across activities"],
          ["Sustainability / integrated reporting", "Connects broader resources, relationships, impacts and long-term value creation"],
          ["Cost schedule", "Analyses product, service or activity cost"],
          ["Budget", "Quantifies a plan and coordinates resources"],
          ["Variance report", "Compares actual results with plan to support control and learning"],
        ] },
        { kind: "text", md: "System requirements follow organisational objectives, transaction volumes, users, control, integration, security, reporting and legal needs. **Spreadsheets** are flexible for models but prone to uncontrolled changes; **databases** store structured related data and support controlled queries; **accounting packages** integrate transaction processing, ledgers and reporting. The right tool fits the process and control need, not fashion." },
      ],
      check: {
        q: "Which action is most appropriate when an employee identifies a suspicious client transaction that may involve money laundering?",
        options: ["Warn the client immediately", "Follow the authorised internal reporting procedure without tipping off the client", "Delete the transaction record", "Discuss it publicly to obtain advice"],
        correct: 1,
        explain: "Suspicion should follow the organisation's authorised reporting route, with records preserved and no tipping off. Warning the client can obstruct the reporting regime.",
      },
    },
  ],
}

export const BT_OFFICIAL_D: StudyChapter = {
  ...LEGACY_PEOPLE,
  area: "D",
  title: "Leadership and management",
  minutes: 30,
  sections: sections(LEGACY_PEOPLE, [
    "individual-group-team",
    "roles-development",
    "motivation",
    "leadership-management",
    "recruitment-selection",
    "appraisal-hr",
  ]).concat({
    id: "official-d-coverage",
    heading: "Leadership context, team effectiveness, rewards and learning",
    blocks: [
      { kind: "text", md: "Management coordinates resources through planning, organising, directing and control; supervision focuses more closely on day-to-day work; leadership creates direction and commitment. **Drucker** emphasised objectives, performance and the manager's responsibility to make work productive. **Mintzberg** described interpersonal, informational and decisional roles rather than a neat sequence of functions." },
      { kind: "text", md: "Leadership effectiveness depends on context. **Adair** balances task, team and individual needs. **Fiedler** links a leader's relatively stable orientation to situational favourableness rather than assuming one universal style. **Bennis** emphasises vision, meaning, trust and self-management. Ashridge ranges from tells to sells, consults and joins; Blake and Mouton compare concern for production with concern for people." },
      { kind: "callout", tone: "key", title: "Effective teams need more than named roles", md: "Clear purpose, appropriate skills, agreed roles, trust, open communication, constructive conflict, sound decisions and review support effectiveness. Unclear goals, domination, social loafing, groupthink, unresolved conflict and weak accountability undermine it." },
      { kind: "text", md: "Reward systems may combine pay, incentives, recognition, responsibility, development and job design. They should be understandable, attainable, fair, connected to controllable performance and aligned with organisational goals. A reward that encourages one metric can damage another, so assess behavioural consequences as well as cost." },
      { kind: "diagram", diagram: { type: "flow", title: "Systematic training cycle", caption: "Training is controlled when need and evidence drive the programme.", data: { steps: [
        { label: "Identify needs" },
        { label: "Set learning objectives" },
        { label: "Design the programme" },
        { label: "Deliver learning" },
        { label: "Validate learning" },
        { label: "Evaluate workplace impact" },
      ] } } },
      { kind: "text", md: "Honey and Mumford describe activist, reflector, theorist and pragmatist preferences; Kolb cycles through concrete experience, reflective observation, abstract conceptualisation and active experimentation. Preferences guide variety in learning design, but they should not be used as fixed labels that restrict development." },
    ],
    check: {
      q: "A bonus rewards sales revenue only, causing staff to grant risky credit and ignore returns. What is the central design failure?",
      options: ["The reward is financial", "The measure is misaligned and drives harmful behaviour", "Employees understand the scheme", "The target is measurable"],
      correct: 1,
      explain: "The single revenue measure rewards behaviour that damages cash collection and quality. Reward design must align measures with the organisation's wider objectives and controllable performance.",
    },
  }),
}

const PERSONAL_EFFECTIVENESS_SECTIONS: StudySection[] = [
  {
    id: "personal-effectiveness",
    heading: "Personal effectiveness and managing yourself",
    blocks: [
      { kind: "text", md: "Personal effectiveness means achieving worthwhile results reliably while using time, information and relationships responsibly. Start by separating **importance** from **urgency**: protect time for important work before it becomes a crisis, delegate appropriate urgent work, and remove activity that creates neither value nor learning." },
      { kind: "callout", tone: "rule", title: "Plan, act, review", md: "Set a specific outcome, prioritise the work, protect focused time, monitor progress and review the result. A long task list is not a plan unless it connects effort to deadlines and outcomes." },
      { kind: "text", md: "Ineffectiveness appears as missed deadlines, avoidable errors, duplicated work, unresolved conflict, excessive meetings and poor handovers. The organisational consequences include cost, delay, weak control, damaged service, stress and loss of trust." },
    ],
    check: {
      q: "A task is important for an examination in six weeks but is not yet urgent. What is the best response?",
      options: ["Ignore it until it becomes urgent", "Schedule protected preparation time now", "Delegate the examination", "Replace it with urgent low-value email"],
      correct: 1,
      explain: "Important work should be scheduled before urgency removes choice and quality. Waiting creates avoidable pressure; the responsibility cannot be delegated.",
    },
  },
  {
    id: "development-support",
    heading: "Competence and continuing development",
    blocks: [
      { kind: "text", md: "A **competence framework** describes the knowledge, skills and observable behaviours required for effective performance. Comparing present evidence with the framework reveals development needs; a personal development plan then turns those gaps into actions, support, dates and measurable evidence." },
      { kind: "table", caption: "Three forms of developmental support", head: ["Support", "Primary focus", "Typical relationship"], rows: [
        ["Coaching", "Improving performance on a skill or task", "Structured, goal-focused and often relatively short term"],
        ["Mentoring", "Broader career and professional development", "An experienced person shares perspective over time"],
        ["Counselling", "Helping a person explore and resolve an issue", "Confidential and non-directive; the individual owns the decision"],
      ] },
      { kind: "callout", tone: "key", title: "A development plan needs evidence", md: "Record the objective, current gap, learning action, support or resources, target date and the evidence that will demonstrate improvement. Review and revise it as responsibilities change." },
    ],
  },
  {
    id: "conflict-communication",
    heading: "Conflict resolution and effective communication",
    blocks: [
      { kind: "text", md: "Conflict can arise from scarce resources, incompatible goals, unclear roles, interdependence, personality differences, poor information or organisational change. It can expose a real problem, but unmanaged conflict consumes attention and damages cooperation." },
      { kind: "text", md: "Choose a response that fits the issue: clarify facts and responsibilities, listen to interests rather than positions, solve the problem jointly, negotiate a workable settlement, mediate when parties cannot progress alone, or escalate when authority, safety or misconduct requires it." },
      { kind: "callout", tone: "rule", title: "Communication is complete only when meaning is understood", md: "The sender encodes a message, selects a suitable channel, the receiver decodes it and feedback tests understanding. Jargon, assumptions, status, emotion, overload, poor timing and an unsuitable channel create noise." },
      { kind: "text", md: "Good information is accurate, complete enough for its purpose, relevant, timely, understandable and worth its cost. Match the channel to complexity and sensitivity: rich two-way discussion suits ambiguity or conflict; a concise written record suits instructions that must be retained." },
    ],
    check: {
      q: "A manager emails a highly ambiguous restructuring announcement and provides no way for employees to ask questions. What is the main communication weakness?",
      options: ["Too much feedback", "An unsuitable low-feedback channel for a sensitive, complex message", "Excessive face-to-face contact", "The message is automatically confidential"],
      correct: 1,
      explain: "Sensitive ambiguity requires a richer channel and feedback so understanding and concerns can be tested. One-way email alone is weak for that purpose.",
    },
  },
  {
    id: "communication-patterns-levels",
    heading: "Technology, communication patterns and management levels",
    blocks: [
      { kind: "text", md: "Technology improves personal effectiveness through calendars, task systems, collaboration, automation, search and remote access, but it also creates interruption, overload and security risks. Use it deliberately: configure notifications, protect focus, choose one source of truth, control access and preserve appropriate records." },
      { kind: "table", caption: "Information at different organisational levels", head: ["Level", "Typical information need"], rows: [
        ["Strategic", "External, summarised, forward-looking and relatively uncertain information for long-term direction"],
        ["Tactical", "Periodic analytical information for plans, resources, targets and management control"],
        ["Operational", "Detailed, frequent and timely information for transactions and immediate exceptions"],
      ] },
      { kind: "text", md: "Communication may be **vertical** up or down the hierarchy, **horizontal** between peers or functions, and **diagonal** across both level and function. Formal channels create authority and records; informal channels provide speed and social context. Network patterns range from centralised wheel or chain forms, which can be efficient for routine control, to all-channel networks, which support complex collaborative work." },
    ],
  },
]

export const BT_OFFICIAL_E: StudyChapter = {
  paper: "BT",
  area: "E",
  title: "Personal effectiveness and communication in business",
  minutes: 22,
  intro: "Professional knowledge creates value only when you can organise yourself, keep developing, resolve friction and communicate meaning clearly.",
  outcomes: [
    "Apply practical techniques for personal effectiveness and time management",
    "Explain how ineffectiveness damages team and organisational performance",
    "Use competence frameworks and personal development planning",
    "Distinguish coaching, mentoring and counselling",
    "Identify sources of conflict and select proportionate resolution techniques",
    "Explain the communication process, information quality and barriers to understanding",
  ],
  sections: PERSONAL_EFFECTIVENESS_SECTIONS,
  examTraps: [
    { trap: "Treating every urgent task as important.", fix: "Urgency is time pressure; importance is contribution to objectives. Prioritisation considers both." },
    { trap: "Using coaching, mentoring and counselling as synonyms.", fix: "Coaching targets performance, mentoring supports broader development, and counselling helps a person explore an issue." },
    { trap: "Assuming sending a message proves communication.", fix: "Feedback is needed to test whether the receiver understood the intended meaning." },
  ],
  keyTerms: [
    { term: "Competence framework", def: "A structured description of the knowledge, skills and behaviours required for effective performance." },
    { term: "Personal development plan", def: "A monitored plan connecting development needs to actions, resources, dates and evidence of improvement." },
    { term: "Communication noise", def: "Any physical, semantic, organisational or psychological interference that distorts a message." },
  ],
  summary: [
    "Personal effectiveness connects priorities and protected time to meaningful outcomes.",
    "Continuous development begins with an evidenced competence gap and ends with review of improvement.",
    "Conflict should be diagnosed before selecting negotiation, collaboration, mediation or escalation.",
    "Effective communication matches message, audience and channel, then uses feedback to confirm understanding.",
  ],
}

const CORPORATE_CODE_SECTION: StudySection = {
  id: "corporate-codes",
  heading: "Corporate codes and speaking up",
  blocks: [
    { kind: "text", md: "A **corporate code of ethics** translates organisational values into expected conduct. Typical content covers integrity, conflicts of interest, gifts and hospitality, confidentiality, fair dealing, use of assets, compliance, reporting routes, protection against retaliation and consequences of breach." },
    { kind: "callout", tone: "key", title: "A code needs an ethical system around it", md: "A document alone changes little. Leadership example, training, confidential advice, safe reporting channels, consistent investigation and proportionate discipline make the code credible." },
    { kind: "text", md: "When misconduct is suspected, establish the facts without conducting an unauthorised investigation, follow internal escalation and professional guidance, document decisions, and consider external reporting only where law, professional duty or unresolved public-interest risk requires it. Confidentiality does not mean concealing illegality." },
  ],
}

export const BT_OFFICIAL_F: StudyChapter = {
  paper: "BT",
  area: "F",
  title: "Professional ethics",
  minutes: 24,
  intro: "Ethics is the operating system of trust: it governs what professionals do when incentives, loyalty or pressure point away from the public interest.",
  outcomes: [
    "Apply the five fundamental ethical principles and the public-interest duty",
    "Explain how professions, regulators and professional bodies support ethical conduct",
    "Explain the purpose, contents and benefits of corporate codes of ethics",
    "Identify ethical threats, conflicts and safeguards and choose an appropriate response",
  ],
  sections: [
    ...sections(LEGACY_GOVERNANCE_ETHICS, ["profession", "principles", "threats", "models"]),
    CORPORATE_CODE_SECTION,
  ],
  examTraps: LEGACY_GOVERNANCE_ETHICS.examTraps.filter((item) => /ethic|confidential|objectiv|threat|princip/i.test(`${item.trap} ${item.fix}`)),
  keyTerms: LEGACY_GOVERNANCE_ETHICS.keyTerms.filter((item) => /ethic|integrity|objectiv|confidential|safeguard|public interest/i.test(`${item.term} ${item.def}`)),
  summary: [
    "The five principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour.",
    "Professionals act in the public interest, not only for an employer or client.",
    "Codes, leadership, advice, reporting routes, investigation and enforcement work together to support ethical conduct.",
    "Identify threats, evaluate their significance, apply safeguards and decline or report work when safeguards cannot reduce the threat appropriately.",
  ],
}
