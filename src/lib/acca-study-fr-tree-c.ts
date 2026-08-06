import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FR · Area C — chapters 30 and 31: computing ratios, and writing the interpretation.
 *
 * These are deliberately two chapters, because they are two different skills and candidates
 * are good at the first and poor at the second. Computing a ratio is arithmetic. Writing an
 * interpretation is an argument: the movement, the CAUSE, and the consequence for a named
 * user. A Section C interpretation requirement typically carries more marks for the second
 * than the first, and most answers are a list of ratios with a sentence of description
 * attached to each.
 *
 * Chapter 31 is therefore built round the STRUCTURE of an interpretation answer rather than
 * round more ratios, and its worked example is a piece of writing rather than a calculation.
 *
 * All figures verified by script before authoring. ORIGINAL Scholify teaching text.
 */

export const FR_TREE_30: StudyChapter = {
  id: "FR-30",
  number: 30,
  paper: "FR",
  area: "C",
  title: "Ratio analysis: the calculations and what each one measures",
  minutes: 19,
  syllabusRefs: ["C2(a)", "C2(b)", "C2(c)"],
  intro:
    "There is no formula sheet in FR. Every definition below has to be in your head, and so does what each one is actually telling you.",
  outcomes: [
    "Calculate profitability, liquidity, efficiency, gearing and investor ratios",
    "Explain the relationship between ROCE, margin and asset turnover",
    "Calculate a working capital cycle and interpret its movement",
    "Explain how an accounting policy choice changes a ratio without changing performance",
    "Select the ratios relevant to a particular user's decision",
  ],
  sections: [
    {
      id: "profitability",
      heading: "Profitability, and the ROCE identity",
      blocks: [
        {
          kind: "formula",
          name: "Profitability ratios",
          expr: "GROSS PROFIT MARGIN      =  gross profit / revenue × 100\n   the trading margin, before any overhead\n\nOPERATING PROFIT MARGIN  =  operating profit / revenue × 100\n   also called net margin; after overheads, before interest and tax\n\nROCE                     =  operating profit / capital employed × 100\n   CAPITAL EMPLOYED  =  equity + long-term debt\n                     =  total assets − current liabilities\n   the primary measure of management's efficiency in using the\n   finance entrusted to it\n\nASSET TURNOVER           =  revenue / capital employed\n   how much revenue each dollar of capital generates, in TIMES\n\nRETURN ON EQUITY (ROE)   =  profit after tax / equity × 100\n   the shareholders' return, AFTER interest and tax — so it is\n   affected by gearing in a way ROCE is not",
          note: "Where a question gives an opening and a closing figure, either the closing balance or the average may be used — but say which, and use the same basis for both years. Consistency matters more than the choice.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The ROCE identity: the most useful thing in Area C",
          md: "**ROCE = operating profit margin × asset turnover**\n\nBecause (operating profit / revenue) × (revenue / capital employed) = operating profit / capital employed. The revenue cancels.\n\nWhy it matters: whenever ROCE moves, the identity tells you **WHICH of the two caused it**, and that is the difference between describing a change and explaining it.\n\n· Margin fell, turnover held → a **profitability** problem: prices, costs or mix.\n· Margin held, turnover fell → an **asset utilisation** problem: new capacity not yet earning, or an asset base inflated by revaluation.\n· Both fell → serious.\n· Margin fell and turnover rose → a deliberate strategy of lower prices for higher volume, which may increase ROCE overall.\n\nAn interpretation answer that decomposes ROCE this way earns marks that a list of ratios does not.",
        },
        {
          kind: "example",
          title: "Computing the full set",
          scenario:
            "Fieldfare Co's summarised financial statements for the year ended 31 December 20X6:\n\n  Revenue                                  $12,000,000\n  Gross profit                              $4,200,000\n  Operating profit                          $1,560,000\n  Finance costs                               $240,000\n  Profit before tax                         $1,320,000\n  Income tax                                  $330,000\n  Profit for the year                         $990,000\n\n  Non-current assets                        $8,400,000\n  Inventory                                 $1,500,000\n  Trade receivables                         $1,800,000\n  Cash                                        $300,000\n  Current liabilities (incl. payables $1,900,000)  $2,400,000\n  Equity                                    $6,000,000\n  Long-term loans                           $3,600,000\n\nThere are 4,000,000 equity shares in issue.",
          steps: [
            { label: "Profitability", detail: "Gross margin $4,200,000 / $12,000,000 = 35.0%.\nOperating margin $1,560,000 / $12,000,000 = 13.0%.\nCapital employed = $6,000,000 + $3,600,000 = $9,600,000 (check: total assets $12,000,000 − current liabilities $2,400,000 = $9,600,000).\nROCE $1,560,000 / $9,600,000 = 16.25%.\nAsset turnover $12,000,000 / $9,600,000 = 1.25 times.\nCheck the identity: 13.0% × 1.25 = 16.25%.\nROE $990,000 / $6,000,000 = 16.5%." },
            { label: "Liquidity", detail: "Current assets = $1,500,000 + $1,800,000 + $300,000 = $3,600,000.\nCurrent ratio $3,600,000 / $2,400,000 = 1.5:1.\nQuick (acid test) ratio ($3,600,000 − $1,500,000) / $2,400,000 = 0.875:1 — inventory excluded because it is the least liquid current asset and must first be sold, then collected." },
            { label: "Efficiency", detail: "Cost of sales = $12,000,000 − $4,200,000 = $7,800,000.\nInventory days $1,500,000 / $7,800,000 × 365 = 70.2 days.\nReceivables days $1,800,000 / $12,000,000 × 365 = 54.8 days.\nPayables days $1,900,000 / $7,800,000 × 365 = 88.9 days.\nNote the denominators: inventory and payables against COST OF SALES, receivables against REVENUE. Using revenue for inventory days is the commonest error and inflates the figure." },
            { label: "The working capital cycle", detail: "70.2 + 54.8 − 88.9 = 36.1 days. This is the period between paying for goods and collecting the cash from selling them, and it is what the entity has to finance." },
            { label: "Gearing and cover", detail: "Gearing (debt / equity) $3,600,000 / $6,000,000 = 60%.\nGearing (debt / (debt + equity)) $3,600,000 / $9,600,000 = 37.5%.\nBoth are used, and they say the same thing on different scales — so state which definition you have applied, because 60% and 37.5% describe the same entity.\nInterest cover $1,560,000 / $240,000 = 6.5 times." },
            { label: "Investor ratios", detail: "EPS = $990,000 / 4,000,000 = 24.75 cents. With a share price, the P/E ratio would be price ÷ EPS, and dividend yield would be dividend per share ÷ price." },
          ],
          result:
            "**ROCE 16.25%, decomposing into a 13% margin and 1.25 times asset turnover; current ratio 1.5:1; a 36-day working capital cycle; gearing 60% with interest cover of 6.5 times.** The identity check is worth doing every time — if margin × turnover does not equal ROCE, one of the three is wrong.",
        },
      ],
      check: {
        q: "An entity's ROCE falls from 20% to 15%. Its operating margin is unchanged at 12%. What has happened?",
        options: [
          "Asset turnover has fallen, from 1.67 to 1.25 times",
          "Asset turnover has risen",
          "Finance costs have increased",
          "The tax rate has increased",
        ],
        correct: 0,
        explain:
          "ROCE = margin × asset turnover, so with margin constant at 12% the turnover must have fallen from 20/12 = 1.67 to 15/12 = 1.25 times. Finance costs and tax affect neither ROCE nor operating margin, both of which are computed before them.",
      },
    },
    {
      id: "what-distorts-them",
      heading: "How accounting choices move ratios without changing performance",
      blocks: [
        {
          kind: "text",
          md: "This is the material that separates a good interpretation answer from an average one. Two entities with identical operations can report very different ratios, purely because of policy choices and one-off transactions. Naming the distortion is usually worth as much as computing the ratio.",
        },
        {
          kind: "table",
          caption: "The distortions that appear most often in FR questions",
          head: ["The choice or event", "What it does to the ratios", "Why"],
          rows: [
            ["**Revaluing PPE upwards**", "ROCE and asset turnover FALL; gearing (debt/equity) FALLS", "Capital employed and equity rise, and the higher depreciation reduces operating profit too. Nothing about the business has improved"],
            ["**A finance lease under IFRS 16**", "Gearing RISES; interest cover falls; EBITDA rises", "The right-of-use asset and lease liability are both recognised, and the charge splits into depreciation and interest"],
            ["**Presenting a capital grant as deferred income rather than netting it**", "Gearing RISES; ROCE falls", "The grant becomes a liability and the asset is carried gross. Profit is identical either way"],
            ["**Principal rather than agent presentation**", "Revenue and asset turnover rise sharply; MARGIN COLLAPSES", "Gross revenue with a matching cost of sales. Profit is unchanged"],
            ["**A revaluation model against a cost model**", "The revaluing entity looks LESS profitable and LESS geared", "The whole comparison between two such entities is unsafe without adjustment"],
            ["**Classifying preference shares as equity rather than debt**", "Gearing falls; interest cover is not calculated at all", "Depends entirely on whether the shares are redeemable"],
            ["**An acquisition part way through the year**", "Growth in revenue and profit is overstated; asset turnover falls", "Nine months of income against twelve months of assets on the balance sheet"],
            ["**A one-off disposal gain in operating profit**", "Margin and ROCE rise, unsustainably", "It is not trading performance. Strip it out before comparing"],
            ["**Window dressing at the year end**", "Current and quick ratios improve", "Settling payables early or delaying purchases affects only the one date users can see"],
          ],
        },
        {
          kind: "activity",
          title: "Adjust before comparing",
          prompt:
            "Two retailers are being compared. Entity A carries its properties at cost; Entity B revalued its properties last year, adding $8m to carrying amount. Both report operating profit of $3m on revenue of $30m, and A's capital employed is $15m against B's $23m.\n\nWhat do the ratios show, and what should you say about the comparison?",
          answer:
            "AS REPORTED: A's ROCE is $3m/$15m = 20%; B's is $3m/$23m = 13.0%. A appears far more efficient. Asset turnover is 2.0 times for A and 1.3 for B.\n\nBUT the entire difference could be the revaluation. Removing the $8m uplift from B's capital employed gives $15m and a ROCE of 20% — identical to A. B's depreciation is also higher on the revalued properties, so B's operating profit is understated relative to A's on a like-for-like basis, meaning B's adjusted ROCE may actually EXCEED A's.\n\nWhat to write: state the reported figures, identify the revaluation as the likely cause of the difference, quantify the adjustment, and conclude that on a comparable basis the two are at least equivalent. Then note the residual point that B's balance sheet is the more useful one for a lender assessing security, even though it produces the worse ROCE.\n\nThe general habit: before attributing a difference to performance, ask whether an accounting choice explains it.",
        },
      ],
    },
    {
      id: "choosing-ratios",
      heading: "Choosing the ratios for the user",
      blocks: [
        {
          kind: "table",
          caption: "Which ratios matter to whom",
          head: ["User", "Primary concern", "Ratios"],
          rows: [
            ["**A prospective shareholder**", "Return and growth", "ROCE, ROE, margins, EPS, P/E, dividend yield and cover, revenue growth"],
            ["**A bank considering a term loan**", "Can it service and repay?", "Gearing, interest cover, operating cash flow, asset security, current ratio"],
            ["**A supplier considering credit**", "Will we be paid, and when?", "Current and quick ratios, payables days, operating cash flow"],
            ["**An employee or union**", "Stability and capacity to pay", "Profit trend, margins, gearing, cash flow"],
            ["**A potential acquirer**", "Sustainable earnings and hidden liabilities", "Margins excluding one-offs, ROCE, working capital cycle, contingent liabilities, commitments"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The requirement always names a user — answer for THAT user",
          md: "A Section C interpretation requirement is almost never \"analyse the performance\". It is \"advise the board of a company considering acquiring a 100% interest\", or \"report to a bank considering a five-year loan\".\n\nThe user determines which ratios matter and, more importantly, what your **CONCLUSION** should address. A bank does not care that EPS rose; it cares that interest cover fell from 12 to 6.5 times. A prospective shareholder cares about both.\n\nCandidates who compute fifteen ratios and comment on all of them score worse than candidates who compute eight and connect each to the named user's decision.",
        },
      ],
      check: {
        q: "Inventory days is calculated as inventory divided by which figure, times 365?",
        options: ["Cost of sales", "Revenue", "Gross profit", "Purchases for the year"],
        correct: 0,
        explain:
          "Inventory is carried at cost, so it must be compared with cost of sales to give a meaningful number of days. Using revenue mixes a cost-based numerator with a selling-price denominator and understates the days. Receivables days, by contrast, uses revenue, because receivables are recorded at selling price.",
      },
    },
  ],
  examTraps: [
    { trap: "Using revenue as the denominator for inventory or payables days.", fix: "Both use COST OF SALES. Only receivables days uses revenue." },
    { trap: "Quoting a gearing figure without saying which definition was used.", fix: "Debt/equity and debt/(debt+equity) give very different numbers for the same entity. State the basis." },
    { trap: "Including finance costs in the numerator of ROCE.", fix: "ROCE uses OPERATING profit, before interest, because capital employed includes the debt that the interest is paid on." },
    { trap: "Using different bases for the two years being compared.", fix: "Closing balances or averages — pick one and use it consistently." },
    { trap: "Attributing a fall in ROCE to poor trading without decomposing it.", fix: "ROCE = margin × asset turnover. Say which one moved." },
    { trap: "Comparing a revaluing entity with one on the cost model without adjusting.", fix: "Identify the distortion and quantify it. Revaluation depresses ROCE, asset turnover and gearing." },
    { trap: "Leaving a one-off disposal gain inside operating profit when assessing the trend.", fix: "Strip it out — it is not sustainable trading performance." },
    { trap: "Computing every ratio you know regardless of the user named in the requirement.", fix: "Select for the user's decision, and conclude on it." },
  ],
  keyTerms: [
    { term: "Capital employed", def: "Equity plus long-term debt; equivalently total assets less current liabilities." },
    { term: "ROCE", def: "Operating profit as a percentage of capital employed — the primary measure of the efficiency with which management uses the finance entrusted to it." },
    { term: "Asset turnover", def: "Revenue divided by capital employed, expressed in times; the volume of revenue generated per dollar of capital." },
    { term: "Quick (acid test) ratio", def: "Current assets excluding inventory, divided by current liabilities." },
    { term: "Working capital cycle", def: "Inventory days plus receivables days less payables days — the period the entity must finance between paying suppliers and collecting from customers." },
    { term: "Interest cover", def: "Operating profit divided by finance costs, in times; a measure of the headroom available to service debt." },
    { term: "Gearing", def: "The proportion of long-term finance provided by debt, measured either as debt/equity or as debt/(debt + equity)." },
  ],
  summary: [
    "There is no formula sheet in FR: every definition must be memorised.",
    "ROCE = operating profit / capital employed, and capital employed = equity + long-term debt = total assets − current liabilities.",
    "ROCE = operating margin × asset turnover. Decomposing it turns a description into an explanation.",
    "Inventory and payables days use COST OF SALES; receivables days uses REVENUE.",
    "Working capital cycle = inventory days + receivables days − payables days.",
    "State which gearing definition you are using, since the two give very different numbers.",
    "Accounting choices — revaluation, IFRS 16, grant presentation, principal against agent, preference share classification — move ratios without changing performance. Name the distortion.",
    "Select ratios for the USER named in the requirement, and conclude on their decision.",
  ],
  knowledgeDiagnostic: [
    { q: "Give two equivalent definitions of capital employed.", a: "Equity plus long-term debt; and total assets less current liabilities." },
    { q: "State the ROCE identity.", a: "ROCE = operating profit margin × asset turnover." },
    { q: "Which denominator does inventory days use?", a: "Cost of sales." },
    { q: "What happens to ROCE and gearing when an entity revalues its properties upwards?", a: "Both fall — capital employed and equity rise, and the higher depreciation also reduces operating profit — without any change in the underlying business." },
    { q: "Why is interest cover computed on operating profit?", a: "Because it measures the profit available to service interest, before that interest is deducted." },
    { q: "Which ratios matter most to a bank considering a term loan?", a: "Gearing, interest cover, operating cash flow and asset security — with liquidity as a secondary concern." },
  ],
  furtherStudy: [
    "Chapter 31 — turning these calculations into an interpretation that earns the marks",
    "Chapter 33 — the limitations of ratio analysis, which are the reverse side of the distortions in this chapter",
    "Chapter 25 — operating cash flow, which every user in the table above cares about",
  ],
}

export const FR_TREE_31: StudyChapter = {
  id: "FR-31",
  number: 31,
  paper: "FR",
  area: "C",
  title: "Writing an interpretation: from ratio to conclusion",
  minutes: 18,
  syllabusRefs: ["C1(a)", "C1(b)", "C2(d)"],
  intro:
    "A ratio earns one mark. The cause of the movement and its consequence for the user earn two more — and most candidates never claim them.",
  outcomes: [
    "Structure an interpretation answer so that each point earns its available marks",
    "Move from a calculated movement to a scenario-specific cause",
    "Connect a finding to the decision of the user named in the requirement",
    "Identify overtrading from the pattern of ratios",
    "Reach and support a conclusion rather than summarising",
  ],
  sections: [
    {
      id: "the-structure",
      heading: "The three-part point",
      blocks: [
        {
          kind: "formula",
          name: "How to write one point",
          expr: "1  THE MOVEMENT     what the number did, quantified\n                     \"gross margin fell from 38% to 35%\"\n\n2  THE CAUSE        WHY, drawn from the SCENARIO\n                     \"consistent with the price reductions used to\n                      win the supermarket contract, which the\n                      scenario says was priced to gain volume\"\n\n3  THE CONSEQUENCE  what it means FOR THE NAMED USER\n                     \"on revenue of $12m the three-point fall gave\n                      up $360,000 of gross profit — so the contract\n                      must generate more than that in incremental\n                      volume to be worth having\"\n\nMost candidates write only part 1, sometimes with a generic part 2\n(\"perhaps due to increased competition\"). Parts 2 and 3 are where\nthe marks are, and part 2 must come from the SCENARIO — a generic\ncause earns nothing because it could be written before reading\nthe question.",
          note: "A useful test: could this sentence have been written without reading the scenario? If yes, it earns nothing. Every cause must name something the question told you.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Four habits that cost marks",
          md: "**Listing ratios with no narrative.** A table of computations earns the calculation marks only, and they are the minority.\n\n**Describing rather than explaining.** \"Receivables days increased to 55 days, which is an increase of 15 days\" restates the number twice and says nothing.\n\n**Generic causes.** \"This may be due to poor credit control or increased competition\" fits any company in any year. Use the scenario: a new customer given extended terms, a factory commissioned mid-year, a change of policy disclosed in the notes.\n\n**No conclusion.** A requirement to \"advise\" or \"report to\" demands a judgement. Ending with a summary of the ratios leaves the professional marks on the table.",
        },
      ],
    },
    {
      id: "worked-interpretation",
      heading: "A worked interpretation",
      blocks: [
        {
          kind: "example",
          title: "Reporting to a bank",
          scenario:
            "Fieldfare Co has asked its bank for a five-year $2m loan to fund a further distribution centre. The bank has asked for an analysis. Summarised figures:\n\n                                  20X6         20X5\n  Revenue                      $12,000,000   $9,000,000\n  Gross margin                       35.0%        38.0%\n  Operating margin                   13.0%        15.0%\n  ROCE                              16.25%        20.0%\n  Receivables days                    54.8         40.0\n  Inventory days                      70.2         55.0\n  Current ratio                      1.5:1        2.1:1\n  Gearing (debt/equity)              60.0%        25.0%\n  Interest cover                  6.5 times   12.0 times\n\nThe scenario states that in 20X6 Fieldfare won a large supermarket contract, priced below its usual margin to secure the volume, and that the supermarket negotiated 90-day payment terms. It also opened a distribution centre in July 20X6, funded by a $2.25m loan.",
          steps: [
            { label: "Revenue and margin, as one point", detail: "MOVEMENT: revenue grew 33.3%, but gross margin fell three points from 38.0% to 35.0%.\nCAUSE: the supermarket contract was deliberately priced below normal margin to win volume — the scenario says so.\nCONSEQUENCE: at 20X6 revenue, three points of margin is $360,000 of gross profit given up. The strategy is only worthwhile if the incremental volume more than covers that, and on these figures the extra $3m of revenue at the new 35% margin generates $1.05m of gross profit, so it does. For the BANK, the relevant point is that growth is real but lower-quality than the prior year's." },
            { label: "ROCE, decomposed", detail: "MOVEMENT: ROCE fell from 20.0% to 16.25%.\nCAUSE: operating margin fell two points AND the new distribution centre was added to capital employed in July, so twelve months of assets support only six months of the additional revenue they will eventually generate.\nCONSEQUENCE: the fall is partly strategic and partly timing. A bank should expect ROCE to recover in 20X7 once the centre is fully productive — and should ask management to confirm that expectation, because if it does not recover, the capital has been misallocated." },
            { label: "Working capital, as the central concern", detail: "MOVEMENT: receivables days rose from 40 to 54.8 and inventory days from 55 to 70.2. The current ratio fell from 2.1 to 1.5.\nCAUSE: the 90-day terms conceded to the supermarket, and inventory built to service a large contract.\nCONSEQUENCE: this is the pattern of OVERTRADING — revenue up a third, working capital absorbing cash faster than profit generates it, and liquidity deteriorating. For the bank this matters more than profitability: a further $2m of long-term debt does not solve a working capital problem, and may worsen it by adding interest to an already tightening cash position." },
            { label: "Gearing and cover, for a lender", detail: "MOVEMENT: gearing rose from 25% to 60% and interest cover halved from 12 to 6.5 times.\nCAUSE: the $2.25m loan taken to fund the July distribution centre.\nCONSEQUENCE: the requested $2m would take gearing higher again — on 20X6 equity of $6m, debt would rise from $3.6m to $5.6m, giving gearing of roughly 93%. Interest cover would fall further unless the new centre generates profit quickly. This is the calculation the bank will do, so do it for them." },
            { label: "State what is missing", detail: "The analysis has no CASH FLOW information, and on these facts that is the most important omission — the working capital deterioration means operating cash flow may be far below operating profit. Also absent: the security available, any covenants on the existing loan, the projected returns from the new centre, and whether the supermarket contract is renewable or a one-off." },
            { label: "Conclude, for the bank", detail: "\"Fieldfare is growing and remains profitable, but the quality of that growth has fallen and the funding structure has changed sharply in one year. The specific concern is not profitability but LIQUIDITY: the working capital cycle has lengthened materially while gearing has more than doubled. I would not recommend advancing the full $2m on the current information. I would ask for (i) a cash flow forecast covering the loan term, (ii) the projected return on the new distribution centre, and (iii) confirmation of the supermarket contract's duration — and would consider a smaller facility, or a combination of term debt and an overdraft sized to the working capital need.\"" },
          ],
          result:
            "**Four three-part points, an explicit statement of what is missing, and a conclusion that answers the bank's actual question.** Note that no point in this answer could have been written without the scenario — that is the test.",
        },
      ],
      check: {
        q: "Which of these sentences would earn the 'cause' mark in an interpretation answer?",
        options: [
          "Receivables days rose to 55 days, consistent with the 90-day terms conceded to the new supermarket customer",
          "Receivables days rose from 40 to 55 days, an increase of 15 days",
          "Receivables days rose, possibly due to weaker credit control or a change in the customer mix",
          "Receivables days of 55 is above the industry average",
        ],
        correct: 0,
        explain:
          "Only the first names something from the scenario. The second restates the movement twice; the third is generic and could be written without reading the question; the fourth introduces a comparison but still offers no cause.",
      },
    },
    {
      id: "patterns",
      heading: "Patterns worth recognising",
      blocks: [
        {
          kind: "table",
          caption: "Ratio patterns and what they usually mean",
          head: ["Pattern", "Likely diagnosis", "What to look for in the scenario"],
          rows: [
            ["Revenue up sharply, margin down, receivables and inventory days up, liquidity down", "**OVERTRADING**", "New large customers, extended credit terms, rapid expansion without new equity"],
            ["Margin held, asset turnover down, ROCE down", "**New capacity not yet productive**", "An acquisition or asset commissioned part way through the year"],
            ["Margin down, asset turnover up, ROCE roughly flat", "**A deliberate volume strategy**", "Price reductions, a new low-margin channel, a discount contract"],
            ["Profit up, operating cash flow down", "**Profit not converting to cash**", "Growing receivables or inventory, capitalisation of costs, revenue recognition judgements"],
            ["Current ratio improved but payables days fallen sharply", "**Possible window dressing**, or suppliers tightening terms", "Year-end timing, a loss of supplier confidence, a covenant test date"],
            ["Gearing down and interest cover up with no debt repayment", "**A revaluation, or a reclassification**", "A revaluation in the year, or preference shares reclassified"],
            ["Margins up sharply in one year with no operational change", "**A one-off gain in operating profit**", "A disposal, a provision release, a grant recognised"],
          ],
        },
        {
          kind: "activity",
          title: "Diagnose from the pattern",
          prompt:
            "An entity reports: revenue +5%; gross margin unchanged; operating margin up from 9% to 14%; ROCE up from 11% to 17%; operating cash flow down 20%; a $1.4m credit within operating expenses described in the notes as 'release of provisions no longer required'.\n\nWhat has happened, and what would you tell a prospective investor?",
          answer:
            "The operational picture is flat: revenue up only 5% and gross margin unchanged, so trading has not improved. Yet operating margin has risen five points and ROCE six.\n\nThe cause is in the notes. The $1.4m provision release is a credit to operating expenses — it increases operating profit without any trading improvement, and it is NOT sustainable, because a provision can only be released once.\n\nStrip it out and the picture reverses. If operating profit was, say, $3.9m on revenue of $28m (13.9%), then excluding the release gives $2.5m and a margin of 8.9% — slightly WORSE than the prior year's 9%. ROCE would similarly fall back towards its prior level.\n\nThe operating cash flow fall of 20% corroborates this: a provision release generates no cash, which is exactly why the cash figure did not follow the profit figure. Whenever profit and operating cash flow move in opposite directions, look for a non-cash credit.\n\nWhat to tell the investor: reported profitability has improved but underlying trading has not, and on an adjusted basis margins have edged down. The apparent improvement is a one-off accounting credit. Ask why the provision was released, whether the original estimate was sound, and what the sustainable margin is.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Always say what information you would want",
          md: "Almost every FR interpretation requirement carries marks for identifying the **LIMITATIONS** of the analysis and the further information needed. They are among the easiest marks in the paper and among the most often left unclaimed.\n\nThe reliable list: **cash flow information**; **industry averages or a comparator**; **more than two years' data** to establish a trend; **the notes** for accounting policies and one-off items; **budgets and forecasts**, since the ratios are all historical; **non-financial information** — order book, customer concentration, staff turnover; and any **commitments and contingencies**.\n\nPick the three most relevant to the scenario rather than listing all of them.",
        },
      ],
    },
  ],
  examTraps: [
    { trap: "Presenting a table of ratios with no narrative.", fix: "The calculation marks are the minority. Each point needs movement, cause and consequence." },
    { trap: "Restating the movement instead of explaining it.", fix: "\"Rose by 15 days\" adds nothing to \"rose from 40 to 55\". Move straight to why." },
    { trap: "Offering generic causes.", fix: "If the sentence could have been written without reading the scenario, it earns nothing. Name the contract, the acquisition, the policy change." },
    { trap: "Ignoring the user named in the requirement.", fix: "A bank's concerns are not a shareholder's. Select the ratios and frame the conclusion for that user." },
    { trap: "Ending with a summary rather than a conclusion.", fix: "\"Advise\" and \"report to\" require a judgement and a recommendation." },
    { trap: "Leaving the limitations and further-information marks unclaimed.", fix: "Name three, chosen for the scenario — cash flow, a comparator, and the notes are almost always among them." },
    { trap: "Failing to spot a non-cash credit when profit and operating cash flow diverge.", fix: "A provision release, a fair value gain or a capitalisation will explain it. Check the notes." },
  ],
  keyTerms: [
    { term: "Overtrading", def: "Expanding revenue faster than the entity can finance the associated working capital, so profit rises while liquidity and operating cash flow deteriorate." },
    { term: "Quality of earnings", def: "The extent to which reported profit reflects sustainable trading rather than one-off gains, non-cash credits or accounting judgements." },
    { term: "Three-part point", def: "The structure of an interpretation point: the quantified movement, a scenario-specific cause, and the consequence for the named user." },
  ],
  summary: [
    "Write each point in three parts: the quantified movement, the cause DRAWN FROM THE SCENARIO, and the consequence for the named user.",
    "A cause that could have been written without reading the question earns nothing.",
    "Decompose ROCE into margin and asset turnover before explaining a change in it.",
    "Recognise the standard patterns — overtrading, new capacity not yet productive, a volume strategy, profit not converting to cash, a one-off credit.",
    "When profit and operating cash flow move in opposite directions, look for a non-cash item.",
    "Always identify the limitations of the analysis and the further information needed; pick three relevant to the scenario.",
    "Finish with a conclusion that answers the user's actual question, including a recommendation where one is asked for.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the three parts of an interpretation point?", a: "The quantified movement, a cause drawn from the scenario, and the consequence for the named user." },
    { q: "What is the test of whether a stated cause will earn a mark?", a: "Whether it could have been written without reading the scenario. If it could, it earns nothing." },
    { q: "What pattern indicates overtrading?", a: "Revenue growing sharply while margins, working capital ratios and liquidity all deteriorate, with operating cash flow falling." },
    { q: "Profit is up and operating cash flow is down. What should you look for?", a: "A non-cash credit or a working capital absorption — a provision release, a fair value gain, capitalised costs, or growing receivables and inventory." },
    { q: "Name three items of further information worth requesting.", a: "Cash flow information, a comparator or industry averages, and the notes for accounting policies and one-off items — plus forecasts and non-financial information." },
  ],
  furtherStudy: [
    "Chapter 30 — the calculations this chapter turns into an argument",
    "Chapter 32 — the additional complications when the statements are consolidated",
    "Chapter 33 — the limitations, in the detail a requirement may ask for",
  ],
}
