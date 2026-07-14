import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area C — Acquisitions & mergers.
 * Strategic, computational chapter: why firms combine, how a target is valued
 * (asset / market / cash-flow based), how the gain is measured and split, how
 * the deal is financed, and how takeovers are regulated, defended and integrated.
 * Original, syllabus-aligned; no ACCA/Kaplan/BPP text. Every figure re-solved.
 */

export const AFM_C: StudyChapter = {
  paper: "AFM",
  area: "C",
  title: "Acquisitions & mergers",
  minutes: 18,
  intro: "A takeover is one number pretending to be simple: the price. Behind it sit three valuation models, a pool of synergy, and a negotiation over who keeps the gain. Learn to build that number and you own this area.",
  outcomes: [
    "Explain the strategic reasons for a merger and define the synergy it aims to create",
    "Value a target on an asset, market (P/E and earnings yield) and cash-flow (DVM, FCFE) basis",
    "Measure the gain from a merger and split it between acquirer and target shareholders",
    "Compare cash, share-exchange and earn-out consideration and their effect on gearing, control and EPS",
    "Describe the regulation of takeovers, common bid tactics and defences, and post-merger integration",
  ],
  sections: [
    {
      id: "why",
      heading: "Why firms combine — and where the value comes from",
      blocks: [
        { kind: "text", md: "Two companies are worth more together than apart, or the deal makes no sense. That extra value is **synergy** — the reason a buyer will pay more for a target than the target is worth on its own. Everything else in this area is machinery for measuring that idea and arguing over who keeps it." },
        { kind: "text", md: "Synergy has three familiar sources. **Revenue synergy** — cross-selling, a wider distribution network, more pricing power. **Cost synergy** — shared premises, one head office instead of two, buying in bulk (economies of scale). **Financial synergy** — a stronger combined balance sheet that borrows more cheaply, or a target's tax losses the buyer can use. Growing by acquisition can also be simply **faster** than growing organically, and can remove a competitor." },
        { kind: "callout", tone: "key", title: "The one idea", md: "A merger only creates value if the **combined** business is worth more than the two standalone businesses added together. That difference is **synergy** — and it is the entire economic case for the deal." },
        { kind: "formula", name: "Synergy from a merger", expr: "Synergy = Combined value − ( Value of A + Value of B )", note: "A = acquirer standalone, B = target standalone. If this is zero or negative, the deal destroys value." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Where the synergy sits",
          caption: "Start from the combined value, strip out each firm standalone — what remains is the synergy the deal must justify.",
          data: {
            unit: "$m",
            items: [
              { label: "Combined value", value: 820, kind: "start" },
              { label: "− A standalone", value: -600, kind: "delta" },
              { label: "− B standalone", value: -150, kind: "delta" },
              { label: "Synergy", value: 70, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "Here the merged firm is worth **$820m**; the two firms standalone are worth **$600m + $150m = $750m**. The synergy is **$820m − $750m = $70m**. That $70m is the pie the acquirer and the target's shareholders are about to fight over — and the price decides how it is sliced. Keep this $70m in mind: it runs through the whole chapter." },
      ],
    },
    {
      id: "methods",
      heading: "Three ways to value a target",
      blocks: [
        { kind: "text", md: "There is no single \"correct\" value for a business — there is a **range**, and each method lights up a different corner of it. Examiners expect you to compute two or three and then comment on why they differ. The three families are **asset-based**, **market-based** and **cash-flow-based**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The valuation families at a glance",
          caption: "Asset methods value what the firm owns; market and cash-flow methods value what it earns.",
          data: {
            leftTitle: "Asset-based",
            rightTitle: "Earnings & cash-flow based",
            rows: [
              { aspect: "Answers", left: "What are the net assets worth?", right: "What future returns will it produce?" },
              { aspect: "Typical measure", left: "Net realisable value of net assets", right: "P/E, earnings yield, DVM, FCFE" },
              { aspect: "Best for", left: "Asset-heavy or break-up situations", right: "Going concerns valued as trading businesses" },
              { aspect: "Blind spot", left: "Ignores goodwill and future growth", right: "Sensitive to growth and discount-rate guesses" },
              { aspect: "Usual role", left: "A floor value", right: "The negotiating range" },
            ],
          },
        } },
        { kind: "text", md: "**Asset-based (net realisable value).** Take the assets, restate them at what they would actually fetch — **net realisable value**, not historic book cost — and deduct the liabilities. For **Target Co** the assets realise **$95m** and liabilities are **$37m**, so the net asset value is **$95m − $37m = $58m**. Book value of net assets is only **$45m**; the uplift to $58m reflects property worth more than its depreciated cost. Asset value usually sets a **floor** — a buyer will rarely pay less than the firm could be broken up for — but it ignores the goodwill and future profits a trading business carries." },
        { kind: "text", md: "**Market-based (P/E ratio).** The workhorse. Multiply the target's sustainable earnings by an appropriate **price/earnings ratio**. The P/E comes from a comparable listed company, but an unquoted target is less marketable and riskier, so the quoted multiple is **discounted**, typically by 25–33%." },
        { kind: "formula", name: "P/E (price-earnings) valuation", expr: "Equity value = Earnings after tax × P/E ratio", note: "Use sustainable, post-acquisition earnings. Discount a quoted P/E before applying it to an unquoted target." },
        { kind: "example", title: "Worked example — a P/E valuation", scenario: "Target Co earns $8m after tax. A listed competitor trades on a P/E of 12. Target Co is unquoted, so a 25% discount to that multiple is judged fair. Value Target Co's equity, and cross-check with the earnings yield.", steps: [
          { label: "Adjust the multiple", detail: "Quoted P/E 12, less a 25% unquoted discount: 12 × (1 − 0.25) = 12 × 0.75 = 9." },
          { label: "Apply to earnings", detail: "Equity value = earnings × P/E = $8m × 9 = $72m." },
          { label: "Earnings-yield cross-check", detail: "Earnings yield = 1 / P/E = 1 / 9 = 11.11%. Value = earnings / yield = $8m / 0.1111 = $72m — the same answer, viewed from the other side." },
        ], result: "Target Co's equity is worth about $72m on a P/E basis — well above the $58m asset floor, because the market pays for future earnings, not just today's assets." },
        { kind: "formula", name: "Earnings yield valuation", expr: "Equity value = Earnings after tax ÷ Earnings yield     ( Earnings yield = 1 ÷ P/E )", note: "The mirror image of the P/E method — same value, expressed as a required return on earnings." },
        { kind: "callout", tone: "tip", md: "P/E and earnings yield are the **same model** flipped over. A P/E of 9 is an earnings yield of 11.11%; a P/E of 20 is a yield of 5%. If a question gives you one, you already have the other." },
      ],
      check: {
        q: "A target earns $8m after tax. After a 25% unquoted discount, a suitable P/E ratio is 9. What is the equity value?",
        options: [
          "$0.89m (earnings ÷ P/E)",
          "$72m (earnings × P/E)",
          "$8m (earnings only)",
          "$17m (earnings + P/E-adjusted)",
        ],
        correct: 1,
        explain: "The P/E method multiplies: equity value = earnings × P/E = $8m × 9 = $72m. Dividing earnings by the P/E gives the earnings yield value only if you divide by the yield (1/9 = 11.11%), not by the P/E itself — $8m ÷ 9 = $0.89m is the classic wrong turn.",
      },
    },
    {
      id: "cashflow",
      heading: "Cash-flow based valuation — DVM and free cash flow",
      blocks: [
        { kind: "text", md: "Cash-flow methods value a business as a stream of future returns discounted to today. Two dominate the AFM exam: the **dividend valuation model (DVM)** for a shareholder valuing a dividend stream, and **free cash flow** for a strategic buyer valuing the whole cash-generating engine." },
        { kind: "formula", name: "Dividend valuation model (with growth)", expr: "P0 = D0 × ( 1 + g ) ÷ ( re − g ) = D1 ÷ ( re − g )", note: "D0 = dividend just paid, g = constant growth, re = cost of equity. Needs re > g or the model breaks." },
        { kind: "example", title: "Worked example — a DVM valuation", scenario: "Target Co has just paid a total dividend of $4m. Dividends are expected to grow at 4% a year in perpetuity. Shareholders require a 12% return. Value the equity, then the price per share if there are 20m shares.", steps: [
          { label: "Grow to next year's dividend", detail: "D1 = D0 × (1 + g) = $4m × 1.04 = $4.16m." },
          { label: "Discount the growing perpetuity", detail: "Equity value = D1 / (re − g) = $4.16m / (0.12 − 0.04) = $4.16m / 0.08 = $52m." },
          { label: "Per share", detail: "$52m / 20m shares = $2.60 per share." },
        ], result: "The DVM values Target Co's equity at $52m ($2.60 a share). It sits below the P/E value of $72m because the DVM only captures what is paid OUT as dividends, not earnings retained and reinvested." },
        { kind: "text", md: "**Free cash flow** goes deeper: it values the actual cash a business throws off after keeping itself running. Two levels matter. **Free cash flow to firm (FCFF)** is the cash available to *all* providers of finance — discount it at the **WACC** to value the whole firm. **Free cash flow to equity (FCFE)** is what is left for *shareholders* after servicing debt — discount it at the **cost of equity** to value the equity directly." },
        { kind: "formula", name: "Free cash flow to firm and to equity", expr: "FCFF = EBIT × (1 − t) + Depreciation − Capex − Δ Working capital\nFCFE = FCFF − Interest × (1 − t) + Net new borrowing", note: "FCFF → discount at WACC (firm value). FCFE → discount at cost of equity (equity value). Never cross the two." },
        { kind: "example", title: "Worked example — FCFE and an equity value", scenario: "Bidder is valuing Meridian, a subsidiary. Operating profit (EBIT) is $30m, tax 20%. Depreciation is $8m, capital expenditure $10m, and working capital rises by $3m. Interest is $5m and net new borrowing is $2m. FCFE is expected to grow 2% forever; the cost of equity is 12%. Value the equity.", steps: [
          { label: "After-tax operating profit", detail: "EBIT × (1 − t) = $30m × (1 − 0.20) = $30m × 0.80 = $24m." },
          { label: "Build FCFF", detail: "FCFF = $24m + $8m depreciation − $10m capex − $3m working capital = $19m. (24 + 8 = 32; 32 − 10 = 22; 22 − 3 = 19.)" },
          { label: "Step down to FCFE", detail: "Less after-tax interest $5m × (1 − 0.20) = $4m; add net new borrowing $2m. FCFE = $19m − $4m + $2m = $17m." },
          { label: "Value as a growing perpetuity", detail: "Equity value = FCFE × (1 + g) / (re − g) = $17m × 1.02 / (0.12 − 0.02) = $17.34m / 0.10 = $173.4m." },
        ], result: "Meridian's equity is worth about $173.4m to the bidder. Note the discipline: FCFE is discounted at the 12% cost of EQUITY — if you had valued FCFF you would have used the WACC instead." },
        { kind: "callout", tone: "warn", title: "Match the cash flow to the rate", md: "The single most punished error here is mixing levels. **FCFF pairs with WACC** and gives firm value (deduct debt to reach equity). **FCFE pairs with the cost of equity** and gives equity value directly. Discounting FCFE at the WACC, or FCFF at the cost of equity, is an instant markdown." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Target Co — four lenses, four numbers",
          caption: "The same target valued four ways. Valuation is a range, not a point — you negotiate inside it.",
          data: {
            unit: "$m",
            items: [
              { label: "Net assets (book)", value: 45 },
              { label: "Net assets (NRV)", value: 58 },
              { label: "Dividend model", value: 52 },
              { label: "P/E basis", value: 72 },
            ],
          },
        } },
        { kind: "text", md: "Look at the spread: **$45m to $72m** for one company. That is normal. The asset numbers ($45m, $58m) anchor the floor; the earnings-based P/E ($72m) marks the top; the DVM ($52m) sits in between. Your job in the exam is to compute the range and then **justify** the number you would actually offer." },
      ],
      check: {
        q: "You have calculated free cash flow to equity (FCFE) for a target. Which discount rate values the equity correctly?",
        options: [
          "The weighted average cost of capital (WACC)",
          "The cost of equity",
          "The pre-tax cost of debt",
          "The risk-free rate",
        ],
        correct: 1,
        explain: "FCFE is the cash left for shareholders after debt has been serviced, so it is discounted at the cost of EQUITY to give equity value directly. WACC is paired with FCFF (free cash flow to the firm), which values the whole firm before deducting debt.",
      },
    },
    {
      id: "gain",
      heading: "The gain from a merger and how it is split",
      blocks: [
        { kind: "text", md: "The synergy is the whole prize. But the **price** decides who keeps it. Pay too much and the acquirer hands the entire gain — and sometimes more — to the target's shareholders. This split is the heart of most AFM merger questions." },
        { kind: "text", md: "Two definitions unlock it. The **premium** is what the target's shareholders receive above their standalone value. The **acquirer's gain** is whatever synergy is left after paying that premium." },
        { kind: "formula", name: "Splitting the gain", expr: "Gain to target shareholders = Price paid − Target standalone value  ( the premium )\nGain to acquirer shareholders = Synergy − Premium", note: "The two gains always sum to the total synergy. If the premium exceeds the synergy, the acquirer's gain is negative — the deal destroys value for the buyer." },
        { kind: "example", title: "Worked example — synergy and the split", scenario: "Acquirer A is worth $600m standalone; Target B is worth $150m standalone; the combined business will be worth $820m. A offers $190m in cash for B. How much synergy does the deal create, and how is it split?", steps: [
          { label: "Total synergy", detail: "Synergy = combined − (A + B) = $820m − ($600m + $150m) = $820m − $750m = $70m." },
          { label: "Gain to B's shareholders (the premium)", detail: "Price − B standalone = $190m − $150m = $40m. B's owners pocket a $40m premium." },
          { label: "Gain to A's shareholders", detail: "Synergy − premium = $70m − $40m = $30m. Check directly: A's shareholders end up owning a firm worth $820m but the firm paid out $190m cash, so their wealth is $820m − $190m = $630m, versus $600m before — a $30m gain." },
          { label: "Reconcile", detail: "$40m to B + $30m to A = $70m = the total synergy. The pie is fully allocated, no more and no less." },
        ], result: "The $70m synergy splits $40m to the target and $30m to the acquirer. Push the price to $220m and A's gain vanishes to zero; above $220m, A destroys its own shareholders' value even though the deal 'creates' synergy." },
        { kind: "callout", tone: "rule", title: "Synergy ≠ premium", md: "**Synergy** is value created by the combination. The **premium** is value transferred to the seller. The acquirer only wins if it captures some synergy — i.e. it pays a premium **smaller** than the synergy it can realise." },
      ],
      check: {
        q: "Combined value is $820m; A is worth $600m and B $150m standalone. A pays $190m cash for B. What is the gain to A's own shareholders?",
        options: [
          "$70m — the whole synergy",
          "$40m — the premium paid",
          "$30m — synergy less the premium",
          "$190m — the price paid",
        ],
        correct: 2,
        explain: "Synergy = 820 − (600 + 150) = $70m. The premium handed to B is 190 − 150 = $40m. A's shareholders keep the rest: 70 − 40 = $30m. Equivalently, A's owners now hold a firm worth 820 that paid out 190 in cash → 630, up from 600, a $30m gain.",
      },
    },
    {
      id: "consideration",
      heading: "Paying for it — cash, shares and the bootstrap trap",
      blocks: [
        { kind: "text", md: "How the buyer pays reshapes the deal. **Cash** is clean and certain for the seller, but usually means new borrowing — raising the acquirer's **gearing** and financial risk. A **share exchange** issues new shares to the target's owners: no cash leaves, but the acquirer's existing shareholders are **diluted** and give up some **control**. An **earn-out** defers part of the price, paying it only if the target hits agreed profit targets — it bridges a disagreement over value and keeps the target's managers motivated after the deal." },
        { kind: "table", caption: "Forms of consideration compared", head: ["Feature", "Cash", "Share exchange", "Earn-out"], rows: [
          ["Effect on gearing", "Rises (usually debt-financed)", "Falls or unchanged", "Deferred — depends on final funding"],
          ["Effect on control", "Unchanged for acquirer", "Diluted — target owners join the register", "Unchanged until earn-out settles"],
          ["Seller's certainty", "High — fixed cash now", "Exposed to acquirer's share price", "Low — contingent on performance"],
          ["Best when", "Buyer has spare debt capacity", "Buyer wants to conserve cash / share risk", "Buyer and seller disagree on value"],
        ] },
        { kind: "text", md: "A share exchange also plays a trick on **earnings per share** that examiners love to test — **bootstrapping**. When a high-P/E company buys a low-P/E company, the combined EPS jumps even if no real value is created, because the buyer swaps its expensive shares for the target's cheaper earnings." },
        { kind: "example", title: "Worked example — a share-exchange effect (bootstrapping)", scenario: "Acquirer A: earnings $50m, 100m shares (EPS $0.50), share price $10, so P/E = 20. Target B: earnings $20m, 40m shares, share price $6, so market value $240m and P/E = 12. A buys B by issuing new shares at A's $10 price to match B's $240m value. Assume no synergy. What happens to A's EPS?", steps: [
          { label: "Shares A must issue", detail: "B's value $240m ÷ A's share price $10 = 24m new shares." },
          { label: "Combined earnings", detail: "$50m + $20m = $70m (no synergy assumed)." },
          { label: "Combined shares", detail: "100m + 24m = 124m shares." },
          { label: "Combined EPS", detail: "$70m / 124m = $0.5645 per share — up from A's old $0.50, a rise of about 13% with zero real value added." },
          { label: "The illusion", detail: "If the market naively held A's P/E at 20, the combined value would look like $70m × 20 = $1,400m, versus the true $1,000m + $240m = $1,240m. That $160m gap is fictional — a rational market blends the P/Es down to about 17.7 and the price stays near $10." },
        ], result: "EPS rose from $0.50 to $0.56 purely from the arithmetic of a high-P/E firm buying a low-P/E firm — bootstrapping. It is an accounting mirage, NOT synergy; a rational market strips it out." },
        { kind: "callout", tone: "warn", title: "Bootstrapping is not value", md: "A rise in EPS after a share-for-share deal can be pure **bootstrapping** — the automatic result of a high-P/E buyer absorbing low-P/E earnings. Real value comes only from **synergy**. Treat unexplained EPS accretion with suspicion." },
      ],
    },
    {
      id: "regulation",
      heading: "Regulation, tactics, defences and integration",
      blocks: [
        { kind: "text", md: "Takeovers of public companies are policed so that **all** shareholders are treated fairly and none is stampeded or short-changed. Two rules anchor the regime. The **mandatory bid** rule: once a buyer's stake crosses **30%** of the voting shares it must make a full cash offer to every remaining shareholder, at the **highest price** it has already paid. The **equal treatment** rule: all shareholders of the same class must receive the same offer and the same information — no side deals for big holders." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The bid process, step by step",
          caption: "From quiet stake-building to compulsory buy-out of the last holdouts.",
          data: {
            steps: [
              { label: "Stake building", sub: "buy shares quietly in the market" },
              { label: "30% threshold", sub: "triggers a mandatory cash offer" },
              { label: "Formal offer", sub: "offer document sent to all shareholders" },
              { label: "Board response", sub: "target directors recommend or reject" },
              { label: ">50% control", sub: "offer becomes unconditional" },
              { label: "90% squeeze-out", sub: "compulsorily buy out the remainder" },
            ],
          },
        } },
        { kind: "text", md: "**Bid tactics (attack).** Build a toehold stake first; time the approach when the target looks cheap; make the offer conditional on a minimum acceptance level (say 50% + 1); and raise the terms once to break resistance. **Defences (target).** A target board can argue the price **undervalues** the business (revalue assets, publish upbeat forecasts), find a friendlier **white knight** bidder, or lobby that the deal harms competition and should be referred to regulators. Pre-emptive **poison pills** and staggered boards exist in some jurisdictions but are constrained where directors owe a duty not to frustrate a fair offer without shareholder approval." },
        { kind: "callout", tone: "key", title: "The deal is won after completion", md: "Most acquisitions that fail do so not on price but on **integration**: clashing cultures, lost key staff, systems that never merge, and synergies that were assumed but never delivered. Value promised at signing is only realised through disciplined post-merger execution." },
        { kind: "text", md: "**Post-merger integration** is where the modelled synergy becomes real money — or evaporates. Priorities: retain the target's key people (they are often *why* you bought it), unify systems and reporting early, communicate relentlessly to calm customers and staff, and **track each synergy** against the plan so slippage is caught. A crisp 100-day plan with named owners beats a vague promise of 'realising synergies over time'." },
      ],
    },
  ],
  examTraps: [
    { trap: "Confusing synergy with the premium.", fix: "Synergy = combined − (A + B) is value CREATED. Premium = price − target standalone is value TRANSFERRED to the seller. The acquirer's gain = synergy − premium." },
    { trap: "Applying a quoted company's P/E to an unquoted target unadjusted, or using pre-tax earnings.", fix: "Discount the quoted P/E by 25–33% for an unquoted target's lower marketability and risk, and always multiply by earnings AFTER tax." },
    { trap: "Discounting free cash flow to equity at the WACC.", fix: "FCFE pairs with the cost of EQUITY (equity value). FCFF pairs with the WACC (firm value, then deduct debt). Never cross them." },
    { trap: "Treating EPS accretion after a share exchange as value creation.", fix: "A high-P/E firm buying a low-P/E firm lifts EPS automatically — bootstrapping. It is arithmetic, not synergy; a rational market removes it." },
    { trap: "Forgetting the mandatory-bid rule.", fix: "Once a buyer crosses 30% of the votes it must offer to buy ALL remaining shares, in cash, at the highest price it has already paid." },
  ],
  keyTerms: [
    { term: "Synergy", def: "The extra value from combining two firms: combined value less the sum of the two standalone values. The economic case for any merger." },
    { term: "Premium", def: "The amount a target's shareholders receive above their standalone value: price paid less target standalone value." },
    { term: "P/E valuation", def: "Equity value = after-tax earnings × an appropriate price/earnings ratio; the quoted multiple is discounted for an unquoted target." },
    { term: "Dividend valuation model", def: "Values equity as a growing perpetuity of dividends: P0 = D0(1 + g) / (re − g), needing the cost of equity above the growth rate." },
    { term: "Free cash flow to equity (FCFE)", def: "Cash left for shareholders after tax, reinvestment and debt servicing; discounted at the cost of equity to value equity directly." },
    { term: "Bootstrapping", def: "The automatic rise in EPS when a high-P/E company acquires a low-P/E company in a share exchange — an accounting effect, not real value." },
  ],
  summary: [
    "A merger creates value only through synergy = combined value − (acquirer + target) standalone; here $820m − $750m = $70m.",
    "Value a target three ways: asset (NRV floor), market (P/E = earnings × multiple; earnings yield is its reciprocal), and cash-flow (DVM, and FCFE discounted at the cost of equity).",
    "The premium (price − target standalone) transfers synergy to the seller; the acquirer keeps synergy − premium, and destroys value once the premium exceeds the synergy.",
    "Cash lifts gearing; a share exchange dilutes control and can bootstrap EPS without creating value; an earn-out defers price against future performance.",
    "Takeovers are regulated for fair, equal treatment — a 30% stake forces a mandatory full offer — and the promised synergy is only realised through disciplined post-merger integration.",
  ],
}
