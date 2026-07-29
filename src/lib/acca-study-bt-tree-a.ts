import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area A — The business organisation, its stakeholders and the external
 * environment. Chapters 1–7 of the BT reading tree.
 *
 * Structure follows the official ACCA BT/FBT study guide, September 2025 to
 * August 2026: one chapter per syllabus sub-topic group (A1 … A9), which is how
 * the approved-provider texts organise the same ground. The former single Area A
 * chapter compressed all nine sub-topics into one 28-minute sitting; these seven
 * give each its own room.
 *
 * All wording is ORIGINAL Scholify teaching text. No ACCA, Kaplan or BPP prose is
 * reproduced — only the public syllabus structure, which is not anyone's IP.
 */

/* ── Chapter 1 · A1 ────────────────────────────────────────────── */

export const BT_TREE_01: StudyChapter = {
  id: "BT-01",
  number: 1,
  paper: "BT",
  area: "A",
  title: "The business organisation and why it exists",
  minutes: 16,
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)", "A1(d)", "A1(e)"],
  intro:
    "Before anything else, BT asks a deceptively simple question: what IS an organisation, and why do people bother forming one instead of just working alone? Every later chapter — structure, governance, ethics, control — is an answer to a problem this chapter creates.",
  outcomes: [
    "Define a business organisation and explain the three parts of that definition",
    "Explain why organisations are formed, and what individuals gain by joining one",
    "Describe the features common to all organisations and the ways they differ",
    "List the industrial and commercial sectors organisations operate in",
    "Distinguish commercial, not-for-profit, public sector, NGO and co-operative organisations",
    "Explain separate legal personality and limited liability, and why the distinction matters",
  ],
  sections: [
    {
      id: "what-is-an-organisation",
      heading: "What an organisation actually is",
      blocks: [
        {
          kind: "text",
          md: "A hospital, a football club, a global bank and a two-person courier firm look nothing like each other. BT still treats them as the same category of thing, because they share three features — and the standard definition is built from exactly those three.",
        },
        {
          kind: "definition",
          term: "Organisation",
          md: "A **social arrangement** for the **controlled performance** of **collective goals**. Strip out any one of the three and what is left is not an organisation.",
        },
        {
          kind: "list",
          style: "number",
          title: "The three parts, and what each one rules out",
          items: [
            "**Collective goals.** The organisation exists to achieve something, and that something is shared rather than personal. A school's goal is to educate; a company's is usually to increase owner wealth. Because the goal differs, everything downstream differs too — how it is structured, who it reports to, what \"good performance\" even means.",
            "**Social arrangement.** More than one person, working in defined relationships. This is why a **sole trader working alone is not an organisation** in the strict sense — there is no social arrangement to coordinate. It is the part candidates forget.",
            "**Controlled performance.** Systems exist to check that the goal is actually being met — targets, budgets, appraisals, supervision. Without control you have a crowd with good intentions, not an organisation.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The classic first-question trap",
          md: "Asked which of a list are organisations, candidates tick everything that sounds businesslike. Test each item against all **three** parts. A tennis club qualifies (members, a shared aim, a committee that runs it). A single self-employed plumber with no staff does **not** — no social arrangement.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Every organisation is a transformation process",
            caption: "Inputs are converted into outputs. What changes between organisations is WHAT gets converted, not the shape of the process.",
            data: {
              steps: [
                { label: "Inputs", sub: "people, money, materials, information, technology" },
                { label: "Process", sub: "the work itself, coordinated and controlled" },
                { label: "Outputs", sub: "goods, services, or an achieved social purpose" },
              ],
            },
          },
        },
        {
          kind: "illustration",
          title: "The same shape, three very different businesses",
          md: "A **furniture maker** takes timber, labour and machine time, and outputs tables. An **accountancy tuition provider** takes students and a syllabus, and outputs qualified accountants. A **children's charity** takes donations and volunteer hours, and outputs safeguarded children.\n\nAll three are input → process → output. Only the charity's output cannot be sold, which is precisely why its objectives, and the way it reports performance, have to work differently.",
        },
      ],
      check: {
        q: "Which of the following is NOT part of the standard definition of an organisation?",
        options: [
          "Collective goals",
          "Controlled performance",
          "Social arrangement",
          "Profit maximisation",
        ],
        correct: 3,
        explain:
          "The definition is a social arrangement for the controlled performance of collective goals — three parts, none of them profit. Profit is the goal of ONE type of organisation (commercial), and defining organisations by it would exclude charities, hospitals, government departments and co-operatives, all of which are organisations.",
      },
    },
    {
      id: "why-organisations-form",
      heading: "Why people form organisations",
      blocks: [
        {
          kind: "text",
          md: "If working together were not better than working alone, no organisation would exist. The syllabus wants the specific advantages, because they reappear later as the arguments for specialisation, delegation and teamwork.",
        },
        {
          kind: "list",
          title: "What an organisation gives its members",
          items: [
            "**Overcomes individual limitations** — physical (two people lift what one cannot) and intellectual (nobody knows everything).",
            "**Enables specialisation** — a person who does one task repeatedly gets faster and better at it than someone splitting attention across five.",
            "**Saves time** — tasks that do not depend on each other can run in parallel instead of in sequence.",
            "**Accumulates and shares knowledge** — what one person learns can outlive their involvement, held in procedures, systems and training.",
            "**Pools resources** — money, equipment and time that no individual member could raise alone.",
            "**Creates synergy** — the combined output exceeds the sum of the separate outputs. This is the umbrella idea the others feed into.",
          ],
        },
        {
          kind: "definition",
          term: "Synergy",
          md: "The effect whereby the **combined** output of people working together **exceeds the sum** of what they would each produce separately — often written informally as 2 + 2 = 5.",
        },
        {
          kind: "activity",
          title: "Activity 1 — the committee question",
          prompt:
            "Priya is organising her firm's annual client conference alone. A colleague suggests forming a small committee instead.\n\nState four genuine benefits of forming the committee, and one claim about committees that would NOT be a valid benefit.",
          answer:
            "**Four benefits.** (1) It overcomes Priya's individual limitations, bringing in skills she does not have — catering, AV, marketing. (2) It allows specialisation, with each member owning the part they are best at. (3) It saves time, because independent tasks proceed simultaneously rather than one after another. (4) It pools resources — contacts, budgets and volunteer hours a single organiser could not assemble. Synergy is the umbrella term for the combined effect.\n\n**Not a valid benefit.** \"Every committee member would be skilled in every aspect of running the conference.\" That is the opposite of specialisation, and it is a favourite distractor: the benefit of an organisation is that members do NOT all need the same skills.",
        },
      ],
    },
    {
      id: "common-features-and-differences",
      heading: "What all organisations share — and how they differ",
      blocks: [
        {
          kind: "text",
          md: "Examiners test this pair together, because it is easy to overstate either side. Every organisation shares a basic anatomy; the differences sit on top of it and drive nearly everything else you will study.",
        },
        {
          kind: "table",
          caption: "The shared anatomy, and the axes of difference",
          head: ["Common to all", "Differs between them"],
          rows: [
            ["Preoccupied with performance and meeting objectives", "**Ownership** — private individuals, shareholders, members, or the state"],
            ["Contains people and a structure of relationships", "**Control** — who takes the decisions, and how directly"],
            ["Uses resources to achieve its aims", "**Activity** — what it actually does, and in which sector"],
            ["Is affected by an external environment it cannot command", "**Profit orientation** — whether a surplus is the objective or a means"],
            ["Has some form of formal or informal structure", "**Size, legal status and geographic reach**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The idea that runs through the whole paper",
          md: "Every organisation has a **boundary** — the line where it meets what it cannot command: customers, competitors, regulators, the economy. Most of Area A is about reading across that boundary, and most of Areas B to F is about organising yourself to respond to it.",
        },
        {
          kind: "list",
          title: "Sectors organisations operate in",
          items: [
            "**Primary** — extracting raw materials: agriculture, mining, fishing, forestry.",
            "**Secondary** — converting raw materials into goods: manufacturing, construction, energy.",
            "**Tertiary** — services: retail, transport, banking, insurance, healthcare, professional services.",
            "**Quaternary** — knowledge and information: research, IT, consultancy, education. Often treated as a specialised part of the tertiary sector.",
          ],
        },
      ],
    },
    {
      id: "types-of-organisation",
      heading: "The five types the syllabus names",
      blocks: [
        {
          kind: "text",
          md: "The syllabus lists five types explicitly, and each is defined by **who it is run for**. Get the \"run for whom\" right and the rest of the characteristics follow.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The five types and who each one answers to",
            caption: "Ownership and purpose drive liability, finance, objectives and reporting.",
            data: {
              items: [
                { title: "Commercial", sub: "Run for its OWNERS. Objective: maximise owner wealth. Sole traders, partnerships, limited companies." },
                { title: "Not-for-profit", sub: "Run for a CAUSE or its beneficiaries. Any surplus is reinvested in the mission, never distributed." },
                { title: "Public sector", sub: "Run for CITIZENS, owned by the state, funded mainly by taxation. Schools, hospitals, defence." },
                { title: "Non-governmental (NGO)", sub: "Independent of government, pursuing a social or political aim; often internationally funded." },
                { title: "Co-operative", sub: "Owned and run by its MEMBERS for their mutual benefit. One member, one vote — not one share, one vote." },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Comparing the three commercial forms on the points that get examined",
          head: ["Feature", "Sole trader", "Partnership", "Limited company"],
          rows: [
            ["Legal identity", "Same as the owner", "Same as the partners (unless an LLP)", "**Separate legal person**"],
            ["Liability for debts", "Unlimited", "Usually unlimited (limited in an LLP)", "Limited to the amount invested"],
            ["Ease of formation", "Very easy", "Easy", "Formal registration and filing"],
            ["Access to finance", "Limited to the owner's resources", "Moderate — pooled partner capital", "Widest — can issue shares"],
            ["Ownership vs control", "The same person", "Usually the same people", "**Can be separated** — the agency problem"],
            ["Continuity", "Ends with the owner", "Disrupted by a partner leaving", "Perpetual succession — outlives its members"],
          ],
        },
        {
          kind: "definition",
          term: "Separate legal personality",
          md: "A limited company is a **legal person in its own right**. It can own assets, owe money, sue and be sued in its own name. Its owners cannot: their liability is **limited** to the amount they agreed to invest, so a failed company's creditors cannot pursue the shareholders' personal assets.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two distinctions worth memorising word-for-word",
          md: "**Co-operative vs company voting.** A co-operative is democratic on a **one member, one vote** basis, so no single member can dominate. A company votes on **one share, one vote**, so a majority shareholder can. This exact contrast is examined.\n\n**Not-for-profit does not mean no surplus.** A charity may run a surplus; what it may not do is **distribute** it to owners. \"Not-for-profit organisations never make a profit\" is a false statement.",
        },
        {
          kind: "illustration",
          title: "Two limited company types in one jurisdiction",
          md: "In the UK a **private** limited company (\"Ltd\") is typically smaller, owned by a handful of shareholders, and may not offer its shares to the general public. A **public** limited company (\"plc\") may offer shares to the public, which is how it can end up with millions of shareholders — and why the gap between the people who own it and the people who run it becomes so wide.",
        },
      ],
      check: {
        q: "Which statement about a co-operative is correct?",
        options: [
          "Members vote in proportion to their shareholding, as in a company",
          "Members vote on a one-member-one-vote basis, so no member can dominate",
          "A co-operative cannot generate a surplus",
          "A co-operative has no separate legal identity from its members",
        ],
        correct: 1,
        explain:
          "A co-operative is democratically controlled on a ONE MEMBER, ONE VOTE basis, which is exactly what prevents a single wealthy member dominating it — the contrast with a company's one-share-one-vote is the examinable point. Co-operatives can generate surpluses (returned to members as better prices, rates or a dividend on trade) and are typically incorporated with their own legal identity.",
      },
    },
    {
      id: "ownership-and-control",
      heading: "The separation of ownership and control",
      blocks: [
        {
          kind: "text",
          md: "The company form introduces the single most consequential idea in BT. Shareholders **own** the company; directors **run** it. In a sole trader those are the same person, so the question never arises. In a large plc they are thousands of strangers and a dozen executives.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this one idea generates half the syllabus",
          md: "Once the people who own the money are not the people spending it, you need **stakeholder analysis** (Chapter 2), **governance** (Chapter 11), **internal control and audit** (Chapter 15), **fraud prevention** (Chapter 16) and **professional ethics** (Chapters 25–26). All of them exist to manage the gap this separation creates.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The gap, and what fills it",
            caption: "The wider the separation, the more formal machinery is needed to bridge it.",
            data: {
              leftTitle: "Sole trader",
              rightTitle: "Large listed company",
              rows: [
                { aspect: "Who owns it", left: "One person", right: "Thousands of shareholders" },
                { aspect: "Who runs it", left: "The same person", right: "A board of directors" },
                { aspect: "Risk of misaligned interests", left: "None — one set of interests", right: "High — the agency problem" },
                { aspect: "Machinery required", left: "Essentially none", right: "Governance code, board committees, external audit, ethics code" },
              ],
            },
          },
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Treating a one-person sole trader as an organisation because it is a business.",
      fix: "Test all three parts of the definition. No social arrangement means no organisation, however commercial the activity looks.",
    },
    {
      trap: "Defining organisations by profit, which quietly excludes charities, hospitals and government bodies.",
      fix: "The definition is goals, social arrangement and controlled performance. Profit distinguishes one TYPE of organisation, it is not part of the definition.",
    },
    {
      trap: "Saying a not-for-profit organisation cannot make a surplus.",
      fix: "It can. What it cannot do is distribute that surplus to owners — the surplus is reinvested in the mission.",
    },
    {
      trap: "Applying one-share-one-vote to a co-operative.",
      fix: "Co-operatives are one member, one vote. That is the whole point of the form, and the reason a dominant member cannot emerge.",
    },
    {
      trap: "Assuming a partnership always has unlimited liability.",
      fix: "Traditional partnerships do, but an LLP is a separate legal entity whose members' liability is limited to their investment.",
    },
  ],
  keyTerms: [
    { term: "Organisation", def: "A social arrangement for the controlled performance of collective goals." },
    { term: "Synergy", def: "The effect whereby combined output exceeds the sum of the separate outputs of the individuals involved." },
    { term: "Separate legal personality", def: "The status of a company as a legal person able to own assets, owe debts and sue in its own name, distinct from its owners." },
    { term: "Limited liability", def: "The restriction of an owner's exposure to a company's debts to the amount they agreed to invest." },
    { term: "Co-operative", def: "An organisation owned and democratically controlled by its members on a one-member-one-vote basis for their mutual benefit." },
    { term: "Non-governmental organisation", def: "An organisation independent of government that pursues a social or political aim rather than owner profit." },
    { term: "Perpetual succession", def: "A company's ability to continue in existence irrespective of changes in its membership." },
  ],
  summary: [
    "An organisation is a social arrangement for the controlled performance of collective goals — all three parts are required.",
    "Organisations exist because they overcome individual limits, enable specialisation, save time, accumulate knowledge, pool resources and create synergy.",
    "Every organisation transforms inputs into outputs and sits inside an environment it cannot command.",
    "The five named types — commercial, not-for-profit, public sector, NGO and co-operative — are distinguished by who the organisation is run for.",
    "A limited company has separate legal personality and limited liability; a sole trader and a traditional partnership do not.",
    "Separating ownership from control creates the agency problem, and with it the need for governance, control, audit and ethics.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do organisations exist?", a: "Because they achieve results individuals cannot achieve alone — overcoming individual limitations, enabling specialisation, saving time, accumulating knowledge and pooling resources, which together produce synergy." },
    { q: "What are the three parts of the definition of an organisation?", a: "A **social arrangement**, for the **controlled performance**, of **collective goals**." },
    { q: "What are the five types of organisation the syllabus names?", a: "Commercial, not-for-profit, public sector, non-governmental (NGO) and co-operative." },
    { q: "What does limited liability actually limit?", a: "The owner's exposure to the company's debts — capped at the amount they agreed to invest, because the company is a separate legal person that owes the debts itself." },
    { q: "Why does the separation of ownership and control matter?", a: "It creates the agency problem: those spending the money are not those who own it. Governance, internal control, audit and professional ethics all exist to manage that gap." },
  ],
  furtherStudy: [
    "Types of organisation return in **LW (Corporate and Business Law)** in far more legal detail, and again in **SBL** when you advise on strategy for one.",
    "The agency problem opened here is developed in Chapter 2 (stakeholders) and Chapter 11 (governance).",
  ],
}

/* ── Chapter 2 · A2 ────────────────────────────────────────────── */

export const BT_TREE_02: StudyChapter = {
  id: "BT-02",
  number: 2,
  paper: "BT",
  area: "A",
  title: "Stakeholders and the agency relationship",
  minutes: 16,
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)", "A2(d)", "A2(e)"],
  intro:
    "An organisation is surrounded by parties who want something from it, and they do not all want the same thing. This chapter is about identifying them, understanding the agency relationship at the centre, and deciding whose claim gets managed how.",
  outcomes: [
    "Define a stakeholder and explain the agency relationship in different types of organisation",
    "Distinguish internal, connected and external stakeholders",
    "Identify the main stakeholder groups and state each group's objectives",
    "Explain how stakeholder objectives interact and conflict",
    "Apply Mendelow's power–interest matrix to decide how each stakeholder is managed",
  ],
  sections: [
    {
      id: "stakeholders-defined",
      heading: "Who counts as a stakeholder",
      blocks: [
        {
          kind: "definition",
          term: "Stakeholder",
          md: "Any person or group with an **interest** in what the organisation does — anyone who **affects** it or is **affected by** it. Note how wide that is: stakeholders are not only the owners.",
        },
        {
          kind: "text",
          md: "Stakeholders are grouped by **how close they sit** to the organisation, and the grouping is examined directly, so it has to be exact.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "Three rings of stakeholders",
            caption: "Internal = inside the organisation. Connected = has a contract with it. External = an interest but no contract.",
            data: {
              centre: "The organisation",
              nodes: [
                { label: "Employees", sub: "internal — pay, security, conditions" },
                { label: "Managers & directors", sub: "internal — run it, careers and reputations at stake" },
                { label: "Shareholders", sub: "connected — return on investment" },
                { label: "Lenders", sub: "connected — interest and repayment of capital" },
                { label: "Customers", sub: "connected — quality, value, continuity of supply" },
                { label: "Suppliers", sub: "connected — prompt payment, continuity of custom" },
                { label: "Government & agencies", sub: "external — tax revenue, lawful practice" },
                { label: "Community & pressure groups", sub: "external — local impact, the environment" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distractor that catches most candidates",
          md: "**Customers, suppliers and lenders are CONNECTED, not external.** They have a contractual or financial link to the business. \"External\" is reserved for parties with a real interest but **no direct contract** — government, the local community, pressure groups, the general public.",
        },
        {
          kind: "table",
          caption: "The main groups and what each one wants",
          head: ["Stakeholder", "Ring", "What is at stake", "What they expect"],
          rows: [
            ["Shareholders / proprietor", "Connected", "The money they invested", "Growing profits distributed as dividends, and growth in capital value"],
            ["Directors and managers", "Internal", "Careers, reputations, remuneration", "Autonomy, reward, and status linked to the size of what they run"],
            ["Employees and unions", "Internal", "Livelihoods", "Fair and growing pay, job security, safe conditions, training, career progression"],
            ["Customers", "Connected", "Their custom", "Quality and value, continuity of supply, fair terms"],
            ["Suppliers", "Connected", "Their trade", "Prompt payment, fair terms, continuity of orders"],
            ["Lenders", "Connected", "Capital advanced", "Interest paid and capital repaid — so they care about liquidity and gearing"],
            ["Government", "External", "Tax revenue and national infrastructure", "Lawful conduct, tax paid, reasonable employment practice"],
            ["Community and pressure groups", "External", "The shared environment", "Responsible environmental and social behaviour"],
          ],
        },
      ],
      check: {
        q: "A bank that has advanced a company a five-year loan is best classified as which type of stakeholder?",
        options: [
          "Internal, because it monitors the company closely",
          "Connected, because it has a financial and contractual link",
          "External, because it is a separate organisation",
          "Not a stakeholder — only owners are stakeholders",
        ],
        correct: 1,
        explain:
          "A lender has a direct financial contract with the business, which makes it CONNECTED, alongside shareholders, customers and suppliers. It is not internal (it is not part of the organisation) and not external (external parties have no contractual link). And stakeholders are far wider than owners: anyone affecting or affected by the business qualifies.",
      },
    },
    {
      id: "agency",
      heading: "The agency relationship",
      blocks: [
        {
          kind: "definition",
          term: "Agency relationship",
          md: "A relationship in which one party (the **agent**) acts on behalf of another (the **principal**). In a company the shareholders are the principals and the directors are their agents, appointed to run the business in the shareholders' interests.",
        },
        {
          kind: "text",
          md: "Agency is the formal name for the gap Chapter 1 opened up. Directors are **stewards** of other people's money, which is why they owe duties, why their performance is reported on, and why an external auditor is appointed to give the principals independent assurance.",
        },
        {
          kind: "definition",
          term: "Agency problem",
          md: "The risk that an agent pursues **their own** interests rather than the principal's — empire-building, excessive risk-taking, short-termism to hit a bonus, or simple lack of effort — because the agent has better information and different incentives.",
        },
        {
          kind: "list",
          title: "How the relationship varies by type of organisation",
          items: [
            "**Sole trader** — owner and manager are the same person, so there is effectively no agency relationship and no agency problem.",
            "**Partnership** — partners are agents both of the firm and of each other, which is why a partner's act can bind the whole firm.",
            "**Limited company** — the classic case: directors as agents of shareholders as principals, with the gap widest in a listed company whose shareholders are numerous and dispersed.",
            "**Not-for-profit and public sector** — trustees or officials act as agents for donors, beneficiaries or taxpayers. There is no share price to measure them by, which makes performance reporting harder rather than easier.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How agency is worded in questions",
          md: "Look for the phrase \"acting on behalf of\". The **principal** is whoever the money or the interest belongs to; the **agent** is whoever is making the decisions. Candidates reverse them under time pressure — read the sentence twice.",
        },
      ],
    },
    {
      id: "conflicting-objectives",
      heading: "Why stakeholder objectives conflict",
      blocks: [
        {
          kind: "text",
          md: "Stakeholder interests are not merely different, they are frequently **incompatible**: the same pound cannot be a dividend, a pay rise and a price cut. Managing an organisation is partly the art of balancing claims that cannot all be met in full.",
        },
        {
          kind: "table",
          caption: "Conflicts the examiner expects you to recognise",
          head: ["Decision", "Stakeholder who gains", "Stakeholder who loses"],
          rows: [
            ["Raise the dividend", "Shareholders", "Lenders (less cash cover), employees (less for pay)"],
            ["Automate a production line", "Shareholders, customers (lower cost)", "Employees whose roles disappear, the local community"],
            ["Cut prices to win market share", "Customers", "Shareholders in the short term, suppliers squeezed on terms"],
            ["Extend supplier payment terms to 90 days", "The company's cash position", "Suppliers, whose own liquidity worsens"],
            ["Relocate production overseas", "Shareholders", "Employees, local community, government (lost tax and jobs)"],
          ],
        },
        {
          kind: "illustration",
          title: "One decision, four different verdicts",
          md: "A manufacturer proposes closing an ageing plant and moving production abroad. The **institutional shareholder** sees an improved margin and approves. The **employees** see redundancy and oppose. The **local council** sees lost jobs and rising local unemployment. The **customer** may not notice at all, provided quality and delivery hold.\n\nNone of them is being unreasonable. They are simply reading the same facts from different positions, which is exactly why a framework is needed to decide whose reading drives the decision.",
        },
      ],
    },
    {
      id: "mendelow",
      heading: "Mendelow's power–interest matrix",
      blocks: [
        {
          kind: "text",
          md: "Mendelow's framework sorts stakeholders on two axes — **power** (the ability to influence the organisation) and **interest** (how much they care about this particular decision) — and prescribes a management strategy for each combination.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The four quadrants and their strategies",
            caption: "The strategy depends on the COMBINATION, not on either axis alone.",
            data: {
              leftTitle: "Low interest",
              rightTitle: "High interest",
              rows: [
                { aspect: "High power", left: "**Keep SATISFIED** — powerful but not yet engaged; a mishandled decision could rouse them", right: "**KEY PLAYERS** — manage closely, consult, involve in the decision" },
                { aspect: "Low power", left: "**Minimal EFFORT** — monitor at low cost", right: "**Keep INFORMED** — brief them; they can lobby those who do have power" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The four pairings, to be memorised exactly",
          md: "High power + high interest → **key players, manage closely**. High power + low interest → **keep satisfied**. Low power + high interest → **keep informed**. Low power + low interest → **minimal effort, monitor**. Questions test the pairing directly, and swapping \"keep satisfied\" with \"keep informed\" is the single most common error in Area A.",
        },
        {
          kind: "example",
          title: "Worked example — mapping four stakeholders for a factory closure",
          scenario:
            "GreenFab plans to close an ageing factory and move production overseas. Map these four onto Mendelow's matrix and state how each should be managed: (1) a major institutional shareholder, (2) the local council, (3) the factory's employees, (4) a small supplier of cleaning materials.",
          steps: [
            { label: "Major institutional shareholder", detail: "High power (a large voting block) and high interest (the move affects returns) → KEY PLAYER. Consult them and involve them in the decision." },
            { label: "Local council", detail: "High interest (local jobs and the local economy) but limited direct power over the company → KEEP INFORMED. Brief them, because they can lobby government or the press." },
            { label: "Factory employees", detail: "Very high interest (their jobs) but individually low power → KEEP INFORMED. Note that collectively, through a union, their power rises and they can shift toward key players." },
            { label: "Small cleaning-materials supplier", detail: "Low power and low interest in this specific decision → MINIMAL EFFORT. Simply monitor." },
          ],
          result:
            "The same event places stakeholders in different quadrants, and the quadrant — not the person's job title — dictates the strategy. The employees are the instructive case: power is not fixed, so a stakeholder can move between quadrants, and unionisation is exactly such a move.",
        },
        {
          kind: "activity",
          title: "Activity 2 — a regulator with low interest",
          prompt:
            "A retail bank is redesigning the loyalty scheme on its current accounts. Its financial services regulator has extensive statutory powers over the bank but has expressed no view on loyalty schemes, which fall outside its current supervisory priorities.\n\nWhich Mendelow quadrant does the regulator occupy for this decision, what strategy follows, and why would \"minimal effort\" be the wrong answer?",
          answer:
            "**High power, low interest → keep satisfied.** The regulator's statutory authority over the bank is unquestionably high power; its stated lack of interest in loyalty schemes puts interest low for this particular decision.\n\n**\"Minimal effort\" is wrong because it misreads the power axis.** Minimal effort is reserved for stakeholders with low power AND low interest — the ones who cannot hurt you and are not watching. A regulator can always choose to become interested, and if the scheme turned out to disadvantage vulnerable customers its interest would spike overnight, with all of its power intact. Keeping it satisfied — designing the scheme to be defensible and notifying the regulator — costs little and prevents that.\n\nNote how the answer depends on the decision, not the stakeholder: for a capital adequacy decision the same regulator would be a key player.",
        },
      ],
      check: {
        q: "In Mendelow's matrix, a stakeholder with HIGH power but LOW interest should be managed by which strategy?",
        options: [
          "Manage closely as a key player",
          "Keep satisfied",
          "Keep informed",
          "Minimal effort — just monitor",
        ],
        correct: 1,
        explain:
          "High power + low interest = KEEP SATISFIED. They are not engaged enough today to be key players, but their power means a badly handled decision could rouse them into opposition, so keep them content. 'Manage closely' is high power + high interest; 'keep informed' is low power + high interest; 'minimal effort' is low power + low interest.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Classifying customers or suppliers as external stakeholders.",
      fix: "They are CONNECTED — they hold a contract with the business. External means an interest but no contractual link, such as government or the local community.",
    },
    {
      trap: "Swapping 'keep satisfied' and 'keep informed' in Mendelow.",
      fix: "Keep SATISFIED is high power, low interest. Keep INFORMED is low power, high interest. Anchor on the power axis first, then read interest.",
    },
    {
      trap: "Reversing principal and agent, so directors become the principals.",
      fix: "The principal is whoever the money or interest belongs to (shareholders); the agent is whoever makes the decisions on their behalf (directors).",
    },
    {
      trap: "Treating stakeholder power as a fixed attribute of a person or group.",
      fix: "Power varies by decision and can change — unionised employees move from 'keep informed' toward 'key players' precisely by organising.",
    },
    {
      trap: "Assuming only owners are stakeholders.",
      fix: "A stakeholder is anyone who affects or is affected by the organisation. That includes employees, lenders, government, the community and pressure groups.",
    },
  ],
  keyTerms: [
    { term: "Stakeholder", def: "Any person or group with an interest in the organisation — anyone who affects it or is affected by it." },
    { term: "Internal stakeholder", def: "A stakeholder inside the organisation, such as an employee, manager or director." },
    { term: "Connected stakeholder", def: "A stakeholder with a contractual or financial link to the organisation, such as a shareholder, lender, customer or supplier." },
    { term: "External stakeholder", def: "A stakeholder with a real interest in the organisation but no direct contractual link, such as government, the community or a pressure group." },
    { term: "Agency relationship", def: "A relationship in which an agent acts on behalf of a principal, as directors act on behalf of shareholders." },
    { term: "Agency problem", def: "The risk that an agent pursues their own interests rather than the principal's, helped by better information and different incentives." },
    { term: "Mendelow's matrix", def: "A framework mapping stakeholders by power and interest to prescribe how each should be managed." },
  ],
  summary: [
    "A stakeholder is anyone who affects or is affected by the organisation, grouped as internal, connected or external.",
    "Connected stakeholders hold a contract with the business; external stakeholders have an interest but no contract.",
    "The agency relationship makes directors agents of shareholder principals, and the agency problem is the risk they serve themselves instead.",
    "Stakeholder objectives routinely conflict, because the same resources cannot satisfy every claim.",
    "Mendelow maps power against interest: key players are managed closely, high power with low interest is kept satisfied, high interest with low power is kept informed, and the rest are monitored.",
    "Power is decision-specific and can change, so a stakeholder's quadrant is not permanent.",
  ],
  knowledgeDiagnostic: [
    { q: "What is a stakeholder?", a: "Any person or group with a stake in the organisation — anyone who affects it or is affected by what it does." },
    { q: "What is the difference between a connected and an external stakeholder?", a: "A connected stakeholder has a contractual or financial link (shareholder, lender, customer, supplier). An external stakeholder has an interest but no contract (government, community, pressure groups)." },
    { q: "What is the agency relationship in a company?", a: "Shareholders are the principals who own the business; directors are their agents, appointed to run it on their behalf. The agency problem is the risk directors serve their own interests instead." },
    { q: "What are Mendelow's four strategies?", a: "Key players (high power, high interest) — manage closely. Keep satisfied (high power, low interest). Keep informed (low power, high interest). Minimal effort (low power, low interest)." },
    { q: "Why can stakeholder objectives not all be satisfied?", a: "Because they compete for the same finite resources — a pound paid as a dividend cannot also fund a pay rise or a price cut — so management must balance rather than satisfy every claim." },
  ],
  furtherStudy: [
    "Mendelow's matrix reappears as a core strategic tool in **SBL**, applied to far richer scenarios.",
    "The agency problem drives the whole of Chapter 11 (governance and social responsibility) and explains why external audit exists (Chapter 15).",
  ],
}

/* ── Chapter 3 · A3 ────────────────────────────────────────────── */

export const BT_TREE_03: StudyChapter = {
  id: "BT-03",
  number: 3,
  paper: "BT",
  area: "A",
  title: "Political and legal factors",
  minutes: 17,
  syllabusRefs: ["A3(a)", "A3(b)", "A3(c)", "A3(d)", "A3(e)", "A3(f)", "A3(g)"],
  intro:
    "Government sets the rules a business plays by, and the law enforces them. This chapter covers where legal authority comes from and the four bodies of law BT expects you to know: employment, data protection, health and safety, and consumer protection.",
  outcomes: [
    "Explain how the political system and government policy affect an organisation",
    "Describe the sources of legal authority, from supra-national bodies to regional government",
    "Explain how employment law protects employees and what it requires of managers",
    "Identify the principles of data protection and data security",
    "Explain how the law promotes health and safety at work, and who is responsible for compliance",
    "Outline the principles of consumer protection and simple contract",
  ],
  sections: [
    {
      id: "political-influence",
      heading: "How government affects the organisation",
      blocks: [
        {
          kind: "text",
          md: "Government influences a business in more ways than tax. It is simultaneously a **rule-setter**, a **customer**, an **employer**, a **funder** and a **manager of the economy** — and a change in any of those roles lands on the business as an opportunity or a threat it did not choose.",
        },
        {
          kind: "list",
          title: "The channels through which political decisions reach a business",
          items: [
            "**Legislation and regulation** — what the business may and may not do, and the cost of proving it complies.",
            "**Taxation policy** — rates and reliefs change the after-tax return on every decision.",
            "**Economic policy** — interest rates and public spending change demand and the cost of finance (Chapter 4).",
            "**Government as customer** — public procurement is a huge market, with its own tendering rules.",
            "**Grants, subsidies and incentives** — regional aid, R&D reliefs, training subsidies.",
            "**Trade policy** — tariffs, quotas, trade agreements and sanctions determine which markets are reachable.",
            "**Political stability itself** — an unstable regime raises the risk premium on every long-term investment.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Answering \"how does politics affect this business?\"",
          md: "Do not simply say \"through regulation\". Name the **channel** and then the **consequence for this organisation**. \"A rise in employer social security contributions increases the cost of the labour-intensive assembly operation, squeezing margins unless prices rise\" earns the mark; \"politics affects business\" does not.",
        },
      ],
    },
    {
      id: "sources-of-law",
      heading: "Where legal authority comes from",
      blocks: [
        {
          kind: "text",
          md: "Legal authority is layered. A business can be bound by rules made at four different levels at once, and where two conflict the higher level generally prevails.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The layers of legal authority",
            caption: "Higher layers constrain lower ones. A business must comply with all the layers that apply to it.",
            data: {
              levels: [
                { label: "Supra-national bodies", sub: "Treaty organisations and trading blocs whose rules bind member states — e.g. WTO rules, EU law for member states" },
                { label: "National government", sub: "Primary legislation (statute) and the delegated regulation made under it" },
                { label: "Regional / devolved government", sub: "Powers devolved to a region, state or province — often tax, education, planning" },
                { label: "Local government", sub: "Licensing, planning permission, local environmental and trading standards enforcement" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "Forms legal authority takes",
          items: [
            "**Statute** — law passed by the legislature. The strongest domestic source.",
            "**Delegated (secondary) legislation** — detailed rules made by a minister or agency under authority granted by statute, which is how most technical regulation arrives.",
            "**Case law** — decisions of the courts interpreting statute and, in common-law systems, creating binding precedent.",
            "**Codes of practice** — not law in themselves, but breach is evidence of failure and they are often admissible in enforcement.",
          ],
        },
      ],
      check: {
        q: "A government minister issues detailed technical rules on packaging waste, using a power granted to them by an Act of Parliament. What kind of legal authority are those rules?",
        options: [
          "Case law, because a court will interpret them",
          "Delegated legislation, made under authority granted by statute",
          "A voluntary code of practice with no legal force",
          "Supra-national law, because packaging is traded internationally",
        ],
        correct: 1,
        explain:
          "Rules made by a minister or agency using a power that a statute granted them are DELEGATED (secondary) legislation. They have full legal force — that is the point of the delegation — and most detailed technical regulation arrives this way, because Parliament cannot draft every specification itself. Case law is made by courts, and a code of practice is not itself law.",
      },
    },
    {
      id: "employment-law",
      heading: "Employment law and what it asks of managers",
      blocks: [
        {
          kind: "text",
          md: "Employment law exists because the employer and the individual employee are not equal bargaining parties. It sets a floor below which the contract cannot go, whatever the employee has agreed to.",
        },
        {
          kind: "list",
          title: "The protections BT expects you to recognise",
          items: [
            "**A written statement of terms** — pay, hours, holiday, notice, place of work, provided at or near the start of employment.",
            "**Minimum wage and working-time limits** — a pay floor, rest breaks, paid annual leave, limits on weekly hours.",
            "**Protection from discrimination** — recruitment, pay, promotion, training and dismissal must not turn on protected characteristics such as sex, race, disability, age, religion or belief.",
            "**Protection from unfair dismissal** — dismissal needs a fair reason and a fair procedure. Some reasons (pregnancy, whistleblowing, union membership) make a dismissal automatically unfair.",
            "**Redundancy rights** — fair selection criteria, consultation, notice and statutory redundancy pay.",
            "**Family and parental rights** — maternity, paternity, adoption and parental leave.",
            "**Health and safety and the right not to be victimised** for raising a concern.",
          ],
        },
        {
          kind: "definition",
          term: "Wrongful vs unfair dismissal",
          md: "**Wrongful** dismissal is a breach of the employment **contract** — most commonly dismissing without the notice the contract required. **Unfair** dismissal is a breach of **statutory** protection — dismissing without a fair reason or a fair procedure, whatever the contract said. A dismissal can be one, the other, or both.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The manager's exposure",
          md: "Discrimination law bites at **recruitment**, long before anyone is employed. An advertisement, a shortlisting criterion or an interview question that disadvantages a protected group is unlawful even though no contract exists yet — which is why Chapter 19's selection methods have to be job-related and consistently applied.",
        },
        {
          kind: "activity",
          title: "Activity 3 — three dismissals",
          prompt:
            "For each, state whether the primary issue is wrongful dismissal, unfair dismissal, or both.\n\n(a) An employee with eight years' service is dismissed on the spot for persistent lateness, with no warnings and no hearing, although her contract entitled her to eight weeks' notice which was paid in full.\n\n(b) An employee is dismissed with correct notice, one week after telling the regulator that the firm was misreporting client money.\n\n(c) An employee is dismissed with no notice and no procedure, for gross misconduct that did not in fact occur.",
          answer:
            "**(a) Unfair dismissal.** Persistent lateness can be a fair reason, but there was no fair procedure — no warnings, no hearing. The contract was honoured (notice paid in full), so there is no breach of contract and therefore no wrongful dismissal.\n\n**(b) Unfair dismissal — and automatically so.** Dismissal for whistleblowing is automatically unfair regardless of reason or procedure. Correct notice means the contract was not breached, so again not wrongful.\n\n**(c) Both.** No fair reason and no fair procedure make it unfair; dismissing without the contractual notice, where the alleged gross misconduct did not occur and so cannot justify summary dismissal, breaches the contract and makes it wrongful too.\n\nThe pattern to carry into the exam: **notice paid correctly → not wrongful. Reason or procedure defective → unfair.** The two tests are independent.",
        },
      ],
    },
    {
      id: "data-protection",
      heading: "Data protection and data security",
      blocks: [
        {
          kind: "text",
          md: "Data protection law governs **personal data** — information about identifiable living individuals. It matters to an accountant because payroll, customer and supplier records are all personal data, and because the finance function is usually the largest holder of it after HR.",
        },
        {
          kind: "list",
          style: "number",
          title: "The principles personal data must satisfy",
          items: [
            "**Lawfulness, fairness and transparency** — processed on a lawful basis, and the individual told what is happening.",
            "**Purpose limitation** — collected for a specified purpose and not reused for an incompatible one.",
            "**Data minimisation** — adequate and relevant, but no more than is necessary.",
            "**Accuracy** — kept accurate and up to date, with inaccuracies corrected.",
            "**Storage limitation** — kept no longer than the purpose requires.",
            "**Integrity and confidentiality (security)** — protected against unauthorised access, loss or damage.",
            "**Accountability** — the organisation must be able to DEMONSTRATE compliance, not merely assert it.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Protection is not the same as security",
          md: "**Data protection** is a body of law about the rights of the individual whose data it is. **Data security** is the set of controls — passwords, encryption, access rights, backups, physical security — that delivers the integrity and confidentiality principle. Security is one principle inside protection, not a synonym for it.",
        },
        {
          kind: "table",
          caption: "Rights the individual typically holds",
          head: ["Right", "What it means in practice"],
          rows: [
            ["Right of access", "To be told what data is held and to receive a copy"],
            ["Right to rectification", "To have inaccurate data corrected"],
            ["Right to erasure", "To have data deleted where there is no continuing lawful basis to hold it"],
            ["Right to object / restrict", "To stop or limit certain processing, notably direct marketing"],
            ["Right to data portability", "To receive their data in a reusable form and move it elsewhere"],
          ],
        },
        {
          kind: "illustration",
          title: "Where the finance function usually fails",
          md: "A finance team exports the full payroll to a spreadsheet to prepare a headcount analysis, emails it to three managers, and leaves the file on a shared drive that the whole department can read.\n\nThat breaches **data minimisation** (the analysis needed headcount and cost, not names and bank details), **purpose limitation** (payroll data collected to pay people, reused for management analysis) and **security** (open access to a file of personal data). No hacker was involved — routine convenience did it.",
        },
      ],
      check: {
        q: "An organisation keeps former customers' full payment card details indefinitely, on the basis that they might return one day. Which data protection principle does this most directly breach?",
        options: [
          "Lawfulness, fairness and transparency",
          "Accuracy",
          "Storage limitation",
          "Data portability",
        ],
        correct: 2,
        explain:
          "STORAGE LIMITATION requires personal data to be kept no longer than the purpose needs. 'They might return' is not a defined retention purpose, and holding card data indefinitely also worsens the consequences of any breach. Accuracy concerns whether data is correct rather than how long it is held, and data portability is a right of the individual, not a principle governing retention.",
      },
    },
    {
      id: "health-and-safety",
      heading: "Health and safety at work",
      blocks: [
        {
          kind: "text",
          md: "Health and safety law places duties on **both sides**. Candidates reliably remember the employer's duties and forget that the employee has legal duties too — and the examiner reliably tests the half that was forgotten.",
        },
        {
          kind: "table",
          caption: "Who owes what",
          head: ["Duty holder", "Principal duties"],
          rows: [
            ["Employer", "Provide a safe workplace, safe equipment and safe systems of work; carry out risk assessments; provide training, information and supervision; provide protective equipment free of charge; consult employees on safety; report specified injuries and incidents"],
            ["Employee", "Take reasonable care for their own safety and that of others; **co-operate** with the employer on safety measures; use equipment and protective clothing as trained; **not interfere with or misuse** anything provided for safety; report hazards"],
            ["Manager / supervisor", "Implement the policy in their area, ensure risk assessments are acted on, supervise so that safe systems are actually followed"],
          ],
        },
        {
          kind: "definition",
          term: "Risk assessment",
          md: "A systematic examination of a work activity to **identify hazards**, judge **who might be harmed and how**, evaluate the **likelihood and severity**, and decide what **control measures** are needed. It must be recorded, acted on, and reviewed when the activity or the workforce changes.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The health and safety management cycle",
            caption: "Compliance is a continuing loop, not a document produced once and filed.",
            data: {
              steps: [
                { label: "Set a policy" },
                { label: "Identify hazards" },
                { label: "Assess the risk" },
                { label: "Introduce controls" },
                { label: "Train and inform" },
                { label: "Monitor and review" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Responsibility for compliance",
          md: "The **organisation** is responsible for having and operating the system. The **individual** is responsible for following it and for not defeating it. Both can be liable, and an employee who removes a machine guard to work faster has personally breached a statutory duty, not merely a company rule.",
        },
      ],
    },
    {
      id: "consumer-protection",
      heading: "Consumer protection and simple contract",
      blocks: [
        {
          kind: "text",
          md: "Consumer protection law works the same way as employment law: it assumes the business and the individual consumer are not equal bargaining parties, and it implies terms into the contract that cannot be excluded.",
        },
        {
          kind: "list",
          style: "number",
          title: "The elements of a simple contract",
          items: [
            "**Offer** — a definite proposal to be bound on stated terms. Goods displayed in a shop are normally an *invitation to treat*, not an offer.",
            "**Acceptance** — unqualified agreement to the offer's terms. A counter-offer destroys the original offer rather than accepting it.",
            "**Consideration** — something of value moving each way. Usually price for goods, but it need not be adequate, only sufficient.",
            "**Intention to create legal relations** — presumed in commercial dealings, presumed absent in purely social or domestic arrangements.",
            "**Capacity** — the parties must be legally able to contract.",
          ],
        },
        {
          kind: "list",
          title: "Terms typically implied in a consumer sale of goods",
          items: [
            "The goods are of **satisfactory quality**, judged by what a reasonable person would expect given price and description.",
            "The goods are **fit for the purpose** made known to the seller.",
            "The goods **match their description**, and any sample or model shown.",
            "The seller has the **right to sell** them.",
            "Services are performed with **reasonable care and skill**, within a reasonable time, for a reasonable price where none was agreed.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two points that catch candidates",
          md: "**A price ticket is an invitation to treat.** The customer offers to buy; the retailer accepts. This is why a mispriced item does not oblige the shop to sell at that price.\n\n**Implied consumer terms cannot be contracted out of.** A notice saying \"no refunds under any circumstances\" does not remove the consumer's statutory rights — an exclusion of implied terms in a consumer sale is ineffective.",
        },
        {
          kind: "activity",
          title: "Activity 4 — is there a contract?",
          prompt:
            "A supplier emails: \"We can supply 500 units at $40 each, delivery in four weeks.\" The buyer replies: \"Agreed, but delivery must be in two weeks.\" The supplier does not reply, and three days later sells the units to someone else.\n\nHas the buyer any contractual claim? Explain using the elements of a simple contract.",
          answer:
            "**No claim.** The supplier's email was an **offer**. The buyer's reply changed a material term — delivery — and so was a **counter-offer**, not an acceptance. A counter-offer **destroys** the original offer; it does not sit alongside it waiting to be revived.\n\nThat left the supplier holding an offer it was free to accept or ignore. Silence is not acceptance, and no consideration passed. With no acceptance there was no contract, and the supplier was entitled to sell elsewhere.\n\n**The lesson for the exam:** \"Agreed, but…\" is almost never acceptance. If the buyer had wanted to preserve its position it should have accepted the original terms and then requested earlier delivery as a separate variation.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Confusing wrongful and unfair dismissal.",
      fix: "Wrongful is breach of the CONTRACT, usually lack of notice. Unfair is breach of STATUTORY protection — no fair reason or no fair procedure. The two tests are independent.",
    },
    {
      trap: "Using 'data protection' and 'data security' interchangeably.",
      fix: "Data protection is the law about individuals' rights over their personal data. Data security is the control set delivering one of its principles — integrity and confidentiality.",
    },
    {
      trap: "Listing only employer duties on health and safety.",
      fix: "Employees have statutory duties too: take reasonable care, co-operate with safety measures, use equipment as trained, and never interfere with or misuse safety provisions.",
    },
    {
      trap: "Treating a priced item on display as a contractual offer.",
      fix: "It is an invitation to treat. The customer makes the offer at the till and the retailer accepts, which is why a mispriced item need not be sold at that price.",
    },
    {
      trap: "Accepting that a 'no refunds' notice removes consumer rights.",
      fix: "Terms implied into a consumer sale — satisfactory quality, fitness for purpose, matching description — cannot be excluded by a notice or a clause.",
    },
    {
      trap: "Reading 'Agreed, but…' as acceptance.",
      fix: "Changing a material term makes it a counter-offer, which destroys the original offer instead of accepting it.",
    },
  ],
  keyTerms: [
    { term: "Delegated legislation", def: "Detailed rules made by a minister or agency under a power granted by statute, carrying full legal force." },
    { term: "Wrongful dismissal", def: "Dismissal in breach of the employment contract, most commonly without the notice the contract required." },
    { term: "Unfair dismissal", def: "Dismissal in breach of statutory protection, through the absence of a fair reason or a fair procedure." },
    { term: "Personal data", def: "Information relating to an identifiable living individual, which data protection law governs." },
    { term: "Data minimisation", def: "The principle that personal data collected must be adequate and relevant but no more than the purpose requires." },
    { term: "Risk assessment", def: "A systematic examination of a work activity to identify hazards, judge who could be harmed and decide what controls are needed." },
    { term: "Invitation to treat", def: "An indication of willingness to receive offers, such as goods displayed at a price, which is not itself a contractual offer." },
    { term: "Consideration", def: "Something of value given by each party to a contract; it must be sufficient but need not be adequate." },
  ],
  summary: [
    "Government reaches a business through legislation, tax, economic policy, procurement, subsidies, trade policy and its own stability.",
    "Legal authority is layered — supra-national, national, regional and local — and arrives as statute, delegated legislation, case law and codes of practice.",
    "Employment law sets a floor under the contract: written terms, minimum wage, working time, anti-discrimination, unfair dismissal and redundancy rights.",
    "Wrongful dismissal breaches the contract; unfair dismissal breaches statute. The tests are independent.",
    "Data protection principles are lawfulness, purpose limitation, minimisation, accuracy, storage limitation, security and accountability.",
    "Health and safety duties fall on employer, manager AND employee, and are managed as a continuing cycle centred on risk assessment.",
    "A simple contract needs offer, acceptance, consideration, intention and capacity; consumer sales carry implied terms that cannot be excluded.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four layers of legal authority?", a: "Supra-national bodies, national government, regional or devolved government, and local government. Higher layers constrain lower ones." },
    { q: "How do wrongful and unfair dismissal differ?", a: "Wrongful dismissal breaches the employment contract, typically by failing to give contractual notice. Unfair dismissal breaches statutory protection, through no fair reason or no fair procedure." },
    { q: "Name the data protection principles.", a: "Lawfulness/fairness/transparency, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality (security), and accountability." },
    { q: "What duties does an EMPLOYEE owe on health and safety?", a: "Take reasonable care for their own and others' safety, co-operate with the employer's measures, use equipment and protective clothing as trained, not interfere with or misuse safety provisions, and report hazards." },
    { q: "What are the elements of a simple contract?", a: "Offer, acceptance, consideration, intention to create legal relations, and capacity." },
  ],
  furtherStudy: [
    "Every topic here is examined far more deeply in **LW (Corporate and Business Law)** — this chapter is the outline that paper fills in.",
    "Data security controls are developed in Chapter 15 (internal control, security and compliance).",
  ],
}

/* ── Chapter 4 · A4 ────────────────────────────────────────────── */

export const BT_TREE_04: StudyChapter = {
  id: "BT-04",
  number: 4,
  paper: "BT",
  area: "A",
  title: "The macro-economic environment",
  minutes: 18,
  syllabusRefs: ["A4(a)", "A4(b)", "A4(c)", "A4(d)", "A4(e)"],
  intro:
    "Macro-economics is the weather a business operates in: it cannot be changed, only forecast and planned for. This chapter covers the four policy objectives, the business cycle, the four problems the syllabus names, and how fiscal and monetary policy act on them.",
  outcomes: [
    "Define macro-economic policy and state its objectives",
    "Explain the determinants of the level of business activity and the business cycle",
    "Explain the impact of inflation, unemployment, stagnation and international payments disequilibrium",
    "Describe the main types of economic policy available to government and supra-national bodies",
    "Recognise how fiscal and monetary measures affect individuals, households and businesses",
  ],
  sections: [
    {
      id: "objectives",
      heading: "What macro-economic policy is trying to achieve",
      blocks: [
        {
          kind: "definition",
          term: "Macro-economic policy",
          md: "Government action directed at the economy **as a whole** — its total output, employment, price level and external balance — as opposed to micro-economic policy, which acts on particular markets, firms and prices.",
        },
        {
          kind: "list",
          style: "number",
          title: "The four standard objectives",
          items: [
            "**Economic growth** — a sustained rise in national income, usually measured as real GDP growth.",
            "**Full employment** — unemployment kept as low as is compatible with a functioning labour market.",
            "**Price stability** — low and predictable inflation, commonly a target of around 2%.",
            "**Balance of payments equilibrium** — external trade and payments broadly in balance over time, so the country is neither accumulating unsustainable deficits nor hoarding surpluses.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the objectives fight each other",
          md: "These four cannot all be maximised at once, and that tension is the examinable insight. Pushing growth and employment hard tends to raise **inflation** and suck in **imports**, worsening the balance of payments. Crushing inflation with high interest rates tends to raise **unemployment** and slow **growth**. Policy is therefore always a trade-off, never an optimisation.",
        },
      ],
      check: {
        q: "A government raises interest rates sharply to bring inflation down from 9% to 2%. Which combination of side effects is most likely?",
        options: [
          "Higher growth and lower unemployment",
          "Lower growth and higher unemployment",
          "Lower growth and lower unemployment",
          "No effect on growth or unemployment, since interest rates only affect prices",
        ],
        correct: 1,
        explain:
          "Higher interest rates raise borrowing costs, so households spend less and businesses postpone investment. Aggregate demand falls, which is precisely how inflation is brought down — but weaker demand means LOWER growth and HIGHER unemployment. This is the central trade-off in macro-economic policy: the four objectives conflict, so pursuing one aggressively damages another.",
      },
    },
    {
      id: "business-activity",
      heading: "What determines the level of business activity",
      blocks: [
        {
          kind: "text",
          md: "Total spending in an economy — **aggregate demand** — is what determines how much gets produced and how many people are employed. It has four components, and every policy lever works by acting on one of them.",
        },
        {
          kind: "formula",
          name: "Aggregate demand",
          expr: "AD  =  C  +  I  +  G  +  (X − M)",
          note: "C = household consumption · I = business investment · G = government spending · X = exports · M = imports. Anything that changes one of these changes the level of activity.",
        },
        {
          kind: "table",
          caption: "What moves each component",
          head: ["Component", "Rises when", "Falls when"],
          rows: [
            ["Consumption (C)", "Incomes rise, credit is cheap, confidence is high, taxes fall", "Interest rates rise, unemployment rises, confidence falls"],
            ["Investment (I)", "Interest rates fall, demand is expected to grow, capacity is tight", "Finance is expensive, the outlook is uncertain, capacity is spare"],
            ["Government spending (G)", "Government chooses to expand fiscally", "Austerity or deficit reduction"],
            ["Net exports (X − M)", "The currency weakens, foreign demand grows, competitiveness improves", "The currency strengthens, trading partners slow, tariffs rise"],
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "timeline",
            title: "The business cycle",
            caption: "The cycle is the recurring pattern of aggregate demand around the economy's long-run trend.",
            data: {
              points: [
                { label: "Recovery", sub: "Demand and output pick up; confidence returns; unemployment starts to fall" },
                { label: "Boom", sub: "Capacity is fully used; labour is scarce; inflation builds" },
                { label: "Recession", sub: "Demand contracts; output and employment fall; two consecutive quarters of negative growth" },
                { label: "Depression / trough", sub: "Deep and prolonged contraction; spare capacity everywhere; confidence at its lowest" },
              ],
            },
          },
        },
        {
          kind: "illustration",
          title: "The same cycle, three different businesses",
          md: "In a **boom**, a housebuilder can barely recruit bricklayers and its input costs rise faster than its selling prices. A **supermarket** sees volumes hold but customers trade up. A **debt collection agency** sees demand fall, because fewer people default.\n\nIn a **recession** all three reverse. The general lesson: exposure to the cycle depends on whether what you sell is a necessity, a luxury or a counter-cyclical service — which is why the examiner asks about a *named* business rather than the economy in the abstract.",
        },
      ],
    },
    {
      id: "four-problems",
      heading: "The four problems the syllabus names",
      blocks: [
        {
          kind: "definition",
          term: "Inflation",
          md: "A sustained rise in the **general price level**, which is the same thing as a sustained fall in the purchasing power of money.",
        },
        {
          kind: "table",
          caption: "Inflation — the two causes and who it hurts",
          head: ["Aspect", "Detail"],
          rows: [
            ["**Demand-pull**", "Aggregate demand exceeds the economy's capacity to supply — too much money chasing too few goods"],
            ["**Cost-push**", "Input costs rise (wages, imported energy, raw materials) and are passed into prices even without excess demand"],
            ["Hurts", "Lenders (repaid in weaker money), savers, people on fixed incomes, exporters whose costs rise faster than competitors'"],
            ["Helps", "Borrowers (real value of debt falls), holders of real assets"],
            ["Business consequences", "Uncertainty in pricing and planning, menu costs of repricing, wage demands, distorted investment appraisal, and difficulty distinguishing real growth from price rises"],
          ],
        },
        {
          kind: "definition",
          term: "Unemployment",
          md: "People who are willing and able to work at prevailing wages but cannot find a job. It represents **output permanently forgone** — the economy produces less than it could — as well as lost income for those affected.",
        },
        {
          kind: "list",
          title: "Types of unemployment worth naming",
          items: [
            "**Cyclical** — caused by a downturn in aggregate demand. Rises in recession, falls in recovery.",
            "**Structural** — the skills or location of workers no longer match where jobs are. Persists even when demand recovers.",
            "**Frictional** — the normal short-term gap while people move between jobs. Some of this is unavoidable and even healthy.",
            "**Seasonal** — predictable variation in demand for labour across the year, as in agriculture or tourism.",
          ],
        },
        {
          kind: "definition",
          term: "Stagnation",
          md: "A prolonged period of little or no economic growth. Where it occurs **alongside high inflation** the combination is called **stagflation**, which is the hard case for policymakers because the standard remedies for each problem worsen the other.",
        },
        {
          kind: "definition",
          term: "Balance of payments disequilibrium",
          md: "A persistent imbalance in a country's transactions with the rest of the world. A sustained **deficit** — importing more than it exports — must be financed by borrowing or by selling assets abroad, which is not indefinitely sustainable and puts downward pressure on the currency.",
        },
        {
          kind: "activity",
          title: "Activity 5 — reading the impact through to a business",
          prompt:
            "Inflation in an economy rises from 2% to 8%, driven mainly by a sharp increase in imported energy prices. A domestic furniture manufacturer sells almost entirely to home customers and has $4m of fixed-rate bank debt.\n\nIdentify the type of inflation, and state two ways the manufacturer is harmed and one way it benefits.",
          answer:
            "**Type: cost-push inflation.** The driver is a rise in input costs (imported energy), not excess demand in the economy.\n\n**Two harms.** (1) Input costs rise immediately while selling prices can only be raised with a lag and with the risk of losing volume, so margins are squeezed. (2) Planning and investment appraisal become unreliable — it is hard to tell whether rising revenue is real growth or just higher prices, and employees will press for wage rises that lock the higher cost base in permanently.\n\n**One benefit.** The **real value of the $4m fixed-rate debt falls.** The cash repayments are fixed in money terms, so inflation erodes what they are worth; the manufacturer repays in weaker money than it borrowed. This is the standard inflation asymmetry — it transfers value from lenders to borrowers.",
        },
      ],
    },
    {
      id: "policy-tools",
      heading: "Fiscal and monetary policy",
      blocks: [
        {
          kind: "text",
          md: "Two main instruments act on aggregate demand, and BT wants you to know which is which, who operates it, and how it transmits to a business.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The two main policy instruments",
            caption: "Both act on aggregate demand — they differ in the lever, the operator and the speed.",
            data: {
              leftTitle: "Fiscal policy",
              rightTitle: "Monetary policy",
              rows: [
                { aspect: "Lever", left: "Government spending and taxation", right: "Interest rates and the money supply" },
                { aspect: "Operated by", left: "Government (the treasury or finance ministry)", right: "Central bank, usually operationally independent" },
                { aspect: "Expansionary means", left: "Spend more, tax less — widening the deficit", right: "Cut interest rates, expand the money supply" },
                { aspect: "Contractionary means", left: "Spend less, tax more", right: "Raise interest rates, tighten the money supply" },
                { aspect: "Speed", left: "Slower — needs budgets and legislation", right: "Faster — a rate decision takes effect on announcement" },
                { aspect: "Main risk", left: "Rising public debt; crowding out private investment", right: "Blunt instrument — hits borrowers hardest regardless of who caused the inflation" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "Other policy types the syllabus recognises",
          items: [
            "**Supply-side policy** — measures to raise the economy's productive capacity rather than its demand: training and education, deregulation, competition policy, infrastructure, incentives to work and invest.",
            "**Exchange rate policy** — managing or influencing the currency's value, which acts on the (X − M) component and on imported inflation.",
            "**Trade policy** — tariffs, quotas and trade agreements, increasingly negotiated by **supra-national bodies** rather than by single governments.",
            "**Regional and industrial policy** — targeted intervention to support particular sectors or geographic areas.",
          ],
        },
        {
          kind: "table",
          caption: "How a policy change reaches a household and a business",
          head: ["Measure", "Effect on the household", "Effect on the business"],
          rows: [
            ["Interest rate rise", "Mortgage and credit costs rise; saving becomes more attractive; disposable income falls", "Cost of borrowing rises, investment appraisals fail their hurdle rate, demand weakens, the currency tends to strengthen (hurting exporters)"],
            ["Income tax cut", "Disposable income rises; consumption rises", "Consumer demand rises; may need to expand capacity"],
            ["Increase in employer social security contributions", "Little direct effect; possibly slower wage growth", "Direct rise in employment cost; labour-intensive firms hit hardest; may reduce hiring"],
            ["Government infrastructure programme", "More jobs, higher incomes in affected regions", "Direct opportunity for construction and supply chains; may bid up wages and materials locally"],
            ["Currency depreciation", "Imported goods cost more; foreign holidays cost more", "Exports more competitive; imported inputs cost more — net effect depends on the import content of what it sells"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to score the application marks",
          md: "The mark is never for naming the policy. It is for the **chain**: measure → change in one component of AD → consequence for *this* organisation. \"Interest rates rise, so the finance cost of the company's variable-rate overdraft increases and its planned warehouse investment no longer clears its hurdle rate\" is a complete chain. \"Interest rates affect business\" is not.",
        },
      ],
      check: {
        q: "Which of the following is an example of expansionary FISCAL policy?",
        options: [
          "The central bank reduces the base rate by 0.5%",
          "The government increases spending on road building and cuts income tax",
          "The central bank buys government bonds to expand the money supply",
          "The government removes a licensing requirement to increase competition",
        ],
        correct: 1,
        explain:
          "Fiscal policy is government SPENDING and TAXATION, so spending more on roads while cutting income tax is expansionary fiscal policy. Options 1 and 3 are monetary policy, operated by the central bank through interest rates and the money supply. Option 4 is supply-side policy: it raises productive capacity rather than aggregate demand.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Confusing fiscal with monetary policy.",
      fix: "Fiscal = government spending and TAX. Monetary = central bank, INTEREST RATES and money supply. Check who operates the lever.",
    },
    {
      trap: "Assuming inflation harms everybody equally.",
      fix: "It transfers value. Borrowers and holders of real assets gain; lenders, savers and those on fixed incomes lose.",
    },
    {
      trap: "Treating all unemployment as cyclical.",
      fix: "Structural unemployment survives a recovery because skills or location no longer match the jobs; frictional and seasonal unemployment have different causes again.",
    },
    {
      trap: "Claiming a weaker currency is simply good for a business.",
      fix: "It helps exports but raises the cost of imported inputs. The net effect depends on the import content of what the business sells.",
    },
    {
      trap: "Assuming the four policy objectives can be met simultaneously.",
      fix: "They conflict. Pushing growth and employment tends to raise inflation and imports; fighting inflation tends to raise unemployment.",
    },
    {
      trap: "Naming a policy without tracing its effect on the organisation.",
      fix: "Application marks need the chain: measure → which component of aggregate demand moves → the specific consequence for this business.",
    },
  ],
  keyTerms: [
    { term: "Macro-economic policy", def: "Government action directed at the economy as a whole — output, employment, prices and the external balance." },
    { term: "Aggregate demand", def: "Total planned spending in an economy: consumption plus investment plus government spending plus net exports." },
    { term: "Business cycle", def: "The recurring pattern of recovery, boom, recession and depression in economic activity around its long-run trend." },
    { term: "Demand-pull inflation", def: "Inflation caused by aggregate demand exceeding the economy's capacity to supply." },
    { term: "Cost-push inflation", def: "Inflation caused by rising input costs being passed through into selling prices." },
    { term: "Structural unemployment", def: "Unemployment arising because workers' skills or location no longer match where jobs exist; it persists through a recovery." },
    { term: "Stagflation", def: "The combination of stagnant growth with high inflation, in which the remedy for one problem worsens the other." },
    { term: "Fiscal policy", def: "Government use of spending and taxation to influence aggregate demand." },
    { term: "Monetary policy", def: "Central bank use of interest rates and the money supply to influence aggregate demand." },
    { term: "Supply-side policy", def: "Measures to raise the productive capacity of the economy rather than the level of demand." },
  ],
  summary: [
    "Macro-economic policy targets growth, full employment, price stability and balance of payments equilibrium — and these objectives conflict.",
    "Business activity is driven by aggregate demand: C + I + G + (X − M).",
    "The business cycle moves through recovery, boom, recession and depression, and different businesses are exposed to it very differently.",
    "Inflation may be demand-pull or cost-push; it transfers value from lenders and savers to borrowers and holders of real assets.",
    "Unemployment may be cyclical, structural, frictional or seasonal, and only the cyclical kind clears when demand recovers.",
    "Fiscal policy is government spending and tax; monetary policy is the central bank's interest rates and money supply. Supply-side policy raises capacity instead.",
    "Marks come from tracing a policy change through aggregate demand to a specific consequence for the organisation in the question.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four objectives of macro-economic policy?", a: "Economic growth, full employment, price stability, and balance of payments equilibrium — objectives that conflict with one another." },
    { q: "What are the four components of aggregate demand?", a: "Consumption, investment, government spending, and net exports (exports less imports)." },
    { q: "What is the difference between demand-pull and cost-push inflation?", a: "Demand-pull arises when aggregate demand exceeds productive capacity. Cost-push arises when input costs rise and are passed into prices, even without excess demand." },
    { q: "Who gains from unexpected inflation?", a: "Borrowers, because the real value of fixed money debt falls, and holders of real assets. Lenders, savers and those on fixed incomes lose." },
    { q: "How does fiscal policy differ from monetary policy?", a: "Fiscal policy is the government's use of spending and taxation. Monetary policy is the central bank's use of interest rates and the money supply. Fiscal is slower to act; monetary is faster but blunter." },
  ],
  furtherStudy: [
    "Interest rates, currency movements and the cost of capital are developed quantitatively in **FM (Financial Management)** and again in **AFM**.",
    "Investment appraisal under changing hurdle rates is an FM topic that starts with the monetary policy transmission described here.",
  ],
}

/* ── Chapter 5 · A5 ────────────────────────────────────────────── */

export const BT_TREE_05: StudyChapter = {
  id: "BT-05",
  number: 5,
  paper: "BT",
  area: "A",
  title: "Micro-economic factors",
  minutes: 17,
  syllabusRefs: ["A5(a)", "A5(b)", "A5(c)", "A5(d)"],
  intro:
    "Where macro-economics is the weather, micro-economics is the market a business actually trades in: what determines the price it can charge, how customers respond when it moves that price, how its costs behave, and how much freedom the structure of its market gives it.",
  outcomes: [
    "Define demand and supply, and explain what shifts each curve",
    "Explain price elasticity of demand and calculate it",
    "Explain the effect of substitute and complementary goods",
    "Explain how costs behave in the short and the long run",
    "Distinguish perfect competition, monopolistic competition, oligopoly and monopoly",
  ],
  sections: [
    {
      id: "demand-and-supply",
      heading: "Demand, supply and the market price",
      blocks: [
        {
          kind: "definition",
          term: "Demand",
          md: "The quantity of a good or service that buyers are **willing and able** to purchase at a given price over a given period. Willingness alone is not demand — it must be backed by the ability to pay.",
        },
        {
          kind: "definition",
          term: "Supply",
          md: "The quantity that producers are **willing and able** to offer for sale at a given price over a given period.",
        },
        {
          kind: "text",
          md: "Demand falls as price rises; supply rises as price rises. Where the two are equal, the market **clears** — that price is the equilibrium, and it is the price a competitive market gravitates to.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How a market reaches equilibrium",
            caption: "Excess supply pushes price down, excess demand pushes it up — both toward the clearing price.",
            data: {
              steps: [
                { label: "Price above equilibrium", sub: "Supply exceeds demand — unsold stock builds" },
                { label: "Sellers cut price", sub: "To clear the surplus" },
                { label: "Equilibrium", sub: "Quantity demanded = quantity supplied; the market clears" },
                { label: "Price below equilibrium", sub: "Demand exceeds supply — shortages, queues, sellers raise price" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction the examiner tests hardest",
          md: "A change in **the good's own price** causes a **movement ALONG** the curve. A change in **anything else** causes the whole curve to **SHIFT**. Getting this backwards is the most common micro-economics error in BT.",
        },
        {
          kind: "table",
          caption: "What shifts each curve",
          head: ["Curve", "Shifts RIGHT (increase) when", "Shifts LEFT (decrease) when"],
          rows: [
            ["Demand", "Incomes rise (normal goods), tastes move toward it, a substitute's price rises, a complement's price falls, population grows, credit is cheap", "Incomes fall, tastes move away, a substitute gets cheaper, a complement gets dearer"],
            ["Supply", "Input costs fall, technology improves, more producers enter, subsidies are given, good weather (agriculture)", "Input costs rise, taxes on production rise, producers exit, supply is disrupted"],
          ],
        },
      ],
      check: {
        q: "The price of coffee beans falls sharply. What is the effect on the market for coffee shop drinks?",
        options: [
          "A movement along the supply curve, because the price of coffee changed",
          "The supply curve shifts right, because a key input cost has fallen",
          "The demand curve shifts left, because coffee is now cheaper to make",
          "No effect, because bean prices are a cost rather than a price",
        ],
        correct: 1,
        explain:
          "Coffee beans are an INPUT to coffee shop drinks, not the product itself. A fall in an input cost makes producers willing to supply more at every price, so the SUPPLY CURVE SHIFTS RIGHT. A movement along the curve would require the price of the drinks themselves to change. Demand is unaffected — customers have not changed their willingness to pay.",
      },
    },
    {
      id: "elasticity",
      heading: "Price elasticity of demand",
      blocks: [
        {
          kind: "definition",
          term: "Price elasticity of demand (PED)",
          md: "The **responsiveness** of quantity demanded to a change in price. It answers the question a business most needs answered before it moves a price: if I raise the price by 10%, how much volume do I lose?",
        },
        {
          kind: "formula",
          name: "Price elasticity of demand",
          expr: "PED  =  % change in quantity demanded  ÷  % change in price",
          note: "The result is normally negative, because price and quantity move in opposite directions. Convention is to quote the absolute value and compare it to 1.",
        },
        {
          kind: "table",
          caption: "Reading the number",
          head: ["Value", "Name", "Meaning", "Effect of a PRICE RISE on total revenue"],
          rows: [
            ["|PED| > 1", "Elastic", "Quantity responds proportionately more than price", "Revenue **falls** — volume lost outweighs the higher price"],
            ["|PED| < 1", "Inelastic", "Quantity responds proportionately less than price", "Revenue **rises** — little volume lost"],
            ["|PED| = 1", "Unit elastic", "Proportionate response", "Revenue unchanged"],
            ["|PED| = 0", "Perfectly inelastic", "Quantity does not respond at all", "Revenue rises in direct proportion to price"],
            ["|PED| = ∞", "Perfectly elastic", "Any price rise loses all demand", "Revenue collapses to nil"],
          ],
        },
        {
          kind: "example",
          title: "Worked example — should the price go up?",
          scenario:
            "A commuter rail operator currently sells 200,000 monthly season tickets at $180. It is considering a 10% price rise. Market research suggests demand would fall to 190,000 tickets. Calculate PED, classify it, and advise.",
          steps: [
            { label: "Percentage change in quantity", detail: "(190,000 − 200,000) ÷ 200,000 = −10,000 ÷ 200,000 = −5%." },
            { label: "Percentage change in price", detail: "+10%, as proposed." },
            { label: "Apply the formula", detail: "PED = −5% ÷ +10% = −0.5. Taking the absolute value, 0.5." },
            { label: "Classify", detail: "|PED| = 0.5, which is less than 1, so demand is INELASTIC. Commuters have few alternatives in the short run, which is exactly what you would expect." },
            { label: "Test it on revenue", detail: "Before: 200,000 × $180 = $36.0m. After: 190,000 × $198 = $37.62m. Revenue rises by $1.62m." },
          ],
          result:
            "PED = 0.5 (inelastic), so the price rise INCREASES revenue by $1.62m and the operator should proceed on revenue grounds alone. Two cautions the examiner rewards: elasticity is usually higher in the LONG run, as commuters relocate, change jobs or switch to driving; and revenue is not profit — the analysis ignores the cost saving from carrying 10,000 fewer passengers, which would make the case stronger still.",
        },
        {
          kind: "list",
          title: "What makes demand inelastic",
          items: [
            "**Few substitutes** — the fewer the alternatives, the less customers can escape a price rise.",
            "**Necessity rather than luxury** — insulin is inelastic; a second holiday is not.",
            "**Small proportion of income** — a 20% rise in the price of salt changes nobody's behaviour.",
            "**Addiction or habit** — behaviour is slow to respond to price.",
            "**Short time horizon** — customers have not yet had time to find an alternative.",
            "**Brand loyalty** — the reason firms invest in brands is precisely to make their own demand less elastic.",
          ],
        },
        {
          kind: "definition",
          term: "Substitute and complementary goods",
          md: "**Substitutes** are alternatives that satisfy the same need — tea and coffee, rail and coach. When one's price rises, demand for the other **rises**. **Complements** are consumed together — printers and cartridges, cars and fuel. When one's price rises, demand for the other **falls**.",
        },
        {
          kind: "illustration",
          title: "Why razors are cheap and blades are not",
          md: "A razor handle and its blades are complements. Sell the handle cheaply — even below cost — and you expand the installed base; the blades, which the customer must keep buying and which fit only your handle, then face inelastic demand and carry the margin.\n\nThe same logic explains cheap printers with expensive cartridges and subsidised games consoles with full-price games. The strategy works only if the complement cannot easily be substituted, which is why manufacturers fight compatible third-party refills so hard.",
        },
      ],
      check: {
        q: "A firm raises its price by 5% and total revenue falls by 3%. What does this tell you about demand for its product?",
        options: [
          "Demand is inelastic, because the change in revenue is smaller than the change in price",
          "Demand is elastic, because a price rise reduced total revenue",
          "Demand is unit elastic, because revenue changed",
          "Nothing can be concluded without knowing the actual volumes",
        ],
        correct: 1,
        explain:
          "The revenue test is decisive: if a PRICE RISE reduces total revenue, the volume lost must have outweighed the higher price, so demand is ELASTIC (|PED| > 1). If demand had been inelastic, revenue would have risen. You do not need the absolute volumes — the direction of the revenue change alone answers the question, which is why examiners like this format.",
      },
    },
    {
      id: "cost-behaviour",
      heading: "How costs behave in the short and long run",
      blocks: [
        {
          kind: "text",
          md: "The economist's distinction between short and long run is not about calendar time. It is about **what can be varied**.",
        },
        {
          kind: "definition",
          term: "Short run vs long run",
          md: "In the **short run** at least one factor of production is **fixed** — typically premises and plant — so output can only be varied by adding more of the variable factors. In the **long run** **all** factors can be varied, including scale, location and technology.",
        },
        {
          kind: "table",
          caption: "The short run — diminishing returns",
          head: ["Concept", "What happens"],
          rows: [
            ["Law of diminishing returns", "Adding more of a variable factor to a fixed factor eventually raises output by smaller and smaller amounts"],
            ["Why", "The fixed factor becomes the constraint — more staff share the same machines, the same floor space, the same supervisor"],
            ["Effect on cost", "Marginal cost rises once diminishing returns set in, pulling average cost up with it"],
          ],
        },
        {
          kind: "illustration",
          title: "Diminishing returns in one kitchen",
          md: "A restaurant kitchen with one oven serves 40 covers an hour with two chefs. A third chef takes it to 55, a fourth to 62, a fifth to 64 — and a sixth gets in everyone's way and it falls to 62.\n\nNothing is wrong with chef six. The **oven** is the fixed factor, and once it is saturated additional labour cannot produce proportionate output. In the long run the restaurant buys a second oven — which is the long run precisely because scale itself changed.",
        },
        {
          kind: "list",
          title: "The long run — economies and diseconomies of scale",
          items: [
            "**Technical** — larger, more specialised and more efficient plant becomes viable at higher volumes.",
            "**Purchasing** — bulk buying secures better prices and terms.",
            "**Financial** — larger firms borrow more cheaply and access capital markets.",
            "**Marketing** — advertising and brand spend is spread over far more units.",
            "**Managerial** — specialist functions (treasury, legal, HR) become affordable and are spread thinly per unit.",
            "**Risk-bearing** — a diversified product range or market spread absorbs shocks.",
            "**Diseconomies set in** when scale brings coordination failure, slow communication, bureaucracy, duplicated effort and weakened staff motivation — which is why average cost eventually turns back up.",
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "bars",
            title: "Long-run average cost as scale increases",
            caption: "Average cost per unit falls as economies of scale are captured, reaches a minimum efficient scale, then rises as diseconomies take over.",
            data: {
              unit: "$/unit",
              items: [
                { label: "10k units", value: 42 },
                { label: "50k units", value: 28 },
                { label: "150k units", value: 19 },
                { label: "400k units", value: 17 },
                { label: "800k units", value: 21 },
                { label: "1.5m units", value: 27 },
              ],
            },
          },
        },
      ],
    },
    {
      id: "market-structures",
      heading: "The four market structures",
      blocks: [
        {
          kind: "text",
          md: "How much freedom a business has to set its own price depends on the **structure** of its market. The four structures form a spectrum from no pricing power at all to complete pricing power.",
        },
        {
          kind: "table",
          caption: "The four structures on the features that get examined",
          head: ["Structure", "Number of firms", "Product", "Barriers to entry", "Pricing power"],
          rows: [
            ["**Perfect competition**", "Very many, all small", "Identical (homogeneous)", "None", "None — the firm is a price TAKER"],
            ["**Monopolistic competition**", "Many", "Differentiated", "Low", "Some, through differentiation and branding"],
            ["**Oligopoly**", "Few, each large", "Identical or differentiated", "High", "Significant, but constrained by rivals' reactions"],
            ["**Monopoly**", "One", "Unique, no close substitute", "Very high or absolute", "Maximum — the firm is a price MAKER"],
          ],
        },
        {
          kind: "definition",
          term: "Perfect competition",
          md: "A theoretical market with **many** buyers and sellers, an **identical** product, **free** entry and exit, and **perfect information**. No individual firm can influence price, so each is a **price taker** and long-run profits are driven down to normal levels.",
        },
        {
          kind: "definition",
          term: "Oligopoly",
          md: "A market dominated by a **few** large firms, each big enough that its actions provoke a **reaction** from the others. This interdependence is the defining feature: pricing becomes a strategic game, prices are often **sticky**, and competition shifts toward branding, service and non-price features.",
        },
        {
          kind: "list",
          title: "Barriers to entry — what keeps competitors out",
          items: [
            "**Economies of scale** — an entrant starting small faces a higher unit cost than the incumbents.",
            "**Capital requirements** — the sheer sum needed to begin.",
            "**Legal barriers** — patents, licences, exclusive franchises, regulatory approval.",
            "**Control of supply or distribution** — owning the raw material source or the shelf space.",
            "**Brand and customer loyalty** — the cost of persuading customers to switch.",
            "**Switching costs** — contracts, retraining or integration that make leaving an incumbent expensive.",
          ],
        },
        {
          kind: "activity",
          title: "Activity 6 — classify four markets",
          prompt:
            "Classify each and give the single feature that decides it.\n\n(a) Four supermarket chains hold 88% of national grocery sales and monitor each other's prices weekly.\n(b) Several hundred independent hairdressers in one city, each with its own style, location and regulars.\n(c) The only company licensed to distribute drinking water in a region, with the licence held for 25 years.\n(d) Hundreds of farmers selling an identical grade of wheat at whatever the market price is that day.",
          answer:
            "**(a) Oligopoly.** The deciding feature is **interdependence**: with four firms holding 88% of the market, each is large enough that its pricing provokes a reaction, which is why they monitor each other weekly.\n\n**(b) Monopolistic competition.** Many firms, **differentiated** product (style, location, relationship), low barriers to entry. Each has a little pricing power over its own regulars but cannot behave like a monopolist.\n\n**(c) Monopoly.** One supplier with an **absolute legal barrier** to entry and no close substitute for the product.\n\n**(d) Perfect competition.** The deciding feature is a **homogeneous product** with many small sellers, so each farmer is a **price taker** — accepting the market price rather than setting one.\n\nNote how each answer turns on a single structural feature. In the exam, identify that feature first and the classification follows.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two frequent misreadings",
          md: "**A large firm is not automatically a monopoly.** Monopoly means *one* supplier with no close substitute. A big supermarket in an oligopoly is not a monopolist.\n\n**Monopolistic competition is not a type of monopoly.** Despite the name it means MANY firms with differentiated products — much closer to perfect competition than to monopoly.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Confusing a movement along a curve with a shift of the curve.",
      fix: "A change in the good's OWN price moves you along the curve. A change in anything else shifts the whole curve.",
    },
    {
      trap: "Treating a fall in an input cost as a change in demand.",
      fix: "Input costs act on SUPPLY. Cheaper inputs shift supply right; demand is unchanged because buyers' willingness to pay has not moved.",
    },
    {
      trap: "Reading |PED| < 1 as 'demand does not matter'.",
      fix: "Inelastic means demand responds proportionately LESS than price, so a price rise raises revenue. It still falls — just by less than the price rose.",
    },
    {
      trap: "Assuming revenue and profit move together after a price change.",
      fix: "Revenue is price × volume. Selling less volume also cuts variable cost, so the profit effect can differ in size and occasionally in direction.",
    },
    {
      trap: "Thinking monopolistic competition is a form of monopoly.",
      fix: "It means MANY firms selling differentiated products with low barriers — nearer to perfect competition than to monopoly.",
    },
    {
      trap: "Treating short run and long run as fixed periods of time.",
      fix: "The short run is any period in which at least one factor is fixed. The long run is when everything, including scale, can be varied.",
    },
  ],
  keyTerms: [
    { term: "Demand", def: "The quantity buyers are willing and able to purchase at a given price over a given period." },
    { term: "Supply", def: "The quantity producers are willing and able to offer for sale at a given price over a given period." },
    { term: "Equilibrium price", def: "The price at which quantity demanded equals quantity supplied, so the market clears." },
    { term: "Price elasticity of demand", def: "The percentage change in quantity demanded divided by the percentage change in price." },
    { term: "Substitute goods", def: "Alternatives satisfying the same need, where a rise in one's price raises demand for the other." },
    { term: "Complementary goods", def: "Goods consumed together, where a rise in one's price reduces demand for the other." },
    { term: "Law of diminishing returns", def: "Adding more of a variable factor to a fixed factor eventually produces smaller and smaller increases in output." },
    { term: "Economies of scale", def: "Reductions in average cost per unit achieved as the scale of production increases." },
    { term: "Price taker", def: "A firm with no power to influence market price, which must accept the prevailing price — the position of every firm in perfect competition." },
    { term: "Oligopoly", def: "A market dominated by a few large interdependent firms, where each one's actions provoke reactions from the others." },
  ],
  summary: [
    "Demand falls and supply rises as price rises; equilibrium is where the two are equal and the market clears.",
    "A change in the good's own price moves along the curve; a change in anything else shifts it.",
    "PED is the percentage change in quantity over the percentage change in price. Elastic demand means a price rise cuts revenue; inelastic means it raises revenue.",
    "Substitutes move in the same direction as each other's prices; complements move in the opposite direction.",
    "In the short run a fixed factor produces diminishing returns; in the long run scale can change, giving economies and eventually diseconomies of scale.",
    "The four market structures run from perfect competition (price taker, no barriers) to monopoly (price maker, absolute barriers), with monopolistic competition and oligopoly between.",
    "Oligopoly is defined by interdependence, which makes prices sticky and shifts competition toward non-price features.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between a shift in demand and a movement along the demand curve?", a: "A change in the good's own price causes a movement ALONG the curve. A change in any other factor — income, tastes, substitute prices, population — SHIFTS the whole curve." },
    { q: "How do you calculate price elasticity of demand, and what does the result mean?", a: "Percentage change in quantity demanded divided by percentage change in price. Above 1 in absolute terms is elastic (a price rise cuts revenue); below 1 is inelastic (a price rise raises revenue)." },
    { q: "What happens to demand for a complement when a good's price rises?", a: "It falls. Complements are consumed together, so dearer printers reduce demand for cartridges. For substitutes the opposite holds — demand rises." },
    { q: "Why do diminishing returns occur in the short run?", a: "Because at least one factor is fixed. Adding more of the variable factor eventually saturates the fixed one, so each additional unit of input adds less output." },
    { q: "What single feature defines an oligopoly?", a: "Interdependence — few enough large firms that each one's pricing and output decisions provoke reactions from the others, which is why prices tend to be sticky." },
  ],
  furtherStudy: [
    "Cost behaviour becomes the core of **MA (Management Accounting)**, where fixed, variable and stepped costs are quantified and used in break-even analysis.",
    "Pricing decisions and elasticity return in **PM (Performance Management)**, with the algebra of demand curves and profit-maximising price.",
  ],
}

/* ── Chapter 6 · A6, A7, A8 ────────────────────────────────────── */

export const BT_TREE_06: StudyChapter = {
  id: "BT-06",
  number: 6,
  paper: "BT",
  area: "A",
  title: "Social, technological and environmental factors",
  minutes: 16,
  syllabusRefs: ["A6(a)", "A6(b)", "A7(a)", "A7(b)", "A7(c)", "A8(a)", "A8(b)"],
  intro:
    "Three sets of external forces that reshape businesses slowly and then all at once: who the population is and what it values, what technology makes newly possible, and the environmental limits and expectations a business now has to answer for.",
  outcomes: [
    "Explain the medium- and long-term effects of social and demographic trends on an organisation",
    "Describe the impact of changes in the workforce and in social attitudes",
    "Explain how technology affects organisational structure, work and customer relationships",
    "Explain the effects of technology on the value chain and on how work is organised",
    "Explain how environmental and sustainability considerations affect an organisation and its stakeholders",
    "Place all six PESTEL factors in one framework",
  ],
  sections: [
    {
      id: "pestel-frame",
      heading: "Putting the six factors in one frame",
      blocks: [
        {
          kind: "text",
          md: "Chapters 3 to 6 have now covered every external force BT examines. **PESTEL** is the checklist that ensures you scan all six rather than the two that came to mind first.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "PESTEL — and where each factor is taught",
            caption: "A tool for ANALYSIS and forecasting, not for solving. It surfaces threats and opportunities arriving from outside the industry.",
            data: {
              items: [
                { title: "Political", sub: "Government policy, stability, trade and procurement — Chapter 3" },
                { title: "Economic", sub: "Growth, inflation, unemployment, interest and exchange rates — Chapter 4" },
                { title: "Social", sub: "Demographics, attitudes, lifestyles, working patterns — this chapter" },
                { title: "Technological", sub: "Automation, connectivity, data, disruption of the value chain — this chapter" },
                { title: "Environmental", sub: "Climate, resource limits, waste, sustainability expectations — this chapter" },
                { title: "Legal", sub: "Employment, data protection, health and safety, consumer law — Chapter 3" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two mistakes with PESTEL",
          md: "**It is not the competitive environment.** PESTEL scans the MACRO environment. Rivals, buyers, suppliers, entrants and substitutes are the INDUSTRY environment, and they belong to Porter's five forces (Chapter 7). Putting \"a new competitor\" under PESTEL loses the mark.\n\n**It analyses, it does not decide.** PESTEL produces a list of external factors. What the organisation should DO about them is strategy, and that comes afterwards.",
        },
      ],
    },
    {
      id: "social-demographic",
      heading: "Social and demographic factors",
      blocks: [
        {
          kind: "definition",
          term: "Demography",
          md: "The study of the **population** — its size, growth rate, age structure, geographic distribution, household composition and ethnic and social make-up. Demographic change is slow, highly predictable, and therefore the external factor a business has least excuse for being surprised by.",
        },
        {
          kind: "table",
          caption: "Trends and their consequences for organisations",
          head: ["Trend", "Effect on markets", "Effect on the organisation itself"],
          rows: [
            ["**Ageing population**", "Growth in healthcare, leisure, financial planning and retirement products; decline in products aimed at the young", "A greying workforce, pension cost pressure, loss of experience at retirement, need for phased retirement and knowledge transfer"],
            ["**Falling birth rates**", "Shrinking markets for children's goods and education", "A smaller pool of new entrants, so recruitment becomes more competitive"],
            ["**Migration and urbanisation**", "Shifts in where demand is located; growth in city-centre and convenience formats", "Access to a wider labour pool; need for language and cultural capability"],
            ["**Rising female labour participation**", "Growth in convenience products, childcare and time-saving services", "Demand for flexible hours, parental leave and equal-pay compliance"],
            ["**Higher educational attainment**", "More discerning, better-informed customers", "A more skilled applicant pool but higher expectations of development and autonomy"],
            ["**Changing household composition**", "Growth in single-occupancy housing, smaller pack sizes, rental over ownership", "Different customer segmentation and channel design"],
          ],
        },
        {
          kind: "list",
          title: "Changes in social attitudes that reach businesses directly",
          items: [
            "**Health consciousness** — reformulation, labelling, and the decline of some long-established products.",
            "**Ethical consumption** — customers who ask where a product came from and who made it, and who will pay more or boycott accordingly.",
            "**Work–life balance** — flexible, hybrid and remote working move from perk to expectation, which changes premises costs and management style.",
            "**Diversity and inclusion** — an expectation of employers, increasingly reported on and scrutinised by investors.",
            "**Distrust of institutions** — corporate statements are checked, and a gap between claim and conduct is punished quickly and publicly.",
          ],
        },
        {
          kind: "illustration",
          title: "One demographic fact, five business consequences",
          md: "The proportion of a country's population aged over 65 rises from 16% to 24% over twenty years. This is known **now** — the people concerned are already alive.\n\nFor a **pharmacy chain** it is demand growth. For a **children's clothing retailer** it is a shrinking market. For a **manufacturer** it is an experience cliff as skilled staff retire together. For a **pension provider** it is both an opportunity and a liability problem. For **government** it is a rising health and pension bill met by proportionally fewer taxpayers, which loops back into Chapter 4's fiscal policy.\n\nOne fact, five different strategic problems. This is why the examiner asks about a named organisation.",
        },
      ],
      check: {
        q: "An organisation identifies that a major competitor has just launched a rival product. Under which framework does this factor belong?",
        options: [
          "PESTEL, under 'Economic'",
          "PESTEL, under 'Social'",
          "Porter's five forces — it is part of the competitive, not the macro, environment",
          "PESTEL, under 'Technological', if the product uses new technology",
        ],
        correct: 2,
        explain:
          "A competitor's action belongs to the COMPETITIVE (industry) environment, analysed with Porter's five forces. PESTEL scans the MACRO environment — the broad forces acting on every firm in the economy, not the behaviour of named rivals. Filing a competitor under PESTEL is one of the most common framework errors in Area A.",
      },
    },
    {
      id: "technological",
      heading: "Technological factors",
      blocks: [
        {
          kind: "text",
          md: "Technology is the factor that changes fastest and reaches furthest: it alters what a business sells, how it makes it, how it is structured, and who it competes with.",
        },
        {
          kind: "list",
          title: "How technology changes the organisation",
          items: [
            "**Flatter structures.** Information that once had to be passed up and summarised is now available directly, so layers of middle management whose job was reporting become unnecessary (Chapter 8).",
            "**Wider spans of control.** A manager can supervise more people when monitoring and communication are automated.",
            "**Routine work automated.** Data entry, reconciliation, matching and basic checking move to software, shifting the human role toward judgement, exception handling and interpretation.",
            "**New skill requirements.** Data literacy and systems skills become baseline expectations, with continual retraining rather than one-off qualification.",
            "**Remote and distributed work.** Location decouples from employment, changing premises costs, recruitment reach and how performance is supervised.",
            "**New organisational forms.** Virtual, hollow and modular structures become viable because coordination across boundaries is cheap (Chapter 8).",
          ],
        },
        {
          kind: "table",
          caption: "Technology's effect on the customer relationship",
          head: ["Change", "Consequence"],
          rows: [
            ["Direct online channels", "Intermediaries can be bypassed — disintermediation — shortening the value chain"],
            ["Price transparency", "Customers compare instantly, which raises price elasticity and squeezes margins"],
            ["Data capture at every interaction", "Personalisation and better forecasting, but heavier data protection obligations (Chapter 3)"],
            ["Social media", "Reputation is built and destroyed publicly and fast; customer service becomes a visible activity"],
            ["Self-service", "Lower cost to serve, but service failures scale instantly to every customer at once"],
          ],
        },
        {
          kind: "definition",
          term: "Disintermediation",
          md: "The removal of **intermediaries** from a value chain, as technology lets a producer deal directly with the end customer. Travel agents, print classified advertising and high-street travel insurance are the standard examples.",
        },
        {
          kind: "activity",
          title: "Activity 7 — technology and the finance department",
          prompt:
            "A mid-sized manufacturer replaces manual purchase-invoice processing with software that reads invoices, matches them to purchase orders and goods received notes, and posts the ones that agree automatically.\n\nState two effects on the structure of the finance function and two on the nature of the remaining work.",
          answer:
            "**Two structural effects.** (1) Fewer transaction-processing roles are needed, so the function becomes **smaller and flatter** — the supervisory layer that existed to check clerks' work has less to check. (2) Remaining staff can be **centralised or shared** across sites, because the work no longer has to sit near the paper.\n\n**Two effects on the work.** (1) It shifts from **processing to exception handling** — the human deals only with the invoices that failed to match, which are by definition the difficult ones, so the average task becomes harder rather than easier. (2) It shifts toward **control and analysis**: someone must own the matching rules, monitor that the automation is working, and interpret the data it now makes available.\n\n**The point the examiner wants:** automation does not simply remove work, it **changes the skill profile** of the work that remains — upward. This is why Chapter 12 argues the finance function's value is moving from recording to advising.",
        },
      ],
    },
    {
      id: "environmental",
      heading: "Environmental and sustainability factors",
      blocks: [
        {
          kind: "text",
          md: "Environmental considerations reach a business through four distinct channels, and it is worth separating them because the response to each is different.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "Four channels by which environmental factors arrive",
            caption: "Regulation compels, cost incentivises, customers reward or punish, and investors price the risk.",
            data: {
              centre: "The organisation",
              nodes: [
                { label: "Regulation", sub: "emissions limits, waste and packaging rules, mandatory disclosure" },
                { label: "Cost", sub: "energy prices, carbon pricing, landfill and disposal charges, resource scarcity" },
                { label: "Customer and public expectation", sub: "purchasing decisions, boycotts, reputational risk" },
                { label: "Investor pressure", sub: "cost of capital, exclusion from funds, sustainability reporting demands" },
                { label: "Physical risk", sub: "flooding, drought, heat, supply chain disruption" },
                { label: "Employees", sub: "increasingly choose employers partly on environmental record" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Sustainability",
          md: "Meeting present needs **without compromising the ability of future generations to meet theirs**. In a business context it means operating so that the resources, ecosystems and social licence the organisation depends on are not depleted by its own activity.",
        },
        {
          kind: "definition",
          term: "Triple bottom line",
          md: "Reporting and managing performance against **three** measures rather than one: **profit** (economic), **people** (social) and **planet** (environmental). It is the practical expression of the argument that a single financial measure understates both the value created and the cost imposed.",
        },
        {
          kind: "table",
          caption: "The business case, honestly stated on both sides",
          head: ["Arguments for acting", "Genuine costs and tensions"],
          rows: [
            ["Cost savings from energy, materials and waste reduction", "Capital investment required up front, with payback over years"],
            ["Lower regulatory and litigation risk", "Compliance and measurement cost, especially for a smaller organisation"],
            ["Access to customers and contracts that require it", "Possible higher input prices for sustainable materials"],
            ["Cheaper capital and access to ESG-mandated investors", "Reporting burden and assurance cost"],
            ["Recruitment and retention advantage", "Short-term profit dilution, which conflicts with shareholders' immediate interests"],
            ["Long-term resilience of the supply chain", "Competitive disadvantage against rivals in jurisdictions that do not require it"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "How this connects to stakeholders",
          md: "Environmental questions are stakeholder-conflict questions in disguise. The **community** and **future generations** bear costs that do not appear in the accounts; **shareholders** may bear a near-term profit reduction. Chapter 2's Mendelow analysis is what tells you how the organisation is likely to behave — and Chapter 11 explains why governance codes now force the long-term view to be represented at board level.",
        },
        {
          kind: "illustration",
          title: "Where 'greenwashing' becomes an ethics problem",
          md: "A packaging manufacturer's marketing describes its main product line as \"100% recyclable\". Technically true — but only at facilities that exist in three cities, and 94% of the volume is sold in regions with no such facility.\n\nThe statement is not false, and it is not honest either. That is precisely the territory Chapter 26 calls an ethical dilemma: nothing illegal has occurred, professional integrity is nonetheless engaged, and an accountant asked to sign off the sustainability disclosure has a decision to make.",
        },
      ],
      check: {
        q: "Which of the following best describes the 'triple bottom line'?",
        options: [
          "Reporting profit under three different accounting standards",
          "Measuring performance against economic, social and environmental outcomes",
          "The three-year profit trend disclosed in the financial statements",
          "Splitting profit between shareholders, employees and the community",
        ],
        correct: 1,
        explain:
          "The triple bottom line measures and reports performance against THREE dimensions — profit (economic), people (social) and planet (environmental) — on the argument that a single financial figure understates both the value an organisation creates and the costs it imposes on others. It is a measurement and reporting concept, not a profit-distribution rule or an accounting-standards choice.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Filing competitors, buyers or suppliers under PESTEL.",
      fix: "Those are the COMPETITIVE environment and belong to Porter's five forces. PESTEL scans the macro environment only.",
    },
    {
      trap: "Using PESTEL to recommend actions.",
      fix: "PESTEL is an analytical scan. It identifies external factors; deciding what to do about them is a separate strategic step.",
    },
    {
      trap: "Treating demographic change as unpredictable.",
      fix: "It is the most forecastable external factor — the people in twenty years' age statistics are already alive. Businesses are rarely surprised by it, only unprepared.",
    },
    {
      trap: "Saying automation simply reduces the skill needed in a department.",
      fix: "It removes the routine work and leaves the exceptions and the control, so the skill profile of the remaining work usually rises.",
    },
    {
      trap: "Presenting sustainability as costless and obviously beneficial.",
      fix: "State both sides. There are real capital costs, reporting burdens and short-term profit tensions — the examiner rewards the balanced case.",
    },
    {
      trap: "Confusing the environmental 'E' in PESTEL with the economic 'E'.",
      fix: "Economic = growth, inflation, rates, employment. Environmental = climate, resources, waste, sustainability. Two different letters doing two different jobs.",
    },
  ],
  keyTerms: [
    { term: "PESTEL", def: "A framework for scanning the macro environment: Political, Economic, Social, Technological, Environmental and Legal factors." },
    { term: "Demography", def: "The study of a population's size, growth, age structure, distribution and composition." },
    { term: "Disintermediation", def: "The removal of intermediaries from a value chain as technology allows producers to deal directly with end customers." },
    { term: "Sustainability", def: "Meeting present needs without compromising the ability of future generations to meet theirs." },
    { term: "Triple bottom line", def: "Measuring and reporting performance against economic, social and environmental outcomes rather than profit alone." },
    { term: "Greenwashing", def: "Presenting an organisation's environmental credentials in a way that is technically defensible but creates a materially misleading impression." },
  ],
  summary: [
    "PESTEL scans the six macro-environmental factors; competitors and suppliers belong to the five forces instead.",
    "Demographic change is slow and highly predictable, and reshapes both markets and the workforce.",
    "Social attitudes to health, ethics, work–life balance and inclusion now reach businesses as customer and employee expectations.",
    "Technology flattens structures, widens spans of control, automates routine work and raises the skill profile of what remains.",
    "Technology also disintermediates value chains and makes prices transparent, which raises elasticity and squeezes margins.",
    "Environmental factors arrive through regulation, cost, customer expectation, investor pressure and physical risk.",
    "Sustainability and the triple bottom line have a real business case and real costs — the balanced argument is what earns marks.",
  ],
  knowledgeDiagnostic: [
    { q: "What do the six letters of PESTEL stand for, and what does the framework do?", a: "Political, Economic, Social, Technological, Environmental, Legal. It scans the MACRO environment to surface external threats and opportunities. It does not analyse competitors and it does not decide strategy." },
    { q: "Why is demographic change strategically important?", a: "Because it is slow, highly predictable and reshapes both the markets an organisation sells to and the workforce it recruits from — so failing to plan for it is a failure of management, not of forecasting." },
    { q: "Name three ways technology changes organisational structure.", a: "It flattens hierarchies by removing reporting layers, widens spans of control through automated monitoring, and makes virtual, hollow and modular forms viable by making cross-boundary coordination cheap." },
    { q: "What is disintermediation?", a: "The removal of intermediaries from a value chain when technology lets a producer deal directly with the end customer — as happened to travel agents and print classified advertising." },
    { q: "What are the four channels by which environmental factors reach a business?", a: "Regulation (which compels), cost (which incentivises), customer and public expectation (which rewards or punishes), and investor pressure (which prices the risk). Physical climate risk and employee expectations act alongside these." },
  ],
  furtherStudy: [
    "PESTEL and stakeholder analysis are core **SBL** tools, applied there to a full pre-seen case.",
    "Sustainability reporting and assurance are examined in **SBR** and **AAA**; the ethics of environmental claims return in Chapter 26.",
  ],
}

/* ── Chapter 7 · A9 ────────────────────────────────────────────── */

export const BT_TREE_07: StudyChapter = {
  id: "BT-07",
  number: 7,
  paper: "BT",
  area: "A",
  title: "Competitive factors",
  minutes: 16,
  syllabusRefs: ["A9(a)", "A9(b)", "A9(c)", "A9(d)"],
  intro:
    "PESTEL told you about the weather. This chapter is about the other people in the market: how attractive an industry is, where a business's own advantage comes from, and how to find the activities that actually create it.",
  outcomes: [
    "Explain the importance of the competitive environment and how it differs from the macro environment",
    "Apply Porter's five forces to assess the attractiveness of an industry",
    "Explain Porter's generic strategies and the danger of being stuck in the middle",
    "Explain the value chain and the value network, and use them to locate competitive advantage",
    "Distinguish an organisation's strengths from its sources of sustainable advantage",
  ],
  sections: [
    {
      id: "why-competitive-environment",
      heading: "The competitive environment, and why it is separate",
      blocks: [
        {
          kind: "text",
          md: "Two organisations facing identical macro conditions can have very different prospects, because they compete in different industries — and within one industry, firms with the same conditions still perform differently. That is the two questions this chapter answers.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two levels of environment, two different tools",
            caption: "Confusing the levels is the most common analytical error in Area A.",
            data: {
              leftTitle: "Macro environment",
              rightTitle: "Competitive (industry) environment",
              rows: [
                { aspect: "What it contains", left: "Political, economic, social, technological, environmental, legal forces", right: "Rivals, buyers, suppliers, new entrants, substitutes" },
                { aspect: "Who it affects", left: "Every firm in the economy, though not equally", right: "Every firm in this industry" },
                { aspect: "Tool", left: "PESTEL", right: "Porter's five forces" },
                { aspect: "Question it answers", left: "What is changing around us?", right: "How attractive is this industry, and why?" },
              ],
            },
          },
        },
      ],
    },
    {
      id: "five-forces",
      heading: "Porter's five forces",
      blocks: [
        {
          kind: "text",
          md: "The five forces model explains **industry profitability**: the stronger the forces, the more of the industry's value is taken by someone other than the firms in it, and the lower the profits available.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "The five forces determining industry attractiveness",
            caption: "Competitive rivalry sits at the centre; the other four forces intensify or relieve it.",
            data: {
              centre: "Competitive rivalry",
              nodes: [
                { label: "Threat of new entrants", sub: "held back by barriers to entry — scale, capital, brands, patents, licences" },
                { label: "Bargaining power of buyers", sub: "high when buyers are few, large, price-sensitive or can switch cheaply" },
                { label: "Bargaining power of suppliers", sub: "high when suppliers are few, their input is critical, or switching is costly" },
                { label: "Threat of substitutes", sub: "different products meeting the same need — video calls for air travel" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What makes each force strong",
          head: ["Force", "Strong when", "Effect on industry profit"],
          rows: [
            ["**Rivalry**", "Many similar-sized competitors, slow market growth, high fixed costs, undifferentiated product, high exit barriers", "Price competition erodes margins for everyone"],
            ["**New entrants**", "Barriers are low — little capital needed, no patents, no scale advantage, weak brands", "New capacity drives prices down; incumbents must spend to defend"],
            ["**Buyer power**", "Few large buyers, standardised product, low switching costs, buyers could integrate backwards", "Buyers extract price cuts and better terms"],
            ["**Supplier power**", "Few suppliers, unique or critical input, high switching cost, suppliers could integrate forwards", "Suppliers capture margin through input prices"],
            ["**Substitutes**", "Close alternatives exist, are improving, or are becoming cheaper", "Caps the price the industry can charge at all"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Substitutes are not competitors",
          md: "A **competitor** offers the *same* product; a **substitute** meets the same *need* with a *different* product. For a rail operator, another rail company is a rival — but coaches, cars, domestic flights and a video call that removes the trip entirely are **substitutes**. Candidates who list rivals under substitutes lose the mark, and they also miss the more dangerous threat, because substitutes tend to arrive from outside the industry where nobody was watching.",
        },
        {
          kind: "example",
          title: "Worked example — five forces for a high-street coffee chain",
          scenario:
            "Assess the attractiveness of the branded high-street coffee shop industry using the five forces, and conclude.",
          steps: [
            { label: "Threat of new entrants — HIGH", detail: "Capital requirements for a single site are modest, no patents protect the product, and leases are readily available. Brand and scale in purchasing give incumbents some protection, but independents open constantly." },
            { label: "Buyer power — LOW individually, HIGH collectively", detail: "No single customer matters, so no one can negotiate. But switching costs are almost nil and there is a rival forty metres away, so customers are highly price- and quality-sensitive in aggregate." },
            { label: "Supplier power — MODERATE", detail: "Green coffee is a traded commodity with volatile prices the chain cannot control, which is real supplier-side exposure. Against that, the chain buys in volume and can switch roasters, and labour is the larger cost." },
            { label: "Threat of substitutes — HIGH", detail: "Instant coffee at home, office machines, supermarket ready-to-drink, energy drinks, tea, and increasingly capable home espresso machines. All meet the same need differently, and all cap what the shop can charge." },
            { label: "Competitive rivalry — HIGH", detail: "Several large branded chains plus many independents, a broadly undifferentiated core product, and high fixed costs in rent and staff that push everyone to fill seats." },
          ],
          result:
            "Four forces strong and one moderate, so the industry is STRUCTURALLY UNATTRACTIVE — which matches reality: margins are thin and failures common. Note what the analysis then tells you strategically: with the core product hard to differentiate, competition moves to location, brand, speed, loyalty schemes and store experience, and scale in purchasing and property becomes the main defence. That is how a five-forces answer earns application marks rather than just listing forces.",
        },
      ],
      check: {
        q: "For a commercial airline operating short-haul routes, which of the following is a SUBSTITUTE rather than a competitor?",
        options: [
          "Another airline flying the same route",
          "A budget airline entering the route next season",
          "High-speed rail on the same city pair",
          "A codeshare partner selling seats on the same aircraft",
        ],
        correct: 2,
        explain:
          "High-speed rail meets the same NEED — getting between two cities — with a DIFFERENT product, which is the definition of a substitute. The other three options are all airlines offering the same product, so they are competitors (or in the codeshare case, a partner). Substitutes matter because they cap the price the whole industry can charge, and because they usually arrive from outside the industry where incumbents are not watching.",
      },
    },
    {
      id: "generic-strategies",
      heading: "Porter's generic strategies",
      blocks: [
        {
          kind: "text",
          md: "Having assessed the industry, a firm has to decide **how** it will compete. Porter argues there are only three coherent answers, built from two choices: compete on **cost** or on **differentiation**, across a **broad** market or a **narrow** one.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The three generic strategies",
            caption: "Each is internally consistent. Mixing them is the failure mode.",
            data: {
              items: [
                { title: "Cost leadership", sub: "Be the lowest-cost producer in a BROAD market. Compete on price or take a higher margin at the market price. Needs scale, efficiency and tight cost control." },
                { title: "Differentiation", sub: "Offer something the BROAD market values enough to pay a premium for — brand, quality, service, innovation, design." },
                { title: "Focus (niche)", sub: "Serve a NARROW segment, on either cost or differentiation, better than the broad players can. Depth in place of breadth." },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Stuck in the middle",
          md: "The position of a firm that pursues **no** generic strategy consistently: its costs are too high to win on price and its offer is not distinctive enough to command a premium. Porter's argument is that this is the **worst** position, and that it is usually reached by drifting rather than by choosing.",
        },
        {
          kind: "illustration",
          title: "How a retailer gets stuck in the middle",
          md: "A department store adds a discount range to fight the value retailers, while also cutting staff numbers to protect margin.\n\nThe discount range makes it cheaper than a premium store but still dearer than a discounter, whose scale it cannot match. The staff cuts remove the service that justified its prices in the first place. It now loses price-sensitive customers to the discounters and service-sensitive customers to the premium stores — worse off against both than before it acted.\n\nNothing here was an obviously bad decision in isolation. That is the point: firms rarely choose to be stuck in the middle, they arrive there one reasonable-looking compromise at a time.",
        },
        {
          kind: "activity",
          title: "Activity 8 — name the strategy",
          prompt:
            "Identify the generic strategy each is pursuing, and state the main risk to it.\n\n(a) An airline flying one aircraft type to secondary airports, with no seat allocation and charges for every extra.\n(b) A watchmaker producing 900 hand-finished pieces a year and advertising in three magazines.\n(c) A software firm selling only to veterinary practices, with features no general accounting package offers.",
          answer:
            "**(a) Cost leadership.** One aircraft type cuts maintenance, training and spares cost; secondary airports cut landing fees; unbundling shifts cost to those who choose it. **Main risk:** a rival achieving lower costs still, or a cost shock (fuel, landing fees) that cannot be passed on because the customer base was bought on price.\n\n**(b) Differentiation.** Hand finishing, scarcity and selective advertising build a premium the broad market recognises. **Main risk:** the premium depends on perceived exclusivity, which is destroyed by expanding volume — and the brand is vulnerable to any quality or reputational failure.\n\n**(c) Focus (differentiation focus).** A narrow segment served with features the broad packages do not offer. **Main risk:** the niche is small, so growth is capped, and a general provider could add veterinary features and attack it with far greater scale. Niche players also carry concentration risk — one segment, one economic exposure.\n\n**Note the pattern:** each strategy's risk is the mirror of its own logic. That is the analytical move the examiner is looking for.",
        },
      ],
    },
    {
      id: "value-chain",
      heading: "The value chain and the value network",
      blocks: [
        {
          kind: "text",
          md: "Competitive advantage does not sit in an organisation as a whole. It sits in **particular activities**. The value chain is the tool that finds them.",
        },
        {
          kind: "definition",
          term: "Value chain",
          md: "The set of linked activities through which an organisation creates value and delivers it to a customer. Porter splits them into **primary** activities, which directly create and deliver the product, and **support** activities, which enable the primary ones.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The five primary activities",
            caption: "Value is added along the chain; the margin is what the customer pays less what all the activities cost.",
            data: {
              steps: [
                { label: "Inbound logistics", sub: "receiving, storing and handling inputs" },
                { label: "Operations", sub: "converting inputs into the finished product or service" },
                { label: "Outbound logistics", sub: "storing and distributing to the customer" },
                { label: "Marketing & sales", sub: "making the offer known and persuading buyers" },
                { label: "Service", sub: "installation, support, warranty, maintenance" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "The four support activities",
          items: [
            "**Procurement** — how inputs are sourced and purchased, across the whole organisation rather than one department.",
            "**Technology development** — R&D, process improvement and systems, wherever they occur.",
            "**Human resource management** — recruiting, training, developing and rewarding people.",
            "**Firm infrastructure** — general management, planning, finance, legal and quality systems.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "What the tool is FOR",
          md: "Do not just draw the chain. Use it to ask three questions: **which activities create the value the customer actually pays for?**, **which are we better at than rivals?**, and **which could be improved, outsourced or eliminated?** The **linkages** between activities matter as much as the activities themselves — a design change (technology development) that cuts assembly time (operations) and warranty claims (service) creates value in three places at once.",
        },
        {
          kind: "definition",
          term: "Value network",
          md: "The wider system of value chains — the organisation's own, plus those of its suppliers, distributors, partners and customers. It matters because advantage is often created **between** organisations rather than inside one: a manufacturer's real edge may lie in how tightly its systems integrate with a key supplier's.",
        },
        {
          kind: "table",
          caption: "Chain and network compared",
          head: ["", "Value chain", "Value network"],
          rows: [
            ["Scope", "Activities inside one organisation", "Linked chains of several organisations"],
            ["Question", "Where inside us is value created?", "Where across the system is value created, and who captures it?"],
            ["Typical use", "Cost reduction, outsourcing decisions, locating internal advantage", "Partnership and alliance design, supply chain integration, platform strategy"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Strengths versus sustainable advantage",
          md: "Being good at something is not an advantage unless it is **valuable to the customer**, **rare among rivals**, and **hard to copy**. A well-run payroll function is a strength; it is not a competitive advantage, because every competitor can buy the same software. Test any claimed advantage against those three conditions before you assert it.",
        },
      ],
      check: {
        q: "In Porter's value chain, which of the following is a SUPPORT activity?",
        options: [
          "Outbound logistics",
          "Procurement",
          "Operations",
          "Marketing and sales",
        ],
        correct: 1,
        explain:
          "PROCUREMENT is one of the four support activities, alongside technology development, human resource management and firm infrastructure. The five PRIMARY activities are inbound logistics, operations, outbound logistics, marketing and sales, and service — the ones that directly create and deliver the product. Support activities enable the primary ones rather than touching the product themselves.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Listing rival firms under 'threat of substitutes'.",
      fix: "A competitor offers the same product; a substitute meets the same need with a different one. Rail is a substitute for short-haul flying, another airline is a competitor.",
    },
    {
      trap: "Using PESTEL for competitors or five forces for interest rates.",
      fix: "PESTEL is the macro environment. Five forces is the industry environment. Match the tool to the level.",
    },
    {
      trap: "Describing a firm as pursuing both cost leadership and differentiation across a broad market.",
      fix: "Porter's argument is that this is 'stuck in the middle' — too dear to win on price, too ordinary to earn a premium. Focus strategies combine narrowness with ONE basis of competition.",
    },
    {
      trap: "Drawing the value chain without using it.",
      fix: "The marks are in identifying which activities create customer value, which beat rivals, and which could be improved or outsourced — plus the linkages between them.",
    },
    {
      trap: "Calling any organisational strength a competitive advantage.",
      fix: "It must be valuable to the customer, rare among rivals and hard to imitate. An efficient payroll passes none of those tests.",
    },
    {
      trap: "Assessing buyer power as low just because customers are individuals.",
      fix: "Individually low, collectively high when switching costs are near zero. Say both — that is where the mark is.",
    },
  ],
  keyTerms: [
    { term: "Competitive environment", def: "The industry-level forces acting on a firm — rivals, buyers, suppliers, entrants and substitutes — as distinct from the macro environment." },
    { term: "Five forces", def: "Porter's model of industry attractiveness: competitive rivalry, threat of new entrants, buyer power, supplier power and threat of substitutes." },
    { term: "Substitute", def: "A different product that meets the same customer need, capping the price the industry can charge." },
    { term: "Cost leadership", def: "A generic strategy of being the lowest-cost producer serving a broad market." },
    { term: "Differentiation", def: "A generic strategy of offering something a broad market values enough to pay a premium for." },
    { term: "Focus strategy", def: "A generic strategy of serving a narrow segment, on cost or differentiation, better than broad-market players can." },
    { term: "Stuck in the middle", def: "A position with costs too high to compete on price and an offer too undistinctive to command a premium." },
    { term: "Value chain", def: "The linked primary and support activities through which an organisation creates and delivers value." },
    { term: "Value network", def: "The wider system of linked value chains across suppliers, partners, distributors and customers." },
  ],
  summary: [
    "The competitive environment is the industry level and is analysed with five forces; PESTEL handles the macro level.",
    "Five forces explain industry profitability: rivalry, new entrants, buyer power, supplier power and substitutes.",
    "A substitute meets the same need with a different product, and usually arrives from outside the industry.",
    "Porter's generic strategies are cost leadership, differentiation and focus; pursuing none consistently leaves a firm stuck in the middle.",
    "The value chain locates advantage in specific primary and support activities, and in the linkages between them.",
    "The value network extends the analysis across organisations, where much modern advantage is actually created.",
    "A strength becomes an advantage only if it is valuable to customers, rare among rivals and hard to imitate.",
  ],
  knowledgeDiagnostic: [
    { q: "What are Porter's five forces?", a: "Competitive rivalry at the centre, plus the threat of new entrants, the bargaining power of buyers, the bargaining power of suppliers, and the threat of substitutes." },
    { q: "How does a substitute differ from a competitor?", a: "A competitor offers the same product; a substitute meets the same customer need with a different product. Substitutes cap industry pricing and typically emerge from outside the industry." },
    { q: "What are the three generic strategies, and what is the fourth outcome?", a: "Cost leadership, differentiation and focus. The fourth outcome is being stuck in the middle — too expensive to win on price and too undifferentiated to earn a premium." },
    { q: "What are the five primary value chain activities?", a: "Inbound logistics, operations, outbound logistics, marketing and sales, and service. Support activities are procurement, technology development, HRM and firm infrastructure." },
    { q: "When does a strength become a sustainable competitive advantage?", a: "When it is valuable to the customer, rare among competitors, and difficult to imitate. Anything a rival can simply buy is a strength, not an advantage." },
  ],
  furtherStudy: [
    "Five forces, generic strategies and the value chain are all core **SBL** tools, where you apply them to a full case rather than identify them.",
    "Competitive positioning and its effect on pricing and performance measurement return in **PM** and **APM**.",
  ],
}

/* ── Area A chapter list, in reading order ─────────────────────── */

export const BT_TREE_AREA_A: StudyChapter[] = [
  BT_TREE_01,
  BT_TREE_02,
  BT_TREE_03,
  BT_TREE_04,
  BT_TREE_05,
  BT_TREE_06,
  BT_TREE_07,
]


