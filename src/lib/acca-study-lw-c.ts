import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW · Area C — Employment law.
 * Employment status, sources of contractual terms, duties of the parties,
 * wrongful vs unfair dismissal, redundancy and discrimination basics.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const LW_C: StudyChapter = {
  paper: "LW",
  area: "C",
  title: "Employment law",
  minutes: 15,
  intro: "One question decides which rights a worker even has: are they an employee, or an independent contractor? Get that wrong and every other rule in this area points at the wrong person.",
  outcomes: [
    "Distinguish an employee (contract of service) from an independent contractor (contract for services) using the control, integration and multiple tests",
    "Identify the sources of terms in a contract of employment — express, implied and statutory",
    "State the principal duties owed by employer and employee",
    "Distinguish wrongful dismissal (a breach of contract claim) from unfair dismissal (a statutory claim)",
    "Explain the potentially fair reasons for dismissal and how the fairness test is applied",
    "Explain the definition of redundancy, the duty to consult, and the basics of discrimination law",
  ],
  sections: [
    {
      id: "status",
      heading: "Employee or independent contractor — and why it matters",
      blocks: [
        { kind: "text", md: "Two people can do identical work in the same building and have completely different legal rights. The difference is **employment status**. An **employee** works under a **contract of service** — they serve the business. An **independent contractor** (a self-employed person) works under a **contract for services** — they supply a service to the business, like a plumber called in to fix a leak." },
        { kind: "text", md: "This is not a technicality. Almost every protection in employment law — unfair dismissal, redundancy pay, statutory notice, sick pay, the employer being **vicariously liable** for your wrongs — is reserved for **employees**. An independent contractor has the terms of their commercial contract and little else. Tax and national insurance are collected differently too. So before you can answer any employment question, you must first settle: is this person an employee?" },
        { kind: "callout", tone: "key", title: "Why status is the gateway", md: "Only an **employee** can claim unfair dismissal or a statutory redundancy payment, and only an employee's employer is normally **vicariously liable** for torts committed in the course of employment. Label the relationship wrong and you apply the wrong body of law." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Contract of service vs contract for services",
          caption: "The label the parties use is not decisive — the courts look at the substance.",
          data: {
            leftTitle: "Employee (contract OF service)",
            rightTitle: "Contractor (contract FOR services)",
            rows: [
              { aspect: "Nature", left: "Serves the business", right: "Supplies a service to it" },
              { aspect: "Control", left: "Told what, how and when", right: "Decides how the job is done" },
              { aspect: "Integration", left: "Part of the organisation", right: "Runs their own business" },
              { aspect: "Financial risk", left: "Paid a wage, no risk of loss", right: "Bears risk, can profit from sound management" },
              { aspect: "Equipment", left: "Employer provides tools", right: "Provides own tools" },
              { aspect: "Key rights", left: "Unfair dismissal, redundancy, notice", right: "Only the commercial contract terms" },
            ],
          },
        } },
      ],
    },
    {
      id: "tests",
      heading: "The tests the courts use",
      blocks: [
        { kind: "text", md: "Because parties sometimes label a relationship to suit themselves (often to dodge tax or duties), the courts decide status by looking at the reality. No single question settles it; the law has moved through three tests, and today uses the last as an umbrella over the others." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three tests of employment status",
          caption: "Modern courts apply the multiple test, weighing all factors together.",
          data: {
            items: [
              { title: "Control test", sub: "Can the employer control not just WHAT is done but HOW, when and where? High control points to employment." },
              { title: "Integration test", sub: "Is the person part-and-parcel of the organisation, or merely an accessory running their own business?" },
              { title: "Economic reality test", sub: "Is the person in business on their own account? Do they risk their own money, provide their own tools, and profit from good management?" },
              { title: "Multiple (mixed) test", sub: "Weigh ALL factors — control, mutuality of obligation, personal service, risk — as a whole. Today's dominant approach." },
            ],
          },
        } },
        { kind: "text", md: "The **control test** was the earliest: a master could tell a servant how to do the job. It struggles with skilled staff — a hospital cannot tell a surgeon how to operate, yet the surgeon is plainly an employee. The **integration test** asked whether the work was integrated into the business or only accessory to it. The **economic reality (multiple) test** is the modern umbrella: a person is likely an employee if they must give **personal service**, there is **mutuality of obligation** (the employer must offer work and the worker must accept it), and the other factors — control, financial risk, provision of tools — point the same way. The right to send a **substitute** to do the work strongly suggests a contract *for* services." },
        { kind: "callout", tone: "tip", md: "Two factors carry special weight in the multiple test: **personal service** (an employee must do the work themselves) and **mutuality of obligation** (an ongoing duty to offer and accept work). Where a person can freely substitute someone else, or is under no obligation to accept work, they are usually **not** an employee." },
      ],
      check: {
        q: "Ravi drives for a delivery firm. He must wear its uniform, follow its routes, work the shifts it sets, and cannot send anyone else in his place. The firm calls him 'self-employed'. Applying the multiple test, what is his likely status?",
        options: [
          "Independent contractor, because the contract calls him self-employed",
          "Employee, because control, personal service and integration all point that way",
          "Independent contractor, because delivery drivers are always self-employed",
          "It cannot be determined without knowing how he is taxed",
        ],
        correct: 1,
        explain: "The label the parties choose is not decisive — courts look at the substance. High control (uniform, set routes and shifts), the requirement of personal service (no substitution) and integration into the firm all point to a contract OF service. He is likely an employee whatever the contract calls him.",
      },
    },
    {
      id: "terms",
      heading: "Where the terms come from — and the duties",
      blocks: [
        { kind: "text", md: "Once someone is an employee, their contract is built from three sources of terms. **Express terms** are those actually agreed, in writing or orally — pay, hours, job title, notice. **Implied terms** are read in by the courts even though no one wrote them down, because they are obvious or reflect the parties' relationship. **Statutory terms** are imposed by law and cannot be reduced below the statutory floor — for example minimum notice, the minimum wage and paid holiday." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Three sources of contractual terms",
          data: {
            items: [
              { title: "Express terms", sub: "Actually agreed — pay, hours, duties, notice. Written statement of particulars given to the employee." },
              { title: "Implied terms", sub: "Read in by the courts — e.g. mutual trust and confidence, duty of care, obedience, fidelity." },
              { title: "Statutory terms", sub: "Imposed by law and cannot be undercut — minimum notice, minimum wage, paid holiday, discrimination protection." },
            ],
          },
        } },
        { kind: "text", md: "The implied terms come as a matched pair of duties. The **employer** must: pay agreed wages, take reasonable care for the employee's safety, and — above all — maintain the relationship of **mutual trust and confidence**. There is generally **no** implied duty to provide work (paying the wage is usually enough), though there are exceptions such as piece-workers and roles where reputation depends on doing the job." },
        { kind: "table", caption: "The implied duties of each party", head: ["Employer's duties", "Employee's duties"], rows: [
          ["Pay agreed wages", "Obey lawful and reasonable orders"],
          ["Take reasonable care for safety", "Use reasonable care and skill in the work"],
          ["Maintain mutual trust and confidence", "Act in good faith / fidelity (no competing, no secret profit)"],
          ["Provide indemnity for proper expenses", "Give personal service and be ready and willing to work"],
        ] },
        { kind: "callout", tone: "warn", title: "Trust and confidence cuts both ways", md: "A serious breach of **mutual trust and confidence** by the employer — bullying, humiliating a worker, failing to support them — can entitle the employee to resign and claim **constructive dismissal**, treating themselves as dismissed by the employer's own conduct." },
      ],
    },
    {
      id: "wrongful-unfair",
      heading: "Wrongful vs unfair dismissal",
      blocks: [
        { kind: "text", md: "Students confuse these two constantly, yet they come from completely different places. **Wrongful dismissal** is a **common law** claim for **breach of contract** — the employer dismissed the employee **without giving the proper notice** (or pay in lieu) that the contract required, and the dismissal was not justified by the employee's own gross misconduct. It is about the **manner** of dismissal, not the reason." },
        { kind: "text", md: "**Unfair dismissal** is a **statutory** claim. It asks whether the employer had a **fair reason** to dismiss and acted **reasonably** in doing so. An employee can be dismissed with perfect notice — so no wrongful dismissal at all — and still win an unfair dismissal claim because the reason or the procedure was bad. To bring the statutory claim an employee normally needs a **qualifying period of continuous employment** (broadly two years), whereas wrongful dismissal has no service requirement because it is simply a contract claim." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Two different dismissal claims",
          data: {
            leftTitle: "Wrongful dismissal",
            rightTitle: "Unfair dismissal",
            rows: [
              { aspect: "Source of law", left: "Common law (contract)", right: "Statute" },
              { aspect: "The complaint", left: "Dismissed without proper notice", right: "No fair reason and/or unreasonable process" },
              { aspect: "Focus", left: "The MANNER of dismissal", right: "The REASON and the fairness" },
              { aspect: "Qualifying service", left: "None required", right: "Normally ~2 years' continuous service" },
              { aspect: "Heard in", left: "Courts (or tribunal)", right: "Employment tribunal" },
              { aspect: "Remedy", left: "Damages = the lost notice pay", right: "Reinstatement, re-engagement or compensation" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The clean distinction", md: "**Wrongful** = wrong **notice** (a contract breach). **Unfair** = wrong **reason or process** (a statutory wrong). The same dismissal can be one, both, or neither." },
      ],
      check: {
        q: "Priya is dismissed with the full three months' notice her contract requires, but purely because her manager dislikes her — there is no performance or conduct issue. Which claim is she most likely to have?",
        options: [
          "Wrongful dismissal, because any dismissal breaches the contract",
          "Unfair dismissal, because there is no fair reason for the dismissal",
          "Neither, because she was given full notice",
          "Both wrongful and unfair dismissal",
        ],
        correct: 1,
        explain: "Because she received full contractual notice, there is NO wrongful dismissal — the manner was correct. But dismissing someone with no fair reason (capability, conduct, redundancy, statutory bar or SOSR) is an UNFAIR dismissal, a statutory claim about the reason and process rather than the notice.",
      },
    },
    {
      id: "fair-reasons",
      heading: "Unfair dismissal — the fair reasons and the fairness test",
      blocks: [
        { kind: "text", md: "For a dismissal to be fair, the employer must clear **two hurdles**. First, the reason must be one of the five **potentially fair reasons** allowed by statute. Second, even with a fair reason, the employer must have acted **reasonably** in treating that reason as sufficient to dismiss — the fairness (or procedure) test." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five potentially fair reasons for dismissal",
          caption: "The reason must fall within one of these — otherwise the dismissal is automatically unfair.",
          data: {
            items: [
              { title: "Capability or qualifications", sub: "The employee cannot do the job — ill-health, poor performance, or lacks required qualifications." },
              { title: "Conduct", sub: "Misconduct — e.g. persistent lateness, insubordination, or gross misconduct like theft or violence." },
              { title: "Redundancy", sub: "The job itself has ceased or diminished — a genuine redundancy situation." },
              { title: "Statutory illegality (statutory bar)", sub: "Continuing to employ would break the law — e.g. a driver who has lost their licence." },
              { title: "Some other substantial reason (SOSR)", sub: "A catch-all for other substantial reasons, e.g. a genuine business reorganisation." },
            ],
          },
        } },
        { kind: "text", md: "A fair reason alone is not enough. The tribunal then asks whether dismissal fell within the **band of reasonable responses** open to a reasonable employer, and whether a **fair procedure** was followed — investigating, warning where appropriate, hearing the employee, and allowing an appeal. A genuine misconduct reason handled with no investigation and no chance to respond can still be an **unfair** dismissal." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The fairness test — how a tribunal works through it",
          caption: "Both hurdles must be cleared for the dismissal to be fair.",
          data: {
            steps: [
              { label: "Was the employee dismissed?", sub: "Including constructive dismissal" },
              { label: "Is the reason one of the 5 fair reasons?", sub: "Capability, conduct, redundancy, statutory bar, SOSR" },
              { label: "Did the employer act reasonably?", sub: "Band of reasonable responses" },
              { label: "Was a fair procedure followed?", sub: "Investigate, warn, hear, allow appeal" },
              { label: "Fair or unfair dismissal", sub: "Remedy if unfair: reinstatement / compensation" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — fair reason, unfair process", scenario: "Tom, a warehouse worker with four years' service, is accused of stealing stock. His manager dismisses him on the spot that afternoon, with no investigation, no meeting and no chance to explain. It later turns out the stock was simply miscounted. Tom claims unfair dismissal.", steps: [
          { label: "Qualifying service", detail: "Four years' continuous service — well over the ~2-year qualifying period, so he can bring the statutory claim." },
          { label: "Potentially fair reason?", detail: "Suspected theft is CONDUCT — one of the five potentially fair reasons. Hurdle one is met." },
          { label: "Reasonable process?", detail: "No investigation, no meeting, no appeal. A reasonable employer would have investigated and heard him first. Hurdle two is failed." },
          { label: "Reasonable belief?", detail: "The employer had no reasonable grounds for a genuine belief in guilt, because it never investigated." },
        ], result: "The dismissal is UNFAIR. Even a genuinely fair reason (conduct) becomes an unfair dismissal when the employer acts unreasonably and skips a fair procedure. Having a good reason is only half the test." },
        { kind: "callout", tone: "warn", title: "Automatically unfair", md: "Some reasons make a dismissal **automatically unfair** with **no** qualifying period — for example dismissal for pregnancy, for trade-union membership, for whistleblowing, or for asserting a statutory right. These need no two years' service at all." },
      ],
    },
    {
      id: "redundancy-discrimination",
      heading: "Redundancy and discrimination basics",
      blocks: [
        { kind: "text", md: "**Redundancy** is a specific, defined situation — not just any dismissal in hard times. It arises where the employer has **ceased (or intends to cease) the business**, or ceased it at the employee's workplace, **or** where the requirement for employees to do **work of a particular kind** has **ceased or diminished**. In short: the **job**, not the person, has gone. Dismissing a poor performer and calling it redundancy is a **sham** — there is no genuine redundancy situation." },
        { kind: "callout", tone: "rule", title: "The redundancy definition", md: "Redundancy = the employer ceases the business or the workplace, **or** the need for employees to do work of a **particular kind** ceases or diminishes. The test is about the **role** disappearing, not the individual's fault." },
        { kind: "text", md: "A genuine redundancy still has to be handled fairly, or it becomes an **unfair** dismissal. The employer must use **fair selection criteria** (objective ones such as skills or attendance, not discriminatory or arbitrary ones), **consult** affected employees, and consider suitable **alternative employment**. Where larger numbers are affected, **collective consultation** obligations arise. An employee with the qualifying service who is genuinely made redundant is entitled to a **statutory redundancy payment**, calculated from their **age, length of continuous service (capped) and weekly pay (capped)**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Handling a redundancy fairly",
          data: {
            steps: [
              { label: "Genuine redundancy situation?", sub: "Job ceased or diminished" },
              { label: "Fair, objective selection", sub: "Skills, attendance — not discriminatory" },
              { label: "Consult the affected staff", sub: "Individual (and collective if large scale)" },
              { label: "Offer suitable alternatives", sub: "Consider redeployment" },
              { label: "Redundancy payment", sub: "Age × service (capped) × weekly pay (capped)" },
            ],
          },
        } },
        { kind: "text", md: "Finally, **discrimination law** overlays everything above. It is unlawful to discriminate against a worker because of a **protected characteristic**: **age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation**. Discrimination can be **direct** (treating someone less favourably because of the characteristic) or **indirect** (a neutral rule that puts a group sharing the characteristic at a disadvantage and cannot be objectively justified). Discrimination protection applies from **day one** — it needs **no** qualifying period — and covers recruitment, terms, promotion and dismissal alike." },
        { kind: "callout", tone: "tip", md: "There are **nine** protected characteristics. A quick memory hook — think of it covering **who you are** (age, sex, race, disability, sexual orientation, gender reassignment), **what you believe** (religion or belief), and **your family stage** (marriage/civil partnership, pregnancy/maternity)." },
      ],
      check: {
        q: "A company loses a major contract and no longer needs its three specialist night-shift packers. It selects the three using objective attendance and skills scores, consults them, and finds no alternative roles. What is the correct legal characterisation?",
        options: [
          "A sham redundancy, because the workers did nothing wrong",
          "A genuine redundancy — the need for that particular work has diminished",
          "An automatically unfair dismissal because they lost their jobs",
          "Wrongful dismissal, because the contract ended early",
        ],
        correct: 1,
        explain: "Redundancy is defined as the requirement for employees to do work of a particular kind ceasing or diminishing — exactly what happened when the contract and the need for the night-shift packers disappeared. Fault of the employee is irrelevant. With objective selection, consultation and consideration of alternatives, this is a genuine, fairly handled redundancy.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating the label the parties use ('self-employed') as deciding employment status.", fix: "The label is not decisive. Courts apply the multiple test to the substance — control, personal service, mutuality of obligation and financial risk." },
    { trap: "Confusing wrongful and unfair dismissal.", fix: "Wrongful = breach of contract over NOTICE (common law, no service needed). Unfair = wrong REASON or PROCESS (statutory, ~2 years' service normally)." },
    { trap: "Thinking a fair reason automatically makes a dismissal fair.", fix: "It is a two-part test: a potentially fair reason PLUS acting reasonably and following a fair procedure. A good reason handled badly is still unfair." },
    { trap: "Calling any dismissal in a downturn a 'redundancy'.", fix: "Redundancy has a defined meaning — the business/workplace closes or the need for work of a particular kind ceases or diminishes. The role must genuinely disappear." },
    { trap: "Assuming all employment rights need two years' service.", fix: "Automatically unfair dismissals (e.g. pregnancy, whistleblowing) and ALL discrimination protection apply from day one, with no qualifying period." },
  ],
  keyTerms: [
    { term: "Contract of service", def: "The contract under which an employee works; the gateway to employee rights such as unfair dismissal and redundancy pay." },
    { term: "Contract for services", def: "The contract under which an independent (self-employed) contractor supplies a service to a business." },
    { term: "Multiple (economic reality) test", def: "The modern umbrella test for status, weighing control, personal service, mutuality of obligation and financial risk together." },
    { term: "Wrongful dismissal", def: "A common law breach-of-contract claim for dismissal without the proper contractual notice; no qualifying service is needed." },
    { term: "Unfair dismissal", def: "A statutory claim that the employer lacked a fair reason and/or acted unreasonably; normally needs about two years' continuous service." },
  ],
  summary: [
    "Employment status is the gateway: only an employee (contract of service) gets unfair dismissal, redundancy pay and statutory notice — decided by the multiple test, not the label.",
    "A contract of employment draws its terms from three sources — express, implied and statutory — and both parties owe implied duties, including mutual trust and confidence.",
    "Wrongful dismissal is a contract claim about wrong NOTICE; unfair dismissal is a statutory claim about the wrong REASON or PROCESS — a dismissal can be one, both or neither.",
    "A fair dismissal needs a potentially fair reason (capability, conduct, redundancy, statutory bar or SOSR) AND a reasonable, fair procedure; some reasons are automatically unfair with no service requirement.",
    "Redundancy means the job — not the person — has gone; it must be handled with fair selection, consultation and alternatives, while discrimination on nine protected characteristics is unlawful from day one.",
  ],
}
