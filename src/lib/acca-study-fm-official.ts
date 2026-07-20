import type { StudyChapter } from "@/lib/acca-study-content"
import { FM_A } from "@/lib/acca-study-fm-a"
import { FM_B } from "@/lib/acca-study-fm-b"
import { FM_C } from "@/lib/acca-study-fm-c"
import { FM_D } from "@/lib/acca-study-fm-d"
import { FM_E } from "@/lib/acca-study-fm-e"

export const FM_OFFICIAL_A = FM_A
export const FM_OFFICIAL_C = { ...FM_C, area: "C" }
export const FM_OFFICIAL_D = { ...FM_B, area: "D", title: "Investment appraisal" }
export const FM_OFFICIAL_E = { ...FM_D, area: "E", title: "Business finance" }

export const FM_OFFICIAL_B: StudyChapter = {
  paper: "FM", area: "B", title: "Financial management environment", minutes: 17,
  intro: "Finance decisions are made inside an economy and through markets. Interest rates, inflation, policy, institutions and fintech change both the cash flows available to a business and the return investors demand.",
  outcomes: ["Explain the economic environment and policy effects on financial decisions", "Distinguish money and capital markets", "Explain financial intermediation and major market instruments", "Evaluate how fintech changes access, cost and risk"],
  sections: [
    { id: "economy", heading: "Economic policy and the finance decision", blocks: [
      { kind: "text", md: "**Fiscal policy** changes taxation, government spending and borrowing; **monetary policy** changes interest rates and credit conditions. Both affect demand, inflation, exchange rates, financing cost and therefore forecast cash flows and discount rates." },
      { kind: "table", caption: "Transmission into financial management", head: ["Change", "Likely finance effect"], rows: [["Higher policy rates", "Higher borrowing cost and discount rates; weaker project values"], ["Higher inflation", "Nominal cash flows and rates rise; working-capital needs often increase"], ["Currency depreciation", "Imports cost more; exporters may become more competitive"], ["Expansionary fiscal policy", "Demand may rise, but government borrowing can pressure rates"]] },
      { kind: "callout", tone: "key", title: "Keep real and nominal consistent", md: "An economic forecast is useful only when cash flows and discount rates use consistent inflation assumptions." },
    ] },
    { id: "markets", heading: "Markets, institutions and fintech", blocks: [
      { kind: "text", md: "The **money market** supplies short-term liquidity through instruments such as treasury bills, certificates of deposit and commercial paper. **Capital markets** provide longer-term shares and debt. Intermediaries connect surplus and deficit units while transforming maturity, liquidity and risk." },
      { kind: "diagram", diagram: { type: "compare", title: "Financial markets", data: { leftTitle: "Money market", rightTitle: "Capital market", rows: [{ aspect: "Term", left: "Short term", right: "Long term" }, { aspect: "Purpose", left: "Liquidity and trade finance", right: "Investment and permanent finance" }, { aspect: "Examples", left: "Bills, CDs, commercial paper", right: "Shares and bonds" }] } } },
      { kind: "text", md: "Fintech can lower transaction cost, automate credit assessment and widen access through platforms, but it also introduces cyber, operational, data-quality, conduct and regulatory risks. A finance manager evaluates both the efficiency gain and the control environment." },
    ] },
  ],
  examTraps: [{ trap: "Calling a long-term bond a money-market instrument.", fix: "Classify primarily by maturity and purpose: money markets are short-term liquidity markets." }, { trap: "Treating lower interest rates as automatically good.", fix: "Consider inflation, currency, pension/investment income and the reason rates changed." }],
  keyTerms: [{ term: "Financial intermediary", def: "An institution that channels funds between savers and borrowers and transforms maturity, liquidity or risk." }, { term: "Money market", def: "The market for short-term borrowing, lending and liquidity instruments." }],
  summary: ["Policy affects cash flows, rates and risk.", "Money markets are short term; capital markets are long term.", "Intermediation transforms funds, maturity and risk.", "Fintech creates both access benefits and control risks."],
}

function splitLegacyE(area: "F" | "G", title: string, sectionIds: string[], outcomes: string[]): StudyChapter {
  return {
    ...FM_E, area, title, minutes: area === "F" ? 15 : 14,
    intro: area === "F" ? "Valuation translates expected benefits, risk and market evidence into a defensible range for a business or financial asset." : "Risk management identifies exposures that can damage cash flow and chooses a proportionate hedge without pretending uncertainty can be eliminated.",
    outcomes,
    sections: FM_E.sections.filter((section) => sectionIds.includes(section.id)),
    examTraps: FM_E.examTraps.filter((item) => area === "G" ? /rate|currency|hedg|forward|receipt|payment/i.test(`${item.trap} ${item.fix}`) : !/currency|hedg|forward|receipt|payment/i.test(`${item.trap} ${item.fix}`)),
    keyTerms: FM_E.keyTerms.filter((item) => area === "G" ? /currency|exchange|forward|hedg|interest|transaction|translation|economic/i.test(`${item.term} ${item.def}`) : !/currency|exchange|forward|hedg|interest-rate|transaction risk|translation risk|economic risk/i.test(`${item.term} ${item.def}`)),
    summary: FM_E.summary.filter((item) => area === "G" ? /currency|exchange|forward|hedg|interest|risk/i.test(item) : !/currency|exchange|forward|hedg|interest-rate/i.test(item)),
  }
}
export const FM_OFFICIAL_F = splitLegacyE("F", "Business valuations", ["why-value", "asset-income", "cash-flow", "emh"], FM_E.outcomes.slice(0, 3))
export const FM_OFFICIAL_G = splitLegacyE("G", "Risk management", ["fx-risk", "interest-risk"], FM_E.outcomes.slice(3))

export const FM_OFFICIAL_H: StudyChapter = {
  paper: "FM", area: "H", title: "Employability and technology skills", minutes: 16,
  intro: "A professional finance model makes assumptions visible, calculations reproducible and recommendations useful to decision-makers.",
  outcomes: ["Build controlled spreadsheet workings", "Use digital tools for scenarios and sensitivity", "Review financial models for logic and reasonableness", "Present recommendations professionally"],
  sections: [
    { id: "model", heading: "A model another professional can trust", blocks: [
      { kind: "text", md: "Separate **inputs, calculations, outputs and checks**. Label currency, units and timing; use cell references instead of embedded constants; preserve the base case; and show a reconciliation or independent reasonableness check." },
      { kind: "table", caption: "Model controls", head: ["Control", "What it prevents"], rows: [["Dedicated assumption cells", "Hidden hard-coded changes"], ["Timeline and units", "Period and scale errors"], ["Control totals", "Omissions and broken links"], ["Scenario copies or data tables", "Overwriting the approved base case"]] },
      { kind: "example", title: "Board-ready investment recommendation", scenario: "A project has a positive NPV but turns negative if sales volume falls by 8%.", steps: [{ label: "Value", detail: "State the base-case NPV and decision rule." }, { label: "Expose uncertainty", detail: "Show the 8% switching point and the assumption behind it." }, { label: "Broaden judgement", detail: "Discuss capacity, strategy, implementation and financing constraints." }, { label: "Recommend", detail: "Accept conditionally only if the volume assumption is supportable and monitored." }], result: "The model supports judgement rather than hiding uncertainty behind one number." },
    ] },
  ],
  examTraps: [{ trap: "Typing a calculated answer into the output cell.", fix: "Use a visible formula linked to labeled assumptions and workings." }, { trap: "Giving an NPV with no recommendation or risk discussion.", fix: "State the decision, assumptions, sensitivity and relevant non-financial factors." }],
  keyTerms: [{ term: "Switching value", def: "The change in an input that reduces a project's NPV to zero." }, { term: "Model control", def: "A check or design feature that prevents, detects or exposes modelling error." }],
  summary: ["Separate assumptions from formulas.", "Keep timing and units explicit.", "Use scenarios without overwriting the base case.", "Turn outputs into a clear, risk-aware recommendation."],
}
