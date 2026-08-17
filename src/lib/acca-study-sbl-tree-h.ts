import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area H — Enabling success, managing change and project management.
 *
 * Like Area G, the legacy Area H chapter was genuinely authored and tiny: 2
 * sections and 169 words covering six sub-topics with twenty-one learning
 * outcomes between them. It also carried the flow diagram whose steps were plain
 * strings rather than objects, so it rendered as a row of empty boxes.
 *
 *   SBL-34  Organising: structure and collaborative working  (H1)
 *   SBL-35  Disruptive technology and innovation             (H2)
 *   SBL-36  Talent management and the POPIT view             (H3)
 *   SBL-37  Performance excellence and critical success factors (H4)
 *   SBL-38  Managing strategic change                        (H5)
 *   SBL-39  Leading and managing projects                    (H6)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 */

const SBL_TREE_34: StudyChapter = {
  paper: "SBL",
  id: "SBL-34",
  number: 34,
  area: "H",
  syllabusRefs: ["H1(a)", "H1(b)"],
  title: "Organising: structure and collaborative working",
  minutes: 17,
  intro:
    "Structure is the first thing a chosen strategy runs into. If decision rights, accountability and information flow still fit the old strategy, the new one will be discussed at length and never delivered.",
  outcomes: [
    "Advise how an organisation's structure and internal relationships should be rearranged to deliver a chosen strategy",
    "Recognise which structural defect is blocking a strategy, from evidence in a case",
    "Advise on the implications of working with partners — franchising, outsourced processes, shared and global services",
    "Say what must be settled before a collaborative arrangement begins",
  ],
  sections: [
    {
      id: "structure-follows-strategy",
      heading: "Rearranging structure around a strategy",
      blocks: [
        {
          kind: "text",
          md: "Structure determines four things that decide whether a strategy is deliverable: who may decide what, who is accountable for which outcome, how work is coordinated across boundaries, and where information travels. A strategy requiring fast local response cannot be delivered through a structure that routes every decision to a head office committee — not because anyone opposes it, but because the machinery cannot produce that behaviour.",
        },
        {
          kind: "table",
          caption: "Structural forms, and what each is good and bad at",
          head: ["Form", "Organised by", "Strength", "Weakness"],
          rows: [
            ["Functional", "Specialism — finance, operations, sales", "Deep expertise; economies of scale", "Slow across boundaries; nobody owns the customer"],
            ["Divisional", "Product, market or geography", "Accountability for a whole result; local responsiveness", "Duplication; divisions optimise against each other"],
            ["Matrix", "Two dimensions at once, e.g. function and project", "Shares scarce expertise; balances priorities", "Two bosses; slow decisions; conflict unless rights are explicit"],
            ["Network or virtual", "Coordinating largely external capability", "Flexible; low fixed cost", "Weak control; dependence; culture hard to sustain"],
            ["Team or project based", "Around outcomes rather than functions", "Fast; adaptive; clear purpose", "Weak long-term capability building; repeated re-forming"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Diagnose the defect, do not just describe the options",
          md: "SBL cases give you the symptom and expect the structural cause. Duplicated functions and divisions competing for the same customer point to a divisional structure without coordination. Decisions escalating for months points to authority held too high. Nobody accountable for an end-to-end outcome points to a functional structure serving a customer-facing strategy. Name the specific defect and the specific change — a survey of five structural forms answers nothing.",
        },
        {
          kind: "text",
          md: "Two subtler mechanisms are worth having ready. **Spans and layers**: many layers slow decisions and dilute accountability, while very wide spans leave managers unable to supervise or develop anyone. And **incentives must move with structure**: giving a division responsibility for an outcome while rewarding its manager on functional cost will produce the functional behaviour, whatever the chart says. That is the SBL-02 control-systems point applied to organisation design.",
        },
      ],
      check: {
        q: "A group's strategy depends on offering integrated solutions combining three product lines. Each line is a separate division with its own sales force and targets, and salespeople are rewarded on their own division's revenue. What is the structural finding?",
        options: [
          "The divisions should be merged into a single functional organisation",
          "Nobody is accountable for the integrated solution, and divisional rewards actively discourage joint selling — the strategy needs cross-divisional account ownership and a reward that recognises combined sales",
          "The sales forces need better training in the other divisions' products",
          "The strategy should be abandoned as incompatible with the structure",
        ],
        correct: 1,
        explain:
          "The structure and the incentive both point away from the strategy: no one owns the combined outcome, and each salesperson loses by selling another division's product. Training cannot overcome a reward system, and a full functional merger is a disproportionate response to a coordination and incentive problem.",
      },
    },
    {
      id: "collaboration",
      heading: "Collaborative working and partnering",
      blocks: [
        {
          kind: "table",
          caption: "Forms of collaboration, and what each really costs",
          head: ["Arrangement", "What it delivers", "What it costs"],
          rows: [
            ["Franchising", "Rapid geographic reach with limited capital", "Control of standards and brand sits with franchisees"],
            ["Business process outsourcing", "Cost and specialist capability for standard processes", "Knowledge loss; dependence; exit difficulty"],
            ["Shared services", "Consolidated internal processing and standardisation", "Distance from the business; rigid service definitions"],
            ["Global business services", "One operating model across regions and functions", "A major change programme; local requirements resist it"],
            ["Joint venture or alliance", "Capability neither party has alone", "Shared control; governance must be agreed in advance"],
            ["Licensing", "Income from intellectual property without operating", "Little control of how the property is used"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Franchising's trade is control for speed — and standards are the exposure",
          md: "A franchisee owns their business and will optimise it, which is what makes franchising fast and capital-light. It also means the brand's promise is delivered by people the organisation does not employ. So the recommendation must cover **standards specification, training, monitoring and inspection, and the right to terminate** — because the customer will attribute a franchisee's failure to the brand, exactly as with outsourcing in SBL-14.",
        },
        {
          kind: "text",
          md: "Across every form, the same items must be settled before starting: what each party contributes, who decides what, how performance is measured, who owns anything created jointly, how disputes are resolved, and how either side exits. SBL-17 makes the point that alliances fail on these arrangements rather than on the strategy, and it is equally true of outsourcing and shared services — a service definition written before anyone understood the work is the most common cause of an outsourcing relationship going wrong.",
        },
        {
          kind: "example",
          title: "Advising on a shared service centre",
          scenario:
            "A group with five country operations proposes consolidating transaction processing into one shared centre, expecting a 30% cost reduction. Each country currently has its own processes, systems and local statutory requirements.",
          steps: [
            { label: "Test the premise", detail: "Savings come from standardisation, not from relocation — five different processes moved into one building remain five processes, and the saving will not appear." },
            { label: "Sequence it", detail: "Standardise processes and data definitions first, then consolidate; consolidating first exports the existing variation and the confusion with it." },
            { label: "Keep local obligations visible", detail: "Statutory and tax requirements differ by country and cannot be standardised away — identify what must remain local." },
            { label: "Define the service", detail: "Agree what the centre delivers, to what standard and timescale, how it is measured, and how a business unit escalates a failure." },
            { label: "Protect the knowledge", detail: "Retain business partners locally so the understanding that came from doing the processing is not lost with the work." },
          ],
          result:
            "The advice attacks the assumption behind the business case rather than the arithmetic in it — which is where the recommendation actually changes.",
        },
      ],
      check: {
        q: "A group expects a shared service centre to cut processing cost by 30%, moving five countries' existing processes into one location unchanged. What is the primary objection?",
        options: [
          "Shared service centres rarely achieve any savings",
          "The saving comes from standardisation rather than co-location — moving five different processes into one building preserves the variation and so preserves the cost",
          "Staff in the chosen location will be more expensive",
          "The countries should each retain their own processing",
        ],
        correct: 1,
        explain:
          "Consolidating without standardising relocates the work and its variety together, so the economies never materialise. The correct sequence is standardise, then consolidate — which also identifies the local statutory requirements that genuinely cannot be standardised.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing structural forms instead of diagnosing the defect.", fix: "Name the specific blockage — authority too high, no end-to-end owner, divisions competing — and the specific change." },
    { trap: "Changing structure and leaving incentives alone.", fix: "Reward drives behaviour; a divisional outcome rewarded on functional cost produces functional behaviour." },
    { trap: "Treating franchising as a way to grow without exposure.", fix: "The brand promise is delivered by non-employees — specify standards, monitor, inspect and retain the right to terminate." },
    { trap: "Accepting a shared services saving that depends on co-location.", fix: "Savings come from standardisation; standardise first, and identify what must stay local." },
  ],
  keyTerms: [
    { term: "Matrix structure", def: "Organisation along two dimensions at once, sharing scarce expertise at the cost of dual reporting and slower decisions." },
    { term: "Span of control", def: "The number of people reporting to one manager — too wide prevents supervision and development, too narrow adds layers." },
    { term: "Business process outsourcing", def: "Contracting a third party to perform a defined process." },
    { term: "Shared service centre", def: "Internal consolidation of transactional processing, whose savings depend on standardising the processes first." },
    { term: "Franchising", def: "Licensing a proven format to independent operators, trading control of standards for speed and low capital." },
  ],
  summary: [
    "Structure decides decision rights, accountability, coordination and information flow.",
    "Diagnose the specific structural defect blocking the strategy, then change it.",
    "Incentives must move with structure or the old behaviour persists.",
    "Every collaboration trades something — usually control — for speed, cost or capability.",
    "Shared services savings come from standardisation, not from co-location.",
  ],
  knowledgeDiagnostic: [
    { q: "What four things does structure determine for a strategy?", a: "Who may decide what, who is accountable for which outcome, how work is coordinated across boundaries, and where information travels." },
    { q: "Why does changing structure without changing rewards fail?", a: "People optimise what they are measured and rewarded on, so a divisional outcome rewarded on functional cost produces functional behaviour regardless of the chart." },
    { q: "What must a franchising recommendation include?", a: "Standards specification, training, monitoring and inspection, and the right to terminate — because non-employees deliver the brand promise." },
    { q: "Why do shared service centres often miss their savings target?", a: "Because the savings come from standardising processes, and consolidating unchanged processes simply relocates the variation." },
  ],
  furtherStudy: [
    "SBL-36 covers the talent and capability side of enabling success",
    "SBL-38 covers delivering a structural change",
    "SBL-30 covers finance-function structures specifically",
    "SBL-14 covers value networks and accountability for partners",
  ],
}

const SBL_TREE_35: StudyChapter = {
  paper: "SBL",
  id: "SBL-35",
  number: 35,
  area: "H",
  syllabusRefs: ["H2(a)", "H2(b)"],
  title: "Disruptive technology and innovation",
  minutes: 17,
  intro:
    "Disruption is not the same as competition getting harder. It has a recognisable shape, and recognising it early is the difference between responding and being displaced — which is why incumbents with every advantage still lose.",
  outcomes: [
    "Identify and assess the effect of disruptive technologies, including financial technology and cryptocurrencies",
    "Explain why established organisations respond to disruption late, and what would change that",
    "Assess how new products, processes, services and innovation support an organisation's strategy",
    "Advise on governing innovation so exploration is funded without becoming a portfolio of pet projects",
  ],
  sections: [
    {
      id: "what-disruption-is",
      heading: "What makes a technology disruptive",
      blocks: [
        {
          kind: "text",
          md: "A **sustaining** technology makes an existing offering better for existing customers, and incumbents are usually good at those. A **disruptive** technology arrives cheaper, simpler or more convenient, and initially worse on the measures existing customers care about — so it takes hold among people the incumbent does not value, or people who were not customers at all. Then it improves.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why competent incumbents lose — and this is the examinable point",
          md: "The incumbent's response is rational at every step. The new technology is genuinely worse on today's measures; it serves customers whose margins are unattractive; and diverting resource to it would harm the results the business is judged on. So the sensible decision each year is to keep improving the existing offering for the customers who pay best — and by the time the new technology is good enough for the mainstream, the incumbent has no capability in it. Nobody was foolish; the incentive structure produced the outcome, exactly as in the agency problem in SBL-05.",
        },
        {
          kind: "table",
          caption: "Recognising disruption in a case",
          head: ["Signal", "Why it matters"],
          rows: [
            ["A new entrant serving customers you declined as unprofitable", "The classic entry point; the segment is a foothold, not the market"],
            ["A cheaper, simpler alternative dismissed as 'not comparable'", "Comparison is on today's measures, which the entrant is not competing on"],
            ["Rapid improvement in the new offering's capability", "The gap on quality is closing while the price gap remains"],
            ["Your own customers using it for the low-value part of their need", "Adoption has already begun inside your customer base"],
            ["Falling share with rising or flat revenue", "The market is growing elsewhere — the drift signal from SBL-13"],
            ["The new model needs a cost base or channel you do not have", "Responding is a capability problem, not a pricing one"],
          ],
        },
        {
          kind: "text",
          md: "**Financial technology** is the syllabus's named example, and it disrupts by unbundling: payments, lending, foreign exchange, insurance and advice were bundled by institutions, and specialists now take one service each with a lower cost base and no legacy systems. **Cryptocurrencies and distributed ledgers** are named too, and the balanced treatment is what earns marks — potential for faster settlement, traceability and lower transaction cost against price volatility, unclear and changing regulation, irreversible transactions, custody risk, energy consumption in some designs, and their use in evading controls. A board asked to accept payment in a volatile asset is being asked to take on a treasury risk unrelated to its business.",
        },
      ],
      check: {
        q: "A bank dismisses a new payments app because its transaction limits are low and it lacks most of the bank's features. Its users are largely young customers the bank considers unprofitable. What should concern the board?",
        options: [
          "Nothing — the app is genuinely inferior and serves unattractive customers",
          "This is the standard disruption pattern: an inferior, cheaper offering in a segment the incumbent does not value, which improves while the incumbent has no capability in the new model",
          "The bank should immediately acquire the app at any price",
          "The bank should lower its own fees to match",
        ],
        correct: 1,
        explain:
          "Every fact the bank cites is true and is also exactly what disruption looks like at the start. The concern is not this year's revenue but that the capability gap widens while the judgement 'inferior and unprofitable' remains technically correct — until it abruptly is not.",
      },
    },
    {
      id: "innovation-and-governance",
      heading: "Innovation, and governing it",
      blocks: [
        {
          kind: "text",
          md: "H2(b) asks how new products, processes, services and innovation support strategy. Keep the types apart, because they need different capabilities and carry different risks.",
        },
        {
          kind: "table",
          caption: "Types of innovation",
          head: ["Type", "What changes", "Strategic contribution"],
          rows: [
            ["Product", "What is sold", "Differentiation; access to new segments; replacing declining lines"],
            ["Process", "How it is made or delivered", "Cost position, quality, speed — often the more defensible advantage"],
            ["Service", "What surrounds the product", "Retention and lock-in; recurring revenue"],
            ["Business model", "How value is created and captured", "The hardest to imitate and the most disruptive"],
            ["Position", "Who it is sold to and how it is framed", "New markets from existing capability"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Process and business-model innovation are undervalued in answers",
          md: "Candidates reach for new products because they are visible. But a competitor can copy a product far more easily than it can rebuild its cost base or restructure how it charges — so process and model innovation usually give the more durable advantage. Where a case shows commoditised products, the strongest recommendation is often to change the model, such as selling availability or an outcome instead of a machine, which links to the smart-technology point in SBL-22.",
        },
        {
          kind: "text",
          md: "Innovation then needs governing, and the two failure modes are opposite. Too little governance produces a portfolio of experiments that survive on their sponsor's seniority and are never honestly closed. Too much produces the SBL-01 problem, where a full-year payback hurdle screens out anything genuinely new before it is considered.",
        },
        {
          kind: "list",
          style: "number",
          title: "Governing innovation without killing it",
          items: [
            "**Separate the budget** — exploration funded distinctly from the core, on different criteria",
            "**Stage the commitment** — small amounts released against defined learning, not a single approval",
            "**Set kill criteria in advance** — agreed before enthusiasm and sunk cost accumulate",
            "**Protect time and give it a sponsor** — an idea with neither will not develop",
            "**Distinguish intelligent failure from negligence**, visibly, so proposing remains safe",
            "**Review the portfolio, not each project** — balance across horizons and risk",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Kill criteria agreed in advance are the single best governance recommendation here",
          md: "Once a project has a sponsor and sunk cost, the argument for continuing is always available and difficult to refuse. Deciding beforehand what result would end it converts a political question into an evidential one — and it is also what makes generous exploration funding defensible to a board.",
        },
      ],
      check: {
        q: "A manufacturer's products have become commoditised and price competition is intense. Which innovation is likely to give the most durable advantage?",
        options: [
          "A product upgrade adding features competitors currently lack",
          "A business-model change — selling guaranteed availability or outcomes using connected equipment data, rather than selling machines",
          "A marketing campaign repositioning the existing product as premium",
          "A price reduction funded by cutting overhead",
        ],
        correct: 1,
        explain:
          "Product features are the easiest thing for a competitor to copy, which is why commoditisation happened. Changing how value is captured requires rivals to rebuild their capabilities and commercial model, and it moves the basis of competition away from price entirely.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating disruption as ordinary competition.", fix: "Look for a cheaper, initially inferior offering taking hold in a segment the incumbent does not value." },
    { trap: "Concluding an incumbent's management was foolish.", fix: "Each yearly decision was rational; the incentive and measurement structure produced the outcome." },
    { trap: "Presenting cryptocurrency as either a solution or a fraud.", fix: "Weigh settlement speed, traceability and cost against volatility, regulation, irreversibility and custody risk." },
    { trap: "Reaching for product innovation by default.", fix: "Process and business-model innovation are harder to copy and usually more durable." },
    { trap: "Recommending an innovation budget with no exit discipline.", fix: "Set kill criteria in advance, and stage funding against defined learning." },
  ],
  keyTerms: [
    { term: "Sustaining technology", def: "An improvement to an existing offering on the measures existing customers already value." },
    { term: "Disruptive technology", def: "A cheaper, simpler or more convenient alternative, initially worse on established measures, which takes hold outside the incumbent's valued segments and then improves." },
    { term: "Financial technology", def: "Technology-led provision of financial services, typically unbundling one service from an institution's bundle at lower cost." },
    { term: "Business model innovation", def: "Changing how value is created and captured — the hardest form to imitate." },
    { term: "Kill criteria", def: "Evidence agreed in advance that would end a project, converting a political decision into an evidential one." },
  ],
  summary: [
    "Disruption begins cheaper and worse, among customers the incumbent does not value.",
    "Incumbents lose through rational annual decisions, not incompetence.",
    "Fintech disrupts by unbundling; crypto needs a balanced treatment of both sides.",
    "Process and business-model innovation are more durable than product features.",
    "Govern innovation with separate budgets, staged funding and kill criteria set in advance.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes a disruptive from a sustaining technology?", a: "A sustaining technology improves the existing offering on measures current customers value; a disruptive one is cheaper or simpler, initially worse on those measures, and gains a foothold elsewhere." },
    { q: "Why do capable incumbents respond late?", a: "Because each annual decision to serve the best-paying customers with the existing offering is rational, and diverting resource would damage the results the business is judged on." },
    { q: "Why is business-model innovation more durable than product innovation?", a: "A competitor can copy a feature relatively easily but must rebuild its capabilities and commercial model to copy how value is captured." },
    { q: "What is the best single governance mechanism for innovation?", a: "Kill criteria agreed in advance, because once a project has a sponsor and sunk cost the case for continuing is always available." },
  ],
  furtherStudy: [
    "SBL-22 to SBL-24 cover the technologies themselves",
    "SBL-13 covers drivers of change and strategic drift",
    "SBL-32 covers appraising staged and optional investments",
    "SBL-01 covers intrapreneurship and what suppresses it",
  ],
}

const SBL_TREE_36: StudyChapter = {
  paper: "SBL",
  id: "SBL-36",
  number: 36,
  area: "H",
  syllabusRefs: ["H3(a)", "H3(b)"],
  title: "Talent management and the POPIT view",
  minutes: 16,
  intro:
    "Strategies are delivered by people who have to be found, developed, motivated and kept. Talent management is where a capability gap identified in Area C either gets closed or quietly does not.",
  outcomes: [
    "Explain how managing talent supports the delivery of an organisation's strategy",
    "Identify the specific talent risk a case discloses, rather than recommending training generally",
    "Analyse improvement opportunities across the four POPIT views — people, organisation, processes and information technology",
    "Recognise when a proposed improvement addresses only one view and will therefore fail",
  ],
  sections: [
    {
      id: "talent",
      heading: "Talent management as strategy delivery",
      blocks: [
        {
          kind: "text",
          md: "Talent management is the connected set of activities by which an organisation ensures it has the people and capabilities its strategy will require: workforce planning, recruitment, development, deployment, succession, reward and retention. It supports strategy in a specific way worth stating — it converts a **capability requirement** into people who exist, in post, at the time the strategy needs them.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The talent cycle, driven by strategy",
            data: {
              steps: [
                { label: "Capabilities the strategy needs" },
                { label: "Workforce plan and gap analysis" },
                { label: "Attract and recruit" },
                { label: "Develop and deploy" },
                { label: "Reward and retain" },
                { label: "Succession and pipeline" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Name the specific talent risk the case discloses",
          md: "\"Invest in training and development\" is the emptiest recommendation available in SBL. The case will have told you something specific: a key individual with no successor, a skill the new strategy needs that nobody has, turnover concentrated in one function, an ageing workforce in a technical role, or a reward structure driving the wrong behaviour. Address that, and say what it would cost the strategy if unaddressed.",
        },
        {
          kind: "table",
          caption: "Talent risks, and what each actually needs",
          head: ["Risk in the case", "Consequence for strategy", "Response"],
          rows: [
            ["Key person with no successor", "A single departure stops a capability", "Documentation, shadowing, cross-training, succession plan"],
            ["Capability the strategy needs and nobody has", "The strategy is undeliverable as planned", "Recruit, acquire, partner — or phase the strategy to allow building"],
            ["High turnover in one function", "Recurring cost; loss of accumulated knowledge", "Diagnose cause — reward, management, workload — before recruiting harder"],
            ["Reward driving the wrong behaviour", "Measured behaviour beats stated strategy", "Redesign measures and reward, with counter-measures (SBL-33)"],
            ["No development route", "Capable people leave to progress elsewhere", "Visible progression, development plans, internal mobility"],
            ["Ageing workforce in technical roles", "A cliff-edge loss of tacit knowledge", "Structured transfer while both generations are present"],
          ],
        },
        {
          kind: "text",
          md: "Note the connection to SBL-15: tacit knowledge is what makes a capability hard for competitors to imitate *and* what makes it fragile against a single retirement. Talent management is how that tension is managed rather than merely observed.",
        },
      ],
      check: {
        q: "A company's growth strategy requires data-analytics capability it does not have. Recruitment in that market is competitive and lead times are long. What is the best-advised response?",
        options: [
          "Announce the strategy and recruit as vacancies allow",
          "Treat the capability as a precondition — recruit, acquire or partner for it, and phase the strategy to match when the capability will actually exist",
          "Train existing accounting staff to perform the analytics",
          "Abandon the strategy as unachievable",
        ],
        correct: 1,
        explain:
          "This is the feasibility point from SBL-16 in people terms: the capability gap does not defeat the strategy, it sets its timetable. Announcing a strategy the organisation cannot yet staff produces visible failure, and retraining alone rarely closes a specialist gap within the timeframe.",
      },
    },
    {
      id: "popit",
      heading: "The POPIT view of improvement",
      blocks: [
        {
          kind: "text",
          md: "POPIT examines an improvement opportunity from four angles at once — **people**, **organisation**, **processes** and **information technology**. Its value is diagnostic and it is one of the most useful tools in Area H, because it explains the most common reason improvement programmes fail: they change one view and leave the other three as they were.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "The four POPIT views",
            data: {
              centre: "The improvement",
              nodes: [
                { label: "People", sub: "Skills, capacity, motivation, willingness" },
                { label: "Organisation", sub: "Structure, roles, decision rights, accountability" },
                { label: "Processes", sub: "How the work actually flows, including workarounds" },
                { label: "Information technology", sub: "Systems, data, integration, reporting" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The single-view failure — the point to make in any POPIT answer",
          md: "A new system (IT) imposed on an unchanged process, with untrained staff and unchanged accountabilities, delivers nothing but a more expensive version of the old problem. That is the archetypal case scenario, and running POPIT over it produces the diagnosis directly: three of four views were never touched. Whenever a case describes a failed or disappointing improvement, check which views were addressed.",
        },
        {
          kind: "table",
          caption: "Using POPIT on a described improvement",
          head: ["View", "Questions to ask", "Typical omission"],
          rows: [
            ["People", "Do they have the skills, capacity and reason to work differently?", "Trained on the system, not on the new way of working"],
            ["Organisation", "Have roles, decision rights and accountabilities changed?", "New process, old approval hierarchy"],
            ["Processes", "Has the work itself been redesigned, or just automated?", "Existing steps digitised, including unnecessary ones"],
            ["Information technology", "Do systems support the redesigned process and share data?", "System cannot do what the new process assumes"],
          ],
        },
        {
          kind: "text",
          md: "The four views also help sequence a recommendation. Redesign the **process** first, so you know what is actually needed; settle the **organisation** so someone is accountable for the new flow; specify **IT** to support the redesigned process rather than the old one; and prepare **people** with the skills, capacity and reasons to adopt it. Programmes that begin by selecting a system have committed to a solution before diagnosing the problem.",
        },
      ],
      check: {
        q: "A company implemented a new CRM system 18 months ago. Sales staff still keep their own spreadsheets, the approval process is unchanged, and reporting is no better. Using POPIT, what is the diagnosis?",
        options: [
          "The CRM system was the wrong product and should be replaced",
          "Only the IT view was addressed — the process, the accountabilities and the people were left unchanged, so the old way of working persisted alongside the new system",
          "Sales staff should be instructed to stop using spreadsheets",
          "The implementation needed a longer timescale",
        ],
        correct: 1,
        explain:
          "Persistent shadow spreadsheets are the classic evidence that the process was never redesigned and staff were given no reason to work differently. Replacing the system repeats the same single-view mistake at greater cost, and instruction alone will not defeat a process that still requires the old records.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending 'training and development' generally.", fix: "Name the specific talent risk the case discloses and what it would cost the strategy." },
    { trap: "Recruiting harder against high turnover.", fix: "Diagnose the cause — reward, management, workload, progression — before replacing people faster." },
    { trap: "Treating a capability gap as fatal to a strategy.", fix: "It sets the timetable: recruit, acquire or partner, and phase the strategy accordingly." },
    { trap: "Using POPIT as four headings to describe.", fix: "Use it to find which views a failed improvement left untouched — usually three of four." },
    { trap: "Starting an improvement by selecting a system.", fix: "Redesign the process, settle accountability, then specify IT, then prepare people." },
  ],
  keyTerms: [
    { term: "Talent management", def: "Connected workforce planning, recruitment, development, deployment, succession, reward and retention aligned to the capabilities a strategy requires." },
    { term: "Succession planning", def: "Ensuring a capability survives the departure of the individual who currently holds it." },
    { term: "POPIT", def: "A four-view model for examining improvement — people, organisation, processes and information technology." },
    { term: "Single-view failure", def: "An improvement that changes one POPIT view and leaves the others, so the old way of working persists alongside the new system." },
  ],
  summary: [
    "Talent management converts a strategy's capability requirement into people in post in time.",
    "Name the specific talent risk the case gives you; generic training advice earns nothing.",
    "A capability gap sets a strategy's timetable rather than defeating it.",
    "POPIT's four views expose the commonest improvement failure — changing only IT.",
    "Sequence improvement: process, then organisation, then IT, then people.",
  ],
  knowledgeDiagnostic: [
    { q: "How does talent management support strategy?", a: "It converts the capabilities a strategy requires into people who exist, in post, at the time they are needed." },
    { q: "Name the four POPIT views.", a: "People, organisation, processes and information technology." },
    { q: "What is the single-view failure?", a: "Changing one view — usually installing a system — while process, accountability and people remain unchanged, so the old way of working persists." },
    { q: "In what order should an improvement be addressed?", a: "Redesign the process, settle organisation and accountability, specify IT for the redesigned process, then prepare people." },
  ],
  furtherStudy: [
    "SBL-15 covers capability, competence and tacit knowledge",
    "SBL-37 covers performance excellence and critical success factors",
    "SBL-38 covers delivering the change POPIT identifies",
    "SBL-33 covers reward measures and counter-measures",
  ],
}

const SBL_TREE_37: StudyChapter = {
  paper: "SBL",
  id: "SBL-37",
  number: 37,
  area: "H",
  syllabusRefs: ["H4(a)", "H4(b)"],
  title: "Performance excellence and critical success factors",
  minutes: 16,
  intro:
    "Two ideas that answer the question 'what should we actually be excellent at?' — a framework covering the whole organisation, and a discipline for narrowing attention to the few things that decide whether a strategy succeeds.",
  outcomes: [
    "Apply the Baldrige framework to assess how an organisation achieves and sustains excellent performance",
    "Advise how an organisation can be equipped to reach its strategic goals and compete more effectively",
    "Identify an organisation's critical success factors, and the measures that show whether they are being achieved",
    "Distinguish a critical success factor from an objective and from a performance indicator",
  ],
  sections: [
    {
      id: "baldrige",
      heading: "The Baldrige framework",
      blocks: [
        {
          kind: "text",
          md: "The Baldrige model assesses performance excellence across the whole organisation rather than one function, and its structure carries the argument: leadership, strategy and customer focus set direction; workforce and operations deliver; measurement and knowledge management inform everything; and results are the outcome by which the rest is judged.",
        },
        {
          kind: "table",
          caption: "The framework's categories, and what each asks",
          head: ["Category", "Question"],
          rows: [
            ["Leadership", "How do senior leaders set direction, values and accountability, and govern?"],
            ["Strategy", "How is strategy developed, resourced and implemented?"],
            ["Customers", "How are customers listened to, and their needs turned into offerings?"],
            ["Measurement, analysis and knowledge management", "How is performance measured, analysed and learned from?"],
            ["Workforce", "How is the workforce engaged, developed and equipped?"],
            ["Operations", "How is work designed, managed and improved?"],
            ["Results", "What outcomes follow — for customers, finances, workforce, process and governance?"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Its value is coverage — use it as a checklist against a partial answer",
          md: "Organisations pursuing excellence typically attack one or two categories: an operational improvement programme with no change in leadership behaviour, or a customer initiative with no measurement behind it. Running the categories across a case exposes what has been left out, and the omissions are usually **measurement** and **workforce**. That is the practical use — not reciting seven headings.",
        },
        {
          kind: "text",
          md: "Note that measurement sits at the centre by design: without it, an organisation cannot tell whether any of the other categories is improving, so it cannot learn. That is the same argument SBL-33 makes about KPIs, and the same one SBL-29 makes about control over reported data — a claim of excellence with no measurement behind it is an assertion.",
        },
      ],
      check: {
        q: "A company has run operational improvement programmes for three years, with no change in leadership behaviour, no customer research and no new performance measures. Using Baldrige, what is the assessment?",
        options: [
          "Excellent — sustained operational improvement is the core of performance excellence",
          "Partial — operations has been addressed while leadership, customers and measurement have not, so the organisation cannot know whether it is improving on what matters",
          "The programmes should be stopped",
          "Baldrige does not apply to operational improvement",
        ],
        correct: 1,
        explain:
          "The framework's point is coverage: improvement confined to operations, with no measurement or customer input, cannot show whether the gains matter to anyone outside the process. That is exactly the gap the categories are used to expose.",
      },
    },
    {
      id: "csfs",
      heading: "Critical success factors",
      blocks: [
        {
          kind: "definition",
          term: "Critical success factor",
          md: "A small number of areas in which the organisation must perform well for its strategy to succeed — where failure would make success impossible, however well everything else is done.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Keep three terms apart, because SBL exploits the confusion",
          md: "An **objective** is what you are trying to achieve — grow revenue 20%. A **critical success factor** is what you must be good at for that to happen — reliable next-day delivery. A **key performance indicator** is how you would know — percentage delivered next day, and the counter-measure beside it. Candidates routinely offer objectives as CSFs, which produces a list of aims and no insight into what the organisation must actually master.",
        },
        {
          kind: "table",
          caption: "Objective, CSF and measure, worked through",
          head: ["Objective", "Critical success factor", "Indicator", "Counter-measure"],
          rows: [
            ["Grow subscription revenue 25%", "Keeping customers beyond year one", "Renewal rate at 12 months", "Discount level given to renew"],
            ["Win public sector contracts", "Demonstrable compliance and security accreditation", "Accreditations held and current", "Cost of maintaining them"],
            ["Reduce unit cost 8%", "Plant availability", "Unplanned downtime hours", "Maintenance spend; defect rate"],
            ["Enter a new territory in 18 months", "Local regulatory approval", "Approval milestones met", "Cost of expediting"],
            ["Premium service positioning", "Consistent service by trained staff", "Mystery-shop score; first-contact resolution", "Handling time"],
          ],
        },
        {
          kind: "text",
          md: "The discipline is that CSFs must be **few**. If an organisation has eleven critical success factors it has none, because critical means that failure there is fatal — and attention is the scarcest resource a management team has. Three to six is the useful range, and identifying which three from a case's evidence is a genuine act of judgement, which is why it earns marks.",
        },
        {
          kind: "text",
          md: "For H4(b), 'equipping the organisation to reach its goals' then means aligning things to those factors: putting resource where the CSFs are, giving each an owner, measuring them, and removing obstacles — which is where this chapter joins SBL-34 on structure and SBL-36 on capability. A CSF nobody owns and nothing measures is a statement rather than a management tool.",
        },
      ],
      check: {
        q: "Which of the following is a critical success factor rather than an objective or an indicator?",
        options: [
          "Increase market share to 20% within three years",
          "The ability to bring new products from concept to launch faster than competitors",
          "Percentage of revenue from products launched in the last two years",
          "Achieve an operating margin of 12%",
        ],
        correct: 1,
        explain:
          "Options 0 and 3 are objectives — outcomes sought. Option 2 is an indicator that would measure the factor. Only option 1 names something the organisation must be good AT for the objectives to be achievable, which is what a critical success factor is.",
      },
    },
  ],
  examTraps: [
    { trap: "Reciting the Baldrige categories.", fix: "Use them as a coverage checklist to expose what an excellence programme has left out — usually measurement and workforce." },
    { trap: "Offering objectives as critical success factors.", fix: "An objective is what you want; a CSF is what you must be good at; an indicator is how you would know." },
    { trap: "Listing ten critical success factors.", fix: "Critical means failure there is fatal — three to six, or the concept loses its meaning." },
    { trap: "Identifying CSFs with no owner or measure.", fix: "Assign each an owner, a measure and resource, or it remains an aspiration." },
  ],
  keyTerms: [
    { term: "Baldrige framework", def: "A whole-organisation model of performance excellence spanning leadership, strategy, customers, measurement, workforce, operations and results." },
    { term: "Critical success factor", def: "One of a few areas where the organisation must perform well or the strategy cannot succeed." },
    { term: "Objective", def: "An outcome the organisation is trying to achieve." },
    { term: "Key performance indicator", def: "A measure showing whether a critical success factor is being achieved." },
  ],
  summary: [
    "Baldrige spans leadership, strategy, customers, measurement, workforce, operations and results.",
    "Use it for coverage — excellence programmes usually omit measurement and workforce.",
    "Objectives are what you want; CSFs are what you must master; indicators show whether you do.",
    "CSFs must be few — three to six — or attention is not being prioritised at all.",
    "Each CSF needs an owner, a measure and resource, or it is only a statement.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the practical use of the Baldrige framework in a case?", a: "As a coverage checklist exposing which aspects of an excellence programme have been left out — most often measurement and workforce." },
    { q: "Distinguish an objective, a CSF and a KPI.", a: "The objective is the outcome sought; the CSF is what the organisation must be good at for it to be achievable; the KPI is the measure showing whether it is." },
    { q: "Why must critical success factors be few?", a: "Because critical means failure there is fatal, and management attention is scarce — eleven CSFs means none have been prioritised." },
    { q: "What must accompany each identified CSF?", a: "An owner, a measure, and the resource to deliver it." },
  ],
  furtherStudy: [
    "SBL-33 covers KPI design and counter-measures",
    "SBL-36 covers the capability CSFs depend on",
    "SBL-34 covers aligning structure to what matters most",
    "SBL-11 covers the public sector equivalent in the three Es",
  ],
}

const SBL_TREE_38: StudyChapter = {
  paper: "SBL",
  id: "SBL-38",
  number: 38,
  area: "H",
  syllabusRefs: ["H5(a)", "H5(b)", "H5(c)", "H5(d)", "H5(e)", "H5(f)", "H5(g)"],
  title: "Managing strategic change",
  minutes: 19,
  intro:
    "Seven learning outcomes and the area's largest chapter, because this is where strategy either happens or does not. Three named models do specific jobs: Harmon decides which processes to change, Lewin describes how change is made to stick, and Balogun and Hope Hailey decide what KIND of change is possible here.",
  outcomes: [
    "Evaluate how well an organisation's current processes work",
    "Evaluate different types of strategic change and what each implies",
    "Decide which processes deserve attention, and what to do with each, using Harmon's matrix",
    "Advise on redesign options for existing processes, and recommend a redesign approach",
    "Manage change through a staged model such as Lewin's, and say why the last stage matters most",
    "Read what kind of change this organisation can actually absorb, using the contextual features of Balogun and Hope Hailey",
  ],
  sections: [
    {
      id: "types-of-change",
      heading: "What kind of change is this?",
      blocks: [
        {
          kind: "text",
          md: "Change varies along two dimensions that between them decide everything about how it should be managed: **how far-reaching** it is — a realignment within the existing way of operating, or a transformation of it — and **how fast** — incremental over time, or all at once.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Four types of strategic change",
            data: {
              leftTitle: "Realignment (within the current paradigm)",
              rightTitle: "Transformation (changing the paradigm)",
              rows: [
                { aspect: "Incremental", left: "ADAPTATION — gradual adjustment; the most common and least disruptive", right: "EVOLUTION — planned transformation over time; hardest to sustain" },
                { aspect: "Big bang", left: "RECONSTRUCTION — rapid change of structure or cost base, same basic business", right: "REVOLUTION — forced, rapid transformation, usually in crisis" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Type follows urgency and depth — and the case tells you both",
          md: "A liquidity crisis with weeks of cash forces reconstruction or revolution: there is no time for participation, and the recommendation must say so honestly. An organisation with time and a fundamental mismatch can attempt evolution, which is the most demanding type because it requires sustaining direction across years while results fluctuate. Naming the type before recommending an approach prevents the standard error of proposing a participative, gradual programme to an organisation that will run out of money first.",
        },
        {
          kind: "text",
          md: "H5(a) asks you to evaluate how well current processes work, which is the evidence base for all of this. Look for cycle time against what customers expect, error and rework rates, handoffs between departments, steps that exist only to check other steps, workarounds staff have invented, and points where information is re-entered. Each is measurable from case evidence and each points at a different redesign.",
        },
      ],
      check: {
        q: "A retailer has eight weeks of cash remaining, breached a covenant, and needs a fundamental shift in its business model. What type of change does this call for, and what follows?",
        options: [
          "Adaptation — gradual adjustment minimises disruption to trading",
          "Revolution — rapid, transformational change forced by crisis; participation must be limited to method, with the board directive on the financial envelope and timetable",
          "Evolution — planned transformation over several years",
          "Reconstruction — rapid change without altering the business model",
        ],
        correct: 1,
        explain:
          "Both dimensions are at their extreme: the shift is transformational and there is no time. Evolution needs years the company does not have, and reconstruction would leave the failing model intact — which is the point of distinguishing the four types before choosing an approach.",
      },
    },
    {
      id: "harmon",
      heading: "Harmon's process-strategy matrix, and redesign options",
      blocks: [
        {
          kind: "text",
          md: "Harmon's matrix decides *which* processes deserve attention and what should be done with each, by plotting **strategic importance** against **process complexity and dynamics**. It stops an organisation spending its improvement capacity on processes that do not matter.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Harmon's process-strategy matrix",
            data: {
              leftTitle: "Low strategic importance",
              rightTitle: "High strategic importance",
              rows: [
                { aspect: "Low complexity and dynamics", left: "AUTOMATE or OUTSOURCE — standard work that does not differentiate", right: "AUTOMATE and IMPROVE in-house — matters, but is stable enough to systematise" },
                { aspect: "High complexity and dynamics", left: "OUTSOURCE to a specialist — hard to do and not differentiating", right: "IMPROVE and INVEST in-house — the processes to give management attention and skilled people" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two conclusions that matter",
          md: "Complex work of **low** strategic importance is the strongest outsourcing candidate — it is difficult, it consumes capability, and doing it well wins nothing. Complex work of **high** strategic importance must be kept and invested in, because it is where advantage lives and it cannot be reduced to a service definition. An organisation that outsources the second because it is difficult has outsourced its own source of advantage, which is the finding to make.",
        },
        {
          kind: "table",
          caption: "Redesign options, from least to most disruptive",
          head: ["Option", "What it does", "Suits"],
          rows: [
            ["Simplify", "Remove steps, approvals and handoffs that add nothing", "Processes grown complex by accretion; quick wins"],
            ["Standardise", "One way of working across units", "Variation without justification; a precondition for shared services"],
            ["Automate", "Software performs the existing steps", "Stable, rule-based, high-volume work — after simplifying"],
            ["Redesign", "Rethink how the outcome is achieved, then support it", "Process no longer fits the strategy or the customer"],
            ["Reengineer", "Fundamental rethink from the customer outcome backwards", "Radical improvement needed; high risk and disruption"],
            ["Outsource", "Someone else performs it", "Low strategic importance; measurable; not differentiating"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Simplify before you automate",
          md: "Automating an unnecessary step makes it permanent, and it is far harder to remove once it is embedded in a system. The right sequence is simplify, standardise, then automate — which is the same lesson as the shared-services point in SBL-34 and the finance-transformation point in SBL-30.",
        },
      ],
      check: {
        q: "A process is technically complex, changes frequently, and is the basis of the company's competitive differentiation. Under Harmon's matrix, what should be done?",
        options: [
          "Outsource it to a specialist, since complexity makes it expensive to run in-house",
          "Keep it in-house and invest in it — high strategic importance with high complexity is where advantage lives and cannot be reduced to a service definition",
          "Automate it fully to remove the complexity",
          "Standardise it across all business units",
        ],
        correct: 1,
        explain:
          "Complexity is the reason outsourcing looks attractive and strategic importance is the reason it would be a mistake. Handing over the process that differentiates the company transfers its advantage to a supplier who can serve competitors too.",
      },
    },
    {
      id: "lewin-and-context",
      heading: "Making change stick: Lewin, and the contextual features",
      blocks: [
        {
          kind: "text",
          md: "**Lewin's three-stage model** is simple and still useful because of its third stage. *Unfreeze* — establish why the current position cannot continue, so people accept the need before the method is discussed. *Change* — move to the new way of working, with support, capability and visible sponsorship. *Refreeze* — embed it, so the organisation does not drift back once attention moves elsewhere.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Refreezing is the stage organisations skip, and the reason changes fail six months later",
          md: "Embedding means changing the things that reproduce the old behaviour: the measures, the reward, the reporting, the job descriptions, the standing agenda, the induction. When a case describes a change that was implemented and then quietly reverted, look for what was never refrozen — almost always the control systems from the cultural web in SBL-02 were left pointing at the old way.",
        },
        {
          kind: "text",
          md: "**Balogun and Hope Hailey's contextual features** are the diagnostic for what is actually possible in this organisation. They matter because a change approach that works in one organisation fails in another for entirely predictable reasons, and the features tell you which.",
        },
        {
          kind: "table",
          caption: "The contextual features, and what each decides",
          head: ["Feature", "Question", "Effect on approach"],
          rows: [
            ["Time", "How long before the change must be delivered?", "Little time forces directive change and limits participation"],
            ["Scope", "How much must change — a realignment or a transformation?", "Wider scope needs more communication and more sponsorship"],
            ["Preservation", "What capability must be protected through the change?", "Constrains what can be dismantled; names what to ring-fence"],
            ["Diversity", "How varied are the groups, cultures and subcultures affected?", "More diversity means differentiated, not uniform, approaches"],
            ["Capability", "Is there experience of managing change, at each level?", "Low capability needs external help and simpler staging"],
            ["Capacity", "Are there people, money and management attention available?", "Low capacity means phasing, not a full programme"],
            ["Readiness", "How aware and willing are those affected?", "Low readiness needs work on the case for change before method"],
            ["Power", "Does the change leader have the authority to make it happen?", "Weak power means building coalitions before announcing"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Preservation and capacity are the two features that most often decide the answer",
          md: "**Preservation** stops a recommendation destroying the thing that makes the organisation work — the specialist team, the customer relationships, the brand's reason for existing. **Capacity** is why most change programmes should be phased: an organisation running its normal operations does not have spare management attention, and a programme requiring more than exists will fail regardless of how well designed it is. Naming both is a mature answer.",
        },
        {
          kind: "example",
          title: "Reading the features before recommending",
          scenario:
            "A professional services firm must move to a standardised digital service within two years. Partners have never experienced significant change, the firm is fully occupied with client work, its value rests on senior expertise, and the change is led by a director with no equity stake.",
          steps: [
            { label: "Time and scope", detail: "Two years for a transformational change is tight but not a crisis — evolution rather than revolution, with clear staging." },
            { label: "Capability and capacity", detail: "No change experience and no spare management time: bring in external change capability and phase, rather than running one large programme." },
            { label: "Preservation", detail: "Senior expertise is what clients buy; the standardised service must be built around it, not replace it." },
            { label: "Power", detail: "A non-equity director cannot compel partners — the change needs a sponsoring partner coalition established before launch." },
            { label: "Readiness", detail: "Begin with the case for change, using evidence partners will accept, before discussing method." },
          ],
          result:
            "Every element of the recommendation is derived from a named feature, which is what turns the model into advice rather than a description.",
        },
      ],
      check: {
        q: "Six months after a successful change programme, staff have reverted to the previous way of working. Which stage was inadequate, and what specifically was missed?",
        options: [
          "Unfreeze — the case for change was never accepted",
          "Refreeze — the measures, rewards, reporting and job descriptions that reproduced the old behaviour were never changed, so the organisation drifted back once attention moved on",
          "The change stage — implementation was too fast",
          "None; reversion after six months is unavoidable",
        ],
        correct: 1,
        explain:
          "Reversion after apparent success is the signature of failed refreezing: the change happened and nothing was altered to hold it in place. If unfreezing had failed the change would not have been adopted in the first place.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a participative, gradual programme to an organisation in a cash crisis.", fix: "Name the change type first — time and depth decide it, and the case supplies both." },
    { trap: "Automating a process before simplifying it.", fix: "Simplify, standardise, then automate; automating an unnecessary step makes it permanent." },
    { trap: "Outsourcing a complex process because it is difficult.", fix: "Check strategic importance — complex AND important must be kept and invested in." },
    { trap: "Stopping at implementation.", fix: "Refreeze by changing measures, reward, reporting and job descriptions, or the change reverts." },
    { trap: "Recommending a full change programme regardless of capacity.", fix: "Management attention is finite — phase it, and say what is being protected (preservation)." },
  ],
  keyTerms: [
    { term: "Adaptation", def: "Incremental change within the existing way of operating — the most common type." },
    { term: "Reconstruction", def: "Rapid change to structure or cost base without altering the fundamental business model." },
    { term: "Evolution", def: "Planned transformational change over time — the most demanding type to sustain." },
    { term: "Revolution", def: "Rapid, forced transformation, usually in response to crisis." },
    { term: "Harmon's process-strategy matrix", def: "A tool plotting strategic importance against process complexity to decide whether to automate, improve, invest or outsource a process." },
    { term: "Refreezing", def: "Embedding a change by altering the measures, rewards and routines that would otherwise restore the old behaviour." },
    { term: "Preservation", def: "The contextual feature identifying which capability must be protected through a change." },
    { term: "Capacity (for change)", def: "The people, funding and management attention actually available, which usually dictates phasing." },
  ],
  summary: [
    "Change type follows depth and speed — adaptation, reconstruction, evolution or revolution.",
    "Harmon decides which processes to change: complex and important stay in-house and get investment.",
    "Simplify and standardise before automating.",
    "Lewin's refreeze stage is the one that gets skipped, which is why changes revert.",
    "The contextual features make advice specific — preservation and capacity usually decide it.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the four types of strategic change and their two dimensions.", a: "Adaptation, reconstruction, evolution and revolution — by extent (realignment or transformation) and speed (incremental or big bang)." },
    { q: "What are the axes of Harmon's matrix, and its two key conclusions?", a: "Strategic importance against process complexity and dynamics. Complex but unimportant work is the best outsourcing candidate; complex and important work must be kept and invested in." },
    { q: "What does refreezing actually involve?", a: "Changing the measures, rewards, reporting, job descriptions, agendas and induction that would otherwise reproduce the old behaviour." },
    { q: "Name the eight contextual features.", a: "Time, scope, preservation, diversity, capability, capacity, readiness and power." },
    { q: "Why does capacity usually dictate phasing?", a: "An organisation running normal operations has little spare management attention, so a programme demanding more than exists will fail however well designed." },
  ],
  furtherStudy: [
    "SBL-02 covers culture and the cultural web that change must move",
    "SBL-39 covers the project discipline that delivers a change",
    "SBL-36 covers POPIT, which identifies what must change",
    "SBL-01 covers the leadership approach a given change requires",
  ],
}

const SBL_TREE_39: StudyChapter = {
  paper: "SBL",
  id: "SBL-39",
  number: 39,
  area: "H",
  syllabusRefs: ["H6(a)", "H6(b)", "H6(c)", "H6(d)", "H6(e)", "H6(f)", "H6(g)", "H6(h)"],
  title: "Leading and managing projects",
  minutes: 18,
  intro:
    "Eight learning outcomes, and one governing idea: a project succeeds when the benefits arrive, not when the output is delivered. Almost every project finding in SBL follows from that distinction.",
  outcomes: [
    "Identify what distinguishes a project from ongoing operations, and the constraints it works within",
    "Explain the implications of the trade-off between scope, time and cost",
    "Prepare the two governing documents — the case for doing it, and the baseline for running it",
    "Analyse and classify a project's costs and benefits, including those that resist quantification",
    "Establish who sponsors a project and who manages it, and what fails when either role is weak",
    "Assess a project plan and its key elements",
    "Monitor and control project risk and slippage, and recommend corrective action",
    "Explain what post-implementation and post-project reviews each examine",
  ],
  sections: [
    {
      id: "projects-and-constraints",
      heading: "Projects, and the triple constraint",
      blocks: [
        {
          kind: "text",
          md: "A project is a temporary undertaking with a defined objective, a start and an end, its own resources, and an outcome that differs from routine operations. Those features are why it needs separate governance: ongoing operations are controlled by budgets and standing management, while a project is a one-off commitment whose control has to be created for it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The triple constraint",
            data: {
              items: [
                { title: "Scope", sub: "What will be delivered, and to what quality" },
                { title: "Time", sub: "By when" },
                { title: "Cost", sub: "For how much resource" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The constraint is a trade-off, and something always gives",
          md: "Fix all three and the fourth variable — quality — absorbs the pressure silently: testing is truncated, training is dropped, documentation is skipped. So when a case shows a project under pressure with scope, deadline and budget all unchanged, ask what is actually being sacrificed. It is usually the work whose absence will not be visible until after go-live.",
        },
        {
          kind: "text",
          md: "**Scope creep** is the specific failure to name: additions accepted individually, each small and reasonable, which together consume the time and budget that were set for the original scope. The control is a change process where any addition is costed, its effect on time stated, and it is approved or declined by the sponsor — not absorbed by the project team to be helpful.",
        },
      ],
      check: {
        q: "A project's sponsor insists that scope, deadline and budget are all fixed, while several requirements have been added since approval. What is most likely happening?",
        options: [
          "The project team is becoming more efficient",
          "Quality is absorbing the pressure — testing, training or documentation is being cut, and the consequences will appear after implementation",
          "The original estimates were too generous",
          "The additions must be immaterial",
        ],
        correct: 1,
        explain:
          "With three constraints fixed and scope rising, something has to give, and it is invariably the work whose absence is invisible until later. That is why scope changes must be costed and approved rather than absorbed.",
      },
    },
    {
      id: "documents-and-roles",
      heading: "The business case, the initiation document and who does what",
      blocks: [
        {
          kind: "table",
          caption: "Two documents, two different jobs",
          head: ["Document", "Purpose", "Contents", "When it matters"],
          rows: [
            ["Business case", "Justify doing this at all, and choosing this option", "Objectives, options considered, costs, benefits, risks, funding, timescale", "At approval — and again at each stage gate"],
            ["Project initiation document", "Baseline how it will be run and controlled", "Scope, deliverables, governance and roles, plan, resources, budget, risks, tolerances, reporting", "Once approved, as the reference for control"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The business case is a live document, not a gate pass",
          md: "Its purpose is to be revisited: if costs rise or the expected benefits fall, the question is whether the project still deserves the remaining spend — a question that is only answerable against a maintained case. Where a case shows a project continuing because of what has already been spent, that is sunk-cost reasoning, and the discipline is to appraise the remaining cost against the remaining benefit only.",
        },
        {
          kind: "table",
          caption: "Roles, and the failure that follows when each is absent",
          head: ["Role", "Responsibility", "If it is missing or weak"],
          rows: [
            ["Project sponsor", "Owns the business case and the benefits; secures resource; removes executive obstacles; approves changes", "The project has no advocate at board level; decisions stall; scope drifts"],
            ["Project manager", "Delivers scope within time, cost and quality; manages the plan, risks and reporting", "No day-to-day grip; slippage discovered late"],
            ["Steering group or board", "Directs, approves stage gates, resolves cross-functional conflict", "Functional disputes go unresolved; no gate discipline"],
            ["Benefit owner", "Realises and measures the benefits after delivery", "Outputs delivered, benefits never claimed or measured"],
            ["Users", "Specify requirements and accept the deliverable", "A solution nobody adopts — the SBL-36 shadow-spreadsheet outcome"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The benefit owner is the role most often absent, and its absence is the classic SBL finding",
          md: "A project manager's job ends when the output is delivered. If nobody is accountable for the benefits *afterwards* — the cost saving actually taken, the revenue actually earned, the adoption actually achieved — the business case's numbers are never tested against reality, and the organisation cannot tell whether the investment worked. Assigning a named benefit owner, with measures and dates, is one of the highest-value recommendations available in this area.",
        },
      ],
      check: {
        q: "A project has spent $4m of a $5m budget. Remaining cost to complete is $1.8m and expected remaining benefits are now $1.2m. What should be recommended?",
        options: [
          "Continue — abandoning it would waste the $4m already spent",
          "Stop, or rescope: the decision rests on the remaining $1.8m against the remaining $1.2m of benefit, and the $4m already spent is irrecoverable either way",
          "Continue but reduce the remaining budget to $1.2m",
          "Continue, since the original business case was approved",
        ],
        correct: 1,
        explain:
          "Sunk cost cannot be recovered by spending more, so it is irrelevant to the decision. Spending $1.8m to obtain $1.2m destroys a further $0.6m of value — which is precisely why the business case must be revisited rather than treated as a one-off approval.",
      },
    },
    {
      id: "control-and-review",
      heading: "Planning, control, and the two reviews",
      blocks: [
        {
          kind: "text",
          md: "H6(f) asks you to assess a project plan. The elements to look for are a work breakdown into manageable packages, dependencies and a critical path, realistic durations with stated assumptions, resources actually available rather than assumed, milestones that mean something, contingency, and defined tolerances for escalation.",
        },
        {
          kind: "table",
          caption: "Assessing a plan and its control",
          head: ["What to check", "Common defect"],
          rows: [
            ["Work broken into packages with owners", "Activities too large to track; slippage invisible"],
            ["Dependencies and critical path identified", "Delay to a critical task treated like any other"],
            ["Durations with stated assumptions", "Estimates with no basis; optimism embedded"],
            ["Resources confirmed, not assumed", "Key people also fully committed to operations"],
            ["Milestones with acceptance criteria", "Milestones marked complete while work continues"],
            ["Contingency, held by the sponsor", "None — or held by the team and consumed silently"],
            ["Tolerances and escalation route", "No definition of when the sponsor must be told"],
            ["Reporting on progress AND forecast", "Reports on effort spent rather than completion forecast"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Percentage complete is the least reliable measure in project reporting",
          md: "It is self-assessed, and it famously stalls at ninety per cent. Better evidence is completed deliverables accepted against criteria, milestones passed, and a re-forecast completion date. When a case reports a project at 85% complete with an unchanged deadline and a slipped dependency, the useful question is what has actually been *accepted*.",
        },
        {
          kind: "text",
          md: "For slippage, the recommendations available are limited and worth knowing: re-sequence work to protect the critical path, add resource where the work is divisible — remembering it often is not, and adding people to a late task can slow it — reduce scope with the sponsor's approval, accept a later date, or stop. What is not available is exhorting the team to work harder, and a case describing that as the response has given you the finding.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two reviews, two different questions",
            data: {
              leftTitle: "Post-project review",
              rightTitle: "Post-implementation review",
              rows: [
                { aspect: "Asks", left: "How well was the project managed?", right: "Is the output delivering the benefits?" },
                { aspect: "Timing", left: "Shortly after delivery", right: "Once the output has been in use long enough to judge" },
                { aspect: "Looks at", left: "Estimating, planning, risk management, governance", right: "Adoption, operating performance, benefits realised against the case" },
                { aspect: "Benefits", left: "Lessons for future projects", right: "Evidence of whether this investment worked; corrective action" },
                { aspect: "If skipped", left: "The same estimating errors repeat", right: "Nobody ever learns whether the investment paid" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Both reviews are commonly omitted for the same reason: the team has moved on and the answers may be uncomfortable. Recommending both, with the post-implementation review scheduled and owned at the point of approval rather than promised afterwards, is what makes benefits realisation real rather than aspirational.",
        },
      ],
      check: {
        q: "A system went live on time and within budget. Eighteen months later the expected cost savings have not materialised and most staff use the old manual process alongside it. What does this indicate?",
        options: [
          "The project was successful; the shortfall is an operational matter",
          "Project success was judged on delivery rather than benefits — no benefit owner, no adoption measurement and no post-implementation review, so the output was delivered and the investment did not pay",
          "The system should be replaced",
          "The original savings estimate was simply too optimistic",
        ],
        correct: 1,
        explain:
          "Delivering on time and budget measures the project manager's performance, not the investment's. Without a named benefit owner and a post-implementation review, nobody was accountable for adoption or for the savings — which is why an apparently successful project produced no return.",
      },
    },
  ],
  examTraps: [
    { trap: "Reading on time and on budget as project success.", fix: "Success is realised benefits; delivery is the project manager's measure, not the investment's." },
    { trap: "Continuing a project because of what has been spent.", fix: "Appraise remaining cost against remaining benefit; sunk cost is irrecoverable either way." },
    { trap: "Accepting scope additions without costing them.", fix: "Route every change through the sponsor with its time and cost effect stated." },
    { trap: "Relying on percentage complete.", fix: "Use accepted deliverables, milestones passed and a re-forecast completion date." },
    { trap: "Omitting the benefit owner and the post-implementation review.", fix: "Name an owner with measures and dates at approval, and schedule the review then." },
  ],
  keyTerms: [
    { term: "Triple constraint", def: "The trade-off between scope, time and cost — fixing all three means quality absorbs the pressure." },
    { term: "Scope creep", def: "Individually small additions that together consume the time and budget set for the original scope." },
    { term: "Business case", def: "The justification for undertaking a project and choosing an option, to be revisited at each stage gate." },
    { term: "Project initiation document", def: "The approved baseline for scope, governance, plan, resources, budget, risks, tolerances and reporting." },
    { term: "Project sponsor", def: "The executive owning the business case and the benefits, securing resource and approving changes." },
    { term: "Benefit owner", def: "The person accountable for realising and measuring benefits after the output is delivered." },
    { term: "Post-project review", def: "A review of how well the project was managed, producing lessons for future projects." },
    { term: "Post-implementation review", def: "A review, once the output is in use, of adoption and whether the business case's benefits were realised." },
  ],
  summary: [
    "A project succeeds when benefits arrive, not when the output is delivered.",
    "Fixing scope, time and cost together means quality silently absorbs the pressure.",
    "The business case is live — reappraise remaining cost against remaining benefit.",
    "The benefit owner is the role most often missing, and its absence explains unrealised benefits.",
    "Post-project review teaches future projects; post-implementation review tests this investment.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the triple constraint, and what happens if all three are fixed?", a: "Scope, time and cost. Fixing all three transfers the pressure to quality — testing, training and documentation get cut." },
    { q: "How should a decision to continue a troubled project be made?", a: "By comparing remaining cost to complete with remaining expected benefits; money already spent is irrecoverable and irrelevant." },
    { q: "What does a project sponsor do that a project manager does not?", a: "Owns the business case and the benefits, secures resource, removes executive obstacles and approves scope changes." },
    { q: "Why is percentage complete unreliable?", a: "It is self-assessed and stalls near completion; accepted deliverables, milestones passed and a re-forecast date are better evidence." },
    { q: "Distinguish the two reviews.", a: "The post-project review asks how well the project was managed, giving lessons for future projects; the post-implementation review asks whether the output is being adopted and the benefits realised." },
  ],
  furtherStudy: [
    "SBL-38 covers the change management a project delivers",
    "SBL-32 covers appraising the investment a business case proposes",
    "SBL-20 covers risk response, applied here to project risk",
    "SBL-33 covers measuring whether benefits materialised",
  ],
}

export const SBL_TREE_AREA_H: StudyChapter[] = [
  SBL_TREE_34, SBL_TREE_35, SBL_TREE_36, SBL_TREE_37, SBL_TREE_38, SBL_TREE_39,
]
