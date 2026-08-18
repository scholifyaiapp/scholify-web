import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area B — professional and ethical considerations.
 *
 *   AAA-04  The Code, threats and safeguards   (B1a–d, f)
 *   AAA-05  Professional scepticism            (B1e, g)
 *   AAA-06  Fraud and error                    (B2)
 *   AAA-07  Professional liability             (B3)
 *
 * Section A draws predominantly on areas A to D, and the ethical requirement
 * within it is close to guaranteed — an exhibit describing the firm's other
 * relationships with the client, and a requirement asking for the threats and
 * the firm's response. AAA-04 is therefore written as a routine to run against
 * that exhibit rather than as a description of the Code.
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_04: StudyChapter = {
  paper: "AAA",
  id: "AAA-04",
  number: 4,
  area: "B",
  syllabusRefs: ["B1(a)", "B1(b)", "B1(c)", "B1(d)", "B1(f)"],
  title: "The Code, threats and safeguards",
  minutes: 18,
  intro:
    "An exhibit listing the firm's other work for the client, and a requirement asking about ethics. It appears nearly every sitting, and it rewards a routine.",
  outcomes: [
    "Explain the fundamental principles and the conceptual framework approach",
    "Identify and evaluate threats to compliance in a specific scenario",
    "Evaluate whether available safeguards are effective",
    "Advise on conflicts in the application of the fundamental principles",
    "Assess the ethical implications of providing non-audit services",
  ],
  sections: [
    {
      id: "the-routine",
      heading: "The routine to run against the exhibit",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Threat, why, evaluate, respond — for each issue separately",
          md: "**Name the threat**, **say what creates it**, **evaluate whether it is at an acceptable level**, and **state the firm's response**. Do all four for each issue in turn. Candidates lose most of the available marks by naming threats in a list and then giving one general paragraph about safeguards — the marks are allocated issue by issue, and the evaluation step is the one most often missing.",
        },
        {
          kind: "table",
          caption: "The threats, as they appear in an AAA exhibit",
          head: ["Threat", "What creates it", "Typical response"],
          rows: [
            ["Self-interest", "Fee dependence, overdue fees, a financial interest, a contingent fee, a loan to or from the client", "Reduce the interest; fee monitoring; independent review; for a significant financial interest, dispose of it or remove the individual"],
            ["Self-review", "Auditing the output of work the firm itself performed — valuations, tax computations, systems the firm designed", "Separate teams; independent review; for a listed client, generally decline the service"],
            ["Advocacy", "Representing the client in litigation or promoting its shares", "Generally decline; the threat cannot usually be reduced by procedure"],
            ["Familiarity", "Long association, a former partner joining the client, personal or family relationships", "Rotate the engagement partner and key staff; cooling-off before joining the client"],
            ["Intimidation", "Threatened removal, litigation against the firm, dominant management pressure", "Escalate internally; consult the audit committee; consider resignation"],
          ],
        },
        {
          kind: "text",
          md: "**Evaluation is where the marks concentrate.** A threat's significance depends on the scenario's facts: the size of the fee relative to the firm's income, whether the client is **listed or public interest**, the seniority of the person involved, and whether the amount is material to either party. A £5,000 shareholding held by an audit team member is a different problem from the same holding by an unrelated partner in another office, and saying so is the evaluation.",
        },
      ],
      check: {
        q: "An exhibit states that fees from one audit client represent 18% of the firm's total income, and the client is listed. What does a full-mark answer contain?",
        options: [
          "A statement that this creates a self-interest threat",
          "The self-interest threat, that it arises because the firm depends economically on retaining the client, an evaluation that the level is significant for a listed client where public interest heightens the concern, and specific responses — disclosing to those charged with governance, an independent pre-issuance review, and a plan to reduce dependence",
          "A recommendation to resign from the engagement",
          "A note that fee levels are a commercial matter for the firm",
        ],
        correct: 1,
        explain:
          "All four steps are present: the named threat, its cause, an evaluation that engages with the specific facts — the percentage and the listed status — and concrete responses. Naming the threat alone, as in option 0, typically earns a single mark of several available.",
      },
    },
    {
      id: "non-audit",
      heading: "Non-audit services",
      blocks: [
        {
          kind: "text",
          md: "The recurring scenario is the audit firm being offered additional work. The analysis turns on two questions: **does it create a self-review threat**, and **is the client a public interest entity**, for whom the restrictions are considerably tighter.",
        },
        {
          kind: "table",
          caption: "Services and the difficulty each creates",
          head: ["Service", "Threat", "Position"],
          rows: [
            ["Preparing the accounting records or financial statements", "Self-review", "Generally prohibited for a listed client; for others, only routine or mechanical work with safeguards"],
            ["Valuation with a material and subjective effect", "Self-review", "Generally not undertaken where the outcome would be audited"],
            ["Internal audit services", "Self-review, and management responsibility", "Restricted; the firm must not assume management responsibility or audit its own internal audit work"],
            ["Tax services", "Self-review and advocacy", "Compliance work is often acceptable; aggressive planning or representing the client in a dispute is not"],
            ["Recruiting senior management", "Familiarity and self-interest", "Not undertaken for key positions influencing the accounting records"],
            ["Designing financial systems", "Self-review", "Restricted where the system generates information material to the statements"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The line nobody may cross",
          md: "The firm must never **assume management responsibility** — making the decisions that are properly management's. That is not a threat to be safeguarded but a boundary: no amount of independent review makes it acceptable, because the firm would then be auditing its own decisions. Where a scenario has the firm being asked to select accounting policies, approve journal entries or take operational decisions, the answer is refusal rather than mitigation.",
        },
        {
          kind: "text",
          md: "Note also the **conflicts between principles** the syllabus mentions. Confidentiality can conflict with the public interest; objectivity can conflict with a client relationship the firm values commercially. Where they conflict, the resolution is to apply the conceptual framework, take advice — internally, from the professional body, or legally — document the reasoning, and where the conflict cannot be resolved, withdraw.",
        },
      ],
      check: {
        q: "An audit client asks the firm to determine which accounting policy to adopt for a new class of transaction. How should the firm respond?",
        options: [
          "Accept, with an independent review of the advice",
          "Decline to make the decision — selecting accounting policies is a management responsibility, and assuming it would leave the firm auditing its own decision. The firm may explain the available options and their implications so management can decide",
          "Accept, since technical advice is a normal part of the relationship",
          "Accept only if the fee is immaterial",
        ],
        correct: 1,
        explain:
          "Assuming management responsibility is a boundary rather than a threat to be safeguarded, so a review does not cure it. The workable course is to inform the decision without taking it — explaining the options and consequences while management chooses.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing threats without evaluating them.", fix: "Threat, cause, evaluation against the scenario's facts, then response — for each issue." },
    { trap: "Giving one general safeguards paragraph.", fix: "Marks are allocated issue by issue." },
    { trap: "Proposing safeguards for assuming management responsibility.", fix: "It is a boundary, not a threat — the answer is refusal." },
    { trap: "Ignoring whether the client is a public interest entity.", fix: "The restrictions are materially tighter, and that is usually why the fact is supplied." },
  ],
  keyTerms: [
    { term: "Conceptual framework approach", def: "Identifying threats to the fundamental principles, evaluating their significance, and applying safeguards to reduce them to an acceptable level." },
    { term: "Self-review threat", def: "The threat that the firm will evaluate the results of its own previous work when forming the audit opinion." },
    { term: "Management responsibility", def: "Decisions properly belonging to management, which the audit firm must never assume regardless of any safeguard." },
  ],
  summary: [
    "Name the threat, its cause, evaluate its significance, then state the response — issue by issue.",
    "Evaluation depends on the facts: fee size, listed status, seniority and materiality.",
    "Non-audit services turn on self-review and on whether the client is a public interest entity.",
    "Assuming management responsibility is a boundary that no safeguard cures.",
  ],
  knowledgeDiagnostic: [
    { q: "Which step of the ethics routine is most often missing?", a: "Evaluation — assessing whether the threat is at an acceptable level using the scenario's specific facts." },
    { q: "Why can a self-review threat not be cured by review where the firm assumed management responsibility?", a: "The firm would be auditing its own decision, which is a boundary rather than a threat capable of mitigation." },
    { q: "Why does listed or public interest status matter?", a: "The restrictions on non-audit services and on independence are materially tighter, so the same facts produce a different conclusion." },
  ],
  furtherStudy: [
    "AAA-05 covers professional scepticism, the principle these threats undermine in practice.",
    "AAA-10 covers acceptance decisions, where these threats are first evaluated.",
    "AAA-01 covers the audit committee's role in approving non-audit services.",
  ],
}

const AAA_TREE_05: StudyChapter = {
  paper: "AAA",
  id: "AAA-05",
  number: 5,
  area: "B",
  syllabusRefs: ["B1(e)", "B1(g)"],
  title: "Professional scepticism",
  minutes: 15,
  intro:
    "Named in the syllabus twice, and the single most common phrase in the examiner's reports. It is examined as evidence — what the auditor actually did — rather than as an attitude they claim to have held.",
  outcomes: [
    "Explain the importance of scepticism in planning and performing an audit",
    "Assess whether an engagement was performed with an attitude of scepticism",
    "Identify the evidence that demonstrates scepticism in the file",
    "Evaluate the implications where scepticism was insufficient",
    "Recognise the conditions that erode it",
  ],
  sections: [
    {
      id: "what-it-looks-like",
      heading: "What scepticism looks like in a file",
      blocks: [
        {
          kind: "text",
          md: "Scepticism is a questioning mind, alertness to conditions suggesting misstatement, and a critical assessment of evidence. Since none of that is directly observable, the syllabus asks candidates to **assess whether an engagement was performed with it** — which means looking for what the auditor did.",
        },
        {
          kind: "table",
          caption: "The evidence, and its absence",
          head: ["Sceptical", "Not sceptical"],
          rows: [
            ["Management's explanation corroborated independently", "Explanation accepted and recorded as the audit evidence"],
            ["Assumptions in an estimate challenged against external data", "Management's assumptions adopted because they are 'within a reasonable range'"],
            ["Contradictory evidence pursued to a resolution", "Contradictory evidence noted and left unresolved"],
            ["Sample extended where an error was found", "One error dismissed as isolated without testing that conclusion"],
            ["Documents inspected for authenticity where doubt exists", "Documents accepted at face value despite indicators"],
            ["Prior year approach reconsidered against this year's conditions", "Last year's programme rolled forward unchanged"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The single most examinable failure",
          md: "**Accepting management's explanation as audit evidence.** An explanation is a starting point that tells you what to corroborate; it is not evidence of the fact explained. Where a scenario shows a significant fluctuation explained by the finance director and the file recording that explanation as the conclusion, the audit has a scepticism deficiency and that is the finding.",
        },
      ],
      check: {
        q: "An audit file records that a 40% increase in revenue was explained by management as resulting from a new contract, and concludes the balance is reasonable. What is the deficiency?",
        options: [
          "The fluctuation should have been reported to those charged with governance",
          "Management's explanation has been treated as audit evidence — it identifies what to corroborate, so the auditor should have inspected the contract, tested the related transactions and confirmed the revenue was recognised in the right period",
          "Analytical procedures are not appropriate for revenue",
          "A 40% increase is not material",
        ],
        correct: 1,
        explain:
          "The explanation is a hypothesis to be tested, not a conclusion. Corroborating it with the contract and the underlying transactions is the sceptical step, and its absence is the classic scepticism failure the examiner tests.",
      },
    },
    {
      id: "what-erodes-it",
      heading: "What erodes scepticism",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "Conditions that reduce it, all of which appear in scenarios",
          items: [
            "**Long association** with the client, where familiarity makes challenge feel adversarial",
            "**Time and fee pressure**, where corroborating an explanation costs hours the budget does not have",
            "**A plausible and confident management team**, whose competence makes their assertions feel reliable",
            "**Prior clean audits**, which create an expectation that this year will be the same",
            "**Rolled-forward planning**, where last year's risk assessment is reused without reconsideration",
            "**Inexperienced staff** who lack the standing to challenge a finance director",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Fee pressure is the one to name explicitly",
          md: "Where a scenario mentions that the fee was reduced to win the tender, or that the engagement is running over budget, the examiner has planted a scepticism issue. Under-resourcing produces exactly the shortcuts above — accepting explanations, not extending samples, rolling forward programmes — and connecting the fee fact to the audit quality consequence is a strong observation most candidates miss.",
        },
        {
          kind: "text",
          md: "The **implications** where scepticism was insufficient run in three directions: the audit evidence may be insufficient, so the opinion is unsupported; the firm faces regulatory and litigation exposure; and the engagement partner and quality management processes have failed. An answer should reach all three rather than stopping at 'more work is needed'.",
        },
      ],
      check: {
        q: "A firm reduced its fee substantially to retain a client and the engagement subsequently ran over budget. What audit quality concern does this raise?",
        options: [
          "None — fee levels are a commercial decision",
          "Under-resourcing tends to produce the specific shortcuts that scepticism failures consist of: accepting explanations rather than corroborating them, not extending samples when errors are found, and rolling forward prior year programmes — so the sufficiency of the evidence obtained is in question",
          "Only that the firm's profitability is reduced",
          "That the client will expect a reduced fee permanently",
        ],
        correct: 1,
        explain:
          "The fee fact is supplied because it predicts the behaviour. Connecting commercial pressure to the specific ways scepticism erodes — and therefore to whether sufficient appropriate evidence was obtained — is the analysis the requirement wants.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing scepticism as an attitude.", fix: "Assess it from what the auditor did — corroboration, challenge, follow-up." },
    { trap: "Accepting management's explanation as evidence.", fix: "It tells you what to corroborate; corroboration is the evidence." },
    { trap: "Ignoring the fee or budget facts in an exhibit.", fix: "They predict under-resourcing and therefore scepticism failures." },
    { trap: "Concluding only that more work is needed.", fix: "Reach the opinion, the regulatory exposure and the quality management failure." },
  ],
  keyTerms: [
    { term: "Professional scepticism", def: "A questioning mind, alertness to conditions indicating possible misstatement, and critical assessment of audit evidence." },
    { term: "Corroboration", def: "Obtaining independent evidence supporting an explanation, without which the explanation is not audit evidence." },
  ],
  summary: [
    "Scepticism is assessed from what the auditor did, not from what they claim to have thought.",
    "Accepting management's explanation as evidence is the classic failure.",
    "Fee pressure, long association and rolled-forward planning all erode it.",
    "The implications reach the opinion, the firm's exposure and its quality management.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is a management explanation not audit evidence?", a: "It is an assertion about the fact in question; the evidence is the independent corroboration it points you toward." },
    { q: "What does a reduced fee in an exhibit usually signal?", a: "Under-resourcing, which produces the specific shortcuts that constitute a scepticism failure." },
    { q: "What three implications follow from insufficient scepticism?", a: "The evidence may be insufficient to support the opinion, the firm faces regulatory and litigation exposure, and the quality management process has failed." },
  ],
  furtherStudy: [
    "AAA-06 covers fraud, where scepticism is most heavily relied on.",
    "AAA-13 covers what constitutes sufficient appropriate evidence.",
    "AAA-08 covers the quality management processes that should detect these failures.",
  ],
}

const AAA_TREE_06: StudyChapter = {
  paper: "AAA",
  id: "AAA-06",
  number: 6,
  area: "B",
  syllabusRefs: ["B2"],
  title: "Fraud and error",
  minutes: 16,
  intro:
    "The gap between what the public expects of an auditor and what the auditor undertakes is at its widest here — and the standard's position is precise about where responsibility sits.",
  outcomes: [
    "Compare management's and the auditor's responsibilities for fraud and error",
    "Identify circumstances indicating a high risk of fraud or misstatement",
    "Develop an appropriate response to identified fraud risk",
    "Explain the rebuttable presumption regarding revenue recognition",
    "Explain the auditor's response where fraud is suspected or identified",
  ],
  sections: [
    {
      id: "responsibilities",
      heading: "Whose responsibility",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The distinction to state precisely",
          md: "**Preventing and detecting fraud is management's responsibility**, supported by those charged with governance. The **auditor** must obtain reasonable assurance on a different question: whether the statements as a whole are materially misstated, from **either** fraud or error. Which means fraud is squarely within the audit's objective, but only to the extent it produces material misstatement, and only to a level of reasonable rather than absolute assurance.",
        },
        {
          kind: "table",
          caption: "Why fraud is harder to detect than error",
          head: ["Feature", "Consequence for the audit"],
          rows: [
            ["It is deliberate", "Concealment is designed, so the usual indicators may be absent"],
            ["It may involve collusion", "Segregation of duties, the control the auditor relies on most, is defeated"],
            ["It may involve management", "Management override of controls can circumvent any system"],
            ["Documents may be falsified", "Documentary evidence, normally strong, becomes unreliable"],
            ["It may involve omission", "There is no transaction to test — the evidence is the absence of one"],
          ],
        },
        {
          kind: "text",
          md: "**Management override** deserves separate mention because it is the risk present in every audit. Controls are designed to constrain employees, and management can generally circumvent them — through unusual journal entries, biased estimates, or transactions outside the normal course of business. The standard therefore requires specific procedures on those three areas in every engagement, regardless of the risk assessment.",
        },
      ],
      check: {
        q: "How should the auditor's responsibility for fraud be stated?",
        options: [
          "The auditor is responsible for preventing and detecting fraud",
          "Management is responsible for prevention and detection; the auditor obtains reasonable assurance about whether the statements as a whole are materially misstated, from either fraud or error — so fraud is within the objective, but only where it causes material misstatement",
          "The auditor has no responsibility regarding fraud",
          "The auditor must detect all fraud that is material",
        ],
        correct: 1,
        explain:
          "The precise formulation matters because both overstating and understating the responsibility are wrong. Fraud is within the audit's objective, but bounded by materiality and by reasonable rather than absolute assurance — option 3 overstates it by promising detection.",
      },
    },
    {
      id: "risk-and-response",
      heading: "Risk indicators and the auditor's response",
      blocks: [
        {
          kind: "table",
          caption: "The fraud triangle, as it appears in an exhibit",
          head: ["Element", "Scenario indicators"],
          rows: [
            ["Incentive or pressure", "Profit-related bonuses, covenant thresholds, market expectations, a planned sale or listing, personal financial difficulty"],
            ["Opportunity", "Weak controls, dominant management, complex or unusual transactions, related party dealings, significant estimates"],
            ["Rationalisation", "A culture of aggressive targets, disregard for controls, disputes with the auditor over acceptable treatments"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The revenue presumption",
          md: "There is a **rebuttable presumption that fraud risks exist in revenue recognition**. So an answer identifying fraud risk should address revenue unless the scenario gives a reason it does not apply, and the response is to treat revenue recognition as a significant risk requiring specific procedures — cut-off testing, examination of unusual credits, and testing of journals affecting revenue.",
        },
        {
          kind: "list",
          style: "number",
          title: "Responding to identified fraud risk",
          items: [
            "Assign more experienced staff, and involve specialists where the risk is technical",
            "Increase the **unpredictability** of procedures — vary the timing, locations and items tested so management cannot anticipate them",
            "Emphasise professional scepticism in the team discussion, which the standard requires be held",
            "Perform the mandatory procedures on journals, estimates and unusual transactions",
            "Where fraud is suspected, discuss with the appropriate level of management — at least one level above those involved",
            "Where management or those charged with governance are implicated, take legal advice and consider withdrawal and any reporting duty",
          ],
        },
        {
          kind: "text",
          md: "**Unpredictability** is worth naming specifically because it is a response unique to fraud. Ordinary audit procedures are designed to be efficient and are therefore predictable; a management team that knows which locations are visited and which balances are tested can arrange matters accordingly. Varying that pattern deliberately is a fraud response and candidates rarely mention it.",
        },
      ],
      check: {
        q: "A client's directors receive a bonus dependent on reported profit exceeding a threshold, and profit is forecast to fall just short. What does this indicate and what should follow?",
        options: [
          "A going concern issue requiring disclosure",
          "A fraud risk: incentive is present and profit is close to a threshold, so there is pressure to manipulate. The response includes treating revenue recognition and estimates as significant risks, testing journals around the year end, applying unpredictability, and heightening scepticism over cut-off",
          "An ethical threat to the auditor's independence",
          "Nothing, since directors' bonuses are a normal arrangement",
        ],
        correct: 1,
        explain:
          "Incentive plus proximity to a threshold is the classic fraud risk pattern, and it points to specific responses rather than a general warning. Naming the procedures — cut-off, journals, estimates, unpredictability — is what converts identification into an audit response.",
      },
    },
  ],
  examTraps: [
    { trap: "Saying the auditor is responsible for detecting fraud.", fix: "Management prevents and detects; the auditor obtains reasonable assurance about whether the statements are materially misstated." },
    { trap: "Identifying fraud risk without a response.", fix: "Name the procedures — journals, estimates, cut-off, unpredictability, staffing." },
    { trap: "Omitting revenue recognition.", fix: "The presumption of fraud risk there is rebuttable, so address it or explain why it does not apply." },
    { trap: "Forgetting management override.", fix: "It is a risk in every audit, with mandatory procedures regardless of the assessment." },
  ],
  keyTerms: [
    { term: "Management override", def: "Management's ability to circumvent controls designed to constrain employees, present in every audit and requiring mandatory procedures." },
    { term: "Fraud triangle", def: "Incentive or pressure, opportunity and rationalisation — the three conditions typically present where fraud occurs." },
    { term: "Unpredictability", def: "Deliberately varying the timing, location and selection of procedures so that they cannot be anticipated — a response specific to fraud risk." },
  ],
  summary: [
    "Management prevents and detects; the auditor gives reasonable assurance about material misstatement from any cause.",
    "Fraud is harder to detect because it is concealed, may involve collusion, and may involve management.",
    "There is a rebuttable presumption of fraud risk in revenue recognition.",
    "Responses include journals, estimates, cut-off, experienced staff and unpredictability.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is management override a risk in every audit?", a: "Controls are designed to constrain employees, and management can generally circumvent them through journals, biased estimates and unusual transactions." },
    { q: "What is the presumption about revenue?", a: "That fraud risks exist in revenue recognition — rebuttable, but requiring the auditor to address it." },
    { q: "What is unpredictability and why is it a fraud response?", a: "Deliberately varying timing, locations and selections so management cannot anticipate the procedures, since ordinary efficient audit patterns are predictable." },
  ],
  furtherStudy: [
    "AAA-05 covers the scepticism that fraud detection depends on.",
    "AAA-11 covers risk assessment, where fraud risks are identified.",
    "AAA-03 covers the reporting consequences where non-compliance accompanies fraud.",
  ],
}

const AAA_TREE_07: StudyChapter = {
  paper: "AAA",
  id: "AAA-07",
  number: 7,
  area: "B",
  syllabusRefs: ["B3"],
  title: "Professional liability",
  minutes: 15,
  intro:
    "Who can sue the auditor, on what basis, and what the firm can legitimately do to limit the exposure — including the one thing that reduces it more than any contractual term.",
  outcomes: [
    "Identify the parties to whom the auditor may owe a duty of care",
    "Explain what a claimant must establish in a negligence claim",
    "Explain the significance of the expectation gap",
    "Advise on the ways a firm can restrict its liability",
    "Recognise that quality of work is the primary protection",
  ],
  sections: [
    {
      id: "duty-and-claim",
      heading: "Duty of care, and what a claimant must show",
      blocks: [
        {
          kind: "text",
          md: "The auditor owes a **contractual** duty to the client and a **duty of care in negligence** to those whom the law treats as sufficiently proximate. The second is deliberately narrow: an audit opinion is addressed to the members as a body for the purpose of their stewardship function, and courts have generally resisted extending liability to every person who might read the accounts and act on them.",
        },
        {
          kind: "table",
          caption: "What a claimant must establish",
          head: ["Element", "What it means"],
          rows: [
            ["A duty of care was owed", "Proximity between auditor and claimant, and reliance the auditor knew or ought to have anticipated for that purpose"],
            ["The duty was breached", "The work fell below the standard of a reasonably competent auditor — judged against the standards in force at the time"],
            ["Loss was suffered", "Actual, quantifiable financial loss"],
            ["The breach caused the loss", "The loss flowed from the negligent work rather than from the claimant's own decisions or market events"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Compliance with auditing standards is the firm's central defence",
          md: "The breach test is whether the work fell below that of a reasonably competent auditor, and the standards define that. So an audit performed and **documented** in accordance with them is very difficult to attack — which makes the working papers themselves the evidence. Work done but not documented is, for this purpose, work that cannot be proved.",
        },
      ],
      check: {
        q: "A bank lends to a company after reading its audited accounts, and the company fails. On what basis might a negligence claim against the auditor fail at the first hurdle?",
        options: [
          "Because banks cannot bring negligence claims",
          "Because no duty of care may be owed — the opinion is addressed to the members as a body for their stewardship purpose, and unless the auditor knew the accounts would be relied on by this bank for this transaction, the required proximity may be absent",
          "Because the loss was caused by the company's failure",
          "Because the bank should have obtained its own audit",
        ],
        correct: 1,
        explain:
          "Duty is the first element and the one most often decisive, since the courts have limited the class of claimants to those the auditor knew would rely on the work for a particular purpose. Causation, in option 2, is a later element and a separate argument.",
      },
    },
    {
      id: "managing-exposure",
      heading: "The expectation gap and managing exposure",
      blocks: [
        {
          kind: "text",
          md: "The **expectation gap** is the difference between what users believe an audit delivers and what it actually provides. Users commonly assume the auditor guarantees the accounts are correct, examines everything, and detects all fraud; the audit in fact provides reasonable assurance about material misstatement, on a sample basis, in accordance with standards.",
        },
        {
          kind: "table",
          caption: "How the gap is narrowed",
          head: ["Measure", "Effect"],
          rows: [
            ["The auditor's report describes responsibilities explicitly", "States what management is responsible for and what the auditor is"],
            ["Key audit matters", "Show what the auditor actually focused on, making the work visible"],
            ["Engagement letters", "Set the scope and responsibilities in writing with the client at the outset"],
            ["Education and public communication", "Addresses the underlying misunderstanding rather than its symptoms"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Ways a firm can restrict its exposure",
          items: [
            "**Engagement letters** setting scope, responsibilities and limitations clearly",
            "**Disclaimers** in reports intended for a restricted audience — stating for whom the report is prepared and that no duty is accepted to others",
            "**Liability limitation agreements**, where permitted by law and agreed with the client, sometimes subject to approval and to a fairness requirement",
            "**Incorporation or limited liability partnership status**, limiting individual partners' exposure",
            "**Professional indemnity insurance**, which does not reduce liability but funds it",
            "**Client and engagement acceptance procedures**, declining work whose risk exceeds the firm's appetite",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The protection that matters most is not contractual",
          md: "**Performing the work properly and documenting it.** Every measure above operates after something has gone wrong; quality of work prevents the claim. When a scenario asks how a firm can reduce its liability exposure, the strongest answer leads with quality management, staffing, review and documentation, and treats the contractual measures as secondary — which is also the honest answer.",
        },
      ],
      check: {
        q: "A firm asks how to reduce its exposure to negligence claims. What should lead the advice?",
        options: [
          "Liability limitation agreements with every client",
          "Doing the work properly and documenting it — the breach test is whether the work met the standard of a reasonably competent auditor, so quality management, appropriate staffing, review and complete working papers prevent claims, while contractual measures only limit them afterwards",
          "Professional indemnity insurance at the highest available level",
          "Restricting the client base to small entities",
        ],
        correct: 1,
        explain:
          "The contractual and insurance measures address the consequences of a claim; quality of work addresses whether there is one. Since the breach test is judged against the standards, an audit performed and documented in accordance with them is the firm's strongest position.",
      },
    },
  ],
  examTraps: [
    { trap: "Assuming a duty of care is owed to any reader of the accounts.", fix: "Proximity and known reliance for a purpose are required." },
    { trap: "Leading with liability caps and insurance.", fix: "Quality of work prevents claims; the rest only limits them." },
    { trap: "Treating undocumented work as performed.", fix: "For liability purposes, work that is not documented cannot be proved." },
    { trap: "Describing the expectation gap without saying how it is narrowed.", fix: "Report wording, key audit matters, engagement letters and education." },
  ],
  keyTerms: [
    { term: "Duty of care", def: "The legal obligation owed where sufficient proximity exists and the auditor knew or should have anticipated reliance for a particular purpose." },
    { term: "Expectation gap", def: "The difference between what users believe an audit provides and what it actually provides." },
    { term: "Liability limitation agreement", def: "An agreement with the client capping the auditor's liability, where permitted by law and subject to any approval and fairness requirements." },
  ],
  summary: [
    "A claimant must show duty, breach, loss and causation — duty is often decisive.",
    "Breach is judged against the standards, so compliance and documentation are the defence.",
    "The expectation gap is narrowed by report wording, key audit matters and engagement letters.",
    "Quality of work prevents claims; contractual measures only limit them.",
  ],
  knowledgeDiagnostic: [
    { q: "What four elements must a negligence claimant establish?", a: "That a duty of care was owed, that it was breached, that loss was suffered, and that the breach caused the loss." },
    { q: "Why are working papers central to defending a claim?", a: "Breach is judged against the standard of a reasonably competent auditor, and undocumented work cannot be proved to have been done." },
    { q: "What is the strongest way for a firm to reduce liability exposure?", a: "Performing and documenting the work properly, since that prevents claims rather than limiting them after the event." },
  ],
  furtherStudy: [
    "AAA-08 covers the quality management framework that delivers this protection.",
    "AAA-20 covers the auditor's report wording that addresses the expectation gap.",
    "AAA-10 covers acceptance procedures that decline unacceptable risk.",
  ],
}

export const AAA_TREE_AREA_B: StudyChapter[] = [AAA_TREE_04, AAA_TREE_05, AAA_TREE_06, AAA_TREE_07]
