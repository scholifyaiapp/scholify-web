import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area A — management information systems and data analytics.
 * Chapters 1–4 of the PM reading tree, mapped to syllabus groups A1–A3.
 *
 * ── What this replaced ────────────────────────────────────────
 * PM was taught in SIX chapters — one per syllabus area — totalling about 10,000 words
 * across 28 sections, against twenty-four syllabus sub-topic groups. Area A was one of
 * those six, so information systems, the control of management information, data
 * visualisation and the whole of big data shared a single sitting.
 *
 * ── The one area of PM that is NOT computed ───────────────────
 * Everything from Area B onwards is arithmetic, and the chapters there lean on `formula`
 * blocks and `example` steppers. Area A is discursive, so it earns marks by APPLYING a
 * distinction to a scenario — which system suits this decision, which control answers
 * this risk, which analytics type answers this question. The chapters are therefore built
 * on `table` comparisons and `example` steppers that pick between options and say why,
 * because "explain the difference" questions are answered by choosing, not by listing.
 *
 * Structure follows the official ACCA PM study guide. All wording is ORIGINAL Scholify
 * teaching text — the approved-provider texts were used only as a benchmark for
 * structure and depth, never as a source of prose.
 */

/* ── Chapter 1 · A1(a), A1(b) ──────────────────────────────────── */

export const PM_TREE_01: StudyChapter = {
  id: "PM-01",
  number: 1,
  paper: "PM",
  area: "A",
  title: "Information systems, and whether they are worth having",
  minutes: 15,
  syllabusRefs: ["A1(a)", "A1(b)"],
  intro:
    "An information system is an investment like any other, so the interesting question is never what it can do — it is whether the decisions it improves are worth what it costs to run it.",
  outcomes: [
    "Explain the role information systems play in an organisation",
    "Distinguish data from information, and state what makes information useful",
    "Identify the costs and the benefits of an information system, including the ones that resist measurement",
    "Apply a cost-benefit judgement to a proposed system",
    "Explain why a system that produces good data can still fail",
  ],
  sections: [
    {
      id: "role",
      heading: "What an information system is for",
      blocks: [
        {
          kind: "definition",
          term: "Data and information",
          md: "**Data** are raw, unprocessed facts — 4,200 units, £18.40, Tuesday. **Information** is data that has been processed so that it **reduces uncertainty for a decision**. The distinction matters because a system can drown a manager in data while supplying no information: a report is only information if somebody could act differently having read it.",
        },
        {
          kind: "list",
          title: "What makes information useful",
          items: [
            "**Relevant** to the decision in hand — everything else is noise, however accurate.",
            "**Accurate enough** for its purpose. Perfect accuracy is usually not worth its cost, and a figure to the nearest £1,000 may support the decision as well as one to the penny.",
            "**Complete**, so no material factor is missing.",
            "**Timely** — arriving while the decision is still open. Late information has no value at all, whatever its quality.",
            "**Understandable** by the person who must act on it, which is why presentation is part of usefulness rather than decoration.",
            "**Cost-effective**: the benefit of better decisions must exceed the cost of producing it.",
          ],
        },
        {
          kind: "table",
          caption: "What an information system does for each level of management",
          head: ["Level", "The decisions", "What the information looks like"],
          rows: [
            ["**Strategic**", "Long-horizon, unstructured — which markets to enter, whether to invest", "**Summarised**, wide-ranging, much of it **external** and forward-looking, tolerant of imprecision"],
            ["**Tactical**", "Medium-term resource allocation — budgets, staffing, pricing policy", "A mix of internal and external, **periodic**, moderately detailed"],
            ["**Operational**", "Short-horizon, highly structured — today's schedule, this order", "**Detailed**, **internal**, **frequent**, and needing to be accurate"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Granularity and frequency should follow the decision, not the technology",
          md: "The commonest design mistake is giving a strategic decision operational information. A board asked to approve a factory does not need yesterday's machine downtime by shift; it needs a five-year demand view with the uncertainty made explicit. The reverse error is just as costly: a shift supervisor given a quarterly summary cannot act on it. So when a scenario complains that managers \"get too many reports and still cannot decide\", the fault is usually **granularity mismatched to the horizon**.",
        },
      ],
      check: {
        q: "A production supervisor receives a detailed quarterly cost summary. Why is it of little use?",
        options: [
          "It is not accurate enough for operational work",
          "It is not timely — operational decisions need frequent information while they are still open",
          "It contains too much external data",
          "It is not cost-effective to produce",
        ],
        correct: 1,
        explain:
          "It is not TIMELY. Operational decisions are short-horizon, so information arriving quarterly comes long after the decisions it could have informed. Late information has NO value however accurate it is — the granularity and frequency must follow the decision's horizon.",
      },
    },
    {
      id: "costs-benefits",
      heading: "The costs and the benefits",
      blocks: [
        {
          kind: "table",
          caption: "What a system really costs",
          head: ["Cost", "What it covers"],
          rows: [
            ["**Hardware and software**", "Purchase or licensing, and the infrastructure to run it"],
            ["**Implementation**", "Configuration, **data migration and cleansing**, testing, and parallel running"],
            ["**Training**", "Not only the initial course but the productivity lost while people learn"],
            ["**Ongoing operation**", "Licences, support, maintenance, upgrades, and the staff to administer it"],
            ["**Disruption**", "The output lost during changeover, and errors made while the organisation adjusts"],
            ["**Opportunity cost**", "What the same money and management attention could have achieved elsewhere"],
          ],
        },
        {
          kind: "table",
          caption: "What it delivers, and how measurable each benefit is",
          head: ["Benefit", "Measurable?"],
          rows: [
            ["**Lower operating cost** — fewer staff hours, less rework", "**Yes**, and directly"],
            ["**Lower inventory** through better demand information", "**Yes**, as a reduction in holding cost"],
            ["**Faster decisions**, so opportunities are not missed", "**Partly** — the value of a decision taken sooner is estimable but arguable"],
            ["**Better decisions** from better information", "**Hard** — you cannot observe the outcome you avoided"],
            ["**Improved customer service** and retention", "**Partly**, through churn and lifetime value"],
            ["**Better control and less fraud**", "**Hard**, for the same reason"],
            ["**Compliance and audit trail**", "Often expressed as **risk avoided** rather than cash"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The benefits that resist measurement are the ones that decide the case",
          md: "A cost-benefit case on an information system is nearly always **lopsided**: the costs are concrete and land early, while the largest benefits are qualitative and arrive later. The wrong response is to ignore the unmeasurable benefits, because that guarantees rejecting a good system. The right response is to state them explicitly, say what would have to be true for them to be worth the shortfall, and let the decision-maker judge — which is exactly the structure an exam answer should have. Never write \"the benefits are intangible so cannot be evaluated\".",
        },
        {
          kind: "example",
          title: "Judging a proposed system",
          scenario:
            "Merrow Foods is offered an integrated stock and sales system. Licence and hardware cost £180,000 up front and £40,000 a year; implementation and data cleansing £70,000; training £25,000, plus an estimated £30,000 of output lost during changeover. Management expects to cut inventory by £600,000 (Merrow's cost of capital is 9%), remove two clerical posts costing £62,000 in total, and reduce stock-outs — currently estimated to lose about £150,000 of contribution a year, though the estimate is soft. The finance director says the case fails because the first-year cash outflow exceeds the measurable savings.",
          steps: [
            { label: "Separate one-off from recurring costs", detail: "ONE-OFF: £180,000 hardware and licence + £70,000 implementation + £25,000 training + £30,000 disruption = £305,000. RECURRING: £40,000 a year. Mixing the two is what produces the finance director's answer." },
            { label: "Quantify the measurable recurring benefits", detail: "Inventory reduction of £600,000 saves the HOLDING cost, not £600,000 — at a 9% cost of capital that is £54,000 a year, plus the one-off £600,000 cash release. Removing two posts saves £62,000 a year. So measurable recurring benefit is £116,000 against £40,000 recurring cost — a £76,000 annual surplus." },
            { label: "Deal with the one-off items properly", detail: "The £600,000 inventory release is a ONE-OFF cash inflow that substantially offsets the £305,000 of one-off cost. On these figures the project is cash-positive in year one, so the finance director has compared recurring benefits with one-off costs." },
            { label: "Handle the soft benefit honestly", detail: "The £150,000 of lost contribution from stock-outs is the LARGEST benefit and the least reliable. Do not drop it and do not bank it: state it separately, and note that even if only a THIRD of it is recovered the case improves by £50,000 a year." },
            { label: "Name what is not in the numbers at all", detail: "Better decision quality, improved customer service and a stronger audit trail are real but unmeasured. Against them sit the risks the numbers also omit — implementation overrun, staff resistance, and dependence on a single supplier." },
            { label: "Conclude", detail: "RECOMMEND, on the measurable figures alone: a £76,000 recurring surplus with one-off costs more than covered by the inventory release. The soft benefits strengthen it; the decision to watch is implementation risk, not the arithmetic." },
          ],
          result:
            "The finance director's objection dissolves once **one-off and recurring items are separated**, and the inventory saving is the **holding cost plus a one-off cash release**, not the whole £600,000. The soft £150,000 is stated and sensitised rather than ignored — which is what an examiner is looking for.",
        },
      ],
      check: {
        q: "A system will cut inventory by £500,000. The cost of capital is 8%. What recurring annual benefit should the appraisal show?",
        options: [
          "£500,000, the inventory reduction",
          "£40,000, the holding cost saved on the released inventory",
          "Nothing, since inventory is an asset not a cost",
          "£500,000 in year one and £40,000 thereafter",
        ],
        correct: 1,
        explain:
          "£40,000 — the HOLDING COST saved, being 8% of £500,000. The £500,000 itself is a ONE-OFF cash release, not a recurring benefit, so it belongs alongside the one-off costs. Treating it as an annual saving overstates the case enormously.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Writing that the benefits are intangible and therefore cannot be evaluated.",
      fix: "State them explicitly and say what would have to be true for them to justify any shortfall. That is the answer, not a reason to stop.",
    },
    {
      trap: "Comparing one-off costs with recurring benefits, or the reverse.",
      fix: "Separate the two before concluding. Most flawed appraisals in scenarios do exactly this.",
    },
    {
      trap: "Treating an inventory reduction as a recurring saving of its full value.",
      fix: "The recurring benefit is the HOLDING COST on the reduction; the reduction itself is a one-off cash release.",
    },
    {
      trap: "Assuming more detail is always better information.",
      fix: "Granularity and frequency must match the DECISION's horizon. Strategic decisions need summary, not operational detail.",
    },
  ],
  keyTerms: [
    { term: "Data", def: "Raw unprocessed facts, of no use until processed for a decision." },
    { term: "Information", def: "Processed data that reduces uncertainty for a specific decision." },
    { term: "Strategic information", def: "Summarised, wide-ranging, largely external and forward-looking, tolerant of imprecision." },
    { term: "Operational information", def: "Detailed, internal, frequent and accurate, supporting short-horizon structured decisions." },
    { term: "Opportunity cost of a system", def: "What the money and management attention committed to it could have achieved elsewhere." },
  ],
  summary: [
    "Information is data processed so that it reduces uncertainty for a decision; a report nobody could act on is not information.",
    "Useful information is relevant, accurate enough, complete, timely, understandable and cost-effective.",
    "Granularity and frequency must follow the decision's horizon — strategic needs summary, operational needs detail.",
    "System costs include implementation, data cleansing, training, disruption and opportunity cost, not just licences.",
    "The largest benefits are often the least measurable, so state and sensitise them rather than discarding them.",
  ],
  knowledgeDiagnostic: [
    { q: "What turns data into information?", a: "Processing that reduces uncertainty for a particular decision — if nobody could act differently on it, it is still just data." },
    { q: "How does strategic information differ from operational?", a: "Strategic is summarised, wide-ranging, largely external and forward-looking; operational is detailed, internal, frequent and needs to be accurate." },
    { q: "How should an appraisal treat an inventory reduction?", a: "The recurring benefit is the holding cost on the reduction; the reduction itself is a one-off cash release shown against one-off costs." },
    { q: "What should an answer do with unmeasurable benefits?", a: "State them explicitly and say what would have to be true for them to justify any shortfall in the measurable case." },
  ],
}

/* ── Chapter 2 · A1(c), A2(a), A2(b), A2(c) ────────────────────── */

export const PM_TREE_02: StudyChapter = {
  id: "PM-02",
  number: 2,
  paper: "PM",
  area: "A",
  title: "Networks, and the control of management information",
  minutes: 15,
  syllabusRefs: ["A1(c)", "A2(a)", "A2(b)", "A2(c)"],
  intro:
    "Once information can move freely round an organisation it can also leak out of it, so the same technology that makes management information useful is what makes controlling it necessary.",
  outcomes: [
    "Explain the uses of the internet, intranets, extranets, wireless technology and networks",
    "Show how the principal sources of management information are used for control",
    "Explain the controls needed in generating and distributing internal information",
    "Explain the controls protecting highly confidential information",
    "Recommend proportionate controls for a given situation",
  ],
  sections: [
    {
      id: "networks",
      heading: "The technologies, and what each is for",
      blocks: [
        {
          kind: "table",
          caption: "The distinctions the syllabus expects",
          head: ["Technology", "Who can reach it", "Typical use"],
          rows: [
            ["**Internet**", "**Anyone**", "Public presence, e-commerce, market and competitor information"],
            ["**Intranet**", "**Employees only**, inside the organisation", "Policies, internal reporting, dashboards, shared documents"],
            ["**Extranet**", "The organisation **plus named outsiders** — suppliers, customers", "Order status, shared forecasts, supplier scheduling"],
            ["**Wireless / mobile**", "Authorised devices, wherever they are", "Field data capture, real-time operational updates, remote approval"],
            ["**Local and wide area networks**", "Connected sites", "Shared processing and storage across one or many locations"],
            ["**Cloud**", "Authorised users over the internet", "Scalable capacity without owning hardware; cost becomes operating rather than capital"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The control problem each one creates",
          md: "Each technology buys reach and pays for it in exposure. An **intranet** puts management information in front of every employee, so *access* control becomes the issue. An **extranet** deliberately admits outsiders, so the question becomes exactly *which* data a supplier should see — and a supplier who can see your demand forecast can also infer your margins. **Wireless and mobile** move data outside the building, so devices are lost and traffic can be intercepted. **Cloud** transfers the processing to somebody else, which does not transfer the *responsibility*. So an answer on any of these should pair the benefit with the control it makes necessary.",
        },
      ],
      check: {
        q: "A manufacturer wants selected suppliers to see its production schedule and stock levels. Which is appropriate?",
        options: ["The public internet", "An extranet", "An intranet", "A wireless local network"],
        correct: 1,
        explain:
          "An EXTRANET — the organisation's network extended to NAMED outsiders. An intranet is employees only, the public internet exposes the data to everyone, and a wireless LAN is about how devices connect rather than who is admitted.",
      },
    },
    {
      id: "controls",
      heading: "Controlling the information itself",
      blocks: [
        {
          kind: "list",
          title: "Sources of management information, and their control use",
          items: [
            "**Internal accounting records** — the ledger, costing system and budgets, used for variance analysis and cost control (Area D).",
            "**Operational records** — output, downtime, yield, rework and delivery performance, used for non-financial measurement (Area E).",
            "**Human resources data** — headcount, turnover, absence and training, used to explain performance rather than merely record it.",
            "**Customer data** — orders, complaints, retention and profitability by customer.",
            "**External sources** — market data, competitor information, industry benchmarks and economic indicators, which is what makes strategic information strategic.",
          ],
        },
        {
          kind: "table",
          caption: "Controls over generating and distributing information",
          head: ["Stage", "Controls"],
          rows: [
            ["**Input**", "Authorisation of source documents, **input validation** and range checks, batch totals, and restricting who may enter what"],
            ["**Processing**", "Reconciliations, exception reporting, **audit trail**, and controls over who may change a calculation or a report definition"],
            ["**Output**", "Review before release, **version control**, distribution lists, and a check that recipients actually need it"],
            ["**Access**", "User authentication, **role-based permissions**, and segregation so that the person who enters data cannot also approve it"],
            ["**Transfer**", "**Encryption** in transit, secure file transfer, and controls on removable media and personal devices"],
            ["**Retention and recovery**", "Backup, tested **disaster recovery**, and retention periods matched to legal requirements"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Highly confidential information needs more than the general controls",
          md: "For information not intended to leave the organisation at all — an acquisition plan, a redundancy programme, unpublished results — the general controls are not enough, because they are designed to admit the many rather than exclude all but the few. Add: **need-to-know access** rather than role-based access; **named individual permissions** with a documented approval; **encryption at rest** as well as in transit; **watermarking or restricted printing**; **access logging that is actually reviewed**; **physical security** for hard copy; **confidentiality undertakings**; and a **defined disclosure timetable** so that inside information is released to everyone at once. Note the last one connects to insider dealing — this is not merely an IT matter.",
        },
        {
          kind: "example",
          title: "Recommending proportionate controls",
          scenario:
            "Ashvale Group runs its management reporting on an intranet dashboard that every employee can open. It has just extended an extranet to twelve suppliers so they can see forecast demand. The finance team is preparing an unannounced acquisition, working in a shared folder on the same system, and one analyst has the model on a personal laptop so she can work at home. Ashvale's only stated controls are a password policy and a nightly backup.",
          steps: [
            { label: "Test the intranet dashboard", detail: "Management reporting visible to EVERY employee is an ACCESS failure. Move to ROLE-BASED permissions so managers see their own responsibility area — which also improves usefulness, since a manager should be shown what they control (Area E)." },
            { label: "Test the supplier extranet", detail: "Twelve suppliers seeing FORECAST DEMAND may be able to infer volumes, capacity and margin. Restrict to the data each supplier needs for its own scheduling, segregate suppliers from one another, and put a confidentiality obligation in the contract." },
            { label: "Test the acquisition folder", detail: "The most serious problem. Unannounced acquisition material on a general-access system needs NEED-TO-KNOW access with named individuals, encryption at rest, access logging that is reviewed, and a documented disclosure timetable — this is INSIDE INFORMATION, so the exposure is legal as well as commercial." },
            { label: "Test the personal laptop", detail: "Data has left the building on an uncontrolled device. Require encryption, prohibit local copies of confidential models, or supply a managed device with remote wipe. A password policy does nothing about a stolen laptop with an unencrypted file." },
            { label: "Test what the stated controls actually cover", detail: "A password policy addresses AUTHENTICATION only, and a nightly backup addresses RECOVERY only. Nothing addresses input validation, segregation of duties, transfer, retention, or review of output — so the control framework has gaps at almost every stage." },
            { label: "State the priority order", detail: "Deal with the ACQUISITION material first, because the consequence is legal and irreversible; then the personal laptop; then extranet scope; then dashboard permissions, which is the least urgent though the most visible." },
          ],
          result:
            "The dashboard is the obvious complaint and the **least urgent** finding. The acquisition folder is the real exposure, because it turns a control weakness into **inside information** in the hands of people with no need to know — and prioritising by consequence rather than by visibility is what earns the marks.",
        },
      ],
      check: {
        q: "Which control best protects an unannounced acquisition plan held on a shared system?",
        options: [
          "A strong password policy for all users",
          "Need-to-know access limited to named individuals, with encryption at rest and reviewed access logs",
          "A nightly backup of the folder",
          "Role-based permissions for the finance department",
        ],
        correct: 1,
        explain:
          "NEED-TO-KNOW access by named individual, with encryption at rest and access logging that is REVIEWED. Passwords address authentication only and backups address recovery only. Even ROLE-BASED access is too wide here — a whole department does not need to know about an unannounced acquisition.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Confusing an intranet with an extranet.",
      fix: "An intranet is employees only; an extranet deliberately admits NAMED outsiders such as suppliers.",
    },
    {
      trap: "Listing benefits of a technology without the control it makes necessary.",
      fix: "Each one buys reach and pays in exposure. Pair the two.",
    },
    {
      trap: "Offering a password policy and a backup as a control framework.",
      fix: "Those cover authentication and recovery only. Address input, processing, output, access, transfer and retention.",
    },
    {
      trap: "Applying role-based access to highly confidential information.",
      fix: "Role-based admits a whole department. Confidential material needs NEED-TO-KNOW by named individual.",
    },
  ],
  keyTerms: [
    { term: "Intranet", def: "A private network accessible to employees only." },
    { term: "Extranet", def: "An organisation's network extended to named outsiders such as suppliers or customers." },
    { term: "Role-based permissions", def: "Access granted by job role rather than to individuals; too wide for confidential material." },
    { term: "Need-to-know access", def: "Access limited to named individuals who require it, used for highly confidential information." },
    { term: "Audit trail", def: "A record allowing a figure to be traced back to its source and any change to be attributed." },
    { term: "Segregation of duties", def: "Ensuring the person who records a transaction cannot also approve it." },
  ],
  summary: [
    "Internet, intranet, extranet, wireless and cloud differ in who can reach the data, and each creates its own control problem.",
    "Management information comes from accounting, operational, HR, customer and external sources.",
    "Controls are needed at input, processing, output, access, transfer, and retention and recovery.",
    "Highly confidential information needs need-to-know access, encryption at rest, reviewed logging and a disclosure timetable.",
    "Prioritise control weaknesses by consequence, not by how visible they are.",
  ],
  knowledgeDiagnostic: [
    { q: "Distinguish an intranet from an extranet.", a: "An intranet is accessible to employees only; an extranet extends the network to named outsiders such as suppliers." },
    { q: "Name the six stages at which information controls operate.", a: "Input, processing, output, access, transfer, and retention and recovery." },
    { q: "Why is role-based access insufficient for an acquisition plan?", a: "Because it admits an entire department, where confidential material needs need-to-know access limited to named individuals." },
    { q: "What does a password policy plus a nightly backup actually control?", a: "Authentication and recovery only — nothing about validation, segregation, output review, transfer or retention." },
  ],
}

export const PM_TREE_AREA_A_PART1: StudyChapter[] = [PM_TREE_01, PM_TREE_02]
