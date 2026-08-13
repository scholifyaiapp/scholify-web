/*
 * AA Areas E and F — subsequent events and going concern, written
 * representations and finalisation, the auditor's report, and the
 * employability and technology skills the CBE marks.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area E is where the paper ends and where the most marks are thrown away,
 * because reporting questions have a RIGHT ANSWER and candidates guess at it.
 * Every conclusion in this area is reached by the same two-step test, applied
 * in the same order, every time:
 *
 *   1. WHICH PROBLEM IS IT?
 *        · the financial statements are MATERIALLY MISSTATED, or
 *        · the auditor is UNABLE TO OBTAIN SUFFICIENT APPROPRIATE EVIDENCE
 *
 *   2. HOW BAD IS IT?
 *        · MATERIAL but not pervasive, or
 *        · MATERIAL AND PERVASIVE
 *
 *   misstatement + material          → QUALIFIED ("except for")
 *   misstatement + pervasive         → ADVERSE
 *   no evidence   + material         → QUALIFIED ("except for")
 *   no evidence   + pervasive        → DISCLAIMER
 *
 * That grid is the whole of ISA 705, and an answer that names the modification
 * without working through the grid is guessing even when it lands on the right
 * one — the marks are for the reasoning, and there are usually more marks for
 * the assessment than for the conclusion.
 *
 * The other reliable loss in this area is confusing an EMPHASIS OF MATTER with
 * a modification. An Emphasis of Matter paragraph is used when the matter is
 * CORRECTLY ACCOUNTED FOR AND ADEQUATELY DISCLOSED — the opinion is NOT
 * modified, and the paragraph must say so. Reaching for it whenever something
 * worrying appears in a scenario is the single most common error in AA
 * reporting questions.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const AA_PLANS_EF: ExamPlanMap = {
  /* ── AA-20 · Subsequent events and going concern ────────────────── */

  "AA-20::subsequent-events": {
    title: "Adjusting and non-adjusting events, and the auditor's duty over time",
    format: "written",
    marks: 8,
    requirement:
      "Explain the difference between adjusting and non-adjusting events after the reporting period, describe the procedures the auditor should perform to identify subsequent events, and explain the auditor's responsibilities in the three periods identified by ISA 560. (8 marks)",
    plan: [
      {
        step: "Define the two categories by the ONE question that separates them",
        detail:
          "Did the condition EXIST AT THE REPORTING DATE? If it did, the event provides evidence about that condition and the financial statements are ADJUSTED. If it arose afterwards, they are not adjusted, and the event is DISCLOSED if material. Every classification question turns on that single test.",
      },
      {
        step: "Give examples of each, since the definition alone will not score",
        detail:
          "ADJUSTING: a customer entering administration (the debt was already doubtful), inventory sold below cost (NRV was already lower), settlement of a court case in existence at the year end, discovery of fraud or error. NON-ADJUSTING: a fire destroying a factory, an issue of shares, a major acquisition, a dividend declared after the year end.",
      },
      {
        step: "List the identification procedures",
        detail:
          "Enquire of management about subsequent events; review minutes of board and shareholder meetings held after the year end; review the latest available management accounts and budgets; review post year-end cash receipts and payments; enquire of the entity's legal advisers about litigation; and inspect post year-end sales invoices for evidence about net realisable value.",
      },
      {
        step: "Get the three periods and the three levels of duty exactly right",
        detail:
          "BETWEEN THE YEAR END AND THE DATE OF THE AUDITOR'S REPORT the auditor has an ACTIVE duty to perform procedures. BETWEEN THE REPORT DATE AND THE DATE THE STATEMENTS ARE ISSUED there is NO obligation to perform procedures, but the auditor must act on facts that BECOME KNOWN. AFTER ISSUE, the same passive duty applies, with the additional question of recalling the statements.",
      },
    ],
    answer:
      "**Adjusting and non-adjusting events**\n\nThe test is a single question: **did the condition exist at the reporting date?**\n\n**Adjusting events** provide evidence of conditions that **existed at the reporting date**. The financial statements are **amended**:\n\n· a customer **entering administration** shortly after the year end — the debt was already doubtful at the year end, so an allowance is required\n· **inventory sold after the year end below cost** — evidence that net realisable value was below cost at the year end\n· the **settlement of a court case** that was already in progress at the reporting date, confirming a present obligation existed\n· the **discovery of fraud or error** showing the financial statements are misstated\n· the determination after the year end of the **cost of assets purchased**, or **proceeds of assets sold**, before it\n\n**Non-adjusting events** arise from conditions that **occurred after the reporting date**. The financial statements are **not amended**, but the event is **disclosed** — its nature and an estimate of its financial effect — if it is material:\n\n· a **fire or flood destroying a major asset** after the year end\n· an **issue of shares or loan notes**\n· a **major acquisition or disposal** of a business\n· **announcing a plan to discontinue** an operation\n· a **dividend declared after the reporting date**, which is specifically non-adjusting and is disclosed rather than recognised as a liability\n\n**Procedures to identify subsequent events**\n\n· **Enquire of management** whether any subsequent events have occurred that might affect the financial statements.\n· **Review minutes** of meetings of shareholders, directors and management held after the year end, and enquire about matters discussed at meetings for which minutes are not yet available.\n· **Review the latest available management accounts**, budgets, cash flow forecasts and other management reports.\n· **Review post year-end receipts and payments** in the cash book and bank statements, particularly receipts from receivables and payments of previously unrecorded liabilities.\n· **Enquire of the entity's legal advisers** about litigation and claims.\n· **Inspect post year-end sales invoices** for evidence about the net realisable value of year-end inventory.\n· **Obtain a written representation** that all events requiring adjustment or disclosure have been adjusted or disclosed.\n\n**The three periods (ISA 560)**\n\n**1. From the reporting date to the date of the auditor's report.** The auditor has an **active responsibility** to **perform procedures designed to identify** subsequent events, covering the whole of this period up to a date as near as practicable to the date of the report.\n\n**2. From the date of the auditor's report to the date the financial statements are issued.** The auditor has **no obligation to perform any procedures**. However, if a fact **becomes known** that, had it been known at the report date, would have caused the report to be amended, the auditor must **discuss it with management**, determine whether the statements need amending, and if they are amended, **extend the audit procedures** to the new date and **issue a new auditor's report**. If management refuses to amend, the auditor should **modify the opinion** and, where the report has already been provided to the entity, take action to **prevent reliance** on it.\n\n**3. After the financial statements have been issued.** Again **no obligation to perform procedures**, but if a fact becomes known that would have caused amendment, the auditor must discuss it with management, consider whether the statements should be **revised**, and if so, review the steps management takes to inform anyone who received them. If management does not take the necessary steps, the auditor must take action to **prevent reliance on the auditor's report**, taking legal advice.",
    earns: [
      "Defining the categories by whether the condition existed at the reporting date",
      "Giving examples of both, including the dividend declared after the year end",
      "Listing identification procedures as separate points",
      "Distinguishing the active duty in period one from the passive duty in periods two and three",
    ],
    loses: [
      "Classifying by whether the event is significant rather than by when the condition arose",
      "Suggesting the auditor must keep performing procedures after the report is signed",
      "Omitting the three periods, which are a third of the requirement",
    ],
  },

  "AA-20::going-concern": {
    title: "Going concern: indicators, procedures and the reporting outcomes",
    format: "written",
    marks: 10,
    requirement:
      "Explain the respective responsibilities of management and the auditor in relation to going concern, describe indicators that may cast doubt on an entity's ability to continue as a going concern, and explain the possible effects on the auditor's report. (10 marks)",
    plan: [
      {
        step: "Split ten marks across the three parts named in the requirement",
        detail:
          "Responsibilities, indicators, reporting. Roughly two, four and four. All three must appear — an answer that gives twelve indicators and no reporting outcomes will score about five.",
      },
      {
        step: "State both responsibilities precisely",
        detail:
          "MANAGEMENT assesses the entity's ability to continue as a going concern, over a period of AT LEAST TWELVE MONTHS from the reporting date, and decides whether the basis is appropriate. The AUDITOR obtains sufficient appropriate evidence about the appropriateness of that basis, and concludes whether a MATERIAL UNCERTAINTY exists.",
      },
      {
        step: "Group the indicators, so the answer does not run dry",
        detail:
          "FINANCIAL: net liabilities, net current liabilities, borrowings near maturity with no realistic prospect of renewal, negative operating cash flows, adverse key ratios, arrears of dividends, inability to pay creditors on time, withdrawal of supplier credit. OPERATING: loss of key management or a major market, customer or supplier, labour difficulties, shortages of supplies. OTHER: non-compliance with capital or statutory requirements, pending legal proceedings, uninsured catastrophes.",
      },
      {
        step: "Give the three reporting outcomes, each with its trigger",
        detail:
          "Basis APPROPRIATE and a material uncertainty exists that IS adequately disclosed → UNMODIFIED opinion plus a separate 'MATERIAL UNCERTAINTY RELATED TO GOING CONCERN' section. Uncertainty NOT adequately disclosed → QUALIFIED or ADVERSE, because the statements are materially misstated. Basis INAPPROPRIATE but still used → ADVERSE, because the whole statements are prepared on the wrong basis.",
      },
      {
        step: "Note the point that catches candidates out",
        detail:
          "A material uncertainty properly disclosed does NOT modify the opinion. The separate section is an addition to an UNMODIFIED report, not a modification of it, and the report says so explicitly.",
      },
    ],
    answer:
      "**Responsibilities**\n\n**Management** is responsible for **assessing the entity's ability to continue as a going concern**, taking into account all available information about the future covering a period of **at least twelve months from the reporting date**. It decides whether the going concern basis of accounting is appropriate, and is responsible for the **disclosures** required where a material uncertainty exists.\n\n**The auditor** is responsible for obtaining **sufficient appropriate audit evidence** about, and concluding on, the **appropriateness of management's use of the going concern basis**, and for concluding whether a **material uncertainty** exists about the entity's ability to continue. The auditor must **remain alert** throughout the audit for evidence of events or conditions casting significant doubt, and must **evaluate management's assessment** — including requesting that one be made if management has not done so.\n\n**Indicators of possible going concern problems**\n\n**Financial indicators**\n\n· **net liabilities** or **net current liabilities**\n· **borrowings approaching maturity** with no realistic prospect of renewal or repayment, or excessive reliance on **short-term borrowing** to finance long-term assets\n· **negative operating cash flows**, indicated by historical or prospective financial statements\n· **adverse key financial ratios**, and substantial **operating losses** or deterioration in the value of assets used to generate cash\n· **arrears or discontinuance of dividends**\n· **inability to pay creditors on due dates**, or to comply with the terms of **loan agreements** — a covenant breach making a loan repayable on demand is particularly serious\n· **change from credit to cash-on-delivery terms** with suppliers, or **withdrawal of financial support** by creditors\n· inability to obtain financing for essential new product development or other essential investment\n\n**Operating indicators**\n\n· **loss of key management** without replacement, or of **key staff**\n· **loss of a major market, franchise, licence, customer or supplier**\n· **labour difficulties**, or shortages of important supplies\n· the emergence of a **highly successful competitor**\n· management **intentions to liquidate** or cease operations\n\n**Other indicators**\n\n· **non-compliance with capital or other statutory requirements**\n· **pending legal or regulatory proceedings** that may result in claims the entity is unlikely to satisfy\n· **changes in law or government policy** expected to affect the entity adversely\n· **uninsured or underinsured catastrophes**\n\n**Effects on the auditor's report**\n\n**1. The going concern basis is appropriate, a material uncertainty exists, and it IS adequately disclosed.**\nThe opinion is **unmodified**. The auditor includes a separate section headed **'Material Uncertainty Related to Going Concern'**, immediately after the Basis for Opinion section, which draws attention to the note in the financial statements and states that the **opinion is not modified** in respect of the matter.\n\n**2. The going concern basis is appropriate, a material uncertainty exists, but it is NOT adequately disclosed.**\nThe financial statements are **materially misstated** because a required disclosure is missing or inadequate. The opinion is **qualified** ('except for') or, if the effect is **pervasive**, **adverse**. The Basis for Qualified/Adverse Opinion section explains that a material uncertainty exists and that the financial statements do not adequately disclose it.\n\n**3. The going concern basis is INAPPROPRIATE but the financial statements have been prepared on it.**\nAn **adverse opinion** is required. The basis of preparation affects the financial statements **as a whole**, so the effect is by definition pervasive — a qualified opinion would not be sufficient.\n\n**The distinction candidates most often miss:** a material uncertainty that has been **properly disclosed does not modify the opinion**. The 'Material Uncertainty Related to Going Concern' section is an **addition to an unmodified report**, not a modification of it.",
    earns: [
      "Both responsibilities, including the at-least-twelve-months assessment period",
      "Indicators grouped as financial, operating and other, which produces breadth",
      "All three reporting outcomes, each tied to its trigger",
      "Stating explicitly that a properly disclosed material uncertainty leaves the opinion unmodified",
    ],
    loses: [
      "Listing indicators at length and never reaching the reporting outcomes",
      "Treating the Material Uncertainty section as a modification of the opinion",
      "Giving a qualified opinion where the going concern basis is wholly inappropriate",
    ],
  },

  "AA-20::forecast-worked": {
    title: "Auditing the cash flow forecast supporting going concern",
    format: "written",
    marks: 8,
    requirement:
      "Crossfell Co has prepared a cash flow forecast for the twelve months following the reporting date to support the directors' assessment that the going concern basis remains appropriate. The forecast assumes a 15% increase in sales volume, the renewal of a bank overdraft facility that expires in four months, and the deferral of capital expenditure.\n\nDescribe the audit procedures you would perform on the cash flow forecast, and explain the further evidence you would seek regarding going concern. (8 marks)",
    plan: [
      {
        step: "Treat the forecast as a set of ASSUMPTIONS to be tested, not a document to be inspected",
        detail:
          "A forecast is only as good as what it assumes. Every mark here comes from testing an assumption against evidence, so identify the three assumptions named in the scenario and address each specifically.",
      },
      {
        step: "Start with the mechanical checks, which are quick marks",
        detail:
          "CAST the forecast and check its arithmetical accuracy and internal consistency. Agree the OPENING CASH position to the year-end bank reconciliation and bank confirmation — a forecast that starts from the wrong number is wrong throughout.",
      },
      {
        step: "Test each assumption against external or historical evidence",
        detail:
          "The 15% SALES INCREASE: compare with the growth actually achieved in prior years, with post year-end orders and the order book, and with performance in the months since the year end. The OVERDRAFT RENEWAL: inspect correspondence with the bank — this is the most important single piece of evidence, because if the facility is not renewed the forecast collapses. The DEFERRED CAPITAL EXPENDITURE: assess whether it can genuinely be deferred without damaging operations.",
      },
      {
        step: "Compare the forecast with reality already available",
        detail:
          "Compare the forecast for the months ALREADY ELAPSED since the year end with the ACTUAL results in the management accounts. A forecast that has already proved optimistic in its first two months is unlikely to be reliable for the remaining ten, and this is the strongest evidence available.",
      },
      {
        step: "Perform sensitivity analysis, which is what turns a good answer into a strong one",
        detail:
          "Recalculate the forecast on less favourable assumptions — sales growth of 5% instead of 15%, or the overdraft renewed at a lower limit — to determine how much has to go wrong before the entity runs out of cash. That measures how much headroom actually exists.",
      },
      {
        step: "Cover the further evidence, since it is the second half of the requirement",
        detail:
          "Board minutes, correspondence with lawyers and with the bank, post year-end management accounts, management's plans and their feasibility, a written representation on management's intentions and feasibility, and a review of the adequacy of the going concern disclosures.",
      },
    ],
    answer:
      "**Procedures on the forecast itself**\n\n· **Cast the cash flow forecast** and confirm its arithmetical accuracy and internal consistency, including that the closing balance of each month becomes the opening balance of the next.\n· **Agree the opening cash position** to the year-end **bank reconciliation and bank confirmation letter**, since an incorrect starting point misstates every subsequent month.\n· **Compare the forecast for the period already elapsed** since the year end with the **actual results** shown in the post year-end management accounts, and investigate significant variances. A forecast that has already proved optimistic in its opening months is unlikely to be reliable for the remainder — this is often the single most informative procedure available.\n· **Review the forecast for the reasonableness of its structure** — that all significant categories of receipt and payment are included, and that recurring items such as tax, interest, loan repayments and payroll have not been omitted.\n\n**Testing the three key assumptions**\n\n**The 15% increase in sales volume**\n\n· **Compare with sales growth actually achieved** in the previous two or three years, and with growth in the months since the year end.\n· **Inspect the order book and post year-end orders received**, and any signed contracts, to assess whether demand supports the increase.\n· **Discuss with management the basis for the assumption** and whether it depends on new customers, new products or price changes, and **corroborate** the explanation with supporting evidence.\n· Consider whether the increase requires additional **working capital** — inventory and receivables — and whether the forecast reflects that cash outflow, since growth consumes cash before it generates it.\n\n**The renewal of the overdraft facility expiring in four months**\n\n· **Inspect correspondence with the bank** regarding the renewal, and any **facility letter, offer or renewal agreement**. This is the most important single piece of evidence in the scenario: if the facility is not renewed, the forecast fails regardless of every other assumption.\n· **Review the terms of the existing facility**, including any **covenants**, and recalculate whether the entity has complied with them and will continue to do so under the forecast.\n· **Review the entity's history** of operating within its facility limit, and the headroom the forecast shows against it.\n· Consider **direct confirmation from the bank** as to its intentions, though banks are frequently unwilling to give one — and a refusal to confirm is itself informative.\n\n**The deferral of capital expenditure**\n\n· **Discuss with management which projects have been deferred**, and inspect **board minutes** approving the deferral.\n· Assess whether the expenditure can **genuinely be deferred** without damaging operations — deferring the replacement of essential production equipment may reduce cash outflow in the short term while creating a larger operational problem.\n· **Inspect any contractual commitments** already entered into, which cannot be deferred and must appear in the forecast.\n\n**Sensitivity analysis**\n\n· **Recalculate the forecast under less favourable assumptions** — for example sales growth of 5% rather than 15%, a delay in the overdraft renewal, or slower collection of receivables — to determine **how much has to go wrong before the entity exhausts its cash**. This measures the **headroom** in management's plan and is what makes the audit conclusion defensible.\n\n**Further evidence regarding going concern**\n\n· **Review board and management minutes** for discussion of financial difficulties, financing plans and trading performance.\n· **Enquire of the entity's legal advisers** about litigation and claims that could result in obligations the entity cannot meet.\n· **Review post year-end management accounts** for actual trading performance and cash position since the year end.\n· **Evaluate management's plans** for future action — cost reductions, asset disposals, additional financing, capital injections from shareholders — and assess whether they are **feasible** and whether they will **improve the situation**, obtaining evidence of any commitment from third parties.\n· **Obtain a written representation** from management regarding its **plans for future action and the feasibility of those plans**.\n· **Review the adequacy of the going concern disclosures** in the financial statements, since a material uncertainty that is properly disclosed leads to an unmodified opinion with a **Material Uncertainty Related to Going Concern** section, while inadequate disclosure leads to a **modified opinion**.",
    earns: [
      "Testing each of the three named assumptions specifically against evidence",
      "Comparing the elapsed part of the forecast with actual results already available",
      "Identifying the overdraft renewal as the assumption on which the forecast depends",
      "Performing sensitivity analysis to establish the headroom",
      "Answering the second half on further going concern evidence, including the disclosure review",
    ],
    loses: [
      "Inspecting the forecast without testing any of its assumptions",
      "Generic going concern procedures with no reference to the scenario's three assumptions",
      "Omitting the review of the going concern disclosures, which drives the reporting outcome",
    ],
  },

  /* ── AA-21 · Written representations and finalisation ───────────── */

  "AA-21::representations": {
    title: "Written representations: purpose, contents and limits",
    format: "written",
    marks: 6,
    requirement:
      "Explain the purpose of written representations, describe the matters they should cover, and explain the auditor's course of action if management refuses to provide them. (6 marks)",
    plan: [
      {
        step: "State the purpose and the limitation in the same breath",
        detail:
          "They are audit evidence — but they are NOT SUFFICIENT APPROPRIATE EVIDENCE ON THEIR OWN about any of the matters they concern, and they do not relieve the auditor of the need to obtain other evidence. Stating the limitation with the purpose is what separates a good answer.",
      },
      {
        step: "Separate the REQUIRED representations from the supporting ones",
        detail:
          "ISA 580 REQUIRES representations that management has fulfilled its responsibility for the PREPARATION OF THE FINANCIAL STATEMENTS, that it has PROVIDED ALL RELEVANT INFORMATION AND ACCESS, and that ALL TRANSACTIONS HAVE BEEN RECORDED AND REFLECTED. Other representations SUPPORT evidence on specific matters, typically judgements and intentions.",
      },
      {
        step: "Give examples of the supporting representations that matter",
        detail:
          "Where a representation is the only evidence reasonably available: management's INTENTIONS — to hold an investment, to dispose of an operation, to provide financial support; its plans for going concern; the completeness of related party disclosures; and its belief that uncorrected misstatements are immaterial.",
      },
      {
        step: "Get the formalities right, since each is a mark",
        detail:
          "IN WRITING, in the form of a representation LETTER ADDRESSED TO THE AUDITOR, from management with appropriate responsibilities, DATED AS NEAR AS PRACTICABLE TO BUT NOT AFTER the date of the auditor's report, and covering ALL PERIODS referred to in the opinion.",
      },
      {
        step: "Follow refusal through to the opinion",
        detail:
          "Discuss with management, re-evaluate their INTEGRITY and the reliability of ALL other representations and evidence obtained, and take appropriate action. If the REQUIRED representations are not provided, the auditor SHALL DISCLAIM the opinion — refusal casts doubt over everything, so the effect is pervasive by nature.",
      },
    ],
    answer:
      "**Purpose.** Written representations are **audit evidence**, obtained from management to confirm matters that are material to the financial statements where **other sufficient appropriate evidence cannot reasonably be expected to exist** — typically management's **intentions, judgements and completeness assertions**. They also confirm that management has fulfilled its responsibilities under the terms of the engagement.\n\n**The essential limitation.** Written representations are **not sufficient appropriate audit evidence on their own** about any of the matters with which they deal, and they **do not relieve the auditor** of the responsibility to obtain other evidence. They are among the **least reliable** forms of evidence, because they come from the client and are not independent.\n\n**Matters they should cover**\n\n**Required by ISA 580** — the auditor must request representations that management:\n\n· has fulfilled its responsibility for the **preparation of the financial statements** in accordance with the applicable framework, including their fair presentation\n· has **provided the auditor with all relevant information and access** agreed in the terms of the engagement\n· has ensured that **all transactions have been recorded and are reflected** in the financial statements\n\n**Supporting other evidence** — representations about specific matters, particularly where the auditor cannot obtain evidence any other way:\n\n· management's **plans and intentions** — to hold an investment to maturity, to dispose of an operation, or to provide financial support to a subsidiary\n· management's **assessment of going concern** and the feasibility of its plans for future action\n· that all **subsequent events** requiring adjustment or disclosure have been dealt with\n· the completeness of **related party** relationships and transactions disclosed\n· that all known instances of **non-compliance with laws and regulations** have been disclosed\n· that management believes the effects of **uncorrected misstatements are immaterial**, individually and in aggregate, with a summary of those items attached\n· that all known or suspected **fraud** affecting the entity has been disclosed\n\n**Form and timing**\n\n· **In writing**, normally as a **representation letter on the entity's letterhead addressed to the auditor**\n· from **management with appropriate responsibilities** for the financial statements and knowledge of the matters concerned\n· **dated as near as practicable to, but not after, the date of the auditor's report**\n· covering **all financial statements and all periods** referred to in the auditor's report\n\n**If management refuses to provide them**\n\n· **Discuss the matter with management** to understand why, and attempt to resolve it.\n· **Re-evaluate the integrity of management**, and reconsider the effect on the **reliability of all other representations, oral or written, and of audit evidence generally** — a refusal calls into question everything management has told the auditor.\n· **Take appropriate action**, including considering the effect on the opinion.\n· Where the **required** representations are not provided, or where the auditor concludes there is sufficient doubt about management's integrity that they are unreliable, the auditor **shall disclaim an opinion** on the financial statements. The effect is treated as **pervasive** because doubt over management's integrity undermines the audit as a whole.",
    earns: [
      "Stating both the purpose and that representations are not sufficient evidence alone",
      "Separating the required representations from those supporting other evidence",
      "Getting the dating rule right — as near as practicable to, but not after, the report date",
      "Following refusal through to a disclaimer, and explaining why the effect is pervasive",
    ],
    loses: [
      "Presenting representations as strong evidence that substitutes for other work",
      "Giving a qualified opinion where required representations are refused",
      "Listing matters covered without distinguishing the mandatory ones",
    ],
  },

  "AA-21::finalisation": {
    title: "The final review, and evaluating misstatements",
    format: "written",
    marks: 6,
    requirement:
      "Describe the procedures the auditor performs at the final review stage of the audit, and explain how the auditor evaluates misstatements identified during the audit. (6 marks)",
    plan: [
      {
        step: "List the completion procedures as discrete points",
        detail:
          "Final analytical procedures; review of subsequent events; the going concern conclusion; evaluation of uncorrected misstatements; obtaining written representations; review of working papers; the engagement quality review for a listed entity; and reading the OTHER INFORMATION in the annual report for inconsistency.",
      },
      {
        step: "Give final analytical procedures their proper purpose",
        detail:
          "ISA 520 REQUIRES them near the end of the audit, and their purpose is to assist in forming an OVERALL CONCLUSION on whether the financial statements are CONSISTENT WITH THE AUDITOR'S UNDERSTANDING of the entity. It is the last chance to notice that something does not make sense.",
      },
      {
        step: "Explain the evaluation of misstatements as an accumulation process",
        detail:
          "Accumulate ALL misstatements identified other than those that are CLEARLY TRIVIAL. Communicate them to management on a timely basis and request correction. Where management refuses, consider the REASONS for refusal in assessing whether the statements are misstated.",
      },
      {
        step: "Cover the three dimensions of the final evaluation",
        detail:
          "Whether uncorrected misstatements are material INDIVIDUALLY or IN AGGREGATE; the effect on PRIOR PERIOD figures of misstatements uncorrected in earlier years; and QUALITATIVE considerations — an immaterial amount that turns a loss into a profit, breaches a covenant or affects directors' remuneration is material by nature.",
      },
    ],
    answer:
      "**Procedures at the final review stage**\n\n· **Perform final analytical procedures**, which ISA 520 **requires**, to assist in forming an **overall conclusion** on whether the financial statements are **consistent with the auditor's understanding** of the entity. This is the last opportunity to notice a figure that does not make sense in the light of everything learned during the audit.\n· **Review subsequent events** up to a date as near as practicable to the date of the auditor's report.\n· **Conclude on going concern**, evaluating management's assessment and whether a material uncertainty exists.\n· **Evaluate uncorrected misstatements**, individually and in aggregate.\n· **Obtain written representations** from management, dated as near as practicable to but not after the date of the report.\n· **Review the audit working papers** — with the engagement partner personally reviewing the areas of **significant judgement and significant risk**, and, for a **listed entity**, an **engagement quality review** performed by someone outside the team before the report is issued.\n· **Read the other information** in the annual report — the directors' report, chair's statement and any strategic report — and consider whether it is **materially inconsistent** with the audited financial statements or with the auditor's knowledge.\n· **Review the financial statements** for compliance with the applicable framework and legislation, including the adequacy of disclosures.\n· **Confirm that all planned procedures have been completed** and that any outstanding matters have been resolved.\n\n**Evaluating misstatements**\n\n**Accumulation.** The auditor **accumulates misstatements identified during the audit**, other than those that are **clearly trivial** — an amount so small that it is inconsequential whether taken individually or in aggregate, and which is a much lower threshold than materiality.\n\n**Communication and correction.** Misstatements are **communicated to the appropriate level of management on a timely basis**, and the auditor **requests that they be corrected**. Where management **refuses**, the auditor should understand **why**, and take that into account in evaluating whether the financial statements as a whole are materially misstated — a refusal to correct a small misstatement that achieves a particular outcome may indicate **bias**.\n\n**Reassessment of materiality.** Before evaluating the effect, the auditor **reconsiders whether the materiality level remains appropriate** in the light of the entity's **actual** results, which may differ from the estimates used at planning.\n\n**The final evaluation** considers whether uncorrected misstatements are material:\n\n· **individually**, or\n· **in aggregate** — several individually immaterial misstatements may together exceed materiality, which is why performance materiality is set below overall materiality in the first place\n· taking account of the effect of **uncorrected misstatements from prior periods** on the current period's figures and on the comparatives\n· considering **qualitative factors** — a numerically small misstatement is material by nature if it **turns a loss into a profit**, causes a **loan covenant to be breached**, affects **directors' remuneration**, conceals a change in a trend, or relates to a **related party transaction**\n\n**Outcome.** The auditor obtains a **written representation** that management believes the effects of uncorrected misstatements are immaterial, with a **summary attached**. Where the auditor concludes the uncorrected misstatements **are** material, the financial statements are materially misstated and the **opinion must be modified**.",
    earns: [
      "Listing completion procedures as discrete points, including the other information review",
      "Giving final analytical procedures their ISA 520 purpose",
      "Explaining accumulation of all but clearly trivial misstatements",
      "Covering aggregation, prior period effects and qualitative materiality",
    ],
    loses: [
      "Describing the audit generally rather than the completion stage",
      "Omitting the evaluation of misstatements, which is half the requirement",
      "Treating 'clearly trivial' as equivalent to 'immaterial'",
    ],
  },

  "AA-21::misstatement-schedule": {
    title: "The schedule of uncorrected misstatements",
    format: "written",
    marks: 5,
    requirement:
      "Explain the purpose of the schedule of uncorrected misstatements, and describe how the auditor uses it in forming the audit opinion. (5 marks)",
    plan: [
      {
        step: "Define what the schedule is and what goes on it",
        detail:
          "A record of every misstatement identified during the audit that management has NOT corrected, other than those that are clearly trivial. It includes factual misstatements, judgemental differences over estimates, and PROJECTED misstatements extrapolated from samples.",
      },
      {
        step: "Give the three types, since candidates usually give only one",
        detail:
          "FACTUAL — no doubt they are misstatements, such as an arithmetical error. JUDGEMENTAL — differences arising from management's judgement over estimates or accounting policies that the auditor considers unreasonable. PROJECTED — the auditor's best estimate of misstatement in a population, extrapolated from the errors found in a sample.",
      },
      {
        step: "Explain how the schedule is used",
        detail:
          "It is presented to MANAGEMENT with a request to correct. The uncorrected items are then TOTALLED and compared with MATERIALITY, both individually and in aggregate, and the effect on each primary statement — profit, net assets — is shown separately, because a misstatement may be material to one and not another.",
      },
      {
        step: "Link the total to the opinion",
        detail:
          "If the aggregate is MATERIAL, the financial statements are materially misstated and the opinion is MODIFIED — qualified if material but not pervasive, adverse if pervasive. If below materiality, an unmodified opinion may be issued, and management represents in writing that it believes the effects are immaterial.",
      },
    ],
    answer:
      "**What the schedule is.** A record of **all misstatements identified during the audit that management has not corrected**, other than those that are **clearly trivial**. It is compiled throughout the audit and completed at the final review stage.\n\n**The three types of misstatement it records**\n\n· **Factual misstatements** — items about which there is **no doubt**: an arithmetical error, a transaction posted to the wrong account, an asset recorded at the wrong amount.\n· **Judgemental misstatements** — differences arising from management's **judgements about accounting estimates** that the auditor considers **unreasonable**, or from the selection or application of accounting policies the auditor considers inappropriate. For example, an allowance for receivables the auditor believes is $80,000 too low.\n· **Projected misstatements** — the auditor's **best estimate of misstatement in a population**, obtained by **extrapolating** the errors found in a sample across the population from which it was drawn. Projection matters because the errors actually found in a sample are only a fraction of those likely to exist.\n\n**How the auditor uses it**\n\n· The schedule is **presented to management** on a timely basis with a **request that the misstatements be corrected**. Many will be corrected, and those drop off the schedule.\n· Where management **declines to correct** an item, the auditor considers **why**. A refusal to correct several small misstatements that all move profit in the same direction may indicate **bias** in the preparation of the financial statements, which is a matter in itself.\n· The uncorrected items are **totalled and compared with materiality**, and the schedule shows the effect on each **primary statement separately** — normally the effect on **profit** and on **net assets** — because an item may be material to one and not to the other.\n· The **effect of prior period uncorrected misstatements** on the current period is included, since they may reverse or accumulate.\n· **Qualitative factors** are considered alongside the total: an amount below materiality is nonetheless material if it **turns a loss into a profit**, causes a **covenant to be breached**, or affects **directors' remuneration**.\n· The schedule is **communicated to those charged with governance**, together with a request that they be corrected.\n· A **written representation** is obtained that management believes the effects of the uncorrected misstatements are **immaterial**, with the schedule attached to it.\n\n**Effect on the opinion**\n\n· If the aggregate of uncorrected misstatements is **not material**, an **unmodified** opinion may be issued.\n· If the aggregate **is material**, the financial statements are **materially misstated**, and the opinion must be **modified** — **qualified** ('except for') where the effect is material but not pervasive, or **adverse** where it is pervasive.",
    earns: [
      "Naming all three types of misstatement, including projected",
      "Explaining that projection extrapolates sample errors over the population",
      "Showing the effect on profit and net assets separately",
      "Linking the aggregate to the specific opinion outcomes",
    ],
    loses: [
      "Describing only factual misstatements",
      "Comparing only individual items with materiality and never the aggregate",
      "Omitting the link to the audit opinion, which is the second half of the requirement",
    ],
  },

  /* ── AA-22 · The auditor's report ───────────────────────────────── */

  "AA-22::elements": {
    title: "The elements of an unmodified auditor's report",
    format: "written",
    marks: 6,
    requirement:
      "Describe the elements of an unmodified auditor's report prepared in accordance with ISA 700, explaining the purpose of each. (6 marks)",
    plan: [
      {
        step: "Give the elements IN ORDER, because the order is examinable",
        detail:
          "Title; addressee; OPINION; Basis for Opinion; [Material Uncertainty Related to Going Concern]; Key Audit Matters; Other Information; Responsibilities of Management and Those Charged with Governance; Auditor's Responsibilities; other reporting responsibilities; name of the engagement partner; signature; address; date. The opinion comes FIRST — that is the change users notice most.",
      },
      {
        step: "Explain why the opinion is first",
        detail:
          "It is the most important information in the report, so it is given the most prominent position rather than being buried after pages of responsibilities. Saying WHY earns more than listing the element.",
      },
      {
        step: "Say what the Basis for Opinion section contains",
        detail:
          "That the audit was conducted in accordance with ISAs, a reference to the Auditor's Responsibilities section, a statement that the auditor is INDEPENDENT and has fulfilled its ethical responsibilities, and that the auditor believes the evidence obtained is SUFFICIENT AND APPROPRIATE.",
      },
      {
        step: "Note which elements apply only to listed entities",
        detail:
          "KEY AUDIT MATTERS — those matters that, in the auditor's professional judgement, were of MOST SIGNIFICANCE in the audit — are required for LISTED entities. The NAME OF THE ENGAGEMENT PARTNER is likewise required for listed entities. Knowing which elements are conditional is a mark.",
      },
    ],
    answer:
      "**Title** — must indicate it is the report of an **independent auditor**, distinguishing it from reports issued by others.\n\n**Addressee** — normally the **shareholders (members)** of the company, since it is to them that the auditor reports.\n\n**Opinion** — placed **first**, because it is the most important information in the report and users should not have to search for it. It identifies the entity, states which financial statements have been audited and for which period, and gives the opinion — that the financial statements **give a true and fair view** (or **present fairly, in all material respects**) in accordance with the applicable framework.\n\n**Basis for Opinion** — states that the audit was conducted **in accordance with ISAs**, refers to the Auditor's Responsibilities section, confirms that the auditor is **independent** of the entity and has fulfilled its **ethical responsibilities**, and states that the auditor believes the evidence obtained is **sufficient and appropriate** to provide a basis for the opinion.\n\n**Material Uncertainty Related to Going Concern** — included **where applicable**: where a material uncertainty exists and is **adequately disclosed**, this section draws attention to the relevant note and states that the **opinion is not modified** in respect of the matter.\n\n**Key Audit Matters** — required for the audit of **listed entities**. Those matters that, in the auditor's **professional judgement**, were of **most significance** in the audit, why each was considered significant, and how it was addressed. Their purpose is to give users insight into the audit itself rather than to modify the opinion.\n\n**Other Information** — describes management's responsibility for the other information in the annual report, states that the auditor's opinion **does not cover** it, and describes the auditor's responsibility to read it and consider whether it is **materially inconsistent** with the financial statements.\n\n**Responsibilities of Management and Those Charged with Governance** — for preparing the financial statements, for the **internal control** necessary to enable their preparation free from material misstatement, for assessing the entity's ability to continue as a **going concern**, and for overseeing the financial reporting process. This section exists in part to narrow the **expectation gap**.\n\n**Auditor's Responsibilities for the Audit of the Financial Statements** — that the auditor's objectives are to obtain **reasonable assurance** about whether the financial statements are free from material misstatement, whether due to fraud or error, and to issue a report containing the opinion; that reasonable assurance is a **high but not absolute** level; and a description of the work performed, including professional scepticism, risk assessment, internal control, estimates, going concern and communication with those charged with governance.\n\n**Other reporting responsibilities** — where the auditor has additional reporting obligations under local law, presented under a separate heading.\n\n**Name of the engagement partner** — required for **listed entities**.\n\n**Signature** of the auditor, the auditor's **address**, and the **date** of the report — which must be **no earlier** than the date on which the auditor obtained sufficient appropriate evidence, including evidence that the financial statements have been **approved by those charged with governance**.",
    earns: [
      "Giving the elements in the correct order, with the opinion first",
      "Explaining why the opinion comes first",
      "Stating what the Basis for Opinion section contains, including the independence statement",
      "Identifying key audit matters and the partner's name as listed-entity requirements",
    ],
    loses: [
      "Placing the opinion at the end, which is the pre-revision format",
      "Listing element names with no explanation of purpose",
      "Treating key audit matters as required for every audit",
    ],
  },

  "AA-22::modifications": {
    title: "Choosing the right modification",
    format: "mtq",
    marks: 10,
    requirement:
      "For each of the following situations, identify the appropriate audit opinion.\n\n(1) Inventory is overstated by an amount that is material but not pervasive to the financial statements. The directors refuse to adjust it.\nA  Unmodified  B  Qualified  C  Adverse  D  Disclaimer\n\n(2) The auditor was unable to attend the inventory count and no alternative procedures were possible. Inventory is material but not pervasive.\nA  Unmodified  B  Qualified  C  Adverse  D  Disclaimer\n\n(3) The company's accounting records for the first eight months of the year were destroyed in a fire and cannot be reconstructed. The auditor can obtain no evidence about most balances.\nA  Unmodified  B  Qualified  C  Adverse  D  Disclaimer\n\n(4) The company has ceased trading and will be liquidated, but the financial statements have been prepared on the going concern basis.\nA  Unmodified  B  Qualified  C  Adverse  D  Disclaimer\n\n(5) A material uncertainty exists regarding going concern, and it is fully and adequately disclosed in the notes to the financial statements.\nA  Unmodified  B  Qualified  C  Adverse  D  Disclaimer",
    plan: [
      {
        step: "Apply the two-step test in the same order every time",
        detail:
          "First: is the problem a MATERIAL MISSTATEMENT, or an INABILITY TO OBTAIN SUFFICIENT APPROPRIATE EVIDENCE? Second: is the effect MATERIAL BUT NOT PERVASIVE, or MATERIAL AND PERVASIVE? Two questions, four answers, no guessing.",
      },
      {
        step: "Fix the grid in memory as a 2×2",
        detail:
          "Misstatement + material = QUALIFIED. Misstatement + pervasive = ADVERSE. No evidence + material = QUALIFIED. No evidence + pervasive = DISCLAIMER. Note that QUALIFIED appears in both rows, which is why the first question alone never gives the answer.",
      },
      {
        step: "Define pervasive rather than guessing at it",
        detail:
          "Effects that are NOT CONFINED to specific elements; or if confined, represent a SUBSTANTIAL PROPORTION of the financial statements; or, for disclosures, are FUNDAMENTAL to users' understanding. A wrong basis of preparation is pervasive by definition, because it affects everything.",
      },
      {
        step: "Remember that a disclosed material uncertainty does not modify anything",
        detail:
          "If the going concern basis is appropriate and the uncertainty is ADEQUATELY DISCLOSED, the statements are NOT misstated — the disclosure is correct. So the opinion is UNMODIFIED, with a separate Material Uncertainty Related to Going Concern section that says so.",
      },
    ],
    answer:
      "**(1) B — Qualified.** The financial statements are **materially misstated** (inventory is overstated and the directors will not adjust it), and the effect is **material but not pervasive** because it is confined to one balance. The opinion is qualified — *'except for the effects of the matter described in the Basis for Qualified Opinion section'* — with a **Basis for Qualified Opinion** section quantifying the misstatement and explaining its effect.\n\n**(2) B — Qualified.** The problem is an **inability to obtain sufficient appropriate audit evidence**, not a known misstatement — the auditor does not know whether inventory is misstated. The effect is **material but not pervasive**, so the opinion is qualified: *'except for the possible effects of the matter described...'*. Note the wording differs from (1): **'possible effects'** is used where evidence is missing, because the auditor cannot assert that a misstatement exists.\n\n**(3) D — Disclaimer of opinion.** Again an **inability to obtain sufficient appropriate evidence**, but here the effect is **pervasive** — the auditor can obtain no evidence about most balances, so the possible effects are not confined to specific elements and represent a substantial proportion of the financial statements. The auditor **does not express an opinion**.\n\n**(4) C — Adverse opinion.** The going concern basis is **inappropriate** because the entity is being liquidated, yet the statements have been prepared on it. This is a **material misstatement**, and because the **basis of preparation** affects the financial statements **as a whole**, the effect is **pervasive**. The auditor states that the financial statements **do not** give a true and fair view.\n\n**(5) A — Unmodified.** The going concern basis is appropriate, a material uncertainty exists, and it is **adequately disclosed** — so the financial statements are **not misstated**; the disclosure is exactly what the framework requires. The opinion is **unmodified**, with a separate section headed **'Material Uncertainty Related to Going Concern'** placed after the Basis for Opinion section, drawing attention to the note and **stating that the opinion is not modified** in respect of the matter.\n\n**The grid that answers every question of this type**\n\n| | **Material but not pervasive** | **Material and pervasive** |\n|---|---|---|\n| **Financial statements are materially misstated** | **Qualified** — 'except for the effects' | **Adverse** |\n| **Unable to obtain sufficient appropriate evidence** | **Qualified** — 'except for the possible effects' | **Disclaimer** |\n\n**Pervasive** means effects that are **not confined to specific elements** of the financial statements; or, if confined, represent or could represent a **substantial proportion** of them; or, in relation to disclosures, are **fundamental to users' understanding**.",
    earns: [
      "Applying the two-step test rather than recognising the scenario",
      "Distinguishing 'effects' from 'possible effects' in the two qualified wordings",
      "Knowing a wrong basis of preparation is pervasive by definition",
      "Knowing an adequately disclosed material uncertainty leaves the opinion unmodified",
    ],
    loses: [
      "Giving an adverse opinion for a material but non-pervasive misstatement",
      "Giving a disclaimer where the missing evidence relates to one balance only",
      "Treating the Material Uncertainty section as a modification",
    ],
  },

  "AA-22::emphasis": {
    title: "Emphasis of Matter and Other Matter paragraphs",
    format: "written",
    marks: 6,
    requirement:
      "Explain the purpose of an Emphasis of Matter paragraph and of an Other Matter paragraph, describe when each is used, and explain how they differ from a modified opinion. (6 marks)",
    plan: [
      {
        step: "Define an Emphasis of Matter by the condition that must ALREADY be satisfied",
        detail:
          "It refers to a matter APPROPRIATELY PRESENTED OR DISCLOSED in the financial statements which, in the auditor's judgement, is of such importance that it is FUNDAMENTAL TO USERS' UNDERSTANDING. The accounting must already be correct — that is the condition candidates ignore.",
      },
      {
        step: "State the three requirements for the paragraph itself",
        detail:
          "It must be in a SEPARATE SECTION with an appropriate heading; it must REFER CLEARLY to the matter and to where it is disclosed in the financial statements; and it must state that the AUDITOR'S OPINION IS NOT MODIFIED in respect of the matter. That last sentence is mandatory.",
      },
      {
        step: "Define an Other Matter paragraph by what it is NOT",
        detail:
          "It refers to a matter NOT presented or disclosed in the financial statements which is relevant to users' understanding of the AUDIT, the AUDITOR'S RESPONSIBILITIES, or the AUDITOR'S REPORT. The distinction is whether the matter is inside the financial statements or outside them.",
      },
      {
        step: "State the difference from a modification in one clear sentence",
        detail:
          "Neither paragraph modifies the opinion. A MODIFICATION says something is WRONG — the statements are misstated, or evidence is missing. An Emphasis of Matter says something is RIGHT but so important that users should notice it. Using an Emphasis of Matter as a substitute for a modification is a serious error.",
      },
    ],
    answer:
      "**Emphasis of Matter paragraph**\n\n*Purpose:* to draw users' attention to a matter **appropriately presented or disclosed in the financial statements** which, in the auditor's judgement, is of such importance that it is **fundamental to users' understanding** of them.\n\n**The precondition that decides everything:** the matter must **already be correctly accounted for and adequately disclosed**. If it is not, the financial statements are misstated and the answer is a **modified opinion**, not an Emphasis of Matter.\n\n*When it is used:*\n\n· **significant uncertainty over the outcome of exceptional litigation or regulatory action**, adequately disclosed\n· an **early application** of a new accounting standard with a pervasive effect\n· a **major catastrophe** that has had, or continues to have, a significant effect on the entity's financial position\n· a subsequent event that is **non-adjusting** but of fundamental importance, properly disclosed\n\n*Requirements for the paragraph:*\n\n· it must be included in a **separate section** with an appropriate heading — 'Emphasis of Matter'\n· it must **refer clearly to the matter** and to the **note in the financial statements** where it is fully described\n· it must state that the **auditor's opinion is not modified** in respect of the matter\n· it is placed **after the Basis for Opinion** section, and after any Material Uncertainty Related to Going Concern section\n\n**Other Matter paragraph**\n\n*Purpose:* to communicate a matter **other than those presented or disclosed in the financial statements** which, in the auditor's judgement, is relevant to users' understanding of the **audit**, the **auditor's responsibilities**, or the **auditor's report**.\n\n*When it is used:*\n\n· where the **prior period financial statements were audited by another auditor**, or were **unaudited**\n· where the auditor is **unable to resign** but the engagement is subject to a scope limitation imposed by management\n· to explain that the report is intended **solely for a specific user**\n· where the auditor reports on **more than one set of financial statements**\n\n**The distinction between the two:** an **Emphasis of Matter** concerns something **inside** the financial statements; an **Other Matter** concerns something **outside** them, relating to the audit or the report itself.\n\n**How both differ from a modified opinion**\n\n**Neither modifies the opinion**, and both must be read as additions to an otherwise unmodified report.\n\n· A **modified opinion** says something is **wrong** — either the financial statements are **materially misstated**, or the auditor was **unable to obtain sufficient appropriate evidence**.\n· An **Emphasis of Matter** says something is **right** — properly accounted for and properly disclosed — but is so important that users should be directed to it.\n\nUsing an Emphasis of Matter **as a substitute for a modification** is a serious error: it tells users the accounting is correct when the auditor has concluded it is not. It is also not a substitute for **disclosure by management**, nor for the auditor **reporting a material uncertainty** where the disclosure is inadequate.",
    earns: [
      "Making the precondition explicit — the matter must already be properly accounted for and disclosed",
      "Giving the mandatory 'opinion is not modified' statement",
      "Distinguishing Emphasis of Matter (inside the statements) from Other Matter (outside them)",
      "Stating clearly that neither modifies the opinion, and why substituting one for a modification is wrong",
    ],
    loses: [
      "Using an Emphasis of Matter where the financial statements are materially misstated",
      "Describing an Emphasis of Matter as a form of modification or as a 'mild qualification'",
      "Omitting the Other Matter paragraph, which is half the requirement",
    ],
  },

  "AA-22::five-scenarios": {
    title: "Five scenarios, five reports",
    format: "written",
    marks: 20,
    requirement:
      "You are completing the audit of Ravenglass Co for the year ended 31 December 20X5. Its draft financial statements show profit before tax of $4 million and total assets of $30 million. The following matters remain outstanding.\n\n(i)   Inventory is included at $2.9 million. Your testing indicates that damaged goods with a carrying amount of $500,000 have a net realisable value of $nil. The directors refuse to write them down.\n(ii)  A subsidiary holds inventory of $800,000 at a remote site. You were unable to attend the count and no alternative procedures are available.\n(iii) The company's overdraft facility expires in three months and the bank has not confirmed renewal. The directors have prepared a forecast supporting the going concern basis, and the financial statements include a full and adequate note describing the uncertainty.\n(iv)  Accounting records for the first eight months of the year were destroyed in a flood and cannot be reconstructed. You are unable to obtain evidence about most transactions for that period.\n(v)   A customer has commenced legal action claiming $250,000. The directors, supported by legal advice, consider the claim will fail and have disclosed it as a contingent liability in the notes. You concur with their assessment.\n\nFor EACH matter, assess its materiality, explain the issue, and describe the impact on your auditor's report. (20 marks)",
    plan: [
      {
        step: "Give every matter the same three-part structure, and lay it out that way",
        detail:
          "MATERIALITY (with the calculation), THE ISSUE, THE IMPACT ON THE REPORT. Four marks per matter, and the marking guide has all three parts. Answers that jump straight to naming an opinion forfeit the assessment marks, which are the majority.",
      },
      {
        step: "Calculate materiality against BOTH benchmarks and say which applies",
        detail:
          "Profit before tax $4m: 5%–10% = $200,000–$400,000. Total assets $30m: 1%–2% = $300,000–$600,000. Do the percentage for each matter and state the conclusion — 'material' is a conclusion, not an assertion, and the calculation is a mark every time.",
      },
      {
        step: "Classify each matter with the two-step test before naming any opinion",
        detail:
          "Misstatement or lack of evidence? Material or pervasive? Only then does the opinion follow. Working the test visibly is what earns the explanation marks, and it prevents the guessing that produces adverse opinions for confined issues.",
      },
      {
        step: "Watch for the two matters that do NOT modify the opinion",
        detail:
          "The going concern uncertainty is ADEQUATELY DISCLOSED, so the opinion is unmodified with a Material Uncertainty section. The legal claim is CORRECTLY TREATED and the auditor CONCURS, so there is no report impact at all — or at most an Emphasis of Matter if the auditor judged it fundamental. Scenarios always include matters requiring no modification, and treating everything as a problem is the standard trap.",
      },
      {
        step: "Describe the impact specifically, not generically",
        detail:
          "Name the opinion, name the section that would be added and where it sits, and say what that section would contain. 'The opinion would be modified' is a fraction of the available mark.",
      },
      {
        step: "Do all five",
        detail:
          "Four marks each, and the fifth is worth as much as the first. If time runs short, shorten each rather than dropping one.",
      },
    ],
    answer:
      "**Materiality benchmarks for Ravenglass Co**\nProfit before tax $4m → 5%–10% = **$200,000 to $400,000**\nTotal assets $30m → 1%–2% = **$300,000 to $600,000**\n\n**(i) Damaged inventory not written down — $500,000**\n\n*Materiality:* $500,000 is **12.5% of profit before tax** and **1.7% of total assets**. **Material** on both measures.\n\n*The issue:* IAS 2 requires inventory to be held at the **lower of cost and net realisable value**. Goods with an NRV of $nil must be **written down in full**. The directors' refusal means **inventory and profit are both overstated by $500,000**. This is a **material misstatement** — the auditor knows the amount and knows it is wrong.\n\n*Impact on the report:* The effect is **material but not pervasive**, as it is confined to a single balance and does not represent a substantial proportion of the financial statements. The auditor issues a **qualified opinion**: *'except for the effects of the matter described in the Basis for Qualified Opinion section, the financial statements give a true and fair view...'*. A **Basis for Qualified Opinion** section is included **immediately after the Opinion section**, describing the matter and quantifying the $500,000 overstatement of inventory and profit.\n\n**(ii) Unable to attend the inventory count at a subsidiary — $800,000**\n\n*Materiality:* $800,000 is **20% of profit before tax** and **2.7% of total assets**. **Material**.\n\n*The issue:* This is **not** a known misstatement — the auditor does not know whether the inventory is misstated. It is an **inability to obtain sufficient appropriate audit evidence** regarding the **existence** of inventory, and no alternative procedures are available.\n\n*Impact on the report:* The effect is **material but not pervasive**, being confined to one balance. The auditor issues a **qualified opinion**: *'except for the **possible effects** of the matter described...'*. Note the wording — **'possible effects'**, because the auditor cannot assert that a misstatement exists. A **Basis for Qualified Opinion** section explains that the auditor was unable to attend the count and that no alternative procedures were available.\n\n**(iii) Going concern uncertainty over the overdraft facility, adequately disclosed**\n\n*Materiality:* Going concern affects the financial statements **as a whole**, so it is material by nature regardless of any calculation.\n\n*The issue:* A **material uncertainty** exists — the facility expires in three months and renewal is unconfirmed, which may cast significant doubt on the entity's ability to continue as a going concern. However, the directors have prepared a forecast supporting the basis, and the financial statements contain a **full and adequate note** describing the uncertainty. The going concern basis is therefore **appropriate** and the disclosure is **adequate**, so the financial statements are **not misstated**.\n\n*Impact on the report:* The opinion is **unmodified**. A separate section headed **'Material Uncertainty Related to Going Concern'** is included **immediately after the Basis for Opinion section**, drawing attention to the note, describing the uncertainty, and **stating that the auditor's opinion is not modified in respect of the matter**. The auditor should first confirm that the forecast and its assumptions have been adequately tested and that the disclosure is genuinely sufficient.\n\n**(iv) Accounting records for eight months destroyed**\n\n*Materiality:* The records cover **two thirds of the year**, so the amounts affected are far in excess of any materiality threshold.\n\n*The issue:* An **inability to obtain sufficient appropriate audit evidence**, arising from circumstances beyond the entity's control. The auditor can obtain no evidence about **most transactions** for eight months of the year.\n\n*Impact on the report:* The possible effects are **material AND pervasive** — they are **not confined to specific elements** of the financial statements and represent a **substantial proportion** of them. The auditor issues a **disclaimer of opinion**: *'we do not express an opinion on the accompanying financial statements'*. A **Basis for Disclaimer of Opinion** section explains that the records were destroyed and that the auditor was unable to obtain sufficient appropriate evidence. In a disclaimer, the **Key Audit Matters** section is omitted, and the Auditor's Responsibilities section is shortened.\n\n**(v) Legal claim of $250,000 disclosed as a contingent liability**\n\n*Materiality:* $250,000 is **6.25% of profit before tax** and **0.8% of total assets** — at the lower end of the profit range, so **borderline material** on profit and immaterial against assets.\n\n*The issue:* Under IAS 37, where an outflow is **possible but not probable**, a **contingent liability is disclosed** rather than a provision recognised. The directors are supported by **legal advice** and **the auditor concurs** with their assessment. The accounting treatment and the disclosure are therefore **correct**.\n\n*Impact on the report:* **No modification is required** — the financial statements are not misstated and the auditor has obtained sufficient evidence, including the legal advice. The opinion is **unmodified**. The auditor could consider an **Emphasis of Matter** paragraph only if the uncertainty were judged **fundamental to users' understanding**; on these figures it is not, and no such paragraph is needed. The auditor should ensure the disclosure is complete and obtain a written representation confirming management's assessment.\n\n**Summary**\n\n| Matter | Classification | Effect | Opinion |\n|---|---|---|---|\n| (i) Inventory not written down | Material misstatement | Material, not pervasive | **Qualified** — 'except for the effects' |\n| (ii) Count not attended | Unable to obtain evidence | Material, not pervasive | **Qualified** — 'except for the possible effects' |\n| (iii) Going concern, disclosed | Neither — disclosure adequate | — | **Unmodified** + Material Uncertainty section |\n| (iv) Records destroyed | Unable to obtain evidence | Material and pervasive | **Disclaimer** |\n| (v) Contingent liability, correctly disclosed | Neither — treatment correct | — | **Unmodified**, no additional section |",
    earns: [
      "Materiality calculated against both benchmarks for every matter, with a stated conclusion",
      "Each matter classified as misstatement or lack of evidence before any opinion is named",
      "The distinction between 'effects' and 'possible effects' in the two qualified opinions",
      "Recognising the two matters that require no modification at all",
      "Naming the specific section added, where it sits, and what it contains",
    ],
    loses: [
      "Naming opinions without assessing materiality, which forfeits most of the marks",
      "Treating every matter in the scenario as requiring a modification",
      "Giving an adverse opinion for the inventory misstatement, which is confined to one balance",
      "Using an Emphasis of Matter for the going concern uncertainty instead of the Material Uncertainty section",
      "Answering fewer than five matters when each is worth four marks",
    ],
  },

  /* ── AA-23 · Employability and technology skills ────────────────── */

  "AA-23::validate": {
    title: "From client data to reliable audit evidence",
    format: "written",
    marks: 6,
    requirement:
      "Explain why the auditor must establish the reliability of data obtained from the client before using it as audit evidence, describe the procedures used to do so, and explain how data analytics is used in the audit. (6 marks)",
    plan: [
      {
        step: "State the principle that makes this matter",
        detail:
          "Evidence produced BY THE ENTITY is only as reliable as the system that produced it. An analytical procedure performed on an incomplete data extract gives a confident answer that is wrong — and the auditor has no way of knowing, because the extract looks complete.",
      },
      {
        step: "Give the validation procedures concretely",
        detail:
          "Agree CONTROL TOTALS and record counts from the extract back to the source system; reconcile the extract to the general ledger or the trial balance; check the extract covers the FULL PERIOD and all locations; test the ACCURACY of a sample of records back to source documents; and consider the general IT controls over the system that produced it.",
      },
      {
        step: "Cover the spreadsheet risk, which is where this bites in practice",
        detail:
          "Client schedules in spreadsheets are frequently manually adjusted, contain broken formulas or hidden rows, and have no version control. Cast them, check the formulas, and look for hard-coded values where a formula should be.",
      },
      {
        step: "Explain data analytics as testing 100% rather than sampling",
        detail:
          "Analysing whole populations to identify exceptions and outliers — journal entries posted at unusual times or by unusual users, duplicate payments, gaps in sequences, entries to unrelated accounts. It changes what the auditor can do, but it does NOT change the requirement that the underlying data be validated first.",
      },
    ],
    answer:
      "**Why reliability must be established first.** Audit evidence produced by the entity is only as reliable as the **system and the people that produced it**. A report or data extract supplied by the client may be **incomplete**, may cover the **wrong period**, may **exclude a location or a category** of transaction, or may have been **filtered** — and none of that is visible from the extract itself. An analytical procedure performed on such data produces a confident, precise and entirely wrong conclusion.\n\nThis matters more, not less, as audit work becomes automated: the larger the population being analysed, the greater the reliance placed on the data being complete, and ISA 500 requires the auditor to evaluate the **accuracy and completeness** of information produced by the entity before using it.\n\n**Procedures to validate client data**\n\n· **Agree control totals and record counts** from the extract back to the **source system** — the number of transactions, the total value, and the range of dates.\n· **Reconcile the extract to the general ledger** or trial balance, and ultimately to the financial statements, so the population tested is the population reported.\n· **Confirm the extract covers the full period and all relevant locations**, divisions or ledgers, and that no filter has been applied.\n· **Test the accuracy of a sample of records** back to **source documentation**, confirming the data reflects the underlying transactions.\n· **Obtain the data directly from the system** where possible, or observe its extraction, rather than accepting a file the client has prepared unobserved.\n· **Consider the general IT controls** over the system that produced the data — access controls, change management and back-up — since data from a poorly controlled system is less reliable regardless of how it was extracted.\n\n**Spreadsheets specifically.** Client schedules prepared in spreadsheets carry particular risks: **manual adjustments** overwriting formulas, **hard-coded values** where a calculation should be, **hidden rows or columns** excluded from totals, broken ranges after insertion, and **no version control**. The auditor should **cast and cross-cast** them, **inspect the formulas** in key cells, and confirm the totals agree to the accounting records.\n\n**How data analytics is used**\n\n· **Testing entire populations rather than samples**, which removes sampling risk for that procedure and allows the auditor to state a conclusion about every item.\n· **Identifying exceptions and outliers** for follow-up — journal entries posted at **unusual times** or **by unusual users**, round-sum amounts, entries to **unrelated accounts**, and entries made close to the **period end**, all of which are directly relevant to the required **management override** procedures.\n· **Matching and reconciling across data sets** — three-way matching of purchase orders, goods received notes and invoices, and identifying **unmatched items** at the year end that may represent unrecorded liabilities.\n· **Detecting duplicates and gaps** — duplicate payments or invoices, and gaps in sequences of documents which may indicate unrecorded transactions.\n· **Recalculating on the whole population** — depreciation, discounts, payroll gross-to-net, and the ageing of receivables.\n· **Visualising trends and relationships** to direct audit attention, for example revenue by day of the month showing an unexpected spike immediately before the year end.\n\n**The limitation that does not go away.** Analytics tests the data **as extracted**. It provides powerful evidence about the items **within** the population, and **no evidence at all** that the population itself is complete — which is why the validation procedures above come first, and why evidence about completeness must still come from **outside** the accounting records.",
    earns: [
      "Explaining that an analysis of incomplete data produces a confident wrong answer",
      "Specific validation procedures — control totals, reconciliation to the ledger, period coverage",
      "Covering the particular risks of client spreadsheets",
      "Explaining analytics as whole-population testing, and noting it cannot prove completeness of the population",
    ],
    loses: [
      "Describing data analytics without addressing the reliability of the underlying data",
      "Treating a client-produced report as reliable because it came from the accounting system",
    ],
  },

  "AA-23::working-papers": {
    title: "Working papers another auditor could review",
    format: "written",
    marks: 5,
    requirement:
      "Explain the qualities of a well-prepared audit working paper, and describe the consequences of poor documentation. (5 marks)",
    plan: [
      {
        step: "Anchor on the ISA 230 standard, then translate it into practical qualities",
        detail:
          "An EXPERIENCED AUDITOR WITH NO PREVIOUS CONNECTION must be able to understand the work from the paper alone. Every quality below is that standard made concrete, and quoting the test first frames the whole answer.",
      },
      {
        step: "List the qualities as separate points",
        detail:
          "A clear HEADER — client, year end, subject, preparer and date, reviewer and date. A stated OBJECTIVE — which assertion is being tested. The SOURCE of the information. The WORK PERFORMED, including the sample selected and how, with items identified so the test could be repeated. The RESULTS, including all exceptions. And a CONCLUSION that answers the objective.",
      },
      {
        step: "Insist on the conclusion, which is what is most often missing",
        detail:
          "A paper full of ticks with no conclusion leaves the reviewer unable to tell what the preparer decided. The conclusion must ANSWER THE OBJECTIVE stated at the top — 'from the testing performed, receivables are fairly stated' — not merely record that the work was done.",
      },
      {
        step: "Insist that exceptions are recorded and resolved",
        detail:
          "Every exception found must be recorded, investigated and its resolution documented. A paper that records only the items that agreed is worse than useless, because it conceals the evidence that mattered most.",
      },
      {
        step: "Give the consequences, which are the second half of the requirement",
        detail:
          "The reviewer cannot conclude the work was adequate; the opinion may be unsupported; the firm is exposed in litigation and regulatory inspection, where UNDOCUMENTED WORK IS TREATED AS WORK NOT DONE; next year's team cannot build on it; and the firm may breach ISA 230.",
      },
    ],
    answer:
      "**The standard to meet.** ISA 230 requires documentation sufficient for an **experienced auditor with no previous connection to the audit** to understand the **nature, timing and extent** of the procedures performed, the **results and evidence obtained**, and the **significant matters and conclusions** reached. Every quality below is that test made practical.\n\n**Qualities of a well-prepared working paper**\n\n· **A complete header** — the **client name**, the **year end**, the **subject** of the paper, a reference, who **prepared** it and when, and who **reviewed** it and when.\n· **A stated objective** — what the test is intended to achieve and **which assertion** it addresses. Without it, neither the preparer nor the reviewer can judge whether the work was adequate.\n· **The source of the information** used — which report, which ledger, which system, and how it was obtained, so the reviewer can assess its reliability.\n· **The work performed, described so it could be repeated** — the **population**, the **sample size and how it was selected**, and the **identifying characteristics** of the items tested, such as invoice numbers or a range of dates.\n· **The results, including all exceptions.** Every difference found must be recorded, **investigated**, and its **resolution documented**. A paper recording only the items that agreed conceals the very evidence that mattered.\n· **A conclusion that answers the objective** — not simply 'testing complete', but a statement of what the auditor concluded from the work, referring back to the assertion in the objective.\n· **Cross-references** to the lead schedule, the financial statements and to related working papers, so figures can be traced through the file.\n· **Legibility, clarity and explained tick marks** — any symbol used must be defined on the paper itself.\n\n**Consequences of poor documentation**\n\n· **The reviewer cannot conclude that the work was adequate**, so the review process fails and errors go undetected.\n· **The audit opinion may be unsupported.** The file is the evidence for the opinion; if the file does not demonstrate that sufficient appropriate evidence was obtained, the opinion has no demonstrable basis.\n· **The firm is exposed in litigation and regulatory inspection.** In both contexts, **work that is not documented is treated as work that was not done**, however thoroughly it was performed. The file is the only record that survives.\n· **ISA 230 is breached**, which is itself a failure to conduct the audit in accordance with ISAs, and may lead to disciplinary action against the firm or individuals.\n· **Inefficiency in future audits.** The following year's team cannot understand what was done or why, and repeats work or misses points of continuing significance.\n· **Quality control failures** — the engagement quality reviewer for a listed entity cannot complete their review, which would prevent the report being issued.",
    earns: [
      "Quoting the experienced auditor with no previous connection test",
      "Listing qualities as discrete points, including the objective and the conclusion",
      "Insisting that exceptions are recorded, investigated and resolved",
      "Giving consequences, particularly that undocumented work is treated as work not done",
    ],
    loses: [
      "Describing what a working paper looks like without stating what it must achieve",
      "Omitting the consequences, which are half the requirement",
      "Giving a conclusion that says the work was done rather than what it showed",
    ],
  },

  "AA-23::communicating": {
    title: "Communicating what you found",
    format: "written",
    marks: 6,
    requirement:
      "Explain the matters the auditor is required to communicate to those charged with governance, and describe the qualities of effective communication of audit findings. (6 marks)",
    plan: [
      {
        step: "Give the required communications as a list, since each is a mark",
        detail:
          "The auditor's RESPONSIBILITIES in relation to the audit; the PLANNED SCOPE AND TIMING; SIGNIFICANT FINDINGS from the audit; and, for listed entities, a statement of compliance with INDEPENDENCE requirements. Four required categories under ISA 260.",
      },
      {
        step: "Expand 'significant findings', which carries most of the marks",
        detail:
          "The auditor's views on significant QUALITATIVE ASPECTS of accounting practices, including policies, estimates and disclosures; SIGNIFICANT DIFFICULTIES encountered; significant matters DISCUSSED WITH MANAGEMENT; written representations requested; circumstances affecting the FORM AND CONTENT of the auditor's report; and any other significant matters.",
      },
      {
        step: "Add the related communications required by other standards",
        detail:
          "SIGNIFICANT DEFICIENCIES in internal control, in writing, under ISA 265. Suspected FRAUD involving management, under ISA 240. Identified or suspected NON-COMPLIANCE with laws and regulations, under ISA 250. UNCORRECTED MISSTATEMENTS, with a request that they be corrected, under ISA 450.",
      },
      {
        step: "Give the qualities of effective communication concretely",
        detail:
          "TIMELY, so action can be taken; CLEAR, avoiding technical jargon for a non-financial audience; SPECIFIC, identifying the actual issue rather than a general concern; BALANCED, acknowledging what works as well as what does not; CONSTRUCTIVE, offering a recommendation rather than only a criticism; and PROPORTIONATE, distinguishing significant matters from minor ones so the important points are not buried.",
      },
    ],
    answer:
      "**Matters required to be communicated to those charged with governance (ISA 260)**\n\n· **The auditor's responsibilities in relation to the audit** — that the auditor is responsible for forming and expressing an opinion, and that the audit **does not relieve management or those charged with governance of their responsibilities**.\n· **The planned scope and timing of the audit** — an overview, including the auditor's approach to significant risks and to internal control, communicated early enough to be useful.\n· **Significant findings from the audit**, which is the substantial category:\n  — the auditor's views on **significant qualitative aspects of the entity's accounting practices**, including accounting policies, accounting estimates and disclosures, and whether they are **acceptable but aggressive**, or genuinely appropriate\n  — **significant difficulties encountered** during the audit, such as delays in obtaining information or restrictions imposed by management\n  — **significant matters discussed with management**, and any **disagreements**\n  — the **written representations** the auditor is requesting\n  — circumstances that affect the **form and content of the auditor's report**, including any expected modification\n  — any **other significant matters** relevant to the oversight of financial reporting\n· **A statement that the auditor has complied with ethical requirements regarding independence**, for the audit of a **listed entity**, together with the relationships and safeguards that bear on it.\n\n**Related communications required by other standards**\n\n· **Significant deficiencies in internal control** — communicated **in writing**, on a timely basis (ISA 265).\n· **Suspected fraud involving management**, those charged with governance, or employees with a significant role in internal control (ISA 240).\n· **Identified or suspected non-compliance with laws and regulations** (ISA 250).\n· **Uncorrected misstatements**, with a request that they be corrected, and the effect they may have on the opinion (ISA 450).\n· A **material uncertainty relating to going concern**, and the intended treatment in the auditor's report (ISA 570).\n\n**Qualities of effective communication**\n\n· **Timely.** Communicated early enough for those charged with governance to **take action**. A significant deficiency reported months after it was identified has lost most of its value.\n· **Clear and free of unnecessary technical language.** Those charged with governance may include **non-financial** directors; a point they cannot understand cannot be acted on.\n· **Specific.** Identify the actual issue, its cause and its effect — 'controls over the payment run are weak' is not actionable; 'the payment run is authorised by one director who does not review supporting documentation, so payments could be made for goods never received' is.\n· **Balanced and objective.** Acknowledge what operates effectively as well as what does not, and reflect the significance of each matter proportionately.\n· **Constructive.** Offer a **recommendation** alongside each finding rather than criticism alone, so the communication is of practical use.\n· **Proportionate and prioritised.** Distinguish significant matters from minor ones, so the important points are not lost in a long list — an undifferentiated schedule of forty findings buries the three that matter.\n· **In an appropriate form.** Significant deficiencies must be **in writing**; other matters may be oral, but should be **documented** where they are significant. The auditor should also evaluate whether the **two-way communication** has been adequate, and if not, take action.",
    earns: [
      "The four ISA 260 categories, with significant findings expanded",
      "Adding the communications required by ISA 265, 240, 250 and 450",
      "Qualities given as discrete points with the reason each matters",
      "Noting which communications must be in writing",
    ],
    loses: [
      "Listing only significant deficiencies, which is one standard among several",
      "Giving qualities as adjectives with no explanation of why each matters",
      "Omitting that significant deficiencies must be communicated in writing",
    ],
  },
}
