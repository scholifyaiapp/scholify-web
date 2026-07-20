import type { TopicBrief } from "@/lib/acca-briefs"
import { CORE_BRIEFS } from "@/lib/acca-briefs-core"

function old(area: string): TopicBrief {
  const brief = CORE_BRIEFS.find((item) => item.paper === "FA" && item.area === area)
  if (!brief) throw new Error(`FA brief migration: missing former Area ${area}`)
  return brief
}

export const FA_OFFICIAL_BRIEFS: TopicBrief[] = [
  old("A"), old("B"), old("C"), old("D"),
  {
    paper: "FA", area: "E", title: "Reconciliations", minutes: 6,
    sections: [
      { kind: "concept", heading: "Two records, one explainable balance", body: "A reconciliation compares records prepared from different evidence, corrects omissions or errors in the record where they occurred, and explains timing differences. It is a control procedure—not a device for forcing two totals to agree." },
      { kind: "structure", heading: "Bank and payables workflow", body: "Bank: update the bank ledger for charges, direct debits, interest, dishonoured receipts and book errors; then reconcile the corrected ledger balance to the statement through outstanding lodgements and unpresented payments. Payables: compare supplier statements, supplier accounts and the payables control/list, tracing invoices, credit notes, payments, cut-off and posting errors." },
      { kind: "example", heading: "Bank reconciliation discipline", body: "Begin with the cash-book balance. Post items recorded by the bank but missing from the books. The corrected book balance is the financial-statement balance. Outstanding lodgements and unpresented cheques explain the remaining difference to the bank statement; they are not posted again." },
      { kind: "traps", heading: "Classic traps", body: "Adjusting timing differences in the cash book; failing to correct a book error before reconciling; reversing unpresented payments and outstanding lodgements; and changing both records for an error that exists in only one." },
    ],
  },
  { ...old("E"), area: "F", title: "Preparing a trial balance" },
  { ...old("F"), area: "G", title: "Preparing financial statements" },
  { ...old("G"), area: "H", title: "Preparing basic consolidated financial statements" },
  { ...old("H"), area: "I", title: "Interpretation of financial statements" },
]
