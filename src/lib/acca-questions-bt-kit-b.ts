import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi } from "@/lib/acca-bt-kit-builders"

/*
 * BT · Area B question kit — chapters 8 to 11. Authored, applied, exam-standard.
 * See acca-questions-bt-kit-a.ts for the kit's rationale.
 */

/* ── Chapter 8 · Organisation structure and design ─────────────── */

const CH08: AccaQuestion[] = [
  q("BTK-08-01", "BT-08", "B", "medium", 2,
    "A processing centre employs 216 front-line staff. Management widens the average span of control from 4 to 8. Holding staff numbers constant, what happens?",
    [
      "The structure becomes taller, with more management layers",
      "The structure becomes flatter, with fewer management layers and fewer managers",
      "The number of layers is unchanged, but management cost rises",
      "The structure becomes flatter, but the number of managers increases",
    ],
    1,
    "Span of control and number of levels move in OPPOSITE directions for a fixed headcount. With a span of 4 the centre needs 54 first-line managers; with a span of 8 it needs 27, and each level above shrinks correspondingly — so the structure FLATTENS and total management headcount FALLS. The trade-off to state is lighter supervision, a real need for delegation, and far fewer promotion rungs."),

  q("BTK-08-02", "BT-08", "B", "medium", 2,
    "A bank closes its UK-based call centre and reopens it as a wholly-owned subsidiary in another country, employing its own staff there. What has it done?",
    ["Outsourced the activity", "Offshored the activity", "Both outsourced and offshored it", "Created a shared service centre"],
    1,
    "The activity has MOVED COUNTRY but remains inside the group, so it has been OFFSHORED and NOT outsourced. Outsourcing changes WHO OWNS the activity — it must pass to an external provider — while offshoring changes WHERE it sits. A shared service centre centralises an activity internally to serve the whole organisation, which is a different arrangement again."),

  q("BTK-08-03", "BT-08", "B", "hard", 2,
    "A consultancy employs architects, engineers and surveyors. Every project needs several disciplines at once, and clients want one point of contact. Which structure fits best, and what problem will it create?",
    [
      "Functional; the problem is duplicated senior expertise",
      "Divisional by project; the problem is weak professional development",
      "Matrix; the problem is dual authority producing conflicting priorities",
      "Entrepreneurial; the problem is dependence on the founder",
    ],
    2,
    "A MATRIX suits work needing several specialisms simultaneously with a single client-facing lead: staff belong to a discipline for technical standards and development while also being assigned to project teams. Its inherent problem is DUAL AUTHORITY — each person reports to a discipline head and a project manager whose priorities will conflict, which slows decisions and blurs accountability. A recommendation without the drawback is only half an answer."),

  q("BTK-08-04", "BT-08", "B", "easy", 2,
    "Which statement about the informal organisation is correct?",
    [
      "It should be eliminated, as it undermines formal authority",
      "It exists in every organisation and can both help and harm; managers should engage with it",
      "It is shown on the organisation chart alongside formal reporting lines",
      "It only forms where management is weak",
    ],
    1,
    "The informal organisation forms SPONTANEOUSLY wherever people work together, so it cannot be eliminated and its existence says nothing about management quality. It speeds information, secures cross-boundary cooperation and meets social needs; it also spreads rumour, forms cliques and can bypass controls. It appears on no chart, which is precisely why managers must understand it rather than deny it."),

  q("BTK-08-05", "BT-08", "B", "medium", 2,
    "A retail group decides that treasury, tax and brand policy will be set centrally, while store-level pricing discretion and local staffing decisions rest with store managers. How is this best described?",
    [
      "An inconsistent structure, as an organisation must be either centralised or decentralised",
      "A sensible split, centralising where consistency and scale matter and decentralising where local judgement matters",
      "Full decentralisation, since store managers hold operational authority",
      "Full centralisation, since group policy overrides local decisions",
    ],
    1,
    "Centralisation is a SPECTRUM and different DECISION TYPES can sit at different points — which is what almost every real business does. Treasury, tax and brand benefit from consistency, expertise and scale; local pricing and staffing benefit from proximity to the customer and faster decisions. Answering 'centralise or decentralise' as a single choice for the whole organisation is the error being tested."),

  multi("BTK-08-06", "BT-08", "B", "medium", 2,
    "Which TWO conditions make a WIDER span of control appropriate?",
    [
      "The work is complex, varied and high-risk",
      "Subordinates are experienced and need little direction",
      "Procedures are clear, so most questions have documented answers",
      "The manager has extensive non-supervisory duties",
    ],
    [1, 2],
    "EXPERIENCED subordinates and CLEAR PROCEDURES both reduce the demand on a manager's attention, allowing a wider span. Complex, varied, high-risk work needs closer supervision and therefore a NARROWER span, and a manager with heavy non-supervisory duties has less time available, which also narrows it. Good information systems widen it too, by giving visibility without asking."),

  q("BTK-08-07", "BT-08", "B", "hard", 2,
    "In Anthony's hierarchy, a decision on whether to enter a new overseas market draws on information that is:",
    [
      "Highly detailed, internal and near-certain",
      "Highly summarised, largely external, long-horizon and uncertain",
      "Detailed, external and short-horizon",
      "Summarised, internal and immediate",
    ],
    1,
    "Market entry is a STRATEGIC decision, and information becomes more SUMMARISED, more EXTERNAL, longer-horizon and LESS CERTAIN as you move up Anthony's hierarchy. Option 1 describes OPERATIONAL information — today's schedule, this invoice. The distinction is defined by the decision and the information it needs, not simply by the seniority of who takes it."),

  q("BTK-08-08", "BT-08", "B", "medium", 2,
    "A firm keeps only its product design capability in-house and buys in manufacturing, warehousing, distribution and customer service from partners. Which boundaryless form is this?",
    ["Virtual", "Hollow", "Modular", "Matrix"],
    1,
    "A HOLLOW organisation keeps only its CORE COMPETENCE and buys in everything else — exactly the pattern described. A VIRTUAL organisation is a network of independent organisations acting as one for a purpose; a MODULAR one breaks the product into components made by specialists to a common specification. A matrix is not boundaryless at all: it is an internal structure with overlapping authority."),

  q("BTK-08-09", "BT-08", "B", "easy", 1,
    "The unbroken line of authority from the top of an organisation to the bottom is known as the:",
    ["Span of control", "Scalar chain", "Matrix", "Value chain"],
    1,
    "The SCALAR CHAIN is the unbroken line of authority through which authority is delegated downward and accountability flows back up. Span of control is the NUMBER of subordinates reporting directly to one manager — the two are related but distinct, and confusing them is common. The value chain is Porter's tool for locating where value is created."),

  q("BTK-08-10", "BT-08", "B", "hard", 2,
    "A company is considering outsourcing its entire internal IT function. Which is the most significant risk to state?",
    [
      "It will lose the ability to use technology at all",
      "Loss of in-house capability that is hard to rebuild, together with dependency and weak bargaining power at contract renewal",
      "Costs will necessarily be higher than in-house provision",
      "Outsourcing is prohibited for functions handling personal data",
    ],
    1,
    "The substantive risks are LOSS OF CAPABILITY that cannot easily be rebuilt, DEPENDENCY on the provider, and WEAK BARGAINING POWER when the contract comes up for renewal — plus reduced control over quality, timing and data security. Option 3 overstates it, since cost saving is often the motive and is frequently realised. Option 4 is wrong: outsourcing personal-data processing is lawful but brings specific data protection obligations for the controller."),
]

/* ── Chapter 9 · Organisational culture ────────────────────────── */

const CH09: AccaQuestion[] = [
  q("BTK-09-01", "BT-09", "B", "hard", 2,
    "A company launches a quality programme, trains all staff and displays 'quality first' throughout its premises. It then promotes the production manager with the highest output and the worst defect rate. What has it taught its employees?",
    [
      "That quality is the organisation's genuine priority",
      "That the espoused value is quality but the underlying assumption is volume",
      "Nothing — a single promotion decision has no cultural effect",
      "That the training programme was technically inadequate",
    ],
    1,
    "Culture is transmitted far more powerfully by WHAT GETS REWARDED than by what gets stated. The posters and training are ESPOUSED VALUES; the promotion reveals the BASIC UNDERLYING ASSUMPTION, and behaviour follows the assumption every time the two conflict. Promotion and reward decisions are among the strongest single influences on culture, which is why one such decision can undo a year of programme."),

  q("BTK-09-02", "BT-09", "B", "medium", 2,
    "A 40-year-old insurer has detailed procedure manuals, strict authorisation limits, promotion by grade and length of service, and a strong preference for precedent. Which of Handy's cultures is this?",
    ["Power (Zeus)", "Role (Apollo)", "Task (Athena)", "Person (Dionysus)"],
    1,
    "Authority deriving from POSITION and PROCEDURE rather than from personality or expertise is a ROLE culture, structured as a classical bureaucracy. Its strengths are consistency, control and predictability, which make it well suited to a STABLE environment — it is not badly run, it is run well for conditions that may no longer exist. A power culture would derive authority from one central figure, and a task culture from whoever knows most about the problem."),

  q("BTK-09-03", "BT-09", "B", "medium", 2,
    "In the three levels of culture, which level actually determines how employees behave?",
    [
      "Artefacts, because they are visible to everyone",
      "Espoused values, because they are formally communicated",
      "Basic underlying assumptions, because they are what people take for granted",
      "All three equally",
    ],
    2,
    "BASIC UNDERLYING ASSUMPTIONS drive behaviour: what is genuinely rewarded, what risks are acceptable, whether bad news can safely be reported upward. Artefacts are visible symbols and espoused values are what the organisation SAYS. Where the stated value and the underlying assumption conflict, staff learn the assumption — which is where nearly every cultural failure sits."),

  q("BTK-09-04", "BT-09", "B", "hard", 2,
    "A multinational introduces 360-degree appraisal including upward feedback on managers. In one country the upward feedback returns almost uniformly positive, with no substantive criticism. Which Hofstede dimension best explains this?",
    ["Individualism versus collectivism", "High power distance", "Low uncertainty avoidance", "Short-term orientation"],
    1,
    "In a HIGH POWER DISTANCE culture, hierarchy is broadly accepted and criticising a superior is socially unacceptable, so upward feedback arrives empty and the exercise costs money to learn nothing. The legitimate use of Hofstede is exactly this — explaining why a management SYSTEM designed in one country needs adapting in another. Using the dimensions to predict an individual colleague's behaviour would be stereotyping, and a poor answer."),

  q("BTK-09-05", "BT-09", "B", "medium", 2,
    "Which of Handy's cultures is typically associated with a matrix structure, and why?",
    [
      "Power culture, because authority radiates from the centre",
      "Task culture, because teams are assembled around the job by expertise",
      "Role culture, because reporting lines are formally defined",
      "Person culture, because professionals retain autonomy",
    ],
    1,
    "A TASK culture derives authority from EXPERTISE and assembles teams around the job, which maps naturally onto a matrix or network structure. It suits project work needing flexible cross-disciplinary teams, and its failure mode is teams competing for scarce resources. A power culture maps to a web, a role culture to a bureaucracy, and a person culture to a cluster of independents sharing overheads."),

  multi("BTK-09-06", "BT-09", "B", "medium", 2,
    "Which TWO factors most strongly shape an organisation's culture?",
    ["The founder's values, embedded early and often outliving them", "The physical colour scheme of the offices", "What the organisation rewards and promotes", "The number of pages in its staff handbook"],
    [0, 2],
    "The FOUNDER'S VALUES and WHAT GETS REWARDED are among the strongest influences — the second being the most powerful of all, because it shows what the organisation genuinely values as opposed to what it says. Office decoration is an ARTEFACT, the most superficial level of culture, and handbook length is not a cultural driver at all. Critical incidents, the nature of the work, size and national culture also shape it."),

  q("BTK-09-07", "BT-09", "B", "easy", 2,
    "Why do governance codes require a board to set the 'tone at the top'?",
    [
      "Because directors must personally approve all transactions",
      "Because the culture senior management models determines whether the organisation's controls are respected or bypassed",
      "Because tone at the top is a legal requirement in every jurisdiction",
      "Because it removes the need for internal audit",
    ],
    1,
    "The CONTROL ENVIRONMENT is culture, and it is the foundation of the whole internal control system: if senior managers are visibly seen to override authorisation limits or approve their own expenses, every control below them is weakened at once. That is why a weak control environment is a more serious finding than any single missing control, and why the board is made explicitly responsible for it."),

  q("BTK-09-08", "BT-09", "B", "hard", 2,
    "A small technology firm is run entirely at the direction of its founder, who takes all significant decisions personally and whose personal judgement is trusted implicitly. Which culture is this, and what is its limitation?",
    [
      "Role culture; limited by inflexible procedures",
      "Power culture; limited by the founder's own capacity and by having no check if they are wrong",
      "Task culture; limited by competition for resources",
      "Person culture; limited by lack of coordinated action",
    ],
    1,
    "Authority radiating from ONE CENTRAL FIGURE is a POWER culture, structured as a web. It is genuinely effective in a small, fast-moving organisation, giving quick decisions and flexibility. Its limitations are that it does not scale beyond the centre's personal capacity, and that there is no mechanism to correct the centre when it is wrong — a single point of both decision and failure."),

  q("BTK-09-09", "BT-09", "B", "medium", 1,
    "An organisation's published code of conduct is best described as which level of culture?",
    ["An artefact", "An espoused value", "A basic underlying assumption", "A cultural dimension"],
    1,
    "A published code is an ESPOUSED VALUE — something the organisation formally STATES. Whether it is followed depends on the BASIC UNDERLYING ASSUMPTIONS, which are taught mainly by what gets rewarded and what gets tolerated. This is why the existence of a code is no evidence that the culture is sound, and why the examiner tests the gap between the two levels."),

  q("BTK-09-10", "BT-09", "B", "hard", 2,
    "Which statement about a role culture is most accurate?",
    [
      "It is inherently inferior to a task culture",
      "It is highly effective in a stable, predictable environment where consistency and control matter, and fails when the environment changes faster than its procedures",
      "It cannot exist in a large organisation",
      "It always produces low staff motivation",
    ],
    1,
    "A role culture is NOT simply bad. Its impersonal application of rules is precisely what makes a tax authority or an examination board fair, and its consistency and control suit stable, predictable work. It fails only when the environment changes faster than procedures can be rewritten — which is a contingency argument, not a verdict. Blanket judgements about cultural types score poorly."),
]

/* ── Chapter 10 · Committees ───────────────────────────────────── */

const CH10: AccaQuestion[] = [
  q("BTK-10-01", "BT-10", "B", "easy", 2,
    "A group of managers is formed to investigate one warehouse fire, report its findings and then disband. What type of committee is this?",
    ["Standing", "Ad hoc", "Executive", "Joint"],
    1,
    "A committee formed for ONE specific purpose and dissolved when it is achieved is AD HOC. A standing committee is permanent and deals with a recurring matter — a general health and safety committee would be standing. Consisting of managers does not make it executive, which means having authority to ACT, and a joint committee draws members from two or more separate bodies such as management and a union."),

  q("BTK-10-02", "BT-10", "B", "medium", 2,
    "A committee's constitution requires five members present for business to be valid. Three attend and approve a $40,000 purchase that is unquestionably in the company's interests. What is the position?",
    [
      "The decision stands, as it was commercially sound",
      "The decision is invalid because the meeting was not quorate, and must be retaken properly",
      "The decision stands if the chair was present",
      "The decision stands but must be reported to the board",
    ],
    1,
    "Business conducted WITHOUT A QUORUM is INVALID, however sensible the decision. The quorum is a real control: it prevents whoever happens to be available deciding something that required five people's judgement. The chair's presence does not cure it, and reporting it afterwards does not validate it — the decision has to be retaken at a properly constituted meeting."),

  q("BTK-10-03", "BT-10", "B", "medium", 2,
    "A committee reviews technical proposals and submits its recommendations to the board for decision. How is it classified?",
    ["Executive", "Advisory", "Standing", "Sub-committee"],
    1,
    "A committee that can only RECOMMEND is ADVISORY; an EXECUTIVE committee has authority to decide and act. The phrase 'submits its recommendations to the board for decision' settles it, whatever the committee is called. It may also happen to be standing or a sub-committee, but those describe its permanence and its parentage rather than its authority, which is what the question asks about."),

  q("BTK-10-04", "BT-10", "B", "hard", 2,
    "A capital expenditure committee of nine has approved 43 of the last 44 proposals over six years with almost unchanged membership, brief amicable discussion, and the finance director both preparing and chairing. Which TWO problems does this most clearly display?",
    [
      "Groupthink and a conflicted chair",
      "Lack of a quorum and excessive membership",
      "Insufficient technical expertise and poor minute-taking",
      "Over-delegation and excessive independence",
    ],
    0,
    "Six years of unchanged membership with brief, amicable discussion and a 98% approval rate are textbook GROUPTHINK markers — doubts unvoiced, unanimity assumed, and the committee reduced to a ratification step. And the person PREPARING the proposals also CHAIRING their discussion is a conflicted chair, removing the independent scrutiny that is a committee's main purpose. The committee now bears all the cost of nine people's senior time and delivers none of the benefit."),

  q("BTK-10-05", "BT-10", "B", "easy", 1,
    "Which of the following is a responsibility of the committee SECRETARY rather than the chair?",
    [
      "Keeping discussion relevant and within time",
      "Ensuring every member is heard",
      "Preparing and circulating the agenda and taking the minutes",
      "Exercising a casting vote to break a tie",
    ],
    2,
    "The SECRETARY prepares and circulates the agenda and papers, takes and circulates minutes, maintains records, follows up action points and advises on procedure. Keeping discussion relevant, ensuring members are heard and exercising a casting vote are all the CHAIR's functions. The two roles are complementary and are frequently confused in exam answers."),

  multi("BTK-10-06", "BT-10", "B", "medium", 2,
    "Which TWO are genuine DISADVANTAGES of taking a decision by committee?",
    ["Decisions can be slow, because meetings must be scheduled and reconvened", "Multiple perspectives improve decision quality", "Accountability is diffused, so no individual is answerable", "Those involved are more committed to implementing the outcome"],
    [0, 2],
    "SLOWNESS and DIFFUSED ACCOUNTABILITY are real costs — when everyone is responsible, nobody is. Multiple perspectives and greater commitment to implementation are ADVANTAGES. An answer giving only one column is half an answer, and the disadvantages column also includes expense in senior time, groupthink, and domination by one member or the chair."),

  q("BTK-10-07", "BT-10", "B", "medium", 2,
    "What are 'terms of reference' for a committee?",
    [
      "The list of members and their voting rights",
      "The written statement of the committee's purpose, scope and authority",
      "The minimum number who must attend for business to be valid",
      "The record of what was decided at each meeting",
    ],
    1,
    "TERMS OF REFERENCE set out a committee's PURPOSE, SCOPE and AUTHORITY in writing — what it exists to do and what it may decide. The minimum attendance is the QUORUM, and the record of decisions is the MINUTES. A committee without clear terms of reference tends to drift beyond its remit or fail to address what it was created for."),

  q("BTK-10-08", "BT-10", "B", "hard", 2,
    "Which statement about groupthink is correct?",
    [
      "It is simply the normal state of a group whose members agree",
      "It is the active suppression of doubt to preserve harmony, with outside information discounted and unanimity assumed",
      "It affects newly formed committees more than long-standing ones",
      "It is prevented by increasing the size of the committee",
    ],
    1,
    "Groupthink is the ACTIVE SUPPRESSION of doubt to preserve group harmony, together with discounting outside information and assuming unanimity — it is not merely agreement. LONG-STANDING, COHESIVE committees are the most at risk, not new ones, because cohesion is what makes dissent feel disloyal. Adding members does not prevent it; rotating membership and assigning someone to argue against each proposal do."),

  q("BTK-10-09", "BT-10", "B", "easy", 1,
    "A person who sits on a committee by virtue of holding another office is described as:",
    ["Co-opted", "Ex officio", "Advisory", "A casting member"],
    1,
    "An EX OFFICIO member sits by virtue of holding another office — a finance director who is automatically on the audit committee, for example. A CO-OPTED member is brought in for their expertise without being elected. 'Advisory' describes the committee's authority rather than a member's basis for sitting, and 'casting member' is not a term."),

  q("BTK-10-10", "BT-10", "B", "medium", 2,
    "An organisation forms a committee whose real purpose is to be seen to be considering a decision that senior management has already taken. Which committee weakness does this illustrate?",
    [
      "Lack of a quorum",
      "Using a committee to delay or diffuse responsibility rather than to decide",
      "Excessive technical expertise",
      "Failure to appoint a secretary",
    ],
    1,
    "One of the acknowledged purposes of committees is to BUY TIME or DIFFUSE responsibility — sometimes a legitimate need for further consideration, and sometimes an evasion. The examiner expects both readings to be named. Here it is plainly the second: the committee incurs the cost of senior time while providing none of the scrutiny that would justify it."),
]

/* ── Chapter 11 · Governance, CSR and sustainability ───────────── */

const CH11: AccaQuestion[] = [
  q("BTK-11-01", "BT-11", "B", "medium", 2,
    "A listed company has no separate remuneration committee. Its annual report discloses this and explains why, given the board's small size. Under a comply-or-explain code, what is the position?",
    [
      "The company has breached the code, as the provision is mandatory",
      "The company has used the 'explain' route the code provides, letting shareholders judge",
      "The company has breached the code unless shareholders vote to approve at the AGM",
      "The code does not apply, as it is not statute",
    ],
    1,
    "A COMPLY OR EXPLAIN code permits either following a provision OR departing from it and publicly disclosing and justifying the departure. Disclosing with reasons IS using the mechanism — the discipline is transparency rather than prohibition. Note the code does apply: listing rules typically require reporting against it even though the code itself is not statute."),

  q("BTK-11-02", "BT-11", "B", "hard", 2,
    "Sandhurst plc's audit committee comprises the finance director, the chief operating officer and a non-executive director who is the chair's brother-in-law. What is the fundamental problem?",
    [
      "The committee has too few members to be effective",
      "It cannot provide independent oversight: two members are executives whose work it reviews, and the third is not independent",
      "The finance director should chair it rather than merely sit on it",
      "There is no problem, provided the committee meets quarterly",
    ],
    1,
    "An audit committee must consist of INDEPENDENT non-executive directors. Here the finance director PREPARES the financial statements the committee is meant to assess, the COO is part of the management whose controls are under review, and a brother-in-law of the chair is not independent. Management is reviewing itself, and internal audit and the external auditor have no route to the board that avoids the people they may need to report on."),

  q("BTK-11-03", "BT-11", "B", "medium", 2,
    "Which body sets the pay and contract terms of executive directors under a typical governance code?",
    ["The full board including the executives concerned", "The remuneration committee, composed of independent non-executive directors", "The audit committee", "The shareholders directly at each AGM"],
    1,
    "The REMUNERATION COMMITTEE of independent NEDs sets executive pay, because nobody should set their own — this is the most direct agency conflict available. The AUDIT committee handles reporting integrity, internal control and the external auditor. Shareholders typically VOTE on remuneration policy and reports, which is oversight rather than setting the terms."),

  q("BTK-11-04", "BT-11", "B", "hard", 2,
    "To whom are a director's statutory duties owed?",
    [
      "To each individual shareholder personally",
      "To the company, for the benefit of members as a whole, with regard required to employees, suppliers, customers, community and environment",
      "To all stakeholders equally, with no primacy",
      "To the board collectively rather than to the company",
    ],
    1,
    "Duties are owed TO THE COMPANY, for the benefit of members as a whole — not to shareholders individually. But the duty to promote the company's success EXPRESSLY REQUIRES regard to employees, suppliers, customers, the community and the environment, and to the long term. So the position is neither pure shareholder primacy nor an equal duty to all stakeholders: it is shareholder primacy with mandatory stakeholder consideration built in."),

  q("BTK-11-05", "BT-11", "B", "medium", 2,
    "Why do governance codes generally require the roles of chair and chief executive to be held by different people?",
    [
      "Because one person could not physically perform both roles",
      "Because the chair leads the board that holds the chief executive to account, sets its agenda and leads discussion of their performance and pay",
      "Because company law prohibits combining them",
      "Because it allows the company to appoint more non-executive directors",
    ],
    1,
    "Splitting the roles is structural, not a matter of workload. The chair runs the board that OVERSEES the chief executive — setting its agenda and leading the discussion of the CEO's performance and remuneration. Combining them means one person setting the agenda for their own appraisal and controlling how much the overseeing board is told. No individual failing is needed for that to go wrong; the structure itself removes the check."),

  multi("BTK-11-06", "BT-11", "B", "medium", 2,
    "Which TWO of the following are responsibilities of the AUDIT committee?",
    ["Setting executive directors' bonus targets", "Monitoring the integrity of the financial statements", "Recommending the appointment and fee of the external auditor", "Leading the process for new board appointments"],
    [1, 2],
    "The audit committee monitors the INTEGRITY OF FINANCIAL REPORTING and oversees the EXTERNAL AUDITOR — including recommending appointment, fee and assessing independence — as well as reviewing internal control, risk management and internal audit. Executive bonus targets belong to the REMUNERATION committee and board appointments to the NOMINATION committee. Confusing the three remits is a common and avoidable loss of marks."),

  q("BTK-11-07", "BT-11", "B", "hard", 2,
    "A non-executive director retired eight months ago from the partnership of the company's current external audit firm. Can she provide independent oversight of that auditor?",
    [
      "Yes, because she is no longer employed by the firm",
      "No — a recent professional and financial connection to the very auditor she would oversee destroys her independence",
      "Yes, provided she declares the former relationship",
      "Yes, because her audit experience makes her especially well qualified",
    ],
    1,
    "Independence is destroyed by a RECENT professional and financial connection to the party being overseen — and eight months from a partnership in the current audit firm is plainly recent. Her technical expertise is genuine, which is what makes the appointment tempting, but expertise does not substitute for independence. Declaring the relationship discloses the problem; it does not remove it."),

  q("BTK-11-08", "BT-11", "B", "medium", 2,
    "Which of the following is a genuine ARGUMENT AGAINST extensive corporate social responsibility spending?",
    [
      "CSR spending never produces any business benefit",
      "Directors are spending money belonging to shareholders on social value judgements they were not appointed to make",
      "CSR is prohibited by directors' duties",
      "Customers are indifferent to how a company behaves",
    ],
    1,
    "The serious objection is that directors spend OTHER PEOPLE'S MONEY, and that choices between competing social goods belong to government and to shareholders individually rather than to appointed managers. Options 1 and 4 are empirically weak, and option 3 is wrong — the duty to promote the company's success expressly requires regard to employees, community and environment. A good CSR answer states the real costs alongside the real benefits."),

  q("BTK-11-09", "BT-11", "B", "easy", 2,
    "What is 'stewardship' in a corporate governance context?",
    [
      "The duty of shareholders to monitor the directors they appoint",
      "The principle that directors manage assets belonging to others and must account for how they have used them",
      "The requirement that a company appoint an external auditor",
      "The board's responsibility for setting strategy",
    ],
    1,
    "STEWARDSHIP is the principle that directors hold and manage assets belonging to OTHERS and must ACCOUNT for their use of them — the idea that makes financial reporting a duty rather than a courtesy. Shareholder monitoring and the appointment of an auditor are mechanisms that support stewardship, and strategy is a board function, but none of the three is the definition."),

  q("BTK-11-10", "BT-11", "B", "hard", 2,
    "Integrated reporting explains how an organisation creates value using multiple 'capitals'. Which set is correct?",
    [
      "Ordinary shares, preference shares, debt and reserves",
      "Financial, manufactured, intellectual, human, social and relationship, and natural",
      "Fixed assets, current assets, inventory and cash",
      "Equity, debt, grants and retained earnings",
    ],
    1,
    "Integrated reporting uses six capitals: FINANCIAL, MANUFACTURED, INTELLECTUAL, HUMAN, SOCIAL AND RELATIONSHIP, and NATURAL. The three distractors all list forms of finance or classes of asset — which is exactly the misreading the framework exists to correct, since its whole point is that value creation depends on resources a balance sheet does not recognise."),
]

export const BT_KIT_AREA_B: AccaQuestion[] = [...CH08, ...CH09, ...CH10, ...CH11]
