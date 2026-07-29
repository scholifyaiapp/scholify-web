import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area B — Business organisation structure, functions and governance.
 * Chapters 8–11 of the BT reading tree, mapped to syllabus groups B1–B5.
 *
 * Original Scholify teaching text throughout; only the public syllabus structure
 * is followed. See acca-study-bt-tree-a.ts for the tree's rationale.
 */

/* ── Chapter 8 · B1, B2 ────────────────────────────────────────── */

export const BT_TREE_08: StudyChapter = {
  id: "BT-08",
  number: 8,
  paper: "BT",
  area: "B",
  title: "Organisation structure and design",
  minutes: 18,
  syllabusRefs: ["B1(a)", "B1(b)", "B2(a)", "B2(b)", "B2(c)", "B2(d)", "B2(e)"],
  intro:
    "Structure is the answer to one question asked repeatedly: who decides what, and who reports to whom? Get it wrong and capable people produce poor results, because the organisation is fighting itself.",
  outcomes: [
    "Distinguish the formal from the informal organisation and explain how they interact",
    "Describe the main structural types and the circumstances each suits",
    "Explain span of control, scalar chain and the trade-off between tall and flat structures",
    "Explain centralisation and decentralisation and the arguments for each",
    "Describe the main business functions and how they relate",
    "Explain outsourcing, offshoring and shared service centres",
    "Apply Anthony's hierarchy of strategic, tactical and operational levels",
  ],
  sections: [
    {
      id: "formal-informal",
      heading: "The formal and the informal organisation",
      blocks: [
        {
          kind: "definition",
          term: "Formal organisation",
          md: "The structure **deliberately designed** by management — defined roles, reporting lines, authority, procedures and documented responsibilities. It is what an organisation chart shows.",
        },
        {
          kind: "definition",
          term: "Informal organisation",
          md: "The network of relationships, groupings and influence that develops **spontaneously** among people, based on friendship, shared interests, proximity or shared history. It appears on no chart, and it is often how work actually gets done.",
        },
        {
          kind: "table",
          caption: "The informal organisation cuts both ways",
          head: ["It helps by", "It harms by"],
          rows: [
            ["Moving information faster than formal channels ever could", "Spreading rumour and misinformation just as fast"],
            ["Getting cooperation across departmental boundaries", "Creating cliques that exclude people and hoard knowledge"],
            ["Filling the gaps procedures did not anticipate", "Bypassing controls that exist for a reason"],
            ["Satisfying social needs, which supports morale and retention", "Enforcing group norms that resist necessary change"],
            ["Surfacing problems management has not been told about", "Undermining an unpopular manager's authority"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The management conclusion",
          md: "The informal organisation cannot be abolished — it forms wherever people work together. A manager's job is to **understand and engage with it**: use its channels to communicate, recognise its influential members, and keep the formal system credible enough that people do not have to route around it.",
        },
        {
          kind: "illustration",
          title: "Where the real approval process lives",
          md: "A company's formal procedure routes capital requests through a committee that meets monthly. In practice everyone knows that a quiet conversation with the operations director beforehand determines the outcome, and that a request he has not seen will be deferred.\n\nThe committee is the formal organisation. The pre-conversation is the informal one. Note that the informal route is not corruption here — it is a sensible adaptation to a slow process. But it is also invisible to anyone new, undocumented, and dependent on one person, which is exactly how a control weakness forms.",
        },
      ],
      check: {
        q: "Which statement about the informal organisation is correct?",
        options: [
          "It should be eliminated because it undermines formal authority",
          "It exists in every organisation and managers should understand and engage with it",
          "It appears on the organisation chart alongside formal reporting lines",
          "It only forms in organisations with weak management",
        ],
        correct: 1,
        explain:
          "The informal organisation forms spontaneously wherever people work together, so it cannot be eliminated and its presence is not evidence of weak management. It carries real benefits — faster information flow, cross-boundary cooperation, satisfied social needs — alongside real risks such as rumour and bypassed controls. The management response is to understand and engage with it, not to deny it.",
      },
    },
    {
      id: "structural-types",
      heading: "The structural types and what each one suits",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The main structures",
            caption: "Each solves a coordination problem and creates a different one.",
            data: {
              items: [
                { title: "Entrepreneurial", sub: "Direct control by the founder, few or no layers. Fast decisions and flexibility, but capped by one person's capacity and highly dependent on them." },
                { title: "Functional", sub: "Grouped by specialism — production, sales, finance. Deep expertise and economies of scale, but weak accountability for any single product and slow cross-function coordination." },
                { title: "Divisional", sub: "Grouped by product, geography or customer type. Clear accountability and local responsiveness, but duplicated resources and possible divisional self-interest." },
                { title: "Matrix", sub: "Functional and project authority overlap, so staff have two bosses. Excellent for cross-disciplinary work; dual command creates conflict and slower decisions." },
                { title: "Boundaryless", sub: "Virtual, hollow or modular — work done through networks and partners rather than employees. Highly flexible and low fixed cost, but dependent on partners and hard to control." },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Choosing between them",
          head: ["Structure", "Suits an organisation that is…", "Main weakness to state"],
          rows: [
            ["Entrepreneurial", "Small, young, in a fast-moving market, with a capable founder", "Does not scale; a single point of failure"],
            ["Functional", "Single-product or narrow-range, in a stable market, where efficiency matters most", "Silos; nobody owns the customer or product end to end"],
            ["Divisional", "Diverse in products, markets or geographies, and large enough to bear duplication", "Duplicated costs; divisions optimise for themselves, not the group"],
            ["Matrix", "Project-based, needing several specialisms on each piece of work", "Two bosses means conflicting priorities and unclear accountability"],
            ["Boundaryless", "Reliant on flexibility and speed, willing to trade control for it", "Loss of control over quality, data and reputation; partner dependency"],
          ],
        },
        {
          kind: "definition",
          term: "The three boundaryless forms",
          md: "**Virtual** — a network of independent organisations acting as one for a purpose, held together by contracts and technology. **Hollow** — the organisation keeps only its core competence and buys in everything else. **Modular** — the product is broken into components made by different specialists and assembled to a common specification.",
        },
        {
          kind: "activity",
          title: "Activity 9 — recommend a structure",
          prompt:
            "A construction consultancy of 180 staff employs architects, structural engineers, quantity surveyors and project managers. Every commission needs several of these disciplines working together for six to thirty months, and clients want a single point of contact for their project.\n\nRecommend a structure, justify it, and state the main problem it will create.",
          answer:
            "**Recommend a matrix structure.** Staff belong permanently to a discipline (architecture, structural engineering, QS, project management) for professional development, supervision and technical standards, and are simultaneously assigned to project teams led by a project manager who owns the client relationship.\n\n**Justification.** Every commission needs several specialisms at once, which a purely functional structure coordinates badly — work would pass between departments with nobody accountable for the whole. A purely divisional structure organised by project would duplicate senior technical expertise across 180 staff and leave each discipline professionally isolated. The matrix gives the client the single point of contact they asked for while keeping technical depth intact.\n\n**The main problem it creates: dual authority.** Each professional reports to both a discipline head and one or more project managers, whose priorities will conflict when a project deadline collides with a technical standard or a training commitment. This produces stress on the individual, slower decisions, and the risk that whoever pushes hardest wins rather than whoever is right. Mitigation is explicit rules on which authority prevails on which type of decision, and an escalation route that is used rather than avoided.",
        },
      ],
    },
    {
      id: "span-and-chain",
      heading: "Span of control, scalar chain, tall and flat",
      blocks: [
        {
          kind: "definition",
          term: "Span of control",
          md: "The number of subordinates reporting **directly** to one manager.",
        },
        {
          kind: "definition",
          term: "Scalar chain",
          md: "The unbroken line of authority running from the top of the organisation to the bottom, through which authority is delegated and accountability flows back up.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The relationship you must be able to state",
          md: "For a given number of employees, span of control and the number of levels move in **opposite** directions. **Wide** spans → **few** levels → a **FLAT** structure. **Narrow** spans → **many** levels → a **TALL** structure. Reversing this is a guaranteed lost mark.",
        },
        {
          kind: "table",
          caption: "Tall versus flat",
          head: ["", "Tall (narrow spans)", "Flat (wide spans)"],
          rows: [
            ["Supervision", "Close — each manager has few reports", "Light — managers cannot watch everyone"],
            ["Communication up and down", "Slow, and distorted by each layer it passes through", "Fast and more accurate"],
            ["Management cost", "High — many managers", "Lower — fewer managers"],
            ["Promotion prospects", "Many rungs, so clear progression", "Few rungs, so progression must be sideways or by role enrichment"],
            ["Delegation and empowerment", "Limited — decisions escalate", "Necessary — staff must decide for themselves"],
            ["Suits", "Complex, high-risk or heavily regulated work needing close control", "Capable, experienced staff doing similar, well-understood work"],
          ],
        },
        {
          kind: "list",
          title: "What lets a span of control be wider",
          items: [
            "Subordinates are **experienced and capable**, needing little direction.",
            "The work is **similar and routine** across the team, so one decision covers many cases.",
            "The team is **physically together**, or connected by good systems.",
            "**Procedures are clear**, so most questions have documented answers.",
            "The manager has **few non-supervisory duties** competing for time.",
            "Information systems give the manager **visibility without asking** — the technology effect from Chapter 6.",
          ],
        },
        {
          kind: "example",
          title: "Worked example — flattening a structure",
          scenario:
            "A processing centre has 243 front-line staff. Currently every manager supervises 3 people. Management is considering widening the average span to 9. Calculate the number of layers and the number of managers under each design, and comment.",
          steps: [
            { label: "Current design — span of 3", detail: "243 staff ÷ 3 = 81 first-line managers. 81 ÷ 3 = 27 second-line. 27 ÷ 3 = 9. 9 ÷ 3 = 3. 3 ÷ 3 = 1. So five management layers above the front line." },
            { label: "Current management headcount", detail: "81 + 27 + 9 + 3 + 1 = 121 managers for 243 staff — roughly one manager for every two workers." },
            { label: "Proposed design — span of 9", detail: "243 ÷ 9 = 27 first-line. 27 ÷ 9 = 3 second-line. 3 ÷ 9 → 1 at the top. So three management layers." },
            { label: "Proposed management headcount", detail: "27 + 3 + 1 = 31 managers." },
            { label: "Compare", detail: "Layers fall from five to three; managers fall from 121 to 31, a reduction of 90 posts." },
          ],
          result:
            "Widening the span from 3 to 9 removes two layers and 90 management posts. The savings and the faster communication are real — but so are the costs the examiner expects you to name: supervision becomes much lighter, so staff must be capable of working with less direction; 90 people lose their roles, with the morale and redundancy consequences that follow; and promotion prospects narrow sharply, because there are far fewer rungs to climb. A flat structure only works if delegation genuinely follows.",
        },
      ],
      check: {
        q: "An organisation widens its average span of control. Holding total staff numbers constant, what happens to the structure?",
        options: [
          "It becomes taller, with more management layers",
          "It becomes flatter, with fewer management layers",
          "The number of layers is unaffected by span of control",
          "It becomes taller, but with fewer managers in total",
        ],
        correct: 1,
        explain:
          "Span of control and number of levels move in OPPOSITE directions for a fixed headcount. Each manager supervising more people means fewer managers are needed at each level, so fewer levels are required to span the organisation — it becomes FLATTER, with faster communication and lower management cost, at the price of lighter supervision and fewer promotion rungs.",
      },
    },
    {
      id: "centralisation",
      heading: "Centralisation and decentralisation",
      blocks: [
        {
          kind: "definition",
          term: "Centralisation and decentralisation",
          md: "**Centralisation** concentrates decision-making authority at the top of the organisation. **Decentralisation** pushes it down to those closer to the work. It is a spectrum, not a binary, and different decision types can sit at different points.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The arguments on each side",
            caption: "Neither is correct in general; the right answer depends on the decision and the context.",
            data: {
              leftTitle: "Centralise",
              rightTitle: "Decentralise",
              rows: [
                { aspect: "Consistency", left: "Decisions are uniform across the organisation", right: "Decisions fit local conditions" },
                { aspect: "Speed", left: "Slower — decisions travel up and back", right: "Faster — decided where the information is" },
                { aspect: "Cost", left: "Avoids duplicating expertise", right: "Duplicates some capability locally" },
                { aspect: "Control", left: "Tighter, easier to enforce policy", right: "Looser, needs strong reporting to compensate" },
                { aspect: "Development of managers", left: "Limited — juniors do not practise deciding", right: "Strong — real decisions build real capability" },
                { aspect: "Motivation", left: "Can feel disempowering", right: "Higher, through autonomy and ownership" },
                { aspect: "Best for", left: "Crises, brand-critical and legal matters, purchasing scale", right: "Fast-changing local markets, customer-facing judgement, diverse divisions" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to answer 'should this be centralised?'",
          md: "Split the decision types rather than the organisation. Almost every real business **centralises** treasury, tax, legal, brand and group policy while **decentralising** pricing discretion, local staffing and day-to-day service recovery. Naming which decisions go where is what earns the marks.",
        },
      ],
    },
    {
      id: "functions-and-levels",
      heading: "Business functions and Anthony's hierarchy",
      blocks: [
        {
          kind: "table",
          caption: "The main business functions and what each contributes",
          head: ["Function", "Core contribution"],
          rows: [
            ["Research and development", "Creates and improves products and processes"],
            ["Purchasing / procurement", "Secures inputs on the right cost, quality, timing and risk terms"],
            ["Production / operations", "Converts inputs into the product or service, to specification"],
            ["Marketing", "Identifies what customers want, and positions and prices the offer"],
            ["Sales", "Converts interest into orders and manages customer relationships"],
            ["Distribution / logistics", "Gets the product to the customer when promised"],
            ["Human resources", "Recruits, develops, rewards and retains people"],
            ["Finance", "Records, reports, controls, funds and advises on the numbers"],
            ["Administration and IT", "Provides the systems and infrastructure everything else runs on"],
          ],
        },
        {
          kind: "definition",
          term: "Anthony's hierarchy",
          md: "Three levels of decision-making: **strategic** (long-term direction, taken by senior management, using mainly external and summarised information), **tactical** (translating strategy into plans and resources, taken by middle management), and **operational** (day-to-day execution and control, taken by front-line management using detailed internal information).",
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "Anthony's three levels, and the information each needs",
            caption: "Information becomes more summarised, more external and less certain as you move up.",
            data: {
              levels: [
                { label: "Strategic", sub: "Which markets to enter, whether to acquire. Highly summarised, largely external, long horizon, high uncertainty." },
                { label: "Tactical", sub: "Annual budgets, departmental plans, staffing levels. Mixed internal and external, medium horizon." },
                { label: "Operational", sub: "Today's schedule, this order, this invoice. Highly detailed, internal, immediate, near-certain." },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Outsourcing, offshoring and shared services",
          md: "**Outsourcing** transfers an activity to an **external provider**. **Offshoring** moves it to **another country** — it may remain inside the group, so offshoring is not necessarily outsourcing. A **shared service centre** **centralises** an activity in one internal unit serving the whole organisation.",
        },
        {
          kind: "table",
          caption: "Outsourcing — the honest balance",
          head: ["Arguments for", "Arguments against"],
          rows: [
            ["Access to specialist skill and technology without buying it", "Loss of in-house capability, which is hard to rebuild"],
            ["Lower and more predictable cost; fixed cost becomes variable", "Provider's margin, plus contract management cost"],
            ["Frees management attention for the core business", "Reduced control over quality, timing and data security"],
            ["Provider absorbs some risk and investment", "Dependency, and weak bargaining power at renewal"],
            ["Scalability without recruitment", "Confidentiality and data protection exposure (Chapter 3)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distinction candidates lose marks on",
          md: "A bank moving its call centre to a subsidiary it owns in another country has **offshored** but has **not outsourced** — the activity is still inside the group. Outsourcing is about **who owns the activity**; offshoring is about **where it sits**. A shared service centre is neither: it is internal centralisation.",
        },
      ],
      check: {
        q: "A manufacturer closes its four regional payroll teams and creates a single internal payroll unit at head office serving all sites. What has it done?",
        options: [
          "Outsourced payroll",
          "Offshored payroll",
          "Created a shared service centre",
          "Decentralised payroll",
        ],
        correct: 2,
        explain:
          "The activity remains INSIDE the organisation but is now centralised in one unit serving the whole business — that is a SHARED SERVICE CENTRE. Outsourcing would mean an external provider taking it on; offshoring would mean moving it to another country; and consolidating four teams into one is the opposite of decentralisation.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a wider span of control makes an organisation taller.",
      fix: "Wider spans mean FEWER levels — a flatter structure. Narrow spans build tall structures.",
    },
    {
      trap: "Treating the informal organisation as purely harmful.",
      fix: "It speeds information, secures cooperation and meets social needs, as well as spreading rumour and bypassing controls. State both sides.",
    },
    {
      trap: "Using 'offshoring' and 'outsourcing' as synonyms.",
      fix: "Outsourcing changes WHO owns the activity; offshoring changes WHERE it is done. An offshored captive subsidiary is not outsourced.",
    },
    {
      trap: "Recommending a matrix structure without naming the dual-authority problem.",
      fix: "Two bosses means conflicting priorities and blurred accountability. A recommendation without the drawback is half an answer.",
    },
    {
      trap: "Answering 'centralise or decentralise?' as an either/or for the whole organisation.",
      fix: "Split by decision type — treasury, tax, brand and group policy centralised; local pricing, staffing and service recovery decentralised.",
    },
    {
      trap: "Mixing up Anthony's levels with seniority alone.",
      fix: "The levels are defined by the DECISION and the information it needs: strategic is summarised, external and long-horizon; operational is detailed, internal and immediate.",
    },
  ],
  keyTerms: [
    { term: "Formal organisation", def: "The deliberately designed structure of roles, authority, reporting lines and procedures." },
    { term: "Informal organisation", def: "The spontaneous network of relationships and influence that develops among people, appearing on no chart." },
    { term: "Span of control", def: "The number of subordinates reporting directly to one manager." },
    { term: "Scalar chain", def: "The unbroken line of authority from the top of an organisation to the bottom." },
    { term: "Matrix structure", def: "A structure in which functional and project authority overlap, giving staff two reporting lines." },
    { term: "Centralisation", def: "The concentration of decision-making authority at the top of an organisation." },
    { term: "Outsourcing", def: "Transferring an activity to an external provider." },
    { term: "Offshoring", def: "Moving an activity to another country, whether or not it remains inside the group." },
    { term: "Shared service centre", def: "A single internal unit performing a support activity for the whole organisation." },
    { term: "Anthony's hierarchy", def: "The strategic, tactical and operational levels of decision-making, each needing different information." },
  ],
  summary: [
    "The formal organisation is designed; the informal one forms by itself and does both good and harm, so it must be engaged with rather than denied.",
    "Entrepreneurial, functional, divisional, matrix and boundaryless structures each solve one coordination problem and create another.",
    "Span of control and number of levels move in opposite directions: wide spans give flat structures, narrow spans give tall ones.",
    "Wider spans are possible with capable staff, routine similar work, clear procedures and good information systems.",
    "Centralisation gives consistency and control; decentralisation gives speed, local fit and manager development. Split the answer by decision type.",
    "Outsourcing changes who owns an activity, offshoring changes where it happens, and a shared service centre centralises it internally.",
    "Anthony's hierarchy separates strategic, tactical and operational decisions, and the information each level needs differs in detail, source and certainty.",
  ],
  knowledgeDiagnostic: [
    { q: "How do the formal and informal organisations differ?", a: "The formal organisation is deliberately designed — roles, authority, reporting lines, procedures. The informal organisation develops spontaneously from relationships and influence, and appears on no chart." },
    { q: "What happens to the number of management levels when spans of control widen?", a: "It falls. Each manager supervises more people, so fewer managers are needed per level and fewer levels are required — the structure flattens." },
    { q: "What is the main weakness of a matrix structure?", a: "Dual authority. Staff report to both a functional head and a project manager, whose priorities conflict, which slows decisions and blurs accountability." },
    { q: "What is the difference between outsourcing and offshoring?", a: "Outsourcing transfers an activity to an external provider — a change of ownership. Offshoring moves it to another country, which may keep it inside the group." },
    { q: "What are Anthony's three levels and how does their information differ?", a: "Strategic, tactical and operational. Moving up, information becomes more summarised, more external, longer-horizon and less certain; moving down it becomes detailed, internal, immediate and near-certain." },
  ],
  furtherStudy: [
    "Structure and its fit with strategy is a major **SBL** theme; divisional performance measurement is examined in **PM** and **APM**.",
    "The outsourcing decision returns as a quantitative make-or-buy question in **PM**.",
  ],
}

/* ── Chapter 9 · B3 ────────────────────────────────────────────── */

export const BT_TREE_09: StudyChapter = {
  id: "BT-09",
  number: 9,
  paper: "BT",
  area: "B",
  title: "Organisational culture",
  minutes: 15,
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)"],
  intro:
    "Culture is what people do when no procedure tells them to. Two organisations can have identical structures and policies and behave completely differently, and this chapter is about why.",
  outcomes: [
    "Define organisational culture and identify the factors that shape it",
    "Explain the levels at which culture operates, from visible artefacts to underlying assumptions",
    "Apply Handy's four cultural types",
    "Explain Hofstede's cultural dimensions and their relevance to international operations",
    "Explain why culture matters to control, ethics and change",
  ],
  sections: [
    {
      id: "what-culture-is",
      heading: "What culture is, and where it comes from",
      blocks: [
        {
          kind: "definition",
          term: "Organisational culture",
          md: "The **shared** values, beliefs, norms and assumptions that shape how people in an organisation behave — often summarised as \"the way we do things around here\". It is learned, largely unwritten, and remarkably persistent.",
        },
        {
          kind: "list",
          title: "What shapes an organisation's culture",
          items: [
            "**The founder and early leaders** — their values get embedded and often outlive them by decades.",
            "**History and critical incidents** — how the organisation behaved in a past crisis becomes a story that teaches everyone what really matters.",
            "**The nature of the work and the technology** — an airline's safety culture and a design studio's creative culture both follow from what the work demands.",
            "**Size and structure** — a small firm can run on shared understanding; a large one needs written rules, which changes the culture.",
            "**National and regional culture** — the surrounding society's norms come in with every employee.",
            "**Reward and promotion** — the most powerful single influence, because it shows what the organisation actually values as opposed to what it says.",
            "**External environment** — regulation, competition and customer expectation all press on behaviour.",
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "The three levels of culture",
            caption: "Only the top level is visible. The bottom level is what actually drives behaviour, and it is the hardest to change.",
            data: {
              levels: [
                { label: "Artefacts and behaviour", sub: "Visible: dress, office layout, logos, rituals, language, how meetings run" },
                { label: "Espoused values", sub: "Stated: mission statements, codes of conduct, published values, what leaders say" },
                { label: "Basic underlying assumptions", sub: "Invisible and taken for granted: what is really rewarded, what risks are acceptable, whether bad news can be told upward" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "Where culture problems actually live",
          md: "The gap between **espoused values** and **underlying assumptions** is where nearly every cultural failure sits. A company whose poster says \"speak up\" but whose last three people to raise a concern were sidelined has a stated value and a contradictory assumption. Staff learn the assumption, not the poster — which is why Chapter 16 treats a blame culture as a fraud risk factor and Chapter 25 treats it as a communication barrier.",
        },
        {
          kind: "illustration",
          title: "One promotion teaches more than a year of training",
          md: "A firm launches a quality programme, trains everyone, and displays \"quality first\" in every corridor. Six months later it promotes the manager with the worst defect rate and the best delivery figures.\n\nNothing else needed to be said. Every employee now knows that the espoused value is quality and the underlying assumption is volume. Culture is transmitted far more effectively by what gets rewarded than by what gets stated.",
        },
      ],
      check: {
        q: "In the three levels of culture, which level most strongly determines how employees actually behave?",
        options: [
          "Artefacts, because they are what everyone can see",
          "Espoused values, because they are formally communicated",
          "Basic underlying assumptions, because they are what people genuinely take for granted",
          "All three levels influence behaviour equally",
        ],
        correct: 2,
        explain:
          "BASIC UNDERLYING ASSUMPTIONS drive behaviour, because they are the beliefs people hold without questioning them — including what is genuinely rewarded and whether bad news can safely be reported upward. Artefacts are only visible symbols, and espoused values are what the organisation SAYS. Where espoused values and underlying assumptions conflict, behaviour follows the assumptions every time.",
      },
    },
    {
      id: "handy",
      heading: "Handy's four cultural types",
      blocks: [
        {
          kind: "text",
          md: "Handy classifies cultures by **where power sits** and **how work is coordinated**. Each type is associated with a structure and suits particular conditions.",
        },
        {
          kind: "table",
          caption: "Handy's four types",
          head: ["Type", "Power sits with", "Typical structure", "Suits", "Fails when"],
          rows: [
            ["**Power** (Zeus)", "One central figure or small group", "Web — spokes radiating from the centre", "Small, entrepreneurial organisations needing fast decisions", "It grows beyond the centre's capacity, or the centre is wrong"],
            ["**Role** (Apollo)", "Position and procedure, not personality", "Classical bureaucracy — a Greek temple on pillars", "Stable, predictable environments where consistency and control matter", "The environment changes faster than the procedures can"],
            ["**Task** (Athena)", "Expertise, assembled around the job", "Matrix or net", "Project work needing flexible cross-disciplinary teams", "Resources are scarce and teams start competing for them"],
            ["**Person** (Dionysus)", "The individual professional", "A cluster of independents sharing overheads", "Barristers' chambers, some partnerships, creative collectives", "The organisation needs coordinated collective action"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to identify the type from a scenario",
          md: "Ask **where authority comes from**. From a person? Power culture. From the rulebook and the job title? Role culture. From whoever knows most about this particular problem? Task culture. From the individual's own professional standing, with the organisation as little more than shared premises? Person culture.",
        },
        {
          kind: "activity",
          title: "Activity 10 — culture and the change problem",
          prompt:
            "A 40-year-old insurance company has detailed procedure manuals, strict authorisation limits, promotion strictly by grade and length of service, and a strong preference for precedent. It now faces digital competitors launching products in weeks rather than years.\n\nIdentify the culture, explain why it will struggle, and state two changes that would help.",
          answer:
            "**Culture: role culture (Apollo).** Authority derives from position and procedure rather than from personality or expertise; the detailed manuals, authorisation limits and service-based promotion are all classic markers.\n\n**Why it will struggle.** A role culture is built for **stability**: its strengths are consistency, control and predictability, delivered through rules that encode past experience. That is exactly wrong for an environment changing faster than procedures can be rewritten. Decisions escalate through authorisation levels; \"we have no precedent for that\" becomes a reason not to act; and the people who understand the new competition — usually junior and recent — have no authority because they have neither grade nor service. Note that the organisation is not badly run. It is well run for conditions that no longer exist.\n\n**Two changes that would help.** (1) Move product development into **task-culture** teams: small, cross-functional, assembled by expertise rather than grade, with real delegated authority to launch and iterate. This does not require converting the whole company, and the core underwriting and claims operations may legitimately stay a role culture. (2) Change **what gets rewarded** — promote on demonstrated capability and contribution rather than on grade and service. Because reward is the strongest transmitter of culture, this changes underlying assumptions in a way that no amount of training or restatement of values will.",
        },
      ],
    },
    {
      id: "hofstede",
      heading: "Hofstede's cultural dimensions",
      blocks: [
        {
          kind: "text",
          md: "Hofstede studied **national** cultural differences, and the dimensions matter to BT because an organisation operating across borders finds that the same management practice produces different results in different countries.",
        },
        {
          kind: "list",
          title: "The dimensions",
          items: [
            "**Power distance** — how far unequal distribution of power is accepted. High power distance accepts hierarchy and directive management; low power distance expects consultation and questions authority.",
            "**Individualism vs collectivism** — whether people see themselves primarily as individuals or as members of a group. Affects whether individual bonuses or team rewards motivate.",
            "**Masculinity vs femininity** — whether the culture emphasises competition, achievement and assertiveness, or cooperation, relationships and quality of life.",
            "**Uncertainty avoidance** — how uncomfortable people are with ambiguity. High avoidance wants detailed rules and clear structure; low avoidance tolerates improvisation.",
            "**Long-term vs short-term orientation** — whether persistence and future reward outrank immediate results and tradition.",
            "**Indulgence vs restraint** — how far gratification of desires is permitted rather than regulated by social norms.",
          ],
        },
        {
          kind: "table",
          caption: "Why it matters in practice",
          head: ["Management practice", "Works well where", "Backfires where"],
          rows: [
            ["Individual performance bonuses", "Individualist cultures", "Collectivist cultures — singling one person out can embarrass them and damage the team"],
            ["360-degree feedback including upward appraisal", "Low power distance", "High power distance — criticising a superior is socially unacceptable, so the data is empty"],
            ["Loose, principles-based procedures", "Low uncertainty avoidance", "High uncertainty avoidance — staff experience ambiguity as poor management"],
            ["Aggressive quarterly targets", "Short-term orientation", "Long-term orientation — reads as short-sighted and erodes trust"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The limitation to acknowledge",
          md: "Hofstede's dimensions describe **national averages** and say nothing reliable about any individual. Using them to predict how a specific colleague will behave is stereotyping, and it is a poor answer as well as a poor practice. The legitimate use is to explain why a **management system** designed in one country may need adapting in another.",
        },
      ],
    },
    {
      id: "why-culture-matters",
      heading: "Why culture matters to the rest of the syllabus",
      blocks: [
        {
          kind: "table",
          caption: "Culture reaches into almost every later chapter",
          head: ["Where it matters", "How"],
          rows: [
            ["Internal control (Ch 15)", "The 'control environment' IS culture. Perfect controls fail if senior managers visibly bypass them"],
            ["Fraud (Ch 16)", "A culture of unrealistic targets, autocratic management and no consequences supplies both pressure and rationalisation"],
            ["Governance (Ch 11)", "Codes require a board to set the 'tone at the top', which is an explicit instruction to manage culture"],
            ["Motivation (Ch 21)", "What motivates people depends on what the culture treats as valuable and legitimate"],
            ["Communication (Ch 24)", "Whether bad news travels upward is a cultural fact, not a systems one"],
            ["Ethics (Ch 25–26)", "A code of ethics is an espoused value; whether it is followed depends on underlying assumptions"],
            ["Change management", "Culture is the main source of resistance, because it encodes what has worked before"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The sentence to remember",
          md: "**Culture eats procedure.** Where a written control and an underlying assumption conflict, the assumption wins — which is why 'tone at the top' appears in every governance code and why the examiner treats a weak control environment as a serious finding rather than a soft one.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Describing culture as only the visible artefacts — dress code, office layout, logo.",
      fix: "Those are the top level. Espoused values sit below them and basic underlying assumptions below that, and the assumptions drive behaviour.",
    },
    {
      trap: "Mixing up Handy's role culture and power culture.",
      fix: "Power culture derives authority from a PERSON at the centre; role culture derives it from POSITION and PROCEDURE.",
    },
    {
      trap: "Calling a role culture simply bad.",
      fix: "It is highly effective in a stable, predictable environment where consistency and control matter. It fails only when the environment changes faster than its procedures.",
    },
    {
      trap: "Using Hofstede to predict an individual colleague's behaviour.",
      fix: "The dimensions are national averages. Their legitimate use is explaining why a management SYSTEM may need adapting between countries.",
    },
    {
      trap: "Assuming a published code of conduct means the culture is sound.",
      fix: "A code is an espoused value. Behaviour follows underlying assumptions, which are taught mainly by what gets rewarded and punished.",
    },
  ],
  keyTerms: [
    { term: "Organisational culture", def: "The shared values, beliefs, norms and assumptions that shape how people in an organisation behave." },
    { term: "Espoused values", def: "The values an organisation formally states, in its mission, code of conduct and leadership messages." },
    { term: "Basic underlying assumptions", def: "The unquestioned beliefs that actually drive behaviour, including what is genuinely rewarded and whether bad news can be reported." },
    { term: "Power culture", def: "Handy's type in which authority radiates from one central person or small group, structured as a web." },
    { term: "Role culture", def: "Handy's type in which authority derives from position and procedure, structured as a classical bureaucracy." },
    { term: "Task culture", def: "Handy's type in which authority derives from expertise, with teams assembled around the job — typically a matrix." },
    { term: "Person culture", def: "Handy's type in which the individual professional is paramount and the organisation exists to serve them." },
    { term: "Power distance", def: "Hofstede's dimension measuring how far a society accepts an unequal distribution of power." },
    { term: "Uncertainty avoidance", def: "Hofstede's dimension measuring how uncomfortable a society is with ambiguity and unstructured situations." },
    { term: "Tone at the top", def: "The culture and ethical example set by senior management, which governance codes make an explicit board responsibility." },
  ],
  summary: [
    "Culture is the shared values, norms and assumptions that determine behaviour when no procedure applies.",
    "It is shaped most powerfully by founders, critical incidents and — above all — by what gets rewarded and promoted.",
    "Culture operates at three levels: visible artefacts, espoused values, and basic underlying assumptions. The assumptions drive behaviour.",
    "Handy's four types are power, role, task and person, distinguished by where authority comes from.",
    "Hofstede's dimensions explain why a management practice designed in one country may need adapting in another; they describe national averages, not individuals.",
    "Culture is the control environment, the main fraud risk factor, the 'tone at the top' of governance codes and the principal source of resistance to change.",
  ],
  knowledgeDiagnostic: [
    { q: "What is organisational culture?", a: "The shared values, beliefs, norms and assumptions that shape behaviour — 'the way we do things around here'. It is learned, largely unwritten and persistent." },
    { q: "What are the three levels of culture?", a: "Visible artefacts and behaviour; espoused values that are formally stated; and basic underlying assumptions that are taken for granted. The assumptions determine actual behaviour." },
    { q: "What are Handy's four cultural types?", a: "Power (authority from a central person, a web), role (authority from position and procedure, a bureaucracy), task (authority from expertise, a matrix) and person (the individual professional is paramount)." },
    { q: "Name three of Hofstede's dimensions.", a: "Power distance, individualism versus collectivism, masculinity versus femininity, uncertainty avoidance, long- versus short-term orientation, and indulgence versus restraint." },
    { q: "Why does culture matter to internal control?", a: "Because the control environment IS culture. Controls that senior managers are seen to bypass will be bypassed generally, which is why governance codes make 'tone at the top' a board responsibility." },
  ],
  furtherStudy: [
    "Culture, leadership and change management are examined together in **SBL**, and culture as an audit risk factor in **AA** and **AAA**.",
    "The link from culture to fraud risk is developed in Chapter 16, and to the control environment in Chapter 15.",
  ],
}

/* ── Chapter 10 · B4 ───────────────────────────────────────────── */

export const BT_TREE_10: StudyChapter = {
  id: "BT-10",
  number: 10,
  paper: "BT",
  area: "B",
  title: "Committees in business organisations",
  minutes: 12,
  syllabusRefs: ["B4(a)", "B4(b)", "B4(c)"],
  intro:
    "Committees are how organisations make decisions that no single person should make alone. They are also, notoriously, how organisations avoid making decisions at all. This chapter is about which is which.",
  outcomes: [
    "Explain the purposes committees serve in an organisation",
    "Distinguish the main types of committee",
    "Explain the roles of chair and secretary",
    "State the advantages and the genuine disadvantages of committees",
    "Explain the terms used to run a committee properly",
  ],
  sections: [
    {
      id: "why-committees",
      heading: "What committees are for",
      blocks: [
        {
          kind: "definition",
          term: "Committee",
          md: "A **group** formally constituted to perform a task or take a decision **collectively**, drawing on more than one person's knowledge, authority or interest.",
        },
        {
          kind: "list",
          title: "The purposes a committee serves",
          items: [
            "**Pooling knowledge and skill** — bringing several specialisms to a decision no individual is competent to take alone.",
            "**Representing interests** — giving affected groups a voice, which improves both the decision and its acceptance.",
            "**Coordination** — aligning departments whose work interlocks.",
            "**Securing commitment** — people who helped make a decision are far more likely to implement it.",
            "**Independent scrutiny** — the audit and remuneration committee purpose: putting a decision beyond the reach of those with an interest in it.",
            "**Delaying or diffusing** — sometimes a legitimate need for more time, and sometimes an evasion of responsibility. The examiner expects you to name both readings.",
            "**Developing managers** — committee membership exposes juniors to wider decisions.",
          ],
        },
      ],
    },
    {
      id: "types",
      heading: "Types of committee",
      blocks: [
        {
          kind: "table",
          caption: "The types the syllabus expects",
          head: ["Type", "What it is"],
          rows: [
            ["**Executive**", "Has authority to ACT and to implement its decisions — a board committee with delegated power"],
            ["**Standing**", "Permanent, dealing with a recurring matter — a health and safety committee, an audit committee"],
            ["**Ad hoc**", "Formed for a single specific purpose and dissolved when finished"],
            ["**Sub-committee**", "Appointed by a larger committee to handle part of its work in more detail"],
            ["**Joint**", "Draws members from two or more bodies — a joint negotiating committee of management and union representatives"],
            ["**Advisory**", "Provides expert advice but has no authority to decide or act"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction that decides most questions",
          md: "An **executive** committee can **decide and act**. An **advisory** committee can only **recommend**. If a scenario says a committee \"reports its recommendations to the board\", it is advisory, whatever it is called.",
        },
      ],
      check: {
        q: "A company forms a group of managers to investigate a single warehouse fire, report its findings, and then disband. What type of committee is this?",
        options: [
          "A standing committee, because health and safety is a permanent concern",
          "An ad hoc committee, formed for one specific purpose",
          "An executive committee, because it consists of managers",
          "A joint committee, because several departments are represented",
        ],
        correct: 1,
        explain:
          "A committee formed for ONE specific purpose and dissolved when that purpose is complete is AD HOC. A standing committee would be permanent and deal with the recurring subject of health and safety generally. Being made up of managers does not make it executive — executive means it has authority to act — and joint means members are drawn from two or more separate bodies, such as management and a union.",
      },
    },
    {
      id: "roles",
      heading: "The chair and the secretary",
      blocks: [
        {
          kind: "table",
          caption: "Two roles, two very different jobs",
          head: ["Chair", "Secretary"],
          rows: [
            ["Ensures the committee keeps to its terms of reference", "Prepares and circulates the agenda in advance"],
            ["Sets and controls the agenda with the secretary", "Arranges the meeting and its papers"],
            ["Keeps discussion relevant and to time", "Takes and circulates the minutes"],
            ["Ensures every member is heard, not just the loudest", "Maintains records and follows up action points"],
            ["Draws the discussion to a conclusion and puts it to a vote", "Advises on procedure and quorum"],
            ["Has a casting vote where the constitution provides one", "Does not normally vote unless also a member"],
          ],
        },
        {
          kind: "definition",
          term: "The vocabulary of a properly run committee",
          md: "**Terms of reference** — the written statement of a committee's purpose, scope and authority. **Quorum** — the minimum number who must be present for business to be valid. **Agenda** — the ordered list of business, circulated in advance. **Minutes** — the formal record of what was decided. **Casting vote** — an additional vote for the chair to break a tie. **Co-opted member** — someone brought in for expertise without being elected. **Ex officio member** — someone who sits by virtue of holding another office.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Quorum matters more than candidates expect",
          md: "Business conducted **without a quorum is invalid**, however sensible the decision. This is a real control: it prevents two members who happen to be in the office deciding something that needed five. Expect a question in which a decision must be reconsidered purely because the meeting was not quorate.",
        },
      ],
    },
    {
      id: "pros-and-cons",
      heading: "The honest balance",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Committees weighed up",
            caption: "Both columns are examinable. An answer with only one is half an answer.",
            data: {
              leftTitle: "Advantages",
              rightTitle: "Disadvantages",
              rows: [
                { aspect: "Decision quality", left: "Pools knowledge and challenges assumptions", right: "Can converge on a compromise nobody thinks is best" },
                { aspect: "Speed", left: "Handles several viewpoints in one sitting", right: "Slow — meetings must be scheduled and reconvened" },
                { aspect: "Cost", left: "Cheaper than separate consultations", right: "Expensive in senior time; eight people for two hours is two days of salary" },
                { aspect: "Accountability", left: "Independent scrutiny where an individual would be conflicted", right: "Diffused — when everyone is responsible, nobody is" },
                { aspect: "Acceptance", left: "Those involved commit to the outcome", right: "Groupthink: dissent suppressed to preserve harmony" },
                { aspect: "Representation", left: "Affected interests get a voice", right: "A dominant member or the chair can control the outcome regardless" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Groupthink",
          md: "The tendency of a cohesive group to converge on a **consensus** at the expense of critical evaluation — suppressing doubts, discounting outside information and assuming unanimity. It is the specific risk that makes a comfortable, long-standing committee **worse** at decisions than a newly formed one.",
        },
        {
          kind: "activity",
          title: "Activity 11 — a committee that has stopped working",
          prompt:
            "A capital expenditure committee of nine members has approved 43 of the last 44 proposals. It has met monthly for six years with almost no change in membership, discussion is brief and amicable, and the finance director who prepares each proposal also chairs the meeting.\n\nIdentify three weaknesses and recommend a fix for each.",
          answer:
            "**Weakness 1 — the chair is conflicted.** The person preparing the proposals also controls the discussion of them, which removes the independent scrutiny that is a committee's main purpose. **Fix:** separate the roles — the finance director presents, someone independent chairs.\n\n**Weakness 2 — groupthink.** Six years of unchanged membership, brief amicable discussion and a 98% approval rate are the classic markers: doubts are not voiced, unanimity is assumed, and the committee has become a ratification step rather than a decision. **Fix:** rotate membership on a fixed cycle, and require someone to be tasked with arguing the case against each proposal so that challenge is a role rather than an act of disloyalty.\n\n**Weakness 3 — diffused accountability.** With nine members and near-unanimous approvals, no individual is answerable for a bad investment. **Fix:** record in the minutes who supported each decision and on what basis, and review outcomes against forecasts so the committee sees the consequences of its own approvals.\n\n**The broader point:** the committee has all the *costs* of a committee — nine people's senior time every month — and none of the *benefits*, because it no longer scrutinises anything. That is the worst of both columns.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Assuming any committee can decide and act.",
      fix: "Only an EXECUTIVE committee has that authority. An advisory committee recommends. If a scenario says it 'reports recommendations', it is advisory.",
    },
    {
      trap: "Listing only the advantages of committees.",
      fix: "Name the real costs too: slow, expensive in senior time, diffused accountability, and vulnerable to groupthink and to a dominant member.",
    },
    {
      trap: "Treating a decision taken without a quorum as valid because it was sensible.",
      fix: "Business without a quorum is invalid. The quorum is a control, and the decision must be retaken properly.",
    },
    {
      trap: "Confusing the chair's role with the secretary's.",
      fix: "The chair runs the discussion and concludes it. The secretary handles agenda, papers, minutes, records and procedural advice.",
    },
    {
      trap: "Describing groupthink as simply people agreeing.",
      fix: "It is the active SUPPRESSION of doubt to preserve group harmony, with outside information discounted and unanimity assumed. Long-standing cohesive committees are most at risk.",
    },
  ],
  keyTerms: [
    { term: "Committee", def: "A group formally constituted to perform a task or take a decision collectively." },
    { term: "Executive committee", def: "A committee with authority to decide and to act on its decisions." },
    { term: "Advisory committee", def: "A committee that provides expertise and recommendations but has no authority to decide." },
    { term: "Standing committee", def: "A permanent committee dealing with a recurring matter." },
    { term: "Ad hoc committee", def: "A committee formed for one specific purpose and dissolved once it is achieved." },
    { term: "Terms of reference", def: "The written statement of a committee's purpose, scope and authority." },
    { term: "Quorum", def: "The minimum number of members who must be present for a committee's business to be valid." },
    { term: "Casting vote", def: "An additional vote given to the chair to break a tie." },
    { term: "Ex officio member", def: "A member who sits on a committee by virtue of holding another office." },
    { term: "Groupthink", def: "A cohesive group's tendency to converge on consensus by suppressing doubt and discounting outside information." },
  ],
  summary: [
    "Committees pool knowledge, represent interests, coordinate, secure commitment and provide independent scrutiny.",
    "Types are executive, standing, ad hoc, sub-committee, joint and advisory; only executive committees can act.",
    "The chair runs and concludes the discussion; the secretary handles agenda, papers, minutes and procedure.",
    "Terms of reference, quorum, agenda, minutes and casting vote are the mechanics that make a committee valid — business without a quorum is void.",
    "Committees are slow, expensive in senior time and diffuse accountability, and they are vulnerable to groupthink and to domination by one member.",
    "A long-standing, cohesive, unchanging committee with a high approval rate is the classic picture of a committee that has stopped scrutinising anything.",
  ],
  knowledgeDiagnostic: [
    { q: "What purposes do committees serve?", a: "Pooling knowledge, representing interests, coordinating departments, securing commitment to decisions, providing independent scrutiny, developing managers — and sometimes, legitimately or not, buying time." },
    { q: "What is the difference between an executive and an advisory committee?", a: "An executive committee has authority to decide and act. An advisory committee can only provide expertise and recommendations." },
    { q: "What is a quorum, and what happens without one?", a: "The minimum number of members who must be present for business to be valid. Business conducted without a quorum is invalid and must be retaken, however sound the decision." },
    { q: "What are the main disadvantages of committees?", a: "They are slow, expensive in senior time, diffuse accountability so nobody is answerable, and are vulnerable to groupthink and to control by a dominant member or the chair." },
    { q: "What is groupthink?", a: "A cohesive group converging on consensus at the expense of critical evaluation — suppressing doubts, discounting outside information, and assuming unanimity." },
  ],
  furtherStudy: [
    "Board committees — audit, remuneration, nomination and risk — are the subject of Chapter 11 and are examined in depth in **SBL**.",
    "The audit committee's relationship with the external auditor is developed in **AA** and **AAA**.",
  ],
}

/* ── Chapter 11 · B5 ───────────────────────────────────────────── */

export const BT_TREE_11: StudyChapter = {
  id: "BT-11",
  number: 11,
  paper: "BT",
  area: "B",
  title: "Governance, social responsibility and sustainability",
  minutes: 18,
  syllabusRefs: ["B5(a)", "B5(b)", "B5(c)", "B5(d)", "B5(e)"],
  intro:
    "Chapter 1 separated ownership from control and Chapter 2 named the resulting agency problem. This chapter is the answer to it: the machinery by which the people who own a company hold the people who run it to account.",
  outcomes: [
    "Define corporate governance and explain why it is needed",
    "Explain the role and composition of the board, and the value of non-executive directors",
    "Explain the purpose of the audit, remuneration and nomination committees",
    "Explain directors' duties and the concept of stewardship",
    "Explain corporate social responsibility and the stakeholder view of the organisation",
    "Explain sustainable business practice and integrated reporting",
  ],
  sections: [
    {
      id: "what-governance-is",
      heading: "What corporate governance is, and why it exists",
      blocks: [
        {
          kind: "definition",
          term: "Corporate governance",
          md: "The **system by which an organisation is directed and controlled**, and by which those directing it are held **accountable**. It concerns the distribution of rights and responsibilities among the board, shareholders and other stakeholders, and the processes for taking and monitoring decisions.",
        },
        {
          kind: "text",
          md: "Governance exists because of the agency problem. Directors have better information than shareholders, different incentives, and control of the assets. Left unchecked that combination reliably produces empire-building, excessive risk, self-serving pay, and — at the extreme — the accounting scandals that produced most modern governance codes.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How the accountability chain is meant to work",
            caption: "Each link is a control. Governance failures are almost always a broken link, not an absent chain.",
            data: {
              steps: [
                { label: "Shareholders", sub: "own the company, appoint and can remove directors, vote at the AGM" },
                { label: "Board of directors", sub: "directs and controls; owes duties to the company" },
                { label: "Board committees", sub: "audit, remuneration, nomination — independent scrutiny of the areas the board cannot judge itself on" },
                { label: "Management", sub: "runs the business day to day under delegated authority" },
                { label: "Reporting and audit", sub: "financial statements, an external audit opinion, and governance disclosure back to shareholders" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Stewardship",
          md: "The principle that directors hold and manage **assets belonging to others** and must account for how they have used them. It is the idea that makes financial reporting a duty rather than a courtesy.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Comply or explain",
          md: "Most governance codes are **not law**. They operate on a **comply or explain** basis: a company either follows the provision or publicly states that it has not and why. The point is that departure must be **justified in the open**, so shareholders can judge it — a mechanism that treats transparency, rather than prohibition, as the discipline.",
        },
      ],
      check: {
        q: "A listed company does not have a separate remuneration committee, and its annual report explains why, given the board's small size and the shareholders' agreement. Under a 'comply or explain' code, has the company breached the code?",
        options: [
          "Yes — the provision is mandatory for all listed companies",
          "No — it has used the 'explain' route, which the code permits",
          "Yes, but only if shareholders object at the AGM",
          "The code does not apply because it is not law",
        ],
        correct: 1,
        explain:
          "A comply-or-explain code allows a company either to follow a provision OR to depart from it and publicly explain why. Disclosing the departure and its reasoning IS compliance with the code's mechanism — the discipline is transparency, letting shareholders judge, rather than prohibition. Note the code does apply: listed companies are typically required by listing rules to report against it, even though the code itself is not statute.",
      },
    },
    {
      id: "the-board",
      heading: "The board and its composition",
      blocks: [
        {
          kind: "table",
          caption: "Two kinds of director",
          head: ["", "Executive director", "Non-executive director (NED)"],
          rows: [
            ["Role", "Full-time manager of the business as well as a board member", "Board member only; no management responsibility"],
            ["Knowledge", "Deep operational knowledge", "Broader external perspective, often from other sectors"],
            ["Independence", "Limited — judging their own management", "The point of the role, provided they are genuinely independent"],
            ["Contributes", "Detail, feasibility, execution", "Challenge, scrutiny, experience, and credibility with shareholders"],
          ],
        },
        {
          kind: "list",
          title: "What non-executive directors are for",
          items: [
            "**Strategy** — contributing to it and constructively challenging it.",
            "**Scrutiny** — holding executive management to account for performance.",
            "**Risk** — forming their own view that the numbers can be relied on, and that the systems for managing risk and controlling the business actually work.",
            "**People** — determining executive pay, and appointing and where necessary removing executive directors.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The provisions codes almost always contain",
          md: "**Split the chair and chief executive roles.** One person holding both concentrates unchecked power at the top of the accountability chain. **Have a substantial proportion of independent NEDs** — commonly at least half the board excluding the chair. **Re-elect directors regularly.** **Disclose pay and how it is set.** **Establish audit, remuneration and nomination committees of independent NEDs.**",
        },
        {
          kind: "illustration",
          title: "Why splitting chair and chief executive is not a formality",
          md: "The chief executive runs the company. The chair runs the board that holds the chief executive to account, sets its agenda, and leads the discussion of the chief executive's performance and pay.\n\nGive both roles to one person and they set the agenda for their own appraisal, chair the discussion of their own remuneration, and decide how much information the board that oversees them receives. No individual failing is required for that to go wrong; the structure itself removes the check.",
        },
      ],
    },
    {
      id: "board-committees",
      heading: "The three board committees",
      blocks: [
        {
          kind: "table",
          caption: "What each committee is for, and why it must be independent",
          head: ["Committee", "Responsibilities", "Why independent NEDs"],
          rows: [
            ["**Audit**", "Monitors the integrity of financial statements; reviews internal control and risk management; oversees internal audit; recommends the appointment, fee and independence of the external auditor", "Management cannot credibly assess the reliability of its own reporting, nor be trusted to appoint the people who audit it"],
            ["**Remuneration**", "Sets the pay, incentives and contract terms of executive directors and senior management", "No one should set their own pay. This is the most direct agency conflict there is"],
            ["**Nomination**", "Reviews board composition and skills; leads the process for board appointments and succession planning", "Prevents a chief executive appointing a board of allies, and forces a systematic look at skills and diversity"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What the audit committee does NOT do",
          md: "It does not prepare the financial statements — management does. It does not perform the audit — the external auditor does. It does not manage internal audit's day-to-day work. Its job is **oversight**: satisfying itself that the others have done theirs, and providing internal audit and the external auditor with a route to the board that does not run through the management they may need to report on.",
        },
        {
          kind: "activity",
          title: "Activity 12 — diagnose the governance weaknesses",
          prompt:
            "Renwick plc has six directors. The founder is both chair and chief executive. There are two non-executive directors: the founder's brother-in-law, and a retired partner of the company's current external audit firm who left it eight months ago. There is one committee, the audit committee, whose three members are the finance director, the chief operating officer and the brother-in-law. Executive pay is set by the chair.\n\nIdentify four governance weaknesses and state the specific risk each creates.",
          answer:
            "**1 — Chair and chief executive are the same person.** Unchecked power at the top of the accountability chain: the founder sets the agenda for the board that oversees him and leads the discussion of his own performance.\n\n**2 — Neither NED is independent.** A brother-in-law has an obvious family connection; a retired partner of the *current* audit firm who left only eight months ago has a recent professional and financial connection to the auditor the committee is supposed to oversee. The board therefore has **no** independent challenge, so scrutiny of strategy, risk and reporting is nominal.\n\n**3 — The audit committee is composed mainly of executives.** The finance director prepares the financial statements the committee is meant to be assessing, and the COO is part of the management whose internal controls are under review. Management is reviewing itself, and internal audit and the external auditor have no route to the board that avoids the people they might need to report on.\n\n**4 — Executive pay is set by the chair, who is also the chief executive.** He is setting his own remuneration. This is the most direct agency conflict available, and there is no remuneration committee to prevent it.\n\n**Also creditable:** no nomination committee, so board appointments and succession rest with the founder; and no evident mechanism for shareholders to obtain independent assurance on any of it.",
        },
      ],
    },
    {
      id: "directors-duties",
      heading: "Directors' duties",
      blocks: [
        {
          kind: "list",
          title: "The duties a director typically owes",
          items: [
            "**To act within powers** — to use their authority for the purposes for which it was given, in accordance with the company's constitution.",
            "**To promote the success of the company** — for the benefit of its members as a whole, while having regard to employees, suppliers, customers, the community and the environment, and to the long term.",
            "**To exercise independent judgement** — not simply doing as told by a dominant colleague or a major shareholder.",
            "**To exercise reasonable care, skill and diligence** — measured against both a reasonably diligent person and the director's own actual knowledge and experience.",
            "**To avoid conflicts of interest** — and to declare any interest in a proposed transaction.",
            "**Not to accept benefits from third parties** given because of their directorship.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Where duties are owed — and the point candidates miss",
          md: "A director's duties are owed **to the company**, not to individual shareholders and not to any stakeholder personally. But 'promote the success of the company' expressly requires **regard to** employees, suppliers, customers, the community and the environment. So the law is neither purely shareholder-focused nor a general stakeholder duty: it is a shareholder-primacy duty with mandatory stakeholder consideration built in — which is the bridge to corporate social responsibility.",
        },
      ],
    },
    {
      id: "csr-and-sustainability",
      heading: "Corporate social responsibility and sustainability",
      blocks: [
        {
          kind: "definition",
          term: "Corporate social responsibility (CSR)",
          md: "The idea that an organisation has responsibilities to **society** beyond its legal obligations and its shareholders' financial interests — for its employees, its supply chain, its community and the environment.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two views of what a company is for",
            caption: "Both are defensible, and the examiner expects you to be able to argue either.",
            data: {
              leftTitle: "Shareholder view",
              rightTitle: "Stakeholder view",
              rows: [
                { aspect: "Purpose", left: "Maximise shareholder wealth within the law", right: "Balance the legitimate claims of all stakeholders" },
                { aspect: "Argument", left: "Directors spend other people's money; social choices belong to government and to shareholders individually", right: "The company uses society's resources and licence, so it owes society more than the legal minimum" },
                { aspect: "Risk if taken alone", left: "Externalises costs onto communities and the environment; invites regulation and reputational damage", right: "Diluted accountability — with everyone to answer to, no measure of success is decisive" },
                { aspect: "Where the law sits", left: "Duty is owed to the company for members as a whole", right: "…but with mandatory regard to employees, suppliers, customers, community and environment" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The business case for CSR, stated honestly",
          head: ["Genuine benefits", "Genuine costs and objections"],
          rows: [
            ["Reputation and brand strength, which supports pricing", "Direct cost, which reduces distributable profit"],
            ["Recruitment and retention, especially of younger staff", "Management attention diverted from the core business"],
            ["Lower regulatory and litigation risk", "Measurement, reporting and assurance costs"],
            ["Access to customers, contracts and investors that require it", "Competitive disadvantage against rivals who do not bear the cost"],
            ["Cost savings from energy, waste and materials efficiency", "Risk of it becoming presentational — greenwashing rather than substance"],
            ["Long-term resilience of the supply chain and social licence", "Directors making social value judgements they were not appointed to make"],
          ],
        },
        {
          kind: "definition",
          term: "Sustainable business practice",
          md: "Operating so that the resources, ecosystems, relationships and social licence the organisation depends on are **not depleted** by its own activity — so that the business remains viable in the long term as well as this year.",
        },
        {
          kind: "definition",
          term: "Integrated reporting",
          md: "Reporting that explains how an organisation creates value over time using **multiple capitals** — financial, manufactured, intellectual, human, social and relationship, and natural — rather than reporting financial performance alone. It is the reporting answer to the argument that a single profit figure understates both value created and cost imposed.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How CSR questions are marked",
          md: "The marks are for the **balanced** case applied to the organisation in front of you, not for enthusiasm. Name a specific benefit, name a specific cost, and say which stakeholders gain and lose — that is Chapter 2's analysis reused. \"CSR is good for business\" earns nothing.",
        },
      ],
      check: {
        q: "Which of the following best describes the purpose of the remuneration committee?",
        options: [
          "To set the pay of all employees across the organisation",
          "To set the pay and contract terms of executive directors and senior management",
          "To approve the external auditor's fee",
          "To review the integrity of the financial statements",
        ],
        correct: 1,
        explain:
          "The remuneration committee, composed of independent non-executive directors, sets the pay, incentives and contract terms of EXECUTIVE DIRECTORS and senior management — because nobody should set their own pay. General employee pay is a management matter, while the external auditor's fee and the integrity of the financial statements are both the AUDIT committee's responsibility.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying a company that departs from a governance code provision has breached the code.",
      fix: "Comply OR explain. A disclosed and justified departure uses the mechanism the code provides; the discipline is transparency, not prohibition.",
    },
    {
      trap: "Treating any non-executive director as independent.",
      fix: "Family ties, recent employment, a material business relationship or a connection to the auditor all destroy independence. A NED who is not independent cannot supply the challenge the role exists for.",
    },
    {
      trap: "Saying the audit committee prepares the financial statements or performs the audit.",
      fix: "Management prepares; the external auditor audits. The committee OVERSEES both, and gives auditors a route to the board that bypasses management.",
    },
    {
      trap: "Stating that directors' duties are owed to shareholders individually.",
      fix: "They are owed to the COMPANY, for the benefit of members as a whole, with mandatory regard to employees, suppliers, customers, community and environment.",
    },
    {
      trap: "Presenting CSR as costless and self-evidently correct.",
      fix: "Give both columns. There are real costs, measurement burdens, competitive disadvantages and a legitimate objection that directors are spending other people's money on their own value judgements.",
    },
    {
      trap: "Confusing the three committees' remits.",
      fix: "Audit = reporting integrity, internal control, the external auditor. Remuneration = executive pay. Nomination = board composition, appointments and succession.",
    },
  ],
  keyTerms: [
    { term: "Corporate governance", def: "The system by which an organisation is directed and controlled, and by which those directing it are held accountable." },
    { term: "Stewardship", def: "The principle that directors manage assets belonging to others and must account for how they have used them." },
    { term: "Comply or explain", def: "The mechanism by which a company either follows a governance code provision or publicly discloses and justifies its departure." },
    { term: "Non-executive director", def: "A board member with no management responsibility, appointed to contribute experience and provide independent challenge and scrutiny." },
    { term: "Audit committee", def: "A committee of independent NEDs overseeing the integrity of financial reporting, internal control, internal audit and the external auditor." },
    { term: "Remuneration committee", def: "A committee of independent NEDs that sets the pay and contract terms of executive directors and senior management." },
    { term: "Nomination committee", def: "A committee of independent NEDs that reviews board composition and leads appointments and succession planning." },
    { term: "Corporate social responsibility", def: "An organisation's responsibilities to society beyond its legal obligations and its shareholders' financial interests." },
    { term: "Sustainable business practice", def: "Operating without depleting the resources, ecosystems and social licence the organisation depends on." },
    { term: "Integrated reporting", def: "Reporting how an organisation creates value over time across financial, manufactured, intellectual, human, social and natural capitals." },
  ],
  summary: [
    "Corporate governance is the system for directing and controlling an organisation and holding its directors accountable — the answer to the agency problem.",
    "Governance codes usually operate on comply or explain, making transparency rather than prohibition the discipline.",
    "Independent non-executive directors supply challenge, scrutiny, risk oversight and control over appointments and pay; independence is the whole point of the role.",
    "The audit committee oversees reporting and auditors, the remuneration committee sets executive pay, and the nomination committee handles board composition and succession.",
    "Directors' duties are owed to the company, for members as a whole, with mandatory regard to employees, suppliers, customers, community and environment.",
    "The shareholder and stakeholder views are both defensible, and CSR answers need the costs as well as the benefits.",
    "Sustainable business practice and integrated reporting extend performance measurement beyond the single profit figure.",
  ],
  knowledgeDiagnostic: [
    { q: "What is corporate governance and why is it needed?", a: "The system by which an organisation is directed, controlled and held accountable. It is needed because separating ownership from control creates the agency problem — directors have better information, different incentives and control of the assets." },
    { q: "What does 'comply or explain' mean?", a: "A company either follows a governance code provision or departs from it and publicly discloses and justifies the departure, letting shareholders judge. Most codes are not statute." },
    { q: "What are the four roles of a non-executive director?", a: "Contributing to and challenging strategy; scrutinising management performance; satisfying themselves on financial information, risk and internal control; and determining executive pay and board appointments." },
    { q: "What are the three board committees and what does each do?", a: "Audit — reporting integrity, internal control, internal audit and the external auditor. Remuneration — executive pay and contract terms. Nomination — board composition, appointments and succession." },
    { q: "To whom are directors' duties owed?", a: "To the company, for the benefit of its members as a whole — but the duty to promote the company's success expressly requires regard to employees, suppliers, customers, the community and the environment, and to the long term." },
  ],
  furtherStudy: [
    "Governance is a major **SBL** topic, examined through a full case with the board's decisions to critique.",
    "The audit committee's relationship with the auditor is developed in **AA** and **AAA**; integrated and sustainability reporting in **SBR**.",
  ],
}

/* ── Area B chapter list, in reading order ─────────────────────── */

export const BT_TREE_AREA_B: StudyChapter[] = [
  BT_TREE_08,
  BT_TREE_09,
  BT_TREE_10,
  BT_TREE_11,
]
