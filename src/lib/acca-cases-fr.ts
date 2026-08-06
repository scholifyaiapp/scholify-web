import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * FR · Section B OT cases — the real exam format.
 *
 * FR's Section B is THREE OT cases, each with FIVE linked questions of 2 marks — 30 marks in
 * total. So a sitting takes three cases and three disjoint sittings need NINE.
 *
 * ── What this replaces ──────────────────────────────────────────
 * The loader previously served SEVENTY Section B cases holding 350 questions: these three
 * authored ones, padded by completeFrSectionB with sixty-seven generated ones. Each generated
 * case was a permutation of the same ratio scenario with the numbers moved — "In FR case 47,
 * calculate gross profit margin to two decimals" — and seventy cases is over twenty-three
 * sittings' worth of a paper that examines three.
 *
 * ── What was kept ───────────────────────────────────────────────
 * The first three cases below were already authored and are retained: Halton (leases),
 * Kestrel (consolidation) and Moorland (interpretation). Two changes were made to them.
 * Kestrel's area was "E", which under the official five-area syllabus is employability rather
 * than preparation — it is now "D". And all three now carry `chapter`, which indexes each
 * task to the reading tree so a wrong answer routes the learner to the right chapter.
 *
 * ── Ordering ────────────────────────────────────────────────────
 * The mock composer rotates the case list by a whole sitting's worth per form, so form 1
 * draws cases 1–3, form 2 draws 4–6 and form 3 draws 7–9. Each block spans different
 * syllabus areas, and every block contains at least one Area B case, because accounting for
 * transactions is the largest part of the paper:
 *
 *   Form 1 · cases 1–3    B (IFRS 16), D (consolidation), C (interpretation)
 *   Form 2 · cases 4–6    B (IAS 16), B (IFRS 15), B (IAS 36)
 *   Form 3 · cases 7–9    B (IAS 12), D (consolidated P&L), D (cash flows)
 *
 * ── Why the linked tasks build on one another ────────────────────
 * Within each case the five tasks are sequenced so that figures computed early are inputs to
 * later ones, and the final task is a treatment decision or an interpretation. That is how
 * the real cases work, and it is why the last task is worth attempting even by a candidate
 * whose arithmetic went wrong earlier.
 *
 * Every figure in every scenario was verified by script before this file was committed.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/** A two-mark linked task within an OT case. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return { id: `${caseId}-t${n}`, paper: "FR", area, chapter, type: "mcq", stem, options, correct, explanation, marks: 2, difficulty }
}

/** A two-mark linked task requiring a numeric answer. */
function numTask(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  numericAnswer: number,
  unit: string,
  tolerance: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "FR",
    area,
    chapter,
    type: "number",
    stem,
    numericAnswer,
    unit,
    tolerance,
    explanation,
    marks: 2,
    difficulty,
  }
}

/* ── Case 1 · IFRS 16 leases (retained, chapter-indexed) ── */

const CASE_01: OtCase = {
  id: "case-fr-leases-halton",
  paper: "FR",
  area: "B",
  title: "Halton Co — leases (IFRS 16)",
  scenario:
    "On 1 January 20X5 Halton Co entered into a five-year lease of a machine. Annual lease payments are $50,000, payable in arrears on 31 December each year. The interest rate implicit in the lease is 8%, and the present value of the lease payments at commencement was $199,635. Halton Co also paid initial direct costs of $4,000 to arrange the lease. There is no purchase option and ownership does not transfer at the end of the lease. The machine has a total useful life of eight years. Halton Co's year end is 31 December.",
  questions: [
    task("case-fr-leases-halton", 1, "B", "FR-13", "medium",
      "At what amount should the right-of-use asset be recognised on 1 January 20X5?",
      ["$203,635", "$199,635", "$250,000", "$254,000"],
      0,
      "$203,635 — the initial lease liability of $199,635 PLUS the $4,000 of initial direct costs. The two figures are not equal, which is the point of the question. The gross payments of $250,000 are never capitalised, because the liability is measured at present value."),

    numTask("case-fr-leases-halton", 2, "B", "FR-13", "medium",
      "Calculate the depreciation charge on the right-of-use asset for the year ended 31 December 20X5, in $.",
      40727, "$", 2,
      "$40,727. Ownership does not transfer and there is no purchase option, so the asset is depreciated over the SHORTER of the lease term (five years) and the useful life (eight years): $203,635 ÷ 5. Using eight years would give $25,454 and understate the charge by $15,273 a year."),

    task("case-fr-leases-halton", 3, "B", "FR-13", "medium",
      "What finance cost should be recognised in profit or loss for the year ended 31 December 20X5?",
      ["$15,971", "$16,291", "$34,029", "$50,000"],
      0,
      "$15,971 — interest unwinds on the LIABILITY, which excludes initial direct costs: $199,635 × 8%. $16,291 wrongly applies 8% to the right-of-use asset; $50,000 is the cash payment; $34,029 is the capital repayment element. Note the total charge to profit is $40,727 + $15,971 = $56,698 against a $50,000 payment, so the expense is front-loaded."),

    numTask("case-fr-leases-halton", 4, "B", "FR-13", "hard",
      "Calculate the carrying amount of the lease liability at 31 December 20X5, after the payment made on that date, in $.",
      165606, "$", 3,
      "$165,606. Opening $199,635 + interest $15,971 − payment $50,000. To split this between current and non-current, take the balance one year further forward as the non-current portion and the difference as the current — which will be less than $50,000, because part of the next payment is interest not yet accrued."),

    task("case-fr-leases-halton", 5, "B", "FR-13", "easy",
      "Halton Co also leases a laptop on a 10-month lease with no purchase option. Under IFRS 16, how may this lease be accounted for?",
      [
        "The payments may be expensed on a straight line basis, as a short-term lease",
        "It must be capitalised as a right-of-use asset like any other lease",
        "It must be treated as a finance lease because a laptop is a depreciating asset",
        "It is outside the scope of IFRS 16 entirely",
      ],
      0,
      "EXPENSED STRAIGHT LINE. IFRS 16 offers recognition exemptions for SHORT-TERM leases — twelve months or less with no purchase option — and for leases of LOW-VALUE assets, and a ten-month laptop lease qualifies on both grounds. Note the exemption is optional, and 'finance lease' is not a lessee concept under IFRS 16 at all."),
  ],
}

/* ── Case 2 · Consolidation (retained, area corrected to D, chapter-indexed) ── */

const CASE_02: OtCase = {
  id: "case-fr-consol-kestrel",
  paper: "FR",
  area: "D",
  title: "Kestrel Group — consolidation",
  scenario:
    "Kestrel Co acquired 80% of the equity shares of Sparrow Co on 1 January 20X4 for $500,000. At that date Sparrow Co's equity comprised share capital of $100,000 and retained earnings of $250,000, and the fair value of the non-controlling interest was $115,000. The fair values of Sparrow Co's net assets equalled their carrying amounts except for land, whose fair value was $50,000 above carrying amount. At 31 December 20X4 Sparrow Co's retained earnings were $310,000. During the year Sparrow Co sold goods to Kestrel Co for $60,000 at a mark-up of 25% on cost; half of these goods remained in Kestrel Co's inventory at the year end. Goodwill is not impaired.",
  questions: [
    numTask("case-fr-consol-kestrel", 1, "D", "FR-26", "medium",
      "Calculate the goodwill arising on the acquisition of Sparrow Co, with NCI measured at fair value, in $.",
      215000, "$", 1,
      "$215,000. Consideration $500,000 + NCI at fair value $115,000 − the fair value of net assets acquired ($100,000 + $250,000 + $50,000 land uplift = $400,000). Because NCI is at fair value, the WHOLE of Sparrow's goodwill is recognised; the proportionate method would give $180,000 and recognise only Kestrel's share."),

    numTask("case-fr-consol-kestrel", 2, "D", "FR-27", "medium",
      "Calculate the unrealised profit to be eliminated on consolidation at 31 December 20X4, in $.",
      6000, "$", 1,
      "$6,000. Profit in the sale is $60,000 × 25/125 = $12,000 (mark-up on COST, so the fraction is 25/125 not 25/100), and half the goods remain in group inventory. Sparrow — the SUBSIDIARY — was the seller, so the adjustment reduces Sparrow's net assets and the NCI bears its 20% share."),

    task("case-fr-consol-kestrel", 3, "D", "FR-26", "hard",
      "What is the non-controlling interest in the consolidated statement of financial position at 31 December 20X4?",
      ["$125,800", "$115,000", "$124,600", "$127,000"],
      0,
      "$125,800. NCI at fair value on acquisition $115,000, plus 20% of the post-acquisition movement: retained earnings rose $60,000, less the $6,000 unrealised profit because Sparrow was the seller, giving $54,000 × 20% = $10,800. $127,000 forgets the unrealised profit; $115,000 ignores post-acquisition profits altogether."),

    task("case-fr-consol-kestrel", 4, "D", "FR-28", "easy",
      "How is the $60,000 intra-group sale dealt with in the consolidated statement of profit or loss?",
      [
        "Deduct $60,000 from both revenue and cost of sales",
        "Deduct $60,000 from revenue only",
        "Deduct $30,000 from revenue and $30,000 from cost of sales",
        "No adjustment — the sale was at arm's length",
      ],
      0,
      "DEDUCT $60,000 FROM BOTH. A group cannot trade with itself, so the full intra-group sale comes out of revenue and cost of sales alike — which leaves gross profit unaffected by the elimination itself. The unrealised profit is a SEPARATE adjustment, made through closing inventory and the seller's reserves."),

    task("case-fr-consol-kestrel", 5, "D", "FR-06", "medium",
      "Which of the following is NOT one of the elements of control under IFRS 10?",
      [
        "Ownership of more than 50% of the investee's equity shares",
        "Power over the investee",
        "Exposure, or rights, to variable returns from involvement with the investee",
        "The ability to use power to affect the amount of the investor's returns",
      ],
      0,
      "A MAJORITY SHAREHOLDING. IFRS 10 defines control by three elements: power, exposure to variable returns, and the ability to use that power to affect those returns. A majority holding is the usual way power arises but is neither necessary nor sufficient — a 42% holding over a dispersed register can confer control, and a 70% non-voting holding cannot."),
  ],
}

/* ── Case 3 · Interpretation (retained, chapter-indexed) ── */

const CASE_03: OtCase = {
  id: "case-fr-interp-moorland",
  paper: "FR",
  area: "C",
  title: "Moorland Co — ratios and interpretation",
  scenario:
    "Extracts from Moorland Co's financial statements for the year ended 31 December 20X6, with 20X5 comparatives: revenue $1,200,000 (20X5: $1,000,000); cost of sales $900,000 (20X5: $720,000); trade receivables at 31 December 20X6 $240,000 (20X5: $150,000). At 31 December 20X6 Moorland Co had equity of $600,000 and long-term borrowings of $400,000. During 20X6 Moorland Co won a major new contract with a large retail customer after offering extended credit terms and volume discounts.",
  questions: [
    numTask("case-fr-interp-moorland", 1, "C", "FR-30", "easy",
      "Calculate Moorland Co's gross profit margin for 20X6, as a percentage to one decimal place.",
      25, "%", 0.1,
      "25.0%. Gross profit is $1,200,000 − $900,000 = $300,000, so the margin is $300,000 ÷ $1,200,000. The prior year was $280,000 ÷ $1,000,000 = 28.0%, so the margin has fallen three points while revenue grew 20%."),

    numTask("case-fr-interp-moorland", 2, "C", "FR-30", "easy",
      "Calculate Moorland Co's trade receivables collection days for 20X6, to the nearest day.",
      73, "days", 1,
      "73 days. $240,000 ÷ $1,200,000 × 365. The prior year was $150,000 ÷ $1,000,000 × 365 ≈ 55 days, so collection has slowed by nearly three weeks. Receivables days uses REVENUE as the denominator; only inventory and payables days use cost of sales."),

    task("case-fr-interp-moorland", 3, "C", "FR-30", "medium",
      "What is Moorland Co's gearing at 31 December 20X6, measured as debt ÷ (debt + equity)?",
      ["40%", "60%", "67%", "150%"],
      0,
      "40%. $400,000 ÷ $1,000,000. Note that 67% is the debt ÷ EQUITY measure of the very same position — which is why an answer must always state which definition it has used. The absence of a standard definition is itself one of the limitations of ratio analysis."),

    task("case-fr-interp-moorland", 4, "C", "FR-31", "medium",
      "Which explanation is MOST consistent with the movement in Moorland Co's gross margin and receivables days taken together?",
      [
        "Winning the new retail contract on discounted prices and extended credit terms",
        "An inventory write-down at the year end",
        "A change from FIFO to weighted average cost",
        "The revaluation of property during the year",
      ],
      0,
      "THE NEW CONTRACT. One commercial cause from the SCENARIO explains BOTH movements: volume discounts cut the margin from 28% to 25%, and extended credit stretched receivables from 55 to 73 days. That joined-up reading is what earns the marks — the other options might touch one ratio, and a revaluation touches neither."),

    task("case-fr-interp-moorland", 5, "C", "FR-33", "easy",
      "Which of the following is a valid limitation of using these ratios to compare Moorland Co with another entity?",
      [
        "Different accounting policies, such as revaluation against the cost model, can distort the comparison",
        "Ratios cannot be calculated from published financial statements",
        "Ratio analysis is only valid for listed entities",
        "Gearing ratios are meaningless where an entity has any debt",
      ],
      0,
      "ACCOUNTING POLICY DIFFERENCES. Revaluation against cost, depreciation methods, grant presentation and the principal/agent judgement all move ratios without any difference in performance. Add different year ends, one-off items and the absence of standard definitions, and apply each to the scenario rather than listing them generically."),
  ],
}

/* ── Case 4 · IAS 16: cost, depreciation and revaluation ── */

const CASE_04: OtCase = {
  id: "case-fr-ppe-harrier",
  paper: "FR",
  area: "B",
  title: "Harrier Manufacturing — property, plant and equipment",
  scenario:
    "Harrier Manufacturing has a 31 December year end. Two matters require attention.\n\n" +
    "(1) A new production machine was acquired during the year. Its list price was $760,000, subject to a 5% trade discount. Harrier also incurred delivery of $22,000, site preparation of $34,000, installation and assembly of $41,000 and testing of $13,000. Staff training on the machine cost $19,000, and a two-year maintenance contract cost $28,000. Harrier is obliged to dismantle the machine and restore the site at the end of its life; the present value of that obligation is $48,000.\n\n" +
    "(2) Harrier's factory building cost $2,800,000 on 1 January 20X1 and has been depreciated over 40 years on the straight line basis with no residual value. On 31 December 20X6 Harrier adopts the revaluation model for its buildings, and the factory's fair value at that date is $2,600,000. Its remaining useful life is unchanged.",
  questions: [
    numTask("case-fr-ppe-harrier", 1, "B", "FR-07", "medium",
      "Calculate the initial cost of the new production machine, in $.",
      880000, "$", 1,
      "$880,000. $760,000 × 95% = $722,000, plus delivery $22,000, site preparation $34,000, installation $41,000, testing $13,000 and the discounted dismantling obligation $48,000. Training and the maintenance contract are excluded — the first because the benefit attaches to employees the entity does not control, the second because it is a cost of running rather than acquiring. Omitting the $48,000 gives $832,000."),

    task("case-fr-ppe-harrier", 2, "B", "FR-07", "medium",
      "During commissioning, Harrier sold trial output produced by the new machine for $16,000. How is this treated?",
      [
        "Recognised as revenue in profit or loss, with the cost of those items expensed",
        "Deducted from the cost of the machine",
        "Credited to other comprehensive income",
        "Deferred and released over the machine's useful life",
      ],
      0,
      "REVENUE IN PROFIT OR LOSS. The 2020 amendment to IAS 16 moved these proceeds out of the cost calculation entirely, with the cost of the items measured under IAS 2 and expensed. Deducting them from cost is the SUPERSEDED treatment, and it produced the odd result that two entities with identical machines reported different carrying amounts because one sold its trial output."),

    numTask("case-fr-ppe-harrier", 3, "B", "FR-08", "medium",
      "Calculate the carrying amount of the FACTORY immediately before the revaluation, in $.",
      2380000, "$", 1,
      "$2,380,000. Annual depreciation is $2,800,000 ÷ 40 = $70,000, and six years have been charged from 1 January 20X1 to 31 December 20X6. This figure — not the original cost — is the base for the revaluation comparison."),

    numTask("case-fr-ppe-harrier", 4, "B", "FR-08", "medium",
      "Calculate the revaluation surplus recognised in other comprehensive income, in $.",
      220000, "$", 1,
      "$220,000. $2,600,000 − $2,380,000. Note the trap in the figures: fair value is BELOW original cost and there is still a surplus, because the comparison is with carrying amount. The surplus goes to OCI, so it increases neither profit nor EPS nor distributable reserves."),

    numTask("case-fr-ppe-harrier", 5, "B", "FR-08", "hard",
      "Calculate the factory's depreciation charge for the year ended 31 December 20X7, in $.",
      76471, "$", 2,
      "$76,471. The revalued amount is depreciated over the remaining life of 34 years: $2,600,000 ÷ 34. The charge RISES from $70,000, so revaluing upwards reduces future reported profit — and IAS 16 permits the $6,471 excess to be transferred each year from revaluation surplus to retained earnings, a movement between reserves that never touches profit."),
  ],
}

/* ── Case 5 · IFRS 15: allocation and rights of return ── */

const CASE_05: OtCase = {
  id: "case-fr-revenue-merlin",
  paper: "FR",
  area: "B",
  title: "Merlin Systems — a bundled contract and a return right",
  scenario:
    "Merlin Systems entered a contract to supply a customer with equipment, installation and two years of servicing for a combined price of $1,140,000. Merlin regularly sells these separately at $800,000 for the equipment, $320,000 for installation and $80,000 for two years of servicing. Control of the equipment passes on delivery and the installation is completed in the same period; the servicing runs from the start of the following year.\n\n" +
    "Separately, Merlin sold 1,000 units of a standard product at $260 each, all delivered before the year end. Each unit cost $150. Customers have a 30-day right of return and Merlin expects 6% to be returned; returned units can be resold at full price with no recovery costs.",
  questions: [
    numTask("case-fr-revenue-merlin", 1, "B", "FR-15", "medium",
      "Calculate the transaction price allocated to the EQUIPMENT, in $.",
      760000, "$", 1,
      "$760,000. Standalone selling prices total $1,200,000, so the equipment takes $1,140,000 × $800,000/$1,200,000. The $60,000 discount is allocated PROPORTIONATELY across all three obligations unless there is evidence it relates to a specific one — it is not simply deducted from the largest item."),

    numTask("case-fr-revenue-merlin", 2, "B", "FR-15", "medium",
      "Calculate the transaction price allocated to the INSTALLATION, in $.",
      304000, "$", 1,
      "$304,000. $1,140,000 × $320,000/$1,200,000. Installation is a SEPARATE performance obligation here because the customer could benefit from the equipment without it. Had the installation significantly modified or customised the equipment, the two would be a single combined obligation."),

    numTask("case-fr-revenue-merlin", 3, "B", "FR-15", "medium",
      "Calculate the CONTRACT LIABILITY arising from the bundled contract at the end of the first year, in $.",
      76000, "$", 1,
      "$76,000. The equipment and installation are both satisfied in the first year, so their allocations are revenue. The servicing has not begun, so its whole allocation of $1,140,000 × $80,000/$1,200,000 = $76,000 is a contract liability, released at $38,000 a year. Check the allocations sum to the contract price: $760,000 + $304,000 + $76,000 = $1,140,000."),

    numTask("case-fr-revenue-merlin", 4, "B", "FR-16", "hard",
      "Calculate the REVENUE recognised on the 1,000 standard units, in $.",
      244400, "$", 1,
      "$244,400. Revenue arises only on the 940 units NOT expected to be returned: 940 × $260. A refund liability of 60 × $260 = $15,600 is also recognised, cost of sales is 940 × $150 = $141,000, and an asset for the right to recover products of 60 × $150 = $9,000 is recognised separately from inventory."),

    task("case-fr-revenue-merlin", 5, "B", "FR-16", "medium",
      "What is the asset recognised for the right to recover products from customers, and how is it measured?",
      [
        "$9,000, at the former carrying amount of the inventory expected to be returned",
        "$15,600, at the selling price of the units expected to be returned",
        "Nothing, until the goods are physically returned",
        "$9,000, netted against the refund liability",
      ],
      0,
      "$9,000, AT FORMER CARRYING AMOUNT. It is recognised at the point of SALE, not on physical return, and is measured at what the inventory was carried at — less any expected recovery costs or reduction in value. It is presented SEPARATELY from the refund liability, so the balance sheet grosses up rather than netting."),
  ],
}

/* ── Case 6 · IAS 36: cash-generating unit impairment ── */

const CASE_06: OtCase = {
  id: "case-fr-impairment-osprey",
  paper: "FR",
  area: "B",
  title: "Osprey Components — a cash-generating unit under review",
  scenario:
    "Osprey Components has a manufacturing division that constitutes a single cash-generating unit. Following the loss of its largest customer, the division is tested for impairment. Its assets at the reporting date are:\n\n" +
    "  Goodwill                                    $250,000\n" +
    "  Property, plant and equipment             $1,400,000\n" +
    "  Other intangible assets                     $450,000\n" +
    "  Inventory                                   $180,000\n" +
    "  Trade receivables                            $95,000\n\n" +
    "The recoverable amount of the unit, measured as its value in use, is $1,720,000. The inventory is carried at the lower of cost and net realisable value and the receivables are net of an expected credit loss allowance. No individual asset's own recoverable amount is above the amount it would be reduced to. Osprey measures non-controlling interests at fair value in all its business combinations.",
  questions: [
    numTask("case-fr-impairment-osprey", 1, "B", "FR-11", "medium",
      "Calculate the carrying amount SUBJECT to the impairment allocation, in $.",
      2100000, "$", 1,
      "$2,100,000. Goodwill $250,000 + PPE $1,400,000 + other intangibles $450,000. Inventory and receivables are OUTSIDE IAS 36's scope, already being measured under IAS 2 and IFRS 9, so they are excluded from both the comparison and the allocation. Including them would give $2,375,000 and overstate the impairment by $275,000."),

    numTask("case-fr-impairment-osprey", 2, "B", "FR-11", "medium",
      "Calculate the total impairment loss, in $.",
      380000, "$", 1,
      "$380,000. $2,100,000 in-scope carrying amount less the $1,720,000 recoverable amount. Recoverable amount here is value in use because that is what the scenario supplies; where a fair value less costs of disposal is also available, the HIGHER of the two is used."),

    numTask("case-fr-impairment-osprey", 3, "B", "FR-11", "easy",
      "Calculate the amount of the impairment allocated to GOODWILL, in $.",
      250000, "$", 1,
      "$250,000 — the whole of it. Goodwill absorbs the loss FIRST and in full where the loss is large enough, and only the remainder is allocated pro rata to the other in-scope assets. Because Osprey measures NCI at fair value, all of the subsidiary's goodwill is recognised, so no notional grossing up is needed for the test."),

    numTask("case-fr-impairment-osprey", 4, "B", "FR-11", "hard",
      "Calculate the amount of the impairment allocated to PROPERTY, PLANT AND EQUIPMENT, in $.",
      98378, "$", 2,
      "$98,378. After goodwill, $130,000 remains and is allocated pro rata across PPE and other intangibles ($1,850,000 in total): $130,000 × 1,400/1,850. The other intangibles take $31,622, and the two sum to $130,000. The floor rule would cap any individual reduction at that asset's own recoverable amount, which the scenario expressly excludes here."),

    task("case-fr-impairment-osprey", 5, "B", "FR-11", "medium",
      "If the conditions causing the impairment reverse next year, what may Osprey recognise?",
      [
        "A reversal on the PPE and intangibles, capped at their depreciated historical cost, but nothing on the goodwill",
        "A reversal on all the assets including the goodwill, up to their original carrying amounts",
        "Nothing — impairment losses may never be reversed",
        "A reversal on the goodwill only, since it absorbed the loss first",
      ],
      0,
      "THE OTHER ASSETS ONLY, CAPPED AT DEPRECIATED COST. A goodwill impairment is NEVER reversed, because the recovery could not be distinguished from internally generated goodwill, which may not be recognised at all. And a reversal on the other assets requires the ESTIMATES to have changed — not merely the unwinding of the discount in the value in use calculation."),
  ],
}

/* ── Case 7 · IAS 12: current and deferred tax ── */

const CASE_07: OtCase = {
  id: "case-fr-tax-redwing",
  paper: "FR",
  area: "B",
  title: "Redwing Industrial — the tax note",
  scenario:
    "Redwing Industrial is preparing its financial statements for the year ended 31 December 20X6. The corporation tax rate is 22%, enacted and applicable to future periods.\n\n" +
    "At 31 December 20X6:\n" +
    "  Property, plant and equipment: carrying amount $4,100,000, tax base $3,050,000\n" +
    "  Capitalised development costs: carrying amount $380,000, tax base nil\n" +
    "  Warranty provision: carrying amount $520,000, deductible only when paid\n\n" +
    "The opening deferred tax liability was $158,000. The current tax estimate for 20X6 is $610,000. The 20X5 statement of financial position showed a current tax liability of $545,000, and the amount finally agreed and paid was $529,000. There were no revaluations and nothing was recognised in other comprehensive income.",
  questions: [
    numTask("case-fr-tax-redwing", 1, "B", "FR-20", "medium",
      "Calculate the TAXABLE temporary difference on the property, plant and equipment, in $.",
      1050000, "$", 1,
      "$1,050,000. $4,100,000 carrying amount − $3,050,000 tax base. For an ASSET, a carrying amount above the tax base is a TAXABLE difference giving a deferred tax liability: tax relief has been taken faster than the accounting charge, so more tax will be paid in future."),

    numTask("case-fr-tax-redwing", 2, "B", "FR-20", "hard",
      "Calculate the DEDUCTIBLE temporary difference on the warranty provision, in $.",
      520000, "$", 1,
      "$520,000. The provision is a LIABILITY with a carrying amount of $520,000 and a nil tax base, and for a liability the signs REVERSE: a carrying amount above the tax base is DEDUCTIBLE, giving a deferred tax asset. Sanity check — the expense has been recognised and the deduction is still to come, so a future benefit exists."),

    numTask("case-fr-tax-redwing", 3, "B", "FR-20", "medium",
      "Calculate the NET taxable temporary difference at 31 December 20X6, in $.",
      910000, "$", 1,
      "$910,000. PPE $1,050,000 taxable + development costs $380,000 taxable − the warranty provision's $520,000 deductible difference. Adding the provision rather than deducting it gives $1,950,000 and is the single most common error in a deferred tax computation."),

    numTask("case-fr-tax-redwing", 4, "B", "FR-20", "medium",
      "Calculate the closing deferred tax LIABILITY, in $.",
      200200, "$", 1,
      "$200,200. $910,000 × 22%, using the rate enacted and expected to apply on reversal. Deferred tax is never discounted, however distant the reversal, and it is always classified as NON-CURRENT."),

    numTask("case-fr-tax-redwing", 5, "B", "FR-20", "hard",
      "Calculate the total tax expense recognised in PROFIT OR LOSS, in $.",
      636200, "$", 1,
      "$636,200. Current year $610,000, LESS the $16,000 OVER-provision ($545,000 provided against $529,000 paid), plus the deferred tax MOVEMENT of $200,200 − $158,000 = $42,200. Note the sign: less was paid than provided, so last year's charge was too high and the excess is deducted. Charging the closing deferred tax balance instead of the movement gives $794,000."),
  ],
}

/* ── Case 8 · Consolidated statement of profit or loss ── */

const CASE_08: OtCase = {
  id: "case-fr-consolpl-falcon",
  paper: "FR",
  area: "D",
  title: "Falcon Group — a mid-year acquisition",
  scenario:
    "Falcon Co acquired 80% of Teal Co on 1 April 20X6. Both have a 31 December year end and Teal's results accrue evenly over the year.\n\n" +
    "                                    Falcon        Teal\n" +
    "                                              (full year)\n" +
    "  Revenue                       $16,000,000  $5,600,000\n" +
    "  Cost of sales                  $9,600,000  $3,360,000\n" +
    "  Operating expenses             $2,100,000    $840,000\n" +
    "  Income tax expense               $700,000    $420,000\n\n" +
    "After acquisition Teal sold goods to Falcon for $700,000 at a mark-up of 25% on cost, and 30% of these remained in Falcon's inventory at the year end. At acquisition Teal's plant had a fair value $500,000 above carrying amount with a remaining useful life of five years; Teal has not adjusted its own records. Goodwill is not impaired.",
  questions: [
    numTask("case-fr-consolpl-falcon", 1, "D", "FR-28", "medium",
      "Calculate CONSOLIDATED REVENUE, in $.",
      19500000, "$", 1,
      "$19,500,000. Falcon $16,000,000 + Teal's post-acquisition revenue of $5,600,000 × 9/12 = $4,200,000, less the $700,000 intra-group elimination. Teal's revenue is consolidated IN FULL for the post-acquisition period, never at 80% — the ownership percentage affects only the attribution of profit."),

    numTask("case-fr-consolpl-falcon", 2, "D", "FR-27", "medium",
      "Calculate the unrealised profit to be eliminated from group inventory, in $.",
      42000, "$", 1,
      "$42,000. Goods still held: $700,000 × 30% = $210,000 at transfer price, and a mark-up of 25% on COST means the profit is 25/125 of selling price: $210,000 × 25/125. Applying 25/100 gives $52,500 — the margin treatment, and $10,500 too much."),

    numTask("case-fr-consolpl-falcon", 3, "D", "FR-28", "medium",
      "Calculate the additional depreciation on the fair value uplift charged in the consolidated statement of profit or loss, in $.",
      75000, "$", 1,
      "$75,000. $500,000 over five years is $100,000 a year, but only NINE months are post-acquisition: $100,000 × 9/12. Charging a full year is the standard error after a mid-year acquisition — the pro-rating applies to the fair value depreciation exactly as it does to revenue."),

    numTask("case-fr-consolpl-falcon", 4, "D", "FR-28", "hard",
      "Calculate Teal's ADJUSTED post-acquisition profit after tax for the purposes of the non-controlling interest, in $.",
      618000, "$", 1,
      "$618,000. Teal's nine-month profit after tax is ($5,600,000 − $3,360,000 − $840,000 − $420,000) × 9/12 = $735,000. Deduct the $75,000 of extra fair value depreciation and the $42,000 of unrealised profit — the latter because TEAL was the seller, so it arose in Teal's own results. Had Falcon sold, only the depreciation would be deducted."),

    numTask("case-fr-consolpl-falcon", 5, "D", "FR-28", "hard",
      "Calculate the profit attributable to the NON-CONTROLLING INTEREST, in $.",
      123600, "$", 1,
      "$123,600. 20% × Teal's adjusted profit of $618,000. Using the unadjusted $735,000 gives $147,000. Remember the attribution SPLITS consolidated profit rather than reducing it: compute the NCI, take the parent's share as the residual, and check the two add back to consolidated profit."),
  ],
}

/* ── Case 9 · Statement of cash flows ── */

const CASE_09: OtCase = {
  id: "case-fr-cashflow-bittern",
  paper: "FR",
  area: "D",
  title: "Bittern Trading — the statement of cash flows",
  scenario:
    "Bittern Trading reports profit before tax of $2,100,000 for the year ended 31 December 20X6, and profit after tax of $1,580,000. Additional information:\n\n" +
    "  Depreciation charge for the year                     $790,000\n" +
    "  Loss on disposal of plant                             $40,000\n" +
    "  Finance costs charged                                $210,000\n" +
    "  Increase in inventory                                 $95,000\n" +
    "  Increase in trade receivables                        $130,000\n" +
    "  Increase in trade payables                            $85,000\n" +
    "  PPE carrying amount: opening $6,300,000, closing $7,400,000\n" +
    "  Carrying amount of plant disposed of                 $220,000\n" +
    "  Current tax: opening $280,000, closing $310,000, charge $520,000\n" +
    "  Retained earnings: opening $3,100,000, closing $3,620,000\n\n" +
    "There were no revaluations during the year and no shares were issued.",
  questions: [
    numTask("case-fr-cashflow-bittern", 1, "D", "FR-25", "hard",
      "Calculate CASH GENERATED FROM OPERATIONS, in $.",
      3000000, "$", 1,
      "$3,000,000. $2,100,000 + $790,000 depreciation + $40,000 loss on disposal + $210,000 finance costs − $95,000 inventory increase − $130,000 receivables increase + $85,000 payables increase. Two rules do the work: an increase in an ASSET is an outflow, and a LOSS on disposal is added back because the proceeds are shown in investing instead."),

    numTask("case-fr-cashflow-bittern", 2, "D", "FR-25", "medium",
      "Calculate the TAX PAID, in $.",
      490000, "$", 1,
      "$490,000. Opening liability $280,000 + charge $520,000 − closing liability $310,000. Using the $520,000 charge as the cash figure would be wrong by the $30,000 movement in the liability. Note that tax paid is an OPERATING cash flow, not financing."),

    numTask("case-fr-cashflow-bittern", 3, "D", "FR-25", "hard",
      "Calculate the cash paid for ADDITIONS to property, plant and equipment, in $.",
      2110000, "$", 1,
      "$2,110,000. Closing $7,400,000 − opening $6,300,000 + depreciation $790,000 + disposals at carrying amount $220,000. The carrying amount rose $1,100,000 despite $1,010,000 leaving through depreciation and disposal, so $2,110,000 came in. Always check for a revaluation first, which raises the carrying amount with no cash."),

    numTask("case-fr-cashflow-bittern", 4, "D", "FR-25", "medium",
      "Calculate the PROCEEDS from the disposal of plant, in $.",
      180000, "$", 1,
      "$180,000. Carrying amount $220,000 less the $40,000 loss. The investing section reports what was RECEIVED; the loss itself is a reconciling adjustment in the operating section. Using the loss or the carrying amount as the investing figure are both common errors."),

    numTask("case-fr-cashflow-bittern", 5, "D", "FR-25", "medium",
      "Calculate the DIVIDENDS PAID, in $.",
      1060000, "$", 1,
      "$1,060,000. Opening retained earnings $3,100,000 + profit after tax $1,580,000 − closing $3,620,000. The retained earnings account has only these three movements here, so the dividend is the missing figure. In other questions watch for a transfer from revaluation surplus, which also credits retained earnings and must be removed first."),
  ],
}

export const CASES_FR: OtCase[] = [
  CASE_01, CASE_02, CASE_03,
  CASE_04, CASE_05, CASE_06,
  CASE_07, CASE_08, CASE_09,
]
