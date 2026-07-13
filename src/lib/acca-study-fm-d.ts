import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * FM · Area D — Business finance & the cost of capital.
 * Sources of finance, cost of equity (DGM & CAPM), cost of debt (irredeemable,
 * redeemable via IRR, preference, bank), WACC on market values, capital
 * structure theory (traditional & Modigliani-Miller), gearing, and rights
 * issues (TERP). Original, syllabus-aligned; no ACCA/Kaplan/BPP text.
 */

export const FM_D: StudyChapter = {
  paper: "FM",
  area: "D",
  title: "Business finance & the cost of capital",
  minutes: 19,
  intro: "Every pound a business raises has a price — a return its providers demand for the risk they take. Learn to put a number on that price for equity, for debt, and for the firm as a whole, and you hold the discount rate that drives every investment decision.",
  outcomes: [
    "Identify the main sources of finance and match them to the need (short vs long term, equity vs debt)",
    "Calculate the cost of equity using both the dividend growth model and CAPM",
    "Calculate the cost of irredeemable and redeemable debt, preference shares and bank borrowings",
    "Combine the individual costs into a weighted average cost of capital using market values",
    "Explain the traditional and Modigliani-Miller views on capital structure and the effect of gearing",
    "Calculate the theoretical ex-rights price and the value of a right",
  ],
  sections: [
    {
      id: "sources",
      heading: "Where the money comes from",
      blocks: [
        { kind: "text", md: "A business needs cash for two very different reasons, and the golden rule is to **match the finance to the need**. A short-term need — a seasonal stock build, a gap while customers pay — is funded with **short-term** finance (overdraft, trade credit, short bank loans) that is cheap and flexible but must be repaid soon. A long-term need — a factory, a fleet, an acquisition — is funded with **long-term** finance (equity, long loans, bonds) that is more expensive but stays in place for years." },
        { kind: "callout", tone: "rule", title: "The matching principle", md: "Fund **long-term assets with long-term finance** and short-term assets with short-term finance. Using an overdraft to buy a building is a classic route to a liquidity crisis: the asset earns cash slowly, but the finance can be recalled on demand." },
        { kind: "text", md: "Long-term finance itself splits into two families. **Equity** (ordinary shares and retained earnings) is the owners' money: it carries no obligation to pay dividends and never has to be repaid, but shareholders bear the most risk and therefore demand the highest return. **Debt** (loan notes, bonds, bank loans) is borrowed: interest must be paid whether or not profits are made, and the capital is repaid on a fixed date, but debt is cheaper because lenders rank ahead of shareholders and interest is **tax-deductible**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Equity vs debt — the two faces of long-term finance",
          data: {
            leftTitle: "Equity",
            rightTitle: "Debt",
            rows: [
              { aspect: "Return to provider", left: "Dividends (discretionary)", right: "Interest (contractual)" },
              { aspect: "Repayment", left: "Never — permanent capital", right: "On a fixed redemption date" },
              { aspect: "Risk to the provider", left: "Highest — ranks last", right: "Lower — ranks ahead, often secured" },
              { aspect: "Cost to the company", left: "Higher required return", right: "Lower, and interest is tax-deductible" },
              { aspect: "Effect on control", left: "New shares can dilute owners", right: "No dilution, but adds fixed charges" },
            ],
          },
        } },
        { kind: "text", md: "**Leasing** is a third route that sidesteps an outright purchase. Instead of buying an asset, the business rents it: a **finance lease** transfers substantially all the risks and rewards of ownership (it is, in economic substance, a purchase funded by debt), whereas an **operating lease** is a shorter rental where the lessor keeps the risks and rewards. Leasing conserves cash, can be quicker to arrange than a loan, and passes obsolescence risk to the lessor under an operating lease." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "Matching the source to the need",
          caption: "Term of the finance should mirror the life of the asset it funds.",
          data: {
            steps: [
              { label: "Short-term need", sub: "Stock, receivables gap" },
              { label: "Overdraft / trade credit", sub: "Flexible, repayable soon" },
              { label: "Long-term need", sub: "Plant, property, growth" },
              { label: "Equity / loans / leasing", sub: "Committed for years" },
            ],
          },
        } },
      ],
    },
    {
      id: "coe",
      heading: "The cost of equity — DGM and CAPM",
      blocks: [
        { kind: "text", md: "The **cost of equity** (Ke) is the return ordinary shareholders demand for the risk of owning the business. It cannot be read off a contract — shareholders never sign one — so it must be **inferred**. Two models do this, and the exam expects both." },
        { kind: "text", md: "The **dividend growth model (DGM)** — also called the Gordon growth model — says a share is worth the present value of its future dividends, which are assumed to grow at a constant rate **g** forever. Rearranging that valuation for the required return gives Ke directly." },
        { kind: "formula", name: "Dividend growth model", expr: "Ke = D1 / P0 + g", note: "D1 = next year's dividend, P0 = current ex-dividend share price, g = constant annual growth rate. Note D1 = D0 × (1 + g), where D0 is the dividend just paid." },
        { kind: "text", md: "Where does **g** come from? Often from the business reinvesting its own profits. If a company retains a proportion **b** of its earnings and reinvests them at a return **r**, growth is the product of the two — the more you keep and the harder it works, the faster dividends grow." },
        { kind: "formula", name: "Growth from reinvestment (Gordon)", expr: "g = b × r", note: "b = proportion of earnings retained (retention rate), r = the accounting rate of return earned on reinvested funds." },
        { kind: "example", title: "Worked example — Ke from the dividend growth model", scenario: "Aldermere plc has just paid a dividend of 20c per share. The company retains 40% of its earnings and earns a return of 10% on reinvested funds. Its shares trade ex-dividend at $2.60. Estimate the cost of equity.", steps: [
          { label: "Estimate growth g", detail: "g = b × r = 0.40 × 0.10 = 0.04, i.e. **4%** per year." },
          { label: "Find next year's dividend D1", detail: "D1 = D0 × (1 + g) = 20c × 1.04 = 20.8c = **$0.208**." },
          { label: "Apply the DGM", detail: "Ke = D1 / P0 + g = 0.208 / 2.60 + 0.04." },
          { label: "Compute the dividend yield", detail: "0.208 / 2.60 = 0.08, i.e. an 8% forward dividend yield." },
          { label: "Add growth", detail: "Ke = 0.08 + 0.04 = 0.12." },
        ], result: "The cost of equity is 0.08 + 0.04 = 12%. Note P0 must be the ex-dividend price; if a cum-dividend price is quoted, strip out the dividend about to be paid first." },
        { kind: "text", md: "The **Capital Asset Pricing Model (CAPM)** takes a different route. It ignores dividends entirely and prices **risk**: the return investors demand equals the risk-free rate plus a premium for the share's systematic (market-related) risk, measured by its **beta**." },
        { kind: "formula", name: "CAPM — the cost of equity", expr: "Ke = Rf + β(Rm − Rf)", note: "Rf = risk-free rate, β = the equity beta, (Rm − Rf) = the equity/market risk premium. A β above 1 means the share is more volatile than the market and so demands a higher return." },
        { kind: "example", title: "Worked example — Ke from CAPM", scenario: "The risk-free rate is 4%, the average market return is 10%, and Aldermere's equity beta is 1.2. Estimate the cost of equity using CAPM.", steps: [
          { label: "Identify the market risk premium", detail: "Rm − Rf = 10% − 4% = **6%**." },
          { label: "Scale it by beta", detail: "β × (Rm − Rf) = 1.2 × 6% = **7.2%** — the extra return for this share's systematic risk." },
          { label: "Add the risk-free rate", detail: "Ke = 4% + 7.2%." },
        ], result: "CAPM gives Ke = 4% + 7.2% = 11.2%. The two models rarely agree to the decimal — here 12% vs 11.2% — because they rest on different assumptions; either is an acceptable estimate." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "DGM vs CAPM — two ways to the same number",
          data: {
            leftTitle: "Dividend growth model",
            rightTitle: "CAPM",
            rows: [
              { aspect: "Built on", left: "Future dividends & growth", right: "Systematic risk (beta)" },
              { aspect: "Key inputs", left: "D0, P0, g", right: "Rf, β, Rm" },
              { aspect: "Main weakness", left: "Assumes constant growth forever", right: "Beta and market return are estimates" },
              { aspect: "Handles non-payers?", left: "No — needs a dividend", right: "Yes — no dividend required" },
              { aspect: "Best when", left: "Stable, dividend-paying firm", right: "Risk profile differs from the market" },
            ],
          },
        } },
      ],
      check: {
        q: "A share has a beta of 0.8. The risk-free rate is 5% and the expected return on the market is 11%. Using CAPM, what is the cost of equity?",
        options: ["4.8%", "6.8%", "9.8%", "13.8%"],
        correct: 2,
        explain: "Ke = Rf + β(Rm − Rf) = 5% + 0.8 × (11% − 5%) = 5% + 0.8 × 6% = 5% + 4.8% = 9.8%. The classic errors: 4.8% forgets to add back the risk-free rate, and 13.8% forgets to subtract Rf from the market return (using 0.8 × 11% instead of 0.8 × 6%).",
      },
    },
    {
      id: "cod",
      heading: "The cost of debt",
      blocks: [
        { kind: "text", md: "Debt is cheaper than equity, and part of the reason is **tax relief**: interest is an allowable expense, so every $1 of interest costs the company only $(1 − t) after tax. The cost of debt calculation therefore almost always runs on **after-tax** cash flows. How you compute it depends on whether the debt is ever repaid." },
        { kind: "text", md: "**Irredeemable (undated) debt** is never redeemed — the company pays interest forever. Its cost is simply the after-tax interest as a proportion of the debt's current market value." },
        { kind: "formula", name: "Cost of irredeemable debt", expr: "Kd = i(1 − t) / MV", note: "i = annual interest (coupon) per unit of nominal value, t = corporation tax rate, MV = current ex-interest market value of the debt." },
        { kind: "example", title: "Worked example — irredeemable loan notes", scenario: "Bellwood plc has irredeemable 8% loan notes trading at $95 (ex-interest) per $100 nominal. Corporation tax is 20%. What is the cost of this debt?", steps: [
          { label: "Annual interest per $100", detail: "8% of $100 nominal = **$8**." },
          { label: "Interest after tax", detail: "$8 × (1 − 0.20) = $8 × 0.80 = **$6.40**." },
          { label: "Divide by market value", detail: "Kd = 6.40 / 95 = 0.0674." },
        ], result: "The after-tax cost of the irredeemable debt is 6.40 / 95 = 6.74%. Always use the market value ($95), not the nominal value ($100)." },
        { kind: "text", md: "**Redeemable debt** is repaid on a fixed date, so its cost is the **internal rate of return (IRR)** of its after-tax cash flows: you pay the market value today, receive after-tax interest each year, and receive the redemption value at the end. There is no tidy formula — you discount at two guessed rates and interpolate to the rate that makes the net present value zero." },
        { kind: "formula", name: "Cost of redeemable debt (IRR)", expr: "MV = Σ [ i(1 − t) / (1 + Kd)ⁿ ] + RV / (1 + Kd)ᴺ", note: "Solve for Kd — the rate at which the present value of after-tax interest plus redemption equals the current market value. RV = redemption value, N = years to redemption." },
        { kind: "formula", name: "Linear interpolation for IRR", expr: "IRR = L + [ NPV_L / (NPV_L − NPV_H) ] × (H − L)", note: "L, H = the lower and higher trial discount rates; NPV_L, NPV_H = the NPVs at those rates." },
        { kind: "example", title: "Worked example — redeemable loan notes", scenario: "Bellwood also has 8% loan notes redeemable at par ($100) in 4 years, currently trading at $95 ex-interest. Tax is 20%. Find the after-tax cost of debt. (4-year annuity factors: 3.465 at 6%, 3.312 at 8%; 4-year discount factors: 0.792 at 6%, 0.735 at 8%.)", steps: [
          { label: "After-tax annual interest", detail: "$8 × (1 − 0.20) = **$6.40** per year for years 1–4." },
          { label: "Lay out the flows", detail: "T0: −$95 (price paid); T1–T4: +$6.40 interest; T4: +$100 redemption." },
          { label: "NPV at 6%", detail: "(6.40 × 3.465) + (100 × 0.792) − 95 = 22.18 + 79.20 − 95 = **+6.38**." },
          { label: "NPV at 8%", detail: "(6.40 × 3.312) + (100 × 0.735) − 95 = 21.20 + 73.50 − 95 = **−0.30**." },
          { label: "Interpolate", detail: "Kd = 6% + [6.38 / (6.38 − (−0.30))] × (8% − 6%) = 6% + (6.38 / 6.68) × 2% = 6% + 1.91%." },
        ], result: "The after-tax cost of the redeemable debt is approximately 7.9%. Because the NPV at 8% is almost exactly zero, you can see the true IRR sits just under 8%." },
        { kind: "text", md: "Two more instruments complete the picture. **Preference shares** pay a fixed dividend but — being a dividend, not interest — get **no tax relief**, so the cost is simply the dividend over the market value. **Bank borrowings** carry a stated interest rate, and because there is no traded market value, the cost is the after-tax interest rate itself." },
        { kind: "formula", name: "Cost of (irredeemable) preference shares", expr: "Kp = d / MV", note: "d = the fixed annual preference dividend per share, MV = current market value per preference share. No (1 − t) — preference dividends are not tax-deductible." },
        { kind: "callout", tone: "tip", title: "Quick preference & bank check", md: "5% $1 preference shares trading at $0.625 cost 0.05 / 0.625 = **8%**. A bank loan at 9% with tax at 20% costs 9% × (1 − 0.20) = **7.2%**. Neither needs an IRR — only redeemable traded debt does." },
      ],
      check: {
        q: "Why is the after-tax cost of a company's redeemable loan notes found by calculating an IRR rather than a simple ratio?",
        options: [
          "Because interest on redeemable debt receives no tax relief",
          "Because the cash flows span several years and include a redemption payment, so the return is the rate that equates them to today's market value",
          "Because redeemable debt is always more expensive than equity",
          "Because the nominal value, not the market value, must be used",
        ],
        correct: 1,
        explain: "Redeemable debt has a stream of dated cash flows — after-tax interest each year plus the redemption amount — bought for a market price today. The cost is the discount rate (IRR) that makes their present value equal that price. Irredeemable debt has no redemption date, so a simple i(1−t)/MV ratio suffices.",
      },
    },
    {
      id: "wacc",
      heading: "Weighting it all — the WACC",
      blocks: [
        { kind: "text", md: "A firm rarely uses one source of finance, so the rate it must earn overall is a blend: the **weighted average cost of capital (WACC)**. Each source's cost is weighted by its share of the total, and the golden rule is to weight by **market values**, not book values — because market values reflect the **current opportunity cost** to today's investors, whereas book values are historical accounting figures." },
        { kind: "formula", name: "Weighted average cost of capital", expr: "WACC = [ E/(E+D) ] × Ke + [ D/(E+D) ] × Kd(1−t)", note: "E = market value of equity, D = market value of debt, Ke = cost of equity, Kd(1−t) = after-tax cost of debt. If Kd is already an after-tax figure (as from a redeemable-debt IRR on after-tax flows), do not deduct tax again." },
        { kind: "callout", tone: "warn", title: "Market values, and don't double-count tax", md: "Two errors sink WACC questions: weighting by **book value** (use market values), and applying the tax shield **twice** when the cost of debt was already computed on after-tax cash flows. Deduct tax once — either in the Kd itself or in the WACC formula, never both." },
        { kind: "example", title: "Worked example — building the WACC", scenario: "Bellwood plc is financed by 5 million ordinary shares trading ex-dividend at $2.60, with a cost of equity of 12%. It also has $10 million (nominal) of redeemable loan notes trading at $95 per $100, whose after-tax cost was found to be 7.9%. Calculate the WACC.", steps: [
          { label: "Market value of equity (E)", detail: "5m shares × $2.60 = **$13.0m**." },
          { label: "Market value of debt (D)", detail: "$10m nominal × (95 / 100) = **$9.5m**." },
          { label: "Total market value", detail: "$13.0m + $9.5m = **$22.5m**." },
          { label: "Equity contribution", detail: "(13.0 / 22.5) × 12% = 0.5778 × 12% = **6.93%**." },
          { label: "Debt contribution", detail: "(9.5 / 22.5) × 7.9% = 0.4222 × 7.9% = **3.34%** (Kd is already after-tax — no further tax adjustment)." },
          { label: "Add the two", detail: "WACC = 6.93% + 3.34%." },
        ], result: "WACC = 6.93% + 3.34% = 10.27%, say 10.3%. This is the minimum return the firm's investments must earn to keep both shareholders and lenders satisfied." },
        { kind: "diagram", diagram: {
          type: "waterfall",
          title: "From components to WACC",
          caption: "Each source contributes its weighted cost; the two build up to the blended rate.",
          data: {
            unit: "%",
            items: [
              { label: "Equity contribution", value: 6.93, kind: "delta" },
              { label: "Debt contribution", value: 3.34, kind: "delta" },
              { label: "WACC", value: 10.27, kind: "total" },
            ],
          },
        } },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "The individual costs, side by side",
          caption: "Debt is cheapest (ranks first, tax-relieved); equity is dearest; WACC sits between.",
          data: {
            unit: "%",
            items: [
              { label: "Cost of debt (after tax)", value: 7.9 },
              { label: "WACC", value: 10.3 },
              { label: "Cost of equity", value: 12.0 },
            ],
          },
        } },
      ],
      check: {
        q: "When calculating WACC, why are market values preferred to book values as weights?",
        options: [
          "Book values are not available for a listed company",
          "Market values are always lower, giving a more prudent WACC",
          "Market values reflect the current opportunity cost of capital to investors, whereas book values are historical",
          "Book values already include the tax shield on debt",
        ],
        correct: 2,
        explain: "WACC represents the return investors currently require, so the weights should reflect what the finance is worth to them today — its market value. Book values are backward-looking accounting figures and would distort the blend. Market values are not systematically lower, and book values do not embed any tax shield.",
      },
    },
    {
      id: "structure",
      heading: "Capital structure — does gearing change WACC?",
      blocks: [
        { kind: "text", md: "If debt is cheaper than equity, could a firm cut its WACC — and so raise its value — simply by borrowing more? This is the **capital structure** question, and three views answer it differently. **Gearing** (the proportion of debt in the mix) is at the heart of all three." },
        { kind: "text", md: "The **traditional view** says yes, up to a point. As a firm adds cheap debt, WACC falls; but beyond an optimal level, shareholders and lenders start to demand more for the rising **financial risk**, and WACC climbs again. There is therefore an **optimal gearing** — a U-shaped WACC — though it can only be found by judgement, not formula." },
        { kind: "text", md: "**Modigliani and Miller (MM), without tax**, argued the opposite: in a perfect market, capital structure is **irrelevant**. As you add cheap debt, the extra financial risk pushes up the cost of equity by exactly enough to offset the saving, so WACC — and firm value — stay **flat** at every level of gearing." },
        { kind: "text", md: "**MM with tax** changed the conclusion. Because interest is tax-deductible, debt brings a **tax shield** that leaks value to shareholders. Now every extra pound of debt lowers WACC and raises firm value, implying — taken to its logic — a capital structure of **almost 100% debt**. In practice, the costs of financial distress and bankruptcy pull firms back from that extreme." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Modigliani-Miller — without tax vs with tax",
          data: {
            leftTitle: "MM without tax",
            rightTitle: "MM with tax",
            rows: [
              { aspect: "Effect of more debt on WACC", left: "No change — WACC constant", right: "WACC falls as gearing rises" },
              { aspect: "Effect on firm value", left: "Unchanged — structure irrelevant", right: "Rises by the value of the tax shield" },
              { aspect: "The tax shield on interest", left: "Ignored (no tax)", right: "The whole reason value rises" },
              { aspect: "Cost of equity as gearing rises", left: "Rises to exactly offset cheap debt", right: "Rises, but not enough to offset the shield" },
              { aspect: "Implied optimal gearing", left: "None — indifferent", right: "As much debt as possible (before distress)" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "Financial risk", md: "Adding debt adds **financial risk**: fixed interest must be paid in good years and bad, so what is left for shareholders becomes more **volatile**. This is why the cost of equity always rises with gearing — shareholders demand compensation for a bumpier ride, even when total business risk is unchanged." },
      ],
    },
    {
      id: "rights",
      heading: "Rights issues and the ex-rights price",
      blocks: [
        { kind: "text", md: "A **rights issue** raises new equity by offering existing shareholders the right to buy new shares in proportion to their holding, usually at a **discount** to the current price. Because the new shares are cheap, the market price settles to a new level after the issue — the **theoretical ex-rights price (TERP)** — which is just the weighted average of the old shares (at their pre-issue price) and the new shares (at the issue price)." },
        { kind: "formula", name: "Theoretical ex-rights price (TERP)", expr: "TERP = (N × cum-rights price + issue price) / (N + 1)", note: "For a 1-for-N issue: N existing shares at the cum-rights (pre-announcement) price, plus 1 new share at the issue price, averaged over the N + 1 shares now held." },
        { kind: "example", title: "Worked example — a 1-for-4 rights issue", scenario: "Cardingham plc has shares trading at $3.00 (cum-rights) and announces a 1-for-4 rights issue at $2.00. Find the theoretical ex-rights price and the value of a right.", steps: [
          { label: "Set up the ratio", detail: "1-for-4 means N = 4 existing shares entitle the holder to 1 new share, so 5 shares are held afterwards." },
          { label: "Value the existing shares", detail: "4 × $3.00 = **$12.00**." },
          { label: "Add the rights proceeds", detail: "1 new share × $2.00 = **$2.00**, giving $12.00 + $2.00 = $14.00 for 5 shares." },
          { label: "Average over 5 shares (TERP)", detail: "$14.00 / 5 = **$2.80** per share." },
          { label: "Value of a right (per new share)", detail: "TERP − issue price = $2.80 − $2.00 = **$0.80**." },
          { label: "Value per existing share held", detail: "$0.80 / 4 = **$0.20** — the gain a holder captures per share by taking up (or selling) the right." },
        ], result: "TERP = $2.80. A well-designed rights issue leaves a shareholder who takes up their rights no better and no worse off — their wealth is simply repackaged across more shares at a lower price." },
        { kind: "callout", tone: "tip", title: "Use the CUM-rights price", md: "The numerator uses the **cum-rights** price — the market price just before the issue is reflected. If a question gives you a price already quoted ex-rights, you do not need TERP; TERP is what you calculate to *find* that ex-rights price." },
      ],
      check: {
        q: "A company's shares trade at $2.40 cum-rights and it makes a 1-for-5 rights issue at $1.80. What is the theoretical ex-rights price?",
        options: ["$2.30", "$2.10", "$2.28", "$2.40"],
        correct: 0,
        explain: "TERP = (N × cum price + issue price) / (N + 1) = (5 × $2.40 + $1.80) / (5 + 1) = ($12.00 + $1.80) / 6 = $13.80 / 6 = $2.30. The tempting $2.10 is a plain average of $2.40 and $1.80 — wrong, because it ignores that five shares are held at the old price for every one new share.",
      },
    },
  ],
  examTraps: [
    { trap: "Using the cum-dividend or nominal price in the DGM or cost-of-debt formula.", fix: "Always use the ex-dividend / ex-interest MARKET value: P0 in the DGM and MV in Kd = i(1−t)/MV." },
    { trap: "Forgetting to add back Rf (or to subtract Rf) in CAPM.", fix: "Ke = Rf + β(Rm − Rf): scale the PREMIUM (Rm − Rf) by beta, then add Rf back on top." },
    { trap: "Deducting tax twice on redeemable debt.", fix: "If the IRR was found on after-tax cash flows, that Kd is already after-tax — do not multiply by (1 − t) again in the WACC." },
    { trap: "Giving preference shares a tax shield.", fix: "Preference dividends are not tax-deductible: Kp = d/MV with no (1 − t). Only interest gets tax relief." },
    { trap: "Weighting the WACC by book values.", fix: "Use MARKET values of equity and debt — they reflect the current opportunity cost investors require." },
  ],
  keyTerms: [
    { term: "Cost of equity (Ke)", def: "The return ordinary shareholders require, estimated by the dividend growth model (D1/P0 + g) or CAPM (Rf + β(Rm − Rf))." },
    { term: "Beta (β)", def: "A measure of a share's systematic (market-related) risk; β > 1 is more volatile than the market and demands a higher return." },
    { term: "Cost of debt (Kd)", def: "The after-tax return required by lenders — a simple ratio for irredeemable debt, an IRR of after-tax flows for redeemable debt." },
    { term: "WACC", def: "The weighted average cost of capital: each source's cost weighted by its market value, giving the firm's overall required return." },
    { term: "Gearing", def: "The proportion of debt in the capital structure; higher gearing adds financial risk and raises the cost of equity." },
    { term: "Theoretical ex-rights price (TERP)", def: "The weighted-average share price expected after a rights issue: (N × cum-rights price + issue price) / (N + 1)." },
  ],
  summary: [
    "Match the finance to the need — long-term assets with long-term finance; equity is dearer and permanent, debt is cheaper and tax-relieved.",
    "Cost of equity comes from the dividend growth model (Ke = D1/P0 + g, with g = b × r) or CAPM (Ke = Rf + β(Rm − Rf)).",
    "Cost of debt: irredeemable = i(1−t)/MV; redeemable = the IRR of after-tax cash flows; preference = d/MV with no tax relief.",
    "WACC blends the individual costs by MARKET-value weights — e.g. 12% equity and 7.9% debt weighted 13.0 : 9.5 give a WACC of 10.3%.",
    "Capital structure views differ: traditional (U-shaped WACC, an optimum exists), MM without tax (irrelevant), MM with tax (more debt lowers WACC via the tax shield).",
    "A rights issue settles to the TERP = (N × cum price + issue price) / (N + 1); the value of a right is TERP minus the issue price.",
  ],
}
