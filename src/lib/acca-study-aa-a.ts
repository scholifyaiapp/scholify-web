import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area A — Audit framework & regulation.
 * Rich study chapter matching the FA_A exemplar's depth, tone and visual bar.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const AA_A: StudyChapter = {
  paper: "AA",
  area: "A",
  title: "Audit framework & regulation",
  minutes: 16,
  intro: "A set of accounts is only as useful as it is believable. The external audit exists to close the gap between the managers who prepare the numbers and the owners who must trust them — and a whole framework of rules, ethics and standards keeps that trust honest.",
  outcomes: [
    "Explain the purpose and objective of an external audit and what 'reasonable assurance' and 'true and fair' really mean",
    "Distinguish reasonable from limited assurance and name the five elements of an assurance engagement",
    "Describe the regulatory framework, the role of ISAs, and how auditors are appointed, removed and resign",
    "State the five fundamental principles of professional ethics and apply the five threats and their safeguards",
    "Explain the preconditions for an audit and the purpose and contents of an engagement letter under ISA 210",
  ],
  sections: [
    {
      id: "purpose",
      heading: "Why the external audit exists",
      blocks: [
        { kind: "text", md: "Picture a company owned by thousands of shareholders but run day to day by a handful of directors. The owners are not in the building; they cannot check the till or count the inventory. They receive one thing at the year end — the financial statements the **directors** prepared. The obvious problem: the people who prepared the numbers are also the people the numbers judge. That conflict of interest is the reason audit exists." },
        { kind: "text", md: "An **external audit** is an independent examination of, and expression of opinion on, the financial statements of an entity. The auditor does not prepare the accounts and does not run the company — the auditor stands **between** preparer and user and reports whether the statements can be believed. This is sometimes called bridging the **expectation** and **information** gaps between directors and shareholders." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The audit sits between those who prepare and those who rely",
          caption: "The auditor's independent opinion is what lets absent owners trust management's numbers.",
          data: {
            steps: [
              { label: "Directors", sub: "prepare the financial statements" },
              { label: "Auditor", sub: "independently examines them" },
              { label: "Opinion", sub: "true and fair?" },
              { label: "Shareholders", sub: "rely on the audited accounts" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The objective, in one line", md: "The objective of an external audit is to enable the auditor to express an opinion on whether the financial statements are prepared, in all material respects, in accordance with an applicable financial reporting framework — that is, whether they give a **true and fair view**." },
        { kind: "text", md: "Two phrases in that sentence carry the whole subject. **True and fair** does not mean 'perfectly correct to the penny' — it means the statements are free from **material** misstatement and faithfully reflect the substance of what happened. **In all material respects** is the auditor's licence to ignore trivial errors: a $50 mistake in a $50m company changes no one's decision, so the auditor need not chase it." },
      ],
      check: {
        q: "Which best describes the objective of an external audit?",
        options: [
          "To prepare the financial statements accurately on behalf of the directors",
          "To detect and report every error and fraud, however small",
          "To express an opinion on whether the financial statements give a true and fair view",
          "To guarantee that the company is a good investment",
        ],
        correct: 2,
        explain: "The auditor expresses an opinion on whether the statements are free from material misstatement and give a true and fair view. Preparing the accounts is the directors' job; the audit is not a guarantee of investment quality, and because of materiality and testing it does not certify that every trivial error has been found.",
      },
    },
    {
      id: "assurance-levels",
      heading: "Levels of assurance — reasonable vs limited",
      blocks: [
        { kind: "text", md: "An audit is one type of **assurance engagement**: a practitioner gathers evidence to give intended users confidence about a subject matter reported on by someone else. But assurance comes in strengths. The two the exam cares about are **reasonable assurance** and **limited assurance**." },
        { kind: "text", md: "**Reasonable assurance** is a **high — but not absolute** — level of assurance. This is what an external audit provides. The auditor gathers sufficient appropriate evidence to reduce audit risk to an acceptably low level, then gives a **positive** opinion: the statements *do* give a true and fair view. It can never be *absolute* because of the inherent limitations of audit — sampling, judgement, the persuasive rather than conclusive nature of most evidence, and the risk of well-concealed fraud." },
        { kind: "text", md: "**Limited assurance** is a **lower** level, typical of a **review engagement**. The practitioner does less work — mainly enquiry and analytical procedures rather than detailed testing — and gives a **negative** (or 'negative assurance') conclusion: *nothing has come to our attention* to suggest the statements are misstated. It is a weaker, cheaper comfort." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Reasonable vs limited assurance",
          data: {
            leftTitle: "Reasonable assurance",
            rightTitle: "Limited assurance",
            rows: [
              { aspect: "Typical engagement", left: "External audit", right: "Review engagement" },
              { aspect: "Level of assurance", left: "High, but not absolute", right: "Lower / moderate" },
              { aspect: "Evidence gathered", left: "Sufficient & appropriate — extensive", right: "Mainly enquiry & analytical review" },
              { aspect: "Form of conclusion", left: "Positive: 'the statements give a true and fair view'", right: "Negative: 'nothing has come to our attention'" },
              { aspect: "Cost & effort", left: "Higher", right: "Lower" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "No engagement gives absolute assurance", md: "Because of sampling, the use of judgement, internal control limitations and the persuasive nature of evidence, **no** audit can promise the statements are 100% free of misstatement. An auditor who claims absolute assurance has overstated what an audit can do." },
        { kind: "text", md: "Every assurance engagement — reasonable or limited — is built from the **five elements**. Miss one and it is not an assurance engagement at all." },
        { kind: "table", caption: "The five elements of an assurance engagement", head: ["Element", "What it means", "In an audit"], rows: [
          ["Three-party relationship", "Practitioner, responsible party, intended users", "Auditor, directors, shareholders"],
          ["Subject matter", "The thing being reported on", "The financial statements"],
          ["Suitable criteria", "The benchmark to measure against", "The applicable framework (e.g. IFRS)"],
          ["Sufficient appropriate evidence", "Enough good-quality evidence to support a conclusion", "Tests of controls and substantive procedures"],
          ["A written report", "The conclusion, communicated in an appropriate form", "The auditor's report"],
        ] },
      ],
      check: {
        q: "A review engagement concludes that 'nothing has come to our attention that causes us to believe the statements are materially misstated'. This is:",
        options: [
          "Reasonable assurance expressed positively",
          "Limited assurance expressed as a negative conclusion",
          "Absolute assurance",
          "Not an assurance engagement at all",
        ],
        correct: 1,
        explain: "A negatively worded 'nothing has come to our attention' conclusion is the hallmark of limited assurance, given in a review engagement. An audit gives reasonable (high, not absolute) assurance with a positive opinion. No engagement provides absolute assurance.",
      },
    },
    {
      id: "regulation",
      heading: "The regulatory framework and ISAs",
      blocks: [
        { kind: "text", md: "Audit is too important to leave to individual style, so it is heavily regulated. The framework has several layers working together: **national law** (companies legislation makes an audit compulsory for many companies and sets out auditors' duties and rights); **the standard setters**; and **professional bodies** such as the ACCA, which license, monitor and discipline members." },
        { kind: "text", md: "The standards themselves are the **International Standards on Auditing (ISAs)**, issued by the **IAASB** (the International Auditing and Assurance Standards Board). ISAs are not law, but where they are adopted the auditor must comply with **every** relevant ISA and follow all requirements unless the requirement is not relevant to the engagement. They tell the auditor *how* to plan, gather evidence, evaluate and report — creating consistency so a 'clean opinion' means the same thing everywhere." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The layers of audit regulation",
          caption: "Each layer constrains the one below — from public interest at the top to the individual engagement at the base.",
          data: {
            levels: [
              { label: "IFAC / public interest oversight", sub: "global oversight of the profession" },
              { label: "IAASB", sub: "issues the ISAs" },
              { label: "National law & regulators", sub: "make audit compulsory; set duties & rights" },
              { label: "Professional bodies (e.g. ACCA)", sub: "license, monitor, discipline members" },
              { label: "The audit firm & engagement", sub: "applies the ISAs in practice" },
            ],
          },
        } },
        { kind: "text", md: "Because audit is a statutory relationship, the law also controls **who** does the job and **how they arrive and leave**. Auditors are normally **appointed by the shareholders** at the general meeting — not by the directors, precisely because the auditor must be independent of the board they scrutinise. A casual vacancy (say, a resignation mid-year) may be filled by the directors, but the appointment is ratified by the members." },
        { kind: "table", caption: "Appointment, removal and resignation", head: ["Event", "Who acts / how", "Key protection"], rows: [
          ["Appointment", "By the shareholders at the general meeting (directors may fill a casual vacancy)", "Keeps the auditor independent of the board"],
          ["Removal", "By ordinary resolution of the shareholders, with special notice", "Auditor may make written representations and speak at the meeting"],
          ["Resignation", "Auditor submits written notice; deposits a statement of circumstances", "Statement warns members/creditors of any relevant reasons"],
        ] },
        { kind: "callout", tone: "rule", title: "The auditor's statutory rights", md: "To do the job the auditor has legal **rights**: a right of **access to all books and records at all times**, a right to **all information and explanations** considered necessary, a right to **receive notice of and attend** general meetings, and a right to **be heard** at those meetings on matters concerning them as auditor. These rights exist so directors cannot quietly starve the auditor of evidence or ease them out." },
      ],
    },
    {
      id: "principles",
      heading: "Professional ethics — the five fundamental principles",
      blocks: [
        { kind: "text", md: "An audit opinion is worthless if the user cannot trust the auditor. So the profession binds every member to a **Code of Ethics** — the IESBA Code, mirrored by the ACCA — built on **five fundamental principles**. They are the non-negotiable behaviours expected of every professional accountant, in audit and beyond." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five fundamental principles",
          caption: "The five standards every professional accountant must uphold: integrity, objectivity, professional competence & due care, confidentiality, professional behaviour.",
          data: {
            items: [
              { title: "Professional behaviour", sub: "Comply with laws and regulations; avoid anything that discredits the profession." },
              { title: "Integrity", sub: "Be straightforward and honest in all professional and business relationships." },
              { title: "Confidentiality", sub: "Do not disclose client information without proper authority, or use it for personal advantage." },
              { title: "Professional competence & due care", sub: "Keep skills current and act diligently to a proper technical standard." },
              { title: "Objectivity", sub: "Do not let bias, conflict of interest or undue influence override professional judgement." },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Objectivity vs independence", md: "**Objectivity** is the state of mind — freedom from bias. **Independence** is what supports and demonstrates it: independence of **mind** (actually unbiased) and independence in **appearance** (a reasonable, informed third party would not doubt it). The threats below are dangerous precisely because they erode this pair." },
        { kind: "text", md: "**Confidentiality** has limited, defined exceptions. An auditor may disclose client information where disclosure is **permitted by law and authorised** by the client, **required by law** (for example, producing documents in legal proceedings or reporting suspected money laundering), or where there is a **professional duty or right** to disclose and it is not prohibited by law. Idle gossip is never one of them." },
      ],
      check: {
        q: "An auditor tells a friend at a dinner party which companies they audit and how one client is struggling. Which fundamental principle is most directly breached?",
        options: [
          "Professional competence and due care",
          "Objectivity",
          "Confidentiality",
          "Professional behaviour only",
        ],
        correct: 2,
        explain: "Disclosing client information without proper authority breaches confidentiality — and none of the recognised exceptions (client consent, legal requirement, or a professional duty/right) applies to dinner-party gossip. It arguably also damages professional behaviour, but confidentiality is the principle most directly breached.",
      },
    },
    {
      id: "threats",
      heading: "The five threats — and safeguards",
      blocks: [
        { kind: "text", md: "The Code takes a **conceptual framework** approach, not a rulebook of every forbidden act. The auditor must **identify** threats to the fundamental principles, **evaluate** their significance, and then **respond** with safeguards that eliminate the threat or reduce it to an acceptable level — and if it cannot be reduced, **decline or withdraw**. There are five categories of threat." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five threats to independence and objectivity",
          data: {
            items: [
              { title: "Self-interest", sub: "A financial or other interest sways the auditor — e.g. shares in the client, a large unpaid fee, or fee dependence." },
              { title: "Self-review", sub: "The auditor reviews their own prior work — e.g. auditing figures the firm itself prepared or valued." },
              { title: "Advocacy", sub: "The auditor promotes the client's position — e.g. acting for them in a dispute or promoting their shares." },
              { title: "Familiarity", sub: "Too close a relationship dulls scepticism — e.g. long association or a family member in a key role at the client." },
              { title: "Intimidation", sub: "The auditor is pressured — e.g. threats of dismissal, litigation or a withheld fee." },
            ],
          },
        } },
        { kind: "text", md: "Notice how the *same fact* often reads across more than one threat, so exam answers must **name and justify**. A fee that is overdue for a long time is a **self-interest** threat (the firm needs the money) and can shade into **intimidation** (pay-us-or-else); an audit staff member joining the client's board creates **familiarity** and **self-interest**." },
        { kind: "table", caption: "Threat → a proportionate safeguard", head: ["Threat", "Example", "A typical safeguard"], rows: [
          ["Self-interest", "Audit firm holds shares in the client", "Dispose of the interest; remove the individual from the team"],
          ["Self-review", "Firm prepared the accounts it now audits", "Use separate teams; decline the non-audit service"],
          ["Advocacy", "Representing the client in a tax tribunal", "Do not act as advocate; use another firm"],
          ["Familiarity", "Same engagement partner for many years", "Rotate the partner; independent review of the work"],
          ["Intimidation", "Client threatens to sack the firm over a disputed treatment", "Escalate; consult; resign if objectivity cannot be preserved"],
        ] },
        { kind: "callout", tone: "warn", title: "Some threats cannot be safeguarded away", md: "A **direct financial interest** in an audit client, or **contingent audit fees**, are so serious that no safeguard is sufficient — the only response is to eliminate the cause (sell the shares, refuse the arrangement) or decline the engagement. Do not invent a comforting safeguard where the Code demands you remove the threat entirely." },
      ],
      check: {
        q: "An audit firm helped a client value a complex financial instrument, and must now audit the carrying amount of that same instrument. Which threat is created?",
        options: [
          "Advocacy threat",
          "Intimidation threat",
          "Self-review threat",
          "Familiarity threat",
        ],
        correct: 2,
        explain: "When the firm audits figures it helped produce or value itself, it is effectively reviewing its own work and is unlikely to be sufficiently critical — this is the classic self-review threat. A common safeguard is to use a separate team, or to decline the valuation service so the audit stays clean.",
      },
    },
    {
      id: "acceptance",
      heading: "Accepting and continuing engagements (ISA 210)",
      blocks: [
        { kind: "text", md: "Before any evidence is gathered, the firm must decide whether to take the client on at all — and, each year, whether to keep it. Getting this wrong exposes the firm to unmanageable risk, so acceptance follows a disciplined sequence." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The engagement acceptance decision",
          caption: "Each gate must pass before the firm commits — and continuance repeats the checks every year.",
          data: {
            steps: [
              { label: "Client screening", sub: "Integrity of management; risk; is it ethical & legal to act?" },
              { label: "Competence & resources", sub: "Skills, time and staff to do it properly" },
              { label: "Independence", sub: "Threats identified, evaluated and safeguarded" },
              { label: "Preconditions", sub: "Acceptable framework + management's premise agreed" },
              { label: "Engagement letter", sub: "Terms agreed in writing before work begins" },
            ],
          },
        } },
        { kind: "text", md: "**ISA 210** frames the two **preconditions for an audit**. First, the financial reporting framework to be used must be **acceptable** (for example, IFRS). Second, management must **agree to the premise** on which an audit is conducted — that is, management acknowledges its responsibility for: preparing the financial statements (giving a true and fair view); designing the **internal control** needed for statements free from material misstatement; and providing the auditor with **access** to all information and unrestricted access to people within the entity. If the preconditions are not present, the auditor should **not accept** the engagement." },
        { kind: "text", md: "There is one further courtesy the profession requires: before accepting, the proposed auditor should seek the client's permission to **communicate with the outgoing (predecessor) auditor**. If the client refuses that permission, the firm should treat it as a warning sign and normally decline." },
        { kind: "text", md: "Once the firm accepts, the terms are recorded in an **engagement letter** — a written contract, signed before work starts, that prevents later argument about who was responsible for what." },
        { kind: "table", caption: "What an engagement letter contains (ISA 210)", head: ["Contents", "Why it matters"], rows: [
          ["The objective and scope of the audit", "Sets what the audit will — and will not — cover"],
          ["The responsibilities of the auditor", "States that the auditor forms an opinion, using ISAs"],
          ["The responsibilities of management", "Records the premise: accounts, controls and access"],
          ["The applicable financial reporting framework", "Confirms the criteria (e.g. IFRS)"],
          ["The expected form and content of reports", "Manages expectations about the auditor's report"],
        ] },
        { kind: "callout", tone: "tip", title: "Recurring audits — do you re-issue the letter?", md: "For a **continuing** engagement the auditor need not send a **new** engagement letter every year, but must decide whether circumstances require the existing terms to be revised and whether the client needs reminding of them. A change in senior management, ownership, the nature or size of the business, legal requirements or the reporting framework are all triggers to issue a fresh letter." },
        { kind: "example", title: "Worked example — a risky new client", scenario: "Your firm is approached to audit Vero Ltd. The finance director resists giving your team access to the board minutes, wants a fee that rises if the audit opinion is unmodified, and refuses to let you contact the previous auditor. Should the firm accept?", steps: [
          { label: "Access restriction", detail: "Refusing access to records breaches a precondition of ISA 210 — management must provide access to all information. This alone points to declining." },
          { label: "Contingent fee", detail: "A fee that depends on the audit outcome is a serious self-interest threat with no adequate safeguard — it is prohibited for an audit." },
          { label: "No predecessor contact", detail: "Refusing permission to contact the outgoing auditor removes a key source of information and is a classic warning sign of something to hide." },
          { label: "Overall risk", detail: "Together these signal low management integrity and unmanageable risk to independence and evidence." },
        ], result: "The firm should decline the engagement: the preconditions are not met, the fee arrangement is unethical, and management's behaviour signals unacceptable risk. No safeguard rescues a contingent audit fee or a refusal of access." },
      ],
    },
  ],
  examTraps: [
    { trap: "Saying an audit gives 'absolute' assurance or a guarantee the accounts are 100% correct.", fix: "An audit gives REASONABLE assurance — high but not absolute — because of sampling, judgement and evidence being persuasive, not conclusive." },
    { trap: "Confusing reasonable with limited assurance, or their conclusions.", fix: "Reasonable = audit, positive opinion ('do give a true and fair view'). Limited = review, negative conclusion ('nothing has come to our attention')." },
    { trap: "Thinking directors appoint the auditor.", fix: "Auditors are appointed by the SHAREHOLDERS at the general meeting, to keep them independent of the board they scrutinise (directors may only fill a casual vacancy)." },
    { trap: "Offering a safeguard for a threat the Code says must be eliminated.", fix: "A direct financial interest in the client or a contingent audit fee cannot be safeguarded — remove the cause or decline. Only reduce-able threats get safeguards." },
    { trap: "Forgetting the preconditions for an audit under ISA 210.", fix: "The framework must be acceptable AND management must agree the premise (responsibility for the accounts, internal control, and access). If not, do not accept." },
  ],
  keyTerms: [
    { term: "Reasonable assurance", def: "A high, but not absolute, level of assurance given by an audit — expressed as a positive opinion that the statements give a true and fair view." },
    { term: "True and fair view", def: "That the financial statements are free from material misstatement and faithfully reflect the substance of the entity's transactions and position." },
    { term: "Assurance engagement elements", def: "The five elements: a three-party relationship, subject matter, suitable criteria, sufficient appropriate evidence, and a written report." },
    { term: "Conceptual framework (ethics)", def: "The approach of identifying, evaluating and responding to threats to the fundamental principles, rather than a rulebook of prohibitions." },
    { term: "Preconditions for an audit (ISA 210)", def: "An acceptable financial reporting framework plus management's agreement to the premise — responsibility for the accounts, internal control and providing access." },
  ],
  summary: [
    "The external audit gives outside owners an independent opinion on whether the directors' statements give a true and fair view — free from MATERIAL misstatement.",
    "An audit gives reasonable (high, not absolute) assurance with a positive opinion; a review gives limited assurance with a negative conclusion. Every assurance engagement needs all five elements.",
    "ISAs (from the IAASB) sit within a layered framework of law and professional bodies; auditors are appointed by shareholders, can be removed by ordinary resolution, and hold statutory rights of access, information and attendance.",
    "The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality and professional behaviour; the five threats are self-interest, self-review, advocacy, familiarity and intimidation — met with proportionate safeguards.",
    "Before accepting, screen the client, confirm competence, independence and ISA 210 preconditions, seek permission to contact the predecessor auditor, and record the agreed terms in an engagement letter.",
  ],
}
