/*
 * Topic Briefs — ACCA Advanced Financial Management (AFM).
 * One brief per syllabus area (A–E). Same instruction-layer format as
 * TOPIC_BRIEFS: concept in plain language, the structures/formulas, a
 * worked example, and the classic traps. Original text, syllabus-aligned.
 */

import type { TopicBrief } from "@/lib/acca-briefs"

export const AFM_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── AFM — Area A ───────────────────────── */
  {
    paper: "AFM",
    area: "A",
    title: "Role of the senior financial adviser",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Advising at the top of the organisation",
        body: `AFM is written as if you are the person the board turns to when the numbers get large and the decisions get irreversible — a takeover, a new plant on another continent, a debt restructuring. The senior financial adviser does not just crunch a model; they frame the decision, weigh it against the organisation's objectives, and say plainly what it means for the owners.

The anchor objective in AFM is the maximisation of shareholder wealth. Everything else — funding choices, dividend policy, risk hedging — is judged by whether it raises the risk-adjusted value the shareholders can expect. But the adviser sits inside a web of other claims. Managers may pursue their own comfort (the agency problem), so the design of incentives, reporting and governance matters. Debt holders, employees, customers, governments and the wider public are stakeholders whose interests can conflict with pure wealth maximisation, which is where corporate social responsibility and integrated reporting come in.

Ethics is examinable, not decorative. The adviser is expected to spot conflicts of interest, insider information, aggressive tax avoidance, bribery and misleading disclosure, and to apply the fundamental principles — integrity, objectivity, professional competence, confidentiality and professional behaviour. A technically brilliant scheme that fails an ethical test is the wrong answer.

The adviser also works in a policy environment: monetary and fiscal policy shape interest and exchange rates; the choice of stock market listing affects the cost of capital; and international operations bring the extra dimensions of country risk, taxation and the interests of multiple governments.`,
      },
      {
        kind: "structure",
        heading: "The adviser's toolkit and frame",
        body: `Objectives hierarchy:
Primary — maximise shareholder wealth (risk-adjusted present value of future cash flows).
Secondary/constraints — stakeholder interests, CSR, legal and ethical limits.

Agency problem — managers (agents) vs shareholders (principals). Mitigants: performance-linked pay, share options, board structure, monitoring, debt covenants.

Governance and reporting frameworks the adviser applies:
Corporate governance codes (independent directors, audit committees, separation of chair and CEO).
Integrated reporting <IR> — the six capitals (financial, manufactured, intellectual, human, social, natural).
Triple bottom line — profit, people, planet.

Ethical framework — fundamental principles: integrity, objectivity, professional competence and due care, confidentiality, professional behaviour. Watch for self-interest, advocacy, familiarity, intimidation and self-review threats.

Environment the adviser reads:
Monetary policy (interest rates, money supply) and fiscal policy (tax, spending).
Fisher effect — links interest rates and inflation: (1 + nominal) = (1 + real)(1 + inflation).
Interest rate parity and purchasing power parity — link forward rates and inflation to spot rates.

Value measures the adviser may report: economic value added (EVA), market value added, free cash flow to firm and to equity, and shareholder value analysis.

EVA = NOPAT − (WACC × invested capital), where NOPAT is net operating profit after tax, adjusted for accounting distortions.`,
      },
      {
        kind: "example",
        heading: "Worked example — reporting value created (EVA)",
        body: `A division reports operating profit before interest and tax of $5,000,000. Non-cash accounting adjustments the adviser adds back (e.g. amortisation of goodwill and provisions) net to $400,000. Tax is 25%. The capital invested at the start of the year is $20,000,000 and the WACC is 9%.

Step 1 — NOPAT:
Adjusted operating profit = 5,000,000 + 400,000 = 5,400,000
NOPAT = 5,400,000 × (1 − 0.25) = 4,050,000

Step 2 — capital charge:
Charge = WACC × invested capital = 0.09 × 20,000,000 = 1,800,000

Step 3 — EVA:
EVA = NOPAT − capital charge = 4,050,000 − 1,800,000 = 2,250,000

The division earned $2.25m more than the return investors required on the capital tied up in it, so it created value this year. If EVA had been negative, the division would be destroying shareholder wealth even while reporting an accounting profit — exactly the gap between accounting return and economic return that the senior adviser is there to expose.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Optimising accounting profit or EPS instead of shareholder wealth — the two can move in opposite directions.

Forgetting the capital charge in EVA — a positive accounting profit can still be a negative EVA once the cost of the capital used is deducted.

Ignoring the agency problem — assuming managers automatically act in shareholders' interests.

Treating ethics as a bolt-on paragraph — the exam expects you to identify the specific threat and principle and to recommend an action, not to write a generic definition.

Confusing monetary and fiscal policy — interest rates and money supply are monetary; tax and government spending are fiscal.

Applying the Fisher effect the wrong way round — it links real and nominal rates through inflation, not two nominal rates.`,
      },
    ],
  },

  /* ───────────────────────── AFM — Area B ───────────────────────── */
  {
    paper: "AFM",
    area: "B",
    title: "Advanced investment appraisal",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "When a simple NPV is not enough",
        body: `At AFM the projects are big enough that the way they are financed changes their value, the risk is not the firm's average risk, and the future contains choices the manager can make later. Three ideas answer these problems: adjusted present value, beta adjustment, and real options.

Adjusted present value (APV) separates the project from the way it is paid for. First you value the project as if it were all-equity financed, discounting at the ungeared (asset) cost of equity — this is the base-case NPV, the value of the business idea itself. Then you add the present value of the financing side effects: the tax relief on debt interest (the tax shield), any issue costs, and the benefit of subsidised or cheap loans. APV is the natural tool when gearing changes materially over the project's life, because a single WACC would no longer be constant.

Beta adjustment fixes the discount rate when a project has a different business risk from the firm — for example moving into a new industry. You take a comparable listed company's equity beta, strip out its financial risk (ungear it to an asset beta), then add back your own financial risk (regear it). The asset beta reflects business risk only; regearing tailors it to your capital structure.

Real options recognise that managers are not passive. The right to expand if things go well is like a call option; the right to abandon or sell if things go badly is like a put option; the ability to delay is a call on the whole project. A standard NPV that assumes "invest now or never" ignores this flexibility and understates value. Black-Scholes lets you put a number on it.`,
      },
      {
        kind: "structure",
        heading: "The formulas",
        body: `APV:
APV = Base-case NPV + PV of financing side effects
Base-case NPV — discount project cash flows at the ungeared cost of equity (Keu).
Tax shield — annual saving = debt × interest rate × tax rate; discount at the cost of debt (or risk-free rate).
Also add: PV of subsidy benefit, less issue costs.

Modigliani & Miller with tax:
Vg = Vu + (T × Vd)   — geared value = ungeared value + PV of tax shield.
Keg = Keu + (Keu − Kd)(1 − T)(Vd / Ve)   — cost of equity rises with gearing.

Hamada — ungearing and regearing beta (debt beta assumed zero):
Asset beta:  βa = βe × [ Ve / (Ve + Vd(1 − T)) ]
Equity beta: βe = βa × [ 1 + Vd(1 − T)/Ve ]
Then Ke via CAPM:  Ke = Rf + βe(Rm − Rf).

Black-Scholes real options:
d1 = [ ln(Pa / Pe) + (r + 0.5σ²)T ] / (σ√T)
d2 = d1 − σ√T
Call value = Pa·N(d1) − Pe·e^(−rT)·N(d2)
Put value  = Call − Pa + Pe·e^(−rT)   (put–call parity)
Pa = PV of the underlying asset (project cash flows), Pe = exercise price (investment cost), T = time to the decision, r = risk-free rate, σ = volatility, N(d) = cumulative normal probability.

Other tools: Monte Carlo simulation, sensitivity and scenario analysis, and international NPV where foreign cash flows are discounted and translated at forward or expected spot rates.`,
      },
      {
        kind: "example",
        heading: "Worked example — adjusted present value",
        body: `A project costs $10,000,000 now and, if it were all-equity financed, produces a base-case NPV of +$300,000 at the ungeared cost of equity.

To fund it the company raises $6,000,000 of debt at 5% interest, repayable in full after 4 years (interest-only). The tax rate is 25% and tax is paid in the same year. Issue costs are 2% of the debt raised. The pre-tax cost of debt, 5%, is used to discount the tax shield. The 4-year annuity factor at 5% is 3.546.

Step 1 — annual tax shield:
Interest = 6,000,000 × 5% = 300,000
Tax saved each year = 300,000 × 25% = 75,000

Step 2 — PV of the tax shield (4-year annuity at 5%):
75,000 × 3.546 = 265,950

Step 3 — issue costs:
6,000,000 × 2% = 120,000 (a cash outflow now)

Step 4 — APV:
APV = base-case NPV + PV tax shield − issue costs
APV = 300,000 + 265,950 − 120,000 = 445,950

The financing side effects turn a marginal +$300k idea into a clearer +$446k. Because the value of the project and the value of the financing are added separately, APV stays valid even though the gearing (and therefore any WACC) would change as the debt is repaid.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Discounting the base-case cash flows at WACC — in APV the base case must use the ungeared cost of equity, because the financing benefit is added separately.

Double-counting the tax shield — never put it in both the base-case discount rate and the financing side effects.

Regearing with the wrong beta — you ungear the comparable company's equity beta to an asset beta, then regear at YOUR gearing, not the comparable's.

Dropping the (1 − T) term when ungearing/regearing beta or in the M&M cost-of-equity formula.

Reading N(d) as the value itself — N(d1) and N(d2) are probabilities you feed into the Black-Scholes formula, not the option price.

Using the exercise price undiscounted in Black-Scholes — it is multiplied by e^(−rT).

Ignoring flexibility — valuing a project on a "now or never" NPV when a delay, expansion or abandonment option exists understates its value.`,
      },
    ],
  },

  /* ───────────────────────── AFM — Area C ───────────────────────── */
  {
    paper: "AFM",
    area: "C",
    title: "Acquisitions & mergers",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Why firms buy other firms",
        body: `An acquisition only creates shareholder wealth if the combined business is worth more than the two businesses apart, and if the acquirer does not overpay for that difference. So the adviser has two jobs: value the target properly, and structure a bid that shares the gain sensibly between the two sets of shareholders.

The gain is synergy — the reason 1 + 1 can equal 3. Revenue synergy comes from cross-selling or market power; cost synergy from removing duplicated overheads and buying at scale; financial synergy from a lower combined cost of capital, unused tax losses or better access to funds. Synergy is also the most over-claimed number in finance, which is why the exam rewards a sceptical, quantified estimate rather than optimism.

Valuing the target is the heart of the area. Different bases give different answers and the adviser must know which is relevant: an asset base sets a floor, a market multiple gives a quick market view, and a discounted free cash flow captures the future the acquirer actually expects to earn — usually the most defensible for a going concern.

Then comes the offer. Cash gives the target's shareholders certainty and crystallises their gain but drains the acquirer's resources. A share-for-share exchange conserves cash and lets target shareholders keep a stake, but it dilutes the acquirer and its value depends on the acquirer's own share price. A watch-out is bootstrapping: a high-P/E company buying a low-P/E company can appear to lift its own EPS with no real value created — an accounting illusion, not wealth.

Defences (poison pills, white knights, crown jewels), regulation and post-acquisition integration complete the picture.`,
      },
      {
        kind: "structure",
        heading: "Valuation methods and deal metrics",
        body: `Asset-based valuation:
Net asset value = assets − liabilities, at book, replacement or realisable value. Sets a floor; ignores intangibles and future earnings.

Market-based (relative) valuation:
Value = target earnings × an appropriate P/E ratio (often a comparable listed multiple, discounted for being unlisted).
Enterprise value / EBITDA multiple — values the whole firm, then deduct debt for equity value.
Dividend valuation model:  P0 = D0(1 + g) / (Ke − g)   (Gordon growth) — suits minority stakes valued on dividends.

Income-based (fundamental) valuation:
Free cash flow to firm, discounted at WACC → enterprise value; deduct debt → equity value.
Free cash flow to equity, discounted at the cost of equity → equity value directly.
FCFF = operating profit × (1 − T) + depreciation − capex − increase in working capital.

Synergy and gain:
Value of combined firm = VA + VB + synergy
Maximum price the acquirer can pay = VB (stand-alone) + synergy
Premium = price paid − VB stand-alone; the acquirer keeps synergy − premium.

Consideration:
Cash offer — certainty for target, cash outflow for acquirer.
Share exchange — issue ratio, e.g. 2 acquirer shares for 3 target shares; dilutes acquirer.
Mixed / earn-out / loan notes.

Bootstrapping — a high-P/E acquirer raising reported EPS by buying a low-P/E target with no real synergy: EPS rises, value does not.`,
      },
      {
        kind: "example",
        heading: "Worked example — P/E valuation and the synergy split",
        body: `Predator plc wants to acquire Target Ltd. Target earns after-tax profit of $4,000,000. Listed peers trade on a P/E of 10, but because Target is unlisted the adviser applies a 30% discount to the multiple.

Step 1 — stand-alone value of Target:
Adjusted P/E = 10 × (1 − 0.30) = 7
Value = 4,000,000 × 7 = 28,000,000

Step 2 — synergy:
Predator estimates that removing duplicated overheads and cross-selling will add post-tax cash flows worth $6,000,000 in present-value terms.
Maximum Predator can justify paying = 28,000,000 + 6,000,000 = 34,000,000

Step 3 — the offer and the split:
Predator offers $31,000,000 in cash.
Premium to Target shareholders = 31,000,000 − 28,000,000 = 3,000,000
Gain kept by Predator's shareholders = synergy − premium = 6,000,000 − 3,000,000 = 3,000,000

The $6m synergy is shared roughly evenly. If Predator had paid anything above $34m it would transfer all the synergy — and then some — to Target's shareholders and destroy its own value. The valuation range ($28m floor to $34m ceiling) is the negotiating space the adviser must defend.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Paying more than stand-alone value plus synergy — anything above the ceiling destroys acquirer wealth.

Treating bootstrapped EPS growth as value creation — a high-P/E firm buying a low-P/E firm lifts EPS arithmetically without any real synergy.

Valuing the target at the acquirer's cost of capital when its business risk differs — use a rate that reflects the target's risk.

Forgetting to deduct debt when moving from enterprise value (FCFF or EV/EBITDA) to equity value.

Using book net assets as the value of a going concern — it ignores intangibles, brands and future earnings, and is only a floor.

Claiming synergy without quantifying or timing it — vague synergy is the classic way bids are justified and then fail.

Ignoring the effect of a share-for-share offer on the acquirer's own share price and control.`,
      },
    ],
  },

  /* ───────────────────────── AFM — Area D ───────────────────────── */
  {
    paper: "AFM",
    area: "D",
    title: "Corporate reconstruction & reorganisation",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Rebuilding a company in trouble — or in transition",
        body: `Reconstruction is what an adviser designs when the current shape of a company no longer works: it may be near insolvency and need its finances rebuilt, or it may be healthy but wanting to reshape itself through a spin-off, sale or buyout. The common thread is changing the mix of who owns and who is owed the business.

Financial reconstruction is the rescue case. A company that cannot meet its debts but is worth more alive than dead can be saved by rearranging its claims. Lenders may swap debt for equity (a debt-for-equity swap), accepting shares instead of cash they are unlikely to receive in full; shareholders usually accept dilution because the alternative — liquidation — leaves them nothing. New capital may be injected, assets sold, and the scheme must leave every class of investor at least as well off as they would be in liquidation, or they will vote it down. Predicting distress in the first place uses models such as the Altman Z-score, which combines several ratios into a single early-warning number.

Organisational reconstruction reshapes a solvent group. A demerger or spin-off splits a conglomerate into focused, separately valued companies, often to remove a "conglomerate discount". A management buyout (MBO) lets managers buy the business they run, usually with heavy debt (a leveraged buyout), aligning ownership with control. A sell-off disposes of a division for cash. Each is judged by whether the parts are worth more than the whole.

The test for any scheme is simple to state and hard to satisfy: does it leave the company viable, and is each affected party better off agreeing than refusing?`,
      },
      {
        kind: "structure",
        heading: "Schemes, tests and the distress model",
        body: `Financial reconstruction schemes:
Debt-for-equity swap — lenders exchange debt for shares.
Debt rescheduling — extend maturities, cut or defer interest.
New equity/rights issue — inject fresh cash.
Asset disposals — sell non-core assets to repay debt.
Composition/moratorium — agreed partial settlement or payment holiday.

The viability test:
Each class of investor must receive at least their liquidation value, otherwise they will reject the scheme.
Estimate liquidation value first (assets at realisable value, in order of legal priority: secured lenders, preferential creditors, unsecured creditors, then shareholders).
Then show the reconstructed company's expected value exceeds that, and allocate the surplus so every class gains.

Altman Z-score (original, manufacturing):
Z = 1.2·X1 + 1.4·X2 + 3.3·X3 + 0.6·X4 + 1.0·X5
X1 = working capital / total assets
X2 = retained earnings / total assets
X3 = earnings before interest and tax / total assets
X4 = market value of equity / book value of total liabilities
X5 = sales / total assets
Interpretation:  Z > 2.99 = safe;  1.81–2.99 = grey zone;  Z < 1.81 = distress likely.

Organisational reorganisation:
Demerger / spin-off — split into separately listed entities (remove conglomerate discount).
Management buyout (MBO) / leveraged buyout (LBO) — managers acquire the business, financed largely by debt.
Sell-off / divestment — dispose of a division for cash.
Test: sum of the parts' values vs the value of the whole.`,
      },
      {
        kind: "example",
        heading: "Worked example — Altman Z-score",
        body: `An adviser screens a manufacturer for distress. The figures ($000):
Working capital 1,500; total assets 10,000; retained earnings 2,000; EBIT 900; market value of equity 4,000; total liabilities 5,000; sales 12,000.

Step 1 — the five ratios:
X1 = 1,500 / 10,000 = 0.15
X2 = 2,000 / 10,000 = 0.20
X3 = 900 / 10,000 = 0.09
X4 = 4,000 / 5,000 = 0.80
X5 = 12,000 / 10,000 = 1.20

Step 2 — weight and sum:
1.2 × 0.15 = 0.180
1.4 × 0.20 = 0.280
3.3 × 0.09 = 0.297
0.6 × 0.80 = 0.480
1.0 × 1.20 = 1.200
Z = 0.180 + 0.280 + 0.297 + 0.480 + 1.200 = 2.437

Step 3 — interpret:
Z = 2.44 sits in the grey zone (1.81–2.99): not an immediate failure signal, but not clearly safe either. The low X3 (weak profitability relative to assets) is the main drag. The adviser would flag it for monitoring and, if the trend is downward, begin planning a reconstruction before the company slips below 1.81.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Designing a scheme that leaves a class of investor worse off than liquidation — they can, and will, vote it down.

Forgetting the order of priority on liquidation — secured lenders and preferential creditors are paid before unsecured creditors, and shareholders come last.

Using the Z-score as a precise verdict — it is a probability-based screen with a grey zone, not a pass/fail line, and the original coefficients are calibrated for manufacturers.

Treating a debt-for-equity swap as free — it dilutes existing shareholders and changes control and gearing.

Assuming a demerger creates value automatically — it only does so if the focused parts are worth more than the conglomerate whole, net of the costs of splitting.

Confusing an MBO with an MBI — a buyout is by existing managers; a buy-in is by outside managers.`,
      },
    ],
  },

  /* ───────────────────────── AFM — Area E ───────────────────────── */
  {
    paper: "AFM",
    area: "E",
    title: "Treasury & advanced risk management",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Managing money and the risks that move it",
        body: `The treasury function is the company's in-house bank: it raises funds, invests surpluses, manages the group's cash, and above all hedges the market risks that can wreck an otherwise sound business. AFM focuses on two of those risks — interest rate risk and currency risk — and on the instruments that neutralise them.

Interest rate risk is the danger that a change in rates hurts you: a borrower fears rates rising, a depositor fears them falling. Currency (foreign exchange) risk comes in three flavours the adviser must distinguish. Transaction risk is the exposure on a specific future receipt or payment in a foreign currency — the kind you hedge. Translation risk is the accounting effect of restating foreign assets and liabilities at year-end. Economic risk is the deeper, long-run effect of exchange rates on competitiveness.

Hedging means taking an offsetting position so that a loss on the exposure is matched by a gain on the hedge. Forwards and futures lock in a rate today. Options do something different and valuable: they give the right but not the obligation to deal at a set rate, so you cap the downside while keeping the upside — for the price of a premium. Swaps exchange one stream of payments for another, letting a firm convert fixed-rate debt to floating (or one currency to another) and exploit a comparative advantage in borrowing.

Finally, the adviser must measure how much could be lost. Value at Risk (VaR) expresses, to a chosen confidence level and horizon, the maximum expected loss — a single number the board can act on, built on the volatility of the position and the square-root-of-time scaling of risk.`,
      },
      {
        kind: "structure",
        heading: "Instruments and measures",
        body: `Interest rate hedging:
Forward rate agreement (FRA) — fixes a borrowing/deposit rate for a future period; cash-settled against the reference rate.
Interest rate futures — priced as (100 − implied rate). Borrower fears a rate rise → SELL futures now, buy back later. Depositor fears a fall → BUY futures.
Number of contracts = (loan/deposit amount / contract size) × (exposure period / contract period).
Interest rate options — options on futures; a borrower buys a put (cap), a depositor buys a call (floor); premium payable.
Interest rate swaps — exchange fixed for floating; use comparative advantage; net the difference.

Currency hedging:
Forward contract — lock the rate today.
Currency futures — standardised, exchange-traded; number of contracts = amount / contract size.
Money market hedge — borrow/deposit now in the two currencies to fix the outcome (uses interest rate parity).
Currency options — right to buy (call) or sell (put) currency; caps adverse moves, keeps favourable ones.
Currency swaps — exchange principal and interest streams in two currencies.

Parity relationships:
Interest rate parity:  Forward = Spot × (1 + interest rateVARIABLE) / (1 + interest rateBASE)
Purchasing power parity:  Expected spot = Spot × (1 + inflationVARIABLE) / (1 + inflationBASE)

Value at Risk (VaR):
VaR = z × σ × position value   (z = 1.645 at 95%, 2.33 at 99%)
Scaling over time (the √time rule):  VaR(t days) = VaR(1 day) × √t
Assumes normally distributed returns; captures likely, not worst-case, loss.`,
      },
      {
        kind: "example",
        heading: "Worked example — interest rate futures hedge",
        body: `In three months a company must borrow $6,000,000 for a three-month period and fears interest rates will rise. Three-month interest rate futures (contract size $1,000,000) are priced today at 95.00, implying 5%.

Step 1 — set up the hedge:
A borrower fears a RISE, so SELL futures now and buy them back when the loan is taken out.
Contracts = (6,000,000 / 1,000,000) × (3 months / 3 months) = 6 contracts sold at 95.00.

Step 2 — three months later, rates have risen to 6%:
Futures price falls to 94.00. Buy back 6 contracts at 94.00.
Price movement = 95.00 − 94.00 = 1.00 = 100 ticks (a tick = 0.01).
Tick value = 1,000,000 × 0.01% × 3/12 = $25.
Futures gain = 100 ticks × $25 × 6 contracts = $15,000.

Step 3 — the cost on the actual loan:
Extra interest from the 1% rise = 6,000,000 × 1% × 3/12 = $15,000.

Step 4 — net outcome:
Extra loan cost 15,000 − futures gain 15,000 = $0 net.
The rise in borrowing cost is offset almost exactly by the gain on the futures, locking the effective rate near the 5% implied today. (In practice basis risk means the offset is close, not perfect.)`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Dealing the wrong way in futures — a borrower worried about a rate rise SELLS interest rate futures; buying is the depositor's hedge.

Confusing the three currency exposures — transaction risk is the hedgeable cash exposure; translation is accounting; economic is long-run competitiveness.

Ignoring the option premium — options cap the downside but cost a non-refundable premium, so they are rarely the cheapest hedge if the adverse move does not happen.

Scaling VaR linearly with time — risk grows with the square root of time, so a 10-day VaR is the 1-day VaR times √10, not times 10.

Inverting an interest rate parity or PPP quote — always put the variable (quoted) currency on top and keep base and variable consistent.

Miscounting futures contracts — remember the period adjustment (exposure months / contract months) as well as the amount / contract size.

Treating a hedge as free of basis risk — futures and the underlying rarely move one-for-one, so the offset is close, not exact.`,
      },
    ],
  },
]
