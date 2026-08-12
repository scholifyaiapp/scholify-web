/*
 * FA Areas H and I — consolidated financial statements, and the interpretation of
 * financial statements.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Consolidation is the second of FA's two 15-mark multi-task questions, and the
 * plan for it is genuinely a plan: the standard workings have to be done in a
 * fixed order because each feeds the next, and a candidate who starts writing the
 * statement before the workings are complete cannot recover.
 *
 * Area I is the one place in FA where a correct number earns no marks on its own.
 * Every interpretation plan therefore ends at a CONCLUSION for a named user, not
 * at a ratio.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FA_PLANS_HI: ExamPlanMap = {
  /* ── FA-28 · The consolidated statement of financial position ── */

  "FA-28::definitions": {
    title: "Whether control exists, and what follows from it",
    format: "ot",
    marks: 2,
    requirement:
      "P owns 45% of the equity shares of S and has the right to appoint a majority of S's board. P should account for S as:\n\nA  An investment measured at fair value\nB  A subsidiary, consolidated in full\nC  An associate, using the equity method\nD  A joint venture",
    plan: [
      {
        step: "Apply the control test, not the shareholding",
        detail:
          "Control is power over the investee, exposure to variable returns, and the ability to use that power to affect them. More than 50% of shares usually gives it, but it is evidence of control rather than the test.",
      },
      {
        step: "Read the stem for control obtained another way",
        detail:
          "The right to appoint a majority of the board is control, regardless of the 45% holding. The examiner supplies the shareholding precisely so that answering on it alone gives the wrong answer.",
      },
      {
        step: "Derive the accounting treatment from control",
        detail:
          "Control means SUBSIDIARY, which means full consolidation: 100% of the subsidiary's assets and liabilities are added line by line, with a non-controlling interest recognised for the 55% not owned.",
      },
      {
        step: "Contrast with significant influence",
        detail:
          "Significant influence — presumed at 20% to 50% without control — gives an ASSOCIATE, equity accounted as a single line. The difference in presentation is dramatic, so the classification decides everything.",
      },
    ],
    answer:
      "**B — a subsidiary, consolidated in full.**\n\n**Control** is the test: power over the investee, exposure to variable returns, and the ability to use that power to affect those returns. A holding above 50% usually gives it, but it is evidence rather than the test itself — and here the right to appoint a majority of the board gives control on 45%.\n\nThe 45% is in the stem to reward anyone who reads past the shareholding to the substance.\n\nControl means **full consolidation**: 100% of S's assets and liabilities are added line by line, with a **non-controlling interest** recognised for the 55% not owned. Note that full consolidation happens regardless of the percentage owned — the NCI is what accounts for the difference.\n\n**Significant influence**, presumed at 20–50% without control, gives an **associate**, equity accounted as a single line.",
    earns: [
      "Applying control rather than the shareholding percentage",
      "Knowing full consolidation follows control whatever the percentage, with NCI for the remainder",
    ],
    loses: ["Answering associate because the holding is below 50%"],
  },

  "FA-28::goodwill-and-workings": {
    title: "Preparing a consolidated statement of financial position",
    format: "mtq",
    marks: 15,
    requirement:
      "P acquired 80% of S on 1 January 20X5 for $340,000 when S's share capital was $200,000 and its retained earnings were $120,000. At 31 December 20X5:\n\nP: share capital $500,000; retained earnings $410,000; investment in S $340,000; other net assets $570,000.\nS: share capital $200,000; retained earnings $180,000; net assets $380,000.\n\nS sold goods to P for $40,000 at a mark-up of 25% on cost; a quarter of these goods remain in P's inventory. P's receivables include $15,000 owed by S. The non-controlling interest is measured at its proportionate share of net assets.\n\nCalculate goodwill, the non-controlling interest, and consolidated retained earnings.",
    plan: [
      {
        step: "Do the standard workings in order, before writing any statement line",
        detail:
          "Group structure and the date control was obtained; net assets of S at acquisition and at the reporting date; goodwill; non-controlling interest; consolidated retained earnings. Each feeds the next, so the order is not optional.",
      },
      {
        step: "Build the net assets table for S at both dates",
        detail:
          "At acquisition: 200,000 + 120,000 = 320,000. At reporting date: 200,000 + 180,000 = 380,000. The DIFFERENCE, 60,000, is the post-acquisition movement — and only that part belongs to the group.",
      },
      {
        step: "Compute the unrealised profit before touching retained earnings",
        detail:
          "Goods still in inventory: 40,000 × 1/4 = 10,000 at transfer price. Mark-up 25% on cost, so profit = 10,000 × 25/125 = 2,000. S made the sale, so the adjustment reduces S's post-acquisition profit — which is why it must be computed first.",
      },
      {
        step: "Compute goodwill using net assets at ACQUISITION",
        detail:
          "Consideration less the group's share of net assets at acquisition. Using the reporting-date figure is the single most costly error in the question, because it corrupts goodwill and NCI together.",
      },
      {
        step: "Split the adjusted post-acquisition profit between group and NCI",
        detail:
          "Post-acquisition retained earnings of S, less the unrealised profit, split 80/20. The group's share goes to consolidated retained earnings; the NCI's share is in the NCI figure.",
      },
      {
        step: "Cancel the intra-group balance and state that it does not affect profit",
        detail:
          "The $15,000 receivable and payable cancel against each other. It changes receivables and payables and has no effect on goodwill, NCI or retained earnings — worth saying, because candidates often adjust profit for it.",
      },
    ],
    answer:
      "**Working 1 — S's net assets**\nAt acquisition: 200,000 + 120,000 = **320,000**\nAt reporting date: 200,000 + 180,000 = **380,000**\nPost-acquisition movement = **60,000**\n\n**Working 2 — unrealised profit on inventory**\nGoods remaining: 40,000 × 1/4 = 10,000 at transfer price\nMark-up 25% on cost → profit = 10,000 × 25/125 = **2,000**\nS made the sale, so S's post-acquisition profit is reduced to 60,000 − 2,000 = **58,000**\n\n**Working 3 — goodwill**\nConsideration 340,000\nLess group share of net assets at acquisition (80% × 320,000) (256,000)\n**Goodwill = 84,000**\n\n**Working 4 — non-controlling interest**\n20% × net assets at reporting date, adjusted: 20% × (380,000 − 2,000) = **75,600**\n\n**Working 5 — consolidated retained earnings**\nP's retained earnings 410,000\nAdd group share of S's adjusted post-acquisition profit (80% × 58,000) 46,400\n**Consolidated retained earnings = 456,400**\n\n**The intra-group balance:** the $15,000 receivable in P cancels against the payable in S. It reduces consolidated receivables and payables by $15,000 each and has **no effect** on goodwill, NCI or retained earnings.",
    earns: [
      "Using net assets at ACQUISITION for goodwill and at the reporting date for NCI",
      "Computing the unrealised profit with the mark-up fraction 25/125, not 25/100",
      "Charging the unrealised profit against the company that MADE the sale, which determines whether NCI shares it",
      "Stating explicitly that the intra-group balance does not affect profit",
    ],
    loses: [
      "Computing goodwill from net assets at the reporting date, which corrupts goodwill and NCI together",
      "Using 25/100 for a mark-up, which overstates the unrealised profit",
      "Including P's investment in S as an asset — it is cancelled against S's equity in the goodwill working",
      "Adding all of S's retained earnings rather than only the post-acquisition share",
    ],
  },

  /* ── FA-29 · Consolidated profit or loss, and associates ─────── */

  "FA-29::consolidating-performance": {
    title: "Consolidating revenue and eliminating an intra-group sale",
    format: "ot",
    marks: 2,
    requirement:
      "P owns 75% of S. In the year P's revenue was $900,000 and S's was $400,000, of which $60,000 were sales to P. Consolidated revenue is:\n\nA  $1,300,000\nB  $1,240,000\nC  $1,200,000\nD  $1,255,000",
    plan: [
      {
        step: "Add 100% of both revenues, regardless of the shareholding",
        detail:
          "$900,000 + $400,000 = $1,300,000. The 75% never scales revenue — full consolidation adds everything the group controls, and the NCI accounts for the ownership split lower down.",
      },
      {
        step: "Eliminate the intra-group sale in full",
        detail:
          "$60,000 of S's revenue was a sale to P, which is not revenue for the GROUP — nothing has been sold outside it. Deduct $60,000.",
      },
      {
        step: "Compute the result",
        detail:
          "$1,300,000 − $60,000 = **$1,240,000**.",
      },
      {
        step: "Confirm the elimination is at 100%, not at the group share",
        detail:
          "The whole $60,000 is removed, not 75% of it. Consolidated revenue must show only sales to parties outside the group, and the elimination is not scaled by ownership.",
      },
    ],
    answer:
      "**B — $1,240,000.**\n\n$900,000 + $400,000 = $1,300,000, less the $60,000 intra-group sale = **$1,240,000**.\n\nTwo principles do all the work. **Add 100%** of both companies' revenue — the 75% never scales it, because full consolidation reflects control and the NCI accounts for ownership further down. And **eliminate the intra-group sale in full**, not at the group's share, because consolidated revenue must show only sales to parties outside the group.\n\nOption A, $1,300,000, omits the elimination. Option D scales it by 75%.\n\nThe matching cost of sales is eliminated by the same $60,000, so gross profit is unaffected by the elimination itself — the only profit effect comes from the **unrealised profit** on any of those goods still held in inventory at the year end.",
    earns: [
      "Adding 100% of both revenues and eliminating the intra-group sale in full",
      "Knowing the elimination hits revenue and cost of sales equally, so only unrealised profit affects the result",
    ],
    loses: ["Scaling either the consolidation or the elimination by the ownership percentage"],
  },

  "FA-29::associates": {
    title: "Equity accounting for an associate",
    format: "ot",
    marks: 2,
    requirement:
      "P owns 30% of A, an associate, acquired for $200,000. Since acquisition A has made total profits of $80,000 and paid no dividends. The carrying amount of the investment in A is:\n\nA  $200,000\nB  $224,000\nC  $280,000\nD  $224,000 plus 30% of A's assets consolidated line by line",
    plan: [
      {
        step: "Establish the accounting method from the classification",
        detail:
          "An associate is EQUITY accounted, appearing as a single line in non-current assets. Its assets and liabilities are never added line by line — that is consolidation, which applies to subsidiaries.",
      },
      {
        step: "Recall the equity method formula",
        detail:
          "Cost, plus the group's share of the associate's post-acquisition retained profits, less any impairment. One line, one figure.",
      },
      {
        step: "Apply it",
        detail:
          "$200,000 + (30% × $80,000) = $200,000 + $24,000 = **$224,000**. No dividends were paid, so nothing reduces it.",
      },
      {
        step: "Reject the option that mixes the two methods",
        detail:
          "Option D adds line-by-line consolidation to the equity method. That is the misconception the question exists to catch — an associate is not consolidated at all, at any percentage.",
      },
    ],
    answer:
      "**B — $224,000.**\n\nEquity method: cost + the group's share of post-acquisition retained profits − any impairment.\n\n$200,000 + (30% × $80,000) = **$224,000**\n\nNo dividends were paid; a dividend received from the associate would **reduce** the carrying amount, because it is a return of the profits already recognised rather than income.\n\nOption D is the misconception the question exists to catch: an associate's assets and liabilities are **never** added line by line. It appears as a **single line** in non-current assets, and in profit or loss as one line — the group's share of the associate's profit — below operating profit.\n\nThat single-line presentation is the practical difference from a subsidiary: consolidating an associate would show the group controlling assets it does not control.",
    earns: [
      "Applying the equity method as cost plus share of post-acquisition profits",
      "Knowing a dividend received reduces the carrying amount",
    ],
    loses: ["Consolidating an associate's assets, which the group does not control"],
  },

  /* ── FA-30 · Ratios ──────────────────────────────────────────── */

  "FA-30::profitability": {
    title: "Computing return on capital employed and reading it",
    format: "ot",
    marks: 2,
    requirement:
      "Operating profit is $180,000, equity is $700,000 and long-term borrowings are $500,000. Return on capital employed is:\n\nA  15.0%\nB  25.7%\nC  36.0%\nD  12.0%",
    plan: [
      {
        step: "Build the denominator before the numerator",
        detail:
          "Capital employed = equity + long-term borrowings = $700,000 + $500,000 = **$1,200,000**. Omitting debt is the standard error and is what most of the option list is built on.",
      },
      {
        step: "Match the numerator to the denominator",
        detail:
          "Capital employed is funded by both equity and debt, so the return must be the profit available to BOTH — operating profit, before interest and tax. Using profit after interest would mismatch the two.",
      },
      {
        step: "Compute",
        detail:
          "$180,000 ÷ $1,200,000 = **15.0%**.",
      },
      {
        step: "Identify the mismatched answers",
        detail:
          "25.7% is $180,000 ÷ $700,000, using equity alone against operating profit. That is a return on equity computed with the wrong numerator — the classic mismatch.",
      },
    ],
    answer:
      "**A — 15.0%.**\n\nCapital employed = equity $700,000 + long-term borrowings $500,000 = **$1,200,000**.\nROCE = operating profit $180,000 ÷ $1,200,000 = **15.0%**.\n\nThe numerator and denominator must **match**. Capital employed is funded by both shareholders and lenders, so the return has to be the profit available to both — operating profit, before interest and tax. Option B, 25.7%, uses operating profit against equity alone, which is the classic mismatch.\n\nInterpretation is the other half of any ROCE question. It measures how efficiently the entity uses ALL its long-term finance, so it is the primary measure of management's performance and is comparable across entities with different capital structures — which is precisely why it is stated before interest.\n\nIt also disaggregates usefully: **ROCE = operating margin × asset turnover**, so a falling ROCE can be traced to margin or to utilisation.",
    earns: [
      "Matching operating profit to capital employed including debt",
      "Being able to disaggregate ROCE into margin × asset turnover",
    ],
    loses: ["Omitting borrowings from capital employed, or using post-interest profit"],
  },

  "FA-30::liquidity-efficiency": {
    title: "Reading a current ratio in context",
    format: "ot",
    marks: 2,
    requirement:
      "A company's current ratio has risen from 1.4 to 2.6, while its inventory holding period has risen from 40 to 95 days. The most likely explanation is that:\n\nA  Liquidity has improved and the company is now well managed\nB  Inventory is building up, possibly unsaleable, which inflates the ratio without improving liquidity\nC  Receivables are being collected more quickly\nD  Payables have been paid earlier than before",
    plan: [
      {
        step: "Read the two ratios together, not separately",
        detail:
          "The current ratio rose and the inventory period more than doubled. Inventory is IN the current ratio, so the second movement is a candidate explanation for the first.",
      },
      {
        step: "Ask whether the improvement is real",
        detail:
          "A higher current ratio driven by inventory is not improved liquidity, because slow-moving inventory cannot pay a creditor. The ratio looks better while the position is worse.",
      },
      {
        step: "Reject the surface reading",
        detail:
          "Option A reads the current ratio alone and concludes improvement. That is exactly the error the pairing of ratios is designed to expose.",
      },
      {
        step: "Name the better test",
        detail:
          "The QUICK ratio excludes inventory, so it would show whether liquidity genuinely improved. Naming it is what turns the observation into an answer.",
      },
    ],
    answer:
      "**B — inventory is building up, possibly unsaleable, which inflates the ratio without improving liquidity.**\n\nThe two ratios must be read together. Inventory is a component of the current ratio, so an inventory holding period that has more than doubled — 40 days to 95 — explains the rise in the ratio without any improvement in the ability to pay debts. Slow-moving inventory cannot settle a creditor.\n\nOption A is the trap: reading the current ratio alone and concluding that liquidity improved.\n\nThe better test is the **quick ratio**, which excludes inventory and would reveal whether liquidity genuinely improved. Naming it is what turns the observation into a conclusion.\n\nAnd there is a second reading worth having: rising inventory with a rising ratio may indicate **obsolete** inventory carried above net realisable value, in which case the inventory figure itself is overstated and so is profit.",
    earns: [
      "Reading the two ratios together and asking whether the improvement is real",
      "Naming the quick ratio as the test that would settle it",
    ],
    loses: ["Concluding that a higher current ratio means better liquidity"],
  },

  "FA-30::position": {
    title: "Computing gearing and interest cover, and what each tells you",
    format: "ot",
    marks: 2,
    requirement:
      "Operating profit is $150,000 and finance costs are $50,000. Interest cover is:\n\nA  3.0 times\nB  2.0 times\nC  0.33 times\nD  33%",
    plan: [
      {
        step: "Write the formula, with operating profit on top",
        detail:
          "Interest cover = operating profit ÷ finance costs. Profit BEFORE interest, because the question is how many times the profit available covers the charge.",
      },
      {
        step: "Compute",
        detail:
          "$150,000 ÷ $50,000 = **3.0 times**.",
      },
      {
        step: "Check the units and the inversion",
        detail:
          "The answer is a number of TIMES, not a percentage — which strikes option D. Option C is the fraction inverted, and 0.33 times would mean interest exceeded profit threefold.",
      },
      {
        step: "Say what the figure means for a lender",
        detail:
          "3 times means profit could fall by two-thirds before interest could not be paid. Cover below about 2 is generally regarded as risky, and below 1 means the entity cannot pay its interest out of profits.",
      },
    ],
    answer:
      "**A — 3.0 times.**\n\nInterest cover = operating profit ÷ finance costs = $150,000 ÷ $50,000 = **3.0 times**.\n\nUse profit **before** interest, because the question is how many times the profit available covers the charge. The answer is a number of times, not a percentage — which strikes option D — and option C is the fraction inverted.\n\nWhat it means is what a lender actually reads: cover of 3 means profit could fall by two-thirds before interest became unpayable. Below about 2 is generally regarded as risky and below 1 means interest cannot be paid out of profits at all.\n\nIt pairs with **gearing** — debt ÷ (debt + equity), or debt ÷ equity — and the two answer different questions. Gearing measures the **structure** of the finance; interest cover measures the **ability to service** it. A highly geared company with strong, stable cash flows may be far safer than a modestly geared one with volatile profits, which is why neither ratio is read alone.",
    earns: [
      "Using pre-interest profit and reporting the answer in times",
      "Distinguishing what gearing measures from what interest cover measures",
    ],
    loses: ["Inverting the ratio, or expressing cover as a percentage"],
  },

  "FA-30::how-ratios-interrelate": {
    title: "Tracing a change in one ratio to its cause in another",
    format: "ot",
    marks: 2,
    requirement:
      "A company's ROCE has fallen while its operating margin is unchanged. The most likely cause is:\n\nA  Finance costs have risen\nB  Asset turnover has fallen\nC  The tax rate has increased\nD  Gross margin has fallen",
    plan: [
      {
        step: "Disaggregate the ratio that changed",
        detail:
          "ROCE = operating margin × asset turnover. If ROCE fell and margin is unchanged, the other factor must have fallen. The identity supplies the answer directly.",
      },
      {
        step: "Confirm what a falling asset turnover means",
        detail:
          "Revenue ÷ capital employed has fallen: the company is generating less revenue per dollar of capital. Usually more capital employed without matching revenue, such as a new facility not yet productive.",
      },
      {
        step: "Reject the two below-the-line items",
        detail:
          "Finance costs and tax both fall BELOW operating profit, so neither affects ROCE, which is computed before interest and tax. This is why ROCE is defined that way.",
      },
      {
        step: "Reject the option that contradicts the stem",
        detail:
          "A falling gross margin would normally reduce the operating margin, which the stem says is unchanged. It contradicts a given fact rather than explaining one.",
      },
    ],
    answer:
      "**B — asset turnover has fallen.**\n\n**ROCE = operating margin × asset turnover.** If ROCE fell and margin is unchanged, the other factor must have fallen — the identity gives the answer without any judgement.\n\nA falling asset turnover means less revenue is being generated per dollar of capital employed, most often because capital employed has risen without matching revenue: a new facility not yet productive, an acquisition not yet integrated, or assets revalued upward.\n\nFinance costs and tax both sit **below** operating profit, so neither touches ROCE — which is precisely why ROCE is defined before interest and tax, so that it measures operating performance independently of how the business is financed.\n\nA falling gross margin would normally reduce the operating margin, contradicting a fact the stem gives.\n\nThis disaggregation is the most useful single technique in Area I: it turns \"ROCE fell\" into a specific question about which half moved.",
    earns: [
      "Using the ROCE identity to locate the cause rather than reasoning about the business",
      "Knowing why ROCE is defined before interest and tax",
    ],
    loses: ["Choosing a below-the-line item, which cannot affect a pre-interest ratio"],
  },

  /* ── FA-31 · Analysing statements and drawing conclusions ─────── */

  "FA-31::interpreting": {
    title: "Getting from a number to a conclusion",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following is a **conclusion** rather than an observation?\n\nA  The receivables collection period has risen from 45 to 71 days\nB  Credit control has weakened, and the company faces increased risk of irrecoverable debts and a cash shortfall\nC  Revenue increased by 12% during the year\nD  The current ratio is 1.8",
    plan: [
      {
        step: "Split observation from conclusion",
        detail:
          "An OBSERVATION states what the figures show. A CONCLUSION says what it means for the entity and for the user. The marks in an interpretation question are almost entirely in the second.",
      },
      {
        step: "Test each option for the word \"so\"",
        detail:
          "Ask whether the statement could be followed by \"so what?\". A, C and D all invite it. B has already answered it, which is what makes it a conclusion.",
      },
      {
        step: "Notice the structure a conclusion has",
        detail:
          "B names the cause (credit control weakened) and the consequence (irrecoverable debt risk, cash shortfall). Cause and consequence together is what a conclusion looks like.",
      },
      {
        step: "Remember the observation is still required",
        detail:
          "The conclusion has to rest on the figure, so quote it. An unsupported assertion earns no more than an uninterpreted number — the two halves are needed together.",
      },
    ],
    answer:
      "**B — credit control has weakened, and the company faces increased risk of irrecoverable debts and a cash shortfall.**\n\nAn **observation** states what the figures show; a **conclusion** states what it means. Almost all the marks in an interpretation question are in the second, and a candidate who computes eight ratios and describes each movement will score poorly.\n\nThe test is whether \"so what?\" can still be asked. A, C and D all invite it; B has answered it.\n\nNotice its structure: a **cause** (credit control has weakened) and a **consequence** (irrecoverable debt risk, cash shortfall). Cause and consequence together is what a conclusion is.\n\nThe observation is still needed, because the conclusion must rest on evidence. The full form is: quote the figure, say what caused it, say what it means, and say what should be done about it.",
    earns: [
      "Structuring an answer as figure → cause → consequence → action",
      "Testing each statement with \"so what?\"",
    ],
    loses: ["Describing ratio movements without ever saying what they mean"],
  },

  "FA-31::limitations": {
    title: "Why stating the limitations earns marks",
    format: "ot",
    marks: 2,
    requirement:
      "A company's ROCE is 18% against an industry average of 11%. Which limitation most seriously qualifies the conclusion that it is performing better?\n\nA  Ratios are only estimates\nB  The industry average may include entities with different activities, accounting policies and asset ages\nC  The financial statements are historical\nD  ROCE is difficult to calculate",
    plan: [
      {
        step: "Identify what the comparison depends on",
        detail:
          "Comparing against an industry average assumes the entities are genuinely comparable. If they are not, the comparison is between different things and the difference means nothing.",
      },
      {
        step: "Name what breaks comparability specifically",
        detail:
          "Different activities within the same broad sector, different accounting policies, different asset ages, and different capital structures. Each moves ROCE without any difference in performance.",
      },
      {
        step: "Give the concrete example that makes the point",
        detail:
          "An entity with old, heavily depreciated assets has a small capital employed and therefore a high ROCE — not because it performs better, but because its denominator has been written down.",
      },
      {
        step: "Reject the vague and the false",
        detail:
          "A and C are true of all ratio analysis and are too general to qualify THIS conclusion. D is false — ROCE is straightforward to compute, and difficulty of computation is not a limitation of interpretation.",
      },
    ],
    answer:
      "**B — the industry average may include entities with different activities, accounting policies and asset ages.**\n\nThe comparison depends entirely on comparability. If the average is drawn from entities doing different things, using different policies, with assets of different ages, the 18% and the 11% are measuring different situations.\n\nThe concrete example is what earns the mark: an entity with **old, heavily depreciated assets** has a small capital employed and therefore a high ROCE — not because it performs better but because its denominator has been written down. Revaluing property has the opposite effect.\n\nA and C are true of all ratio analysis and too general to qualify this particular conclusion. D is false — ROCE is easy to compute.\n\nThe limitations that earn marks are always **specific**: comparability of the entities, differences in accounting policy, the historical basis, the omission of non-financial factors, one-off items distorting a year, and seasonality in a year-end snapshot.",
    earns: [
      "Naming a specific comparability failure with a concrete mechanism",
      "Avoiding limitations so general they apply to every ratio ever computed",
    ],
    loses: ["Writing \"ratios have limitations\" without saying which one bites here"],
  },

  "FA-31::answering-for-a-user": {
    title: "Answering for the user the question names",
    format: "ot",
    marks: 2,
    requirement:
      "A question asks you to advise a **potential supplier** considering granting 60 days' credit. Which analysis is most relevant?\n\nA  Return on capital employed and gross margin over five years\nB  The quick ratio, payables payment period and cash generated from operations\nC  Earnings per share and dividend cover\nD  Gearing and the revaluation surplus",
    plan: [
      {
        step: "Establish what the user stands to lose",
        detail:
          "A supplier granting credit is exposed to non-payment of a short-term amount. So the question is short-term: can this company pay us in 60 days?",
      },
      {
        step: "Select the ratios that answer that question",
        detail:
          "The quick ratio for immediate liquidity, the payables payment period for how this company actually treats its suppliers, and cash generated from operations for whether cash is genuinely being produced.",
      },
      {
        step: "Reject the ratios belonging to other users",
        detail:
          "ROCE and gross margin are management performance measures. EPS and dividend cover are shareholder measures. Gearing is primarily a long-term lender's concern.",
      },
      {
        step: "Note the strongest single indicator",
        detail:
          "The payables payment period is the most directly relevant of all: if the company already takes 90 days to pay its existing suppliers, it will take 90 days to pay this one.",
      },
    ],
    answer:
      "**B — the quick ratio, payables payment period and cash generated from operations.**\n\nA supplier granting credit is exposed to non-payment of a **short-term** amount, so the analysis must be short-term. The quick ratio measures immediate liquidity excluding inventory. Cash generated from operations shows whether cash is genuinely being produced. And the **payables payment period** is the single most relevant figure of all: if the company already takes 90 days to pay its existing suppliers, it will take 90 days to pay this one.\n\nThe other options belong to other users. **ROCE and margins** measure management performance. **EPS and dividend cover** are shareholder measures. **Gearing** is primarily a long-term lender's concern.\n\nThe general discipline is that the question always names a user, and every ratio chosen should be justifiable by reference to what that user stands to gain or lose. A generic analysis of every ratio in the paper scores badly however accurate each figure is.",
    earns: [
      "Selecting ratios from what the named user stands to lose",
      "Identifying the payables payment period as the most direct evidence",
    ],
    loses: ["Producing a generic ratio analysis that ignores the user the question names"],
  },
}
