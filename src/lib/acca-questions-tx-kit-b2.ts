import type { AccaQuestion } from "@/lib/acca-content"
import { q, multi, num } from "@/lib/acca-tx-kit-builders"

/*
 * TX-UK · Area B question kit, second part — chapters 7 to 9.
 *
 * Employment income and deductions, benefits, and pensions.
 *
 * The benefit questions deliberately include the two figures the exam does NOT supply — the
 * 4% diesel supplement and the 37% cap — because those are the only car benefit facts worth
 * memorising and the only ones a candidate can get wrong without the rate sheet saving them.
 *
 * Nothing here applies an excluded topic: no termination payment rule, no optional
 * remuneration arrangements, no share incentive schemes, and no car benefit for a car below
 * 50 g/km that is neither electric nor hybrid.
 *
 * Authored, applied, exam-standard at TX's uniform 2 marks, on the FA2025 basis.
 */

/* ── Chapter 7 · Employment income and deductions ── */

const CH07: AccaQuestion[] = [
  q("TXK-07-01", "TX-07", "B", "medium",
    "Which factor points most strongly towards SELF-employment?",
    [
      "The worker is paid a regular monthly wage",
      "The worker has a genuine right to send a substitute to do the work",
      "The engager provides all the equipment",
      "The worker has a job title and receives staff benefits",
    ],
    1,
    "THE RIGHT OF SUBSTITUTION. A contract of employment is personal, so a genuine right to send someone else is a strong indicator of self-employment. The other three all point to employment — and no single factor is decisive, since the courts weigh the overall picture."),

  q("TXK-07-02", "TX-07", "B", "hard",
    "Why does an engager prefer a worker to be self-employed?",
    [
      "The worker pays more tax, so HMRC is satisfied",
      "It avoids employer's Class 1 NIC at 15% with no upper limit, and removes the PAYE and benefits obligations",
      "Self-employed workers cannot claim expenses",
      "It removes the need to pay the worker regularly",
    ],
    1,
    "IT AVOIDS EMPLOYER'S CLASS 1 AT 15%. The employer's charge has no upper limit, so on a substantial salary it is a large sum, and PAYE administration and benefit reporting go with it. That saving is exactly why HMRC challenges status."),

  q("TXK-07-03", "TX-07", "B", "medium",
    "When is employment income taxed?",
    [
      "When it is paid",
      "In the tax year of the EARLIER of receipt and entitlement",
      "When the employer's accounting period ends",
      "In the year the work was performed",
    ],
    1,
    "THE EARLIER OF RECEIPT AND ENTITLEMENT. So a bonus a person became entitled to in March but was paid in May is taxed in the earlier tax year. Directors have additional rules, because they can influence when they are paid."),

  q("TXK-07-04", "TX-07", "B", "hard",
    "What is the test for an allowable deduction from employment income?",
    [
      "Wholly and exclusively for the purposes of the employment",
      "Wholly, exclusively AND NECESSARILY in the performance of the duties",
      "Reasonably incurred in connection with the employment",
      "Approved in advance by the employer",
    ],
    1,
    "WHOLLY, EXCLUSIVELY AND NECESSARILY IN THE PERFORMANCE OF THE DUTIES. All four elements bite, and it is far stricter than the trader's 'wholly and exclusively'. 'Necessarily' means the duties could not be performed without it, and 'in the performance of' excludes anything that merely puts the employee in a position to do the job."),

  multi("TXK-07-05", "TX-07", "B", "medium",
    "Which of these are allowable deductions from employment income? Select TWO.",
    [
      "Travel from home to a permanent workplace",
      "Contributions to the employer's occupational pension scheme",
      "Training to obtain a new professional qualification",
      "A professional subscription to an approved body relevant to the duties",
    ],
    [1, 3],
    "OCCUPATIONAL PENSION CONTRIBUTIONS and RELEVANT PROFESSIONAL SUBSCRIPTIONS. Ordinary commuting is never deductible, and training for a NEW qualification fails 'in the performance of the duties' — it puts the employee in a position to perform them."),

  num("TXK-07-06", "TX-07", "B", "medium",
    "An employee drives 13,000 business miles using their own car. What is the approved mileage amount, in £?",
    5250, "£", 1,
    "(10,000 × 45p) + (3,000 × 25p) = £4,500 + £750 = £5,250. The 10,000-mile threshold applies per employment per tax year, and only BUSINESS miles count."),

  num("TXK-07-07", "TX-07", "B", "hard",
    "An employee drives 13,000 business miles and is reimbursed at 30p a mile. What is the allowable DEDUCTION, in £?",
    1350, "£", 1,
    "Approved amount £5,250 against £3,900 actually paid (13,000 × 30p), so the employee was under-reimbursed by £1,350 — which is a positive DEDUCTION, not merely an absence of tax. Relief works in both directions, and this is the half candidates forget."),

  num("TXK-07-08", "TX-07", "B", "medium",
    "The same employee is instead reimbursed at 50p a mile for 13,000 business miles. What is the TAXABLE amount, in £?",
    1250, "£", 1,
    "13,000 × 50p = £6,500 against an approved amount of £5,250, so the £1,250 excess is taxable employment income. The same comparison answers both directions — only the sign changes."),

  q("TXK-07-09", "TX-07", "B", "medium",
    "By when must an employer submit form P11D reporting an employee's benefits?",
    ["31 May", "6 July", "31 January", "22 July"],
    1,
    "6 JULY following the end of the tax year. Form P60, the year-end summary for the employee, is due by 31 May. The employer's Class 1A NIC on those benefits is payable by 22 July."),

  q("TXK-07-10", "TX-07", "B", "medium",
    "Under real time information, when must an employer report a payment of earnings to HMRC?",
    [
      "By 19 May after the tax year",
      "On or before the date the payment is made",
      "Within 14 days of the month end",
      "Quarterly",
    ],
    1,
    "ON OR BEFORE THE DATE OF PAYMENT. That is the whole point of real time information — reporting moved from an annual return to a per-payment obligation. The PAYE and NIC themselves are payable by the 22nd of the following month if paid electronically."),

  q("TXK-07-11", "TX-07", "B", "hard",
    "Which travel expense IS deductible?",
    [
      "Home to a permanent office",
      "Travel between two workplaces of the same employer",
      "Home to a temporary workplace attended for the whole of a two-year secondment",
      "The cost of relocating closer to the office",
    ],
    1,
    "TRAVEL BETWEEN TWO WORKPLACES OF THE SAME EMPLOYER. Ordinary commuting to a permanent workplace is never allowable, and a workplace attended for the whole of a long secondment is treated as permanent rather than temporary."),

  q("TXK-07-12", "TX-07", "B", "medium",
    "A director's bonus is determined in March 2026 and paid in June 2026. When is it taxed?",
    [
      "2026/27, the year of payment",
      "2025/26 — the additional director rules bring it into charge at the earliest of the relevant dates, including the period end where the amount was determined before it",
      "Split between the two years",
      "When it is credited to the director's loan account, whenever that is",
    ],
    1,
    "2025/26. The director rules exist because a director can influence when they are paid, so the legislation takes the earliest of several dates — including the date the amount was determined. An ordinary employee would be taxed on the earlier of receipt and entitlement."),
]

/* ── Chapter 8 · Benefits ── */

const CH08: AccaQuestion[] = [
  num("TXK-08-01", "TX-08", "B", "medium",
    "A petrol car has CO2 emissions of 137 g/km. What is the appropriate percentage?",
    33, "%", 0.01,
    "Round emissions DOWN to the nearest 5, giving 135 g/km. The base level of 55 g/km carries 17%, and (135 − 55)/5 = 16 further increments of 1%, so 17% + 16% = 33%. Rounding up, or not rounding at all, is the commonest error in the topic."),

  num("TXK-08-02", "TX-08", "B", "medium",
    "A petrol car with a list price of £41,000 has an appropriate percentage of 33% and was available all year. What is the car benefit, in £?",
    13530, "£", 1,
    "£41,000 × 33% = £13,530. Deduct any capital contribution by the employee from the list price first, up to a maximum of £5,000."),

  num("TXK-08-03", "TX-08", "B", "medium",
    "The same car's employer also pays for all private fuel. What is the fuel benefit, in £?",
    9306, "£", 1,
    "£28,200 × 33% = £9,306. The fuel benefit uses the same appropriate percentage but the FIXED £28,200 base figure, not the list price — so it is unaffected by how expensive the car is or how much fuel was actually provided."),

  q("TXK-08-04", "TX-08", "B", "hard",
    "A diesel car not meeting the RDE2 standard has emissions giving a base percentage of 33%. What percentage applies?",
    ["33%", "37%", "35%", "29%"],
    1,
    "37%. Add the 4% diesel supplement for a car not meeting RDE2. Note the 4% supplement and the 37% cap are NOT on the exam's rate sheet — they are among the very few car benefit figures a candidate must actually know."),

  q("TXK-08-05", "TX-08", "B", "hard",
    "A petrol car has emissions of 182 g/km. What is the appropriate percentage?",
    ["42%", "37%", "40%", "34%"],
    1,
    "37%, THE CAP. Rounding 182 down gives 180, and (180 − 55)/5 = 25 increments on top of 17% would give 42% — but the maximum is 37%. The cap is not on the rate sheet, so a candidate who does not know it produces 42% and loses the mark."),

  q("TXK-08-06", "TX-08", "B", "medium",
    "An employee reimburses their employer for HALF the cost of their private fuel. What is the effect on the fuel benefit?",
    [
      "It is halved",
      "None — only FULL reimbursement of private fuel removes the charge",
      "It is removed entirely",
      "It is reduced by the amount reimbursed",
    ],
    1,
    "NONE AT ALL. Unlike almost every other benefit, the fuel charge is reduced only where the employee reimburses the FULL cost of private fuel — in which case there is no benefit. Partial reimbursement achieves nothing, which is why employees are advised to reimburse in full or not at all."),

  num("TXK-08-07", "TX-08", "B", "hard",
    "An employer bought a house for £390,000 and spent £30,000 on an extension two years ago. Its annual value is £6,200 and the official rate of interest is 3.75%. The accommodation is not job-related and the employer has owned it for four years. What is the total benefit, in £?",
    19137.5, "£", 1,
    "Basic charge: the higher of the £6,200 annual value and rent paid by the employer, which is nil = £6,200. Cost of providing = £390,000 + £30,000 improvements completed before the tax year = £420,000. Expensive accommodation charge = (£420,000 − £75,000) × 3.75% = £12,937.50. Total £19,137.50. Use COST because the employer first provided it within six years of acquiring it."),

  num("TXK-08-08", "TX-08", "B", "medium",
    "An employee has an interest-free loan of £30,000 from their employer and pays £450 of interest. The official rate is 3.75%. What is the taxable benefit, in £?",
    675, "£", 1,
    "(£30,000 × 3.75%) − £450 = £1,125 − £450 = £675. Note that loans totalling £10,000 or less throughout the year are entirely EXEMPT, so a £9,800 loan would give no benefit at all."),

  num("TXK-08-09", "TX-08", "B", "medium",
    "An employer provides a computer with a market value of £5,400 for the employee's private use, first made available on 6 August 2025. What is the benefit for 2025/26, in £?",
    720, "£", 1,
    "20% of the market value when FIRST PROVIDED, time-apportioned: £5,400 × 20% × 8/12 = £720. The 20% applies to the value at first provision, not to a later or current value."),

  multi("TXK-08-10", "TX-08", "B", "medium",
    "Which of these are EXEMPT benefits? Select TWO.",
    [
      "A second mobile phone",
      "One mobile phone per employee",
      "Payment of the employee's gym subscription",
      "Workplace parking",
    ],
    [1, 3],
    "ONE MOBILE PHONE and WORKPLACE PARKING. A SECOND phone is taxable, and a gym subscription paid by the employer is taxable on its cost to the employer. Other exemptions include trivial benefits to £50, staff entertaining to £150 a head, and job-related accommodation."),

  q("TXK-08-11", "TX-08", "B", "medium",
    "What rate of employer's national insurance applies to taxable benefits for 2025/26, and when is it due?",
    [
      "8%, due by 22 July",
      "15% Class 1A, due by 22 July following the tax year",
      "15% Class 1 primary, collected through PAYE",
      "13.8%, due by 31 January",
    ],
    1,
    "CLASS 1A AT 15%, DUE BY 22 JULY. It falls on the employer alone — benefits carry no employee Class 1 at all, because Class 1 is charged on cash earnings only. Mentioning the employer's cost earns marks in a written answer."),

  q("TXK-08-12", "TX-08", "B", "hard",
    "A staff Christmas party costs £158 per head. What is the taxable benefit?",
    [
      "Nil — it is under the £150 exemption",
      "£8 per head, the excess over £150",
      "The whole £158 per head, because the exemption is an exempt AMOUNT and exceeding it forfeits all of it",
      "£150 per head",
    ],
    2,
    "THE WHOLE £158. The £150 per head annual limit is an exempt AMOUNT, not a deduction — exceed it by a pound and the entire cost becomes taxable. That all-or-nothing structure is exactly like the small gifts exemption in inheritance tax."),
]

/* ── Chapter 9 · Pensions ── */

const CH09: AccaQuestion[] = [
  num("TXK-09-01", "TX-09", "B", "medium",
    "An individual has £180,000 of dividend income and no earnings. What is the maximum GROSS pension contribution attracting tax relief, in £?",
    3600, "£", 1,
    "£3,600 — relief is limited to the higher of £3,600 and RELEVANT EARNINGS, meaning employment income and trading profits only. Dividends, savings and property income are not relevant earnings, so the £3,600 floor is all that is available."),

  num("TXK-09-02", "TX-09", "B", "hard",
    "An individual's adjusted income for 2025/26 is £290,000. What is their annual allowance, in £?",
    45000, "£", 1,
    "The reduction is (£290,000 − £260,000) × 50% = £15,000, so the allowance is £60,000 − £15,000 = £45,000. Note the £200,000 threshold income test is an EXCLUDED topic in TX, so apply the taper on adjusted income alone."),

  num("TXK-09-03", "TX-09", "B", "hard",
    "An individual's adjusted income is £380,000. What is their annual allowance, in £?",
    10000, "£", 1,
    "The reduction would be (£380,000 − £260,000) × 50% = £60,000, which would extinguish the allowance — but it is floored at £10,000. The taper bottoms out at an adjusted income of £360,000."),

  q("TXK-09-04", "TX-09", "B", "medium",
    "In what order is the annual allowance used?",
    [
      "Brought forward amounts first, earliest year first",
      "The current year's allowance first, then brought forward amounts earliest year first",
      "Brought forward amounts first, latest year first",
      "In whichever order minimises the charge",
    ],
    1,
    "CURRENT YEAR FIRST, THEN EARLIEST BROUGHT FORWARD. Unused allowance carries forward three years, and the individual must have been a scheme member in the year the allowance arose. Using brought-forward amounts first would waste them unnecessarily."),

  num("TXK-09-05", "TX-09", "B", "hard",
    "Contributions of £14,000 exceed the available annual allowance. The individual is an additional rate taxpayer. What is the annual allowance charge, in £?",
    6300, "£", 1,
    "£14,000 × 45% = £6,300. The excess is taxed as the TOP SLICE of income at non-savings rates — after all other income including dividends — so an additional rate taxpayer pays 45% on all of it."),

  q("TXK-09-06", "TX-09", "B", "medium",
    "What was the annual allowance for 2022/23, which may still be relevant to a carry forward?",
    ["£60,000", "£40,000", "£50,000", "£10,000"],
    1,
    "£40,000. The allowance rose to £60,000 from 2023/24, so a carry forward calculation reaching back to 2022/23 must use £40,000 for that year. Using £60,000 throughout overstates the allowance available by £20,000."),

  q("TXK-09-07", "TX-09", "B", "medium",
    "How is relief given for a contribution to an employer's OCCUPATIONAL scheme?",
    [
      "The contribution is paid net of 20% and the bands are extended",
      "Under a net pay arrangement — deducted from gross pay, giving full relief immediately",
      "By a tax reducer of 20%",
      "By deduction from total income after the personal allowance",
    ],
    1,
    "A NET PAY ARRANGEMENT. The contribution comes out of gross pay before PAYE, so full relief at the marginal rate is immediate and the employment income figure is stated AFTER it. A personal pension works differently: paid net of 20%, with the bands extended for higher rate relief."),

  q("TXK-09-08", "TX-09", "B", "hard",
    "Why is an employer pension contribution more efficient than paying the same amount as salary?",
    [
      "It is not taxable on the employer",
      "It is exempt on the employee, deductible for the employer, and escapes both employee and employer national insurance",
      "It does not count towards the annual allowance",
      "It attracts relief at 45% regardless of the employee's rate",
    ],
    1,
    "EXEMPT, DEDUCTIBLE, AND NO NIC ON EITHER SIDE. Salary of the same amount would carry 8% or 2% employee NIC and 15% employer NIC. Note the contribution DOES count towards the annual allowance, even though the employee is not paying it."),

  multi("TXK-09-09", "TX-09", "B", "medium",
    "Which of these count as relevant earnings for the pension relief limit? Select TWO.",
    ["Trading profits", "Property income", "Employment income", "Dividend income"],
    [0, 2],
    "TRADING PROFITS and EMPLOYMENT INCOME. Property, savings and dividend income are not relevant earnings, so a person whose income is entirely investment income can only get relief on £3,600 however much they contribute."),

  q("TXK-09-10", "TX-09", "B", "hard",
    "Why is a pension contribution particularly valuable at adjusted net income of £112,000?",
    [
      "The annual allowance is higher in that band",
      "It reduces adjusted net income and so restores personal allowance, where the effective marginal rate is 60%",
      "Contributions are uncapped at that level",
      "It converts income into a capital gain",
    ],
    1,
    "IT RESTORES PERSONAL ALLOWANCE AT AN EFFECTIVE 60%. Between £100,000 and £125,140 each £2 of income costs 80p of tax and withdraws £1 of allowance which is itself taxed. Reducing adjusted net income there gives relief well above the headline 40%."),

  q("TXK-09-11", "TX-09", "B", "medium",
    "By when must a pension contribution be paid to count for 2025/26?",
    ["31 January 2027", "5 April 2026", "31 July 2026", "6 April 2026"],
    1,
    "5 APRIL 2026 — the end of the tax year. There is no carry BACK of contributions, so a payment made on 6 April falls into the following year. Only unused ALLOWANCE carries forward, not contributions."),

  q("TXK-09-12", "TX-09", "B", "medium",
    "What happens to a contribution that exceeds the annual allowance?",
    [
      "The excess is repaid to the individual",
      "The excess stays in the pension but is taxed as the individual's top slice of income",
      "The excess is disallowed and relief is denied",
      "The scheme refuses the contribution",
    ],
    1,
    "IT STAYS IN THE PENSION AND IS TAXED. The annual allowance charge taxes the excess as the top slice of income at non-savings rates; the money is not returned and the contribution is not disallowed. The charge is collected through self assessment or, in some cases, from the fund itself."),
]

export const TX_KIT_AREA_B_PART2: AccaQuestion[] = [...CH07, ...CH08, ...CH09]
