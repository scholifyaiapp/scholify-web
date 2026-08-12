/*
 * FA Area G — preparing basic financial statements, disclosure notes, statements
 * of cash flows and incomplete records.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * FA's Section B is two 15-mark multi-task questions, and the blueprint names
 * ACCOUNTS PREPARATION as one of them — so this is one of only two areas where the
 * 15-mark format legitimately appears. Those plans teach what the OTs cannot: the
 * order to work adjustments in, and the fact that each task is marked
 * independently, so a wrong figure early must be carried forward rather than
 * stopping the candidate dead.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FA_PLANS_G: ExamPlanMap = {
  /* ── FA-24 · Preparing the two principal statements ──────────── */

  "FA-24::the-sopl": {
    title: "Preparing a statement of profit or loss from a trial balance with adjustments",
    format: "mtq",
    marks: 15,
    requirement:
      "The following balances are extracted from a company's trial balance at 31 December 20X5: revenue $840,000; purchases $520,000; opening inventory $61,000; distribution costs $84,000; administrative expenses $97,000; loan interest paid $6,000.\n\nThe following adjustments are required:\n(1) Closing inventory is $73,000.\n(2) Administrative expenses include $9,000 of insurance prepaid to 30 June 20X6.\n(3) An accrual of $4,000 is needed for distribution costs.\n(4) Depreciation of $22,000 is to be charged, split 60% distribution and 40% administrative.\n(5) The loan carries interest of $12,000 per year; only two quarters have been paid.\n(6) The income tax charge for the year is estimated at $23,000.\n\nPrepare the statement of profit or loss for the year ended 31 December 20X5.",
    plan: [
      {
        step: "Draw the pro forma first, before touching any adjustment",
        detail:
          "Revenue, cost of sales, gross profit, distribution costs, administrative expenses, operating profit, finance costs, profit before tax, income tax, profit for the year. The layout carries marks on its own, and a blank pro forma means no line can be forgotten.",
      },
      {
        step: "Work each adjustment onto a specific line, in the order given",
        detail:
          "Take the adjustments in the order the question lists them and write each effect against a line of the pro forma. Working them in your own order is how one gets missed, and the examiner numbers them for exactly that reason.",
      },
      {
        step: "Build cost of sales as its own working",
        detail:
          "Opening inventory + purchases − closing inventory. Closing inventory REDUCES cost of sales; getting that sign wrong moves gross profit by twice the inventory figure and every line below it.",
      },
      {
        step: "Split the expense adjustments to the right expense heading",
        detail:
          "The prepayment reduces administrative expenses. The accrual increases distribution costs. Depreciation splits 60/40 between them. Marks are allocated per line, so putting the right total against the wrong heading loses them.",
      },
      {
        step: "Treat interest and tax as below-the-line items",
        detail:
          "Finance cost is the full $12,000 incurred, not the $6,000 paid — the unpaid half is an accrual. Tax appears as the last line before profit for the year, and is never an operating expense.",
      },
      {
        step: "Check gross margin for plausibility before moving on",
        detail:
          "Gross profit ÷ revenue should look like a real business. A margin of 90% or 3% usually means cost of sales has been built wrongly, and that check costs five seconds.",
      },
    ],
    answer:
      "**Statement of profit or loss for the year ended 31 December 20X5**\n\nRevenue **840,000**\nCost of sales (508,000) — working below\n**Gross profit 332,000**\nDistribution costs (101,200) — working below\nAdministrative expenses (96,800) — working below\n**Operating profit 134,000**\nFinance costs (12,000) — full year's interest incurred\n**Profit before tax 122,000**\nIncome tax (23,000)\n**Profit for the year 99,000**\n\n**Cost of sales:** opening inventory 61,000 + purchases 520,000 − closing inventory 73,000 = **508,000**\n\n**Distribution costs:** 84,000 + accrual 4,000 + depreciation (60% × 22,000 = 13,200) = **101,200**\n\n**Administrative expenses:** 97,000 − prepayment 9,000 + depreciation (40% × 22,000 = 8,800) = **96,800**\n\n**Finance costs:** $12,000 incurred for the year. Only $6,000 was paid, so $6,000 is accrued as a current liability — the charge follows the expense incurred, not the cash paid.\n\nGross margin = 332,000 ÷ 840,000 = 39.5%, which is plausible.",
    earns: [
      "Drawing the pro forma before working any adjustment, so no line is omitted",
      "Deducting closing inventory in cost of sales and adding opening inventory",
      "Charging the full interest incurred rather than the amount paid",
      "Directing each adjustment to the correct expense heading, since marks are per line",
    ],
    loses: [
      "Charging only the interest paid, which understates finance costs and omits the accrual",
      "Adding closing inventory to cost of sales, which moves every line below gross profit",
      "Putting the tax charge among operating expenses",
      "Abandoning later lines after an error in cost of sales, when each line is separately marked",
    ],
  },

  "FA-24::the-sofp": {
    title: "Classifying a balance as current or non-current",
    format: "ot",
    marks: 2,
    requirement:
      "A company has a $500,000 bank loan repayable in five equal annual instalments, the first falling due nine months after the reporting date. In the statement of financial position this is presented as:\n\nA  A non-current liability of $500,000\nB  A current liability of $500,000\nC  A current liability of $100,000 and a non-current liability of $400,000\nD  A non-current liability of $400,000 only",
    plan: [
      {
        step: "State the classification test",
        detail:
          "A liability is CURRENT if it is due for settlement within twelve months of the reporting date. Anything beyond that is non-current. The test is applied to each instalment, not to the loan as a whole.",
      },
      {
        step: "Split the loan by when each instalment falls due",
        detail:
          "One instalment of $100,000 falls due within twelve months — at nine months. The remaining four instalments, $400,000, fall due later.",
      },
      {
        step: "Present both parts",
        detail:
          "$100,000 current and $400,000 non-current. The loan is one agreement but appears in two places, which is the whole point of the question.",
      },
      {
        step: "Reject the option that drops part of the liability",
        detail:
          "Option D shows only the non-current portion, omitting $100,000 of liability entirely. An option that loses part of a balance can be struck on sight.",
      },
    ],
    answer:
      "**C — a current liability of $100,000 and a non-current liability of $400,000.**\n\nA liability is **current** if due for settlement within twelve months of the reporting date, and the test applies to each instalment rather than to the loan as a whole. One $100,000 instalment falls due at nine months; the remaining $400,000 falls due later.\n\nSo one loan agreement appears in two places, which is exactly what the question tests.\n\nOption D drops $100,000 of liability altogether and can be struck on sight.\n\nThe presentation matters commercially: the current portion enters current liabilities and so affects the **current ratio** and working capital, which is what a lender or analyst reads first. Classifying the whole loan as non-current would flatter liquidity.",
    earns: [
      "Applying the twelve-month test to each instalment rather than to the loan",
      "Naming the effect on the current ratio, which is why the split matters",
    ],
    loses: ["Classifying the whole loan as non-current, which overstates liquidity"],
  },

  "FA-24::interrelationship": {
    title: "How the two statements lock together",
    format: "ot",
    marks: 2,
    requirement:
      "A company's draft statements show profit for the year of $60,000 and net assets of $340,000. A closing inventory adjustment of $8,000 has been omitted. The corrected figures are:\n\nA  Profit $52,000, net assets $332,000\nB  Profit $68,000, net assets $348,000\nC  Profit $68,000, net assets $340,000\nD  Profit $60,000, net assets $348,000",
    plan: [
      {
        step: "Establish what closing inventory does on each statement",
        detail:
          "It REDUCES cost of sales, so it increases profit. And it is a current ASSET, so it increases net assets. Both effects are increases of the same amount.",
      },
      {
        step: "Apply the adjustment to both figures",
        detail:
          "Profit $60,000 + $8,000 = **$68,000**. Net assets $340,000 + $8,000 = **$348,000**.",
      },
      {
        step: "Use the structural check on the option list",
        detail:
          "Profit flows into retained earnings and equity equals net assets, so both must move by the SAME amount in the SAME direction. Options C and D move only one, and A moves both the wrong way.",
      },
      {
        step: "Know why this check is worth marks",
        detail:
          "Every adjustment in an accounts preparation question has a dual effect, and the two statements must agree. If they do not, an adjustment has been posted once instead of twice.",
      },
    ],
    answer:
      "**B — profit $68,000, net assets $348,000.**\n\nClosing inventory **reduces cost of sales**, so profit rises by $8,000. It is also a **current asset**, so net assets rise by $8,000. Both move up by the same amount.\n\nThe structural check disposes of three options at once: profit flows into retained earnings and equity equals net assets, so the two must move by the **same amount** in the **same direction**. Option C moves profit only, D moves net assets only, and A moves both downward.\n\nThis is the single most useful check in an accounts preparation question. Every adjustment has a dual effect, and if the statement of financial position does not balance, an adjustment has been posted once rather than twice — which is faster to find by asking which adjustment lacks its second half than by re-adding the columns.",
    earns: [
      "Requiring both statements to move by the same amount in the same direction",
      "Using a failure to balance as a pointer to a half-posted adjustment",
    ],
    loses: ["Applying the adjustment to one statement only"],
  },

  /* ── FA-25 · Disclosure notes and events after the period ────── */

  "FA-25::notes": {
    title: "Why the notes exist and what they must contain",
    format: "ot",
    marks: 2,
    requirement:
      "The primary purpose of the notes to the financial statements is to:\n\nA  Replace information that would otherwise be in the primary statements\nB  Provide the detail and explanation needed to understand the primary statements\nC  Present the directors' opinion on the company's prospects\nD  Satisfy the external auditor",
    plan: [
      {
        step: "Establish the notes' relationship to the primary statements",
        detail:
          "They supplement rather than replace. A primary statement gives a total; the note disaggregates it and explains the policy under which it was measured.",
      },
      {
        step: "Name what a note typically supplies",
        detail:
          "The accounting policy applied, a breakdown of the total, movements during the year, and information the primary statement cannot carry without becoming unreadable.",
      },
      {
        step: "Reject the option that inverts the relationship",
        detail:
          "A says the notes replace primary statement information. They do the opposite — a total must appear in the statement, with the note explaining it.",
      },
      {
        step: "Reject the two that misidentify the audience",
        detail:
          "The notes are for users, not for the auditor. And forward-looking directors' commentary belongs in the narrative reporting outside the financial statements.",
      },
    ],
    answer:
      "**B — provide the detail and explanation needed to understand the primary statements.**\n\nThe notes **supplement** rather than replace. A primary statement carries a total; the note disaggregates it, states the accounting policy under which it was measured, and shows the movements in the year.\n\nThe four the syllabus names are the **non-current asset note** (cost, additions, disposals, depreciation and carrying amount by class), **inventory**, **provisions**, and **events after the reporting period**.\n\nOption A inverts the relationship. Options C and D misidentify the audience: the notes serve **users**, not the auditor, and forward-looking directors' commentary belongs in narrative reporting outside the financial statements.\n\nThe notes are an integral part of the financial statements, so the audit opinion covers them and they carry the same status as the primary statements.",
    earns: ["Describing the notes as supplementing rather than substituting for the statements"],
    loses: ["Treating the notes as an audit requirement rather than as information for users"],
  },

  "FA-25::events": {
    title: "Deciding whether an event after the reporting period adjusts",
    format: "ot",
    marks: 2,
    requirement:
      "A company's year end is 31 December. In February, before the financial statements are authorised, a customer owing $40,000 at 31 December goes into liquidation. This is:\n\nA  An adjusting event — the receivable is written down\nB  A non-adjusting event — disclosed only\nC  Neither adjusting nor disclosable\nD  An adjusting event, but only if the amount is material",
    plan: [
      {
        step: "State the distinguishing test",
        detail:
          "An ADJUSTING event provides evidence of conditions that existed AT the reporting date. A NON-ADJUSTING event concerns conditions arising AFTER it. The question is always about when the condition existed, not when the news arrived.",
      },
      {
        step: "Ask what the liquidation reveals",
        detail:
          "A customer does not become uncollectable overnight. The liquidation in February is evidence that the debt was already doubtful at 31 December, so it concerns a condition existing then.",
      },
      {
        step: "Apply the adjustment",
        detail:
          "The receivable is written down at the reporting date. The financial statements are adjusted because they would otherwise report an asset that evidence shows was not recoverable.",
      },
      {
        step: "Contrast with the standard non-adjusting example",
        detail:
          "A fire destroying a warehouse in February is non-adjusting — the asset genuinely existed at 31 December and the loss arose afterwards. It is disclosed if material, not adjusted.",
      },
    ],
    answer:
      "**A — an adjusting event: the receivable is written down.**\n\nThe test is whether the event provides evidence of conditions that existed **at** the reporting date. A customer does not become uncollectable overnight, so a February liquidation is evidence that the debt was already doubtful at 31 December — a condition existing then.\n\nThe contrast fixes it. A **fire** destroying a warehouse in February is **non-adjusting**: the asset genuinely existed at the year end and the loss arose afterwards, so it is disclosed if material rather than adjusted.\n\nOption D adds a materiality condition that does not belong here — materiality affects whether an item need be treated precisely, not whether the event adjusts.\n\nThe one event that always adjusts regardless of category is a decision that the entity is **no longer a going concern**, because that changes the entire basis of preparation.",
    earns: [
      "Asking when the CONDITION existed rather than when the event happened",
      "Being able to give the non-adjusting counterpart as a contrast",
    ],
    loses: ["Treating the event as non-adjusting because it happened after the year end"],
  },

  "FA-25::drafting-the-notes": {
    title: "Completing the non-current asset note",
    format: "ot",
    marks: 2,
    requirement:
      "A class of assets had cost of $400,000 and accumulated depreciation of $150,000 at the start of the year. Additions were $80,000, disposals had cost $60,000 with accumulated depreciation of $35,000, and the charge for the year was $45,000. The carrying amount at the year end is:\n\nA  $260,000\nB  $250,000\nC  $285,000\nD  $310,000",
    plan: [
      {
        step: "Run cost and accumulated depreciation as two separate columns",
        detail:
          "The note is built as two reconciliations, and mixing them is what makes the arithmetic go wrong. Never net a disposal's cost against its depreciation in one line.",
      },
      {
        step: "Reconcile the cost column",
        detail:
          "Opening $400,000 + additions $80,000 − disposals at cost $60,000 = **$420,000**.",
      },
      {
        step: "Reconcile the accumulated depreciation column",
        detail:
          "Opening $150,000 + charge $45,000 − depreciation on disposals $35,000 = **$160,000**. The disposal's accumulated depreciation is removed, not the disposal's cost.",
      },
      {
        step: "Take the carrying amount as the difference, then prove it a second way",
        detail:
          "$420,000 − $160,000 = **$260,000**. Prove it via carrying amounts: opening 250,000 + additions 80,000 − disposal carrying amount 25,000 − charge 45,000 = 260,000 ✓. Two routes agreeing is what confirms the columns were built correctly.",
      },
    ],
    answer:
      "**A — $260,000.**\n\n**Cost:** 400,000 + additions 80,000 − disposals at cost 60,000 = **420,000**\n**Accumulated depreciation:** 150,000 + charge 45,000 − depreciation on disposals 35,000 = **160,000**\n**Carrying amount = 420,000 − 160,000 = 260,000**\n\nThe method is what earns the marks: run **cost** and **accumulated depreciation** as two separate reconciliations and take the carrying amount as the difference. The commonest error is netting a disposal's cost against its own accumulated depreciation in a single line, which loses the $25,000 carrying amount of the disposed asset from one column or the other.\n\nProve it a second way: opening carrying amount (400,000 − 150,000) = 250,000, plus additions 80,000, less the disposal's carrying amount (60,000 − 35,000 = 25,000), less the charge 45,000 = **260,000** ✓. Option B, $250,000, is the opening carrying amount — the answer of anyone who reconciled neither column.",
    earns: [
      "Running cost and accumulated depreciation as separate columns",
      "Proving the carrying amount by a second route",
    ],
    loses: ["Netting a disposal's cost against its accumulated depreciation in one line"],
  },

  /* ── FA-26 · Statements of cash flows ────────────────────────── */

  "FA-26::profit-vs-cash": {
    title: "Why a profitable company can run out of cash",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would cause cash generated from operations to be **lower** than operating profit?\n\nA  A depreciation charge for the year\nB  An increase in inventory and receivables\nC  A decrease in inventory\nD  An increase in trade payables",
    plan: [
      {
        step: "Sort each item by whether it consumes or releases cash",
        detail:
          "An increase in a current ASSET consumes cash — the money is tied up in inventory or owed by customers. An increase in a current LIABILITY releases cash, because payment has been deferred.",
      },
      {
        step: "Handle depreciation separately",
        detail:
          "Depreciation is a non-cash expense, so it is ADDED BACK. It makes cash from operations higher than profit, not lower, which puts option A on the wrong side.",
      },
      {
        step: "Test the remaining options",
        detail:
          "A decrease in inventory releases cash. An increase in payables releases cash. Only an increase in inventory and receivables consumes it, making cash lower than profit.",
      },
      {
        step: "Name the business situation this describes",
        detail:
          "Rapid growth: sales rise, so inventory and receivables rise, and the cash is absorbed by working capital faster than profit generates it. This is why growing companies fail.",
      },
    ],
    answer:
      "**B — an increase in inventory and receivables.**\n\nAn increase in a current **asset** consumes cash: money is tied up in inventory or sitting in customers' hands. An increase in a current **liability** releases cash, because payment has been deferred.\n\n**Depreciation** is a non-cash expense and is **added back**, so it makes cash from operations higher than profit — option A is on the wrong side of the adjustment.\n\nThe situation this describes is worth naming: **rapid growth**. Sales rise, so inventory and receivables rise with them, and working capital absorbs cash faster than profit generates it. A profitable, growing company can run out of cash entirely, which is precisely why the statement of cash flows is a primary statement rather than a note.\n\nThe direction rule in full: increase in asset → deduct; decrease in asset → add; increase in liability → add; decrease in liability → deduct.",
    earns: [
      "Sorting by whether the movement consumes or releases cash",
      "Naming growth as the situation that produces the pattern",
    ],
    loses: ["Treating depreciation as a cash outflow"],
  },

  "FA-26::indirect": {
    title: "Reconciling profit to cash generated from operations",
    format: "ot",
    marks: 2,
    requirement:
      "Operating profit is $120,000. Depreciation was $30,000, inventory rose $15,000, receivables fell $9,000 and payables rose $12,000. Cash generated from operations is:\n\nA  $138,000\nB  $156,000\nC  $114,000\nD  $186,000",
    plan: [
      {
        step: "Start from operating profit and list every adjustment with its sign",
        detail:
          "Setting the workings out as a signed list is what prevents a direction error. Operating profit, then non-cash items, then each working capital movement on its own line.",
      },
      {
        step: "Add back the non-cash item",
        detail:
          "Depreciation +$30,000. It was charged against profit but no cash left the business.",
      },
      {
        step: "Apply each working capital movement in the right direction",
        detail:
          "Inventory rose → cash tied up → −$15,000. Receivables fell → cash collected → +$9,000. Payables rose → payment deferred → +$12,000.",
      },
      {
        step: "Total and sanity-check against the net direction",
        detail:
          "120,000 + 30,000 − 15,000 + 9,000 + 12,000 = **$156,000**. Three of the four adjustments are positive, so the answer should comfortably exceed operating profit — which it does.",
      },
    ],
    answer:
      "**B — $156,000.**\n\nOperating profit **120,000**\nAdd depreciation **+30,000** (non-cash)\nIncrease in inventory **−15,000** (cash tied up)\nDecrease in receivables **+9,000** (cash collected)\nIncrease in payables **+12,000** (payment deferred)\n**Cash generated from operations 156,000**\n\nThe sanity check confirms it: three of the four adjustments are positive and the largest is the add-back, so the answer must comfortably exceed operating profit.\n\nOption C, $114,000, comes from reversing every working capital sign — the single most common error, and one the sanity check catches.\n\nTwo further deductions then follow before reaching net cash from operating activities: **interest paid** and **tax paid**, both at the cash amounts rather than the amounts charged.",
    earns: [
      "Setting the workings out as a signed list and checking the net direction",
      "Knowing interest and tax paid come after cash generated from operations",
    ],
    loses: ["Reversing the working capital signs, which is the offered $114,000"],
  },

  "FA-26::deriving-the-cash-figures": {
    title: "Deriving a cash figure from opening and closing balances",
    format: "ot",
    marks: 2,
    requirement:
      "The tax liability was $18,000 at the start of the year and $21,000 at the end. The tax charge in profit or loss was $25,000. Tax paid during the year was:\n\nA  $22,000\nB  $25,000\nC  $28,000\nD  $21,000",
    plan: [
      {
        step: "Build a T-account for the liability",
        detail:
          "Opening balance is a credit, the charge is a credit, the closing balance is carried down as a credit, and cash paid is the balancing debit. The account cannot produce a wrong sign.",
      },
      {
        step: "Enter the three known figures",
        detail:
          "Credits: opening $18,000 + charge $25,000 = $43,000. Closing balance to carry down: $21,000.",
      },
      {
        step: "Take cash paid as the balancing figure",
        detail:
          "$43,000 − $21,000 = **$22,000** paid in cash.",
      },
      {
        step: "Sanity-check with the direction of the balance movement",
        detail:
          "The liability ROSE by $3,000, so less was paid than was charged. $25,000 charge − $3,000 increase = $22,000 ✓. Option C is that adjustment made backwards.",
      },
    ],
    answer:
      "**A — $22,000.**\n\nBuild the liability account:\n\nOpening liability (credit) 18,000\nCharge for the year (credit) 25,000\n**Total 43,000**\nLess closing liability carried down (21,000)\n**Cash paid 22,000**\n\nThe sanity check confirms it in one line: the liability **rose** by $3,000, so less was paid than was charged — $25,000 − $3,000 = $22,000. Option C, $28,000, makes that adjustment in the wrong direction.\n\nThis T-account technique derives every figure the statement of cash flows needs and is not confined to tax. The same structure gives **dividends paid** from the retained earnings movement, **interest paid** from the interest payable account, and **proceeds of disposal** from the non-current asset accounts and the profit or loss on disposal.\n\nBuild the account rather than trying to recall four sign rules.",
    earns: [
      "Building a T-account and taking the cash figure as the balancing item",
      "Checking against the direction the balance moved",
    ],
    loses: ["Adjusting in the wrong direction, or reporting the charge as the amount paid"],
  },

  /* ── FA-27 · Incomplete records ──────────────────────────────── */

  "FA-27::four-techniques": {
    title: "Choosing the technique the missing figure needs",
    format: "ot",
    marks: 2,
    requirement:
      "A sole trader has no record of profit for the year but knows opening capital, closing capital, capital introduced and drawings. Profit can be derived using:\n\nA  A cash and bank summary\nB  The accounting equation, via a capital reconciliation\nC  Margin and mark-up\nD  A receivables control account",
    plan: [
      {
        step: "Match the technique to what is actually missing",
        detail:
          "The four techniques each derive a different figure: the capital reconciliation gives profit, control accounts give sales or purchases, margin and mark-up link cost of sales to revenue, and cash summaries give a missing receipt or payment.",
      },
      {
        step: "Read what the stem supplies",
        detail:
          "Opening capital, closing capital, capital introduced and drawings — four of the five items in the capital reconciliation. So the fifth, profit, can be derived.",
      },
      {
        step: "Write the reconciliation rearranged for profit",
        detail:
          "Closing capital − opening capital − capital introduced + drawings = profit. Rearranging the identity beats recalling a formula in the wrong order.",
      },
      {
        step: "Confirm the other techniques need data not given",
        detail:
          "A control account needs receipts and balances, margin and mark-up need a revenue or cost figure, and a cash summary needs cash movements. None is supported by what the stem provides.",
      },
    ],
    answer:
      "**B — the accounting equation, via a capital reconciliation.**\n\nThe four techniques each derive a different missing figure, and choosing between them is a matter of matching to the data available:\n\n**Capital reconciliation** → profit, from movements in capital\n**Control accounts** → credit sales, or credit purchases, from receipts and balances\n**Margin and mark-up** → revenue from cost of sales, or the reverse\n**Cash and bank summaries** → a missing receipt, payment or drawings figure\n\nHere the stem supplies four of the five items in the reconciliation, so the fifth follows:\n\nClosing capital − opening capital − capital introduced + drawings = **profit**\n\nRearranging the identity is safer than recalling a formula, and drawings is the item most often given the wrong sign — it is **added back**, because it reduced capital without being a loss.",
    earns: [
      "Matching the technique to what is missing rather than to what the topic sounds like",
      "Rearranging the identity rather than recalling a formula",
    ],
    loses: ["Reaching for a control account when no receipts or balances are given"],
  },

  "FA-27::margin-markup": {
    title: "Working between a margin and a mark-up",
    format: "ot",
    marks: 2,
    requirement:
      "A trader's cost of sales was $60,000 and goods are sold at a mark-up of 25% on cost. Revenue was:\n\nA  $75,000\nB  $80,000\nC  $48,000\nD  $45,000",
    plan: [
      {
        step: "Read whether the percentage is on cost or on revenue",
        detail:
          "MARK-UP is on cost, so cost is 100%. MARGIN is on revenue, so revenue is 100%. Reading which one is stated is the whole question, and mixing them is the classic error.",
      },
      {
        step: "Set up the proportions with cost as 100%",
        detail:
          "Mark-up of 25% on cost: cost 100, profit 25, revenue 125. So revenue is 125/100 of cost.",
      },
      {
        step: "Apply and compute",
        detail:
          "$60,000 × 125/100 = **$75,000**, with gross profit of $15,000.",
      },
      {
        step: "Compute the margin version to identify the distractor",
        detail:
          "A 25% MARGIN would make revenue 100 and cost 75, so revenue = $60,000 × 100/75 = **$80,000** — option B, the right answer to the other percentage.",
      },
    ],
    answer:
      "**A — $75,000.**\n\nA **mark-up** is a percentage of **cost**, so cost is 100%: cost 100, profit 25, revenue 125. Revenue = $60,000 × 125/100 = **$75,000**, with gross profit of $15,000.\n\nOption B, $80,000, is the **margin** answer: a 25% margin makes revenue 100 and cost 75, giving $60,000 × 100/75 = $80,000. It is offered because it is the right answer to the other percentage, and reading which one the stem states is the entire question.\n\nThe conversion between the two is worth holding, because a question may state one and require the other:\n\nA 25% **mark-up** = 25/125 = **20% margin**\nA 25% **margin** = 25/75 = **33.3% mark-up**\n\nSetting out cost, profit and revenue as a small proportion table before computing is what stops the two being confused.",
    earns: [
      "Reading whether the percentage is on cost or on revenue before computing",
      "Being able to convert between mark-up and margin",
    ],
    loses: ["Treating a mark-up as a margin, which is the offered $80,000"],
  },

  "FA-27::cash-and-bank-summaries": {
    title: "Deriving a missing figure from a cash summary",
    format: "ot",
    marks: 2,
    requirement:
      "A trader's cash records show: opening cash $500, receipts from customers $84,000, payments to suppliers $61,000, expenses paid $9,000, closing cash $700. Drawings taken in cash were:\n\nA  $13,800\nB  $14,000\nC  $13,200\nD  $14,200",
    plan: [
      {
        step: "Build a cash account with the unknown as the balancing figure",
        detail:
          "Debits: opening cash and receipts. Credits: payments, expenses, drawings and closing cash. Drawings is whatever makes the account balance.",
      },
      {
        step: "Total the money in",
        detail:
          "Opening $500 + receipts $84,000 = **$84,500** available during the year.",
      },
      {
        step: "Total the known money out and the closing balance",
        detail:
          "Payments $61,000 + expenses $9,000 + closing cash $700 = **$70,700** accounted for.",
      },
      {
        step: "Take drawings as the difference and sanity-check it",
        detail:
          "$84,500 − $70,700 = **$13,800**. Check by reconstructing: 500 + 84,000 − 61,000 − 9,000 − 13,800 = 700 ✓, which is the closing balance given.",
      },
    ],
    answer:
      "**A — $13,800.**\n\nMoney in: opening cash $500 + receipts $84,000 = **$84,500**\nMoney out accounted for: payments $61,000 + expenses $9,000 + closing cash $700 = **$70,700**\n**Drawings = $84,500 − $70,700 = $13,800**\n\nProve it by reconstructing the account: 500 + 84,000 − 61,000 − 9,000 − 13,800 = **700** ✓, which is the closing balance the stem gave. That proof costs one line and confirms every figure.\n\nThe technique is the same whatever is missing — build the account, put every known figure in its place, and the unknown is the balancing item.\n\nThe **two-account problem** is the trap in this topic: where a trader banks some takings and pays some expenses in cash before banking, cash and bank must be run as two separate accounts with transfers between them. Treating them as one loses the takings never banked, and those are exactly what the question is usually asking for.",
    earns: [
      "Reconstructing the account to prove the derived figure",
      "Knowing cash and bank must be kept as separate accounts where takings are banked net",
    ],
    loses: ["Merging cash and bank, which loses the takings that never reached the bank"],
  },
}
