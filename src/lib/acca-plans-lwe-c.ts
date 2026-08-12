/*
 * LW-ENG Area C — employment law.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area C's questions almost all reduce to one prior question: employee or self-
 * employed? Nearly every right in this area belongs to employees only, so the
 * classification decides the case before any substantive rule is reached. The plans
 * therefore establish status first wherever the stem leaves room for doubt.
 *
 * The second recurring pattern is the WRONGFUL/UNFAIR confusion — a contractual
 * claim offered where a statutory one is in issue, or the reverse. Those two claims
 * have different bases, different tribunals, different qualifying conditions and
 * different remedies, and a stem that says "without notice" is testing the first
 * while one that says "without a hearing" is testing the second.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const LWE_PLANS_C: ExamPlanMap = {
  /* ── LWE-23 · Employee or self-employed ─────────────────────── */

  "LWE-23::the-tests": {
    title: "Applying the tests for employment status",
    format: "ot",
    marks: 2,
    requirement:
      "Which factor points most strongly towards a worker being **self-employed** rather than an employee?\n\nA  The employer deducts income tax at source\nB  The worker provides their own equipment, can send a substitute, and bears the financial risk of the work\nC  The worker attends the employer's premises daily\nD  The worker is paid weekly",
    plan: [
      {
        step: "Recall how the tests developed, because each adds something",
        detail:
          "CONTROL: how far the employer directs what is done and how. INTEGRATION: is the work integral to the business or merely accessory. MULTIPLE (economic reality): the whole picture, weighing many factors.",
      },
      {
        step: "Name the factors the multiple test weighs",
        detail:
          "Who provides the equipment, who bears financial risk, whether the worker can profit from sound management, whether the work can be delegated, how tax is paid, mutuality of obligation, and what the parties called it.",
      },
      {
        step: "Identify the strongest indicators of self-employment",
        detail:
          "Providing own equipment, the right to send a substitute, and bearing financial risk all point away from employment together. A right of substitution is particularly strong, since personal service is central to employment.",
      },
      {
        step: "Note that the label the parties chose does not decide it",
        detail:
          "A contract calling someone self-employed does not make them so. The court looks at the reality of the relationship, which is why deducting tax at source is evidence and not proof.",
      },
    ],
    answer:
      "**B — the worker provides their own equipment, can send a substitute, and bears the financial risk of the work.**\n\nThree indicators pointing the same way. The right to send a **substitute** is particularly strong, because **personal service** is central to employment — an obligation that can be delegated is not an employment obligation.\n\nThe tests developed in sequence, each adding something: **control** (how far the employer directs what is done and how), **integration** (is the work integral to the business or merely accessory), and the **multiple** or economic reality test, which weighs the whole picture — equipment, financial risk, the chance to profit from sound management, delegation, how tax is paid, mutuality of obligation, and what the parties called the relationship.\n\nThe label does **not** decide it. A contract describing someone as self-employed does not make them so, which is why option A is evidence rather than proof. Attendance and weekly pay are consistent with either status.",
    earns: [
      "Naming the right of substitution as a strong indicator, and why personal service matters",
      "Knowing the parties' own label does not determine status",
    ],
    loses: ["Treating tax treatment or regular attendance as decisive"],
  },

  "LWE-23::why-it-matters": {
    title: "What turns on the classification",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is available to an **employee** but not to a self-employed contractor?\n\nA  The right to be paid for work done\nB  The right to claim unfair dismissal and a statutory redundancy payment\nC  The right to sue for breach of contract\nD  The right to be paid on time",
    plan: [
      {
        step: "Identify which rights depend on status",
        detail:
          "Statutory employment rights: unfair dismissal, redundancy pay, statutory notice, statutory sick and maternity pay, and the written statement of particulars. All belong to employees.",
      },
      {
        step: "Identify what belongs to anyone with a contract",
        detail:
          "Payment for work done, payment on time, and the right to sue for breach are contractual and available to a contractor as much as an employee. Options A, C and D are all contractual.",
      },
      {
        step: "Add the non-employment consequences",
        detail:
          "Vicarious liability generally attaches only to employees, tax and national insurance are collected differently, and implied duties such as fidelity apply to the employment relationship.",
      },
      {
        step: "See why this makes status the gateway question",
        detail:
          "Almost every claim in Area C requires employee status first. A stem describing a self-employed worker dismissed unfairly is testing whether you notice the claim cannot be brought at all.",
      },
    ],
    answer:
      "**B — the right to claim unfair dismissal and a statutory redundancy payment.**\n\nThose are **statutory employment rights** and belong to employees only, along with statutory minimum notice, statutory sick and maternity pay, and the written statement of particulars.\n\nOptions A, C and D are all **contractual** and available to a self-employed contractor as much as to an employee — a contractor who is not paid sues for breach of contract exactly as anyone else would.\n\nThe non-employment consequences matter too: **vicarious liability** generally attaches only to employees, **tax and national insurance** are collected differently, and the **implied duties** such as fidelity attach to the employment relationship.\n\nThis is what makes status the gateway question for the whole area. A stem describing a self-employed worker \"dismissed unfairly\" is testing whether you notice the claim **cannot be brought at all** — no amount of unfairness creates a right that depends on being an employee.",
    earns: [
      "Separating statutory rights from contractual ones",
      "Recognising status as the gateway to almost every Area C claim",
    ],
    loses: ["Treating a contractual right as though it depended on employee status"],
  },

  /* ── LWE-24 · The contract of employment ────────────────────── */

  "LWE-24::formation-and-terms": {
    title: "Where the terms of an employment contract come from",
    format: "ot",
    marks: 2,
    requirement:
      "The written statement of employment particulars that an employer must provide is:\n\nA  The contract of employment itself\nB  Evidence of the terms, but not necessarily the contract\nC  Optional\nD  Required only for senior employees",
    plan: [
      {
        step: "Separate the contract from the statement",
        detail:
          "The CONTRACT may be formed orally or by conduct and needs no particular form. The STATEMENT is a statutory document setting out specified particulars, and it is evidence of the terms rather than the contract.",
      },
      {
        step: "Note what the statement must contain",
        detail:
          "The parties, the date employment began, pay, hours, holiday, sick pay, notice, job title, place of work, and any disciplinary and grievance procedures.",
      },
      {
        step: "Reject the two options limiting the obligation",
        detail:
          "The statement is a statutory requirement and applies regardless of seniority. It is not optional, and an employer who fails to provide it can be ordered to.",
      },
      {
        step: "Name the sources of the terms themselves",
        detail:
          "Express agreement, statute, collective agreements, custom and practice, works rules, and terms implied by the courts. The statement records some of these; it does not create them.",
      },
    ],
    answer:
      "**B — evidence of the terms, but not necessarily the contract.**\n\nThe **contract** may be formed orally or by conduct and needs no particular form. The **written statement of particulars** is a separate statutory document, and it is evidence of the agreed terms rather than the contract itself — so a term genuinely agreed but omitted from the statement still binds.\n\nIt must contain the parties, the date employment began, pay, hours, holiday, sick pay, notice, job title, place of work, and any disciplinary and grievance procedures. It is required regardless of seniority and is not optional.\n\nThe terms themselves come from several sources: **express** agreement, **statute**, **collective agreements**, **custom and practice**, **works rules**, and terms **implied by the courts**. The statement records some of them and creates none.\n\nStatutory terms cannot be excluded by agreement, which is why an employment contract cannot contract out of the minimum wage or statutory notice.",
    earns: [
      "Separating the contract from the statutory statement",
      "Naming the sources of terms and knowing statutory terms cannot be excluded",
    ],
    loses: ["Treating the statement as the contract, so an omitted term would not bind"],
  },

  "LWE-24::implied-duties": {
    title: "Identifying an implied duty and who owes it",
    format: "ot",
    marks: 2,
    requirement:
      "Which is an implied duty owed by the **employee** to the employer?\n\nA  To provide a safe system of work\nB  To pay the agreed wages\nC  To serve faithfully, obey lawful and reasonable instructions, and exercise reasonable skill and care\nD  To provide a reference on request",
    plan: [
      {
        step: "Split the duties by who owes them",
        detail:
          "EMPLOYER: pay wages, provide a safe system of work, mutual trust and confidence, indemnify for expenses. EMPLOYEE: serve faithfully, obey lawful and reasonable instructions, exercise reasonable skill and care, personal service.",
      },
      {
        step: "Read whose duty the stem asks for",
        detail:
          "The employee's. Options A and B are employer duties and both are true statements — the sorting is by duty-holder, exactly as with the health and safety question in BT.",
      },
      {
        step: "Note the option that is not a duty at all",
        detail:
          "There is generally NO duty to provide a reference. If one is given it must be true and not misleading, but the employer is not obliged to give one.",
      },
      {
        step: "Note the reach of the fidelity duty",
        detail:
          "It covers not competing during employment, not disclosing confidential information, and accounting for secret profits. After employment ends it survives only for genuine trade secrets, unless a valid restraint of trade clause applies.",
      },
    ],
    answer:
      "**C — to serve faithfully, obey lawful and reasonable instructions, and exercise reasonable skill and care.**\n\nSort by duty-holder. **Employer**: pay the agreed wages, provide a safe system of work, maintain mutual trust and confidence, indemnify for expenses properly incurred. **Employee**: serve faithfully, obey **lawful and reasonable** instructions, exercise reasonable skill and care, and give personal service.\n\nThe qualification on obedience matters: an instruction that is unlawful or unreasonable need not be obeyed, so refusing to falsify a record is not a breach.\n\nOption D is not a duty at all — there is generally **no** obligation to provide a reference, though a reference actually given must be true and not misleading.\n\nThe **fidelity** duty covers not competing during employment, not disclosing confidential information, and accounting for secret profits. After employment it survives only for genuine **trade secrets**, unless a valid restraint of trade clause applies — and such a clause binds only if it protects a legitimate interest and goes no further than necessary.",
    earns: [
      "Sorting by duty-holder, and noting obedience is limited to lawful and reasonable instructions",
      "Knowing fidelity narrows to trade secrets after employment ends",
    ],
    loses: ["Choosing a true employer duty for a question about the employee's duties"],
  },

  /* ── LWE-25 · Notice, wrongful and constructive dismissal ────── */

  "LWE-25::notice-and-wrongful": {
    title: "What a wrongful dismissal claim is about",
    format: "ot",
    marks: 2,
    requirement:
      "An employee with 18 months' service is dismissed with no notice and no payment in lieu, for a reason that would have justified a fair dismissal had the correct procedure been followed. The employee's strongest claim is:\n\nA  Unfair dismissal\nB  Wrongful dismissal, for the notice pay not given\nC  Redundancy\nD  No claim at all",
    plan: [
      {
        step: "Separate the two claims by their basis",
        detail:
          "WRONGFUL dismissal is a CONTRACTUAL claim, usually for failure to give notice. UNFAIR dismissal is a STATUTORY claim about the reason for dismissal and the procedure followed.",
      },
      {
        step: "Check the qualifying condition for the statutory claim",
        detail:
          "Unfair dismissal generally requires two years' continuous service. This employee has 18 months, so the statutory claim is unavailable regardless of how unfair the dismissal was.",
      },
      {
        step: "Test the contractual claim",
        detail:
          "No notice and no payment in lieu is a breach of contract, and wrongful dismissal has NO qualifying service period. So it is available where the statutory claim is not.",
      },
      {
        step: "Note the limit on what wrongful dismissal recovers",
        detail:
          "Damages are essentially the pay for the notice period. So it is a narrower claim than unfair dismissal, but it is the one this employee actually has.",
      },
    ],
    answer:
      "**B — wrongful dismissal, for the notice pay not given.**\n\nThe two claims have different bases. **Wrongful** dismissal is **contractual** — usually failure to give the required notice — and has **no qualifying service period**. **Unfair** dismissal is **statutory**, about the reason for dismissal and the procedure followed, and generally requires **two years'** continuous service.\n\nAt 18 months this employee cannot claim unfair dismissal however unfair the dismissal was, which is why the service length is in the stem. But dismissal without notice or payment in lieu is a breach of contract, so the wrongful dismissal claim stands.\n\nDamages are essentially the pay for the **notice period**, so it is a narrower claim — but it is the one available.\n\nStatutory minimum notice is one week after a month's service, then one week per year of service up to twelve. **Summary** dismissal without notice is lawful only for **gross misconduct**, which the stem does not describe.",
    earns: [
      "Checking the two-year qualifying period before reaching for unfair dismissal",
      "Knowing wrongful dismissal has no service requirement but recovers only notice pay",
    ],
    loses: ["Claiming unfair dismissal for an employee who has not qualified for it"],
  },

  "LWE-25::constructive": {
    title: "What constructive dismissal requires",
    format: "ot",
    marks: 2,
    requirement:
      "An employee resigns after the employer unilaterally cuts their pay by a third. For a constructive dismissal claim the employee must show that:\n\nA  They gave notice of resignation\nB  The employer committed a repudiatory breach of contract and they resigned promptly in response to it\nC  The employer intended them to resign\nD  They were treated less favourably than colleagues",
    plan: [
      {
        step: "State the three requirements",
        detail:
          "A repudiatory breach by the employer, a resignation IN RESPONSE to that breach, and resignation without undue delay. All three are needed.",
      },
      {
        step: "Apply them to the facts",
        detail:
          "A unilateral one-third pay cut is a fundamental breach of an express term. If the employee resigns promptly in response, the resignation is treated as a dismissal.",
      },
      {
        step: "Note the danger of delay",
        detail:
          "Delay may amount to AFFIRMATION of the contract, losing the claim entirely. The employee must not appear to have accepted the new terms, which is what makes promptness a requirement rather than a preference.",
      },
      {
        step: "Reject intention as an element",
        detail:
          "The employer's intention is irrelevant. What matters is whether its conduct amounted to a repudiatory breach, so an employer can constructively dismiss someone it wanted to keep.",
      },
    ],
    answer:
      "**B — the employer committed a repudiatory breach of contract and they resigned promptly in response to it.**\n\nThree requirements: a **repudiatory breach** by the employer, a resignation **in response** to that breach, and resignation **without undue delay**.\n\nA unilateral one-third pay cut is a fundamental breach of an express term, so if the employee resigns promptly the resignation is treated as a **dismissal** — which is the point of the doctrine, since there would otherwise be no dismissal to complain of.\n\nDelay is the trap: it may amount to **affirmation** of the contract, losing the claim entirely. That is why promptness is a requirement rather than good practice.\n\nThe employer's **intention is irrelevant** — an employer can constructively dismiss an employee it wanted to keep, because what matters is whether its conduct was a repudiatory breach.\n\nThe usual routes are breach of an express term, or breach of the implied term of **mutual trust and confidence**. And a constructive dismissal is not automatically unfair: the tribunal still asks whether the dismissal was fair.",
    earns: [
      "Requiring all three elements and naming affirmation as the risk in delaying",
      "Knowing a constructive dismissal is not automatically an unfair one",
    ],
    loses: ["Requiring the employer to have intended the resignation"],
  },

  /* ── LWE-26 · Unfair dismissal ──────────────────────────────── */

  "LWE-26::who-and-why": {
    title: "Which reasons for dismissal the statute permits",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a **potentially fair** reason for dismissal?\n\nA  The employee's trade union membership\nB  The employee's capability or qualifications for the work\nC  The employee's pregnancy\nD  The employee having made a protected disclosure",
    plan: [
      {
        step: "Recall the five potentially fair reasons",
        detail:
          "Capability or qualifications, conduct, redundancy, statutory illegality, and some other substantial reason. \"Potentially\" fair, because a fair reason still requires a fair procedure.",
      },
      {
        step: "Recall the automatically unfair reasons",
        detail:
          "Pregnancy or maternity, trade union membership or activities, whistleblowing (a protected disclosure), asserting a statutory right, and jury service among others.",
      },
      {
        step: "Sort the options between the two lists",
        detail:
          "Capability is on the fair list. Union membership, pregnancy and protected disclosure are all automatically unfair — three from one list and one from the other.",
      },
      {
        step: "Note what automatic unfairness changes",
        detail:
          "No qualifying period of service is required, and no procedure can make the dismissal fair. So the reason alone decides it, which is why the distinction matters more than any procedural point.",
      },
    ],
    answer:
      "**B — the employee's capability or qualifications for the work.**\n\nThe five **potentially fair** reasons are **capability or qualifications**, **conduct**, **redundancy**, **statutory illegality**, and **some other substantial reason**. The word \"potentially\" is doing work: a fair reason still requires a **fair procedure**, so a genuine capability problem handled without warnings or a hearing produces an unfair dismissal.\n\nThe other three options are **automatically unfair** reasons, alongside asserting a statutory right and jury service.\n\nWhat automatic unfairness changes is decisive: **no qualifying period** of service is required, and **no procedure** can make the dismissal fair. So the reason alone determines the outcome — which is why an employee dismissed for whistleblowing on day one has a claim, while an employee dismissed for poor performance after 18 months does not.",
    earns: [
      "Keeping the two lists apart, and knowing automatic unfairness removes the service requirement",
      "Reading \"potentially\" fair as requiring a fair procedure as well",
    ],
    loses: ["Treating a fair reason as sufficient without a fair procedure"],
  },

  "LWE-26::procedure-remedies": {
    title: "The remedies for unfair dismissal",
    format: "mtq",
    marks: 6,
    requirement:
      "An employee with four years' service is dismissed for alleged misconduct. No investigation was carried out, the employee was given no opportunity to respond, and no right of appeal was offered. The tribunal finds the dismissal unfair.\n\n(i) State why the dismissal was unfair, notwithstanding that misconduct is a potentially fair reason.\n(ii) Name the THREE remedies a tribunal may award.\n(iii) State which remedy is awarded most often, and why.",
    plan: [
      {
        step: "Answer (i) on procedure, not on the reason",
        detail:
          "Misconduct IS a potentially fair reason, so the unfairness cannot lie there. It lies in the procedure — no investigation, no opportunity to respond, no appeal — and the answer must say so explicitly.",
      },
      {
        step: "Name the procedural requirements that were missed",
        detail:
          "A reasonable investigation, notice of the allegations, an opportunity to respond at a hearing, and a right of appeal. Naming what should have happened is what earns the mark rather than asserting unfairness.",
      },
      {
        step: "Give the three remedies with their distinction",
        detail:
          "Reinstatement (the old job back), re-engagement (comparable employment), and compensation. The first two are distinct and confusing them costs a mark.",
      },
      {
        step: "Answer (iii) with the reason, not just the remedy",
        detail:
          "Compensation, because the employment relationship has usually broken down by the time the case is heard and neither party wants it restored — and a tribunal cannot force a genuinely unwilling employer to take someone back.",
      },
    ],
    answer:
      "**(i) Why it was unfair**\n\nMisconduct is a **potentially fair** reason, so the unfairness lies not in the reason but in the **procedure**. A fair procedure requires a **reasonable investigation**, **notice of the allegations**, an **opportunity to respond** at a hearing, and a **right of appeal**. None of those happened.\n\nA tribunal asks both whether the reason was fair and whether the employer **acted reasonably** in treating it as sufficient — and a genuine misconduct case handled this way still produces an unfair dismissal.\n\n**(ii) The three remedies**\n\n**Reinstatement** — the employee returns to the same job on the same terms, as though never dismissed.\n**Re-engagement** — the employee returns to comparable or other suitable employment, not necessarily the same role.\n**Compensation** — a basic award calculated on age, service and pay, plus a compensatory award for actual losses.\n\n**(iii) The remedy awarded most often, and why**\n\n**Compensation**, by a wide margin. By the time a case is heard the employment relationship has usually broken down and neither party wants it restored — and a tribunal cannot in practice force a genuinely unwilling employer to take someone back, though refusing an order for reinstatement attracts an additional award.\n\nCompensation may be reduced for the employee's own **contributory conduct** and for a failure to **mitigate** by seeking other work.",
    earns: [
      "Locating the unfairness in the procedure and naming the specific steps missed",
      "Distinguishing reinstatement from re-engagement",
      "Giving a reason in (iii) rather than only naming compensation",
      "Knowing compensation can be reduced for contributory conduct and failure to mitigate",
    ],
    loses: [
      "Arguing the reason was unfair, when misconduct is expressly a potentially fair reason",
      "Naming reinstatement and re-engagement as one remedy, which loses a mark",
      "Answering (iii) with \"compensation\" and no explanation",
    ],
  },

  /* ── LWE-27 · Redundancy ────────────────────────────────────── */

  "LWE-27::what-redundancy-is": {
    title: "Whether a dismissal is by reason of redundancy",
    format: "ot",
    marks: 2,
    requirement:
      "A dismissal is by reason of redundancy where it is attributable wholly or mainly to:\n\nA  The employee's poor performance\nB  The employer ceasing business, ceasing business at that place, or a reduced requirement for employees to do work of a particular kind\nC  The employer wishing to reduce its wage bill by replacing the employee with someone cheaper\nD  A personality clash",
    plan: [
      {
        step: "State the statutory definition's three limbs",
        detail:
          "The employer has ceased or intends to cease carrying on business; has ceased or intends to cease doing so at the place where the employee was employed; or the requirement for employees to do work of a particular KIND has diminished or is expected to.",
      },
      {
        step: "Note that redundancy attaches to the JOB, not the person",
        detail:
          "The job disappears, or fewer people are needed to do it. Poor performance and a personality clash are about the individual, so both are capability or conduct rather than redundancy.",
      },
      {
        step: "Test option C carefully, since it is the sophisticated distractor",
        detail:
          "Replacing an employee with a cheaper one means the requirement for that work has NOT diminished — the work continues and someone else does it. That is not redundancy, and dismissing for it is likely unfair.",
      },
      {
        step: "Note the entitlement and the qualifying period",
        detail:
          "A statutory redundancy payment requires two years' continuous service, and is calculated on age, length of service and weekly pay subject to a statutory cap.",
      },
    ],
    answer:
      "**B — the employer ceasing business, ceasing business at that place, or a reduced requirement for employees to do work of a particular kind.**\n\nThose are the three statutory limbs, and the unifying idea is that redundancy attaches to the **job, not the person**: the job disappears, or fewer people are needed to do work of that kind.\n\nPoor performance and a personality clash are about the **individual**, so they fall under capability or conduct instead.\n\nOption C is the sophisticated distractor and is worth stating clearly: replacing an employee with someone cheaper means the requirement for that work has **not** diminished — the work continues and another person does it. That is not redundancy, and a dismissal dressed up as one is likely to be unfair.\n\nA statutory **redundancy payment** requires **two years'** continuous service and is calculated on age, length of service and weekly pay, subject to a statutory cap on the weekly figure.\n\nAn employee who unreasonably refuses **suitable alternative employment** loses the payment.",
    earns: [
      "Applying the job-not-the-person principle",
      "Seeing that replacing an employee with a cheaper one is not a reduced requirement",
    ],
    loses: ["Accepting a wage-bill motive as redundancy"],
  },

  "LWE-27::procedure-and-fairness": {
    title: "When a genuine redundancy is still an unfair dismissal",
    format: "ot",
    marks: 2,
    requirement:
      "A genuine redundancy situation exists, but the employer selects the employee for dismissal without applying any objective criteria and without consulting them. The dismissal is:\n\nA  Fair, because redundancy is a potentially fair reason\nB  Unfair, because a fair redundancy requires objective selection, consultation, and consideration of alternative employment\nC  Fair, provided a redundancy payment is made\nD  Unfair only if the employee had ten years' service",
    plan: [
      {
        step: "Separate the reason from the process",
        detail:
          "Redundancy is a potentially fair REASON. That establishes only the first half — the employer must also have acted reasonably, which is a question of procedure.",
      },
      {
        step: "Name what a fair redundancy procedure requires",
        detail:
          "Warning and consultation, objective and fairly applied selection criteria, consideration of suitable alternative employment, and collective consultation where the numbers require it.",
      },
      {
        step: "Reject the payment option",
        detail:
          "A redundancy payment is a statutory entitlement, not a cure for an unfair procedure. Paying it does not make an unfair dismissal fair, and the employee may recover both.",
      },
      {
        step: "Note that unfair selection can also be automatically unfair",
        detail:
          "Selecting for a prohibited reason — pregnancy, union membership, whistleblowing — makes the dismissal automatically unfair, with no qualifying service needed.",
      },
    ],
    answer:
      "**B — unfair, because a fair redundancy requires objective selection, consultation, and consideration of alternative employment.**\n\nRedundancy is a potentially fair **reason**, and that establishes only half the case. The employer must also have **acted reasonably**, which is a question of process — exactly as with misconduct.\n\nA fair redundancy requires **warning and consultation** with the employee, **objective selection criteria** fairly applied, **consideration of suitable alternative employment**, and **collective consultation** with representatives where the number of proposed dismissals requires it.\n\nOption C is the important error: a **redundancy payment is a statutory entitlement, not a cure**. Paying it does not make an unfair dismissal fair, and the employee may recover both the payment and compensation for unfair dismissal.\n\nWhere selection is for a **prohibited reason** — pregnancy, union membership, whistleblowing — the dismissal is **automatically** unfair and no qualifying service is needed at all.",
    earns: [
      "Splitting the reason from the process and naming the four procedural requirements",
      "Knowing a redundancy payment does not cure an unfair procedure",
    ],
    loses: ["Treating a genuine redundancy situation as making the dismissal fair by itself"],
  },
}
