import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Areas E and F question kit — chapters 34 to 40.
 *
 * Share capital and classes of shares, loan capital and charges, capital maintenance
 * and dividend law, then directors, their duties, the secretary and auditor, and
 * meetings and resolutions.
 *
 * The statutory tests are examined with real figures, because that is how the paper
 * tests them: the s.830 profits test, the additional s.831 net-assets test for a public
 * company, the 21-day charge registration window, and the meeting percentages.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 34 · Share capital and classes of shares ───────────── */

const CH34: AccaQuestion[] = [
  q1("LWEK-34-01", "LWE-34", "E", "easy",
    "What rights attach to treasury shares while the company holds them?",
    ["Full voting and dividend rights", "None — no votes and no dividends", "Voting rights only", "Dividend rights only"],
    1,
    "NONE. While held in treasury the shares carry no votes and no dividends. They may later be sold, transferred to an employees' share scheme, or cancelled."),

  q1("LWEK-34-02", "LWE-34", "E", "easy",
    "A preference dividend is not paid in one year. What happens to it?",
    ["It is lost", "It carries forward as arrears, being presumed cumulative", "It converts into share capital", "It becomes payable to the ordinary shareholders"],
    1,
    "It CARRIES FORWARD. A preference dividend is presumed CUMULATIVE, so arrears must be met before any ordinary dividend."),

  q2("LWEK-34-03", "LWE-34", "E", "medium",
    "A company makes a 1-for-5 bonus issue capitalising £50,000 of reserves. What is the effect?",
    [
      "It raises £50,000 of new capital",
      "No cash comes in — reserves fall and share capital rises by £50,000, reducing distributable reserves",
      "Members must pay for their new shares pro rata",
      "It has no effect on the accounts",
    ],
    1,
    "NO CASH comes in. A bonus issue CAPITALISES reserves, leaving net assets unchanged while REDUCING the distributable reserves available for future dividends. A RIGHTS issue is the one that raises money."),

  q2("LWEK-34-04", "LWE-34", "E", "medium",
    "How may class rights be varied where the articles are silent?",
    [
      "By ordinary resolution of all the members",
      "By written consent of holders of at least three-quarters in nominal value of the class, or a special resolution at a separate class meeting",
      "By board resolution",
      "They cannot be varied at all",
    ],
    1,
    "By the written consent of 75% IN NOMINAL VALUE of the class, or a SPECIAL RESOLUTION AT A SEPARATE CLASS MEETING. The ordinary shareholders alone cannot vary another class's rights."),

  q2("LWEK-34-05", "LWE-34", "E", "medium",
    "Holders of 20% of a class did not consent to a variation of their rights. What can they do?",
    [
      "Nothing, the required majority having been obtained",
      "Apply to the court within 21 days to have the variation cancelled",
      "Demand that their shares be redeemed",
      "Requisition a general meeting",
    ],
    1,
    "APPLY TO THE COURT within 21 DAYS, the threshold being not less than 15% of the class. The variation does not take effect until the application is disposed of."),

  q2("LWEK-34-06", "LWE-34", "E", "hard",
    "A plc allots 200,000 new ordinary shares to one institution without offering them to existing members. What is the problem?",
    [
      "None, allotment being a matter for the directors",
      "Pre-emption rights were breached unless disapplied by special resolution",
      "Shares may never be allotted to a single holder",
      "The allotment needed court approval",
    ],
    1,
    "PRE-EMPTION rights. New equity securities must first be offered to existing members PRO RATA, and they can be disapplied only by SPECIAL RESOLUTION — a plc cannot simply exclude them by its articles as a private company may."),
]

/* ── Chapter 35 · Loan capital, debentures and charges ──────────── */

const CH35: AccaQuestion[] = [
  q1("LWEK-35-01", "LWE-35", "E", "easy",
    "Within what period must a company charge be registered with the registrar?",
    ["7 days", "14 days", "21 days", "One month"],
    2,
    "TWENTY-ONE DAYS of creation. Failure makes the charge VOID as security against a liquidator, an administrator and any creditor."),

  q1("LWEK-35-02", "LWE-35", "E", "easy",
    "A company has no distributable profits this year. What are the positions of debenture holders and ordinary shareholders?",
    [
      "Neither is entitled to a payment",
      "Debenture holders remain entitled to interest; ordinary shareholders have no entitlement to a dividend",
      "Both must be paid out of capital",
      "Shareholders rank ahead of debenture holders",
    ],
    1,
    "INTEREST is a contractual debt payable whether or not there are profits. A DIVIDEND may only be paid out of distributable profits and is at the directors' discretion. Shareholders never rank ahead of creditors."),

  q2("LWEK-35-03", "LWE-35", "E", "medium",
    "A lender registers its charge 30 days after creation. What is the position on liquidation?",
    [
      "The charge is valid, registration having eventually taken place",
      "The charge is void against the liquidator and other creditors, so the lender is unsecured — but the debt remains recoverable",
      "Both the charge and the loan are void",
      "The charge ranks behind others but is still security",
    ],
    1,
    "The CHARGE is VOID as security, so the lender is UNSECURED. The LOAN itself remains valid and indeed immediately payable — losing the security is not losing the debt."),

  q2("LWEK-35-04", "LWE-35", "E", "medium",
    "Which event does NOT crystallise a floating charge?",
    [
      "The company going into liquidation",
      "The company ceasing to carry on business",
      "The company selling inventory in the ordinary course of business",
      "The appointment of an administrator",
    ],
    2,
    "SELLING INVENTORY IN THE ORDINARY COURSE is precisely what a floating charge PERMITS until crystallisation — that freedom is the point of it. The other three are crystallisation events."),

  q2("LWEK-35-05", "LWE-35", "E", "medium",
    "A floating charge is created in March; a fixed charge over the same assets in April, the later chargee having no notice of any negative pledge. Which ranks first?",
    [
      "The March floating charge, being first in time",
      "The April fixed charge",
      "They rank equally",
      "Neither, both being void",
    ],
    1,
    "The APRIL FIXED CHARGE. A fixed charge generally ranks AHEAD of a floating charge over the same assets, even one created earlier, unless the later chargee had NOTICE of a negative pledge in the floating charge."),

  q2("LWEK-35-06", "LWE-35", "E", "hard",
    "A company borrows beyond a limit in its articles. Is the loan enforceable by the lender?",
    [
      "No, the directors lacked authority",
      "Generally yes — a third party dealing in good faith is unaffected by a constitutional limit, though the directors are liable to the company",
      "No, unless the members ratify",
      "Only up to the limit in the articles",
    ],
    1,
    "GENERALLY YES. A good-faith third party is not affected by a constitutional limit on the directors' powers, so the loan is enforceable while the DIRECTORS are exposed to the company for breach of duty."),
]

/* ── Chapter 36 · Capital maintenance and dividends ─────────────── */

const CH36: AccaQuestion[] = [
  q1("LWEK-36-01", "LWE-36", "E", "easy",
    "Which reserve is UNDISTRIBUTABLE?",
    ["Retained earnings", "The share premium account", "Accumulated realised profits", "A general reserve created from realised profits"],
    1,
    "The SHARE PREMIUM ACCOUNT — along with the capital redemption reserve, unrealised revaluation surpluses, and any reserve statute or the articles prohibits distributing."),

  q1("LWEK-36-02", "LWE-36", "E", "medium",
    "How may a PRIVATE company reduce its share capital without going to court?",
    [
      "By ordinary resolution alone",
      "By special resolution supported by a solvency statement from all the directors",
      "It cannot — court confirmation is always required",
      "With the consent of all its creditors",
    ],
    1,
    "By SPECIAL RESOLUTION plus a SOLVENCY STATEMENT from ALL the directors, confirming the company can pay its debts now and over the next twelve months. That route is open to private companies only."),

  q2("LWEK-36-03", "LWE-36", "E", "medium",
    "A company has accumulated realised profits of £400,000, accumulated realised losses of £90,000 and an unrealised revaluation surplus of £200,000. What are its distributable profits?",
    ["£510,000", "£310,000", "£400,000", "£110,000"],
    1,
    "£310,000 — accumulated realised profits LESS accumulated realised losses. The test is CUMULATIVE, and the revaluation surplus is UNREALISED and therefore not distributable."),

  q2("LWEK-36-04", "LWE-36", "E", "hard",
    "A plc has called-up capital of £2,000,000, share premium £400,000, a revaluation reserve of £250,000, accumulated realised profits £760,000 and realised losses £180,000. Net assets are £2,900,000. What is the maximum lawful dividend?",
    ["£580,000", "£250,000", "£760,000", "£830,000"],
    1,
    "£250,000. The s.830 test gives £580,000, but a plc must ALSO satisfy s.831: net assets must not fall below called-up capital plus undistributable reserves — £2,000,000 + £400,000 + £250,000 = £2,650,000. So £2,900,000 − £2,650,000 = £250,000, and the LOWER figure governs."),

  q2("LWEK-36-05", "LWE-36", "E", "medium",
    "An unlawful dividend is paid. Which member must repay it?",
    [
      "Every member who received it",
      "A member who knew, or had reasonable grounds to believe, it was unlawful",
      "Only members who voted for it",
      "No member — only the directors are liable",
    ],
    1,
    "A member who KNEW OR HAD REASONABLE GROUNDS TO BELIEVE the distribution was unlawful, under s.847. The DIRECTORS are separately liable for breach of duty and may be ordered to repay."),

  q2("LWEK-36-06", "LWE-36", "E", "medium",
    "Why must a capital redemption reserve be created on a buy-back out of distributable profits?",
    [
      "To record the transaction for tax purposes",
      "To keep the protected fund constant — capital falls, so an equal amount of profit becomes undistributable",
      "To provide for future redemptions",
      "Because the shares are not cancelled",
    ],
    1,
    "To KEEP THE PROTECTED FUND CONSTANT. Without it a buy-back out of profits would quietly shrink the creditors' buffer, so an equal amount of distributable profit is moved into an UNDISTRIBUTABLE reserve in its place."),

  q2("LWEK-36-07", "LWE-36", "E", "medium",
    "May members vote a larger final dividend than the directors recommended?",
    ["Yes, by ordinary resolution", "No — the declaration cannot exceed the directors' recommendation", "Yes, by special resolution", "Yes, if distributable profits allow it"],
    1,
    "NO. A final dividend is DECLARED by ordinary resolution on the directors' RECOMMENDATION, and the members cannot exceed it. An INTERIM dividend may be paid by the directors alone without a members' resolution."),
]

/* ── Chapter 37 · Directors: appointment and disqualification ───── */

const CH37: AccaQuestion[] = [
  q1("LWEK-37-01", "LWE-37", "F", "easy",
    "What notice is required to remove a director under s.168?",
    ["14 days' notice of the meeting only", "28 days' special notice to the company", "Three months' notice", "None"],
    1,
    "28 DAYS' SPECIAL NOTICE to the company, separate from the notice of the meeting. The director may then be heard and have written representations circulated."),

  q1("LWEK-37-02", "LWE-37", "F", "easy",
    "What is the maximum period of disqualification under the CDDA 1986?",
    ["5 years", "10 years", "15 years", "Life"],
    2,
    "FIFTEEN YEARS. Note that the s.6 unfitness ground, the commonest, also carries a MINIMUM of two years."),

  q2("LWEK-37-03", "LWE-37", "F", "medium",
    "The articles state a director may be removed only by special resolution and with his consent. The members pass an ordinary resolution removing him. Is the removal effective, assuming proper notice?",
    [
      "No, the articles govern",
      "Yes — s.168 permits removal by ordinary resolution notwithstanding the articles or any agreement",
      "No, unless he consents",
      "Only if he is also an employee",
    ],
    1,
    "YES. Section 168 operates NOTWITHSTANDING anything in the articles or any agreement, so a provision purporting to make a director irremovable is ineffective. Only the 28-day special notice requirement can trip the members up."),

  q2("LWEK-37-04", "LWE-37", "F", "medium",
    "A major shareholder never joins the board, but the directors are accustomed to acting on his instructions. What is his position?",
    [
      "No liability, not being a director",
      "A shadow director, exposed to the general duties, wrongful trading and disqualification",
      "Liable only if also an employee",
      "Automatically a de jure director",
    ],
    1,
    "A SHADOW DIRECTOR. Liability follows FUNCTION not title, so declining the formal appointment is no escape from the general duties, wrongful trading or disqualification."),

  q2("LWEK-37-05", "LWE-37", "F", "medium",
    "A director's service contract guarantees a five-year term, and no members' resolution was passed. What is the position?",
    [
      "The contract is void in its entirety",
      "The guaranteed term is void and the contract is terminable on reasonable notice",
      "The contract is valid, approval being a formality",
      "The term is reduced to two years",
    ],
    1,
    "The GUARANTEED TERM IS VOID and the contract becomes terminable on REASONABLE NOTICE. A term over two years needs approval by ordinary resolution — and the practical effect is to cut sharply what the director can claim on removal."),

  q2("LWEK-37-06", "LWE-37", "F", "hard",
    "A disqualified person continues to manage a company, which incurs further debts. What is the position?",
    [
      "Only the company is liable",
      "It is a criminal offence, and the person is personally liable jointly and severally for the debts incurred while so acting",
      "The disqualification lapses on resuming management",
      "Liability arises only if the company becomes insolvent",
    ],
    1,
    "BOTH a criminal offence AND personal liability, jointly and severally with the company, for the debts incurred while acting — a statutory veil-lifting ground. Anyone knowingly acting on that person's instructions may be liable too."),
]

/* ── Chapter 38 · Directors' powers and duties ──────────────────── */

const CH38: AccaQuestion[] = [
  q1("LWEK-38-01", "LWE-38", "F", "easy",
    "Which section imposes the duty to exercise reasonable care, skill and diligence?",
    ["s.171", "s.172", "s.174", "s.177"],
    2,
    "SECTION 174. s.171 is acting within powers, s.172 promoting the company's success, and s.177 declaring an interest in a proposed transaction."),

  q1("LWEK-38-02", "LWE-38", "F", "easy",
    "A single director with no delegated authority signs a large contract. Is the company bound on ACTUAL authority?",
    ["Yes, a director always represents the company", "No — management power is vested in the board collectively", "Yes, if the contract benefits the company", "Yes, if he is an executive director"],
    1,
    "NO. Management power belongs to the BOARD COLLECTIVELY, and an individual director has none alone unless it was delegated. The company might still be bound by APPARENT authority, but that needs a holding out by the board."),

  q2("LWEK-38-03", "LWE-38", "F", "medium",
    "A director acts honestly but never informs himself about the company's finances, and loss follows. Which duty is breached?",
    [
      "None, he acted in good faith",
      "Section 174 — the care, skill and diligence duty is objective, so good faith is no answer",
      "Section 172 only",
      "Section 176",
    ],
    1,
    "SECTION 174. Its objective limb asks what a reasonably diligent person in that role would have done, so HONESTY IS NO DEFENCE. Section 172 is subjective in form and hard to breach where the director genuinely believed they were promoting success — which is why claims are pleaded under s.174."),

  q2("LWEK-38-04", "LWE-38", "F", "medium",
    "A director who is a qualified accountant fails to spot an obvious accounting problem. How does his qualification affect the s.174 standard?",
    [
      "It lowers the standard, since he was not engaged as an accountant",
      "It raises the standard — the subjective limb adds his own actual knowledge and skill",
      "It has no effect, the test being purely objective",
      "It transfers liability to the auditor",
    ],
    1,
    "It RAISES the standard. Section 174 has an objective limb setting the floor and a subjective limb adding the director's OWN actual knowledge, skill and experience — and that second limb can only RAISE the bar, never lower it."),

  q2("LWEK-38-05", "LWE-38", "F", "medium",
    "A director tells the board he \"has an interest\" in a property the company is about to buy from him. Has he complied with s.177?",
    [
      "Yes, he disclosed an interest",
      "No — s.177 requires the nature AND extent of the interest to be declared",
      "Yes, provided the board approves the purchase",
      "No, because s.177 requires members' approval",
    ],
    1,
    "NO. Section 177 requires the NATURE AND EXTENT of the interest to be declared, before the company enters the transaction. A vague mention of \"an interest\" discloses neither. Note this is also a SUBSTANTIAL PROPERTY TRANSACTION needing members' approval."),

  q2("LWEK-38-06", "LWE-38", "F", "medium",
    "A company buys a substantial non-cash asset from a director without members' approval. What follows?",
    [
      "Nothing, the board having authorised it",
      "The transaction is voidable and the director must account for any gain and indemnify the company for loss",
      "The transaction is void and title never passed",
      "The director must simply declare the interest retrospectively",
    ],
    1,
    "It is VOIDABLE, and the director must ACCOUNT for gains and INDEMNIFY losses. A substantial property transaction between company and director needs approval by ORDINARY RESOLUTION of the members."),

  q2("LWEK-38-07", "LWE-38", "F", "hard",
    "The members consider ratifying a director's breach of duty. Whose votes are disregarded?",
    [
      "None — all members may vote",
      "Those of the director in breach and of persons connected with them",
      "Those of the non-executive directors",
      "Those of any member holding over 25%",
    ],
    1,
    "Those of the DIRECTOR IN BREACH and of CONNECTED PERSONS. Otherwise a director with a large holding could approve his own conduct, which would make the duties unenforceable."),
]

/* ── Chapter 39 · The secretary and the auditor ─────────────────── */

const CH39: AccaQuestion[] = [
  q1("LWEK-39-01", "LWE-39", "F", "easy",
    "Which company must have a company secretary?",
    ["Every company", "A public company", "A private company", "Only a company with more than 50 employees"],
    1,
    "A PUBLIC company, and that secretary must be QUALIFIED. A private company need not have one, and the functions then fall to the directors."),

  q1("LWEK-39-02", "LWE-39", "F", "easy",
    "Who cannot be a company's auditor?",
    ["A member of the company", "An officer or employee of the company", "A creditor of the company", "A former auditor"],
    1,
    "An OFFICER OR EMPLOYEE of the company — they cannot check their own work. The prohibition extends to their partners and employees, and to a partnership including such a person."),

  q2("LWEK-39-03", "LWE-39", "F", "medium",
    "A board calls a meeting on ten days' notice to remove its auditor and declines to circulate the auditor's representations. What is the position?",
    [
      "Valid, members being able to remove an auditor by ordinary resolution at any time",
      "Invalid — removal requires 28 days' special notice, and the auditor may make representations and be heard",
      "Valid if a replacement is appointed at the same meeting",
      "Invalid, removal requiring a special resolution",
    ],
    1,
    "INVALID. Removal is by ORDINARY resolution but needs 28 DAYS' SPECIAL NOTICE, and the auditor may make WRITTEN REPRESENTATIONS, have them circulated, and be HEARD. Those safeguards exist because the people being audited are seeking the removal."),

  q2("LWEK-39-04", "LWE-39", "F", "medium",
    "How far does a company secretary's apparent authority extend?",
    [
      "To all commercial contracts",
      "To administrative matters, such as office supplies or hiring cars",
      "To borrowing on the company's behalf",
      "To nothing — a secretary has no apparent authority",
    ],
    1,
    "To ADMINISTRATIVE matters only. A secretary can bind the company for office supplies or car hire, but not for trading or borrowing decisions."),

  q2("LWEK-39-05", "LWE-39", "F", "medium",
    "A finance director knowingly tells the audit team a doubtful balance is \"definitely recoverable\". What has he done?",
    [
      "Nothing unlawful, merely expressed an opinion",
      "Committed a criminal offence of knowingly making a misleading statement to an auditor",
      "Breached only a professional ethical duty",
      "Committed a civil wrong actionable by the auditor alone",
    ],
    1,
    "A CRIMINAL OFFENCE. Knowingly or recklessly making a misleading, false or deceptive statement to an auditor is an offence, quite apart from the duty to provide the information the auditor requires."),

  q2("LWEK-39-06", "LWE-39", "F", "hard",
    "What must accompany an auditor's resignation?",
    [
      "Nothing beyond written notice",
      "A statement of the circumstances connected with it, or a statement that there are none",
      "A final audit report",
      "The consent of the directors",
    ],
    1,
    "A STATEMENT OF THE CIRCUMSTANCES, so the reasons reach the members and, where required, the appropriate audit authority. It is what stops an awkward auditor being got rid of quietly, and the auditor may also requisition a meeting to explain."),
]

/* ── Chapter 40 · Meetings and resolutions ─────────────────────── */

const CH40: AccaQuestion[] = [
  q1("LWEK-40-01", "LWE-40", "F", "easy",
    "What majority does a special resolution require?",
    ["Over 50% of votes cast", "Not less than 75% of votes cast", "90% of votes cast", "Unanimity"],
    1,
    "NOT LESS THAN 75% of votes cast. Over 50% is an ordinary resolution."),

  q1("LWEK-40-02", "LWE-40", "F", "easy",
    "What percentage of paid-up voting capital allows members to requisition a general meeting?",
    ["1%", "5%", "10%", "25%"],
    1,
    "FIVE PER CENT. The directors must then CALL it within 21 days, to be HELD within 28 days of that notice, failing which the requisitionists may call it themselves and recover their expenses."),

  q1("LWEK-40-03", "LWE-40", "F", "medium",
    "Which company must hold an annual general meeting?",
    ["Every company", "A public company", "A private company", "Only a listed company"],
    1,
    "A PUBLIC company, within six months of its financial year end. A private company need not hold one unless its articles require it."),

  q2("LWEK-40-04", "LWE-40", "F", "medium",
    "A private company circulates a written resolution to remove a director, signed by holders of 80% of the total voting rights. Is the director removed?",
    [
      "Yes, 80% exceeding the required majority",
      "No — a written resolution cannot remove a director, who is entitled to be heard at a meeting",
      "Yes, provided he was sent a copy",
      "No, removal requiring a special resolution",
    ],
    1,
    "NO, whatever the majority. A written resolution CANNOT remove a DIRECTOR or an AUDITOR, because both are entitled to be HEARD and to have representations circulated — which requires a MEETING."),

  q2("LWEK-40-05", "LWE-40", "F", "medium",
    "Against what is the majority for a WRITTEN resolution measured?",
    ["The votes actually returned", "The total voting rights of eligible members", "Those present at the last meeting", "The shares in issue including treasury shares"],
    1,
    "The TOTAL VOTING RIGHTS of eligible members, so SILENCE COUNTS AS A NO. An ordinary written resolution therefore needs over 50% of ALL the votes, not of those who happen to respond."),

  q2("LWEK-40-06", "LWE-40", "F", "medium",
    "A member holding 60% of the shares is defeated on a show of hands. What can he do?",
    [
      "Nothing, the vote having been taken",
      "Demand a poll, on which votes follow shareholdings",
      "Requisition a fresh meeting only",
      "Apply to the court to set the vote aside",
    ],
    1,
    "DEMAND A POLL. On a SHOW OF HANDS each member has ONE vote regardless of holding; on a POLL votes follow SHAREHOLDINGS. He qualifies as a member representing at least 10% of the total voting rights."),

  q2("LWEK-40-07", "LWE-40", "F", "hard",
    "A member holds 60% of a private company's shares. Which can he pass alone on a poll?",
    [
      "Both an ordinary and a special resolution",
      "An ordinary resolution but not a special resolution",
      "A special resolution but not an ordinary resolution",
      "Neither",
    ],
    1,
    "An ORDINARY resolution only. Over 50% carries ordinary business, but a SPECIAL resolution needs NOT LESS THAN 75% — so 60% is never enough to alter the articles, change the name, reduce capital or wind the company up voluntarily."),
]

export const LWE_KIT_AREAS_E_F: AccaQuestion[] = [
  ...CH34,
  ...CH35,
  ...CH36,
  ...CH37,
  ...CH38,
  ...CH39,
  ...CH40,
]
