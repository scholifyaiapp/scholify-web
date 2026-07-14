import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area D — Corporate reconstruction & reorganisation.
 * Advanced Financial Management, strategic depth. Original, syllabus-aligned;
 * no ACCA/Kaplan/BPP text. Every calculation is re-solved from first principles.
 */

export const AFM_D: StudyChapter = {
  paper: "AFM",
  area: "D",
  title: "Corporate reconstruction & reorganisation",
  minutes: 16,
  intro: "When a business runs out of road, the finance function has one job: work out whether it is worth more rebuilt than broken up — and if so, design a scheme that leaves every claimant better off than the receiver would.",
  outcomes: [
    "Predict corporate failure using a quantitative model (the Altman Z-score) and a qualitative model (Argenti's A-score)",
    "Design a financial reconstruction from debt-for-equity swaps, rights issues and debt rescheduling",
    "Apply the better-off test to prove each stakeholder group gains from the scheme versus liquidation",
    "Structure and evaluate a leveraged or management buy-out, including the money multiple and mezzanine ranking",
    "Distinguish the forms of unbundling — divestment, demerger, sell-off and carve-out — and justify each",
  ],
  sections: [
    {
      id: "predict",
      heading: "Predicting failure — the Z-score and the A-score",
      blocks: [
        { kind: "text", md: "A company rarely fails overnight. It slides — margins thin, cash tightens, the overdraft creeps up to its limit — and by the time the numbers scream, the options have narrowed to rescue or receivership. The examiner wants you to spot the slide **early**, using two complementary lenses: a **quantitative** model that scores the accounts, and a **qualitative** model that scores the management and the story behind them." },
        { kind: "text", md: "The best-known quantitative tool is **Altman's Z-score**. It combines five financial ratios, each weighted by how strongly it predicted failure in Altman's original sample, into a single number. A high score means health; a low score means a company statistically resembles those that went under within two years." },
        { kind: "formula", name: "Altman Z-score (original manufacturing model)", expr: "Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E", note: "A = working capital / total assets · B = retained earnings / total assets · C = EBIT / total assets · D = market value of equity / book value of total liabilities · E = sales / total assets" },
        { kind: "callout", tone: "rule", title: "The three zones", md: "**Z > 2.99** — the **safe** zone; failure is unlikely. **1.81 to 2.99** — the **grey** zone; the model cannot call it, so investigate. **Z < 1.81** — the **distress** zone; the company statistically resembles firms that failed within two years." },
        { kind: "example", title: "Worked example — scoring Delphi Manufacturing", scenario: "Delphi has total assets of $500m. Its current assets are $180m and current liabilities $120m; retained earnings are $90m; EBIT is $70m; sales are $600m; total liabilities are $300m and the market value of its equity is $200m. Compute the Z-score and interpret it.", steps: [
          { label: "A — working capital / total assets", detail: "Working capital = 180 − 120 = 60. A = 60 / 500 = 0.12. Weighted: 1.2 × 0.12 = 0.144." },
          { label: "B — retained earnings / total assets", detail: "B = 90 / 500 = 0.18. Weighted: 1.4 × 0.18 = 0.252." },
          { label: "C — EBIT / total assets", detail: "C = 70 / 500 = 0.14. Weighted: 3.3 × 0.14 = 0.462." },
          { label: "D — market value of equity / total liabilities", detail: "D = 200 / 300 = 0.6667. Weighted: 0.6 × 0.6667 = 0.400." },
          { label: "E — sales / total assets", detail: "E = 600 / 500 = 1.20. Weighted: 1.0 × 1.20 = 1.200." },
          { label: "Add the weighted terms", detail: "Z = 0.144 + 0.252 + 0.462 + 0.400 + 1.200 = 2.458 ≈ 2.46." },
        ], result: "Z ≈ 2.46 sits in the grey zone (1.81–2.99). Delphi is not yet in distress, but it is not safe either — the driver is a thin EBIT/assets ratio and modest retained earnings. Flag for review, don't sound the alarm." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Where Delphi's 2.46 falls on Altman's scale",
          caption: "Below 1.81 is distress; above 2.99 is safe. Delphi sits in the grey band between the two lines.",
          data: {
            items: [
              { label: "Distress line", value: 1.81 },
              { label: "Delphi Z-score", value: 2.46 },
              { label: "Safe line", value: 2.99 },
            ],
          },
        } },
        { kind: "text", md: "The Z-score has real limits, and the examiner rewards you for naming them: it was calibrated on **US manufacturers**, so the weights travel badly to service firms, banks or other economies; it relies on a **market value** of equity that a private or already-distressed firm may not have; and it reads the accounts, which can be **window-dressed**. That is why you pair it with a qualitative model." },
        { kind: "text", md: "**Argenti's A-score** is that qualitative partner. It doesn't score ratios — it scores the **process of decline**, in three stages that follow one another like dominoes: **defects** in the business, the **mistakes** those defects allow, and the **symptoms** that finally show." },
        { kind: "table", caption: "Argenti's A-score — the three stages of decline", head: ["Stage", "What is scored", "Danger threshold"], rows: [
          ["Defects", "Management weaknesses (an autocratic chief who is also chairman, a passive board, a weak finance function) and accounting deficiencies (no budgets, no cash-flow plans, no costing), plus failure to respond to change", "A defects score over 10 is worrying"],
          ["Mistakes", "The three big errors the defects permit: high gearing, overtrading, and a single big project that could sink the firm", "A mistakes score over 15 is worrying"],
          ["Symptoms", "The late signs: deteriorating ratios and Z-score, creative accounting to hide it, falling morale and quality, and finally terminal signs", "Appear only once decline is advanced"],
        ] },
        { kind: "callout", tone: "key", title: "How the two fit together", md: "The **Z-score** tells you *that* a company looks like a failure statistically; the **A-score** tells you *why* — the management and control weaknesses driving it. An overall A-score above **25** signals a company at serious risk. Use both: numbers plus narrative." },
      ],
      check: {
        q: "Grayson plc, a manufacturer, returns an Altman Z-score of 1.5. Under the original model this indicates that the company is:",
        options: [
          "In the safe zone — failure is unlikely",
          "In the grey zone — the model cannot make a call",
          "In the distress zone — it resembles firms that failed within two years",
          "Uninterpretable, because the Z-score only works for banks",
        ],
        correct: 2,
        explain: "A Z-score below 1.81 falls in the distress zone: the company statistically resembles firms that failed within two years, so it is a red flag. 1.81–2.99 is the grey zone and above 2.99 is safe. The model was in fact built for manufacturers, so it applies to Grayson.",
      },
    },
    {
      id: "schemes",
      heading: "Responding to distress — the reconstruction toolkit",
      blocks: [
        { kind: "text", md: "Suppose the models confirm the worst: the company is over-borrowed, cannot service its debt, and a lender is threatening to call in a loan. If the underlying business is still viable — it makes an operating profit, it just cannot carry its financing — then the answer is a **financial reconstruction**: keep the business, rebuild the right-hand side of the balance sheet. Three levers do most of the work." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The three reconstruction levers",
          data: {
            items: [
              { title: "Debt-for-equity swap", sub: "Lenders exchange debt for shares — interest and repayment obligations vanish, gearing falls, lenders become owners" },
              { title: "Rights issue", sub: "Existing shareholders inject fresh cash to pay down debt or fund the turnaround, keeping control in current hands" },
              { title: "Debt rescheduling", sub: "Lenders agree longer maturities, a lower coupon or a repayment holiday — the debt survives but the cash strain eases" },
            ],
          },
        } },
        { kind: "text", md: "A real scheme usually **blends** all three. The two ratios that show whether the rebuild works are **gearing** (how much debt sits in the capital structure) and **interest cover** (how comfortably profit services the interest). A reconstruction succeeds when it pulls gearing down and pushes interest cover up to a survivable level." },
        { kind: "formula", name: "Gearing (debt to total capital)", expr: "Gearing = Debt / (Debt + Equity)", note: "Falls when debt is swapped for equity or repaid from a rights issue." },
        { kind: "formula", name: "Interest cover", expr: "Interest cover = Profit before interest and tax / Interest payable", note: "The number of times operating profit covers the interest bill; below ~2 is a danger sign." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Designing and agreeing a reconstruction",
          caption: "The examiner marks the logic of this sequence, not just the arithmetic.",
          data: {
            steps: [
              { label: "Confirm viability", sub: "Is the operating business worth more alive than dead?" },
              { label: "Value both routes", sub: "Estimate proceeds on liquidation vs value as a going concern" },
              { label: "Design the scheme", sub: "Mix swaps, rights issue and rescheduling" },
              { label: "Apply the better-off test", sub: "Prove every group gains vs liquidation" },
              { label: "Agree & implement", sub: "Secure approval from each affected class" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "Viability comes first", md: "A reconstruction only makes sense if the **operating** business is sound and only the **financing** has failed. If the business itself loses money at the operating level, no amount of balance-sheet surgery saves it — that is a candidate for orderly **liquidation**, not rescue." },
      ],
    },
    {
      id: "betteroff",
      heading: "The better-off test — liquidation versus rescue",
      blocks: [
        { kind: "text", md: "A scheme is only fair — and only approvable — if **every affected group is at least as well off** under the reconstruction as it would be on immediate liquidation. That is the **better-off test**, and it is the analytical heart of an AFM reconstruction question. You build it in two columns: what each claimant receives if the company is broken up today, versus what the scheme offers." },
        { kind: "text", md: "On liquidation, cash is distributed in a strict **order of priority**. Understanding that order is what makes the test work: junior claimants only get paid once every senior claim is settled in full." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "Order of priority on liquidation",
          caption: "Cash flows down the pyramid; each level is paid in full before the next receives anything.",
          data: {
            levels: [
              { label: "Liquidation costs", sub: "The receiver's fees, paid first" },
              { label: "Secured creditors (fixed charge)", sub: "Repaid from the specific asset charged" },
              { label: "Preferential creditors", sub: "Certain employee and tax claims" },
              { label: "Unsecured creditors", sub: "Trade payables — share whatever remains" },
              { label: "Shareholders", sub: "The residual — often nothing" },
            ],
          },
        } },
        { kind: "example", title: "Worked example — Marlow Ltd, liquidation column", scenario: "Marlow's assets would realise $40m in a forced sale, with $2m of liquidation costs. It owes a bank $20m secured by a fixed charge on its property, $3m to preferential creditors, and $25m to unsecured trade creditors. What does each group receive on liquidation?", steps: [
          { label: "Start with realisable proceeds", detail: "Assets realise $40m." },
          { label: "Pay liquidation costs", detail: "40 − 2 = $38m remains." },
          { label: "Pay the secured bank in full", detail: "38 − 20 = $18m remains. The bank recovers all $20m." },
          { label: "Pay preferential creditors", detail: "18 − 3 = $15m remains. They recover all $3m." },
          { label: "Distribute to unsecured creditors", detail: "$15m is left against $25m owed → they receive 15/25 = 60 cents in the dollar, i.e. $15m." },
          { label: "Shareholders", detail: "Nothing remains → shareholders receive $0." },
        ], result: "On liquidation: bank $20m (full), preferential $3m (full), unsecured $15m (60%), shareholders $0. These are the numbers every reconstruction offer must beat." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "Marlow — how $40m of proceeds is consumed",
          caption: "Each claim, in priority order, until nothing is left for shareholders.",
          data: {
            unit: "$m",
            items: [
              { label: "Assets realised", value: 40, kind: "start" },
              { label: "Liquidation costs", value: -2, kind: "delta" },
              { label: "Secured bank", value: -20, kind: "delta" },
              { label: "Preferential", value: -3, kind: "delta" },
              { label: "Unsecured creditors", value: -15, kind: "delta" },
              { label: "Left for shareholders", value: 0, kind: "total" },
            ],
          },
        } },
        { kind: "text", md: "Now the rescue column. Because the business is worth far more as a **going concern** than in a forced sale, there is a surplus to share. The proposal: the bank keeps its $20m loan with security intact; preferential creditors are paid in full; a **rights issue** raises $10m of fresh cash from existing shareholders; the unsecured creditors accept that $10m in cash **plus** new shares worth $12m in settlement of their $25m; and shareholders retain ownership of a viable, deleveraged company." },
        { kind: "table", caption: "Marlow — the better-off test", head: ["Group", "Owed", "Liquidation now", "Under reconstruction", "Better off?"], rows: [
          ["Secured bank", "$20m", "$20m", "$20m (loan retained)", "Neutral — no worse"],
          ["Preferential", "$3m", "$3m", "$3m", "Neutral — no worse"],
          ["Unsecured", "$25m", "$15m", "$10m cash + $12m shares = $22m", "Yes — better by $7m"],
          ["Shareholders", "—", "$0", "Retain a solvent business", "Yes — better than nil"],
        ] },
        { kind: "callout", tone: "key", title: "The verdict", md: "No group is worse off and two are strictly better off, so the scheme **passes the better-off test** and should command approval. The $7m gain to unsecured creditors and the shareholders' retained equity both come from the going-concern surplus the liquidation would have destroyed." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Unsecured creditors — liquidation vs reconstruction ($m recovered)",
          caption: "The going-concern surplus lifts their recovery from $15m to $22m.",
          data: {
            unit: "$m",
            items: [
              { label: "Liquidation", value: 15 },
              { label: "Reconstruction", value: 22 },
            ],
          },
        } },
      ],
      check: {
        q: "Under a proposed reconstruction, an unsecured creditor group would receive a package worth $18m; on immediate liquidation the same group would receive $15m. In isolation, how does the better-off test treat this group?",
        options: [
          "The group is worse off, so the scheme automatically fails",
          "The group is better off, which supports approval — but ALL groups must clear the test",
          "It is irrelevant, because unsecured creditors rank last anyway",
          "The group must receive its full $25m or the test cannot be passed",
        ],
        correct: 1,
        explain: "$18m beats the $15m liquidation alternative, so this group is better off and, for them, the test is satisfied — full repayment is not required, only beating the liquidation outcome. But the scheme is only approvable if every affected group clears the test; one better-off group is necessary, not sufficient.",
      },
    },
    {
      id: "swap",
      heading: "Debt-for-equity swaps in detail",
      blocks: [
        { kind: "text", md: "The debt-for-equity swap deserves its own worked pass, because it is where the ratios move most dramatically. Lenders give up their fixed claim (interest and repayment) and take shares instead. The company loses a creditor and gains an owner; the interest bill shrinks, gearing collapses, and interest cover recovers. The cost is **dilution** — existing shareholders now own a smaller slice." },
        { kind: "example", title: "Worked example — Halyard plc swaps out its debt", scenario: "Halyard has $50m of debt at 8% interest and $20m of equity (book value). Its profit before interest and tax is $6m. It proposes to swap $30m of the debt for newly issued equity, leaving $20m of debt outstanding. Show the effect on interest cover and gearing.", steps: [
          { label: "Interest before", detail: "8% × $50m = $4.0m. Interest cover = 6.0 / 4.0 = 1.5 times — dangerously thin." },
          { label: "Gearing before", detail: "Debt / (Debt + Equity) = 50 / (50 + 20) = 50 / 70 = 71.4%." },
          { label: "Interest after the swap", detail: "Debt falls to $20m → interest = 8% × $20m = $1.6m. Interest cover = 6.0 / 1.6 = 3.75 times." },
          { label: "Gearing after the swap", detail: "The $30m of debt becomes equity: debt $20m, equity 20 + 30 = $50m. Gearing = 20 / (20 + 50) = 20 / 70 = 28.6%." },
        ], result: "Interest cover jumps from 1.5 to 3.75 times and gearing falls from 71.4% to 28.6%. The company is transformed from fragile to comfortable — the price being that former lenders now own $30m of a $70m capital base, diluting the original shareholders." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Halyard — before and after the debt-for-equity swap",
          data: {
            leftTitle: "Before",
            rightTitle: "After swap",
            rows: [
              { aspect: "Debt", left: "$50m", right: "$20m" },
              { aspect: "Equity", left: "$20m", right: "$50m" },
              { aspect: "Interest bill (8%)", left: "$4.0m", right: "$1.6m" },
              { aspect: "Interest cover", left: "1.5 times", right: "3.75 times" },
              { aspect: "Gearing", left: "71.4%", right: "28.6%" },
              { aspect: "Control", left: "Original holders", right: "Diluted by lenders" },
            ],
          },
        } },
        { kind: "callout", tone: "tip", title: "Why a lender would agree", md: "A lender only swaps if the equity it receives is worth **more** than what it would recover by enforcing the debt in a liquidation. In a distressed firm the debt is often worth cents in the dollar anyway, so equity in a rescued, deleveraged business can be the better bet — the same better-off logic, seen from the lender's chair." },
      ],
    },
    {
      id: "lbo",
      heading: "Leveraged and management buy-outs",
      blocks: [
        { kind: "text", md: "Reorganisation is not only for the distressed — a healthy division can be **bought out** from its parent. In a **leveraged buy-out (LBO)** a financial sponsor acquires a business using a large slug of debt and a thin sliver of equity; in a **management buy-out (MBO)** the incumbent managers are the equity buyers, usually alongside a private-equity backer. The debt is then repaid out of the target's own cash flows over a few years, and the equity is sold at exit." },
        { kind: "text", md: "The financing stacks in layers by **risk and priority**. Senior debt is cheapest and paid first; **mezzanine** sits in between — subordinated to senior debt but ahead of equity, carrying a higher coupon plus an **equity kicker** (warrants) to compensate for that junior ranking; equity sits at the bottom, last to be paid and the riskiest, which is exactly why it earns the highest return if the deal works." },
        { kind: "diagram", diagram: {
          type: "pyramid",
          title: "The buy-out capital stack — a $200m acquisition",
          caption: "Priority runs top to bottom: senior debt is repaid first, equity last.",
          data: {
            levels: [
              { label: "Senior debt — $100m", sub: "Lowest cost, first claim, secured" },
              { label: "Mezzanine — $40m", sub: "Subordinated; high coupon + equity warrants" },
              { label: "Equity — $60m", sub: "Last in line, highest risk and highest return" },
            ],
          },
        } },
        { kind: "text", md: "Sponsors judge the prize with the **money multiple** — how many times the initial equity is returned at exit — and, alongside it, the IRR that this implies over the holding period." },
        { kind: "formula", name: "Money multiple", expr: "Money multiple = Exit equity value / Initial equity invested", note: "Exit equity value = exit enterprise value − net debt still outstanding at exit." },
        { kind: "example", title: "Worked example — the money multiple on the $200m buy-out", scenario: "The $200m deal above is funded with $140m of debt ($100m senior + $40m mezzanine) and $60m of equity. Over five years, operating cash flows repay debt down to $60m. The business is then sold for an enterprise value of $300m. What money multiple and approximate IRR does the equity earn?", steps: [
          { label: "Equity value at exit", detail: "Exit enterprise value − remaining net debt = 300 − 60 = $240m." },
          { label: "Money multiple", detail: "Exit equity / initial equity = 240 / 60 = 4.0 times." },
          { label: "Convert to an annual return", detail: "Over 5 years: (4.0)^(1/5) = 4^0.2. Since 4^0.2 = e^(0.2 × ln4) = e^(0.2 × 1.3863) = e^0.2773 = 1.3195." },
          { label: "IRR", detail: "1.3195 − 1 = 0.3195 ≈ 32% per year." },
        ], result: "The equity turns $60m into $240m — a 4.0 times money multiple, an IRR of roughly 32% a year. The leverage magnifies the return: because debt (not equity) funded most of the price, the equity captures almost all of the growth in enterprise value plus the value of the debt paid down." },
        { kind: "callout", tone: "warn", title: "Leverage cuts both ways", md: "The same gearing that turns a 50% rise in enterprise value into a 4x equity return will **wipe the equity out** if cash flows disappoint and the business cannot service its debt. High debt is the engine and the risk of an LBO in equal measure." },
      ],
      check: {
        q: "A management buy-out is funded with $50m of equity. Five years later the equity stake is sold for $200m. What money multiple has the equity earned?",
        options: [
          "0.25 times",
          "3.0 times",
          "4.0 times",
          "150 times",
        ],
        correct: 2,
        explain: "The money multiple is exit equity value divided by initial equity invested: 200 / 50 = 4.0 times. (A 3.0x multiple would be the profit of $150m divided by $50m — a common trap; the multiple uses the FULL exit value, not just the gain.)",
      },
    },
    {
      id: "unbundling",
      heading: "Unbundling — divestment, demerger, sell-off and carve-out",
      blocks: [
        { kind: "text", md: "Reorganisation can also mean deliberately making the group **smaller**. **Unbundling** is the umbrella term for separating parts of a business from the whole. Groups do it to shed a poor strategic fit, to raise cash, to let the market value a hidden gem on its own multiple, to escape a conglomerate discount, or under pressure from an activist investor or a regulator. The four main routes differ in who ends up owning the separated unit and whether cash changes hands." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "Four routes to unbundling",
          data: {
            items: [
              { title: "Sell-off / divestment", sub: "The unit is sold to a third party (trade buyer or PE) for cash — ownership leaves the group entirely" },
              { title: "Demerger / spin-off", sub: "The unit becomes a separate listed company; existing shareholders receive its shares pro rata — no cash raised, control unchanged" },
              { title: "Carve-out (equity)", sub: "A minority stake in the unit is floated (IPO) to outside investors, raising cash while the parent keeps control" },
              { title: "Management buy-out", sub: "The unit's own managers buy it, typically debt-financed — a divestment to insiders" },
            ],
          },
        } },
        { kind: "table", caption: "Comparing the routes", head: ["Route", "Cash raised?", "Who owns the unit after?"], rows: [
          ["Sell-off / divestment", "Yes — full price", "An external buyer"],
          ["Demerger / spin-off", "No", "The same shareholders, but directly"],
          ["Carve-out (IPO of a stake)", "Yes — for the stake sold", "Parent (majority) + new investors"],
          ["Management buy-out", "Yes — to the parent", "Incumbent managers + backer"],
        ] },
        { kind: "callout", tone: "key", title: "Choosing the route", md: "If the group **needs cash**, sell off or carve out. If it wants to **unlock value** without selling — letting the market re-rate the parts — demerge. If **managers** are the natural owners and buyers, run an MBO. The evaluation is always the same test underneath: does separating the unit create more value for shareholders than keeping it inside the group?" },
        { kind: "text", md: "That closes the loop on the whole area. Whether you are rescuing a failing company, buying one out, or breaking one up, the discipline is identical: **value each alternative, compare it to the status quo, and prove that every party who must agree comes out ahead.** Design without that proof is just rearranging deckchairs." },
      ],
    },
  ],
  examTraps: [
    { trap: "Misremembering the Altman zones or the coefficients.", fix: "Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E. Below 1.81 = distress; 1.81–2.99 = grey; above 2.99 = safe. Note the highest weight (3.3) is on EBIT/total assets — profitability dominates." },
    { trap: "Treating the better-off test as 'everyone gets paid in full'.", fix: "Each group only has to beat what it would receive on liquidation, not be repaid 100%. Compare reconstruction receipt vs liquidation receipt, group by group." },
    { trap: "Recommending a reconstruction for an operationally loss-making business.", fix: "Reconstruction fixes the financing, not the trade. If the business loses money at the operating level, liquidation may be the honest answer." },
    { trap: "Computing the money multiple as profit / equity instead of exit value / equity.", fix: "Money multiple = exit equity value ÷ initial equity. $240m exit on $60m equity is 4.0x, not 3.0x — use the whole exit value." },
    { trap: "Confusing a demerger with a sell-off.", fix: "A demerger raises NO cash and leaves the same shareholders owning the unit directly; a sell-off transfers ownership to an outside buyer for cash. Carve-outs raise cash but the parent keeps control." },
  ],
  keyTerms: [
    { term: "Altman Z-score", def: "A quantitative failure-prediction model combining five weighted financial ratios; below 1.81 signals distress, above 2.99 signals safety." },
    { term: "Argenti A-score", def: "A qualitative failure model scoring defects, mistakes and symptoms in the decline process; a total above 25 signals serious risk." },
    { term: "Better-off test", def: "The check that every affected stakeholder group receives at least as much under a reconstruction as it would on immediate liquidation." },
    { term: "Debt-for-equity swap", def: "A reconstruction in which lenders exchange their debt for shares, cutting interest and gearing while diluting existing shareholders." },
    { term: "Mezzanine finance", def: "Subordinated debt ranking below senior debt but above equity, carrying a high coupon plus an equity kicker to reward its junior position." },
    { term: "Money multiple", def: "The ratio of the equity value realised at exit to the equity invested at entry; a headline measure of buy-out returns." },
  ],
  summary: [
    "Predict failure with the Altman Z-score (Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E; <1.81 distress, 1.81–2.99 grey, >2.99 safe) and Argenti's qualitative A-score of defects, mistakes and symptoms.",
    "A financial reconstruction rebuilds the balance sheet using debt-for-equity swaps, rights issues and rescheduling — but only if the operating business is viable.",
    "The better-off test approves a scheme only when every claimant group is at least as well off as on liquidation, respecting the order of priority.",
    "A debt-for-equity swap slashes gearing and lifts interest cover (Halyard: 71.4% to 28.6% gearing, cover 1.5 to 3.75x) at the cost of dilution.",
    "LBOs/MBOs stack senior debt, mezzanine and equity by priority; the money multiple (exit equity ÷ equity invested) measures the reward, while unbundling — sell-off, demerger, carve-out, MBO — shrinks a group to unlock value.",
  ],
}
