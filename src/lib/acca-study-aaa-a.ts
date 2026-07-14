import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA · Area A — The regulatory environment.
 * Advanced Audit & Assurance opener: the international rule-making machinery,
 * anti-money-laundering duties, laws & regulations (ISA 250), the audit of
 * listed & public-interest entities, corporate governance, the expectation gap,
 * audit quality and transnational audits. Original, syllabus-aligned; no
 * ACCA/Kaplan/BPP text reproduced.
 */

export const AAA_A: StudyChapter = {
  paper: "AAA",
  area: "A",
  title: "The regulatory environment",
  minutes: 15,
  intro: "At AAA you stop asking 'how do I audit this balance?' and start asking 'who set the rules, who watches the auditor, and what happens when a client is laundering money?' The regulatory environment is the frame every later decision sits inside.",
  outcomes: [
    "Explain the international regulatory structure — IFAC, the IAASB, IESBA and the standard-setting process",
    "State the auditor's anti-money-laundering duties: CDD, the MLRO, suspicious activity reports and the tipping-off offence",
    "Apply ISA 250 to distinguish direct laws from other laws and set the auditor's response",
    "Explain the enhanced requirements for listed and public-interest entities (PIEs)",
    "Analyse corporate governance, the audit committee and communication with those charged with governance",
    "Discuss the audit expectation gap, audit quality drivers and the features of transnational audits",
  ],
  sections: [
    {
      id: "international",
      heading: "Who writes the rules — the international structure",
      blocks: [
        { kind: "text", md: "An audit opinion signed in Lagos, Lima or London means the same thing because the same rulebook sits behind it. That consistency is manufactured by a layered structure of global bodies, and AAA expects you to name them precisely rather than wave at 'the regulators'." },
        { kind: "text", md: "At the top is **IFAC** — the International Federation of Accountants — the global umbrella for the accountancy profession. IFAC does not itself write auditing standards; instead it oversees and funds independent standard-setting boards. The most important for us is the **IAASB** (International Auditing and Assurance Standards Board), which issues the **ISAs** — the International Standards on Auditing you apply. Ethics are set separately by the **IESBA** (International Ethics Standards Board for Accountants), author of the **International Code of Ethics**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "From public interest to a signed opinion",
          caption: "Oversight flows down; the standards that reach the auditor flow up into every engagement.",
          data: {
            steps: [
              { label: "PIOB", sub: "Public Interest Oversight Board — watches the process serves the public" },
              { label: "IFAC", sub: "Global profession umbrella; convenes the boards" },
              { label: "IAASB", sub: "Issues ISAs, ISQMs, ISAEs" },
              { label: "ISAs applied", sub: "The engagement is performed to standard" },
              { label: "Audit opinion", sub: "Comparable across borders" },
            ],
          },
        } },
        { kind: "text", md: "One nuance examiners reward: the IAASB sets standards but has **no legal force of its own**. ISAs bite only once a national regulator or law **adopts** them — which is why you also meet local oversight bodies (in the UK the **FRC**, in the US the **PCAOB**). The **PIOB** sits above the boards to confirm the whole process is run in the public interest, not the profession's self-interest." },
        { kind: "callout", tone: "key", title: "The one idea", md: "IFAC oversees; the **IAASB** writes auditing standards and the **IESBA** writes the ethics code; a **national regulator** gives them legal teeth. No single body does all three." },
      ],
    },
    {
      id: "money-laundering",
      heading: "Money laundering — the auditor as gatekeeper",
      blocks: [
        { kind: "text", md: "Money laundering is the process of making the proceeds of crime look legitimate. Auditors and accountants are prime targets to be used as unwitting conduits, so anti-money-laundering (AML) law places **direct legal duties** on the firm — duties that can override the normal duty of confidentiality to a client." },
        { kind: "text", md: "The classic model has three stages: **placement** (dirty cash enters the financial system), **layering** (a web of transactions disguises the trail) and **integration** (the funds re-emerge looking clean). An auditor rarely sees the crime itself — they see the fingerprints: round-sum cash deposits, transactions with no business rationale, or a client reluctant to identify who really owns it." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The three stages of laundering",
          data: {
            steps: [
              { label: "Placement", sub: "Criminal cash enters the system" },
              { label: "Layering", sub: "Complex transfers hide the origin" },
              { label: "Integration", sub: "Funds return as 'clean' wealth" },
            ],
          },
        } },
        { kind: "text", md: "The firm's defences are built on four pillars. First, **customer due diligence (CDD)** — before accepting an engagement the firm must identify the client and verify who **beneficially owns and controls** it, and keep that under review. Enhanced due diligence applies to higher-risk clients such as politically exposed persons. Second, every firm must appoint a **Money Laundering Reporting Officer (MLRO)** — the internal point to whom staff report concerns. Third, when a member of staff **knows or suspects** money laundering, they file an **internal report to the MLRO**, who evaluates it and, where appropriate, files a **Suspicious Activity Report (SAR)** with the national financial-intelligence authority. Fourth, staff must be **trained** and records kept." },
        { kind: "callout", tone: "warn", title: "Tipping off — the offence that traps the careless", md: "It is a **criminal offence** to **tip off** — to disclose to the client (or anyone) that a report has been made or that a money-laundering investigation is under way, where that disclosure is likely to prejudice the investigation. This is why the auditor must **not** raise the SAR with the client and must be careful that even the wording of a normal audit query does not reveal the suspicion." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The auditor's four AML duties",
          data: {
            items: [
              { title: "Customer due diligence", sub: "Identify the client and its beneficial owners before and during the engagement" },
              { title: "Report internally to the MLRO", sub: "Knowledge OR suspicion is enough — you do not need proof" },
              { title: "MLRO files a SAR", sub: "Suspicious Activity Report to the financial-intelligence unit" },
              { title: "Do not tip off", sub: "Never warn the client that a report or investigation exists" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The threshold is low on purpose", md: "The reporting trigger is **suspicion**, not certainty. You are not required — or even permitted — to investigate to prove a crime before reporting. Failing to report a genuine suspicion is itself an offence." },
      ],
      check: {
        q: "During the audit, the senior notices deposits that strongly suggest a client is laundering money. What is the correct first step?",
        options: [
          "Ask the client's finance director to explain the deposits, so the suspicion is confirmed before acting",
          "Report the suspicion internally to the firm's MLRO",
          "File a Suspicious Activity Report directly with the authorities and resign at once",
          "Note it in the file and wait for more evidence to build a stronger case",
        ],
        correct: 1,
        explain: "The engagement-team member reports internally to the MLRO — suspicion is the trigger, no proof is needed. Confronting the finance director risks the criminal offence of TIPPING OFF and could prejudice any investigation. The individual senior does not file the SAR themselves (that is the MLRO's evaluated decision), and 'waiting for more evidence' is exactly the failure to report the law punishes.",
      },
    },
    {
      id: "isa250",
      heading: "Laws and regulations — ISA 250",
      blocks: [
        { kind: "text", md: "AML law aside, every client operates inside a thicket of laws. **ISA 250** tells the auditor how far responsibility for a client's non-compliance stretches — and the exam loves candidates who blur the line. The key is that ISA 250 splits laws into **two categories** that carry **different responsibilities**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "ISA 250 — two categories of law",
          data: {
            leftTitle: "Direct effect on the statements",
            rightTitle: "Other laws (indirect)",
            rows: [
              { aspect: "Example", left: "Tax law, pension law, the reporting framework itself", right: "Environmental, health & safety, operating-licence, data-protection law" },
              { aspect: "How it hits the accounts", left: "Determines material amounts and disclosures", right: "Breach may cause a fine/liability but is a step removed" },
              { aspect: "Auditor's duty", left: "Obtain sufficient appropriate evidence of compliance", right: "Perform specified procedures to identify non-compliance that may be material" },
              { aspect: "Level of assurance", left: "Positive — actively test compliance", right: "Alert — enquire, inspect correspondence, stay watchful" },
            ],
          },
        } },
        { kind: "text", md: "For the **first category** — laws that directly determine reported amounts and disclosures, such as tax and pensions legislation — the auditor must **obtain sufficient appropriate evidence of compliance**, because non-compliance would misstate the accounts. For the **second, broader category**, the auditor's role is narrower: perform **specified procedures** (enquiry of management, inspecting correspondence with regulators) to help **identify** non-compliance that could have a material effect, and remain alert throughout." },
        { kind: "callout", tone: "rule", title: "Detection is not the objective", md: "The auditor is **not** responsible for preventing non-compliance and cannot be expected to detect every breach — many laws are unrelated to the financial statements. Responsibility for compliance rests with **management and those charged with governance**. This limit is central to the expectation gap you meet later in the chapter." },
        { kind: "text", md: "When non-compliance **is** identified or suspected, the response ladders up: understand the act and circumstances, evaluate the effect on the statements, discuss with management **at a level above** those involved, and consider the need for legal advice. If management or governance are themselves implicated, the auditor may communicate to a higher level, consider the impact on the **audit opinion**, and — subject to legal duties such as the AML regime — may need to report to an appropriate authority or **withdraw** from the engagement." },
        { kind: "example", title: "Worked example — applying ISA 250", scenario: "During the audit of Delta Manufacturing you learn the company was fined for breaching emissions regulations, and correspondence hints a larger penalty may follow. Management has recorded neither a provision nor a disclosure. How do you respond under ISA 250?", steps: [
          { label: "Classify the law", detail: "Environmental law is an 'other law' — indirect. But once a breach with a probable outflow exists, it has a DIRECT accounting consequence via the provisions standard." },
          { label: "Gather evidence", detail: "Inspect the regulator's correspondence, the fine notice and any legal advice; enquire of the directors and, if needed, the company's lawyers." },
          { label: "Assess the accounting", detail: "A present obligation from a past event with a probable outflow that can be estimated needs a PROVISION; a possible further penalty needs a contingent-liability DISCLOSURE." },
          { label: "Escalate and conclude", detail: "Discuss with those charged with governance; if they refuse to provide or disclose, evaluate the effect on the opinion (a potential material misstatement → qualified/adverse)." },
        ], result: "ISA 250 turns a 'non-financial' breach into an audit issue the moment it creates a measurable obligation. The auditor tests it, escalates it, and lets the resolution drive the opinion." },
      ],
      check: {
        q: "Under ISA 250, for which type of law must the auditor actively obtain sufficient appropriate evidence of the client's compliance?",
        options: [
          "All laws and regulations the client is subject to, without distinction",
          "Only laws with a direct effect on the determination of material amounts and disclosures in the financial statements",
          "Only health, safety and environmental laws",
          "None — compliance is entirely management's responsibility and outside the audit",
        ],
        correct: 1,
        explain: "ISA 250 splits laws in two. For laws with a DIRECT effect on material amounts and disclosures (e.g. tax, pensions, the reporting framework) the auditor must obtain sufficient appropriate evidence of compliance. For other, indirect laws the duty is lighter — perform specified procedures and stay alert. It is neither 'all laws equally' nor 'nothing'.",
      },
    },
    {
      id: "pie",
      heading: "Listed entities and public-interest entities (PIEs)",
      blocks: [
        { kind: "text", md: "When a company's shares or debt trade publicly, thousands of strangers rely on the audit, so the rules tighten. A **public-interest entity (PIE)** captures listed companies plus others of significant public relevance — typically **banks, insurers and other financial institutions** — regardless of listing. Auditing a PIE triggers a package of enhanced requirements that AAA tests directly." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "What changes when the client is a PIE",
          data: {
            items: [
              { title: "Key audit matters", sub: "The auditor's report must communicate KAMs (mandatory for listed entities under ISA 701)" },
              { title: "Engagement quality review", sub: "An independent EQR partner must review before the opinion is signed" },
              { title: "Stricter independence", sub: "Tighter non-audit-service limits and fee caps; partner rotation" },
              { title: "Mandatory rotation", sub: "Firm and/or engagement partner rotated to protect independence" },
              { title: "Governance interface", sub: "Report to and be appointed via an independent audit committee" },
              { title: "Fuller transparency", sub: "Auditor transparency reporting and heightened public scrutiny" },
            ],
          },
        } },
        { kind: "text", md: "Two of these deserve emphasis. **Key Audit Matters (KAMs)** — required by **ISA 701** for listed entities — are the matters that, in the auditor's judgement, were **most significant** to the audit. They are described in a dedicated section of the report, but crucially KAMs are **not** a qualification and **not** a separate opinion; they are transparency about where the audit effort went. Second, the **Engagement Quality Review (EQR)**: an experienced partner **outside** the engagement team performs an objective evaluation of the significant judgements **before** the report is issued — a second set of eyes the standards mandate for PIEs." },
        { kind: "callout", tone: "warn", title: "Independence is where PIEs bite hardest", md: "Threats that are tolerable for a small owner-managed company become unacceptable for a PIE. Expect exam scenarios where a partner rotation is overdue, a non-audit fee breaches the cap, or the same firm is asked to both audit and build the client's financial systems — for a PIE these are often prohibited outright, not merely safeguarded." },
      ],
    },
    {
      id: "governance",
      heading: "Corporate governance and those charged with governance",
      blocks: [
        { kind: "text", md: "Corporate governance is the system by which companies are **directed and controlled** — the checks that stop the people running a business with other people's money from serving themselves. Most codes (built on the 'comply or explain' model) share a common backbone the auditor relies on." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Governance features the auditor leans on",
          data: {
            items: [
              { title: "Board balance", sub: "Sufficient independent non-executive directors to challenge management" },
              { title: "Split of roles", sub: "Chair and CEO separated so no one person dominates" },
              { title: "Audit committee", sub: "Independent NEDs overseeing reporting, controls and the external audit" },
              { title: "Risk & internal control", sub: "The board owns a sound risk-management and control system" },
            ],
          },
        } },
        { kind: "text", md: "The **audit committee** — composed of **independent non-executive directors** — is the auditor's natural counterpart. It **recommends the appointment**, removal and remuneration of the external auditor, reviews the audit's scope and findings, monitors auditor **independence** (including approving non-audit services), and gives the auditor a channel to raise concerns **away from** the executives whose numbers are under scrutiny. That independence is precisely why it strengthens audit quality." },
        { kind: "text", md: "'**Those charged with governance (TCWG)**' is the ISA term for the people responsible for **overseeing** the entity's strategic direction and accountability — often the board, or the audit committee acting for it — as distinct from **management**, who run day-to-day operations. **ISA 260** requires the auditor to communicate specified matters to TCWG: the planned **scope and timing**, significant findings, difficulties encountered, and the auditor's views on the **qualitative aspects** of accounting practices. **ISA 265** adds that significant **deficiencies in internal control** are communicated in writing. Reporting these to an independent committee, not to the executives being audited, is what gives the communication bite." },
        { kind: "callout", tone: "tip", md: "Keep the roles straight: **management** prepares the statements and runs operations; **TCWG** oversee them; the **auditor** provides independent assurance to shareholders. Confusing 'management' with 'those charged with governance' is a common ISA 260 slip in exam answers." },
      ],
      check: {
        q: "Which body is primarily responsible for monitoring the external auditor's independence and recommending the auditor's appointment?",
        options: [
          "The executive management team led by the finance director",
          "The audit committee of independent non-executive directors",
          "The national tax authority",
          "The company's largest shareholder",
        ],
        correct: 1,
        explain: "The audit committee — made up of INDEPENDENT non-executive directors — recommends the auditor's appointment and remuneration and monitors independence (including approving non-audit services). Its independence from the executives is exactly what makes it an effective safeguard. Management preparing the numbers cannot objectively oversee the auditor scrutinising them.",
      },
    },
    {
      id: "gap-quality",
      heading: "The expectation gap, audit quality and transnational audits",
      blocks: [
        { kind: "text", md: "Ask the public what an audit does and many will say the auditor 'guarantees the accounts are correct' and 'will catch any fraud'. Neither is true — and the distance between what the public **believes** and what the auditor **actually does** is the **audit expectation gap**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The expectation gap",
          data: {
            leftTitle: "What users often expect",
            rightTitle: "What the audit actually provides",
            rows: [
              { aspect: "Assurance level", left: "Accounts are 100% correct — a guarantee", right: "Reasonable (not absolute) assurance, free of MATERIAL misstatement" },
              { aspect: "Fraud", left: "The auditor detects all fraud", right: "Plans for material fraud risk; not a guarantee to find all fraud" },
              { aspect: "Going concern", left: "A clean report means the company is safe", right: "A judgement at the reporting date, not a prediction of survival" },
              { aspect: "The numbers", left: "The auditor prepares the accounts", right: "Management prepares; the auditor gives an independent opinion" },
            ],
          },
        } },
        { kind: "text", md: "The gap has two components worth naming: a **knowledge/expectation** element (users misunderstand what an audit is — closed by education, clearer reports and expanded KAMs) and a **performance** element (auditors falling short of the standards — closed by better quality and regulation). Extended auditor reports, KAMs and clearer statements of respective responsibilities are all deliberate attempts to narrow it." },
        { kind: "text", md: "**Audit quality** is what keeps the performance side of the gap small. Under the IAASB's quality-management standards (**ISQM 1 and 2** at firm level, **ISA 220** at engagement level), a firm designs a system responsive to its own risks. The drivers examiners expect you to discuss:" },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Drivers of audit quality",
          data: {
            items: [
              { title: "Culture & tone at the top", sub: "Leadership that puts quality above fee pressure" },
              { title: "Competent, ethical people", sub: "Skilled teams with time and training to do the work" },
              { title: "Rigorous processes", sub: "Sound methodology, direction, supervision and review" },
              { title: "Monitoring & remediation", sub: "EQRs, cold-file reviews and acting on findings" },
            ],
          },
        } },
        { kind: "text", md: "Finally, a **transnational audit** is one where the report is relied on **outside** the entity's home country — for cross-border capital raising, listing or use by an international group. These carry extra risk because standards, oversight and legal regimes **differ between jurisdictions**, communication and cultural distance are greater, and group auditors must place reliance on **component auditors** they do not control (an ISA 600 concern). The **Forum of Firms** — networks committing to consistent global quality standards — exists precisely to raise the floor on such engagements." },
        { kind: "callout", tone: "key", title: "Tie it together", md: "Regulation, AML law, PIE rules, governance and quality management all point one way: shrink the **performance** side of the expectation gap so that a signed opinion means the same thing to a stranger in any market." },
      ],
    },
  ],
  examTraps: [
    { trap: "Saying the auditor must gather proof of money laundering before reporting.", fix: "The trigger is SUSPICION, not certainty. Report internally to the MLRO on suspicion — investigating to 'confirm' it risks tipping off and delays a required report." },
    { trap: "Telling the client (or asking pointed questions) that reveals a SAR has been filed.", fix: "That is the criminal offence of TIPPING OFF. Never disclose that a report or investigation exists where it could prejudice the investigation." },
    { trap: "Claiming ISA 250 makes the auditor responsible for detecting all breaches of law.", fix: "Only laws with a DIRECT effect on the statements require positive evidence of compliance; for other laws the duty is limited to specified procedures. Compliance is management's responsibility." },
    { trap: "Treating Key Audit Matters as a qualification or a second opinion.", fix: "KAMs (ISA 701) simply describe the most significant matters in the audit. They are transparency, not a modification of the opinion." },
    { trap: "Confusing 'management' with 'those charged with governance' in ISA 260/265.", fix: "Management runs operations and prepares the statements; TCWG oversee. The auditor communicates significant findings and control deficiencies to TCWG — often the audit committee." },
  ],
  keyTerms: [
    { term: "IAASB", def: "The International Auditing and Assurance Standards Board — the IFAC-overseen body that issues the ISAs and quality-management standards." },
    { term: "Money Laundering Reporting Officer (MLRO)", def: "The firm's appointed officer who receives internal reports of suspicion, evaluates them and, where appropriate, files a Suspicious Activity Report." },
    { term: "Tipping off", def: "The criminal offence of disclosing that a money-laundering report has been made or an investigation is under way, where it may prejudice the investigation." },
    { term: "Public-interest entity (PIE)", def: "A listed entity or one of significant public relevance (e.g. a bank or insurer) subject to enhanced audit requirements such as EQR, KAMs and stricter independence." },
    { term: "Those charged with governance (TCWG)", def: "The persons responsible for overseeing an entity's strategic direction and accountability — often the board or audit committee — as distinct from management." },
    { term: "Audit expectation gap", def: "The difference between what users believe an audit delivers (e.g. a guarantee, catching all fraud) and what it actually provides (reasonable assurance on material misstatement)." },
  ],
  summary: [
    "IFAC oversees the profession; the IAASB writes auditing standards and the IESBA writes the ethics code; national regulators give them legal force.",
    "AML duties: customer due diligence, report suspicion internally to the MLRO, who files a SAR — and never tip off the client.",
    "ISA 250 splits laws in two: obtain evidence of compliance for laws with a direct effect on the statements; perform specified procedures for other laws.",
    "PIEs (listed entities, banks, insurers) trigger enhanced rules: KAMs, engagement quality reviews, mandatory rotation and stricter independence.",
    "Governance and the independent audit committee support quality; the auditor communicates with TCWG (ISA 260/265) to narrow the performance side of the expectation gap.",
  ],
}
