import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * LW-ENG · Area C — employment law.
 * Chapters 23–27 of the LW-ENG reading tree, mapped to syllabus groups C1–C2.
 *
 * ── An area with NO Global counterpart at all ──────────────────
 * LW-Global's Area C is transportation and payment — bills of lading, credit
 * transfers, bills of exchange, letters of credit. Employment law appears nowhere on
 * the Global syllabus, so every chapter here is authored from scratch and none of it
 * can be forked.
 *
 * ── Where the marks are ───────────────────────────────────────
 * Almost every Area C question is one of three shapes: is this person an EMPLOYEE;
 * was this dismissal WRONGFUL, UNFAIR, or both; and is this a genuine REDUNDANCY. The
 * chapters are built so that each of those has a decision procedure the learner can
 * run against facts, because the examiner rewards reaching a conclusion, not
 * describing the law. The forum throughout is the Employment Tribunal (chapter 2).
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were
 * used only as a benchmark for structure and depth. Statutory wording is quoted AS a
 * quotation with the section named.
 */

/* ── Chapter 23 · C1(a) ────────────────────────────────────────── */

export const LWE_TREE_23: StudyChapter = {
  id: "LWE-23",
  number: 23,
  paper: "LW",
  area: "C",
  title: "Employee or self-employed, and why it decides everything",
  minutes: 16,
  syllabusRefs: ["C1(a)"],
  intro:
    "Nearly every employment right depends on being an employee, so this is the gateway question — and it is decided by what the parties actually do, not by what they called the arrangement in writing.",
  outcomes: [
    "Apply the control, integration and economic reality tests to decide employment status",
    "List the factors a tribunal weighs, and identify the irreducible minimum of mutual obligation",
    "Explain why the parties' own label does not settle the question",
    "Set out what turns on the distinction — statutory rights, tax, vicarious liability, insolvency priority",
    "Reach and justify a conclusion on employment status from given facts",
  ],
  sections: [
    {
      id: "the-tests",
      heading: "The tests, and how they developed",
      blocks: [
        {
          kind: "table",
          caption: "Three successive approaches to one question",
          head: ["Test", "What it asks", "Why it was not enough on its own"],
          rows: [
            ["**Control**", "Does the employer control not just *what* is done but *how* it is done?", "Fails for skilled professionals — a hospital does not tell a surgeon how to operate, yet the surgeon is an employee"],
            ["**Integration**", "Is the person **part of the organisation**, or merely an accessory to it?", "\"Part of the organisation\" is vague, and hard to apply to modern flexible working"],
            ["**Economic reality (multiple)**", "Weighing **all** the factors together, and asking in substance whose business it is", "Nothing — this is the approach the courts now take"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The irreducible minimum",
          md: "Three things must be present before there can be a contract of employment at all, and if any one is missing the person is not an employee however many other factors point that way. There must be **mutuality of obligation** — the employer bound to provide work and the worker bound to accept it; there must be **personal service**, so a genuine and unfettered right to send a substitute is fatal; and there must be some **element of control** by the employer. *Ready Mixed Concrete* is the case that set the framework, and a genuine substitution clause is the single most effective way of showing self-employment.",
        },
        {
          kind: "table",
          caption: "The factors a tribunal weighs",
          head: ["Pointing to EMPLOYMENT", "Pointing to SELF-EMPLOYMENT"],
          rows: [
            ["The employer provides the **tools and equipment**", "The worker provides their own equipment"],
            ["**Fixed wage or salary**, paid regularly", "Paid a **price for the job**, invoicing for it"],
            ["**No financial risk**, and no chance of profit from sound management", "Bears the **risk of loss** and takes the **chance of profit**"],
            ["Works **set hours** at a place the employer directs", "Chooses **when and where** to work"],
            ["Must perform **personally**", "May **subcontract or substitute** freely"],
            ["**Tax and NIC deducted at source** under PAYE", "Responsible for **own tax**, and registered accordingly"],
            ["Entitled to **holiday and sick pay**", "No such entitlement"],
            ["Subject to the employer's **disciplinary and grievance** procedures", "Outside them"],
            ["Works for **one** organisation", "Works for **several clients** at once"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The label the parties chose does not decide it",
          md: "A contract headed \"contract for services\" and reciting that the worker is self-employed does **not** settle the matter. A tribunal looks at the **substance of the relationship as performed**, and will disregard a label that contradicts reality — otherwise employers could contract out of employment protection simply by wording. So in any scenario that stresses the written description, expect the answer to turn on the *conduct*, and expect the label to be a distractor.",
        },
        {
          kind: "example",
          title: "Deciding status on the facts",
          scenario:
            "Bramwell Interiors engages Dacre as a \"self-employed fitter\" under a written agreement saying he is not an employee and may send a substitute. In practice Dacre works 8am to 5pm Monday to Friday at sites Bramwell allocates, uses Bramwell's van and power tools, is paid £2,100 monthly whatever the workload, has never sent a substitute and was told once that he could not, takes holiday when Bramwell approves it, and works for nobody else. Bramwell dismisses him after three years without notice and says he cannot claim unfair dismissal because he is self-employed.",
          steps: [
            { label: "Test the irreducible minimum first", detail: "MUTUALITY is present — regular monthly pay whatever the workload means Bramwell is obliged to pay and Dacre to work. PERSONAL SERVICE is present in substance: the substitution clause exists on paper but Dacre was REFUSED permission to use it, so it is not a genuine unfettered right. CONTROL is present — set hours, allocated sites." },
            { label: "Weigh the economic reality factors", detail: "Bramwell provides the VAN and TOOLS; Dacre takes NO financial risk and has NO chance of profit from good management; he works FIXED HOURS at directed locations; holiday needs APPROVAL; he works for NOBODY ELSE. Every significant factor points to employment." },
            { label: "Deal with the written label", detail: "The agreement calls him self-employed and grants substitution. A tribunal looks at the SUBSTANCE AS PERFORMED and disregards a label contradicting reality — particularly where, as here, the substitution right was expressly refused in practice." },
            { label: "Conclude on status", detail: "Dacre is an EMPLOYEE. The label is a sham to the extent it conflicts with how the relationship actually ran." },
            { label: "Draw the consequences", detail: "With three years' continuous service he has the qualifying service for UNFAIR DISMISSAL, and dismissal without notice is also WRONGFUL DISMISSAL (chapter 25). Bramwell is additionally exposed to unpaid holiday pay and to PAYE liabilities it never operated." },
          ],
          result:
            "Dacre is an **employee**, so Bramwell's central defence fails and both an unfair and a wrongful dismissal claim are open. The refused substitution request is the fact that destroys the written label.",
        },
      ],
      check: {
        q: "A written contract states the worker is self-employed and may send a substitute, but in practice substitution has always been refused and the employer sets hours and supplies tools. What is the worker?",
        options: [
          "Self-employed, because the written contract governs the relationship",
          "An employee — the tribunal looks at the substance as performed and disregards a label contradicting it",
          "Self-employed, because a substitution clause is conclusive",
          "Neither, since the contract is void for uncertainty",
        ],
        correct: 1,
        explain:
          "An EMPLOYEE. Employment status is decided on the SUBSTANCE of the relationship as actually performed, not the label. A substitution clause only points to self-employment if the right is GENUINE and unfettered — a right that is always refused is not. Set hours and employer-supplied tools reinforce the conclusion.",
      },
    },
    {
      id: "why-it-matters",
      heading: "What turns on the distinction",
      blocks: [
        {
          kind: "list",
          title: "The consequences of being an employee",
          items: [
            "**Statutory employment protection** — unfair dismissal, redundancy payments, minimum notice, maternity and family rights. The self-employed have none of these.",
            "**Implied terms** in the contract of employment on both sides (chapter 24), including mutual trust and confidence.",
            "**Tax and NIC** are deducted at source under PAYE, and the employer owes employer's NIC. A self-employed contractor accounts for their own.",
            "**Vicarious liability** — an employer is liable for torts an employee commits in the course of employment, and generally not for those of an independent contractor (chapter 20).",
            "**Preferential status on insolvency** for certain employee claims, such as arrears of wages up to a limit and accrued holiday pay (chapter 41).",
            "**Health and safety and employer's liability insurance** obligations attach to employees.",
            "**Continuity of employment** accrues, which is what unlocks the rights that carry a qualifying period.",
          ],
        },
        {
          kind: "definition",
          term: "Worker",
          md: "A middle category, wider than employee: someone who undertakes to perform work **personally** for another who is not their client or customer. Workers get some statutory rights — the **national minimum wage**, **paid holiday**, working time limits and whistleblowing protection — but **not** unfair dismissal or redundancy pay. It matters because a person who fails the employee test may still be a worker rather than genuinely in business on their own account.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Three categories, not two",
          md: "Scenarios are often built so that the answer is not simply \"employee or self-employed\". If personal service is present but mutuality is thin — a casual or zero-hours arrangement, for instance — the person may be a **worker**: entitled to the minimum wage and paid holiday, but with **no unfair dismissal claim**. Getting the middle category right is what separates a full-mark answer from a half-mark one.",
        },
      ],
      check: {
        q: "A person performs work personally but has no mutuality of obligation, so fails the employee test. What might they still be entitled to?",
        options: [
          "Nothing, since they are self-employed",
          "Worker rights — national minimum wage, paid holiday and working time limits, but not unfair dismissal",
          "Full employment protection including redundancy pay",
          "Only whatever the written contract provides",
        ],
        correct: 1,
        explain:
          "WORKER rights. The worker category sits between employee and genuinely self-employed: it requires PERSONAL service for someone who is not a client or customer, and carries the NATIONAL MINIMUM WAGE, PAID HOLIDAY, working time protection and whistleblowing rights — but NOT unfair dismissal or redundancy pay.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Deciding status from the contract's own description of the relationship.",
      fix: "The tribunal looks at the SUBSTANCE as performed, and disregards a label that contradicts it.",
    },
    {
      trap: "Treating any substitution clause as proof of self-employment.",
      fix: "The right to substitute must be GENUINE and unfettered. A right that is refused in practice counts for nothing.",
    },
    {
      trap: "Forcing every worker into employee or self-employed.",
      fix: "The WORKER category carries minimum wage and paid holiday but no unfair dismissal claim.",
    },
    {
      trap: "Applying the control test alone to a skilled professional.",
      fix: "Control alone fails for skilled work. Use the ECONOMIC REALITY approach, weighing all the factors.",
    },
  ],
  keyTerms: [
    { term: "Contract of service", def: "A contract of employment, under which an employee works for an employer." },
    { term: "Contract for services", def: "A contract under which an independent contractor supplies services to a client." },
    { term: "Control test", def: "Asks whether the employer directs not only what is done but how it is done." },
    { term: "Integration test", def: "Asks whether the person is part of the organisation or merely accessory to it." },
    { term: "Economic reality test", def: "Weighs all the factors together, asking in substance whose business it is; the modern approach." },
    { term: "Irreducible minimum", def: "Mutuality of obligation, personal service and an element of control — all required for employment." },
    { term: "Worker", def: "One who performs work personally for someone who is not a client or customer; gets minimum wage and paid holiday but no unfair dismissal right." },
    { term: "Vicarious liability", def: "An employer's liability for torts committed by an employee in the course of employment." },
  ],
  summary: [
    "Status is decided by the economic reality of the relationship, weighing all the factors.",
    "Mutuality of obligation, personal service and control are the irreducible minimum for employment.",
    "The parties' own label does not decide it, and a substitution right must be genuine to count.",
    "Employee status unlocks unfair dismissal, redundancy, notice, implied terms and insolvency preference.",
    "The worker category carries minimum wage and paid holiday but no unfair dismissal claim.",
  ],
  knowledgeDiagnostic: [
    { q: "State the irreducible minimum for a contract of employment.", a: "Mutuality of obligation, an obligation of personal service, and some element of employer control." },
    { q: "Why is the control test insufficient by itself?", a: "It breaks down for skilled professionals whose employer cannot direct how the work is done, yet who are plainly employees." },
    { q: "Does a self-employed label in the contract settle status?", a: "No. The tribunal looks at the substance of the relationship as performed and disregards a contradictory label." },
    { q: "Name three rights a worker has that a self-employed contractor does not.", a: "The national minimum wage, paid holiday, and working time limits — plus whistleblowing protection." },
  ],
}

/* ── Chapter 24 · C1(b) ────────────────────────────────────────── */

export const LWE_TREE_24: StudyChapter = {
  id: "LWE-24",
  number: 24,
  paper: "LW",
  area: "C",
  title: "The contract of employment and the duties on both sides",
  minutes: 16,
  syllabusRefs: ["C1(b)"],
  intro:
    "Most of what governs an employment relationship was never written down. The express terms are the visible part; the implied duties are what decide the hard cases, and mutual trust and confidence is the one that does most of the work.",
  outcomes: [
    "Explain how a contract of employment is formed and what the written statement of particulars must contain",
    "Identify the sources of contractual terms, including incorporation from a handbook or collective agreement",
    "State the duties implied on the employer and on the employee",
    "Explain the duty of mutual trust and confidence and its consequences",
    "Apply the implied duties to decide whether a party is in breach",
  ],
  sections: [
    {
      id: "formation-and-terms",
      heading: "Formation, and where the terms come from",
      blocks: [
        {
          kind: "definition",
          term: "Contract of employment",
          md: "A **contract of service** between employer and employee. It need not be in writing to exist — it can be formed orally or by conduct — but the employer must give the employee a **written statement of particulars** of the main terms, and must do so **on or before the first day** of employment.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The written statement is not the contract",
          md: "This distinction is worth marks. The **contract** is the agreement itself, formed when offer and acceptance met; the **written statement** is a statutory record of its main terms. So the statement can be wrong — and if it is, the contract prevails. Failure to provide a statement does not mean there is no contract; it gives the employee a separate claim, and a tribunal can award additional compensation where another claim succeeds.",
        },
        {
          kind: "list",
          title: "What the written statement must cover",
          items: [
            "The **names of the parties**, the **date employment began**, and the date continuous employment started.",
            "**Pay** — the rate or method of calculation, and the intervals at which it is paid.",
            "**Hours of work**, including which days and whether hours may vary.",
            "**Holiday entitlement** and holiday pay, and **sick pay** arrangements.",
            "**Pension** arrangements.",
            "**Notice** required from each side.",
            "**Job title or a brief job description**, and the **place of work**.",
            "Any **probationary period**, and its conditions.",
            "Where the job is **not permanent**, how long it is expected to last; and for temporary work abroad, the relevant particulars.",
            "**Disciplinary and grievance procedures**, or where they can be found.",
          ],
        },
        {
          kind: "table",
          caption: "The sources of contractual terms",
          head: ["Source", "How it operates"],
          rows: [
            ["**Express agreement**", "What the parties actually agreed, orally or in writing — the starting point"],
            ["**Incorporation from a document**", "A staff handbook or policy becomes contractual only if the parties **intended** it to be. Aspirational policy statements usually are not; a specific pay or notice provision usually is"],
            ["**Collective agreements**", "Terms negotiated with a trade union, incorporated into the individual contract expressly or by custom"],
            ["**Custom and practice**", "A practice so **reasonable, notorious and certain** that it is taken as agreed"],
            ["**Statute**", "Overrides inconsistent agreement — the national minimum wage, working time limits, minimum notice. Employment rights cannot be contracted out of"],
            ["**Implied terms at common law**", "The duties below, which the law reads into every contract of employment"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "You cannot contract out of statutory employment rights",
          md: "An agreement by which an employee gives up the right to claim unfair dismissal, or accepts less than the minimum wage, is **void** to that extent. There are narrow exceptions — a properly advised **settlement agreement**, and an agreement reached through ACAS — but a bare clause in the employment contract does nothing. Scenarios that put such a clause in the contract are testing whether you know it is unenforceable.",
        },
      ],
      check: {
        q: "An employment contract contains a clause by which the employee agrees never to bring an unfair dismissal claim. What is its effect?",
        options: [
          "It is binding, because the employee freely agreed to it",
          "It is void to that extent — statutory employment rights cannot be contracted out of by a bare contractual clause",
          "It is binding only if the employee received legal advice on the contract",
          "It suspends the right until the employee gives notice",
        ],
        correct: 1,
        explain:
          "VOID to that extent. Statutory employment rights cannot be excluded by a term in the employment contract. Only a properly advised SETTLEMENT AGREEMENT or an ACAS-brokered agreement can validly compromise such a claim — and those come after a dispute, not in the original contract.",
      },
    },
    {
      id: "implied-duties",
      heading: "The implied duties",
      blocks: [
        {
          kind: "table",
          caption: "What the law implies on each side",
          head: ["The employer must…", "The employee must…"],
          rows: [
            ["**Pay the agreed wages**", "Give **personal service**, and be ready and willing to work"],
            ["Provide a **safe system of work**, competent colleagues and safe premises and equipment", "Obey **lawful and reasonable** instructions"],
            ["**Indemnify** the employee for expenses and liabilities properly incurred", "Exercise **reasonable care and skill** in the work"],
            ["Not destroy **mutual trust and confidence**", "Act in **good faith** — the duty of fidelity"],
            ["Provide **work**, where pay depends on it (as with piece work or commission)", "**Account** for money and property received, and not take a **secret profit** or bribe"],
            ["Deal properly with a **grievance**", "Respect **confidential information**, both during and after employment"],
            ["Provide **statutory rights** — holiday, sick pay, itemised payslip", "Not **compete** with the employer during employment"],
          ],
        },
        {
          kind: "definition",
          term: "Mutual trust and confidence",
          md: "An implied term that neither party will, **without reasonable and proper cause**, conduct itself in a manner **calculated or likely to destroy or seriously damage** the relationship of confidence and trust between them. It is the most litigated implied term, and a serious breach by the employer entitles the employee to resign and claim **constructive dismissal** (chapter 25).",
        },
        {
          kind: "list",
          title: "Employer conduct that has been held to breach trust and confidence",
          items: [
            "**Unilateral, substantial changes** to pay, hours or duties without agreement.",
            "**Humiliating or abusing** an employee, particularly in front of others.",
            "**Failing to investigate a grievance**, or to take a complaint of harassment seriously.",
            "**Falsely accusing** an employee of dishonesty or incompetence.",
            "**Undermining a manager's authority** with subordinates, or removing duties without cause.",
            "**Failing to support** an employee facing unreasonable treatment from colleagues or customers.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The duty of fidelity does not stop the employee leaving",
          md: "An employee owes **good faith** during employment: no competing, no secret profits, no misuse of confidential information. But after employment ends, only **genuine trade secrets and confidential information** stay protected by the implied duty — an ex-employee is otherwise free to use their **general skill and experience**, and to compete. To go further, the employer needs an **express restraint of trade** clause, and that is only enforceable so far as it is **reasonable** in scope, area and duration to protect a legitimate interest (chapter 18).",
        },
        {
          kind: "example",
          title: "Testing both sides for breach",
          scenario:
            "Ilford Marketing employs Nayar as an account manager. Her contract is silent on place of work; she has worked from the Leeds office for four years. The managing director tells her, in an open-plan meeting, that her recent work was \"amateur rubbish\", and instructs her to relocate to Bristol within two weeks. Nayar has meanwhile been quietly setting up a competing agency, has copied Ilford's client contact list to her personal drive, and has approached two Ilford clients. She resigns and claims constructive dismissal; Ilford counterclaims.",
          steps: [
            { label: "Test the employer's conduct on the relocation", detail: "The contract has NO mobility clause and Nayar has worked in Leeds for four years, so place of work is arguably an implied term settled by custom. A unilateral instruction to relocate to Bristol in two weeks is a SUBSTANTIAL unilateral change without agreement — a breach going to the root of the contract." },
            { label: "Test the employer's conduct on the criticism", detail: "Publicly describing her work as \"amateur rubbish\" in an open meeting is capable of breaching MUTUAL TRUST AND CONFIDENCE, being conduct likely to destroy the relationship without reasonable and proper cause." },
            { label: "Test the employee's conduct on competition", detail: "Setting up a competing agency and APPROACHING CLIENTS while still employed breaches the duty of FIDELITY. Copying the CLIENT CONTACT LIST breaches the duty of confidentiality — the list is the employer's confidential information, not Nayar's general skill and experience." },
            { label: "Resolve the interaction", detail: "Both sides are in breach. Nayar may still claim CONSTRUCTIVE DISMISSAL if she resigned in response to the employer's fundamental breach and did so promptly. But her own misconduct is highly relevant: if Ilford discovers it, it may reduce or extinguish her compensation, and it grounds Ilford's own claim." },
            { label: "Identify Ilford's remedies", detail: "An INJUNCTION to restrain use of the client list, DAMAGES for breach of the duty of fidelity, and an account of profits made from the diverted clients. Absent an express restraint clause it cannot stop her competing generally once employment ends." },
          ],
          result:
            "Nayar has an arguable constructive dismissal claim on the **relocation and the public humiliation**, but her **breach of fidelity and confidentiality** exposes her to a counterclaim and is likely to cut her compensation sharply. Ilford's inability to stop her competing after leaving is the price of having no restraint clause.",
        },
      ],
      check: {
        q: "Which implied duty does an employer breach by imposing a substantial unilateral change to an employee's duties without agreement?",
        options: [
          "The duty to indemnify the employee",
          "The duty not to destroy mutual trust and confidence",
          "The duty to provide work",
          "The duty of fidelity",
        ],
        correct: 1,
        explain:
          "MUTUAL TRUST AND CONFIDENCE. A substantial unilateral change to pay, hours or duties without agreement is conduct likely to destroy the relationship of confidence and trust, and a serious breach entitles the employee to resign and claim CONSTRUCTIVE dismissal. Fidelity is a duty owed BY the employee, not by the employer.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Treating the written statement of particulars as the contract itself.",
      fix: "The contract is the agreement; the statement is a statutory record of it. Where they differ, the contract prevails.",
    },
    {
      trap: "Enforcing a contractual clause excluding an unfair dismissal claim.",
      fix: "Void. Only a properly advised settlement agreement or an ACAS agreement can compromise a statutory claim.",
    },
    {
      trap: "Assuming everything in a staff handbook is contractual.",
      fix: "Only terms the parties INTENDED to be contractual are incorporated. Aspirational policy usually is not.",
    },
    {
      trap: "Thinking the implied duty of confidentiality stops an ex-employee competing.",
      fix: "After employment only genuine trade secrets stay protected. Restraining competition needs an express clause, reasonable in scope.",
    },
  ],
  keyTerms: [
    { term: "Written statement of particulars", def: "The statutory record of the main employment terms, due on or before the first day of employment." },
    { term: "Mutual trust and confidence", def: "The implied term that neither party will, without proper cause, act so as to destroy or seriously damage the relationship of confidence." },
    { term: "Duty of fidelity", def: "The employee's duty of good faith: no competing during employment, no secret profits, no misuse of confidential information." },
    { term: "Custom and practice", def: "A practice so reasonable, notorious and certain that it is treated as an agreed contractual term." },
    { term: "Collective agreement", def: "Terms negotiated with a trade union, which may be incorporated into individual contracts." },
    { term: "Settlement agreement", def: "A properly advised agreement that can validly compromise a statutory employment claim." },
    { term: "Restraint of trade clause", def: "An express post-employment restriction, enforceable only so far as reasonable in scope, area and duration." },
  ],
  summary: [
    "A contract of employment needs no writing, but a written statement of particulars is due on or before day one.",
    "Terms come from express agreement, incorporation, collective agreements, custom, statute and the common law.",
    "Statutory employment rights cannot be contracted out of except by a settlement or ACAS agreement.",
    "Mutual trust and confidence is the key implied term, and its serious breach grounds constructive dismissal.",
    "The employee owes fidelity during employment; restraining post-employment competition needs an express, reasonable clause.",
  ],
  knowledgeDiagnostic: [
    { q: "When must the written statement of particulars be given?", a: "On or before the first day of employment." },
    { q: "State the test for breach of mutual trust and confidence.", a: "Conduct, without reasonable and proper cause, calculated or likely to destroy or seriously damage the relationship of confidence and trust." },
    { q: "Can an employee validly agree in their contract not to claim unfair dismissal?", a: "No — the clause is void. Only a properly advised settlement agreement or an ACAS agreement can compromise the claim." },
    { q: "What survives the end of employment without an express clause?", a: "Protection of genuine trade secrets and confidential information — but not a restraint on competition, and not the employee's general skill and experience." },
  ],
}

export const LWE_TREE_AREA_C_PART1: StudyChapter[] = [LWE_TREE_23, LWE_TREE_24]
