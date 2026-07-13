import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * BT · Area B — People in organisations.
 * Rich study chapter: individuals, groups and teams; team roles and development;
 * motivation; leadership and management; recruitment, appraisal and the role of
 * HR. Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const BT_B: StudyChapter = {
  paper: "BT",
  area: "B",
  title: "People in organisations",
  minutes: 15,
  intro: "An organisation is not its buildings or its balance sheet — it is people, arranged into groups, led towards a goal. Understand what makes them work well together and half of BT falls into place.",
  outcomes: [
    "Distinguish individual, group and team behaviour, and explain what turns a group into a team",
    "Apply Belbin's team roles and Tuckman's stages of team development",
    "Compare the major content and process theories of motivation — Maslow, Herzberg, Taylor and McGregor",
    "Distinguish leadership from management and apply trait, style and contingency models",
    "Outline the recruitment, selection, appraisal and development process and the role of HR",
  ],
  sections: [
    {
      id: "individual-group-team",
      heading: "Individuals, groups and teams",
      blocks: [
        { kind: "text", md: "Every organisation is built from **individuals**, but individuals rarely achieve much alone — they are organised into **groups** and, at their best, into **teams**. The three words are not interchangeable, and the exam rewards you for knowing the difference." },
        { kind: "text", md: "An **individual's** behaviour at work is shaped by their personality, perception, attitudes and ability. A **group** is simply two or more people who see themselves as a group and interact — a queue in a canteen is a collection of people, but the finance department is a group. A **team** is a special kind of group: a small number of people with **complementary skills**, committed to a **common goal** for which they hold themselves **mutually accountable**." },
        { kind: "callout", tone: "key", title: "Group vs team", md: "Every team is a group, but not every group is a team. The leap happens when members share a **common purpose**, have **complementary roles**, and accept **collective responsibility** for the result — not just their own slice of it." },
        { kind: "text", md: "Groups can be **formal** (created by the organisation with a defined structure — a project team, a board committee) or **informal** (arising naturally from friendship and shared interests — the people who eat lunch together). Informal groups matter more than beginners expect: they shape morale, spread information through the grapevine, and can either support or quietly resist management." },
        { kind: "table", caption: "A collection of people is not yet a team", head: ["Feature", "Group", "Team"], rows: [
          ["Goal", "Individual goals may differ", "One shared, common goal"],
          ["Skills", "May overlap or be similar", "Complementary — they fit together"],
          ["Accountability", "Individual", "Mutual and collective"],
          ["Leadership", "Often one clear leader", "Roles may be shared or rotate"],
        ] },
      ],
    },
    {
      id: "roles-development",
      heading: "Team roles and team development",
      blocks: [
        { kind: "text", md: "Two frameworks dominate the exam here. **Belbin** answers *who* should be in a team — the mix of roles that makes it effective. **Tuckman** answers *how* a team matures over time. Learn both by name and by order." },
        { kind: "text", md: "**Meredith Belbin** found that a balanced team needs a spread of nine **team roles**, grouped into three families: **thinking** roles that generate and judge ideas, **action** roles that drive delivery, and **people** roles that hold the team together. A team of nine identical brilliant strategists fails; a mix succeeds. Nobody plays one role only — most people have a preferred role and a back-up." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Belbin's nine team roles",
          caption: "A balanced team spreads across all three families — thinking, action and people.",
          data: {
            items: [
              { title: "Plant", sub: "Thinking — creative, solves hard problems" },
              { title: "Monitor Evaluator", sub: "Thinking — sober, weighs options" },
              { title: "Specialist", sub: "Thinking — deep expert knowledge" },
              { title: "Shaper", sub: "Action — drives, pushes past obstacles" },
              { title: "Implementer", sub: "Action — turns ideas into tasks" },
              { title: "Completer Finisher", sub: "Action — polishes, catches errors" },
              { title: "Coordinator", sub: "People — clarifies goals, delegates" },
              { title: "Teamworker", sub: "People — cooperative, smooths friction" },
              { title: "Resource Investigator", sub: "People — networks, brings in contacts" },
            ],
          },
        } },
        { kind: "text", md: "**Bruce Tuckman** showed that teams do not arrive ready-made — they pass through predictable **stages**. New teams underperform not because the people are wrong but because they have not yet reached the later stages. The classic model has four (a fifth, **adjourning**, was added later for teams that disband)." },
        { kind: "diagram", diagram: {
          type: "cycle",
          title: "Tuckman's stages of team development",
          caption: "Order matters: a team cannot perform before it has stormed and normed.",
          data: {
            steps: [
              { label: "Forming — polite, uncertain, testing" },
              { label: "Storming — conflict over roles and approach" },
              { label: "Norming — agree ways of working, cohesion grows" },
              { label: "Performing — mature, focused on the task" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Remember the order", md: "**Forming, Storming, Norming, Performing** — it rhymes on purpose. The trap is thinking storming is a failure. Storming is **healthy and expected**; a team that never storms often never truly norms either." },
      ],
      check: {
        q: "A newly assembled project team is arguing openly about who should lead and how the work should be approached. Which Tuckman stage is this?",
        options: [
          "Forming",
          "Storming",
          "Norming",
          "Performing",
        ],
        correct: 1,
        explain: "Open conflict over roles and approach is the hallmark of STORMING — the second stage, after the polite uncertainty of forming. It is a normal, necessary phase: the team is testing boundaries before it can settle into agreed norms (norming) and finally focus on delivery (performing).",
      },
    },
    {
      id: "motivation",
      heading: "What motivates people",
      blocks: [
        { kind: "text", md: "**Motivation** is the internal drive that makes someone put effort in. Theories split into two families. **Content theories** ask *what* people want (Maslow, Herzberg). **Process theories** ask *how* motivation works as a mental process (Vroom's expectancy). BT leans heavily on the content theories, so master those first." },
        { kind: "text", md: "**Abraham Maslow** arranged human needs in a **hierarchy**: lower needs must be broadly satisfied before higher ones motivate. A starving person is not motivated by a job title; but once basic needs are met, money stops motivating and recognition and growth take over. This is why pay rises give a short-lived lift and then stop working." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "Maslow's hierarchy of needs",
          caption: "Lower levels must be broadly met before the level above becomes a motivator.",
          data: {
            levels: [
              { label: "Self-actualisation", sub: "Growth, fulfilling your potential" },
              { label: "Esteem", sub: "Recognition, status, respect" },
              { label: "Social", sub: "Belonging, friendship, acceptance" },
              { label: "Safety", sub: "Job security, safe conditions" },
              { label: "Physiological", sub: "Pay to cover food, shelter, warmth" },
            ],
          },
        } },
        { kind: "text", md: "**Frederick Herzberg's two-factor theory** made a sharper point. He found that the things that cause **dissatisfaction** are different from the things that cause **satisfaction** — they are not opposite ends of one scale. **Hygiene factors** (pay, conditions, company policy, supervision) cause misery when they are bad, but fixing them only removes dissatisfaction — it does not motivate. Only **motivators** (achievement, recognition, the work itself, responsibility, advancement) create genuine motivation." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Herzberg — two different scales, not one",
          data: {
            leftTitle: "Hygiene factors",
            rightTitle: "Motivators",
            rows: [
              { aspect: "Also called", left: "Dissatisfiers", right: "Satisfiers" },
              { aspect: "Relate to", left: "The job context (surroundings)", right: "The job content (the work itself)" },
              { aspect: "Examples", left: "Pay, conditions, policy, supervision", right: "Achievement, recognition, responsibility, growth" },
              { aspect: "If good", left: "No dissatisfaction — but no motivation", right: "Real motivation" },
              { aspect: "If bad", left: "Active dissatisfaction", right: "Lack of motivation, not misery" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Herzberg's key insight", md: "Money is a **hygiene factor**. Pay someone too little and they are unhappy; pay them well and you have merely removed the unhappiness — you have not motivated them. Motivation comes from the **work itself**, so the fix is **job enrichment** (more responsibility and challenge), not more money." },
        { kind: "text", md: "Two older theories give the historical contrast. **F.W. Taylor's scientific management** treated the worker as **economic man** — motivated purely by money — so the answer was to find the \"one best way\" to do each task and pay by results (piece rates). **Douglas McGregor** exposed the assumptions managers make about people through **Theory X and Theory Y**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "McGregor's Theory X vs Theory Y",
          caption: "Two sets of assumptions a manager can hold about people — each becomes self-fulfilling.",
          data: {
            leftTitle: "Theory X",
            rightTitle: "Theory Y",
            rows: [
              { aspect: "View of work", left: "People dislike work, avoid it", right: "Work is as natural as rest or play" },
              { aspect: "Responsibility", left: "Avoid it, prefer to be directed", right: "Seek and accept it" },
              { aspect: "Control needed", left: "Coercion, close supervision, threats", right: "Self-direction and self-control" },
              { aspect: "Creativity", left: "Little; workers are a cost", right: "Widespread; workers are an asset" },
              { aspect: "Management style", left: "Authoritarian, carrot-and-stick", right: "Participative, empowering" },
            ],
          },
        } },
      ],
      check: {
        q: "Under Herzberg's two-factor theory, a company doubles its cleaners' pay. According to the theory, what is the most likely effect on their motivation?",
        options: [
          "They become strongly and permanently motivated",
          "Dissatisfaction is reduced, but they are not truly motivated",
          "They become dissatisfied because expectations rise",
          "Nothing changes at all — pay is irrelevant",
        ],
        correct: 1,
        explain: "Pay is a HYGIENE factor. Improving it removes dissatisfaction but does not create genuine motivation — that comes only from motivators such as achievement, recognition and responsibility (the work itself). So the pay rise takes away a grievance without truly motivating them.",
      },
    },
    {
      id: "leadership-management",
      heading: "Leadership and management",
      blocks: [
        { kind: "text", md: "**Management** and **leadership** overlap but are not the same. A manager is **appointed** and works through authority, systems and control to deliver the plan. A leader has **followers** and works through influence and vision to take people somewhere new. You can be one without the other — and the best need both." },
        { kind: "text", md: "**Henri Fayol** defined what managers *do* as five functions: **Planning, Organising, Commanding, Coordinating and Controlling**. **Henry Mintzberg** later argued that real managers do not sit calmly through five functions — they juggle **ten roles** in three groups: **interpersonal** (figurehead, leader, liaison), **informational** (monitor, disseminator, spokesperson) and **decisional** (entrepreneur, disturbance handler, resource allocator, negotiator)." },
        { kind: "table", caption: "Two views of the manager's job", head: ["Thinker", "Model", "The idea"], rows: [
          ["Fayol", "Five functions", "Plan, Organise, Command, Coordinate, Control"],
          ["Mintzberg", "Ten roles", "Interpersonal, informational, decisional roles"],
        ] },
        { kind: "text", md: "Theories of **leadership** evolved through three eras. **Trait** theories asked *what leaders are* (are leaders born?) — searching for common characteristics, with limited success. **Style** theories asked *what leaders do*, placing behaviour on a scale from **autocratic** to **democratic** to **laissez-faire**. **Contingency** theories concluded there is *no one best style* — the right style depends on the situation." },
        { kind: "text", md: "**Blake and Mouton's managerial grid** is a style model plotting a manager on two axes from 1 to 9: **concern for people** (vertical) against **concern for production/task** (horizontal). The five landmark positions are worth memorising." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Blake & Mouton — five positions on the grid",
          caption: "First number = concern for production (task); second = concern for people.",
          data: {
            items: [
              { title: "1,1 — Impoverished", sub: "Low task, low people — minimal effort" },
              { title: "1,9 — Country club", sub: "Low task, high people — comfort over results" },
              { title: "9,1 — Authority-compliance", sub: "High task, low people — produce or else" },
              { title: "5,5 — Middle of the road", sub: "Balanced but compromises on both" },
              { title: "9,9 — Team", sub: "High task, high people — the ideal" },
            ],
          },
        } },
        { kind: "text", md: "Two contingency models round this out. **John Adair's action-centred leadership** says a leader must constantly balance three overlapping needs — the **task**, the **team** and the **individual**; neglect one and the others suffer. **Hersey and Blanchard's situational leadership** says the leader should flex style — **telling, selling, participating, delegating** — to match the follower's **readiness** (their competence and confidence for the task)." },
        { kind: "diagram", diagram: {
          type: "radial",
          title: "Adair's action-centred leadership",
          caption: "Three needs a leader must balance at once — overlapping, never in isolation.",
          data: {
            centre: "Leader balances",
            nodes: [
              { label: "Task", sub: "Achieve the objective" },
              { label: "Team", sub: "Build and hold the group together" },
              { label: "Individual", sub: "Develop and motivate each member" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Spotting the model", md: "**Grid / two axes / 9,9** → Blake & Mouton. **Task, team, individual** → Adair. **Flex style to the follower's readiness** → situational (Hersey-Blanchard). **\"No single best style\"** → contingency in general." },
      ],
      check: {
        q: "A manager scores 9 for concern for production and 1 for concern for people on the Blake and Mouton grid. Which style is this?",
        options: [
          "Country club (1,9)",
          "Team (9,9)",
          "Authority-compliance (9,1)",
          "Impoverished (1,1)",
        ],
        correct: 2,
        explain: "On the grid the first figure is concern for production (task) and the second is concern for people. High task (9) with low people (1) is the 9,1 authority-compliance style — 'produce or else'. Country club is the reverse (1,9), and 9,9 is the balanced team ideal.",
      },
    },
    {
      id: "recruitment-selection",
      heading: "Recruitment and selection",
      blocks: [
        { kind: "text", md: "Getting the right people in is a two-stage process that candidates often blur together. **Recruitment** is *attracting* a pool of suitable applicants. **Selection** is *choosing* the best one from that pool. Recruitment fills the funnel; selection narrows it." },
        { kind: "text", md: "Before advertising, the organisation does a **job analysis** to understand the role, which produces two documents. A **job description** sets out the **job** — its title, duties, responsibilities and reporting lines. A **person specification** sets out the ideal **person** — the skills, qualifications and attributes needed. Confusing these two is a classic exam trap: the description is about the *post*, the specification is about the *holder*." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The recruitment and selection process",
          caption: "Analyse the need, attract candidates, then select and induct.",
          data: {
            steps: [
              { label: "Job analysis", sub: "Understand the role" },
              { label: "Job description & person spec", sub: "Define post and person" },
              { label: "Recruit", sub: "Advertise, attract applicants" },
              { label: "Select", sub: "Interview, test, choose" },
              { label: "Offer & induct", sub: "Appoint and onboard" },
            ],
          },
        } },
        { kind: "text", md: "**Selection methods** vary in reliability. **Interviews** are universal but can be unreliable and biased. **Psychometric and aptitude tests** add objectivity. **Assessment centres** — a mix of exercises, group tasks and tests over a day or two — are the most reliable but the most expensive. **References** verify claims after a provisional choice. A good process uses several methods, not one." },
        { kind: "callout", tone: "warn", title: "Selection must be fair", md: "Selection has to avoid unlawful **discrimination**. Decisions must rest on ability to do the job — not on protected characteristics such as sex, race, age or disability. Interviewers are especially prone to bias (the halo effect, stereotyping), which is why structured, criteria-based methods are preferred." },
      ],
    },
    {
      id: "appraisal-hr",
      heading: "Appraisal, development and the role of HR",
      blocks: [
        { kind: "text", md: "Hiring is only the start. Once people are in, the organisation must review, develop and retain them — the work of **appraisal**, **training and development**, and the **human resources** function that oversees the whole employee life cycle." },
        { kind: "text", md: "**Performance appraisal** is the systematic review of how well an employee is doing and how they can improve. It serves three purposes: **reward** (linking pay to performance), **performance** (feedback to improve current work) and **potential** (identifying who is ready for promotion and what development they need). A good appraisal is a two-way conversation with agreed objectives — not a one-way judgement." },
        { kind: "table", caption: "Why appraisal exists", head: ["Purpose", "Question it answers"], rows: [
          ["Reward", "How should pay or bonus reflect performance?"],
          ["Performance", "How can this person do their current job better?"],
          ["Potential", "What are they capable of next, and what will get them there?"],
        ] },
        { kind: "text", md: "A common modern approach is **360-degree feedback**, where an employee is appraised not only by their manager but by peers, subordinates and sometimes customers — a fuller, all-round picture. Whatever the method, appraisal feeds directly into **training and development**, closing the gap between the skills people have and the skills the role needs." },
        { kind: "text", md: "It helps to separate three linked ideas. **Training** develops the skills for the **current** job. **Development** grows the whole person for **future** roles and responsibilities. **Education** is broader still — general knowledge and understanding, not tied to one job. The three form a ladder from immediate task to long-term growth." },
        { kind: "callout", tone: "key", title: "The role of HR", md: "The **human resources** function manages people as the organisation's key resource: workforce **planning**, **recruitment and selection**, **appraisal**, **training and development**, reward and **retention**. Modern HR is **strategic** — aligning people with the organisation's objectives — not just administrative record-keeping." },
        { kind: "example", title: "Worked example — diagnosing the real problem", scenario: "A team's output has fallen. Pay is competitive and conditions are good, yet staff say the work is repetitive and they never hear whether they are doing well. Using the frameworks in this chapter, what is going on and what should the manager do?", steps: [
          { label: "Rule out hygiene", detail: "Pay and conditions are fine — so under Herzberg these hygiene factors are not the cause of the low motivation." },
          { label: "Identify the missing motivators", detail: "Repetitive work and no feedback mean the motivators — achievement, recognition, responsibility, the work itself — are absent." },
          { label: "Apply the fix", detail: "Herzberg's remedy is job enrichment: add variety and responsibility. Introduce regular recognition and a proper appraisal cycle so effort is seen." },
          { label: "Support with development", detail: "Use appraisal to agree objectives and identify training, linking each person's growth (Maslow's esteem and self-actualisation) to the role." },
        ], result: "The problem is a lack of motivators, not a hygiene failure. More money would not fix it — enriching the work and recognising achievement will. This is exactly the diagnosis BT questions test." },
      ],
      check: {
        q: "An employee is reviewed by their manager, their peers and the people they supervise, giving an all-round view of their performance. What is this called?",
        options: [
          "A person specification",
          "360-degree feedback",
          "Job enrichment",
          "An assessment centre",
        ],
        correct: 1,
        explain: "Being appraised from all sides — manager, peers and subordinates (and sometimes customers) — is 360-degree feedback. A person specification describes the ideal candidate; job enrichment adds responsibility to a role; an assessment centre is a selection method used before hiring.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating every group as a team.", fix: "A team is a group with a common goal, complementary skills and mutual accountability. A random collection of people is not a team." },
    { trap: "Getting Herzberg's factors the wrong way round.", fix: "Hygiene factors (pay, conditions, policy) only remove dissatisfaction. Motivators (achievement, recognition, responsibility, the work itself) create motivation. Money is hygiene, not a motivator." },
    { trap: "Reading the Blake & Mouton grid in the wrong order.", fix: "First figure = concern for production (task); second = concern for people. So 9,1 is high-task/low-people (authority-compliance), and 1,9 is the reverse (country club)." },
    { trap: "Thinking Tuckman's 'storming' means the team has failed.", fix: "Storming is a normal, necessary stage. The order is forming, storming, norming, performing — a team must storm before it can truly norm and perform." },
    { trap: "Swapping the job description and the person specification.", fix: "The job description describes the POST (duties, responsibilities). The person specification describes the ideal POST-HOLDER (skills, attributes)." },
    { trap: "Confusing McGregor's Theory X and Y directions.", fix: "Theory X assumes people dislike work and need control; Theory Y assumes work is natural and people seek responsibility. Y is the optimistic, participative view." },
  ],
  keyTerms: [
    { term: "Team", def: "A small group with complementary skills committed to a common goal for which they are mutually accountable — more than an ordinary group." },
    { term: "Hygiene factors", def: "Herzberg's dissatisfiers (pay, conditions, policy, supervision): fixing them removes dissatisfaction but does not motivate." },
    { term: "Motivators", def: "Herzberg's satisfiers (achievement, recognition, responsibility, the work itself): the factors that create genuine motivation." },
    { term: "Contingency theory", def: "The view that there is no single best leadership style — the right style depends on the situation, task and people." },
    { term: "Person specification", def: "A document setting out the ideal candidate's skills, qualifications and attributes — about the person, not the post." },
  ],
  summary: [
    "A team is more than a group: it shares a common goal, complementary skills and mutual accountability. Belbin gives the mix of roles; Tuckman gives the stages (forming, storming, norming, performing).",
    "Content theories say what people want: Maslow's hierarchy rises from physiological to self-actualisation; Herzberg splits hygiene factors (remove dissatisfaction) from motivators (create motivation).",
    "Taylor saw workers as economic man motivated by money; McGregor's Theory X assumes people dislike work, Theory Y that they seek responsibility.",
    "Management (appointed, authority) differs from leadership (followers, influence). Fayol and Mintzberg describe the manager's job; leadership models run from trait to style (Blake & Mouton grid) to contingency (Adair, situational).",
    "Recruitment attracts and selection chooses; appraisal reviews reward, performance and potential; training builds current skills and development grows future capability — all overseen by a strategic HR function.",
  ],
}
