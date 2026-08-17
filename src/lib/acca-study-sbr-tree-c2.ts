import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * SBR · Area C, part 2 — Financial instruments, leases, employee benefits.
 *
 *   SBR-14  Instruments: debt-equity, classification and measurement  (C3a, C3b, C3d)
 *   SBR-15  Instruments: derecognition, derivatives and hedging       (C3c, C3e, C3f)
 *   SBR-16  Instruments: impairment — expected credit losses          (C3g, C3h, C3i)
 *   SBR-17  Leases                                                    (C4)
 *   SBR-18  Employee benefits                                         (C5)
 *
 * Written against the official ACCA SBR-INT syllabus and study guide for
 * September 2026 to June 2027. Not derived from any approved-provider text.
 * C3 is the syllabus's densest subsection (nine learning outcomes); the split
 * here follows the instrument lifecycle — what it is and how it measures, how
 * it leaves and how risk is hedged, and how its credit losses are provided for.
 */

const SBR_TREE_14: StudyChapter = {
  paper: "SBR",
  id: "SBR-14",
  number: 14,
  area: "C",
  syllabusRefs: ["C3(a)", "C3(b)", "C3(d)"],
  title: "Instruments: debt, equity, classification and measurement",
  minutes: 18,
  intro:
    "Financial instruments reporting starts with two sorting decisions — is the issuer's instrument debt or equity, and which measurement category does a holder's asset fall into? Both are substance tests, and both move gearing, profit and covenants when they flip.",
  outcomes: [
    "Classify issued instruments as liabilities or equity from the unavoidable-obligation test, and split compounds",
    "Classify financial assets from the business model and the contractual cash flow (SPPI) test",
    "Apply amortised cost, FVOCI and FVTPL measurement, including where gains and losses land",
    "Use and critique the fair value option and the FVOCI equity election",
    "Account for reclassifications — rare, prospective, and only on a business model change",
    "Read the reporting consequences: what each classification does to profit volatility and gearing",
  ],
  sections: [
    {
      id: "debt-vs-equity",
      heading: "The issuer's question: liability or equity?",
      blocks: [
        {
          kind: "text",
          md: "An issued instrument is a **financial liability** if the issuer has a contractual obligation it cannot avoid — to deliver cash or another financial asset, or to exchange instruments on potentially unfavourable terms. It is **equity** only where no such obligation exists: the issuer pays if and when it chooses. Names carry nothing. 'Preference shares' with mandatory redemption or cumulative compulsory dividends are debt; perpetual instruments with fully discretionary coupons are equity, whatever they are called on the cover.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The classification tells, read from the terms",
          items: [
            "**Redemption**: mandatory or holder-optional redemption → liability; issuer-optional or none → points to equity",
            "**Dividends/coupons**: contractually required (including 'cumulative' that must eventually be paid) → liability character; discretionary → equity",
            "**Contingent settlement**: obligations triggered by events outside the issuer's control → liability, unless the trigger is not genuine or arises only on liquidation",
            "**Fixed-for-fixed**: a derivative settled by exchanging a fixed number of own shares for a fixed amount of cash can be equity; variable share numbers make it a liability",
          ],
        },
        {
          kind: "text",
          md: "**Compound instruments** — convertible bonds are the exam staple — contain both: an obligation to pay interest and principal (liability) plus the holder's option to convert into a fixed number of shares (equity). Split at issue: the liability component is the present value of the cash flows discounted at the rate for an equivalent bond *without* conversion; equity is the residual. The consequences follow: interest expense accrues at the market rate on the liability component — not the low coupon that made the bond look cheap — and the equity component never remeasures.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why management fights this classification",
          md: "Debt-versus-equity moves gearing, interest cover and reported profit simultaneously: an instrument reclassified from equity to liability adds debt to the ratio and converts 'dividends' into finance costs. Scenarios put the instrument next to a covenant and let the drafting do the work — your job is to read the terms against the unavoidable-obligation test and say which metric the preferred classification is protecting.",
        },
      ],
      check: {
        q: "An entity issues 'perpetual capital notes': no maturity, coupons payable only if declared, but any missed coupon must be paid, with interest, before any ordinary dividend and in any event within five years. How should the notes classify?",
        options: [
          "Equity — there is no maturity and coupons are discretionary",
          "Liability — the requirement to pay missed coupons within five years is an unavoidable contractual obligation to deliver cash, so the discretion is temporary deferral, not avoidance",
          "Compound — split between the perpetual and coupon elements",
          "Equity, provided the entity intends never to pay",
        ],
        correct: 1,
        explain:
          "Trace the discretion to its end: the entity can delay coupons but cannot ultimately avoid them — a deferral mechanism inside an obligation is still an obligation. Genuine equity discretion means the holder may never receive the payment at all. Intention (option 3) is irrelevant; classification reads the contract, not the plan.",
      },
    },
    {
      id: "asset-classification",
      heading: "The holder's question: which measurement category?",
      blocks: [
        {
          kind: "text",
          md: "A financial asset's category comes from two tests run together. The **business model**: is the asset held to collect contractual cash flows, to collect and sell, or something else (trading, managed on fair value)? And the **SPPI test**: are the contractual cash flows solely payments of principal and interest on principal outstanding — basic lending economics of time value and credit risk? Collect + SPPI → **amortised cost**. Collect-and-sell + SPPI → **FVOCI (debt)**, with interest, impairment and FX in P&L and the fair value residue in OCI, recycling on sale. Everything else — including every instrument that fails SPPI, and all derivatives — → **FVTPL**.",
        },
        {
          kind: "table",
          caption: "The categories and where their numbers land",
          head: ["Category", "Qualifies", "P&L sees", "OCI sees"],
          rows: [
            ["Amortised cost", "Held to collect + SPPI", "Effective interest, impairment, derecognition results", "Nothing"],
            ["FVOCI (debt)", "Collect and sell + SPPI", "Effective interest, impairment, FX — as if amortised cost", "Fair value remainder; recycles on disposal"],
            ["FVTPL", "Trading, failed SPPI, derivatives, residual", "Everything, every period", "Nothing"],
            ["FVOCI equity election", "Non-trading equities, irrevocable choice", "Dividends only — ever", "All value changes; never recycles"],
          ],
        },
        {
          kind: "text",
          md: "SPPI fails where contractual terms introduce exposure beyond basic lending — returns linked to commodity prices or equity indices, leverage that amplifies rate movements, convertibility into shares (the holder of a convertible bond holds a hybrid whose option fails SPPI, putting the whole asset at FVTPL). The **fair value option** lets an entity designate an asset (or liability) at FVTPL at initial recognition where that eliminates an **accounting mismatch** — measuring linked positions on different bases. For designated liabilities there is a twist with teeth: fair value changes from the entity's **own credit risk** go to OCI, not profit — ending the embarrassment of entities booking gains because their own creditworthiness collapsed.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Reclassification is deliberately hard",
          md: "Assets reclassify **only** when the entity changes its business model — expected to be rare, demonstrable, and applied prospectively from the reclassification date. There is no reclassifying because prices moved: the discipline exists because pre-crisis practice let banks re-label falling assets out of fair value categories and bury the losses. Equity elections and the fair value option are irrevocable for the same reason — these are decisions, not dials.",
        },
      ],
      check: {
        q: "A treasurer holds a portfolio of corporate bonds, historically held to maturity, and proposes to 'reclassify to FVTPL now that rates are falling, to show the gains in profit'. The holding intention is unchanged. What is correct?",
        options: [
          "Reclassify — management intent determines category",
          "No reclassification: the business model has not changed, and wanting gains in profit is not a model change — the bonds stay at amortised cost, and the gains remain unrecognised",
          "Reclassify, but through OCI",
          "Sell and repurchase the bonds to achieve the same effect",
        ],
        correct: 1,
        explain:
          "Reclassification follows an actual, demonstrable change in how the portfolio is managed — same desks, same mandate, same collection intent means same category. Option 3 describes achieving the accounting by transacting, which is possible but has real costs and consequences (and a sale programme of 'held to collect' assets would itself evidence a model change going forward) — the scenario's point is that the label cannot simply be rewritten for the profit effect.",
      },
    },
    {
      id: "measurement-consequences",
      heading: "Measurement mechanics, and what the mix does to reported results",
      blocks: [
        {
          kind: "text",
          md: "**Amortised cost** runs on the effective interest rate — the rate that exactly discounts the instrument's expected cash flows through its life to its initial carrying amount (net of fees and transaction costs). Interest income and expense accrue at that constant rate, which is why below-market or fee-heavy instruments still report market-rate economics. Transaction costs capitalise into the initial measurement for everything **except FVTPL**, where they expense immediately — a detail scenarios use to test whether the category was chosen for the treatment.",
        },
        {
          kind: "illustration",
          title: "The same bond, three ways",
          md: "An entity buys a $10m 3% bond at a discount when market rates are 6%. At amortised cost, profit shows 6% effective interest each year and nothing else. At FVOCI, profit shows the same 6% — with the bond's price swings parked in OCI until sale. At FVTPL, profit shows interest plus every period's full price movement. Identical bond, identical cash flows: reported profit differs in both volatility and, period by period, amount. When a scenario's CFO expresses strong category preferences, this table is why.",
        },
        {
          kind: "examQuestion",
          title: "Advise on classification of an issued convertible and a held portfolio",
          format: "written",
          marks: 10,
          requirement: "Advise the directors on the classification and measurement of the convertible bond issued and the note portfolio acquired, and comment on the directors' proposals.",
          plan: [
            { step: "Split the convertible at issue", detail: "Value the liability as the PV of coupons and principal at the straight-debt rate; equity is the residual. State the interest consequence — effective rate on the liability, not the coupon." },
            { step: "Test the notes: model then SPPI", detail: "How is the portfolio actually managed, and are the contractual flows solely principal and interest? A profit-share or index-linked feature fails SPPI regardless of model." },
            { step: "Land each instrument in its category", detail: "State where gains, losses and interest report, and the volatility consequence." },
            { step: "Evaluate the proposals", detail: "Directors' preferences that require ignoring a failed SPPI test, or an undemonstrated model change, get named as classification shopping." },
            { step: "Sweep the disclosures", detail: "Compound split, judgements and category tables — the reader should be able to see the choices." },
          ],
          answer:
            "The convertible bond is a compound instrument: the obligation to pay 2% coupons and redeem at par is a financial liability, while the holders' right to convert into a fixed number of shares is equity. At issue the liability component is measured at the present value of the coupon and principal flows discounted at 7% — the rate the entity would pay on identical debt without conversion — with the residual of the proceeds credited to equity. Finance cost will therefore accrue at 7% on the liability component, not the 2% coupon; the directors' plan to charge 2% understates interest and overstates profit in every year of the bond's life, which given the interest-cover covenant appears to be the point.\n\nThe acquired notes pay interest plus 20% of the issuer's operating profit. The profit participation means the contractual cash flows are not solely payments of principal and interest — the entity is sharing business risk, not lending on basic terms — so the notes fail the SPPI test and must be measured at fair value through profit or loss regardless of the stated 'hold to collect' intention. The directors' preferred amortised-cost treatment is not available: business model cannot cure a failed cash-flow test.\n\nBoth conclusions require disclosure: the compound split and its discount rate as a measurement basis, and the SPPI judgement for the notes. The resulting profile — market-rate finance costs and fair value volatility from the notes — is the faithful representation of the instruments the entity actually chose to issue and hold.",
          earns: [
            "The compound split with the straight-debt discount logic",
            "Effective-rate interest consequence stated and quantified in direction",
            "SPPI failure identified and its non-negotiability explained",
            "Both proposals evaluated against the incentive",
          ],
          loses: [
            "Classifying the convertible whole as debt or equity",
            "Interest at the coupon rate",
            "Letting intention override the SPPI test",
            "No comment on why the directors prefer what they prefer",
          ],
        },
      ],
      check: {
        q: "An entity designates its own fixed-rate debt at FVTPL under the fair value option. During the year its credit rating collapses and the debt's fair value falls $30m. How does the movement report?",
        options: [
          "$30m gain in profit or loss",
          "The portion attributable to the entity's own credit deterioration goes to OCI (never recycled); only the remainder — from market rates and other factors — reports in profit or loss",
          "$30m gain in OCI in full",
          "No recognition — own debt is not remeasured",
        ],
        correct: 1,
        explain:
          "The own-credit rule targets exactly this: without it, the entity would book a $30m profit for becoming less likely to repay its lenders — a gain realisable only by defaulting. Splitting the movement keeps rate-driven changes in profit while parking the own-credit effect in OCI permanently. Option 3 forgets the entity elected fair value measurement.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Classifying issued instruments by their name.",
      fix: "Read the terms for the unavoidable obligation — redemption, compulsory coupons, contingent settlement — and follow it.",
    },
    {
      trap: "Charging a convertible's coupon rate as its interest expense.",
      fix: "Interest accrues at the straight-debt effective rate on the liability component; the cheap coupon was paid for with equity.",
    },
    {
      trap: "Letting a 'hold to collect' intention put a profit-linked note at amortised cost.",
      fix: "SPPI is a contractual test: any feature beyond principal, time value and credit risk sends the asset to FVTPL.",
    },
    {
      trap: "Reclassifying assets because market conditions or profit needs changed.",
      fix: "Only a demonstrated business model change reclassifies, prospectively — elections and designations are irrevocable.",
    },
  ],
  keyTerms: [
    { term: "Financial liability", def: "A contractual obligation to deliver cash or another financial asset, or to exchange instruments on potentially unfavourable terms — the issuer cannot avoid it." },
    { term: "Compound instrument", def: "An issued instrument with both liability and equity components — split at issue, liability first at the straight-debt present value, equity as residual." },
    { term: "SPPI test", def: "Whether contractual cash flows are solely payments of principal and interest on principal outstanding — basic lending economics; failure forces FVTPL." },
    { term: "Business model test", def: "How the entity actually manages a portfolio — to collect, collect and sell, or otherwise — assessed from evidence, not intention statements." },
    { term: "Effective interest rate", def: "The rate exactly discounting an instrument's expected cash flows to its initial net carrying amount — the constant return amortised cost reports." },
    { term: "Own credit risk (fair value option)", def: "For liabilities designated at FVTPL, fair value changes from the entity's own credit standing report in OCI and never recycle." },
  ],
  summary: [
    "Debt versus equity follows the unavoidable obligation; deferrable is not avoidable, and names carry nothing.",
    "Convertibles split — liability at the straight-debt PV, equity residual — and interest runs at the market rate.",
    "Asset categories come from model plus SPPI; failed SPPI is non-negotiable FVTPL.",
    "Each category writes a different profit signature — that, not theory, is why classifications get fought over.",
    "Reclassification needs a real model change; the option, the election and the designation are one-way doors.",
  ],
  knowledgeDiagnostic: [
    { q: "What single test separates liability from equity for the issuer?", a: "Whether the issuer has a contractual obligation it cannot ultimately avoid to deliver cash or another financial asset — discretion that only defers payment fails the test." },
    { q: "How is a convertible bond split and what does the split do to interest?", a: "Liability = present value of coupons and principal at the equivalent non-convertible rate; equity = residual proceeds. Interest then accrues at that market rate on the liability, well above the nominal coupon." },
    { q: "Which combinations produce each asset category?", a: "Hold-to-collect + SPPI: amortised cost. Collect-and-sell + SPPI: FVOCI debt with recycling. Anything else — trading, failed SPPI, derivatives: FVTPL. Non-trading equities may irrevocably elect FVOCI without recycling." },
    { q: "When may a financial asset reclassify?", a: "Only when the entity demonstrably changes the business model within which it is held — applied prospectively; never for intent, price movements or reporting preference." },
  ],
  furtherStudy: [
    "SBR-15 continues the lifecycle: derecognition, derivatives and hedge accounting",
    "SBR-16 adds the expected credit loss overlay on amortised cost and FVOCI debt",
    "SBR-08 mapped where each category's OCI items go and which recycle",
    "SBR-06's liability-versus-equity reasoning is the Framework version of this chapter's first section",
  ],
}

const SBR_TREE_15: StudyChapter = {
  paper: "SBR",
  id: "SBR-15",
  number: 15,
  area: "C",
  syllabusRefs: ["C3(c)", "C3(e)", "C3(f)"],
  title: "Instruments: derecognition, derivatives and hedging",
  minutes: 17,
  intro:
    "How instruments leave the books, how derivatives get onto them, and how hedge accounting re-times recognition so risk management and reported profit tell the same story. All three are substance disciplines — and all three have been used to tell other stories entirely.",
  outcomes: [
    "Apply the derecognition sequence to transferred financial assets — flows, risks and rewards, control",
    "Account for liability derecognition, including substantial modifications as extinguishments",
    "Recognise and measure derivatives, and explain why their small cost belies their exposure",
    "Qualify a hedge relationship — documentation, eligible items and instruments, effectiveness",
    "Apply fair value and cash flow hedge mechanics, including where each side's gains and losses report",
    "Evaluate what hedge accounting fixes, and the discipline that stops it becoming smoothing",
  ],
  sections: [
    {
      id: "derecognition",
      heading: "Derecognition — the transfer sequence",
      blocks: [
        {
          kind: "text",
          md: "A financial asset derecognises when the contractual rights to its cash flows **expire**, or when the asset is **transferred** and the transfer qualifies. The sequence: have the rights expired (collected, cancelled)? If not, has the entity transferred the rights — or assumed an obligation to pass the flows on under a qualifying pass-through? Then the substance tests: if **substantially all risks and rewards** transferred, derecognise; if substantially all were **retained**, keep the asset and record the proceeds as a borrowing; and in the genuinely mixed middle, the question becomes **control** — if the transferee can sell the asset unilaterally, derecognise; if not, recognise to the extent of the **continuing involvement**.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The derecognition ladder",
            data: {
              steps: [
                { label: "Rights expired?", sub: "Yes → derecognise; no → next" },
                { label: "Transferred?", sub: "Rights assigned, or qualifying pass-through" },
                { label: "Risks & rewards", sub: "Substantially all gone → off; substantially all kept → borrowing" },
                { label: "Control / continuing involvement", sub: "The mixed middle: transferee's practical ability to sell decides" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "The exam patterns repeat from SBR-06 with instrument-level machinery: factoring **with recourse** keeps the credit risk and therefore the receivables (proceeds = secured borrowing); **without recourse** transfers them (discount = the factor's charge, in profit). Repos and securities lending keep the asset — the repurchase obligation retains the exposure. Securitisations live in the middle: retained first-loss tranches and servicing rights are continuing involvement, recognised as such. The presentational stake is real — derecognition converts debt into 'sales', flattering gearing and operating cash flow at once.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Liabilities: extinguish, or account for a new deal",
          md: "A financial liability derecognises when discharged, cancelled or expired. Paying a third party to 'assume' the debt without the creditor's release does not qualify. And a **substantial modification** of terms — the working threshold being a ≥10% change in discounted cash flows, or a qualitative transformation — is accounted for as extinguishing the old liability and recognising a new one at fair value, difference to profit or loss. This is the gate that makes distressed refinancings show their economics rather than smoothing invisibly through the carrying amount.",
        },
      ],
      check: {
        q: "An entity securitises $200m of mortgages, selling them to a vehicle that issues notes to investors. The entity retains a $10m first-loss tranche absorbing initial defaults (expected losses: $6m) and continues servicing for a market fee. What is the reporting?",
        options: [
          "Full derecognition — the mortgages were legally sold",
          "The risks-and-rewards test is not clearly passed: the first-loss position retains the bulk of expected credit risk, so the entity has neither transferred nor retained substantially all — the outcome rests on control, and continuing-involvement accounting to the extent of the retained exposure is likely",
          "No derecognition — securitisations never qualify",
          "Derecognise and expense the $10m tranche immediately",
        ],
        correct: 1,
        explain:
          "A first-loss tranche covering well above expected losses concentrates the portfolio's real risk in the seller's hands — that is what defeats 'substantially all transferred'. But upside beyond the tranche has genuinely gone, defeating 'substantially all retained' too, which is exactly the mixed middle the continuing-involvement model exists for. Legal sale (option 0) answers a different question, and the consolidation status of the vehicle would also need checking.",
      },
    },
    {
      id: "derivatives",
      heading: "Derivatives — small price, full exposure",
      blocks: [
        {
          kind: "text",
          md: "A derivative has three features: its value moves with an **underlying** (rate, price, index); it requires **little or no initial investment**; and it settles at a **future date**. All derivatives measure at **FVTPL** — no cost model, no OCI (outside hedge accounting) — because a derivative's cost tells you nothing about its exposure: a forward costing nothing can commit the entity to buying $100m of currency. That mismatch between cost and exposure is why pre-recognition practice let derivative losses appear from 'nowhere', and why the standard's insistence on fair value every period is non-negotiable.",
        },
        {
          kind: "text",
          md: "**Embedded derivatives** hide inside host contracts — a payment formula linked to a commodity index inside a supply agreement, an equity kicker inside a loan. Where the host is a financial asset in IFRS 9's scope, the whole instrument simply takes the classification tests (usually failing SPPI into FVTPL). For other hosts — liabilities, leases, insurance, service contracts — an embedded derivative **separates** and measures at FVTPL when its economics are not closely related to the host's. The purpose is anti-avoidance: without separation, any derivative could be laundered into cost-based accounting by stapling it inside a purchase order.",
        },
        {
          kind: "illustration",
          title: "The hedge that was a position",
          md: "A treasurer 'hedges' fuel costs with options — and, as prices fall, doubles the position to 'average down', then adds contracts in a different fuel grade with better 'value'. Fair value discipline reports each period's result as it happens, which is precisely what reveals the drift from hedging to speculation: a hedge's losses should be met by savings on the hedged purchases; a position's losses are just losses. Scenarios use the drift; the answer uses the reporting to expose it, and notes that none of these contracts would qualify for hedge accounting without designation, documentation and an actual hedged exposure.",
        },
      ],
      check: {
        q: "An airline signs a four-year contract to buy jet fuel at a price indexed to a basket of unrelated commodities including gold. How should the pricing feature be treated?",
        options: [
          "Nothing separate — it is a normal purchase contract",
          "The gold-linked formula is an embedded derivative whose economics are not closely related to a fuel purchase host: it separates and measures at FVTPL, while the host contract is accounted for as a normal purchase",
          "The entire contract measures at FVTPL",
          "The feature is disclosed but not recognised",
        ],
        correct: 1,
        explain:
          "Fuel indexed to fuel would be closely related — the formula would just be how fuel is priced. Gold in a fuel contract imports an unrelated exposure, which is the separation trigger: without it, the airline holds a gold derivative that never meets fair value measurement. The host continues as an executory purchase contract; only the alien feature is carved out.",
      },
    },
    {
      id: "hedge-accounting",
      heading: "Hedge accounting — re-timing, under discipline",
      blocks: [
        {
          kind: "text",
          md: "Without hedge accounting, a perfect economic hedge can wreck reported profit: the derivative remeasures through P&L every period while the hedged item — a forecast purchase, a fixed-rate loan at amortised cost — does not. Hedge accounting fixes the **timing mismatch**, and only that, in two patterns. A **fair value hedge** (hedging value changes of a recognised item or firm commitment): remeasure the hedged item for the hedged risk through P&L too, so both sides meet in profit. A **cash flow hedge** (hedging variability of future flows, including forecast transactions): park the effective portion of the derivative's movement in **OCI**, releasing it to P&L when the hedged flows arrive — or into the initial carrying amount of a non-financial asset acquired (basis adjustment).",
        },
        {
          kind: "table",
          caption: "The two hedge patterns",
          head: ["", "Fair value hedge", "Cash flow hedge"],
          rows: [
            ["Hedged exposure", "Value of a recognised item / firm commitment", "Variability of future cash flows, forecast transactions"],
            ["Derivative movement", "P&L", "Effective portion to OCI; ineffectiveness to P&L"],
            ["Hedged item", "Adjusted for hedged risk, through P&L", "Unchanged until the flows occur"],
            ["Meeting point", "Both sides in P&L now", "Reserve recycles as the hedged flows hit P&L (or basis-adjusts)"],
            ["Classic example", "Fixed-rate debt hedged with a pay-float swap", "Forecast currency purchase hedged with a forward"],
          ],
        },
        {
          kind: "text",
          md: "The privilege is gated. **Designation and documentation at inception** — the relationship, the risk, the entity's risk management objective — so hedges cannot be declared retrospectively over whichever contracts happened to win. **Qualifying criteria**: an economic relationship between item and instrument, credit risk not dominating, and a **hedge ratio** matching the one actually used for risk management — the principles-based effectiveness test that replaced the old bright-line percentage corridor. Ineffectiveness measures and reports in P&L as it arises. Discontinue prospectively when the criteria fail or the forecast transaction is no longer highly probable — at which point a cash flow hedge reserve for a dead forecast reclassifies to P&L immediately.",
        },
        {
          kind: "examQuestion",
          title: "Explain the reporting of a cash flow hedge of a forecast purchase",
          format: "written",
          marks: 8,
          requirement: "Explain how the forward contracts and the forecast purchase should be reported in the current and following year, and the consequences if the purchase no longer occurs.",
          plan: [
            { step: "Establish qualification", detail: "Designation and documentation at inception, a highly probable forecast transaction, economic relationship and an aligned hedge ratio — say each is met or what fails." },
            { step: "Report the current year", detail: "Derivative at fair value; effective portion of the gain or loss to the cash flow hedge reserve in OCI, any ineffectiveness to P&L." },
            { step: "Report the transaction year", detail: "Basis adjustment into inventory (non-financial item) or recycling as the purchase affects profit — state which and why." },
            { step: "Handle the failure case", detail: "Forecast no longer highly probable → discontinue prospectively; no longer expected at all → reserve to P&L immediately." },
            { step: "Say what the accounting achieves", detail: "The hedge result and the hedged cost meet in the same measure of profit — the timing fix, not a profit cushion." },
          ],
          answer:
            "The forwards hedge the variability in the functional-currency cost of a highly probable forecast purchase, and were designated and documented at inception with a one-to-one ratio matching the treasury policy — the relationship qualifies as a cash flow hedge.\n\nAt the current year end the forwards are recognised at fair value. The movement is effective in offsetting the change in the expected purchase cost, so it is recognised in other comprehensive income in the cash flow hedge reserve; had the forwards' movement exceeded the change in the hedged expected cost, the excess would be ineffectiveness recognised immediately in profit or loss.\n\nWhen the inventory is purchased next year, the accumulated reserve is included directly in its initial carrying amount as a basis adjustment. The hedged rate therefore flows into cost of sales as the inventory sells — the derivative result and the purchase it protected meet in the same line, which is the entire objective of the designation.\n\nIf volumes are cut and the purchase is no longer highly probable, hedge accounting discontinues prospectively: the reserve remains until the transaction occurs or is no longer expected. If the purchase will not happen at all, the accumulated amount reclassifies to profit or loss immediately — the reserve cannot be warehoused against a transaction that no longer exists, which is the safeguard stopping dead hedges becoming a smoothing jar.",
          earns: [
            "Qualification stated, not assumed",
            "Effective-to-OCI, ineffective-to-P&L split",
            "Basis adjustment on the non-financial purchase",
            "Both failure cases — discontinuation versus immediate recycling — distinguished",
          ],
          loses: [
            "Deferring the entire derivative movement without an ineffectiveness test",
            "Recycling to P&L when the item is inventory that basis-adjusts",
            "Keeping the reserve after the forecast dies",
            "No statement of what hedge accounting is for",
          ],
        },
      ],
      check: {
        q: "An entity hedges its fixed-rate borrowing with a pay-floating swap, designated as a fair value hedge of interest rate risk. Rates rise sharply. How do the two sides report?",
        options: [
          "Swap gain to P&L; the borrowing remains at amortised cost — mismatch is inherent",
          "Swap loss in OCI until the interest payments occur",
          "The swap's fair value loss reports in P&L, and the borrowing's carrying amount is adjusted for the change in its fair value attributable to rate risk — a gain — also through P&L, so the offset shows where it belongs",
          "Neither side reports until settlement",
        ],
        correct: 2,
        explain:
          "The fair value hedge mechanic adjusts the hedged item for the hedged risk precisely so both legs meet in profit: rising rates hurt the receive-fixed swap and help the fixed-rate borrower, and P&L shows the near-offset that reflects the economics. (Check the direction each way: the swap here pays floating and receives fixed, so rising rates produce a swap loss and a fall in the debt's fair value — a gain on remeasuring the liability.) Option 1 describes cash flow hedge mechanics — the wrong pattern for hedging a recognised item's value.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Derecognising transferred assets whose risks stayed home.",
      fix: "Run the ladder: recourse, guarantees, repos and first-loss tranches keep the exposure — and the asset.",
    },
    {
      trap: "Smoothing a substantial debt restructuring through the old carrying amount.",
      fix: "A substantial modification extinguishes: new liability at fair value, difference through profit or loss now.",
    },
    {
      trap: "Leaving embedded exposures inside cost-based hosts.",
      fix: "Not-closely-related features separate to FVTPL; financial-asset hosts take the whole-instrument classification tests instead.",
    },
    {
      trap: "Treating hedge accounting as optional deferral of whatever loss is inconvenient.",
      fix: "Designation at inception, documented, effective — and dead forecasts recycle their reserve immediately.",
    },
  ],
  keyTerms: [
    { term: "Pass-through arrangement", def: "A transfer where the entity keeps the contractual rights but assumes an obligation to remit the flows — qualifying only with no reinvestment, no delay, and no recourse beyond the flows collected." },
    { term: "Continuing involvement", def: "The middle of the derecognition ladder: recognising a transferred asset to the extent of retained exposure when risks and rewards are neither substantially transferred nor retained and control was not surrendered." },
    { term: "Substantial modification", def: "A change in a liability's terms large enough — quantitatively or qualitatively — to account for as extinguishing the old debt and recognising a new one at fair value." },
    { term: "Embedded derivative", def: "A derivative wrapped inside a host contract, separated to FVTPL when its economics are not closely related to the host's." },
    { term: "Cash flow hedge reserve", def: "The OCI accumulation of a hedging instrument's effective gains and losses, released as the hedged flows affect profit or into a non-financial asset's initial cost." },
    { term: "Hedge effectiveness", def: "The qualifying requirement of an economic relationship, credit risk not dominating, and a hedge ratio aligned with actual risk management — with ineffectiveness measured to P&L as it arises." },
  ],
  summary: [
    "Derecognition walks a ladder — expiry, transfer, risks and rewards, control — and recourse or repurchase terms stop the walk early.",
    "Substantially modified liabilities are new liabilities; the difference reports now, not never.",
    "Derivatives are exposure without cost: fair value through profit every period, and embedded ones separate rather than hide.",
    "Hedge accounting is a timing fix under discipline — designated at inception, effective, with ineffectiveness reported as it arises.",
    "Fair value hedges meet in P&L by adjusting the item; cash flow hedges park in OCI and meet the flows — or die into P&L when the forecast does.",
  ],
  knowledgeDiagnostic: [
    { q: "State the derecognition ladder in order.", a: "Rights expired; transfer (assignment or qualifying pass-through); substantially all risks and rewards transferred (off) or retained (borrowing); otherwise control — transferee's practical ability to sell — with continuing-involvement accounting in the middle." },
    { q: "When does a liability modification hit profit immediately?", a: "When it is substantial — a change of roughly ten per cent or more in discounted cash flows, or a qualitative transformation — because the old liability extinguishes and the new one recognises at fair value, with the difference in P&L." },
    { q: "Why do all derivatives measure at FVTPL?", a: "Because near-zero cost carries full notional exposure — cost-based measurement would report nothing until settlement, letting losses accumulate invisibly." },
    { q: "Contrast where the two hedge patterns put the derivative's gains and losses.", a: "Fair value hedge: in P&L, with the hedged item adjusted through P&L for the hedged risk to meet it. Cash flow hedge: effective portion to OCI, recycled as the hedged flows occur or basis-adjusted into a non-financial asset; ineffectiveness to P&L immediately." },
  ],
  furtherStudy: [
    "SBR-14 supplies the classification and measurement these lifecycle events act on",
    "SBR-16 adds the credit-loss overlay that recourse and retained tranches expose the entity to",
    "SBR-10's repurchase diagnostics are this chapter's ladder applied to revenue structures",
    "Area D's disposal chapters use the same lost-control logic at entity scale",
  ],
}

const SBR_TREE_16: StudyChapter = {
  paper: "SBR",
  id: "SBR-16",
  number: 16,
  area: "C",
  syllabusRefs: ["C3(g)", "C3(h)", "C3(i)"],
  title: "Instruments: expected credit losses",
  minutes: 16,
  intro:
    "Expected credit losses replaced the model that waited for defaults to happen before providing for them. The three-stage general approach, the significant-increase trigger, and the purchased-credit-impaired regime are all judgement machinery — and every judgement moves the allowance.",
  outcomes: [
    "Explain why the incurred-loss model failed and what the ECL model changed",
    "Apply the three-stage general approach — 12-month versus lifetime losses, gross versus net interest",
    "Assess significant increase in credit risk, including the presumptions and the low-credit-risk shortcut",
    "Build an ECL as a probability-weighted, discounted, forward-looking estimate",
    "Apply the simplified approach to trade receivables and the special regime for purchased or originated credit-impaired assets",
    "Challenge a scenario's allowance the way the examiner intends — staging, scenarios, overlays and direction",
  ],
  sections: [
    {
      id: "why-expected",
      heading: "From incurred to expected — and the three stages",
      blocks: [
        {
          kind: "text",
          md: "The old model recognised credit losses only on **objective evidence** that a loss event had occurred — with the built-in consequence that lenders reported healthy interest income on deteriorating books right up to the cliff edge, then provided too little, too late. The ECL model provides from **day one**: every in-scope asset (amortised cost and FVOCI debt, plus lease receivables, contract assets, loan commitments and financial guarantees) carries an allowance for expected losses, updated each period for changes in credit risk and in the outlook.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The general approach's three stages",
            data: {
              steps: [
                { label: "Stage 1 — performing", sub: "12-month ECL; interest on gross carrying amount" },
                { label: "Stage 2 — significant increase", sub: "Lifetime ECL; interest still on gross" },
                { label: "Stage 3 — credit-impaired", sub: "Lifetime ECL; interest on net (amortised cost after allowance)" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Stage 1's **12-month ECL** is not the losses expected in the next year — it is the **lifetime loss from default events possible within 12 months**, probability-weighted. The move to Stage 2 on a **significant increase in credit risk** brings the full lifetime loss into the allowance *before* default, which is the model's whole point; Stage 3 — credit-impaired, with observable evidence like breach, concession or likely bankruptcy — additionally switches interest income to the net carrying amount, ending the practice of accruing full income on money that is not coming back.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The cliff the staging creates — and the incentive",
          md: "Moving a large exposure from Stage 1 to Stage 2 multiplies its allowance, so **staging is where management judgement concentrates**: criteria drawn loosely enough that nothing significant ever 'significantly increases', modifications and short-term waivers used to reset the clock, and thresholds recalibrated in the year the move would hurt. When a scenario shows a borrower on its second covenant waiver still sitting in Stage 1, that is the finding.",
        },
      ],
      check: {
        q: "A bank accrues full contractual interest on a loan whose borrower has entered restructuring talks after missing two payments, and holds a 12-month ECL allowance. What is wrong?",
        options: [
          "Nothing — interest follows the contract until write-off",
          "The loan is credit-impaired: missed payments and restructuring are objective evidence, so it belongs in Stage 3 with a lifetime allowance and interest recognised on the net carrying amount — the current treatment overstates both income and the asset",
          "The loan should move to Stage 2 but keep gross interest",
          "Interest should stop entirely",
        ],
        correct: 1,
        explain:
          "Two missed payments plus restructuring negotiations are the standard's own examples of credit-impairment evidence — this is past 'significant increase' and into Stage 3, where the allowance is lifetime and, critically, interest accrues on amortised cost net of the allowance. Option 2 catches the allowance error but leaves the income overstatement; option 3 overshoots — the net carrying amount still earns effective interest.",
      },
    },
    {
      id: "sicr-and-measurement",
      heading: "The Stage 2 trigger, and building the number",
      blocks: [
        {
          kind: "text",
          md: "**Significant increase in credit risk** compares the risk of default now with the risk **at initial recognition** — a relative test, not an absolute quality bar. It uses reasonable and supportable information available without undue cost or effort, forward-looking as well as historical: internal grade migrations, external ratings, price and spread signals, covenant stress, sector and macro outlook. Two calibration devices: a **rebuttable presumption** that 30 days past due signals significant increase (a backstop, not the criterion — waiting for arrears defeats the design), and an optional **low-credit-risk shortcut** keeping investment-grade-equivalent exposures in Stage 1 without further tracking. Default itself carries a rebuttable presumption at 90 days past due.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What a compliant ECL must be",
          items: [
            "**Probability-weighted** — an unbiased mean across scenarios, never just the most likely outcome; the loss must be provided for even where non-default is more likely than not",
            "**Discounted** — at the asset's original effective interest rate, to the reporting date",
            "**Forward-looking** — incorporating supportable forecasts of economic conditions, not just loss history",
            "**Exposure-complete** — including undrawn commitment amounts expected to be drawn before default",
            "In practice, PD × LGD × EAD by scenario — probability of default, loss given default (net of collateral, discounted), exposure at default",
          ],
        },
        {
          kind: "illustration",
          title: "Auditing the model against the exhibit",
          md: "A scenario lender's ECL uses three economic scenarios weighted 40/40/20 — with the 'downside' scenario milder than the economics already described in the exhibit, collateral haircuts unchanged since origination despite a property market fall stated two paragraphs earlier, and a management overlay *releasing* model-driven provisions 'for double-counting'. Each element is individually arguable; the pattern — every judgement lightening the allowance — is the SBR-01 direction test failing. The answer names the internal contradictions with the exhibit, not just the abstract requirements.",
        },
      ],
      check: {
        q: "A lender's policy moves loans to Stage 2 'only when arrears exceed 30 days, as permitted by the standard'. During the year a major corporate borrower's rating fell four notches and its sector entered recession; it has never missed a payment. Where does it belong?",
        options: [
          "Stage 1 — the 30-day presumption is not met",
          "Stage 2 — the rating collapse and sector outlook are forward-looking evidence of significant increase since origination; the 30-day presumption is a backstop for information gaps, not a licence to ignore available indicators",
          "Stage 3 — a four-notch fall is credit-impairment",
          "Stage 1, if the loan is collateralised",
        ],
        correct: 1,
        explain:
          "The policy inverts the design: the model exists to provide before arrears, using the information the lender demonstrably has. Payment performance is a lagging indicator; ratings and sector data are the leading ones the assessment must use. Collateral (option 3) affects loss given default — the size of the ECL — not the staging, and credit-impairment needs objective evidence of a loss event, not just deterioration.",
      },
    },
    {
      id: "simplified-and-poci",
      heading: "Trade receivables, and assets born impaired",
      blocks: [
        {
          kind: "text",
          md: "For **trade receivables and contract assets** without significant financing (and, by policy choice, those with it, plus lease receivables), the **simplified approach** skips staging entirely: **lifetime ECL always**, typically via a **provision matrix** — historical loss rates by ageing bucket, adjusted for current conditions and forecasts. The matrix is only as honest as its adjustments: pre-recession loss rates applied to a recession-bound book understate, and scenarios stage exactly that, often alongside a concentration (one customer dominating the book) that a portfolio-rate matrix cannot capture and which needs individual assessment.",
        },
        {
          kind: "text",
          md: "**Purchased or originated credit-impaired (POCI)** assets — bought distressed, or originated to a borrower already impaired — get a different engine: no day-one allowance (the expected losses are already in the purchase price), a **credit-adjusted effective interest rate** calculated from expected rather than contractual cash flows, and thereafter only **changes** in lifetime ECL recognised — favourable changes as impairment gains, even above the initial expectation. The design stops double-counting: providing again for losses the discount already priced would overstate losses on day one and manufacture recovery gains later — the distressed-debt buyer's classic earnings machine.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "FVOCI debt: the allowance with no separate line",
          md: "ECL on FVOCI debt instruments recognises in P&L against OCI — the balance-sheet carrying amount stays at fair value (which already embeds the market's credit view), so no separate allowance account appears. The effect: the split between 'credit loss' (P&L) and 'other fair value movement' (OCI) is itself an estimate, and one worth a sceptical sentence when a scenario's entity books most of a fallen bond's decline as 'market factors'.",
        },
      ],
      check: {
        q: "A fund buys defaulted loans with face value $100m for $40m, expecting to collect $55m. Management proposes recognising a day-one lifetime ECL allowance of $45m 'for prudence'. What is correct?",
        options: [
          "The allowance is required — all in-scope assets carry ECL from day one",
          "No day-one allowance: the assets are POCI, initially measured at the $40m paid with a credit-adjusted EIR built from the $55m expected flows; only subsequent changes in expected lifetime losses — in either direction — are recognised",
          "Recognise the $45m allowance and a matching day-one gain",
          "Measure the loans at face value of $100m less the allowance",
        ],
        correct: 1,
        explain:
          "The $60m of expected non-collection is already inside the price — recognising it again would double-count, and the 'prudent' allowance would unwind as future gains exactly when management wanted them (the big-bath pattern in credit clothing). The POCI engine prices the impairment into the interest rate once and then reports only genuine changes in expectation.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Waiting for arrears before moving stages.",
      fix: "The assessment is forward-looking and relative to origination; 30 and 90 days past due are rebuttable backstops, not criteria.",
    },
    {
      trap: "Providing the most likely outcome instead of the weighted mean.",
      fix: "ECL is probability-weighted across scenarios and discounted at the original EIR — a 20% default chance is a provision, not a nil.",
    },
    {
      trap: "Running a provision matrix on yesterday's economy.",
      fix: "Historical rates adjust for current conditions and forecasts, and dominant single customers need individual assessment.",
    },
    {
      trap: "Layering a day-one allowance onto purchased distressed debt.",
      fix: "POCI assets price losses into the credit-adjusted EIR; only subsequent changes in lifetime expectations report.",
    },
  ],
  keyTerms: [
    { term: "Expected credit loss", def: "The probability-weighted present value of cash shortfalls over the relevant horizon, discounted at the original effective interest rate, incorporating forward-looking information." },
    { term: "12-month ECL", def: "The portion of lifetime losses arising from default events possible within 12 months of the reporting date — Stage 1's allowance." },
    { term: "Significant increase in credit risk", def: "The Stage 2 trigger: default risk now materially higher than at initial recognition, judged on forward-looking evidence with a rebuttable 30-days-past-due backstop." },
    { term: "Credit-impaired (Stage 3)", def: "Objective evidence of a loss event — breach, concession, likely bankruptcy — switching interest to the net carrying amount alongside lifetime ECL." },
    { term: "Provision matrix", def: "The simplified approach's practical tool: historical loss rates by ageing bucket, adjusted for current and forecast conditions." },
    { term: "POCI asset", def: "A purchased or originated credit-impaired asset carrying no day-one allowance, a credit-adjusted effective rate from expected flows, and recognition only of subsequent ECL changes." },
  ],
  summary: [
    "ECL provides before default: 12-month losses in Stage 1, lifetime from the significant-increase trigger, net-interest in Stage 3.",
    "Staging is the judgement concentrate — waiver games and loose criteria are the tells to name.",
    "The number is a weighted, discounted, forward-looking mean; most-likely-outcome provisioning is the classic understatement.",
    "Trade books take lifetime losses through an honestly updated matrix; concentrations assess individually.",
    "POCI assets never re-provide the purchase discount — the credit-adjusted EIR carries it, and only changes report.",
  ],
  knowledgeDiagnostic: [
    { q: "What does each stage of the general approach hold, and what does interest accrue on?", a: "Stage 1: 12-month ECL, interest on gross. Stage 2: lifetime ECL, interest on gross. Stage 3: lifetime ECL with interest on the net carrying amount." },
    { q: "Why is the Stage 2 test relative to initial recognition?", a: "Because the original pricing already compensated for origination-date risk — the allowance jump is for deterioration since, so a loan originated risky but stable stays in Stage 1 while a safe loan gone worse moves." },
    { q: "Name the three components most ECL models multiply, and the two disciplines applied to the product.", a: "Probability of default, loss given default and exposure at default, by scenario — then probability-weighted across scenarios and discounted at the original effective interest rate." },
    { q: "How does the POCI regime prevent manufactured recoveries?", a: "By embedding expected losses in a credit-adjusted effective rate at purchase: with no day-one allowance to release, only genuine changes in lifetime expectations — up or down — ever reach profit." },
  ],
  furtherStudy: [
    "SBR-14 defines the categories the allowance overlays, and SBR-15 the transfers that shed or retain the risk",
    "SBR-12's assumption-audit method applies wholesale to ECL models",
    "SBR-02's direction test is the lens for staging policies and overlays",
    "Area E reads allowance coverage and staging mix as earnings-quality signals",
  ],
}

const SBR_TREE_17: StudyChapter = {
  paper: "SBR",
  id: "SBR-17",
  number: 17,
  area: "C",
  syllabusRefs: ["C4(a)", "C4(b)", "C4(c)", "C4(d)", "C4(e)", "C4(f)"],
  title: "Leases",
  minutes: 17,
  intro:
    "IFRS 16 ended the off-balance-sheet operating lease for lessees: if you control the use of an identified asset, the right and the obligation both report. SBR examines the boundaries — what is a lease, what enters the liability, when it remeasures, and the sale-and-leaseback that tests everything at once.",
  outcomes: [
    "Identify a lease from the identified-asset and right-to-control tests, including substitution rights",
    "Measure the lease liability and right-of-use asset, knowing which payments enter and which stay out",
    "Apply the recognition exemptions and separate lease from non-lease components",
    "Remeasure the liability when terms, assessments or rates change — through the asset, not profit",
    "Account for lessors — finance versus operating, and subleases classified by reference to the head ROU asset",
    "Account for sale and leaseback under the control test, with the gain restricted to rights transferred",
  ],
  sections: [
    {
      id: "definition-and-scope",
      heading: "Is it a lease? Control of an identified asset",
      blocks: [
        {
          kind: "text",
          md: "A contract contains a lease when it conveys the **right to control the use of an identified asset** for a period in exchange for consideration. Two tests. The asset must be **identified** — specified explicitly or implicitly, with no **substantive substitution right** in the supplier's hands (substantive means the supplier practically *can* substitute and would *benefit economically* from doing so — a clause written to defeat lease accounting fails if substitution would cost more than it saves). And the customer must have the right to obtain **substantially all the economic benefits** from the asset's use *and* to **direct how and for what purpose** it is used.",
        },
        {
          kind: "text",
          md: "The definition polices the service/lease boundary, and scenarios sit on it: a dedicated fibre line, a specified plant operated by the supplier under the customer's production schedule, capacity contracts. A **capacity portion** is an identified asset only if physically distinct (a floor of a warehouse yes; 40% of a pipeline's capacity no). Where the supplier decides how and for what purpose the asset runs, the customer is buying a service; where those decisions are predetermined by contract, whoever designed the asset's use holds the direction right.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What enters the lease liability — and what never does",
          items: [
            "**In**: fixed payments (including in-substance fixed), less incentives receivable",
            "**In**: variable payments that depend on an **index or rate** — measured at the current index, remeasured as it changes",
            "**In**: residual value guarantees (amounts expected payable), purchase options reasonably certain to be exercised, termination penalties if the term reflects termination",
            "**Out, permanently**: variable payments linked to **use or performance** — per-mile charges, revenue-based rents — expensed as incurred",
            "Discounted at the **rate implicit in the lease** or, failing that, the lessee's **incremental borrowing rate**",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The structuring the definition invites",
          md: "Every boundary invites drafting: cosmetic substitution clauses, payments recast as 'usage-based' with minimum volumes that make them fixed in substance, terms chopped short with penalty structures that make renewal certain. The in-substance tests exist for each — and an SBR answer that identifies *which* boundary the scenario's contract was drafted against, and why the substance test defeats it, is doing the paper's core job.",
        },
      ],
      check: {
        q: "A retailer 'leases' delivery capacity: the supplier commits ten specified vans, but the contract lets it substitute vehicles at will. Substituted vans must be repainted in the retailer's livery and refitted with its racking, at the supplier's cost of about $8,000 per van. Is there an identified asset?",
        options: [
          "No — a contractual substitution right always defeats identification",
          "Yes — the substitution right is not substantive: the supplier would incur repainting and refit costs with no economic benefit from swapping, so in practice the ten vans are the identified assets",
          "No — vans are fungible assets",
          "Yes, but only if the retailer consents to each substitution",
        ],
        correct: 1,
        explain:
          "Substantive substitution needs both practical ability and economic benefit to the supplier. A right that costs $8,000 a swap and earns nothing is drafting, not economics — precisely the cosmetic clause the two-part test exists to see through. Fungibility (option 2) is irrelevant once specific vans are committed and swapping them is value-destroying.",
      },
    },
    {
      id: "lessee-model",
      heading: "The lessee model: measurement, exemptions, remeasurement",
      blocks: [
        {
          kind: "text",
          md: "At commencement the lessee recognises a **lease liability** (present value of unpaid lease payments) and a **right-of-use asset** (liability plus prepaid amounts, initial direct costs, and estimated restoration obligations, less incentives). Thereafter: interest unwinds on the liability, the ROU asset depreciates (usually straight-line over the shorter of term and life), so total expense **front-loads** relative to the old straight-line rent — and EBITDA improves, because rent became depreciation plus interest. Two **exemptions** keep the model proportionate: leases of **12 months or less** (no purchase option) and leases of **low-value** assets — expense straight-line, by choice.",
        },
        {
          kind: "text",
          md: "The **lease term** is the non-cancellable period plus optional periods where exercise (or non-termination) is **reasonably certain** — judged from economic incentives: below-market renewal rates, heavy leasehold improvements, relocation costs, the asset's specialisation. Term judgement is the liability's biggest lever: five two-year 'leases' with certain renewals are a ten-year liability. **Separating components**: allocate consideration between lease and non-lease components (maintenance, services) on stand-alone prices — or elect, by asset class, to combine, which enlarges the liability. ",
        },
        {
          kind: "table",
          caption: "Remeasurement — what changed, which rate, where it lands",
          head: ["Trigger", "Discount rate", "Landing"],
          rows: [
            ["Index or rate moves the payments", "Unchanged (unless floating-rate driven)", "Liability remeasured against the ROU asset"],
            ["Reassessed term or purchase option (reasonable certainty changes)", "Revised rate", "Liability against the ROU asset"],
            ["Residual value guarantee expectation changes", "Unchanged", "Liability against the ROU asset"],
            ["Modification adding a distinct ROU at market rate", "—", "A separate new lease"],
            ["Other modifications (scope cut, price change)", "Revised rate", "Scope decreases: partial ROU derecognition with gain or loss to P&L; otherwise against the ROU asset"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Adjust the asset, not the profit",
          md: "The remeasurement grammar is consistent: changed expectations about the *future* adjust the liability against the ROU asset and spread through future depreciation — only a modification that hands capacity back crystallises a P&L effect now, on the proportion derecognised. Scenarios test the grammar by tempting you (or management) to book a remeasurement gain in profit.",
        },
      ],
      check: {
        q: "Three years into a ten-year lease, a market rent review linked to an index raises payments 15%. Management proposes charging the increase's full present value to profit or loss immediately 'as an onerous adjustment'. What is correct?",
        options: [
          "Charge to P&L as proposed",
          "Remeasure the liability at the new index level — discount rate unchanged — with the adjustment added to the right-of-use asset, reaching profit through higher depreciation and interest over the remaining term",
          "Ignore until each payment falls due",
          "Treat the lease as terminated and re-recognised",
        ],
        correct: 1,
        explain:
          "Index-driven changes are a remeasurement, not an expense event and not a modification: liability up, ROU asset up, unchanged rate, and the cost spreads over the seven years the higher rent actually covers. The 'onerous' framing smuggles a big-bath charge into a mechanical remeasurement — the direction test explains the enthusiasm.",
      },
    },
    {
      id: "lessors-slb",
      heading: "Lessors, subleases, and sale and leaseback",
      blocks: [
        {
          kind: "text",
          md: "**Lessor accounting kept the old dual model**: a **finance lease** transfers substantially all risks and rewards of ownership (indicators: title transfer, bargain options, term covering the major part of economic life, PV of payments substantially all of fair value, specialised assets) — derecognise the asset, recognise a **net investment** receivable, earn finance income on it. An **operating lease** keeps the asset on the lessor's books, earning rental income straight-line. The asymmetry with lessees is deliberate pragmatism, and worth a critical sentence when a question invites evaluation.",
        },
        {
          kind: "text",
          md: "An **intermediate lessor** classifies a **sublease** by reference to the **right-of-use asset from the head lease**, not the underlying property: sublet the whole remaining term and the ROU asset's risks and rewards have gone — finance sublease, derecognise the ROU asset for a net investment, even though the building itself belongs to someone else. This catches the corporate downsizer: subletting surplus floors for the rest of the head term is a disposal of the ROU asset in substance.",
        },
        {
          kind: "example",
          title: "Sale and leaseback — the control gate, then the split",
          scenario: "An entity sells its warehouse (carrying amount $60m) for its fair value of $100m and leases it back for 15 of its remaining 40 years. The PV of leaseback rentals is $35m. Does a sale occur, and what gain reports?",
          steps: [
            { label: "Gate", detail: "Apply IFRS 15: does the buyer obtain control? A leaseback of part of the asset's life does not defeat sale; a repurchase option generally does." },
            { label: "Split the interest", detail: "The seller-lessee retains a right of use worth $35m of the $100m — 35% retained, 65% transferred." },
            { label: "ROU asset", detail: "Carried at the retained proportion of the old carrying amount: 35% × $60m = $21m." },
            { label: "Gain", detail: "Total gain $40m, but only the transferred proportion recognises: 65% × $40m = $26m. The $14m relating to the retained right stays inside the ROU measurement." },
            { label: "Liability", detail: "Recognise the $35m lease liability; cash $100m received." },
          ],
          result: "Sale accounting, a $26m gain, a $21m ROU asset and a $35m liability. If the 'sale' failed the control gate — e.g. a repurchase option — the entity would keep the warehouse and treat the $100m as a financial liability: a borrowing in substance.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Why sale and leaseback is a financing story",
          md: "The transaction raises cash without (fully) losing the asset — and pre-IFRS 16 it also cleaned the balance sheet and booked the whole gain. The current model concedes neither: the leaseback liability comes straight back on, and the gain is capped at the interest genuinely sold. When a scenario's entity does one in a tight-covenant year at an above-market 'price' funded by above-market rents, price and rents offset — the excess 'proceeds' are additional financing, not gain.",
        },
      ],
      check: {
        q: "An entity leases a building for 20 years, and after five years sublets all remaining 15 years to a third party. How does it account for the sublease?",
        options: [
          "Operating sublease — the building's life far exceeds 15 years, and the entity never owned it",
          "Finance sublease: classification references the right-of-use asset, whose entire remaining term is transferred — derecognise the ROU asset and recognise a net investment in the sublease, while the head-lease liability continues",
          "Derecognise both the ROU asset and the head-lease liability",
          "Offset the sublease income against head-lease payments",
        ],
        correct: 1,
        explain:
          "The intermediate lessor's asset is not the building but the 15-year right to use it — and it has sublet all of it, transferring substantially all that asset's risks and rewards. The head-lease liability survives untouched (option 2 is the error the examiner plants): the entity still owes its own lessor, and now holds a receivable from its subtenant in place of the use-right.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Accepting substitution clauses and usage-based labels at face value.",
      fix: "Test substance: substitution needs practical ability plus supplier benefit; minimum volumes make 'variable' payments fixed.",
    },
    {
      trap: "Putting per-use and revenue-linked payments into the liability.",
      fix: "Only fixed, in-substance fixed and index/rate-linked payments capitalise; genuine usage variability expenses as incurred.",
    },
    {
      trap: "Booking remeasurement effects in profit.",
      fix: "Reassessments and index changes adjust the ROU asset; only scope-reducing modifications release a gain or loss now.",
    },
    {
      trap: "Recognising the full sale-and-leaseback gain, or any gain on a failed sale.",
      fix: "The gain caps at the proportion of the interest transferred — and no control transfer means a borrowing, not a sale.",
    },
  ],
  keyTerms: [
    { term: "Identified asset", def: "An asset specified explicitly or implicitly, with no substantive substitution right — the first limb of the lease definition." },
    { term: "Right-of-use asset", def: "The lessee's asset: the lease liability plus prepayments, initial direct costs and restoration estimates, less incentives — depreciated over the shorter of term and useful life." },
    { term: "Incremental borrowing rate", def: "The rate the lessee would pay to borrow, over a similar term with similar security, the funds to obtain a similar-value asset — the default discount rate when the implicit rate is unavailable." },
    { term: "Lease term", def: "The non-cancellable period plus renewal or non-termination periods the lessee is reasonably certain to use, judged from economic incentives." },
    { term: "Net investment in the lease", def: "The finance lessor's receivable: the present value of lease payments plus unguaranteed residual value, earning finance income at the implicit rate." },
    { term: "Sale and leaseback", def: "A transfer tested against IFRS 15's control gate: a genuine sale splits the gain by the interest transferred; a failed one is a collateralised borrowing." },
  ],
  summary: [
    "A lease is control of an identified asset — substitution and variability clauses get substance-tested, not read.",
    "The liability holds fixed and index-linked payments at the implicit or incremental rate; usage-linked payments never capitalise.",
    "Term and component judgements size the liability; remeasurements flow through the asset, not profit.",
    "Lessors keep the dual model; subleases classify against the ROU asset — full-term sublets are finance subleases.",
    "Sale and leaseback: control gate first, then gain only on the interest transferred; failed sales are borrowings.",
  ],
  knowledgeDiagnostic: [
    { q: "What two rights must the customer hold for a contract to contain a lease?", a: "The right to substantially all the economic benefits from use of the identified asset, and the right to direct how and for what purpose it is used through the period." },
    { q: "Which payments enter the lease liability?", a: "Fixed and in-substance fixed payments less incentives, index- or rate-linked variable payments at current level, expected residual value guarantee payments, reasonably certain purchase options, and relevant termination penalties — discounted at the implicit or incremental borrowing rate." },
    { q: "How does an intermediate lessor classify a sublease?", a: "By reference to the head-lease right-of-use asset: transferring substantially all its remaining benefits — such as subletting the full remaining term — makes the sublease a finance lease, replacing the ROU asset with a net investment." },
    { q: "In a qualifying sale and leaseback, how much gain reports?", a: "Only the proportion relating to the rights transferred to the buyer: total gain × (fair value less PV of leaseback rentals) ÷ fair value; the retained proportion is embedded in the measured-down ROU asset." },
  ],
  furtherStudy: [
    "SBR-10's repurchase diagnostics govern the sale-and-leaseback control gate",
    "SBR-14's rate machinery underlies the discounting and the liability's amortised-cost behaviour",
    "SBR-12 tests the ROU asset for impairment like any other",
    "Area E reads the IFRS 16 effect on EBITDA, gearing and covenant metrics",
  ],
}

const SBR_TREE_18: StudyChapter = {
  paper: "SBR",
  id: "SBR-18",
  number: 18,
  area: "C",
  syllabusRefs: ["C5(a)", "C5(b)", "C5(c)"],
  title: "Employee benefits",
  minutes: 16,
  intro:
    "Pension accounting is where a forty-year promise meets an annual reporting date. The defined benefit model — obligation, assets, three P&L components and remeasurements in OCI — is a machine for keeping that promise honest, and every one of its assumptions is a lever the exam expects you to test.",
  outcomes: [
    "Distinguish defined contribution from defined benefit by who bears the risk, including in-substance DB arrangements",
    "Account for short-term and termination benefits, and the timing test that separates termination from service",
    "Run the defined benefit machine: obligation, plan assets, service cost, net interest and remeasurements",
    "Account for settlements, curtailments and past service costs through profit or loss",
    "Apply the asset ceiling when a surplus exceeds available refunds or contribution reductions",
    "Challenge the actuarial assumptions and explain why remeasurements stay in OCI",
  ],
  sections: [
    {
      id: "risk-and-simpler-benefits",
      heading: "Who bears the risk — and the simpler benefits first",
      blocks: [
        {
          kind: "text",
          md: "**Defined contribution**: the entity pays fixed contributions and has **no further obligation** — the employee bears investment and longevity risk, and the accounting is the contribution expense as service is rendered. **Defined benefit** is everything else: the entity has promised an outcome (a pension linked to salary and years, a lump sum, medical cover) and bears the risk of delivering it. The label test fails where the substance differs — an entity that 'tops up' a DC fund whenever returns disappoint, by policy or by created expectation, has a constructive DB obligation to that extent.",
        },
        {
          kind: "text",
          md: "**Short-term benefits** (wages, leave, bonuses payable within twelve months) accrue undiscounted as service is rendered — accumulating paid absence accrues as earned; non-accumulating (typically sick pay) expenses when taken. A **profit-sharing or bonus** accrues when a present legal or constructive obligation exists and can be estimated reliably — the constructive limb catching the entity that always pays. **Termination benefits** are the inversion of everything else: they arise from *ending* employment, not from service, so they recognise at the **earlier** of when the offer can no longer be withdrawn and when related restructuring costs recognise under IAS 37. The boundary matters: enhanced payments **conditional on future service** are service costs spread over that service, not termination benefits — relabelling retention pay as 'termination' front-loads nothing legitimately.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The risk question is the classification",
          md: "Every scheme question starts the same way: **who suffers if investments underperform or pensioners live longer?** The employee — DC, expense the contributions. The entity — DB, run the machine. Multi-employer schemes and group plans follow the same logic, with a practical concession: a genuinely DB multi-employer scheme without sufficient information to allocate account as DC — with disclosure of that fact and the funding position, which scenarios like to leave conspicuously deficit-laden.",
        },
      ],
      check: {
        q: "An entity's scheme is contractually DC, but for a decade it has topped up retiring employees' funds to guarantee two-thirds of final salary, and its HR materials describe 'our pension promise'. How should the scheme be accounted for?",
        options: [
          "DC — the contract defines the obligation",
          "As defined benefit to the extent of the guarantee: the practice and communications create a constructive obligation for the outcome, so the entity bears the risk and must measure the obligation net of the funded contributions",
          "DC, with the top-ups expensed when paid",
          "DB only if the top-ups are legally enforceable",
        ],
        correct: 1,
        explain:
          "IAS 19 classifies by substance, and constructive obligations count: the established practice plus the published promise means employees reasonably expect the outcome, and the entity would suffer more than reputational damage by walking away. Expensing top-ups as paid (option 2) is exactly the deferral the DB model exists to prevent — the obligation accrues over the service that earns it.",
      },
    },
    {
      id: "the-db-machine",
      heading: "The defined benefit machine",
      blocks: [
        {
          kind: "text",
          md: "The balance sheet carries the **net defined benefit liability (or asset)**: the present value of the **defined benefit obligation** — measured by the projected unit credit method, attributing benefit to periods of service and discounting at **high-quality corporate bond** yields of matching currency and term — minus the **fair value of plan assets** held by the fund. The projected unit credit method's key honesty: the obligation for accrued service reflects **projected final salaries**, not today's — the raise you will grant in 2040 is already part of the pension earned this year.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Where each component reports",
            data: {
              steps: [
                { label: "Service cost", sub: "P&L: current + past service + settlement results" },
                { label: "Net interest", sub: "P&L: discount rate × opening net liability (asset)" },
                { label: "Remeasurements", sub: "OCI, never recycled: actuarial gains/losses + asset returns beyond the discount rate + ceiling effects" },
                { label: "Contributions & benefits", sub: "Move cash and balances, not profit" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Two design choices carry exam weight. **Net interest** applies one rate — the discount rate — to the *net* position: expected asset returns above bond yields never flatter P&L (the pre-2011 game of assuming heroic equity returns to book income is dead); actual out- or under-performance lands in OCI as it happens. And **remeasurements never recycle**: fifty-year assumption swings would make any period's P&L meaningless, so profit carries the *cost of the promise* (service and financing) while OCI absorbs the *noise of estimating it* — though SBR-08's one-signed test applies: persistent adverse remeasurements are experience, not noise, and deserve saying.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Events that do hit P&L when they happen",
          items: [
            "**Past service cost** — a plan amendment granting (or cutting) benefits for service already rendered: immediate P&L, no spreading",
            "**Curtailment** — a significant reduction in employees covered (closure, redundancy programme): the obligation change hits P&L with the related restructuring",
            "**Settlement** — buying out obligations (annuity purchase, transfer): the gap between the obligation extinguished and the price paid is a P&L gain or loss",
            "Timing discipline: remeasure the scheme with current assumptions *before* computing any amendment, curtailment or settlement effect",
          ],
        },
      ],
      check: {
        q: "A scheme's assets returned 11% in a year when the discount rate was 5%. The finance director wants the full 11% in profit, 'as that is what the fund actually earned'. What does IAS 19 require?",
        options: [
          "The full 11% in profit or loss — actual returns are facts",
          "Interest income at 5% on plan assets within net interest in P&L; the 6-point excess is a remeasurement in OCI — asset performance above the discount rate never reaches profit",
          "The full 11% in OCI",
          "The long-term expected return in P&L, as under the previous model",
        ],
        correct: 1,
        explain:
          "The single-rate design is deliberate: letting actual (or expected) returns into profit made pension income a function of equity allocation and optimism — the more risk the fund took, the better P&L looked, with the losses arriving in bad years. Now profit carries bond-rate financing symmetrically, and the market's verdict, good or bad, goes to OCI. Option 3 is precisely the abolished model.",
      },
    },
    {
      id: "ceiling-and-assumptions",
      heading: "The asset ceiling, and auditing the assumptions",
      blocks: [
        {
          kind: "text",
          md: "A scheme surplus is an asset only as far as the entity can actually **get value from it**: the **asset ceiling** caps the net asset at the present value of available **refunds** plus **reductions in future contributions**. Availability reads the scheme's own rules and any minimum funding requirements — trustees with discretion to block refunds, or statutory funding floors, can shrink the ceiling to near zero, leaving a real economic surplus recognised at a fraction of its arithmetic. Ceiling effects are remeasurements, through OCI.",
        },
        {
          kind: "table",
          caption: "The assumptions, and which way each one leans",
          head: ["Assumption", "Raising it does what to the obligation", "The bias to watch"],
          rows: [
            ["Discount rate", "Reduces it — the most powerful lever", "Cherry-picking bond populations to nudge the rate up in deficit years"],
            ["Salary growth", "Increases it", "Cutting projected growth in the same year pay deals exceed it"],
            ["Mortality / longevity", "Living longer increases it", "Stale tables while the exhibit mentions rising pensioner longevity"],
            ["Inflation / pension increases", "Increases it", "Assumed inflation below the indexation the scheme actually grants"],
          ],
        },
        {
          kind: "illustration",
          title: "Reading a pension note like the examiner",
          md: "A scenario's entity shows a deficit shrinking $80m in a year of weak asset returns. The note reveals: discount rate up 0.7% (justified by a 'refined' bond selection), salary growth cut 1%, and mortality tables unchanged since before the longevity improvements the HR exhibit celebrates. Each assumption is individually defensible; the ensemble — every lever pulled the deficit-shrinking way, in the year a lending covenant references net assets — is the SBR-01 direction pattern. The sensitivity disclosures make this checkable: a note showing ±0.5% on the discount rate moving the obligation ±9% tells you exactly how much of the 'improvement' is assumption, not funding.",
        },
      ],
      check: {
        q: "An entity's scheme shows assets of $520m against an obligation of $470m. Scheme rules give trustees absolute discretion over refunds, and minimum funding rules require contributions regardless. What net position reports?",
        options: [
          "A $50m net asset — assets exceed the obligation",
          "A net asset only to the extent of the economic benefit available — with refunds blocked by trustee discretion and contributions unreduced by funding floors, the ceiling may cut the recognised asset far below $50m, potentially towards nil, with the adjustment in OCI",
          "Nil — surpluses never recognise",
          "A $50m asset less a provision for trustee discretion",
        ],
        correct: 1,
        explain:
          "The ceiling asks what the surplus is worth to the entity, not what the arithmetic says: value comes only through refunds or contribution relief, and this scheme's rules choke both routes. The answer is a measurement of the available benefit — not an automatic nil (option 2), because partial contribution reductions may survive the funding floor — and the mechanism is the ceiling itself, not a freestanding provision.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Classifying by the scheme's label rather than its risk.",
      fix: "Ask who suffers when returns fail or pensioners live longer — practice and promises can make a 'DC' scheme DB in substance.",
    },
    {
      trap: "Putting asset outperformance or expected returns into profit.",
      fix: "One rate — the discount rate — drives net interest; everything above or below it is an OCI remeasurement.",
    },
    {
      trap: "Spreading past service costs or netting settlement results into remeasurements.",
      fix: "Amendments, curtailments and settlements hit P&L in full when they occur — after remeasuring with current assumptions.",
    },
    {
      trap: "Recognising a surplus the entity can never touch.",
      fix: "Cap at the ceiling: available refunds plus contribution reductions, read from scheme rules and funding requirements.",
    },
  ],
  keyTerms: [
    { term: "Defined benefit obligation", def: "The present value of benefits attributed to service to date under the projected unit credit method, using projected salaries and a high-quality corporate bond discount rate." },
    { term: "Net interest", def: "The discount rate applied to the opening net defined benefit liability or asset — the single-rate financing cost that replaced expected-return accounting." },
    { term: "Remeasurements", def: "Actuarial gains and losses, asset returns above or below the discount rate, and asset-ceiling changes — recognised in OCI and never recycled." },
    { term: "Past service cost", def: "The change in the obligation from a plan amendment affecting service already rendered — recognised immediately in profit or loss." },
    { term: "Curtailment", def: "A significant reduction in the number of employees covered by a plan, recognised with the related restructuring." },
    { term: "Asset ceiling", def: "The cap on a recognised scheme surplus: the present value of economic benefits available through refunds or reductions in future contributions." },
  ],
  summary: [
    "Classification follows risk — and constructive promises convert DC labels into DB obligations.",
    "The machine splits cleanly: service and net interest in profit, remeasurements in OCI unrecycled, cash through the balances.",
    "One discount rate does all the financing; asset performance meets profit never, OCI always.",
    "Amendments, curtailments and settlements are P&L events, measured after a current-assumption remeasurement.",
    "Surpluses recognise only to available benefit; assumptions get the direction test, with sensitivities as the measuring stick.",
  ],
  knowledgeDiagnostic: [
    { q: "What separates a termination benefit from a service cost?", a: "What the payment buys: compensation for ending employment recognises when the offer can no longer be withdrawn (or with the restructuring); anything conditional on future service is remuneration for that service, spread over it." },
    { q: "List the three P&L and three OCI components of DB cost.", a: "P&L: current service cost, past service cost with curtailment and settlement results, and net interest on the net position. OCI: actuarial gains and losses on the obligation, asset returns above or below the discount rate, and asset-ceiling movements." },
    { q: "Why does the projected unit credit method use future salaries?", a: "Because the benefit formula does: this year's accrued fraction of a final-salary pension will be paid on the final salary, so measuring at current pay would understate the obligation being earned." },
    { q: "What limits recognition of a scheme surplus?", a: "The asset ceiling — the present value of refunds the entity can actually obtain plus reductions in future contributions, after trustee discretion and minimum funding requirements; movements in the ceiling go to OCI." },
  ],
  furtherStudy: [
    "SBR-08 houses the recycling logic — and the one-signed OCI test that applies squarely to pension remeasurements",
    "SBR-07's assumption-and-sensitivity disciplines are the audit kit for actuarial assumptions",
    "Area C's provisions chapter handles the restructuring costs curtailments travel with",
    "Area E prices pension deficits into gearing and coverage the way lenders do",
  ],
}

export const SBR_TREE_AREA_C2: StudyChapter[] = [SBR_TREE_14, SBR_TREE_15, SBR_TREE_16, SBR_TREE_17, SBR_TREE_18]
