import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Areas G and H question kit — chapters 41 to 46.
 *
 * Liquidation and the order of payment, administration, insider dealing and market
 * abuse, money laundering, bribery and the tax evasion facilitation offence, and
 * fraudulent and wrongful trading.
 *
 * The order of payment is examined as a computation rather than a list, because that is
 * how the paper tests it and because the reliably wrong answer — paying the floating
 * charge holder straight after the fixed charge holder — only shows up when figures are
 * involved.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 41 · Liquidation and the order of payment ───────────── */

const CH41: AccaQuestion[] = [
  q1("LWEK-41-01", "LWE-41", "G", "easy",
    "What distinguishes a members' from a creditors' voluntary liquidation?",
    [
      "The size of the company",
      "Solvency, evidenced by the directors' declaration that debts can be paid in full within 12 months",
      "Whether a court order has been made",
      "Whether the company is listed",
    ],
    1,
    "SOLVENCY, evidenced by the DECLARATION OF SOLVENCY. In an MVL the members appoint the liquidator; in a CVL the CREDITORS' choice prevails and they control it."),

  q1("LWEK-41-02", "LWE-41", "G", "easy",
    "Which is a preferential debt on liquidation?",
    ["Trade creditors' invoices", "Capped arrears of employees' wages", "Directors' loans", "Post-liquidation interest"],
    1,
    "CAPPED ARREARS OF WAGES, along with accrued holiday pay and certain occupational pension contributions. Preferential debts rank equally among themselves and abate rateably."),

  q2("LWEK-41-03", "LWE-41", "G", "medium",
    "Where does a floating charge holder rank in the order of payment?",
    [
      "Immediately after the fixed charge holder",
      "After liquidation expenses, preferential debts and the prescribed part",
      "Equally with the unsecured creditors",
      "Ahead of liquidation expenses but behind preferential debts",
    ],
    1,
    "AFTER the liquidation EXPENSES, the PREFERENTIAL debts and the PRESCRIBED PART — the last being carved out of its own security for the unsecured creditors. That subordination is why lenders take fixed charges wherever the asset allows."),

  q2("LWEK-41-04", "LWE-41", "G", "medium",
    "A fixed charge holder is owed £340,000 and realises £300,000 from its security. What happens to the £40,000 shortfall?",
    [
      "It is written off",
      "It ranks as an unsecured claim alongside the trade creditors",
      "It ranks as a preferential debt",
      "It is paid out of the prescribed part in priority",
    ],
    1,
    "It ranks as an UNSECURED claim with the trade creditors — which also dilutes their dividend. A secured creditor's shortfall is not written off, and it gains no priority."),

  q2("LWEK-41-05", "LWE-41", "G", "medium",
    "Two months before liquidation the company repaid a director's personal loan ahead of all trade creditors. What can the liquidator do?",
    [
      "Nothing, the debt being genuinely owed",
      "Apply to have the payment set aside as a preference, bringing the money back into the estate",
      "Treat the director as a preferential creditor",
      "Only report the matter for disqualification purposes",
    ],
    1,
    "Apply to have it SET ASIDE as a PREFERENCE. Clawback of preferences and transactions at an undervalue is why \"the company has no assets\" does not always mean the creditors get nothing — and it may also ground disqualification."),

  q2("LWEK-41-06", "LWE-41", "G", "medium",
    "Directors make a declaration of solvency and the company enters an MVL. The liquidator finds it cannot pay in full. What happens?",
    [
      "The MVL continues with the members in control",
      "It converts into a creditors' voluntary liquidation and control passes to the creditors",
      "The court must make a compulsory winding-up order",
      "The liquidation is void and must restart",
    ],
    1,
    "It CONVERTS into a CVL and control passes to the CREDITORS. Note also that a director who made the declaration WITHOUT REASONABLE GROUNDS commits a criminal offence."),

  q2("LWEK-41-07", "LWE-41", "G", "hard",
    "A company realises £500,000 from floating charge assets. Expenses are £60,000, preferential debts £90,000, the prescribed part £48,000, and the floating charge secures £450,000. What does the charge holder receive?",
    ["£450,000", "£302,000", "£350,000", "£500,000"],
    1,
    "£302,000. Deduct expenses £60,000 and preferential debts £90,000, leaving £350,000; then the prescribed part of £48,000 is carved out for the unsecured creditors, leaving £302,000. The £148,000 shortfall becomes an UNSECURED claim."),
]

/* ── Chapter 42 · Administration ────────────────────────────────── */

const CH42: AccaQuestion[] = [
  q1("LWEK-42-01", "LWE-42", "G", "easy",
    "What is the PRIMARY objective of administration?",
    [
      "Realising property for secured creditors",
      "Rescuing the company as a going concern",
      "Achieving a better result for creditors than a winding up",
      "Dismissing the workforce to cut costs",
    ],
    1,
    "RESCUING THE COMPANY as a going concern. The three objectives form a mandatory HIERARCHY, and rescue must be pursued unless it is not reasonably practicable or the second would be better for creditors as a whole."),

  q1("LWEK-42-02", "LWE-42", "G", "easy",
    "How long does an administration last before ending automatically?",
    ["Three months", "Six months", "One year", "Two years"],
    2,
    "ONE YEAR, unless extended by the court or with creditors' consent for a limited further period."),

  q2("LWEK-42-03", "LWE-42", "G", "medium",
    "What does the moratorium in administration prevent?",
    [
      "Only the enforcement of security",
      "Winding-up petitions proceeding, security being enforced, repossession under retention of title, and legal proceedings — without consent or permission",
      "Only new legal proceedings",
      "The company from trading",
    ],
    1,
    "All of those, without the ADMINISTRATOR'S CONSENT or the COURT'S PERMISSION. That freeze is the heart of administration — without it the first creditor to move would dismember the business before any rescue could be attempted."),

  q2("LWEK-42-04", "LWE-42", "G", "medium",
    "The directors wish to appoint an administrator out of court, and the company has granted a qualifying floating charge. What must they do?",
    [
      "Nothing beyond filing the prescribed documents",
      "Give the charge holder five business days' notice, and that holder may appoint its own choice instead",
      "Obtain the charge holder's written consent",
      "Apply to the court, the out-of-court route being unavailable to directors",
    ],
    1,
    "Give FIVE BUSINESS DAYS' NOTICE to the qualifying floating charge holder, who may then appoint ITS OWN choice. Consent is not needed and the out-of-court route IS open to directors — but the secured lender effectively controls who is appointed."),

  q2("LWEK-42-05", "LWE-42", "G", "medium",
    "What happens to the directors on the appointment of an administrator?",
    [
      "They are automatically dismissed",
      "They remain in office but may not exercise management powers without the administrator's consent",
      "They retain full control of the company",
      "They become personally liable for the company's debts",
    ],
    1,
    "They REMAIN IN OFFICE but their management powers are effectively SUSPENDED. Note also that EMPLOYEES are not automatically dismissed, unlike on a compulsory winding-up order — which is part of what makes rescue possible."),

  q2("LWEK-42-06", "LWE-42", "G", "hard",
    "A company has a valuable order book, 40 skilled employees, a pending winding-up petition and a supplier seeking to repossess stock. Why is administration preferable to liquidation?",
    [
      "Because the company's debts would be written off",
      "Because the moratorium halts the petition, enforcement and repossession, and employees are not automatically dismissed, so the order book keeps its value",
      "Because the directors retain full control",
      "Because secured creditors lose their security",
    ],
    1,
    "The MORATORIUM plus the fact that EMPLOYEES ARE NOT DISMISSED. A winding-up order would dismiss the workforce, ending the ability to deliver the order book, and the assets would fetch break-up value. Debts are not written off and security is not lost."),
]

/* ── Chapter 43 · Insider dealing and market abuse ──────────────── */

const CH43: AccaQuestion[] = [
  q1("LWEK-43-01", "LWE-43", "H", "easy",
    "Which is NOT an element of inside information?",
    [
      "That it is specific or precise",
      "That it has not been made public",
      "That it would be likely to have a significant effect on price if made public",
      "That the person possessing it intends to profit",
    ],
    3,
    "An INTENTION TO PROFIT is not an element of the information's definition. The four are: specific or precise, not made public, relating to particular securities or an issuer, and likely to have a significant price effect."),

  q1("LWEK-43-02", "LWE-43", "H", "easy",
    "What is the standard of proof in market abuse proceedings?",
    ["Beyond reasonable doubt", "On the balance of probabilities", "Absolute certainty", "The criminal standard for dealing, civil for disclosure"],
    1,
    "ON THE BALANCE OF PROBABILITIES, market abuse being a CIVIL regulatory regime. That is why it can bite where a criminal prosecution for insider dealing could not be proved."),

  q2("LWEK-43-03", "LWE-43", "H", "medium",
    "A director tells a friend in confidence that a takeover bid is imminent. The friend, understanding what he was told, buys shares. Who is liable?",
    [
      "Only the director, the friend having no connection with the company",
      "Both — the director for disclosing, and the friend as a secondary insider for dealing",
      "Only the friend, having actually dealt",
      "Neither, it being a private conversation",
    ],
    1,
    "BOTH. The director commits the DISCLOSING offence. The friend is a SECONDARY INSIDER — he received it from an inside source and KNEW its character — so his purchase is the DEALING offence. Having no connection with the company is irrelevant."),

  q2("LWEK-43-04", "LWE-43", "H", "medium",
    "A trader with no inside information places large orders he intends to cancel, to create a false impression of demand. What has he done?",
    [
      "Committed insider dealing",
      "Committed market abuse by manipulation — no inside information is needed for that form",
      "Nothing unlawful, the orders never being executed",
      "Committed the disclosing offence",
    ],
    1,
    "MARKET ABUSE by MANIPULATION. Giving false or misleading signals as to supply, demand or price needs NO inside information, which is exactly why the civil regime is wider than the criminal offence."),

  q2("LWEK-43-05", "LWE-43", "H", "medium",
    "An employee of an issuer sells shares in the price-sensitive period, but had not seen the relevant papers and knew nothing of the information. Is there an offence?",
    [
      "Yes, an employee is always a primary insider",
      "No — possession of inside information is an element, and he had none",
      "Yes, unless he can prove he needed the money",
      "Yes, but the defence of wide disclosure applies",
    ],
    1,
    "NO. POSSESSION of inside information is an element of the offence, so an insider who simply does not have it commits nothing. Had he known, the defence that he WOULD HAVE ACTED ANYWAY might also have been available."),

  q2("LWEK-43-06", "LWE-43", "H", "hard",
    "Which is NOT a defence to insider dealing?",
    [
      "That the person did not expect a profit attributable to the price-sensitive information",
      "That the person believed on reasonable grounds the information had been widely disclosed",
      "That the person made no profit in the event",
      "That the person would have acted the same way anyway",
    ],
    2,
    "MAKING NO PROFIT is not a defence, because the test is EXPECTATION, not outcome. The other three are the recognised general defences, alongside special defences for market makers, market information and price stabilisation."),
]

/* ── Chapter 44 · Money laundering ──────────────────────────────── */

const CH44: AccaQuestion[] = [
  q1("LWEK-44-01", "LWE-44", "H", "easy",
    "What are the three stages of money laundering?",
    ["Placement, layering, integration", "Deposit, transfer, withdrawal", "Concealment, arrangement, acquisition", "Assessment, reporting, disclosure"],
    0,
    "PLACEMENT, LAYERING and INTEGRATION — criminal proceeds entering the system, being obscured, then re-emerging as apparently legitimate wealth. Concealing, arranging and acquisition are OFFENCES, not stages."),

  q1("LWEK-44-02", "LWE-44", "H", "easy",
    "What is the minimum amount below which money laundering rules do not apply?",
    ["£1,000", "£10,000", "£15,000", "There is no de minimis threshold"],
    3,
    "There is NO DE MINIMIS. A small sum of criminal property is as much criminal property as a large one, so eleven payments of £8,000 are not made safe by their size."),

  q2("LWEK-44-03", "LWE-44", "H", "medium",
    "An accountant does not actually suspect a client, but the facts plainly should have prompted suspicion, and she reports nothing. Is she liable?",
    [
      "No, she had no actual suspicion",
      "Yes — in the regulated sector reasonable grounds to know or suspect suffice, which is an objective test",
      "No, her duty of confidentiality prevents disclosure",
      "Only if the sums were substantial",
    ],
    1,
    "YES. In the REGULATED SECTOR the failure-to-disclose offence is satisfied by REASONABLE GROUNDS to know or suspect — an OBJECTIVE test — so not having considered the question is no defence."),

  q2("LWEK-44-04", "LWE-44", "H", "medium",
    "A partner mentions to a client's finance director that a report has been made. What has he done?",
    [
      "Complied with his duty of transparency",
      "Committed the offence of tipping off",
      "Breached only a professional ethical rule",
      "Nothing, the client being entitled to know",
    ],
    1,
    "TIPPING OFF — a separate offence, committed by disclosing that a report has been made or an investigation is contemplated where that is likely to prejudice it."),

  q2("LWEK-44-05", "LWE-44", "H", "medium",
    "A client refuses to provide the information needed to complete enhanced due diligence. What must the firm do?",
    [
      "Proceed, relying on the length of the relationship",
      "Not carry out the transaction, consider terminating the relationship, and consider making a report",
      "Proceed but keep additional records",
      "Obtain the client's written assurance and proceed",
    ],
    1,
    "NOT PROCEED. Where required due diligence CANNOT BE COMPLETED the firm must not transact or establish the relationship, must consider TERMINATING any existing one, and must CONSIDER REPORTING."),

  q2("LWEK-44-06", "LWE-44", "H", "medium",
    "When is ENHANCED due diligence required?",
    [
      "For every new client",
      "For politically exposed persons, high-risk third countries, non-face-to-face relationships and unusual transactions with no apparent economic purpose",
      "Only where the client is a company",
      "Only where the transaction exceeds £100,000",
    ],
    1,
    "For PEPs and their families and close associates, HIGH-RISK third countries, NON-FACE-TO-FACE relationships, and unusual or complex transactions with no apparent economic purpose. It requires additional information, additional verification and SENIOR MANAGEMENT APPROVAL."),

  q2("LWEK-44-07", "LWE-44", "H", "hard",
    "Does a professional duty of confidentiality justify not reporting a suspicion?",
    [
      "Yes, confidentiality overrides the reporting duty",
      "No — a required or protected disclosure is not a breach of confidentiality, and confidence is no defence",
      "Yes, unless the client consents to disclosure",
      "Only where the client is also the firm's employer",
    ],
    1,
    "NO. A required or PROTECTED DISCLOSURE is not a breach of confidentiality, and the duty of confidence is no defence to the failure-to-disclose offence. Reporting overrides confidentiality, and telling the client is separately tipping off."),
]

/* ── Chapter 45 · Bribery and criminal activity ─────────────────── */

const CH45: AccaQuestion[] = [
  q1("LWEK-45-01", "LWE-45", "H", "easy",
    "What is the defence to the corporate offence of failing to prevent bribery?",
    ["That the board did not know", "That the organisation had adequate procedures in place", "That the bribe was small", "That the bribe was paid abroad"],
    1,
    "ADEQUATE PROCEDURES designed to prevent bribery by associated persons. Board IGNORANCE is expressly not a defence — the offence needs no fault by the board at all."),

  q1("LWEK-45-02", "LWE-45", "H", "easy",
    "What is a \"relevant body\" for the offence of failing to prevent the facilitation of tax evasion?",
    ["Any person, including an individual", "A body corporate or a partnership", "Only a listed company", "Only a company with a UK tax liability"],
    1,
    "A BODY CORPORATE OR A PARTNERSHIP, and NOT an individual. The offence attaches to the ORGANISATION; the individual facilitator is prosecuted under the ordinary law."),

  q2("LWEK-45-03", "LWE-45", "H", "medium",
    "An overseas agent bribes an official to win a contract for the company. The board knew nothing. Is the company liable?",
    [
      "No, the board neither knew nor authorised it",
      "Yes, under the corporate failure-to-prevent offence — unless it had adequate procedures",
      "No, the agent not being an employee",
      "Only if the company benefited financially",
    ],
    1,
    "YES. An ASSOCIATED PERSON includes an AGENT, and the offence requires NO fault by the board, so ignorance is no defence. The only defence is having had ADEQUATE PROCEDURES."),

  q2("LWEK-45-04", "LWE-45", "H", "medium",
    "Is a small facilitation payment to speed up a routine licence exempt from the Bribery Act?",
    [
      "Yes, facilitation payments are expressly permitted",
      "No — there is no de minimis, and paying to secure a routine service can be bribery",
      "Yes, provided it is recorded in the accounts",
      "Yes, if local practice permits it",
    ],
    1,
    "NO. There is NO DE MINIMIS and facilitation payments are not exempt. Recording it or local practice makes no difference."),

  q2("LWEK-45-05", "LWE-45", "H", "medium",
    "A company's anti-bribery policy sits in a staff handbook, never risk-assessed, never trained on, never monitored. Does it amount to adequate procedures?",
    [
      "Yes, a written policy is sufficient",
      "No — procedures must be proportionate, risk-assessed, communicated through training, and monitored",
      "Yes, provided the board adopted it",
      "Only for a small company",
    ],
    1,
    "NO. Adequate procedures require PROPORTIONATE measures, TOP-LEVEL COMMITMENT, RISK ASSESSMENT, DUE DILIGENCE, COMMUNICATION AND TRAINING, and MONITORING AND REVIEW. A policy in a drawer is one of six."),

  q2("LWEK-45-06", "LWE-45", "H", "hard",
    "Which is NOT one of the four bribery offences?",
    [
      "Bribing another person",
      "Being bribed",
      "Bribing a foreign public official",
      "Failing to report a bribe paid by a competitor",
    ],
    3,
    "FAILING TO REPORT A COMPETITOR'S BRIBE is not an offence under the Act. The four are active bribery, passive bribery, bribing a foreign public official, and the corporate failure to prevent bribery by an associated person."),
]

/* ── Chapter 46 · Fraudulent and wrongful trading ───────────────── */

const CH46: AccaQuestion[] = [
  q1("LWEK-46-01", "LWE-46", "H", "easy",
    "Which requires dishonesty?",
    ["Wrongful trading", "Fraudulent trading", "Both", "Neither"],
    1,
    "FRAUDULENT trading requires an INTENT TO DEFRAUD. Wrongful trading needs no dishonesty at all, which is why it is the claim that actually succeeds."),

  q1("LWEK-46-02", "LWE-46", "H", "easy",
    "Who can be liable for wrongful trading?",
    ["Any person party to the business", "Directors, including de facto and shadow directors", "Shareholders", "The auditor"],
    1,
    "DIRECTORS only, but including DE FACTO and SHADOW directors. FRAUDULENT trading, by contrast, catches ANY person knowingly party to it — including a bank or creditor."),

  q2("LWEK-46-03", "LWE-46", "H", "medium",
    "Directors honestly but unreasonably believe a failing company will recover, and keep trading. Which claim is likely to succeed?",
    [
      "Fraudulent trading, the belief being unreasonable",
      "Wrongful trading — it applies an objective test and needs no dishonesty",
      "Neither, they acted in good faith",
      "Both equally",
    ],
    1,
    "WRONGFUL TRADING. It asks OBJECTIVELY whether they knew or OUGHT TO HAVE CONCLUDED there was no reasonable prospect of avoiding insolvent liquidation, so honest optimism is no defence. Fraudulent trading needs dishonesty, which genuine belief negates."),

  q2("LWEK-46-04", "LWE-46", "H", "medium",
    "Once directors ought to have concluded there is no reasonable prospect of avoiding insolvent liquidation, what does the wrongful trading defence require?",
    [
      "That they acted honestly and in good faith",
      "That they took every step with a view to minimising the potential loss to creditors",
      "That they obtained one item of professional advice",
      "That the company later returned to profit",
    ],
    1,
    "That they took EVERY STEP to minimise the POTENTIAL LOSS TO CREDITORS, judged objectively. Honesty is the defence to FRAUDULENT trading. One conversation with an adviser followed by continued trading is not taking every step."),

  q2("LWEK-46-05", "LWE-46", "H", "medium",
    "A director who is a chartered accountant fails to draw the obvious conclusion from the management accounts. How does his qualification affect his wrongful trading exposure?",
    [
      "It reduces it, since he was not engaged as the company's accountant",
      "It increases it — his own knowledge and skill raise the objective standard",
      "It has no effect",
      "It transfers liability to the finance function",
    ],
    1,
    "It INCREASES it. As under s.174, the director's OWN knowledge, skill and experience RAISE the standard against which conduct is judged, so a qualified accountant should have seen it sooner and more clearly than a lay director."),

  q2("LWEK-46-06", "LWE-46", "H", "medium",
    "What is the nature of the contribution a court may order for wrongful trading?",
    [
      "A penalty payable to the state",
      "A compensatory contribution to the company's assets, measured broadly by the increase in the deficiency",
      "A fixed multiple of the director's remuneration",
      "Payment direct to the creditor who complained",
    ],
    1,
    "A COMPENSATORY contribution to the company's ASSETS, measured broadly by the increase in the deficiency caused by the continued trading. It goes into the GENERAL ESTATE and is distributed under the waterfall, not to one creditor."),

  q2("LWEK-46-07", "LWE-46", "H", "hard",
    "A director urged the board to take insolvency advice, was refused, and resigned two months later. How does that affect his position?",
    [
      "It makes no difference — all directors are equally liable",
      "It strongly assists him: he took the steps open to him, and his exposure is limited to the period while he was a director",
      "It makes him liable as a shadow director thereafter",
      "It converts his exposure into fraudulent trading",
    ],
    1,
    "It STRONGLY ASSISTS him. Documented dissent is exactly the evidence the \"every step\" defence needs, and his exposure is limited to the period while he was a director. Recording dissent and resigning is the practical advice where a board will not act."),
]

export const LWE_KIT_AREAS_G_H: AccaQuestion[] = [
  ...CH41,
  ...CH42,
  ...CH43,
  ...CH44,
  ...CH45,
  ...CH46,
]
