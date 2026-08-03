import type { AccaQuestion, OtCase } from "@/lib/acca-content"

/*
 * LW-GLOBAL · Section B multi-task questions (MTQs) — the real exam format.
 *
 * LW's Section B is FIVE multi-task questions of SIX marks each, so a sitting takes
 * five units and three disjoint sittings need FIFTEEN. Each unit below is one scenario
 * with three linked 2-mark tasks.
 *
 * ── Ordering ────────────────────────────────────────────────────
 * The mock composer rotates the case list by a whole sitting's worth per form, so form
 * 1 draws units 1–5, form 2 draws 6–10 and form 3 draws 11–15. The units are therefore
 * grouped so that each BLOCK OF FIVE spans a spread of syllabus areas rather than
 * clustering — a learner sitting any one form meets international trade, company and
 * insolvency or criminal material, as the real paper does:
 *
 *   Form 1 · units 1–5    A, B, C, D, E
 *   Form 2 · units 6–10   B, D, F, G, H
 *   Form 3 · units 11–15  A, B, C, E, F
 *
 * These replace 350 GENERATED linked questions whose stems read "In review 7, situation
 * 2 at Grove Ltd, which syllabus concept should be applied?" at one to two marks
 * apiece — a large bank of entirely the wrong shape, built by permuting glossary terms.
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
  id: "lwg-mtq-01",
  paper: "LW",
  area: "A",
  title: "Harnwell Engineering — the arbitration clause under attack",
  scenario:
    "Harnwell Engineering, in state R, and Coledale Fabrication, in state S, agreed a supply contract containing an arbitration clause with the seat in state T, whose arbitration statute is based on the UNCITRAL Model Law. The clause is silent on the number of arbitrators. Coledale refused to participate in appointment, so a court in state T appointed a three-member tribunal. Coledale filed a defence without objecting to jurisdiction, argued the merits over a four-day hearing, and lost. It now applies to set the award aside, arguing that it never agreed to three arbitrators, that the whole contract was void for misrepresentation so the arbitration clause fell with it, and that the tribunal misunderstood the engineering evidence.",
  questions: [
    task("lwg-mtq-01", 1, "A", "LWG-05", "medium",
      "What is the answer to Coledale's argument that it never agreed to three arbitrators?",
      [
        "The objection succeeds, as the parties must agree the number",
        "Failing agreement the Model Law supplies three, and a court appoints where a party will not co-operate",
        "The arbitration should have proceeded with a sole arbitrator",
        "The tribunal should have been appointed by the parties' institutions",
      ],
      1,
      "Failing agreement the number is THREE, and where a party refuses to co-operate a court or designated authority appoints — so the tribunal was properly constituted and the arbitration could not be stalled."),
    task("lwg-mtq-01", 2, "A", "LWG-05", "hard",
      "What is the answer to the argument that the arbitration clause fell with the allegedly void contract?",
      [
        "The clause falls with the contract, so the court must decide",
        "Separability keeps the clause independent, and competence-competence lets the tribunal rule on its own jurisdiction",
        "The clause survives only if the contract is later held valid",
        "The parties must agree a fresh arbitration agreement",
      ],
      1,
      "SEPARABILITY treats the arbitration agreement as independent of the contract containing it, and COMPETENCE-COMPETENCE lets the tribunal rule on its own jurisdiction. Otherwise any party could escape arbitration simply by attacking the main contract."),
    task("lwg-mtq-01", 3, "A", "LWG-05", "hard",
      "Coledale participated fully and then complained about the evidence. What is the position?",
      [
        "Misunderstanding the evidence is a ground for setting the award aside",
        "It is an appeal on the merits, for which there is no ground — and any jurisdictional objection was waived by not raising it before the defence",
        "The award may be remitted for reconsideration of the evidence",
        "The award stands but damages may be reduced",
      ],
      1,
      "There is NO APPEAL ON THE MERITS: the grounds are jurisdiction, due process, scope, composition and public policy. And a jurisdictional plea had to be raised no later than the DEFENCE, so full participation waived it."),
  ],
}

const MTQ_02: OtCase = {
  id: "lwg-mtq-02",
  paper: "LW",
  area: "B",
  title: "Berenford Ceramics — CIF, risk and a storm at sea",
  scenario:
    "Berenford Ceramics, in state T, sold 600 crates of tiles to Halloway Interiors, in state U, for $240,000 on terms \"CIF Port of Aldstone, Incoterms 2020\". Both states are contracting states to the CISG. Berenford cleared the goods for export, loaded them on board the Marisol on 3 June, took out insurance to the minimum cover and sent the documents to Halloway. On 11 June the vessel met heavy weather and 180 crates were destroyed; the policy covers the loss. Halloway refuses to pay the price, arguing that Berenford undertook to deliver the tiles to Aldstone and only 420 crates arrived. Halloway also asks whether it could have claimed against Berenford had the damage been of a kind the minimum policy excluded.",
  questions: [
    task("lwg-mtq-02", 1, "B", "LWG-08", "medium",
      "When did risk pass to Halloway?",
      [
        "On arrival at Aldstone",
        "On shipment, when the crates were placed on board",
        "When the documents were tendered",
        "When the price fell due",
      ],
      1,
      "ON SHIPMENT. Under every C-group term the seller pays the freight to the named destination but risk passes when the goods go on board — which is exactly why the seller is obliged to insure."),
    task("lwg-mtq-02", 2, "B", "LWG-08", "hard",
      "Must Halloway pay the price?",
      [
        "No, because only 420 crates arrived",
        "Yes, in full, claiming on the insurance Berenford was obliged to take out",
        "Only for the 420 crates delivered",
        "No, because the contract is frustrated",
      ],
      1,
      "YES, in FULL. Loss after risk has passed does not discharge the buyer from paying, and its remedy is the POLICY. Paying the freight to Aldstone is a cost obligation, not a promise to deliver there — the classic C-group confusion."),
    task("lwg-mtq-02", 3, "B", "LWG-08", "hard",
      "Had the damage fallen outside the minimum cover, what would Halloway's position have been?",
      [
        "Berenford would have been liable, as its insurance was inadequate",
        "Halloway would have borne an uninsured loss and still owed the price, the CIF duty being minimum cover only",
        "The contract would have been avoided automatically",
        "The loss would have been shared equally",
      ],
      1,
      "Halloway would bear an UNINSURED loss and still owe the price. The seller's CIF duty is MINIMUM cover, so a buyer wanting wider protection must arrange it itself or negotiate an express term."),
  ],
}

const MTQ_03: OtCase = {
  id: "lwg-mtq-03",
  paper: "LW",
  area: "C",
  title: "Ashgrove Mills — a documentary credit and a mismatched certificate",
  scenario:
    "Ashgrove Mills, in state J, sold fabric to Duncarrow Apparel, in state K, for $420,000, payment by irrevocable letter of credit issued by Duncarrow's bank and advised, but not confirmed, by a bank in state J. The credit required a clean on-board bill of lading, an invoice, and an inspection certificate issued by \"Pentland Inspectorate\". Ashgrove shipped the fabric and presented a clean bill, the invoice, and an inspection certificate from \"Pentland Inspection Services Ltd\". Meanwhile Duncarrow discovered the fabric was a shade off specification and instructed its bank not to pay.",
  questions: [
    task("lwg-mtq-03", 1, "C", "LWG-16", "medium",
      "What is the effect of Duncarrow's instruction not to pay because the goods are defective?",
      [
        "The bank must refuse payment",
        "None — the credit is autonomous, so disputes under the sale do not affect the bank's obligation",
        "The bank must pay half and hold the balance",
        "The credit is cancelled",
      ],
      1,
      "NONE. AUTONOMY means the credit is an independent transaction, so conditions and disputes in the underlying sale are irrelevant to the bank's obligation. Duncarrow's remedy for the fabric is against ASHGROVE."),
    task("lwg-mtq-03", 2, "C", "LWG-16", "hard",
      "May the bank nevertheless refuse to pay?",
      [
        "No, the documents are substantially compliant",
        "Yes — the certificate is from a differently named body, so the documents do not strictly comply",
        "No, because the discrepancy is immaterial",
        "Only with Duncarrow's consent",
      ],
      1,
      "YES, on the DOCUMENTS rather than the goods. STRICT COMPLIANCE means any discrepancy entitles the bank to refuse, and a differently named inspecting body is a discrepancy however commercially trivial it looks."),
    task("lwg-mtq-03", 3, "C", "LWG-16", "medium",
      "What difference would it have made had the credit been CONFIRMED?",
      [
        "None — an advising and a confirming bank are the same",
        "Ashgrove would have had an undertaking from a bank in its own jurisdiction, rather than only from the issuing bank abroad",
        "The documents would not have needed to comply",
        "Duncarrow could not have complained about the goods",
      ],
      1,
      "A CONFIRMING bank adds its OWN undertaking, giving Ashgrove a paying bank in its own jurisdiction. An advising bank only transmits and authenticates. Documents would still have had to comply strictly."),
  ],
}

const MTQ_04: OtCase = {
  id: "lwg-mtq-04",
  paper: "LW",
  area: "D",
  title: "Brannock Logistics — a depot manager's authority",
  scenario:
    "Brannock Logistics employs Petrie as depot manager. Her written appointment authorises her to buy consumables and hire agency drivers, but states that vehicle purchases require board approval. Over three years Petrie has bought four vans from Cawdor Motors, the board approving each afterwards without comment, and Cawdor has dealt with her throughout. This month she orders two vans from Cawdor for $96,000, and separately orders a forklift for $28,000 from Tarnside Plant, a supplier Brannock has never used, telling Tarnside \"I have full authority for plant purchases\". The board refuses both orders.",
  questions: [
    task("lwg-mtq-04", 1, "D", "LWG-17", "hard",
      "Is Brannock bound by the order to Cawdor Motors?",
      [
        "No, her appointment excluded vehicle purchases",
        "Yes — the course of dealing the board permitted is a holding out, relied on by Cawdor",
        "No, unless the board ratifies",
        "Only up to the value of previous orders",
      ],
      1,
      "BOUND, by APPARENT AUTHORITY. Letting Petrie buy four vans and ratifying each is a holding out by the PRINCIPAL that she may buy vehicles, and Cawdor relied on it. The internal exclusion binds her to the company, not Cawdor."),
    task("lwg-mtq-04", 2, "D", "LWG-17", "hard",
      "Is Brannock bound by the order to Tarnside Plant?",
      [
        "Yes, she is the depot manager",
        "No — there is no holding out by Brannock, and an agent cannot create its own apparent authority",
        "Yes, because Tarnside acted in good faith",
        "Yes, up to a reasonable value",
      ],
      1,
      "NOT BOUND. There is no course of dealing and no representation by the PRINCIPAL — only Petrie's own assertion, which cannot create apparent authority. Tarnside's recourse is against Petrie for breach of warranty of authority."),
    task("lwg-mtq-04", 3, "D", "LWG-17", "medium",
      "What would be the effect of Brannock accepting and using the forklift with knowledge of the facts?",
      [
        "Nothing — the order would remain unauthorised",
        "It would amount to ratification, binding Brannock retrospectively",
        "Tarnside would still have to sue Petrie",
        "The price would be reduced to a reasonable sum",
      ],
      1,
      "RATIFICATION, binding Brannock retrospectively. A principal cannot ratify part of a transaction and reject the rest, so it could not keep the forklift while refusing the price."),
  ],
}

const MTQ_05: OtCase = {
  id: "lwg-mtq-05",
  paper: "LW",
  area: "E",
  title: "Ravenglass Ltd — competing charges on a liquidation",
  scenario:
    "Ravenglass Ltd borrowed $500,000 from Northbank in January, secured by a floating charge over its whole undertaking, duly registered. In April it borrowed $300,000 from Solway Finance, secured by a fixed charge over its freehold warehouse, duly registered. In June it borrowed $150,000 from Threlkeld Credit, secured by a fixed charge over the same warehouse; Threlkeld did not register its charge. In September Ravenglass went into liquidation. The warehouse realised $600,000 and inventory and receivables realised $250,000. Preferential claims total $90,000 and unsecured trade creditors are owed $700,000.",
  questions: [
    task("lwg-mtq-05", 1, "E", "LWG-23", "medium",
      "What is Threlkeld Credit's position?",
      [
        "It shares the warehouse proceeds with Solway",
        "Its charge is void against the liquidator and other creditors, so it ranks as unsecured — though the debt survives",
        "Its debt is extinguished",
        "It ranks ahead of the floating charge",
      ],
      1,
      "The CHARGE is void against the liquidator and other creditors for want of registration, so Threlkeld is UNSECURED. The DEBT survives and typically becomes immediately repayable — but the security is gone."),
    task("lwg-mtq-05", 2, "E", "LWG-23", "hard",
      "How are the warehouse proceeds of $600,000 applied?",
      [
        "All to Northbank, whose charge covers the whole undertaking",
        "$300,000 to Solway from its own security, with the $300,000 surplus falling into the general estate",
        "Shared between Solway and Threlkeld",
        "$300,000 to Solway and $150,000 to Threlkeld",
      ],
      1,
      "Solway's registered FIXED charge takes priority over Northbank's floating charge on that asset, so Solway takes $300,000 from its own security and the SURPLUS joins the estate. Threlkeld's unregistered charge gives it no claim on the asset."),
    task("lwg-mtq-05", 3, "E", "LWG-29", "hard",
      "How much does Northbank recover?",
      [
        "$550,000, being all the remaining assets",
        "$460,000, because preferential claims of $90,000 rank ahead of a floating charge",
        "$500,000 in full",
        "Nothing, ranking behind the unsecured creditors",
      ],
      1,
      "$460,000. Available to the floating charge is the $300,000 surplus plus $250,000 of inventory and receivables = $550,000, less PREFERENTIAL claims of $90,000 which rank AHEAD of a floating charge. The $40,000 shortfall becomes an unsecured claim."),
  ],
}

/* ── Form 2 block · units 6–10 ──────────────────────────────────── */

const MTQ_06: OtCase = {
  id: "lwg-mtq-06",
  paper: "LW",
  area: "B",
  title: "Marbeck Assembly — late delivery and defective bearings",
  scenario:
    "Marbeck Assembly, in state X, ordered 5,000 precision bearings from Duncastle Engineering, in state Y, for delivery by 15 April, for a production line restarting on 1 May. Both states are contracting states. Duncastle delivered nothing by 15 April. On 18 April Marbeck wrote fixing 30 April as a final date. Duncastle delivered on 26 April, but 900 of the bearings were outside tolerance. Marbeck examined them on arrival and notified the defect on 28 April. Conforming bearings were worth $40 each; the out-of-tolerance ones are usable on lower-grade work and worth $16 each.",
  questions: [
    task("lwg-mtq-06", 1, "B", "LWG-10", "hard",
      "What did fixing 30 April as a final date achieve?",
      [
        "Nothing, as the original breach was not fundamental",
        "A right to avoid the contract if Duncastle failed to deliver within that additional period",
        "An immediate right to substitute goods",
        "An automatic reduction in the price",
      ],
      1,
      "It created a right to AVOID if Duncastle missed the additional period, without Marbeck having to prove fundamental breach. As Duncastle delivered on 26 April that right never arose — but during the period Marbeck could not resort to other remedies, damages apart."),
    task("lwg-mtq-06", 2, "B", "LWG-10", "hard",
      "Can Marbeck avoid the contract for the 900 defective bearings?",
      [
        "Yes, delivering defective goods is always fundamental",
        "No — 4,100 conform and the line can run, so Marbeck is not substantially deprived",
        "Yes, because it notified promptly",
        "Only if Duncastle refuses to replace them",
      ],
      1,
      "NO. Fundamental breach needs SUBSTANTIAL DEPRIVATION, and with 4,100 conforming bearings the line can run. So avoidance and substitute goods are unavailable, though price reduction, repair, performance of the balance and damages remain."),
    task("lwg-mtq-06", 3, "B", "LWG-10", "medium",
      "If Marbeck takes a price reduction, does it also keep its claim for the delay?",
      [
        "No, choosing one remedy excludes the others",
        "Yes — damages are cumulative with every other remedy",
        "Only if it reserved its rights in writing",
        "Only for the period after 30 April",
      ],
      1,
      "YES. DAMAGES are cumulative with every other remedy, so choosing price reduction, repair or performance never costs the buyer its claim for the delay from 15 to 26 April."),
  ],
}

const MTQ_07: OtCase = {
  id: "lwg-mtq-07",
  paper: "LW",
  area: "D",
  title: "Ashwell, Bracken and Calder — a firm's exposure",
  scenario:
    "Ashwell, Bracken and Calder are partners in a firm of commercial surveyors. Their written agreement provides that no partner may borrow more than $20,000 without the others' consent. Without telling the others, Calder borrowed $150,000 from Ridgeworth Bank in the firm's name to fund a property speculation of his own; the bank knows the firm and has lent to it before, and knew nothing of the internal cap. Bracken retired on 1 March and no notice of his retirement was given to clients. On 20 April a long-standing client engaged \"the firm\" for a survey and was later owed damages for negligent work done by Ashwell. Calder's speculation has failed.",
  questions: [
    task("lwg-mtq-07", 1, "D", "LWG-18", "hard",
      "Is the firm bound by Calder's $150,000 borrowing?",
      [
        "No, he exceeded the agreed $20,000 cap",
        "Yes — an internal restriction binds only a third party who knew of it or did not believe him to be a partner",
        "Yes, but only up to $20,000",
        "No, because he applied the money to his own venture",
      ],
      1,
      "BOUND. Borrowing is something a surveying firm might do in the usual way, and the bank neither knew of the cap nor doubted Calder's status. He remains liable to his partners for the breach and for applying the money to his own speculation."),
    task("lwg-mtq-07", 2, "D", "LWG-18", "hard",
      "Is Bracken liable for the damages arising from the April engagement?",
      [
        "No, the negligence occurred after his retirement",
        "Potentially yes, to a client who still believed him a partner, because no notice of retirement was given",
        "No, unless he returned to the firm",
        "Only for a share proportionate to his former profit share",
      ],
      1,
      "POTENTIALLY YES. Without NOTICE, a retiring partner may be caught by LATER obligations owed to those who reasonably still treat him as a partner. Giving notice on retirement is the single most practical point in the topic."),
    task("lwg-mtq-07", 3, "D", "LWG-18", "medium",
      "Is Bracken also liable for the borrowing?",
      [
        "No, it was Calder's personal venture",
        "Yes — it was incurred while he was a partner, and he remains liable unless released",
        "No, because he did not consent to it",
        "Only if the bank sues within a year",
      ],
      1,
      "YES. A partner remains liable for debts incurred WHILE a partner unless released by the creditor. The borrowing pre-dated 1 March, and his lack of consent is an internal matter between the partners."),
  ],
}

const MTQ_08: OtCase = {
  id: "lwg-mtq-08",
  paper: "LW",
  area: "F",
  title: "Wrenbury Ltd — a director and a corporate opportunity",
  scenario:
    "Danforth is a director of Wrenbury Ltd and a qualified engineer. Wrenbury had been negotiating for months to acquire a licence to a patented process, and Danforth conducted the negotiations. Learning that the licensor would grant it cheaply, he took the licence personally through a company he owns, and then offered to sub-licence it to Wrenbury at a mark-up. He did not mention his interest at the board meeting that approved the sub-licence, at which he voted in favour. Wrenbury also lent Danforth $120,000 to buy the shares in his company, approved by the board alone. Separately, an engineering specification Danforth signed off proved negligently drawn, causing $200,000 of loss.",
  questions: [
    task("lwg-mtq-08", 1, "F", "LWG-26", "hard",
      "What must Danforth do about the profit on the licence?",
      [
        "Nothing, as Wrenbury might not have obtained it",
        "Account to Wrenbury for it — the opportunity belonged to the company",
        "Repay only Wrenbury's wasted negotiation costs",
        "Share it equally with Wrenbury",
      ],
      1,
      "ACCOUNT for it. A CORPORATE OPPORTUNITY belongs to the company even if the company might not have obtained it, and exploiting information gained as a director breaches the duty to avoid conflicts."),
    task("lwg-mtq-08", 2, "F", "LWG-26", "hard",
      "What standard of care applies to the negligent specification?",
      [
        "The general standard expected of any director",
        "The higher standard imported by his own qualification as an engineer, in addition to the objective minimum",
        "A lower standard, as he relied on colleagues",
        "None, as technical work is delegated",
      ],
      1,
      "The HIGHER standard. The duty is objective AND subjective, and the subjective limb can only RAISE it — so a qualified engineer cannot plead what a lay director would have known."),
    task("lwg-mtq-08", 3, "F", "LWG-26", "medium",
      "What is the position of the $120,000 loan approved by the board alone?",
      [
        "Valid, as the board manages the company",
        "Likely improper — a loan to a director ordinarily requires members' approval",
        "Valid if interest is charged at a market rate",
        "Valid because Danforth disclosed his shareholding",
      ],
      1,
      "LIKELY IMPROPER. Dealings between a director and the company are statutorily controlled and a loan ordinarily needs MEMBERS' approval, so board approval alone exposes the authorising directors and makes the loan repayable."),
  ],
}

const MTQ_09: OtCase = {
  id: "lwg-mtq-09",
  paper: "LW",
  area: "G",
  title: "Marchant Engineering — administration and the moratorium",
  scenario:
    "Marchant Engineering is insolvent but has a full order book and a profitable core division. Its bank, holding a qualifying floating charge, appointed an administrator out of court. On appointment, a trade creditor was midway through proceedings for $80,000; an equipment lessor arrived to repossess machines essential to the profitable division; and the bank pressed the administrator to sell the whole business immediately so that it could recover its debt. The directors wish to continue running the company themselves.",
  questions: [
    task("lwg-mtq-09", 1, "G", "LWG-30", "medium",
      "What is the effect of the appointment on the trade creditor's proceedings and the lessor's repossession?",
      [
        "Both may continue, being pre-existing rights",
        "Both are blocked by the moratorium without the administrator's consent or the court's permission",
        "The proceedings are stayed but repossession may continue",
        "Repossession is blocked but the proceedings may continue",
      ],
      1,
      "BOTH are blocked. The MORATORIUM halts legal process and repossession of goods in the company's possession, as well as enforcement of security. Ownership of the machines does not override it — that is what makes a rescue possible."),
    task("lwg-mtq-09", 2, "G", "LWG-30", "hard",
      "How should the administrator respond to the bank's pressure for an immediate sale?",
      [
        "Comply, as the bank appointed it",
        "Pursue the rescue if reasonably practicable, owing its duty to the creditors as a whole and bound by the hierarchy of objectives",
        "Seek the members' direction",
        "Sell, since secured creditors rank first",
      ],
      1,
      "PURSUE THE RESCUE. The duty is to the CREDITORS AS A WHOLE, not to the appointor, and the HIERARCHY permits a lower objective only where the higher is not reasonably practicable. A full order book and a profitable core suggest rescue is available."),
    task("lwg-mtq-09", 3, "G", "LWG-30", "medium",
      "What is the position of the directors?",
      [
        "They are automatically removed from office",
        "They remain in office but cannot exercise their powers without the administrator's consent, and may be removed by it",
        "Their powers are unaffected",
        "They become the administrator's agents",
      ],
      1,
      "They REMAIN IN OFFICE but may not exercise their powers without consent, and the administrator MAY remove them. Running the company is now the administrator's function."),
  ],
}

const MTQ_10: OtCase = {
  id: "lwg-mtq-10",
  paper: "LW",
  area: "H",
  title: "Harbrook Ltd — trading on after insolvency",
  scenario:
    "Harbrook Ltd's management accounts for March showed it was balance-sheet insolvent and could not meet its liabilities. Its three directors are Vance, a chartered accountant and the finance director; Doyle, the managing director; and Reese, a non-executive who attends board meetings and receives the accounts. The board decided to \"trade through it\". Between April and September the company took $480,000 of new supplies on credit and repaid a $90,000 loan Doyle had made to it. In October it entered insolvent liquidation with $610,000 of unsecured debt. Vance had circulated a note in April warning that continued trading was not viable; Doyle overruled it; Reese said nothing.",
  questions: [
    task("lwg-mtq-10", 1, "H", "LWG-33", "hard",
      "Which claim is the liquidator realistically able to bring against the directors?",
      [
        "Fraudulent trading, since creditors lost money",
        "Wrongful trading, which needs no dishonesty — only that they knew or ought to have concluded there was no reasonable prospect of avoiding insolvent liquidation",
        "Neither, as they acted honestly",
        "Breach of contract with the creditors",
      ],
      1,
      "WRONGFUL TRADING. It applies an OBJECTIVE test and requires no dishonesty, so honest over-optimism is no defence. Fraudulent trading would need intent to defraud, which these facts do not obviously show."),
    task("lwg-mtq-10", 2, "H", "LWG-33", "hard",
      "Is Reese, as a non-executive who said nothing, exposed?",
      [
        "No, non-executives owe no such duty",
        "Yes — a non-executive is a director, and passivity is not a defence",
        "No, unless she was remunerated",
        "Only if she was also a shareholder",
      ],
      1,
      "YES. A NON-EXECUTIVE is a director for this purpose, and the objective test asks what a director in that role ought to have concluded. Receiving the accounts and staying silent does not discharge the duty."),
    task("lwg-mtq-10", 3, "H", "LWG-33", "medium",
      "What is the significance of repaying Doyle's $90,000 loan?",
      [
        "None — he was a genuine creditor",
        "It may be an attackable preference and is strong evidence against the directors on the wrongful trading claim",
        "It reduces the company's deficiency",
        "It was a lawful distribution",
      ],
      1,
      "It may be an attackable PREFERENCE, and it is powerful evidence on the wrongful trading claim: preferring a connected creditor is among the clearest indicators that the directors were not minimising loss to creditors as a whole."),
  ],
}

/* ── Form 3 block · units 11–15 ─────────────────────────────────── */

const MTQ_11: OtCase = {
  id: "lwg-mtq-11",
  paper: "LW",
  area: "A",
  title: "Solvent Dynamics — designing a dispute clause",
  scenario:
    "Solvent Dynamics, in state A, is negotiating a three-year supply agreement with Arbor Chemicals, in state B. The goods are technically specialised. Arbor insists any dispute be heard in its home courts; Solvent is uneasy because state B's judgments are difficult to enforce elsewhere and its courts are slow. The relationship is expected to be long-term and neither party wants the commercial terms made public. Solvent's adviser is drafting the dispute clause.",
  questions: [
    task("lwg-mtq-11", 1, "A", "LWG-04", "hard",
      "Which feature of arbitration most directly answers Solvent's concerns?",
      [
        "That it is always cheaper than litigation",
        "A neutral seat, a tribunal chosen for its expertise, confidentiality, and an award enforceable in both states",
        "A broad right of appeal on the merits",
        "That third parties can be joined readily",
      ],
      1,
      "NEUTRALITY, EXPERTISE, CONFIDENTIALITY and ENFORCEABILITY — each maps onto a concern Solvent actually raised. Arbitration is not always cheaper, the grounds to challenge an award are narrow, and joining third parties is difficult."),
    task("lwg-mtq-11", 2, "A", "LWG-04", "medium",
      "Given the long-term relationship, what should the clause provide for before arbitration is commenced?",
      [
        "Immediate arbitration, to save time",
        "An escalation through negotiation and then mediation",
        "A binding expert determination of every dispute",
        "Litigation in a neutral country's courts",
      ],
      1,
      "An ESCALATION through negotiation and MEDIATION. In a continuing supply relationship most disputes are better settled than decided, and mediation preserves the relationship in a way an adjudicated outcome does not."),
    task("lwg-mtq-11", 3, "A", "LWG-05", "medium",
      "Why should the clause expressly preserve access to a national court?",
      [
        "Because arbitration agreements are otherwise unenforceable",
        "For interim relief such as a freezing order, which may be needed before a tribunal can be constituted",
        "To allow an appeal against the award",
        "Because awards require court approval",
      ],
      1,
      "For INTERIM RELIEF. Requesting it is expressly compatible with an arbitration agreement, and a tribunal takes time to constitute. There is no appeal on the merits and awards need no advance approval."),
  ],
}

const MTQ_12: OtCase = {
  id: "lwg-mtq-12",
  paper: "LW",
  area: "B",
  title: "Aldbury Mills — offer, counter-offer and silence",
  scenario:
    "On 2 May Aldbury Mills, in state R, emailed Cheveley Textiles, in state S, offering 40,000 metres of cloth at $6.20 per metre, delivery in July, payment 30 days from invoice. Both states are contracting states. On 5 May Cheveley replied: \"We accept. Delivery must be split across July and August, and any dispute shall be referred to arbitration in state S.\" Aldbury did not respond. On 20 May Cheveley emailed again: \"Ignore our earlier points — we accept your terms exactly as offered.\" On 21 May Aldbury replied that it had sold the cloth elsewhere.",
  questions: [
    task("lwg-mtq-12", 1, "B", "LWG-07", "hard",
      "What was the effect of Cheveley's reply of 5 May?",
      [
        "An effective acceptance on Aldbury's terms",
        "A rejection and counter-offer, because it altered the time of delivery and added a dispute clause — both material",
        "An acceptance on the modified terms unless Aldbury objected",
        "No effect at all",
      ],
      1,
      "A REJECTION AND COUNTER-OFFER. TIME OF DELIVERY and SETTLEMENT OF DISPUTES are both material alterations, so the reply did not accept — and the rejection terminated Aldbury's original offer."),
    task("lwg-mtq-12", 2, "B", "LWG-07", "medium",
      "What was the effect of Aldbury's silence after 5 May?",
      [
        "It accepted Cheveley's counter-offer",
        "None — silence or inactivity does not in itself amount to acceptance",
        "It revived the original offer",
        "It extended the offer for a reasonable time",
      ],
      1,
      "NONE. Silence or inactivity does not IN ITSELF amount to acceptance, so Aldbury's failure to answer the counter-offer concluded nothing."),
    task("lwg-mtq-12", 3, "B", "LWG-07", "hard",
      "Is there a contract following Cheveley's email of 20 May?",
      [
        "Yes, on Aldbury's original terms",
        "No — the original offer had terminated, so the 20 May email was a fresh offer which Aldbury declined",
        "Yes, on Cheveley's modified terms",
        "Yes, because Aldbury had not withdrawn its offer",
      ],
      1,
      "NO CONTRACT. The original offer died with the counter-offer on 5 May, so there was nothing left to accept. The 20 May email was a FRESH OFFER, and Aldbury's reply of 21 May declined it."),
  ],
}

const MTQ_13: OtCase = {
  id: "lwg-mtq-13",
  paper: "LW",
  area: "C",
  title: "Tarnhill Produce — the bill of lading in a financed sale",
  scenario:
    "Tarnhill Produce, in state D, sold 900 cartons of preserved fruit to Verrow Wholesale, in state E, on terms CIF, payment by irrevocable documentary credit. Tarnhill shipped on the Aurelia and the carrier issued a clean ocean bill of lading made out to order. Tarnhill endorsed the bill and presented it with the invoice and insurance policy to the bank. While the vessel was at sea Verrow agreed to resell 400 cartons to Merrow Retail. On arrival the cartons were found to have been damaged by seawater, and the insurance covers the loss.",
  questions: [
    task("lwg-mtq-13", 1, "C", "LWG-14", "medium",
      "Which function of the bill of lading allows the bank to pay against it with security?",
      [
        "That it is a receipt for the goods",
        "That it is a document of title, giving the bank control over delivery",
        "That it evidences the contract of carriage",
        "That it records the goods' apparent condition",
      ],
      1,
      "Its function as a DOCUMENT OF TITLE. Holding the endorsed bill gives the bank control over delivery of the goods, which is the security that lets it pay Tarnhill against the documents."),
    task("lwg-mtq-13", 2, "C", "LWG-14", "medium",
      "How can Verrow resell 400 cartons before the vessel arrives?",
      [
        "It cannot, until it has possession of the goods",
        "By endorsing and delivering the bill, transferring the right to take delivery",
        "By assigning the sale contract to Merrow",
        "By instructing the carrier to split the cargo",
      ],
      1,
      "By ENDORSEMENT AND DELIVERY of the bill, which transfers the right to take delivery of the goods. That is exactly what makes a cargo tradable while still at sea."),
    task("lwg-mtq-13", 3, "C", "LWG-14", "hard",
      "What does the CLEAN bill establish about the seawater damage?",
      [
        "That Tarnhill is liable for it",
        "That the goods were in apparent good order at shipment, so the damage occurred afterwards — when risk had already passed under CIF",
        "That the carrier has no liability",
        "That the insurance is void",
      ],
      1,
      "That the goods were in APPARENT GOOD ORDER AT SHIPMENT, so the damage happened later — and under CIF risk had already passed on shipment. The bill and the Incoterm together put the loss on the buyer side, recoverable on the policy."),
  ],
}

const MTQ_14: OtCase = {
  id: "lwg-mtq-14",
  paper: "LW",
  area: "E",
  title: "Kirkstone plc — testing a proposed dividend",
  scenario:
    "Kirkstone plc, a public company, has called-up share capital of $2,000,000, share premium of $400,000, a revaluation surplus of $250,000, accumulated realised profits of $760,000 and accumulated realised losses brought forward of $180,000. Its net assets are $2,900,000. The directors propose a dividend of $600,000. A shareholder asks whether the revaluation surplus could be distributed, and what would follow if the proposed dividend were paid and later found unlawful.",
  questions: [
    task("lwg-mtq-14", 1, "E", "LWG-24", "medium",
      "What are Kirkstone's distributable profits on the basic test?",
      ["$760,000", "$580,000", "$830,000", "$1,010,000"],
      1,
      "$760,000 of accumulated realised profits less $180,000 of accumulated realised losses = $580,000. The test is CUMULATIVE, and the revaluation surplus is unrealised and excluded."),
    task("lwg-mtq-14", 2, "E", "LWG-24", "hard",
      "What is the maximum lawful dividend for this PUBLIC company?",
      ["$580,000", "$250,000", "$600,000", "$830,000"],
      1,
      "$250,000. The ADDITIONAL net-assets test requires net assets after the distribution to be no less than called-up capital $2,000,000 plus undistributable reserves $650,000 = $2,650,000, so only $250,000 of the $2,900,000 may leave. For a public company that test often bites before the profits test."),
    task("lwg-mtq-14", 3, "E", "LWG-24", "hard",
      "If the $600,000 were paid and later found unlawful, who could be required to make it good?",
      [
        "Only the directors who authorised it",
        "A member who knew or had reasonable grounds to believe it unlawful must repay, and the authorising directors may be liable to the company",
        "Only the auditor",
        "Nobody, once the money has been distributed",
      ],
      1,
      "BOTH sides. A knowing MEMBER must repay it and the authorising DIRECTORS may have to make good the amount to the company. \"The members have spent it\" is no answer."),
  ],
}

const MTQ_15: OtCase = {
  id: "lwg-mtq-15",
  paper: "LW",
  area: "F",
  title: "Ellersby Ltd — written resolutions and the right to be heard",
  scenario:
    "Ellersby Ltd is a private company with five members. To save time its board circulated written resolutions to alter the articles by deleting a pre-emption clause, to remove a director, Tarn, and to remove the company's auditor. Four of the five members signed, representing 82% of the voting shares. No notice was given to Tarn or to the auditor, and the board has treated all three resolutions as passed. Tarn has three years remaining on a five-year service contract.",
  questions: [
    task("lwg-mtq-15", 1, "F", "LWG-28", "medium",
      "What is the status of the resolution altering the articles?",
      [
        "Invalid, because a meeting was required",
        "Potentially valid — a private company may alter its articles by written resolution if the supermajority threshold is met",
        "Invalid, because all five members did not sign",
        "Valid only once filed with the registrar",
      ],
      1,
      "POTENTIALLY VALID. A private company may use a written resolution to alter its articles, and 82% will satisfy the special-resolution threshold. It must then be filed, and it remains subject to any entrenchment and to the bona fide requirement."),
    task("lwg-mtq-15", 2, "F", "LWG-28", "hard",
      "What is the status of the two removal resolutions?",
      [
        "Both valid, as the majority agreed",
        "Both invalid — a written resolution cannot remove a director or an auditor, each being entitled to be heard",
        "Valid for the director but not the auditor",
        "Valid once Tarn and the auditor are notified",
      ],
      1,
      "BOTH INVALID. A written resolution cannot remove a director or an auditor, because each is entitled to be HEARD by the members before the vote. A meeting on SPECIAL NOTICE is required, and even unanimity would not cure the defect."),
    task("lwg-mtq-15", 3, "F", "LWG-25", "medium",
      "If Tarn is later validly removed, what is the position on his service contract?",
      [
        "It ends automatically with his office",
        "Removal is effective but the company may owe damages for wrongful dismissal on the unexpired term",
        "He must be reinstated",
        "The contract transfers to his successor",
      ],
      1,
      "Removal from OFFICE does not cancel the CONTRACT. Removing him in breach of a three-year unexpired term exposes the company to damages for wrongful dismissal, subject to mitigation — which makes removal expensive rather than impossible."),
  ],
}

/*
 * Grouped so each block of five — the sitting a single mock form draws — spans a
 * spread of areas. See the header note on how the composer rotates.
 */
export const CASES_LW_GLOBAL: OtCase[] = [
  MTQ_01, MTQ_02, MTQ_03, MTQ_04, MTQ_05,
  MTQ_06, MTQ_07, MTQ_08, MTQ_09, MTQ_10,
  MTQ_11, MTQ_12, MTQ_13, MTQ_14, MTQ_15,
]
