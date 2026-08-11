import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AA · Area E — review and reporting.
 *
 * The last area of the AA rebuild, and the one every other area exists to
 * reach. It was ONE chapter for E1 to E5: subsequent events, going concern,
 * written representations, finalisation AND the auditor's report with all its
 * modifications. The report alone is a guaranteed exam requirement.
 *
 *   AA-20  Subsequent events and going concern
 *   AA-21  Written representations and finalisation
 *   AA-22  The auditor's report
 *
 * Written against the official ACCA AA syllabus and the ISAs it references.
 */

const AA_TREE_20: StudyChapter = {
  paper: "AA",
  id: "AA-20",
  number: 20,
  area: "E",
  syllabusRefs: ["E1(a)", "E1(b)", "E2(a)", "E2(b)"],
  title: "Subsequent events and going concern",
  minutes: 18,
  intro:
    "Two matters the auditor considers after the year end has closed, and the two most common reasons an opinion gets modified.",
  outcomes: [
    "Distinguish adjusting from non-adjusting subsequent events",
    "Explain the auditor's duty in each of the three periods after the year end",
    "Identify indicators that going concern may be in doubt",
    "Describe going concern procedures and the reporting consequences",
  ],
  sections: [
    {
      id: "subsequent-events",
      heading: "Subsequent events",
      blocks: [
        {
          kind: "table",
          caption: "Adjusting or non-adjusting (IAS 10)",
          head: ["", "Adjusting", "Non-adjusting"],
          rows: [
            ["Test", "Provides evidence of a condition that EXISTED at the year end", "Concerns a condition that AROSE after the year end"],
            ["Treatment", "Amend the financial statements", "Disclose if material; do not amend"],
            ["Examples", "A customer goes bankrupt after the year end, on a debt outstanding at it; inventory sold below cost after the year end; settlement of a court case in progress at the year end", "A fire destroying a warehouse after the year end; a share issue after the year end; a major acquisition announced after the year end"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The test is when the CONDITION existed",
          md: "Not when the event happened. A customer's insolvency after the year end almost always adjusts, because the customer was already in difficulty at the year end — the news simply confirms it. A fire does not, because nothing was wrong with the warehouse at the year end.",
        },
        {
          kind: "table",
          caption: "The auditor's duty, in three periods (ISA 560)",
          head: ["Period", "Duty"],
          rows: [
            ["Year end → date of the auditor's report", "ACTIVE duty: perform procedures to identify subsequent events"],
            ["Date of report → date the statements are issued", "NO duty to perform procedures. But if a fact becomes known that would have changed the report, discuss with management and consider whether the statements need amending"],
            ["After the statements are issued", "NO duty to perform procedures. If such a fact becomes known, consider whether the statements need revising and whether users need informing"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Procedures during the active period",
          items: [
            "**Enquire of management** about events after the year end and about any commitments or contingencies.",
            "**Review minutes** of board, management and shareholder meetings held after the year end.",
            "**Review the latest management accounts**, budgets and cash flow forecasts.",
            "**Enquire of the entity's legal advisers** about litigation and claims.",
            "**Review the after-date cash book and bank statements** for unusual items.",
          ],
        },
      ],
      check: {
        q: "Two months after the year end, a major customer goes into liquidation owing a balance outstanding at the year end. How should this be treated?",
        options: [
          "Non-adjusting — the liquidation happened after the year end",
          "Adjusting — it provides evidence the receivable was already impaired at the year end",
          "No treatment — it is outside the audit period",
          "Disclose only, with no adjustment",
        ],
        correct: 1,
        explain:
          "The test is when the CONDITION existed. The customer's financial difficulties were present at the year end; the liquidation simply confirms the receivable was impaired then. So the allowance is adjusted.",
      },
    },
    {
      id: "going-concern",
      heading: "Going concern",
      blocks: [
        {
          kind: "table",
          caption: "Whose job is what (ISA 570)",
          head: ["Management", "The auditor"],
          rows: [
            ["Assess whether the going concern basis is appropriate", "Obtain sufficient appropriate evidence about the appropriateness of that basis"],
            ["Cover at least twelve months from the reporting date", "Conclude whether a MATERIAL UNCERTAINTY exists"],
            ["Disclose any material uncertainty", "Evaluate whether the disclosure is adequate, and report accordingly"],
          ],
        },
        {
          kind: "list",
          style: "bullet",
          title: "Indicators of doubt",
          items: [
            "**Net liabilities**, or net current liabilities.",
            "Borrowing facilities **near their limit**, close to expiry, or with no realistic prospect of renewal.",
            "**Negative operating cash flows**, or recurring losses.",
            "**Inability to pay suppliers** when due; arrears of dividends.",
            "Loss of a **major customer, supplier, market or licence**.",
            "Significant **pending legal proceedings** that could not be met if lost.",
            "Management **intending to liquidate** or cease trading.",
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Procedures",
          items: [
            "Obtain and review the **cash flow forecast**: cast it, assess whether the assumptions are reasonable, and compare **prior forecasts with actual outcomes** to judge management's forecasting record.",
            "Review **bank correspondence and facility letters** for the amount, expiry and any covenant terms — and test whether covenants are met.",
            "Review the **latest management accounts** and post year-end results against forecast.",
            "Review **board minutes** for discussion of financing and trading difficulties.",
            "Enquire of **legal advisers** about litigation.",
            "Obtain a **written representation** about management's plans and their feasibility.",
          ],
        },
        {
          kind: "table",
          caption: "The reporting outcome — this table is the exam answer",
          head: ["Situation", "Opinion", "Report"],
          rows: [
            ["Going concern appropriate, no material uncertainty", "Unmodified", "Standard report"],
            ["Material uncertainty exists AND is adequately disclosed", "UNMODIFIED", "Add a separate section: \"Material Uncertainty Related to Going Concern\""],
            ["Material uncertainty exists but is NOT adequately disclosed", "Qualified, or adverse if pervasive", "Basis for opinion explains the missing disclosure"],
            ["Going concern basis used but inappropriate — the entity will not continue", "ADVERSE", "The statements are prepared on the wrong basis entirely"],
            ["Management refuses to make or extend its assessment", "Qualified or disclaimer", "Inability to obtain sufficient evidence"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "An adequately disclosed uncertainty does NOT modify the opinion",
          md: "This is the single most common error in AA. If the uncertainty is properly disclosed, the statements are **not misstated** — they tell the truth about a genuine risk. The opinion stays **unmodified** and a separate section draws attention to it. Only inadequate disclosure, or use of the wrong basis, modifies the opinion.",
        },
      ],
      check: {
        q: "A company has a material uncertainty about going concern, and it is fully and clearly disclosed in the notes. What should the auditor's report say?",
        options: [
          "A qualified opinion, 'except for' the uncertainty",
          "An unmodified opinion, with a Material Uncertainty Related to Going Concern section",
          "An adverse opinion",
          "A disclaimer of opinion",
        ],
        correct: 1,
        explain:
          "Adequate disclosure means the statements are not misstated — they correctly report a real uncertainty. The opinion is unmodified, and a separate section draws the reader's attention to the disclosure. Modification arises only if disclosure is inadequate or the basis itself is wrong.",
      },
    },
    {
      id: "forecast-worked",
      heading: "Auditing the cash flow forecast",
      blocks: [
        {
          kind: "text",
          md: "Going concern questions almost always hand you a forecast. The marks are not for reading it — they are for **challenging the assumptions inside it**, which is the one thing management cannot do for you.",
        },
        {
          kind: "example",
          title: "A forecast that does not survive contact",
          scenario:
            "Ravensworth Co's twelve-month forecast shows a closing cash balance of £180,000. It assumes: revenue growth of 25%; receivables days falling from 70 to 45; a £500,000 overdraft renewed in month four; and no capital expenditure.",
          steps: [
            { label: "Revenue growth of 25%", detail: "Compare with actual growth in the last two years and with post year-end management accounts. Growth well above recent history needs support — signed contracts, an order book, a new customer. Without it, the top line of the forecast is an assertion." },
            { label: "Receivables days 70 → 45", detail: "A 25-day improvement while revenue grows 25% is the assumption doing the heaviest lifting, because it releases cash twice over. Ask what specifically changes: new credit control staff, tighter terms, a factoring arrangement? An unexplained improvement is the single most common way a forecast is made to work." },
            { label: "Overdraft renewal in month four", detail: "Inspect the facility letter for the expiry date, the amount and any covenants — and test whether the forecast breaches them. Obtain correspondence with the bank. \"We expect renewal\" is not evidence; the bank's own letter is." },
            { label: "No capital expenditure", detail: "Review board minutes and the asset register. A manufacturer with ageing plant and zero forecast capex has probably deferred spending into the following year, which flatters the forecast without changing the business." },
            { label: "Management's track record", detail: "Compare LAST year's forecast with what actually happened. A management team that has missed every forecast for three years has told you how much weight this one carries." },
          ],
          result:
            "The closing £180,000 depends on four assumptions, two of which (receivables days and the overdraft) each individually exceed it. That is the finding: the forecast does not show headroom, it shows that headroom depends on two things not yet secured — and if the disclosure does not say so, the disclosure is inadequate.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Compare prior forecasts with actual outcomes",
          md: "It is the cheapest procedure in the chapter and the one candidates omit. Management's forecasting record is direct evidence about the reliability of the forecast in front of you, and it requires nothing but last year's file.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Classifying an event by when it happened rather than when the condition arose.", fix: "Adjusting events evidence conditions that existed at the year end." },
    { trap: "Qualifying the opinion for a properly disclosed going concern uncertainty.", fix: "Unmodified opinion plus a Material Uncertainty section." },
    { trap: "Saying the auditor has an active duty to look for events after the report date.", fix: "No duty to perform procedures then — only to act on facts that become known." },
  ],
  keyTerms: [
    { term: "Adjusting event", def: "An event after the reporting date providing evidence of a condition that existed at that date." },
    { term: "Material uncertainty", def: "An uncertainty about going concern significant enough that disclosure is necessary for fair presentation." },
    { term: "Material Uncertainty Related to Going Concern", def: "A separate report section drawing attention to an adequately disclosed going concern uncertainty, without modifying the opinion." },
  ],
  summary: [
    "Adjusting events evidence conditions existing at the year end; non-adjusting events arose after it.",
    "The auditor has an active duty only up to the date of the auditor's report.",
    "Going concern indicators cluster around liquidity, facilities, losses and lost markets.",
    "Procedures centre on the cash flow forecast, bank facilities and management's forecasting record.",
    "A disclosed material uncertainty leaves the opinion UNMODIFIED with a separate section.",
  ],
  knowledgeDiagnostic: [
    { q: "What distinguishes an adjusting from a non-adjusting event?", a: "An adjusting event provides evidence of a condition that already existed at the reporting date; a non-adjusting event concerns a condition arising after it." },
    { q: "Name three going concern procedures.", a: "Review and cast the cash flow forecast and assess its assumptions; review bank facility letters and covenant compliance; compare prior forecasts with actual outcomes. (Also board minutes, legal enquiry, written representation.)" },
    { q: "How is an adequately disclosed material uncertainty reported?", a: "An unmodified opinion, with a separate 'Material Uncertainty Related to Going Concern' section drawing attention to the disclosure." },
    { q: "What opinion is given if the going concern basis is used but is inappropriate?", a: "An adverse opinion — the statements are prepared on a fundamentally wrong basis." },
  ],
  furtherStudy: ["AA-21 covers the representations and reviews that complete the file."],
}

const AA_TREE_21: StudyChapter = {
  paper: "AA",
  id: "AA-21",
  number: 21,
  area: "E",
  syllabusRefs: ["E3(a)", "E3(b)", "E4(a)", "E4(b)"],
  title: "Written representations and finalisation",
  minutes: 15,
  intro:
    "The last evidence gathered, the last review performed, and the decision about misstatements management has refused to correct.",
  outcomes: [
    "Explain the purpose and required content of written representations",
    "Explain their limitations and what to do if management refuses",
    "Describe the final analytical review of the financial statements",
    "Explain how uncorrected misstatements are evaluated",
  ],
  sections: [
    {
      id: "representations",
      heading: "Written representations (ISA 580)",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The two that are always required",
          items: [
            "That management has **fulfilled its responsibility for the preparation** of the financial statements in accordance with the applicable framework.",
            "That it has **provided the auditor with all relevant information and access**, and that **all transactions have been recorded and are reflected** in the statements.",
          ],
        },
        {
          kind: "text",
          md: "Further representations are obtained where they are needed to **support other evidence** about matters that depend on management's intention or knowledge — the completeness of related party transactions, litigation and claims, subsequent events, or plans supporting the going concern basis.",
        },
        {
          kind: "table",
          caption: "Practicalities",
          head: ["Point", "Requirement"],
          rows: [
            ["Form", "Written — normally a letter from management, addressed to the auditor"],
            ["Date", "As near as practicable to, but NOT AFTER, the date of the auditor's report"],
            ["Who signs", "Those with appropriate responsibilities and knowledge — normally the directors"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Representations are weak evidence, and never sufficient alone",
          md: "They come from the party being audited. They **cannot substitute** for evidence the auditor could obtain elsewhere — a representation that inventory is correctly valued is no answer to not having attended the count. Where a matter is capable of independent verification, verify it.",
        },
        {
          kind: "text",
          md: "If management **refuses** to provide a required representation, the auditor discusses the matter, reconsiders management's integrity and the reliability of all other representations and evidence, and takes appropriate action — which for the two required representations means a **disclaimer of opinion**, since their absence casts doubt on everything.",
        },
      ],
      check: {
        q: "The auditor could not attend the year-end inventory count. Management offers a written representation that inventory is fairly stated. Is this sufficient?",
        options: [
          "Yes — a written representation from the directors is audit evidence",
          "No — representations cannot substitute for evidence obtainable elsewhere",
          "Yes, provided it is signed by two directors",
          "Yes, if the amount is below performance materiality",
        ],
        correct: 1,
        explain:
          "Inventory existence and condition are independently verifiable, so a representation is no substitute. The auditor should attend a later count and roll back, or perform alternative procedures; if none suffice, this becomes an inability to obtain evidence and affects the opinion.",
      },
    },
    {
      id: "finalisation",
      heading: "The final review and uncorrected misstatements",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "The overall review",
          items: [
            "Perform **final analytical procedures** and ask whether the statements are consistent with the auditor's understanding of the business.",
            "Confirm the statements **comply with the applicable framework** and that disclosures are adequate.",
            "Check **consistency** between the financial statements and the narrative sections of the annual report.",
            "Confirm the **accounting policies** are appropriate and consistently applied.",
            "For a listed entity, arrange an **engagement quality review** before the report is signed.",
          ],
        },
        {
          kind: "list",
          style: "number",
          title: "Evaluating uncorrected misstatements",
          items: [
            "**Accumulate** all misstatements identified, other than those that are clearly trivial.",
            "**Request that management corrects them.**",
            "If management refuses, evaluate whether they are material **individually OR in aggregate** — several immaterial errors can combine past materiality.",
            "Consider the **qualitative** effect: does the total turn a profit into a loss, breach a covenant, or move a key ratio?",
            "Communicate them to **those charged with governance**, and obtain a written representation about the effect of those left uncorrected.",
            "If the aggregate is material, **modify the opinion**.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Aggregation is the trap",
          md: "Four errors of £30,000 each against materiality of £100,000 are individually immaterial and **collectively £120,000** — material. Assessing them one at a time and concluding \"none is material\" is the mistake performance materiality exists to guard against.",
        },
      ],
      check: {
        q: "Materiality is £80,000. The auditor finds three uncorrected misstatements of £35,000, £30,000 and £25,000, all in the same direction. What should happen?",
        options: [
          "Nothing — each is below materiality",
          "Request correction; if refused, the aggregate of £90,000 is material and the opinion should be modified",
          "Report them in a Key Audit Matters section",
          "Reduce materiality and re-audit",
        ],
        correct: 1,
        explain:
          "They aggregate to £90,000, above materiality. Misstatements are evaluated individually AND in aggregate, so the auditor requests correction and, if refused, modifies the opinion.",
      },
    },
    {
      id: "misstatement-schedule",
      heading: "The schedule of uncorrected misstatements",
      blocks: [
        {
          kind: "example",
          title: "Five items, and the argument with management",
          scenario:
            "Materiality for Winskill Co is £100,000; performance materiality £70,000. Profit before tax is reported as £310,000. The schedule shows: inventory overstated £38,000; a missing accrual £22,000; receivables allowance understated £19,000; a capital item expensed £15,000 (understating profit); and directors' expenses of £4,000 wrongly classified.",
          steps: [
            { label: "Net the same-direction items", detail: "Overstatements of profit: 38 + 22 + 19 = £79,000. The £15,000 capital item runs the OTHER way, so the net overstatement is £64,000." },
            { label: "Against materiality", detail: "£64,000 net against £100,000 — below materiality. Individually all five are below it too." },
            { label: "But consider the aggregate gross", detail: "£94,000 gross. Management may not correct the item that helps them and leave the ones that do not; the auditor evaluates both net and gross before concluding." },
            { label: "Now the qualitative test", detail: "The £4,000 directors' expenses is material BY NATURE regardless of size — it is a specifically disclosable related-party matter. Size does not save it." },
            { label: "The conclusion", detail: "Request correction of all five. Communicate the schedule to those charged with governance and obtain a written representation about the effect of any left uncorrected. The £4,000 must be corrected or disclosed whatever happens to the others." },
            { label: "If profit mattered differently", detail: "Had reported profit been £70,000 rather than £310,000, a £64,000 overstatement would turn a profit into near-breakeven — a qualitative effect that would make it material at a fraction of the same figure." },
          ],
          result:
            "One schedule, four separate judgements: net, gross, by nature, and by effect on a key figure. Answers that compare each item to materiality and stop have performed one of the four.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Do not let management net off selectively",
          md: "An error that increases profit and one that reduces it do offset in the accounts — but management correcting only the favourable one leaves the statements more wrong, not less. Evaluate the schedule as a whole, and say so when recommending.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Accepting a representation instead of obtainable evidence.", fix: "Representations support other evidence; they never replace it." },
    { trap: "Dating representations after the auditor's report.", fix: "As near as practicable to, but not after, the report date." },
    { trap: "Assessing uncorrected misstatements only individually.", fix: "Evaluate individually AND in aggregate, and consider qualitative effects." },
  ],
  keyTerms: [
    { term: "Written representation", def: "A written statement by management confirming certain matters or supporting other audit evidence." },
    { term: "Uncorrected misstatement", def: "A misstatement identified during the audit that management has not corrected." },
    { term: "Engagement quality review", def: "An objective evaluation of significant judgements and the conclusions reached, before the report is issued." },
  ],
  summary: [
    "Two representations are always required: responsibility for the statements, and complete information and access.",
    "They are dated as near as practicable to, but not after, the auditor's report.",
    "They support other evidence and never substitute for what can be verified independently.",
    "The final review covers analytical procedures, framework compliance, disclosures and consistency.",
    "Uncorrected misstatements are evaluated individually and in aggregate, with qualitative effects considered.",
  ],
  knowledgeDiagnostic: [
    { q: "Name the two written representations always required.", a: "That management has fulfilled its responsibility for preparing the financial statements, and that it has provided all relevant information and access and that all transactions are recorded and reflected." },
    { q: "When must written representations be dated?", a: "As near as practicable to, but not after, the date of the auditor's report." },
    { q: "How are uncorrected misstatements evaluated?", a: "Individually and in aggregate against materiality, taking qualitative effects into account; correction is requested, and if refused and the total is material the opinion is modified." },
  ],
  furtherStudy: ["AA-22 is the report itself — the product of everything before it."],
}

const AA_TREE_22: StudyChapter = {
  paper: "AA",
  id: "AA-22",
  number: 22,
  area: "E",
  syllabusRefs: ["E5(a)", "E5(b)", "E5(c)", "E5(d)"],
  title: "The auditor's report",
  minutes: 19,
  intro:
    "Everything in this paper ends here. One table decides which opinion is given, and it is worth learning to the point of reflex.",
  outcomes: [
    "Describe the elements of an unmodified auditor's report",
    "Explain the circumstances giving rise to each type of modified opinion",
    "Distinguish qualified, adverse and disclaimer of opinion",
    "Distinguish an Emphasis of Matter paragraph from a modification",
  ],
  sections: [
    {
      id: "elements",
      heading: "Elements of the report",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "In order (ISA 700)",
          items: [
            "**Title** — Independent Auditor's Report.",
            "**Addressee** — normally the shareholders.",
            "**Opinion** — and it comes FIRST, before the basis.",
            "**Basis for Opinion** — that the audit was conducted under ISAs, that the auditor is independent, and that evidence obtained is sufficient and appropriate.",
            "**Material Uncertainty Related to Going Concern** — where applicable.",
            "**Key Audit Matters** — required for listed entities.",
            "**Other Information** — the auditor's responsibility regarding the rest of the annual report.",
            "**Responsibilities of management and those charged with governance.**",
            "**Auditor's Responsibilities for the Audit of the Financial Statements.**",
            "**Other reporting responsibilities**, where applicable.",
            "**Name of the engagement partner**, signature, auditor's address and the **date**.",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Opinion first — and why it matters",
          md: "The opinion section leads the report so a user cannot miss it. Questions asking you to \"describe the elements\" award marks for the ORDER as well as the content, and putting the basis before the opinion loses them.",
        },
      ],
    },
    {
      id: "modifications",
      heading: "Modified opinions (ISA 705)",
      blocks: [
        {
          kind: "table",
          caption: "The table to know by reflex",
          head: ["Nature of the matter", "Material but NOT pervasive", "Material AND pervasive"],
          rows: [
            ["Financial statements are MATERIALLY MISSTATED", "Qualified opinion — \"except for\"", "ADVERSE opinion — \"do not give a true and fair view\""],
            ["INABILITY TO OBTAIN sufficient appropriate evidence", "Qualified opinion — \"except for\"", "DISCLAIMER — \"we do not express an opinion\""],
          ],
        },
        {
          kind: "definition",
          term: "Pervasive",
          md: "Effects that are **not confined** to specific elements of the statements; or if confined, represent a **substantial proportion** of them; or, for disclosures, are **fundamental** to users' understanding.",
        },
        {
          kind: "illustration",
          title: "The same problem at three sizes",
          md: "**Inventory overstated by £50,000**, materiality £200,000 → immaterial. Unmodified opinion; ask for correction.\n\n**Overstated by £400,000** → material, but confined to one balance. **Qualified** opinion: true and fair *except for* the effect of the inventory misstatement.\n\n**Overstated by £4m out of £5m total assets** → material AND pervasive; the statements as a whole are unreliable. **Adverse** opinion.\n\nThe accounting issue never changed. Only its size and reach did, and that is all the table measures."
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Never write \"qualified adverse\"",
          md: "The four outcomes are distinct: unmodified, qualified, adverse, disclaimer. Combining the words shows the table has not been learned, and it is a frequent way of losing marks that were otherwise earned.",
        },
        {
          kind: "text",
          md: "A modified opinion is always accompanied by a **Basis for Qualified / Adverse Opinion** or **Basis for Disclaimer of Opinion** section, describing the matter and quantifying its effect where practicable.",
        },
      ],
      check: {
        q: "The auditor cannot obtain evidence over a subsidiary representing 70% of group assets. What opinion is appropriate?",
        options: [
          "Qualified — 'except for' the subsidiary",
          "Adverse opinion",
          "Disclaimer of opinion",
          "Unmodified with an Emphasis of Matter paragraph",
        ],
        correct: 2,
        explain:
          "This is an INABILITY TO OBTAIN EVIDENCE (not a misstatement) and at 70% of assets it is PERVASIVE — so a disclaimer. Adverse would be wrong because nothing is known to be misstated; the auditor simply cannot tell.",
      },
    },
    {
      id: "emphasis",
      heading: "Emphasis of Matter and Other Matter (ISA 706)",
      blocks: [
        {
          kind: "table",
          caption: "Neither is a modification",
          head: ["", "Emphasis of Matter", "Other Matter"],
          rows: [
            ["Refers to", "Something already correctly presented or disclosed IN the statements", "A matter NOT presented or disclosed in the statements"],
            ["Purpose", "Draw attention to something fundamental to users' understanding", "Explain something relevant to users' understanding of the audit or the report"],
            ["Example", "Early adoption of a new standard; the outcome of exceptional litigation, properly disclosed", "The prior period was audited by another firm; the report is intended solely for a specified user"],
            ["Effect on opinion", "NONE", "NONE"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that is examined most",
          md: "An Emphasis of Matter paragraph **does not modify the opinion** — it points at a disclosure that is already correct. If something is wrong or missing, that is a modification, and no amount of emphasis fixes it. Candidates reach for Emphasis of Matter when the honest answer is a qualified opinion.",
        },
        {
          kind: "text",
          md: "**Key Audit Matters** (ISA 701) are different again: those matters that, in the auditor's professional judgement, were of **most significance** in the audit. They are required for **listed entities**, are selected from matters communicated to those charged with governance, and are **not** a modification or a criticism — they describe where the audit focused and why.",
        },
      ],
      check: {
        q: "A company properly discloses the uncertain outcome of major litigation that could threaten its future. The disclosure is complete and correct. What should the report do?",
        options: [
          "Give a qualified opinion",
          "Give an unmodified opinion, possibly with an Emphasis of Matter paragraph",
          "Give a disclaimer of opinion",
          "Say nothing — it is disclosed already",
        ],
        correct: 1,
        explain:
          "The disclosure is correct, so the statements are not misstated and the opinion is unmodified. An Emphasis of Matter paragraph may draw attention to it because it is fundamental to users' understanding. (If it threatened going concern, the Material Uncertainty section would be used instead.)",
      },
    },
    {
      id: "five-scenarios",
      heading: "Five scenarios, five reports",
      blocks: [
        {
          kind: "text",
          md: "The requirement is almost always \"describe the effect on the auditor's report\", and the answer has three parts every time: **the nature of the matter**, **whether it is material and whether it is pervasive**, and **the resulting opinion and report wording**. Missing the middle part is what turns a correct instinct into a wrong answer.",
        },
        {
          kind: "example",
          title: "The same three questions, five times",
          scenario: "Materiality for each company below is £200,000.",
          steps: [
            {
              label: "1 · Inventory overstated by £250,000; total assets £8m",
              detail: "MISSTATEMENT, material, confined to one balance so NOT pervasive → **qualified opinion**, \"except for\" the effects of the inventory overstatement, with a Basis for Qualified Opinion section quantifying it.",
            },
            {
              label: "2 · No records exist for a division representing 60% of revenue",
              detail: "INABILITY TO OBTAIN EVIDENCE, material and PERVASIVE → **disclaimer of opinion**. Nothing is known to be wrong; the auditor simply cannot tell, which is why adverse would be the wrong choice.",
            },
            {
              label: "3 · Going concern uncertainty, fully disclosed in the notes",
              detail: "Not a misstatement at all → **unmodified opinion** plus a **Material Uncertainty Related to Going Concern** section. The statements tell the truth about a real risk.",
            },
            {
              label: "4 · Going concern uncertainty, NOT disclosed",
              detail: "MISSTATEMENT by omission of a required disclosure, and going concern is fundamental → material and arguably pervasive → **qualified or adverse opinion**, with the Basis section explaining what is missing.",
            },
            {
              label: "5 · Company will cease trading in three months but accounts prepared as a going concern",
              detail: "The wrong BASIS entirely, affecting every figure → material and pervasive → **adverse opinion**: the statements do not give a true and fair view.",
            },
          ],
          result:
            "Note how 3, 4 and 5 are the same underlying fact — going concern doubt — producing three completely different reports depending on disclosure and basis. That progression is the single most examined idea in Area E.",
        },
        {
          kind: "activity",
          title: "One more, unaided",
          prompt:
            "A client refuses to allow the auditor to circularise receivables, which total £900,000 against materiality of £150,000. No alternative procedures give sufficient evidence. What is the effect on the report?",
          answer:
            "Nature: **inability to obtain sufficient appropriate evidence** — not a misstatement, since nothing is known to be wrong.\n\nMaterial? Yes, £900,000 far exceeds £150,000. Pervasive? Receivables are one balance, so arguably confined — but at £900,000 they may represent a substantial proportion of assets, and management's refusal itself raises doubt about the reliability of other representations.\n\nOpinion: **qualified** if confined, **disclaimer** if the auditor judges it pervasive — and either way the Basis section must explain that management refused access. The refusal is also reportable to those charged with governance and casts doubt on the written representations obtained under AA-21.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Putting the Basis for Opinion before the Opinion section.", fix: "Opinion comes first, by design." },
    { trap: "Writing \"qualified adverse opinion\".", fix: "Four distinct outcomes: unmodified, qualified, adverse, disclaimer." },
    { trap: "Giving an adverse opinion for an inability to obtain evidence.", fix: "Misstatement → adverse. Cannot obtain evidence → disclaimer." },
    { trap: "Using Emphasis of Matter to deal with a missing or wrong disclosure.", fix: "That is a modification; emphasis only points at correct disclosure." },
  ],
  keyTerms: [
    { term: "Qualified opinion", def: "Given where a matter is material but not pervasive — the statements are true and fair \"except for\" it." },
    { term: "Adverse opinion", def: "Given where a misstatement is material AND pervasive — the statements do not give a true and fair view." },
    { term: "Disclaimer of opinion", def: "Given where the auditor cannot obtain evidence and the effect is material AND pervasive." },
    { term: "Emphasis of Matter", def: "A paragraph drawing attention to a matter properly presented or disclosed; it does not modify the opinion." },
    { term: "Key Audit Matters", def: "Matters of most significance in the audit, reported for listed entities; not a modification." },
  ],
  summary: [
    "The report leads with the Opinion, then the Basis for Opinion.",
    "Misstatement: qualified if material, adverse if also pervasive.",
    "Inability to obtain evidence: qualified if material, disclaimer if also pervasive.",
    "Pervasive means not confined, or a substantial proportion, or fundamental to understanding.",
    "Emphasis of Matter, Other Matter and Key Audit Matters never modify the opinion.",
  ],
  knowledgeDiagnostic: [
    { q: "What opinion is given for a material but not pervasive misstatement?", a: "A qualified opinion — the statements give a true and fair view 'except for' the matter described." },
    { q: "What opinion is given where the auditor cannot obtain sufficient evidence and the effect is pervasive?", a: "A disclaimer of opinion — the auditor does not express an opinion." },
    { q: "Define pervasive.", a: "Effects not confined to specific elements of the statements; or if confined, representing a substantial proportion of them; or, for disclosures, fundamental to users' understanding." },
    { q: "Does an Emphasis of Matter paragraph modify the opinion?", a: "No. It draws attention to a matter already properly presented or disclosed; the opinion remains unmodified." },
  ],
  furtherStudy: [
    "AAA develops reporting into complex group scenarios, other assurance reports and firm-wide quality management.",
  ],
}

export const AA_TREE_AREA_E: StudyChapter[] = [AA_TREE_20, AA_TREE_21, AA_TREE_22]
