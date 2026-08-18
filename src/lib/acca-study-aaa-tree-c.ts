import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area C — quality management and practice management.
 *
 *   AAA-08  Quality management at firm and engagement level (C1)
 *   AAA-09  Advertising, tendering and fees                 (C2)
 *   AAA-10  Professional appointments                       (C3)
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_08: StudyChapter = {
  paper: "AAA",
  id: "AAA-08",
  number: 8,
  area: "C",
  syllabusRefs: ["C1"],
  title: "Quality management at firm and engagement level",
  minutes: 17,
  intro:
    "The standards moved from quality control to quality management, and the change was not cosmetic — it replaced a checklist with a risk-based system the firm must design for its own circumstances.",
  outcomes: [
    "Explain what a firm's quality management system is made up of",
    "Explain the risk-based approach the current standards require",
    "Describe the engagement partner's responsibilities for quality",
    "Explain when an engagement quality review is required and what it covers",
    "Identify quality deficiencies in a scenario and recommend remedies",
  ],
  sections: [
    {
      id: "the-system",
      heading: "A risk-based system, not a checklist",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "What changed, and why it matters in an answer",
          md: "The previous approach specified controls every firm should have. The current standards require the firm to set **quality objectives**, identify and assess **quality risks** — the things that could stop those objectives being achieved — and design **responses** to them, then **monitor and remediate**. So the examinable answer is no longer 'the firm should have a policy on X'; it is that the firm's risk assessment failed to identify this risk, or its response to it was inadequate.",
        },
        {
          kind: "table",
          caption: "The components of the system",
          head: ["Component", "What it addresses"],
          rows: [
            ["The firm's risk assessment process", "Setting objectives, identifying quality risks, designing responses"],
            ["Governance and leadership", "Tone at the top, accountability for quality, resources committed to it"],
            ["Relevant ethical requirements", "Independence, and the processes that maintain it across the firm"],
            ["Acceptance and continuance", "Which clients and engagements the firm takes on and keeps"],
            ["Engagement performance", "Direction, supervision, review, consultation and differences of opinion"],
            ["Resources", "People, technology and intellectual resources — including whether staff are competent and sufficient"],
            ["Information and communication", "Within the firm, and with external parties including networks"],
            ["Monitoring and remediation", "Finding deficiencies, investigating root cause, and fixing them"],
          ],
        },
        {
          kind: "text",
          md: "**Root cause analysis** is the component candidates most often omit and the one the standard most emphasises. Finding that an engagement omitted a procedure is not the remedy; establishing **why** — inadequate staffing, unrealistic budget, insufficient training, an ineffective review — is what allows the fix to prevent recurrence. Recommending root cause analysis rather than 'remind staff of the requirement' is a strong answer.",
        },
      ],
      check: {
        q: "A monitoring review finds that several engagements omitted required procedures on accounting estimates. What is the appropriate response?",
        options: [
          "Issue a reminder to all staff about the requirements for estimates",
          "Perform root cause analysis to establish why it happened — staffing, budget pressure, training or ineffective review — and design a remedial response addressing that cause, since a reminder does not fix an underlying resourcing or supervision problem",
          "Remove the individuals responsible from future engagements",
          "Restrict the firm from auditing entities with significant estimates",
        ],
        correct: 1,
        explain:
          "A recurring deficiency across several engagements is a systemic signal rather than individual error, and the standard requires the cause to be investigated before remediation. A reminder addresses knowledge, which is rarely the actual cause.",
      },
    },
    {
      id: "engagement-level",
      heading: "Quality at engagement level",
      blocks: [
        {
          kind: "text",
          md: "The **engagement partner** takes overall responsibility for quality on the engagement, which means being sufficiently and appropriately involved throughout rather than only at the end. Their responsibilities include the team's competence and capacity, direction and supervision, review of the work, consultation on difficult matters, and forming the opinion.",
        },
        {
          kind: "table",
          caption: "Engagement quality reviews",
          head: ["Question", "Answer"],
          rows: [
            ["When required", "Listed entities, engagements the firm determines require one, and those required by law or regulation"],
            ["Who performs it", "A reviewer with sufficient competence, authority and time who is not part of the engagement team"],
            ["What it covers", "Significant judgements, significant risks, independence conclusions, matters consulted on, and the appropriateness of the report"],
            ["When it must be completed", "Before the report is dated — an unfinished review means the report cannot be issued"],
            ["What it is not", "A re-performance of the audit; it is a review of the significant judgements"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The timing point is examinable and easily missed",
          md: "The engagement quality review must be **completed before the auditor's report is dated**. A scenario describing a report already issued while the review is still in progress is describing a quality management failure with a direct consequence: the firm cannot demonstrate that the significant judgements were independently reviewed, and the report should not have been signed.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Deficiencies to recognise in a scenario",
          items: [
            "Inexperienced staff assigned to significant risk areas without adequate supervision",
            "The engagement partner's review confined to a final sign-off with no earlier involvement",
            "Consultation not sought on a difficult or contentious matter, or the conclusion not documented",
            "A difference of opinion within the team resolved informally without resolution being documented",
            "A quality review performed by someone connected to the engagement",
            "Budget pressure driving reduced testing rather than a reassessment of the fee",
          ],
        },
      ],
      check: {
        q: "An audit report for a listed client was signed while the engagement quality review remained incomplete. What is the consequence?",
        options: [
          "None, provided the review is completed shortly afterwards",
          "A quality management failure — the review must be completed before the report is dated, so the firm cannot demonstrate that the significant judgements were independently reviewed, and the report should not have been signed",
          "The review becomes unnecessary once the report is signed",
          "The reviewer should sign the report instead",
        ],
        correct: 1,
        explain:
          "The requirement is about sequence, not existence: the review exists to inform the decision to issue, so completing it afterwards cannot serve its purpose. For a listed client the review is mandatory, which makes the failure more serious.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing quality controls the firm should have.", fix: "The current standards are risk-based — say which quality risk was missed or inadequately addressed." },
    { trap: "Recommending a reminder to staff.", fix: "Perform root cause analysis; knowledge is rarely the actual cause." },
    { trap: "Treating the engagement quality review as a final formality.", fix: "It must be completed before the report is dated." },
    { trap: "Describing the partner's role as reviewing the file at the end.", fix: "Sufficient and appropriate involvement throughout the engagement." },
  ],
  keyTerms: [
    { term: "Quality risk", def: "A risk that a quality objective will not be achieved, which the firm must identify, assess and respond to under the risk-based approach." },
    { term: "Root cause analysis", def: "Investigation of why a deficiency occurred, so that remediation addresses the cause rather than the symptom." },
    { term: "Engagement quality review", def: "An objective evaluation of the significant judgements and the report by a reviewer outside the team, completed before the report is dated." },
  ],
  summary: [
    "Quality management is risk-based: objectives, quality risks, responses, monitoring and remediation.",
    "Root cause analysis is what makes remediation effective.",
    "The engagement partner must be involved throughout, not only at sign-off.",
    "The engagement quality review must be complete before the report is dated.",
  ],
  knowledgeDiagnostic: [
    { q: "What changed when quality control became quality management?", a: "A prescribed set of controls was replaced by a risk-based system the firm designs for its own circumstances — objectives, quality risks, responses, monitoring and remediation." },
    { q: "Why is a reminder to staff a weak remedial response?", a: "Recurring deficiencies usually stem from staffing, budget or supervision rather than knowledge, which is why root cause analysis comes first." },
    { q: "When must an engagement quality review be completed?", a: "Before the auditor's report is dated, since it exists to inform the decision to issue." },
  ],
  furtherStudy: [
    "AAA-10 covers acceptance and continuance, one of the system's components.",
    "AAA-07 covers the liability exposure quality management protects against.",
    "AAA-19 covers the engagement-level review at completion.",
  ],
}

const AAA_TREE_09: StudyChapter = {
  paper: "AAA",
  id: "AAA-09",
  number: 9,
  area: "C",
  syllabusRefs: ["C2"],
  title: "Advertising, tendering and fees",
  minutes: 14,
  intro:
    "Firms compete for work, and the ways they may do so are constrained — most sharply where the competition is on price.",
  outcomes: [
    "Explain the constraints on advertising and promotional activity",
    "Describe the tendering process and what a proposal should address",
    "Explain the risks of lowballing and how they are managed",
    "Explain the difficulties created by contingent and referral fees",
    "Advise on fee setting consistent with professional obligations",
  ],
  sections: [
    {
      id: "promotion-tender",
      heading: "Promotion and tendering",
      blocks: [
        {
          kind: "text",
          md: "Advertising is permitted, but it must not bring the profession into disrepute. It should be **honest and truthful**, must not make unsubstantiated claims about the firm's abilities, must not compare the firm with others in a disparaging way, and must not exaggerate the services offered.",
        },
        {
          kind: "table",
          caption: "What a tender proposal should cover",
          head: ["Element", "Why"],
          rows: [
            ["The firm's understanding of the client's business", "Demonstrates the proposal is specific rather than generic"],
            ["The proposed approach and timetable", "Shows the work has been thought through and can be delivered"],
            ["The engagement team and their relevant experience", "The client is buying people as much as a firm"],
            ["The fee and its basis", "Including what is included and what would be charged additionally"],
            ["Independence and any conflicts", "Identified before acceptance rather than afterwards"],
            ["Quality management and the firm's credentials", "Evidence the firm can deliver at the required standard"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "A tender is also an acceptance decision",
          md: "A firm tendering for work is deciding whether it **wants** the client, not only whether it can win them. The independence checks, the client's reputation and integrity, and whether the firm has the resources and competence all belong at this stage — because withdrawing after appointment is far more difficult and more damaging than declining to tender.",
        },
      ],
      check: {
        q: "A firm's promotional material claims it 'provides the highest quality audit in the sector'. What is the objection?",
        options: [
          "Advertising by audit firms is not permitted",
          "The claim is unsubstantiated and implicitly disparaging of other firms — promotional material must be honest and truthful and must not make unverifiable claims about the firm's abilities",
          "The material should state the fee",
          "Only listed firms may advertise",
        ],
        correct: 1,
        explain:
          "Advertising is permitted; the constraint is on its content. An unverifiable superiority claim fails both the truthfulness requirement and the prohibition on disparaging comparison, and it risks bringing the profession into disrepute.",
      },
    },
    {
      id: "fees",
      heading: "Fees, lowballing and contingency",
      blocks: [
        {
          kind: "text",
          md: "**Lowballing** is quoting a fee below the cost of performing the work, usually to win an audit in the expectation of recovering the margin later — through other services or through subsequent years. It is not prohibited in itself, and clients are entitled to competitive pricing. The difficulty is what it does afterwards.",
        },
        {
          kind: "table",
          caption: "The two problems with a lowballed fee",
          head: ["Problem", "Mechanism", "Response"],
          rows: [
            ["Audit quality", "The work is under-resourced, producing exactly the scepticism failures of AAA-05", "The firm must still perform the audit to the required standard whatever it charged — the fee is not a defence"],
            ["Self-interest threat", "The firm depends on recovering margin through other work or future increases, creating pressure not to challenge management", "Independent review, monitoring the fee relationship, and disclosure to those charged with governance"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The point the examiner is looking for",
          md: "A low fee does not reduce the required work. The firm remains obliged to obtain sufficient appropriate evidence and to comply with the standards, so the consequence of underpricing is borne by the firm's margin — not by the audit. Where a scenario shows a discounted fee and a reduced testing plan, the reduced testing is the finding.",
        },
        {
          kind: "text",
          md: "**Contingent fees** — calculated by reference to a transaction's outcome or the result of the work — create a self-interest threat and are **not acceptable for assurance engagements**. For non-assurance work they may be permissible with safeguards, provided the work does not feed into an assurance engagement the firm performs. **Referral fees** and commissions similarly create a self-interest threat and require disclosure to the client and appropriate safeguards.",
        },
      ],
      check: {
        q: "A firm wins an audit with a fee substantially below cost and instructs the team to reduce planned testing to fit the budget. What is the position?",
        options: [
          "This is acceptable, since the client agreed the fee",
          "The fee does not change what the audit requires — sufficient appropriate evidence must still be obtained, so cutting planned procedures to fit a budget is an audit quality failure and the shortfall falls on the firm's margin",
          "The firm should increase the fee mid-engagement",
          "The reduced testing is acceptable if the client is low risk",
        ],
        correct: 1,
        explain:
          "Pricing is a commercial decision; the required work is a professional obligation, and they are independent of each other. Where a scenario pairs a discounted fee with a reduced plan, the plan is the failure, and the firm bears the consequence of its pricing.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying lowballing is prohibited.", fix: "It is not; the problems are the resourcing consequence and the self-interest threat." },
    { trap: "Accepting reduced testing to fit a budget.", fix: "The fee does not change the evidence required." },
    { trap: "Treating a tender as purely commercial.", fix: "It is also an acceptance decision — independence, integrity, competence and resources." },
    { trap: "Allowing a contingent fee on assurance work.", fix: "Not acceptable; the self-interest threat cannot be safeguarded away." },
  ],
  keyTerms: [
    { term: "Lowballing", def: "Quoting an audit fee below the cost of performing the work, usually expecting to recover the margin through other services or later years." },
    { term: "Contingent fee", def: "A fee whose amount depends on how a transaction turns out, or on what the work concludes — not acceptable for assurance engagements." },
  ],
  summary: [
    "Advertising is permitted but must be truthful, substantiated and not disparaging.",
    "A tender is an acceptance decision as much as a commercial one.",
    "Lowballing is not prohibited, but the fee never reduces the work required.",
    "Contingent fees are unacceptable for assurance; referral fees need disclosure and safeguards.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a low fee not a defence to inadequate testing?", a: "The evidence required is set by the standards and the risk assessment, not by what the firm charged; underpricing falls on the firm's margin." },
    { q: "What two problems does lowballing create?", a: "Under-resourcing that produces scepticism failures, and a self-interest threat from depending on recovering the margin later." },
    { q: "Why are contingent fees unacceptable for assurance work?", a: "They tie the firm's income to the outcome it is supposed to report on objectively, which no safeguard cures." },
  ],
  furtherStudy: [
    "AAA-10 covers the acceptance decision a tender leads into.",
    "AAA-04 covers the self-interest threat fee arrangements create.",
    "AAA-05 covers the scepticism failures under-resourcing produces.",
  ],
}

const AAA_TREE_10: StudyChapter = {
  paper: "AAA",
  id: "AAA-10",
  number: 10,
  area: "C",
  syllabusRefs: ["C3"],
  title: "Professional appointments",
  minutes: 15,
  intro:
    "The cheapest risk management available to a firm is declining the wrong client. Everything after acceptance is more expensive.",
  outcomes: [
    "Explain the matters to consider before accepting a new client or engagement",
    "Describe the professional clearance process and its purpose",
    "Explain the contents and purpose of an engagement letter",
    "Explain continuance decisions and when a firm should resign",
    "Recognise the indicators that a client should be declined",
  ],
  sections: [
    {
      id: "acceptance",
      heading: "Before accepting",
      blocks: [
        {
          kind: "table",
          caption: "The acceptance checklist",
          head: ["Consideration", "The question"],
          rows: [
            ["Client integrity", "Who are the owners and management, what is their reputation, and why are they changing auditor?"],
            ["Independence", "Do any threats arise from existing relationships, and can they be managed?"],
            ["Competence", "Does the firm have the expertise for this industry and these transactions?"],
            ["Resources", "Are there enough suitably experienced people available at the right time of year?"],
            ["Money laundering", "Has customer due diligence been completed, including beneficial ownership?"],
            ["Risk", "Is this a high-risk engagement — listed, distressed, litigious, complex — and is that within the firm's appetite?"],
            ["Fee", "Can the work be performed properly at a fee the client will pay?"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Professional clearance, in two steps",
          md: "**Obtain the prospective client's permission** to contact the existing auditor, then **ask that auditor whether there is any professional reason not to accept**. If permission is refused, the firm should normally decline — the refusal is itself the information. If the existing auditor does not reply, the firm should follow up and, without a response, consider whether it can properly accept. Candidates typically state only the second step.",
        },
        {
          kind: "text",
          md: "The **reason for the change** is worth pursuing specifically. A client changing auditor after a disagreement over an accounting treatment, a modified opinion, or a fee dispute is telling you something about what the engagement will be like — and 'opinion shopping', where a client seeks a firm more likely to accept its preferred treatment, is a recognised risk that professional clearance exists to detect.",
        },
      ],
      check: {
        q: "A prospective audit client's previous auditor resigned after a disagreement about revenue recognition. What should this mean for the acceptance decision?",
        options: [
          "Nothing — disagreements between auditors and clients are common",
          "It is a significant indicator: the client may be seeking an auditor more likely to accept its preferred treatment, so the firm should establish the substance of the disagreement through clearance, assess management's integrity, and decline unless satisfied it could reach an independent conclusion",
          "The firm should accept and adopt the previous auditor's position",
          "The firm should accept but issue a modified opinion",
        ],
        correct: 1,
        explain:
          "Opinion shopping is precisely what the clearance process exists to detect, and the disagreement's substance determines whether the client is acceptable. Pre-committing to an opinion, as options 2 and 3 suggest, would abandon independence before the work has started.",
      },
    },
    {
      id: "letter-continuance",
      heading: "The engagement letter, continuance and resignation",
      blocks: [
        {
          kind: "text",
          md: "The **engagement letter** records the terms agreed and, in doing so, narrows the expectation gap with the client at the outset. It should set out the objective and scope of the audit, the auditor's responsibilities, **management's responsibilities**, the applicable reporting framework, the expected form of the report, the fee basis, and any inherent limitations.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Management's responsibilities are the important half",
          md: "The letter's most useful content is what **management** undertakes: to prepare the financial statements, to maintain internal control, and to provide the auditor with access, information and unrestricted people. When a scenario has management restricting the auditor's access, the engagement letter is what establishes that the restriction is a breach of an agreed term rather than a negotiation.",
        },
        {
          kind: "table",
          caption: "Continuance and resignation",
          head: ["Situation", "Response"],
          rows: [
            ["Client's risk profile has deteriorated", "Reassess at continuance; consider additional procedures, a different team, or declining"],
            ["Independence has been compromised and cannot be safeguarded", "Resign — the opinion could not be relied on"],
            ["Management integrity is in doubt", "Consider resignation; representations become unreliable across the audit"],
            ["A limitation on scope is imposed", "Seek removal of the limitation; if refused, consider the effect on the opinion and whether to resign"],
            ["Fees remain unpaid", "A self-interest threat resembling a loan; consider whether the firm can continue"],
          ],
        },
        {
          kind: "text",
          md: "Resignation is not a clean exit. The firm must consider its **duties on ceasing to hold office**, including any statutory statement of circumstances, communication with those charged with governance, and any obligation to respond to the incoming auditor. And resigning does not discharge obligations already triggered — a money laundering report, for instance, remains required.",
        },
      ],
      check: {
        q: "Management refuses the auditor access to certain records during the audit. Why does the engagement letter matter here?",
        options: [
          "It sets out the fee, so additional work can be charged",
          "It records management's agreed responsibility to provide unrestricted access to information and people, so the refusal is a breach of an agreed term rather than a matter for negotiation — and it supports escalation to those charged with governance",
          "It limits the auditor's liability for the missing records",
          "It allows the auditor to resign without notice",
        ],
        correct: 1,
        explain:
          "Recording management's responsibilities in advance is what converts an access dispute from a bargaining position into a breach. It also underpins escalation to the audit committee and, ultimately, the scope limitation analysis for the opinion.",
      },
    },
  ],
  examTraps: [
    { trap: "Omitting the client's permission from professional clearance.", fix: "Permission first, then the enquiry — and refusal is itself decisive." },
    { trap: "Ignoring why the client is changing auditor.", fix: "Opinion shopping is what clearance exists to detect." },
    { trap: "Describing the engagement letter as the auditor's responsibilities only.", fix: "Management's undertakings are the more useful half." },
    { trap: "Treating resignation as a clean exit.", fix: "Duties on ceasing to hold office continue, and prior obligations survive." },
  ],
  keyTerms: [
    { term: "Professional clearance", def: "Obtaining the prospective client's permission to contact the existing auditor and asking whether there is any professional reason not to accept." },
    { term: "Opinion shopping", def: "Seeking an auditor more likely to accept the client's preferred accounting treatment, which clearance is designed to detect." },
    { term: "Engagement letter", def: "The written terms of the engagement, recording scope, the responsibilities of both parties, the reporting framework and the fee basis." },
  ],
  summary: [
    "Declining the wrong client is the cheapest risk management available.",
    "Clearance is two steps, and a refusal of permission is itself the answer.",
    "The engagement letter's most useful content is management's undertakings.",
    "Resignation carries continuing duties and does not discharge prior obligations.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two steps of professional clearance?", a: "Obtaining the client's permission to contact the existing auditor, then asking that auditor whether there is any reason not to accept." },
    { q: "Why does the reason for a change of auditor matter?", a: "A change following a disagreement may indicate opinion shopping, and tells the firm what the engagement is likely to involve." },
    { q: "Why is management's agreed responsibility for access important?", a: "It makes a refusal of access a breach of an agreed term, supporting escalation and the scope limitation analysis." },
  ],
  furtherStudy: [
    "AAA-08 covers acceptance and continuance as a component of quality management.",
    "AAA-02 covers the customer due diligence acceptance requires.",
    "AAA-20 covers the opinion consequences where a scope limitation persists.",
  ],
}

export const AAA_TREE_AREA_C: StudyChapter[] = [AAA_TREE_08, AAA_TREE_09, AAA_TREE_10]
