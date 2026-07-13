import type { Flashcard } from "@/lib/acca-flashcards"

/*
 * Scholify — ACCA flashcards, set S2 (Strategic Professional options).
 *
 * AFM (Advanced Financial Management) and APM (Advanced Performance
 * Management). 60 cards per paper, spread across the syllabus areas. All cards
 * are original and syllabus-aligned — key formulas, definitions and framework
 * components that reward memorisation via spaced repetition.
 */

export const FLASHCARDS_S2: Flashcard[] = [
  /* ── AFM — Area A: The role of the senior financial adviser ── */
  { id: "AFM-FC-01", paper: "AFM", area: "A", front: "The three key decisions of financial management", back: "The investment decision, the financing decision and the dividend decision — all made to maximise shareholder wealth." },
  { id: "AFM-FC-02", paper: "AFM", area: "A", front: "The agency problem", back: "Managers (agents) may pursue their own interests rather than maximising owners' (principals') wealth. Aligned via incentives, monitoring and governance." },
  { id: "AFM-FC-03", paper: "AFM", area: "A", front: "The three types of foreign-exchange exposure", back: "Transaction exposure (committed cash flows), translation exposure (accounting/consolidation) and economic exposure (long-run competitive value)." },
  { id: "AFM-FC-04", paper: "AFM", area: "A", front: "Purchasing Power Parity (PPP) — expected future spot rate", back: "S1 = S0 × (1 + inflation of counter currency) ÷ (1 + inflation of base currency). Higher-inflation currency depreciates." },
  { id: "AFM-FC-05", paper: "AFM", area: "A", front: "Interest Rate Parity (IRP) — forward rate", back: "F0 = S0 × (1 + interest rate of counter currency) ÷ (1 + interest rate of base currency). Higher-interest currency trades at a forward discount." },
  { id: "AFM-FC-06", paper: "AFM", area: "A", front: "The Fisher effect (International Fisher)", back: "(1 + nominal rate) = (1 + real rate) × (1 + inflation). Links nominal and real interest rates; expected currency change tracks the interest-rate differential." },
  { id: "AFM-FC-07", paper: "AFM", area: "A", front: "Stakeholder theory vs shareholder wealth maximisation", back: "Shareholder view: maximise owner wealth. Stakeholder view: balance the interests of employees, customers, suppliers, community and shareholders." },
  { id: "AFM-FC-08", paper: "AFM", area: "A", front: "Ethical considerations for the senior adviser", back: "Integrity, objectivity, professional competence, confidentiality and professional behaviour — avoid conflicts of interest and misleading disclosure." },
  { id: "AFM-FC-09", paper: "AFM", area: "A", front: "The main financial objective of a company", back: "To maximise shareholder wealth, measured by the market value of equity (share price plus dividends), not just short-term accounting profit." },
  { id: "AFM-FC-10", paper: "AFM", area: "A", front: "Non-financial (multiple) objectives a company may pursue", back: "Growth, market share, employee welfare, customer and supplier satisfaction, environmental responsibility and corporate social responsibility." },
  { id: "AFM-FC-11", paper: "AFM", area: "A", front: "Why do exchange rates matter to a multinational?", back: "They affect the value of foreign revenues, costs, assets and liabilities, competitive position, and the reported group result on consolidation." },
  { id: "AFM-FC-12", paper: "AFM", area: "A", front: "Emerging-market investment considerations", back: "Higher political and country risk, currency volatility, weaker governance and liquidity — demand a higher risk premium and consider guarantees/insurance." },

  /* ── AFM — Area B: Advanced investment appraisal ── */
  { id: "AFM-FC-13", paper: "AFM", area: "B", front: "APV — the two components", back: "Base-case NPV (all-equity financed) + present value of the financing side effects (mainly the debt tax shield, less issue costs)." },
  { id: "AFM-FC-14", paper: "AFM", area: "B", front: "When is APV preferred over NPV-at-WACC?", back: "When the capital structure changes materially over the project life or the project is financed differently from the firm's normal gearing." },
  { id: "AFM-FC-15", paper: "AFM", area: "B", front: "The debt tax shield each year", back: "Debt × interest rate × tax rate. Discounted (usually at the pre-tax cost of debt) to give the PV of the tax benefit." },
  { id: "AFM-FC-16", paper: "AFM", area: "B", front: "CAPM — the required return formula", back: "Required return = Rf + β(Rm − Rf), where (Rm − Rf) is the market risk premium and β measures systematic risk." },
  { id: "AFM-FC-17", paper: "AFM", area: "B", front: "Asset beta vs equity beta", back: "Asset (ungeared) beta reflects business risk only; equity (geared) beta adds financial risk from gearing. Ungear to compare, re-gear to appraise." },
  { id: "AFM-FC-18", paper: "AFM", area: "B", front: "Ungearing beta (Hamada / MM with tax)", back: "βa = βe × [Ve ÷ (Ve + Vd(1 − T))] + βd × [Vd(1 − T) ÷ (Ve + Vd(1 − T))]. Often βd is assumed zero." },
  { id: "AFM-FC-19", paper: "AFM", area: "B", front: "Real options — the four common types", back: "Option to delay/defer, option to expand (follow-on), option to abandon, and option to redeploy/switch. They capture managerial flexibility NPV ignores." },
  { id: "AFM-FC-20", paper: "AFM", area: "B", front: "Black-Scholes — what N(d1) and N(d2) represent", back: "N(d1) = the option delta / hedge ratio; N(d2) = the risk-neutral probability the option expires in the money." },
  { id: "AFM-FC-21", paper: "AFM", area: "B", front: "Black-Scholes call value formula", back: "c = Pa·N(d1) − Pe·N(d2)·e^(−rt), where Pa = asset price, Pe = exercise price, r = risk-free rate, t = time." },
  { id: "AFM-FC-22", paper: "AFM", area: "B", front: "The five inputs to an option value", back: "Underlying asset price, exercise price, time to expiry, volatility of the asset, and the risk-free rate." },
  { id: "AFM-FC-23", paper: "AFM", area: "B", front: "Value of a put option via put-call parity", back: "p = c − Pa + Pe·e^(−rt). Rearranged from c + Pe·e^(−rt) = p + Pa." },
  { id: "AFM-FC-24", paper: "AFM", area: "B", front: "Monte Carlo simulation — purpose in appraisal", back: "Runs many random iterations of uncertain variables to produce a probability distribution of NPV, showing the range and risk, not a single point estimate." },

  /* ── AFM — Area C: Acquisitions and mergers ── */
  { id: "AFM-FC-25", paper: "AFM", area: "C", front: "Synergy in an acquisition", back: "The extra value from combining two firms so the whole exceeds the sum of the parts — from revenue gains, cost savings, or financial synergy." },
  { id: "AFM-FC-26", paper: "AFM", area: "C", front: "Maximum price a bidder should pay", back: "Standalone value of the target + value of synergies. Paying above this destroys acquirer shareholder value." },
  { id: "AFM-FC-27", paper: "AFM", area: "C", front: "Free cash flow to firm (FCFF)", back: "Operating profit × (1 − T) + depreciation − capex − increase in working capital. Discounted at WACC to value the whole entity." },
  { id: "AFM-FC-28", paper: "AFM", area: "C", front: "Free cash flow to equity (FCFE)", back: "FCFF − interest×(1 − T) + net new borrowing. Discounted at the cost of equity to value the equity directly." },
  { id: "AFM-FC-29", paper: "AFM", area: "C", front: "The three main valuation approaches", back: "Asset-based (net assets), income/cash-flow based (DCF, FCF, dividend valuation) and market-based (P/E and other multiples)." },
  { id: "AFM-FC-30", paper: "AFM", area: "C", front: "Dividend valuation / Gordon growth model", back: "P0 = D0(1 + g) ÷ (Ke − g) = D1 ÷ (Ke − g). Values equity as the PV of a perpetually growing dividend." },
  { id: "AFM-FC-31", paper: "AFM", area: "C", front: "Gordon's growth approximation (g)", back: "g = b × re, where b = earnings retention rate and re = accounting rate of return on reinvested funds." },
  { id: "AFM-FC-32", paper: "AFM", area: "C", front: "Bootstrapping (P/E) in a share-for-share deal", back: "A high-P/E firm acquiring a low-P/E firm can raise combined EPS without real value creation — a market illusion, not genuine synergy." },
  { id: "AFM-FC-33", paper: "AFM", area: "C", front: "Three forms of consideration in an acquisition", back: "Cash, share-for-share exchange, and debt/loan notes (or a mix). Each affects gearing, control, tax and the risk borne by target shareholders." },
  { id: "AFM-FC-34", paper: "AFM", area: "C", front: "Defensive tactics against a hostile takeover", back: "Poison pill, white knight, crown jewels, golden parachutes, revaluing assets, appealing to shareholders, and lobbying regulators." },
  { id: "AFM-FC-35", paper: "AFM", area: "C", front: "Types of merger/acquisition by relationship", back: "Horizontal (same industry stage), vertical (supplier/customer stage) and conglomerate (unrelated business) integration." },
  { id: "AFM-FC-36", paper: "AFM", area: "C", front: "The terminal value in a DCF valuation", back: "Value of cash flows beyond the forecast horizon, usually a growing perpetuity: TV = CF(n+1) ÷ (WACC − g), discounted back to today." },

  /* ── AFM — Area D: Corporate reconstruction and re-organisation ── */
  { id: "AFM-FC-37", paper: "AFM", area: "D", front: "Financial reconstruction — purpose", back: "To rescue a company in financial distress by re-arranging its capital (debt/equity) so it can survive and avoid liquidation." },
  { id: "AFM-FC-38", paper: "AFM", area: "D", front: "A debt-for-equity swap", back: "Lenders exchange debt for shares, cutting interest and gearing and improving liquidity, but diluting existing shareholders' control." },
  { id: "AFM-FC-39", paper: "AFM", area: "D", front: "Test for a successful reconstruction scheme", back: "Each stakeholder group must be at least as well off as under liquidation, and the reconstructed company must be viable going forward." },
  { id: "AFM-FC-40", paper: "AFM", area: "D", front: "A leveraged buy-out (LBO)", back: "Acquiring a company using a high proportion of debt, secured on the target's assets and repaid from its cash flows or asset sales." },
  { id: "AFM-FC-41", paper: "AFM", area: "D", front: "Management buy-out (MBO) vs buy-in (MBI)", back: "MBO: existing managers buy the business they run. MBI: an outside management team buys in and takes over running it." },
  { id: "AFM-FC-42", paper: "AFM", area: "D", front: "Order of priority on liquidation", back: "Secured creditors, liquidation costs, preferential creditors, floating charge holders, unsecured creditors, then shareholders (prefs before ordinary)." },
  { id: "AFM-FC-43", paper: "AFM", area: "D", front: "Divestment — a spin-off (demerger)", back: "Creating a separate independent company by distributing shares in a subsidiary to existing shareholders; no cash raised, ownership unchanged in total." },
  { id: "AFM-FC-44", paper: "AFM", area: "D", front: "Divestment — a sell-off / trade sale", back: "Selling a division or subsidiary to a third party for cash, used to raise funds, exit non-core activities or reverse a poor acquisition." },
  { id: "AFM-FC-45", paper: "AFM", area: "D", front: "Unbundling — the rationale", back: "Reversing conglomerate diversification to focus on core competences, reduce a conglomerate discount and release value for shareholders." },
  { id: "AFM-FC-46", paper: "AFM", area: "D", front: "Signs of impending corporate failure (financial)", back: "Persistent losses, negative cash flow, rising gearing, breached loan covenants, over-trading and deteriorating liquidity ratios." },
  { id: "AFM-FC-47", paper: "AFM", area: "D", front: "A management buy-in team's key challenge", back: "Lack of inside knowledge of the target — higher information asymmetry and integration risk than an MBO by the incumbent managers." },
  { id: "AFM-FC-48", paper: "AFM", area: "D", front: "Why lenders might accept a reconstruction", back: "Expected recovery under the scheme exceeds the expected recovery in liquidation, once forced-sale asset discounts and costs are considered." },

  /* ── AFM — Area E: Treasury and advanced risk management ── */
  { id: "AFM-FC-49", paper: "AFM", area: "E", front: "The functions of a treasury department", back: "Managing liquidity and working capital, funding and capital structure, banking relationships, and financial-risk (FX, interest-rate) hedging." },
  { id: "AFM-FC-50", paper: "AFM", area: "E", front: "Money-market hedge for a foreign payable", back: "Borrow home currency now, convert to the foreign currency at spot, deposit it to grow to the amount owed — fixing the effective rate today." },
  { id: "AFM-FC-51", paper: "AFM", area: "E", front: "Money-market hedge for a foreign receivable", back: "Borrow the foreign currency now (so its value falls due matches the receipt), convert to home currency at spot and deposit it." },
  { id: "AFM-FC-52", paper: "AFM", area: "E", front: "Forward contract vs futures contract", back: "Forwards: tailored OTC, settled at maturity, counterparty risk. Futures: standardised, exchange-traded, daily margined (marked to market)." },
  { id: "AFM-FC-53", paper: "AFM", area: "E", front: "Basis risk in a futures hedge", back: "The risk that the futures price and the spot price do not move exactly together, so the hedge is imperfect at close-out." },
  { id: "AFM-FC-54", paper: "AFM", area: "E", front: "An interest-rate swap", back: "Two parties exchange interest obligations (typically fixed for floating) on a notional principal, to manage rate risk or exploit a comparative advantage." },
  { id: "AFM-FC-55", paper: "AFM", area: "E", front: "An interest-rate collar", back: "Buying a cap and selling a floor (or vice versa) so the effective rate stays within a band; the premium received partly funds the premium paid." },
  { id: "AFM-FC-56", paper: "AFM", area: "E", front: "Delta hedging with options", back: "Number of option contracts = exposure ÷ (contract size × delta). Delta (N(d1)) shows how much the option price moves per unit move in the underlying." },
  { id: "AFM-FC-57", paper: "AFM", area: "E", front: "Value at Risk (VaR) — definition", back: "The maximum expected loss over a given period at a stated confidence level (e.g. 95%), assuming normally distributed returns." },
  { id: "AFM-FC-58", paper: "AFM", area: "E", front: "Scaling VaR over time", back: "VaR scales with the square root of time: VaR(t days) = VaR(1 day) × √t. Standard deviation grows with √t." },
  { id: "AFM-FC-59", paper: "AFM", area: "E", front: "Currency option vs forward — key advantage", back: "An option caps downside while keeping upside if the rate moves favourably, but costs a non-refundable premium; a forward fixes the rate at nil premium." },
  { id: "AFM-FC-60", paper: "AFM", area: "E", front: "Netting and matching in a multinational", back: "Netting offsets intra-group payables and receivables to one net settlement; matching pairs receipts and payments in the same currency to cut exposure." },

  /* ── APM — Area A: Strategic planning and control ── */
  { id: "APM-FC-01", paper: "APM", area: "A", front: "The three levels of planning and control", back: "Strategic (long-term, board), tactical (medium-term, middle management) and operational (short-term, day-to-day) — the Anthony hierarchy." },
  { id: "APM-FC-02", paper: "APM", area: "A", front: "Porter's five forces", back: "Threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and competitive rivalry." },
  { id: "APM-FC-03", paper: "APM", area: "A", front: "Porter's three generic strategies", back: "Cost leadership, differentiation, and focus (cost focus or differentiation focus on a narrow segment)." },
  { id: "APM-FC-04", paper: "APM", area: "A", front: "The value chain — primary activities", back: "Inbound logistics, operations, outbound logistics, marketing & sales, and service. Supported by procurement, technology, HR and firm infrastructure." },
  { id: "APM-FC-05", paper: "APM", area: "A", front: "PEST / PESTEL analysis", back: "Political, Economic, Social, Technological (plus Environmental and Legal) — a framework for scanning the macro-environment." },
  { id: "APM-FC-06", paper: "APM", area: "A", front: "The BCG matrix — four categories", back: "Stars (high growth, high share), cash cows (low growth, high share), question marks/problem children (high growth, low share) and dogs (low, low)." },
  { id: "APM-FC-07", paper: "APM", area: "A", front: "The three E's of value for money", back: "Economy (inputs at least cost), efficiency (output per input) and effectiveness (achieving objectives) — often used in the public/NFP sector." },
  { id: "APM-FC-08", paper: "APM", area: "A", front: "Environmental uncertainty — the appropriate response", back: "The more dynamic and complex the environment, the more flexible, decentralised and organic the control system needs to be (vs mechanistic in stable ones)." },
  { id: "APM-FC-09", paper: "APM", area: "A", front: "SWOT analysis", back: "Internal Strengths and Weaknesses matched against external Opportunities and Threats to shape strategy." },
  { id: "APM-FC-10", paper: "APM", area: "A", front: "Benchmarking — the main types", back: "Internal (within the organisation), competitive (against rivals), functional/process (against best-in-class regardless of industry) and strategic." },
  { id: "APM-FC-11", paper: "APM", area: "A", front: "Critical success factors (CSFs) and KPIs", back: "CSFs are the few areas where things must go right to achieve objectives; KPIs are the measures that track performance against those CSFs." },
  { id: "APM-FC-12", paper: "APM", area: "A", front: "The management-control system and strategy fit", back: "The control system must align with strategy — a cost leader emphasises tight cost/efficiency measures; a differentiator emphasises innovation and quality." },
  { id: "APM-FC-13", paper: "APM", area: "A", front: "Feedback vs feedforward control", back: "Feedback compares actual results with target after the event and corrects; feedforward forecasts likely results and acts before variances occur." },
  { id: "APM-FC-14", paper: "APM", area: "A", front: "Ansoff's growth matrix", back: "Market penetration, market development, product development, and diversification — increasing risk as you move away from existing products/markets." },
  { id: "APM-FC-15", paper: "APM", area: "A", front: "Not-for-profit performance — the key difficulty", back: "No single profit measure and hard-to-quantify outputs, so success is judged on value for money (the three E's) and multiple stakeholder objectives." },

  /* ── APM — Area B: Performance management systems and design ── */
  { id: "APM-FC-16", paper: "APM", area: "B", front: "The balanced scorecard — the four perspectives", back: "Financial, customer, internal business process, and learning & growth (innovation). Balances financial with non-financial and short with long term." },
  { id: "APM-FC-17", paper: "APM", area: "B", front: "The building block model (Fitzgerald & Moon)", back: "Dimensions (results: financial & competitiveness; determinants: quality, flexibility, resource use, innovation), Standards and Rewards." },
  { id: "APM-FC-18", paper: "APM", area: "B", front: "The performance pyramid (Lynch & Cross)", back: "Links corporate vision down through business units, business processes and departments — external effectiveness on one side, internal efficiency on the other." },
  { id: "APM-FC-19", paper: "APM", area: "B", front: "Building block model — the three standard properties", back: "Ownership, achievability, and fairness (equity) — standards staff accept as their own and see as attainable and fairly set." },
  { id: "APM-FC-20", paper: "APM", area: "B", front: "Building block model — the two reward properties", back: "Clarity, motivation and controllability — rewards should be clearly understood, motivating, and based on factors managers can control." },
  { id: "APM-FC-21", paper: "APM", area: "B", front: "Management information system (MIS) — role", back: "Converts internal and external data into information for planning, control and decision-making at operational, tactical and strategic levels." },
  { id: "APM-FC-22", paper: "APM", area: "B", front: "Big data — the classic 'three V's'", back: "Volume, velocity and variety (often extended to veracity and value) — the characteristics that make data 'big' and hard to process conventionally." },
  { id: "APM-FC-23", paper: "APM", area: "B", front: "Lean information systems", back: "Provide only relevant, timely information with minimal waste — supporting lean operations by avoiding information overload and unnecessary reporting." },
  { id: "APM-FC-24", paper: "APM", area: "B", front: "Responsibility centres — the four types", back: "Cost centre, revenue centre, profit centre and investment centre — each held accountable for the elements management can control." },
  { id: "APM-FC-25", paper: "APM", area: "B", front: "The controllability principle", back: "Managers should be assessed only on costs, revenues and investments they can influence, separating controllable from uncontrollable items." },
  { id: "APM-FC-26", paper: "APM", area: "B", front: "Transfer pricing — the general rule", back: "Transfer price = marginal cost + opportunity cost of the transferring division. With spare capacity, opportunity cost is nil, so use marginal cost." },
  { id: "APM-FC-27", paper: "APM", area: "B", front: "Transfer pricing — the range with a competitive external market", back: "It should lie between the supplying division's marginal cost (floor) and the market price (ceiling) so both divisions and the group benefit." },
  { id: "APM-FC-28", paper: "APM", area: "B", front: "Goal congruence", back: "When divisional managers, acting in their own centre's interest, also act in the best interest of the whole organisation." },
  { id: "APM-FC-29", paper: "APM", area: "B", front: "Data warehouse vs data mining", back: "A data warehouse is a central store of consolidated data; data mining searches it for hidden patterns and relationships to support decisions." },
  { id: "APM-FC-30", paper: "APM", area: "B", front: "Enterprise Resource Planning (ERP) system", back: "An integrated software suite sharing one database across finance, operations, HR and sales, giving real-time, consistent information organisation-wide." },

  /* ── APM — Area C: Strategic performance measurement ── */
  { id: "APM-FC-31", paper: "APM", area: "C", front: "Return on Investment (ROI) formula", back: "ROI = controllable profit ÷ capital employed × 100%. Simple but can cause dysfunctional rejection of good projects below the divisional ROI." },
  { id: "APM-FC-32", paper: "APM", area: "C", front: "Residual Income (RI) formula", back: "RI = controllable profit − (imputed interest × capital employed). Better than ROI for goal congruence — accepts any project earning above the cost of capital." },
  { id: "APM-FC-33", paper: "APM", area: "C", front: "EVA — the formula", back: "EVA = NOPAT − (WACC × capital employed). NOPAT adds back non-cash/accounting items and treats R&D and leases as investments." },
  { id: "APM-FC-34", paper: "APM", area: "C", front: "EVA — typical adjustments to profit", back: "Add back non-cash items and provisions, capitalise R&D/advertising/marketing spend, add back interest (net of tax), and adjust for goodwill amortisation." },
  { id: "APM-FC-35", paper: "APM", area: "C", front: "ROI vs RI — the key difference", back: "ROI is a percentage (can reject profitable projects that dilute the average); RI is an absolute money figure that promotes goal congruence." },
  { id: "APM-FC-36", paper: "APM", area: "C", front: "The problem with short-term financial measures", back: "They encourage myopia — managers cut R&D, training and maintenance to boost this year's profit, harming long-term value." },
  { id: "APM-FC-37", paper: "APM", area: "C", front: "Value-based management (VBM)", back: "Aligning all decisions, strategy and rewards to maximising shareholder value, using value metrics like EVA and shareholder value added rather than accounting profit." },
  { id: "APM-FC-38", paper: "APM", area: "C", front: "Activity-based management (ABM)", back: "Using ABC information to manage activities — eliminating non-value-adding activities and improving processes to reduce cost and improve performance." },
  { id: "APM-FC-39", paper: "APM", area: "C", front: "The triple bottom line", back: "Measuring performance on three fronts: profit (economic), people (social) and planet (environmental) — 'people, planet, profit'." },
  { id: "APM-FC-40", paper: "APM", area: "C", front: "Environmental management accounting (EMA) cost categories", back: "Conventional costs, contingent costs, relationship/image costs, and less tangible externality costs — making environmental costs visible for decisions." },
  { id: "APM-FC-41", paper: "APM", area: "C", front: "Non-financial performance indicators (NFPIs) — benefit", back: "They capture quality, customer satisfaction, delivery and innovation — leading indicators that predict future financial results and resist manipulation less easily." },
  { id: "APM-FC-42", paper: "APM", area: "C", front: "Benchmarking as a performance-measurement tool", back: "Comparing performance against internal, competitor or best-in-class standards to identify gaps, set targets and drive continuous improvement." },
  { id: "APM-FC-43", paper: "APM", area: "C", front: "Reward schemes — the risk of poor design", back: "Rewarding the wrong measures causes dysfunctional behaviour, gaming, short-termism and manipulation; measures must be controllable and goal-congruent." },
  { id: "APM-FC-44", paper: "APM", area: "C", front: "Divisional performance — depreciation distortion", back: "Net book value falls each year, so ROI/RI rise automatically over an asset's life even with unchanged performance, discouraging replacement of old assets." },
  { id: "APM-FC-45", paper: "APM", area: "C", front: "Learning curve — the doubling effect", back: "Each time cumulative output doubles, the average time per unit falls to a constant percentage (the learning rate) of the previous average time." },

  /* ── APM — Area D: Performance evaluation and corporate failure ── */
  { id: "APM-FC-46", paper: "APM", area: "D", front: "Altman Z-score zones", back: "Above 2.99 = safe; 1.81 to 2.99 = grey/uncertain; below 1.81 = distress zone (high failure risk)." },
  { id: "APM-FC-47", paper: "APM", area: "D", front: "Altman Z-score — what it is", back: "A multivariate model combining five weighted financial ratios (profitability, leverage, liquidity, solvency, activity) into one score predicting corporate failure." },
  { id: "APM-FC-48", paper: "APM", area: "D", front: "Argenti's A-score model", back: "A qualitative failure model scoring defects (weak management/systems), mistakes (high gearing, overtrading, big project failure) and symptoms of failure." },
  { id: "APM-FC-49", paper: "APM", area: "D", front: "Quantitative vs qualitative failure models", back: "Quantitative (e.g. Altman Z) use financial ratios; qualitative (e.g. Argenti A-score) assess non-financial factors like management quality and controls." },
  { id: "APM-FC-50", paper: "APM", area: "D", front: "Symptoms of overtrading", back: "Rapid sales growth, rising inventory and receivables, falling cash, increasing overdraft/payables and deteriorating liquidity despite profits." },
  { id: "APM-FC-51", paper: "APM", area: "D", front: "The performance-prism — five facets", back: "Stakeholder satisfaction, stakeholder contribution, strategies, processes and capabilities — a stakeholder-centric performance framework." },
  { id: "APM-FC-52", paper: "APM", area: "D", front: "Six Sigma — the goal", back: "Reducing process variation and defects to near zero (about 3.4 defects per million opportunities), driving quality and cost improvement via DMAIC." },
  { id: "APM-FC-53", paper: "APM", area: "D", front: "DMAIC cycle", back: "Define, Measure, Analyse, Improve, Control — the structured Six Sigma method for improving an existing process." },
  { id: "APM-FC-54", paper: "APM", area: "D", front: "Total Quality Management (TQM) — core principle", back: "Continuous improvement (kaizen) with getting it right first time and zero defects, driven by all employees and focused on the customer." },
  { id: "APM-FC-55", paper: "APM", area: "D", front: "The four quality cost categories", back: "Prevention, appraisal, internal failure and external failure costs. Spending more on prevention/appraisal reduces the larger failure costs." },
  { id: "APM-FC-56", paper: "APM", area: "D", front: "Benchmarking failure risk — trend analysis", back: "Deteriorating ratios over several periods (falling margins, rising gearing, worsening liquidity/interest cover) signal rising failure risk before insolvency." },
  { id: "APM-FC-57", paper: "APM", area: "D", front: "The main causes of corporate failure", back: "Poor management, weak financial control, overtrading, high gearing, failure to adapt to change, and one large mismanaged project." },
  { id: "APM-FC-58", paper: "APM", area: "D", front: "Limitations of quantitative failure models", back: "Based on historic accounts (which can be manipulated), assume the past predicts the future, ignore qualitative factors and need periodic recalibration." },
  { id: "APM-FC-59", paper: "APM", area: "D", front: "The interest cover ratio", back: "Profit before interest and tax ÷ interest payable. A low or falling ratio signals difficulty servicing debt and rising failure risk." },
  { id: "APM-FC-60", paper: "APM", area: "D", front: "Reasons a good strategy still fails in execution", back: "Weak communication, misaligned rewards, poor controls, inadequate resources, resistance to change and no link between strategy and operational measures." },
]
