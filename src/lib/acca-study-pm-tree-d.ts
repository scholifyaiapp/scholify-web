import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * PM · Area D, first part — budgetary systems, quantitative analysis in budgeting, and
 * learning curves.
 * Chapters 20–22 of the PM reading tree, mapped to syllabus groups D1–D2.
 *
 * Area D is the largest in PM and the most calculation-dense: five of its nine chapters are
 * variances. These first three build what the variances are computed AGAINST — the budget
 * itself, and the forecasting techniques that produce the figures in it. Chapter 22's
 * learning curve is the one that reappears in Section C most often, because it changes the
 * standard cost that every later variance is measured from.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 20 · D1 ──────────────────────────────────────────── */

export const PM_TREE_20: StudyChapter = {
  id: "PM-20",
  number: 20,
  paper: "PM",
  area: "D",
  title: "Budgetary systems and types of budget",
  minutes: 17,
  syllabusRefs: ["D1(a)", "D1(b)", "D1(c)", "D1(d)"],
  intro:
    "A budget does four jobs that pull against each other — planning, control, motivation and evaluation — and most budgeting failures are the result of one system being asked to do all four at once.",
  outcomes: [
    "Explain the purposes of budgeting and the tension between them",
    "Distinguish incremental, zero-based, activity-based, rolling and flexible budgets",
    "Explain top-down and bottom-up preparation and their behavioural consequences",
    "Explain budgetary slack, and how a budget can distort behaviour",
    "Recommend a budgetary system for a described organisation",
  ],
  sections: [
    {
      id: "purposes",
      heading: "What a budget is for, and why the purposes conflict",
      blocks: [
        {
          kind: "table",
          caption: "The purposes of budgeting",
          head: ["Purpose", "What it requires of the budget"],
          rows: [
            ["**Planning**", "A **realistic** forecast, so resources can be committed sensibly"],
            ["**Coordination**", "Consistency between functions — sales, production, purchasing and cash agreeing with each other"],
            ["**Communication**", "That managers know what is expected and why"],
            ["**Authorisation**", "A limit on spending, so a budget is also permission"],
            ["**Motivation**", "A target that is **demanding** — an easy target motivates nobody"],
            ["**Control**", "A benchmark to compare actual results against"],
            ["**Evaluation**", "A **fair** basis on which to judge a manager"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The central tension, which most budgeting questions are really about",
          md: "**Planning wants a realistic figure. Motivation wants a demanding one. Evaluation wants a fair one.** These cannot all be the same number. A budget set at a stretch level motivates but overstates what will actually happen, so cash and capacity plans built on it are wrong. A budget set at the expected outcome plans well but motivates nobody. And judging a manager against a stretch target is unfair, because missing it was the likely outcome all along. The practical resolutions are to run **two figures** — an expectations budget for planning and a target budget for motivation — or to evaluate managers on **variances they controlled** rather than on hitting the total (chapter 28).",
        },
        {
          kind: "table",
          caption: "The types of budget",
          head: ["Type", "How it works", "Strengths", "Weaknesses"],
          rows: [
            ["**Incremental**", "Last year's figures adjusted for inflation and known changes", "Cheap, quick, stable, easy to understand", "**Perpetuates existing inefficiency** — last year's waste is built into next year's base. Discourages challenge"],
            ["**Zero-based (ZBB)**", "Every activity justified from nothing each cycle, as a decision package, then ranked and funded to the available resource", "Forces justification, removes legacy waste, allocates to priorities", "**Very costly in management time**, can favour those who argue well, and hard to apply to essential activities"],
            ["**Activity-based (ABB)**", "Budget the cost drivers, then the activities they cause (chapter 5)", "Links cost to what causes it, so it flexes properly with activity", "Needs a working ABC system, and much overhead is not genuinely driver-related"],
            ["**Rolling (continuous)**", "Continually extended — as one period closes another is added, so a full horizon is always budgeted", "Always current; suits **volatile** conditions and forces regular reforecasting", "Costly to prepare repeatedly, and managers can lose the sense of an annual target"],
            ["**Flexible**", "Restated at the **actual** activity level for control purposes", "Makes variances **meaningful** by removing volume effects", "Requires a reliable split of fixed and variable cost"],
            ["**Fixed**", "Set at one activity level and not restated", "Fine for **planning** and for authorising expenditure", "**Useless for control** if activity differs from plan, because every variance mixes volume with performance"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Flexing the budget is what makes a variance mean anything",
          md: "Comparing actual cost at 11,000 units against a fixed budget set for 10,000 units produces an adverse variance that says nothing — of course cost was higher, more was made. Control requires the budget to be **flexed** to the actual activity level, so that the comparison isolates **performance** from **volume**. That is why almost every variance question begins by restating the budget, and why a scenario presenting a fixed-budget comparison is usually inviting you to say the comparison is invalid.",
        },
      ],
      check: {
        q: "Actual cost was £58,000 at 11,000 units against a fixed budget of £52,000 at 10,000 units. What can be concluded?",
        options: [
          "An adverse variance of £6,000, so cost control was poor",
          "Nothing until the budget is flexed to 11,000 units, since the comparison mixes volume with performance",
          "A favourable variance, because more units were produced",
          "The budget was set too low",
        ],
        correct: 1,
        explain:
          "NOTHING until the budget is FLEXED to 11,000 units. Comparing actual cost at one activity level with a budget set at another mixes the effect of volume with the effect of performance, so the £6,000 is uninterpretable. Flexing isolates performance, which is the whole point of a flexible budget.",
      },
    },
    {
      id: "behaviour",
      heading: "Preparation, participation and behaviour",
      blocks: [
        {
          kind: "table",
          caption: "Top-down against bottom-up",
          head: ["", "Top-down (imposed)", "Bottom-up (participative)"],
          rows: [
            ["**Set by**", "Senior management, then communicated down", "Operational managers, then consolidated and reviewed"],
            ["**Speed**", "**Fast**", "Slow — several iterations"],
            ["**Goal congruence**", "**Strong** — aligned to strategy by construction", "Weaker; local optimisation may not serve the whole"],
            ["**Realism of detail**", "Weaker — those setting it may not know operational reality", "**Stronger** — set by people who know the work"],
            ["**Motivation and ownership**", "**Low.** A target handed down is resisted", "**High.** Managers own a figure they helped set"],
            ["**Budgetary slack**", "Little opportunity", "**Considerable** — the main drawback"],
            ["**Suits**", "Crisis, tight time, inexperienced managers, or where strategy must dominate", "Stable conditions, capable managers, and where commitment matters most"],
          ],
        },
        {
          kind: "definition",
          term: "Budgetary slack",
          md: "Deliberately **overstating costs or understating revenues** when preparing a budget, so that the target is easier to meet. It is the predictable consequence of letting the people who will be **judged** against a budget also **set** it — so it is a symptom of the evaluation/motivation conflict rather than simply dishonesty.",
        },
        {
          kind: "list",
          title: "How budgets distort behaviour, and what to do about it",
          items: [
            "**Slack**, as above. Countered by independent review, benchmarking, and asking for the assumptions rather than only the totals.",
            "**Spending to the budget** near year end so the allocation is not cut next year — the classic consequence of incremental budgeting. Countered by rolling budgets or by not penalising underspend.",
            "**Short-termism**: cutting maintenance, training or development to hit this year's figure (chapter 29). Countered by non-financial measures and a longer horizon.",
            "**Gaming the measure** — hitting the number in ways that damage the business, such as shipping unfinished work to book revenue.",
            "**Dysfunctional decisions** where a manager optimises their own budget at the expense of the whole, which is the transfer pricing problem (chapter 32).",
            "**Demotivation** where a target is either impossible or trivially easy: motivation is highest where a target is demanding but achievable.",
          ],
        },
        {
          kind: "example",
          title: "Recommending a budgetary system",
          scenario:
            "Wistanton Group has three divisions. Support Services has budgeted by adding 4% to last year's figures for eleven years; its costs have risen faster than activity and nobody can say what several of its cost centres do. Digital operates in a market where prices change monthly and last year's annual budget was irrelevant by month four; its managers are experienced. Manufacturing produces steady volumes, but its variance reports compare actual results with the original fixed budget, and the production manager dismisses them as meaningless. Every budget is prepared by the finance team and issued to divisions in March.",
          steps: [
            { label: "Support Services", detail: "Eleven years of INCREMENTAL budgeting has embedded whatever waste existed in year one, and nobody knowing what some cost centres do is the diagnostic symptom. ZERO-BASED BUDGETING is the answer: require each activity to justify itself as a decision package, rank them, and fund to the available resource. Name its cost — it is heavy in management time — and suggest applying it to discretionary support activities rather than the whole group." },
            { label: "Digital", detail: "An annual budget cannot work where prices move monthly. ROLLING BUDGETS: reforecast each month or quarter and extend the horizon, so the budget is always current. Its cost is repeated preparation, which is affordable because the managers are experienced." },
            { label: "Manufacturing", detail: "The production manager is RIGHT. Comparing actual results with a FIXED budget mixes volume with performance, so the variances are genuinely meaningless. Introduce FLEXIBLE budgeting — restate the budget at actual activity before computing variances — which needs a reliable fixed/variable cost split." },
            { label: "The group-wide preparation problem", detail: "Everything is prepared by finance and IMPOSED. That explains the manufacturing manager's disengagement and probably a good deal of resistance elsewhere: a target handed down is not owned. Move to PARTICIPATIVE preparation with finance reviewing, especially in Digital where the managers are experienced." },
            { label: "Name the risk that change creates", detail: "Participation invites BUDGETARY SLACK. Counter it by reviewing the assumptions rather than the totals, benchmarking between divisions, and — importantly — evaluating managers on the variances they CONTROLLED rather than on hitting a total figure (chapter 28)." },
            { label: "State the general point", detail: "No single system suits all three divisions, and recommending one group-wide method would be wrong. The system must fit the VOLATILITY of the environment and the NATURE of the cost: discretionary support cost suits ZBB, volatile markets suit rolling budgets, and steady production needs flexing for control." },
          ],
          result:
            "**ZBB for Support Services, rolling budgets for Digital, flexible budgeting for Manufacturing**, and participative preparation throughout with slack controls. The examinable point is that **one group-wide system would be wrong** — the method has to match the volatility of the environment and the type of cost.",
        },
      ],
      check: {
        q: "A division has budgeted incrementally for a decade and nobody can say what several cost centres do. Which system addresses that?",
        options: [
          "Flexible budgeting, to make variances meaningful",
          "Zero-based budgeting, which requires each activity to justify itself from nothing",
          "Rolling budgets, to keep the figures current",
          "Top-down imposition, to control the total",
        ],
        correct: 1,
        explain:
          "ZERO-BASED BUDGETING. Incremental budgeting embeds the original inefficiency in every subsequent base, and activities nobody can explain are the diagnostic symptom. ZBB forces each to be justified as a decision package and ranked — at a real cost in management time, which is worth saying.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Comparing actual results with a fixed budget and calling the difference a performance variance.",
      fix: "Flex the budget to actual activity first, or the variance mixes volume with performance.",
    },
    {
      trap: "Recommending one budgetary system for a whole group.",
      fix: "Match the method to the volatility of the environment and the type of cost.",
    },
    {
      trap: "Recommending participation without naming the slack risk.",
      fix: "Bottom-up budgeting invites budgetary slack; say how it will be controlled.",
    },
    {
      trap: "Recommending ZBB without naming its cost.",
      fix: "It is very heavy in management time, so it suits discretionary cost rather than everything.",
    },
    {
      trap: "Treating the budget's purposes as compatible.",
      fix: "Planning wants realism, motivation wants stretch, evaluation wants fairness — and they cannot be the same figure.",
    },
  ],
  keyTerms: [
    { term: "Incremental budgeting", def: "Last period's figures adjusted for known changes; cheap but perpetuates existing inefficiency." },
    { term: "Zero-based budgeting", def: "Every activity justified from nothing as a decision package, then ranked and funded." },
    { term: "Activity-based budgeting", def: "Budgeting the cost drivers and then the activities they cause." },
    { term: "Rolling budget", def: "Continually extended as periods close, keeping a full horizon always budgeted." },
    { term: "Flexible budget", def: "Restated at actual activity, so variances isolate performance from volume." },
    { term: "Budgetary slack", def: "Deliberately overstating cost or understating revenue to make a target easier to meet." },
  ],
  summary: [
    "Budgets serve planning, coordination, communication, authorisation, motivation, control and evaluation, and those purposes conflict.",
    "Planning wants realism, motivation wants stretch and evaluation wants fairness, so one figure cannot serve all three.",
    "Incremental budgeting embeds waste; ZBB removes it at heavy cost in management time.",
    "Rolling budgets suit volatile conditions; flexible budgets are what make variances meaningful.",
    "Bottom-up budgeting buys ownership and realism at the price of budgetary slack.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can one budget figure not serve planning, motivation and evaluation?", a: "Planning needs a realistic expectation, motivation needs a demanding stretch, and evaluation needs a fair benchmark — three different numbers." },
    { q: "Why must a budget be flexed before variances are computed?", a: "Because comparing actual results at one activity level with a budget set at another mixes volume effects with performance." },
    { q: "What symptom points to zero-based budgeting?", a: "Years of incremental budgeting with costs rising faster than activity, and activities nobody can justify or explain." },
    { q: "What is the price of participative budgeting, and how is it controlled?", a: "Budgetary slack — controlled by reviewing assumptions rather than totals, benchmarking, and evaluating managers on controllable variances." },
  ],
}

/* ── Chapter 21 · D2(a)–(c) ───────────────────────────────────── */

export const PM_TREE_21: StudyChapter = {
  id: "PM-21",
  number: 21,
  paper: "PM",
  area: "D",
  title: "Quantitative analysis in budgeting and forecasting",
  minutes: 18,
  syllabusRefs: ["D2(a)", "D2(b)", "D2(c)"],
  intro:
    "Before a budget can be set, the cost behaviour and the demand pattern have to be estimated. Three techniques do it — high-low, regression and time series — and each embeds assumptions that decide how much the resulting budget is worth.",
  outcomes: [
    "Separate fixed and variable cost using the high-low method, including with a step",
    "Explain and apply linear regression, and interpret the correlation coefficient",
    "Explain the components of a time series and calculate a trend",
    "Apply additive and multiplicative seasonal adjustment",
    "Explain the limitations of each technique for budgeting",
  ],
  sections: [
    {
      id: "high-low-regression",
      heading: "High-low and regression",
      blocks: [
        {
          kind: "formula",
          name: "The high-low method",
          expr: "Variable cost per unit  =  (Cost at highest activity  −  Cost at lowest activity)  ÷  (Highest activity  −  Lowest activity)\n\nFixed cost  =  Total cost at either level  −  (Variable cost per unit  ×  that activity level)\n\nThen:  Total cost  =  Fixed cost  +  (Variable cost per unit  ×  activity)",
          note: "Use the highest and lowest ACTIVITY levels, not the highest and lowest COSTS — they are usually the same records but not always, and choosing by cost is a common error. Where a STEP in fixed cost occurs between the two levels, adjust one of them onto the same fixed-cost basis before dividing, otherwise the step is wrongly spread across the variable rate.",
        },
        {
          kind: "example",
          title: "High-low with a step in fixed cost",
          scenario:
            "Ombersley Ltd reports: 4,000 units — total cost £74,000; 6,500 units — total cost £101,500; 9,000 units — total cost £141,000. Fixed costs step up by £8,000 once activity exceeds 7,000 units. The budget for next period is 8,200 units.",
          steps: [
            { label: "Identify the highest and lowest ACTIVITY levels", detail: "Lowest 4,000 units at £74,000; highest 9,000 units at £141,000. Note 9,000 is above the 7,000 step and 4,000 is below it, so the two are not on the same fixed-cost basis." },
            { label: "Put both onto the same basis", detail: "Remove the step from the high point: £141,000 − £8,000 = £133,000 as it would have been on the LOW fixed-cost basis. Failing to do this is the error the step is there to catch." },
            { label: "Compute the variable cost per unit", detail: "(£133,000 − £74,000) / (9,000 − 4,000) = £59,000 / 5,000 = £11.80 per unit." },
            { label: "Compute the fixed cost below the step", detail: "Using the low point: £74,000 − (4,000 × £11.80) = £74,000 − £47,200 = £26,800." },
            { label: "Check against the middle observation", detail: "At 6,500 units (below the step): £26,800 + (6,500 × £11.80) = £26,800 + £76,700 = £103,500 against actual £101,500 — a £2,000 difference, so the relationship is close but not perfectly linear. Worth noting rather than ignoring." },
            { label: "Budget for 8,200 units", detail: "8,200 is ABOVE the 7,000 step, so fixed cost is £26,800 + £8,000 = £34,800. Total = £34,800 + (8,200 × £11.80) = £34,800 + £96,760 = £131,560." },
          ],
          result:
            "**Variable £11.80 a unit, fixed £26,800 rising to £34,800 above 7,000 units, budget £131,560.** The step had to be removed before dividing and added back afterwards — spreading it across the variable rate would have overstated variable cost by £1.60 a unit.",
        },
        {
          kind: "formula",
          name: "Linear regression and correlation",
          expr: "y  =  a  +  bx     where y = total cost (or demand) and x = activity\n\nb  =  [ nΣxy  −  ΣxΣy ]  ÷  [ nΣx²  −  (Σx)² ]\n\na  =  (Σy  ÷  n)  −  b(Σx  ÷  n)\n\nr  =  [ nΣxy  −  ΣxΣy ]  ÷  √{ [ nΣx²  −  (Σx)² ] [ nΣy²  −  (Σy)² ] }",
          note: "Provided in the exam. b is the variable cost per unit and a the fixed cost — the same two figures high-low produces, but using EVERY observation rather than two. r runs from −1 to +1: near ±1 means a strong linear relationship, near 0 means none. r² — the coefficient of determination — is the proportion of the variation in y EXPLAINED by x, so r = 0.9 means r² = 0.81, or 81% explained.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why regression beats high-low, and what neither can do",
          md: "High-low uses **two observations and discards the rest**, so a single unusual month at either extreme distorts the whole answer. Regression uses **all** the data and also produces **r**, which tells you whether the relationship is strong enough to rely on — high-low offers no such warning and looks equally confident on good and bad data. But neither escapes the shared limits: both assume a **linear** relationship, both extrapolate **outside the observed range** at the user's risk, both use **historic** data to forecast the future, and a high **r** shows correlation and **not causation** (chapter 4).",
        },
      ],
      check: {
        q: "Costs are £74,000 at 4,000 units and £141,000 at 9,000 units. Fixed costs step up £8,000 above 7,000 units. What is the variable cost per unit?",
        options: ["£13.40", "£11.80", "£12.20", "£15.70"],
        correct: 1,
        explain:
          "£11.80. The step must be removed from the HIGH point first — £141,000 − £8,000 = £133,000 — before dividing, because otherwise the £8,000 is spread across the 5,000-unit range and inflates the variable rate. (£133,000 − £74,000)/5,000 = £11.80. Ignoring the step gives £13.40.",
      },
    },
    {
      id: "time-series",
      heading: "Time series analysis",
      blocks: [
        {
          kind: "table",
          caption: "The four components of a time series",
          head: ["Component", "What it is"],
          rows: [
            ["**Trend (T)**", "The underlying long-term movement, upwards or downwards"],
            ["**Seasonal variation (S)**", "A **regular, repeating** short-term pattern within the year — quarterly or monthly"],
            ["**Cyclical variation (C)**", "Longer-term fluctuation with the economic cycle, over several years"],
            ["**Random or residual (R)**", "Irregular, unpredictable movement with no pattern"],
          ],
        },
        {
          kind: "formula",
          name: "The two models",
          expr: "ADDITIVE model:        Y  =  T  +  S  +  C  +  R\n   Seasonal variations are absolute amounts and SUM TO ZERO across the cycle\n   Forecast  =  Trend  +  Seasonal variation\n\nMULTIPLICATIVE model:  Y  =  T  ×  S  ×  C  ×  R\n   Seasonal variations are index factors AVERAGING 1 (or summing to 4 for quarters, 12 for months)\n   Forecast  =  Trend  ×  Seasonal factor",
          note: "Choose the multiplicative model where the seasonal swing GROWS with the trend — which is the usual commercial case, since a busy quarter is typically a percentage above trend rather than a fixed amount. Use additive where the swing is a constant amount regardless of the level. The check on the arithmetic is that additive variations sum to zero and multiplicative factors average 1.",
        },
        {
          kind: "example",
          title: "Forecasting with a trend and seasonal factors",
          scenario:
            "Bredicot Ltd's quarterly sales trend is described by T = 4,200 + 85q, where q is the quarter number counted from quarter 1 of year 1. Seasonal factors on the multiplicative model are: Q1 0.82, Q2 0.95, Q3 1.08, Q4 1.15. The company needs a forecast for all four quarters of year 5, and the sales director asks how much confidence to place in it.",
          steps: [
            { label: "Check the seasonal factors are internally consistent", detail: "0.82 + 0.95 + 1.08 + 1.15 = 4.00, so they average 1.00 across the four quarters. If they had not summed to 4 they would need adjusting first — a useful check the exam rewards." },
            { label: "Find the quarter numbers for year 5", detail: "Year 1 is q = 1 to 4, so year 5 is q = 17, 18, 19 and 20. Miscounting q is the commonest error in the topic." },
            { label: "Compute the trend for each quarter", detail: "q=17: 4,200 + 85(17) = 4,200 + 1,445 = 5,645. q=18: 5,730. q=19: 5,815. q=20: 5,900." },
            { label: "Apply the seasonal factors", detail: "Q1: 5,645 × 0.82 = 4,629. Q2: 5,730 × 0.95 = 5,444. Q3: 5,815 × 1.08 = 6,280. Q4: 5,900 × 1.15 = 6,785. Total year 5 forecast = 23,138 units." },
            { label: "Sense-check the total", detail: "The average trend across the year is (5,645 + 5,900)/2 = 5,772.5, and since the factors average 1 the annual total should be about 4 × 5,772.5 = 23,090 — close to 23,138, the small difference arising because the trend rises through the year. A check like this catches a misapplied factor." },
            { label: "Answer the confidence question honestly", detail: "The model assumes the TREND CONTINUES LINEARLY and the SEASONAL PATTERN REPEATS, both extrapolated four years beyond the data. It ignores CYCLICAL movement entirely, contains no allowance for RANDOM variation, and takes no account of competitor action, price changes or new products. So it is a reasonable base for a budget but should be sensitised (chapter 19), and the further out the forecast, the weaker it is." },
          ],
          result:
            "**Q1 4,629, Q2 5,444, Q3 6,280, Q4 6,785 — 23,138 for the year.** Two checks did real work: the factors summing to 4, and the annual total reconciling to four times the mid-year trend. The confidence answer matters as much as the figures, because the model extrapolates four years past its data.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The limitations of forecasting for budgeting, and how to answer them",
          md: "Every technique here shares four weaknesses, and a question asking about reliability wants them named rather than listed generically. **Historic data** may not describe the future, especially after a structural change — a new competitor, a new technology, a change in regulation. **Extrapolation beyond the observed range** is unsupported by the data, and the further out, the less supported. **Linearity** is assumed by high-low, regression and a linear trend alike, when real cost and demand curves bend. And a strong statistical fit is **not causation**. The constructive response is not to abandon the forecast but to **sensitise** it, state the assumptions, and use rolling budgets (chapter 20) so it is corrected as reality arrives.",
        },
      ],
      check: {
        q: "Quarterly seasonal factors are 0.82, 0.95, 1.08 and 1.15. What confirms they are internally consistent?",
        options: [
          "They are all positive",
          "They sum to 4.00, so they average 1.00 across the cycle",
          "The highest is less than 1.2",
          "They increase through the year",
        ],
        correct: 1,
        explain:
          "They SUM TO 4.00 and therefore average 1.00 across four quarters, which is the requirement for MULTIPLICATIVE factors. On the ADDITIVE model the equivalent check is that the variations sum to ZERO. Factors that fail the check must be adjusted before use.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Choosing the high and low points by cost rather than by activity.",
      fix: "Use the highest and lowest ACTIVITY levels.",
    },
    {
      trap: "Ignoring a step in fixed cost between the two points.",
      fix: "Put both observations on the same fixed-cost basis before dividing, then add the step back for a budget above it.",
    },
    {
      trap: "Miscounting the quarter number in a trend equation.",
      fix: "Year 5 quarter 1 is q = 17, not q = 1 or q = 5.",
    },
    {
      trap: "Adding a multiplicative seasonal factor, or multiplying an additive variation.",
      fix: "Additive variations are added; multiplicative factors are multiplied. Check that they sum to zero or average 1 respectively.",
    },
    {
      trap: "Reading a high correlation coefficient as proof of causation.",
      fix: "It shows a strong linear association only, and r² gives the proportion of variation explained.",
    },
  ],
  keyTerms: [
    { term: "High-low method", def: "Estimating variable cost from the highest and lowest activity levels; uses two observations only." },
    { term: "Linear regression", def: "Fitting y = a + bx using every observation, giving fixed cost a and variable cost b." },
    { term: "Correlation coefficient (r)", def: "A measure from −1 to +1 of the strength of a linear relationship." },
    { term: "Coefficient of determination (r²)", def: "The proportion of variation in y explained by variation in x." },
    { term: "Trend", def: "The underlying long-term movement in a time series." },
    { term: "Seasonal variation", def: "A regular repeating within-year pattern, additive as an amount or multiplicative as a factor." },
  ],
  summary: [
    "High-low uses the highest and lowest activity levels, and a step in fixed cost must be removed before dividing.",
    "Regression uses every observation and also reports r, which high-low cannot.",
    "A time series has trend, seasonal, cyclical and random components.",
    "Additive variations sum to zero and are added; multiplicative factors average 1 and are multiplied.",
    "All the techniques assume linearity and use historic data, so forecasts should be sensitised and stated with their assumptions.",
  ],
  knowledgeDiagnostic: [
    { q: "How is a step in fixed cost handled in high-low?", a: "Put both observations onto the same fixed-cost basis before dividing, then add the step back when budgeting above it." },
    { q: "What does regression give that high-low does not?", a: "It uses every observation rather than two, and reports r, so the strength of the relationship is known." },
    { q: "When should the multiplicative model be preferred?", a: "Where the seasonal swing grows with the trend, which is the usual commercial case." },
    { q: "What checks confirm seasonal figures are consistent?", a: "Additive variations sum to zero; multiplicative factors average 1, so quarterly factors sum to 4." },
    { q: "Name the four shared limitations of these forecasting techniques.", a: "Historic data may not describe the future, extrapolation beyond the range is unsupported, linearity is assumed, and correlation is not causation." },
  ],
}

export const PM_TREE_AREA_D_PART1: StudyChapter[] = [PM_TREE_20, PM_TREE_21]
