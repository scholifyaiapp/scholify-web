import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area E — completion, review and reporting.
 *
 *   AAA-18  Subsequent events and going concern      (E1)
 *   AAA-19  Completion and final review              (E2)
 *   AAA-20  The auditor's report and the opinion     (E3)
 *   AAA-21  Reports to those charged with governance (E4)
 *
 * The syllabus notes that Section A may draw on any area EXCEPT E, because the
 * case study is set at the planning stage. Area E is therefore Section B
 * territory — and Section B questions on reporting are among the most
 * predictable in the paper, since the opinion decision has a finite number of
 * outcomes and a decision rule that produces them.
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_18: StudyChapter = {
  paper: "AAA",
  id: "AAA-18",
  number: 18,
  area: "E",
  syllabusRefs: ["E1"],
  title: "Subsequent events and going concern",
  minutes: 17,
  intro:
    "Two topics that share a date. The auditor's responsibility runs to the day the report is signed, and both of these decide what the accounts must say before it is.",
  outcomes: [
    "Distinguish adjusting from non-adjusting events and apply the distinction",
    "Explain the auditor's responsibilities in each period around the report date",
    "Evaluate management's going concern assessment",
    "Determine the reporting consequences of a material uncertainty",
    "Determine the consequences where the going concern basis is inappropriate",
  ],
  sections: [
    {
      id: "subsequent-events",
      heading: "Subsequent events",
      blocks: [
        {
          kind: "table",
          caption: "The two types",
          head: ["", "Adjusting", "Non-adjusting"],
          rows: [
            ["Definition", "Provides evidence of a condition existing at the reporting date", "Concerns a condition arising after the reporting date"],
            ["Treatment", "Adjust the amounts in the financial statements", "Disclose if material — do not adjust"],
            ["Examples", "A receivable's insolvency confirming irrecoverability; settlement of a court case; inventory sold below cost", "A fire after the year end; a share issue; an acquisition announced after the date"],
            ["The test", "Did the condition exist at the reporting date?", ""],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three periods, three different duties",
          md: "**Up to the date of the report**: the auditor must perform procedures to identify subsequent events. **After the report but before the statements are issued**: no obligation to search, but if a fact comes to light that would have changed the report, the auditor must act. **After issue**: the same — no duty to search, but a duty to act on a fact discovered. The shift from an **active duty to search** to a **duty to respond** is the examinable structure.",
        },
        {
          kind: "text",
          md: "Where a fact is discovered after the report has been issued and the statements require amendment, the auditor discusses it with management, and if they refuse to amend, takes action to prevent reliance on the report — including notifying those charged with governance and, where necessary, taking legal advice. That escalation is the answer the requirement is looking for, rather than a general statement that the matter is serious.",
        },
      ],
      check: {
        q: "A month after the year end, a major customer entered administration owing a material balance that was outstanding at the reporting date. How should this be treated?",
        options: [
          "Disclosed as a non-adjusting event, since the administration occurred after the year end",
          "As an adjusting event — the customer's financial difficulties existed at the reporting date and the administration provides evidence of that condition, so the receivable should be written down in the financial statements",
          "Ignored, since it occurred after the reporting date",
          "Disclosed only if the auditor's report has not yet been signed",
        ],
        correct: 1,
        explain:
          "The test is whether the underlying condition existed at the reporting date, not when the event became visible. Insolvency proceedings a month later almost always evidence a condition already present, which makes it adjusting rather than merely disclosable.",
      },
    },
    {
      id: "going-concern",
      heading: "Going concern",
      blocks: [
        {
          kind: "text",
          md: "Management assesses whether the going concern basis is appropriate; the auditor evaluates that assessment, considers whether a **material uncertainty** exists, and concludes on the adequacy of disclosure. The examinable structure is that the outcome depends on two questions in sequence.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The going concern decision",
            data: {
              steps: [
                { label: "Is the basis appropriate?", sub: "If not — adverse opinion, whatever the disclosure" },
                { label: "Is there a material uncertainty?", sub: "If not — unmodified opinion" },
                { label: "Is it adequately disclosed?", sub: "If yes — unmodified opinion with a material uncertainty section" },
                { label: "If not disclosed adequately", sub: "Qualified or adverse opinion for material misstatement" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction candidates collapse",
          md: "A **material uncertainty adequately disclosed** produces an **unmodified opinion** with a separate *Material Uncertainty Related to Going Concern* section. The opinion is not qualified — the accounts are right, and the section draws attention to a disclosure that is already there. It is only where the disclosure is **inadequate** that the opinion itself is modified. Getting this wrong is the single most common reporting error in the paper.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Procedures on the assessment",
          items: [
            "Obtain and evaluate management's cash flow forecast — testing the arithmetic, the assumptions and the sensitivity to reasonable changes",
            "Compare prior forecasts with actual outcomes, to assess management's forecasting reliability",
            "Inspect borrowing facilities: amounts, expiry dates, covenants and headroom",
            "Read board minutes and correspondence with lenders for evidence of renegotiation or withdrawal",
            "Review post year-end management accounts and trading to the date of the report",
            "Obtain written representations on management's plans and their feasibility",
            "Consider whether the assessment covers a sufficient period from the date the statements are approved",
          ],
        },
      ],
      check: {
        q: "A company faces significant going concern doubt, and its financial statements disclose the uncertainty fully and appropriately. What opinion should be issued?",
        options: [
          "A qualified opinion because of the uncertainty",
          "An unmodified opinion, with a separate Material Uncertainty Related to Going Concern section drawing attention to the disclosure — the accounts are not misstated, so the opinion is not modified",
          "An adverse opinion",
          "A disclaimer of opinion",
        ],
        correct: 1,
        explain:
          "Adequate disclosure means the financial statements give a true and fair view, so there is nothing to qualify. The dedicated section highlights the uncertainty without impugning the accounts, and confusing the two is the most frequent reporting error at this level.",
      },
    },
  ],
  examTraps: [
    { trap: "Classifying by when the event occurred.", fix: "The test is whether the underlying condition existed at the reporting date." },
    { trap: "Qualifying the opinion for a disclosed going concern uncertainty.", fix: "Unmodified opinion with a material uncertainty section." },
    { trap: "Assuming a duty to search for events after the report date.", fix: "The duty becomes one of responding to facts that come to light." },
    { trap: "Evaluating a forecast without testing assumptions.", fix: "Test the assumptions and the sensitivity, and compare prior forecasts with outcomes." },
  ],
  keyTerms: [
    { term: "Adjusting event", def: "A subsequent event providing evidence of a condition that existed at the reporting date, requiring the amounts to be adjusted." },
    { term: "Material uncertainty related to going concern", def: "An uncertainty that may cast significant doubt on the ability to continue, reported in a dedicated section where adequately disclosed." },
  ],
  summary: [
    "Adjusting events evidence a condition already existing; non-adjusting events are disclosed.",
    "The duty to search runs to the report date; afterwards it is a duty to respond.",
    "Basis inappropriate means adverse; uncertainty disclosed means unmodified with a dedicated section.",
    "Inadequate disclosure of the uncertainty modifies the opinion for misstatement.",
  ],
  knowledgeDiagnostic: [
    { q: "What determines whether a subsequent event is adjusting?", a: "Whether the condition it evidences existed at the reporting date — not when the event itself occurred." },
    { q: "What opinion follows an adequately disclosed material uncertainty?", a: "Unmodified, with a separate Material Uncertainty Related to Going Concern section." },
    { q: "What is the consequence where the going concern basis is inappropriate?", a: "An adverse opinion, because the statements are prepared on a fundamentally wrong basis however well the position is disclosed." },
  ],
  furtherStudy: [
    "AAA-20 covers the reporting outcomes this chapter's decisions feed into.",
    "AAA-12 covers identifying going concern risk at the planning stage.",
    "AAA-19 covers the final review in which these matters are evaluated.",
  ],
}

const AAA_TREE_19: StudyChapter = {
  paper: "AAA",
  id: "AAA-19",
  number: 19,
  area: "E",
  syllabusRefs: ["E2"],
  title: "Completion and final review",
  minutes: 16,
  intro:
    "The point at which the audit stops gathering and starts concluding — and the stage where an audit that has done good work can still reach the wrong answer.",
  outcomes: [
    "Evaluate the sufficiency and appropriateness of the evidence obtained overall",
    "Accumulate and evaluate uncorrected misstatements",
    "Perform final analytical procedures and explain their purpose",
    "Explain the overall review of the financial statements",
    "Explain the matters requiring evaluation before the opinion is formed",
  ],
  sections: [
    {
      id: "misstatements",
      heading: "Evaluating uncorrected misstatements",
      blocks: [
        {
          kind: "text",
          md: "Misstatements found during the audit are accumulated rather than dealt with individually, and evaluated **in aggregate** at completion. Management is asked to correct them; where they decline, the auditor must decide whether what remains is material.",
        },
        {
          kind: "table",
          caption: "The evaluation",
          head: ["Step", "What it involves"],
          rows: [
            ["Accumulate", "All misstatements identified, other than those clearly trivial"],
            ["Request correction", "Ask management to correct; a refusal is itself informative about their attitude"],
            ["Consider the aggregate", "Against materiality — individually immaterial items may be material together"],
            ["Consider qualitative factors", "Items affecting covenants, bonuses, a trend, or turning a profit into a loss are material by nature"],
            ["Consider offsetting", "An understatement and an overstatement do not simply cancel — the offsetting must be appropriate"],
            ["Reassess materiality", "Whether the figure set at planning remains appropriate given the actual results"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Uncorrected misstatements are evidence about management",
          md: "A management team refusing to correct known errors, particularly ones that all run in the same direction, is displaying **bias** — and that has consequences beyond the numbers. It affects the reliability of their representations, indicates a fraud risk, and must be communicated to those charged with governance. Reaching that conclusion, rather than only totalling the schedule, is the answer the requirement wants.",
        },
      ],
      check: {
        q: "Several individually immaterial misstatements are uncorrected, all overstating profit, and together they approach materiality. What follows?",
        options: [
          "Nothing, since each is individually immaterial",
          "The aggregate must be evaluated against materiality, and the fact that all run in the same direction indicates management bias — which affects the reliability of representations, indicates a fraud risk, and must be reported to those charged with governance",
          "The misstatements should be netted against any understatements found",
          "Materiality should be raised so the aggregate falls below it",
        ],
        correct: 1,
        explain:
          "The aggregate is what matters for the opinion, and the direction is what matters for the assessment of management. Raising materiality to accommodate the errors — option 3 — would be manipulating the audit's own threshold to avoid its conclusion.",
      },
    },
    {
      id: "final-review",
      heading: "The final review",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "What completion involves",
          items: [
            "**Final analytical procedures** — reading the statements as a whole and asking whether they make sense given what the audit has learned about the business",
            "**Evaluation of sufficiency** — whether enough appropriate evidence has been obtained on each significant risk",
            "**Review of the financial statements** for compliance with the reporting framework, including presentation and disclosure",
            "**Consideration of going concern** and subsequent events to the report date",
            "**Written representations** obtained, dated as near as practicable to the report",
            "**Engagement partner review**, and the engagement quality review where required, completed before the report is dated",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Final analytical procedures have a different purpose",
          md: "At planning they identify risks; at completion they test whether the statements, read as a whole, **fit what the auditor has come to understand about the business**. A relationship that still looks wrong after all the detailed work has been done is a signal that something has been missed — and that is what the procedure is for. It is not a repeat of the planning exercise.",
        },
        {
          kind: "text",
          md: "The **overall conclusion** is the point of all of it: whether sufficient appropriate evidence has been obtained to support an opinion, and whether, taken as a whole, the statements are materially misstated. Where the answer is no, the response is either more work or a modified opinion — never a note in the file recording the doubt.",
        },
      ],
      check: {
        q: "What is the purpose of analytical procedures performed at the completion stage?",
        options: [
          "To identify risks of material misstatement for the audit plan",
          "To assess whether the financial statements as a whole sit consistently with what the auditor now understands about the business gained during the audit — a relationship still looking wrong at this stage signals something may have been missed",
          "To recalculate the ratios disclosed in the accounts",
          "To satisfy a documentation requirement",
        ],
        correct: 1,
        explain:
          "The same technique serves a different purpose at each end of the audit. At completion the auditor knows the business, so an unexplained relationship is far more significant than it would have been at planning — it suggests the detailed work has not caught something.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating misstatements individually.", fix: "They are accumulated and evaluated in aggregate." },
    { trap: "Ignoring the direction of uncorrected misstatements.", fix: "Same-direction errors indicate bias, with consequences beyond the numbers." },
    { trap: "Repeating the planning analytics at completion.", fix: "The purpose is consistency with what the audit has learned." },
    { trap: "Recording doubt in the file instead of resolving it.", fix: "More work or a modified opinion — those are the options." },
  ],
  keyTerms: [
    { term: "Uncorrected misstatements", def: "Misstatements accumulated during the audit that management has declined to correct, evaluated in aggregate against materiality." },
    { term: "Final analytical procedures", def: "Procedures at completion testing whether the statements as a whole sit consistently with what the auditor now understands about the business." },
  ],
  summary: [
    "Accumulate misstatements and evaluate them in aggregate, with qualitative factors.",
    "Same-direction uncorrected errors evidence management bias.",
    "Final analytics test consistency with what the audit has learned, not risk.",
    "The conclusion is sufficiency of evidence — more work or a modified opinion, never a noted doubt.",
  ],
  knowledgeDiagnostic: [
    { q: "Why are misstatements evaluated in aggregate?", a: "Individually immaterial errors can be material together, and that combined effect determines the opinion." },
    { q: "What does a pattern of same-direction uncorrected misstatements indicate?", a: "Management bias, which affects the reliability of representations and indicates a fraud risk." },
    { q: "How do completion analytics differ from planning analytics?", a: "They test whether the statements are consistent with the understanding the audit has produced, rather than identifying risks to plan for." },
  ],
  furtherStudy: [
    "AAA-20 covers forming the opinion this review concludes toward.",
    "AAA-08 covers the engagement quality review completed at this stage.",
    "AAA-15 covers estimate bias, which the misstatement pattern often reveals.",
  ],
}

const AAA_TREE_20: StudyChapter = {
  paper: "AAA",
  id: "AAA-20",
  number: 20,
  area: "E",
  syllabusRefs: ["E3"],
  title: "The auditor's report and the opinion",
  minutes: 18,
  intro:
    "A finite set of outcomes reached by a decision rule with two questions. Learn the rule and reporting questions become the most predictable marks on the paper.",
  outcomes: [
    "Describe the elements of the auditor's report",
    "Apply the decision rule determining the type of opinion",
    "Distinguish a qualified opinion from an adverse opinion and a disclaimer",
    "Distinguish emphasis of matter from other matter paragraphs and from key audit matters",
    "Draft the reporting consequence of a scenario",
  ],
  sections: [
    {
      id: "the-rule",
      heading: "The decision rule",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Two questions, in this order",
          md: "**First: what is the problem?** Either the financial statements are **materially misstated**, or the auditor could not obtain **sufficient appropriate evidence**. **Second: how bad is it?** Either **material**, or **material and pervasive**. Those two answers produce the opinion, and no other information is needed.",
        },
        {
          kind: "table",
          caption: "The four outcomes",
          head: ["", "Material", "Material and pervasive"],
          rows: [
            ["Financial statements are misstated", "Qualified opinion — 'except for'", "Adverse opinion — the statements do not give a true and fair view"],
            ["Unable to obtain sufficient evidence", "Qualified opinion — 'except for'", "Disclaimer of opinion — the auditor does not express an opinion"],
          ],
        },
        {
          kind: "text",
          md: "**Pervasive** means the effect is not confined to specific elements — it affects a substantial proportion of the statements, or the item concerned is fundamental to users' understanding. A single overstated balance, however large, is usually material rather than pervasive; a failure to consolidate a major subsidiary, or an inappropriate going concern basis, is pervasive because it affects everything.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The word to justify",
          md: "Marks are awarded for **justifying** the classification, not for naming the opinion. Say why the matter is material — usually by comparing it to materiality — and then why it is or is not pervasive. An answer stating 'this requires a qualified opinion' without that reasoning earns a fraction of what is available.",
        },
      ],
      check: {
        q: "A parent has not consolidated a material subsidiary. What opinion follows and why?",
        options: [
          "A qualified opinion, since one subsidiary is affected",
          "An adverse opinion — the omission affects every primary statement and the group accounts do not represent the group at all, so the misstatement is both material and pervasive",
          "A disclaimer of opinion",
          "An unmodified opinion with an emphasis of matter",
        ],
        correct: 1,
        explain:
          "The problem is a misstatement rather than a lack of evidence, and its effect runs through the whole of the group statements rather than being confined to one line. That combination is exactly what pervasive means, and it produces an adverse opinion.",
      },
    },
    {
      id: "paragraphs",
      heading: "The paragraphs, and what each is not",
      blocks: [
        {
          kind: "table",
          caption: "Three things that are not modifications",
          head: ["Paragraph", "Used for", "Key point"],
          rows: [
            ["Key audit matters", "The matters of most significance in the audit", "Required for listed entities; describes what the auditor did and why the matter was significant — never a substitute for a modification"],
            ["Emphasis of matter", "A matter properly presented or disclosed that is fundamental to users' understanding", "The accounts are correct; it directs attention to something already in them"],
            ["Other matter", "A matter not presented in the statements but relevant to users' understanding of the audit or the report", "Concerns the audit or the auditor's responsibilities rather than the accounts"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The error the examiner reliably sets",
          md: "**An emphasis of matter cannot cure a misstatement.** If the accounts are wrong, the opinion must be modified; drawing attention to the wrongness is not a substitute. Similarly, a key audit matter describes the audit work — it is not a way of flagging a disagreement. Where a scenario has management refusing to correct a material error and the audit team proposing an emphasis of matter, that proposal is the finding.",
        },
        {
          kind: "text",
          md: "The **elements of the report** are worth knowing in order: title; addressee; the **opinion section first**, which is a deliberate change so users see the conclusion immediately; the basis for opinion; going concern where relevant; key audit matters; other information; responsibilities of management and of those charged with governance; the auditor's responsibilities; the engagement partner's name for listed entities; signature, date and address.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The date is not administrative",
          md: "The report is dated no earlier than the date the auditor obtained sufficient appropriate evidence, which includes evidence that the statements have been **approved** by those with authority. It cannot be dated before the engagement quality review is complete, and it fixes the end of the auditor's active duty to search for subsequent events. A scenario giving an odd sequence of dates is testing exactly this.",
        },
      ],
      check: {
        q: "Management refuses to correct a material misstatement, and the audit team proposes to add an emphasis of matter paragraph instead of modifying the opinion. What is wrong?",
        options: [
          "Nothing, provided the paragraph describes the matter clearly",
          "An emphasis of matter is only for a matter properly presented in the financial statements — it cannot substitute for a modification where the statements are materially misstated, so a qualified or adverse opinion is required",
          "An other matter paragraph should be used instead",
          "The matter should be reported only to those charged with governance",
        ],
        correct: 1,
        explain:
          "The paragraphs that are not modifications exist to draw attention to correct information, so using one to flag an error misrepresents the position. Where the accounts are wrong the opinion itself must reflect it, and the pervasiveness test then decides between qualified and adverse.",
      },
    },
  ],
  examTraps: [
    { trap: "Naming the opinion without justifying material and pervasive.", fix: "Those two judgements are where the marks are." },
    { trap: "Using an emphasis of matter to flag a misstatement.", fix: "It is only for matters correctly presented in the accounts." },
    { trap: "Confusing a disclaimer with an adverse opinion.", fix: "Disclaimer follows a lack of evidence; adverse follows misstatement." },
    { trap: "Treating the report date as administrative.", fix: "It requires evidence obtained and statements approved, and it fixes the subsequent events duty." },
  ],
  keyTerms: [
    { term: "Pervasive", def: "An effect not confined to specific elements — affecting a substantial proportion of the statements, or concerning something fundamental to users' understanding." },
    { term: "Emphasis of matter", def: "A paragraph drawing attention to a matter properly presented in the financial statements that is fundamental to users' understanding." },
    { term: "Key audit matter", def: "A matter of most significance in the audit, described with the auditor's response — required for listed entities and never a substitute for a modification." },
  ],
  summary: [
    "Two questions: misstatement or lack of evidence, and material or material and pervasive.",
    "Qualified, adverse and disclaimer follow from those two answers.",
    "Emphasis of matter, other matter and key audit matters are not modifications.",
    "The report date requires evidence obtained, statements approved and any quality review complete.",
  ],
  knowledgeDiagnostic: [
    { q: "What two questions determine the opinion?", a: "Whether the problem is a misstatement or an inability to obtain evidence, and whether the effect is material or material and pervasive." },
    { q: "When is a disclaimer appropriate rather than an adverse opinion?", a: "Where the auditor could not obtain sufficient appropriate evidence and the possible effect is pervasive — adverse follows an actual pervasive misstatement." },
    { q: "Why can an emphasis of matter not fix a misstatement?", a: "It draws attention to information properly presented; where the statements are wrong the opinion itself must be modified." },
  ],
  furtherStudy: [
    "AAA-18 covers the going concern outcomes that feed this decision.",
    "AAA-21 covers what is reported to those charged with governance alongside the report.",
    "AAA-19 covers the evaluation of misstatements that determines materiality.",
  ],
}

const AAA_TREE_21: StudyChapter = {
  paper: "AAA",
  id: "AAA-21",
  number: 21,
  area: "E",
  syllabusRefs: ["E4"],
  title: "Reports to those charged with governance and management",
  minutes: 14,
  intro:
    "The communication nobody outside the company sees, and often the most useful thing the audit produces for the people running it.",
  outcomes: [
    "Explain what must be communicated to those charged with governance",
    "Distinguish that communication from the report to management",
    "Explain the content and purpose of a report on deficiencies in internal control",
    "Describe deficiencies effectively, with consequence and recommendation",
    "Explain the timing and form these communications take",
  ],
  sections: [
    {
      id: "what-and-to-whom",
      heading: "What is communicated, and to whom",
      blocks: [
        {
          kind: "table",
          caption: "The two communications",
          head: ["", "To those charged with governance", "To management"],
          rows: [
            ["Recipient", "The audit committee or board — those with oversight responsibility", "Operational management, at an appropriate level of responsibility"],
            ["Content", "Auditor's responsibilities; planned scope and timing; significant findings; independence for listed entities; significant deficiencies in internal control", "Other deficiencies in internal control, and operational recommendations"],
            ["Purpose", "Enables oversight of the financial reporting process", "Enables improvement of controls and processes"],
            ["Form", "In writing where oral communication would be inadequate; independence matters in writing for listed clients", "Usually a management letter or report to management"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Significant findings, in the plural",
          md: "The communication of significant findings covers the auditor's views on the **qualitative aspects of accounting practices** — including whether policies are appropriate and whether estimates show bias — as well as significant difficulties encountered, matters discussed with management, written representations requested, and any circumstances affecting the form of the report. It is not merely a list of errors, and saying so distinguishes a strong answer.",
        },
      ],
      check: {
        q: "Which matter should be communicated to those charged with governance rather than to operational management?",
        options: [
          "A minor weakness in the purchase ordering process",
          "The auditor's view that management's estimates show a consistent bias toward favourable outcomes — a qualitative aspect of accounting practice that bears on oversight of financial reporting",
          "A recommendation to improve warehouse stock rotation",
          "A suggestion to automate a manual reconciliation",
        ],
        correct: 1,
        explain:
          "Bias in estimates concerns the integrity of the financial reporting process, which is exactly what those charged with governance oversee — and management is the subject of the observation, so reporting it to them alone would defeat its purpose. The other three are operational matters for the management letter.",
      },
    },
    {
      id: "deficiencies",
      heading: "Reporting control deficiencies",
      blocks: [
        {
          kind: "text",
          md: "The auditor is not engaged to report on internal control, but must communicate **significant deficiencies** identified during the audit. A deficiency is significant where, in the auditor's professional judgement, it it is important enough that those charged with governance ought to hear about it.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Deficiency, implication, recommendation — always three columns",
          md: "**What is wrong**, **what could happen as a result**, and **what should be done**. This is the standard format and it is marked accordingly: 'purchase orders are not authorised' is one mark of three, while adding 'so unauthorised or unnecessary purchases could be made and not detected' and 'orders above a threshold should require authorisation by a manager independent of purchasing' collects the rest.",
        },
        {
          kind: "table",
          caption: "The pattern applied",
          head: ["Deficiency", "Implication", "Recommendation"],
          rows: [
            ["Bank reconciliations not reviewed", "Errors or misappropriation could go undetected", "Independent review, evidenced by signature and date, within a set period of month end"],
            ["One person raises and approves journals", "Fraudulent or erroneous entries could be posted without detection", "Segregate posting from approval, with a review of all journals above a threshold"],
            ["Inventory counted only once a year with no perpetual system", "Errors accumulate undetected and the year-end figure carries the whole risk", "Introduce cyclical counting with investigation of differences"],
            ["Access rights not removed when staff leave", "Former employees could access or alter records", "A leavers process linking payroll to system access removal, reviewed periodically"],
          ],
        },
        {
          kind: "text",
          md: "Two practical points that earn marks. Recommendations should be **proportionate** — a small company cannot segregate every duty, so compensating controls such as owner review are the realistic answer. And the report should carry the usual **disclaimer**: it covers only deficiencies identified during an audit conducted for the purpose of the opinion, and is not a comprehensive statement of all deficiencies that exist.",
        },
      ],
      check: {
        q: "A small owner-managed company cannot segregate the duties of recording and banking cash. What recommendation is appropriate?",
        options: [
          "Recruit an additional employee so duties can be segregated",
          "A compensating control the owner can perform — reviewing bank statements and reconciliations directly, and comparing recorded takings to banking records — since full segregation is not economically realistic for the entity's size",
          "No recommendation, since segregation is impossible",
          "Report the deficiency in the auditor's report",
        ],
        correct: 1,
        explain:
          "Recommendations must be capable of being implemented by this entity, and in a small company owner review is the standard compensating control. Recommending a hire the company cannot justify, or reporting the matter publicly, both misjudge the audience and purpose of the communication.",
      },
    },
  ],
  examTraps: [
    { trap: "Listing deficiencies without implications and recommendations.", fix: "Three columns; two thirds of the marks are in the second and third." },
    { trap: "Recommending full segregation in a small entity.", fix: "Proportionate compensating controls, usually owner review." },
    { trap: "Reporting matters about management to management alone.", fix: "Bias and integrity matters go to those charged with governance." },
    { trap: "Presenting the report as comprehensive.", fix: "It covers only deficiencies identified during an audit performed for the opinion." },
  ],
  keyTerms: [
    { term: "Significant deficiency", def: "A deficiency in internal control that, in the auditor's judgement, merits the attention of those charged with governance." },
    { term: "Compensating control", def: "An alternative control mitigating a risk where the ideal control, such as segregation of duties, is not practicable." },
  ],
  summary: [
    "Governance receives responsibilities, scope, significant findings and significant deficiencies.",
    "Management receives other deficiencies and operational recommendations.",
    "Significant findings include qualitative judgements about policies and estimate bias.",
    "Deficiency, implication, recommendation — and keep recommendations proportionate.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes a control deficiency significant?", a: "That in the auditor's professional judgement it merits the attention of those charged with governance." },
    { q: "Why report estimate bias to governance rather than to management?", a: "It concerns oversight of the financial reporting process, and management is the subject of the observation." },
    { q: "What is the right recommendation where segregation is impracticable?", a: "A proportionate compensating control, typically direct owner review of the records and reconciliations." },
  ],
  furtherStudy: [
    "AAA-20 covers the auditor's report, which this communication accompanies.",
    "AAA-19 covers the findings evaluated before they are communicated.",
    "AAA-01 covers the audit committee that receives these communications.",
  ],
}

export const AAA_TREE_AREA_E_PART1: StudyChapter[] = [AAA_TREE_18, AAA_TREE_19, AAA_TREE_20, AAA_TREE_21]
