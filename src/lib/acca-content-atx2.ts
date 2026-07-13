import type { AccaQuestion } from "@/lib/acca-content"

/*
 * ATX-UK (Advanced Taxation, P6) bank — wave S1 part A (areas A,B).
 *
 * Blueprint: Area A 35 + Area B 35 = 70 questions.
 *   Difficulty 19 easy / 32 medium / 19 hard.
 *   Type mix 45 mcq / 25 number. All marks = 2.
 *   Basis: UK FA2024/25. Authored 2026-07-13.
 *
 * NOTE: every computation below has been re-solved digit-by-digit before
 * writing, and every rate/threshold that a question turns on is RESTATED in
 * the stem, so items test METHOD not memory. Each mcq distractor encodes a
 * nameable student error that the explanation calls out by name.
 *
 * FA2024/25 figures used (restated per-question where relevant):
 *   - Personal allowance £12,570, tapered £1 per £2 of adjusted net income over £100,000
 *   - Basic rate band £37,700; higher rate to £125,140; gift aid & pensions extend the band (gross)
 *   - Pension annual allowance £60,000, tapered £1 per £2 of adjusted income over £260,000, min £10,000;
 *     3-year carry forward for scheme members
 *   - EIS income tax relief 30% (max £1m); SEIS 50% (max £200,000); VCT 30% (max £200,000)
 *   - Termination £30,000 exemption; PENP taxed in full as earnings
 *   - Remittance basis charge £30,000 (7 of 9 years) / £60,000 (12 of 14 years)
 *   - SRT: 183-day automatic UK test; leaver sufficient-ties day bands
 *   - NIC: Class 1 primary 8% (£12,570-£50,270) then 2%; Class 1A 13.8%; Class 4 6% then 2%;
 *     Class 2 treated-as-paid above small profits threshold £6,725
 *   - Share schemes: EMI (£250k, no IT on exercise at MV grant), CSOP (£60k, 3-yr hold),
 *     SAYE (up to 20% discount), SIP (free £3,600 / partnership £1,800, 5-yr hold)
 *   - CGT AEA £3,000; rates 10%/20% (residential 18%/24%); BADR & investors' relief 10%, £1m lifetime
 *   - CGT reliefs: gift holdover s165/s260, incorporation s162, rollover s152, PPR (last 9 months + deemed),
 *     letting relief max £40,000 (shared occupation)
 *   - IHT: NRB £325,000, RNRB £175,000 (tapered over £2m estate); death rate 40% / lifetime 20% (25% grossed);
 *     7-year cumulation; taper relief; BPR/APR; relevant property entry/principal(6%)/exit charges; QSR
 *
 * Every question is ORIGINAL (public ACCA syllabus only) with invented names/figures;
 * nothing is reproduced from ACCA/Kaplan/BPP materials.
 */

export const ATX_WAVE1A: AccaQuestion[] = [
  /* ═══════════════ Area A — Income tax & NIC (advanced) — 35 ═══════════════ */

  /* ── Employment vs self-employment & IR35 ── */
  {
    id: "ATX2-A-01", paper: "ATX", area: "A", type: "mcq",
    stem: "HMRC is reviewing whether Dolores is employed or self-employed. Which of the following factors most strongly points towards EMPLOYMENT rather than self-employment?",
    options: [
      "She must perform the services personally and cannot send a substitute in her place",
      "She provides her own major equipment and bears the financial risk of loss on each job",
      "She can increase her profit through the sound management of the task",
      "She must correct any unsatisfactory work in her own time and at her own expense",
    ],
    correct: 0,
    explanation: "An obligation of personal service (no right of substitution) is a classic badge of EMPLOYMENT. The other three are self-employment badges: providing own equipment/bearing loss, being able to profit from good management, and rectifying defective work at one's own cost all indicate a business run on one's own account.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-02", paper: "ATX", area: "A", type: "mcq",
    stem: "Bruno works through his own personal service company (PSC), providing services to a SMALL private-sector client. If engaged directly he would be an employee. Under the IR35 / off-payroll rules for a small private client, who must apply the rules and account for the deemed employment payment?",
    options: [
      "The end client, because it receives the services",
      "Bruno's own personal service company must apply IR35 and account for the deemed employment payment",
      "The employment agency in the labour-supply chain",
      "No one — IR35 never applies where the worker uses a company",
    ],
    correct: 1,
    explanation: "For a SMALL private-sector client the old rules (Chapter 8) still apply, so the PSC itself assesses IR35 and accounts for tax/NIC on the deemed payment. Shifting responsibility to the end client or agency is the Chapter-10 rule that applies only to public bodies and LARGE/medium private clients; and IR35 certainly can apply to PSC arrangements.",
    marks: 2, difficulty: "medium",
  },

  /* ── Share schemes ── */
  {
    id: "ATX2-A-03", paper: "ATX", area: "A", type: "mcq",
    stem: "Under a qualifying EMI scheme, Priti was granted options with an exercise price equal to the market value at grant of £4. She exercises when the market value is £10 and later sells at £15. EMI options granted at (or above) market value give no income tax on grant or exercise. What is the income tax position ON EXERCISE?",
    options: [
      "Income tax on £6 per share (market value at exercise less the exercise price)",
      "Income tax on £10 per share (the market value at exercise)",
      "No income tax on exercise; the whole £11 growth is charged to CGT on the eventual sale",
      "Income tax on £11 per share (sale price less the exercise price)",
    ],
    correct: 2,
    explanation: "Because the EMI options were granted at market value, there is NO income tax on exercise; the full gain from grant to sale (£15 − £4 = £11) is a chargeable gain on disposal. Charging £6 wrongly applies the non-tax-advantaged rule; £10 taxes the whole market value; £11 mislabels the CGT gain as employment income.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-04", paper: "ATX", area: "A", type: "mcq",
    stem: "A company operates a tax-advantaged CSOP (company share option plan). The limit on the value of shares over which an employee may hold options was raised in April 2023 to £60,000. Which statement correctly describes a CSOP feature?",
    options: [
      "Options over shares worth up to £60,000 at grant, with no income tax on exercise if held at least 3 years",
      "Options over shares worth up to £250,000, mirroring the EMI individual limit",
      "Free shares worth up to £3,600 per tax year given to each employee",
      "A discount of up to 20% to market value is permitted on the option exercise price",
    ],
    correct: 0,
    explanation: "A CSOP allows options over up to £60,000 of shares with no income tax on a qualifying exercise (broadly held 3+ years). The £250,000 figure is the EMI individual limit; £3,600 free shares is a SIP feature; the 20% discount is a SAYE feature — each distractor imports another scheme's rule.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-05", paper: "ATX", area: "A", type: "number",
    stem: "Under a SAYE (save-as-you-earn) scheme the exercise (option) price may be set at a discount of up to 20% of the market value of the shares at the grant date. At grant the shares are worth £7.50 and Rashida's employer applies the maximum permitted discount. What is the exercise price per share, in £?",
    numericAnswer: 6.00,
    unit: "£",
    tolerance: 0.01,
    explanation: "Maximum SAYE discount is 20%, so the exercise price = £7.50 × (1 − 0.20) = £7.50 × 0.80 = £6.00 per share. Using £7.50 forgets the discount; £1.50 gives only the discount amount, not the price.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-06", paper: "ATX", area: "A", type: "mcq",
    stem: "A share incentive plan (SIP): free shares up to £3,600 per year; partnership shares up to the lower of £1,800 and 10% of salary; shares held 5 years for full income tax/NIC relief; matching shares up to a 2:1 ratio. Which statement is CORRECT?",
    options: [
      "Free shares can be awarded up to £5,000 per year",
      "Matching shares may be given only at a maximum ratio of 1:1 to partnership shares",
      "Partnership shares are bought from PRE-TAX salary, up to the lower of £1,800 and 10% of salary",
      "Shares must be held for only 3 years to get full income tax exemption on withdrawal",
    ],
    correct: 2,
    explanation: "Partnership shares are purchased out of pre-tax salary, capped at the lower of £1,800 and 10% of salary. Free shares are capped at £3,600 (not £5,000); matching shares go up to 2:1 (not 1:1); and full relief needs a 5-year (not 3-year) holding period.",
    marks: 2, difficulty: "medium",
  },

  /* ── Termination payments ── */
  {
    id: "ATX2-A-07", paper: "ATX", area: "A", type: "number",
    stem: "On redundancy Callum receives: statutory redundancy pay of £4,000 (exempt, but it uses part of the £30,000 exemption), an ex-gratia lump sum of £40,000, and a fully-taxable contractual PILON of £8,000. The first £30,000 of qualifying termination payments is exempt. How much of the package (EXCLUDING the £8,000 PILON, which is taxed in full as earnings) is chargeable to income tax, in £?",
    numericAnswer: 14000,
    unit: "£",
    tolerance: 1,
    explanation: "Statutory redundancy £4,000 is exempt but reduces the £30,000, leaving £26,000. Ex-gratia £40,000 − £26,000 remaining exemption = £14,000 taxable. Ignoring that statutory redundancy uses the exemption would give £40,000 − £30,000 = £10,000; taxing the whole £40,000 ignores the exemption entirely.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-A-08", paper: "ATX", area: "A", type: "number",
    stem: "Elodie is dismissed with no contractual PILON. Her post-employment notice pay (PENP) is (BP × D) / P − T, where BP = basic pay in the last pay period, D = unworked notice days, P = days in the last pay period, T = amounts already taxed. She is paid monthly (last period 30 days), basic monthly pay £5,000, unworked notice 90 days, T = £0. She also gets an ex-gratia sum of £50,000; £30,000 is exempt. What total amount is chargeable to income tax (PENP plus the taxable excess), in £?",
    numericAnswer: 20000,
    unit: "£",
    tolerance: 1,
    explanation: "PENP = (£5,000 × 90) / 30 − £0 = £15,000, taxed in full as earnings. Of the £50,000, £15,000 is reclassified as PENP, leaving £35,000 as the s401 termination payment; £30,000 is exempt, so £5,000 is taxable. Total = £15,000 + £5,000 = £20,000. Forgetting PENP would give just £50,000 − £30,000 = £20,000 by luck of figures — but the correct build is PENP £15,000 + excess £5,000.",
    marks: 2, difficulty: "hard",
  },

  /* ── Overseas aspects: residence (SRT), domicile, remittance, DTR ── */
  {
    id: "ATX2-A-09", paper: "ATX", area: "A", type: "mcq",
    stem: "Under the statutory residence test, a 'leaver' (UK resident in one or more of the previous 3 tax years) who spends 91-120 days in the UK is resident if she has at least 2 UK ties. In 2024/25 Saoirse spends 100 UK days and has an available UK home (accommodation tie) and 45 days of substantive UK work (work tie); no other ties. Is she UK resident?",
    options: [
      "No — 100 days is too few to be resident whatever her ties",
      "Yes — with 2 ties she meets the threshold for the 91-120 day band",
      "No — the 91-120 day band requires at least 3 ties for a leaver",
      "Yes — she is automatically resident because she spent over 90 days here",
    ],
    correct: 1,
    explanation: "She has 2 ties (accommodation + work) and 100 days falls in the 91-120 band, which needs 2 ties — so she IS UK resident. The band does not need 3 ties (that is the 46-90 day band); and there is no automatic residence at 90 days (automatic UK residence needs 183 days).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-10", paper: "ATX", area: "A", type: "mcq",
    stem: "Which of the following makes an individual AUTOMATICALLY UK resident for a tax year under the automatic UK residence tests, regardless of any ties?",
    options: [
      "Holding a UK bank account during the year",
      "Spending 90 days in the UK in the tax year",
      "Spending 183 days or more in the UK in the tax year",
      "Owning a holiday home somewhere in the UK",
    ],
    correct: 2,
    explanation: "Spending 183+ days in the UK is an automatic UK residence test. A bank account or a holiday home is at most a factor/tie, not a test; and 90 days is a tie-counting threshold, not automatic residence.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-11", paper: "ATX", area: "A", type: "mcq",
    stem: "The remittance basis charge (RBC) is £30,000 for a non-UK-domiciled individual UK resident in at least 7 of the previous 9 tax years, and £60,000 if resident in at least 12 of the previous 14 tax years. Nadia is non-UK domiciled, has been UK resident for 13 of the last 14 years, and has £200,000 of unremitted foreign income. If she claims the remittance basis, what RBC applies?",
    options: [
      "£30,000",
      "£60,000",
      "£90,000",
      "£0 — the charge only starts once resident for 17 years",
    ],
    correct: 1,
    explanation: "Resident 13 of the last 14 years meets the '12 of 14 years' test, so the RBC is £60,000. £30,000 is the lower (7 of 9 years) charge; £90,000 conflates the two; and there is no 17-year rule for the RBC (15-of-20 years relates to deemed domicile, a different concept).",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-A-12", paper: "ATX", area: "A", type: "number",
    stem: "Ravi is an additional-rate (45%) taxpayer taxed on the arising basis. His overseas rental income of £10,000 (gross) suffered £3,500 of overseas tax. Double tax relief is the LOWER of the UK tax on that income and the overseas tax suffered. Treating the foreign income as the top slice, UK tax on it is £10,000 × 45% = £4,500. What double tax relief can Ravi claim, in £?",
    numericAnswer: 3500,
    unit: "£",
    tolerance: 1,
    explanation: "DTR = lower of UK tax £4,500 and overseas tax £3,500 = £3,500. Claiming £4,500 wrongly uses the UK figure; claiming £1,000 gives only the net UK tax after DTR, not the relief itself.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-13", paper: "ATX", area: "A", type: "mcq",
    stem: "Tomasz is UK resident AND UK domiciled, with foreign investment income. How is that foreign income taxed?",
    options: [
      "On the remittance basis by default",
      "It is exempt if it is simply left in an overseas bank account",
      "It is taxable only if remitted, provided it is under £2,000",
      "On the arising basis — his worldwide income is taxed as it arises, whether or not it is brought to the UK",
    ],
    correct: 3,
    explanation: "A UK-resident, UK-domiciled individual is taxed on the ARISING basis on worldwide income. The remittance basis (and the £2,000 de-minimis) is only available to non-doms; leaving income offshore does not make it exempt for a UK-domiciled resident.",
    marks: 2, difficulty: "medium",
  },

  /* ── Pension planning: annual allowance taper & carry forward ── */
  {
    id: "ATX2-A-14", paper: "ATX", area: "A", type: "number",
    stem: "The pension annual allowance is £60,000, tapered by £1 for every £2 of adjusted income over £260,000 (minimum £10,000), where threshold income also exceeds £200,000. Marcus has adjusted income of £310,000 (and threshold income above £200,000). What is his tapered annual allowance for 2024/25, in £?",
    numericAnswer: 35000,
    unit: "£",
    tolerance: 1,
    explanation: "Excess = £310,000 − £260,000 = £50,000; taper = £50,000 / 2 = £25,000; tapered AA = £60,000 − £25,000 = £35,000. Dividing the whole adjusted income, or forgetting the ÷2, are the common slips; £35,000 is above the £10,000 floor so no flooring is needed.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-A-15", paper: "ATX", area: "A", type: "mcq",
    stem: "Unused pension annual allowance may be carried forward. Which statement about carry forward is CORRECT?",
    options: [
      "Carry forward is available from the previous 5 tax years",
      "Unused allowance can be carried forward even without pension scheme membership in the earlier years",
      "The earlier years' allowance is always used before the current year's allowance",
      "Carry forward covers the previous 3 tax years, using the current-year allowance first, provided the person was a scheme member in those earlier years",
    ],
    correct: 3,
    explanation: "Carry forward runs from the previous 3 (not 5) years, needs scheme membership in those years, and the CURRENT year's allowance is used first, then the oldest brought-forward year. Options 0, 1 and 2 each break one of those rules.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-16", paper: "ATX", area: "A", type: "mcq",
    stem: "A higher-rate taxpayer makes a £4,000 (net) personal pension contribution to a relief-at-source scheme. Basic-rate relief is given at source (100/80 gross-up); higher-rate relief is given by extending the basic rate band. How is the higher-rate relief obtained?",
    options: [
      "The £4,000 is deducted directly from total income",
      "The £4,000 is grossed up to £5,000 and the basic rate band is extended by £5,000",
      "No further relief is available — 20% relief at source is the maximum",
      "The £4,000 net contribution is added to the basic rate band",
    ],
    correct: 1,
    explanation: "Gross contribution = £4,000 × 100/80 = £5,000; the basic rate band is extended by the GROSS £5,000, giving the extra higher-rate relief. Deducting from total income is the net-pay / occupational method; £4,000 net (not gross) understates the extension; and relief is not limited to 20%.",
    marks: 2, difficulty: "easy",
  },

  /* ── EIS / SEIS / VCT ── */
  {
    id: "ATX2-A-17", paper: "ATX", area: "A", type: "number",
    stem: "EIS income tax relief is 30% of the amount subscribed (maximum qualifying investment £1,000,000), limited to the income tax liability, with shares held 3 years. Olivia subscribes £120,000 for EIS shares in 2024/25 and her income tax liability before EIS relief is £50,000. What is her EIS income tax reducer for 2024/25, in £?",
    numericAnswer: 36000,
    unit: "£",
    tolerance: 1,
    explanation: "Relief = 30% × £120,000 = £36,000, which is below her £50,000 liability so it is given in full. Using 50% (£60,000) applies the SEIS rate; using the whole £120,000 ignores the 30% rate.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-18", paper: "ATX", area: "A", type: "number",
    stem: "SEIS income tax relief is 50% of the amount subscribed (maximum £200,000 per year), with shares held 3 years. Sam subscribes £90,000 for SEIS shares in 2024/25 and his income tax liability before relief is £60,000. What is his SEIS income tax reducer for 2024/25, in £?",
    numericAnswer: 45000,
    unit: "£",
    tolerance: 1,
    explanation: "Relief = 50% × £90,000 = £45,000, below the £60,000 liability so given in full. Using 30% (£27,000) applies the EIS/VCT rate; the £200,000 cap does not bite here.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-19", paper: "ATX", area: "A", type: "mcq",
    stem: "A venture capital trust (VCT): 30% income tax relief on up to £200,000 subscribed; dividends exempt; shares held 5 years; no relief on second-hand shares. Which statement is CORRECT?",
    options: [
      "VCT income tax relief is given at 50%",
      "VCT shares must be held for 3 years to retain the relief",
      "Dividends from VCT shares within the £200,000 limit are exempt from income tax",
      "The maximum annual investment qualifying for relief is £1,000,000",
    ],
    correct: 2,
    explanation: "VCT dividends within the £200,000 limit are income-tax exempt. Relief is 30% (not 50%, which is SEIS); the holding period is 5 years (not 3); and the annual limit is £200,000 (£1,000,000 is the EIS limit).",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-20", paper: "ATX", area: "A", type: "mcq",
    stem: "Which condition must be met for EIS income tax relief to be given and retained?",
    options: [
      "The shares must be sold within 3 years to crystallise the relief",
      "The investor must own at least 5% of the company",
      "The company must be listed on a recognised stock exchange",
      "The investor must hold the shares for at least 3 years and not be connected with the company (e.g. an employee owning over 30%)",
    ],
    correct: 3,
    explanation: "EIS requires a MINIMUM 3-year holding (selling early withdraws relief), the investor must not be connected (broadly not an employee/holder of over 30%), and the company must be UNQUOTED. There is no 5% minimum stake for EIS (that is a BADR-type test).",
    marks: 2, difficulty: "medium",
  },

  /* ── Property & FHL ── */
  {
    id: "ATX2-A-21", paper: "ATX", area: "A", type: "mcq",
    stem: "For 2024/25 a property qualifies as a furnished holiday let only if it is available for letting at least 210 days AND actually let at least 105 days. A cottage is available 240 days and actually let 90 days (no averaging or period-of-grace election). Does it qualify as an FHL?",
    options: [
      "No — it is actually let for fewer than the required 105 days",
      "Yes — it is available for more than 210 days, which is the only test that matters",
      "Yes — 90 days of actual letting is sufficient",
      "No — it must be available for the full 365 days",
    ],
    correct: 0,
    explanation: "Availability of 240 days passes that test, but actual letting of 90 days fails the 105-day requirement, so it does NOT qualify. Availability alone is not enough; 90 days is below the threshold; and 365-day availability is never required.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-22", paper: "ATX", area: "A", type: "number",
    stem: "The cash basis is the default for a property business but the accruals basis may be elected. Farah elects the accruals basis. Rent due for 2024/25 is 12 × £900 = £10,800 (one tenant's £900 due at 5 April is received later; recovery is not in doubt). Expenses accrued are £2,300, of which £400 is a capital improvement (not deductible). What is her property income for 2024/25, in £?",
    numericAnswer: 8900,
    unit: "£",
    tolerance: 1,
    explanation: "Accruals income = £10,800 (rent as it falls due). Deductible expenses = £2,300 − £400 capital = £1,900. Property income = £10,800 − £1,900 = £8,900. Deducting the £400 capital item gives £8,500; using only £9,900 rent received gives the wrong income.",
    marks: 2, difficulty: "medium",
  },

  /* ── Partnerships ── */
  {
    id: "ATX2-A-23", paper: "ATX", area: "A", type: "number",
    stem: "The ABC partnership's tax-adjusted trading profit for the year ended 5 April 2025 is £120,000. Partner A takes a salary of £30,000; interest on capital is A £2,000, B £2,000, C £1,000 (total £5,000); the balance is shared A:B:C = 2:2:1. What is Partner A's taxable trading income for 2024/25, in £?",
    numericAnswer: 66000,
    unit: "£",
    tolerance: 1,
    explanation: "Balance to share = £120,000 − £30,000 salary − £5,000 interest = £85,000. A's share = £85,000 × 2/5 = £34,000. A's total = £30,000 + £2,000 + £34,000 = £66,000. Forgetting the salary/interest allocations, or splitting the whole £120,000 in ratio, are the usual errors.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-24", paper: "ATX", area: "A", type: "mcq",
    stem: "In the XY partnership the profit-sharing agreement gives X a salary of £30,000, then splits the balance equally. The firm's tax-adjusted profit is only £20,000. Because a partner's allocation cannot leave the firm's total mis-stated, any notional loss is reallocated to profit-making partners. What are the FINAL allocations to X and Y?",
    options: [
      "X £25,000; Y −£5,000",
      "X £20,000; Y £0",
      "X £15,000; Y £5,000",
      "X £10,000; Y £10,000",
    ],
    correct: 1,
    explanation: "First pass: salary £30,000 to X leaves −£10,000 to split equally = −£5,000 each, giving X £25,000 and Y −£5,000. Y's notional loss of £5,000 is reallocated to the only profit-maker, X: X £25,000 − £5,000 = £20,000, Y £0. The allocations must total the firm's £20,000. Option 0 stops before reallocation; 2 and 3 ignore the salary priority.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-A-25", paper: "ATX", area: "A", type: "mcq",
    stem: "Under the tax-year basis (from 2024/25) a new partner joins a continuing partnership on 6 October 2024. Which statement is CORRECT?",
    options: [
      "The whole partnership ceases and recommences when a partner joins",
      "The new partner is taxed on a full year's profit share regardless of the join date",
      "The new partner is taxed on their profit share for the period 6 October 2024 to 5 April 2025",
      "Overlap profits arise for the new partner under the tax-year basis",
    ],
    correct: 2,
    explanation: "Under the tax-year basis each partner is taxed on their share of the tax year's profits; a mid-year joiner is taxed from the join date to 5 April. The firm does not cease; the new partner is not taxed on a full year; and the tax-year basis removes overlap profits.",
    marks: 2, difficulty: "medium",
  },

  /* ── Trusts (income tax basics) ── */
  {
    id: "ATX2-A-26", paper: "ATX", area: "A", type: "mcq",
    stem: "A discretionary trust pays income tax at the trust rates — 45% on non-dividend income and 39.35% on dividends — above a small standard rate band (ignore the band here). Which statement is CORRECT?",
    options: [
      "A discretionary trust pays tax at 20% on all of its income",
      "An interest-in-possession trust pays 45% on its rental income",
      "Trust income is always taxed on the settlor",
      "A discretionary trust's non-dividend income above the standard rate band is taxed at 45%",
    ],
    correct: 3,
    explanation: "Discretionary trusts pay 45% on non-dividend income (39.35% on dividends). Interest-in-possession trusts pay the basic rates (20%/8.75%), not 45%; the settlor is only taxed under specific anti-avoidance rules, not always; and 20% is not the discretionary-trust rate.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-27", paper: "ATX", area: "A", type: "number",
    stem: "A discretionary trust makes a discretionary income distribution that carries a 45% tax credit (the trust must hold enough tax in its tax pool). The beneficiary receives a NET distribution of £5,500. What is the GROSS amount of the distribution (the amount assessable on the beneficiary), in £?",
    numericAnswer: 10000,
    unit: "£",
    tolerance: 1,
    explanation: "Gross = net / (1 − 0.45) = £5,500 / 0.55 = £10,000 (tax credit £4,500). Adding 45% of £5,500 (£7,975) grosses up incorrectly; treating £5,500 as gross ignores the credit altogether.",
    marks: 2, difficulty: "hard",
  },

  /* ── NIC (Class 1 / 1A / 2 / 4) & personal financial planning ── */
  {
    id: "ATX2-A-28", paper: "ATX", area: "A", type: "number",
    stem: "Employee (primary) Class 1 NIC for 2024/25 is 8% on earnings between the primary threshold £12,570 and the upper earnings limit £50,270, then 2% above £50,270. Gerda has an annual salary of £40,270 and no benefits. What is her primary Class 1 NIC for the year, in £?",
    numericAnswer: 2216,
    unit: "£",
    tolerance: 1,
    explanation: "Class 1 = 8% × (£40,270 − £12,570) = 8% × £27,700 = £2,216. She is below the £50,270 UEL so the 2% band does not apply. Charging from £0, or applying an old 12%/10% rate, are the usual errors.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-29", paper: "ATX", area: "A", type: "mcq",
    stem: "Class 1A NIC is payable by the EMPLOYER only, at 13.8% on the taxable value of most benefits in kind. Hollow Ltd provides an employee with a company car (taxable benefit £6,000) and private medical insurance costing the employer £1,200. What is the Class 1A NIC for the year?",
    options: [
      "£828.00",
      "£993.60",
      "£1,987.20",
      "£576.00",
    ],
    correct: 1,
    explanation: "Class 1A = 13.8% × (£6,000 + £1,200) = 13.8% × £7,200 = £993.60. £828.00 taxes only the car; £1,987.20 double-counts; £576.00 wrongly applies the 8% employee rate.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-A-30", paper: "ATX", area: "A", type: "number",
    stem: "Self-employed Class 4 NIC for 2024/25 is 6% on profits between £12,570 and £50,270, then 2% above £50,270. Idris has a tax-adjusted trading profit of £30,000. What is his Class 4 NIC for the year, in £?",
    numericAnswer: 1045.80,
    unit: "£",
    tolerance: 0.5,
    explanation: "Class 4 = 6% × (£30,000 − £12,570) = 6% × £17,430 = £1,045.80. Using the old 9% rate gives £1,568.70; charging from £0 overstates the band.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-31", paper: "ATX", area: "A", type: "mcq",
    stem: "From 2024/25 a self-employed person with profits above the small profits threshold (£6,725) is TREATED as having paid Class 2 NIC and need not pay it; those below may pay voluntarily at £3.45 per week. Jamal's trading profit is £20,000. Which is CORRECT?",
    options: [
      "He must pay Class 2 NIC at £3.45 per week",
      "Class 2 is charged at 6% of his profits",
      "He is treated as having paid Class 2 and pays nothing, because profits exceed £6,725",
      "He must additionally pay Class 2 on top of his Class 4 liability",
    ],
    correct: 2,
    explanation: "With profits above £6,725 he is treated as having paid Class 2, so nothing is due. £3.45/week is only relevant to voluntary payment BELOW the threshold; Class 2 is a flat weekly amount, not 6% (that is Class 4); and there is no extra mandatory Class 2 charge.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-32", paper: "ATX", area: "A", type: "number",
    stem: "The personal allowance is £12,570, reduced by £1 for every £2 of adjusted net income over £100,000. Kwame has adjusted net income of £118,000. What is his personal allowance for 2024/25, in £?",
    numericAnswer: 3570,
    unit: "£",
    tolerance: 1,
    explanation: "Reduction = (£118,000 − £100,000) / 2 = £18,000 / 2 = £9,000; PA = £12,570 − £9,000 = £3,570. Forgetting the ÷2 wipes the allowance out; measuring the excess from £125,140 mis-states the taper.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-A-33", paper: "ATX", area: "A", type: "mcq",
    stem: "Which of the following REDUCES 'adjusted net income' for the purpose of the personal allowance taper?",
    options: [
      "Gross gift aid donations and gross personal pension contributions",
      "Interest earned within an ISA",
      "The personal allowance itself",
      "Employee occupational pension contributions given under net pay, added back",
    ],
    correct: 0,
    explanation: "Gross gift aid and gross personal pension contributions are deducted in arriving at adjusted net income. ISA interest is exempt and never in the measure anyway; the personal allowance is not deducted (adjusted net income is measured before it); and net-pay contributions are already relieved, not added back.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-A-34", paper: "ATX", area: "A", type: "mcq",
    stem: "Both gross gift aid donations and gross personal pension contributions extend the basic rate band. Aisha has taxable income (after her personal allowance) of £60,000, all non-savings; the basic rate band is £37,700. She makes an £8,000 (net) personal pension contribution and a £4,000 (net) gift aid donation. By how much is her basic rate band extended?",
    options: [
      "£12,000 — the net contributions of £8,000 and £4,000 added",
      "£10,000 — only the pension contribution extends the band",
      "£5,000 — only the gift aid donation extends the band",
      "£15,000 — both grossed up at 100/80 (£10,000 + £5,000) and added to the band",
    ],
    correct: 3,
    explanation: "Gross pension = £8,000 × 100/80 = £10,000; gross gift aid = £4,000 × 100/80 = £5,000; total extension £15,000. Using net figures gives £12,000; counting only one of the two reliefs gives £10,000 or £5,000.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-A-35", paper: "ATX", area: "A", type: "mcq",
    stem: "Leon is UK resident and UK domiciled. He is seconded to work WHOLLY abroad for a full tax year, paid by his UK employer, and meets the full-time-work-abroad automatic overseas test (so is non-UK resident for the year). Which statement is CORRECT?",
    options: [
      "Overseas workday relief exempts the foreign earnings because he is UK domiciled",
      "Because a UK employer pays him, the income is always fully UK taxable regardless of residence",
      "If he meets the full-time-work-abroad test and is non-UK resident, his overseas employment income is outside UK tax",
      "He can claim the remittance basis to exclude the earnings",
    ],
    correct: 2,
    explanation: "Non-UK residence under the automatic overseas test takes his overseas employment income outside the UK charge. Overseas workday relief is for non-doms only, so it does not help a UK-domiciled employee; residence, not the payer's location, governs the charge; and the remittance basis is unavailable to a UK-domiciled individual.",
    marks: 2, difficulty: "hard",
  },

  /* ═══════════════ Area B — Chargeable gains & IHT (advanced) — 35 ═══════════════ */

  /* ── CGT reliefs: BADR & investors' relief ── */
  {
    id: "ATX2-B-01", paper: "ATX", area: "B", type: "mcq",
    stem: "Business asset disposal relief (BADR) gives a 10% CGT rate on qualifying gains up to a £1,000,000 lifetime limit. For shares in a personal trading company the individual must hold at least 5% of the ordinary shares and votes AND be an officer or employee, for at least 2 years to disposal. Which of these is NOT a requirement?",
    options: [
      "Holding at least 5% of the ordinary shares and voting rights",
      "Being an officer or employee of the company",
      "The company being an UNQUOTED company",
      "A minimum 2-year qualifying period to the date of disposal",
    ],
    correct: 2,
    explanation: "BADR does not require the company to be unquoted — a quoted 'personal company' can qualify. The 5% shares/votes, officer-or-employee, and 2-year holding conditions are all genuine requirements.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-02", paper: "ATX", area: "B", type: "number",
    stem: "BADR gives a 10% rate on qualifying gains up to a £1,000,000 lifetime limit; other gains for a higher-rate taxpayer are taxed at 20%; the £3,000 annual exempt amount is best set against the highest-rate gains. Meera sells qualifying trading company shares realising a gain of £903,000. She has already used £600,000 of her BADR lifetime limit and has £3,000 AEA available (no other gains). What is her total CGT liability, in £?",
    numericAnswer: 140000,
    unit: "£",
    tolerance: 5,
    explanation: "Remaining BADR limit = £1,000,000 − £600,000 = £400,000 taxed at 10% = £40,000. The excess £903,000 − £400,000 = £503,000, less £3,000 AEA (best against the 20% gain) = £500,000 × 20% = £100,000. Total = £140,000. Taxing everything at 10% gives £90,000; ignoring the used limit over-reliefs.",
    marks: 2, difficulty: "medium",
  },

  /* ── Gift/holdover relief s165 & s260 ── */
  {
    id: "ATX2-B-03", paper: "ATX", area: "B", type: "mcq",
    stem: "Gift holdover relief (s165) is available on gifts of qualifying business assets, including unquoted trading company shares — the gain is held over and reduces the donee's base cost. Piotr gifts his son unquoted trading company shares worth £200,000 (original cost £50,000) and they jointly elect for s165 holdover. Which is CORRECT?",
    options: [
      "The £150,000 gain is held over and the son's base cost becomes £50,000",
      "Piotr pays CGT on the £150,000 gain now",
      "The son's base cost is £200,000",
      "No gain arises at all because it is a gift",
    ],
    correct: 0,
    explanation: "The gain of £200,000 − £50,000 = £150,000 is held over; the son's base cost = £200,000 market value − £150,000 held over = £50,000. Holdover defers, it does not tax Piotr now; the son does not get a £200,000 base cost; and a gift to a connected person IS a disposal at market value (a gain arises but is deferred).",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-04", paper: "ATX", area: "B", type: "mcq",
    stem: "Holdover relief under s260 applies to a gift that is IMMEDIATELY chargeable to IHT (e.g. a transfer into a discretionary/relevant property trust), even if the asset is not a business asset. Rosa gifts a quoted investment (a non-business asset) worth £300,000 (cost £120,000) into a discretionary trust (a chargeable lifetime transfer). Which is CORRECT?",
    options: [
      "No holdover is available because it is not a business asset",
      "Only s165 applies, and it fails because the asset is an investment",
      "The gain is exempt because it goes into a trust",
      "s260 holdover is available because the transfer is a CLT for IHT, so the £180,000 gain can be held over",
    ],
    correct: 3,
    explanation: "s260 holdover applies to a chargeable lifetime transfer regardless of the asset type, so the £300,000 − £120,000 = £180,000 gain is held over. s165 alone would fail (an investment is not a business asset), but s260 rescues it; the gain is deferred, not exempt.",
    marks: 2, difficulty: "medium",
  },

  /* ── Incorporation relief s162 & rollover relief ── */
  {
    id: "ATX2-B-05", paper: "ATX", area: "B", type: "number",
    stem: "Incorporation relief (s162) is automatic where a business is transferred as a going concern with all assets (other than cash) for shares; the gain deferred = total gain × (value of shares received / total consideration). Njabulo transfers his business realising total gains of £400,000 for consideration of £500,000, satisfied by shares £350,000 and cash £150,000. What gain is immediately chargeable (not deferred), in £?",
    numericAnswer: 120000,
    unit: "£",
    tolerance: 5,
    explanation: "Deferred = £400,000 × (£350,000 / £500,000) = £400,000 × 0.70 = £280,000. Chargeable now = £400,000 − £280,000 = £120,000. Deferring the whole gain ignores the cash element; using cash/total (£120,000... coincidentally) is wrong reasoning even where the number matches — the correct method is shares/total.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-B-06", paper: "ATX", area: "B", type: "number",
    stem: "Rollover relief lets a gain on a qualifying business asset be rolled into a replacement bought 1 year before to 3 years after; if not all proceeds are reinvested, the gain chargeable now is the LOWER of the full gain and the proceeds not reinvested. Olwen sells a factory for £500,000 (gain £180,000) and reinvests £440,000 in a new factory. What gain is chargeable now, in £?",
    numericAnswer: 60000,
    unit: "£",
    tolerance: 5,
    explanation: "Proceeds not reinvested = £500,000 − £440,000 = £60,000; chargeable now = lower of £180,000 gain and £60,000 = £60,000 (£120,000 is rolled over). Rolling the whole gain ignores the partial reinvestment; charging the full £180,000 ignores rollover entirely.",
    marks: 2, difficulty: "medium",
  },

  /* ── PPR with absences & lettings ── */
  {
    id: "ATX2-B-07", paper: "ATX", area: "B", type: "number",
    stem: "PPR relief exempts periods of actual occupation plus deemed occupation (the last 9 months always, and up to 3 years of absence for ANY reason, provided there is actual occupation before and after). Sian owned a house for 120 months: lived in it 24 months, then absent 60 months (living elsewhere for no qualifying reason), then lived in it the final 36 months. The total gain is £240,000. What is the chargeable gain after PPR relief (before the AEA), in £?",
    numericAnswer: 48000,
    unit: "£",
    tolerance: 5,
    explanation: "Exempt = 24 (actual) + 36 (3 years 'any reason', sandwiched by occupation) + 36 (actual) = 96 months. Chargeable = the remaining 60 − 36 = 24 months. Gain = £240,000 × 24/120 = £48,000. Treating all 60 absent months as chargeable gives £120,000; treating them all as exempt gives £0.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-B-08", paper: "ATX", area: "B", type: "number",
    stem: "Letting relief (post-April 2020) is available only where the owner shares occupation with the tenant, and is the LOWEST of: the PPR relief given, £40,000, and the gain on the let part. Bethan occupied 60% of her home and let 40% to a tenant with whom she shared the property throughout; the total gain is £200,000. What is the chargeable gain after PPR and letting relief (before the AEA), in £?",
    numericAnswer: 40000,
    unit: "£",
    tolerance: 5,
    explanation: "PPR covers the 60% occupied = £120,000; the let 40% gain = £80,000. Letting relief = lowest of £120,000 (PPR given), £40,000, and £80,000 = £40,000. Chargeable = £80,000 − £40,000 = £40,000. Forgetting the £40,000 cap over-reliefs; ignoring letting relief leaves £80,000.",
    marks: 2, difficulty: "hard",
  },

  /* ── EIS reinvestment/deferral ── */
  {
    id: "ATX2-B-09", paper: "ATX", area: "B", type: "mcq",
    stem: "EIS deferral (reinvestment) relief defers a capital gain on ANY asset if the amount of the GAIN is reinvested in EIS shares within 1 year before to 3 years after the disposal; there is no upper limit, and the gain revives when the EIS shares are sold. Duncan makes a £100,000 gain on a painting and reinvests £100,000 in EIS shares six months later. Which is CORRECT?",
    options: [
      "The £100,000 gain is permanently exempt",
      "The £100,000 gain is deferred until the EIS shares are disposed of",
      "Only 30% of the gain can be deferred",
      "Deferral is capped at £1,000,000 of gain",
    ],
    correct: 1,
    explanation: "The whole £100,000 gain is DEFERRED (not exempt) and comes back into charge when the EIS shares are sold. 30% is the income-tax reducer rate, not a deferral cap; and EIS deferral relief has no monetary limit.",
    marks: 2, difficulty: "medium",
  },

  /* ── Chattels & wasting assets ── */
  {
    id: "ATX2-B-10", paper: "ATX", area: "B", type: "number",
    stem: "For a non-wasting chattel sold for gross proceeds over £6,000, the chargeable gain is the LOWER of the actual gain and 5/3 × (gross proceeds − £6,000). Fabien sells an antique table (cost £2,000) for £9,000 (ignore selling costs). What is the chargeable gain, in £?",
    numericAnswer: 5000,
    unit: "£",
    tolerance: 5,
    explanation: "Actual gain = £9,000 − £2,000 = £7,000. Marginal cap = 5/3 × (£9,000 − £6,000) = 5/3 × £3,000 = £5,000. Chargeable = lower = £5,000. Taking the full £7,000 ignores the marginal relief; 5/3 × £9,000 forgets to subtract £6,000.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-11", paper: "ATX", area: "B", type: "mcq",
    stem: "A wasting chattel — tangible, moveable property with a predictable useful life of 50 years or less — is generally EXEMPT from CGT. Which disposal is exempt as a wasting chattel?",
    options: [
      "A privately owned racehorse sold at a gain",
      "An antique painting sold for £20,000",
      "Listed company shares sold at a gain",
      "A commercial let building sold at a gain",
    ],
    correct: 0,
    explanation: "A racehorse is a wasting chattel (life under 50 years) and is exempt. A painting is a NON-wasting chattel (potentially chargeable if proceeds exceed £6,000); shares and buildings are not chattels at all (not tangible moveable property).",
    marks: 2, difficulty: "easy",
  },

  /* ── Part disposals ── */
  {
    id: "ATX2-B-12", paper: "ATX", area: "B", type: "number",
    stem: "On a part disposal the cost apportioned to the part sold = total cost × A / (A + B), where A = proceeds of the part sold and B = market value of the part retained. Gwilym bought land for £90,000 and sells part for £60,000 (A) when the remaining land is worth £120,000 (B). What is the chargeable gain on the part disposal (before the AEA), in £?",
    numericAnswer: 30000,
    unit: "£",
    tolerance: 5,
    explanation: "Cost apportioned = £90,000 × 60,000 / (60,000 + 120,000) = £90,000 × 1/3 = £30,000. Gain = £60,000 − £30,000 = £30,000. Deducting the whole £90,000 cost gives a loss; using B/(A+B) apportions the wrong side.",
    marks: 2, difficulty: "medium",
  },

  /* ── Shares: matching rules, bonus & rights issues ── */
  {
    id: "ATX2-B-13", paper: "ATX", area: "B", type: "mcq",
    stem: "When an individual disposes of shares, the CGT share-matching (identification) rules apply in a set order. What is the correct order?",
    options: [
      "The s104 pool, then same-day acquisitions, then the next 30 days",
      "The next 30 days, then same-day acquisitions, then the s104 pool",
      "Same-day acquisitions, then acquisitions in the next 30 days, then the s104 pool",
      "FIFO — earliest acquisitions are always matched first",
    ],
    correct: 2,
    explanation: "The order is: same day, then the following 30 days, then the s104 pool. The pool is matched LAST, not first; the 30-day rule follows (not precedes) same-day; and FIFO is not the individual share-matching rule.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-14", paper: "ATX", area: "B", type: "mcq",
    stem: "A bonus (scrip) issue gives free shares in proportion to an existing holding; for CGT the new shares are added to the s104 pool at NIL cost. Ffion holds 4,000 shares (pool cost £20,000) and receives a 1-for-4 bonus issue (1,000 free shares). Which is CORRECT?",
    options: [
      "The pool becomes 5,000 shares with unchanged cost of £20,000",
      "The pool becomes 5,000 shares with cost increased to £25,000",
      "A disposal arises on the bonus shares",
      "The 1,000 bonus shares have a base cost of £5,000",
    ],
    correct: 0,
    explanation: "Bonus shares are free, so the pool holds 5,000 shares at the SAME £20,000 cost (the cost per share simply falls). No new money is paid, so the cost does not rise to £25,000; no disposal occurs; and the bonus shares do not carry their own £5,000 cost.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-15", paper: "ATX", area: "B", type: "number",
    stem: "A rights issue adds shares at the price paid, increasing both the number of shares and the pool cost by the amount subscribed. Idris's s104 pool holds 6,000 shares (cost £30,000). He takes up a 1-for-3 rights issue at £4.50 per share, then sells 2,000 shares. What is the CGT base cost of the 2,000 shares sold, in £?",
    numericAnswer: 9750,
    unit: "£",
    tolerance: 5,
    explanation: "Rights shares = 6,000/3 = 2,000 at £4.50 = £9,000; new pool = £30,000 + £9,000 = £39,000 over 8,000 shares. Cost of 2,000 sold = £39,000 × 2,000/8,000 = £9,750. Ignoring the rights cost, or using the old 6,000-share pool, gives the wrong per-share cost.",
    marks: 2, difficulty: "medium",
  },

  /* ── IHT: PETs, CLTs, cumulation & taper ── */
  {
    id: "ATX2-B-16", paper: "ATX", area: "B", type: "mcq",
    stem: "A potentially exempt transfer (PET) is a lifetime gift to another individual. Which statement about a PET is CORRECT?",
    options: [
      "A PET is immediately chargeable to IHT at 20% when made",
      "A PET is charged at 40% at the time it is made",
      "A gift into a discretionary trust is a PET",
      "A PET becomes fully exempt if the donor survives seven years from the gift",
    ],
    correct: 3,
    explanation: "A PET becomes exempt on surviving 7 years and is only ever charged if the donor dies within 7 years. It is not immediately chargeable (that is a CLT at 20%); it is not charged at 40% when made; and a gift into a discretionary trust is a CLT, not a PET.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-17", paper: "ATX", area: "B", type: "number",
    stem: "A chargeable lifetime transfer above the available nil rate band is taxed at 20% if the trustees pay, but at 25% (grossing 20/80) if the DONOR pays the tax. The nil rate band is £325,000. Rhodri makes a CLT of £525,000 into a discretionary trust (no previous transfers, annual exemptions ignored) and agrees to pay the tax himself. What is the lifetime IHT payable, in £?",
    numericAnswer: 50000,
    unit: "£",
    tolerance: 5,
    explanation: "Excess over NRB = £525,000 − £325,000 = £200,000. Donor pays, so 25%: £200,000 × 25% = £50,000. Using 20% (£40,000) applies the trustees-pay rate; taxing the whole £525,000 ignores the nil rate band.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-B-18", paper: "ATX", area: "B", type: "number",
    stem: "In computing IHT on a CLT, the available nil rate band (£325,000) is reduced by the GROSS chargeable transfers in the 7 years before the current gift. In June 2024 Meirion makes a CLT of £250,000 (gross); he had made an earlier CLT of £150,000 (gross) four years earlier. The trustees pay the tax (20%). What is the lifetime IHT on the June 2024 CLT, in £?",
    numericAnswer: 15000,
    unit: "£",
    tolerance: 5,
    explanation: "NRB available = £325,000 − £150,000 = £175,000. Excess = £250,000 − £175,000 = £75,000 × 20% = £15,000. Ignoring cumulation (full £325,000 NRB) gives £0; taxing the whole £250,000 ignores the band.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-19", paper: "ATX", area: "B", type: "mcq",
    stem: "Taper relief reduces the IHT PAYABLE (not the transfer value) on a failed gift where death is more than 3 years after it: 3-4 years 20% reduction, 4-5 years 40%, 5-6 years 60%, 6-7 years 80%. The death IHT on a failed PET before taper is £40,000 and the gift was made 5 years and 6 months before death. What tax is payable after taper relief?",
    options: [
      "£8,000 (80% reduction applied)",
      "£16,000 (60% reduction applied)",
      "£24,000 (40% reduction applied)",
      "£40,000 (no reduction)",
    ],
    correct: 1,
    explanation: "5.5 years falls in the 5-6 year band = 60% reduction, so tax payable = £40,000 × (1 − 0.60) = £16,000. £8,000 applies the 6-7 year 80% reduction; £24,000 applies the 4-5 year 40% reduction; £40,000 forgets taper.",
    marks: 2, difficulty: "medium",
  },

  /* ── IHT: BPR & APR ── */
  {
    id: "ATX2-B-20", paper: "ATX", area: "B", type: "mcq",
    stem: "Business property relief (BPR) gives 100% relief for unquoted trading company shares and unincorporated businesses, and 50% for a controlling quoted holding and for personally-owned assets used by the donor's partnership/controlled company (2-year minimum ownership; no relief for investment businesses). Which qualifies for 100% BPR?",
    options: [
      "A minority holding of quoted shares in a trading company",
      "A buy-to-let residential property portfolio",
      "Land owned personally and used by a company the donor controls",
      "Shares in an unquoted trading company owned for 3 years",
    ],
    correct: 3,
    explanation: "Unquoted trading company shares held 3 years get 100% BPR. A minority quoted holding gets no BPR; a buy-to-let portfolio is an investment business (no BPR); and personally-owned land used by a controlled company gets only 50%.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-21", paper: "ATX", area: "B", type: "mcq",
    stem: "Agricultural property relief (APR) applies to the AGRICULTURAL VALUE of farmland at 100% where the owner has (or can get within 24 months) vacant possession, having owned and farmed it for at least 2 years. Which statement is CORRECT?",
    options: [
      "APR applies to the agricultural value, at 100% for owner-occupied farmland held and farmed for at least 2 years",
      "APR covers the full market value including any development value",
      "APR requires 10 years of ownership in all cases",
      "APR applies only to shares in quoted agricultural companies",
    ],
    correct: 0,
    explanation: "APR relieves the agricultural value at 100% for owner-occupied land farmed for 2+ years. It excludes non-agricultural (development) value; the ownership condition is 2 years owner-occupied (or 7 years let), not 10; and it applies to the land, not only to quoted companies.",
    marks: 2, difficulty: "medium",
  },

  /* ── IHT: death estate, RNRB & taper ── */
  {
    id: "ATX2-B-22", paper: "ATX", area: "B", type: "number",
    stem: "On death the chargeable estate is taxed at 40% above the available nil rate band (£325,000); transfers to a spouse are exempt; debts and funeral costs are deductible. (Ignore the residence nil rate band and lifetime gifts.) Aled's assets total £930,000; a £330,000 legacy passes to his spouse; debts and funeral costs are £30,000; the full £325,000 NRB is available. What is the IHT on the death estate, in £?",
    numericAnswer: 98000,
    unit: "£",
    tolerance: 5,
    explanation: "Chargeable estate = £930,000 − £30,000 debts − £330,000 spouse exemption = £570,000. IHT = (£570,000 − £325,000) × 40% = £245,000 × 40% = £98,000. Forgetting the spouse exemption, or the debts, overstates the estate.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-B-23", paper: "ATX", area: "B", type: "mcq",
    stem: "The residence nil rate band (RNRB) is £175,000 where a qualifying residence passes to direct descendants, tapered by £1 for every £2 by which the estate exceeds £2,000,000. Carys's estate is £2,200,000 and her home (worth £500,000) passes to her children. What RNRB is available?",
    options: [
      "£175,000 — the full RNRB",
      "£0 — the estate exceeds £2,000,000",
      "£75,000 — the £175,000 RNRB reduced by a £100,000 taper",
      "£125,000",
    ],
    correct: 2,
    explanation: "Taper = (£2,200,000 − £2,000,000) / 2 = £100,000; RNRB = £175,000 − £100,000 = £75,000. The full £175,000 ignores the taper; £0 wrongly assumes it is fully lost (that needs an estate of £2,350,000+); £125,000 mis-halves the excess.",
    marks: 2, difficulty: "hard",
  },

  /* ── IHT: relevant property trusts (entry / principal / exit) ── */
  {
    id: "ATX2-B-24", paper: "ATX", area: "B", type: "mcq",
    stem: "A transfer into a relevant property (discretionary) trust is a CLT; the entry charge is 20% (lifetime rate, trustees paying) on the value above the settlor's available nil rate band (£325,000). Eirlys settles £525,000 into a discretionary trust (no prior transfers; trustees pay). What is the entry charge?",
    options: [
      "£105,000 — 20% of the whole £525,000",
      "£40,000 — 20% of the excess over the £325,000 nil rate band",
      "£80,000 — 40% of the excess over the nil rate band",
      "£0 — there is no entry charge on trusts",
    ],
    correct: 1,
    explanation: "Entry charge = (£525,000 − £325,000) × 20% = £200,000 × 20% = £40,000. Charging 20% of the whole gift ignores the NRB; 40% is the death rate, not the lifetime rate; and CLTs certainly do carry an entry charge.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-25", paper: "ATX", area: "B", type: "mcq",
    stem: "Which statement about the principal (10-year anniversary) charge on a relevant property trust is CORRECT?",
    options: [
      "The 10-year charge is 40% of the trust's value",
      "The 10-year charge is 20% of the trust's value",
      "There is no periodic charge on discretionary trusts",
      "The principal charge is a maximum of 6% of the value exceeding the available nil rate band",
    ],
    correct: 3,
    explanation: "The principal charge is a maximum of 6% of the value above the available nil rate band. 40% is the death rate and 20% the lifetime rate — neither is the periodic charge; and relevant property trusts definitely face a periodic (10-year) charge.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-B-26", paper: "ATX", area: "B", type: "mcq",
    stem: "An exit (proportionate) charge can arise when property leaves a relevant property trust. Which statement is CORRECT?",
    options: [
      "It applies when capital leaves the trust, based on the last periodic (or the initial) effective rate, time-apportioned by the number of complete quarters",
      "It is always a flat 6% of the amount distributed",
      "No charge ever arises when property leaves a trust",
      "It is 40% of the amount distributed",
    ],
    correct: 0,
    explanation: "The exit charge uses the effective rate from the last principal charge (or the initial rate before the first 10-year point), time-apportioned by complete quarters since that date. It is not a flat 6%, is not nil, and is not 40% (the death rate).",
    marks: 2, difficulty: "hard",
  },

  /* ── IHT: deeds of variation, QSR, fall-in-value, DTR ── */
  {
    id: "ATX2-B-27", paper: "ATX", area: "B", type: "mcq",
    stem: "A deed of variation can redirect a legacy. Which statement about a deed of variation is CORRECT?",
    options: [
      "It must be made within 6 months of the death",
      "It is treated as a lifetime gift (a PET) by the original beneficiary",
      "It can change only the CGT treatment, never the IHT treatment",
      "Made within 2 years of death with the relevant election, it is read back so the variation is treated as made by the deceased for IHT",
    ],
    correct: 3,
    explanation: "A valid deed of variation within 2 years of death, with the reading-back election, is treated for IHT (and CGT) as if the deceased made the gift — avoiding a PET by the beneficiary. The window is 2 years (not 6 months); it is not a PET by the beneficiary; and it can affect both IHT and CGT.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-28", paper: "ATX", area: "B", type: "mcq",
    stem: "Quick succession relief (QSR) applies where a person dies within 5 years of receiving a transfer on which IHT was paid, reducing the tax on the second death by a percentage of the earlier tax: within 1 year 100%, 1-2 years 80%, 2-3 years 60%, 3-4 years 40%, 4-5 years 20%. Anwen dies 3 years and 6 months after inheriting from an estate on which IHT was paid. Which percentage of the relevant earlier tax gives the QSR?",
    options: [
      "60%",
      "40%",
      "20%",
      "80%",
    ],
    correct: 1,
    explanation: "3.5 years falls in the 3-4 year band = 40%. 60% is the 2-3 year band, 20% the 4-5 year band, and 80% the 1-2 year band — each is the wrong time band.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-29", paper: "ATX", area: "B", type: "mcq",
    stem: "Where a PET or CLT becomes chargeable on death and the asset given has FALLEN in value between the gift and death (and is still held), fall-in-value relief lets the lower value be used to compute the death tax on the gift (the value for cumulation stays at the original figure). Which is CORRECT?",
    options: [
      "The gift is ignored entirely because it fell in value",
      "The original higher value is always used for the death tax",
      "Fall-in-value relief lets the LOWER value at death be used to compute the additional IHT on the failed gift",
      "The relief increases the value charged to tax",
    ],
    correct: 2,
    explanation: "The relief substitutes the lower death-date value in computing the extra IHT on the failed gift. The gift is not ignored (it remains in cumulation at its original figure); the higher value is not forced; and the relief reduces, not increases, the value charged.",
    marks: 2, difficulty: "medium",
  },
  {
    id: "ATX2-B-30", paper: "ATX", area: "B", type: "mcq",
    stem: "IHT double tax relief (unilateral) on an overseas asset is the LOWER of the overseas tax and the UK IHT attributable to the same asset. An estate includes overseas property on which £30,000 of overseas death tax was paid; the UK IHT attributable to it is £34,000. What is the double tax relief?",
    options: [
      "£30,000 — the lower of the overseas tax and the UK IHT",
      "£34,000 — the UK IHT figure",
      "£64,000 — both amounts added together",
      "£4,000 — the difference between them",
    ],
    correct: 0,
    explanation: "DTR = lower of overseas £30,000 and UK £34,000 = £30,000. £34,000 uses the UK figure; £64,000 adds them; £4,000 gives only the residual UK tax after relief, not the relief.",
    marks: 2, difficulty: "easy",
  },

  /* ── CGT & IHT interaction on gifts; investors' relief; further CGT basics ── */
  {
    id: "ATX2-B-31", paper: "ATX", area: "B", type: "mcq",
    stem: "A lifetime gift of a chargeable asset can trigger BOTH CGT (a disposal at market value to a connected person) and be a PET/CLT for IHT. Holdover (s165/s260) is unavailable for a gift of a non-business asset made directly to another individual. Emrys gifts quoted investment shares (a non-business asset) worth £250,000 (cost £100,000) directly to his adult son. Which is CORRECT?",
    options: [
      "No CGT arises because gifts between family members are exempt",
      "s165 holdover defers the £150,000 gain",
      "s260 holdover applies because the gift is a PET",
      "CGT is chargeable now on the £150,000 gain (no holdover — not a business asset and not a CLT), and the gift is also a PET for IHT",
    ],
    correct: 3,
    explanation: "The gain of £250,000 − £100,000 = £150,000 is chargeable now: s165 needs a business asset and s260 needs a CLT, neither of which applies to a direct gift of investments, so no holdover is available. The gift is simultaneously a PET for IHT. Family gifts are not CGT-exempt; s260 applies to CLTs, not PETs.",
    marks: 2, difficulty: "hard",
  },
  {
    id: "ATX2-B-32", paper: "ATX", area: "B", type: "mcq",
    stem: "Investors' relief gives a 10% CGT rate on qualifying gains, with a lifetime limit reduced to £1,000,000 from 6 April 2024. Which statement is CORRECT?",
    options: [
      "Investors' relief requires the investor to be a director of the company",
      "Investors' relief gives a 10% rate with a £1,000,000 lifetime limit, for non-employee investors in newly-subscribed unlisted trading shares held at least 3 years",
      "The investors' relief lifetime limit is £10,000,000",
      "Investors' relief needs only a 1-year holding period",
    ],
    correct: 1,
    explanation: "Investors' relief: 10% rate, £1,000,000 lifetime limit, for non-employee/non-director investors in newly-issued unlisted trading company shares held 3+ years. Being a director/employee generally DISQUALIFIES the investor; the £10m limit is the old figure; and the holding period is 3 years, not 1.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-33", paper: "ATX", area: "B", type: "mcq",
    stem: "A non-wasting chattel is EXEMPT from CGT if the gross disposal proceeds do not exceed £6,000. Non sells an antique clock (cost £2,000) for £5,500. Which is CORRECT?",
    options: [
      "The gain is exempt because the gross proceeds do not exceed £6,000",
      "The £3,500 gain is fully chargeable",
      "The 5/3 marginal rule caps the gain",
      "Only half the gain is chargeable",
    ],
    correct: 0,
    explanation: "Proceeds of £5,500 do not exceed £6,000, so the chattel is exempt — no chargeable gain. The gain is not fully chargeable; the 5/3 marginal rule only applies when proceeds EXCEED £6,000; and there is no half-the-gain rule.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-34", paper: "ATX", area: "B", type: "mcq",
    stem: "The CGT annual exempt amount for 2024/25 is £3,000; residential property gains (not covered by PPR) are taxed at 18% (basic band) and 24% (higher/additional), other gains at 10%/20%. A higher-rate taxpayer makes a £23,000 residential property gain with no reliefs. What is the CGT?",
    options: [
      "£4,600 — 20% on the gain after the AEA",
      "£5,520 — 24% on the full £23,000",
      "£4,800 — £20,000 after the £3,000 AEA at 24%",
      "£2,300 — 10% on the gain after the AEA",
    ],
    correct: 2,
    explanation: "Taxable gain = £23,000 − £3,000 = £20,000 × 24% (residential, higher rate) = £4,800. £4,600 uses the 20% non-residential rate; £5,520 forgets the AEA; £2,300 uses the 10% rate.",
    marks: 2, difficulty: "easy",
  },
  {
    id: "ATX2-B-35", paper: "ATX", area: "B", type: "number",
    stem: "When a donor dies within 7 years of a CLT, the tax is recomputed at 40% on the value above the nil rate band (£325,000) at death, reduced by taper relief and by a credit for the lifetime tax paid (the credit cannot create a repayment). In 2021 Gethin made a CLT of £525,000 (gross, no prior transfers) on which trustees paid 20% lifetime tax; he dies 3 years and 6 months later (3-4 year band, 20% taper reduction). What is the ADDITIONAL IHT payable on death, in £?",
    numericAnswer: 24000,
    unit: "£",
    tolerance: 5,
    explanation: "Death tax before taper = (£525,000 − £325,000) × 40% = £200,000 × 40% = £80,000. Taper (3-4 years, 20% reduction) → £80,000 × 80% = £64,000. Lifetime tax paid = £200,000 × 20% = £40,000 credit. Additional death tax = £64,000 − £40,000 = £24,000. Forgetting the lifetime-tax credit gives £64,000; forgetting taper gives £40,000.",
    marks: 2, difficulty: "hard",
  },
]
