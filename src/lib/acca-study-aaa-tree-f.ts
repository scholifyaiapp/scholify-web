import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area F (other assignments), Area G (current issues), Area H
 * (professional skills) and Area I (employability and technology skills).
 *
 *   AAA-22  Audit-related and assurance services      (F1)
 *   AAA-23  Due diligence and forensic engagements    (F2)
 *   AAA-24  Prospective financial information          (F2)
 *   AAA-25  Auditing performance information in the public sector (F3)
 *   AAA-26  Reporting on other assignments             (F4)
 *   AAA-27  Sustainability assurance                   (F5)
 *   AAA-28  Current issues and developments            (G)
 *   AAA-29  Professional skills                        (H)
 *   AAA-30  Employability and technology skills        (I)
 *
 * Area F is where candidates most often assume an audit framework applies to a
 * non-audit engagement. The organising idea for the whole area is that the
 * LEVEL OF ASSURANCE, the WORK, and the FORM OF THE CONCLUSION move together —
 * so establishing which engagement is being performed settles everything else.
 *
 * F5 (the assurance of sustainability) and G2 (developments in sustainability
 * assurance) are recent additions and are written from the syllabus.
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_22: StudyChapter = {
  paper: "AAA",
  id: "AAA-22",
  number: 22,
  area: "F",
  syllabusRefs: ["F1"],
  title: "Audit-related and assurance services",
  minutes: 16,
  intro:
    "Not every engagement is an audit, and the commonest error in this area is answering as though it were. Establish the level of assurance first and the rest follows.",
  outcomes: [
    "Distinguish reasonable assurance from limited assurance engagements",
    "Identify the elements required for an assurance engagement",
    "Explain the work and conclusion appropriate to a review engagement",
    "Distinguish agreed-upon procedures and compilation engagements from assurance",
    "Match the engagement type to the client's need",
  ],
  sections: [
    {
      id: "levels",
      heading: "The level of assurance decides everything",
      blocks: [
        {
          kind: "table",
          caption: "The engagement types",
          head: ["Engagement", "Assurance", "Work", "Conclusion"],
          rows: [
            ["Audit", "Reasonable — high but not absolute", "Risk assessment, controls, substantive testing", "Positive: the statements give a true and fair view"],
            ["Review", "Limited", "Primarily enquiry and analytical procedures", "Negative: nothing has come to our attention causing us to believe the information is misstated"],
            ["Agreed-upon procedures", "None", "Only the procedures the parties agreed", "Factual findings reported, no conclusion drawn"],
            ["Compilation", "None", "Assembling information using accounting expertise", "No assurance; the practitioner states what was done"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Positive and negative conclusions are not stylistic",
          md: "A **positive** conclusion asserts that the information **is** properly stated; a **negative** one asserts only that **nothing came to our attention** suggesting otherwise. The second is weaker because the work was narrower, and expressing a positive conclusion after a review would claim assurance the procedures cannot support. Writing the wrong form of wording is a straightforward and avoidable mark loss.",
        },
        {
          kind: "text",
          md: "The **five elements** every assurance engagement requires: a **three-party relationship** of practitioner, responsible party and intended users; an appropriate **subject matter**; suitable **criteria** against which it is evaluated; sufficient appropriate **evidence**; and a written **assurance report**. Where any is missing — most often suitable criteria — an assurance engagement cannot be performed, and saying so is the answer rather than proposing to do it anyway.",
        },
      ],
      check: {
        q: "A client asks the firm to report on whether its half-year figures are free from material misstatement, with a limited budget and a short timetable. Which engagement is appropriate and what conclusion follows?",
        options: [
          "An audit, with a positive opinion",
          "A review engagement — primarily enquiry and analytical procedures, giving limited assurance and expressed in the negative form: nothing was encountered that would suggest the information is misstated",
          "Agreed-upon procedures, with a positive conclusion",
          "A compilation engagement, with limited assurance",
        ],
        correct: 1,
        explain:
          "The budget and timetable point to limited assurance, and limited assurance carries the negative form of conclusion. Options 2 and 3 pair the wrong conclusion with the engagement — agreed-upon procedures give no conclusion at all, and a compilation gives no assurance.",
      },
    },
    {
      id: "criteria",
      heading: "Suitable criteria, and matching the engagement to the need",
      blocks: [
        {
          kind: "text",
          md: "**Suitable criteria** are the benchmark against which the subject matter is evaluated, and they must be relevant, complete, reliable, neutral and understandable. For financial statements the reporting framework supplies them. For other subject matter — a set of performance measures, a sustainability disclosure, a claim about a control environment — they may need to be established and agreed before the engagement can proceed.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The commonest reason an engagement cannot be accepted",
          md: "A client asking for assurance on a claim with **no agreed criteria** — that its service is 'market leading', or its processes 'best practice' — is asking for something an assurance engagement cannot deliver, because there is nothing objective to evaluate against. The answer is to identify the missing element and either establish suitable criteria with the client or decline, rather than to design procedures.",
        },
        {
          kind: "table",
          caption: "Matching the engagement to the need",
          head: ["The client wants", "The engagement"],
          rows: [
            ["Statutory assurance for shareholders", "Audit"],
            ["Comfort on interim figures for a lender, quickly", "Review"],
            ["Specific facts checked, with their own conclusions drawn", "Agreed-upon procedures"],
            ["Help preparing figures with no assurance", "Compilation"],
            ["Assurance on non-financial information", "An assurance engagement, provided suitable criteria exist"],
          ],
        },
      ],
      check: {
        q: "A client asks for assurance that its customer service is 'best in class'. How should the firm respond?",
        options: [
          "Design procedures to test customer satisfaction and report a conclusion",
          "Explain that suitable criteria are missing — there is no objective, agreed benchmark for 'best in class' — so either criteria must be established and agreed with the client, or the engagement cannot be accepted",
          "Perform agreed-upon procedures on complaint data instead, and give limited assurance",
          "Accept, using industry averages as the benchmark without agreeing them",
        ],
        correct: 1,
        explain:
          "Suitable criteria are one of the five required elements, and their absence is a reason the engagement cannot proceed as asked rather than a design problem. Option 2 confuses agreed-upon procedures with assurance, since those procedures produce findings and no conclusion.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying audit procedures to a review engagement.", fix: "A review is primarily enquiry and analytical procedures." },
    { trap: "Expressing a positive conclusion after limited assurance work.", fix: "Limited assurance takes the negative form." },
    { trap: "Drawing a conclusion in an agreed-upon procedures report.", fix: "Report factual findings; the user draws their own conclusion." },
    { trap: "Designing procedures where suitable criteria are absent.", fix: "Establish criteria or decline — it is a missing element, not a design issue." },
  ],
  keyTerms: [
    { term: "Limited assurance", def: "A lower level of assurance obtained from narrower procedures, expressed as a negative conclusion." },
    { term: "Suitable criteria", def: "The benchmark for evaluating the subject matter — relevant, complete, reliable, neutral and understandable — without which an assurance engagement cannot be performed." },
    { term: "Agreed-upon procedures", def: "An engagement performing only the procedures agreed with the parties and reporting factual findings, giving no assurance." },
  ],
  summary: [
    "Assurance level, work and conclusion move together — establish the engagement first.",
    "Positive conclusions require reasonable assurance; limited assurance takes the negative form.",
    "Five elements are required, and suitable criteria are the one most often missing.",
    "Agreed-upon procedures report findings and draw no conclusion.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a review carry a negative conclusion?", a: "The procedures are narrower, so the practitioner can only say that nothing came to their attention rather than asserting the information is properly stated." },
    { q: "What are the five elements of an assurance engagement?", a: "A three-party relationship, appropriate subject matter, suitable criteria, sufficient appropriate evidence, and a written assurance report." },
    { q: "What distinguishes agreed-upon procedures from assurance?", a: "Only the agreed procedures are performed and factual findings are reported; no conclusion is expressed and no assurance is given." },
  ],
  furtherStudy: [
    "AAA-26 covers the reports these engagements produce.",
    "AAA-27 covers sustainability assurance, where criteria are the central difficulty.",
    "AAA-23 covers due diligence and forensic work, which are not assurance engagements.",
  ],
}

const AAA_TREE_23: StudyChapter = {
  paper: "AAA",
  id: "AAA-23",
  number: 23,
  area: "F",
  syllabusRefs: ["F2"],
  title: "Due diligence and forensic engagements",
  minutes: 16,
  intro:
    "Two engagements clients often call audits and which are not. Each has its own objective, its own procedures, and its own reason for existing.",
  outcomes: [
    "Explain the purpose and scope of a due diligence engagement",
    "Identify the matters a due diligence review should address",
    "Explain the objective and stages of a forensic engagement",
    "Explain the particular requirements where evidence may be used in court",
    "Identify the ethical threats these engagements create for an audit firm",
  ],
  sections: [
    {
      id: "due-diligence",
      heading: "Due diligence",
      blocks: [
        {
          kind: "text",
          md: "**Due diligence** is performed for a prospective acquirer, to establish whether the target is what it appears to be and what risks come with it. It is not an audit: there is no opinion on financial statements, the scope is agreed with the client, and the output is a report of findings for the buyer's decision.",
        },
        {
          kind: "table",
          caption: "What a due diligence review examines",
          head: ["Area", "The question"],
          rows: [
            ["Financial", "Are the reported results sustainable, and what is the normalised earnings figure?"],
            ["Assets and liabilities", "Do they exist, are they owned, and are they properly valued?"],
            ["Unrecorded liabilities", "Litigation, warranties, tax exposures, pension obligations, guarantees"],
            ["Commercial", "Customer concentration, contract terms, the durability of the revenue"],
            ["Tax", "Historic exposures the buyer would inherit, and the structure of the deal"],
            ["Systems and people", "Whether the business can operate after separation from its current owner"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Normalised earnings and inherited liabilities",
          md: "The two findings that most often change a price. **Normalised earnings** strips out one-off items, owner remuneration above or below market rate, and related party transactions on non-commercial terms, to show what the business actually earns for a new owner. **Unrecorded liabilities** are what the buyer inherits in a share purchase but not in an asset purchase — which is why the structure decision follows from the diligence findings.",
        },
      ],
      check: {
        q: "A due diligence review finds that the target's owner-manager draws a salary well below the market rate for the role. Why does this matter to the buyer?",
        options: [
          "It suggests the owner is committed to the business",
          "Reported profit is overstated relative to what a new owner would earn — the buyer must pay a market-rate manager, so normalised earnings are lower and the price based on reported profit is too high",
          "It indicates a related party transaction requiring disclosure",
          "It has no effect on the valuation",
        ],
        correct: 1,
        explain:
          "Normalisation adjusts reported results to what the business would earn under new ownership, and an under-market proprietor's salary is the classic adjustment. Since price is usually a multiple of earnings, the adjustment feeds directly into the negotiation.",
      },
    },
    {
      id: "forensic",
      heading: "Forensic engagements",
      blocks: [
        {
          kind: "text",
          md: "A **forensic** engagement investigates a specific matter — suspected fraud, a quantified loss, an insurance claim, a dispute — with the expectation that the findings may be used in legal proceedings. That expectation is what shapes the whole engagement.",
        },
        {
          kind: "table",
          caption: "The stages",
          head: ["Stage", "Content"],
          rows: [
            ["Accept and plan", "Establish the objective, the scope, independence, and the required expertise"],
            ["Gather evidence", "Documents, systems data, interviews — preserving the integrity of everything obtained"],
            ["Analyse", "Quantify the loss or establish what occurred, reconciling to underlying records"],
            ["Report", "Findings, the basis for them, and any limitations on the work"],
            ["Give evidence", "Where required, as an expert witness"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What differs because a court may see it",
          md: "**Chain of custody** — evidence must be identified, secured and its handling documented, or its authenticity can be challenged. **Objectivity** — the expert's duty is to the court, above the client who pays, which is a genuinely different posture from advocacy. **Documentation** to a standard that survives cross-examination. And **no conclusion on guilt** — the expert reports findings and quantifies; determining liability is the court's function.",
        },
        {
          kind: "text",
          md: "For an **audit firm**, both engagements create ethical questions. Performing due diligence for a buyer who is an audit client, on a target that is also an audit client, is a **conflict of interest** requiring disclosure, consent and information barriers, or refusal. A forensic engagement investigating an audit client's own records raises **self-review** — the firm may be examining transactions it previously audited — and **advocacy** if the firm supports the client's position in a dispute.",
        },
      ],
      check: {
        q: "A forensic accountant instructed by a client concludes their investigation. What must the report not do?",
        options: [
          "Quantify the loss suffered",
          "Determine whether a person is guilty or liable — that is the court's function; the expert reports findings, the basis for them and the quantification, and their duty of objectivity runs to the court above the instructing client",
          "State the limitations of the work performed",
          "Describe the evidence examined",
        ],
        correct: 1,
        explain:
          "The expert's role is to inform the tribunal rather than to decide for it, and an expert who concludes on liability has stepped into advocacy — which undermines both their objectivity and the weight the court gives their evidence.",
      },
    },
  ],
  examTraps: [
    { trap: "Answering a due diligence question with audit procedures.", fix: "There is no opinion; the scope is agreed and the output is findings for a decision." },
    { trap: "Omitting unrecorded liabilities and normalisation.", fix: "They are the findings that change the price and the deal structure." },
    { trap: "Ignoring chain of custody in a forensic engagement.", fix: "Unsecured evidence can be challenged and rendered useless." },
    { trap: "Concluding on guilt or liability.", fix: "The expert reports findings; the court decides." },
  ],
  keyTerms: [
    { term: "Due diligence", def: "An investigation for a prospective acquirer into a target's financial position, risks and sustainability, reporting findings rather than an opinion." },
    { term: "Normalised earnings", def: "Reported results adjusted for one-off items, non-market owner remuneration and non-commercial related party transactions, to show what the business earns for a new owner." },
    { term: "Chain of custody", def: "The documented handling of evidence from collection onward, without which its authenticity can be challenged in proceedings." },
  ],
  summary: [
    "Due diligence reports findings for a buyer's decision — there is no opinion.",
    "Normalised earnings and unrecorded liabilities are the findings that move a price.",
    "Forensic work is shaped by the possibility of court use: custody, objectivity, documentation.",
    "The expert's duty runs to the court, and they do not conclude on liability.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does an under-market owner's salary reduce a target's value?", a: "A new owner must pay a market-rate manager, so normalised earnings are lower than reported profit and a price based on reported profit is too high." },
    { q: "Why does chain of custody matter?", a: "Evidence whose handling is not documented can have its authenticity challenged, which can render it unusable in proceedings." },
    { q: "What conflict arises where a firm performs due diligence on another audit client?", a: "A conflict of interest requiring disclosure to both parties, informed consent, information barriers — or refusal of the engagement." },
  ],
  furtherStudy: [
    "AAA-26 covers reporting on these assignments.",
    "AAA-04 covers the conflicts of interest they create for an audit firm.",
    "AAA-06 covers fraud, which forensic engagements typically investigate.",
  ],
}

const AAA_TREE_24: StudyChapter = {
  paper: "AAA",
  id: "AAA-24",
  number: 24,
  area: "F",
  syllabusRefs: ["F2"],
  title: "Prospective financial information",
  minutes: 15,
  intro:
    "Reporting on a forecast means reporting on something that has not happened. The assurance available is correspondingly limited, and the conclusion says so explicitly.",
  outcomes: [
    "Distinguish a forecast from a projection",
    "Explain the level of assurance obtainable on prospective information",
    "Describe the procedures appropriate to a forecast",
    "Explain the form and content of the report, including the required caveats",
    "Identify when an engagement on prospective information should be declined",
  ],
  sections: [
    {
      id: "forecast-projection",
      heading: "Forecasts, projections, and the limits of assurance",
      blocks: [
        {
          kind: "table",
          caption: "The two kinds",
          head: ["", "Forecast", "Projection"],
          rows: [
            ["Based on", "Best-estimate assumptions about conditions management expects", "Hypothetical assumptions — 'if we opened twenty stores'"],
            ["Question answered", "What do we think will happen?", "What would happen if this occurred?"],
            ["Assurance available", "Limited, on whether the information is properly prepared on the stated basis", "Limited, and the hypothetical basis must be clearly stated"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "What the practitioner can and cannot say",
          md: "The practitioner can conclude that the assumptions provide a **reasonable basis**, that the information is **properly prepared** on those assumptions, and that it is **presented in accordance with the framework**. They can never say the forecast **will** be achieved. The report must say so — a caveat that actual results are likely to differ, and possibly materially, because events do not occur as expected.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Procedures",
          items: [
            "Assess whether the assumptions are consistent with the entity's plans, past performance and the external environment",
            "Compare prior forecasts against actual outcomes, to assess management's forecasting record",
            "Test the arithmetical accuracy of the model and the internal consistency of the statements within it",
            "Perform sensitivity analysis on the key assumptions to see how fragile the outcome is",
            "Consider whether the period covered is reasonable — the further out, the less meaningful",
            "Obtain written representations on the assumptions and management's intent",
          ],
        },
      ],
      check: {
        q: "A practitioner reports on a client's profit forecast. What can the conclusion state?",
        options: [
          "That the forecast will be achieved",
          "That nothing has come to the practitioner's attention suggesting the assumptions do not provide a reasonable basis, and that the forecast is properly prepared on those assumptions — with a caveat that actual results are likely to differ, possibly materially",
          "That the forecast is free from material misstatement",
          "That the assumptions are correct",
        ],
        correct: 1,
        explain:
          "Future events cannot be verified, so the conclusion is limited assurance in negative form about preparation and about whether the assumptions form a reasonable basis. The caveat is mandatory precisely because users otherwise read the report as a guarantee.",
      },
    },
    {
      id: "declining",
      heading: "When to decline",
      blocks: [
        {
          kind: "table",
          caption: "Circumstances in which the engagement should not be accepted",
          head: ["Circumstance", "Why"],
          rows: [
            ["The assumptions are clearly unrealistic", "The practitioner cannot conclude they provide a reasonable basis"],
            ["The period covered is excessively long", "Assurance on distant projections is not meaningful"],
            ["The intended use is misleading", "Association would lend credibility to something that could deceive users"],
            ["Management will not provide the underlying model or data", "The work cannot be performed"],
            ["The practitioner lacks knowledge of the business or sector", "The reasonableness of assumptions cannot be assessed"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The association risk",
          md: "Prospective information is usually prepared to persuade someone — a lender, an investor, a buyer. The practitioner's name on it lends credibility, so an engagement whose forecast rests on assumptions the practitioner regards as unrealistic should be **declined** rather than reported on with reservations. The risk is not only the report being wrong but the firm being associated with information that misleads.",
        },
      ],
      check: {
        q: "A client's forecast, prepared to support a loan application, assumes revenue growth of 60% a year for five years in a mature market with no supporting evidence. What should the practitioner do?",
        options: [
          "Report with a qualification about the growth assumption",
          "Decline the engagement — the practitioner could not conclude that the assumptions provide a reasonable basis, and reporting at all would lend the firm's credibility to information likely to mislead the lender",
          "Adjust the forecast to a realistic growth rate and report on that",
          "Report and disclaim responsibility for the assumptions",
        ],
        correct: 1,
        explain:
          "Where the assumptions cannot be regarded as reasonable, there is no conclusion the practitioner can properly give, and the intended use makes association actively dangerous. Adjusting the client's forecast — option 2 — would be assuming management responsibility for it.",
      },
    },
  ],
  examTraps: [
    { trap: "Concluding that a forecast will be achieved.", fix: "The conclusion covers preparation and the reasonableness of assumptions only." },
    { trap: "Omitting the caveat about actual results.", fix: "It is required, and users otherwise read the report as a guarantee." },
    { trap: "Reporting with reservations on unrealistic assumptions.", fix: "Decline — association lends credibility to something that may mislead." },
    { trap: "Adjusting management's forecast.", fix: "That assumes management responsibility for the information reported on." },
  ],
  keyTerms: [
    { term: "Forecast", def: "Prospective information based on assumptions about conditions management expects to exist and actions it expects to take." },
    { term: "Projection", def: "Prospective information based on hypothetical assumptions about events that may not occur, whose hypothetical basis must be stated." },
  ],
  summary: [
    "Forecasts use expected assumptions; projections use hypothetical ones.",
    "Only limited assurance is available, on preparation and the reasonableness of assumptions.",
    "The caveat that results will differ is mandatory.",
    "Where assumptions are unrealistic or the use misleading, decline rather than qualify.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can only limited assurance be given on a forecast?", a: "It concerns future events that cannot be verified, so the practitioner can address preparation and the reasonableness of assumptions but not the outcome." },
    { q: "What distinguishes a projection from a forecast?", a: "A projection rests on hypothetical assumptions about events that may not occur, and that basis must be clearly stated." },
    { q: "Why decline rather than qualify where assumptions are unrealistic?", a: "The practitioner's association lends credibility, and prospective information is usually prepared to persuade someone." },
  ],
  furtherStudy: [
    "AAA-22 covers the assurance framework this engagement sits within.",
    "AAA-18 covers going concern, where forecasts are evaluated as audit evidence.",
    "AAA-26 covers the form of the report on this and other assignments.",
  ],
}

export const AAA_TREE_AREA_F_PART1: StudyChapter[] = [AAA_TREE_22, AAA_TREE_23, AAA_TREE_24]
