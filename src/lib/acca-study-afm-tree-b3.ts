import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area B, part three — the impact of financing on investment decisions
 * (B3), which is the largest subsection in the paper at eleven learning
 * outcomes.
 *
 *   AFM-16  Sources of finance for the modern group   (B3a, b, c)
 *   AFM-17  Cost of capital and project-specific rates (B3d, e)
 *   AFM-18  Capital structure theory in use            (B3i)
 *   AFM-19  Adjusted present value                     (B3j, k)
 *   AFM-20  Duration, convexity and credit risk        (B3f, g, h)
 *
 * B3 is where AFM's financing side actually lives, and where the legacy
 * chapter was thinnest relative to the weight: it gave APV and Modigliani-
 * Miller a section each and covered sources of finance, duration and credit
 * risk not at all. B3(a) alone names eleven distinct sources including Islamic
 * finance and security token offerings, and B3(c) — green finance — post-dates
 * the 2020-21 provider texts entirely, so it is written from the syllabus.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original.
 */

const AFM_TREE_16: StudyChapter = {
  paper: "AFM",
  id: "AFM-16",
  number: 16,
  area: "B",
  syllabusRefs: ["B3(a)", "B3(b)", "B3(c)"],
  title: "Sources of finance for the modern group",
  minutes: 19,
  intro:
    "Eleven sources named in one learning outcome. The examinable skill is not describing them — it is matching a source to an organisation's stage, assets, cash flow profile and risk appetite.",
  outcomes: [
    "Match a source of finance to the organisation's stage, asset base and cash flow profile",
    "Assess what each source does to financial position, financial risk and value",
    "Explain the rationale, benefits and deficiencies of Islamic finance as a growing source",
    "Explain the role of green finance for an organisation pursuing a sustainability agenda",
    "Recommend a funding package and defend it against the obvious alternative",
  ],
  sections: [
    {
      id: "the-menu",
      heading: "The menu, and what each source is really for",
      blocks: [
        {
          kind: "text",
          md: "Eleven sources sit inside a single learning outcome. Equity and debt are the two poles, with hybrids between them; then lease finance; the securitisation or outright sale of assets; and, tracking an organisation from its first funding to its maturity, business angel money, venture capital and private equity. Islamic finance and security token offerings complete the list. Nobody is asked to describe all eleven — the requirement is always to choose among two or three for a **specific** organisation. So learn each one by the situation it fits.",
        },
        {
          kind: "table",
          caption: "Source, fit, and the price of using it",
          head: ["Source", "Fits an organisation that…", "What it costs beyond the return"],
          rows: [
            ["Ordinary equity", "Has volatile cash flows or no security to offer", "Dilution of control and of earnings; issue costs; a signalling penalty"],
            ["Debt (bank or bond)", "Has stable, predictable cash flows and taxable profits", "Fixed obligations, covenants, and reduced flexibility in a downturn"],
            ["Hybrids (convertibles, warrants)", "Wants a lower coupon now and can accept dilution later", "Dilution if converted; complexity in pricing and in the market's reading of it"],
            ["Lease finance", "Wants the asset's use without the capital outlay, or cannot use tax allowances", "Usually a higher implicit rate; the lessor keeps the residual"],
            ["Venture capital", "Is early stage with high growth potential and no track record", "A large equity stake, board seats, and pressure toward an exit in 3–7 years"],
            ["Business angel", "Is very early stage and needs a smaller sum plus expertise", "Equity, and dependence on one individual's continued involvement"],
            ["Private equity", "Is established and can support leverage through a restructuring", "Loss of independence, high gearing, and a defined exit horizon"],
            ["Securitisation / asset sale", "Holds a pool of predictable receivables it can isolate", "Loss of the future income stream; complexity and set-up cost"],
            ["Islamic finance", "Needs Shariah-compliant funding, or wants a wider investor base", "Structuring cost; profit-sharing rather than interest changes the risk split"],
            ["Security token offering", "Wants to reach investors digitally and fractionalise an asset", "Regulatory uncertainty across jurisdictions; thin secondary liquidity"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three questions decide the recommendation",
          md: "**What does the organisation have?** Tangible secured assets point to debt; nothing but an idea points to equity. **What do its cash flows look like?** Volatile or distant cash flows cannot service fixed obligations. **What can it afford to give up?** Control, upside, flexibility and future income are all currencies here, and each source charges in a different one.",
        },
        {
          kind: "text",
          md: "The outcome also asks you to assess each source's effect on **financial position, financial risk and the value of the organisation**. Keep those three separate: debt improves reported return on equity while raising financial risk; a lease may keep an asset off the balance sheet under some regimes but changes nothing about the underlying obligation; and an equity issue reduces gearing while transferring future value to new shareholders.",
        },
      ],
      check: {
        q: "A profitable, asset-light software group with volatile revenues and a large accumulated tax loss is choosing between a bond issue and an equity placing. Which argument most favours equity?",
        options: [
          "Equity is always cheaper than debt for technology companies",
          "It has no tangible security to offer, volatile cash flows that would struggle to meet fixed interest, and a tax loss that makes the interest tax shield worthless for now",
          "Bond issues are not available to companies with accumulated losses",
          "Equity avoids dilution of the existing shareholders",
        ],
        correct: 1,
        explain:
          "Three facts in the scenario all point the same way: no security, cash flows that cannot reliably meet a fixed charge, and no tax liability for interest to shelter. That last point is the one candidates miss — debt's principal advantage evaporates for a company not currently paying tax. Option 3 states the opposite of what an equity issue does, and option 0 asserts a rule that does not exist.",
      },
    },
    {
      id: "islamic",
      heading: "Islamic finance: the same money, a different risk split",
      blocks: [
        {
          kind: "text",
          md: "Islamic finance is examined as a **growing source of finance**, so the requirement is usually to explain the rationale, the benefits and the deficiencies rather than to price an instrument. The governing principle is that money may not earn a return simply for being lent: return must come from participating in a real asset or a real enterprise, and therefore from sharing its risk.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The prohibitions that shape every structure",
          items: [
            "**Riba** — interest, or any predetermined return for the use of money alone",
            "**Gharar** — excessive uncertainty or ambiguity in the terms of a contract",
            "**Maysir** — speculation and gambling, which rules out most conventional derivatives",
            "Investment in prohibited activities such as alcohol, gambling, tobacco and conventional financial services",
          ],
        },
        {
          kind: "table",
          caption: "The instruments and their conventional analogues",
          head: ["Instrument", "How it works", "Closest conventional equivalent"],
          rows: [
            ["Murabaha", "The bank buys the asset and resells it to the client at a disclosed mark-up, payable later", "Trade finance / instalment credit"],
            ["Ijara", "The bank buys the asset and leases it to the client for a rental", "Operating or finance lease"],
            ["Mudaraba", "One party provides capital, the other expertise; profits shared on an agreed ratio, losses borne by the capital provider", "Equity-like managed investment"],
            ["Musharaka", "Both parties contribute capital and share profits and losses in agreed proportions", "Joint venture / partnership equity"],
            ["Sukuk", "Certificates conferring ownership of an underlying asset and a share of the income it generates", "Bond — but asset-backed, not a debt claim"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that earns the mark",
          md: "A **sukuk is not a bond**. A bondholder owns a debt claim and is entitled to interest regardless of the borrower's performance. A sukuk holder owns a share of an asset and is entitled to the income that asset generates — so if the asset underperforms, so does the return. Saying only that sukuk are 'Islamic bonds' misses the substantive difference the examiner is testing.",
        },
        {
          kind: "text",
          md: "**Benefits**: access to a large and growing pool of capital, an investor base uncorrelated with conventional markets, an asset-backed structure that can appeal in stressed conditions, and a risk-sharing profile that suits ventures whose cash flows are uncertain. **Deficiencies**: higher structuring and legal cost, a smaller and less liquid secondary market, variation between jurisdictions in what scholars will certify, and the practical difficulty that some structures replicate conventional economics closely enough to attract criticism from within the field.",
        },
      ],
      check: {
        q: "What is the substantive difference between a sukuk holder and a conventional bondholder?",
        options: [
          "There is none; sukuk are simply bonds issued in Islamic jurisdictions",
          "A sukuk holder owns a share of an underlying asset and receives the income it generates, so returns depend on the asset's performance, whereas a bondholder holds a debt claim to interest regardless of performance",
          "Sukuk holders rank ahead of all other creditors on insolvency",
          "Sukuk pay a higher fixed rate of interest than equivalent bonds",
        ],
        correct: 1,
        explain:
          "The prohibition on riba means the return cannot be a predetermined charge for lending money — it must derive from a real asset. That converts the instrument from a debt claim into a form of ownership with a share of income, which is why the risk profile differs even where the cash flows look similar. Option 3 contradicts the prohibition it is meant to satisfy.",
      },
    },
    {
      id: "green",
      heading: "Green finance, and what it commits you to",
      blocks: [
        {
          kind: "text",
          md: "Green finance carries its own learning outcome, asking what it does for an organisation that has committed itself to a sustainability agenda. It post-dates the 2020-21 provider texts, so treat it as current-issues material and expect it as a discussion requirement attached to a financing decision.",
        },
        {
          kind: "table",
          caption: "The main forms",
          head: ["Instrument", "What is tied to sustainability", "Consequence of missing the target"],
          rows: [
            ["Green bond", "The USE OF PROCEEDS — funds are ring-fenced for qualifying projects", "Reputational damage and possible reclassification; reporting obligations continue"],
            ["Sustainability-linked loan or bond", "The BORROWER'S PERFORMANCE against defined metrics", "The margin ratchets up — a direct, contractual financing cost"],
            ["Transition finance", "Funding a credible path out of a high-emitting activity", "Challenge over whether the path is credible, and accusations of greenwashing"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The distinction candidates miss",
          md: "A **green bond** constrains what the money is spent on. A **sustainability-linked** instrument constrains how the whole organisation performs, and prices the failure directly into the margin. The second is far more demanding, because it makes environmental data contractually material and therefore something that needs measuring and assuring to a standard the organisation may not currently reach.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The advisory points",
          items: [
            "The pricing benefit is usually modest — a few basis points — so a decision justified purely on cost is fragile",
            "The larger benefit is investor base: mandates that can only buy labelled instruments widen demand and improve resilience at issue",
            "The obligation is reporting capability, and it is ongoing — recommend the assurance arrangements alongside the instrument",
            "Targets must be genuinely stretching; a target the organisation would have met anyway invites the greenwashing charge and gives no pricing benefit",
            "Check the metric can be measured reliably, because a contested measurement becomes a contested margin",
          ],
        },
      ],
      check: {
        q: "A group issues a sustainability-linked loan whose margin rises 25 basis points if emissions targets are missed. What obligation does this create beyond the financing itself?",
        options: [
          "None — the margin adjustment is the only consequence",
          "The emissions data becomes contractually material, so the group needs reliable measurement and, in practice, independent assurance — a reporting capability, not just a target",
          "The group must invest the proceeds only in renewable energy projects",
          "The group must publish audited financial statements quarterly",
        ],
        correct: 1,
        explain:
          "Once a financing cost turns on a metric, that metric needs to be measurable, verifiable and defensible — which is a capability question, not a target-setting one. Option 2 describes a green bond, where the constraint is on the use of proceeds rather than on organisational performance; that is exactly the distinction being tested.",
      },
    },
  ],
  examTraps: [
    { trap: "Describing every source in the syllabus list.", fix: "Choose among the two or three the scenario makes plausible, and justify from its assets, cash flows and stage." },
    { trap: "Recommending debt for its tax shield without checking the tax position.", fix: "A company with losses or unused allowances gains nothing from it." },
    { trap: "Calling sukuk 'Islamic bonds' and stopping.", fix: "Say what changes — ownership of an asset and a share of its income, not a debt claim to interest." },
    { trap: "Treating green bonds and sustainability-linked instruments as the same thing.", fix: "One constrains the use of proceeds; the other prices the organisation's own performance into the margin." },
  ],
  keyTerms: [
    { term: "Securitisation", def: "Converting a pool of predictable future receivables into tradeable securities sold to investors, raising cash now in exchange for the future income stream." },
    { term: "Riba", def: "The prohibited predetermined return for the use of money alone, which is why Islamic instruments derive returns from real assets or enterprise instead." },
    { term: "Sukuk", def: "Certificates conferring proportionate ownership of an underlying asset together with a share of the income it produces." },
    { term: "Sustainability-linked loan", def: "Borrowing whose margin adjusts according to the borrower's measured performance against defined sustainability targets." },
  ],
  summary: [
    "Match a source to the organisation's assets, cash flow profile, stage and what it can afford to give up.",
    "Assess each source's effect on position, risk and value separately — they do not move together.",
    "Islamic finance replaces interest with a share in a real asset or enterprise; a sukuk is not a bond.",
    "Green bonds constrain the use of proceeds; sustainability-linked instruments price the organisation's own performance.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does debt's principal advantage disappear for a loss-making company?", a: "The interest tax shield only has value against a tax liability; with no taxable profits there is nothing for the interest deduction to reduce." },
    { q: "What does a mudaraba arrangement do with losses?", a: "Losses fall on the capital provider, while the party contributing expertise loses their effort — profits are shared on an agreed ratio, but the loss split is not symmetrical." },
    { q: "What capability does a sustainability-linked instrument require?", a: "Reliable measurement and assurance of the metric, because a financing cost now turns on data that has become contractually material." },
  ],
  furtherStudy: [
    "AFM-17 prices the equity and debt raised here into a cost of capital.",
    "AFM-18 covers the capital structure theory that decides how much debt is appropriate.",
    "AFM-05 covers the ESG assessment that a green financing decision has to be consistent with.",
  ],
}

const AFM_TREE_17: StudyChapter = {
  paper: "AFM",
  id: "AFM-17",
  number: 17,
  area: "B",
  syllabusRefs: ["B3(d)", "B3(e)"],
  title: "Cost of capital and project-specific rates",
  minutes: 20,
  intro:
    "The discount rate is not given to you by nature. It is built — and the build determines whether a project is accepted, so the examiner tests every joint in it.",
  outcomes: [
    "Calculate a cost of equity and a cost of debt from the sources an organisation actually uses",
    "Combine them into a weighted average cost of capital using market values",
    "Explain the relationship between asset betas and equity betas",
    "Un-gear a proxy company's beta and re-gear it to your own capital structure",
    "Say when a project-specific rate is required, and when the existing WACC will do",
  ],
  sections: [
    {
      id: "components",
      heading: "Building the components",
      blocks: [
        {
          kind: "formula",
          name: "Cost of equity — capital asset pricing model",
          expr: "ke = rf + βe(E(rm) − rf)",
          note:
            "rf is the risk-free rate, βe the equity beta, and (E(rm) − rf) the equity risk premium. Watch the wording: if a question gives the market RETURN, subtract rf to get the premium; if it gives the market PREMIUM, do not subtract again. This is the commonest single slip in the whole calculation.",
        },
        {
          kind: "table",
          caption: "Cost of debt — which formula for which instrument",
          head: ["Instrument", "Cost to the company", "Note"],
          rows: [
            ["Bank loan", "Interest rate × (1 − tax rate)", "Simple, because there is no market price"],
            ["Irredeemable bond", "Interest × (1 − T) ÷ market value", "Use the ex-interest market value"],
            ["Redeemable bond", "The IRR of the after-tax cash flows to redemption", "Interest net of tax each year plus the redemption amount"],
            ["Traded bond, investor's view", "The gross redemption yield", "Before tax relief — this is the return to the holder, not the cost to the issuer"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Market values, never book values",
          md: "The WACC weights must be **market** values of equity and debt. Book equity is an accounting residual bearing no relation to what shareholders require, and using it typically understates the equity weight badly for a profitable company — which understates the WACC and lets marginal projects through. Market capitalisation is shares in issue × share price; if the question gives a share price and a share count, it wants you to use them.",
        },
        {
          kind: "formula",
          name: "Weighted average cost of capital",
          expr: "WACC = ke × [Ve ÷ (Ve + Vd)] + kd(1 − T) × [Vd ÷ (Ve + Vd)]",
          note:
            "Ve and Vd are market values. The (1 − T) reflects that interest is deductible, which is where debt's tax advantage enters the appraisal — so do not also deduct the tax saving separately in the cash flows, or it is counted twice.",
        },
        {
          kind: "text",
          md: "When is the existing WACC a legitimate discount rate? Only when the project has the **same business risk** as existing operations and is financed so as to leave the **capital structure broadly unchanged**. If either condition fails, the rate has to be rebuilt — which is what the rest of this chapter does.",
        },
      ],
      check: {
        q: "A question gives an equity beta of 1.3, a market return of 10%, and a risk-free rate of 4%. What is the cost of equity?",
        options: [
          "17.0%, being 4 + 1.3 × 10",
          "11.8%, being 4 + 1.3 × (10 − 4)",
          "13.0%, being 1.3 × 10",
          "14.0%, being 4 + 10",
        ],
        correct: 1,
        explain:
          "The market RETURN is given, so the premium must be derived: 10 − 4 = 6, then 4 + 1.3 × 6 = 11.8%. Option 0 applies the beta to the whole market return rather than to the excess over the risk-free rate, which is the error the wording is designed to catch — and it overstates the rate by more than five percentage points.",
      },
    },
    {
      id: "betas",
      heading: "Asset betas, equity betas, and what gearing does",
      blocks: [
        {
          kind: "text",
          md: "An **asset beta** measures the systematic risk of the business itself, independent of how it is financed. An **equity beta** measures the systematic risk borne by shareholders, which includes the additional risk that gearing imposes on them. So the equity beta of a geared company is always higher than its asset beta, and the gap widens with gearing.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "Un-gear then re-gear",
            data: {
              steps: [
                { label: "Proxy's equity beta", sub: "Observed in the market, includes the proxy's gearing" },
                { label: "Un-gear", sub: "Strip out the proxy's financial risk → asset beta" },
                { label: "Asset beta", sub: "Pure business risk of that industry" },
                { label: "Re-gear", sub: "Add OUR financial risk → our equity beta" },
                { label: "CAPM", sub: "Our project-specific cost of equity" },
              ],
            },
          },
        },
        {
          kind: "formula",
          name: "Asset beta (un-gearing)",
          expr: "βa = βe × [Ve ÷ (Ve + Vd(1 − T))]  +  βd × [Vd(1 − T) ÷ (Ve + Vd(1 − T))]",
          note:
            "The second term is normally dropped because debt is assumed risk-free, so βd = 0. Re-gearing is the same equation solved for βe: βe = βa × [Ve + Vd(1 − T)] ÷ Ve.",
        },
        {
          kind: "example",
          title: "A project-specific rate, end to end",
          scenario:
            "A group is entering a new industry. A quoted company in that industry has an equity beta of 1.5 and gearing of 40% debt to 60% equity by market value. Our group's target structure is 25% debt, 75% equity. Tax is 20%, the risk-free rate 4%, the equity risk premium 6%, and our pre-tax cost of debt would be 6%.",
          steps: [
            { label: "Un-gear the proxy", detail: "βa = 1.5 × 60 ÷ [60 + 40(0.8)] = 1.5 × 60 ÷ 92 = 1.5 × 0.6522 = 0.978." },
            { label: "Re-gear to our structure", detail: "βe = 0.978 × [75 + 25(0.8)] ÷ 75 = 0.978 × 95 ÷ 75 = 0.978 × 1.2667 = 1.239." },
            { label: "Cost of equity", detail: "ke = 4 + 1.239 × 6 = 4 + 7.43 = 11.43%." },
            { label: "Cost of debt after tax", detail: "6% × (1 − 0.20) = 4.8%." },
            { label: "Project WACC", detail: "(11.43 × 0.75) + (4.8 × 0.25) = 8.57 + 1.20 = 9.77%, say 9.8%." },
          ],
          result:
            "9.8% is the rate for this project. Note the asset beta of 0.978 is lower than both equity betas — it must be, because it has had all financial risk removed.",
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Three sanity checks on any beta answer",
          md: "The asset beta must be **lower** than the equity beta it came from. The re-geared equity beta must be **higher** than the asset beta. And if our gearing is lower than the proxy's, our re-geared equity beta must be **lower** than the proxy's original. All three hold above — 0.978 < 1.5, 1.239 > 0.978, and 1.239 < 1.5 because we are less geared. Run these and most arithmetic slips announce themselves.",
        },
        {
          kind: "activity",
          title: "Why use a proxy at all?",
          prompt:
            "Explain why the group could not simply use its own equity beta for this project, and name two limitations of the proxy approach.",
          answer:
            "The group's own equity beta reflects the systematic risk of its existing businesses and its existing financing. The project is in a new industry, so its business risk is different by assumption - using the group beta would price the project as though it carried the risk of operations it has nothing to do with, accepting it too readily if it is riskier than the existing business. The proxy supplies the missing piece: an observable equity beta from a company already exposed to that industry's risk, which can be stripped of the proxy's financing and re-dressed in ours. Two limitations. First, the proxy is rarely pure - a quoted company usually has several activities, so its beta blends them, and a genuinely single-activity proxy may not exist. Second, the un-gearing formula assumes the proxy's debt is risk-free with a beta of zero, which is a simplification that overstates the asset beta for a heavily geared or lowly rated proxy. I would add that beta estimates are statistically noisy and depend on the period and index used, so the sensible output is a range rather than 9.77% presented to two decimal places.",
        },
      ],
      check: {
        q: "A company un-gears a proxy's equity beta of 1.8 and obtains an asset beta of 2.1. What must have gone wrong?",
        options: [
          "Nothing — asset betas exceed equity betas for highly geared companies",
          "The calculation is wrong: un-gearing removes financial risk, so the asset beta must always be lower than the equity beta it is derived from",
          "The tax rate used must have been too high",
          "The proxy must be in a different industry",
        ],
        correct: 1,
        explain:
          "Un-gearing strips out the extra systematic risk that gearing imposes on shareholders, so the result is necessarily smaller than the equity beta — the multiplier Ve ÷ [Ve + Vd(1 − T)] is always less than one for a geared company. An asset beta above the equity beta means the formula has been inverted or the values transposed.",
      },
    },
    {
      id: "cost-of-capital-value",
      heading: "What the cost of capital is, and is not, good for",
      blocks: [
        {
          kind: "text",
          md: "One outcome asks how far this rate can be relied on to establish what a project, or a whole organisation, is worth — and how the two are connected. The connection is direct and unforgiving: value is cash flow discounted at this rate, so a small error in the rate moves the valuation substantially, and it moves distant cash flows most, which is where terminal values live.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Where a single WACC stops being appropriate",
          items: [
            "The project's business risk differs from the existing operations — use a project-specific rate",
            "The financing mix changes materially and permanently — the WACC weights and ke both shift, and adjusted present value handles this better",
            "Gearing changes over the project's life, for instance as a buy-out's debt is repaid — a single constant rate cannot represent a moving structure",
            "The project is in a different currency or country — the risk-free rate and the premium differ",
            "The organisation is unquoted, so there is no market value of equity and no observable beta to start from",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The bridge to adjusted present value",
          md: "Two of those situations — a materially different financing mix and gearing that changes over time — are exactly what APV was built for. It discounts the project's cash flows as if all-equity financed, then adds the financing effects separately, so it does not need a single blended rate that holds constant. That is the next-but-one chapter, and this is why it exists.",
        },
        {
          kind: "text",
          md: "Finally, present the rate honestly. A WACC computed to two decimal places rests on a beta estimated from noisy data, a risk premium that is itself contested, and market values taken on one day. State the rate, state that a range of roughly a percentage point either side is realistic, and show what that range does to the NPV. That is a scepticism mark, and it protects the recommendation from being overturned by a single input.",
        },
      ],
      check: {
        q: "A buy-out will be financed with 70% debt, repaid steadily so that gearing falls to 25% within five years. Why is a single WACC a poor discount rate here?",
        options: [
          "Because WACC cannot be used for buy-outs under any circumstances",
          "Because the capital structure changes materially over the project's life, so no single set of weights or cost of equity holds throughout — adjusted present value, which handles financing effects separately, is the better technique",
          "Because debt finance has no cost once tax relief is considered",
          "Because the cost of equity is irrelevant when gearing is above 50%",
        ],
        correct: 1,
        explain:
          "A WACC is a snapshot of one capital structure. When the structure is deliberately changing, both the weights and the cost of equity move every year, so applying a constant rate misprices the whole appraisal. APV separates the base-case value from the financing side effects and can therefore follow a changing structure year by year.",
      },
    },
  ],
  examTraps: [
    { trap: "Applying beta to the market return instead of the risk premium.", fix: "Check whether the question gives the market return or the premium before substituting." },
    { trap: "Weighting the WACC on book values.", fix: "Use market values — capitalisation for equity, market price for traded debt." },
    { trap: "Producing an asset beta higher than the equity beta it came from.", fix: "Un-gearing removes risk, so it must fall; run the three sanity checks." },
    { trap: "Using the group WACC for a project in a new industry.", fix: "Different business risk needs a project-specific rate built from a proxy's beta." },
    { trap: "Deducting the interest tax saving in the cash flows as well as using kd(1 − T).", fix: "The tax benefit belongs in one place only." },
  ],
  keyTerms: [
    { term: "Asset beta", def: "A measure of the systematic risk of a business's operations alone, with the effect of financial gearing removed." },
    { term: "Equity beta", def: "A measure of the systematic risk borne by shareholders, reflecting both business risk and the additional risk created by gearing." },
    { term: "Un-gearing", def: "Converting an observed equity beta into an asset beta by removing the effect of that company's capital structure." },
    { term: "Weighted average cost of capital", def: "The return an organisation must earn to satisfy all its providers of capital, weighted by the market values of equity and debt." },
  ],
  summary: [
    "Build the rate: cost of equity from CAPM, cost of debt net of tax, weighted at market values.",
    "Asset beta is business risk alone; equity beta adds the risk gearing imposes on shareholders.",
    "Un-gear a proxy's beta and re-gear it to your own structure for a project-specific rate.",
    "A single WACC fails when business risk differs, or when the capital structure is changing — which is APV's territory.",
  ],
  knowledgeDiagnostic: [
    { q: "Why must WACC weights use market values?", a: "Book equity is an accounting residual unrelated to what shareholders require; using it understates the equity weight and therefore the WACC, letting marginal projects through." },
    { q: "What are the three sanity checks on a re-geared beta?", a: "The asset beta is below the proxy's equity beta; the re-geared equity beta is above the asset beta; and if our gearing is lower than the proxy's, our equity beta is below theirs." },
    { q: "Name two situations where a single WACC is inappropriate.", a: "Where the project's business risk differs from existing operations, and where the capital structure changes materially over the project's life." },
  ],
  furtherStudy: [
    "AFM-16 covers the sources of finance whose costs are combined here.",
    "AFM-18 explains why the capital structure that sets these weights is chosen as it is.",
    "AFM-19 develops adjusted present value, the technique for the situations a single WACC cannot handle.",
  ],
}

const AFM_TREE_18: StudyChapter = {
  paper: "AFM",
  id: "AFM-18",
  number: 18,
  area: "B",
  syllabusRefs: ["B3(i)"],
  title: "Capital structure theory in use",
  minutes: 18,
  intro:
    "Four theories, examined together because none of them is sufficient alone. The requirement is never 'explain Modigliani and Miller' — it is 'advise this board on this structure', and the theories are the instruments you reason with.",
  outcomes: [
    "State the Modigliani and Miller propositions before and after tax, and what each assumes",
    "Compute the value of a tax shield and the geared cost of equity, and reconcile them to the WACC",
    "Use static trade-off theory to identify where a specific company's optimum lies",
    "Apply pecking order reasoning to explain observed financing behaviour",
    "Bring agency effects into a capital structure recommendation",
  ],
  sections: [
    {
      id: "mm",
      heading: "Modigliani and Miller, with and without tax",
      blocks: [
        {
          kind: "text",
          md: "Start with what the propositions actually claim, because both are frequently misquoted. **Without tax**, capital structure is irrelevant: the value of a company depends on its assets and the cash flows they generate, not on how those assets are financed. Cheaper debt is exactly offset by the rise it causes in the cost of equity, so the WACC is constant and the value is unchanged.",
        },
        {
          kind: "formula",
          name: "MM without tax — the geared cost of equity",
          expr: "keg = keu + (keu − kd) × (Vd ÷ Ve)",
          note:
            "The cost of equity rises linearly with gearing. This is the mechanism behind the irrelevance result: whatever is saved by using cheaper debt is given back through a more expensive equity.",
        },
        {
          kind: "text",
          md: "**With tax**, the irrelevance breaks in one specific place: interest is tax deductible and dividends are not, so a geared company pays less tax and is therefore worth more. The extra value is the present value of the tax saved.",
        },
        {
          kind: "formula",
          name: "MM with tax — value and cost of equity",
          expr: "Vg = Vu + (Vd × T)     and     keg = keu + (keu − kd)(1 − T)(Vd ÷ Ve)",
          note:
            "Vd × T is the present value of the tax shield on permanent debt. The (1 − T) in the second equation is why the cost of equity now rises more slowly than it did without tax — which is why the WACC falls as gearing rises.",
        },
        {
          kind: "example",
          title: "The tax shield, the cost of equity and the WACC — reconciled",
          scenario:
            "An ungeared company is worth $100m with a cost of equity of 12%. It introduces $40m of permanent debt at 6%. Tax is 25%.",
          steps: [
            { label: "Geared value", detail: "Vg = 100 + (40 × 0.25) = $110m. The tax shield is worth $10m." },
            { label: "Value of equity", detail: "Ve = 110 − 40 = $70m." },
            { label: "Geared cost of equity", detail: "keg = 12 + (12 − 6)(0.75)(40 ÷ 70) = 12 + 6 × 0.75 × 0.5714 = 14.57%." },
            { label: "WACC from the components", detail: "(14.57 × 70/110) + (6 × 0.75 × 40/110) = 9.27 + 1.64 = 10.91%." },
            { label: "Cross-check", detail: "MM also gives WACC = keu × [1 − (T × Vd ÷ Vg)] = 12 × [1 − (0.25 × 40/110)] = 12 × 0.9091 = 10.91%. They agree." },
          ],
          result:
            "Value rose by exactly the tax shield, the cost of equity rose to compensate shareholders for the added financial risk, and the WACC fell from 12% to 10.91%. Two routes to the same WACC is the check to run.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Where MM with tax leads, and why nobody goes there",
          md: "Taken literally, the with-tax proposition says value rises continuously with gearing, so the optimal structure is **100% debt**. No company does this, and saying why is the point of the next theory. Quoting MM as a recommendation without that qualification is the standard way to lose the discussion marks on this topic.",
        },
      ],
      check: {
        q: "Under Modigliani and Miller without tax, why does using more debt not reduce the weighted average cost of capital?",
        options: [
          "Because debt and equity have the same required return",
          "Because the saving from using cheaper debt is exactly offset by the rise in the cost of equity that the additional financial risk causes",
          "Because interest is not tax deductible in the model",
          "Because the value of the company falls as debt rises",
        ],
        correct: 1,
        explain:
          "The offsetting mechanism is the whole proposition: shareholders in a geared company bear more risk and demand a higher return, and that increase precisely cancels the benefit of the cheaper source. Option 2 states a feature of the model but not the reason — the absence of tax is why there is no shield to create a benefit in the first place, whereas the offsetting rise in the cost of equity is what keeps the WACC flat.",
      },
    },
    {
      id: "trade-off-pecking",
      heading: "Trade-off, pecking order and agency",
      blocks: [
        {
          kind: "text",
          md: "**Static trade-off theory** supplies the missing cost. As gearing rises the tax shield grows, but so does the expected cost of financial distress — and distress costs rise more than proportionately, because the probability of trouble accelerates. The optimum is where the marginal benefit of one more unit of debt equals the marginal expected cost.",
        },
        {
          kind: "table",
          caption: "The costs of financial distress, direct and indirect",
          head: ["Type", "Examples", "Which usually dominates"],
          rows: [
            ["Direct", "Legal and insolvency practitioner fees, asset sales at a discount", "Smaller — but visible and easy to quantify"],
            ["Indirect", "Customers defecting, suppliers withdrawing credit, staff leaving, management distracted, investment cancelled", "Far larger, and it starts long before formal insolvency"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Where the optimum sits is a fact about the business",
          md: "Stable, contracted cash flows and tangible, redeployable assets push the optimum high — a utility can carry gearing that would be reckless elsewhere. Volatile cash flows and assets that lose value outside the business push it low. When a question asks about capital structure, the evidence for your answer is in the cash flow profile and the balance sheet, not in the theory.",
        },
        {
          kind: "text",
          md: "**Pecking order theory** does not describe an optimum at all — it describes observed behaviour. Managers know more about the company's prospects than investors do, and investors know they know. So an equity issue is read as a signal that management thinks the shares are expensive, and the announcement typically depresses the price. Firms therefore prefer retained earnings first, then debt, and issue equity last.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "What pecking order explains that trade-off cannot",
          items: [
            "Why highly profitable firms are often lightly geared — they fund from retentions and never need to raise",
            "Why firms hold financial slack, so they are not forced to issue equity at a bad moment",
            "Why share prices commonly fall on the announcement of a rights issue",
            "Why convertibles and other hybrids are popular — they are debt-shaped and so carry a smaller signalling penalty than equity",
          ],
        },
        {
          kind: "text",
          md: "**Agency effects** complete the picture, and they cut both ways. Debt disciplines: committing free cash flow to fixed payments removes management's discretion to spend it on empire-building. Debt also distorts: once it is in place, shareholders gain from risk shifting and can be deterred from good projects by debt overhang. The recommendation should say which effect is likely to dominate in this company — and that turns on whether it is cash-rich with few projects, or investment-hungry with many.",
        },
        {
          kind: "activity",
          title: "Reconcile the theories against one company",
          prompt:
            "A mature, highly profitable manufacturer has gearing of 12% and holds large cash balances. Its sector average gearing is 45%. What do the theories say, and what do you recommend?",
          answer:
            "The theories disagree in a way that is itself informative. Trade-off theory says the company is under-geared: it plainly pays tax, its cash flows are strong, and it is forgoing a tax shield it could safely carry, so it should lever up toward the sector level. Pecking order theory says nothing is wrong at all - a highly profitable firm funds itself from retentions and simply never needs to raise, so low gearing is the natural result of success rather than a failure to optimise. The agency lens is the one that decides it: a mature business with large cash balances and few projects is the classic setting for value-destroying discretionary spending, and both debt and distributions discipline that. So I would recommend moving gearing up, but I would justify it on the agency and tax arguments together rather than on the sector comparison, because a sector average blends companies with different asset structures. The conditions I would attach are that the increase be tested against a downside scenario for covenant headroom, and that the proceeds go to shareholders through a buy-back rather than sitting on the balance sheet - otherwise the company has taken on the financial risk without capturing either benefit.",
        },
      ],
      check: {
        q: "Why does pecking order theory predict that a rights issue announcement will depress the share price?",
        options: [
          "Because the new shares dilute earnings per share",
          "Because managers know more than investors, so a decision to issue equity is read as a signal that management considers the shares overvalued",
          "Because rights issues are always priced at a discount",
          "Because gearing falls, which raises the weighted average cost of capital",
        ],
        correct: 1,
        explain:
          "The prediction is about information, not arithmetic. Investors reason that management would prefer to issue when the shares are dear, so the decision itself conveys unfavourable private information and the price adjusts. Dilution and the discount are mechanical features of a rights issue that are already anticipated in the terms, so neither explains the signalling effect the theory is describing.",
      },
    },
  ],
  examTraps: [
    { trap: "Quoting MM with tax as though it recommended maximum gearing.", fix: "State the conclusion and immediately give the reason nobody follows it — distress costs." },
    { trap: "Omitting the (1 − T) from the geared cost of equity formula.", fix: "Check which proposition you are in; the with-tax version dampens the rise, which is why the WACC falls." },
    { trap: "Discussing distress costs as legal fees only.", fix: "Indirect costs — lost customers, withdrawn credit, departing staff — are larger and start much earlier." },
    { trap: "Recommending the sector average gearing.", fix: "The optimum depends on this company's cash flow volatility, asset tangibility and tax position." },
  ],
  keyTerms: [
    { term: "Tax shield", def: "The value created by the deductibility of interest, equal on permanent debt to the amount of debt multiplied by the tax rate." },
    { term: "Financial distress costs", def: "The direct and indirect costs incurred as the probability of insolvency rises, including lost customers, withdrawn supplier credit and forced asset sales." },
    { term: "Financial slack", def: "Cash and unused borrowing capacity held so that a firm need not issue equity at an unfavourable moment." },
    { term: "Debt overhang", def: "The situation where existing debt deters a firm from making a positive-NPV investment because the gain would largely benefit lenders." },
  ],
  summary: [
    "Without tax, structure is irrelevant because cheaper debt is offset by a dearer equity.",
    "With tax, gearing adds value equal to the tax shield — and taken literally implies 100% debt.",
    "Trade-off theory supplies the offsetting cost, and where the optimum sits depends on cash flows and assets.",
    "Pecking order explains behaviour rather than an optimum; agency effects cut in both directions.",
  ],
  knowledgeDiagnostic: [
    { q: "What are the two routes to the WACC under MM with tax?", a: "Weighting the geared cost of equity and after-tax cost of debt by market values, or keu × [1 − (T × Vd ÷ Vg)] — they must agree." },
    { q: "Why can a highly profitable company be lightly geared without being mismanaged?", a: "Pecking order: it funds investment from retained earnings and simply never reaches the point of needing to raise external finance." },
    { q: "When does debt's agency effect help rather than harm?", a: "In a mature, cash-generative business with few investment opportunities, where committing cash to fixed payments removes the discretion to spend it poorly." },
  ],
  furtherStudy: [
    "AFM-17 builds the cost of capital whose behaviour under gearing this chapter explains.",
    "AFM-19 applies the tax shield quantitatively through adjusted present value.",
    "AFM-06 develops the agency conflicts between shareholders and lenders referred to here.",
  ],
}

const AFM_TREE_19: StudyChapter = {
  paper: "AFM",
  id: "AFM-19",
  number: 19,
  area: "B",
  syllabusRefs: ["B3(j)", "B3(k)"],
  title: "Adjusted present value",
  minutes: 19,
  intro:
    "The technique for a project that changes how the company is financed. Value the project as if it had no debt, then add what the debt is worth — separately, and visibly.",
  outcomes: [
    "Explain when APV is the right technique and NPV at a WACC is not",
    "Derive an ungeared cost of equity and use it to compute a base-case value",
    "Identify and value the financing side effects, using the correct discount rate for each",
    "Assemble an APV and interpret the split between base case and financing benefit",
    "Assess a project's effect on the reported financial position and performance",
  ],
  sections: [
    {
      id: "when-apv",
      heading: "When APV, and why",
      blocks: [
        {
          kind: "text",
          md: "A WACC bakes the financing into the discount rate. That works when the capital structure is stable and the project does not change it. APV takes the opposite approach: it strips financing out of the discount rate entirely, values the project on its business risk alone, and then adds the financing effects as separate cash flows.",
        },
        {
          kind: "formula",
          name: "Adjusted present value",
          expr: "APV = base-case NPV (all-equity financed) + PV of the financing side effects",
          note:
            "The base case is discounted at keu, the UNGEARED cost of equity. The side effects — tax shield, issue costs, subsidised loans, grants — are each discounted at a rate reflecting their own risk, which for a tax shield is normally the cost of debt.",
        },
        {
          kind: "table",
          caption: "Which technique for which situation",
          head: ["Situation", "Technique", "Why"],
          rows: [
            ["Project matches existing business risk and financing", "NPV at the existing WACC", "The rate already reflects the right risk and structure"],
            ["Different business risk, stable financing", "NPV at a project-specific WACC", "Re-gear a proxy beta; the structure still holds constant"],
            ["Financing mix changes materially", "APV", "No single set of WACC weights applies"],
            ["Gearing changes over the project's life", "APV", "A constant rate cannot represent a moving structure"],
            ["Subsidised loan, grant or unusual issue costs", "APV", "These are financing benefits with no natural home in a WACC"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The transparency argument",
          md: "APV's second advantage is presentational, and it matters for the professional marks: it shows the board **how much of the project's value comes from the project and how much from the financing**. A deal whose value rests mainly on a tax shield or a subsidised loan is a different proposition from one that stands on its operating cash flows, and a WACC-based NPV conceals which you have.",
        },
      ],
      check: {
        q: "A group will fund an acquisition with debt that raises gearing from 20% to 65%, then repay it over six years. Why is APV the appropriate technique?",
        options: [
          "Because APV always gives a higher value than NPV",
          "Because the capital structure changes materially and then changes again each year, so no single WACC applies — APV values the business risk once and handles the financing effects separately",
          "Because acquisitions must be appraised using APV under the syllabus",
          "Because APV avoids the need to estimate a cost of equity",
        ],
        correct: 1,
        explain:
          "The defining condition for APV is a financing structure that the WACC cannot represent, either because it differs from the existing one or because it moves. Option 0 is untrue and would in any case be a reason for suspicion rather than for use, and option 3 is backwards — APV needs the ungeared cost of equity, which usually means starting from a beta.",
      },
    },
    {
      id: "building",
      heading: "Building an APV, step by step",
      blocks: [
        {
          kind: "list",
          style: "number",
          title: "The method",
          items: [
            "Find the **asset beta** for the project's business risk — un-gear a proxy's equity beta if necessary",
            "Convert it to the **ungeared cost of equity** with CAPM: keu = rf + βa(E(rm) − rf)",
            "Discount the project's operating cash flows at keu, less the investment, to get the **base-case NPV**",
            "Value each **financing side effect** separately, at a rate reflecting its own risk",
            "Add them: base case plus side effects equals APV",
          ],
        },
        {
          kind: "table",
          caption: "The side effects, and the rate each takes",
          head: ["Side effect", "Sign", "Discount rate", "Note"],
          rows: [
            ["Tax relief on interest", "+", "The cost of debt (or risk-free rate)", "Its risk is the risk the interest is paid, so it is debt-like"],
            ["Issue costs of debt and equity", "−", "Not discounted if paid at once", "Watch whether they are tax deductible in the scenario"],
            ["Subsidised loan benefit", "+", "Normally the normal borrowing rate", "The saving is the difference between the market rate and the subsidised rate, after tax"],
            ["Government grant", "+", "Risk-free or cost of debt", "Check any repayment conditions attached"],
            ["Increased distress costs", "−", "Judgemental", "Rarely quantified in an exam, but worth naming in the discussion"],
          ],
        },
        {
          kind: "example",
          title: "A full adjusted present value",
          scenario:
            "A project costs $20m and generates $6m a year for 5 years. Its asset beta is 1.0, the risk-free rate is 4% and the equity risk premium 6%. It will be funded with $8m of debt at 5%, repaid in full at the end of year 5. Tax is 20%, and debt issue costs are 2% of the amount raised.",
          steps: [
            { label: "Ungeared cost of equity", detail: "keu = 4 + 1.0 × 6 = 10%." },
            { label: "Base-case NPV", detail: "5-year annuity factor at 10% = 3.791. So 6 × 3.791 = 22.75, less 20 = +$2.75m." },
            { label: "Tax shield", detail: "Annual interest 8 × 5% = 0.4; relief 0.4 × 20% = $0.08m a year for 5 years. Annuity factor at 5% = 4.329, so PV = 0.08 × 4.329 = +$0.35m." },
            { label: "Issue costs", detail: "8 × 2% = $0.16m, paid now, so −$0.16m." },
            { label: "Assemble", detail: "APV = 2.75 + 0.35 − 0.16 = +$2.94m." },
          ],
          result:
            "Positive, and the split is the finding: $2.75m of the $2.94m comes from the project itself and only $0.19m net from the financing. This deal stands on its operating cash flows, which is a far more robust position than the reverse.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "waterfall",
            title: "From base case to APV ($m)",
            data: {
              unit: "$m",
              items: [
                { label: "Base-case NPV", value: 2.75, kind: "start" },
                { label: "Tax shield", value: 0.35, kind: "delta" },
                { label: "Issue costs", value: -0.16, kind: "delta" },
                { label: "APV", value: 2.94, kind: "total" },
              ],
            },
          },
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The keu trap",
          md: "The base case must be discounted at the **ungeared** cost of equity, derived from the **asset** beta. Using the company's existing geared cost of equity double-counts the financing — once in the rate and again in the tax shield — and inflates the APV. If your base case uses a rate above keu, check which beta went into it.",
        },
      ],
      check: {
        q: "In an APV, at what rate should the tax relief on debt interest normally be discounted?",
        options: [
          "The ungeared cost of equity, for consistency with the base case",
          "The cost of debt, because the tax saving's risk is the risk that the interest is paid at all — which is debt-like, not equity-like",
          "The weighted average cost of capital",
          "It should not be discounted, as it is certain",
        ],
        correct: 1,
        explain:
          "Each side effect takes a rate reflecting its own risk, and a tax shield depends on the debt existing and interest being paid, so it carries the risk of the debt. Using keu would understate its value by discounting a low-risk stream at a high-risk rate. It is not certain — the company must have taxable profits — so option 3 overstates it.",
      },
    },
    {
      id: "reported-effect",
      heading: "What the project does to the reported numbers",
      blocks: [
        {
          kind: "text",
          md: "The second outcome here is separate and easy to overlook: assess the effect of a significant capital investment on the organisation's **reported financial position and performance** under alternative financing strategies. A board that has approved a positive-NPV project can still be ambushed by what it does to the covenants and to the ratios analysts follow.",
        },
        {
          kind: "table",
          caption: "The same project, two financing routes",
          head: ["Measure", "Debt financed", "Equity financed"],
          rows: [
            ["Gearing", "Rises, possibly through a covenant threshold", "Falls"],
            ["Interest cover", "Falls immediately, while returns arrive later", "Unchanged"],
            ["EPS", "Rises once returns exceed the after-tax interest cost", "Dilutes immediately, recovering as returns build"],
            ["ROCE", "Falls in early years — capital employed rises before profit does", "Falls in early years, same reason"],
            ["Control", "Unchanged", "Diluted, unless the issue is a rights issue taken up in full"],
            ["Credit rating", "May be downgraded, raising the cost of all debt", "Neutral to positive"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The timing mismatch is the real point",
          md: "Almost every large project makes the ratios worse before it makes them better: the capital and the interest arrive immediately, the returns arrive over years. Say this explicitly and quantify the trough — the year in which cover is lowest, and how close it comes to the covenant. That is the analysis that stops a good project being abandoned halfway, or a covenant being breached by surprise.",
        },
        {
          kind: "activity",
          title: "Advise on the financing consequence",
          prompt:
            "A group with interest cover of 4.2 times and a covenant at 3.0 is appraising a $200m project. Debt funding would add $12m of annual interest; operating profit is currently $63m and the project adds nothing in year one, $9m in year two and $22m from year three. Should the board be concerned?",
          answer:
            "Yes, and the year to look at is the first one. Current interest is 63 divided by 4.2, which is $15m. Add $12m and interest becomes $27m, while operating profit in year one is still $63m because the project contributes nothing - so cover falls to 63 over 27, which is 2.33 times, well below the 3.0 covenant. Year two gives 72 over 27, which is 2.67, still short. Only in year three does 85 over 27 reach 3.15, and that leaves almost no headroom for any operational disappointment. So on these numbers the project cannot be financed entirely with debt without breaching the covenant for at least two years, regardless of its net present value. The advice is that the funding structure has to change rather than the project: a larger equity component, a facility with a covenant holiday or a reset schedule negotiated before drawdown, or phasing the capital so the interest builds in step with the returns. The general point is that a covenant is a constraint on the FINANCING decision, and testing it belongs beside the appraisal rather than after it.",
        },
      ],
      check: {
        q: "Why does a large, value-adding project often worsen return on capital employed in its early years?",
        options: [
          "Because the project's NPV must have been calculated incorrectly",
          "Because the capital employed rises immediately while the additional profit builds up over several years, so the ratio's denominator grows before its numerator does",
          "Because tax allowable depreciation reduces reported profit",
          "Because ROCE excludes projects still under construction",
        ],
        correct: 1,
        explain:
          "It is a timing mismatch in the ratio, not a sign of a bad decision: the whole investment enters capital employed at once and returns accrue later. This is exactly why a project can be right on discounted cash flow grounds and still look damaging on the measures a board and its analysts watch — and why the trough should be quantified in advance.",
      },
    },
  ],
  examTraps: [
    { trap: "Discounting the base case at a geared cost of equity.", fix: "Use keu from the ASSET beta, or the financing benefit is counted twice." },
    { trap: "Discounting the tax shield at keu.", fix: "It is debt-like risk — use the cost of debt or the risk-free rate." },
    { trap: "Reporting only the APV total.", fix: "Show the split; a project standing on its tax shield is a different proposition from one standing on its cash flows." },
    { trap: "Ignoring the covenant effect of the financing.", fix: "Compute interest cover in the trough year, before the returns arrive." },
  ],
  keyTerms: [
    { term: "Adjusted present value", def: "A valuation that discounts a project's cash flows as if it were all-equity financed, then adds the present value of the financing side effects separately." },
    { term: "Base-case NPV", def: "The net present value of a project's operating cash flows discounted at the ungeared cost of equity, before any financing effects." },
    { term: "Ungeared cost of equity", def: "The return shareholders would require if the business carried no debt, derived from the asset beta." },
    { term: "Financing side effect", def: "A cash flow arising from how a project is funded rather than from the project itself — tax relief on interest, issue costs, subsidised borrowing or grants." },
  ],
  summary: [
    "Use APV when the financing mix differs from the existing one or changes over the project's life.",
    "Discount the base case at the ungeared cost of equity, from the asset beta.",
    "Value each side effect at a rate reflecting its own risk — the tax shield is debt-like.",
    "Report the split, and quantify what the financing does to cover and covenants in the trough year.",
  ],
  knowledgeDiagnostic: [
    { q: "What makes APV preferable to a WACC-based NPV for a buy-out?", a: "The capital structure changes materially and then changes again each year as debt is repaid, so no single set of WACC weights or cost of equity holds throughout." },
    { q: "Why is the split between base case and side effects worth reporting?", a: "It tells the board whether the project's value comes from its operations or from its funding — a deal resting on a tax shield or subsidy is far more fragile." },
    { q: "What is the keu trap?", a: "Discounting the base case at the geared cost of equity, which counts the financing benefit twice — once in the rate and again in the tax shield." },
  ],
  furtherStudy: [
    "AFM-17 supplies the asset beta and the ungeared cost of equity the base case needs.",
    "AFM-18 explains why the tax shield exists and what limits how much of it a company should pursue.",
    "AFM-10 covers the tax and inflation handling that the base-case cash flows still require.",
  ],
}

const AFM_TREE_20: StudyChapter = {
  paper: "AFM",
  id: "AFM-20",
  number: 20,
  area: "B",
  syllabusRefs: ["B3(f)", "B3(g)", "B3(h)"],
  title: "Duration, convexity and credit risk",
  minutes: 19,
  intro:
    "How exposed is our debt to a rate change, and what should we be paying for it? Three outcomes the legacy chapter did not cover at all, and both halves reduce to one question: what is this borrowing really worth.",
  outcomes: [
    "Calculate Macaulay duration and modified duration for a bond",
    "Estimate the price effect of a yield change, and state the limits of the estimate",
    "Explain convexity and the direction of the error duration alone produces",
    "Explain the role of credit rating agencies and the models they apply",
    "Estimate a cost of debt from the term structure of interest rates plus a credit spread",
  ],
  sections: [
    {
      id: "duration",
      heading: "Duration: the weighted average life of a bond's cash flows",
      blocks: [
        {
          kind: "text",
          md: "A bond's redemption date tells you when the principal arrives and nothing about the coupons along the way. **Duration** fixes that: it is the average time to receipt of all the bond's cash flows, each weighted by its present value. It is measured in years, and it doubles as the bond's sensitivity to interest rates — a longer duration means a bigger price move for the same change in yield.",
        },
        {
          kind: "formula",
          name: "Macaulay duration",
          expr: "D = Σ (t × PV of cash flow at t) ÷ Σ (PV of cash flows)",
          note:
            "The denominator is simply the bond's price. Note that a zero-coupon bond's duration equals its maturity exactly, because there is only one cash flow — and that any coupon-paying bond's duration is therefore shorter than its maturity.",
        },
        {
          kind: "example",
          title: "Duration of a three-year bond",
          scenario:
            "A bond with $100 nominal pays a 6% annual coupon and redeems at par in 3 years. The required yield is 8%.",
          steps: [
            { label: "Cash flows and discount factors", detail: "Year 1: 6 at 0.9259. Year 2: 6 at 0.8573. Year 3: 106 at 0.7938." },
            { label: "Present values", detail: "5.56 + 5.14 + 84.15 = $94.85 — which is the bond's price." },
            { label: "Weight by time", detail: "(1 × 5.56) + (2 × 5.14) + (3 × 84.15) = 5.56 + 10.29 + 252.45 = 268.30." },
            { label: "Divide", detail: "D = 268.30 ÷ 94.85 = 2.83 years." },
          ],
          result:
            "2.83 years against a 3-year maturity. The coupons pull the average forward — and the higher the coupon, the shorter the duration, because more of the value arrives early.",
        },
        {
          kind: "formula",
          name: "Modified duration and the price effect",
          expr: "Modified duration = D ÷ (1 + y)     and     ΔPrice ≈ − Modified duration × Δy × Price",
          note:
            "Modified duration converts the weighted-average-life measure into a direct price sensitivity. Above: 2.83 ÷ 1.08 = 2.62, so a 0.5% rise in yield implies a price fall of 2.62 × 0.005 × 94.85 = $1.24, giving $93.61 against an actual recomputed price of $93.62.",
        },
        {
          kind: "callout",
          tone: "tip",
          title: "What duration lets a treasurer do",
          md: "Duration turns a portfolio of different bonds into a single comparable number, so it supports two practical moves: **immunisation**, matching the duration of assets to the duration of liabilities so a rate change affects both equally, and deliberate **positioning**, shortening duration when rates are expected to rise and lengthening it when they are expected to fall.",
        },
      ],
      check: {
        q: "Two bonds both redeem in 5 years. Bond A pays a 2% coupon, bond B pays 9%. Which has the longer duration and why?",
        options: [
          "Bond B, because its higher coupons increase the total cash received",
          "Bond A, because more of its value arrives at redemption rather than through coupons, so the weighted average time to receipt is later",
          "They are identical, because duration depends only on maturity",
          "Bond A, because lower coupons mean a lower price",
        ],
        correct: 1,
        explain:
          "Duration weights each cash flow by its present value, so a bond that pays little until redemption has its value concentrated at the end. The low-coupon bond therefore has the longer duration and is more sensitive to a change in yield — which is why zero-coupon bonds, whose duration equals maturity, are the most rate-sensitive of all.",
      },
    },
    {
      id: "convexity",
      heading: "Convexity: why duration alone is not enough",
      blocks: [
        {
          kind: "text",
          md: "Duration describes a straight line, but the true relationship between a bond's price and its yield is a **curve**, bowed toward the origin. Duration is the tangent to that curve at the current yield, so it is accurate for small movements and increasingly wrong for large ones.",
        },
        {
          kind: "example",
          title: "Where the straight line fails",
          scenario:
            "The same bond, priced at $94.85 with a modified duration of 2.62. Compare a small yield rise of 0.5% with a large one of 4%.",
          steps: [
            { label: "Small change, predicted", detail: "−2.62 × 0.005 × 94.85 = −$1.24, giving $93.61." },
            { label: "Small change, actual", detail: "Recomputing at 8.5% gives $93.62 — an error of one cent." },
            { label: "Large change, predicted", detail: "−2.62 × 0.04 × 94.85 = −$9.94, giving $84.91." },
            { label: "Large change, actual", detail: "Recomputing at 12% gives $85.59 — duration OVERSTATED the fall by $0.68." },
          ],
          result:
            "That $0.68 is convexity. Because the curve lies above the tangent everywhere, duration overstates the price fall when yields rise and understates the price rise when yields fall.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "Convexity is a benefit to the holder",
          md: "The error runs the investor's way in **both** directions: you lose less than predicted when rates rise and gain more than predicted when they fall. So between two bonds with the same duration and yield, the more convex one is worth more — and investors will pay for it.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "The limitations of duration to state in an answer",
          items: [
            "It is a linear approximation, so it degrades as the yield change grows — hence convexity",
            "It assumes a **parallel shift** in the yield curve, whereas real curves twist and steepen",
            "It changes as time passes and as yields move, so it needs recalculating rather than being set once",
            "It assumes cash flows are fixed, so it does not hold for callable, puttable or convertible bonds whose cash flows change with rates",
            "It reflects interest rate risk only, and says nothing about credit risk",
          ],
        },
      ],
      check: {
        q: "Interest rates fall sharply. Using modified duration alone, what error is made in estimating a bond's new price?",
        options: [
          "The price rise is overstated, because duration is a linear measure",
          "The price rise is understated, because the true price-yield relationship is convex and lies above the straight-line estimate",
          "No error arises, since duration is exact for parallel shifts",
          "The price is estimated correctly but the yield is not",
        ],
        correct: 1,
        explain:
          "Because the price-yield curve is convex, it sits above the tangent line on both sides. A large fall in yields therefore produces a bigger price rise than the linear estimate predicts, and a large rise produces a smaller fall — an asymmetry that works in the holder's favour and is what makes convexity valuable.",
      },
    },
    {
      id: "credit-risk",
      heading: "Credit risk: ratings, spreads and the term structure",
      blocks: [
        {
          kind: "text",
          md: "Duration prices exposure to interest rates. **Credit risk** is the separate question of whether the borrower pays at all, and the syllabus asks for three things: what rating agencies do, how to estimate a credit spread, and how to build a cost of debt from the term structure plus that spread.",
        },
        {
          kind: "table",
          caption: "The rating scale, in outline",
          head: ["Band", "Broad meaning", "Consequence for the issuer"],
          rows: [
            ["AAA to AA", "Highest quality; very low default risk", "Narrowest spreads, widest investor base"],
            ["A to BBB", "Investment grade; adequate to strong capacity", "Accessible funding; BBB is the critical floor"],
            ["BB and below", "Speculative, often called high yield", "Materially wider spreads; many institutional mandates cannot hold it"],
            ["D", "In default", "No market access"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The investment-grade cliff",
          md: "The step from BBB to BB is not one notch of extra cost — it is a **cliff**. Many funds are contractually barred from holding sub-investment-grade paper, so a downgrade across that line removes a whole class of buyer at once, widening the spread far more than the change in default probability alone would justify. When a scenario has a company hovering at BBB−, this is the risk to flag.",
        },
        {
          kind: "text",
          md: "Agencies assess both **quantitative** factors — gearing, interest cover, cash flow to debt, the stability of earnings — and **qualitative** ones: industry position, management quality, governance, country risk, and the parent's willingness to support a subsidiary. Their limitations are examinable too: ratings are opinions rather than guarantees, they respond after the deterioration rather than before it, and the issuer pays for the rating, which is a structural conflict.",
        },
        {
          kind: "formula",
          name: "Cost of debt from the term structure",
          expr: "Pre-tax cost of debt = risk-free yield for that maturity + credit spread for that rating and maturity",
          note:
            "Take the government yield for the matching term from the yield curve, then add the spread from the credit spread table. A 5-year borrowing by a BBB issuer with a 5-year government yield of 3.2% and a 5-year BBB spread of 1.4% costs 4.6% before tax, or 3.68% after tax at 20%.",
        },
        {
          kind: "text",
          md: "Note the term matters twice: the risk-free rate is taken from the point on the **yield curve** matching the borrowing's maturity, and the spread itself usually widens with maturity because there is more time for the issuer's position to deteriorate. Reading both from the wrong column is a common and easily avoided error.",
        },
        {
          kind: "activity",
          title: "Why is the yield curve shaped as it is?",
          prompt:
            "Give the three standard explanations for the shape of the term structure, and say what a sharply inverted curve would tell a corporate treasurer.",
          answer:
            "Expectations theory says long rates are the market's average expectation of future short rates, so an upward slope means rates are expected to rise. Liquidity preference says investors demand a premium for tying money up longer, which biases the curve upward regardless of expectations. Market segmentation says different maturities are separate markets with their own supply and demand - pension funds at the long end, banks at the short - so the shape reflects those flows rather than one coherent forecast. In practice all three operate, which is why a curve is rarely a clean signal. For a treasurer, a sharply inverted curve - long rates below short - is usually read as the market expecting rates to fall, typically because it expects a slowdown. The practical consequences are twofold and pull in opposite directions: borrowing long is cheap right now and locking in a long fixed rate looks attractive, but if a recession is genuinely coming then revenues are about to fall, so the fixed charge being locked in becomes harder to service. I would want to fix duration modestly rather than aggressively, and I would take the covenant headroom question at least as seriously as the coupon.",
        },
      ],
      check: {
        q: "A company rated BBB− is close to a downgrade to BB+. Why is this more serious than a one-notch downgrade elsewhere on the scale?",
        options: [
          "Because BB+ issuers cannot legally issue bonds",
          "Because it crosses from investment grade into speculative grade, and many institutional investors are contractually prevented from holding sub-investment-grade paper — so a whole class of buyer disappears and the spread widens disproportionately",
          "Because rating agencies charge higher fees for speculative ratings",
          "Because the coupon on existing bonds automatically increases",
        ],
        correct: 1,
        explain:
          "The cost of the downgrade comes from the loss of demand, not just from the change in assessed default probability. Mandates that exclude speculative-grade holdings force selling and remove future buyers at once, which is why spreads gap across that boundary. Existing fixed coupons do not change, though some facilities do carry ratings-linked margin ratchets.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating maturity as a measure of interest rate sensitivity.", fix: "Use duration — coupons pull the weighted average forward, so a high-coupon bond is less sensitive." },
    { trap: "Forgetting to divide Macaulay duration by (1 + y).", fix: "The price-change formula needs MODIFIED duration." },
    { trap: "Applying duration to a large yield movement without qualification.", fix: "Name convexity, and say which way the error runs — it overstates falls and understates rises." },
    { trap: "Building a cost of debt from a single risk-free rate.", fix: "Take the government yield for the matching maturity and add the spread for that rating AND that term." },
  ],
  keyTerms: [
    { term: "Macaulay duration", def: "The weighted average time to receipt of a bond's cash flows, each weighted by its present value, expressed in years." },
    { term: "Modified duration", def: "Macaulay duration divided by one plus the yield, giving the approximate percentage price change for a one-unit change in yield." },
    { term: "Convexity", def: "The curvature of the price-yield relationship, which makes duration overstate price falls and understate price rises, to the holder's benefit." },
    { term: "Credit spread", def: "The additional yield over the risk-free rate of the same maturity that compensates an investor for a borrower's default risk." },
  ],
  summary: [
    "Duration is the present-value-weighted average life of a bond's cash flows, and its rate sensitivity.",
    "Modified duration estimates the price effect; it is accurate for small movements only.",
    "Convexity means the error favours the holder — smaller falls, larger rises than predicted.",
    "Build a cost of debt from the yield curve point matching the term, plus the spread for that rating and term.",
  ],
  knowledgeDiagnostic: [
    { q: "Why does a zero-coupon bond have duration equal to its maturity?", a: "There is only one cash flow, at redemption, so the weighted average time to receipt is that date." },
    { q: "In which direction does duration err when yields rise sharply?", a: "It overstates the price fall, because the convex price-yield curve lies above the straight-line estimate." },
    { q: "Why does a downgrade from BBB− to BB+ widen spreads disproportionately?", a: "It crosses out of investment grade, and mandates that bar speculative-grade holdings remove a whole class of investor at once." },
  ],
  furtherStudy: [
    "AFM-17 uses the cost of debt estimated here as an input to the weighted average cost of capital.",
    "AFM-16 covers the debt instruments whose interest rate exposure duration measures.",
    "Area E hedges the interest rate exposure this chapter measures, using forward rate agreements, futures, options and swaps.",
  ],
}

export const AFM_TREE_AREA_B_PART3: StudyChapter[] = [AFM_TREE_16, AFM_TREE_17, AFM_TREE_18, AFM_TREE_19, AFM_TREE_20]
