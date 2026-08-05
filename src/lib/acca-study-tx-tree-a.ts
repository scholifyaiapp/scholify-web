import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-UK · Area A — the UK tax system and its administration. Chapters 1–3.
 *
 * ── Why TX needed a tree at all ──────────────────────────────────
 * TX was taught in SEVEN chapters for a SEVEN-area syllabus, and Area B alone — income
 * tax and NIC — is eleven chapters of any approved-provider text: the computation,
 * property income, employment income and benefits, pensions, adjustment of trading
 * profit, capital allowances, partnerships, losses and national insurance. One chapter
 * for all of that is not a compression, it is an omission.
 *
 * ── The FA2025 basis ─────────────────────────────────────────────
 * Every rate, band, threshold and limit in this tree is on the FA2025 (2025/26) basis and
 * was transcribed from the exam's own rate sheet rather than recalled. Several changed in
 * ways that catch people out: the CGT annual exempt amount is now £3,000, CGT rates are
 * 18% and 24%, business asset disposal relief is taxed at 14%, employer NIC starts at
 * £5,000 and is charged at 15%, the employment allowance is £10,500, and the high income
 * child benefit charge now bites between £60,000 and £80,000.
 *
 * Where a figure is on the rate sheet the content says so, because the exam supplies it
 * and a candidate should not be memorising it.
 *
 * All wording is ORIGINAL Scholify teaching text; the approved-provider texts were used
 * only as a benchmark for structure and depth.
 */

/* ── Chapter 1 · A1 ───────────────────────────────────────────── */

export const TX_TREE_01: StudyChapter = {
  id: "TX-01",
  number: 1,
  paper: "TX",
  area: "A",
  title: "The UK tax system: purpose, sources and ethics",
  minutes: 16,
  syllabusRefs: ["A1(a)", "A1(b)", "A2(a)", "A2(b)", "A3(a)", "A4(a)", "A5(a)"],
  intro:
    "Ten or so marks of every TX paper come from this area, and almost none of it is computational. It is also where the ethics question lives, which candidates reliably answer badly.",
  outcomes: [
    "Explain the economic and social purposes of taxation",
    "Distinguish direct from indirect, and capital from revenue taxes",
    "Identify the sources of UK revenue law and the role of HMRC",
    "Distinguish tax avoidance from tax evasion and explain the GAAR",
    "Explain the ethical and professional obligations of a tax adviser",
  ],
  sections: [
    {
      id: "structure-and-sources",
      heading: "What the taxes are, and where the law comes from",
      blocks: [
        {
          kind: "table",
          caption: "The UK taxes examined in TX",
          head: ["Tax", "Direct or indirect", "Charged on", "Paid by"],
          rows: [
            ["**Income tax**", "Direct", "Income of individuals, partners and trustees", "The person receiving the income"],
            ["**National insurance**", "Direct", "Earnings and trading profits", "Employees, employers and the self-employed"],
            ["**Capital gains tax**", "Direct, and a **capital** tax", "Gains on the disposal of chargeable assets by individuals", "The person disposing"],
            ["**Inheritance tax**", "Direct, and a **capital** tax", "Transfers of value in life and on death", "The transferor, or the estate"],
            ["**Corporation tax**", "Direct", "A company's income AND chargeable gains", "The company"],
            ["**Value added tax**", "**Indirect**", "The supply of goods and services", "Borne by the final consumer, collected by the trader"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Direct against indirect, and revenue against capital",
          md: "A **direct** tax is charged on the person who bears it — income tax, NIC, CGT, IHT and corporation tax. An **indirect** tax is collected by someone other than the person who bears it: VAT is charged by a trader and borne by the final consumer, which is why a registered trader is a collector rather than a taxpayer for most of it. Separately, a **revenue** tax is charged on income and a **capital** tax on wealth or on gains from disposing of it — so CGT and IHT are capital taxes while income tax is a revenue tax. Corporation tax is the exception worth remembering: it charges a company's **income and its chargeable gains together**, so companies pay no CGT.",
        },
        {
          kind: "list",
          title: "The sources of UK revenue law, in order of authority",
          items: [
            "**Acts of Parliament** — the consolidating Acts (ITEPA 2003, ITTOIA 2005, ITA 2007, CTA 2009 and 2010, TCGA 1992, IHTA 1984, VATA 1994) as amended each year by the **annual Finance Act**. TX is examined on a stated Finance Act, and this content is on **FA2025**.",
            "**Statutory instruments** — detailed regulations made under powers an Act confers, used where the detail changes too often for primary legislation.",
            "**Case law** — court decisions interpreting the statute. They bind, and much of what \"trading\" and \"employment\" mean comes from here rather than from any Act.",
            "**HMRC guidance** — statements of practice, extra-statutory concessions, briefs and the internal manuals. These state HMRC's **view**, and are **not law**: a taxpayer may argue against them and a tribunal may disagree with them.",
          ],
        },
        {
          kind: "text",
          md: "**HM Revenue & Customs** administers the system: it collects the taxes, checks returns, conducts enquiries, charges penalties and pays credits. Appeals against its decisions go first to internal review or to the **First-tier Tribunal**, then to the **Upper Tribunal** on a point of law, then to the Court of Appeal and the Supreme Court. The distinction to hold on to is that HMRC **administers** the law and does not make it — a point that decides several exam questions about the status of its manuals.",
        },
        {
          kind: "callout",
          tone: "key",
          title: "The purposes of taxation, which is a discussion mark",
          md: "**Economic** — raising revenue to fund public spending, and influencing behaviour through the tax system: ISAs and the savings nil rate band encourage saving, capital allowances encourage investment, and duties on fuel, alcohol and tobacco discourage consumption. **Social** — redistributing wealth through progressive rates and through inheritance tax, and encouraging socially desirable behaviour such as charitable giving through gift aid. **Environmental** — the car benefit percentages and capital allowance rates are both graded by CO2 emissions, so the tax system prices the externality directly. Naming a **specific TX provision** as the example is what turns a general statement into a mark.",
        },
      ],
      check: {
        q: "Which statement about HMRC's published manuals is correct?",
        options: [
          "They have the force of law and bind the tribunals",
          "They state HMRC's view of the law, are not law themselves, and a tribunal may disagree with them",
          "They are statutory instruments made under the Finance Act",
          "They bind HMRC but not the taxpayer",
        ],
        correct: 1,
        explain:
          "THEY ARE HMRC'S VIEW, NOT LAW. The manuals, statements of practice and briefs set out how HMRC interprets and applies the legislation. A taxpayer may argue a different interpretation and a tribunal may accept it — which is why they sit at the bottom of the hierarchy of sources.",
      },
    },
    {
      id: "avoidance-evasion-ethics",
      heading: "Avoidance, evasion, the GAAR and the adviser's obligations",
      blocks: [
        {
          kind: "table",
          caption: "The distinction the exam tests",
          head: ["", "Tax avoidance", "Tax evasion"],
          rows: [
            ["**Legality**", "**Legal** — using the rules to reduce liability", "**Illegal** — a criminal offence"],
            ["**What it involves**", "Arranging affairs within the law; ranges from wholly acceptable to artificial", "Misrepresenting or concealing the facts: understating income, overstating expenses, hiding a source"],
            ["**Examples**", "Using an ISA, claiming capital allowances, transferring an asset to a spouse before disposal", "Failing to declare rental income, inventing expenses, keeping a second set of records"],
            ["**HMRC's response**", "Specific anti-avoidance rules, the GAAR, disclosure regimes", "Investigation, penalties of up to 100% of the tax, and prosecution"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Avoidance is not one thing, and saying so earns the mark",
          md: "The exam does not want \"avoidance is legal and evasion is illegal\" and nothing more. Avoidance runs on a **spectrum**: putting savings in an ISA is precisely what Parliament intended, and an artificial series of transactions with no commercial purpose other than a tax advantage is at the far end. The **General Anti-Abuse Rule** exists for that far end — it lets HMRC counteract **abusive** arrangements that cannot reasonably be regarded as a reasonable course of action, even where each individual step complies with the letter of the law. So the honest statement is that avoidance is legal but not therefore acceptable, and the GAAR is where the line now sits.",
        },
        {
          kind: "example",
          title: "Applying the ethical framework to a client",
          scenario:
            "You act for Danesbury Ltd and for its managing director personally. While preparing the company's corporation tax return you notice that the director's personal return, which your firm submitted last year, omitted £14,000 of rental income from a flat you know he owns. He tells you the omission was deliberate, refuses to correct it, and asks you to \"just get on with the company return\".",
          steps: [
            { label: "Identify what this is", detail: "Deliberately omitting known income is EVASION, not avoidance. It is a criminal offence, and because it involves the proceeds of a crime it also engages the money laundering regime." },
            { label: "Establish the facts before acting", detail: "Confirm the flat is his, that the income is taxable in that year after expenses, and that the omission is genuinely deliberate rather than an error. Do not act on an assumption — the first step in any ethics answer is to get the facts straight." },
            { label: "Advise the client to disclose", detail: "Explain the consequences: interest, a penalty for a DELIBERATE error of up to 70% of the tax, reduced to as little as 20% for an unprompted disclosure, and the possibility of prosecution. Set out that an unprompted disclosure is materially cheaper than being found." },
            { label: "If he still refuses, cease to act", detail: "You cannot continue to act for a client who will not correct a known deliberate error, because doing so would associate you with a misleading return. Notify him in writing that you are ceasing to act, and give the reason." },
            { label: "Make a money laundering report", detail: "Report to your firm's Money Laundering Reporting Officer, or directly to the National Crime Agency where you are a sole practitioner. Do this WITHOUT telling the client you have done so — informing him would be the separate offence of TIPPING OFF." },
            { label: "Do NOT notify HMRC of the reason", detail: "You may tell HMRC that you no longer act, but you must NOT disclose the client's affairs to them without his consent or a legal obligation to do so. Client confidentiality survives the end of the engagement; the money laundering report is the route the law provides." },
            { label: "Consider the conflict on the company engagement", detail: "You act for both the company and the director. Continuing to act for Danesbury Ltd may be possible, but consider whether the relationship and your knowledge create a conflict, and whether the company's own records are affected." },
          ],
          result:
            "**Advise disclosure, cease to act if he refuses, report internally or to the NCA, and do not tell the client you have reported.** The two points candidates most often miss are that you must not disclose to HMRC without consent, and that telling the client about the report is itself an offence.",
        },
        {
          kind: "list",
          title: "The five fundamental principles, applied to tax work",
          items: [
            "**Integrity** — be straightforward and honest. You cannot be associated with a return you know to be misleading.",
            "**Objectivity** — do not let bias, conflict of interest or undue influence override professional judgement, which is the issue where you act for both parties to a transaction.",
            "**Professional competence and due care** — keep up to date, and only take on work you are competent to do. Tax changes every year, which makes this a live obligation rather than a formality.",
            "**Confidentiality** — do not disclose client information without authority or a legal duty. This is what prevents you telling HMRC why you resigned.",
            "**Professional behaviour** — comply with relevant laws and regulations and avoid conduct that discredits the profession.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "How to answer a TX ethics requirement",
          md: "Work in this order and the marks follow: **name the issue** (is it error, avoidance or evasion?); **identify the principle** at risk; **state the steps** in sequence — establish the facts, advise the client, seek disclosure, cease to act if refused, report under the money laundering regime; and **state the two prohibitions** — no disclosure to HMRC without consent, and no tipping off. A generic answer about \"acting ethically\" scores almost nothing; the marks are in the specific sequence.",
        },
      ],
      check: {
        q: "A client refuses to correct a deliberate omission from a previous return. What must you NOT do?",
        options: [
          "Cease to act for the client",
          "Tell the client that you have made a money laundering report",
          "Report to your firm's Money Laundering Reporting Officer",
          "Advise the client of the penalties for a deliberate error",
        ],
        correct: 1,
        explain:
          "TELLING THE CLIENT ABOUT THE REPORT IS TIPPING OFF, a separate criminal offence. You should cease to act, report internally or to the NCA, and advise the client of the consequences of the error — but the report itself must not be disclosed to them, and you must not disclose their affairs to HMRC without consent.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Saying only that avoidance is legal and evasion is illegal.",
      fix: "Add that avoidance runs on a spectrum and that the GAAR counteracts abusive arrangements at the far end.",
    },
    {
      trap: "Treating HMRC's manuals as law.",
      fix: "They state HMRC's view. Acts, statutory instruments and case law are the law.",
    },
    {
      trap: "Telling HMRC why you resigned from an engagement.",
      fix: "Confidentiality prevents it. You may say you no longer act, but not why.",
    },
    {
      trap: "Informing the client that a money laundering report has been made.",
      fix: "That is tipping off, a separate offence.",
    },
    {
      trap: "Answering an ethics requirement in generalities.",
      fix: "Name the issue, the principle, the steps in order, and the two prohibitions.",
    },
  ],
  keyTerms: [
    { term: "Direct tax", def: "A tax charged on and borne by the same person, such as income tax or corporation tax." },
    { term: "Indirect tax", def: "A tax collected by one person and borne by another; VAT is the TX example." },
    { term: "Capital tax", def: "A tax on wealth or on gains from disposing of it — CGT and IHT." },
    { term: "Tax avoidance", def: "Legally arranging affairs to reduce a liability, ranging from intended to abusive." },
    { term: "Tax evasion", def: "Illegally misrepresenting or concealing facts to reduce a liability; a criminal offence." },
    { term: "GAAR", def: "The General Anti-Abuse Rule, which counteracts abusive arrangements that comply with the letter of the law." },
    { term: "Tipping off", def: "Telling a person that a money laundering report has been made about them; a criminal offence." },
  ],
  summary: [
    "Income tax, NIC, CGT, IHT and corporation tax are direct; VAT is indirect and borne by the final consumer.",
    "Corporation tax charges a company's income and its chargeable gains together, so companies pay no CGT.",
    "The sources are Acts as amended by the annual Finance Act, statutory instruments, case law, then HMRC guidance, which is not law.",
    "Avoidance is legal and runs on a spectrum; the GAAR counteracts abusive arrangements. Evasion is criminal.",
    "On discovering evasion: advise disclosure, cease to act if refused, report — but never disclose to HMRC without consent and never tip off.",
  ],
  knowledgeDiagnostic: [
    { q: "Why do companies pay no capital gains tax?", a: "Because corporation tax charges a company's chargeable gains alongside its income, in one computation." },
    { q: "What is the status of HMRC's manuals?", a: "They state HMRC's view of the law. They are not law, and a tribunal may reach a different interpretation." },
    { q: "What does the GAAR do?", a: "It allows HMRC to counteract abusive arrangements that cannot reasonably be regarded as a reasonable course of action, even where each step complies with the letter of the law." },
    { q: "Name the two things an adviser must NOT do on discovering a client's deliberate error.", a: "Disclose the client's affairs to HMRC without consent, and tell the client that a money laundering report has been made — which is tipping off." },
    { q: "Give one environmental purpose of the UK tax system with a TX example.", a: "Discouraging emissions: both the company car benefit percentages and the capital allowance rates for cars are graded by CO2 emissions." },
  ],
}

/* ── Chapter 2 · A2–A4 ────────────────────────────────────────── */

export const TX_TREE_02: StudyChapter = {
  id: "TX-02",
  number: 2,
  paper: "TX",
  area: "A",
  title: "Tax administration for individuals: returns, payments and penalties",
  minutes: 18,
  syllabusRefs: ["A2(c)", "A3(b)", "A3(c)", "A4(b)", "A4(c)", "A4(d)"],
  intro:
    "Dates and penalties are pure marks — they are stated facts, they appear in almost every sitting, and they are the cheapest marks in the paper to secure.",
  outcomes: [
    "State the filing dates for a self assessment return and the consequences of missing them",
    "Compute payments on account and the balancing payment, and their due dates",
    "Explain when a payment on account is not required or can be reduced",
    "Apply the penalty regimes for late filing, late payment and errors",
    "Explain HMRC's enquiry and discovery powers and the record-keeping requirements",
  ],
  sections: [
    {
      id: "returns-and-payments",
      heading: "Filing dates, payments on account and the balancing payment",
      blocks: [
        {
          kind: "table",
          caption: "Self assessment: the dates for 2025/26",
          head: ["Event", "Date", "Note"],
          rows: [
            ["Tax year ends", "**5 April 2026**", "The year of assessment runs 6 April to 5 April"],
            ["**Paper** return filing date", "**31 October 2026**", "Later of this and 3 months from the notice to file"],
            ["**Electronic** return filing date", "**31 January 2027**", "Later of this and 3 months from the notice to file"],
            ["**1st payment on account**", "**31 January 2026**", "During the tax year — half of the PREVIOUS year's relevant amount"],
            ["**2nd payment on account**", "**31 July 2026**", "The other half"],
            ["**Balancing payment**", "**31 January 2027**", "The rest of the income tax and Class 4 NIC, plus ALL of the CGT"],
            ["Records kept — **business**", "5 years from 31 January following the tax year", "So 31 January 2032 for 2025/26"],
            ["Records kept — **not in business**", "1 year from 31 January following the tax year", "So 31 January 2028 for 2025/26"],
          ],
        },
        {
          kind: "formula",
          name: "Payments on account",
          expr: "RELEVANT AMOUNT  =  previous year's income tax  +  Class 4 NIC\n                     LESS tax deducted at source (PAYE)\n                     EXCLUDING capital gains tax\n\nEACH payment on account  =  50% × relevant amount\n\nBALANCING PAYMENT  =  this year's total liability  −  payments on account made\n\nNOT REQUIRED where either:\n   · the relevant amount is under £1,000, OR\n   · more than 80% of the previous year's liability was met at source",
          note: "One exclusion decides most of these questions: CAPITAL GAINS TAX is never part of a payment on account. It is paid in FULL with the balancing payment on 31 January, so a year with a large gain produces a balancing payment far bigger than the payments on account would suggest.",
        },
        {
          kind: "example",
          title: "Computing the payments and their dates",
          scenario:
            "Priya is self-employed. For 2024/25 her income tax liability was £14,800 and her Class 4 NIC £2,600, and £3,400 of tax was deducted at source from her employment income. For 2025/26 her income tax liability is £17,200, Class 4 NIC £3,100 and tax deducted at source £3,400, and she also has capital gains tax of £4,500.",
          steps: [
            { label: "Compute the relevant amount for 2024/25", detail: "Income tax £14,800 + Class 4 NIC £2,600 = £17,400, less tax deducted at source £3,400 = £14,000." },
            { label: "Check whether payments on account are due", detail: "The relevant amount of £14,000 exceeds £1,000, and tax at source of £3,400 is only 19.5% of the £17,400 gross liability — well under 80%. So payments on account ARE required." },
            { label: "Compute each payment on account", detail: "50% × £14,000 = £7,000 each. First due 31 JANUARY 2026, second due 31 JULY 2026. Both are based on the PREVIOUS year, which is why they can be computed before 2025/26 has even ended." },
            { label: "Compute the 2025/26 total payable", detail: "Income tax £17,200 + Class 4 £3,100 = £20,300, less tax at source £3,400 = £16,900. Add capital gains tax of £4,500: total due for the year = £21,400." },
            { label: "Compute the balancing payment", detail: "£21,400 − £14,000 already paid on account = £7,400, due 31 JANUARY 2027. Note this figure includes the WHOLE of the £4,500 CGT, none of which entered the payments on account." },
            { label: "Note the payments on account for 2026/27", detail: "The 2025/26 relevant amount is £16,900 — CGT excluded again — so the 2026/27 payments on account are £8,450 each, the first also falling due on 31 January 2027. Priya therefore pays £7,400 + £8,450 = £15,850 on that single date, which is the cash-flow point worth making to a client." },
          ],
          result:
            "**Payments on account of £7,000 on 31 Jan 2026 and 31 Jul 2026; a balancing payment of £7,400 on 31 Jan 2027.** The trap is excluding CGT from the payments on account while including all of it in the balancing payment — and then the 2026/27 first instalment lands on the same day.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Claiming to reduce payments on account",
          md: "A taxpayer who expects a lower liability may claim to **reduce** the payments on account. If the eventual liability turns out to be higher than the reduced payments, **interest runs from the original due dates** on the shortfall — so the reduction is a cash-flow benefit taken at the taxpayer's risk. Where the claim was made **fraudulently or negligently**, a **penalty** of up to the difference between the reduced payments and the correct payments can also be charged. Both consequences are examinable, and the interest one is the more commonly tested.",
        },
      ],
      check: {
        q: "Which amount is EXCLUDED from the relevant amount used to compute payments on account?",
        options: [
          "Class 4 national insurance",
          "Capital gains tax",
          "Income tax",
          "Nothing is excluded",
        ],
        correct: 1,
        explain:
          "CAPITAL GAINS TAX. It is excluded from the relevant amount, so it does not affect the payments on account — but it is payable IN FULL with the balancing payment on 31 January. Income tax and Class 4 NIC both form part of the relevant amount, and tax deducted at source is deducted in arriving at it rather than excluded from the computation.",
      },
    },
    {
      id: "penalties-enquiries",
      heading: "Penalties, enquiries and discovery",
      blocks: [
        {
          kind: "table",
          caption: "Late FILING of a self assessment return",
          head: ["How late", "Penalty"],
          rows: [
            ["Any lateness", "**£100** fixed, whether or not tax is due"],
            ["More than **3 months**", "**£10 per day** for up to 90 days, so up to £900"],
            ["More than **6 months**", "The greater of **5% of the tax due** and **£300**"],
            ["More than **12 months**", "A further greater of **5% of the tax due** and **£300** — rising to 70% or 100% of the tax where the withholding of information is deliberate"],
          ],
        },
        {
          kind: "table",
          caption: "Late PAYMENT of income tax and CGT",
          head: ["How late", "Penalty"],
          rows: [
            ["More than **30 days**", "**5%** of the unpaid tax"],
            ["More than **6 months**", "A further **5%**"],
            ["More than **12 months**", "A further **5%**"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The late payment penalty does not apply to payments on account",
          md: "Late **payments on account** attract **interest** but not the 5% penalties — the penalties apply to the **balancing payment** and to capital gains tax. Interest, by contrast, runs on everything paid late, at the rate on the exam's rate sheet (currently **8.50%** on underpaid tax and **3.50%** on overpaid tax), and runs from the due date to the date of payment. Distinguishing which of the two applies is a regular two-mark question.",
        },
        {
          kind: "table",
          caption: "Penalties for ERRORS in a return, as a percentage of the tax understated",
          head: ["Taxpayer behaviour", "Maximum", "Minimum — unprompted", "Minimum — prompted"],
          rows: [
            ["**Deliberate and concealed**", "100%", "30%", "50%"],
            ["**Deliberate, not concealed**", "70%", "20%", "35%"],
            ["**Careless**", "30%", "0%", "15%"],
            ["**Reasonable care taken**", "**No penalty**", "—", "—"],
          ],
        },
        {
          kind: "example",
          title: "Choosing when to disclose",
          scenario:
            "Marcus filed his 2024/25 return omitting £26,000 of profit from a second trade. The tax understated is £10,400. He accepts the omission was deliberate but says he did not conceal it — the trade appears in his bank statements and he made no attempt to hide it. He is deciding whether to disclose now or wait, and HMRC has not yet contacted him.",
          steps: [
            { label: "Identify the behaviour", detail: "DELIBERATE BUT NOT CONCEALED. He knowingly omitted the income, which rules out careless, but took no steps to hide it, which rules out concealed. The maximum penalty is 70% of the tax understated." },
            { label: "Compute the penalty on unprompted disclosure", detail: "The minimum for an UNPROMPTED disclosure of deliberate-not-concealed behaviour is 20%: £10,400 × 20% = £2,080." },
            { label: "Compute the penalty on prompted disclosure", detail: "The minimum for a PROMPTED disclosure is 35%: £10,400 × 35% = £3,640. Prompted means the disclosure follows HMRC making contact or beginning an enquiry." },
            { label: "Quantify the cost of waiting", detail: "£3,640 − £2,080 = £1,560, and that is the MINIMUM difference. HMRC reduces the penalty within the range according to the quality of the disclosure — telling, helping and giving access — so a taxpayer who is found rather than confessing may well be nearer 70% than 35%." },
            { label: "Add interest and note the deadline", detail: "Interest runs on the £10,400 from 31 January 2026 at the rate on the rate sheet, regardless of the penalty. And a disclosure only stays unprompted while HMRC has not made contact — the option expires without warning." },
            { label: "Advise", detail: "Disclose immediately and unprompted, and cooperate fully to secure the bottom of the range. The saving is at least £1,560 and realistically far more, and the deliberate behaviour also extends HMRC's discovery window to 20 years." },
          ],
          result:
            "**Disclose now: £2,080 against at least £3,640, a saving of £1,560 or more.** The reason candidates get this wrong is reading \"deliberate\" and jumping to the 100% row — concealment is a separate and additional finding.",
        },
        {
          kind: "list",
          title: "Enquiries, discovery and appeals",
          items: [
            "**Enquiry window.** HMRC may open an enquiry into a return within **12 months of the actual filing date** where the return was filed on time, or within 12 months of the quarter day following actual filing where it was late. It must give written notice, and it needs no reason — an enquiry is not an accusation.",
            "**Discovery assessment.** Outside the enquiry window HMRC may still assess where it **discovers** an under-assessment: within **4 years** of the end of the tax year normally, **6 years** where the loss of tax was **careless**, and **20 years** where it was **deliberate**.",
            "**Compliance checks.** HMRC may inspect business premises, assets and records, and may require documents and information by notice.",
            "**Appeals.** Appeal in writing to HMRC within **30 days** of the decision. The taxpayer may accept an internal review or go to the **First-tier Tribunal**; the Upper Tribunal hears appeals on points of law.",
            "**Determinations.** Where no return is filed, HMRC may issue a determination of the tax due within **3 years** of the filing date. It cannot be appealed — it is displaced only by filing the actual return.",
          ],
        },
      ],
      check: {
        q: "A return is filed 7 months late and the tax due is £4,000. What is the total late FILING penalty?",
        options: [
          "£100",
          "£1,000 — the £100 fixed penalty, £900 of daily penalties, plus the greater of 5% of £4,000 and £300",
          "£1,300 — £100 + £900 + £300",
          "£200",
        ],
        correct: 2,
        explain:
          "£1,300. The £100 fixed penalty applies from day one; over 3 months late adds £10 a day for 90 days = £900; and over 6 months late adds the GREATER of 5% of the tax (£200) and £300, so £300. Total £1,300. The penalties are cumulative, which is the point most often missed.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Including capital gains tax in the payments on account.",
      fix: "CGT is excluded from the relevant amount and paid in full with the balancing payment.",
    },
    {
      trap: "Charging the 5% late payment penalties on a late payment on account.",
      fix: "Payments on account attract interest only; the penalties apply to the balancing payment and CGT.",
    },
    {
      trap: "Reading 'deliberate' as 100%.",
      fix: "100% is deliberate AND concealed. Deliberate but not concealed caps at 70%.",
    },
    {
      trap: "Treating the late filing penalties as alternatives.",
      fix: "They are cumulative: £100, then daily penalties, then the 6-month and 12-month charges.",
    },
    {
      trap: "Giving the enquiry window as 12 months from the due date.",
      fix: "It runs 12 months from the ACTUAL filing date where the return was filed on time.",
    },
  ],
  keyTerms: [
    { term: "Payment on account", def: "An instalment of the coming year's liability, each 50% of the previous year's relevant amount." },
    { term: "Relevant amount", def: "Previous year's income tax and Class 4 NIC less tax deducted at source, excluding capital gains tax." },
    { term: "Balancing payment", def: "The remainder of the year's liability, plus all of the capital gains tax, due on 31 January after the tax year." },
    { term: "Unprompted disclosure", def: "A disclosure made before the taxpayer has reason to believe HMRC has discovered or is about to discover the error." },
    { term: "Discovery assessment", def: "An assessment made outside the enquiry window, with a window of 4, 6 or 20 years by behaviour." },
    { term: "Determination", def: "HMRC's estimate of tax due where no return is filed; not appealable, displaced only by filing the return." },
  ],
  summary: [
    "Electronic returns are due by 31 January after the tax year, paper returns by 31 October.",
    "Payments on account are 50% each of the previous year's relevant amount, due 31 January and 31 July.",
    "Capital gains tax is excluded from payments on account and paid in full with the balancing payment.",
    "Late filing penalties are cumulative: £100, then £10 a day, then 5%-or-£300 at 6 and 12 months.",
    "Error penalties turn on behaviour and on whether disclosure was prompted, ranging from nil to 100%.",
  ],
  knowledgeDiagnostic: [
    { q: "When are payments on account not required?", a: "Where the relevant amount is under £1,000, or more than 80% of the previous year's liability was met by deduction at source." },
    { q: "What happens if a claim to reduce payments on account proves too low?", a: "Interest runs from the original due dates on the shortfall, and a penalty can be charged where the claim was fraudulent or negligent." },
    { q: "What is the maximum penalty for a deliberate but not concealed error, and the minimum on unprompted disclosure?", a: "70% of the tax understated, reducible to 20% for an unprompted disclosure." },
    { q: "How long must a taxpayer in business keep their records?", a: "Five years from 31 January following the tax year — so 31 January 2032 for 2025/26." },
    { q: "What are HMRC's discovery time limits?", a: "Four years from the end of the tax year normally, six where the loss of tax was careless, and twenty where it was deliberate." },
  ],
}

/* ── Chapter 3 · A2–A4 (companies) ────────────────────────────── */

export const TX_TREE_03: StudyChapter = {
  id: "TX-03",
  number: 3,
  paper: "TX",
  area: "A",
  title: "Tax administration for companies",
  minutes: 16,
  syllabusRefs: ["A2(d)", "A3(d)", "A4(e)", "A4(f)"],
  intro:
    "A company's obligations run on its accounting period rather than the tax year, and its large companies pay by instalments that begin before the period has even ended.",
  outcomes: [
    "State a company's filing and payment dates by reference to its accounting period",
    "Determine whether a company is large and must pay by quarterly instalments",
    "Compute quarterly instalment amounts and their due dates",
    "Apply the penalty regimes for late filing and errors by a company",
    "Explain HMRC's enquiry and record-keeping requirements for companies",
  ],
  sections: [
    {
      id: "dates-and-instalments",
      heading: "Filing, payment and quarterly instalments",
      blocks: [
        {
          kind: "table",
          caption: "A company's key dates",
          head: ["Obligation", "Deadline"],
          rows: [
            ["Notify HMRC of **chargeability**", "Within **3 months** of starting to trade"],
            ["File the **CT600** return", "**12 months** after the end of the accounting period"],
            ["Pay corporation tax — **not large**", "**9 months and 1 day** after the end of the accounting period"],
            ["Pay corporation tax — **large**", "By **quarterly instalments** (see below)"],
            ["Amend a return", "Within **12 months** of the filing date"],
            ["Keep records", "**6 years** from the end of the accounting period"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The date that catches people out",
          md: "A company's corporation tax is due **before** its return. Payment falls **9 months and 1 day** after the period end, while the return is not due for **12 months** — so a company must estimate and pay three months before it files. Candidates routinely give a single date for both. For a period ended **31 December 2025**, payment is due **1 October 2026** and the return by **31 December 2026**.",
        },
        {
          kind: "formula",
          name: "Large companies and quarterly instalments",
          expr: "A company is LARGE for an accounting period where its AUGMENTED PROFITS\nexceed the £1,500,000 threshold (see the exam's rate sheet).\n\n   AUGMENTED PROFITS  =  taxable total profits  +  dividends received from\n                         NON-group companies (grossed at 100/100 — they are\n                         exempt but still counted for the threshold)\n\nThe threshold is DIVIDED by the number of 51% group companies (including\nthe company itself) and TIME-APPORTIONED for a period of under 12 months.\n\nInstalment DUE DATES for a 12-month period, from the START of the period:\n   month 7, month 10, month 13, month 16  —  each on the 14th\n\nEach instalment  =  estimated corporation tax liability  ÷  4",
          note: "Two exemptions matter. A company is NOT required to pay by instalments in the first year it becomes large, provided its augmented profits do not exceed £10 million. And a company whose liability is under £10,000 never pays by instalments regardless of its profits.",
        },
        {
          kind: "example",
          title: "Deciding the payment basis and computing instalments",
          scenario:
            "Ravenglass Ltd prepares accounts for the year ended 31 March 2026. Its taxable total profits are £1,720,000 and it received dividends of £60,000 from a company in which it holds 8% — an unconnected investment. It has one 51% subsidiary. It was also large in the previous accounting period. Its estimated corporation tax liability for the year is £430,000.",
          steps: [
            { label: "Compute augmented profits", detail: "Taxable total profits £1,720,000 + non-group dividends £60,000 = £1,780,000. Dividends from GROUP companies would be excluded; these are from an 8% holding, so they count." },
            { label: "Adjust the threshold for group companies", detail: "There are two 51% group companies — Ravenglass and its subsidiary — so the £1,500,000 threshold is divided by 2 to give £750,000. The period is a full 12 months, so no time apportionment." },
            { label: "Decide whether it is large", detail: "Augmented profits of £1,780,000 exceed the adjusted threshold of £750,000, so Ravenglass IS large. And because it was large in the previous period too, the first-year exemption does not apply." },
            { label: "Compute each instalment", detail: "£430,000/4 = £107,500 per instalment. Note this is based on the company's own ESTIMATE of its liability, made before the period has ended — which is why an under-estimate attracts interest." },
            { label: "Determine the due dates", detail: "The period began 1 April 2025. Instalments fall on the 14th of months 7, 10, 13 and 16 from that start: 14 October 2025, 14 January 2026, 14 April 2026 and 14 July 2026." },
            { label: "Note what changes without instalments", detail: "Had Ravenglass not been large, the whole £430,000 would have been due on 1 January 2027 — 9 months and 1 day after the 31 March 2026 period end. So instalments accelerate the first payment by nearly fifteen months, which is the cash-flow point behind the whole regime." },
          ],
          result:
            "**Large: four instalments of £107,500 on 14 Oct 2025, 14 Jan 2026, 14 Apr 2026 and 14 Jul 2026.** The two steps candidates skip are grossing the threshold down for group companies and adding non-group dividends to reach augmented profits.",
        },
      ],
      check: {
        q: "A company with a 12-month accounting period ending 31 December 2025 is not large. When is its corporation tax due and when is its return due?",
        options: [
          "Both on 31 December 2026",
          "Tax on 1 October 2026 and the return by 31 December 2026",
          "Tax on 31 December 2026 and the return by 1 October 2026",
          "Both on 1 October 2026",
        ],
        correct: 1,
        explain:
          "TAX 1 OCTOBER 2026, RETURN 31 DECEMBER 2026. Payment is due 9 months and 1 day after the period end; the return is not due for 12 months. The tax is therefore payable three months BEFORE the return that computes it, so the company must estimate.",
      },
    },
    {
      id: "penalties-and-enquiries",
      heading: "Penalties, enquiries and record keeping",
      blocks: [
        {
          kind: "table",
          caption: "Late FILING of a corporation tax return",
          head: ["How late", "Penalty"],
          rows: [
            ["Up to **3 months**", "**£100** — rising to £500 where the return is late for a third consecutive period"],
            ["**3 to 6 months**", "A further **£100** — again £500 for a third consecutive failure"],
            ["**6 to 12 months**", "An additional **10%** of the tax outstanding at that point"],
            ["More than **12 months**", "An additional **20%** of the tax outstanding"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The company error penalties are the same table",
          md: "The percentages for **errors in a return** are identical for companies and individuals — 100/30/50 for deliberate and concealed, 70/20/35 for deliberate but not concealed, 30/0/15 for careless, and no penalty where reasonable care was taken. That is worth knowing because it means learning one table serves both halves of the syllabus, and because a scenario about a company's error is answered exactly as an individual's would be.",
        },
        {
          kind: "list",
          title: "Enquiries, interest and records for companies",
          items: [
            "**Enquiry window** — HMRC may open an enquiry within **12 months of the actual filing date**, the same rule as for individuals.",
            "**Discovery** — the same 4, 6 and 20 year windows apply, by reference to whether the loss of tax was innocent, careless or deliberate.",
            "**Interest** runs on late corporation tax from the due date, and HMRC pays interest on overpayments. For a company, interest paid and received on tax is dealt with as a **loan relationship** debit or credit rather than being disallowed — an important difference from an individual, for whom the interest is simply not deductible.",
            "**Records** must be kept for **6 years** from the end of the accounting period, against 5 years from 31 January following the tax year for an individual in business.",
            "**Instalment under-payments** attract interest from each instalment due date, so an estimate that proves too low is not free even though it was made in good faith.",
          ],
        },
        {
          kind: "table",
          caption: "Individuals against companies, side by side",
          head: ["", "Individual", "Company"],
          rows: [
            ["**Period**", "Tax year, 6 April to 5 April", "Accounting period, which need not be 12 months"],
            ["**Return due**", "31 January after the tax year (electronic)", "12 months after the period end"],
            ["**Tax due**", "31 January, with payments on account", "9 months and 1 day, or by quarterly instalments if large"],
            ["**Records**", "5 years from 31 January following the tax year (in business)", "6 years from the end of the accounting period"],
            ["**Interest on late tax**", "Not deductible", "A loan relationship debit"],
          ],
        },
      ],
      check: {
        q: "How is interest on late-paid corporation tax treated in a company's computation?",
        options: [
          "Disallowed, as it is for an individual",
          "As a loan relationship debit, so it is effectively deductible",
          "Deducted from trading profit",
          "Added to the corporation tax liability",
        ],
        correct: 1,
        explain:
          "AS A LOAN RELATIONSHIP DEBIT. Interest paid and received on tax is a non-trading loan relationship item for a company, so it enters the computation rather than being disallowed. For an individual the equivalent interest is simply not deductible — a difference that is regularly examined.",
      },
    },
  ],
  examTraps: [
    {
      trap: "Giving one date for both a company's tax and its return.",
      fix: "Tax is due at 9 months and 1 day; the return at 12 months.",
    },
    {
      trap: "Testing the instalment threshold against taxable total profits.",
      fix: "Use AUGMENTED profits — TTP plus non-group dividends received.",
    },
    {
      trap: "Forgetting to divide the £1,500,000 threshold by the number of 51% group companies.",
      fix: "Divide by the number of group companies including the company itself, and time-apportion short periods.",
    },
    {
      trap: "Dating instalments from the period END.",
      fix: "They run from the START of the period: months 7, 10, 13 and 16, each on the 14th.",
    },
    {
      trap: "Disallowing a company's interest on late tax.",
      fix: "It is a loan relationship debit for a company, unlike an individual's.",
    },
  ],
  keyTerms: [
    { term: "Accounting period", def: "The period for which a company is charged to corporation tax; it cannot exceed 12 months." },
    { term: "Augmented profits", def: "Taxable total profits plus dividends received from non-group companies; the measure for the instalment and rate thresholds." },
    { term: "Large company", def: "One whose augmented profits exceed the £1,500,000 threshold as adjusted for group companies and period length." },
    { term: "Quarterly instalment", def: "One quarter of the estimated liability, payable on the 14th of months 7, 10, 13 and 16 from the start of the period." },
    { term: "Loan relationship", def: "The regime under which a company's interest paid and received, including on tax, is brought into the computation." },
  ],
  summary: [
    "A company files 12 months after its period end but pays 9 months and 1 day after it, so it must estimate.",
    "Large companies pay by four instalments on the 14th of months 7, 10, 13 and 16 from the START of the period.",
    "Large means augmented profits above £1,500,000, divided by the number of 51% group companies.",
    "The error penalty percentages are identical to those for individuals.",
    "A company keeps records for 6 years from the period end and treats interest on tax as a loan relationship item.",
  ],
  knowledgeDiagnostic: [
    { q: "When must a company notify HMRC that it has started to trade?", a: "Within three months of starting to trade." },
    { q: "What are augmented profits?", a: "Taxable total profits plus dividends received from companies outside the 51% group." },
    { q: "When are a large company's instalments due for a 12-month period?", a: "On the 14th of months 7, 10, 13 and 16 measured from the START of the accounting period." },
    { q: "Which two exemptions relieve a company from paying by instalments?", a: "The first year it becomes large, provided augmented profits do not exceed £10 million; and where the liability is under £10,000." },
    { q: "How long must a company keep its records?", a: "Six years from the end of the accounting period." },
  ],
}

export const TX_TREE_AREA_A: StudyChapter[] = [TX_TREE_01, TX_TREE_02, TX_TREE_03]
