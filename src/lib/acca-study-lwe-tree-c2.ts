import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area C, second half — dismissal and redundancy.
 * Chapters 25–27 of the LW-ENG reading tree, mapped to syllabus group C2.
 *
 * ── The distinction the whole area turns on ────────────────────
 * WRONGFUL dismissal is a CONTRACT claim: was the correct notice given? UNFAIR
 * dismissal is a STATUTORY claim: was there a fair reason, applied through a fair
 * procedure? A dismissal can be one, the other, both, or neither, and the commonest
 * way to lose marks here is to treat them as two names for the same thing. Every
 * chapter below keeps them apart deliberately.
 *
 * ── On statutory figures ───────────────────────────────────────
 * The STRUCTURAL figures are stable and stated outright: the two-year qualifying
 * period, the 0.5/1/1.5-week redundancy multipliers, the twenty-year cap, twelve
 * weeks' maximum statutory notice, the three-month time limit. The figures that are
 * re-set every year — the cap on a week's pay, and the compensatory award maximum —
 * are named as annually uprated, with the learner directed to the rate the scenario
 * supplies. That is not the jurisdiction-neutral hedge the Global tree uses; it is
 * how the real exam presents them, on a rate sheet.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 25 · C2(a), C2(b), C2(c) ──────────────────────────── */

export const LWE_TREE_25: StudyChapter = {
  id: "LWE-25",
  number: 25,
  paper: "LW",
  area: "C",
  title: "Notice, wrongful dismissal, and constructive dismissal",
  minutes: 17,
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)"],
  intro:
    "Wrongful dismissal asks one narrow question — was the right notice given? — and it is a contract claim, so it does not care whether the employer had a good reason. Understanding that narrowness is what stops you confusing it with unfair dismissal.",
  outcomes: [
    "Calculate the notice due, applying the statutory minimum and any longer contractual period",
    "Explain wrongful dismissal, what is recoverable, and where the claim is brought",
    "Distinguish summary dismissal from wrongful dismissal, and identify when summary dismissal is lawful",
    "Explain constructive dismissal and apply its three requirements",
    "Decide, on given facts, whether a dismissal is wrongful, constructive, or neither",
  ],
  sections: [
    {
      id: "notice-and-wrongful",
      heading: "Notice, and the wrongful dismissal claim",
      blocks: [
        {
          kind: "table",
          caption: "Statutory minimum notice from the employer (ERA 1996 s.86)",
          head: ["Continuous service", "Minimum notice the employer must give"],
          rows: [
            ["Less than **1 month**", "**None** required by statute"],
            ["**1 month** up to **2 years**", "**1 week**"],
            ["**2 years** up to **12 years**", "**1 week for each complete year** of service"],
            ["**12 years** or more", "**12 weeks** — the statutory maximum, however long the service"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Statute sets a floor, not the answer",
          md: "The statutory period is a **minimum**. If the contract provides for **longer** notice, the contract governs and the employer must give the longer period. If the contract provides for **shorter**, the statutory minimum overrides it, because employment rights cannot be contracted out of (chapter 24). So the method is always: find the contractual period, find the statutory minimum, and **apply whichever is longer**. An employee with 15 years' service and a contract giving six months gets **six months**, not twelve weeks.",
        },
        {
          kind: "definition",
          term: "Wrongful dismissal",
          md: "A dismissal **in breach of contract** — most commonly dismissal without the notice the contract or statute required, or dismissal before the end of a **fixed term**. It is a **common law** claim, so it asks only whether the contract was broken, and **not** whether the employer had a good reason. There is **no qualifying period** of service: the right arises from the contract, so it exists from day one.",
        },
        {
          kind: "table",
          caption: "Wrongful and unfair dismissal held apart",
          head: ["", "Wrongful dismissal", "Unfair dismissal"],
          rows: [
            ["**Source of the right**", "The **contract** — common law", "**Statute** — ERA 1996"],
            ["**The question asked**", "Was the correct **notice** given?", "Was there a **fair reason**, applied through a **fair procedure**?"],
            ["**Qualifying service**", "**None**", "Generally **2 years**, with none for automatically unfair reasons"],
            ["**Where it is brought**", "Employment Tribunal **or** the civil courts", "Employment Tribunal **only**"],
            ["**What is recovered**", "**Damages** — normally net pay and benefits for the notice period", "**Basic** and **compensatory** awards, or reinstatement or re-engagement"],
            ["**Employer's good reason**", "**Irrelevant**, unless it amounts to gross misconduct", "**Central** to the claim"],
          ],
        },
        {
          kind: "list",
          title: "What damages for wrongful dismissal cover",
          items: [
            "**Net pay for the notice period** that should have been given — the loss is the notice, not the job.",
            "**Contractual benefits** over that period: pension contributions, company car, health cover, and commission or bonus that was contractual rather than discretionary.",
            "**Nothing for hurt feelings** or for the manner of the dismissal — this is a contract claim.",
            "Subject to the duty to **mitigate**, so earnings from a new job during the notice period reduce the award.",
            "Reduced by anything already paid, including a **payment in lieu of notice**, which is why a proper PILON extinguishes the claim.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Summary dismissal is lawful only for gross misconduct",
          md: "**Summary** dismissal means dismissal **without notice**. It is not automatically wrongful — it is lawful where the employee has committed a **repudiatory breach**, in practice **gross misconduct**: theft, violence, serious dishonesty, gross insubordination, or a serious breach of the duty of fidelity. Where the conduct falls short of that, summary dismissal **is** wrongful. And note the sting: even a lawful summary dismissal for gross misconduct can still be **unfair** if the employer skipped a fair procedure. Getting the reason right does not excuse getting the process wrong.",
        },
      ],
      check: {
        q: "An employee with 15 years' service has a contract giving three months' notice. She is dismissed with four weeks' notice. What is she owed?",
        options: [
          "Nothing more — four weeks exceeds the statutory minimum for her first years",
          "Damages for the balance of three months, since the contractual period is longer than the statutory 12 weeks",
          "Damages for the balance of 12 weeks, the statutory maximum",
          "Damages for 15 weeks, one for each year of service",
        ],
        correct: 1,
        explain:
          "The balance of THREE MONTHS. Apply whichever period is LONGER — here the contractual three months beats the statutory maximum of 12 weeks, so the contract governs. She received four weeks, so the wrongful dismissal damages are the remaining notice pay and contractual benefits, less anything earned in mitigation.",
      },
    },
    {
      id: "constructive",
      heading: "Constructive dismissal",
      blocks: [
        {
          kind: "definition",
          term: "Constructive dismissal",
          md: "Where the **employee resigns** in response to the employer's **fundamental breach** of contract, and the law treats that resignation as a **dismissal by the employer**. It is the route by which an employee who was never actually dismissed can still bring wrongful and unfair dismissal claims.",
        },
        {
          kind: "list",
          style: "number",
          title: "The three requirements — all must be present",
          items: [
            "**A fundamental (repudiatory) breach by the employer.** A breach going to the root of the contract — an unagreed cut in pay, a substantial unilateral change to duties or place of work, or conduct destroying **mutual trust and confidence** (chapter 24). A minor breach will not do.",
            "**The employee resigns in response to that breach.** The breach must be the reason for leaving. An employee who resigns for an unrelated reason and later points to a breach fails here.",
            "**The employee resigns promptly, without affirming the contract.** Delay, or continuing to work as though nothing had happened, can amount to **affirmation** — accepting the breach and losing the right to treat it as a dismissal.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Affirmation is where these claims are usually lost",
          md: "An employee who suffers a serious breach and then works on for months without protest has probably **affirmed** the contract, and the claim fails however bad the original conduct was. What preserves the position is **objecting clearly**, ideally raising a **grievance**, and resigning within a reasonable time. Scenarios build in a delay precisely to test this, so always check the interval between the breach and the resignation, and whether the employee complained.",
        },
        {
          kind: "definition",
          term: "The last straw",
          md: "A **series** of acts, none of them serious enough by itself, can cumulatively destroy trust and confidence. The final act — the \"last straw\" — need not be serious on its own, but it must **contribute** something to the breach and must not be utterly trivial. This is how an employee escapes the objection that each individual incident was minor.",
        },
        {
          kind: "example",
          title: "Running the three requirements against facts",
          scenario:
            "Vantry Ltd cuts Oduya's pay by 20% in March without consulting or obtaining agreement. Oduya writes objecting the same week, and raises a formal grievance in April; Vantry never responds. In May his line manager removes his supervisory duties and gives them to a junior colleague. In June he is criticised in front of the team for a delay that was not his fault. He resigns at the end of June, citing all of it, and claims constructive and wrongful dismissal. He has four years' service and a contract giving two months' notice.",
          steps: [
            { label: "Identify the fundamental breach", detail: "The 20% PAY CUT imposed without agreement is a fundamental breach by itself. Removing supervisory duties and the public criticism each breach MUTUAL TRUST AND CONFIDENCE, and together with the unanswered grievance form a LAST STRAW series culminating in June." },
            { label: "Test whether he resigned in response", detail: "He cited all the matters in his resignation and had objected in writing from the outset, so causation is clear — he left BECAUSE of the employer's conduct, not for an unrelated reason." },
            { label: "Test affirmation, the real risk", detail: "Three months passed between the pay cut and the resignation, which raises affirmation. But he OBJECTED IMMEDIATELY, raised a GRIEVANCE, and the breaches CONTINUED — the June criticism is the last straw. Continuing to work while pursuing a grievance is not affirmation, so the claim survives." },
            { label: "Establish the constructive dismissal", detail: "All three requirements are met, so the resignation is treated as a DISMISSAL BY VANTRY. That opens both routes." },
            { label: "Value the wrongful dismissal claim", detail: "Because he is treated as dismissed and given no notice, he recovers TWO MONTHS' net pay and contractual benefits under the contract, less anything earned in mitigation." },
            { label: "Note the unfair dismissal claim", detail: "With four years' service he exceeds the two-year qualifying period, and Vantry will struggle to show a fair REASON for a dismissal it says never happened — so the unfair claim is strong too (chapter 26). The three-month time limit runs from the resignation date." },
          ],
          result:
            "Constructive dismissal is established, giving Oduya **both** a wrongful dismissal claim worth two months' notice **and** a strong unfair dismissal claim. The immediate written objection and the grievance are what defeat the affirmation argument.",
        },
      ],
      check: {
        q: "An employer imposes a serious unagreed pay cut. The employee says nothing and works on for eight months, then resigns and claims constructive dismissal. What is the likely outcome?",
        options: [
          "The claim succeeds, since the pay cut was a fundamental breach",
          "The claim fails — by working on without protest the employee has affirmed the contract",
          "The claim succeeds, because there is no time limit on constructive dismissal",
          "The claim converts automatically into a wrongful dismissal claim",
        ],
        correct: 1,
        explain:
          "It FAILS on AFFIRMATION. All three requirements must be met: a fundamental breach, resignation in response, and resignation PROMPTLY without affirming. Working on for eight months without objection accepts the breach, however serious it was. Objecting clearly and raising a grievance is what preserves the claim.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating wrongful and unfair dismissal as the same claim.",
      fix: "Wrongful is CONTRACTUAL and asks about notice; unfair is STATUTORY and asks about reason and procedure. A dismissal can be one, both or neither.",
    },
    {
      trap: "Applying the statutory notice table when the contract gives longer.",
      fix: "Statute sets a FLOOR. Apply whichever of the contractual and statutory periods is longer.",
    },
    {
      trap: "Assuming summary dismissal is always wrongful.",
      fix: "It is lawful for GROSS MISCONDUCT — though it may still be unfair if the procedure was defective.",
    },
    {
      trap: "Ignoring the delay between the breach and the resignation.",
      fix: "Delay risks AFFIRMATION, which defeats a constructive dismissal claim however serious the breach.",
    },
    {
      trap: "Claiming damages for injured feelings in wrongful dismissal.",
      fix: "It is a contract claim: the recoverable loss is the notice period's net pay and contractual benefits, subject to mitigation.",
    },
  ],
  keyTerms: [
    { term: "Wrongful dismissal", def: "Dismissal in breach of contract, typically without the required notice; no qualifying service needed." },
    { term: "Summary dismissal", def: "Dismissal without notice; lawful only where the employee's conduct is a repudiatory breach, in practice gross misconduct." },
    { term: "Payment in lieu of notice", def: "Paying the notice period instead of working it; a proper PILON extinguishes a wrongful dismissal claim." },
    { term: "Constructive dismissal", def: "Resignation in response to the employer's fundamental breach, treated in law as a dismissal by the employer." },
    { term: "Affirmation", def: "Accepting a breach by delay or by continuing to work as normal, which defeats a constructive dismissal claim." },
    { term: "Last straw", def: "A final, possibly minor act completing a cumulative breach of trust and confidence; it must contribute something and not be trivial." },
    { term: "Mitigation", def: "The duty to reduce loss, so earnings from new work during the notice period reduce wrongful dismissal damages." },
  ],
  summary: [
    "Statutory minimum notice is one week from a month's service, then a week per year to a twelve-week maximum — but a longer contractual period governs.",
    "Wrongful dismissal is a contract claim about notice, needs no qualifying service, and ignores the employer's reason.",
    "Damages are the notice period's net pay and contractual benefits, subject to mitigation, with nothing for hurt feelings.",
    "Summary dismissal is lawful for gross misconduct, but may still be procedurally unfair.",
    "Constructive dismissal needs a fundamental breach, resignation in response, and no affirmation — and affirmation is where claims are usually lost.",
  ],
  knowledgeDiagnostic: [
    { q: "How do you find the notice period due?", a: "Compare the contractual period with the statutory minimum and apply whichever is longer." },
    { q: "What are the three requirements of constructive dismissal?", a: "A fundamental breach by the employer, resignation in response to it, and resignation promptly without affirming the contract." },
    { q: "Is a summary dismissal for theft wrongful?", a: "No. Theft is gross misconduct, a repudiatory breach, so dismissal without notice is lawful — though it could still be unfair if the procedure was defective." },
    { q: "What can be recovered in wrongful dismissal?", a: "Net pay and contractual benefits for the notice period, less anything earned in mitigation and less any payment in lieu already made." },
  ],
}

/* ── Chapter 26 · C2(d), C2(e) ─────────────────────────────────── */

export const LWE_TREE_26: StudyChapter = {
  id: "LWE-26",
  number: 26,
  paper: "LW",
  area: "C",
  title: "Unfair dismissal: reasons, procedure and remedies",
  minutes: 18,
  syllabusRefs: ["C2(d)", "C2(e)"],
  intro:
    "Unfair dismissal has two halves and an employer must win both: a fair reason, and a fair procedure for acting on it. A genuinely guilty employee who was dismissed without a hearing still wins — which is the single most counter-intuitive point in Area C.",
  outcomes: [
    "State who can claim, and identify the reasons that need no qualifying service",
    "List the five potentially fair reasons and the automatically unfair ones",
    "Explain the procedural requirements and the band of reasonable responses",
    "Set out the three remedies and how compensation is built up",
    "Decide whether a dismissal was fair, and value the claim",
  ],
  sections: [
    {
      id: "who-and-why",
      heading: "Who can claim, and the reason for dismissal",
      blocks: [
        {
          kind: "list",
          title: "What a claimant must establish first",
          items: [
            "**Employee status** — not a worker, and not genuinely self-employed (chapter 23).",
            "**Two years' continuous service**, unless the reason is one of the automatically unfair ones below, which need **no qualifying period at all**.",
            "**A dismissal** — actual, expiry of a fixed term without renewal, or **constructive** (chapter 25).",
            "**A claim brought in time**: within **three months less one day** of the effective date of termination, after going through **ACAS early conciliation**, which is mandatory.",
          ],
        },
        {
          kind: "table",
          caption: "The five potentially fair reasons (ERA 1996 s.98)",
          head: ["Reason", "What the employer must show"],
          rows: [
            ["**Capability or qualifications**", "Genuine incapacity or lack of a required qualification — with **warnings, support and time to improve** where it is poor performance rather than incapacity"],
            ["**Conduct**", "A **genuine belief on reasonable grounds**, after a **reasonable investigation**, that the employee did it. Note the employer need not prove the misconduct actually happened"],
            ["**Redundancy**", "A genuine redundancy situation (chapter 27), with fair selection and consultation"],
            ["**Statutory restriction**", "That continuing to employ would break the law — a driver losing their licence, or an expired right to work"],
            ["**Some other substantial reason (SOSR)**", "A substantial reason of a kind justifying dismissal — a genuine business reorganisation, or an irretrievable personality breakdown"],
          ],
        },
        {
          kind: "list",
          title: "Automatically unfair reasons — no qualifying service required",
          items: [
            "**Pregnancy, childbirth, maternity** or taking family leave.",
            "**Trade union** membership, non-membership, or taking part in lawful union activities.",
            "**Whistleblowing** — making a protected disclosure.",
            "**Asserting a statutory right**, such as claiming the minimum wage or paid holiday.",
            "**Health and safety** activities, including refusing to work in circumstances of serious and imminent danger.",
            "A **TUPE** transfer, where the dismissal is connected with it and there is no economic, technical or organisational reason.",
            "**Jury service**, and **part-time or fixed-term** worker status.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Automatically unfair changes the whole analysis",
          md: "Where the reason is automatically unfair, the employer **cannot** defend on fairness at all — the dismissal is unfair full stop, and **no qualifying service** is needed. So the first thing to do in any scenario is check the reason against that list. An employee dismissed after three weeks for raising a health and safety concern has a claim; the same employee dismissed after three weeks for poor performance does not, because they lack the two years.",
        },
      ],
      check: {
        q: "An employee with seven months' service is dismissed after reporting a serious safety hazard. Can she claim unfair dismissal?",
        options: [
          "No — she has less than two years' continuous service",
          "Yes — dismissal for health and safety activities is automatically unfair, so no qualifying period applies",
          "Only if she first brings a wrongful dismissal claim",
          "Only if the hazard turns out to have been real",
        ],
        correct: 1,
        explain:
          "YES. Dismissal for health and safety activities is AUTOMATICALLY UNFAIR, and the automatically unfair reasons need NO qualifying service. The two-year requirement applies only to ordinary unfair dismissal. The employer cannot defend on fairness, and it does not turn on whether the hazard was ultimately made out.",
      },
    },
    {
      id: "procedure-remedies",
      heading: "Fair procedure, and the remedies",
      blocks: [
        {
          kind: "definition",
          term: "The band of reasonable responses",
          md: "The tribunal does **not** ask what it would have done, or whether the employer was right. It asks whether dismissal fell within the **range of responses open to a reasonable employer** in those circumstances. This is a deliberately generous test for the employer on the *reason* — which makes **procedure** the ground on which most claims are actually won.",
        },
        {
          kind: "list",
          style: "number",
          title: "What a fair procedure requires",
          items: [
            "A **reasonable investigation** before any decision is taken.",
            "**Written notification** of the allegation, in enough detail for the employee to answer it, and in advance of the hearing.",
            "A **hearing** at which the employee can put their case, accompanied where the right applies.",
            "A decision by someone **suitably impartial**, ideally not the investigator.",
            "**Warnings** where the issue is conduct or performance, unless the misconduct is gross.",
            "Consideration of **alternatives** to dismissal, including redeployment.",
            "A **right of appeal**, heard by someone more senior where possible.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A fair reason with an unfair procedure is still unfair",
          md: "This is the point examiners test most often. An employee who genuinely stole from the till, dismissed without an investigation, without being told the allegation and without a hearing, **wins** an unfair dismissal claim — the reason was fair but the process was not. What the misconduct does affect is **compensation**: the award can be reduced, sometimes to nil, for **contributory conduct**, and reduced under *Polkey* principles to reflect the chance that a fair procedure would have led to dismissal anyway. So the employee wins the claim and may recover very little.",
        },
        {
          kind: "table",
          caption: "The three remedies",
          head: ["Remedy", "What it does", "In practice"],
          rows: [
            ["**Reinstatement**", "The employee returns to the **same job** as if never dismissed, with arrears of pay and continuity preserved", "Rare — the tribunal must consider whether it is practicable and whether the employee contributed to the dismissal"],
            ["**Re-engagement**", "The employee returns to a **comparable** job with the employer or an associated employer", "Also rare, for the same reasons"],
            ["**Compensation**", "A **basic award** plus a **compensatory award**", "The overwhelmingly usual outcome"],
          ],
        },
        {
          kind: "table",
          caption: "How compensation is built",
          head: ["Element", "How it is calculated"],
          rows: [
            ["**Basic award**", "Computed like statutory redundancy pay (chapter 27): **0.5, 1 or 1.5 weeks' pay** per complete year by age band, capped at **20 years**, using the annually uprated cap on a week's pay"],
            ["**Compensatory award**", "The employee's **actual loss** — lost net earnings to the date of hearing, future loss, lost pension and benefits, and loss of statutory rights — subject to an **annually uprated maximum**, and to the duty to **mitigate**"],
            ["**Reductions**", "For **contributory conduct**, for **failure to mitigate**, for a *Polkey* chance that a fair procedure would have produced the same result, and for an unreasonable failure to follow the **ACAS Code** (which can also increase an award against the employer)"],
            ["**No cap**", "Where the dismissal was for **whistleblowing** or on **health and safety** grounds, the compensatory award is **uncapped**"],
          ],
        },
        {
          kind: "example",
          title: "Deciding fairness and valuing the claim",
          scenario:
            "Kestrel Foods suspects Warriner, a stock controller with six years' service, of taking stock. The operations director reviews CCTV, concludes he is guilty, and dismisses him by letter the same afternoon. Warriner is not told the allegation beforehand, has no hearing, and is offered no appeal. The CCTV does in fact show him removing goods, though he says he had permission to take damaged stock and two colleagues would have supported him. His gross weekly pay is above the annual cap on a week's pay. He is 45. He finds a similar job two months later at slightly lower pay.",
          steps: [
            { label: "Identify the reason and test it", detail: "The reason is CONDUCT, a potentially fair reason. The employer needs a genuine belief on reasonable grounds after a REASONABLE INVESTIGATION. Reviewing the CCTV supports genuine belief, but failing to interview the two colleagues who would have supported his explanation makes the investigation unreasonable." },
            { label: "Test the procedure", detail: "No advance notification of the allegation, NO HEARING, no chance to give his explanation, and NO APPEAL. This is a comprehensive procedural failure and it alone makes the dismissal UNFAIR, whatever the CCTV shows." },
            { label: "Conclude on liability", detail: "The dismissal is UNFAIR. He has six years' service, well over the two-year qualifying period, and must claim within three months less one day of the termination date after ACAS early conciliation." },
            { label: "Build the basic award", detail: "Six complete years, all at age 41 or over on these facts, so 1.5 weeks per year = NINE weeks' pay, using the CAPPED week's pay figure rather than his actual higher pay." },
            { label: "Build the compensatory award", detail: "Two months' lost net earnings to the new job, the ongoing shortfall from the lower pay, lost pension over the period, and an amount for loss of statutory rights. He MITIGATED promptly, so no reduction on that ground." },
            { label: "Apply the reductions", detail: "This is where the award shrinks. If he did take stock without permission there is CONTRIBUTORY CONDUCT, and a POLKEY reduction reflects the chance that a fair procedure — proper investigation and a hearing — would have led to dismissal anyway. Both can cut the compensatory award substantially, and contributory conduct can reduce the basic award too." },
          ],
          result:
            "Warriner **wins** on the procedural failures, but his remedy may be modest once contributory conduct and the *Polkey* reduction are applied. The lesson for the employer is that the CCTV was never the problem — **skipping the hearing** was.",
        },
      ],
      check: {
        q: "An employer has clear evidence of theft but dismisses without an investigation, hearing or appeal. What is the outcome?",
        options: [
          "Fair, because the reason for dismissal was plainly a good one",
          "Unfair on procedure — though compensation may be cut heavily for contributory conduct and under Polkey",
          "Fair, provided the employer pays notice",
          "Unfair, and the tribunal must order reinstatement",
        ],
        correct: 1,
        explain:
          "UNFAIR on PROCEDURE. A fair reason does not save a defective process, so the claim succeeds even against clear evidence. What the misconduct affects is the REMEDY: the award can be reduced for CONTRIBUTORY CONDUCT and under POLKEY to reflect the chance a fair procedure would have produced the same dismissal. Reinstatement is never mandatory.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Rejecting a claim for want of two years' service without checking the reason.",
      fix: "The automatically unfair reasons — whistleblowing, pregnancy, union activity, health and safety, asserting a statutory right — need NO qualifying service.",
    },
    {
      trap: "Holding a dismissal fair because the employee was actually guilty.",
      fix: "A fair reason with an unfair PROCEDURE is still unfair. Guilt affects compensation, not liability.",
    },
    {
      trap: "Asking whether the tribunal would have dismissed.",
      fix: "The test is the BAND OF REASONABLE RESPONSES — whether dismissal was open to a reasonable employer.",
    },
    {
      trap: "Using the employee's actual pay in the basic award when it exceeds the cap.",
      fix: "The basic award uses the annually uprated CAP on a week's pay. Actual pay drives the compensatory award instead.",
    },
    {
      trap: "Treating reinstatement as the normal remedy.",
      fix: "Compensation is the usual outcome; reinstatement and re-engagement are rare and depend on practicability.",
    },
  ],
  keyTerms: [
    { term: "Potentially fair reasons", def: "Capability or qualifications, conduct, redundancy, statutory restriction, and some other substantial reason." },
    { term: "Automatically unfair dismissal", def: "Dismissal for a prohibited reason such as whistleblowing or pregnancy; unfair regardless of procedure and with no qualifying service." },
    { term: "Band of reasonable responses", def: "The test asking whether dismissal was within the range open to a reasonable employer, not what the tribunal would have done." },
    { term: "Basic award", def: "Compensation calculated like statutory redundancy pay, using the capped week's pay and a twenty-year maximum." },
    { term: "Compensatory award", def: "Compensation for actual loss, subject to an annually uprated maximum and the duty to mitigate; uncapped for whistleblowing and health and safety dismissals." },
    { term: "Polkey reduction", def: "A reduction reflecting the chance that a fair procedure would have led to dismissal anyway." },
    { term: "ACAS early conciliation", def: "The mandatory step before a tribunal claim can be brought." },
  ],
  summary: [
    "Ordinary unfair dismissal needs employee status, two years' service, a dismissal and a claim within three months less one day.",
    "The five potentially fair reasons are capability, conduct, redundancy, statutory restriction and some other substantial reason.",
    "Automatically unfair reasons need no qualifying service and cannot be defended on fairness.",
    "A fair reason still requires a fair procedure — investigation, notification, hearing, and appeal.",
    "Compensation is a basic award plus a compensatory award, reduced for contributory conduct, failure to mitigate and the Polkey chance.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five potentially fair reasons for dismissal.", a: "Capability or qualifications, conduct, redundancy, statutory restriction, and some other substantial reason." },
    { q: "Why can an employee with three months' service sometimes claim unfair dismissal?", a: "Because the reason is automatically unfair — whistleblowing, pregnancy, union activity, health and safety or asserting a statutory right — and those need no qualifying service." },
    { q: "State the test the tribunal applies to the employer's decision.", a: "Whether dismissal fell within the band of reasonable responses open to a reasonable employer, not whether the tribunal would have dismissed." },
    { q: "What is a Polkey reduction?", a: "A reduction in compensation reflecting the chance that the employee would have been dismissed anyway had a fair procedure been followed." },
    { q: "Which dismissals carry an uncapped compensatory award?", a: "Whistleblowing dismissals and dismissals on health and safety grounds." },
  ],
}

/* ── Chapter 27 · C2(f) ────────────────────────────────────────── */

export const LWE_TREE_27: StudyChapter = {
  id: "LWE-27",
  number: 27,
  paper: "LW",
  area: "C",
  title: "Redundancy",
  minutes: 16,
  syllabusRefs: ["C2(f)"],
  intro:
    "Redundancy is about the disappearance of a job, not the shortcomings of a person — and an employer who blurs that line either pays for a redundancy that was really a dismissal, or loses an unfair dismissal claim it need never have faced.",
  outcomes: [
    "Define redundancy and identify the three situations that constitute it",
    "State who qualifies for a statutory redundancy payment and calculate it",
    "Explain fair selection and the consultation obligations",
    "Explain suitable alternative employment and the effect of refusing it",
    "Identify when a redundancy dismissal becomes an unfair dismissal",
  ],
  sections: [
    {
      id: "what-redundancy-is",
      heading: "What counts as redundancy, and what it pays",
      blocks: [
        {
          kind: "definition",
          term: "Redundancy (ERA 1996 s.139)",
          md: "Under **s.139** a dismissal is by reason of redundancy where it is **wholly or mainly attributable** to one of three things: the employer has **ceased to carry on the business**; the employer has **ceased to carry on the business at the place** where the employee was employed; or the **requirement for employees to carry out work of a particular kind** has **ceased or diminished**, or is expected to.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "It is the JOB that goes, not the person",
          md: "The third limb is the one that matters in practice and the one employers misuse. The test is whether the requirement for employees to do **work of a particular kind** has diminished — so if the work still needs doing and the employer simply wants a different person doing it, that is **not** redundancy. Dismissing a poor performer and calling it redundancy is a **conduct or capability** dismissal in disguise, and it will be unfair because the stated reason is not the real one. Equally, a genuine reduction in the *number* of people needed is redundancy even if total output is unchanged.",
        },
        {
          kind: "list",
          title: "Who qualifies for a statutory redundancy payment",
          items: [
            "An **employee** — not a worker, and not self-employed.",
            "With **two years' continuous service** at the date of dismissal.",
            "Who is **dismissed** by reason of redundancy, or **laid off or kept on short time** for the qualifying period.",
            "Who has **not unreasonably refused** an offer of **suitable alternative employment**.",
            "Who claims within **six months** of the termination date, extendable to twelve in limited circumstances.",
          ],
        },
        {
          kind: "table",
          caption: "Calculating the statutory redundancy payment",
          head: ["Age during the year of service", "Entitlement for that year"],
          rows: [
            ["Under **22**", "**half a week's** pay"],
            ["**22 to 40** inclusive", "**one week's** pay"],
            ["**41** and over", "**one and a half weeks'** pay"],
          ],
        },
        {
          kind: "list",
          title: "The three limits on the calculation",
          items: [
            "Only **complete years** of service count.",
            "A maximum of **20 years** is counted, working **backwards from the date of dismissal** — so the most recent, best-paid years are the ones that count.",
            "A week's pay is subject to a **statutory cap that is uprated annually**, so an employee earning above it is paid on the capped figure. The exam supplies the current cap; the method is what carries the marks.",
          ],
        },
        {
          kind: "example",
          title: "Calculating a redundancy payment",
          scenario:
            "Halstead Engineering closes its Derby plant. Prentice has worked there for 23 complete years and is dismissed at age 47. His gross weekly pay is £900; assume the statutory cap on a week's pay for the year in question is £700. He is offered a job at the Nottingham plant, 15 miles away, on identical pay and duties, and refuses it because he prefers not to commute.",
          steps: [
            { label: "Confirm a redundancy situation exists", detail: "The employer has CEASED TO CARRY ON THE BUSINESS AT THE PLACE where Prentice was employed — the second limb of s.139. That is a genuine redundancy situation." },
            { label: "Cap the years", detail: "He has 23 complete years but only TWENTY count, taken BACKWARDS from the date of dismissal. So the years counted run from age 27 to 47." },
            { label: "Split the counted years by age band", detail: "Of those twenty years, the ones falling in the 22-40 band are ages 27 to 40 = 14 years at ONE week each. The years at 41 and over are ages 41 to 47 = 6 years at ONE AND A HALF weeks each = 9 weeks. Total 14 + 9 = 23 weeks' pay." },
            { label: "Apply the cap to a week's pay", detail: "His actual £900 is above the £700 cap, so the calculation uses £700. 23 weeks x £700 = £16,100." },
            { label: "Test the refusal of alternative work", detail: "The Nottingham job is on IDENTICAL pay and duties, 15 miles away. That is likely SUITABLE, and refusing it because of a preference not to commute is likely UNREASONABLE — which would mean he LOSES the redundancy payment entirely." },
            { label: "State the conclusion properly", detail: "If the refusal is unreasonable, the entitlement is LOST despite the genuine redundancy. If a tribunal accepted the refusal was reasonable on his personal circumstances, the payment is £16,100." },
          ],
          result:
            "The calculation is **£16,100**, but the live issue is the **refusal**: an unreasonable refusal of suitable alternative employment forfeits the payment altogether. Note how the twenty-year cap taken *backwards* pushed more years into the 1.5-week band.",
        },
      ],
      check: {
        q: "An employee has 25 complete years' service. How many years count towards the statutory redundancy payment?",
        options: [
          "All 25",
          "20, counted backwards from the date of dismissal",
          "20, counted forwards from the date employment began",
          "12, matching the maximum notice period",
        ],
        correct: 1,
        explain:
          "TWENTY, counted BACKWARDS from the dismissal date. The direction matters: counting back captures the most recent years, which for an older employee fall in the 1.5-weeks-per-year band and are the best paid. Counting forwards from the start would take the cheapest years and understate the payment.",
      },
    },
    {
      id: "procedure-and-fairness",
      heading: "Selection, consultation, and when redundancy becomes unfair",
      blocks: [
        {
          kind: "list",
          title: "Fair selection",
          items: [
            "Identify an appropriate **selection pool** — the group of employees doing work of the kind that has diminished.",
            "Apply **objective, measurable criteria**: attendance, disciplinary record, skills and qualifications, performance assessed on evidence, and length of service as one factor among several.",
            "**Score consistently** and be able to show the scoring, since an employee is entitled to know how they were assessed.",
            "**Avoid criteria that discriminate**, and avoid selection for an automatically unfair reason — selecting the pregnant employee or the union representative makes the dismissal automatically unfair (chapter 26).",
            "Do **not** rely on \"last in, first out\" alone, which risks age discrimination.",
          ],
        },
        {
          kind: "table",
          caption: "Consultation obligations",
          head: ["Situation", "What is required"],
          rows: [
            ["**Any** redundancy", "Meaningful **individual consultation** — the employee is told they are at risk, sees their scores, and can respond before the decision is final"],
            ["**20 to 99** redundancies at one establishment within 90 days", "**Collective consultation** with recognised union or elected representatives, beginning at least **30 days** before the first dismissal takes effect"],
            ["**100 or more** in the same period", "Collective consultation beginning at least **45 days** before the first dismissal takes effect"],
            ["Failure to consult collectively", "A **protective award** of up to **90 days' pay** per affected employee, plus notification duties to the Secretary of State"],
          ],
        },
        {
          kind: "definition",
          term: "Suitable alternative employment",
          md: "The employer must **offer** any suitable alternative vacancy it has. Suitability is judged **objectively** — pay, status, duties, hours and location. Whether a refusal is **reasonable** is judged **subjectively**, on the employee's own circumstances. An unreasonable refusal of a suitable offer **forfeits** the redundancy payment. An employee who accepts is entitled to a **four-week trial period**, and leaving within it does not lose the entitlement.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Two tests, two viewpoints — the distinction earns marks",
          md: "Suitability is **objective**: is this job broadly equivalent in pay, status and location? Reasonableness of refusal is **subjective**: given *this* employee's circumstances — caring responsibilities, a child's schooling, a medical condition — was refusing reasonable? So a job can be perfectly suitable and the refusal still reasonable, in which case the payment is preserved. Answers that collapse the two into one test lose the mark.",
        },
        {
          kind: "list",
          title: "When a redundancy dismissal is nonetheless UNFAIR",
          items: [
            "There was **no genuine redundancy situation** — the work still needed doing and the real reason was conduct or capability.",
            "**Selection was unfair**: an inappropriate pool, subjective or inconsistently applied criteria, or scores the employee never saw.",
            "Selection was for an **automatically unfair reason**, which makes the dismissal automatically unfair regardless of the redundancy.",
            "**Consultation was absent or a sham** — a decision already taken and presented as a consultation.",
            "**Suitable alternative employment was not offered** although a vacancy existed.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A genuine redundancy plus a bad process equals unfair dismissal",
          md: "The pattern mirrors chapter 26 exactly. A real redundancy situation is only the **reason**; the employer still needs a **fair procedure** — proper pool, objective criteria, real consultation, and alternative work offered. Get the reason right and the process wrong and the employer pays the redundancy payment **and** unfair dismissal compensation. That double exposure is what scenarios are built to reveal.",
        },
      ],
      check: {
        q: "An employer offers a redundant employee a broadly equivalent job at another site. The employee refuses because of a caring responsibility that makes the commute impossible. What follows?",
        options: [
          "The redundancy payment is forfeited, since the job was suitable",
          "The payment is preserved if the refusal was reasonable in the employee's own circumstances — suitability and reasonableness are separate tests",
          "The employer must withdraw the offer and make a fresh one",
          "The employee must take the job for a four-week trial before refusing",
        ],
        correct: 1,
        explain:
          "The payment is PRESERVED if the refusal was REASONABLE. Suitability is judged OBJECTIVELY on pay, status, duties and location; the reasonableness of a refusal is judged SUBJECTIVELY on the employee's own circumstances. A caring responsibility making the commute impossible can make refusal of a perfectly suitable job reasonable.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Calling a dismissal redundancy when the work still needs doing.",
      fix: "Redundancy requires the JOB or the requirement for that kind of work to have gone. Replacing a poor performer is a capability dismissal.",
    },
    {
      trap: "Counting the twenty years forwards from the start of employment.",
      fix: "Count BACKWARDS from the dismissal date, which captures the most recent and best-paid years.",
    },
    {
      trap: "Using actual pay where it exceeds the statutory cap.",
      fix: "A week's pay is capped at the annually uprated figure the exam supplies.",
    },
    {
      trap: "Treating suitability and reasonableness of refusal as one test.",
      fix: "Suitability is objective; the reasonableness of refusal is subjective to the employee's circumstances.",
    },
    {
      trap: "Assuming a genuine redundancy cannot be unfair.",
      fix: "It can. Unfair selection, sham consultation or a failure to offer alternative work all make it unfair.",
    },
  ],
  keyTerms: [
    { term: "Redundancy", def: "Dismissal wholly or mainly attributable to business closure, closure of the workplace, or a diminished requirement for employees to do work of a particular kind." },
    { term: "Statutory redundancy payment", def: "0.5, 1 or 1.5 weeks' pay per complete year by age band, capped at 20 years and at the annually uprated week's pay." },
    { term: "Selection pool", def: "The group of employees doing the kind of work that has diminished, from which selection is made." },
    { term: "Collective consultation", def: "Consultation with representatives, required 30 days ahead for 20-99 redundancies and 45 days for 100 or more." },
    { term: "Protective award", def: "Up to 90 days' pay per affected employee for failure to consult collectively." },
    { term: "Suitable alternative employment", def: "A vacancy the employer must offer; suitability is objective and the reasonableness of a refusal subjective." },
    { term: "Trial period", def: "The four weeks an employee may try alternative work without losing the redundancy entitlement." },
  ],
  summary: [
    "Redundancy means the business, the workplace or the requirement for that kind of work has gone — the job, not the person.",
    "A statutory payment needs employee status, two years' service and no unreasonable refusal of suitable alternative work.",
    "The payment is 0.5, 1 or 1.5 weeks' pay per year by age band, capped at 20 years counted backwards and at the uprated week's pay.",
    "Collective consultation is required 30 days ahead for 20-99 redundancies and 45 days for 100 or more.",
    "A genuine redundancy is still unfair if selection, consultation or the offer of alternative work was defective.",
  ],
  knowledgeDiagnostic: [
    { q: "State the three situations amounting to redundancy.", a: "Cessation of the business, cessation of the business at the employee's place of work, or a ceased or diminished requirement for employees to do work of a particular kind." },
    { q: "How is the statutory redundancy payment calculated?", a: "Half a week's pay per year under 22, one week from 22 to 40, one and a half weeks at 41 and over; maximum 20 years counted backwards, on the capped week's pay." },
    { q: "When does collective consultation apply and for how long?", a: "20 to 99 redundancies at one establishment in 90 days requires 30 days; 100 or more requires 45 days before the first dismissal takes effect." },
    { q: "Distinguish suitability from reasonableness of refusal.", a: "Suitability is objective — pay, status, duties, hours, location. Reasonableness of refusal is subjective to the employee's own circumstances." },
    { q: "Give three ways a genuine redundancy can still be unfair.", a: "An inappropriate pool or subjective selection criteria, sham or absent consultation, and failing to offer an existing suitable vacancy." },
  ],
}

export const LWE_TREE_AREA_C_PART2: StudyChapter[] = [LWE_TREE_25, LWE_TREE_26, LWE_TREE_27]
