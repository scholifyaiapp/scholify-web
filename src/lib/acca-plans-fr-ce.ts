/*
 * FR Areas C and E — analysing and interpreting financial statements, and the
 * employability and technology skills the CBE actually marks.
 * The exam-plan layer: what each section is examined by, and how.
 *
 * Area C is the OTHER 20-mark Section C question, and it is the one candidates
 * most reliably under-perform on. The reason is consistent enough to plan
 * around: calculating a ratio is worth roughly half a mark and explaining what
 * moved it is worth two, yet the calculation is what feels like progress. A
 * script with fourteen immaculate ratios and four sentences of commentary
 * scores badly, and the candidate leaves the exam believing they did well.
 *
 * So every interpretation plan here forces the same shape onto the answer: a
 * figure, the reason for the movement drawn FROM THE SCENARIO, and the
 * consequence for the user who asked. A point without a figure is an assertion.
 * A figure without a reason is arithmetic. Only the pair is an interpretation,
 * and only the pair is paid.
 *
 * Area E is not a syllabus topic in the ordinary sense — it is how the exam is
 * physically answered. It is planned here against real Section C requirements
 * rather than in the abstract, because layout, spreadsheet discipline and time
 * allocation are only meaningful attached to a question that is actually being
 * answered under a clock.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FR_PLANS_CE: ExamPlanMap = {
  /* ── FR-30 · Ratio analysis: the calculations ───────────────────── */

  "FR-30::profitability": {
    title: "The ROCE identity, and what it decomposes into",
    format: "ot",
    marks: 2,
    requirement:
      "Halvern Co has an operating profit margin of 12% and a net asset turnover of 1.5 times.\n\nWhat is Halvern Co's return on capital employed?\n\nA  18.0%\nB  8.0%\nC  13.5%\nD  12.0%",
    plan: [
      {
        step: "Write the identity out before doing anything",
        detail:
          "ROCE = operating profit margin × net asset turnover. It is an identity, not an approximation: (operating profit ÷ revenue) × (revenue ÷ capital employed) cancels revenue and leaves operating profit ÷ capital employed.",
      },
      {
        step: "Multiply — and notice which option punishes dividing",
        detail:
          "12% × 1.5 = 18%. Option B is 12 ÷ 1.5 = 8%, which is what inverting the relationship produces, and it looks entirely plausible because it is still a percentage of a sensible size.",
      },
      {
        step: "Fix the definition of capital employed",
        detail:
          "Equity PLUS non-current liabilities — the long-term finance the business runs on. Equivalently, total assets less current liabilities. The return that sits on top of it must therefore be OPERATING profit, before interest, because interest is the reward to one of the two providers of that capital.",
      },
      {
        step: "Know why the decomposition is the point of the ratio",
        detail:
          "ROCE alone says performance changed. The two components say HOW: margin is about pricing and cost control, turnover is about how hard the asset base is worked. A retailer lives on low margin and high turnover; a manufacturer on the reverse. An interpretation answer that moves from ROCE to its two drivers is doing the thing the marks are for.",
      },
    ],
    answer:
      "**A — 18.0%.**\n\n**ROCE = operating profit margin × net asset turnover = 12% × 1.5 = 18%**\n\nThis is an **identity**, and seeing why makes it impossible to forget:\n\n**(operating profit ÷ revenue) × (revenue ÷ capital employed) = operating profit ÷ capital employed**\n\nRevenue cancels, leaving the definition of ROCE itself.\n\n**Capital employed** is **equity + non-current liabilities** — the long-term finance the business is run on — or equivalently total assets less current liabilities. The numerator must be **operating profit (PBIT)**, measured *before* finance costs, because interest is the return paid to one of the two providers of that capital. Putting profit after interest over capital employed compares a return to one group of investors with the capital of both.\n\n**Why the decomposition matters more than the ratio.** ROCE falling from 20% to 15% says performance deteriorated. The components say how:\n\n| | Margin fell | Turnover fell |\n|---|---|---|\n| **Means** | Prices cut, or costs rose | The asset base is working less hard |\n| **Look for** | Discounting, input prices, mix | New capacity not yet productive, a revaluation, idle assets |\n\nAn interpretation that names which half moved, and offers a cause from the scenario, is worth several times one that reports the ROCE movement alone.\n\n**Why the other options are there:** **B** divides instead of multiplying. **D** reports the margin unchanged, ignoring turnover altogether. **C** is a plausible-looking figure with no derivation — which is exactly its purpose.",
    earns: [
      "Stating ROCE as margin × turnover and being able to derive it",
      "Defining capital employed as equity plus non-current liabilities, with operating profit on top",
      "Using the decomposition to say which half of performance moved",
    ],
    loses: [
      "Dividing the margin by turnover",
      "Putting profit after interest over capital employed",
    ],
  },

  "FR-30::what-distorts-them": {
    title: "Accounting choices that move ratios without changing performance",
    format: "ot",
    marks: 2,
    requirement:
      "Ridgeway Co revalued its freehold property upwards by a material amount at the start of the year. Its trading operations were unchanged from the previous year.\n\nWhat is the effect of the revaluation on Ridgeway Co's return on capital employed and on its gearing (measured as debt ÷ equity)?\n\nA  ROCE falls; gearing falls\nB  ROCE rises; gearing falls\nC  ROCE falls; gearing rises\nD  Neither ratio is affected, because the revaluation is not a trading transaction",
    plan: [
      {
        step: "Trace the revaluation through both sides of the statement of financial position",
        detail:
          "The asset's carrying amount rises and a revaluation surplus is credited to EQUITY. So capital employed rises and equity rises — before any effect on profit is considered.",
      },
      {
        step: "Follow it into profit or loss as well",
        detail:
          "A higher carrying amount means a HIGHER DEPRECIATION charge over the remaining life, so operating profit FALLS. This is the half candidates miss, and it pushes ROCE the same way as the denominator does.",
      },
      {
        step: "Combine the two effects on ROCE",
        detail:
          "Numerator down (more depreciation), denominator up (bigger capital employed). Both push the ratio DOWN, so ROCE falls unambiguously — no netting off required.",
      },
      {
        step: "Do the same for gearing, and state the general lesson",
        detail:
          "Debt is unchanged and equity is larger, so debt ÷ equity FALLS. Nothing about the business has changed: the same assets, the same customers, the same cash. This is the point — comparing two companies' ratios where one revalues and one does not compares accounting policies, not performance.",
      },
    ],
    answer:
      "**A — ROCE falls and gearing falls.**\n\n**Effect on ROCE — both parts move the same way**\n\n· **Denominator up.** The revaluation increases the carrying amount of the property, so capital employed (equity + non-current liabilities) rises.\n· **Numerator down.** A higher carrying amount is depreciated over the remaining useful life, so the annual **depreciation charge rises** and operating profit **falls**.\n\nA smaller return on a larger capital base: **ROCE falls**, and it falls more than the balance-sheet effect alone would suggest.\n\n**Effect on gearing**\n\nThe revaluation surplus is credited to **equity**. Debt is unchanged. Debt ÷ equity therefore **falls**, and the company looks less risky to a lender than it did the day before — on identical assets, identical cash flows and identical trading.\n\n**This is the whole point of the section.** Nothing about the business changed. An entity that revalues reports lower ROCE and lower gearing than an otherwise identical entity that uses the cost model, so comparing the two compares **accounting policies**, not performance.\n\n**The same distortion arises from:**\n\n| Choice or event | Effect |\n|---|---|\n| Revaluation of property | ROCE down, gearing down, asset turnover down |\n| Older, heavily depreciated assets | ROCE **up** — a low carrying amount flatters the return, so an efficient new entrant can look worse than a tired incumbent |\n| Leasing rather than buying | Right-of-use asset and lease liability on the statement of financial position: **gearing up** |\n| A year-end that follows a seasonal peak | Inventory, receivables and cash unrepresentative of the year |\n| Different depreciation lives or methods | Profit and carrying amounts not comparable between entities |\n\n**Why the other options are there:** **B** and **C** each get one of the two directions right, so a candidate reasoning about only half the effect will find their answer waiting. **D** treats a non-trading transaction as having no ratio consequences, when it changes both the numerator and the denominator.",
    earns: [
      "Tracing the revaluation into depreciation as well as into capital employed",
      "Concluding ROCE falls because both parts of the ratio move the same way",
      "Naming the general lesson — that this compares policies rather than performance",
    ],
    loses: [
      "Seeing only the denominator effect and missing the extra depreciation",
      "Concluding gearing rises because the statement of financial position grew",
    ],
  },

  "FR-30::choosing-ratios": {
    title: "Choosing the ratios the user actually needs",
    format: "ot",
    marks: 2,
    requirement:
      "A supplier is deciding whether to grant Tarrant Co 60 days' credit on a substantial order.\n\nWhich pair of ratios is MOST relevant to that decision?\n\nA  Current ratio and trade payables payment period\nB  Return on capital employed and net asset turnover\nC  Earnings per share and the price/earnings ratio\nD  Gross profit margin and inventory holding period",
    plan: [
      {
        step: "Name the user and the decision before looking at any ratio",
        detail:
          "A supplier granting credit is a SHORT-TERM unsecured creditor. The only question that matters is whether Tarrant Co will still be able to pay in sixty days. Long-run profitability is secondary and share price is irrelevant.",
      },
      {
        step: "Match the ratio family to the decision",
        detail:
          "Short-term solvency is measured by LIQUIDITY ratios — the current and quick ratios — and by the working capital cycle, of which the payables payment period is the part that concerns this supplier directly.",
      },
      {
        step: "Read the payables period as evidence about behaviour, not just speed",
        detail:
          "It reveals how Tarrant Co treats its existing suppliers. A lengthening payables period means the entity is already funding itself from its suppliers, which is precisely what this supplier is being asked to join in with.",
      },
      {
        step: "Discard the others by naming whose questions they answer",
        detail:
          "ROCE and asset turnover answer an INVESTOR's question about long-run efficiency. EPS and P/E answer a SHAREHOLDER's question about return and market expectation. Margin and inventory days describe trading efficiency, which matters eventually but does not determine whether an invoice is paid in sixty days.",
      },
    ],
    answer:
      "**A — the current ratio and the trade payables payment period.**\n\nThe user determines the ratios. A supplier granting 60 days' credit is a **short-term, unsecured creditor**, and its single question is whether Tarrant Co can settle an invoice in **sixty days**.\n\n· The **current ratio** (and better still the **quick ratio**, which strips out inventory that may not convert to cash quickly) measures whether short-term assets cover short-term obligations.\n· The **trade payables payment period** shows how Tarrant Co treats the suppliers it already has. A period that is long, or lengthening, says the entity is already using its suppliers as a source of finance — which is exactly the arrangement being proposed.\n\n**Who each of the other pairs belongs to:**\n\n| Ratios | The user whose question they answer |\n|---|---|\n| ROCE, asset turnover | An **investor** or lender assessing long-run efficiency in using capital |\n| EPS, P/E | A **shareholder** assessing return and the market's expectations |\n| Gross margin, inventory days | **Management**, or an analyst assessing trading efficiency |\n| Current ratio, quick ratio, payables period | A **short-term creditor** — this supplier |\n| Gearing, interest cover | A **long-term lender** assessing the capacity to service debt |\n\nAn interpretation question in FR nearly always names its user — a potential lender, an acquirer, a shareholder — and the marks follow from selecting and interpreting the ratios **that user** needs. Calculating every ratio in the syllabus and commenting on all of them is the standard way to spend forty minutes and score poorly.",
    earns: [
      "Identifying the user and the decision first, then selecting ratios to match",
      "Preferring the quick ratio where inventory is slow-moving",
      "Reading the payables period as evidence of how the entity treats its creditors",
    ],
    loses: [
      "Offering profitability ratios to a short-term creditor",
      "Calculating every ratio available rather than the ones the named user needs",
    ],
  },

  /* ── FR-31 · Writing an interpretation ──────────────────────────── */

  "FR-31::the-structure": {
    title: "The three-part point that turns a ratio into a mark",
    format: "written",
    marks: 10,
    requirement:
      "Marden Co's revenue for the year ended 31 December 20X5 rose by 20% on the previous year. Over the same period its gross profit margin fell from 40% to 34%, and its operating profit margin fell from 18% to 11%.\n\nComment on Marden Co's performance for the year. (10 marks)",
    plan: [
      {
        step: "Budget the answer: ten marks is about five developed points",
        detail:
          "Roughly two marks a point, at 1.8 minutes a mark — eighteen minutes. Five points made properly beats twelve points listed, every time. Decide the five before writing the first one.",
      },
      {
        step: "Give every point the same three parts",
        detail:
          "(1) The MOVEMENT, with the figure. (2) The CAUSE, drawn from the scenario. (3) The CONSEQUENCE for the reader. A movement alone is arithmetic the marker can already see; a cause alone is speculation. The pair, with a consequence, is what the mark is for.",
      },
      {
        step: "Start where the largest movement is, and link the two margins",
        detail:
          "Gross margin down 6 points and operating margin down 7 means roughly 6 points came from ABOVE the gross profit line and only about 1 further point from operating expenses. That single observation locates the problem in pricing or input costs, not in overheads, and it is invisible unless the two ratios are read together.",
      },
      {
        step: "Convert the percentages into money, because that is where the impact lands",
        detail:
          "If revenue was $10m and is now $12m, gross profit went from $4.0m to $4.08m — a 20% increase in volume bought virtually no extra gross profit. Operating profit went from $1.8m to $1.32m: the entity sold a fifth more and earned LESS. Saying that is worth more than any ratio.",
      },
      {
        step: "Offer alternative causes, then say what more you would need",
        detail:
          "Price cutting to win volume, a shift towards lower-margin products, or rising input costs not passed on. Each fits the figures. Naming the additional information that would distinguish them — a sales mix analysis, or the movement in input prices — shows the reasoning is genuine rather than a guess.",
      },
    ],
    answer:
      "**Revenue grew strongly but the growth was bought, not won.** Revenue rose **20%**, yet the gross margin fell from **40% to 34%**. On revenue of, say, $10m rising to $12m, gross profit moves from $4.00m to $4.08m — a fifth more sales generating **almost no additional gross profit**. The most likely cause is **price discounting to drive volume**, and the consequence is that the growth the directors will point to has not translated into profit.\n\n**The problem sits above the gross profit line.** Gross margin fell by **6 percentage points** and operating margin by **7**, so roughly six of the seven points were lost in **cost of sales**, and only about one in operating expenses. That locates the issue in **pricing, sales mix or input costs** rather than in overhead control — a distinction that changes what management should do about it, and one that neither ratio reveals on its own.\n\n**In absolute terms the year went backwards.** Operating margin of 11% on $12m is **$1.32m**, against 18% on $10m — **$1.80m**. Marden Co sold **20% more and earned 27% less**. Any commentary that stops at 'margins have declined' has not said this, and this is the fact a user needs.\n\n**Three causes fit the figures, and they are not equally serious.** A deliberate **price reduction** to win market share may be a strategy with a payoff, if the volume is retained when prices normalise. An adverse **shift in sales mix** toward lower-margin products may be self-correcting or may be permanent. **Rising input costs that could not be passed on** is the most concerning, because it implies weak pricing power in the market.\n\n**What would distinguish between them:** a **sales mix analysis** by product, movements in **input prices**, and whether the discounting was a limited promotion or a permanent repositioning. Segmental information and the operating expense analysis would show whether any part of the fall is a one-off.\n\n**Two cautions on the figures themselves.** Percentages alone conceal scale, and no statement of financial position information is available — so nothing can yet be said about whether the extra volume has been funded by **inventory and receivables**, which is where growth of this kind usually shows up first.",
    earns: [
      "Five developed points rather than a list of movements",
      "Reading the two margins together to locate the fall above the gross profit line",
      "Converting percentages into money to show profit fell in absolute terms",
      "Offering competing causes and the information that would distinguish them",
    ],
    loses: [
      "Restating the movements the question already gave, which earns nothing",
      "Asserting a cause with no link to the scenario",
      "Writing about liquidity or gearing, on which the question supplies no information",
    ],
  },

  "FR-31::worked-interpretation": {
    title: "A full interpretation: ratios calculated, then read together",
    format: "written",
    marks: 20,
    requirement:
      "Kelso Co's summarised financial statements are set out below ($'000).\n\nStatements of profit or loss for the year ended 31 December:\n\n| | 20X5 | 20X4 |\n|---|---|---|\n| Revenue | 12,000 | 9,000 |\n| Cost of sales | (8,400) | (5,850) |\n| Gross profit | 3,600 | 3,150 |\n| Operating expenses | (2,160) | (1,530) |\n| Operating profit | 1,440 | 1,620 |\n| Finance costs | (240) | (90) |\n| Profit before tax | 1,200 | 1,530 |\n\nStatements of financial position at 31 December:\n\n| | 20X5 | 20X4 |\n|---|---|---|\n| Inventory | 1,400 | 750 |\n| Trade receivables | 2,000 | 1,200 |\n| Trade payables | 1,300 | 900 |\n| Equity | 4,800 | 4,400 |\n| Non-current liabilities — loan notes | 3,200 | 1,200 |\n| Capital employed | 8,000 | 5,600 |\n\nA shareholder is concerned that, although revenue has grown strongly, the dividend has not increased.\n\n(a) Calculate, for both years, ratios that would assist in assessing Kelso Co's performance and position. (8 marks)\n(b) Using the ratios calculated in (a), comment on Kelso Co's performance and position for the year ended 31 December 20X5. (12 marks)",
    plan: [
      {
        step: "Budget to the split: 8 marks of calculation, 12 of commentary",
        detail:
          "About 14 minutes on the ratios and 22 on the writing. Roughly half a mark per ratio means eight to ten ratios is plenty — calculating twenty is unpaid work that eats the part that pays double.",
      },
      {
        step: "Select ratios across all three families, then stop",
        detail:
          "PROFITABILITY (ROCE, gross and operating margin, asset turnover), POSITION (gearing, interest cover) and WORKING CAPITAL (inventory, receivables and payables days). The shareholder's concern is about growth and dividends, so profitability and gearing carry the weight.",
      },
      {
        step: "Show the formula and the figures in every calculation",
        detail:
          "'ROCE = 1,440/8,000 = 18.0%' earns its mark even if a figure feeding it is wrong; a bare '18%' does not. Label both years so the movement is visible without the marker doing arithmetic.",
      },
      {
        step: "Find the story before writing part (b), and lead with it",
        detail:
          "Revenue up 33% while operating profit FELL. Debt up from 1,200 to 3,200. Inventory and receivables days both up sharply. The story is growth bought with discounting and funded with debt, and not yet converted into cash or profit. Write that first, then evidence it.",
      },
      {
        step: "Use the ROCE decomposition to prove where the fall came from",
        detail:
          "ROCE 28.9% to 18.0%. Margin 18.0% to 12.0% and asset turnover 1.61 to 1.50 — so the fall is mostly MARGIN, with the enlarged asset base contributing. That is the decomposition doing its job rather than being quoted.",
      },
      {
        step: "Answer the shareholder's actual question in the conclusion",
        detail:
          "They asked why the dividend has not risen despite revenue growth. The answer is in the figures: profit is lower, gearing has more than doubled, interest cover has fallen from 18 to 6, and working capital has absorbed cash. Retaining profit is prudent. A part (b) that never addresses the stated concern leaves marks on the table.",
      },
    ],
    answer:
      "**(a) Ratios**\n\n| | 20X5 | 20X4 |\n|---|---|---|\n| ROCE (operating profit ÷ capital employed) | 1,440/8,000 = **18.0%** | 1,620/5,600 = **28.9%** |\n| Gross profit margin | 3,600/12,000 = **30.0%** | 3,150/9,000 = **35.0%** |\n| Operating profit margin | 1,440/12,000 = **12.0%** | 1,620/9,000 = **18.0%** |\n| Net asset turnover | 12,000/8,000 = **1.50** | 9,000/5,600 = **1.61** |\n| Gearing (debt ÷ equity) | 3,200/4,800 = **66.7%** | 1,200/4,400 = **27.3%** |\n| Interest cover | 1,440/240 = **6.0** | 1,620/90 = **18.0** |\n| Inventory holding period | 1,400/8,400 × 365 = **61 days** | 750/5,850 × 365 = **47 days** |\n| Receivables collection period | 2,000/12,000 × 365 = **61 days** | 1,200/9,000 × 365 = **49 days** |\n| Payables payment period | 1,300/8,400 × 365 = **57 days** | 900/5,850 × 365 = **56 days** |\n\n**(b) Commentary**\n\n**Revenue grew by a third while profit fell.** Revenue rose **33%** from $9.0m to $12.0m, but operating profit fell from **$1,620** to **$1,440**. Growth on this scale that reduces profit has almost always been **bought** — the gross margin fell from **35.0% to 30.0%**, which on $12.0m of revenue is $600 of gross profit given away. The most likely explanation is **price discounting to win volume**, and the consequence is that the shareholder's premise — that strong revenue growth should fund a larger dividend — does not hold.\n\n**ROCE has fallen by more than a third, and the decomposition says why.** ROCE moved from **28.9% to 18.0%**. Splitting it: operating margin fell from **18.0% to 12.0%** while asset turnover fell only from **1.61 to 1.50**. So the deterioration is **overwhelmingly a margin problem**, not a failure to use the enlarged asset base — the assets are being worked nearly as hard as before, but each pound of sales earns far less.\n\n**The expansion has been funded with debt, and the risk profile has changed sharply.** Loan notes rose from **$1,200 to $3,200** and gearing from **27.3% to 66.7%** — the entity has moved from conservatively financed to highly geared in a single year. Interest cover fell from **18.0 to 6.0 times**. Six times is not yet dangerous, but the direction is steep, and because operating profit is falling while interest is rising, a further year of the same would take cover toward a level at which lenders impose conditions.\n\n**Working capital has absorbed a great deal of cash.** Inventory days rose from **47 to 61** and receivables days from **49 to 61**, while payables days were static at around **56**. Both increases are consistent with the discounting story: goods are not selling as readily as the revenue figure suggests, and the extra sales appear to have been won partly by **extending credit**. Receivables of $2.0m against $1.2m is $800 of cash tied up, and inventory a further $650, with no matching increase in supplier credit. This is where the borrowed money has gone.\n\n**Position overall.** Kelso Co is growing but the growth is currently **value-destroying**: lower margins, lower ROCE, higher gearing, weaker interest cover and a longer working capital cycle. The strategy is defensible **if** the volume is retained when prices are restored and the working capital investment unwinds — but neither has happened yet.\n\n**The shareholder's question, answered directly.** The dividend has not increased because there is **less profit to distribute** than last year, not more; because **cash has been absorbed** by inventory and receivables rather than generated; and because **gearing has more than doubled**, so retaining profit to service and reduce debt is the prudent course. Distributing more in these circumstances would increase the pressure on interest cover.\n\n**Limitations of this analysis:** only two years are available, so no trend is established; no cash flow information is given, so the cash position is inferred; there is no industry data for comparison; and nothing is known about the age or valuation basis of the asset base, which affects ROCE directly.",
    earns: [
      "Showing the formula and figures for every ratio, so calculation marks survive an arithmetic slip",
      "Selecting eight to ten ratios across profitability, position and working capital rather than calculating everything",
      "Decomposing ROCE to prove the fall is a margin problem rather than an asset-utilisation one",
      "Linking the working capital movements back to the discounting story instead of reporting them separately",
      "Answering the shareholder's stated concern about the dividend explicitly",
      "Closing with limitations, which are reliably worth marks in this question",
    ],
    loses: [
      "Spending the time on twenty ratios and leaving part (b) thin — the classic way to fail this question",
      "Describing each ratio movement in turn with no connecting story",
      "Never mentioning the dividend, which is the reason the question was asked",
      "Quoting ROCE without decomposing it, when both components are calculable",
    ],
  },

  "FR-31::patterns": {
    title: "Recognising the pattern a set of movements makes",
    format: "ot",
    marks: 2,
    requirement:
      "Fenwick Co's revenue increased by 25% during the year. Over the same period its receivables collection period rose from 45 days to 80 days, while its gross profit margin was unchanged.\n\nWhich explanation is MOST consistent with this combination of movements?\n\nA  Additional sales were won by offering extended credit terms\nB  Additional sales were won by cutting selling prices\nC  The entity has become more efficient at collecting cash\nD  The entity has changed its method of valuing inventory",
    plan: [
      {
        step: "Read the movements as a set, never one at a time",
        detail:
          "Three facts are given and the answer must be consistent with ALL THREE. Any explanation that accounts for two and contradicts the third is wrong however plausible it sounds on its own.",
      },
      {
        step: "Use the unchanged margin to eliminate the pricing explanation",
        detail:
          "Cutting selling prices reduces the gross margin unless costs fell by the same proportion. The margin did not move, so price discounting is ruled out — which is what makes the unchanged margin the most informative fact in the question, despite being the one that looks like nothing happened.",
      },
      {
        step: "Read the direction of the receivables movement correctly",
        detail:
          "45 days to 80 days means customers are taking LONGER to pay. That is deterioration in collection, so any option describing improved efficiency contradicts the figure outright.",
      },
      {
        step: "Test the survivor for consistency with all three",
        detail:
          "Extended credit terms win volume without touching price, so revenue rises 25%, the margin is unchanged, and collection lengthens. All three fit. Note the risk it carries: sales won this way increase exposure to irrecoverable debts and consume cash.",
      },
    ],
    answer:
      "**A — additional sales were won by offering extended credit terms.**\n\nAll three movements have to be explained by one story:\n\n| Fact | What it rules in or out |\n|---|---|\n| Revenue **+25%** | Something was done to win volume |\n| Gross margin **unchanged** | It was **not** a price cut — discounting would compress the margin |\n| Receivables **45 → 80 days** | Customers are taking far longer to pay |\n\n**Extending credit terms** fits every one: volume is won without touching price, so the margin holds, and the collection period lengthens because that is precisely what was offered. It is a **non-price** competitive weapon, and this is its signature in the ratios.\n\n**What a user should conclude.** Revenue growth of this kind is lower quality than it looks. It **consumes cash** — a 25% rise in revenue with collection nearly doubling means a large increase in receivables — and it raises exposure to **irrecoverable debts**, since customers attracted by long credit are on average weaker payers.\n\n**Why the other options are there:** **B** is the reflex answer to 'revenue up', but it is contradicted by the unchanged margin. **C** reverses the direction of the receivables movement — 45 to 80 days is deterioration. **D** would affect cost of sales and therefore the margin, and would not explain the receivables movement at all.\n\n**Patterns worth carrying into the exam:**\n\n| Pattern | Usual explanation |\n|---|---|\n| Revenue up, **margin down** | Price discounting, or an adverse sales mix |\n| Revenue up, **margin flat**, receivables days up | Sales won on **credit terms** |\n| Margin flat, **operating** margin down | The problem is in overheads, not in trading |\n| Inventory **and** receivables days both up | Overtrading, or goods that are not selling |\n| ROCE up with **no** margin change | An asset base that has shrunk or aged, not an operational gain |\n| Payables days rising sharply | Cash pressure — the entity is financing itself from suppliers |",
    earns: [
      "Requiring the explanation to fit all three movements, not just the headline one",
      "Using the unchanged margin as the discriminating evidence",
      "Naming the cash and irrecoverable-debt consequences of credit-driven growth",
    ],
    loses: [
      "Choosing price cutting because revenue rose, against the margin evidence",
      "Misreading a longer collection period as improved efficiency",
    ],
  },

  /* ── FR-32 · Interpreting consolidated financial statements ─────── */

  "FR-32::mid-year-acquisition": {
    title: "Why a mid-year acquisition breaks the comparison",
    format: "written",
    marks: 15,
    requirement:
      "Denholm Co acquired a 70% subsidiary on 1 July 20X5. Its consolidated financial statements for the year ended 31 December 20X5 show revenue 45% higher than the previous year, and the directors have described this as evidence of strong organic growth.\n\nExplain why comparing Denholm Co's consolidated ratios for 20X5 with those for 20X4 is problematic, and what adjustments or additional information a user would need in order to assess the group's underlying performance. (15 marks)",
    plan: [
      {
        step: "Budget to the marks and split the requirement in two",
        detail:
          "Fifteen marks, roughly 27 minutes, and the requirement has TWO parts — why the comparison fails, and what a user needs to fix it. An answer that only does the first half caps itself near eight or nine marks however good it is.",
      },
      {
        step: "Start with the arithmetic of the period, because everything follows from it",
        detail:
          "20X4 is the parent alone for twelve months. 20X5 is the parent for twelve months PLUS the subsidiary for six. The two years do not report the same entity for the same length of time, so no ratio built on revenue or profit is comparable without adjustment.",
      },
      {
        step: "Attack the word 'organic' directly",
        detail:
          "Revenue up 45% where part of the increase is six months of an acquired business is growth by PURCHASE, not by trading. Organic growth is what the existing business achieved, and it is measurable only by stripping the subsidiary out. This is the directors' central claim and the answer should meet it head on.",
      },
      {
        step: "Show why the statement of financial position compounds the problem",
        detail:
          "The consolidated statement of financial position includes 100% of the subsidiary's net assets at the YEAR END, but the statement of profit or loss includes only six months of its results. Every ratio combining the two — ROCE, asset turnover, return on equity — therefore has a full denominator against a half numerator, and is UNDERSTATED for reasons that have nothing to do with performance.",
      },
      {
        step: "Add the effects that survive even after time-apportioning",
        detail:
          "Fair value uplifts raise depreciation and depress margins. Goodwill sits in assets, depressing ROCE, and its impairment is a group-only charge. The subsidiary may trade at different margins, so consolidated margins shift with mix alone. Consideration paid in cash or debt changes gearing. None of these are performance.",
      },
      {
        step: "Finish with the information a user should ask for",
        detail:
          "The subsidiary's full-year and pre-acquisition results, segmental or divisional analysis, the parent's own single-entity statements, the fair value adjustments and their depreciation effect, and a pro-forma showing the group as if the acquisition had occurred at the start of the year. Naming these is the second half of the requirement and it is where the easiest marks sit.",
      },
    ],
    answer:
      "**The two years do not report the same thing.** 20X4 is Denholm Co alone for twelve months. 20X5 is Denholm Co for twelve months **plus six months of an acquired subsidiary**. Every ratio built on revenue or profit is therefore comparing different entities over different periods, and no like-for-like conclusion can be drawn from the movement.\n\n**The growth is not organic.** Revenue is 45% higher, but part of that increase is simply **six months of a business that has been bought**. Organic growth is what the pre-existing business achieved on its own, and it can only be measured by removing the subsidiary's contribution. Growth by acquisition has been paid for — in cash, shares or debt — while organic growth has not, so describing the two as equivalent is misleading. It is entirely possible for the parent's own revenue to have **fallen** while consolidated revenue rose 45%.\n\n**Ratios that mix the two statements are structurally distorted.** The consolidated statement of financial position includes **100% of the subsidiary's net assets at the year end**, but the statement of profit or loss includes only **six months** of its results. So:\n\n· **ROCE** — a full year's capital employed against a half year's contribution to profit, understating the return\n· **Asset turnover** — a full asset base against six months of the subsidiary's revenue, understating utilisation\n· **Return on equity** — the same mismatch\n\nThe group will appear to have deployed capital badly in a year when it may have done nothing of the sort.\n\n**Several distortions survive even after time-apportioning.**\n\n**Fair value adjustments.** The subsidiary's assets are consolidated at **fair value**, which is typically higher than their previous carrying amount, so consolidated depreciation rises and margins fall for reasons unconnected with trading.\n\n**Goodwill.** It sits in consolidated assets, increasing capital employed and depressing ROCE, and any **impairment** is a group-only charge appearing in neither company's own statements.\n\n**Different margins.** A subsidiary trading at different margins shifts consolidated gross and operating margins through **mix alone**. A high-volume, low-margin acquisition reduces group margins even where both businesses improve.\n\n**Financing.** If the acquisition was funded by **debt**, gearing and interest cover deteriorate for reasons of financing structure, not operations; if by a **share issue**, per-share measures are diluted.\n\n**Non-controlling interest.** Consolidated profit includes **100%** of the subsidiary's post-acquisition profit while only 70% is attributable to the parent's shareholders, so measures using total profit against parent equity are overstated.\n\n**What a user would need in order to assess underlying performance:**\n\n· the subsidiary's results for the **full year** and for the **pre-acquisition** period, so the six-month contribution can be stripped out\n· **Denholm Co's own single-entity** financial statements, which show what the original business did\n· **segmental or divisional** analysis separating the acquired operation from the existing one\n· details of the **fair value adjustments** and the additional depreciation they cause\n· a **pro-forma** comparative prepared as though the acquisition had taken place at the start of the comparative period — the standard way of restoring comparability\n· the **cash and financing** effect of the acquisition, to judge the change in gearing on its own terms\n\n**Conclusion.** The 45% increase is not evidence of organic growth and should not be presented as such. Until the subsidiary's contribution is separated out, the only defensible statement is that the group is larger — not that it is performing better.",
    earns: [
      "Identifying the period mismatch as the root cause and deriving the specific distortions from it",
      "Explaining the full-denominator against half-numerator problem in ROCE and asset turnover",
      "Distinguishing growth by acquisition from organic growth and challenging the directors' claim",
      "Covering the distortions that survive time-apportionment — fair values, goodwill, mix, financing, NCI",
      "Answering the second half of the requirement with specific information a user should request",
    ],
    loses: [
      "Answering only why the comparison fails and never saying what would fix it",
      "Writing generally about the limitations of ratio analysis without reference to the acquisition",
      "Missing that the statement of financial position is consolidated in full while profit is time-apportioned",
    ],
  },

  "FR-32::associates-and-nci": {
    title: "Associates, non-controlling interest and group ratios",
    format: "ot",
    marks: 2,
    requirement:
      "A group's consolidated statement of financial position includes an investment in an associate accounted for under the equity method, and the consolidated statement of profit or loss includes a share of the associate's profit presented after operating profit.\n\nWhich treatment gives the most meaningful return on capital employed for the group?\n\nA  Exclude the investment in the associate from capital employed, and exclude the share of the associate's profit from the return\nB  Include the investment in capital employed, and exclude the share of the associate's profit from the return\nC  Include the investment in capital employed, and include the associate's full revenue in the group's revenue\nD  Exclude the investment from capital employed, but include the share of the associate's profit in operating profit",
    plan: [
      {
        step: "Establish what each statement contains for an associate",
        detail:
          "The statement of financial position carries ONE line — the equity-accounted investment. The statement of profit or loss carries ONE line — the share of profit — presented AFTER operating profit. The associate's revenue, assets and liabilities appear nowhere.",
      },
      {
        step: "Test ROCE for consistency between numerator and denominator",
        detail:
          "Operating profit EXCLUDES the associate. If the investment were left in capital employed, the denominator would include capital that generates none of the numerator, and ROCE would be understated for a purely presentational reason.",
      },
      {
        step: "Choose the consistent pairing",
        detail:
          "Strip both out: exclude the investment from capital employed and the share of profit from the return. What remains measures the return the group earns on the operations it actually controls, which is what ROCE is for. The alternative consistent treatment — include both — is defensible, but mixing them is not.",
      },
      {
        step: "Note the parallel distortion caused by the non-controlling interest",
        detail:
          "Consolidated profit includes 100% of each subsidiary's results, but equity attributable to the parent's owners excludes the NCI. Return on equity computed as total profit ÷ parent equity is therefore OVERSTATED, and the fix is the same discipline: use profit attributable to the owners of the parent against their equity.",
      },
    ],
    answer:
      "**A — exclude the investment from capital employed and the share of profit from the return.**\n\nAn associate appears in the consolidated statements as **two single lines**:\n\n· statement of financial position — the **equity-accounted investment**\n· statement of profit or loss — the **share of the associate's profit**, presented **after** operating profit\n\nIts revenue, assets and liabilities are **never** added line by line, because the group does not control it.\n\n**The consistency test decides the answer.** ROCE puts **operating profit** over **capital employed**. Operating profit contains **none** of the associate's result. So leaving the investment inside capital employed places capital in the denominator that produces nothing in the numerator, and the group's ROCE is **understated** for a reason that is entirely presentational.\n\nThe consistent treatments are:\n\n| Treatment | Verdict |\n|---|---|\n| Exclude investment, exclude share of profit | **Consistent** — measures the return on operations the group controls |\n| Include investment, include share of profit in the return | Consistent, and defensible if the associate is significant |\n| Include investment, exclude share of profit | **Inconsistent** — understates ROCE |\n\n**The non-controlling interest creates the mirror-image problem.** Consolidated profit includes **100%** of each subsidiary's results, but equity attributable to the **owners of the parent** excludes the non-controlling interest. Return on equity computed as total profit ÷ parent equity is therefore **overstated**, and the correction is the same discipline: use **profit attributable to the owners of the parent** against **their** equity.\n\n**Gearing carries the same trap.** Consolidated borrowings include **100%** of every subsidiary's debt, including debt in a subsidiary the group owns only 60% of — so group gearing can look high relative to the parent's own exposure, and there is no guarantee that cash in one subsidiary is available to service borrowings in another.\n\n**Why the other options are there:** **C** consolidates the associate's revenue, which the equity method never does. **D** promotes the share of profit into operating profit, which misstates the group's operating performance. **B** is the specific inconsistency this question exists to catch.",
    earns: [
      "Testing numerator and denominator for consistency rather than recalling a rule",
      "Knowing an associate contributes one line to each statement and no revenue at all",
      "Extending the same discipline to return on equity and the non-controlling interest",
    ],
    loses: [
      "Leaving the investment in capital employed while the associate's profit sits outside operating profit",
      "Adding the associate's revenue into group revenue",
    ],
  },

  /* ── FR-33 · Limitations and specialised entities ───────────────── */

  "FR-33::limitations": {
    title: "The limitations of the statements, and of the ratios built on them",
    format: "written",
    marks: 10,
    requirement:
      "A prospective investor has calculated a full set of ratios from Ashwell Co's most recent published financial statements and intends to rely on them in deciding whether to invest.\n\nDiscuss the limitations of this analysis. (10 marks)",
    plan: [
      {
        step: "Budget to five developed points, and split them into two groups",
        detail:
          "Limitations of the FINANCIAL STATEMENTS themselves, and limitations of the RATIOS built on them. The two-group structure is worth having because it stops the answer becoming a list and shows the reader you know these are different problems.",
      },
      {
        step: "Lead with the one that undermines everything else",
        detail:
          "The statements are HISTORICAL. They report a period that has ended and a position at one past date, while the investor is making a decision about the future. Every other limitation is a refinement of this one.",
      },
      {
        step: "Cover comparability, which is where accounting policy bites",
        detail:
          "Different depreciation lives and methods, revaluation versus cost, different year ends, and estimates throughout. Two entities with identical operations can report materially different ratios. Add that a single year gives no trend and one entity gives no benchmark.",
      },
      {
        step: "Cover what the statements do not contain at all",
        detail:
          "The workforce, the customer base, the brand, the order book, management quality, and the state of the market. Most of what determines whether an investment succeeds is absent from the numbers by design, because it fails the recognition criteria.",
      },
      {
        step: "Cover manipulation and the timing of the year end",
        detail:
          "Window dressing — delaying payables, accelerating despatches, deferring capital expenditure — and a year end deliberately set after a seasonal peak. Both make the position at one date unrepresentative of the year, and neither is an accounting error.",
      },
    ],
    answer:
      "**The statements are historical, and the decision is about the future.** They report a period that has closed and a position at one past date. An investor is buying future returns, and past performance is evidence about the future rather than a measure of it. Published statements are also **out of date by the time they are available** — often several months old — during which the business may have changed materially.\n\n**Accounting policy choice destroys comparability.** Depreciation methods and useful lives, the revaluation model against the cost model, inventory valuation, and the estimates embedded in provisions and impairments all vary between entities. Two companies with identical operations and identical cash flows can report materially different profit, ROCE and gearing. The revaluation case is the sharpest: an entity that revalues reports **lower ROCE and lower gearing** than one that does not, on the same assets. A ratio difference between two companies may therefore measure nothing but a difference in policy.\n\n**One year and one company give neither a trend nor a benchmark.** A ratio is meaningless in isolation — it needs a **prior period**, a **competitor**, or an **industry average** to be interpreted. A current ratio of 1.4 is comfortable in one industry and alarming in another. A single set of statements supports very little.\n\n**The most important information is not in the statements at all.** The quality of management, the skill and stability of the workforce, the strength of the brand, customer concentration, the order book, the regulatory environment and the competitive position are largely **absent** — internally generated goodwill and brands fail the recognition criteria and so never appear. For most investments these factors matter more than any ratio, and the analysis is silent on all of them.\n\n**The figures can be flattered, entirely within the rules.** **Window dressing** at the year end — delaying supplier payments, pressing customers to settle early, accelerating despatches, deferring capital expenditure — improves the ratios on the one day they are measured. A year end set just after a **seasonal peak** shows low inventory and high cash that are unrepresentative of the rest of the year. Neither is an accounting error, and neither is visible from the statements alone.\n\n**Two further cautions worth a mark each.** Ratios based on **year-end** balances (inventory, receivables, capital employed) use a single day to characterise a year, and averages would be better where the information exists. And in periods of **inflation**, comparing figures across years compares different units of measurement, which overstates growth.\n\n**Conclusion.** The ratios are a useful starting point that identifies the **questions** worth asking, but they are not a basis for the decision on their own. The investor should seek several years of statements, industry comparatives, the cash flow statement, segmental information, and non-financial information about the market and management.",
    earns: [
      "Separating limitations of the statements from limitations of the ratios",
      "Using the revaluation example to make the comparability point concrete",
      "Identifying what is excluded by the recognition criteria, not just what is uncertain",
      "Covering window dressing and seasonality as legitimate but distorting",
      "Concluding with what the investor should do instead, rather than stopping at criticism",
    ],
    loses: [
      "Listing ten limitations in one line each, when the marks are for developed points",
      "Writing only about ratios and ignoring the statements they are built on",
      "Offering no conclusion, which the requirement verb 'discuss' expects",
    ],
  },

  "FR-33::not-for-profit": {
    title: "Assessing entities that do not exist to make a profit",
    format: "ot",
    marks: 2,
    requirement:
      "Which of the following would be MOST appropriate for assessing the performance of a charity that provides meals to homeless people?\n\nA  The cost per meal provided, together with measures of the number of people reached and the outcomes achieved\nB  Return on capital employed and net asset turnover\nC  Earnings per share and the price/earnings ratio\nD  Gross profit margin and dividend cover",
    plan: [
      {
        step: "Start from the entity's objective, because that is what performance means",
        detail:
          "A charity does not exist to generate a return for owners — it has no owners and distributes no profit. Performance means delivering its objectives with the resources donated to it, so any ratio whose numerator is profit measures the wrong thing.",
      },
      {
        step: "Eliminate everything that presumes shareholders or profit",
        detail:
          "EPS, P/E and dividend cover all require shares, share prices and distributions, none of which exist. ROCE requires a profit that the entity is not trying to make. All three are the wrong family before any judgement about usefulness is needed.",
      },
      {
        step: "Apply the value for money framework",
        detail:
          "ECONOMY — inputs obtained at the lowest reasonable cost. EFFICIENCY — output per unit of input, here the cost per meal. EFFECTIVENESS — whether the objective was actually achieved, here whether people were fed and their circumstances improved. The three Es are the examinable framework.",
      },
      {
        step: "Note why effectiveness is the hard one, since that earns the extra mark",
        detail:
          "Economy and efficiency are measurable in money. Effectiveness usually is not — outcomes are qualitative, delayed, and attributable to many causes at once. Recognising that the hardest measure is the most important one is the point of the topic.",
      },
    ],
    answer:
      "**A — cost per meal, with measures of reach and outcomes.**\n\nA not-for-profit entity exists to **deliver objectives**, not to generate a return for owners. It has no shareholders, makes no distributions, and does not seek profit — so every profit-based and share-based measure asks a question the entity is not trying to answer.\n\nPerformance is assessed instead through **value for money**, conventionally the **three Es**:\n\n| | Question | For this charity |\n|---|---|---|\n| **Economy** | Are inputs obtained at the lowest reasonable cost? | Cost of food, premises and staff per period |\n| **Efficiency** | How much output per unit of input? | **Cost per meal provided**; meals per volunteer hour; the proportion of donations spent on charitable activity rather than administration |\n| **Effectiveness** | Was the objective actually achieved? | Number of people reached, meals to those in genuine need, and **outcomes** — whether people's circumstances improved |\n\n**Effectiveness is the most important and the hardest to measure.** Economy and efficiency reduce to money and can be tracked precisely. Outcomes are **qualitative**, often **delayed**, and rarely attributable to one organisation. The risk this creates is real: an entity that manages what it can measure will optimise cost per meal — which can be improved by serving cheaper and less nutritious food, damaging effectiveness while the efficiency measure improves.\n\n**The same reasoning applies to public sector entities**, which is why the three Es framework is used there too.\n\n**Why the other options are there:** **B** requires a profit the entity does not seek and capital employed that is largely donated. **C** requires shares and a share price, neither of which exists. **D** requires a gross margin from trading and dividends that are never paid.",
    earns: [
      "Reasoning from the entity's objective rather than reaching for a familiar ratio",
      "Naming and applying economy, efficiency and effectiveness",
      "Explaining why effectiveness is hardest to measure, and the risk that creates",
    ],
    loses: [
      "Applying shareholder ratios to an entity with no shareholders",
      "Stopping at cost per meal, which is efficiency only, and never addressing effectiveness",
    ],
  },

  /* ── FR-34 · Employability and technology skills in the CBE ─────── */

  "FR-34::layout": {
    title: "Laying out a constructed response the marker can mark",
    format: "written",
    marks: 20,
    requirement:
      "Prepare the consolidated statement of financial position for Prendale Co as at 31 December 20X5. (20 marks)\n\nYour answer will be prepared in the CBE spreadsheet and word processor. Marks are available for the standard consolidation workings as well as for the figures presented on the face of the statement.",
    plan: [
      {
        step: "Build the workings as separate, numbered, labelled blocks — before the statement",
        detail:
          "W1 group structure, W2 net assets, W3 goodwill, W4 non-controlling interest, W5 group retained earnings. Each carries its own marks. A marker awarding method marks needs to SEE the method; a face figure with no visible derivation earns only the mark for that figure, and nothing if it is wrong.",
      },
      {
        step: "Cross-reference every derived figure on the face back to its working",
        detail:
          "Write 'Goodwill (W3) 500'. It takes two characters and it tells the marker exactly where to look. Without it, a marker with a wrong figure on the face has nowhere to award follow-through credit, and every mark that depended on it is lost.",
      },
      {
        step: "Put one figure on one line, and never combine in your head",
        detail:
          "'Retained earnings 3,852' with a working showing 3,500 + 400 − 48 earns the marks in that working. The same 3,852 arrived at mentally earns one mark if right and nothing if wrong — and a single arithmetic slip then destroys everything downstream.",
      },
      {
        step: "Use own figures consistently, and say that you are",
        detail:
          "Marking is on the OWN-FIGURE principle: a wrong number carried consistently into later workings still earns the later marks. That only works if the marker can follow the number, which is what the cross-references and labels are for. Never abandon a working because you doubt a figure inside it.",
      },
      {
        step: "State assumptions in one line rather than agonising over them",
        detail:
          "Where the question is genuinely ambiguous, write the assumption, apply it, and move on. An assumption stated and applied consistently is credited; five minutes lost deciding is five minutes not spent earning marks elsewhere.",
      },
    ],
    answer:
      "**What a script that marks well physically looks like.**\n\n**Workings first, numbered and labelled, each with a heading:**\n\n**W1 Group structure** — Prendale Co 80%; non-controlling interest 20%; acquired 1 January 20X5\n\n**W2 Net assets of the subsidiary** — two columns, at acquisition and at the reporting date, with fair value adjustments in both and a total at the foot of each\n\n**W3 Goodwill** — consideration, plus NCI at fair value, less net assets at acquisition (W2), giving goodwill; then impairment; then the carrying amount\n\n**W4 Non-controlling interest** — NCI at acquisition, plus its share of post-acquisition profits (W2), less its share of impairment (W3)\n\n**W5 Group retained earnings** — the parent's own, plus its share of post-acquisition profits (W2), less its share of impairment (W3)\n\n**Then the face of the statement, with every derived figure cross-referenced:**\n\n| | $'000 |\n|---|---|\n| Goodwill **(W3)** | 500 |\n| Property, plant and equipment (4,200 + 2,600 + 200 FV adj) | 7,000 |\n| ... | |\n| Retained earnings **(W5)** | 3,852 |\n| Non-controlling interest **(W4)** | 648 |\n\n**Five rules that convert knowledge into marks:**\n\n**1. Workings are marked in their own right.** A goodwill working laid out as four labelled lines earns its method marks even when a figure inside it is wrong. The identical arithmetic done mentally, producing one number on the face, earns one mark if correct and **nothing** if not.\n\n**2. Cross-reference everything derived.** '(W3)' costs two characters and tells the marker where the figure came from. Without it, follow-through credit cannot be given, because the marker cannot see that your wrong figure was used **consistently**.\n\n**3. One figure, one line, with the addition visible.** Write '(4,200 + 2,600 + 200)', not the total alone. If the total is wrong, the components still show correct method.\n\n**4. Own figures are credited.** Marking follows the own-figure principle: a wrong figure carried consistently into later workings still earns the later marks. So never abandon a working because you suspect an error earlier — carry the number forward and keep going.\n\n**5. State assumptions and move on.** One line — 'Assumed the fair value adjustment relates to land and is therefore not depreciated' — is credited where the question is genuinely ambiguous. Deliberating is not.\n\n**What loses marks despite correct technical knowledge:** unlabelled workings the marker cannot identify; figures on the face with no visible derivation; several calculations combined into one cell; abandoning a part-finished working; and leaving the presentation until last and running out of time, so the workings exist but the statement does not.",
    earns: [
      "Numbered, labelled workings presented before the statement",
      "Cross-references from every derived face figure back to its working",
      "Component figures shown so method survives an arithmetic error",
      "Consistent use of own figures, which is how follow-through marks are earned",
      "Assumptions stated in a line and applied consistently",
    ],
    loses: [
      "Presenting only final figures, so a single slip costs every dependent mark",
      "Unlabelled or uncross-referenced workings the marker cannot connect to the statement",
      "Abandoning a working part-way because an earlier figure looks wrong",
    ],
  },

  "FR-34::spreadsheet-discipline": {
    title: "Spreadsheet discipline that saves marks and minutes",
    format: "written",
    marks: 15,
    requirement:
      "Prepare the statement of cash flows for Ravensworth Co for the year ended 31 December 20X5, using the indirect method. (15 marks)\n\nYour answer must be prepared in the CBE spreadsheet.",
    plan: [
      {
        step: "Use formulas rather than typed results, from the first cell",
        detail:
          "Type '=130+180-150' rather than '160'. When a figure changes — and in a cash flow question one figure usually changes several workings — the spreadsheet recalculates and no other cell has to be found and edited by hand. This is the single largest time saving available in the exam.",
      },
      {
        step: "One figure per cell, and label every row",
        detail:
          "Combining three numbers into one cell hides the method from the marker and hides an error from you. A labelled row with one figure is markable on its own, and it is the spreadsheet equivalent of a legible working.",
      },
      {
        step: "Lay the workings out in a block below or beside the statement, and reference them",
        detail:
          "Build W1 to W5 in their own area, then have the face of the statement REFERENCE those cells rather than repeat the numbers. One source for each figure means it cannot appear as two different amounts in two places — which is otherwise a very common and very visible error.",
      },
      {
        step: "Show negatives in a way the marker cannot misread",
        detail:
          "Brackets or a consistent minus sign, applied the same way throughout. A cash flow statement is a mixture of inflows and outflows, and an ambiguous sign is read as an error even when the underlying thinking was right.",
      },
      {
        step: "Check the proof the statement provides, before time runs out",
        detail:
          "The three sections must sum to the movement in cash. Build that check into a cell with a formula. If it does not agree, a working is wrong — and finding it costs far less than the marks lost by submitting a statement that visibly does not balance.",
      },
    ],
    answer:
      "**The CBE spreadsheet is marked on what it displays, and it is the fastest tool in the exam if it is used properly.**\n\n**1. Formulas, never typed results.** Enter `=130+180-150` for tax paid, not `160`. In a cash flow question a single revised figure typically feeds three or four workings; with formulas the spreadsheet recalculates every one of them, and with typed constants each has to be found and re-keyed under time pressure. The marker sees the same displayed value either way, so this costs nothing and saves minutes.\n\n**2. One figure per cell, every row labelled.** A cell containing three combined numbers hides the method from the marker and hides an arithmetic error from you. A labelled row with one figure is markable in its own right — the spreadsheet equivalent of a legible working.\n\n**3. Workings in their own block, referenced by the statement.** Build the workings — property, plant and equipment additions, tax paid, dividends paid, the disposal, the share issue — in a labelled area, then have the face of the statement **reference those cells** (`=B14`) rather than retype the figures. One source per figure makes it impossible for the same item to appear as two different amounts in two places.\n\n**4. Consistent, unambiguous negatives.** Brackets or a minus sign, applied the same way throughout. A statement of cash flows mixes inflows and outflows on adjacent rows, and an ambiguous sign reads as an error even when the thinking was correct.\n\n**5. Build the proof into the sheet.** The three sections must total the movement in cash and cash equivalents. Put that check in a cell as a formula against the opening and closing balances. It costs one row and it tells you immediately whether a working is wrong, while there is still time to find it.\n\n**6. Label the columns.** Where a working has an 'at acquisition' and an 'at reporting date' column, or a current and comparative year, head them. An unheaded pair of columns forces the marker to infer which is which, and inference is not something a marker owes you.\n\n**What this is really protecting.** Section C questions are marked on **method** as much as on the final figure, and the own-figure principle means a wrong number carried consistently still earns later marks. Both depend entirely on the marker being able to **see and follow** the calculation. A spreadsheet of bare constants with no labels forfeits both protections, however good the underlying accounting was.",
    earns: [
      "Formulas rather than typed constants, so a revision recalculates everything",
      "One figure per labelled cell, keeping each row independently markable",
      "A referenced workings block, so no figure exists in two places",
      "A built-in proof that the statement agrees to the movement in cash",
    ],
    loses: [
      "Typing calculated results, then having to re-key several cells when one figure changes",
      "Combining several calculations into one cell, hiding both the method and any error",
      "Inconsistent negatives, which read as mistakes",
    ],
  },

  "FR-34::structure-and-time": {
    title: "Structuring a written answer and managing the clock",
    format: "written",
    marks: 20,
    requirement:
      "(a) Calculate ratios for Lammermuir Co for both years that would assist a prospective lender. (8 marks)\n(b) Using those ratios and the information in the scenario, comment on Lammermuir Co's performance and position, and advise the lender. (12 marks)",
    plan: [
      {
        step: "Convert marks into minutes before writing, and write the times down",
        detail:
          "1.8 minutes a mark. Twenty marks is 36 minutes: about 14 on part (a) and 22 on part (b). Note the clock time each part must END. A part-time budget written on the screen is the only thing that reliably stops the calculation half from consuming the discussion half.",
      },
      {
        step: "Never let part (a) overrun into part (b)",
        detail:
          "Ratios are worth about half a mark each; commentary about two marks a point. Time moved from (b) to (a) is traded at roughly four to one AGAINST you. When the 14 minutes are up, stop calculating even if a ratio is unfinished, and start writing.",
      },
      {
        step: "Answer the requirement verb that was actually set",
        detail:
          "CALCULATE wants figures. COMMENT wants movement plus cause plus consequence. ADVISE wants a recommendation — a lender asked for advice must be told whether to lend, and on what terms. An answer with no recommendation cannot score the advice marks however good the analysis is.",
      },
      {
        step: "Use headings and short paragraphs, one point each",
        detail:
          "Head the sections — Profitability, Liquidity, Gearing, Advice — so the marker can find each point immediately. One point per paragraph, opening with the point itself. Markers work from a marking guide organised by point; a dense block of prose forces them to hunt, and anything they cannot find is not credited.",
      },
      {
        step: "Write something for every part, even a thin something",
        detail:
          "The first marks in any part are the easiest in the exam and the last are the hardest. Three points in an unstarted part beat a fourth and fifth point in a part already answered. An unattempted part scores zero with certainty.",
      },
      {
        step: "Reserve the last two minutes for the conclusion, not for polish",
        detail:
          "A closing recommendation that answers the question asked is worth more than an extra ratio or a tidied sentence. If time is short, write the conclusion FIRST and fill in the evidence afterwards.",
      },
    ],
    answer:
      "**Time is the constraint this question is really testing, and it is arithmetic.**\n\n**1.8 minutes per mark.** Twenty marks = **36 minutes**: about **14 minutes on part (a)** and **22 on part (b)**. Write the finishing time for each part on screen before starting. Almost every failed Section C interpretation answer fails the same way — the calculations felt productive, they ran long, and the discussion that carries most of the marks was written in the last four minutes.\n\n**The exchange rate between the two parts is brutal.** In part (a) a ratio is worth roughly **half a mark**. In part (b) a developed point is worth about **two**. Time moved from (b) into (a) is therefore traded at roughly **four to one against you**. When the fourteen minutes are gone, stop — even mid-ratio — and start writing.\n\n**Answer the verb that was set.**\n\n| Verb | What earns the marks |\n|---|---|\n| **Calculate** | The figures, with formulas shown |\n| **Comment on** | Movement + cause + consequence, for each point |\n| **Explain** | Why, not what |\n| **Discuss** | Both sides, then a conclusion |\n| **Advise** | A **recommendation** — the decision the user asked for |\n\nPart (b) here ends with **advise the lender**. An answer that analyses beautifully and never says whether to lend forfeits those marks. State the recommendation, and make it conditional if the evidence is mixed: *'Lend, but secured on the freehold property and subject to a covenant on interest cover, because cover has fallen from 18 to 6 times in one year.'*\n\n**Structure so the marker can find each point.** Head the sections — **Profitability**, **Liquidity and working capital**, **Gearing and the lender's position**, **Advice**. One point per short paragraph, with the point in the opening sentence and the evidence after it. Markers work from a guide organised by point; anything they have to hunt for may not be credited, and a dense unbroken block makes them hunt for everything.\n\n**Breadth beats depth across parts.** The first marks in any part are the easiest available and the last are the hardest. Three quick points in a part not yet started are worth more than a fourth and fifth point in one already answered. An unattempted part is a guaranteed zero — the only guaranteed thing in the exam.\n\n**Keep the last two minutes for the conclusion.** A closing recommendation that directly answers the question is worth more than an extra ratio or a tidier sentence. If time is running out, **write the conclusion first** and add the supporting evidence above it — a conclusion with thin evidence scores; full evidence with no conclusion does not.",
    earns: [
      "Converting marks to minutes and holding the split between the parts",
      "Recognising that discussion marks are worth roughly four times calculation marks per minute",
      "Answering the requirement verb, including giving an explicit recommendation where asked to advise",
      "Headings and one-point paragraphs, so every point is findable",
      "Attempting every part rather than perfecting one",
    ],
    loses: [
      "Overrunning on the calculations and leaving the commentary unwritten",
      "Analysing thoroughly but never stating the recommendation the lender asked for",
      "Writing a single dense block in which individual points cannot be identified",
      "Leaving a part unattempted, which guarantees zero for it",
    ],
  },
}
