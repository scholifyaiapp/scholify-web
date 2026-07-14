import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA · Area E — Completion, review & reporting.
 * Advanced-level completion: evaluating misstatements (ISA 450), the overall
 * review, subsequent events (ISA 560), written representations (ISA 580),
 * reports to TCWG (ISA 260/265), forming the opinion (ISA 700), the ISA 705
 * modification matrix, going concern reporting (ISA 570), KAM (ISA 701),
 * EoM/OM (ISA 706), other information (ISA 720) — and the wider spectrum of
 * assurance and related-services engagements (ISRE 2400/2410, ISRS 4400/4410,
 * ISAE 3400/3000). Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const AAA_E: StudyChapter = {
  paper: "AAA",
  area: "E",
  title: "Completion, review & reporting",
  minutes: 18,
  intro: "The evidence is in the file. Now the partner has to convert a year of work into one paragraph the whole world reads — and decide, precisely, which words that paragraph contains.",
  outcomes: [
    "Evaluate corrected and uncorrected misstatements under ISA 450 and judge their effect on the opinion",
    "Complete the overall review, subsequent events, written representations and reports to those charged with governance",
    "Form the audit opinion under ISA 700 and select the correct modified opinion from the ISA 705 matrix",
    "Report on going concern (ISA 570), key audit matters (ISA 701), emphasis of matter / other matter (ISA 706) and other information (ISA 720)",
    "Distinguish reasonable, limited and no-assurance engagements and place review, agreed-upon-procedures, compilation and prospective-information work correctly",
  ],
  sections: [
    {
      id: "misstatements",
      heading: "Completion & evaluating misstatements — ISA 450",
      blocks: [
        { kind: "text", md: "By the completion stage the substantive work is done, but a pile of small problems has accumulated along the way: an accrual that was $30k light, a revenue cut-off error, an estimate the auditor thinks is optimistic. **ISA 450** governs what the auditor does with that pile. The rule is to **accumulate** every misstatement identified during the audit — other than those that are **clearly trivial** — and evaluate them, individually and in **aggregate**, against materiality." },
        { kind: "callout", tone: "warn", title: "\"Clearly trivial\" is not \"not material\"", md: "Clearly trivial is a **much lower** threshold than materiality — a level below which items are so small, singly and combined, that they plainly do not matter even when added up. Anything above clearly trivial must be **accumulated**, even if each item on its own is well below materiality, because together they may cross the line." },
        { kind: "text", md: "Not all misstatements are the same animal, and the exam rewards naming them precisely. The auditor classifies each as **factual**, **judgemental** or **projected**, because the response differs for each." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Three kinds of misstatement (ISA 450)",
          caption: "Classify first — the classification drives how the auditor argues with management.",
          data: {
            items: [
              { title: "Factual", sub: "No doubt at all — a genuine error, e.g. an invoice posted at the wrong amount. Fully quantified." },
              { title: "Judgemental", sub: "Arises from management's estimate or policy choice the auditor considers unreasonable, e.g. an under-provided warranty liability." },
              { title: "Projected", sub: "The auditor's best estimate of error in a population, extrapolated from misstatements found in a sample." },
            ],
          },
        } },
        { kind: "text", md: "The auditor **communicates** misstatements to the appropriate level of management on a timely basis and **requests correction**. Where management corrects them, the file is cleaner and the opinion is unaffected. Where management **declines**, the auditor must understand **why** and reconsider whether the uncorrected items — combined with the effect of prior-period uncorrected misstatements still affecting the statements — are material. The auditor also obtains a **written representation** that management believes the effects of uncorrected misstatements are immaterial." },
        { kind: "text", md: "Materiality is not frozen at planning. If accumulated misstatements approach the threshold, or new information changes the auditor's view of the business, the auditor **revises materiality** and asks whether the **audit strategy and further procedures** are still adequate — a higher-risk picture may demand more work before any opinion can be formed." },
        { kind: "example", title: "Worked completion decision — aggregation", scenario: "Overall materiality is $500k. During the audit the team finds: a factual cut-off error overstating revenue by $180k; a projected receivables error of $150k from sample testing; and a judgemental view that a warranty provision is understated by $220k. Management will correct the cut-off error only. Prior-year uncorrected misstatements still overstate opening reserves by $90k.", steps: [
          { label: "Split corrected vs uncorrected", detail: "The $180k cut-off error is corrected → remove it. Uncorrected: $150k projected + $220k judgemental = $370k current-year effect." },
          { label: "Bring in prior-period effect", detail: "The $90k brought-forward uncorrected item still distorts the statements this year → aggregate exposure now $370k + $90k = $460k." },
          { label: "Compare with materiality", detail: "$460k is below $500k in aggregate — but it is now within a whisker of the threshold, so trivial slippage or one more judgemental item tips it over." },
          { label: "Act on the margin", detail: "Discuss with management, press again for correction of the projected and judgemental items, and reassess whether materiality itself should be lowered given the risk profile." },
        ], result: "Aggregate uncorrected misstatements are material-in-waiting: below materiality today, but the auditor pushes for correction and keeps the modification decision open until every judgemental item is resolved — the opinion is not yet safe." },
      ],
      check: {
        q: "During completion the auditor identifies a $40k factual error. Overall materiality is $500k and the clearly-trivial threshold is $10k. What must the auditor do with the $40k error?",
        options: [
          "Ignore it — it is far below the $500k materiality level",
          "Accumulate it and evaluate it with other misstatements, individually and in aggregate",
          "Automatically issue a qualified opinion because an error exists",
          "Treat it as clearly trivial and remove it from the schedule",
        ],
        correct: 1,
        explain: "At $40k the error is above the $10k clearly-trivial threshold, so it must be ACCUMULATED under ISA 450 even though it sits below the $500k materiality level. Individually immaterial items can be material in aggregate. It is not automatically qualified — that depends on the total uncorrected effect versus materiality.",
      },
    },
    {
      id: "events-reps-tcwg",
      heading: "Subsequent events, written representations & reports to TCWG",
      blocks: [
        { kind: "text", md: "Three completion procedures close the file. Each has a hard deadline pinned to the **date of the auditor's report**, and the exam tests those dates." },
        { kind: "text", md: "**Subsequent events (ISA 560).** Between the reporting date and the date the report is signed, the auditor has an **active** duty to perform procedures — enquiry of management, reading later board minutes, reviewing latest management accounts — to identify events needing adjustment or disclosure under **IAS 10**. After signing, the duty turns **passive**: no obligation to search, but if a material fact is handed to the auditor before the statements are issued, they must act. If management amends the statements, the auditor extends procedures and **re-dates** (or dual-dates) the report; if management refuses to amend a material item, the auditor **modifies the opinion**." },
        { kind: "text", md: "**Written representations (ISA 580).** For matters that cannot be corroborated by external evidence — management's **intentions**, and confirmation that the auditor has been given everything — the auditor obtains a signed representation letter, dated as near as practicable to but **not after** the report date. Two representations are **always** required: that management has fulfilled its **responsibility for preparation** of the statements, and that it has provided **all relevant information and access**. Representations are **necessary but never sufficient** evidence; refusal of a required representation casts doubt on management's integrity and can itself force a **disclaimer**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The completion sequence before the opinion",
          caption: "Ordered work, each step feeding the final judgement.",
          data: {
            steps: [
              { label: "Final analytical review", sub: "Overall conclusion: are the statements consistent with our understanding?" },
              { label: "Evaluate misstatements", sub: "ISA 450 — aggregate corrected/uncorrected vs materiality" },
              { label: "Subsequent events & going concern", sub: "ISA 560 / ISA 570 — events and continuity to signing date" },
              { label: "Written representations", sub: "ISA 580 — dated on or before the report date" },
              { label: "Report to TCWG & form opinion", sub: "ISA 260/265 — then sign" },
            ],
          },
        } },
        { kind: "text", md: "**Reports to those charged with governance.** Before or around signing, the auditor communicates with governance under **ISA 260**: the auditor's responsibilities, the planned scope and timing, and — most examined — **significant findings**, including significant difficulties, disagreements with management, and significant qualitative aspects of accounting practices. For **listed** entities the auditor also confirms **independence**. Separately, **ISA 265** requires **significant deficiencies in internal control** identified during the audit to be communicated **in writing** on a timely basis. This is a by-product report, not an assurance opinion on controls." },
        { kind: "callout", tone: "rule", title: "Two governance letters, two ISAs", md: "**ISA 260** communicates the audit's significant findings and, for listed clients, independence. **ISA 265** communicates significant **control deficiencies** in writing. Neither expresses assurance on internal control — the auditor only reports deficiencies noticed while auditing the financial statements." },
      ],
    },
    {
      id: "forming-opinion",
      heading: "Forming the opinion & the ISA 705 matrix",
      blocks: [
        { kind: "text", md: "The opinion is not a mood — it is the conclusion of a defined test under **ISA 700**. The auditor concludes whether **reasonable assurance** has been obtained that the statements as a whole are free from material misstatement, whether they have been prepared in accordance with the applicable framework, and whether they achieve **fair presentation**. Only if all of that holds is the opinion **unmodified**: the statements give a **true and fair view** (or **present fairly, in all material respects**). The modern report leads with the **Opinion** section, immediately followed by **Basis for Opinion**." },
        { kind: "text", md: "When the statements are **not** clean, **ISA 705** reduces the decision to a disciplined two-by-two. **Question 1 — what is the problem?** Either there is a **material misstatement** (something is wrong in the statements), or the auditor was **unable to obtain sufficient appropriate evidence** (a limitation — something could not be checked). **Question 2 — how far does it reach?** Either it is **material but not pervasive** (confined to one area), or it is **pervasive**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The ISA 705 opinion matrix",
          caption: "Read down for the nature of the problem, across for how far it spreads. Reproduce it cold.",
          data: {
            leftTitle: "Material but NOT pervasive",
            rightTitle: "PERVASIVE",
            rows: [
              { aspect: "Material misstatement (something is wrong)", left: "Qualified opinion — \"except for\"", right: "Adverse opinion" },
              { aspect: "Unable to obtain sufficient appropriate evidence (limitation of scope)", left: "Qualified opinion — \"except for\"", right: "Disclaimer of opinion" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "The four cells — exactly", md: "Misstatement, not pervasive → **Qualified**. Misstatement, pervasive → **Adverse**. Cannot obtain evidence, not pervasive → **Qualified**. Cannot obtain evidence, pervasive → **Disclaimer**. Two cells are 'Qualified'; the split between them is always **pervasiveness**." },
        { kind: "text", md: "**Pervasive** has a precise, examinable meaning: effects that are **not confined** to specific elements, accounts or items; or, if confined, that represent or could represent a **substantial proportion** of the statements; or that relate to a disclosure **fundamental** to users' understanding. One wrong provision is rarely pervasive; understatements that ripple through the whole balance sheet, or missing records for an entire subsidiary, usually are." },
        { kind: "example", title: "Worked opinion decision — refusal to consolidate a subsidiary", scenario: "A parent excludes a material subsidiary from consolidation, arguing it is 'too different'. Under the framework it must be consolidated. Its assets, revenue and results would touch every primary statement. Materiality is $600k; the subsidiary's figures dwarf it. Management will not change.", steps: [
          { label: "Nature of problem", detail: "The statements are wrong — a material MISSTATEMENT (a framework breach), not a limitation of scope." },
          { label: "Size vs materiality", detail: "The omitted amounts far exceed $600k — clearly material." },
          { label: "Pervasive?", detail: "Non-consolidation distorts assets, liabilities, revenue and profit across all statements — effects are NOT confined to one line. PERVASIVE." },
          { label: "Read the matrix", detail: "Misstatement + pervasive → the top-right cell." },
        ], result: "An ADVERSE opinion — the financial statements do not give a true and fair view because a material subsidiary has been omitted from the group accounts." },
        { kind: "example", title: "Worked opinion decision — no evidence over opening balances", scenario: "A newly appointed auditor cannot obtain evidence over opening inventory (no attendance at the prior count, no reliable alternative). Opening inventory feeds cost of sales and hence profit, but not the closing balance sheet position, which was fully tested. Materiality is $400k; the possible error in profit is well above it but does not affect the statement of financial position.", steps: [
          { label: "Nature of problem", detail: "Nothing is proven wrong — the auditor simply cannot get evidence. LIMITATION OF SCOPE / inability to obtain sufficient appropriate evidence." },
          { label: "Size vs materiality", detail: "The unverifiable effect on this year's profit exceeds $400k — material." },
          { label: "Pervasive?", detail: "It hits the profit figure and related comparatives, but the closing balance sheet is unaffected — confined, NOT pervasive." },
          { label: "Read the matrix", detail: "Inability to obtain evidence + not pervasive → the bottom-left cell." },
        ], result: "A QUALIFIED opinion — 'except for the possible effects of the matter on opening balances and the profit for the year, the financial statements give a true and fair view.'" },
      ],
      check: {
        q: "The statements contain a material misstatement — a legal provision has been omitted — but the effect is confined to one liability line and does not distort the statements as a whole. Which opinion applies?",
        options: [
          "Adverse opinion, because a provision has been omitted",
          "Disclaimer of opinion",
          "Qualified 'except for' opinion",
          "Unmodified opinion with an Emphasis of Matter paragraph",
        ],
        correct: 2,
        explain: "The problem is a material MISSTATEMENT (not a scope limitation), and it is confined to one line — material but NOT pervasive. Misstatement + not pervasive = QUALIFIED 'except for'. Adverse needs pervasiveness; a disclaimer is only for pervasive INABILITY to obtain evidence; an EoM never modifies the opinion.",
      },
    },
    {
      id: "report-enhancements",
      heading: "Going concern, KAM, EoM/OM & other information",
      blocks: [
        { kind: "text", md: "Beyond the opinion itself, several report sections **communicate** without necessarily modifying it. At advanced level the skill is placing each correctly and getting the **interaction** between them right." },
        { kind: "text", md: "**Going concern (ISA 570).** Management assesses whether the entity can continue for at least twelve months; the auditor **evaluates** that assessment and concludes whether a **material uncertainty** exists. The reporting outcome hinges on **disclosure**: a material uncertainty that is **adequately disclosed** keeps the opinion **unmodified** but adds a dedicated **Material Uncertainty Related to Going Concern** section. **Inadequate** disclosure is a misstatement → **qualified or adverse**. Using the going concern basis when it is **inappropriate** (the entity will not continue) → **adverse**." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Report tools that do NOT modify the opinion",
          caption: "Communication, not qualification — mixing these up with a modified opinion is a classic error.",
          data: {
            items: [
              { title: "Material Uncertainty re Going Concern (ISA 570)", sub: "Where a material uncertainty is adequately disclosed — draws attention to the note; opinion stays unmodified" },
              { title: "Key Audit Matters (ISA 701)", sub: "Matters of most significance in a listed-entity audit — how addressed; no separate opinion" },
              { title: "Emphasis of Matter (ISA 706)", sub: "Points at something ALREADY disclosed in the statements that is fundamental to understanding" },
              { title: "Other Matter (ISA 706)", sub: "Points at something NOT in the statements, relevant to the audit, report or auditor's responsibilities" },
            ],
          },
        } },
        { kind: "text", md: "**Key audit matters (ISA 701).** Selected from matters communicated to those charged with governance, KAMs are those that required the **most significant auditor attention** — higher-risk areas, significant judgements, significant transactions or events. They are **required for listed entities**, describe why the matter was significant and how the audit addressed it, and express **no separate opinion**. A KAM is **not** a device to soften a matter that actually warrants a modified opinion or a going concern section — those take priority and the matter is dealt with there, not dressed up as a KAM." },
        { kind: "text", md: "**Emphasis of Matter vs Other Matter (ISA 706).** The dividing line is simple: **Emphasis of Matter** points at something that **is in** the financial statements; **Other Matter** points at something that is **not in** them. Neither changes the opinion. If a matter is the subject of a **modified opinion**, it belongs in **Basis for Opinion**, never in an EoM." },
        { kind: "text", md: "**Other information (ISA 720).** The annual report contains far more than the audited statements — a chairman's statement, a strategic review, KPIs. The auditor does **not** audit that other information but must **read** it and consider whether it is **materially inconsistent** with the audited statements or with the auditor's knowledge. If there is an uncorrected material inconsistency or misstatement of the other information, the auditor describes it in an **Other Information** section — and, if the **other information** is wrong, that does **not** change the audit **opinion** (which is on the statements); but if the audited **statements** are the ones that are wrong, the auditor modifies the opinion instead." },
        { kind: "callout", tone: "key", title: "Order in the report", md: "If both appear, the **Material Uncertainty Related to Going Concern** section precedes **Key Audit Matters**. A material uncertainty is disclosed there, not as an EoM. And a matter driving a modified opinion goes in **Basis for Opinion** — the surrounding sections communicate, they do not carry the verdict." },
      ],
      check: {
        q: "The auditor is finalising a LISTED company's report. There is an adequately disclosed material going concern uncertainty, and the chairman's statement (other information) contains a figure that is materially inconsistent with the audited statements; management refuses to correct the chairman's statement. How should the report reflect these?",
        options: [
          "Qualify the opinion for both the going concern uncertainty and the inconsistency",
          "Unmodified opinion, plus a Material Uncertainty Related to Going Concern section and an Other Information section describing the uncorrected inconsistency",
          "Adverse opinion because two problems exist",
          "Disclaimer of opinion, as the other information cannot be relied upon",
        ],
        correct: 1,
        explain: "Adequate disclosure of a going concern uncertainty keeps the opinion UNMODIFIED with a dedicated section. The inconsistency is in the OTHER INFORMATION, not the audited statements, so under ISA 720 it is described in an Other Information section — it does not change the opinion on the financial statements. Neither issue is a misstatement of the audited statements, so no qualification, adverse or disclaimer arises.",
      },
    },
    {
      id: "other-engagements",
      heading: "The assurance spectrum — reviews, AUP, compilations & PFI",
      blocks: [
        { kind: "text", md: "An audit is only one point on a wider spectrum. AAA candidates must place the **other engagements** correctly, and the single most examined idea is the **level of assurance** each one provides — because the level dictates the wording of the practitioner's conclusion. Assurance comes in three grades: **reasonable**, **limited**, and **none**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Audit vs review — the two assurance engagements",
          caption: "Both give assurance, but at different levels — and therefore in opposite grammar.",
          data: {
            leftTitle: "Audit (ISA)",
            rightTitle: "Review (ISRE 2400 / 2410)",
            rows: [
              { aspect: "Level of assurance", left: "Reasonable (high, not absolute)", right: "Limited (moderate)" },
              { aspect: "Procedures", left: "Full range — tests of control, substantive, external confirmation", right: "Mainly enquiry & analytical procedures" },
              { aspect: "Conclusion form", left: "Positive: \"the statements give a true and fair view\"", right: "Negative: \"nothing has come to our attention...\"" },
              { aspect: "Evidence sought", left: "Sufficient appropriate to reduce risk to low", right: "Enough for limited assurance only" },
            ],
          },
        } },
        { kind: "text", md: "**Reviews (ISRE 2400 / 2410)** provide **limited assurance** and express a **negative** conclusion — the practitioner states that **nothing has come to their attention** to suggest the statements are not prepared, in all material respects, in accordance with the framework. **ISRE 2400** covers reviews of **historical financial statements** by a practitioner who is **not** the entity's auditor; **ISRE 2410** covers reviews of **interim** financial information performed by the entity's **independent auditor**. The negative wording is deliberate: limited work can only justify a limited, negatively framed conclusion." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "Four engagement types by assurance level",
          caption: "As procedures fall away, so does the assurance — and eventually there is none.",
          data: {
            levels: [
              { label: "Audit — reasonable assurance (ISA)", sub: "Positive opinion: true and fair view" },
              { label: "Review — limited assurance (ISRE 2400/2410)", sub: "Negative conclusion: nothing has come to our attention" },
              { label: "Agreed-upon procedures — NO assurance (ISRS 4400)", sub: "Report of factual findings; users draw their own conclusions" },
              { label: "Compilation — NO assurance (ISRS 4410)", sub: "Accountant assembles the information; no conclusion at all" },
            ],
          },
        } },
        { kind: "text", md: "**Agreed-upon procedures (ISRS 4400)** provide **no assurance**. The practitioner performs procedures **agreed in advance** with the client and any specified third parties, and reports the **factual findings** only — for example, 'we traced 40 invoices to despatch notes; 3 had no matching note.' The practitioner draws **no conclusion**; the users of the report evaluate the findings and reach their **own** conclusions. Because the report is restricted to those who agreed the procedures, distribution is limited." },
        { kind: "text", md: "**Compilation (ISRS 4410)** also provides **no assurance**. Here the accountant uses **accounting expertise** (not auditing expertise) to **assist management** in preparing and presenting financial information — collecting, classifying and summarising it. There is no testing, no verification, and no opinion or conclusion. The accountant's report makes clear that no assurance is expressed and that responsibility for the information remains with management." },
        { kind: "text", md: "**Prospective financial information (ISAE 3400).** Forecasts and projections cannot be audited for truth — the future has not happened. Under **ISAE 3400** the practitioner reports **negative assurance on the assumptions** (nothing has come to their attention to suggest the assumptions do not provide a **reasonable basis** for the PFI) and a **positive (reasonable-assurance) opinion** that the PFI is **properly prepared** on the basis of those assumptions and **presented** in accordance with the framework. A mandatory **caveat** warns that actual results will likely differ, because anticipated events frequently do not occur as expected. The broader **ISAE 3000** is the umbrella standard for assurance engagements **other than** audits or reviews of historical financial information, and permits either **reasonable** or **limited** assurance." },
        { kind: "callout", tone: "warn", title: "Match the grammar to the grade", md: "**Reasonable** assurance → **positive** wording ('give a true and fair view'). **Limited** assurance → **negative** wording ('nothing has come to our attention'). **No** assurance → **factual findings** (AUP) or **no conclusion at all** (compilation). Getting the conclusion's grammar wrong is the fastest way to lose marks here." },
      ],
      check: {
        q: "A client asks the firm to perform specified procedures on its payables listing and report exactly what was found, so the client and its bank can each draw their own conclusions. Which engagement is this, and what does the firm express?",
        options: [
          "A review under ISRE 2400, expressing limited assurance",
          "An agreed-upon procedures engagement under ISRS 4400, expressing no assurance — a report of factual findings only",
          "An audit under ISA 700, expressing reasonable assurance",
          "A compilation under ISRS 4410, expressing negative assurance",
        ],
        correct: 1,
        explain: "Performing procedures agreed in advance and reporting only what was found, leaving users to draw their own conclusions, is an agreed-upon-procedures engagement under ISRS 4400. It provides NO assurance — the report states factual findings, not a conclusion. A review gives limited (negative) assurance; an audit gives reasonable assurance; a compilation involves assembling information and also gives no assurance, but it does not perform agreed testing or report findings.",
      },
    },
  ],
  examTraps: [
    { trap: "Ignoring a misstatement because it is individually below materiality.", fix: "ISA 450 requires accumulation of everything above 'clearly trivial'. Individually immaterial items can be material in aggregate, and prior-period uncorrected items still count." },
    { trap: "Believing the subsequent-events search duty continues after the report is signed.", fix: "The ACTIVE duty ends at the report date. After it the duty is PASSIVE: no search, but the auditor must act on any material fact that becomes known before issue." },
    { trap: "Confusing an adverse opinion with a disclaimer.", fix: "Adverse = pervasive MISSTATEMENT. Disclaimer = pervasive INABILITY to obtain evidence. Settle Question 1 (misstatement vs limitation) before Question 2 (pervasive?)." },
    { trap: "Qualifying the opinion for a properly disclosed going concern uncertainty.", fix: "Adequate disclosure keeps the opinion UNMODIFIED — add a Material Uncertainty Related to Going Concern section. Modify only if disclosure is inadequate or the basis is wrong." },
    { trap: "Modifying the audit opinion because the OTHER information is inconsistent.", fix: "Under ISA 720 the opinion is on the financial statements. A wrong chairman's statement is described in an Other Information section; the opinion changes only if the audited statements themselves are misstated." },
    { trap: "Mismatching assurance level to conclusion wording.", fix: "Reasonable → positive opinion; limited (review) → negative 'nothing has come to our attention'; AUP and compilation → no assurance (findings only / no conclusion)." },
  ],
  keyTerms: [
    { term: "Clearly trivial", def: "A threshold far below materiality below which misstatements need not be accumulated because they plainly do not matter even in aggregate; everything above it must be accumulated under ISA 450." },
    { term: "Projected misstatement", def: "The auditor's best estimate of misstatement in a population, extrapolated from errors found in a sample — one of ISA 450's three misstatement types alongside factual and judgemental." },
    { term: "Pervasive", def: "Effects not confined to specific elements, or representing a substantial proportion of the statements, or fundamental to users' understanding — the trigger that pushes a modification from qualified to adverse or disclaimer." },
    { term: "Material Uncertainty Related to Going Concern", def: "A dedicated report section added when a going concern material uncertainty is adequately disclosed; it draws attention to the note without modifying the opinion (ISA 570)." },
    { term: "Key Audit Matters", def: "The matters of most significance in the audit of a listed entity, described under ISA 701 — why significant and how addressed — with no separate opinion expressed on them." },
    { term: "Limited assurance", def: "The moderate assurance provided by a review engagement (ISRE 2400/2410), reported as a negative conclusion: nothing has come to our attention to suggest the statements are materially misstated." },
    { term: "Agreed-upon procedures", def: "An ISRS 4400 engagement giving no assurance: the practitioner performs procedures agreed in advance and reports factual findings, leaving users to draw their own conclusions." },
  ],
  summary: [
    "ISA 450: accumulate all misstatements above 'clearly trivial', classify them factual/judgemental/projected, and evaluate corrected and uncorrected items — individually and in aggregate, with prior-period effects — against materiality.",
    "Complete the file with subsequent events (ISA 560, active then passive duty), written representations (ISA 580, necessary but not sufficient) and reports to TCWG (ISA 260 findings/independence; ISA 265 control deficiencies in writing).",
    "ISA 700 forms the opinion on reasonable assurance and fair presentation; ISA 705 matrix: misstatement not-pervasive → QUALIFIED, pervasive → ADVERSE; insufficient evidence not-pervasive → QUALIFIED, pervasive → DISCLAIMER.",
    "Going concern (ISA 570): adequate disclosure of a material uncertainty keeps the opinion unmodified with a dedicated section; KAM (ISA 701), EoM/OM (ISA 706) and Other Information (ISA 720) communicate without modifying the opinion.",
    "The assurance spectrum: audit = reasonable (positive opinion); review ISRE 2400/2410 = limited (negative conclusion); AUP ISRS 4400 and compilation ISRS 4410 = no assurance; PFI ISAE 3400 = negative assurance on assumptions plus a positive opinion on preparation.",
    "Always match the grammar to the assurance grade — reasonable/positive, limited/negative, none/factual-findings — and keep the verdict in Basis for Opinion, not in a surrounding communication section.",
  ],
}
