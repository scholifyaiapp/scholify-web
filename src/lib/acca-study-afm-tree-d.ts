import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * AFM · Area D — corporate reconstruction and re-organisation.
 *
 *   AFM-31  Predicting and diagnosing corporate failure   (D1a, diagnosis)
 *   AFM-32  Designing a financial reconstruction          (D1a, D1b)
 *   AFM-33  Unbundling: the four routes                   (D2a, D2b)
 *   AFM-34  Management buy-outs and buy-ins               (D2c)
 *
 * Area D is the smallest technical area — two subsections, five outcomes — but
 * it carries the paper's only genuinely adversarial arithmetic: every party to
 * a reconstruction has a different alternative, and the scheme only proceeds if
 * each of them is better off than under that alternative. AFM-32 therefore
 * teaches the better-off test as a comparison of columns rather than as a
 * definition.
 *
 * Written against the official ACCA AFM syllabus and study guide for September
 * 2026 to June 2027. Kaplan's AFM Study Text and Exam Kit (2020-21) informed
 * depth and chapter sizing only; all wording is original. Insolvency priority
 * is taught generically, since AFM is not a law paper and the exact ranking
 * differs between jurisdictions.
 */

const AFM_TREE_31: StudyChapter = {
  paper: "AFM",
  id: "AFM-31",
  number: 31,
  area: "D",
  syllabusRefs: ["D1(a)"],
  title: "Predicting and diagnosing corporate failure",
  minutes: 16,
  intro:
    "Before you can advise on a rescue you have to know whether there is a business worth rescuing. The models give you a score; the diagnosis is still yours to make.",
  outcomes: [
    "Compute and interpret a Z-score, and place a company in the right zone",
    "State what a statistical failure model can and cannot tell a board",
    "Use qualitative indicators alongside the score",
    "Distinguish a liquidity crisis from insolvency, and a viable business from a doomed one",
    "Decide whether reconstruction is the appropriate response at all",
  ],
  sections: [
    {
      id: "z-score",
      heading: "The Z-score, computed and read",
      blocks: [
        {
          kind: "text",
          md: "Altman's Z-score combines five ratios into one number, each weighted by how well it discriminated between failed and surviving companies in the original study. Its value in an exam is that it forces attention onto five different dimensions of weakness at once — liquidity, accumulated profitability, current earning power, market confidence and asset productivity.",
        },
        {
          kind: "formula",
          name: "Altman's Z-score",
          expr: "Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅",
          note:
            "X₁ working capital ÷ total assets; X₂ retained earnings ÷ total assets; X₃ earnings before interest and tax ÷ total assets; X₄ market value of equity ÷ book value of total liabilities; X₅ sales ÷ total assets. Note X₃ carries by far the largest weight — current earning power is what the model relies on most.",
        },
        {
          kind: "table",
          caption: "The three zones",
          head: ["Score", "Zone", "Reading"],
          rows: [
            ["Above 2.99", "Safe", "Failure unlikely on these measures"],
            ["1.81 to 2.99", "Grey", "Uncertain — the model cannot discriminate, so judgement decides"],
            ["Below 1.81", "Distress", "Financial characteristics resemble companies that subsequently failed"],
          ],
        },
        {
          kind: "example",
          title: "Scoring a company under pressure",
          scenario:
            "Total assets $200m, working capital $20m, retained earnings $30m, earnings before interest and tax $16m, market value of equity $60m, total liabilities $120m, sales $240m.",
          steps: [
            { label: "X₁", detail: "20 ÷ 200 = 0.10, weighted 1.2 → 0.120." },
            { label: "X₂", detail: "30 ÷ 200 = 0.15, weighted 1.4 → 0.210." },
            { label: "X₃", detail: "16 ÷ 200 = 0.08, weighted 3.3 → 0.264." },
            { label: "X₄", detail: "60 ÷ 120 = 0.50, weighted 0.6 → 0.300." },
            { label: "X₅", detail: "240 ÷ 200 = 1.20, weighted 1.0 → 1.200." },
          ],
          result:
            "Z = 2.09 — the grey zone, and toward its lower half. The honest reading is that the model cannot classify this company, which is a finding in itself: it does not say 'safe'.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "What a Z-score is not",
          md: "It is a **statistical association**, not a causal model or a prediction. The coefficients come from a particular sample of manufacturers in a particular era, so they travel badly to service businesses, to companies with few tangible assets, and to different jurisdictions and accounting regimes. It also relies on published accounts, which are historic and can be presented favourably by the very management whose position is in question.",
        },
      ],
      check: {
        q: "A company scores 2.4 on Altman's Z-score. What should be reported to the board?",
        options: [
          "That the company is safe, since the score exceeds 1.81",
          "That the score falls in the grey zone where the model cannot discriminate reliably, so it neither clears nor condemns the company — and the judgement must rest on qualitative evidence and the cash position",
          "That failure is certain within two years",
          "That the score should be recalculated using book values of equity to obtain a clearer answer",
        ],
        correct: 1,
        explain:
          "The grey zone is exactly the range in which the model's discriminating power fails, so reporting it as a pass misuses the tool. Option 2 overstates what any statistical score can say, and option 3 would corrupt the calculation — X₄ is defined on the market value of equity precisely because it captures market confidence.",
      },
    },
    {
      id: "qualitative",
      heading: "The evidence a score cannot carry",
      blocks: [
        {
          kind: "text",
          md: "Argenti's work on the failure process is the standard qualitative counterpart, and its value is that it describes failure as a **sequence** rather than an event. Defects come first, then a mistake the defects made possible, then symptoms, then collapse — and by the time the symptoms appear in the accounts, the causes are years old.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "flow",
            title: "The failure sequence",
            data: {
              steps: [
                { label: "Defects", sub: "Dominant chief executive, weak board, no budgetary control, no response to change" },
                { label: "Mistakes", sub: "Overtrading, one project too large to survive, gearing beyond capacity" },
                { label: "Symptoms", sub: "Deteriorating ratios, creative accounting, non-financial signs" },
                { label: "Failure", sub: "Cash exhausted, covenant breached, insolvency" },
              ],
            },
          },
        },
        {
          kind: "list",
          style: "bullet",
          title: "Warning signs the accounts do not show",
          items: [
            "A single dominant individual whose judgement nobody in the room will challenge",
            "Finance director marginalised, or a rapid turnover of finance staff and auditors",
            "Accounting policy changes and revaluations that happen to improve the reported position",
            "Late filing of accounts, and increasingly heavy reliance on short-term facilities",
            "Suppliers moving to cash on delivery, and lengthening creditor days",
            "Key customers or contracts lost without replacement",
            "Loss of experienced staff, deferred maintenance, and postponed capital expenditure",
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction the whole area turns on",
          md: "**Liquidity crisis**: a fundamentally sound business that cannot meet obligations as they fall due — worth rescuing, because there is something underneath. **Insolvency in the balance-sheet sense with no viable business**: the operations cannot earn their cost of capital however they are financed — reconstruction merely postpones the outcome and consumes what value remains. A reconstruction answer that does not make this distinction first is answering the wrong question.",
        },
        {
          kind: "activity",
          title: "Diagnose before prescribing",
          prompt:
            "A manufacturer has breached its covenants, has a Z-score of 1.6, and cannot pay a bond maturing in four months. Its operating margin has been stable at 9% for five years and its order book is full. What is your diagnosis and what follows from it?",
          answer:
            "This looks like a financing failure rather than a business failure, and that distinction decides everything that follows. The operating evidence is sound - a stable 9% margin over five years and a full order book say the products sell and the operations work. What has failed is the capital structure: too much debt, and a maturity the company cannot refinance. The Z-score of 1.6 is consistent with that, because the score is driven partly by gearing through X4 and by working capital through X1, both of which reflect the financing rather than the trade. So the appropriate response is a financial reconstruction - rescheduling the maturity, a debt-for-equity swap, or new equity - rather than a liquidation, because there is a viable business underneath that would be destroyed by breaking it up. What I would want before committing is a short-term cash forecast to the week, since the four-month deadline is the binding constraint and any scheme has to be agreed inside it, and confirmation that the margin is genuine rather than sustained by deferred maintenance or under-investment, which would mean the operating strength is borrowed from the future.",
        },
      ],
      check: {
        q: "Why does the distinction between a liquidity crisis and an unviable business come first in any reconstruction advice?",
        options: [
          "Because liquidity crises are always more serious",
          "Because a reconstruction can only rescue a business that can earn its cost of capital once refinanced — restructuring the finances of an unviable operation postpones the outcome and consumes the value that remains",
          "Because only liquidity crises are examinable",
          "Because the Z-score cannot be calculated for insolvent companies",
        ],
        correct: 1,
        explain:
          "Reconstruction changes who owns the claims and when they are paid; it does not change whether the underlying operations make money. If they cannot, every party is better off realising value now than funding a delay. Establishing viability first is what makes the rest of the analysis meaningful.",
      },
    },
  ],
  examTraps: [
    { trap: "Reporting a grey-zone Z-score as evidence of safety.", fix: "The grey zone is where the model cannot discriminate — say so, and rest the judgement elsewhere." },
    { trap: "Using book value of equity in X₄.", fix: "The ratio is defined on market value, because it is capturing market confidence." },
    { trap: "Presenting a Z-score as a prediction.", fix: "It is a statistical association from a specific sample and era, drawn from historic published accounts." },
    { trap: "Recommending a reconstruction without testing viability.", fix: "Establish whether the operations can earn their cost of capital once refinanced." },
  ],
  keyTerms: [
    { term: "Z-score", def: "A weighted combination of five financial ratios producing a single score that classifies a company as safe, uncertain or distressed." },
    { term: "Grey zone", def: "The Z-score range between 1.81 and 2.99 in which the model cannot discriminate reliably between companies that fail and those that survive." },
    { term: "Liquidity crisis", def: "Inability to meet obligations as they fall due despite a fundamentally sound business — a financing failure rather than an operating one." },
    { term: "Overtrading", def: "Expanding activity beyond the working capital available to support it, so that a profitable business runs out of cash." },
  ],
  summary: [
    "Compute the Z-score, then place it in a zone — and treat the grey zone as an absence of a verdict.",
    "X₃, current earning power, carries the largest weight; X₄ requires market value of equity.",
    "Qualitative signs precede the ratios: failure is a sequence of defects, mistakes and symptoms.",
    "Separate a financing failure from an unviable business before recommending anything.",
  ],
  knowledgeDiagnostic: [
    { q: "Which Z-score component is weighted most heavily, and why does that matter?", a: "X₃, earnings before interest and tax over total assets, at 3.3 — current earning power dominates, so a company with weak trading cannot score well however its balance sheet looks." },
    { q: "Why does Argenti's model add something a Z-score cannot?", a: "It describes failure as a sequence beginning with governance defects years before the symptoms reach the accounts, so it can identify risk while the ratios still look adequate." },
    { q: "When is reconstruction the wrong answer?", a: "When the operations cannot earn their cost of capital under any financing structure — restructuring then only postpones failure and consumes remaining value." },
  ],
  furtherStudy: [
    "AFM-32 designs the reconstruction this diagnosis decides is appropriate.",
    "AFM-28 values a loss-making company, where the same temporary-versus-structural judgement applies.",
    "AFM-02 covers the ratio analysis and covenant discipline whose failure appears here.",
  ],
}

const AFM_TREE_32: StudyChapter = {
  paper: "AFM",
  id: "AFM-32",
  number: 32,
  area: "D",
  syllabusRefs: ["D1(a)", "D1(b)"],
  title: "Designing a financial reconstruction",
  minutes: 20,
  intro:
    "A reconstruction is agreed, not imposed. Every party can refuse, and each will compare your scheme against what they would get if the company were simply broken up — so that comparison is the design tool.",
  outcomes: [
    "Identify the levers available in a financial reconstruction",
    "Build the liquidation column that every party will measure your scheme against",
    "Apply the better-off test to each class of claim separately",
    "Design a scheme that leaves each class better off than liquidation",
    "Assess how the capital market and individual capital providers will respond",
  ],
  sections: [
    {
      id: "levers",
      heading: "The levers",
      blocks: [
        {
          kind: "table",
          caption: "What a reconstruction can change",
          head: ["Lever", "What it does", "Who gives up what"],
          rows: [
            ["Debt for equity swap", "Converts debt into shares", "Lenders give up a fixed claim for an uncertain one; shareholders are diluted"],
            ["Debt rescheduling", "Extends maturities, defers or reduces interest", "Lenders give up timing and possibly yield; the company gains breathing space"],
            ["Debt forgiveness (haircut)", "Writes off part of the principal", "Lenders take a definite loss now in exchange for a viable borrower"],
            ["New equity issue", "Brings in fresh cash", "Existing shareholders are diluted; new investors take the risk"],
            ["Asset disposals", "Raises cash from non-core assets", "Future earnings are given up for present liquidity"],
            ["Operational restructuring", "Closes loss-making activities", "Employees and communities bear the cost; the business becomes viable"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Almost every scheme mixes them",
          md: "A reconstruction that asks only one party to concede will be refused. Real schemes typically pair a lender concession with a shareholder dilution and a management commitment, precisely so that no class can argue it alone is carrying the rescue. When you design one in an answer, show what **each** party gives and gets.",
        },
      ],
      check: {
        q: "Why would a lender ever agree to convert debt into equity, exchanging a fixed claim for an uncertain one?",
        options: [
          "Because equity always yields more than debt",
          "Because the alternative is liquidation, where the recovery on the debt would be a fraction of its face value — the equity in a viable rescued business may be worth more than that recovery",
          "Because regulators require lenders to accept swaps",
          "Because the conversion is reversible if the company recovers",
        ],
        correct: 1,
        explain:
          "The comparison is never debt against equity in the abstract — it is this equity against the recovery available on liquidation. Where a borrower cannot service the debt, the fixed claim is nominal and the realistic choice is between a small certain recovery and a share of a business that may recover. Option 3 misdescribes a swap, which is not reversible.",
      },
    },
    {
      id: "better-off",
      heading: "The better-off test, column by column",
      blocks: [
        {
          kind: "text",
          md: "The decisive analysis is a comparison: what does each class receive **if the company is liquidated**, against what your scheme offers them? Build the liquidation column first, because it is the benchmark every party will apply.",
        },
        {
          kind: "list",
          style: "number",
          title: "The order in which liquidation proceeds are consumed",
          items: [
            "The costs of the liquidation itself, including the liquidator's fees",
            "Creditors secured by a fixed charge, out of the specific assets charged",
            "Preferential creditors, which in most regimes include certain employee claims",
            "Creditors secured by a floating charge, out of the assets subject to it",
            "Unsecured creditors, sharing whatever remains in proportion to their claims",
            "Shareholders, who receive anything left — which in a genuine insolvency is nothing",
          ],
        },
        {
          kind: "example",
          title: "Building the liquidation column",
          scenario:
            "A distressed company's assets would realise $40m on a forced sale. Liquidation costs are estimated at $3m. Fixed-charge lenders are owed $18m, preferential claims are $4m, floating-charge lenders are owed $10m, and unsecured creditors are owed $25m.",
          steps: [
            { label: "Proceeds", detail: "$40m available." },
            { label: "Less costs", detail: "40 − 3 = $37m." },
            { label: "Fixed charge", detail: "37 − 18 = $19m remaining; those lenders are paid in full." },
            { label: "Preferential", detail: "19 − 4 = $15m remaining; paid in full." },
            { label: "Floating charge", detail: "15 − 10 = $5m remaining; paid in full." },
            { label: "Unsecured", detail: "$5m against $25m owed = 20 cents in the dollar. Shareholders receive nothing." },
          ],
          result:
            "That 20 cents is the number every unsecured creditor will compare your scheme against — and the nil return is why shareholders have almost no bargaining power in a genuine insolvency.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "waterfall",
            title: "How $40m of proceeds is consumed ($m)",
            data: {
              unit: "$m",
              items: [
                { label: "Proceeds", value: 40, kind: "start" },
                { label: "Liquidation costs", value: -3, kind: "delta" },
                { label: "Fixed charge", value: -18, kind: "delta" },
                { label: "Preferential", value: -4, kind: "delta" },
                { label: "Floating charge", value: -10, kind: "delta" },
                { label: "For unsecured", value: 5, kind: "total" },
              ],
            },
          },
        },
        {
          kind: "text",
          md: "Now test the scheme against it. Suppose the unsecured creditors are offered $4m in cash plus equity in the reconstructed company estimated to be worth $9m. That is $13m against $25m owed — **52 cents in the dollar**, compared with 20 cents on liquidation. They are materially better off, and should support it.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Test each class separately, and challenge the equity valuation",
          md: "A scheme can leave the group as a whole better off while making one class worse off, and that class will vote it down. Test every column. And note that the creditors' 52 cents depends entirely on the estimated $9m equity value — which is management's forecast of a business that has just failed. Applying scepticism to that figure, and showing what the return becomes if the equity is worth half as much, is exactly the professional-skills work the paper rewards.",
        },
      ],
      check: {
        q: "Unsecured creditors owed $30m would recover 15 cents in the dollar on liquidation. A scheme offers them $3m cash plus shares valued at $6m. Should they accept?",
        options: [
          "No, because they recover only $9m of the $30m owed",
          "Yes on these figures — $9m is 30 cents in the dollar against 15 on liquidation — but the recommendation depends on the share valuation, which is a forecast for a business that has just failed and should be tested",
          "No, because creditors should never accept shares",
          "Yes, because any scheme is preferable to liquidation",
        ],
        correct: 1,
        explain:
          "The test is relative, not absolute: 30 cents beats 15, so the scheme is worth supporting on the stated figures. But half the consideration is an estimate of what the rescued equity is worth, so the correct answer accepts conditionally and challenges that input — if the shares prove worth $3m, the return falls to 20 cents and the margin largely disappears.",
      },
    },
    {
      id: "market-response",
      heading: "How the market and the providers will respond",
      blocks: [
        {
          kind: "text",
          md: "The second outcome asks you to assess the likely response of the capital market and of individual suppliers of capital, and the effect of that response on the company's value. Different providers have genuinely different interests, and a scheme is agreed only if each of them can be brought across.",
        },
        {
          kind: "table",
          caption: "What each party wants, and what will persuade them",
          head: ["Party", "Concern", "What brings them across"],
          rows: [
            ["Secured lenders", "Recovery of principal; security cover", "Strong asset cover, tighter covenants, a credible plan, improved margin"],
            ["Unsecured creditors", "Recovering more than liquidation would give", "A better-off comparison they can verify, and equity with real prospects"],
            ["Existing shareholders", "Dilution; retaining some value", "Evidence that dilution beats a nil return, and an upside if the rescue works"],
            ["New investors", "Return for the risk taken", "Control, a discounted entry price, board representation, protective terms"],
            ["Employees and management", "Jobs; whether the plan is deliverable", "A credible operating plan; retention and incentives for those the plan needs"],
            ["Customers and suppliers", "Continuity of supply and of credit", "Public evidence that the rescue is funded and the business will continue"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The customer and supplier reaction can decide the outcome",
          md: "This is the effect candidates omit. A reconstruction announced without conviction causes customers to seek alternative suppliers and suppliers to withdraw credit — which drains the cash the rescue depends on. So the communication plan is not presentation, it is part of the scheme's viability, and recommending it is a commercial acumen mark.",
        },
        {
          kind: "text",
          md: "As to value: a well-received reconstruction can raise the total value of the company, because removing the probability of failure removes the distress costs that were depressing it. That is the argument to make to shareholders facing dilution — a smaller share of a viable company can be worth more than a larger share of one that is about to fail, and the honest version of this argument shows both numbers.",
        },
      ],
      check: {
        q: "Why can a reconstruction increase the total value of a company even though existing shareholders are heavily diluted?",
        options: [
          "Because issuing shares always creates value",
          "Because removing the probability of failure removes the distress costs — lost customers, withdrawn supplier credit, forced disposals — that were depressing the value of the whole business",
          "Because dilution reduces the cost of equity",
          "Because creditors write off debt in every reconstruction",
        ],
        correct: 1,
        explain:
          "Financial distress imposes real costs on the operations long before insolvency, so a credible rescue recovers value that was being lost. That is what allows a smaller percentage of the recapitalised company to be worth more than a larger percentage of the distressed one — and showing both figures is what makes the argument to shareholders persuasive rather than assertive.",
      },
    },
  ],
  examTraps: [
    { trap: "Proposing a scheme without building the liquidation column.", fix: "It is the benchmark every party applies; construct it first." },
    { trap: "Testing the better-off comparison for creditors as a whole.", fix: "Each class votes separately — test every column." },
    { trap: "Accepting the post-reconstruction equity valuation as given.", fix: "It is a forecast for a business that just failed; show the return if it is worth half as much." },
    { trap: "Asking one party to make all the concessions.", fix: "Show what each party gives and gets, or the scheme will be refused." },
  ],
  keyTerms: [
    { term: "Better-off test", def: "The comparison of what a class of claimants receives under a proposed scheme against what it would receive on liquidation." },
    { term: "Debt for equity swap", def: "A reconstruction in which lenders exchange their debt claims for shares, reducing the fixed obligations and diluting existing shareholders." },
    { term: "Haircut", def: "A write-off of part of the principal owed, accepted by a lender in exchange for a viable borrower." },
    { term: "Preferential creditor", def: "A claimant ranking ahead of floating-charge and unsecured creditors on insolvency, typically including certain employee claims." },
  ],
  summary: [
    "The levers are swaps, rescheduling, haircuts, new equity, disposals and operational restructuring — usually combined.",
    "Build the liquidation column first: it is the benchmark every class measures your scheme against.",
    "Apply the better-off test class by class, and challenge the rescued-equity valuation it depends on.",
    "A credible scheme raises total value by removing distress costs, which is the answer to dilution.",
  ],
  knowledgeDiagnostic: [
    { q: "Why is the liquidation column the first thing to build?", a: "Every class compares the scheme against what liquidation would give it, so without that benchmark there is no way to know whether a scheme will be accepted." },
    { q: "Why must the better-off test be applied class by class?", a: "Each class votes separately, so a scheme can improve the position overall while leaving one class worse off — and that class will reject it." },
    { q: "How can dilution leave shareholders better off?", a: "Removing the prospect of failure removes distress costs, so a smaller share of a viable company can exceed a larger share of a failing one." },
  ],
  furtherStudy: [
    "AFM-31 supplies the diagnosis that decides whether reconstruction is appropriate at all.",
    "AFM-34 covers buy-outs, where the same leverage arithmetic runs in the opposite direction.",
    "AFM-16 covers the sources of new finance a reconstruction has to attract.",
  ],
}

const AFM_TREE_33: StudyChapter = {
  paper: "AFM",
  id: "AFM-33",
  number: 33,
  area: "D",
  syllabusRefs: ["D2(a)", "D2(b)"],
  title: "Unbundling: divestment, demerger, sell-off and carve-out",
  minutes: 17,
  intro:
    "The reverse of acquisition, and often the correction of one. Four routes out of a business, each raising a different amount of cash and giving up a different amount of control.",
  outcomes: [
    "Distinguish the four unbundling routes by cash raised and control retained",
    "Explain why a conglomerate can be worth less than the sum of its parts",
    "Evaluate the financial and non-financial benefits of unbundling",
    "Recommend a route for a specific situation and defend it against the alternatives",
    "Identify the costs and risks the proposal's advocates will understate",
  ],
  sections: [
    {
      id: "four-routes",
      heading: "The four routes",
      blocks: [
        {
          kind: "table",
          caption: "What each route does",
          head: ["Route", "Mechanism", "Cash raised", "Control"],
          rows: [
            ["Sell-off / divestment", "The business or assets are sold to a third party for cash", "Full value, immediately", "Given up entirely"],
            ["Demerger / spin-off", "Shares in the subsidiary are distributed to the parent's own shareholders", "None", "Given up by the company; the same shareholders own both"],
            ["Equity carve-out", "A minority stake in the subsidiary is sold to the public in an offering", "Partial", "Retained — the parent keeps the majority"],
            ["Management buy-out", "The business is sold to its own management, usually with private equity backing", "Full value, though often partly deferred", "Given up, to people who know the business"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Choose on the two axes",
          md: "**Do we need cash?** and **do we want to keep control?** A demerger raises nothing and is therefore useless to a company that needs to repay debt — but it is the right answer when the problem is that the market cannot value two dissimilar businesses inside one wrapper. A carve-out is the compromise: some cash, and a visible market price for a subsidiary the parent still controls.",
        },
        {
          kind: "text",
          md: "One frequently missed point about a demerger: the shareholders end up owning exactly what they owned before, in two certificates instead of one. No value is transferred to them — the gain, if any, comes from the two businesses being **valued** better separately than they were together, and from each management team being accountable for its own performance.",
        },
      ],
      check: {
        q: "A group needs to raise cash urgently to repay maturing debt and is considering demerging its profitable services division. What is the difficulty?",
        options: [
          "Demergers are prohibited for companies in financial difficulty",
          "A demerger distributes shares to the existing shareholders and raises no cash at all, so it cannot repay the debt — a sell-off or a carve-out would be needed",
          "The services division would have to be sold at a discount",
          "Demergers require the lenders' consent in all jurisdictions",
        ],
        correct: 1,
        explain:
          "This is the most important practical distinction between the routes. A demerger reorganises ownership without a purchaser and therefore without proceeds. A group needing cash must sell to someone — a trade buyer, the public through a carve-out, or its own management.",
      },
    },
    {
      id: "why-unbundle",
      heading: "Why the parts can be worth more than the whole",
      blocks: [
        {
          kind: "text",
          md: "Unbundling only creates value if the combined entity was worth less than its parts — the **conglomerate discount**. The syllabus asks for the financial and other benefits, so know the mechanisms that produce that discount rather than asserting it.",
        },
        {
          kind: "list",
          style: "bullet",
          title: "Where the discount comes from",
          items: [
            "**Analyst coverage** — a business spanning three unrelated sectors is followed properly by specialists in none of them, so it is valued conservatively",
            "**Cross-subsidy** — a strong division's cash funds a weak one's losses, a transfer no shareholder chose to make",
            "**Capital misallocation** — internal capital goes to the division with the loudest management rather than the best returns",
            "**Diluted management attention** — the head office cannot know four industries well",
            "**Accountability** — divisional performance is obscured inside a consolidated result, so nobody can be held to it",
            "**Investor choice** — shareholders who want exposure to one activity are forced to buy the others too",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The non-financial benefits are examinable too",
          md: "Sharper strategic focus, faster decision-making, a currency for acquisitions in the separated business's own shares, management incentives that track a business the managers actually control, and the removal of a distraction from the parent's core. Where a division needs a different pay structure or risk appetite from the parent's, separation may be the only way to provide it.",
        },
        {
          kind: "text",
          md: "The costs are the part advocates understate. Transaction and advisory fees; the loss of genuine synergies and shared services; **stranded overheads** left behind when the division departs; the smaller remaining group's reduced diversification and possibly weaker credit rating; disruption and management time; and the tax consequences, which can be substantial and which differ sharply between a sale and a distribution.",
        },
        {
          kind: "activity",
          title: "Test a demerger proposal",
          prompt:
            "A board proposes demerging its industrial division, arguing that peer-group multiples imply the parts are worth 25% more than the current market capitalisation. What do you probe?",
          answer:
            "Three things, in order. First, whether the discount is real or an artefact of the comparison: applying pure-play peer multiples to divisional earnings assumes those divisions would be rated exactly like the peers, and a division inside a group may have lower margins, shared costs it has never had to carry, or weaker market positions than the standalone comparators. So I would want the divisional earnings restated on a standalone basis before believing the 25%. Second, the stranded costs. Group functions - treasury, legal, IT, the head office itself - are currently spread across both businesses, and when one leaves, its share of those costs does not leave with it. The remaining group either carries them on a smaller revenue base or spends money removing them, and that gap is routinely omitted from the proposal. Third, what is actually lost: shared customers, shared procurement scale, and any real operating synergy between the two, plus the effect on the credit rating of a smaller, less diversified borrower - which raises the cost of debt on whatever borrowing remains. My recommendation would be to quantify all three against the claimed uplift, and to note that if the discount is genuinely caused by poor disclosure rather than by structure, then better segmental reporting and clearer divisional accountability might capture much of the same benefit at a fraction of the cost.",
        },
      ],
      check: {
        q: "What is the principal financial argument for unbundling?",
        options: [
          "It always reduces the group's cost of capital",
          "That the market applies a conglomerate discount — valuing the combined entity below the sum of its parts because of weak analyst coverage, cross-subsidy, capital misallocation and obscured accountability",
          "It eliminates the need for consolidated financial statements",
          "Divested businesses always outperform their former parents",
        ],
        correct: 1,
        explain:
          "The whole case rests on the discount existing, and on separation removing whatever causes it. That is why testing whether the claimed discount is genuine — rather than an artefact of applying pure-play multiples to divisional earnings that carry group costs — is the first thing an adviser should do.",
      },
    },
  ],
  examTraps: [
    { trap: "Recommending a demerger to raise cash.", fix: "It distributes shares to existing shareholders and raises nothing." },
    { trap: "Asserting a conglomerate discount from peer multiples.", fix: "Restate divisional earnings on a standalone basis first — group costs and shared advantages distort the comparison." },
    { trap: "Omitting stranded overheads.", fix: "Central costs do not leave with the division; the remaining group carries or removes them." },
    { trap: "Ignoring the effect on the remaining group.", fix: "A smaller, less diversified borrower may face a weaker rating and a higher cost of debt." },
  ],
  keyTerms: [
    { term: "Demerger", def: "The separation of a subsidiary by distributing its shares to the parent's existing shareholders, raising no cash and transferring no ownership outside the shareholder base." },
    { term: "Equity carve-out", def: "The sale of a minority stake in a subsidiary to public investors, raising cash while the parent retains control." },
    { term: "Conglomerate discount", def: "The tendency for a diversified group to be valued below the sum of its separately valued parts." },
    { term: "Stranded overheads", def: "Central costs that remain with the parent after a division departs, because they were shared but are not transferable." },
  ],
  summary: [
    "Choose the route on two axes: cash needed, and control retained.",
    "A demerger raises no cash — the gain comes from better valuation and accountability, not a transfer.",
    "Unbundling creates value only if a conglomerate discount genuinely exists; test the claim.",
    "Costs understated by advocates: stranded overheads, lost synergies, rating effects and tax.",
  ],
  knowledgeDiagnostic: [
    { q: "What does a demerger give shareholders that they did not have before?", a: "Nothing directly — they hold the same businesses in two holdings; the gain is that the two may be valued and managed better apart." },
    { q: "Why can pure-play peer multiples overstate the conglomerate discount?", a: "Divisional earnings inside a group may not carry the central costs, or may benefit from shared scale, that a standalone comparator does." },
    { q: "What are stranded overheads?", a: "Central costs previously shared with the departing division that stay behind, so the remaining group must absorb or remove them." },
  ],
  furtherStudy: [
    "AFM-34 covers the management buy-out, the fourth route, in detail.",
    "AFM-25 covers the acquisitions that unbundling frequently reverses.",
    "AFM-27 supplies the valuation techniques used to test a claimed conglomerate discount.",
  ],
}

const AFM_TREE_34: StudyChapter = {
  paper: "AFM",
  id: "AFM-34",
  number: 34,
  area: "D",
  syllabusRefs: ["D2(c)"],
  title: "Management buy-outs and buy-ins",
  minutes: 17,
  intro:
    "The route where the buyer already runs the business. Leverage makes the returns spectacular and the risk correspondingly unforgiving — and the arithmetic of both is the same arithmetic.",
  outcomes: [
    "Distinguish a buy-out from a buy-in and identify the parties to each",
    "Describe the capital structure typically used, and what each layer requires",
    "Compute a money multiple and the implied return on the equity",
    "Explain why leverage magnifies returns in both directions",
    "Advise on the financial issues, including the conflicts of interest a buy-out creates",
  ],
  sections: [
    {
      id: "structure",
      heading: "The parties and the capital stack",
      blocks: [
        {
          kind: "text",
          md: "A **management buy-out** is a purchase of a business by its existing management team. A **management buy-in** is a purchase by an outside team who will replace the incumbents. A **buy-in management buy-out** combines the two. The distinction matters because the incoming team's knowledge of the business — and therefore the risk of the deal — differs sharply.",
        },
        {
          kind: "table",
          caption: "The capital stack, top down",
          head: ["Layer", "Typical share", "Return required", "Position on failure"],
          rows: [
            ["Senior debt", "50–60%", "Lowest — secured, with covenants and amortisation", "Paid first, from security"],
            ["Mezzanine / subordinated debt", "10–20%", "Higher — often with warrants for equity upside", "Behind senior debt"],
            ["Institutional equity (private equity)", "20–30%", "Highest — targets a multiple over 3–7 years", "Last, after all debt"],
            ["Management equity", "Small in value, larger in percentage", "Highest, often with a ratchet on performance", "Last"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "What makes a business a good buy-out candidate",
          md: "Stable, predictable cash flows that can service the debt; tangible assets to secure it; low ongoing capital expenditure needs; a management team that knows the business and will commit its own money; scope for operational improvement the current owner has not pursued; and a realistic exit within the fund's horizon. A business failing the first two — volatile cash flows, few assets — cannot carry the leverage whatever its growth prospects.",
        },
      ],
      check: {
        q: "Which business is the better leveraged buy-out candidate?",
        options: [
          "A fast-growing software company with high margins, no tangible assets and volatile revenue",
          "A mature industrial services business with contracted revenues, tangible assets and modest capital expenditure needs",
          "A start-up with high growth potential and no revenue",
          "A cyclical commodity producer with high operating gearing",
        ],
        correct: 1,
        explain:
          "Leverage requires cash flows that can reliably service debt and assets that can secure it, which is what the industrial services business has. The software company's growth is attractive but its cash flows will not carry fixed obligations and it offers no security, and the cyclical producer's volatility is exactly what a debt-heavy structure cannot survive.",
      },
    },
    {
      id: "returns",
      heading: "The arithmetic of leverage",
      blocks: [
        {
          kind: "example",
          title: "The money multiple on a buy-out",
          scenario:
            "A business is acquired for $200m, funded with $120m of senior debt, $30m of mezzanine and $50m of equity. Five years later the enterprise is sold for $300m, by which time the mezzanine has been repaid and senior debt has been reduced to $60m.",
          steps: [
            { label: "Exit equity value", detail: "Enterprise value 300 less remaining debt 60 = $240m." },
            { label: "Money multiple", detail: "240 ÷ 50 = 4.8 times the original equity." },
            { label: "Implied annual return", detail: "4.8^(1/5) − 1 = 36.8% a year." },
            { label: "Where it came from", detail: "Enterprise value rose 50%, from 200 to 300. Equity rose 380%, because debt repayment converted lenders' claims into shareholders' value." },
          ],
          result:
            "Two thirds of the equity gain came from deleveraging rather than from growing the business — which is the mechanism, and also the vulnerability.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Run the same arithmetic downward",
          md: "Suppose the exit value is $180m rather than $300m, with debt still at $60m. Equity is worth 180 − 60 = $120m, so the multiple is 2.4 and the annual return 19% — still positive. Now suppose the business only reaches $140m: equity is $80m, a multiple of 1.6. At an exit of $60m the equity is worth **nil**. A 70% fall in enterprise value wipes out the equity entirely, because the debt is repaid first. Leverage is symmetrical, and showing the downside beside the headline return is the analysis a board actually needs.",
        },
        {
          kind: "diagram",
          diagram: {
            type: "bars",
            title: "Equity value at exit, against enterprise value ($m)",
            data: {
              unit: "$m",
              items: [
                { label: "EV 300", value: 240 },
                { label: "EV 240", value: 180 },
                { label: "EV 180", value: 120 },
                { label: "EV 140", value: 80 },
                { label: "EV 60", value: 0 },
              ],
            },
          },
        },
      ],
      check: {
        q: "A buy-out's equity multiple is 4.8 times over five years, while enterprise value rose only 50%. What explains the difference?",
        options: [
          "An error in the calculation",
          "Deleveraging — debt was repaid out of the business's cash flows during the period, so lenders' claims were converted into equity value without the enterprise having to grow proportionately",
          "The equity was issued at a discount",
          "Dividends paid during the period",
        ],
        correct: 1,
        explain:
          "In a leveraged structure the equity is a thin slice at the top, so it captures both the growth in enterprise value and the whole of the debt repayment. That is why buy-out returns can look extraordinary on modest operational improvement — and why the same structure destroys the equity entirely on a modest decline.",
      },
    },
    {
      id: "issues",
      heading: "The financial issues, and the conflict at the heart of it",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          title: "What to advise on",
          items: [
            "**Can the cash flows service the debt?** — model interest cover and covenant headroom in the trough year, under a downside case, not just the plan",
            "**Is the price right?** — management knows the business better than the seller, which is exactly why the price needs independent scrutiny",
            "**Is the structure survivable?** — an amortisation schedule that assumes the plan is met leaves no room for it not to be",
            "**What is the exit?** — trade sale, listing or secondary buy-out, and is it realistic within the horizon",
            "**Are the incentives right?** — ratchets that reward management for hitting targets, and what behaviour they encourage near a threshold",
            "**Is there enough working capital?** — buy-outs commonly fail on liquidity rather than on profitability",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The conflict of interest is structural",
          md: "In a buy-out the managers advising the seller on the business's prospects are the people proposing to buy it. They have every incentive to present a subdued outlook before the price is set and an ambitious one to their funders afterwards. The safeguards are the ones from the governance chapter: the management team excluded from the sale decision, an independent committee and independent valuation, an open process that tests the price against other bidders, and full disclosure of the team's interest. An answer that identifies the conflict and stops has done half the work.",
        },
        {
          kind: "text",
          md: "For the **seller**, the buy-out has real attractions: a buyer who needs no education about the business, greater confidentiality than an open auction, higher completion certainty, and continuity for employees and customers. Weighed against that is the risk of accepting less than an open process would have realised — which is precisely why the independent scrutiny matters, and why the seller's board should usually test the management offer against the market rather than negotiating with it alone.",
        },
        {
          kind: "activity",
          title: "Advise the vendor's board",
          prompt:
            "A group's board receives an approach from the divisional management team, backed by a private equity house, to buy a division at book value. What do you advise?",
          answer:
            "That the price basis is wrong and the process needs changing before any negotiation. Book value is an accounting number with no necessary relationship to what the division is worth as a going concern - if it is profitable, book value will usually understate it substantially, and the fact that the offer is anchored there rather than on earnings or cash flow is itself a signal. So the first step is an independent valuation on the bases the earlier chapters set out, commissioned by the group rather than prepared by the divisional team, since that team is now a bidder and its forecasts have to be treated as a bidder's forecasts. Second, the process: the divisional managers should be removed from the group's side of the decision entirely, an independent committee of directors should run it, and the team's interest should be disclosed. Third, and most important commercially, the offer should be tested against the market. Running a limited auction alongside establishes what a third party would pay, and it either confirms the management price as fair or reveals that it is not - and either outcome protects the board. The one genuine argument for accepting a management offer at a modest discount is speed and certainty of completion plus continuity for customers and staff, and that is a judgement the board can properly make - but it should be making it knowingly, against a market benchmark, rather than because the only offer in the room came from the people who prepared the forecasts.",
        },
      ],
      check: {
        q: "What is the fundamental conflict of interest in a management buy-out?",
        options: [
          "Managers cannot legally purchase shares in their employer",
          "The managers advising the seller on the business's value and prospects are the same people proposing to buy it, giving them an incentive to depress the outlook before the price is agreed",
          "Private equity investors always overpay",
          "The buy-out team cannot obtain independent finance",
        ],
        correct: 1,
        explain:
          "The information asymmetry runs in the buyer's favour and the buyer controls the information. That is why the safeguards are procedural — exclusion from the decision, an independent committee and valuation, market testing, and disclosure — rather than a matter of trusting the individuals involved.",
      },
    },
  ],
  examTraps: [
    { trap: "Quoting the money multiple without the downside.", fix: "Run the same structure at a lower exit value — leverage is symmetrical and the equity can reach nil." },
    { trap: "Recommending a buy-out structure for volatile cash flows.", fix: "Leverage needs predictable cash flows and security; growth alone will not service debt." },
    { trap: "Identifying the conflict of interest and stopping.", fix: "Name the safeguards: exclusion, independent committee and valuation, market testing, disclosure." },
    { trap: "Modelling covenants on the plan only.", fix: "Test the trough year under a downside case — buy-outs fail on liquidity more often than on profitability." },
  ],
  keyTerms: [
    { term: "Management buy-out", def: "The purchase of a business by its existing management team, usually with institutional equity and substantial debt." },
    { term: "Management buy-in", def: "The purchase of a business by an external management team who will replace the incumbent managers." },
    { term: "Mezzanine finance", def: "Subordinated debt ranking behind senior lenders, carrying a higher return and often warrants over equity." },
    { term: "Money multiple", def: "The ratio of the equity value realised on exit to the equity originally invested." },
    { term: "Ratchet", def: "A mechanism increasing management's equity share if defined performance targets are met." },
  ],
  summary: [
    "A buy-out is bought by the incumbent team; a buy-in by an incoming one — the risk profiles differ.",
    "The stack runs senior debt, mezzanine, institutional equity, management equity, in rising order of return and risk.",
    "Much of the equity return comes from deleveraging, not growth — and the same mechanism wipes it out on a decline.",
    "The conflict of interest is structural, so the safeguards must be procedural.",
  ],
  knowledgeDiagnostic: [
    { q: "Why can a buy-out's equity return far exceed the growth in enterprise value?", a: "The equity is a thin slice above the debt, so it captures both the enterprise growth and the whole of the debt repaid from cash flows during the period." },
    { q: "What characteristics make a business suitable for a leveraged structure?", a: "Predictable cash flows able to service debt, tangible assets to secure it, modest capital expenditure needs, committed management and a realistic exit." },
    { q: "What safeguards address the buy-out conflict of interest?", a: "Excluding the management team from the seller's decision, an independent committee and independent valuation, testing the offer against the market, and disclosure of the team's interest." },
  ],
  furtherStudy: [
    "AFM-33 covers the other three unbundling routes a vendor will compare a buy-out against.",
    "AFM-19 supplies adjusted present value, the right technique for a structure whose gearing falls year by year.",
    "AFM-06 covers the agency and governance safeguards this chapter applies.",
    "AFM-32 covers what happens when the leverage proves too heavy.",
  ],
}

export const AFM_TREE_AREA_D_PART1: StudyChapter[] = [AFM_TREE_31, AFM_TREE_32, AFM_TREE_33, AFM_TREE_34]
