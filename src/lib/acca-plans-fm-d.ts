/*
 * FM Area D — investment appraisal.
 *
 * One of FM's two Section C questions is reliably NPV-based. The long plans in
 * this file therefore work to the mark allocation and preserve each method mark
 * in a labelled spreadsheet row. FM supplies its formulae sheet and present
 * value/annuity tables: candidates are taught which factor and cash flow to use,
 * not rewarded for memorising what the exam hands them.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FM_PLANS_D: ExamPlanMap = {
  /* ── FM-09 · Payback and return on capital employed ───────────────────── */

  "FM-09::payback": {
    title: "Finding payback inside a year without averaging blindly",
    format: "ot",
    marks: 2,
    requirement:
      "A project costs $1,000,000 and generates cash inflows of $300,000, $400,000, $350,000 and $250,000 in years 1 to 4 respectively. Assuming flows arise evenly within each year, what is the payback period?\n\nA 2.57 years\nB 2.86 years\nC 3.00 years\nD 3.20 years",
    plan: [
      {
        step: "Build the cumulative cash column",
        detail:
          "After year 1 the project has recovered $300,000 and after year 2 $700,000. Payback lies in year 3 because the unrecovered balance is then smaller than that year's $350,000 inflow.",
      },
      {
        step: "Use only the crossing year's cash flow",
        detail:
          "At the start of year 3, $300,000 remains. Divide this by year 3's $350,000 inflow, not by an average annual inflow and not by the year 4 amount.",
      },
      {
        step: "Name the timing assumption",
        detail:
          "The fractional year is valid only because the requirement says flows arise evenly. If cash arrived at year ends, payback would be three years rather than 2.86.",
      },
    ],
    answer:
      "**B — 2.86 years.** Cumulative inflows are $300,000 after year 1 and $700,000 after year 2, leaving **$300,000** unrecovered. The fraction of year 3 is $300,000/$350,000 = **0.857**. Payback is therefore **2.857 years**, approximately 2 years 10 months. **A** uses an average or wrong denominator, **C** ignores the even-flow assumption and rounds to the year end, and **D** crosses into year 4 unnecessarily. Payback uses cash flows but ignores their time value and every cash flow after recovery.",
    earns: [
      "Building cumulative cash flow to locate the crossing year",
      "Dividing the unrecovered $300,000 by year 3's $350,000 inflow",
    ],
    loses: [
      "Dividing by an average inflow despite uneven annual amounts",
      "Rounding to three years after the stem permits within-year apportionment",
    ],
  },

  "FM-09::roce": {
    title: "Calculating ROCE from accounting profit and average investment",
    format: "ot",
    marks: 2,
    requirement:
      "A four-year project costs $800,000, has a residual value of $80,000 and generates average annual operating cash flow of $260,000. Straight-line depreciation is used. What is the project's return on capital employed based on average investment?\n\nA 10.0%\nB 18.2%\nC 20.0%\nD 59.1%",
    plan: [
      {
        step: "Convert cash flow into accounting profit",
        detail:
          "Annual depreciation is ($800,000 − $80,000)/4 = $180,000. Average accounting profit is therefore $260,000 cash flow less $180,000 depreciation = $80,000.",
      },
      {
        step: "Use average rather than initial investment",
        detail:
          "With straight-line depreciation, average investment is (initial cost + residual value)/2 = ($800,000 + $80,000)/2 = $440,000.",
      },
      {
        step: "Keep profit and capital definitions aligned",
        detail:
          "ROCE is average accounting profit divided by average investment. Using cash flow in the numerator or initial cost in the denominator produces plausible but conceptually mixed distractors.",
      },
    ],
    answer:
      "**B — 18.2%.** Depreciation is ($800,000 − $80,000)/4 = **$180,000** a year, so average accounting profit is $260,000 − $180,000 = **$80,000**. Average investment is ($800,000 + $80,000)/2 = **$440,000**. ROCE = $80,000/$440,000 = **18.18%**. **A** divides profit by initial cost. **D** uses cash flow over average investment. **C** arises from an inconsistent capital base. ROCE's accounting definitions are exactly why it can conflict with NPV.",
    earns: [
      "Deducting straight-line depreciation to obtain accounting profit",
      "Using initial plus residual over two as average investment",
    ],
    loses: [
      "Using cash flow rather than accounting profit in the numerator",
      "Dividing by initial cost when the requirement specifies average investment",
    ],
  },

  "FM-09::using-them-together": {
    title: "Using payback and ROCE without overruling NPV",
    format: "written",
    marks: 10,
    requirement:
      "A board requires every project to pay back within three years and earn a 20% ROCE. Discuss the usefulness and limitations of these methods and explain how they should be used alongside NPV. (10 marks)",
    plan: [
      {
        step: "Split the marks across both methods and NPV",
        detail:
          "Give a benefit and at least two limitations for payback, the same for ROCE, then explain the decision hierarchy. A one-sided list cannot satisfy a discussion requirement.",
      },
      {
        step: "Link payback to liquidity and exposure",
        detail:
          "Fast recovery matters under capital scarcity, obsolescence or political risk. But ordinary payback ignores time value and all post-payback cash, so the three-year cutoff can reject a wealth-creating long-life project.",
      },
      {
        step: "Link ROCE to reporting and behaviour",
        detail:
          "ROCE is familiar and comparable with accounting targets, but depends on depreciation and profit policies, averages across time and has no explicit risk or time-value adjustment.",
      },
      {
        step: "Set the correct decision hierarchy",
        detail:
          "Use positive NPV as the wealth-maximising rule, with payback as a liquidity/risk screen and ROCE as a reporting measure. If constraints are absolute, quantify the value sacrificed rather than pretending the methods agree.",
      },
    ],
    answer:
      "**Payback** is simple, uses cash rather than accounting profit and highlights liquidity and how long capital remains exposed. It is useful where finance is scarce or technology may become obsolete. Ordinary payback ignores the time value of money and every cash flow after the cutoff. Its arbitrary three-year rule can prefer a short project with little value over a long project with a large positive NPV. Discounted payback fixes time value before recovery but still ignores later cash.\n\n**ROCE** is familiar to managers, links to reported performance and can be compared with divisional targets. However, it uses accounting profit, so depreciation, asset valuation and averaging affect it. It treats early and late profits alike, contains no explicit risk adjustment and may encourage rejection of a project that earns more than the cost of capital but less than the division's current ROCE.\n\n**NPV** should be the primary rule because it uses incremental cash flows, discounts timing and risk through the required return and measures expected wealth added directly. Payback can supplement it as a liquidity and exposure indicator; ROCE can describe reported performance. The board should investigate a conflict, not let arbitrary cutoffs overrule a positive NPV without identifying the strategic or financing constraint and the value forgone.",
    earns: [
      "Balancing a practical use and limitations for both payback and ROCE",
      "Explaining discounted payback's remaining post-cutoff weakness",
      "Positioning NPV as the primary wealth rule and the other methods as supplements",
    ],
    loses: [
      "Claiming payback accounts for every project cash flow",
      "Treating ROCE as a cash-flow return independent of accounting policy",
      "Saying the board should average the three results rather than resolve their different objectives",
    ],
  },

  /* ── FM-10 · Discounted cash flow: NPV and IRR ────────────────────────── */

  "FM-10::npv": {
    title: "Building an NPV from relevant cash flows only",
    format: "written",
    marks: 20,
    requirement:
      "A four-year project requires equipment costing $2.0 million and working capital of $250,000 now. Forecast operating cash inflows before opportunity cost are $700,000, $850,000, $900,000 and $750,000. The project uses land that could be rented for $80,000 a year. Equipment will be sold for $200,000 and working capital fully recovered at year 4. A $90,000 survey has already been paid; head office will allocate $50,000 a year but total head-office cash cost will not change. The required return is 10%.\n\n(a) Calculate the project NPV. (12 marks)\n(b) Discuss the result and relevant assumptions. (8 marks)",
    plan: [
      {
        step: "Protect the 12 calculation, 8 discussion split",
        detail:
          "Use the spreadsheet for a year-by-year relevant-cash-flow table and leave time to evaluate the forecast. A flawless NPV with no discussion has a twelve-mark ceiling.",
      },
      {
        step: "Classify every disputed cash flow before discounting",
        detail:
          "Include equipment, working capital, operating cash and foregone rent. Exclude the paid survey as sunk, allocated overhead with no incremental cash and interest because financing is already reflected in the discount rate.",
      },
      {
        step: "Keep terminal flows in their own rows",
        detail:
          "At year 4 add operating cash, disposal proceeds and full working-capital recovery. Keeping them separate prevents discounting the recovery for the wrong number of years or forgetting it entirely.",
      },
      {
        step: "Select provided PV factors, then foot the table",
        detail:
          "FM gives present value tables on screen. Pull the 10% factor for years 1–4, multiply the correct net cash flow, and reconcile total PV inflows less the $2.25m time-zero investment to NPV.",
      },
      {
        step: "Derive discussion from the calculation",
        detail:
          "Challenge operating forecasts, land opportunity cost, terminal values, working-capital recovery and the risk-adjusted 10% rate; use sensitivity and strategic fit before recommending acceptance.",
      },
    ],
    answer:
      "**Relevant cash flows ($000)**\n\nThe $90 survey is **sunk**; the $50 annual allocation is **not incremental**; interest is excluded because it is represented by the 10% discount rate. Foregone rent is an **opportunity cost**.\n\n| Year | 0 | 1 | 2 | 3 | 4 |\n|---|---:|---:|---:|---:|---:|\n| Equipment | (2,000) | — | — | — | 200 |\n| Working capital | (250) | — | — | — | 250 |\n| Operating inflow | — | 700 | 850 | 900 | 750 |\n| Foregone rent | — | (80) | (80) | (80) | (80) |\n| **Net cash flow** | **(2,250)** | **620** | **770** | **820** | **1,120** |\n| PV factor at 10% | 1.0000 | 0.9091 | 0.8264 | 0.7513 | 0.6830 |\n| **Present value** | **(2,250.0)** | **563.6** | **636.3** | **616.1** | **765.0** |\n\nTotal PV of future flows = **$2,581.0k**; NPV = $2,581.0k − $2,250.0k = **+$331.0k**. Accept on financial grounds because expected shareholder wealth rises by about $331,000.\n\nThe conclusion depends on incremental cash-flow forecasts and the 10% rate matching project risk. Test sales/cost sensitivity and scenarios, confirm the land really can earn $80,000 after tax and that disposal proceeds and working capital are recoverable. Consider capacity, environmental and strategic effects not captured in the table. The common wrong answer includes sunk or allocated costs, omits opportunity cost, adds interest as a cash outflow, or discounts the year-4 recovery for a fifth year. None should replace the labelled relevant-flow route.",
    earns: [
      "Twelve-mark spreadsheet separating initial, operating, opportunity and terminal cash flows",
      "Excluding sunk survey, non-incremental allocation and financing interest for the right reasons",
      "Using the provided year-specific 10% factors and reconciling to +$331,000",
      "Eight-mark discussion based on forecast, terminal-value and discount-rate assumptions",
    ],
    loses: [
      "Including the already-paid survey or an overhead allocation with no cash change",
      "Ignoring the $80,000 foregone rent because no invoice is paid",
      "Adding interest to cash flows and also discounting at a financing rate",
      "Completing only the NPV and accepting the twelve-mark ceiling",
    ],
  },

  "FM-10::irr": {
    title: "Estimating IRR and knowing when it can mislead",
    format: "mtq",
    marks: 10,
    requirement:
      "A project costs $1,000,000 and returns $400,000 at each year end for four years. Its NPV is $35,600 at 20% and minus $55,200 at 25%. Calculate the IRR by interpolation, state the decision at a 19% cost of capital, and explain three limitations of IRR. (10 marks)",
    plan: [
      {
        step: "Bracket the zero before interpolating",
        detail:
          "IRR lies between rates giving NPVs with opposite signs. Keep the positive and negative signs visible; interpolating between two positive NPVs cannot locate a zero.",
      },
      {
        step: "Weight the five-point rate interval",
        detail:
          "Start at 20% and add the fraction 35.6/(35.6 + 55.2) of the 5% gap. Use absolute distance to zero in the denominator rather than subtracting a negative twice.",
      },
      {
        step: "Apply the hurdle rule",
        detail:
          "Accept an independent conventional project when IRR exceeds its required return. Do not use the IRR ranking to choose between mutually exclusive projects where scale and timing differ.",
      },
      {
        step: "Name limitations that explain an NPV conflict",
        detail:
          "Discuss multiple or no IRRs with non-conventional flows, the reinvestment assumption, mutually exclusive scale/timing conflicts and interpolation error. NPV remains the wealth measure.",
      },
    ],
    answer:
      "IRR ≈ 20% + [$35,600 / ($35,600 + $55,200)] × (25% − 20%) = **21.96%, approximately 22.0%**. Since 22.0% exceeds the 19% cost of capital, accept the independent project; equivalently, its NPV at 19% will be positive. FM supplies PV and annuity tables, so the exam skill is finding two sensible rates and interpolating their NPVs, not memorising factors.\n\nIRR can mislead. Non-conventional cash flows with more than one sign change can create **multiple IRRs** or none. IRR assumes intermediate cash can be reinvested at the IRR, often implausible for a very high-return project, whereas NPV assumes the cost of capital. For **mutually exclusive** projects, a high percentage on a small or early project can rank above a larger project that adds more wealth; NPV gives the correct value ranking. Finally, interpolation assumes a locally straight NPV profile and is approximate. Use IRR as a communication aid and hurdle check, but use NPV to choose value.",
    earns: [
      "Interpolating between opposite-sign NPVs to obtain about 22.0%",
      "Applying the 19% hurdle to an independent project",
      "Explaining multiple IRRs, reinvestment and mutually exclusive ranking conflicts",
    ],
    loses: [
      "Using 35.6/(35.6 − 55.2) and moving outside the bracket",
      "Rejecting because the cost of capital is below rather than above IRR",
      "Claiming IRR always gives the same project ranking as NPV",
    ],
  },

  "FM-10::assumptions": {
    title: "Defending the assumptions behind a DCF recommendation",
    format: "written",
    marks: 10,
    requirement:
      "Explain the main assumptions underlying discounted cash-flow appraisal and discuss how a finance manager should respond when those assumptions are doubtful. (10 marks)",
    plan: [
      {
        step: "Organise assumptions around cash, time and risk",
        detail:
          "Cover incremental cash-flow measurement, forecast timing and horizon, the discount rate, tax/inflation consistency, terminal values and capital availability. This is more usable than an unstructured list.",
      },
      {
        step: "State the decision consequence of each assumption",
        detail:
          "For example, end-year timing understates PV if receipts arrive evenly, a constant rate may ignore changing risk, and nominal/real mismatch systematically biases every discounted amount.",
      },
      {
        step: "Match uncertainty to a technique",
        detail:
          "Use sensitivity for one-variable break-even, scenarios for coherent combinations, probability/expected value for risk with estimable probabilities, simulation for interacting distributions and adjusted rates only where justified.",
      },
      {
        step: "Preserve judgement and review",
        detail:
          "Document sources, separate controllable from market assumptions, stage investment where possible and compare actual with forecast. Technique does not turn unreliable inputs into certainty.",
      },
    ],
    answer:
      "DCF assumes forecasts represent **incremental after-tax cash flows**: sunk costs and non-cash allocations are excluded, opportunity costs and working capital are included, and financing flows are not double-counted. It commonly assumes cash occurs at period ends, the forecast horizon and terminal value capture all consequences, and capital is available to take positive-NPV projects.\n\nThe discount rate must reflect the project's systematic risk and financing basis and is often assumed constant. Cash flows and rates must be consistent: nominal with nominal, real with real; after-tax cash with an after-tax rate. Tax rules, inflation rates, asset lives, residual values and working-capital recovery are themselves uncertain. Markets may be imperfect and strategic flexibility or external effects may not sit in the base table.\n\nManagement should source assumptions independently, reconcile them to operational capacity and document ownership. Sensitivity identifies the variables requiring most control; scenarios test coherent downside and upside cases; expected values and decision trees handle estimable probabilities; simulation models interacting distributions. Risk-adjusted rates or certainty equivalents must be applied consistently, not used to force a preferred answer. Staging, pilot investment and post-completion review preserve flexibility and improve later forecasts. NPV is a disciplined estimate of value, not a guarantee.",
    earns: [
      "Grouping assumptions around relevant cash flows, timing, inflation/tax and risk",
      "Explaining the directional consequence of a failed assumption",
      "Matching sensitivity, scenario, expected-value and simulation techniques to different uncertainty",
    ],
    loses: [
      "Listing assumptions without saying how they affect the appraisal",
      "Mixing nominal cash flows with a real rate or financing cash flows with WACC",
      "Presenting a complex model as a substitute for reliable inputs and review",
    ],
  },

  /* ── FM-11 · Tax and inflation in DCF ─────────────────────────────────── */

  "FM-11::tax": {
    title: "Placing capital-allowance tax relief in the correct year",
    format: "ot",
    marks: 2,
    requirement:
      "A machine costing $500,000 qualifies for 25% reducing-balance capital allowances. Corporation tax is 25% and is paid one year in arrears. Assuming sufficient taxable profit, what tax-saving cash flow arises from the first-year allowance, and when?\n\nA $31,250 at the end of year 1\nB $31,250 at the end of year 2\nC $125,000 at the end of year 2\nD $7,813 at the end of year 2",
    plan: [
      {
        step: "Calculate allowance before tax relief",
        detail:
          "The first-year capital allowance is 25% × $500,000 = $125,000. This is a deduction from taxable profit, not the cash benefit itself.",
      },
      {
        step: "Apply the tax rate once",
        detail:
          "Tax saved is $125,000 × 25% = $31,250. Multiplying by 25% twice produces $7,813; treating the allowance as cash produces $125,000.",
      },
      {
        step: "Apply the stated payment lag",
        detail:
          "The saving relates to year 1 but tax is paid one year in arrears, so the project cash flow occurs at the end of year 2 and must be discounted for two years.",
      },
    ],
    answer:
      "**B — $31,250 at the end of year 2.** First-year capital allowance = $500,000 × 25% = **$125,000**. Tax relief = $125,000 × 25% tax = **$31,250**. Because tax is paid one year in arrears, the year-1 allowance changes the tax cash flow at **year 2**. **A** ignores the lag, **C** treats the deduction as cash, and **D** applies the tax rate twice. In an NPV, the B amount uses the year-2 PV factor supplied on screen.",
    earns: [
      "Separating the $125,000 allowance from the $31,250 tax cash saving",
      "Moving the saving to year 2 because of the one-year tax lag",
    ],
    loses: [
      "Discounting the tax relief in year 1 despite the stated arrears basis",
      "Using the capital allowance itself as a project cash inflow",
    ],
  },

  "FM-11::inflation": {
    title: "Keeping nominal cash flows with the nominal discount rate",
    format: "mtq",
    marks: 10,
    requirement:
      "A project has current-price annual revenue of $500,000 and operating cost of $300,000. Revenue inflates at 4% and cost at 6%. The real required return is 8% and general inflation is 5%. Calculate nominal revenues, costs and net cash flows for years 1 to 3, calculate the nominal rate using Fisher, and state the consistency rule. (10 marks)",
    plan: [
      {
        step: "Inflate each cash-flow category separately",
        detail:
          "Revenue and cost have specific inflation rates, so compound $500,000 at 4% and $300,000 at 6% for the relevant year. Do not inflate the net $200,000 at general inflation.",
      },
      {
        step: "Use the Fisher relationship provided on screen",
        detail:
          "FM's formula sheet gives (1 + nominal) = (1 + real)(1 + inflation). Substitute 8% and 5%, retaining the cross-product rather than simply adding them.",
      },
      {
        step: "Match the nature of flows and rate",
        detail:
          "The separately inflated money cash flows are nominal and must be discounted at the nominal rate. Current-price real cash flows would instead use the real rate.",
      },
      {
        step: "Check the direction before accepting numbers",
        detail:
          "Costs inflate faster than revenue, so the nominal net margin grows only slowly and the percentage margin falls. A rapidly growing net cash flow signals that one category was inflated at the wrong rate.",
      },
    ],
    answer:
      "| Year | Revenue at 4% | Cost at 6% | Net cash flow |\n|---:|---:|---:|---:|\n| 1 | $500,000 × 1.04 = **$520,000** | $300,000 × 1.06 = **$318,000** | **$202,000** |\n| 2 | $500,000 × 1.04² = **$540,800** | $300,000 × 1.06² = **$337,080** | **$203,720** |\n| 3 | $500,000 × 1.04³ = **$562,432** | $300,000 × 1.06³ = **$357,305** | **$205,127** |\n\nUsing the Fisher relationship supplied on the FM formula sheet: (1 + n) = 1.08 × 1.05, so nominal required return **n = 13.4%**. The 13.0% distractor simply adds 8% and 5% and drops the interaction. These inflated cash flows are **nominal**, so discount them at **13.4%**. Discounting them at 8% overstates NPV. Alternatively keep every cash flow at current purchasing power and discount at 8%; never mix the two bases.",
    earns: [
      "Compounding revenue and cost at their own specific rates for each year",
      "Using the provided Fisher relationship to obtain 13.4%",
      "Stating nominal-with-nominal and real-with-real consistency",
    ],
    loses: [
      "Inflating the net cash flow at general inflation despite different component rates",
      "Adding real return and inflation to get 13.0%",
      "Discounting nominal flows at the 8% real rate",
    ],
  },

  "FM-11::full-layout": {
    title: "A taxed and inflated NPV with every timing trap visible",
    format: "written",
    marks: 20,
    requirement:
      "A four-year project buys a machine for $1.2 million now, with $200,000 residual value at year 4. Current-price annual revenue is $950,000 and operating cost $600,000; revenue inflates at 5% and cost at 3% from year 1. Working capital equals 10% of the following year's nominal revenue, invested as required and fully recovered at year 4. Capital allowances are 25% reducing balance, with a balancing allowance on disposal. Tax is 25%, paid one year in arrears, and the nominal required return is 12%.\n\n(a) Calculate the project NPV. (14 marks)\n(b) Discuss the decision and key risks. (6 marks)",
    plan: [
      {
        step: "Respect the 14 calculation, 6 discussion split",
        detail:
          "Build one clean spreadsheet with inflation, working capital, capital allowances, tax lag and discounting on separate rows. Then reserve time for the six discussion marks; calculation alone has a hard fourteen-mark ceiling.",
      },
      {
        step: "Inflate revenue and cost independently",
        detail:
          "Year 1 is current amount multiplied once: revenue ×1.05 and cost ×1.03. Compound each at its own rate through year 4; these are nominal flows and match the 12% nominal discount rate.",
      },
      {
        step: "Invest only incremental working capital",
        detail:
          "Place 10% of year-1 revenue at time zero, then only the increase required for the next year's revenue in years 1–3. Recover the full accumulated balance at year 4; charging the whole balance each year is the classic loss.",
      },
      {
        step: "Build capital allowances and tax on their own schedule",
        detail:
          "Take 25% reducing-balance allowances in years 1–3 and the balancing allowance in year 4. Taxable cash profit less allowance creates each tax amount, which is paid one year later — including year-4 tax at year 5.",
      },
      {
        step: "Foot nominal cash flow before selecting factors",
        detail:
          "Add operating flow, working-capital movement, disposal and the correctly lagged tax. Then pull year 1–5 factors from the provided 12% PV table and reconcile all PV rows to the final NPV.",
      },
      {
        step: "Derive six discussion marks from the fragile rows",
        detail:
          "Discuss differential inflation, sales volume, working-capital recovery, tax capacity, residual value and discount-rate risk; a small positive NPV needs sensitivity before a confident recommendation.",
      },
    ],
    answer:
      "**1. Nominal operating cash flows ($000)**\n\n| Year | 1 | 2 | 3 | 4 |\n|---|---:|---:|---:|---:|\n| Revenue: 950 × 1.05^n | 997.500 | 1,047.375 | 1,099.744 | 1,154.731 |\n| Cost: 600 × 1.03^n | (618.000) | (636.540) | (655.636) | (675.305) |\n| **Operating cash flow** | **379.500** | **410.835** | **444.108** | **479.426** |\n\n**2. Working capital ($000)**\n\nRequired balances are 10% of next year's revenue: **99.750 at year 0**, then increases of **4.988**, **5.237** and **5.499** in years 1–3. The full **115.473** is recovered in year 4. Only the increments are outflows.\n\n**3. Capital allowances and tax ($000)**\n\n| Tax year | 1 | 2 | 3 | 4 |\n|---|---:|---:|---:|---:|\n| Capital allowance | 300.000 | 225.000 | 168.750 | 306.250 balancing allowance |\n| Taxable profit | 79.500 | 185.835 | 275.358 | 173.176 |\n| Tax at 25% | 19.875 | 46.459 | 68.839 | 43.294 |\n| **Paid at** | **year 2** | **year 3** | **year 4** | **year 5** |\n\nThe year-4 balancing allowance is tax written-down value $506.250 less proceeds $200.000 = **$306.250**.\n\n**4. Project cash flow and NPV ($000)**\n\n| Year | 0 | 1 | 2 | 3 | 4 | 5 |\n|---|---:|---:|---:|---:|---:|---:|\n| Machine / proceeds | (1,200.000) | — | — | — | 200.000 | — |\n| Operating cash | — | 379.500 | 410.835 | 444.108 | 479.426 | — |\n| Working capital | (99.750) | (4.988) | (5.237) | (5.499) | 115.473 | — |\n| Tax paid one year late | — | — | (19.875) | (46.459) | (68.839) | (43.294) |\n| **Net cash flow** | **(1,299.750)** | **374.512** | **385.723** | **392.150** | **726.059** | **(43.294)** |\n| PV factor at 12% | 1.0000 | 0.8929 | 0.7972 | 0.7118 | 0.6355 | 0.5674 |\n| **Present value** | **(1,299.750)** | **334.386** | **307.496** | **279.125** | **461.424** | **(24.566)** |\n\n**NPV = +$58.115k.** The PV rows foot to this result. Accept on the base case, but the margin is only about 4.5% of the initial outlay. Test lower revenue, faster cost inflation, delayed or unrecovered working capital and residual value. Confirm the company has taxable profit to use allowances on schedule and that 12% reflects project risk. Paying tax in the same year, taxing cash flow before capital allowances, investing the whole working-capital balance annually or omitting the year-5 tax all produce plausible but wrong results.",
    earns: [
      "Fourteen-mark spreadsheet with inflation, working capital, allowance, tax and PV schedules separated",
      "Investing incremental working capital and recovering the full $115,473 in year 4",
      "Applying the one-year tax lag through the $43,294 year-5 payment",
      "Reconciling the provided-factor PV table to +$58,115",
      "Using six discussion marks to test the assumptions behind the narrow positive margin",
    ],
    loses: [
      "Applying tax in the operating year rather than one year in arrears",
      "Charging the entire working-capital balance every year instead of each increment",
      "Forgetting the balancing allowance, terminal recovery or year-5 tax",
      "Mixing the nominal cash flows with a real rate",
      "Writing no discussion and accepting the fourteen-mark ceiling",
    ],
  },

  /* ── FM-12 · Risk and uncertainty in appraisal ────────────────────────── */

  "FM-12::risk-uncertainty": {
    title: "Distinguishing measurable risk from uncertainty",
    format: "ot",
    marks: 2,
    requirement:
      "Which statement correctly distinguishes risk from uncertainty in investment appraisal?\n\nA Risk means every outcome is known with certainty, while uncertainty means outcomes vary\nB Risk permits probabilities to be estimated for outcomes, while uncertainty does not provide reliable probabilities\nC Sensitivity analysis converts uncertainty into risk by calculating an expected value\nD A project with a positive expected NPV contains no risk",
    plan: [
      {
        step: "Use probability as the dividing line",
        detail:
          "Under risk, possible outcomes and meaningful probabilities can be estimated from evidence or judgement. Under uncertainty, outcomes or probabilities cannot be specified reliably.",
      },
      {
        step: "Separate analysis tools from definitions",
        detail:
          "Expected value uses probabilities; sensitivity asks how far one input can change before NPV is zero. Neither makes unreliable probabilities reliable merely by calculation.",
      },
      {
        step: "Reject certainty from an average",
        detail:
          "A positive expected NPV is a probability-weighted mean and can coexist with loss outcomes. It supports a repeated or diversified decision but does not guarantee this project's result.",
      },
    ],
    answer:
      "**B — risk has estimable probabilities; uncertainty does not.** **A** wrongly turns risk into certainty. **C** confuses sensitivity with expected value: sensitivity calculates a break-even change one variable at a time and attaches no probability. **D** confuses an average with an assured outcome; a positive expected NPV may include a material probability of loss. The practical response differs: risk can use probabilities, expected values and decision trees, while deep uncertainty relies more on scenarios, sensitivity, flexibility and judgement.",
    earns: [
      "Using reliable probability estimates as the distinction",
      "Recognising that a positive expected value does not remove adverse outcomes",
    ],
    loses: [
      "Claiming sensitivity analysis supplies probabilities",
      "Treating expected NPV as the single outcome that will occur",
    ],
  },

  "FM-12::sensitivity": {
    title: "Calculating sensitivity and identifying the fragile variable",
    format: "mtq",
    marks: 10,
    requirement:
      "A project has a base-case NPV of $120,000. The present values of sales revenue, variable costs and fixed costs are $1,500,000, $900,000 and $300,000 respectively; initial investment is $800,000. Calculate the sensitivity of NPV to each item, identify the most sensitive variable and explain two limitations. (10 marks)",
    plan: [
      {
        step: "Use the NPV-to-variable relationship",
        detail:
          "Sensitivity is NPV divided by the present value of the relevant variable, expressed as a percentage. It measures the adverse change that eliminates NPV, not the variable's probability of changing.",
      },
      {
        step: "Use the correct direction for each variable",
        detail:
          "Sales must fall, while costs or investment must rise, to remove a positive NPV. The percentage magnitude is calculated the same way, but state the direction in the interpretation.",
      },
      {
        step: "Rank smallest percentage as greatest sensitivity",
        detail:
          "The least percentage movement required to reach zero NPV identifies the most fragile assumption. Do not rank by the largest present-value amount or the largest percentage.",
      },
      {
        step: "Keep sensitivity separate from likelihood",
        detail:
          "It changes one variable at a time, ignores correlation and gives no probability. Pair it with scenarios, probability analysis or simulation and management's assessment of controllability.",
      },
    ],
    answer:
      "| Variable | Break-even adverse change | Sensitivity |\n|---|---:|---:|\n| Sales revenue | $120,000/$1,500,000 | **8.0% fall** |\n| Variable costs | $120,000/$900,000 | **13.33% rise** |\n| Fixed costs | $120,000/$300,000 | **40.0% rise** |\n| Initial investment | $120,000/$800,000 | **15.0% rise** |\n\nSales revenue is the **most sensitive** because the smallest adverse change, 8%, removes the NPV. This does not prove sales is the most likely variable to move or that the project should be rejected. Sensitivity changes one input while holding the others fixed, although sales volume, variable cost and working capital may move together. It also provides no probability and can depend on broad aggregated variables. Use the result to focus validation and controls on revenue, then test coherent scenarios or probability distributions. The standard distractor selects fixed costs because 40% is the largest figure; that actually means the project is least sensitive to fixed cost.",
    earns: [
      "Calculating all four break-even percentages with the correct directions",
      "Selecting sales because 8% is the smallest adverse movement",
      "Explaining one-variable and no-probability limitations",
    ],
    loses: [
      "Choosing the largest sensitivity percentage as the greatest risk",
      "Dividing the variable PV by NPV and inverting every result",
      "Claiming the 8% result is the probability that revenue will fall",
    ],
  },

  "FM-12::expected-values": {
    title: "Using expected value without hiding downside risk",
    format: "written",
    marks: 10,
    requirement:
      "A project has possible NPVs of $400,000 under high demand (probability 0.30), $100,000 under normal demand (0.50) and minus $250,000 under low demand (0.20). Calculate and interpret expected NPV, and discuss other ways of assessing risk and uncertainty. (10 marks)",
    plan: [
      {
        step: "Reserve three marks for the expected-value table",
        detail:
          "Show outcome, probability and weighted NPV, check probabilities sum to one, and total the products. A naked calculator answer hides both method and downside.",
      },
      {
        step: "Interpret average and loss exposure separately",
        detail:
          "Expected NPV supports acceptance for a risk-neutral diversified decision, but there remains a 20% chance of losing $250,000. The expected value may be no actual outcome at all.",
      },
      {
        step: "Match other techniques to the question",
        detail:
          "Sensitivity finds break-even assumptions; scenarios preserve correlated inputs; decision trees handle sequential choices; simulation shows a distribution; risk-adjusted rates or certainty equivalents adjust appraisal for risk.",
      },
      {
        step: "Conclude with capacity and flexibility",
        detail:
          "Consider whether the company can bear the downside, how reliable the probabilities are and whether it can stage, abandon or pilot the project. Expected value does not decide risk appetite.",
      },
    ],
    answer:
      "| Demand | Probability | NPV $000 | Weighted NPV $000 |\n|---|---:|---:|---:|\n| High | 0.30 | 400 | 120 |\n| Normal | 0.50 | 100 | 50 |\n| Low | 0.20 | (250) | (50) |\n| **Expected NPV** | **1.00** | | **120** |\n\nExpected NPV is **+$120,000**, so a risk-neutral company with reliable probabilities would accept. But $120,000 is not one of the possible outcomes and there is a **20% probability of losing $250,000**. A small company unable to absorb that loss may rationally require mitigation even though the average is positive.\n\nSensitivity analysis shows the change in one input that makes NPV zero but gives no probability. Scenario analysis changes coherent groups of assumptions. A decision tree values sequential decisions and information; simulation produces a distribution from interacting variables. A risk-adjusted discount rate is simple but can penalise late cash heavily and hide which risk matters; certainty equivalents adjust cash flows explicitly but are difficult to estimate. The board should validate probabilities, assess loss capacity and use staging, pilot, abandonment or contracts to preserve flexibility before relying on the mean.",
    earns: [
      "A probability table that reconciles to +$120,000 expected NPV",
      "Separating the positive average from the 20% loss probability",
      "Comparing techniques by what information each adds",
    ],
    loses: [
      "Presenting $120,000 as the cash outcome the project will produce",
      "Ignoring the company's capacity to bear the $250,000 downside",
      "Listing risk techniques without distinguishing sensitivity, scenarios and probability analysis",
    ],
  },

  /* ── FM-13 · Lease or buy, replacement and capital rationing ──────────── */

  "FM-13::lease-buy": {
    title: "Comparing lease and buy at the after-tax borrowing rate",
    format: "written",
    marks: 20,
    requirement:
      "A four-year asset costs $500,000, has an $80,000 residual value and would incur $20,000 annual maintenance paid at each year end. It qualifies for 25% reducing-balance capital allowances, with a balancing allowance on disposal. Alternatively it can be leased for four rentals of $145,000 payable at the start of each year; the lessor maintains it. Tax is 25%, paid one year in arrears. The company's after-tax borrowing cost is 6%.\n\n(a) Compare the present value cost of leasing and buying. (12 marks)\n(b) Discuss relevant non-financial factors. (8 marks)",
    plan: [
      {
        step: "Keep the 12 calculation, 8 discussion split visible",
        detail:
          "Build two PV-cost columns and reserve time for ownership, flexibility and contract risk. A numerically perfect lease choice with no discussion cannot earn above twelve.",
      },
      {
        step: "Use the incremental financing rate",
        detail:
          "Discount lease-versus-buy cash flows at the after-tax borrowing cost because the choice is a financing substitution for the same asset. Do not use project WACC or IRR.",
      },
      {
        step: "Time lease rentals and relief separately",
        detail:
          "Rentals are in advance at years 0–3. Tax relief on each rental is received one year after the related tax period, here years 1–4. Do not net them at the same date before discounting.",
      },
      {
        step: "Build the buy tax schedule",
        detail:
          "Include cost, maintenance, residual value, maintenance tax relief, 25% allowances and the balancing allowance. With tax one year late, the final year-4 relief appears at year 5.",
      },
      {
        step: "Compare PV costs and then test the contract",
        detail:
          "Choose the lower PV cost, quantify the margin and discuss maintenance quality, use restrictions, cancellation, obsolescence, ownership flexibility, residual risk and balance-sheet/covenant effects.",
      },
    ],
    answer:
      "**Lease alternative ($000)**\n\nRentals of 145 occur at years 0, 1, 2 and 3. Tax relief of 36.25 occurs at years 1, 2, 3 and 4. At 6%:\n\nPV rentals = **$532.587k**; PV tax relief = **$125.610k**; net PV lease cost = **$406.977k**.\n\n**Buy alternative ($000)**\n\nCapital allowances are 125.000 in year 1, 93.750 in year 2, 70.313 in year 3 and a balancing allowance of 130.938 in year 4 (tax written-down value 210.938 less proceeds 80.000). Their tax reliefs, paid at years 2–5, are 31.250, 23.438, 17.578 and 32.734. Maintenance tax relief of 5.000 is also received in years 2–5.\n\n| Buy cash-flow component | PV cost/(saving) $000 |\n|---|---:|\n| Purchase now | 500.000 |\n| Maintenance, years 1–4 | 69.302 |\n| Maintenance tax relief, years 2–5 | (16.345) |\n| Capital-allowance tax relief, years 2–5 | (85.876) |\n| Residual value at year 4 | (63.367) |\n| **Net PV buy cost** | **403.714** |\n\nBuying is cheaper by **$3.263k**, so choose it on the stated financial assumptions. The rows reconcile to each alternative's total.\n\nThe margin is very small. Check that the lease includes equivalent maintenance and availability, the asset can be used as required, and there are no excess-use, damage, renewal or cancellation charges. Leasing transfers residual-value and obsolescence risk and preserves immediate cash, but may be inflexible and create dependence on the lessor. Buying gives control, modification rights and residual upside but carries maintenance and disposal risk and consumes borrowing capacity. Tax capacity, accounting presentation, covenants and the reliability of the $80,000 residual estimate can reverse the conclusion.",
    earns: [
      "Twelve-mark pair of PV-cost schedules using the 6% after-tax borrowing rate",
      "Timing rentals in advance and tax relief one year in arrears",
      "Including maintenance, allowances, balancing allowance and residual value in buy cost",
      "Reconciling to lease $406,977 versus buy $403,714",
      "Using eight discussion marks for contract, flexibility and residual-risk differences",
    ],
    loses: [
      "Discounting at WACC rather than the incremental after-tax borrowing rate",
      "Netting lease tax relief with each advance rental at the same date",
      "Forgetting year-5 tax relief or the residual value",
      "Choosing lease from the calculation without attempting the eight discussion marks",
    ],
  },

  "FM-13::replacement": {
    title: "Choosing unequal-life assets by equivalent annual cost",
    format: "mtq",
    marks: 10,
    requirement:
      "Machine A costs $120,000, lasts three years, costs $30,000 a year to run and has $15,000 residual value. Machine B costs $160,000, lasts five years, costs $22,000 a year to run and has $20,000 residual value. At 10%, calculate each present value cost and equivalent annual cost, and choose the replacement where service is required indefinitely. (10 marks)",
    plan: [
      {
        step: "Calculate each life-cycle PV cost",
        detail:
          "Add purchase price and PV of running costs, then subtract PV of residual value. Pull the 10% annuity and single-year factors from the tables supplied on screen.",
      },
      {
        step: "Do not compare unequal PV totals",
        detail:
          "Machine B naturally has a larger total because it provides service for five years rather than three. Convert each PV cost into an annual equivalent using its own life annuity factor.",
      },
      {
        step: "Choose the lower annual cost",
        detail:
          "Equivalent annual cost is PV cost divided by the relevant annuity factor. The lower EAC is preferred only if machines provide equivalent service and replacement continues.",
      },
      {
        step: "Test the repeatability assumptions",
        detail:
          "Technology, inflation, capacity, maintenance reliability and availability of identical replacements can invalidate the repeated-cycle assumption; state them before making an absolute recommendation.",
      },
    ],
    answer:
      "Using the PV and annuity tables supplied in FM:\n\n**Machine A:** PV cost = $120,000 + ($30,000 × 2.4869) − ($15,000 × 0.7513) = **$183,338**. EAC = $183,338/2.4869 = **$73,721 a year**.\n\n**Machine B:** PV cost = $160,000 + ($22,000 × 3.7908) − ($20,000 × 0.6209) = **$230,980**. EAC = $230,980/3.7908 = **$60,932 a year**.\n\nChoose **Machine B** because it supplies the required service at the lower equivalent annual cost. The $230,980-versus-$183,338 comparison alone is a distractor: B's PV covers two more years. The conclusion assumes equivalent capacity and quality, continuous need, repeatable replacements and costs that are consistently real or nominal. If technology is changing rapidly or the service horizon is finite, compare cash flows over the actual common decision horizon instead.",
    earns: [
      "Using the supplied life-specific factors to calculate both PV costs",
      "Dividing by each machine's own annuity factor to obtain comparable EACs",
      "Selecting Machine B and stating the continuing-service assumptions",
    ],
    loses: [
      "Selecting Machine A merely because its undiscounted or PV total is smaller",
      "Dividing both PV costs by the same annuity factor",
      "Ignoring differences in capacity, quality or technological life",
    ],
  },

  "FM-13::rationing": {
    title: "Ranking divisible projects and then respecting indivisibility",
    format: "written",
    marks: 20,
    requirement:
      "A company has only $600,000 available at time zero. Four independent projects have the following outlays and NPVs ($000): A 500 and 120; B 400 and 110; C 300 and 90; D 200 and 50.\n\n(a) Select projects if investment is divisible. (8 marks)\n(b) Select projects if investment is indivisible. (4 marks)\n(c) Discuss limitations of the analysis and causes of capital rationing. (8 marks)",
    plan: [
      {
        step: "Protect the 12 calculation, 8 discussion split",
        detail:
          "The two selection parts together carry twelve marks. Show the ranking and combinations, then reserve eight marks for rationing causes, assumptions, risk and strategic judgement.",
      },
      {
        step: "Rank divisible projects by value per dollar",
        detail:
          "Calculate NPV/outlay: C 0.30, B 0.275, D 0.25 and A 0.24. Take C fully, then use the remaining $300,000 for 75% of B; ranking by total NPV gives a visibly different wrong answer.",
      },
      {
        step: "Enumerate feasible indivisible combinations",
        detail:
          "Fractions are forbidden, so test combinations within $600,000. B plus D uses the full budget and yields $160,000; C plus D yields $140,000; A alone yields $120,000.",
      },
      {
        step: "Do not use the index outside its assumptions",
        detail:
          "The simple profitability-index ranking assumes one-period hard rationing, divisible independent projects and correctly risk-adjusted NPVs. Multi-period constraints, dependencies or mutually exclusive projects require optimisation or direct combination testing.",
      },
      {
        step: "Explain why rationing exists and what it costs",
        detail:
          "Distinguish hard external limits from soft internal ceilings, discuss finance access, issuance cost, control and risk, and quantify the positive NPVs forgone rather than treating the budget as costless.",
      },
    ],
    answer:
      "**(a) Divisible projects**\n\n| Project | NPV/outlay | Rank |\n|---|---:|---:|\n| C | 90/300 = **0.300** | 1 |\n| B | 110/400 = **0.275** | 2 |\n| D | 50/200 = **0.250** | 3 |\n| A | 120/500 = **0.240** | 4 |\n\nTake all of C for $300,000 and 75% of B with the remaining $300,000. NPV = $90,000 + 75% × $110,000 = **$172,500**. Taking A first because it has the largest individual NPV leaves only $100,000 and produces just $120,000 — the ranking-per-total-NPV trap.\n\n**(b) Indivisible projects**\n\nFractions are impossible. Feasible leading combinations are B + D: outlay $600,000, NPV **$160,000**; C + D: outlay $500,000, NPV $140,000; A alone: NPV $120,000. Choose **B and D**. The divisible ranking cannot simply be followed because C then leaves $300,000, insufficient for B.\n\n**(c) Discussion**\n\nHard rationing may arise from weak credit access, covenants or market disruption; soft rationing is an internal ceiling imposed to control risk, managerial capacity or forecasting optimism. Soft rationing can destroy value if positive-NPV projects are rejected without pricing that loss. The index assumes projects are independent, divisible for part (a), share a time-zero constraint only and have reliable risk-adjusted NPVs. It can fail with mutually exclusive projects, dependencies, strategic options or funding constraints in later years. The company should test combinations, financing alternatives and implementation capacity, then disclose the $12,500 value difference between divisible and indivisible solutions and the additional positive NPV left unfunded.",
    earns: [
      "Twelve-mark selection work showing both value-per-dollar ranking and feasible indivisible combinations",
      "Calculating $172,500 for divisible investment and $160,000 for B plus D",
      "Demonstrating why ranking by total NPV or blindly following the divisible order is wrong",
      "Using eight discussion marks for hard/soft causes and model assumptions",
    ],
    loses: [
      "Taking Project A first because $120,000 is the largest individual NPV",
      "Selecting 75% of B when projects are stated to be indivisible",
      "Applying profitability-index ranking mechanically to dependent or multi-period projects",
      "Completing only the twelve calculation marks",
    ],
  },
}
