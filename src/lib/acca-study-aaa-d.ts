import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AAA · Area D — Planning & conducting an audit.
 * Advanced-level chapter: planning & risk, judgemental areas (ISA 540/570/550),
 * group audits (ISA 600), using an expert (620) and internal audit (610),
 * complex transactions, forensic work, and the other-assurance / ISAE suite.
 * 100% original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const AAA_D: StudyChapter = {
  paper: "AAA",
  area: "D",
  title: "Planning & conducting an audit",
  minutes: 18,
  intro: "At Advanced level the audit is won or lost at the planning table. The skill is no longer 'audit receivables' — it is spotting where an estimate, a group, or a forecast hides the risk, and designing a response the marker can see.",
  outcomes: [
    "Distinguish business risk from the risk of material misstatement and explain how one feeds the other",
    "Design audit responses for estimates and fair values (ISA 540), going concern (ISA 570) and related parties (ISA 550)",
    "Apply ISA 600 to a group audit — component auditors, and group vs component materiality",
    "Evaluate and use the work of an auditor's expert (ISA 620) and internal audit (ISA 610)",
    "Approach complex transactions — financial instruments, share-based payment, pensions, revenue, provisions",
    "Explain forensic engagements and the other-assurance suite — ISAE 3000, 3400 and 3402 — and due diligence",
  ],
  sections: [
    {
      id: "planning-risk",
      heading: "Planning & risk: business risk vs the risk of material misstatement",
      blocks: [
        { kind: "text", md: "Two words dominate AAA planning, and confusing them costs marks in every diet. **Business risk** is the risk that an event, condition or decision stops the entity from achieving its **objectives** — a lost contract, a covenant breach, a technology shift, a new competitor. It is the **client's** problem, and it exists whether or not there is an audit. The **risk of material misstatement (ROMM)** is narrower: the risk that the **financial statements** are materially wrong **before** the auditor touches them. It is the **auditor's** problem, and it lives at two levels — the overall financial-statement level and the individual assertion level." },
        { kind: "text", md: "The exam-winning move is to see the **bridge** between them. A business risk becomes an audit risk only when it has a route into a number or a disclosure. Falling demand (business risk) threatens **going concern** — that is a ROMM in the going-concern **disclosures**. A rushed overseas expansion (business risk) creates unfamiliar transactions the client may **misclassify** — that is a ROMM at the **assertion** level for the relevant balances. Name the business risk, then always answer the follow-up: *so which assertion in which balance could now be wrong?*" },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Business risk vs the risk of material misstatement",
          caption: "Different owners, different scope — but business risk is a leading cause of ROMM.",
          data: {
            leftTitle: "Business risk",
            rightTitle: "Risk of material misstatement",
            rows: [
              { aspect: "Whose risk", left: "The entity's — it threatens objectives", right: "The auditor's — it threatens the opinion" },
              { aspect: "Scope", left: "The whole business: strategy, markets, operations", right: "Only what could misstate the financial statements" },
              { aspect: "Level", left: "Enterprise-wide", right: "FS level and assertion level" },
              { aspect: "Made of", left: "Financial, operational, compliance events", right: "Inherent risk x control risk" },
              { aspect: "Exam use", left: "Evaluate in a business-review context", right: "Drives the design of audit procedures" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The bridge", md: "Every ROMM you raise should trace back to a cause. The strongest AAA answers read: **business risk → the account/disclosure it touches → the assertion at risk → the audit response.** A business risk with no route into the numbers earns no audit-risk marks." },
        { kind: "text", md: "AAA also expects **significant risks** to be flagged — risks requiring special audit consideration because they involve **fraud, significant judgement, unusual or related-party transactions, or high estimation uncertainty**. Revenue recognition is presumed a significant risk, and management override of controls is always one. For every significant risk the auditor must obtain an understanding of relevant controls and cannot rely on analytical procedures alone." },
      ],
      check: {
        q: "A manufacturer's largest customer, giving 40% of revenue, has just entered administration. In audit-planning terms, this is BEST described as:",
        options: [
          "Only a business risk, with no audit consequence",
          "A business risk that creates ROMM over going concern and the recoverability of receivables",
          "A significant risk of fraud in revenue",
          "A control risk in the sales cycle",
        ],
        correct: 1,
        explain: "The customer collapse is first a business risk — it threatens the entity's survival. But it crosses the bridge into ROMM in two places: going concern (the disclosure and basis of preparation) and the valuation/recoverability of the amount owed by that customer. It is not primarily a fraud or control-cycle point, so those framings miss the substance.",
      },
    },
    {
      id: "estimates-gc",
      heading: "Judgemental areas I — estimates, fair values & going concern",
      blocks: [
        { kind: "text", md: "Estimates are where the audit gets hard, because there is no invoice to agree to. **ISA 540 (Revised)** treats every estimate as sitting on a spectrum of **inherent risk** driven by three forces: **estimation uncertainty**, **complexity**, and **subjectivity** — plus a standing alertness to **management bias**. The higher an estimate sits on that spectrum, the more persuasive the evidence must be. Fair values (IFRS 13) are simply estimates with a market lens, and the further you move from a quoted price (Level 1) toward unobservable inputs (Level 3), the greater the uncertainty and the audit effort." },
        { kind: "text", md: "ISA 540 gives three routes to evidence, and strong answers pick the one that fits the estimate: **(1)** test how **management** made the estimate — the method, assumptions and data; **(2)** develop the **auditor's own** point estimate or range and compare; or **(3)** use **events after the reporting date** that confirm the outcome (for example, a receivable paid, or inventory sold, after year end). The auditor must also stand back and evaluate whether the estimates as a whole show signs of **one-directional** management bias." },
        { kind: "callout", tone: "rule", title: "ISA 570 — going concern", md: "Management assess the entity's ability to continue as a going concern for **at least twelve months** from the reporting date. The auditor evaluates that assessment, stays alert for events **after** it, and where a **material uncertainty** exists, judges whether the disclosure is adequate." },
        { kind: "text", md: "The going-concern reporting outcomes are a favourite AAA marks-grab, so learn the decision cleanly. If a **material uncertainty** exists and is **adequately disclosed**, the opinion is **unmodified** but the report carries a **'Material Uncertainty Related to Going Concern'** section. If the uncertainty exists but is **not adequately disclosed**, the opinion is **qualified or adverse** (a disclosure misstatement). If the going-concern **basis itself is inappropriate** — the entity is not a going concern — and the accounts are still prepared on that basis, the opinion is **adverse**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Going concern — from assessment to opinion",
          caption: "ISA 570: the same facts drive very different reports depending on disclosure.",
          data: {
            steps: [
              { label: "Identify indicators", sub: "Financial, operating, other" },
              { label: "Evaluate management's assessment", sub: "At least 12 months" },
              { label: "Material uncertainty?", sub: "Casts significant doubt" },
              { label: "Disclosed adequately?", sub: "Nature + management plans" },
              { label: "Report outcome", sub: "MURGC / qualified / adverse" },
            ],
          },
        } },
        { kind: "table", caption: "Going-concern indicators to cite in a risk answer", head: ["Financial", "Operating", "Other"], rows: [
          ["Net liabilities or net current liabilities", "Loss of key management or a major market", "Non-compliance with capital or statutory rules"],
          ["Loan defaults or breached covenants", "Loss of a principal supplier, licence or franchise", "Pending legal action that could cripple the entity"],
          ["Adverse key ratios; inability to refinance", "Labour difficulties or shortages of key supplies", "Uninsured or underinsured catastrophes"],
        ] },
      ],
      check: {
        q: "A client faces a material going-concern uncertainty. The directors describe it fully and fairly in the notes. The auditor concludes the disclosure is adequate. The appropriate report is:",
        options: [
          "A qualified 'except for' opinion",
          "An adverse opinion",
          "An unmodified opinion with a 'Material Uncertainty Related to Going Concern' section",
          "A disclaimer of opinion",
        ],
        correct: 2,
        explain: "When a material uncertainty is adequately disclosed, the financial statements are not misstated — so the opinion stays unmodified. ISA 570 then requires a separate 'Material Uncertainty Related to Going Concern' section to draw the reader's attention to the note. A modified opinion would only follow if the disclosure were inadequate or the going-concern basis itself were wrong.",
      },
    },
    {
      id: "related-parties-complex",
      heading: "Judgemental areas II — related parties & complex transactions",
      blocks: [
        { kind: "text", md: "**ISA 550** exists because related-party transactions can look ordinary yet be anything but. They may not be at **arm's length**, they are a classic route for **fraudulent** financial reporting and management override, and IAS 24 demands **disclosure** whether or not a price changed hands. The core risk is the **completeness** of related-party identification: the auditor must understand the relationships and controls, then stay alert throughout for the **undisclosed** party — a company owned by a director's spouse, a 'consultancy' that is really the CEO. Transactions **outside the normal course of business** with related parties are treated as significant risks." },
        { kind: "text", md: "Complex transactions are the other place AAA tests judgement, because the accounting standard drives the audit risk. You are not expected to re-learn SBR, but you must know **where the estimate or judgement bites** and what evidence answers it:" },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Complex transactions — where the audit risk really sits",
          caption: "Each is a judgement-heavy area; the response follows the assumption, not the paperwork.",
          data: {
            items: [
              { title: "Financial instruments", sub: "Valuation of Level 2/3 fair values; hedge documentation; expected credit losses (IFRS 9)" },
              { title: "Share-based payment", sub: "Option-pricing model inputs, volatility and vesting assumptions (IFRS 2)" },
              { title: "Pensions", sub: "Actuarial assumptions — discount rate, mortality, inflation (IAS 19); an expert is usually needed" },
              { title: "Revenue", sub: "Presumed significant risk; cut-off, performance obligations, variable consideration (IFRS 15)" },
              { title: "Provisions", sub: "Existence of an obligation and the estimate; management bias in timing (IAS 37)" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Turn a standard into a procedure", md: "For any complex balance, name the **assumption** that drives it and then test the assumption, not the arithmetic. For a pension it is the **discount rate and mortality**; for share-based payment it is **volatility and the vesting period**; for a provision it is whether a **present obligation** exists at all. That is the difference between a pass answer and a fail." },
        { kind: "example", title: "Worked example — auditing a warranty provision", scenario: "A car-parts manufacturer recognises a $6m warranty provision, up from $2m last year despite flat sales. The directors attribute the rise to a new three-year warranty on a product launched mid-year. How do you audit this?", steps: [
          { label: "Assess the risk", detail: "A provision is a judgemental estimate (ISA 540) and the sharp, sales-independent rise is an indicator of possible management bias — flag it as a significant risk." },
          { label: "Test the obligation", detail: "Confirm a present obligation exists under IAS 37: obtain the warranty terms and confirm the constructive/legal promise to customers." },
          { label: "Challenge the assumptions", detail: "Recompute the provision using the client's claim rate and average repair cost; agree the claim rate to historical warranty data and post-year-end actual claims." },
          { label: "Look for bias", detail: "Compare with prior-year adequacy — were past provisions over- or under-stated? A pattern of over-provision may signal profit smoothing." },
          { label: "Evaluate disclosure", detail: "Check the IAS 37 disclosure — nature, expected timing and the uncertainties — is complete and consistent with the evidence." },
        ], result: "The audit does not accept the $6m; it tests the claim rate and repair-cost assumptions that build it, corroborates them with actual post-year-end claims, and evaluates whether the movement reflects a genuine change or management bias." },
      ],
    },
    {
      id: "group-audits",
      heading: "Group audits — ISA 600",
      blocks: [
        { kind: "text", md: "**ISA 600 (Revised)** governs the audit of group financial statements, and its central idea is **direction and supervision**: the **group engagement partner** carries sole responsibility for the group opinion, even where **component auditors** — separate firms auditing subsidiaries, divisions or locations — perform much of the work. The group team must be **involved** in the component auditors' work in proportion to risk: understanding them, communicating the significant risks and materiality to apply, reviewing their findings, and evaluating the sufficiency of the evidence obtained across the whole group." },
        { kind: "text", md: "The revised standard is **risk-based**: rather than mechanically labelling components 'significant' or not, the group team scopes its work by where the **risks of material misstatement** in the group statements actually lie, and decides for each component whether to perform a **full audit**, an audit of **specified balances**, **specified procedures**, or group-level analytical procedures. The group team also evaluates whether it can be **involved enough** to rely on a component auditor at all." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The group audit process (ISA 600 Revised)",
          caption: "One opinion, many auditors — held together by the group engagement team.",
          data: {
            steps: [
              { label: "Understand the group", sub: "Structure, components, consolidation" },
              { label: "Set group materiality", sub: "For the group as a whole" },
              { label: "Scope by risk", sub: "Where do the ROMMs sit?" },
              { label: "Direct component auditors", sub: "Communicate risks + materiality" },
              { label: "Review & evaluate", sub: "Sufficiency of group evidence" },
              { label: "Consolidation & opinion", sub: "Adjustments, eliminations, report" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Group vs component materiality", md: "**Group materiality** is set for the group financial statements as a whole. **Component materiality** must be set **lower** than group materiality — because uncorrected misstatements in several components **aggregate**. **Component performance materiality** is set lower still, to reduce this **aggregation risk** to an appropriately low level. Component materiality is never simply group materiality split pro-rata." },
        { kind: "text", md: "Two classic AAA scenarios: a **newly acquired** subsidiary (opening balances and fair-value-at-acquisition are unaudited by the group team — a significant risk), and a component audited by a **different firm** whose competence and independence the group team must evaluate before placing reliance. If the group team **cannot be involved enough** in a material component's audit and cannot perform the work itself, there may be a **limitation on scope** leading to a qualified or disclaimer of opinion." },
      ],
      check: {
        q: "Why must component materiality be set LOWER than materiality for the group financial statements as a whole?",
        options: [
          "Because component auditors are less experienced than the group team",
          "To reduce aggregation risk — immaterial misstatements across several components can add up to a material group misstatement",
          "Because IFRS requires subsidiaries to use prudent estimates",
          "So the group audit costs more and covers the fee",
        ],
        correct: 1,
        explain: "If each component were audited only to group materiality, a string of individually 'immaterial' misstatements could aggregate into a material misstatement of the group figures. Setting component materiality (and, lower still, component performance materiality) below group materiality builds in headroom for that aggregation. It is a mathematical control, not a comment on the component auditor's skill.",
      },
    },
    {
      id: "using-others",
      heading: "Using the work of others — experts (ISA 620) & internal audit (ISA 610)",
      blocks: [
        { kind: "text", md: "No auditor can be an actuary, a geologist and a property valuer at once, so **ISA 620** lets the auditor use an **auditor's expert** — an individual or firm with expertise in a field other than accounting or auditing, engaged to help obtain evidence. Distinguish this from a **management's expert**, whose work supports the financial statements themselves (in which case the auditor evaluates that expert's work as audit evidence). Before relying on an auditor's expert, evaluate their **competence, capabilities and objectivity**, understand their field enough to review the work, and agree the scope. Crucially, the auditor retains **sole responsibility** for the opinion and does **not** refer to the expert in an unmodified report." },
        { kind: "text", md: "**ISA 610** lets the external auditor make use of an **internal audit function** in two distinct ways, and AAA expects you to keep them apart: **using the work** the internal auditors have already done, and obtaining **direct assistance** — using internal auditors to perform audit procedures under the external auditor's direction. Both require the external auditor to evaluate the function's **objectivity**, its **competence**, and whether it applies a **systematic and disciplined approach** including quality control." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Auditor's expert (620) vs internal audit (610)",
          caption: "Both extend the audit team's reach — but the evaluation criteria differ.",
          data: {
            leftTitle: "Auditor's expert — ISA 620",
            rightTitle: "Internal audit — ISA 610",
            rows: [
              { aspect: "Who", left: "Specialist outside accounting (actuary, valuer)", right: "The entity's own internal audit function" },
              { aspect: "Evaluate", left: "Competence, capabilities, objectivity", right: "Objectivity, competence, systematic & disciplined approach" },
              { aspect: "How used", left: "Provide expertise to obtain evidence", right: "Use their work, or direct assistance" },
              { aspect: "Limits", left: "Understand field enough to review output", right: "Not for high judgement / high ROMM; direct assistance banned in some jurisdictions" },
              { aspect: "Responsibility", left: "Auditor retains sole responsibility", right: "Auditor retains sole responsibility" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The limits that get tested", md: "The external auditor can **never** delegate judgement. ISA 610 forbids using internal audit — and especially **direct assistance** — for work involving **significant judgement**, **high risks of material misstatement**, or areas where internal audit's **objectivity** is threatened (for example, auditing a function they helped design). More reliance on others is permitted only as their objectivity and competence rise and the risk falls." },
      ],
    },
    {
      id: "forensic-other-assurance",
      heading: "Forensic work, other assurance & due diligence",
      blocks: [
        { kind: "text", md: "Not every engagement is a statutory audit, and AAA increasingly tests the neighbours. A **forensic engagement** applies accounting, auditing and investigative skill to a legal problem — most often **fraud**: establishing whether it happened, **quantifying the loss**, identifying who was responsible, and gathering evidence that will survive a courtroom, where the accountant may act as an **expert witness**. It is not an audit: there is no opinion on financial statements, the standard of proof is legal, and the scope is set by the specific dispute. Related **due diligence** work investigates a **target** before an acquisition — financial, operational, commercial, tax and legal — to give an acquirer information and, often, limited assurance on the numbers behind the deal." },
        { kind: "text", md: "The **ISAE** suite covers assurance beyond historical financial statements, and you must be able to name the right one. **ISAE 3000** is the umbrella for assurance engagements **other than audits or reviews of historical financial information** — sustainability reports, KPIs, greenhouse-gas and CSR data — offering either **reasonable** or **limited** assurance. **ISAE 3400** covers the examination of **prospective financial information** (forecasts and projections). **ISAE 3402** provides assurance on **controls at a service organisation**, for the benefit of that organisation's customers and their auditors." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The other-assurance toolkit",
          caption: "Match the engagement to the standard — a recurring AAA identification mark.",
          data: {
            items: [
              { title: "ISAE 3000", sub: "Assurance over non-financial subject matter — sustainability, KPIs, CSR. Reasonable or limited." },
              { title: "ISAE 3400", sub: "Prospective financial information — forecasts (best-estimate) and projections (hypothetical)." },
              { title: "ISAE 3402", sub: "Controls at a service organisation — Type 1 (design) and Type 2 (design + operating effectiveness)." },
              { title: "Forensic engagement", sub: "Fraud investigation, loss quantification, expert-witness evidence — no FS opinion." },
              { title: "Due diligence", sub: "Investigate an acquisition target — financial, tax, commercial, legal." },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Why prospective information can never get reasonable assurance", md: "**ISAE 3400**: because forecasts rest on assumptions about the **future**, the auditor cannot obtain the persuasive evidence needed for **reasonable** assurance on the outcome. Instead the report gives **limited (negative) assurance** that nothing suggests the **assumptions** are an unreasonable basis, plus an opinion that the PFI is **properly prepared** on those assumptions and presented per the framework." },
        { kind: "text", md: "Know the two flavours the standards distinguish. A **forecast** is prospective information based on **best-estimate** assumptions (events management expects to occur); a **projection** is based on **hypothetical** assumptions ('what if we opened ten stores') or a mix. For service-organisation reporting, an **ISAE 3402 Type 1** report covers the **design** of controls at a **point in time**, while a **Type 2** report covers both **design and operating effectiveness** across a **period** — a user auditor relying on the service organisation needs Type 2 to gain assurance over the period audited." },
      ],
      check: {
        q: "A company outsources its entire payroll to a bureau. The company's auditor wants assurance that the bureau's controls operated effectively throughout the year. Which report is needed?",
        options: [
          "An ISAE 3400 report on prospective financial information",
          "An ISAE 3402 Type 1 report",
          "An ISAE 3402 Type 2 report",
          "An ISAE 3000 sustainability assurance report",
        ],
        correct: 2,
        explain: "The auditor needs assurance over how the bureau's controls operated across the whole period, not just how they were designed on one day. That is precisely an ISAE 3402 Type 2 report (design AND operating effectiveness over a period). A Type 1 covers design at a point in time only; ISAE 3400 and 3000 address different subject matter entirely.",
      },
    },
  ],
  examTraps: [
    { trap: "Using 'business risk' and 'risk of material misstatement' as if they were the same thing.", fix: "Business risk threatens the entity's objectives; ROMM threatens the financial statements. Always show the bridge — which account and assertion the business risk misstates." },
    { trap: "Modifying the opinion when a material going-concern uncertainty is properly disclosed.", fix: "Adequate disclosure = unmodified opinion PLUS a 'Material Uncertainty Related to Going Concern' section. Modify only if the disclosure is inadequate or the basis itself is wrong." },
    { trap: "Splitting group materiality pro-rata to get component materiality.", fix: "Component materiality is set LOWER than group materiality to absorb aggregation risk; component performance materiality lower still. It is a judgement, not a division sum." },
    { trap: "Referring to the auditor's expert or internal audit in the audit report to share the blame.", fix: "The auditor keeps sole responsibility for the opinion under both ISA 620 and ISA 610; an unmodified report does not mention them." },
    { trap: "Using internal audit or direct assistance for high-judgement, high-risk areas.", fix: "ISA 610 prohibits it where significant judgement or high ROMM is involved, or where internal audit's objectivity is threatened." },
    { trap: "Promising reasonable assurance on a profit forecast.", fix: "ISAE 3400 gives only limited (negative) assurance on the assumptions plus an opinion on proper preparation — future outcomes cannot be reasonably assured." },
  ],
  keyTerms: [
    { term: "Business risk", def: "The risk that conditions, events or decisions prevent an entity from achieving its objectives — broader than, but a leading cause of, audit risk." },
    { term: "Risk of material misstatement", def: "The risk that the financial statements are materially misstated before audit; inherent risk x control risk, assessed at FS and assertion level." },
    { term: "Estimation uncertainty", def: "Susceptibility of an accounting estimate to an inherent lack of precision in measurement — a core ISA 540 risk driver alongside complexity and subjectivity." },
    { term: "Material uncertainty (going concern)", def: "An uncertainty over events that may cast significant doubt on the entity's ability to continue as a going concern (ISA 570)." },
    { term: "Component auditor", def: "An auditor who performs work on the financial information of a group component, under the direction of the group engagement team (ISA 600)." },
    { term: "Component materiality", def: "Materiality for an individual component, set lower than group materiality to reduce aggregation risk across the group." },
    { term: "Prospective financial information", def: "Financial information about the future, based on best-estimate assumptions (a forecast) or hypothetical assumptions (a projection); examined under ISAE 3400." },
  ],
  summary: [
    "Business risk threatens the entity's objectives; ROMM threatens the financial statements — always bridge from one to the account and assertion it misstates.",
    "ISA 540 audits estimates and fair values across a spectrum of uncertainty, complexity and subjectivity; ISA 570 drives the going-concern report; ISA 550 targets undisclosed and non-arm's-length related parties.",
    "ISA 600: the group engagement partner owns the opinion; component materiality is set below group materiality to absorb aggregation risk.",
    "ISA 620 (auditor's expert) and ISA 610 (internal audit) extend the team, but the auditor keeps sole responsibility and cannot delegate significant judgement.",
    "Complex transactions — financial instruments, share-based payment, pensions, revenue and provisions — are audited by testing the underlying assumption, not the arithmetic.",
    "Forensic work, due diligence and the ISAE suite (3000 non-financial, 3400 prospective, 3402 service-organisation controls) are non-audit engagements with their own assurance levels.",
  ],
}
