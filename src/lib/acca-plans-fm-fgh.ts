/*
 * FM Areas F, G and H — valuation, market efficiency, risk management and the
 * employability/technology skills used to turn a model into advice.
 *
 * Parity and hedge plans state the quotation direction before calculating, so
 * a correct formula cannot be applied to the inverted rate. Spreadsheet plans
 * finish with a control total and an applied recommendation: output is not yet
 * advice until assumptions, risk and action are communicated.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FM_PLANS_FGH: ExamPlanMap = {
  /* ── FM-21 · Business valuations ──────────────────────────────────────── */

  "FM-21::why-and-asset": {
    title: "Building an asset valuation for the correct purpose",
    format: "written",
    marks: 10,
    requirement:
      "A private manufacturing company is being valued for a possible acquisition. Its statement of financial position reports net assets of $8.0 million. Land has a market value $2.0 million above carrying amount, obsolete inventory is overstated by $0.6 million, an internally developed brand not recognised in the accounts is independently valued at $1.5 million, and closure costs of $0.4 million would arise only on liquidation. Calculate adjusted net asset value and discuss when asset-based valuation is useful and limited. (10 marks)",
    plan: [
      {
        step: "Define the valuation purpose first",
        detail:
          "For acquisition as a going concern, adjust assets and liabilities to relevant current values but do not automatically include costs that arise only under liquidation. Purpose controls both the basis and the adjustments.",
      },
      {
        step: "Bridge book net assets to adjusted value",
        detail:
          "Start with $8m, add the land uplift and supported unrecognised brand, and remove obsolete inventory. Show each line; this bridge makes the final $10.9m checkable.",
      },
      {
        step: "Separate going-concern from break-up value",
        detail:
          "Closure cost belongs in a liquidation basis, where selling costs and forced-sale discounts also matter. It is not an existing acquisition liability merely because management supplied it.",
      },
      {
        step: "Evaluate what the method misses",
        detail:
          "Asset value gives support for asset-rich or loss-making businesses and a possible floor, but ignores earning capacity, synergies and difficult goodwill estimates; book and even market values may not equal value in use.",
      },
    ],
    answer:
      "**Adjusted net asset value for a going-concern acquisition ($m)**\n\n| | $m |\n|---|---:|\n| Reported net assets | 8.0 |\n| Land uplift to market value | 2.0 |\n| Obsolete inventory write-down | (0.6) |\n| Independently supported brand | 1.5 |\n| **Adjusted net asset value** | **10.9** |\n\nThe $0.4m closure cost is excluded because the stated purpose is acquisition as a going concern and the cost arises only on liquidation. A break-up valuation would deduct it and also consider asset-selling costs, tax and forced-sale discounts, giving $10.5m before any further liquidation adjustments.\n\nAn asset basis is useful for property/investment companies, asset-rich manufacturers, businesses with unstable or negative earnings and as a floor or bargaining reference where assets can be realised. It is limited because it does not value future earning capacity, customer relationships, workforce, technology or acquisition synergies unless separately measurable. The brand estimate itself may be subjective; specialised assets may have low market value outside the business. Use it alongside income and DCF methods, selecting the basis that matches why and for whom the valuation is being made.",
    earns: [
      "Reconciling book net assets to $10.9m through three explicit adjustments",
      "Excluding the conditional closure cost from a going-concern basis",
      "Explaining when asset value is informative and which earning/intangible values it misses",
    ],
    loses: [
      "Deducting liquidation-only cost without changing the valuation basis",
      "Using unadjusted book values as though they were current economic values",
      "Presenting net assets as the acquisition value without considering earnings or synergy",
    ],
  },

  "FM-21::income": {
    title: "Reconciling dividend and earnings valuations",
    format: "mtq",
    marks: 10,
    requirement:
      "A company has maintainable earnings after tax of $2.4 million, pays dividends of $1.2 million, and has 3 million shares. Comparable listed companies trade on an average P/E of 9. Its cost of equity is 11% and dividends are expected to grow at 3%. Calculate equity value using the P/E method and dividend-growth model, then explain why the values differ. (10 marks)",
    plan: [
      {
        step: "Normalise the earnings before multiplying",
        detail:
          "Use maintainable after-tax earnings attributable to equity with the comparable P/E. Confirm whether control, size and private-company discounts make the peer multiple transferable.",
      },
      {
        step: "Use next dividend in the growth model",
        detail:
          "D0 per share is $1.2m/3m = $0.40; grow once to D1 = $0.412. Apply the DVM formula supplied on screen, keeping ke and g in consistent percentage form.",
      },
      {
        step: "Reconcile value per share and total value",
        detail:
          "P/E gives a total then per share; DVM gives per share then total. Convert both to the same equity-value basis before comparing rather than mixing enterprise and equity measures.",
      },
      {
        step: "Explain difference through assumptions",
        detail:
          "P/E reflects peer growth, risk and market pricing applied to earnings; DVM reflects this company's payout, growth and cost of equity. Retention, comparability and small changes in ke − g can create a wide gap.",
      },
    ],
    answer:
      "**P/E valuation:** $2.4m × 9 = **$21.6m equity value**, or **$7.20 per share**. This assumes the 9-times peer multiple is appropriate for the company's growth, risk, accounting quality, liquidity and control position.\n\n**Dividend-growth valuation:** D0 = $1.2m/3m = $0.40 per share; D1 = $0.40 × 1.03 = **$0.412**. Using the supplied DVM formula, value = $0.412/(0.11 − 0.03) = **$5.15 per share**, total **$15.45m**. Using D0 gives the $5.00 distractor.\n\nThe $6.15m gap is not an arithmetic contradiction. P/E capitalises all maintainable earnings using market expectations embedded in comparables; DVM values the forecast dividend stream under constant growth and is sensitive to payout policy and the small 8% ke − g denominator. The company retains half its earnings, and value from that retention depends on reinvestment returns. Peer multiple adjustments and sensitivity to ke and g should be shown rather than averaging the two valuations without judgement.",
    earns: [
      "Calculating $21.6m P/E equity value and $15.45m DVM equity value",
      "Growing D0 once to a $0.412 next dividend",
      "Explaining the gap through payout, growth, risk and comparability assumptions",
    ],
    loses: [
      "Applying the P/E to revenue or pre-interest enterprise earnings",
      "Using the dividend just paid as D1",
      "Averaging the two figures without assessing which assumptions fit",
    ],
  },

  "FM-21::dcf": {
    title: "Valuing operations by DCF and bridging to equity",
    format: "written",
    marks: 20,
    requirement:
      "A business is forecast to generate free cash flow to the firm of $3.0 million in year 1, growing at 4% a year in perpetuity. WACC is 10%. It has debt with market value $12 million and surplus cash of $2 million.\n\n(a) Calculate enterprise and equity value by DCF and value per share if 5 million shares exist. (10 marks)\n(b) Discuss the choice among DCF, P/E and asset-based valuation for an acquisition. (10 marks)",
    plan: [
      {
        step: "Respect the 10 calculation, 10 discussion split",
        detail:
          "The first half is a valuation bridge; the second half compares method fit. A perfect perpetuity with no method discussion has a hard ceiling of ten marks.",
      },
      {
        step: "Match firm cash flow to WACC",
        detail:
          "FCFF discounted at WACC produces enterprise value. The $3m is explicitly year 1, so use it directly in the growing perpetuity; do not grow it a second time.",
      },
      {
        step: "Bridge enterprise to equity visibly",
        detail:
          "Subtract market debt because lenders own part of enterprise value, then add non-operating surplus cash. Divide only the resulting equity value by ordinary shares.",
      },
      {
        step: "Compare methods by business and purpose",
        detail:
          "DCF captures explicit cash, timing, risk and synergy but is forecast-sensitive; P/E is market-anchored but depends on comparable earnings; assets support asset-rich or downside values but miss earnings.",
      },
      {
        step: "Present a range and reconciliation",
        detail:
          "Use scenario sensitivity for WACC and growth, reconcile different bases to equity value and explain acquisition synergies separately so they are not paid away in the stand-alone price.",
      },
    ],
    answer:
      "**(a) DCF valuation**\n\nEnterprise value = year-1 FCFF/(WACC − growth) = $3.0m/(0.10 − 0.04) = **$50.0m**.\n\n| Bridge to equity | $m |\n|---|---:|\n| Enterprise value | 50.0 |\n| Less market value of debt | (12.0) |\n| Add surplus non-operating cash | 2.0 |\n| **Equity value** | **40.0** |\n\nValue per share = $40m/5m = **$8.00**. The table reconciles enterprise claims to shareholder value. Subtracting book debt, forgetting cash or dividing enterprise value by shares produces the standard distractors.\n\n**(b) Method choice**\n\nDCF is most directly linked to value because it uses cash flow, timing and risk and can model acquisition changes. Here it is extremely sensitive to the 6% gap between WACC and perpetual growth; growth cannot exceed the economy indefinitely and FCFF must be sustainable after reinvestment.\n\nA P/E valuation is simple and market-anchored, but comparable companies may differ in growth, risk, gearing, accounting and liquidity; P/E produces equity value from maintainable equity earnings. Asset valuation is useful for property-rich, loss-making or break-up cases and provides downside evidence, but omits earning power and internally generated intangibles.\n\nUse a range: DCF scenarios for cash and synergy, adjusted peer multiples as a market check, and net assets as support. Keep stand-alone value separate from buyer-specific synergy so the acquirer does not pay the seller the entire benefit it brings.",
    earns: [
      "Ten-mark DCF bridge from $50m enterprise to $40m equity and $8 per share",
      "Matching FCFF with WACC and treating $3m as year-1 cash flow",
      "Using ten discussion marks to compare forecast, comparable and asset assumptions",
      "Separating stand-alone value from buyer-specific synergy",
    ],
    loses: [
      "Dividing the $50m enterprise value directly by shares",
      "Subtracting surplus cash instead of adding it to equity value",
      "Growing the stated year-1 cash flow again before capitalising",
      "Completing only the valuation and accepting the ten-mark ceiling",
    ],
  },

  /* ── FM-22 · Market efficiency ────────────────────────────────────────── */

  "FM-22::forms": {
    title: "Classifying weak, semi-strong and strong efficiency",
    format: "ot",
    marks: 2,
    requirement:
      "Research shows that investors cannot earn abnormal returns using published financial statements, announcements or past price patterns, but a director repeatedly profits using unpublished takeover information. Which form of market efficiency is supported?\n\nA Weak form only\nB Semi-strong form but not strong form\nC Strong form\nD No form of efficiency",
    plan: [
      {
        step: "List the information set for each form",
        detail:
          "Weak prices past trading information; semi-strong prices all public information including accounts and announcements; strong prices public and private inside information.",
      },
      {
        step: "Use the strongest set the evidence supports",
        detail:
          "Failure of both charting and public fundamental analysis supports semi-strong efficiency, which includes weak-form information. The director's private-information profit contradicts strong efficiency.",
      },
      {
        step: "Avoid confusing legality with efficiency",
        detail:
          "Insider dealing may be illegal, but the exam classification asks whether private information was already reflected in price. The profit is evidence that it was not.",
      },
    ],
    answer:
      "**B — semi-strong but not strong-form efficiency.** Prices appear to incorporate past price data and all **public** financial statements and announcements, so neither technical nor public fundamental analysis earns abnormal returns. That supports semi-strong efficiency and necessarily weak-form efficiency. The director profits from **private** takeover information, showing it was not already in price, so strong form is rejected. **A** understates the public-information evidence; **C** contradicts the insider profit; **D** ignores that forms are nested rather than all-or-nothing.",
    earns: [
      "Matching public information to semi-strong efficiency",
      "Using profitable private information to reject strong form",
    ],
    loses: [
      "Selecting weak form despite evidence about published accounts",
      "Calling the market strong-form efficient merely because insider dealing is prohibited",
    ],
  },

  "FM-22::implications": {
    title: "Using efficient-market logic in financing decisions",
    format: "written",
    marks: 10,
    requirement:
      "Discuss the implications of semi-strong market efficiency for a listed company's financing, disclosure, project selection and attempts to time the market. (10 marks)",
    plan: [
      {
        step: "Translate efficiency into price behaviour",
        detail:
          "New public information is reflected rapidly and unbiasedly, so price changes on announcement rather than when cash flows later occur. Expected returns still compensate risk; efficiency does not mean constant or correct-with-certainty prices.",
      },
      {
        step: "Apply the implication to disclosure and issues",
        detail:
          "Clear timely disclosure reduces uncertainty, but cosmetic accounting cannot create lasting value. Routine attempts to issue only when managers think price is temporarily high are unreliable in a semi-strong market.",
      },
      {
        step: "Keep project NPV separate from securities trading",
        detail:
          "Even in an efficient capital market, companies create value by real positive-NPV investments, operating advantage and financing efficiencies, not by repeatedly finding mispriced listed securities.",
      },
      {
        step: "Acknowledge practical limits",
        detail:
          "Issue costs, taxes, asymmetric private information, liquidity and behavioural anomalies remain. Managers should test financing capacity and signalling without assuming they can systematically beat the market.",
      },
    ],
    answer:
      "In a semi-strong efficient market, share prices rapidly reflect all publicly available information. Financing announcements, project news and results affect price when their expected cash-flow and risk implications become public, not only when the cash later occurs. Honest, timely disclosure therefore matters; changing accounting presentation without changing cash or risk should not create sustained value.\n\nManagement should not expect to issue shares systematically at an overvalued public-market price or repurchase them whenever it believes the price is cheaply wrong using public analysis. Financing should be selected for cost, risk, tax, maturity, control and capacity. Private information creates a signalling problem, so credible explanation and pre-emption remain relevant even though public information is priced.\n\nMarket efficiency does not eliminate corporate investment appraisal. Real competitive advantage and positive-NPV projects create value precisely because the share price will reflect their expected benefit when recognised. It also does not mean prices never move, every estimate is perfectly accurate or risk disappears. Transaction cost, liquidity, tax, issue cost and temporary behavioural effects remain. The finance director should focus on cash flows and risk, communicate material information and avoid a strategy dependent on repeatedly outguessing an informed market.",
    earns: [
      "Explaining rapid incorporation of public information without claiming price certainty",
      "Applying efficiency to disclosure, issue timing and real project selection",
      "Recognising signalling and market-friction qualifications",
    ],
    loses: [
      "Concluding that efficient markets remove the need for NPV appraisal",
      "Saying share prices cannot change in an efficient market",
      "Assuming cosmetic accounting reliably raises market value",
    ],
  },

  "FM-22::anomalies-behavioural": {
    title: "Explaining anomalies without declaring markets useless",
    format: "written",
    marks: 10,
    requirement:
      "Explain how behavioural biases and observed market anomalies can challenge efficient-market assumptions, and discuss whether a finance manager can use them to earn abnormal returns. (10 marks)",
    plan: [
      {
        step: "Pair each bias with price behaviour",
        detail:
          "Use overconfidence and excessive trading, anchoring and slow adjustment, loss aversion/disposition, herd behaviour and representativeness. Naming psychology without a market consequence earns little.",
      },
      {
        step: "Give evidence as anomalies, not laws",
        detail:
          "Momentum, reversals, size/value effects, bubbles and post-announcement drift can conflict with simple efficiency, but may reflect risk, data mining, measurement or transaction constraints.",
      },
      {
        step: "Test exploitability after cost and risk",
        detail:
          "A pattern must persist after trading costs, taxes, model risk and crowding and be available before publication. Limits to arbitrage can stop rational traders correcting mispricing immediately.",
      },
      {
        step: "Give the corporate rather than speculative response",
        detail:
          "Use governance, independent forecasts, base rates, pre-mortems and disciplined appraisal to reduce managerial bias. Do not base project funding on an unrepeatable trading anomaly.",
      },
    ],
    answer:
      "**Overconfidence** can make investors or managers overestimate information and trade or invest too much. **Anchoring** can slow price adjustment from an old forecast; **loss aversion** encourages holding losers and selling winners; **herding** and representativeness can amplify trends and bubbles. Observations such as momentum, later reversal, value/size effects and post-announcement drift appear inconsistent with instant unbiased adjustment.\n\nThey do not automatically provide free profit. A reported anomaly may compensate hidden risk, result from data mining or disappear after publication. Trading cost, tax, short-sale limits, funding risk and the possibility that mispricing widens can prevent arbitrage. If many investors pursue the pattern its price effect may vanish. Evidence against the strongest efficient-market assumptions is not evidence that every manager can forecast prices.\n\nFor corporate finance, the more reliable use of behavioural insight is to improve decisions: independent challenge, reference-class forecasts, scenario ranges, pre-mortems, separation of project champion from appraisal and post-completion review. Financing timing may consider market conditions and investor sentiment, but positive-NPV projects and resilient capital structure remain the basis. A strategy of earning abnormal returns must demonstrate persistence after risk and all costs.",
    earns: [
      "Linking named biases to observable decision or price behaviour",
      "Explaining why an anomaly may not be exploitable after risk and cost",
      "Applying behavioural safeguards to corporate appraisal",
    ],
    loses: [
      "Treating any historic pattern as a guaranteed future return",
      "Concluding one anomaly proves prices contain no information",
      "Discussing investor psychology without an implication for price or corporate decisions",
    ],
  },

  /* ── FM-23 · Foreign currency risk ────────────────────────────────────── */

  "FM-23::exposures": {
    title: "Classifying transaction, translation and economic exposure",
    format: "mtq",
    marks: 10,
    requirement:
      "For five exchange-rate effects involving a foreign-currency receivable, a consolidated overseas subsidiary, an import contract, a competitor's currency advantage and future overseas sales not yet contracted, classify transaction, translation or economic exposure and explain the cash or reporting consequence. (10 marks)",
    plan: [
      {
        step: "Ask whether a contracted monetary item exists",
        detail:
          "A foreign-currency receivable, payable or firm purchase/sale contract creates transaction exposure between agreement and settlement and changes an actual home-currency cash flow.",
      },
      {
        step: "Ask whether the effect arises on consolidation",
        detail:
          "Translation exposure restates foreign subsidiary assets, liabilities and results into group reporting currency. It is an accounting-value effect without immediate cash settlement.",
      },
      {
        step: "Put competitive and future effects in economic exposure",
        detail:
          "Economic exposure changes the present value of future operating cash flows through prices, demand, costs and competitor position, including forecast transactions not yet contracted.",
      },
      {
        step: "State overlap and management horizon",
        detail:
          "A subsidiary can create translation and economic exposure simultaneously, while a contracted dividend can create transaction exposure. Classification follows the specific consequence asked, not merely the word overseas.",
      },
    ],
    answer:
      "A contracted **foreign-currency receivable** is **transaction exposure**: the home-currency cash collected changes before settlement. An **import contract/payable** is also transaction exposure once the commitment is denominated in foreign currency.\n\nRestating the net assets and profit of an **overseas subsidiary** for consolidated accounts is **translation exposure**. The reported group values move even when no cash is remitted.\n\nA competitor gaining a lasting cost advantage because its currency weakens is **economic exposure**: future prices, market share and operating cash flows change. Expected overseas sales not yet contracted are also economic exposure; once an invoice is issued they create a transaction item as well.\n\nThe trap is calling every foreign effect transaction risk. Transaction exposure is specific and often hedgeable with a dated financial contract; translation is primarily reporting; economic exposure is long-term and strategic, managed through sourcing, pricing, production location, currency diversification and product competitiveness.",
    earns: [
      "Classifying contracted monetary items as transaction exposure",
      "Separating consolidation translation from immediate cash flow",
      "Applying economic exposure to competitor and uncontracted future cash flows",
    ],
    loses: [
      "Calling every overseas item transaction exposure",
      "Claiming translation exposure can never have any strategic relevance",
      "Ignoring that a forecast sale becomes transaction exposure once contracted/invoiced",
    ],
  },

  "FM-23::parity": {
    title: "Choosing purchasing-power or interest-rate parity",
    format: "mtq",
    marks: 10,
    requirement:
      "The spot rate is $1.2500 per €1. Annual inflation is 5% in the US and 2% in the eurozone; annual interest rates are 6% in the US and 3% in the eurozone. Calculate the one-year expected spot rate using purchasing-power parity and the one-year forward rate using interest-rate parity, state which relationship predicts which rate, and explain the quotation direction. (10 marks)",
    plan: [
      {
        step: "Write the quotation in words",
        detail:
          "$ per € means the dollar is the variable numerator and euro is the base unit. If US prices or interest rates rise faster, more dollars per euro are expected; this direction check prevents an inverted formula from surviving.",
      },
      {
        step: "Use PPP for expected future spot",
        detail:
          "Apply the relative price change to the spot rate: $1.2500 × 1.05/1.02. PPP concerns inflation and expected currency purchasing power, not the contracted forward quote.",
      },
      {
        step: "Use IRP for the forward rate",
        detail:
          "Apply interest-rate parity: $1.2500 × 1.06/1.03 for a $/€ quote. IRP links spot, interest rates and the no-arbitrage forward rate.",
      },
      {
        step: "Name inversion distractors explicitly",
        detail:
          "Using 1.02/1.05 or 1.03/1.06 predicts fewer dollars per euro despite higher US rates/inflation. Taking a reciprocal converts to €/ $, a different quotation, and must be labelled as such.",
      },
    ],
    answer:
      "The quote is **$ per €1**. Higher US inflation than euro inflation should weaken the dollar, so one euro should buy **more** dollars — a direction check before calculation.\n\n**Purchasing-power parity (expected future spot):** $1.2500 × (1.05/1.02) = **$1.2868 per €**. PPP predicts the expected spot rate from relative inflation. The $1.2143 inverse-direction distractor uses 1.02/1.05.\n\n**Interest-rate parity (one-year forward):** $1.2500 × (1.06/1.03) = **$1.2864 per €**. IRP predicts the forward rate from relative interest rates under no arbitrage. The $1.2146 distractor inverts the interest ratio.\n\nThe figures happen to be close because the inflation and interest differentials are close; the relationships are not interchangeable. Money-market hedging and forward pricing use IRP logic, while PPP is a longer-run forecast relationship. If quoting euros per dollar, take the reciprocal and relabel the units.",
    earns: [
      "Writing $/€ in words and checking that higher US inflation means more dollars per euro",
      "Using PPP to obtain $1.2868 expected spot and IRP to obtain $1.2864 forward",
      "Explaining which relationship predicts which rate",
    ],
    loses: [
      "Inverting the inflation or interest ratio while leaving the quotation unchanged",
      "Calling PPP the forward-rate formula",
      "Taking a reciprocal without relabelling the quote as euros per dollar",
    ],
  },

  "FM-23::hedges": {
    title: "Comparing forward and money-market hedges for a payable",
    format: "written",
    marks: 20,
    requirement:
      "A US company must pay €1,030,000 in one year. The spot rate is $1.25 per €1 and the one-year forward rate is $1.29 per €1. One-year borrowing and deposit rates are 7% and 5% in the US, and 4% and 3% in the eurozone.\n\n(a) Calculate the dollar cost using a forward hedge and a money-market hedge. (12 marks)\n(b) Discuss the alternatives, including an option and doing nothing. (8 marks)",
    plan: [
      {
        step: "Protect the 12 calculation, 8 discussion split",
        detail:
          "Show two labelled hedge routes and leave time for certainty, upside, credit lines and commercial exposure. A perfect cost comparison without discussion has a twelve-mark ceiling.",
      },
      {
        step: "Fix the payable direction",
        detail:
          "The company needs euros, so under a forward it buys €1.03m at $1.29/€. Multiplying gives dollars; dividing would convert in the wrong direction.",
      },
      {
        step: "Build the money-market hedge from the future euro need",
        detail:
          "Deposit enough euros now to grow to €1.03m using the euro deposit rate, because the company is investing euros. Buy those euros at spot, funded with dollar borrowing, then grow the dollar borrowing at the US borrowing rate.",
      },
      {
        step: "Compare like-dated dollar costs",
        detail:
          "Both results must be year-1 dollar amounts. Use the spot implied by the quoted market if provided; here use $1.25/€ from the accompanying case data and label all borrowing/deposit sides.",
      },
      {
        step: "Discuss risk rather than selecting on pennies",
        detail:
          "Compare certainty, transaction/credit capacity, option premium and upside, forecast reliability and natural matching. Doing nothing is an active currency view, not a zero-cost hedge.",
      },
    ],
    answer:
      "Using the case spot rate of **$1.25 per €**:\n\n**Forward hedge:** buy €1,030,000 one year forward at $1.29 = **$1,328,700** payable in one year.\n\n**Money-market hedge:**\n\n1. Deposit euros now: €1,030,000/1.03 = **€1,000,000**.\n2. Buy those euros now at $1.25/€ = **$1,250,000**.\n3. Borrow dollars now; one-year repayment at the 7% US borrowing rate = $1,250,000 × 1.07 = **$1,337,500**.\n4. The euro deposit grows at 3% to exactly **€1,030,000**, proving the hedge settles the payable.\n\nThe forward is cheaper by **$8,800** and simpler on these rates. The route uses the euro **deposit** rate and dollar **borrowing** rate; using the opposite sides creates an unattainable dealer-rate distractor.\n\nA currency option fixes a worst-case dollar cost while retaining benefit if the euro weakens, but requires an upfront premium and strike choice. It suits uncertain payables because it need not be exercised. A natural hedge matches euro receipts or sourcing but may be incomplete. Doing nothing avoids explicit fees but leaves the full rate risk and should be justified as risk capacity, not described as free. Consider counterparty limits, borrowing capacity, timing and forecast certainty; choose the forward here if the payable is firm and the quoted terms are available.",
    earns: [
      "Twelve-mark pair of hedge routes ending at comparable year-1 dollar costs",
      "Multiplying the payable by the $/€ forward rate to get $1,328,700",
      "Discounting euros at 3% and growing dollar borrowing at 7% to get $1,337,500",
      "Proving the euro deposit grows exactly to the payable",
      "Using eight discussion marks for options, natural hedge, capacity and forecast certainty",
    ],
    loses: [
      "Dividing by a dollars-per-euro quote when buying euros",
      "Using the euro borrowing rate or US deposit rate on the wrong side of the money-market hedge",
      "Comparing a present dollar amount with a future forward payment",
      "Calling an unhedged position costless or omitting the eight discussion marks",
    ],
  },

  /* ── FM-24 · Interest rate risk ───────────────────────────────────────── */

  "FM-24::exposure-yield-curve": {
    title: "Reading the yield curve from the company's exposure",
    format: "mtq",
    marks: 10,
    requirement:
      "A company has floating-rate debt and expects to borrow again in six months for three years. The yield curve is upward sloping. Explain its exposures, give expectations, liquidity-preference and market-segmentation explanations of the curve, and state one limitation of using it as a forecast. (10 marks)",
    plan: [
      {
        step: "Separate existing from forecast borrowing",
        detail:
          "Existing floating debt has repricing exposure now; the planned borrowing has rate-setting exposure until the loan begins. Amount, timing and reference rate determine the hedge.",
      },
      {
        step: "Give each theory its causal claim",
        detail:
          "Expectations reads higher future short rates; liquidity preference adds a term premium demanded by lenders; segmentation says supply and demand in maturity bands can set yields independently.",
      },
      {
        step: "Avoid reading one curve as one certainty",
        detail:
          "An upward slope may combine expectations and premiums, and changes with inflation, policy, credit and liquidity. It does not guarantee the company's own future borrowing rate.",
      },
      {
        step: "Connect analysis to action",
        detail:
          "Measure sensitivity of interest and cover, decide the fixed/floating target and consider an FRA, futures, option/cap or swap that matches the six-month start and three-year exposure.",
      },
    ],
    answer:
      "Existing floating-rate debt exposes current interest cash flow to each reset. The planned loan is a **future borrowing exposure**: rates can rise before the amount is drawn, and the company then remains exposed during its three-year floating life unless fixed or hedged.\n\nUnder **expectations theory**, an upward curve reflects expected higher future short-term rates. **Liquidity-preference theory** says investors prefer shorter, more liquid claims and require a positive term premium for long lending, so the curve can slope upward even if expected short rates are unchanged. **Market segmentation** says different borrowers and investors operate in maturity bands, and supply/demand imbalances set those yields.\n\nThe curve is not a certain forecast: it mixes expectations with term, liquidity and credit premiums and can move after policy or inflation news. The company's loan also includes its own credit margin. Quantify interest-cover stress, then match a hedge to amount and dates — an FRA/future/option for the future setting and a swap or fixed-rate loan for the continuing exposure. Do not hedge solely because the curve slopes up without considering premium, flexibility and risk capacity.",
    earns: [
      "Separating repricing risk on existing debt from future rate-setting risk",
      "Explaining all three yield-curve theories by their causal mechanism",
      "Connecting the six-month/three-year exposure to suitable hedge horizons",
    ],
    loses: [
      "Treating an upward yield curve as a guaranteed rate forecast",
      "Ignoring the company's credit margin over market yields",
      "Naming hedge instruments without matching amount, start date or duration",
    ],
  },

  "FM-24::instruments": {
    title: "Selecting an interest hedge by payoff and flexibility",
    format: "written",
    marks: 10,
    requirement:
      "A company expects to borrow a fixed amount in three months but the transaction may be cancelled. Discuss the suitability of an FRA, interest-rate futures, an interest-rate option/cap and a swap. (10 marks)",
    plan: [
      {
        step: "Start from the cancellation risk",
        detail:
          "The company needs protection against rates rising but may have no underlying borrowing. An obligatory hedge can become a speculative exposure if the transaction is cancelled.",
      },
      {
        step: "Describe each payoff and commitment",
        detail:
          "An FRA fixes one future interest period OTC; futures are standardised and margined; an option/cap gives a ceiling for a premium; a swap exchanges fixed and floating streams over several periods.",
      },
      {
        step: "Match horizon and basis",
        detail:
          "A single future loan period may fit an FRA or futures; a continuing multi-period loan may justify a swap or cap. Check reference rate, notional, date and duration for basis risk.",
      },
      {
        step: "Recommend flexibility where uncertainty is material",
        detail:
          "An option or cap can expire if borrowing is cancelled and retains benefit from lower rates, but the premium must be compared with the cancellation probability and risk limit.",
      },
    ],
    answer:
      "An **FRA** is an OTC agreement fixing the effective rate for a specified future borrowing period through cash settlement. It can match amount and dates closely, but is binding; cancellation leaves a gain or loss and introduces counterparty exposure.\n\n**Interest-rate futures** are exchange-traded, liquid and have low counterparty risk, but contracts are standardised, require margin and create basis risk. A borrower generally sells futures so a rate rise produces a futures gain; closing the hedge after cancellation can still crystallise a result.\n\nAn **interest-rate option or cap** gives the right to compensation above a strike while retaining benefit if rates fall. If the borrowing is cancelled, the option can lapse, making it well suited to the scenario. The cost is the upfront premium, which is paid even if unused.\n\nA **swap** exchanges fixed and floating interest over multiple periods and suits a continuing borrowing exposure. It is usually excessive for a single uncertain future draw and creates termination value if cancelled.\n\nRecommend an option/cap if cancellation probability is material and the premium is acceptable; use an FRA or futures if borrowing is firm and lower explicit cost matters. Match reference rate, notional and dates and quantify basis and cancellation risk.",
    earns: [
      "Explaining payoff, commitment and trading features of all four instruments",
      "Using possible cancellation to favour option flexibility",
      "Distinguishing a one-period hedge from a multi-period swap",
    ],
    loses: [
      "Calling an FRA optional because settlement is in cash",
      "Recommending a swap without addressing cancellation/termination value",
      "Ignoring reference-rate and date mismatch basis risk",
    ],
  },

  "FM-24::swap-worked": {
    title: "Constructing a swap and reconciling the shared saving",
    format: "written",
    marks: 20,
    requirement:
      "Company A can borrow fixed at 7.0% or floating at SOFR + 0.5%; Company B can borrow fixed at 9.2% or floating at SOFR + 1.4%. A wants floating debt and B wants fixed debt. A bank requires 0.2% of the principal and any remaining quality-spread differential is shared equally.\n\n(a) Construct an interest-rate swap and calculate each company's effective rate. (12 marks)\n(b) Discuss benefits and risks of the swap. (8 marks)",
    plan: [
      {
        step: "Protect the 12 calculation, 8 discussion split",
        detail:
          "Show comparative advantage, total gain, bank fee and the complete external-plus-swap cash flows for both companies. Then reserve eight marks for counterparty, basis, termination and exposure risk.",
      },
      {
        step: "Calculate the quality-spread differential",
        detail:
          "Fixed spread is 9.2 − 7.0 = 2.2%; floating spread is 1.4 − 0.5 = 0.9%. Potential gross gain is 1.3%, proving A has greater comparative advantage in fixed borrowing.",
      },
      {
        step: "Put each company in its comparative market",
        detail:
          "A borrows fixed at 7.0%; B borrows floating at SOFR + 1.4%. They then swap: A pays floating and receives fixed, B pays fixed and receives floating.",
      },
      {
        step: "Allocate and prove the net saving",
        detail:
          "After the bank's 0.2%, 1.1% remains, so each saves 0.55% against direct desired borrowing. Targets are A SOFR − 0.05% and B 8.65%. Solve the fixed swap rate and reconcile both.",
      },
      {
        step: "Discuss the risks of the actual contract",
        detail:
          "Cover counterparty and collateral, basis if reference rates differ, mark-to-market termination, duration/notional mismatch and the fact that principal borrowing remains with original lenders.",
      },
    ],
    answer:
      "**Comparative advantage and gain**\n\nFixed-market quality spread = 9.2% − 7.0% = **2.2%**. Floating-market spread = (SOFR + 1.4%) − (SOFR + 0.5%) = **0.9%**. Gross quality-spread differential = **1.3%**. After the bank's **0.2%**, the companies share **1.1%**, saving **0.55% each**.\n\nA wants floating and its direct cost is SOFR + 0.5%, so its target is **SOFR − 0.05%**. B wants fixed and its direct cost is 9.2%, so its target is **8.65%**.\n\nA borrows fixed at 7.0%, receives **7.05% fixed** from the bank and pays SOFR to the bank: effective cost = 7.0 − 7.05 + SOFR = **SOFR − 0.05%**.\n\nB borrows floating at SOFR + 1.4%, receives SOFR and pays **7.25% fixed** to the bank: effective cost = SOFR + 1.4 − SOFR + 7.25 = **8.65%**.\n\nThe bank receives 7.25% from B and pays 7.05% to A, retaining **0.20%**. The full benefit reconciles: A 0.55% + B 0.55% + bank 0.20% = **1.30%**.\n\nThe swap changes interest exposure, not the original debt principal or lender relationship. Benefits are access to comparative pricing, tailored notional/duration and no immediate principal exchange. Risks include counterparty default and collateral calls, basis mismatch if loan and swap use different floating references, termination cost when rates move or borrowing ends early, and rollover/notional mismatch. Credit deterioration can also remove the pricing advantage. Use documented netting, collateral and matched terms; do not rely on the arithmetic saving alone.",
    earns: [
      "Twelve-mark construction from 1.3% gross differential to 0.55% saving each",
      "Putting A in fixed and B in floating before swapping to desired exposures",
      "Reconciling A at SOFR − 0.05%, B at 8.65% and bank at 0.20%",
      "Using eight discussion marks for basis, counterparty and termination risks",
    ],
    loses: [
      "Comparing the fixed spread alone and claiming a 2.2% gain",
      "Putting each company directly in its desired market and losing comparative advantage",
      "Failing to make the two company savings plus bank fee add to 1.3%",
      "Treating the swap as repayment or transfer of the original principal",
    ],
  },

  /* ── FM-25 · Employability and technology skills ──────────────────────── */

  "FM-25::model-structure": {
    title: "Designing a spreadsheet another professional can audit",
    format: "written",
    marks: 10,
    requirement:
      "Explain how you would structure and control an investment-appraisal spreadsheet so that another finance professional can review, update and trust it. (10 marks)",
    plan: [
      {
        step: "Separate inputs, workings and outputs",
        detail:
          "Place source-labelled assumptions in one controlled area, calculations in chronological schedules and decisions in a concise output panel. Avoid hard-coded numbers inside repeated formulae.",
      },
      {
        step: "Make timing and units visible",
        detail:
          "Use year columns, consistent $/$000 units and separate rows for inflation, working-capital changes, tax lags and terminal flows. Clear signs and labels preserve method marks and reviewability.",
      },
      {
        step: "Build controls that can fail loudly",
        detail:
          "Use reconciliation totals, balance checks, formula consistency, input validation, protected formula cells and reasonableness flags. A green output is useful only if a broken model cannot look green.",
      },
      {
        step: "Document and test the decision",
        detail:
          "Record version, owner, source/date and approvals; show base, downside and sensitivity. Review formulas independently and compare actual outcomes with forecast after approval.",
      },
    ],
    answer:
      "Create separate, clearly coloured areas for **inputs**, **workings** and **outputs**. Each input should have a unit, source, date, owner and base/downside assumption. Use one cell for each assumption and references throughout; never bury a tax rate, inflation rate or discount rate inside repeated formulas.\n\nLay workings across consistent year columns with cash outflows negative. Keep revenue and cost inflation, incremental working capital, capital allowances, tax paid in arrears, terminal recovery and discount factors on distinct labelled rows. The output should show NPV, key sensitivities, funding peak and recommendation, linked to rather than retyped from the workings.\n\nControls should include opening-to-closing reconciliations, total working-capital recovery, tax-written-down-value roll-forward, formula-copy consistency, data-validation ranges and warnings for missing or inconsistent nominal/real inputs. Protect formula cells while leaving assumptions editable; maintain version history and peer review. Test zero growth, zero tax and extreme cases whose direction is known.\n\nA professional model is reproducible and auditable: another reviewer can trace every output to a sourced assumption, change it once, see all dependent results update and detect a broken relationship before advice is issued.",
    earns: [
      "Separating sourced inputs, chronological workings and linked outputs",
      "Making tax, inflation, working-capital timing and units visible",
      "Specifying reconciliations and failure controls rather than cosmetic formatting",
    ],
    loses: [
      "Hard-coding assumptions inside many formula cells",
      "Relying on cell colour without labels, source or protection",
      "Presenting an NPV with no control that proves cash, tax or terminal schedules foot",
    ],
  },

  "FM-25::functions": {
    title: "Using spreadsheet functions without hiding financial logic",
    format: "mtq",
    marks: 10,
    requirement:
      "For five spreadsheet tasks in an FM model, choose and explain an appropriate function or technique: discounted annual cash flows, irregular-date cash flows, IRR, a two-way sensitivity table and retrieving a scenario assumption by label. (10 marks)",
    plan: [
      {
        step: "State the financial timing before the function",
        detail:
          "Spreadsheet NPV normally discounts values entered as year-1 onward; time-zero cash belongs outside. XNPV uses actual dates. A correct function with wrong timing is still a wrong valuation.",
      },
      {
        step: "Match functions to cash-flow shape",
        detail:
          "Use NPV for regular periods, XNPV for irregular dates, IRR/XIRR for the corresponding return pattern and explicit PV rows when transparency matters. Check signs and at least one positive and negative flow for IRR.",
      },
      {
        step: "Use tables and lookups as controlled tools",
        detail:
          "A two-variable data table can vary rate and sales/growth against one linked output. XLOOKUP or INDEX/MATCH retrieves labelled assumptions more robustly than embedding row numbers or nested IFs.",
      },
      {
        step: "Keep an independent check",
        detail:
          "Compare NPV with sumproduct of cash and supplied/manual factors, ensure IRR makes NPV approximately zero and inspect sensitivity direction. Function output is evidence only after it reconciles to the financial logic.",
      },
    ],
    answer:
      "**Regular year-end cash flows:** use `NPV(rate, year1:yearN) + time0`. Including time zero inside the NPV range discounts it one period and creates a systematic distractor. A transparent alternative is `SUMPRODUCT(cash_flows, discount_factors)`.\n\n**Irregular dates:** use `XNPV(rate, values, dates)` so actual day intervals are respected; do not force them into equal annual periods.\n\n**Return:** use `IRR(values)` for regular periods or `XIRR(values, dates)` for actual dates, with conventional signs. Check that substituting the result into NPV produces approximately zero and beware multiple IRRs after multiple sign changes.\n\n**Two-way sensitivity:** link one output cell such as NPV and create a data table with discount rates on one axis and sales/growth on the other. Label the base case and use conditional formatting only as a visual aid.\n\n**Scenario assumption by label:** use `XLOOKUP(selected_scenario, labels, values)` or `INDEX/MATCH`, with validation on the selected label and an explicit not-found response. Functions should reveal, not replace, the underlying finance route and control totals.",
    earns: [
      "Keeping time-zero cash outside the regular NPV function",
      "Matching XNPV/XIRR to actual dates and validating IRR through zero NPV",
      "Using labelled lookups and a linked two-way data table with controls",
    ],
    loses: [
      "Putting the initial investment inside NPV and discounting it for one year",
      "Using IRR without checking signs or the possibility of multiple roots",
      "Using a lookup with silent approximate matches or hard-coded row numbers",
    ],
  },

  "FM-25::recommendation": {
    title: "Turning model output into a decision-ready recommendation",
    format: "written",
    marks: 20,
    requirement:
      "An investment model reports base-case NPV of $1.2 million, downside NPV of minus $0.8 million, a funding peak of $3 million in month 10 and greatest sensitivity to sales volume. The project also reduces emissions but depends on one untested supplier.\n\nPrepare a recommendation to the board that interprets the model, identifies limitations and sets out actions and controls. (20 marks)",
    plan: [
      {
        step: "Allocate 4 conclusion, 8 analysis, 8 action marks",
        detail:
          "Lead with a conditional decision and the value/funding numbers, use the middle for downside, sensitivity and non-financial factors, then give owners, triggers and controls. A model summary without action has a hard ceiling.",
      },
      {
        step: "State value and liquidity separately",
        detail:
          "The positive base NPV supports value creation, but the $3m month-10 funding peak is a financing constraint and the negative downside shows loss capacity. Neither is answered by the other.",
      },
      {
        step: "Translate sensitivity into due diligence",
        detail:
          "Sales volume is the fragile driver, so require customer evidence, break-even volume and staged commitments. An untested single supplier adds concentration and delay risk not captured by one NPV.",
      },
      {
        step: "Include strategic and external effects",
        detail:
          "Quantify or at least report emissions reduction, regulation, reputation and any carbon-price benefits consistently. Do not use a qualitative benefit to conceal a negative financial downside.",
      },
      {
        step: "Make approval conditional and monitored",
        detail:
          "Specify committed funding, supplier validation/backup, sales milestones, budget contingency, accountable owners and stop/review triggers. Schedule post-investment review against the original model.",
      },
    ],
    answer:
      "**Recommendation: approve conditionally, not unconditionally.** The base case adds **$1.2m** of expected value, but the downside destroys **$0.8m** and the company must secure at least the **$3m month-10 funding peak plus contingency** before commitment. Value and liquidity are separate tests: a positive NPV project can still fail if cash is unavailable at the peak.\n\nSales volume is the greatest sensitivity, so management should disclose the break-even volume and evidence demand through signed orders, pipeline conversion and an independent market reference. Re-run the downside with correlated price, volume and working-capital assumptions rather than changing volume alone. The single untested supplier introduces concentration, quality and schedule risk that may not be in the discount rate or cash flows. Complete technical and financial due diligence, negotiate performance guarantees and identify a qualified backup or safety stock.\n\nThe emissions reduction supports strategy and may reduce future regulatory/carbon cost or improve customer access, but quantify it separately and avoid double-counting benefits already in revenue or cost. Confirm environmental claims and implementation effects.\n\nApprove only when: committed funding covers the stressed peak; customer evidence meets a board-set sales threshold; the supplier passes testing and a contingency route exists; project contracts cap exposure; and an accountable owner reports monthly cost, schedule, volume, working capital and emissions. Stage major spend after milestones, define stop/review triggers if demand or supplier performance misses tolerance, and conduct post-completion review against the original base and downside model. This converts a model result into a controlled decision.",
    earns: [
      "Leading with a conditional decision that separates $1.2m value from the $3m funding peak",
      "Using the minus $0.8m downside and sales sensitivity to set due-diligence actions",
      "Addressing supplier concentration and emissions without double counting",
      "Setting owners, milestones, contingency and stop/review triggers",
    ],
    loses: [
      "Writing 'accept because NPV is positive' and ignoring downside and liquidity",
      "Repeating model outputs without converting them into evidence requests or controls",
      "Treating emissions as a reason to ignore the negative downside",
      "Giving no accountable owner, milestone or post-completion review",
    ],
  },
}
