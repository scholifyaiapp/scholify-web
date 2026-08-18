import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area A (regulatory environment), Area B (professional and ethical
 * considerations) and Area C (quality management).
 *
 *   AAA-01  The regulatory framework and the audit committee (A1)
 *   AAA-02  Money laundering                                 (A2)
 *   AAA-03  Laws and regulations                             (A3)
 *   AAA-04  The Code, threats and safeguards                 (B1a–d, f)
 *   AAA-05  Professional scepticism                          (B1e, g)
 *   AAA-06  Fraud and error                                  (B2)
 *   AAA-07  Professional liability                           (B3)
 *   AAA-08  Quality management at firm and engagement level  (C1)
 *   AAA-09  Advertising, tendering and fees                  (C2)
 *   AAA-10  Professional appointments                        (C3)
 *
 * AAA has NINE syllabus areas, A to I — the largest count in the library. The
 * previous content was nine chapters, one per area, at ~11,500 words.
 *
 * Section A is a 50-mark case study set at the PLANNING stage, drawing
 * predominantly on areas A, B, C and D. That is why those four areas carry the
 * bulk of this tree, and why the ethical and risk chapters are written as
 * routines a candidate can run against an exhibit rather than as descriptions
 * of the standards.
 *
 * Written against the official ACCA AAA-INT syllabus and study guide for
 * September 2026 to June 2027. The founder's AAA workbook and practice and
 * revision kit informed depth and chapter sizing only — every word here is
 * original, and both books plus the syllabus form the originality corpus.
 *
 * House style for AAA. The examiner's persistent complaint is that candidates
 * describe standards instead of applying them to the scenario. So no standard
 * is taught for its own sake: every chapter states what the auditor must DO,
 * what evidence would satisfy it, and what the answer looks like when the
 * scenario supplies a fact that changes it.
 */

const AAA_TREE_01: StudyChapter = {
  paper: "AAA",
  id: "AAA-01",
  number: 1,
  area: "A",
  syllabusRefs: ["A1(a)", "A1(b)", "A1(c)"],
  title: "The regulatory framework and the audit committee",
  minutes: 15,
  intro:
    "Audit is a regulated activity because the people who benefit from it are not the people who pay for it. Every structure in this chapter exists to manage that.",
  outcomes: [
    "Explain why audit and assurance need laws, standards and other guidance",
    "Explain the role of public oversight of audit practice",
    "Explain the impact of corporate governance principles on audit",
    "Discuss the audit committee's relationship with the external auditor",
    "Explain the audit committee's role in approving non-audit services",
  ],
  sections: [
    {
      id: "why-regulated",
      heading: "Why the framework exists",
      blocks: [
        {
          kind: "text",
          md: "An audit is paid for by the company but relied on by shareholders, lenders and regulators. The auditor is appointed by, and negotiates fees with, the very management whose statements they are testing. That structural tension — not any suspicion of individual auditors — is what the regulatory framework is built to contain.",
        },
        {
          kind: "table",
          caption: "The layers of the framework",
          head: ["Layer", "What it provides"],
          rows: [
            ["Law", "Who must be audited, who may audit, and the auditor's rights and duties"],
            ["Auditing standards", "How an audit must be conducted, so that an opinion means the same thing everywhere"],
            ["Ethical codes", "The independence and conduct requirements underpinning the opinion's credibility"],
            ["Public oversight", "Independent supervision of the profession, so it does not regulate itself alone"],
            ["Corporate governance codes", "Requirements on the audited entity — audit committees, internal control, disclosure"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Public oversight is the answer to a specific criticism",
          md: "A profession setting its own standards, licensing its own members and investigating its own failures has an obvious conflict. Independent oversight bodies — inspecting audit files, setting or approving standards, and holding disciplinary powers — exist to answer it. When a scenario mentions a regulatory inspection finding, that is this layer operating, and the firm's response is a quality management matter.",
        },
      ],
      check: {
        q: "Why is audit subject to a regulatory framework rather than left to contract between the auditor and the company?",
        options: [
          "Because auditors would otherwise charge excessive fees",
          "Because the audit is paid for by the company but relied on by shareholders, lenders and regulators who are not party to that contract — and the auditor is appointed by the management they are testing",
          "Because auditing is technically complex",
          "Because companies would otherwise not have audits at all",
        ],
        correct: 1,
        explain:
          "The framework exists to protect people outside the contract, and to contain the structural tension of an auditor appointed and paid by their own subject. Complexity alone would not require regulation, and the fee point is a symptom rather than the reason.",
      },
    },
    {
      id: "audit-committee",
      heading: "The audit committee",
      blocks: [
        {
          kind: "text",
          md: "The audit committee is the governance mechanism that breaks the direct line between the auditor and executive management. Composed of independent non-executive directors, it inserts a party with no operational stake between the auditor and the people whose work is being audited.",
        },
        {
          kind: "table",
          caption: "What the committee does for the external auditor",
          head: ["Function", "Why it matters"],
          rows: [
            ["Recommends appointment and removal", "The auditor no longer depends on the executives they challenge for their reappointment"],
            ["Negotiates and approves the fee", "Fee pressure from management is mediated by an independent body"],
            ["Monitors auditor effectiveness and independence", "Provides a route for concerns to be raised outside the executive line"],
            ["Approves non-audit services", "Prevents the audit firm accumulating fee-earning work that compromises independence"],
            ["Meets the auditor without management present", "Allows the auditor to raise concerns about management candidly"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The last row is the one to use in a scenario",
          md: "A private meeting between the auditor and the committee **without executives present** is what makes the committee useful. Where a scenario has an auditor concerned about management's integrity, the estimate they have pushed back on, or a disagreement over a disclosure, the recommendation is to raise it with the audit committee — and to do so in that private session. It is a specific, practical action rather than a general reference to governance.",
        },
        {
          kind: "text",
          md: "The **non-audit services** function connects this chapter to the ethics area. The committee's approval is a safeguard, and its absence is a finding: where a scenario shows the audit firm providing significant additional services approved by the finance director rather than by the committee, the governance safeguard has been bypassed and the self-review and self-interest threats are unmanaged.",
        },
      ],
      check: {
        q: "An audit engagement partner is concerned that the finance director has been evasive about a large estimate. What does the audit committee's existence allow?",
        options: [
          "Immediate resignation from the engagement",
          "Raising the concern with the committee in a session held without executive management present — which is precisely why that mechanism exists, and it is a concrete recommendation rather than a general appeal to governance",
          "Reporting the finance director to the regulator",
          "Increasing the audit fee to reflect the difficulty",
        ],
        correct: 1,
        explain:
          "The private session is the mechanism designed for exactly this. Resignation is a last resort after other avenues, and a regulatory report would be premature where the concern has not yet been escalated internally or the evidence evaluated.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing the regulatory framework in general terms.", fix: "Say which layer the scenario engages and what it requires the auditor to do." },
    { trap: "Referring to 'good governance' without a mechanism.", fix: "Name the audit committee action — private session, approval of non-audit services, monitoring." },
    { trap: "Missing that non-audit services were approved by management.", fix: "Committee approval is the safeguard; its absence is the finding." },
  ],
  keyTerms: [
    { term: "Public oversight", def: "Independent supervision of audit practice, including file inspection and disciplinary powers, answering the conflict inherent in self-regulation." },
    { term: "Audit committee", def: "A committee of independent non-executive directors that appoints, monitors and pays the external auditor, breaking the direct line to executive management." },
  ],
  summary: [
    "Audit is regulated because those relying on it are not party to the contract that buys it.",
    "Public oversight answers the conflict in a profession regulating itself.",
    "The audit committee separates the auditor from the executives they test.",
    "The private session without management is the committee's most useful mechanism.",
  ],
  knowledgeDiagnostic: [
    { q: "What structural tension does the regulatory framework contain?", a: "The auditor is appointed and paid by the management whose statements they test, while the beneficiaries of the audit are outside that relationship." },
    { q: "What is the audit committee's role in non-audit services?", a: "Approving them, so the audit firm cannot accumulate fee-earning work that compromises independence without independent scrutiny." },
    { q: "What makes the private session valuable?", a: "It lets the auditor raise concerns about management candidly to people with no operational stake in the answer." },
  ],
  furtherStudy: [
    "AAA-04 covers the threats the audit committee's approval process is a safeguard against.",
    "AAA-22 covers what the auditor reports to those charged with governance.",
    "AAA-08 covers quality management, including responses to regulatory inspection findings.",
  ],
}

const AAA_TREE_02: StudyChapter = {
  paper: "AAA",
  id: "AAA-02",
  number: 2,
  area: "A",
  syllabusRefs: ["A2"],
  title: "Money laundering",
  minutes: 16,
  intro:
    "The one area where the auditor's duty to the state overrides their duty to the client — and where telling the client what you have done is itself a crime.",
  outcomes: [
    "Define money laundering and outline the international response",
    "Explain the criminal offences and how accountants gain protection",
    "Describe the obligations accountants must meet, including record keeping and reporting",
    "Explain customer due diligence and recommend what should be obtained",
    "Recognise suspicious circumstances and assess the reporting consequences",
  ],
  sections: [
    {
      id: "offences",
      heading: "The offences, and the protection",
      blocks: [
        {
          kind: "text",
          md: "**Money laundering** is the process of making the proceeds of crime appear legitimate — classically in three stages: **placement** of criminal funds into the system, **layering** through transactions that obscure their origin, and **integration** back into the economy as apparently clean money.",
        },
        {
          kind: "table",
          caption: "The offences an accountant can commit",
          head: ["Offence", "How an accountant commits it"],
          rows: [
            ["Laundering itself", "Acquiring, using, possessing or concealing criminal property, including their own fee if it derives from crime"],
            ["Failure to report", "Having knowledge or suspicion in the course of business and not reporting it"],
            ["Tipping off", "Telling the client, or anyone else, that a report has been made or an investigation is contemplated"],
            ["Prejudicing an investigation", "Falsifying, concealing or destroying relevant documents"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Reporting is what protects you",
          md: "Making a report to the firm's **money laundering reporting officer**, who considers an external report, is what gives the accountant protection from the principal offences. So the sequence is not discretionary and it is not delayed: **suspicion, internal report, and no discussion with the client**. An accountant who suspects and says nothing has committed an offence of their own.",
        },
        {
          kind: "text",
          md: "Two features distinguish this from every other obligation in the syllabus. **Suspicion is enough** — proof is not required, and the accountant is not expected to investigate. And the duty **overrides client confidentiality**, which nothing else in the ethical framework does. Both points are worth stating explicitly in an answer.",
        },
      ],
      check: {
        q: "An audit senior suspects a client's cash sales are being inflated to launder criminal proceeds. What should they do?",
        options: [
          "Investigate further and gather evidence before acting",
          "Report the suspicion internally to the money laundering reporting officer without delay, and say nothing to the client — suspicion is enough, investigation is not required, and warning the client would be tipping off",
          "Raise it with the client's finance director for an explanation",
          "Include it in the audit report",
        ],
        correct: 1,
        explain:
          "Suspicion triggers the obligation, and the internal report is what confers protection. Asking the client for an explanation — option 2 — risks tipping off, and delay while gathering evidence exposes the individual to the failure-to-report offence.",
      },
    },
    {
      id: "cdd-programme",
      heading: "Customer due diligence and the firm's programme",
      blocks: [
        {
          kind: "text",
          md: "**Customer due diligence**, also called know your customer, means establishing who you are actually dealing with before accepting them — and keeping that understanding current. It is the mechanism by which a firm avoids becoming the route through which criminal money is made respectable.",
        },
        {
          kind: "table",
          caption: "What should be obtained",
          head: ["Element", "Why"],
          rows: [
            ["Identity of the client", "Verified from independent documentary evidence, not the client's assertion"],
            ["Beneficial ownership", "Who ultimately owns or controls the entity, looking through nominee and corporate layers"],
            ["Nature and purpose of the business", "So that transactions inconsistent with it become visible"],
            ["Source of funds and wealth", "Particularly where the amounts or the client's profile invite question"],
            ["Ongoing monitoring", "Because a relationship that began legitimately can change"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Beneficial ownership is where the difficulty lies",
          md: "A client whose ownership cannot be established through layers of overseas entities is not merely an administrative inconvenience — it is the classic indicator. Where due diligence cannot be completed, the firm should **not accept or continue** the relationship, and should consider whether the inability to identify the owner is itself a reportable suspicion.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The elements of a firm's anti-money laundering programme",
          items: [
            "A nominated **money laundering reporting officer** with the authority and access to act",
            "**Policies and procedures** covering acceptance, due diligence and reporting",
            "**Training** so that staff recognise indicators and know the internal route",
            "**Record keeping** of due diligence and of reports, retained for the required period",
            "**Risk assessment** of clients, sectors and jurisdictions, with enhanced procedures where risk is higher",
            "**Independent review** of the programme's effectiveness",
          ],
        },
      ],
      check: {
        q: "A prospective client's ultimate beneficial ownership cannot be established despite repeated enquiry. What follows?",
        options: [
          "Accept the engagement and document the difficulty",
          "Do not accept the client — due diligence cannot be completed — and consider whether the inability to identify the beneficial owner is itself a suspicion requiring an internal report",
          "Accept, but apply a higher fee to reflect the risk",
          "Accept and rely on the client's written confirmation of ownership",
        ],
        correct: 1,
        explain:
          "Due diligence is a precondition rather than a formality, and opaque ownership is a recognised indicator rather than an inconvenience. Accepting on the client's own confirmation defeats the purpose of verifying from independent evidence.",
      },
    },
  ],
  examTraps: [
    { trap: "Investigating before reporting.", fix: "Suspicion is enough; investigation is not the accountant's role and delay creates a further offence." },
    { trap: "Asking the client to explain a suspicious transaction.", fix: "That risks tipping off, which is a separate criminal offence." },
    { trap: "Treating confidentiality as overriding.", fix: "The reporting obligation overrides it — uniquely in the ethical framework." },
    { trap: "Accepting a client whose ownership cannot be traced.", fix: "Due diligence is a precondition, and opacity is itself an indicator." },
  ],
  keyTerms: [
    { term: "Money laundering", def: "Making the proceeds of crime appear legitimate, classically through placement, layering and integration." },
    { term: "Money laundering reporting officer", def: "The nominated individual within a firm to whom suspicions are reported internally and who decides on an external report." },
    { term: "Customer due diligence", def: "Establishing and verifying who the client is, who ultimately owns them, and the nature of their business, before and during the relationship." },
  ],
  summary: [
    "Suspicion alone triggers the duty; investigation is not required and delay is an offence.",
    "Internal reporting is what confers protection from the principal offences.",
    "Tipping off is a separate crime — say nothing to the client.",
    "Where beneficial ownership cannot be established, do not act, and consider reporting.",
  ],
  knowledgeDiagnostic: [
    { q: "What threshold triggers the reporting obligation?", a: "Suspicion — proof is not required and the accountant is not expected to investigate." },
    { q: "Which duty does the reporting obligation override?", a: "Client confidentiality, uniquely within the ethical framework." },
    { q: "What should be obtained about a corporate client's ownership?", a: "The ultimate beneficial owner, verified through any nominee or corporate layers rather than accepted on assertion." },
  ],
  furtherStudy: [
    "AAA-03 covers non-compliance with laws and regulations more generally.",
    "AAA-10 covers client acceptance, of which due diligence is part.",
    "AAA-06 covers fraud, which frequently generates the criminal property in question.",
  ],
}

const AAA_TREE_03: StudyChapter = {
  paper: "AAA",
  id: "AAA-03",
  number: 3,
  area: "A",
  syllabusRefs: ["A3"],
  title: "Laws and regulations",
  minutes: 15,
  intro:
    "The auditor is not a compliance inspector, and the standard is careful about how far the responsibility goes. Knowing where the line falls is the examinable point.",
  outcomes: [
    "Compare management's and the auditor's responsibilities for compliance",
    "Distinguish laws with a direct effect on the financial statements from other laws",
    "Plan procedures where possible non-compliance is identified",
    "Advise how and to whom non-compliance should be reported",
    "Recognise when withdrawal from the engagement becomes necessary",
  ],
  sections: [
    {
      id: "responsibilities",
      heading: "Whose responsibility, and how far it goes",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Management complies; the auditor considers",
          md: "**Management** is responsible for compliance with laws and regulations, and for the systems that achieve it. The **auditor** is not responsible for preventing non-compliance and cannot be expected to detect all of it — but they must consider it, and the depth of that consideration depends on which category of law is involved.",
        },
        {
          kind: "table",
          caption: "Two categories, two levels of work",
          head: ["", "Direct effect on the financial statements", "Other laws and regulations"],
          rows: [
            ["Examples", "Tax legislation, pension requirements, laws determining reported amounts", "Licensing, environmental, health and safety, data protection, employment"],
            ["Auditor's responsibility", "Obtain sufficient appropriate evidence about compliance", "Perform specified procedures to help identify non-compliance that may materially affect the statements"],
            ["Typical procedures", "Substantive testing of the amounts the law determines", "Enquiry of management, inspection of correspondence with regulators, reading board minutes"],
            ["Why the difference", "These laws determine reported figures directly", "These affect the statements only through fines, provisions, contingencies or going concern"],
          ],
        },
        {
          kind: "text",
          md: "The distinction is worth stating precisely in an answer, because candidates commonly assert that the auditor must test compliance with everything. They must not, and the standard says so — but the specified procedures for the second category are genuine obligations rather than a formality, and omitting them is a real deficiency.",
        },
      ],
      check: {
        q: "A manufacturing client is subject to environmental regulations. What is the auditor's responsibility?",
        options: [
          "To test compliance with the environmental regulations directly",
          "To perform specified procedures — enquiry of management, inspecting correspondence with regulators, reading minutes — to help identify non-compliance that could materially affect the financial statements through fines, provisions or going concern",
          "None, since environmental law does not affect the financial statements",
          "To report any breach to the environmental regulator",
        ],
        correct: 1,
        explain:
          "Environmental law does not determine reported amounts directly, so it falls in the second category: the auditor performs specified procedures rather than auditing compliance itself. It still matters, because a breach can produce a material provision, contingency or going concern issue.",
      },
    },
    {
      id: "response",
      heading: "Responding to identified non-compliance",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The sequence",
          items: [
            "**Understand** the nature of the act and the circumstances, obtaining further information to evaluate the possible effect",
            "**Discuss** the matter with management — and, where the circumstances make it appropriate, with those charged with governance, unless they are themselves implicated",
            "**Consider the effect on the financial statements** — provisions, contingent liabilities, disclosure, and whether going concern is affected",
            "**Consider the effect on the audit** — the reliability of management representations, and whether other areas need reassessment",
            "**Consider legal advice**, particularly where the auditor's own duties are unclear",
            "**Report** to those charged with governance, and consider whether reporting to a regulator is required or permitted",
            "**Consider withdrawal** where management or governance fail to take appropriate action",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The step candidates skip",
          md: "**Non-compliance affects the reliability of everything else.** If management has concealed a breach, their representations are less credible across the whole audit, and areas relying on their word need reassessment. That knock-on effect is worth a mark and is routinely omitted in favour of the disclosure question.",
        },
        {
          kind: "text",
          md: "On **reporting outward**, the default is that confidentiality prevents disclosure to third parties. It yields where there is a legal duty to report — money laundering being the clearest — or where reporting is permitted in the public interest, on which legal advice should be taken. And **withdrawal** is a last resort available where those charged with governance will not act: it does not discharge any reporting obligation that has already arisen.",
        },
      ],
      check: {
        q: "An auditor discovers material non-compliance that management refuses to disclose or correct, and those charged with governance support management. What follows?",
        options: [
          "Issue an unmodified opinion with an emphasis of matter",
          "Consider the effect on the opinion — a modification is likely if the financial statements are materially misstated — take legal advice, consider whether any reporting duty arises, and consider withdrawing from the engagement, which does not discharge obligations already triggered",
          "Report immediately to the police",
          "Resign without further action",
        ],
        correct: 1,
        explain:
          "Several strands run together: the opinion, legal advice, any reporting duty, and withdrawal as a last resort. An emphasis of matter cannot substitute for a modification where the statements are misstated, and resigning does not extinguish a reporting obligation that has already arisen.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying the auditor must test compliance with all laws.", fix: "Only laws with a direct effect on the amounts are audited; others get specified procedures." },
    { trap: "Confining the response to disclosure.", fix: "Non-compliance also undermines the reliability of management's representations elsewhere." },
    { trap: "Reporting to a regulator as a first step.", fix: "Confidentiality applies unless there is a legal duty or a permitted public interest disclosure — take legal advice." },
    { trap: "Treating withdrawal as the end of the matter.", fix: "It does not discharge reporting obligations already triggered." },
  ],
  keyTerms: [
    { term: "Direct effect laws", def: "Laws and regulations determining amounts reported in the financial statements, on which the auditor must obtain sufficient appropriate evidence of compliance." },
    { term: "Specified procedures", def: "Enquiry, inspection of regulatory correspondence and reading minutes, performed to help identify non-compliance with other laws that may materially affect the statements." },
  ],
  summary: [
    "Management complies; the auditor considers, at a depth depending on the category of law.",
    "Direct-effect laws are audited; other laws get specified procedures.",
    "Non-compliance undermines management's credibility across the whole audit.",
    "Withdrawal is a last resort and does not extinguish obligations already triggered.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes the two categories of law?", a: "Whether the law determines amounts reported in the financial statements directly, or affects them only through consequences such as fines, provisions or going concern." },
    { q: "What is the knock-on effect of discovered non-compliance?", a: "It reduces the reliability of management's representations, so other audit areas relying on them need reassessment." },
    { q: "When may the auditor report non-compliance to a third party?", a: "Where there is a legal duty to do so, or where disclosure is permitted in the public interest — on which legal advice should be taken." },
  ],
  furtherStudy: [
    "AAA-02 covers money laundering, the clearest case of an overriding legal duty to report.",
    "AAA-06 covers fraud, which frequently accompanies non-compliance.",
    "AAA-20 covers the effect on the auditor's opinion.",
  ],
}

export const AAA_TREE_AREA_A: StudyChapter[] = [AAA_TREE_01, AAA_TREE_02, AAA_TREE_03]
