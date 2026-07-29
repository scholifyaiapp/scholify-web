import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area D — Leading and managing individuals and teams.
 * Chapters 18–22 of the BT reading tree, mapped to syllabus groups D1–D7.
 *
 * This area is theory-heavy and named-model-heavy, which is exactly how it is
 * examined: a scenario, and the requirement to identify which theorist's model
 * applies and what it predicts. The chapters therefore drill the DISTINCTIONS
 * between adjacent models, which is where the marks are lost.
 *
 * Original Scholify teaching text throughout.
 */

/* ── Chapter 18 · D1 ───────────────────────────────────────────── */

export const BT_TREE_18: StudyChapter = {
  id: "BT-18",
  number: 18,
  paper: "BT",
  area: "D",
  title: "Leadership, management and supervision",
  minutes: 18,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "D1(d)", "D1(e)", "D1(f)"],
  intro:
    "Management and leadership are not synonyms, and the difference is examined directly. This chapter separates them, then works through the classical, human-relations and contingency schools that BT expects you to name and apply.",
  outcomes: [
    "Distinguish management, leadership and supervision",
    "Explain the classical theories of management — Fayol, Taylor and Weber",
    "Explain Mintzberg's managerial roles and Drucker's view of management",
    "Explain the human relations school and McGregor's Theory X and Theory Y",
    "Apply Blake and Mouton's managerial grid",
    "Apply contingency and situational models — Fiedler, Adair, Hersey and Blanchard",
    "Explain delegation, authority, responsibility and accountability",
  ],
  sections: [
    {
      id: "management-vs-leadership",
      heading: "Management, leadership and supervision",
      blocks: [
        {
          kind: "definition",
          term: "Management",
          md: "Getting things done through other people, by **planning, organising, directing and controlling** the use of resources to achieve the organisation's objectives. Its authority comes from **position**.",
        },
        {
          kind: "definition",
          term: "Leadership",
          md: "**Influencing** people so that they willingly follow toward a goal. Its authority comes from **personal qualities, credibility and relationship** rather than from position — which is why a person can lead without being a manager, and manage without leading.",
        },
        {
          kind: "definition",
          term: "Supervision",
          md: "The **first line** of management: directing and monitoring the day-to-day work of a specific group of employees, closest to the operation itself.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The contrast the examiner tests",
            caption: "An effective senior post needs both. They are complementary, not competing.",
            data: {
              leftTitle: "Management",
              rightTitle: "Leadership",
              rows: [
                { aspect: "Authority from", left: "Position in the hierarchy", right: "Personal influence and credibility" },
                { aspect: "Focus", left: "Systems, processes, resources, control", right: "People, vision, direction, change" },
                { aspect: "Time horizon", left: "Shorter — plans, budgets, targets", right: "Longer — where we are going and why" },
                { aspect: "Asks", left: "How, and when?", right: "What, and why?" },
                { aspect: "Achieves compliance by", left: "Formal authority and accountability", right: "Willing commitment" },
                { aspect: "Attitude to the status quo", left: "Administers and maintains it", right: "Challenges and changes it" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The trap in this distinction",
          md: "Do not conclude that leadership is good and management is inferior. An organisation run entirely by leaders and no managers has vision and no delivery. The examinable point is that they are **different functions** — and that a person appointed as a manager does not automatically become a leader.",
        },
      ],
      check: {
        q: "A team member with no formal authority is widely respected and consistently persuades colleagues to adopt better working methods. This person is best described as exercising:",
        options: [
          "Management, because they are directing others' work",
          "Leadership, because influence derives from personal credibility rather than position",
          "Supervision, because they oversee day-to-day work",
          "Neither, because authority requires a formal position",
        ],
        correct: 1,
        explain:
          "LEADERSHIP is influencing others so that they willingly follow, and its authority comes from personal qualities and credibility rather than from position. That is exactly what is described. Management and supervision both derive their authority from a formal position in the hierarchy, which this person does not hold — which is precisely why the example shows leadership and management are separable.",
      },
    },
    {
      id: "classical-school",
      heading: "The classical school",
      blocks: [
        {
          kind: "table",
          caption: "The three classical theorists and what each contributed",
          head: ["Theorist", "Contribution", "The examinable detail"],
          rows: [
            ["**Fayol**", "Identified the FUNCTIONS of management", "Planning, organising, commanding (directing), coordinating and controlling — plus fourteen principles including unity of command, division of work and scalar chain"],
            ["**Taylor**", "Scientific management — the ONE best way to do a task", "Study the task scientifically, select and train the right worker, standardise the method, pay by results. Treats the worker as economically motivated"],
            ["**Weber**", "Bureaucracy as the most rational form of organisation", "Rules, hierarchy, division of labour, impersonal application of procedure, appointment and promotion on technical competence"],
          ],
        },
        {
          kind: "definition",
          term: "Fayol's five functions",
          md: "**Planning** (deciding objectives and how to reach them), **organising** (arranging resources and structure), **commanding** or directing (instructing and motivating), **coordinating** (harmonising activities) and **controlling** (measuring against plan and correcting). Modern lists often merge commanding and coordinating into \"leading\".",
        },
        {
          kind: "list",
          title: "Criticisms of the classical school",
          items: [
            "**Treats people as machines.** Taylor's model assumes money is the only motivator, which Chapter 21's evidence contradicts.",
            "**Ignores the informal organisation** and the social needs Chapter 8 and Chapter 20 show to be powerful.",
            "**Assumes a stable environment.** Standardised methods and rigid hierarchy suit predictable work, not the conditions of Chapters 4 to 7.",
            "**Bureaucracy has real dysfunctions** — rule-following displacing purpose, slowness, resistance to change, and treating people as cases rather than individuals.",
            "**But do not dismiss it.** Fayol's functions remain the standard description of what managers do, and bureaucracy's impersonal application of rules is precisely what makes a tax authority or an examination board fair.",
          ],
        },
      ],
    },
    {
      id: "mintzberg-drucker",
      heading: "Mintzberg's roles and Drucker's tasks",
      blocks: [
        {
          kind: "text",
          md: "Mintzberg observed what managers actually **do** with their time, and found it far less orderly than the classical functions imply — fragmented, verbal, and reactive. He grouped the activity into ten roles under three headings.",
        },
        {
          kind: "table",
          caption: "Mintzberg's ten managerial roles",
          head: ["Category", "Roles", "What they involve"],
          rows: [
            ["**Interpersonal**", "Figurehead, Leader, Liaison", "Representing the unit ceremonially, motivating and developing staff, and maintaining a network outside the unit"],
            ["**Informational**", "Monitor, Disseminator, Spokesperson", "Scanning for information, passing it inward to the team, and speaking for the unit outward"],
            ["**Decisional**", "Entrepreneur, Disturbance handler, Resource allocator, Negotiator", "Initiating change, responding to crises, deciding who gets what, and bargaining on the unit's behalf"],
          ],
        },
        {
          kind: "definition",
          term: "Drucker's view",
          md: "Drucker argued management's job is to make an organisation **perform**, through five tasks: setting **objectives**, **organising** the work, **motivating and communicating**, **measuring** performance, and **developing people** — including oneself. He is also the source of **management by objectives**, in which manager and subordinate agree measurable goals together.",
        },
        {
          kind: "illustration",
          title: "Mintzberg in one afternoon",
          md: "A finance manager's afternoon: presents long-service awards (**figurehead**), coaches a struggling assistant (**leader**), takes a call from a supplier's credit team (**liaison**), reads a competitor's results announcement (**monitor**), forwards the relevant part to her team (**disseminator**), presents the month-end position to the board (**spokesperson**), proposes automating the reconciliation (**entrepreneur**), deals with a failed payment run (**disturbance handler**), decides which of two projects gets the analyst (**resource allocator**), and agrees payment terms with a customer (**negotiator**).\n\nAll ten roles, one afternoon. That fragmentation is Mintzberg's actual finding — and it is why \"planning\" as a tidy, uninterrupted activity describes management less accurately than it sounds.",
        },
      ],
    },
    {
      id: "human-relations",
      heading: "The human relations school and McGregor",
      blocks: [
        {
          kind: "text",
          md: "The human relations school arose from the finding that **social factors** affect productivity at least as much as physical conditions and pay — the conclusion drawn from the Hawthorne studies, where output rose partly because workers knew they were being studied and had been formed into a cohesive group.",
        },
        {
          kind: "definition",
          term: "The Hawthorne effect",
          md: "The tendency for people's behaviour and performance to change because they are **being observed** and because attention is being paid to them, independently of the change being tested. It is why any workplace intervention shows an initial improvement — and why the improvement often fades.",
        },
        {
          kind: "table",
          caption: "McGregor's Theory X and Theory Y",
          head: ["", "Theory X assumes", "Theory Y assumes"],
          rows: [
            ["About people", "They dislike work and avoid it if they can", "Work can be as natural as rest or play"],
            ["Motivation", "Only money and security; they must be driven", "Achievement, responsibility and self-fulfilment also motivate"],
            ["Responsibility", "They avoid it and prefer to be led", "They will seek and accept it, given the right conditions"],
            ["Management style that follows", "Direct, control, closely supervise, use threat of penalty", "Delegate, involve, set objectives, allow self-direction"],
            ["Control", "External — imposed by the manager", "Self-control toward agreed objectives"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The point McGregor was actually making",
          md: "These are not two types of **worker**. They are two sets of **assumptions held by managers**, and they are **self-fulfilling**. A manager who assumes Theory X supervises closely and removes discretion, so staff never demonstrate initiative — which appears to confirm the assumption. Answering \"the workforce is Theory X\" misses the entire argument; the correct form is \"the manager is applying Theory X assumptions\".",
        },
      ],
      check: {
        q: "A manager removes all discretion from her team, checks every task personally and uses the threat of disciplinary action to secure compliance. Her team shows no initiative. What does McGregor's work suggest?",
        options: [
          "The team genuinely consists of Theory X workers, and her style is correctly matched",
          "She holds Theory X assumptions, and her style is producing the passivity that appears to confirm them",
          "She holds Theory Y assumptions, since she is closely involved in the work",
          "Theory X and Theory Y describe types of task rather than assumptions",
        ],
        correct: 1,
        explain:
          "Theory X and Theory Y are sets of assumptions held by MANAGERS, not types of worker — and McGregor's key insight is that they are SELF-FULFILLING. A manager who assumes people avoid responsibility removes their discretion, so they never demonstrate initiative, which appears to prove the assumption right. Describing the team as 'Theory X workers' inverts the whole argument.",
      },
    },
    {
      id: "blake-mouton",
      heading: "Blake and Mouton's managerial grid",
      blocks: [
        {
          kind: "text",
          md: "Blake and Mouton plot a manager's style on two independent axes, each scored 1 to 9: **concern for production** (the task) and **concern for people**. The insight is that these are **independent** — high concern for one does not require low concern for the other.",
        },
        {
          kind: "table",
          caption: "The five named positions",
          head: ["Position", "Score", "Style"],
          rows: [
            ["**Impoverished**", "1,1", "Low concern for both. Minimal effort — going through the motions to stay employed"],
            ["**Country club**", "1,9", "High people, low task. A friendly, comfortable atmosphere; work does not get done"],
            ["**Task / authority-compliance**", "9,1", "High task, low people. Output at any cost; people are a resource to be used"],
            ["**Middle of the road**", "5,5", "Adequate performance through balancing and compromise; neither is pursued fully"],
            ["**Team**", "9,9", "High concern for both. Committed people working toward a shared goal — Blake and Mouton's ideal"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "How to read the coordinates",
          md: "The convention is **(concern for production, concern for people)**. So 9,1 is task-obsessed and 1,9 is people-obsessed. Reversing them is the single most common error on this model, and the two positions describe opposite managers.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The limitation to state",
          md: "The grid asserts one universally best style (9,9), which is precisely what **contingency** theory denies. In a genuine emergency — a fire, a safety incident, a systems failure — a 9,1 directive style is correct, and a 9,9 consultative one is dangerous. The grid is a useful diagnostic of a manager's default; it is weaker as a prescription.",
        },
      ],
    },
    {
      id: "contingency",
      heading: "Contingency and situational models",
      blocks: [
        {
          kind: "text",
          md: "Contingency theory's claim is simple: there is **no single best style**. Effectiveness depends on the situation — the task, the team, the manager and the context.",
        },
        {
          kind: "table",
          caption: "The three models BT names",
          head: ["Model", "What it says", "Practical use"],
          rows: [
            ["**Fiedler**", "Leaders are broadly either **task-oriented** or **relationship-oriented**, and style is hard to change. Effectiveness depends on how **favourable** the situation is — leader-member relations, task structure, and the leader's position power", "Match the leader to the situation, or change the situation, rather than trying to change the leader"],
            ["**Adair — action-centred leadership**", "A leader must balance three overlapping needs: the **TASK**, the **TEAM** and the **INDIVIDUAL**. Neglecting any one damages the others", "A checklist for a working manager: is the job getting done, is the group functioning, is each person developing?"],
            ["**Hersey and Blanchard — situational leadership**", "Style should vary with the follower's **readiness** (competence and commitment) for the specific task: **telling** → **selling** → **participating** → **delegating**", "The same person needs a different style for a task they are new to than for one they have mastered"],
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Hersey and Blanchard — style follows follower readiness",
            caption: "Readiness is task-specific: an experienced accountant tackling an unfamiliar system is back at 'telling' for that task.",
            data: {
              steps: [
                { label: "Telling", sub: "Low competence, low commitment — give clear specific instructions and supervise closely" },
                { label: "Selling", sub: "Some competence, low confidence — explain decisions, persuade, coach" },
                { label: "Participating", sub: "Competent but variable commitment — share decisions, support, encourage" },
                { label: "Delegating", sub: "High competence and commitment — hand over responsibility and step back" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Adair's three circles",
          md: "Task, team and individual needs, drawn as three overlapping circles. The point of the overlap is that they interact: neglect the **task** and the **team** loses purpose; neglect the **team** and the task fails through poor cooperation; neglect the **individual** and both suffer as motivation and capability erode.",
        },
        {
          kind: "activity",
          title: "Activity 19 — choose a style",
          prompt:
            "You supervise four staff.\n\n(a) A graduate in week two, keen but with no idea how the ledger works.\n(b) A twelve-year veteran who has done the year-end reconciliation flawlessly for a decade.\n(c) A capable assistant who has recently become withdrawn and is missing deadlines.\n(d) The whole team, at 4pm, when the payment file has failed and must go before the 5pm banking cut-off.\n\nUsing Hersey and Blanchard where appropriate, state the style for each and justify it.",
          answer:
            "**(a) Telling.** Low competence with high enthusiasm still needs specific instruction and close supervision, because keenness without knowledge produces confident mistakes. Directive here is not distrust; it is what the readiness level requires.\n\n**(b) Delegating.** High competence and high commitment on this specific task. Supervising closely would be insulting and would waste your time and theirs. Note the *task-specific* qualifier: if you moved them to a new consolidation system tomorrow, you would be back at telling for that task.\n\n**(c) Participating — and find out why first.** The competence is not in doubt, so this is a commitment problem, and the model says share decisions, support and encourage rather than instruct. But the honest answer starts before the style: withdrawal and missed deadlines in a previously reliable person signal something has changed — workload, a personal difficulty, a conflict, or disengagement. Adair's **individual** circle is the one being neglected here. Diagnose, then support.\n\n**(d) Telling — directive, immediately.** This is the contingency point against Blake and Mouton's universal 9,9. With a hard external deadline in an hour, consultation is the wrong tool: someone must direct, allocate and decide. Return to a consultative style afterwards for the post-mortem on why the file failed — and do hold that post-mortem, or the same crisis recurs.",
        },
      ],
    },
    {
      id: "delegation",
      heading: "Delegation, authority, responsibility and accountability",
      blocks: [
        {
          kind: "definition",
          term: "The four terms, precisely",
          md: "**Delegation** — entrusting a task and the authority to do it to a subordinate. **Authority** — the right to take decisions and give instructions. **Responsibility** — the obligation to perform the task. **Accountability** — the requirement to answer for the outcome.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The rule that is examined every single time",
          md: "**Authority can be delegated. Accountability cannot.** A manager who delegates a task remains answerable for its outcome to their own superior. This is why delegation requires selecting the right person, briefing them properly and monitoring — and why \"I delegated it\" is never a defence.",
        },
        {
          kind: "table",
          caption: "Delegation weighed up",
          head: ["Benefits", "Why managers avoid it"],
          rows: [
            ["Frees the manager for work only they can do", "Fear that the job will be done badly and reflect on them"],
            ["Decisions are taken closer to the information", "Reluctance to lose control, or the status the task confers"],
            ["Develops subordinates and builds succession", "Belief that explaining takes longer than doing it themselves"],
            ["Motivates through trust, responsibility and growth", "Fear of being outperformed by a subordinate"],
            ["Improves the organisation's resilience if someone leaves", "Genuinely lacking a subordinate ready for it — a training failure, not a delegation one"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Delegating properly",
          items: [
            "**Select the right person** — competence and readiness for this task (Hersey and Blanchard).",
            "**Define the outcome**, not the method, and state the constraints — budget, deadline, limits of authority.",
            "**Grant the authority needed** to actually do it. Delegating a task without the authority to act guarantees failure.",
            "**Tell others** that the authority has been delegated, or the person cannot use it.",
            "**Agree checkpoints** rather than either abandoning them or hovering.",
            "**Support without taking it back** — coach when they struggle; reclaiming the task destroys the development and the trust.",
            "**Review and give feedback**, and accept accountability for the outcome yourself.",
          ],
        },
      ],
      check: {
        q: "A finance manager delegates the preparation of the monthly management accounts to a senior assistant, who makes a material error that misleads the board. Where does accountability for the outcome rest?",
        options: [
          "With the assistant, because the task was delegated to them",
          "With the finance manager, because accountability cannot be delegated",
          "Jointly and equally, since both were involved",
          "With the board, because they relied on the information",
        ],
        correct: 1,
        explain:
          "AUTHORITY can be delegated; ACCOUNTABILITY cannot. The finance manager remains answerable to their own superior for the outcome, which is exactly why proper delegation requires choosing a suitable person, briefing them clearly, granting real authority and agreeing checkpoints. The assistant carries RESPONSIBILITY for performing the task, and may face consequences for poor performance — but that is a different thing from accountability for the outcome.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating management and leadership as the same thing.",
      fix: "Management's authority comes from POSITION and focuses on systems and control. Leadership's comes from personal INFLUENCE and focuses on people, vision and change.",
    },
    {
      trap: "Describing staff as 'Theory X workers'.",
      fix: "Theory X and Y are assumptions held by MANAGERS, and they are self-fulfilling. The correct form is 'the manager applies Theory X assumptions'.",
    },
    {
      trap: "Reversing Blake and Mouton's coordinates.",
      fix: "The order is (concern for PRODUCTION, concern for PEOPLE). 9,1 is task-obsessed; 1,9 is the country club. The two describe opposite managers.",
    },
    {
      trap: "Asserting that 9,9 team management is always correct.",
      fix: "Contingency theory denies a universal best style. In an emergency with a hard deadline, a directive 9,1 approach is right and consultation is dangerous.",
    },
    {
      trap: "Applying Hersey and Blanchard to a person rather than to a task.",
      fix: "Readiness is TASK-SPECIFIC. An expert on one task is back at 'telling' for an unfamiliar one.",
    },
    {
      trap: "Saying a manager who delegated is no longer answerable.",
      fix: "Authority is delegable; accountability is not. The manager still answers for the outcome to their own superior.",
    },
    {
      trap: "Delegating a task without the authority to carry it out.",
      fix: "Authority must accompany the task, and others must be told it has been granted, or the person cannot act on it.",
    },
  ],
  keyTerms: [
    { term: "Management", def: "Getting things done through others by planning, organising, directing and controlling resources; authority derives from position." },
    { term: "Leadership", def: "Influencing people so they willingly follow toward a goal; authority derives from personal credibility rather than position." },
    { term: "Fayol's functions", def: "Planning, organising, commanding, coordinating and controlling — the classical description of what managers do." },
    { term: "Scientific management", def: "Taylor's approach of studying a task to find the one best method, standardising it, and paying by results." },
    { term: "Bureaucracy", def: "Weber's rational organisational form based on rules, hierarchy, division of labour and impersonal application of procedure." },
    { term: "Hawthorne effect", def: "The change in behaviour and performance caused by being observed and given attention, independent of the change being tested." },
    { term: "Theory X and Theory Y", def: "McGregor's two sets of managerial assumptions about people, which are self-fulfilling in their effects." },
    { term: "Managerial grid", def: "Blake and Mouton's model plotting concern for production against concern for people, each scored 1 to 9." },
    { term: "Action-centred leadership", def: "Adair's model requiring a leader to balance task, team and individual needs." },
    { term: "Situational leadership", def: "Hersey and Blanchard's model varying style — telling, selling, participating, delegating — with the follower's readiness for a specific task." },
    { term: "Accountability", def: "The requirement to answer for an outcome, which cannot be delegated even when authority is." },
  ],
  summary: [
    "Management derives authority from position and focuses on systems; leadership derives it from influence and focuses on people and direction.",
    "The classical school gave us Fayol's functions, Taylor's scientific management and Weber's bureaucracy — useful still, but built for stable conditions and economically motivated workers.",
    "Mintzberg found real managerial work fragmented across ten interpersonal, informational and decisional roles.",
    "McGregor's Theory X and Y are managers' assumptions, not worker types, and they are self-fulfilling.",
    "Blake and Mouton plot concern for production against concern for people; 9,9 team management is their ideal but not universally correct.",
    "Contingency models — Fiedler, Adair, Hersey and Blanchard — deny a single best style and match it to the situation and to task-specific follower readiness.",
    "Authority can be delegated; accountability cannot. Proper delegation needs the right person, a defined outcome, real authority, and agreed checkpoints.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between management and leadership?", a: "Management's authority comes from position and it focuses on planning, organising and controlling systems and resources. Leadership's authority comes from personal influence and it focuses on people, vision, direction and change." },
    { q: "What are Fayol's five functions of management?", a: "Planning, organising, commanding (directing), coordinating and controlling." },
    { q: "What was McGregor's key insight about Theory X and Theory Y?", a: "They are sets of assumptions held by managers, not types of worker — and they are self-fulfilling: a Theory X manager removes discretion, so staff never show initiative, which appears to confirm the assumption." },
    { q: "What are Adair's three circles?", a: "Task, team and individual needs. They overlap, so neglecting any one damages the other two." },
    { q: "What can and cannot be delegated?", a: "Authority — the right to decide and instruct — can be delegated. Accountability for the outcome cannot: the delegating manager still answers to their own superior." },
  ],
  furtherStudy: [
    "Leadership, change management and organisational culture combine as a major **SBL** theme.",
    "Chapters 20 and 21 develop group behaviour and motivation, which are what a leader is actually working with.",
  ],
}

/* ── Chapter 19 · D2 ───────────────────────────────────────────── */

export const BT_TREE_19: StudyChapter = {
  id: "BT-19",
  number: 19,
  paper: "BT",
  area: "D",
  title: "Recruitment and selection",
  minutes: 15,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)", "D2(d)", "D2(e)"],
  intro:
    "Recruitment attracts candidates; selection chooses between them. Getting either wrong is expensive twice over — once in the cost of hiring, and again in the cost of the mistake and of replacing it.",
  outcomes: [
    "Distinguish recruitment from selection and explain the stages of the process",
    "Explain the purpose of a job analysis, job description and person specification",
    "Compare internal and external recruitment",
    "Evaluate the main selection methods including interviews, tests and assessment centres",
    "Explain reliability and validity in selection",
    "Explain the legal and ethical requirements of a fair selection process",
    "Explain the purpose of induction and the responsibilities of HR versus the line manager",
  ],
  sections: [
    {
      id: "recruitment-vs-selection",
      heading: "Two different activities",
      blocks: [
        {
          kind: "definition",
          term: "Recruitment and selection",
          md: "**Recruitment** is attracting a suitable pool of applicants. **Selection** is choosing the best candidate from that pool. Recruitment is about **generating** choice; selection is about **exercising** it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The process end to end",
            caption: "Everything after 'person specification' depends on getting that document right.",
            data: {
              steps: [
                { label: "Identify the vacancy", sub: "and question whether the role is still needed in its current form" },
                { label: "Job analysis", sub: "systematically examine what the job actually involves" },
                { label: "Job description & person specification", sub: "the role's duties, and the attributes needed to do it" },
                { label: "Attract applicants", sub: "internal advertisement, external advertising, agencies, referrals" },
                { label: "Shortlist", sub: "screen applications against the person specification" },
                { label: "Select", sub: "interviews, tests, assessment centre, references" },
                { label: "Offer and induct", sub: "offer, contract, and a structured induction" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "The two documents, and why the distinction matters",
          head: ["Document", "Describes", "Used for"],
          rows: [
            ["**Job description**", "The JOB — title, reporting line, purpose, duties, responsibilities, conditions", "Advertising, contract terms, appraisal, job evaluation and pay grading"],
            ["**Person specification**", "The PERSON — knowledge, skills, qualifications, experience and attributes needed, split into essential and desirable", "Shortlisting criteria, interview questions, and the objective basis for a defensible decision"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why the person specification does the heavy lifting",
          md: "It converts a hiring decision from an impression into an assessment. Every shortlisting criterion, interview question and test should trace back to a stated requirement — which makes the decision **consistent** between candidates, **defensible** if challenged, and far less exposed to the biases described below.",
        },
      ],
      check: {
        q: "Which document sets out the knowledge, skills, qualifications and attributes required of the post-holder?",
        options: [
          "The job description",
          "The person specification",
          "The employment contract",
          "The job advertisement",
        ],
        correct: 1,
        explain:
          "The PERSON SPECIFICATION describes the PERSON needed — knowledge, skills, qualifications, experience and attributes, usually split into essential and desirable. The JOB DESCRIPTION describes the JOB: its title, reporting line, purpose, duties and conditions. Keeping the two apart matters because the person specification is what makes shortlisting and interviewing objective and defensible.",
      },
    },
    {
      id: "internal-vs-external",
      heading: "Internal and external recruitment",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Where to look",
            caption: "Most organisations do both, and advertise internally first.",
            data: {
              leftTitle: "Internal",
              rightTitle: "External",
              rows: [
                { aspect: "Cost and speed", left: "Cheaper and faster", right: "Advertising, agency fees, longer lead time" },
                { aspect: "Knowledge of the candidate", left: "Performance is known, not claimed", right: "Assessed only through the selection process" },
                { aspect: "Effect on motivation", left: "Visible promotion path motivates everyone", right: "Can demotivate internal candidates passed over" },
                { aspect: "Induction", left: "Already knows the organisation and its systems", right: "Needs full induction, and takes longer to become productive" },
                { aspect: "New thinking", left: "Risk of perpetuating existing assumptions", right: "Brings fresh perspective, new skills and competitor knowledge" },
                { aspect: "Knock-on effect", left: "Creates another vacancy further down", right: "Fills the role without creating a second gap" },
                { aspect: "Diversity", left: "Tends to reproduce the current profile of the workforce", right: "Can widen the diversity of the organisation" },
              ],
            },
          },
        },
      ],
    },
    {
      id: "selection-methods",
      heading: "Selection methods",
      blocks: [
        {
          kind: "table",
          caption: "The main methods, honestly assessed",
          head: ["Method", "Strengths", "Weaknesses"],
          rows: [
            ["**Unstructured interview**", "Flexible, builds rapport, universally accepted by candidates", "Poor predictor of performance; highly exposed to interviewer bias; not comparable between candidates"],
            ["**Structured / competency interview**", "Same questions and scoring for every candidate, tied to the person specification; far better validity", "Takes preparation; can feel mechanical; needs trained interviewers"],
            ["**Panel interview**", "Multiple perspectives dilute individual bias; more defensible", "Intimidating for the candidate; costly in senior time; risk of groupthink"],
            ["**Aptitude / ability tests**", "Objective, quantified, good predictive validity for job-relevant abilities", "Must be job-relevant and validated, or they risk being discriminatory"],
            ["**Personality questionnaires**", "Insight into working style and team fit", "Weak predictive validity alone; candidates can present favourably; must never be the sole basis"],
            ["**Work sample / practical test**", "Directly demonstrates the actual work — strong validity", "Only feasible for tasks that can be simulated in a short time"],
            ["**Assessment centre**", "Multiple exercises and multiple assessors over time; the strongest validity available", "Expensive and time-consuming; normally reserved for senior or graduate intakes"],
            ["**References**", "Verify factual history; may reveal a serious concern", "Often bland and legally cautious; weak differentiator between good candidates"],
          ],
        },
        {
          kind: "definition",
          term: "Reliability and validity",
          md: "**Reliability** is consistency — the same candidate assessed twice, or by two assessors, gets the same result. **Validity** is whether the method actually **predicts job performance**. A method can be reliable and invalid: measuring a candidate's height is perfectly reliable and predicts nothing.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The one-line distinction",
          md: "**Reliable = consistent. Valid = predicts performance.** Validity is what you actually want; reliability is a precondition for it. A method that is not reliable cannot be valid, but reliability alone is worthless.",
        },
        {
          kind: "list",
          title: "Interviewer biases to be able to name",
          items: [
            "**Halo effect** — one strong positive feature colours the whole assessment favourably.",
            "**Horns effect** — the same in reverse, from one negative feature.",
            "**Similar-to-me bias** — favouring candidates who resemble the interviewer in background, education or interests. The most damaging for diversity.",
            "**Stereotyping** — assuming characteristics from group membership rather than assessing the individual.",
            "**Recency and primacy** — over-weighting the first or last candidate seen.",
            "**Contrast effect** — judging a candidate against the previous one rather than against the person specification.",
            "**Snap judgement** — deciding in the first minutes and spending the rest of the interview seeking confirmation.",
          ],
        },
        {
          kind: "illustration",
          title: "How similar-to-me bias survives good intentions",
          md: "Three interviewers, all graduates of the same university, all consciously committed to fair hiring, independently rate the candidate who attended their university as \"a good cultural fit\" and \"someone who would settle in quickly\".\n\nNone of them mentioned the university. Each formed a genuine, sincerely-held impression of rapport — which is precisely what similar-to-me bias feels like from the inside. It is not defeated by wanting to be fair. It is defeated by a structured interview scoring predefined criteria, where \"cultural fit\" is either replaced by a stated requirement or excluded.",
        },
        {
          kind: "activity",
          title: "Activity 20 — fix a broken selection process",
          prompt:
            "A firm fills a management accountant vacancy as follows: the finance director interviews four candidates alone, using different questions for each depending on how the conversation goes; there is no person specification; the advertisement asks for \"a young, dynamic self-starter\"; and the decision is recorded as \"best fit for the team\".\n\nIdentify four weaknesses and state the fix for each.",
          answer:
            "**1 — No person specification.** There is no objective standard against which anyone was assessed, so \"best fit\" cannot be evidenced and the decision cannot be defended. **Fix:** write a person specification from a job analysis, split into essential and desirable, before advertising.\n\n**2 — The advertisement is discriminatory.** \"Young\" is direct age discrimination and is unlawful; note that this bites at recruitment, before any contract exists (Chapter 3). \"Dynamic self-starter\" is not unlawful but is unmeasurable. **Fix:** specify the required competencies and experience in job-related terms and remove any reference to age.\n\n**3 — A single interviewer using different questions for each candidate.** This is neither reliable (no consistency) nor valid (nothing job-related is being measured consistently), and it maximises exposure to halo, similar-to-me and contrast effects. **Fix:** a structured, competency-based interview with the same questions and a scoring scheme, conducted by a trained panel of at least two.\n\n**4 — Interview as the only method, with a subjective decision record.** The unstructured interview is among the weakest predictors available, and \"best fit for the team\" is the phrase most likely to encode similar-to-me bias. **Fix:** add a job-relevant work sample — a practical exercise on a real reconciliation or variance analysis — take references, and record scores against each specification criterion with reasons.\n\n**The underlying point:** every fix is the same move — replace impression with evidence against a stated requirement. That is what makes selection both more accurate and legally defensible.",
        },
      ],
    },
    {
      id: "induction",
      heading: "Induction, and who does what",
      blocks: [
        {
          kind: "definition",
          term: "Induction",
          md: "The planned introduction of a new employee to the organisation, their role, their team and the practical and safety information they need. Its purpose is to make them **productive sooner** and to reduce **early leaving**, which is when turnover is most expensive.",
        },
        {
          kind: "list",
          title: "What a good induction covers",
          items: [
            "**Terms and administration** — contract, pay, hours, holiday, systems access.",
            "**Health and safety** — a legal requirement, not a formality (Chapter 3).",
            "**The organisation** — what it does, its structure, its objectives, its culture and its code of ethics.",
            "**The job itself** — objectives, standards, how performance will be measured, who to ask.",
            "**The people** — team, key contacts in other functions, and who to escalate to.",
            "**Follow-up** — checkpoints in the first weeks, not a single day-one briefing.",
          ],
        },
        {
          kind: "table",
          caption: "HR and the line manager have different jobs",
          head: ["HR department", "Line manager"],
          rows: [
            ["Advises on process, law and best practice", "Identifies the need and defines what the role must deliver"],
            ["Drafts documentation and manages advertising and logistics", "Contributes the technical content of the person specification"],
            ["Ensures consistency and legal compliance across the organisation", "Assesses technical competence and normally makes the decision"],
            ["Runs the organisational part of induction and holds the records", "Runs the job-specific induction and the follow-up"],
            ["Owns the framework", "Owns the outcome"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The examinable division",
          md: "HR **advises and enables**; the line manager **decides and owns**. Answers that hand the whole process to HR miss that the manager is accountable for the person's performance — which is Chapter 18's rule about accountability applied to hiring.",
        },
      ],
    },
  ],
  examTraps: [
    {
      trap: "Using 'job description' and 'person specification' interchangeably.",
      fix: "The job description describes the JOB — duties and conditions. The person specification describes the PERSON — knowledge, skills, experience and attributes.",
    },
    {
      trap: "Confusing reliability with validity.",
      fix: "Reliable = consistent. Valid = actually predicts job performance. A perfectly reliable measure can predict nothing at all.",
    },
    {
      trap: "Treating the unstructured interview as a strong selection method.",
      fix: "It is among the weakest predictors and the most bias-exposed. Structured competency interviews, work samples and assessment centres have far better validity.",
    },
    {
      trap: "Assuming discrimination law only applies once someone is employed.",
      fix: "It applies at recruitment. A discriminatory advertisement or shortlisting criterion is unlawful before any contract exists.",
    },
    {
      trap: "Recording a decision as 'best cultural fit' with no criteria.",
      fix: "That phrase most often encodes similar-to-me bias and is indefensible if challenged. Score each candidate against stated specification criteria, with reasons.",
    },
    {
      trap: "Giving the whole recruitment process to HR.",
      fix: "HR advises, ensures compliance and manages logistics. The line manager defines the requirement, assesses technical competence, decides and remains accountable.",
    },
  ],
  keyTerms: [
    { term: "Recruitment", def: "Attracting a suitable pool of applicants for a vacancy." },
    { term: "Selection", def: "Choosing the most suitable candidate from the pool of applicants." },
    { term: "Job analysis", def: "The systematic examination of what a job actually involves, from which the job description and person specification are written." },
    { term: "Job description", def: "A statement of a job's title, reporting line, purpose, duties, responsibilities and conditions." },
    { term: "Person specification", def: "A statement of the knowledge, skills, qualifications, experience and attributes required of the post-holder, split into essential and desirable." },
    { term: "Reliability", def: "The consistency of a selection method — the same candidate assessed twice or by two assessors gets the same result." },
    { term: "Validity", def: "The extent to which a selection method actually predicts job performance." },
    { term: "Halo effect", def: "Allowing one strong positive feature to colour the whole assessment of a candidate favourably." },
    { term: "Similar-to-me bias", def: "Favouring candidates who resemble the interviewer in background, education or interests." },
    { term: "Assessment centre", def: "A selection process using multiple exercises and multiple assessors over an extended period, giving the highest available validity." },
    { term: "Induction", def: "The planned introduction of a new employee to the organisation, role, team and required practical and safety information." },
  ],
  summary: [
    "Recruitment attracts applicants; selection chooses between them.",
    "The job description describes the job; the person specification describes the person, and it is what makes selection objective and defensible.",
    "Internal recruitment is cheaper, faster and motivating but reproduces existing thinking; external recruitment brings new skills at higher cost and longer lead time.",
    "Unstructured interviews predict poorly; structured competency interviews, work samples and assessment centres are far more valid.",
    "Reliability is consistency and validity is predictive power — validity is what matters, and reliability is only a precondition.",
    "Halo, horns, similar-to-me, stereotyping, recency, contrast and snap judgement are the biases a structured process is designed to defeat.",
    "Discrimination law applies from the advertisement onward, before any contract exists.",
    "HR advises, ensures compliance and manages logistics; the line manager defines the requirement, decides and remains accountable.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between recruitment and selection?", a: "Recruitment attracts a suitable pool of applicants — generating choice. Selection chooses the best candidate from that pool — exercising it." },
    { q: "What is the difference between a job description and a person specification?", a: "The job description sets out the JOB: title, reporting line, purpose, duties and conditions. The person specification sets out the PERSON: knowledge, skills, qualifications, experience and attributes, split into essential and desirable." },
    { q: "What is the difference between reliability and validity?", a: "Reliability is consistency of measurement; validity is whether the method predicts job performance. A method can be perfectly reliable and predict nothing." },
    { q: "Name four interviewer biases.", a: "Halo effect, horns effect, similar-to-me bias, stereotyping, recency and primacy, contrast effect, and snap judgement." },
    { q: "What is induction for?", a: "To make a new employee productive sooner and to reduce early leaving, by covering terms, health and safety, the organisation, the job, the people, and follow-up checkpoints." },
  ],
  furtherStudy: [
    "Discrimination and unfair dismissal law is examined in far more depth in **LW**.",
    "Chapter 22 covers what happens after selection — training, development and appraisal.",
  ],
}

/* ── Chapter 20 · D3, D4 ───────────────────────────────────────── */

export const BT_TREE_20: StudyChapter = {
  id: "BT-20",
  number: 20,
  paper: "BT",
  area: "D",
  title: "Individual, group and team behaviour",
  minutes: 16,
  syllabusRefs: ["D3(a)", "D3(b)", "D3(c)", "D4(a)", "D4(b)", "D4(c)", "D4(d)"],
  intro:
    "A group of people is not the same thing as a team, and neither behaves like the sum of its members. This chapter covers what changes when individuals work in groups, how teams develop, and what makes one effective.",
  outcomes: [
    "Explain the factors that influence individual behaviour at work",
    "Distinguish a group from a team",
    "Explain the purposes of groups and teams in an organisation",
    "Apply Tuckman's stages of group development",
    "Apply Belbin's team roles",
    "Explain what makes a team effective and how effectiveness is measured",
    "Explain group cohesion, groupthink and social loafing",
  ],
  sections: [
    {
      id: "individual-behaviour",
      heading: "What shapes individual behaviour at work",
      blocks: [
        {
          kind: "list",
          title: "The influences on how one person behaves",
          items: [
            "**Personality** — relatively stable traits shaping how someone characteristically responds.",
            "**Perception** — the same situation is read differently by different people, and behaviour follows the reading, not the facts.",
            "**Attitudes and values** — what the person considers important and how they evaluate what happens to them.",
            "**Ability and aptitude** — what they can actually do, and what they could learn to do.",
            "**Motivation** — what they want from work, which Chapter 21 develops fully.",
            "**Role** — the expectations attaching to the position they occupy, which can conflict with their own preferences.",
            "**The group** — the norms of the people around them, which is the subject of this chapter.",
            "**The organisation and its culture** — what gets rewarded and tolerated (Chapter 9).",
          ],
        },
        {
          kind: "definition",
          term: "Role conflict and role ambiguity",
          md: "**Role conflict** arises when a person faces incompatible expectations — a matrix employee told by two bosses to prioritise different work (Chapter 8). **Role ambiguity** arises when the expectations are unclear, so the person does not know what they are supposed to do or how it will be judged. Both are significant causes of stress and poor performance, and both are management failures rather than individual ones.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Behaviour follows perception, not facts",
          md: "Two employees receive identical feedback. One reads it as investment in their development; the other reads it as the beginning of a case against them. Their subsequent behaviour diverges completely — and the manager who delivered the same words to both is often baffled. This is why Chapter 24 treats the **receiver's** interpretation as part of communication rather than an optional extra.",
        },
      ],
    },
    {
      id: "groups-vs-teams",
      heading: "Groups and teams are not the same",
      blocks: [
        {
          kind: "definition",
          term: "Group",
          md: "Two or more people who see themselves as a group and **interact** with one another. That is all it requires: awareness and interaction.",
        },
        {
          kind: "definition",
          term: "Team",
          md: "A group with a **common purpose**, **interdependent** work, **complementary** skills and **shared accountability** for a collective result. A team is a group with those four additions — which is why not every group is a team, and why calling one a team does not make it one.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The distinction, precisely",
            caption: "Everyone in the accounts department is a group. The four people running the year-end close together are a team.",
            data: {
              leftTitle: "Group",
              rightTitle: "Team",
              rows: [
                { aspect: "Purpose", left: "May simply share a location or a manager", right: "A specific common purpose all members own" },
                { aspect: "Work", left: "Largely independent", right: "Interdependent — one member's output is another's input" },
                { aspect: "Accountability", left: "Individual", right: "Shared for the collective result, as well as individual" },
                { aspect: "Skills", left: "Often similar", right: "Deliberately complementary" },
                { aspect: "Measured by", left: "Each member's own output", right: "The collective outcome" },
              ],
            },
          },
        },
        {
          kind: "list",
          title: "What organisations use groups and teams for",
          items: [
            "**Combining skills** on work no individual could complete alone.",
            "**Generating ideas** — more perspectives produce more options, though see groupthink below.",
            "**Coordination** across functions on interdependent work.",
            "**Securing commitment** — involvement in a decision produces ownership of it.",
            "**Control and self-regulation** — team norms enforce standards more effectively than supervision.",
            "**Meeting social needs**, which supports morale and retention.",
            "**Developing people** — exposure to colleagues' skills and to wider decisions.",
          ],
        },
      ],
      check: {
        q: "Six employees all report to the same manager, sit in the same office, and each independently processes their own portfolio of client accounts. What are they?",
        options: [
          "A team, because they share a manager and a location",
          "A group, because they interact but their work is independent and accountability is individual",
          "A team, because they all work on client accounts",
          "Neither a group nor a team",
        ],
        correct: 1,
        explain:
          "They are a GROUP: they see themselves as one and they interact, but their work is INDEPENDENT and accountability is INDIVIDUAL. A team additionally requires a common purpose, interdependent work, complementary skills and shared accountability for a collective result. Sharing a manager, a location or a subject matter does not make a group into a team.",
      },
    },
    {
      id: "tuckman",
      heading: "Tuckman's stages of group development",
      blocks: [
        {
          kind: "text",
          md: "Tuckman's model says that groups **develop through predictable stages**, and that performance is not available at the start. Its practical value is that a manager who recognises the stage knows what to do about it.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The five stages",
            caption: "Storming is normal and necessary — a group that skips it usually has unresolved conflict rather than none.",
            data: {
              steps: [
                { label: "Forming", sub: "Members meet, are polite and guarded, and look to the leader for direction. Little work gets done" },
                { label: "Storming", sub: "Conflict over objectives, roles and influence surfaces. Uncomfortable, and essential" },
                { label: "Norming", sub: "Norms, roles and ways of working settle; cohesion builds and conflict is handled" },
                { label: "Performing", sub: "The group works effectively toward its objective, adapting as it goes" },
                { label: "Adjourning / dorming", sub: "The group disbands having completed its purpose — or, if it persists too long unchanged, becomes complacent" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "What the manager should do at each stage",
          head: ["Stage", "Manager's action"],
          rows: [
            ["Forming", "Provide clear direction, purpose and structure. Do not expect output yet"],
            ["Storming", "Do not suppress the conflict — surface it, mediate, and hold the group to its purpose. Suppression defers it rather than resolving it"],
            ["Norming", "Reinforce the emerging norms and standards; let the group take on more of its own management"],
            ["Performing", "Delegate, remove obstacles, and protect the group from interference"],
            ["Adjourning", "Recognise achievement, capture what was learned, and manage the transition out"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The mistake with storming",
          md: "Managers frequently treat storming as evidence that the team is failing or badly composed, and intervene to restore harmony. That converts open disagreement into suppressed disagreement, which resurfaces later as passive resistance or as groupthink. **Storming is a stage to be managed through, not prevented.**",
        },
      ],
    },
    {
      id: "belbin",
      heading: "Belbin's team roles",
      blocks: [
        {
          kind: "text",
          md: "Belbin's finding was that effective teams need a **balance of behavioural roles**, not simply a collection of the most able individuals. A team of nine brilliant analysts fails because nobody finishes anything or talks to anyone outside.",
        },
        {
          kind: "table",
          caption: "The nine team roles, grouped",
          head: ["Group", "Role", "Contribution", "Allowable weakness"],
          rows: [
            ["Thinking", "**Plant**", "Creative, generates ideas and solves difficult problems", "Ignores detail; poor at communicating"],
            ["Thinking", "**Monitor-evaluator**", "Sober, strategic, judges options accurately", "Lacks drive; can seem overly critical"],
            ["Thinking", "**Specialist**", "Deep single-subject expertise", "Contributes only on a narrow front"],
            ["Action", "**Shaper**", "Drives the team forward, thrives on pressure", "Can be abrasive and provoke offence"],
            ["Action", "**Implementer**", "Turns ideas into practical, reliable action", "Somewhat inflexible; slow to see new possibilities"],
            ["Action", "**Completer-finisher**", "Conscientious, finds errors, delivers on time", "Anxious; reluctant to delegate; can nit-pick"],
            ["People", "**Coordinator**", "Chairs, clarifies goals, draws out contributions and delegates", "Can be seen as manipulative; may offload personal work"],
            ["People", "**Teamworker**", "Cooperative, diplomatic, holds the team together", "Indecisive in a crunch; avoids confrontation"],
            ["People", "**Resource investigator**", "Explores opportunities and develops contacts outside", "Over-optimistic; loses interest once initial enthusiasm passes"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two things Belbin is often mis-stated as",
          md: "**It describes behaviour, not personality or job title.** A finance director might play plant on one team and completer-finisher on another.\n\n**A team needs a BALANCE, not all nine.** Most people can play two or three roles, so a team of five can cover the necessary range. The examinable insight is which role is **missing** — a team with no completer-finisher misses deadlines and ships errors; one with no shaper never gets started.",
        },
        {
          kind: "illustration",
          title: "The team that generated forty ideas and delivered none",
          md: "A project team is staffed with the four most creative people in the company. Meetings are energetic and the idea list grows every week. Six months in, nothing has shipped.\n\nIn Belbin's terms the team is all **plant** and has no **implementer** to turn ideas into action, no **completer-finisher** to drive them to done, and no **coordinator** to hold anyone to a decision. Every member is excellent and the team is dysfunctional — which is exactly Belbin's point, and why \"hire the best people\" is not a team design strategy.",
        },
        {
          kind: "activity",
          title: "Activity 21 — diagnose a team",
          prompt:
            "A five-person systems implementation team has: a manager who chairs well and draws everyone out; two highly analytical members who scrutinise every proposal thoroughly; a diplomat who smooths over disagreements; and a subject expert on the legacy system. Deadlines slip repeatedly, decisions are revisited, and no one has spoken to the software vendor for a month.\n\nIdentify the Belbin roles present, the roles missing, and the consequences.",
          answer:
            "**Roles present.** Coordinator (the manager who chairs and draws out contributions), two monitor-evaluators (the analytical scrutinisers), teamworker (the diplomat), and specialist (the legacy system expert).\n\n**Roles missing: shaper, implementer, completer-finisher and resource investigator.**\n\n**Consequences, mapped to the gaps.** (1) **No shaper** — nobody drives the team forward or forces a decision under pressure, so with two monitor-evaluators habitually re-examining options and a teamworker avoiding confrontation, decisions get revisited indefinitely. (2) **No implementer** — nothing converts agreed decisions into practical scheduled action. (3) **No completer-finisher** — nobody owns delivering to the deadline or checking for errors, which is why deadlines slip. (4) **No resource investigator** — no external contact is being developed, which is exactly why nobody has spoken to the vendor in a month.\n\n**Note the interaction.** The team is not merely missing roles; the roles it has amplify the gap. Two evaluators plus a conflict-avoiding teamworker plus no shaper is a structure that *cannot* close a decision. Adding one shaper and one completer-finisher would change more than the headcount suggests.",
        },
      ],
    },
    {
      id: "effectiveness",
      heading: "Team effectiveness, cohesion and its dark side",
      blocks: [
        {
          kind: "table",
          caption: "How team effectiveness is judged",
          head: ["Quantitative measures", "Qualitative indicators"],
          rows: [
            ["Output and productivity against target", "Members' commitment to the team's objectives"],
            ["Quality — defects, rework, error rates", "Open communication and willingness to disagree"],
            ["Adherence to deadlines and budget", "Constructive handling of conflict"],
            ["Labour turnover and absenteeism", "Mutual trust and support"],
            ["Achievement of specific project milestones", "Clear, accepted roles and shared standards"],
          ],
        },
        {
          kind: "definition",
          term: "Group cohesion",
          md: "The degree to which members are attracted to the group and want to remain in it. Cohesion generally improves communication, satisfaction and cooperation — but it is **not** the same as effectiveness, and beyond a point it works against it.",
        },
        {
          kind: "list",
          title: "The three ways cohesion goes wrong",
          items: [
            "**Groupthink** — a cohesive group suppresses doubt to preserve harmony, discounts outside information and assumes unanimity. See Chapter 10.",
            "**Social loafing** — individuals contribute less in a group than alone, because individual effort is not visible and responsibility is diffused. The remedy is making individual contributions identifiable.",
            "**Goal displacement** — a highly cohesive group can pursue its **own** norms and interests over the organisation's, and enforce them on members who try to comply with management instead.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The examinable nuance about cohesion",
          md: "High cohesion plus alignment with organisational goals gives the best possible performance. High cohesion **against** organisational goals gives the **worst** — a united group resisting effectively. This is why \"build cohesion\" is an incomplete answer: cohesion amplifies whatever direction the group is already pointing in.",
        },
      ],
      check: {
        q: "A highly cohesive team consistently defends its own established working methods and pressures a new member who tries to adopt the procedures management has introduced. What is happening?",
        options: [
          "Social loafing, because individual effort is not visible",
          "Storming, because the group is in an early stage of development",
          "Cohesion working against organisational goals, enforced through group norms",
          "Role ambiguity, because the new member's role is unclear",
        ],
        correct: 2,
        explain:
          "This is COHESION ALIGNED AGAINST organisational goals. High cohesion amplifies whatever direction the group already faces: united behind organisational objectives it produces the best performance, and united against them it produces the most effective resistance — including enforcing norms on members who try to comply with management. Social loafing is reduced individual effort, and storming is open conflict over roles and objectives in a new group.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Calling every group a team.",
      fix: "A team additionally needs a common purpose, interdependent work, complementary skills and shared accountability for a collective result.",
    },
    {
      trap: "Treating storming as a sign of a failing team to be suppressed.",
      fix: "It is a normal, necessary stage. Suppressing it converts open disagreement into passive resistance or groupthink; manage through it instead.",
    },
    {
      trap: "Describing Belbin roles as personality types or job titles.",
      fix: "They describe BEHAVIOUR in a team context, and one person can play different roles on different teams.",
    },
    {
      trap: "Saying a team needs all nine Belbin roles.",
      fix: "It needs a BALANCE. Most people cover two or three roles, so a team of five can span the range. The insight is which role is MISSING.",
    },
    {
      trap: "Equating cohesion with effectiveness.",
      fix: "Cohesion amplifies the group's existing direction. Aligned with organisational goals it gives the best performance; opposed to them it gives the most effective resistance.",
    },
    {
      trap: "Explaining reduced individual effort in a group as laziness.",
      fix: "It is social loafing — a structural effect of invisible individual contribution and diffused responsibility. The fix is making contributions identifiable.",
    },
  ],
  keyTerms: [
    { term: "Group", def: "Two or more people who see themselves as a group and interact with one another." },
    { term: "Team", def: "A group with a common purpose, interdependent work, complementary skills and shared accountability for a collective result." },
    { term: "Role conflict", def: "Facing incompatible expectations from different sources about the same role." },
    { term: "Role ambiguity", def: "Uncertainty about what a role requires or how its performance will be judged." },
    { term: "Tuckman's stages", def: "Forming, storming, norming, performing and adjourning — the predictable stages of group development." },
    { term: "Belbin team roles", def: "Nine behavioural roles a team needs in balance: plant, monitor-evaluator, specialist, shaper, implementer, completer-finisher, coordinator, teamworker and resource investigator." },
    { term: "Group cohesion", def: "The degree to which members are attracted to a group and wish to remain in it." },
    { term: "Social loafing", def: "The tendency of individuals to contribute less effort in a group than alone, because individual contribution is not visible." },
    { term: "Goal displacement", def: "A group pursuing its own norms and interests in preference to the organisation's objectives." },
  ],
  summary: [
    "Individual behaviour is shaped by personality, perception, attitudes, ability, motivation, role, the group and the organisation's culture.",
    "Role conflict and role ambiguity are management failures and significant causes of stress and poor performance.",
    "A group interacts; a team adds common purpose, interdependence, complementary skills and shared accountability.",
    "Tuckman's stages are forming, storming, norming, performing and adjourning — and storming must be managed through, not suppressed.",
    "Belbin's nine roles describe behaviour, and a team needs balance rather than all nine; the useful question is which role is missing.",
    "Effectiveness is judged on output, quality, deadlines and turnover, alongside commitment, openness and trust.",
    "Cohesion amplifies the group's existing direction, so it can produce the best performance or the most effective resistance.",
    "Groupthink, social loafing and goal displacement are the three ways cohesion turns against effectiveness.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes a team from a group?", a: "A team has a common purpose, interdependent work, complementary skills and shared accountability for a collective result. A group only needs mutual awareness and interaction." },
    { q: "What are Tuckman's five stages?", a: "Forming (polite, directionless), storming (conflict over roles and objectives), norming (norms and roles settle), performing (effective work) and adjourning (disbanding, or dorming into complacency)." },
    { q: "What was Belbin's central finding?", a: "That effective teams need a balance of behavioural roles rather than a collection of the most able individuals — a team of brilliant idea-generators with no implementer or completer-finisher delivers nothing." },
    { q: "Is high cohesion always good for performance?", a: "No. Cohesion amplifies the group's existing direction: aligned with organisational goals it produces the best performance, opposed to them it produces the most effective resistance." },
    { q: "What is social loafing and how is it reduced?", a: "Individuals contributing less in a group than alone, because individual effort is invisible and responsibility diffused. It is reduced by making individual contributions identifiable and measurable." },
  ],
  furtherStudy: [
    "Team dynamics, conflict and change resistance are developed in **SBL**.",
    "Chapter 21 covers what motivates the individuals inside these groups; Chapter 23 covers conflict resolution directly.",
  ],
}

/* ── Chapter 21 · D5 ───────────────────────────────────────────── */

export const BT_TREE_21: StudyChapter = {
  id: "BT-21",
  number: 21,
  paper: "BT",
  area: "D",
  title: "Motivating individuals and groups",
  minutes: 17,
  syllabusRefs: ["D5(a)", "D5(b)", "D5(c)", "D5(d)", "D5(e)"],
  intro:
    "Motivation theory is the most model-dense topic in BT, and the models are frequently confused with one another. This chapter separates them by what each actually claims, then turns to reward systems — where the theory meets the payroll.",
  outcomes: [
    "Define motivation and explain why it matters to the organisation",
    "Distinguish content theories from process theories",
    "Apply Maslow's hierarchy, Herzberg's two-factor theory and McClelland's needs",
    "Apply Vroom's expectancy theory and equity theory",
    "Explain intrinsic and extrinsic motivation",
    "Explain reward systems, including performance-related pay, and their limitations",
    "Explain job design — enlargement, enrichment and rotation",
  ],
  sections: [
    {
      id: "what-motivation-is",
      heading: "Motivation and why it matters",
      blocks: [
        {
          kind: "definition",
          term: "Motivation",
          md: "The internal and external forces that **initiate, direct and sustain** effort toward a goal. Note all three: motivation is not only whether someone works, but on **what** and for **how long**.",
        },
        {
          kind: "list",
          title: "Why the organisation cares",
          items: [
            "**Higher productivity** from the same headcount and the same equipment.",
            "**Better quality**, because motivated people care whether the work is right.",
            "**Lower turnover and absenteeism**, which are direct and substantial costs.",
            "**Greater willingness to change**, which matters given Chapters 4 to 7.",
            "**Discretionary effort** — the part of a person's contribution that cannot be compelled, only earned.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The organising distinction for this chapter",
          md: "**Content theories** ask *what* motivates people — which needs or wants drive behaviour. Maslow, Herzberg and McClelland are content theories. **Process theories** ask *how* motivation works — the mental process by which effort is chosen. Vroom's expectancy theory and equity theory are process theories. Being able to state which type a named theory is worth a mark on its own.",
        },
      ],
    },
    {
      id: "maslow",
      heading: "Maslow's hierarchy of needs",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "pyramid",
            title: "Maslow's five levels",
            caption: "A lower need must be substantially satisfied before the next becomes motivating — and a satisfied need stops motivating.",
            data: {
              levels: [
                { label: "Self-actualisation", sub: "Realising one's potential — challenging work, creativity, personal growth" },
                { label: "Esteem", sub: "Recognition, status, achievement, respect — job titles, praise, promotion" },
                { label: "Social / belonging", sub: "Friendship, acceptance, team membership, social contact at work" },
                { label: "Safety", sub: "Job security, safe conditions, predictable pay, pension" },
                { label: "Physiological", sub: "Pay sufficient for food, shelter and warmth; rest breaks" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The two propositions, and the criticisms",
          md: "Maslow claims (1) needs are **hierarchical** — a lower one must be substantially met before a higher one motivates, and (2) a **satisfied need ceases to motivate**, so a pay rise motivates once and then becomes the baseline.\n\n**Criticisms:** the strict ordering is not supported by evidence — people pursue self-actualisation while insecure, and some forgo safety for a cause; the levels mean different things in different cultures; and self-actualisation is unmeasurable. Cite the second proposition rather than the strict hierarchy when applying it.",
        },
      ],
    },
    {
      id: "herzberg",
      heading: "Herzberg's two-factor theory",
      blocks: [
        {
          kind: "text",
          md: "Herzberg's finding is counter-intuitive and is the single most examined idea in Area D: the factors that cause **dissatisfaction** are **different factors** from those that cause **satisfaction**. They are not two ends of one scale.",
        },
        {
          kind: "table",
          caption: "Hygiene factors and motivators",
          head: ["", "Hygiene factors (dissatisfiers)", "Motivators (satisfiers)"],
          rows: [
            ["Concern", "The CONTEXT of the job — its surroundings", "The CONTENT of the job — the work itself"],
            ["Examples", "Pay, job security, working conditions, company policy, supervision quality, relationships with colleagues, status", "Achievement, recognition, the work itself, responsibility, advancement, personal growth"],
            ["If absent or poor", "Causes active dissatisfaction", "Causes no dissatisfaction, merely an absence of positive motivation"],
            ["If present and good", "Removes dissatisfaction — does NOT create motivation", "Creates genuine, durable motivation"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The conclusion that gets tested",
          md: "**Fixing hygiene factors removes dissatisfaction; it does not create motivation.** Doubling pay in a dull, powerless job buys a non-complaining employee, not a motivated one. To motivate, the **job itself** must change — which is exactly why Herzberg leads to job enrichment below.",
        },
        {
          kind: "illustration",
          title: "The bonus that changed nothing",
          md: "A firm responds to a poor engagement survey by raising salaries 8%, refurbishing the office and improving the coffee. Complaints stop immediately. Twelve months later, productivity is unchanged, the same people are leaving, and the next survey is no better.\n\nEvery item on that list is a **hygiene factor**. The firm successfully removed dissatisfaction and mistook silence for motivation. What it did not do was give anyone more responsibility, more scope for achievement, or any recognition for it — the motivators. Herzberg predicts exactly this outcome, which is why the theory is worth knowing rather than merely reciting.",
        },
        {
          kind: "activity",
          title: "Activity 22 — classify and advise",
          prompt:
            "An accounts assistant tells you: \"The pay is fine and the office is comfortable, my manager is reasonable and the job is secure. But I do the same three tasks every day, nobody notices when I do them well, and I have not learned anything in two years. I am looking for another job.\"\n\nClassify each element using Herzberg, and recommend two actions. Explain why a pay rise would not work.",
          answer:
            "**Hygiene factors, all satisfactory:** pay, working conditions, quality of supervision, job security. There is therefore **no dissatisfaction** to remove — and note she does not complain about any of them.\n\n**Motivators, all absent:** the work itself (three repetitive tasks), recognition (nobody notices good work), personal growth and advancement (nothing learned in two years), achievement and responsibility.\n\n**Two actions.** (1) **Enrich the job vertically** — give her a genuinely more responsible element: owning a reconciliation end to end including investigating and resolving differences, or preparing part of the management pack, with the authority to make the decisions it requires. (2) **Build in recognition and development** — feedback on work done well, a named area of ownership others come to her for, and a training or study commitment with a defined progression path.\n\n**Why a pay rise would not work.** Pay is a hygiene factor and hers is already satisfactory, so more of it has nothing left to fix. Herzberg predicts it would remove no dissatisfaction (there is none) and create no motivation (pay never does). Maslow adds the same conclusion by a different route: a substantially satisfied need has stopped motivating. She would very likely accept the rise and still leave — and the firm would have paid more for the same outcome.",
        },
      ],
      check: {
        q: "According to Herzberg, improving pay and working conditions in a repetitive, low-responsibility job will:",
        options: [
          "Create strong and lasting motivation",
          "Remove dissatisfaction but not create motivation",
          "Have no effect on either satisfaction or dissatisfaction",
          "Reduce satisfaction, because expectations rise",
        ],
        correct: 1,
        explain:
          "Pay and working conditions are HYGIENE FACTORS, concerned with the job's context. Getting them right REMOVES DISSATISFACTION but cannot create motivation, because motivation comes from motivators in the job's CONTENT — achievement, recognition, responsibility, the work itself, advancement and growth. This is why Herzberg's practical conclusion is job enrichment rather than higher pay.",
      },
    },
    {
      id: "mcclelland-vroom-equity",
      heading: "McClelland, Vroom and equity theory",
      blocks: [
        {
          kind: "definition",
          term: "McClelland's three needs",
          md: "People are driven by differing strengths of three learned needs: **achievement** (nAch — wanting to accomplish challenging things and receive feedback), **affiliation** (nAff — wanting friendly relationships and acceptance) and **power** (nPow — wanting influence over others and over outcomes). The mix differs by individual, so the same reward motivates people unequally.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The practical use of McClelland",
          md: "It explains why one incentive cannot fit everyone. A high-nAch employee wants a difficult target with clear feedback; a high-nAff employee wants team recognition and would be embarrassed by being singled out; a high-nPow employee wants scope and authority. Hofstede's collectivism (Chapter 9) points at the same problem from the cultural direction.",
        },
        {
          kind: "definition",
          term: "Vroom's expectancy theory",
          md: "A **process** theory: motivation depends on three multiplied judgements. **Expectancy** — will my effort produce the performance? **Instrumentality** — will that performance produce the reward? **Valence** — do I actually want that reward?",
        },
        {
          kind: "formula",
          name: "Expectancy theory",
          expr: "Motivation  =  Expectancy  ×  Instrumentality  ×  Valence",
          note: "Because the terms MULTIPLY, any one of them at zero makes motivation zero — however strong the other two are. That is the whole practical point of the model.",
        },
        {
          kind: "example",
          title: "Worked example — diagnosing a failed incentive",
          scenario:
            "A company offers a large bonus for exceeding a sales target. Three salespeople are unmotivated by it. Diagnose each using expectancy theory and state the fix.",
          steps: [
            { label: "Salesperson A: 'The target is impossible whatever I do.'", detail: "EXPECTANCY is zero — no amount of effort is believed to produce the required performance. Multiplying anything by zero gives zero motivation. Fix: set a target that is stretching but genuinely achievable, and make sure they have the resources and skills to reach it." },
            { label: "Salesperson B: 'They promised a bonus last year and changed the rules.'", detail: "INSTRUMENTALITY is zero — performance is not believed to lead to the reward. Fix: honour commitments, define the scheme in writing, and pay out visibly. Note that this one is the hardest to repair, because trust was destroyed by the organisation's own past conduct." },
            { label: "Salesperson C: 'I do not need more money — I need Fridays with my children.'", detail: "VALENCE is zero — the reward on offer is not wanted. Fix: offer rewards the individual actually values, such as flexible hours or additional leave. McClelland explains why valence differs between people." },
            { label: "The general lesson", detail: "Three completely different failures, all producing identical zero motivation, and all invisible if you only ask 'is the bonus big enough?'" },
          ],
          result:
            "Because the three terms multiply, the size of the bonus is irrelevant when any term is zero. Diagnosis must identify WHICH term has failed — a bigger bonus fixes only a valence problem, and only for someone who wanted money in the first place.",
        },
        {
          kind: "definition",
          term: "Equity theory",
          md: "People assess their own **input-to-reward ratio** against that of comparable others. Perceived **inequity** — whether under-reward or over-reward — creates tension, which the person acts to reduce: by lowering effort, seeking more reward, changing who they compare themselves to, or leaving.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why equity theory makes pay secrecy a problem",
          md: "The comparison is with **perceived** ratios, not actual ones. Where pay is secret, people compare against **assumptions**, and assumptions are usually less favourable than reality. It also explains why a well-deserved rise for one person can demotivate three others, and why the reference group matters more than the absolute amount.",
        },
      ],
    },
    {
      id: "rewards-and-job-design",
      heading: "Reward systems and job design",
      blocks: [
        {
          kind: "definition",
          term: "Intrinsic and extrinsic motivation",
          md: "**Intrinsic** motivation comes from the work itself — interest, mastery, achievement, meaning. **Extrinsic** motivation comes from outside it — pay, bonus, promotion, praise, avoidance of penalty. Herzberg's motivators are largely intrinsic; his hygiene factors are largely extrinsic.",
        },
        {
          kind: "table",
          caption: "Reward systems and their real limitations",
          head: ["System", "How it works", "Limitation"],
          rows: [
            ["**Basic salary**", "Fixed periodic payment", "Not linked to performance; a hygiene factor once it is adequate"],
            ["**Performance-related pay**", "Bonus linked to individual results", "Encourages what is measured at the expense of what is not; damages cooperation; can manufacture fraud risk (Chapter 16)"],
            ["**Piece rates / commission**", "Payment per unit or per sale", "Volume at the expense of quality; unsuited to interdependent work"],
            ["**Profit sharing**", "A share of the organisation's profit", "Individual effort has little visible effect on the outcome, so instrumentality is weak"],
            ["**Share options / employee ownership**", "A stake in long-term value", "Long delay and market noise weaken the perceived link to effort"],
            ["**Team-based rewards**", "Shared reward for collective results", "Exposed to social loafing (Chapter 20) unless contributions are visible"],
            ["**Non-financial rewards**", "Recognition, flexibility, development, autonomy, additional leave", "Cheap and often powerful, but easily dismissed as a substitute for fair pay"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The three things wrong with badly designed performance pay",
          md: "**It measures the measurable.** A bonus on sales volume gets volume, including sales that should not have been made. **It can crowd out intrinsic motivation** — paying people for something they previously did for its own sake can reduce their interest in it. **It creates fraud pressure** — cliff-edge targets supply two of the three fraud triangle conditions on their own.",
        },
        {
          kind: "definition",
          term: "Job design — the three techniques",
          md: "**Job rotation** — moving between different tasks at the same level. Reduces boredom, builds flexibility, but the tasks are equally undemanding. **Job enlargement** — adding more tasks at the **same level**; horizontal expansion. **Job enrichment** — adding more **responsibility, autonomy and decision-making**; vertical expansion. Only enrichment addresses Herzberg's motivators.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Enlargement versus enrichment",
            caption: "The distinction is horizontal versus vertical, and it is examined directly and often.",
            data: {
              leftTitle: "Job enlargement (horizontal)",
              rightTitle: "Job enrichment (vertical)",
              rows: [
                { aspect: "What is added", left: "More tasks of the same kind and level", right: "More responsibility, autonomy and decision authority" },
                { aspect: "Example", left: "A clerk who processed sales invoices now also processes purchase invoices", right: "The same clerk now owns supplier queries, resolves differences and approves within a limit" },
                { aspect: "Herzberg", left: "Does not reach the motivators — the work is still someone else's decisions", right: "Directly addresses achievement, responsibility and growth" },
                { aspect: "Risk", left: "Experienced as simply more work for the same pay", right: "Needs training and real authority, or it is delegation of blame" },
              ],
            },
          },
        },
      ],
      check: {
        q: "An organisation gives a data-entry clerk responsibility for investigating and resolving the exceptions their own work generates, with authority to correct them up to a set value. This is an example of:",
        options: [
          "Job rotation",
          "Job enlargement",
          "Job enrichment",
          "Job evaluation",
        ],
        correct: 2,
        explain:
          "Adding RESPONSIBILITY, AUTONOMY and DECISION AUTHORITY is vertical expansion — JOB ENRICHMENT — and it is the only one of the three that reaches Herzberg's motivators. Job enlargement would add more tasks at the same level (horizontal); job rotation would move the clerk between different same-level tasks; and job evaluation is an unrelated process for ranking jobs to set pay grades.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating Herzberg's hygiene factors and motivators as opposite ends of one scale.",
      fix: "They are separate dimensions. Good hygiene removes dissatisfaction; only motivators create motivation. Both can be absent at once.",
    },
    {
      trap: "Recommending a pay rise to motivate someone whose pay is already adequate.",
      fix: "Pay is a hygiene factor, and Maslow adds that a satisfied need stops motivating. Enrich the job instead.",
    },
    {
      trap: "Confusing job enlargement with job enrichment.",
      fix: "Enlargement is HORIZONTAL — more tasks at the same level. Enrichment is VERTICAL — more responsibility and authority. Only enrichment motivates.",
    },
    {
      trap: "Adding the terms in expectancy theory instead of multiplying them.",
      fix: "They MULTIPLY, so any term at zero gives zero motivation regardless of the others. That is the model's entire practical value.",
    },
    {
      trap: "Confusing expectancy with instrumentality.",
      fix: "Expectancy is effort → performance ('can I do it?'). Instrumentality is performance → reward ('will they actually pay?').",
    },
    {
      trap: "Assuming equity theory is about actual fairness.",
      fix: "It is about PERCEIVED ratios against a chosen comparator, which is why pay secrecy makes it worse and why the reference group matters more than the amount.",
    },
    {
      trap: "Presenting performance-related pay as straightforwardly motivating.",
      fix: "It rewards what is measured, can crowd out intrinsic motivation, damages cooperation, and cliff-edge targets create genuine fraud pressure.",
    },
  ],
  keyTerms: [
    { term: "Motivation", def: "The forces that initiate, direct and sustain effort toward a goal." },
    { term: "Content theory", def: "A theory of WHAT motivates people — which needs drive behaviour. Maslow, Herzberg and McClelland." },
    { term: "Process theory", def: "A theory of HOW motivation works — the mental process by which effort is chosen. Vroom and equity theory." },
    { term: "Hygiene factors", def: "Herzberg's job-context factors — pay, conditions, security, supervision — whose adequacy removes dissatisfaction without creating motivation." },
    { term: "Motivators", def: "Herzberg's job-content factors — achievement, recognition, the work itself, responsibility, advancement, growth — which create genuine motivation." },
    { term: "Expectancy", def: "In Vroom's model, the belief that effort will produce the required performance." },
    { term: "Instrumentality", def: "In Vroom's model, the belief that the required performance will produce the promised reward." },
    { term: "Valence", def: "In Vroom's model, the value the individual actually places on the reward offered." },
    { term: "Equity theory", def: "The theory that people compare their own input-to-reward ratio with that of others and act to reduce perceived inequity." },
    { term: "Job enlargement", def: "Horizontal expansion of a job by adding more tasks at the same level." },
    { term: "Job enrichment", def: "Vertical expansion of a job by adding responsibility, autonomy and decision-making authority." },
    { term: "Intrinsic motivation", def: "Motivation arising from the work itself — interest, mastery, achievement and meaning." },
  ],
  summary: [
    "Motivation initiates, directs and sustains effort, and delivers the discretionary contribution that cannot be compelled.",
    "Content theories ask what motivates (Maslow, Herzberg, McClelland); process theories ask how motivation works (Vroom, equity).",
    "Maslow's durable insight is that a satisfied need stops motivating; the strict hierarchy is weakly supported.",
    "Herzberg separates hygiene factors, which remove dissatisfaction, from motivators, which alone create it.",
    "McClelland's achievement, affiliation and power needs explain why one incentive cannot fit everyone.",
    "Vroom's expectancy × instrumentality × valence multiplies, so any single zero gives zero motivation.",
    "Equity theory turns on perceived ratios against a chosen comparator, which is why pay secrecy and reference groups matter.",
    "Performance pay rewards the measurable, can crowd out intrinsic motivation and creates fraud pressure; job enrichment addresses motivators directly.",
  ],
  knowledgeDiagnostic: [
    { q: "What is the difference between a content and a process theory of motivation?", a: "Content theories identify WHAT motivates people — the needs driving behaviour (Maslow, Herzberg, McClelland). Process theories explain HOW motivation arises — the mental process of choosing effort (Vroom, equity theory)." },
    { q: "What is Herzberg's central claim?", a: "That the factors causing dissatisfaction (hygiene — pay, conditions, security, supervision) are different from those causing satisfaction (motivators — achievement, recognition, the work itself, responsibility, advancement, growth). Fixing hygiene removes dissatisfaction but cannot motivate." },
    { q: "State Vroom's expectancy model and its key implication.", a: "Motivation = expectancy × instrumentality × valence. Because the terms multiply, any one at zero gives zero motivation, so a larger reward cannot fix an unachievable target or a broken promise." },
    { q: "What does equity theory predict?", a: "That people compare their own input-to-reward ratio with comparable others, and act to reduce perceived inequity by lowering effort, demanding more, changing comparator or leaving. It is perception-based, which is why secrecy worsens it." },
    { q: "What is the difference between job enlargement and job enrichment?", a: "Enlargement adds more tasks at the same level (horizontal) and does not reach the motivators. Enrichment adds responsibility, autonomy and decision authority (vertical) and does." },
  ],
  furtherStudy: [
    "Reward system design and its behavioural consequences are examined in **PM** and **APM**, where dysfunctional performance measurement is a major theme.",
    "The fraud pressure created by aggressive incentive schemes is Chapter 16.",
  ],
}

/* ── Chapter 22 · D6, D7 ───────────────────────────────────────── */

export const BT_TREE_22: StudyChapter = {
  id: "BT-22",
  number: 22,
  paper: "BT",
  area: "D",
  title: "Learning, training and performance appraisal",
  minutes: 16,
  syllabusRefs: ["D6(a)", "D6(b)", "D6(c)", "D6(d)", "D7(a)", "D7(b)", "D7(c)", "D7(d)"],
  intro:
    "Selection puts someone in a role; training makes them capable in it and appraisal tells them how they are doing. Both are routinely done badly in ways the syllabus expects you to be able to diagnose.",
  outcomes: [
    "Explain learning styles and Kolb's learning cycle",
    "Distinguish training, development and education",
    "Explain the training cycle and how training needs are identified",
    "Compare on-the-job and off-the-job training methods",
    "Evaluate training and explain the levels at which it can be assessed",
    "Explain the purposes of performance appraisal and the appraisal process",
    "Identify why appraisal schemes fail and how they are improved",
  ],
  sections: [
    {
      id: "learning",
      heading: "How people learn",
      blocks: [
        {
          kind: "definition",
          term: "Kolb's learning cycle",
          md: "Learning is a **cycle** of four stages: **concrete experience** (doing something), **reflective observation** (thinking about what happened), **abstract conceptualisation** (forming a general principle from it) and **active experimentation** (testing the principle in a new situation). Entering the cycle anywhere is possible, but all four stages are needed for learning to stick.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "Kolb's four stages",
            caption: "Experience without reflection teaches very little — which is why an unexamined year of work is not a year of learning.",
            data: {
              steps: [
                { label: "Concrete experience" },
                { label: "Reflective observation" },
                { label: "Abstract conceptualisation" },
                { label: "Active experimentation" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Honey and Mumford's four learning styles, each preferring one stage",
          head: ["Style", "Prefers", "Learns best from"],
          rows: [
            ["**Activist**", "Concrete experience", "Doing it — role play, exercises, being thrown in"],
            ["**Reflector**", "Reflective observation", "Watching, gathering information, thinking before acting"],
            ["**Theorist**", "Abstract conceptualisation", "Models, frameworks and understanding the underlying logic"],
            ["**Pragmatist**", "Active experimentation", "Practical application — techniques they can use on Monday"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Why the styles matter for training design",
          md: "A course delivered entirely as lecture serves theorists and reflectors and loses activists and pragmatists. A well-designed training event touches **all four** stages — explain the principle, demonstrate it, let people try it, and require reflection on what happened. This is the answer to \"why did the training not work?\" in a surprising number of scenarios.",
        },
      ],
    },
    {
      id: "training-vs-development",
      heading: "Training, development and education",
      blocks: [
        {
          kind: "table",
          caption: "Three related but distinct things",
          head: ["", "Definition", "Focus", "Time frame"],
          rows: [
            ["**Training**", "Planned acquisition of the skills and knowledge to do a specific job", "The current role and its immediate requirements", "Short term"],
            ["**Development**", "Growth of a person's capability and potential beyond the current role", "The individual's future and the organisation's succession", "Long term"],
            ["**Education**", "Broad acquisition of knowledge and theoretical understanding", "General capability, not tied to one employer's job", "Longest"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distinction candidates blur",
          md: "**Training is job-specific and now; development is person-specific and future.** Teaching someone the new expenses system is training. Preparing them to run a department in three years is development. Answers that use the words interchangeably lose the mark that the distinction carries.",
        },
      ],
    },
    {
      id: "training-cycle",
      heading: "The training cycle",
      blocks: [
        {
          kind: "diagram",
          diagram: {
            type: "cycle",
            title: "The training cycle",
            caption: "It is a loop. Evaluation feeds the next needs assessment, or the same ineffective training is repeated.",
            data: {
              steps: [
                { label: "Identify training needs" },
                { label: "Set training objectives" },
                { label: "Design the programme" },
                { label: "Deliver the training" },
                { label: "Evaluate its effectiveness" },
              ],
            },
          },
        },
        {
          kind: "definition",
          term: "Training needs analysis",
          md: "Identifying the **gap** between the skills and knowledge a role requires and those the post-holder currently has. The gap is the need; anything else is training the organisation has decided it likes rather than training it requires.",
        },
        {
          kind: "list",
          title: "Where training needs are identified from",
          items: [
            "**Appraisals** — the most systematic source, which is why the two topics sit in one chapter.",
            "**Performance data** — error rates, rework, complaints, missed deadlines, variances.",
            "**Changes in the job** — a new system, a new regulation, a new product.",
            "**Organisational change** — restructuring, a new strategy, an acquisition.",
            "**New starters and internal promotions**, both of whom face a role they have not done before.",
            "**Requests from employees**, which also matter for motivation (Chapter 21).",
          ],
        },
        {
          kind: "table",
          caption: "On-the-job and off-the-job training",
          head: ["", "On the job", "Off the job"],
          rows: [
            ["Methods", "Coaching, mentoring, job rotation, shadowing, learning by doing under supervision", "Courses, e-learning, lectures, case studies, simulations, professional qualifications"],
            ["Advantages", "Directly relevant; no lost production; cheap; the learning transfers because it happens in the real setting", "No risk to real work or customers; structured and consistent; broader perspective; qualified instruction"],
            ["Disadvantages", "Quality depends entirely on the person teaching; bad habits are transmitted with good ones; mistakes affect real customers; may be interrupted", "Costly; time away from the job; may not transfer to the actual workplace; less obviously relevant"],
          ],
        },
        {
          kind: "definition",
          term: "Evaluating training — the four levels",
          md: "**Reaction** — did participants like it? **Learning** — did they acquire the knowledge or skill? **Behaviour** — did their behaviour at work change? **Results** — did organisational performance improve? Each level is harder to measure and more valuable than the one before.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why 'happy sheets' are not evaluation",
          md: "Most organisations evaluate only at the **reaction** level, because a feedback form at the end of a course is cheap. But enjoyment predicts learning weakly and behaviour change hardly at all. Training that everyone rated highly and that changed nothing is a **cost**, and reaction-level evaluation is exactly what fails to detect it.",
        },
        {
          kind: "activity",
          title: "Activity 23 — training that did not work",
          prompt:
            "A firm sends all 40 finance staff on a one-day lecture course on its new ERP system, three months before go-live. Feedback forms average 4.2 out of 5. After go-live, error rates are high and staff say they cannot remember what they were shown.\n\nUsing this chapter's models, explain what went wrong and recommend three changes.",
          answer:
            "**What went wrong, in three model terms.**\n\n**(1) Kolb and learning styles.** A one-day lecture delivers only **abstract conceptualisation**. There was no concrete experience (nobody used the system), no active experimentation, and no structured reflection. It served theorists and reflectors and lost activists and pragmatists — and it left everyone without the practised skill the job needs.\n\n**(2) Timing.** Three months before go-live, with no intervening practice, guarantees the knowledge decays before it is used. Training must sit close to application.\n\n**(3) Evaluation at the wrong level.** The 4.2/5 measured **reaction** only. Participants enjoyed a day out of the office, which tells us nothing about learning, behaviour or results — and the error rates show all three failed. This is precisely the gap reaction-level evaluation cannot detect.\n\n**Three changes.** (1) **Redesign for all four Kolb stages** — brief demonstration of the principle, then hands-on practice in a test environment with realistic transactions, then a structured debrief on what went wrong and why. (2) **Move it close to go-live and stage it** — core transactions shortly before, advanced functions after, with a floor-walking support period in the first weeks so learning continues on the job. (3) **Evaluate at behaviour and results level** — measure error rates, processing times and helpdesk calls before and after, so the next programme is designed from evidence rather than from feedback forms.\n\n**Also creditable:** train in role-specific groups rather than sending all 40 to the same generic session, and identify super-users who can coach on the job afterwards.",
        },
      ],
      check: {
        q: "A training evaluation asks whether error rates and processing times improved after a course. Which level of evaluation is this?",
        options: [
          "Reaction",
          "Learning",
          "Behaviour",
          "Results",
        ],
        correct: 3,
        explain:
          "Measuring whether ORGANISATIONAL PERFORMANCE improved — error rates and processing times — is evaluation at the RESULTS level, the hardest and most valuable. Reaction asks whether participants liked it, learning asks whether they acquired the knowledge, and behaviour asks whether what they do at work changed. Most organisations stop at reaction, which is why ineffective training survives.",
      },
    },
    {
      id: "appraisal",
      heading: "Performance appraisal",
      blocks: [
        {
          kind: "definition",
          term: "Performance appraisal",
          md: "The **systematic review** of an employee's performance against agreed objectives and standards, together with a discussion of their development and future.",
        },
        {
          kind: "list",
          title: "What appraisal is for",
          items: [
            "**Reward** — providing an evidenced basis for pay, bonus and promotion decisions.",
            "**Performance improvement** — identifying what is going well and what is not, with agreed actions.",
            "**Identifying training and development needs** — the main input to the training cycle above.",
            "**Objective setting** — agreeing what the next period's targets are.",
            "**Communication** — a structured two-way conversation that day-to-day work rarely makes room for.",
            "**Motivation** — recognition of achievement, which Herzberg identifies as a motivator (Chapter 21).",
            "**Succession planning and career discussion** — the organisation's view of where this person could go.",
            "**Documentation** — an evidenced record, which matters if performance management later becomes a dismissal (Chapter 3).",
          ],
        },
        {
          kind: "table",
          caption: "Approaches to appraisal",
          head: ["Approach", "What it involves"],
          rows: [
            ["Manager appraisal", "The line manager assesses the individual — the standard form"],
            ["Self-appraisal", "The individual assesses themselves first, which surfaces differences in perception"],
            ["**360-degree appraisal**", "Feedback from manager, peers, subordinates and sometimes customers"],
            ["Upward appraisal", "Subordinates assess their manager"],
            ["Peer appraisal", "Colleagues at the same level assess each other"],
            ["Rating scales", "Numerical or descriptive scoring against defined competencies"],
            ["Management by objectives", "Assessment against jointly agreed measurable objectives (Drucker, Chapter 18)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "360-degree appraisal is not automatically better",
          md: "It gives a richer picture, and it requires conditions: genuine anonymity, a culture in which criticising a superior is safe, and training in giving useful feedback. In a high power distance culture (Chapter 9) upward feedback is often socially impossible, so the data arrives uniformly positive and the exercise costs money to learn nothing. Where trust is low it can also be used to settle scores.",
        },
        {
          kind: "table",
          caption: "Why appraisal schemes fail, and the fix",
          head: ["Failure", "Fix"],
          rows: [
            ["Treated as an annual form-filling ritual", "Make it a continuing conversation with the annual meeting as a summary, not the whole event"],
            ["Appraiser avoids difficult messages, so poor performance is never addressed", "Train appraisers; require specific evidence; separate the pay conversation so honesty is not punished"],
            ["Central tendency — everyone rated 'meets expectations'", "Require evidence for each rating and calibrate ratings across managers"],
            ["Recency bias — only the last few weeks are remembered", "Keep contemporaneous notes and review objectives quarterly"],
            ["Halo, horns and similar-to-me bias (Chapter 19)", "Score against defined competencies with examples, not against a general impression"],
            ["No follow-up, so agreed actions never happen", "Record actions with owners and dates, and review them at the next meeting"],
            ["Linked so tightly to pay that honest discussion becomes impossible", "Hold development and reward conversations separately"],
            ["Objectives that were vague or outside the person's control", "Set specific, measurable objectives the individual can actually influence"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The single biggest cause of appraisal failure",
          md: "**An appraiser who will not deliver an unwelcome message.** Every other fault can be designed around; this one cannot, because the entire value of appraisal depends on the employee finding out the truth about their performance while there is still time to act on it. An employee dismissed for poor performance who has five years of \"meets expectations\" appraisals is evidence of a failed scheme — and, as Chapter 3 shows, a serious problem for the employer at a tribunal.",
        },
      ],
      check: {
        q: "An organisation finds that 94% of its employees are rated 'meets expectations' every year, including several whose performance managers privately describe as poor. What is the primary problem?",
        options: [
          "Recency bias, because only recent performance is considered",
          "Central tendency, with appraisers avoiding both high and low ratings",
          "Halo effect, because one good feature colours the whole assessment",
          "The rating scale has too many points to be usable",
        ],
        correct: 1,
        explain:
          "This is CENTRAL TENDENCY — appraisers clustering everyone in the middle to avoid the difficult conversations that high or low ratings require. It destroys the scheme's value in both directions: strong performers are not recognised and weak performance is never addressed, which also leaves the employer without evidence if dismissal later becomes necessary. The fixes are requiring evidence for each rating and calibrating ratings across managers.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Using 'training' and 'development' interchangeably.",
      fix: "Training is job-specific and short-term. Development builds the person's future capability and potential.",
    },
    {
      trap: "Evaluating training by participant satisfaction alone.",
      fix: "That is only the REACTION level. Learning, behaviour and results are progressively harder to measure and progressively more meaningful.",
    },
    {
      trap: "Designing training that only delivers one Kolb stage.",
      fix: "All four are needed — experience, reflection, conceptualisation, experimentation — or it serves only some learning styles and does not transfer.",
    },
    {
      trap: "Assuming on-the-job training is always cheaper and therefore better.",
      fix: "Its quality depends wholly on the person teaching, it transmits bad habits with good, and mistakes hit real customers.",
    },
    {
      trap: "Treating 360-degree appraisal as automatically superior.",
      fix: "It needs genuine anonymity, a culture where upward criticism is safe, and feedback training. In a high power distance culture it produces uniformly positive, useless data.",
    },
    {
      trap: "Listing appraisal purposes without noting the tension between them.",
      fix: "Reward and development conflict: an employee being assessed for pay will not discuss weaknesses honestly. Separating the two conversations is the standard fix.",
    },
  ],
  keyTerms: [
    { term: "Kolb's learning cycle", def: "Concrete experience, reflective observation, abstract conceptualisation and active experimentation — all four needed for durable learning." },
    { term: "Learning styles", def: "Honey and Mumford's activist, reflector, theorist and pragmatist, each preferring a different stage of Kolb's cycle." },
    { term: "Training", def: "The planned acquisition of skills and knowledge needed for a specific current job." },
    { term: "Development", def: "The longer-term growth of a person's capability and potential beyond their current role." },
    { term: "Training needs analysis", def: "Identifying the gap between the skills a role requires and those the post-holder has." },
    { term: "On-the-job training", def: "Training delivered in the workplace through coaching, mentoring, shadowing, rotation and supervised practice." },
    { term: "Performance appraisal", def: "The systematic review of an employee's performance against agreed objectives, with discussion of development and future." },
    { term: "360-degree appraisal", def: "Appraisal drawing feedback from manager, peers, subordinates and sometimes customers." },
    { term: "Central tendency", def: "The appraisal error of clustering all employees in the middle of the rating scale to avoid difficult conversations." },
    { term: "Management by objectives", def: "Assessing performance against measurable objectives agreed jointly between manager and subordinate." },
  ],
  summary: [
    "Kolb's cycle requires experience, reflection, conceptualisation and experimentation; effective training touches all four.",
    "Honey and Mumford's activist, reflector, theorist and pragmatist styles each favour one stage, so single-mode training loses half the audience.",
    "Training is job-specific and short-term; development builds future capability; education is broader still.",
    "The training cycle runs needs → objectives → design → delivery → evaluation, and evaluation must feed back into needs.",
    "On-the-job training is relevant and cheap but quality depends on the teacher; off-the-job is structured and safe but may not transfer.",
    "Evaluate at reaction, learning, behaviour and results levels — most organisations stop at the least useful one.",
    "Appraisal serves reward, improvement, training needs, objectives, communication, motivation, succession and documentation — and reward conflicts with the others.",
    "Schemes fail through ritual form-filling, avoided messages, central tendency, recency and bias, and absent follow-up.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the four stages of Kolb's learning cycle?", a: "Concrete experience, reflective observation, abstract conceptualisation and active experimentation. All four are needed for learning to stick." },
    { q: "What is the difference between training and development?", a: "Training is the planned acquisition of skills for a specific current job, short-term and role-focused. Development grows a person's capability and potential for the future." },
    { q: "What are the four levels of training evaluation?", a: "Reaction (did they like it), learning (did they acquire it), behaviour (did work change) and results (did performance improve). Each is harder to measure and more valuable." },
    { q: "What are the main purposes of appraisal?", a: "Reward decisions, performance improvement, identifying training needs, objective setting, two-way communication, motivation through recognition, succession planning and documented evidence." },
    { q: "Why do appraisal schemes most often fail?", a: "Because appraisers avoid delivering unwelcome messages, producing central tendency where nearly everyone 'meets expectations'. That leaves strong performance unrecognised, weak performance unaddressed and the employer without evidence if dismissal becomes necessary." },
  ],
  furtherStudy: [
    "Performance measurement and its dysfunctional consequences are examined at length in **PM** and **APM**.",
    "ACCA's own Practical Experience Requirement applies this chapter's development thinking to your own qualification.",
  ],
}

/* ── Area D chapter list, in reading order ─────────────────────── */

export const BT_TREE_AREA_D: StudyChapter[] = [
  BT_TREE_18,
  BT_TREE_19,
  BT_TREE_20,
  BT_TREE_21,
  BT_TREE_22,
]

