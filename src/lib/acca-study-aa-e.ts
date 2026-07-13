import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area E — Review & reporting.
 * Subsequent events (ISA 560), going concern (ISA 570), written representations
 * (ISA 580), overall review & final analytical procedures, the auditor's report
 * (ISA 700), modified opinions (ISA 705), EoM/OM (ISA 706) and KAM (ISA 701).
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const AA_E: StudyChapter = {
  paper: "AA",
  area: "E",
  title: "Review & reporting",
  minutes: 18,
  intro: "All the evidence is gathered — now the auditor has to decide what to say. This final area turns a file of working papers into one sentence that matters: the opinion.",
  outcomes: [
    "Apply ISA 560 to events after the reporting date, including the auditor's active and passive duties",
    "Assess going concern under ISA 570 — indicators, the split of responsibility, and every reporting outcome",
    "Explain the purpose and limits of written representations (ISA 580)",
    "Describe the overall review and final analytical procedures before signing",
    "Name the elements of an unmodified auditor's report (ISA 700)",
    "Choose the correct modified opinion from the ISA 705 matrix and place EoM, OM and KAM paragraphs (ISA 706 / 701)",
  ],
  sections: [
    {
      id: "subsequent-events",
      heading: "Subsequent events — ISA 560",
      blocks: [
        { kind: "text", md: "The reporting date is the last day of the financial year, but the audit does not finish there — it runs on for weeks while the auditor works. Things happen in that gap: a customer goes bust, a warehouse burns down, a court case is settled. **Subsequent events** are events occurring **between the reporting date and the date the auditor's report is signed**, plus facts that come to light even after that. ISA 560 tells the auditor what to do about each of them." },
        { kind: "text", md: "The key link is back to **IAS 10**. An **adjusting** event gives evidence of a condition that already **existed** at the reporting date — so the financial statements must be changed. A **non-adjusting** event arises from a **new** condition after the year end — so it is disclosed, not adjusted, if material. The auditor's job is to check management has classified each event correctly." },
        { kind: "text", md: "The heart of ISA 560 is a change of gear that happens at the **signing date**. Before it, the auditor must **actively search** for events. After it, the auditor has **no duty to search** — but is not off the hook if something is handed to them." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The auditor's duty across the three periods",
          caption: "The duty is at its strongest before the report is signed, then falls away — but never fully disappears while anyone still relies on the statements.",
          data: {
            steps: [
              { label: "Reporting date → signing date", sub: "ACTIVE duty: perform procedures to identify subsequent events" },
              { label: "Signing date → issue to members", sub: "PASSIVE duty: no search, but act on facts that come to you" },
              { label: "After issue to members", sub: "PASSIVE duty: no search, but act on facts that come to you" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Active vs passive", md: "Up to the **date of the auditor's report**, the auditor has an **active** duty to design and perform procedures to identify subsequent events. **After** that date the auditor has **no obligation to search**, but retains a **passive** duty: if a material fact becomes known that would have changed the report, the auditor must act on it." },
        { kind: "text", md: "Typical **active** procedures include enquiring of management about events after the year end, reading the minutes of board and shareholder meetings held after the date, reviewing the latest available interim accounts and budgets, and asking about litigation and unusual accounting estimates. These are the procedures that fill the gap between year end and signing." },
        { kind: "text", md: "If a fact emerges **after** signing but **before** the statements are issued, the auditor discusses it with management. If management **amends** the statements, the auditor extends procedures and **re-dates** (or dual-dates) the report. If management **refuses** to amend a material item, the auditor **modifies the opinion** — because the statements are now misstated." },
      ],
      check: {
        q: "Two weeks after signing the auditor's report but before the statements are issued to members, the auditor learns a major receivable that existed at the year end is irrecoverable and management refuses to adjust it. What should the auditor do?",
        options: [
          "Nothing — the auditor's active duty ended when the report was signed",
          "Withdraw from the engagement immediately without comment",
          "Take action: discuss with management and, if they refuse to amend a material misstatement, modify the opinion",
          "Simply re-date the existing unmodified report to today",
        ],
        correct: 2,
        explain: "After signing the auditor has no duty to SEARCH, but a fact has been handed to them. This is the passive duty. It is an adjusting event (the receivable's condition existed at the year end). Because management refuses to amend a material misstatement, the auditor must modify the opinion — re-dating an unmodified report would be signing off a known error.",
      },
    },
    {
      id: "going-concern",
      heading: "Going concern — ISA 570",
      blocks: [
        { kind: "text", md: "Financial statements are normally prepared on the assumption that the business will keep trading for the **foreseeable future** — at least twelve months from the reporting date. This is the **going concern basis**. If that assumption is wrong, almost every number is wrong too: assets held for use should be restated to what they would fetch in a fire sale, and long-term liabilities become current. So the auditor must satisfy themselves the assumption holds." },
        { kind: "text", md: "Responsibility is **split**, and the exam loves testing the split. **Management** must **assess** whether the entity is a going concern and choose the basis of preparation. The **auditor** must **evaluate** management's assessment and conclude whether a **material uncertainty** exists — the auditor does not make the assessment, they challenge it." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Who does what",
          data: {
            leftTitle: "Management's responsibility",
            rightTitle: "Auditor's responsibility",
            rows: [
              { aspect: "Core task", left: "Assess whether the entity can continue", right: "Evaluate management's assessment" },
              { aspect: "Horizon", left: "At least 12 months from reporting date", right: "Cover the same period, plus events beyond" },
              { aspect: "Output", left: "Choose the basis; disclose uncertainties", right: "Conclude if a material uncertainty exists" },
              { aspect: "Judgement", left: "Prepare the statements", right: "Challenge, obtain evidence, report" },
            ],
          },
        } },
        { kind: "text", md: "The auditor watches for **indicators** that cast doubt. **Financial** indicators include net liabilities, recurring losses, net cash outflows, defaulting on loan covenants, and inability to pay creditors as they fall due. **Operating** indicators include losing a key customer, supplier or licence, key staff leaving, and legal proceedings that could cripple the business. **Other** indicators include pending legislation or an uninsured catastrophe. No single indicator is fatal — the auditor weighs them together and looks for **mitigating factors** such as a committed bank facility." },
        { kind: "callout", tone: "warn", title: "\"Material uncertainty\" is a term of art", md: "A material uncertainty exists when events cast **significant doubt** on going concern but the entity is **not yet** unable to continue. It is not the same as concluding the business will fail — and how it is **disclosed** decides whether the opinion stays clean." },
        { kind: "text", md: "The **reporting outcomes** flow from two questions: is the going concern basis **appropriate**, and is any material uncertainty **adequately disclosed**?" },
        { kind: "table", caption: "ISA 570 — the four reporting outcomes", head: ["Situation", "Report outcome"], rows: [
          ["Going concern basis appropriate, no material uncertainty", "Unmodified opinion, no extra paragraph"],
          ["Material uncertainty exists AND is adequately disclosed", "Unmodified opinion + a separate \"Material Uncertainty Related to Going Concern\" section"],
          ["Material uncertainty exists but disclosure is inadequate", "Modified opinion — qualified or adverse (a misstatement)"],
          ["Going concern basis used but is inappropriate (entity will not continue)", "Adverse opinion"],
        ] },
        { kind: "callout", tone: "key", title: "The clean-report trap", md: "A material uncertainty that is **properly disclosed** does **not** taint the opinion — the opinion stays **unmodified**; the auditor simply adds a **Material Uncertainty Related to Going Concern** section drawing attention to the disclosure. The opinion is only modified when the **disclosure is missing or inadequate**, or the **basis itself is wrong**." },
      ],
      check: {
        q: "A company faces significant going concern doubt. Management has prepared the accounts on the going concern basis, which the auditor agrees is still appropriate, and has FULLY disclosed the material uncertainty in the notes. What opinion should the auditor give?",
        options: [
          "An adverse opinion, because the doubt is significant",
          "A qualified 'except for' opinion",
          "An unmodified opinion, with a 'Material Uncertainty Related to Going Concern' section",
          "A disclaimer of opinion",
        ],
        correct: 2,
        explain: "Adequate disclosure of a material uncertainty keeps the opinion UNMODIFIED. The auditor adds a separate 'Material Uncertainty Related to Going Concern' section to highlight the note. A modified opinion would only follow if the disclosure were inadequate or the going concern basis itself were inappropriate.",
      },
    },
    {
      id: "representations-review",
      heading: "Written representations & the overall review",
      blocks: [
        { kind: "text", md: "Some things cannot be audited by looking at documents — management's **intentions**, or a confirmation that they have told the auditor everything. For these the auditor obtains **written representations** under **ISA 580**: a letter signed by management confirming their responsibilities and specific assertions. It is dated as near as practicable to, but **not after**, the date of the auditor's report." },
        { kind: "callout", tone: "rule", title: "Representations complement — they never replace", md: "Written representations are **necessary** audit evidence but they are **not sufficient on their own**. If other reliable evidence exists, get it. A representation about a $2m provision does not substitute for testing that provision. And if management refuses to provide required representations, that itself may lead to a **disclaimer of opinion**." },
        { kind: "text", md: "Two **mandatory** representations are always requested: that management has fulfilled its **responsibility for the preparation** of the financial statements, and that it has provided the auditor with **all relevant information and access**. Others are requested where judgement or intention is involved — for example that all subsequent events are adjusted or disclosed, or that a legal claim will be defended." },
        { kind: "text", md: "Before signing, the engagement partner steps back for the **overall review**. This includes performing **final analytical procedures** near the end of the audit to form an overall conclusion on whether the statements are consistent with the auditor's understanding of the business. If a relationship looks odd — margins that jump without explanation, a ratio that contradicts what the client said — the auditor must investigate before concluding." },
        { kind: "diagram", diagram: {
          type: "cycle",
          title: "Completing the audit",
          caption: "The last mile before the opinion is formed.",
          data: {
            steps: [
              { label: "Final analytical review" },
              { label: "Evaluate misstatements" },
              { label: "Subsequent events" },
              { label: "Going concern conclusion" },
              { label: "Written representations" },
              { label: "Form the opinion" },
            ],
          },
        } },
        { kind: "text", md: "The auditor also **aggregates uncorrected misstatements** found during the audit and compares them with materiality. Individually trivial errors can add up: if the total, or an individual item, exceeds materiality and management will not correct it, the statements are misstated and the opinion is affected." },
      ],
    },
    {
      id: "unmodified-report",
      heading: "The auditor's report — ISA 700",
      blocks: [
        { kind: "text", md: "The report is the audit's only visible product. **ISA 700** fixes its structure so that any reader anywhere recognises the parts. An **unmodified** opinion — the clean bill of health — states that the financial statements give a **true and fair view** (or 'present fairly, in all material respects') in accordance with the applicable framework." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Elements of an unmodified auditor's report",
          caption: "The Opinion comes FIRST, and the auditor's signature and report date close it.",
          data: {
            items: [
              { title: "Title", sub: "\"Independent Auditor's Report\"" },
              { title: "Addressee", sub: "Usually the shareholders / members" },
              { title: "Opinion", sub: "Stated first: the financial statements give a true and fair view" },
              { title: "Basis for Opinion", sub: "Audit done under ISAs; auditor is independent; evidence sufficient" },
              { title: "Going Concern", sub: "Where relevant, a Material Uncertainty section" },
              { title: "Key Audit Matters", sub: "For listed entities (ISA 701)" },
              { title: "Other Information", sub: "Responsibilities re: the rest of the annual report" },
              { title: "Responsibilities", sub: "Of management/those charged with governance, and of the auditor" },
              { title: "Signature, address, date", sub: "Auditor's signature, location and the report date" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Opinion first", md: "A modern ISA report leads with the **Opinion** section, immediately followed by **Basis for Opinion**. Readers no longer have to hunt to the bottom for the verdict — that ordering is itself examinable." },
      ],
    },
    {
      id: "modified-opinions",
      heading: "Modified opinions — the ISA 705 matrix",
      blocks: [
        { kind: "text", md: "When the statements are **not** clean, the auditor **modifies** the opinion. **ISA 705** reduces the whole decision to two questions, each with two answers — a two-by-two grid every AA candidate must be able to reproduce cold." },
        { kind: "text", md: "**Question 1 — what is the problem?** Either the statements contain a **material misstatement** (something is wrong), or the auditor could **not obtain sufficient appropriate evidence** (a limitation of scope — something could not be checked). **Question 2 — how bad is it?** Either it is **material but not pervasive** (isolated to one area), or it is **pervasive** (it undermines the statements as a whole)." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The ISA 705 opinion matrix",
          caption: "Read down for the nature of the problem, across for how far it spreads.",
          data: {
            leftTitle: "Material but NOT pervasive",
            rightTitle: "PERVASIVE",
            rows: [
              { aspect: "Material misstatement (something is wrong)", left: "Qualified opinion — \"except for\"", right: "Adverse opinion" },
              { aspect: "Unable to obtain sufficient evidence (limitation of scope)", left: "Qualified opinion — \"except for\"", right: "Disclaimer of opinion" },
            ],
          },
        } },
        { kind: "callout", tone: "rule", title: "Learn the four cells exactly", md: "Misstatement, not pervasive → **Qualified**. Misstatement, pervasive → **Adverse**. Cannot obtain evidence, not pervasive → **Qualified**. Cannot obtain evidence, pervasive → **Disclaimer**. Two of the four cells are 'Qualified' — the difference is always **pervasiveness**." },
        { kind: "text", md: "**Pervasive** has a precise meaning: effects that are **not confined** to specific elements, or that **represent a substantial proportion** of the statements, or that relate to a disclosure **fundamental** to users' understanding. A single wrong provision is usually not pervasive; understated liabilities that touch the whole balance sheet, or missing records for a whole year, usually are." },
        { kind: "example", title: "Worked opinion decision — inventory overstatement", scenario: "Inventory is stated at $5m but $1.2m of it is obsolete and worthless. Management refuses to write it down. Materiality is $400k. Total assets are $60m. The error is isolated to the inventory line.", steps: [
          { label: "Nature of problem", detail: "The statements are wrong — a material MISSTATEMENT, not a limitation of scope." },
          { label: "Size vs materiality", detail: "$1.2m overstatement far exceeds $400k materiality, so it is clearly material." },
          { label: "Pervasive?", detail: "It affects only inventory, a specific line — the rest of the statements are fine. NOT pervasive." },
          { label: "Read the matrix", detail: "Misstatement + not pervasive → the top-left cell." },
        ], result: "A QUALIFIED opinion — 'except for the overstatement of inventory, the financial statements give a true and fair view.'" },
        { kind: "example", title: "Worked opinion decision — no evidence over a whole subsidiary", scenario: "The auditor was appointed after the year end and could not attend any inventory count, nor obtain any alternative evidence, for a subsidiary whose assets make up 45% of the group. No other procedure can confirm the inventory.", steps: [
          { label: "Nature of problem", detail: "Nothing is proven wrong — the auditor simply cannot get evidence. This is a LIMITATION OF SCOPE / inability to obtain sufficient appropriate evidence." },
          { label: "How far does it spread?", detail: "It touches 45% of group assets — a substantial proportion of the statements as a whole." },
          { label: "Pervasive?", detail: "Yes — the possible effects are fundamental and not confined to one line. PERVASIVE." },
          { label: "Read the matrix", detail: "Inability to obtain evidence + pervasive → the bottom-right cell." },
        ], result: "A DISCLAIMER of opinion — the auditor does not express an opinion because the possible undetected effects are so material and pervasive." },
      ],
      check: {
        q: "The statements contain a material misstatement (a required provision has been omitted). Its effect is so significant it makes the financial statements as a whole misleading. Which opinion is correct?",
        options: [
          "Qualified 'except for' opinion",
          "Adverse opinion",
          "Disclaimer of opinion",
          "Unmodified opinion with an Emphasis of Matter paragraph",
        ],
        correct: 1,
        explain: "The problem is a material MISSTATEMENT (not a scope limitation), and it is PERVASIVE (it makes the statements as a whole misleading). Misstatement + pervasive = ADVERSE. A disclaimer is only for pervasive INABILITY to obtain evidence; a qualified opinion would apply if the misstatement were NOT pervasive.",
      },
    },
    {
      id: "eom-om-kam",
      heading: "Emphasis of Matter, Other Matter & Key Audit Matters",
      blocks: [
        { kind: "text", md: "Not every extra paragraph in a report is a modification. Three tools let the auditor **communicate** without touching the opinion — and confusing them with a modified opinion is a classic exam error. **ISA 706** covers Emphasis of Matter and Other Matter paragraphs; **ISA 701** covers Key Audit Matters." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Three communication tools — none of them modifies the opinion",
          data: {
            items: [
              { title: "Emphasis of Matter (ISA 706)", sub: "Draws attention to something ALREADY disclosed in the statements that is fundamental to understanding — e.g. a major uncertainty or a subsequent event" },
              { title: "Other Matter (ISA 706)", sub: "Refers to something NOT in the statements that is relevant to understanding the audit, the report or the auditor's responsibilities" },
              { title: "Key Audit Matters (ISA 701)", sub: "The matters of MOST significance in the audit of a listed entity — how they were addressed, but no separate opinion on them" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The dividing line", md: "**Emphasis of Matter** points at something that **is in** the financial statements. **Other Matter** points at something that is **not in** the financial statements. Neither changes the opinion — the opinion above them stays unmodified." },
        { kind: "text", md: "**Key Audit Matters** are selected from matters communicated to those charged with governance and are those that required **most significant auditor attention** — areas of higher risk, significant judgement, or significant events. They are **required for listed entities** and describe why the matter was significant and how the audit addressed it. Common KAMs include revenue recognition, goodwill impairment, valuation of financial instruments, and significant provisions. A KAM is **not** a substitute for a modified opinion or for a going concern section — those take priority." },
        { kind: "text", md: "Order matters in the report. If a **Material Uncertainty Related to Going Concern** section and **Key Audit Matters** both appear, the going concern section comes first; and if a matter is the subject of a **modified opinion**, it is dealt with in Basis for Opinion, **not** dressed up as an Emphasis of Matter." },
      ],
    },
  ],
  examTraps: [
    { trap: "Thinking the auditor's duty to search for subsequent events continues after the report is signed.", fix: "The ACTIVE search duty ends at the signing date. After it the duty is PASSIVE: no search, but act on any material fact that becomes known." },
    { trap: "Modifying the opinion for a going concern uncertainty that has been properly disclosed.", fix: "Adequate disclosure keeps the opinion UNMODIFIED — you add a 'Material Uncertainty Related to Going Concern' section, not a qualification." },
    { trap: "Confusing a disclaimer with an adverse opinion.", fix: "Disclaimer = pervasive INABILITY to obtain evidence. Adverse = pervasive MISSTATEMENT. Check which of the two questions is the problem first." },
    { trap: "Treating written representations as sufficient evidence on their own.", fix: "They complement other evidence, never replace it. Where better evidence exists, obtain it." },
    { trap: "Calling an Emphasis of Matter paragraph a modified opinion.", fix: "EoM, Other Matter and KAM do NOT modify the opinion. Only ISA 705 qualified/adverse/disclaimer opinions are modifications." },
    { trap: "Jumping straight to 'qualified' without testing pervasiveness.", fix: "Two of the four ISA 705 cells are 'Qualified'. Always ask 'is it pervasive?' — pervasiveness pushes you to adverse or disclaimer." },
  ],
  keyTerms: [
    { term: "Subsequent events", def: "Events between the reporting date and the date of the auditor's report, plus facts discovered after — governed by ISA 560 and classified via IAS 10." },
    { term: "Material uncertainty (going concern)", def: "Events casting significant doubt on the entity's ability to continue; if adequately disclosed, the opinion stays unmodified with a dedicated section." },
    { term: "Written representations", def: "Management's signed confirmations of its responsibilities and specific assertions — necessary evidence under ISA 580, but not sufficient alone." },
    { term: "Pervasive", def: "Effects not confined to specific elements, or a substantial proportion of the statements, or fundamental to users' understanding — the trigger for adverse or disclaimer." },
    { term: "Modified opinion", def: "A qualified, adverse or disclaimer of opinion under ISA 705, given when statements are materially misstated or evidence is insufficient." },
    { term: "Key Audit Matters", def: "Matters of most significance in the audit of a listed entity, described under ISA 701 without expressing a separate opinion on them." },
  ],
  summary: [
    "ISA 560: the auditor has an ACTIVE duty to search for subsequent events up to the signing date, then only a PASSIVE duty to act on facts that emerge.",
    "ISA 570: management assesses going concern, the auditor evaluates; adequate disclosure of a material uncertainty keeps the opinion unmodified with a dedicated section.",
    "ISA 580: written representations are necessary but never sufficient evidence — refusal of required representations can lead to a disclaimer.",
    "ISA 700: an unmodified report leads with the Opinion, then Basis for Opinion, and closes with signature, address and date.",
    "ISA 705 matrix: misstatement not-pervasive → QUALIFIED, pervasive → ADVERSE; insufficient evidence not-pervasive → QUALIFIED, pervasive → DISCLAIMER.",
    "ISA 706 / 701: Emphasis of Matter (in the statements), Other Matter (outside them) and Key Audit Matters all communicate without modifying the opinion.",
  ],
}
