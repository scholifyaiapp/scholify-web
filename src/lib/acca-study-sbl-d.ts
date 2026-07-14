import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area D — Technology, data & innovation.
 * Applied, evaluative chapter for Strategic Business Leader. Original,
 * syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const SBL_D: StudyChapter = {
  paper: "SBL",
  area: "D",
  title: "Technology, data & innovation",
  minutes: 16,
  intro: "Technology is no longer the IT department's problem — it is a boardroom strategy. In SBL you are not asked what a firewall is; you are asked how data, automation and disruption change what a business can win at, and what it must protect.",
  outcomes: [
    "Evaluate how information systems create and defend competitive advantage",
    "Apply the big-data Vs and the four analytics types to a real decision",
    "Assess the opportunities and risks of automation, AI and cloud computing",
    "Apply the CIA triad and identify common cyber threats and responses",
    "Explain disruptive innovation, digital transformation and the roles of the CIO and CDO",
  ],
  sections: [
    {
      id: "is-strategy",
      heading: "Information systems as strategy, not plumbing",
      blocks: [
        { kind: "text", md: "A junior manager sees technology as a cost to be minimised — servers, licences, a help desk. A strategic leader sees it as a **source of advantage** to be exploited. The SBL question rarely asks you to describe a system; it asks whether a proposed system will help the business **compete**. That reframing is the whole of this area." },
        { kind: "text", md: "**Porter's** thinking still frames it best. Technology can support a **cost leadership** strategy (automation that strips out unit cost), a **differentiation** strategy (data that lets you tailor a product no rival can match), or reshape the **five forces** themselves — raising barriers to entry, locking in customers with switching costs, or removing an intermediary from the value chain entirely." },
        { kind: "text", md: "The sharper idea is Porter's **value chain**: technology adds most value when it is embedded in the primary activities that touch the customer — not bolted on as back-office overhead. A recommendation engine inside sales is strategic; a faster payroll run is merely efficient. Being able to tell the two apart is what earns marks." },
        { kind: "callout", tone: "key", title: "The one idea", md: "In SBL, technology is judged by one test: does it help the business **compete** — on cost, on differentiation, or by changing the rules of the industry? If it only cuts an internal cost, it is efficiency, not strategy." },
        { kind: "callout", tone: "warn", title: "Advantage decays", md: "A technology that everyone can buy confers no lasting advantage — rivals copy it and it becomes the price of entry (a **strategic necessity**). Durable advantage comes from technology **combined** with proprietary data, scale or capabilities that cannot be bought off the shelf." },
      ],
    },
    {
      id: "big-data",
      heading: "Big data and the four analytics types",
      blocks: [
        { kind: "text", md: "\"Big data\" does not just mean \"a lot of data\". It is defined by characteristics the traditional spreadsheet cannot cope with — classically the **Vs**. Learn them in order and you can describe any data set a scenario throws at you." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The big-data Vs",
          caption: "Volume, velocity and variety are the original three; veracity is the quality question that decides whether any of it can be trusted.",
          data: {
            levels: [
              { label: "Veracity", sub: "Is it accurate and trustworthy? Garbage in, garbage out" },
              { label: "Variety", sub: "Many formats — text, images, sensor, clickstream, structured & unstructured" },
              { label: "Velocity", sub: "The speed it arrives and must be processed — often real time" },
              { label: "Volume", sub: "The sheer scale — terabytes to petabytes" },
            ],
          },
        } },
        { kind: "text", md: "Some texts add **value** as a fifth V — the reminder that data is worthless until a decision changes because of it. That is the bridge to **analytics**, which climbs a ladder of four types. Each answers a harder question than the last, and prescriptive analytics is where the real competitive edge sits." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The four types of data analytics",
          caption: "Each type answers a harder question — and moves from hindsight toward foresight and action.",
          data: {
            items: [
              { title: "1 · Descriptive", sub: "What happened? Dashboards and reports summarising the past" },
              { title: "2 · Diagnostic", sub: "Why did it happen? Drilling into causes and correlations" },
              { title: "3 · Predictive", sub: "What is likely to happen? Models and forecasts of the future" },
              { title: "4 · Prescriptive", sub: "What should we do about it? Recommends the optimal action" },
            ],
          },
        } },
        { kind: "table", caption: "The analytics ladder in a retail example", head: ["Type", "Question", "Retail example"], rows: [
          ["Descriptive", "What happened?", "Sales fell 8% in the northern region last quarter"],
          ["Diagnostic", "Why?", "A competitor opened three stores near our northern branches"],
          ["Predictive", "What next?", "Model forecasts a further 5% fall unless we respond"],
          ["Prescriptive", "What to do?", "Recommends a targeted loyalty offer to the at-risk postcodes"],
        ] },
        { kind: "callout", tone: "tip", md: "In the exam, name the type the scenario needs and say **why**. A board asking \"what should we do?\" needs **prescriptive** analytics; a board still asking \"why are margins down?\" is only at the **diagnostic** stage. Matching the tool to the question earns the mark." },
      ],
      check: {
        q: "A finance team builds a model that recommends the optimal price for each product to maximise contribution, given forecast demand. Which type of analytics is this?",
        options: [
          "Descriptive — it summarises what happened",
          "Diagnostic — it explains why margins moved",
          "Predictive — it forecasts future demand",
          "Prescriptive — it recommends the optimal action",
        ],
        correct: 3,
        explain: "Recommending the optimal action to take is prescriptive analytics — the top of the ladder. The model uses a forecast (a predictive input), but the output is a recommended decision, which is what makes it prescriptive. Descriptive and diagnostic only look at the past.",
      },
    },
    {
      id: "automation-cloud",
      heading: "Automation, AI and the cloud",
      blocks: [
        { kind: "text", md: "**Automation** replaces manual, rule-based effort — **robotic process automation (RPA)** handles the high-volume, repetitive transactions (reconciliations, data entry) that used to consume finance teams. **Artificial intelligence** goes further: it learns patterns from data and handles tasks that once needed human judgement — fraud detection, credit scoring, forecasting, natural-language queries. Automation follows fixed rules; AI infers them." },
        { kind: "text", md: "**Cloud computing** is the delivery of computing — storage, processing, software — as an on-demand **service over the internet**, paid for as you use it rather than owned. It turns a large up-front **capital cost** into a flexible **operating cost**, and lets a business scale capacity up or down almost instantly. That elasticity is why cloud underpins most big-data and AI work: you rent the horsepower only when you need it." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Cloud computing — opportunities vs risks",
          caption: "The SBL answer is never one-sided: name the gain and the exposure it creates.",
          data: {
            leftTitle: "Opportunities",
            rightTitle: "Risks",
            rows: [
              { aspect: "Cost", left: "Capex becomes flexible opex; pay per use", right: "Ongoing costs can creep and lock you in" },
              { aspect: "Scalability", left: "Scale up or down on demand, fast", right: "Dependence on the provider's capacity" },
              { aspect: "Access", left: "Work anywhere; faster collaboration", right: "Reliant on internet connectivity" },
              { aspect: "Security", left: "Provider invests in strong controls", right: "Data held by a third party; breach & residency risk" },
              { aspect: "Focus", left: "Frees IT to focus on the business", right: "Vendor lock-in; hard to switch provider" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Automation is not free of risk", md: "Automating a **broken** or non-compliant process just makes the errors happen faster and at scale. And AI carries **bias, explainability and accountability** risks — a model that denies credit must be auditable, or the business cannot defend the decision to a regulator. Governance must keep pace with the technology." },
      ],
      check: {
        q: "A company moves its accounting system to a cloud provider. Which is the MOST strategically significant risk the board should weigh?",
        options: [
          "Staff will need to learn a new login screen",
          "Dependence on a third party for data security and service continuity",
          "The software may have a different colour scheme",
          "The finance team will process transactions more quickly",
        ],
        correct: 1,
        explain: "The strategic risk of cloud is losing direct control: data now sits with a third party, so security, availability and vendor lock-in become dependencies the board must govern. The quicker processing is a benefit, and cosmetic issues are trivial. SBL rewards spotting the governance and control implication.",
      },
    },
    {
      id: "cyber",
      heading: "Cyber security and the CIA triad",
      blocks: [
        { kind: "text", md: "The more a business runs on data, the more damage a breach does — financial loss, regulatory fines, and the reputational hit that outlasts both. Cyber risk is therefore a **board-level** risk, not an IT one. The classic model for what security must protect is the **CIA triad**." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "The CIA triad — the three goals of information security",
          caption: "Every control exists to protect one or more of these three. A breach is a failure of at least one.",
          data: {
            centre: "Information security",
            nodes: [
              { label: "Confidentiality", sub: "Only authorised people can access the data" },
              { label: "Integrity", sub: "Data is accurate and has not been altered" },
              { label: "Availability", sub: "Data & systems are there when needed" },
            ],
          },
        } },
        { kind: "text", md: "Map any incident onto the triad to describe it precisely. A **data leak** breaches **confidentiality**; a **tampered** invoice or a corrupted database breaches **integrity**; a **ransomware** lockout or a server outage breaches **availability**. Naming which goal has failed is exactly what an evaluative answer does." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Common cyber threats",
          caption: "Most exam scenarios are one of these — recognise the pattern and the recommended response follows.",
          data: {
            items: [
              { title: "Phishing", sub: "Fake emails trick staff into giving credentials or clicking malware" },
              { title: "Malware & ransomware", sub: "Malicious software; ransomware encrypts data and demands payment" },
              { title: "Denial of service", sub: "Flooding a system to make it unavailable to users" },
              { title: "Insider threat", sub: "Staff misusing access, deliberately or by carelessness" },
              { title: "Social engineering", sub: "Manipulating people, not systems, to bypass controls" },
              { title: "Data interception", sub: "Capturing unencrypted data in transit across a network" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "People are the weakest link", md: "Most breaches exploit **human** error, not clever code. So the strongest defences are as much organisational as technical: **staff training**, access controls on a least-privilege basis, encryption, tested backups, and an **incident response plan** rehearsed before it is needed." },
      ],
      check: {
        q: "Ransomware encrypts a company's files and its systems go offline until a ransom is paid. Which element of the CIA triad is MOST directly breached?",
        options: [
          "Confidentiality — outsiders can read the data",
          "Integrity — the data has been altered incorrectly",
          "Availability — legitimate users cannot access the systems",
          "None — ransomware is not a security issue",
        ],
        correct: 2,
        explain: "Ransomware's primary effect is to make data and systems unavailable to the people who need them, so it directly breaches availability. It may threaten confidentiality too if data is stolen, but the defining harm — being locked out until you pay — is a loss of availability.",
      },
    },
    {
      id: "disruption",
      heading: "E-business, disruptive innovation and digital transformation",
      blocks: [
        { kind: "text", md: "**E-business** means running core operations — selling, sourcing, servicing — through digital channels. It can reshape the value chain by **disintermediation** (cutting out the middleman to reach customers directly) or by opening new **platform** models where the firm hosts a market rather than owning the stock." },
        { kind: "text", md: "**Disruptive innovation** (Christensen) is the one to get precisely right. A disruptor does **not** start by beating incumbents at their own game. It enters at the **low end** or in a new market with a product that is cheaper, simpler and initially \"worse\" on the traditional measures — good enough for the customers the incumbent overlooks. As the technology improves, it climbs upmarket and displaces the incumbent, who ignored it for too long because it looked unprofitable." },
        { kind: "callout", tone: "warn", title: "Sustaining is not disruptive", md: "A better, more expensive product for your **best existing** customers is a **sustaining** innovation, not a disruptive one. Incumbents are good at sustaining innovation and consistently blindsided by disruption — that asymmetry is the examinable point." },
        { kind: "text", md: "**Digital transformation** is the organisation-wide response: not bolting technology onto old processes, but **rethinking the business model, processes and culture** around what digital makes possible. A bank that lets you photograph a cheque has automated a task; a bank rebuilt around an app with no branches has transformed. Transformation is strategic and cultural — which is why it so often fails on **people and change management**, not on the technology." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "From raw data to a better decision",
          caption: "Technology only creates value when data completes this journey — a break at any step wastes the investment.",
          data: {
            steps: [
              { label: "Capture", sub: "Collect data from transactions, sensors, web & customers" },
              { label: "Store", sub: "Hold it securely — often in the cloud" },
              { label: "Process", sub: "Clean and organise; ensure veracity" },
              { label: "Analyse", sub: "Apply the four analytics types" },
              { label: "Insight", sub: "Turn output into a clear, trusted finding" },
              { label: "Decision", sub: "Act — the only step that creates value" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Whenever a scenario buys technology, trace it along this pipeline. The value is realised only at **decision** — if the data is never acted on, or veracity fails at **process**, the spend is wasted however clever the analytics." },
      ],
    },
    {
      id: "governance-pm",
      heading: "Governing technology — the CIO, the CDO and delivery",
      blocks: [
        { kind: "text", md: "If technology is strategic, it needs a voice in the boardroom. The **Chief Information Officer (CIO)** owns the technology **infrastructure** — systems, security, reliability and IT strategy; the classic \"keep the lights on and align IT with the business\" role. The **Chief Digital Officer (CDO)** is the newer, outward-facing role: driving **digital transformation**, new digital business models and the customer experience. One protects and runs; the other reinvents." },
        { kind: "table", caption: "Two technology leaders, two mandates", head: ["Aspect", "CIO", "CDO"], rows: [
          ["Focus", "IT systems & infrastructure", "Digital strategy & transformation"],
          ["Orientation", "Mostly internal — run & secure", "Mostly external — grow & reinvent"],
          ["Question", "Are our systems reliable and secure?", "How does digital change our business model?"],
          ["Risk owned", "Security, continuity, IT cost", "Disruption, relevance, customer shift"],
        ] },
        { kind: "text", md: "Delivering any technology change is a **project** — a temporary effort with a defined scope, budget and deadline. Two tools recur in SBL. A **Gantt chart** shows tasks as horizontal bars against a timeline, making dependencies and progress visible at a glance. The **critical path** is the longest chain of dependent tasks through a project — it sets the shortest possible completion time, so **any delay on a critical-path task delays the whole project**. Tasks off the critical path have slack." },
        { kind: "example", title: "Worked example — reading the critical path", scenario: "A data-analytics rollout has four tasks. A: procure the cloud platform (3 weeks). B: migrate the data — can only start after A (4 weeks). C: train staff — can run in parallel with B, needs A first (2 weeks). D: go live — needs both B and C finished (1 week). Which chain is critical, and what is the shortest duration?", steps: [
          { label: "Map the paths", detail: "Path 1: A → B → D. Path 2: A → C → D. Both must finish before D can complete." },
          { label: "Length of path 1", detail: "A (3) + B (4) + D (1) = 8 weeks." },
          { label: "Length of path 2", detail: "A (3) + C (2) + D (1) = 6 weeks." },
          { label: "Pick the longest", detail: "8 weeks beats 6, so A → B → D is the critical path — the chain with no slack." },
          { label: "Find the slack", detail: "Task C has 8 − 6 = 2 weeks of slack; it could slip 2 weeks without delaying go-live." },
        ], result: "The project takes a minimum of 8 weeks, driven by the critical path A → B → D. Speeding up training (C) does nothing for the deadline — only compressing a critical-path task can, which is exactly why identifying the path matters." },
        { kind: "callout", tone: "key", title: "Governance closes the loop", md: "Technology, data and innovation only pay off when the board **governs** them: a leader accountable at board level, projects delivered to time and budget, and risk — cyber, ethical, data-quality — managed as deliberately as the opportunity is pursued." },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating technology as a cost-saving IT issue rather than a strategy issue.", fix: "SBL asks whether technology helps the business COMPETE — on cost, differentiation or by changing the five forces. Frame every answer around advantage, not just efficiency." },
    { trap: "Listing the analytics types out of order or blurring predictive and prescriptive.", fix: "The order is descriptive → diagnostic → predictive → prescriptive. Predictive forecasts what will happen; prescriptive recommends what to DO about it." },
    { trap: "Calling any better, pricier product a 'disruptive' innovation.", fix: "Disruption enters LOW-end or in a new market with a cheaper, simpler, 'good enough' product. A premium upgrade for existing customers is a SUSTAINING innovation." },
    { trap: "Giving only the upside of cloud, AI or automation.", fix: "Evaluative marks need both sides — pair each opportunity (cost, scale, speed) with its risk (lock-in, third-party control, bias, connectivity)." },
    { trap: "Thinking speeding up any task shortens a project.", fix: "Only compressing a CRITICAL-PATH task shortens the deadline. Tasks with slack (off the critical path) can be accelerated with no effect on completion." },
  ],
  keyTerms: [
    { term: "The big-data Vs", def: "Volume, velocity, variety and veracity — the characteristics that make big data hard for traditional systems (value is sometimes added as a fifth)." },
    { term: "Prescriptive analytics", def: "The highest analytics type: it recommends the optimal action to take, not just what happened or what will happen." },
    { term: "CIA triad", def: "The three goals of information security — Confidentiality, Integrity and Availability; a breach is the failure of at least one." },
    { term: "Cloud computing", def: "Delivery of computing resources as an on-demand service over the internet, paid for as used, turning capital cost into flexible operating cost." },
    { term: "Disruptive innovation", def: "A cheaper, simpler product that enters at the low end or a new market and improves until it displaces established incumbents." },
    { term: "Critical path", def: "The longest chain of dependent tasks through a project; it sets the shortest completion time, so any delay on it delays the whole project." },
  ],
  summary: [
    "Technology is strategic when it helps the business compete — on cost, differentiation or by reshaping Porter's forces — not merely when it cuts an internal cost.",
    "Big data is defined by the Vs (volume, velocity, variety, veracity); analytics climbs descriptive → diagnostic → predictive → prescriptive, with prescriptive giving the sharpest edge.",
    "Cloud, automation and AI bring scale and speed but also third-party dependence, lock-in and bias — evaluate both sides and govern them.",
    "The CIA triad (confidentiality, integrity, availability) frames cyber risk as a board-level issue; people, not code, are usually the weakest link.",
    "Disruptive innovation and digital transformation reinvent the business model; the CIO runs and secures technology while the CDO drives transformation, and delivery hinges on the critical path.",
  ],
}
