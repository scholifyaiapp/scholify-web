/*
 * FM Area E — business finance and the cost of capital.
 *
 * This is the other dependable Section C territory. Calculations use market
 * values, after-tax company costs and the formulae supplied on screen; the
 * discussion is derived from control, cash commitments, risk, maturity and
 * information rather than a memorised source-of-finance list.
 */
import type { ExamPlanMap } from "@/lib/acca-exam-plans"

export const FM_PLANS_E: ExamPlanMap = {
  /* ── FM-14 · Sources of finance and dividend policy ───────────────────── */

  "FM-14::sources": {
    title: "Matching finance maturity and claim to the need",
    format: "mtq",
    marks: 10,
    requirement:
      "For five financing needs — a seasonal inventory build, a permanent working-capital base, a ten-year factory, high-risk research with no near-term cash and imported machinery — select a suitable source and justify it by maturity, cash commitment and risk. (10 marks)",
    plan: [
      {
        step: "Classify the need before naming a source",
        detail:
          "Identify amount, duration, cash-flow certainty, currency, asset security and whether the need is temporary or permanent. A source cannot be suitable merely because it is available.",
      },
      {
        step: "Match maturity to asset life",
        detail:
          "Use short, flexible finance for predictable seasonal movements and committed long-term finance for permanent assets. Funding a factory with an overdraft creates repeated refinancing risk.",
      },
      {
        step: "Match fixed claims to cash capacity",
        detail:
          "Debt suits predictable cash flows and may be tax-efficient; equity or retained earnings absorb uncertain outcomes but dilute ownership or current payout. Leasing can match payment to use and transfer residual risk.",
      },
      {
        step: "Give the reason as the second mark",
        detail:
          "Each task needs the source and the scenario link: maturity, repayment capacity, security, currency hedge or control. Listing five instruments without why earns only labels.",
      },
    ],
    answer:
      "**Seasonal inventory:** a committed overdraft or short revolving facility, repaid when the seasonal receivables convert to cash. Flexibility matches a temporary fluctuation.\n\n**Permanent working-capital base:** long-term debt, equity or retained earnings, because the minimum balance recurs and should not depend on repeated short renewal.\n\n**Ten-year factory:** long-term loan, bond, equity or a long lease, matching finance maturity to the asset's cash life and avoiding an early refinancing cliff.\n\n**High-risk research with no near-term cash:** retained earnings, venture/equity finance or a staged grant/partner contribution. Fixed interest would fall due before uncertain benefits; risk-bearing capital is more suitable.\n\n**Imported machinery:** a term loan or lease matching the machinery life, potentially denominated or hedged in the payment currency if corresponding cash flows exist. Supplier credit may bridge delivery but is not automatically suitable for the whole useful life.\n\nThe examiner's trap is choosing by term alone. Cost, tax, security, covenants, control, currency and cash-flow resilience must support the maturity match.",
    earns: [
      "Matching all five needs to a plausible source and a scenario reason",
      "Distinguishing permanent working capital from a seasonal fluctuation",
      "Matching fixed debt claims to predictable cash capacity",
    ],
    loses: [
      "Funding the ten-year factory entirely with an uncommitted overdraft",
      "Recommending debt for pre-revenue research without addressing service capacity",
      "Naming instruments without linking maturity, risk or currency",
    ],
  },

  "FM-14::smes": {
    title: "Explaining and closing the SME finance gap",
    format: "written",
    marks: 10,
    requirement:
      "A young owner-managed technology company has valuable growth opportunities but little security, short financial history and a founder unwilling to surrender control. Explain its finance gap and discuss suitable sources. (10 marks)",
    plan: [
      {
        step: "Separate supply and knowledge gaps",
        detail:
          "The funding gap may be an actual shortage of suitable finance, while a knowledge gap means owner-managers do not know sources or cannot present credible information. Apply both to the limited history and specialist technology.",
      },
      {
        step: "Trace information asymmetry into terms",
        detail:
          "Lenders cannot easily assess technology or default risk, security is weak and due diligence is costly relative to the amount. The response is refusal, high interest, guarantees, covenants or restricted maturity.",
      },
      {
        step: "Compare sources against control and cash",
        detail:
          "Retained cash preserves control but may be inadequate; debt preserves ownership but needs service and security; angel, venture and crowdfunding equity bear risk but dilute control; grants and asset finance may target specific needs.",
      },
      {
        step: "Recommend a staged financing route",
        detail:
          "Improve accounts and forecasts, separate project milestones, use grants or customer funding where possible and negotiate the smallest necessary external equity. The founder's control preference has an opportunity cost.",
      },
    ],
    answer:
      "The SME faces **information asymmetry**: outside financiers know less about the technology, management quality and future cash flows than the founder. A short track record makes forecasts hard to verify, intangible assets provide little collateral and the due-diligence cost is high relative to the funding sought. This can create a **supply gap** — no finance on viable terms — and a **knowledge gap** if management does not know suitable routes or cannot present investor-ready information.\n\nRetained earnings and founder funds preserve control but are limited. Bank debt or government-backed lending avoids ownership dilution, yet fixed service, guarantees and security may be unsafe before revenue stabilises. Leasing or asset finance can fund identifiable equipment without financing the whole business. Grants, tax incentives, customer deposits and strategic partners can reduce the external need. Angel, venture-capital or equity-crowdfunding investors can bear development risk and add expertise, but require information, governance rights and a share of upside.\n\nThe company should produce credible milestone-based cash forecasts, strengthen reporting and stage the raise so evidence reduces later information risk. Use non-dilutive and asset-backed sources where matched, then seek patient equity for the genuinely risky intangible development. Refusing any control dilution may mean rejecting positive-NPV growth; control is a financing criterion, not a free constraint.",
    earns: [
      "Explaining information asymmetry, weak security and disproportionate transaction cost",
      "Distinguishing supply gap from management knowledge gap",
      "Comparing sources against the founder's control and the company's service capacity",
    ],
    loses: [
      "Assuming a profitable forecast guarantees bank debt",
      "Recommending venture equity without addressing control dilution",
      "Treating the founder's control preference as costless",
    ],
  },

  "FM-14::dividends": {
    title: "Designing a dividend policy around value and finance",
    format: "written",
    marks: 10,
    requirement:
      "A mature company has paid a steadily growing dividend for ten years but now has several positive-NPV projects and limited debt headroom. Discuss whether it should cut the dividend, using dividend-policy theories and practical factors. (10 marks)",
    plan: [
      {
        step: "Start with the financing need and value test",
        detail:
          "Retaining earnings is justified when positive-NPV projects cannot be funded more cheaply without unacceptable risk. Retention without valuable investment is not automatically wealth-maximising.",
      },
      {
        step: "Apply competing theories rather than naming them",
        detail:
          "In a perfect market dividend may be irrelevant, but taxes, transaction cost, information, agency and investor clienteles make policy relevant. A cut can signal distress even when it funds good projects.",
      },
      {
        step: "Use the ten-year record as evidence",
        detail:
          "Shareholders may rely on the stable pattern and management has created expectations. Sudden cuts can change clientele and price; smoothing, explanation and temporary alternatives reduce the signal shock.",
      },
      {
        step: "Recommend a residual policy with communication",
        detail:
          "Fund accepted investments after maintaining prudent debt capacity, then distribute the residual over time. Explain project NPVs, cash needs and future payout path rather than defending an arbitrary dividend target.",
      },
    ],
    answer:
      "In a perfect capital market, shareholders can create a **homemade dividend** by selling shares, so payout timing would not affect value. In practice it matters. Dividends may signal management's confidence in sustainable cash flow; a cut after ten years of growth may be read as bad news. Some investors form an income **clientele**, taxes may differ between dividends and gains, and issuing replacement equity incurs cost and adverse-selection discounts. Conversely, high dividends can reduce free cash available for managerial waste and therefore agency cost.\n\nThe company has positive-NPV projects and limited safe borrowing capacity. Retaining cash avoids issue costs and preserves debt headroom, so a lower payout may add value if the projects genuinely earn above their risk-adjusted required return. But management must not use “investment” to retain cash for empire building, and it should compare the value gained with the price and investor consequences of breaking the established pattern.\n\nA residual approach is appropriate: fund value-creating investment within the target capital structure, maintain a prudent liquidity buffer, then distribute residual cash while smoothing avoidable volatility. The board should explain the project economics and whether the cut is temporary, consider a slower growth rate rather than an abrupt cancellation, and review buybacks only if legally and financially suitable. Stable dividend is a means, not a reason to reject positive NPV.",
    earns: [
      "Applying irrelevance, signalling, clientele, tax/issue cost and agency ideas to the scenario",
      "Linking retention to positive NPV and limited debt capacity",
      "Recommending a communicated residual policy rather than an automatic cut",
    ],
    loses: [
      "Saying retained earnings are free because no interest is paid",
      "Treating dividend irrelevance as true despite the stated market imperfections",
      "Ignoring the signal created by breaking a ten-year pattern",
    ],
  },

  "FM-14::choosing-a-source": {
    title: "Comparing debt and rights finance through value and risk",
    format: "written",
    marks: 20,
    requirement:
      "A company has 6 million shares trading at $5, debt of $8 million costing 6%, and current EBIT of $3 million. A project requires $4.8 million and is expected to add EBIT of $0.9 million. It can be financed by debt at 8% or a one-for-five rights issue at $4. Tax is 25%.\n\n(a) Calculate current EPS and interest cover, and post-investment EPS, interest cover and market-value gearing under each financing option. (12 marks)\n(b) Discuss and recommend a source. (8 marks)",
    plan: [
      {
        step: "Protect the 12 calculation, 8 discussion allocation",
        detail:
          "Lay out current, debt and rights columns in the spreadsheet. Then reserve time for risk, control, market capacity and forecast sensitivity; ratios alone cannot earn more than twelve.",
      },
      {
        step: "Build current earnings as the control column",
        detail:
          "Current interest is 6% × $8m, earnings are (EBIT − interest) × (1 − tax), and EPS uses 6m shares. Interest cover is EBIT/interest and market gearing uses debt/(debt + equity market value).",
      },
      {
        step: "Change only what each source changes",
        detail:
          "Both options add $0.9m EBIT. Debt adds 8% × $4.8m interest but no shares; rights adds 1.2m shares and $4.8m equity but no interest. This isolates the financing effect.",
      },
      {
        step: "Use TERP for rights market value",
        detail:
          "One new $4 share for five worth $5 gives TERP (5 × $5 + $4)/6 = $4.833. Post-rights equity value is 7.2m × $4.833 = $34.8m, equal to old value plus new cash.",
      },
      {
        step: "Recommend from resilience, not EPS alone",
        detail:
          "Debt gives slightly higher forecast EPS but weaker cover and higher gearing. Test project EBIT, covenants, cash timing, control dilution, issue certainty and target capital structure before deciding.",
      },
    ],
    answer:
      "**Spreadsheet comparison**\n\nCurrent interest = $8m × 6% = $0.480m. Current earnings = ($3.000m − $0.480m) × 75% = **$1.890m**; EPS = $1.890m/6m = **31.50 cents**; interest cover = $3.000m/$0.480m = **6.25 times**. Current equity market value is $30m and gearing is $8m/($8m + $30m) = **21.05%**.\n\n| After project | Debt finance | Rights finance |\n|---|---:|---:|\n| EBIT | $3.900m | $3.900m |\n| Interest | $0.480m + $0.384m = $0.864m | $0.480m |\n| Earnings after tax | **$2.277m** | **$2.565m** |\n| Shares | 6.0m | 7.2m |\n| **EPS** | **37.95c** | **35.63c** |\n| **Interest cover** | **4.51×** | **8.13×** |\n| Equity market value | $30.0m | 7.2m × $4.833 TERP = $34.8m |\n| Debt | $12.8m | $8.0m |\n| **Debt/(debt + equity)** | **29.91%** | **18.69%** |\n\nDebt gives the higher forecast EPS but materially reduces cover and raises gearing. EPS is not a value rule: leverage raises both expected return and shareholder risk, and the forecast $0.9m EBIT must arrive in cash before fixed interest is due. Rights finance strengthens cover and preserves debt capacity but dilutes any holder who does not subscribe, has issue cost and may signal that management considers shares highly priced.\n\nIf cash flows are stable, covenants have headroom and 29.9% is within the target structure, debt may be justified and the project's 18.75% EBIT return comfortably exceeds its 8% stated debt cost before allowing for risk. If project EBIT is volatile or the company needs future borrowing capacity, rights finance is safer. Stress-test EBIT and cash, compare full costs and protect shareholder pre-emption. Do not select debt solely for 2.32 cents of forecast EPS.",
    earns: [
      "Twelve-mark current/debt/rights spreadsheet with earnings, cover and market gearing",
      "Using 1.2m new shares and a $4.833 TERP that reconciles equity value to $34.8m",
      "Showing debt EPS 37.95c against rights EPS 35.63c without treating EPS as value",
      "Using eight discussion marks for cash risk, covenant headroom, control and financing capacity",
    ],
    loses: [
      "Comparing EPS without adding the project's $0.9m EBIT to both options",
      "Using book share capital rather than market equity in gearing",
      "Ignoring the TERP and the 1.2m new rights shares",
      "Choosing debt solely because forecast EPS is higher and forfeiting the discussion marks",
    ],
  },

  /* ── FM-15 · Equity finance and rights issues ─────────────────────────── */

  "FM-15::methods": {
    title: "Selecting an equity issue method and explaining its trade-off",
    format: "mtq",
    marks: 10,
    requirement:
      "For five situations, choose among a rights issue, public offer, placing, stock-exchange introduction and retained earnings, and explain the principal benefit or limitation of the method selected. (10 marks)",
    plan: [
      {
        step: "Identify whether new cash is required",
        detail:
          "A public offer, placing and rights issue raise funds; an introduction lists existing shares without a new issue; retained earnings finance internally. This first split eliminates many distractors.",
      },
      {
        step: "Identify whose ownership is protected",
        detail:
          "A rights issue offers shares pro rata and protects pre-emption if holders subscribe or sell rights. A placing is quicker and cheaper but can concentrate new shares and dilute non-participants.",
      },
      {
        step: "Balance reach against issue cost",
        detail:
          "A public offer can raise a large amount and widen ownership but requires extensive regulation, underwriting and marketing. Retained earnings avoid issue cost but are limited and still have an equity opportunity cost.",
      },
      {
        step: "Give one scenario-specific consequence",
        detail:
          "The second mark in each task comes from cash raised, control, speed, marketability or cost. Naming the issue route alone is not an exam answer.",
      },
    ],
    answer:
      "**Rights issue:** suitable for a listed company raising equity while protecting existing shareholders' proportionate ownership. Holders can subscribe or sell the transferable right; success and discount still matter.\n\n**Public offer:** suitable for a large first or subsequent issue seeking a broad investor base. It can raise substantial funds but carries high advisory, underwriting, disclosure and marketing cost.\n\n**Placing:** shares are placed with selected institutions. It is faster and cheaper than a public offer, but may dilute existing owners and concentrate influence.\n\n**Introduction:** existing shares obtain a listing without raising new cash, suitable where ownership is already sufficiently spread and marketability is the aim. Choosing it for a funding need is the classic distractor.\n\n**Retained earnings:** internally generated equity with no issue process and no immediate ownership dilution. It is limited by cash and dividend expectations and is not free: shareholders forgo distributions that could earn a return elsewhere. The method must fit amount, cash need, ownership, timetable and market readiness.",
    earns: [
      "Distinguishing cash-raising issues from an introduction",
      "Explaining pre-emption under rights and dilution under a placing",
      "Recognising retained earnings' shareholder opportunity cost",
    ],
    loses: [
      "Recommending an introduction where the company needs new cash",
      "Calling retained earnings costless finance",
      "Naming issue methods without a control, cost or access consequence",
    ],
  },

  "FM-15::terp": {
    title: "Reconciling TERP and the two meanings of a right",
    format: "mtq",
    marks: 10,
    requirement:
      "A company with shares trading at $5 announces a one-for-four rights issue at $4. Calculate the theoretical ex-rights price, value of the right attached to each existing share, value of the four rights needed to buy one new share, and the wealth of an investor owning 400 shares who either subscribes or sells the rights. (10 marks)",
    plan: [
      {
        step: "Build one five-share theoretical bundle",
        detail:
          "Four old shares worth $5 plus one new share bought for $4 create five ex-rights shares. Divide the bundle value by five to obtain TERP; do not average the two prices without weighting.",
      },
      {
        step: "Name which right value is being asked",
        detail:
          "Value per existing share is cum-rights price minus TERP. Buying one new share requires four such rights, so the value of a complete entitlement is four times the per-share amount.",
      },
      {
        step: "Reconcile subscribe and sell wealth",
        detail:
          "A 400-share holder can buy 100 new shares for $400. Compare the value of 500 ex-rights shares less new cash with selling 400 rights; both routes preserve theoretical pre-issue wealth.",
      },
      {
        step: "Treat TERP as theoretical",
        detail:
          "It assumes issue proceeds add dollar-for-dollar value and ignores signalling, issue costs and market movement. A real ex-rights price can differ without making the arithmetic wrong.",
      },
    ],
    answer:
      "TERP = [(4 × $5) + (1 × $4)]/5 = **$4.80**.\n\nValue of the right attached to **each existing share** = $5.00 − $4.80 = **$0.20**. Four rights are needed to buy one new share, so the value of the **complete entitlement to one new share** is 4 × $0.20 = **$0.80**, also $4.80 − $4.00. Confusing $0.20 with $0.80 is the standard wording trap.\n\nA holder of 400 old shares owns rights to 100 new shares. If the holder subscribes, 500 shares are worth 500 × $4.80 = $2,400 after paying $400, leaving net wealth **$2,000**, equal to the original 400 × $5. If the holder sells the rights, the 400 shares are worth 400 × $4.80 = $1,920 and rights proceeds are 400 × $0.20 = $80, again **$2,000**. Doing nothing allows the rights to lapse and transfers $80 of theoretical value to subscribing owners.",
    earns: [
      "Weighting four old and one new share to obtain a $4.80 TERP",
      "Distinguishing $0.20 per existing share from $0.80 for four rights",
      "Reconciling both subscription and sale routes to $2,000 wealth",
    ],
    loses: [
      "Taking an unweighted average of $5 and $4",
      "Giving $0.80 when the requirement asks for value per existing share",
      "Treating the subscription payment as a wealth loss rather than new investment cash",
    ],
  },

  "FM-15::listing": {
    title: "Evaluating whether a stock-market listing creates value",
    format: "written",
    marks: 10,
    requirement:
      "An established family-owned company is considering a stock-market listing to finance expansion. Discuss the potential benefits, costs and suitability of listing. (10 marks)",
    plan: [
      {
        step: "Use access, liquidity and discipline as benefit headings",
        detail:
          "Explain how listing widens the equity pool, creates a market price and acquisition currency, lets family investors diversify and can improve profile, governance and future funding access.",
      },
      {
        step: "Use cost, control and disclosure as downside headings",
        detail:
          "Apply issue and continuing costs, public reporting, investor pressure, takeover exposure, dilution and management time. These are cash and strategic consequences, not ceremonial disadvantages.",
      },
      {
        step: "Distinguish listing from raising cash",
        detail:
          "An introduction can list existing shares without new proceeds. If expansion funding is the purpose, the company needs a primary issue structure as well as admission to trading.",
      },
      {
        step: "Reach a conditional recommendation",
        detail:
          "Assess funding scale, governance readiness, track record, free float, disclosure tolerance and family control. Compare private equity, debt or a staged private raise before declaring listing inevitable.",
      },
    ],
    answer:
      "Listing can access a wider pool of permanent equity for expansion and make later issues easier. Tradable shares give family owners liquidity and diversification, create a visible market valuation and can be used to acquire businesses or reward employees. Public scrutiny and governance may improve credibility with lenders, customers and managers.\n\nCosts are substantial: advisers, underwriting, prospectus and admission costs at issue, followed by exchange fees, investor relations, audit, governance and continuing disclosure. Ownership and voting control may be diluted, commercially sensitive information becomes public, short-term market expectations may affect decisions and the company becomes more exposed to takeover. Management time and accountability change materially. Market price can be volatile and an unsuccessful issue can damage reputation.\n\nListing itself does not always raise money — an **introduction** lists existing securities. Expansion requires a primary issue or other fundraising alongside admission. The company should quantify the cash need and issue costs, test whether its history, systems, board and free float meet requirements, and decide how much family control it will surrender. If the need is large and recurring and governance is ready, listing may be suitable; for a smaller one-off need, private equity, debt or retained finance may deliver value at lower continuing cost.",
    earns: [
      "Balancing access/liquidity benefits against continuing cost, disclosure and control",
      "Distinguishing a listing from a cash-raising primary issue",
      "Conditioning the recommendation on scale and governance readiness",
    ],
    loses: [
      "Assuming admission to trading automatically provides expansion cash",
      "Ignoring continuing compliance cost after the initial issue",
      "Treating dilution as only an EPS calculation and not a control issue",
    ],
  },

  /* ── FM-16 · Debt and Islamic finance ─────────────────────────────────── */

  "FM-16::debt-forms": {
    title: "Comparing debt instruments by cash flow and risk",
    format: "mtq",
    marks: 10,
    requirement:
      "For five situations, select and justify one of an overdraft, term loan, fixed-rate bond, floating-rate note or convertible bond, considering maturity, rate exposure, security, flexibility and control. (10 marks)",
    plan: [
      {
        step: "Map the underlying cash-flow pattern",
        detail:
          "Temporary fluctuating needs favour flexible short facilities; committed long assets need term finance. Predictability, currency and cash-service headroom determine whether fixed claims are supportable.",
      },
      {
        step: "Identify who bears rate risk",
        detail:
          "Fixed-rate debt gives borrower certainty but may be expensive to exit if rates fall. Floating debt follows market rates and may start cheaper but exposes interest cover to increases.",
      },
      {
        step: "Recognise embedded equity in a convertible",
        detail:
          "A convertible can carry a lower coupon because investors receive a conversion option. It delays possible dilution; it is not free debt and its future control/EPS effect must be considered.",
      },
      {
        step: "State one instrument-specific limitation",
        detail:
          "Overdrafts may be repayable on demand, loans carry covenants/security, bonds require market access and issue scale, and convertibles can dilute. This earns the applied justification mark.",
      },
    ],
    answer:
      "An **overdraft** suits a fluctuating short-term deficit because drawings and interest vary with use, but it may be uncommitted or repayable on demand and is unsafe for permanent assets.\n\nA **term loan** suits a defined medium- or long-term investment and can be tailored in amortisation and security, but covenants and refinancing or prepayment terms matter.\n\nA **fixed-rate bond** gives known interest on a large long-term need and protects against rate rises; issue cost, market access and loss if rates later fall must be weighed.\n\nA **floating-rate note** can match floating-rate assets or a view that rates may fall, but exposes interest cover and cash flow when market rates rise.\n\nA **convertible bond** may fund growth at a lower coupon because investors value the option to convert. Conversion removes redemption pressure but dilutes existing ownership and EPS; if the share price performs poorly the debt remains and must be redeemed.\n\nThe correct choice follows maturity, cash stability, rate exposure, security, covenant headroom, scale and control — not simply the lowest opening coupon.",
    earns: [
      "Matching each instrument to maturity and cash-flow behaviour",
      "Explaining which party bears fixed/floating rate exposure",
      "Treating conversion value as the reason for lower coupon and future dilution",
    ],
    loses: [
      "Using a callable overdraft for a permanent long-term asset",
      "Selecting floating debt without testing an interest-rate rise",
      "Describing convertible debt as permanently non-dilutive",
    ],
  },

  "FM-16::islamic": {
    title: "Matching Islamic finance structures to real transactions",
    format: "written",
    marks: 10,
    requirement:
      "Explain the principles of Islamic finance and distinguish murabaha, ijara, mudaraba and sukuk by showing how each could finance a company. (10 marks)",
    plan: [
      {
        step: "Use principles for the first two marks",
        detail:
          "Explain prohibition of riba, excessive uncertainty and prohibited activity, plus asset backing and sharing of risk/reward. Do not reduce Islamic finance to renaming interest.",
      },
      {
        step: "Give each structure its transaction route",
        detail:
          "For every instrument state who owns or supplies the asset/capital, how the financier earns a return and who bears relevant risk. This distinguishes contracts more reliably than Arabic labels alone.",
      },
      {
        step: "Separate sale, lease, partnership and certificate",
        detail:
          "Murabaha is disclosed cost-plus sale, ijara is lease, mudaraba is capital/management profit sharing, and sukuk are certificates linked to asset cash flows rather than conventional interest debt.",
      },
      {
        step: "Acknowledge practical comparability",
        detail:
          "Assess documentation, asset ownership, tax/legal treatment, Sharia governance, tradability and cash-flow predictability. Similar economic cash patterns do not erase contractual differences.",
      },
    ],
    answer:
      "Islamic finance prohibits **riba** (interest), excessive avoidable uncertainty and financing prohibited activities. Transactions should be linked to real assets or services, with the financier bearing genuine risk and earning profit or rent rather than a guaranteed return on money alone.\n\nIn **murabaha**, the financier buys an identified asset and sells it to the company at disclosed cost plus profit, usually paid in instalments. The markup is fixed through a real sale; the financier owns the asset before resale.\n\nIn **ijara**, the financier buys and leases the asset, earning rent while retaining ownership responsibilities specified by the contract. It resembles leasing, not an interest loan.\n\nIn **mudaraba**, one party supplies capital and the entrepreneur manages the venture. Agreed ratios share profit; financial loss falls on the capital provider unless caused by manager negligence or breach.\n\n**Sukuk** give investors proportionate beneficial interests in assets, services or a venture and returns arise from those underlying cash flows. They are not simply bonds with coupon renamed.\n\nThe company should match purchase, use or venture needs, and assess documentation, Sharia approval, asset-title and tax treatment, liquidity and risk allocation. Contract substance and genuine ownership/risk are central.",
    earns: [
      "Explaining riba, uncertainty, asset backing and risk/reward principles",
      "Giving a clear ownership-and-return route for all four structures",
      "Distinguishing sukuk asset interests from conventional interest debt",
    ],
    loses: [
      "Describing every structure as an interest loan under another name",
      "Confusing murabaha sale with ijara lease",
      "Saying a mudaraba manager automatically bears all financial loss",
    ],
  },

  "FM-16::matching-the-instrument": {
    title: "Choosing an instrument from an applied funding constraint",
    format: "written",
    marks: 10,
    requirement:
      "A company needs $20 million for a seven-year renewable-energy asset. Its cash flows are predictable once operational, construction takes a year, current debt is floating rate and close to a covenant limit, and shareholders want to avoid immediate dilution. Recommend a financing package. (10 marks)",
    plan: [
      {
        step: "Extract five constraints from the scenario",
        detail:
          "Use size and seven-year life, construction timing, post-completion predictability, existing floating-rate exposure, covenant headroom and control. A recommendation not addressing these facts is generic.",
      },
      {
        step: "Separate construction and operation phases",
        detail:
          "A committed staged construction facility can fund drawdowns before revenue, then refinance into amortising project or long-term fixed finance when operating cash becomes visible.",
      },
      {
        step: "Avoid stacking the stated risks",
        detail:
          "More floating debt would increase rate and covenant risk. Pure debt may be unavailable near the covenant; pure equity solves resilience but violates the dilution preference. A package can trade the constraints.",
      },
      {
        step: "Recommend with conditions and fallback",
        detail:
          "Consider fixed-rate secured term debt or lease/project finance plus retained cash, with limited equity, convertible or partner capital if covenant capacity is insufficient. State hedging, tenor and contingency conditions.",
      },
    ],
    answer:
      "The seven-year asset should not be funded with an overdraft or other callable short finance. During construction, use a **committed staged facility** so interest is paid only on drawdowns and completion risk is explicitly monitored. Once operational cash flows are established, refinance into a seven-year amortising term loan, project finance, bond or long lease matched to asset receipts.\n\nBecause existing debt is floating, the new operational finance should be substantially **fixed rate** or hedged, preventing a rate rise from weakening interest cover twice. However, the company is near a covenant limit, so adding the full $20m as conventional debt may be impossible or destroy future capacity. Retained cash, a strategic partner, asset/project finance with limited recourse, grant support or a smaller rights issue can provide the risk-bearing layer. A convertible may reduce the initial coupon and delay dilution, but still counts as debt until conversion and can dilute later.\n\nRecommend a mixed, milestone-based package subject to downside cash-flow and covenant tests, construction contingency, security and refinancing terms. Shareholder dislike of immediate dilution is relevant, but preserving control by accepting an unserviceable fixed claim destroys rather than protects their wealth.",
    earns: [
      "Separating construction drawdowns from long-term operating finance",
      "Responding to existing floating-rate and covenant exposure",
      "Recommending a conditional package rather than one instrument by label",
    ],
    loses: [
      "Using an uncommitted short facility for the seven-year asset",
      "Adding more floating debt without addressing rate risk",
      "Treating avoidance of dilution as more important than solvency and covenant capacity",
    ],
  },

  /* ── FM-17 · The cost of equity and the cost of debt ───────────────────── */

  "FM-17::cost-of-equity": {
    title: "Calculating DVM and CAPM costs from the provided formulae",
    format: "mtq",
    marks: 10,
    requirement:
      "A share trades at $4.50. The dividend just paid was $0.30 and dividends are expected to grow at 4%. Equity beta is 1.20, the risk-free rate 3.5% and expected market return 8.5%. Calculate cost of equity using the dividend-growth model and CAPM, explain the difference and state one limitation of each. (10 marks)",
    plan: [
      {
        step: "Select both formulae from the on-screen sheet",
        detail:
          "FM provides DVM and CAPM relationships. For DVM identify D0 as the dividend just paid and grow it once to D1; for CAPM identify the market risk premium before multiplying by beta.",
      },
      {
        step: "Keep percentage and cash inputs separate",
        detail:
          "DVM uses $0.312 next dividend divided by $4.50 plus 4%. CAPM uses 3.5% + 1.20 × (8.5% − 3.5%). Do not multiply beta by the whole market return.",
      },
      {
        step: "Interpret the models' information sets",
        detail:
          "DVM infers return from price, expected dividend and constant growth; CAPM prices systematic market risk. Different estimates are evidence to investigate, not numbers to average automatically.",
      },
      {
        step: "Attach a limitation to each route",
        detail:
          "DVM needs a meaningful dividend and stable growth; CAPM depends on estimated beta, market return and simplifying assumptions. Choose based on data reliability and project/company risk.",
      },
    ],
    answer:
      "Using the formulae supplied on screen:\n\n**Dividend-growth model:** D1 = $0.30 × 1.04 = $0.312. ke = $0.312/$4.50 + 0.04 = **10.93%**. Using $0.30 directly gives 10.67%, the ex-dividend-timing distractor.\n\n**CAPM:** market risk premium = 8.5% − 3.5% = 5.0%. ke = 3.5% + 1.20 × 5.0% = **9.50%**. Multiplying beta by 8.5% gives 13.7%, which double-counts the risk-free element.\n\nDVM uses market price, expected dividend and an assumed perpetual constant growth rate. It is weak for non-dividend payers, unstable growth or a dividend distorted by policy. CAPM focuses on systematic risk and can be used without dividends, but beta is historic/estimated and the risk-free rate, market premium and single-factor market assumptions are uncertain. The 1.43-point difference should prompt sensitivity and evidence review; it is not resolved by mechanically averaging the two.",
    earns: [
      "Growing D0 once and obtaining 10.93% from the provided DVM formula",
      "Using only the 5% market premium in CAPM to obtain 9.50%",
      "Explaining why model assumptions can produce different estimates",
    ],
    loses: [
      "Using the dividend just paid without growing it to D1",
      "Multiplying beta by the whole market return",
      "Averaging estimates without assessing dividend growth or beta reliability",
    ],
  },

  "FM-17::cost-of-debt": {
    title: "Keeping company debt cost separate from investor yield",
    format: "mtq",
    marks: 10,
    requirement:
      "A $100 nominal five-year redeemable bond pays 8% annual interest, trades at $92 and is redeemed at par. Corporation tax is 25%. A $1 preference share pays a fixed $0.09 dividend and trades at $0.80. Estimate the investor's bond redemption yield, the company's after-tax bond cost and the preference-share cost, and explain the tax distinction. (10 marks)",
    plan: [
      {
        step: "Write investor and company cash flows separately",
        detail:
          "The investor receives the full $8 coupon and $100 redemption. The company receives tax relief on interest, so its relevant annual interest is $6, but redemption principal receives no tax relief.",
      },
      {
        step: "Find redeemable costs as IRRs",
        detail:
          "Discount coupon plus redemption to the $92 market price, using PV tables and interpolation if needed. Do not use coupon/market price alone because the $8 redemption gain is also a return.",
      },
      {
        step: "Calculate preference cost as a perpetuity",
        detail:
          "Preference dividend is a fixed equity distribution: $0.09/$0.80 = 11.25%. It is not tax-deductible, so there is no company tax adjustment analogous to debt interest.",
      },
      {
        step: "Label every rate by perspective",
        detail:
          "Investor redemption yield is pre-company-tax; WACC uses the company's after-tax debt cost. Substituting one for the other overstates the debt component and is a frequent FM loss.",
      },
    ],
    answer:
      "**Investor redemption yield:** solve $92 = $8 annuity for five years + $100 discounted redemption. At 10%, PV = $8 × 3.7908 + $100 × 0.6209 = **$92.42**, so the yield is just above 10%, approximately **10.1%**. Coupon yield alone, $8/$92 = 8.70%, ignores the redemption gain.\n\n**Company after-tax cost of debt:** interest costs $8 × (1 − 25%) = **$6** after tax, while $100 is still redeemed. At 8%, PV = $6 × 3.9927 + $100 × 0.6806 = **$92.02**, so after-tax kd is approximately **8.0%**. Simply taking 10.1% × 75% is only an approximation because redemption is not tax-deductible.\n\n**Preference-share cost:** $0.09/$0.80 = **11.25%**. Preference dividends are distributions, not deductible interest, so no tax reduction applies. The investor wants the pre-tax cash yield; the company uses after-tax debt cost in WACC because interest tax relief reduces its actual financing cash cost.",
    earns: [
      "Including both coupons and redemption gain in the investor's roughly 10.1% yield",
      "Tax-adjusting interest but not redemption to obtain company debt cost near 8.0%",
      "Calculating preference cost at 11.25% without tax relief",
    ],
    loses: [
      "Using coupon yield as the redeemable debt cost",
      "Applying the tax rate to redemption principal",
      "Tax-adjusting preference dividends as though they were interest",
    ],
  },

  "FM-17::choosing-the-model": {
    title: "Choosing a cost-of-equity model when estimates disagree",
    format: "written",
    marks: 10,
    requirement:
      "A company's dividend-growth estimate of cost of equity is 12%, while CAPM gives 9%. It has recently changed dividend policy and is entering a business line with different systematic risk. Discuss how the finance manager should choose an appropriate rate. (10 marks)",
    plan: [
      {
        step: "Diagnose why DVM may be unstable",
        detail:
          "A recent dividend-policy change breaks the constant-growth inference. Test whether historic growth, analyst forecasts and payout capacity support a perpetual rate before trusting 12%.",
      },
      {
        step: "Diagnose why company CAPM may be wrong for the project",
        detail:
          "A company equity beta reflects existing business and financial risk. A different business line needs a proxy beta from comparable pure-play companies, ungeared and then regeared to the project's financing assumptions.",
      },
      {
        step: "Keep financing and business risk distinct",
        detail:
          "Do not raise the project discount rate merely because debt finances it if WACC already captures financing consistently. Adjust for systematic project risk with evidence, then use project-specific cash-flow scenarios for diversifiable risks.",
      },
      {
        step: "Use a range and decision sensitivity",
        detail:
          "Recalculate NPV across defensible rates, explain the preferred central rate and identify the rate at which the decision reverses. Disagreement is uncertainty to expose, not average away.",
      },
    ],
    answer:
      "The 12% DVM estimate assumes the next dividend and a **constant perpetual growth rate** represent underlying returns. A recent payout-policy change may make historic growth meaningless: a lower dividend can reflect investment rather than weaker capacity, and a one-off catch-up can inflate growth. Re-estimate sustainable growth from profitability, retention and forecasts, and test whether DVM is usable at all.\n\nThe 9% CAPM estimate prices **systematic risk**, but the company's equity beta reflects its present activities and gearing. The new business line needs a proxy asset beta from comparable focused companies, removing their financial gearing and then regearing for the financing structure relevant to the project/company. Beta, risk-free rate and market premium estimates should be consistent in date and market.\n\nThe manager should not simply average 9% and 12%. Select the model whose inputs match the investment, triangulate with comparable returns and financing evidence, and calculate NPV over a justified range. Show whether the accept/reject decision changes at 9%, 12% or the project-specific proxy rate. Diversifiable operating uncertainty belongs in cash-flow scenarios; systematic risk belongs in the discount rate. The recommendation must disclose the estimation uncertainty rather than hide it in one precise percentage.",
    earns: [
      "Linking the dividend-policy change to DVM's constant-growth weakness",
      "Recommending an ungeared/regeared proxy beta for the new business risk",
      "Using NPV sensitivity across defensible rates instead of automatic averaging",
    ],
    loses: [
      "Using the company's historic beta for a materially different business without adjustment",
      "Treating a recent dividend change as a stable perpetual growth signal",
      "Averaging 9% and 12% with no economic justification",
    ],
  },

  /* ── FM-18 · WACC, gearing and capital structure ──────────────────────── */

  "FM-18::wacc": {
    title: "A market-value WACC that reproduces from its components",
    format: "written",
    marks: 20,
    requirement:
      "A company has 10 million ordinary shares trading at $3 with cost of equity 11%; $20 million nominal debt quoted at $95 per $100 with after-tax cost 6%; and 4 million $1 preference shares trading at $0.80 and paying an 8-cent dividend.\n\n(a) Calculate market-value WACC. (12 marks)\n(b) Discuss when that WACC may be used to appraise a project and its limitations. (8 marks)",
    plan: [
      {
        step: "Protect the 12 calculation, 8 discussion split",
        detail:
          "Show market values, component costs, weighted returns and total in a spreadsheet. Then reserve eight marks for marginal financing, business risk, gearing and estimation limitations.",
      },
      {
        step: "Convert every source to market value",
        detail:
          "Equity is shares × price, debt is nominal × quoted percentage and preference shares are number × market price. Never mix book debt with market equity because weights must measure current opportunity values.",
      },
      {
        step: "Keep component costs on the company basis",
        detail:
          "Use the given 11% equity and after-tax 6% debt. Preference cost is $0.08/$0.80 = 10% with no tax relief. The FM formula is supplied on screen; input selection is the exam skill.",
      },
      {
        step: "Reproduce WACC two ways",
        detail:
          "Sum each market value × cost and divide by total value, then check with percentage weights. The weighted dollar return must be $4.76m on $52.2m, proving the 9.12% result.",
      },
      {
        step: "Derive the eight discussion marks from assumptions",
        detail:
          "Use WACC only for projects with similar systematic business risk and financing that leaves target gearing broadly unchanged. Discuss marginal cost, market values, tax capacity, redeemable-cost estimates and flotation/distress effects.",
      },
    ],
    answer:
      "**Market values and weighted costs ($m)**\n\n| Source | Market value | Component cost | Weighted return |\n|---|---:|---:|---:|\n| Ordinary equity | 10m × $3 = **30.0** | 11% | **3.300** |\n| Debt | $20m × 95% = **19.0** | 6% after tax | **1.140** |\n| Preference shares | 4m × $0.80 = **3.2** | $0.08/$0.80 = **10%** | **0.320** |\n| **Total** | **52.2** | | **4.760** |\n\nWACC = $4.760m/$52.2m = **9.12%**. The result reproduces from its components: equity weight 57.47% × 11% + debt 36.40% × 6% + preference 6.13% × 10% = 9.12%. Using $20m nominal debt or $4m nominal preference capital creates the book/market-value distractor.\n\nWACC is suitable as a project discount rate where the project has business risk similar to existing operations, is small enough not to change the company's financing capacity, and will be financed so target market-value gearing remains broadly constant. It should reflect the **marginal** long-run cost, not blindly historic finance.\n\nA different business line needs a project-specific asset beta and regeared cost; a large project may change gearing and component costs. Market prices, beta, growth and debt yield estimates move, tax relief requires taxable profit, and issue costs or distress risk may matter. Use project cash flows consistently after tax and nominal/real, test a rate range, and avoid assuming the cheapest source alone sets the project hurdle.",
    earns: [
      "Twelve-mark market-value table for all three financing sources",
      "Using after-tax debt and non-deductible 10% preference cost",
      "Reconciling $4.760m weighted return over $52.2m to 9.12%",
      "Using eight discussion marks to test business risk, target gearing and marginal cost",
    ],
    loses: [
      "Weighting debt or preference shares at nominal/book value",
      "Using pre-tax investor debt yield in the company's WACC",
      "Applying 9.12% to a project with materially different systematic risk",
      "Completing only the WACC and accepting the twelve-mark ceiling",
    ],
  },

  "FM-18::risk": {
    title: "Tracing operating and financial gearing into shareholder profit",
    format: "mtq",
    marks: 10,
    requirement:
      "A company has revenue of $10 million, variable costs of $6 million, fixed operating costs of $2 million and interest of $0.5 million. Calculate operating gearing, financial gearing and combined gearing, then show the effect of a 10% sales increase on EBIT and profit before tax and explain the risks. (10 marks)",
    plan: [
      {
        step: "Build contribution, EBIT and profit before tax",
        detail:
          "Contribution is revenue minus variable cost = $4m; EBIT subtracts $2m fixed operating cost = $2m; profit before tax subtracts $0.5m interest = $1.5m.",
      },
      {
        step: "Calculate each gearing multiplier",
        detail:
          "Operating gearing is contribution/EBIT, financial gearing is EBIT/PBT and combined gearing is contribution/PBT or the product. Keep operating fixed cost separate from financing interest.",
      },
      {
        step: "Use the multipliers as a proof",
        detail:
          "A 10% sales/contribution increase should produce 20% EBIT growth and 26.67% PBT growth. Recalculate the new income statement to confirm the percentage route.",
      },
      {
        step: "Interpret downside as well as upside",
        detail:
          "High fixed operating cost makes EBIT sensitive to sales; fixed interest then magnifies the change for shareholders and raises default risk. Combined gearing works in both directions.",
      },
    ],
    answer:
      "Contribution = $10m − $6m = **$4m**; EBIT = $4m − $2m = **$2m**; PBT = $2m − $0.5m = **$1.5m**.\n\nOperating gearing = contribution/EBIT = $4m/$2m = **2.00**. Financial gearing = EBIT/PBT = $2m/$1.5m = **1.333**. Combined gearing = 2.00 × 1.333 = contribution/PBT = **2.667**.\n\nIf sales rise 10% with constant variable-cost ratio, revenue is $11m and contribution $4.4m. EBIT becomes $2.4m, a **20% rise**, matching 10% × operating gearing 2. PBT becomes $1.9m, a **26.67% rise**, matching 10% × combined gearing 2.667.\n\nThe same multipliers apply to a fall: fixed operating cost makes business profit volatile, and fixed interest magnifies shareholder return and threatens payment capacity. The numerical trap includes interest in operating fixed cost, which confuses business and financial risk and destroys the check.",
    earns: [
      "Building the $4m contribution, $2m EBIT and $1.5m PBT bridge",
      "Calculating and reconciling all three gearing multipliers",
      "Proving 20% EBIT and 26.67% PBT growth from a 10% sales rise",
    ],
    loses: [
      "Treating interest as an operating fixed cost",
      "Inverting EBIT/contribution or PBT/EBIT and understating sensitivity",
      "Discussing upside leverage without the corresponding downside and default risk",
    ],
  },

  "FM-18::capital-structure": {
    title: "Explaining when the debt-equity mix changes value",
    format: "written",
    marks: 10,
    requirement:
      "Discuss whether increasing debt will reduce a company's WACC and increase its market value, using relevant capital-structure theories and practical factors. (10 marks)",
    plan: [
      {
        step: "Use theory as a sequence of changing assumptions",
        detail:
          "Begin with Modigliani–Miller without tax, add corporate tax, then add distress, agency, information and market imperfections. This shows why conclusions differ rather than listing named theories.",
      },
      {
        step: "Explain the offset in a no-tax market",
        detail:
          "Cheaper debt does not lower WACC because shareholders demand a higher return for increased financial risk. Total operating value is unchanged by splitting claims differently.",
      },
      {
        step: "Add tax and then its limits",
        detail:
          "Interest tax relief creates a debt tax shield and can raise value, but expected distress cost, covenant loss, agency conflict and lost flexibility rise non-linearly with borrowing.",
      },
      {
        step: "Conclude with target range and evidence",
        detail:
          "Traditional/trade-off reasoning supports an optimal range rather than unlimited debt. Cash-flow stability, asset security, tax capacity, peer gearing, credit rating and future options determine the practical target.",
      },
    ],
    answer:
      "Under **Modigliani–Miller without tax** in perfect markets, capital structure is irrelevant. Debt may have a lower stated return, but additional borrowing raises financial risk and therefore the required return on equity exactly enough to leave WACC and total value unchanged.\n\nWith **corporate tax**, deductible interest creates a tax shield. In the simplest MM tax model, more permanent debt increases value and lowers WACC. Unlimited debt is not a practical conclusion: tax relief requires taxable profit, and high borrowing raises expected financial-distress and bankruptcy costs, restrictive covenants, refinancing risk and loss of strategic flexibility. Shareholders may encourage risky projects at lenders' expense, while lenders respond through price and controls. Managers may also prefer internal finance because an equity issue can signal overvaluation — the **pecking-order** effect.\n\nThe traditional or trade-off view therefore suggests WACC may initially fall as cheap tax-relieved debt replaces equity, reach a minimum, then rise as debt and equity holders price distress. The exact optimum cannot be observed mechanically. Management should set a target range using cash-flow volatility, asset security, interest cover, tax capacity, credit rating, peer evidence and future funding needs, and stress-test it. Increasing debt creates value only while incremental tax and discipline benefits exceed incremental risk and lost flexibility.",
    earns: [
      "Explaining the shareholder-return offset under no-tax MM",
      "Adding the tax shield and then distress, agency and flexibility limits",
      "Recommending an evidence-based target range rather than maximum debt",
    ],
    loses: [
      "Assuming cheap debt mechanically lowers WACC without raising cost of equity",
      "Using the tax model to recommend 100% debt",
      "Naming theories without explaining which changed assumption drives the conclusion",
    ],
  },
}
