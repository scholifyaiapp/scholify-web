import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * BT · Section B multi-task questions (MTQs) — the real exam format.
 *
 * The BT exam's Section B is SIX multi-task questions worth FOUR marks each. Each
 * MTQ presents one short scenario and asks two to four linked tasks against it.
 *
 * There are 18 units here, which is exactly three disjoint sittings of six, so a
 * learner sitting all three mocks never meets the same MTQ twice.
 *
 * These replace 88 generated "cases" whose questions read "In review 7, situation
 * 2 at Grove Co, which syllabus concept should be applied?" — 1 mark each, four to
 * a unit, and not the format the real exam uses. Every scenario and task below is
 * authored.
 */

/** Build one linked task inside an MTQ. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  marks: 1 | 2,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "BT",
    area,
    chapter,
    type: "mcq",
    stem,
    options,
    correct,
    explanation,
    marks,
    difficulty,
  }
}

/* ── Area A ────────────────────────────────────────────────────── */

const MTQ_A1: OtCase = {
  id: "bt-mtq-a1",
  paper: "BT",
  area: "A",
  title: "Larkfield Foods — a factory closure",
  scenario:
    "Larkfield Foods Ltd plans to close its ageing Netherby plant and move production to a lower-cost site overseas. 240 jobs will be lost. The affected parties include a pension fund holding 21% of Larkfield's shares which has said it supports any margin-improving action; Netherby District Council, which has campaigned publicly about local unemployment but has no direct authority over the company; the plant's employees, who are not unionised; and a small firm supplying cleaning materials to the plant under a rolling monthly contract.",
  questions: [
    task("bt-mtq-a1", 1, "A", "BT-02", 1, "easy",
      "How should the cleaning materials supplier be classified?",
      ["Internal stakeholder", "Connected stakeholder", "External stakeholder", "Not a stakeholder"],
      1,
      "The supplier holds a contract with Larkfield, which makes it a CONNECTED stakeholder. External is reserved for parties with an interest but no contractual link, such as the Council."),
    task("bt-mtq-a1", 2, "A", "BT-02", 1, "medium",
      "Applying Mendelow's matrix, how should the pension fund be managed on this decision?",
      ["Key player — manage closely", "Keep satisfied", "Keep informed", "Minimal effort"],
      1,
      "It has HIGH power (a 21% holding) but has already declared it will support any margin-improving action, so its interest in the specifics is LOW. High power with low interest means KEEP SATISFIED."),
    task("bt-mtq-a1", 3, "A", "BT-02", 2, "hard",
      "The employees have very high interest but, being non-unionised, little individual power. What is the correct strategy now, and what would change it?",
      [
        "Minimal effort; nothing would change it",
        "Keep informed; unionising would raise their power and move them toward key players",
        "Keep satisfied; a pay offer would reduce their interest",
        "Key players; their interest alone makes them key players",
      ],
      1,
      "High interest with low power means KEEP INFORMED. The examinable insight is that power is NOT fixed: collective organisation through a union would raise their power while interest stayed high, shifting them toward KEY PLAYERS. Interest alone never makes a stakeholder a key player — both axes must be high."),
  ],
}

const MTQ_A2: OtCase = {
  id: "bt-mtq-a2",
  paper: "BT",
  area: "A",
  title: "Coldharbour Rail — a fare decision",
  scenario:
    "Coldharbour Rail carries 180,000 commuters a month on season tickets priced at $200. It is considering a 10% fare increase. Research indicates monthly volume would fall to 171,000. Commuters on these routes have no direct rail alternative, though the corridor has a parallel motorway. The finance director notes that a fare rise would also reduce crowding, cutting some variable operating cost.",
  questions: [
    task("bt-mtq-a2", 1, "A", "BT-05", 2, "medium",
      "What is the price elasticity of demand for Coldharbour's season tickets?",
      ["0.5 — inelastic", "2.0 — elastic", "1.0 — unit elastic", "0.05 — perfectly inelastic"],
      0,
      "Volume falls from 180,000 to 171,000, a 5% fall, against a 10% price rise. PED = −5% ÷ +10% = −0.5, so 0.5 in absolute terms — INELASTIC, which is what you would expect where commuters have no direct rail alternative in the short run."),
    task("bt-mtq-a2", 2, "A", "BT-05", 1, "medium",
      "What is the effect of the fare rise on total revenue?",
      ["Revenue falls, by $0.4m", "Revenue rises, by $1.62m", "Revenue is unchanged", "Revenue rises, by $0.9m"],
      1,
      "Before: 180,000 × $200 = $36.0m. After: 171,000 × $220 = $37.62m. Revenue RISES by $1.62m — the expected result with inelastic demand, where the higher price outweighs the lost volume."),
    task("bt-mtq-a2", 3, "A", "BT-05", 1, "hard",
      "Which factor would most weaken the case for the increase over a three-year horizon?",
      [
        "The reduction in variable operating cost from lower crowding",
        "Elasticity is normally higher in the long run, as commuters relocate, change jobs or switch to driving",
        "The parallel motorway is a complement rather than a substitute",
        "Season tickets are a necessity, so demand cannot fall further",
      ],
      1,
      "Elasticity RISES over time as customers find alternatives — relocating, changing jobs or switching to the parallel motorway, which is a SUBSTITUTE, not a complement. A short-run inelastic result does not survive indefinitely. The cost saving strengthens rather than weakens the case."),
  ],
}

const MTQ_A3: OtCase = {
  id: "bt-mtq-a3",
  paper: "BT",
  area: "A",
  title: "Mereside Coffee — assessing the industry",
  scenario:
    "Mereside Coffee operates 40 high-street coffee shops. A single site can be opened for modest capital and no patent protects the product. No individual customer matters to revenue, but a rival shop stands within 100 metres of most Mereside sites and customers switch freely. Green coffee is a traded commodity whose price Mereside cannot influence, though it buys in volume and can change roaster. Home espresso machines, supermarket ready-to-drink products and office coffee facilities are all improving.",
  questions: [
    task("bt-mtq-a3", 1, "A", "BT-07", 1, "easy",
      "The improving home machines and supermarket ready-to-drink products represent which of Porter's five forces?",
      ["Competitive rivalry", "Threat of new entrants", "Threat of substitutes", "Bargaining power of buyers"],
      2,
      "They meet the same NEED with a DIFFERENT product, which makes them SUBSTITUTES. Another coffee chain would be a competitor. Substitutes cap the price the whole industry can charge, and they typically arrive from outside the industry."),
    task("bt-mtq-a3", 2, "A", "BT-07", 2, "hard",
      "How should buyer power be assessed for Mereside?",
      [
        "Low, because no individual customer can negotiate",
        "High, because customers can switch freely",
        "Low individually but high collectively, because near-zero switching costs make customers highly price-sensitive in aggregate",
        "Not applicable, as buyer power concerns only business customers",
      ],
      2,
      "Both halves are needed: no INDIVIDUAL customer has bargaining power, yet with near-zero switching costs and a rival 100 metres away, customers are COLLECTIVELY very price- and quality-sensitive. Answering only 'low' or only 'high' captures half the analysis."),
    task("bt-mtq-a3", 3, "A", "BT-07", 1, "medium",
      "Given the analysis, which conclusion is best supported?",
      [
        "The industry is structurally attractive, because demand is strong",
        "The industry is structurally unattractive, so competition moves to location, brand, speed and store experience",
        "Mereside should pursue cost leadership and differentiation simultaneously across the market",
        "Barriers to entry are high, protecting incumbent margins",
      ],
      1,
      "Low barriers, high substitute threat, collective buyer sensitivity and many rivals make the industry STRUCTURALLY UNATTRACTIVE — which is why margins in it are thin. With the core product hard to differentiate, competition shifts to location, brand, speed and experience. Pursuing cost leadership and differentiation together across a broad market is Porter's 'stuck in the middle'."),
  ],
}

/* ── Area B ────────────────────────────────────────────────────── */

const MTQ_B1: OtCase = {
  id: "bt-mtq-b1",
  paper: "BT",
  area: "B",
  title: "Renwick plc — board composition",
  scenario:
    "Renwick plc has six directors. The founder is both chair and chief executive. There are two non-executive directors: the founder's brother-in-law, and a partner who retired eight months ago from Renwick's current external audit firm. Renwick's only board committee is its audit committee, whose three members are the finance director, the chief operating officer and the brother-in-law. Executive pay is determined by the chair.",
  questions: [
    task("bt-mtq-b1", 1, "B", "BT-11", 1, "easy",
      "Why do governance codes require the chair and chief executive roles to be separated?",
      [
        "Because one person cannot perform both roles competently",
        "Because the chair leads the board that holds the chief executive to account, sets its agenda and leads discussion of their performance and pay",
        "Because company law prohibits combining them",
        "Because it increases the number of board meetings",
      ],
      1,
      "The reason is structural rather than about workload: combining the roles means one person setting the agenda for their own appraisal and controlling how much the overseeing board is told."),
    task("bt-mtq-b1", 2, "B", "BT-11", 2, "hard",
      "Which statement about Renwick's two non-executive directors is correct?",
      [
        "Both are independent, as neither holds an executive role",
        "Neither is independent: one has a family connection and the other a recent professional connection to the current auditor",
        "Only the brother-in-law lacks independence",
        "Only the retired audit partner lacks independence",
      ],
      1,
      "NEITHER is independent. A family connection destroys independence, and so does a recent professional and financial connection to the very auditor the board is meant to oversee — eight months from a partnership in the current audit firm is plainly recent. Renwick therefore has no independent challenge at all."),
    task("bt-mtq-b1", 3, "B", "BT-11", 1, "medium",
      "What is the fundamental defect in Renwick's audit committee?",
      [
        "It has too few members",
        "Two members are executives whose own reporting and controls it is meant to assess, and the third is not independent",
        "It should be chaired by the finance director",
        "It should also determine executive remuneration",
      ],
      1,
      "An audit committee must consist of INDEPENDENT non-executive directors. Here the finance director PREPARES the statements the committee assesses and the COO is part of the management whose controls are reviewed — so management is reviewing itself, and auditors have no route to the board that avoids them. Remuneration is a separate committee's remit."),
  ],
}

const MTQ_B2: OtCase = {
  id: "bt-mtq-b2",
  paper: "BT",
  area: "B",
  title: "Ashbourne Assurance — culture and change",
  scenario:
    "Ashbourne Assurance is 40 years old. It has detailed procedure manuals, strict authorisation limits, promotion strictly by grade and length of service, and a strong preference for precedent — 'we have no precedent for that' is a common response to a new proposal. Digital competitors are now launching insurance products in weeks. Ashbourne's last three product launches took between 14 and 22 months.",
  questions: [
    task("bt-mtq-b2", 1, "B", "BT-09", 1, "easy",
      "Which of Handy's cultures does Ashbourne display?",
      ["Power (Zeus)", "Role (Apollo)", "Task (Athena)", "Person (Dionysus)"],
      1,
      "Authority derived from POSITION and PROCEDURE rather than personality or expertise is a ROLE culture, structured as a classical bureaucracy. The manuals, authorisation limits and service-based promotion are all markers."),
    task("bt-mtq-b2", 2, "B", "BT-09", 2, "hard",
      "Why will this culture struggle against the digital competitors?",
      [
        "Because role cultures are inherently badly managed",
        "Because its strengths — consistency and control through rules encoding past experience — are wrong for an environment changing faster than procedures can be rewritten",
        "Because it has too few authorisation limits",
        "Because bureaucracy always produces low-quality products",
      ],
      1,
      "A role culture is built for STABILITY, and its consistency and control are genuine strengths. It fails only when the environment changes faster than its procedures can — and note it is not badly run, it is run well for conditions that no longer exist. That framing earns the mark."),
    task("bt-mtq-b2", 3, "B", "BT-09", 1, "medium",
      "Which change would most effectively shift the underlying assumptions rather than merely the stated values?",
      [
        "Publishing a new statement of corporate values",
        "Changing what gets rewarded — promoting on demonstrated capability rather than grade and length of service",
        "Adding a further authorisation level for product launches",
        "Circulating the digital competitors' results to all staff",
      ],
      1,
      "Culture is transmitted most powerfully by WHAT GETS REWARDED. A values statement is an espoused value that changes nothing on its own; adding authorisation levels deepens the problem. Changing promotion criteria alters the underlying assumption about what the organisation actually values."),
  ],
}

const MTQ_B3: OtCase = {
  id: "bt-mtq-b3",
  paper: "BT",
  area: "B",
  title: "Calderbrook Group — structure and sourcing",
  scenario:
    "Calderbrook Group operates in eleven countries with four distinct product ranges. It currently runs a single functional structure from head office. It is also reviewing support services: its four regional payroll teams may be consolidated into one internal unit at head office, and its IT helpdesk may be transferred to an external provider based abroad.",
  questions: [
    task("bt-mtq-b3", 1, "B", "BT-08", 1, "medium",
      "Which structure would best suit Calderbrook's diversity of products and geographies, and what is its main cost?",
      [
        "Functional; the cost is duplicated resources",
        "Divisional; the cost is duplicated resources and divisions optimising for themselves rather than the group",
        "Entrepreneurial; the cost is dependence on one person",
        "Matrix; the cost is economies of scale forgone",
      ],
      1,
      "A DIVISIONAL structure grouped by product or geography gives clear accountability and local responsiveness for a diverse, multi-country group. Its costs are duplicated resources across divisions and the risk of divisional self-interest at the group's expense."),
    task("bt-mtq-b3", 2, "B", "BT-08", 1, "easy",
      "Consolidating the four payroll teams into one internal unit at head office creates:",
      ["An outsourcing arrangement", "An offshoring arrangement", "A shared service centre", "A matrix structure"],
      2,
      "The activity stays INSIDE the organisation but is centralised in one unit serving the whole business — a SHARED SERVICE CENTRE. Outsourcing requires an external provider and offshoring a move to another country."),
    task("bt-mtq-b3", 3, "B", "BT-08", 2, "hard",
      "Transferring the IT helpdesk to an external provider abroad is best described as, and its most significant risk is:",
      [
        "Offshoring only; the risk is currency movements",
        "Outsourcing and offshoring; the risks include loss of in-house capability, dependency, weak bargaining power at renewal and data security across jurisdictions",
        "A shared service centre; the risk is duplicated effort",
        "Outsourcing only; the risk is higher cost",
      ],
      1,
      "It is BOTH: ownership passes to an external provider (outsourcing) AND the work moves country (offshoring). The substantive risks are loss of capability that is hard to rebuild, dependency with weak renewal-time bargaining power, and data protection exposure where personal data crosses jurisdictions."),
  ],
}

/* ── Area C ────────────────────────────────────────────────────── */

const MTQ_C1: OtCase = {
  id: "bt-mtq-c1",
  paper: "BT",
  area: "C",
  title: "Hartwell Ltd — cash receipts",
  scenario:
    "At Hartwell Ltd one accounts assistant opens the post containing customer cheques, records the receipts in the receivables ledger, prepares and delivers the bank deposit, and performs the monthly bank reconciliation. She can also create and amend customer accounts on the system. She has held the role for nine years and has never taken more than three consecutive days' leave. Receivables days have risen from 42 to 57 with no change in credit terms.",
  questions: [
    task("bt-mtq-c1", 1, "C", "BT-15", 1, "medium",
      "Which combination of duties is the core segregation failure?",
      [
        "Preparing and delivering the bank deposit",
        "Custody of the cheques combined with recording the receipts",
        "Opening the post and creating customer accounts",
        "Performing the reconciliation monthly rather than weekly",
      ],
      1,
      "CUSTODY plus RECORDING is the core failure: someone holding the asset and writing the record can misappropriate a receipt and post an entry to conceal it."),
    task("bt-mtq-c1", 2, "C", "BT-16", 2, "hard",
      "Which fraud does the overall pattern most strongly suggest, and which single fact points to it most specifically?",
      [
        "Ghost employees; the nine years' service",
        "Teeming and lading; never taking more than three consecutive days' leave, because the concealment needs continuous attention",
        "Inflated supplier invoices; the rising receivables days",
        "Financial statement fraud; her ability to amend customer accounts",
      ],
      1,
      "TEEMING AND LADING fits: rising receivables days on unchanged terms is consistent with receipts taken and balances covered from later ones. The leave pattern is the most specific pointer, because lapping requires CONTINUOUS attention — each covered balance must be covered again."),
    task("bt-mtq-c1", 3, "C", "BT-15", 1, "medium",
      "Which remediation is most urgent?",
      [
        "Requiring her to take annual leave next year",
        "Having someone independent open the post and list receipts before she sees them, and transferring the bank reconciliation to someone with no cash-handling or recording role",
        "Increasing the frequency of the reconciliation to weekly",
        "Dismissing her immediately",
      ],
      1,
      "Break the segregation failure first: independent listing of receipts at the point of opening post, and a reconciliation performed by someone with no cash role — because a detective control operated by the person it should detect is not a control. Dismissal on unproven suspicion would also breach fair procedure."),
  ],
}

const MTQ_C2: OtCase = {
  id: "bt-mtq-c2",
  paper: "BT",
  area: "C",
  title: "Bramhope Manufacturing — automating invoice processing",
  scenario:
    "Bramhope Manufacturing replaces manual purchase-invoice processing with software that reads each invoice, matches it to the purchase order and goods received note, and pays automatically where all three agree within a defined tolerance. Two staff will remain, handling items the system could not match. Any user with purchasing access can currently amend supplier master data, including bank details.",
  questions: [
    task("bt-mtq-c2", 1, "C", "BT-14", 1, "easy",
      "Why does the three-way match prevent both error and supplier fraud?",
      [
        "Because it recalculates the invoice arithmetic",
        "Because the order proves the purchase was authorised at an agreed price and the goods received note proves the goods arrived",
        "Because it confirms the supplier is on the approved list",
        "Because it checks the invoice against the prior month's total",
      ],
      1,
      "The match establishes TWO separate facts — authorisation at an agreed price, and actual receipt. An invoice alone proves neither, which is why the control blocks both paying for goods nobody ordered and paying for goods never delivered."),
    task("bt-mtq-c2", 2, "C", "BT-14", 2, "hard",
      "Which control becomes the single highest risk after automation, and why?",
      [
        "Manual recalculation of invoice arithmetic, because nobody now checks it",
        "Change control over supplier master data, because anyone able to amend bank details can divert every future payment automatically and at speed",
        "Filing of paper purchase orders, because the audit trail is lost",
        "Approval of the annual purchasing budget, because volumes will rise",
      ],
      1,
      "Automation RELOCATES control onto MASTER DATA. With purchasing users able to amend bank details, one change silently redirects every subsequent payment to that supplier — and the system will process it faultlessly. This is the control that must be restricted and independently verified."),
    task("bt-mtq-c2", 3, "C", "BT-14", 1, "medium",
      "Which statement about the two remaining staff is most accurate?",
      [
        "Their work becomes less skilled, as the software handles the difficult cases",
        "Their work becomes more demanding, because they handle only the exceptions and must own the matching rules and monitoring",
        "Their work is unchanged in nature, only lower in volume",
        "Their role becomes purely supervisory with no technical content",
      ],
      1,
      "The software handles the straightforward matches and hands the humans only the FAILURES, which are by definition the difficult ones — plus ownership of the rules, the master data and monitoring that the automation still works. The skill profile of the remaining work RISES."),
  ],
}

const MTQ_C3: OtCase = {
  id: "bt-mtq-c3",
  paper: "BT",
  area: "C",
  title: "Wrenbury Ltd — an AI credit model",
  scenario:
    "Wrenbury Ltd's finance director proposes replacing the credit control team's judgement with a machine learning model that approves or refuses customer credit automatically. The model would be trained on ten years of Wrenbury's own payment and decision history. The director notes that the model will be consistent, immediate and able to weigh far more variables than a person.",
  questions: [
    task("bt-mtq-c3", 1, "C", "BT-17", 1, "medium",
      "Which type of analytics does the proposed model perform?",
      ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"],
      3,
      "The model does not merely forecast the likelihood of default (predictive) — it RECOMMENDS AND TAKES the action, approving or refusing credit. That is PRESCRIPTIVE analytics, the highest and hardest rung of the ladder."),
    task("bt-mtq-c3", 2, "C", "BT-17", 2, "hard",
      "What is the principal risk of training the model on Wrenbury's own ten-year decision history?",
      [
        "Ten years is too short a period to train any model",
        "It inherits and industrialises the biases in those past decisions, applying them consistently at scale with the appearance of objectivity",
        "Historic data cannot be used for credit decisions",
        "The model will approve every application to maximise revenue",
      ],
      1,
      "ALGORITHMIC BIAS: ten years of Wrenbury's own decisions encode ten years of Wrenbury's own biases, and the model now applies them CONSISTENTLY, AT SCALE, and with the appearance of objectivity. Historic bias is not removed by automation — it is industrialised."),
    task("bt-mtq-c3", 3, "C", "BT-17", 1, "hard",
      "Which safeguard is most effective, and what makes it genuine rather than presentational?",
      [
        "A quarterly report of model decisions to the board; genuine because the board is senior",
        "Human oversight with a real override, logged and analysed — genuine only if the reviewer has the authority and time to disagree, and sometimes does",
        "Retraining the model annually; genuine because it keeps the data current",
        "Publishing the model's approval rate; genuine because it is transparent",
      ],
      1,
      "MEANINGFUL human oversight requires a reviewer with the authority, information and time to override — and their overrides logged and analysed, both to catch model drift and to evidence that the oversight is real. Oversight that has never disagreed with the model is documentation, not control."),
  ],
}

/* ── Area D ────────────────────────────────────────────────────── */

const MTQ_D1: OtCase = {
  id: "bt-mtq-d1",
  paper: "BT",
  area: "D",
  title: "Pentland Ltd — four supervision decisions",
  scenario:
    "Yusuf supervises four staff at Pentland Ltd. Amara joined two weeks ago, is enthusiastic and has no knowledge of the ledger system. Bo has completed the year-end reconciliation flawlessly for ten years. Cerys is technically capable but has recently become withdrawn and is missing deadlines. At 4pm today the payment file has failed and must be submitted before a 5pm banking cut-off.",
  questions: [
    task("bt-mtq-d1", 1, "D", "BT-18", 1, "easy",
      "Under Hersey and Blanchard, which style suits Amara?",
      ["Telling", "Selling", "Participating", "Delegating"],
      0,
      "Low competence with high enthusiasm requires TELLING — specific instructions and close supervision. Keenness without knowledge produces confident mistakes, so directive here is not distrust but a match to readiness."),
    task("bt-mtq-d1", 2, "D", "BT-18", 1, "medium",
      "Bo is moved to an unfamiliar consolidation system tomorrow. Which style now applies for that task?",
      ["Delegating, as Bo is highly experienced", "Telling, because readiness is task-specific", "Participating, because Bo's commitment is high", "The model no longer applies"],
      1,
      "Readiness is TASK-SPECIFIC, not a property of the person. Bo is at DELEGATING for the reconciliation and back at TELLING for a task they have never done. Applying the model to the individual rather than the task is the classic misuse."),
    task("bt-mtq-d1", 3, "D", "BT-18", 2, "hard",
      "Which pair of responses is correct for Cerys and for the 4pm payment failure?",
      [
        "Cerys: telling. Payment failure: participating",
        "Cerys: participating, after diagnosing why the change occurred. Payment failure: directive, showing no single style suits every situation",
        "Cerys: delegating. Payment failure: delegating",
        "Cerys: forcing. Payment failure: country club",
      ],
      1,
      "Cerys's competence is not in doubt, so this is a commitment issue calling for PARTICIPATING — but diagnose first, since withdrawal in a reliable person may signal workload, conflict or a personal difficulty (Adair's neglected INDIVIDUAL circle). The 4pm failure needs a DIRECTIVE style, which is the contingency argument against a universally best 9,9 approach."),
  ],
}

const MTQ_D2: OtCase = {
  id: "bt-mtq-d2",
  paper: "BT",
  area: "D",
  title: "Selby Systems — a team that delivers nothing",
  scenario:
    "Selby Systems' five-person implementation team comprises a manager who chairs well and draws everyone out; two highly analytical members who scrutinise every proposal thoroughly; a diplomat who smooths over disagreements; and an expert on the legacy system. Deadlines slip repeatedly, decisions are revisited, and nobody has contacted the software vendor for a month.",
  questions: [
    task("bt-mtq-d2", 1, "D", "BT-20", 1, "medium",
      "Which Belbin role does the manager who chairs and draws out contributions play?",
      ["Shaper", "Coordinator", "Teamworker", "Plant"],
      1,
      "The COORDINATOR chairs, clarifies goals, draws out contributions and delegates. A SHAPER drives the team forward under pressure — which is precisely the role this team lacks."),
    task("bt-mtq-d2", 2, "D", "BT-20", 2, "hard",
      "Which missing roles explain the slipping deadlines and revisited decisions?",
      [
        "Plant and specialist",
        "Shaper and completer-finisher — nobody forces a decision or owns delivery to the deadline",
        "Teamworker and coordinator",
        "Monitor-evaluator and specialist",
      ],
      1,
      "With two monitor-evaluators habitually re-examining options and a conflict-avoiding teamworker, no SHAPER means decisions are never forced closed, and no COMPLETER-FINISHER means nobody owns the deadline or catches errors. The roles present amplify the gap."),
    task("bt-mtq-d2", 3, "D", "BT-20", 1, "medium",
      "Which missing role explains why nobody has contacted the vendor?",
      ["Implementer", "Resource investigator", "Monitor-evaluator", "Plant"],
      1,
      "The RESOURCE INVESTIGATOR explores opportunities and develops contacts OUTSIDE the team. Without one, a team stops talking to anyone beyond itself — exactly the month of vendor silence described."),
  ],
}

const MTQ_D3: OtCase = {
  id: "bt-mtq-d3",
  paper: "BT",
  area: "D",
  title: "Thornaby Ltd — an accounts assistant about to resign",
  scenario:
    "An accounts assistant at Thornaby Ltd tells her manager: 'The pay is fine and the office is comfortable, my manager is reasonable and the job is secure. But I do the same three tasks every day, nobody notices when I do them well, and I have not learned anything in two years. I am looking for another job.' Her manager proposes a 6% pay rise to retain her.",
  questions: [
    task("bt-mtq-d3", 1, "D", "BT-21", 1, "easy",
      "Using Herzberg, how should pay, conditions, supervision and security be classified here?",
      [
        "Motivators that are absent",
        "Hygiene factors that are already satisfactory",
        "Motivators that are already satisfactory",
        "Hygiene factors that are absent",
      ],
      1,
      "Pay, conditions, quality of supervision and security all concern the job's CONTEXT, making them HYGIENE FACTORS — and she reports all four as satisfactory, so there is no dissatisfaction left to remove."),
    task("bt-mtq-d3", 2, "D", "BT-21", 2, "hard",
      "Why will the 6% pay rise most likely fail to retain her?",
      [
        "Because 6% is below inflation",
        "Because pay is a hygiene factor already satisfactory, so it removes no dissatisfaction and creates no motivation — and Maslow adds that a satisfied need has stopped motivating",
        "Because pay rises always demotivate the recipient's colleagues",
        "Because she has already accepted another offer",
      ],
      1,
      "Two theories converge. Herzberg: pay cannot motivate, and hers is already adequate so it has nothing left to fix. Maslow: a substantially satisfied need ceases to motivate. What is absent is every MOTIVATOR — achievement, recognition, responsibility, growth — so she is likely to take the rise and leave anyway."),
    task("bt-mtq-d3", 3, "D", "BT-21", 1, "medium",
      "Which intervention would address the actual problem?",
      [
        "Job enlargement — adding two further tasks at the same level",
        "Job enrichment — giving her a reconciliation to own end to end, including investigating and resolving differences within an authority limit",
        "Job rotation — moving her between the same three tasks in a different order",
        "Job evaluation — regrading her post",
      ],
      1,
      "JOB ENRICHMENT is vertical expansion — more responsibility, autonomy and decision authority — and it is the only one of these that reaches Herzberg's motivators. Enlargement and rotation add or reorder same-level tasks, which she would experience as more of the same, and job evaluation just regrades the post."),
  ],
}

/* ── Areas E and F ─────────────────────────────────────────────── */

const MTQ_E1: OtCase = {
  id: "bt-mtq-e1",
  paper: "BT",
  area: "E",
  title: "Kirkstall Ltd — a message that softened",
  scenario:
    "At Kirkstall Ltd a team leader reports to her manager: 'The bank reconciliation has a $400,000 unexplained difference and we cannot clear it.' Her manager reports to the finance director: 'There is a reconciliation issue we are working through.' The finance director tells the board: 'Month-end went broadly to plan, with a couple of minor items being tidied up.' Separately, Kirkstall must inform 30 staff that their department will close in four months.",
  questions: [
    task("bt-mtq-e1", 1, "E", "BT-24", 1, "medium",
      "Which communication barrier does the reconciliation message illustrate?",
      [
        "Information overload",
        "Distortion and filtering through levels",
        "Physical noise",
        "Appropriate summarisation for a board audience",
      ],
      1,
      "Each softening was individually defensible, and three iterations converted a warning into an assurance. That is DISTORTION AND FILTERING. It is not appropriate summarisation: summarising should reduce DETAIL, not SIGNIFICANCE."),
    task("bt-mtq-e1", 2, "E", "BT-24", 1, "hard",
      "Why is this direction of communication failure the most serious for governance?",
      [
        "Because downward instructions may be misunderstood",
        "Because upward failure stops adverse information reaching decision-makers, defeating every governance and control mechanism",
        "Because horizontal coordination breaks down",
        "Because it bypasses the scalar chain",
      ],
      1,
      "UPWARD failure is the dangerous one: if bad news cannot travel up, the board never learns a control failed or the numbers were manipulated until it is too late. Every governance mechanism depends on adverse information arriving intact."),
    task("bt-mtq-e1", 3, "E", "BT-24", 2, "medium",
      "Which medium should be used for the department closure, and which criterion drives that choice?",
      [
        "Email, driven by the need for a record",
        "Face-to-face briefing followed by written confirmation and individual meetings, driven by sensitivity",
        "An intranet notice, driven by the need for identical wording",
        "Instant message, driven by speed",
      ],
      1,
      "SENSITIVITY drives it and outranks record-keeping: news materially affecting livelihoods must be delivered face-to-face, with written confirmation following because consultation obligations apply and people cannot retain detail from a distressing meeting. Email or a notice would also let the grapevine reach everyone first, in a worse form."),
  ],
}

const MTQ_F1: OtCase = {
  id: "bt-mtq-f1",
  paper: "BT",
  area: "F",
  title: "Aldbrough Ltd — releasing a provision",
  scenario:
    "Two days before the year end, Aldbrough Ltd's finance director instructs the financial controller to release a $250,000 warranty provision that the controller knows is still required. The senior team's bonus, which includes the controller's, depends on meeting the resulting profit target. The finance director says: 'It is a judgement call, I am the FD, and if you cannot take a commercial view I will find someone who can.'",
  questions: [
    task("bt-mtq-f1", 1, "F", "BT-25", 1, "medium",
      "Which TWO threats to the fundamental principles are present? Select the option naming both.",
      [
        "Self-review and advocacy",
        "Intimidation and self-interest",
        "Familiarity and advocacy",
        "Self-review and familiarity",
      ],
      1,
      "INTIMIDATION is explicit in the threat to the controller's position, and SELF-INTEREST arises because the controller's own bonus depends on the same target. Both pressures point the same way, which is what makes the situation difficult rather than merely unwelcome."),
    task("bt-mtq-f1", 2, "F", "BT-25", 1, "medium",
      "Which fundamental principle would be breached by releasing the provision?",
      [
        "Confidentiality, because the reasoning would not be disclosed",
        "Integrity, because the controller would be knowingly associated with misleading financial statements",
        "Professional behaviour, because the FD's instruction is discourteous",
        "None, because provisions are inherently judgemental",
      ],
      1,
      "INTEGRITY requires an accountant not to be knowingly ASSOCIATED with misleading information. Provisions do involve judgement — which is what makes the framing plausible — but the controller KNOWS the obligation remains, so releasing it means knowingly misstating."),
    task("bt-mtq-f1", 3, "F", "BT-26", 2, "hard",
      "Internal discussion with the finance director has failed. What is the appropriate next step?",
      [
        "Resign immediately",
        "Comply, recording a private note of disagreement",
        "Escalate to the audit committee or non-executive directors, while consulting ACCA's confidential helpline, taking legal advice and documenting contemporaneously",
        "Report the matter directly to the press",
      ],
      2,
      "Escalation is STEPWISE, and where MANAGEMENT is the source of the pressure the audit committee and non-executive directors exist precisely for this. Consult ACCA and legal advisers and document as you go. Resignation is the last resort and may not discharge a reporting duty; a private note still means being associated with the misstatement."),
  ],
}

const MTQ_F2: OtCase = {
  id: "bt-mtq-f2",
  paper: "BT",
  area: "F",
  title: "Padgate Advisory — four client situations",
  scenario:
    "Padgate Advisory is reviewing its engagements. (1) It has audited Brightline Ltd for nine years with the same engagement partner throughout, who holidays annually with Brightline's finance director. (2) A client has offered a 20% fee reduction if its inventory valuation is accepted without further testing. (3) Padgate designed and installed a client's revenue recognition system last year and is asked to audit the resulting revenue figure. (4) A manager's brother has just been appointed financial controller of a client whose tax computation the manager prepares.",
  questions: [
    task("bt-mtq-f2", 1, "F", "BT-25", 1, "medium",
      "Which threat arises in situation (1), and what is the appropriate safeguard?",
      [
        "Self-interest; reduce the fee",
        "Familiarity; rotate the engagement partner and key team members and obtain an independent review",
        "Advocacy; cease acting for the client",
        "Self-review; use a separate team",
      ],
      1,
      "Nine years with the same partner plus a shared annual holiday is a FAMILIARITY threat to objectivity — professional scepticism becomes very hard to sustain. The safeguard is partner and team ROTATION plus independent review. There is a self-interest element in the long-standing fee, but familiarity is the primary threat."),
    task("bt-mtq-f2", 2, "F", "BT-25", 2, "hard",
      "How should Padgate respond to situation (2)?",
      [
        "Accept, as the client is entitled to negotiate fees",
        "Refuse the condition, escalate to the ethics partner, document it, and withdraw if the client insists — no safeguard makes it acceptable",
        "Accept a smaller reduction with proportionately reduced testing",
        "Accept and disclose the arrangement in the audit report",
      ],
      1,
      "This is INTIMIDATION with a self-interest element, engaging objectivity and integrity. Curtailing audit evidence in exchange for a commercial concession cannot be accepted at ANY price and would breach auditing standards independently of the Code — so no safeguard makes it acceptable. Options 3 and 4 trade evidence for money in different proportions."),
    task("bt-mtq-f2", 3, "F", "BT-25", 1, "medium",
      "Which threats arise in situations (3) and (4) respectively?",
      [
        "Familiarity and self-review",
        "Self-review and familiarity",
        "Advocacy and intimidation",
        "Self-interest and advocacy",
      ],
      1,
      "Auditing the output of a system Padgate designed is SELF-REVIEW — re-evaluating its own previous judgement, which it is unlikely to find flawed. A brother as the client's financial controller is FAMILIARITY, and the standard safeguard for both is changing WHO does the work: a separate team for (3), reassignment for (4)."),
  ],
}

const MTQ_C4: OtCase = {
  id: "bt-mtq-c4",
  paper: "BT",
  area: "C",
  title: "Denby Ltd — the finance function and its users",
  scenario:
    "Denby Ltd's finance team is preparing three pieces of information: a costing of a proposed product line for the operations director, the statutory financial statements, and a schedule of liquidity and gearing ratios requested by a bank considering renewal of a five-year facility. The internal audit manager, who currently reports to the finance director, has asked to test the controls over the purchase ledger.",
  questions: [
    task("bt-mtq-c4", 1, "C", "BT-12", 1, "easy",
      "The costing prepared for the operations director is an example of:",
      ["Financial accounting", "Management accounting", "Treasury management", "Statutory reporting"],
      1,
      "Information produced for INTERNAL decision-making, in whatever format is useful and at any level of the business, is MANAGEMENT ACCOUNTING. Financial accounting produces the statutory statements for external users in a prescribed format."),
    task("bt-mtq-c4", 2, "C", "BT-12", 1, "medium",
      "Why has the bank asked specifically for liquidity and gearing rather than earnings per share?",
      [
        "Because earnings per share is not disclosed by private companies",
        "Because a lender's return is contractual, so its concern is the ability to service interest and repay capital",
        "Because liquidity ratios are easier to audit",
        "Because gearing determines the interest rate by law",
      ],
      1,
      "A LENDER's return is CONTRACTUAL — interest as it falls due and capital at maturity — so it focuses on liquidity, gearing, cash generation and covenant compliance. Earnings per share is a shareholder measure, because a lender's return does not rise with profit."),
    task("bt-mtq-c4", 3, "C", "BT-12", 2, "hard",
      "What is wrong with the internal audit manager's reporting line, and what should it be?",
      [
        "Nothing — the finance director is the appropriate senior sponsor",
        "The finance function is one of the areas internal audit examines, so it should report to the audit committee instead",
        "Internal audit should report to the external auditor",
        "Internal audit should report to the operations director to preserve independence from finance",
      ],
      1,
      "Internal audit is about to test controls over the PURCHASE LEDGER — part of the finance function. Reporting to the finance director means any adverse finding goes to the person responsible for it, who also controls internal audit's budget and staffing. It should report to the AUDIT COMMITTEE. Reporting to another executive would simply relocate the same conflict."),
  ],
}

const MTQ_E2: OtCase = {
  id: "bt-mtq-e2",
  paper: "BT",
  area: "E",
  title: "Ravenglass Ltd — a conflict with a structural cause",
  scenario:
    "At Ravenglass Ltd the sales director and the credit controller are in open conflict. Sales staff are paid commission on invoiced revenue with no clawback for bad debts. The credit controller has refused credit to eleven prospective customers this quarter; the sales director has twice overridden her and instructed that the orders be shipped, and two of those customers have since defaulted. The HR director proposes a facilitated conversation to resolve 'the personality clash'.",
  questions: [
    task("bt-mtq-e2", 1, "E", "BT-23", 1, "medium",
      "What is the real source of the conflict?",
      [
        "A personality clash between two strong individuals",
        "Incompatible objectives created by the reward system, which makes pushing through any order individually rational for sales staff",
        "The credit controller's excessive caution",
        "Inadequate credit reference information",
      ],
      1,
      "Commission on invoiced revenue with no clawback means sales staff capture the upside and bear none of the downside — so both parties are behaving rationally given their incentives. The conflict is STRUCTURAL, and the organisation designed it."),
    task("bt-mtq-e2", 2, "E", "BT-23", 1, "hard",
      "Why will the HR director's facilitated conversation fail to resolve it?",
      [
        "Because facilitated conversations are never effective",
        "Because it leaves the incentive intact, so replacing either person reproduces the same conflict within a quarter",
        "Because the credit controller would refuse to attend",
        "Because conflict must always be escalated to the board",
      ],
      1,
      "Treating a structural conflict as personal locates the problem in two individuals and leaves the CAUSE untouched. Note that the diagnosis is also convenient: it avoids revisiting a commission scheme senior management approved. The fix is to base commission on cash collected or apply clawback."),
    task("bt-mtq-e2", 3, "E", "BT-15", 2, "hard",
      "Beyond the conflict, what control weakness do the two overrides reveal?",
      [
        "None — a director is entitled to override a subordinate's decision",
        "An authorisation control was overridden by a manager with a financial interest in the outcome, and losses followed",
        "The credit limits were set too low",
        "The customers should have been asked for references",
      ],
      1,
      "A credit limit is an AUTHORISATION control, and it was overridden by the person whose pay depended on the sale. That is a control environment weakness, and in fraud triangle terms the scheme supplies both pressure and rationalisation. Overrides must route to someone with no interest in the outcome, and be documented."),
  ],
}

const MTQ_F3: OtCase = {
  id: "bt-mtq-f3",
  paper: "BT",
  area: "F",
  title: "Corby Ltd — hospitality, custom and a suspicion",
  scenario:
    "Three matters arise at Corby Ltd. (1) Its code of conduct permits accountants to accept hospitality worth up to $500 from suppliers; an ACCA member is offered a $450 dinner by a supplier whose contract she is currently evaluating. (2) An agent in an overseas market requests a small payment to release goods already cleared for export, saying it is customary there. (3) A management accountant forms a suspicion, without proof, that a client's funds derive from criminal activity.",
  questions: [
    task("bt-mtq-f3", 1, "F", "BT-26", 1, "medium",
      "What governs the member's decision on the hospitality in situation (1)?",
      [
        "The employer's code, since she is employed rather than in practice",
        "The ACCA Code: she must evaluate the self-interest threat regardless of the corporate threshold",
        "Nothing, as $450 is below the corporate limit",
        "The corporate code, which overrides the professional code for employees",
      ],
      1,
      "A corporate code cannot AUTHORISE what the professional code requires you to evaluate. ACCA membership binds her regardless of her employer's threshold, and the timing — a contract she is currently evaluating — makes the self-interest threat significant."),
    task("bt-mtq-f3", 2, "F", "BT-26", 1, "medium",
      "How should the payment requested in situation (2) be treated?",
      [
        "Acceptable, as it is customary and small",
        "A facilitation payment, prohibited under most anti-bribery legislation — local custom is not a defence",
        "Acceptable if disclosed in the financial statements",
        "Acceptable if refusing would lose the contract",
      ],
      1,
      "A payment to secure or speed a ROUTINE action to which one is already entitled is a FACILITATION PAYMENT, prohibited under most modern anti-bribery legislation. Anti-bribery law commonly applies EXTRA-TERRITORIALLY, the ACCA Code binds a member in every jurisdiction, and custom has never been a defence."),
    task("bt-mtq-f3", 3, "F", "BT-16", 2, "hard",
      "What must the management accountant do about the suspicion in situation (3)?",
      [
        "Gather evidence until it can be proven, then report",
        "Report the suspicion as required and not inform the client, because the test is suspicion rather than proof and tipping off is a separate offence",
        "Inform the client so they may explain, then report if unsatisfied",
        "Take no action, as confidentiality prevents disclosure",
      ],
      1,
      "The test is SUSPICION, not proof, so waiting for evidence is itself non-compliance. TIPPING OFF the client is a SEPARATE offence, which rules out option 3. Anti-money-laundering obligations OVERRIDE client confidentiality — one of the clearest cases where a professional duty is displaced by law."),
  ],
}

/*
 * The three mock forms deal from this list in order, six MTQs each, so the sets
 * are disjoint and each sitting spans several syllabus areas.
 */
export const BT_MTQ_CASES: OtCase[] = [
  // Form 1
  MTQ_A1, MTQ_B1, MTQ_C1, MTQ_D1, MTQ_E1, MTQ_F1,
  // Form 2
  MTQ_A2, MTQ_B2, MTQ_C2, MTQ_D2, MTQ_E2, MTQ_F2,
  // Form 3
  MTQ_A3, MTQ_B3, MTQ_C3, MTQ_C4, MTQ_D3, MTQ_F3,
]
