/*
 * FR Area D — preparing the financial statements: IAS 1 and single-entity
 * preparation, IAS 7 statements of cash flows, and consolidation (statement of
 * financial position, statement of profit or loss, and associates).
 * The exam-plan layer: what each section is examined by, and how.
 *
 * This area IS Section C. One of FR's two 20-mark constructed responses is a
 * preparation question drawn from these chapters, so the plans here are written
 * to the MARK ALLOCATION rather than to the topic — the pattern PM established
 * and this file follows.
 *
 * Two things separate a candidate who knows consolidation from one who can pass
 * a consolidation question, and both are matters of ORDER rather than knowledge.
 *
 * First, the standard workings are worth marks in themselves. A goodwill working
 * laid out with its four lines earns its marks even when a figure inside it is
 * wrong, because the marker can see the method; the same numbers scattered
 * through a balance sheet earn nothing. So every plan here says what to build
 * before what to present.
 *
 * Second, an adjustment has to be pushed through EVERY working it touches. An
 * unrealised profit made by the subsidiary changes the subsidiary's net assets,
 * which changes the non-controlling interest, which changes group retained
 * earnings — three places, one adjustment. Candidates lose marks not by missing
 * the adjustment but by making it once. Each plan therefore tracks the
 * adjustment across the workings rather than stopping at the first one.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FR_PLANS_D: ExamPlanMap = {
  /* ── FR-24 · IAS 1 and single-entity preparation ────────────────── */

  "FR-24::ias-1": {
    title: "What IAS 1 requires to be presented, and where",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following statements about the requirements of IAS 1 Presentation of Financial Statements is correct?\n\nA  An entity may present items of income and expense as extraordinary items where they are material and unusual in nature\nB  An entity must present an analysis of expenses using a classification based either on their nature or on their function\nC  Assets and liabilities must always be presented in order of liquidity\nD  An entity may offset assets and liabilities whenever the amounts are individually immaterial",
    plan: [
      {
        step: "Recall the complete set of statements first",
        detail:
          "A statement of financial position, a statement of profit or loss and other comprehensive income, a statement of changes in equity, a statement of cash flows, notes including accounting policies, and — where a policy is applied retrospectively or items are restated — a third statement of financial position as at the beginning of the earliest comparative period.",
      },
      {
        step: "Check each option against a rule you can state, not a feeling",
        detail:
          "IAS 1 PROHIBITS extraordinary items outright. Offsetting is prohibited unless an IFRS requires or permits it — materiality is not the test. Order of liquidity is permitted only where it gives more relevant information, typically for a bank; otherwise the current/non-current split is used.",
      },
      {
        step: "Confirm the survivor by naming the choice it describes",
        detail:
          "Expenses are analysed BY NATURE (raw materials, staff costs, depreciation) or BY FUNCTION (cost of sales, distribution, administrative). Function is the format FR uses throughout, and an entity choosing it must disclose additional information on nature, including depreciation and employee benefits expense.",
      },
      {
        step: "Note the underlying principles the question is built on",
        detail:
          "Fair presentation, going concern, accrual basis, consistency of presentation, materiality and aggregation, no offsetting, and comparative information. Most IAS 1 objective tests are one of these seven, dressed as a specific rule.",
      },
    ],
    answer:
      "**B — expenses must be analysed by nature or by function.**\n\nIAS 1 requires an analysis of expenses using whichever of the two classifications is **reliable and more relevant**:\n\n· **By nature** — raw materials and consumables used, employee benefits expense, depreciation and amortisation, other expenses. Nothing is reallocated between functions.\n· **By function** — cost of sales, distribution costs, administrative expenses. This is the format used throughout FR, and an entity choosing it must give **additional disclosure of the nature** of expenses, including depreciation, amortisation and employee benefits expense, because that information is otherwise lost in the reallocation.\n\n**Why the other options are there:**\n\n**A** — IAS 1 **prohibits** the presentation of any item as extraordinary, on the face of the statements or in the notes. Material items of income or expense are disclosed **separately** by nature and amount, but they are never labelled extraordinary.\n\n**C** — the **current/non-current** distinction is the default. Presentation in order of **liquidity** is permitted only where it provides information that is reliable and **more relevant**, which in practice means financial institutions.\n\n**D** — assets and liabilities, and income and expenses, may **not** be offset unless an IFRS requires or permits it. Materiality is not the test; offsetting immaterial balances is still offsetting, and it removes the reader's ability to assess gross amounts.\n\n**The complete set of financial statements**, which underlies a great many IAS 1 questions: statement of financial position; statement of profit or loss and other comprehensive income; statement of changes in equity; statement of cash flows; notes; and a **third statement of financial position** at the beginning of the earliest comparative period where an accounting policy has been applied retrospectively or items have been restated or reclassified.",
    earns: [
      "Stating the two permitted expense analyses and knowing which one FR uses",
      "Knowing offsetting is prohibited unless required or permitted, not merely discouraged",
      "Recalling the extra statement of financial position triggered by retrospective restatement",
    ],
    loses: [
      "Allowing extraordinary items, which IAS 1 removed outright",
      "Treating immateriality as a licence to offset",
    ],
  },

  "FR-24::the-method": {
    title: "Preparing a statement of profit or loss from a trial balance",
    format: "written",
    marks: 20,
    requirement:
      "The following balances have been extracted from the trial balance of Danforth Co at 31 March 20X6 ($'000):\n\nRevenue 6,200 · Purchases 3,800 · Inventory at 1 April 20X5 410 · Distribution costs 620 · Administrative expenses 540 · Land and buildings at cost 5,000 (land element 1,000) · Accumulated depreciation on buildings at 1 April 20X5 800 · Plant and equipment at cost 2,400 · Accumulated depreciation on plant at 1 April 20X5 960 · 8% loan note issued 1 October 20X5 1,000 · Income tax over-provision for the year ended 31 March 20X5 25 (credit) · Equity shares of $1 each 2,000 · Retained earnings at 1 April 20X5 1,450\n\nThe following adjustments have not yet been made:\n\n(i)  Inventory at 31 March 20X6 was counted at a cost of $480,000. This includes items costing $60,000 which can be sold for only $40,000, and which will incur selling costs of $5,000.\n(ii) Depreciation is to be charged for the year: buildings at 2% per annum on the straight-line basis, charged to administrative expenses; plant at 20% per annum on the reducing balance basis, charged to cost of sales.\n(iii) No interest has been paid or accrued on the loan note.\n(iv) The income tax liability for the year ended 31 March 20X6 is estimated at $260,000.\n\n(a) Prepare Danforth Co's statement of profit or loss for the year ended 31 March 20X6. (14 marks)\n(b) Prepare the retained earnings column of the statement of changes in equity for the year, and state the balance carried forward. (6 marks)",
    plan: [
      {
        step: "Read the mark allocation and budget the time before writing anything",
        detail:
          "14 marks of statement plus 6 of movement, over roughly 36 minutes. Part (b) is six marks for four lines of arithmetic — the cheapest marks on the page — so it is written even if part (a) is unfinished. Candidates who run out of time in (a) and never start (b) cap themselves at 14.",
      },
      {
        step: "Do the four adjustments as separate labelled workings, before the statement",
        detail:
          "Each working is worth marks on its own and the marker follows them. Doing the arithmetic in your head and writing only the final line means one slip costs every mark that depended on it. Build W1 inventory, W2 depreciation, W3 finance cost, W4 tax.",
      },
      {
        step: "Apply the net realisable value test item by item, never in total",
        detail:
          "The damaged items cost $60,000 and have an NRV of $40,000 − $5,000 = $35,000, so they are written down by $25,000. Comparing total cost with total NRV across all inventory would let the profitable items hide the loss, and IAS 2 requires the lower of cost and NRV for each item or group.",
      },
      {
        step: "Depreciate the right base with the right method, and remember land",
        detail:
          "Buildings: 2% × $4,000 (cost of 5,000 LESS the 1,000 land element) = $80. LAND IS NOT DEPRECIATED — the single most common error in this question. Plant: 20% reducing balance is applied to the carrying amount ($2,400 − $960 = $1,440), giving $288, not to cost.",
      },
      {
        step: "Time-apportion the finance cost and combine both tax components",
        detail:
          "The loan note was issued on 1 October, six months before the year end: $1,000 × 8% × 6/12 = $40. The tax charge is the current estimate LESS the prior year over-provision: $260 − $25 = $235. Both are two-mark points that reward reading the dates.",
      },
      {
        step: "Build cost of sales as a formula, then present the statement by function",
        detail:
          "Opening inventory + purchases − closing inventory + plant depreciation. Present by function — revenue, cost of sales, gross profit, distribution, administrative, finance cost, tax — because that is the IAS 1 format FR uses throughout.",
      },
    ],
    answer:
      "**Workings**\n\n**W1 Closing inventory**\nCounted at cost $480. Damaged items: cost $60, NRV $40 − $5 = **$35** → write down **$25**.\nClosing inventory = $480 − $25 = **$455**.\n\n**W2 Depreciation**\nBuildings: 2% × ($5,000 − $1,000 land) = **$80** → administrative expenses. **Land is not depreciated.**\nPlant: 20% × ($2,400 − $960) = **$288** → cost of sales.\n\n**W3 Finance cost**\n$1,000 × 8% × 6/12 (issued 1 October) = **$40**, accrued in full as none has been paid.\n\n**W4 Income tax**\nCurrent year estimate $260 less prior year over-provision $25 = **$235**.\n\n**W5 Cost of sales**\n\n| | $'000 |\n|---|---|\n| Opening inventory | 410 |\n| Purchases | 3,800 |\n| Closing inventory (W1) | (455) |\n| Depreciation — plant (W2) | 288 |\n| **Cost of sales** | **4,043** |\n\n**(a) Statement of profit or loss for the year ended 31 March 20X6**\n\n| | $'000 |\n|---|---|\n| Revenue | 6,200 |\n| Cost of sales (W5) | (4,043) |\n| **Gross profit** | **2,157** |\n| Distribution costs | (620) |\n| Administrative expenses (540 + 80) | (620) |\n| **Profit from operations** | **917** |\n| Finance costs (W3) | (40) |\n| **Profit before tax** | **877** |\n| Income tax expense (W4) | (235) |\n| **Profit for the year** | **642** |\n\n**(b) Retained earnings**\n\n| | $'000 |\n|---|---|\n| Balance at 1 April 20X5 | 1,450 |\n| Profit for the year | 642 |\n| **Balance at 31 March 20X6** | **2,092** |\n\nNo dividends were paid or declared in the year, so the movement is the profit alone.",
    earns: [
      "Four labelled workings, each of which earns its marks independently of the final statement",
      "Excluding land from the depreciation charge",
      "Applying reducing balance to carrying amount and straight line to cost — the right base for each",
      "Testing net realisable value on the affected items rather than on inventory as a whole",
      "Time-apportioning the loan interest from the issue date, and netting the over-provision against the tax charge",
    ],
    loses: [
      "Depreciating the full $5,000 including land, which overstates the charge by $20",
      "Applying 20% to plant at cost rather than to carrying amount",
      "Adding the over-provision to the tax charge instead of deducting it",
      "Charging a full year's loan interest when the note was issued six months into the year",
      "Leaving part (b) unattempted — six marks for three lines of arithmetic",
    ],
  },

  /* ── FR-25 · IAS 7: statements of cash flows ────────────────────── */

  "FR-25::classification": {
    title: "Classifying items between the three sections",
    format: "ot",
    marks: 2,
    requirement:
      "Under IAS 7 Statement of Cash Flows, which of the following would be classified as a cash flow from INVESTING activities?\n\nA  A bonus issue of equity shares\nB  Cash proceeds from the disposal of an item of plant\nC  Interest paid on a bank loan, where the entity classifies interest paid as an operating cash flow\nD  A revaluation surplus recognised on a property during the year",
    plan: [
      {
        step: "Name what each section is for",
        detail:
          "OPERATING — the cash effects of the transactions that produce profit. INVESTING — acquiring and disposing of long-term assets and other investments. FINANCING — changes in the size and composition of equity and borrowings.",
      },
      {
        step: "Eliminate anything that is not a cash flow at all",
        detail:
          "A bonus issue moves reserves into share capital and no cash moves. A revaluation surplus is a measurement adjustment. Neither appears anywhere in the statement — non-cash transactions are disclosed separately, not presented as flows.",
      },
      {
        step: "Watch the items IAS 7 lets an entity choose",
        detail:
          "Interest paid may be classified as operating OR financing; interest and dividends received as operating or investing; dividends paid as financing or operating. The stem here has already made the choice, so it belongs where the entity put it. The requirement is that the classification is applied CONSISTENTLY period to period.",
      },
      {
        step: "Confirm the survivor against the definition",
        detail:
          "Proceeds from selling plant are a disposal of a long-term asset — investing. Note it is the CASH PROCEEDS that appear, not the carrying amount and not the profit on disposal, which is an adjustment in the operating reconciliation.",
      },
    ],
    answer:
      "**B — cash proceeds from the disposal of an item of plant.**\n\nThe three sections and what belongs in each:\n\n| Section | Contents |\n|---|---|\n| **Operating** | Cash generated from the entity's principal revenue-producing activities — receipts from customers, payments to suppliers and employees, and, by policy choice, interest and tax |\n| **Investing** | Acquisition and disposal of **long-term assets** and other investments — purchases of property, plant and equipment, proceeds on disposal, purchases and sales of investments |\n| **Financing** | Changes in the size and composition of **equity and borrowings** — share issues for cash, loan proceeds and repayments, dividends paid |\n\nDisposal proceeds of plant are the disposal of a long-term asset, so they sit in **investing**. The figure presented is the **cash proceeds** — not the carrying amount disposed of, and not the profit or loss on disposal, which is removed from profit in the operating reconciliation precisely because the whole cash effect is shown in investing.\n\n**Why the other options are there:** **A** is a **non-cash** transaction — a bonus issue converts reserves to share capital and no cash moves, so it appears nowhere in the statement, though material non-cash transactions are **disclosed separately**. **D** is a **measurement** adjustment, not a cash flow. **C** has been classified by the entity as operating, and the stem says so — IAS 7 permits interest paid in operating **or** financing, and the discipline it imposes is **consistency between periods**, not a single right answer.",
    earns: [
      "Defining the three sections by what they are for rather than by memorised lists",
      "Spotting the non-cash items and excluding them entirely",
      "Knowing which items IAS 7 leaves to policy choice, and that consistency is the requirement",
    ],
    loses: [
      "Putting the carrying amount or the profit on disposal into investing instead of the proceeds",
      "Treating a bonus issue as a financing cash flow because it changes share capital",
    ],
  },

  "FR-25::the-workings": {
    title: "Preparing a statement of cash flows by the indirect method",
    format: "written",
    marks: 20,
    requirement:
      "Grantly Co's financial statements show the following ($'000).\n\nStatements of financial position at 31 December:\n\n| | 20X5 | 20X4 |\n|---|---|---|\n| Property, plant and equipment (carrying amount) | 4,300 | 3,600 |\n| Inventory | 820 | 700 |\n| Trade receivables | 940 | 810 |\n| Cash and cash equivalents | 580 | 250 |\n| Trade payables | 690 | 600 |\n| Income tax payable | 150 | 130 |\n| Loan notes | 1,500 | 1,000 |\n| Equity shares of $1 each | 2,000 | 1,800 |\n| Share premium | 600 | 400 |\n| Retained earnings | 1,430 | 1,160 |\n\nStatement of profit or loss for the year ended 31 December 20X5: profit before tax $620; income tax expense $(180); profit for the year $440.\n\nNotes: depreciation charged for the year was $480. Plant with a carrying amount of $120 was sold for $150. Finance costs of $90 were charged and paid during the year.\n\nPrepare Grantly Co's statement of cash flows for the year ended 31 December 20X5, using the indirect method. (20 marks)",
    plan: [
      {
        step: "Build the five workings first — they are where the marks are",
        detail:
          "Property, plant and equipment additions; tax paid; dividends paid; the disposal; and the working capital movements. Each is a T-account or a short reconciliation, each earns marks on its own, and every one of them is a figure that cannot be read straight off the question.",
      },
      {
        step: "Reconstruct the asset account to find additions, rather than guessing",
        detail:
          "Opening carrying amount + additions − depreciation − carrying amount disposed of = closing carrying amount. $3,600 + X − $480 − $120 = $4,300, so additions = $1,300. Never assume the movement in the balance is the purchases figure.",
      },
      {
        step: "Reconstruct tax and dividends the same way",
        detail:
          "Tax paid = opening payable + charge − closing payable = $130 + $180 − $150 = $160. Dividends paid = opening retained earnings + profit − closing = $1,160 + $440 − $1,430 = $170. Dividends are not given anywhere in the question, and candidates who do not look for them lose the financing section.",
      },
      {
        step: "Start the reconciliation at profit BEFORE tax, and reverse the non-cash and misplaced items",
        detail:
          "Add back depreciation. DEDUCT the $30 profit on disposal, because the whole $150 of cash appears in investing and leaving the profit in would count it twice. Add back finance costs, then show interest paid as its own line.",
      },
      {
        step: "Get the direction of each working capital movement right",
        detail:
          "An INCREASE in inventory or receivables is an outflow — cash has gone into them. An INCREASE in payables is an inflow — the entity has held on to cash. Inventory (120), receivables (130), payables +90.",
      },
      {
        step: "Prove the statement by agreeing it to the movement in cash",
        detail:
          "The three sections must total the change in cash and cash equivalents: $250 to $580 is +$330. If it does not agree, one of the five workings is wrong — and saying so explicitly is what converts a check into a mark.",
      },
    ],
    answer:
      "**Workings**\n\n**W1 Property, plant and equipment — additions**\n$3,600 + additions − $480 depreciation − $120 disposed = $4,300 → **additions $1,300**\n\n**W2 Tax paid**\n$130 opening + $180 charge − $150 closing = **$160 paid**\n\n**W3 Dividends paid**\n$1,160 opening + $440 profit − $1,430 closing = **$170 paid**\n\n**W4 Disposal**\nProceeds **$150**, carrying amount $120 → **profit on disposal $30**, deducted in the reconciliation\n\n**W5 Share issue**\nShare capital +$200 and share premium +$200 → **$400 cash received**\n\n**Statement of cash flows for the year ended 31 December 20X5**\n\n| | $'000 |\n|---|---|\n| **Cash flows from operating activities** | |\n| Profit before tax | 620 |\n| Adjustment for depreciation | 480 |\n| Adjustment for profit on disposal (W4) | (30) |\n| Adjustment for finance costs | 90 |\n| | **1,160** |\n| Increase in inventory | (120) |\n| Increase in trade receivables | (130) |\n| Increase in trade payables | 90 |\n| **Cash generated from operations** | **1,000** |\n| Interest paid | (90) |\n| Income tax paid (W2) | (160) |\n| **Net cash from operating activities** | **750** |\n| **Cash flows from investing activities** | |\n| Purchase of property, plant and equipment (W1) | (1,300) |\n| Proceeds from disposal of plant (W4) | 150 |\n| **Net cash used in investing activities** | **(1,150)** |\n| **Cash flows from financing activities** | |\n| Proceeds from issue of shares (W5) | 400 |\n| Proceeds from loan notes (1,500 − 1,000) | 500 |\n| Dividends paid (W3) | (170) |\n| **Net cash from financing activities** | **730** |\n| **Net increase in cash and cash equivalents** | **330** |\n| Cash and cash equivalents at 1 January 20X5 | 250 |\n| **Cash and cash equivalents at 31 December 20X5** | **580** |\n\nThe statement proves itself: $250 + $330 = **$580**, which agrees to the closing balance in the statement of financial position.",
    earns: [
      "Five labelled workings, each earning marks whether or not the final statement balances",
      "Reconstructing additions, tax paid and dividends paid rather than lifting balance movements",
      "Deducting the profit on disposal while showing the full proceeds in investing",
      "Adding back finance costs and presenting interest paid as its own line",
      "Agreeing the total to the movement in cash, and saying that it agrees",
    ],
    loses: [
      "Treating the $700 movement in carrying amount as the additions figure",
      "Omitting dividends entirely because no dividend is stated in the question",
      "Reversing the working capital signs, so an increase in receivables is shown as an inflow",
      "Leaving the profit on disposal in the reconciliation as well as showing the proceeds — the same cash counted twice",
    ],
  },

  "FR-25::interpretation": {
    title: "What the statement of cash flows shows that profit cannot",
    format: "written",
    marks: 10,
    requirement:
      "Grantly Co reported a profit for the year of $440,000 and generated $1,000,000 of cash from operations, while investing $1,300,000 in new plant funded largely by a share issue and new loan notes.\n\nExplain the usefulness of a statement of cash flows to users of the financial statements, and comment on what Grantly Co's statement reveals about the year. (10 marks)",
    plan: [
      {
        step: "Budget the answer to the marks: roughly five developed points",
        detail:
          "Ten marks is about five points made and applied, not ten points listed. Each point is a sentence of principle plus a sentence about Grantly Co's actual figures. A generic essay with no figures in it will not reach half marks.",
      },
      {
        step: "Lead with the property that makes cash different from profit",
        detail:
          "Cash flow is objective and largely free of judgement. Profit depends on depreciation methods, provisions, estimates of useful life and revenue recognition policy; cash generated from operations does not. That is the argument the whole answer rests on, so it goes first.",
      },
      {
        step: "Use the gap between profit and operating cash flow as evidence",
        detail:
          "$440,000 of profit against $1,000,000 of operating cash. The gap is mostly the $480,000 depreciation add-back — a non-cash charge — which shows the business converting profit into cash rather than into receivables and inventory. A gap the OTHER way is the warning sign, and saying so demonstrates the point rather than asserting it.",
      },
      {
        step: "Read the three sections as a story about strategy and funding",
        detail:
          "Operating inflow $750,000; investing outflow $1,150,000; financing inflow $730,000. The entity is investing more than its operations generate and funding the difference from new capital — expansion, not distress. The same investing outflow funded by an overdraft would read completely differently.",
      },
      {
        step: "Give the limitations, because a one-sided answer caps itself",
        detail:
          "It is historical; it can be flattered by delaying payables or deferring capital expenditure just before the year end; a single year shows no trend; and cash is not profit — an entity can be cash-rich and loss-making. Balance is what the marker is looking for at this mark level.",
      },
    ],
    answer:
      "**Cash flow is harder to manipulate than profit.** Profit depends on judgements — depreciation methods and useful lives, provisions, impairments, the point at which revenue is recognised. Cash generated from operations depends on money actually received and paid. Two entities with identical operations and different accounting policies report different profits but very similar operating cash flows, which is why users treat the statement as a check on the quality of reported earnings.\n\n**The gap between profit and operating cash flow tells you what kind of profit it is.** Grantly Co reported **$440,000** of profit but generated **$1,000,000** from operations. The difference is largely the **$480,000** non-cash depreciation charge, with working capital absorbing $160,000. Profit is converting into cash. The reverse pattern — healthy profit and weak operating cash — usually means receivables or inventory are building, and is the single most common early warning of trouble a set of financial statements can give.\n\n**The three sections read together describe strategy.** Operations generated **$750,000** after interest and tax. Investing consumed **$1,150,000**, principally **$1,300,000** of new plant. Financing brought in **$730,000** from a share issue and new loan notes. Grantly Co is therefore **expanding**, spending more on capacity than its operations currently produce and raising long-term finance to bridge the gap. That is a coherent growth position, and it is quite different from the same investing outflow funded by short-term borrowing.\n\n**It shows solvency and liquidity directly.** Cash rose from $250,000 to $580,000 while the entity was investing heavily — the expansion has not been funded by running the cash balance down. Users assessing whether the entity can pay its debts as they fall due get a direct answer here that the statement of profit or loss cannot give.\n\n**Its limitations should be stated.** The statement is **historical** and is not a forecast. It can be **flattered** at the year end by delaying supplier payments or postponing capital expenditure by a few weeks. One year shows no **trend**, and the increase in loan notes commits the entity to future interest and repayment. And cash is not profit — an entity can generate cash for a period while trading unprofitably, for example by shrinking, which is why the statement is read alongside the other statements rather than in place of them.",
    earns: [
      "Making roughly five developed points rather than listing ten undeveloped ones",
      "Grounding every point in Grantly Co's actual figures",
      "Reading the three sections together as a funding story",
      "Giving limitations as well as usefulness",
    ],
    loses: [
      "Writing a textbook essay on IAS 7 with no reference to the company",
      "Describing what each section contains, which is knowledge, instead of what it reveals, which is the requirement",
      "Omitting limitations entirely and capping the mark",
    ],
  },

  /* ── FR-26 · Consolidated statement of financial position ───────── */

  "FR-26::the-four-workings": {
    title: "The four standard workings for a consolidated statement of financial position",
    format: "written",
    marks: 20,
    requirement:
      "Pelham Co acquired 80% of the equity shares of Sandbourne Co on 1 January 20X5 for cash of $2,400,000. At that date Sandbourne Co's share capital was $1,000,000 and its retained earnings were $1,200,000.\n\nThe fair value of Sandbourne Co's land at the date of acquisition exceeded its carrying amount by $200,000. This has not been reflected in Sandbourne Co's own financial statements, and the land is still held.\n\nPelham Co has elected to measure the non-controlling interest at fair value at the date of acquisition. The fair value of the non-controlling interest at 1 January 20X5 was $560,000.\n\nAt 31 December 20X5 Sandbourne Co's retained earnings were $1,700,000 and Pelham Co's own retained earnings were $3,500,000. A goodwill impairment review at 31 December 20X5 concluded that goodwill was impaired by $60,000.\n\nPrepare the goodwill, net assets, non-controlling interest and group retained earnings workings, and state the amounts at which goodwill, the non-controlling interest and group retained earnings appear in the consolidated statement of financial position at 31 December 20X5. (20 marks)",
    plan: [
      {
        step: "Establish the group structure and the date control passed",
        detail:
          "80% owned, so the non-controlling interest is 20%, and control passed on 1 January 20X5 — the start of the year, so the whole of Sandbourne Co's year is post-acquisition. Write the percentages down; every subsequent working uses them.",
      },
      {
        step: "Build W2, the subsidiary's net assets, in TWO columns before anything else",
        detail:
          "At the acquisition date and at the reporting date, with fair value adjustments in BOTH columns. The acquisition column feeds goodwill; the difference between the columns is the post-acquisition movement that feeds the non-controlling interest and group retained earnings. Nothing else can be built until this exists.",
      },
      {
        step: "Carry the fair value adjustment into both columns, and depreciate it if it is depreciable",
        detail:
          "The $200,000 uplift is on LAND, which is not depreciated, so it appears unchanged in both columns and creates no extra charge. Had it been on plant, the adjustment would be reduced in the reporting-date column by the additional depreciation, and that extra depreciation would reduce post-acquisition profits.",
      },
      {
        step: "Compute goodwill as four lines, using the measurement basis the question specifies",
        detail:
          "Consideration + non-controlling interest at fair value − net assets at acquisition = goodwill. Because the NCI is at FAIR VALUE, the goodwill computed is the WHOLE of the subsidiary's goodwill, including the NCI's share. Under the proportionate basis the NCI line would instead be 20% of net assets at acquisition, and goodwill would be the parent's share only.",
      },
      {
        step: "Split the impairment where the NCI is at fair value",
        detail:
          "Full goodwill belongs to both owners, so the $60,000 impairment is shared 80:20 — $48,000 against group retained earnings and $12,000 against the non-controlling interest. Under the proportionate method the entire impairment falls on the parent, because the NCI's share of goodwill was never recognised. This is the point at which the two methods visibly diverge.",
      },
      {
        step: "Assemble W4 and W5 from the same post-acquisition figure",
        detail:
          "Post-acquisition movement is $500,000. NCI gets 20% of it; group retained earnings get 80%. Both then take their share of the impairment. Using different post-acquisition figures in the two workings is the error that makes a consolidated statement fail to balance.",
      },
    ],
    answer:
      "**W1 Group structure**\nPelham Co owns **80%**; non-controlling interest **20%**. Control passed on **1 January 20X5**, the first day of the year, so Sandbourne Co's entire year is post-acquisition.\n\n**W2 Net assets of Sandbourne Co**\n\n| | At acquisition $'000 | At reporting date $'000 |\n|---|---|---|\n| Share capital | 1,000 | 1,000 |\n| Retained earnings | 1,200 | 1,700 |\n| Fair value adjustment — land | 200 | 200 |\n| **Net assets** | **2,400** | **2,900** |\n\n**Post-acquisition increase = $2,900 − $2,400 = $500.**\nThe land adjustment appears in **both** columns and is **not depreciated**, so it creates no post-acquisition charge.\n\n**W3 Goodwill**\n\n| | $'000 |\n|---|---|\n| Consideration transferred | 2,400 |\n| Non-controlling interest at fair value | 560 |\n| Net assets at acquisition (W2) | (2,400) |\n| **Goodwill at acquisition** | **560** |\n| Impairment to date | (60) |\n| **Goodwill in the consolidated statement of financial position** | **500** |\n\n**W4 Non-controlling interest**\n\n| | $'000 |\n|---|---|\n| NCI at acquisition, at fair value | 560 |\n| Share of post-acquisition profits — 20% × 500 (W2) | 100 |\n| Share of goodwill impairment — 20% × 60 | (12) |\n| **Non-controlling interest** | **648** |\n\n**W5 Group retained earnings**\n\n| | $'000 |\n|---|---|\n| Pelham Co — own retained earnings | 3,500 |\n| Share of post-acquisition profits — 80% × 500 (W2) | 400 |\n| Share of goodwill impairment — 80% × 60 | (48) |\n| **Group retained earnings** | **3,852** |\n\n**The three figures required:** goodwill **$500,000**; non-controlling interest **$648,000**; group retained earnings **$3,852,000**.\n\n**Why the measurement basis matters.** Because the non-controlling interest is measured at **fair value**, goodwill of $560,000 is the **whole** of Sandbourne Co's goodwill and belongs to both sets of owners — so its impairment is shared 80:20. Had the NCI been measured at its **proportionate share of net assets**, the NCI line in W3 would have been 20% × $2,400 = $480, goodwill would have been $480 — the parent's share only — and the **entire** impairment would have been charged to group retained earnings, because none of the NCI's goodwill was ever recognised.",
    earns: [
      "Building the net assets working in two columns before attempting goodwill",
      "Placing the fair value adjustment in both columns and recognising that land carries no extra depreciation",
      "Laying goodwill out as four labelled lines, which earns method marks even if a figure is wrong",
      "Splitting the impairment 80:20 because the NCI is at fair value, and knowing the proportionate basis would not",
      "Using one post-acquisition figure consistently across the NCI and retained earnings workings",
    ],
    loses: [
      "Omitting the fair value adjustment from the acquisition-date column, which overstates goodwill",
      "Charging the whole impairment to group retained earnings when the NCI is at fair value",
      "Using the subsidiary's full retained earnings instead of the post-acquisition movement",
      "Presenting figures with no workings, so a single arithmetic slip costs every dependent mark",
    ],
  },

  "FR-26::mechanics": {
    title: "What consolidation actually does, line by line",
    format: "ot",
    marks: 2,
    requirement:
      "Parkin Co owns 75% of the equity shares of Selby Co, which it controls. In preparing the consolidated statement of financial position, how are Selby Co's assets and liabilities and Parkin Co's investment in Selby Co dealt with?\n\nA  75% of Selby Co's assets and liabilities are added to Parkin Co's, and the investment is retained at cost\nB  100% of Selby Co's assets and liabilities are added to Parkin Co's, and the investment is eliminated against the net assets acquired\nC  100% of Selby Co's assets and liabilities are added to Parkin Co's, and the investment is retained at cost\nD  Selby Co's net assets are shown as a single line investment measured using the equity method",
    plan: [
      {
        step: "Start from what consolidation is trying to show",
        detail:
          "The group as a SINGLE ECONOMIC ENTITY under the parent's control. Control, not ownership percentage, is the trigger — so the resources the parent controls are presented in full.",
      },
      {
        step: "Apply that to the assets and liabilities",
        detail:
          "100% of the subsidiary's assets and liabilities are added in, line by line, even though only 75% is owned. Consolidating 75% of each line would report neither what is controlled nor what is owned.",
      },
      {
        step: "Account for the part not owned in one place",
        detail:
          "The 25% belonging to other shareholders is presented as the NON-CONTROLLING INTEREST within equity — a single line, not a deduction spread across the assets. That is the whole reason the NCI exists.",
      },
      {
        step: "Eliminate the investment so nothing is counted twice",
        detail:
          "The cost of the investment is cancelled against the net assets acquired, with the excess recognised as goodwill. Leaving the investment on the face would report both the shares AND the underlying assets they represent.",
      },
    ],
    answer:
      "**B — 100% of the assets and liabilities are added, and the investment is eliminated.**\n\nConsolidation presents the group as a **single economic entity**. The trigger is **control**, not the size of the shareholding, so once Parkin Co controls Selby Co it presents **all** of the resources it controls:\n\n· **100%** of Selby Co's assets and liabilities are added to Parkin Co's own, **line by line** — not 75%\n· the **25% not owned** is reported in one place, as the **non-controlling interest within equity**\n· the **cost of the investment** in Selby Co is **eliminated** against the net assets acquired, and the excess is recognised as **goodwill**\n\nThe elimination is what prevents double counting. The investment is a claim on Selby Co's net assets; if both the investment and those net assets appeared, the group would report the same resources twice.\n\n**Why the other options are there:** **A** consolidates proportionately, which IFRS does not permit for subsidiaries and which reports neither control nor ownership faithfully. **C** consolidates correctly but keeps the investment, double counting the subsidiary. **D** describes the **equity method**, which applies to an **associate** — significant influence, not control — and is exactly the treatment being contrasted here.",
    earns: [
      "Identifying control as the trigger and explaining why that leads to 100% consolidation",
      "Placing the non-controlling interest in equity as a single line",
      "Explaining the elimination as the prevention of double counting",
    ],
    loses: [
      "Consolidating the ownership percentage of each line",
      "Applying the equity method to a controlled entity",
    ],
  },

  /* ── FR-27 · Consolidation adjustments ──────────────────────────── */

  "FR-27::intra-group-balances": {
    title: "Cancelling intra-group balances, and items in transit",
    format: "ot",
    marks: 2,
    requirement:
      "Pardoe Co owns 90% of Selkirk Co. At 31 December 20X5 Pardoe Co's trade receivables include $180,000 owed by Selkirk Co, but Selkirk Co's trade payables show only $150,000 owed to Pardoe Co. The difference is a payment of $30,000 sent by Selkirk Co on 29 December which Pardoe Co did not receive until 3 January 20X6.\n\nWhat adjustment is required in the consolidated statement of financial position at 31 December 20X5?\n\nA  Reduce receivables and payables by $150,000, and recognise cash in transit of $30,000\nB  Reduce receivables and payables by $180,000\nC  Reduce receivables and payables by $150,000, with no other adjustment\nD  Reduce receivables by $180,000 and payables by $150,000, with the difference to group retained earnings",
    plan: [
      {
        step: "State the principle before touching the figures",
        detail:
          "A group cannot owe money to itself. Intra-group receivables and payables must be cancelled in full — but they can only cancel against each other to the extent they AGREE.",
      },
      {
        step: "Find why the two balances differ",
        detail:
          "Almost always cash in transit or goods in transit. Here $30,000 of cash left Selkirk Co before the year end and had not arrived. Neither company is wrong; the group simply holds an asset that is temporarily in neither set of books.",
      },
      {
        step: "Bring the in-transit item into the receiving company's books first",
        detail:
          "Record the $30,000 as CASH IN TRANSIT, which reduces the receivable from $180,000 to $150,000. Now both balances are $150,000 and can be cancelled against each other. Goods in transit would be brought in as inventory in exactly the same way.",
      },
      {
        step: "Cancel the agreed amount, and check what survives",
        detail:
          "Cancel $150,000 from consolidated receivables and payables. The $30,000 stays in the consolidated statement as cash — it is a real group asset, and it does not disappear just because it is between two bank accounts.",
      },
    ],
    answer:
      "**A — cancel $150,000 from receivables and payables, and recognise cash in transit of $30,000.**\n\nA group is a single entity and **cannot owe money to itself**, so intra-group balances must be eliminated. They can only be eliminated against each other where they **agree**, and here they do not: $180,000 against $150,000.\n\nThe $30,000 difference is **cash in transit** — it left Selkirk Co on 29 December but did not reach Pardoe Co until 3 January. Neither company has made an error.\n\n**The two-step adjustment:**\n\n**Step 1 — bring the in-transit item into the receiving company's books.**\nDr Cash in transit $30,000 / Cr Receivables $30,000. Pardoe Co's intra-group receivable falls to **$150,000** and now agrees with Selkirk Co's payable.\n\n**Step 2 — cancel the agreed balances.**\nDr Payables $150,000 / Cr Receivables $150,000.\n\n**The net effect on the consolidated statement of financial position:** receivables reduced by $180,000, payables reduced by $150,000, and **cash increased by $30,000**. The cash is a genuine group asset sitting between two bank accounts, and it survives consolidation.\n\nThe identical approach applies to **goods in transit**: bring them into the receiving company as **inventory** at cost to the group, then cancel the agreed balances — remembering to strip out any unrealised profit on those goods.\n\n**Why the other options are there:** **B** cancels the full $180,000, which removes $30,000 of payables that were never there and leaves the statement unbalanced. **C** cancels correctly but loses the $30,000 of cash altogether. **D** puts a reconciling difference through retained earnings, treating a timing difference as a profit or loss.",
    earns: [
      "Recognising the difference as a timing item rather than an error",
      "Bringing the in-transit item into the receiving company before cancelling",
      "Keeping the cash in the consolidated statement of financial position",
    ],
    loses: [
      "Cancelling the larger of the two balances and unbalancing the statement",
      "Writing the difference off to group retained earnings",
      "Forgetting the unrealised profit adjustment when the item in transit is goods rather than cash",
    ],
  },

  "FR-27::purp": {
    title: "Unrealised profit on intra-group trading, and where it lands",
    format: "ot",
    marks: 2,
    requirement:
      "Prentice Co owns 75% of Sudbury Co. During the year ended 31 December 20X5 Sudbury Co sold goods to Prentice Co for $600,000, at a mark-up of 25% on cost. One quarter of these goods remained in Prentice Co's inventory at 31 December 20X5.\n\nWhat is the unrealised profit, and how does it affect the non-controlling interest?\n\nA  $30,000, of which $7,500 is charged against the non-controlling interest\nB  $30,000, charged in full against group retained earnings\nC  $37,500, of which $9,375 is charged against the non-controlling interest\nD  $150,000, charged in full against group retained earnings",
    plan: [
      {
        step: "Take only the goods still held inside the group",
        detail:
          "Profit on goods that have been SOLD ON to third parties is realised and needs no adjustment. Here one quarter remains: $600,000 × 1/4 = $150,000 of inventory at transfer price. Option D uses the whole intra-group sale, which is the crudest available error.",
      },
      {
        step: "Get the margin fraction right — this is where the marks are lost",
        detail:
          "MARK-UP ON COST of 25% means cost 100, profit 25, selling price 125 → the profit fraction of selling price is 25/125 = 1/5. A MARGIN of 25% would mean 25/100 of selling price. Read which word the question used, every time.",
      },
      {
        step: "Compute the unrealised profit",
        detail:
          "$150,000 × 25/125 = $30,000. Option C applies 25/100 to the same inventory — the exact error the two wordings are designed to catch.",
      },
      {
        step: "Adjust in the direction of the SELLER",
        detail:
          "The SUBSIDIARY sold the goods, so the unrealised profit sits in the subsidiary's books. It reduces the subsidiary's post-acquisition profit, so the non-controlling interest bears its 25% share: $7,500. Had the PARENT been the seller, the whole $30,000 would fall on group retained earnings and the NCI would be untouched.",
      },
    ],
    answer:
      "**A — $30,000, of which $7,500 is charged against the non-controlling interest.**\n\n**Step 1 — how much is still in the group?**\nOne quarter of $600,000 = **$150,000** of inventory held at transfer price. The other three quarters have been sold on to third parties, so that profit is **realised** and is left alone.\n\n**Step 2 — the profit inside that inventory.**\nA **mark-up of 25% on cost** means cost 100, profit 25, selling price 125. The profit fraction of the transfer price is therefore **25/125**:\n\n$150,000 × 25/125 = **$30,000 unrealised profit**\n\nThis is the single most valuable distinction in the topic:\n\n| Wording | Fraction of selling price |\n|---|---|\n| Mark-up of 25% **on cost** | 25/125 = **20%** |\n| **Margin** of 25% | 25/100 = **25%** |\n\n**Step 3 — the adjustment, in the direction of the seller.**\nThe inventory is written down to cost to the group: **Dr Cost of sales / retained earnings $30,000, Cr Inventory $30,000**. Consolidated inventory falls by $30,000.\n\n**Sudbury Co, the subsidiary, made the sale**, so the unrealised profit is in the **subsidiary's** books and reduces its post-acquisition profits. It is therefore shared:\n\n· non-controlling interest 25% × $30,000 = **$7,500**\n· group retained earnings 75% × $30,000 = **$22,500**\n\nHad the **parent** been the seller, the whole $30,000 would have been charged to group retained earnings and the non-controlling interest would have been unaffected — the profit would have been in the parent's books, which the NCI has no share of.\n\n**Why the other options are there:** **B** has the right amount but ignores who sold, which is half the marks. **C** applies 25/100 to the retained inventory, the margin-versus-mark-up trap. **D** adjusts for the entire intra-group sale rather than the unsold portion.",
    earns: [
      "Restricting the adjustment to inventory still held within the group",
      "Using 25/125 for a mark-up on cost and being able to say why",
      "Charging the adjustment in the direction of the seller, so the NCI bears its share only when the subsidiary sold",
    ],
    loses: [
      "Applying the margin fraction to a mark-up, or the reverse",
      "Adjusting for the whole intra-group sale rather than the unsold quarter",
      "Charging the whole unrealised profit to group retained earnings when the subsidiary was the seller",
    ],
  },

  "FR-27::fair-values-and-loans": {
    title: "Fair value adjustments on depreciable assets, and intra-group loans",
    format: "ot",
    marks: 2,
    requirement:
      "Padstow Co acquired 80% of Sennen Co on 1 January 20X4. At that date the fair value of Sennen Co's plant exceeded its carrying amount by $400,000, and the plant had a remaining useful life of five years. The adjustment has never been recorded in Sennen Co's own financial statements.\n\nWhat is the effect on the consolidated financial statements for the year ended 31 December 20X5?\n\nA  The fair value adjustment in the net assets working at 31 December 20X5 is $240,000, and consolidated depreciation is increased by $80,000 for the year\nB  The fair value adjustment in the net assets working at 31 December 20X5 is $400,000, and there is no effect on depreciation\nC  The fair value adjustment in the net assets working at 31 December 20X5 is $320,000, and consolidated depreciation is increased by $80,000 for the year\nD  The fair value adjustment is charged to group retained earnings in full in the year of acquisition",
    plan: [
      {
        step: "Put the full adjustment into the acquisition column, always",
        detail:
          "$400,000 at 1 January 20X4. Net assets at acquisition must be at FAIR VALUE, because that is what the consideration was paid for. Omitting it overstates goodwill by the whole amount.",
      },
      {
        step: "Depreciate it over the remaining life, because it is a depreciable asset",
        detail:
          "$400,000 ÷ 5 years = $80,000 a year of ADDITIONAL consolidated depreciation, charged in the consolidated statement of profit or loss on top of what Sennen Co charged in its own books. Land would carry no such charge, which is what makes the asset type the first thing to check.",
      },
      {
        step: "Carry the DEPRECIATED balance into the reporting-date column",
        detail:
          "Two years have passed to 31 December 20X5, so $400,000 − (2 × $80,000) = $240,000. Using the original $400,000 in both columns removes the post-acquisition charge entirely and overstates net assets.",
      },
      {
        step: "Follow the extra depreciation through to the non-controlling interest",
        detail:
          "The charge reduces the SUBSIDIARY's post-acquisition profit, so the NCI bears 20% of it. This is the same discipline as the unrealised profit adjustment: one adjustment, pushed through every working it touches.",
      },
    ],
    answer:
      "**A — $240,000 in the reporting-date column, with consolidated depreciation increased by $80,000 for the year.**\n\n**At acquisition** the net assets working must show Sennen Co's assets at **fair value**, because fair value is what the consideration bought. The full **$400,000** goes into the acquisition column and reduces goodwill accordingly.\n\n**Afterwards**, a fair value adjustment on a **depreciable** asset must be depreciated over the asset's **remaining useful life**:\n\n$400,000 ÷ 5 years = **$80,000 of additional consolidated depreciation each year**\n\nThis charge exists **only in the consolidated financial statements**. Sennen Co has never recorded the uplift, so it depreciates the lower carrying amount in its own books, and the group adds the difference on consolidation.\n\n**At 31 December 20X5**, two years after acquisition:\n\n| | $'000 |\n|---|---|\n| Fair value adjustment at acquisition | 400 |\n| Additional depreciation, 2 years × 80 | (160) |\n| **Adjustment in the reporting-date column** | **240** |\n\n**And it follows through to the non-controlling interest.** The extra depreciation reduces Sennen Co's post-acquisition profits, so the NCI bears **20% × $80,000 = $16,000** of it each year and group retained earnings bear 80%. One adjustment, three workings — the net assets working, the NCI, and group retained earnings.\n\n**On intra-group loans**, the same cancellation principle applies as for trading balances: a loan receivable in one company and a loan payable in the other are **cancelled in full** against each other, and any **intra-group interest** is eliminated from both finance income and finance costs. Accrued interest is cancelled in the same way, once both sides have recorded it.\n\n**Why the other options are there:** **B** freezes the adjustment at cost, which is right at acquisition and wrong at every date after it. **C** deducts only one year's depreciation when two have passed. **D** writes the adjustment off, when it is a measurement of the net assets acquired and not an expense.",
    earns: [
      "Placing the full adjustment in the acquisition column so goodwill is not overstated",
      "Depreciating the uplift over its remaining life and knowing the charge exists only on consolidation",
      "Carrying the depreciated balance, not the original, into the reporting-date column",
      "Following the extra depreciation through to the non-controlling interest",
    ],
    loses: [
      "Using the same figure in both columns, which removes the post-acquisition effect",
      "Forgetting that land carries no additional depreciation while plant does",
      "Leaving intra-group interest in consolidated finance income and finance costs",
    ],
  },

  /* ── FR-28 · Consolidated statement of profit or loss ───────────── */

  "FR-28::the-method": {
    title: "Consolidating profit or loss after a mid-year acquisition",
    format: "written",
    marks: 20,
    requirement:
      "Pentire Co acquired 60% of the equity shares of Struan Co on 1 July 20X5. The statements of profit or loss for the year ended 31 December 20X5 are ($'000):\n\n| | Pentire Co | Struan Co |\n|---|---|---|\n| Revenue | 8,000 | 3,000 |\n| Cost of sales | (4,800) | (1,900) |\n| Distribution costs | (700) | (300) |\n| Administrative expenses | (600) | (240) |\n| Finance costs | (100) | (40) |\n| Income tax expense | (400) | (120) |\n\nStruan Co's profits accrued evenly over the year.\n\nDuring the post-acquisition period Struan Co sold goods to Pentire Co for $400,000. Goods with an invoice value of $100,000 remained in Pentire Co's inventory at 31 December 20X5. Struan Co sells to Pentire Co at a mark-up of 25% on cost.\n\nGoodwill was impaired by $50,000 during the year; impairment is charged to administrative expenses. The non-controlling interest is measured at its proportionate share of net assets.\n\nPrepare the consolidated statement of profit or loss for the year ended 31 December 20X5, showing the allocation of profit between the owners of the parent and the non-controlling interest. (20 marks)",
    plan: [
      {
        step: "Fix the consolidation period before adding a single figure",
        detail:
          "Control passed on 1 July, so only SIX MONTHS of Struan Co is consolidated. Profits accrue evenly, so every one of its lines is halved. Consolidating the full year is the largest single error available in this question and it contaminates every line.",
      },
      {
        step: "Add across, then remove the intra-group trading from both sides",
        detail:
          "Deduct the $400,000 intra-group sale from BOTH revenue and cost of sales. It nets to zero on profit, which is exactly why candidates skip it — but revenue and cost of sales are separately marked, and an overstated group revenue is a visible error.",
      },
      {
        step: "Add the unrealised profit to cost of sales",
        detail:
          "$100,000 still held × 25/125 = $20,000. Mark-up on cost, so the fraction is 25/125 and not 25/100. It INCREASES cost of sales, reducing group profit — the goods are held above what they cost the group.",
      },
      {
        step: "Bring in the goodwill impairment where the question directs",
        detail:
          "$50,000 to administrative expenses. It is a group-only charge appearing in neither company's own statement, so it is easy to omit and it is separately marked.",
      },
      {
        step: "Compute the NCI from the SUBSIDIARY's adjusted post-acquisition profit",
        detail:
          "Not from group profit. Take Struan Co's six-month profit, deduct the $20,000 unrealised profit because Struan Co was the seller, then take 40%. Because the NCI is measured proportionately, NONE of the goodwill impairment is charged against it.",
      },
      {
        step: "Present the split and prove it adds back to the total",
        detail:
          "Profit attributable to owners of the parent plus non-controlling interest must equal profit for the year. Stating the check costs one line and catches a wrong allocation before the marker does.",
      },
    ],
    answer:
      "**W1 Struan Co consolidated for six months** (profits accrue evenly, control passed 1 July)\n\n| | Full year $'000 | Six months $'000 |\n|---|---|---|\n| Revenue | 3,000 | 1,500 |\n| Cost of sales | (1,900) | (950) |\n| Distribution costs | (300) | (150) |\n| Administrative expenses | (240) | (120) |\n| Finance costs | (40) | (20) |\n| Income tax expense | (120) | (60) |\n| **Profit for the period** | | **200** |\n\n**W2 Unrealised profit**\n$100,000 held × 25/125 = **$20,000**, added to cost of sales. Struan Co is the seller, so it reduces **Struan Co's** profit.\n\n**W3 Struan Co's adjusted post-acquisition profit**\n$200 − $20 (W2) = **$180**\n\n**W4 Non-controlling interest**\n40% × $180 (W3) = **$72**\nThe NCI is measured at its **proportionate share of net assets**, so **no** goodwill impairment is charged against it.\n\n**Consolidated statement of profit or loss for the year ended 31 December 20X5**\n\n| | $'000 |\n|---|---|\n| Revenue (8,000 + 1,500 − 400) | 9,100 |\n| Cost of sales (4,800 + 950 − 400 + 20) | (5,370) |\n| **Gross profit** | **3,730** |\n| Distribution costs (700 + 150) | (850) |\n| Administrative expenses (600 + 120 + 50 impairment) | (770) |\n| **Profit from operations** | **2,110** |\n| Finance costs (100 + 20) | (120) |\n| **Profit before tax** | **1,990** |\n| Income tax expense (400 + 60) | (460) |\n| **Profit for the year** | **1,530** |\n\n**Profit attributable to:**\n\n| | $'000 |\n|---|---|\n| Owners of the parent (balancing figure) | 1,458 |\n| Non-controlling interest (W4) | 72 |\n| | **1,530** |\n\nThe allocation agrees back to profit for the year, which confirms the split.",
    earns: [
      "Time-apportioning every one of the subsidiary's lines to the post-acquisition period",
      "Removing the intra-group sale from revenue and cost of sales even though it nets to nil on profit",
      "Using 25/125 for the mark-up and adding the unrealised profit to cost of sales",
      "Including the goodwill impairment, which appears in neither company's own statement",
      "Basing the NCI on the subsidiary's adjusted profit, and charging it no impairment under the proportionate method",
    ],
    loses: [
      "Consolidating twelve months of the subsidiary, which misstates every line",
      "Omitting the intra-group elimination and overstating group revenue by $400",
      "Charging the unrealised profit against the parent when the subsidiary made the sale",
      "Calculating the non-controlling interest as a percentage of group profit rather than of the subsidiary's",
    ],
  },

  "FR-28::oci-and-presentation": {
    title: "Other comprehensive income, and what appears below the profit line",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following statements about the consolidated statement of profit or loss and other comprehensive income is correct?\n\nA  Total comprehensive income is allocated between the owners of the parent and the non-controlling interest, as well as profit for the year\nB  Other comprehensive income is presented net of the non-controlling interest's share, so no allocation is required\nC  A revaluation surplus arising in a subsidiary is allocated entirely to the owners of the parent\nD  Items of other comprehensive income are never reclassified to profit or loss in a later period",
    plan: [
      {
        step: "Recall the two allocations required at the foot of the statement",
        detail:
          "PROFIT for the year is allocated between owners of the parent and the non-controlling interest, and TOTAL COMPREHENSIVE INCOME is allocated in the same way. Two allocations, not one.",
      },
      {
        step: "Ask who owns a gain that arises inside the subsidiary",
        detail:
          "A revaluation surplus in the subsidiary belongs to ALL of the subsidiary's shareholders, so the NCI takes its share of it exactly as it takes its share of profit. Nothing about other comprehensive income changes who owns what.",
      },
      {
        step: "Recall the two OCI categories, since one option turns on them",
        detail:
          "Items that WILL be reclassified to profit or loss (for example exchange differences on translating a foreign operation) and items that WILL NOT (revaluation surpluses under IAS 16, and remeasurements of defined benefit plans). IAS 1 requires the two groups to be presented separately.",
      },
      {
        step: "Confirm the survivor",
        detail:
          "Only A states a requirement of IAS 1 correctly. The other three each fail on a specific rule rather than on plausibility.",
      },
    ],
    answer:
      "**A — total comprehensive income is allocated as well as profit for the year.**\n\nThe statement carries **two** allocations at its foot, and both are required by IAS 1:\n\n**Profit for the year attributable to:** owners of the parent / non-controlling interest\n**Total comprehensive income attributable to:** owners of the parent / non-controlling interest\n\n**Why the other options are there:**\n\n**B** — other comprehensive income is presented **gross**, and then allocated. It is not netted down to the parent's share.\n\n**C** — a revaluation surplus arising in a **subsidiary** belongs to all of that subsidiary's shareholders. The non-controlling interest takes its **percentage share**, in precisely the way it shares in profit. Allocating it entirely to the parent would credit the parent with a gain on assets it only partly owns.\n\n**D** — IAS 1 requires other comprehensive income to be split into **two groups**, which exist only because reclassification does happen:\n\n| Will **not** be reclassified to profit or loss | **May be** reclassified to profit or loss |\n|---|---|\n| Revaluation surplus on property, plant and equipment (IAS 16) | Exchange differences on translating a foreign operation |\n| Remeasurements of a defined benefit plan | Gains and losses on debt instruments held at fair value through OCI |\n| Fair value gains on **equity** investments designated at fair value through OCI | |\n\nThe distinction is examinable in its own right, and the presentation requirement follows directly from it.",
    earns: [
      "Knowing both profit and total comprehensive income are allocated",
      "Giving the non-controlling interest its share of a subsidiary's revaluation surplus",
      "Splitting other comprehensive income into the reclassifiable and non-reclassifiable groups",
    ],
    loses: [
      "Allocating profit but not total comprehensive income",
      "Treating a subsidiary's revaluation surplus as wholly the parent's",
    ],
  },

  /* ── FR-29 · IAS 28: associates and the equity method ───────────── */

  "FR-29::the-equity-method": {
    title: "Applying the equity method to an associate",
    format: "ot",
    marks: 2,
    requirement:
      "Padgett Co acquired 30% of the equity shares of Aldreth Co on 1 January 20X5 for $900,000, and exercises significant influence over it. Aldreth Co's profit for the year ended 31 December 20X5 was $500,000, and it paid a dividend of $200,000 during the year.\n\nAt what amount should the investment in Aldreth Co be carried in Padgett Co's consolidated statement of financial position at 31 December 20X5, and what is recognised in the consolidated statement of profit or loss?\n\nA  Investment $990,000; share of profit of associate $150,000\nB  Investment $1,050,000; share of profit of associate $150,000\nC  Investment $900,000; dividend income $60,000\nD  Investment $990,000; dividend income $60,000",
    plan: [
      {
        step: "Identify the relationship, because it decides the whole treatment",
        detail:
          "SIGNIFICANT INFLUENCE — presumed at 20% to 50% of the voting rights — makes Aldreth Co an ASSOCIATE, accounted for by the EQUITY METHOD. Control would mean consolidation line by line; neither influence nor control would mean a financial asset under IFRS 9.",
      },
      {
        step: "Write the equity method as one formula",
        detail:
          "Cost + share of post-acquisition profits − dividends received − any impairment. Three movements from a starting figure, and the exam question is always which of them the candidate forgets.",
      },
      {
        step: "Apply it to the figures",
        detail:
          "$900,000 + (30% × $500,000) − (30% × $200,000) = $900,000 + $150,000 − $60,000 = $990,000.",
      },
      {
        step: "Say what appears in profit or loss, and what does NOT",
        detail:
          "A single line — SHARE OF PROFIT OF ASSOCIATE $150,000 — presented before tax as its own line. The dividend is NOT income; it is a return OF the investment that reduces its carrying amount. Recognising both would count the same earnings twice.",
      },
    ],
    answer:
      "**A — investment $990,000; share of profit of associate $150,000.**\n\nHolding 30% of the voting rights gives **significant influence** — presumed for holdings between 20% and 50% — so Aldreth Co is an **associate** and is accounted for by the **equity method**.\n\n**Carrying amount:**\n\n| | $ |\n|---|---|\n| Cost of investment | 900,000 |\n| Share of post-acquisition profit — 30% × 500,000 | 150,000 |\n| Dividend received — 30% × 200,000 | (60,000) |\n| **Carrying amount at 31 December 20X5** | **990,000** |\n\n**In the consolidated statement of profit or loss**, a single line — **share of profit of associate $150,000** — presented as its own line, before tax. The associate's revenue, expenses, assets and liabilities are **never** added line by line; that is consolidation, and it is reserved for entities the group controls.\n\n**The dividend is not income.** It is a distribution of profits the group has **already recognised** through its share of the associate's profit, so it **reduces the carrying amount** of the investment. Recognising the $150,000 share of profit **and** $60,000 of dividend income would count the same earnings twice — which is exactly what options C and D do.\n\n**Why the other options are there:** **B** omits the dividend deduction, leaving the investment overstated by $60,000. **C** and **D** apply the cost model with dividend income, the IFRS 9 treatment for an investment carrying **no** significant influence.",
    earns: [
      "Identifying significant influence and naming the equity method",
      "Deducting the dividend from the carrying amount rather than recognising it as income",
      "Presenting one line in profit or loss, not a line-by-line consolidation",
    ],
    loses: [
      "Recognising dividend income alongside the share of profit, double counting the associate's earnings",
      "Consolidating the associate line by line",
      "Leaving the investment at cost",
    ],
  },

  "FR-29::losses-and-impairment": {
    title: "Associate losses, impairment, and the exemptions",
    format: "ot",
    marks: 2,
    requirement:
      "Prowse Co holds a 40% interest in an associate, carried at $300,000. In the year ended 31 December 20X5 the associate made a loss of $900,000. Prowse Co has no legal or constructive obligation to fund the associate's losses and has made no payments on its behalf.\n\nWhat amount of loss should Prowse Co recognise, and what is the carrying amount of the investment at 31 December 20X5?\n\nA  Loss $360,000; carrying amount $(60,000)\nB  Loss $300,000; carrying amount $nil\nC  Loss $360,000; carrying amount $nil\nD  No loss is recognised until the investment is disposed of",
    plan: [
      {
        step: "Compute the share as if there were no limit",
        detail:
          "40% × $900,000 = $360,000. That is the starting figure, and it is more than the investment is carried at — which is what the question is about.",
      },
      {
        step: "Apply the floor: the carrying amount cannot go below nil",
        detail:
          "Losses are recognised only until the investment reaches ZERO. An equity-accounted investment is not a liability, and the investor has no obligation to fund the associate, so a negative carrying amount would report an obligation that does not exist.",
      },
      {
        step: "State what happens to the excess",
        detail:
          "The unrecognised $60,000 is not lost — it is carried forward MEMORANDUM. Future profits are only recognised once the investor's share of them exceeds the share of losses not previously recognised.",
      },
      {
        step: "Note the exception and the impairment rule",
        detail:
          "Losses ARE recognised beyond nil where the investor has a legal or constructive obligation, or has made payments on the associate's behalf. Separately: the equity-accounted investment is tested for impairment as a SINGLE asset under IAS 36 — goodwill inside it is not tested separately.",
      },
    ],
    answer:
      "**B — recognise a loss of $300,000, reducing the carrying amount to nil.**\n\nProwse Co's share of the loss is 40% × $900,000 = **$360,000**, but the investment is carried at only **$300,000**.\n\nUnder the equity method, losses are recognised **only until the carrying amount reaches nil**. The investor stops there because an equity-accounted investment is an **asset**, not a liability: continuing to recognise losses would create a **negative asset** — in substance an obligation — where Prowse Co has no legal or constructive duty to fund anything.\n\nSo the loss recognised is **$300,000** and the carrying amount becomes **$nil**.\n\nThe unrecognised **$60,000** is not forgotten. It is tracked **memorandum**, and if the associate returns to profit, Prowse Co resumes recognising its share **only once that share exceeds the $60,000** of losses not previously recognised.\n\n**Two related rules complete the topic:**\n\n**The exception.** Losses **are** recognised beyond nil to the extent the investor has incurred **legal or constructive obligations**, or has **made payments on the associate's behalf** — because then a real liability exists.\n\n**Impairment.** The whole equity-accounted carrying amount is tested for impairment as a **single asset** under IAS 36. The goodwill embedded within it is **not** tested separately, because it is not separately recognised.\n\n**The exemptions from applying the equity method:** an investor need not apply it where the investment is held by a venture capital organisation or similar entity and is measured at fair value through profit or loss, or where the investor is itself an exempt intermediate parent, or where the investment is **held for sale** under IFRS 5.\n\n**Why the other options are there:** **A** takes the carrying amount negative, which is exactly the outcome the rule prevents. **C** has the right carrying amount with the wrong loss, so the two do not reconcile. **D** describes a cost-based treatment, not the equity method.",
    earns: [
      "Stopping at nil and explaining why a negative carrying amount would misreport an obligation",
      "Tracking the unrecognised excess and knowing how it affects future profits",
      "Knowing the obligation exception, and that impairment tests the investment as a single asset",
    ],
    loses: [
      "Recognising the full $360,000 and reporting a negative investment",
      "Writing the excess loss off permanently instead of carrying it forward",
      "Testing the goodwill within the investment separately for impairment",
    ],
  },
}
