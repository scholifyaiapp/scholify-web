import type { AccaQuestion } from "@/lib/acca-content"

/*
 * ATX bank wave S1 part B (areas C, D, E) — 2026-07-13.
 *
 * Blueprint: Area C (corporation tax — advanced) 40, Area D (VAT & stamp taxes) 20,
 * Area E (tax planning & ethics) 20 = 80 questions. Difficulty 24 easy / 36 medium /
 * 20 hard. Type mix 55 mcq / 25 number (numeric concentrated in C & D). All marks 2.
 * Paper "ATX". UK FA2024/25 basis.
 *
 * Tax basis (UK FA2024/25-style figures, always restated in the stem where a
 * threshold matters so questions test METHOD, not memorised numbers):
 *   - CT main rate 25% / small profits rate 19%; profit limits £50,000 and £250,000,
 *     divided by the number of associated companies and time-apportioned for short APs
 *   - Marginal relief fraction 3/200; augmented profits = TTP + non-group dividends (FII)
 *   - Group relief: 75% loss group (current-year and post-1 April 2017 carried-forward);
 *     consortium = companies together holding >=75%, each >=5%
 *   - Chargeable gains group: 75% at each link and >50% effective (s171 no gain/no loss,
 *     s171A reallocation, degrouping charge within 6 years, SSE >=10% for 12 months)
 *   - Close company: controlled by 5 or fewer participators; s455 tax 33.75% of loans to
 *     participators, repayable/refunded 9 months + 1 day after the AP end
 *   - Overseas: DTR = lower of overseas and UK tax; CFC 25% interest gateway with low-profits
 *     (<=£500,000) exemption; transfer pricing SME exemption; DPT 31% (above 25% main rate)
 *   - R&D: merged RDEC 20% expenditure credit; R&D-intensive SME 86% additional deduction
 *   - Capital allowances: AIA £1,000,000 (shared across a group), full expensing 100% on new
 *     main-pool plant, special rate pool WDA 6%, main pool 18%, SBA 3% straight line
 *   - Corporate interest restriction: 30% of tax-EBITDA, £2,000,000 de minimis
 *   - VAT: standard 20%; registration £90,000 / deregistration £88,000; partial exemption
 *     de minimis £625/month (£7,500/year) AND <=50% of input tax; CGS land/buildings >=£250,000
 *     (10-year), computers >=£50,000 (5-year); points-based late-filing penalties
 *   - SDLT non-residential: 0% to £150,000, 2% to £250,000, 5% above; residential 0% to
 *     £250,000 then 5%, plus 3% additional-dwelling surcharge; stamp duty on shares 0.5%
 *     rounded up to the nearest £5
 *
 * Every question is ORIGINAL (public ATX syllabus only; invented names/figures — never
 * reproduces ACCA/Kaplan/BPP material). Each mcq distractor encodes a nameable student
 * error, spelled out in the explanation alongside the correct rule/computation. Every
 * numeric answer has been re-solved digit-by-digit and every threshold is restated in the
 * stem. Correct-option positions balanced across the 55 mcqs (14/14/14/13).
 */

export const ATX_WAVE1B: AccaQuestion[] = [
  /* ═══════════════ Area C — Corporation tax (advanced) — 40 ═══════════════ */

  /* ── Marginal relief & associated companies ── */
  {
    id: "ATX3-C-01", paper: "ATX", area: "C", type: "number",
    stem: "Aldergate Ltd has taxable total profits of £120,000 for the 12-month year ended 31 March 2025. It has no associated companies and received no dividends. The CT main rate is 25%, the profit limits are £50,000 and £250,000, and the marginal relief fraction is 3/200. What is the corporation tax liability in £?",
    numericAnswer: 28050, unit: "£", tolerance: 1,
    explanation: "Profits of £120,000 fall between £50,000 and £250,000, so marginal relief applies. CT at the main rate = £120,000 x 25% = £30,000. Marginal relief = (£250,000 - £120,000) x 3/200 = £130,000 x 0.015 = £1,950. Liability = £30,000 - £1,950 = £28,050.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-02", paper: "ATX", area: "C", type: "number",
    stem: "Bexley Ltd has one associated company. Its taxable total profits are £90,000 for the 12-month year ended 31 March 2025, with no dividends received. The CT main rate is 25%, the profit limits are £50,000 and £250,000 (divided by the number of associated companies), and the marginal relief fraction is 3/200. What is the corporation tax liability in £?",
    numericAnswer: 21975, unit: "£", tolerance: 1,
    explanation: "With two associated companies (Bexley + one), the limits are divided by 2: £25,000 and £125,000. Profits of £90,000 fall between them, so marginal relief applies. CT = £90,000 x 25% = £22,500; marginal relief = (£125,000 - £90,000) x 3/200 = £35,000 x 0.015 = £525. Liability = £22,500 - £525 = £21,975.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-03", paper: "ATX", area: "C", type: "number",
    stem: "Carfax Ltd has taxable total profits of £180,000 for the year ended 31 March 2025 and received a dividend of £18,000 from an unconnected UK company (a 5% holding, so it is not a 51% group company). It has no associated companies. The CT main rate is 25%, the limits are £50,000 and £250,000, and the marginal relief fraction is 3/200. What is the corporation tax liability in £? (Round to the nearest £.)",
    numericAnswer: 44291, unit: "£", tolerance: 2,
    explanation: "Augmented profits = TTP £180,000 + franked investment income £18,000 = £198,000 (used only to test the limits and in the marginal relief fraction). £198,000 is between £50,000 and £250,000. CT = TTP £180,000 x 25% = £45,000. Marginal relief = (£250,000 - £198,000) x (£180,000 / £198,000) x 3/200 = £52,000 x 0.909091 x 0.015 = £709. Liability = £45,000 - £709 = £44,291.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-04", paper: "ATX", area: "C", type: "number",
    stem: "Dovewell Ltd prepares accounts for the 9-month period ended 31 March 2025. It has no associated companies. The normal 12-month profit limits are £50,000 and £250,000. What is the UPPER marginal relief limit for this 9-month accounting period, in £?",
    numericAnswer: 187500, unit: "£", tolerance: 1,
    explanation: "The profit limits are time-apportioned for a short accounting period: upper limit = £250,000 x 9/12 = £187,500 (the lower limit would be £50,000 x 9/12 = £37,500).",
    marks: 2, difficulty: "easy",
  },

  /* ── Group relief ── */
  {
    id: "ATX3-C-05", paper: "ATX", area: "C", type: "number",
    stem: "Elm Ltd owns 80% of Fir Ltd, so they form a 75% loss group. For the year ended 31 March 2025 Fir Ltd has a trading loss of £200,000 and Elm Ltd has taxable total profits (before any claim) of £150,000. Both have coterminous 12-month accounting periods. What is the maximum current-year group relief Elm Ltd can claim in £?",
    numericAnswer: 150000, unit: "£", tolerance: 1,
    explanation: "Current-year group relief is the lower of the surrendering company's available loss (£200,000) and the claimant's remaining profits (£150,000) = £150,000. The £50,000 balance of the loss stays with Fir Ltd.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-06", paper: "ATX", area: "C", type: "number",
    stem: "Grange Ltd owns 90% of Holt Ltd. Holt Ltd has a trading loss of £120,000 for its 12-month accounting period ended 31 December 2024. Grange Ltd has taxable total profits of £160,000 for its 12-month period ended 31 March 2025. Group relief is restricted to the overlapping (corresponding) period. What is the maximum group relief Grange Ltd can claim in £?",
    numericAnswer: 30000, unit: "£", tolerance: 1,
    explanation: "The accounting periods overlap only from 1 January 2025 to 31 March 2025 (3 months). Loss available in the overlap = £120,000 x 3/12 = £30,000. Claimant profits in the overlap = £160,000 x 3/12 = £40,000. Group relief = lower of £30,000 and £40,000 = £30,000.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-07", paper: "ATX", area: "C", type: "number",
    stem: "Ilex Ltd is a consortium company: Jasmine Ltd owns 40%, Kew Ltd owns 35% and unconnected individuals own the remaining 25%. Ilex Ltd has a trading loss of £300,000 for the year. Jasmine Ltd has taxable total profits of £250,000. What is the maximum consortium relief Jasmine Ltd can claim in £?",
    numericAnswer: 120000, unit: "£", tolerance: 1,
    explanation: "Consortium relief is limited to the member's share of the loss: £300,000 x 40% = £120,000, then capped at the claimant's profits (£250,000). The lower figure, £120,000, is the maximum.",
    marks: 2, difficulty: "hard",
  },

  /* ── Chargeable gains group ── */
  {
    id: "ATX3-C-08", paper: "ATX", area: "C", type: "number",
    stem: "Larch Ltd and Maple Ltd are in the same chargeable gains group. Larch Ltd realises a chargeable gain of £80,000 on a building. Maple Ltd has a capital loss brought forward of £50,000. They make a s171A election to treat the gain as accruing to Maple Ltd. What is the net chargeable gain arising in the group after the election, in £?",
    numericAnswer: 30000, unit: "£", tolerance: 1,
    explanation: "A s171A election lets the group treat the gain as accruing to the company holding the loss, without an actual asset transfer. Gain £80,000 set against Maple's brought-forward capital loss £50,000 = net chargeable gain £30,000.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-09", paper: "ATX", area: "C", type: "number",
    stem: "Three years ago Nutmeg Ltd acquired a building from fellow 75% gains-group member Oak Ltd on a no gain/no loss basis; Oak Ltd's original cost was £200,000 and the market value at the intra-group transfer was £320,000. Nutmeg Ltd now leaves the group (within 6 years of the transfer) because its shares are sold. What is the degrouping gain added to the disposal consideration for Nutmeg's shares, in £?",
    numericAnswer: 120000, unit: "£", tolerance: 1,
    explanation: "A degrouping charge arises when a company leaves the gains group within 6 years of a s171 transfer while still owning the asset. The gain = market value at the intra-group transfer £320,000 - original cost £200,000 = £120,000, added to the consideration for the shares (and exempt if the share disposal qualifies for SSE).",
    marks: 2, difficulty: "hard",
  },

  /* ── Close companies ── */
  {
    id: "ATX3-C-10", paper: "ATX", area: "C", type: "number",
    stem: "Pewter Ltd is a close company. On 1 June 2024 it lent £40,000 to a shareholder; the loan is still outstanding more than 9 months after the end of its accounting period ended 31 March 2025. Section 455 tax is charged at 33.75% of the loan. What is the s455 tax due in £?",
    numericAnswer: 13500, unit: "£", tolerance: 1,
    explanation: "s455 tax = 33.75% x £40,000 = £13,500. It is due because the loan to a participator remained outstanding more than 9 months and 1 day after the AP end; it is refunded when the loan is repaid.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-11", paper: "ATX", area: "C", type: "number",
    stem: "Quartz Ltd, a close company, made a loan of £60,000 to a participator. Before the due date (9 months and 1 day after the accounting period end) the participator repaid £25,000. Section 455 tax is charged at 33.75% on the amount still outstanding. What is the s455 tax due in £?",
    numericAnswer: 11812.5, unit: "£", tolerance: 1,
    explanation: "s455 applies only to the loan still outstanding at the due date: £60,000 - £25,000 = £35,000. Tax = 33.75% x £35,000 = £11,812.50.",
    marks: 2, difficulty: "medium",
  },

  /* ── Capital allowances (advanced) ── */
  {
    id: "ATX3-C-12", paper: "ATX", area: "C", type: "number",
    stem: "Rowan Ltd (a company) buys new, unused main-pool plant for £500,000 and a new car emitting 60 g/km for £30,000 in the year ended 31 March 2025. Full expensing gives a 100% first-year allowance on new main-pool plant but is not available on cars; a car above 50 g/km goes to the special rate pool (WDA 6%). What are the total capital allowances for the year, in £?",
    numericAnswer: 501800, unit: "£", tolerance: 1,
    explanation: "Full expensing on the plant = £500,000 x 100% = £500,000. The 60 g/km car (>50 g/km) enters the special rate pool: WDA = £30,000 x 6% = £1,800. Total allowances = £500,000 + £1,800 = £501,800.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-13", paper: "ATX", area: "C", type: "number",
    stem: "Sorrel Ltd brings a newly constructed commercial building into use. The qualifying construction cost is £800,000 (the land, costing £200,000, is excluded). The structures and buildings allowance is 3% straight line. What is the annual SBA in £?",
    numericAnswer: 24000, unit: "£", tolerance: 1,
    explanation: "SBA = qualifying construction cost x 3% = £800,000 x 3% = £24,000. Land is excluded, so the £200,000 is ignored.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-14", paper: "ATX", area: "C", type: "number",
    stem: "Thistle Ltd is in a group that shares a single annual investment allowance of £1,000,000, of which £600,000 has already been allocated to another group company, leaving £400,000. Thistle Ltd buys special-rate integral features costing £500,000 in the year. AIA can be set against special-rate additions; the special rate pool WDA is 6%. What are Thistle Ltd's total capital allowances on this expenditure, in £?",
    numericAnswer: 406000, unit: "£", tolerance: 1,
    explanation: "AIA available to Thistle = £400,000, best used against the special-rate expenditure. Balance = £500,000 - £400,000 = £100,000, taken to the special rate pool: WDA = £100,000 x 6% = £6,000. Total = £400,000 + £6,000 = £406,000.",
    marks: 2, difficulty: "medium",
  },

  /* ── R&D relief ── */
  {
    id: "ATX3-C-15", paper: "ATX", area: "C", type: "number",
    stem: "Umber Ltd incurs qualifying R&D expenditure of £250,000 in the year ended 31 March 2025 and claims under the merged R&D expenditure credit (RDEC) scheme, under which the credit is 20% of qualifying expenditure. What is the R&D expenditure credit in £?",
    numericAnswer: 50000, unit: "£", tolerance: 1,
    explanation: "Merged-scheme RDEC = £250,000 x 20% = £50,000. This is a taxable above-the-line credit.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-16", paper: "ATX", area: "C", type: "number",
    stem: "Verdi Ltd is a loss-making, R&D-intensive SME. It spends £180,000 on qualifying R&D. R&D-intensive SMEs receive an ADDITIONAL deduction of 86% of qualifying expenditure (on top of the £180,000 already in the accounts). What is the additional deduction in £?",
    numericAnswer: 154800, unit: "£", tolerance: 1,
    explanation: "Additional deduction = £180,000 x 86% = £154,800 (giving a total deduction of £180,000 + £154,800 = £334,800, i.e. 186%).",
    marks: 2, difficulty: "medium",
  },

  /* ── Intangible fixed assets ── */
  {
    id: "ATX3-C-17", paper: "ATX", area: "C", type: "number",
    stem: "Willow Ltd acquires a patent for £500,000 and elects for the 4% fixed-rate deduction under the intangible fixed assets regime instead of following the accounting amortisation. What is the annual deduction in £?",
    numericAnswer: 20000, unit: "£", tolerance: 1,
    explanation: "The fixed-rate election gives 4% per annum on cost: £500,000 x 4% = £20,000 deductible each year.",
    marks: 2, difficulty: "easy",
  },

  /* ── Loan relationships & corporate interest restriction ── */
  {
    id: "ATX3-C-18", paper: "ATX", area: "C", type: "number",
    stem: "Yarrow Ltd's group has net tax-interest expense of £5,000,000 and tax-EBITDA of £12,000,000. Under the corporate interest restriction, the interest allowance is the higher of 30% of tax-EBITDA and the de minimis of £2,000,000. What is the amount of interest DISALLOWED for the period, in £?",
    numericAnswer: 1400000, unit: "£", tolerance: 1,
    explanation: "Fixed-ratio allowance = 30% x £12,000,000 = £3,600,000, which exceeds the £2,000,000 de minimis, so the allowance is £3,600,000. Disallowed = £5,000,000 - £3,600,000 = £1,400,000 (carried forward).",
    marks: 2, difficulty: "hard",
  },

  /* ── Area C — mcq ── */
  {
    id: "ATX3-C-19", paper: "ATX", area: "C", type: "mcq",
    stem: "Which company is an ASSOCIATED company of Zephyr Ltd for the purpose of dividing the corporation tax profit limits?",
    options: [
      "A company that, together with Zephyr Ltd, is controlled by the same individual",
      "A company in which Zephyr Ltd holds 45% of the ordinary shares",
      "A dormant company that is controlled by the same person who controls Zephyr Ltd",
      "A company in which the brother-in-law of Zephyr Ltd's controlling shareholder holds 30%",
    ],
    correct: 0,
    explanation: "Companies are associated when one controls the other or both are under common control (>50%). The 45% holding is not control. The dormant company is under common control but dormant companies are excluded from the count. A 30% holding by a relative gives neither control nor a relevant attribution.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-20", paper: "ATX", area: "C", type: "mcq",
    stem: "Which loss can a 75% subsidiary surrender as CURRENT-YEAR group relief?",
    options: [
      "A capital loss on the sale of a factory",
      "A trading loss of the current accounting period",
      "A trading loss brought forward from before 1 April 2017",
      "A non-trading loan relationship deficit brought forward from before 1 April 2017",
    ],
    correct: 1,
    explanation: "Current-year group relief covers the current period's trading loss (and excess management expenses/property losses/interest). A capital loss can only be shared via a s171A election, not group relief. Pre-1 April 2017 carried-forward losses cannot be group relieved at all.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-21", paper: "ATX", area: "C", type: "mcq",
    stem: "A owns 80% of B and B owns 80% of C. Are A and C in the same GROUP RELIEF group?",
    options: [
      "Yes, because each link in the chain exceeds 75%",
      "Yes, because they are also in a chargeable gains group",
      "No, because A's effective interest in C is only 64%",
      "A and C can never form any group of any kind",
    ],
    correct: 2,
    explanation: "A group relief group needs 75% at each link AND an effective interest of at least 75%. A's effective interest in C = 80% x 80% = 64%, below 75%, so no group relief group. Each-link-75% is necessary but not sufficient; being in a gains group (which needs only >50% effective) does not make it a group relief group.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-22", paper: "ATX", area: "C", type: "mcq",
    stem: "A owns 80% of B and B owns 80% of C. Are A and C in the same CHARGEABLE GAINS group (which requires 75% at each link and a >50% effective interest)?",
    options: [
      "No, because A's effective interest is only 64%, below 75%",
      "Yes, but only because A directly owns 80% of C",
      "No, because a gains group cannot have more than two members",
      "Yes, because each holding is at least 75% and A's effective interest of 64% exceeds 50%",
    ],
    correct: 3,
    explanation: "A gains group needs 75% at each link (met) and the top company's effective interest to exceed 50%: 80% x 80% = 64% > 50%, so A and C ARE in a gains group. Applying the group-relief 75% effective test is wrong here; A does not directly own C; and a gains group can have many members.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-23", paper: "ATX", area: "C", type: "mcq",
    stem: "Amber Ltd, a trading company, sells its entire 100% holding in a trading subsidiary held for 3 years, realising a gain of £2,000,000. What is the effect of the substantial shareholding exemption (SSE)?",
    options: [
      "The gain is exempt: a trading company held a substantial (>=10%) shareholding for at least 12 months in the previous 6 years",
      "The gain is taxable because SSE only applies to holdings of 50% or more",
      "Only 50% of the gain is exempt",
      "The gain is taxable because the shares were held for fewer than 5 years",
    ],
    correct: 0,
    explanation: "SSE fully exempts the gain when a >=10% shareholding in a trading company has been held for at least 12 continuous months in the 6 years before disposal. The 50% threshold, 50% exemption and 5-year holding period are all invented conditions.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-24", paper: "ATX", area: "C", type: "mcq",
    stem: "A company leaves a chargeable gains group within 6 years of a s171 intra-group transfer, so a degrouping charge normally arises. When is the degrouping GAIN exempt?",
    options: [
      "When the departing company has been dormant",
      "When the share disposal that triggers the exit itself qualifies for the substantial shareholding exemption",
      "When the asset originally transferred was land",
      "When more than 6 years have passed since the transfer",
    ],
    correct: 1,
    explanation: "The degrouping gain is added to the share sale proceeds, so if that share disposal qualifies for SSE the degrouping gain is effectively exempt too. Dormancy and the type of asset are irrelevant, and 'more than 6 years' means no charge arises at all (contradicting the premise).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-25", paper: "ATX", area: "C", type: "mcq",
    stem: "Bramble Ltd, a UK company, has overseas branch trading income of £100,000 on which £28,000 of overseas tax was paid. UK corporation tax on that income is £25,000 (at 25%). What is the double taxation relief given by credit?",
    options: [
      "£28,000",
      "£3,000",
      "£25,000",
      "£53,000",
    ],
    correct: 2,
    explanation: "DTR by credit is the LOWER of the overseas tax (£28,000) and the UK tax on the same income (£25,000) = £25,000. £28,000 wrongly gives full overseas tax; £3,000 is the unrelieved excess; £53,000 wrongly adds the two.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-26", paper: "ATX", area: "C", type: "mcq",
    stem: "A UK company owns 100% of a subsidiary resident in a low-tax territory. Which one of the following would EXEMPT the subsidiary's profits from a controlled foreign company (CFC) charge?",
    options: [
      "The UK company holds at least 25% of the subsidiary",
      "The subsidiary pays a dividend to the UK parent each year",
      "The subsidiary was loss-making in its first year only",
      "The subsidiary's total accounting profits do not exceed £500,000, with non-trading income no more than £50,000 (low profits exemption)",
    ],
    correct: 3,
    explanation: "The low-profits exemption applies where accounting profits are <=£500,000 and non-trading income <=£50,000. A 25% interest is the threshold that CREATES a possible CFC charge, not an exemption; paying dividends does not exempt CFC profits; and one loss-making year is not the exempt-period exemption.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-27", paper: "ATX", area: "C", type: "mcq",
    stem: "Cedar Ltd is expanding overseas and expects trading losses in the first two years. Which structure allows those early overseas losses to reduce Cedar Ltd's own UK taxable profits?",
    options: [
      "An overseas permanent establishment (branch), provided no branch exemption election is made",
      "An overseas subsidiary",
      "An overseas subsidiary with a branch exemption election",
      "Neither structure ever allows overseas losses to be used in the UK",
    ],
    correct: 0,
    explanation: "An overseas branch is part of Cedar Ltd, so its losses reduce Cedar's UK profits (unless a branch exemption election is made, which would exclude both profits and losses). A subsidiary is a separate entity; its losses are not automatically available. 'Subsidiary with a branch exemption election' is a nonsense combination.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-28", paper: "ATX", area: "C", type: "mcq",
    stem: "Which statement about the UK transfer pricing rules is correct?",
    options: [
      "Transfer pricing applies only to transactions with unconnected third parties",
      "Small and medium-sized enterprises are generally exempt from transfer pricing adjustments",
      "Transfer pricing adjustments can only ever reduce taxable profits",
      "Transfer pricing applies only to sales of goods, never to services or loans",
    ],
    correct: 1,
    explanation: "SMEs are generally outside transfer pricing (small always; medium unless HMRC directs). The rules apply to CONNECTED parties, adjust prices UP to arm's length (increasing UK profits), and cover services and loans as well as goods.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-29", paper: "ATX", area: "C", type: "mcq",
    stem: "Diverted profits tax (DPT) is set at a rate deliberately ABOVE the main corporation tax rate to push arrangements back into the normal CT regime. Given a 25% main rate, what is the DPT rate?",
    options: [
      "19%",
      "25%",
      "31%",
      "33.75%",
    ],
    correct: 2,
    explanation: "DPT is charged at 31%, above the 25% main rate, to remove the incentive to divert profits. 19% is the small profits rate; 25% merely equals the main rate (DPT must be higher); 33.75% is the s455/dividend upper rate.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-30", paper: "ATX", area: "C", type: "mcq",
    stem: "Which company is a CLOSE company?",
    options: [
      "A quoted company with a 40% public float that is not controlled by 5 or fewer participators",
      "A company with exactly 100 equal shareholders",
      "Any company with fewer than 50 employees",
      "A company controlled by five or fewer participators",
    ],
    correct: 3,
    explanation: "A close company is controlled by 5 or fewer participators (or by participators who are directors). A genuinely quoted company with a 35%+ public float is excluded; 100 equal shareholders is not control by five or fewer; and employee numbers are irrelevant.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-31", paper: "ATX", area: "C", type: "mcq",
    stem: "A close company provides a private yacht for the personal use of a shareholder who is neither a director nor an employee. How is this treated?",
    options: [
      "As a distribution, taxed on the shareholder like a dividend, the benefit being measured under the employment benefit rules",
      "As a deductible business expense of the company",
      "As a loan to a participator giving rise to s455 tax",
      "As tax-free, because the shareholder is not an employee",
    ],
    correct: 0,
    explanation: "A benefit provided by a close company to a participator who is not an employee is treated as a DISTRIBUTION, taxed like a dividend and measured using the benefit-in-kind rules. It is not deductible for the company; s455 is for loans, not benefits; and it is not tax-free.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-32", paper: "ATX", area: "C", type: "mcq",
    stem: "Damson Ltd (a close company) made a £30,000 loan to a participator during the year ended 31 March 2025. When must it be repaid to avoid s455 tax, and when is s455 refunded if it is not?",
    options: [
      "Repay by 31 March 2025; s455 refunded immediately",
      "Repay within 9 months and 1 day of the year end (by 1 January 2026); if repaid later, s455 is refunded 9 months and 1 day after the end of the accounting period in which repayment is made",
      "Repay by 5 April 2025; refunded after 12 months",
      "Repay within 6 years; no refund is ever available",
    ],
    correct: 1,
    explanation: "s455 is avoided if the loan is repaid within 9 months and 1 day of the AP end (1 January 2026). If paid later, the tax is refunded 9 months and 1 day after the end of the AP in which repayment occurs. The other options use invented dates or wrongly deny any refund.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-33", paper: "ATX", area: "C", type: "mcq",
    stem: "Under the merged R&D expenditure credit (RDEC) scheme in force from 1 April 2024, at what rate is the expenditure credit given?",
    options: [
      "13%",
      "86%",
      "20%",
      "230%",
    ],
    correct: 2,
    explanation: "The merged-scheme RDEC rate is 20% of qualifying expenditure. 13% was the earlier RDEC rate; 86% is the R&D-intensive SME additional deduction; 230% was the old SME super-deduction total.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-34", paper: "ATX", area: "C", type: "mcq",
    stem: "Elder Ltd buys the trade and assets of a business including purchased goodwill of £400,000. How is corporation tax relief for that goodwill given?",
    options: [
      "Full amortisation relief following the accounts",
      "No relief is ever available for purchased goodwill",
      "Relief as a capital loss on acquisition",
      "A fixed 6.5% per annum, available only where the goodwill is acquired with qualifying intellectual property and capped by reference to that IP",
    ],
    correct: 3,
    explanation: "Relief for purchased goodwill is restricted: a 6.5% fixed-rate deduction is available only where the goodwill is acquired together with qualifying IP, capped by reference to that IP. Full accounts-based amortisation is not available; relief is not wholly denied; and it is not a capital loss.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-35", paper: "ATX", area: "C", type: "mcq",
    stem: "Fennel Ltd pays interest on a loan taken out to buy an investment property that it lets out. How is the interest treated?",
    options: [
      "As a non-trading loan relationship debit, pooled with other non-trading credits and debits",
      "As a trading loan relationship debit deducted from trading profits",
      "As a capital cost added to the property's base cost",
      "As a distribution",
    ],
    correct: 0,
    explanation: "The loan is for a non-trading (investment) purpose, so the interest is a non-trading loan relationship debit, pooled with other non-trading items (a net deficit is relievable in various ways). It is not a trading debit, not capitalised into the property, and not a distribution.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-36", paper: "ATX", area: "C", type: "mcq",
    stem: "The corporate interest restriction contains a de minimis below which a group's net tax-interest expense is not restricted. What is that annual amount?",
    options: [
      "£5 million",
      "£2 million",
      "£50,000",
      "£1 million",
    ],
    correct: 1,
    explanation: "The CIR de minimis is £2 million of net tax-interest per year. £5 million is a common misremember; £50,000 is the CT lower profit limit; £1 million is the annual investment allowance.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-37", paper: "ATX", area: "C", type: "mcq",
    stem: "On a takeover, the shareholders of Gale Ltd exchange their shares for shares in the acquiring company. Provided the conditions are met, what is the chargeable gains effect for the shareholders?",
    options: [
      "An immediate chargeable gain on the market value of the new shares",
      "A degrouping charge on the shareholders",
      "No disposal: the new shares take the base cost and acquisition date of the old shares, deferring the gain until they are eventually sold",
      "The gain is permanently exempt under the substantial shareholding exemption",
    ],
    correct: 2,
    explanation: "A qualifying share-for-share exchange is not treated as a disposal; the new shares 'stand in the shoes' of the old, so the gain is deferred until they are sold. There is no immediate gain, degrouping charges apply to companies (not shareholders), and SSE is a company exemption, not for individuals.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-C-38", paper: "ATX", area: "C", type: "mcq",
    stem: "What happens to a company's corporation tax accounting periods when it goes into liquidation?",
    options: [
      "The company's accounting period is unaffected by liquidation",
      "The company ceases to be chargeable to corporation tax immediately",
      "All prior-year losses are cancelled on liquidation",
      "A new accounting period begins when the winding up commences",
    ],
    correct: 3,
    explanation: "The commencement of winding up ends the current accounting period and starts a new one. The company remains chargeable to CT during liquidation, and its losses are not cancelled by liquidation.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-C-39", paper: "ATX", area: "C", type: "mcq",
    stem: "A consortium company is one in which companies together hold at least 75%, each holding at least 5%. Which of the following is a valid consortium for consortium relief?",
    options: [
      "Three companies holding 30%, 30% and 15%, with the remaining 25% held by individuals",
      "Two companies holding 40% and 30%, the remaining 30% held widely by the public",
      "Five companies each holding 4%",
      "One company holding 90%",
    ],
    correct: 0,
    explanation: "30% + 30% + 15% = 75% held by companies, each at least 5% — a valid consortium. Two companies holding 40% + 30% = only 70% (<75%). 4% each is below the 5% minimum. A single 90% holder is a 75% subsidiary (group relief), not a consortium.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-C-40", paper: "ATX", area: "C", type: "mcq",
    stem: "Post-1 April 2017 carried-forward trading losses can be surrendered as group relief for carried-forward losses. Which condition must be met?",
    options: [
      "The losses must have arisen before 1 April 2017",
      "The surrendering company must first relieve the losses against its own total profits so far as it can, then surrender only the excess",
      "The claimant need only be a 51% subsidiary",
      "Carried-forward losses can never be group relieved",
    ],
    correct: 1,
    explanation: "For carried-forward losses to be group relieved, the surrendering company must first use them against its own profits so far as possible, then surrender the excess. The losses must be post- (not pre-) 1 April 2017, the group must be a 75% (not 51%) group, and since 2017 carried-forward losses CAN be group relieved.",
    marks: 2, difficulty: "medium",
  },

  /* ═══════════════ Area D — VAT & stamp taxes — 20 ═══════════════ */

  /* ── VAT: partial exemption & capital goods scheme ── */
  {
    id: "ATX3-D-01", paper: "ATX", area: "D", type: "number",
    stem: "A partially exempt business has input tax of £40,000 directly attributable to taxable supplies, £6,000 directly attributable to exempt supplies, and £20,000 residual (non-attributable). Taxable supplies are £800,000 and exempt supplies £200,000. Under the standard method the recoverable residual proportion is taxable/total supplies. The de minimis limit is £625 per month (£7,500 per year) AND 50% of total input tax. What is the total recoverable input tax in £?",
    numericAnswer: 56000, unit: "£", tolerance: 1,
    explanation: "Recovery fraction = £800,000 / £1,000,000 = 80%. Recoverable residual = £20,000 x 80% = £16,000. Exempt input tax = £6,000 + (£20,000 - £16,000) = £10,000, which exceeds £7,500, so the de minimis is failed and exempt input tax is irrecoverable. Recoverable = £40,000 + £16,000 = £56,000.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-D-02", paper: "ATX", area: "D", type: "number",
    stem: "A business buys a building for use in a capital goods scheme adjustment (land and buildings costing £250,000 or more, 10-year adjustment period). Input VAT on the building was £150,000 and initial taxable use was 70%. In a later interval taxable use falls to 40%. What is the annual CGS adjustment for that interval, and is it payable to HMRC? Give the amount in £.",
    numericAnswer: 4500, unit: "£", tolerance: 1,
    explanation: "Annual adjustment = (total input VAT / 10) x (current % - original %) = (£150,000 / 10) x (40% - 70%) = £15,000 x (-30%) = -£4,500. Because use has fallen, £4,500 is repayable TO HMRC.",
    marks: 2, difficulty: "hard",
  },

  /* ── SDLT & stamp duty ── */
  {
    id: "ATX3-D-03", paper: "ATX", area: "D", type: "number",
    stem: "A company buys commercial (non-residential) premises for £400,000. Non-residential SDLT is charged at 0% up to £150,000, 2% on £150,001-£250,000, and 5% above £250,000. What is the SDLT in £?",
    numericAnswer: 9500, unit: "£", tolerance: 1,
    explanation: "SDLT = (£250,000 - £150,000) x 2% + (£400,000 - £250,000) x 5% = £100,000 x 2% + £150,000 x 5% = £2,000 + £7,500 = £9,500.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-04", paper: "ATX", area: "D", type: "number",
    stem: "An investor buys shares for a cash consideration of £54,300. Stamp duty on shares is 0.5% of the consideration, rounded UP to the nearest £5. What is the stamp duty payable in £?",
    numericAnswer: 275, unit: "£", tolerance: 0,
    explanation: "£54,300 x 0.5% = £271.50, rounded up to the nearest £5 = £275.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-05", paper: "ATX", area: "D", type: "number",
    stem: "A company buys a residential dwelling for £300,000. Residential SDLT is 0% up to £250,000 and 5% on £250,001-£925,000, and a 3% additional-dwelling surcharge applies to the whole price. What is the total SDLT in £?",
    numericAnswer: 11500, unit: "£", tolerance: 1,
    explanation: "Standard element = (£300,000 - £250,000) x 5% = £50,000 x 5% = £2,500. Surcharge = £300,000 x 3% = £9,000. Total = £2,500 + £9,000 = £11,500.",
    marks: 2, difficulty: "medium",
  },

  /* ── VAT: place of supply / reverse charge ── */
  {
    id: "ATX3-D-06", paper: "ATX", area: "D", type: "number",
    stem: "A UK VAT-registered company buys consultancy services for £30,000 from an overseas supplier. Under the general B2B place-of-supply rule the customer accounts for VAT by the reverse charge at the standard rate of 20%. What is the output VAT the UK company must declare under the reverse charge, in £?",
    numericAnswer: 6000, unit: "£", tolerance: 1,
    explanation: "Reverse-charge output VAT = £30,000 x 20% = £6,000. The company declares this as output tax (and recovers matching input tax to the extent it makes taxable supplies).",
    marks: 2, difficulty: "medium",
  },

  /* ── Area D — mcq ── */
  {
    id: "ATX3-D-07", paper: "ATX", area: "D", type: "mcq",
    stem: "The VAT registration threshold is £90,000 of taxable turnover in any rolling 12 months. Willow Ltd's taxable turnover reaches £90,000 in the 12 months to 31 May 2025. When must it notify HMRC and from when is it registered?",
    options: [
      "Notify within 30 days of the start of the next tax year; registered immediately",
      "No need to register until turnover exceeds £90,000 in a single month",
      "Notify HMRC within 30 days of the end of the month in which the £90,000 threshold was exceeded (by 30 June 2025), and register from the first day of the second month, 1 July 2025",
      "Register only when turnover falls to the £88,000 deregistration threshold",
    ],
    correct: 2,
    explanation: "Under the historic test, notify within 30 days of the end of the month the threshold is exceeded (30 June 2025), with registration from the first day of the following month (1 July 2025). The other options invent the trigger or confuse it with the deregistration threshold.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-08", paper: "ATX", area: "D", type: "mcq",
    stem: "Which statement about VAT group registration is correct?",
    options: [
      "Supplies between members of the VAT group are standard-rated",
      "Each company in the group must still file its own separate VAT return",
      "Companies need no common control to form a VAT group",
      "The group is treated as a single taxable person, supplies between members are disregarded, and the representative member accounts for the group's VAT",
    ],
    correct: 3,
    explanation: "A VAT group is one taxable person: intra-group supplies are disregarded and the representative member files a single return. Intra-group supplies are NOT standard-rated, members do not file separately, and common control is required.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-09", paper: "ATX", area: "D", type: "mcq",
    stem: "Under the VAT partial exemption de minimis rules, exempt input tax is fully recoverable if it is:",
    options: [
      "Below £625 per month on average AND no more than 50% of total input tax",
      "Below £1,000 per month, with no percentage test",
      "Below £7,500 per year, with no percentage test",
      "No more than 50% of total input tax, with no monetary cap",
    ],
    correct: 0,
    explanation: "De minimis requires BOTH tests: exempt input tax <=£625 per month on average AND <=50% of total input tax. The £7,500 annual figure is the yearly equivalent of £625/month but omits the essential 50% test; the £1,000 and 50%-only options drop one limb.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-D-10", paper: "ATX", area: "D", type: "mcq",
    stem: "To which of the following does the VAT capital goods scheme apply?",
    options: [
      "A single computer costing £30,000 plus VAT",
      "A commercial building costing £600,000 plus VAT",
      "A fleet of vans costing £400,000 in total",
      "Office furniture costing £280,000",
    ],
    correct: 1,
    explanation: "The CGS applies to land and buildings costing £250,000 or more (10-year adjustment) and computers/ships/aircraft costing £50,000 or more (5-year). The £600,000 building qualifies. The £30,000 computer is below the £50,000 computer threshold; vans and furniture are not CGS assets.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-D-11", paper: "ATX", area: "D", type: "mcq",
    stem: "A landlord makes an option to tax on a commercial building. What is the effect?",
    options: [
      "Rental supplies become exempt, blocking input VAT recovery",
      "The building becomes zero-rated",
      "Rental and sale supplies become standard-rated, allowing the landlord to recover related input VAT",
      "The option can never be revoked, even after 20 years",
    ],
    correct: 2,
    explanation: "Opting to tax turns otherwise-exempt supplies of the building into standard-rated supplies, so the landlord can recover related input VAT. It does not make supplies exempt or zero-rated, and it can be revoked (within 6 months, or after 20 years).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-D-12", paper: "ATX", area: "D", type: "mcq",
    stem: "For a business sale to be a transfer of a going concern (TOGC) outside the scope of VAT, which condition must be met?",
    options: [
      "The purchaser must be in the same VAT group as the seller",
      "The assets must be sold to an overseas buyer",
      "The seller must charge VAT and the buyer reclaim it",
      "The business (or part) is transferred as a going concern, the buyer carries on the same kind of business, and the buyer is (or immediately becomes) VAT-registered where required",
    ],
    correct: 3,
    explanation: "A TOGC needs the business to be transferred as a going concern, the buyer to continue the same kind of business, and the buyer to be (or become) registered where required — then it is not a supply. It does not require common VAT grouping or an overseas buyer, and TOGC means NO VAT is charged.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-D-13", paper: "ATX", area: "D", type: "mcq",
    stem: "A UK VAT-registered company supplies consultancy to a business customer in Germany. Under the general B2B place-of-supply rule, where is the supply made and who accounts for VAT?",
    options: [
      "In Germany; the German business customer accounts for VAT under the reverse charge",
      "In the UK; the UK supplier charges UK VAT",
      "In the UK; the supply is exempt",
      "In Germany; the UK supplier must register for German VAT",
    ],
    correct: 0,
    explanation: "For B2B services the place of supply is where the customer belongs (Germany), and the customer accounts for VAT by the reverse charge. It is not a UK supply, not exempt, and the reverse charge means the UK supplier need not register in Germany.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-D-14", paper: "ATX", area: "D", type: "mcq",
    stem: "The sale of the freehold in a 'new' commercial building (less than 3 years old) is:",
    options: [
      "Exempt from VAT",
      "Standard-rated at 20%",
      "Zero-rated",
      "Outside the scope of VAT",
    ],
    correct: 1,
    explanation: "The freehold sale of a new (under 3 years) commercial building is standard-rated. Exemption applies to old commercial buildings (unless opted); zero-rating is for new residential/charitable buildings; and the sale is within the scope of VAT.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-D-15", paper: "ATX", area: "D", type: "mcq",
    stem: "Under the points-based penalty regime for late VAT returns, a fixed penalty becomes payable when a business:",
    options: [
      "Misses a single filing deadline",
      "Is late paying, regardless of filing",
      "Reaches its points threshold (e.g. 4 points for quarterly returns), after which a £200 fixed penalty applies for that and each further late return",
      "Exceeds the £90,000 registration threshold",
    ],
    correct: 2,
    explanation: "Points accrue for each late return; once the threshold (4 points for quarterly filers) is reached, a £200 penalty applies for that and every subsequent late return. A single miss only adds a point; late-payment penalties are a separate regime; the £90,000 threshold is about registration.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-D-16", paper: "ATX", area: "D", type: "mcq",
    stem: "Stamp duty on the transfer of shares using a stock transfer form is charged at:",
    options: [
      "0.5% of consideration, rounded up to the nearest £1",
      "5% of consideration",
      "2% of consideration",
      "0.5% of the consideration, rounded up to the nearest £5",
    ],
    correct: 3,
    explanation: "Stamp duty on shares is 0.5% of consideration, rounded up to the nearest £5. Rounding to £1 is wrong; 5% and 2% are SDLT rates, not stamp duty on shares.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-17", paper: "ATX", area: "D", type: "mcq",
    stem: "The 3% SDLT surcharge for additional residential dwellings applies to:",
    options: [
      "A company purchasing a residential dwelling, or an individual buying an additional residential dwelling",
      "Every purchase of any commercial property",
      "First-time buyers only",
      "Only purchases below £40,000",
    ],
    correct: 0,
    explanation: "The 3% surcharge hits companies buying residential dwellings and individuals buying an additional dwelling. It does not apply to commercial property, penalises the opposite of first-time buyers, and does NOT apply where the price is below £40,000.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-D-18", paper: "ATX", area: "D", type: "mcq",
    stem: "When is the VAT partial exemption ANNUAL adjustment carried out?",
    options: [
      "On every VAT return during the year",
      "Once a year, recalculating recovery for the whole year and adjusting the provisional quarterly figures",
      "Only when the business deregisters",
      "Every ten years",
    ],
    correct: 1,
    explanation: "The annual adjustment recalculates recovery for the whole year once a year and corrects the provisional quarterly recoveries. Quarterly returns use provisional figures (not the annual adjustment); it is not tied to deregistration; and the ten-year period relates to the capital goods scheme.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-19", paper: "ATX", area: "D", type: "mcq",
    stem: "A business may deregister for VAT if its taxable turnover in the next 12 months is expected to fall below the deregistration threshold of:",
    options: [
      "£90,000",
      "£85,000",
      "£88,000",
      "£83,000",
    ],
    correct: 2,
    explanation: "The deregistration threshold is £88,000. £90,000 is the registration threshold; £85,000 and £83,000 are earlier thresholds.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-D-20", paper: "ATX", area: "D", type: "mcq",
    stem: "Which statement about stamp duty land tax (SDLT) is correct?",
    options: [
      "Non-residential and residential property use identical rate bands",
      "SDLT applies across the whole UK, including Scotland and Wales",
      "SDLT is a single flat 5% rate on all property",
      "Non-residential property has a nil-rate band to £150,000, then 2% to £250,000, then 5% above £250,000",
    ],
    correct: 3,
    explanation: "Non-residential SDLT bands are 0% to £150,000, 2% to £250,000, then 5%. Residential uses different bands; SDLT applies only in England and Northern Ireland (Scotland has LBTT, Wales has LTT); and it is not a single flat 5% rate.",
    marks: 2, difficulty: "hard",
  },

  /* ═══════════════ Area E — Tax planning & ethics — 20 ═══════════════ */

  {
    id: "ATX3-E-01", paper: "ATX", area: "E", type: "mcq",
    stem: "Which best distinguishes tax avoidance from tax evasion?",
    options: [
      "Avoidance uses lawful means to reduce tax; evasion involves illegal concealment or misrepresentation",
      "Avoidance is illegal; evasion is legal",
      "Both are illegal",
      "Both are legal",
    ],
    correct: 0,
    explanation: "Avoidance is the use of lawful means to minimise tax; evasion is illegal (concealing income, false statements). The other options reverse the legality or wrongly treat both the same.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-E-02", paper: "ATX", area: "E", type: "mcq",
    stem: "The General Anti-Abuse Rule (GAAR) counteracts:",
    options: [
      "All tax planning of any kind",
      "Abusive arrangements that cannot reasonably be regarded as a reasonable course of action (the 'double reasonableness' test)",
      "Only arrangements already disclosed under DOTAS",
      "Innocent arithmetical errors on a return",
    ],
    correct: 1,
    explanation: "GAAR targets ABUSIVE arrangements failing the double-reasonableness test. It does not catch all planning, is not limited to DOTAS-disclosed schemes, and is not aimed at innocent errors.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-E-03", paper: "ATX", area: "E", type: "mcq",
    stem: "Under DOTAS, when a promoter notifies HMRC of a disclosable scheme, HMRC issues a scheme reference number (SRN). What must a user of the scheme do with it?",
    options: [
      "Keep the SRN confidential from HMRC",
      "Send the SRN to the promoter's bank",
      "Report the SRN on their own tax return to identify that they have used the scheme",
      "Nothing — only the promoter has obligations",
    ],
    correct: 2,
    explanation: "The user must report the SRN on their tax return so HMRC can link them to the scheme. Keeping it from HMRC defeats the purpose, the bank is irrelevant, and users (not just promoters) have obligations.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-04", paper: "ATX", area: "E", type: "mcq",
    stem: "Which of the following is one of the five fundamental principles in the Professional Conduct in Relation to Taxation (PCRT)?",
    options: [
      "Profit maximisation for the firm",
      "Aggressive marketing of tax schemes",
      "Loyalty to the client above the law",
      "Integrity",
    ],
    correct: 3,
    explanation: "The five PCRT principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour. Firm profit, aggressive marketing and putting client loyalty above the law are not principles.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX3-E-05", paper: "ATX", area: "E", type: "mcq",
    stem: "A tax adviser discovers that a client under-declared income in a previous return. The client refuses to disclose the error to HMRC. What should the adviser do?",
    options: [
      "Advise the client of the need to disclose; if the client still refuses, cease to act, notify HMRC that the firm no longer acts (without disclosing the reason), and consider a money laundering report",
      "Correct the return with HMRC without the client's consent",
      "Do nothing, citing the duty of confidentiality",
      "Report the client straight to the police",
    ],
    correct: 0,
    explanation: "The adviser must advise disclosure; if refused, cease to act, notify HMRC only that they no longer act (without giving reasons, preserving confidentiality), and consider a money laundering report to the MLRO/NCA. Correcting without consent breaches confidentiality; doing nothing ignores the obligation; the police are the wrong channel.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-E-06", paper: "ATX", area: "E", type: "mcq",
    stem: "An accountant who suspects a client of tax evasion (money laundering) should report to:",
    options: [
      "HMRC's fraud hotline directly",
      "The firm's Money Laundering Reporting Officer (MLRO), who considers a Suspicious Activity Report to the National Crime Agency",
      "The client's bank",
      "The local police station",
    ],
    correct: 1,
    explanation: "Internal reports go to the firm's MLRO, who decides whether to make a Suspicious Activity Report to the NCA. The HMRC hotline, the bank and the police are not the required channel.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-07", paper: "ATX", area: "E", type: "mcq",
    stem: "After submitting a suspicious activity report, an accountant must avoid 'tipping off'. This means:",
    options: [
      "Not telling HMRC anything",
      "Not charging the client a fee",
      "Not disclosing to the client (or anyone else) anything likely to prejudice a money laundering investigation",
      "Not keeping any records of the matter",
    ],
    correct: 2,
    explanation: "Tipping off is disclosing something likely to prejudice an investigation, typically to the client — an offence. It is not about withholding information from HMRC, fees, or records (which should be kept).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-08", paper: "ATX", area: "E", type: "mcq",
    stem: "Which is generally a tax ADVANTAGE of operating through a company rather than as a sole trader?",
    options: [
      "Company profits are automatically exempt from tax",
      "A company need file no tax returns",
      "Losses are always relieved more flexibly in a company",
      "The ability to control the timing and form of profit extraction (retain profits, take dividends), potentially reducing overall tax and NIC",
    ],
    correct: 3,
    explanation: "Incorporation lets the owner control when and how profits are extracted, which can cut overall tax and NIC. Company profits are taxed (not exempt), companies do file returns, and early-trade loss reliefs are actually more flexible for sole traders.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-09", paper: "ATX", area: "E", type: "mcq",
    stem: "Why is extracting profit as a dividend often more NIC-efficient than salary for an owner-manager?",
    options: [
      "Dividends are not subject to National Insurance, whereas salary attracts both employee and employer NIC",
      "Dividends attract employee and employer NIC, but at a lower rate",
      "Salary is tax-free up to £50,000",
      "Dividends are deductible for the company, salary is not",
    ],
    correct: 0,
    explanation: "Dividends carry NO National Insurance, while salary triggers employee and employer NIC — the NIC saving. Dividends do not attract NIC at all (not merely a lower rate), salary is not tax-free to £50,000, and it is salary (not dividends) that is deductible for the company.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-10", paper: "ATX", area: "E", type: "number",
    stem: "A company pays its owner-manager an additional gross bonus of £20,000. Employer's (secondary) Class 1 National Insurance is charged at 13.8%. What is the employer's NIC cost of the bonus, in £?",
    numericAnswer: 2760, unit: "£", tolerance: 1,
    explanation: "Employer's Class 1 NIC = £20,000 x 13.8% = £2,760 (a cost of paying a bonus that would not arise on a dividend).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-11", paper: "ATX", area: "E", type: "mcq",
    stem: "Why is an employer pension contribution often an attractive way for an owner-manager to extract profit?",
    options: [
      "It is subject to employer NIC just like salary",
      "The company gets a corporation tax deduction (if wholly and exclusively for the trade) and, within the annual allowance, there is no income tax or NIC for the individual at the point of contribution",
      "It is always tax-free with no limit",
      "A dividend gives a bigger immediate company deduction",
    ],
    correct: 1,
    explanation: "Employer pension contributions get a CT deduction and, within the £60,000 annual allowance, no income tax or NIC for the individual. They are NOT subject to employer NIC, are limited by the annual allowance (not unlimited), and dividends give no company deduction at all.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-12", paper: "ATX", area: "E", type: "mcq",
    stem: "On incorporating a sole trade, which relief defers the capital gain on transferring chargeable business assets to the company in exchange for shares?",
    options: [
      "Rollover relief on replacement of business assets",
      "Business asset disposal relief, which exempts the gain entirely",
      "Incorporation relief (s162), which defers the gain against the base cost of the shares received",
      "Private residence relief",
    ],
    correct: 2,
    explanation: "Incorporation relief (s162) defers the gain by deducting it from the base cost of the shares received, where the whole business is transferred as a going concern for shares. Rollover relief is for replacing assets, BADR reduces the rate (it does not exempt or defer), and PRR is for a main residence.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-E-13", paper: "ATX", area: "E", type: "mcq",
    stem: "Under the PCRT 'Standards for Tax Planning', a member should NOT:",
    options: [
      "Advise on the legitimate use of reliefs Parliament intended",
      "Explain the risks and consequences of a planning arrangement",
      "Keep proper records of the advice given",
      "Create or promote highly artificial, contrived arrangements that exploit shortcomings in the legislation contrary to Parliament's intention",
    ],
    correct: 3,
    explanation: "The PCRT standards prohibit creating or promoting artificial, contrived arrangements contrary to Parliament's intention. Advising on legitimate reliefs, explaining risks and keeping records are all required or acceptable.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-14", paper: "ATX", area: "E", type: "mcq",
    stem: "When can a tax adviser disclose confidential client information WITHOUT the client's consent?",
    options: [
      "When required or permitted by law (for example a money laundering report) or where there is a professional duty to disclose",
      "Whenever it would increase the firm's fees",
      "Never, under any circumstances",
      "Whenever a competitor requests it",
    ],
    correct: 0,
    explanation: "Confidentiality yields where disclosure is required or permitted by law (e.g. a SAR) or there is a professional duty. Increasing fees or a competitor's request are never justifications, and 'never' is too absolute given legal overrides.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-15", paper: "ATX", area: "E", type: "mcq",
    stem: "An owner-manager plans profit extraction across the corporate and personal boundary. Which reflects an efficient interaction?",
    options: [
      "Pay a large salary to maximise the CT deduction, ignoring personal higher-rate tax and NIC",
      "Pay a small salary up to the NIC threshold (preserving state pension entitlement and a CT deduction), then dividends within the available bands — balancing company and personal tax",
      "Pay everything as dividends and no salary in every case, regardless of allowances",
      "Retain all profit in the company permanently to avoid all tax",
    ],
    correct: 1,
    explanation: "Efficient extraction usually pairs a small NIC-threshold salary (state pension credit plus a CT deduction) with dividends within available bands, balancing corporate and personal tax. A large salary triggers NIC and higher-rate tax; all-dividends ignores the NIC-free salary and CT deduction; permanent retention is deferral, not avoidance.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-E-16", paper: "ATX", area: "E", type: "mcq",
    stem: "An adviser who has made an error in a client's SUBMITTED return that resulted in too little tax should:",
    options: [
      "Ignore the error if the client is content",
      "Quietly amend all past returns without telling the client",
      "Advise the client to disclose and correct the error with HMRC; if the client refuses, consider ceasing to act",
      "Report the client to the NCA immediately without first advising them",
    ],
    correct: 2,
    explanation: "The adviser should advise the client to disclose and correct the error; if the client refuses, consider ceasing to act (and whether a money laundering report is needed). Ignoring it, amending secretly, or reporting to the NCA before advising the client are all wrong.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-17", paper: "ATX", area: "E", type: "mcq",
    stem: "DOTAS requires disclosure of schemes bearing certain 'hallmarks'. The disclosure test is essentially that:",
    options: [
      "The scheme must involve overseas companies",
      "The scheme must be illegal",
      "The scheme must always involve VAT",
      "Obtaining a tax advantage is one of the main expected benefits and the arrangement bears a prescribed hallmark (e.g. confidentiality, premium fee, standardised product)",
    ],
    correct: 3,
    explanation: "DOTAS applies where a main benefit is a tax advantage and a prescribed hallmark is present (confidentiality, premium fee, standardised tax products, etc.). It is not confined to overseas companies or VAT, and it covers LEGAL avoidance, not just illegal schemes.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-18", paper: "ATX", area: "E", type: "mcq",
    stem: "The PCRT principle of 'professional competence and due care' requires a member to:",
    options: [
      "Maintain professional knowledge and skill at the level needed to give competent service and act diligently within applicable standards",
      "Guarantee a specific tax outcome to the client",
      "Take on any work regardless of the member's expertise",
      "Always reduce the client's tax to zero",
    ],
    correct: 0,
    explanation: "Professional competence and due care means keeping knowledge and skill up to date and acting diligently. Guaranteeing outcomes, accepting work beyond one's expertise, or promising zero tax are all inconsistent with the principle.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX3-E-19", paper: "ATX", area: "E", type: "mcq",
    stem: "A taxpayer used an avoidance scheme that has been defeated in another party's litigation. HMRC issues a follower notice and an accelerated payment notice (APN). The effect of the APN is that the taxpayer must:",
    options: [
      "Wait until their own case is finally decided before paying anything",
      "Pay the disputed tax up front within the specified period while the dispute continues, removing the cash-flow advantage of the scheme",
      "Pay nothing, as an APN is only advisory",
      "Automatically face imprisonment",
    ],
    correct: 1,
    explanation: "An APN requires the disputed tax to be paid up front while the dispute continues, taking away the scheme's cash-flow benefit. The taxpayer cannot simply wait, an APN is not merely advisory, and it does not itself lead to imprisonment.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX3-E-20", paper: "ATX", area: "E", type: "mcq",
    stem: "Before accepting a new tax client, a firm should, among other things:",
    options: [
      "Skip identity checks to save time",
      "Guarantee to reduce the client's tax bill",
      "Carry out client due diligence ('know your client') under the money laundering regulations and seek professional clearance from the previous adviser",
      "Sign the returns without reviewing them",
    ],
    correct: 2,
    explanation: "New-client acceptance requires client due diligence under the money laundering regulations and professional clearance from the outgoing adviser. Skipping identity checks, guaranteeing tax savings, or signing returns unreviewed all breach professional standards.",
    marks: 2, difficulty: "medium",
  },

]

