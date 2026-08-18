import type { StudyChapter } from "@/lib/acca-study-content"

/*
 * TX-GLOBAL · Area G — ethics, planning and cross-border tax. Chapters 22–24.
 *
 * The three chapters that make the rest usable. Chapter 22 is where the adviser's own
 * obligations live, and it is the one area of any tax syllabus where a wrong answer is not
 * merely a lost mark but a professional failure. Chapter 23 completes the cross-border
 * story begun in Chapter 2 by showing how the overlapping claims are actually relieved.
 * Chapter 24 is about working in a tax role: the software, the data, and the judgement
 * that no tool supplies.
 *
 * Jurisdiction-neutral throughout. Reporting obligations, disclosure regimes and treaty
 * networks differ between countries; the ethical framework and the relief mechanisms do
 * not.
 */

/* ── Chapter 22 ────────────────────────────────────────────────── */

export const TXG_TREE_22: StudyChapter = {
  id: "TXG-22",
  number: 22,
  paper: "TX",
  area: "G",
  title: "Avoidance, evasion and the adviser's obligations",
  minutes: 18,
  intro:
    "Every tax syllabus carries ethics marks, and they are the most reliably available in the paper — because the answer follows a sequence rather than requiring a computation. Learn the sequence and they are yours.",
  outcomes: [
    "Distinguish tax planning, avoidance and evasion, and locate the line between them",
    "Explain the purpose of a general anti-abuse rule",
    "Apply the five fundamental principles to a tax engagement",
    "Set out the correct sequence of steps on discovering a client error",
    "Explain the conflict between confidentiality and reporting obligations",
  ],
  sections: [
    {
      id: "the-spectrum",
      heading: "Planning, avoidance and evasion",
      blocks: [
        {
          kind: "text",
          md: "This is a **jurisdiction-neutral foundation track, not an ACCA exam variant**. Reporting obligations and disclosure regimes are highly jurisdiction-specific and are among the details that change most often. The framework below is common to the professional codes used internationally.\n\nStart by rejecting the two-box model. \"Avoidance is legal, evasion is illegal\" is true and is not sufficient, because it hides the fact that avoidance covers behaviour ranging from entirely intended to entirely abusive.",
        },
        {
          kind: "table",
          caption: "The spectrum, and where each point sits",
          head: ["", "Compliant planning", "Acceptable avoidance", "Abusive avoidance", "Evasion"],
          rows: [
            ["**Legality**", "Legal", "Legal", "Legal in form; counteracted in substance", "**ILLEGAL** — a criminal offence"],
            ["**What it is**", "Using a relief exactly as intended", "Arranging affairs to reduce tax within the rules", "Artificial steps with no purpose other than the tax advantage", "Concealing or misstating the facts"],
            ["**Example**", "Contributing to a pension; using an annual exemption", "Choosing a dividend over salary; timing a disposal across a year end", "A circular series of transactions leaving the taxpayer where they started but with a deduction", "Omitting cash sales; inventing expenses; hiding an offshore account"],
            ["**Authority's response**", "None — it is the intended behaviour", "None, or specific legislation if it becomes widespread", "General anti-abuse rule, disclosure regimes, litigation", "Investigation, penalties up to the full tax, and prosecution"],
            ["**Adviser's position**", "Recommend it", "May advise, with the risks explained", "Should decline; reputational and regulatory exposure", "**Must never assist, and must act on discovering it**"],
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "The distinction that actually decides cases: concealment",
          md: "The reliable test is not how aggressive an arrangement is but whether the facts have been **disclosed truthfully**.\n\nA taxpayer who enters an artificial scheme, reports it fully and argues that the law permits it is **avoiding** — they may lose, and may face penalties for an unreasonable position, but they have not committed a criminal offence. A taxpayer who understates income, invents a deduction or hides an account is **evading**, however small the amount.\n\nThat is why the first question to ask of a scenario is not \"is this aggressive?\" but **\"have the facts been stated honestly?\"** Everything about the adviser's obligations turns on the answer, and the two situations require entirely different responses.\n\nA **general anti-abuse rule** exists for the far end of the avoidance spectrum. It allows the authority to counteract arrangements that are abusive — that cannot reasonably be regarded as a reasonable course of action given the legislation's purpose — even where each individual step complies with the letter of the law. Its real effect is partly deterrent: its existence makes advisers unwilling to market schemes that would once have been sold, which changes behaviour more than the counteractions themselves do.",
        },
      ],
      check: {
        q: "A client enters an artificial scheme, discloses it fully on their return, and argues the law permits the result. How is this best characterised?",
        options: [
          "Evasion, because the scheme is artificial",
          "Avoidance — potentially abusive and open to challenge, but not criminal, because the facts were disclosed",
          "Compliant planning, because it was disclosed",
          "Neither, because disclosure removes any liability",
        ],
        correct: 1,
        explain:
          "CONCEALMENT IS WHAT MAKES CONDUCT CRIMINAL. Full disclosure of the facts means this is avoidance, however artificial the arrangement. It may be counteracted under a general anti-abuse rule and may attract penalties for an unreasonable position, but it is not evasion — which requires misstating or hiding the facts.",
      },
    },
    {
      id: "the-adviser",
      heading: "The adviser's obligations, and what to do when something is wrong",
      blocks: [
        {
          kind: "list",
          title: "The five fundamental principles, applied to tax work",
          items: [
            "**Integrity** — be straightforward and honest. You cannot be associated with a return or a statement you know to be materially false or misleading, and knowingly allowing one to stand is a breach even if you did not prepare it.",
            "**Objectivity** — do not let bias, conflict of interest or undue influence override professional judgement. This is the principle engaged when you act for both parties to a transaction, or for a company and its director personally.",
            "**Professional competence and due care** — act only within your competence and keep up to date. Tax law changes annually, so this is a continuing obligation rather than a formality, and referring work you are not competent to do is compliance rather than failure.",
            "**Confidentiality** — do not disclose client information without authority or a legal duty. This is what prevents you telling the authority why you resigned, and it survives the end of the engagement.",
            "**Professional behaviour** — comply with relevant laws and regulations and avoid conduct that discredits the profession, including in how services are marketed.",
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "The sequence to follow when a client has made an error",
          md: "Ethics answers are marked on the steps, and the steps have an order. Follow it and the marks come in sequence.\n\n**1. Establish the facts.** Do not act on an assumption. Confirm the amounts, the period and, critically, what caused the error — careless or deliberate. That characterisation drives everything after it.\n\n**2. Advise the client to disclose, and explain the consequences.** Set out the tax, the interest, the likely penalty range, and the fact that an unprompted disclosure attracts a far larger reduction than one made after an enquiry opens. This is advice, with reasons, not an instruction.\n\n**3. Give them the opportunity to put it right.** A client who corrects the error has done what was required, and the matter ends there.\n\n**4. If they refuse, cease to act.** You cannot continue to be associated with a return you know to be wrong. Notify the client in writing.\n\n**5. Consider your reporting obligations.** Many jurisdictions require a report to an internal officer or a national body where the proceeds of a crime are involved. Where that duty applies it typically **overrides confidentiality**.\n\n**6. Do not tell the client you have reported.** Where a jurisdiction makes tipping off an offence, informing the client is a separate crime — regardless of how the relationship ends.\n\n**7. Do not tell the authority why.** You may confirm that you no longer act. You must **not** disclose the client's affairs without consent or legal obligation; the report in step 5 is the route the law provides.",
        },
        {
          kind: "example",
          title: "Working the sequence on a discovered omission",
          scenario:
            "You act for Vellum Ltd in Jurisdiction Z and for its managing director personally. Preparing the company's return, you find that the director's personal return, which your firm submitted last year, omitted CU 45,000 of rental income from an apartment you know he owns. He says he left it out because \"the tax on it would have been unfair\" and refuses to correct it, asking you to get on with the company return.",
          steps: [
            { label: "Establish the facts", detail: "Confirm the apartment is his, that the income is taxable in that period after allowable expenses, and that the omission was deliberate rather than an oversight. His own explanation — that he judged the tax unfair — indicates a conscious decision, which points to deliberate conduct rather than carelessness." },
            { label: "Characterise it correctly", detail: "Deliberately omitting known income is EVASION, not avoidance. It is a criminal offence, and because it involves the proceeds of a crime it engages the money laundering regime in most jurisdictions." },
            { label: "Advise disclosure with the consequences", detail: "Explain that the tax and interest are payable regardless; that the penalty for a DELIBERATE error is materially higher than for a careless one; that an unprompted disclosure attracts the largest available reduction; and that prosecution is possible. Make the case that disclosing now is substantially cheaper than being found." },
            { label: "Give him the opportunity, then act on refusal", detail: "He refuses. You cannot continue to act for a client who will not correct a known deliberate error, because doing so associates you with a return you know to be false. Notify him in writing that you are ceasing to act." },
            { label: "Make the report — without telling him", detail: "Report to your firm's nominated officer, or to the national body if you are a sole practitioner. Do NOT tell the director you have done so: tipping off is a separate offence. The reporting duty overrides confidentiality here; nothing else does." },
            { label: "Do not disclose the reason to the authority", detail: "You may tell the authority that you no longer act. You must not tell them why, or disclose his affairs, without his consent or a legal obligation. Confidentiality survives the end of the engagement." },
            { label: "Deal with the second engagement", detail: "You also act for Vellum Ltd. Consider whether you can continue: your knowledge of the director's conduct, and the fact that he controls the company, create both a conflict and a risk that the company's own records are affected. Check the company's records for related omissions before deciding." },
          ],
          result:
            "**Advise disclosure, cease to act on refusal, report internally without telling him, and do not tell the authority the reason.** The two points weak answers miss are the last two: candidates routinely say the adviser should inform the authority of the evasion, which breaches confidentiality, and routinely forget that telling the client about the report is itself an offence.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Confidentiality is not absolute, and knowing the exceptions is the examinable part",
          md: "Confidentiality **survives** the end of the engagement and applies to information about the client's affairs generally, not merely to what they told you in confidence. But it yields in defined circumstances.\n\n**Where disclosure is required by law** — a money laundering report, a court order, a statutory information notice, or a mandatory disclosure regime for certain arrangements.\n\n**Where the client consents.** Consent should be obtained explicitly rather than assumed, particularly where a third party such as a lender or a purchaser is asking.\n\n**Where there is a professional duty or right to disclose** — defending yourself in disciplinary or legal proceedings, or complying with a professional body's quality review.\n\nThe consequence in the standard scenario is a distinction that must be stated precisely: the adviser makes a **money laundering report** because the law requires it, and does **not** disclose to the tax authority because nothing requires that. Both halves of that sentence earn marks, and running them together loses both.",
        },
      ],
      check: {
        q: "After ceasing to act for a client who refuses to correct a deliberate omission, what may the adviser tell the tax authority?",
        options: [
          "The full details of the omission, since evasion overrides confidentiality",
          "Only that they no longer act — the reason is confidential, and any reporting duty runs to the money laundering regime instead",
          "Nothing at all, including the fact that they no longer act",
          "The details, but only if the client is told first",
        ],
        correct: 1,
        explain:
          "TWO SEPARATE OBLIGATIONS THAT MUST NOT BE MERGED. The adviser may confirm they no longer act but must not disclose the client's affairs to the authority without consent or legal compulsion. The legal duty that does exist runs to the money laundering reporting route — and the client must not be told about that report.",
      },
    },
  ],
  examTraps: [
    { trap: "Answering an ethics question with 'avoidance is legal, evasion is illegal' and stopping.", fix: "Locate the conduct on the spectrum and identify whether the facts were disclosed. Concealment is what makes conduct criminal." },
    { trap: "Advising the adviser to report the evasion to the tax authority.", fix: "That breaches confidentiality. The legal reporting duty runs to the money laundering regime; the authority may only be told that you no longer act." },
    { trap: "Telling the client that a report has been made.", fix: "Where tipping off is an offence, informing the client is a separate crime — however the relationship ends." },
    { trap: "Ceasing to act before advising the client to correct the error.", fix: "Establish the facts, advise disclosure with the consequences, and give the client the opportunity to put it right. Resignation follows refusal." },
    { trap: "Treating an aggressive but disclosed arrangement as evasion.", fix: "It is avoidance, open to counteraction under a general anti-abuse rule. Criminality requires misstatement or concealment." },
  ],
  keyTerms: [
    { term: "Tax evasion", def: "Illegally concealing or misstating facts to reduce tax. A criminal offence, regardless of amount." },
    { term: "Tax avoidance", def: "Legally arranging affairs to reduce tax, ranging from wholly intended use of reliefs to abusive artificial schemes." },
    { term: "General anti-abuse rule", def: "A provision letting the authority counteract abusive arrangements that cannot reasonably be regarded as a reasonable course of action, even where each step is lawful." },
    { term: "Tipping off", def: "Informing a person that a suspicion report has been made, itself an offence in jurisdictions with a money laundering regime." },
    { term: "Nominated officer", def: "The person within a firm to whom internal suspicion reports are made, who decides whether to report onward." },
    { term: "Self-interest threat", def: "A threat to objectivity arising where the adviser's own financial or other interest could influence their judgement, such as a large contingent fee." },
    { term: "Unprompted disclosure", def: "Disclosure made before the authority indicates it has discovered the matter, attracting the largest penalty reduction." },
  ],
  summary: [
    "Planning, acceptable avoidance, abusive avoidance and evasion form a spectrum, not two boxes.",
    "Concealment is what makes conduct criminal — a fully disclosed aggressive scheme is avoidance, not evasion.",
    "A general anti-abuse rule counteracts arrangements that are lawful in form but abusive in substance, and deters more than it counteracts.",
    "The five fundamental principles are integrity, objectivity, competence and due care, confidentiality and professional behaviour.",
    "On discovering an error: establish facts, advise disclosure with consequences, allow correction, cease to act on refusal, report where required, do not tip off, do not tell the authority why.",
    "Confidentiality survives the engagement and yields only to legal compulsion, client consent or a professional duty.",
  ],
}

/* ── Chapter 23 ────────────────────────────────────────────────── */

export const TXG_TREE_23: StudyChapter = {
  id: "TXG-23",
  number: 23,
  paper: "TX",
  area: "G",
  title: "Treaties, taxing rights and double tax relief",
  minutes: 18,
  intro:
    "Chapter 2 established that two jurisdictions can each have a complete claim on the same income. This chapter is how that overlap is actually resolved — by treaty where one exists, and unilaterally where it does not.",
  outcomes: [
    "Explain the purpose and effect of a double tax treaty",
    "Apply residence tie-breaker tests to a dually resident individual",
    "Explain how a treaty allocates taxing rights between residence and source",
    "Compute relief by exemption and by credit, and compare the two",
    "Explain the purpose of withholding taxes and treaty rate reductions",
  ],
  sections: [
    {
      id: "treaties",
      heading: "What a treaty does, and what it does not do",
      blocks: [
        {
          kind: "callout",
          tone: "key",
          title: "A treaty allocates and limits; it never creates a charge",
          md: "This is the single most important structural point, and it is regularly misunderstood.\n\nA double tax treaty **restricts** the taxing rights the two states would otherwise have under their domestic law. It does not impose tax. So the working order is always: **first establish the domestic charge, then ask whether the treaty limits it.** A treaty cannot make something taxable that domestic law does not tax.\n\nWhat a treaty does provide:\n\n**Tie-breakers** to determine a single residence where both states claim a person as resident.\n\n**Allocation rules**, article by article, giving the exclusive or primary right to tax particular kinds of income to one state or the other.\n\n**Reduced withholding rates** on dividends, interest and royalties, usually well below the domestic rate.\n\n**A relief article** requiring the residence state to relieve tax properly charged at source, by exemption or by credit.\n\n**Non-discrimination, exchange of information and a mutual agreement procedure** for resolving disputes between the two authorities.",
        },
        {
          kind: "formula",
          name: "The residence tie-breaker, applied strictly in order",
          expr: "Where BOTH states treat an individual as resident under their\nown domestic law, apply these tests IN SEQUENCE and STOP at the\nfirst one that gives a single answer:\n\n  1.  PERMANENT HOME available to them\n         -> if in only one state, that state wins\n\n  2.  CENTRE OF VITAL INTERESTS\n         (closer personal and economic relations)\n\n  3.  HABITUAL ABODE\n         (where they spend their time in a settled pattern)\n\n  4.  NATIONALITY\n\n  5.  MUTUAL AGREEMENT between the two authorities\n\nFor a COMPANY, the usual tie-breaker is the place of\nEFFECTIVE MANAGEMENT, or increasingly a mutual agreement\nprocedure between the authorities.",
          note: "The sequence is not a list of factors to weigh together — it is a cascade, and each test is reached only if the previous one fails to decide. A candidate who reasons about nationality while the person plainly has a permanent home in only one state has applied the wrong test. Note too that nationality appears fourth: it is a tie-breaker of last resort, not a starting point, which reinforces the message from Chapter 4.",
        },
        {
          kind: "table",
          caption: "How treaties typically allocate the right to tax",
          head: ["Type of income", "Which state may tax", "Why"],
          rows: [
            ["**Income from immovable property**", "The state where the property is, without limit", "The strongest source connection there is — the asset cannot move"],
            ["**Business profits**", "The residence state, UNLESS there is a permanent establishment in the source state", "The permanent establishment threshold from Chapter 14"],
            ["**Employment income**", "Where the duties are performed, subject to a short-stay exemption for brief visits paid from abroad", "Follows the activity, with an exception for genuinely transient presence"],
            ["**Dividends, interest, royalties**", "Both — but the source state's rate is CAPPED by the treaty", "A compromise: the source state keeps something, the residence state taxes the rest"],
            ["**Capital gains**", "Usually the residence state, except gains on immovable property and on land-rich companies", "Prevents property being taken offshore by holding it through a company"],
          ],
        },
        {
          kind: "callout",
          tone: "rule",
          title: "Why treaties cap withholding rates, and why the cap is not automatic",
          md: "A source state that could withhold at its full domestic rate on every payment abroad would make cross-border investment expensive, and both states lose from that. So treaties cap the rate — commonly at a low percentage for interest and royalties, and at two tiers for dividends, with a lower rate for substantial corporate shareholdings than for portfolio investors.\n\nTwo practical points follow, and both appear in scenarios.\n\nThe reduced rate is usually **not automatic**. The recipient must claim it, often by certifying residence in advance or by reclaiming the excess afterwards. A payer who withholds at the domestic rate has not done anything wrong; the recipient simply has a claim to make.\n\nAnd treaty benefits are increasingly subject to **anti-abuse conditions**. *Treaty shopping* — routing income through a third country purely to access a better treaty — is countered by beneficial ownership requirements and by principal purpose tests denying benefits where obtaining them was a main purpose of the arrangement. An intermediate holding company with no substance is the classic target.",
        },
      ],
      check: {
        q: "An individual is resident in both states under their domestic laws, but has a permanent home available in only one. Which tie-breaker decides?",
        options: [
          "Centre of vital interests, because it is the most reliable test",
          "The permanent home test — the cascade stops at the first test that gives a single answer",
          "Nationality, because it is objective",
          "All the tests are weighed together",
        ],
        correct: 1,
        explain:
          "THE TIE-BREAKERS ARE A CASCADE, NOT A BALANCE. Permanent home is applied first, and because it points to only one state the enquiry ends there. Centre of vital interests, habitual abode and nationality are reached only if each earlier test fails to produce a single answer.",
      },
    },
    {
      id: "relief-methods",
      heading: "The two relief methods, and which is worth more",
      blocks: [
        {
          kind: "formula",
          name: "Exemption and credit compared",
          expr: "EXEMPTION METHOD\n     The residence state simply does not tax the foreign income.\n     Total tax  =  the SOURCE state's tax.\n\n     Under EXEMPTION WITH PROGRESSION the foreign income is\n     still counted in deciding the RATE on the rest, without\n     being taxed itself.\n\nCREDIT METHOD\n     The residence state taxes the WORLDWIDE income, then gives\n     a credit for the foreign tax suffered:\n\n       CREDIT  =  the LOWER of\n                    (a) the foreign tax actually paid\n                    (b) the residence-state tax on that same income\n\n     Total tax  =  the HIGHER of the two states' tax on that income.\n\n     Any EXCESS foreign tax is normally WASTED -- it cannot be\n     set against tax on other income, though some systems allow\n     it to be carried to another period.",
          note: "The cap is the whole mechanism, and the reason for it is straightforward: the residence state is willing to give up its own tax on the income to avoid double taxation, but it is not willing to refund another country's tax out of its own revenue. That is why the credit method always leaves the taxpayer bearing the HIGHER of the two rates, and why moving income to a high-tax source country produces no benefit at home.",
        },
        {
          kind: "example",
          title: "Computing relief both ways, at two different foreign rates",
          scenario:
            "Aleksy is resident in Jurisdiction Z, which taxes worldwide income at 30% and gives credit relief. He has domestic income of CU 100,000 and foreign income of CU 50,000. Consider two cases: in case 1 the source state taxed the foreign income at 20%; in case 2 it taxed it at 40%.",
          steps: [
            { label: "Case 1 — compute the domestic liability on worldwide income", detail: "CU 150,000 × 30% = CU 45,000. Of that, the tax attributable to the foreign income is CU 50,000 × 30% = CU 15,000." },
            { label: "Case 1 — compute the credit", detail: "Foreign tax paid: CU 50,000 × 20% = CU 10,000. Domestic tax on that income: CU 15,000. The credit is the LOWER, so CU 10,000." },
            { label: "Case 1 — total tax", detail: "Z collects CU 45,000 − CU 10,000 = CU 35,000, and the source state collected CU 10,000. Total CU 45,000 — exactly the domestic figure, because the foreign rate was lower. Effective rate on the foreign income: 30%." },
            { label: "Case 2 — compute the credit", detail: "Foreign tax paid: CU 50,000 × 40% = CU 20,000. Domestic tax on that income remains CU 15,000. The credit is the lower figure, CU 15,000 — so CU 5,000 of foreign tax is UNRELIEVED and normally wasted." },
            { label: "Case 2 — total tax", detail: "Z collects CU 45,000 − CU 15,000 = CU 30,000, and the source state collected CU 20,000. Total CU 50,000. Effective rate on the foreign income: 40%, the higher of the two rates." },
            { label: "Compare with what exemption would have given", detail: "Under exemption, case 1 would cost CU 30,000 domestic + CU 10,000 foreign = CU 40,000, which is CU 5,000 LESS than credit relief gave. Case 2 would cost CU 30,000 + CU 20,000 = CU 50,000, the same as credit. So exemption is better where the foreign rate is LOWER, and the two coincide where it is higher." },
          ],
          result:
            "**Credit relief always leaves the taxpayer bearing the higher of the two rates; exemption leaves them bearing the source rate.** That is why exemption systems are attractive to businesses investing in low-tax countries, and why states operating them add controlled foreign company rules to stop profits being parked in tax havens — a point worth making whenever a scenario contrasts the two methods.",
        },
        {
          kind: "list",
          title: "Unilateral relief, and what to do when there is no treaty",
          items: [
            "**Unilateral credit.** Most jurisdictions give credit relief for foreign tax under domestic law even where no treaty exists, because the alternative — taxing their own residents twice — would discourage outward investment. The mechanism is the same lower-of comparison.",
            "**Deduction relief as a fallback.** Where credit is unavailable, some systems allow the foreign tax to be deducted from the income instead. It is much less valuable: a deduction is worth the marginal rate, while a credit is worth its face amount — the distinction from Chapter 2. It can still be preferable where there is no domestic liability for a credit to be set against.",
            "**Source-by-source computation.** Credit is normally computed separately for each source of income rather than in aggregate, which prevents excess credit on a highly taxed source sheltering domestic tax on a lightly taxed one.",
            "**Order of set-off.** Where several sources carry foreign tax, relieve the one with the HIGHEST foreign rate first, so that the credits most at risk of being capped are used against the available domestic tax before the others.",
            "**Evidence.** A credit claim normally requires proof that the foreign tax was actually paid and was properly due. Tax paid voluntarily, or in excess of what a treaty permitted the source state to charge, is generally not creditable — the taxpayer is expected to claim the treaty rate rather than pay and reclaim at home.",
          ],
        },
      ],
      check: {
        q: "Foreign income of CU 40,000 bore foreign tax of CU 14,000. Domestic tax on that income would be CU 10,000. What credit is given?",
        options: [
          "CU 14,000, the foreign tax actually paid",
          "CU 10,000 — the lower of the two — with CU 4,000 of foreign tax unrelieved",
          "CU 24,000, the total of both",
          "CU 4,000, the excess",
        ],
        correct: 1,
        explain:
          "THE CREDIT IS CAPPED AT THE DOMESTIC TAX ON THAT INCOME. A residence state will give up its own tax to prevent double taxation but will not refund another country's tax from its own revenue. So CU 10,000 is credited and CU 4,000 is wasted, leaving the taxpayer bearing the higher foreign rate overall.",
      },
    },
  ],
  examTraps: [
    { trap: "Using a treaty to create a charge.", fix: "Treaties allocate and limit taxing rights; they never impose tax. Establish the domestic charge first, then ask whether the treaty restricts it." },
    { trap: "Weighing the residence tie-breakers together.", fix: "They are a cascade applied in strict order. Stop at the first test that produces a single answer; nationality is a last resort." },
    { trap: "Crediting the full foreign tax.", fix: "The credit is the LOWER of the foreign tax and the domestic tax on that income. Excess foreign tax is normally wasted." },
    { trap: "Computing credit relief on aggregate foreign income.", fix: "It is normally source by source, so excess credit on one source cannot shelter domestic tax on another." },
    { trap: "Assuming a treaty withholding rate applies automatically.", fix: "It usually must be claimed, by certifying residence in advance or reclaiming afterwards — and it can be denied by beneficial ownership or principal purpose tests." },
  ],
  keyTerms: [
    { term: "Double tax treaty", def: "A bilateral agreement allocating and limiting the taxing rights each state would otherwise exercise under its domestic law." },
    { term: "Tie-breaker", def: "The ordered sequence of tests resolving dual residence — permanent home, centre of vital interests, habitual abode, nationality, then mutual agreement." },
    { term: "Exemption method", def: "Relief given by the residence state not taxing the foreign income, sometimes still counting it in setting the rate on other income." },
    { term: "Credit method", def: "Relief given by taxing worldwide income and crediting the lower of the foreign tax paid and the domestic tax on that income." },
    { term: "Unrelieved foreign tax", def: "Foreign tax exceeding the domestic tax on the same income, normally wasted rather than repaid." },
    { term: "Treaty shopping", def: "Routing income through a third state purely to access a more favourable treaty, countered by beneficial ownership and principal purpose tests." },
    { term: "Mutual agreement procedure", def: "A treaty mechanism by which the two authorities resolve disputes, including corresponding adjustments after transfer pricing." },
  ],
  summary: [
    "A treaty allocates and limits taxing rights and never creates a charge — establish the domestic position first.",
    "Dual residence is resolved by a strict cascade: permanent home, centre of vital interests, habitual abode, nationality, mutual agreement.",
    "Immovable property is taxed where it sits; business profits only where there is a permanent establishment; employment income where duties are performed.",
    "Treaties cap withholding on dividends, interest and royalties, but the reduced rate usually has to be claimed and can be denied for abuse.",
    "Exemption leaves the taxpayer bearing the source rate; credit leaves them bearing the higher of the two rates.",
    "The credit is the lower of foreign tax paid and domestic tax on that income, computed source by source, with the excess normally wasted.",
  ],
}

/* ── Chapter 24 ────────────────────────────────────────────────── */

export const TXG_TREE_24: StudyChapter = {
  id: "TXG-24",
  number: 24,
  paper: "TX",
  area: "G",
  title: "Employability and technology skills in tax work",
  minutes: 18,
  intro:
    "Tax software computes; it does not decide. This chapter is about the work around the computation — sourcing data, checking what a tool produced, and communicating a conclusion to someone who has to act on it.",
  outcomes: [
    "Use spreadsheets and tax software effectively and check their output",
    "Identify the data quality problems that corrupt a tax computation",
    "Explain the limits of automation and where human judgement remains essential",
    "Communicate a tax conclusion appropriately for its audience",
    "Explain the professional obligations attaching to client data",
  ],
  sections: [
    {
      id: "tools-and-data",
      heading: "Working with the tools, and distrusting them appropriately",
      blocks: [
        {
          kind: "table",
          caption: "What each tool is good for, and where it fails",
          head: ["Tool", "Good for", "Where it fails"],
          rows: [
            ["**Spreadsheet**", "Computations, scenario comparison, apportionments, showing workings transparently", "Silent errors — a wrong range, a copied formula, a hard-coded figure that should have been a reference"],
            ["**Tax software**", "Applying current rates, validating a return, filing electronically, flagging inconsistencies", "It applies rules to the data given. Wrong classification in, wrong answer out — with a professional presentation"],
            ["**Accounting system**", "Source data on income and expenditure", "It is prepared for accounting purposes; tax classifications frequently differ"],
            ["**Authority portals**", "Filing, payments, statements of account, published guidance", "Guidance is the authority's view, not law — the point from Chapter 2"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The characteristic failure of tax software is a confident wrong answer",
          md: "A spreadsheet error usually looks like an error: a total that does not add up, a figure that is obviously implausible. Tax software fails differently — it takes what it is given, applies the rules correctly, and produces a neatly formatted return that is wrong because the **input classification** was wrong.\n\nNothing in the output signals this. A repair posted as an improvement, employment income coded as self-employment, a supply classified as exempt when it was zero-rated: each produces a clean, professional, incorrect result.\n\nSo the check must happen at the input, and the discipline is to **reconcile the output to an independent expectation** before accepting it. Two habits do most of the work:\n\n**Compare to last period.** A figure that has moved materially without a known reason is the strongest single indicator of a data or classification error.\n\n**Compute the effective rate.** Divide the tax by the profit. If it does not sit near the rate you expect, something is wrong — and this catches classification errors that line-by-line review misses entirely.",
        },
        {
          kind: "list",
          title: "Data problems that corrupt a computation, and how each is caught",
          items: [
            "**Wrong period.** Income or expenditure recorded outside the period it belongs to. Caught by cut-off testing around the period end — checking that the last transactions of the period and the first of the next fall on the right side.",
            "**Wrong classification.** The largest source of error. A repair capitalised, a benefit treated as a business expense, a zero-rated supply recorded as exempt. Caught by reviewing the basis of classification for material items rather than the arithmetic.",
            "**Duplication.** The same invoice entered twice, or an amount included both in a control account and separately. Caught by matching records against an independent source such as bank statements.",
            "**Missing data.** Cash sales never recorded, a bank account not disclosed. The hardest to find, because nothing in the records points to what is absent. Caught by reconciling to something external — banked receipts against recorded sales, as in Chapter 3's example.",
            "**Currency and units.** Foreign amounts translated at the wrong rate or date, or figures in thousands mixed with figures in units. Caught by checking magnitudes against expectation before anything else.",
            "**Stale rates.** Software or a spreadsheet still applying a superseded rate after a change. Caught by confirming the rate applied against the current published figures at the start of each period."
          ],
        },
        {
          kind: "callout",
          tone: "key",
          title: "Automation bias, and what it costs",
          md: "**Automation bias** is the tendency to accept a system's output because it came from a system. It is a documented failure of judgement rather than a failure of the tool, and it is the single most important risk in a computerised tax function.\n\nIt shows itself in a specific way: a reviewer who would have questioned a figure written by a colleague accepts the same figure from software without challenge. The presentation carries authority the number has not earned.\n\nThe professional position is unchanged by the tool. **The person signing the return is responsible for it.** Software applies rules to the data it is given; deciding whether an expense is capital or revenue, whether a worker is employed or self-employed, whether an arrangement is abusive — these are judgements, and none of them is delegated by using a package that has a field for the answer.\n\nThe practical counter is to require an **independent expectation before looking at the output**: estimate roughly what the answer should be, then compare. A reviewer who forms no expectation has nothing to be surprised by, and surprise is the mechanism by which errors are found.",
        },
      ],
      check: {
        q: "Tax software produces a professionally formatted return from correctly entered figures that were wrongly classified. What has happened?",
        options: [
          "The software has malfunctioned and should be reported",
          "The output is wrong despite the software working correctly — classification is a judgement the tool does not make",
          "Nothing — the software's output is authoritative",
          "The error will be caught automatically at filing",
        ],
        correct: 1,
        explain:
          "THE TOOL APPLIED THE RULES CORRECTLY TO THE WRONG INPUT. Classification — capital or revenue, employed or self-employed, exempt or zero-rated — is a judgement that remains with the preparer. Nothing in a clean output signals a classification error, which is why checks must happen at the input and against an independent expectation.",
      },
    },
    {
      id: "communication-and-obligations",
      heading: "Communicating the answer, and looking after the data",
      blocks: [
        {
          kind: "callout",
          tone: "rule",
          title: "Write for the person who has to act on it",
          md: "A tax conclusion is useless if its reader cannot act on it. Match the output to the audience:\n\n**A client who is not an accountant** needs the answer first, in plain language, with the amount and the date it is due. Put the conclusion at the top, not at the end of the reasoning — they will read the first paragraph and may read no further.\n\n**A finance director** needs the number, the basis, the assumptions and the risks. They will want to know what would change the answer.\n\n**The tax authority** needs precision, the statutory basis, and completeness. Nothing informal, and nothing that overstates certainty.\n\n**A colleague or reviewer** needs the workings, the sources and the judgements taken, so the file can be understood without you present.\n\nThree things belong in almost any tax advice. **State your assumptions**, because tax answers depend on facts you were told rather than verified. **Quantify** — an answer saying tax \"will increase\" is much less useful than one saying by how much. And **say what is uncertain**, because a client who is not told about a risk cannot decide how much of it to take.",
        },
        {
          kind: "example",
          title: "Turning a computation into advice",
          scenario:
            "You have computed that a client's proposed sale of a business asset in Jurisdiction Z will produce a gain of CU 240,000 and tax of CU 57,600. The sale is planned for late in the current tax period. Deferring the contract by three weeks would move it into the next period, using a fresh annual exemption and postponing the payment date by a year. The client has told you they need the cash by the end of the quarter.",
          steps: [
            { label: "Lead with the answer, not the workings", detail: "Open with the figure and the date: the sale as planned produces tax of CU 57,600, payable on the stated date. The client's first question is always how much and when." },
            { label: "Give the alternative and quantify it", detail: "Contracting three weeks later moves the disposal into the next period. State the saving in cash terms — a further annual exemption, plus a year's deferral of the payment — rather than describing the mechanism in the abstract." },
            { label: "Apply their actual constraint", detail: "They need the cash by the quarter end. Deferring the CONTRACT date defers the disposal for tax, but it may also defer completion and therefore the money. Say explicitly whether the alternative is compatible with their stated requirement — advice that ignores the constraint they gave you is not advice." },
            { label: "State the assumptions", detail: "That the asset qualifies as described, that no other disposals will use the next period's exemption, that the rate is unchanged, and that the buyer will accept the later date. Each is a fact you were told or have assumed rather than verified." },
            { label: "Identify the risks", detail: "A buyer may withdraw if the timetable moves. Rates and exemptions can change between periods. And the deferral is worth less if the client has other disposals planned that would use the exemption anyway." },
            { label: "Make a recommendation", detail: "Do not present two options neutrally and stop. Say which you recommend on the facts given, and what would change it. A client asked to choose between two options they do not understand has not been advised." },
          ],
          result:
            "**Answer, alternative, constraint, assumptions, risks, recommendation.** The step candidates most often omit is the third — applying the client's stated constraint — and it is the one that separates a computation with commentary from actual advice.",
        },
        {
          kind: "list",
          title: "Professional obligations attaching to the data itself",
          items: [
            "**Security.** Client tax data is highly sensitive — income, assets, family circumstances. Encryption, access control and secure transfer are professional obligations, not IT preferences, and a breach is a confidentiality failure in the sense of Chapter 22.",
            "**Data protection.** Most jurisdictions regulate personal data: collect only what is needed, use it only for the purpose it was given, keep it only as long as necessary, and be able to say what you hold.",
            "**Retention.** Records must be kept for the period the tax rules require, which may be longer than a client relationship lasts and longer than data protection would otherwise suggest. The two obligations have to be reconciled deliberately rather than by default.",
            "**Audit trail.** A computation should be reconstructable: which figures came from where, which judgements were taken, and who reviewed it. An enquiry years later is answered from the file, not from memory.",
            "**Backup and continuity.** Losing the records that support a filed return leaves the client unable to defend it — the practical point behind the record-keeping rules in Chapter 3.",
            "**Third-party tools.** Sending client data to an external service, including an online tool, is a disclosure. Check what the provider does with it before using it, because confidentiality is owed regardless of how convenient the tool is."
          ],
        },
      ],
      check: {
        q: "What is the most important thing to include when advising a client on two possible courses of action?",
        options: [
          "A neutral presentation of both options, leaving the choice to them",
          "A recommendation with reasons, applied to the constraints the client actually stated",
          "The full statutory references for each option",
          "A detailed reconciliation of the computation",
        ],
        correct: 1,
        explain:
          "ADVICE MEANS RECOMMENDING, NOT LISTING. A client who cannot evaluate the technical merits has not been helped by a neutral presentation. The recommendation must be applied to the constraints they gave you — a timing option that conflicts with a stated cash requirement is not a real option.",
      },
    },
  ],
  examTraps: [
    { trap: "Accepting software output because it looks professional.", fix: "Automation bias. Form an independent expectation first, compare to the prior period, and check the effective rate against what you expect." },
    { trap: "Reviewing the arithmetic rather than the classification.", fix: "Classification errors are the largest source of wrong answers and produce clean output. Review the BASIS on which material items were classified." },
    { trap: "Presenting options neutrally without recommending one.", fix: "Recommend, with reasons, applied to the client's stated constraints — and say what would change the recommendation." },
    { trap: "Giving advice without stating assumptions.", fix: "Tax answers rest on facts you were told rather than verified. Unstated assumptions transfer the risk to you." },
    { trap: "Uploading client data to an external tool without checking it.", fix: "That is a disclosure of confidential information. Confirm what the provider does with the data before it leaves your control." },
  ],
  keyTerms: [
    { term: "Automation bias", def: "The tendency to accept a system's output because it came from a system, rather than testing it against an independent expectation." },
    { term: "Cut-off testing", def: "Checking transactions either side of a period end to confirm they fall in the correct period." },
    { term: "Effective rate check", def: "Dividing tax by profit and comparing the result to the expected rate, a fast way of detecting classification errors." },
    { term: "Audit trail", def: "The record of where figures came from, what judgements were taken and who reviewed them, allowing a computation to be reconstructed later." },
    { term: "Independent expectation", def: "An estimate of the likely answer formed before seeing the output, so that a wrong result is surprising rather than invisible." },
    { term: "Data minimisation", def: "Collecting and retaining only the personal data actually needed for the purpose it was obtained for." },
  ],
  summary: [
    "Spreadsheets fail visibly; tax software fails invisibly, producing clean output from wrongly classified input.",
    "Check at the input and against an independent expectation — prior-period comparison and an effective rate check catch most errors.",
    "The common data problems are wrong period, wrong classification, duplication, missing data, currency errors and stale rates.",
    "Automation bias is a failure of judgement, not of the tool; responsibility stays with the person signing the return.",
    "Match communication to the audience, lead with the answer, quantify, state assumptions and identify risks.",
    "Advice means recommending with reasons against the client's stated constraints, not listing options neutrally.",
    "Client tax data carries obligations of security, data protection, retention, audit trail and care with third-party tools.",
  ],
}

export const TXG_AREA_G: StudyChapter[] = [TXG_TREE_22, TXG_TREE_23, TXG_TREE_24]
