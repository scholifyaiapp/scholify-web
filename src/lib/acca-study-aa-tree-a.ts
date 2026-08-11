import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area A — audit framework and regulation.
 *
 * AA had five authored chapters, one per syllabus area, plus a skills chapter.
 * Area A alone covers A1 to A6: what assurance is, the statutory audit,
 * corporate governance, professional ethics AND internal audit — and ethics is
 * examined in Section B almost every sitting, on its own.
 *
 *   AA-01  Assurance engagements and the concept of audit  (A1)
 *   AA-02  The statutory audit: regulation and duties      (A2)
 *   AA-03  Corporate governance and the audit committee    (A3)
 *   AA-04  Professional ethics and the ACCA Code           (A4)
 *   AA-05  Internal audit: scope, assignments, outsourcing (A5, A6)
 *
 * Written against the official ACCA AA syllabus and study guide, and the ISAs
 * it references. Not derived from any approved-provider text.
 */

const AA_TREE_01: StudyChapter = {
  paper: "AA",
  id: "AA-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)", "A1(d)"],
  title: "Assurance engagements and the concept of audit",
  minutes: 16,
  intro:
    "An audit is one kind of assurance engagement, not the only kind. Knowing the five elements and the two levels of assurance answers a surprising share of Section A.",
  outcomes: [
    "Define assurance and identify the five elements of an assurance engagement",
    "Distinguish reasonable from limited assurance",
    "Explain the objective of an external audit",
    "Explain why an audit cannot provide absolute assurance, and describe the expectation gap",
  ],
  sections: [
    {
      id: "elements",
      heading: "The five elements",
      blocks: [
        {
          kind: "definition",
          term: "Assurance engagement",
          md: "An engagement in which a practitioner expresses a conclusion designed to **enhance the confidence of intended users** about the outcome of evaluating a subject matter against criteria.",
        },
        {
          kind: "list",
          style: "number",
          title: "All five must be present",
          items: [
            "**A three-party relationship** — the practitioner, the responsible party who prepares the information, and the intended users who rely on it. In a statutory audit these are the auditor, the directors and the shareholders.",
            "**Subject matter** — what is being evaluated, such as the financial statements.",
            "**Suitable criteria** — the benchmark, such as IFRS or a national framework.",
            "**Sufficient appropriate evidence** — enough of it, and of the right quality.",
            "**A written report** expressing the conclusion.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The three parties are not the same three people",
          md: "Candidates write \"the auditor, the company and the public\". The responsible party is the **directors** (who prepare the statements) and the intended users are the **shareholders** (to whom the auditor reports). Naming them precisely is what earns the mark.",
        },
      ],
      check: {
        q: "Which is NOT one of the five elements of an assurance engagement?",
        options: ["Suitable criteria", "A three-party relationship", "A professional fee", "Sufficient appropriate evidence"],
        correct: 2,
        explain:
          "The fee is a commercial arrangement, not an element of the engagement. The five are the three-party relationship, subject matter, suitable criteria, sufficient appropriate evidence and a written report.",
      },
    },
    {
      id: "levels",
      heading: "Two levels of assurance",
      blocks: [
        {
          kind: "table",
          caption: "Reasonable and limited assurance",
          head: ["", "Reasonable assurance", "Limited assurance"],
          rows: [
            ["Engagement", "External audit", "Review engagement"],
            ["Evidence", "Extensive procedures", "Primarily enquiry and analytical procedures"],
            ["Conclusion", "POSITIVE — \"the financial statements give a true and fair view\"", "NEGATIVE — \"nothing has come to our attention…\""],
            ["Level", "High, but not absolute", "Moderate"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Positive and negative wording",
          md: "The wording is the giveaway. A reasonable-assurance conclusion **asserts** something is true. A limited-assurance conclusion only says nothing was found to suggest otherwise — a weaker claim, reflecting less work.",
        },
        {
          kind: "text",
          md: "The **objective of an external audit** (ISA 200) is to obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error, and to express an opinion on whether they are prepared, in all material respects, in accordance with the applicable framework.",
        },
      ],
      check: {
        q: "An accountant reports: \"Nothing has come to our attention that causes us to believe the statements are not prepared in accordance with IFRS.\" What has been provided?",
        options: ["Reasonable assurance", "Limited assurance", "Absolute assurance", "No assurance"],
        correct: 1,
        explain:
          "Negative wording signals limited assurance — a review engagement. Reasonable assurance would state positively that the statements give a true and fair view.",
      },
    },
    {
      id: "limitations",
      heading: "Why not absolute, and the expectation gap",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The inherent limitations of an audit",
          items: [
            "**Sampling** — the auditor tests a selection, not every transaction.",
            "**Judgement** — materiality, risk assessment and the sufficiency of evidence are all matters of judgement.",
            "**Evidence is persuasive rather than conclusive** — it points to a conclusion; it rarely proves one.",
            "**Internal controls have inherent limitations**, including management override.",
            "**Fraud may involve collusion, forgery and deliberate concealment**, which is designed not to be found.",
            "**Estimates and judgements** in the statements themselves cannot be verified to a single correct figure.",
            "**Timeliness** — an audit must be completed within a practical period at a reasonable cost.",
          ],
        },
        {
          kind: "definition",
          term: "The expectation gap",
          md: "The difference between what users **believe** an auditor does and what the auditor **actually** does. Users commonly believe the auditor certifies the accounts are correct, detects all fraud, and guarantees the company is solvent. None of those is the auditor's responsibility.",
        },
        {
          kind: "illustration",
          title: "The three beliefs that make up the gap",
          md: "**\"The auditor checks everything.\"** No — the audit is sample-based and directed by risk and materiality.\n\n**\"The auditor's job is to find fraud.\"** No — preventing and detecting fraud is the responsibility of **management and those charged with governance**. The auditor obtains reasonable assurance that the statements are free from material misstatement, whether caused by fraud or error, which is a narrower duty.\n\n**\"A clean opinion means the company is financially sound.\"** No — the opinion is on the financial statements, not on the company's prospects or the quality of its management.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Naming \"the public\" as the intended users of a statutory audit.", fix: "The auditor reports to the SHAREHOLDERS as a body; the directors are the responsible party." },
    { trap: "Saying an audit provides absolute assurance.", fix: "Reasonable — high, not absolute — because of sampling, judgement and the persuasive nature of evidence." },
    { trap: "Stating the auditor is responsible for detecting all fraud.", fix: "Prevention and detection rest with management and those charged with governance." },
  ],
  keyTerms: [
    { term: "Assurance engagement", def: "An engagement where a practitioner expresses a conclusion enhancing users' confidence in a subject matter evaluated against criteria." },
    { term: "Reasonable assurance", def: "A high but not absolute level, expressed positively — the level given by an external audit." },
    { term: "Limited assurance", def: "A moderate level expressed negatively, given by a review engagement." },
    { term: "Expectation gap", def: "The difference between what users believe auditors do and what auditors actually do." },
  ],
  summary: [
    "Five elements: three parties, subject matter, criteria, evidence, written report.",
    "Reasonable assurance is positive wording; limited assurance is negative.",
    "The audit objective is reasonable assurance that the statements are free from material misstatement.",
    "Absolute assurance is impossible: sampling, judgement, persuasive evidence, collusion, estimates.",
    "The expectation gap is about certification, fraud detection and solvency — none of which the audit provides.",
  ],
  knowledgeDiagnostic: [
    { q: "List the five elements of an assurance engagement.", a: "A three-party relationship, subject matter, suitable criteria, sufficient appropriate evidence, and a written report." },
    { q: "Who are the three parties in a statutory audit?", a: "The auditor (practitioner), the directors (responsible party) and the shareholders (intended users)." },
    { q: "Give three reasons an audit cannot give absolute assurance.", a: "Testing is sample-based; evidence is persuasive rather than conclusive; and fraud may involve collusion and concealment. (Also judgement, control limitations, estimates.)" },
    { q: "Whose responsibility is the prevention and detection of fraud?", a: "Management and those charged with governance — not the auditor." },
  ],
  furtherStudy: ["AA-02 covers the statutory framework this opinion is given under."],
}

const AA_TREE_02: StudyChapter = {
  paper: "AA",
  id: "AA-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A2(a)", "A2(b)", "A2(c)", "A2(d)"],
  title: "The statutory audit: regulation, appointment and duties",
  minutes: 15,
  intro:
    "Who may audit, who appoints them, what they are entitled to, and how they leave. Dry, and reliably worth marks in Section A.",
  outcomes: [
    "Describe the regulatory framework governing audit",
    "Explain the appointment, removal and resignation of auditors",
    "State the rights and duties of an auditor",
    "Explain who is eligible and ineligible to act",
  ],
  sections: [
    {
      id: "regulation",
      heading: "The regulatory framework",
      blocks: [
        {
          kind: "text",
          md: "Audits are governed by **International Standards on Auditing** issued by the IAASB, adopted nationally, together with company law and the oversight of national regulators and professional bodies such as ACCA.",
        },
        {
          kind: "table",
          caption: "Who is eligible to act",
          head: ["Eligible", "Ineligible"],
          rows: [
            ["A member of a recognised supervisory body, appropriately qualified", "An officer or employee of the company"],
            ["A firm controlled by such members", "A partner or employee of an officer or employee"],
            ["", "Anyone ineligible for a connected company"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Ineligibility is not the same as an ethical threat",
          md: "Being a director's business partner makes you **legally ineligible** — no safeguard can cure it. A large fee dependency is an **ethical threat**, which safeguards may reduce to an acceptable level. Questions test whether you can tell the two apart.",
        },
      ],
    },
    {
      id: "appointment",
      heading: "Appointment, removal and resignation",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "How an auditor comes and goes",
          items: [
            "**Appointment** — normally by the **shareholders** in general meeting. Directors may appoint the first auditor and fill a casual vacancy.",
            "**Removal** — by **ordinary resolution** of the shareholders, with special notice. The auditor may make representations and require them to be circulated.",
            "**Resignation** — by written notice to the company, accompanied by a statement of any circumstances that should be brought to members' or creditors' attention, or a statement that there are none.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why removal sits with shareholders",
          md: "The auditor reports **to the shareholders on the directors' stewardship**. If the directors could dismiss the auditor, the auditor would be reporting on the people who control their tenure — which is precisely the independence the framework exists to protect.",
        },
      ],
      check: {
        q: "Who has the power to remove an auditor from office?",
        options: ["The board of directors", "The shareholders by ordinary resolution", "The audit committee", "The national regulator"],
        correct: 1,
        explain:
          "The shareholders, by ordinary resolution with special notice. Directors cannot remove the auditor — the auditor reports on the directors' stewardship, so allowing that would destroy the independence the arrangement exists to protect.",
      },
    },
    {
      id: "rights-duties",
      heading: "Rights and duties",
      blocks: [
        {
          kind: "table",
          caption: "What the auditor may do, and must do",
          head: ["Rights", "Duties"],
          rows: [
            ["Access to the books and records at all times", "Report to members on whether the statements give a true and fair view"],
            ["To require information and explanations from officers", "State whether they have been properly prepared in accordance with the framework"],
            ["To receive notice of and attend general meetings", "Report by exception: inadequate records, statements not agreeing to records, information and explanations not received"],
            ["To speak at meetings on matters concerning them", "Consider whether other information is consistent with the audited statements"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "\"Report by exception\" is the phrase to know",
          md: "The auditor does not confirm that records were adequate — they report only **if they were not**. Silence on those matters is the positive statement. It is a favourite Section A distinction.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Saying directors appoint and remove the auditor.", fix: "Shareholders do both; directors may only appoint the first auditor or fill a casual vacancy." },
    { trap: "Confusing legal ineligibility with an ethical threat.", fix: "Ineligibility cannot be safeguarded away; a threat sometimes can." },
    { trap: "Listing report-by-exception matters as things the auditor confirms.", fix: "They are reported only when they go wrong." },
  ],
  keyTerms: [
    { term: "Report by exception", def: "Matters an auditor reports only if unsatisfactory, such as inadequate accounting records." },
    { term: "Special notice", def: "Advance notice required for a resolution to remove an auditor, allowing them to make representations." },
    { term: "True and fair view", def: "The opinion an auditor expresses on financial statements taken as a whole." },
  ],
  summary: [
    "ISAs, company law and regulators together govern audit.",
    "Officers and employees of the company are legally ineligible to audit it.",
    "Shareholders appoint and remove; directors may appoint only the first auditor or fill a vacancy.",
    "Rights include access to records, information from officers, and attendance at meetings.",
    "Some matters are reported only by exception.",
  ],
  knowledgeDiagnostic: [
    { q: "Who appoints the auditor, and who can remove them?", a: "The shareholders in general meeting do both; removal is by ordinary resolution with special notice." },
    { q: "Name three rights of an auditor.", a: "Access to books and records at all times, the right to require information and explanations from officers, and the right to receive notice of and attend general meetings." },
    { q: "What does reporting 'by exception' mean?", a: "The auditor reports on certain matters — such as inadequate accounting records — only if they are unsatisfactory; silence means they were satisfactory." },
  ],
  furtherStudy: ["AA-03 covers the governance structures that support this independence in practice."],
}

const AA_TREE_03: StudyChapter = {
  paper: "AA",
  id: "AA-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A3(a)", "A3(b)", "A3(c)"],
  title: "Corporate governance and the audit committee",
  minutes: 15,
  intro:
    "Governance is the structure that makes independence possible. The audit committee is where it meets the auditor, and it is examined more than any other governance topic in AA.",
  outcomes: [
    "Explain the principles of corporate governance relevant to audit",
    "Describe the composition and role of an audit committee",
    "Evaluate the benefits and drawbacks of an audit committee",
    "Analyse governance deficiencies in a scenario and recommend improvements",
  ],
  sections: [
    {
      id: "principles",
      heading: "The principles that matter to an auditor",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Core governance requirements",
          items: [
            "**Division of responsibilities** — the roles of chair and chief executive should be separate, so no one individual has unfettered power.",
            "**Board balance** — an appropriate proportion of **independent non-executive directors**.",
            "**Board committees** — nomination, remuneration and audit, each mainly or wholly of independent NEDs.",
            "**Risk management and internal control** — the board maintains a sound system and reviews its effectiveness at least annually.",
            "**Accountability** — the board presents a fair, balanced and understandable assessment of the company's position and prospects.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "\"Independent\" is a defined status",
          md: "A non-executive is not independent merely by being non-executive. Former employment, a material business relationship, significant shareholding, cross-directorships, family ties or long tenure can all remove independence — and a scenario listing one of those is testing exactly that.",
        },
      ],
    },
    {
      id: "audit-committee",
      heading: "The audit committee",
      blocks: [
        {
          kind: "text",
          md: "Composed of **independent non-executive directors**, of whom **at least one should have recent and relevant financial experience**. It is the bridge between the board and both audit functions.",
        },
        {
          kind: "list",
          style: "number",
          title: "What it does",
          items: [
            "**Monitors the integrity of the financial statements** and significant reporting judgements.",
            "**Reviews internal financial controls** and, unless a separate risk committee exists, the risk management systems.",
            "**Monitors and reviews the effectiveness of internal audit**, and receives its reports.",
            "**Recommends the appointment, reappointment and removal of the external auditor**, and approves their remuneration and terms.",
            "**Reviews and monitors the external auditor's independence and objectivity**, including the policy on non-audit services.",
          ],
        },
        {
          kind: "table",
          caption: "Both sides of the argument",
          head: ["Benefits", "Drawbacks"],
          rows: [
            ["Strengthens the external auditor's independence — a channel that bypasses management", "NEDs may lack detailed knowledge of the business"],
            ["Gives internal audit a reporting line free of the managers it audits", "Finding genuinely independent members with financial experience is difficult"],
            ["Improves the quality of financial reporting through informed challenge", "Costs money, and can become a box-ticking formality"],
            ["Improves public confidence in the reported figures", "Executives may see it as a barrier rather than a support"],
          ],
        },
        {
          kind: "illustration",
          title: "Why the reporting line is the whole point",
          md: "If the head of internal audit reports to the finance director, then any finding about the finance function goes to the person it concerns. They control the internal auditor's budget, appraisal and career.\n\nReporting instead to an audit committee of independent NEDs breaks that dependency. When a scenario places internal audit under the FD, the deficiency is not the person — it is the **structure**, and that is what the recommendation must fix.",
        },
      ],
      check: {
        q: "A company's audit committee consists of the finance director and two non-executives, one of whom is the CEO's brother. What are the deficiencies?",
        options: [
          "None — the committee has three members",
          "Only that the finance director sits on it",
          "The finance director is an executive, and the NED with a family tie is not independent",
          "Only that one member is related to the CEO",
        ],
        correct: 2,
        explain:
          "Two deficiencies. The committee should consist of INDEPENDENT non-executives — an executive director cannot monitor the reporting they prepare — and a close family relationship with the CEO removes independence. The fix addresses both.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming every non-executive director is independent.", fix: "Check for former employment, business relationships, shareholdings, family ties and long tenure." },
    { trap: "Naming a deficiency without a recommendation.", fix: "AA questions pair them: state the deficiency, its implication, and a specific fix." },
    { trap: "Saying the audit committee appoints the external auditor.", fix: "It RECOMMENDS the appointment; shareholders appoint." },
  ],
  keyTerms: [
    { term: "Independent non-executive director", def: "A director with no executive role and no relationship that could materially affect their judgement." },
    { term: "Audit committee", def: "A board committee of independent NEDs overseeing financial reporting, internal control, and both audit functions." },
    { term: "Those charged with governance", def: "Those responsible for overseeing the strategic direction and accountability of an entity." },
  ],
  summary: [
    "Governance separates chair and chief executive and requires independent NEDs.",
    "The audit committee is independent NEDs, one with recent relevant financial experience.",
    "It monitors reporting integrity, internal control, internal audit and external auditor independence.",
    "It recommends — it does not appoint — the external auditor.",
    "Internal audit reporting to the finance director is a structural deficiency, not a personal one.",
  ],
  knowledgeDiagnostic: [
    { q: "Who should sit on an audit committee?", a: "Independent non-executive directors, at least one of whom has recent and relevant financial experience." },
    { q: "Name three responsibilities of an audit committee.", a: "Monitoring the integrity of the financial statements; reviewing internal control and risk systems; monitoring the effectiveness of internal audit and the independence of the external auditor." },
    { q: "Why should internal audit not report to the finance director?", a: "The FD controls its budget and appraisals and is also a subject of its work, so findings about the finance function go to the person they concern." },
  ],
  furtherStudy: ["AA-04 covers the ethical rules the external auditor must observe alongside this structure."],
}

const AA_TREE_04: StudyChapter = {
  paper: "AA",
  id: "AA-04",
  number: 4,
  area: "A",
  syllabusRefs: ["A4(a)", "A4(b)", "A4(c)", "A4(d)"],
  title: "Professional ethics and the ACCA Code",
  minutes: 19,
  intro:
    "Examined in Section B almost every sitting. Five principles, five threats, and a method: identify the threat, name the principle it attacks, propose a safeguard — or decline.",
  outcomes: [
    "State and apply the five fundamental principles",
    "Identify the five categories of threat to independence",
    "Recommend appropriate safeguards, or conclude that none is sufficient",
    "Apply the specific rules on fees, gifts, long association and non-audit services",
  ],
  sections: [
    {
      id: "principles-threats",
      heading: "Five principles, five threats",
      blocks: [
        {
          kind: "table",
          caption: "The fundamental principles",
          head: ["Principle", "What it requires"],
          rows: [
            ["Integrity", "Being straightforward and honest in all professional and business relationships"],
            ["Objectivity", "Not allowing bias, conflict of interest or undue influence to override judgement"],
            ["Professional competence and due care", "Maintaining knowledge and skill, and acting diligently to applicable standards"],
            ["Confidentiality", "Not disclosing information without authority, and not using it for personal advantage"],
            ["Professional behaviour", "Complying with laws and regulations and avoiding conduct that discredits the profession"],
          ],
        },
        {
          kind: "table",
          caption: "The five threats — and the shape of each",
          head: ["Threat", "Arises when", "Example"],
          rows: [
            ["Self-interest", "A financial or other interest inappropriately influences judgement", "Fee dependency; a shareholding in the client; a contingent fee"],
            ["Self-review", "The firm must evaluate its own previous work or judgement", "Auditing a system the firm designed; preparing the accounts then auditing them"],
            ["Advocacy", "The firm promotes the client's position to the point objectivity is compromised", "Acting for the client in litigation or promoting its shares"],
            ["Familiarity", "Long or close association makes the firm too sympathetic", "A partner on the engagement for many years; a family member as finance director"],
            ["Intimidation", "Pressure, actual or perceived, deters objective action", "A threat of dismissal or litigation over a disputed treatment"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The method that earns the marks",
          md: "For each issue: **name the threat**, say **which principle** it attacks, explain **why it matters here**, then give a **specific safeguard** — or state that no safeguard is sufficient and the firm must resign or decline. A list of threat names without safeguards scores roughly half.",
        },
      ],
      check: {
        q: "An audit firm prepares the financial statements of a small audit client and also audits them. Which threat is this principally?",
        options: ["Advocacy", "Intimidation", "Self-review", "Familiarity"],
        correct: 2,
        explain:
          "Self-review: the audit team would be evaluating work the firm itself produced, and is unlikely to identify errors in its own output. A self-interest threat may also exist through the extra fee, but self-review is the principal one.",
      },
    },
    {
      id: "specific-rules",
      heading: "The specific rules",
      blocks: [
        {
          kind: "table",
          caption: "Situations with defined answers",
          head: ["Situation", "The rule"],
          rows: [
            ["Fee dependency", "Regular fees from one client exceeding around 15% of the firm's total (a lower threshold for public interest entities) create a self-interest threat requiring disclosure to those charged with governance and a review"],
            ["Contingent fees", "Not permitted for audit work — the fee would depend on the outcome"],
            ["Gifts and hospitality", "Acceptable only if trivial and inconsequential; otherwise decline"],
            ["Loans and guarantees", "Not permitted between firm and client unless the client is a bank and the loan is on normal commercial terms"],
            ["Long association", "Rotate key audit partners; for listed clients, after a defined period with a cooling-off period before returning"],
            ["Overdue fees", "Significant overdue fees are effectively a loan to the client — a self-interest threat"],
            ["Employment with a client", "A former team member joining the client creates familiarity and self-review; remove them from the team and review work performed"],
            ["Non-audit services", "Assess the self-review and self-interest threats; some services are prohibited for public interest entities"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Safeguards that actually appear in answers",
          items: [
            "**Remove the individual** from the engagement team.",
            "**Independent review** of the work by a partner not otherwise involved — an engagement quality review.",
            "**Use separate teams** for audit and non-audit work, with information barriers.",
            "**Disclose to those charged with governance** and obtain their agreement.",
            "**Rotate the partner** or the team.",
            "**Decline or resign** where no safeguard reduces the threat to an acceptable level.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Some threats cannot be safeguarded",
          md: "A direct financial interest in an audit client, or preparing the accounts of a listed audit client, cannot be cured by a safeguard — the interest must be disposed of, or the work not accepted. Proposing \"an independent review\" for those is the wrong answer.",
        },
      ],
      check: {
        q: "An audit partner is offered a holiday by a grateful client. What should the firm do?",
        options: [
          "Accept, then disclose it to those charged with governance",
          "Accept if the partner pays tax on the benefit",
          "Decline — a holiday is not trivial and inconsequential",
          "Accept, but rotate the partner off the engagement",
        ],
        correct: 2,
        explain:
          "Gifts and hospitality may be accepted only if trivial and inconsequential. A holiday is neither, so it creates self-interest and familiarity threats that no safeguard adequately addresses — it must be declined.",
      },
    },
    {
      id: "confidentiality",
      heading: "Confidentiality and conflicts of interest",
      blocks: [
        {
          kind: "text",
          md: "Confidentiality continues **after the engagement ends** and after the relationship ends. Disclosure is permitted in defined circumstances only.",
        },
        {
          kind: "table",
          caption: "When information may or must be disclosed",
          head: ["Type", "Circumstance"],
          rows: [
            ["Obligatory", "Required by law, such as a court order or reporting suspected money laundering"],
            ["Voluntary", "Where there is a professional duty or right, such as complying with a regulatory review, or protecting the member's own interests in legal proceedings"],
            ["With consent", "Where the client authorises it"],
          ],
        },
        {
          kind: "text",
          md: "A **conflict of interest** arises where the firm acts for two clients whose interests conflict — competitors, or opposing parties in a transaction. Safeguards include separate engagement teams, information barriers, confidentiality agreements and, crucially, **notifying both clients and obtaining consent**. Where the conflict cannot be managed, one engagement must be declined.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Money laundering is obligatory, not voluntary",
          md: "A suspicion of money laundering must be reported, and **tipping off the client is itself an offence**. Questions that describe unexplained cash receipts are usually heading here.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Naming threats without proposing safeguards.", fix: "Threat, principle, why it matters, then a specific safeguard — or decline." },
    { trap: "Proposing a safeguard for a prohibited situation.", fix: "A direct financial interest must be disposed of; some non-audit services must simply not be accepted." },
    { trap: "Treating all disclosure of client information as prohibited.", fix: "Obligatory and voluntary disclosure both exist; money laundering reporting is obligatory." },
    { trap: "Calling any long relationship a self-interest threat.", fix: "Long association is a FAMILIARITY threat; fee dependency is self-interest." },
  ],
  keyTerms: [
    { term: "Self-review threat", def: "The threat that a firm will not properly evaluate the results of its own previous work." },
    { term: "Advocacy threat", def: "The threat arising from promoting a client's position to the point objectivity is compromised." },
    { term: "Safeguard", def: "An action that eliminates a threat or reduces it to an acceptable level." },
    { term: "Tipping off", def: "Informing a suspect that a money laundering report has been made — itself an offence." },
  ],
  summary: [
    "Five principles: integrity, objectivity, competence and due care, confidentiality, professional behaviour.",
    "Five threats: self-interest, self-review, advocacy, familiarity, intimidation.",
    "Answer as threat, principle, implication, safeguard — or decline.",
    "Contingent fees, non-trivial gifts and direct financial interests are prohibited, not safeguarded.",
    "Confidentiality survives the engagement; money laundering reporting is obligatory.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the five fundamental principles.", a: "Integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour." },
    { q: "Name the five categories of threat.", a: "Self-interest, self-review, advocacy, familiarity and intimidation." },
    { q: "Which threat arises from a firm auditing a system it designed?", a: "Self-review — the firm would be evaluating its own previous work." },
    { q: "Give two safeguards for a threat arising from a long-serving audit partner.", a: "Rotate the partner off the engagement, and arrange an independent engagement quality review of the work performed." },
  ],
  furtherStudy: [
    "AA-05 applies the independence question to the internal audit function.",
    "AAA develops ethics into complex multi-party scenarios and firm-wide quality management.",
  ],
}

const AA_TREE_05: StudyChapter = {
  paper: "AA",
  id: "AA-05",
  number: 5,
  area: "A",
  syllabusRefs: ["A5(a)", "A5(b)", "A6(a)", "A6(b)"],
  title: "Internal audit: scope, assignments and outsourcing",
  minutes: 16,
  intro:
    "Same word, different job. Internal audit serves management; external audit serves shareholders — and almost every mark in this topic comes from keeping that straight.",
  outcomes: [
    "Distinguish internal from external audit",
    "Explain the factors affecting the independence of internal audit",
    "Describe the main types of internal audit assignment",
    "Evaluate the outsourcing of an internal audit function",
  ],
  sections: [
    {
      id: "differences",
      heading: "Internal against external audit",
      blocks: [
        {
          kind: "table",
          caption: "The distinctions worth memorising",
          head: ["", "External audit", "Internal audit"],
          rows: [
            ["Appointed by", "Shareholders", "The audit committee or the board"],
            ["Reports to", "Shareholders", "The audit committee or management"],
            ["Objective", "An opinion on whether the statements give a true and fair view", "To improve risk management, control and governance"],
            ["Scope", "Set by statute and ISAs", "Determined by management or the audit committee"],
            ["Status", "Independent of the company", "Usually employees of the company"],
            ["Report available to", "The public, with the financial statements", "Internal only"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Independence is different in kind",
          md: "An internal auditor is normally an **employee**, so they can never be independent in the way an external auditor is. The most that can be achieved is independence **from the functions they audit** — through reporting to the audit committee, no operational responsibilities, and no involvement in designing the controls they later test.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What undermines internal audit independence",
          items: [
            "Reporting to the **finance director** rather than the audit committee.",
            "Auditing systems the internal audit team **helped design or operate**.",
            "**Short-term contracts** or remuneration linked to the results of areas audited.",
            "Being used as **cheap staff** for operational work, so audits are not completed objectively.",
            "The head of internal audit expecting a **future role** in the department they audit.",
          ],
        },
      ],
      check: {
        q: "Which is the strongest evidence that an internal audit function lacks independence?",
        options: [
          "Its staff are employees of the company",
          "It reports to the finance director and audits the finance function",
          "It uses the same software as the finance team",
          "Its head previously worked in another company's finance department",
        ],
        correct: 1,
        explain:
          "Being an employee is inherent to internal audit and cannot be avoided; the structural fault is reporting to the person whose function you audit, since they control your budget, appraisal and career. Prior experience elsewhere is not a threat at all.",
      },
    },
    {
      id: "assignments",
      heading: "Types of assignment",
      blocks: [
        {
          kind: "table",
          caption: "What internal audit is asked to do",
          head: ["Assignment", "Purpose"],
          rows: [
            ["Value for money", "Assess economy, efficiency and effectiveness in the use of resources"],
            ["Operational audit", "Review a specific function — procurement, payroll — for control and efficiency"],
            ["IT / systems audit", "Test general and application controls over information systems"],
            ["Financial audit", "Verify the accuracy and completeness of internal financial information"],
            ["Regulatory compliance", "Confirm compliance with laws, regulations and internal policy"],
            ["Fraud investigation", "Investigate suspected fraud and recommend control improvements"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The three Es appear here too",
          md: "Value-for-money work is **economy** (inputs at least cost), **efficiency** (outputs per input) and **effectiveness** (objectives achieved) — the same framework as FM's not-for-profit objectives. Naming all three, with an example of each from the scenario, is the reliable way to score.",
        },
      ],
    },
    {
      id: "outsourcing",
      heading: "Outsourcing the function",
      blocks: [
        {
          kind: "table",
          caption: "Outsourcing internal audit",
          head: ["Advantages", "Disadvantages"],
          rows: [
            ["Immediate access to specialist skills and wider experience", "Cost, which may exceed an in-house team"],
            ["Flexible resourcing — scaled up or down as needed", "The provider lacks in-depth knowledge of the business and its culture"],
            ["No recruitment, training or retention burden", "Loss of in-house knowledge, and dependence on the provider"],
            ["Greater independence from the operational management being audited", "Confidentiality concerns over sharing sensitive information"],
            ["Access to methodology and technology the company lacks", "Staff may be reluctant to be candid with outsiders"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The external auditor cannot simply do both",
          md: "If the **external audit firm** provides internal audit services to the same client, a **self-review threat** arises — the firm would be relying on, and evaluating, its own work. For public interest entities this is generally prohibited outright. A question offering this as a cost saving is testing that.",
        },
      ],
      check: {
        q: "A listed company asks its external audit firm to take over the internal audit function to save cost. What is the principal objection?",
        options: [
          "The fee would create a self-interest threat only",
          "A self-review threat arises, and for a listed client the service is generally prohibited",
          "The internal audit work would not be independent of management",
          "There is no objection provided separate teams are used",
        ],
        correct: 1,
        explain:
          "The external auditor would place reliance on internal audit work its own firm performed — a self-review threat. For a public interest entity such as a listed company, providing internal audit services is generally prohibited, so separate teams are not a sufficient answer.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying internal auditors are independent.", fix: "They are employees; the achievable goal is independence FROM the functions audited, through the reporting line." },
    { trap: "Confusing who each function reports to.", fix: "External reports to shareholders; internal reports to the audit committee or management." },
    { trap: "Recommending the external audit firm as the outsourced internal auditor.", fix: "Self-review threat, generally prohibited for public interest entities." },
  ],
  keyTerms: [
    { term: "Internal audit", def: "An appraisal function within an entity, evaluating and improving risk management, control and governance." },
    { term: "Value for money audit", def: "An assignment assessing economy, efficiency and effectiveness." },
    { term: "Outsourcing", def: "Contracting an external provider to perform the internal audit function." },
  ],
  summary: [
    "External audit serves shareholders under statute; internal audit serves the board under a scope management sets.",
    "Internal auditors are employees, so structural safeguards replace true independence.",
    "Reporting to the finance director while auditing finance is the classic structural fault.",
    "Assignments span value for money, operational, IT, compliance and fraud work.",
    "Outsourcing buys skills and independence at the cost of business knowledge — and not to the external auditor.",
  ],
  knowledgeDiagnostic: [
    { q: "Give three differences between internal and external audit.", a: "Who appoints them (board/audit committee vs shareholders), who they report to (management vs shareholders), and who sets their scope (management vs statute and ISAs)." },
    { q: "How can an internal audit function's independence be strengthened?", a: "By reporting to the audit committee rather than an executive, giving it no operational responsibilities, and keeping it out of the design of controls it will later test." },
    { q: "What are the three Es in a value-for-money audit?", a: "Economy, efficiency and effectiveness." },
    { q: "Why should the external auditor not provide internal audit services to the same listed client?", a: "It creates a self-review threat, since the firm would rely on and evaluate its own work; for public interest entities it is generally prohibited." },
  ],
  furtherStudy: ["Area B applies this framework to planning the audit and assessing risk."],
}

export const AA_TREE_AREA_A: StudyChapter[] = [AA_TREE_01, AA_TREE_02, AA_TREE_03, AA_TREE_04, AA_TREE_05]
