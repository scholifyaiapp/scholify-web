import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Area C question kit — chapters 23 to 27.
 *
 * Employment law: employment status, the contract of employment and the implied duties,
 * notice and wrongful dismissal, constructive dismissal, unfair dismissal and its
 * remedies, and redundancy.
 *
 * The structural statutory figures are examined directly — the two-year qualifying
 * period, the 0.5/1/1.5-week redundancy multipliers, the twenty-year cap counted
 * backwards, twelve weeks' maximum statutory notice, three months less one day, and the
 * 30/45-day collective consultation thresholds. Where a figure is uprated annually the
 * question supplies it, exactly as the real exam does on a rate sheet.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 23 · Employment status ─────────────────────────────── */

const CH23: AccaQuestion[] = [
  q1("LWEK-23-01", "LWE-23", "C", "easy",
    "Which is the irreducible minimum for a contract of employment?",
    [
      "A written contract, a fixed salary and set hours",
      "Mutuality of obligation, personal service and an element of control",
      "PAYE deduction, holiday pay and a job title",
      "Exclusivity, a probationary period and a notice clause",
    ],
    1,
    "MUTUALITY OF OBLIGATION, PERSONAL SERVICE and some element of CONTROL. If any one is missing there is no contract of employment, however many other factors point that way."),

  q1("LWEK-23-02", "LWE-23", "C", "easy",
    "Which right does a WORKER have but an independent contractor not?",
    ["Unfair dismissal protection", "Paid holiday", "A statutory redundancy payment", "Minimum statutory notice"],
    1,
    "PAID HOLIDAY — along with the national minimum wage, working time limits and whistleblowing protection. Unfair dismissal, redundancy pay and minimum notice belong to EMPLOYEES only."),

  q2("LWEK-23-03", "LWE-23", "C", "medium",
    "A written contract states the worker is self-employed and may send a substitute, but substitution has always been refused and the employer sets hours and supplies tools. What is the worker?",
    [
      "Self-employed, the written contract governing",
      "An employee — the tribunal looks at the substance as performed and disregards a contradictory label",
      "Self-employed, a substitution clause being conclusive",
      "Neither, the contract being void for uncertainty",
    ],
    1,
    "An EMPLOYEE. Status turns on the SUBSTANCE of the relationship as actually performed, not the label. A substitution clause points to self-employment only if the right is GENUINE and unfettered — one always refused is not."),

  q2("LWEK-23-04", "LWE-23", "C", "medium",
    "Why is the control test insufficient by itself?",
    [
      "Because control is impossible to prove",
      "Because it breaks down for skilled professionals whose employer cannot direct how the work is done",
      "Because it applies only to manual work",
      "Because it was abolished by statute",
    ],
    1,
    "Because it FAILS FOR SKILLED PROFESSIONALS — a hospital cannot tell a surgeon how to operate, yet the surgeon is plainly an employee. That is why the modern approach is the ECONOMIC REALITY test, weighing all the factors."),

  multi2("LWEK-23-05", "LWE-23", "C", "medium",
    "Which TWO point towards SELF-employment?",
    [
      "The worker provides their own equipment",
      "The worker bears the risk of loss and the chance of profit",
      "Tax is deducted at source under PAYE",
      "The worker is subject to the employer's disciplinary procedure",
    ],
    [0, 1],
    "Providing OWN EQUIPMENT and bearing the RISK OF LOSS with the chance of profit both point to being in business on one's own account. PAYE deduction and being subject to disciplinary procedures point to EMPLOYMENT."),

  q2("LWEK-23-06", "LWE-23", "C", "hard",
    "Why does employment status matter for a claimant injured by the worker's negligence?",
    [
      "It determines the standard of care owed",
      "An employer is vicariously liable for an employee's torts in the course of employment, but generally not for an independent contractor's",
      "It determines the limitation period",
      "It determines whether damages are capped",
    ],
    1,
    "Because of VICARIOUS LIABILITY. An employer answers for an EMPLOYEE'S torts in the course of employment, and generally not for an independent CONTRACTOR'S — which usually decides whether there is a defendant able to pay."),
]

/* ── Chapter 24 · The contract of employment ────────────────────── */

const CH24: AccaQuestion[] = [
  q1("LWEK-24-01", "LWE-24", "C", "easy",
    "When must the written statement of particulars be given?",
    ["Within two months of starting", "On or before the first day of employment", "Within 13 weeks", "Only on the employee's request"],
    1,
    "ON OR BEFORE THE FIRST DAY of employment."),

  q1("LWEK-24-02", "LWE-24", "C", "easy",
    "Which duty is implied on the EMPLOYER?",
    ["To act in good faith towards the employer", "To provide a safe system of work", "To obey lawful and reasonable instructions", "To account for secret profits"],
    1,
    "To provide a SAFE SYSTEM OF WORK, competent colleagues and safe premises and equipment. The other three are duties owed BY the employee."),

  q2("LWEK-24-03", "LWE-24", "C", "medium",
    "An employment contract contains a clause by which the employee agrees never to bring an unfair dismissal claim. What is its effect?",
    [
      "Binding, the employee having freely agreed",
      "Void to that extent — statutory employment rights cannot be excluded by a contractual clause",
      "Binding if the employee received legal advice on the contract",
      "It suspends the right until notice is given",
    ],
    1,
    "VOID to that extent. Statutory employment rights cannot be contracted out of in the employment contract. Only a properly advised SETTLEMENT AGREEMENT or an ACAS-brokered agreement can validly compromise such a claim."),

  q2("LWEK-24-04", "LWE-24", "C", "medium",
    "Which implied duty does an employer breach by imposing a substantial unilateral cut in pay?",
    ["The duty to indemnify", "The duty not to destroy mutual trust and confidence", "The duty to provide work", "The duty of fidelity"],
    1,
    "MUTUAL TRUST AND CONFIDENCE. A substantial unilateral change to pay, hours or duties without agreement is conduct likely to destroy the relationship of confidence, and a serious breach grounds CONSTRUCTIVE dismissal. Fidelity is owed BY the employee."),

  q2("LWEK-24-05", "LWE-24", "C", "medium",
    "After employment ends, and with no express restraint clause, what remains protected?",
    [
      "The employer's entire client list and all the employee's know-how",
      "Genuine trade secrets and confidential information, but not the employee's general skill and experience",
      "Nothing at all",
      "Everything, for a reasonable period",
    ],
    1,
    "GENUINE TRADE SECRETS and confidential information only. The ex-employee is free to use their GENERAL SKILL AND EXPERIENCE and to compete. Restraining competition needs an EXPRESS clause, reasonable in scope, area and duration."),

  q2("LWEK-24-06", "LWE-24", "C", "hard",
    "Is everything in a staff handbook a contractual term?",
    [
      "Yes, a handbook forms part of the contract",
      "No — only terms the parties intended to be contractual are incorporated",
      "Yes, if the employee signed for it",
      "No, a handbook can never be contractual",
    ],
    1,
    "NO. Only terms the parties INTENDED to be contractual are incorporated. Aspirational policy statements usually are not; a specific pay or notice provision usually is. Signing for receipt is not the same as agreeing terms."),
]

/* ── Chapter 25 · Notice, wrongful and constructive dismissal ───── */

const CH25: AccaQuestion[] = [
  q1("LWEK-25-01", "LWE-25", "C", "easy",
    "What is the maximum statutory minimum notice an employer must give?",
    ["4 weeks", "8 weeks", "12 weeks", "26 weeks"],
    2,
    "TWELVE WEEKS, reached at 12 years' service — one week per complete year up to that ceiling, however long the service. A longer CONTRACTUAL period governs if there is one."),

  q1("LWEK-25-02", "LWE-25", "C", "easy",
    "What qualifying service is needed for a WRONGFUL dismissal claim?",
    ["None", "Two years", "One year", "Two months"],
    0,
    "NONE. Wrongful dismissal is a CONTRACT claim, so the right exists from day one. The two-year period applies to ordinary UNFAIR dismissal."),

  q2("LWEK-25-03", "LWE-25", "C", "medium",
    "An employee with 15 years' service has a contract giving three months' notice. She is dismissed with four weeks' notice. What is she owed?",
    [
      "Nothing more, four weeks exceeding the statutory minimum for her early years",
      "Damages for the balance of three months, the contractual period being longer than the statutory maximum",
      "Damages for the balance of 12 weeks",
      "Damages for 15 weeks, one per year of service",
    ],
    1,
    "The balance of THREE MONTHS. Apply whichever period is LONGER — the contractual three months beats the statutory 12-week maximum. Damages are the remaining notice pay and contractual benefits, less anything earned in mitigation."),

  q2("LWEK-25-04", "LWE-25", "C", "medium",
    "What is recoverable in wrongful dismissal?",
    [
      "Compensation for the manner of dismissal and injured feelings",
      "Net pay and contractual benefits for the notice period, subject to mitigation",
      "A basic and a compensatory award",
      "Reinstatement",
    ],
    1,
    "NET PAY AND CONTRACTUAL BENEFITS for the notice period, subject to the duty to MITIGATE and reduced by any payment in lieu. It is a CONTRACT claim, so nothing is recoverable for hurt feelings or the manner of dismissal."),

  q2("LWEK-25-05", "LWE-25", "C", "medium",
    "An employer imposes a serious unagreed pay cut. The employee says nothing and works on for eight months, then resigns claiming constructive dismissal. What is the likely outcome?",
    [
      "The claim succeeds, the pay cut being a fundamental breach",
      "The claim fails — by working on without protest the employee has affirmed the contract",
      "The claim succeeds, there being no time limit on constructive dismissal",
      "The claim converts into a wrongful dismissal claim automatically",
    ],
    1,
    "It FAILS on AFFIRMATION. All three requirements must be met: a fundamental breach, resignation IN RESPONSE, and resignation PROMPTLY without affirming. Eight months of silence accepts the breach, however serious it was."),

  q2("LWEK-25-06", "LWE-25", "C", "medium",
    "Is a summary dismissal for theft wrongful?",
    [
      "Yes, dismissal without notice is always wrongful",
      "No — theft is gross misconduct, a repudiatory breach, so dismissal without notice is lawful",
      "Yes, unless the employee is convicted",
      "No, and it cannot be unfair either",
    ],
    1,
    "NO. Gross misconduct is a repudiatory breach, so SUMMARY dismissal is lawful and not wrongful. But it may still be UNFAIR if the employer skipped a fair procedure — getting the reason right does not excuse getting the process wrong."),

  q2("LWEK-25-07", "LWE-25", "C", "hard",
    "An employee objects in writing to a fundamental breach, raises a grievance which is never answered, suffers further breaches, and resigns three months later. Has she affirmed?",
    [
      "Yes, three months is too long",
      "No — she objected immediately, pursued a grievance, and the breaches continued, so the last straw completed the breach",
      "Yes, unless she resigned within one month",
      "No, affirmation being impossible where any breach is fundamental",
    ],
    1,
    "NO. Continuing to work WHILE PURSUING A GRIEVANCE is not affirmation, and where breaches CONTINUE the final act is a LAST STRAW completing the cumulative breach. Prompt written objection is what defeats the affirmation argument."),
]

/* ── Chapter 26 · Unfair dismissal ──────────────────────────────── */

const CH26: AccaQuestion[] = [
  q1("LWEK-26-01", "LWE-26", "C", "easy",
    "Which is NOT one of the five potentially fair reasons for dismissal?",
    ["Capability or qualifications", "Conduct", "Redundancy", "The employer's preference for a different person"],
    3,
    "PREFERRING A DIFFERENT PERSON is not a fair reason — that is the disguised dismissal the redundancy rules are designed to catch. The five are capability or qualifications, conduct, redundancy, statutory restriction, and some other substantial reason."),

  q1("LWEK-26-02", "LWE-26", "C", "easy",
    "What is the time limit for an unfair dismissal claim?",
    ["Three months less one day from the effective date of termination", "Six months", "Twelve months", "Three years"],
    0,
    "THREE MONTHS LESS ONE DAY from the effective date of termination, after mandatory ACAS early conciliation."),

  q2("LWEK-26-03", "LWE-26", "C", "medium",
    "An employee with seven months' service is dismissed after reporting a serious safety hazard. Can she claim unfair dismissal?",
    [
      "No, she has under two years' service",
      "Yes — dismissal for health and safety activities is automatically unfair, so no qualifying period applies",
      "Only if she first brings a wrongful dismissal claim",
      "Only if the hazard was real",
    ],
    1,
    "YES. The AUTOMATICALLY UNFAIR reasons — health and safety, whistleblowing, pregnancy, union activity, asserting a statutory right — need NO qualifying service, and the employer cannot defend on fairness."),

  q2("LWEK-26-04", "LWE-26", "C", "medium",
    "An employer has clear CCTV evidence of theft but dismisses without investigation, hearing or appeal. What is the outcome?",
    [
      "Fair, the reason being plainly good",
      "Unfair on procedure — though compensation may be cut for contributory conduct and under Polkey",
      "Fair, provided notice is paid",
      "Unfair, and reinstatement must be ordered",
    ],
    1,
    "UNFAIR on PROCEDURE. A fair reason does not save a defective process. What the misconduct affects is the REMEDY: the award may be reduced for CONTRIBUTORY CONDUCT and under POLKEY for the chance a fair procedure would have produced the same dismissal."),

  q2("LWEK-26-05", "LWE-26", "C", "medium",
    "What test does a tribunal apply to the employer's decision to dismiss?",
    [
      "Whether the tribunal itself would have dismissed",
      "Whether dismissal fell within the band of reasonable responses open to a reasonable employer",
      "Whether the employee was in fact guilty",
      "Whether the employer acted in good faith",
    ],
    1,
    "The BAND OF REASONABLE RESPONSES. The tribunal does not substitute its own view, which makes the test generous to the employer on the REASON — and is precisely why most claims are won on PROCEDURE instead."),

  q2("LWEK-26-06", "LWE-26", "C", "medium",
    "An employee earns £900 a week; the statutory cap on a week's pay is £700. She is 45 with six complete years' service. What is the basic award?",
    ["£4,200", "£9,450", "£6,300", "£12,150"],
    1,
    "£9,450. Six years all at age 41 or over means 1.5 weeks per year = NINE weeks, and the calculation uses the CAPPED week's pay of £700, not her actual £900. 9 x £700 = £9,450. Her actual pay drives the COMPENSATORY award instead."),

  q2("LWEK-26-07", "LWE-26", "C", "hard",
    "Which dismissals carry an UNCAPPED compensatory award?",
    [
      "All automatically unfair dismissals",
      "Whistleblowing and health and safety dismissals",
      "Dismissals for redundancy",
      "None — the statutory maximum always applies",
    ],
    1,
    "WHISTLEBLOWING and HEALTH AND SAFETY dismissals. Other automatically unfair dismissals remain subject to the annually uprated maximum, so the exception is narrower than \"all automatically unfair\"."),
]

/* ── Chapter 27 · Redundancy ────────────────────────────────────── */

const CH27: AccaQuestion[] = [
  q1("LWEK-27-01", "LWE-27", "C", "easy",
    "What qualifying service is needed for a statutory redundancy payment?",
    ["None", "One year", "Two years", "Four years"],
    2,
    "TWO YEARS' continuous service at the date of dismissal."),

  q1("LWEK-27-02", "LWE-27", "C", "easy",
    "How many years count towards a statutory redundancy payment, and in which direction?",
    [
      "All years, counted forwards",
      "Twenty, counted backwards from the date of dismissal",
      "Twenty, counted forwards from the start of employment",
      "Twelve, matching the maximum notice period",
    ],
    1,
    "TWENTY, counted BACKWARDS from the dismissal date. The direction matters: counting back captures the most recent years, which for an older employee fall in the 1.5-week band and are the best paid."),

  q2("LWEK-27-03", "LWE-27", "C", "medium",
    "An employer wants to dismiss a poor performer and calls it redundancy. Is it?",
    [
      "Yes, an employer may choose how to characterise a dismissal",
      "No — redundancy requires the job or the requirement for that kind of work to have gone, so this is a capability dismissal",
      "Yes, provided a redundancy payment is made",
      "Yes, if the role is later filled by someone else",
    ],
    1,
    "NO. Redundancy requires the BUSINESS, the WORKPLACE, or the requirement for employees to do work of a PARTICULAR KIND to have ceased or diminished. If the work still needs doing this is a CAPABILITY or CONDUCT dismissal in disguise, and it will be unfair because the stated reason is not the real one."),

  q2("LWEK-27-04", "LWE-27", "C", "medium",
    "An employee is 47 with 23 complete years' service. The capped week's pay is £700. What is the statutory redundancy payment?",
    ["£16,100", "£24,150", "£14,000", "£20,300"],
    0,
    "£16,100. Only TWENTY years count, backwards from dismissal — ages 27 to 47. Ages 27-40 give 14 years at 1 week = 14; ages 41-47 give 6 years at 1.5 weeks = 9. Total 23 weeks x £700 = £16,100."),

  q2("LWEK-27-05", "LWE-27", "C", "medium",
    "An employer proposes 60 redundancies at one establishment within 90 days. What consultation is required?",
    [
      "Individual consultation only",
      "Collective consultation beginning at least 30 days before the first dismissal takes effect",
      "Collective consultation beginning at least 45 days before",
      "No consultation, provided redundancy payments are made",
    ],
    1,
    "COLLECTIVE consultation at least 30 DAYS ahead, the threshold for 20 to 99 redundancies. It is 45 days for 100 or more. Failure exposes the employer to a PROTECTIVE AWARD of up to 90 days' pay per affected employee."),

  q2("LWEK-27-06", "LWE-27", "C", "medium",
    "An employer offers a redundant employee a broadly equivalent job at another site. She refuses because a caring responsibility makes the commute impossible. What follows?",
    [
      "The payment is forfeited, the job being suitable",
      "The payment is preserved if the refusal was reasonable in her own circumstances",
      "The employer must withdraw the offer and make a fresh one",
      "She must take a four-week trial before refusing",
    ],
    1,
    "The payment is PRESERVED if the refusal was REASONABLE. Suitability is judged OBJECTIVELY on pay, status, duties and location; the reasonableness of a refusal is judged SUBJECTIVELY on the employee's own circumstances. The two tests are separate."),

  q2("LWEK-27-07", "LWE-27", "C", "hard",
    "There is a genuine redundancy situation, but selection scores were subjective and never shown to the employee, and consultation was a single meeting after the decision was taken. What is the position?",
    [
      "Fair, a genuine redundancy being a fair reason",
      "Unfair — a genuine redundancy still requires fair selection and real consultation",
      "Fair, provided the statutory payment is made",
      "Unfair only if the employee can show a different outcome was likely",
    ],
    1,
    "UNFAIR. The redundancy situation is only the REASON; the employer still needs a fair PROCEDURE — an appropriate pool, objective criteria the employee can see, genuine consultation, and any suitable vacancy offered. The employer then pays the redundancy payment AND unfair dismissal compensation."),
]

export const LWE_KIT_AREA_C: AccaQuestion[] = [
  ...CH23,
  ...CH24,
  ...CH25,
  ...CH26,
  ...CH27,
]
