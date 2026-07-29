import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Areas E and F — Personal effectiveness and communication (E1–E5), and
 * Professional ethics in accounting and business (F1–F4).
 * Chapters 23–26 of the BT reading tree.
 *
 * Area F is the one that matters most beyond the exam: it is the foundation of
 * ACCA's Code of Ethics and Conduct, which binds you for your whole career and is
 * examined again in every paper from AA to AAA.
 *
 * Original Scholify teaching text throughout.
 */

/* ── Chapter 23 · E1, E2, E3, E4 ───────────────────────────────── */

export const BT_TREE_23: StudyChapter = {
  id: "BT-23",
  number: 23,
  paper: "BT",
  area: "E",
  title: "Personal effectiveness, competence and conflict",
  minutes: 16,
  syllabusRefs: ["E1(a)", "E1(b)", "E1(c)", "E2(a)", "E2(b)", "E3(a)", "E3(b)", "E3(c)", "E4(a)", "E4(b)"],
  intro:
    "This is the chapter about you. Time management, the cost of getting it wrong, how competence is defined and developed, and what to do when people disagree — including when the disagreement is with your own manager.",
  outcomes: [
    "Explain the personal effectiveness techniques available and apply time management",
    "Explain the consequences of ineffectiveness at work",
    "Explain competence frameworks and personal development plans",
    "Explain the purpose and value of coaching, mentoring and counselling",
    "Identify the sources of conflict at work",
    "Explain the techniques available for resolving or managing conflict",
  ],
  sections: [
    {
      id: "time-management",
      heading: "Personal effectiveness and time management",
      blocks: [
        {
          kind: "definition",
          term: "Personal effectiveness",
          md: "Achieving the results your role requires, using your own time, energy and capability well. It is a **competence like any other** — it can be assessed, taught and improved, which is why it appears in a professional syllabus rather than being treated as temperament.",
        },
        {
          kind: "list",
          title: "The techniques the syllabus expects",
          items: [
            "**Goal setting** — knowing what the role's priorities actually are, so effort can be aimed at them.",
            "**Prioritisation** — distinguishing what is urgent from what is important, which are not the same.",
            "**Planning and scheduling** — action lists, diaries, planners, and protecting time for work that needs concentration.",
            "**Delegation** — the manager's principal time-management tool (Chapter 18).",
            "**Managing interruptions** — batching communications rather than responding continuously.",
            "**Avoiding procrastination** — starting difficult work early, when energy and time both still exist.",
            "**Saying no, or renegotiating** — accepting everything guarantees that something is delivered badly.",
            "**Systems and routines** — reducing the number of decisions that have to be made repeatedly.",
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Urgent versus important",
            caption: "Most people work the top-left box and neglect the top-right — which is why the top-left keeps refilling.",
            data: {
              leftTitle: "Not urgent",
              rightTitle: "Urgent",
              rows: [
                { aspect: "Important", left: "**PLAN IT.** Preparation, training, planning, relationship building, improving a process. Neglected, and the source of most later crises", right: "**DO IT NOW.** Genuine deadlines, real crises, commitments already made" },
                { aspect: "Not important", left: "**DROP IT.** Trivia, some email, activity that feels like work", right: "**DELEGATE OR MINIMISE.** Interruptions and requests that are pressing for someone else, not for you" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The insight worth carrying out of this chapter",
          md: "**Urgent is not the same as important.** Urgency is about timing; importance is about consequence. Spending your whole week on urgent-but-unimportant work feels productive and achieves little — and neglecting important-but-not-urgent work (planning, training, fixing the process) is precisely what manufactures next week's emergencies.",
        },
        {
          kind: "illustration",
          title: "The reconciliation nobody had time to fix",
          md: "A finance team spends two days every month clearing unexplained differences on a reconciliation. Nobody has time to investigate why the differences arise, because they are always busy clearing them.\n\nClearing the differences is urgent. Fixing the cause is important and never urgent, so it never happens — and it would take three days once. The team spends 24 days a year avoiding a three-day job.\n\nThis is the top-right/top-left trap in its purest form, and it is extremely common in real finance functions.",
        },
      ],
      check: {
        q: "A manager spends almost all her time on tasks that are urgent but of low importance, and never on important tasks that are not yet urgent. What is the most likely consequence?",
        options: [
          "She will be highly effective, because urgent work is always the priority",
          "Important work will be neglected until it becomes an urgent crisis",
          "Her workload will steadily decrease as urgent items are cleared",
          "There is no consequence, since all work eventually gets done",
        ],
        correct: 1,
        explain:
          "Urgency concerns timing; importance concerns consequence. Neglecting important-but-not-yet-urgent work — planning, training, preparation, fixing broken processes — means it is only addressed once it has become a crisis, which is what generates the next round of urgent work. The urgent box keeps refilling precisely because the important box is ignored.",
      },
    },
    {
      id: "ineffectiveness",
      heading: "The consequences of ineffectiveness",
      blocks: [
        {
          kind: "table",
          caption: "Ineffectiveness costs on three levels",
          head: ["Level", "Consequences"],
          rows: [
            ["**The individual**", "Stress and its health effects; missed deadlines and the reputational damage that follows; loss of confidence; poor work-life balance; damaged career prospects; ultimately performance management or dismissal"],
            ["**The team**", "Others absorb the shortfall, creating resentment; bottlenecks where the person's output is another's input; declining morale and cohesion (Chapter 20)"],
            ["**The organisation**", "Errors, rework and lost customers; missed reporting deadlines with regulatory consequences; higher costs; higher turnover; damage to reputation with clients and regulators"],
          ],
        },
        {
          kind: "list",
          title: "The symptoms a manager should recognise",
          items: [
            "**Deadlines missed**, or met only by others stepping in.",
            "**Working consistently long hours** without corresponding output — a sign of ineffectiveness, not commitment.",
            "**Errors and rework** rising.",
            "**Constant crisis** and firefighting, with no time for planning.",
            "**Failure to delegate**, so the manager becomes the bottleneck.",
            "**Withdrawal, irritability or absence**, which may indicate stress rather than capability (Chapter 20).",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Distinguish the cause before prescribing the remedy",
          md: "Ineffectiveness looks the same whether it comes from **poor time management**, **inadequate training**, **unrealistic workload**, **role ambiguity** (Chapter 20), **poor systems**, or a **personal difficulty**. Recommending a time-management course to someone whose workload is genuinely impossible is a management failure dressed as a development intervention.",
        },
      ],
    },
    {
      id: "competence",
      heading: "Competence frameworks and personal development",
      blocks: [
        {
          kind: "definition",
          term: "Competence framework",
          md: "A structured description of the **knowledge, skills and behaviours** required at each level or role in an organisation, defined in observable terms. It gives one shared standard for recruitment, appraisal, training, promotion and pay — which is why it appears in all of those chapters.",
        },
        {
          kind: "list",
          title: "What a competence framework is used for",
          items: [
            "**Recruitment and selection** — it becomes the person specification (Chapter 19).",
            "**Appraisal** — performance is assessed against defined competencies rather than general impression (Chapter 22).",
            "**Identifying training needs** — the gap between required and current competence.",
            "**Career and succession planning** — showing what the next role requires.",
            "**Pay and grading** — providing a defensible basis for differentials.",
            "**Consistency** — the same standard applied by every manager, which is what makes decisions comparable and defensible.",
          ],
        },
        {
          kind: "definition",
          term: "Personal development plan (PDP)",
          md: "A structured plan setting out an individual's **development objectives**, the **activities** that will achieve them, the **resources and support** needed, the **timescale**, and how achievement will be **evidenced**. It is owned by the individual and supported by the organisation — not the reverse.",
        },
        {
          kind: "table",
          caption: "Three developmental relationships that get confused",
          head: ["", "Coaching", "Mentoring", "Counselling"],
          rows: [
            ["Focus", "A specific skill or performance area", "The person's broader career and development", "A personal or emotional difficulty affecting work"],
            ["Time frame", "Short — the duration of the skill gap", "Long — often years", "As long as the issue requires"],
            ["Usually provided by", "The line manager or a skilled practitioner", "A more senior person, usually OUTSIDE the reporting line", "A trained professional, often external and confidential"],
            ["Direction", "Fairly directive — instruction and feedback", "Non-directive — guidance, perspective, challenge", "Non-directive — support and exploration"],
            ["Purpose", "Do this task well", "Grow and navigate a career", "Resolve or cope with a difficulty"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why a mentor should not be your line manager",
          md: "A mentor's value depends on the mentee being able to discuss doubts, mistakes, ambitions and dissatisfactions **freely**. A line manager assesses performance and controls pay, so the same conversation carries a risk — and the mentee edits it. Mentoring outside the reporting line is a design feature, not an administrative accident.",
        },
      ],
    },
    {
      id: "conflict",
      heading: "Conflict at work",
      blocks: [
        {
          kind: "list",
          title: "The sources of conflict the syllabus expects",
          items: [
            "**Competition for scarce resources** — budget, staff, equipment, management attention.",
            "**Incompatible objectives** — the classic being sales rewarded on volume against finance controlling credit risk.",
            "**Interdependence** — where one group's output is another's input, delay by one becomes failure for the other.",
            "**Role conflict and ambiguity** — especially in a matrix structure with two bosses (Chapters 8 and 20).",
            "**Differences in values, perception or culture** (Chapter 9).",
            "**Poor communication** — much apparent conflict is misunderstanding that was never surfaced (Chapter 24).",
            "**Personality clashes**, which are real but are also the explanation people reach for when the structural cause is uncomfortable.",
            "**Change** — any reallocation of resources, status or authority creates winners and losers.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Conflict is not automatically bad",
          md: "**Constructive** conflict surfaces problems, tests assumptions, generates better options and prevents groupthink (Chapter 10). **Destructive** conflict consumes energy, damages relationships and blocks decisions. The management task is to make disagreement about **issues** safe while preventing it becoming about **people** — not to eliminate it. Chapter 20's storming stage is the same point.",
        },
        {
          kind: "table",
          caption: "Approaches to handling conflict",
          head: ["Approach", "What it does", "Appropriate when"],
          rows: [
            ["**Avoidance / denial**", "Ignoring or suppressing the disagreement", "The issue is trivial, or emotions need time to cool. Rarely a solution — it usually defers the conflict"],
            ["**Accommodation / smoothing**", "One party gives way to preserve the relationship", "The issue matters much more to the other party than to you"],
            ["**Compromise**", "Both parties concede something", "Both positions are legitimate and a workable middle exists — but neither side gets what it needed"],
            ["**Forcing / domination**", "One party imposes an outcome using authority", "A genuine emergency, or a matter of law, safety or ethics where there is nothing to negotiate"],
            ["**Collaboration / problem solving**", "Working jointly to find a solution meeting both sets of underlying needs", "Time exists and the relationship matters — the best outcome where achievable"],
            ["**Third-party intervention**", "Mediation, arbitration, or escalation to a common superior", "The parties cannot resolve it themselves, or a formal process is required"],
          ],
        },
        {
          kind: "definition",
          term: "Mediation and arbitration",
          md: "In **mediation** a neutral third party helps the parties reach **their own** agreement; the mediator has no power to impose one. In **arbitration** the third party **decides** and the parties have agreed in advance to accept the decision. The distinction is who makes the final decision, and it is examined.",
        },
        {
          kind: "activity",
          title: "Activity 24 — a conflict with a structural cause",
          prompt:
            "The sales director and the credit controller are in open conflict. Sales staff are paid commission on invoiced revenue with no clawback for bad debts. The credit controller has refused credit to eleven prospective customers this quarter, and the sales director has twice overridden her and instructed that the orders be shipped. Two of those customers have since defaulted.\n\nIdentify the real source of the conflict, explain why treating it as a personality clash would fail, and recommend a resolution.",
          answer:
            "**The real source: incompatible objectives created by the reward system.** Commission on invoiced revenue with no clawback for bad debts makes it individually rational for sales staff to push through any order, because they capture the upside and bear none of the downside. The credit controller is doing exactly her job, and so, given his incentives, is the sales director. The conflict is **structural**, and the organisation designed it.\n\n**Why 'personality clash' fails as a diagnosis.** It locates the problem in two individuals, so the remedies it suggests — a facilitated conversation, moving one of them, asking them to be more collaborative — leave the incentive intact. Replace either person and the same conflict reappears within a quarter, because the next post-holder faces the same rewards. Note also that treating it as personal is *convenient*: it avoids revisiting a commission scheme that senior management approved.\n\n**Recommended resolution, in three parts.** (1) **Fix the incentive** — base commission on cash collected, or apply clawback where a debt goes bad. This aligns the sales director's interest with the credit controller's, which removes the cause rather than managing the symptom. (2) **Fix the authority** — credit limits must not be overridable by the person whose pay depends on the sale. Where an override is genuinely needed commercially, route it to someone with no interest in the outcome, and document the decision and its reasons. (3) **Collaborative problem solving on the shared objective** — profitable revenue, not revenue. Bring both into designing the credit policy so that each understands the other's constraint.\n\n**Note what has also happened here:** an authorisation control was overridden by a manager with an interest in the outcome, and losses followed. That is a control environment weakness (Chapter 15) and, in the fraud triangle's terms, the scheme supplies pressure and rationalisation (Chapter 16).",
        },
      ],
      check: {
        q: "A neutral third party is appointed to help two departments reach their own agreement on a disputed budget allocation, but has no power to impose an outcome. This is:",
        options: [
          "Arbitration",
          "Mediation",
          "Forcing",
          "Accommodation",
        ],
        correct: 1,
        explain:
          "MEDIATION is where a neutral third party helps the parties reach THEIR OWN agreement, with no power to impose one. In ARBITRATION the third party decides and the parties have agreed in advance to accept that decision. The distinction is simply who makes the final decision — and it is a favourite one-mark question.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating urgent and important as the same thing.",
      fix: "Urgency is about timing, importance about consequence. Neglecting important-but-not-urgent work is what manufactures the next crisis.",
    },
    {
      trap: "Reading long hours as commitment.",
      fix: "Sustained long hours without corresponding output is a symptom of ineffectiveness, of an impossible workload, or of poor systems.",
    },
    {
      trap: "Prescribing training for every performance problem.",
      fix: "Diagnose first. The cause may be workload, role ambiguity, poor systems, or a personal difficulty — for which training is the wrong remedy.",
    },
    {
      trap: "Confusing coaching, mentoring and counselling.",
      fix: "Coaching is skill-specific and fairly directive. Mentoring is long-term career guidance, usually outside the reporting line. Counselling addresses a personal difficulty and is usually confidential and professional.",
    },
    {
      trap: "Confusing mediation with arbitration.",
      fix: "A mediator helps the parties agree and cannot impose. An arbitrator decides, and the parties accepted in advance that they would abide by it.",
    },
    {
      trap: "Treating all conflict as damaging and recommending its elimination.",
      fix: "Constructive conflict surfaces problems and prevents groupthink. The task is keeping disagreement about issues rather than people.",
    },
    {
      trap: "Diagnosing a structural conflict as a personality clash.",
      fix: "If the incentives or objectives make the conflict rational, replacing the people changes nothing. Fix the structure.",
    },
  ],
  keyTerms: [
    { term: "Personal effectiveness", def: "Achieving the results a role requires through good use of one's own time, energy and capability." },
    { term: "Competence framework", def: "A structured description of the knowledge, skills and behaviours required at each role or level, defined in observable terms." },
    { term: "Personal development plan", def: "A plan setting out an individual's development objectives, activities, support, timescale and evidence of achievement." },
    { term: "Coaching", def: "Short-term, fairly directive help with a specific skill or performance area, usually from a manager or skilled practitioner." },
    { term: "Mentoring", def: "Longer-term, non-directive career guidance, normally provided by a senior person outside the reporting line." },
    { term: "Counselling", def: "Support with a personal or emotional difficulty affecting work, usually confidential and professionally provided." },
    { term: "Constructive conflict", def: "Disagreement that surfaces problems, tests assumptions and improves decisions." },
    { term: "Mediation", def: "Intervention by a neutral third party who helps the parties reach their own agreement without imposing one." },
    { term: "Arbitration", def: "Intervention by a third party who decides the outcome, the parties having agreed in advance to accept it." },
  ],
  summary: [
    "Personal effectiveness is a competence that can be assessed, taught and improved, not a matter of temperament.",
    "Urgency concerns timing and importance concerns consequence; neglecting important-but-not-urgent work generates the next crisis.",
    "Ineffectiveness costs the individual in stress and career, the team in resentment and bottlenecks, and the organisation in errors, cost and reputation.",
    "Diagnose the cause of ineffectiveness before prescribing a remedy — training is the wrong answer to an impossible workload.",
    "Competence frameworks give one shared standard for recruitment, appraisal, training, promotion and pay.",
    "Coaching is skill-specific, mentoring is long-term and outside the reporting line, counselling addresses personal difficulty.",
    "Conflict arises from scarce resources, incompatible objectives, interdependence, role ambiguity, values, communication and change.",
    "Constructive conflict is valuable; the approaches are avoidance, accommodation, compromise, forcing, collaboration and third-party intervention.",
    "A mediator helps parties agree; an arbitrator decides.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between urgent and important?", a: "Urgency is about timing — it needs attention now. Importance is about consequence. Work that is important but not yet urgent, such as planning and process improvement, is what gets neglected and later becomes a crisis." },
    { q: "What is a competence framework used for?", a: "One shared standard across recruitment (as the person specification), appraisal, training needs identification, career and succession planning, and pay grading — making decisions consistent and defensible." },
    { q: "How do coaching, mentoring and counselling differ?", a: "Coaching is short-term and fairly directive on a specific skill. Mentoring is long-term, non-directive career guidance from someone outside the reporting line. Counselling addresses a personal difficulty affecting work, usually confidentially and professionally." },
    { q: "Name five sources of conflict at work.", a: "Competition for scarce resources, incompatible objectives, interdependence of work, role conflict and ambiguity, differences in values or culture, poor communication, personality clashes, and change." },
    { q: "What is the difference between mediation and arbitration?", a: "A mediator is neutral and helps the parties reach their own agreement, with no power to impose. An arbitrator decides the outcome, and the parties agreed in advance to accept the decision." },
  ],
  furtherStudy: [
    "ACCA's Practical Experience Requirement asks you to evidence exactly the competences and development planning described here.",
    "Conflict, change and stakeholder management are examined at a strategic level in **SBL**.",
  ],
}

/* ── Chapter 24 · E5 ───────────────────────────────────────────── */

export const BT_TREE_24: StudyChapter = {
  id: "BT-24",
  number: 24,
  paper: "BT",
  area: "E",
  title: "Communicating in business",
  minutes: 15,
  syllabusRefs: ["E5(a)", "E5(b)", "E5(c)", "E5(d)", "E5(e)"],
  intro:
    "Communication is the process by which everything else in this paper actually happens. It also fails constantly, in patterned and predictable ways that the syllabus expects you to be able to name and fix.",
  outcomes: [
    "Describe the communication process and identify where it breaks down",
    "Distinguish formal from informal communication and explain the grapevine",
    "Explain the directions communication flows and the problems of each",
    "Compare oral, written and visual media and choose an appropriate one",
    "Identify the barriers to effective communication and how to overcome them",
    "Explain the qualities of an effective business communication",
  ],
  sections: [
    {
      id: "the-process",
      heading: "The communication process",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The process, with the two stages that do the damage",
            caption: "Encoding and decoding are where meaning is created — and where it goes missing.",
            data: {
              steps: [
                { label: "Sender", sub: "has a meaning to convey" },
                { label: "Encoding", sub: "turns the meaning into words, numbers or images — the first chance to go wrong" },
                { label: "Message & medium", sub: "the encoded content, and the channel carrying it" },
                { label: "Decoding", sub: "the receiver interprets it through their OWN knowledge, assumptions and mood" },
                { label: "Receiver", sub: "arrives at a meaning — which may not be the sender's" },
                { label: "Feedback", sub: "the only way the sender discovers whether the meanings matched" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The point of the model",
          md: "Communication is **not** the transmission of information — it is the **transfer of meaning**, and meaning is reconstructed by the receiver rather than delivered intact. \"I told them\" is therefore not evidence that communication occurred. **Feedback** is the only mechanism that tests whether it did, which is why one-way communication is inherently unreliable.",
        },
        {
          kind: "definition",
          term: "Noise",
          md: "Anything that distorts or interferes with the message — literal noise, but more importantly technical jargon, emotional state, distraction, information overload, cultural difference, or a poor channel. Noise can enter at every stage of the process.",
        },
      ],
    },
    {
      id: "formal-informal",
      heading: "Formal and informal communication",
      blocks: [
        {
          kind: "table",
          caption: "Two systems running in parallel",
          head: ["", "Formal", "Informal (the grapevine)"],
          rows: [
            ["Follows", "The organisation's structure and reporting lines", "Social relationships — the informal organisation of Chapter 8"],
            ["Examples", "Reports, meetings, memoranda, policies, appraisals, board papers", "Conversation, messaging groups, rumour, gossip"],
            ["Speed", "Slower — must pass through levels", "Very fast"],
            ["Accuracy", "More accurate and evidenced", "Variable; distorts as it passes on"],
            ["Record", "Documented and auditable", "No record"],
            ["Value", "Authoritative and reliable", "Fast, reveals real concerns, and fills the vacuum formal channels leave"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The grapevine cannot be switched off — only starved",
          md: "Rumour flourishes where formal communication is **slow, absent or evasive**: people fill a vacuum with the worst plausible explanation. The management response is therefore not to prohibit informal talk but to communicate early, fully and honestly enough that the grapevine has nothing better to work with. During redundancies or an acquisition, silence is itself a message, and it is always read pessimistically.",
        },
      ],
    },
    {
      id: "directions",
      heading: "The directions communication flows",
      blocks: [
        {
          kind: "table",
          caption: "Four directions, four characteristic problems",
          head: ["Direction", "Contains", "Characteristic problem"],
          rows: [
            ["**Downward**", "Instructions, objectives, policy, feedback, strategy", "Filtered and simplified at each level, so the message arriving at the bottom differs from the one sent"],
            ["**Upward**", "Results, problems, suggestions, concerns", "Bad news is softened or withheld — the single most dangerous failure in an organisation"],
            ["**Horizontal / lateral**", "Coordination between departments at the same level", "Departmental silos and rivalry block it (Chapter 8's functional structure)"],
            ["**Diagonal**", "Between different levels in different functions", "Cuts across the scalar chain, so it can be resented as bypassing someone's authority"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why upward communication failure is the serious one",
          md: "Downward distortion produces confusion. **Upward** failure produces catastrophe: senior management does not learn that the control failed, the project is late, the customer is furious or the numbers were manipulated — until it is far too late to act. Every governance and control mechanism in Chapters 11, 15 and 16 depends on bad news being able to travel upward, which is why whistleblowing routes must bypass line management and why Chapter 9's culture question matters so much.",
        },
        {
          kind: "illustration",
          title: "How three layers turn a warning into an assurance",
          md: "A team leader reports: \"The reconciliation has a $400,000 unexplained difference and we cannot clear it.\"\n\nHer manager reports: \"There's a reconciliation issue we're working through.\"\n\nHis director reports to the board: \"Month-end went broadly to plan, with a couple of minor items being tidied up.\"\n\nNobody lied. Each person softened the message slightly for the next audience — a completely normal, individually defensible act. Three iterations converted a serious control failure into a reassurance, and the board is now unable to act on something it has been told about.",
        },
      ],
      check: {
        q: "Which failure of communication direction poses the greatest risk to an organisation's governance and control?",
        options: [
          "Downward, because instructions may be misunderstood",
          "Upward, because bad news is softened or withheld before it reaches decision-makers",
          "Horizontal, because departments fail to coordinate",
          "Diagonal, because it bypasses the scalar chain",
        ],
        correct: 1,
        explain:
          "UPWARD failure is the most dangerous. Downward distortion causes confusion, and horizontal failure causes inefficiency — but if bad news cannot travel upward, senior management and the board do not learn that a control failed, a project is late or the numbers were manipulated until it is too late to act. Every governance and internal control mechanism depends on adverse information reaching decision-makers intact.",
      },
    },
    {
      id: "media",
      heading: "Choosing the medium",
      blocks: [
        {
          kind: "table",
          caption: "The main media and what each is for",
          head: ["Medium", "Best for", "Weakness"],
          rows: [
            ["Face-to-face meeting", "Sensitive, complex or contentious matters; anything needing discussion and immediate feedback", "Costly in time; no record unless minuted"],
            ["Telephone / video call", "Quick two-way discussion at distance; tone is preserved", "Weak record; body language partly or wholly lost"],
            ["Email", "Routine information, confirmation, distributing documents, creating a record", "Tone is easily misread; overload; unsuitable for sensitive or complex matters"],
            ["Formal report", "Complex analysis, recommendations, and anything needing to be considered and retained", "Slow to produce; may not be read if poorly structured"],
            ["Instant messaging", "Speed and informality on low-stakes matters", "No structure; disappears; often no record; interruptive"],
            ["Presentation", "Persuading a group, and explaining something visual", "One-way unless questions are invited; slides can substitute for thought"],
            ["Notice / intranet", "Uniform information to many people at once", "No feedback, no confirmation anyone read it"],
            ["Charts and visualisations", "Showing pattern, trend, proportion and comparison in numbers", "Can mislead through scale, selection or design (Chapter 17's data literacy point)"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to answer 'which medium should be used?'",
          md: "Choose on four criteria and say which is driving your answer: **complexity** (complex → written), **sensitivity** (sensitive → face-to-face), **need for a record** (yes → written), and **need for immediate feedback** (yes → oral). Redundancy news delivered by email fails on sensitivity; a complex technical proposal delivered only verbally fails on complexity and record.",
        },
      ],
    },
    {
      id: "barriers",
      heading: "Barriers, and how to overcome them",
      blocks: [
        {
          kind: "table",
          caption: "The barriers and their remedies",
          head: ["Barrier", "How it shows up", "Remedy"],
          rows: [
            ["**Jargon and technical language**", "The audience does not share the sender's vocabulary", "Write for the actual reader; define terms; explain what a number MEANS, not just what it is"],
            ["**Information overload**", "Too much at once, so nothing registers", "Summarise, prioritise, use exception reporting (Chapter 13)"],
            ["**Distortion and filtering**", "Each level softens or edits the message", "Shorten the chain, use direct channels for critical information, and check understanding at the far end"],
            ["**Perceptual and cultural difference**", "The same words mean different things to sender and receiver", "Seek feedback; be explicit; be aware of Hofstede's dimensions (Chapter 9)"],
            ["**Emotion and defensiveness**", "The receiver hears criticism and stops listening", "Separate the behaviour from the person; choose timing; be specific"],
            ["**Status and power distance**", "Juniors do not challenge or report upward", "Actively invite dissent; protect those who raise concerns; make reporting routes safe"],
            ["**Physical and technical noise**", "Poor connection, interruptions, unreadable formatting", "Choose the medium and setting deliberately"],
            ["**Absence of feedback**", "The sender never learns whether the message landed", "Ask the receiver to state their understanding back"],
            ["**Timing**", "The right message at the wrong moment", "Communicate early enough to be actionable; do not let the grapevine get there first"],
          ],
        },
        {
          kind: "definition",
          term: "The qualities of an effective business communication",
          md: "**Clear** — one unambiguous meaning. **Concise** — no more than the reader needs. **Complete** — everything the reader needs to act. **Correct** — accurate in fact and in figure. **Courteous** — appropriate in tone for the reader and the situation. **Concrete** — specific rather than vague. And **appropriately structured** — so a busy reader can find the point without reading everything.",
        },
        {
          kind: "activity",
          title: "Activity 25 — choose and justify the medium",
          prompt:
            "For each, state the medium you would use and the criterion driving the choice.\n\n(a) Informing 30 staff that their department will close in four months with likely redundancies.\n(b) Confirming to a supplier that an invoice has been approved for payment.\n(c) Presenting a recommendation to the board on a $2m systems investment.\n(d) Telling a normally reliable team member that their work has slipped in the last month.",
          answer:
            "**(a) A face-to-face meeting with the whole group, immediately followed by written confirmation and individual meetings.** The driving criterion is **sensitivity** — this materially affects people's livelihoods, so email would be indefensible and would guarantee that the grapevine reaches everyone first, in a worse form. Written follow-up is needed because there are consultation obligations and people cannot retain detail delivered in a distressing meeting. Individual meetings follow because the collective message cannot address each person's position.\n\n**(b) Email.** Driving criteria are **record** and low sensitivity. It is routine, factual, needs no discussion, and both parties benefit from a written trail.\n\n**(c) A written report circulated in advance, then a presentation with discussion.** Driving criteria are **complexity** (a $2m appraisal cannot be absorbed from slides) and **need for a record** (the board's decision must be evidenced, and the paper becomes part of the governance trail). The presentation adds the immediate feedback a decision of this size requires.\n\n**(d) Face-to-face, in private, promptly.** Driving criteria are **sensitivity** and **need for immediate feedback** — you do not yet know why performance has slipped, and Chapter 23 warns that the cause may be workload, a systems problem or a personal difficulty rather than capability. A conversation can discover that; an email cannot, and would read as an accusation. Note the timing point: promptly, not saved for the annual appraisal, which is Chapter 22's recency and central-tendency failure in the making.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Treating communication as the transmission of information.",
      fix: "It is the transfer of MEANING, reconstructed by the receiver. 'I told them' does not establish that communication occurred — feedback does.",
    },
    {
      trap: "Recommending that the grapevine be shut down.",
      fix: "It cannot be. It is starved by communicating early, fully and honestly, because rumour fills the vacuum formal channels leave.",
    },
    {
      trap: "Treating all four communication directions as equally risky.",
      fix: "Upward failure is the dangerous one: it stops bad news reaching decision-makers, which defeats governance and internal control.",
    },
    {
      trap: "Choosing a medium without stating the criterion.",
      fix: "Justify on complexity, sensitivity, need for a record, and need for immediate feedback — and say which one is driving the choice.",
    },
    {
      trap: "Delivering sensitive news by email because it creates a record.",
      fix: "Sensitivity outranks record-keeping. Deliver it face-to-face and confirm in writing afterwards.",
    },
    {
      trap: "Listing barriers without remedies.",
      fix: "Marks are usually split between identifying the barrier and stating how it is overcome. Answer both halves.",
    },
  ],
  keyTerms: [
    { term: "Encoding", def: "Converting a meaning into words, numbers or images for transmission." },
    { term: "Decoding", def: "The receiver's interpretation of a message through their own knowledge, assumptions and state of mind." },
    { term: "Feedback", def: "The receiver's response, which is the only means by which a sender discovers whether the intended meaning was received." },
    { term: "Noise", def: "Anything distorting or interfering with a message, including jargon, emotion, distraction, overload and cultural difference." },
    { term: "Grapevine", def: "The informal communication network following social relationships rather than reporting lines — fast, unrecorded and prone to distortion." },
    { term: "Upward communication", def: "Communication from lower to higher levels, carrying results, problems and concerns; its failure is the most dangerous." },
    { term: "Diagonal communication", def: "Communication between different levels in different functions, cutting across the scalar chain." },
    { term: "Information overload", def: "Receiving more information than can be processed, so that important content is missed." },
  ],
  summary: [
    "Communication transfers meaning, not information, and the receiver reconstructs it — so feedback is what proves it worked.",
    "Formal communication follows the structure; the informal grapevine follows relationships and is fast, unrecorded and distorting.",
    "The grapevine is starved by early, full, honest formal communication, never by prohibition.",
    "Communication flows downward, upward, horizontally and diagonally, and upward failure is the one that defeats governance and control.",
    "Choose a medium on complexity, sensitivity, need for a record and need for immediate feedback.",
    "The barriers are jargon, overload, distortion, perceptual and cultural difference, emotion, status, noise, absent feedback and poor timing.",
    "Effective business communication is clear, concise, complete, correct, courteous, concrete and well structured.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the stages of the communication process?", a: "Sender, encoding, message and medium, decoding, receiver, and feedback. Encoding and decoding are where meaning is created and lost." },
    { q: "Why can the grapevine not simply be prohibited?", a: "Because it follows social relationships and fills the vacuum left by slow, absent or evasive formal communication. It is starved by communicating early, fully and honestly." },
    { q: "Why is upward communication failure the most dangerous?", a: "Because bad news softened or withheld at each level means senior management and the board do not learn of control failures, delays or manipulation until it is too late to act — defeating governance and internal control." },
    { q: "On what criteria should a communication medium be chosen?", a: "Complexity (complex → written), sensitivity (sensitive → face-to-face), need for a record (yes → written), and need for immediate feedback (yes → oral)." },
    { q: "Name five barriers to effective communication.", a: "Jargon, information overload, distortion and filtering through levels, perceptual and cultural difference, emotion and defensiveness, status and power distance, physical noise, absence of feedback, and poor timing." },
  ],
  furtherStudy: [
    "Communicating technical findings to non-specialists is a professional skill assessed directly in **SBL**, **SBR**, **AFM**, **APM**, **ATX** and **AAA**.",
    "Presenting data honestly connects back to Chapter 17's data literacy and forward to **APM**'s work on performance reporting.",
  ],
}

/* ── Chapter 25 · F1, F2 ───────────────────────────────────────── */

export const BT_TREE_25: StudyChapter = {
  id: "BT-25",
  number: 25,
  paper: "BT",
  area: "F",
  title: "Fundamental principles of ethical behaviour",
  minutes: 17,
  syllabusRefs: ["F1(a)", "F1(b)", "F1(c)", "F1(d)", "F2(a)", "F2(b)", "F2(c)"],
  intro:
    "This chapter is the one that outlasts the exam. The five fundamental principles bind you for your entire career, they are examined again in every paper from AA to AAA, and they are the reason a qualification is worth more than a set of technical skills.",
  outcomes: [
    "Explain the importance of ethics to the accountancy profession and to the public interest",
    "State and explain the five fundamental principles of the ACCA Code of Ethics and Conduct",
    "Explain the threats to compliance with the fundamental principles",
    "Explain safeguards and the conceptual framework approach",
    "Distinguish a rules-based from a principles-based approach to ethics",
    "Explain the roles of regulatory and professional bodies, including ACCA",
  ],
  sections: [
    {
      id: "why-ethics",
      heading: "Why ethics is a professional requirement, not a preference",
      blocks: [
        {
          kind: "text",
          md: "An accountant's output is **relied upon by people who cannot verify it**. A shareholder, a lender, a supplier or a tax authority accepts a set of figures partly because a professional stands behind them. That reliance is the entire economic value of the qualification — and it is why ethical failure by one member damages every member.",
        },
        {
          kind: "definition",
          term: "The public interest",
          md: "The collective wellbeing of the community the profession serves — not merely the interests of the client or employer who pays the fee. A professional accountancy body's defining feature is that it requires members to act in the public interest **even where that conflicts with the client's wishes**.",
        },
        {
          kind: "list",
          title: "What ethical behaviour protects",
          items: [
            "**Users of financial information**, who take decisions on the strength of it.",
            "**The client or employer**, who is badly served by an adviser willing to tell them what they want to hear.",
            "**The capital markets**, which price risk on reported information (Chapter 13).",
            "**The profession's collective reputation**, which is what makes any member's opinion worth anything.",
            "**The individual accountant**, whose career depends on a reputation that takes years to build and one decision to lose.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction to hold on to",
          md: "**Legal and ethical are not the same thing.** Many ethical failures are entirely lawful — the technically-true-but-misleading disclosure, the aggressive but legal tax structure, the conflict of interest nobody declared. \"It is not illegal\" is never a sufficient answer to an ethical question, and an exam answer that stops there does not pass.",
        },
      ],
    },
    {
      id: "five-principles",
      heading: "The five fundamental principles",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "The five fundamental principles",
            caption: "Learn these by name and by meaning. They are examined in every ethics question you will ever sit.",
            data: {
              items: [
                { title: "Integrity", sub: "Be straightforward and honest in all professional and business relationships. Do not knowingly be associated with misleading information." },
                { title: "Objectivity", sub: "Do not allow bias, conflict of interest or undue influence to override professional or business judgement." },
                { title: "Professional competence and due care", sub: "Maintain the knowledge and skill required to give competent service, and act diligently in accordance with applicable standards." },
                { title: "Confidentiality", sub: "Respect the confidentiality of information acquired through professional relationships, and do not use it for personal advantage." },
                { title: "Professional behaviour", sub: "Comply with relevant laws and regulations and avoid any conduct that discredits the profession." },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "A mnemonic, and a warning about it",
          md: "The five can be remembered as **PICCO** — Professional behaviour, Integrity, Competence and due care, Confidentiality, Objectivity. But naming them earns almost nothing on its own: marks come from identifying **which** principle a specific fact threatens and **why**. Learn the meanings, not just the list.",
        },
        {
          kind: "definition",
          term: "Integrity — the part that catches people",
          md: "Integrity is not merely refusing to lie. It includes **not being knowingly associated** with information that is materially false, misleading, or **omits or obscures** what it should include. Staying silent while a misleading statement goes out is an integrity failure, even though you wrote none of it.",
        },
        {
          kind: "table",
          caption: "Confidentiality — when it applies and when it gives way",
          head: ["Aspect", "Position"],
          rows: [
            ["Duration", "Continues **after** the professional relationship ends. A former client's information stays confidential"],
            ["Scope", "Covers information about clients, employers and prospective clients, and extends to not using it for personal advantage or that of a third party"],
            ["Within the firm", "Applies internally too — information is shared on a need-to-know basis, not with everyone"],
            ["Disclosure permitted", "Where **authorised** by the client, or **required by law** (a court order, a money laundering report), or where there is a **professional duty or right** to disclose, such as a regulatory review or defending oneself in proceedings"],
            ["Overriding obligation", "Anti-money-laundering reporting **overrides** confidentiality (Chapter 16), and tipping off the client is a separate offence"],
          ],
        },
        {
          kind: "illustration",
          title: "Social conversation as a confidentiality breach",
          md: "An audit senior mentions at a family dinner that a well-known local employer \"is going to have a difficult year\". Nobody is named a figure, no document leaves the office, and no one at the table works in finance.\n\nThat is a breach. Confidential information was disclosed without authority, and the fact that it was casual, imprecise and well-intentioned changes nothing. Note that confidentiality is one of the easiest principles to breach without any dishonest motive at all — which is exactly why it is examined through ordinary situations rather than dramatic ones.",
        },
      ],
      check: {
        q: "An accountant prepares a report that is factually accurate but omits a material fact, with the effect that readers will draw a favourable but incorrect conclusion. Which fundamental principle is most directly breached?",
        options: [
          "Confidentiality, because information was withheld",
          "Integrity, because the accountant is knowingly associated with misleading information",
          "Professional competence and due care, because the report is incomplete",
          "None — every statement in the report is factually true",
        ],
        correct: 1,
        explain:
          "INTEGRITY requires an accountant not to be knowingly associated with information that is misleading, including by OMISSION or obscuring. Factual accuracy is not a defence: if the overall impression is wrong and the accountant knows it, integrity is breached. This is also why 'it is not untrue' and 'it is not illegal' are both inadequate answers to an ethical question.",
      },
    },
    {
      id: "threats-and-safeguards",
      heading: "Threats and safeguards — the conceptual framework",
      blocks: [
        {
          kind: "text",
          md: "The Code does not attempt to list every situation. Instead it requires a **conceptual framework** approach: identify threats to the fundamental principles, evaluate their significance, and apply safeguards to reduce them to an acceptable level — declining or withdrawing if that is not possible.",
        },
        {
          kind: "table",
          caption: "The five categories of threat",
          head: ["Threat", "Arises when", "Example"],
          rows: [
            ["**Self-interest**", "A financial or other interest could influence judgement", "Holding shares in an audit client; a fee dependent on the outcome; a personal loan from a client"],
            ["**Self-review**", "A previous judgement must be re-evaluated by the person who made it", "Auditing a system you designed and implemented; reviewing your own prior-year work"],
            ["**Advocacy**", "Promoting a client's position to the point that objectivity is compromised", "Acting as an advocate for a client in litigation, or promoting its shares"],
            ["**Familiarity**", "A long or close relationship makes one too sympathetic", "A close family member is the client's finance director; the same partner has held an audit for fifteen years"],
            ["**Intimidation**", "Pressure — actual or perceived — deters objective action", "A client threatening to dismiss the firm, or a dominant employer threatening a career, unless a treatment is accepted"],
          ],
        },
        {
          kind: "definition",
          term: "Safeguards",
          md: "Actions that **eliminate** a threat or **reduce it to an acceptable level**. They come from the profession and regulation (qualification requirements, CPD, standards, external monitoring, disciplinary procedures) and from the work environment (independent review, rotation of staff, second partner review, an ethics partner, quality control, separating teams, and declining or resigning from the engagement).",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How to work an ethics question",
            caption: "This sequence is the answer structure for almost every ethics requirement in every ACCA paper.",
            data: {
              steps: [
                { label: "Identify the threat", sub: "which of the five, arising from which specific fact" },
                { label: "Name the principle", sub: "which fundamental principle is put at risk" },
                { label: "Evaluate significance", sub: "how serious is it, given the amounts, the relationships and the circumstances" },
                { label: "Apply safeguards", sub: "specific, practical actions — not 'be more ethical'" },
                { label: "Conclude", sub: "acceptable with safeguards, or decline / withdraw if it is not" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Two things that lose ethics marks",
          md: "**Vague safeguards.** \"Maintain objectivity\", \"act with integrity\" and \"follow the Code\" are restatements of the problem, not safeguards. A safeguard is a specific action: remove the individual from the team, obtain an independent second partner review, dispose of the shareholding, resign the engagement.\n\n**Failing to conclude.** Every ethics answer needs a conclusion. If no safeguard can reduce the threat to an acceptable level, the answer is to **decline or withdraw** — and saying so is where the final mark sits.",
        },
        {
          kind: "activity",
          title: "Activity 26 — identify threats and safeguards",
          prompt:
            "You are a manager at an accountancy firm. For each situation, name the threat category, the principle at risk, and one specific safeguard.\n\n(a) Your firm has audited Brightline Ltd for nine years; the same partner has led it throughout and holidays annually with the finance director.\n(b) A client offers you a 20% fee reduction on condition that its inventory valuation is accepted without further testing.\n(c) Your firm designed and installed the client's new revenue recognition system last year, and is now auditing the revenue figure it produces.\n(d) Your brother has just been appointed financial controller of a company whose tax computation you prepare.",
          answer:
            "**(a) Familiarity** (with an element of self-interest in retaining a long-standing fee). **Principle at risk: objectivity.** Nine years with the same partner plus an annual shared holiday makes professional scepticism very hard to sustain. **Safeguard:** rotate the engagement partner and key team members, and obtain an independent review of the engagement.\n\n**(b) Intimidation**, and arguably self-interest given the fee. **Principles at risk: objectivity and integrity.** The condition is that audit evidence be curtailed in exchange for a commercial concession, which cannot be accepted at any price. **Safeguard:** refuse the condition, escalate to the ethics partner, and document the discussion. If the client insists, withdraw — this is a case where no safeguard makes the arrangement acceptable, and note that accepting it would also breach auditing standards independently of the Code.\n\n**(c) Self-review.** **Principle at risk: objectivity.** The firm would be evaluating output from a system it designed, and is unlikely to conclude that its own design was flawed. **Safeguard:** use an entirely separate team with no involvement in the implementation, subject to an independent second partner review — or decline the audit of that balance. On a listed client the prohibition may be absolute rather than a matter of safeguards.\n\n**(d) Familiarity.** **Principle at risk: objectivity** (and confidentiality, given the family relationship and the information involved). **Safeguard:** remove yourself from the engagement entirely and have it reassigned; declare the relationship to the ethics partner and record it on the firm's independence register.\n\n**Note the pattern:** three of the four are resolved by changing **who** does the work. That is the most common practical safeguard, and it is far more creditable than an instruction to be objective.",
        },
      ],
    },
    {
      id: "rules-vs-principles",
      heading: "Rules-based and principles-based approaches",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two ways to regulate ethical conduct",
            caption: "ACCA's Code is principles-based, with the conceptual framework as its engine. Some specific prohibitions exist alongside it.",
            data: {
              leftTitle: "Rules-based",
              rightTitle: "Principles-based",
              rows: [
                { aspect: "Form", left: "A list of prohibited acts and permitted thresholds", right: "Fundamental principles plus a framework for applying them" },
                { aspect: "Certainty", left: "High — you know whether you complied", right: "Lower — requires judgement" },
                { aspect: "Coverage", left: "Only what the rule-writer anticipated", right: "Any situation, including novel ones" },
                { aspect: "Risk", left: "Compliance with the letter while defeating the spirit; 'not prohibited' becomes 'permitted'", right: "Inconsistent application; harder to enforce" },
                { aspect: "Suits", left: "Situations needing a bright line — share ownership, fee dependency limits", right: "A profession facing situations no rulebook could enumerate" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The argument for a principles-based code",
          md: "A rulebook can always be complied with while its purpose is defeated, because a rule specifies conduct rather than intent. A principles-based approach asks whether the **fundamental principle** is threatened, which cannot be engineered around by finding a gap. Its cost is that it demands judgement — which is precisely what a professional is for, and why the Code is written this way.",
        },
      ],
    },
    {
      id: "professional-bodies",
      heading: "Regulatory and professional bodies",
      blocks: [
        {
          kind: "table",
          caption: "Who does what",
          head: ["Body", "Role"],
          rows: [
            ["**Professional accountancy bodies** (e.g. ACCA)", "Set entry qualifications and examinations; require practical experience and CPD; issue the Code of Ethics and Conduct; monitor and discipline members; represent the profession and act in the public interest"],
            ["**Accounting standard-setters** (e.g. IASB)", "Develop and issue financial reporting standards through public due process"],
            ["**Auditing standard-setters**", "Issue the auditing and ethics standards that auditors must apply"],
            ["**National regulators and oversight bodies**", "Oversee the profession, inspect audit quality, review published accounts and enforce corrective action"],
            ["**Stock exchanges**", "Impose continuing obligations, including governance and reporting requirements, as a condition of listing"],
            ["**Government and legislature**", "Set the statutory framework — company law, audit requirements, tax law, data protection"],
          ],
        },
        {
          kind: "list",
          title: "What ACCA membership actually commits you to",
          items: [
            "**The Code of Ethics and Conduct**, in full and continuously, not only at work.",
            "**Continuing professional development** — competence is not a one-off achievement (see the competence principle).",
            "**Practical experience** requirements demonstrating applied competence, not just examination success.",
            "**Accountability to a disciplinary process**, which can remove the right to practise.",
            "**Acting in the public interest**, including where it conflicts with a client's or employer's wishes.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this is what makes it a profession",
          md: "A trade requires skill. A **profession** additionally requires a body of knowledge, an entry standard, a code of conduct, a duty to the public interest, and a disciplinary mechanism with real consequences. Every one of those exists to make an outsider's reliance on a member's work reasonable — which is, in the end, the whole product.",
        },
      ],
      check: {
        q: "A firm's fee for one client represents 45% of its total income. Which threat does this most clearly create?",
        options: [
          "Self-review threat, because the firm reviews its own work",
          "Self-interest threat, because the firm's financial dependence could influence its judgement",
          "Advocacy threat, because the firm promotes the client's position",
          "Familiarity threat, because of the length of the relationship",
        ],
        correct: 1,
        explain:
          "Heavy fee dependence on one client creates a SELF-INTEREST threat: the firm has a direct financial interest in keeping the client happy, which could influence its professional judgement on a contentious matter. Note the threat exists whether or not anyone has ever actually been influenced — the Code addresses the CIRCUMSTANCE, because the risk to objectivity is what matters. Safeguards include reducing dependence, independent review, and disclosure to those charged with governance.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Answering an ethics question with 'it is not illegal'.",
      fix: "Legal and ethical are different. Many ethical failures are entirely lawful, and legality is never a sufficient answer.",
    },
    {
      trap: "Treating integrity as merely not lying.",
      fix: "It includes not being knowingly ASSOCIATED with misleading information, including by omission — so silence can breach it.",
    },
    {
      trap: "Assuming confidentiality ends when the engagement does.",
      fix: "It continues after the relationship ends, applies within the firm on a need-to-know basis, and covers using information for personal advantage.",
    },
    {
      trap: "Offering 'maintain objectivity' or 'follow the Code' as a safeguard.",
      fix: "Those restate the problem. A safeguard is specific: rotate the partner, use a separate team, obtain an independent review, dispose of the interest, resign.",
    },
    {
      trap: "Identifying threats but never concluding.",
      fix: "Always conclude: acceptable with the stated safeguards, or decline / withdraw where no safeguard reduces the threat to an acceptable level.",
    },
    {
      trap: "Confusing self-interest with self-review.",
      fix: "Self-interest is a FINANCIAL or personal stake. Self-review is re-evaluating YOUR OWN previous judgement or work.",
    },
  ],
  keyTerms: [
    { term: "Public interest", def: "The collective wellbeing of the community the profession serves, which a professional must serve even against a client's wishes." },
    { term: "Integrity", def: "Being straightforward and honest, and not being knowingly associated with misleading information, including by omission." },
    { term: "Objectivity", def: "Not allowing bias, conflict of interest or undue influence to override professional judgement." },
    { term: "Professional competence and due care", def: "Maintaining the knowledge and skill needed for competent service and acting diligently to applicable standards." },
    { term: "Confidentiality", def: "Respecting information acquired professionally, continuing after the relationship ends, and never using it for personal advantage." },
    { term: "Professional behaviour", def: "Complying with relevant laws and regulations and avoiding conduct that discredits the profession." },
    { term: "Self-interest threat", def: "A threat arising from a financial or other interest that could influence professional judgement." },
    { term: "Self-review threat", def: "A threat arising where a previous judgement must be re-evaluated by the person who made it." },
    { term: "Advocacy threat", def: "A threat arising from promoting a client's position to the point that objectivity is compromised." },
    { term: "Familiarity threat", def: "A threat arising from a long or close relationship making one too sympathetic to another's interests." },
    { term: "Intimidation threat", def: "A threat arising from actual or perceived pressure that deters objective action." },
    { term: "Safeguard", def: "An action that eliminates a threat to the fundamental principles or reduces it to an acceptable level." },
  ],
  summary: [
    "Ethics matters because an accountant's work is relied on by people who cannot verify it, and that reliance is the value of the qualification.",
    "A profession's defining feature is a duty to the public interest, which can override a client's or employer's wishes.",
    "The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour.",
    "Integrity includes not being knowingly associated with misleading information, including by omission.",
    "Confidentiality survives the engagement, applies inside the firm, and gives way only where authorised, required by law, or where a professional duty applies.",
    "The five threats are self-interest, self-review, advocacy, familiarity and intimidation.",
    "The conceptual framework requires identifying threats, evaluating significance, applying specific safeguards, and declining or withdrawing where none suffice.",
    "ACCA's Code is principles-based, because a rulebook can be complied with while its purpose is defeated.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the five fundamental principles?", a: "Integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour." },
    { q: "Does integrity require more than telling the truth?", a: "Yes. It requires not being knowingly associated with information that is false or misleading, including where it misleads by omitting or obscuring material facts — so silence can breach it." },
    { q: "When may confidential client information be disclosed?", a: "Where the client authorises it, where the law requires it (a court order or a money laundering report), or where a professional duty or right applies, such as a regulatory review or self-defence in proceedings." },
    { q: "What are the five categories of threat?", a: "Self-interest, self-review, advocacy, familiarity and intimidation." },
    { q: "What are the steps of the conceptual framework approach?", a: "Identify the threat, name the principle at risk, evaluate its significance, apply specific safeguards, and conclude — declining or withdrawing if no safeguard reduces the threat to an acceptable level." },
  ],
  furtherStudy: [
    "These principles and threats are examined again in **AA**, **SBL**, **SBR**, **ATX** and **AAA**, with progressively more complex scenarios.",
    "Chapter 26 applies them to conflicts, dilemmas and corporate codes.",
  ],
}

/* ── Chapter 26 · F3, F4 ───────────────────────────────────────── */

export const BT_TREE_26: StudyChapter = {
  id: "BT-26",
  number: 26,
  paper: "BT",
  area: "F",
  title: "Corporate codes of ethics and resolving dilemmas",
  minutes: 16,
  syllabusRefs: ["F3(a)", "F3(b)", "F3(c)", "F4(a)", "F4(b)", "F4(c)", "F4(d)"],
  intro:
    "Knowing the five principles is the easy part. This chapter is about what you actually do when two obligations point in opposite directions, and when the person asking you to do the wrong thing signs your appraisal.",
  outcomes: [
    "Explain the purpose, content and limitations of a corporate code of ethics",
    "Distinguish a corporate code from a professional code",
    "Identify the sources of an ethical conflict or dilemma",
    "Apply a structured process to resolving an ethical dilemma",
    "Explain the courses of action available, including internal escalation and resignation",
    "Explain the consequences of unethical behaviour for the individual, the organisation and the profession",
  ],
  sections: [
    {
      id: "corporate-codes",
      heading: "Corporate codes of ethics",
      blocks: [
        {
          kind: "definition",
          term: "Corporate code of ethics",
          md: "A document setting out the **standards of behaviour an organisation requires** of its employees and, often, of its suppliers. It is written by the organisation for its own people, which is what distinguishes it from a professional code.",
        },
        {
          kind: "table",
          caption: "Corporate code versus professional code",
          head: ["", "Corporate code", "Professional code (e.g. ACCA's)"],
          rows: [
            ["Written by", "The organisation, for itself", "The professional body, for its members"],
            ["Applies to", "All employees of that organisation", "All members, in every organisation and every role"],
            ["Enforced by", "Internal disciplinary process — up to dismissal", "The body's disciplinary process — up to expulsion and loss of the right to practise"],
            ["Content", "Organisation-specific: gifts, expenses, conflicts, use of assets, whistleblowing, supplier conduct", "The fundamental principles and the conceptual framework"],
            ["Which prevails", "—", "The **professional** code. Membership binds you regardless of what your employer's code permits"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The relationship between the two",
          md: "A corporate code **cannot authorise** what a professional code forbids. If your employer's policy permits something the ACCA Code does not, you are bound by the ACCA Code — and \"it complies with company policy\" is not a defence in a disciplinary hearing. Where the two conflict, the higher standard applies.",
        },
        {
          kind: "list",
          title: "What a corporate code typically covers",
          items: [
            "**Conflicts of interest** and how they must be declared.",
            "**Gifts and hospitality** — thresholds, and what must be refused or reported.",
            "**Bribery and facilitation payments**, which are prohibited absolutely in most jurisdictions.",
            "**Use of company assets and information**, including personal use and insider information.",
            "**Confidentiality and data protection** (Chapter 3).",
            "**Health and safety**, and respect at work — harassment and discrimination.",
            "**Whistleblowing** — the route, the protection, and the commitment to act.",
            "**Supplier and third-party standards**, including labour and environmental conditions in the supply chain.",
          ],
        },
        {
          kind: "table",
          caption: "Why codes work, and why they often do not",
          head: ["A code helps by", "A code fails when"],
          rows: [
            ["Making expectations explicit rather than assumed", "It is written, published and never referred to again"],
            ["Giving an employee something to point at when pressured", "Senior managers visibly breach it without consequence"],
            ["Providing a basis for consistent disciplinary action", "It conflicts with what the reward system actually pays for"],
            ["Signalling standards to customers, investors and recruits", "It is used as presentation rather than as policy"],
            ["Supporting a defence that the organisation had adequate procedures", "Nobody is trained on it and no one owns it"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The Chapter 9 point, restated where it matters most",
          md: "A code of ethics is an **espoused value**. Behaviour follows **underlying assumptions**, and those are taught by what gets rewarded and what gets tolerated. An organisation whose code forbids aggressive sales practices while paying commission on volume with no clawback has told its staff which document to believe.",
        },
      ],
      check: {
        q: "An employer's code of conduct permits accountants to accept hospitality worth up to $500 from suppliers. An ACCA member considers whether accepting a $450 dinner from a supplier whose contract she is currently evaluating is acceptable.",
        options: [
          "It is acceptable, because it complies with the employer's code",
          "She must apply the ACCA Code: the self-interest threat to objectivity must be evaluated regardless of the corporate threshold",
          "It is acceptable because the amount is below any reportable level",
          "Corporate codes always override professional codes for employed accountants",
        ],
        correct: 1,
        explain:
          "A corporate code CANNOT AUTHORISE what the professional code requires you to evaluate. ACCA membership binds her regardless of her employer's threshold, so she must assess the SELF-INTEREST threat to objectivity created by accepting hospitality from a supplier whose contract she is currently evaluating — a threat the timing makes significant. 'It complies with company policy' is not a defence in a professional disciplinary process.",
      },
    },
    {
      id: "sources-of-dilemma",
      heading: "Where ethical conflicts come from",
      blocks: [
        {
          kind: "definition",
          term: "Ethical dilemma",
          md: "A situation in which there is **no course of action that satisfies every obligation** — the accountant must choose between competing duties, or between a duty and a serious personal cost. It is not the same as a situation where the right answer is obvious and merely unwelcome.",
        },
        {
          kind: "list",
          title: "Where conflicts arise for an accountant",
          items: [
            "**Employer pressure to misstate** — to recognise revenue early, defer a cost, release a provision or omit a liability.",
            "**Conflicting duties** — the duty to the employer against the duty to the public interest and to users of the accounts.",
            "**Confidentiality versus disclosure** — knowing something that others need to know but that you learned in confidence.",
            "**Pressure from a superior**, particularly one who controls your appraisal, pay and career.",
            "**Conflicts of interest** — a personal, family or financial interest on the other side of a decision.",
            "**Bribery, facilitation payments and 'local practice'** in another jurisdiction.",
            "**Whistleblowing** — whether, when and to whom to report, against the cost of doing so.",
            "**Loyalty to a colleague** whose conduct you have discovered.",
          ],
        },
        {
          kind: "illustration",
          title: "A dilemma that does not look like one at first",
          md: "A finance manager is asked by the finance director, three days before the year end, to reclassify $180,000 of repairs as capital expenditure. The director's explanation is that the work \"extended the life of the assets, so it is arguably capital, and it takes us over the covenant threshold — which protects everyone's jobs\".\n\nWhat makes this hard is not that it is obviously fraudulent. The argument is partly technical, the amount is not enormous, the motive is not personal enrichment, and the consequence of refusing may be real harm to colleagues. That combination — a plausible technical framing, a benign-sounding motive and a genuine cost to refusing — is what an actual dilemma feels like. Note also that **rationalisation** has been supplied ready-made, which is one of Chapter 16's fraud triangle conditions arriving in the conversation itself.",
        },
      ],
    },
    {
      id: "resolving",
      heading: "Resolving a dilemma — a process, not an instinct",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The resolution process",
            caption: "Escalation is stepwise. Each step is exhausted before the next is used, and everything is documented as you go.",
            data: {
              steps: [
                { label: "Establish the facts", sub: "what is actually proposed, what the numbers are, what the accounting or legal position genuinely is" },
                { label: "Identify the issues and principles", sub: "which fundamental principles are threatened, and who is affected" },
                { label: "Consider alternative courses", sub: "and the consequences of each for the users, the organisation and yourself" },
                { label: "Consult", sub: "internally with the ethics function or audit committee; confidentially with ACCA; and take legal advice if needed" },
                { label: "Escalate internally", sub: "line manager → their superior → audit committee or non-executive directors" },
                { label: "Act, and document", sub: "keep a contemporaneous written record of the facts, the advice and the decisions" },
                { label: "Last resort", sub: "if the matter cannot be resolved, withdraw from the engagement or resign — and consider any reporting obligation" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two things every dilemma answer must contain",
          md: "**Documentation.** Keep a contemporaneous written record of what was proposed, what you advised, whom you consulted and what was decided. It protects the public interest, it protects you, and its absence is what makes these situations unprovable a year later.\n\n**Stepwise escalation before resignation.** Resignation is the **last** resort, not the first. An answer that jumps straight to resigning has skipped internal escalation, consultation with ACCA, and the audit committee — and note that resigning without reporting may leave the misstatement in place, which does not discharge the duty to the public interest.",
        },
        {
          kind: "table",
          caption: "The courses of action available, in order",
          head: ["Action", "When"],
          rows: [
            ["Discuss and challenge it directly with the person proposing it", "First. It may be a genuine technical disagreement, or they may not have thought it through"],
            ["Obtain the technical position in writing", "Where the argument is dressed as a matter of judgement — pin down what the standards actually require"],
            ["Consult internally — ethics function, internal audit, a senior colleague", "Once the disagreement is established"],
            ["Consult ACCA's confidential ethical helpline, and take independent legal advice", "Before escalating externally, and before resigning"],
            ["Escalate to the audit committee or non-executive directors", "Where management is the source of the pressure — this is exactly why those bodies exist (Chapter 11)"],
            ["Use the whistleblowing route", "Where internal escalation has failed or is compromised"],
            ["Refuse to be associated with the information", "At any point — you may decline to prepare or sign something misleading"],
            ["Resign, and consider any external reporting duty", "Last resort. Note that resignation alone may not discharge a reporting obligation"],
          ],
        },
        {
          kind: "activity",
          title: "Activity 27 — work a full dilemma",
          prompt:
            "You are the financial controller. Two days before the year end, the finance director instructs you to release a $250,000 warranty provision that you know is still required, in order to meet a profit target on which the whole senior team's bonus depends. He says: \"It's a judgement call, I'm the FD, and if you can't take a commercial view I'll find someone who can.\"\n\nSet out how you would deal with this.",
          answer:
            "**1 — Establish the facts.** Confirm the basis of the provision, the evidence that the obligation still exists, the claims history, and what the applicable standard requires. It matters whether this is genuinely a judgement within a defensible range or a release with no support — and I should be certain before treating it as the latter.\n\n**2 — Identify the principles threatened.** **Integrity** — releasing a provision I know is required means being knowingly associated with misleading financial statements. **Objectivity** — my own bonus depends on the target, so I have a self-interest threat pointing the same way as the pressure. **Professional competence and due care** — I must apply the standard properly. The threats are **intimidation** (an explicit threat to my job) and **self-interest** (the bonus).\n\n**3 — Discuss and challenge directly.** Explain to the FD, in specific technical terms, why the evidence supports retaining the provision and what the consequences of releasing it are — a materially misstated result, a probable audit disagreement, and personal exposure for both of us. Offer the legitimate alternatives: disclose the judgement fully, or re-examine the estimate properly if he has evidence I have not seen.\n\n**4 — Consult and document.** Put my position in writing to him. Consult the ethics function or internal audit, and use **ACCA's confidential ethical helpline** — this is exactly the situation it exists for. Take legal advice on my employment position. Keep a contemporaneous record of every conversation, including his words about finding someone else, because that remark is itself evidence of the pressure.\n\n**5 — Escalate internally, stepwise.** If he will not move, escalate to the **audit committee or non-executive directors**. Management is the source of the pressure, so escalating within management is pointless; independent NEDs and the audit committee exist precisely for this (Chapter 11). I would also expect the external auditor to challenge the release, and I must not conceal it from them.\n\n**6 — Refuse to be associated with it.** Whatever else happens, I decline to prepare or sign accounts I know to be misleading. This is available to me at any stage and does not depend on anyone agreeing with me.\n\n**7 — Last resort: resign** — but only after the above, and with advice on whether a reporting obligation survives my departure. Resigning quietly would leave the misstatement in place and would not discharge my duty to the users of those accounts.\n\n**What I would NOT do:** comply and note my disagreement privately (that is still being associated with it); go straight to a regulator or the press without exhausting internal routes; or resign immediately, which abandons the position and helps nobody.",
        },
      ],
      check: {
        q: "An employed accountant is being pressured by their line manager to misstate a figure. Internal discussion has failed. What is the appropriate NEXT step?",
        options: [
          "Resign immediately",
          "Comply, while recording a private note of disagreement",
          "Escalate within the organisation — to senior management, the audit committee or non-executive directors — while consulting ACCA and documenting throughout",
          "Report the matter to the press to protect the public interest",
        ],
        correct: 2,
        explain:
          "Escalation is STEPWISE and internal routes are exhausted first — senior management, then the audit committee or non-executive directors, who exist precisely to handle matters where management is the problem. Alongside that, consult ACCA's confidential helpline, take legal advice and document contemporaneously. Resignation is the LAST resort and may not discharge a reporting obligation; complying with a private note still means being associated with misleading information; and going to the press bypasses every proper channel.",
      },
    },
    {
      id: "consequences",
      heading: "The consequences of unethical behaviour",
      blocks: [
        {
          kind: "table",
          caption: "Consequences on three levels",
          head: ["Level", "Consequences"],
          rows: [
            ["**The individual**", "Disciplinary action and dismissal; loss of ACCA membership and the right to practise; civil liability; criminal prosecution in serious cases; a reputation that follows them permanently"],
            ["**The organisation**", "Fines and regulatory sanction; litigation and compensation; loss of customers, contracts and licences; higher cost of capital as lenders and investors reprice the risk; management time consumed; failed audits and restatements; in extreme cases, collapse"],
            ["**The profession**", "Loss of the public trust on which the whole qualification's value rests; tighter and more costly regulation for every member; damage to every honest accountant's standing"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The argument that closes this paper",
          md: "An accountant's signature is worth something only because it is **reliably** worth something. Each ethical failure withdraws from a reserve of trust that no individual built alone and no individual can restore alone. That is why the profession polices itself, why the Code binds you outside work as well as in it, and why Area F is the part of BT that matters longest after the exam is over.",
        },
        {
          kind: "definition",
          term: "Bribery and facilitation payments",
          md: "A **bribe** is a financial or other advantage offered or received to induce improper performance of a function. A **facilitation payment** is a small payment to secure or speed up a routine action to which one is already entitled. Both are prohibited under most modern anti-bribery legislation, and the fact that a payment is customary in a particular market is **not** a defence.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The 'local practice' argument",
          md: "\"Everyone does it here and we cannot trade otherwise\" is the most common rationalisation in international business, and it fails on three grounds: anti-bribery legislation commonly applies **extra-territorially** to conduct abroad; the ACCA Code binds a member in every jurisdiction; and customary practice has never been a legal defence. The correct response is refusal, escalation and — where the market genuinely cannot be served lawfully — not serving it.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Treating compliance with an employer's code as sufficient.",
      fix: "The professional code binds you regardless. A corporate code cannot authorise what ACCA's Code forbids.",
    },
    {
      trap: "Jumping straight to resignation.",
      fix: "It is the LAST resort. Discuss, challenge, consult ACCA and legal advisers, escalate to senior management and then the audit committee, and document throughout.",
    },
    {
      trap: "Complying while making a private note of disagreement.",
      fix: "That is still being knowingly associated with misleading information, which breaches integrity. You may refuse to prepare or sign it.",
    },
    {
      trap: "Omitting documentation from a dilemma answer.",
      fix: "A contemporaneous written record of what was proposed, advised, consulted and decided protects the public interest and you. Its absence is why these matters become unprovable.",
    },
    {
      trap: "Accepting 'it is normal practice in that country' for a facilitation payment.",
      fix: "Anti-bribery law often applies extra-territorially, the ACCA Code binds you everywhere, and local custom has never been a defence.",
    },
    {
      trap: "Going straight to an external regulator or the press.",
      fix: "Internal routes — including the audit committee and non-executive directors — must be exhausted first, unless the law requires immediate external reporting.",
    },
  ],
  keyTerms: [
    { term: "Corporate code of ethics", def: "A document setting out the standards of behaviour an organisation requires of its employees and often its suppliers." },
    { term: "Ethical dilemma", def: "A situation in which no available course of action satisfies every obligation, requiring a choice between competing duties." },
    { term: "Bribe", def: "A financial or other advantage offered or received to induce the improper performance of a function." },
    { term: "Facilitation payment", def: "A small payment to secure or speed up a routine action to which one is already entitled — prohibited under most anti-bribery legislation." },
    { term: "Stepwise escalation", def: "Resolving a dilemma by exhausting each internal route in turn — line manager, senior management, audit committee — before external action or resignation." },
    { term: "Contemporaneous documentation", def: "A written record made at the time of what was proposed, advised, consulted and decided." },
  ],
  summary: [
    "A corporate code binds an organisation's employees; a professional code binds its members everywhere, and prevails where the two conflict.",
    "Codes fail when they are unread, visibly breached by senior managers, or contradicted by what the reward system pays for.",
    "Dilemmas arise from employer pressure to misstate, conflicting duties, confidentiality, superior pressure, conflicts of interest, bribery and whistleblowing.",
    "Resolution is a process: establish the facts, identify the principles, consider alternatives, consult, escalate stepwise, act and document.",
    "Documentation and stepwise escalation are the two things every dilemma answer must contain.",
    "Refusing to be associated with misleading information is available at any point; resignation is the last resort and may not discharge a reporting duty.",
    "Unethical behaviour costs the individual their career, the organisation its money and licence, and the profession the trust its value depends on.",
    "Local custom is never a defence to bribery, and anti-bribery law commonly applies extra-territorially.",
  ],
  knowledgeDiagnostic: [
    { q: "Which prevails, a corporate code or a professional code?", a: "The professional code. ACCA membership binds a member regardless of what an employer's policy permits, and 'it complied with company policy' is not a defence in a disciplinary process." },
    { q: "What are the steps in resolving an ethical dilemma?", a: "Establish the facts; identify the issues and principles threatened; consider alternative courses and their consequences; consult internally and with ACCA and legal advisers; escalate stepwise internally; act and document; and as a last resort withdraw or resign, considering any reporting obligation." },
    { q: "Why is resignation the last resort rather than the first?", a: "Because internal escalation — including to the audit committee and non-executive directors, who exist for exactly this — may resolve the matter, and because resigning quietly can leave the misstatement in place without discharging the duty to users of the accounts." },
    { q: "Why does documentation matter so much in a dilemma?", a: "A contemporaneous record of what was proposed, what was advised, whom you consulted and what was decided protects the public interest and the accountant. Without it, the events become unprovable later." },
    { q: "Is a facilitation payment acceptable where it is customary in the local market?", a: "No. Anti-bribery legislation commonly applies extra-territorially, the ACCA Code binds a member in every jurisdiction, and customary local practice has never been a legal defence." },
  ],
  furtherStudy: [
    "Ethical dilemmas at greater complexity are examined in **AA**, **SBL**, **SBR**, **ATX** (where five marks are routinely allocated to ethics) and **AAA**.",
    "ACCA operates a confidential ethical helpline for members and students facing exactly the situations in this chapter — it is a real resource, not an exam device.",
  ],
}

/* ── Areas E and F chapter lists, in reading order ─────────────── */

export const BT_TREE_AREA_E: StudyChapter[] = [BT_TREE_23, BT_TREE_24]
export const BT_TREE_AREA_F: StudyChapter[] = [BT_TREE_25, BT_TREE_26]
