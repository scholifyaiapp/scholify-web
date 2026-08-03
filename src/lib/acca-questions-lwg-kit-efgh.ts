import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lwg-kit-builders"

/*
 * LW-GLOBAL · Areas E, F, G and H question kit — chapters 22 to 33.
 *
 * Capital and financing, management and administration, companies in difficulty or in
 * crisis, and corporate fraudulent and criminal behaviour.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 22 · Share capital ─────────────────────────────────── */

const CH22: AccaQuestion[] = [
  q1("LWGK-22-01", "LWG-22", "E", "easy",
    "May shares be issued at a discount to their nominal value?",
    ["Yes, if the members approve", "No — and the allottee remains liable for the shortfall", "Yes, for a private company", "Yes, where the market price is lower"],
    1,
    "NO. A share may be issued at a PREMIUM but never at a discount, and an allottee of a discounted share is liable to pay up the shortfall with interest."),

  q1("LWGK-22-02", "LWG-22", "E", "easy",
    "What rights do treasury shares carry while held by the company?",
    ["Full voting and dividend rights", "No vote and no dividend", "A vote but no dividend", "A dividend but no vote"],
    1,
    "NONE — no vote and no dividend while held in treasury. They may later be cancelled, sold, or transferred to an employees' scheme."),

  q1("LWGK-22-03", "LWG-22", "E", "medium",
    "Where does consideration above nominal value go on a share issue?",
    ["Retained earnings", "Share premium, a restricted account", "Share capital", "A revaluation reserve"],
    1,
    "To SHARE PREMIUM, which is treated as capital rather than distributable profit — a creditor-protection measure, so it cannot be paid out as a dividend."),

  q1("LWGK-22-04", "LWG-22", "E", "medium",
    "What is the defining feature of a bonus issue?",
    [
      "It raises cash at a discount to market",
      "It raises no cash and leaves total equity unchanged",
      "It is offered to outside investors",
      "It must be made at a premium",
    ],
    1,
    "It raises NO CASH and leaves TOTAL EQUITY UNCHANGED, capitalising a reserve — share premium first where available — into share capital."),

  q2("LWGK-22-05", "LWG-22", "E", "hard",
    "A company issues 100,000 $1 shares at $2.50. How is the consideration recorded?",
    [
      "$250,000 to share capital",
      "$100,000 to share capital and $150,000 to share premium",
      "$100,000 to share capital and $150,000 to distributable profits",
      "$250,000 to share premium",
    ],
    1,
    "Share capital takes the NOMINAL amount, $100,000, and the excess $150,000 goes to SHARE PREMIUM — a restricted, non-distributable account. Crediting the whole sum to share capital overstates it by exactly the premium."),

  q2("LWGK-22-06", "LWG-22", "E", "hard",
    "Preference shares carry one vote each. The company issues many more ordinary shares, cutting the preference holders' share of the votes. Is that a variation of class rights?",
    [
      "Yes, their voting power has fallen",
      "Generally no — the right itself is unchanged; only its value or enjoyment is affected",
      "Yes, because preference shares are involved",
      "Only if their share falls below 25%",
    ],
    1,
    "GENERALLY NOT. The RIGHT — one vote per share — is untouched, so the class consent machinery is not triggered. A complaint must be founded on the directors' duties or unfair prejudice instead."),

  q2("LWGK-22-07", "LWG-22", "E", "medium",
    "What is the purpose of a pre-emption right on a new issue for cash?",
    [
      "To guarantee the issue is fully subscribed",
      "To offer the shares to existing members first, so their proportion is not diluted without consent",
      "To fix the issue price",
      "To prevent the company issuing shares at all",
    ],
    1,
    "To offer them to EXISTING MEMBERS FIRST in proportion to their holdings, protecting them from dilution. Pre-emption may be disapplied by special resolution."),

  q2("LWGK-22-08", "LWG-22", "E", "medium",
    "How is a variation of class rights usually effected?",
    [
      "By ordinary resolution of all members",
      "By the procedure in the articles, typically consent of the class or a special resolution at a separate class meeting",
      "By the directors alone",
      "By notice to the registrar only",
    ],
    1,
    "By the ARTICLES' procedure — usually class consent or a special resolution at a separate CLASS MEETING — failing which a statutory default applies. A dissenting minority of the class may typically apply to the court."),

  q1("LWGK-22-09", "LWG-22", "E", "medium",
    "Which class of share ordinarily takes the surplus on a winding up after all other claims?",
    ["Preference shares", "Ordinary shares", "Redeemable shares", "Treasury shares"],
    1,
    "ORDINARY shares carry the residual risk and the residual reward. Preference shares take a fixed dividend and priority for capital but no surplus unless they are participating."),

  multi2("LWGK-22-10", "LWG-22", "E", "hard",
    "Which TWO statements about a rights issue are correct?",
    [
      "It raises cash from existing members",
      "It leaves total equity unchanged",
      "It is usually priced below market to encourage take-up",
      "It is funded by capitalising a reserve",
    ],
    [0, 2],
    "It RAISES CASH from existing members, usually at a DISCOUNT to market. Leaving equity unchanged and capitalising a reserve describe a BONUS issue."),
]

/* ── Chapter 23 · Loan capital and charges ──────────────────────── */

const CH23: AccaQuestion[] = [
  q1("LWGK-23-01", "LWG-23", "E", "easy",
    "What is a debenture?",
    ["A class of share", "A document acknowledging a company's indebtedness", "A charge over assets", "A dividend voucher"],
    1,
    "A document acknowledging a company's INDEBTEDNESS, whether or not secured, issued singly or as a series."),

  q1("LWGK-23-02", "LWG-23", "E", "easy",
    "Does a debenture holder vote at general meetings?",
    ["Yes, in proportion to the debt", "No — it is a creditor, not a member", "Only on a winding-up resolution", "Only if the debenture is secured"],
    1,
    "NO. A debenture holder is a CREDITOR: it receives interest whether or not there are profits, has no vote, and is paid ahead of members on a winding up."),

  q1("LWGK-23-03", "LWG-23", "E", "medium",
    "What happens when a floating charge crystallises?",
    ["It is discharged", "It converts into a fixed charge on the assets then in the class", "It ranks ahead of preferential creditors", "The company may still deal with the assets"],
    1,
    "It CONVERTS INTO A FIXED CHARGE on the assets then in the class — triggered by liquidation, cessation of business, appointment of a receiver or administrator, or a specified event."),

  q1("LWGK-23-04", "LWG-23", "E", "medium",
    "Why must a company charge be registered?",
    [
      "To make the debt enforceable",
      "To give public notice and fix priority between competing charge holders",
      "To calculate the interest due",
      "To satisfy the auditor",
    ],
    1,
    "For PUBLIC NOTICE and PRIORITY. Without registration the charge is void against the liquidator, administrator and other creditors — though the debt itself survives."),

  q2("LWGK-23-05", "LWG-23", "E", "hard",
    "A lender takes a fixed charge but fails to register it in time. The company goes into liquidation. What is its position?",
    [
      "The charge is valid and it is paid as a secured creditor",
      "The charge is void against the liquidator and other creditors, so it ranks as unsecured — though the debt survives",
      "The debt is extinguished",
      "It ranks after preferential but ahead of other unsecured creditors",
    ],
    1,
    "The CHARGE is void against the liquidator and other creditors, so the lender becomes UNSECURED. The DEBT remains valid and typically becomes immediately repayable. There is no intermediate ranking."),

  q2("LWGK-23-06", "LWG-23", "E", "hard",
    "A company has no profits this year. What are the entitlements of its debenture holders and ordinary shareholders?",
    [
      "Neither is entitled to a payment",
      "Debenture holders remain entitled to interest; ordinary shareholders have no entitlement to a dividend",
      "Both must be paid out of capital",
      "Shareholders rank ahead in a loss-making year",
    ],
    1,
    "INTEREST is a contractual debt payable regardless of profits; a DIVIDEND may only be paid out of distributable profits and is discretionary. That fixed cost is why gearing measures risk."),

  q2("LWGK-23-07", "LWG-23", "E", "medium",
    "Which is a structural weakness of a floating charge?",
    [
      "It cannot be registered",
      "It ranks behind preferential creditors, and the company may dispose of the charged assets until crystallisation",
      "It covers only land",
      "It expires after twelve months",
    ],
    1,
    "Both halves of that answer: it is SUBORDINATED to preferential claims and to a fixed charge over the same assets, and the assets can be sold in the ordinary course until CRYSTALLISATION. That is the price of letting the company trade."),

  q2("LWGK-23-08", "LWG-23", "E", "hard",
    "A company's articles cap borrowing at $100,000. The directors borrow $400,000 from a bank that knows nothing of the cap. Is the loan enforceable?",
    [
      "No, the directors exceeded their powers",
      "Generally yes — a third party dealing in good faith is unaffected by a constitutional limit, though the directors are liable to the company",
      "Only up to $100,000",
      "Only if the members ratify",
    ],
    1,
    "GENERALLY ENFORCEABLE. A constitutional restriction binds the directors INTERNALLY; a good-faith third party is not affected by it. The directors remain exposed to the company for breach of duty — the same pattern as an agency authority problem."),

  q1("LWGK-23-09", "LWG-23", "E", "medium",
    "Which type of charge attaches to specific identified assets?",
    ["A floating charge", "A fixed charge", "A crystallised charge", "An equitable lien"],
    1,
    "A FIXED charge, which the company cannot dispose of free of without consent. A floating charge hovers over a class of assets the company may continue to trade."),

  multi2("LWGK-23-10", "LWG-23", "E", "hard",
    "Which TWO events crystallise a floating charge?",
    [
      "The company goes into liquidation",
      "The company declares a dividend",
      "The company ceases to carry on business",
      "The charge is registered",
    ],
    [0, 2],
    "LIQUIDATION and CESSATION OF BUSINESS both crystallise it, as does appointment of a receiver or administrator or an event specified in the instrument. Declaring a dividend and registering the charge do not."),
]

/* ── Chapter 24 · Capital maintenance and dividends ─────────────── */

const CH24: AccaQuestion[] = [
  q1("LWGK-24-01", "LWG-24", "E", "easy",
    "Why does the law restrict the return of share capital to members?",
    [
      "To protect the members' investment",
      "Because creditors have no recourse against members personally, so the capital is the fund they rely on",
      "To increase tax revenue",
      "Because capital cannot be measured reliably",
    ],
    1,
    "Because limited liability leaves CREDITORS with no claim against the members, so the company's capital is the fund they lent against. Capital maintenance stops the members withdrawing it except by a safeguarded procedure."),

  q1("LWGK-24-02", "LWG-24", "E", "easy",
    "Can an unrealised revaluation surplus fund a dividend?",
    ["Yes", "No — it is unrealised and an undistributable reserve", "Yes, up to half of it", "Only for a private company"],
    1,
    "NO. Under s.830(2) distributable profits are accumulated REALISED profits less accumulated realised losses. A revaluation surplus is unrealised and undistributable."),

  q1("LWGK-24-03", "LWG-24", "E", "medium",
    "What is the additional test a PUBLIC company must satisfy before making a distribution?",
    [
      "That it has positive cash flow",
      "That after the distribution net assets are no less than called-up share capital plus undistributable reserves",
      "That the auditor consents",
      "That the dividend does not exceed last year's",
    ],
    1,
    "The NET-ASSETS test. It frequently bites BEFORE the distributable profits test, so testing only accumulated realised profits gives the wrong answer for a public company."),

  q1("LWGK-24-04", "LWG-24", "E", "medium",
    "Who may be liable to make good an unlawful distribution?",
    [
      "Only the directors",
      "A member who knew or had reasonable grounds to believe it unlawful, and the directors who authorised it",
      "Only the auditor",
      "Only the company itself",
    ],
    1,
    "BOTH: the knowing MEMBER must repay it, and the authorising DIRECTORS may be required to make good the amount to the company. \"The members have spent it\" is no answer."),

  q2("LWGK-24-05", "LWG-24", "E", "hard",
    "Accumulated realised profits are $400,000, accumulated realised losses $90,000 and an unrealised revaluation surplus $200,000. What are distributable profits?",
    ["$600,000", "$510,000", "$310,000", "$400,000"],
    2,
    "$400,000 − $90,000 = $310,000. The revaluation surplus is UNREALISED and excluded, and the test is CUMULATIVE — prior losses must be made good before profits become distributable."),

  q2("LWGK-24-06", "LWG-24", "E", "hard",
    "How may a company lawfully reduce its share capital?",
    [
      "It cannot, under any circumstances",
      "By special resolution, with court confirmation or — where permitted — a directors' solvency statement",
      "By a board resolution alone",
      "By simply paying members out of capital",
    ],
    1,
    "By SPECIAL RESOLUTION with either COURT CONFIRMATION or a directors' SOLVENCY STATEMENT. The solvency statement relocates the protection onto the directors, who commit an offence if it is made without reasonable grounds, rather than removing it."),

  q2("LWGK-24-07", "LWG-24", "E", "medium",
    "Once a final dividend has been declared, what is its status?",
    ["A discretionary payment", "A debt owed to the members", "An expense of the company", "A reserve"],
    1,
    "A DEBT owed to the members. It is a distribution, deducted from retained earnings in the statement of changes in equity — never an expense — and the members generally cannot vote more than the directors recommend."),

  q2("LWGK-24-08", "LWG-24", "E", "medium",
    "Why might a company legitimately want to reduce its capital?",
    [
      "To avoid paying its creditors",
      "To eliminate accumulated losses so that future profits become distributable",
      "To increase the number of shares in issue",
      "To avoid filing accounts",
    ],
    1,
    "To ELIMINATE ACCUMULATED LOSSES, so the balance sheet reflects reality and future profits are not absorbed by a deficit. Returning genuinely surplus capital, cancelling uncalled capital and facilitating a reorganisation are other legitimate reasons."),

  q1("LWGK-24-09", "LWG-24", "E", "medium",
    "From what must a share buy-back ordinarily be funded?",
    ["Share capital", "Distributable profits or a fresh issue", "The revaluation surplus", "Borrowings only"],
    1,
    "DISTRIBUTABLE PROFITS or the proceeds of a FRESH ISSUE, with only limited scope for a private company to use capital subject to strict conditions and creditor safeguards."),

  multi2("LWGK-24-10", "LWG-24", "E", "hard",
    "Which TWO are undistributable reserves?",
    ["Share premium", "Retained earnings", "The revaluation surplus", "Accumulated realised profits"],
    [0, 2],
    "SHARE PREMIUM and the REVALUATION SURPLUS are both undistributable, and both are protected by the public company net-assets test. Retained earnings and accumulated realised profits are the distributable pool."),
]

/* ── Chapter 25 · Directors: appointment and removal ────────────── */

const CH25: AccaQuestion[] = [
  q1("LWGK-25-01", "LWG-25", "F", "easy",
    "What is a shadow director?",
    [
      "A director who does not attend board meetings",
      "A person on whose directions or instructions the board is accustomed to act",
      "A non-executive director",
      "An alternate appointed by another director",
    ],
    1,
    "A person on whose DIRECTIONS OR INSTRUCTIONS the board is accustomed to act, without appearing as a director — carrying a director's duties and liabilities. Advisers acting professionally are excluded."),

  q1("LWGK-25-02", "LWG-25", "F", "easy",
    "How may members remove a director?",
    ["By special resolution only", "By ordinary resolution on special notice", "By written resolution", "Only with the director's consent"],
    1,
    "By ORDINARY RESOLUTION on SPECIAL NOTICE — a power that cannot be excluded by the articles or by contract, and which cannot be exercised by written resolution."),

  q1("LWGK-25-03", "LWG-25", "F", "medium",
    "Must a director hold shares in the company?",
    ["Yes", "No, unless the articles impose a shareholding qualification", "Yes, for a public company", "Yes, at least one share"],
    1,
    "NO shareholding qualification is required unless the ARTICLES impose one. A director need not be a member at all."),

  q1("LWGK-25-04", "LWG-25", "F", "medium",
    "What does a disqualification order prohibit?",
    [
      "Only formal appointment as a director",
      "Acting as a director or taking part directly or indirectly in the promotion, formation or management of a company",
      "Owning shares in any company",
      "Employment by any company",
    ],
    1,
    "Acting as a director OR taking part DIRECTLY OR INDIRECTLY in promotion, formation or management, without leave of the court. Acting in breach is an offence and brings personal liability for debts incurred."),

  q2("LWGK-25-05", "LWG-25", "F", "hard",
    "The articles state that a director may be removed only by special resolution. Is that effective?",
    [
      "Yes, the articles govern removal",
      "No — the statutory power to remove by ordinary resolution on special notice cannot be excluded",
      "Yes, if the director agreed to the article",
      "Only for a public company",
    ],
    1,
    "NOT EFFECTIVE. The removal power cannot be excluded by the articles or by contract. Note, though, that a WEIGHTED VOTING provision may frustrate removal in practice without being a direct exclusion."),

  q2("LWGK-25-06", "LWG-25", "F", "hard",
    "A dominant shareholder is never appointed a director, but the board has for years done whatever she instructs. What is her exposure?",
    [
      "None, being unappointed",
      "She is likely a shadow director, carrying a director's duties and liabilities including to disqualification and wrongful trading",
      "She is an alternate director",
      "She is liable only to the members",
    ],
    1,
    "SHADOW DIRECTOR exposure. Non-appointment is not an escape: the law is interested in what a person actually does, so she carries the duties and the liabilities of a director."),

  q2("LWGK-25-07", "LWG-25", "F", "medium",
    "A director with three years left on a five-year service contract is removed by ordinary resolution. What follows?",
    [
      "The removal is invalid",
      "The removal is effective, but the company may owe damages for wrongful dismissal",
      "The contract continues automatically",
      "The director must be reinstated",
    ],
    1,
    "The removal is EFFECTIVE but the CONTRACT is a separate matter: removal in breach of a service agreement exposes the company to damages for wrongful dismissal. A long fixed term makes removal expensive rather than impossible."),

  q2("LWGK-25-08", "LWG-25", "F", "medium",
    "Which is a ground for disqualification?",
    [
      "Resigning without notice",
      "Being found, under s.6, \"unfit to be concerned in the management of a company\", typically after an insolvency",
      "Holding directorships in more than one company",
      "Disagreeing with the auditor",
    ],
    1,
    "A finding of UNFITNESS, typically after insolvency. Conviction of an indictable offence connected with management, persistent filing breaches, fraudulent or wrongful trading and competition law breaches are the others."),

  q1("LWGK-25-09", "LWG-25", "F", "medium",
    "What is a de facto director?",
    [
      "A director appointed for a fixed term",
      "A person who acts as a director without valid appointment",
      "A director resident abroad",
      "A former director",
    ],
    1,
    "A person who ACTS AS A DIRECTOR without valid appointment — treated as one, with the same duties and exposure as a validly appointed director."),

  multi2("LWGK-25-10", "LWG-25", "F", "hard",
    "Which TWO cause a director to lose office?",
    [
      "Removal by ordinary resolution on special notice",
      "Disagreement with a majority of the board",
      "Disqualification by court order",
      "Selling their shares in the company",
    ],
    [0, 2],
    "REMOVAL by the members and DISQUALIFICATION both end office, as do resignation, retirement by rotation, vacation under the articles and death. Disagreement and selling shares do not — a director need not be a member."),
]

/* ── Chapter 26 · Directors' powers and duties ──────────────────── */

const CH26: AccaQuestion[] = [
  q1("LWGK-26-01", "LWG-26", "F", "easy",
    "Where does the power to manage a company reside?",
    ["In each individual director", "In the board collectively", "In the members", "In the company secretary"],
    1,
    "In the BOARD COLLECTIVELY. An individual director has no inherent power to bind the company — whether it is bound is an agency question."),

  q1("LWGK-26-02", "LWG-26", "F", "easy",
    "To whom do directors owe their general duties?",
    ["The members individually", "The company", "The creditors", "The auditor"],
    1,
    "The COMPANY. So it is the company that sues for breach, and a member can only do so through a derivative claim with the court's permission."),

  q1("LWGK-26-03", "LWG-26", "F", "medium",
    "What must a director do before the company enters a transaction in which the director has an interest?",
    ["Resign", "Declare the nature and extent of the interest to the other directors", "Obtain the auditor's consent", "Sell their shares"],
    1,
    "DECLARE the nature and extent of the interest to the other directors. Failing to do so and voting on the transaction exposes it to rescission."),

  q1("LWGK-26-04", "LWG-26", "F", "medium",
    "Whose votes are disregarded when members ratify a director's breach of duty?",
    ["The auditor's", "The director concerned and their connected persons", "The non-executive directors'", "None — all votes count"],
    1,
    "The DIRECTOR'S and their CONNECTED PERSONS'. And some breaches cannot be ratified at all — where it would be a fraud on the minority, or the company is insolvent."),

  q2("LWGK-26-05", "LWG-26", "F", "hard",
    "A director who is a qualified accountant misses an obvious error in the accounts. What standard of care applies?",
    [
      "The general standard expected of any director",
      "The higher standard imported by their own knowledge, skill and experience, in addition to the objective minimum",
      "A lower standard, since reliance on management is reasonable",
      "None — the accounts are the auditor's responsibility",
    ],
    1,
    "The HIGHER standard. The duty is objective AND subjective, and the subjective limb can only RAISE the standard. A qualified accountant cannot plead the general minimum, and the auditor's role does not displace the director's."),

  q2("LWGK-26-06", "LWG-26", "F", "hard",
    "A director takes for himself a licence the company had been negotiating for months, then sub-licences it to the company at a mark-up. What must he do?",
    [
      "Nothing, if the company could not have afforded it",
      "Account to the company for the profit — the opportunity belonged to it",
      "Repay only the company's wasted costs",
      "Resign, with no financial consequence",
    ],
    1,
    "ACCOUNT for the profit. A CORPORATE OPPORTUNITY belongs to the company even if the company might not have obtained it, and using information gained as a director breaches the duty to avoid conflicts. The sub-licence is also liable to rescission."),

  q2("LWGK-26-07", "LWG-26", "F", "medium",
    "A single director with no delegated authority signs a major contract in the company's name. Is the company bound?",
    [
      "Yes, every director can bind the company",
      "Not automatically — it turns on whether the director had actual authority or the company held them out as having it",
      "Yes, if the contract benefits the company",
      "No, in every case",
    ],
    1,
    "NOT AUTOMATICALLY. Power resides in the BOARD, so the question is an agency one: actual authority, or a holding out by the company. Benefit to the company is irrelevant to whether authority existed."),

  q2("LWGK-26-08", "LWG-26", "F", "medium",
    "Whose approval does a loan by the company to one of its directors normally require?",
    ["The board's", "The members'", "The auditor's", "The registrar's"],
    1,
    "The MEMBERS'. Dealings between a director and the company are statutorily controlled, so board approval alone is likely to make the loan improper and expose the authorising directors."),

  q1("LWGK-26-09", "LWG-26", "F", "medium",
    "What does the duty to exercise independent judgement prohibit?",
    [
      "Taking professional advice",
      "Agreeing in advance to vote as another person directs",
      "Delegating any function",
      "Disagreeing with the board",
    ],
    1,
    "FETTERING DISCRETION — agreeing in advance to vote as another directs. Taking advice and delegating within the constitution are both perfectly proper."),

  multi2("LWGK-26-10", "LWG-26", "F", "hard",
    "Which TWO are remedies available to a company for a director's breach of duty?",
    [
      "An account of profits",
      "Automatic disqualification of the director",
      "Rescission of a tainted contract",
      "Cancellation of the director's shares",
    ],
    [0, 2],
    "An ACCOUNT OF PROFITS and RESCISSION of a tainted contract, along with damages, restoration of property and an injunction. Disqualification is a separate court process, and shares are not cancelled as a remedy."),
]

/* ── Chapter 27 · Secretary and auditor ─────────────────────────── */

const CH27: AccaQuestion[] = [
  q1("LWGK-27-01", "LWG-27", "F", "easy",
    "To whom does the auditor report?",
    ["The directors", "The members", "The registrar", "The audit committee only"],
    1,
    "The MEMBERS. They entrusted their money to the directors who prepare the accounts, so the auditor's independence from the board is what gives the report value."),

  q1("LWGK-27-02", "LWG-27", "F", "easy",
    "How is an auditor removed?",
    ["By special resolution", "By ordinary resolution on special notice", "By the directors", "By the registrar"],
    1,
    "By ORDINARY RESOLUTION on SPECIAL NOTICE, with the auditor entitled to make written representations for circulation and to be heard at the meeting."),

  q1("LWGK-27-03", "LWG-27", "F", "medium",
    "What is the extent of a company secretary's usual authority?",
    [
      "All commercial transactions",
      "Administrative contracts incidental to running the office",
      "Borrowing on the company's behalf",
      "Selling company assets",
    ],
    1,
    "ADMINISTRATIVE contracts incidental to running the office — hiring temporary staff, ordering supplies. It does not extend to borrowing, selling assets or trading contracts."),

  q1("LWGK-27-04", "LWG-27", "F", "medium",
    "What must accompany an auditor's resignation?",
    [
      "A replacement auditor's consent",
      "A statement of the circumstances connected with it, or that there are none",
      "The directors' approval",
      "A final audit report",
    ],
    1,
    "A STATEMENT OF THE CIRCUMSTANCES, or a statement that there are none — with notification to the registrar and often the audit authority. The auditor may also requisition a meeting to explain."),

  q2("LWGK-27-05", "LWG-27", "F", "hard",
    "A secretary, without board authority, hires temporary office staff and separately signs a $400,000 loan agreement. Which binds the company?",
    [
      "Both, the secretary being an officer",
      "The staffing arrangement only, being within the secretary's administrative usual authority",
      "Neither, without a board resolution",
      "The loan only, being in writing",
    ],
    1,
    "The STAFFING arrangement. A secretary has usual authority for contracts incidental to running the office; borrowing is commercial and needs actual authority from the board."),

  q2("LWGK-27-06", "LWG-27", "F", "hard",
    "Directors instruct staff not to answer audit queries while they move to replace the auditor. What must the auditor do about the information?",
    [
      "Nothing, pending the removal vote",
      "State in its report that the required information was not obtained",
      "Resign immediately without explanation",
      "Report the matter only to the directors",
    ],
    1,
    "STATE IN ITS REPORT that the required information was not obtained. The auditor's rights of access and to information are independent of its tenure, so obstructing the audit is itself reportable — and makes the board's position worse."),

  q2("LWGK-27-07", "LWG-27", "F", "medium",
    "Which is a right of the auditor?",
    [
      "To veto the accounts",
      "To receive notice of, attend and speak at any general meeting on matters concerning them as auditor",
      "To appoint a director",
      "To approve the dividend",
    ],
    1,
    "To receive NOTICE, ATTEND and SPEAK at general meetings on matters concerning them as auditor — alongside rights of access to the books and to require information from officers and employees."),

  q2("LWGK-27-08", "LWG-27", "F", "medium",
    "Which company must have a secretary?",
    ["Every company", "A public company, generally", "A private company, generally", "Only a listed company"],
    1,
    "A PUBLIC company generally must; for a private company it is usually optional, and where there is none the duties fall on the directors. A public company's secretary must also be suitably qualified."),

  q1("LWGK-27-09", "LWG-27", "F", "medium",
    "Who ordinarily appoints the auditor?",
    ["The directors, each year", "The members, by ordinary resolution", "The registrar", "The audit authority"],
    1,
    "The MEMBERS, by ordinary resolution for each financial year. The directors may appoint the FIRST auditor and fill a casual vacancy."),

  multi2("LWGK-27-10", "LWG-27", "F", "hard",
    "Which TWO are duties of a company secretary?",
    [
      "Maintaining the statutory registers and minute books",
      "Approving the annual dividend",
      "Making filings with the registrar within time",
      "Setting the directors' remuneration",
    ],
    [0, 2],
    "MAINTAINING REGISTERS AND MINUTES and making FILINGS on time, along with giving notice of meetings and advising the board on procedure and compliance. Dividends and remuneration are not the secretary's decisions."),
]

/* ── Chapter 28 · Meetings and resolutions ─────────────────────── */

const CH28: AccaQuestion[] = [
  q1("LWGK-28-01", "LWG-28", "F", "easy",
    "What majority does an ordinary resolution require?",
    ["A simple majority of votes cast", "A supermajority", "Unanimity", "Two thirds of the members"],
    1,
    "A SIMPLE MAJORITY of votes cast. A special resolution requires a supermajority, the percentage of which the scenario will state."),

  q1("LWGK-28-02", "LWG-28", "F", "easy",
    "What may a written resolution of a private company NOT be used for?",
    ["Altering the articles", "Removing a director or an auditor", "Approving a dividend", "Changing the company's name"],
    1,
    "REMOVING A DIRECTOR OR AN AUDITOR, because each is entitled to be HEARD by the members before the vote and a circulated resolution gives no forum."),

  q1("LWGK-28-03", "LWG-28", "F", "medium",
    "Who is entitled to notice of a general meeting?",
    ["Members only", "Members, the directors and the auditor", "Members and creditors", "Members and the registrar"],
    1,
    "MEMBERS, DIRECTORS and the AUDITOR. The notice must state the time, date, place and general nature of the business, and set out the text of any special resolution."),

  q1("LWGK-28-04", "LWG-28", "F", "medium",
    "On a poll, how are votes counted?",
    ["One vote per member present", "By shareholding", "By length of membership", "By the chair's discretion"],
    1,
    "By SHAREHOLDING. A show of hands gives each member present one vote, so a poll can reverse the apparent result — which is exactly why the right to demand one exists."),

  q2("LWGK-28-05", "LWG-28", "F", "hard",
    "A resolution is carried on a show of hands seven to three. One of the three holds 60% of the shares and demands a poll. What is the likely outcome?",
    [
      "The show of hands stands, having been taken first",
      "On a poll votes are counted by shareholding, so the resolution is likely defeated",
      "The poll can only confirm the show of hands",
      "The chair decides which result applies",
    ],
    1,
    "The resolution is likely DEFEATED. On a poll the 60% holder outvotes the other members combined, notwithstanding a majority of heads on the show of hands."),

  q2("LWGK-28-06", "LWG-28", "F", "hard",
    "A private company circulates written resolutions to alter its articles, remove a director and remove its auditor, and four of five members sign. What is the effect?",
    [
      "All three are validly passed",
      "The alteration may be valid; the two removals are not, because a written resolution cannot be used for them",
      "None is valid without unanimity",
      "All three are invalid for want of a meeting",
    ],
    1,
    "The ALTERATION may be valid if the supermajority threshold is met; both REMOVALS are invalid, because a written resolution cannot remove a director or an auditor. Even unanimity would not cure it, since the protection exists for the officer's right to be heard."),

  q2("LWGK-28-07", "LWG-28", "F", "medium",
    "Which resolution is required to alter the articles?",
    ["Ordinary", "Special", "Written, in every case", "A board resolution"],
    1,
    "A SPECIAL resolution, filed with the registrar — subject to any entrenchment and to the bona fide requirement. Changing the name, reducing capital and voluntary winding up also require one."),

  q2("LWGK-28-08", "LWG-28", "F", "medium",
    "What is the effect of a resolution passed without proper notice or without a quorum?",
    ["It stands, if the majority agreed", "It is liable to be invalid, and acts done under it may fall with it", "It is valid but voidable by the registrar", "It takes effect after ratification by the board"],
    1,
    "It is liable to be INVALID, and anything done under it may fall too. Procedure here is substantive rather than clerical — which is why a defect can undo a decision entirely."),

  q1("LWGK-28-09", "LWG-28", "F", "medium",
    "What is special notice?",
    [
      "A longer notice period for every general meeting",
      "Extended notice to the company of an intended resolution, additional to notice of the meeting",
      "Notice given only to the directors",
      "Notice published in a newspaper",
    ],
    1,
    "EXTENDED NOTICE TO THE COMPANY of an intended resolution — required for removing a director or an auditor, and distinct from notice of the meeting itself."),

  multi2("LWGK-28-10", "LWG-28", "F", "hard",
    "Which TWO matters require a special resolution?",
    [
      "Altering the articles",
      "Appointing an auditor",
      "Reducing share capital",
      "Approving a final dividend",
    ],
    [0, 2],
    "ALTERING THE ARTICLES and REDUCING CAPITAL, along with changing the name, voluntary winding up and disapplying pre-emption rights. Appointing an auditor and approving a dividend are ordinary resolutions."),
]

/* ── Chapter 29 · Liquidation ───────────────────────────────────── */

const CH29: AccaQuestion[] = [
  q1("LWGK-29-01", "LWG-29", "G", "easy",
    "What distinguishes a members' from a creditors' voluntary liquidation?",
    [
      "The size of the company",
      "Whether the directors make a declaration of solvency",
      "Whether a court order is obtained",
      "Whether the company is listed",
    ],
    1,
    "The DECLARATION OF SOLVENCY. With one, the MEMBERS appoint the liquidator; without one the CREDITORS do and control the process, because it is now their money at stake."),

  q1("LWGK-29-02", "LWG-29", "G", "easy",
    "Who ranks immediately ahead of a floating charge holder in a liquidation?",
    ["Ordinary unsecured creditors", "Preferential creditors, after liquidation expenses", "The members", "Nobody"],
    1,
    "PREFERENTIAL CREDITORS, after liquidation expenses and after any fixed charge holder has been satisfied from its own security. Unsecured creditors rank BELOW the floating charge."),

  q1("LWGK-29-03", "LWG-29", "G", "medium",
    "On what residual ground may a court wind a company up?",
    ["Inability to pay debts", "That it is just and equitable to do so", "Failure to appoint an auditor", "A fall in turnover"],
    1,
    "That it is JUST AND EQUITABLE — covering deadlock, loss of the company's substratum, exclusion from management in a quasi-partnership, and justifiable loss of confidence in management."),

  q1("LWGK-29-04", "LWG-29", "G", "medium",
    "What is the effect of a winding-up order on the directors?",
    ["They continue in office with full powers", "Their powers cease and the liquidator takes control", "They become liquidators", "They must indemnify creditors"],
    1,
    "Their POWERS CEASE and the LIQUIDATOR takes control of the assets. Proceedings against the company are stayed and employees are typically dismissed by the order."),

  q2("LWGK-29-05", "LWG-29", "G", "hard",
    "Directors declare solvency and the members appoint a liquidator, who then finds the company cannot pay in full. What happens?",
    [
      "The liquidation continues unchanged",
      "It converts into a creditors' voluntary liquidation, with the creditors taking control",
      "The liquidation is void and must restart",
      "The court must order a compulsory winding up",
    ],
    1,
    "It CONVERTS into a creditors' voluntary liquidation and the CREDITORS take control. The directors also face exposure for having declared solvency without reasonable grounds, which is an offence."),

  q2("LWGK-29-06", "LWG-29", "G", "hard",
    "Premises subject to a fixed charge securing $450,000 realise $700,000. What happens to the proceeds?",
    [
      "All $700,000 goes into the general estate",
      "The charge holder takes $450,000 and the $250,000 surplus falls into the general estate",
      "The charge holder takes all $700,000",
      "The surplus goes to the members",
    ],
    1,
    "The charge holder takes $450,000 from ITS OWN SECURITY, and the $250,000 SURPLUS joins the general estate. A fixed charge holder is satisfied from its security before the estate is distributed at all."),

  q2("LWGK-29-07", "LWG-29", "G", "medium",
    "What may a liquidator do about transactions entered into before the liquidation?",
    [
      "Nothing — it may only realise remaining assets",
      "Attack a preference given to one creditor, or a transaction at an undervalue, and pursue directors for wrongful trading",
      "Only recover assets still in the company's name",
      "Only pursue the auditor",
    ],
    1,
    "It can look BACKWARDS: attacking a PREFERENCE or a TRANSACTION AT AN UNDERVALUE, and pursuing directors for wrongful trading. So advising a struggling company to move assets or pay a favoured creditor makes matters worse."),

  q2("LWGK-29-08", "LWG-29", "G", "hard",
    "Two equal shareholder-directors of a solvent company are in complete deadlock and neither will sell. On what ground might it be wound up?",
    ["Inability to pay debts", "That it is just and equitable", "Failure to commence business", "There is no ground"],
    1,
    "The JUST AND EQUITABLE ground. The company is solvent, so inability to pay debts does not arise — deadlock is the classic case for the residual ground."),

  q1("LWGK-29-09", "LWG-29", "G", "medium",
    "Where do members rank in a liquidation?",
    ["Ahead of unsecured creditors", "Last, after all creditors and post-commencement interest", "Equally with preferential creditors", "Ahead of floating charge holders"],
    1,
    "LAST. In an insolvent liquidation members almost always receive nothing, and a preference share's capital priority operates only among members."),

  multi2("LWGK-29-10", "LWG-29", "G", "hard",
    "Which TWO are effects of a winding-up order?",
    [
      "Legal proceedings against the company are stayed",
      "The company's contracts are automatically novated to the liquidator",
      "Dispositions of company property after commencement are void unless the court orders otherwise",
      "The company's debts are extinguished",
    ],
    [0, 2],
    "PROCEEDINGS ARE STAYED and later DISPOSITIONS ARE VOID unless the court orders otherwise. Contracts are not novated to the liquidator, and the debts are not extinguished — they simply may go unpaid."),
]

/* ── Chapter 30 · Administration ────────────────────────────────── */

const CH30: AccaQuestion[] = [
  q1("LWGK-30-01", "LWG-30", "G", "easy",
    "What is the FIRST objective of an administration?",
    [
      "Realising property for secured creditors",
      "Rescuing the company as a going concern",
      "Achieving a better result for creditors than winding up",
      "Selling the business quickly",
    ],
    1,
    "RESCUING THE COMPANY as a going concern. The objectives are a HIERARCHY, and a lower one may be pursued only if the higher is not reasonably practicable."),

  q1("LWGK-30-02", "LWG-30", "G", "easy",
    "To whom does an administrator owe its duty?",
    ["Its appointor", "The creditors as a whole", "The members", "The directors"],
    1,
    "The CREDITORS AS A WHOLE — not to the charge holder or other party that appointed it. That is what stops the appointor directing the outcome."),

  q1("LWGK-30-03", "LWG-30", "G", "medium",
    "What happens to the directors on the appointment of an administrator?",
    [
      "They are automatically removed",
      "They remain in office but cannot exercise their powers without the administrator's consent",
      "They become the administrator's employees",
      "Their powers are unaffected",
    ],
    1,
    "They REMAIN IN OFFICE but may not exercise their powers without consent — and the administrator MAY remove them. Running the company is now the administrator's function."),

  q1("LWGK-30-04", "LWG-30", "G", "medium",
    "Who may appoint an administrator out of court?",
    [
      "Any unsecured creditor",
      "The holder of a qualifying floating charge, or the company or its directors",
      "The auditor",
      "The registrar",
    ],
    1,
    "A QUALIFYING FLOATING CHARGE HOLDER, or the COMPANY OR ITS DIRECTORS — the latter on notice to any qualifying charge holder, who may appoint its own choice instead. The court is the third route."),

  q2("LWGK-30-05", "LWG-30", "G", "hard",
    "A lessor arrives to repossess equipment from a company in administration. Can it?",
    [
      "Yes, it owns the equipment",
      "Not without the administrator's consent or the court's permission, because of the moratorium",
      "Yes, within 14 days of the appointment",
      "Only if the equipment is not essential",
    ],
    1,
    "NOT WITHOUT CONSENT OR PERMISSION. The moratorium blocks repossession of goods in the company's possession, as well as enforcement of security and legal process. Ownership does not override it — that is what makes a rescue possible."),

  q2("LWGK-30-06", "LWG-30", "G", "hard",
    "An administrator concludes a rescue is realistically achievable, but the appointing bank presses for an immediate sale to recover its debt. What must the administrator do?",
    [
      "Follow the bank's instructions as its appointor",
      "Pursue the rescue, owing its duty to the creditors as a whole and bound by the hierarchy of objectives",
      "Seek the members' direction",
      "Sell, since secured creditors rank first",
    ],
    1,
    "PURSUE THE RESCUE. The duty is to the CREDITORS AS A WHOLE, and the HIERARCHY permits a lower objective only where the higher is not reasonably practicable. The appointor's preference does not govern."),

  q2("LWGK-30-07", "LWG-30", "G", "medium",
    "What is the purpose of the moratorium?",
    [
      "To extinguish the company's debts",
      "To freeze creditors collectively so the company has breathing space and none can gain by acting fastest",
      "To transfer the assets to the administrator",
      "To postpone the company's tax liabilities",
    ],
    1,
    "To FREEZE CREDITORS COLLECTIVELY. Without it the first creditor to seize an asset would collapse the rescue, so everything else in administration is machinery to use the time the moratorium buys."),

  q2("LWGK-30-08", "LWG-30", "G", "medium",
    "What must an administrator send to creditors within the prescribed period?",
    ["A final account", "Proposals for achieving the purpose of the administration", "A valuation of the assets", "A dividend forecast"],
    1,
    "PROPOSALS for achieving the purpose, for the creditors' approval. It must also take custody of the property, act as quickly and efficiently as reasonably practicable, and report on the directors' conduct."),

  q1("LWGK-30-09", "LWG-30", "G", "medium",
    "How does administration differ in purpose from liquidation?",
    [
      "It is only available to public companies",
      "Liquidation ends the company; administration attempts rescue or a better outcome for creditors",
      "Administration requires a court order in every case",
      "Administration is only for solvent companies",
    ],
    1,
    "LIQUIDATION ENDS THE COMPANY; ADMINISTRATION attempts to rescue it or to secure a better outcome for creditors than winding up, protected by a moratorium. It is available out of court and is for companies unable, or likely to become unable, to pay their debts."),

  multi2("LWGK-30-10", "LWG-30", "G", "hard",
    "Which TWO powers does an administrator have?",
    [
      "To remove and appoint directors",
      "To alter the company's articles unilaterally",
      "To carry on the company's business and sell its assets",
      "To cancel the company's share capital",
    ],
    [0, 2],
    "REMOVING AND APPOINTING DIRECTORS and CARRYING ON THE BUSINESS and selling assets are both administrator powers, along with calling meetings, making certain distributions and applying to court for directions. Altering the articles and cancelling capital are members' matters."),
]

/* ── Chapter 31 · Insider dealing and market abuse ─────────────── */

const CH31: AccaQuestion[] = [
  q1("LWGK-31-01", "LWG-31", "H", "easy",
    "Which is NOT an element of inside information?",
    [
      "That it is specific or precise",
      "That it has not been made public",
      "That it concerns a listed company's directors personally",
      "That it would, if public, likely have a significant effect on price",
    ],
    2,
    "Information need not concern the DIRECTORS personally. The four elements are that it is specific or precise, not public, relates to particular securities or an issuer, and would likely have a significant price effect."),

  q1("LWGK-31-02", "LWG-31", "H", "easy",
    "Which regime is CRIMINAL?",
    ["Market abuse", "Insider dealing", "Both are civil", "Neither"],
    1,
    "INSIDER DEALING is the criminal offence, requiring proof beyond reasonable doubt. Market abuse is a civil and regulatory regime proved to the civil standard."),

  q1("LWGK-31-03", "LWG-31", "H", "medium",
    "Who is a secondary insider?",
    [
      "A director of the issuer",
      "A person whose direct or indirect source of the information is a primary insider",
      "An employee of the regulator",
      "A market maker",
    ],
    1,
    "A person whose SOURCE is a primary insider — the tippee. They commit the offence by dealing, even though they never worked for the company."),

  q1("LWGK-31-04", "LWG-31", "H", "medium",
    "Which is a form of market abuse but not of insider dealing?",
    [
      "Dealing on inside information",
      "Market manipulation giving false or misleading signals as to price",
      "Disclosing inside information improperly",
      "Encouraging another to deal",
    ],
    1,
    "MARKET MANIPULATION. Market abuse is wider than the criminal offence, covering manipulation and dissemination of false information as well as insider dealing and unlawful disclosure."),

  q2("LWGK-31-05", "LWG-31", "H", "hard",
    "A director tells a friend at dinner that a large contract will be announced next week. The friend buys shares; the director buys none. Who is exposed?",
    [
      "Only the friend, having dealt",
      "Only the director, having disclosed",
      "Both — the friend for dealing as a secondary insider, the director for improper disclosure",
      "Neither, the information having been given socially",
    ],
    2,
    "BOTH, on different limbs. The friend is a SECONDARY INSIDER who deals; the director commits the DISCLOSURE offence by telling someone otherwise than in the proper performance of their office. Not dealing personally is no defence to that limb."),

  q2("LWGK-31-06", "LWG-31", "H", "hard",
    "An employee who has heard only office rumours, with no access to the underlying data, sells shares to fund a house purchase. Is that insider dealing?",
    [
      "Yes, because he sold before an announcement",
      "No — he did not have the information as an insider from an inside source",
      "Yes, because he is an employee",
      "Only if the price later fell",
    ],
    1,
    "NO. The person must have the information AS AN INSIDER, from an inside source. Market rumour is not enough, and an ordinary personal reason for selling reinforces the position."),

  q2("LWGK-31-07", "LWG-31", "H", "medium",
    "Which defence may a person in possession of inside information rely on?",
    [
      "That the profit was small",
      "That they would have done what they did even without the information",
      "That they did not know dealing was an offence",
      "That the information came from a friend",
    ],
    1,
    "That they WOULD HAVE ACTED ANYWAY — for example in completing a pre-existing obligation. Other defences are no expectation of profit attributable to the price-sensitive quality, and reasonable belief the information was widely disclosed."),

  q2("LWGK-31-08", "LWG-31", "H", "medium",
    "An employee posts a false claim on an investor forum to hold the share price up, without dealing. What is his exposure?",
    [
      "None, as he has not dealt",
      "Market abuse — dissemination of false information and manipulation",
      "Insider dealing only",
      "A breach of contract only",
    ],
    1,
    "MARKET ABUSE. Disseminating false information and manipulating the price are market abuse whether or not the person has traded — which is one of the ways the civil regime catches conduct the dealing offence would miss."),

  q1("LWGK-31-09", "LWG-31", "H", "medium",
    "Which control removes an informational advantage rather than policing its use?",
    ["Insider lists", "Prompt issuer disclosure of inside information", "Closed periods", "Personal account dealing rules"],
    1,
    "PROMPT ISSUER DISCLOSURE. Announcing the information makes it public, so nobody holds an advantage. Insider lists, closed periods and dealing rules all police the use of an advantage that still exists."),

  multi2("LWGK-31-10", "LWG-31", "H", "hard",
    "Which TWO are forms of the insider dealing offence?",
    [
      "Dealing in price-affected securities while in possession of inside information (s.52)",
      "Failing to announce inside information as an issuer",
      "Encouraging another to deal in those securities",
      "Holding shares during a closed period",
    ],
    [0, 2],
    "DEALING and ENCOURAGING another to deal, the third form being improper DISCLOSURE. An issuer's failure to announce is a regulatory disclosure breach, and merely holding shares is not an offence at all."),
]

/* ── Chapter 32 · Money laundering ─────────────────────────────── */

const CH32: AccaQuestion[] = [
  q1("LWGK-32-01", "LWG-32", "H", "easy",
    "What are the three stages of money laundering?",
    [
      "Concealment, transfer and disclosure",
      "Placement, layering and integration",
      "Deposit, conversion and withdrawal",
      "Acquisition, use and possession",
    ],
    1,
    "PLACEMENT, LAYERING and INTEGRATION. Detection is easiest at placement and hardest once the money has been integrated as apparently legitimate wealth."),

  q1("LWGK-32-02", "LWG-32", "H", "easy",
    "What is tipping off?",
    [
      "Reporting a suspicion to the nominated officer",
      "Disclosing that a report has been made or an investigation is contemplated, where that is likely to prejudice it",
      "Advising a client to seek legal advice",
      "Declining to act for a client",
    ],
    1,
    "Disclosing that a REPORT HAS BEEN MADE or an investigation is contemplated, where that is likely to prejudice it. Internal reporting is required; warning the client is an offence."),

  q1("LWGK-32-03", "LWG-32", "H", "medium",
    "What is the test for the failure to disclose offence in the regulated sector?",
    [
      "Actual knowledge only",
      "Knowledge, suspicion, or reasonable grounds to know or suspect",
      "Proof of dishonesty",
      "Having handled the funds",
    ],
    1,
    "Knowledge, suspicion, OR REASONABLE GROUNDS to know or suspect — an objective test, so failing to notice is no defence. Nor is it necessary to have handled the money."),

  q1("LWGK-32-04", "LWG-32", "H", "medium",
    "Is there a minimum value below which property is not criminal property?",
    ["Yes, a statutory threshold applies", "No — property representing the benefit of any criminal conduct is caught", "Yes, for individuals only", "Only for cash transactions"],
    1,
    "NO de minimis threshold in the substantive offences. Property representing the benefit of ANY criminal conduct is caught, however small."),

  q2("LWGK-32-05", "LWG-32", "H", "hard",
    "An accountant suspects a client's funds derive from tax evasion, says nothing to preserve the relationship, and warns the client to expect questions. What offences arise?",
    [
      "None, having not handled the money",
      "Failure to disclose, and tipping off",
      "Only tipping off",
      "Concealing",
    ],
    1,
    "FAILURE TO DISCLOSE and TIPPING OFF. Not handling the money is no defence to either — the regulated-sector duty is to report a suspicion, and warning the client is a separate offence."),

  q2("LWGK-32-06", "LWG-32", "H", "hard",
    "A prospective client refuses to identify its ultimate beneficial owners, calling it commercially sensitive. What should the business do?",
    [
      "Proceed, as the work requested is routine",
      "Not enter the relationship, because due diligence cannot be completed, and consider an internal report",
      "Proceed but keep additional records",
      "Ask the client to sign a declaration instead",
    ],
    1,
    "DO NOT PROCEED. Identifying the BENEFICIAL OWNER is a core requirement; if it cannot be completed the relationship must not be entered into. The refusal is itself grounds for suspicion — and the client must not be told about any report."),

  q2("LWGK-32-07", "LWG-32", "H", "medium",
    "When is enhanced due diligence required?",
    [
      "For every new client",
      "In higher-risk situations, such as a politically exposed person, a high-risk jurisdiction or an opaque structure",
      "Only where cash exceeds a threshold",
      "Only for existing clients",
    ],
    1,
    "In HIGHER-RISK situations. It involves additional information and verification, senior approval and closer monitoring, including the source of funds and wealth."),

  q2("LWGK-32-08", "LWG-32", "H", "medium",
    "A business relies on another regulated firm's customer due diligence. Who remains responsible for compliance?",
    ["The firm relied upon", "The relying business", "Both equally", "Neither, once reliance is documented"],
    1,
    "The RELYING BUSINESS remains responsible, and must be able to obtain the underlying information on request. Reliance is permitted in defined circumstances but does not transfer responsibility."),

  q1("LWGK-32-09", "LWG-32", "H", "medium",
    "Which is one of the required elements of a regulated business's anti-money-laundering arrangements?",
    ["A minimum capital requirement", "Risk management practices", "An external audit of every client", "Insurance against client fraud"],
    1,
    "RISK MANAGEMENT PRACTICES — a documented risk-based assessment — alongside internal controls, customer due diligence, reliance and record keeping, and monitoring with training and internal communication."),

  multi2("LWGK-32-10", "LWG-32", "H", "hard",
    "Which TWO are money laundering offences?",
    [
      "Concealing, disguising or converting criminal property",
      "Failing to make a profit for a client",
      "Becoming concerned in an arrangement facilitating another's retention of criminal property",
      "Charging an excessive fee",
    ],
    [0, 2],
    "CONCEALING and ARRANGING are both principal offences, along with acquisition, use or possession, failure to disclose and tipping off. Commercial matters such as fees and returns are not money laundering offences."),
]

/* ── Chapter 33 · Bribery, fraudulent and wrongful trading ─────── */

const CH33: AccaQuestion[] = [
  q1("LWGK-33-01", "LWG-33", "H", "easy",
    "What is the defence to the corporate offence of failing to prevent bribery?",
    ["That the board did not know", "That the organisation had adequate procedures in place", "That no contract was won", "That the briber was an agent, not an employee"],
    1,
    "ADEQUATE PROCEDURES. Board ignorance is not a defence, an associated person includes agents as well as employees, and the intention to obtain business is enough whether or not it was won."),

  q1("LWGK-33-02", "LWG-33", "H", "easy",
    "Which requires DISHONESTY?",
    ["Wrongful trading", "Fraudulent trading", "Both", "Neither"],
    1,
    "FRAUDULENT TRADING requires intent to defraud, so honesty is a defence to it. WRONGFUL TRADING requires no dishonesty and applies an objective test, which is why it is the claim that actually bites."),

  q1("LWGK-33-03", "LWG-33", "H", "medium",
    "What is a \"relevant body\" for the failure to prevent the facilitation of tax evasion?",
    ["Any individual", "A body corporate or a partnership", "A listed company only", "A regulated firm only"],
    1,
    "A BODY CORPORATE OR A PARTNERSHIP — not an individual. The defence is having had reasonable prevention procedures in place."),

  q1("LWGK-33-04", "LWG-33", "H", "medium",
    "Who is an \"associated person\" for the corporate bribery offence?",
    ["Employees only", "Anyone performing services for the organisation, including agents and subsidiaries", "Directors only", "Only persons in the same jurisdiction"],
    1,
    "ANYONE PERFORMING SERVICES for the organisation — employees, agents, subsidiaries, intermediaries. Limiting it to employees is the standard error."),

  q2("LWGK-33-05", "LWG-33", "H", "hard",
    "Directors continue trading in the honest but mistaken belief the company will recover, incurring further credit before insolvent liquidation. Which claim is realistic?",
    [
      "Fraudulent trading, because creditors lost money",
      "Wrongful trading, which requires no dishonesty — only that they knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation",
      "Neither, as they were honest",
      "Both, automatically",
    ],
    1,
    "WRONGFUL TRADING. It applies an OBJECTIVE test and needs no dishonesty, so honest optimism is no defence to it — though honesty does defeat a fraudulent trading claim."),

  q2("LWGK-33-06", "LWG-33", "H", "hard",
    "A non-executive director received the management accounts showing insolvency and said nothing while the company traded on. Is she exposed to wrongful trading?",
    [
      "No, non-executives owe no such duty",
      "Yes — a non-executive is a director, and passivity is not a defence",
      "No, unless she was paid a fee",
      "Only if she was also a shareholder",
    ],
    1,
    "YES. A NON-EXECUTIVE is a director for this purpose, as are de facto and shadow directors. The objective test asks what a director in that role ought to have concluded, so passivity does not discharge the duty."),

  q2("LWGK-33-07", "LWG-33", "H", "medium",
    "What is the defence to a wrongful trading claim?",
    [
      "That the director acted honestly",
      "That the director took every step they ought to have taken to minimise the potential loss to creditors",
      "That the company's accounts were audited",
      "That other directors overruled them",
    ],
    1,
    "Taking EVERY STEP to minimise the potential loss to creditors once the conclusion was or should have been reached — taking advice, ceasing to incur credit, documenting decisions, considering administration. Honesty is a defence to fraudulent trading, not this."),

  q2("LWGK-33-08", "LWG-33", "H", "hard",
    "An insolvent company repays a loan its own director had made, while trade creditors go unpaid. What is the significance?",
    [
      "None, the director was a genuine creditor",
      "It may be an attackable preference and is strong evidence against the directors on a wrongful trading claim",
      "It reduces the company's deficiency",
      "It is a lawful distribution",
    ],
    1,
    "It may be an attackable PREFERENCE, and it is powerful evidence on the wrongful trading claim. Preferring a connected creditor is one of the clearest indicators that the directors were not minimising loss to creditors as a whole."),

  q1("LWGK-33-09", "LWG-33", "H", "medium",
    "Who may be liable for fraudulent trading?",
    ["Directors only", "Any person knowingly party to the carrying on of the business with intent to defraud", "Shareholders only", "The auditor"],
    1,
    "ANY PERSON KNOWINGLY PARTY to it — wider than wrongful trading, which applies to directors. Fraudulent trading is also a criminal offence as well as a civil liability."),

  multi2("LWGK-33-10", "LWG-33", "H", "hard",
    "Which TWO are consequences of a finding of wrongful trading?",
    [
      "An order to contribute to the company's assets",
      "Imprisonment",
      "Disqualification from acting as a director",
      "Cancellation of the director's shares",
    ],
    [0, 2],
    "A CONTRIBUTION to the assets and DISQUALIFICATION. Wrongful trading is civil only — imprisonment attaches to FRAUDULENT trading, which is also a criminal offence — and shares are not cancelled."),
]

/** LW-Global's authored question kit for Areas E to H — chapters 22 to 33. */
export const LWG_KIT_EFGH: AccaQuestion[] = [
  ...CH22,
  ...CH23,
  ...CH24,
  ...CH25,
  ...CH26,
  ...CH27,
  ...CH28,
  ...CH29,
  ...CH30,
  ...CH31,
  ...CH32,
  ...CH33,
]
