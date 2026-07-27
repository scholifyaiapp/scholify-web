import type { OtCase } from "@/lib/acca-content"
import type { WrittenQuestion } from "@/lib/acca-written"
import { TX_CONTENT_TARGET } from "@/lib/tx-content-contract"

const CLIENTS = ["Alder", "Beacon", "Cedar", "Dove", "Elm", "Firth", "Grove", "Harbour", "Iris", "Juniper"]
const gbp = (value: number) => `£${value.toLocaleString("en-GB")}`

export function completeTxSectionB(existing: OtCase[]): OtCase[] {
  if (existing.length > TX_CONTENT_TARGET.sectionBCases) throw new Error("TX Section B exceeds its case contract")
  const out = [...existing]
  while (out.length < TX_CONTENT_TARGET.sectionBCases) {
    const n = out.length + 1
    const name = `${CLIENTS[n % CLIENTS.length]} Ltd`
    const salary = 42_000 + n * 500
    const secondaryThreshold = 5_000
    const employerNic = (salary - secondaryThreshold) * 0.15
    const benefit = 2_000 + n * 100
    const class1A = benefit * 0.15
    const gain = 20_000 + n * 1_000
    const taxableGain = gain - 3_000
    const cgt = taxableGain * 0.24
    const taxableSupplies = 100_000 + n * 2_000
    const outputVat = taxableSupplies * 0.2
    const id = `case-tx-fa2025-${String(n).padStart(2, "0")}`
    out.push({
      id,
      paper: "TX",
      area: ["B", "C", "E", "F"][n % 4],
      title: `${name} — FA2025 integrated tax case ${n}`,
      scenario:
        `${name} is preparing 2025/26 computations. An employee earns ${gbp(salary)}. Employer Class 1 is 15% above the ` +
        `${gbp(secondaryThreshold)} secondary threshold and no employment allowance is available. A taxable benefit of ${gbp(benefit)} ` +
        `is subject to Class 1A at 15%. A higher-rate individual has a gain of ${gbp(gain)}, with a £3,000 annual exempt amount and ` +
        `CGT at 24%. Standard-rated VAT-exclusive supplies are ${gbp(taxableSupplies)} and VAT is 20%.`,
      questions: [
        { id: `${id}-q1`, paper: "TX", area: "B", type: "number", stem: `For case ${n}, how much salary is above the secondary threshold?`, numericAnswer: salary - secondaryThreshold, unit: "£", tolerance: 0, explanation: `Only earnings above the stated secondary threshold are charged: ${gbp(salary)} − ${gbp(secondaryThreshold)} = ${gbp(salary - secondaryThreshold)}.`, marks: 2, difficulty: "easy" },
        { id: `${id}-q2`, paper: "TX", area: "B", type: "number", stem: `For case ${n}, calculate employer Class 1 NIC.`, numericAnswer: employerNic, unit: "£", tolerance: 0.01, explanation: `Apply the stated FA2025 employer rate to earnings above the threshold: ${gbp(salary - secondaryThreshold)} × 15% = ${gbp(employerNic)}.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q3`, paper: "TX", area: "B", type: "number", stem: `For case ${n}, calculate Class 1A NIC on the benefit.`, numericAnswer: class1A, unit: "£", tolerance: 0.01, explanation: `Class 1A is an employer liability on the stated taxable benefit: ${gbp(benefit)} × 15% = ${gbp(class1A)}.`, marks: 2, difficulty: "medium" },
        { id: `${id}-q4`, paper: "TX", area: "C", type: "number", stem: `For case ${n}, calculate CGT after the annual exempt amount.`, numericAnswer: cgt, unit: "£", tolerance: 0.01, explanation: `Deduct the £3,000 annual exempt amount before applying the stated higher rate: (${gbp(gain)} − £3,000) × 24% = ${gbp(cgt)}.`, marks: 2, difficulty: "hard" },
        { id: `${id}-q5`, paper: "TX", area: "F", type: "number", stem: `For case ${n}, calculate output VAT on the supplies.`, numericAnswer: outputVat, unit: "£", tolerance: 0.01, explanation: `The supplies are VAT-exclusive and standard-rated, so output VAT is ${gbp(taxableSupplies)} × 20% = ${gbp(outputVat)}.`, marks: 2, difficulty: "medium" },
      ],
    })
  }
  return out
}

const RUBRICS: Record<string, string[]> = {
  B: [
    "Identify the taxpayer and 2025/26 tax period.", "Classify income into non-savings, savings and dividend income.",
    "Calculate total income.", "Deduct the personal allowance in the correct order.", "Apply any personal allowance taper.",
    "Calculate taxable non-savings income.", "Apply the correct income tax bands.", "Apply the savings nil-rate rules where relevant.",
    "Apply the £500 dividend nil-rate band.", "Calculate tax on dividends at the appropriate rate.", "Calculate employee Class 1 NIC.",
    "Calculate employer Class 1 NIC at 15% above £5,000.", "Calculate Class 1A NIC at 15% where relevant.",
    "Distinguish income tax from NIC liabilities.", "Show a clear labelled computation.", "State the person responsible for each liability.",
    "Explain the effect of a gross pension or gift aid payment.", "State a relevant filing or payment implication.",
    "Check thresholds and arithmetic.", "Give a supported conclusion.",
  ],
  C: [
    "Identify each disposal and disposal date.", "Calculate disposal proceeds.", "Identify allowable acquisition cost.",
    "Identify incidental acquisition or disposal costs.", "Apply the share matching order where relevant.", "Calculate the unindexed gain or loss.",
    "Apply current-year capital losses.", "Apply brought-forward losses correctly.", "Deduct the £3,000 annual exempt amount.",
    "Determine unused basic-rate band.", "Apply 18% within the available basic-rate band.", "Apply 24% above the basic-rate band.",
    "Apply the 14% BADR rate only where conditions are met.", "Explain the £1 million BADR lifetime limit.",
    "Consider an available CGT relief.", "State the payment or reporting consequence.", "Show each disposal separately.",
    "Aggregate net gains correctly.", "Check rate allocation.", "Give a supported conclusion.",
  ],
  D: [
    "Identify the transfer of value.", "Identify whether it is exempt, a PET or a CLT.", "Apply the annual exemption.",
    "Consider brought-forward annual exemption.", "Apply any spouse or charity exemption.", "Apply business or agricultural relief only if conditions are met.",
    "Calculate the chargeable lifetime transfer.", "Apply the nil-rate band chronologically.", "Account for earlier chargeable transfers.",
    "Apply lifetime tax at the correct basis.", "Gross up where the donor pays lifetime tax.", "Apply taper relief to tax rather than the transfer.",
    "Calculate additional tax on death where relevant.", "Identify who bears the tax.", "Consider the residence nil-rate band where facts permit.",
    "State the payment deadline.", "Explain record or reporting requirements.", "Show a chronological computation.",
    "Check exemptions and cumulation.", "Give a supported conclusion.",
  ],
  E: [
    "Identify the corporation tax accounting period.", "Calculate tax-adjusted trading profit.", "Add back disallowable expenditure.",
    "Deduct available capital allowances.", "Include property and non-trading income.", "Calculate chargeable gains.",
    "Deduct qualifying charitable donations in the correct place.", "Calculate taxable total profits.", "Identify augmented profits.",
    "Adjust profit limits for associated companies.", "Time-apportion limits for a short period where relevant.", "Apply the 19% small-profits rate where available.",
    "Apply the 25% main rate where applicable.", "Calculate marginal relief where applicable.", "Separate liability from the payment date.",
    "State the return deadline.", "Identify quarterly instalment implications where relevant.", "Show a labelled computation.",
    "Check period allocation and arithmetic.", "Give a supported conclusion.",
  ],
  F: [
    "Classify each supply for VAT.", "Identify the tax point.", "Determine the VAT-exclusive value.", "Calculate output VAT.",
    "Identify recoverable input VAT.", "Exclude blocked input VAT.", "Calculate net VAT payable or recoverable.",
    "Apply the registration threshold test to the stated period.", "Distinguish the historic and future tests.", "State the notification date.",
    "State the effective registration date.", "Explain voluntary registration where relevant.", "Consider deregistration where relevant.",
    "Apply the correct treatment to discounts or bad debts.", "Consider the relevant VAT scheme.", "Separate VAT from profit.",
    "State the return and payment implication.", "Show a clear VAT account.", "Check rates and tax points.", "Give a supported conclusion.",
  ],
}

export function completeTxSectionC(_existing: WrittenQuestion[]): WrittenQuestion[] {
  const areas = ["B", "C", "D", "E", "F"]
  return Array.from({ length: TX_CONTENT_TARGET.sectionC }, (_, index) => {
    const n = index + 1
    const area = areas[index % areas.length]
    const client = CLIENTS[n % CLIENTS.length]
    const facts: Record<string, string> = {
      B: `${client} has 2025/26 salary of ${gbp(48_000 + n * 400)}, bank interest of ${gbp(600 + n * 20)}, dividends of ${gbp(1_500 + n * 50)} and a taxable benefit of ${gbp(2_000 + n * 40)}. There are no deductible payments.`,
      C: `${client} sold an investment for ${gbp(80_000 + n * 1_000)} in 2025/26. Allowable cost was ${gbp(35_000 + n * 300)}, incidental costs were ${gbp(1_000 + n * 20)}, current-year capital losses are ${gbp(2_000 + n * 30)}, and taxable income has used the basic-rate band.`,
      D: `${client} made a cash gift of ${gbp(360_000 + n * 1_000)} to a discretionary trust in 2025/26, has made no earlier chargeable transfers, can use this year's and last year's £3,000 annual exemptions, and the trustees pay any lifetime tax.`,
      E: `${client} Ltd has a 12-month period with tax-adjusted trading profit of ${gbp(120_000 + n * 2_000)}, property income of ${gbp(8_000 + n * 100)}, chargeable gains of ${gbp(5_000 + n * 80)} and qualifying charitable donations of ${gbp(2_000 + n * 40)}. It has no associated companies.`,
      F: `${client} Ltd made standard-rated VAT-exclusive sales of ${gbp(140_000 + n * 2_000)} and incurred attributable VAT-inclusive purchases of ${gbp(36_000 + n * 500)} in a VAT period. All purchase VAT is recoverable and the VAT rate is 20%.`,
    }
    return {
      id: `TX-C-FA2025-${String(n).padStart(2, "0")}`,
      paper: "TX",
      area,
      topic: `FA2025 ${area} integrated case ${n}`,
      stem:
        `${facts[area]} Use the FA2025 rates shown in Scholify's current rate sheet. Prepare the relevant ${area === "B" ? "income tax and NIC" : area === "C" ? "capital gains tax" : area === "D" ? "inheritance tax" : area === "E" ? "corporation tax" : "VAT"} ` +
        `computation, explain the treatment of each material item, state the principal reporting or payment consequence, and advise the client. (20 marks)`,
      maxMarks: 20,
      rubric: RUBRICS[area],
    }
  })
}
