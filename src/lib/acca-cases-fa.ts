import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * FA · Section B multi-task questions (MTQs) — the real exam format.
 *
 * FA's Section B is TWO multi-task questions worth FIFTEEN marks each, and the
 * published blueprint names the two areas they cover: CONSOLIDATIONS and ACCOUNTS
 * PREPARATION, the latter including a statement of cash flows. Interpretation is
 * examined in Section A, not here — which is what the previous set of cases assumed,
 * and why it has been replaced.
 *
 * There are 6 units below — three accounts-preparation (Area G) and three
 * consolidation (Area H) — and they are ordered ALTERNATELY. The mock composer
 * rotates the case list by (form − 1) and takes cases until the section's 30 marks
 * are filled, so an alternating order guarantees that every one of the three mock
 * forms draws one accounts-preparation MTQ and one consolidation MTQ, which is the
 * shape of the real sitting. Grouping the three of each type together would give
 * form 1 two accounts-preparation questions and no consolidation.
 *
 * These replace 350 generated 1-mark linked questions whose stems read "In analysis
 * 7, what is Grove Co's gross profit margin?" — a large bank of the wrong shape.
 * Every scenario and task below is authored, and most tasks are numeric entry,
 * because FA's Section B is predominantly computational.
 *
 * Original Scholify content. No ACCA, Kaplan or BPP question is reproduced.
 */

/** A numeric-entry task within an MTQ. */
function calc(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "FA",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks: 3,
    difficulty,
  }
}

/** A multiple-choice task within an MTQ. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "FA",
    area,
    chapter,
    type: "mcq",
    stem,
    options,
    correct,
    explanation,
    marks: 3,
    difficulty,
  }
}

/* ── Accounts preparation MTQs (Area G) ─────────────────────────── */

const MTQ_G1: OtCase = {
  id: "fa-mtq-g1",
  paper: "FA",
  area: "G",
  title: "Marbury Co — preparing the financial statements",
  scenario:
    "Marbury Co's trial balance at 31 December 20X7 includes: revenue $1,240,000; purchases $742,000; inventory at 1 January 20X7 $96,000; distribution costs $128,000; administrative expenses $174,000; plant and equipment at cost $480,000; accumulated depreciation on plant $192,000; trade receivables $186,000; allowance for receivables $5,400; bank $42,000; trade payables $118,000; 6% loan notes $300,000, repayable in 20Y3; share capital $200,000. The following adjustments are required. (1) Inventory at 31 December 20X7 is $103,000. (2) Plant is depreciated at 20% on the reducing-balance basis, charged to administrative expenses. (3) The loan note interest for the year has not been paid or recorded. (4) A trade receivable of $6,000 is to be written off, and the allowance for receivables adjusted to 4% of the remaining balance. (5) The income tax charge for the year is estimated at $38,000.",
  questions: [
    calc("fa-mtq-g1", 1, "G", "FA-24", "easy",
      "What is gross profit for the year, in $?",
      505000, "$", 1,
      "Cost of sales = opening inventory $96,000 + purchases $742,000 − closing inventory $103,000 = $735,000. Gross profit = $1,240,000 − $735,000 = $505,000. The inventory movement of $7,000 is what separates purchases from cost of sales."),
    calc("fa-mtq-g1", 2, "G", "FA-13", "medium",
      "What is the depreciation charge on plant for the year, in $?",
      57600, "$", 1,
      "Reducing balance applies the rate to the CARRYING AMOUNT: ($480,000 − $192,000) × 20% = $288,000 × 20% = $57,600. Applying 20% to cost would give $96,000, and residual value is never deducted first under this method."),
    calc("fa-mtq-g1", 3, "G", "FA-17", "hard",
      "What is the total charge to administrative expenses for the irrecoverable debt and the movement in the allowance, in $?",
      7800, "$", 1,
      "Write off $6,000, leaving receivables of $180,000. Required allowance = $180,000 × 4% = $7,200 against an existing $5,400, so the MOVEMENT is an increase of $1,800. Total charge = $6,000 + $1,800 = $7,800. Charging the whole $7,200 allowance would double-count the opening balance."),
    calc("fa-mtq-g1", 4, "G", "FA-24", "medium",
      "What figure for trade receivables appears in current assets, in $?",
      172800, "$", 1,
      "$186,000 − the $6,000 written off = $180,000, less the closing allowance of $7,200 = $172,800. The receivable stays on the books at its full amount and the allowance is deducted on presentation."),
    calc("fa-mtq-g1", 5, "G", "FA-24", "hard",
      "What is profit for the year, in $?",
      81600, "$", 1,
      "Administrative expenses = $174,000 + $57,600 depreciation + $7,800 = $239,400. Operating profit = $505,000 − $128,000 − $239,400 = $137,600. Finance cost = $300,000 × 6% = $18,000, accrued because unpaid. Profit before tax $119,600, less tax $38,000 = $81,600."),
  ],
}

const MTQ_G2: OtCase = {
  id: "fa-mtq-g2",
  paper: "FA",
  area: "G",
  title: "Thornaby Co — statement of cash flows",
  scenario:
    "Thornaby Co reports profit before tax of $246,000 for the year ended 31 December. Depreciation for the year was $82,000. Plant with a carrying amount of $34,000 was sold for $25,000. Finance costs charged were $27,000, of which $5,000 was unpaid at the year end; nothing was owing at the start of the year. Inventory rose from $84,000 to $99,000, trade receivables fell from $141,000 to $126,000 and trade payables rose from $88,000 to $101,000. Income tax paid during the year was $54,000. The company purchased property, plant and equipment for $310,000, issued shares for $180,000 in cash, repaid $60,000 of loan notes and paid dividends of $45,000. Cash and cash equivalents at the start of the year were $31,000.",
  questions: [
    calc("fa-mtq-g2", 1, "G", "FA-26", "hard",
      "What is cash generated from operations, in $?",
      377000, "$", 1,
      "$246,000 + depreciation $82,000 + loss on disposal $9,000 ($34,000 − $25,000) + finance costs $27,000 = $364,000. Working capital: inventory up $15,000 (outflow), receivables down $15,000 (inflow), payables up $13,000 (inflow) = +$13,000. Total $377,000."),
    calc("fa-mtq-g2", 2, "G", "FA-26", "medium",
      "What was interest paid during the year, in $?",
      22000, "$", 1,
      "Charge $27,000 + opening accrual nil − closing accrual $5,000 = $22,000. The cash flow statement reports what was PAID, not what was charged — using the $27,000 would overstate the outflow by the growth in the accrual."),
    calc("fa-mtq-g2", 3, "G", "FA-26", "medium",
      "What is net cash from operating activities, in $?",
      301000, "$", 1,
      "Cash generated from operations $377,000 − interest paid $22,000 − income tax paid $54,000 = $301,000. Interest and tax paid are both presented within OPERATING activities, after the cash-generated-from-operations subtotal."),
    calc("fa-mtq-g2", 4, "G", "FA-26", "medium",
      "What is the net cash OUTFLOW from investing activities, in $?",
      285000, "$", 1,
      "Purchase of property, plant and equipment $310,000 less disposal proceeds $25,000 = a net outflow of $285,000. The FULL proceeds appear here, which is exactly why the $9,000 loss was added back in the operating reconciliation."),
    calc("fa-mtq-g2", 5, "G", "FA-26", "hard",
      "What are cash and cash equivalents at the end of the year, in $?",
      122000, "$", 1,
      "Financing = $180,000 shares − $60,000 loan notes − $45,000 dividends = $75,000. Movement = $301,000 − $285,000 + $75,000 = $91,000. Closing cash = $31,000 + $91,000 = $122,000 — and that agreement with the actual movement in cash is the statement's own proof."),
  ],
}

const MTQ_G3: OtCase = {
  id: "fa-mtq-g3",
  paper: "FA",
  area: "G",
  title: "Whitmoor Trading — reconstructing the accounts",
  scenario:
    "A flood destroyed part of Whitmoor Trading's records. The following is known for the year. Trade receivables were $68,000 at the start and $79,000 at the end; trade payables were $52,000 at the start and $61,000 at the end. Amounts banked from customers were $604,000, and the proprietor took $2,200 a month out of customer receipts before banking them. Discounts allowed were $8,400 and irrecoverable debts written off were $3,600. Payments to suppliers were $412,000, discounts received $5,100 and purchase returns $6,800. All sales and purchases are on credit. The business has consistently achieved a gross margin of 35%. Inventory was $74,000 at the start of the year, and the physical count at the year end gave $81,000.",
  questions: [
    calc("fa-mtq-g3", 1, "G", "FA-27", "medium",
      "What were total receipts from customers during the year, in $?",
      630400, "$", 1,
      "Banked $604,000 + drawings taken before banking ($2,200 × 12 = $26,400) = $630,400. Money taken from receipts before banking is still money RECEIVED, and omitting it understates every figure derived from the control account."),
    calc("fa-mtq-g3", 2, "G", "FA-27", "hard",
      "What were credit sales for the year, in $?",
      653400, "$", 1,
      "Closing receivables $79,000 + receipts $630,400 + discounts allowed $8,400 + write-offs $3,600 − opening receivables $68,000 = $653,400. Prove it: $68,000 + $653,400 − $630,400 − $8,400 − $3,600 = $79,000."),
    calc("fa-mtq-g3", 3, "G", "FA-27", "hard",
      "What were credit purchases for the year, in $?",
      432900, "$", 1,
      "Closing payables $61,000 + payments $412,000 + discounts received $5,100 + purchase returns $6,800 − opening payables $52,000 = $432,900. Every item that REDUCED the payable is added back when solving for purchases."),
    calc("fa-mtq-g3", 4, "G", "FA-27", "medium",
      "What was cost of sales for the year, in $?",
      424710, "$", 1,
      "A MARGIN of 35% puts revenue at 100 and cost of sales at 65, so cost of sales = $653,400 × 65% = $424,710. Had the 35% been a MARK-UP, cost of sales would be $653,400 × 100/135 = $484,000 — a materially different answer from one misread word."),
    calc("fa-mtq-g3", 5, "G", "FA-27", "hard",
      "What value of inventory, at cost, is unaccounted for at the year end, in $?",
      1190, "$", 1,
      "Expected closing inventory = opening $74,000 + purchases $432,900 − cost of sales $424,710 = $82,190. The count gave $81,000, so $1,190 is unaccounted for — goods taken by the proprietor, lost or stolen. Deriving the expected figure and comparing it with the count is the standard technique."),
  ],
}

/* ── Consolidation MTQs (Area H) ────────────────────────────────── */

const MTQ_H1: OtCase = {
  id: "fa-mtq-h1",
  paper: "FA",
  area: "H",
  title: "Kelmore Co & Ashdon Co — the consolidated statement of financial position",
  scenario:
    "Kelmore Co acquired 80% of the equity shares of Ashdon Co on 1 January 20X5 for $760,000 in cash. At that date Ashdon Co's share capital was $250,000 and its retained earnings were $390,000. Non-controlling interest is measured at its proportionate share of net assets. At 31 December 20X7 Ashdon Co's retained earnings were $520,000 and Kelmore Co's were $1,150,000. During 20X7 Ashdon Co sold goods to Kelmore Co for $80,000 at a mark-up of 25% on cost, and one quarter of those goods remained in Kelmore Co's inventory at the year end. At 31 December 20X7 Ashdon Co owed Kelmore Co $34,000 on their intra-group current account.",
  questions: [
    calc("fa-mtq-h1", 1, "H", "FA-28", "medium",
      "What goodwill arose on the acquisition of Ashdon Co, in $?",
      248000, "$", 1,
      "Net assets at acquisition = $250,000 + $390,000 = $640,000. Because NCI is at its proportionate share, goodwill = consideration $760,000 − 80% × $640,000 = $760,000 − $512,000 = $248,000."),
    calc("fa-mtq-h1", 2, "H", "FA-28", "hard",
      "What unrealised profit must be eliminated from group inventory, in $?",
      4000, "$", 1,
      "A mark-up of 25% on cost puts cost at 100 and sales at 125, so the profit on $80,000 of sales is $80,000 × 25/125 = $16,000. One quarter remains inside the group, so unrealised profit is $4,000. Treating 25% as a margin would give $20,000 and a different answer."),
    calc("fa-mtq-h1", 3, "H", "FA-28", "hard",
      "What is the non-controlling interest in Ashdon Co at 31 December 20X7, in $?",
      153200, "$", 1,
      "Ashdon's net assets at the reporting date = $250,000 + $520,000 = $770,000, less the $4,000 unrealised profit (ASHDON was the seller, so it is deducted in the net assets column) = $766,000. NCI = 20% × $766,000 = $153,200."),
    calc("fa-mtq-h1", 4, "H", "FA-28", "hard",
      "What are the Kelmore group's consolidated retained earnings at 31 December 20X7, in $?",
      1250800, "$", 1,
      "Ashdon's post-acquisition increase in net assets = $766,000 − $640,000 = $126,000. Consolidated retained earnings = Kelmore $1,150,000 + 80% × $126,000 = $1,150,000 + $100,800 = $1,250,800. No further deduction for unrealised profit is made, because it is already inside the net assets figure."),
    task("fa-mtq-h1", 5, "H", "FA-28", "medium",
      "How is the $34,000 owed by Ashdon Co to Kelmore Co treated on consolidation?",
      [
        "Eliminated in full from both group receivables and group payables",
        "Eliminated only to the extent of Kelmore's 80% holding",
        "Retained in both, since both companies are separate legal entities",
        "Removed from group receivables only",
      ],
      0,
      "Eliminated IN FULL from BOTH sides — it is the same internal balance seen twice, and the group cannot owe itself money. Total assets and total liabilities each fall by $34,000, so the statement still balances. Eliminating only 80% would leave part of an internal balance in place."),
  ],
}

const MTQ_H2: OtCase = {
  id: "fa-mtq-h2",
  paper: "FA",
  area: "H",
  title: "Ryehill Co & Coleford Co — a mid-year acquisition with a fair value adjustment",
  scenario:
    "Ryehill Co acquired 75% of the equity shares of Coleford Co on 1 July 20X6 for $940,000 in cash. Coleford Co's share capital is $300,000. Its retained earnings were $420,000 at 1 January 20X6 and $480,000 at 31 December 20X6, and profits accrued evenly through that year. At the acquisition date Coleford Co's land had a fair value $70,000 above its carrying amount, and no adjustment has been made in Coleford Co's own records. Non-controlling interest is measured at its proportionate share of net assets. At 31 December 20X7 Coleford Co's retained earnings were $610,000 and Ryehill Co's were $1,480,000. There has been no trading between the two companies.",
  questions: [
    calc("fa-mtq-h2", 1, "H", "FA-28", "medium",
      "What were Coleford Co's retained earnings at the acquisition date, in $?",
      450000, "$", 1,
      "Retained earnings grew from $420,000 to $480,000 during 20X6 — $60,000 accruing evenly. Six months to 1 July gives $30,000, so retained earnings at acquisition were $450,000. A mid-year acquisition always requires this time apportionment."),
    calc("fa-mtq-h2", 2, "H", "FA-28", "hard",
      "What were Coleford Co's net assets at the acquisition date, in $?",
      820000, "$", 1,
      "Share capital $300,000 + retained earnings at acquisition $450,000 + fair value adjustment on land $70,000 = $820,000. The fair value adjustment is included even though Coleford has not recorded it, because consolidation uses the fair value of the net assets ACQUIRED."),
    calc("fa-mtq-h2", 3, "H", "FA-28", "hard",
      "What goodwill arose on the acquisition, in $?",
      325000, "$", 1,
      "Consideration $940,000 − 75% × net assets at acquisition $820,000 ($615,000) = $325,000. Omitting the fair value adjustment would give net assets of $750,000 and goodwill of $377,500 — overstated by 75% of the $70,000 uplift."),
    calc("fa-mtq-h2", 4, "H", "FA-28", "medium",
      "What is the non-controlling interest in Coleford Co at 31 December 20X7, in $?",
      245000, "$", 1,
      "Coleford's net assets at the reporting date = $300,000 + $610,000 + fair value adjustment $70,000 = $980,000. NCI = 25% × $980,000 = $245,000. The fair value adjustment appears in BOTH columns of the net assets table."),
    calc("fa-mtq-h2", 5, "H", "FA-28", "hard",
      "What are the Ryehill group's consolidated retained earnings at 31 December 20X7, in $?",
      1600000, "$", 1,
      "Post-acquisition increase in Coleford's net assets = $980,000 − $820,000 = $160,000. Consolidated retained earnings = Ryehill $1,480,000 + 75% × $160,000 = $1,600,000. Only POST-acquisition movements reach group reserves — the pre-acquisition earnings were paid for and sit inside goodwill."),
  ],
}

const MTQ_H3: OtCase = {
  id: "fa-mtq-h3",
  paper: "FA",
  area: "H",
  title: "Fallowfield Co — consolidated profit or loss with an associate",
  scenario:
    "Fallowfield Co owns 70% of the equity shares of Bexley Co, acquired several years ago, and 30% of Camden Co, over which it exercises significant influence through two board seats. For the year ended 31 December, Fallowfield Co reported revenue of $2,400,000, cost of sales of $1,510,000 and other expenses of $480,000. Bexley Co reported revenue of $860,000, cost of sales of $552,000 and other expenses of $188,000. Camden Co reported revenue of $700,000 and profit for the year of $140,000. During the year Fallowfield Co sold goods to Bexley Co for $120,000, on which it made a profit of $30,000; one third of those goods remained in Bexley Co's inventory at the year end. Ignore taxation.",
  questions: [
    calc("fa-mtq-h3", 1, "H", "FA-29", "medium",
      "What is consolidated revenue for the year, in $?",
      3140000, "$", 1,
      "Fallowfield $2,400,000 + Bexley $860,000 − the $120,000 intra-group sale = $3,140,000. The WHOLE of Bexley's revenue is added, not 70% of it, because Fallowfield controls Bexley. Camden's $700,000 never enters group revenue — an associate is not consolidated."),
    calc("fa-mtq-h3", 2, "H", "FA-29", "hard",
      "What is consolidated cost of sales for the year, in $?",
      1952000, "$", 1,
      "$1,510,000 + $552,000 = $2,062,000, less the $120,000 intra-group purchase, plus the unrealised profit still in inventory ($30,000 × 1/3 = $10,000) = $1,952,000. Removing the sale from both revenue and cost of sales leaves profit unchanged; only the $10,000 reduces group profit."),
    calc("fa-mtq-h3", 3, "H", "FA-29", "easy",
      "What is the share of profit of the associate, in $?",
      42000, "$", 1,
      "30% × Camden's profit of $140,000 = $42,000, presented as a SINGLE LINE. None of Camden's revenue or costs is consolidated, and there is no non-controlling interest in an associate."),
    calc("fa-mtq-h3", 4, "H", "FA-29", "hard",
      "What is group profit for the year, in $?",
      562000, "$", 1,
      "Revenue $3,140,000 − cost of sales $1,952,000 − other expenses ($480,000 + $188,000 = $668,000) + share of associate's profit $42,000 = $562,000."),
    calc("fa-mtq-h3", 5, "H", "FA-29", "hard",
      "What amount of profit is attributable to the non-controlling interest, in $?",
      36000, "$", 1,
      "Bexley's own profit = $860,000 − $552,000 − $188,000 = $120,000. FALLOWFIELD was the seller of the intra-group goods, so no unrealised profit is deducted before the split. NCI = 30% × $120,000 = $36,000, leaving $526,000 attributable to the owners of the parent."),
  ],
}

/*
 * Ordered ALTERNATELY — accounts preparation, consolidation, accounts preparation,
 * … — so that the mock composer's rotate-by-(form − 1) always yields one of each
 * type per 30-mark Section B. See the header note.
 */
export const CASES_FA: OtCase[] = [MTQ_G1, MTQ_H1, MTQ_G2, MTQ_H2, MTQ_G3, MTQ_H3]
