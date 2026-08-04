import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lw-kit-builders"

/*
 * LW-ENG · Area D question kit — chapters 28 to 33.
 *
 * Agency, partnerships under the Partnership Act 1890, limited partnerships and LLPs,
 * corporate personality and lifting the veil, promoters and pre-incorporation
 * contracts, and registration, the constitution and company names under CA 2006.
 *
 * Authored, applied, exam-standard, at the real Section A mark values (1 and 2).
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 28 · Agency ────────────────────────────────────────── */

const CH28: AccaQuestion[] = [
  q1("LWEK-28-01", "LWE-28", "D", "easy",
    "Which provision makes a partner an agent of the firm?",
    ["Section 1 Partnership Act 1890", "Section 5 Partnership Act 1890", "Section 9 Partnership Act 1890", "Section 17 Partnership Act 1890"],
    1,
    "SECTION 5, for the purposes of the partnership business. Section 1 defines a partnership, s.9 covers liability for debts, and s.17 the position of incoming and retiring partners."),

  q1("LWEK-28-02", "LWE-28", "D", "easy",
    "Where must the representation founding APPARENT authority come from?",
    ["The agent", "The principal", "The third party", "Either the agent or the principal"],
    1,
    "The PRINCIPAL — by appointing the agent to a position, acquiescing in past conduct, or saying so expressly. An agent can never create its own apparent authority."),

  q2("LWEK-28-03", "LWE-28", "D", "medium",
    "A board knowingly allows a director to act as though he were managing director for two years. He then signs a contract beyond his actual authority. Is the company bound?",
    [
      "No, his actual authority was exceeded",
      "Yes — the board's acquiescence is a representation creating apparent authority, relied on by the third party",
      "No, unless the articles permitted the appointment",
      "Yes, because he told the third party he had authority",
    ],
    1,
    "YES, on APPARENT AUTHORITY. The board's knowing acquiescence is a HOLDING OUT BY THE PRINCIPAL. His own assertion of authority counts for nothing, and an internal limit in the articles does not affect a good-faith third party without notice."),

  q2("LWEK-28-04", "LWE-28", "D", "medium",
    "Which condition for ratification does a company forming after the contract fail?",
    [
      "That the agent purported to act for the principal",
      "That the principal existed and was ascertainable at the time of the act",
      "That the principal ratifies with full knowledge of the facts",
      "That the third party has not withdrawn",
    ],
    1,
    "That the principal EXISTED at the time of the act. A company cannot ratify a pre-incorporation contract because it did not yet exist — which is why s.51 CA 2006 makes the person who acted personally liable (chapter 32)."),

  q2("LWEK-28-05", "LWE-28", "D", "medium",
    "An agent takes a £6,000 bribe from the third party to secure a contract. What can the principal do?",
    [
      "Recover the £6,000 from the agent only",
      "Recover the bribe, dismiss the agent, sue for breach of fiduciary duty, and rescind the contract against the third party who paid it",
      "Nothing, the contract having been performed",
      "Only terminate the agency prospectively",
    ],
    1,
    "All of those. A bribe is a breach of FIDUCIARY duty, so the principal recovers it and may dismiss and sue — and critically may also RESCIND the contract against the third party WHO PAID the bribe. That last point often reverses what apparent authority would otherwise have achieved."),

  q2("LWEK-28-06", "LWE-28", "D", "hard",
    "An agent acts outside its authority for a disclosed principal that does not ratify. Who is liable to the third party?",
    [
      "The principal, since it appointed the agent",
      "The agent, for breach of warranty of authority",
      "Neither, the contract being void",
      "Both jointly and severally",
    ],
    1,
    "The AGENT, for BREACH OF WARRANTY OF AUTHORITY. The principal is not bound where the agent exceeded authority and it does not ratify, and apparent authority does not arise on these facts."),
]

/* ── Chapter 29 · Partnerships ──────────────────────────────────── */

const CH29: AccaQuestion[] = [
  q1("LWEK-29-01", "LWE-29", "D", "easy",
    "What formality is required to create a partnership?",
    ["A written agreement", "Registration with the registrar", "None at all", "A deed"],
    2,
    "NONE. A partnership is the relation between persons carrying on a business in common with a view of profit, and it can arise purely from conduct. A written agreement's function is to displace the 1890 Act's default rules."),

  q1("LWEK-29-02", "LWE-29", "D", "easy",
    "Is an incoming partner liable for debts incurred before joining?",
    ["Yes, in all cases", "No, unless they agree to assume them", "Yes, but only up to their capital", "Only after two years"],
    1,
    "NO, unless they agree to assume them — s.17(1). A RETIRING partner, by contrast, remains liable for debts incurred while a partner under s.17(2)."),

  q2("LWEK-29-03", "LWE-29", "D", "medium",
    "Two people jointly own a building and divide the rent equally. Are they partners?",
    [
      "Yes, they share the receipts",
      "No — joint ownership and sharing gross returns do not of themselves create a partnership",
      "Yes, provided the arrangement is in writing",
      "Only if they intended to be partners",
    ],
    1,
    "NO. Section 2 expressly provides that joint ownership and the sharing of GROSS RETURNS do not of themselves create a partnership. Section 1(1) requires a BUSINESS carried on IN COMMON with a VIEW OF PROFIT."),

  q2("LWEK-29-04", "LWE-29", "D", "medium",
    "A partner accepts a commission in the usual way of the firm's business, contrary to an internal agreement requiring unanimous consent. The client knew nothing of the restriction. Is the firm bound?",
    [
      "No, the partner lacked actual authority",
      "Yes — under s.5 an act in the usual way of business binds the firm where the third party knew nothing of the restriction",
      "No, unless the other partners ratify",
      "Yes, but only to the extent of that partner's share",
    ],
    1,
    "YES. Under SECTION 5 an act in the USUAL WAY of the firm's business binds it, and the firm escapes only where the partner lacked authority AND the third party knew that or did not believe them a partner. Neither applies here."),

  q2("LWEK-29-05", "LWE-29", "D", "medium",
    "A retiring partner places a notice in the London Gazette but does not write to existing customers. What is the position?",
    [
      "Fully protected against everyone",
      "Still apparently liable to existing customers, who were entitled to actual notice",
      "Protected, retirement itself ending all liability",
      "Liable only for debts incurred after retirement",
    ],
    1,
    "STILL LIABLE to EXISTING customers. Two notices are needed: ACTUAL notice to those who previously dealt with the firm, and a GAZETTE notice against NEW customers. Separately, s.17(2) keeps them liable for debts incurred while a partner."),

  q2("LWEK-29-06", "LWE-29", "D", "medium",
    "On dissolution, in what order are the firm's assets applied?",
    [
      "Partners' capital, partners' advances, outside creditors, surplus",
      "Outside creditors, partners' advances, partners' capital, surplus",
      "Outside creditors, partners' capital, partners' advances, surplus",
      "Equally between creditors and partners",
    ],
    1,
    "Section 44 order: OUTSIDE CREDITORS, then partners' ADVANCES or loans, then partners' CAPITAL, then any SURPLUS in the profit-sharing ratio. A deficiency is borne in the same ratio, and because liability is unlimited the partners must make it good personally."),

  q2("LWEK-29-07", "LWE-29", "D", "hard",
    "Two partners in a small firm have become wholly unable to work together, though the firm is solvent. On what ground may the court dissolve it?",
    ["Illegality", "That it is just and equitable to wind it up", "Notice by any partner", "Bankruptcy of a partner"],
    1,
    "That it is JUST AND EQUITABLE, a s.35 ground — the reasoning in Re Yenidje Tobacco. Solvency is no obstacle. Notice would work only in a partnership at will, and neither illegality nor bankruptcy is in issue."),
]

/* ── Chapter 30 · Limited partnerships and LLPs ─────────────────── */

const CH30: AccaQuestion[] = [
  q1("LWEK-30-01", "LWE-30", "D", "easy",
    "Which partnership form has separate legal personality?",
    ["A general partnership", "A limited partnership", "An LLP", "All three"],
    2,
    "Only the LLP, which is a BODY CORPORATE. Neither a general nor a limited partnership is a person distinct from its partners."),

  q1("LWEK-30-02", "LWE-30", "D", "easy",
    "How are LLP members taxed?",
    ["Through corporation tax on the LLP", "As partners on their share of profits", "As employees under PAYE", "They are exempt"],
    1,
    "AS PARTNERS on their share of profits, not through corporation tax on the entity — one of the LLP's attractions over a company for a professional practice."),

  q2("LWEK-30-03", "LWE-30", "D", "medium",
    "A limited partner begins attending management meetings and signing contracts. What is the consequence?",
    [
      "Nothing, liability having been fixed on registration",
      "They become liable as a general partner for the debts incurred while participating in management",
      "The partnership is automatically dissolved",
      "They must be re-registered before any liability arises",
    ],
    1,
    "They become LIABLE AS A GENERAL PARTNER for the debts incurred while managing. The 1907 Act conditions the protection on remaining PASSIVE — they may inspect the books and advise, but managing or binding the firm forfeits the limitation."),

  q2("LWEK-30-04", "LWE-30", "D", "medium",
    "Which vehicle gives every member limited liability while allowing all of them to manage?",
    ["A general partnership", "An LLP", "A limited partnership", "None — management always requires unlimited liability"],
    1,
    "An LLP. A limited partnership protects only PASSIVE limited partners and needs at least one general partner with unlimited liability; a general partnership gives no protection at all."),

  q2("LWEK-30-05", "LWE-30", "D", "medium",
    "What is the price of an LLP's limited liability?",
    [
      "Corporation tax on its profits",
      "Public filing of accounts, a confirmation statement, registrable charges, and exposure to the insolvency clawback regime",
      "A minimum capital requirement",
      "Loss of the right to agree unequal profit shares",
    ],
    1,
    "PUBLIC DISCLOSURE and regulation — accounts on the record, a confirmation statement, registrable charges, and the insolvency provisions including wrongful trading. Members are taxed as partners, there is no share capital, and profit shares may be agreed freely."),

  q2("LWEK-30-06", "LWE-30", "D", "hard",
    "Four professionals want limited liability, the right for all to manage, unequal profit shares, and confidentiality about their results. What should they be advised?",
    [
      "A general partnership satisfies everything",
      "An LLP satisfies all but confidentiality, which is incompatible with limited liability",
      "A limited partnership satisfies everything",
      "A company satisfies everything",
    ],
    1,
    "An LLP meets the liability, management and profit-share requirements, but CONFIDENTIALITY cannot be satisfied alongside limited liability — accounts go on the public record. Saying so is part of the answer. A limited partnership fails because those who manage cannot be protected."),
]

/* ── Chapter 31 · Corporate personality and the veil ────────────── */

const CH31: AccaQuestion[] = [
  q1("LWEK-31-01", "LWE-31", "D", "easy",
    "What is the minimum nominal share capital for a public company, and how much must be paid up?",
    ["£50,000, a quarter paid up", "£50,000, fully paid up", "£100,000, a half paid up", "None prescribed"],
    0,
    "£50,000 nominal, with at least a QUARTER paid up plus any premium. A plc also needs a TRADING CERTIFICATE before it may trade."),

  q1("LWEK-31-02", "LWE-31", "D", "easy",
    "\"Limited liability\" limits the liability of:",
    ["The company", "The members", "The directors", "The company's creditors"],
    1,
    "The MEMBERS, to the amount unpaid on their shares. The COMPANY remains liable for its debts in full and to the last of its assets."),

  q2("LWEK-31-03", "LWE-31", "D", "medium",
    "A sole shareholder and director insures the company's machinery in his own name. It is destroyed. Can he claim?",
    [
      "Yes, he owns the whole company",
      "No — the machinery belongs to the company, a separate legal person, so he has no insurable interest",
      "Yes, up to the value of his shareholding",
      "Only if the company is private",
    ],
    1,
    "NO. On SALOMON the company is a SEPARATE LEGAL PERSON and the machinery is its property. He owns SHARES, not assets. The same separation is what protects his personal assets from the company's creditors."),

  q2("LWEK-31-04", "LWE-31", "D", "medium",
    "A parent runs its subsidiaries as a single commercial enterprise. A subsidiary cannot pay its creditors. Is the parent liable?",
    [
      "Yes, the group being in substance one economic unit",
      "No — Adams v Cape rejects the single economic unit argument; each company remains a separate legal person",
      "Yes, a parent always guaranteeing its subsidiaries",
      "Only if the parent holds all the shares",
    ],
    1,
    "NO. ADAMS v CAPE rejected the single economic unit argument: control alone does not make a parent liable for a subsidiary's debts. Liability would need a guarantee, an assumed direct duty, or the narrow Prest evasion principle."),

  q2("LWEK-31-05", "LWE-31", "D", "medium",
    "A person bound by a valid restraint of trade covenant incorporates a company and competes through it. What is the position?",
    [
      "The company is a separate person, so the covenant is not breached",
      "The veil is lifted — a company used to evade an existing legal obligation is a façade",
      "The covenant becomes void",
      "Only damages are available, not an injunction",
    ],
    1,
    "The VEIL IS LIFTED. This is Gilford Motor v Horne, and on the PREST evasion principle a company interposed to frustrate an EXISTING liability is the paradigm case. An injunction will bind both the individual and the company."),

  multi2("LWEK-31-06", "LWE-31", "D", "hard",
    "Which TWO are STATUTORY grounds for reaching an individual behind a company?",
    [
      "Wrongful trading under s.214 IA 1986",
      "Acting as a director while disqualified",
      "The single economic unit argument",
      "The company being wholly owned by one person",
    ],
    [0, 1],
    "WRONGFUL TRADING and ACTING WHILE DISQUALIFIED both impose personal liability by STATUTE, so no common law piercing is needed. The single economic unit argument fails on Adams v Cape, and sole ownership is exactly what Salomon held to be irrelevant."),
]

/* ── Chapter 32 · Promoters and pre-incorporation contracts ─────── */

const CH32: AccaQuestion[] = [
  q1("LWEK-32-01", "LWE-32", "D", "easy",
    "Who is a promoter?",
    [
      "Anyone who takes steps to form a company and set it going",
      "Only a person named as such in the articles",
      "The company's first director",
      "A solicitor instructed to incorporate the company",
    ],
    0,
    "Anyone who TAKES STEPS to form a company and set it going — a question of FACT, not title. Someone acting purely in a PROFESSIONAL capacity on instructions is not a promoter."),

  q1("LWEK-32-02", "LWE-32", "D", "easy",
    "Can a company ratify a pre-incorporation contract?",
    ["Yes, by board resolution", "Yes, by ordinary resolution of the members", "No, it did not exist when the contract was made", "Yes, within six months of incorporation"],
    2,
    "NO. Ratification requires the principal to have EXISTED when the act was done. The routes are NOVATION or a NEW contract, both needing the third party's agreement."),

  q2("LWEK-32-03", "LWE-32", "D", "medium",
    "A promoter signs a contract for a company before incorporation. After incorporation the board resolves to ratify it. Who is liable?",
    [
      "The company, the board having ratified",
      "The promoter personally under s.51 CA 2006 — a company cannot ratify a pre-incorporation contract",
      "Neither, the contract being void",
      "Both jointly, once ratification takes place",
    ],
    1,
    "The PROMOTER PERSONALLY under s.51. The board's resolution is a NULLITY because a company cannot ratify what predates it. Transferring the contract needs a NOVATION or a NEW contract, and both need the third party's consent."),

  q2("LWEK-32-04", "LWE-32", "D", "medium",
    "A pre-incorporation contract expressly states the promoter shall have no personal liability. What follows?",
    [
      "The promoter is liable anyway, s.51 being mandatory",
      "The promoter escapes liability — but the company cannot be liable either, so the third party has nobody effective to sue",
      "The company automatically becomes liable on incorporation",
      "The contract is void",
    ],
    1,
    "The promoter ESCAPES, because s.51 applies \"subject to any agreement to the contrary\". But the COMPANY still cannot ratify, so the third party has contracted with nobody it can effectively sue — which is why third parties usually resist such clauses."),

  q2("LWEK-32-05", "LWE-32", "D", "medium",
    "A promoter sells his own land to the company he is forming at twice what he paid, without disclosure. What can the company do?",
    [
      "Nothing, a promoter being entitled to profit",
      "Rescind the contract, recover the secret profit, and claim damages for breach of fiduciary duty",
      "Claim damages only, the contract being valid",
      "Nothing until he becomes a director",
    ],
    1,
    "RESCIND and RECOVER THE SECRET PROFIT, with damages. The wrong is the CONCEALMENT, not the profit — full disclosure to an independent board or to the members, with approval, would have made the same profit legitimate."),

  q2("LWEK-32-06", "LWE-32", "D", "hard",
    "Which route transfers a pre-incorporation contract to the company WITHOUT needing the third party's agreement?",
    ["Novation", "A new contract on the same terms", "Ratification by the board", "None of them"],
    3,
    "NONE. Ratification is impossible, and both novation and a new contract require the THIRD PARTY'S CONSENT. That is why the promoter cannot escape unilaterally, and why the practical advice is to wait for incorporation or buy an off-the-shelf company."),
]

/* ── Chapter 33 · Registration, constitution and names ─────────── */

const CH33: AccaQuestion[] = [
  q1("LWEK-33-01", "LWE-33", "D", "easy",
    "What does the certificate of incorporation prove?",
    [
      "That the company is solvent",
      "Conclusive evidence that the registration requirements were met and the company is duly registered",
      "That the company may trade immediately, whatever its type",
      "That the articles are valid",
    ],
    1,
    "CONCLUSIVE EVIDENCE of due registration, so the company's existence cannot afterwards be challenged for a defect in formality. Note a plc still needs a separate TRADING CERTIFICATE before trading."),

  q1("LWEK-33-02", "LWE-33", "D", "easy",
    "How are the articles altered?",
    ["By ordinary resolution", "By special resolution, filed within 15 days", "By board resolution", "By unanimous written agreement only"],
    1,
    "By SPECIAL RESOLUTION — not less than 75% — with the amended articles and the resolution filed within 15 DAYS."),

  q1("LWEK-33-03", "LWE-33", "D", "medium",
    "Which register makes a company's ultimate ownership visible?",
    ["The register of members", "The register of directors", "The PSC register", "The register of charges"],
    2,
    "The register of PEOPLE WITH SIGNIFICANT CONTROL. The register of members shows the legal holders, which may be nominees rather than the ultimate controllers."),

  q2("LWEK-33-04", "LWE-33", "D", "medium",
    "The articles provide that a named member shall be the company's solicitor for life. The company dismisses him. Can he enforce the provision?",
    [
      "Yes, the articles bind the company under s.33",
      "No — s.33 makes the articles enforceable only as to membership rights, and this is an outsider capacity",
      "Yes, provided he is still a member",
      "Only if the provision was entrenched",
    ],
    1,
    "NO. The s.33 statutory contract binds only in respect of MEMBERSHIP rights. Acting as the company's solicitor is an OUTSIDER capacity, so the provision is unenforceable however clearly stated — and remaining a member does not change that."),

  q2("LWEK-33-05", "LWE-33", "D", "medium",
    "An entrenched article requires the consent of all members to alter it. Three of five members pass a special resolution altering it. Is the alteration effective?",
    [
      "Yes, a special resolution always suffices",
      "No — the entrenchment condition was not satisfied",
      "Yes, entrenchment being void",
      "Only if filed within 15 days",
    ],
    1,
    "NO. ENTRENCHMENT requires the additional condition or greater majority to be met, so a special resolution of three of five does not do it. Entrenchment can still be overcome by UNANIMOUS agreement of all members, or by court order."),

  q2("LWEK-33-06", "LWE-33", "D", "medium",
    "A company promised a member in a separate agreement not to alter its articles, then altered them. What is the position?",
    [
      "The alteration is invalid",
      "The alteration stands, and the member's remedy is damages for breach of that agreement",
      "The agreement overrides the statutory power",
      "The member may have the alteration set aside within 21 days",
    ],
    1,
    "The ALTERATION STANDS. A company cannot contract away the statutory power to alter its articles; the member gets DAMAGES for breach of the separate agreement. Distinguishing \"invalid\" from \"valid but actionable\" is the point being tested."),

  q2("LWEK-33-07", "LWE-33", "D", "hard",
    "A competitor's name was accepted by Companies House but trades off an established business's goodwill. What routes are open to the established business?",
    [
      "None — registration authorises use of the name",
      "A s.67 direction from the registrar, an application to the company names adjudicator, and a claim in passing off",
      "Only a claim for trade mark infringement",
      "Only an application to strike the company off",
    ],
    1,
    "All three: a REGISTRAR'S DIRECTION under s.67 where the name is the same as or too like an existing one, an application to the COMPANY NAMES ADJUDICATOR where the registration was opportunistic, and PASSING OFF at common law. Registration authorises nothing."),
]

export const LWE_KIT_AREA_D: AccaQuestion[] = [
  ...CH28,
  ...CH29,
  ...CH30,
  ...CH31,
  ...CH32,
  ...CH33,
]
