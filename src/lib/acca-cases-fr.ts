import type { OtCase } from "@/lib/acca-content"

/*
 * FR — Section B OT cases (3 cases × 5 linked questions × 2 marks = 30 marks),
 * exactly the real exam's Section B shape. Each case is authored as a UNIT:
 * one scenario, five questions that read against it, covering the case topics
 * the FR examiner leans on (leases, consolidation, interpretation).
 *
 * All ORIGINAL and syllabus-aligned — no ACCA IP reproduced. Every numeric
 * answer is worked in the explanation so a student can audit the arithmetic.
 */

export const CASES_FR: OtCase[] = [
  {
    id: "case-fr-leases-halton",
    paper: "FR",
    area: "B",
    title: "Halton Co — leases (IFRS 16)",
    scenario:
      "On 1 January 20X5 Halton Co entered into a five-year lease of a machine. " +
      "Annual lease payments are $50,000, payable in arrears on 31 December each year. " +
      "The interest rate implicit in the lease is 8%, and the present value of the lease payments " +
      "at commencement was $199,635. Halton Co also paid initial direct costs of $4,000 to arrange the lease. " +
      "There is no purchase option and ownership does not transfer at the end of the lease. " +
      "The machine has a total useful life of eight years. Halton Co's year end is 31 December.",
    questions: [
      {
        id: "fr-case-halton-1",
        paper: "FR",
        area: "B",
        type: "mcq",
        stem: "At what amount should the right-of-use asset be recognised on 1 January 20X5?",
        options: ["$199,635", "$203,635", "$250,000", "$254,000"],
        correct: 1,
        explanation:
          "The right-of-use asset = the initial lease liability (the PV of the lease payments, $199,635) PLUS initial direct costs of $4,000 = $203,635. The gross payments of $250,000 are never capitalised — the liability is measured at present value.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-halton-2",
        paper: "FR",
        area: "B",
        type: "number",
        stem: "What depreciation charge on the right-of-use asset should Halton Co recognise for the year ended 31 December 20X5 (to the nearest $)?",
        numericAnswer: 40727,
        unit: "$",
        tolerance: 2,
        explanation:
          "Ownership does not transfer and there is no purchase option, so the asset is depreciated over the SHORTER of the lease term (5 years) and useful life (8 years): $203,635 ÷ 5 = $40,727.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-halton-3",
        paper: "FR",
        area: "B",
        type: "mcq",
        stem: "What finance cost should be recognised in profit or loss for the year ended 31 December 20X5?",
        options: ["$15,971", "$16,291", "$34,029", "$50,000"],
        correct: 0,
        explanation:
          "Interest unwinds on the LIABILITY, which excludes initial direct costs: $199,635 × 8% = $15,971. $16,291 wrongly applies 8% to the right-of-use asset; $50,000 is the cash payment; $34,029 is the capital repayment element.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-halton-4",
        paper: "FR",
        area: "B",
        type: "number",
        stem: "What is the carrying amount of the lease liability at 31 December 20X5, after the payment made on that date (to the nearest $)?",
        numericAnswer: 165606,
        unit: "$",
        tolerance: 3,
        explanation:
          "Opening liability $199,635 + interest $15,971 − payment $50,000 = $165,606. (The following year's split between current and non-current would be worked the same way, one more year out.)",
        marks: 2,
        difficulty: "hard",
      },
      {
        id: "fr-case-halton-5",
        paper: "FR",
        area: "B",
        type: "mcq",
        stem: "Halton Co also leases a laptop on a 10-month lease. Under IFRS 16, how may this lease be accounted for?",
        options: [
          "It must be capitalised as a right-of-use asset like any other lease",
          "The payments may be expensed on a straight-line basis, as a short-term lease (12 months or less)",
          "It must be treated as a finance lease because a laptop is a depreciating asset",
          "The lease is outside the scope of IFRS 16 entirely",
        ],
        correct: 1,
        explanation:
          "IFRS 16 offers a recognition exemption for SHORT-TERM leases (≤ 12 months, no purchase option) and leases of LOW-VALUE assets — the lessee may simply expense the payments straight-line. A 10-month laptop lease qualifies on both grounds.",
        marks: 2,
        difficulty: "easy",
      },
    ],
  },
  {
    id: "case-fr-consol-kestrel",
    paper: "FR",
    area: "E",
    title: "Kestrel Group — consolidation",
    scenario:
      "Kestrel Co acquired 80% of the equity shares of Sparrow Co on 1 January 20X4 for $500,000. " +
      "At that date Sparrow Co's equity comprised share capital of $100,000 and retained earnings of $250,000, " +
      "and the fair value of the non-controlling interest was $115,000. The fair values of Sparrow Co's net assets " +
      "equalled their carrying amounts except for land, whose fair value was $50,000 above carrying amount. " +
      "At 31 December 20X4 Sparrow Co's retained earnings were $310,000. During the year Sparrow Co sold goods " +
      "to Kestrel Co for $60,000 at a mark-up of 25% on cost; half of these goods remained in Kestrel Co's " +
      "inventory at the year end. Goodwill is not impaired.",
    questions: [
      {
        id: "fr-case-kestrel-1",
        paper: "FR",
        area: "E",
        type: "number",
        stem: "What is the goodwill arising on the acquisition of Sparrow Co, with NCI measured at fair value (to the nearest $)?",
        numericAnswer: 215000,
        unit: "$",
        tolerance: 0,
        explanation:
          "Goodwill = consideration $500,000 + NCI at fair value $115,000 − fair value of net assets acquired ($100,000 + $250,000 + $50,000 land uplift = $400,000) = $215,000.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-kestrel-2",
        paper: "FR",
        area: "E",
        type: "number",
        stem: "What is the unrealised profit (PURP) to be eliminated on consolidation at 31 December 20X4 (to the nearest $)?",
        numericAnswer: 6000,
        unit: "$",
        tolerance: 0,
        explanation:
          "Profit in the sale = $60,000 × 25/125 = $12,000. Half the goods remain in group inventory, so the unrealised element = $12,000 × ½ = $6,000. Sparrow (the subsidiary) was the seller, so the adjustment reduces Sparrow's profit — and therefore hits the NCI share too.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-kestrel-3",
        paper: "FR",
        area: "E",
        type: "mcq",
        stem: "What is the non-controlling interest in the consolidated statement of financial position at 31 December 20X4?",
        options: ["$115,000", "$124,600", "$125,800", "$127,000"],
        correct: 2,
        explanation:
          "NCI = fair value at acquisition $115,000 + NCI share of post-acquisition profit: ($310,000 − $250,000 = $60,000, less PURP $6,000 as Sparrow was the seller = $54,000) × 20% = $10,800. Total $125,800. $127,000 forgets the PURP; $115,000 ignores post-acquisition profits.",
        marks: 2,
        difficulty: "hard",
      },
      {
        id: "fr-case-kestrel-4",
        paper: "FR",
        area: "E",
        type: "mcq",
        stem: "How is the $60,000 intra-group sale dealt with in the consolidated statement of profit or loss?",
        options: [
          "Deduct $60,000 from revenue only",
          "Deduct $60,000 from both revenue and cost of sales",
          "Deduct $30,000 from revenue and $30,000 from cost of sales",
          "No adjustment — the sale was at arm's length",
        ],
        correct: 1,
        explanation:
          "The group cannot trade with itself: the FULL intra-group sale of $60,000 comes out of both revenue and cost of sales (with the unrealised profit adjusted separately through closing inventory).",
        marks: 2,
        difficulty: "easy",
      },
      {
        id: "fr-case-kestrel-5",
        paper: "FR",
        area: "E",
        type: "mcq",
        stem: "Which of the following is NOT one of the elements of control under IFRS 10?",
        options: [
          "Power over the investee",
          "Exposure, or rights, to variable returns from involvement with the investee",
          "The ability to use power to affect the amount of the investor's returns",
          "Ownership of more than 50% of the investee's equity shares",
        ],
        correct: 3,
        explanation:
          "IFRS 10 defines control by three elements: power; exposure to variable returns; and the ability to use that power to affect those returns. A majority shareholding is the USUAL way power arises, but it is neither necessary nor sufficient — it is not itself an element of the definition.",
        marks: 2,
        difficulty: "medium",
      },
    ],
  },
  {
    id: "case-fr-interp-moorland",
    paper: "FR",
    area: "C",
    title: "Moorland Co — ratios & interpretation",
    scenario:
      "Extracts from Moorland Co's financial statements for the year ended 31 December 20X6 (with 20X5 comparatives): " +
      "revenue $1,200,000 (20X5: $1,000,000); cost of sales $900,000 (20X5: $720,000); " +
      "trade receivables at 31 December 20X6 $240,000 (20X5: $150,000). " +
      "At 31 December 20X6 Moorland Co had equity of $600,000 and long-term borrowings of $400,000. " +
      "During 20X6 Moorland Co won a major new contract with a large retail customer after offering " +
      "extended credit terms and volume discounts.",
    questions: [
      {
        id: "fr-case-moorland-1",
        paper: "FR",
        area: "C",
        type: "number",
        stem: "What is Moorland Co's gross profit margin for 20X6 (in %, to one decimal place)?",
        numericAnswer: 25,
        unit: "%",
        tolerance: 0.1,
        explanation:
          "Gross profit = $1,200,000 − $900,000 = $300,000. Margin = 300,000 ÷ 1,200,000 = 25.0% (20X5: 280,000 ÷ 1,000,000 = 28.0% — a 3-point fall).",
        marks: 2,
        difficulty: "easy",
      },
      {
        id: "fr-case-moorland-2",
        paper: "FR",
        area: "C",
        type: "number",
        stem: "What are Moorland Co's trade receivables collection days for 20X6 (to the nearest day)?",
        numericAnswer: 73,
        unit: "days",
        tolerance: 1,
        explanation:
          "Receivables days = 240,000 ÷ 1,200,000 × 365 = 73 days (20X5: 150,000 ÷ 1,000,000 × 365 ≈ 55 days). Collections have slowed by nearly three weeks.",
        marks: 2,
        difficulty: "easy",
      },
      {
        id: "fr-case-moorland-3",
        paper: "FR",
        area: "C",
        type: "mcq",
        stem: "What is Moorland Co's gearing at 31 December 20X6, measured as debt ÷ (debt + equity)?",
        options: ["40%", "60%", "67%", "150%"],
        correct: 0,
        explanation:
          "Gearing = 400,000 ÷ (400,000 + 600,000) = 40%. 67% is debt ÷ equity (the other common measure — always state which you are using); 150% inverts it.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-moorland-4",
        paper: "FR",
        area: "C",
        type: "mcq",
        stem: "Which explanation is MOST consistent with the movement in Moorland Co's gross margin and receivables days taken together?",
        options: [
          "An inventory write-down at the year end",
          "Winning the new retail contract on discounted prices and extended credit terms",
          "A change from FIFO to weighted-average cost",
          "The revaluation of property during the year",
        ],
        correct: 1,
        explanation:
          "The scenario says the new contract was won with volume discounts (margin falls from 28% to 25%) and extended credit (receivables days stretch from 55 to 73). One commercial cause explains BOTH movements — exactly the joined-up reading the examiner rewards. The other options might touch one ratio, not both.",
        marks: 2,
        difficulty: "medium",
      },
      {
        id: "fr-case-moorland-5",
        paper: "FR",
        area: "C",
        type: "mcq",
        stem: "Which of the following is a valid limitation of using these ratios to compare Moorland Co with another company?",
        options: [
          "Ratios cannot be calculated from published financial statements",
          "Different accounting policies (e.g. revaluation vs cost) can distort comparisons",
          "Ratio analysis is only valid for listed companies",
          "Gearing ratios are meaningless when a company has any debt",
        ],
        correct: 1,
        explanation:
          "Accounting-policy differences (revaluation vs historic cost, depreciation methods, lease terms), year-end seasonality and one-off events all limit comparability — the classic caveats to state before concluding on ratios.",
        marks: 2,
        difficulty: "easy",
      },
    ],
  },
]
