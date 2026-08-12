/*
 * BT Area D — Leading and managing individuals and teams.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area D is the theorist area, and its distractors are almost always ANOTHER
 * THEORIST'S term: Herzberg's hygiene factors offered against Maslow's levels,
 * Belbin's roles against Tuckman's stages, McGregor's assumptions against Blake
 * and Mouton's grid. So the recurring move in these plans is to attach each
 * theory to the one question it answers before any option list is read — a
 * theory recalled without its question is exactly what a distractor exploits.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const BT_PLANS_D: ExamPlanMap = {
  /* ── BT-18 · Leadership, management and supervision ──────────── */

  "BT-18::management-vs-leadership": {
    title: "Separating the manager's job from the leader's",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is most characteristic of **leadership** rather than management?\n\nA  Allocating resources to tasks\nB  Creating a vision and inspiring others to pursue it\nC  Monitoring performance against budget\nD  Designing the organisation's reporting structure",
    plan: [
      {
        step: "Fix the distinction in one line each",
        detail:
          "Management is about coping with complexity — planning, organising, controlling, so that existing work is done properly. Leadership is about coping with change — direction, vision, influence and commitment.",
      },
      {
        step: "Read each option for which of the two it serves",
        detail:
          "Allocating resources, monitoring against budget and designing structure are all planning, organising and controlling. Each keeps existing work running rather than changing where it is going.",
      },
      {
        step: "Confirm the survivor is about influence, not authority",
        detail:
          "Creating a vision and inspiring people to follow it works through influence and willing commitment, which does not depend on holding a position. That is what makes it leadership rather than management.",
      },
      {
        step: "Hold the relationship the syllabus wants",
        detail:
          "They overlap and neither is superior. A manager without leadership gets compliance but no commitment; a leader without management gets enthusiasm and no delivery. Say this if the MTQ version asks.",
      },
    ],
    answer:
      "**B — creating a vision and inspiring others to pursue it.**\n\nManagement copes with complexity: planning, organising, commanding, co-ordinating and controlling, so that work already defined is done properly. Leadership copes with change: setting direction and influencing people to commit to it.\n\nThe key difference is the source of compliance. Management works through **authority** conferred by position; leadership works through **influence**, which is why someone with no formal authority can lead and someone with a great deal can fail to. The two overlap and neither is superior — a manager without leadership gets compliance but no commitment.",
    earns: ["Separating authority from influence as the underlying distinction"],
    loses: ["Treating leadership as simply senior management, so any strategic-sounding option looks right"],
  },

  "BT-18::classical-school": {
    title: "Attributing an idea to the right classical writer",
    format: "ot",
    marks: 2,
    requirement:
      "The identification of five functions of management — planning, organising, commanding, co-ordinating and controlling — is associated with:\n\nA  F W Taylor\nB  Henri Fayol\nC  Max Weber\nD  Elton Mayo",
    plan: [
      {
        step: "Attach each writer to their one central contribution",
        detail:
          "Fayol: the functions and principles of management. Taylor: scientific management, the one best way, work study and piece rates. Weber: bureaucracy and rational-legal authority. Mayo: the Hawthorne studies and human relations.",
      },
      {
        step: "Match the content in the stem to that list",
        detail:
          "Five functions of management is Fayol's, and it is his because he wrote about the manager's job as a whole rather than about the worker's task.",
      },
      {
        step: "Notice the odd one out in the option list",
        detail:
          "Taylor and Weber are classical; Mayo belongs to the human relations school entirely. An option from the opposing school is a free elimination on this topic.",
      },
      {
        step: "Guard against the Fayol/Taylor swap",
        detail:
          "Both are classical and both are about efficiency. Fayol looked DOWNWARD from the manager; Taylor looked at the worker's task. That direction is the reliable way to keep them apart.",
      },
    ],
    answer:
      "**B — Henri Fayol.**\n\nFayol identified the five functions of management — **planning, organising, commanding, co-ordinating and controlling** — along with fourteen principles of management, including unity of command and the scalar chain.\n\nTaylor is scientific management: studying the task to find the one best way, and paying by results. Weber described bureaucracy as the most rational form of organisation, resting on rational-legal authority. Mayo belongs to the human relations school, and his presence among three classical writers is a free elimination.\n\nFayol looked at the manager's job; Taylor looked at the worker's task. That direction is what keeps the two apart under pressure.",
    earns: ["Splitting Fayol from Taylor on whose work was being studied"],
    loses: ["Attributing the functions of management to Taylor because both are classical writers"],
  },

  "BT-18::mintzberg-drucker": {
    title: "Classifying a manager's activity as one of Mintzberg's roles",
    format: "ot",
    marks: 2,
    requirement:
      "A manager spends the morning settling a dispute between two members of their team. In Mintzberg's classification this is which category of role?\n\nA  Interpersonal\nB  Informational\nC  Decisional\nD  Entrepreneurial",
    plan: [
      {
        step: "Recall the three categories and their roles",
        detail:
          "Interpersonal: figurehead, leader, liaison. Informational: monitor, disseminator, spokesperson. Decisional: entrepreneur, disturbance handler, resource allocator, negotiator.",
      },
      {
        step: "Find the specific role before choosing the category",
        detail:
          "Settling a dispute is the **disturbance handler** role. Naming the role first makes the category follow automatically, and stops the answer being chosen on the general feel of the activity.",
      },
      {
        step: "Resist the interpersonal pull",
        detail:
          "The activity involves people, which makes A attractive. But interpersonal roles are about relationships and representation; handling a disturbance requires resolving it, which is a decision.",
      },
      {
        step: "Strike the option that is a role, not a category",
        detail:
          "Entrepreneurial is one of the decisional ROLES, not one of the three categories. Offering a role where a category was asked for is a standard construction on this topic.",
      },
    ],
    answer:
      "**C — decisional.**\n\nSettling a dispute is the **disturbance handler** role, one of Mintzberg's four decisional roles alongside entrepreneur, resource allocator and negotiator.\n\nInterpersonal is the tempting answer because the activity concerns people, but those roles — figurehead, leader, liaison — are about relationships and representation. Handling a disturbance means resolving it, which requires a decision. Option D names a decisional ROLE where the stem asked for a category.",
    earns: [
      "Naming the specific role first and letting the category follow",
      "Noticing an option that answers at the wrong level of the model",
    ],
    loses: ["Choosing interpersonal because the activity involves other people"],
  },

  "BT-18::human-relations": {
    title: "Recognising Theory X and Theory Y in a manager's behaviour",
    format: "ot",
    marks: 2,
    requirement:
      "A manager believes staff will avoid work unless closely supervised, and therefore checks every task personally. McGregor would describe this manager's assumptions as:\n\nA  Theory X\nB  Theory Y\nC  Hygiene factors\nD  Task-oriented",
    plan: [
      {
        step: "State both sets of assumptions",
        detail:
          "Theory X: people dislike work, avoid responsibility and must be directed, controlled and coerced. Theory Y: work is natural, people will exercise self-direction toward objectives they are committed to, and will seek responsibility.",
      },
      {
        step: "Match the belief rather than the behaviour",
        detail:
          "McGregor's theories are about the ASSUMPTIONS a manager holds. The stem gives the belief outright — staff avoid work unless supervised — so the match is direct.",
      },
      {
        step: "Note the self-fulfilling consequence",
        detail:
          "Close supervision removes discretion, so staff stop exercising it, which appears to confirm the assumption. That loop is why McGregor is examinable and is often the follow-on mark.",
      },
      {
        step: "Strike the terms belonging to other theorists",
        detail:
          "Hygiene factors are Herzberg's. Task-oriented belongs to leadership style models such as Blake and Mouton. Both are correct terms from the wrong theory, which is Area D's standard distractor.",
      },
    ],
    answer:
      "**A — Theory X.**\n\nMcGregor described two sets of assumptions. **Theory X** holds that people dislike work, avoid responsibility and must be directed and controlled; **Theory Y** holds that work is natural, that people will exercise self-direction toward objectives they are committed to, and that they will seek responsibility.\n\nThe stem states the belief directly. The point McGregor drew from it is that the assumption is self-fulfilling: close supervision removes discretion, staff stop exercising it, and the manager's belief appears confirmed.\n\nHygiene factors are Herzberg's and task orientation belongs to the leadership grid — both are real terms from other theories.",
    earns: ["Matching the manager's assumptions rather than their actions"],
    loses: ["Choosing a correct term that belongs to a different theorist"],
  },

  "BT-18::blake-mouton": {
    title: "Reading a position on the managerial grid",
    format: "ot",
    marks: 2,
    requirement:
      "On Blake and Mouton's managerial grid, a manager scoring 9 for concern for production and 1 for concern for people is described as:\n\nA  Country club management\nB  Task management (authority-compliance)\nC  Team management\nD  Impoverished management",
    plan: [
      {
        step: "Fix which axis is which, in the grid's own order",
        detail:
          "Concern for production is quoted FIRST, concern for people second. Reading them the wrong way round inverts the answer, and the options are built so that the inversion is available.",
      },
      {
        step: "Learn the four corners plus the middle",
        detail:
          "1,1 impoverished — minimum effort on both. 1,9 country club — people high, production low. 9,1 task or authority-compliance — production high, people low. 9,9 team — high on both. 5,5 middle of the road.",
      },
      {
        step: "Read the stem's numbers in the stated order",
        detail:
          "Production 9, people 1, giving 9,1. That is task management, where output is pursued with little attention to the people producing it.",
      },
      {
        step: "Check you have not selected the mirror image",
        detail:
          "Country club is 1,9 — the exact inversion. It is the answer for anyone who read the numbers in the wrong order, and it is offered for precisely that reason.",
      },
    ],
    answer:
      "**B — task management (authority-compliance).**\n\nThe grid plots concern for production against concern for people, quoted in that order. 9,1 is high concern for production with low concern for people: output is pursued through direction and control with little attention to the people producing it.\n\n**Country club** is its mirror image at 1,9 and is the option waiting for anyone who read the axes in the wrong order. **Impoverished** is 1,1, **team** is 9,9, and **middle of the road** is 5,5. Blake and Mouton regarded 9,9 as the effective style.",
    earns: ["Fixing the axis order before reading the numbers"],
    loses: ["Selecting country club by transposing the two scores"],
  },

  "BT-18::contingency": {
    title: "What a contingency theory of leadership claims",
    format: "ot",
    marks: 2,
    requirement:
      "Contingency theories of leadership hold that:\n\nA  There is one best leadership style for all situations\nB  The most effective style depends on the situation\nC  Leaders are born rather than made\nD  Leadership and management are the same activity",
    plan: [
      {
        step: "Translate the word \"contingency\" literally",
        detail:
          "Contingent means dependent on something else. So a contingency theory says effectiveness depends on circumstances, and the term itself carries the answer.",
      },
      {
        step: "Place the theory in its historical order",
        detail:
          "Trait theories said leaders are born. Style theories looked for the one best style. Contingency theories followed, arguing that the best style depends on the situation — which is why A and C are earlier schools.",
      },
      {
        step: "Name the variables the situation consists of",
        detail:
          "The nature of the task, the maturity and competence of the subordinates, the leader's own position power, and time pressure. This is what a follow-on question asks for.",
      },
      {
        step: "Discard the option about a different debate",
        detail:
          "Whether leadership and management are the same is a separate question, and no contingency theory takes a position on it.",
      },
    ],
    answer:
      "**B — the most effective style depends on the situation.**\n\nContingency theory holds that no single style is best: effectiveness depends on the task, the maturity and competence of the subordinates, the leader's position power and the time available. Where a decision is urgent and staff are inexperienced, a directive style works; where staff are expert and committed, a participative one does.\n\nA is style theory and C is trait theory — both earlier schools that contingency theory was formulated against. D belongs to a separate debate.",
    earns: ["Reading the meaning of \"contingency\" out of the word itself"],
    loses: ["Confusing contingency theory with the style theories it superseded"],
  },

  "BT-18::delegation": {
    title: "What can be delegated and what cannot",
    format: "ot",
    marks: 2,
    requirement:
      "A manager delegates a task to a subordinate. Which of the following does the manager **retain**?\n\nA  Authority for the task\nB  Responsibility for carrying out the task\nC  Accountability for the outcome\nD  Nothing — all three pass to the subordinate",
    plan: [
      {
        step: "Define the three terms separately",
        detail:
          "Authority: the right to act. Responsibility: the obligation to do the work. Accountability: being answerable for the result to whoever delegated. Three different things, and the question depends entirely on the difference.",
      },
      {
        step: "Fix the rule as a single sentence",
        detail:
          "Authority and responsibility can be delegated; accountability cannot. The manager remains answerable upward for the outcome whatever the subordinate does.",
      },
      {
        step: "Say why accountability is the one that stays",
        detail:
          "The manager chose the person, defined the task and set the controls. If accountability passed down, delegation would let any manager escape answerability by handing work on.",
      },
      {
        step: "Name what the answer implies for practice",
        detail:
          "Because accountability stays, the manager must brief properly, delegate enough authority to do the job, and monitor without taking the task back. Delegating without authority is the classic failure.",
      },
    ],
    answer:
      "**C — accountability for the outcome.**\n\n**Authority** (the right to act) and **responsibility** (the obligation to do the work) can both be delegated. **Accountability** cannot: the manager remains answerable upward for the result.\n\nThe reason is structural — the manager chose the person, defined the task and set the controls. If accountability passed down with the work, delegation would let any manager escape answerability by handing it on.\n\nIt follows that the manager must brief properly, delegate enough authority to make the task possible, and monitor without taking it back. Delegating responsibility without authority is the classic failure, and it is often the follow-on question.",
    earns: [
      "Holding authority, responsibility and accountability as three distinct things",
      "Explaining why accountability cannot pass, rather than only asserting it",
    ],
    loses: ["Treating responsibility and accountability as synonyms, which collapses the question"],
  },

  /* ── BT-19 · Recruitment and selection ───────────────────────── */

  "BT-19::recruitment-vs-selection": {
    title: "Which stage of the process an activity belongs to",
    format: "ot",
    marks: 1,
    requirement:
      "Placing an advertisement for a vacancy is part of:\n\nA  Selection\nB  Recruitment\nC  Induction\nD  Appraisal",
    plan: [
      {
        step: "Define the two stages by their direction",
        detail:
          "Recruitment ATTRACTS a pool of candidates — job analysis, job description, person specification, advertising. Selection CHOOSES from that pool — shortlisting, interviews, tests, references.",
      },
      {
        step: "Ask whether the activity widens or narrows the field",
        detail:
          "Advertising brings more people in, so it widens. Anything that narrows the field towards one appointment is selection.",
      },
      {
        step: "Place the two later-stage options",
        detail:
          "Induction happens after appointment, settling the new employee in. Appraisal happens periodically once in post. Neither concerns filling the vacancy.",
      },
    ],
    answer:
      "**B — recruitment.**\n\nRecruitment is the process of **attracting** suitable candidates: job analysis, the job description and person specification, and advertising the vacancy. Selection is **choosing** among them: shortlisting, interviewing, testing and taking references.\n\nThe quick test is whether the activity widens the field or narrows it. Advertising widens it. Induction follows appointment, and appraisal follows appointment by longer still.",
    earns: ["Splitting the two stages on whether the field widens or narrows"],
    loses: ["Treating recruitment as a general word for the whole hiring process"],
  },

  "BT-19::internal-vs-external": {
    title: "Weighing internal against external recruitment",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is an advantage of recruiting **externally** rather than internally?\n\nA  The candidate is already familiar with the organisation's procedures\nB  New skills and fresh perspectives are brought into the organisation\nC  It is quicker and cheaper\nD  It motivates existing staff by showing promotion is possible",
    plan: [
      {
        step: "Build both columns before reading the options",
        detail:
          "Internal: cheaper, faster, candidate is known and knows the organisation, motivates staff through visible promotion. External: new skills and ideas, a larger pool, avoids internal rivalry, brings in experience the organisation lacks.",
      },
      {
        step: "Read which side the stem asks for and expect the other's items",
        detail:
          "External. Three options will be internal advantages, and all four will be true statements — the sorting is by column, exactly as with centralisation.",
      },
      {
        step: "Sort each option",
        detail:
          "Familiarity with procedures, speed and cost, and motivating existing staff are all internal advantages. Only new skills and fresh perspectives belongs to external recruitment.",
      },
      {
        step: "Hold the counterpart cost in mind",
        detail:
          "External recruitment's main drawback is the mirror of B — a longer settling-in period and a demotivating effect on staff passed over. The MTQ version usually wants one of each.",
      },
    ],
    answer:
      "**B — new skills and fresh perspectives are brought into the organisation.**\n\nExternal recruitment widens the pool, brings in skills and experience the organisation does not have, introduces fresh thinking, and avoids the rivalry an internal promotion can create.\n\nA, C and D are all advantages of recruiting **internally**: the candidate is known and knows the organisation, the process is quicker and cheaper, and visible promotion motivates existing staff. External recruitment's mirror-image drawbacks are a longer settling-in period and the demotivating effect on those passed over.",
    earns: ["Holding both columns so the opposite side's items are recognised instantly"],
    loses: ["Choosing a true statement without checking which side of the comparison it sits on"],
  },

  "BT-19::selection-methods": {
    title: "Judging a selection method on validity and reliability",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is the main advantage of a **structured** interview over an unstructured one?\n\nA  It is quicker to conduct\nB  Candidates are asked the same questions, making comparison fairer and more reliable\nC  It requires less preparation\nD  It allows the interviewer to rely on first impressions",
    plan: [
      {
        step: "Name what the structure is FOR",
        detail:
          "Asking every candidate the same predetermined questions against the same criteria. Everything the method gains follows from that one design feature.",
      },
      {
        step: "Recall the weaknesses of interviewing that structure exists to reduce",
        detail:
          "The halo effect, first-impression bias, the mirror-image effect where interviewers favour people like themselves, and simple inconsistency between candidates.",
      },
      {
        step: "Reject options that describe the unstructured method's supposed benefits",
        detail:
          "Structure takes MORE preparation, not less, and often more time. C and A invert the trade-off, which is that structure costs effort and buys comparability.",
      },
      {
        step: "Strike the option describing a bias",
        detail:
          "Relying on first impressions is a recognised interviewing WEAKNESS. An option offering a known flaw as a benefit can be eliminated without weighing it.",
      },
    ],
    answer:
      "**B — candidates are asked the same questions, making comparison fairer and more reliable.**\n\nStructure means predetermined questions assessed against predetermined criteria, so candidates are compared on the same basis. That reduces the halo effect, first-impression bias and the mirror-image effect, and it makes the process more defensible if a decision is challenged.\n\nA and C invert the trade-off: structure requires more preparation, not less. D offers a recognised weakness of interviewing as though it were a benefit.",
    earns: ["Reasoning from the biases the method is designed to reduce"],
    loses: ["Choosing an option that presents a known interviewing flaw as an advantage"],
  },

  "BT-19::induction": {
    title: "What induction is for and who does it",
    format: "ot",
    marks: 2,
    requirement:
      "The main purpose of a formal induction programme is to:\n\nA  Assess whether the new employee should have been appointed\nB  Help the new employee become effective and integrated quickly\nC  Provide the technical training needed for promotion\nD  Set objectives for the next appraisal period",
    plan: [
      {
        step: "Place induction on the employment timeline",
        detail:
          "It follows appointment and precedes ongoing training and appraisal. Its window is the first days and weeks, which limits what it can sensibly be for.",
      },
      {
        step: "State its two objectives",
        detail:
          "Making the new employee productive as quickly as possible, and integrating them socially so they settle and stay. Reducing early leaving is the standard justification.",
      },
      {
        step: "Strike the option that reopens the appointment",
        detail:
          "Induction is not a further assessment. The decision has been made, and reassessment belongs to probation and appraisal, which are separate processes.",
      },
      {
        step: "Separate induction from later development",
        detail:
          "Technical training for promotion is development, which comes later and continues. Setting appraisal objectives belongs to the performance management cycle.",
      },
    ],
    answer:
      "**B — help the new employee become effective and integrated quickly.**\n\nInduction has two objectives: making the new employee productive as quickly as possible, and integrating them into the organisation socially so that they settle. Its usual justification is reducing early leaving, which is expensive because the recruitment cost has been incurred and no return has been earned.\n\nIt typically covers terms and conditions, health and safety, the organisation's structure and culture, and introductions to colleagues. It is not a reassessment of the appointment, and it is distinct from later development and from the appraisal cycle.",
    earns: ["Placing the activity on the employment timeline before judging its purpose"],
    loses: ["Treating induction as a probationary assessment"],
  },

  /* ── BT-20 · Individual, group and team behaviour ────────────── */

  "BT-20::individual-behaviour": {
    title: "What shapes how a person behaves at work",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a **personality** factor rather than a situational factor affecting an individual's behaviour at work?\n\nA  The style of their immediate supervisor\nB  Their degree of extroversion\nC  The physical layout of the office\nD  The organisation's reward system",
    plan: [
      {
        step: "Split the influences into the person and the situation",
        detail:
          "Individual factors travel with the person: personality, perception, attitudes, intelligence and skills. Situational factors are features of the setting: supervision, group norms, reward systems, physical conditions.",
      },
      {
        step: "Apply the portability test",
        detail:
          "Ask whether the factor would follow this person to a different job in a different organisation. If it would, it is individual; if it belongs to the workplace, it is situational.",
      },
      {
        step: "Sort the options with that test",
        detail:
          "A supervisor, an office layout and a reward system all stay behind when the person leaves. Extroversion goes with them, so it is a personality factor.",
      },
      {
        step: "Note why the split matters",
        detail:
          "Management can change situational factors and can rarely change personality — which is why selection matters so much, and why the syllabus puts this beside recruitment.",
      },
    ],
    answer:
      "**B — their degree of extroversion.**\n\nIndividual factors travel with the person: personality, perception, attitudes, intelligence and skills. Situational factors belong to the setting: supervisory style, group norms, reward systems and physical conditions.\n\nThe test is portability — would this factor follow the person to a different employer? Extroversion would; a supervisor, an office layout and a reward system would not.\n\nThe distinction matters because management can change situational factors and can rarely change personality, which is why getting selection right carries so much weight.",
    earns: ["Using the portability test rather than judging which factor sounds more personal"],
    loses: ["Classifying reward systems as individual because they act on the individual"],
  },

  "BT-20::groups-vs-teams": {
    title: "What makes a group a team",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following most clearly distinguishes a **team** from a group?\n\nA  Its members work in the same location\nB  Its members share a common purpose and hold themselves mutually accountable for the result\nC  It has a formally appointed leader\nD  It has more than five members",
    plan: [
      {
        step: "State what a group is first",
        detail:
          "Any collection of people who see themselves as a unit. That is a low bar, and everything about teams is what has to be added to it.",
      },
      {
        step: "Name what a team adds",
        detail:
          "A common purpose, complementary skills, interdependence in the work, and mutual accountability for the outcome. Mutual accountability is the element groups most clearly lack.",
      },
      {
        step: "Test each option for whether a group could have it too",
        detail:
          "A group can share a location, have an appointed leader and have any number of members. Anything a group can also have cannot be the distinguishing feature.",
      },
      {
        step: "Confirm the survivor with a counter-example",
        detail:
          "People sharing an office who each answer only for their own work are a group, not a team, however co-located and well led. That settles it.",
      },
    ],
    answer:
      "**B — its members share a common purpose and hold themselves mutually accountable for the result.**\n\nA group is any collection of people who see themselves as a unit. A **team** adds a common purpose, complementary and interdependent skills, and — most distinctively — **mutual accountability**: members answer for the team's result, not only for their own part.\n\nLocation, leadership and size are all things a group can have equally. People sharing an office who each answer only for their own work are a group however well led they are.",
    earns: ["Eliminating any feature a group could also possess"],
    loses: ["Choosing a formal leader, which describes formality rather than teamwork"],
  },

  "BT-20::tuckman": {
    title: "Identifying a Tuckman stage from a team's behaviour",
    format: "ot",
    marks: 2,
    requirement:
      "A newly formed project team is arguing openly about who should lead and whose approach should be followed. In Tuckman's model the team is at the stage of:\n\nA  Forming\nB  Storming\nC  Norming\nD  Performing",
    plan: [
      {
        step: "Set out the stages with the behaviour that marks each",
        detail:
          "Forming: polite, uncertain, dependent on the leader. Storming: conflict over roles, leadership and approach. Norming: agreement on how to work, norms settle. Performing: energy goes into the task. Adjourning: the team disbands.",
      },
      {
        step: "Read the stem for the observed behaviour, not the timing",
        detail:
          "Open conflict about leadership and approach is storming's defining behaviour. \"Newly formed\" tempts a candidate towards forming, but the model is defined by behaviour, not by elapsed time.",
      },
      {
        step: "Check forming against the actual description",
        detail:
          "Forming is characterised by politeness and caution while members work out what is expected. Open argument is the opposite, so the stage has already been passed.",
      },
      {
        step: "Remember the fifth stage exists",
        detail:
          "Tuckman later added adjourning (sometimes called mourning). It is not needed here, but a question offering five stages may include it and its absence from the original four catches people out.",
      },
    ],
    answer:
      "**B — storming.**\n\nStorming is the stage of open conflict over leadership, roles and approach — precisely what the stem describes. It is a normal and necessary stage: a team that never storms usually has unresolved disagreement rather than none.\n\n**Forming** is polite and cautious while members work out what is expected, so open argument means it has been passed. **Norming** follows storming once ways of working are agreed, and **performing** is when the energy goes into the task. **Adjourning** was added later as a fifth stage.",
    earns: ["Reading the stage off the behaviour rather than off how long the team has existed"],
    loses: ["Choosing forming because the team is described as newly formed"],
  },

  "BT-20::belbin": {
    title: "Matching a contribution to a Belbin team role",
    format: "ot",
    marks: 2,
    requirement:
      "A team member consistently generates original ideas and unorthodox solutions, but is impatient with detail. In Belbin's terms this person is a:\n\nA  Plant\nB  Completer-finisher\nC  Co-ordinator\nD  Resource investigator",
    plan: [
      {
        step: "Recall the roles by contribution, and note that each has an allowable weakness",
        detail:
          "Plant: creative, unorthodox, poor at detail. Resource investigator: explores outside contacts, loses enthusiasm. Co-ordinator: clarifies goals, delegates. Completer-finisher: checks detail, reluctant to delegate.",
      },
      {
        step: "Read both halves of the description",
        detail:
          "Original ideas AND impatience with detail. Belbin pairs each strength with its allowable weakness, so a stem giving both is naming one role precisely.",
      },
      {
        step: "Match strength and weakness to the same role",
        detail:
          "Creativity with unorthodoxy and weak attention to detail is the plant. If only the strength matched, more than one role would fit — the weakness is what makes it unambiguous.",
      },
      {
        step: "Reject the direct opposite",
        detail:
          "Completer-finisher is the plant's mirror image: obsessive about detail, not a source of new ideas. It is offered because it is the role the second half of the stem explicitly rules out.",
      },
    ],
    answer:
      "**A — plant.**\n\nBelbin's plant is the creative, unorthodox source of ideas, whose allowable weakness is a disregard for detail and practicalities. The stem gives both halves, which is what makes the identification unambiguous.\n\n**Resource investigator** explores contacts and opportunities outside the team and tends to lose enthusiasm. **Co-ordinator** clarifies goals and delegates. **Completer-finisher** is the plant's opposite — meticulous about detail and not a source of new ideas.\n\nBelbin's point is that a team needs a spread of roles: a team of plants generates ideas nobody finishes.",
    earns: ["Matching the allowable weakness as well as the strength"],
    loses: ["Choosing a role on the strength alone, where several would fit"],
  },

  "BT-20::effectiveness": {
    title: "Recognising groupthink as the cost of cohesion",
    format: "ot",
    marks: 2,
    requirement:
      "A highly cohesive management team consistently reaches unanimous decisions, and members who privately have doubts do not raise them. This is best described as:\n\nA  Groupthink\nB  Norming\nC  Role conflict\nD  Effective teamwork",
    plan: [
      {
        step: "Read the two facts the stem pairs",
        detail:
          "High cohesion, and doubts going unvoiced. Cohesion alone is a strength; the second fact is what turns it into a defect, and both are needed to name the phenomenon.",
      },
      {
        step: "Name the specific term for that pairing",
        detail:
          "Groupthink: cohesion suppresses dissent, so the group converges on a decision without properly testing it and becomes more confident than the evidence warrants.",
      },
      {
        step: "Reject the option that describes only the good half",
        detail:
          "D is the trap. Unanimity looks like effectiveness, and cohesion genuinely improves communication and morale — but a team where doubts are not voiced has stopped testing its decisions.",
      },
      {
        step: "Strike the terms from other models",
        detail:
          "Norming is a Tuckman stage about agreeing ways of working. Role conflict is incompatible demands on one person. Neither describes suppressed dissent.",
      },
    ],
    answer:
      "**A — groupthink.**\n\nGroupthink is the failure mode of a highly cohesive group: the desire to maintain agreement suppresses dissent, so decisions are not properly tested and the group becomes more confident than the evidence supports. The stem gives both halves — high cohesion, and unvoiced doubts.\n\nD is the deliberate trap. Cohesion improves communication, morale and retention, and unanimity looks like effectiveness; the defect only appears in the second fact.\n\nNorming is a Tuckman stage about agreeing ways of working. Role conflict is incompatible demands placed on one person.",
    earns: ["Requiring both facts — the cohesion and the suppressed dissent — before naming groupthink"],
    loses: ["Reading unanimity as evidence that the team is working well"],
  },

  /* ── BT-21 · Motivating individuals and groups ───────────────── */

  "BT-21::what-motivation-is": {
    title: "What motivation is, and why it is a management concern",
    format: "ot",
    marks: 1,
    requirement:
      "Motivation is best described as:\n\nA  The level of pay an employee receives\nB  The internal drive that causes a person to act toward a goal\nC  The quality of an employee's performance\nD  The organisation's system of rewards",
    plan: [
      {
        step: "Locate motivation as a cause, not an outcome",
        detail:
          "It is what drives behaviour. Performance is the result and reward is one possible input, so an option naming either is describing something adjacent to motivation rather than motivation itself.",
      },
      {
        step: "Reject the two that name inputs",
        detail:
          "Pay and the reward system may influence motivation but are not it. Herzberg's whole argument is that pay can be present in abundance without motivating anyone.",
      },
      {
        step: "Reject the outcome",
        detail:
          "Performance depends on motivation but also on ability, training and resources. A motivated employee without the skill still performs poorly, which is why the two must stay separate.",
      },
    ],
    answer:
      "**B — the internal drive that causes a person to act toward a goal.**\n\nMotivation is the cause of behaviour: the drive that makes someone act, and persist, toward a goal. It matters to management because effort is largely discretionary — the difference between the minimum acceptable and someone's best is not something authority can compel.\n\nPay and reward systems are possible influences, and Herzberg's argument is precisely that pay can be abundant without motivating. Performance is the outcome, and it depends on ability, training and resources as well as on motivation.",
    earns: ["Separating the drive from its inputs and from its outcome"],
    loses: ["Equating motivation with pay, which the theories in this chapter exist to complicate"],
  },

  "BT-21::maslow": {
    title: "Placing a need on Maslow's hierarchy",
    format: "ot",
    marks: 2,
    requirement:
      "An employee values their job title and the recognition it brings among colleagues. In Maslow's hierarchy this is a need at the level of:\n\nA  Safety\nB  Social (belonging)\nC  Esteem\nD  Self-actualisation",
    plan: [
      {
        step: "List the five levels in order",
        detail:
          "Physiological, safety, social or belonging, esteem, self-actualisation. The order matters because Maslow's claim is that a level only motivates once those below it are broadly satisfied.",
      },
      {
        step: "Attach a workplace example to each",
        detail:
          "Physiological: pay for basic living. Safety: job security, safe conditions. Social: colleagues, team membership. Esteem: status, recognition, job title. Self-actualisation: growth and challenging work.",
      },
      {
        step: "Split esteem from social, which is where marks go",
        detail:
          "Social is about being ACCEPTED by a group. Esteem is about being VALUED highly within it. Recognition and status are esteem; wanting to belong at all is social.",
      },
      {
        step: "Check the self-actualisation boundary",
        detail:
          "Self-actualisation is about fulfilling one's own potential, not about how others see you. A need that depends on other people's regard is esteem, not self-actualisation.",
      },
    ],
    answer:
      "**C — esteem.**\n\nEsteem needs cover status, recognition, reputation and the respect of others, and a job title valued for the recognition it brings is squarely there.\n\nThe distinction to hold is that **social** needs are about being accepted by a group, while **esteem** is about being valued highly within it. **Self-actualisation** concerns fulfilling one's own potential and does not depend on others' regard.\n\nMaslow's argument is that a satisfied need stops motivating, which is why a pay rise that solves a real problem motivates and the next one often does not.",
    earns: ["Splitting social from esteem on acceptance versus regard"],
    loses: ["Placing recognition under social because it involves other people"],
  },

  "BT-21::herzberg": {
    title: "Sorting hygiene factors from motivators",
    format: "ot",
    marks: 2,
    requirement:
      "According to Herzberg, which of the following is a **motivator** rather than a hygiene factor?\n\nA  Salary\nB  Company policy\nC  Responsibility\nD  Working conditions",
    plan: [
      {
        step: "State Herzberg's central claim before sorting anything",
        detail:
          "The two are not opposite ends of one scale. Hygiene factors cause dissatisfaction when poor but do not motivate when good; motivators create satisfaction and come from the work itself.",
      },
      {
        step: "Sort by where the factor comes from",
        detail:
          "Hygiene factors surround the job: pay, policy, supervision, working conditions, job security, relationships. Motivators are in the job: achievement, recognition, the work itself, responsibility, advancement, growth.",
      },
      {
        step: "Apply the context test to each option",
        detail:
          "Salary, company policy and working conditions all surround the work. Responsibility is part of the work itself, which places it among the motivators.",
      },
      {
        step: "Be ready for the consequence, which is the follow-on mark",
        detail:
          "Fixing hygiene factors removes dissatisfaction and stops there. To motivate you must enrich the job — more responsibility, more scope, more complete tasks — which is why Herzberg leads into job design.",
      },
    ],
    answer:
      "**C — responsibility.**\n\nHerzberg's motivators come from the work itself: achievement, recognition, the work, **responsibility**, advancement and growth. Hygiene factors surround the work: pay, company policy, supervision, working conditions, security and relationships.\n\nThe central claim is that the two are not opposite ends of one scale. Poor hygiene factors cause dissatisfaction; fixing them removes the dissatisfaction and produces no motivation. Salary is the case that makes this vivid — it is a hygiene factor, so a pay rise removes a grievance without motivating anybody.\n\nIt follows that motivation requires **job enrichment**: more responsibility and more complete tasks.",
    earns: [
      "Sorting on whether the factor is in the work or around it",
      "Knowing salary is a hygiene factor, which is the most frequently tested single point",
    ],
    loses: ["Assuming pay must be a motivator because it obviously affects behaviour"],
  },

  "BT-21::mcclelland-vroom-equity": {
    title: "Choosing the theory that explains the behaviour described",
    format: "ot",
    marks: 2,
    requirement:
      "An employee learns that a colleague doing similar work is paid more, and reduces their own effort as a result. This is best explained by:\n\nA  Expectancy theory\nB  Equity theory\nC  Maslow's hierarchy\nD  McClelland's theory of needs",
    plan: [
      {
        step: "Reduce each theory to the question it answers",
        detail:
          "Equity: am I treated fairly COMPARED WITH others? Expectancy: will effort produce a result I want? Maslow: which need is currently unsatisfied? McClelland: which of achievement, affiliation or power drives this person?",
      },
      {
        step: "Find the mechanism the stem describes",
        detail:
          "A comparison with a colleague, followed by a reduction in effort. The comparison is the whole mechanism, and only one theory is built on comparison.",
      },
      {
        step: "Check the strongest alternative",
        detail:
          "Expectancy concerns the link between effort, performance and a valued reward. Nothing in the stem says the employee doubts that link — the objection is to the relative outcome.",
      },
      {
        step: "Name the predicted response, since the follow-on asks for it",
        detail:
          "Perceived inequity is resolved by reducing input, seeking a higher outcome, changing the comparison, or leaving. Reduced effort is the first of these.",
      },
    ],
    answer:
      "**B — equity theory.**\n\nEquity theory holds that people compare their own ratio of inputs to outcomes with that of others. Perceived inequity creates tension, resolved by reducing input, pressing for a higher outcome, changing the comparison, or leaving. Reducing effort is the first of those.\n\n**Expectancy theory** concerns whether effort will lead to performance and to a reward the person values — nothing in the stem questions that link. **Maslow** identifies which need is unsatisfied, and **McClelland** which of achievement, affiliation or power drives the individual. Neither turns on comparison with a colleague.",
    earns: ["Identifying comparison as the mechanism and matching the only theory built on it"],
    loses: ["Choosing expectancy theory as a general-purpose answer for any reward question"],
  },

  "BT-21::rewards-and-job-design": {
    title: "Telling job enrichment from job enlargement",
    format: "ot",
    marks: 2,
    requirement:
      "A employee who assembled one component is given responsibility for planning their own work, checking their own quality and dealing with the internal customer. This is an example of:\n\nA  Job enlargement\nB  Job enrichment\nC  Job rotation\nD  Delayering",
    plan: [
      {
        step: "Split the three job design terms on direction",
        detail:
          "Enlargement adds more tasks at the SAME level — horizontal. Enrichment adds depth: planning, decision-making, control over one's own work — vertical. Rotation moves the person between different jobs.",
      },
      {
        step: "Read the stem for depth or breadth",
        detail:
          "Planning, checking quality and dealing with the customer are all responsibilities that previously sat with a supervisor. That is vertical loading, so enrichment.",
      },
      {
        step: "Test the enlargement reading and reject it",
        detail:
          "If the employee had been given two more components to assemble, that would be enlargement — more of the same kind of work. The stem gives different KINDS of responsibility.",
      },
      {
        step: "Connect it back to Herzberg",
        detail:
          "Enrichment is Herzberg's prescription: motivation comes from the work itself, so adding responsibility and achievement motivates where improving hygiene factors does not.",
      },
    ],
    answer:
      "**B — job enrichment.**\n\nEnrichment loads the job **vertically**: it adds planning, decision-making and control that previously belonged to a supervisor, which is exactly what the stem describes. It is Herzberg's prescription, since motivation comes from the work itself.\n\n**Enlargement** loads horizontally — more tasks at the same level, such as two more components to assemble. **Rotation** moves the person between different jobs to relieve monotony and broaden experience. **Delayering** removes management levels from the structure and is not a job design technique at all.",
    earns: ["Splitting enrichment from enlargement on vertical versus horizontal loading"],
    loses: ["Treating any increase in a job's content as enlargement"],
  },

  /* ── BT-22 · Learning, training and appraisal ────────────────── */

  "BT-22::learning": {
    title: "Recognising a stage of Kolb's learning cycle",
    format: "ot",
    marks: 2,
    requirement:
      "In Kolb's experiential learning cycle, the stage at which the learner considers what happened and why is:\n\nA  Concrete experience\nB  Reflective observation\nC  Abstract conceptualisation\nD  Active experimentation",
    plan: [
      {
        step: "Set the cycle out in order with a plain-English gloss",
        detail:
          "Concrete experience — do it. Reflective observation — think about what happened. Abstract conceptualisation — draw a general principle. Active experimentation — try the principle out. Then round again.",
      },
      {
        step: "Match the stem's description to the gloss",
        detail:
          "\"Considers what happened and why\" is thinking about the experience, which is reflective observation. The stem is effectively a paraphrase of the stage name.",
      },
      {
        step: "Guard the reflection/conceptualisation boundary",
        detail:
          "Reflection looks back at THIS experience. Conceptualisation generalises into a principle applicable elsewhere. The stem stays with what happened, so it has not reached the general stage.",
      },
      {
        step: "Note that the cycle can be entered anywhere",
        detail:
          "Kolb's point is that learning requires all four stages, not that it must start at one. Honey and Mumford's four learning styles map onto the four stages, and are examined alongside it.",
      },
    ],
    answer:
      "**B — reflective observation.**\n\nKolb's cycle runs concrete experience → reflective observation → abstract conceptualisation → active experimentation, and back round. Reflective observation is where the learner reviews what happened and why.\n\nThe boundary to hold is that reflection stays with **this** experience, while abstract conceptualisation generalises it into a principle that applies elsewhere. Kolb's argument is that learning requires all four stages — experience without reflection teaches nothing, and theory without experimentation is never tested.\n\nHoney and Mumford's activist, reflector, theorist and pragmatist styles map onto the four stages.",
    earns: ["Distinguishing reflecting on one event from generalising a principle"],
    loses: ["Choosing abstract conceptualisation because reflection sounds theoretical"],
  },

  "BT-22::training-vs-development": {
    title: "Which of training, development or education a case describes",
    format: "ot",
    marks: 2,
    requirement:
      "Teaching an employee to operate the organisation's new payroll software is best described as:\n\nA  Development\nB  Training\nC  Education\nD  Appraisal",
    plan: [
      {
        step: "Define the three by scope and time horizon",
        detail:
          "Training: specific skills for the CURRENT job, short horizon. Development: broader growth of the individual for future roles, long horizon. Education: general knowledge, broader still and usually external.",
      },
      {
        step: "Read the stem for specificity",
        detail:
          "One named system, needed for the job the person holds now. Both the narrowness and the immediacy point to training without any weighing of options.",
      },
      {
        step: "Test the development reading",
        detail:
          "Development would be preparing this person for a supervisory role, or broadening their capability beyond the present job. Learning one system does neither.",
      },
      {
        step: "Note the overlap so it does not unsettle you",
        detail:
          "The three shade into each other in practice — training on a system may aid a later promotion. The exam expects the classification by primary purpose, which here is unambiguous.",
      },
    ],
    answer:
      "**B — training.**\n\nTraining develops specific skills and knowledge for the job the person currently holds, and one named payroll system for the role they are in now is exactly that.\n\n**Development** is broader and longer-term — growing the individual's capability for future roles, through secondments, coaching or wider experience. **Education** is more general still, usually external and not tied to one employer. **Appraisal** is the review of performance, which may identify the training need but is not the training.\n\nThe three overlap in practice; the exam classifies by primary purpose.",
    earns: ["Classifying on scope and horizon — current job versus future capability"],
    loses: ["Calling anything an employee learns development"],
  },

  "BT-22::training-cycle": {
    title: "Naming the stage of the training cycle a task belongs to",
    format: "ot",
    marks: 2,
    requirement:
      "Comparing an employee's current competence with the standard the job requires, in order to decide what training is needed, is which stage of the training cycle?\n\nA  Identifying the training need\nB  Designing the training\nC  Delivering the training\nD  Evaluating the training",
    plan: [
      {
        step: "Set out the cycle in order",
        detail:
          "Identify the need, set the objectives, design the programme, deliver it, then evaluate — and feed the evaluation back into the next round of need identification.",
      },
      {
        step: "Recognise the gap analysis by its structure",
        detail:
          "Comparing current competence against required competence is a gap analysis, and the gap IS the training need. The stem describes the method rather than naming the stage.",
      },
      {
        step: "Check the stem's stated purpose",
        detail:
          "\"In order to decide what training is needed\" states the purpose outright. The purpose identifies the stage even where the activity might superficially resemble another.",
      },
      {
        step: "Keep identification and evaluation apart",
        detail:
          "Evaluation also compares against a standard, but AFTER training, to see whether it worked. The distinguishing question is whether training has happened yet.",
      },
    ],
    answer:
      "**A — identifying the training need.**\n\nThe cycle runs: identify the need, set objectives, design, deliver, evaluate — with the evaluation feeding back into the next identification. Comparing current competence against the standard the job requires is a **gap analysis**, and the gap is the training need.\n\nEvaluation is the closest distractor because it also compares performance against a standard. The difference is timing: identification happens before training, evaluation after it, to establish whether the training worked. The stem's phrase \"to decide what training is needed\" settles it.",
    earns: ["Using timing — before or after the training — to separate identification from evaluation"],
    loses: ["Choosing evaluation because both stages involve measuring against a standard"],
  },

  "BT-22::appraisal": {
    title: "What makes an appraisal system work, and what undermines it",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is most likely to undermine the effectiveness of a performance appraisal system?\n\nA  Objectives agreed jointly by appraiser and appraisee\nB  Appraisal used only as a basis for deciding pay\nC  Regular feedback given throughout the year\nD  Appraisers trained in conducting appraisal interviews",
    plan: [
      {
        step: "Recall what appraisal is supposed to achieve",
        detail:
          "Reviewing performance, identifying development needs, setting objectives and improving future performance. Reward is one possible use, not the purpose.",
      },
      {
        step: "Reason about what happens when reward dominates",
        detail:
          "If pay depends on the outcome, the appraisee has every reason to conceal weaknesses and dispute criticism. The developmental conversation becomes a negotiation, and the honest one becomes impossible.",
      },
      {
        step: "Confirm the other three are recognised good practice",
        detail:
          "Jointly agreed objectives, continuous feedback and trained appraisers all appear on the standard list of what makes appraisal effective. Three good practices and one defect is the usual shape.",
      },
      {
        step: "Name the underlying conflict, since it earns the follow-on mark",
        detail:
          "The reward purpose and the development purpose conflict, which is why many organisations separate the pay conversation from the development one.",
      },
    ],
    answer:
      "**B — appraisal used only as a basis for deciding pay.**\n\nWhen pay depends on the outcome, the appraisee has every incentive to conceal weaknesses and contest criticism, and the developmental conversation becomes a negotiation. The **reward purpose conflicts with the development purpose**, which is why many organisations hold the two conversations separately.\n\nJointly agreed objectives, continuous feedback rather than one annual surprise, and trained appraisers are all on the standard list of what makes appraisal effective. Other recognised failures are the halo effect, recency bias and the appraiser avoiding difficult messages.",
    earns: ["Naming the conflict between the reward and development purposes"],
    loses: ["Reading a link to pay as motivating, when the question is about appraisal's effectiveness"],
  },
}
