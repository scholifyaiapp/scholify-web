import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * ATX · Area E — Tax planning & ethics (UK FA2024/25).
 * Original, syllabus-aligned. No ACCA/Kaplan/BPP text reproduced.
 * Where a rate or threshold matters it is stated so the chapter teaches
 * METHOD and JUDGEMENT, not memorised numbers.
 */

export const ATX_E: StudyChapter = {
  paper: "ATX",
  area: "E",
  title: "Tax planning & ethics",
  minutes: 16,
  intro: "At ATX the numbers are only half the answer. The other half is the line no client should cross, and the standards you sign your name to when you advise them.",
  outcomes: [
    "Distinguish tax evasion, tax avoidance and tax mitigation, and place a scheme on that spectrum",
    "Explain how the GAAR counteracts abusive arrangements using the double-reasonableness test, and how DOTAS forces disclosure",
    "Apply the ACCA Code's fundamental principles and the PCRT five standards for tax planning",
    "Handle a client error and decide when to disclose, resign or file a money laundering report",
    "Advise on choice of business medium and compare salary, dividends and pension for extracting profit",
  ],
  sections: [
    {
      id: "spectrum",
      heading: "Evasion, avoidance, mitigation — the spectrum",
      blocks: [
        { kind: "text", md: "Three words that sound similar sit at completely different points on a legal and ethical scale, and confusing them is the fastest way to lose marks — and, in practice, your licence. **Tax evasion** is the deliberate misrepresentation or concealment of the facts to pay less tax than the law demands: hiding income, inventing expenses, backdating documents. It is **dishonest** and it is a **criminal offence**." },
        { kind: "text", md: "**Tax avoidance** is arranging your affairs **within the letter of the law** to reduce tax. It is not illegal — but it ranges from the entirely ordinary (choosing to trade through a company) to the aggressive and artificial (contrived schemes that exploit a loophole Parliament never intended). **Tax mitigation** is the uncontroversial end: using reliefs and allowances **exactly as Parliament intended** — an ISA, a pension contribution, a gift-aid claim. Mitigation is beyond reproach; aggressive avoidance is lawful but risky and increasingly attacked." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "The one distinction the exam tests hardest",
          data: {
            leftTitle: "Tax evasion",
            rightTitle: "Tax avoidance",
            rows: [
              { aspect: "Legality", left: "Illegal — a criminal offence", right: "Legal — within the letter of the law" },
              { aspect: "Conduct", left: "Dishonest: concealing or falsifying facts", right: "Transparent: the facts are as stated" },
              { aspect: "Example", left: "Omitting cash sales from a return", right: "Incorporating to defer income tax" },
              { aspect: "Consequence", left: "Prosecution, penalties, imprisonment", right: "May be challenged; GAAR/DOTAS may apply" },
              { aspect: "Adviser's role", left: "Must never assist; may have to report", right: "May advise, subject to the PCRT standards" },
            ],
          },
        } },
        { kind: "callout", tone: "key", title: "The dividing line", md: "The frontier between evasion and avoidance is **honesty about the facts**. Change the facts and hide them, and you have crossed into evasion. Change your **arrangements** while stating the facts truthfully, and you are avoiding — lawfully, if not always wisely." },
      ],
      check: {
        q: "A trader deliberately leaves £20,000 of cash sales off her tax return. This is best described as:",
        options: [
          "Tax avoidance — a lawful use of the rules",
          "Tax mitigation — using reliefs as Parliament intended",
          "Tax evasion — a criminal offence",
          "Aggressive planning that the GAAR will counteract",
        ],
        correct: 2,
        explain: "Deliberately concealing income is a dishonest misrepresentation of the facts — that is evasion, and it is criminal. Avoidance and mitigation both work with the facts stated truthfully; the GAAR counteracts abusive but lawful arrangements, not outright fraud.",
      },
    },
    {
      id: "armoury",
      heading: "The anti-avoidance armoury — GAAR & DOTAS",
      blocks: [
        { kind: "text", md: "Because aggressive avoidance is lawful, HMRC needs weapons other than prosecution. Two matter most at ATX. The **General Anti-Abuse Rule (GAAR)** is a backstop that lets HMRC counteract the tax advantage from an **abusive** arrangement, even where the letter of the law was followed. Crucially it does **not** bite on ordinary planning — only on the artificial and contrived." },
        { kind: "callout", tone: "rule", title: "The double-reasonableness test", md: "An arrangement is **abusive** only if it **cannot reasonably be regarded as a reasonable course of action** in relation to the tax provisions concerned. The word *reasonable* appears twice on purpose: HMRC must show that **no** reasonable view could hold the arrangement to be reasonable. Genuine, sensible planning survives; only the indefensible is caught." },
        { kind: "text", md: "If the GAAR applies, HMRC counteract the advantage on a **just and reasonable** basis and may charge a **GAAR penalty of 60%** of the counteracted tax. An independent **GAAR Advisory Panel** gives an opinion first, so the rule is not HMRC acting as judge in its own cause." },
        { kind: "text", md: "**DOTAS — the Disclosure of Tax Avoidance Schemes regime** — attacks avoidance earlier, through information. A **promoter** of a scheme bearing certain **hallmarks** must notify HMRC, who issue a **Scheme Reference Number (SRN)**. The promoter passes the SRN to users, who must quote it on their **tax returns** — so HMRC knows who is in a scheme almost as soon as it is sold. Disclosure under DOTAS says nothing about whether the scheme works; it simply lets HMRC open enquiries and issue **accelerated payment notices** demanding the disputed tax up front." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "How DOTAS lets HMRC act early",
          caption: "Disclosure is about visibility, not approval — an SRN is not a stamp that the scheme works.",
          data: {
            steps: [
              { label: "Scheme hits a hallmark", sub: "e.g. confidentiality, premium fee, standardised product" },
              { label: "Promoter notifies HMRC", sub: "within the statutory time limit" },
              { label: "HMRC issue an SRN", sub: "Scheme Reference Number" },
              { label: "User quotes SRN on return", sub: "HMRC now knows who is in it" },
              { label: "HMRC enquire / issue APN", sub: "accelerated payment of the disputed tax" },
            ],
          },
        } },
        { kind: "callout", tone: "warn", md: "Keep the two regimes distinct. **DOTAS is disclosure** — it forces the scheme into daylight. **The GAAR is counteraction** — it removes the advantage. A scheme can be disclosed under DOTAS and still stand, or be undisclosed and still fall to the GAAR." },
      ],
      check: {
        q: "The GAAR counteracts an arrangement only where it is 'abusive'. Under the double-reasonableness test, an arrangement is abusive if it:",
        options: [
          "Was entered into for genuine commercial reasons",
          "Cannot reasonably be regarded as a reasonable course of action",
          "Has not been disclosed to HMRC under DOTAS",
          "Reduces the client's tax bill by more than 50%",
        ],
        correct: 1,
        explain: "The test is deliberately doubled: an arrangement is abusive only if it cannot reasonably be regarded as a reasonable course of action in relation to the tax rules. There is no percentage threshold; DOTAS is a separate disclosure regime; and a genuine commercial purpose points AWAY from abuse, so it is not the definition.",
      },
    },
    {
      id: "ethics",
      heading: "The ethical adviser — the ACCA Code & PCRT",
      blocks: [
        { kind: "text", md: "Every piece of tax advice is given under two overlapping rulebooks. The first is the **ACCA Code of Ethics and Conduct**, built on **five fundamental principles** that apply to all professional work. The second is **Professional Conduct in Relation to Taxation (PCRT)**, which the professional bodies issue jointly and which adds **five standards for tax planning** on top of the Code." },
        { kind: "diagram", diagram: {
          type: "cards",
          title: "The five fundamental principles (ACCA Code)",
          data: {
            items: [
              { title: "Integrity", sub: "Be straightforward and honest in all dealings" },
              { title: "Objectivity", sub: "Do not let bias, conflict or undue influence override judgement" },
              { title: "Professional competence & due care", sub: "Maintain knowledge; act diligently to current standards" },
              { title: "Confidentiality", sub: "Do not disclose client information without authority or a legal duty" },
              { title: "Professional behaviour", sub: "Comply with laws and avoid discrediting the profession" },
            ],
          },
        } },
        { kind: "text", md: "PCRT then narrows the focus to planning. Its **five standards** are the ones an examiner expects you to name and apply: **(1) Client specific** — advice must fit the client's actual facts, not be a one-size-fits-all product; **(2) Lawful** — members must act lawfully and with integrity, and never help a client break the law; **(3) Disclosure and transparency** — advice must not depend for its effect on HMRC being given less than the full facts; **(4) Tax planning arrangements** — members must not create, encourage or promote arrangements that set out to achieve results **contrary to the clear intention of Parliament**, or that are **highly artificial or contrived**; and **(5) Professional judgement and appropriate documentation** — apply the standards with judgement and keep a record of the reasoning." },
        { kind: "callout", tone: "tip", title: "How they connect", md: "The fundamental principles tell you **how to behave**; the PCRT standards tell you **what planning you may put your name to**. Standard 4 is the heart of ATX ethics: a scheme can be perfectly legal and still breach PCRT because it is contrived and against Parliament's clear intention." },
      ],
    },
    {
      id: "errors",
      heading: "Client errors, disclosure & money laundering",
      blocks: [
        { kind: "text", md: "Suppose you discover that a client has **underpaid tax** — an omitted source, an over-claimed relief. Your duty is not to fix it behind their back, and not to look away. You **advise the client, in writing, to disclose the error to HMRC** and explain the consequences of not doing so. Most clients agree. The hard case is the client who **refuses**." },
        { kind: "text", md: "You cannot disclose on the client's behalf — that would breach **confidentiality**. But you cannot continue to act for a client who is now knowingly submitting incorrect information — that would compromise your **integrity** and could make you complicit. So the standard response is a careful, ordered sequence." },
        { kind: "diagram", diagram: {
          type: "flow",
          title: "When a client refuses to correct an error",
          caption: "Confidentiality survives resignation — you tell HMRC you no longer act, never why.",
          data: {
            steps: [
              { label: "Advise disclosure in writing", sub: "explain the interest, penalties and risks" },
              { label: "Client still refuses", sub: "you cannot disclose for them (confidentiality)" },
              { label: "Cease to act", sub: "you must not be associated with a false return" },
              { label: "Notify HMRC you no longer act", sub: "but give NO reason — confidentiality holds" },
              { label: "Consider a money laundering report", sub: "to the MLRO / NCA if you suspect proceeds of crime" },
            ],
          },
        } },
        { kind: "text", md: "The last step engages **money laundering** law. Under the **Proceeds of Crime Act 2002 (POCA)**, the tax evaded is **criminal property**, so a deliberate failure to correct an error can put you in reach of the reporting duty. If you **know or suspect** money laundering, you must report internally to your firm's **Money Laundering Reporting Officer (MLRO)**, who decides whether to submit a **Suspicious Activity Report (SAR)** to the **National Crime Agency (NCA)**." },
        { kind: "callout", tone: "warn", title: "Do not tip off", md: "Telling the client — or anyone — that a report has been or may be made is the separate offence of **tipping off**. You resign, you notify HMRC that you no longer act, you may file a SAR — but you must **never** reveal the SAR to the client. Failure to report where required, and tipping off, are **both criminal offences** in their own right." },
      ],
      check: {
        q: "A client refuses to correct an error that has underpaid tax. Having advised disclosure in writing, what must the adviser NOT do?",
        options: [
          "Cease to act for the client",
          "Notify HMRC that they no longer act for the client",
          "Tell the client that a Suspicious Activity Report has been made",
          "Consider reporting suspicions to the firm's MLRO",
        ],
        correct: 2,
        explain: "Telling the client a SAR has been (or will be) made is the offence of tipping off. The correct steps are to cease to act, notify HMRC that you no longer act WITHOUT giving the reason (confidentiality), and consider a money laundering report to the MLRO / NCA.",
      },
    },
    {
      id: "medium",
      heading: "Planning advice — choice of business medium",
      blocks: [
        { kind: "text", md: "Legitimate planning starts long before profit extraction — with the **structure** itself. A **sole trader** is taxed on profits to **income tax plus Class 2/Class 4 NIC** as they arise, whether or not the cash is drawn. A **company** pays **corporation tax** on its profits, and the owner is taxed **again** only when profit is extracted — a second layer, but one the owner **controls the timing of**." },
        { kind: "diagram", diagram: {
          type: "compare",
          title: "Sole trader vs company",
          data: {
            leftTitle: "Sole trader",
            rightTitle: "Company",
            rows: [
              { aspect: "Tax on profit", left: "Income tax + Class 2/4 NIC on all profit", right: "Corporation tax (19% / 25%), then a charge on extraction" },
              { aspect: "Timing", left: "Taxed as profit arises", right: "Extraction — and its tax — can be deferred" },
              { aspect: "Liability", left: "Unlimited personal liability", right: "Limited liability for the shareholder" },
              { aspect: "Losses", left: "Flexible relief against total income / early years", right: "Trapped in the company; carried against its profits" },
              { aspect: "Admin & cost", left: "Simple, private", right: "Accounts filed publicly, more compliance" },
            ],
          },
        } },
        { kind: "text", md: "There is no universal answer. Incorporation tends to win where profits are **high and retained** in the business (the low corporation-tax rate defers the personal charge), where **limited liability** matters, and where the owner wants **flexible, NIC-efficient extraction**. A sole trader can be better where profits are modest, where **early-year or terminal losses** need setting against other income, or where the owner values **simplicity and privacy**." },
      ],
    },
    {
      id: "extraction",
      heading: "Extracting profit — salary vs dividend vs pension",
      blocks: [
        { kind: "text", md: "Once profit sits inside a company, the owner-manager must get it out — and the route chosen can change the net cash by thousands. The three main routes behave very differently, and the key is **what each one costs in tax and NIC on the way through**." },
        { kind: "table", caption: "How each route is taxed (FA2024/25)", head: ["Route", "Corporation tax?", "NIC?", "Personal tax on receipt"], rows: [
          ["Salary / bonus", "Deductible — reduces CT", "Employer 13.8% + employee (8% / 2%)", "Income tax 20% / 40% / 45%"],
          ["Dividend", "NOT deductible — paid from post-tax profit", "None", "8.75% / 33.75% / 39.35% (after £500 allowance)"],
          ["Employer pension contribution", "Deductible if wholly & exclusively", "None", "None within the £60,000 annual allowance"],
        ] },
        { kind: "example", title: "Worked comparison — extracting £10,000 of company profit", scenario: "A company has £10,000 of pre-tax profit it can extract for its owner-manager, who is already a higher-rate taxpayer and has used the dividend allowance. The company pays corporation tax at the 19% small profits rate. Compare the net value under each route.", steps: [
          { label: "Salary — gross it down for employer NIC", detail: "The £10,000 must cover salary plus 13.8% employer NIC: salary = £10,000 / 1.138 = £8,787, employer NIC = £1,213. Both are deductible, so no CT arises." },
          { label: "Salary — personal tax", detail: "Income tax at 40% on £8,787 = £3,515; employee NIC at 2% (earnings already above the upper limit) = £176. Net cash = £8,787 − £3,515 − £176 = £5,096." },
          { label: "Dividend — corporation tax first", detail: "The £10,000 is not deductible, so CT at 19% = £1,900, leaving £8,100 to distribute." },
          { label: "Dividend — personal tax", detail: "Dividend tax at the higher rate of 33.75% on £8,100 = £2,734. Net cash = £8,100 − £2,734 = £5,366." },
          { label: "Employer pension contribution", detail: "£10,000 is deductible for the company, bears no NIC, and is not taxed on the owner within the £60,000 annual allowance — so the whole £10,000 enters the pension pot." },
        ], result: "Net value: salary £5,096, dividend £5,366, pension £10,000. The pension wins outright; the dividend narrowly beats salary because it escapes NIC. The catch is access — pension cash is locked until retirement, while salary and dividends are spendable now." },
        { kind: "diagram", diagram: {
          type: "bars",
          title: "Net value from £10,000 of company profit (19% CT, higher-rate owner)",
          caption: "Pension preserves the full amount; NIC is what drags salary below the dividend.",
          data: {
            unit: "£",
            items: [
              { label: "Salary", value: 5096 },
              { label: "Dividend", value: 5366 },
              { label: "Pension", value: 10000 },
            ],
          },
        } },
        { kind: "callout", tone: "warn", title: "The result can flip", md: "The dividend's edge depends on the **corporation-tax rate**. Raise the company to the **25% main rate** (or the **26.5% marginal** rate) and the CT taken off the dividend grows: the dividend falls to about **£4,969** while the salary is unchanged at £5,096 — so **salary now wins**. Never state a route is best without checking the client's CT rate and remaining basic-rate and dividend allowances." },
        { kind: "callout", tone: "tip", md: "In practice the classic plan combines routes: a **small salary** up to the NIC threshold (cheap, preserves the state pension record and is CT-deductible), then **dividends** to use lower bands, with **employer pension contributions** mopping up profit tax-free where retirement saving is the goal." },
      ],
      check: {
        q: "For a higher-rate owner-manager whose company pays corporation tax at the 19% small profits rate, which extraction route generally preserves the MOST value, ignoring when the cash can be accessed?",
        options: [
          "A bonus paid as salary",
          "A dividend",
          "An employer pension contribution",
          "All three leave exactly the same net amount",
        ],
        correct: 2,
        explain: "An employer pension contribution is deductible for the company, carries no NIC and is not taxed on the owner within the annual allowance — so the full amount is preserved. Salary loses income tax plus employer and employee NIC; a dividend loses corporation tax then dividend tax. The trade-off is that pension cash is locked until retirement.",
      },
    },
  ],
  examTraps: [
    { trap: "Treating tax avoidance and tax evasion as the same thing.", fix: "Evasion is dishonest concealment of the facts and is criminal; avoidance works within the law with the facts stated truthfully. Honesty about the facts is the dividing line." },
    { trap: "Thinking the GAAR strikes down all avoidance.", fix: "It counteracts only 'abusive' arrangements that fail the double-reasonableness test — those that cannot reasonably be regarded as a reasonable course of action. Ordinary planning and mitigation are safe." },
    { trap: "Telling HMRC WHY you resigned from a client.", fix: "Confidentiality survives resignation. Notify HMRC only that you no longer act — never the reason." },
    { trap: "Warning the client that you have filed a money laundering report.", fix: "That is tipping off, a criminal offence. File the SAR with the MLRO/NCA and say nothing to the client." },
    { trap: "Declaring dividends always beat salary for extraction.", fix: "At the 25% / 26.5% marginal corporation-tax rate the extra CT can make salary the better route; a pension contribution usually beats both. Always check the CT rate and remaining allowances." },
  ],
  keyTerms: [
    { term: "Tax evasion", def: "Illegally paying less tax than is due by concealing or misrepresenting the facts — a criminal offence." },
    { term: "Tax avoidance", def: "Arranging affairs within the letter of the law to reduce tax; lawful, but aggressive schemes may be challenged." },
    { term: "GAAR", def: "The General Anti-Abuse Rule — counteracts the advantage from 'abusive' arrangements that fail the double-reasonableness test." },
    { term: "DOTAS", def: "Disclosure of Tax Avoidance Schemes — promoters notify HMRC of hallmarked schemes, which issue a Scheme Reference Number quoted by users." },
    { term: "PCRT", def: "Professional Conduct in Relation to Taxation — the bodies' joint guidance, including five standards for tax planning." },
    { term: "Tipping off", def: "The offence of alerting a person that a money laundering report has been or may be made, prejudicing an investigation." },
    { term: "MLRO / SAR", def: "The Money Laundering Reporting Officer receives internal reports and files Suspicious Activity Reports with the National Crime Agency." },
  ],
  summary: [
    "Evasion is illegal and dishonest; avoidance is lawful; mitigation uses reliefs as Parliament intended — honesty about the facts separates evasion from the rest.",
    "The GAAR counteracts only 'abusive' arrangements (double-reasonableness test) with a 60% penalty; DOTAS forces disclosure via a Scheme Reference Number but does not decide whether a scheme works.",
    "Advice is governed by the ACCA Code's five fundamental principles and PCRT's five standards for tax planning — standard 4 bars contrived schemes against Parliament's clear intention.",
    "On a client error, advise written disclosure; if refused, cease to act, tell HMRC you no longer act (not why), and consider a money laundering report — but never tip off the client.",
    "Structure and extraction are legitimate planning: for a higher-rate owner-manager an employer pension usually beats a dividend, which beats salary at 19% CT — but salary can win at the 25%/26.5% rate.",
  ],
}
