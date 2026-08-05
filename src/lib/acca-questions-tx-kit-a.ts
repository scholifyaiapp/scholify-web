import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-tx-kit-builders"

/*
 * TX-UK · Area A question kit — chapters 1 to 3.
 *
 * The UK tax system and ethics, administration for individuals, administration for
 * companies. Around ten marks of every sitting, and the cheapest marks in the paper: the
 * dates and penalties are stated facts and the ethics sequence is fixed.
 *
 * Numeric entry is used for every date-driven or penalty computation, because those are
 * exactly the figures a candidate can guess from four options. MCQ carries the treatment
 * and sequence questions — what a source of law is worth, what an adviser must not do.
 *
 * Authored, applied, exam-standard at TX's uniform 2 marks, on the FA2025 basis.
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 1 · The UK tax system ── */

const CH01: AccaQuestion[] = [
  q("TXK-01-01", "TX-01", "A", "easy",
    "Which of these is an INDIRECT tax?",
    ["Corporation tax", "Value added tax", "Capital gains tax", "Inheritance tax"],
    1,
    "VALUE ADDED TAX. It is collected by the trader but borne by the final consumer, which is what makes it indirect. The other three are all direct taxes, charged on and borne by the same person."),

  q("TXK-01-02", "TX-01", "A", "easy",
    "Why do companies pay no capital gains tax?",
    [
      "Companies are exempt from tax on gains",
      "Corporation tax charges a company's chargeable gains alongside its income in one computation",
      "A company's gains are taxed as trading profits",
      "Gains are only taxed when distributed",
    ],
    1,
    "CORPORATION TAX CHARGES BOTH TOGETHER. A company's chargeable gains enter taxable total profits with its income and are taxed at the corporation tax rate. They are not exempt and they are not trading profits."),

  q("TXK-01-03", "TX-01", "A", "medium",
    "What is the status of HMRC's published manuals and statements of practice?",
    [
      "They are statutory instruments with the force of law",
      "They state HMRC's view of the law and are not law; a tribunal may take a different view",
      "They bind the taxpayer but not HMRC",
      "They override case law where they are more recent",
    ],
    1,
    "THEY ARE HMRC'S VIEW, NOT LAW. The hierarchy is Acts as amended by the annual Finance Act, then statutory instruments, then case law, then HMRC guidance. A taxpayer may argue a different interpretation and a tribunal may accept it."),

  q("TXK-01-04", "TX-01", "A", "medium",
    "Which statement about tax avoidance is most accurate?",
    [
      "It is illegal and attracts penalties of up to 100% of the tax",
      "It is legal, but runs on a spectrum from what Parliament intended to arrangements the GAAR can counteract",
      "It is legal and therefore always acceptable",
      "It is the same as tax evasion in substance",
    ],
    1,
    "LEGAL, BUT ON A SPECTRUM. Using an ISA is exactly what Parliament intended; an artificial series of transactions with no purpose beyond a tax advantage sits at the far end, and the General Anti-Abuse Rule exists to counteract abusive arrangements even where each step complies with the letter of the law."),

  q("TXK-01-05", "TX-01", "A", "hard",
    "A client refuses to correct a deliberate omission from a previous tax return. Which action would be a criminal offence?",
    [
      "Ceasing to act for the client",
      "Telling the client that you have made a money laundering report",
      "Reporting to your firm's Money Laundering Reporting Officer",
      "Advising the client of the penalties for a deliberate error",
    ],
    1,
    "TELLING THE CLIENT ABOUT THE REPORT IS TIPPING OFF, a separate criminal offence. The correct sequence is to advise disclosure, cease to act if refused, and report internally or to the NCA — without informing the client and without disclosing their affairs to HMRC."),

  q("TXK-01-06", "TX-01", "A", "hard",
    "Having resigned from an engagement because a client would not correct a deliberate error, what may you tell HMRC?",
    [
      "The full circumstances, since a criminal offence is involved",
      "Only that you no longer act — client confidentiality prevents disclosing why, absent consent or a legal obligation",
      "Nothing at all, including the fact of resignation",
      "Whatever HMRC requests once it opens an enquiry",
    ],
    1,
    "ONLY THAT YOU NO LONGER ACT. Confidentiality survives the end of the engagement, so the reason cannot be disclosed without the client's consent or a legal duty. The money laundering report is the route the law provides for the information to reach the authorities."),

  multi("TXK-01-07", "TX-01", "A", "medium",
    "Which of these are CAPITAL taxes? Select TWO.",
    ["Income tax", "Capital gains tax", "National insurance", "Inheritance tax"],
    [1, 3],
    "CAPITAL GAINS TAX and INHERITANCE TAX. A capital tax is charged on wealth or on gains from disposing of it. Income tax and national insurance are revenue taxes, charged on income and earnings."),

  q("TXK-01-08", "TX-01", "A", "medium",
    "Which fundamental principle is most directly at risk where a firm acts for both parties to a transaction?",
    ["Integrity", "Objectivity", "Confidentiality", "Professional competence and due care"],
    1,
    "OBJECTIVITY. It requires that bias, conflict of interest or undue influence do not override professional judgement, and acting for both sides creates exactly that conflict. Confidentiality is a related but separate concern about information flow between the two engagements."),

  q("TXK-01-09", "TX-01", "A", "medium",
    "Which is an example of the UK tax system pursuing an ENVIRONMENTAL objective?",
    [
      "The personal allowance",
      "Grading company car benefit percentages and capital allowance rates by CO2 emissions",
      "The transferable personal allowance for spouses",
      "Gift aid relief on charitable donations",
    ],
    1,
    "CO2-GRADED CAR BENEFITS AND CAPITAL ALLOWANCES. Both price the externality directly, giving a lower charge and faster relief for lower-emission vehicles. Gift aid is a social objective and the allowances are about ability to pay."),

  q("TXK-01-10", "TX-01", "A", "hard",
    "Which of these is the correct first step on discovering that a client's return may contain an error?",
    [
      "Report to the National Crime Agency",
      "Establish the facts — confirm whether an error exists and whether it was deliberate",
      "Cease to act immediately",
      "Notify HMRC that the return is incorrect",
    ],
    1,
    "ESTABLISH THE FACTS. An ethics answer that jumps to reporting or resignation before confirming what happened loses marks and, in practice, risks acting on an assumption. Only once the facts and the behaviour are established do the later steps follow."),

  q("TXK-01-11", "TX-01", "A", "easy",
    "Which body hears an appeal against an HMRC decision on a point of law, after the First-tier Tribunal?",
    ["The Supreme Court", "The Upper Tribunal", "HMRC's internal review team", "The Court of Session"],
    1,
    "THE UPPER TRIBUNAL. The route is internal review or the First-tier Tribunal, then the Upper Tribunal on a point of law, then the Court of Appeal and the Supreme Court."),

  q("TXK-01-12", "TX-01", "A", "medium",
    "On which basis is TX examined, and what does that mean for a rate a candidate remembers from a previous year?",
    [
      "The current tax year at the date of the exam, so recent rates apply",
      "A stated Finance Act — currently FA2025 — so a rate from an earlier year is simply wrong",
      "Whichever Finance Act the question specifies for each requirement",
      "The rates are always supplied, so the basis does not matter",
    ],
    1,
    "A STATED FINANCE ACT, currently FA2025 for 2025/26. A rate remembered from an earlier year is wrong even if it was right then — the annual exempt amount, the CGT rates, business asset disposal relief and employer NIC have all moved recently. Most figures ARE supplied on the rate sheet, which is the practical answer to the risk."),
]

/* ── Chapter 2 · Administration for individuals ── */

const CH02: AccaQuestion[] = [
  q("TXK-02-01", "TX-02", "A", "easy",
    "By when must an ELECTRONIC self assessment return for 2025/26 be filed?",
    ["31 October 2026", "31 January 2027", "5 April 2027", "31 July 2026"],
    1,
    "31 JANUARY 2027. Electronic returns are due by 31 January following the tax year; PAPER returns are due three months earlier, by 31 October 2026. Both deadlines extend to three months from a late notice to file."),

  num("TXK-02-02", "TX-02", "A", "medium",
    "For 2024/25 a taxpayer's income tax liability was £19,600 and Class 4 NIC £3,200, with £4,800 deducted at source. What is EACH payment on account for 2025/26, in £?",
    9000, "£", 1,
    "Relevant amount = £19,600 + £3,200 − £4,800 = £18,000, and each payment on account is 50% = £9,000, due 31 January 2026 and 31 July 2026."),

  num("TXK-02-03", "TX-02", "A", "medium",
    "A taxpayer's 2025/26 liability is income tax £21,400, Class 4 NIC £3,600, tax deducted at source £4,800 and capital gains tax £7,200. Payments on account of £9,000 each were made. What is the balancing payment, in £?",
    9400, "£", 1,
    "Total due = £21,400 + £3,600 − £4,800 + £7,200 = £27,400, less the £18,000 paid on account = £9,400, due 31 January 2027. The whole of the £7,200 CGT falls into the balancing payment, because CGT is excluded from the payments on account entirely."),

  q("TXK-02-04", "TX-02", "A", "medium",
    "When are payments on account NOT required?",
    [
      "Where the taxpayer is employed",
      "Where the relevant amount is under £1,000, or more than 80% of the previous year's liability was met at source",
      "Where capital gains tax is due",
      "Where the taxpayer files electronically",
    ],
    1,
    "UNDER £1,000, OR OVER 80% MET AT SOURCE. Those two exceptions are why most employees never make payments on account — PAYE already collects the great majority of their liability."),

  num("TXK-02-05", "TX-02", "A", "hard",
    "A 2025/26 return is filed 7 months late and £4,000 of tax is outstanding. What is the total LATE FILING penalty, in £?",
    1300, "£", 1,
    "The penalties are CUMULATIVE: £100 fixed from day one, plus £10 a day for 90 days = £900 once over 3 months, plus the greater of 5% of £4,000 (£200) and £300 once over 6 months. Total £1,300."),

  num("TXK-02-06", "TX-02", "A", "medium",
    "A taxpayer makes an unprompted disclosure of a DELIBERATE but not concealed error understating tax by £22,000. What is the minimum penalty, in £?",
    4400, "£", 1,
    "The minimum for an unprompted disclosure of deliberate-but-not-concealed behaviour is 20%: £22,000 × 20% = £4,400. The maximum is 70%, and a PROMPTED disclosure has a 35% minimum — so disclosing first saves at least £3,300 here."),

  q("TXK-02-07", "TX-02", "A", "hard",
    "Which behaviour attracts a maximum penalty of 100% of the tax understated?",
    ["Careless", "Deliberate but not concealed", "Deliberate and concealed", "Reasonable care taken"],
    2,
    "DELIBERATE AND CONCEALED. Concealment is a separate and additional finding on top of deliberateness: deliberate alone caps at 70%, careless at 30%, and no penalty arises where reasonable care was taken. Reading 'deliberate' and jumping to 100% is the standard error."),

  q("TXK-02-08", "TX-02", "A", "medium",
    "Which charge applies to a payment on account made late?",
    [
      "A 5% penalty after 30 days",
      "Interest only — the 5% late payment penalties apply to the balancing payment and CGT",
      "Both interest and a 5% penalty",
      "Neither, provided the balancing payment is on time",
    ],
    1,
    "INTEREST ONLY. The 5% penalties at 30 days, 6 months and 12 months apply to the balancing payment and to capital gains tax. Interest runs on everything paid late, currently at 8.50% on underpaid tax."),

  num("TXK-02-09", "TX-02", "A", "medium",
    "For how many years after 31 January following the tax year must a taxpayer IN BUSINESS keep their records?",
    5, "years", 0.01,
    "Five years from 31 January following the tax year — so 31 January 2032 for 2025/26. A taxpayer NOT in business keeps records for one year from that date."),

  q("TXK-02-10", "TX-02", "A", "hard",
    "Within what period may HMRC open an enquiry into a return filed on time?",
    [
      "12 months from the filing DUE date",
      "12 months from the ACTUAL date of filing",
      "4 years from the end of the tax year",
      "Any time, provided the taxpayer is notified",
    ],
    1,
    "12 MONTHS FROM ACTUAL FILING. Filing early therefore closes the enquiry window earlier. Outside that window HMRC needs a discovery assessment, with limits of 4 years normally, 6 where the loss of tax was careless and 20 where it was deliberate."),

  q("TXK-02-11", "TX-02", "A", "medium",
    "A taxpayer claims to reduce their payments on account and the eventual liability proves higher. What follows?",
    [
      "Nothing, provided the balancing payment covers the shortfall",
      "Interest runs on the shortfall from the ORIGINAL due dates, and a penalty may apply if the claim was fraudulent or negligent",
      "A flat £100 penalty",
      "The reduction is disallowed and the original amounts become due immediately",
    ],
    1,
    "INTEREST FROM THE ORIGINAL DUE DATES, plus a possible penalty. So the reduction is a cash-flow benefit taken at the taxpayer's risk, and a claim made fraudulently or negligently can be penalised up to the difference between the reduced and correct amounts."),

  q("TXK-02-12", "TX-02", "A", "medium",
    "HMRC issues a determination of tax due because no return was filed. How can it be challenged?",
    [
      "By appealing within 30 days",
      "It cannot be appealed — it is displaced only by filing the actual return",
      "By requesting an internal review",
      "By applying to the First-tier Tribunal",
    ],
    1,
    "ONLY BY FILING THE RETURN. A determination is not appealable; submitting the actual return replaces it. HMRC may issue one within three years of the filing date."),
]

/* ── Chapter 3 · Administration for companies ── */

const CH03: AccaQuestion[] = [
  q("TXK-03-01", "TX-03", "A", "medium",
    "A company's accounting period ends on 31 December 2025 and it is not large. When are its tax and its return due?",
    [
      "Both on 31 December 2026",
      "Tax on 1 October 2026 and the return by 31 December 2026",
      "Tax on 31 December 2026 and the return by 1 October 2026",
      "Both on 1 October 2026",
    ],
    1,
    "TAX 1 OCTOBER 2026, RETURN 31 DECEMBER 2026. Payment falls 9 months and 1 day after the period end but the return is not due for 12 months — so the company must estimate and pay three months before it files."),

  q("TXK-03-02", "TX-03", "A", "easy",
    "Within what period must a company notify HMRC that it has started to trade?",
    ["30 days", "3 months", "6 months", "12 months"],
    1,
    "THREE MONTHS of starting to trade. Contrast the VAT registration notification, which is within 30 days of the end of the month in which the threshold was exceeded."),

  num("TXK-03-03", "TX-03", "A", "medium",
    "A company has taxable total profits of £1,340,000 and received £90,000 of dividends from a 7% holding. What are its augmented profits, in £?",
    1430000, "£", 1,
    "£1,340,000 + £90,000 = £1,430,000. Dividends from a NON-group company are added to TTP to give augmented profits, even though they are exempt. Dividends from a 51% group company would be excluded."),

  q("TXK-03-04", "TX-03", "A", "hard",
    "A company has augmented profits of £1,430,000 and two 51% group companies including itself. Is it large for quarterly instalment purposes?",
    [
      "No — £1,430,000 is below the £1,500,000 threshold",
      "Yes — the threshold is divided by the two group companies to £750,000, which £1,430,000 exceeds",
      "No, because dividends are exempt",
      "Only if it was large in the previous period",
    ],
    1,
    "YES. The £1,500,000 threshold is divided by the number of 51% group companies including the company itself, giving £750,000. Testing £1,430,000 against the undivided £1,500,000 is the error the question exists to catch."),

  num("TXK-03-05", "TX-03", "A", "medium",
    "A large company's estimated corporation tax liability for a 12-month period is £360,000. What is each quarterly instalment, in £?",
    90000, "£", 1,
    "£360,000/4 = £90,000. Note the instalments are based on the company's own ESTIMATE, made before the period has ended, which is why an under-estimate attracts interest from each instalment date."),

  q("TXK-03-06", "TX-03", "A", "hard",
    "A large company's accounting period runs from 1 April 2025 to 31 March 2026. When is the FIRST quarterly instalment due?",
    ["14 July 2025", "14 October 2025", "1 January 2026", "14 January 2026"],
    1,
    "14 OCTOBER 2025 — the 14th day of the 7th month after the START of the accounting period. The four instalments then fall on the 14th of months 7, 10, 13 and 16 from the start, so 14 Oct 2025, 14 Jan 2026, 14 Apr 2026 and 14 Jul 2026."),

  multi("TXK-03-07", "TX-03", "A", "medium",
    "Which exemptions relieve a company from paying by quarterly instalments? Select TWO.",
    [
      "The first year in which it becomes large, provided augmented profits do not exceed £10 million",
      "Where it has no associated companies",
      "Where its corporation tax liability is under £10,000",
      "Where its accounting period is under 12 months",
    ],
    [0, 2],
    "THE FIRST YEAR OF BEING LARGE (subject to the £10 million ceiling) and a LIABILITY UNDER £10,000. Neither the number of associates nor a short period removes the obligation — a short period simply changes the instalment dates."),

  num("TXK-03-08", "TX-03", "A", "easy",
    "For how many years from the end of the accounting period must a company keep its records?",
    6, "years", 0.01,
    "Six years from the end of the accounting period. Contrast an individual in business, who keeps records for five years from 31 January following the tax year."),

  q("TXK-03-09", "TX-03", "A", "medium",
    "How is interest on late-paid corporation tax treated in a company's computation?",
    [
      "Disallowed, as it is for an individual",
      "As a non-trading loan relationship debit, so it enters the computation",
      "Deducted from trading profit",
      "Added to the corporation tax liability",
    ],
    1,
    "A LOAN RELATIONSHIP DEBIT. Interest paid and received on tax is a non-trading loan relationship item for a company, so it is effectively deductible. For an individual the equivalent interest is simply not deductible — a difference that is regularly examined."),

  q("TXK-03-10", "TX-03", "A", "medium",
    "Within what period may a company amend its corporation tax return?",
    ["30 days of filing", "12 months of the filing date", "4 years of the period end", "It cannot amend once filed"],
    1,
    "12 MONTHS OF THE FILING DATE — so a return for the year ended 31 December 2025, due 31 December 2026, may be amended until 31 December 2027. This matters because tax is paid before the return is filed, so a revision is often needed."),

  q("TXK-03-11", "TX-03", "A", "hard",
    "A company files its corporation tax return 8 months late with £50,000 of tax outstanding at that point. Which penalties apply?",
    [
      "£100 only",
      "£200 in fixed penalties plus 10% of the tax outstanding",
      "£100 plus 20% of the tax outstanding",
      "£1,000 plus 5% of the tax",
    ],
    1,
    "£200 FIXED PLUS 10%. A company incurs £100 for being up to 3 months late and a further £100 for 3 to 6 months, then an additional 10% of the tax outstanding once more than 6 months late — rising to 20% beyond 12 months. The fixed amounts rise to £500 each for a third consecutive late return."),

  q("TXK-03-12", "TX-03", "A", "medium",
    "Which statement about a company's error penalties is correct?",
    [
      "They are lower than an individual's because a company has no personal allowance",
      "The percentages are identical to an individual's — 100/30/50, 70/20/35 and 30/0/15 by behaviour",
      "A company cannot be penalised for a careless error",
      "The maximum is 50% of the tax understated",
    ],
    1,
    "IDENTICAL TO AN INDIVIDUAL'S. Deliberate and concealed 100% maximum, deliberate but not concealed 70%, careless 30%, and no penalty where reasonable care was taken — so learning one table serves both halves of the syllabus."),
]

export const TX_KIT_AREA_A: AccaQuestion[] = [...CH01, ...CH02, ...CH03]
