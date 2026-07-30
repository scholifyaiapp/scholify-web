import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-fa-kit-builders"

/*
 * FA · Areas H and I question kit — chapters 28 to 31.
 *
 * Consolidation and interpretation. Area H is one of the two areas the real exam's
 * 15-mark multi-task questions come from, so the standard workings — the net assets
 * table, goodwill, non-controlling interest, consolidated retained earnings and
 * unrealised profit — are tested here by number entry, exactly as the CBE does.
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

/* ── Chapter 28 · The consolidated statement of financial position ── */

const CH28: AccaQuestion[] = [
  q("FAK-28-01", "FA-28", "H", "medium",
    "A parent owns 65% of a subsidiary whose net assets are $800,000. How much is consolidated, and how is the rest reported?",
    [
      "$520,000 is consolidated; the balance is ignored",
      "$800,000 is consolidated; $280,000 is shown as non-controlling interest within equity",
      "$520,000 is consolidated; $280,000 is shown as a liability",
      "$800,000 is consolidated; $280,000 is shown as a non-current liability",
    ],
    1,
    "ALL $800,000 is consolidated, because the parent CONTROLS all of those assets and liabilities. The 35% not owned — $280,000 — is presented as non-controlling interest WITHIN EQUITY. NCI is an ownership interest, not something the group owes."),

  num("FAK-28-02", "FA-28", "H", "medium",
    "A parent acquired 80% of a subsidiary for $600,000 when the subsidiary's net assets at fair value were $650,000. NCI is measured at its proportionate share of net assets. What is goodwill, in $?",
    80000, "$", 1,
    "Goodwill = consideration $600,000 − the parent's 80% share of net assets ($650,000 × 80% = $520,000) = $80,000. Under the proportionate-share method the NCI's share of net assets never enters the calculation."),

  num("FAK-28-03", "FA-28", "H", "hard",
    "A parent acquired 75% of a subsidiary for $900,000. At acquisition the NCI had a fair value of $280,000, and the net assets acquired were fairly valued at $1,020,000. What is goodwill, in $?",
    160000, "$", 1,
    "Goodwill = consideration $900,000 + fair value of NCI $280,000 − net assets acquired $1,020,000 = $160,000. Under the FAIR VALUE method the whole of the NCI is brought in, so the goodwill figure includes the NCI's share of it. Read which method the question states."),

  num("FAK-28-04", "FA-28", "H", "hard",
    "A subsidiary's net assets were $480,000 at acquisition and $610,000 at the reporting date. The parent owns 70% and NCI is at its proportionate share. What is the non-controlling interest at the reporting date, in $?",
    183000, "$", 1,
    "NCI at acquisition = 30% × $480,000 = $144,000, plus 30% of the post-acquisition increase of $130,000 = $39,000. NCI = $183,000. Alternatively 30% × closing net assets $610,000 = $183,000 — the two routes agree under the proportionate method."),

  num("FAK-28-05", "FA-28", "H", "hard",
    "A parent's retained earnings are $940,000. Its 60% subsidiary's net assets rose from $300,000 at acquisition to $450,000 at the reporting date. The parent sold goods to the subsidiary and $6,000 of unrealised profit remains in inventory. What are consolidated retained earnings, in $?",
    1024000, "$", 1,
    "$940,000 + 60% × the $150,000 post-acquisition increase ($90,000) − unrealised profit $6,000 = $1,024,000. The PARENT was the seller, so the whole $6,000 is deducted from group reserves and none is borne by the NCI."),

  num("FAK-28-06", "FA-28", "H", "hard",
    "A parent sold goods to its 80% subsidiary for $54,000 at a margin of 25%. Two thirds remain in the subsidiary's inventory. What unrealised profit is eliminated, in $?",
    9000, "$", 1,
    "Profit on the whole sale = $54,000 × 25% = $13,500, because a MARGIN's base is sales. Two thirds remain, so unrealised profit is $9,000, removed from group inventory and from consolidated retained earnings. A MARK-UP of 25% would give profit of $10,800 and a different answer."),

  q("FAK-28-07", "FA-28", "H", "medium",
    "How is an intra-group receivable and payable of $30,000 dealt with on consolidation?",
    [
      "Eliminated in full from both group receivables and group payables",
      "Eliminated only to the extent of the parent's shareholding",
      "Left in both, since both companies are real entities",
      "Removed from receivables only",
    ],
    0,
    "Eliminated IN FULL from BOTH sides. It is the same internal balance seen twice, and the group cannot owe itself money. Removing one side only would unbalance the statement; eliminating a proportion would leave part of an internal balance in place."),

  q("FAK-28-08", "FA-28", "H", "hard",
    "A subsidiary sold goods to its parent and unrealised profit remains in inventory. Where is it deducted?",
    [
      "From consolidated retained earnings in full",
      "In the subsidiary's net assets column, so that the NCI bears its share",
      "From goodwill",
      "From the parent's share capital",
    ],
    1,
    "In the SUBSIDIARY's net assets column at the reporting date, which means the NCI bears its proportionate share of the elimination. Where the PARENT is the seller the whole amount comes out of consolidated retained earnings instead — the seller determines the treatment."),

  multi("FAK-28-09", "FA-28", "H", "medium",
    "Which TWO items never appear in the consolidated statement of financial position?",
    [
      "Goodwill arising on acquisition",
      "The subsidiary's share capital",
      "The parent's investment in the subsidiary",
      "Non-controlling interest",
    ],
    [1, 2],
    "The SUBSIDIARY'S SHARE CAPITAL and the PARENT'S INVESTMENT are both cancelled against each other in the goodwill working. What appears instead is the GOODWILL that arose and the subsidiary's own assets and liabilities, with NCI shown in equity."),

  q("FAK-28-10", "FA-28", "H", "medium",
    "A company holds 12% of another and has no board representation. How is the holding accounted for?",
    [
      "Consolidated as a subsidiary",
      "As a trade investment at cost or fair value",
      "Using the equity method as an associate",
      "Deducted from group equity",
    ],
    1,
    "A TRADE INVESTMENT — neither control nor significant influence — carried at cost or fair value, with dividends received as income. Over 50% suggests control and 20–50% suggests significant influence, but the tests are control and influence, not the percentage alone."),
]

/* ── Chapter 29 · Consolidated profit or loss, and associates ── */

const CH29: AccaQuestion[] = [
  num("FAK-29-01", "FA-29", "H", "medium",
    "A parent acquired 70% of a subsidiary on 1 April in a year ending 31 December. The subsidiary's profit for the full year was $360,000, accruing evenly. What is the NCI share of profit, in $?",
    81000, "$", 1,
    "Only the post-acquisition nine months are consolidated: $360,000 × 9/12 = $270,000. NCI share = 30% × $270,000 = $81,000. Taking 30% of the whole year gives $108,000 and ignores the acquisition date — which is precisely what a mid-year acquisition tests."),

  q("FAK-29-02", "FA-29", "H", "medium",
    "How is an intra-group sale of $80,000 eliminated in the consolidated statement of profit or loss?",
    [
      "Deducted from group revenue only",
      "Deducted from both group revenue and group cost of sales",
      "Added to group cost of sales only",
      "Deducted from group profit",
    ],
    1,
    "Deducted from BOTH revenue and cost of sales, so the two cancel and group PROFIT is unchanged. What changes is the honesty of the presentation — without the elimination a group could double its revenue by selling to itself."),

  q("FAK-29-03", "FA-29", "H", "medium",
    "A group owns 40% of an associate whose revenue was $700,000 and profit $110,000. What appears in the consolidated statement of profit or loss?",
    [
      "Revenue of $280,000 and profit of $44,000",
      "A single line: share of profit of associate $44,000",
      "Revenue of $700,000 with an NCI of $66,000",
      "Nothing until a dividend is received",
    ],
    1,
    "A SINGLE LINE — 40% × $110,000 = $44,000. None of the associate's revenue is consolidated, because significant influence is not control. There is no NCI in an associate, and the equity method recognises the share of profit as it is EARNED."),

  num("FAK-29-04", "FA-29", "H", "hard",
    "An associate was acquired for $340,000 and the group's holding is 30%. Since acquisition the associate's retained earnings have risen by $220,000. What is the carrying amount of the investment, in $?",
    406000, "$", 1,
    "Cost $340,000 + 30% × the $220,000 post-acquisition growth = $340,000 + $66,000 = $406,000, shown as a single non-current asset. Dividends received reduce this carrying amount rather than being recognised as income."),

  q("FAK-29-05", "FA-29", "H", "hard",
    "A group receives a $12,000 dividend from its associate. How is it treated?",
    [
      "Recognised as investment income in profit or loss",
      "Deducted from the carrying amount of the investment",
      "Added to the share of the associate's profit",
      "Credited to other comprehensive income",
    ],
    1,
    "It REDUCES THE CARRYING AMOUNT of the investment. Under the equity method the group has already recognised its share of the profit when the associate earned it, so recognising the dividend as income as well would count the same earnings twice."),

  q("FAK-29-06", "FA-29", "H", "medium",
    "What is significant influence?",
    [
      "The power to govern another entity's financial and operating policies",
      "The power to participate in another entity's financial and operating policy decisions without controlling them",
      "Ownership of more than 50% of the voting shares",
      "The right to appoint the whole board",
    ],
    1,
    "The power to PARTICIPATE IN policy decisions without CONTROLLING them — presumed at a holding of 20% to 50%. Governing those policies, or appointing the board, would be control and the entity would be a subsidiary."),

  num("FAK-29-07", "FA-29", "H", "hard",
    "A parent's revenue is $1,600,000 and its 75% subsidiary's is $520,000, both for the full year. During the year the parent sold goods to the subsidiary for $90,000. What is consolidated revenue, in $?",
    2030000, "$", 1,
    "$1,600,000 + $520,000 − the $90,000 intra-group sale = $2,030,000. The whole of the subsidiary's revenue is added, not 75% of it, because the parent controls the subsidiary — the shareholding affects the profit split, never the consolidation of revenue."),

  num("FAK-29-08", "FA-29", "H", "hard",
    "A 60% subsidiary's post-acquisition profit is $180,000. It sold goods to the parent, and $15,000 of unrealised profit remains in group inventory. What is the NCI share of profit, in $?",
    66000, "$", 1,
    "The SUBSIDIARY was the seller, so the unrealised profit is deducted before the split: $180,000 − $15,000 = $165,000. NCI share = 40% × $165,000 = $66,000. Had the PARENT been the seller, the NCI share would have been 40% × the unadjusted $180,000 = $72,000."),

  multi("FAK-29-09", "FA-29", "H", "medium",
    "Which TWO indicate significant influence rather than control?",
    [
      "Representation on the board without a majority of votes",
      "Ownership of 80% of the voting shares",
      "Participation in policy decisions including those on dividends",
      "The power to appoint and remove the majority of directors",
    ],
    [0, 2],
    "BOARD REPRESENTATION without a majority and PARTICIPATION IN POLICY DECISIONS both indicate significant influence. An 80% holding and the power to appoint the majority of directors are both indicators of CONTROL, which makes the entity a subsidiary."),

  q("FAK-29-10", "FA-29", "H", "medium",
    "How is the unrealised profit on intra-group inventory reflected in the consolidated statement of profit or loss?",
    [
      "Deducted from group revenue",
      "Added to group cost of sales, reducing group profit",
      "Deducted from group cost of sales",
      "Shown as other comprehensive income",
    ],
    1,
    "ADDED to group cost of sales, which reduces group profit — the profit has not been earned from anyone outside the group. This is the one part of the intra-group elimination that DOES change group profit; removing the sale from revenue and cost of sales does not."),
]

/* ── Chapter 30 · Ratios ── */

const CH30: AccaQuestion[] = [
  num("FAK-30-01", "FA-30", "I", "medium",
    "Revenue is $640,000, operating profit $76,800, total assets $560,000 and current liabilities $176,000. What is ROCE, as a percentage?",
    20, "%", 0.1,
    "Capital employed = total assets $560,000 − current liabilities $176,000 = $384,000. ROCE = $76,800 ÷ $384,000 = 20.0%. Using total assets as the denominator gives 13.7% — the standard error. Check with the decomposition: margin 12% × turnover 1.667 = 20%."),

  num("FAK-30-02", "FA-30", "I", "medium",
    "Inventory is $96,000, cost of sales $584,000 and revenue $790,000. What are inventory holding days?",
    60, "days", 0.5,
    "Inventory days = $96,000 ÷ $584,000 × 365 = 60.0 days. The denominator is COST OF SALES, because inventory is carried at cost and must be compared with a cost-based flow. Using revenue gives 44.4 days and understates how long inventory is held."),

  num("FAK-30-03", "FA-30", "I", "medium",
    "Trade receivables are $148,000 and credit revenue is $900,000. What are receivables collection days?",
    60, "days", 0.5,
    "Receivables days = $148,000 ÷ $900,000 × 365 = 60.0 days. The denominator is credit REVENUE, because that is what generated the receivable — cost of sales would be the wrong flow entirely."),

  num("FAK-30-04", "FA-30", "I", "hard",
    "Inventory days are 52, receivables days 68 and payables days 45. What is the working capital cycle, in days?",
    75, "days", 0.5,
    "52 + 68 − 45 = 75 days. That is the period between paying suppliers and collecting from customers, and it is what the business must fund. A longer cycle needs more working capital, whatever the current ratio looks like."),

  num("FAK-30-05", "FA-30", "I", "medium",
    "Current assets are $420,000 including inventory of $145,000, and current liabilities are $210,000. What is the quick ratio, to two decimal places?",
    1.31, ":1", 0.01,
    "Quick ratio = ($420,000 − $145,000) ÷ $210,000 = $275,000 ÷ $210,000 = 1.31:1. The current ratio would be 2.00:1 — inventory is stripped out because it is the current asset furthest from cash."),

  num("FAK-30-06", "FA-30", "I", "hard",
    "Operating profit is $104,000, loan interest $18,000 and an irredeemable preference dividend $5,000. What is interest cover, in times?",
    5.78, "times", 0.05,
    "Interest cover = operating profit ÷ FINANCE COSTS = $104,000 ÷ $18,000 = 5.78 times. An IRREDEEMABLE preference dividend is a distribution to an equity holder, not a finance cost, so it is excluded. Including it would give 4.52 times."),

  q("FAK-30-07", "FA-30", "I", "medium",
    "What is capital employed?",
    [
      "Total assets",
      "Total equity plus non-current liabilities",
      "Total equity only",
      "Current assets less current liabilities",
    ],
    1,
    "Total EQUITY plus NON-CURRENT LIABILITIES, equivalently total assets less current liabilities. It measures the LONG-TERM funding on which the return is being earned, which is why short-term liabilities are excluded."),

  q("FAK-30-08", "FA-30", "I", "hard",
    "ROCE has fallen while revenue grew. Which decomposition explains it?",
    [
      "Gross margin × current ratio",
      "Operating margin × asset turnover",
      "Receivables days × payables days",
      "Gearing × interest cover",
    ],
    1,
    "ROCE = OPERATING MARGIN × ASSET TURNOVER. Either the business earned less on each sale, or it generated less revenue per dollar of capital — often because capital was invested ahead of the revenue to fill it. Using the same definition of capital employed in both ratios is what makes the decomposition reconcile."),

  num("FAK-30-09", "FA-30", "I", "hard",
    "Equity is $840,000, loan notes are $360,000 and redeemable preference shares are $140,000. What is gearing on a debt-to-equity basis, as a percentage?",
    59.5, "%", 0.1,
    "Debt = loan notes $360,000 + redeemable preference shares $140,000 = $500,000, because redeemable shares must be repaid and are debt in substance. Gearing = $500,000 ÷ $840,000 = 59.5%. On a debt ÷ (debt + equity) basis it would be 37.3% — always state the basis."),

  q("FAK-30-10", "FA-30", "I", "medium",
    "A company's current ratio is 3.8:1. What can be concluded?",
    [
      "Liquidity is excellent",
      "Nothing on its own — it may reflect slow-moving inventory and uncollected receivables",
      "The company holds too little inventory",
      "The company is highly geared",
    ],
    1,
    "NOTHING ON ITS OWN. A high current ratio may mean strong liquidity or it may mean obsolete inventory, old receivables and idle cash. It has to be read alongside the EFFICIENCY ratios that reveal what the current assets actually consist of."),
]

/* ── Chapter 31 · Analysis and conclusions ── */

const CH31: AccaQuestion[] = [
  q("FAK-31-01", "FA-31", "I", "medium",
    "Revenue rose 30%, gross margin fell from 41% to 33% and receivables days rose from 42 to 78. What is the most likely explanation?",
    [
      "Overheads have been better controlled",
      "Growth was bought by cutting prices and extending credit",
      "The inventory valuation method has changed",
      "Non-current assets have been revalued",
    ],
    1,
    "Three movements point the same way: more revenue, thinner margins and much slower collection — the signature of buying volume with PRICE and with CREDIT. A valuation change would not move receivables days, and a revaluation moves neither."),

  q("FAK-31-02", "FA-31", "I", "hard",
    "Payables days have risen from 39 to 71. What should an answer say?",
    [
      "The business has negotiated better terms, which is a strength",
      "The business cannot pay, which is a weakness",
      "It could be either, and cash movements and the overdraft would distinguish them",
      "It has no significance",
    ],
    2,
    "It could be EITHER — negotiated terms or an inability to pay — and naming the ambiguity plus the evidence that would settle it earns more than asserting one reading. Rising cash suggests negotiation; a growing overdraft suggests necessity."),

  q("FAK-31-03", "FA-31", "I", "medium",
    "Which is a limitation of ratio analysis?",
    [
      "Ratios cannot be calculated for a company with debt",
      "Accounting policy differences alone can make two identical businesses report very different ratios",
      "Ratios are only valid for listed companies",
      "Ratios are unaffected by one-off items",
    ],
    1,
    "POLICY DIFFERENCES can double or halve a ratio between two otherwise identical businesses, which is why policies are read before entities are compared. One-off items distort ratios badly, and ratios apply to any entity."),

  q("FAK-31-04", "FA-31", "I", "hard",
    "Gross margin has held steady while operating margin has fallen sharply. What does this indicate?",
    [
      "Selling prices have been cut",
      "Overheads have grown faster than the revenue supporting them",
      "Inventory has been written down",
      "Cost of sales has risen",
    ],
    1,
    "If GROSS margin is unchanged, trading itself is unaffected — so the fall must have happened BELOW gross profit: OVERHEADS have grown. New premises, more staff, higher marketing or a large irrecoverable debt would all do it. Price cuts and inventory write-downs would have moved gross margin."),

  q("FAK-31-05", "FA-31", "I", "medium",
    "What makes a conclusion drawn from ratios useful to a user?",
    [
      "Quoting the ratio to two decimal places",
      "Relating it to the decision that particular user faces",
      "Listing every ratio that can be calculated",
      "Comparing it to a universal target such as 2:1",
    ],
    1,
    "Relating it to the USER'S DECISION. A lender wants to know whether cash will service the loan; a supplier whether the invoice will be paid. Precision, exhaustiveness and universal targets earn nothing on their own."),

  q("FAK-31-06", "FA-31", "I", "hard",
    "A company delays paying suppliers for two weeks before its year end and presses customers to settle early. What is this called and what is its effect?",
    [
      "Prudence — the ratios become more conservative",
      "Window dressing — the year-end ratios improve without any change in the business",
      "Consistency — the ratios become comparable",
      "An adjusting event — the ratios must be restated",
    ],
    1,
    "WINDOW DRESSING. Managing transactions near the reporting date improves the year-end ratios while the underlying business is unchanged — which is exactly why year-end figures may be unrepresentative, and why trends over several years are more informative than one date."),

  multi("FAK-31-07", "FA-31", "I", "medium",
    "Which TWO would help make a comparison between two companies meaningful?",
    [
      "Reading both companies' accounting policies",
      "Comparing only the most recent year",
      "Identifying one-off items in each",
      "Assuming the larger company is better managed",
    ],
    [0, 2],
    "Reading the POLICIES and identifying ONE-OFF ITEMS both make a comparison like-for-like. A single year hides the trend, and size tells you nothing about management quality."),

  q("FAK-31-08", "FA-31", "I", "medium",
    "How should a limitation of ratio analysis be used in an answer?",
    [
      "As a closing paragraph listing all the standard limitations",
      "Attached to the specific conclusion it qualifies",
      "Only if the examiner asks for limitations",
      "In place of a conclusion, since ratios cannot be relied on",
    ],
    1,
    "ATTACHED TO THE SPECIFIC CONCLUSION it qualifies — \"receivables days rose, but the comparison is affected by the September acquisition\" earns a mark, while a generic paragraph does not. And a limitation qualifies a conclusion; it never replaces one."),

  q("FAK-31-09", "FA-31", "I", "hard",
    "A company's current ratio improved from 1.6:1 to 2.2:1 while its overdraft rose from $20,000 to $190,000. What does this most likely indicate?",
    [
      "Liquidity has genuinely strengthened",
      "The current assets have grown through unsold inventory and uncollected receivables, funded by borrowing",
      "The company has repaid its long-term debt",
      "Profitability has improved",
    ],
    1,
    "A current ratio improving while the OVERDRAFT quintuples is the classic signal that current ASSETS have grown — inventory and receivables — and that the growth is being funded by short-term borrowing. Reading the two together is what exposes it."),

  q("FAK-31-10", "FA-31", "I", "medium",
    "Which non-financial factor is absent from ratio analysis but relevant to a user's decision?",
    [
      "The operating margin",
      "The quality of management and the strength of the order book",
      "The gearing ratio",
      "The working capital cycle",
    ],
    1,
    "MANAGEMENT QUALITY and the ORDER BOOK appear nowhere in the statements, along with staff skills, brand strength, regulatory change and market conditions. The other three are all calculated from the statements themselves."),
]

/** FA's authored question kit for Areas H and I — chapters 28 to 31. */
export const FA_KIT_HI: AccaQuestion[] = [...CH28, ...CH29, ...CH30, ...CH31]
