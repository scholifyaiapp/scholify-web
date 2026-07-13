/*
 * Topic Briefs — ACCA Advanced Taxation UK (ATX).
 * One brief per syllabus area (A–E), on the UK Finance Act 2024 (2024/25)
 * basis. Same instruction-layer shape as TOPIC_BRIEFS: concept in plain
 * language, the structures/reliefs/thresholds, a short worked calc, and the
 * classic traps. Figures are stated in the structure section so a learner can
 * see the numbers before meeting a question.
 */

import type { TopicBrief } from "@/lib/acca-briefs"

export const ATX_BRIEFS: TopicBrief[] = [
  /* ───────────────────────── A — Income tax & NIC (advanced) ───────────────────────── */
  {
    paper: "ATX",
    area: "A",
    title: "Income tax & NIC (advanced)",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Taxing the whole person, not just a payslip",
        body: `At TX you learned to slot income into three columns — non-savings, savings, dividends — and tax them in that order. ATX keeps that machinery but asks a harder question: given everything about this individual, how do we shape their affairs so the least tax is paid legally? That means the income tax computation stops being an exercise and becomes a planning canvas.

Three ideas separate ATX from TX here. First, residence and domicile decide HOW MUCH of a person's worldwide income the UK can even touch — a UK resident is taxed on worldwide income, a non-resident only on UK-source income, and a UK-resident-but-non-domiciled individual may use the remittance basis. Second, employment income is fertile planning ground: how someone is rewarded (salary, dividend, benefit, pension contribution, or shares through a tax-advantaged scheme) changes the total of income tax plus National Insurance dramatically. Third, National Insurance is no longer an afterthought — for owner-managers the salary-versus-dividend decision turns entirely on NIC, because dividends bear no NIC at all.

The examiner rewards candidates who read the personal circumstances — age, other income, available reliefs, the pension annual allowance position — and then choose. The number is only half the marks; the reasoned choice is the other half.`,
      },
      {
        kind: "structure",
        heading: "Rates, reliefs and the schemes (FA2024, 2024/25)",
        body: `Rates and bands:
Personal allowance £12,570, abated £1 for every £2 of adjusted net income over £100,000 (fully lost at £125,140).
Basic rate band £37,700 (20% non-savings, 8.75% dividends), higher rate to £125,140 (40% / 33.75%), additional rate above (45% / 39.35%).
Dividend allowance £500; personal savings allowance £1,000 basic / £500 higher / £0 additional.

National Insurance:
Class 1 employee 8% between £12,570 and £50,270, then 2%; employer 13.8% over £9,100 (£5,000 employment allowance).
Class 4 self-employed 6% between £12,570 and £50,270, then 2%; Class 2 no longer compulsory.
Dividends carry NO NIC — the heart of profit-extraction planning.

Pensions:
Annual allowance £60,000, tapered by £1 for every £2 of adjusted income over £260,000 (threshold income over £200,000) down to a £10,000 minimum; unused allowance carried forward 3 years.

Residence and domicile:
Statutory Residence Test — automatic overseas, automatic UK, then sufficient-ties test.
Remittance basis charge £30,000 (UK resident 7 of last 9 years) or £60,000 (12 of last 14); deemed UK domicile after 15 of the last 20 tax years.

Tax-advantaged share schemes:
EMI (options up to £250,000, trading company with gross assets ≤ £30m), CSOP (£60,000), SAYE, and the Share Incentive Plan — generally no income tax on the growth if conditions are met.`,
      },
      {
        kind: "example",
        heading: "Worked example — salary top-up vs dividend",
        body: `A director-shareholder already has a £12,570 salary and wants a further £10,000 of company profit in her hands. She is a higher-rate taxpayer. Compare the two routes on the extra £10,000 of company profit.

Route 1 — extra salary £10,000:
Employer NIC 13.8% = £1,380, so only £8,620 of salary is affordable within the £10,000.
On £8,620: income tax 40% = £3,448; employee NIC 2% = £172.
Net to director = 8,620 − 3,448 − 172 = £5,000.

Route 2 — dividend £10,000 (paid after 25% corporation tax already suffered on profit):
Company profit £10,000 less CT at 25% = £7,500 dividend.
Dividend tax at 33.75% (allowance already used) = £2,531.
Net to director = 7,500 − 2,531 = £4,969.

Here the two routes land within £31 of each other once corporation tax is layered in — which is the real ATX lesson: the answer flips with the CT rate, the NIC position and whether allowances remain. Never quote the TX rule of thumb without running both columns.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Forgetting employer's NIC when comparing salary and dividend — it is a real cost of the salary route and changes the winner.

Using gross income instead of adjusted net income for the personal allowance taper and the pension taper — Gift Aid and pension contributions reduce the figure.

Applying the full £60,000 annual allowance to a high earner — check the taper, then check three years of carry-forward before charging an excess.

Assuming worldwide income is always taxed — a non-domiciled remittance-basis user is taxed only on UK income and amounts actually remitted, but loses the personal allowance and pays the RBC.

Treating shares from any scheme as tax-free — only tax-advantaged schemes (EMI, CSOP, SAYE, SIP) get the reliefs, and only if every condition holds.`,
      },
    ],
  },

  /* ───────────────────────── B — Chargeable gains & IHT (advanced) ───────────────────────── */
  {
    paper: "ATX",
    area: "B",
    title: "Chargeable gains & IHT (advanced)",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "Two taxes on the same wealth — and the reliefs that stop double pain",
        body: `Capital gains tax and inheritance tax both bite when assets move, and at ATX they are examined together because they interact. A lifetime gift can trigger CGT now (a disposal at market value) and IHT later (if the donor dies within seven years). The examiner wants you to see the whole timeline of an asset and pick reliefs that soften both taxes without falling foul of the conditions.

For CGT the advanced skill is relief selection. Business owners can defer, hold over or reduce the rate on a gain — gift relief, rollover relief, incorporation relief and Business Asset Disposal Relief each have their own trigger and their own price. Choosing wrongly wastes an annual exempt amount or a once-in-a-lifetime allowance.

For IHT the advanced skill is the seven-year timeline plus the two business shelters, Business Property Relief and Agricultural Property Relief, which can take qualifying assets out of charge entirely. Layer on the residence nil rate band, the transferable nil rate band between spouses, and relevant property trusts, and IHT becomes a planning discipline rather than a single 40% multiplication.`,
      },
      {
        kind: "structure",
        heading: "Rates, exemptions and reliefs (FA2024, 2024/25)",
        body: `Capital gains tax:
Annual exempt amount £3,000. Rates 10% / 20% on most assets, 18% / 24% on residential property.
Business Asset Disposal Relief — 10% on qualifying gains, £1m lifetime limit, needs a 2-year qualifying period (trading company with 5%+ personal-company holding, or unincorporated business).
Investors' relief — 10%, separate £1m lifetime limit (reduced from £10m).
Gift (holdover) relief s165 — defers the gain on gifts of business assets and unquoted trading-company shares; donee takes the reduced base cost.
Rollover relief s152 — defers gain on business assets reinvested in new qualifying assets between 12 months before and 36 months after.
Incorporation relief s162 — automatic where the whole business (bar cash) is transferred as a going concern for shares; gain rolled into the share base cost.
EIS / SEIS / VCT — EIS 30% income tax relief and CGT deferral (exempt after 3 years); SEIS 50% relief and 50% reinvestment relief; VCT 30% relief, exempt dividends.

Inheritance tax:
Nil rate band £325,000; residence nil rate band £175,000 (tapered £1 for every £2 of estate over £2m).
Death rate 40% (36% if 10%+ of the estate left to charity); lifetime chargeable transfers 20% when the trust pays.
Taper relief cuts the tax (not the transfer) on gifts made 3–7 years before death.
BPR — 100% (unquoted trading business/shares) or 50% (quoted controlling holdings, assets used by the business); 2-year ownership.
APR — 100% or 50% on agricultural value of farmland.
Relevant property trusts — 20% entry charge above the NRB, plus 10-year principal and exit charges (max 6%).`,
      },
      {
        kind: "example",
        heading: "Worked example — gift of trading company shares",
        body: `A father gives his adult daughter shares in his unquoted trading company (his 100% holding). Market value £900,000; his original cost £100,000. He has made no earlier disposals and dies four years later still owning nothing else exceptional.

CGT at the gift:
Gain = 900,000 − 100,000 = £800,000.
Gift relief (s165) is available on unquoted trading-company shares — elect to hold over, so no CGT now. Daughter's base cost becomes 900,000 − 800,000 = £100,000.
(If instead he wanted BADR, £800,000 taxed at 10% = £80,000, but that spends his relief; holdover usually wins for a family succession.)

IHT on the gift (a potentially exempt transfer that fails):
Transfer of value £900,000, but BPR at 100% applies to unquoted trading-company shares held 2+ years — chargeable value after BPR = £nil, provided the daughter still holds qualifying shares at his death.
IHT = £nil.

The pairing is the point: one gift, two taxes, both reduced to nil by matching the right relief to each — gift relief for CGT, BPR for IHT.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Claiming BADR and gift relief on the same gain — you cannot; holding a gain over removes the disposal that BADR would tax. Choose one.

Assuming BPR survives to death automatically — it requires the recipient to still hold qualifying property (with replacement rules) at the donor's death; sell it and the relief on the failed PET is lost.

Applying taper relief to the transfer — taper reduces the IHT payable, not the value transferred, and only where the gift is 3+ years before death.

Forgetting the residence nil rate band taper — it is withdrawn £1 for every £2 once the estate exceeds £2m, so a large estate may get none.

Mixing up the two 10% reliefs — Business Asset Disposal Relief and Investors' relief each have their own £1m lifetime limit and different conditions (Investors' relief needs no employment and a 3-year hold).`,
      },
    ],
  },

  /* ───────────────────────── C — Corporation tax (advanced) ───────────────────────── */
  {
    paper: "ATX",
    area: "C",
    title: "Corporation tax (advanced)",
    minutes: 7,
    sections: [
      {
        kind: "concept",
        heading: "From one company to a group brain",
        body: `TX taught you to compute a single company's taxable total profits. ATX zooms out to the group and the international dimension: how do companies share losses and gains, how does the UK tax overseas activity, and how do anti-avoidance rules such as controlled foreign companies and the close-company charges stop profit being parked where it should not be?

The organising idea is that groups are taxed as related but separate entities. They do not file one return, but the law lets them move certain tax attributes between members: trading losses through group relief, and chargeable assets (and gains) through the chargeable gains group. Each relief has its own ownership threshold, and mixing them up is the single most common ATX error.

The second idea is that the UK cannot tax the world, so it uses reliefs (double tax relief, the substantial shareholding exemption) to avoid over-taxing genuine overseas activity, and anti-avoidance rules (CFC apportionment, transfer pricing) to claw back artificially diverted profit. The third idea is incentives — the R&D regime deliberately over-rewards qualifying innovation. ATX asks you to spot which regime applies and quantify it.`,
      },
      {
        kind: "structure",
        heading: "Rates, limits and group rules (FA2024, FY2024)",
        body: `Rates:
Main rate 25% where augmented profits exceed £250,000; small profits rate 19% at or below £50,000.
Between the two, marginal relief applies, fraction 3/200.
The £50,000 and £250,000 limits are divided by the number of associated companies and time-apportioned for short periods.
Augmented profits = taxable total profits + exempt distributions from non-group companies.

Groups:
Group relief group — 75% direct and indirect ownership; surrender current-year trading losses, excess interest, and more between members.
Chargeable gains group — 75% direct subsidiaries but only 51% effective ownership throughout; assets pass at no gain/no loss and gains/losses can be reallocated by election.
Substantial shareholding exemption — gain on selling a 10%+ trading subsidiary held 12 months is exempt.

International:
Double tax relief — lower of UK and overseas tax on the same income.
Controlled foreign company rules — apportion a low-taxed overseas subsidiary's profits to UK owners unless an exemption applies.
Transfer pricing — connected-party transactions restated to arm's length.

Incentives and close companies:
R&D — merged RDEC scheme gives a 20% taxable expenditure credit; loss-making R&D-intensive SMEs (40%+, or 30%+ from April 2024) use the enhanced scheme.
Close company — controlled by 5 or fewer participators; a loan to a participator triggers a s455 charge of 33.75%, repaid when the loan is.`,
      },
      {
        kind: "example",
        heading: "Worked example — marginal relief and associates",
        body: `A standalone UK company has taxable total profits of £120,000 and no dividends from other companies, for the year to 31 March 2025. It has one associated company.

Step 1 — adjust the limits for associates:
Lower limit 50,000 / 2 = £25,000; upper limit 250,000 / 2 = £125,000.
Augmented profits £120,000 fall between them, so marginal relief applies.

Step 2 — tax at main rate then deduct marginal relief:
Corporation tax 120,000 × 25% = £30,000.
Marginal relief = 3/200 × (125,000 − 120,000) = 3/200 × 5,000 = £75.
Corporation tax payable = 30,000 − 75 = £29,925.
Effective rate ≈ 24.9%.

Step 3 — see the associate effect:
With no associate the upper limit would be £250,000 and profits of £120,000 would attract far more marginal relief. Halving the limits pushed this company almost to the full 25% — which is exactly why identifying associated companies is worth real marks.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Confusing the two group thresholds — 75% for group (loss) relief but only 51% effective for a chargeable gains group; a 60% sub-subsidiary can be in a gains group yet outside the loss group.

Forgetting to divide the £50,000 / £250,000 limits by associated companies (and to time-apportion for short accounting periods) — this changes the rate and the marginal relief.

Adding group dividends to augmented profits — only distributions from NON-group companies count.

Overlooking the s455 charge on a director-shareholder's overdrawn loan account in a close company, and its repayment refund.

Claiming SME R&D enhanced relief for a profitable large group — the merged RDEC scheme now applies; the enhanced scheme is only for loss-making R&D-intensive SMEs.`,
      },
    ],
  },

  /* ───────────────────────── D — VAT & stamp taxes ───────────────────────── */
  {
    paper: "ATX",
    area: "D",
    title: "VAT & stamp taxes",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "The tax on transactions, not profits",
        body: `VAT and stamp taxes are transaction taxes: they are charged when something is supplied or transferred, regardless of whether anyone made a profit. At ATX the mechanical VAT return you met at TX is assumed; the new skill is handling the awkward situations — partial exemption, land and buildings, groups, transfers of a business, and overseas supplies — where getting the recovery or the registration right is worth serious money.

The core VAT idea is that a business charges output VAT on its taxable supplies and recovers input VAT on its purchases, remitting the difference. Trouble starts when a business makes exempt supplies too, because input tax on exempt activity is generally irrecoverable. Partial exemption is the framework that splits the input tax, and the capital goods scheme is the long-term correction mechanism for big property and computer spend.

Stamp taxes are simpler in idea but easy to forget: transferring shares attracts stamp duty, transferring land attracts a land transaction tax, and each has its own rate and jurisdiction. ATX wants you to flag the stamp cost of a transaction the rest of the answer is about.`,
      },
      {
        kind: "structure",
        heading: "Rates, thresholds and special schemes (FA2024)",
        body: `Core VAT:
Standard rate 20%, reduced 5%, plus zero-rated and exempt categories.
Registration threshold £90,000 of taxable supplies (historic 12 months, or next-30-days expectation); deregistration threshold £88,000.

Partial exemption:
Input tax is split into attributable-to-taxable (recoverable), attributable-to-exempt (not), and residual (apportioned, usually by turnover).
De minimis — exempt input tax is fully recoverable if it averages ≤ £625 a month AND is ≤ 50% of total input tax.

Capital goods scheme:
Land and buildings costing £250,000+ — adjust recovery over 10 years for changes in taxable use.
Computers and single items of £50,000+ — adjust over 5 years.

Groups and transfers:
VAT group registration — one return, intra-group supplies ignored; members jointly and severally liable.
Transfer of a going concern — outside the scope of VAT if conditions are met, so no VAT is charged on the sale.
Option to tax — turns exempt commercial land/buildings into standard-rated so input tax becomes recoverable.

Overseas:
Reverse charge — the UK customer accounts for VAT on many services received from abroad.

Stamp taxes:
Shares — stamp duty / SDRT at 0.5%.
Land — SDLT (England and NI), LBTT (Scotland) or LTT (Wales), at progressive slice rates.`,
      },
      {
        kind: "example",
        heading: "Worked example — the de minimis test",
        body: `A business has input tax of: £40,000 wholly attributable to taxable supplies, £3,000 wholly attributable to exempt supplies, and £10,000 residual. Its taxable turnover is 80% of the total.

Step 1 — apportion the residual (by turnover):
Recoverable residual = 10,000 × 80% = £8,000.
Exempt residual = 10,000 × 20% = £2,000.

Step 2 — total the exempt input tax:
Exempt = 3,000 (direct) + 2,000 (residual) = £5,000.
Monthly average = 5,000 / 12 = £417, which is ≤ £625.
Exempt as a share of total input tax = 5,000 / 53,000 = 9.4%, which is ≤ 50%.

Step 3 — apply de minimis:
Both limbs are met, so ALL input tax is recoverable — the full £53,000, including the £5,000 that related to exempt supplies.

Miss the de minimis check and you would wrongly block £5,000 of recovery — a classic ATX marks-loser.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Ignoring the de minimis test and blocking exempt input tax that is in fact fully recoverable.

Forgetting the capital goods scheme when taxable use of a £250,000+ building changes after purchase — annual adjustments run for 10 years.

Charging VAT on a transfer of a going concern — a qualifying TOGC is outside the scope, so no VAT arises.

Mixing up the registration and deregistration thresholds (£90,000 vs £88,000), or testing only the historic limit and missing the future-30-days test.

Overlooking the 0.5% stamp duty on a share purchase, or applying SDLT rates in Scotland or Wales where LBTT / LTT apply instead.`,
      },
    ],
  },

  /* ───────────────────────── E — Tax planning & ethics ───────────────────────── */
  {
    paper: "ATX",
    area: "E",
    title: "Tax planning & ethics",
    minutes: 6,
    sections: [
      {
        kind: "concept",
        heading: "Planning that survives daylight",
        body: `ATX is not a game of finding the smallest number. The examiner tests whether you can plan tax efficiently AND recognise where legitimate planning ends and unacceptable avoidance — or outright evasion — begins. Every technical recommendation in the exam sits inside an ethical frame, and marks are lost by candidates who advise a saving without flagging its risks.

Start with the vocabulary. Tax mitigation uses reliefs as Parliament intended (an ISA, a pension contribution) and is entirely proper. Tax avoidance bends the law to an outcome it did not intend and may be challenged. Tax evasion is illegal — hiding income, falsifying figures — and can bring criminal liability and a money-laundering report. The adviser's job is to keep clients firmly on the right side of that line.

The professional overlay is the Professional Conduct in Relation to Taxation (PCRT) framework, built on five fundamental principles and specific standards for tax planning. Around it sit statutory defences: the General Anti-Abuse Rule catches abusive schemes, and disclosure rules force certain arrangements into the open. Good ATX answers weave the numbers and this ethical judgement together.`,
      },
      {
        kind: "structure",
        heading: "The frameworks and the levers (FA2024)",
        body: `Ethical framework — PCRT five fundamental principles:
Integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour.
Plus PCRT standards for tax planning — advice must be based on a credible view of the law, not contrived or artificial steps.

The avoidance boundary:
Mitigation (intended use of reliefs) — proper.
Avoidance (unintended use, may be challenged) — GAAR applies a double-reasonableness test to abusive arrangements; DOTAS requires disclosure of notifiable schemes.
Evasion (illegal) — triggers a Suspicious Activity Report under the money-laundering regime; the adviser must not tip off.

Adviser duties:
New client — obtain professional clearance and verify identity (AML).
Errors — advise the client to disclose to HMRC; if they refuse, consider ceasing to act.
Conflicts and confidentiality must be managed.

Planning levers ATX rewards:
Choice of business medium — sole trader vs company (NIC, profit extraction, loss use, incorporation relief).
Profit extraction — salary vs dividend vs pension vs benefits.
Timing — accelerate or defer disposals to use annual exemptions and lower bands across tax years.
Using reliefs already in the syllabus — gift, rollover, EIS/SEIS, BPR/APR, group relief.
Overall goal: the lowest legal liability, clearly explained, with the risks disclosed.`,
      },
      {
        kind: "example",
        heading: "Worked example — timing a gain across two years",
        body: `An individual plans to sell two assets, each showing a £3,000 gain, and is a basic-rate taxpayer with capital to spare in the basic rate band. Both fall due for disposal in March 2025.

Option 1 — sell both in 2024/25:
Total gains £6,000, less one annual exempt amount £3,000 = £3,000 taxable.
CGT at 10% = £300.

Option 2 — sell one in March 2025 and one in April 2025 (next tax year):
Year 2024/25 — gain £3,000, covered fully by the £3,000 annual exempt amount = £nil.
Year 2025/26 — gain £3,000, covered by that year's annual exempt amount = £nil.
CGT = £nil.

Simply straddling the 5 April year end uses two annual exempt amounts instead of one and saves the whole £300 — legitimate mitigation, no artificiality, exactly the kind of timing advice the examiner wants, with the point noted that the second exemption depends on it still being available.`,
      },
      {
        kind: "traps",
        heading: "Classic traps",
        body: `Recommending a saving without flagging its risk or ethical status — ATX marks reward the caveat as much as the number.

Blurring avoidance and evasion — evasion is illegal and reportable; do not describe an evasion scheme as clever planning.

Forgetting the adviser's own duties — professional clearance, client identity checks (AML), and advising disclosure of errors to HMRC.

Tipping off — you must not tell a client that a Suspicious Activity Report has been or will be made.

Treating GAAR or DOTAS as optional background — an abusive arrangement can be counteracted under GAAR and a notifiable scheme must be disclosed, regardless of how attractive the saving looks.`,
      },
    ],
  },
]
