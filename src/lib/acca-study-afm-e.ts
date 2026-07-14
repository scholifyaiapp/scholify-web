import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area E — Treasury & advanced risk management.
 * Strategic, heavily computational: the treasury function, hedging interest-rate
 * risk (FRAs, futures, options/collars, swaps), hedging currency risk (forwards,
 * money-market hedge, futures, options, swaps), value at risk and the Greeks.
 * Original, syllabus-aligned; every calculation re-solved from first principles.
 */

export const AFM_E: StudyChapter = {
  paper: "AFM",
  area: "E",
  title: "Treasury & advanced risk management",
  minutes: 19,
  intro: "A rate moves a quarter-point, a currency slips two cents — and a thin margin becomes a loss. Treasury exists to take that gamble off the table. This is where you learn to price the hedge, not just name it.",
  outcomes: [
    "Explain the role and structure of the treasury function and centralised cash management",
    "Hedge interest-rate risk with forward rate agreements, futures (contracts, ticks, basis, net outcome), options, collars and swaps",
    "Compute the gain from an interest-rate swap using comparative advantage",
    "Hedge currency risk with forward contracts, the money-market hedge, futures, options and currency swaps",
    "Calculate and scale value at risk by the square root of time, and explain delta hedging and the Greeks",
  ],
  sections: [
    {
      id: "treasury",
      heading: "The treasury function",
      blocks: [
        { kind: "text", md: "Every business holds cash, borrows, invests surpluses and — if it trades abroad — deals in currency. Left to each department these decisions clash: one subsidiary borrows at 7% while another lets a surplus sit at 1%. The **treasury function** centralises them, so the group manages one net position rather than dozens of ragged ones." },
        { kind: "text", md: "Treasury has four core jobs: **liquidity management** (making sure cash is where it is needed, when it is needed), **funding** (raising debt and equity at the lowest sustainable cost), **currency and interest-rate risk management** (the hedging this chapter is about), and **relationship management** with banks and rating agencies. A large group may run treasury as a **cost centre** (a service that simply hedges) or a **profit centre** (permitted to take positions and trade for gain) — the latter is far riskier and needs tight controls." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The treasury toolkit — what treasury actually does",
          caption: "Centralising these four roles is what turns scattered exposures into one managed net position.",
          data: {
            items: [
              { title: "Liquidity management", sub: "Cash forecasting, netting, pooling; short-term surpluses and shortfalls" },
              { title: "Funding & capital", sub: "Debt vs equity, maturity, the choice of instruments" },
              { title: "Risk management", sub: "Hedging interest-rate and currency exposure with derivatives" },
              { title: "Banking relationships", sub: "Bank facilities, covenants, credit ratings" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Centralisation", md: "A centralised treasury nets group exposures before hedging, borrows and invests in bulk on better terms, and concentrates scarce expertise. The trade-off is that subsidiaries lose autonomy and a single error is felt group-wide." },
      ],
      check: {
        q: "A group runs its treasury as a PROFIT centre. What is the key implication?",
        options: [
          "Treasury may only hedge existing exposures and never take a position",
          "Treasury is permitted to trade and take positions to generate gains, raising its risk profile",
          "Treasury must be located in the lowest-tax jurisdiction",
          "Each subsidiary manages its own cash independently",
        ],
        correct: 1,
        explain: "A profit centre is allowed to take positions and trade for gain, not merely offset existing risk. That makes returns possible but adds speculative risk, so it demands strong limits and oversight. A cost centre, by contrast, only hedges.",
      },
    },
    {
      id: "ir-fra-futures",
      heading: "Interest-rate risk — FRAs and futures",
      blocks: [
        { kind: "text", md: "A borrower fears rates **rising**; a depositor fears rates **falling**. The simplest tool is a **forward rate agreement (FRA)**: an over-the-counter contract that fixes an interest rate on a notional amount for a future period. An FRA quoted **3 v 9** starts in 3 months and covers the 6 months from month 3 to month 9. At settlement, the difference between the fixed FRA rate and the actual benchmark rate is paid across in cash — the FRA and the real loan together lock the rate." },
        { kind: "formula", name: "FRA settlement", expr: "Settlement = Notional × (Benchmark rate − FRA rate) × (period ÷ 12)", note: "Positive to the borrower when rates rise above the FRA rate; negative when they fall below it." },
        { kind: "example", title: "Worked example — an FRA locks the rate", scenario: "Orion Co will borrow $6,000,000 in 3 months for a 6-month period. It buys a 3 v 9 FRA at 5.0%. Show the outcome if the benchmark rate at settlement is (a) 6.5% and (b) 4.0%.", steps: [
          { label: "(a) Rate rises to 6.5%", detail: "FRA settlement to Orion = $6,000,000 × (6.5% − 5.0%) × 6/12 = 6,000,000 × 0.015 × 0.5 = $45,000 received." },
          { label: "(a) Net interest", detail: "Actual loan interest = 6,000,000 × 6.5% × 0.5 = $195,000. Less FRA receipt $45,000 = $150,000 net." },
          { label: "(b) Rate falls to 4.0%", detail: "FRA settlement = 6,000,000 × (4.0% − 5.0%) × 0.5 = −$30,000, i.e. Orion pays $30,000." },
          { label: "(b) Net interest", detail: "Actual loan interest = 6,000,000 × 4.0% × 0.5 = $120,000. Plus FRA payment $30,000 = $150,000 net." },
        ], result: "Either way net cost = $150,000 = 6,000,000 × 5.0% × 6/12. The FRA fixes 5.0% regardless of where the market goes — that is the point of a hedge." },
        { kind: "text", md: "**Interest-rate futures** do the same job on an exchange. Each contract is a standardised deposit — commonly a **3-month $1,000,000** contract — priced as **100 minus the interest rate** (so a 5% rate is a price of 95.00). Because a borrower loses when rates rise and a rising rate makes the price **fall**, the borrower **sells** futures now and buys them back later; the gain on the closed futures offsets the extra loan interest." },
        { kind: "formula", name: "Number of futures contracts", expr: "Contracts = (Exposure ÷ Contract size) × (Loan period ÷ Contract period)", note: "Round to a whole number. The second factor scales for a loan longer than the 3-month contract." },
        { kind: "formula", name: "Tick value", expr: "Tick value = Contract size × Tick size × (Contract period ÷ 12)", note: "One tick = 0.01% (one basis point). For a 3-month $1m contract: 1,000,000 × 0.0001 × 3/12 = $25." },
        { kind: "formula", name: "Futures gain or loss", expr: "Gain = Ticks moved × Tick value × Number of contracts", note: "Ticks moved = |opening price − closing price| ÷ 0.01." },
        { kind: "callout", tone: "rule", title: "Basis", md: "**Basis** is the gap between the current cash (spot) rate and the futures-implied rate. It shrinks to **zero at expiry** and is assumed to fall in a straight line before then. If you close a hedge before expiry, unexpired basis is what stops the hedge being perfect — this is **basis risk**." },
        { kind: "example", title: "Worked example — an interest-rate futures hedge", scenario: "Delphi Co will borrow $6,000,000 in 3 months for 6 months and fears a rate rise. Current LIBOR is 5.0%. It uses 3-month $1,000,000 futures priced at 100 − rate, currently 95.00, closing at expiry so basis is zero. LIBOR then rises to 6.5%.", steps: [
          { label: "Contracts", detail: "(6,000,000 ÷ 1,000,000) × (6 ÷ 3) = 6 × 2 = 12 contracts." },
          { label: "Direction", detail: "Borrower fearing a rise → SELL 12 contracts now at 95.00." },
          { label: "Close out", detail: "LIBOR 6.5% → futures price 100 − 6.5 = 93.50. Buy back 12 at 93.50." },
          { label: "Ticks moved", detail: "95.00 − 93.50 = 1.50 = 150 ticks (1.50 ÷ 0.01)." },
          { label: "Tick value", detail: "1,000,000 × 0.0001 × 3/12 = $25 per tick." },
          { label: "Futures gain", detail: "150 ticks × $25 × 12 contracts = $45,000 gain." },
          { label: "Extra loan interest", detail: "6,000,000 × (6.5% − 5.0%) × 6/12 = 6,000,000 × 0.015 × 0.5 = $45,000." },
        ], result: "Net interest = actual $195,000 (6,000,000 × 6.5% × 0.5) − futures gain $45,000 = $150,000, i.e. an effective 5.0%. The $45,000 futures gain exactly offsets the $45,000 of extra interest." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "The interest-rate futures hedge, step by step",
          caption: "Borrower's hedge: sell now, buy back later; the futures gain cancels the higher loan cost.",
          data: {
            steps: [
              { label: "Size the hedge", sub: "12 contracts; tick value $25" },
              { label: "Sell futures now", sub: "12 @ 95.00" },
              { label: "Rates rise to 6.5%", sub: "price falls to 93.50" },
              { label: "Buy back to close", sub: "150 ticks gain = $45,000" },
              { label: "Net cost locked", sub: "$150,000 ≈ 5.0%" },
            ],
          },
        } },
      ],
      check: {
        q: "A company will borrow $8,000,000 in 4 months for 3 months, hedging with 3-month $1,000,000 futures. How many contracts, and does it buy or sell?",
        options: [
          "8 contracts, buy",
          "8 contracts, sell",
          "24 contracts, sell",
          "6 contracts, sell",
        ],
        correct: 1,
        explain: "Contracts = (8,000,000 ÷ 1,000,000) × (3 ÷ 3) = 8 × 1 = 8. The loan period equals the contract period, so no extra scaling. As a borrower fearing a rise, it SELLS now to gain when prices fall.",
      },
    },
    {
      id: "ir-options-swaps",
      heading: "Interest-rate options, collars and swaps",
      blocks: [
        { kind: "text", md: "Futures and FRAs lock a rate both ways — you gain no benefit if rates move in your favour. **Interest-rate options** (or options on futures) give the **right, not the obligation** to deal at a set rate for a premium. A borrower buys the right to a maximum rate (a cap): if rates rise, exercise; if they fall, let it lapse and enjoy the lower rate. The cost is the up-front premium." },
        { kind: "text", md: "A **collar** cuts that premium. The borrower **buys a cap** and simultaneously **sells a floor** (the right for the counterparty to a minimum rate). The premium received on the floor offsets the premium paid on the cap, so the net cost is lower — but the borrower gives up the benefit of rates falling below the floor. The effective rate is trapped in a band between the cap and the floor." },
        { kind: "text", md: "An **interest-rate swap** exchanges one interest stream for another — classically **fixed for floating** — on a notional principal, for years rather than months. It restructures the character of existing debt cheaply. The exam favourite is the **comparative-advantage** swap: two firms borrow where each is relatively strongest, then swap, and share the saving." },
        { kind: "formula", name: "Comparative-advantage swap gain", expr: "Total gain = (fixed-rate difference) − (floating-rate difference)", note: "The gain to share equals the difference in the two credit spreads; split it (often equally) after any bank fee." },
        { kind: "example", title: "Worked example — the swap gain", scenario: "Company A wants floating debt; Company B wants fixed. A can borrow fixed at 4.0% or floating at LIBOR + 0.3%. B can borrow fixed at 5.8% or floating at LIBOR + 0.9%. There is no bank fee and the gain is split equally.", steps: [
          { label: "Fixed-rate difference", detail: "B − A on fixed = 5.8% − 4.0% = 1.8%." },
          { label: "Floating-rate difference", detail: "B − A on floating = (LIBOR + 0.9%) − (LIBOR + 0.3%) = 0.6%." },
          { label: "Total gain", detail: "1.8% − 0.6% = 1.2% to share; equal split = 0.6% each." },
          { label: "Borrow to strength", detail: "A borrows fixed at 4.0% (its biggest edge); B borrows floating at LIBOR + 0.9%." },
          { label: "Swap the streams", detail: "B pays A fixed 4.3%; A pays B LIBOR. A net = 4.0% + LIBOR − 4.3% = LIBOR − 0.3%. B net = (LIBOR + 0.9%) + 4.3% − LIBOR = 5.2%." },
        ], result: "A wanted floating and gets LIBOR − 0.3% (vs LIBOR + 0.3% alone) — a 0.6% saving. B wanted fixed and gets 5.2% (vs 5.8% alone) — a 0.6% saving. Together they capture the full 1.2%." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "FRA vs interest-rate swap",
          data: {
            leftTitle: "Forward rate agreement",
            rightTitle: "Interest-rate swap",
            rows: [
              { aspect: "Horizon", left: "Short — a single future period", right: "Long — several years" },
              { aspect: "Market", left: "Over the counter", right: "Over the counter" },
              { aspect: "What it fixes", left: "One period's rate on a notional", right: "The character of a debt (fixed ↔ floating)" },
              { aspect: "Cash flow", left: "One net settlement", right: "Periodic net exchanges" },
              { aspect: "Typical use", left: "Bridge a known short exposure", right: "Restructure existing debt cheaply" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", md: "Spot the tool from the question. **\"Right but not obligation\", \"premium\", \"cap\"** → option. **\"Cap and floor\", \"band\"** → collar. **\"Exchange fixed for floating\", \"notional principal\", \"years\"** → swap." },
      ],
    },
    {
      id: "fx-forward-mmh",
      heading: "Currency risk — forwards and the money-market hedge",
      blocks: [
        { kind: "text", md: "A company with a foreign receipt or payment carries **transaction risk**: the home-currency value changes as the exchange rate moves before settlement. The **forward contract** is the everyday answer — a binding agreement to exchange currency at a **forward rate** fixed today for delivery on a future date. It is simple, cheap and removes all uncertainty (and all upside)." },
        { kind: "text", md: "The **money-market hedge (MMH)** builds the same lock from deposits and loans instead of a forward, using the interest-rate differential. It is invaluable when a forward is unavailable or the question tests interest-rate parity. The logic differs for a payment and a receipt — the trick is to create the foreign-currency amount you need on the settlement date, today." },
        { kind: "formula", name: "Money-market hedge — a foreign PAYMENT", expr: "Deposit now = Amount owed ÷ (1 + foreign deposit rate × t) → buy at spot → borrow home currency → repay with interest", note: "Deposit foreign currency today so it grows to exactly the sum owed; fund that deposit by borrowing at home." },
        { kind: "example", title: "Worked example — money-market hedge of a payment", scenario: "A UK company owes a US supplier $2,000,000 in 3 months. Spot is $1.2500/£. The 3-month US deposit rate is 4% a year (1% for the quarter); the 3-month UK borrowing rate is 6% a year (1.5% for the quarter). Lock the sterling cost today.", steps: [
          { label: "1 — Deposit needed now", detail: "Deposit USD that grows to $2,000,000: 2,000,000 ÷ 1.01 = $1,980,198." },
          { label: "2 — Buy USD at spot", detail: "Sterling to buy that today: 1,980,198 ÷ 1.2500 = £1,584,158." },
          { label: "3 — Borrow the sterling now", detail: "Borrow £1,584,158 today at the UK rate." },
          { label: "4 — Repay in 3 months", detail: "Repay 1,584,158 × 1.015 = £1,607,920." },
        ], result: "The cost is fixed today at £1,607,920, whatever the spot rate becomes in 3 months. The USD deposit grows to exactly $2,000,000 to pay the supplier; the sterling loan repayment is the locked cost." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Money-market hedge of a foreign payment",
          caption: "Four moves that manufacture the currency you owe and fix the home-currency cost.",
          data: {
            steps: [
              { label: "Deposit foreign now", sub: "$2m ÷ 1.01 = $1,980,198" },
              { label: "Buy it at spot", sub: "÷ 1.2500 = £1,584,158" },
              { label: "Borrow the home cash", sub: "£1,584,158 today" },
              { label: "Repay with interest", sub: "× 1.015 = £1,607,920 locked" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Mirror the hedge for a receipt", md: "For a foreign **receipt**, flip every step: **borrow** the foreign currency now (so the receipt repays it), **sell** it at spot for home currency, and **deposit** that at home. Deposit vs borrow the wrong way round is the classic MMH error." },
      ],
      check: {
        q: "In a money-market hedge of a future foreign-currency PAYMENT, what is the first step?",
        options: [
          "Borrow the foreign currency now",
          "Deposit foreign currency now so it grows to the amount owed",
          "Sell the foreign currency at spot",
          "Take out a forward contract",
        ],
        correct: 1,
        explain: "To hedge a payment you deposit foreign currency today at the foreign deposit rate so it grows to exactly the amount owed; you fund that deposit by borrowing home currency, and the loan-plus-interest repayment is your locked cost. Borrowing the foreign currency is the receipt-side hedge.",
      },
    },
    {
      id: "fx-futures-swaps",
      heading: "Currency futures, options and swaps",
      blocks: [
        { kind: "text", md: "**Currency futures** are exchange-traded, standardised-size contracts in a fixed amount of currency. As with interest-rate futures you must translate the exposure into whole contracts, and basis again converges to zero at expiry. Contracts are denominated in the base currency (for example, a sterling future of £62,500), so convert the exposure into that currency first." },
        { kind: "formula", name: "Number of currency-futures contracts", expr: "Contracts = Exposure in the contract currency ÷ Contract size", note: "Convert the exposure at the expected/spot rate first, then divide by the contract size and round." },
        { kind: "example", title: "Worked example — sizing a currency-futures hedge", scenario: "A UK company will receive $3,125,000 in 3 months and wants to fix the sterling value. Sterling futures have a contract size of £62,500. The rate used is $1.2500/£.", steps: [
          { label: "Convert to sterling", detail: "$3,125,000 ÷ 1.2500 = £2,500,000 of exposure." },
          { label: "Number of contracts", detail: "£2,500,000 ÷ £62,500 = 40 contracts." },
          { label: "Direction", detail: "Receiving $ means selling $ / buying £, so BUY 40 sterling futures now." },
        ], result: "Buy 40 contracts to lock the sterling value of the $3,125,000 receipt; close them out when the cash arrives, the futures gain or loss offsetting the movement in the spot rate." },
        { kind: "text", md: "**Currency options** cap the downside while keeping the upside, for a premium — a US receipt can be protected with the right to sell dollars at a set rate, exercised only if the dollar weakens. **Currency swaps** exchange principal and interest in two currencies for several years; they are used to obtain cheaper foreign funding, hedge a long-term overseas investment, or access a market a firm cannot borrow in directly. Unlike an interest-rate swap, the **principal is usually exchanged** at the start and re-exchanged at maturity." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Forward contract vs currency future",
          data: {
            leftTitle: "Forward contract",
            rightTitle: "Currency future",
            rows: [
              { aspect: "Where traded", left: "Over the counter, with a bank", right: "On an exchange" },
              { aspect: "Size & dates", left: "Tailored exactly to the exposure", right: "Standardised size and delivery dates" },
              { aspect: "Cash flow", left: "No margin; settled at maturity", right: "Daily margining (marked to market)" },
              { aspect: "Basis risk", left: "None — matches the exposure", right: "Yes — rounding and unexpired basis" },
              { aspect: "Best for", left: "A precise, known exposure", right: "Liquidity and no counterparty search" },
            ],
          },
        } },
      ],
    },
    {
      id: "var-greeks",
      heading: "Value at risk and the Greeks",
      blocks: [
        { kind: "text", md: "Hedging leaves a residual — treasury needs one number for \"how bad could a normal bad day be?\" That is **value at risk (VaR)**: the maximum loss expected over a set horizon at a set confidence level, under normal conditions. It assumes returns are roughly normally distributed, so a loss is measured in standard deviations from the mean." },
        { kind: "formula", name: "Value at risk", expr: "VaR = σ × z × √t", note: "σ = standard deviation of value per period; z = confidence factor (1.65 for 95%, 2.33 for 99%); t = number of periods. Risk scales with √time, not time." },
        { kind: "example", title: "Worked example — VaR and the square-root-of-time rule", scenario: "A $10,000,000 trading position has a daily volatility (standard deviation) of 2%. Find the 1-day VaR at 95% confidence, then scale it to a 16-day horizon.", steps: [
          { label: "Daily σ in dollars", detail: "2% × $10,000,000 = $200,000." },
          { label: "1-day VaR (95%)", detail: "$200,000 × 1.65 = $330,000." },
          { label: "Scale to 16 days", detail: "√16 = 4, so 16-day VaR = $330,000 × 4 = $1,320,000." },
        ], result: "There is a 95% chance the loss over 16 trading days will not exceed $1,320,000 (equivalently, a 5% chance it is worse). Because risk scales with √t, a 16× longer horizon multiplies VaR by 4, not by 16." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "VaR scales with the square root of time",
          caption: "1-day VaR $330,000 stretched over longer horizons: √4 = 2, √9 = 3, √16 = 4.",
          data: {
            unit: "$",
            items: [
              { label: "1 day", value: 330000 },
              { label: "4 days", value: 660000 },
              { label: "9 days", value: 990000 },
              { label: "16 days", value: 1320000 },
            ],
          },
        } },
        { kind: "text", md: "For options the risk is non-linear, so treasury watches the **Greeks** — the sensitivities of an option's value. **Delta** is the change in option value per unit change in the underlying (0 to 1 for a call); **gamma** is the rate at which delta itself moves; **vega** measures sensitivity to volatility; **theta** to the passage of time; **rho** to interest rates." },
        { kind: "formula", name: "Delta hedge", expr: "Hedge quantity = Position size ÷ delta", note: "A delta of 0.5 means each option moves half as fast as the underlying, so you need 1 ÷ 0.5 = 2 options per unit of exposure to be delta-neutral." },
        { kind: "callout", tone: "key", title: "Delta hedging in one line", md: "A **delta-neutral** position is built so a small move in the underlying leaves total value unchanged. Because **delta drifts as the price moves (gamma)**, the hedge must be **rebalanced** continually — perfect delta hedging is a moving target, not a set-and-forget trade." },
      ],
      check: {
        q: "A position has a 1-day VaR of $500,000 at 95%. What is the approximate 9-day VaR at the same confidence?",
        options: [
          "$4,500,000",
          "$1,500,000",
          "$500,000",
          "$166,667",
        ],
        correct: 1,
        explain: "VaR scales with the square root of time, so multiply by √9 = 3: $500,000 × 3 = $1,500,000. Multiplying by 9 (giving $4,500,000) is the classic error — that would be scaling by time, not by √time.",
      },
    },
  ],
  examTraps: [
    { trap: "Getting the futures direction wrong — buying when you should sell.", fix: "A borrower fears a rise, which makes the price fall, so SELL now and buy back later. A depositor/receiver does the opposite." },
    { trap: "Forgetting to scale the number of futures contracts for the loan period.", fix: "Contracts = (Exposure ÷ Contract size) × (Loan period ÷ Contract period). A 6-month loan on 3-month contracts doubles the count." },
    { trap: "Depositing vs borrowing the wrong way in a money-market hedge.", fix: "Payment → deposit the foreign currency now (fund by borrowing home). Receipt → borrow the foreign currency now (deposit the home proceeds). Manufacture the currency you need." },
    { trap: "Treating the whole swap gain as one firm's, or miscomputing it.", fix: "Total gain = fixed-rate difference − floating-rate difference. It is SHARED (often equally) after any bank fee, not kept by one party." },
    { trap: "Scaling VaR by time instead of the square root of time.", fix: "VaR = σ × z × √t. A 4-day horizon multiplies the 1-day figure by √4 = 2, not by 4." },
  ],
  keyTerms: [
    { term: "Forward rate agreement (FRA)", def: "An OTC contract fixing an interest rate on a notional amount for a single future period; settled in cash for the rate difference." },
    { term: "Basis", def: "The gap between the current cash rate and the futures-implied rate; it converges to zero at expiry, and unexpired basis is the source of basis risk." },
    { term: "Tick", def: "The minimum price move of a futures contract — 0.01% (one basis point); its money value is contract size × 0.0001 × period/12." },
    { term: "Money-market hedge", def: "Locking a currency rate using deposits and loans instead of a forward, exploiting the interest-rate differential between the two currencies." },
    { term: "Interest-rate swap", def: "A multi-year exchange of interest streams (typically fixed for floating) on a notional principal, used to restructure debt cheaply." },
    { term: "Value at risk (VaR)", def: "The maximum loss expected over a given horizon at a given confidence level under normal conditions; scales with the square root of time." },
  ],
  summary: [
    "Treasury centralises liquidity, funding, risk management and banking relationships, run as either a cost centre or a riskier profit centre.",
    "Interest-rate risk is hedged with FRAs and futures (size the contracts, value the ticks, watch basis, net the gain against the loan), plus options, collars and swaps.",
    "A comparative-advantage swap gain = fixed-rate difference − floating-rate difference, shared between the two firms.",
    "Currency risk is hedged with forwards, the money-market hedge (deposit for a payment, borrow for a receipt), futures, options and currency swaps.",
    "VaR = σ × z × √t measures residual risk and scales with the square root of time; the Greeks (delta, gamma, vega, theta, rho) drive option hedging.",
    "Delta hedging builds a delta-neutral position that must be rebalanced continually because delta drifts with the price (gamma).",
  ],
}
