import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area B, parts four and five — valuation and free cash flows (B4), and
 * international investment and financing decisions (B5).
 *
 *   AFM-21  Valuing equity and debt                  (B4a, B4d)
 *   AFM-22  Free cash flow forecasting and valuation (B4b, B4c)
 *   AFM-23  International investment appraisal       (B5a, B5b, B5c)
 *   AFM-24  International sources of finance         (B5d)
 *
 * These are the last two subsections of Area B, so the module that loads them
 * is the one that retires the legacy chapter: acca-study-afm-official.ts drops
 * AFM_B when this file lands, and acca-study-afm-b.ts is deleted.
 *
 * B4 and Area C's valuation subsection (C2) overlap deliberately — the same
 * models are examined once as "what is this business worth" and again as "what
 * should we pay for it". The split kept here is that B4 owns the MODELS and
 * their assumptions, while Area C owns the bid: synergy, the premium, and how
 * the gain is divided.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 */

const AFM_TREE_21: StudyChapter = {
  paper: "AFM",
  id: "AFM-21",
  number: 21,
  area: "B",
  syllabusRefs: ["B4(a)", "B4(d)"],
  title: "Valuing equity and debt",
  minutes: 19,
  intro:
    "Three families of model for equity, a discounting exercise for debt, and one elegant idea that ties them together: a shareholder in a geared company holds a call option on the business.",
  outcomes: [
    "Apply asset, income and cash flow based models to value equity, and state each one's blind spot",
    "Value corporate debt from the yield curve and the issuer's credit spread",
    "Explain why equity in a geared company behaves like a call option on its assets",
    "Use option pricing to value equity, debt and the probability of default",
    "Choose the model that fits the company and the purpose, and defend the choice",
  ],
  sections: [
    {
      id: "equity-models",
      heading: "Three families, three answers, one judgement",
      blocks: [
        {
          kind: "text",
          md: "A valuation question almost never has one right answer. The examinable skill is producing a **range** from different bases and then arguing which end of it applies here — so learn each family by what it assumes and therefore where it fails.",
        },
        {
          kind: "table",
          caption: "The three families",
          head: ["Family", "Method", "Assumes", "Blind spot"],
          rows: [
            ["Asset based", "Net assets at book, replacement or realisable value", "Value resides in identifiable assets", "Ignores earning power, brands, people and know-how entirely"],
            ["Income based", "P/E multiple, or earnings yield", "A comparable company's rating applies here", "Accounting earnings are policy-dependent; the multiple embeds someone else's growth and risk"],
            ["Cash flow based", "Dividend valuation model, or discounted free cash flow", "Future cash flows can be forecast and discounted", "Extremely sensitive to the growth rate and the discount rate"],
          ],
        },
        {
          kind: "text",
          md: "Asset-based valuations set a **floor**, not a value: net realisable value is roughly what a buyer could get by breaking the business up, so no rational seller accepts less. For a service business with few tangible assets that floor can be almost nil, which is exactly why the method is used as a boundary rather than an answer.",
        },
        {
          kind: "formula",
          name: "Dividend valuation model, with growth",
          expr: "P₀ = D₀(1 + g) ÷ (ke − g)",
          note:
            "Requires ke > g, and assumes constant growth in perpetuity. Growth may be estimated from historic dividends — g = (Dn ÷ D₀)^(1/n) − 1 — or from Gordon's growth approximation, g = retention rate × return on reinvested funds.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The P/E trap",
          md: "Applying a quoted company's P/E ratio to an unquoted target overstates the value. The unquoted shares cannot be sold readily, the company is usually smaller and less diversified, and its accounts are less scrutinised — so a **discount** is applied, commonly a third or so, and the size of it should be argued from the scenario rather than asserted.",
        },
        {
          kind: "activity",
          title: "Build and defend a range",
          prompt:
            "A private engineering firm has net assets at realisable value of $18m, post-tax earnings of $4.2m, and free cash flow of $3.8m growing at about 3%. A quoted comparator trades on a P/E of 14. Its cost of equity is estimated at 11%. What range do you present?",
          answer:
            "Three numbers and then an argument. Asset basis gives $18m, which is the floor - what a buyer could realise by breaking it up, and the least the owner should accept. Income basis: 4.2 times 14 is $58.8m, but that applies a quoted rating to an unquoted company, so a marketability discount of around a third takes it to roughly $39m. Cash flow basis: 3.8 times 1.03 divided by (0.11 minus 0.03) gives 3.914 over 0.08, which is $48.9m. So the range runs from $18m to about $49m, and the honest presentation is $39m to $49m with the asset figure shown as the floor. Which end applies depends on facts the scenario should supply: if the firm's value is genuinely in its order book and engineering staff, the cash flow figure is the better guide and the buyer must retain those people; if it depends on the departing owner's relationships, the sustainable earnings are lower than reported and the range shifts down. I would also say plainly that the cash flow figure moves about 22% if growth is 2% rather than 3%, so quoting it to the nearest hundred thousand would be false precision.",
        },
      ],
      check: {
        q: "Why is a net realisable value calculation usually treated as a floor rather than as a valuation?",
        options: [
          "Because realisable values are not permitted in a valuation under the syllabus",
          "Because it measures only what the identifiable assets would fetch on a break-up, ignoring the earning power of the business as a going concern — so no rational seller would accept less, but a buyer of a profitable business should expect to pay more",
          "Because asset values are always lower than book values",
          "Because it excludes liabilities",
        ],
        correct: 1,
        explain:
          "The method values the pieces rather than the enterprise. For a profitable business the assembled operation is worth more than its parts, so the realisable figure marks the lower bound of any sensible negotiation. Option 2 is not generally true, and a net asset valuation deducts liabilities by construction.",
      },
    },
    {
      id: "debt",
      heading: "Valuing corporate debt",
      blocks: [
        {
          kind: "text",
          md: "Debt valuation is a discounting exercise, and the only difficulty is choosing the rate. The syllabus is specific about where it comes from: read the **yield curve** at the maturity of each payment, then add the issuer's **credit spread**. That is the term structure doing the work rather than one blended yield — and it means, strictly, a different rate for each year.",
        },
        {
          kind: "example",
          title: "Pricing a bond off the yield curve",
          scenario:
            "A BBB-rated company has a bond paying a 5% annual coupon on $100 nominal, redeeming at par in 3 years. Government yields are 3.0%, 3.4% and 3.8% for years 1 to 3, and the BBB credit spread is 1.2% at all three maturities.",
          steps: [
            { label: "Year 1", detail: "Rate 3.0 + 1.2 = 4.2%. Cash flow $5, so PV = 5 ÷ 1.042 = $4.80." },
            { label: "Year 2", detail: "Rate 3.4 + 1.2 = 4.6%. PV = 5 ÷ 1.046² = 5 ÷ 1.0941 = $4.57." },
            { label: "Year 3", detail: "Rate 3.8 + 1.2 = 5.0%. Cash flow $105, so PV = 105 ÷ 1.05³ = 105 ÷ 1.1576 = $90.70." },
            { label: "Total", detail: "4.80 + 4.57 + 90.70 = $100.07." },
          ],
          result:
            "Almost exactly par, because the 5% coupon happens to match the three-year all-in rate. Note the rate rises with maturity — using the one-year rate throughout would have overvalued the bond.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Spreads widen with term as well",
          md: "The example holds the spread constant across maturities for simplicity. In practice a longer bond from the same issuer usually carries a wider spread, because there is more time for its credit standing to deteriorate. If a question supplies a spread table by rating **and** by term, read both dimensions — taking the one-year spread for a ten-year bond is a common and expensive slip.",
        },
      ],
      check: {
        q: "Why should a three-year bond's cash flows be discounted at different rates rather than at one yield?",
        options: [
          "Because the coupon changes each year",
          "Because the term structure means the required return differs by maturity, so each cash flow should be discounted at the rate appropriate to when it arrives",
          "Because inflation is different each year",
          "Because the credit rating changes annually",
        ],
        correct: 1,
        explain:
          "The yield curve prices money differently by term, so a payment in year one and a payment in year three are not discounted on the same basis. A single yield to maturity is a useful summary of the result, but building the value from the curve is what the syllabus asks for and it matters most when the curve is steep.",
      },
    },
    {
      id: "options",
      heading: "Equity as a call option on the firm",
      blocks: [
        {
          kind: "text",
          md: "This is the outcome that ties Area B together, and it is elegant enough to be worth understanding rather than memorising. Consider a company financed by equity and by debt with a face value repayable at a date. At that date the shareholders face a choice: repay the debt and keep the business, or hand the business to the lenders and walk away — limited liability means they lose nothing further.",
        },
        {
          kind: "text",
          md: "That is exactly a **call option**. The shareholders hold the right, not the obligation, to buy the company's assets from the lenders by paying the debt's face value. So the underlying asset is the value of the firm's assets, the exercise price is the face value of the debt, and the time to expiry is the debt's maturity.",
        },
        {
          kind: "table",
          caption: "The mapping",
          head: ["Black-Scholes input", "Corporate equivalent"],
          rows: [
            ["Pa — value of the underlying", "Market value of the company's total assets"],
            ["Pe — exercise price", "Face value of the debt repayable"],
            ["t — time to expiry", "Time until the debt matures"],
            ["s — volatility", "Volatility of the value of the firm's assets"],
            ["r — risk-free rate", "The risk-free rate"],
            ["Value of the call", "Value of the EQUITY"],
            ["Assets less the call", "Value of the DEBT"],
            ["N(−d₂)", "Probability of default"],
          ],
        },
        {
          kind: "example",
          title: "Valuing equity, debt and default risk together",
          scenario:
            "A company's assets are worth $120m. It owes $100m repayable in 4 years. The volatility of its asset value is 25% a year and the risk-free rate is 4%.",
          steps: [
            { label: "d₁", detail: "[ln(120/100) + (0.04 + 0.5 × 0.0625) × 4] ÷ (0.25 × √4) = (0.1823 + 0.285) ÷ 0.5 = 0.93." },
            { label: "d₂", detail: "0.93 − 0.5 = 0.43. N(d₁) = 0.8238, N(d₂) = 0.6664." },
            { label: "Value of equity", detail: "120 × 0.8238 − 100 × 0.6664 × e^(−0.16) = 98.86 − 56.79 = $42.07m." },
            { label: "Value of debt", detail: "Total assets less equity: 120 − 42.07 = $77.93m." },
            { label: "Implied cost of debt", detail: "(100 ÷ 77.93)^(1/4) − 1 = 6.43%, so the credit spread is 6.43 − 4 = 2.43%." },
            { label: "Probability of default", detail: "N(−d₂) = 1 − 0.6664 = 0.3336, about a 33% chance the assets are worth less than $100m at maturity." },
          ],
          result:
            "One set of inputs yields the equity value, the debt value, the credit spread the lenders should demand, and the default probability — which is why rating and risk models are built on this idea.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Why this explains risk shifting",
          md: "Option value rises with volatility. Equity **is** an option, so shareholders in a geared company gain when the firm's assets become more volatile — even though the total value of the firm has not risen. The value transfers from the lenders, whose claim is capped. This is the same risk-shifting conflict the governance chapter described, now with a price attached.",
        },
        {
          kind: "text",
          md: "The limitations are the ones from the option chapter, plus one more: the model needs the **market value of the firm's assets** and their volatility, neither of which is directly observable for an unquoted company. In practice they are inferred from the equity's own market value and volatility, which makes the exercise circular unless done carefully. Treat the output as an order of magnitude and a way of reasoning, not a price.",
        },
      ],
      check: {
        q: "Using the option framework, why do shareholders of a geared company benefit from an increase in the volatility of the firm's assets?",
        options: [
          "Because higher volatility increases the total value of the firm",
          "Because equity is a call option on the assets, and option value rises with volatility — the gain comes at the lenders' expense, since their claim is capped at the amount owed",
          "Because volatility reduces the face value of the debt",
          "Because lenders must accept a lower interest rate when volatility rises",
        ],
        correct: 1,
        explain:
          "The total firm value is unchanged; what changes is how it is split. Shareholders hold the upside without limit and can walk away from the downside, so wider dispersion raises their option's value and reduces what is left for the lenders. It is the clearest formal statement of why loan covenants restrict the borrower's risk-taking.",
      },
    },
  ],
  examTraps: [
    { trap: "Presenting a single valuation figure.", fix: "Produce a range from different bases and argue which end applies to this company." },
    { trap: "Applying a quoted P/E to an unquoted target unadjusted.", fix: "Discount for marketability, size and information risk, and justify the size of the discount." },
    { trap: "Discounting every bond cash flow at one rate when a yield curve is supplied.", fix: "Use the rate for each maturity, plus the spread for that rating and term." },
    { trap: "Treating the option valuation of equity as a precise price.", fix: "Asset value and asset volatility are inferred, not observed — present it as a way of reasoning about default risk." },
  ],
  keyTerms: [
    { term: "Net realisable value", def: "The amount the identifiable assets would fetch on disposal, less liabilities — the floor below which no rational seller should go." },
    { term: "Marketability discount", def: "The reduction applied to a valuation multiple taken from a quoted comparator, reflecting the difficulty of selling unquoted shares." },
    { term: "Credit spread", def: "The margin over the risk-free yield of the same maturity that compensates a lender for the issuer's default risk." },
    { term: "Probability of default", def: "In the option framework, N(−d₂) — the likelihood that the firm's asset value at maturity is below the face value of its debt." },
  ],
  summary: [
    "Asset, income and cash flow models answer differently; produce a range and argue the end.",
    "Asset value is a floor; a P/E from a quoted comparator needs a marketability discount.",
    "Value debt off the yield curve for each maturity, plus the spread for that rating and term.",
    "Equity is a call option on the firm's assets with the debt's face value as exercise price — which prices default risk and explains risk shifting.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a P/E from a quoted company overstate an unquoted target's value?", a: "The unquoted shares are hard to sell, the company is usually smaller and less diversified and its accounts less scrutinised, so a marketability discount applies." },
    { q: "In the option framework, what is the exercise price?", a: "The face value of the debt the shareholders must repay to retain the business." },
    { q: "What does N(−d₂) represent in that framework?", a: "The probability of default — the chance that the firm's asset value at maturity falls below the amount owed." },
  ],
  furtherStudy: [
    "AFM-14 supplies the Black-Scholes machinery this chapter applies to the firm's own balance sheet.",
    "AFM-22 develops the free cash flow forecasting that the cash flow based models depend on.",
    "AFM-20 covers the credit spreads and term structure used here to value debt.",
    "Area C applies these models to a bid, where synergy and the control premium are added.",
  ],
}

const AFM_TREE_22: StudyChapter = {
  paper: "AFM",
  id: "AFM-22",
  number: 22,
  area: "B",
  syllabusRefs: ["B4(b)", "B4(c)"],
  title: "Free cash flow forecasting and valuation",
  minutes: 18,
  intro:
    "The workhorse valuation of the paper. Two definitions of free cash flow, two matching discount rates, and one terminal value that usually carries most of the answer.",
  outcomes: [
    "Forecast free cash flow to the firm and free cash flow to equity from operating figures",
    "Match each measure to the correct discount rate and the correct output",
    "Value a business under alternative horizon and growth assumptions",
    "Show how much of a valuation rests on the terminal value, and test it",
    "Explain what capital reinvestment does to free cash flow to equity",
  ],
  sections: [
    {
      id: "two-measures",
      heading: "Two free cash flows, and never mixing them",
      blocks: [
        {
          kind: "text",
          md: "The single most common valuation error in this paper is discounting one measure at the other's rate. The two are built for different purposes and give different outputs.",
        },
        {
          kind: "table",
          caption: "The two measures",
          head: ["", "Free cash flow to the firm", "Free cash flow to equity"],
          rows: [
            ["Whose cash is it?", "All providers of capital", "Shareholders only"],
            ["Interest treated how?", "Not deducted — it is a return to a capital provider", "Deducted, net of tax"],
            ["Debt movements?", "Excluded", "Included — new borrowing added, repayments deducted"],
            ["Discount at", "WACC", "Cost of equity"],
            ["Gives", "Enterprise (firm) value", "Equity value directly"],
            ["To get equity value", "Deduct the market value of debt", "It already is the equity value"],
          ],
        },
        {
          kind: "formula",
          name: "Free cash flow to the firm",
          expr: "FCF = EBIT(1 − T) + depreciation and other non-cash charges − capital expenditure − increase in working capital",
          note:
            "Starting from EBIT — profit before interest — is what keeps the measure independent of financing. Adding interest back after starting from profit after interest is the same thing done the long way, and is where sign errors creep in.",
        },
        {
          kind: "formula",
          name: "Free cash flow to equity",
          expr: "FCFE = FCF − interest(1 − T) − debt repaid + new debt raised",
          note:
            "This is the dividend capacity measure from Area A, which is not a coincidence: what a company can pay its shareholders and what its equity is worth are the same cash flow seen from two angles.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The reinvestment point the syllabus names",
          md: "The outcome asks for the equity measure both **before and after the capital that has to go back into the business**. The first tells you what the operations generate; the second tells you what is genuinely left once the capital expenditure needed to sustain and grow them has been funded. A valuation built on the first figure values a business that quietly consumes its own asset base, and will be far too high.",
        },
      ],
      check: {
        q: "An analyst forecasts free cash flow to the firm and discounts it at the cost of equity. What is wrong, and what will the result be?",
        options: [
          "Nothing is wrong, provided the company has no debt",
          "The measure belongs to all capital providers but the rate reflects only shareholders' required return — since the cost of equity exceeds the WACC for a geared company, the value will be understated",
          "The result will overstate the firm's value, because the cost of equity is lower than the WACC",
          "The result gives the equity value directly, so no adjustment is needed",
        ],
        correct: 1,
        explain:
          "Firm cash flows take the WACC because they serve everyone who funded the assets. Discounting them at the higher cost of equity understates the enterprise value — and then deducting debt from that understated figure compounds the error. Option 0 is nearly right in the special case of no debt, where the two rates coincide, but the analyst has still applied the wrong pairing as a method.",
      },
    },
    {
      id: "horizon-growth",
      heading: "Horizon, growth, and where the value actually sits",
      blocks: [
        {
          kind: "text",
          md: "The syllabus asks for valuation under **alternative horizon and growth assumptions**, which is a direct instruction to run more than one. The reason is that a discounted cash flow valuation typically has most of its value in the terminal value, and the terminal value is the least reliable part of the model.",
        },
        {
          kind: "formula",
          name: "Terminal value with constant growth",
          expr: "TV at year n = FCFₙ × (1 + g) ÷ (r − g)",
          note:
            "Then discount that back to today. Two disciplines: g must be below r or the formula is meaningless, and g should not exceed the long-run growth rate of the economy — a business growing perpetually faster than the economy eventually becomes the economy.",
        },
        {
          kind: "example",
          title: "A valuation, and what one percentage point does to it",
          scenario:
            "A company reports EBIT of $50m, depreciation of $18m, capital expenditure of $25m and a $5m increase in working capital. Tax is 20%, WACC 9%, and long-run growth is assumed at 3%. Debt has a market value of $150m and there are 100m shares.",
          steps: [
            { label: "Free cash flow", detail: "50 × 0.8 = 40, plus 18, less 25, less 5 = $28m." },
            { label: "Firm value", detail: "28 × 1.03 ÷ (0.09 − 0.03) = 28.84 ÷ 0.06 = $480.7m." },
            { label: "Equity value", detail: "480.7 − 150 = $330.7m, or $3.31 a share." },
            { label: "Now try g = 2%", detail: "28 × 1.02 ÷ 0.07 = 28.56 ÷ 0.07 = $408.0m; equity $258.0m, or $2.58 a share." },
            { label: "Read the difference", detail: "One percentage point off the growth rate removes $72.7m of firm value — 15% of it — and 22% of the equity value, because the debt is a fixed deduction that magnifies the swing." },
          ],
          result:
            "$2.58 to $3.31 a share from a single defensible change in one assumption. Quoting $3.31 alone would be false precision, and the range is the honest answer.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Gearing magnifies the sensitivity of the equity value",
          md: "Notice that the firm value moved 15% and the equity value moved 22%. Debt is deducted as a fixed amount, so any swing in enterprise value lands entirely on the equity. The more geared the company, the more violently its equity value responds to a change in the growth or discount assumption — which is worth saying explicitly when valuing a leveraged business.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Disciplines that keep a discounted cash flow valuation defensible",
          items: [
            "State what proportion of the value is terminal value — if it is over 70%, the valuation is a statement about the far future rather than about the forecast period",
            "Cap perpetual growth at a defensible long-run rate; a rate above nominal economic growth is not sustainable",
            "Forecast explicitly only as far as you can justify, and use the terminal value beyond it — a fifteen-year explicit forecast is not more accurate, only longer",
            "Check that capital expenditure at least covers depreciation in the terminal year, or the perpetuity assumes a shrinking asset base",
            "Present a sensitivity grid across growth and discount rate, because those two drive almost everything",
          ],
        },
        {
          kind: "activity",
          title: "Interrogate a valuation",
          prompt:
            "A colleague values a business at $600m, of which $510m is terminal value, using perpetual growth of 5% against a WACC of 8%. What three challenges do you raise?",
          answer:
            "First, the terminal value is 85% of the answer, so this is not really a five-year forecast at all - it is a bet on conditions after year five, and the explicit forecast is doing almost no work. That should be stated to whoever receives the valuation. Second, growth of 5% in perpetuity is almost certainly too high: it should not exceed long-run nominal growth for the economy, and a business compounding at 5% forever eventually outgrows its own market. Third, the spread between g and r is only three percentage points, which makes the answer violently unstable - the denominator is 0.03, so moving growth to 4% cuts the terminal value by a quarter, and moving it to 3% cuts it by two fifths. I would rerun it at 2.5% and show the result beside the original rather than replacing it, and I would check that terminal-year capital expenditure at least covers depreciation, because a perpetuity growing at 5% on an asset base that is not being replaced is internally inconsistent.",
        },
      ],
      check: {
        q: "A valuation uses perpetual growth of 6% and a WACC of 7%. Why is this dangerous even if both figures are individually arguable?",
        options: [
          "Because growth must always be below 3%",
          "Because the denominator (r − g) is only 0.01, so the terminal value is extremely sensitive — a change of half a percentage point in either input moves the valuation by roughly a third or more",
          "Because the formula cannot be used when growth exceeds 5%",
          "Because the WACC must always exceed 10% for valuation purposes",
        ],
        correct: 1,
        explain:
          "As the gap between the discount rate and the growth rate narrows, the perpetuity multiplier explodes and small input changes produce enormous swings. The valuation stops being informative long before the formula stops working — which is why the spread between r and g should be reported alongside the answer.",
      },
    },
  ],
  examTraps: [
    { trap: "Discounting firm cash flows at the cost of equity, or equity cash flows at the WACC.", fix: "Firm with WACC gives enterprise value; equity with ke gives equity value directly." },
    { trap: "Deducting debt from a value built on free cash flow to equity.", fix: "That measure is already the equity value — deducting debt counts it twice." },
    { trap: "Valuing on pre-reinvestment cash flows.", fix: "Deduct the capital expenditure needed to sustain the business, or the perpetuity assumes a shrinking asset base." },
    { trap: "Quoting a discounted cash flow valuation as a single figure.", fix: "Report the range across defensible growth and discount assumptions, and the terminal value proportion." },
  ],
  keyTerms: [
    { term: "Free cash flow to the firm", def: "Cash generated for all providers of capital, before interest and debt movements, discounted at the WACC to give enterprise value." },
    { term: "Free cash flow to equity", def: "Cash available to shareholders after interest, tax and debt movements, discounted at the cost of equity to give equity value directly." },
    { term: "Terminal value", def: "The value attributed to all cash flows beyond the explicit forecast period, usually as a growing perpetuity." },
    { term: "Enterprise value", def: "The value of the whole business to all capital providers, from which the market value of debt is deducted to reach equity value." },
  ],
  summary: [
    "Two measures, two rates: firm cash flow with WACC, equity cash flow with the cost of equity.",
    "Value after capital reinvestment, or the perpetuity assumes an asset base that is quietly shrinking.",
    "Terminal value usually carries most of the answer — report its proportion and cap growth defensibly.",
    "Gearing magnifies how much the equity value moves when growth or the discount rate changes.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does free cash flow to the firm start from EBIT?", a: "EBIT is before interest, which keeps the measure independent of how the business is financed — the financing is reflected in the WACC instead." },
    { q: "Why does the equity value swing more than the firm value when growth changes?", a: "Debt is deducted as a fixed amount, so the entire change in enterprise value lands on the equity — and the effect grows with gearing." },
    { q: "What proportion of terminal value should prompt a warning?", a: "Above roughly 70%, because the valuation is then a statement about conditions after the forecast period rather than about the forecast itself." },
  ],
  furtherStudy: [
    "AFM-21 covers the alternative valuation families this cash flow method should be presented alongside.",
    "AFM-09 computes the same free cash flow to equity as the parent's dividend capacity.",
    "AFM-17 supplies the WACC and cost of equity these cash flows are discounted at.",
    "Area C applies free cash flow valuation to a target, adding synergy and the control premium.",
  ],
}

const AFM_TREE_23: StudyChapter = {
  paper: "AFM",
  id: "AFM-23",
  number: 23,
  area: "B",
  syllabusRefs: ["B5(a)", "B5(b)", "B5(c)"],
  title: "International investment appraisal",
  minutes: 20,
  intro:
    "The same NPV, with a currency in it. Two routes are available and they must agree — and the project that looks strong in the local currency can be worth nothing to the parent.",
  outcomes: [
    "Forecast exchange rates using purchasing power parity, in the right direction",
    "Appraise an overseas project by both available routes and show they reconcile",
    "Assess how alternative exchange rate assumptions change a project's value",
    "Appraise from the PARENT's perspective, using cash flows that can actually be remitted",
    "Advise on exchange controls and on strategies for dealing with restricted remittance",
  ],
  sections: [
    {
      id: "forecasting",
      heading: "Forecasting the rate, and getting the direction right",
      blocks: [
        {
          kind: "formula",
          name: "Purchasing power parity",
          expr: "S₁ = S₀ × (1 + h_counter) ÷ (1 + h_base)",
          note:
            "The currency with the HIGHER inflation depreciates. Interest rate parity has the identical structure with interest rates in place of inflation, and gives the forward rate rather than a forecast spot rate.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The direction error, and how to kill it",
          md: "Almost every mark lost on parity is a quote-direction error. Fix the habit: write the rate as **units of the counter currency per one unit of the base**, then put the counter currency's inflation on TOP. If a rate is €1.20/$1, the counter is the euro, so euro inflation goes in the numerator. Then sanity-check the answer against the story: higher euro inflation must give MORE euros per dollar, because the euro is weakening.",
        },
        {
          kind: "example",
          title: "Forecasting a three-year path",
          scenario:
            "The spot rate is €1.20 per $1. Inflation is forecast at 4% in the eurozone and 2% in the United States.",
          steps: [
            { label: "Year 1", detail: "1.20 × (1.04 ÷ 1.02) = 1.20 × 1.0196 = €1.2235 per $1." },
            { label: "Year 2", detail: "1.20 × 1.0196² = 1.20 × 1.0396 = €1.2475." },
            { label: "Year 3", detail: "1.20 × 1.0196³ = 1.20 × 1.0600 = €1.2720." },
            { label: "Sanity check", detail: "More euros per dollar each year — the higher-inflation currency is weakening, as it must." },
          ],
          result: "A euro cash flow converted at these rates buys fewer and fewer dollars, which is the whole point of the exercise.",
        },
      ],
      check: {
        q: "The spot rate is 15 pesos per $1. Peso inflation is 12%, dollar inflation 3%. What is the expected rate in one year?",
        options: [
          "13.79 pesos per $1, since the peso strengthens",
          "16.31 pesos per $1 — the higher-inflation peso depreciates, so more pesos are needed per dollar",
          "15.00 pesos per $1, since parity holds only in the long run",
          "1.31 pesos per $1",
        ],
        correct: 1,
        explain:
          "15 × (1.12 ÷ 1.03) = 15 × 1.0874 = 16.31. The peso is the counter currency, so its inflation goes on top, and the direction check confirms it: the currency with higher inflation must weaken, meaning more pesos per dollar. Option 0 inverts the ratio, which is the standard error.",
      },
    },
    {
      id: "two-routes",
      heading: "Two routes to the same NPV",
      blocks: [
        {
          kind: "table",
          caption: "The two methods",
          head: ["", "Convert then discount", "Discount then convert"],
          rows: [
            ["Step 1", "Forecast foreign cash flows", "Forecast foreign cash flows"],
            ["Step 2", "Convert each year at its forecast rate", "Discount at the FOREIGN cost of capital"],
            ["Step 3", "Discount at the HOME cost of capital", "Convert the resulting NPV at the SPOT rate"],
            ["Preferred when", "Remittances, blocked funds or differential tax apply", "The cash flows are clean and fully remittable"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Use the first route in the exam",
          md: "Convert then discount is almost always the one to use, because it lets you apply withholding tax, blocked funds and remittance restrictions **year by year** as they arise. The second route is faster but hides all of that, and AFM scenarios are built around exactly those complications.",
        },
        {
          kind: "example",
          title: "The project that works locally and fails for the parent",
          scenario:
            "A United States parent appraises a eurozone project costing €50m now and generating €20m a year for 3 years. Spot is €1.20 per $1, eurozone inflation 4%, United States inflation 2%, and the project's dollar cost of capital is 10%.",
          steps: [
            { label: "Initial outlay", detail: "€50m ÷ 1.20 = $41.67m." },
            { label: "Convert the inflows", detail: "Year 1: 20 ÷ 1.2235 = $16.35m. Year 2: 20 ÷ 1.2475 = $16.03m. Year 3: 20 ÷ 1.2720 = $15.72m." },
            { label: "Discount at 10%", detail: "16.35 × 0.9091 + 16.03 × 0.8264 + 15.72 × 0.7513 = 14.86 + 13.25 + 11.81 = $39.92m." },
            { label: "NPV", detail: "39.92 − 41.67 = −$1.75m. Reject." },
            { label: "Cross-check by the other route", detail: "The euro cost of capital is 1.10 × 1.04 ÷ 1.02 − 1 = 12.16%. The euro NPV is €47.87m − €50m = −€2.13m, which at spot is −$1.77m — the same answer bar rounding." },
          ],
          result:
            "In euros the project returns €60m on a €50m outlay and looks comfortable. In dollars it destroys value, because the euro is expected to weaken by about 6% over the period. The currency assumption IS the decision here.",
        },
        {
          kind: "text",
          md: "That reconciliation is worth doing once in your revision and never again in the exam — but knowing that the two routes **must** agree is what tells you a discrepancy means an error, usually an inverted rate or the wrong cost of capital paired with the wrong currency.",
        },
      ],
      check: {
        q: "An appraisal converts foreign cash flows at forecast rates and then discounts them at the foreign cost of capital. What is wrong?",
        options: [
          "Nothing, provided purchasing power parity holds",
          "The cash flows are now in the home currency but the rate is the foreign one — home currency flows must take the home cost of capital, or the inflation differential is counted twice",
          "Foreign cash flows should never be converted",
          "The foreign cost of capital is always lower, so the NPV is understated",
        ],
        correct: 1,
        explain:
          "It is the same currency-mismatch error as discounting money cash flows at a real rate. Converting at forecast rates already builds in the inflation differential; applying the foreign rate, which also embeds that differential, charges for it a second time. Pair home flows with the home rate, or foreign flows with the foreign rate — never one of each.",
      },
    },
    {
      id: "remittance",
      heading: "The parent's perspective, and blocked funds",
      blocks: [
        {
          kind: "text",
          md: "The decisive principle in international appraisal: a project is worth to the parent only what the **parent** can receive. Cash generated in a subsidiary and trapped there does not fund the group's dividends, its central debt service or its next project. So the appraisal is built on remittable cash flows, after every deduction on the way home.",
        },
        {
          kind: "list",
          style: "number",
          title: "The deductions between local profit and parent cash",
          items: [
            "Local tax on the subsidiary's profits",
            "Any legally required retention or reserve that cannot be distributed",
            "Withholding tax on the remittance itself",
            "Additional home-country tax, if the home rate exceeds the total foreign tax suffered",
            "Any amount that exchange controls prevent from leaving at all",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Blocked funds are not worthless — they are worth less",
          md: "Cash that cannot be remitted still has value if it can be used where it sits: reinvested locally, used to buy inputs the group would otherwise import, lent to another group entity in the same jurisdiction, or released at the end of the project. Include it in the appraisal at its **realistic** value and timing, rather than either counting it in full or writing it off.",
        },
        {
          kind: "table",
          caption: "Strategies for restricted remittance",
          head: ["Strategy", "How it works", "Constraint"],
          rows: [
            ["Local reinvestment", "Fund local expansion with the trapped cash", "Only worthwhile if local projects are genuinely positive-NPV"],
            ["Transfer pricing on real supply", "Charge an arm's length price for goods actually supplied", "Must be defensible; tax authorities scrutinise this route hardest"],
            ["Royalties and management charges", "Payment for intellectual property or services genuinely provided", "The service or asset must be real and the charge at arm's length"],
            ["Intra-group loan repayment", "Return capital that went in as debt", "Only available if the investment was structured with a debt element"],
            ["Local sourcing", "Buy inputs locally that would otherwise be imported", "Reduces group cash needs elsewhere rather than moving cash"],
            ["Negotiated agreement", "Agree remittance terms with the government before investing", "Must be done up front; leverage disappears once the capital is committed"],
          ],
        },
        {
          kind: "text",
          md: "The last row is the strategic point. A multinational's negotiating power over remittance terms is at its maximum **before** the investment is made, and close to nil afterwards — the plant cannot be moved. So exchange control risk belongs in the appraisal and in the negotiation at the outset, not in a subsequent recovery exercise.",
        },
        {
          kind: "activity",
          title: "Value a blocked cash flow",
          prompt:
            "A project generates 400m local units a year, of which exchange controls permit only 60% to be remitted. The remainder can be invested locally at 8% and released when the project ends in four years. How should the appraisal treat this?",
          answer:
            "In two streams rather than one. The remittable 240m a year is converted at each year's forecast rate, taxed as applicable, and discounted normally - that is the cash the parent actually receives and it carries the ordinary treatment. The blocked 160m a year is not lost, but it is not available either: it accumulates locally earning 8%, so it should be rolled forward to the project's end as a terminal receipt, converted at the year-four forecast rate, and discounted back as a single amount. Two judgements have to be stated. First, whether the 8% local return is genuinely obtainable or is simply a deposit rate that may not keep pace with local inflation, because if the local currency is depreciating faster than the funds are compounding, the real value is falling while it sits there. Second, whether release at year four is reliable - it is a forecast about a government's future policy, not a contractual right, so I would show the NPV with and without the blocked funds released, and let the board see how much of the case depends on that assumption.",
        },
      ],
      check: {
        q: "Why must an overseas project be appraised on remittable cash flows rather than on the subsidiary's total cash generation?",
        options: [
          "Because subsidiaries do not prepare cash flow statements",
          "Because the value to the parent is what the parent can actually receive and use — cash trapped in the subsidiary cannot fund group dividends, central debt service or other investment",
          "Because local cash flows are not measurable in the home currency",
          "Because international accounting standards require it",
        ],
        correct: 1,
        explain:
          "The appraisal is being done from the investor's perspective, and the investor here is the parent. Trapped cash may still have value where it sits, and should be included at that realistic value and timing — but counting it as though it had arrived at head office overstates the project to whoever is deciding.",
      },
    },
  ],
  examTraps: [
    { trap: "Inverting the parity ratio.", fix: "Counter currency's inflation on top, then check the higher-inflation currency has weakened." },
    { trap: "Converting at forecast rates and then discounting at the foreign rate.", fix: "Home flows take the home rate — otherwise the inflation differential is counted twice." },
    { trap: "Appraising on the subsidiary's total cash flows.", fix: "Use what can be remitted, after local tax, retentions, withholding tax and controls." },
    { trap: "Writing blocked funds off entirely.", fix: "Value their local use and eventual release, and show the NPV with and without release." },
  ],
  keyTerms: [
    { term: "Purchasing power parity", def: "The proposition that exchange rates adjust so that identical goods cost the same in different currencies, implying the higher-inflation currency depreciates." },
    { term: "Interest rate parity", def: "The relationship by which the forward exchange rate reflects the interest rate differential between two currencies." },
    { term: "Blocked funds", def: "Cash generated by a subsidiary that exchange controls prevent from being remitted to the parent." },
    { term: "Remittable cash flow", def: "The amount reaching the parent after local tax, mandatory retentions, withholding tax and any exchange control restriction." },
  ],
  summary: [
    "The higher-inflation currency depreciates; write the rate as counter per base and check the direction.",
    "Convert then discount at the home rate — it lets remittance restrictions be applied year by year.",
    "The two routes must agree; a discrepancy signals an inverted rate or a mismatched cost of capital.",
    "Appraise on what the parent can receive, and value blocked funds at their realistic local use and release.",
  ],
  knowledgeDiagnostic: [
    { q: "Which currency's inflation goes in the numerator of the parity formula?", a: "The counter currency's — the one the rate is quoted in units of — and the result should show the higher-inflation currency weakening." },
    { q: "Why is convert-then-discount preferred in the exam?", a: "It applies withholding tax, blocked funds and remittance restrictions year by year, which is what AFM scenarios are built around." },
    { q: "When is a multinational's leverage over remittance terms greatest?", a: "Before the capital is committed — once the plant is built it cannot be moved, and the negotiating position largely disappears." },
  ],
  furtherStudy: [
    "AFM-24 covers the international funding sources that finance projects like these.",
    "AFM-08 sets the multinational planning framework these remittance constraints belong to.",
    "AFM-09 computes the dividend capacity that the remitted cash flows feed.",
    "Area E hedges the currency exposures this appraisal identifies.",
  ],
}

const AFM_TREE_24: StudyChapter = {
  paper: "AFM",
  id: "AFM-24",
  number: 24,
  area: "B",
  syllabusRefs: ["B5(d)"],
  title: "International sources of finance",
  minutes: 15,
  intro:
    "Raising money outside your home market widens the investor base and can cut the cost — and it introduces an exposure that has bankrupted companies whose operating businesses were perfectly sound.",
  outcomes: [
    "Describe the main international debt and equity markets a group can access",
    "Assess the costs and benefits of raising finance in a foreign market",
    "Explain how borrowing in a currency can create or remove an economic exposure",
    "Advise on matching the currency of borrowing to the currency of cash flows",
    "Weigh a lower headline coupon against the currency risk that comes with it",
  ],
  sections: [
    {
      id: "markets",
      heading: "The markets available",
      blocks: [
        {
          kind: "table",
          caption: "International debt",
          head: ["Instrument", "What it is", "Why a group uses it"],
          rows: [
            ["Eurobond", "A bond issued outside the jurisdiction of the currency it is denominated in", "Large sums, long maturities, light regulation, an international investor base"],
            ["Eurocurrency loan", "Bank borrowing in a currency other than the lender's domestic one", "Flexible, quick, and available in the currency the group actually needs"],
            ["Syndicated loan", "One facility provided by a group of banks together", "Raises amounts no single bank would lend, with one set of terms"],
            ["Foreign bond", "A bond issued in a domestic market by a foreign borrower", "Access to a deep local investor base, at the price of local regulation and disclosure"],
          ],
        },
        {
          kind: "table",
          caption: "International equity",
          head: ["Route", "What it is", "Trade-off"],
          rows: [
            ["Secondary or dual listing", "Shares listed on a second exchange as well as the home one", "Wider investor base and profile, against two sets of listing obligations and cost"],
            ["Depositary receipts", "Certificates representing shares, traded in another market's currency", "Access to investors barred from holding foreign shares directly, without a full listing"],
            ["International placing", "An issue targeted at institutions in several countries", "Speed and reach, with less retail participation"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The benefit that is usually understated",
          md: "Candidates reach for 'lower cost' first, and the cost saving is often small. The larger and more durable benefits are **capacity** — some markets can absorb sizes a domestic market cannot — and **resilience**, because a group that can fund in several markets is not hostage to one of them closing.",
        },
      ],
      check: {
        q: "What is a eurobond?",
        options: [
          "A bond denominated in euros",
          "A bond issued in a currency other than that of the country where it is issued — a dollar bond sold in London, for instance",
          "A bond issued by a European Union institution",
          "A bond that can be repaid in any currency at the holder's option",
        ],
        correct: 1,
        explain:
          "The 'euro' prefix means outside the domestic jurisdiction of the currency, not the euro currency — the term predates it. A yen bond issued in London is a eurobond just as much as a dollar one. The confusion is common enough that examiners test it directly.",
      },
    },
    {
      id: "currency-exposure",
      heading: "The exposure that comes with the money",
      blocks: [
        {
          kind: "text",
          md: "Borrowing in a foreign currency is not simply a cheaper or dearer version of borrowing at home. It changes the group's risk profile, and whether it changes it for better or worse depends entirely on where the cash flows to service it come from.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "compare",
            title: "The same borrowing, two situations",
            data: {
              leftTitle: "Matched to revenue",
              rightTitle: "Unmatched",
              rows: [
                { aspect: "Revenue currency", left: "Same as the borrowing", right: "Different from the borrowing" },
                { aspect: "If the borrowing currency strengthens", left: "Revenue rises with the obligation", right: "Obligation rises, revenue does not" },
                { aspect: "Effect on risk", left: "Reduced — a natural hedge", right: "Increased — a new economic exposure" },
                { aspect: "Covenant behaviour", left: "Stable", right: "Can breach on currency alone" },
                { aspect: "Verdict", left: "Borrowing abroad is a risk management tool", right: "A lower coupon bought with real risk" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The cheap-coupon illusion",
          md: "A currency with low interest rates usually has low rates because it has low inflation, and interest rate parity says it is therefore expected to **appreciate**. So the interest saved is expected to be given back through a more expensive repayment. Borrowing in a low-rate currency is not free money — it is a bet that the currency will not strengthen as much as the market expects, and it should be presented to a board in exactly those terms.",
        },
        {
          kind: "text",
          md: "The corollary is the recommendation the examiner is usually looking for: **match the currency of borrowing to the currency of the cash flows that will service it**. A subsidiary earning pesos should carry peso debt where possible. That is a natural hedge, it costs nothing to maintain, it works over horizons no forward contract reaches, and it removes the covenant fragility that a currency mismatch creates.",
        },
        {
          kind: "activity",
          title: "Advise on a funding proposal",
          prompt:
            "A group with sterling revenues is offered a yen loan at 1.2% against a sterling facility at 5.4%. The treasurer wants to take the yen loan for the saving. What do you advise?",
          answer:
            "That the 4.2 point saving is not a saving, and should not be presented to the board as one. Interest rate parity says a currency with much lower interest rates is expected to appreciate by roughly the differential, so the expectation is that the yen repayment will cost more in sterling by about as much as the interest saved. What the proposal really is, is an unhedged currency position taken by the treasury, funded by borrowing, in a currency the group has no revenues in - and it is worth asking whether the board has authorised the treasury to take directional currency positions at all, because most risk policies do not. The downside is not symmetrical either: if the yen strengthens sharply, the sterling value of both the interest and the principal rises while sterling revenues are unchanged, which hits interest cover and can breach a covenant without anything happening to the business. My advice would be to take the sterling facility, or if the yen pricing is genuinely attractive for other reasons, to take the yen loan and swap it back into sterling with a currency swap - which captures whatever real pricing advantage exists while removing the exposure. The one case where the yen loan stands on its own is if the group has, or plans, yen revenues to service it.",
        },
      ],
      check: {
        q: "A company borrows in a low-interest-rate currency to reduce its financing cost. What does interest rate parity suggest about this?",
        options: [
          "It is a reliable way to reduce the cost of borrowing",
          "The low-rate currency is expected to appreciate by approximately the interest differential, so the interest saved is expected to be offset by a more costly repayment — it is a currency position, not a saving",
          "The interest rate differential has no effect on exchange rates",
          "The borrowing will be cheaper only if the company also hedges it",
        ],
        correct: 1,
        explain:
          "Parity relationships mean the market has already priced the differential into expected exchange rate movements, so on average there is no free saving — only a position taken on the currency. The honest framing for a board is that the group would be taking directional currency risk to lower a reported interest charge, which is usually outside the treasury's mandate.",
      },
    },
  ],
  examTraps: [
    { trap: "Defining a eurobond as a bond denominated in euros.", fix: "It is issued outside the home jurisdiction of its currency, whatever that currency is." },
    { trap: "Recommending foreign borrowing for its lower coupon alone.", fix: "Interest rate parity implies the saving is expected to be offset by a costlier repayment." },
    { trap: "Ignoring which currency will service the debt.", fix: "Match borrowing to revenue currency; where you cannot, say so and price the exposure." },
    { trap: "Listing 'lower cost' as the main benefit of international markets.", fix: "Capacity and funding resilience are usually the larger and more durable gains." },
  ],
  keyTerms: [
    { term: "Eurobond", def: "A bond issued outside the domestic jurisdiction of the currency in which it is denominated, typically lightly regulated and sold internationally." },
    { term: "Syndicated loan", def: "A single facility provided jointly by a group of banks, allowing a borrower to raise more than any one lender would provide." },
    { term: "Depositary receipt", def: "A certificate representing shares in a foreign company, traded in a local market's currency without a full listing." },
    { term: "Currency matching", def: "Funding assets or operations in the currency of the cash flows that will service the borrowing, creating a natural hedge." },
  ],
  summary: [
    "International markets offer eurobonds, eurocurrency and syndicated loans, and equity through dual listings or depositary receipts.",
    "The durable benefits are capacity and resilience more often than a lower coupon.",
    "A low coupon in a low-rate currency is expected to be offset by a costlier repayment.",
    "Match the currency of borrowing to the currency of the cash flows servicing it, or swap back.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes a bond a eurobond?", a: "It is issued outside the domestic jurisdiction of its denomination currency — a yen bond sold in London qualifies." },
    { q: "Why is a low foreign interest rate not a genuine saving?", a: "Interest rate parity implies that currency is expected to appreciate by about the differential, so the repayment is expected to cost more by roughly what the interest saved." },
    { q: "How can a group capture attractive foreign pricing without the exposure?", a: "Borrow in the foreign currency and swap the obligation back into the currency of its revenues with a currency swap." },
  ],
  furtherStudy: [
    "AFM-23 appraises the overseas projects this finance funds.",
    "AFM-16 covers the domestic sources of finance these sit alongside.",
    "AFM-07 describes the international financial markets these instruments are issued into.",
    "Area E covers the currency swaps that convert a foreign obligation back into the home currency.",
  ],
}

export const AFM_TREE_AREA_B_PART4: StudyChapter[] = [AFM_TREE_21, AFM_TREE_22, AFM_TREE_23, AFM_TREE_24]
