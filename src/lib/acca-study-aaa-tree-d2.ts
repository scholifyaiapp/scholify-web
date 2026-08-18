import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA-INT · Area D, part two — estimates, using the work of others, and group
 * audits.
 *
 *   AAA-15  Auditing accounting estimates  (D3)
 *   AAA-16  Using the work of others       (D4)
 *   AAA-17  Group audits                   (D5)
 *
 * Split from acca-study-aaa-tree-d.ts (AAA-11..14) for file size only; the two
 * modules are one syllabus area and the aggregator concatenates them in order.
 *
 * See acca-study-aaa-tree-a.ts for the house style note: apply the standard to
 * the scenario, never describe it.
 */

const AAA_TREE_15: StudyChapter = {
  paper: "AAA",
  id: "AAA-15",
  number: 15,
  area: "D",
  syllabusRefs: ["D3"],
  title: "Auditing accounting estimates",
  minutes: 17,
  intro:
    "Where management has discretion, misstatement is cheapest to achieve and hardest to detect. That is why estimates are the significant risk in most AAA scenarios.",
  outcomes: [
    "Explain why estimates carry heightened risk",
    "Apply the three approaches available for auditing an estimate",
    "Evaluate the assumptions underlying an estimate",
    "Identify management bias, including bias that is individually immaterial",
    "Design procedures for the estimates scenarios typically feature",
  ],
  sections: [
    {
      id: "why-and-how",
      heading: "Why estimates are risky, and the three approaches",
      blocks: [
        {
          kind: "text",
          md: "An estimate has no invoice. Its amount depends on assumptions about the future, chosen by management, within a range that may be wide — and the wider the range, the more scope there is for the figure to land wherever management would prefer, without any single assumption looking unreasonable.",
        },
        {
          kind: "table",
          caption: "The three approaches",
          head: ["Approach", "What it involves", "Best when"],
          rows: [
            ["Test how management made the estimate", "Evaluate the method, the assumptions and the data; recalculate", "There is a model with identifiable assumptions — impairment, provisions, fair values"],
            ["Test events up to the date of the report", "Use what actually happened after the year end as evidence of the estimate's accuracy", "The uncertainty resolves quickly — receivables recovered, inventory sold, a claim settled"],
            ["Develop an independent estimate", "Build your own point estimate or range and compare it with management's", "The auditor has reliable data and the estimate is significant"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Subsequent events are the strongest evidence available",
          md: "Where the uncertainty resolves before the audit report is signed, **what actually happened** beats any assessment of assumptions. A receivable paid in full after the year end evidences its recoverability; inventory sold above cost evidences net realisable value; a legal claim settled evidences the provision. Reaching for this first, where it exists, is the mark of a candidate who understands estimates rather than one reciting the approaches.",
        },
      ],
      check: {
        q: "A client's year-end receivable from one customer is significant and its recoverability is uncertain. The customer paid in full two months after the year end, before the audit report was signed. What is the best evidence?",
        options: [
          "Management's assessment of the customer's creditworthiness",
          "The subsequent receipt — what actually happened resolves the uncertainty directly and is stronger than any assessment of assumptions made at the year-end date",
          "An independent credit check on the customer",
          "A written representation from management about recoverability",
        ],
        correct: 1,
        explain:
          "Where the uncertainty has resolved before the report is signed, the outcome is the evidence. Credit assessments and representations are inferior substitutes for a fact that is now known, and the standard expressly permits this approach.",
      },
    },
    {
      id: "bias",
      heading: "Detecting management bias",
      blocks: [
        {
          kind: "text",
          md: "The syllabus requires estimates to be reviewed for **bias**, and bias is not the same as error. An estimate can be within an acceptable range and still be biased, because management has consistently selected the end of the range that suits them.",
        },
        {
          kind: "table",
          caption: "Indicators of bias",
          head: ["Indicator", "What it suggests"],
          rows: [
            ["Estimates consistently at the favourable end of the range", "Selection is not neutral, even where each is individually defensible"],
            ["A change in method or assumption without a change in circumstances", "The method was chosen for its outcome"],
            ["Prior year estimates that proved consistently optimistic", "Retrospective review reveals a pattern"],
            ["Significant judgements clustered so that profit just meets a target", "The aggregate is the point, not any single estimate"],
            ["Reluctance to provide the underlying data or model", "The assumptions may not withstand examination"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The retrospective review, and the aggregate",
          md: "The auditor must **review the outcome of prior period estimates** — not to second-guess a past judgement, but to detect a pattern. And individually immaterial biases that all run the same way can be material **in aggregate**, which is why the evaluation is done across the estimates together rather than one at a time. Both points are frequently required and rarely given.",
        },
        {
          kind: "text",
          md: "Where bias is identified, the consequences run beyond the estimate: it indicates a risk of material misstatement due to **fraud**, it undermines the reliability of management's representations generally, and it should be communicated to those charged with governance. An answer confined to adjusting the estimate has stopped too early.",
        },
      ],
      check: {
        q: "An auditor finds that each of five estimates falls at the end of its range most favourable to profit, though each is individually defensible. What does this indicate?",
        options: [
          "Nothing — each estimate is within an acceptable range",
          "Possible management bias: individually acceptable estimates all selected in the same direction suggest the selection is not neutral, the aggregate effect may be material, and it indicates a fraud risk affecting the reliability of representations generally",
          "That materiality has been set too low",
          "That the estimates should each be recalculated",
        ],
        correct: 1,
        explain:
          "Bias shows in the pattern rather than in any single estimate, which is why the standard requires evaluation in aggregate. The consequences extend to fraud risk and to the credibility of management across the audit, not just to the amounts themselves.",
      },
    },
  ],
  examTraps: [
    { trap: "Assessing assumptions where the outcome is already known.", fix: "Subsequent events resolve the uncertainty and are stronger evidence." },
    { trap: "Evaluating estimates one at a time.", fix: "Bias appears in the pattern and can be material in aggregate." },
    { trap: "Omitting the retrospective review.", fix: "Prior period outcomes reveal a pattern of optimism." },
    { trap: "Treating bias as an estimate problem.", fix: "It indicates fraud risk and undermines representations across the audit." },
  ],
  keyTerms: [
    { term: "Estimation uncertainty", def: "The susceptibility of an estimate to a lack of precision in its measurement, which widens the range of acceptable amounts." },
    { term: "Management bias", def: "A lack of neutrality in preparing estimates, visible in a pattern of favourable selections rather than in any single figure." },
    { term: "Retrospective review", def: "Examination of the outcome of prior period estimates to detect a pattern of bias in management's judgements." },
  ],
  summary: [
    "Estimates are risky because management chooses within a range and no invoice exists.",
    "Three approaches: test the process, use subsequent events, or build an independent estimate.",
    "Where the outcome is known before signing, it is the strongest evidence.",
    "Bias shows in the pattern and in the aggregate, and implies fraud risk.",
  ],
  knowledgeDiagnostic: [
    { q: "Which approach to an estimate gives the strongest evidence where available?", a: "Testing events up to the date of the report — what actually happened resolves the uncertainty directly." },
    { q: "How is management bias detected?", a: "Through the pattern: estimates consistently at the favourable end, unexplained method changes, and a retrospective review of prior outcomes." },
    { q: "Why evaluate estimates in aggregate?", a: "Individually immaterial biases running the same way can be material together, which is where the effect on profit actually lands." },
  ],
  furtherStudy: [
    "AAA-06 covers the fraud risk that identified bias indicates.",
    "AAA-14 covers procedures for the estimates scenarios typically feature.",
    "AAA-19 covers evaluating misstatements, including the aggregate effect.",
  ],
}

const AAA_TREE_16: StudyChapter = {
  paper: "AAA",
  id: "AAA-16",
  number: 16,
  area: "D",
  syllabusRefs: ["D4"],
  title: "Using the work of others",
  minutes: 16,
  intro:
    "The auditor may use work performed by internal audit, by an expert, or by a service organisation — but the responsibility for the opinion never moves.",
  outcomes: [
    "Explain the conditions for using the work of internal audit",
    "Distinguish using internal audit's work from using them for direct assistance",
    "Explain the evaluation required before relying on an auditor's expert",
    "Explain the auditor's approach where a service organisation is used",
    "State the effect on the auditor's responsibility for the opinion",
  ],
  sections: [
    {
      id: "internal-audit",
      heading: "Internal audit",
      blocks: [
        {
          kind: "table",
          caption: "The evaluation before relying on internal audit's work",
          head: ["Factor", "What to assess"],
          rows: [
            ["Objectivity", "To whom internal audit reports — reporting to the audit committee supports objectivity, reporting to the finance director undermines it"],
            ["Competence", "Qualifications, experience, training and resources of the internal audit function"],
            ["Systematic approach", "Whether the work is planned, supervised, reviewed and documented to an appropriate standard"],
            ["Nature of the work", "Whether the areas covered involve significant judgement or significant risk — the more judgement, the less reliance is appropriate"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Two different uses, two different rules",
          md: "**Using internal audit's work** means relying on procedures they performed for their own purposes, after evaluating the function and re-performing some of the work. **Direct assistance** means internal auditors working under the external auditor's direction, supervision and review — which requires evaluating the individuals for objectivity and competence, and which cannot be used for areas involving significant judgement or significant risk. The distinction matters and candidates blur it.",
        },
        {
          kind: "text",
          md: "In both cases the external auditor **remains solely responsible for the opinion**, and that responsibility is not reduced by any use of internal audit. So the external auditor must perform sufficient work themselves on significant risks, must re-perform some of any work relied on, and must document the evaluation and conclusions.",
        },
      ],
      check: {
        q: "A company's internal audit function reports to the finance director and has performed extensive testing of revenue recognition, an area assessed as a significant risk. Can the external auditor rely on this work?",
        options: [
          "Yes, provided the work is well documented",
          "Objectivity is compromised by reporting to the finance director, and the area involves significant risk — so reliance is inappropriate and direct assistance is not permitted for such an area; the external auditor must perform the work themselves",
          "Yes, if internal audit staff are professionally qualified",
          "Only if the finance director confirms internal audit's independence",
        ],
        correct: 1,
        explain:
          "Both conditions fail together: the reporting line undermines objectivity, and significant risk areas require the external auditor's own work in any event. Competence alone — option 2 — cannot cure an objectivity problem.",
      },
    },
    {
      id: "experts-service",
      heading: "Experts and service organisations",
      blocks: [
        {
          kind: "text",
          md: "An **auditor's expert** — a valuer, actuary, engineer or lawyer — is used where expertise outside accounting and auditing is needed. Before relying on their work, the auditor evaluates their **competence, capabilities and objectivity**, agrees the **scope and objectives** of the work in writing, and evaluates the **appropriateness of their findings** as audit evidence.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Evaluating an expert's findings is not accepting them",
          md: "The auditor cannot assess the expert's technical method, but they can and must assess the **source data** the expert used, the **assumptions** they were given — often by management — and whether the conclusion is **consistent with other audit evidence**. Where a valuation rests on assumptions management supplied, testing those assumptions is the auditor's work, not the expert's.",
        },
        {
          kind: "table",
          caption: "Where a service organisation processes transactions",
          head: ["Situation", "The auditor's approach"],
          rows: [
            ["Sufficient information available at the user entity", "Audit the transactions at the user entity in the ordinary way"],
            ["Insufficient information", "Obtain a report on the service organisation's controls, or arrange for procedures to be performed there"],
            ["Report on the design of controls only", "Confirms suitability of design, not operating effectiveness — further work is needed to rely on operation"],
            ["Report on design and operating effectiveness", "Can support reliance, subject to the period covered and the reliability of the reporting auditor"],
            ["Neither available", "A potential scope limitation, to be resolved or reflected in the opinion"],
          ],
        },
        {
          kind: "text",
          md: "Two practical checks on any service organisation report: **the period it covers** must align with the audit period, and the **complementary user controls** it identifies must actually be operating at the client. A report is frequently issued on the basis that the user entity performs specified controls of its own — and if the client does not, the assurance does not carry.",
        },
      ],
      check: {
        q: "An auditor's expert values a property using assumptions about future rental yields supplied by management. What must the auditor do?",
        options: [
          "Accept the expert's valuation, since the auditor lacks property expertise",
          "Evaluate the expert's competence and objectivity, and separately test the assumptions management supplied and the source data used — the assumptions are management's and are within the auditor's responsibility even though the valuation technique is not",
          "Engage a second expert to verify the first",
          "Treat the valuation as a management representation",
        ],
        correct: 1,
        explain:
          "The division is between the expert's technique, which the auditor cannot assess, and the inputs, which they can and must. Where management supplied the assumptions, accepting the valuation without testing them accepts management's figure with an expert's label on it.",
      },
    },
  ],
  examTraps: [
    { trap: "Confusing using internal audit's work with direct assistance.", fix: "Different evaluations, and direct assistance is barred in significant risk and judgement areas." },
    { trap: "Suggesting responsibility for the opinion is shared.", fix: "It remains solely the external auditor's." },
    { trap: "Accepting an expert's conclusion without testing the inputs.", fix: "The assumptions and source data are the auditor's responsibility." },
    { trap: "Relying on a controls report without checking the period and user controls.", fix: "Both must align, or the assurance does not carry." },
  ],
  keyTerms: [
    { term: "Direct assistance", def: "Internal auditors performing audit procedures under the external auditor's direction, supervision and review, which is not permitted for significant risk or judgement areas." },
    { term: "Auditor's expert", def: "An individual or organisation with expertise outside accounting and auditing whose work is used as audit evidence after evaluation." },
    { term: "Complementary user controls", def: "Controls a service organisation's report assumes the user entity performs, without which the assurance in that report does not carry." },
  ],
  summary: [
    "Evaluate internal audit on objectivity, competence, systematic approach and the nature of the work.",
    "Using their work and direct assistance are different, with different limits.",
    "Responsibility for the opinion never moves, whatever work is used.",
    "For an expert, test the inputs and assumptions even though the technique is beyond you.",
  ],
  knowledgeDiagnostic: [
    { q: "What does internal audit's reporting line tell you?", a: "Whether the function is objective — reporting to the audit committee supports it, reporting to the finance director undermines it." },
    { q: "Where can direct assistance not be used?", a: "Areas involving significant judgement or significant risk, and it requires evaluation of the individuals as well as the function." },
    { q: "What must be checked on a service organisation controls report?", a: "That the period covered aligns with the audit period, and that any complementary user controls are actually operating at the client." },
  ],
  furtherStudy: [
    "AAA-17 covers component auditors, a related question of using others' work.",
    "AAA-15 covers estimates, where an expert is most often involved.",
    "AAA-13 covers the reliability of evidence obtained from others.",
  ],
}

const AAA_TREE_17: StudyChapter = {
  paper: "AAA",
  id: "AAA-17",
  number: 17,
  area: "D",
  syllabusRefs: ["D5"],
  title: "Group audits",
  minutes: 18,
  intro:
    "One opinion, several auditors, and a group auditor who is responsible for all of it. The examinable tension is between relying on component auditors and being answerable for their work.",
  outcomes: [
    "Explain the group auditor's responsibility for the group opinion",
    "Determine the scope of work required on components",
    "Explain the evaluation and involvement required for component auditors",
    "Identify the risks specific to a consolidation",
    "Explain the consequences where sufficient evidence over a component cannot be obtained",
  ],
  sections: [
    {
      id: "responsibility-scope",
      heading: "Responsibility, and deciding the scope",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "The group auditor is solely responsible",
          md: "The group engagement partner is responsible for the **group audit opinion in its entirety**, and the report does not refer to a component auditor unless required by law. Using component auditors is a means of obtaining evidence; it does not divide the responsibility. Any answer implying shared responsibility is wrong on the central point of the topic.",
        },
        {
          kind: "table",
          caption: "Scoping the work on components",
          head: ["Component", "Work required"],
          rows: [
            ["Significant due to individual financial significance", "An audit of the component's financial information using component materiality"],
            ["Significant due to a significant risk of material misstatement", "An audit, or an audit of the balances affected by that risk, or specified procedures"],
            ["Not significant", "Analytical procedures at group level may suffice, provided the aggregate of such components is not material"],
          ],
        },
        {
          kind: "text",
          md: "**Component materiality** is set lower than group materiality, so that misstatements uncorrected across several components do not aggregate beyond the group threshold. And the **aggregation risk** point matters: a collection of individually insignificant components can together be material, which is why the group auditor must consider them collectively rather than dismissing each in turn.",
        },
      ],
      check: {
        q: "A group has fifteen subsidiaries, none individually significant, together representing 30% of group revenue. Can the group auditor rely on analytical procedures alone for all of them?",
        options: [
          "Yes, since none is individually significant",
          "No — the aggregate is material, so relying on analytical procedures across all of them leaves a material portion of the group without sufficient work; some should be selected for audit or specified procedures, varied between years",
          "Yes, provided each subsidiary has a local audit",
          "No, every component must be fully audited",
        ],
        correct: 1,
        explain:
          "Aggregation is the point: individual insignificance does not make the collection immaterial. Selecting a rotating sample for fuller work is the standard response, and it also introduces unpredictability across the group.",
      },
    },
    {
      id: "components-consolidation",
      heading: "Component auditors and consolidation risks",
      blocks: [
        {
          kind: "table",
          caption: "What the group auditor must do about a component auditor",
          head: ["Stage", "Requirement"],
          rows: [
            ["Understand", "Whether they are competent, independent, and operating under a suitable regulatory framework"],
            ["Communicate", "Group instructions setting out the work required, component materiality, the risks identified, and the reporting timetable"],
            ["Be involved", "In the component auditor's risk assessment, particularly for significant components and significant risks"],
            ["Review", "The component auditor's findings, and for significant risks the relevant working papers"],
            ["Evaluate", "Whether the evidence obtained is sufficient and appropriate for the group opinion"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Involvement, not just instructions",
          md: "The group auditor cannot simply send instructions and read a summary back. For **significant components and significant risks** they must be involved in the component auditor's risk assessment and must review relevant working papers. Where a scenario shows a group team that issued instructions and received only a clearance memorandum, the involvement requirement has not been met — and that is the finding.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The consolidation risks to identify",
          items: [
            "**Uniform accounting policies** — components applying different policies must be adjusted on consolidation",
            "**Coterminous periods** — different year ends require adjustment or additional procedures",
            "**Intra-group transactions and balances** — must be eliminated in full, and mismatches indicate error",
            "**Unrealised profit** in inventory or non-current assets transferred within the group",
            "**Foreign currency translation** — rates used, and treatment of exchange differences",
            "**Goodwill** — its initial measurement and subsequent impairment testing",
            "**Non-controlling interests** — measurement basis and allocation of results",
          ],
        },
        {
          kind: "text",
          md: "Where the group auditor **cannot obtain sufficient appropriate evidence** over a component — access refused, a component auditor whose work cannot be relied on, or records unavailable — the consequence is a **scope limitation**, and the opinion is modified according to whether the possible effect is material or both material and pervasive. The group auditor must not simply exclude the component from consideration.",
        },
      ],
      check: {
        q: "A group auditor is refused access to the working papers of a component auditor for a significant subsidiary. What follows?",
        options: [
          "The group auditor may rely on the component auditor's clearance memorandum",
          "Sufficient appropriate evidence cannot be obtained for a significant component, so the group auditor should seek alternative procedures — including performing work themselves — and if unresolved this is a scope limitation modifying the opinion",
          "The subsidiary should be excluded from the consolidation",
          "The component auditor becomes responsible for that part of the opinion",
        ],
        correct: 1,
        explain:
          "Review of working papers for significant components is required, and its absence leaves the group auditor unable to evaluate the evidence. Excluding the subsidiary would misstate the group accounts, and responsibility for the opinion cannot transfer.",
      },
    },
  ],
  examTraps: [
    { trap: "Implying responsibility is shared with component auditors.", fix: "The group auditor is solely responsible for the whole opinion." },
    { trap: "Dismissing individually insignificant components.", fix: "Consider them in aggregate — together they may be material." },
    { trap: "Treating instructions as sufficient involvement.", fix: "Involvement in risk assessment and review of working papers is required for significant components." },
    { trap: "Excluding a component where evidence cannot be obtained.", fix: "That is a scope limitation affecting the opinion." },
  ],
  keyTerms: [
    { term: "Component materiality", def: "Materiality set for a component below group materiality, so that aggregated uncorrected misstatements do not exceed the group threshold." },
    { term: "Significant component", def: "A component of individual financial significance to the group, or one likely to include a significant risk of material misstatement." },
    { term: "Aggregation risk", def: "The risk that individually immaterial misstatements across several components combine to a material amount at group level." },
  ],
  summary: [
    "The group auditor is solely responsible for the entire group opinion.",
    "Scope follows significance, and individually insignificant components matter in aggregate.",
    "Instructions are not enough — involvement and working paper review are required for significant components.",
    "Where evidence cannot be obtained, the result is a scope limitation, not exclusion.",
  ],
  knowledgeDiagnostic: [
    { q: "Does the group audit report refer to component auditors?", a: "Not unless required by law — using them does not divide responsibility for the opinion." },
    { q: "Why is component materiality lower than group materiality?", a: "So that uncorrected misstatements aggregated across components do not exceed the group threshold." },
    { q: "What does the group auditor owe a significant component beyond instructions?", a: "Involvement in the component auditor's risk assessment and review of the relevant working papers." },
  ],
  furtherStudy: [
    "AAA-16 covers using others' work more generally.",
    "AAA-20 covers the modified opinions a scope limitation produces.",
    "AAA-11 covers materiality, from which component materiality is derived.",
  ],
}

export const AAA_TREE_AREA_D_PART2: StudyChapter[] = [AAA_TREE_15, AAA_TREE_16, AAA_TREE_17]
