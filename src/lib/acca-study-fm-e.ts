import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area E — Business valuations & risk management.
 * Original, syllabus-aligned rich study chapter. No ACCA/Kaplan/BPP text.
 * Every worked figure is re-solved digit-by-digit in the steps.
 */

export const FM_E: StudyChapter = {
  paper: "FM",
  area: "E",
  title: "Business valuations & risk management",
  minutes: 18,
  intro: "What is a business actually worth — and how do you stop a moving exchange rate or interest rate wiping out that worth before the deal completes? This chapter answers both.",
  outcomes: [
    "Explain why and when a business is valued, and who needs the answer",
    "Value equity three ways — asset-based, income-based (P/E and earnings yield) and cash-flow-based (DVM and free cash flow)",
    "Explain the weak, semi-strong and strong forms of the efficient market hypothesis and what each implies",
    "Distinguish transaction, translation and economic foreign-exchange exposure",
    "Hedge currency risk with forward contracts, money-market hedges, futures, options and netting — and forecast rates using PPP and interest-rate parity",
    "Explain interest-rate exposure and the tools that manage it: FRAs, futures, options and swaps",
  ],
  sections: [
    {
      id: "why-value",
      heading: "Why — and when — a business gets valued",
      blocks: [
        { kind: "text", md: "A share price on a stock exchange is a valuation done for you, second by second, by thousands of traders. But most businesses are **not** listed, and even listed ones face moments where a fresh, defensible number is needed. Valuation is the art of putting a price on something that does not trade — and then defending that price to the person on the other side of the table." },
        { kind: "text", md: "The **reason** for the valuation shapes the **number**. A seller wants the highest supportable figure; a buyer wants the lowest; a tax authority wants a rule-based figure it can apply consistently. There is rarely a single \"correct\" value — there is a **range**, and the negotiation lives inside it." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "When a valuation is needed",
          caption: "Each trigger changes who is asking and which method they trust.",
          data: {
            items: [
              { title: "Takeover or acquisition", sub: "buyer and seller must agree a price per share" },
              { title: "Flotation (IPO)", sub: "setting the offer price when going public" },
              { title: "Selling a stake", sub: "an owner or venture investor exiting" },
              { title: "Management buy-out", sub: "managers buying the business they run" },
              { title: "Tax purposes", sub: "probate, inheritance or capital gains" },
              { title: "Raising finance", sub: "valuing shares or assets offered as security" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The one idea", md: "Valuation produces a **range, not a point**. The method you choose, and the assumptions you feed it, move the number — so always state the basis you used and why it fits the reason for the valuation." },
      ],
    },
    {
      id: "asset-income",
      heading: "Asset-based and income-based valuation",
      blocks: [
        { kind: "text", md: "There are three broad **approaches** to valuing equity, and it helps to see them as three different questions about the same business:" },
        { kind: "table", caption: "Three lenses on the same company", head: ["Approach", "The question it asks", "Best suited to"], rows: [
          ["Asset-based", "What are the net assets worth if we broke it up?", "Asset-heavy firms; a valuation floor"],
          ["Income-based", "What are the earnings worth as a multiple?", "Profitable trading firms; using a listed comparator"],
          ["Cash-flow-based", "What future cash will it return to owners?", "Firms valued as a going concern"],
        ] },
        { kind: "text", md: "**Asset-based valuation — net asset value (NAV).** Take total assets less total liabilities. On a **book-value** basis this is simply the equity in the statement of financial position; more usefully it is done on a **realisable** or **replacement** basis. NAV usually gives the lowest figure and acts as a **floor** — an owner would not sell a going concern for less than its break-up value. Its weakness: it ignores goodwill, brands and the earning power of the assets working together." },
        { kind: "formula", name: "Net asset value (equity)", expr: "NAV = Total assets − Total liabilities", note: "On a break-up basis, use realisable values and remember to strip out intangibles with no separate resale value." },
        { kind: "text", md: "**Income-based valuation — the P/E ratio.** The price-earnings ratio expresses how many pounds the market pays for each pound of earnings. If a **comparable listed** company trades on a P/E, you can apply that multiple to your target's earnings. For an **unlisted** target the comparator's P/E is discounted — often by around a quarter to a third — because unlisted shares are riskier and harder to sell." },
        { kind: "formula", name: "P/E valuation", expr: "Equity value = Earnings × P/E ratio     (per share: EPS × P/E ratio)", note: "Earnings means profit after tax attributable to ordinary shareholders. Use a P/E from a genuinely comparable company, then adjust for marketability and risk." },
        { kind: "example", title: "Worked example — a P/E valuation", scenario: "Delta Co is unlisted. Its profit after tax is $4,000,000 and it has 8,000,000 ordinary shares. A listed company in the same sector trades on a P/E of 12. Because Delta is unlisted, you apply a P/E of 9 (a 25% discount). Value Delta's equity.", steps: [
          { label: "Earnings per share", detail: "EPS = $4,000,000 ÷ 8,000,000 shares = **$0.50** per share." },
          { label: "Choose the multiple", detail: "Comparator P/E is 12; discount 25% for lack of marketability → 12 × 0.75 = **9**." },
          { label: "Value per share", detail: "Value per share = EPS × P/E = $0.50 × 9 = **$4.50**." },
          { label: "Total equity value", detail: "$4.50 × 8,000,000 shares = **$36,000,000** (equivalently $4,000,000 earnings × 9 = $36,000,000)." },
        ], result: "Delta's equity is valued at $36,000,000, or $4.50 per share. The whole valuation swings on the multiple — had you used the full P/E of 12 you would have reached $48,000,000, so justifying the discount is where the marks are." },
        { kind: "text", md: "**Earnings yield** is simply the P/E turned upside down: it is earnings as a percentage of price. Valuing on an earnings yield gives an identical answer to the P/E method — it is the same relationship viewed from the other end." },
        { kind: "formula", name: "Earnings yield method", expr: "Earnings yield = 1 ÷ P/E ratio      Value = Earnings ÷ Earnings yield", note: "With a P/E of 9, the earnings yield is 1 ÷ 9 = 11.11%. Value = $4,000,000 ÷ 0.1111 = $36,000,000 — the same answer as the P/E method." },
        { kind: "callout", tone: "warn", title: "Whose earnings?", md: "Use **sustainable** earnings — strip out one-off gains and losses, and adjust for any change the buyer will make (for example, a director's excess salary that will stop after the sale). Valuing on a distorted profit gives a distorted price." },
      ],
      check: {
        q: "A company earns $2,000,000 after tax and has 5,000,000 shares. A suitable P/E ratio is 8. What is the value per share?",
        options: [
          "$0.40",
          "$3.20",
          "$16.00",
          "$2.50",
        ],
        correct: 1,
        explain: "EPS = $2,000,000 ÷ 5,000,000 = $0.40. Value per share = EPS × P/E = $0.40 × 8 = $3.20. The $0.40 option is the EPS itself (the multiple not applied), and $16.00 wrongly multiplies EPS by 40 rather than by the P/E of 8.",
      },
    },
    {
      id: "cash-flow",
      heading: "Cash-flow-based valuation — the DVM and free cash flow",
      blocks: [
        { kind: "text", md: "Asset and income methods look at what a company **has** or **earned**. A cash-flow method asks the sharper question: what cash will this company actually **hand back** to its owners in future, and what is that stream worth **today**? This is the theoretically strongest basis, because value is ultimately future cash discounted to the present." },
        { kind: "text", md: "**The dividend valuation model (DVM).** A share is worth the present value of the dividends it will pay for ever. If those dividends grow at a constant rate g, the infinite stream collapses to a single formula. Here D0 is the dividend **just paid**, so the numerator D0(1+g) is next year's dividend, D1; Ke is the shareholders' required return; and g is the constant growth rate." },
        { kind: "formula", name: "Dividend valuation model (with growth)", expr: "P0 = D0(1 + g) ÷ (Ke − g)", note: "P0 is the ex-dividend share price now. The model needs Ke > g, or it breaks down. D0(1+g) is next year's dividend, D1." },
        { kind: "formula", name: "Estimating growth — Gordon's model", expr: "g = r × b", note: "g = the return on reinvested funds (r) × the proportion of earnings retained (b). If a firm reinvests 40% of profit at a 10% return, g = 0.10 × 0.40 = 0.04 = 4%." },
        { kind: "example", title: "Worked example — a DVM valuation", scenario: "Sigma Co has just paid a dividend of $0.24 per share. It retains 40% of earnings and reinvests them at a return of 10%. Shareholders require a return of 10% (Ke = 10%). Value one share.", steps: [
          { label: "Estimate growth", detail: "g = r × b = 0.10 × 0.40 = 0.04, i.e. **4%** per year." },
          { label: "Next year's dividend", detail: "D1 = D0(1 + g) = $0.24 × 1.04 = **$0.2496**." },
          { label: "Apply the model", detail: "P0 = D1 ÷ (Ke − g) = $0.2496 ÷ (0.10 − 0.04) = $0.2496 ÷ 0.06." },
          { label: "Share price", detail: "$0.2496 ÷ 0.06 = **$4.16** per share." },
        ], result: "Each share is worth $4.16 under the DVM. Note the sensitivity: the denominator (Ke − g) is only 0.06, so a 1% change in either Ke or g moves the value sharply — always sanity-check the assumptions." },
        { kind: "text", md: "**Free cash flow (FCF) valuation.** Dividends can be an unreliable guide — some firms pay none yet are hugely valuable. FCF valuation instead discounts the **cash the business generates that is free to be returned** to investors (operating cash flows, after tax and after the reinvestment needed to keep going). Discounting the whole firm's free cash flows at the WACC gives the **enterprise value**; subtract debt to reach the **equity value**. Where FCF grows at a constant rate, the same growing-perpetuity shape as the DVM applies." },
        { kind: "formula", name: "Free cash flow value (constant growth)", expr: "Value = FCF1 ÷ (WACC − g)", note: "Discount free cash flow to the firm at the WACC for enterprise value, then deduct the market value of debt to get equity. Discount free cash flow to equity at Ke to value equity directly." },
        { kind: "text", md: "Different methods deliberately give different answers. Below, the **same** Delta Co is valued three ways — the net-asset floor, the dividend model, and the P/E multiple — and the spread between them is exactly the negotiating range." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Same company, three methods, three answers",
          caption: "Delta Co: NAV = assets $30m − liabilities $8m = $22m; DVM = $4.16 × 8m ≈ $33m; P/E = $4m × 9 = $36m.",
          data: {
            unit: "$m",
            items: [
              { label: "Net asset value", value: 22 },
              { label: "Dividend model", value: 33 },
              { label: "P/E basis", value: 36 },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Read the spread as a **map, not a contradiction**. NAV is the floor a seller will not go below; the income and cash-flow figures capture going-concern earning power. The deal usually settles between the asset floor and the earnings-based ceiling." },
      ],
      check: {
        q: "A share has just paid a dividend of $0.50. Dividends grow at 5% and shareholders require 12%. Using the DVM, the share is worth:",
        options: [
          "$7.14",
          "$7.50",
          "$10.00",
          "$4.17",
        ],
        correct: 1,
        explain: "P0 = D0(1+g) ÷ (Ke − g) = $0.50 × 1.05 ÷ (0.12 − 0.05) = $0.525 ÷ 0.07 = $7.50. Grow the dividend to D1 = $0.525 first, then divide by (Ke − g) = 0.07. The $7.14 distractor forgets growth in the numerator ($0.50 ÷ 0.07); $10.00 divides by g instead of (Ke − g); both skip a step of the model.",
      },
    },
    {
      id: "emh",
      heading: "The efficient market hypothesis",
      blocks: [
        { kind: "text", md: "Every income and cash-flow valuation ultimately trusts that **prices reflect information**. The efficient market hypothesis (EMH) makes that trust precise. A market is **efficient** when share prices fully and quickly reflect the information available — so prices are \"fair\" and you cannot systematically beat the market. The EMH comes in three strengths, defined by **how much** information is already in the price." },
        { kind: "table", caption: "The three forms of market efficiency", head: ["Form", "Prices reflect …", "Implication"], rows: [
          ["Weak form", "All past price and volume data", "Studying past price charts (technical analysis) cannot beat the market"],
          ["Semi-strong form", "All publicly available information", "Reacting to published news/accounts cannot beat the market — the price already moved"],
          ["Strong form", "All information, public and private", "Even insiders cannot consistently beat the market"],
        ] },
        { kind: "text", md: "The forms are **nested**: strong includes semi-strong, which includes weak. Most evidence supports markets being **weak** and broadly **semi-strong** efficient, but **not** strong-form efficient — which is precisely why insider dealing is illegal and can be profitable. For a finance manager the practical lesson of semi-strong efficiency is powerful: since the market sees through cosmetic accounting choices and reacts instantly to genuine news, the way to raise the share price is to make **real** decisions that increase future cash flows, not to massage the reported numbers." },
        { kind: "callout", tone: "rule", title: "Efficiency does not mean perfect", md: "An efficient price is an **unbiased** estimate of value given today's information — not a guarantee it is \"right\". New information constantly arrives and prices move; efficiency only claims prices respond **quickly and without bias**, so you cannot systematically exploit them." },
      ],
      check: {
        q: "Under which form of the EMH would studying a company's published annual report give you NO trading advantage?",
        options: [
          "Weak form only",
          "Semi-strong form (and strong form)",
          "Strong form only",
          "No form — published data always gives an edge",
        ],
        correct: 1,
        explain: "Published accounts are publicly available information. Semi-strong efficiency means all public information is already in the price, so acting on the annual report gives no edge. Strong form includes semi-strong, so it holds there too. Weak form only impounds past price data, so public reports could still help under weak form alone.",
      },
    },
    {
      id: "fx-risk",
      heading: "Foreign-exchange risk and how to hedge it",
      blocks: [
        { kind: "text", md: "A business that trades, borrows or invests across currencies is exposed to exchange-rate movements. That exposure comes in three distinct flavours — and mixing them up is a classic exam slip." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Three types of currency exposure",
          caption: "Only transaction exposure produces a cash flow you can hedge with a forward or money-market deal.",
          data: {
            items: [
              { title: "Transaction exposure", sub: "a known future cash flow in foreign currency — an invoice to pay/receive; short-term and hedgeable" },
              { title: "Translation exposure", sub: "an accounting effect: restating overseas assets/results into the home currency; no cash flow" },
              { title: "Economic exposure", sub: "the long-run effect of rate moves on competitiveness and the value of the business; hardest to hedge" },
            ],
          },
        } },
        { kind: "text", md: "**Hedging transaction exposure.** The two workhorse hedges are the **forward contract** and the **money-market hedge**. A forward contract simply fixes today the rate at which you will exchange currency on a future date — clean and simple. A money-market hedge reaches the same fixed outcome by **borrowing and depositing** so that the exposure is cancelled now." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Forward contract vs money-market hedge",
          caption: "Two routes to the same fixed outcome — one a single deal, one a pair of money-market transactions.",
          data: {
            leftTitle: "Forward contract",
            rightTitle: "Money-market hedge",
            rows: [
              { aspect: "How it works", left: "Fix the future exchange rate in one deal", right: "Borrow one currency, convert at spot, deposit the other" },
              { aspect: "Rate used", left: "Quoted forward rate", right: "Today's spot rate + the two interest rates" },
              { aspect: "Cash now", left: "None — settles at maturity", right: "Yes — borrowing and depositing happen today" },
              { aspect: "Best when", left: "A forward is quoted and simplest", right: "No forward available, or interest rates make it cheaper" },
            ],
          },
        } },
        { kind: "text", md: "The steps below show a money-market hedge for a **payment**." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Money-market hedge for a $1,500,000 payment due in 3 months",
          caption: "Deposit dollars now so they grow to exactly what you owe; fund that deposit with a home-currency loan.",
          data: {
            steps: [
              { label: "Owe $1.5m in 3 months", sub: "USD payable — exposed to a rising dollar" },
              { label: "Deposit USD now", sub: "$1,485,148.51 at 1% for 3m grows to $1.5m" },
              { label: "Buy the USD at spot", sub: "cost £1,188,118.81 at $1.2500/£" },
              { label: "Borrow the £ now", sub: "£1,188,118.81 at 1.5% for 3m" },
              { label: "Repay £ at maturity", sub: "£1,205,940.59 — cost locked in today" },
            ],
          },
        } },
        { kind: "formula", name: "Money-market hedge (a foreign-currency payment)", expr: "Deposit foreign currency now  →  buy it at spot with borrowed home currency  →  repay the home loan + interest", note: "Deposit the currency you must PAY; borrow the currency you HAVE. For a receipt, reverse it: borrow the foreign currency now, convert at spot, deposit the home currency." },
        { kind: "example", title: "Worked example — forward contract vs money-market hedge", scenario: "A UK company must pay a US supplier $1,500,000 in 3 months. Spot rate is $1.2500/£. The 3-month forward rate is $1.2400/£. The US dollar deposit rate is 4% a year (1% per 3 months); the UK borrowing rate is 6% a year (1.5% per 3 months). Which hedge is cheaper?", steps: [
          { label: "Forward hedge cost", detail: "Buy $ forward at $1.2400/£: cost = $1,500,000 ÷ 1.2400 = **£1,209,677.42**." },
          { label: "Money market — dollars needed to deposit", detail: "To have $1,500,000 in 3 months, deposit $1,500,000 ÷ 1.01 = **$1,485,148.51** now." },
          { label: "Money market — buy those dollars at spot", detail: "£ cost now = $1,485,148.51 ÷ 1.2500 = **£1,188,118.81** (borrowed)." },
          { label: "Money market — repay the sterling loan", detail: "Repay £1,188,118.81 × 1.015 = **£1,205,940.59** in 3 months." },
          { label: "Compare", detail: "Money market £1,205,940.59 vs forward £1,209,677.42 → the **money-market hedge is cheaper** by £1,209,677.42 − £1,205,940.59 = **£3,736.83**." },
        ], result: "Choose the money-market hedge: it locks in a cost of £1,205,940.59, saving £3,736.83 versus the forward. In practice the two hedges give very close results, because forward rates are set by the same interest-rate differential the money-market hedge exploits." },
        { kind: "text", md: "Other hedging tools worth naming: **currency futures** (standardised, exchange-traded forwards); **currency options** (the right, not the obligation, to exchange at a set rate — you pay a premium but keep the upside); and **netting** (offsetting group receipts and payments in the same currency so only the net amount is exposed). Leading and lagging — speeding up or delaying settlement — also shifts exposure." },
        { kind: "text", md: "**Forecasting future rates.** Two parity relationships let you predict where a rate should move. **Purchasing power parity (PPP)** says the currency of the higher-inflation country weakens; **interest-rate parity (IRP)** links the forward rate to the interest-rate differential. In both, quote the rate as units of the variable currency per one unit of the base, and put the variable currency's rate on top." },
        { kind: "formula", name: "Purchasing power parity — forecast spot rate", expr: "Forecast rate = Spot × (1 + inflation_variable) ÷ (1 + inflation_base)", note: "Example: spot $1.2500/£, US inflation 3%, UK inflation 5% → 1.2500 × 1.03 ÷ 1.05 = $1.2262/£. The higher-inflation £ weakens (fewer $ per £)." },
        { kind: "formula", name: "Interest-rate parity — forward rate", expr: "Forward rate = Spot × (1 + interest_variable) ÷ (1 + interest_base)", note: "Example: spot $1.2500/£, US interest 4%, UK interest 6% → 1.2500 × 1.04 ÷ 1.06 = $1.2264/£. The higher-interest £ trades at a forward discount." },
        { kind: "callout", tone: "warn", title: "Get the fraction the right way up", md: "The currency with the **higher** inflation (PPP) or **higher** interest rate (IRP) should end up **weaker**. If your forecast makes it stronger, you have inverted the ratio — check which currency is the base." },
      ],
      check: {
        q: "The spot rate is $1.5000/£. US inflation is 2%, UK inflation is 6%. Using PPP, the forecast rate (US$ per £) in one year is:",
        options: [
          "$1.5600/£",
          "$1.4434/£",
          "$1.5000/£",
          "$1.5900/£",
        ],
        correct: 1,
        explain: "Forecast = Spot × (1 + US inflation) ÷ (1 + UK inflation) = 1.5000 × 1.02 ÷ 1.06 = 1.5300 ÷ 1.06 = $1.4434/£. The higher-inflation pound weakens, so you get FEWER dollars per pound — $1.4434, below $1.5000. The $1.5600 option inverts the ratio and makes the high-inflation currency strengthen, which is the classic error.",
      },
    },
    {
      id: "interest-risk",
      heading: "Interest-rate risk and how to hedge it",
      blocks: [
        { kind: "text", md: "Interest-rate risk is the mirror image of currency risk. A company with **floating-rate borrowing** is hurt if rates **rise**; one about to **deposit** cash, or lock in future borrowing, is hurt if rates **fall**. The exposure is the uncertainty of a future interest cash flow, and the same instinct applies: fix it now, or buy protection against an adverse move." },
        { kind: "text", md: "There is also a **gap** dimension — a mismatch between the maturities (or the rate-reset dates) of a firm's assets and liabilities. If liabilities reprice sooner than assets, rising rates squeeze the firm. Managing that mismatch is the strategic side; the instruments below are the tactical side." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The interest-rate hedging toolkit",
          caption: "From simplest bilateral deal to longest-dated swap — conceptual, not examined to the last penny here.",
          data: {
            items: [
              { title: "Forward rate agreement (FRA)", sub: "an over-the-counter deal fixing the interest rate on a notional loan/deposit for a set future period; cash-settled against the actual rate" },
              { title: "Interest-rate futures", sub: "standardised, exchange-traded contracts on future interest rates; used to lock a rate, then closed out" },
              { title: "Interest-rate options / caps", sub: "the right (not obligation) to borrow/deposit at a set rate; pay a premium, keep the favourable outcome" },
              { title: "Interest-rate swaps", sub: "two parties exchange fixed-rate for floating-rate interest streams, often to lower cost or match cash flows" },
            ],
          },
        } },
        { kind: "text", md: "**How to choose.** An **FRA** is simple and fixes the rate exactly, but is a bilateral agreement you cannot walk away from. **Futures** are liquid and flexible but standardised, so the hedge rarely matches the exposure to the penny (basis risk). **Options** cost a premium but let you benefit if rates move your way — protection with upside. **Swaps** suit **long-term** restructuring of a firm's whole interest profile, for example turning floating-rate debt into fixed to gain certainty over many years." },
        { kind: "callout", tone: "key", title: "The unifying idea", md: "Whether the risk is a currency or an interest rate, the toolkit rhymes: a **forward-type** deal (forward, FRA, future) **fixes** the rate and removes both risk and upside; an **option** **caps** the downside while keeping the upside, for a premium; and structural tools (**netting**, **swaps**) reshape the exposure at the portfolio level." },
      ],
    },
  ],
  examTraps: [
    { trap: "Applying a listed company's P/E straight to an unlisted target.", fix: "Discount the comparator P/E (commonly 25–33%) for the extra risk and poor marketability of unlisted shares before multiplying." },
    { trap: "Forgetting to grow the dividend in the DVM numerator.", fix: "Use D0(1+g), i.e. next year's dividend D1, on top — not the dividend just paid. And the model only works while Ke > g." },
    { trap: "Calling translation or economic exposure something you can hedge with a forward.", fix: "Only transaction exposure is a known future cash flow. Translation is an accounting restatement; economic exposure is long-run competitiveness." },
    { trap: "Inverting the PPP or IRP ratio so the wrong currency weakens.", fix: "The higher-inflation (PPP) or higher-interest (IRP) currency must end up WEAKER. Put the variable currency's rate on top and sanity-check the direction." },
    { trap: "Depositing the wrong currency in a money-market hedge.", fix: "For a PAYMENT, deposit the currency you must pay (so it grows to the amount owed) and borrow your home currency. For a RECEIPT, do the reverse." },
  ],
  keyTerms: [
    { term: "Net asset value (NAV)", def: "Equity valued as total assets less total liabilities, typically on a realisable basis; acts as a valuation floor and ignores goodwill." },
    { term: "P/E ratio", def: "Price ÷ earnings per share — the multiple the market pays per pound of earnings; used to value a target by applying a comparable company's multiple." },
    { term: "Dividend valuation model", def: "Values a share as the present value of growing dividends: P0 = D0(1+g) ÷ (Ke − g), valid while Ke > g." },
    { term: "Efficient market hypothesis", def: "The idea that share prices quickly and without bias reflect available information; weak (past prices), semi-strong (public info) and strong (all info) forms." },
    { term: "Transaction exposure", def: "The risk that the home-currency value of a known future foreign-currency cash flow changes before settlement; hedgeable with forwards or money-market deals." },
    { term: "Interest-rate parity", def: "The relationship setting the forward exchange rate from the interest-rate differential: Forward = Spot × (1 + int_variable) ÷ (1 + int_base)." },
  ],
  summary: [
    "Value equity three ways — asset-based (NAV floor), income-based (P/E: value = earnings × multiple, or earnings yield) and cash-flow-based (DVM and free cash flow) — and read the spread as a negotiating range.",
    "DVM: P0 = D0(1+g) ÷ (Ke − g); grow the dividend to D1 first and keep Ke > g. Free cash flow discounts the cash returnable to investors, the strongest basis in theory.",
    "The EMH has weak, semi-strong and strong forms; markets are broadly semi-strong efficient, so real cash-generating decisions raise the share price, not cosmetic accounting.",
    "Currency exposure is transaction (hedgeable cash flow), translation (accounting) or economic (long-run competitiveness); hedge transactions with forwards, money-market hedges, futures, options and netting.",
    "Forecast rates with PPP (Spot × (1+infl_v) ÷ (1+infl_b)) and IRP (Spot × (1+int_v) ÷ (1+int_b)); manage interest-rate risk with FRAs, futures, options and swaps — forwards fix, options cap, swaps restructure.",
  ],
}
