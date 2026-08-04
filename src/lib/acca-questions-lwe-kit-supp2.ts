import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · supplementary question kit, part 2 — chapters 23 to 46 (Areas C to H).
 *
 * The second pass over the company-law and employment-law chapters. As in part 1 it
 * leans towards ONE-mark items, since a real sitting carries twenty of them and the
 * first pass came out heavier on two-mark applied questions.
 *
 * Authored, applied, exam-standard. Original Scholify content. No ACCA or Kaplan
 * question is reproduced.
 */

const AREA_C: AccaQuestion[] = [
  /* Chapter 23 */
  q1("LWEK-S2-23-01", "LWE-23", "C", "easy",
    "Which claim does employee status unlock that a worker does not have?",
    ["The national minimum wage", "Paid holiday", "A statutory redundancy payment", "Working time limits"],
    2,
    "A STATUTORY REDUNDANCY PAYMENT — as with unfair dismissal and minimum notice. Workers do get the minimum wage, paid holiday and working time protection."),

  q2("LWEK-S2-23-02", "LWE-23", "C", "medium",
    "Which employee claim is given PREFERENTIAL status on the employer's insolvency?",
    ["All unpaid salary without limit", "Capped arrears of wages and accrued holiday pay", "Future loss of earnings", "Damages for unfair dismissal"],
    1,
    "CAPPED ARREARS OF WAGES and accrued HOLIDAY PAY, plus certain pension contributions. The rest ranks as an ordinary unsecured claim (chapter 41)."),

  /* Chapter 24 */
  q1("LWEK-S2-24-01", "LWE-24", "C", "easy",
    "Which is required in the written statement of particulars?",
    ["The employer's turnover", "Any probationary period and its conditions", "The names of other employees", "The employer's insurance details"],
    1,
    "Any PROBATIONARY PERIOD and its conditions, alongside pay, hours, holiday, sick pay, pension, notice, job title, place of work and where the disciplinary and grievance procedures may be found."),

  q2("LWEK-S2-24-02", "LWE-24", "C", "medium",
    "What is the effect of failing to provide a written statement of particulars?",
    [
      "There is no contract of employment",
      "The employee has a separate claim, and a tribunal may award additional compensation where another claim succeeds",
      "The employer must pay a fixed statutory penalty",
      "The contract becomes terminable at will",
    ],
    1,
    "A SEPARATE CLAIM, with additional compensation possible where another claim succeeds. The CONTRACT exists regardless — the statement is only a statutory record of it, and where the two differ the contract prevails."),

  /* Chapter 25 */
  q1("LWEK-S2-25-01", "LWE-25", "C", "easy",
    "What statutory minimum notice must an employer give to an employee with five complete years' service?",
    ["1 week", "5 weeks", "12 weeks", "None"],
    1,
    "FIVE WEEKS — one week for each complete year between two and twelve years' service. A longer CONTRACTUAL period would govern instead."),

  q2("LWEK-S2-25-02", "LWE-25", "C", "medium",
    "What is the effect of a properly made payment in lieu of notice?",
    [
      "It converts the dismissal into a fair one",
      "It extinguishes the wrongful dismissal claim, the notice loss having been met",
      "It bars an unfair dismissal claim",
      "It has no effect on any claim",
    ],
    1,
    "It EXTINGUISHES the WRONGFUL dismissal claim, because the recoverable loss was the notice period. It does nothing to an UNFAIR dismissal claim, which asks about reason and procedure."),

  /* Chapter 26 */
  q1("LWEK-S2-26-01", "LWE-26", "C", "easy",
    "What must an employer show to dismiss fairly for CONDUCT?",
    [
      "That the misconduct actually occurred",
      "A genuine belief on reasonable grounds, after a reasonable investigation",
      "That the employee admitted it",
      "That the police were informed",
    ],
    1,
    "A GENUINE BELIEF ON REASONABLE GROUNDS after a REASONABLE INVESTIGATION. Notably the employer need NOT prove the misconduct actually happened."),

  q2("LWEK-S2-26-02", "LWE-26", "C", "medium",
    "Which remedy for unfair dismissal preserves continuity of employment and arrears of pay as if the employee had never been dismissed?",
    ["Re-engagement", "Reinstatement", "The basic award", "The compensatory award"],
    1,
    "REINSTATEMENT — return to the SAME job as if never dismissed. RE-ENGAGEMENT is a comparable job. Both are rare; compensation is the usual outcome."),

  /* Chapter 27 */
  q1("LWEK-S2-27-01", "LWE-27", "C", "easy",
    "How long is the trial period where a redundant employee accepts alternative work?",
    ["One week", "Two weeks", "Four weeks", "Three months"],
    2,
    "FOUR WEEKS. Leaving within the trial period does not lose the redundancy entitlement."),

  q2("LWEK-S2-27-02", "LWE-27", "C", "medium",
    "What is the consequence of failing to consult collectively where the thresholds apply?",
    [
      "Nothing, provided individual consultation took place",
      "A protective award of up to 90 days' pay per affected employee, plus notification duties",
      "The redundancies are void",
      "A fixed fine per employee",
    ],
    1,
    "A PROTECTIVE AWARD of up to 90 DAYS' PAY per affected employee, alongside the duty to notify the Secretary of State. The redundancies are not void, but they become very expensive."),
]

const AREA_D: AccaQuestion[] = [
  /* Chapter 28 */
  q1("LWEK-S2-28-01", "LWE-28", "D", "easy",
    "Which kind of authority arises from what is incidental or necessary to carrying out express authority?",
    ["Usual authority", "Implied actual authority", "Apparent authority", "Authority by ratification"],
    1,
    "IMPLIED ACTUAL authority. USUAL authority is what an agent in that position customarily has; APPARENT authority rests on the principal's representation."),

  q2("LWEK-S2-28-02", "LWE-28", "D", "medium",
    "An agent contracts within authority for an UNDISCLOSED principal. Whom may the third party sue once it discovers the principal?",
    [
      "The agent only",
      "Generally either the agent or the principal, subject to exceptions",
      "The principal only",
      "Neither, the contract being void",
    ],
    1,
    "GENERALLY EITHER, subject to exceptions. Where the principal was DISCLOSED the agent normally drops out of the transaction; where undisclosed, the third party has a choice."),

  /* Chapter 29 */
  q1("LWEK-S2-29-01", "LWE-29", "D", "easy",
    "Which duty do partners owe one another?",
    ["A duty of care only", "Utmost good faith", "No duties, the relationship being contractual", "A fiduciary duty to third parties"],
    1,
    "UTMOST GOOD FAITH, the relationship being fiduciary — including rendering true accounts, accounting for private profits (s.29) and not competing (s.30)."),

  q2("LWEK-S2-29-02", "LWE-29", "D", "medium",
    "With no written partnership agreement, how are profits shared?",
    ["In proportion to capital contributed", "Equally", "In proportion to hours worked", "As the majority of partners decide"],
    1,
    "EQUALLY, regardless of contribution — one of the 1890 Act defaults that a written agreement usually exists to displace, alongside no salary entitlement and dissolution by any partner's notice."),

  /* Chapter 30 */
  q1("LWEK-S2-30-01", "LWE-30", "D", "easy",
    "Who carries an LLP's administrative and filing responsibilities?",
    ["Every member equally", "The designated members", "A company secretary", "The auditor"],
    1,
    "The DESIGNATED MEMBERS, whose role is broadly comparable to a company secretary's."),

  q2("LWEK-S2-30-02", "LWE-30", "D", "medium",
    "Does the death or bankruptcy of a LIMITED partner dissolve a limited partnership?",
    ["Yes, as with a general partnership", "No — that is one of its advantages", "Only if there is one general partner", "Only if the agreement so provides"],
    1,
    "NO, which is one of the limited partnership's attractions over a general partnership, where a partner's death or bankruptcy dissolves the firm subject to contrary agreement. A limited partner also cannot dissolve it by notice."),

  /* Chapter 31 */
  q1("LWEK-S2-31-01", "LWE-31", "D", "easy",
    "Which type of company has no share capital?",
    ["A company limited by shares", "A company limited by guarantee", "A public company", "An unlimited company with shares"],
    1,
    "A company LIMITED BY GUARANTEE, whose members undertake to contribute a nominal sum on winding up. It is used by non-profit bodies."),

  q2("LWEK-S2-31-02", "LWE-31", "D", "medium",
    "How many directors must a public company have, and how many a private company?",
    ["One and one", "Two and one", "Two and two", "Three and one"],
    1,
    "TWO for a public company and ONE for a private company. In both cases at least one director must be a NATURAL PERSON, and a director must be at least 16."),

  /* Chapter 32 */
  q1("LWEK-S2-32-01", "LWE-32", "D", "easy",
    "Which remedy is available against a promoter who took an undisclosed profit, even if the contract is NOT rescinded?",
    ["Specific performance", "Recovery of the secret profit", "Rectification", "An account of the company's own profits"],
    1,
    "RECOVERY OF THE SECRET PROFIT, which the promoter must account for whether or not the contract is set aside."),

  q2("LWEK-S2-32-02", "LWE-32", "D", "medium",
    "Under s.51 CA 2006, can the person who purported to act for an unformed company also SUE on the contract?",
    [
      "No, only the third party may sue",
      "Yes — the contract takes effect as one made with them, so the rights run both ways",
      "No, the contract is unenforceable by either side",
      "Only with the company's consent after incorporation",
    ],
    1,
    "YES. The contract takes effect as one made WITH THAT PERSON, so they are personally liable ON it and may also ENFORCE it. The reciprocity is often overlooked."),

  /* Chapter 33 */
  q1("LWEK-S2-33-01", "LWE-33", "D", "easy",
    "What does the memorandum of association contain under CA 2006?",
    [
      "The company's objects and powers",
      "A short statement that the subscribers wish to form a company and will take at least one share each",
      "The company's articles",
      "The statement of capital",
    ],
    1,
    "A SHORT STATEMENT by the subscribers. Under CA 2006 the memorandum is reduced to a historical document, and the ARTICLES now carry the constitutional content."),

  q2("LWEK-S2-33-02", "LWE-33", "D", "medium",
    "A company registers no articles. What governs its constitution?",
    ["Nothing — registration is refused", "The model articles apply by default", "The Companies Act alone", "The memorandum"],
    1,
    "The MODEL ARTICLES apply by default, and they also fill any gaps in incomplete articles."),
]

const AREAS_E_F: AccaQuestion[] = [
  /* Chapter 34 */
  q1("LWEK-S2-34-01", "LWE-34", "E", "easy",
    "What is the consequence for an allottee who takes shares at a DISCOUNT to nominal value?",
    ["Nothing, the allotment being void", "They must pay the shortfall plus interest", "The shares are forfeited", "The directors alone are liable"],
    1,
    "They must PAY THE SHORTFALL PLUS INTEREST. The prohibition protects creditors, who rely on the stated capital."),

  q2("LWEK-S2-34-02", "LWE-34", "E", "medium",
    "When do preference shares typically ACQUIRE a vote?",
    [
      "Never",
      "Where their class rights are being varied, or where the dividend is in arrears",
      "At every annual general meeting",
      "Only on a winding up",
    ],
    1,
    "Where their CLASS RIGHTS ARE BEING VARIED or the DIVIDEND IS IN ARREARS. They are otherwise usually non-voting, which is what makes them attractive to a company wanting capital without diluting control."),

  /* Chapter 35 */
  q1("LWEK-S2-35-01", "LWE-35", "E", "easy",
    "Who may register a company charge with the registrar?",
    ["Only the company", "Only the chargee", "Either the company or any interested person", "Only the company's solicitor"],
    2,
    "EITHER THE COMPANY OR ANY INTERESTED PERSON — which in practice means the LENDER does it, rather than trusting the borrower with a deadline that destroys its security if missed."),

  q2("LWEK-S2-35-02", "LWE-35", "E", "medium",
    "What is the status of the registrar's certificate of registration of a charge?",
    ["Prima facie evidence only", "Conclusive evidence that the charge was registered", "Evidence of the charge's validity in substance", "Of no evidential value"],
    1,
    "CONCLUSIVE EVIDENCE that the charge was REGISTERED. It does not validate a charge that is defective for some other reason."),

  /* Chapter 36 */
  q1("LWEK-S2-36-01", "LWE-36", "E", "easy",
    "Which company may purchase its own shares out of CAPITAL?",
    ["Any company", "A private company only, subject to strict conditions", "A public company only", "None"],
    1,
    "A PRIVATE company only, and subject to strict conditions including a directors' statement, an auditors' report, a special resolution and public notice giving creditors an opportunity to object."),

  q2("LWEK-S2-36-02", "LWE-36", "E", "medium",
    "By reference to which accounts is the lawfulness of a distribution judged?",
    ["Management accounts of the directors' choosing", "The relevant accounts, normally the last annual accounts", "The accounts for the year in which the dividend is paid", "Any accounts the auditor certifies"],
    1,
    "The RELEVANT ACCOUNTS, normally the LAST ANNUAL ACCOUNTS, with interim or initial accounts used where those will not do."),

  /* Chapter 37 */
  q1("LWEK-S2-37-01", "LWE-37", "F", "easy",
    "What is the MINIMUM period of disqualification on a finding of unfitness under s.6 CDDA 1986?",
    ["None", "One year", "Two years", "Five years"],
    2,
    "TWO YEARS. Section 6 is the only ground carrying a minimum, and it is the commonest, being made following an insolvency."),

  q2("LWEK-S2-37-02", "LWE-37", "F", "medium",
    "How must a PUBLIC company appoint its directors at a general meeting?",
    [
      "By a single resolution covering all of them",
      "By separate resolution for each, unless the meeting agrees otherwise without objection",
      "By board resolution only",
      "By special resolution",
    ],
    1,
    "By SEPARATE RESOLUTION for each, unless the meeting first agrees otherwise without objection — so members cannot be forced to accept an unwanted candidate as part of a slate."),

  /* Chapter 38 */
  q1("LWEK-S2-38-01", "LWE-38", "F", "easy",
    "Which duty requires a director not to fetter their discretion?",
    ["s.171", "s.172", "s.173", "s.176"],
    2,
    "SECTION 173 — the duty to exercise INDEPENDENT JUDGEMENT. Acting under an agreement properly entered into by the company is nonetheless permitted."),

  q2("LWEK-S2-38-02", "LWE-38", "F", "medium",
    "Under s.172, to whose benefit must a director promote the company's success?",
    ["The directors as a body", "The members as a whole", "The creditors", "The employees"],
    1,
    "The MEMBERS AS A WHOLE — while HAVING REGARD to the listed factors, including long-term consequences, employees' interests, relationships with suppliers and customers, the community and environment, and the company's reputation."),

  /* Chapter 39 */
  q1("LWEK-S2-39-01", "LWE-39", "F", "easy",
    "What percentage of members can prevent a private company's auditor being deemed reappointed?",
    ["1%", "5%", "10%", "25%"],
    1,
    "FIVE PER CENT of the voting rights. Otherwise a private company's auditor is DEEMED REAPPOINTED each year without a resolution."),

  q2("LWEK-S2-39-02", "LWE-39", "F", "medium",
    "On what must an auditor form an opinion beyond whether the accounts give a true and fair view?",
    [
      "Whether the company is a going concern for the next five years",
      "Whether proper accounting records were kept and the accounts agree with them",
      "Whether the directors are fit to hold office",
      "Whether the company's internal controls are optimal",
    ],
    1,
    "Whether PROPER ACCOUNTING RECORDS were kept, whether the accounts AGREE with them, and whether the information and explanations needed were received — stating in the report if any is unsatisfactory."),

  /* Chapter 40 */
  q1("LWEK-S2-40-01", "LWE-40", "F", "easy",
    "What is the quorum for a general meeting unless the articles provide otherwise?",
    ["One member", "Two members present in person or by proxy", "Three members", "A majority of the members"],
    1,
    "TWO members present in person or by PROXY. A single-member company's quorum is one."),

  q2("LWEK-S2-40-02", "LWE-40", "F", "medium",
    "A private company wishes to hold a general meeting on short notice. What consent is needed?",
    [
      "A majority in number holding at least 90% of the voting shares",
      "A majority in number holding at least 95% of the voting shares",
      "The consent of all members entitled to attend and vote",
      "Board approval only",
    ],
    0,
    "A majority in NUMBER holding at least 90% of the voting shares in a PRIVATE company — 95% in a public company. A plc's AGM requires the agreement of ALL members entitled to attend and vote."),
]

const AREAS_G_H: AccaQuestion[] = [
  /* Chapter 41 */
  q1("LWEK-S2-41-01", "LWE-41", "G", "easy",
    "Who becomes liquidator initially on a compulsory winding-up order?",
    ["The petitioning creditor's nominee", "The Official Receiver", "The company's auditor", "The court"],
    1,
    "The OFFICIAL RECEIVER, with an insolvency practitioner usually appointed in their place afterwards."),

  q2("LWEK-S2-41-02", "LWE-41", "G", "medium",
    "What is the effect of a winding-up order on the company's employees and on legal proceedings?",
    [
      "Employees continue and proceedings are unaffected",
      "Employees are automatically dismissed and proceedings against the company are stayed",
      "Employees continue but proceedings are stayed",
      "Employees are dismissed but proceedings may continue freely",
    ],
    1,
    "Employees are AUTOMATICALLY DISMISSED and proceedings are STAYED. The directors' powers also cease, and dispositions of property after the petition are void unless the court orders otherwise. Contrast ADMINISTRATION, where employees are not dismissed."),

  /* Chapter 42 */
  q1("LWEK-S2-42-01", "LWE-42", "G", "easy",
    "What is an administrator's status?",
    ["An employee of the company", "An officer of the court", "An agent of the appointing creditor", "A director"],
    1,
    "An OFFICER OF THE COURT, who must act in the interests of the CREDITORS AS A WHOLE — which is why the appointing creditor cannot direct the administration to its own exclusive benefit."),

  q2("LWEK-S2-42-02", "LWE-42", "G", "medium",
    "Which is a way an administration may end?",
    [
      "Automatic conversion into a compulsory liquidation after six months",
      "Moving into a creditors' voluntary liquidation where a distribution to unsecured creditors is to be made",
      "The directors resolving to end it",
      "The appointing charge holder withdrawing its consent",
    ],
    1,
    "Moving into a CVL where a distribution to unsecured creditors is to be made — alongside expiry after a year unless extended, an application to the court, dissolution where there is nothing to distribute, and a creditor's application alleging improper motive."),

  /* Chapter 43 */
  q1("LWEK-S2-43-01", "LWE-43", "H", "easy",
    "What is the maximum sentence for insider dealing on conviction on indictment?",
    ["2 years", "5 years", "7 years", "10 years"],
    2,
    "SEVEN YEARS, plus a fine. Bribery carries up to ten years for an individual."),

  q2("LWEK-S2-43-02", "LWE-43", "H", "medium",
    "Is a contract void or unenforceable merely because it was entered into on the strength of inside information?",
    [
      "Yes, it is void",
      "No — the sanctions are criminal and regulatory, not contractual",
      "Yes, it is voidable at the counterparty's option",
      "Only where the counterparty was also an insider",
    ],
    1,
    "NO. The contract stands; the sanctions are CRIMINAL and REGULATORY. That is a point candidates regularly get wrong by assuming illegality infects the transaction."),

  /* Chapter 44 */
  q1("LWEK-S2-44-01", "LWE-44", "H", "easy",
    "For how long must money laundering identification and transaction records normally be kept?",
    ["One year", "Three years", "Five years", "Ten years"],
    2,
    "FIVE YEARS, under the reliance and record-keeping requirement."),

  q2("LWEK-S2-44-02", "LWE-44", "H", "medium",
    "A firm relies on another regulated person's customer due diligence. Who remains responsible for compliance?",
    ["The other regulated person", "The firm itself remains responsible", "Both share responsibility equally", "The client"],
    1,
    "The FIRM ITSELF. Reliance is permitted in limited circumstances but does not transfer responsibility, so the firm cannot escape by pointing at whoever it relied on."),

  /* Chapter 45 */
  q1("LWEK-S2-45-01", "LWE-45", "H", "easy",
    "What is the maximum penalty for a commercial organisation convicted of failing to prevent bribery?",
    ["A fine capped at £1 million", "An unlimited fine", "Disqualification of its directors only", "A formal warning"],
    1,
    "An UNLIMITED FINE — as for failing to prevent the facilitation of tax evasion. Individuals face up to ten years' imprisonment for the substantive bribery offences."),

  q2("LWEK-S2-45-02", "LWE-45", "H", "medium",
    "When does corporate hospitality become a bribe?",
    [
      "Whenever it exceeds a fixed monetary limit",
      "Where it is intended to induce improper performance, judged on proportionality and transparency",
      "Whenever it is offered to a public official",
      "Never — hospitality is expressly exempt",
    ],
    1,
    "Where it is INTENDED TO INDUCE IMPROPER PERFORMANCE. Hospitality is not prohibited, and the tests are PROPORTIONALITY, TRANSPARENCY and reasonableness in the circumstances — not a fixed monetary threshold."),

  /* Chapter 46 */
  q1("LWEK-S2-46-01", "LWE-46", "H", "easy",
    "Must a company be in insolvent liquidation for a WRONGFUL trading claim?",
    ["No", "Yes", "Only if the claim is brought by a creditor", "Only for a public company"],
    1,
    "YES — insolvent liquidation is a precondition of the s.214 claim. FRAUDULENT trading, by contrast, can be prosecuted as a criminal offence whether or not the company is being wound up."),

  q2("LWEK-S2-46-02", "LWE-46", "H", "medium",
    "Who may bring a wrongful trading claim, and where does the recovery go?",
    [
      "Any creditor, and the recovery goes to that creditor",
      "The liquidator or an administrator, and the recovery goes into the general estate",
      "The registrar, and the recovery goes to the Crown",
      "The members, and the recovery is distributed as a dividend",
    ],
    1,
    "The LIQUIDATOR, or an ADMINISTRATOR, and the recovery goes into the GENERAL ESTATE for distribution under the waterfall — not to whichever creditor complained loudest."),
]

export const LWE_KIT_SUPP_PART2: AccaQuestion[] = [
  ...AREA_C,
  ...AREA_D,
  ...AREAS_E_F,
  ...AREAS_G_H,
]
