import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi } from "@/lib/acca-bt-kit-builders"

/*
 * BT · Areas D, E and F question kit — chapters 18 to 26. Authored, applied,
 * exam-standard. See acca-questions-bt-kit-a.ts for the kit's rationale.
 *
 * Area D is model-dense, so many of these questions are built specifically to
 * separate ADJACENT models that candidates conflate — expectancy from
 * instrumentality, enlargement from enrichment, Blake and Mouton's coordinates.
 */

/* ── Chapter 18 · Leadership, management and supervision ───────── */

const CH18: AccaQuestion[] = [
  q("BTK-18-01", "BT-18", "D", "medium", 2,
    "A team member holds no formal authority but is widely respected and consistently persuades colleagues to adopt better methods. This is best described as:",
    ["Management, because they are directing others' work", "Leadership, because influence derives from personal credibility rather than position", "Supervision, because they oversee daily work", "Neither, since authority requires a formal position"],
    1,
    "LEADERSHIP is influencing others so that they willingly follow, and its authority derives from personal qualities and credibility rather than position. Management and supervision both draw authority from a FORMAL POSITION, which this person does not hold — which is precisely why the example demonstrates that leadership and management are separable."),

  q("BTK-18-02", "BT-18", "D", "hard", 2,
    "A manager removes all discretion from her team, checks every task personally and secures compliance through the threat of disciplinary action. Her team shows no initiative. What does McGregor's work suggest?",
    [
      "The team genuinely consists of Theory X workers, so her style is correctly matched",
      "She holds Theory X assumptions, and her style produces the passivity that appears to confirm them",
      "She holds Theory Y assumptions, since she is closely involved in the work",
      "Theory X and Y describe types of task rather than assumptions",
    ],
    1,
    "Theory X and Theory Y are sets of assumptions held by MANAGERS, not types of worker — and McGregor's central insight is that they are SELF-FULFILLING. A manager who assumes people avoid responsibility removes their discretion, so they never demonstrate initiative, which appears to prove the assumption correct. Describing staff as 'Theory X workers' inverts the whole argument."),

  q("BTK-18-03", "BT-18", "D", "medium", 2,
    "On Blake and Mouton's grid, a manager scoring 9,1 is characterised by:",
    [
      "High concern for people and low concern for production",
      "High concern for production and low concern for people",
      "Equal and moderate concern for both",
      "Low concern for both",
    ],
    1,
    "The convention is (concern for PRODUCTION, concern for PEOPLE), so 9,1 is HIGH PRODUCTION and LOW PEOPLE — output at any cost, with people treated as a resource. Reversing the coordinates is the single most common error on this model, and 1,9 describes the opposite manager: the 'country club' style where the atmosphere is pleasant and the work does not get done."),

  q("BTK-18-04", "BT-18", "D", "hard", 2,
    "A payment file has failed at 4pm and must be submitted before a 5pm banking cut-off. Which leadership style is appropriate, and what does this show?",
    [
      "Consultative 9,9 team management, because it is always the most effective style",
      "A directive style, showing that contingency theory is right that no single style suits every situation",
      "Delegating, because the team are competent professionals",
      "Country club, to keep morale high under pressure",
    ],
    1,
    "With a hard external deadline in an hour, someone must DIRECT, allocate and decide — consultation is the wrong tool. This is exactly the contingency argument against Blake and Mouton's claim that 9,9 is universally best: in a genuine emergency a directive approach is correct and a consultative one is dangerous. Return to a consultative style afterwards for the post-mortem — and do hold it, or the failure recurs."),

  q("BTK-18-05", "BT-18", "D", "medium", 2,
    "A finance manager delegates preparation of the management accounts to a senior assistant, who makes a material error that misleads the board. Where does accountability for the outcome rest?",
    ["With the assistant, as the task was delegated to them", "With the finance manager, because accountability cannot be delegated", "Jointly and equally", "With the board, as they relied on the information"],
    1,
    "AUTHORITY can be delegated; ACCOUNTABILITY cannot. The finance manager remains answerable to their own superior for the outcome, which is why proper delegation requires selecting a suitable person, briefing them clearly, granting real authority and agreeing checkpoints. The assistant carries RESPONSIBILITY for performing the task — a different thing from accountability for the outcome."),

  multi("BTK-18-06", "BT-18", "D", "medium", 2,
    "Which TWO are among Fayol's functions of management?",
    ["Coordinating", "Recruiting", "Controlling", "Negotiating"],
    [0, 2],
    "Fayol's five functions are planning, organising, commanding (directing), COORDINATING and CONTROLLING. Recruiting is an HR activity rather than one of Fayol's functions, and NEGOTIATOR is one of MINTZBERG's ten managerial roles — a different framework. Mixing the two models is a common error, so attach each term to its author."),

  q("BTK-18-07", "BT-18", "D", "hard", 2,
    "Adair's action-centred leadership model requires a leader to balance which three needs?",
    ["Strategy, structure and systems", "Task, team and individual", "Planning, organising and controlling", "Power, interest and influence"],
    1,
    "Adair's three overlapping circles are TASK, TEAM and INDIVIDUAL. They interact, which is the point of the overlap: neglect the task and the team loses purpose; neglect the team and the task fails through poor cooperation; neglect the individual and both suffer as motivation and capability erode. The other options belong to strategy models, Fayol, and Mendelow respectively."),

  q("BTK-18-08", "BT-18", "D", "medium", 2,
    "An experienced accountant who has performed the year-end reconciliation flawlessly for a decade is moved to an unfamiliar consolidation system. Under Hersey and Blanchard, which style now applies for that task?",
    ["Delegating, since she is highly experienced", "Telling, since readiness is task-specific and she is new to this task", "Participating, since her commitment is high", "The model does not apply to experienced staff"],
    1,
    "Readiness in Hersey and Blanchard is TASK-SPECIFIC, not a property of the person. An expert on one task is back at TELLING for an unfamiliar one, however senior. Applying the model to the individual rather than to the task is the classic misuse, and it produces the common management failure of leaving a capable person unsupported on something genuinely new to them."),

  q("BTK-18-09", "BT-18", "D", "easy", 1,
    "Which of Mintzberg's role categories includes the monitor, disseminator and spokesperson roles?",
    ["Interpersonal", "Informational", "Decisional", "Supervisory"],
    1,
    "MONITOR, DISSEMINATOR and SPOKESPERSON are the three INFORMATIONAL roles — scanning for information, passing it inward to the team and speaking for the unit outward. Interpersonal covers figurehead, leader and liaison; decisional covers entrepreneur, disturbance handler, resource allocator and negotiator. 'Supervisory' is not one of Mintzberg's categories."),

  q("BTK-18-10", "BT-18", "D", "hard", 2,
    "A manager delegates a project but does not tell the rest of the department that authority has been granted. What is the likely consequence?",
    [
      "None, provided the delegate understands their remit",
      "The delegate cannot exercise the authority, because colleagues will not recognise it and will escalate around them",
      "Accountability transfers fully to the delegate",
      "The delegation becomes legally invalid",
    ],
    1,
    "Delegated authority must be COMMUNICATED, or the delegate cannot use it: colleagues will not accept instructions they do not recognise as authorised, and will route around them to the manager — which destroys both the delegation and the delegate's credibility. Accountability never transfers, and delegation is an internal management act rather than a legal one."),
]

/* ── Chapter 19 · Recruitment and selection ────────────────────── */

const CH19: AccaQuestion[] = [
  q("BTK-19-01", "BT-19", "D", "easy", 2,
    "Which document sets out the knowledge, skills, qualifications and attributes required of a post-holder?",
    ["The job description", "The person specification", "The employment contract", "The job advertisement"],
    1,
    "The PERSON SPECIFICATION describes the PERSON — knowledge, skills, qualifications, experience and attributes, usually split into essential and desirable. The JOB DESCRIPTION describes the JOB: title, reporting line, purpose, duties and conditions. The distinction matters because the person specification is what makes shortlisting and interviewing objective and defensible."),

  q("BTK-19-02", "BT-19", "D", "hard", 2,
    "A selection test gives the same candidate an identical score when repeated, and when marked by two different assessors, but the scores bear no relationship to later job performance. How should the test be described?",
    ["Both reliable and valid", "Reliable but not valid", "Valid but not reliable", "Neither reliable nor valid"],
    1,
    "RELIABILITY is consistency — the same result on repetition and between assessors — and this test has it. VALIDITY is whether the method PREDICTS JOB PERFORMANCE, and it has none. A method can be perfectly reliable and predict nothing: measuring a candidate's height is the standard illustration. Validity is what you actually want; reliability is only a precondition for it."),

  q("BTK-19-03", "BT-19", "D", "medium", 2,
    "A job advertisement seeks 'a young, dynamic self-starter'. What is the primary problem?",
    [
      "It is unmeasurable but lawful",
      "'Young' is direct age discrimination, and discrimination law applies at recruitment before any contract exists",
      "It should have specified a salary range",
      "It should have been placed internally first",
    ],
    1,
    "'Young' is DIRECT AGE DISCRIMINATION and unlawful, and the crucial point is that discrimination law bites AT RECRUITMENT — in advertisements, shortlisting criteria and interview questions — long before any contract exists. 'Dynamic self-starter' is separately unmeasurable, which is a quality problem rather than a legal one. Assuming discrimination law only applies to employees is a common and serious error."),

  q("BTK-19-04", "BT-19", "D", "medium", 2,
    "Three interviewers, all graduates of the same university, independently rate the candidate from that university as 'a good cultural fit who would settle in quickly'. Which bias is most likely operating?",
    ["Halo effect", "Similar-to-me bias", "Recency effect", "Contrast effect"],
    1,
    "SIMILAR-TO-ME BIAS is favouring candidates who resemble the interviewer in background, education or interests — and it is the most damaging for diversity precisely because it feels like genuine rapport from the inside. None of the three mentioned the university, and each formed a sincere impression. It is defeated not by wanting to be fair but by structured scoring against predefined, job-related criteria."),

  q("BTK-19-05", "BT-19", "D", "hard", 2,
    "Which selection method offers the highest predictive validity, and why is it not used for every vacancy?",
    [
      "The unstructured interview, because it builds rapport; it is not always used because it takes time",
      "The assessment centre, because it uses multiple exercises and multiple assessors over time; it is expensive and time-consuming",
      "References, because they come from people who know the candidate; they are slow to obtain",
      "Personality questionnaires, because they are objective; candidates dislike them",
    ],
    1,
    "The ASSESSMENT CENTRE gives the highest available validity because it combines MULTIPLE EXERCISES and MULTIPLE ASSESSORS over an extended period, which averages out individual bias and samples behaviour rather than claims. It is reserved for senior or graduate intakes because it is expensive and time-consuming. Unstructured interviews are among the WEAKEST predictors, and personality questionnaires have weak validity alone."),

  multi("BTK-19-06", "BT-19", "D", "medium", 2,
    "Which TWO are advantages of INTERNAL recruitment?",
    [
      "It brings fresh perspective and competitor knowledge",
      "The candidate's actual performance is known rather than claimed",
      "A visible promotion path motivates the wider workforce",
      "It avoids creating a further vacancy elsewhere",
    ],
    [1, 2],
    "With internal recruitment the candidate's PERFORMANCE IS KNOWN rather than inferred from a selection process, and a visible PROMOTION PATH motivates everyone. Fresh perspective and competitor knowledge are advantages of EXTERNAL recruitment, and internal appointment CREATES a further vacancy further down — a genuine disadvantage rather than a benefit."),

  q("BTK-19-07", "BT-19", "D", "medium", 2,
    "Recording a selection decision as 'best cultural fit' with no scored criteria is problematic because:",
    [
      "Cultural fit is never a legitimate consideration",
      "It cannot be evidenced or defended if challenged, and the phrase most often encodes similar-to-me bias",
      "It must be approved by HR before it can be used",
      "Cultural fit can only be assessed by an assessment centre",
    ],
    1,
    "The problem is EVIDENCE: without scored criteria the decision cannot be justified to an unsuccessful candidate or a tribunal, and 'cultural fit' is the phrase most likely to encode SIMILAR-TO-ME BIAS. Fit with the organisation's values can be a legitimate requirement — but only if it is defined in observable, job-related terms and assessed consistently against the person specification."),

  q("BTK-19-08", "BT-19", "D", "easy", 2,
    "What is the purpose of induction?",
    [
      "To satisfy a legal requirement to issue a written contract",
      "To make a new employee productive sooner and to reduce early leaving",
      "To assess whether the correct candidate was appointed",
      "To identify training needs for the following year",
    ],
    1,
    "Induction exists to make a new employee PRODUCTIVE SOONER and to reduce EARLY LEAVING, which is when turnover is most expensive. It covers terms and administration, health and safety (a genuine legal requirement in itself), the organisation, the job, the people, and follow-up checkpoints — not a single day-one briefing. It is not a re-assessment of the selection decision."),

  q("BTK-19-09", "BT-19", "D", "hard", 2,
    "In recruitment and selection, what is the correct division of responsibility between HR and the line manager?",
    [
      "HR runs the entire process and makes the appointment",
      "HR advises, ensures compliance and manages logistics; the line manager defines the requirement, assesses technical competence, decides and remains accountable",
      "The line manager runs the entire process without HR involvement",
      "Both share the decision equally, with a casting vote for HR",
    ],
    1,
    "HR ADVISES and ENABLES — process, law, consistency, documentation and logistics — while the LINE MANAGER defines what the role must deliver, contributes the technical content of the person specification, assesses technical competence, normally decides, and remains ACCOUNTABLE for the appointee's performance. This is Chapter 18's accountability rule applied to hiring: HR owns the framework, the manager owns the outcome."),

  q("BTK-19-10", "BT-19", "D", "medium", 2,
    "What is the difference between recruitment and selection?",
    [
      "They are alternative names for the same process",
      "Recruitment attracts a suitable pool of applicants; selection chooses the best candidate from it",
      "Recruitment applies to internal candidates and selection to external ones",
      "Recruitment is HR's responsibility and selection is the law's",
    ],
    1,
    "RECRUITMENT attracts a suitable pool — generating choice. SELECTION chooses the best candidate from that pool — exercising it. Both apply to internal and external candidates alike, and both are managed jointly by HR and the line manager. Treating the two as one process is what leads organisations to advertise badly and then wonder why the shortlist is weak."),
]

/* ── Chapter 20 · Individual, group and team behaviour ─────────── */

const CH20: AccaQuestion[] = [
  q("BTK-20-01", "BT-20", "D", "medium", 2,
    "Six employees report to the same manager, share an office, and each independently processes their own portfolio of client accounts. What are they?",
    ["A team, because they share a manager and location", "A group, because they interact but work independently with individual accountability", "A team, because they all work on client accounts", "Neither a group nor a team"],
    1,
    "They are a GROUP: mutually aware and interacting, but with INDEPENDENT work and INDIVIDUAL accountability. A team additionally needs a common purpose, interdependent work, complementary skills and SHARED accountability for a collective result. Sharing a manager, a location or a subject does not make a group a team, and calling one a team does not make it one."),

  q("BTK-20-02", "BT-20", "D", "hard", 2,
    "A newly formed project team is experiencing open conflict about objectives and who leads which workstream. What should the manager do?",
    [
      "Intervene to restore harmony quickly, as conflict indicates the team is failing",
      "Surface and mediate the conflict while holding the team to its purpose, as storming is a normal and necessary stage",
      "Replace the most vocal members to remove the friction",
      "Wait for the performing stage, which follows automatically",
    ],
    1,
    "STORMING is a normal and NECESSARY stage in Tuckman's model. Suppressing it converts open disagreement into suppressed disagreement, which resurfaces later as passive resistance or groupthink — so the manager should surface it, mediate, and hold the group to its purpose. Replacing members restarts the cycle at forming, and no stage follows automatically without management."),

  q("BTK-20-03", "BT-20", "D", "hard", 2,
    "A project team is staffed with the four most creative people in the company. After six months the idea list is long and nothing has been delivered. Which Belbin roles are most obviously missing?",
    [
      "Plant and monitor-evaluator",
      "Implementer and completer-finisher",
      "Specialist and teamworker",
      "None — the team simply needs more time",
    ],
    1,
    "The team is all PLANT — creative idea generators — and lacks an IMPLEMENTER to turn ideas into practical action and a COMPLETER-FINISHER to drive them to done and catch errors. A coordinator to hold the team to a decision would help too. This is Belbin's central finding: effective teams need a BALANCE of behavioural roles, not a collection of the most able individuals."),

  q("BTK-20-04", "BT-20", "D", "medium", 2,
    "A highly cohesive team defends its own established methods and pressures a new member who tries to follow the procedures management has introduced. What is happening?",
    ["Social loafing", "Storming", "Cohesion working against organisational goals, enforced through group norms", "Role ambiguity"],
    2,
    "Cohesion AMPLIFIES whatever direction a group already faces: aligned with organisational goals it produces the best performance, and aligned against them it produces the most effective resistance — including enforcing norms on members who try to comply with management. This is why 'build cohesion' is an incomplete recommendation. Social loafing is reduced individual effort; storming is open conflict in a new group."),

  q("BTK-20-05", "BT-20", "D", "medium", 2,
    "Individuals in a group contribute less effort than they would working alone, because individual contribution is not visible. What is this called, and how is it reduced?",
    [
      "Groupthink; reduced by appointing a devil's advocate",
      "Social loafing; reduced by making individual contributions identifiable and measurable",
      "Role conflict; reduced by clarifying reporting lines",
      "Cohesion; reduced by rotating membership",
    ],
    1,
    "SOCIAL LOAFING is reduced individual effort arising from invisible contribution and diffused responsibility — a STRUCTURAL effect rather than laziness, which is why the remedy is making contributions IDENTIFIABLE rather than exhorting people to try harder. Groupthink is the suppression of doubt to preserve harmony, a different failure with a different remedy."),

  multi("BTK-20-06", "BT-20", "D", "medium", 2,
    "Which TWO of Tuckman's stages are correctly described?",
    [
      "Forming — members are polite and guarded and look to the leader for direction",
      "Norming — open conflict emerges over objectives and roles",
      "Performing — the group works effectively and adapts as it goes",
      "Storming — norms and roles settle and cohesion builds",
    ],
    [0, 2],
    "FORMING is polite, guarded and leader-dependent with little output; PERFORMING is effective, adaptive work. Options 2 and 4 SWAP storming and norming: storming is where open conflict over objectives and roles emerges, and norming is where norms settle and cohesion builds. Getting the order right matters because the manager's action differs at each stage."),

  q("BTK-20-07", "BT-20", "D", "hard", 2,
    "An employee in a matrix structure is told by their functional head to prioritise a technical review and by their project manager to prioritise a client deadline, on the same day. What is this, and whose failure is it?",
    [
      "Role ambiguity, and the employee's failure to plan",
      "Role conflict, and a management failure arising from the structure's dual authority",
      "Social loafing, and the team's failure",
      "Groupthink, and the organisation's failure",
    ],
    1,
    "Incompatible expectations from different sources is ROLE CONFLICT — as distinct from role AMBIGUITY, where the expectations are unclear rather than contradictory. It is a MANAGEMENT failure arising from the matrix's dual authority, not an individual one, and the remedy is explicit rules on which authority prevails on which decisions plus an escalation route that is actually used."),

  q("BTK-20-08", "BT-20", "D", "easy", 2,
    "Which Belbin role is characterised by exploring opportunities and developing contacts outside the team?",
    ["Resource investigator", "Coordinator", "Shaper", "Monitor-evaluator"],
    0,
    "The RESOURCE INVESTIGATOR explores opportunities and develops external contacts, with the allowable weakness of over-optimism and losing interest once initial enthusiasm passes. The COORDINATOR chairs and draws out contributions; the SHAPER drives the team forward under pressure; the MONITOR-EVALUATOR judges options soberly. A team with no resource investigator tends to stop talking to anyone outside itself."),

  q("BTK-20-09", "BT-20", "D", "medium", 2,
    "Which of the following is a QUALITATIVE indicator of team effectiveness?",
    ["Output against target", "Defect and rework rates", "Members' willingness to disagree openly and handle conflict constructively", "Adherence to budget"],
    2,
    "WILLINGNESS TO DISAGREE OPENLY and constructive conflict handling are qualitative indicators, alongside commitment to objectives, mutual trust and clear accepted roles. Output, defect rates and budget adherence are all QUANTITATIVE measures. The examiner expects both types, because a team hitting its numbers while nobody dares raise a problem is not a healthy team."),

  q("BTK-20-10", "BT-20", "D", "hard", 2,
    "Two employees receive identical performance feedback. One treats it as investment in their development; the other treats it as the start of a case against them. What best explains the divergence?",
    [
      "One of them misheard the feedback",
      "Behaviour follows PERCEPTION — each interpreted the same message through their own assumptions and state of mind",
      "The feedback was factually different in each case",
      "Personality has no bearing on how feedback is received",
    ],
    1,
    "Behaviour follows PERCEPTION, not facts: the same situation is read differently by different people, and the reading drives what they do next. This is why the receiver's interpretation is part of communication rather than an optional extra, and why a manager delivering identical words to two people is often baffled by the divergent responses."),
]

/* ── Chapter 21 · Motivating individuals and groups ────────────── */

const CH21: AccaQuestion[] = [
  q("BTK-21-01", "BT-21", "D", "medium", 2,
    "According to Herzberg, improving pay and working conditions in a repetitive, low-responsibility job will:",
    ["Create strong and lasting motivation", "Remove dissatisfaction but not create motivation", "Have no effect on satisfaction or dissatisfaction", "Reduce satisfaction, as expectations rise"],
    1,
    "Pay and working conditions are HYGIENE FACTORS concerned with the job's CONTEXT. Getting them right REMOVES DISSATISFACTION but cannot create motivation, which comes only from motivators in the job's CONTENT — achievement, recognition, the work itself, responsibility, advancement and growth. This is why Herzberg's practical conclusion is job enrichment rather than higher pay."),

  q("BTK-21-02", "BT-21", "D", "hard", 2,
    "A salesperson says of a new bonus scheme: 'They promised a bonus last year and then changed the rules.' Which term in Vroom's expectancy model has failed?",
    ["Expectancy", "Instrumentality", "Valence", "Equity"],
    1,
    "INSTRUMENTALITY is the belief that PERFORMANCE will produce the REWARD, and a broken promise destroys exactly that. EXPECTANCY is the belief that EFFORT will produce the performance ('the target is impossible'), and VALENCE is whether the reward is wanted at all ('I do not need more money'). Because the three terms MULTIPLY, any one at zero gives zero motivation — and this one is hardest to repair, because trust was destroyed by the organisation's own conduct."),

  q("BTK-21-03", "BT-21", "D", "medium", 2,
    "A data-entry clerk is given responsibility for investigating and resolving the exceptions their own work generates, with authority to correct them up to a set value. This is:",
    ["Job rotation", "Job enlargement", "Job enrichment", "Job evaluation"],
    2,
    "Adding RESPONSIBILITY, AUTONOMY and DECISION AUTHORITY is VERTICAL expansion — JOB ENRICHMENT — and it is the only one of the three that reaches Herzberg's motivators. Job ENLARGEMENT adds more tasks at the SAME level (horizontal); job ROTATION moves between different same-level tasks; and job EVALUATION is an unrelated process for ranking jobs to set pay grades."),

  q("BTK-21-04", "BT-21", "D", "hard", 2,
    "An employee's pay, conditions, supervision and job security are all satisfactory. She does three repetitive tasks daily, receives no recognition, has learned nothing in two years, and is job-hunting. Would a pay rise retain her?",
    [
      "Yes — pay is the primary motivator for most employees",
      "Probably not: pay is a hygiene factor already satisfactory, and Maslow adds that a satisfied need has stopped motivating",
      "Yes, provided the rise exceeds 10%",
      "It cannot be predicted from the information given",
    ],
    1,
    "Pay is a HYGIENE FACTOR and hers is already satisfactory, so more of it has nothing left to fix — Herzberg predicts it would remove no dissatisfaction and create no motivation. Maslow reaches the same conclusion by another route: a substantially satisfied need ceases to motivate. What is absent is every MOTIVATOR — achievement, recognition, responsibility, growth — so she would likely take the rise and leave anyway."),

  q("BTK-21-05", "BT-21", "D", "medium", 2,
    "Which of the following correctly classifies the motivation theories?",
    [
      "Maslow and Vroom are content theories; Herzberg is a process theory",
      "Maslow, Herzberg and McClelland are content theories; Vroom and equity theory are process theories",
      "All five are process theories",
      "Content theories explain how motivation arises; process theories explain what motivates",
    ],
    1,
    "CONTENT theories ask WHAT motivates — which needs drive behaviour: Maslow, Herzberg and McClelland. PROCESS theories ask HOW motivation arises — the mental process of choosing effort: Vroom's expectancy theory and equity theory. Option 4 reverses the definitions. Being able to state which type a named theory is can be worth a mark on its own."),

  multi("BTK-21-06", "BT-21", "D", "medium", 2,
    "Which TWO are HYGIENE factors in Herzberg's model?",
    ["Achievement", "Company policy and administration", "Quality of supervision", "Responsibility"],
    [1, 2],
    "COMPANY POLICY and QUALITY OF SUPERVISION concern the job's CONTEXT, making them hygiene factors — their adequacy removes dissatisfaction without creating motivation. ACHIEVEMENT and RESPONSIBILITY concern the job's CONTENT and are MOTIVATORS. The two sets are separate dimensions rather than opposite ends of one scale, which is Herzberg's central and most examined claim."),

  q("BTK-21-07", "BT-21", "D", "hard", 2,
    "A high-performing employee learns that a colleague doing similar work is paid materially more. Equity theory predicts she will:",
    [
      "Increase her effort to justify a similar increase",
      "Act to reduce the perceived inequity — by lowering effort, seeking more reward, changing her comparator, or leaving",
      "Ignore it, since pay comparisons are irrational",
      "Report the colleague to HR",
    ],
    1,
    "Equity theory says people compare their own INPUT-TO-REWARD ratio with comparable others and act to REDUCE perceived inequity — by lowering effort, pressing for more reward, changing who they compare themselves to, or leaving. Note it turns on PERCEIVED ratios, which is why pay secrecy makes matters worse (people compare against assumptions, usually unfavourable ones) and why the reference group matters more than the absolute amount."),

  q("BTK-21-08", "BT-21", "D", "hard", 2,
    "Which is a genuine criticism of performance-related pay?",
    [
      "It cannot be administered in a large organisation",
      "It rewards what is measured at the expense of what is not, can crowd out intrinsic motivation, and cliff-edge targets create fraud pressure",
      "It is prohibited by employment law in most jurisdictions",
      "It has no effect on behaviour whatsoever",
    ],
    1,
    "The substantive criticisms are that it drives behaviour toward the MEASURED objective at the expense of unmeasured ones (volume over quality), can CROWD OUT intrinsic motivation by paying for something previously done for its own sake, damages cooperation, and — with cliff-edge targets — supplies two of the three fraud triangle conditions. Option 4 is the opposite of the problem: it changes behaviour very effectively, just not always in the intended direction."),

  q("BTK-21-09", "BT-21", "D", "medium", 2,
    "McClelland identified three learned needs driving behaviour. What are they?",
    ["Security, esteem and self-actualisation", "Achievement, affiliation and power", "Hygiene, motivation and growth", "Expectancy, instrumentality and valence"],
    1,
    "McClelland's three needs are ACHIEVEMENT (nAch), AFFILIATION (nAff) and POWER (nPow), present in differing strengths in different individuals — which is exactly why one incentive cannot fit everyone. Option 1 lists Maslow's upper levels, option 3 mixes Herzberg's terms, and option 4 is Vroom's expectancy model."),

  q("BTK-21-10", "BT-21", "D", "easy", 2,
    "What distinguishes intrinsic from extrinsic motivation?",
    [
      "Intrinsic comes from the work itself; extrinsic comes from rewards outside the work",
      "Intrinsic applies to managers; extrinsic to junior staff",
      "Intrinsic is financial; extrinsic is non-financial",
      "They are alternative names for content and process theories",
    ],
    0,
    "INTRINSIC motivation arises from the WORK ITSELF — interest, mastery, achievement, meaning. EXTRINSIC motivation comes from OUTSIDE the work — pay, bonus, promotion, praise, avoidance of penalty. Option 3 inverts it: extrinsic rewards are typically the financial ones. Herzberg's motivators are largely intrinsic and his hygiene factors largely extrinsic, which is why the two frameworks connect."),
]

/* ── Chapter 22 · Learning, training and appraisal ─────────────── */

const CH22: AccaQuestion[] = [
  q("BTK-22-01", "BT-22", "D", "medium", 2,
    "A training evaluation measures whether error rates and processing times improved after a course. Which level of evaluation is this?",
    ["Reaction", "Learning", "Behaviour", "Results"],
    3,
    "Measuring whether ORGANISATIONAL PERFORMANCE improved is evaluation at the RESULTS level — the hardest to measure and the most valuable. Reaction asks whether participants liked it, learning whether they acquired the knowledge, and behaviour whether their conduct at work changed. Most organisations stop at reaction, which is exactly why ineffective training survives."),

  q("BTK-22-02", "BT-22", "D", "hard", 2,
    "Forty staff attend a one-day lecture on a new system three months before go-live. Feedback averages 4.2 out of 5. After go-live, error rates are high and staff cannot remember what they were shown. What went wrong?",
    [
      "The feedback scores were too low to indicate success",
      "The course delivered only one stage of Kolb's cycle, was too far from application, and was evaluated only at reaction level",
      "The staff were insufficiently motivated to learn",
      "One day is always too short for any training",
    ],
    1,
    "Three failures compound: a lecture delivers only ABSTRACT CONCEPTUALISATION, with no concrete experience, experimentation or reflection, so it serves theorists and reflectors and leaves nobody with a practised skill; three months before use guarantees decay; and the 4.2 measured REACTION, which tells you people enjoyed a day out of the office and nothing about learning, behaviour or results."),

  q("BTK-22-03", "BT-22", "D", "medium", 2,
    "What is the difference between training and development?",
    [
      "They are alternative terms for the same activity",
      "Training builds skills for a specific current job in the short term; development grows the person's capability and potential for the future",
      "Training applies to junior staff and development to managers",
      "Training is provided internally and development externally",
    ],
    1,
    "TRAINING is the planned acquisition of skills and knowledge for a SPECIFIC CURRENT JOB, short-term and role-focused. DEVELOPMENT grows a person's capability and POTENTIAL beyond the current role, over the longer term. Teaching someone the new expenses system is training; preparing them to run a department in three years is development. Both apply at every level, internally or externally delivered."),

  q("BTK-22-04", "BT-22", "D", "hard", 2,
    "An organisation finds 94% of employees are rated 'meets expectations' every year, including several whose performance managers privately describe as poor. What is the primary problem?",
    ["Recency bias", "Central tendency, with appraisers avoiding both high and low ratings", "Halo effect", "The rating scale has too many points"],
    1,
    "This is CENTRAL TENDENCY — appraisers clustering everyone in the middle to avoid the difficult conversations that high or low ratings require. It destroys the scheme in both directions: strong performance goes unrecognised and weak performance is never addressed, leaving the employer without evidence if dismissal later becomes necessary. The fixes are requiring evidence for each rating and calibrating ratings across managers."),

  q("BTK-22-05", "BT-22", "D", "medium", 2,
    "Why is 360-degree appraisal often ineffective in a high power distance culture?",
    [
      "Because it requires software that may be unavailable",
      "Because criticising a superior is socially unacceptable, so upward feedback arrives uniformly positive and uninformative",
      "Because it is prohibited by employment law",
      "Because peers are not qualified to assess performance",
    ],
    1,
    "In a HIGH POWER DISTANCE culture hierarchy is broadly accepted and criticising a superior is socially unacceptable, so the upward feedback returns uniformly positive and the exercise costs money to learn nothing. 360-degree appraisal needs genuine anonymity, a culture where upward criticism is safe, and training in giving useful feedback — it is not automatically superior to manager appraisal."),

  multi("BTK-22-06", "BT-22", "D", "medium", 2,
    "Which TWO are stages of Kolb's learning cycle?",
    ["Reflective observation", "Reaction measurement", "Active experimentation", "Central tendency"],
    [0, 2],
    "Kolb's four stages are concrete experience, REFLECTIVE OBSERVATION, abstract conceptualisation and ACTIVE EXPERIMENTATION — all four needed for durable learning. Reaction measurement is a level of training EVALUATION, and central tendency is an APPRAISAL error. Mixing terms across the three frameworks is a common way to lose marks in this chapter."),

  q("BTK-22-07", "BT-22", "D", "medium", 2,
    "A trainee who learns best from models, frameworks and understanding the underlying logic is, in Honey and Mumford's terms, a:",
    ["Activist", "Reflector", "Theorist", "Pragmatist"],
    2,
    "A THEORIST prefers ABSTRACT CONCEPTUALISATION — models, frameworks and the underlying logic. An ACTIVIST learns by doing, a REFLECTOR by watching and thinking first, and a PRAGMATIST by practical application they can use immediately. A course delivered entirely as lecture serves theorists and reflectors and loses the other two, which is why good design touches all four stages."),

  q("BTK-22-08", "BT-22", "D", "hard", 2,
    "Why is linking appraisal tightly to pay decisions problematic?",
    [
      "Because pay decisions must legally be taken separately",
      "Because an employee being assessed for pay will not discuss their weaknesses honestly, which defeats the development purpose",
      "Because appraisal has no bearing on performance",
      "Because managers are not permitted to discuss pay",
    ],
    1,
    "Reward and DEVELOPMENT conflict as purposes: an employee whose pay depends on the outcome has every incentive to conceal weaknesses, which is exactly what the development conversation needs surfaced. The standard fix is to hold the two conversations SEPARATELY. Appraisal serves both purposes legitimately — the point is that it cannot serve both well in the same meeting."),

  q("BTK-22-09", "BT-22", "D", "easy", 2,
    "What is a training needs analysis?",
    [
      "A survey of what training employees would enjoy",
      "Identifying the gap between the skills and knowledge a role requires and those the post-holder has",
      "A budget for the year's training expenditure",
      "An evaluation of training already delivered",
    ],
    1,
    "A TRAINING NEEDS ANALYSIS identifies the GAP between what the role requires and what the post-holder currently has — the gap is the need. Anything else is training the organisation has decided it likes rather than training it requires. Employee requests are a legitimate INPUT (and matter for motivation), but they are not the analysis itself."),

  q("BTK-22-10", "BT-22", "D", "hard", 2,
    "An employee is dismissed for poor performance after five consecutive years of 'meets expectations' appraisals. What does this indicate?",
    [
      "The dismissal is automatically fair, as performance is a fair reason",
      "The appraisal scheme has failed, and the employer now lacks evidence to support the dismissal",
      "The appraisals should be amended retrospectively",
      "Appraisal records are irrelevant to a dismissal decision",
    ],
    1,
    "Five years of satisfactory appraisals followed by dismissal for poor performance shows a FAILED SCHEME: the appraiser would not deliver an unwelcome message, so the employee never learned there was a problem while there was time to act. It is also a serious evidential difficulty at a tribunal, since the documentary record contradicts the stated reason. Amending records retrospectively would compound the problem substantially."),
]

/* ── Chapter 23 · Personal effectiveness and conflict ──────────── */

const CH23: AccaQuestion[] = [
  q("BTK-23-01", "BT-23", "E", "medium", 2,
    "A manager spends almost all her time on urgent tasks of low importance and none on important tasks that are not yet urgent. What is the most likely consequence?",
    [
      "She will be highly effective, as urgent work is always the priority",
      "Important work will be neglected until it becomes an urgent crisis, which keeps the urgent box refilling",
      "Her workload will steadily fall as urgent items clear",
      "There is no consequence, since all work is eventually done",
    ],
    1,
    "Urgency concerns TIMING; importance concerns CONSEQUENCE. Neglecting important-but-not-yet-urgent work — planning, training, preparation, fixing broken processes — means it is only addressed once it has become a crisis, which generates the next round of urgent work. The urgent box keeps refilling precisely because the important box is ignored."),

  q("BTK-23-02", "BT-23", "E", "hard", 2,
    "A finance team spends two days every month clearing unexplained reconciliation differences. Investigating the cause would take three days once, but nobody has time. What does this illustrate?",
    [
      "Efficient prioritisation of urgent work",
      "The cost of neglecting important-but-not-urgent work: 24 days a year spent avoiding a three-day job",
      "A genuine resource shortage requiring more staff",
      "The law of diminishing returns",
    ],
    1,
    "Clearing the differences is URGENT; fixing the cause is IMPORTANT and never urgent, so it never happens. The team spends 24 days a year avoiding a three-day job — a very common pattern in real finance functions. It is not a resource shortage: the resource exists but is committed to the symptom, and the fix would release it permanently."),

  q("BTK-23-03", "BT-23", "E", "medium", 2,
    "How do coaching, mentoring and counselling differ?",
    [
      "They are three names for the same relationship",
      "Coaching is short-term and skill-specific; mentoring is long-term career guidance, usually outside the reporting line; counselling addresses a personal difficulty affecting work",
      "Coaching is for managers, mentoring for graduates, counselling for poor performers",
      "All three should be provided by the line manager",
    ],
    1,
    "COACHING is short-term, fairly directive help with a specific skill, usually from a manager or skilled practitioner. MENTORING is long-term, non-directive career guidance from someone OUTSIDE the reporting line — because a mentee must be able to discuss doubts and ambitions freely, which is impossible with someone who controls their pay. COUNSELLING addresses a personal or emotional difficulty, usually confidentially and professionally."),

  q("BTK-23-04", "BT-23", "E", "hard", 2,
    "Sales staff earn commission on invoiced revenue with no clawback for bad debts. The sales director has twice overridden the credit controller's refusals, and two of those customers have defaulted. What is the real source of the conflict?",
    [
      "A personality clash between the two individuals",
      "Incompatible objectives created by the reward system, which makes pushing through any order individually rational",
      "The credit controller's excessive caution",
      "Inadequate credit reference data",
    ],
    1,
    "The conflict is STRUCTURAL: commission on invoiced revenue with no clawback means sales staff capture the upside and bear none of the downside, so both parties are behaving rationally given their incentives. Diagnosing it as a personality clash is convenient — it avoids revisiting a scheme management approved — but replacing either person reproduces the conflict within a quarter. Fix the incentive, and remove the override from the person with an interest in the sale."),

  q("BTK-23-05", "BT-23", "E", "medium", 2,
    "A neutral third party is appointed to help two departments reach their own agreement on a disputed budget, with no power to impose an outcome. This is:",
    ["Arbitration", "Mediation", "Forcing", "Accommodation"],
    1,
    "MEDIATION is where a neutral third party helps the parties reach THEIR OWN agreement and cannot impose one. In ARBITRATION the third party DECIDES and the parties agreed in advance to accept it. The distinction is simply who makes the final decision, and it is a favourite one-mark question."),

  multi("BTK-23-06", "BT-23", "E", "medium", 2,
    "Which TWO are legitimate sources of workplace conflict that a manager should look for BEFORE concluding there is a personality clash?",
    ["Competition for scarce resources such as budget or staff", "Astrological incompatibility", "Incompatible objectives between functions", "The number of years each party has been employed"],
    [0, 2],
    "COMPETITION FOR SCARCE RESOURCES and INCOMPATIBLE OBJECTIVES are structural causes, alongside interdependence of work, role conflict and ambiguity, differences in values or culture, poor communication and change. Length of service is not itself a cause. The examinable point is that if the incentives or objectives make the conflict rational, replacing the people changes nothing."),

  q("BTK-23-07", "BT-23", "E", "medium", 2,
    "When is a FORCING approach to conflict appropriate?",
    [
      "Whenever a manager holds sufficient authority",
      "In a genuine emergency, or where law, safety or ethics leaves nothing to negotiate",
      "Whenever collaboration would take more than a day",
      "Never — it always damages relationships",
    ],
    1,
    "FORCING — imposing an outcome using authority — is appropriate in a genuine EMERGENCY or where LAW, SAFETY OR ETHICS admits no negotiation. It is not justified merely by holding authority or by collaboration being slower. Nor is it never appropriate: a safety breach is not a matter for compromise, and treating it as one would itself be a management failure."),

  q("BTK-23-08", "BT-23", "E", "hard", 2,
    "A previously reliable employee has become withdrawn and is missing deadlines. What should the manager do first?",
    [
      "Send them on a time-management course",
      "Diagnose the cause before prescribing a remedy — it may be workload, role ambiguity, poor systems or a personal difficulty",
      "Begin formal performance management immediately",
      "Reduce their responsibilities permanently",
    ],
    1,
    "Ineffectiveness looks identical whether it arises from poor time management, inadequate training, an impossible workload, role ambiguity, weak systems or a personal difficulty — so DIAGNOSE FIRST. Prescribing a time-management course to someone whose workload is genuinely impossible is a management failure dressed as a development intervention, and formal performance management before understanding the cause risks both injustice and a defective process."),

  q("BTK-23-09", "BT-23", "E", "easy", 2,
    "What is a competence framework used for?",
    [
      "Setting the organisation's annual training budget",
      "Providing one shared standard of required knowledge, skills and behaviours across recruitment, appraisal, training, promotion and pay",
      "Recording each employee's holiday entitlement",
      "Determining redundancy selection only",
    ],
    1,
    "A COMPETENCE FRAMEWORK defines the knowledge, skills and behaviours required at each role or level in OBSERVABLE terms, giving ONE shared standard used for recruitment (as the person specification), appraisal, training needs, career and succession planning, and pay grading. Its central value is CONSISTENCY, which is what makes decisions comparable and defensible."),

  q("BTK-23-10", "BT-23", "E", "hard", 2,
    "Why should a mentor normally sit outside the mentee's reporting line?",
    [
      "Because line managers lack the necessary seniority",
      "Because the mentee must be able to discuss doubts, mistakes and ambitions freely, which is impossible with someone who assesses their performance and controls their pay",
      "Because organisational policy usually forbids it",
      "Because mentoring is a formal HR function rather than a management one",
    ],
    1,
    "A mentor's value depends on FREE discussion of doubts, mistakes, ambitions and dissatisfactions — and a line manager assesses performance and controls pay, so the same conversation carries risk and the mentee edits it. Mentoring outside the reporting line is a DESIGN FEATURE, not an administrative accident. Seniority is not the issue; the conflict of role is."),
]

/* ── Chapter 24 · Communicating in business ────────────────────── */

const CH24: AccaQuestion[] = [
  q("BTK-24-01", "BT-24", "E", "hard", 2,
    "Which failure of communication direction poses the greatest risk to governance and internal control?",
    ["Downward, because instructions may be misunderstood", "Upward, because bad news is softened or withheld before reaching decision-makers", "Horizontal, because departments fail to coordinate", "Diagonal, because it bypasses the scalar chain"],
    1,
    "UPWARD failure is the dangerous one. Downward distortion causes confusion and horizontal failure causes inefficiency — but if bad news cannot travel upward, senior management and the board never learn that a control failed, a project is late or the numbers were manipulated until it is too late to act. Every governance and control mechanism depends on adverse information arriving intact."),

  q("BTK-24-02", "BT-24", "E", "medium", 2,
    "A company must tell thirty staff that their department will close in four months with likely redundancies. What is the appropriate medium, and what criterion drives the choice?",
    [
      "Email, because it creates a clear record",
      "A face-to-face meeting followed by written confirmation and individual meetings, because sensitivity outranks record-keeping",
      "An intranet notice, so everyone receives identical wording",
      "Instant message, because speed prevents rumour",
    ],
    1,
    "SENSITIVITY drives this choice, and it outranks record-keeping: news materially affecting livelihoods must be delivered face-to-face. Written confirmation follows because consultation obligations apply and people cannot retain detail delivered in a distressing meeting, and individual meetings follow because a collective message cannot address each person's position. Email or a notice here would also guarantee the grapevine reaches everyone first, in a worse form."),

  q("BTK-24-03", "BT-24", "E", "medium", 2,
    "Why can the informal 'grapevine' not simply be prohibited?",
    [
      "Because employment law protects informal communication",
      "Because it follows social relationships and fills the vacuum left by slow, absent or evasive formal communication",
      "Because it is always more accurate than formal channels",
      "Because managers rely on it for formal decisions",
    ],
    1,
    "The grapevine forms wherever people have relationships, and rumour flourishes where formal communication is SLOW, ABSENT OR EVASIVE — people fill a vacuum with the worst plausible explanation. It is STARVED by communicating early, fully and honestly, not prohibited. It is faster than formal channels but distorts as it passes on, so option 3 overstates its accuracy."),

  q("BTK-24-04", "BT-24", "E", "hard", 2,
    "A team leader reports a $400,000 unexplained reconciliation difference. Her manager reports 'a reconciliation issue we're working through'. His director tells the board 'month-end went broadly to plan'. What has occurred?",
    [
      "Deliberate concealment by each individual",
      "Progressive distortion through filtering, in which each individually defensible softening converted a warning into an assurance",
      "A failure of the accounting system",
      "Appropriate summarisation for a board audience",
    ],
    1,
    "This is DISTORTION AND FILTERING through levels: nobody lied, and each softening was individually defensible for its audience, but three iterations converted a serious control failure into a reassurance the board cannot act on. It is not appropriate summarisation — summarising should reduce DETAIL, not SIGNIFICANCE. The remedies are shorter chains, direct channels for critical information, and checking understanding at the far end."),

  q("BTK-24-05", "BT-24", "E", "medium", 2,
    "On what four criteria should a communication medium be chosen?",
    [
      "Cost, speed, formality and seniority of the sender",
      "Complexity, sensitivity, need for a record, and need for immediate feedback",
      "Length, language, timing and technology available",
      "Legal requirement, cost, convenience and precedent",
    ],
    1,
    "Choose on COMPLEXITY (complex → written), SENSITIVITY (sensitive → face-to-face), NEED FOR A RECORD (yes → written) and NEED FOR IMMEDIATE FEEDBACK (yes → oral) — and say which is driving the answer. Cost and convenience are real practical constraints but are not the analytical criteria, and choosing by the sender's seniority or by precedent is how organisations end up emailing redundancy news."),

  multi("BTK-24-06", "BT-24", "E", "medium", 2,
    "Which TWO are barriers to effective communication, correctly paired with a remedy?",
    [
      "Information overload — remedied by summarising and exception reporting",
      "Jargon — remedied by using more technical terms for precision",
      "Absence of feedback — remedied by asking the receiver to state their understanding back",
      "Status difference — remedied by increasing the number of hierarchical levels",
    ],
    [0, 2],
    "INFORMATION OVERLOAD is remedied by summarising, prioritising and exception reporting; ABSENCE OF FEEDBACK by asking the receiver to state their understanding back. Jargon is remedied by writing for the ACTUAL reader, not by adding more of it, and status difference by actively inviting dissent and protecting those who raise concerns — adding levels makes upward communication worse, not better."),

  q("BTK-24-07", "BT-24", "E", "hard", 2,
    "Why is 'I told them' insufficient evidence that communication has occurred?",
    [
      "Because it should have been put in writing",
      "Because communication transfers MEANING, which the receiver reconstructs — only feedback establishes whether the meanings matched",
      "Because a manager must always repeat a message three times",
      "Because only formal channels count as communication",
    ],
    1,
    "Communication is the transfer of MEANING, not the transmission of information, and meaning is RECONSTRUCTED by the receiver through their own knowledge, assumptions and mood rather than delivered intact. FEEDBACK is the only mechanism that tests whether the intended meaning arrived — which is why one-way communication is inherently unreliable, whatever the channel."),

  q("BTK-24-08", "BT-24", "E", "medium", 2,
    "Communication between a junior analyst in finance and a senior manager in operations is best described as:",
    ["Downward", "Upward", "Horizontal", "Diagonal"],
    3,
    "DIAGONAL communication runs between DIFFERENT LEVELS in DIFFERENT FUNCTIONS, which is exactly what is described. Downward and upward run within a reporting line, and horizontal runs between people at the same level. Diagonal communication is efficient but can be resented as bypassing someone's authority, which is its characteristic problem."),

  q("BTK-24-09", "BT-24", "E", "easy", 2,
    "In the communication process, 'noise' refers to:",
    [
      "Literal sound interference only",
      "Anything that distorts or interferes with the message, including jargon, emotion, distraction, overload and cultural difference",
      "The volume of messages an organisation sends",
      "Informal communication through the grapevine",
    ],
    1,
    "NOISE is anything that distorts or interferes with a message — literal sound, but far more importantly technical jargon, the receiver's emotional state, distraction, information overload, cultural difference and a poorly chosen channel. It can enter at EVERY stage of the process, which is why the concept is broader than the everyday meaning of the word."),

  q("BTK-24-10", "BT-24", "E", "medium", 2,
    "Which set best describes the qualities of an effective business communication?",
    [
      "Long, formal, technical and comprehensive",
      "Clear, concise, complete, correct, courteous, concrete and appropriately structured",
      "Written, signed, dated and filed",
      "Persuasive, confident, assertive and repeated",
    ],
    1,
    "Effective business communication is CLEAR (one unambiguous meaning), CONCISE, COMPLETE (everything the reader needs to act), CORRECT, COURTEOUS in tone, CONCRETE rather than vague, and APPROPRIATELY STRUCTURED so a busy reader can find the point. Length and technicality are not virtues, and the third option describes record-keeping rather than communication quality."),
]

/* ── Chapter 25 · Fundamental principles of ethics ─────────────── */

const CH25: AccaQuestion[] = [
  q("BTK-25-01", "BT-25", "F", "hard", 2,
    "An accountant prepares a report that is factually accurate but omits a material fact, with the effect that readers draw a favourable but incorrect conclusion. Which fundamental principle is most directly breached?",
    ["Confidentiality", "Integrity", "Professional competence and due care", "None — every statement is true"],
    1,
    "INTEGRITY requires an accountant not to be knowingly ASSOCIATED with misleading information, INCLUDING where it misleads by omitting or obscuring material facts. Factual accuracy is not a defence: if the overall impression is wrong and the accountant knows it, integrity is breached. This is also why 'it is not untrue' and 'it is not illegal' are both inadequate answers to an ethical question."),

  q("BTK-25-02", "BT-25", "F", "medium", 2,
    "A firm's fee from one client represents 45% of its total income. Which threat does this create?",
    ["Self-review", "Self-interest", "Advocacy", "Familiarity"],
    1,
    "Heavy fee dependence creates a SELF-INTEREST threat: the firm has a direct financial interest in keeping the client satisfied, which could influence its judgement on a contentious matter. The threat exists whether or not anyone has actually been influenced — the Code addresses the CIRCUMSTANCE, because the risk to objectivity is what matters. Safeguards include reducing dependence, independent review and disclosure to those charged with governance."),

  q("BTK-25-03", "BT-25", "F", "hard", 2,
    "A firm designed and implemented a client's new revenue recognition system last year and is now asked to audit the revenue figure it produces. Which threat is this, and why?",
    [
      "Advocacy, because the firm promoted its own system",
      "Self-review, because the firm would be evaluating output from a system it designed and is unlikely to conclude its own design was flawed",
      "Intimidation, because the client expects a clean opinion",
      "Familiarity, because the firm knows the client's systems well",
    ],
    1,
    "SELF-REVIEW arises where a previous judgement must be re-evaluated by the person or firm that made it — here, auditing the output of a system the firm designed. Safeguards include using an entirely separate team with no involvement in the implementation plus an independent second partner review, or declining the work; on a listed client the prohibition may be absolute rather than a matter of safeguards."),

  q("BTK-25-04", "BT-25", "F", "medium", 2,
    "Which statement about confidentiality is correct?",
    [
      "It ends when the professional relationship ends",
      "It continues after the relationship ends, applies within the firm on a need-to-know basis, and covers not using information for personal advantage",
      "It prevents disclosure even where the law requires it",
      "It applies only to written information",
    ],
    1,
    "Confidentiality CONTINUES after the relationship ends, applies INSIDE the firm on a need-to-know basis, and extends to not USING information for personal advantage or that of a third party. It gives way where the client authorises disclosure, where the law requires it — a court order or a money laundering report — or where a professional duty or right applies. It covers oral disclosure just as much as written."),

  q("BTK-25-05", "BT-25", "F", "hard", 2,
    "A client offers a 20% fee reduction on condition that its inventory valuation is accepted without further audit testing. What is the appropriate response?",
    [
      "Accept, since a fee reduction benefits the firm and the client is entitled to negotiate",
      "Refuse the condition, escalate to the ethics partner, document it, and withdraw if the client insists",
      "Accept, provided the reduction is disclosed in the audit report",
      "Negotiate a smaller reduction in exchange for reduced testing",
    ],
    1,
    "This is an INTIMIDATION threat with a self-interest element, engaging both objectivity and integrity. Curtailing audit evidence in exchange for a commercial concession cannot be accepted at ANY price, and it would breach auditing standards independently of the Code — so no safeguard makes the arrangement acceptable. Refuse, escalate, document, and withdraw if the client insists. Options 3 and 4 both trade evidence for money in different proportions."),

  multi("BTK-25-06", "BT-25", "F", "medium", 2,
    "Which TWO of the following are fundamental principles of the ACCA Code of Ethics and Conduct?",
    ["Objectivity", "Profitability", "Professional behaviour", "Client satisfaction"],
    [0, 2],
    "The five fundamental principles are integrity, OBJECTIVITY, professional competence and due care, confidentiality, and PROFESSIONAL BEHAVIOUR. Profitability and client satisfaction are commercial objectives — legitimate ones, but not ethical principles, and it is precisely where they conflict with the five that the Code becomes necessary."),

  q("BTK-25-07", "BT-25", "F", "medium", 2,
    "What is the correct sequence for applying the conceptual framework to an ethical threat?",
    [
      "Apply safeguards, then identify the threat, then conclude",
      "Identify the threat and the principle at risk, evaluate its significance, apply safeguards, and conclude — declining or withdrawing if no safeguard suffices",
      "Report to ACCA, then evaluate, then act",
      "Consult the client, then decide whether a threat exists",
    ],
    1,
    "The sequence is IDENTIFY the threat and the principle at risk, EVALUATE its significance given the amounts and relationships, APPLY specific safeguards, and CONCLUDE — declining or withdrawing where no safeguard reduces the threat to an acceptable level. This is the answer structure for almost every ethics requirement in every ACCA paper, and omitting the conclusion is where the final mark is routinely lost."),

  q("BTK-25-08", "BT-25", "F", "hard", 2,
    "Why would 'maintain objectivity and follow the Code' score poorly as a stated safeguard?",
    [
      "Because it is too brief for the marks available",
      "Because it restates the problem rather than identifying a specific action that eliminates or reduces the threat",
      "Because objectivity is not a fundamental principle",
      "Because safeguards must always involve resignation",
    ],
    1,
    "A SAFEGUARD is a specific ACTION: remove the individual from the team, rotate the engagement partner, obtain an independent second partner review, dispose of the shareholding, resign the engagement. 'Maintain objectivity' restates the obligation that the threat endangers — it does nothing about it. Resignation is one possible safeguard and the last resort, not a requirement in every case."),

  q("BTK-25-09", "BT-25", "F", "medium", 2,
    "Why is ACCA's Code principles-based rather than rules-based?",
    [
      "Because rules are legally unenforceable",
      "Because a rulebook can be complied with while its purpose is defeated, whereas a principle asks whether the fundamental obligation is threatened",
      "Because principles are cheaper to publish",
      "Because a rules-based code would require government approval",
    ],
    1,
    "A rulebook specifies CONDUCT rather than INTENT, so it can always be complied with while its purpose is defeated — 'not prohibited' becomes 'permitted'. A principles-based approach asks whether the FUNDAMENTAL PRINCIPLE is threatened, which cannot be engineered around by finding a gap. Its cost is that it demands judgement, which is what a professional is for. Some specific prohibitions still exist alongside it where a bright line is needed."),

  q("BTK-25-10", "BT-25", "F", "easy", 2,
    "What does acting in 'the public interest' require of a professional accountant?",
    [
      "Serving the interests of the client who pays the fee",
      "Regard for the collective wellbeing of the community served, even where it conflicts with the client's wishes",
      "Complying with the law and nothing further",
      "Maximising the profitability of the profession",
    ],
    1,
    "A professional body's defining feature is that members must act in the PUBLIC INTEREST — the collective wellbeing of the community served — EVEN WHERE that conflicts with what the client or employer wants. That obligation, together with an entry standard, a code and a disciplinary mechanism, is what distinguishes a profession from a trade, and it is why an outsider's reliance on a member's work is reasonable."),
]

/* ── Chapter 26 · Codes, dilemmas and consequences ─────────────── */

const CH26: AccaQuestion[] = [
  q("BTK-26-01", "BT-26", "F", "hard", 2,
    "An employer's code permits hospitality up to $500 from suppliers. An ACCA member is offered a $450 dinner by a supplier whose contract she is currently evaluating. What governs her decision?",
    [
      "The employer's code, since she is an employee rather than in practice",
      "The ACCA Code: she must evaluate the self-interest threat to objectivity regardless of the corporate threshold",
      "Nothing, as the amount is below the corporate limit",
      "The corporate code, which overrides the professional code for employed accountants",
    ],
    1,
    "A corporate code CANNOT AUTHORISE what the professional code requires you to evaluate. ACCA membership binds her regardless of her employer's threshold, so she must assess the SELF-INTEREST threat created by accepting hospitality from a supplier whose contract she is CURRENTLY evaluating — timing makes the threat significant. 'It complied with company policy' is not a defence in a professional disciplinary process."),

  q("BTK-26-02", "BT-26", "F", "hard", 2,
    "An employed accountant is pressured by their line manager to misstate a figure. Internal discussion with the manager has failed. What is the appropriate NEXT step?",
    [
      "Resign immediately",
      "Comply, while recording a private note of disagreement",
      "Escalate internally to senior management, then the audit committee or non-executive directors, while consulting ACCA and documenting throughout",
      "Report the matter to the press to protect the public interest",
    ],
    2,
    "Escalation is STEPWISE and internal routes are exhausted first — senior management, then the audit committee or NEDs, who exist precisely for matters where management is the problem — alongside consulting ACCA's confidential helpline, taking legal advice and documenting contemporaneously. Resignation is the LAST resort and may not discharge a reporting obligation; complying with a private note is still being associated with misleading information; and the press bypasses every proper channel."),

  q("BTK-26-03", "BT-26", "F", "medium", 2,
    "Why is documentation essential when handling an ethical dilemma?",
    [
      "Because ACCA requires a standard form to be completed",
      "Because a contemporaneous record of what was proposed, advised, consulted and decided protects the public interest and the accountant, and without it the events become unprovable",
      "Because it can be used to negotiate a higher fee",
      "Because it transfers responsibility to the person who gave the instruction",
    ],
    1,
    "A CONTEMPORANEOUS written record of what was proposed, what you advised, whom you consulted and what was decided protects both the public interest and you — and its absence is exactly why these situations become unprovable a year later, when memories differ and the person who applied the pressure has moved on. It does not transfer responsibility: you remain accountable for what you were associated with."),

  q("BTK-26-04", "BT-26", "F", "hard", 2,
    "A finance director instructs the controller to release a $250,000 warranty provision the controller knows is still required, to meet a bonus target, saying 'if you can't take a commercial view I'll find someone who can.' Which threats are present?",
    [
      "Self-review and advocacy",
      "Intimidation and self-interest",
      "Familiarity and advocacy",
      "None — provisions are a matter of judgement",
    ],
    1,
    "INTIMIDATION is explicit in the threat to the controller's position, and SELF-INTEREST arises because the controller's own bonus depends on the same target — both pressures point the same way. The principles at risk are integrity (being associated with misleading statements), objectivity and professional competence. Provisions do involve judgement, which is what makes the framing plausible, but the controller KNOWS the obligation remains."),

  q("BTK-26-05", "BT-26", "F", "medium", 2,
    "Is a facilitation payment acceptable where it is customary practice in the local market?",
    [
      "Yes, if it is customary and small",
      "No — anti-bribery law commonly applies extra-territorially, the ACCA Code binds a member in every jurisdiction, and local custom has never been a legal defence",
      "Yes, provided it is disclosed in the financial statements",
      "Yes, if refusing would mean losing the contract",
    ],
    1,
    "'Everyone does it here' fails on three grounds: anti-bribery legislation commonly applies EXTRA-TERRITORIALLY to conduct abroad, the ACCA Code binds a member in EVERY jurisdiction, and customary practice has never been a defence. Disclosure does not legitimise an unlawful payment, and commercial necessity is precisely the pressure the prohibition exists to withstand — where a market cannot be served lawfully, it is not served."),

  multi("BTK-26-06", "BT-26", "F", "medium", 2,
    "Which TWO reasons explain why a published corporate code of ethics often fails to change behaviour?",
    [
      "Senior managers visibly breach it without consequence",
      "It is too short to cover every situation",
      "It conflicts with what the reward system actually pays for",
      "It is written by the organisation rather than a professional body",
    ],
    [0, 2],
    "A code fails when SENIOR MANAGERS VISIBLY BREACH IT without consequence, and when it CONFLICTS WITH WHAT THE REWARD SYSTEM PAYS FOR — because a code is an espoused value while behaviour follows underlying assumptions, taught by what is rewarded and tolerated. Length is not the issue, and being organisation-written is what makes it a corporate code rather than a defect."),

  q("BTK-26-07", "BT-26", "F", "hard", 2,
    "An accountant asked to sign accounts they know to be misleading is told the matter is 'a judgement call'. Which action is available to them at ANY stage?",
    [
      "Amending the prior year comparatives instead",
      "Refusing to be associated with the information — declining to prepare or sign it",
      "Resigning without notice",
      "Reporting directly to the tax authority",
    ],
    1,
    "REFUSING TO BE ASSOCIATED with misleading information is available at any point and does not depend on anyone agreeing with you — it follows directly from the integrity principle. Amending comparatives compounds the problem; resigning without notice is both a last resort and a breach of contract; and reporting to a tax authority is neither the relevant channel nor a substitute for internal escalation."),

  q("BTK-26-08", "BT-26", "F", "medium", 2,
    "Why is resignation the LAST resort in resolving an ethical dilemma rather than the first?",
    [
      "Because it breaches the employment contract",
      "Because internal escalation may resolve the matter, and resigning quietly can leave the misstatement in place without discharging the duty to users",
      "Because ACCA prohibits members from resigning over ethical matters",
      "Because it is always financially disadvantageous",
    ],
    1,
    "Internal escalation — including to the audit committee and non-executive directors, who exist for exactly this — may resolve the matter. And resigning QUIETLY can leave the misstatement in place, which does not discharge the duty to the users of those accounts; any surviving reporting obligation must be considered. Resignation with proper notice does not breach the contract, and ACCA certainly does not prohibit it."),

  q("BTK-26-09", "BT-26", "F", "easy", 2,
    "What distinguishes a bribe from a facilitation payment?",
    [
      "A bribe is illegal; a facilitation payment is lawful everywhere",
      "A bribe induces improper performance of a function; a facilitation payment secures or speeds a routine action to which one is already entitled — both are prohibited under most anti-bribery legislation",
      "A bribe is paid in cash; a facilitation payment is paid by transfer",
      "A bribe is paid to an official; a facilitation payment to a private company",
    ],
    1,
    "A BRIBE induces IMPROPER performance of a function; a FACILITATION PAYMENT secures or speeds a ROUTINE action to which one is already entitled. The examinable point is that BOTH are prohibited under most modern anti-bribery legislation — the smallness or routineness of a facilitation payment does not make it lawful. The method of payment and the recipient's sector are irrelevant to the classification."),

  q("BTK-26-10", "BT-26", "F", "hard", 2,
    "What is the consequence of unethical behaviour for the PROFESSION as a whole, as distinct from the individual and the organisation?",
    [
      "There is no effect beyond the individual and their employer",
      "Loss of the public trust on which the qualification's value rests, and tighter, costlier regulation for every member",
      "Only a temporary decline in student registrations",
      "An automatic increase in audit fees across the market",
    ],
    1,
    "An accountant's signature is worth something only because it is RELIABLY worth something. Each ethical failure withdraws from a reserve of PUBLIC TRUST that no individual built alone and no individual can restore alone, and it typically brings tighter and more costly regulation for every member — including the honest majority. That collective exposure is why the profession polices itself and why the Code binds members outside work as well as in it."),
]

export const BT_KIT_AREA_D: AccaQuestion[] = [...CH18, ...CH19, ...CH20, ...CH21, ...CH22]
export const BT_KIT_AREA_E: AccaQuestion[] = [...CH23, ...CH24]
export const BT_KIT_AREA_F: AccaQuestion[] = [...CH25, ...CH26]
