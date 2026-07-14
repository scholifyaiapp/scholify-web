import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area A — Leadership & governance.
 * SBL is an integrated case-study exam: this chapter is pitched at applied,
 * evaluative depth and works every concept against an invented scenario, the
 * way the real exam demands. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const SBL_A: StudyChapter = {
  paper: "SBL",
  area: "A",
  title: "Leadership & governance",
  minutes: 17,
  intro: "A board does not run the business — it makes sure the business is run well, and in the right interests. Governance is the machinery that keeps power accountable; leadership is what makes that machinery move.",
  outcomes: [
    "Explain the agency problem and evaluate the governance mechanisms that address it",
    "Apply the OECD and UK Code principles, and judge when comply-or-explain is defensible",
    "Contrast unitary and two-tier boards and justify the split of chair and CEO",
    "Assess the roles of the board committees, NEDs and their independence in a scenario",
    "Map stakeholders with Mendelow and prescribe the right strategy for each quadrant",
    "Explain integrated reporting's six capitals and read an organisation's culture using Schein and Handy",
  ],
  sections: [
    {
      id: "agency",
      heading: "The agency problem — why governance exists",
      blocks: [
        { kind: "text", md: "In any company large enough to matter, the people who **own** it are not the people who **run** it. Thousands of shareholders own **Meridian Freight plc**; a handful of directors run it. The owners (the **principals**) hire the directors (their **agents**) to grow their wealth. This separation of ownership from control is efficient — but it is also the root of nearly every governance failure in the syllabus." },
        { kind: "text", md: "The problem is that agents have their **own** interests, and they know things the owners do not. This is **information asymmetry**: Meridian's CEO knows the real state of the order book; the shareholders see only what he chooses to disclose. Left unchecked, agents may pursue empire-building acquisitions, lavish perks, or short-term profit that flatters this year's bonus while quietly loading the company with risk. Every pound spent controlling this — monitoring by auditors, incentive schemes, the residual loss when interests still diverge — is an **agency cost** borne by the owners." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The agency relationship — and where it strains",
          caption: "Owners delegate control to agents, but cannot see everything the agents do.",
          data: {
            steps: [
              { label: "Shareholders", sub: "principals — provide capital" },
              { label: "Delegate control", sub: "appoint directors to act for them" },
              { label: "Directors", sub: "agents — run the business" },
              { label: "Information gap", sub: "agents know more than owners" },
              { label: "Governance", sub: "mechanisms to realign interests" },
            ],
          },
        } },
        { kind: "text", md: "**Corporate governance** is the system by which companies are directed and controlled. It is the set of relationships between the board, management, shareholders and other stakeholders that keeps this delegated power accountable. Good governance does not remove the agency problem — nothing does — but it narrows the gap: independent scrutiny, transparent reporting and aligned incentives make it far harder for agents to serve themselves at the owners' expense." },
        { kind: "callout", tone: "key", title: "The one idea", md: "Because owners cannot watch managers directly, governance builds the checks — independent directors, transparent reporting, aligned pay — that keep **agents acting in the principals' interests**." },
      ],
      check: {
        q: "Meridian's CEO pushes through a large acquisition that boosts his profile and this year's bonus but dilutes shareholder returns. Which concept BEST describes this?",
        options: [
          "Comply-or-explain failure",
          "An agency cost arising from misaligned interests",
          "A breach of the two-tier board structure",
          "Poor integrated reporting",
        ],
        correct: 1,
        explain: "The CEO (agent) is pursuing his own interest at the owners' expense — the classic agency problem. The lost value to shareholders is an agency cost. Governance mechanisms such as an independent board and performance-aligned pay exist precisely to curb this behaviour.",
      },
    },
    {
      id: "codes",
      heading: "Codes, principles and comply-or-explain",
      blocks: [
        { kind: "text", md: "Two reference points dominate the syllabus. The **OECD Principles of Corporate Governance** are the international benchmark that governments and regulators use to shape their own frameworks. They cover, among others: an effective governance framework; the **rights and equitable treatment of shareholders**; the role of **stakeholders**; **disclosure and transparency**; and the **responsibilities of the board**. They are principles for policymakers — a global template, not a rulebook for one company." },
        { kind: "text", md: "The **UK Corporate Governance Code** turns those ideas into practice for listed companies, organised around **board leadership and purpose**, **division of responsibilities**, **composition, succession and evaluation**, **audit, risk and internal control**, and **remuneration**. Its defining feature is how it is enforced: not by law, but by **comply-or-explain**." },
        { kind: "callout", tone: "rule", title: "Comply-or-explain", md: "A company must either **comply** with each provision of the Code, or **explain** — clearly and specifically — why departing from it is appropriate for its circumstances. The explanation must be genuine; \"we choose not to\" is not an explanation. Shareholders then judge whether the reasoning holds." },
        { kind: "text", md: "This is a **principles-based** approach, and it is worth contrasting with the **rules-based** model of the US **Sarbanes-Oxley Act**, where compliance is mandatory and breaches are illegal. Principles-based governance is flexible — a small company can explain why one combined committee suffices — but it relies on honest explanation and active shareholders to work. A tick-box culture where boilerplate \"explanations\" go unchallenged is how comply-or-explain quietly fails." },
        { kind: "callout", tone: "tip", md: "In a scenario, a departure from the Code is **not automatically wrong**. Ask: has the board given a **specific, reasoned** explanation, and is it credible for a company of this size and risk? If yes, comply-or-explain is working. If the \"explanation\" is vague or self-serving, that is the point to criticise." },
      ],
    },
    {
      id: "boards",
      heading: "Board structures — unitary vs two-tier",
      blocks: [
        { kind: "text", md: "How a board is built shapes how power is checked. In a **unitary** structure — the UK and US norm — executive directors (who manage) and non-executive directors (who scrutinise) sit on **one** board and share collective, legal responsibility for every decision. In a **two-tier** structure — the German norm — the two groups are separated into a **supervisory board** (non-executives, and in Germany employee representatives) that appoints and monitors a **management board** of executives who run the business day to day." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two ways to build a board",
          data: {
            leftTitle: "Unitary board (UK/US)",
            rightTitle: "Two-tier board (e.g. Germany)",
            rows: [
              { aspect: "Structure", left: "One board: executives + NEDs together", right: "Separate supervisory board over a management board" },
              { aspect: "Who monitors", left: "NEDs scrutinise from within the same board", right: "Supervisory board oversees from above" },
              { aspect: "Information flow", left: "Direct — all directors share the same table", right: "Indirect — supervisory board relies on reports up" },
              { aspect: "Employee voice", left: "Not built in", right: "Employee representatives sit on the supervisory board" },
              { aspect: "Speed vs distance", left: "Faster, but oversight is close to management", right: "Clearer independence, but slower and more removed" },
            ],
          },
        } },
        { kind: "text", md: "Whichever structure a company uses, one principle protects it above all others: **no single person should have unfettered power**. That is why the roles of **chair** and **chief executive** should be split. The **CEO runs the business**; the **chair runs the board** — setting its agenda, ensuring directors get good information, and leading the scrutiny of the CEO. Combining the two hands one individual control of both the executive and the body meant to hold the executive to account — the concentration of power that governance exists to prevent." },
        { kind: "example", title: "Applying it — a combined role", scenario: "At Meridian Freight, the founder is both chair and CEO. He sets the board's agenda, chairs the meetings that appraise his own performance, and controls what information reaches the NEDs. The board has never rejected a proposal he has brought. Evaluate the governance concern.", steps: [
          { label: "Identify the breach", detail: "Combining chair and CEO concentrates power in one person, contrary to the division-of-responsibilities principle." },
          { label: "Trace the consequence", detail: "He controls the board's agenda and information, and leads the appraisal of himself — NEDs cannot scrutinise effectively when the person being scrutinised runs the process." },
          { label: "Link to the agency problem", detail: "The very check meant to protect shareholders from a dominant agent has been captured by that agent — agency risk rises sharply." },
          { label: "Recommend", detail: "Split the roles: appoint an independent chair, and consider a senior independent director as a further channel for shareholder concerns." },
        ], result: "The combined role is a serious governance weakness: it removes the independent oversight of the executive that the split of chair and CEO is designed to guarantee." },
      ],
    },
    {
      id: "committees",
      heading: "The board's committees and the NEDs",
      blocks: [
        { kind: "text", md: "A board cannot examine everything in a full meeting, so it delegates the most sensitive, conflict-prone work to committees staffed by **independent non-executive directors (NEDs)**. Three are central to the syllabus, and each exists to remove a specific conflict of interest." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three core board committees",
          caption: "Each is composed mainly or wholly of independent NEDs — precisely because each handles a decision executives cannot judge for themselves.",
          data: {
            items: [
              { title: "Audit committee", sub: "Safeguards the integrity of financial reporting, internal controls, risk and the relationship with internal and external audit; oversees whistleblowing." },
              { title: "Remuneration committee", sub: "Sets executive directors' pay so no director sets their own, linking reward to long-term performance." },
              { title: "Nomination committee", sub: "Reviews board balance and skills, plans succession, and recommends new appointments on merit." },
            ],
          },
        } },
        { kind: "text", md: "The thread running through all three is the **NED**. Non-executives bring independent judgement, outside experience and, crucially, **distance from management**. They constructively challenge strategy, scrutinise executive performance, satisfy themselves on the integrity of financial information, and decide executive pay — the tasks executives cannot be trusted to do about themselves." },
        { kind: "callout", tone: "warn", title: "Independence is not a job title", md: "A NED is only useful if genuinely **independent** in character and judgement. Independence is compromised by: recent employment by the company, a **material business or financial relationship**, cross-directorships, a significant shareholding, close family ties to management, or serving on the board so long (typically **beyond nine years**) that objectivity fades. A NED who is the CEO's former mentor and golf partner is a NED in name only." },
        { kind: "text", md: "In a scenario, do not stop at counting NEDs. Ask whether they are **actually independent**, whether the committees are staffed by them, and whether any red flag — a long tenure, a supply contract, a family link — undermines the scrutiny the structure is supposed to deliver." },
      ],
      check: {
        q: "At Meridian, the remuneration committee includes an executive director who thereby helps set the pay of his fellow executives. Why is this a governance weakness?",
        options: [
          "Remuneration committees should be chaired by the CEO",
          "Executive directors would be setting pay for people whose interests they share, defeating the committee's purpose",
          "The committee should have exactly three members",
          "Pay decisions belong to the audit committee",
        ],
        correct: 1,
        explain: "The remuneration committee exists so that no executive influences their own or their colleagues' pay. Staffing it with an executive reintroduces the conflict of interest it was created to remove — it should be composed of independent NEDs.",
      },
    },
    {
      id: "leadership-stakeholders",
      heading: "Leadership and the stakeholders the board serves",
      blocks: [
        { kind: "text", md: "Governance sets the checks; **leadership** determines what happens inside them. The syllabus expects you to recognise the main lenses on leadership: **trait** theory (leaders are born with certain qualities), **style/behavioural** theory (leadership is a set of learnable behaviours, from autocratic to democratic), **contingency** theory (the best style depends on the situation), and the influential contrast between **transactional** leadership — motivating through rewards and correction for defined tasks — and **transformational** leadership, which inspires people toward a shared vision and change. The board's own leadership role is distinct: it sets purpose and strategy, monitors management, secures resources, and is accountable to shareholders." },
        { kind: "text", md: "But shareholders are not the only claim on the company. **Stakeholders** are any group that affects, or is affected by, the organisation — employees, customers, suppliers, lenders, regulators, communities. Each holds a **claim**, and those claims compete: a decision to close a loss-making depot rewards shareholders but harms employees and a local community. The board cannot satisfy everyone, so it must decide **whose claim carries most weight** — and **Mendelow's power-interest matrix** is the standard tool for doing so." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Mendelow's power-interest matrix — strategy per quadrant",
          caption: "Position each stakeholder by how much POWER they hold and how much INTEREST they take, then apply the matching strategy.",
          data: {
            leftTitle: "Low interest",
            rightTitle: "High interest",
            rows: [
              { aspect: "High power", left: "Keep satisfied — powerful but disengaged; keep them content so they don't intervene", right: "Key players — manage closely; involve in decisions and win their backing" },
              { aspect: "Low power", left: "Minimal effort — monitor at low cost", right: "Keep informed — little power but vocal; can lobby and sway others, so communicate" },
            ],
          },
        } },
        { kind: "text", md: "The strategy follows the position. A major **institutional shareholder** at Meridian — high power, and highly interested in a controversial merger — is a **key player** the board must engage directly. A financial **regulator** watching from a distance is **high power, low interest**: keep it satisfied, because it can act decisively if provoked. A vocal community **campaign group** with little formal power but intense interest is **keep informed** — ignore it and it lobbies the customers and regulators who do have power. And a stakeholder with neither power nor interest warrants only **minimal effort**." },
        { kind: "callout", tone: "tip", md: "The classic error is fixed labelling. A stakeholder's quadrant is **not permanent** — it shifts with the issue. A supplier is low power on most matters, but a **sole supplier** during a shortage suddenly becomes a key player. Always map against the **specific decision** in the scenario." },
      ],
      check: {
        q: "A national regulator has strong legal powers over Meridian but currently takes little day-to-day interest in its operations. Under Mendelow, how should the board treat it?",
        options: [
          "Minimal effort — it isn't paying attention",
          "Keep informed — it has high interest",
          "Keep satisfied — high power, low interest",
          "Key player — manage closely at all times",
        ],
        correct: 2,
        explain: "High power but low interest places the regulator in the 'keep satisfied' quadrant. It can act decisively if provoked, so the board keeps it content and unsurprised — without the intensive engagement reserved for the high-power, high-interest key players.",
      },
    },
    {
      id: "reporting-culture",
      heading: "Integrated reporting and organisational culture",
      blocks: [
        { kind: "text", md: "If governance is accountable to more than shareholders, reporting must show more than profit. **Integrated reporting (<IR>)** communicates how an organisation creates value **over time** — not just this year's earnings, but the full stock of resources it draws on and affects. It does this through the **six capitals**: a value-creation story is only complete when it shows what the business consumes and builds across all six." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The six capitals of <IR>",
          caption: "Integrated reporting tracks value creation across all six — not financial capital alone.",
          data: {
            items: [
              { title: "Financial capital", sub: "Funds available for producing goods or services — equity, debt, retained earnings." },
              { title: "Manufactured capital", sub: "Physical assets the organisation uses — buildings, plant, equipment, infrastructure." },
              { title: "Intellectual capital", sub: "Knowledge-based intangibles — patents, brands, systems, protocols." },
              { title: "Human capital", sub: "People's skills, experience, motivation and alignment with the organisation's values." },
              { title: "Social & relationship capital", sub: "Relationships and trust with communities, customers and stakeholders; the licence to operate." },
              { title: "Natural capital", sub: "Environmental resources — air, water, land, minerals, biodiversity — used or affected." },
            ],
          },
        } },
        { kind: "text", md: "Reporting on all six forces the board to confront trade-offs it could once hide: cutting maintenance flatters **financial** capital this year while eroding **manufactured** capital for the next; overworking staff lifts short-term output while depleting **human** capital. <IR> makes governance's long-term view visible." },
        { kind: "text", md: "Beneath structures and reports sits the hardest thing to govern: **culture** — \"the way we do things around here\". **Schein** describes it in three layers. **Artefacts** are what you can see: open-plan offices, dress code, the awards on the wall. **Espoused values** are what the organisation says it believes — the mission statement, the code of conduct. **Basic underlying assumptions** are the unspoken, taken-for-granted beliefs that really drive behaviour. Real culture lives in that deepest layer — which is why a company can display a proud ethics poster (an artefact) while its true assumption is that hitting targets excuses cutting corners." },
        { kind: "text", md: "**Handy** offers a complementary map of culture **types**. A **power** culture radiates from a central figure (a founder-dominated firm like Meridian under its combined chair-CEO). A **role** culture runs on rules, hierarchy and job descriptions (a bureaucracy or utility). A **task** culture forms around projects and expertise, valuing results over rank (a consultancy or agile team). A **person** culture exists to serve the individuals within it (a partnership of professionals). Naming the culture in a scenario explains **why** a governance reform will be resisted — a power culture will fight the independent scrutiny that a two-tier board or strong NEDs impose." },
        { kind: "callout", tone: "key", title: "Tie it together", md: "Governance sets the **checks**, leadership sets the **direction**, stakeholders define **whose interests** count, integrated reporting makes the **long view visible**, and culture decides whether any of it is **actually lived**. SBL rewards answers that connect these — not four disconnected definitions." },
      ],
    },
  ],
  examTraps: [
    { trap: "Treating a departure from the UK Code as automatically a breach.", fix: "Comply-or-explain permits departure — provided the board gives a specific, credible explanation. Attack the quality of the explanation, not the fact of departure." },
    { trap: "Counting NEDs and assuming the board is well governed.", fix: "Independence is about substance, not headcount. Check for long tenure, business ties, family links or share stakes that hollow out a NED's objectivity." },
    { trap: "Fixing a stakeholder in one Mendelow quadrant forever.", fix: "Power and interest shift with the specific decision. A sole supplier in a shortage jumps from low power to key player — always map against the scenario's issue." },
    { trap: "Confusing the 'keep satisfied' and 'keep informed' quadrants.", fix: "High power + low interest = keep satisfied. Low power + high interest = keep informed. The high-power group is the one you must never provoke." },
    { trap: "Listing the six capitals but ignoring the trade-offs between them.", fix: "The point of <IR> is that boosting one capital can deplete another. Marks come from showing how financial gains erode human or manufactured capital over time." },
  ],
  keyTerms: [
    { term: "Agency problem", def: "The conflict that arises when agents (directors) who run a company have interests and information that differ from the principals (shareholders) who own it." },
    { term: "Comply-or-explain", def: "The principles-based enforcement of the UK Code: a company either complies with each provision or gives a specific, reasoned explanation of why it does not." },
    { term: "Two-tier board", def: "A structure separating a supervisory board of non-executives (and employee reps) that appoints and monitors a management board of executives — contrasted with the unitary single board." },
    { term: "Non-executive director (NED)", def: "A director with no management role who brings independent judgement — monitoring executives, scrutinising strategy and staffing the board committees." },
    { term: "Mendelow's matrix", def: "A power-interest grid that classifies stakeholders into key players, keep satisfied, keep informed and minimal effort, prescribing an engagement strategy for each." },
    { term: "The six capitals", def: "Integrated reporting's resources for value creation over time: financial, manufactured, intellectual, human, social and relationship, and natural capital." },
  ],
  summary: [
    "Governance exists to solve the agency problem — keeping directors (agents) accountable to shareholders (principals) they inform imperfectly.",
    "The OECD principles guide policymakers; the UK Code applies them to companies through comply-or-explain, a principles-based alternative to rules-based regimes like SOX.",
    "Power must be checked: split chair and CEO, choose unitary or two-tier structures, and delegate conflict-prone work to audit, remuneration and nomination committees of independent NEDs.",
    "Boards serve many stakeholders — Mendelow's power-interest matrix decides whose claim to prioritise: manage key players closely, keep the powerful satisfied, keep the interested informed.",
    "Integrated reporting shows value across the six capitals, and culture (Schein's three layers, Handy's four types) determines whether governance is genuinely lived or merely displayed.",
  ],
}
