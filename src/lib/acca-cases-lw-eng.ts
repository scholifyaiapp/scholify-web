import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * LW-ENG · Section B multi-task questions (MTQs) — the real exam format.
 *
 * LW's Section B is FIVE multi-task questions of SIX marks each, so a sitting takes
 * five units and three disjoint sittings need FIFTEEN. Each unit below is one scenario
 * with three linked 2-mark tasks.
 *
 * ── Ordering ────────────────────────────────────────────────────
 * The mock composer rotates the case list by a whole sitting's worth per form, so form
 * 1 draws units 1–5, form 2 draws 6–10 and form 3 draws 11–15. The units are grouped so
 * that each BLOCK OF FIVE spans a spread of syllabus areas rather than clustering — a
 * learner sitting any one form meets obligations, employment, company and insolvency or
 * criminal material, as the real paper does:
 *
 *   Form 1 · units 1–5    B, C, D, E, H
 *   Form 2 · units 6–10   A, B, D, F, G
 *   Form 3 · units 11–15  B, C, E, F, H
 *
 * Area B appears in every block deliberately: the law of obligations carries more of the
 * ENG syllabus than any other area, and it is the one a sitting is most likely to test.
 *
 * ── Why these are not the Global cases ──────────────────────────
 * Global's Section B units examine the CISG, Incoterms and payment mechanisms. None of
 * that is on the ENG syllabus, and ENG's obligations and employment material is not on
 * Global's — so the two variants need separate case banks, not a shared one.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/** A two-mark task within an MTQ. */
function task(
  caseId: string,
  n: number,
  area: string,
  chapter: string,
  difficulty: AccaQuestion["difficulty"],
  stem: string,
  options: string[],
  correct: number,
  explanation: string,
): AccaQuestion {
  return {
    id: `${caseId}-t${n}`,
    paper: "LW",
    area,
    chapter,
    type: "mcq",
    stem,
    options,
    correct,
    explanation,
    marks: 2,
    difficulty,
  }
}

/* ── Form 1 block · units 1–5 ───────────────────────────────────── */

const MTQ_01: OtCase = {
  id: "lwe-mtq-01",
  paper: "LW",
  area: "B",
  title: "Larkfield Tools — the offer that never was",
  scenario:
    "Larkfield Tools advertised bench grinders in a trade magazine at £180 each. Ostrey Ltd emailed asking the best price for ten units. Larkfield replied, \"The lowest we could do on ten is £1,600.\" Ostrey emailed back, \"Agreed — send ten at £1,600.\" Larkfield had meanwhile sold its remaining stock and refused to supply. Separately, Larkfield's website promises \"£50 to any customer who refers a business that places an order over £1,000\". Bewick made such a referral, the referred customer ordered £3,000 of goods, and Larkfield now says it withdrew the scheme last month.",
  questions: [
    task("lwe-mtq-01", 1, "B", "LWE-08", "medium",
      "What is the status of Larkfield's reply about the lowest price?",
      [
        "An offer capable of acceptance",
        "A mere supply of information, so Ostrey's reply is itself the offer",
        "A counter-offer destroying Ostrey's enquiry",
        "An invitation to treat inviting a formal tender",
      ],
      1,
      "A MERE SUPPLY OF INFORMATION. Stating the lowest price one would accept lacks the language of commitment, so it is not an offer. Ostrey's \"send ten at £1,600\" is therefore the OFFER, and it was never accepted."),
    task("lwe-mtq-01", 2, "B", "LWE-08", "medium",
      "Is Larkfield bound to supply Ostrey?",
      [
        "Yes, a contract formed when Ostrey agreed the price",
        "No — no offer was ever accepted, so no contract exists",
        "Yes, because the magazine advertisement was an offer",
        "No, but Larkfield must pay damages for the wasted enquiry",
      ],
      1,
      "NO CONTRACT. The advertisement was an invitation to treat, the price reply was information, and Ostrey's own offer was never accepted. There is nothing to enforce and no liability for refusing to contract."),
    task("lwe-mtq-01", 3, "B", "LWE-08", "hard",
      "Must Larkfield pay Bewick the £50?",
      [
        "No, the scheme was an invitation to treat",
        "Yes — it was a unilateral offer accepted by performance, and it cannot be revoked once performance has begun",
        "No, because Bewick never communicated an acceptance",
        "Only if Bewick can show the referral was the decisive factor",
      ],
      1,
      "YES. A promise of payment on performance of a specified act is a UNILATERAL OFFER to the world, accepted BY PERFORMANCE with no separate communication needed — and it cannot be revoked once performance has begun."),
  ],
}

const MTQ_02: OtCase = {
  id: "lwe-mtq-02",
  paper: "LW",
  area: "C",
  title: "Bramwell Interiors — the self-employed fitter",
  scenario:
    "Bramwell Interiors engaged Dacre under a written agreement describing him as a \"self-employed fitter\" and permitting him to send a substitute. In practice Dacre worked 8am to 5pm Monday to Friday at sites Bramwell allocated, used Bramwell's van and power tools, was paid £2,100 monthly whatever the workload, was once expressly refused permission to send a substitute, took holiday only when Bramwell approved, and worked for nobody else. After three years Bramwell dismissed him without notice, saying he cannot claim unfair dismissal because he was self-employed. His contract was silent on notice.",
  questions: [
    task("lwe-mtq-02", 1, "C", "LWE-23", "medium",
      "What is Dacre's employment status?",
      [
        "Self-employed, the written agreement governing",
        "An employee — the substance of the relationship contradicts the label, and the substitution right was not genuine",
        "A worker, but not an employee",
        "Self-employed, because a substitution clause is conclusive",
      ],
      1,
      "An EMPLOYEE. Status turns on the SUBSTANCE as performed, and a substitution right that was REFUSED in practice is not genuine. Mutuality, personal service and control are all present, and every economic-reality factor points the same way."),
    task("lwe-mtq-02", 2, "C", "LWE-26", "medium",
      "Can Dacre claim unfair dismissal?",
      [
        "No, he lacks two years' continuous service",
        "Yes — he is an employee with three years' service, so he exceeds the qualifying period",
        "No, unfair dismissal applying only to written contracts",
        "Only if he first establishes a wrongful dismissal claim",
      ],
      1,
      "YES. He is an employee with THREE YEARS' service, comfortably over the two-year qualifying period, and must claim within three months less one day after ACAS early conciliation."),
    task("lwe-mtq-02", 3, "C", "LWE-25", "hard",
      "What notice was Dacre entitled to, and what else follows?",
      [
        "None, the contract being silent",
        "Three weeks' statutory minimum notice, so the dismissal is also wrongful",
        "Twelve weeks, the statutory maximum",
        "Three months, as a reasonable period",
      ],
      1,
      "THREE WEEKS — one week per complete year between two and twelve years' service, the contract being silent so the statutory minimum applies. Dismissing without it is also WRONGFUL DISMISSAL, giving damages for the notice pay on top of the unfair dismissal claim."),
  ],
}

const MTQ_03: OtCase = {
  id: "lwe-mtq-03",
  paper: "LW",
  area: "D",
  title: "Averton Interiors — three contracts before incorporation",
  scenario:
    "Averton was forming Averton Interiors Ltd. Before incorporation she signed three agreements \"for and on behalf of Averton Interiors Ltd (in formation)\": a £40,000 fabric order from Bellhouse Ltd; a two-year office lease from Cotterill Estates, which contained a clause stating that Averton shall have no personal liability under it; and a £9,000 website contract with Dunmere Ltd. The company was incorporated three weeks later and its board resolved to \"ratify all pre-incorporation contracts\". The company then failed to pay Bellhouse and Dunmere. Dunmere refuses to deal with the company and wants to sue Averton.",
  questions: [
    task("lwe-mtq-03", 1, "D", "LWE-32", "medium",
      "What is the effect of the board's resolution to ratify?",
      [
        "It makes the company liable on all three contracts",
        "None — a company cannot ratify a pre-incorporation contract, having had no existence at the moment of contracting",
        "It makes the company liable jointly with Averton",
        "It transfers the contracts subject to the third parties' consent",
      ],
      1,
      "NONE. A company CANNOT RATIFY a pre-incorporation contract, because ratification requires the principal to have EXISTED when the act was done. The resolution is a nullity, however commercially sensible it looked."),
    task("lwe-mtq-03", 2, "D", "LWE-32", "medium",
      "Who is liable to Bellhouse and Dunmere?",
      [
        "The company, having adopted the contracts",
        "Averton personally under s.51 CA 2006",
        "Nobody, the contracts being void",
        "Averton and the company jointly",
      ],
      1,
      "AVERTON PERSONALLY under s.51 CA 2006, which makes the contract take effect as one made with the person who purported to act. Note the reciprocity — she may also SUE on those contracts."),
    task("lwe-mtq-03", 3, "D", "LWE-32", "hard",
      "What is the position on the Cotterill lease?",
      [
        "Averton is liable, s.51 being mandatory",
        "Averton escapes liability under the agreement to the contrary, but the company cannot be liable either — so Cotterill has nobody effective to sue",
        "The company is liable, the clause transferring the obligation",
        "The lease is void for want of a contracting party",
      ],
      1,
      "Averton ESCAPES, because s.51 applies \"subject to any agreement to the contrary\". But the company still cannot ratify, so COTTERILL HAS NOBODY EFFECTIVE TO SUE — which is precisely why third parties normally resist such clauses."),
  ],
}

const MTQ_04: OtCase = {
  id: "lwe-mtq-04",
  paper: "LW",
  area: "E",
  title: "Ardenshaw plc — the dividend that cannot be paid",
  scenario:
    "Ardenshaw plc has called-up share capital of £2,000,000, a share premium account of £400,000, a revaluation reserve of £250,000 representing an unrealised uplift on its freehold, accumulated realised profits of £760,000 and accumulated realised losses brought forward of £180,000. Its net assets are £2,900,000. The directors propose a final dividend of £600,000. A shareholder asks whether the revaluation surplus could be distributed instead, and what would happen if the dividend were paid and later found unlawful. The overstated profit figures came from accounts the auditors had negligently signed off.",
  questions: [
    task("lwe-mtq-04", 1, "E", "LWE-36", "medium",
      "What is Ardenshaw's distributable profits figure under s.830?",
      ["£760,000", "£580,000", "£830,000", "£1,010,000"],
      1,
      "£580,000 — accumulated realised profits of £760,000 LESS accumulated realised losses of £180,000. The test is CUMULATIVE, so brought-forward losses must be recovered first, and the revaluation surplus is unrealised and excluded."),
    task("lwe-mtq-04", 2, "E", "LWE-36", "hard",
      "What is the maximum LAWFUL dividend?",
      ["£580,000", "£250,000", "£600,000", "£830,000"],
      1,
      "£250,000. As a PUBLIC company Ardenshaw must also satisfy s.831: net assets must not fall below called-up capital plus undistributable reserves — £2,000,000 + £400,000 + £250,000 = £2,650,000. So £2,900,000 − £2,650,000 = £250,000, and the LOWER of the two tests governs."),
    task("lwe-mtq-04", 3, "E", "LWE-36", "medium",
      "If the £600,000 were paid, who would be liable?",
      [
        "The directors alone",
        "The directors for breach of duty, any member who knew or had reasonable grounds to believe it unlawful under s.847, and potentially the auditors to the company",
        "The members only",
        "Nobody, once the accounts have been approved",
      ],
      1,
      "All three. The DIRECTORS are liable for breach of duty and may be ordered to repay; a MEMBER who knew or had reasonable grounds to believe must repay under s.847; and the AUDITORS may be liable to the company for the negligent work that produced the overstated figures."),
  ],
}

const MTQ_05: OtCase = {
  id: "lwe-mtq-05",
  paper: "LW",
  area: "H",
  title: "Trensham & Co — the client the audit team cannot verify",
  scenario:
    "Trensham & Co audits Wilbury Ltd. The audit team notices eleven payments of £8,000 each received from an offshore company in a high-risk jurisdiction within one month, all described as \"consultancy\", with no supporting documents and no apparent commercial purpose. Wilbury's majority shareholder is a senior foreign government official. Asked for the paperwork, Wilbury's finance director says it is confidential, refuses to provide it, and warns that Trensham is bound by its duty of confidentiality. The engagement partner is minded to say nothing to avoid losing the client, and to raise the concern informally with the finance director.",
  questions: [
    task("lwe-mtq-05", 1, "H", "LWE-44", "medium",
      "What level of customer due diligence is required?",
      [
        "Simplified, the client being long-standing",
        "Enhanced — the beneficial owner is a politically exposed person and the transactions are unusual and from a high-risk jurisdiction",
        "Standard, no suspicion having been confirmed",
        "None, the audit not being a transaction",
      ],
      1,
      "ENHANCED. A POLITICALLY EXPOSED PERSON, a HIGH-RISK third country, and unusual transactions with no apparent economic purpose each require it — meaning additional information, additional verification and SENIOR MANAGEMENT APPROVAL."),
    task("lwe-mtq-05", 2, "H", "LWE-44", "medium",
      "What must Trensham do given Wilbury's refusal to co-operate?",
      [
        "Proceed, relying on the length of the relationship",
        "Not continue the transaction or relationship, consider terminating the engagement, and consider making a report",
        "Obtain written assurances from the finance director and proceed",
        "Qualify the audit report and take no further step",
      ],
      1,
      "NOT PROCEED. Where required due diligence CANNOT BE COMPLETED, the firm must not carry out the transaction or establish the relationship, must consider TERMINATING any existing one, and must CONSIDER REPORTING."),
    task("lwe-mtq-05", 3, "H", "LWE-44", "hard",
      "What is the position on the partner's two proposals?",
      [
        "Both are permissible commercial judgements",
        "Saying nothing is the failure-to-disclose offence, and raising it with the finance director would be tipping off",
        "Saying nothing is permissible; raising it with the client is required",
        "Both are matters of professional ethics only, not criminal law",
      ],
      1,
      "Both are CRIMINAL OFFENCES. Silence is FAILURE TO DISCLOSE — and the test is objective, so reasonable grounds to suspect suffice. Mentioning it to the finance director would be TIPPING OFF. The correct course is an internal report to the MLRO, and confidentiality is no defence."),
  ],
}

/* ── Form 2 block · units 6–10 ──────────────────────────────────── */

const MTQ_06: OtCase = {
  id: "lwe-mtq-06",
  paper: "LW",
  area: "A",
  title: "Kelbrook Hotels — the notice and the precedent",
  scenario:
    "In an earlier High Court case, a hotel was held liable for a guest's stolen property because a notice disclaiming liability was displayed only in the bedroom, after the contract had been made. The judge added that a notice at reception would have been effective. Kelbrook Hotels now faces a claim from a guest whose laptop was stolen. Kelbrook displayed its notice at the reception desk and the guest read it before signing the register. The claim is in the County Court. Kelbrook also argues that the earlier decision was reached without reference to a relevant statutory provision on hotel liability.",
  questions: [
    task("lwe-mtq-06", 1, "A", "LWE-03", "medium",
      "What is the status of the judge's remark about a notice at reception?",
      [
        "Ratio, and binding on the County Court",
        "Obiter, and therefore persuasive only",
        "Ratio, but only persuasive because the courts differ",
        "Of no legal significance",
      ],
      1,
      "OBITER. The earlier case was decided the other way, on the notice being displayed after contracting, so the remark was not necessary to the decision. It is persuasive only — though influential obiter is regularly adopted later as ratio."),
    task("lwe-mtq-06", 2, "A", "LWE-03", "medium",
      "What can the County Court legitimately do with the earlier High Court decision?",
      [
        "Overrule it, the facts being different",
        "Distinguish it on the material facts, or hold it per incuriam",
        "Reverse it on appeal",
        "Nothing — it must apply it and find Kelbrook liable",
      ],
      1,
      "DISTINGUISH it, the notice here having been given BEFORE contracting, or hold it PER INCURIAM if a relevant statute was genuinely overlooked. A lower court can never OVERRULE a higher one, and reversing applies only within the same case."),
    task("lwe-mtq-06", 3, "A", "LWE-03", "hard",
      "Kelbrook argues the earlier decision is not binding because it overlooked a relevant statute. What is that argument called, and can a County Court accept it?",
      [
        "Overruling, and only a higher court may do it",
        "Per incuriam, and a County Court may accept it — such a decision does not bind at all",
        "Reversing, and it requires an appeal in the same case",
        "Distinguishing, which needs the material facts to differ",
      ],
      1,
      "PER INCURIAM — decided in ignorance of a relevant statute or binding authority — and a County Court MAY accept it, because such a decision does not bind at all. It is one of the two routes open to a lower court, the other being to DISTINGUISH on the material facts. Overruling is closed to it and reversing applies only within the same case."),
  ],
}

const MTQ_07: OtCase = {
  id: "lwe-mtq-07",
  paper: "LW",
  area: "B",
  title: "Penrose Bakery — quantifying the claim",
  scenario:
    "Penrose Bakery ordered a replacement industrial oven from Ashfold Ltd for delivery on 1 March, telling Ashfold only that it was \"for the bakery\". Ashfold delivered on 22 March. Penrose claims £9,000 of ordinary profit lost on normal trade during the three weeks; £48,000 of profit lost on an exceptionally lucrative music-festival supply contract signed in January but never mentioned to Ashfold; £6,000 paid to hire a substitute oven for two of the three weeks; and £11,000 of further ordinary profit lost in the third week, when Penrose could have extended the substitute hire for another £2,000 but chose not to.",
  questions: [
    task("lwe-mtq-07", 1, "B", "LWE-17", "medium",
      "Is the £48,000 festival profit recoverable?",
      [
        "Yes, it was caused by the late delivery",
        "No — unusual loss requires the special circumstances to have been known to Ashfold when contracting",
        "Yes, if Ashfold could have guessed the oven was for a large order",
        "Only up to the value of the oven",
      ],
      1,
      "NO — TOO REMOTE. Ordinary loss falls within the first limb of Hadley v Baxendale, but unusual loss needs the SECOND: special circumstances KNOWN AT THE TIME OF CONTRACTING. Penrose said only that the oven was \"for the bakery\"."),
    task("lwe-mtq-07", 2, "B", "LWE-17", "medium",
      "What is recoverable in respect of the third week?",
      [
        "£11,000, the loss having been caused by the breach",
        "£2,000 — the avoidable loss is irrecoverable, but the cost of reasonable mitigation is",
        "Nothing, because Penrose failed to mitigate",
        "£13,000",
      ],
      1,
      "£2,000. Failure to MITIGATE bars the AVOIDABLE £11,000, but the cost of the reasonable mitigating step IS recoverable — so Penrose recovers what it should have spent, not what it allowed to happen."),
    task("lwe-mtq-07", 3, "B", "LWE-17", "hard",
      "What is the total recoverable?",
      ["£74,000", "£17,000", "£15,000", "£65,000"],
      1,
      "£17,000 — £9,000 ordinary lost profit, £6,000 of substitute hire as reasonable mitigation, and £2,000 for the extension Penrose should have taken. The £48,000 fails on REMOTENESS and the £11,000 on MITIGATION."),
  ],
}

const MTQ_08: OtCase = {
  id: "lwe-mtq-08",
  paper: "LW",
  area: "D",
  title: "Halloway, Prewitt and Sanderson — tracing partnership liability",
  scenario:
    "Halloway, Prewitt and Sanderson are partners in a firm of surveyors with no written agreement. In March the firm incurred a £90,000 debt to Coleford Ltd, a long-standing supplier. In May Sanderson retired; the firm placed a notice in the London Gazette but wrote to nobody. In June Prewitt, contrary to an oral agreement between the partners that no engagement over £20,000 be taken without unanimous consent, accepted a £70,000 survey commission from Newbold plc, a new client that knew nothing of the restriction. In July Trelow joined as a partner. In August the firm was dissolved with assets of £150,000 and debts of £260,000.",
  questions: [
    task("lwe-mtq-08", 1, "D", "LWE-29", "medium",
      "Is Sanderson liable for the £90,000 March debt?",
      [
        "No, he retired in May",
        "Yes — s.17(2) keeps a retiring partner liable for debts incurred while a partner",
        "No, the Gazette notice discharged him",
        "Only for one third of it",
      ],
      1,
      "YES, under s.17(2). Retirement does not discharge a partner from debts incurred WHILE a partner; only a novation with the creditors and continuing partners would. He is separately still exposed under s.36 to Coleford's later dealings, no ACTUAL notice having been given."),
    task("lwe-mtq-08", 2, "D", "LWE-29", "medium",
      "Is the firm bound by Prewitt's £70,000 commission?",
      [
        "No, he lacked authority under the partners' agreement",
        "Yes — accepting a survey commission is in the usual way of the firm's business and Newbold knew nothing of the restriction",
        "No, unless the other partners ratify it",
        "Only to the extent of Prewitt's share",
      ],
      1,
      "YES, under s.5. The act was in the USUAL WAY of a surveying firm's business, and the firm escapes only where the partner lacked authority AND the third party knew that or did not believe them a partner. Newbold knew nothing of the internal limit."),
    task("lwe-mtq-08", 3, "D", "LWE-29", "hard",
      "How is the £110,000 shortfall on dissolution borne?",
      [
        "Out of the partners' capital accounts only",
        "Personally by the partners, in equal shares, liability being unlimited and no agreement fixing shares",
        "By Trelow alone, as the incoming partner",
        "It is written off, the firm having no assets",
      ],
      1,
      "PERSONALLY AND EQUALLY. Section 44 pays outside CREDITORS first, so the £150,000 goes to them; the shortfall falls on the partners, whose liability is UNLIMITED, in the profit-sharing ratio — which with no written agreement is EQUAL regardless of contribution."),
  ],
}

const MTQ_09: OtCase = {
  id: "lwe-mtq-09",
  paper: "LW",
  area: "F",
  title: "Sedgemoor Ltd — the director who did rather well",
  scenario:
    "Orrell is a director of Sedgemoor Ltd and a qualified accountant. He learned through the company of a contract opportunity with a large retailer, formed his own company, and took the contract himself without telling the board. He also arranged for Sedgemoor to buy a warehouse from him for £480,000, mentioning at a board meeting only that he \"has an interest in the property\"; no members' resolution was taken. Sedgemoor also lent him £60,000 with no members' approval. Orrell never reads the monthly management accounts, and Sedgemoor paid a dividend on figures he never checked which turned out to be overstated.",
  questions: [
    task("lwe-mtq-09", 1, "F", "LWE-38", "medium",
      "Which duty did Orrell breach by taking the contract opportunity?",
      [
        "s.171, acting within powers",
        "s.175, the duty to avoid conflicts of interest",
        "s.176, not accepting benefits from third parties",
        "None — the company might not have taken the contract",
      ],
      1,
      "SECTION 175. He failed to avoid a conflict and exploited an OPPORTUNITY that came to him through the company, so he must ACCOUNT for the profits. That Sedgemoor might not have taken the contract is no defence."),
    task("lwe-mtq-09", 2, "F", "LWE-38", "medium",
      "What is the position on the warehouse purchase?",
      [
        "Valid — he disclosed his interest at a board meeting",
        "s.177 was breached because nature and extent were not declared, and as an unapproved substantial property transaction it is voidable",
        "Void, so title never passed",
        "Valid, board approval sufficing for a purchase from a director",
      ],
      1,
      "Both defects. Saying he \"has an interest\" discloses neither the NATURE nor the EXTENT required by s.177; and a SUBSTANTIAL PROPERTY TRANSACTION needs approval by ORDINARY RESOLUTION of the members, so it is VOIDABLE and he must account for gains and indemnify losses."),
    task("lwe-mtq-09", 3, "F", "LWE-38", "hard",
      "How does Orrell's accountancy qualification affect his s.174 exposure for not reading the accounts?",
      [
        "It reduces it, he not being engaged as the company's accountant",
        "It increases it — his own knowledge and skill raise the objective standard",
        "It has no effect, the test being purely objective",
        "It transfers responsibility to the auditors",
      ],
      1,
      "It INCREASES it. Section 174's objective limb sets the floor and the SUBJECTIVE limb adds the director's own actual knowledge and skill, raising the standard and never lowering it. His honesty is irrelevant, which is why the claim lies under s.174 rather than s.172."),
  ],
}

const MTQ_10: OtCase = {
  id: "lwe-mtq-10",
  paper: "LW",
  area: "G",
  title: "Ravensden Ltd — distributing the estate",
  scenario:
    "Ravensden Ltd is in insolvent liquidation. Realisations are £300,000 from its factory, subject to a fixed charge to Bank P securing £340,000, and £500,000 from inventory and receivables, subject to a floating charge to Bank Q securing £450,000. Liquidation expenses are £60,000 and preferential debts £90,000. Unsecured trade creditors are owed £700,000. The prescribed part applicable to the floating charge realisations is £48,000. Two months before liquidation the company repaid £70,000 owed on a director's personal loan, ahead of all trade creditors.",
  questions: [
    task("lwe-mtq-10", 1, "G", "LWE-41", "medium",
      "How much does Bank Q receive from the floating charge realisations?",
      ["£450,000", "£302,000", "£350,000", "£500,000"],
      1,
      "£302,000. Expenses of £60,000 and preferential debts of £90,000 come first, leaving £350,000; then the prescribed part of £48,000 is carved out for the unsecured creditors. Bank Q's £148,000 shortfall becomes an unsecured claim."),
    task("lwe-mtq-10", 2, "G", "LWE-41", "medium",
      "What can the liquidator do about the £70,000 repaid on the director's loan?",
      [
        "Nothing, the debt being genuinely owed",
        "Apply to have it set aside as a preference, bringing it back into the estate",
        "Treat the director as a preferential creditor",
        "Report it only for disqualification purposes",
      ],
      1,
      "Apply to have it SET ASIDE as a PREFERENCE, since it put a connected creditor in a better position shortly before insolvency. Recovering it enlarges the estate — and it may also support a disqualification application."),
    task("lwe-mtq-10", 3, "G", "LWE-41", "hard",
      "Which claims share in the unsecured pool?",
      [
        "The trade creditors only",
        "The trade creditors plus Bank P's £40,000 and Bank Q's £148,000 shortfalls",
        "The trade creditors plus the preferential debts",
        "Bank P and Bank Q only, having priority",
      ],
      1,
      "The trade creditors PLUS BOTH BANKS' SHORTFALLS — £700,000 + £40,000 + £148,000 = £888,000 of claims. A secured creditor's shortfall ranks as unsecured, which dilutes the trade creditors' dividend."),
  ],
}

/* ── Form 3 block · units 11–15 ─────────────────────────────────── */

const MTQ_11: OtCase = {
  id: "lwe-mtq-11",
  paper: "LW",
  area: "B",
  title: "Halvern Ltd — the guillotine and the clause",
  scenario:
    "Halvern Ltd, a printing business, bought a guillotine from Castermain Machines, signing Castermain's standard order form. Clause 12 on the reverse states: \"The Company accepts no liability for any loss or damage howsoever arising.\" Nothing was said about clause 12 and Halvern was not shown the reverse. The guillotine was defective: it injured Halvern's operator, ruined £30,000 of paper stock and caused £70,000 of lost profit. Castermain sold an identical machine on the same form to Odile, a hobbyist buying for use at home.",
  questions: [
    task("lwe-mtq-11", 1, "B", "LWE-14", "medium",
      "Is clause 12 incorporated into Halvern's contract?",
      [
        "No, Halvern was never shown the reverse",
        "Yes — Halvern signed the form, and a signature binds whether or not the terms were read",
        "No, unless Castermain drew attention to it",
        "Only because both parties are businesses",
      ],
      1,
      "YES. SIGNATURE is the strongest route to incorporation and binds the signer whether or not they read the terms, absent misrepresentation of the clause's effect. Incorporation is only the first of three hurdles."),
    task("lwe-mtq-11", 2, "B", "LWE-14", "medium",
      "Can clause 12 exclude liability for the operator's injury?",
      [
        "Yes, if it is reasonable in the circumstances",
        "No — under UCTA 1977 exclusion of liability for personal injury caused by negligence is void",
        "Yes, both parties being businesses of equal standing",
        "Only if Halvern received an inducement to accept it",
      ],
      1,
      "NO. Under UCTA 1977 an exclusion of liability for DEATH OR PERSONAL INJURY caused by negligence is VOID outright, and no reasonableness argument can save it."),
    task("lwe-mtq-11", 3, "B", "LWE-14", "hard",
      "How does Odile's position differ from Halvern's?",
      [
        "It is weaker, she being a private individual with less bargaining power",
        "It is stronger — as a consumer the CRA 2015 bars excluding the quality and fitness terms outright, without any reasonableness argument",
        "It is identical, the same form having been used",
        "She has no claim, having bought for private use",
      ],
      1,
      "STRONGER. As a CONSUMER the CRA 2015 applies: the terms as to satisfactory quality and fitness CANNOT BE EXCLUDED at all, and clause 12 is in any event an unfair term not binding on her. Halvern must argue reasonableness; Odile need not."),
  ],
}

const MTQ_12: OtCase = {
  id: "lwe-mtq-12",
  paper: "LW",
  area: "C",
  title: "Kestrel Foods — the stock controller and the CCTV",
  scenario:
    "Kestrel Foods suspected Warriner, a stock controller with six years' service, of taking stock. The operations director reviewed CCTV, concluded he was guilty, and dismissed him by letter the same afternoon. Warriner was not told the allegation beforehand, had no hearing, and was offered no appeal. The CCTV does show him removing goods, though he says he had permission to take damaged stock and two colleagues would have supported him; neither was interviewed. His gross weekly pay is above the statutory cap on a week's pay, which for the relevant year is £700. He is 45 and found a similar job two months later at slightly lower pay.",
  questions: [
    task("lwe-mtq-12", 1, "C", "LWE-26", "medium",
      "Was Warriner's dismissal fair?",
      [
        "Yes, the CCTV establishing the misconduct",
        "No — the reason was potentially fair but the investigation and procedure were defective",
        "Yes, conduct being a potentially fair reason",
        "No, because theft is not a fair reason for dismissal",
      ],
      1,
      "UNFAIR. Conduct is a potentially fair reason, but the employer needed a genuine belief on REASONABLE GROUNDS after a REASONABLE INVESTIGATION — and it never interviewed the two supporting colleagues, gave no advance notice of the allegation, held no hearing and offered no appeal."),
    task("lwe-mtq-12", 2, "C", "LWE-26", "medium",
      "What is Warriner's basic award?",
      ["£6,300", "£9,450", "£4,200", "£12,600"],
      1,
      "£9,450. Six complete years all at age 41 or over means 1.5 weeks each = NINE weeks, calculated on the CAPPED week's pay of £700 rather than his higher actual pay. 9 × £700 = £9,450."),
    task("lwe-mtq-12", 3, "C", "LWE-26", "hard",
      "What is likely to happen to his compensatory award?",
      [
        "It will be paid in full, the dismissal being unfair",
        "It may be reduced substantially for contributory conduct and under Polkey",
        "It will be nil, since he found a new job",
        "It is capped at the basic award",
      ],
      1,
      "REDUCED SUBSTANTIALLY. If he did take stock without permission there is CONTRIBUTORY CONDUCT, and a POLKEY reduction reflects the chance that a fair procedure would have led to dismissal anyway. He wins on liability but may recover modestly — and he mitigated promptly, so no reduction on that ground."),
  ],
}

const MTQ_13: OtCase = {
  id: "lwe-mtq-13",
  paper: "LW",
  area: "E",
  title: "Cranfield Ltd — ranking the charges",
  scenario:
    "Cranfield Ltd granted a floating charge over its whole undertaking to Bank A on 1 March, containing a clause prohibiting the creation of any later fixed charge ranking ahead of it. On 10 March it granted a fixed charge over its factory to Bank B, which had read the register and knew of Bank A's clause. On 20 March it granted a fixed charge over its delivery fleet to Bank C, which knew nothing of Bank A's charge because Bank A did not register until 5 April. Cranfield went into liquidation in June, with the factory, the fleet and £180,000 of inventory as its assets.",
  questions: [
    task("lwe-mtq-13", 1, "E", "LWE-35", "medium",
      "What is the effect of Bank A registering on 5 April?",
      [
        "The charge is valid, registration having taken place",
        "The charge is void as security against the liquidator and other creditors, having missed the 21-day window",
        "The charge is valid but ranks last",
        "Both the charge and the loan are void",
      ],
      1,
      "VOID AS SECURITY. Registration was required within 21 DAYS of creation, so Bank A drops to UNSECURED. Its LOAN remains recoverable as a debt and indeed becomes immediately payable — losing the security is not losing the debt."),
    task("lwe-mtq-13", 2, "E", "LWE-35", "medium",
      "Does Bank A's negative pledge help it against Bank B, which knew of it?",
      [
        "Yes, Bank B had notice and is bound by it",
        "No — the negative pledge falls with the charge, which is void for late registration",
        "Yes, but only in respect of the inventory",
        "No, negative pledges being unenforceable in principle",
      ],
      1,
      "NO. The pledge is a term of a charge that is VOID for late registration, so Bank B's knowledge of it is irrelevant. Bank B takes the factory ahead of everyone."),
    task("lwe-mtq-13", 3, "E", "LWE-35", "hard",
      "Had Bank A registered in time, would its March floating charge have beaten Bank C's April fixed charge?",
      [
        "Yes, being first in time",
        "No — a fixed charge generally ranks ahead of an earlier floating charge, and Bank C had no notice of the negative pledge",
        "Yes, because the negative pledge binds the world",
        "They would have ranked equally",
      ],
      1,
      "NO. A FIXED charge generally ranks AHEAD of a floating charge over the same assets, even one created earlier, unless the later chargee had NOTICE of the negative pledge — and Bank C had none."),
  ],
}

const MTQ_14: OtCase = {
  id: "lwe-mtq-14",
  paper: "LW",
  area: "F",
  title: "Fernlea Ltd — four resolutions, one meeting",
  scenario:
    "Fernlea Ltd, a private company, has four members: Ashby with 6,000 shares, Brill with 2,500, Coleman with 1,000 and Dacre with 500. The directors gave 14 days' notice of a general meeting to alter the articles, to remove Coleman as a director, and to approve a £40,000 loan to Ashby. No special notice was served in relation to Coleman. All four attended. On a show of hands the article alteration was defeated 3–1, Ashby alone voting in favour, and Ashby then demanded a poll. Separately the board later circulated a written resolution to remove the company's auditor, signed by members holding 55% of the total voting rights.",
  questions: [
    task("lwe-mtq-14", 1, "F", "LWE-40", "medium",
      "Does the article alteration pass on the poll?",
      [
        "Yes, Ashby holds 60% and votes follow shareholdings on a poll",
        "No — altering the articles needs not less than 75%, and 60% falls short",
        "No, the show of hands having settled it",
        "Yes, a poll overriding the earlier vote entirely",
      ],
      1,
      "NO. A poll does let Ashby cast his 60%, unlike the one-vote-per-member show of hands — but altering the articles requires a SPECIAL RESOLUTION of not less than 75%, so 60% is never enough."),
    task("lwe-mtq-14", 2, "F", "LWE-40", "medium",
      "Is the resolution removing Coleman valid?",
      [
        "Yes, Ashby's 60% carries an ordinary resolution",
        "No — removal requires 28 days' special notice, which was not given",
        "No, removal requiring a special resolution",
        "Yes, provided Coleman was present at the meeting",
      ],
      1,
      "INVALID. Removal is by ORDINARY resolution, which Ashby's 60% would carry, but it requires 28 DAYS' SPECIAL NOTICE to the company. Coleman is also entitled to be heard and to have written representations circulated."),
    task("lwe-mtq-14", 3, "F", "LWE-40", "hard",
      "Is the written resolution removing the auditor effective?",
      [
        "Yes, 55% exceeding the ordinary majority",
        "No — a written resolution can never remove an auditor, who is entitled to be heard at a meeting",
        "No, because 55% of total voting rights is insufficient",
        "Yes, written resolutions being available to private companies",
      ],
      1,
      "NO, whatever the percentage. A WRITTEN RESOLUTION cannot remove an AUDITOR or a DIRECTOR, because both are entitled to be HEARD and to have representations circulated — which requires a MEETING."),
  ],
}

const MTQ_15: OtCase = {
  id: "lwe-mtq-15",
  paper: "LW",
  area: "H",
  title: "Wrenshall Ltd — nine months too long",
  scenario:
    "Wrenshall Ltd's board saw management accounts in January showing net liabilities of £400,000 and no realistic prospect of new funding. The directors genuinely believed a large contract would rescue the company. They took no advice, traded on for nine months, took a further £520,000 of credit from suppliers who were not told of the position, and paid off a £70,000 loan owed to one director's spouse. The contract never materialised and Wrenshall entered insolvent liquidation in October with a deficiency of £950,000. Ashcroft, one director, is a chartered accountant. Bewley urged the board in February to take insolvency advice and resigned in March when it refused.",
  questions: [
    task("lwe-mtq-15", 1, "H", "LWE-46", "medium",
      "Is a fraudulent trading claim likely to succeed?",
      [
        "Yes, trading on with net liabilities is inherently fraudulent",
        "No — it requires dishonesty, and the directors genuinely believed the contract would rescue the company",
        "Yes, because suppliers were not told the position",
        "Yes, the belief having been unreasonable",
      ],
      1,
      "NO. Fraudulent trading requires an INTENT TO DEFRAUD, and genuine belief — however unrealistic — negates dishonesty. That is precisely the gap wrongful trading exists to fill."),
    task("lwe-mtq-15", 2, "H", "LWE-46", "medium",
      "How does Bewley's position differ from the other directors'?",
      [
        "It does not — all directors are equally liable",
        "It is much stronger: he urged advice and resigned, so he took the steps open to him and his exposure ends in March",
        "He is liable as a shadow director after resigning",
        "He is liable only for the £70,000 preference",
      ],
      1,
      "MUCH STRONGER. Documented dissent is exactly the evidence the \"every step\" defence needs, and his exposure is limited to the period while he was a DIRECTOR. Recording dissent and resigning is the practical advice where a board will not act."),
    task("lwe-mtq-15", 3, "H", "LWE-46", "hard",
      "Why is Ashcroft the most exposed of the directors who stayed?",
      [
        "Because he signed the accounts",
        "Because his accountancy qualification raises the objective standard, so he should have drawn the conclusion sooner",
        "Because he authorised the £70,000 payment",
        "Because a professional director owes a higher fiduciary duty",
      ],
      1,
      "Because his OWN KNOWLEDGE AND SKILL RAISE the objective standard, exactly as under s.174. A chartered accountant should have read the January accounts and concluded there was no reasonable prospect sooner and more clearly than a lay director."),
  ],
}

/*
 * Grouped so each block of five — the sitting a single mock form draws — spans a
 * spread of areas. See the header note on how the composer rotates.
 */
export const CASES_LW_ENG: OtCase[] = [
  MTQ_01, MTQ_02, MTQ_03, MTQ_04, MTQ_05,
  MTQ_06, MTQ_07, MTQ_08, MTQ_09, MTQ_10,
  MTQ_11, MTQ_12, MTQ_13, MTQ_14, MTQ_15,
]
