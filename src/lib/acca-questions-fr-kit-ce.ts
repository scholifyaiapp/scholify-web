import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fr-kit-builders"

/*
 * FR · Areas C and E question kit — chapters 30 to 34.
 *
 * Analysis and interpretation, and employability. Area C is where FR's Section C
 * interpretation question comes from, and the objective-test items here are the underlying
 * mechanics: the definitions, the denominators, the distortions, and the diagnosis of a
 * pattern.
 *
 * The distortion items are the most valuable in the file. A candidate who can compute ROCE
 * but cannot say that a revaluation depresses it will write an interpretation answer that
 * attributes an accounting effect to management performance — which is the single most
 * common failure in FR's Section C.
 *
 * Area E carries five items. They are not padding: an employability area with no questions
 * behind it is an area the learner will skip, and the CBE-answering skills it covers are
 * worth 40 marks of the paper.
 *
 * All figures verified by script before authoring.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 30 · Ratio analysis ── */

const CH30: AccaQuestion[] = [
  /*
   * The two EASY items open Area C deliberately. Every other area's kit has easy-tier
   * questions and Area C originally had none, which meant the adaptive diagnostic could not
   * build a starting question for it — the learner was thrown straight into a decomposition
   * or a distortion. These two are the definitions everything else in the area rests on.
   */
  q("FRK-30-00a", "FR-30", "C", "easy",
    "Which of these is the correct definition of capital employed?",
    [
      "Equity plus long-term debt, equivalently total assets less current liabilities",
      "Total assets less total liabilities",
      "Equity plus all liabilities",
      "Total assets",
    ],
    0,
    "EQUITY PLUS LONG-TERM DEBT — which is the same figure as total assets less current liabilities, and checking one against the other is a free verification. Total assets less total liabilities is EQUITY, not capital employed; the third option is simply total assets restated."),

  num("FRK-30-00b", "FR-30", "C", "easy",
    "An entity reports revenue of $8,000,000 and gross profit of $2,600,000. Calculate the gross profit margin as a percentage, to one decimal place.",
    32.5, "%", 0.05,
    "32.5%. $2,600,000 ÷ $8,000,000 × 100. Gross margin measures the trading margin before any overhead, so a fall in it points to prices, input costs or sales mix rather than to administrative spending — which is what OPERATING margin picks up."),

  num("FRK-30-01", "FR-30", "C", "medium",
    "An entity reports operating profit of $1,980,000 on revenue of $15,000,000. Equity is $6,800,000 and long-term loans are $4,200,000. Calculate ROCE as a percentage, to one decimal place.",
    18, "%", 0.05,
    "18.0%. Capital employed = $6,800,000 + $4,200,000 = $11,000,000, so ROCE = $1,980,000 ÷ $11,000,000. Check the identity: operating margin of 13.2% × asset turnover of 1.36 times = 18.0%. Using profit AFTER interest would be inconsistent, because capital employed includes the debt that the interest is paid on."),

  q("FRK-30-02", "FR-30", "C", "medium",
    "An entity's ROCE falls from 20% to 15% while its operating margin is unchanged at 12%. What has happened?",
    [
      "Asset turnover has fallen, from 1.67 to 1.25 times",
      "Asset turnover has risen",
      "Finance costs have increased",
      "The effective tax rate has increased",
    ],
    0,
    "ASSET TURNOVER HAS FALLEN. ROCE = margin × asset turnover, so with margin constant the turnover must have moved: from 20/12 = 1.67 to 15/12 = 1.25 times. Finance costs and tax affect neither figure, both being computed before them. Decomposing ROCE this way is what turns a description into an explanation."),

  num("FRK-30-03", "FR-30", "C", "medium",
    "Revenue is $15,000,000, cost of sales $9,750,000 and inventory $1,900,000. Calculate inventory days, to one decimal place.",
    71.1, "days", 0.1,
    "71.1 days. $1,900,000 ÷ $9,750,000 × 365. The denominator is COST OF SALES, because inventory is carried at cost — using revenue would divide a cost-based numerator by a selling-price denominator and understate the days to 46.2. Only RECEIVABLES days uses revenue, because receivables are recorded at selling price."),

  num("FRK-30-04", "FR-30", "C", "hard",
    "Revenue is $15,000,000, cost of sales $9,750,000, inventory $1,900,000, trade receivables $2,400,000 and trade payables $2,100,000. Calculate the working capital cycle in days, to one decimal place.",
    50.9, "days", 0.2,
    "50.9 days. Inventory days 71.1 + receivables days ($2,400,000 ÷ $15,000,000 × 365 = 58.4) − payables days ($2,100,000 ÷ $9,750,000 × 365 = 78.6). This is the period the entity must FINANCE between paying suppliers and collecting from customers, and a lengthening cycle alongside rising revenue is the overtrading signature."),

  num("FRK-30-05", "FR-30", "C", "medium",
    "Current assets are inventory $1,900,000, receivables $2,400,000 and cash $400,000. Current liabilities are $2,800,000. Calculate the QUICK ratio, to two decimal places.",
    1, ":1", 0.01,
    "1.00:1. Inventory is excluded because it is the least liquid current asset — it must first be sold and then collected: ($1,900,000 + $2,400,000 + $400,000 − $1,900,000) ÷ $2,800,000 = $2,800,000 ÷ $2,800,000. The current ratio would be 1.68:1, and the gap between the two measures is itself informative about how much of the entity's liquidity is tied up in stock."),

  q("FRK-30-06", "FR-30", "C", "medium",
    "What happens to ROCE, asset turnover and gearing when an entity revalues its properties upwards?",
    [
      "All three fall — capital employed and equity rise, and the higher depreciation also reduces operating profit",
      "All three rise, since the asset base is larger",
      "ROCE and asset turnover fall; gearing rises",
      "None of them changes, since a revaluation is not a transaction",
    ],
    0,
    "ALL THREE FALL. Capital employed and equity both rise, depressing ROCE and asset turnover, and gearing measured as debt/equity falls because the denominator grew. Nothing about the business has improved or worsened — which is why comparing a revaluing entity with one on the cost model is unsafe without adjustment."),

  q("FRK-30-07", "FR-30", "C", "medium",
    "An entity changes its revenue presentation from AGENT to PRINCIPAL following a reassessment under IFRS 15. What happens to revenue, gross margin and profit?",
    [
      "Revenue rises sharply, gross margin collapses, and profit is unchanged",
      "Revenue and profit both rise; gross margin is unchanged",
      "Revenue rises and profit falls",
      "Revenue is unchanged; only the presentation of cost of sales changes",
    ],
    0,
    "REVENUE UP, MARGIN DOWN, PROFIT UNCHANGED. Gross presentation brings in the whole consideration with a matching cost of sales, so the absolute profit is identical while revenue and every revenue-based ratio move enormously. An entity making this change can report revenue growth of several hundred percent on no change in activity, which is why it must be flagged in an interpretation answer."),

  q("FRK-30-08", "FR-30", "C", "medium",
    "Two entities are otherwise identical, but one presents a capital grant as deferred income while the other nets it against the asset. What differs?",
    [
      "Gross assets, total liabilities and gearing differ; profit does not",
      "Profit differs; the statement of financial position does not",
      "Both profit and the statement of financial position differ",
      "Nothing differs; the presentations are equivalent",
    ],
    0,
    "THE BALANCE SHEET, NOT PROFIT. The deferred income presentation creates a liability and carries the asset gross, so gross assets, total liabilities and therefore GEARING all differ — while the net charge to profit is identical under both. Raising this in a comparison earns a mark most candidates never claim."),

  q("FRK-30-09", "FR-30", "C", "hard",
    "Which ratios would matter most to a bank considering a five-year term loan?",
    [
      "Gearing, interest cover, operating cash flow and the security available",
      "Earnings per share, the price/earnings ratio and dividend yield",
      "Gross margin, operating margin and revenue growth",
      "Inventory days, receivables days and payables days",
    ],
    0,
    "GEARING, INTEREST COVER, OPERATING CASH FLOW AND SECURITY. A lender's question is whether the loan can be SERVICED and REPAID. Investor ratios are irrelevant to it, profitability is only indirectly relevant, and working capital ratios matter as a secondary indicator of liquidity. The requirement always names a user, and the ratios should be selected for that user."),
]

/* ── Chapter 31 · Writing an interpretation ── */

const CH31: AccaQuestion[] = [
  q("FRK-31-01", "FR-31", "C", "medium",
    "Which sentence would earn the 'cause' mark in an interpretation answer?",
    [
      "Receivables days rose to 55, consistent with the 90-day terms conceded to the new supermarket customer",
      "Receivables days rose from 40 to 55, an increase of 15 days",
      "Receivables days rose, possibly due to weaker credit control or a change in customer mix",
      "Receivables days of 55 is above the industry average",
    ],
    0,
    "THE FIRST — it names something from the scenario. The second restates the movement twice; the third is generic and could have been written before reading the question, which is the test; the fourth introduces a comparator but still supplies no cause."),

  q("FRK-31-02", "FR-31", "C", "medium",
    "An entity reports revenue up 35%, gross margin down 4 points, receivables days up from 42 to 61, inventory days up from 50 to 68, and the current ratio down from 2.0 to 1.3. What is the diagnosis?",
    [
      "Overtrading — growth is absorbing cash into working capital faster than profit generates it",
      "A deliberate low-margin volume strategy that is working",
      "New capacity that is not yet productive",
      "A one-off gain inflating the comparative",
    ],
    0,
    "OVERTRADING. The signature is exactly this combination: revenue up sharply, margins down, working capital days lengthening and liquidity deteriorating. Every profitability ratio may still look acceptable while the entity runs out of cash — and only the statement of cash flows connects the two, which is why it is the first thing to request."),

  q("FRK-31-03", "FR-31", "C", "medium",
    "An entity's profit rises 30% while operating cash flow falls 20%. What should an analyst look for first?",
    [
      "A non-cash credit or a working capital absorption — a provision release, a fair value gain, or growing receivables and inventory",
      "An increase in the depreciation charge",
      "A large loan repayment during the year",
      "A share issue during the year",
    ],
    0,
    "A NON-CASH CREDIT OR WORKING CAPITAL ABSORPTION. Higher depreciation would push operating cash flow UP relative to profit, being added back; loan repayments and share issues are financing flows and do not touch the operating section at all. Whenever profit and operating cash flow diverge, the explanation is in the operating reconciliation or the notes."),

  q("FRK-31-04", "FR-31", "C", "medium",
    "An entity's operating margin rises five points while revenue grows only 4% and gross margin is unchanged. The notes disclose a $1.4m credit described as 'release of provisions no longer required'. What is the conclusion?",
    [
      "Underlying trading has not improved; the apparent improvement is a non-recurring accounting credit",
      "Cost control has improved substantially",
      "The entity has achieved operating leverage on modest revenue growth",
      "The provision release confirms that the original estimate was fraudulent",
    ],
    0,
    "A NON-RECURRING CREDIT. Unchanged gross margin means trading is flat, so the improvement must be below gross profit — and the notes name it. Strip out the $1.4m and the margin edges DOWN. Note the last option overreaches: a release may be entirely proper under IAS 37 if the best estimate has genuinely fallen, and the criticism is about SUSTAINABILITY, not honesty."),

  multi("FRK-31-05", "FR-31", "C", "medium",
    "Which THREE items of further information are most worth requesting to support a ratio analysis?",
    [
      "The statement of cash flows and cash flow forecasts",
      "Industry averages or a comparator entity's figures",
      "The notes, for accounting policies and non-recurring items",
      "The entity's internal management accounts for the current month",
      "The auditor's engagement letter",
      "The names of the entity's principal shareholders",
    ],
    [0, 1, 2],
    "CASH FLOW, A COMPARATOR and THE NOTES. Almost every FR interpretation requirement carries marks for identifying the limitations and the further information needed, and these three are relevant in nearly every scenario. Pick three that fit the question rather than listing everything — and note that more than two years of data is often the fourth-best answer."),

  q("FRK-31-06", "FR-31", "C", "hard",
    "Which is the correct STRUCTURE for one point in an interpretation answer?",
    [
      "The quantified movement, a cause drawn from the scenario, and the consequence for the named user",
      "The ratio, its formula, and the calculated figure for both years",
      "The movement, a comparison with the industry average, and a conclusion",
      "The calculation, the accounting standard involved, and the disclosure required",
    ],
    0,
    "MOVEMENT, CAUSE FROM THE SCENARIO, CONSEQUENCE FOR THE USER. The first option in the distractors describes a CALCULATION, which earns only the calculation mark. The second and third add material that may be useful but omit the scenario-specific cause, which is where most of the available marks sit."),
]

/* ── Chapter 32 · Interpreting consolidated statements ── */

const CH32: AccaQuestion[] = [
  num("FRK-32-01", "FR-32", "C", "hard",
    "A group's revenue rose from $13,000,000 to $18,000,000. A subsidiary acquired during the year contributed $3,500,000 of that revenue. Calculate ORGANIC revenue growth as a percentage, to two decimal places.",
    11.54, "%", 0.05,
    "11.54%. Organic revenue is $18,000,000 − $3,500,000 = $14,500,000, so growth is $1,500,000 ÷ $13,000,000 = 11.54%. Reported growth is 38.46%, of which 26.92 points were BOUGHT. And the distortion continues into next year as the subsidiary annualises from part-year to full-year — worth saying, because most candidates stop at the current year."),

  q("FRK-32-02", "FR-32", "C", "medium",
    "Why does a mid-year acquisition depress a group's asset turnover?",
    [
      "The statement of financial position includes all the subsidiary's assets while the income statement includes only its post-acquisition revenue",
      "Goodwill is added to assets and generates no revenue at all",
      "The subsidiary's assets are consolidated at fair value rather than carrying amount",
      "Acquisition costs are capitalised and increase the asset base",
    ],
    0,
    "A FULL BALANCE SHEET AGAINST A PARTIAL INCOME STATEMENT. That mismatch is the source of every mid-year acquisition distortion. Goodwill contributes as well, but the timing mismatch is the main driver — and acquisition costs are EXPENSED, not capitalised, so the last option is wrong on its own terms."),

  q("FRK-32-03", "FR-32", "C", "medium",
    "Why does holding an associate overstate a group's profit margin?",
    [
      "The share of the associate's profit is included but none of its revenue enters the denominator",
      "The associate's revenue is included but only part of its profit",
      "The associate's assets are consolidated but not its liabilities",
      "It does not — the equity method has no effect on margins",
    ],
    0,
    "PROFIT IN, REVENUE OUT. The share of profit appears after operating profit, so a candidate computing a margin on PROFIT BEFORE TAX picks it up automatically while the denominator excludes the associate's revenue entirely. Use OPERATING profit and state that you have — the marker cannot award the point unless you say so."),

  q("FRK-32-04", "FR-32", "C", "medium",
    "A group reports gearing of 55%. The parent itself has borrowed nothing. How is this possible?",
    [
      "A partly-owned subsidiary's borrowings are consolidated IN FULL, whatever the ownership percentage",
      "Goodwill is treated as debt in the gearing calculation",
      "Non-controlling interest is classified as a liability",
      "The group must have breached a covenant, making its debt current",
    ],
    0,
    "SUBSIDIARY BORROWINGS ARE CONSOLIDATED IN FULL. Consolidation follows control, so all of a subsidiary's debt appears even where the group owns only 55% of it. Note also that a subsidiary's lenders may have security over its assets alone, and cash in an overseas subsidiary may be subject to exchange controls — consolidation aggregates resources but does not make them fungible."),

  q("FRK-32-05", "FR-32", "C", "hard",
    "Why should a lender be told what proportion of a group's capital employed is GOODWILL?",
    [
      "Because goodwill is not separately realisable and so provides no security",
      "Because goodwill must be deducted from equity in computing gearing",
      "Because goodwill is amortised and will reduce future profits",
      "Because goodwill indicates that the group has overpaid for acquisitions",
    ],
    0,
    "IT PROVIDES NO SECURITY. A lender assessing what it could recover cares about assets it could realise, and goodwill cannot be sold separately from the business. Goodwill is NOT deducted from equity in the standard gearing calculation, and it is not amortised under IFRS — only impaired."),

  q("FRK-32-06", "FR-32", "C", "medium",
    "When quoting a group's gearing, why must the treatment of non-controlling interest be stated?",
    [
      "Because NCI is part of equity, and including or excluding it from the denominator gives materially different figures for the same group",
      "Because NCI is a liability in some presentations and equity in others",
      "Because IFRS requires NCI to be excluded from gearing calculations",
      "Because the NCI percentage determines the gearing ratio",
    ],
    0,
    "IT IS EQUITY, AND ITS INCLUSION CHANGES THE ANSWER. There is no universally agreed definition, so two analysts can compute different gearing from the same accounts — which is itself one of the limitations of ratio analysis. IFRS does not prescribe a gearing calculation at all, and NCI is unambiguously equity in the statement of financial position."),
]

/* ── Chapter 33 · Limitations, and specialised entities ── */

const CH33: AccaQuestion[] = [
  q("FRK-33-01", "FR-33", "C", "medium",
    "Which is a limitation of RATIO ANALYSIS specifically, rather than of financial statements generally?",
    [
      "There are no universally agreed definitions, so the same accounts yield different ratios",
      "Internally generated brands are not recognised",
      "The statements report past transactions",
      "Many figures depend on estimates and judgements",
    ],
    0,
    "THE ABSENCE OF STANDARD DEFINITIONS. Gearing, capital employed and even ROCE are computed differently by different analysts. The other three are limitations of the STATEMENTS, which ratios inherit but do not create — and a question asking specifically about ratio analysis wants the ratio-specific points."),

  q("FRK-33-02", "FR-33", "C", "medium",
    "Why may a large surplus be a CRITICISM of a charity rather than an achievement?",
    [
      "Because funds given for a charitable purpose have not been applied to it",
      "Because charities are prohibited from accumulating reserves",
      "Because a surplus indicates that donors have been overcharged",
      "Because a surplus must be repaid to funders",
    ],
    0,
    "THE FUNDS HAVE NOT BEEN APPLIED TO THE MISSION. A charity does not exist to generate a surplus, so a large one raises the question why the money was not spent on beneficiaries — particularly where need is unmet. Reserves are not prohibited and are often prudent; the point is proportionality, not principle."),

  multi("FRK-33-03", "FR-33", "C", "medium",
    "Which THREE constitute VALUE FOR MONEY analysis?",
    ["Economy", "Efficiency", "Effectiveness", "Profitability", "Liquidity", "Solvency"],
    [0, 1, 2],
    "THE THREE Es. Economy is the cost of obtaining inputs; efficiency is outputs per unit of input; effectiveness is the extent to which objectives are achieved. Equity — whether the service reaches all groups fairly — is sometimes added as a fourth. Profitability, liquidity and solvency are commercial measures that a not-for-profit entity's objective does not engage."),

  q("FRK-33-04", "FR-33", "C", "medium",
    "A public sector body reduces its cost per unit of input while its service outcomes deteriorate. Which of the three Es has it improved and which has it damaged?",
    [
      "Improved economy; damaged effectiveness",
      "Improved efficiency; damaged economy",
      "Improved effectiveness; damaged efficiency",
      "Improved all three, since cost has fallen",
    ],
    0,
    "ECONOMY IMPROVED, EFFECTIVENESS DAMAGED. This is the standard illustration of why economy pursued in isolation destroys value for money: cheaper inputs — less experienced staff, lower specification materials — reduce the achievement of objectives. An answer that discusses only cost has assessed economy and called it value for money."),

  q("FRK-33-05", "FR-33", "C", "hard",
    "A charity reports that it delivered 340,000 meals, up from 300,000. What does this measure, and what is missing?",
    [
      "An OUTPUT. The OUTCOME — whether recipients are adequately nourished — is not measurable from the financial statements",
      "An outcome, which is the appropriate measure of effectiveness",
      "Efficiency, which requires no further information",
      "Economy, since more meals means a lower cost per meal",
    ],
    0,
    "AN OUTPUT, NOT AN OUTCOME. Outputs are what the entity produced; outcomes are the change it achieved. Financial statements can support output measures and cannot measure outcomes, and substituting one for the other is the central weakness of not-for-profit performance reporting — a hospital can raise operations performed while recovery rates fall."),

  q("FRK-33-06", "FR-33", "C", "medium",
    "Two entities have different year ends, one falling at the peak and one in the trough of a seasonal cycle. What is the effect on a comparison of their liquidity?",
    [
      "It is unsafe — working capital balances at the two dates are not comparable",
      "It has no effect, provided both apply IFRS",
      "It affects profitability but not liquidity",
      "It can be corrected by annualising both sets of figures",
    ],
    0,
    "UNSAFE, AND NOT CORRECTABLE BY ANNUALISING. The statement of financial position is a single DATE, and a seasonal business will show very different inventory, receivables and payables at its peak than in its quiet month. Annualising works for income statement figures; it does nothing for a point-in-time balance."),
]

/* ── Chapter 34 · Employability and technology skills ── */

const CH34: AccaQuestion[] = [
  q("FRK-34-01", "FR-34", "E", "easy",
    "Why does the layout of a Section C calculation affect the mark rather than only its presentation?",
    [
      "Because most Section C marks are METHOD marks, and a marker can only award them for steps they can see",
      "Because presentation marks are separately allocated in every question",
      "Because the CBE marks answers automatically and requires a fixed format",
      "Because an untidy answer suggests the candidate does not understand the topic",
    ],
    0,
    "METHOD MARKS NEED TO BE VISIBLE. A marker awarding four marks for a goodwill calculation is looking for the consideration, the share exchange valuation, the NCI and the net assets — and will award three of those four despite a wrong total, but only if each appears as a separate labelled line. One unexplained figure in a cell earns everything or nothing, and usually nothing."),

  q("FRK-34-02", "FR-34", "E", "easy",
    "A requirement asks you to 'discuss the appropriate accounting treatment and its effect on the financial statements'. Which CBE tool should be used?",
    [
      "The word processor for the discussion, with any figures in the spreadsheet and cross-referenced",
      "The spreadsheet, so that the figures and the narrative appear together",
      "The word processor only, with figures written into the prose",
      "Either — the choice makes no difference to the marks",
    ],
    0,
    "WORD PROCESSOR FOR PROSE, SPREADSHEET FOR FIGURES, CROSS-REFERENCED. Prose crammed into spreadsheet cells truncates and is hard to mark; figures buried in a paragraph are hard to check. Heading both with the same requirement label lets the marker find each half."),

  q("FRK-34-03", "FR-34", "E", "medium",
    "Why should an input such as a tax rate be entered once in its own cell and then referenced?",
    [
      "So that a later requirement revising the assumption recalculates everything rather than requiring every dependent figure to be retyped",
      "Because the CBE penalises repeated values",
      "Because hard-coded figures cannot be marked",
      "So that the spreadsheet file size stays small",
    ],
    0,
    "SO A REVISION FLOWS THROUGH. FR's Section C questions frequently revise an assumption in a later part, and a candidate who hard-coded the original figure must retype every dependent calculation — under time pressure, with a real chance of leaving an inconsistency the marker will see."),

  q("FRK-34-04", "FR-34", "E", "medium",
    "Your consolidated statement of financial position is out by $84,000 and part (c), worth 8 marks, is unattempted with 15 minutes remaining. What should you do?",
    [
      "Note the unlocated difference on the face of the answer and start part (c)",
      "Keep working on the difference — an unbalanced statement loses all the presentation marks",
      "Delete the statement and rebuild it from the beginning",
      "Reduce equity by $84,000 so that the statement balances",
    ],
    0,
    "NOTE IT AND MOVE ON. Marks come from the ADJUSTMENTS, and there are no marks for balancing as such. Eight unattempted marks are worth far more than the one or two the difference represents. And never plug the difference into equity — that turns a visible imbalance into an invisible error, which is worse."),

  q("FRK-34-05", "FR-34", "E", "medium",
    "A statement of financial position is out by $96,000. What is the most efficient first check?",
    [
      "Halve the difference and look for a $48,000 figure posted on one side only",
      "Recompute the goodwill working from the beginning",
      "Check every addition in both statements",
      "Compare the total assets figure with the prior year",
    ],
    0,
    "HALVE IT AND LOOK FOR THAT FIGURE. A one-sided entry produces a difference of exactly twice its amount, and it is by far the most common cause — an unrealised profit taken off inventory but not off reserves, for instance. Only after that check is exhausted is it worth revisiting the workings in order: NCI, the net assets closing column, the fair value depreciation, the intra-group elimination."),
]

export const FR_KIT_CE: AccaQuestion[] = [...CH30, ...CH31, ...CH32, ...CH33, ...CH34]
