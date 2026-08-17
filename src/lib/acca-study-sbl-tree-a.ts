import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBL · Area A — Leadership.
 *
 * SBL had ONE chapter per syllabus area, and Area A was the worst of them: it
 * was carved out of the legacy PROFESSIONAL SKILLS chapter by
 * acca-study-sbl-official.ts, so "Leadership" taught two sections about
 * leadership principles and models and nothing about ethical codes, conflicts
 * of interest, threats and safeguards, or economic crime — all of which A3
 * examines, and all of which the case study reaches for constantly.
 *
 *   SBL-01  Leadership, entrepreneurship and the strategic role  (A1)
 *   SBL-02  Leadership, culture and the cultural web             (A2)
 *   SBL-03  Responsible leadership, public value and the codes   (A3a, A3b)
 *   SBL-04  Ethical conflicts, threats and economic crime        (A3c, A3d, A3e)
 *
 * Written against the official ACCA SBL syllabus and study guide for September
 * 2026 to June 2027. Not derived from any approved-provider text.
 *
 * House style for SBL, which differs from every Applied Skills paper: the exam
 * is ONE integrated case study, three tasks, 80 technical + 20 professional
 * skills marks. So a model is never taught for its own sake. Every section says
 * what the model is FOR, what evidence in an exhibit triggers it, and what the
 * marker actually pays for — because in SBL a perfectly recalled framework
 * applied to nothing scores close to zero.
 */

const SBL_TREE_01: StudyChapter = {
  paper: "SBL",
  id: "SBL-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)"],
  title: "Leadership, entrepreneurship and the strategic role",
  minutes: 18,
  intro:
    "SBL opens with leadership because every later task assumes it. You are not asked to define leadership — you are asked to judge whether the people in the exhibits are leading, and to advise what they should do instead.",
  outcomes: [
    "Explain what leadership contributes to forming and delivering strategy, and which qualities make that contribution visible",
    "Judge a named individual's leadership from the evidence in an exhibit rather than from their job title",
    "Advise on a leadership approach suited to the strategic problem in front of the organisation",
    "Apply entrepreneurial and intrapreneurial thinking to a strategic opportunity",
    "Connect leadership behaviour to the ethical and professional values that underpin governance",
  ],
  sections: [
    {
      id: "what-leadership-does",
      heading: "What leadership actually contributes",
      blocks: [
        {
          kind: "text",
          md: "Management and leadership overlap but answer different questions. Management asks *how do we deliver what we have agreed, reliably and within resource?* Leadership asks *what should we be doing, why would anyone follow us there, and what will we not compromise on the way?* An organisation can be well managed into irrelevance: budgets met, service levels honoured, and the market moving somewhere else entirely.",
        },
        {
          kind: "text",
          md: "In SBL the distinction is practical. When an exhibit shows a chief executive personally approving purchase orders while nobody can state the strategy for the next three years, you are looking at a manager occupying a leadership post — and that is a finding worth marks, not an aside.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Two different questions",
            data: {
              leftTitle: "Management",
              rightTitle: "Leadership",
              rows: [
                { aspect: "Focus", left: "Delivery within agreed constraints", right: "Direction, purpose and legitimacy" },
                { aspect: "Time horizon", left: "This period, this project", right: "The position the organisation will hold" },
                { aspect: "Authority", left: "Largely positional", right: "Largely earned through trust and credibility" },
                { aspect: "Typical failure", left: "Efficient delivery of the wrong thing", right: "Inspiring direction nobody can execute" },
                { aspect: "Case evidence", left: "Variances, service levels, controls", right: "Tone, priorities, what gets escalated" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Leadership matters to strategy at three points, and it is worth knowing which one a task is about. In **formulation**, leaders decide which options are even considered — a board that treats one product line as untouchable has narrowed its own strategy before any analysis begins. In **implementation**, leaders supply the sponsorship, resource and consistency that turn a chosen strategy into changed behaviour. In **change**, leaders absorb the political cost: they explain the loss, hold the line when early results disappoint, and are seen to accept the same constraints they impose.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Qualities that leave evidence in a case",
          items: [
            "**Strategic perspective** — connects a decision to the organisation's position, not just its budget",
            "**Credibility** — has done the work, so challenge is informed rather than performative",
            "**Consistency** — the stated priority and the funded priority are the same one",
            "**Willingness to be unpopular** — will name a failing project or an over-mighty executive",
            "**Developing others** — succession exists, and decisions do not all route through one person",
            "**Integrity under cost** — holds a value at the moment holding it becomes expensive",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Judge the behaviour, never the job title",
          md: "A task that asks you to assess someone's leadership is asking you to read the exhibits for what they *did*: what they funded, what they escalated, who they listened to, what happened when bad news arrived. Describing what a good leader would look like in the abstract earns almost nothing.",
        },
      ],
      check: {
        q: "An exhibit shows a CEO who sets an inspiring three-year vision, but four of six strategic initiatives have no owner, no budget line and no reporting route. What is the most defensible assessment?",
        options: [
          "Leadership is strong; the failure is purely one of management execution",
          "Leadership is incomplete — direction has been set but not resourced or sponsored through to delivery",
          "Leadership is irrelevant here because initiative ownership is an operational matter",
          "The vision should be abandoned as it has already failed",
        ],
        correct: 1,
        explain:
          "Setting direction is only the first of leadership's three contributions. Sponsorship — owners, resource and a reporting route — is a leadership responsibility, not a clerical one, so the honest assessment is that the CEO has done half the job. Option 1 is the tempting answer because it sounds like the classic leadership/management split, but it lets the CEO off for a failure that is squarely theirs.",
      },
    },
    {
      id: "styles-in-context",
      heading: "Choosing an approach that fits the problem",
      blocks: [
        {
          kind: "text",
          md: "There is no best style, and SBL never rewards claiming there is. What earns marks is matching an approach to the specific situation in the exhibits: how urgent the threat is, how capable and committed the people are, and how much the leader actually knows relative to the team.",
        },
        {
          kind: "table",
          caption: "Approaches, and the conditions that justify them",
          head: ["Approach", "What the leader does", "Justified when the case shows"],
          rows: [
            ["Transformational", "Raises sights, builds commitment to a changed purpose", "Capable people, stale direction, change that needs belief rather than compliance"],
            ["Transactional", "Sets targets and exchanges reward for delivery", "Clear, stable, measurable work where the requirement is reliability"],
            ["Directive", "Decides quickly and instructs", "Genuine crisis, safety or solvency threat, or teams without the experience to decide"],
            ["Participative", "Draws the decision out of the people affected", "Expertise sits below the board, and adoption depends on ownership"],
            ["Delegative", "Sets the outcome and hands over the method", "Experienced, aligned teams; leader capacity is the constraint"],
          ],
        },
        {
          kind: "text",
          md: "The two most common case situations pull in opposite directions, and recognising which you are in is most of the answer. A **turnaround under liquidity pressure** needs a directive core — someone must stop the cash burn this quarter — with participation reserved for how, not whether. A **capability-led growth strategy** needs the opposite: the knowledge is in the business, and a directive board will simply impose a plan the organisation cannot deliver.",
        },
        {
          kind: "example",
          title: "Matching approach to problem",
          scenario:
            "A logistics group has lost its two largest contracts, has four months of headroom on its facility, and has an experienced depot management team that has been telling head office about service failures for two years without response.",
          steps: [
            { label: "Read the urgency", detail: "Four months of headroom makes cost and cash decisions non-negotiable and immediate — that part is directive." },
            { label: "Read the capability", detail: "Depot managers have accurate operational knowledge that head office has ignored; the service diagnosis should come from them." },
            { label: "Split the problem", detail: "Be directive on the financial envelope and the timetable; be participative on how service is rebuilt within it." },
            { label: "Fix the listening failure", detail: "Two years of ignored escalation is itself a leadership finding — recommend a route that makes operational warnings reach the board." },
          ],
          result:
            "The advice names one approach for the cash problem and a different one for the service problem, and treats the ignored escalations as a defect to correct rather than background colour.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The style-list trap",
          md: "Listing five leadership styles with a sentence each is the most reliable way to waste ten minutes in SBL. Name the approach you recommend, tie it to the specific evidence that justifies it, and say what the leader does differently on Monday.",
        },
      ],
      check: {
        q: "Which pairing of evidence and approach is the strongest recommendation?",
        options: [
          "Skilled staff whose expertise exceeds the board's on the technical issue → directive leadership to save time",
          "A solvency crisis with weeks of cash remaining → participative leadership to build consensus",
          "Skilled, committed teams and a change that depends on their adoption → participative leadership",
          "A stable, measurable process needing reliability → transformational leadership to inspire the team",
        ],
        correct: 2,
        explain:
          "Approach follows situation. Where the expertise and the adoption both sit with the team, participation is what makes the change stick. Option 1 discards the expertise; option 2 spends the one resource a solvency crisis lacks, which is time; option 4 applies inspiration to work that needs consistency, and transactional clarity fits better.",
      },
    },
    {
      id: "entrepreneurship",
      heading: "Entrepreneurship and intrapreneurship",
      blocks: [
        {
          kind: "definition",
          term: "Entrepreneurship",
          md: "Identifying an opportunity and accepting personal risk to organise resources around it, usually outside or independent of an established organisation.",
        },
        {
          kind: "definition",
          term: "Intrapreneurship",
          md: "The same opportunity-seeking behaviour practised *inside* an established organisation, using its resources and brand, with the organisation rather than the individual carrying the financial risk.",
        },
        {
          kind: "text",
          md: "SBL cares about intrapreneurship far more than the textbook definition suggests, because the case organisation is nearly always established and the question is why it cannot innovate. The syllabus asks you to *apply* these concepts to exploit a strategic opportunity — which in practice means diagnosing what is suppressing new ideas and recommending the conditions that would release them.",
        },
        {
          kind: "table",
          caption: "What suppresses intrapreneurship, and what releases it",
          head: ["Suppressor visible in exhibits", "Why it kills the idea", "Practical release"],
          rows: [
            ["Every proposal needs full-year payback", "Screens out anything genuinely new", "Separate small-scale exploration budget with different hurdle criteria"],
            ["One failed pilot ended a career", "Nobody proposes anything again", "Distinguish an intelligent failed experiment from negligence, visibly"],
            ["Ideas must route through the line manager they threaten", "Structural conflict of interest", "A route to sponsorship that bypasses the incumbent"],
            ["Innovators keep their day job at full load", "No capacity to develop anything", "Protected time and a named executive sponsor"],
            ["Reward is entirely on current-period output", "Rational people optimise the measure", "Recognition tied to option value created, not just this year's margin"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Innovation is usually a governance and incentive finding",
          md: "When a case complains that a company has become slow and imitative, the cause is rarely a shortage of creative people. It is normally an approval process, a reward system or a tolerance-of-failure problem — all of which are things a board can change, which is exactly why the examiner asks.",
        },
        {
          kind: "text",
          md: "Be balanced. Intrapreneurship carries real cost and real risk: resources move to unproven activity, control can weaken, and a portfolio of experiments needs governance or it becomes a portfolio of pet projects. The board's job is to fund exploration deliberately and to close experiments honestly, on evidence, rather than letting them survive on the sponsor's seniority.",
        },
      ],
      check: {
        q: "A manufacturer says it wants innovation, but every capital request must clear a two-year payback and last year's failed pilot led to the sponsor's demotion. What is the primary finding?",
        options: [
          "The company needs to recruit more creative staff",
          "The appraisal hurdle and the response to failure are jointly suppressing intrapreneurship",
          "Innovation is inappropriate for a manufacturer",
          "The failed pilot proves the innovation strategy was wrong",
        ],
        correct: 1,
        explain:
          "Both mechanisms bite before any idea reaches a decision: the hurdle screens novelty out on arrival, and the demotion teaches everyone watching not to volunteer. Recruiting creative people into that system changes nothing, which is why option 0 is the attractive wrong answer — it treats a systemic cause as a staffing one.",
      },
    },
    {
      id: "ethical-values-underpinning",
      heading: "The values that make leadership legitimate",
      blocks: [
        {
          kind: "text",
          md: "A1 closes by asking you to apply the ethical and professional values underpinning governance to leadership and governance situations. The link is not decorative: governance structures assume that the people inside them will tell the truth, declare their interests and act for the organisation rather than themselves. Where that assumption fails, no committee structure saves the organisation — which is why SBL keeps putting a technically compliant board next to a badly behaving executive.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "How leadership values reach behaviour",
            data: {
              steps: [
                { label: "Leaders' own conduct", sub: "What they do under pressure" },
                { label: "Tone from the top", sub: "What is praised, funded, punished" },
                { label: "Culture", sub: "What people do unsupervised" },
                { label: "Reported outcomes", sub: "Conduct, control failures, trust" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Two ideas do most of the work in SBL answers. **Integrity** is the willingness to hold a position when holding it costs something — which is why the exam always supplies the cost. **Accountability** is accepting answerability for outcomes including the ones you delegated, which is why \"I was not told\" is a finding against a leader rather than a defence.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The public interest is a real constraint here, not a slogan",
          md: "As a professional accountant the candidate's duty runs beyond the employer. Where a task puts the organisation's short-term advantage against a wider harm — misleading disclosure, unsafe product, concealed environmental impact — saying so plainly, and recommending the route that protects the wider interest, is where the marks are. Chapter SBL-03 develops this into responsible leadership and public value.",
        },
        {
          kind: "text",
          md: "Watch for the case where the *structure* is exemplary and the *behaviour* is not: an audit committee that meets quarterly but never without management present, a whistleblowing line that reports to the person most complained about, a code of conduct nobody has been trained on. These are leadership findings dressed as governance findings, and they are worth naming as such.",
        },
      ],
      check: {
        q: "A board has every recommended committee, a published code of conduct and a whistleblowing line that reports to the operations director — who is the subject of most reports received. What is the best characterisation?",
        options: [
          "Governance is sound because all recommended structures exist",
          "The structure is compliant but the whistleblowing route is compromised, defeating its purpose",
          "The reports themselves prove the operations director should be dismissed",
          "Whistleblowing lines are voluntary, so no issue arises",
        ],
        correct: 1,
        explain:
          "Existence is not effectiveness. Routing reports to the person they concern removes exactly the independence the mechanism exists to provide, so the structure is present and the protection is absent. Option 0 is the trap the examiner sets repeatedly — a checklist of structures reads as good governance until you ask who each one reports to.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Defining leadership and management instead of assessing the people in the exhibits.",
      fix: "Quote the behaviour — what was funded, escalated, ignored — and judge it. Definitions earn nothing on their own.",
    },
    {
      trap: "Listing every leadership style with a sentence each.",
      fix: "Recommend one approach, justify it from the specific evidence, and say what changes in practice.",
    },
    {
      trap: "Treating an innovation problem as a shortage of creative people.",
      fix: "Look at the approval hurdle, the reward system and what happened to the last person who failed.",
    },
    {
      trap: "Reading a full set of committees as proof of good governance.",
      fix: "Ask who each mechanism reports to and whether it can function independently of the people it monitors.",
    },
  ],
  keyTerms: [
    { term: "Transformational leadership", def: "Raising commitment to a changed purpose so people adopt it rather than merely comply with it." },
    { term: "Transactional leadership", def: "Directing through explicit targets and the exchange of reward for delivery." },
    { term: "Intrapreneurship", def: "Opportunity-seeking, risk-taking behaviour inside an established organisation, using its resources and carrying its risk." },
    { term: "Tone from the top", def: "The behaviour senior people model and reward, which sets what everyone else treats as acceptable." },
    { term: "Accountability", def: "Answerability for outcomes within your responsibility, including those you delegated to others." },
  ],
  summary: [
    "Leadership sets direction, sponsors delivery and absorbs the cost of change; management delivers within agreed constraints.",
    "Assess leadership from behaviour in the exhibits, not from job titles or stated intentions.",
    "Match the approach to urgency and capability — and split the problem where the two differ.",
    "Failure to innovate is usually an approval, reward or tolerance-of-failure problem a board can fix.",
    "Compliant structures with compromised reporting routes are a leadership finding, not good governance.",
  ],
  knowledgeDiagnostic: [
    { q: "What are leadership's three contributions to strategy?", a: "Shaping which options are considered (formulation), sponsoring delivery with owners and resource (implementation), and absorbing the political cost of change." },
    { q: "How do you justify recommending a directive approach?", a: "By pointing to urgency the case supplies — a solvency, safety or crisis constraint — or to teams without the experience to decide, not by preference." },
    { q: "What normally suppresses intrapreneurship in an established firm?", a: "Appraisal hurdles that screen out novelty, punishment of intelligent failure, approval routes through threatened incumbents, and reward based only on current-period output." },
    { q: "Why is a full set of board committees not evidence of good governance?", a: "Because effectiveness depends on independence — who each mechanism reports to, and whether it can operate without the people it monitors." },
  ],
  furtherStudy: [
    "SBL-02 develops leadership into culture and the cultural web",
    "SBL-03 and SBL-04 cover professional codes, conflicts, threats and economic crime (A3)",
    "SBL-08 and SBL-09 examine the board, NEDs, committees and remuneration in depth",
    "SBL-35 applies leadership to managing strategic change",
  ],
}

const SBL_TREE_02: StudyChapter = {
  paper: "SBL",
  id: "SBL-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)", "A2(d)"],
  title: "Leadership, culture and the cultural web",
  minutes: 18,
  intro:
    "Culture is what people do when nobody is checking. SBL examines it because strategies fail against culture far more often than they fail against competitors — and because the cultural web is a diagnostic tool the examiner expects you to actually use.",
  outcomes: [
    "Explain why culture is a strategic asset or constraint, and how leaders shape it",
    "Use the cultural web to diagnose an organisation's current culture from case evidence",
    "Assess how culture affects organisational purpose and the strategy that is achievable",
    "Recommend specific, evidenced changes to move a culture towards what a strategy requires",
    "Advise on the leadership style appropriate to managing a given strategic change",
  ],
  sections: [
    {
      id: "why-culture-is-strategic",
      heading: "Why culture decides what strategy is possible",
      blocks: [
        {
          kind: "text",
          md: "Culture is the set of shared assumptions, values and habits that make some behaviours feel natural in an organisation and others feel impossible. It is powerful precisely because it operates without instruction: it fills the gap between what the rules say and what the situation actually demands.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The mechanism worth remembering",
          md: "Strategy specifies behaviour that has to become routine. Culture determines which behaviours *can* become routine without constant enforcement. Where the two conflict, culture usually wins, because it is present in every unobserved decision and the strategy document is not.",
        },
        {
          kind: "text",
          md: "This is why the same strategy succeeds in one organisation and fails in another. A premium service strategy needs staff who will spend an extra ten minutes on a customer with no supervisor watching; if the culture has been built on call-handling times for a decade, the strategy is asking for behaviour the culture actively punishes. Nothing in the strategy is wrong — it is simply undeliverable until something else changes.",
        },
        {
          kind: "table",
          caption: "Culture as asset and as constraint",
          head: ["Strategic intention", "Culture that makes it work", "Culture that defeats it"],
          rows: [
            ["Premium, high-touch service", "Discretion trusted; staff judgement respected", "Throughput measured minute by minute"],
            ["Cost leadership", "Frugality genuinely admired at senior level", "Visible executive privilege and expense"],
            ["Rapid innovation", "Intelligent failure treated as learning", "Blame follows every unsuccessful pilot"],
            ["Integrated risk management", "Bad news travels upward quickly", "Messengers are punished; forecasts are managed"],
            ["Ethical compliance", "Values held when they cost something", "Targets override the code in practice"],
          ],
        },
        {
          kind: "text",
          md: "Culture also shapes **purpose** itself, which is what A2(d) is getting at. An organisation whose culture is built on professional autonomy will resist a purpose defined purely in shareholder-return terms — not by arguing against it, but by quietly continuing to optimise for professional standards. Leaders who ignore this end up with a stated purpose and a real purpose, and the second one governs.",
        },
      ],
      check: {
        q: "A retailer adopts a premium service strategy while continuing to rank and reward store staff solely on transactions per hour. What is the most likely outcome?",
        options: [
          "The strategy will succeed because the incentive is already strong",
          "The measured behaviour will persist and the service strategy will not be delivered",
          "Staff will balance both aims without any change to measurement",
          "The strategy will fail because premium service is unsuited to retail",
        ],
        correct: 1,
        explain:
          "People optimise what is measured and rewarded, especially unsupervised. Transactions per hour directly penalises the time premium service requires, so the culture and reward system will win. Option 2 is the comfortable answer and the reason this trap works — it assumes goodwill can absorb a contradiction that the measurement system enforces daily.",
      },
    },
    {
      id: "cultural-web",
      heading: "Diagnosing with the cultural web",
      blocks: [
        {
          kind: "text",
          md: "The cultural web breaks culture into six observable elements plus the paradigm at the centre — the set of assumptions the organisation takes for granted. Its value in SBL is that each element is something you can actually *find in an exhibit*, which converts a vague statement about culture into evidence.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "radial",
            title: "The cultural web",
            data: {
              centre: "The paradigm",
              nodes: [
                { label: "Stories", sub: "Who is a hero; which events get retold" },
                { label: "Symbols", sub: "Titles, offices, logos, dress, parking" },
                { label: "Power structures", sub: "Who really decides, whatever the chart says" },
                { label: "Organisational structures", sub: "Reporting lines, hierarchy, formality" },
                { label: "Control systems", sub: "What is measured, rewarded, audited" },
                { label: "Rituals and routines", sub: "Meetings, reviews, how things are always done" },
              ],
            },
          },
        },
        {
          kind: "table",
          caption: "Reading each element from case evidence",
          head: ["Element", "What to look for in an exhibit", "What it reveals"],
          rows: [
            ["Stories", "Which past events are still retold, and who is the hero", "What the organisation actually admires"],
            ["Symbols", "Executive floors, job titles, dress, reserved parking", "Whether hierarchy or equality is real"],
            ["Power structures", "Whose objection stops a decision, regardless of role", "Where authority truly sits"],
            ["Organisational structures", "Layers, spans, how formal escalation is", "How far information must travel to matter"],
            ["Control systems", "The KPIs, the bonus basis, what gets audited", "What the organisation treats as important"],
            ["Rituals and routines", "Standing meetings, review cycles, 'how we always'", "Which behaviours are reinforced weekly"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Use the web in three moves, never as six paragraphs of description",
          md: "**1.** Describe the current culture element by element, citing the exhibit. **2.** State what culture the proposed strategy requires. **3.** Name the gaps and recommend the specific change to each element. A pure description of the current culture, however accurate, answers only the first third of the question.",
        },
        {
          kind: "example",
          title: "Web to recommendation",
          scenario:
            "A professional firm wants to move from bespoke advisory work to a standardised digital product. Exhibits show partners' status derives from personal client relationships, promotion tracks chargeable hours, the retold stories are all about rescuing a client overnight, and the standing weekly meeting reviews individual utilisation.",
          steps: [
            { label: "Current paradigm", detail: "Value is created by individual expertise applied heroically to a unique client problem." },
            { label: "Required paradigm", detail: "Value is created by a repeatable product that works without the expert present." },
            { label: "Name the gaps", detail: "Control systems reward hours not reuse; stories celebrate heroics not scalability; power sits with relationship owners who lose status under the new model." },
            { label: "Recommend per element", detail: "Add reuse and product-adoption measures to promotion criteria; change the weekly review to product metrics; give product leadership real authority and reward; publicise a success story about scale rather than rescue." },
          ],
          result:
            "The recommendation changes the mechanisms that produce the culture, rather than asking people to value something their reward system penalises.",
        },
      ],
      check: {
        q: "Which finding best evidences the 'power structures' element rather than 'organisational structures'?",
        options: [
          "The organisation has seven management layers between the CEO and front line",
          "A regional manager two levels below the board can veto any IT change in practice",
          "The firm publishes a detailed organisation chart annually",
          "Reporting lines were formally redrawn last year",
        ],
        correct: 1,
        explain:
          "Power structures are about where authority really sits, which is why informal veto is the giveaway. The other three describe the formal architecture — layers, charts and reporting lines — which is the organisational structures element. The two are routinely confused, and the exam rewards keeping them apart because the recommendations differ.",
      },
    },
    {
      id: "style-for-change",
      heading: "The leadership style a change actually needs",
      blocks: [
        {
          kind: "text",
          md: "A2(b) asks for advice on the style appropriate to managing strategic change. The honest answer is that it depends on two things the case always tells you: how much **time** there is, and how much **agreement and capability** already exist.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "Time and agreement drive the choice",
            data: {
              leftTitle: "Little time / low agreement",
              rightTitle: "More time / high capability",
              rows: [
                { aspect: "Style", left: "Directive, with clear non-negotiables", right: "Participative or delegative" },
                { aspect: "Communication", left: "Explain the constraint honestly and early", right: "Involve people in designing the method" },
                { aspect: "Risk carried", left: "Compliance without commitment; talent loss", right: "Slower start; drift if scope is unbounded" },
                { aspect: "Mitigation", left: "Be visibly fair; protect credibility; revisit later", right: "Set firm outcomes, decision rights and dates" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Resistance deserves particular care because it is where weak answers become dismissive. Some resistance is self-interest, but much of it is information: the people closest to the work often understand a delivery obstacle the board has not seen. Treating every objection as obstruction discards the cheapest source of intelligence available and confirms exactly the culture that caused the problem.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not recommend 'better communication' and stop",
          md: "Communication is necessary and almost never sufficient. Say *what* is communicated (the constraint, the timetable, what is not changing), *by whom*, *to whom*, and what mechanism carries objections back upward. A recommendation with no return path is an announcement.",
        },
        {
          kind: "text",
          md: "Leaders also have to change the things that hold the old culture in place, and they must go first. If executives keep the privileges the change removes from everyone else, the change is understood immediately and correctly as something done to the organisation rather than by it.",
        },
      ],
      check: {
        q: "A change programme is resisted by experienced operational managers who say the timetable ignores a seasonal peak. What is the best leadership response?",
        options: [
          "Restate the timetable firmly to demonstrate commitment",
          "Treat the objection as evidence, test the seasonal constraint, and adjust the plan or explain why it stands",
          "Replace the managers with people who support the programme",
          "Delay the programme indefinitely until everyone agrees",
        ],
        correct: 1,
        explain:
          "This resistance carries operational information the board may not have. Testing it either improves the plan or produces a reasoned explanation that earns credibility — both better than option 0, which protects the leader's authority at the cost of walking into a foreseeable delivery failure.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Describing the six web elements without saying what the strategy requires or what should change.",
      fix: "Run current culture → required culture → gaps → element-by-element recommendation. Description alone is a third of the answer.",
    },
    {
      trap: "Confusing power structures with organisational structures.",
      fix: "Power structures are who really decides; organisational structures are the formal chart, layers and reporting lines.",
    },
    {
      trap: "Recommending a culture change while leaving the reward system untouched.",
      fix: "Control systems are the strongest element — change the measure and the incentive, or nothing moves.",
    },
    {
      trap: "Dismissing resistance as irrational obstruction.",
      fix: "Separate self-interest from genuine delivery information, and design a route that carries objections upward.",
    },
  ],
  keyTerms: [
    { term: "Culture", def: "Shared assumptions and habits that determine behaviour when nobody is supervising." },
    { term: "Paradigm", def: "The assumptions an organisation takes so completely for granted that they are never argued about." },
    { term: "Cultural web", def: "A diagnostic splitting culture into stories, symbols, power structures, organisational structures, control systems and rituals around a central paradigm." },
    { term: "Control systems", def: "The measures, targets, rewards and audits that tell people what the organisation actually values." },
    { term: "Strategic drift", def: "Gradual loss of fit between strategy and environment as culture keeps reproducing what used to work." },
  ],
  summary: [
    "Culture governs unsupervised behaviour, so it decides which strategies are deliverable at all.",
    "Use the cultural web as a three-move diagnostic: current, required, gaps and changes.",
    "Control systems are the most powerful element — measurement and reward beat stated values.",
    "Match change style to the time available and the agreement and capability present.",
    "Resistance is partly information; leaders must also change the symbols that hold the old culture up.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does culture defeat strategy so often?", a: "Strategy needs behaviour to become routine, and culture decides which behaviours can become routine unsupervised — it is present in every unobserved decision." },
    { q: "What are the six elements of the cultural web?", a: "Stories, symbols, power structures, organisational structures, control systems, and rituals and routines, surrounding the paradigm." },
    { q: "How should the web be used in an answer?", a: "Diagnose the current culture from exhibit evidence, state what the strategy requires, then recommend a change to each element where there is a gap." },
    { q: "Which two case facts determine the appropriate change style?", a: "How much time is available and how much agreement and capability already exist." },
  ],
  furtherStudy: [
    "SBL-01 covers the leadership qualities and approaches this chapter applies",
    "SBL-13 examines strategic drift within the macro-environment (C2)",
    "SBL-35 covers managing strategic change, Lewin, Harmon and contextual features",
    "SBL-19 develops risk culture, which is culture applied to risk appetite",
  ],
}

const SBL_TREE_03: StudyChapter = {
  paper: "SBL",
  id: "SBL-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A3(a)", "A3(b)"],
  title: "Responsible leadership, public value and the professional codes",
  minutes: 17,
  intro:
    "SBL asks you to be a professional accountant advising a board, not an employee doing as instructed. That means holding a duty that runs past the organisation — and knowing the code well enough to assess someone else's behaviour against it.",
  outcomes: [
    "Critically evaluate responsible leadership and the creation of public value through acting in the public interest",
    "Explain the fundamental principles in the professional codes of ethics for accountants",
    "Assess described management behaviour against those principles and reach a supportable conclusion",
    "Distinguish what is legal, what is compliant and what is ethical, and advise where they diverge",
  ],
  sections: [
    {
      id: "responsible-leadership",
      heading: "Responsible leadership and public value",
      blocks: [
        {
          kind: "text",
          md: "Responsible leadership means accepting that the organisation's decisions produce effects beyond its own accounts, and treating those effects as part of the decision rather than as someone else's problem. **Public value** is the corresponding idea of what the organisation contributes to the wider community — the benefit that would be lost if it stopped operating, whether or not it appears in the financial statements.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Acting in the public interest is not the same as being generous",
          md: "The public interest constrains what the organisation may do to secure its own advantage. It is engaged by misleading disclosure, unsafe products, concealed environmental harm, exploitation of weak regulation or of vulnerable customers — situations where the organisation gains and someone outside it bears the cost.",
        },
        {
          kind: "text",
          md: "The honest version of this argument accepts a real tension. Directors owe duties to the company and its members; a decision that sacrifices returns for a diffuse public benefit needs a defensible basis, not just good intentions. Two arguments do that work. The **licence to operate** argument says that trust, reputation and regulatory tolerance are assets, and that spending them for short-term gain is a real cost that simply appears later. The **long-term value** argument says that harms an organisation creates tend to return as regulation, litigation, remediation or lost customers, so an apparently costly responsible choice is often the cheaper one measured over the life of the decision.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "Where responsible leadership shows up in a case",
            data: {
              items: [
                { title: "Disclosure", sub: "Is the reporting true and complete, or technically defensible and misleading?" },
                { title: "Product and service", sub: "Who is harmed by how this is sold or made?" },
                { title: "Supply chain", sub: "Is the standard applied to suppliers the one applied at home?" },
                { title: "Environment", sub: "What impact is unrecorded because nobody has to record it?" },
                { title: "Tax and regulation", sub: "Compliance in form or in substance?" },
                { title: "Employment", sub: "Is a cost saving simply a risk transferred to staff?" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Public value carries extra weight where the organisation is public sector, a charity or an NGO, because there value *is* the objective rather than a constraint on it. SBL-11 develops this into economy, effectiveness and efficiency and the governance arrangements the public sector needs.",
        },
      ],
      check: {
        q: "A company's tax structure is lawful, disclosed, and reduces its contribution in a country where it uses public infrastructure heavily. How should an adviser frame this?",
        options: [
          "No issue arises, because the structure is legal and disclosed",
          "Legality settles the compliance question but not the reputational, licence-to-operate and public-interest question the board must weigh",
          "The structure must be dismantled immediately regardless of consequences",
          "Tax is a technical matter outside the scope of responsible leadership",
        ],
        correct: 1,
        explain:
          "Legal and ethical are different tests, and SBL wants both applied. The board is entitled to a lawful structure and still needs to weigh trust, regulatory tolerance and public expectation. Option 0 is the trap because it is genuinely true as far as it goes — it simply answers a narrower question than the one asked.",
      },
    },
    {
      id: "codes-and-principles",
      heading: "The fundamental principles, applied to a senior adviser",
      blocks: [
        {
          kind: "text",
          md: "The professional codes for accountants — the international code issued by the IESBA, and the bodies' own codes that follow it — are built on five fundamental principles. SBL rarely asks you to list them. It asks you to *apply* them to a person in an exhibit, which requires knowing what each one prohibits in practice.",
        },
        {
          kind: "table",
          caption: "The five fundamental principles in use",
          head: ["Principle", "What it requires", "How it is breached in a case"],
          rows: [
            ["Integrity", "Be straightforward and honest in all professional dealings", "Signing off a statement known to be misleading, even if literally accurate"],
            ["Objectivity", "Do not let bias, conflict or undue influence override judgement", "Recommending a supplier in which a relative holds an interest"],
            ["Professional competence and due care", "Maintain the capability the work needs; act diligently", "Advising on an area outside your expertise without support or caveat"],
            ["Confidentiality", "Do not disclose or exploit information obtained professionally", "Using knowledge of a client's plans for personal or employer advantage"],
            ["Professional behaviour", "Comply with law and regulation; avoid discrediting the profession", "Conduct that damages public trust even where no specific rule is broken"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Confidentiality is a duty with limits — say so",
          md: "It is not absolute. Disclosure can be required by law or regulation, permitted by consent, or necessary to protect the public interest. Weak answers treat confidentiality as an excuse for inaction on serious wrongdoing; strong answers name the exception being relied on and the proper route for raising it.",
        },
        {
          kind: "text",
          md: "Note the difference between a principles-based code and a rulebook. A rulebook can be complied with while its purpose is defeated, and a well-advised organisation is good at exactly that. A principles-based code asks whether the *outcome* is honest, unbiased and competent — which is why the examiner supplies behaviour that is technically permitted and clearly wrong.",
        },
      ],
      check: {
        q: "A finance director prepares a forecast they privately believe is unachievable, in order to secure a lending facility. All figures are supportable individually. Which principle is most clearly breached?",
        options: [
          "Confidentiality, because lender discussions are private",
          "Integrity, because the overall impression given is knowingly misleading",
          "Professional competence, because the forecast turned out wrong",
          "No principle is breached, as each figure is individually supportable",
        ],
        correct: 1,
        explain:
          "Integrity applies to the impression conveyed, not just to each line item — a set of individually defensible figures assembled to mislead still misleads. Option 3 is the trap and mirrors how these situations are actually defended in practice; option 2 confuses being wrong with lacking competence.",
      },
    },
    {
      id: "assessing-behaviour",
      heading: "Assessing behaviour against a code",
      blocks: [
        {
          kind: "text",
          md: "A3(b) asks you to assess management behaviour against the codes. This is a task type with a reliable structure, and using it stops you from producing generalised disapproval that earns no marks.",
        },
        {
          kind: "list",
          style: "number",
          title: "The structure that earns the marks",
          items: [
            "**Identify the behaviour** — state precisely what was done, citing the exhibit rather than paraphrasing it vaguely",
            "**Name the principle engaged** — and say which specific aspect of it",
            "**Explain why it is engaged** — the mechanism, not the label: what makes this objectivity rather than integrity",
            "**Assess seriousness** — who is harmed, how far it spread, was it deliberate or careless, is it continuing",
            "**Recommend action** — what happens now, in what order, and who is responsible",
          ],
        },
        {
          kind: "example",
          title: "Applying the structure",
          scenario:
            "An operations director awarded a three-year maintenance contract without tender to a company owned by their brother-in-law. The price is within market range. No declaration was made, and the audit committee learned of the relationship from a supplier.",
          steps: [
            { label: "Behaviour", detail: "Undeclared related-party award, outside the tender process, discovered externally." },
            { label: "Principles", detail: "Objectivity — a close family interest sits on both sides. Professional behaviour — bypassing procurement controls. Integrity — the omission of the declaration, not merely its absence." },
            { label: "Why engaged", detail: "The safeguard that would have managed the conflict is declaration; the failure to declare removed the board's ability to manage it at all." },
            { label: "Seriousness", detail: "Deliberate concealment, three-year commitment, and detection by an outsider — which means the control did not work rather than that it was never tested." },
            { label: "Action", detail: "Declare and record the interest; review the award and the tender exemption; remove the director from any decision on that contract; test other awards in their remit; report to the audit committee." },
          ],
          result:
            "A fair price does not cure the defect: the objection is to an unmanaged conflict and a bypassed control, both of which stand regardless of the outcome achieved.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "A good outcome does not cure a bad process",
          md: "Cases deliberately supply reassuring facts — the price was fair, the project succeeded, no loss occurred. Say plainly that the ethical objection is to the unmanaged conflict and the bypassed control, because the next one may not end well and nobody would know.",
        },
      ],
      check: {
        q: "Why does a market-rate price fail to resolve the undeclared related-party award above?",
        options: [
          "It does resolve it, since no financial loss arose",
          "Because the breach is the unmanaged conflict and bypassed control, which stand independently of the price achieved",
          "Because related-party transactions are prohibited in all circumstances",
          "Because the price cannot be verified",
        ],
        correct: 1,
        explain:
          "The safeguard is declaration and independent decision-making; without it the board could not manage the conflict at all, and that failure is unaffected by this particular outcome being acceptable. Related-party dealing is not banned — it must be declared and managed, which is why option 2 overstates the rule.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating 'it is legal' as the end of the analysis.",
      fix: "Answer the compliance question, then the separate ethical, reputational and public-interest question the board must weigh.",
    },
    {
      trap: "Listing the five principles without applying them to the person in the exhibit.",
      fix: "Name the behaviour, the principle, the mechanism, the seriousness, then the action.",
    },
    {
      trap: "Using confidentiality as a reason to do nothing about serious wrongdoing.",
      fix: "State the exception — legal requirement, consent, or public interest — and the proper internal route.",
    },
    {
      trap: "Accepting that a fair price or good outcome cures a bypassed control.",
      fix: "The objection is to the unmanaged conflict and the failed process, which stand whatever this outcome was.",
    },
  ],
  keyTerms: [
    { term: "Public value", def: "The benefit an organisation delivers to the wider community, which would be lost if it ceased to operate." },
    { term: "Licence to operate", def: "The trust and regulatory tolerance that let an organisation function, treated as a depletable asset." },
    { term: "Integrity", def: "Being straightforward and honest, including about the overall impression conveyed rather than each figure alone." },
    { term: "Objectivity", def: "Not allowing bias, conflict of interest or undue influence to override professional judgement." },
    { term: "Professional behaviour", def: "Complying with law and regulation and avoiding conduct that discredits the profession." },
  ],
  summary: [
    "Responsible leadership treats effects outside the accounts as part of the decision.",
    "Licence to operate and long-term value give a defensible basis for a responsible choice.",
    "The five principles are integrity, objectivity, competence and due care, confidentiality, professional behaviour.",
    "Confidentiality has limits — law, consent and the public interest.",
    "Assess behaviour as: behaviour, principle, mechanism, seriousness, action. A good outcome never cures a bypassed control.",
  ],
  knowledgeDiagnostic: [
    { q: "What is public value?", a: "The benefit the organisation delivers to the wider community, which would be lost if it stopped operating, whether or not it is in the accounts." },
    { q: "Which two arguments justify a costly responsible choice to a board?", a: "Licence to operate — trust and regulatory tolerance are depletable assets; and long-term value — harms return as regulation, litigation or lost customers." },
    { q: "Name the five fundamental principles.", a: "Integrity; objectivity; professional competence and due care; confidentiality; professional behaviour." },
    { q: "What structure should an 'assess this behaviour' task follow?", a: "Behaviour cited from the exhibit, principle engaged, why it is engaged, seriousness, then recommended action and owner." },
  ],
  furtherStudy: [
    "SBL-04 covers conflicts of interest, ethical threats and safeguards, and economic crime (A3c–e)",
    "SBL-11 develops public value in the public sector context (B6)",
    "SBL-10 covers reporting to stakeholders and integrated reporting",
    "The Ethics and Professional Skills module underpins this area and should precede SBL",
  ],
}

const SBL_TREE_04: StudyChapter = {
  paper: "SBL",
  id: "SBL-04",
  number: 4,
  area: "A",
  syllabusRefs: ["A3(c)", "A3(d)", "A3(e)"],
  title: "Ethical conflicts, threats and safeguards, and economic crime",
  minutes: 18,
  intro:
    "This is the most reliably examined corner of Area A, and the one candidates most often meet unprepared: why conflicts arise, which threat is which, what safeguard actually works, and what a board should do about fraud, bribery and corruption.",
  outcomes: [
    "Analyse why conflicts of interest and ethical conflicts arise in organisations",
    "Recommend resolutions to a conflict, including when to withdraw or escalate",
    "Identify which ethical threat a situation creates, and why",
    "Recommend safeguards proportionate to the threat, and recognise when no safeguard is sufficient",
    "Recommend practice for preventing and detecting fraud, bribery and corruption, and explain how this sustains public trust",
  ],
  sections: [
    {
      id: "conflicts-of-interest",
      heading: "Why conflicts arise, and how to resolve them",
      blocks: [
        {
          kind: "text",
          md: "A **conflict of interest** exists where a person's duty to act in one party's interest is compromised by a competing interest — personal, financial, or a duty owed to someone else. An **ethical conflict** is broader: two obligations point in different directions and both cannot be honoured, such as loyalty to an employer against a duty to disclose to a regulator.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The conflict is the situation, not the misconduct",
          md: "Having a conflict is not wrong and often unavoidable. Failing to identify, declare and manage it is what breaches the code. This distinction matters in answers: recommend declaration and management, not automatic condemnation.",
        },
        {
          kind: "table",
          caption: "Common sources, and what each one actually threatens",
          head: ["Source", "Typical case fact", "What is compromised"],
          rows: [
            ["Personal financial interest", "Shareholding or fee dependent on the decision", "Objectivity of the recommendation"],
            ["Family or close relationship", "Relative owns a bidder or reports to the decision-maker", "Objectivity, and appearance of fairness"],
            ["Duties to two parties", "Advising both sides of a transaction", "Confidentiality and objectivity together"],
            ["Incentive design", "Bonus depends on the number being reported", "Integrity of the reported number"],
            ["Employment pressure", "Instruction from someone controlling your career", "Ability to exercise independent judgement"],
            ["Gifts and hospitality", "Sustained hospitality from a supplier under review", "Objectivity through obligation"],
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Resolving a conflict — in this order",
          items: [
            "**Identify and record** it, including how it arose and who is affected",
            "**Declare** it to the appropriate body — line management, the board, the audit committee, or the client",
            "**Remove the person from the decision** where the interest is direct and material",
            "**Apply safeguards** — independent review, separate teams, information barriers, external advice",
            "**Escalate** through internal routes if the conflict is not being managed",
            "**Withdraw or refuse** where no safeguard can reduce the threat to an acceptable level — and document why",
          ],
        },
        {
          kind: "text",
          md: "Where the conflict involves an instruction to do something improper, the sequence has one more feature: seek advice — internally, from the professional body, or legally — and keep a contemporaneous record. Documentation is not defensive clutter; it is often the only evidence that the professional judgement was exercised at the time rather than reconstructed afterwards.",
        },
      ],
      check: {
        q: "A senior manager discloses that their spouse works for a company bidding for a major contract, and asks how to proceed. What is the best immediate advice?",
        options: [
          "No action is needed, because the manager has been transparent",
          "Record the declaration and remove the manager from evaluation and award decisions on that tender",
          "Disqualify the spouse's employer from bidding",
          "The manager should resign to avoid any appearance of conflict",
        ],
        correct: 1,
        explain:
          "Declaration is necessary but not sufficient — the interest is direct, so it must also be managed by removing the person from the decision. Option 0 stops one step early, which is the most common error; options 2 and 3 impose costs on innocent parties when a proportionate safeguard exists.",
      },
    },
    {
      id: "threats-and-safeguards",
      heading: "The five threats, and safeguards that actually work",
      blocks: [
        {
          kind: "text",
          md: "The codes classify anything that might compromise compliance with the fundamental principles into five categories of threat. SBL expects you to name the right one and explain *why* — the label alone is worth little, because the safeguard follows from the mechanism.",
        },
        {
          kind: "table",
          caption: "The five threats",
          head: ["Threat", "The mechanism", "Case signal"],
          rows: [
            ["Self-interest", "A financial or other interest sways judgement", "Bonus, shareholding, fee dependence, job security"],
            ["Self-review", "Having to evaluate your own earlier work or judgement", "Reviewing a system you designed or a figure you prepared"],
            ["Advocacy", "Promoting a position so strongly that objectivity is compromised", "Acting as spokesperson or negotiator for the client's case"],
            ["Familiarity", "Long or close association makes challenge feel unnatural", "Years in the same relationship; close friendship; ex-colleague"],
            ["Intimidation", "Pressure or threat deters proper judgement", "Threat of dismissal, contract loss, litigation, or aggression"],
          ],
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Threat to conclusion",
            data: {
              steps: [
                { label: "Identify the threat", sub: "Which category, and why" },
                { label: "Evaluate significance", sub: "Materiality, proximity, duration" },
                { label: "Apply safeguards", sub: "Eliminate or reduce to acceptable" },
                { label: "Re-evaluate", sub: "Is the residual level acceptable?" },
                { label: "Decline or withdraw", sub: "If it is not" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Safeguards must attack the mechanism, which is why generic ones read as padding. If the threat is self-review, no amount of training helps — you need a *different person* to do the review. If it is intimidation, the safeguard is a route to someone with authority over the person applying the pressure. If it is familiarity, rotation or an independent second opinion is the answer.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Some threats cannot be safeguarded",
          md: "Where the interest is direct and material, or the pressure comes from the only person you could escalate to, the honest recommendation is to decline the engagement, withdraw from the decision, or resign the role. A strong answer says this plainly instead of inventing a safeguard that would not work.",
        },
        {
          kind: "example",
          title: "Two threats, two different safeguards",
          scenario:
            "An internal auditor is asked to review the effectiveness of the new expenses system, which they helped design last year. Separately, the finance director has told them that a critical finding would 'not be helpful' before the refinancing.",
          steps: [
            { label: "First threat", detail: "Self-review — they cannot objectively evaluate their own design work." },
            { label: "First safeguard", detail: "Assign the review to a different auditor or obtain an external review; the original designer may provide information but not the conclusion." },
            { label: "Second threat", detail: "Intimidation — pressure from someone with influence over their position, aimed at the content of a finding." },
            { label: "Second safeguard", detail: "Report directly to the audit committee, whose reporting line exists precisely to be independent of the finance director; record the approach made." },
            { label: "If unavailable", detail: "If the audit committee will not act, escalate externally or consider resignation — a compromised assurance function is worse than none, because it produces false comfort." },
          ],
          result:
            "Each safeguard removes the specific mechanism: a different person for self-review, an independent reporting line for intimidation. Training or a reminder of the code would address neither.",
        },
      ],
      check: {
        q: "A manager must assess the effectiveness of internal controls they personally designed. Which threat and safeguard pairing is correct?",
        options: [
          "Advocacy — mitigated by additional ethics training",
          "Self-review — mitigated by having an independent person perform the assessment",
          "Familiarity — mitigated by documenting the assessment thoroughly",
          "Intimidation — mitigated by reporting to the finance director",
        ],
        correct: 1,
        explain:
          "Evaluating your own prior work is the definition of self-review, and only a different reviewer removes it. Training, documentation and thoroughness do not touch the mechanism — they are the generic safeguards that make weak answers look busy while changing nothing.",
      },
    },
    {
      id: "fraud-bribery-corruption",
      heading: "Fraud, bribery and corruption",
      blocks: [
        {
          kind: "text",
          md: "A3(e) asks for best practice to reduce and combat fraud, bribery and corruption in order to increase public confidence and trust. Keep the three distinct: **fraud** is deception for gain, typically against the organisation or its stakeholders; **bribery** is offering or accepting an inducement to influence a decision; **corruption** is the wider abuse of entrusted position for private benefit.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "cards",
            title: "Why fraud happens — three conditions",
            data: {
              items: [
                { title: "Opportunity", sub: "Weak controls, override, no segregation" },
                { title: "Incentive or pressure", sub: "Targets, debt, bonus, fear of failure" },
                { title: "Rationalisation", sub: "'Owed it', 'everyone does', 'temporary'" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The practical value of those three conditions is that they generate three lines of response, and a good answer covers more than the first. Controls attack opportunity. Reward and target design attack incentive — a sales bonus with a hard cliff at a quarter end creates the pressure that produces revenue fraud. Tone, training and visible consequence attack rationalisation.",
        },
        {
          kind: "table",
          caption: "Board-level responses",
          head: ["Response", "What it does", "Common failure in a case"],
          rows: [
            ["Clear policy on gifts, hospitality and facilitation payments", "Removes ambiguity about what is permitted", "Exists but silent on thresholds or third parties"],
            ["Segregation of duties and authorisation limits", "Removes single-person opportunity", "Routinely overridden by senior management"],
            ["Whistleblowing route", "Surfaces what controls miss", "Reports to a compromised recipient; no protection given"],
            ["Due diligence on agents and intermediaries", "Addresses bribery committed on your behalf", "Third parties treated as outside the policy"],
            ["Targeted training", "Attacks rationalisation; equips people to refuse", "Generic annual e-learning nobody applies"],
            ["Visible, consistent consequence", "Removes the belief that seniority protects", "Senior offenders quietly reassigned"],
            ["Internal audit focus on fraud risk", "Detection, and deterrence through expectation", "Audit plan set by the people it should test"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Management override is the finding that matters most",
          md: "Cases regularly show sound controls that senior people bypass routinely. Say directly that a control which can be overridden without record or challenge provides no assurance at all — and recommend that overrides be logged, reported to the audit committee, and reviewed.",
        },
        {
          kind: "text",
          md: "Finally, connect this to trust, which is the reason the syllabus frames it as public confidence. Detected and honestly handled wrongdoing damages an organisation far less than concealed wrongdoing later exposed, because the second case destroys the credibility of everything else the organisation reports. That is the argument to put to a board tempted to settle a matter quietly.",
        },
      ],
      check: {
        q: "A company has strong documented controls, yet three significant frauds occurred, each involving a director authorising outside their limit with no record. What is the primary recommendation?",
        options: [
          "Introduce additional controls to strengthen the framework further",
          "Make management override impossible without logging, and report all overrides to the audit committee",
          "Increase the frequency of annual ethics training for all staff",
          "Accept that fraud cannot be prevented where directors are involved",
        ],
        correct: 1,
        explain:
          "The controls were adequate; the defect is that they could be bypassed silently, so more controls simply adds more things to override — which is why option 0 is tempting and useless. Making override visible and reportable attacks the actual mechanism and restores the assurance the existing framework was supposed to give.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating the existence of a conflict as misconduct in itself.",
      fix: "The breach is failing to identify, declare and manage it. Recommend declaration and management, escalating to withdrawal only where no safeguard suffices.",
    },
    {
      trap: "Naming a threat without explaining the mechanism.",
      fix: "Say what specifically compromises judgement — the safeguard follows from the mechanism, so the label alone earns little.",
    },
    {
      trap: "Offering training or documentation as the safeguard for every threat.",
      fix: "Self-review needs a different person; intimidation needs an independent reporting line; familiarity needs rotation.",
    },
    {
      trap: "Recommending more controls where the real problem is management override.",
      fix: "Make override loggable, reportable and reviewed — otherwise new controls are simply more things to bypass.",
    },
  ],
  keyTerms: [
    { term: "Conflict of interest", def: "A competing personal, financial or other interest that compromises a duty to act in another's interest." },
    { term: "Self-review threat", def: "The threat that arises when a person must evaluate their own earlier work or judgement." },
    { term: "Intimidation threat", def: "Pressure or threat that deters a person from exercising proper professional judgement." },
    { term: "Safeguard", def: "An action that eliminates a threat or reduces it to an acceptable level by removing its mechanism." },
    { term: "Bribery", def: "Offering, giving, requesting or accepting an inducement intended to influence a decision improperly." },
    { term: "Management override", def: "Senior bypass of an established control, which removes the assurance the control was designed to give." },
  ],
  summary: [
    "A conflict is a situation to be declared and managed; failing to manage it is the breach.",
    "Resolve in order: identify, declare, remove from the decision, safeguard, escalate, withdraw.",
    "The five threats are self-interest, self-review, advocacy, familiarity and intimidation.",
    "Safeguards must remove the specific mechanism — and some threats cannot be safeguarded at all.",
    "Attack fraud through opportunity, incentive and rationalisation together; silent management override is the finding that matters most.",
  ],
  knowledgeDiagnostic: [
    { q: "Is having a conflict of interest a breach of the code?", a: "No — conflicts are often unavoidable. The breach is failing to identify, declare and manage one." },
    { q: "Name the five ethical threats.", a: "Self-interest, self-review, advocacy, familiarity and intimidation." },
    { q: "What safeguard addresses a self-review threat?", a: "Having a different, independent person perform the review; the original preparer may supply information but not the conclusion." },
    { q: "What three conditions tend to be present when fraud occurs?", a: "Opportunity from weak or overridable controls, incentive or pressure, and rationalisation." },
    { q: "Why does silent management override matter so much?", a: "A control that can be bypassed without record or challenge provides no assurance, so adding controls changes nothing until override is logged and reported." },
  ],
  furtherStudy: [
    "SBL-03 covers the fundamental principles this chapter applies",
    "SBL-25 to SBL-27 develop internal control, internal audit and compliance (Area F)",
    "SBL-09 covers remuneration design, a frequent source of self-interest threats",
    "SBL-40 develops scepticism, the professional skill this material is examined through",
  ],
}

export const SBL_TREE_AREA_A: StudyChapter[] = [SBL_TREE_01, SBL_TREE_02, SBL_TREE_03, SBL_TREE_04]
