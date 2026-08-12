/*
 * BT Area B — Business organisation structure, functions and governance.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area B is where BT's distractors stop being factual and start being
 * definitional: Handy against Hofstede, delegation against abdication, the audit
 * committee against the remuneration committee. Almost every plan here turns on
 * holding two adjacent models apart rather than on recalling either one.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const BT_PLANS_B: ExamPlanMap = {
  /* ── BT-08 · Organisation structure and design ───────────────── */

  "BT-08::formal-informal": {
    title: "What the informal organisation is, and why managers care",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following best describes the informal organisation?\n\nA  The structure shown on the organisation chart\nB  The pattern of relationships and communication that arises spontaneously between people\nC  The organisation's stated policies and procedures\nD  Departments created outside the main hierarchy",
    plan: [
      {
        step: "Separate the two organisations by their origin",
        detail:
          "The formal organisation is DESIGNED — charts, job descriptions, reporting lines, procedures. The informal organisation EMERGES — friendships, alliances, the people who actually get asked when something goes wrong.",
      },
      {
        step: "Test each option for design versus emergence",
        detail:
          "A chart is designed. Policies are designed. Departments, even unusual ones, are designed. Only B describes something arising by itself, which is the defining property.",
      },
      {
        step: "Watch option D, which is the deliberate trap",
        detail:
          "\"Outside the main hierarchy\" sounds informal, but a department created by management is formal wherever it sits on the chart. Informal is not a synonym for unusual, peripheral or undocumented.",
      },
      {
        step: "Be ready for the follow-on question",
        detail:
          "BT frequently pairs this with why it matters: the informal organisation can speed communication and raise morale, or spread rumour and resist change. Managers work with it rather than trying to abolish it.",
      },
    ],
    answer:
      "**B — the pattern of relationships and communication that arises spontaneously between people.**\n\nThe formal organisation is deliberately designed: the chart, reporting lines, job descriptions and procedures. The informal organisation arises by itself out of how people actually work together, and it exists in every organisation whether management acknowledges it or not.\n\nD is the strongest distractor. A department sitting outside the main hierarchy was still created by management, so it is formal — informal means unplanned, not unusual.",
    earns: ["Classifying on designed versus emergent rather than on official versus unofficial"],
    loses: ["Reading \"informal\" as \"not on the chart\" and choosing D"],
  },

  "BT-08::structural-types": {
    title: "Matching a structure to the situation that suits it",
    format: "mtq",
    marks: 4,
    requirement:
      "Select the organisational structure each situation best suits.\n\n(i) A company with three unrelated businesses in different countries, each needing its own strategy\n(ii) A small manufacturer with departments for production, sales and finance\n(iii) A construction firm where staff report both to their professional head and to a project leader\n(iv) A firm that keeps only design in-house and contracts out manufacture, logistics and support\n\nStructures: Functional · Divisional · Matrix · Geographic · Network (virtual)",
    plan: [
      {
        step: "Reduce each structure to the basis it groups people by",
        detail:
          "Functional groups by specialism. Divisional groups by product, market or region. Matrix groups by two bases at once, so staff have two bosses. Network keeps a small core and contracts out the rest.",
      },
      {
        step: "Find the grouping basis stated in each scenario",
        detail:
          "The scenarios name it rather than implying it: \"unrelated businesses\", \"departments for production, sales and finance\", \"report both to\", \"contracts out\". Each phrase is the basis in plain words.",
      },
      {
        step: "Use dual reporting as the matrix's unmistakable signature",
        detail:
          "Two bosses means matrix and nothing else. It is the only structure that deliberately breaks unity of command, which is exactly why the syllabus keeps returning to its conflict costs.",
      },
      {
        step: "Split divisional from geographic on what the divisions are FOR",
        detail:
          "(i) says the businesses are unrelated and each needs its own strategy — that is divisional. Geographic would be the answer if the same business were being run differently region by region.",
      },
    ],
    answer:
      "**(i) Divisional.** Unrelated businesses each needing their own strategy is the case divisionalisation exists for — each division gets its own resources and is accountable for its own result.\n\n**(ii) Functional.** Grouping by specialism, which suits a single-product organisation small enough that one functional head can see the whole of their function.\n\n**(iii) Matrix.** Reporting to both a professional head and a project leader is dual authority, the matrix's defining feature — and the source of its characteristic conflict over priorities.\n\n**(iv) Network (virtual).** A small core retaining what it is distinctive at and contracting out the rest.",
    earns: [
      "Naming the grouping basis before choosing a structure",
      "Treating dual reporting as conclusive evidence of a matrix",
    ],
    loses: [
      "Answering (i) geographic because different countries are mentioned — the divisions are by business, not by place",
    ],
  },

  "BT-08::span-and-chain": {
    title: "What happens to a structure when the span of control widens",
    format: "ot",
    marks: 2,
    requirement:
      "An organisation widens its average span of control while keeping the number of employees the same. The most likely effect is that the organisation becomes:\n\nA  Taller, with a longer scalar chain\nB  Flatter, with a shorter scalar chain\nC  Taller, with a shorter scalar chain\nD  Unchanged in shape",
    plan: [
      {
        step: "Define both terms before reasoning",
        detail:
          "Span of control is how many subordinates report to one manager. The scalar chain is the number of levels from top to bottom. They are inversely related for a fixed headcount.",
      },
      {
        step: "Reason it through with small numbers rather than from memory",
        detail:
          "If each manager supervises more people, fewer managers are needed to cover the same workforce, so fewer layers are needed to reach everyone. Wider span, fewer levels — a two-minute sketch settles it permanently.",
      },
      {
        step: "Translate fewer levels into the vocabulary the options use",
        detail:
          "Fewer levels means a FLATTER organisation and a SHORTER scalar chain. The two phrases describe the same fact, so the correct option must have them agreeing.",
      },
      {
        step: "Reject the internally contradictory option",
        detail:
          "C pairs taller with a shorter chain, which cannot both be true — taller IS a longer chain. Options that contradict themselves can be struck without any reasoning about spans at all.",
      },
    ],
    answer:
      "**B — flatter, with a shorter scalar chain.**\n\nFor a given number of employees, span of control and the number of levels are inversely related: if each manager supervises more people, fewer managers are needed and fewer layers are required to reach everyone.\n\nA flat structure shortens communication and pushes decisions down, but it stretches each manager and can weaken supervision. C can be eliminated on inspection alone — \"taller\" and \"a shorter scalar chain\" contradict each other.",
    earns: [
      "Deriving the relationship with a quick sketch instead of recalling it",
      "Striking an option because it contradicts itself",
    ],
    loses: ["Confusing a wide span with a tall structure because both sound like growth"],
  },

  "BT-08::centralisation": {
    title: "Recognising an argument for decentralisation",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an advantage of **decentralisation**?\n\nA  Decisions are made consistently across the organisation\nB  Local managers can respond quickly to conditions they can see\nC  It is easier to achieve economies of scale in purchasing\nD  Senior management retains close control over spending",
    plan: [
      {
        step: "Build the argument as two opposed columns",
        detail:
          "Centralisation: consistency, control, economies of scale, senior expertise applied everywhere. Decentralisation: speed, local responsiveness, motivation and development of junior managers, senior time freed for strategy.",
      },
      {
        step: "Read which side the stem asks for",
        detail:
          "Decentralisation. Three options will be the other column's advantages, and they will be correct statements — this question is entirely about which column, never about whether an option is true.",
      },
      {
        step: "Sort each option into a column",
        detail:
          "Consistency, scale economies and close central control are all reasons TO centralise. Only B — local speed and responsiveness — belongs to decentralisation.",
      },
      {
        step: "Sanity-check with the trade-off",
        detail:
          "Every advantage of one is a disadvantage of the other, so if an option reads as a benefit of both, it has been misread. B costs consistency; that trade is the reason the topic is examinable at all.",
      },
    ],
    answer:
      "**B — local managers can respond quickly to conditions they can see.**\n\nDecentralisation buys speed, local responsiveness, and the motivation and development of managers given real decisions to make. It frees senior management for strategy rather than day-to-day approvals.\n\nA, C and D are advantages of **centralisation**: consistency, purchasing economies of scale and tight central control over spending. All three are true statements, which is exactly why the question works — the discipline is sorting by column, not judging truth.",
    earns: ["Holding both columns so the wrong side is recognised immediately"],
    loses: ["Choosing a true statement without checking which side of the trade-off it sits on"],
  },

  "BT-08::functions-and-levels": {
    title: "Placing a decision on Anthony's hierarchy",
    format: "ot",
    marks: 2,
    requirement:
      "A production supervisor decides the order in which today's jobs will be run on a machine. In Anthony's hierarchy this is:\n\nA  Strategic planning\nB  Management control\nC  Operational control\nD  Corporate governance",
    plan: [
      {
        step: "Set out the three levels with their time horizons",
        detail:
          "Strategic planning: long term, whole organisation, set by senior management. Management control (tactical): medium term, resources used efficiently, middle management. Operational control: day to day, specific tasks, front line.",
      },
      {
        step: "Read the decision for its horizon and its scope",
        detail:
          "\"Today's jobs\" is a horizon of hours and the scope is one machine. Both point at the bottom level without needing any judgement about the supervisor's seniority.",
      },
      {
        step: "Use the level, not the job title, as the classifier",
        detail:
          "A senior manager choosing today's schedule is still making an operational decision. Anthony's hierarchy classifies DECISIONS, and matching on who made it is the usual way this question is lost.",
      },
      {
        step: "Strike the option that is not on the model",
        detail:
          "Corporate governance is not one of Anthony's three levels. An option from a different framework is a free elimination and appears often enough to be worth checking for.",
      },
    ],
    answer:
      "**C — operational control.**\n\nAnthony's hierarchy has three levels: **strategic planning** (long term, whole organisation), **management control** (medium term, resources obtained and used efficiently) and **operational control** (day to day, specific tasks carried out effectively).\n\nSequencing today's jobs on one machine is a matter of hours, affecting one process — operational on both the time and scope tests. Corporate governance is not a level of the model at all.",
    earns: [
      "Classifying the decision by horizon and scope rather than by the decider's rank",
      "Spotting an option imported from another framework",
    ],
    loses: ["Assuming a supervisor's decision must be management control because they are a manager"],
  },

  /* ── BT-09 · Organisational culture ──────────────────────────── */

  "BT-09::what-culture-is": {
    title: "What culture is, in the sense the syllabus means",
    format: "ot",
    marks: 1,
    requirement:
      "Organisational culture is best described as:\n\nA  The organisation's written code of conduct\nB  The shared values, beliefs and assumptions that shape how people behave\nC  The structure shown on the organisation chart\nD  The organisation's stated mission and objectives",
    plan: [
      {
        step: "Recall the short definition",
        detail:
          "Culture is the shared values, beliefs, assumptions and norms of an organisation — often summarised as \"the way we do things around here\". It is what people actually believe, not what is written down.",
      },
      {
        step: "Discard the written artefacts",
        detail:
          "A code of conduct, a chart and a mission statement are all documents. Culture may be expressed through them, and may equally contradict them, which is precisely why the distinction is examined.",
      },
      {
        step: "Confirm the survivor names beliefs rather than statements",
        detail:
          "B names values, beliefs and assumptions — things held in people's heads that shape behaviour. That is the definition, and the one-mark tariff means it needs no more analysis than that.",
      },
    ],
    answer:
      "**B — the shared values, beliefs and assumptions that shape how people behave.**\n\nCulture is commonly summarised as \"the way we do things around here\". It comes from the organisation's founders and history, its industry, its national setting and the behaviour its leaders actually reward.\n\nA code of conduct, a chart and a mission statement are artefacts. Culture may be expressed through them or may quietly contradict them — an organisation with an ethics code and a culture that punishes anyone who invokes it is the case that makes the difference matter.",
    earns: ["Separating what people believe from what the organisation has written down"],
    loses: ["Choosing the code of conduct because it is the document about behaviour"],
  },

  "BT-09::handy": {
    title: "Identifying a Handy culture from how decisions get made",
    format: "mtq",
    marks: 4,
    requirement:
      "Match each organisation to the Handy cultural type it displays.\n\n(i) A small firm where every significant decision is taken by the founder\n(ii) A government department where authority follows the rulebook and the job description\n(iii) A consultancy built around project teams assembled for each client\n(iv) A chambers of barristers sharing premises, each practising independently\n\nTypes: Power · Role · Task · Person",
    plan: [
      {
        step: "Tie each type to where authority sits",
        detail:
          "Power: with one central individual. Role: with the position, defined by rules and job descriptions. Task: with expertise, assembled around the job in hand. Person: with the individual professional, the organisation existing to serve them.",
      },
      {
        step: "Ask of each scenario: who decides, and on what authority?",
        detail:
          "One person deciding everything is power. The rulebook deciding is role. The project's needs deciding is task. Nobody deciding for anyone else is person.",
      },
      {
        step: "Watch the task/person pair, which is where marks go",
        detail:
          "Both involve skilled professionals. The split is whether they are organised AROUND a shared job — task — or merely share facilities while practising independently, which is person.",
      },
      {
        step: "Note the Greek-god names only if they are offered",
        detail:
          "Zeus, Apollo, Athena and Dionysus map to power, role, task and person. Handy's own labels are what the exam normally uses, but recognising both costs nothing.",
      },
    ],
    answer:
      "**(i) Power.** Authority radiates from one central figure; the organisation moves as fast as that person decides, and no faster.\n\n**(ii) Role.** Authority attaches to the position rather than the person, defined by rules and job descriptions. Predictable and stable, slow to adapt.\n\n**(iii) Task.** Authority follows expertise, with teams assembled around the job. Flexible, but harder to control and expensive to run.\n\n**(iv) Person.** The organisation exists to serve its members' own practices. Chambers, partnerships of professionals and co-operatives of specialists are the standard illustration.",
    earns: [
      "Answering \"who decides, and on what authority?\" for each scenario",
      "Splitting task from person on whether there is a shared job at all",
    ],
    loses: ["Calling the chambers a task culture because barristers are expert professionals"],
  },

  "BT-09::hofstede": {
    title: "Applying a Hofstede dimension to a management problem",
    format: "ot",
    marks: 2,
    requirement:
      "A company finds that in one country its staff are visibly uncomfortable questioning a manager's decision, while in another they challenge it routinely. This difference is best explained by which of Hofstede's dimensions?\n\nA  Individualism versus collectivism\nB  Power distance\nC  Uncertainty avoidance\nD  Masculinity versus femininity",
    plan: [
      {
        step: "Reduce each dimension to the question it answers",
        detail:
          "Power distance: how acceptable is unequal power? Individualism: do people see themselves as individuals or as group members? Uncertainty avoidance: how much does ambiguity distress people? Masculinity: are achievement or relationships valued more?",
      },
      {
        step: "Name the behaviour in the stem before matching",
        detail:
          "Willingness to challenge a superior is a statement about the acceptability of hierarchy. Naming it that way makes the match immediate rather than a comparison of four plausible options.",
      },
      {
        step: "Check the runner-up on its own definition",
        detail:
          "Collectivism could explain reluctance to stand out from a group — but the stem specifies a MANAGER, which makes the relationship vertical. Power distance is about vertical relationships; individualism is about the individual against the group.",
      },
      {
        step: "Remember the long-term orientation dimension exists",
        detail:
          "Hofstede's original four gained long-term versus short-term orientation and later indulgence versus restraint. It is not needed here, but a question offering five options may include it.",
      },
    ],
    answer:
      "**B — power distance.**\n\nPower distance measures how far a society accepts that power is distributed unequally. In a high power distance culture, questioning a superior is inappropriate regardless of whether the subordinate believes the decision is wrong; in a low power distance culture, challenge is expected and often welcomed.\n\nCollectivism is the strongest distractor, since it too can suppress dissent — but it concerns the individual's relationship to the GROUP, whereas the stem describes a relationship with a manager, which is vertical.",
    earns: ["Naming the behaviour as vertical or horizontal before choosing a dimension"],
    loses: ["Selecting collectivism whenever an answer involves reluctance to speak up"],
  },

  "BT-09::why-culture-matters": {
    title: "What culture does to strategy and control",
    format: "ot",
    marks: 2,
    requirement:
      "A company introduces a new control procedure that staff quietly ignore, continuing to work as they always have. This most clearly illustrates that:\n\nA  The procedure was badly drafted\nB  Culture can defeat formal controls\nC  The organisation is decentralised\nD  Staff require more training",
    plan: [
      {
        step: "Identify what the stem actually establishes",
        detail:
          "A formal control was introduced and behaviour did not change. That is all the evidence there is; anything beyond it — bad drafting, missing training — is an assumption the stem does not support.",
      },
      {
        step: "Pick the option that is a conclusion rather than a guess",
        detail:
          "A and D are possible explanations for the failure, but neither is established. B states what the facts show: the informal reality overrode the formal instruction.",
      },
      {
        step: "Check the irrelevant option",
        detail:
          "C says nothing about ignoring procedures — decentralised organisations have controls too, and staff following procedure would be equally consistent with decentralisation.",
      },
      {
        step: "Connect it to the syllabus point being tested",
        detail:
          "This is why culture appears in a paper about business systems: a control system is only as strong as the willingness to operate it, which is why the tone at the top runs through Areas B, C and F.",
      },
    ],
    answer:
      "**B — culture can defeat formal controls.**\n\nA control exists on paper and behaviour is unchanged, which is the standard demonstration that the informal organisation and its culture can override formal instruction. It is the reason \"tone at the top\" recurs across governance, internal control and ethics: a control system depends on people being willing to operate it.\n\nA and D are plausible explanations, but nothing in the stem establishes either. C is unconnected — decentralised organisations have controls, and following them would be just as consistent with decentralisation.",
    earns: ["Answering only from what the stem establishes, not from what might also be true"],
    loses: ["Choosing a plausible cause over the conclusion the evidence actually supports"],
  },

  /* ── BT-10 · Committees in business organisations ────────────── */

  "BT-10::why-committees": {
    title: "The purpose a committee serves that an individual cannot",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an advantage of taking a decision by committee rather than by an individual manager?\n\nA  The decision will be taken more quickly\nB  Responsibility for the decision is clearly assigned\nC  A wider range of expertise and viewpoints is brought to bear\nD  The cost of taking the decision is lower",
    plan: [
      {
        step: "List the committee's genuine advantages",
        detail:
          "Pooled knowledge and expertise, representation of different interests, co-ordination across functions, and greater acceptance of a decision that people helped to make.",
      },
      {
        step: "List the disadvantages, because three options come from there",
        detail:
          "Slow, expensive in management time, responsibility diffused so no one owns the outcome, and vulnerable to compromise decisions or to domination by one strong member.",
      },
      {
        step: "Sort each option into the right list",
        detail:
          "Speed, clear responsibility and low cost are all things committees are notably BAD at — they appear as options precisely because they are the individual manager's advantages.",
      },
      {
        step: "Confirm the survivor is on the advantages list",
        detail:
          "Bringing a wider range of expertise to bear is the first item on it, and is the reason committees exist despite everything on the other list.",
      },
    ],
    answer:
      "**C — a wider range of expertise and viewpoints is brought to bear.**\n\nCommittees pool knowledge, represent different interests, co-ordinate across functions, and produce decisions people are more willing to accept because they took part in making them.\n\nA, B and D name what committees are worst at. They are slow, they consume expensive management time, and responsibility becomes diffused — nobody personally owns a committee decision, which is the individual manager's clearest advantage.",
    earns: ["Holding both lists, since the distractors are all drawn from the opposite one"],
    loses: ["Assuming any group process must be better resourced and therefore faster"],
  },

  "BT-10::types": {
    title: "Telling one type of committee from another",
    format: "ot",
    marks: 2,
    requirement:
      "A committee is set up to investigate a single incident and to report its findings, after which it will be disbanded. This is:\n\nA  A standing committee\nB  An ad hoc committee\nC  An executive committee\nD  A joint committee",
    plan: [
      {
        step: "Sort the types by lifespan and by power",
        detail:
          "Standing: permanent, ongoing remit. Ad hoc: created for one task and dissolved. Executive: has power to act, not merely to advise. Joint: draws members from two or more bodies.",
      },
      {
        step: "Take the classifier from the stem's own words",
        detail:
          "\"A single incident\", \"report its findings\", \"will be disbanded\" — all three describe a limited life, which is the ad hoc committee's whole definition.",
      },
      {
        step: "Check whether a second type also applies",
        detail:
          "The committee reports rather than acts, so it is not executive. Nothing says it draws members from two organisations, so it is not joint. Only one option survives.",
      },
      {
        step: "Note that these categories can overlap",
        detail:
          "A real committee can be both joint and ad hoc. In an OT the stem gives the evidence for exactly one, so answer on what is stated rather than on what is possible.",
      },
    ],
    answer:
      "**B — an ad hoc committee.**\n\nAn ad hoc committee is formed for one specific task and dissolved once it has reported. The stem supplies all three markers: a single incident, a duty to report, and disbandment afterwards.\n\nA standing committee is permanent with a continuing remit. An executive committee has power to act rather than only to advise. A joint committee draws its members from two or more bodies — the categories can overlap in practice, but the stem gives evidence for one only.",
    earns: ["Classifying on lifespan when the stem specifies a beginning and an end"],
    loses: ["Choosing executive because the committee has a serious task"],
  },

  "BT-10::roles": {
    title: "Separating the chair's duties from the secretary's",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a duty of the committee **secretary** rather than the chair?\n\nA  Ruling on points of order\nB  Preparing the agenda and circulating it before the meeting\nC  Ensuring all members have an opportunity to speak\nD  Summarising the discussion before a vote is taken",
    plan: [
      {
        step: "Split the two roles on what each controls",
        detail:
          "The chair controls the MEETING: order, participation, keeping to the agenda, summarising, and putting matters to the vote. The secretary controls the PAPERWORK: agenda preparation and circulation, minutes, correspondence, and follow-up.",
      },
      {
        step: "Read which role the stem asks for",
        detail:
          "The secretary. Three options will be chair duties, and all four will be genuine committee duties — the sorting is by role, never by whether the duty is real.",
      },
      {
        step: "Test each option against the meeting/paperwork split",
        detail:
          "Ruling on order, ensuring participation and summarising all happen during the meeting and are the chair's. Preparing and circulating the agenda happens before it and is administrative.",
      },
      {
        step: "Note where the two roles touch",
        detail:
          "The agenda is usually drawn up by the secretary in consultation with the chair. The exam attributes preparation and circulation to the secretary, so answer on the standard division rather than on practice at any one organisation.",
      },
    ],
    answer:
      "**B — preparing the agenda and circulating it before the meeting.**\n\nThe secretary handles the administration: the agenda and its circulation, the minutes, the correspondence and the follow-up on actions. The chair runs the meeting itself — ruling on points of order, ensuring everyone is heard, keeping to the agenda, summarising and putting matters to the vote.\n\nThe two roles meet over the agenda, which is normally drawn up by the secretary in consultation with the chair, and the exam attributes its preparation and circulation to the secretary.",
    earns: ["Using the meeting-versus-paperwork split to sort every duty quickly"],
    loses: ["Assigning the agenda to the chair because the chair decides what is discussed"],
  },

  "BT-10::pros-and-cons": {
    title: "Recognising a specific committee weakness from a scenario",
    format: "ot",
    marks: 2,
    requirement:
      "A committee reaches a decision that no member believes is the best option, but which none of them objects to strongly. This weakness of committee decision-making is best described as:\n\nA  Diffusion of responsibility\nB  Compromise\nC  Domination by one member\nD  Excessive cost",
    plan: [
      {
        step: "Name the four weaknesses precisely",
        detail:
          "Slowness and cost; diffusion of responsibility so no one owns the outcome; compromise, where the decision is the least objectionable rather than the best; and domination by a forceful individual.",
      },
      {
        step: "Read the stem for the distinguishing symptom",
        detail:
          "\"No member believes it is best, none objects strongly\" is a decision chosen for its acceptability rather than its merit. That is the definition of the compromise weakness.",
      },
      {
        step: "Test the nearest alternative against the facts",
        detail:
          "Diffusion of responsibility is about who is accountable AFTERWARDS. The stem says nothing about accountability, only about how the option was chosen, so it does not fit.",
      },
      {
        step: "Rule out the two the stem contradicts or ignores",
        detail:
          "Domination would produce one member's preferred outcome, and here nobody prefers it. Cost is never mentioned.",
      },
    ],
    answer:
      "**B — compromise.**\n\nCommittees tend towards the option nobody will fight, which is rarely the option anybody thinks is best. The stem describes exactly that: a decision chosen for its acceptability rather than its merit.\n\nDiffusion of responsibility is a different weakness — it concerns who is accountable once the decision is made, which the stem does not touch. Domination would produce one member's preferred outcome, and the stem says no member believes the decision is best.",
    earns: ["Matching the stem's symptom to one named weakness rather than to the general idea that committees are flawed"],
    loses: ["Choosing diffusion of responsibility as a catch-all for anything a committee does badly"],
  },

  /* ── BT-11 · Governance, social responsibility, sustainability ─ */

  "BT-11::what-governance-is": {
    title: "What corporate governance is for",
    format: "ot",
    marks: 2,
    requirement:
      "Corporate governance is best described as:\n\nA  The day-to-day management of the company's operations\nB  The system by which companies are directed and controlled\nC  The company's compliance with accounting standards\nD  The board's duty to maximise the share price",
    plan: [
      {
        step: "Recall the standard formulation",
        detail:
          "The system by which companies are directed and controlled. Short, and deliberately wider than any single mechanism — it covers the board, its committees, and the relationship with shareholders and other stakeholders.",
      },
      {
        step: "Reject the option that is management rather than governance",
        detail:
          "Governance is about how those who run the company are held to account, not about running it. Day-to-day operations are management's job, and the separation is the whole point of the topic.",
      },
      {
        step: "Reject the two narrow options",
        detail:
          "Compliance with accounting standards is one small part of the reporting duty. Maximising share price is an objective some companies hold, not a description of a system.",
      },
      {
        step: "Connect it back to agency",
        detail:
          "Governance exists because ownership and control are separated: it is the machinery that keeps agents accountable to principals, which is why it follows the agency section in the syllabus.",
      },
    ],
    answer:
      "**B — the system by which companies are directed and controlled.**\n\nThat is the standard definition, and its breadth is deliberate: governance covers the board's composition and conduct, its committees, internal control, and the relationship with shareholders and wider stakeholders.\n\nGovernance exists because of the agency problem — ownership and control are separated, so machinery is needed to hold the agents accountable. A describes management rather than governance, C is one part of the reporting duty, and D is an objective rather than a system.",
    earns: ["Distinguishing directing and controlling the company from managing it"],
    loses: ["Reducing governance to compliance, which is one output of it"],
  },

  "BT-11::the-board": {
    title: "What makes a director independent, and why it matters",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would most seriously call into question a non-executive director's independence?\n\nA  They have served on the board for two years\nB  They hold a small number of shares in the company\nC  They were the company's finance director until last year\nD  They also serve as a non-executive director of an unrelated company",
    plan: [
      {
        step: "State what independence means before judging any option",
        detail:
          "Free from any relationship that could materially interfere with independent judgement. The test is the relationship's capacity to compromise judgement, not whether a rule has been broken.",
      },
      {
        step: "Recall the standard threats",
        detail:
          "Recent employment by the company, a material business relationship, significant shareholding, close family ties to executives, cross-directorships, and very long service.",
      },
      {
        step: "Rank the options by how directly each bites",
        detail:
          "Recent employment as an executive is the strongest: the director would be scrutinising decisions they themselves made. Long service is a threat but two years is short. A small shareholding is minor. An unrelated directorship is normal.",
      },
      {
        step: "Answer the superlative that was actually asked",
        detail:
          "The stem says \"most seriously\". Several options are threats to some degree, so the task is to rank them rather than to find the only one that qualifies.",
      },
    ],
    answer:
      "**C — they were the company's finance director until last year.**\n\nRecent employment as an executive is the most serious threat: the director would be reviewing and challenging decisions they personally made, and their relationships with the remaining executives are those of a former colleague.\n\nLong service is a recognised threat but two years is short. A small shareholding is minor and is often encouraged to align interests. Holding a non-executive role at an unrelated company is normal and brings useful experience.",
    earns: ["Ranking threats rather than treating the question as find-the-only-one"],
    loses: ["Choosing the shareholding because owning shares sounds like an obvious conflict"],
  },

  "BT-11::board-committees": {
    title: "Assigning a task to the right board committee",
    format: "mtq",
    marks: 4,
    requirement:
      "Match each task to the board committee responsible for it.\n\n(i) Reviewing the effectiveness of the internal control system\n(ii) Setting the pay package of the chief executive\n(iii) Identifying and recommending candidates for board vacancies\n(iv) Recommending the appointment and removal of the external auditor\n\nCommittees: Audit · Remuneration · Nomination",
    plan: [
      {
        step: "Give each committee a one-line remit",
        detail:
          "Audit: financial reporting integrity, internal control, internal audit, and the external auditor. Remuneration: executive pay. Nomination: board composition, appointments and succession.",
      },
      {
        step: "Note that two tasks belong to the audit committee",
        detail:
          "A matching task where one option is used twice is common, and refusing to reuse an option is a frequent cause of lost marks. Both (i) and (iv) are audit committee work.",
      },
      {
        step: "Remember why each committee is composed of non-executives",
        detail:
          "Executives cannot set their own pay, cannot appoint their own scrutineers, and cannot choose the auditor who examines their own reporting. The independence requirement explains every allocation here.",
      },
      {
        step: "Distinguish the nomination committee from HR",
        detail:
          "Nomination handles BOARD appointments and succession only. Recruitment below board level is management's job and never a committee task in these questions.",
      },
    ],
    answer:
      "**(i) Audit.** Reviewing the effectiveness of internal control, alongside financial reporting integrity and the internal audit function.\n\n**(ii) Remuneration.** Setting executive pay, composed of non-executives because executives cannot set their own.\n\n**(iii) Nomination.** Board composition, candidate identification and succession planning — board level only.\n\n**(iv) Audit.** Recommending the external auditor's appointment and removal, and overseeing their independence, so that the executives being audited do not choose their own auditor.",
    earns: [
      "Reusing the audit committee for two tasks rather than forcing a one-to-one match",
      "Explaining each allocation through the independence requirement",
    ],
    loses: [
      "Assigning (iv) to nomination because the word \"appointment\" appears in it",
      "Treating nomination as responsible for recruitment generally",
    ],
  },

  "BT-11::directors-duties": {
    title: "Identifying which duty a director has breached",
    format: "ot",
    marks: 2,
    requirement:
      "A director learns of a business opportunity through their position and takes it personally, without telling the board. The duty most clearly breached is the duty to:\n\nA  Exercise reasonable care, skill and diligence\nB  Avoid conflicts of interest\nC  Act within powers\nD  Promote the success of the company",
    plan: [
      {
        step: "List the duties as a set before reading the facts",
        detail:
          "Act within powers; promote the success of the company; exercise independent judgement; exercise reasonable care, skill and diligence; avoid conflicts of interest; not accept benefits from third parties; declare interests in proposed transactions.",
      },
      {
        step: "Find the duty the facts map onto most directly",
        detail:
          "Exploiting an opportunity that came to the director through the company sets the director's interest against the company's. That is a conflict of interest, and the corporate opportunity rule is its classic example.",
      },
      {
        step: "Acknowledge the other duties in play, then rank",
        detail:
          "Promoting the company's success is also engaged — the company lost the opportunity. But the stem asks which is MOST clearly breached, and the conflict duty describes the wrong precisely.",
      },
      {
        step: "Eliminate the two that do not fit the facts",
        detail:
          "Acting within powers concerns the constitution, which is not mentioned. Care, skill and diligence concerns competence, and nothing suggests the director was incompetent — they were disloyal.",
      },
    ],
    answer:
      "**B — avoid conflicts of interest.**\n\nTaking for yourself an opportunity that came to you through your position is the corporate opportunity rule, the standard illustration of the conflict duty. The director's personal interest is set directly against the company's, and the duty applies whether or not the company would have taken the opportunity itself.\n\nPromoting the success of the company is also engaged, but the conflict duty names the wrong exactly. Acting within powers concerns the constitution, and care and diligence concerns competence rather than loyalty.",
    earns: [
      "Holding the seven duties as a list, so the conflict duty is available as an answer",
      "Ranking when more than one duty is engaged, as the word \"most\" requires",
    ],
    loses: ["Choosing care, skill and diligence as a general-purpose answer for any director wrongdoing"],
  },

  "BT-11::csr-and-sustainability": {
    title: "Separating corporate social responsibility from compliance",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following best illustrates corporate social responsibility, as distinct from legal compliance?\n\nA  Paying the corporation tax due under the law\nB  Meeting the statutory minimum wage\nC  Voluntarily reducing emissions below the level regulation requires\nD  Filing the annual accounts by the statutory deadline",
    plan: [
      {
        step: "Fix the distinction on obligation",
        detail:
          "Compliance is what the organisation MUST do. Corporate social responsibility is what it chooses to do beyond that, in recognition of obligations to society wider than its legal ones.",
      },
      {
        step: "Apply a single test to each option",
        detail:
          "Ask whether the organisation would be penalised for not doing it. If yes, it is compliance and cannot be the answer however socially beneficial it is.",
      },
      {
        step: "Eliminate the three legal obligations",
        detail:
          "Tax, minimum wage and filing deadlines are all statutory. Each is a good thing to do and none of them is CSR, because none of them is voluntary.",
      },
      {
        step: "Confirm the survivor is genuinely beyond the requirement",
        detail:
          "Reducing emissions BELOW the regulated level is the distinguishing word. Meeting the regulated level would have been compliance, and the option is constructed so that one word carries the whole distinction.",
      },
    ],
    answer:
      "**C — voluntarily reducing emissions below the level regulation requires.**\n\nCorporate social responsibility is what an organisation does beyond its legal obligations, in recognition of a wider responsibility to society and the environment. The word doing the work here is **below** — meeting the regulated level would simply be compliance.\n\nTax, the minimum wage and filing deadlines are all statutory duties. They are things a responsible company does, but a company that only does them has demonstrated compliance rather than responsibility.",
    earns: ["Testing each option with \"would we be penalised for not doing it?\""],
    loses: ["Treating any socially beneficial act as CSR without checking whether it was required"],
  },
}
