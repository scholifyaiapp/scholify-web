import type { WrittenQuestion } from "@/lib/acca-written"

/*
 * TX-UK · Section C constructed-response questions, second file.
 *
 * Completes the three disjoint mock sittings. TX's Section C is 10 + 15 + 15, so three forms
 * need THREE 10-markers and SIX 15-markers. acca-written-tx-kit.ts holds two 10-markers and
 * four 15-markers; this file adds the third 10-marker and the fifth and sixth 15-markers.
 *
 *   Form 1 · Q1 (15) income tax   Q2 (15) corporation tax   Q3 (10) administration
 *   Form 2 · Q4 (15) losses       Q5 (15) chargeable gains  Q6 (10) VAT
 *   Form 3 · Q7 (15) partnership  Q8 (15) inheritance tax    Q9 (10) VAT registration
 *
 * All figures are FA2025 and were verified by script. No question applies an excluded topic.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Form 3 · Q7 (15), Q8 (15), Q9 (10) ───────────────────────── */

const Q07: WrittenQuestion = {
  id: "TXW-07",
  paper: "TX",
  area: "B",
  chapter: "TX-12",
  topic: "Partnership profit allocation, a new partner and national insurance",
  maxMarks: 15,
  stem:
    "Agnes Ryberg and Bo Solvang have been partners since 2014 and draw their accounts up to 31 March. The partnership's tax adjusted trading profit for the twelve months to 31 March 2026 came to £336,000.\n\nUntil 31 December 2025 the agreement gave Agnes a salary of £42,000 a year and Bo £30,000 a year, with the balance shared equally. On 1 January 2026 Clara Wik joined the partnership, all salaries ceased, and the three shared profits 2:2:1.\n\nAgnes has no other income. Clara had been employed elsewhere until she joined, and this is the first trade she has ever carried on.\n\nRequired:\n\n(a) Calculate each partner's share of the trading profit for the year ended 31 March 2026. (7 marks)\n\n(b) Calculate Agnes's Class 4 national insurance contributions for 2025/26, and explain why the partnership itself pays no income tax or Class 4. (4 marks)\n\n(c) The partnership expects a loss in the year ending 31 March 2027. Explain what loss relief will be available to Clara that is not available to Agnes or Bo, and why. (4 marks)",
  rubric: [
    "(a) Splits the accounting period at the date of change: 1 April to 31 December 2025 is nine months and 1 January to 31 March 2026 is three months (1 mark).",
    "(a) Apportions the profit: £336,000 × 9/12 = £252,000 to the first part and £336,000 × 3/12 = £84,000 to the second (1 mark).",
    "(a) First part salaries for nine months: Agnes £42,000 × 9/12 = £31,500 and Bo £30,000 × 9/12 = £22,500, totalling £54,000 (2 marks).",
    "(a) First part balance = £252,000 − £54,000 = £198,000, shared equally at £99,000 each. So Agnes £130,500 and Bo £121,500 (1 mark).",
    "(a) Second part: no salaries, so £84,000 in the 2:2:1 ratio gives Agnes £33,600, Bo £33,600 and Clara £16,800 (1 mark).",
    "(a) Totals: Agnes £164,100, Bo £155,100, Clara £16,800. Credit for checking that the three sum to £336,000 — that check is the only one available and it catches most allocation errors (1 mark).",
    "(b) Agnes's Class 4: (£50,270 − £12,570) × 6% = £2,262, plus (£164,100 − £50,270) × 2% = £2,276.60. Total £4,538.60 (2 marks).",
    "(b) Explains that a partnership is TRANSPARENT: it files a return showing the profit and its allocation but pays no tax itself, because each partner is taxed on their own share (1 mark).",
    "(b) Notes the consequence — each partner makes their OWN loss relief claims and their own Class 4 computation, independently of the others (1 mark).",
    "(c) Identifies OPENING YEAR loss relief as available to Clara alone (1 mark).",
    "(c) Explains WHY: each partner's trade is their own, and Clara is within the first four tax years of hers even though the partnership has traded for many years. Agnes and Bo are long past that window (2 marks).",
    "(c) States how it operates: carry back three tax years against TOTAL income on a FIFO basis — earliest year first — which is valuable to Clara because she had employment income in those earlier years. Credit for contrasting it with terminal loss relief, which is LIFO and against trading profits (1 mark).",
  ],
}

const Q08: WrittenQuestion = {
  id: "TXW-08",
  paper: "TX",
  area: "D",
  chapter: "TX-19",
  topic: "Inheritance tax on lifetime transfers and the death estate",
  maxMarks: 15,
  stem:
    "Nils Halvorsen made the following lifetime transfers. He had made no transfers before these.\n\n  10 May 2019      £420,000 into a discretionary trust. Nils agreed to pay any lifetime tax.\n  14 October 2022  £260,000 to his daughter.\n\nBoth annual exemptions were available for each transfer.\n\nNils died on 8 January 2026. His estate comprised his house, worth £540,000 and left to his daughter, and other assets of £395,000. He had an outstanding bank loan of £48,000 and funeral expenses were £7,000. Nils had never married.\n\nThe nil rate band is £325,000 throughout.\n\nRequired:\n\n(a) Calculate the lifetime inheritance tax on the May 2019 transfer, and state the gross chargeable transfer carried forward. (5 marks)\n\n(b) Calculate the inheritance tax arising on the October 2022 transfer as a result of Nils's death, stating who is liable and when it is due. (5 marks)\n\n(c) Calculate the inheritance tax on the death estate. (5 marks)",
  rubric: [
    "(a) Net chargeable transfer = £420,000 − £6,000 (the 2019/20 annual exemption plus the unused 2018/19 one brought forward) = £414,000 (2 marks).",
    "(a) The full £325,000 nil rate band is available, there being no earlier transfers, so £414,000 − £325,000 = £89,000 is chargeable (1 mark).",
    "(a) NILS pays the tax, so it must be GROSSED UP at 20/80 = 25%: £89,000 × 25% = £22,250 (1 mark).",
    "(a) Gross chargeable transfer carried forward = £414,000 + £22,250 = £436,250, because the tax Nils paid is itself a transfer of value. Had the trustees paid, the figure would have been £414,000 (1 mark).",
    "(b) The October 2022 gift to a daughter is a PET, so no tax was due when made. Nils died within seven years, so it becomes chargeable (1 mark).",
    "(b) Net transfer = £260,000 − £6,000 = £254,000. The nil rate band available is £325,000 less gross chargeable transfers in the seven years BEFORE this transfer, being the £436,250 from May 2019 — which exceeds the band, so NIL nil rate band is available (2 marks).",
    "(b) Tax = £254,000 × 40% = £101,600. Taper relief: from October 2022 to January 2026 is more than 3 but less than 4 years, so a 20% reduction applied to the TAX: £101,600 × 80% = £81,280 (1 mark).",
    "(b) The DAUGHTER is primarily liable as donee, with the estate liable if it goes unpaid, and it is due six months after the end of the month of death — 31 July 2026. No credit for lifetime tax arises, a PET having borne none (1 mark).",
    "(c) Net estate = £540,000 + £395,000 − £48,000 − £7,000 = £880,000. Both the bank loan and reasonable funeral expenses are deductible (2 marks).",
    "(c) Residence nil rate band: the house passes to a DIRECT DESCENDANT, so £175,000 is available and is within the £540,000 house value. Nils never married, so there is no transferred band (1 mark).",
    "(c) Nil rate band: £325,000 less gross chargeable transfers in the seven years before death. Both lifetime transfers fall in that window — £436,250 + £254,000 = £690,250 — which far exceeds the band, so NIL is available (1 mark).",
    "(c) Taxable estate = £880,000 − £175,000 = £705,000, at 40% = £282,000, payable by the personal representatives on the earlier of 31 July 2026 and delivery of the estate account. Credit for observing that the two lifetime transfers have consumed the whole nil rate band, so the estate gets none of it (1 mark).",
  ],
}

const Q09: WrittenQuestion = {
  id: "TXW-09",
  paper: "TX",
  area: "F",
  chapter: "TX-26",
  topic: "VAT registration, the two tests and the recovery of pre-registration input tax",
  maxMarks: 10,
  stem:
    "Marit Dahl began trading on 1 June 2025, making wholly standard-rated supplies to VAT-registered business customers. Her taxable turnover, excluding VAT, was:\n\n  June 2025        £18,000        October 2025    £31,000\n  July 2025        £21,000        November 2025   £34,000\n  August 2025      £24,000        December 2025   £36,000\n  September 2025   £27,000\n\nBefore trading began Marit bought equipment for £14,400 including VAT in March 2025, which she still uses in the business, and paid £3,600 including VAT for legal and accountancy advice in April 2025.\n\nIn January 2026 Marit signs a contract to supply a single customer £120,000 of goods during February 2026.\n\nRequired:\n\n(a) Determine the date from which Marit was required to register for VAT under the HISTORIC test, stating the notification deadline. (4 marks)\n\n(b) Explain how the FUTURE PROSPECTS test would have applied to the January 2026 contract, and how the resulting registration date differs. (3 marks)\n\n(c) Calculate the pre-registration input VAT Marit may recover, and explain whether voluntary registration would have been worthwhile before the threshold was reached. (3 marks)",
  rubric: [
    "(a) Tests cumulative taxable turnover at each month end. At 30 September 2025 the cumulative figure was £90,000 (£18,000 + £21,000 + £24,000 + £27,000), which does not EXCEED £90,000 (2 marks).",
    "(a) At 31 October 2025 the cumulative figure was £121,000, which exceeds £90,000 — so October 2025 is the relevant month (1 mark).",
    "(a) Notify HMRC within 30 days of the end of that month, so by 30 November 2025, and registration takes effect from the first day of the SECOND month after it — 1 December 2025 (1 mark).",
    "(b) The future prospects test applies where taxable turnover is expected to exceed £90,000 in the NEXT 30 DAYS ALONE. The £120,000 February contract meets it (1 mark).",
    "(b) Notification must be made BEFORE the end of that 30-day period, and registration takes effect from the START of it — so registration would be effectively immediate rather than deferred (1 mark).",
    "(b) Contrasts the two: the historic test gives up to two months of grace from the same £90,000 threshold, whereas the future test gives none. Marit is already registered from 1 December 2025 in this case, so the February contract changes nothing — credit for saying so rather than registering her twice (1 mark).",
    "(c) Equipment: goods bought within 4 YEARS before registration and still held and used in the business, so recoverable. £14,400 × 20/120 = £2,400 (1 mark).",
    "(c) Legal and accountancy advice: services supplied within 6 MONTHS before registration. April 2025 is within six months of 1 December 2025, so recoverable: £3,600 × 20/120 = £600. Total pre-registration input VAT £3,000 (1 mark).",
    "(c) Voluntary registration WOULD have been worthwhile. Marit's customers are VAT-registered, so they reclaim any VAT she charges and her prices to them are effectively unchanged — while she would have recovered input VAT on her own costs from the start. Credit for the contrast: had her customers been the public, registration would have effectively raised her prices by 20% or absorbed the VAT out of margin (1 mark).",
    "No credit for using the 20% rate on the VAT-INCLUSIVE pre-registration figures, which would give £2,880 and £720 — reading inclusive against exclusive is where most VAT marks are lost.",
  ],
}

export const TX_WRITTEN_KIT2: WrittenQuestion[] = [Q07, Q08, Q09]
