/*
 * AA Area A — audit and assurance engagements, the statutory audit and its
 * regulation, corporate governance, professional ethics, and internal audit.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * AA IS NOT AN OBJECTIVE-TEST PAPER, and planning it as one would be a
 * disservice. There is no Section C: Section A is three OT cases of five
 * 2-mark questions, and Section B is SEVENTY marks of constructed response in
 * the word processor. So almost every plan in this file is `written`, and the
 * mark allocations are AA's own — 4, 5, 6, 8, 10 and 20.
 *
 * The consequence for how these plans are written. On a marks-per-point basis
 * AA is the most mechanical paper in the Applied tier: markers work from a list
 * and award ONE MARK PER VALID POINT, up to the allocation. An 8-mark
 * requirement wants eight points, not four beautifully developed ones — which
 * is the exact opposite of the advice that serves a candidate in FR
 * interpretation, and it is why strong FR candidates under-perform in AA.
 *
 * So every plan here states the point count the allocation implies, and every
 * model answer is built as discrete, separately markable points. Where a
 * requirement has a standard structure that the marking guide follows —
 * deficiency then implication then recommendation, threat then safeguard,
 * assertion then procedure — the plan imposes that structure explicitly,
 * because a point that does not reach its second half scores half of what it
 * could have.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const AA_PLANS_A: ExamPlanMap = {
  /* ── AA-01 · Assurance engagements and the concept of audit ─────── */

  "AA-01::elements": {
    title: "The five elements of an assurance engagement",
    format: "written",
    marks: 6,
    requirement:
      "Explain the five elements of an assurance engagement, and identify each of them in the context of the statutory audit of a limited company. (6 marks)",
    plan: [
      {
        step: "Read the allocation as a point count",
        detail:
          "Six marks across five elements means roughly one mark for naming and explaining each, plus a mark for the application. So every element must be NAMED and APPLIED — spending three marks' worth of writing on the three-party relationship and omitting two elements caps the answer at four.",
      },
      {
        step: "List the five before writing, in a fixed order you always use",
        detail:
          "Three-party relationship, subject matter, suitable criteria, sufficient appropriate evidence, written report. A memorised order stops one being lost under time pressure, and this requirement is asked in almost every diet in some form.",
      },
      {
        step: "Name all THREE parties, because the mark is for the relationship",
        detail:
          "Practitioner (the auditor), responsible party (the directors, who prepare the financial statements), and intended users (the shareholders, to whom the report is addressed). Candidates routinely name two and lose the mark — and note the users are NOT the directors, which is the point of separating them.",
      },
      {
        step: "Apply each element to a statutory audit as you go, not at the end",
        detail:
          "Subject matter is the financial statements. Criteria are the applicable financial reporting framework, IFRS. Evidence is gathered through audit procedures. The report is the auditor's report giving an opinion on truth and fairness. Applying inside each element is faster than a separate application paragraph and it guarantees the application marks are attached to the right point.",
      },
    ],
    answer:
      "**1. A three-party relationship.** An assurance engagement involves the **practitioner** (the auditor), the **responsible party** (the directors, who prepare the financial statements and are responsible for them), and the **intended users** (the shareholders, to whom the auditor's report is addressed). The users are distinct from the responsible party — that separation is the reason the engagement has value, because it provides users with independent assurance about information prepared by someone else.\n\n**2. A subject matter.** The data to be evaluated. In a statutory audit this is the **financial statements** — the statement of financial position, statement of profit or loss and other comprehensive income, and the accompanying notes.\n\n**3. Suitable criteria.** The benchmark against which the subject matter is evaluated. For a statutory audit this is the **applicable financial reporting framework**, normally IFRS Accounting Standards, together with the relevant legislation. Without agreed criteria the practitioner has nothing to measure the subject matter against and no conclusion is possible.\n\n**4. Sufficient appropriate evidence.** The practitioner gathers evidence in order to reach a conclusion — **sufficient** refers to the quantity and **appropriate** to its relevance and reliability. In a statutory audit this is obtained through audit procedures such as inspection, observation, enquiry, confirmation, recalculation, re-performance and analytical procedures.\n\n**5. A written assurance report.** The conclusion is communicated in a written report in an appropriate form. For a statutory audit this is the **auditor's report**, expressing a **reasonable assurance opinion** on whether the financial statements give a true and fair view and are prepared in accordance with the applicable framework.",
    earns: [
      "Naming all five elements — each is separately marked",
      "Naming all three parties in the relationship, not two",
      "Applying each element to the statutory audit rather than defining it in the abstract",
    ],
    loses: [
      "Developing two elements at length and omitting the others, when the marks are spread evenly",
      "Describing the relationship as between auditor and directors only",
      "Explaining what an audit is instead of answering on the five elements",
    ],
  },

  "AA-01::levels": {
    title: "Reasonable assurance against limited assurance",
    format: "written",
    marks: 4,
    requirement:
      "Distinguish between reasonable assurance and limited assurance, explaining how the conclusion is expressed in each case. (4 marks)",
    plan: [
      {
        step: "Recognise a compare-and-contrast requirement and answer it in pairs",
        detail:
          "Four marks, two levels. Take each dimension and give BOTH sides of it — the level of assurance, the work performed, and the form of the conclusion. Describing reasonable assurance fully and then limited assurance fully risks never actually distinguishing them, which is the requirement verb.",
      },
      {
        step: "Get the level right: high but never absolute",
        detail:
          "Reasonable assurance is HIGH, not absolute. Writing that an audit gives absolute assurance is a factual error that will cost the mark and contradicts the next section of the syllabus.",
      },
      {
        step: "Attach the form of expression to each, since that is half the marks",
        detail:
          "Reasonable assurance is expressed POSITIVELY — 'in our opinion the financial statements give a true and fair view'. Limited assurance is expressed NEGATIVELY — 'nothing has come to our attention that causes us to believe...'. Quote the wording; it is the most examinable single fact in the section.",
      },
      {
        step: "Link the level to the amount of work, which explains why they differ",
        detail:
          "Reasonable assurance requires much more extensive procedures — tests of control and substantive testing. Limited assurance, as in a review engagement, relies principally on enquiry and analytical procedures, so less evidence is obtained and less assurance can be given.",
      },
    ],
    answer:
      "**Level of assurance.** **Reasonable assurance** is a **high**, though not absolute, level of assurance — the level provided by a statutory audit. **Limited assurance** is a **moderate** level, lower than reasonable assurance, and is the level provided by a review engagement.\n\n**Work performed.** A reasonable assurance engagement requires the practitioner to obtain **sufficient appropriate evidence** through a full range of procedures — risk assessment, tests of controls where appropriate, and substantive procedures including tests of detail. A limited assurance engagement relies principally on **enquiry and analytical procedures**, so substantially less evidence is gathered and the engagement costs less.\n\n**Form of the conclusion.** This is the clearest practical difference:\n\n· **Reasonable assurance — expressed positively:** *'In our opinion, the financial statements give a true and fair view of the financial position of the company as at ... .'*\n· **Limited assurance — expressed negatively:** *'Based on our review, **nothing has come to our attention** that causes us to believe that the financial statements do not give a true and fair view.'*\n\nThe negative form is used precisely because less work has been performed: the practitioner is not asserting that the statements are correct, only that nothing suggesting otherwise was found by the limited procedures carried out.",
    earns: [
      "Contrasting the two on each dimension rather than describing them separately",
      "Quoting the positive and negative forms of expression",
      "Linking the level of assurance to the extent of the work performed",
    ],
    loses: [
      "Claiming an audit gives absolute assurance",
      "Omitting the form of expression, which is half of what the requirement asks for",
    ],
  },

  "AA-01::limitations": {
    title: "Why an audit cannot give absolute assurance, and the expectation gap",
    format: "written",
    marks: 5,
    requirement:
      "Explain why an audit can never provide absolute assurance, and describe what is meant by the 'expectation gap'. (5 marks)",
    plan: [
      {
        step: "Split the five marks between the two halves of the requirement",
        detail:
          "Roughly three marks for the limitations and two for the expectation gap. BOTH halves must be answered — a full answer on inherent limitations that never defines the expectation gap loses two marks that cost one sentence each.",
      },
      {
        step: "Group the limitations rather than listing at random",
        detail:
          "Three groups: the nature of financial reporting (judgement and estimates), the nature of audit procedures (sampling, persuasive rather than conclusive evidence, reliance on management), and practical constraints (time and cost, and the audit's timing). Grouping makes it hard to run dry after two points.",
      },
      {
        step: "Include the limitations of internal control and management override",
        detail:
          "Any control system is subject to human error, collusion and MANAGEMENT OVERRIDE. Fraud involving collusion or forgery is specifically hard to detect, which is exactly the area where users' expectations are highest and the auditor's ability is lowest.",
      },
      {
        step: "Define the expectation gap as a difference in BELIEF, then give examples",
        detail:
          "It is the difference between what the public believes an auditor does and what the auditor actually does. Give two or three concrete beliefs: that the auditor tests everything, that the auditor is responsible for preventing and detecting all fraud, and that an unmodified opinion guarantees the company's future.",
      },
    ],
    answer:
      "**Why absolute assurance is not possible**\n\n**Financial statements themselves contain judgement.** Many figures are **estimates** — provisions, useful lives, impairments, fair values — on which reasonable people can legitimately differ. There is often no single correct amount for the auditor to verify against.\n\n**Audit evidence is persuasive rather than conclusive.** The auditor works on a **sample** rather than testing every transaction, so there is always sampling risk that a misstatement lies in the untested population. Much evidence is also indirect, and some — such as explanations from management — depends on the integrity of the people providing it.\n\n**Internal control has inherent limitations.** Any system is subject to **human error**, to **collusion** between employees, and to **management override**. Fraud concealed by collusion or forgery is by design difficult to detect, and the auditor is not a guarantor against it.\n\n**Practical constraints.** The audit must be completed within a **reasonable time and at a reasonable cost**, so an exhaustive examination is neither possible nor proportionate. Much of the work is also performed after the year end, on transactions already recorded.\n\n**The expectation gap**\n\nThe **expectation gap** is the difference between **what users believe an auditor does** and **what the auditor actually does and is responsible for**. Common misconceptions are that the auditor:\n\n· **tests every transaction**, when in fact the audit is based on sampling\n· is **responsible for preventing and detecting all fraud**, when prevention and detection are the responsibility of **management and those charged with governance**, and the auditor is responsible only for obtaining reasonable assurance that the financial statements are free from material misstatement, whether caused by fraud or error\n· **guarantees the company's future viability**, when the opinion addresses the financial statements and going concern only as at the date of the report\n· **certifies the accounts as accurate**, when the opinion is on whether they give a **true and fair view** — a matter of materiality, not precision\n\nThe gap matters because it exposes auditors to criticism and litigation for failures that were never their responsibility, and it is narrowed by clearer reporting — the auditor's report now explains the respective responsibilities of management and the auditor explicitly.",
    earns: [
      "Answering both halves of the requirement",
      "Grouping the limitations so the answer reaches enough distinct points",
      "Naming management override and collusion specifically",
      "Defining the expectation gap as a difference in belief and giving concrete examples",
    ],
    loses: [
      "Writing only about sampling, which is one point out of the several available",
      "Omitting the expectation gap, or defining it without examples",
      "Stating that the auditor is responsible for detecting all fraud",
    ],
  },

  /* ── AA-02 · The statutory audit: regulation and duties ─────────── */

  "AA-02::regulation": {
    title: "The regulatory framework the auditor works within",
    format: "written",
    marks: 4,
    requirement:
      "Explain the purpose of International Standards on Auditing (ISAs) and describe how they are developed and applied. (4 marks)",
    plan: [
      {
        step: "Identify the issuing body precisely",
        detail:
          "ISAs are issued by the INTERNATIONAL AUDITING AND ASSURANCE STANDARDS BOARD (IAASB), which operates under the International Federation of Accountants (IFAC). Naming the body accurately is a mark; 'international standard setters' is not.",
      },
      {
        step: "State what ISAs do and do not govern",
        detail:
          "They apply to the AUDIT of historical financial information. They do not override local law — where national legislation conflicts, the law prevails, and where local requirements are more onerous the auditor complies with both.",
      },
      {
        step: "Describe the due process, since the requirement asks how they are developed",
        detail:
          "A project is proposed and approved, an exposure draft is issued for PUBLIC COMMENT, responses are considered and debated, and a final standard is approved and issued. The public consultation stage is the point of the process and the one most often omitted.",
      },
      {
        step: "Explain why the framework exists, which reaches the fourth mark",
        detail:
          "Consistency and quality of audit work worldwide, credibility of the opinion, comparability for users across jurisdictions, and a benchmark against which an auditor's work can be judged if challenged.",
      },
    ],
    answer:
      "**What ISAs are and who issues them.** International Standards on Auditing are issued by the **International Auditing and Assurance Standards Board (IAASB)**, a board operating under the **International Federation of Accountants (IFAC)**. They apply to the **audit of historical financial information** and set out the objectives, requirements and application guidance for each area of an audit.\n\n**How they are developed.** The IAASB follows a formal **due process**: a project is proposed and approved for the work programme; an **exposure draft** is issued for **public comment**; the responses received are considered and debated in public session; and the standard is then approved, issued and given an effective date. The public consultation stage is what gives the standards their authority — they are developed transparently and with input from auditors, preparers, regulators and users.\n\n**How they are applied.** ISAs do **not override national law or regulation**. Where local legislation conflicts with an ISA, the **law prevails**; where local requirements are more onerous, the auditor complies with **both**. National standard setters may adopt ISAs directly or use them as the basis for their own standards.\n\n**Why the framework exists.** It promotes **consistency and quality** in audit work across firms and jurisdictions, gives **credibility** to the audit opinion because users know what standard of work lies behind it, allows users to **compare** audited information internationally, and provides an objective **benchmark** against which an auditor's work can be measured if their conduct is later challenged.",
    earns: [
      "Naming the IAASB and IFAC accurately",
      "Describing the due process including the public exposure draft stage",
      "Knowing that national law prevails over an ISA where the two conflict",
    ],
    loses: [
      "Attributing ISAs to the ACCA or to a national regulator",
      "Describing what ISAs contain without saying how they are developed, which the requirement asks",
    ],
  },

  "AA-02::appointment": {
    title: "Appointment, removal and resignation of the auditor",
    format: "mtq",
    marks: 10,
    requirement:
      "The following relate to the appointment and removal of auditors of Kessington Co, a company with a share capital held by twelve shareholders.\n\n(1) The company's first auditor, appointed shortly after incorporation, was appointed by the directors. Is this permitted?\nA  Yes  B  No\n\n(2) Which body normally appoints the auditor of a company at each subsequent annual general meeting?\nA  The board of directors  B  The shareholders in general meeting  C  The audit committee  D  The existing auditor\n\n(3) A resolution to remove the auditor before the expiry of their term of office requires:\nA  An ordinary resolution with special notice  B  A special resolution  C  A unanimous written resolution  D  A board resolution\n\n(4) Which of the following rights does an auditor have on being removed from office?\nA  A right to compensation for loss of office\nB  A right to make representations and to have them circulated to members\nC  A right to veto the appointment of a successor\nD  No rights, once the resolution is passed\n\n(5) An auditor who resigns must, where circumstances exist that should be brought to the attention of members or creditors:\nA  Do nothing further\nB  Deposit a statement of those circumstances at the company's registered office\nC  Notify the tax authorities\nD  Apply to the court",
    plan: [
      {
        step: "Answer each of the five independently, because each is separately marked",
        detail:
          "Two marks each, no method marks, and no carry-through between them. An uncertain task is still worth an attempt — there is no penalty for a wrong answer, and leaving one blank guarantees the loss of two marks.",
      },
      {
        step: "Hold on to the principle that decides most of these: the auditor works for the MEMBERS",
        detail:
          "The auditor reports to the shareholders on statements prepared by the directors. So the shareholders appoint, and the shareholders remove — because an audit the directors could hire and fire at will would provide no independent check on those same directors.",
      },
      {
        step: "Note the two exceptions where directors may act",
        detail:
          "Directors MAY appoint the FIRST auditor before the first general meeting, and MAY fill a CASUAL VACANCY. Both are practical measures to avoid a company being left without an auditor, and neither extends to removal.",
      },
      {
        step: "Learn removal and resignation as a matched pair of safeguards",
        detail:
          "Removal needs an ORDINARY resolution (a simple majority) but with SPECIAL NOTICE — 28 days — and the auditor may make written representations circulated to members and may speak at the meeting. On resignation the auditor must deposit a statement of circumstances. Both exist so that an auditor removed or resigning over a disagreement cannot be silently disposed of.",
      },
    ],
    answer:
      "**(1) A — Yes.** The **directors may appoint the first auditor**, to hold office until the conclusion of the first general meeting at which the financial statements are considered. This is a practical exception so that a newly incorporated company is not left without an auditor. Directors may also fill a **casual vacancy**.\n\n**(2) B — the shareholders in general meeting.** The auditor is appointed by the **members**, by ordinary resolution, and reports **to the members**. This is the foundation of audit independence: the auditor examines financial statements prepared by the **directors**, so if the directors controlled the appointment the audit would provide no independent check on them.\n\n**(3) A — an ordinary resolution with special notice.** Removal requires only a **simple majority**, but **special notice** of 28 days must be given to the company, which must then notify the auditor. The notice requirement is the safeguard: it prevents an auditor being removed without warning and gives them time to respond.\n\n**(4) B — a right to make representations and have them circulated to members.** A removed auditor may make **written representations** and require them to be circulated to the members, and may **attend and speak** at the meeting at which their removal or the appointment of a successor is considered. There is **no right to compensation** for loss of office, and no power to veto a successor.\n\n**(5) B — deposit a statement of the circumstances at the registered office.** An auditor's resignation letter must be accompanied by either a statement that there are **no circumstances** that should be brought to the attention of members or creditors, or a **statement of those circumstances**. The auditor may also requisition a general meeting to explain them.\n\n**The principle running through all five:** the appointment, removal and resignation rules exist to protect the auditor's **independence from the directors** whose statements they audit. Every answer above follows from asking who the auditor works for.",
    earns: [
      "Deriving the answers from the principle that the auditor reports to the members",
      "Knowing the two exceptions where directors may appoint — first auditor and casual vacancy",
      "Distinguishing an ordinary resolution with special notice from a special resolution",
    ],
    loses: [
      "Assuming the directors appoint and remove the auditor because they run the company",
      "Confusing 'special notice' with a 'special resolution' — the notice period differs from the majority required",
      "Leaving a task blank, when there is no penalty for a wrong answer",
    ],
  },

  "AA-02::rights-duties": {
    title: "The statutory rights and duties of the auditor",
    format: "written",
    marks: 5,
    requirement:
      "Describe the rights and duties of a company's external auditor. (5 marks)",
    plan: [
      {
        step: "Answer both halves and label them",
        detail:
          "Rights and duties are two separate lists and the marking guide will have both. Heading each in the answer guarantees the marker finds them, and stops the answer drifting into one list of five rights and no duties.",
      },
      {
        step: "Give the rights, remembering the ones about meetings",
        detail:
          "Access to the books and records AT ALL TIMES; information and explanations from officers and employees; notice of and attendance at general meetings; and the right to be heard on any business concerning them as auditors. The meeting rights are the ones most often forgotten and they are separately marked.",
      },
      {
        step: "Give the duties as the things actually reported on",
        detail:
          "To report to the members on whether the financial statements give a true and fair view and are properly prepared in accordance with the framework. Then the by-exception duties: whether proper accounting records have been kept, whether the statements agree with those records, and whether all information and explanations required were received.",
      },
      {
        step: "Explain why the rights exist, if a mark remains available",
        detail:
          "The rights are what make the duties performable. An auditor obliged to form an opinion but unable to demand records or explanations could not do the job, and obstruction is itself reportable — which links the two halves of the answer together.",
      },
    ],
    answer:
      "**Rights**\n\n· **Access to the company's books, accounts and vouchers at all times** — not only at the year end, so the auditor may attend and inspect whenever the audit requires it.\n· **Information and explanations** from the company's officers and employees as the auditor thinks necessary for the performance of their duties.\n· **Notice of, and attendance at, general meetings** of the company, in the same way as a member.\n· **The right to be heard** at those meetings on any business that concerns them as auditors.\n· **The right to receive notice of and make representations** in relation to their removal or resignation.\n\n**Duties**\n\n· To **report to the members** on whether the financial statements give a **true and fair view** and have been **properly prepared in accordance with the applicable financial reporting framework**.\n· To report **by exception** if:\n  — **proper accounting records have not been kept**\n  — the financial statements are **not in agreement** with the accounting records\n  — the auditor has **not received all the information and explanations** required for the audit\n  — in some jurisdictions, if disclosures of **directors' remuneration** are not made\n\n**Why the two are connected.** The rights exist in order to make the duties performable. An auditor required to form an opinion but unable to demand records or explanations could not discharge the duty — which is why a failure by the company to provide information is itself something the auditor must report on by exception.",
    earns: [
      "Separating rights from duties under headings",
      "Including the rights relating to general meetings, not only access to records",
      "Giving the by-exception reporting duties as well as the opinion itself",
    ],
    loses: [
      "Listing rights only, when duties carry half the marks",
      "Describing the audit process rather than the statutory rights and duties",
    ],
  },

  /* ── AA-03 · Corporate governance and the audit committee ───────── */

  "AA-03::principles": {
    title: "The corporate governance principles that matter to an auditor",
    format: "written",
    marks: 6,
    requirement:
      "Explain the principles of corporate governance that are of most relevance to the external auditor, and why each is relevant. (6 marks)",
    plan: [
      {
        step: "Read 'of most relevance to the external auditor' as the discriminator",
        detail:
          "The requirement is not 'list the principles of corporate governance'. Every principle offered must be followed by WHY IT MATTERS TO THE AUDITOR — the second half is where the marks are, and a list of principles alone will score about half.",
      },
      {
        step: "Select the principles that bear on the control environment",
        detail:
          "Board composition and the independence of non-executive directors; separation of the roles of chair and chief executive; the audit committee; risk management and internal control review; and directors' remuneration linked to performance.",
      },
      {
        step: "Attach the audit relevance to each in one clause",
        detail:
          "Independent NEDs and a chair-CEO split reduce the risk of domination by one individual, which reduces the risk of MANAGEMENT OVERRIDE. An audit committee gives the auditor an independent channel. A board that reviews internal control strengthens the control environment on which the auditor may place reliance.",
      },
      {
        step: "Bring in the assessment the auditor actually makes",
        detail:
          "The control environment is part of the entity's system of internal control under ISA 315, so governance weaknesses raise assessed RISK OF MATERIAL MISSTATEMENT and lead to a more substantive audit approach. Saying this converts a governance answer into an audit answer.",
      },
    ],
    answer:
      "**Board composition and independent non-executive directors.** A board should include a balance of executive and **independent non-executive directors**, so that no individual or small group dominates decision making. *Relevance to the auditor:* domination by one person materially increases the risk of **management override of controls** and of fraudulent financial reporting, which is a fraud risk factor the auditor must consider under ISA 240.\n\n**Separation of the roles of chair and chief executive.** The two roles should be held by different people, dividing the running of the board from the running of the business. *Relevance:* the same concentration-of-power risk. Where one person holds both roles the auditor would expect to assess the control environment as weaker.\n\n**An audit committee of independent non-executive directors.** *Relevance:* it gives the auditor an **independent channel** through which to raise concerns, escalate control deficiencies and discuss disagreements with management, and it provides a body outside the finance function to whom significant findings are reported.\n\n**Board responsibility for risk management and internal control, with an annual review.** *Relevance:* the auditor obtains an understanding of internal control as part of risk assessment. A board that actively reviews control strengthens the **control environment**, and may allow the auditor to adopt a controls-based approach and reduce substantive testing.\n\n**Directors' remuneration aligned with long-term performance.** *Relevance:* remuneration heavily dependent on reported results creates an **incentive to manipulate** those results — a classic fraud risk factor, which the auditor considers when identifying risks of material misstatement.\n\n**Transparency and accountability to shareholders.** *Relevance:* governance disclosures and the annual report as a whole are **other information** the auditor must read for material inconsistency with the audited financial statements.\n\n**The overall point.** The control environment is a component of the entity's system of internal control, so governance weaknesses feed directly into the **assessed risk of material misstatement** and therefore into the nature, timing and extent of audit procedures.",
    earns: [
      "Pairing each principle with its specific relevance to the auditor",
      "Linking governance weakness to management override and to fraud risk factors",
      "Connecting the control environment to the assessed risk and the audit approach",
    ],
    loses: [
      "Listing governance principles with no audit relevance attached",
      "Writing about the benefits of governance to the company generally, which is not the requirement",
    ],
  },

  "AA-03::audit-committee": {
    title: "The audit committee: composition, responsibilities and benefits",
    format: "written",
    marks: 8,
    requirement:
      "Describe the composition and principal responsibilities of an audit committee, and explain the benefits an audit committee provides to the external auditor. (8 marks)",
    plan: [
      {
        step: "Treat eight marks as eight points, split across the three parts asked for",
        detail:
          "Composition, responsibilities, benefits. Roughly one or two marks for composition, three for responsibilities and three for benefits. Each point is one mark, so eight short, distinct points beat four developed paragraphs — this is where an FR-trained candidate loses marks in AA.",
      },
      {
        step: "Get the composition detail exactly right",
        detail:
          "At least three (two in a smaller company) INDEPENDENT NON-EXECUTIVE directors, at least one of whom has RECENT AND RELEVANT FINANCIAL EXPERIENCE. Both the independence and the financial-experience points are separately marked, and 'a committee of directors' earns neither.",
      },
      {
        step: "List the responsibilities as separate marks",
        detail:
          "Monitoring the integrity of the financial statements; reviewing internal financial controls and risk management; monitoring the effectiveness of internal audit; recommending the appointment, reappointment and removal of the external auditor; approving their remuneration and terms; reviewing their independence including non-audit services; and reviewing whistleblowing arrangements.",
      },
      {
        step: "Answer the benefits from the AUDITOR's point of view, not the company's",
        detail:
          "The requirement says benefits to the external auditor. Independent appointment reduces fee-related pressure; an independent forum for disagreements with management; a route to escalate control deficiencies; assistance in obtaining information; and a stronger control environment that may reduce substantive work.",
      },
    ],
    answer:
      "**Composition**\n\n· At least **three independent non-executive directors** (two in a smaller company), with **no executive directors** as members.\n· At least **one member** must have **recent and relevant financial experience**.\n· Members should have **competence relevant to the sector** in which the company operates.\n\n**Principal responsibilities**\n\n· **Monitoring the integrity of the financial statements**, including reviewing significant financial reporting judgements they contain.\n· **Reviewing the company's internal financial controls** and, unless a separate risk committee exists, its internal control and risk management systems.\n· **Monitoring and reviewing the effectiveness of the internal audit function**, and where there is none, considering annually whether one is needed.\n· **Making recommendations to the board on the appointment, reappointment and removal of the external auditor**, and approving their remuneration and terms of engagement.\n· **Reviewing and monitoring the external auditor's independence and objectivity**, including the policy on the supply of **non-audit services**.\n· **Reviewing the effectiveness of the external audit process**.\n· **Reviewing arrangements for whistleblowing**, by which staff may raise concerns in confidence.\n\n**Benefits to the external auditor**\n\n· **Appointment and remuneration are recommended by an independent body**, reducing the pressure that arises where the executives whose statements are being audited also decide the auditor's fee and tenure.\n· **An independent forum for disagreements** with management over accounting treatments or audit findings, so a dispute need not be resolved solely with the finance director.\n· **A route to escalate significant deficiencies** in internal control to people outside the finance function, which makes it far more likely they are acted on.\n· **Assistance in obtaining information and cooperation** from management, since the committee can require it.\n· **A stronger control environment**, which lowers the assessed risk of material misstatement and may permit greater reliance on controls and less substantive testing.\n· **Reinforced independence** through the committee's review of non-audit services, which protects the auditor from being placed in a self-review position.",
    earns: [
      "Specifying three independent NEDs and one with recent relevant financial experience",
      "Giving responsibilities as discrete, separately markable points",
      "Answering the benefits from the auditor's perspective, which is what was asked",
    ],
    loses: [
      "Writing four developed paragraphs where the guide wants eight points",
      "Describing benefits to the company rather than to the external auditor",
      "Omitting the financial-experience requirement from the composition",
    ],
  },

  "AA-03::analysing-deficiencies": {
    title: "Analysing a governance scenario and recommending improvements",
    format: "written",
    marks: 10,
    requirement:
      "Marchmont Co is a listed company. Its board consists of the chief executive, who was appointed chair last year on the retirement of the previous chair, three other executive directors and one non-executive director, who is the brother-in-law of the finance director. There is no audit committee; the board reviews the financial statements as a whole. The internal audit function reports to the finance director. Directors' bonuses are based entirely on the reported profit for the year.\n\nIdentify and explain FIVE corporate governance deficiencies at Marchmont Co, and recommend an improvement to address each one. (10 marks)",
    plan: [
      {
        step: "Read the mark allocation as five pairs",
        detail:
          "Ten marks, five deficiencies — one mark for identifying and explaining each deficiency, one for the matching recommendation. A deficiency with no recommendation scores half. Five complete pairs is a full-mark answer, so structure the page as five pairs before writing anything.",
      },
      {
        step: "Take deficiencies only from the scenario, one per stated fact",
        detail:
          "The scenario is written so that each sentence contains one deficiency: combined chair and chief executive, only one NED, that NED is not independent, no audit committee, internal audit reporting to the finance director, and bonuses based solely on profit. Six are available for five marks' worth of requirement — pick the five strongest and do them properly.",
      },
      {
        step: "Explain the CONSEQUENCE, because that is what the explain mark is for",
        detail:
          "'There is no audit committee' is identification only. The mark comes from what follows: no independent body reviews the financial statements or the external auditor's independence, and the auditor has no forum outside the executive board in which to raise concerns.",
      },
      {
        step: "Make each recommendation specific and capable of being implemented",
        detail:
          "'Improve governance' is worth nothing. 'Appoint a separate chair, and appoint at least two further independent non-executive directors so that the board contains a balance of executive and independent non-executive members' is a recommendation the company could act on tomorrow. Address the deficiency you just named, and nothing else.",
      },
      {
        step: "Use a two-column or paired-heading layout",
        detail:
          "Deficiency then Recommendation, five times, clearly separated. The marking guide is organised in exactly these pairs, and a marker who can see the pairing awards both marks without hunting for the recommendation.",
      },
    ],
    answer:
      "**1. The roles of chair and chief executive are held by the same person**\n\n*Deficiency:* The chief executive has been appointed chair, so one individual runs both the board and the business. This concentrates power, removes the check the chair should provide over the executive, and materially increases the risk of **management override of controls**.\n\n*Recommendation:* **Separate the two roles.** Appoint an independent non-executive chair, and have the chief executive revert to running the business and reporting to the board.\n\n**2. There is only one non-executive director**\n\n*Deficiency:* With four executives and one non-executive, the board has no balance. The executives can carry any decision, and there is no effective independent challenge to management's judgements — including the accounting judgements in the financial statements.\n\n*Recommendation:* **Appoint further independent non-executive directors** so that they make up at least half of the board excluding the chair, as expected of a listed company.\n\n**3. The sole non-executive director is not independent**\n\n*Deficiency:* He is the **brother-in-law of the finance director**, a close family relationship that compromises his independence. He cannot be relied on to challenge the finance director objectively, so the board has, in substance, **no independent element at all**.\n\n*Recommendation:* Assess non-executive directors against the **independence criteria** before appointment, and **replace him with a director having no family, employment or business relationship** with the company or its directors.\n\n**4. There is no audit committee**\n\n*Deficiency:* No independent body reviews the integrity of the financial statements, monitors internal control, oversees internal audit, or reviews the external auditor's independence and non-audit services. The external auditor also has **no forum outside the executive board** in which to raise concerns or report control deficiencies.\n\n*Recommendation:* **Establish an audit committee** of at least three independent non-executive directors, at least one with recent and relevant financial experience, with responsibility for the financial statements, internal control, internal audit and the relationship with the external auditor.\n\n**5. Internal audit reports to the finance director**\n\n*Deficiency:* Internal audit is not independent of the function it examines. The finance director controls its scope, its findings and its budget, so any finding critical of the finance function — or of the finance director — may be suppressed, and the external auditor could place little reliance on its work.\n\n*Recommendation:* **Internal audit should report to the audit committee**, which should approve its plan, receive its reports directly and be responsible for appointing and removing the head of internal audit.\n\n**6. Directors' bonuses depend entirely on reported profit**\n\n*Deficiency:* This creates a direct **incentive to manipulate reported profit**, a fraud risk factor. It also encourages decisions that raise short-term profit at the expense of the company's longer-term interests.\n\n*Recommendation:* Establish a **remuneration committee of independent non-executive directors** to set directors' pay, and base a **significant proportion of variable pay on long-term and non-financial measures** rather than on a single year's reported profit.",
    earns: [
      "Five complete deficiency-and-recommendation pairs, laid out as pairs",
      "Explaining the consequence of each deficiency rather than restating the scenario",
      "Recommendations that are specific and directly address the deficiency named",
      "Taking every point from a fact stated in the scenario",
    ],
    loses: [
      "Identifying deficiencies with no recommendations, which halves the available marks",
      "Generic recommendations such as 'strengthen corporate governance'",
      "Restating scenario facts without explaining why each is a deficiency",
      "Writing about governance in general instead of about Marchmont Co",
    ],
  },

  /* ── AA-04 · Professional ethics and the ACCA Code ──────────────── */

  "AA-04::principles-threats": {
    title: "The five fundamental principles and the five threats",
    format: "mtq",
    marks: 10,
    requirement:
      "For each of the following situations at Ravenscar Co, identify the threat to the auditor's compliance with the fundamental principles.\n\n(1) The audit engagement partner has held that role on this audit for the last nine years.\nA  Self-interest  B  Self-review  C  Familiarity  D  Intimidation\n\n(2) The audit firm prepared the financial statements of the client, and is now auditing them.\nA  Self-interest  B  Self-review  C  Advocacy  D  Familiarity\n\n(3) The client has threatened to put the audit out to tender unless the firm agrees with management's treatment of a disputed provision.\nA  Self-interest  B  Advocacy  C  Familiarity  D  Intimidation\n\n(4) Fees from this client represent 18% of the firm's total fee income, and have done for the last two years.\nA  Self-interest  B  Self-review  C  Advocacy  D  Intimidation\n\n(5) A partner in the firm has agreed to act as an expert witness defending the client in a legal dispute.\nA  Self-interest  B  Self-review  C  Advocacy  D  Familiarity",
    plan: [
      {
        step: "Fix the five threats by their one-line definition first",
        detail:
          "SELF-INTEREST — a financial or other interest that could inappropriately influence judgement. SELF-REVIEW — evaluating the firm's own previous work or judgement. ADVOCACY — promoting the client's position to the point that objectivity is compromised. FAMILIARITY — a long or close relationship making the auditor too sympathetic. INTIMIDATION — being deterred from acting objectively by pressure or threat.",
      },
      {
        step: "Ask one question per task: what exactly would bias the judgement?",
        detail:
          "The definitions overlap in practice, so identify the MECHANISM. Long association biases through sympathy (familiarity). Auditing your own work biases through reluctance to find your own error (self-review). A threat biases through fear (intimidation). Naming the mechanism decides between two plausible options.",
      },
      {
        step: "Watch the two that most often get confused",
        detail:
          "Fee dependence is SELF-INTEREST — the firm does not want to lose income — while a threat to remove the firm is INTIMIDATION, because pressure is being applied. The distinction is whether the auditor is drawn by their own interest or pushed by someone else's pressure.",
      },
      {
        step: "Remember the safeguard behind each, since the written version of this always follows",
        detail:
          "Rotate the partner (7 years for a listed client, with a cooling-off period). Do not prepare the records you audit. Escalate a threat to those charged with governance. Monitor fee dependence against the 15% listed-client threshold. Decline the advocacy role.",
      },
    ],
    answer:
      "**(1) C — Familiarity.** Nine years as engagement partner is **long association**. The partner may become too sympathetic to the client's interests and too accepting of its explanations. *Safeguard:* rotate the key audit partner — for a listed or public interest entity, after **seven years**, with a cooling-off period before returning.\n\n**(2) B — Self-review.** The firm would be **auditing its own work**. Any error made in preparing the statements is unlikely to be identified objectively by the people who made it. *Safeguard:* do not prepare the financial statements of an audit client; for a listed client this service is **prohibited** outright.\n\n**(3) D — Intimidation.** The auditor is being **pressured by a threat** — agree with us or lose the engagement — and is deterred from acting objectively. *Safeguard:* discuss with **those charged with governance**, and be prepared to modify the opinion or resign. The correct treatment of the provision cannot be a negotiating position.\n\n**(4) A — Self-interest.** The firm has a **financial interest** in retaining a client that provides 18% of its income, and may hesitate to challenge management for fear of losing it. *Safeguard:* fees from a listed client exceeding **15% of total fee income for two consecutive years** must be disclosed to those charged with governance, with safeguards such as a **pre- or post-issuance review** by an external accountant, and reducing dependence.\n\n**(5) C — Advocacy.** Acting as an **expert witness for the client** puts the firm in the position of promoting the client's position, which is incompatible with the objectivity required to audit it. *Safeguard:* **decline the role**.\n\n**The five fundamental principles these threats endanger:** **integrity**, **objectivity**, **professional competence and due care**, **confidentiality**, and **professional behaviour**. Objectivity is the principle most directly threatened in all five situations above.",
    earns: [
      "Identifying the mechanism of bias rather than pattern-matching the words in the stem",
      "Distinguishing self-interest (drawn by own gain) from intimidation (pushed by pressure)",
      "Knowing the safeguard attached to each threat, which the written version of this question always requires",
    ],
    loses: [
      "Calling fee dependence an intimidation threat",
      "Calling long association a self-interest threat",
      "Leaving a task blank rather than choosing between two plausible options",
    ],
  },

  "AA-04::specific-rules": {
    title: "The specific rules: fees, services, relationships and rotation",
    format: "written",
    marks: 8,
    requirement:
      "Explain the ethical threats arising in each of the following situations at Denbigh Co, a listed audit client, and for each state an appropriate safeguard.\n\n(i)  The firm has been asked to perform the valuation of Denbigh Co's brand names, which are material to the financial statements.\n(ii) The finance director has offered the audit team a weekend away at a luxury hotel to thank them for meeting a tight deadline.\n(iii) The audit senior has been offered a job as Denbigh Co's financial controller, and is still working on the audit.\n(iv) The firm has proposed a fee based on 2% of Denbigh Co's reported profit before tax. (8 marks)",
    plan: [
      {
        step: "Take four situations at two marks each, and answer both halves of every one",
        detail:
          "One mark for identifying and explaining the threat, one for the safeguard. Four threats with no safeguards scores four out of eight. Structure the page as four pairs before writing.",
      },
      {
        step: "Name the threat precisely, and say WHY it is that threat",
        detail:
          "'A self-review threat arises' is identification. The mark comes from the mechanism: the firm would audit a valuation it produced itself, and would be reluctant to conclude that its own valuation was wrong.",
      },
      {
        step: "Check whether the client is listed, because it changes the answer",
        detail:
          "Denbigh Co is LISTED, so several services are prohibited outright rather than safeguarded. A valuation of a material amount for a listed client cannot be performed with safeguards — the firm must decline. Saying 'apply safeguards' where the Code says 'do not do it' loses the mark.",
      },
      {
        step: "Make each safeguard match the specific threat",
        detail:
          "Decline the valuation. Decline the hospitality unless trivial and inconsequential. Remove the senior from the team immediately and review their work. Decline a contingent fee outright — it is prohibited for audit engagements.",
      },
    ],
    answer:
      "**(i) Valuation of material brand names — self-review threat**\n\n*Threat:* The firm would **audit its own valuation**. Having produced the figure, the audit team is unlikely to challenge it objectively, since doing so means concluding that a colleague's work was wrong. Because the brands are **material**, the amount involved could affect the opinion.\n\n*Safeguard:* Denbigh Co is a **listed (public interest) entity**, and providing a valuation service that is material and involves a significant degree of subjectivity is **prohibited**. The firm must **decline the engagement**. (For a non-listed client, safeguards such as using a separate team with no audit involvement and an independent review might be adequate.)\n\n**(ii) Weekend at a luxury hotel — self-interest and familiarity threats**\n\n*Threat:* Accepting **hospitality of significant value** creates a self-interest threat — the team benefits personally from the client — and a familiarity threat, as the relationship becomes too close for objective challenge. It could also appear to an informed observer that the team's judgement had been bought.\n\n*Safeguard:* Gifts and hospitality may only be accepted where they are **trivial and inconsequential**. A luxury weekend is not, so the offer must be **declined politely**, and the firm should have a policy requiring staff to report and refuse such offers.\n\n**(iii) Audit senior offered a job with the client — self-interest and familiarity threats**\n\n*Threat:* The senior has a clear **self-interest** in a future employer, and may avoid raising issues that would jeopardise the appointment. Once employed, they would also have detailed knowledge of the audit approach, which could be used to conceal misstatement.\n\n*Safeguard:* **Remove the senior from the audit team immediately** and **review all the work they have performed** on the current audit for evidence of bias. Firms should require staff to notify such approaches at once.\n\n**(iv) Fee based on 2% of profit before tax — self-interest threat**\n\n*Threat:* This is a **contingent fee** — the amount depends on the outcome of the work. The firm has a direct financial interest in the client reporting a **higher profit**, which is precisely the figure the audit is meant to test objectively.\n\n*Safeguard:* Contingent fees are **prohibited for audit engagements**; no safeguard can reduce the threat to an acceptable level. The fee must instead be based on the **time, skill and seniority** required to perform the work.",
    earns: [
      "A threat and a safeguard for every one of the four situations",
      "Explaining the mechanism of each threat rather than naming it only",
      "Recognising where the Code prohibits rather than safeguards, because the client is listed",
      "Knowing contingent fees are prohibited outright for audit work",
    ],
    loses: [
      "Naming threats without safeguards, which halves the marks",
      "Offering safeguards for services that are prohibited for a listed client",
      "Identifying only one threat where a situation gives rise to two",
    ],
  },

  "AA-04::confidentiality": {
    title: "Confidentiality: when disclosure is permitted, and conflicts of interest",
    format: "written",
    marks: 5,
    requirement:
      "Explain the principle of confidentiality, and describe the circumstances in which an auditor may or must disclose confidential client information. (5 marks)",
    plan: [
      {
        step: "State the principle precisely, including the part candidates omit",
        detail:
          "Confidentiality means not disclosing information acquired through professional relationships without proper authority, AND not using it for personal advantage. The second limb is separately marked and is the one usually forgotten.",
      },
      {
        step: "Split disclosure into obligatory and voluntary — the structure the guide follows",
        detail:
          "OBLIGATORY: required by law, such as money laundering and terrorism reporting, or a court order. VOLUNTARY: permitted where in the public interest, to protect the member's own interests, authorised by law, or with the client's consent. Two headings, several marks.",
      },
      {
        step: "Give concrete examples, because abstractions do not score",
        detail:
          "Money laundering reporting to the relevant authority, compliance with a court order or subpoena, defending oneself in disciplinary or legal proceedings, and a quality review by the professional body.",
      },
      {
        step: "Note the point that confidentiality outlives the engagement",
        detail:
          "It continues AFTER the relationship ends. An auditor who ceases to act remains bound, which is why professional clearance requires the CLIENT's permission before the outgoing auditor may respond.",
      },
    ],
    answer:
      "**The principle.** Confidentiality requires a professional accountant to **refrain from disclosing** information acquired as a result of professional and business relationships **without proper and specific authority**, and to **refrain from using** that information for the **personal advantage** of themselves or a third party. Both limbs matter: using client information to deal in its shares breaches the principle just as disclosure does.\n\nThe duty **continues after the professional relationship has ended**. This is why, when a prospective client is approached, the incoming auditor must obtain the **client's permission** before the outgoing auditor may respond to a professional clearance request — and a refusal of permission is itself a matter the incoming auditor should treat as a warning sign.\n\n**Disclosure that is OBLIGATORY** — the auditor must disclose:\n\n· where required by **law**, most importantly a suspicion of **money laundering** or **terrorist financing**, reported to the appropriate authority. Tipping off the client that such a report has been made is itself an offence\n· in compliance with a **court order or subpoena**, or to a regulator exercising statutory powers\n\n**Disclosure that is VOLUNTARY** — the auditor may disclose:\n\n· where **authorised by the client**, which is the ordinary case\n· where **permitted by law and in the public interest** — for example where non-disclosure would allow a serious harm to continue\n· to **protect the member's own interests**, such as defending against a negligence claim or answering a disciplinary allegation\n· to comply with a **quality review** by the ACCA or another professional body\n\n**Conflicts of interest.** Where the firm acts for two clients whose interests conflict — competitors, or parties to a transaction — the firm must **obtain informed consent** from both, and put safeguards in place: **separate engagement teams**, **information barriers** between them, **confidentiality agreements** signed by staff, and independent review. Where the conflict cannot be managed, the firm should **decline or resign** from one of the engagements.",
    earns: [
      "Including the 'not for personal advantage' limb of the principle",
      "Separating obligatory from voluntary disclosure",
      "Giving concrete statutory examples, particularly money laundering",
      "Knowing the duty survives the end of the engagement",
    ],
    loses: [
      "Listing circumstances without distinguishing 'must' from 'may'",
      "Stating that the auditor may disclose whenever they suspect wrongdoing, which overstates the public interest exception",
    ],
  },

  /* ── AA-05 · Internal audit ─────────────────────────────────────── */

  "AA-05::differences": {
    title: "Internal audit against external audit",
    format: "written",
    marks: 6,
    requirement:
      "Explain the differences between internal audit and external audit. (6 marks)",
    plan: [
      {
        step: "Answer in matched pairs across fixed dimensions",
        detail:
          "Objective, scope, who appoints, who the report goes to, whether it is required by law, and the status of the person performing it. Six dimensions, six marks. A comparison answered dimension by dimension cannot drift, and each dimension is one mark.",
      },
      {
        step: "Get the objectives exactly right, as they drive everything else",
        detail:
          "EXTERNAL audit exists to give an opinion on whether the financial statements give a true and fair view, for the SHAREHOLDERS. INTERNAL audit exists to improve the entity's operations and risk management, for MANAGEMENT or the audit committee. Every other difference follows from this.",
      },
      {
        step: "Be precise about independence rather than saying internal audit is not independent",
        detail:
          "External auditors must be independent of the entity — it is a statutory and ethical requirement. Internal auditors are usually EMPLOYEES, so they can never have the same independence, though it is strengthened by reporting to the audit committee rather than to the finance director.",
      },
      {
        step: "Note the one similarity worth a mark",
        detail:
          "Both use similar techniques — sampling, testing controls, documenting systems — which is why ISA 610 permits the external auditor to use internal audit's work in certain circumstances. It connects this section to the Area D material.",
      },
    ],
    answer:
      "| | **External audit** | **Internal audit** |\n|---|---|---|\n| **Objective** | To express an **opinion** on whether the financial statements give a **true and fair view** | To **improve the entity's operations**, evaluating and improving risk management, control and governance |\n| **Reports to** | The **shareholders** (members) | **Management** and/or the **audit committee** |\n| **Appointed by** | The **shareholders** in general meeting | **Management** or the audit committee |\n| **Scope of work** | Determined by the **auditor**, driven by what is needed to support the opinion on the financial statements | Determined by **management** or the audit committee; may cover any area of the business, financial or operational |\n| **Required by** | **Statute**, for companies above the relevant thresholds | **Voluntary** — a matter of choice, though listed companies must annually consider the need for one |\n| **Status** | **Independent** of the entity, as required by law and the ethical code | Usually **employees** of the entity, so never independent in the same sense |\n\n**On independence.** The external auditor's independence is a statutory and ethical requirement, and their objectivity is the source of the audit's value to shareholders. An internal auditor is normally an employee and therefore cannot be independent in the same way. Their objectivity is strengthened by structural safeguards — reporting to the **audit committee** rather than to the finance director, having no operational responsibility for the areas they audit, and having their appointment and removal controlled by the committee.\n\n**One important similarity.** Both use broadly the **same techniques** — documenting and evaluating systems, testing controls, sampling, and analytical procedures. That overlap is why **ISA 610** permits the external auditor, in defined circumstances, to **use the work of internal audit**, provided its objectivity, competence and systematic approach have first been evaluated.",
    earns: [
      "Contrasting across fixed dimensions so each comparison is separately markable",
      "Deriving the differences from the difference in objective",
      "Explaining internal audit objectivity through structural safeguards rather than calling it independent",
      "Noting the similarity of technique that underlies ISA 610",
    ],
    loses: [
      "Describing each function separately without contrasting them",
      "Saying internal audit reports to shareholders, or that external audit is appointed by directors",
    ],
  },

  "AA-05::assignments": {
    title: "The assignments an internal audit function performs",
    format: "written",
    marks: 8,
    requirement:
      "Describe FOUR assignments that an internal audit function might be asked to perform, explaining the purpose of each and the benefit it provides to the company. (8 marks)",
    plan: [
      {
        step: "Read the allocation: four assignments, two marks each",
        detail:
          "One mark for describing the assignment and one for its purpose or benefit. Naming eight assignments with no description scores far less than four described properly — for once in AA, the requirement itself sets the number, so give exactly four.",
      },
      {
        step: "Choose four that are genuinely different from each other",
        detail:
          "Value for money, operational, IT systems, fraud investigation, regulatory compliance, and financial (reviewing the accounting records and controls). Choosing four from different families shows the breadth of the function; four variations on financial audit does not.",
      },
      {
        step: "Use the three Es whenever value for money appears",
        detail:
          "ECONOMY — obtaining inputs at lowest reasonable cost. EFFICIENCY — output per unit of input. EFFECTIVENESS — whether the objective was achieved. This framework is examinable in its own right and is the natural content of the VFM description.",
      },
      {
        step: "State the benefit to the company, not to internal audit",
        detail:
          "Cost savings identified, controls strengthened before losses occur, fraud detected earlier, regulatory penalties avoided, and reliable information for management decisions. This is the second mark in each pair.",
      },
    ],
    answer:
      "**1. Value for money review**\n\n*What it involves:* Examining an activity, department or project against the **three Es** — **economy** (are inputs acquired at the lowest reasonable cost?), **efficiency** (how much output is obtained per unit of input?) and **effectiveness** (is the activity achieving its objectives?).\n\n*Benefit:* Identifies **waste and cost savings** and improves the use of resources. It is particularly valuable in areas with no direct profit measure — support functions, and public sector or not-for-profit bodies where value for money replaces profit as the performance measure.\n\n**2. Operational audit**\n\n*What it involves:* Reviewing the **controls and procedures within a business function** — the purchasing cycle, the payroll department, inventory management — to assess whether they operate as intended and whether risks are adequately controlled.\n\n*Benefit:* **Deficiencies are found and corrected before they cause losses**, and recommendations improve the efficiency of the process. It also gives management independent assurance that operations are running as they believe.\n\n**3. Information technology systems audit**\n\n*What it involves:* Reviewing **general IT controls** (access controls, password policies, physical security, change management, back-ups and disaster recovery) and **application controls** within specific systems, and testing the integrity and completeness of the data they hold.\n\n*Benefit:* Protects the company against **data loss, cyber attack, unauthorised access and system failure**, and gives assurance that the information management relies on is complete and accurate. As controls become increasingly automated, weaknesses here affect every other system.\n\n**4. Fraud investigation**\n\n*What it involves:* Investigating a **suspected fraud** — establishing what occurred, quantifying the loss, identifying the control weakness that permitted it, and gathering evidence for disciplinary or legal action. Internal audit may also perform proactive work to assess exposure to fraud.\n\n*Benefit:* **Losses are quantified and recovered where possible**, the control weakness is closed so the fraud cannot recur, and the existence of an investigative function is itself a **deterrent**.\n\n*(Other assignments available: regulatory compliance reviews, financial audit of the accounting records and controls, procurement audits, and post-completion project reviews.)*",
    earns: [
      "Giving exactly the four assignments asked for, each with a purpose and a benefit",
      "Choosing assignments from genuinely different families",
      "Using the three Es to structure the value for money answer",
      "Stating benefits to the company rather than describing the work again",
    ],
    loses: [
      "Listing many assignments with a few words each, when two marks each are on offer",
      "Describing what is done without saying why it benefits the company",
      "Offering four variations on the same financial-controls review",
    ],
  },

  "AA-05::outsourcing": {
    title: "Outsourcing the internal audit function",
    format: "written",
    marks: 8,
    requirement:
      "Explain the advantages and disadvantages to a company of outsourcing its internal audit function, including the additional considerations that arise where the function is outsourced to the company's external auditor. (8 marks)",
    plan: [
      {
        step: "Split eight marks across three parts and give all three",
        detail:
          "Roughly three marks of advantages, three of disadvantages and two on the external-auditor complication. An answer that gives a strong list of advantages and stops has capped itself at three — a balanced requirement wants both sides plus the specific issue named.",
      },
      {
        step: "Frame the advantages around what a firm has that a company does not",
        detail:
          "Immediate access to specialist skills and experience, no recruitment or training cost, flexible resourcing that can be scaled up and down, immediate availability, and exposure to best practice from other clients. Cost is an advantage only in the sense that fixed employment costs become variable — say it that way.",
      },
      {
        step: "Frame the disadvantages around what an employee has that a firm does not",
        detail:
          "Knowledge of the business built over years, permanent presence and availability, no risk of losing the knowledge when a contract ends, and no confidentiality exposure to an outside party. Add the fee, which may exceed the cost of employed staff.",
      },
      {
        step: "Handle the external auditor point as an ETHICAL issue, precisely",
        detail:
          "A SELF-REVIEW threat: the external auditor would place reliance on internal audit work performed by their own firm, and may be auditing controls they helped design. For a LISTED or public interest entity this service is PROHIBITED. For others, safeguards are needed — separate teams, no involvement in management decisions, and no reliance on the firm's own internal audit work.",
      },
    ],
    answer:
      "**Advantages of outsourcing**\n\n· **Immediate access to specialist skills.** A professional firm can supply expertise the company does not employ — IT and cyber security, tax, treasury, or industry-specific regulation — for the period it is required.\n· **No recruitment, training or retention cost.** Setting up an in-house function takes time and money; an outsourced function can be **operational almost immediately**.\n· **Flexible resourcing.** Staff numbers can be **scaled up or down** with the work programme, so the company pays for the work it needs rather than carrying a fixed team through quiet periods. Fixed employment cost becomes a variable cost.\n· **Best practice from elsewhere.** The firm sees many organisations and brings **comparative knowledge** the company's own staff would not have.\n· **Objectivity.** An external provider is not an employee, has no career within the company and no personal relationships with the staff being reviewed, which can make challenge easier.\n\n**Disadvantages of outsourcing**\n\n· **Loss of in-house knowledge.** Employed internal auditors accumulate detailed understanding of the systems, the people and the history. An external provider **starts from a lower base**, and that knowledge **leaves with the contract** when it ends.\n· **Cost.** Professional firm fees may **exceed the cost** of employing equivalent staff, particularly for a substantial ongoing function.\n· **Confidentiality.** Sensitive commercial information is disclosed to an outside party, requiring confidentiality agreements and controls.\n· **Availability and staff turnover.** The provider's staff may be **rotated** between assignments, so continuity suffers, and they may not be available at short notice when an urgent issue arises.\n· **Reduced control and possible resistance.** The company has less direct control over how the work is done, and existing staff may see the arrangement as a threat, reducing cooperation.\n\n**Where the function is outsourced to the external auditor**\n\nThis creates a **self-review threat**. The external auditor may wish to **place reliance on internal audit's work** under ISA 610 — but that work would have been performed by their own firm, so they would in effect be relying on and evaluating their own work. There is also a risk of the firm auditing **controls it helped to design or operate**, and, if the work strays into decision-making, of assuming a **management responsibility**, which the Code prohibits.\n\nFor a **listed or other public interest entity**, providing internal audit services to an audit client is **prohibited**. For other clients, safeguards are required: **separate engagement teams** with different partners, no involvement of the internal audit team in the external audit, ensuring the **client retains responsibility** for the internal audit function and for all decisions, and the external audit team placing **no reliance** on the internal audit work performed by their own firm.",
    earns: [
      "Covering advantages, disadvantages and the external-auditor issue, as the requirement asks",
      "Framing advantages and disadvantages as the mirror of each other — skills and flexibility against business knowledge and continuity",
      "Naming the self-review threat and the prohibition for listed clients",
      "Giving specific safeguards rather than saying safeguards should be applied",
    ],
    loses: [
      "Giving only advantages, or only disadvantages, in a requirement that names both",
      "Missing the external-auditor part of the requirement, which carries about a quarter of the marks",
      "Treating the ethical issue as a general independence comment rather than a self-review threat",
    ],
  },
}
