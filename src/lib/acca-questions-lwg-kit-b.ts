import type { AccaQuestion } from "@/lib/acca-content"
import { q1, q2, multi2 } from "@/lib/acca-lwg-kit-builders"

/*
 * LW-GLOBAL · Area B question kit — chapters 6 to 13.
 *
 * The CISG and the ICC Incoterms: scope, formation, trade terms, the seller's and
 * buyer's obligations and remedies, the provisions common to both, and the passing of
 * risk. This area has no counterpart in LW-ENG.
 *
 * Original Scholify content. No ACCA or Kaplan question is reproduced.
 */

/* ── Chapter 6 · Sphere of application ──────────────────────────── */

const CH06: AccaQuestion[] = [
  q1("LWGK-06-01", "LWG-06", "B", "easy",
    "What connecting factor decides whether the Convention applies to a sale?",
    ["The parties' nationalities", "The parties' places of business", "Where the goods are located", "Where the contract was signed"],
    1,
    "The parties' PLACES OF BUSINESS must be in different states. Nationality, incorporation, the location of the goods and the place of signature are all irrelevant."),

  q1("LWGK-06-02", "LWG-06", "B", "easy",
    "Which sale is expressly EXCLUDED from the Convention?",
    ["A sale of industrial machinery", "An auction sale", "A sale of raw materials", "A sale of manufactured components"],
    1,
    "AUCTION sales are excluded, along with consumer sales, sales on execution, securities and money, ships and aircraft, and electricity. Ordinary commercial sales of goods are within scope."),

  q1("LWGK-06-03", "LWG-06", "B", "medium",
    "Does the Convention decide whether a contract is void for illegality?",
    [
      "Yes, it governs all aspects of the contract",
      "No — it governs formation and the parties' obligations, leaving validity to domestic law",
      "Yes, but only for contracting states",
      "Only where the parties expressly ask it to",
    ],
    1,
    "NO. It governs FORMATION and the parties' RIGHTS AND OBLIGATIONS. Validity on grounds such as capacity, illegality or fraud, and the effect on property in the goods, remain for the applicable domestic law."),

  q1("LWGK-06-04", "LWG-06", "B", "medium",
    "How do parties keep the Convention out of a contract otherwise within its scope?",
    ["By saying nothing about it", "By excluding it expressly", "By choosing arbitration", "It cannot be excluded"],
    1,
    "By EXCLUDING IT EXPRESSLY. It applies automatically where its conditions are met, so silence is not exclusion — and the parties may also vary the effect of almost any of its provisions."),

  q2("LWGK-06-05", "LWG-06", "B", "medium",
    "A seller incorporated in state P trades through its place of business in state Q and sells to a buyer whose place of business is also in state Q. Both are contracting states. Does the Convention apply?",
    [
      "Yes, because the seller is incorporated elsewhere",
      "No, because both places of business are in the same state",
      "Yes, because both states have ratified",
      "Only if the goods cross a border",
    ],
    1,
    "NO. Both PLACES OF BUSINESS are in state Q, so the international element is missing. Incorporation elsewhere and the movement of the goods make no difference — this is the standard trap in scope questions."),

  q2("LWGK-06-06", "LWG-06", "B", "hard",
    "A contract between parties in two contracting states provides for bespoke software design, installation and twelve months' training worth $410,000, plus hardware worth $90,000. Is it within the Convention?",
    [
      "Yes, because goods are supplied",
      "No, because the preponderant part of the supplier's obligations is services",
      "Only as to the hardware element",
      "Yes, because both states have ratified",
    ],
    1,
    "NO. Where the supplier's obligations consist PREPONDERANTLY of labour or other services the whole contract falls outside — and it is not split into goods and services parts. Reverse the figures and the Convention would apply automatically."),

  q2("LWGK-06-07", "LWG-06", "B", "medium",
    "A contract between parties in two contracting states is for the supply of specialist plant, with commissioning worth about 15% of the price. Is it within the Convention?",
    [
      "No, because services are involved",
      "Yes, because the preponderant part of the obligations is the supply of goods",
      "Only the goods element is governed",
      "No, because plant is registered property",
    ],
    1,
    "YES. Services take a contract out of scope only where they form the PREPONDERANT part, and 15% plainly does not. The contract is governed as a whole, and plant is not within the ship-and-aircraft exclusion."),

  q1("LWGK-06-08", "LWG-06", "B", "medium",
    "Are consumer sales within the Convention?",
    [
      "Always",
      "Excluded, unless the seller neither knew nor could have known the goods were for personal, family or household use",
      "Excluded in every circumstance",
      "Included where the buyer is in a contracting state",
    ],
    1,
    "EXCLUDED, subject to that qualification. Where the seller had no way of knowing the goods were for consumer use, the exclusion does not apply — a detail worth remembering because scenarios rely on it."),

  q2("LWGK-06-09", "LWG-06", "B", "medium",
    "Two parties in different contracting states make a sale contract and say nothing about the CISG. What governs their obligations?",
    [
      "The seller's domestic law, as the party performing",
      "The Convention, which applies automatically",
      "Nothing, until they choose a governing law",
      "The law of the place of delivery",
    ],
    1,
    "The CONVENTION applies AUTOMATICALLY. It is a default regime for qualifying sales, so the parties need not incorporate it — and excluding it would take an express term."),

  multi2("LWGK-06-10", "LWG-06", "B", "hard",
    "Which TWO matters does the Convention NOT govern?",
    [
      "The formation of the contract",
      "The validity of the contract on grounds of capacity or fraud",
      "The obligations of the seller as to conformity",
      "The effect of the contract on property in the goods",
    ],
    [1, 3],
    "VALIDITY on grounds such as capacity, illegality or fraud, and the effect on PROPERTY in the goods, both remain for domestic law. Formation and the parties' obligations, including conformity, are squarely within the Convention."),
]

/* ── Chapter 7 · Formation ──────────────────────────────────────── */

const CH07: AccaQuestion[] = [
  q1("LWGK-07-01", "LWG-07", "B", "easy",
    "When does an acceptance become effective under the Convention?",
    ["When it is dispatched", "When it reaches the offeror", "When the offeror reads it", "When the goods are shipped"],
    1,
    "When it REACHES the offeror. There is no postal rule making acceptance effective on dispatch — although dispatch is the point that defeats a revocation."),

  q1("LWGK-07-02", "LWG-07", "B", "easy",
    "Does silence amount to acceptance?",
    [
      "Yes, if the offeror said it would",
      "No — silence or inactivity does not in itself amount to acceptance",
      "Yes, after a reasonable time",
      "Only between parties who have traded before",
    ],
    1,
    "NO. Silence or inactivity does not IN ITSELF amount to acceptance, and an offeror cannot impose it unilaterally by declaring that silence will suffice."),

  q1("LWGK-07-03", "LWG-07", "B", "medium",
    "Must an international sale contract be in writing?",
    [
      "Yes, always",
      "No — no form is required and it may be proved by any means",
      "Yes, if the value exceeds a threshold",
      "Only where the parties are in different states",
    ],
    1,
    "NO form is required and the contract may be proved by any means, including witnesses — unless a contracting state has declared otherwise or the parties imposed their own requirement."),

  q1("LWGK-07-04", "LWG-07", "B", "medium",
    "Is a price list circulated to many potential customers an offer?",
    [
      "Yes, because it states the goods and prices",
      "No — a proposal must be addressed to specific persons unless the contrary is clearly indicated",
      "Yes, if it says prices are firm",
      "Only if it names a period for acceptance",
    ],
    1,
    "NO. A proposal must be addressed to one or more SPECIFIC PERSONS unless the contrary is clearly indicated, so a circular is an invitation to treat and the order placed in response is the offer."),

  q2("LWGK-07-05", "LWG-07", "B", "hard",
    "An offer reaches the offeree on 4 March. The offeree posts an acceptance on 6 March. A revocation reaches the offeree on 7 March. Is there a contract?",
    [
      "No — the revocation arrived before the acceptance reached the offeror",
      "Yes — revocation is ineffective once the offeree has dispatched an acceptance",
      "No, because the offer had lapsed",
      "Only if the offer was stated to be irrevocable",
    ],
    1,
    "YES. Revocation must reach the offeree BEFORE it has DISPATCHED its acceptance, and here it arrived a day late. Note the deliberate asymmetry: revocation is measured against dispatch, while the contract itself is concluded on receipt."),

  q2("LWGK-07-06", "LWG-07", "B", "hard",
    "A reply accepts an offer in every respect but adds that disputes shall be arbitrated. What is its effect?",
    [
      "An effective acceptance, dispute resolution being administrative detail",
      "A rejection and counter-offer, because settlement of disputes is a material alteration",
      "An acceptance unless the offeror objects without undue delay",
      "No effect at all",
    ],
    1,
    "A REJECTION AND COUNTER-OFFER. Settlement of disputes is expressly among the material alterations, alongside price, payment, quality, quantity, delivery and liability. The objection rule applies only to IMMATERIAL modifications."),

  q2("LWGK-07-07", "LWG-07", "B", "medium",
    "A reply purporting to accept alters only the description of the packaging, which is immaterial. What is the position?",
    [
      "It is a counter-offer in every case",
      "It operates as an acceptance on the modified terms unless the offeror objects without undue delay",
      "It has no effect until confirmed",
      "It is an acceptance on the original terms",
    ],
    1,
    "It operates as an ACCEPTANCE ON THE MODIFIED TERMS unless the offeror objects without undue delay. That is the whole point of the material/immaterial distinction — an immaterial change does not destroy the offer."),

  q2("LWGK-07-08", "LWG-07", "B", "hard",
    "A buyer replies to an offer with material changes; the seller does not respond; the buyer then writes accepting the seller's original terms exactly. Is there a contract?",
    [
      "Yes, on the seller's original terms",
      "No — the original offer terminated when the counter-offer reached the seller, so the later message is a fresh offer",
      "Yes, because the seller's silence was acceptance",
      "Yes, on the buyer's modified terms",
    ],
    1,
    "NO CONTRACT. The material counter-offer REJECTED and so terminated the original offer, leaving nothing to accept. The buyer's later message is a fresh offer, which the seller is free to decline — and the seller's silence was never acceptance."),

  q1("LWGK-07-09", "LWG-07", "B", "medium",
    "When may an offer NOT be revoked?",
    [
      "Once it has been posted",
      "Where it states it is irrevocable, or the offeree reasonably relied on it as irrevocable",
      "Where it concerns goods in transit",
      "Where the offeree has read it",
    ],
    1,
    "Where the offer INDICATES IT IS IRREVOCABLE — expressly or by fixing a period for acceptance — or where the offeree reasonably treated it as irrevocable and relied on that."),

  multi2("LWGK-07-10", "LWG-07", "B", "hard",
    "Which TWO alterations to an offer are MATERIAL?",
    [
      "The place of delivery",
      "The typeface of the confirmation",
      "The extent of one party's liability to the other",
      "The name of the contact person",
    ],
    [0, 2],
    "PLACE OF DELIVERY and the EXTENT OF LIABILITY are both listed as material, along with price, payment, quality, quantity, time of delivery and dispute settlement. Administrative details such as typeface or a contact name are not."),
]

/* ── Chapter 8 · Incoterms ──────────────────────────────────────── */

const CH08: AccaQuestion[] = [
  q1("LWGK-08-01", "LWG-08", "B", "easy",
    "Why do Incoterms bind the parties to a contract?",
    ["They are a UN convention", "The parties incorporate them into the contract", "They are enacted by states", "They are customary international law"],
    1,
    "Because the PARTIES INCORPORATE THEM. They are ICC standard terms, not legislation and not a convention — which is why a contract should name the term and the version."),

  q1("LWGK-08-02", "LWG-08", "B", "easy",
    "Under CIF, when does risk pass to the buyer?",
    ["On arrival at the named destination", "On shipment", "When the documents are tendered", "When the price is paid"],
    1,
    "ON SHIPMENT. The seller pays the freight to the destination and must insure, but risk passes when the goods go on board — which is precisely why the insurance obligation exists."),

  q1("LWGK-08-03", "LWG-08", "B", "medium",
    "Under CFR, which party is obliged to insure the goods?",
    ["The seller", "The buyer", "Neither party is obliged to insure", "The carrier"],
    2,
    "NEITHER. CFR covers cost and freight only, so the buyer must arrange its own cover — a gap scenarios frequently exploit. Only CIF obliges the seller to insure, and then only to minimum cover."),

  q1("LWGK-08-04", "LWG-08", "B", "medium",
    "Does an Incoterm transfer ownership of the goods?",
    [
      "Yes, at the point risk passes",
      "No — it allocates delivery, cost, risk, clearance and insurance; property passes under the applicable domestic law",
      "Yes, on tender of documents",
      "Only under D-group terms",
    ],
    1,
    "NO. An Incoterm settles DELIVERY, COST, RISK, CLEARANCE and INSURANCE. Property passes under the applicable domestic law, potentially at a quite different moment."),

  q2("LWGK-08-05", "LWG-08", "B", "hard",
    "Goods sold CIF are destroyed by fire in mid-ocean. The insurance covers the loss. What is the buyer's position?",
    [
      "It need not pay, because the seller undertook to deliver at the destination",
      "It must pay the full price and claim on the insurance the seller was obliged to take out",
      "It must pay half the price",
      "It may reject the documents and avoid the contract",
    ],
    1,
    "It must pay in FULL and claim on the POLICY. Risk passed on shipment, so the loss is the buyer's; paying the freight to the destination is a COST obligation, not a promise to deliver there. This is the classic C-group confusion."),

  q2("LWGK-08-06", "LWG-08", "B", "medium",
    "Under which term does the seller do the LEAST?",
    ["DDP", "CIF", "FOB", "EXW"],
    3,
    "EXW — Ex Works. The seller merely places the goods at the buyer's disposal at its own premises, and risk passes there; the buyer handles collection, export clearance, carriage and insurance. DDP is the opposite extreme."),

  q2("LWGK-08-07", "LWG-08", "B", "medium",
    "A buyer under CIF wants cover against war risk, which the minimum policy excludes. What should it do?",
    [
      "Rely on the seller, whose duty is to insure fully",
      "Arrange the additional cover itself or negotiate an express term",
      "Refuse to accept the documents",
      "Treat the contract as avoided",
    ],
    1,
    "ARRANGE IT ITSELF or negotiate an express term. The seller's CIF duty is MINIMUM cover only, so a buyer wanting more must provide for it — and a loss falling in the gap leaves the buyer uninsured but still liable for the price."),

  q2("LWGK-08-08", "LWG-08", "B", "hard",
    "Under FOB, when has the seller performed its delivery obligation?",
    [
      "When the goods leave its warehouse",
      "When the goods are placed on board the named vessel",
      "When the goods arrive at the destination port",
      "When the bill of lading is tendered",
    ],
    1,
    "When the goods are ON BOARD the named vessel, having been cleared for export. Risk passes at that moment, and the buyer arranges and pays for the main carriage under an F-group term."),

  q1("LWGK-08-09", "LWG-08", "B", "medium",
    "Which group of Incoterms passes risk at the named place of DESTINATION?",
    ["E group", "F group", "C group", "D group"],
    3,
    "The D group — DAP, DPU, DDP. E passes risk at the seller's premises, F on handing to the carrier, and C on shipment despite the seller paying the freight."),

  multi2("LWGK-08-10", "LWG-08", "B", "hard",
    "Which TWO statements about the C group are correct?",
    [
      "The seller contracts and pays for carriage to the named destination",
      "Risk passes on arrival at the destination",
      "Risk passes on shipment",
      "The seller bears the risk of loss in transit",
    ],
    [0, 2],
    "The seller PAYS THE FREIGHT and risk passes ON SHIPMENT. Separating who bears cost from who bears risk is the entire purpose of the C group, and assuming the seller carries the risk to destination is the standard error."),
]

/* ── Chapter 9 · The seller's obligations ───────────────────────── */

const CH09: AccaQuestion[] = [
  q1("LWGK-09-01", "LWG-09", "B", "easy",
    "Where the contract involves carriage and no handover place is fixed, how does the seller effect delivery?",
    ["By delivering to the buyer's premises", "By handing the goods to the first carrier", "By tendering the documents", "By notifying the buyer of shipment"],
    1,
    "Art 31(a) — by handing the goods to the FIRST CARRIER for transmission to the buyer. The seller does not undertake to get them to the buyer, which is why the buyer's protection lies in conformity and insurance."),

  q1("LWGK-09-02", "LWG-09", "B", "easy",
    "At what moment is conformity of the goods judged?",
    ["On arrival", "At the time risk passes to the buyer", "When the buyer examines them", "When the contract is concluded"],
    1,
    "At the time RISK PASSES. The seller is liable for a lack of conformity existing then even if it becomes apparent later — and for one arising afterwards if due to breach of its own obligations."),

  q1("LWGK-09-03", "LWG-09", "B", "medium",
    "What is the long-stop on a buyer's notice of a lack of conformity?",
    ["Six months from delivery", "Two years from the goods being actually handed over", "Five years from the contract", "There is none"],
    1,
    "TWO YEARS from actual handover, unless the contract gives a longer guarantee period. The reasonable-time test from discovery runs inside that outer limit."),

  q1("LWGK-09-04", "LWG-09", "B", "medium",
    "What is the consequence of a buyer failing to give notice of a lack of conformity in time?",
    [
      "Its damages are reduced",
      "It loses the right to rely on the lack of conformity at all",
      "It may still reject but not claim damages",
      "Nothing, if the defect was genuine",
    ],
    1,
    "It loses the right to rely on it ENTIRELY — no rejection, no price reduction, no damages. That is why late examination destroys otherwise good claims, and it is the commonest way a buyer loses."),

  q2("LWGK-09-05", "LWG-09", "B", "hard",
    "Goods arrive on 2 April. The buyer leaves the drums unopened until 19 May, discovers a defect present at loading, and notifies on 27 May. What is the likely outcome?",
    [
      "The claim succeeds, because notice was given eight days after discovery",
      "The claim is likely lost, because the notice period runs from when the defect ought to have been discovered",
      "The claim succeeds, because the defect existed at loading",
      "The claim is lost because the two-year long-stop has expired",
    ],
    1,
    "LIKELY LOST. Notice was prompt after discovery, but discovery was late: the buyer had to examine within as short a period as PRACTICABLE, deferrable to arrival, and the clock runs from when the defect OUGHT to have been discovered. The two-year long-stop is nowhere near expiry."),

  q2("LWGK-09-06", "LWG-09", "B", "hard",
    "A seller knew the drums were damp at loading and said nothing. The buyer's notice of the resulting defect is out of time. Can the seller rely on that?",
    [
      "Yes — the notice requirement is absolute",
      "No — a seller cannot rely on late notice where the lack of conformity relates to facts it knew or ought to have known and did not disclose",
      "Yes, unless the buyer can prove fraud",
      "Only if the buyer inspected on arrival",
    ],
    1,
    "NO. The seller's own knowledge defeats the notice point: it cannot rely on the buyer's failure to notify where the defect relates to facts it knew or ought to have known and did not disclose. That is the buyer's route back in."),

  q2("LWGK-09-07", "LWG-09", "B", "medium",
    "A buyer states a particular purpose for the goods, but has its own technical expertise and did not rely on the seller's judgement. Are the goods non-conforming if unfit for that purpose?",
    [
      "Yes — a stated purpose always binds the seller",
      "Not on that ground, where the buyer did not or could not reasonably rely on the seller's skill and judgement",
      "Yes, if the seller knew of the purpose",
      "Only if the contract said so expressly",
    ],
    1,
    "NOT on that ground. Fitness for a PARTICULAR purpose binds the seller only where the buyer relied, or could reasonably rely, on the seller's skill and judgement. Fitness for the ORDINARY purpose of such goods remains a separate requirement."),

  q2("LWGK-09-08", "LWG-09", "B", "medium",
    "Where the contract fixes a PERIOD for delivery rather than a date, who normally chooses the date within it?",
    ["The buyer", "The seller", "The carrier", "It must be agreed afresh"],
    1,
    "The SELLER, unless the circumstances indicate the choice was the buyer's. Where the contract fixes neither a date nor a period, delivery is within a reasonable time of conclusion."),

  q1("LWGK-09-09", "LWG-09", "B", "medium",
    "What must the seller do about third party claims to the goods?",
    [
      "Nothing — the buyer takes the risk",
      "Deliver goods free from any right or claim of a third party (art 41), unless the buyer agreed to take subject to it",
      "Insure against them",
      "Disclose them only if asked",
    ],
    1,
    "Deliver them FREE of third party rights or claims, unless the buyer agreed otherwise. For intellectual property claims the duty is narrower, limited to rights the seller knew or ought to have known of."),

  multi2("LWGK-09-10", "LWG-09", "B", "hard",
    "Which TWO requirements must goods satisfy to conform, failing contrary agreement?",
    [
      "Fitness for the purposes for which goods of the same description are ordinarily used (art 35(2)(a))",
      "Certification by an independent inspector",
      "Packaging in the manner usual for such goods",
      "Delivery within 30 days",
    ],
    [0, 2],
    "ORDINARY FITNESS and USUAL PACKAGING are both part of conformity, along with fitness for a notified particular purpose and matching any sample or model. Independent certification and a delivery period are contractual extras, not conformity requirements."),
]

/* ── Chapter 10 · The buyer's remedies ──────────────────────────── */

const CH10: AccaQuestion[] = [
  q1("LWGK-10-01", "LWG-10", "B", "easy",
    "Which TWO conditions must both be satisfied for a breach to be fundamental?",
    [
      "Substantial deprivation of what the party was entitled to expect, and foreseeability of that result",
      "A large financial loss and a written complaint",
      "Bad faith and a demand for damages",
      "Late delivery and non-conformity",
    ],
    0,
    "SUBSTANTIAL DEPRIVATION and FORESEEABILITY — both limbs, cumulatively. Serious loss alone is not enough, which is why a real but modest breach leaves the buyer unable to avoid."),

  q1("LWGK-10-02", "LWG-10", "B", "easy",
    "Which remedy is available to a buyer for ANY breach by the seller?",
    ["Avoidance", "Substitute goods", "Damages", "Rescission for misrepresentation"],
    2,
    "DAMAGES, and they are CUMULATIVE with every other remedy. Avoidance and substitute goods both require a fundamental breach."),

  q1("LWGK-10-03", "LWG-10", "B", "medium",
    "Is avoidance of the contract automatic on a fundamental breach?",
    [
      "Yes, the contract ends at once",
      "No — it must be declared by notice to the other party",
      "Yes, if the goods have not been delivered",
      "Only if a court so orders",
    ],
    1,
    "NO. Avoidance must be DECLARED BY NOTICE, and where the seller has already performed it must be declared within a reasonable time of the buyer learning of the breach, or the right is lost."),

  q1("LWGK-10-04", "LWG-10", "B", "medium",
    "How is a price reduction calculated?",
    [
      "By the cost of repairing the goods",
      "In the proportion the delivered goods' value bore, at delivery, to the value conforming goods would have had",
      "By the buyer's lost profit",
      "By half the contract price",
    ],
    1,
    "Proportionately: actual value at delivery against the value conforming goods would have had at that time. It is not a repair-cost or lost-profit measure, and it is available whether or not the price has been paid."),

  q2("LWGK-10-05", "LWG-10", "B", "hard",
    "A seller delivers three weeks late. The delay is inconvenient but not fundamental. What should a buyer do if it wants the option of walking away?",
    [
      "Avoid immediately, since any delay justifies it",
      "Fix an additional period of reasonable length; missing that gives a right to avoid without proving fundamental breach",
      "Accept the goods and claim damages only",
      "Nothing — avoidance is impossible",
    ],
    1,
    "FIX AN ADDITIONAL PERIOD. Failure to deliver within it gives a right to avoid even though the original breach was not fundamental. During the period the buyer cannot resort to other remedies for the breach, but it keeps damages for the delay."),

  q2("LWGK-10-06", "LWG-10", "B", "hard",
    "A delivery of fasteners is 3% short, easily made up elsewhere at negligible cost. Which remedies are available?",
    [
      "Avoidance and substitute goods",
      "Damages, performance of the balance and price reduction, but not avoidance",
      "Only damages",
      "None, as the shortfall is trivial",
    ],
    1,
    "Not avoidance, because the buyer is not SUBSTANTIALLY DEPRIVED — so substitute goods are out too. Damages, requiring performance of the balance and price reduction all remain available; a small breach is still a breach."),

  q2("LWGK-10-07", "LWG-10", "B", "medium",
    "A buyer accepts the seller's cure of a defect after the delivery date. Does it lose its claim for the delay?",
    [
      "Yes, accepting cure waives all claims",
      "No — the buyer retains its right to damages for the delay",
      "Yes, unless it reserved its rights in writing",
      "Only if the cure was completed within the original period",
    ],
    1,
    "NO. The buyer keeps DAMAGES for the delay even where cure is accepted. Damages are cumulative with every other remedy, so choosing repair, price reduction or performance never costs the buyer its delay claim."),

  q2("LWGK-10-08", "LWG-10", "B", "medium",
    "When may a buyer demand SUBSTITUTE goods?",
    [
      "For any lack of conformity",
      "Only where the lack of conformity is a fundamental breach and notice was timely",
      "Only where repair is impossible",
      "Only with the seller's consent",
    ],
    1,
    "Only for a FUNDAMENTAL breach, requested in the notice of lack of conformity or within a reasonable time after it. Repair, by contrast, is available for any lack of conformity where the request is reasonable."),

  q1("LWGK-10-09", "LWG-10", "B", "medium",
    "May a seller cure a defect after the delivery date has passed?",
    [
      "No, the date is final",
      "Yes, at its own expense, if it acts without unreasonable delay and causes no unreasonable inconvenience — unless the buyer has validly avoided",
      "Only with the buyer's written consent",
      "Only where the breach was not fundamental",
    ],
    1,
    "YES, subject to those conditions — and the right does not survive a valid avoidance for fundamental breach. The seller may also ask the buyer to say whether it will accept performance."),

  multi2("LWGK-10-10", "LWG-10", "B", "hard",
    "Which TWO remedies require a FUNDAMENTAL breach?",
    ["Damages", "Avoidance of the contract", "Price reduction", "A demand for substitute goods"],
    [1, 3],
    "AVOIDANCE and SUBSTITUTE GOODS are the two the fundamental-breach gateway unlocks. Damages are available for any breach, and price reduction for any lack of conformity."),
]

/* ── Chapter 11 · The buyer's obligations and the seller's remedies ── */

const CH11: AccaQuestion[] = [
  q1("LWGK-11-01", "LWG-11", "B", "easy",
    "Must a seller demand payment before the price falls due?",
    ["Yes, a formal demand is required", "No — no request or other formality is needed", "Only for a first transaction", "Only where the contract is silent"],
    1,
    "NO request or formality is needed. The price falls due under the contract or, failing agreement, when the goods or the documents controlling their disposition are placed at the buyer's disposal."),

  q1("LWGK-11-02", "LWG-11", "B", "medium",
    "Where the contract is silent, where is the price payable?",
    [
      "At the buyer's place of business",
      "At the seller's place of business, or at the place of handing over where payment is against the goods or documents",
      "At the port of shipment",
      "Wherever the buyer chooses",
    ],
    1,
    "At the SELLER's place of business, or at the PLACE OF HANDING OVER where payment is against handing over the goods or documents."),

  q1("LWGK-11-03", "LWG-11", "B", "medium",
    "What does the buyer's obligation to take delivery involve?",
    [
      "Paying the price",
      "Doing the acts it could reasonably be expected to do to enable delivery, and taking over the goods",
      "Arranging insurance",
      "Inspecting the goods before shipment",
    ],
    1,
    "Doing the acts it could reasonably be expected to do to ENABLE delivery, and then actually TAKING OVER the goods. Payment is a separate obligation."),

  q1("LWGK-11-04", "LWG-11", "B", "medium",
    "Does interest run on an overdue price?",
    [
      "No, only damages are available",
      "Yes, without prejudice to any claim for damages",
      "Only if the contract provides for it",
      "Only after judgment",
    ],
    1,
    "YES, and it is ADDITIONAL to damages rather than an alternative to them. Interest runs on any sum in arrears."),

  q2("LWGK-11-05", "LWG-11", "B", "hard",
    "Goods are shipped under a documentary credit. On arrival the buyer finds them defective and tells the bank not to pay. What is the position?",
    [
      "The bank must refuse, as the goods do not conform",
      "The bank pays against conforming documents; the buyer's remedy lies against the seller",
      "The buyer may always withhold payment until it has examined the goods",
      "The credit is cancelled by the non-conformity",
    ],
    1,
    "The bank PAYS against conforming documents. Choosing a documentary credit displaces the buyer's general right to withhold payment pending examination, because the credit is independent of the sale. The remedy for the defect is against the SELLER."),

  q2("LWGK-11-06", "LWG-11", "B", "hard",
    "A buyer was to specify the dimensions of the goods and fails to do so after a request. What may the seller do?",
    [
      "Nothing — the contract is void for uncertainty",
      "Specify in accordance with the buyer's known requirements, notify the details and allow a reasonable period for a different specification",
      "Deliver whatever it chooses at the contract price",
      "Avoid the contract immediately, with no alternative",
    ],
    1,
    "MAKE THE SPECIFICATION itself, subject to two conditions: it must accord with the buyer's KNOWN REQUIREMENTS, and the seller must NOTIFY the details and allow a reasonable period for the buyer to substitute one. Guessing without the procedure delivers non-conforming goods."),

  q2("LWGK-11-07", "LWG-11", "B", "medium",
    "When may a seller avoid the contract for the buyer's breach?",
    [
      "Whenever payment is late",
      "For a fundamental breach, or where the buyer fails to pay or take delivery within an additional period the seller fixed",
      "Only with the buyer's consent",
      "Only after obtaining a court order",
    ],
    1,
    "For a FUNDAMENTAL breach, or on the buyer's failure within an ADDITIONAL PERIOD the seller fixed. The structure mirrors the buyer's remedies exactly."),

  q2("LWGK-11-08", "LWG-11", "B", "hard",
    "A buyer pays the price late and the seller banks the payment. Three weeks later the seller purports to avoid the contract for the late payment. Is that effective?",
    [
      "Yes, late payment is always a fundamental breach",
      "Probably not — once the buyer has paid, avoidance must be declared before the seller knew of the late performance or within a reasonable time afterwards",
      "Yes, if the contract said time was of the essence",
      "Yes, because the seller had not expressly waived the breach",
    ],
    1,
    "PROBABLY NOT. Once the buyer has PAID, the seller's right to avoid is time-limited in the same way as the buyer's: before it became aware of the late performance, or within a reasonable time after. Banking the payment and waiting three weeks is likely too late."),

  q1("LWGK-11-09", "LWG-11", "B", "medium",
    "Where the price is fixed by weight and there is doubt, which weight governs?",
    ["Gross weight", "Net weight", "The average of the two", "Whichever the seller states"],
    1,
    "NET weight. A small but examinable default rule where the contract leaves the point open."),

  multi2("LWGK-11-10", "LWG-11", "B", "hard",
    "Which TWO are obligations of the buyer under the Convention?",
    [
      "To pay the price at the time and place required",
      "To insure the goods in transit",
      "To take delivery of the goods",
      "To inspect the goods before shipment",
    ],
    [0, 2],
    "PAYING THE PRICE and TAKING DELIVERY are the buyer's two obligations. Insurance depends on the Incoterm chosen, and pre-shipment inspection is a contractual extra rather than a Convention obligation."),
]

/* ── Chapter 12 · Provisions common to both parties ─────────────── */

const CH12: AccaQuestion[] = [
  q1("LWGK-12-01", "LWG-12", "B", "easy",
    "When is foreseeability of loss judged for the purpose of damages?",
    ["At the date of breach", "At the time the contract was concluded", "At the date of judgment", "When the loss was suffered"],
    1,
    "At the time the CONTRACT WAS CONCLUDED, on the facts the party in breach then knew or ought to have known. Judging it at breach would expand liability well beyond what the parties bargained for."),

  q1("LWGK-12-02", "LWG-12", "B", "easy",
    "What must a party claiming damages do to preserve its full recovery?",
    ["Give written notice within 30 days", "Take reasonable measures to mitigate its loss", "Obtain an independent valuation", "Commence proceedings immediately"],
    1,
    "MITIGATE — take reasonable measures to reduce the loss. Failing that, the party in breach may claim a reduction by the amount the loss should have been reduced."),

  q1("LWGK-12-03", "LWG-12", "B", "medium",
    "Does an exemption for an impediment beyond a party's control prevent the other party avoiding the contract?",
    [
      "Yes, it suspends all remedies",
      "No — it exempts from damages only, and does not bar avoidance or price reduction",
      "Yes, for the period of the impediment",
      "Only if notice was given",
    ],
    1,
    "NO. It exempts from DAMAGES for the period of the impediment. The other party may still exercise other rights, including AVOIDANCE and price reduction — and notice of the impediment must still be given."),

  q1("LWGK-12-04", "LWG-12", "B", "medium",
    "Does avoidance of the contract destroy an arbitration clause within it?",
    [
      "Yes, the whole contract falls",
      "No — avoidance does not affect provisions on dispute settlement",
      "Only where the avoidance was for fundamental breach",
      "Only if the clause says otherwise",
    ],
    1,
    "NO. Avoidance expressly does not affect provisions on DISPUTE SETTLEMENT, or those governing rights consequent upon avoidance — which is why the tribunal can decide whether the avoidance was justified."),

  q2("LWGK-12-05", "LWG-12", "B", "hard",
    "A buyer learns its seller is in serious financial difficulty before the delivery date. What is the proportionate step?",
    [
      "Avoid the contract at once, since insolvency is a fundamental breach",
      "Suspend its own performance and notify the seller immediately, continuing if adequate assurance is given",
      "Do nothing until the delivery date passes",
      "Buy substitute goods at the seller's expense",
    ],
    1,
    "SUSPEND and notify immediately. Suspension needs only that it be APPARENT the other will not perform a SUBSTANTIAL PART — a lower threshold than avoidance, which requires it to be CLEAR that a FUNDAMENTAL breach will occur. Adequate assurance defeats both."),

  q2("LWGK-12-06", "LWG-12", "B", "hard",
    "A buyer avoids for fundamental breach and buys substitute goods at a higher price. How are damages measured?",
    [
      "By the current market price at the date of avoidance",
      "Art 75 — by the difference between the contract price and the price in the substitute transaction, plus further damages",
      "By the buyer's lost profits only",
      "By the original contract price",
    ],
    1,
    "By the SUBSTITUTE TRANSACTION measure, which displaces the current-price measure once a substitute is made — plus any further damages, and subject to mitigation if the buyer paid more than it reasonably needed to."),

  q2("LWGK-12-07", "LWG-12", "B", "medium",
    "A buyer avoids for fundamental breach but makes no substitute purchase, though the goods have a current market price. Can it recover?",
    [
      "No, having made no substitute purchase",
      "Yes — art 76 gives the difference between the contract price and the current price at the time of avoidance, plus further damages",
      "Only its wasted expenditure",
      "Only if it can prove lost profits",
    ],
    1,
    "YES, on the CURRENT-PRICE measure: contract price against the current price at AVOIDANCE. Where the goods were taken over before avoidance, the price at the time of taking over is used instead."),

  q2("LWGK-12-08", "LWG-12", "B", "hard",
    "A seller cannot ship because of a sudden unforeseeable export ban, and says nothing to the buyer for six weeks. What is the position?",
    [
      "It is exempt from all liability and notice is irrelevant",
      "Exempt from damages for the non-delivery, but liable for the loss caused by failing to notify — and the buyer may still avoid",
      "The exemption fails entirely for want of notice",
      "The contract is automatically avoided by the ban",
    ],
    1,
    "Exempt from DAMAGES for the non-delivery, but LIABLE for the loss caused by the buyer not receiving notice of the impediment. Exemption also does not bar the buyer from avoiding, and nothing is avoided automatically."),

  q1("LWGK-12-09", "LWG-12", "B", "medium",
    "A party in possession of goods after a rejection must:",
    [
      "Return them immediately at its own expense",
      "Take reasonable steps to preserve them, and may retain them until reimbursed its expenses",
      "Sell them within seven days",
      "Store them free of charge",
    ],
    1,
    "PRESERVE them, with a right to RETAIN until reimbursed reasonable expenses. It may store them at the other's expense, may sell on unreasonable delay or disproportionate cost, and MUST sell where the goods are subject to rapid deterioration."),

  multi2("LWGK-12-10", "LWG-12", "B", "hard",
    "Which TWO statements about the exemption for an impediment are correct?",
    [
      "It lasts only for the period of the impediment",
      "It excuses the party from every remedy",
      "Where a third party the seller engaged fails, the seller is exempt only if both it and that party would be exempt",
      "No notice is required",
    ],
    [0, 2],
    "It lasts only for the PERIOD of the impediment, and subcontractor failure exempts the seller only if BOTH would be exempt. It excuses damages alone, and NOTICE of the impediment and its effect is required."),
]

/* ── Chapter 13 · The passing of risk ───────────────────────────── */

const CH13: AccaQuestion[] = [
  q1("LWGK-13-01", "LWG-13", "B", "easy",
    "What is the consequence of risk having passed to the buyer?",
    [
      "The seller must replace lost goods",
      "Loss or damage does not discharge the buyer from paying the price, unless caused by the seller",
      "The contract is avoided",
      "The buyer may reject the goods",
    ],
    1,
    "The buyer must still PAY THE PRICE, unless the loss was due to an act or omission of the seller. Its protection is insurance — which is why the Incoterm's insurance allocation matters so much."),

  q1("LWGK-13-02", "LWG-13", "B", "easy",
    "Before risk can pass, what must be true of the goods?",
    ["They must be paid for", "They must be clearly identified to the contract", "They must be insured", "They must have been inspected"],
    1,
    "They must be CLEARLY IDENTIFIED to the contract — by markings, shipping documents, notice to the buyer or otherwise. Unidentified goods in a bulk cannot carry risk."),

  q1("LWGK-13-03", "LWG-13", "B", "medium",
    "Does a seller's retention of documents controlling the goods keep risk with the seller?",
    ["Yes", "No — retention of documents does not affect the passing of risk", "Only until payment", "Only under C-group terms"],
    1,
    "NO. Retention of documents controlling disposition preserves CONTROL, not risk. Candidates routinely assume the two move together; they do not."),

  q1("LWGK-13-04", "LWG-13", "B", "medium",
    "When does risk pass on goods sold in transit, as a general rule?",
    ["On arrival", "From the time the contract is concluded", "When the documents are transferred", "When the buyer pays"],
    1,
    "From the CONCLUSION of the contract — or, if circumstances so indicate, from the handover to the carrier who issued the carriage documents."),

  q2("LWGK-13-05", "LWG-13", "B", "hard",
    "A seller hands identified goods to the first carrier but retains the bill of lading pending payment. The goods are lost in transit. Who bears the loss?",
    [
      "The seller, having retained the document",
      "The buyer, because retention of documents does not affect the passing of risk",
      "The carrier in every case",
      "Neither — the contract is avoided",
    ],
    1,
    "The BUYER. Risk passed on handing the identified goods to the first carrier, and retaining the controlling document does not alter that. Holding the bill keeps control over delivery, not the risk of loss."),

  q2("LWGK-13-06", "LWG-13", "B", "hard",
    "Goods are sold in transit. Unknown to the buyer, the seller knew at conclusion that part of the cargo had already been damaged, and said nothing. Who bears that loss?",
    [
      "The buyer, since risk passes on conclusion",
      "The seller, because it knew of the loss at conclusion and did not disclose it",
      "It is shared equally",
      "The carrier",
    ],
    1,
    "The SELLER. Where, at conclusion, the seller knew or ought to have known the goods had been lost or damaged and did not disclose it, that loss is borne by the seller — overriding whichever general rule would otherwise apply."),

  q2("LWGK-13-07", "LWG-13", "B", "medium",
    "Goods are to be collected from the seller's works. The seller tells the buyer they are ready; the buyer does not collect, and they are damaged two weeks later. Who bears the loss?",
    [
      "The seller, as the goods were on its premises",
      "The buyer, because risk passed when the goods were placed at its disposal and it breached by not taking delivery",
      "It is shared, as neither was at fault",
      "The seller, unless it had insured them",
    ],
    1,
    "The BUYER. Where there is no carriage, risk passes when the goods are placed at the buyer's disposal and it commits a breach by failing to take delivery. Location on the seller's premises does not keep the risk there."),

  q2("LWGK-13-08", "LWG-13", "B", "hard",
    "A contract adopts CIF. Which rules govern the passing of risk?",
    [
      "The Convention's default articles, which cannot be varied",
      "The Incoterm, because the parties may vary the Convention's default risk rules and adopting a term does so",
      "Both, with the Convention prevailing",
      "The law of the port of shipment",
    ],
    1,
    "The INCOTERM. The Convention's risk rules are defaults the parties may displace, and adopting an Incoterm does exactly that. So the first question in any risk problem is whether there is an Incoterm."),

  q1("LWGK-13-09", "LWG-13", "B", "medium",
    "How does a seller's fundamental breach interact with the risk rules?",
    [
      "Passing of risk extinguishes the buyer's remedies",
      "The risk rules do not impair the buyer's remedies for that breach",
      "Risk never passes where there is a breach",
      "The buyer must choose between remedies and risk",
    ],
    1,
    "The risk rules DO NOT IMPAIR the buyer's remedies for a fundamental breach. The two questions stay separate, which is what a scenario combining a defect with a later loss is testing."),

  multi2("LWGK-13-10", "LWG-13", "B", "hard",
    "Which TWO statements about the passing of risk are correct?",
    [
      "Where carriage is involved and no handover place is fixed, risk passes on handing the goods to the first carrier",
      "Risk and ownership always pass at the same moment",
      "Risk cannot pass until the goods are clearly identified to the contract",
      "Risk passes only when the buyer physically receives the goods",
    ],
    [0, 2],
    "The FIRST CARRIER rule and the IDENTIFICATION requirement are both correct. Risk and property are governed separately and may pass at different moments, and risk frequently passes long before physical receipt."),
]

/** LW-Global's authored question kit for Area B — chapters 6 to 13. */
export const LWG_KIT_B: AccaQuestion[] = [
  ...CH06,
  ...CH07,
  ...CH08,
  ...CH09,
  ...CH10,
  ...CH11,
  ...CH12,
  ...CH13,
]
